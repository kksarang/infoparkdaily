/**
 * Central tracking — single send path for all events (ESM).
 */
import { config } from "./config.js";
import { assertName } from "./events.js";
import { UTM_KEYS, STORAGE } from "./events.js";
import { hasAnalyticsConsent } from "./consent.js";
import { pushDataLayer, sendToGa } from "./loader.js";

const SENSITIVE_QUERY = /^(email|e-mail|password|token|id_token|access_token|refresh_token|code|next|name|phone|tel|message|notes|resume|content)$/i;
const recent = new Map();

function sessionGet(key) {
  try {
    return globalThis.sessionStorage?.getItem(key);
  } catch {
    return null;
  }
}

function sessionSet(key, value) {
  try {
    globalThis.sessionStorage?.setItem(key, value);
  } catch {
    /* ignore */
  }
}

function readJson(raw) {
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Strip secrets / PII from URLs before analytics. */
export function sanitizeUrl(raw) {
  try {
    const u = new URL(String(raw || ""), globalThis.location?.origin || "https://infoparkdaily.online");
    const drop = [];
    u.searchParams.forEach((_v, k) => {
      if (SENSITIVE_QUERY.test(k) || /email|token|password|phone/i.test(k)) drop.push(k);
    });
    drop.forEach((k) => u.searchParams.delete(k));
    return u.pathname + (u.search || "");
  } catch {
    return String(raw || "").split("?")[0];
  }
}

function sanitizeParams(params = {}) {
  const out = {};
  for (const [k, v] of Object.entries(params || {})) {
    if (v == null || v === "") continue;
    if (SENSITIVE_QUERY.test(k)) continue;
    if (typeof v === "string") {
      if (/@/.test(v) && v.includes(".")) continue;
      if (/^https?:\/\/wa\.me\//i.test(v)) {
        out[k] = "https://wa.me/";
        continue;
      }
      if (/^https?:\/\//i.test(v) || v.startsWith("/")) {
        out[k] = sanitizeUrl(v);
        continue;
      }
      out[k] = v.slice(0, 120);
    } else if (typeof v === "number" || typeof v === "boolean") {
      out[k] = v;
    } else {
      out[k] = String(v).slice(0, 80);
    }
  }
  return out;
}

function dedupe(name, params) {
  const key = name + ":" + JSON.stringify(params);
  const now = Date.now();
  const prev = recent.get(key) || 0;
  if (now - prev < 800) return true;
  recent.set(key, now);
  if (recent.size > 200) {
    for (const [k, t] of recent) {
      if (now - t > 5000) recent.delete(k);
    }
  }
  return false;
}

/** Merge first-touch UTMs + channel onto every event. */
export function mergeSessionParams(params = {}) {
  const utm = readJson(sessionGet(STORAGE.UTM));
  const attrib = readJson(sessionGet(STORAGE.ATTRIB));
  const base = {};
  if (utm) Object.assign(base, utm);
  if (attrib?.channel) base.channel = attrib.channel;
  if (attrib?.channel_group) base.channel_group = attrib.channel_group;
  return Object.assign(base, params);
}

export function captureUtmFromLocation() {
  if (!config.captureUtm) return null;
  const params = new URLSearchParams(globalThis.location?.search || "");
  const found = {};
  let any = false;
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) {
      found[k] = v;
      any = true;
    }
  }
  if (any) {
    sessionSet(STORAGE.UTM, JSON.stringify(found));
    pushDataLayer(Object.assign({ event: "ipd_utm_capture" }, found));
    return found;
  }
  return readJson(sessionGet(STORAGE.UTM));
}

/**
 * Central tracking function — all product events go through here.
 * Never throws; never blocks product flows.
 * @param {string} name
 * @param {Record<string, unknown>} [params]
 */
export function track(name, params = {}) {
  try {
    if (!config.enabled) return;
    const eventName = assertName(name);
    const payload = sanitizeParams(mergeSessionParams(params));
    if (dedupe(eventName, payload)) return;
    pushDataLayer(Object.assign({ event: eventName }, payload));
    if (hasAnalyticsConsent()) {
      sendToGa(eventName, payload);
    }
    if (config.clarityMirrorEvents && config.clarityId && hasAnalyticsConsent()) {
      import("./clarity-bridge.js")
        .then((Cl) => {
          if (Cl.shouldMirror?.(eventName)) Cl.trackClarityEvent(eventName);
          if (config.clarityUpgradeOnConversion && Cl.shouldUpgrade?.(eventName)) {
            Cl.upgradeSession(eventName);
          }
        })
        .catch(() => {});
    }
  } catch {
    /* analytics must never break the site */
  }
}

export { sessionGet, sessionSet, readJson };
