/**
 * Central tracking — single send path for all events (ESM).
 */
import { config } from "./config.js";
import { assertName } from "./events.js";
import { UTM_KEYS, STORAGE } from "./events.js";
import { hasAnalyticsConsent } from "./consent.js";
import { pushDataLayer, sendToGa } from "./loader.js";

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
 * @param {string} name
 * @param {Record<string, unknown>} [params]
 */
export function track(name, params = {}) {
  if (!config.enabled) return;
  const eventName = assertName(name);
  const payload = mergeSessionParams(params);
  pushDataLayer(Object.assign({ event: eventName }, payload));
  if (hasAnalyticsConsent()) {
    sendToGa(eventName, payload);
  }
  // Lazy Clarity mirror (dynamic import — tree-shake friendly when unused)
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
}

export { sessionGet, sessionSet, readJson };
