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

function ensureGtag() {
  if (typeof globalThis.gtag === "function") return;
  globalThis.dataLayer = ensureDataLayer();
  globalThis.gtag = function gtag() {
    globalThis.dataLayer.push(arguments);
  };
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

/** Advanced Consent Mode: may load with denied analytics_storage. */
export function loadGaDirect() {
  const id = config.gaMeasurementId;
  if (!id || globalThis.__IPD_GA_DIRECT__) return;
  if (!remoteAllowed()) return;
  if (config.gtmId) return;
  globalThis.__IPD_GA_DIRECT__ = true;
  ensureGtag();
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  globalThis.gtag("js", new Date());
  globalThis.gtag("config", id, { send_page_view: false });
  log("GA4 loading", id);
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
  if (!config.gaMeasurementId || typeof globalThis.gtag !== "function") return;
  try {
    globalThis.gtag("event", name, params || {});
  } catch {
    /* ignore */
  }
}

export function loadRemoteTags() {
  loadGtm();
  loadGaDirect();
  loadClarity();
  loadAdSense();
}
