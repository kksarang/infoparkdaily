/* Daily Web Studio — Firebase sign-in and cloud saving.
 *
 * Bundled with esbuild into js/studio/cloud.bundle.js (npm run build:studio).
 * Uses the same Firebase project and the same InfoparkDaily account as the resume builder,
 * so signing in here also signs you in across InfoparkDaily.
 *
 * Sites live at users/{uid}/studioProjects/{projectId}. Firestore rules
 * (firebase/firestore.rules) only let a signed-in owner with a verified email write them.
 */
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  browserSessionPersistence,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  Timestamp,
  collection,
  connectFirestoreEmulator,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { firebaseConfig, authEmailSettings } from "../resume-builder/firebase-config.js";

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* Local testing only: on localhost, setting localStorage "dws:emulator" = "1" talks to the
   Firebase emulators (Auth :9099, Firestore :8085) instead of the live project. */
try {
  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname) && localStorage.getItem("dws:emulator") === "1") {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    connectFirestoreEmulator(db, "127.0.0.1", 8085);
  }
} catch {
  /* storage blocked: use the live project */
}
const google = new GoogleAuthProvider();
google.setCustomParameters({ prompt: "select_account" });

/* ---------------- auth ---------------- */

const usesPassword = (u) => u.providerData.some((p) => p.providerId === "password");

function view(u) {
  if (!u) return null;
  return {
    uid: u.uid,
    email: u.email || "",
    name: u.displayName || "",
    photo: u.photoURL || "",
    verified: !!u.emailVerified,
    password: usesPassword(u),
  };
}

export const authReady = auth.authStateReady();
export const currentUser = () => view(auth.currentUser);

/** Calls back with the signed-in user (or null) now and on every change. Returns unsubscribe. */
export const onUser = (cb) => onAuthStateChanged(auth, (u) => cb(view(u)));

export async function signInEmail(email, password, remember = true) {
  await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
  const { user } = await signInWithEmailAndPassword(auth, email.trim(), password);
  return view(user);
}

export async function signUpEmail(name, email, password) {
  await setPersistence(auth, browserLocalPersistence);
  const { user } = await createUserWithEmailAndPassword(auth, email.trim(), password);
  if (name.trim()) await updateProfile(user, { displayName: name.trim().slice(0, 100) }).catch(() => {});
  await sendEmailVerification(user, authEmailSettings("/studio/app/")).catch(() => {});
  return view(auth.currentUser);
}

export async function signInGoogle() {
  await setPersistence(auth, browserLocalPersistence);
  const { user } = await signInWithPopup(auth, google);
  return view(user);
}

export const resetPassword = (email) => sendPasswordResetEmail(auth, email.trim(), authEmailSettings("/studio/sign-in/"));

export async function resendVerification() {
  if (!auth.currentUser) throw Object.assign(new Error("Sign in first."), { code: "studio/no-user" });
  await sendEmailVerification(auth.currentUser, authEmailSettings("/studio/app/"));
}

/** Re-reads the account after the person clicks the email link, and refreshes the token so
    Firestore rules see email_verified = true. */
export async function refreshUser() {
  if (!auth.currentUser) return null;
  await reload(auth.currentUser);
  if (auth.currentUser.emailVerified) await auth.currentUser.getIdToken(true);
  return view(auth.currentUser);
}

export const signOutUser = () => signOut(auth);

/** Friendly message for Firebase errors. */
export function authMessage(e) {
  const code = e?.code || "";
  const map = {
    "auth/invalid-email": "That email address doesn’t look right.",
    "auth/missing-email": "Enter your email address.",
    "auth/missing-password": "Enter your password.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/wrong-password": "Email or password is incorrect.",
    "auth/user-not-found": "Email or password is incorrect.",
    "auth/user-disabled": "This account has been disabled. Contact us for help.",
    "auth/email-already-in-use": "An account already uses this email. Sign in instead.",
    "auth/weak-password": "Use at least 8 characters for your password.",
    "auth/too-many-requests": "Too many attempts. Wait a few minutes and try again.",
    "auth/network-request-failed": "No internet connection. Check your network and try again.",
    "auth/popup-closed-by-user": "The Google window was closed before signing in.",
    "auth/cancelled-popup-request": "The Google window was closed before signing in.",
    "auth/popup-blocked": "Your browser blocked the Google window. Allow pop-ups for this site and try again.",
    "auth/account-exists-with-different-credential": "This email is already registered with a different sign-in method.",
    "auth/unauthorized-domain": "Sign-in isn’t enabled for this web address yet.",
    "permission-denied": "Your account can’t save here yet. Verify your email, then try again.",
    "unavailable": "You’re offline. Changes will save when you reconnect.",
  };
  return map[code] || (e?.message && !/firebase/i.test(e.message) ? e.message : "Something went wrong. Please try again.");
}

/* ---------------- projects ---------------- */

const col = (uid) => collection(db, "users", uid, "studioProjects");
const FIELDS = ["name", "tagline", "location", "type", "look", "accent", "pages"];
const pick = (p) => Object.fromEntries(FIELDS.map((k) => [k, p[k]]));
const ms = (t) => (t && typeof t.toMillis === "function" ? t.toMillis() : Date.now());

/** Live list of the person's sites. onData receives plain objects with a `revision`. */
export function watchProjects(uid, onData, onError) {
  const q = query(col(uid), orderBy("updatedAt", "desc"), limit(100));
  return onSnapshot(
    q,
    { includeMetadataChanges: true },
    (snap) =>
      onData(
        snap.docs.map((d) => {
          const x = d.data({ serverTimestamps: "estimate" });
          return { ...pick(x), id: d.id, createdAt: ms(x.createdAt), updatedAt: ms(x.updatedAt), revision: x.revision || 1, version: 1 };
        }),
        { pending: snap.metadata.hasPendingWrites, fromCache: snap.metadata.fromCache },
      ),
    onError,
  );
}

/** New site. `createdAt` (ms) is kept when moving a site from this device into the account. */
export function createProjectDoc(uid, p, keepCreated = false) {
  return setDoc(doc(col(uid), p.id), {
    ...pick(p),
    schema: 1,
    revision: 1,
    createdAt: keepCreated && p.createdAt ? Timestamp.fromMillis(Math.min(p.createdAt, Date.now())) : serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/** Saves changed fields. `revision` must be the stored revision; the rules require +1. */
export function updateProjectDoc(uid, id, changes, revision) {
  const data = Object.fromEntries(Object.entries(changes).filter(([k]) => FIELDS.includes(k)));
  return updateDoc(doc(col(uid), id), { ...data, revision: revision + 1, updatedAt: serverTimestamp() });
}

export const deleteProjectDoc = (uid, id) => deleteDoc(doc(col(uid), id));

export async function deleteAllProjectDocs(uid) {
  const snap = await getDocs(col(uid));
  for (let i = 0; i < snap.docs.length; i += 400) {
    const batch = writeBatch(db);
    snap.docs.slice(i, i + 400).forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }
}
