/**
 * InfoparkDaily Analytics — public API
 * =====================================
 * Usage:
 *   IPDAnalytics.init();
 *   IPDAnalytics.trackEvent("job_apply", { job_id: "…" });
 *   IPDAnalytics.trackJobView(job);
 *
 * Load order (defer):
 *   config.js → taxonomy.js → constants.js → events.js → tracker.js →
 *   user-metrics.js → acquisition.js → content-metrics.js → business-metrics.js →
 *   clarity-metrics.js → performance-metrics.js → seo-metrics.js → analytics.js
 *   (+ journeys.js / jobs-metrics.js optional)
 */
(function (global) {
  "use strict";

  var cfg = function () {
    return global.IPD_ANALYTICS_CONFIG || {};
  };
  var C = function () {
    return global.IPD_ANALYTICS_CONSTANTS || {};
  };
  var E = function () {
    return global.IPD_ANALYTICS_EVENTS || {};
  };
  var T = function () {
    return global.IPD_ANALYTICS_TRACKER || {};
  };

  var started = false;
  var scrollMarks = {};
  var jobSession = {
    job: null,
    startedAt: 0,
    lastTick: 0,
    engagedMs: 0,
    maxScroll: 0,
    applied: false,
    visible: true
  };

  function storageGet(key) {
    try {
      return global.sessionStorage.getItem(key);
    } catch (_e) {
      return null;
    }
  }

  function storageSet(key, value) {
    try {
      global.sessionStorage.setItem(key, value);
    } catch (_e) {
      /* ignore */
    }
  }

  function captureUtm() {
    if (!cfg().captureUtm) return null;
    var keys = (C().UTM_KEYS || []).slice();
    var params = new URLSearchParams((global.location && global.location.search) || "");
    var found = {};
    var any = false;
    keys.forEach(function (k) {
      var v = params.get(k);
      if (v) {
        found[k] = v;
        any = true;
      }
    });
    if (any) {
      storageSet((C().STORAGE || {}).UTM || "ipd_utm", JSON.stringify(found));
      T().pushDataLayer &&
        T().pushDataLayer(Object.assign({ event: "ipd_utm_capture" }, found));
      return found;
    }
    try {
      var raw = storageGet((C().STORAGE || {}).UTM || "ipd_utm");
      return raw ? JSON.parse(raw) : null;
    } catch (_e) {
      return null;
    }
  }

  /**
   * Phase 8 — first-touch channel + UTM snapshot once per browser session.
   * Merges channel onto later events via sessionStorage.
   */
  function trackSessionAttrib(force) {
    if (!cfg().trackSessionAttrib && !cfg().captureUtm) return null;
    var stor = (C().STORAGE || {}).ATTRIB || "ipd_attrib";
    if (!force) {
      try {
        var existing = storageGet(stor);
        if (existing) {
          return JSON.parse(existing);
        }
      } catch (_e) {
        /* continue */
      }
    }

    var Acq = global.IPD_ANALYTICS_ACQUISITION;
    var utm = captureUtm() || {};
    var loc = global.location || {};
    var attrib =
      Acq && Acq.classify
        ? Acq.classify({
            utm: utm,
            referrer: (global.document && global.document.referrer) || "",
            locationHost: loc.hostname || "",
            landingPath: loc.pathname || "",
            landingLocation: loc.href || ""
          })
        : {
            channel: "direct",
            channel_group: "direct",
            utm_source: utm.utm_source || "",
            utm_medium: utm.utm_medium || "",
            utm_campaign: utm.utm_campaign || "",
            utm_content: utm.utm_content || "",
            utm_term: utm.utm_term || ""
          };

    try {
      storageSet(stor, JSON.stringify(attrib));
    } catch (_e2) {
      /* ignore */
    }

    T().pushDataLayer &&
      T().pushDataLayer({
        event: "ipd_session_attrib",
        channel: attrib.channel,
        channel_group: attrib.channel_group,
        utm_source: attrib.utm_source,
        utm_medium: attrib.utm_medium,
        utm_campaign: attrib.utm_campaign,
        utm_content: attrib.utm_content,
        utm_term: attrib.utm_term,
        referrer_host: attrib.referrer_host || ""
      });

    emitBuilder(E().sessionAttrib && E().sessionAttrib(attrib));
    return attrib;
  }

  function getSessionAttrib() {
    try {
      var raw = storageGet((C().STORAGE || {}).ATTRIB || "ipd_attrib");
      return raw ? JSON.parse(raw) : null;
    } catch (_e) {
      return null;
    }
  }

  function mergeUtm(params) {
    var utm = null;
    var attrib = null;
    try {
      var raw = storageGet((C().STORAGE || {}).UTM || "ipd_utm");
      utm = raw ? JSON.parse(raw) : null;
    } catch (_e) {
      utm = null;
    }
    try {
      var rawA = storageGet((C().STORAGE || {}).ATTRIB || "ipd_attrib");
      attrib = rawA ? JSON.parse(rawA) : null;
    } catch (_e2) {
      attrib = null;
    }
    var base = {};
    if (utm) Object.assign(base, utm);
    if (attrib) {
      if (attrib.channel) base.channel = attrib.channel;
      if (attrib.channel_group) base.channel_group = attrib.channel_group;
    }
    return Object.assign(base, params || {});
  }

  function trackEvent(name, params) {
    if (!cfg().enabled) return;
    var Tax = global.IPD_ANALYTICS_TAXONOMY;
    if (Tax && Tax.assertName) name = Tax.assertName(name);
    var payload = mergeUtm(params || {});
    if (T().sendEvent) T().sendEvent(name, payload);

    // Phase 11 — Clarity bridge (custom events + session upgrade)
    if (cfg().clarityId && cfg().clarityEnabled !== false) {
      var Cl = global.IPD_ANALYTICS_CLARITY;
      if (
        cfg().clarityMirrorEvents !== false &&
        Cl &&
        Cl.shouldMirror &&
        Cl.shouldMirror(name) &&
        T().clarityEvent
      ) {
        T().clarityEvent(name);
      }
      if (
        cfg().clarityUpgradeOnConversion !== false &&
        Cl &&
        Cl.shouldUpgrade &&
        Cl.shouldUpgrade(name) &&
        T().clarityUpgrade
      ) {
        T().clarityUpgrade(name);
      }
    }
  }

  /**
   * Push channel / content tags into Clarity for recording filters.
   */
  function syncClarityTags() {
    if (!cfg().clarityId || cfg().clarityEnabled === false) return;
    if (!T().claritySet) return;
    var attrib = getSessionAttrib() || {};
    var path = (global.location && global.location.pathname) || "";
    var CM = global.IPD_ANALYTICS_CONTENT_METRICS;
    T().claritySet("page_path", path);
    T().claritySet("content_type", CM && CM.contentTypeFromPath ? CM.contentTypeFromPath(path) : "");
    T().claritySet("channel", attrib.channel || "");
    T().claritySet("channel_group", attrib.channel_group || "");
    T().claritySet("utm_source", attrib.utm_source || "");
    T().claritySet("utm_campaign", attrib.utm_campaign || "");
    try {
      var m = path.match(/\/job\/([^\/]+)\/?$/i);
      if (m) T().claritySet("job_id", decodeURIComponent(m[1]));
    } catch (_e) {
      /* ignore */
    }
    try {
      var company = new URLSearchParams((global.location && global.location.search) || "").get("company");
      if (company) T().claritySet("company", company);
    } catch (_e2) {
      /* ignore */
    }
  }

  function initClarityBridge() {
    if (!cfg().clarityId || cfg().clarityEnabled === false) return;
    var Cl = global.IPD_ANALYTICS_CLARITY;
    if (cfg().clarityMaskForms !== false && Cl && Cl.applyMaskHints) {
      Cl.applyMaskHints();
    }
    syncClarityTags();
    if (T().clarityEvent) T().clarityEvent("ipd_ready");
  }

  function emitBuilder(built) {
    if (!built || !built.name) return;
    trackEvent(built.name, built.params);
  }

  /* ---------- high-level helpers (Phase 2 goals) ---------- */

  function trackPageView(extra) {
    var CM = global.IPD_ANALYTICS_CONTENT_METRICS;
    var path = (global.location && global.location.pathname) || "";
    var returning = CM && CM.returningVisitFlag ? CM.returningVisitFlag() : false;
    var contentType = CM && CM.contentTypeFromPath ? CM.contentTypeFromPath(path) : "";
    var base = {
      content_type: contentType,
      returning_visit: returning,
      user_type: returning ? "returning" : "new"
    };
    // First page in session ≈ landing (session_attrib already stores landing_path)
    try {
      var landKey = ((C().STORAGE || {}).SESSION_ID || "ipd_sid") + "_landed";
      if (!storageGet(landKey)) {
        storageSet(landKey, "1");
        base.is_landing = true;
        base.landing_path = path;
      } else {
        base.is_landing = false;
      }
    } catch (_e) {
      base.is_landing = false;
    }
    emitBuilder(E().pageView && E().pageView(Object.assign(base, extra || {})));
  }

  function trackNewsView(article) {
    emitBuilder(E().newsView && E().newsView(article));
  }

  function trackNewsShare(article, network) {
    emitBuilder(E().newsShare && E().newsShare(article, network));
  }

  function trackNewsSearch(term) {
    emitBuilder(E().newsSearch && E().newsSearch(term));
  }

  function trackContentShare(contentType, contentId, network, extra) {
    emitBuilder(E().contentShare && E().contentShare(contentType, contentId, network, extra));
  }

  /**
   * Bookmark / save. Persists ids in localStorage for "saved" UX.
   * action: "save" | "unsave"
   */
  function trackContentSave(contentType, contentId, action, extra) {
    action = action || "save";
    contentId = String(contentId || "");
    contentType = String(contentType || "page");
    var storKey = (C().STORAGE || {}).SAVED || "ipd_saved";
    try {
      var raw = global.localStorage.getItem(storKey);
      var list = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(list)) list = [];
      var key = contentType + ":" + contentId;
      var idx = list.indexOf(key);
      if (action === "unsave") {
        if (idx !== -1) list.splice(idx, 1);
      } else if (idx === -1) {
        list.push(key);
      }
      global.localStorage.setItem(storKey, JSON.stringify(list));
    } catch (_e) {
      /* ignore */
    }
    emitBuilder(E().contentSave && E().contentSave(contentType, contentId, action, extra));
  }

  function getSavedContent() {
    try {
      var raw = global.localStorage.getItem((C().STORAGE || {}).SAVED || "ipd_saved");
      return raw ? JSON.parse(raw) : [];
    } catch (_e) {
      return [];
    }
  }

  var pageExitState = {
    startedAt: 0,
    armed: false
  };

  function bindPageExit() {
    if (!cfg().trackPageExit) return;
    if (pageExitState.armed) return;
    pageExitState.armed = true;
    pageExitState.startedAt = Date.now();

    function sendExit() {
      var CM = global.IPD_ANALYTICS_CONTENT_METRICS;
      var path = (global.location && global.location.pathname) || "";
      var engaged = Math.round((Date.now() - pageExitState.startedAt) / 1000);
      emitBuilder(
        E().pageExit &&
          E().pageExit({
            page_path: path,
            page_title: (global.document && global.document.title) || "",
            engaged_sec: engaged,
            content_type: CM && CM.contentTypeFromPath ? CM.contentTypeFromPath(path) : "",
            is_exit: true
          })
      );
    }

    global.addEventListener("pagehide", sendExit);
  }

  /**
   * Phase 10 — ads & sponsored placements via data attributes:
   *   <a data-ipd-ad="banner_home" data-advertiser="Acme" data-placement="home_hero" href="...">
   *   <div data-ipd-sponsor="sp_july" data-campaign="jobs_promo" data-company="Acme">...</div>
   * Sponsor views fire once when ≥50% visible (IntersectionObserver).
   */
  function bindAds() {
    if (!cfg().trackAds) return;
    var doc = global.document;
    if (!doc) return;

    doc.addEventListener(
      "click",
      function (ev) {
        var el = ev.target && ev.target.closest && ev.target.closest("[data-ipd-ad], [data-ipd-sponsor]");
        if (!el) return;
        var href = (el.tagName === "A" && el.href) || (el.querySelector && el.querySelector("a") && el.querySelector("a").href) || "";
        if (el.hasAttribute("data-ipd-ad")) {
          trackAdClick(el.getAttribute("data-ipd-ad"), {
            placement: el.getAttribute("data-placement") || "",
            advertiser: el.getAttribute("data-advertiser") || "",
            campaign_id: el.getAttribute("data-campaign") || "",
            link_url: href
          });
        }
        if (el.hasAttribute("data-ipd-sponsor")) {
          trackSponsorClick(el.getAttribute("data-ipd-sponsor"), {
            placement: el.getAttribute("data-placement") || "",
            campaign_id: el.getAttribute("data-campaign") || "",
            company: el.getAttribute("data-company") || "",
            link_url: href
          });
        }
      },
      true
    );

    if (typeof global.IntersectionObserver === "undefined") return;
    var seen = {};
    var io = new global.IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.5) return;
          var el = entry.target;
          var id = el.getAttribute("data-ipd-sponsor") || "";
          var key = id + "|" + (el.getAttribute("data-placement") || "");
          if (!id || seen[key]) return;
          seen[key] = true;
          trackSponsorView(id, {
            placement: el.getAttribute("data-placement") || "",
            campaign_id: el.getAttribute("data-campaign") || "",
            company: el.getAttribute("data-company") || ""
          });
          io.unobserve(el);
        });
      },
      { threshold: [0.5] }
    );

    function observeSponsors() {
      var nodes = doc.querySelectorAll("[data-ipd-sponsor]");
      for (var i = 0; i < nodes.length; i++) io.observe(nodes[i]);
    }
    observeSponsors();
    if (typeof global.MutationObserver !== "undefined") {
      var mo = new global.MutationObserver(function () {
        observeSponsors();
      });
      mo.observe(doc.body || doc.documentElement, { childList: true, subtree: true });
    }
  }

  /**
   * Phase 7 — send client device / locale / network snapshot once per page.
   * Geo + users/sessions stay in GA4; this fills Network Speed + richer tech.
   */
  function trackUserContext() {
    if (!cfg().trackUserContext) return null;
    var UM = global.IPD_ANALYTICS_USER_METRICS;
    var ctx = UM && UM.collectClientContext ? UM.collectClientContext() : null;
    if (!ctx) return null;

    var speed = UM.networkSpeedLabel ? UM.networkSpeedLabel(ctx) : "unknown";
    var payload = Object.assign({}, ctx, {
      network_speed: speed,
      screen: ctx.screen_resolution
    });

    T().pushDataLayer &&
      T().pushDataLayer({
        event: "ipd_user_properties",
        user_properties: {
          language: payload.language,
          device_category: payload.device_category,
          os: payload.os,
          browser: payload.browser,
          screen_resolution: payload.screen_resolution,
          network_type: payload.network_type,
          network_speed: payload.network_speed,
          timezone: payload.timezone
        }
      });

    emitBuilder(E().userContext && E().userContext(payload));
    return payload;
  }

  function trackJobApply(job, method) {
    jobSession.applied = true;
    emitBuilder(E().jobApply && E().jobApply(job, method));
  }

  function trackJobSearch(query) {
    emitBuilder(E().jobSearch && E().jobSearch(query));
  }

  function trackJobFilter(filters) {
    emitBuilder(E().jobFilter && E().jobFilter(filters));
  }

  function trackJobShare(job, network) {
    emitBuilder(E().jobShare && E().jobShare(job, network));
  }

  function trackJobView(job) {
    if (job && job.id) {
      jobSession.job = job;
      jobSession.startedAt = Date.now();
      jobSession.maxScroll = 0;
      jobSession.engagedMs = 0;
      jobSession.applied = false;
      jobSession.lastTick = Date.now();
    }
    emitBuilder(E().jobView && E().jobView(job));
  }

  function trackSocialClick(url, meta) {
    emitBuilder(E().socialClick && E().socialClick(url, meta));
  }

  function trackOutbound(url, meta) {
    meta = meta || {};
    if (isJobDetailPage() && !meta.job_id) meta.job_id = jobIdFromPath();
    var social = E().classifySocial && E().classifySocial(url);
    if (social) {
      trackSocialClick(url, meta);
      return;
    }
    emitBuilder(E().companyClick && E().companyClick(url, meta));
  }

  function trackContactStart(reason) {
    emitBuilder(E().contactStart && E().contactStart(reason));
  }

  function trackContactSubmit(reason, ok, extra) {
    emitBuilder(E().contactSubmit && E().contactSubmit(reason, ok, extra));
  }

  function trackAdClick(adId, extra) {
    emitBuilder(E().adClick && E().adClick(adId, extra));
  }

  function trackSponsorView(sponsorId, extra) {
    emitBuilder(E().sponsorView && E().sponsorView(sponsorId, extra));
  }

  function trackSponsorClick(sponsorId, extra) {
    emitBuilder(E().sponsorClick && E().sponsorClick(sponsorId, extra));
  }

  function trackCompanyView(company, extra) {
    emitBuilder(E().companyView && E().companyView(company, extra));
  }

  function trackRevenue(value, extra) {
    emitBuilder(E().revenueRecord && E().revenueRecord(value, extra));
  }

  function trackCtaClick(offer, href, extra) {
    emitBuilder(E().ctaClick && E().ctaClick(offer, href, extra));
  }

  function trackNewsletterSubmit() {
    emitBuilder(E().newsletterSignup && E().newsletterSignup());
  }

  function trackNewsletterSignup() {
    return trackNewsletterSubmit();
  }

  function trackPage404() {
    emitBuilder(E().page404 && E().page404());
  }

  /* ---------- auto instrumentation ---------- */

  function bindClicks() {
    var doc = global.document;
    if (!doc) return;

    doc.addEventListener(
      "click",
      function (ev) {
        var el = ev.target;
        if (!el || !el.closest) return;
        var a = el.closest("a");
        if (!a || !a.href) return;

        var href = a.href;
        var text = (a.textContent || "").trim().slice(0, 80);

        if (href.indexOf("tel:") === 0 && cfg().trackContactLinks) {
          emitBuilder(E().clickToCall && E().clickToCall(href.replace(/^tel:/i, "")));
          return;
        }

        if (href.indexOf("mailto:") === 0 && cfg().trackContactLinks) {
          // Apply emails often use mailto — treat as apply if on job page
          var onJob = /\/job\//i.test((global.location && global.location.pathname) || "");
          if (onJob) {
            trackJobApply({ id: jobIdFromPath(), email: href.replace(/^mailto:/i, "") }, "email");
          } else {
            trackOutbound(href, { type: "mailto", link_text: text });
          }
          return;
        }

        if (E().isOutbound && E().isOutbound(href) && cfg().trackOutbound) {
          trackOutbound(href, { link_text: text });
        }

        if (a.closest && a.closest(".site-nav, .header-actions, .site-header")) {
          emitBuilder(E().headerClick && E().headerClick(text, href));
        } else if (a.closest && a.closest(".site-footer, footer")) {
          emitBuilder(E().footerClick && E().footerClick(text, href));
        }
      },
      true
    );
  }

  function jobIdFromPath() {
    var m = String((global.location && global.location.pathname) || "").match(/\/job\/([^\/]+)\/?$/i);
    return m ? decodeURIComponent(m[1]) : "";
  }

  function isJobDetailPage() {
    return Boolean(jobIdFromPath()) || global.__IPD_IS_JOB_ROUTE__ === true;
  }

  function measureScrollPct() {
    var doc = global.document.documentElement;
    var body = global.document.body;
    var scrollTop = global.pageYOffset || doc.scrollTop || 0;
    var height = Math.max(doc.scrollHeight, body ? body.scrollHeight : 0);
    var view = global.innerHeight || doc.clientHeight || 0;
    if (height <= view) return 100;
    return Math.min(100, Math.round(((scrollTop + view) / height) * 100));
  }

  function tickEngagement() {
    if (!isJobDetailPage() || !jobSession.visible) return;
    var now = Date.now();
    if (jobSession.lastTick) {
      jobSession.engagedMs += Math.min(5000, now - jobSession.lastTick);
    }
    jobSession.lastTick = now;
    var pct = measureScrollPct();
    if (pct > jobSession.maxScroll) jobSession.maxScroll = pct;
  }

  function flushJobEngage(finalExit) {
    if (!isJobDetailPage()) return;
    tickEngagement();
    var sec = Math.round((jobSession.engagedMs / 1000) * 10) / 10;
    var job = jobSession.job || { id: jobIdFromPath() };
    var stats = {
      engaged_sec: sec,
      max_scroll: jobSession.maxScroll,
      applied: jobSession.applied,
      expired: job && job.expired
    };
    if (finalExit) {
      emitBuilder(E().jobExit && E().jobExit(job, stats));
    } else if (sec >= 5) {
      emitBuilder(E().jobEngage && E().jobEngage(job, stats));
    }
  }

  function bindJobSession() {
    if (!isJobDetailPage()) return;
    if (!jobSession.startedAt) {
      jobSession.startedAt = Date.now();
      jobSession.lastTick = Date.now();
      if (!jobSession.job) jobSession.job = { id: jobIdFromPath() };
    }

    global.setInterval(tickEngagement, 2000);
    global.setInterval(function () {
      flushJobEngage(false);
    }, 15000);

    global.document.addEventListener("visibilitychange", function () {
      jobSession.visible = global.document.visibilityState === "visible";
      if (jobSession.visible) jobSession.lastTick = Date.now();
      else flushJobEngage(false);
    });

    global.addEventListener("pagehide", function () {
      flushJobEngage(true);
    });

    // Copy-link / share buttons on job pages
    global.document.addEventListener(
      "click",
      function (ev) {
        var el = ev.target && ev.target.closest && ev.target.closest("button, a");
        if (!el) return;
        var id = (el.id || "") + " " + (el.className || "") + " " + (el.textContent || "");
        if (/copy.?link|share|job-copy/i.test(id)) {
          var network = /whatsapp/i.test(id) ? "whatsapp" : /instagram/i.test(id) ? "instagram" : "copy_link";
          trackJobShare(jobSession.job || { id: jobIdFromPath() }, network);
        }
      },
      true
    );
  }

  function bindScrollDepth() {
    var depths = cfg().scrollDepths || [50, 75, 100];
    var key = ((C().STORAGE || {}).SCROLL_SENT || "ipd_scroll_sent") + ":" + (global.location && global.location.pathname);
    var sent = {};
    try {
      sent = JSON.parse(storageGet(key) || "{}") || {};
    } catch (_e) {
      sent = {};
    }

    function onScroll() {
      var pct = measureScrollPct();
      depths.forEach(function (d) {
        if (pct >= d && !sent[d]) {
          sent[d] = 1;
          storageSet(key, JSON.stringify(sent));
          if (isJobDetailPage()) {
            if (pct > jobSession.maxScroll) jobSession.maxScroll = pct;
            trackEvent((C().EVENTS && C().EVENTS.SCROLL) || "scroll", {
              percent: d,
              job_id: jobIdFromPath()
            });
          } else {
            emitBuilder(E().scroll && E().scroll(d));
          }
        }
      });
    }

    global.addEventListener("scroll", onScroll, { passive: true });
    setTimeout(onScroll, 1200);
  }

  function bindErrors() {
    if (!cfg().trackErrors) return;

    // Resource load failures (img/script/link) — capture phase
    global.addEventListener(
      "error",
      function (ev) {
        var t = ev && ev.target;
        if (t && t !== global && t.tagName) {
          var tag = String(t.tagName).toLowerCase();
          var url = t.src || t.href || "";
          if (tag === "img") {
            if (cfg().trackBrokenImages !== false) {
              emitBuilder(E().imageError && E().imageError(url, { tag: tag }));
            }
            return;
          }
          if (tag === "script" || tag === "link" || tag === "video" || tag === "source") {
            emitBuilder(
              E().resourceFail &&
                E().resourceFail(url, 0, tag, { message: "resource_load_error" })
            );
            return;
          }
        }
        if (!ev || ev.message === undefined) return;
        emitBuilder(
          E().error &&
            E().error({
              message: ev.message,
              source: ev.filename,
              line: ev.lineno,
              col: ev.colno,
              error_kind: "exception"
            })
        );
        if (cfg().clarityId && T().clarityEvent) T().clarityEvent("js_error");
      },
      true
    );

    global.addEventListener("unhandledrejection", function (ev) {
      var reason = ev && ev.reason;
      emitBuilder(
        E().error &&
          E().error({
            message: reason && reason.message ? reason.message : String(reason || "rejection"),
            source: "unhandledrejection",
            error_kind: "rejection"
          })
      );
      if (cfg().clarityId && T().clarityEvent) T().clarityEvent("js_error");
    });

    if (cfg().trackConsoleErrors && typeof global.console !== "undefined" && global.console.error) {
      var orig = global.console.error.bind(global.console);
      var consoleBudget = 0;
      global.console.error = function () {
        try {
          if (consoleBudget < 5) {
            consoleBudget += 1;
            var msg = [].slice.call(arguments).map(String).join(" ").slice(0, 250);
            emitBuilder(
              E().error &&
                E().error({
                  message: msg,
                  source: "console.error",
                  error_kind: "console"
                })
            );
          }
        } catch (_e) {
          /* ignore */
        }
        return orig.apply(null, arguments);
      };
    }
  }

  function emitVital(name, value) {
    var Perf = global.IPD_ANALYTICS_PERFORMANCE;
    var rating = Perf && Perf.rate ? Perf.rate(name, value) : "";
    emitBuilder(
      E().performance &&
        E().performance({
          name: name,
          value: value,
          rating: rating
        })
    );
  }

  function bindPerformance() {
    if (!cfg().trackPerformance) return;
    global.addEventListener("load", function () {
      setTimeout(function () {
        try {
          var Perf = global.IPD_ANALYTICS_PERFORMANCE;
          var nav = Perf && Perf.readNavTiming ? Perf.readNavTiming() : null;
          var fcp = Perf && Perf.readFcp ? Perf.readFcp() : null;

          if (nav) {
            emitBuilder(
              E().performance &&
                E().performance({
                  name: "nav_timing",
                  nav_ms: nav.nav_ms,
                  dcl_ms: nav.dcl_ms,
                  ttfb_ms: nav.ttfb_ms,
                  fcp_ms: fcp,
                  transfer_bytes: nav.transfer_bytes,
                  value: nav.nav_ms
                })
            );
            if (nav.ttfb_ms != null) emitVital("TTFB", nav.ttfb_ms);
            if (cfg().slowPageMs && nav.nav_ms >= cfg().slowPageMs) {
              emitBuilder(E().slowPage && E().slowPage(nav.nav_ms));
            }
          }
          if (fcp != null) emitVital("FCP", fcp);

          if (cfg().trackResources !== false && Perf && global.performance && global.performance.getEntriesByType) {
            var resources = global.performance.getEntriesByType("resource") || [];
            var summary = Perf.analyzeResources(resources, {
              slowResourceMs: cfg().slowResourceMs,
              slowImageMs: cfg().slowImageMs,
              largeScriptBytes: cfg().largeScriptBytes
            });
            emitBuilder(
              E().performance &&
                E().performance({
                  name: "resource_summary",
                  value: summary.count,
                  resource_count: summary.count,
                  transfer_bytes: summary.transfer_bytes
                })
            );
            summary.slow_images.slice(0, 5).forEach(function (img) {
              emitBuilder(
                E().performance &&
                  E().performance({
                    name: "slow_image",
                    value: img.duration_ms,
                    resource_url: img.url,
                    resource_type: "image",
                    rating: "poor"
                  })
              );
            });
            summary.large_scripts.slice(0, 5).forEach(function (sc) {
              emitBuilder(
                E().performance &&
                  E().performance({
                    name: "large_script",
                    value: sc.bytes,
                    resource_url: sc.url,
                    resource_type: "script",
                    rating: "poor"
                  })
              );
            });
            summary.slow.slice(0, 8).forEach(function (r) {
              emitBuilder(
                E().performance &&
                  E().performance({
                    name: "slow_resource",
                    value: r.duration_ms,
                    resource_url: r.url,
                    resource_type: r.type,
                    rating: "poor"
                  })
              );
            });
            summary.failed.slice(0, 8).forEach(function (f) {
              emitBuilder(
                E().resourceFail && E().resourceFail(f.url, f.status, f.type)
              );
            });
          }
        } catch (_e) {
          /* ignore */
        }
      }, 0);
    });
  }

  function bindWebVitals() {
    if (!cfg().trackWebVitals) return;
    // Always collect CWV into dataLayer (even on localhost); remote tags still gated separately
    try {
      if (typeof PerformanceObserver === "undefined") return;
      var types = PerformanceObserver.supportedEntryTypes || [];

      if (types.indexOf("largest-contentful-paint") !== -1) {
        var lcp = 0;
        var poLcp = new PerformanceObserver(function (list) {
          var entries = list.getEntries();
          var last = entries[entries.length - 1];
          if (last) lcp = last.startTime;
        });
        poLcp.observe({ type: "largest-contentful-paint", buffered: true });
        global.addEventListener("visibilitychange", function () {
          if (global.document.visibilityState === "hidden" && lcp) {
            emitVital("LCP", Math.round(lcp));
            lcp = 0;
          }
        });
      }

      if (types.indexOf("layout-shift") !== -1) {
        var cls = 0;
        var poCls = new PerformanceObserver(function (list) {
          list.getEntries().forEach(function (entry) {
            if (!entry.hadRecentInput) cls += entry.value;
          });
        });
        poCls.observe({ type: "layout-shift", buffered: true });
        global.addEventListener("visibilitychange", function () {
          if (global.document.visibilityState === "hidden") {
            emitVital("CLS", Math.round(cls * 1000) / 1000);
          }
        });
      }

      if (types.indexOf("event") !== -1) {
        var inp = 0;
        var poInp = new PerformanceObserver(function (list) {
          list.getEntries().forEach(function (entry) {
            if (entry.duration > inp) inp = entry.duration;
          });
        });
        try {
          poInp.observe({ type: "event", buffered: true, durationThreshold: 16 });
        } catch (_e) {
          /* older browsers */
        }
        global.addEventListener("visibilitychange", function () {
          if (global.document.visibilityState === "hidden" && inp) {
            emitVital("INP", Math.round(inp));
          }
        });
      }

      if (types.indexOf("paint") !== -1) {
        var poPaint = new PerformanceObserver(function (list) {
          list.getEntries().forEach(function (entry) {
            if (entry.name === "first-contentful-paint") {
              emitVital("FCP", Math.round(entry.startTime));
            }
          });
        });
        try {
          poPaint.observe({ type: "paint", buffered: true });
        } catch (_e2) {
          /* ignore */
        }
      }
    } catch (_e) {
      T().log && T().log("Web Vitals setup failed", _e);
    }
  }

  function bindApiFailures() {
    if (!cfg().trackApiFailures) return;
    if (typeof global.fetch !== "function") return;
    if (global.__IPD_FETCH_WRAPPED__) return;
    global.__IPD_FETCH_WRAPPED__ = true;
    var nativeFetch = global.fetch.bind(global);
    global.fetch = function (input, init) {
      var method = (init && init.method) || "GET";
      var url = typeof input === "string" ? input : (input && input.url) || "";
      return nativeFetch(input, init).then(
        function (res) {
          if (!res.ok && res.status >= 400) {
            emitBuilder(E().apiFail && E().apiFail(url, res.status, method));
          }
          return res;
        },
        function (err) {
          emitBuilder(
            E().apiFail &&
              E().apiFail(url, 0, method, {
                message: err && err.message ? err.message : "network_error"
              })
          );
          throw err;
        }
      );
    };
  }

  /**
   * Phase 13 — on-page SEO audit once per page load.
   * GSC owns indexed pages / queries / CTR / position.
   */
  function trackSeoAudit() {
    if (!cfg().trackSeoAudit) return null;
    var Seo = global.IPD_ANALYTICS_SEO;
    if (!Seo || !Seo.auditPage) return null;

    var result = Seo.auditPage();
    emitBuilder(E().seoAudit && E().seoAudit(result.summary));

    var issues = (result.issues || []).slice(0, 15);
    issues.forEach(function (iss) {
      emitBuilder(E().seoIssue && E().seoIssue(iss));
    });

    if (cfg().seoProbeInternalLinks && Seo.probeInternalLinks) {
      try {
        Seo.probeInternalLinks(null, null, cfg().seoProbeLinkLimit || 8).then(function (extra) {
          (extra || []).slice(0, 8).forEach(function (iss) {
            emitBuilder(E().seoIssue && E().seoIssue(iss));
          });
        });
      } catch (_e) {
        /* ignore */
      }
    }

    return result;
  }

  function init(options) {
    if (started) return api;
    started = true;
    options = options || {};

    if (options.config) {
      global.IPD_ANALYTICS_CONFIG = Object.assign({}, cfg(), options.config);
    }

    if (!cfg().enabled) {
      T().log && T().log("Analytics disabled");
      return api;
    }

    captureUtm();
    trackSessionAttrib();

    var gtmId = cfg().gtmId;
    var clarityId = cfg().clarityId;
    var gaId = cfg().gaMeasurementId;

    if (T().loadGtm) T().loadGtm(gtmId);
    if (cfg().clarityEnabled !== false && T().loadClarity) T().loadClarity(clarityId);
    if (!gtmId && gaId && T().loadGaDirect) T().loadGaDirect(gaId);

    T().pushDataLayer &&
      T().pushDataLayer({
        event: "ipd_analytics_ready",
        ipd_path: (global.location && global.location.pathname) || "",
        ipd_goals: Object.keys((C().GOALS || {}))
      });

    if (cfg().autoPageView) trackPageView();
    trackUserContext();
    if (global.__IPD_IS_JOB_ROUTE__ === false) trackPage404();

    bindClicks();
    bindScrollDepth();
    bindErrors();
    bindPerformance();
    bindWebVitals();
    bindJobSession();
    bindPageExit();
    bindAds();
    bindApiFailures();
    initClarityBridge();
    // Defer SEO audit slightly so job/news scripts can inject JSON-LD first
    setTimeout(function () {
      try {
        trackSeoAudit();
      } catch (_e) {
        /* ignore */
      }
    }, 1200);

    T().log && T().log("init complete");
    return api;
  }

  var api = {
    init: init,
    trackEvent: trackEvent,
    trackPageView: trackPageView,
    trackJobView: trackJobView,
    trackJobApply: trackJobApply,
    trackJobSearch: trackJobSearch,
    trackJobFilter: trackJobFilter,
    trackJobShare: trackJobShare,
    trackSocialClick: trackSocialClick,
    trackOutbound: trackOutbound,
    trackContactStart: trackContactStart,
    trackContactSubmit: trackContactSubmit,
    trackNewsletterSubmit: trackNewsletterSubmit,
    trackNewsletterSignup: trackNewsletterSignup,
    trackNewsView: trackNewsView,
    trackNewsShare: trackNewsShare,
    trackNewsSearch: trackNewsSearch,
    trackContentShare: trackContentShare,
    trackContentSave: trackContentSave,
    getSavedContent: getSavedContent,
    trackAdClick: trackAdClick,
    trackSponsorView: trackSponsorView,
    trackSponsorClick: trackSponsorClick,
    trackCompanyView: trackCompanyView,
    trackRevenue: trackRevenue,
    trackCtaClick: trackCtaClick,
    trackSeoAudit: trackSeoAudit,
    trackPage404: trackPage404,
    trackUserContext: trackUserContext,
    trackSessionAttrib: trackSessionAttrib,
    getSessionAttrib: getSessionAttrib,
    captureUtm: captureUtm,
    syncClarityTags: syncClarityTags,
    getConfig: cfg,
    getConstants: C,
    version: "1.7.0"
  };

  var ns = cfg().namespace || "IPDAnalytics";
  global[ns] = api;
  global.trackEvent = function (name, params) {
    return trackEvent(name, params);
  };

  // Auto-init after DOM ready when scripts are deferred at end of body/head
  function auto() {
    try {
      init();
    } catch (err) {
      try {
        // eslint-disable-next-line no-console
        console.warn("[IPD Analytics] init failed", err);
      } catch (_e) {
        /* ignore */
      }
    }
  }

  if (global.document && global.document.readyState === "loading") {
    global.document.addEventListener("DOMContentLoaded", auto);
  } else {
    auto();
  }
})(typeof window !== "undefined" ? window : this);
