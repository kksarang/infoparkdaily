/**
 * InfoparkDaily Analytics — configuration
 * ========================================
 * Fill IDs after creating free accounts. Safe to commit (public site IDs).
 * Leave blank to no-op trackers until ready.
 *
 * GA4:     https://analytics.google.com  → Admin → Data streams → Measurement ID (G-…)
 * GTM:     https://tagmanager.google.com → Container ID (GTM-…)
 * Clarity: https://clarity.microsoft.com → Project → Settings → ID
 */
(function (global) {
  "use strict";

  var host = "";
  try {
    host = String((global.location && global.location.hostname) || "");
  } catch (_e) {
    host = "";
  }

  var isLocal =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "0.0.0.0" ||
    host.indexOf(".local") !== -1;

  global.IPD_ANALYTICS_CONFIG = {
    /** Google Tag Manager container ID, e.g. "GTM-XXXXXXX" */
    gtmId: "",

    /** GA4 measurement ID, e.g. "G-XXXXXXXX". Prefer loading GA via GTM; keep for direct fallback. */
    gaMeasurementId: "",

    /** Microsoft Clarity project ID */
    clarityId: "xtwgj04rm6",

    /**
     * Phase 11 — Clarity behaviour
     * Session recording, heatmaps, scroll maps, dead/rage clicks, quick backs
     * are Clarity product features (enabled in the Clarity dashboard by default).
     */
    clarityEnabled: true,
    clarityConsent: true,
    clarityMaskForms: true,
    /** Upgrade Clarity recording priority on conversion events */
    clarityUpgradeOnConversion: true,
    /** Mirror high-value events as Clarity custom events for filtering */
    clarityMirrorEvents: true,

    /** Master switch */
    enabled: true,

    /** Verbose console logging */
    debug: isLocal,

    /** Skip remote tags on local serve (events still push to dataLayer when debug) */
    disableRemoteOnLocalhost: true,

    /** Collect device / locale / network snapshot (user_context) */
    trackUserContext: true,

    /** Auto page_view on init */
    autoPageView: true,

    /** Capture UTMs + classify session channel (session_attrib) */
    captureUtm: true,
    trackSessionAttrib: true,

    /** Sitewide page_exit on pagehide (Phase 9) */
    trackPageExit: true,

    /** Auto-bind [data-ipd-ad] / [data-ipd-sponsor] (Phase 10) */
    trackAds: true,

    /** Scroll depth milestones */
    scrollDepths: [25, 50, 75, 100],

    /** Outbound link click tracking */
    trackOutbound: true,

    /** Track tel: / mailto: clicks */
    trackContactLinks: true,

    /** Core Web Vitals (LCP, CLS, INP) via web-vitals CDN when enabled */
    trackWebVitals: true,

    /** window.onerror + unhandledrejection */
    trackErrors: true,

    /** Navigation Timing performance marks */
    trackPerformance: true,

    /** Slow page threshold (ms) for performance event */
    slowPageMs: 4000,

    /** dataLayer name */
    dataLayerName: "dataLayer",

    /** Global API namespace */
    namespace: "IPDAnalytics"
  };
})(typeof window !== "undefined" ? window : this);
