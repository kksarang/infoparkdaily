/**
 * InfoparkDaily Analytics — Performance metrics (Phase 16 ESM)
 * Core Web Vitals + resource / error signals for GA4 & Looker.
 */

export const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000, unit: "ms" },
  CLS: { good: 0.1, poor: 0.25, unit: "score" },
  INP: { good: 200, poor: 500, unit: "ms" },
  TTFB: { good: 800, poor: 1800, unit: "ms" },
  FCP: { good: 1800, poor: 3000, unit: "ms" },
  slowResourceMs: 2000,
  slowImageMs: 2500,
  largeScriptBytes: 300 * 1024,
  slowPageMs: 4000
};

export const METRICS = [
  { id: "lcp", label: "LCP", event: "performance", metric_name: "LCP", source: "PerformanceObserver" },
  { id: "cls", label: "CLS", event: "performance", metric_name: "CLS", source: "PerformanceObserver" },
  { id: "inp", label: "INP", event: "performance", metric_name: "INP", source: "PerformanceObserver" },
  { id: "ttfb", label: "TTFB", event: "performance", metric_name: "TTFB", source: "Navigation Timing" },
  { id: "fcp", label: "FCP", event: "performance", metric_name: "FCP", source: "Paint Timing" },
  { id: "resource_loading", label: "Resource Loading", event: "performance", metric_name: "resource_summary", source: "Resource Timing" },
  { id: "slow_images", label: "Slow Images", event: "performance", metric_name: "slow_image", source: "Resource Timing" },
  { id: "large_javascript", label: "Large JavaScript", event: "performance", metric_name: "large_script", source: "Resource Timing" },
  { id: "api_failures", label: "API Failures", event: "api_fail", source: "fetch / XHR" },
  { id: "404_errors", label: "404 Errors", event: "404_page", source: "Router + resource status" },
  { id: "broken_images", label: "Broken Images", event: "image_error", source: "img error" },
  { id: "console_errors", label: "Console Errors", event: "error", filter: "error_kind=console", source: "console.error bridge" },
  { id: "unhandled_exceptions", label: "Unhandled Exceptions", event: "error", filter: "error_kind=exception|rejection", source: "window.onerror" }
];

export function rate(name, value) {
  var t = THRESHOLDS[name];
  if (!t || value == null || isNaN(Number(value))) return "";
  var v = Number(value);
  if (v <= t.good) return "good";
  if (v <= t.poor) return "needs-improvement";
  return "poor";
}

export function shortUrl(url) {
  try {
    var u = new URL(url, (globalThis.location && globalThis.location.href) || undefined);
    return (u.pathname + u.search).slice(0, 180);
  } catch (_e) {
    return String(url || "").slice(0, 180);
  }
}

export function resourceType(entry) {
  var initiator = (entry && entry.initiatorType) || "";
  if (initiator === "img" || initiator === "image" || initiator === "css" && /\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/i.test(entry.name || ""))
    return "image";
  if (initiator === "script") return "script";
  if (initiator === "css" || initiator === "link") return "css";
  if (initiator === "xmlhttprequest" || initiator === "fetch") return "api";
  if (initiator === "beacon") return "beacon";
  return initiator || "other";
}

export function analyzeResources(entries, opts) {
  opts = opts || {};
  var slowMs = opts.slowResourceMs != null ? opts.slowResourceMs : THRESHOLDS.slowResourceMs;
  var slowImg = opts.slowImageMs != null ? opts.slowImageMs : THRESHOLDS.slowImageMs;
  var largeJs = opts.largeScriptBytes != null ? opts.largeScriptBytes : THRESHOLDS.largeScriptBytes;

  var summary = {
    count: 0,
    transfer_bytes: 0,
    slow: [],
    slow_images: [],
    large_scripts: [],
    failed: []
  };

  (entries || []).forEach(function (entry) {
    summary.count += 1;
    var size = entry.transferSize || entry.encodedBodySize || 0;
    summary.transfer_bytes += size;
    var dur = entry.duration || 0;
    var type = resourceType(entry);
    var name = shortUrl(entry.name);

    if (entry.responseStatus === 404 || entry.responseStatus === 0 && dur === 0 && entry.transferSize === 0) {
      /* responseStatus is Chromium; transferSize 0 can mean cache — skip false fails */
    }
    if (entry.responseStatus >= 400) {
      summary.failed.push({ url: name, status: entry.responseStatus, type: type });
    }

    if (dur >= slowMs) {
      summary.slow.push({ url: name, duration_ms: Math.round(dur), type: type, bytes: size });
    }
    if (type === "image" && dur >= slowImg) {
      summary.slow_images.push({ url: name, duration_ms: Math.round(dur), bytes: size });
    }
    if (type === "script" && size >= largeJs) {
      summary.large_scripts.push({ url: name, bytes: size, duration_ms: Math.round(dur) });
    }
  });

  return summary;
}

export function readNavTiming() {
  try {
    var list = globalThis.performance && globalThis.performance.getEntriesByType
      ? globalThis.performance.getEntriesByType("navigation")
      : [];
    var n = list && list[0];
    if (n) {
      return {
        ttfb_ms: Math.round(n.responseStart),
        dcl_ms: Math.round(n.domContentLoadedEventEnd),
        nav_ms: Math.round(n.loadEventEnd || n.duration),
        transfer_bytes: n.transferSize || 0,
        type: n.type || ""
      };
    }
  } catch (_e) {
    /* fall through */
  }
  try {
    var t = globalThis.performance.timing;
    if (!t || !t.navigationStart) return null;
    return {
      ttfb_ms: t.responseStart - t.navigationStart,
      dcl_ms: t.domContentLoadedEventEnd - t.navigationStart,
      nav_ms: t.loadEventEnd - t.navigationStart,
      transfer_bytes: 0,
      type: ""
    };
  } catch (_e2) {
    return null;
  }
}

export function readFcp() {
  try {
    var paints = globalThis.performance.getEntriesByType("paint") || [];
    for (var i = 0; i < paints.length; i++) {
      if (paints[i].name === "first-contentful-paint") {
        return Math.round(paints[i].startTime);
      }
    }
  } catch (_e) {
    /* ignore */
  }
  return null;
}
