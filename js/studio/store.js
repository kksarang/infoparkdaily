/* Daily Web Studio — where sites are kept.
 *
 * Two modes, same API for the app:
 *   • device  — signed out (or email not verified yet): sites live in localStorage.
 *   • account — signed in with a verified email: sites live in Firestore
 *               (users/{uid}/studioProjects) and appear on every device.
 *
 * Reads are synchronous from an in-memory list. In account mode every change is applied to
 * that list at once (so the UI never waits) and then written to Firestore; the live Firestore
 * listener then confirms it. If a write fails, the listener's next snapshot restores the truth
 * and the app is told through onSyncChange().
 */
import { SITE_TYPES, LOOKS, ACCENTS } from "./data.js";

const KEY = "dws:projects:v1";
export const MAX_PROJECTS = 50;
const listeners = new Set();
const syncListeners = new Set();

const clip = (v, n) => String(v ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, n);

/** Keep only known fields with safe values. Returns null for anything unusable. */
export function clean(p) {
  if (!p || typeof p !== "object") return null;
  const id = clip(p.id, 40);
  if (!/^[a-z0-9-]{6,40}$/.test(id)) return null;
  const name = clip(p.name, 60);
  if (!name) return null;
  const type = SITE_TYPES.some((t) => t.id === p.type) ? p.type : "portfolio";
  const look = LOOKS.some((l) => l.id === p.look) ? p.look : "clean";
  const accent = ACCENTS.some((a) => a.id === p.accent) ? p.accent : "coral";
  const pages = Array.isArray(p.pages) ? [...new Set(p.pages.map((x) => clip(x, 30)).filter(Boolean))].slice(0, 12) : [];
  const now = Date.now();
  const time = (t) => (Number.isFinite(t) && t > 0 && t <= now + 60000 ? t : now);
  return {
    id,
    name,
    tagline: clip(p.tagline, 140),
    location: clip(p.location, 60),
    type,
    look,
    accent,
    pages: pages.length ? pages : ["Home"],
    createdAt: time(p.createdAt),
    updatedAt: time(p.updatedAt),
    version: 1,
  };
}

/* ---------------- mode ---------------- */

let mode = "device"; // "device" | "account"
let cloud = null; // js/studio/cloud.bundle.js module, in account mode
let uid = null;
let stopWatch = null;
let cache = []; // account mode: the live list from Firestore (+ optimistic changes)
const revs = new Map(); // account mode: id -> stored revision
let sync = { state: "idle", message: "" }; // idle | loading | saving | saved | error | offline
let pendingWrites = 0;

export const getMode = () => mode;
export const getSync = () => sync;
const emit = () => listeners.forEach((fn) => fn());
function setSync(state, message = "") {
  sync = { state, message };
  syncListeners.forEach((fn) => fn(sync));
}

/** Switch to the person's account. Resolves once the first list has arrived (or failed). */
export function useAccount(cloudModule, userId) {
  if (mode === "account" && uid === userId) return Promise.resolve();
  stopWatch?.();
  mode = "account";
  cloud = cloudModule;
  uid = userId;
  cache = [];
  revs.clear();
  setSync("loading");
  emit();
  return new Promise((resolve) => {
    let first = true;
    stopWatch = cloud.watchProjects(
      uid,
      (list, meta) => {
        cache = list.map((p) => {
          revs.set(p.id, p.revision);
          return clean(p);
        }).filter(Boolean);
        if (pendingWrites === 0) setSync(meta.fromCache && !navigator.onLine ? "offline" : "saved");
        emit();
        if (first) (first = false), resolve();
      },
      (err) => {
        setSync("error", cloud.authMessage(err));
        emit();
        if (first) (first = false), resolve();
      },
    );
  });
}

/** Back to this device (signed out, or email not verified). */
export function useDevice() {
  stopWatch?.();
  stopWatch = null;
  mode = "device";
  cloud = null;
  uid = null;
  cache = [];
  revs.clear();
  setSync("idle");
  emit();
}

async function write(job) {
  pendingWrites += 1;
  setSync("saving");
  try {
    await job();
    pendingWrites -= 1;
    if (pendingWrites === 0) setSync("saved");
    return true;
  } catch (e) {
    pendingWrites -= 1;
    setSync("error", cloud ? cloud.authMessage(e) : "Saving failed.");
    return false;
  }
}

/* ---------------- device storage ---------------- */

function readLocal() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(raw) ? raw.map(clean).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function writeLocal(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
    if (mode === "device") emit();
    return true;
  } catch {
    return false;
  }
}

export const storageAvailable = () => {
  try {
    localStorage.setItem("dws:probe", "1");
    localStorage.removeItem("dws:probe");
    return true;
  } catch {
    return false;
  }
};

/** Sites still saved on this device (shown as "move to your account" when signed in). */
export const deviceProjects = () => readLocal().sort((a, b) => b.updatedAt - a.updatedAt);

/* ---------------- shared API ---------------- */

const current = () => (mode === "account" ? cache : readLocal());
export const listProjects = () => [...current()].sort((a, b) => b.updatedAt - a.updatedAt);
export const getProject = (id) => current().find((p) => p.id === id) || null;

const newId = () => {
  const rand = crypto?.randomUUID ? crypto.randomUUID().replace(/-/g, "").slice(0, 10) : Math.random().toString(36).slice(2, 12);
  return `s-${Date.now().toString(36)}-${rand}`.toLowerCase();
};

/** Creates a site. Returns { ok, project?, error? }. */
export function createProject(input) {
  const list = current();
  if (list.length >= MAX_PROJECTS) return { ok: false, error: `You can keep up to ${MAX_PROJECTS} sites. Delete one to make room.` };
  const now = Date.now();
  const project = clean({ ...input, id: newId(), createdAt: now, updatedAt: now });
  if (!project) return { ok: false, error: "Please give your site a name." };
  if (mode === "account") {
    cache = [project, ...cache];
    revs.set(project.id, 1);
    emit();
    write(() => cloud.createProjectDoc(uid, project));
    return { ok: true, project };
  }
  if (!writeLocal([project, ...list])) return { ok: false, error: "Your browser blocked saving. Turn off private browsing or allow site storage, then try again." };
  return { ok: true, project };
}

export function updateProject(id, changes) {
  const list = current();
  const i = list.findIndex((p) => p.id === id);
  if (i < 0) return { ok: false, error: "That site no longer exists." };
  const project = clean({ ...list[i], ...changes, id, createdAt: list[i].createdAt, updatedAt: Date.now() });
  if (!project) return { ok: false, error: "Please give your site a name." };
  if (mode === "account") {
    const rev = revs.get(id) || 1;
    revs.set(id, rev + 1); // the next change builds on this one
    cache = cache.map((p) => (p.id === id ? project : p));
    emit();
    write(() => cloud.updateProjectDoc(uid, id, project, rev));
    return { ok: true, project };
  }
  const next = [...list];
  next[i] = project;
  return writeLocal(next) ? { ok: true, project } : { ok: false, error: "Saving failed. Check that site storage is allowed." };
}

export function duplicateProject(id) {
  const p = getProject(id);
  if (!p) return { ok: false, error: "That site no longer exists." };
  return createProject({ ...p, name: clip(`${p.name} (copy)`, 60) });
}

export function deleteProject(id) {
  const list = current();
  if (!list.some((p) => p.id === id)) return { ok: false, error: "That site no longer exists." };
  if (mode === "account") {
    cache = cache.filter((p) => p.id !== id);
    revs.delete(id);
    emit();
    write(() => cloud.deleteProjectDoc(uid, id));
    return { ok: true };
  }
  return writeLocal(list.filter((p) => p.id !== id)) ? { ok: true } : { ok: false, error: "Deleting failed. Check that site storage is allowed." };
}

/** Everything we keep, as a downloadable JSON backup. */
export const exportAll = () =>
  JSON.stringify({ app: "Daily Web Studio", version: 1, savedIn: mode, exportedAt: new Date().toISOString(), projects: listProjects() }, null, 2);

export async function deleteAll() {
  if (mode === "account") {
    const ok = await write(() => cloud.deleteAllProjectDocs(uid));
    return ok;
  }
  try {
    localStorage.removeItem(KEY);
    emit();
    return true;
  } catch {
    return false;
  }
}

/** Moves the sites saved on this device into the account. Returns { moved, failed, skipped }. */
export async function moveDeviceSitesToAccount() {
  if (mode !== "account") return { moved: 0, failed: 0, skipped: 0 };
  const local = readLocal();
  const room = Math.max(0, MAX_PROJECTS - cache.length);
  const taking = local.slice(0, room);
  let moved = 0;
  const kept = [];
  for (const p of taking) {
    const exists = cache.some((c) => c.id === p.id);
    const ok = exists || (await write(() => cloud.createProjectDoc(uid, p, true)));
    if (ok) moved += 1;
    else kept.push(p);
  }
  kept.push(...local.slice(room));
  try {
    if (kept.length) localStorage.setItem(KEY, JSON.stringify(kept));
    else localStorage.removeItem(KEY);
  } catch {}
  emit();
  return { moved, failed: kept.length - (local.length - taking.length), skipped: local.length - taking.length };
}

/** Re-render when sites change (this tab, another tab, or another device). */
export function onProjectsChange(fn) {
  listeners.add(fn);
  window.addEventListener("storage", (e) => e.key === KEY && mode === "device" && fn());
}
export const onSyncChange = (fn) => syncListeners.add(fn);

/* Wizard draft survives a refresh within the tab. */
const DRAFT = "dws:draft:v1";
export const readDraft = () => {
  try {
    return JSON.parse(sessionStorage.getItem(DRAFT) || "null");
  } catch {
    return null;
  }
};
export const writeDraft = (d) => {
  try {
    sessionStorage.setItem(DRAFT, JSON.stringify(d));
  } catch {}
};
export const clearDraft = () => {
  try {
    sessionStorage.removeItem(DRAFT);
  } catch {}
};
