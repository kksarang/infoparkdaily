/** Account storage for saved jobs. Bundled to saved-jobs-cloud.bundle.js and loaded only when needed. */
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, reload, sendEmailVerification } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { authEmailSettings, firebaseConfig } from "./resume-builder/firebase-config.js";

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const listRef = () => doc(db, "users", auth.currentUser.uid, "savedJobs", "list");

function snapshotUser(user) {
  return user ? { uid: user.uid, email: user.email || "", verified: user.emailVerified === true } : null;
}

export function currentUser() {
  return new Promise((resolve) => {
    const stop = onAuthStateChanged(auth, (user) => {
      stop();
      resolve(snapshotUser(user));
    });
  });
}

export async function refreshUser() {
  if (!auth.currentUser) return null;
  await reload(auth.currentUser);
  await auth.currentUser.getIdToken(true);
  return snapshotUser(auth.currentUser);
}

export async function resendVerification() {
  await sendEmailVerification(auth.currentUser, authEmailSettings("/jobs/saved/"));
}

export async function getIds() {
  const snap = await getDoc(listRef());
  const ids = snap.exists() ? snap.data().ids : [];
  return Array.isArray(ids) ? ids.map(String) : [];
}

export async function update(add, remove) {
  const ref = listRef();
  const batch = writeBatch(db);
  if (add.length) batch.set(ref, { ids: arrayUnion(...add), updatedAt: serverTimestamp() }, { merge: true });
  if (remove.length) batch.set(ref, { ids: arrayRemove(...remove), updatedAt: serverTimestamp() }, { merge: true });
  await batch.commit();
}
