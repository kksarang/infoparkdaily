/**
 * InfoparkDaily Analytics — event builders
 * Payloads follow Phase 5 taxonomy ({object}_{action}). No side effects.
 */
(function (global) {
  "use strict";

  var C = global.IPD_ANALYTICS_CONSTANTS || {};
  var EVENTS = C.EVENTS || {};
  var Tax = global.IPD_ANALYTICS_TAXONOMY || {};

  function pick(obj, keys) {
    var out = {};
    if (!obj) return out;
    keys.forEach(function (k) {
      if (obj[k] !== undefined && obj[k] !== null && obj[k] !== "") out[k] = obj[k];
    });
    return out;
  }

  function pageContext(extra) {
    var loc = global.location || {};
    return Object.assign(
      {
        page_location: String(loc.href || ""),
        page_path: String(loc.pathname || ""),
        page_title: String((global.document && global.document.title) || ""),
        page_referrer: String((global.document && global.document.referrer) || "")
      },
      extra || {}
    );
  }

  function eventName(name) {
    if (Tax.assertName) return Tax.assertName(name);
    return name;
  }

  function classifySocial(url) {
    var href = String(url || "").toLowerCase();
    var social = C.SOCIAL || {};
    var key;
    for (key in social) {
      if (!Object.prototype.hasOwnProperty.call(social, key)) continue;
      var rule = social[key];
      var matchers = rule.match || [];
      for (var i = 0; i < matchers.length; i++) {
        if (href.indexOf(matchers[i]) !== -1) {
          return {
            network: rule.network,
            account: rule.account || "",
            type: rule.type || "profile",
            social_key: key,
            event: rule.event || ""
          };
        }
      }
    }
    return null;
  }

  function jobIdHint() {
    try {
      var m = String((global.location && global.location.pathname) || "").match(/\/job\/([^\/]+)\/?$/i);
      return m ? decodeURIComponent(m[1]) : "";
    } catch (_e) {
      return "";
    }
  }

  function isOutbound(url) {
    try {
      var u = new URL(url, global.location && global.location.href);
      return u.origin !== (global.location && global.location.origin);
    } catch (_e) {
      return false;
    }
  }

  function build(name, params) {
    return { name: eventName(name), params: pageContext(params || {}) };
  }

  var Events = {
    pageView: function (extra) {
      return build(EVENTS.PAGE_VIEW || "page_view", extra || {});
    },

    jobView: function (job) {
      job = job || {};
      return build(EVENTS.JOB_VIEW || "job_view", {
        job_id: job.id || job.job_id || "",
        company: job.company || "",
        location: job.location || "",
        employment_type: job.employmentType || job.employment_type || "",
        source_park: job.source || job.park || "",
        experience: job.experience || "",
        category: (job.tags && job.tags[0]) || job.category || "",
        verified: Boolean(job.verified),
        expired: Boolean(job.expired)
      });
    },

    jobApply: function (job, method) {
      job = job || {};
      return build(EVENTS.JOB_APPLY || "job_apply", {
        job_id: job.id || job.job_id || "",
        company: job.company || "",
        method: method || "url",
        location: job.location || "",
        experience: job.experience || "",
        category: (job.tags && job.tags[0]) || job.category || "",
        expired: Boolean(job.expired)
      });
    },

    jobShare: function (job, network) {
      job = job || {};
      return build(EVENTS.JOB_SHARE || "job_share", {
        job_id: job.id || job.job_id || "",
        company: job.company || "",
        network: network || "copy_link",
        content_type: "job",
        content_id: job.id || job.job_id || ""
      });
    },

    jobEngage: function (job, stats) {
      job = job || {};
      stats = stats || {};
      return build(EVENTS.JOB_ENGAGE || "job_engage", {
        job_id: job.id || job.job_id || jobIdHint(),
        company: job.company || "",
        engaged_sec: Number(stats.engaged_sec) || 0,
        max_scroll: Number(stats.max_scroll) || 0
      });
    },

    jobExit: function (job, stats) {
      job = job || {};
      stats = stats || {};
      return build(EVENTS.JOB_EXIT || "job_exit", {
        job_id: job.id || job.job_id || jobIdHint(),
        company: job.company || "",
        engaged_sec: Number(stats.engaged_sec) || 0,
        max_scroll: Number(stats.max_scroll) || 0,
        applied: Boolean(stats.applied),
        expired: Boolean(job.expired || stats.expired)
      });
    },

    jobSearch: function (query) {
      return build(EVENTS.JOB_SEARCH || "job_search", {
        search_term: String(query || "").slice(0, 100)
      });
    },

    jobFilter: function (filters) {
      return build(
        EVENTS.JOB_FILTER || "job_filter",
        pick(filters || {}, ["status", "experience", "type", "tag", "company", "location", "sort"])
      );
    },

    companyClick: function (url, meta) {
      meta = meta || {};
      return build(EVENTS.COMPANY_CLICK || "company_click", {
        link_url: String(url || ""),
        link_text: meta.link_text || "",
        job_id: meta.job_id || "",
        company: meta.company || ""
      });
    },

    companyView: function (company, extra) {
      return build(
        EVENTS.COMPANY_VIEW || "company_view",
        Object.assign(
          {
            company: company || "",
            content_type: "company",
            content_id: company || ""
          },
          extra || {}
        )
      );
    },

    /** @deprecated use companyClick — kept as alias */
    outboundClick: function (url, meta) {
      return Events.companyClick(url, meta);
    },

    socialClick: function (url, meta) {
      meta = meta || {};
      var social = classifySocial(url) || {};
      var name =
        meta.event ||
        social.event ||
        (social.network === "instagram"
          ? EVENTS.SHARE_INSTAGRAM
          : social.network === "whatsapp"
            ? EVENTS.SHARE_WHATSAPP
            : social.network === "facebook"
              ? EVENTS.SHARE_FACEBOOK
              : social.network === "threads"
                ? EVENTS.SHARE_THREADS
                : EVENTS.COMPANY_CLICK);
      return build(name || EVENTS.SHARE_INSTAGRAM || "share_instagram", {
        link_url: String(url || ""),
        link_text: meta.link_text || "",
        network: meta.network || social.network || "",
        account: meta.account || social.account || "",
        type: meta.type || social.type || "profile"
      });
    },

    newsView: function (article) {
      article = article || {};
      return build(EVENTS.NEWS_VIEW || "news_view", {
        article_id: article.id || article.article_id || "",
        title: article.title || "",
        category: article.category || "",
        park: article.park || "",
        author: article.author || article.source || "",
        source: article.source || "",
        content_type: "news",
        content_id: article.id || article.article_id || ""
      });
    },

    newsShare: function (article, network) {
      article = article || {};
      return build(EVENTS.NEWS_SHARE || "news_share", {
        article_id: article.id || "",
        network: network || "",
        category: article.category || "",
        author: article.author || article.source || "",
        content_type: "news",
        content_id: article.id || ""
      });
    },

    newsSearch: function (term) {
      return build(EVENTS.NEWS_SEARCH || "news_search", {
        search_term: String(term || "").slice(0, 100),
        content_type: "news"
      });
    },

    contentShare: function (contentType, contentId, network, extra) {
      return build(
        EVENTS.CONTENT_SHARE || "content_share",
        Object.assign(
          {
            content_type: contentType || "",
            content_id: contentId || "",
            network: network || ""
          },
          extra || {}
        )
      );
    },

    contentSave: function (contentType, contentId, action, extra) {
      return build(
        EVENTS.CONTENT_SAVE || "content_save",
        Object.assign(
          {
            content_type: contentType || "",
            content_id: contentId || "",
            action: action || "save"
          },
          extra || {}
        )
      );
    },

    pageExit: function (extra) {
      return build(EVENTS.PAGE_EXIT || "page_exit", extra || {});
    },

    headerClick: function (label, href) {
      return build(EVENTS.HEADER_CLICK || "header_click", {
        link_text: label || "",
        link_url: href || ""
      });
    },

    footerClick: function (label, href) {
      return build(EVENTS.FOOTER_CLICK || "footer_click", {
        link_text: label || "",
        link_url: href || ""
      });
    },

    /** @deprecated use headerClick */
    navClick: function (label, href) {
      return Events.headerClick(label, href);
    },

    ctaClick: function (offer, href, extra) {
      extra = extra || {};
      return build(
        EVENTS.CTA_CLICK || "cta_click",
        Object.assign(
          {
            offer: offer || "",
            link_url: href || "",
            cta_id: extra.cta_id || offer || ""
          },
          extra
        )
      );
    },

    contactStart: function (reason) {
      return build(EVENTS.CONTACT_START || "contact_start", {
        reason: reason || "general"
      });
    },

    contactSubmit: function (reason, ok, extra) {
      extra = extra || {};
      var BM = global.IPD_ANALYTICS_BUSINESS_METRICS;
      var lead =
        extra.lead_type ||
        (BM && BM.leadType ? BM.leadType(reason, extra) : "other");
      return build(EVENTS.CONTACT_SUBMIT || "contact_submit", {
        reason: reason || "general",
        success: Boolean(ok),
        lead_type: lead,
        company: extra.company || "",
        is_employer_lead: BM && BM.isEmployerLead ? BM.isEmployerLead(reason, extra) : lead === "employer"
      });
    },

    adClick: function (adId, extra) {
      extra = extra || {};
      return build(
        EVENTS.AD_CLICK || "ad_click",
        Object.assign(
          {
            ad_id: adId || extra.ad_id || "",
            placement: extra.placement || "",
            advertiser: extra.advertiser || "",
            campaign_id: extra.campaign_id || ""
          },
          extra
        )
      );
    },

    sponsorView: function (sponsorId, extra) {
      extra = extra || {};
      return build(
        EVENTS.SPONSOR_VIEW || "sponsor_view",
        Object.assign(
          {
            sponsor_id: sponsorId || extra.sponsor_id || "",
            placement: extra.placement || "",
            campaign_id: extra.campaign_id || "",
            company: extra.company || ""
          },
          extra
        )
      );
    },

    sponsorClick: function (sponsorId, extra) {
      extra = extra || {};
      return build(
        EVENTS.SPONSOR_CLICK || "sponsor_click",
        Object.assign(
          {
            sponsor_id: sponsorId || extra.sponsor_id || "",
            placement: extra.placement || "",
            campaign_id: extra.campaign_id || "",
            company: extra.company || "",
            link_url: extra.link_url || ""
          },
          extra
        )
      );
    },

    revenueRecord: function (value, extra) {
      extra = extra || {};
      return build(
        EVENTS.REVENUE_RECORD || "revenue_record",
        Object.assign(
          {
            value: Number(value) || 0,
            currency: extra.currency || "INR",
            campaign_id: extra.campaign_id || "",
            company: extra.company || "",
            lead_id: extra.lead_id || "",
            offer: extra.offer || ""
          },
          extra
        )
      );
    },

    newsletterSignup: function () {
      return build(EVENTS.NEWSLETTER_SIGNUP || "newsletter_signup", {});
    },

    /** @deprecated use newsletterSignup */
    newsletterSubmit: function () {
      return Events.newsletterSignup();
    },

    clickToCall: function (tel) {
      return build(EVENTS.CLICK_TO_CALL || "click_to_call", { tel: String(tel || "") });
    },

    page404: function () {
      return build(EVENTS.PAGE_404 || "404_page", {});
    },

    scroll: function (percent) {
      return build(EVENTS.SCROLL || "scroll", { percent: Number(percent) || 0 });
    },

    /** @deprecated use scroll */
    scrollDepth: function (percent) {
      return Events.scroll(percent);
    },

    performance: function (metric) {
      metric = metric || {};
      return build(EVENTS.PERFORMANCE || "performance", {
        metric_name: metric.name || metric.metric_name || "",
        metric_value: metric.value !== undefined ? metric.value : metric.metric_value,
        metric_id: metric.id || "",
        metric_rating: metric.rating || "",
        nav_ms: metric.nav_ms,
        dcl_ms: metric.dcl_ms,
        ttfb_ms: metric.ttfb_ms,
        load_ms: metric.load_ms
      });
    },

    webVital: function (metric) {
      return Events.performance(metric);
    },

    error: function (err) {
      err = err || {};
      return build(EVENTS.ERROR || "error", {
        message: String(err.message || "").slice(0, 250),
        source: String(err.source || "").slice(0, 200),
        line: err.line || 0,
        col: err.col || 0
      });
    },

    jsError: function (err) {
      return Events.error(err);
    },

    perfTiming: function (timing) {
      return Events.performance(Object.assign({ name: "nav_timing" }, timing || {}));
    },

    slowPage: function (ms) {
      return Events.performance({ name: "slow_page", load_ms: Number(ms) || 0, value: Number(ms) || 0 });
    },

    videoPlay: function (videoId) {
      return build(EVENTS.VIDEO_PLAY || "video_play", { video_id: videoId || "" });
    },

    download: function (fileName, url) {
      return build(EVENTS.DOWNLOAD || "download", {
        file_name: fileName || "",
        link_url: url || ""
      });
    },

    userContext: function (ctx) {
      return build(EVENTS.USER_CONTEXT || "user_context", ctx || {});
    },

    sessionAttrib: function (attrib) {
      return build(EVENTS.SESSION_ATTRIB || "session_attrib", attrib || {});
    },

    shareLinkedin: function (url, extra) {
      return build(
        EVENTS.SHARE_LINKEDIN || "share_linkedin",
        Object.assign({ link_url: url || "", network: "linkedin" }, extra || {})
      );
    },

    shareTelegram: function (url, extra) {
      return build(
        EVENTS.SHARE_TELEGRAM || "share_telegram",
        Object.assign({ link_url: url || "", network: "telegram" }, extra || {})
      );
    },

    custom: function (name, params) {
      return build(name || "custom_event", params || {});
    },

    classifySocial: classifySocial,
    isOutbound: isOutbound,
    pageContext: pageContext
  };

  global.IPD_ANALYTICS_EVENTS = Events;
})(typeof window !== "undefined" ? window : this);
