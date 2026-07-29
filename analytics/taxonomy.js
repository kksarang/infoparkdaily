/**
 * InfoparkDaily Analytics — event taxonomy (Phase 5)
 * ====================================================
 * ONE naming standard for every event:
 *
 *   {object}_{action}
 *
 * Rules:
 * 1. Lowercase snake_case only (a-z, 0-9, underscore)
 * 2. Object first (noun), action second (verb) — never verb_object
 * 3. No spaces, hyphens, camelCase, or PASTE Case
 * 4. Prefer params for detail (job_id, percent, network) — not extra name segments
 * 5. Exceptions allowed for high-value social: share_whatsapp, share_instagram
 * 6. Max ~40 chars; no trailing underscore
 * 7. Never invent one-off names in page code — add here first
 */
(function (global) {
  "use strict";

  var NAME_RE = /^[a-z0-9]+(_[a-z0-9]+)*$/;

  /** Canonical event catalog — single source of truth */
  var CATALOG = [
    { name: "page_view", object: "page", action: "view", desc: "Any page load / virtual page", params: ["page_path", "page_title"] },
    { name: "job_view", object: "job", action: "view", desc: "Job detail opened", params: ["job_id", "company"] },
    { name: "job_search", object: "job", action: "search", desc: "Jobs search query", params: ["search_term"] },
    { name: "job_filter", object: "job", action: "filter", desc: "Jobs filter/sort change", params: ["status", "company", "location"] },
    { name: "job_apply", object: "job", action: "apply", desc: "Apply CTA (url or email)", params: ["job_id", "method"] },
    { name: "job_share", object: "job", action: "share", desc: "Share job detail link", params: ["job_id", "network"] },
    { name: "job_engage", object: "job", action: "engage", desc: "Reading heartbeat / engaged time", params: ["job_id", "engaged_sec", "max_scroll"] },
    { name: "job_exit", object: "job", action: "exit", desc: "Leave job detail", params: ["job_id", "engaged_sec", "max_scroll", "applied"] },
    { name: "company_click", object: "company", action: "click", desc: "Outbound employer / careers site", params: ["job_id", "link_url", "company"] },
    { name: "news_view", object: "news", action: "view", desc: "News article opened", params: ["article_id", "category", "author", "park"] },
    { name: "news_share", object: "news", action: "share", desc: "Share news article", params: ["article_id", "network", "category"] },
    { name: "share_whatsapp", object: "share", action: "whatsapp", desc: "WhatsApp channel/group/share click", params: ["type", "link_url"] },
    { name: "share_instagram", object: "share", action: "instagram", desc: "Instagram profile/broadcast click", params: ["account", "link_url"] },
    { name: "share_facebook", object: "share", action: "facebook", desc: "Facebook click", params: ["link_url"] },
    { name: "share_threads", object: "share", action: "threads", desc: "Threads click", params: ["link_url"] },
    { name: "header_click", object: "header", action: "click", desc: "Header / primary nav click", params: ["link_text", "link_url"] },
    { name: "footer_click", object: "footer", action: "click", desc: "Footer link click", params: ["link_text", "link_url"] },
    { name: "cta_click", object: "cta", action: "click", desc: "Marketing / campaign CTA", params: ["offer", "link_url", "cta_id"] },
    { name: "newsletter_signup", object: "newsletter", action: "signup", desc: "Newsletter form submit", params: [] },
    { name: "contact_start", object: "contact", action: "start", desc: "Contact form interaction start", params: ["reason"] },
    { name: "contact_submit", object: "contact", action: "submit", desc: "Contact form submit", params: ["reason", "success", "lead_type", "company"] },
    { name: "click_to_call", object: "click", action: "to_call", desc: "tel: link click", params: ["tel"] },
    { name: "404_page", object: "404", action: "page", desc: "Not-found (non-job) route", params: ["page_path"] },
    { name: "error", object: "error", action: "log", desc: "JS exception / rejection", params: ["message", "source"] },
    { name: "performance", object: "performance", action: "metric", desc: "CWV or nav timing", params: ["metric_name", "metric_value"] },
    { name: "scroll", object: "scroll", action: "depth", desc: "Scroll depth milestone", params: ["percent"] },
    { name: "video_play", object: "video", action: "play", desc: "Video / reel embed play", params: ["video_id"] },
    { name: "download", object: "download", action: "file", desc: "File download", params: ["file_name", "link_url"] },
    { name: "user_context", object: "user", action: "context", desc: "Client device / locale / network snapshot", params: ["language", "device_category", "os", "browser", "screen", "network_type"] },
    { name: "session_attrib", object: "session", action: "attrib", desc: "First-touch channel + UTM snapshot", params: ["channel", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "referrer"] },
    { name: "share_linkedin", object: "share", action: "linkedin", desc: "LinkedIn click / share", params: ["link_url"] },
    { name: "share_telegram", object: "share", action: "telegram", desc: "Telegram click / share", params: ["link_url"] },
    { name: "content_share", object: "content", action: "share", desc: "Generic content share (page/news/job)", params: ["content_type", "content_id", "network"] },
    { name: "content_save", object: "content", action: "save", desc: "Bookmark / save content", params: ["content_type", "content_id", "action"] },
    { name: "page_exit", object: "page", action: "exit", desc: "Leave page (pagehide)", params: ["page_path", "engaged_sec", "content_type"] },
    { name: "news_search", object: "news", action: "search", desc: "News list search query", params: ["search_term"] },
    { name: "ad_click", object: "ad", action: "click", desc: "Advertisement / banner click", params: ["ad_id", "placement", "advertiser"] },
    { name: "sponsor_view", object: "sponsor", action: "view", desc: "Sponsored placement impression", params: ["sponsor_id", "placement", "campaign_id"] },
    { name: "sponsor_click", object: "sponsor", action: "click", desc: "Sponsored placement click", params: ["sponsor_id", "placement", "campaign_id"] },
    { name: "company_view", object: "company", action: "view", desc: "Company profile / filtered company page", params: ["company"] },
    { name: "revenue_record", object: "revenue", action: "record", desc: "Closed deal / invoice value (ops)", params: ["value", "currency", "campaign_id", "company", "lead_id"] }
  ];

  /** Legacy → canonical (Phase 3/4 aliases; do not use in new code) */
  var ALIASES = {
    nav_click: "header_click",
    newsletter_submit: "newsletter_signup",
    scroll_depth: "scroll",
    js_error: "error",
    web_vital: "performance",
    perf_timing: "performance",
    slow_page: "performance",
    file_download: "download",
    outbound_click: "company_click",
    social_click: null // resolved dynamically to share_* 
  };

  function isValidName(name) {
    var n = String(name || "");
    if (!NAME_RE.test(n)) return false;
    var known = listNames();
    if (known.indexOf(n) !== -1) return true;
    // Allow well-formed custom extensions that still match the pattern
    return n.indexOf("_") !== -1;
  }

  function resolveAlias(name) {
    var n = String(name || "");
    if (Object.prototype.hasOwnProperty.call(ALIASES, n) && ALIASES[n]) return ALIASES[n];
    return n;
  }

  function assertName(name) {
    var resolved = resolveAlias(name);
    if (!isValidName(resolved)) {
      try {
        // eslint-disable-next-line no-console
        console.warn("[IPD Taxonomy] Invalid event name:", name, "→ use catalog in taxonomy.js");
      } catch (_e) {
        /* ignore */
      }
    }
    return resolved;
  }

  function listNames() {
    return CATALOG.map(function (e) {
      return e.name;
    });
  }

  global.IPD_ANALYTICS_TAXONOMY = {
    STANDARD: "{object}_{action}",
    NAME_RE: NAME_RE,
    CATALOG: CATALOG,
    ALIASES: ALIASES,
    isValidName: isValidName,
    resolveAlias: resolveAlias,
    assertName: assertName,
    listNames: listNames
  };
})(typeof window !== "undefined" ? window : this);
