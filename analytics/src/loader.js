/**
 * Remote tag loaders (GTM / GA4 / Clarity) — ESM, consent-aware.
 */
import { config, isLocalHost } from "./config.js";
import { hasAnalyticsConsent } from "./consent.js";

function log(...args) {
  if (!config.debug) return;
  try {
    console.log("[IPD Analytics]", ...args);
  } catch {
    /* ignore */
  }
}

export function remoteAllowed() {
  if (!config.enabled) return false;
  if (config.disableRemoteOnLocalhost && isLocalHost()) return false;
  return true;
}

export function ensureDataLayer() {
  const name = config.dataLayerName || "dataLayer";
  globalThis[name] = globalThis[name] || [];
  return globalThis[name];
}

export function pushDataLayer(payload) {
  ensureDataLayer().push(payload);
  log("dataLayer", payload);
}

export function loadGtm() {
  const id = config.gtmId;
  if (!id || globalThis.__IPD_GTM_LOADED__) return;
  if (!remoteAllowed() || !hasAnalyticsConsent()) {
    log("GTM skipped", id);
    return;
  }
  globalThis.__IPD_GTM_LOADED__ = true;
  ensureDataLayer();
  pushDataLayer({ "gtm.start": Date.now(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  log("GTM loading", id);
}

let firebaseBridgePromise;
function firebaseBridge() {
  if (!firebaseBridgePromise)
    firebaseBridgePromise = import("/analytics/firebase-bridge.bundle.js?v=20260915a");
  return firebaseBridgePromise;
}

export function loadClarity() {
  const id = config.clarityId;
  if (!id || globalThis.__IPD_CLARITY_LOADED__) return;
  if (!remoteAllowed() || !hasAnalyticsConsent() || config.clarityEnabled === false) {
    log("Clarity skipped / waiting consent");
    return;
  }
  globalThis.__IPD_CLARITY_LOADED__ = true;
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(globalThis, document, "clarity", "script", id);
  try {
    if (typeof globalThis.clarity === "function") globalThis.clarity("consent");
  } catch {
    /* ignore */
  }
  log("Clarity loading", id);
}

/** Google AdSense — only after Accept (ad_storage granted). */
export function loadAdSense() {
  const client = config.adsenseClientId;
  if (!client || config.adsenseEnabled === false) return;
  if (globalThis.__IPD_ADSENSE_LOADED__) return;
  if (document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
    globalThis.__IPD_ADSENSE_LOADED__ = true;
    return;
  }
  if (!remoteAllowed() || !hasAnalyticsConsent()) {
    log("AdSense skipped / waiting consent");
    return;
  }
  globalThis.__IPD_ADSENSE_LOADED__ = true;
  const s = document.createElement("script");
  s.async = true;
  s.crossOrigin = "anonymous";
  s.src =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
    encodeURIComponent(client);
  document.head.appendChild(s);
  log("AdSense loading", client);
}

export function sendToGa(name, params) {
  if (!remoteAllowed() || !hasAnalyticsConsent()) return;
  if (config.gtmId) return; // GTM owns delivery
  if (!config.gaMeasurementId) return;
  void firebaseBridge()
    .then((bridge) => {
      if (hasAnalyticsConsent()) return bridge.sendEvent(name, params);
    })
    .catch(() => {});
}

export function setFirebaseAnalyticsUser(uid, props) {
  if (!remoteAllowed() || !hasAnalyticsConsent()) return;
  void firebaseBridge()
    .then((bridge) => {
      if (hasAnalyticsConsent()) return bridge.setAnalyticsUserId(uid, props);
    })
    .catch(() => {});
}

export function loadRemoteTags() {
  loadGtm();
  if (remoteAllowed() && hasAnalyticsConsent() && !config.gtmId)
    void firebaseBridge().catch(() => {});
  loadClarity();
  loadAdSense();
}
