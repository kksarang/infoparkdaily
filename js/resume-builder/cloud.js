import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  deleteUser,
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
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseConfig } from "./firebase-config.js";
import { publicTemplates } from "./catalog.js";
import { validateResume } from "./schema.js";

const MAX_RESUMES = 20;
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

function withTimeout(promise, ms, fallback) {
  return Promise.race([
    promise,
    new Promise((resolve, reject) =>
      setTimeout(
        () =>
          fallback === undefined
            ? reject(Error("Firebase is taking too long. Refresh and try again."))
            : resolve(fallback),
        ms,
      ),
    ),
  ]);
}

let authReady = withTimeout(
  new Promise((resolve) => {
    const stop = onAuthStateChanged(auth, () => {
      stop();
      resolve();
    });
  }),
  8000,
  null,
);

function fail(error, fallback = "Please try again.") {
  const code = error?.code || "";
  const messages = {
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/user-not-found": "Email or password is incorrect.",
    "auth/wrong-password": "Email or password is incorrect.",
    "auth/email-already-in-use":
      "An account with this email already exists. Sign in with email, then you can connect Google from your account page.",
    "auth/weak-password": "Use at least 10 characters for your password.",
    "auth/too-many-requests": "Too many attempts. Wait a moment and try again.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/cancelled-popup-request": "Google sign-in was cancelled.",
    "auth/popup-blocked": "Allow pop-ups to continue with Google.",
    "auth/unauthorized-domain":
      "This website is not an authorised domain in Firebase Authentication.",
    "auth/network-request-failed":
      "Network problem. Check your connection and try again.",
    "auth/requires-recent-login":
      "Please sign in again to finish this account action.",
    "auth/expired-action-code": "This email link has expired. Request a new one.",
    "auth/invalid-action-code": "This email link is invalid or already used.",
    "permission-denied":
      "Cloud saving needs a verified email. Open the link we sent, then refresh.",
    unavailable:
      "Cloud saving is temporarily unavailable. Your edits are still on this page.",
  };
  const err = Error(messages[code] || error?.message || fallback);
  if (error?.status) err.status = error.status;
  if (code === "permission-denied") err.status = 403;
  if (error?.status === 401) err.status = 401;
  throw err;
}

function millis(value) {
  if (value == null) return Date.now();
  if (typeof value === "number") return value;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (typeof value.seconds === "number") return value.seconds * 1000;
  return Date.now();
}

function requireUser() {
  if (!auth.currentUser) {
    const err = Error("Please sign in to continue.");
    err.status = 401;
    throw err;
  }
  return auth.currentUser;
}

function userRef(uid = requireUser().uid) {
  return doc(db, "users", uid);
}
function resumeRef(id, uid = requireUser().uid) {
  return doc(db, "users", uid, "resumes", id);
}
function resumesCol(uid = requireUser().uid) {
  return collection(db, "users", uid, "resumes");
}

function fromResume(id, data) {
  return {
    id,
    title: data.title,
    data: data.data,
    template_id: data.templateId,
    template_version: data.templateVersion,
    revision: data.revision,
    last_section: data.lastSection || "personal",
    job_id: data.jobId || null,
    created_at: millis(data.createdAt),
    updated_at: millis(data.updatedAt),
    status: data.status || "draft",
  };
}

async function ensureProfile(user) {
  if (!user.emailVerified) return;
  const ref = userRef(user.uid);
  const snap = await withTimeout(getDoc(ref), 8000);
  const name = (user.displayName || user.email.split("@")[0] || "Member").slice(
    0,
    100,
  );
  if (!snap.exists()) {
    await withTimeout(
      setDoc(ref, {
        displayName: name,
        email: user.email || "",
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        lastOpenedResumeId: null,
        schemaVersion: 1,
      }),
      8000,
    );
    return;
  }
  if (!sessionStorage.getItem("ipd_cloud_login_touch")) {
    await withTimeout(
      updateDoc(ref, {
        lastLoginAt: serverTimestamp(),
        email: user.email || snap.data().email || "",
      }),
      8000,
    );
    sessionStorage.setItem("ipd_cloud_login_touch", "1");
  }
}

async function currentMember() {
  await authReady;
  const user = auth.currentUser;
  if (!user) {
    const err = Error("Please sign in to continue.");
    err.status = 401;
    throw err;
  }
  await ensureProfile(user).catch(() => {});
  let name = user.displayName || (user.email || "").split("@")[0] || "Member";
  try {
    const snap = await withTimeout(getDoc(userRef(user.uid)), 8000);
    if (snap.exists() && snap.data().displayName) name = snap.data().displayName;
  } catch {
    /* Auth is enough to open the workspace if Firestore is slow. */
  }
  return {
    id: user.uid,
    name,
    email: user.email || "",
    email_verified: user.emailVerified,
    admin: false,
    entitlements: [],
    providers: user.providerData.map((p) => p.providerId),
  };
}

function title(value) {
  return String(value || "Untitled resume").trim().slice(0, 120) || "Untitled resume";
}

function publicTemplate(id) {
  return publicTemplates().find((t) => t.id === id) || null;
}

async function listResumes() {
  const user = requireUser();
  if (!user.emailVerified) return [];
  const snap = await getDocs(
    query(resumesCol(), orderBy("updatedAt", "desc"), limit(40)),
  );
  return snap.docs.map((d) => fromResume(d.id, d.data()));
}

async function createResume(body) {
  const user = requireUser();
  if (!user.emailVerified)
    fail({ code: "permission-denied" });
  const existing = await listResumes();
  if (existing.length >= MAX_RESUMES)
    throw Error(
      "Your account can save up to 20 resumes. Delete a draft to create another.",
    );
  const template = publicTemplate(body.template_id || "ats-essential");
  if (!template || template.access !== "free")
    throw Error("Choose a free template. Pro templates are not available on the live site yet.");
  const data = validateResume(body.data);
  const id = crypto.randomUUID();
  await setDoc(resumeRef(id), {
    title: title(body.title),
    data,
    templateId: template.id,
    templateVersion: template.version,
    lastSection: "personal",
    revision: 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    status: "draft",
    jobId: body.job_id ? String(body.job_id).slice(0, 150) : null,
  });
  await updateDoc(userRef(), { lastOpenedResumeId: id }).catch(() => {});
  const saved = await getDoc(resumeRef(id));
  return fromResume(id, saved.data());
}

async function getResume(id) {
  const user = requireUser();
  if (!user.emailVerified) fail({ code: "permission-denied" });
  const snap = await getDoc(resumeRef(id));
  if (!snap.exists()) {
    const err = Error("Resume not found.");
    err.status = 404;
    throw err;
  }
  const resume = fromResume(id, snap.data());
  await updateDoc(userRef(), { lastOpenedResumeId: id }).catch(() => {});
  return { ...resume, template: publicTemplate(resume.template_id) };
}

async function patchResume(id, body) {
  const user = requireUser();
  if (!user.emailVerified) fail({ code: "permission-denied" });
  try {
    return await runTransaction(db, async (tx) => {
      const ref = resumeRef(id);
      const snap = await tx.get(ref);
      if (!snap.exists()) {
        const err = Error("Resume not found.");
        err.status = 404;
        throw err;
      }
      const current = snap.data();
      if (body.revision !== current.revision) {
        const err = Error(
          "This resume changed on another device. Keep your edits as a copy or reload the saved version.",
        );
        err.status = 409;
        throw err;
      }
      const data = validateResume(body.data ?? current.data);
      let templateId = current.templateId;
      let templateVersion = current.templateVersion;
      if (body.template_id && body.template_id !== current.templateId) {
        const template = publicTemplate(body.template_id);
        if (!template || template.access !== "free")
          throw Error("Choose a free template. Pro templates are not available on the live site yet.");
        templateId = template.id;
        templateVersion = template.version;
      }
      const next = {
        title: title(body.title ?? current.title),
        data,
        templateId,
        templateVersion,
        lastSection: body.last_section ?? current.lastSection ?? "personal",
        revision: current.revision + 1,
        createdAt: current.createdAt,
        updatedAt: serverTimestamp(),
        status: current.status || "draft",
        jobId: current.jobId ?? null,
      };
      tx.update(ref, next);
      return fromResume(id, { ...next, updatedAt: Date.now() });
    });
  } catch (e) {
    if (e.status === 409 || e.status === 404) throw e;
    fail(e);
  }
}

async function deleteResume(id) {
  await deleteDoc(resumeRef(id));
  return { ok: true };
}

async function duplicateResume(id) {
  const original = await getResume(id);
  return createResume({
    title: (original.title + " (copy)").slice(0, 120),
    template_id: original.template_id,
    data: original.data,
    job_id: original.job_id,
  });
}

async function exportAccount() {
  const me = await currentMember();
  const resumes = me.email_verified ? await listResumes() : [];
  return { member: me, resumes };
}

async function deleteAccount() {
  const user = requireUser();
  if (user.emailVerified) {
    const resumes = await listResumes();
    for (const resume of resumes) await deleteDoc(resumeRef(resume.id));
    await deleteDoc(userRef()).catch(() => {});
  }
  await deleteUser(user);
  return { ok: true };
}

async function persist(remember) {
  await setPersistence(
    auth,
    remember ? browserLocalPersistence : browserSessionPersistence,
  );
}

async function afterAuth(user, name) {
  if (name && !user.displayName)
    await updateProfile(user, { displayName: name }).catch(() => {});
  if (!user.emailVerified && user.providerData.some((p) => p.providerId === "password"))
    await sendEmailVerification(user).catch(() => {});
  await ensureProfile(user).catch((e) => {
    if (e.code === "permission-denied") return;
    throw e;
  });
  return currentMember();
}

export async function request(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const body = options.body || {};
  try {
    await authReady;
    if (path === "/config" && method === "GET")
      return { payments: "unavailable", cloud: true, key_id: null };
    if (path === "/templates" && method === "GET") return publicTemplates();
    if (path === "/me" && method === "GET") return currentMember();
    if (path === "/me" && method === "DELETE") {
      if (body.confirm !== "DELETE")
        throw Error("Type DELETE to confirm account deletion.");
      return deleteAccount();
    }
    if (path === "/me/data" && method === "GET") return exportAccount();
    if (path === "/me/entitlements" && method === "GET") return [];
    if (path === "/auth/signup" && method === "POST") {
      await persist(body.remember === true || body.remember === "yes");
      const cred = await createUserWithEmailAndPassword(
        auth,
        body.email,
        body.password,
      );
      return afterAuth(cred.user, body.name);
    }
    if (path === "/auth/login" && method === "POST") {
      await persist(body.remember === true || body.remember === "yes");
      const cred = await signInWithEmailAndPassword(
        auth,
        body.email,
        body.password,
      );
      return afterAuth(cred.user);
    }
    if (path === "/auth/google" && method === "POST") {
      await persist(body.remember === true || body.remember === "yes");
      const cred = await signInWithPopup(auth, googleProvider);
      return afterAuth(cred.user);
    }
    if (path === "/auth/reset" && method === "POST") {
      if (body.email) await sendPasswordResetEmail(auth, body.email).catch(() => {});
      return { ok: true };
    }
    if (path === "/auth/verify" && method === "POST") {
      const user = requireUser();
      await sendEmailVerification(user);
      return { ok: true };
    }
    if (path === "/auth/refresh" && method === "POST") {
      const user = requireUser();
      await reload(user);
      await ensureProfile(user).catch(() => {});
      return currentMember();
    }
    if (
      (path === "/auth/logout" || path === "/auth/logout-all") &&
      method === "POST"
    ) {
      sessionStorage.removeItem("ipd_cloud_login_touch");
      await signOut(auth);
      return { ok: true };
    }
    if (path === "/resumes" && method === "GET") return listResumes();
    if (path === "/resumes" && method === "POST") return createResume(body);
    const resumeMatch = path.match(/^\/resumes\/([^/]+)(?:\/(duplicate))?$/);
    if (resumeMatch) {
      const id = decodeURIComponent(resumeMatch[1]);
      if (resumeMatch[2] === "duplicate" && method === "POST")
        return duplicateResume(id);
      if (method === "GET") return getResume(id);
      if (method === "PATCH") return patchResume(id, body);
      if (method === "DELETE") return deleteResume(id);
    }
    if (path === "/orders" && method === "GET") return [];
    throw Error("This action is not available on the live Career Tools site yet.");
  } catch (e) {
    if (e.status || e.message?.includes("Type DELETE") || e.message?.startsWith("Choose") || e.message?.startsWith("Your account") || e.message?.startsWith("This action") || e.message?.startsWith("This resume"))
      throw e;
    fail(e);
  }
}

export function cloudEnabled() {
  return true;
}
