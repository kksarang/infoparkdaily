/**
 * InfoparkDaily Analytics — User / session metrics (Phase 16 ESM)
 * Documents KPIs and collects client-side context GA4 cannot always see.
 */

/**
 * source: "ga4" = built-in free report · "client" = we send · "both"
 */
export const METRICS = [
  { id: "users", label: "Users", source: "ga4", report: "Reports → Acquisition / Engagement → Overview", ga4: "Total users" },
  { id: "sessions", label: "Sessions", source: "ga4", report: "Reports → Engagement → Overview", ga4: "Sessions" },
  { id: "returning_users", label: "Returning Users", source: "ga4", report: "User attribute: New / returning", ga4: "Returning users" },
  { id: "new_users", label: "New Users", source: "ga4", report: "Reports → Acquisition", ga4: "New users" },
  { id: "engaged_sessions", label: "Engaged Sessions", source: "ga4", report: "Engagement overview", ga4: "Engaged sessions (≥10s / conversion / 2+ pages)" },
  { id: "bounce_rate", label: "Bounce Rate", source: "ga4", report: "Engagement", ga4: "Bounce rate = 1 − engaged sessions / sessions" },
  { id: "avg_session_time", label: "Average Session Time", source: "ga4", report: "Engagement", ga4: "Average engagement time per session" },
  { id: "country", label: "Country", source: "ga4", report: "User → Demographic details", ga4: "Country" },
  { id: "state", label: "State / Region", source: "ga4", report: "Demographic details → Region", ga4: "Region" },
  { id: "city", label: "City", source: "ga4", report: "Demographic details → City", ga4: "City" },
  { id: "language", label: "Language", source: "both", report: "GA4 Language + user_context.language", ga4: "Language", client: "navigator.language" },
  { id: "browser", label: "Browser", source: "both", report: "Tech details → Browser", ga4: "Browser", client: "UA / userAgentData" },
  { id: "device", label: "Device", source: "both", report: "Tech → Device category", ga4: "mobile|desktop|tablet", client: "coarse width heuristic" },
  { id: "os", label: "Operating System", source: "both", report: "Tech → OS", ga4: "Operating system", client: "platform hint" },
  { id: "screen_resolution", label: "Screen Resolution", source: "both", report: "Tech → Screen resolution", ga4: "Screen resolution", client: "screen.width x height" },
  { id: "network_speed", label: "Network Speed", source: "client", report: "user_context / Looker", ga4: null, client: "navigator.connection.effectiveType + downlink" }
];

export function parseBrowser(ua) {
  ua = String(ua || "");
  if (/Edg\//i.test(ua)) return "Edge";
  if (/OPR\/|Opera/i.test(ua)) return "Opera";
  if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) return "Chrome";
  if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) return "Safari";
  if (/Firefox\//i.test(ua)) return "Firefox";
  if (/MSIE|Trident/i.test(ua)) return "IE";
  return "Other";
}

export function parseOS(ua, platform) {
  ua = String(ua || "");
  platform = String(platform || "");
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Mac OS X|Macintosh/i.test(ua) || /Mac/i.test(platform)) return "macOS";
  if (/Windows/i.test(ua) || /Win/i.test(platform)) return "Windows";
  if (/Linux/i.test(ua)) return "Linux";
  if (/CrOS/i.test(ua)) return "ChromeOS";
  return platform || "Other";
}

export function deviceCategory(width) {
  width = Number(width) || 0;
  if (width > 0 && width < 768) return "mobile";
  if (width >= 768 && width < 1024) return "tablet";
  return "desktop";
}

/**
 * Snapshot of client-only context for dataLayer / user_context event.
 */
export function collectClientContext() {
  var nav = globalThis.navigator || {};
  var scr = globalThis.screen || {};
  var ua = nav.userAgent || "";
  var width = globalThis.innerWidth || scr.width || 0;
  var height = globalThis.innerHeight || scr.height || 0;
  var conn = nav.connection || nav.mozConnection || nav.webkitConnection || null;

  var ctx = {
    language: nav.language || (nav.languages && nav.languages[0]) || "",
    languages: (nav.languages || []).slice(0, 5).join(","),
    browser: parseBrowser(ua),
    os: parseOS(ua, nav.platform || ""),
    device_category: deviceCategory(width),
    screen_resolution: (scr.width || 0) + "x" + (scr.height || 0),
    viewport: width + "x" + height,
    pixel_ratio: globalThis.devicePixelRatio || 1,
    timezone: "",
    network_type: "",
    network_downlink: "",
    network_rtt: "",
    save_data: false,
    touch: "ontouchstart" in globalThis || (nav.maxTouchPoints || 0) > 0
  };

  try {
    ctx.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch (_e) {
    /* ignore */
  }

  if (conn) {
    ctx.network_type = conn.effectiveType || conn.type || "";
    ctx.network_downlink = conn.downlink != null ? String(conn.downlink) : "";
    ctx.network_rtt = conn.rtt != null ? String(conn.rtt) : "";
    ctx.save_data = Boolean(conn.saveData);
  }

  try {
    var uad = nav.userAgentData;
    if (uad) {
      if (uad.mobile != null) ctx.device_category = uad.mobile ? "mobile" : ctx.device_category;
      if (uad.platform) ctx.os = uad.platform;
      if (uad.brands && uad.brands.length) {
        ctx.browser = (uad.brands[uad.brands.length - 1] || {}).brand || ctx.browser;
      }
    }
  } catch (_e2) {
    /* ignore */
  }

  return ctx;
}

export function networkSpeedLabel(ctx) {
  ctx = ctx || {};
  var t = String(ctx.network_type || "").toLowerCase();
  if (!t) return "unknown";
  if (t === "4g") return "fast";
  if (t === "3g") return "moderate";
  if (t === "2g" || t === "slow-2g") return "slow";
  return t;
}

export const ga4BuiltinIds = METRICS.filter(function (m) {
  return m.source === "ga4" || m.source === "both";
}).map(function (m) {
  return m.id;
});

export const clientOnlyIds = METRICS.filter(function (m) {
  return m.source === "client";
}).map(function (m) {
  return m.id;
});
