import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  reload,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  connectAuthEmulator,
} from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
  limit,
  onSnapshot,
  serverTimestamp,
  Bytes,
  writeBatch,
} from "firebase/firestore";
import {
  authEmailSettings,
  firebaseConfig,
} from "../resume-builder/firebase-config.js";
export const localEmulator =
  ["localhost", "127.0.0.1"].includes(location.hostname) &&
  sessionStorage.getItem("ipd_market_emulator") === "1";
const config = localEmulator
  ? { ...firebaseConfig, projectId: "demo-infoparkdaily", apiKey: "demo-key" }
  : firebaseConfig;
const app = getApps().length ? getApp() : initializeApp(config);
export const auth = getAuth(app),
  db = getFirestore(app);
if (localEmulator) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}
export const paths = {
  private: "marketMembers",
  profiles: "marketProfiles",
  jobs: "marketJobs",
  applications: "marketApplications",
  reviews: "marketReviews",
  admins: "marketAdmins",
};
const rows = (snap) => snap.docs.map((d) => ({ id: d.id, ...d.data() }));
const now = () => serverTimestamp();
export const watchAuth = onAuthStateChanged.bind(null, auth);
export function failText(error) {
  return (
    {
      "auth/invalid-credential": "Email or password is incorrect.",
      "auth/email-already-in-use":
        "This email already has an account. Please sign in.",
      "auth/weak-password": "Choose a password with at least 10 characters.",
      "auth/popup-closed-by-user": "Google sign-in was cancelled.",
      "auth/too-many-requests": "Please wait a moment before trying again.",
      "permission-denied":
        "This action is not available for your account. Check your email verification and access.",
      unavailable: "The connection was interrupted. Please try again.",
      "auth/network-request-failed":
        "Check your internet connection and try again.",
    }[error?.code] ||
    error?.message ||
    "Please try again."
  );
}
export function member() {
  const u = auth.currentUser;
  if (!u) throw Error("Sign in to continue.");
  if (!u.emailVerified) throw Error("Verify your email address to continue.");
  return u;
}
export async function logIn(email, password, remember = false) {
  await setPersistence(
    auth,
    remember ? browserLocalPersistence : browserSessionPersistence,
  );
  return signInWithEmailAndPassword(auth, email, password);
}
export async function google(remember = false) {
  await setPersistence(
    auth,
    remember ? browserLocalPersistence : browserSessionPersistence,
  );
  return signInWithPopup(auth, new GoogleAuthProvider());
}
export async function register({ name, email, password, remember = false }) {
  if (password.length < 10)
    throw Error("Use at least 10 characters for your password.");
  await setPersistence(
    auth,
    remember ? browserLocalPersistence : browserSessionPersistence,
  );
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName: name });
  await sendEmailVerification(
    user,
    authEmailSettings("/infoparkdaily/dashboard/"),
  );
  return user;
}
export async function verifyAgain() {
  if (!auth.currentUser) throw Error("Sign in first.");
  await reload(auth.currentUser);
  await auth.currentUser.getIdToken(true);
  return auth.currentUser.emailVerified;
}
export async function resendVerification() {
  await sendEmailVerification(
    auth.currentUser,
    authEmailSettings("/infoparkdaily/dashboard/"),
  );
}
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(
      auth,
      email,
      authEmailSettings("/infoparkdaily/sign-in/"),
    );
  } catch (e) {
    if (e.code !== "auth/user-not-found") throw e;
  }
}
export const logOut = () => signOut(auth);
export async function getMember() {
  if (!auth.currentUser) return null;
  const d = await getDoc(doc(db, paths.private, auth.currentUser.uid));
  return d.exists() ? { id: d.id, ...d.data() } : null;
}
export async function saveMember(data) {
  const u = member(),
    ref = doc(db, paths.private, u.uid),
    old = await getDoc(ref);
  await setDoc(
    ref,
    {
      name: data.name || u.displayName || "",
      phone: data.phone || "",
      company: data.company || "",
      role: data.role === "worker" ? "worker" : "employer",
      email: u.email,
      updatedAt: now(),
      ...(!old.exists() ? { createdAt: now(), lastReadAt: now() } : {}),
    },
    { merge: true },
  );
}
export async function isAdmin() {
  if (!auth.currentUser?.emailVerified) return false;
  const d = await getDoc(
    doc(db, paths.admins, auth.currentUser.email.toLowerCase()),
  );
  return d.exists() && d.data().active === true;
}
export function watchPublic(kind, done, error) {
  return onSnapshot(
    query(
      collection(db, paths[kind]),
      where("status", "==", "approved"),
      limit(1000),
    ),
    (s) => done(rows(s)),
    error,
  );
}
export function watchOwn(kind, field, done, error) {
  return onSnapshot(
    query(
      collection(db, paths[kind]),
      where(field, "==", member().uid),
      limit(500),
    ),
    (s) => done(rows(s)),
    error,
  );
}
export async function getRecord(kind, id) {
  const d = await getDoc(doc(db, paths[kind], id));
  return d.exists() ? { id: d.id, ...d.data() } : null;
}
export async function saveProfile(data) {
  const u = member(),
    ref = doc(db, paths.profiles, u.uid),
    old = await getDoc(ref);
  await setDoc(ref, {
    ...data,
    uid: u.uid,
    status: "pending",
    updatedAt: now(),
    createdAt: old.exists() ? old.data().createdAt : now(),
  });
  return u.uid;
}
export async function postJob(data, id) {
  const u = member();
  if (id) {
    const ref = doc(db, paths.jobs, id);
    await updateDoc(ref, { ...data, status: "pending", updatedAt: now() });
    return id;
  }
  const d = await addDoc(collection(db, paths.jobs), {
    ...data,
    ownerUid: u.uid,
    status: "pending",
    kind: "community",
    createdAt: now(),
    updatedAt: now(),
  });
  return d.id;
}
export async function closeJob(id) {
  await updateDoc(doc(db, paths.jobs, id), {
    status: "closed",
    updatedAt: now(),
  });
}
export async function savedJobs() {
  const u = member();
  return rows(
    await getDocs(
      query(collection(db, paths.private, u.uid, "saved"), limit(300)),
    ),
  );
}
export async function toggleSave(job) {
  const u = member(),
    ref = doc(db, paths.private, u.uid, "saved", job.id),
    old = await getDoc(ref);
  if (old.exists()) {
    await deleteDoc(ref);
    return false;
  }
  await setDoc(ref, {
    jobId: job.id,
    title: job.title,
    company: job.company,
    kind: job.kind,
    createdAt: now(),
    applied: false,
  });
  return true;
}
export async function markExternalApplied(id) {
  await updateDoc(doc(db, paths.private, member().uid, "saved", id), {
    applied: true,
  });
}
export async function apply(job, coverLetter, attachResume = false) {
  const u = member();
  const profile = await getRecord("profiles", u.uid);
  if (!profile) throw Error("Create your worker profile before applying.");
  if (profile.status !== "approved")
    throw Error(
      "Your profile must be approved before you can apply. Check its status in My profile.",
    );
  const id = job.id + "_" + u.uid;
  const batch = writeBatch(db);
  batch.set(doc(db, paths.applications, id), {
    jobId: job.id,
    jobTitle: job.title,
    employerUid: job.ownerUid,
    workerUid: u.uid,
    workerName: profile.name,
    company: job.company,
    status: "submitted",
    coverLetter,
    createdAt: now(),
    updatedAt: now(),
    initiatedBy: "worker",
  });
  if (attachResume) {
    const file = await getDoc(
      doc(db, paths.private, u.uid, "documents", "resume"),
    );
    if (!file.exists())
      throw Error(
        "Upload a resume in your account first, or apply without an attachment.",
      );
    batch.set(
      doc(db, paths.applications, id, "documents", "resume"),
      file.data(),
    );
  }
  await batch.commit();
  return id;
}
export async function invite(worker, job, message) {
  const u = member();
  const id = job.id + "_" + worker.uid;
  const ref = doc(db, paths.applications, id);
  await setDoc(ref, {
    jobId: job.id,
    jobTitle: job.title,
    employerUid: u.uid,
    workerUid: worker.uid,
    workerName: worker.name,
    company: job.company,
    status: "invited",
    coverLetter: message,
    createdAt: now(),
    updatedAt: now(),
    initiatedBy: "employer",
  });
  return id;
}
export async function transition(id, status) {
  await updateDoc(doc(db, paths.applications, id), {
    status,
    updatedAt: now(),
  });
}
export async function review(application, rating, text) {
  const u = member();
  await setDoc(doc(db, paths.reviews, application.id + "_" + u.uid), {
    applicationId: application.id,
    authorUid: u.uid,
    authorName: u.displayName || "Member",
    recipientUid:
      u.uid === application.workerUid
        ? application.employerUid
        : application.workerUid,
    rating: Number(rating),
    text,
    createdAt: now(),
  });
}
export async function reviewsFor(uid) {
  return rows(
    await getDocs(
      query(
        collection(db, paths.reviews),
        where("recipientUid", "==", uid),
        limit(100),
      ),
    ),
  );
}
export function watchMessages(id, done, error) {
  return onSnapshot(
    query(collection(db, paths.applications, id, "messages"), limit(500)),
    (s) =>
      done(
        rows(s).sort(
          (a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0),
        ),
      ),
    error,
  );
}
export async function sendMessage(id, text) {
  await addDoc(collection(db, paths.applications, id, "messages"), {
    senderUid: member().uid,
    text,
    createdAt: now(),
  });
}
export async function uploadDocument(slot, file) {
  if (!["resume", "certificate", "other"].includes(slot))
    throw Error("Choose a document slot.");
  if (file.size > 700000) throw Error("Choose a document smaller than 700 KB.");
  if (!/\.(pdf|doc|docx|jpg|jpeg|png)$/i.test(file.name))
    throw Error("Choose a PDF, Word document, JPG or PNG.");
  await setDoc(doc(db, paths.private, member().uid, "documents", slot), {
    name: file.name,
    type: file.type || "application/octet-stream",
    size: file.size,
    data: Bytes.fromUint8Array(new Uint8Array(await file.arrayBuffer())),
    updatedAt: now(),
  });
}
export async function documentList(uid = member().uid) {
  return rows(
    await getDocs(collection(db, paths.private, uid, "documents")),
  ).map(({ data, ...meta }) => meta);
}
export async function removeDocument(slot) {
  await deleteDoc(doc(db, paths.private, member().uid, "documents", slot));
}
export async function getDocument(uid, slot, applicationId) {
  const ref = applicationId
    ? doc(db, paths.applications, applicationId, "documents", slot)
    : doc(db, paths.private, uid, "documents", slot);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw Error("This document is no longer available.");
  const data = snap.data();
  return {
    ...data,
    blob: new Blob([data.data.toUint8Array()], { type: data.type }),
  };
}
export async function adminRecords(kind) {
  return rows(await getDocs(query(collection(db, paths[kind]), limit(1000))));
}
export async function moderate(kind, id, status) {
  await updateDoc(doc(db, paths[kind], id), { status, updatedAt: now() });
}
export async function markRead() {
  await updateDoc(doc(db, paths.private, member().uid), { lastReadAt: now() });
}
