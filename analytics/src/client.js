/**
 * Browser client — page instrumentation (single responsibility: wire DOM → track).
 */
import { config } from "./config.js";
import { EVENTS, STORAGE, SOCIAL } from "./events.js";
import { track, captureUtmFromLocation, sessionGet, sessionSet, readJson } from "./track.js";
import { initConsent, hasAnalyticsConsent, openConsentPreferences } from "./consent.js";
import { loadRemoteTags, loadClarity, loadAdSense, pushDataLayer } from "./loader.js";
import { classify as classifyChannel } from "./acquisition.js";
import { contentTypeFromPath, returningVisitFlag } from "./content.js";
import { collectClientContext, networkSpeedLabel } from "./user-context.js";
import { leadType, isEmployerLead } from "./business.js";

let started = false;
const pageStartedAt = Date.now();

function pageContext(extra = {}) {
  const loc = globalThis.location || {};
  return Object.assign(
    {
      page_location: String(loc.href || ""),
      page_path: String(loc.pathname || ""),
      page_title: String(globalThis.document?.title || ""),
      page_referrer: String(globalThis.document?.referrer || "")
    },
    extra
  );
}

function trackPageView(extra = {}) {
  const path = globalThis.location?.pathname || "";
  const returning = returningVisitFlag();
  const base = {
    content_type: contentTypeFromPath(path),
    returning_visit: returning,
    user_type: returning ? "returning" : "new"
  };
  const landKey = `${STORAGE.SESSION_ID || "ipd_sid"}_landed`;
  if (!sessionGet(landKey)) {
    sessionSet(landKey, "1");
    base.is_landing = true;
    base.landing_path = path;
  } else {
    base.is_landing = false;
  }
  track(EVENTS.PAGE_VIEW, pageContext(Object.assign(base, extra)));
}

function trackSessionAttrib() {
  if (!config.trackSessionAttrib && !config.captureUtm) return null;
  const existing = readJson(sessionGet(STORAGE.ATTRIB));
  if (existing) return existing;
  const utm = captureUtmFromLocation() || {};
  const loc = globalThis.location || {};
  const attrib = classifyChannel({
    utm,
    referrer: globalThis.document?.referrer || "",
    locationHost: loc.hostname || "",
    landingPath: loc.pathname || "",
    landingLocation: loc.href || ""
  });
  sessionSet(STORAGE.ATTRIB, JSON.stringify(attrib));
  pushDataLayer({
    event: "ipd_session_attrib",
    channel: attrib.channel,
    channel_group: attrib.channel_group,
    utm_source: attrib.utm_source,
    utm_medium: attrib.utm_medium,
    utm_campaign: attrib.utm_campaign
  });
  track(EVENTS.SESSION_ATTRIB, attrib);
  return attrib;
}

function trackUserContext() {
  if (!config.trackUserContext) return;
  const ctx = collectClientContext();
  const speed = networkSpeedLabel(ctx);
  track(
    EVENTS.USER_CONTEXT,
    Object.assign({}, ctx, { network_speed: speed, screen: ctx.screen_resolution })
  );
}

function classifySocial(url) {
  const href = String(url || "").toLowerCase();
  for (const key of Object.keys(SOCIAL)) {
    const rule = SOCIAL[key];
    for (const m of rule.match || []) {
      if (href.includes(m)) {
        return { network: rule.network, account: rule.account || "", type: rule.type || "profile", event: rule.event };
      }
    }
  }
  return null;
}

function bindClicks() {
  const doc = globalThis.document;
  if (!doc) return;
  doc.addEventListener(
    "click",
    (ev) => {
      const a = ev.target?.closest?.("a");
      if (!a?.href) return;
      const href = a.href;
      const text = (a.textContent || "").trim().slice(0, 80);

      if (href.startsWith("tel:") && config.trackContactLinks) {
        track(EVENTS.CLICK_TO_CALL, { tel: href.replace(/^tel:/i, "") });
        return;
      }
      if (a.closest("header, .site-header")) {
        track(EVENTS.HEADER_CLICK, { link_text: text, link_url: href });
      }
      if (a.closest("footer, .site-footer")) {
        track(EVENTS.FOOTER_CLICK, { link_text: text, link_url: href });
      }

      const social = classifySocial(href);
      if (social) {
        track(social.event || EVENTS.SHARE_INSTAGRAM, {
          link_url: href,
          link_text: text,
          network: social.network,
          account: social.account,
          type: social.type
        });
        return;
      }

      try {
        const u = new URL(href);
        if (config.trackOutbound && u.origin !== location.origin) {
          track(EVENTS.COMPANY_CLICK, { link_url: href, link_text: text });
        }
      } catch {
        /* ignore */
      }

      const ad = ev.target?.closest?.("[data-ipd-ad], [data-ipd-sponsor]");
      if (ad && config.trackAds) {
        if (ad.hasAttribute("data-ipd-ad")) {
          track(EVENTS.AD_CLICK, {
            ad_id: ad.getAttribute("data-ipd-ad"),
            placement: ad.getAttribute("data-placement") || "",
            advertiser: ad.getAttribute("data-advertiser") || ""
          });
        }
        if (ad.hasAttribute("data-ipd-sponsor")) {
          track(EVENTS.SPONSOR_CLICK, {
            sponsor_id: ad.getAttribute("data-ipd-sponsor"),
            placement: ad.getAttribute("data-placement") || "",
            campaign_id: ad.getAttribute("data-campaign") || "",
            company: ad.getAttribute("data-company") || ""
          });
        }
      }
    },
    true
  );
}

function bindScroll() {
  const depths = config.scrollDepths || [25, 50, 75, 100];
  const key = `${STORAGE.SCROLL_SENT}:${location.pathname}`;
  let sent = readJson(sessionGet(key)) || {};
  const onScroll = () => {
    const el = document.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    const pct = max > 0 ? Math.round((el.scrollTop / max) * 100) : 0;
    for (const d of depths) {
      if (pct >= d && !sent[d]) {
        sent[d] = 1;
        sessionSet(key, JSON.stringify(sent));
        track(EVENTS.SCROLL, { percent: d });
      }
    }
  };
  addEventListener("scroll", onScroll, { passive: true });
}

function bindErrors() {
  if (!config.trackErrors) return;
  addEventListener(
    "error",
    (ev) => {
      const t = ev.target;
      if (t && t !== globalThis && t.tagName) {
        const tag = String(t.tagName).toLowerCase();
        const url = t.src || t.href || "";
        if (tag === "img" && config.trackBrokenImages !== false) {
          track(EVENTS.IMAGE_ERROR, { image_url: String(url).slice(0, 250) });
          return;
        }
        if (["script", "link", "video", "source"].includes(tag)) {
          track(EVENTS.RESOURCE_FAIL, { resource_url: String(url).slice(0, 250), resource_type: tag, status: 0 });
          return;
        }
      }
      if (ev.message === undefined) return;
      track(EVENTS.ERROR, {
        message: String(ev.message).slice(0, 250),
        source: String(ev.filename || "").slice(0, 200),
        line: ev.lineno || 0,
        error_kind: "exception"
      });
    },
    true
  );
  addEventListener("unhandledrejection", (ev) => {
    const reason = ev.reason;
    track(EVENTS.ERROR, {
      message: String(reason?.message || reason || "rejection").slice(0, 250),
      source: "unhandledrejection",
      error_kind: "rejection"
    });
  });
}

function bindPageExit() {
  if (!config.trackPageExit) return;
  addEventListener("pagehide", () => {
    const path = location.pathname || "";
    track(EVENTS.PAGE_EXIT, {
      page_path: path,
      engaged_sec: Math.round((Date.now() - pageStartedAt) / 1000),
      content_type: contentTypeFromPath(path),
      is_exit: true
    });
  });
}

async function runPerformanceAudit() {
  if (!config.trackPerformance && !config.trackWebVitals) return;
  const Perf = await import("./performance.js");
  const nav = Perf.readNavTiming?.();
  const fcp = Perf.readFcp?.();
  if (nav) {
    track(EVENTS.PERFORMANCE, {
      metric_name: "nav_timing",
      nav_ms: nav.nav_ms,
      dcl_ms: nav.dcl_ms,
      ttfb_ms: nav.ttfb_ms,
      fcp_ms: fcp,
      metric_value: nav.nav_ms
    });
    if (nav.ttfb_ms != null) {
      track(EVENTS.PERFORMANCE, {
        metric_name: "TTFB",
        metric_value: nav.ttfb_ms,
        metric_rating: Perf.rate("TTFB", nav.ttfb_ms)
      });
    }
  }
  if (fcp != null) {
    track(EVENTS.PERFORMANCE, {
      metric_name: "FCP",
      metric_value: fcp,
      metric_rating: Perf.rate("FCP", fcp)
    });
  }
  if (config.trackResources && performance.getEntriesByType) {
    const summary = Perf.analyzeResources(performance.getEntriesByType("resource"), {
      slowResourceMs: config.slowResourceMs,
      slowImageMs: config.slowImageMs,
      largeScriptBytes: config.largeScriptBytes
    });
    track(EVENTS.PERFORMANCE, {
      metric_name: "resource_summary",
      metric_value: summary.count,
      resource_count: summary.count,
      transfer_bytes: summary.transfer_bytes
    });
  }
}

async function runSeoAudit() {
  if (!config.trackSeoAudit) return;
  const Seo = await import("./seo.js");
  const result = Seo.auditPage();
  track(EVENTS.SEO_AUDIT, result.summary);
  (result.issues || []).slice(0, 15).forEach((iss) => {
    track(EVENTS.SEO_ISSUE, {
      issue_code: iss.code,
      severity: iss.severity,
      detail: String(iss.detail || "").slice(0, 200)
    });
  });
}

function bindWebVitals() {
  if (!config.trackWebVitals || typeof PerformanceObserver === "undefined") return;
  import("./performance.js").then((Perf) => {
    const emit = (name, value) => {
      track(EVENTS.PERFORMANCE, {
        metric_name: name,
        metric_value: value,
        metric_rating: Perf.rate(name, value)
      });
    };
    const types = PerformanceObserver.supportedEntryTypes || [];
    if (types.includes("largest-contentful-paint")) {
      let lcp = 0;
      const po = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        lcp = entries[entries.length - 1]?.startTime || lcp;
      });
      po.observe({ type: "largest-contentful-paint", buffered: true });
      addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden" && lcp) {
          emit("LCP", Math.round(lcp));
          lcp = 0;
        }
      });
    }
  });
}

/** Public API — helpers for page scripts */
export const api = {
  track,
  trackEvent: track,
  trackPageView,
  trackJobView: (job = {}) =>
    track(EVENTS.JOB_VIEW, {
      job_id: job.id || "",
      company: job.company || "",
      location: job.location || "",
      experience: job.experience || "",
      category: job.category || (job.tags && job.tags[0]) || "",
      content_type: "job",
      content_id: job.id || ""
    }),
  trackJobApply: (job = {}, method = "url") =>
    track(EVENTS.JOB_APPLY, {
      job_id: job.id || "",
      company: job.company || "",
      method,
      content_type: "job",
      content_id: job.id || ""
    }),
  trackJobSearch: (term) => track(EVENTS.JOB_SEARCH, { search_term: String(term || "").slice(0, 100) }),
  trackJobFilter: (filters) => track(EVENTS.JOB_FILTER, filters || {}),
  trackJobShare: (job = {}, network = "copy_link") =>
    track(EVENTS.JOB_SHARE, {
      job_id: job.id || "",
      company: job.company || "",
      network,
      content_type: "job",
      content_id: job.id || ""
    }),
  trackNewsView: (article = {}) =>
    track(EVENTS.NEWS_VIEW, {
      article_id: article.id || "",
      title: article.title || "",
      category: article.category || "",
      author: article.author || article.source || "",
      content_type: "news",
      content_id: article.id || ""
    }),
  trackContactStart: (reason) => track(EVENTS.CONTACT_START, { reason: reason || "general" }),
  trackContactSubmit: (reason, ok, extra = {}) =>
    track(EVENTS.CONTACT_SUBMIT, {
      reason: reason || "general",
      success: Boolean(ok),
      lead_type: leadType(reason, extra),
      company: extra.company || "",
      is_employer_lead: isEmployerLead(reason, extra)
    }),
  trackCompanyView: (company, extra = {}) =>
    track(EVENTS.COMPANY_VIEW, Object.assign({ company, content_type: "company", content_id: company }, extra)),
  trackContentSave: (type, id, action = "save") =>
    track(EVENTS.CONTENT_SAVE, { content_type: type, content_id: id, action }),
  trackRevenue: (amount, extra = {}) =>
    track(EVENTS.REVENUE_RECORD, {
      value: Number(amount) || 0,
      currency: extra.currency || "INR",
      campaign_id: extra.campaign_id || "",
      company: extra.company || ""
    }),
  trackNewsletterSubmit: () => track(EVENTS.NEWSLETTER_SIGNUP, {}),
  openConsentPreferences,
  getConfig: () => config,
  EVENTS,
  version: "2.0.0"
};

export function init() {
  if (started) return api;
  started = true;
  if (!config.enabled) return api;

  initConsent();
  captureUtmFromLocation();
  trackSessionAttrib();
  loadRemoteTags();

  if (config.autoPageView) trackPageView();
  trackUserContext();

  bindClicks();
  bindScroll();
  bindErrors();
  bindPageExit();
  bindWebVitals();

  addEventListener("load", () => {
    setTimeout(() => {
      runPerformanceAudit().catch(() => {});
    }, 0);
  });
  setTimeout(() => {
    runSeoAudit().catch(() => {});
  }, 1200);

  addEventListener("ipd:consent", (ev) => {
    if (ev.detail?.analytics) {
      loadClarity();
      loadAdSense();
      if (config.autoPageView) trackPageView({ consent_update: true });
      import("./clarity-bridge.js")
        .then((Cl) => {
          if (config.clarityMaskForms) Cl.applyMaskHints?.();
        })
        .catch(() => {});
    }
  });

  if (hasAnalyticsConsent()) {
    import("./clarity-bridge.js")
      .then((Cl) => {
        if (config.clarityMaskForms) Cl.applyMaskHints?.();
      })
      .catch(() => {});
  }

  pushDataLayer({
    event: "ipd_analytics_ready",
    ipd_path: location.pathname || "",
    ipd_version: api.version
  });

  return api;
}
