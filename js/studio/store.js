/* Daily Web Studio — projects saved on this device (Phase 1).
 *
 * Cloud sync (Firestore users/{uid}/studioProjects) arrives with the editor in Phase 4; until
 * then everything lives in localStorage. Reads are validated, so a damaged or hand-edited value
 * never breaks the app, and every write is wrapped because storage can be blocked or full.
 */
import { SITE_TYPES, LOOKS, ACCENTS } from "./data.js";

const KEY = "dws:projects:v1";
const MAX_PROJECTS = 50;
const listeners = new Set();

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

function read() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(raw) ? raw.map(clean).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function write(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
    listeners.forEach((fn) => fn());
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

export const listProjects = () => read().sort((a, b) => b.updatedAt - a.updatedAt);
export const getProject = (id) => read().find((p) => p.id === id) || null;

const newId = () => {
  const rand = crypto?.randomUUID ? crypto.randomUUID().replace(/-/g, "").slice(0, 10) : Math.random().toString(36).slice(2, 12);
  return `s-${Date.now().toString(36)}-${rand}`.toLowerCase();
};

/** Creates a project. Returns { ok, project?, error? }. */
export function createProject(input) {
  const list = read();
  if (list.length >= MAX_PROJECTS) return { ok: false, error: `You can keep up to ${MAX_PROJECTS} sites on this device. Delete one to make room.` };
  const now = Date.now();
  const project = clean({ ...input, id: newId(), createdAt: now, updatedAt: now });
  if (!project) return { ok: false, error: "Please give your site a name." };
  if (!write([project, ...list])) return { ok: false, error: "Your browser blocked saving. Turn off private browsing or allow site storage, then try again." };
  return { ok: true, project };
}

export function updateProject(id, changes) {
  const list = read();
  const i = list.findIndex((p) => p.id === id);
  if (i < 0) return { ok: false, error: "That site no longer exists." };
  const project = clean({ ...list[i], ...changes, id, createdAt: list[i].createdAt, updatedAt: Date.now() });
  if (!project) return { ok: false, error: "Please give your site a name." };
  list[i] = project;
  return write(list) ? { ok: true, project } : { ok: false, error: "Saving failed. Check that site storage is allowed." };
}

export function duplicateProject(id) {
  const p = getProject(id);
  if (!p) return { ok: false, error: "That site no longer exists." };
  return createProject({ ...p, name: clip(`${p.name} (copy)`, 60) });
}

export function deleteProject(id) {
  const list = read();
  const next = list.filter((p) => p.id !== id);
  if (next.length === list.length) return { ok: false, error: "That site no longer exists." };
  return write(next) ? { ok: true } : { ok: false, error: "Deleting failed. Check that site storage is allowed." };
}

/** Everything we keep, as a downloadable JSON backup. */
export const exportAll = () => JSON.stringify({ app: "Daily Web Studio", version: 1, exportedAt: new Date().toISOString(), projects: listProjects() }, null, 2);

export function deleteAll() {
  try {
    localStorage.removeItem(KEY);
    listeners.forEach((fn) => fn());
    return true;
  } catch {
    return false;
  }
}

/** Re-render when another tab changes the projects. */
export function onProjectsChange(fn) {
  listeners.add(fn);
  window.addEventListener("storage", (e) => e.key === KEY && fn());
}

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
