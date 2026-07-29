/**
 * Analytics config — single source of truth (ESM).
 * Safe to commit (public site IDs only).
 */
function detectLocal() {
  try {
    const host = String(globalThis.location?.hostname || "");
    return (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "0.0.0.0" ||
      host.includes(".local")
    );
  } catch {
    return false;
  }
}

const isLocal = detectLocal();

/** @type {Readonly<Record<string, unknown>>} */
export const config = Object.freeze({
  gtmId: "",
  gaMeasurementId: "G-PWD80WZ7Q2",
  clarityId: "xtwgj04rm6",
  /** Google AdSense publisher client (ca-pub-…) */
  adsenseClientId: "ca-pub-4593359890362954",
  adsenseEnabled: true,

  clarityEnabled: true,
  clarityConsent: true,
  clarityMaskForms: true,
  clarityUpgradeOnConversion: true,
  clarityMirrorEvents: true,

  enabled: true,
  debug: isLocal,
  disableRemoteOnLocalhost: true,

  trackUserContext: true,
  autoPageView: true,
  captureUtm: true,
  trackSessionAttrib: true,
  trackPageExit: true,
  trackAds: true,

  scrollDepths: Object.freeze([25, 50, 75, 100]),
  trackOutbound: true,
  trackContactLinks: true,
  trackWebVitals: true,
  trackErrors: true,
  trackConsoleErrors: true,
  trackPerformance: true,
  trackResources: true,
  trackBrokenImages: true,
  trackApiFailures: true,

  slowPageMs: 4000,
  slowResourceMs: 2000,
  slowImageMs: 2500,
  largeScriptBytes: 307200,

  trackSeoAudit: true,
  seoProbeInternalLinks: true,
  seoProbeLinkLimit: 8,

  requireConsent: true,
  consentStorageKey: "ipd_consent_v1",

  dataLayerName: "dataLayer",
  /** Sole public API name for legacy non-module page scripts */
  publicApiName: "IPDAnalytics"
});

export function isLocalHost() {
  return isLocal;
}
