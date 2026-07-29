/**
 * InfoparkDaily Analytics — events, constants, taxonomy (Phase 16 ESM)
 * Event names follow Phase 5 taxonomy: {object}_{action}.
 */

export const EVENTS = {
  PAGE_VIEW: "page_view",
  JOB_VIEW: "job_view",
  JOB_SEARCH: "job_search",
  JOB_FILTER: "job_filter",
  JOB_APPLY: "job_apply",
  JOB_SHARE: "job_share",
  JOB_ENGAGE: "job_engage",
  JOB_EXIT: "job_exit",
  COMPANY_CLICK: "company_click",
  NEWS_VIEW: "news_view",
  NEWS_SHARE: "news_share",
  SHARE_WHATSAPP: "share_whatsapp",
  SHARE_INSTAGRAM: "share_instagram",
  SHARE_FACEBOOK: "share_facebook",
  SHARE_THREADS: "share_threads",
  HEADER_CLICK: "header_click",
  FOOTER_CLICK: "footer_click",
  CTA_CLICK: "cta_click",
  NEWSLETTER_SIGNUP: "newsletter_signup",
  CONTACT_START: "contact_start",
  CONTACT_SUBMIT: "contact_submit",
  CLICK_TO_CALL: "click_to_call",
  PAGE_404: "404_page",
  ERROR: "error",
  PERFORMANCE: "performance",
  SCROLL: "scroll",
  VIDEO_PLAY: "video_play",
  DOWNLOAD: "download",
  USER_CONTEXT: "user_context",
  SESSION_ATTRIB: "session_attrib",
  SHARE_LINKEDIN: "share_linkedin",
  SHARE_TELEGRAM: "share_telegram",
  CONTENT_SHARE: "content_share",
  CONTENT_SAVE: "content_save",
  PAGE_EXIT: "page_exit",
  NEWS_SEARCH: "news_search",
  AD_CLICK: "ad_click",
  SPONSOR_VIEW: "sponsor_view",
  SPONSOR_CLICK: "sponsor_click",
  COMPANY_VIEW: "company_view",
  REVENUE_RECORD: "revenue_record",
  IMAGE_ERROR: "image_error",
  API_FAIL: "api_fail",
  RESOURCE_FAIL: "resource_fail",
  SEO_AUDIT: "seo_audit",
  SEO_ISSUE: "seo_issue"
};

/** GA4 conversions (Phase 2 P0/P1 + Phase 10 commercial) */
export const CONVERSIONS = [
  EVENTS.JOB_APPLY,
  EVENTS.SHARE_INSTAGRAM,
  EVENTS.SHARE_WHATSAPP,
  EVENTS.CONTACT_SUBMIT,
  EVENTS.NEWSLETTER_SIGNUP,
  EVENTS.CLICK_TO_CALL,
  EVENTS.COMPANY_CLICK,
  EVENTS.AD_CLICK,
  EVENTS.SPONSOR_CLICK,
  EVENTS.REVENUE_RECORD
];

export const GOALS = {
  job_applications: [EVENTS.JOB_VIEW, EVENTS.JOB_APPLY, EVENTS.COMPANY_CLICK],
  instagram_followers: [EVENTS.SHARE_INSTAGRAM],
  whatsapp_members: [EVENTS.SHARE_WHATSAPP],
  broadcast_subscribers: [EVENTS.SHARE_INSTAGRAM],
  returning_visitors: [EVENTS.PAGE_VIEW],
  employer_enquiries: [EVENTS.CONTACT_SUBMIT, EVENTS.CLICK_TO_CALL, EVENTS.CTA_CLICK],
  ad_revenue: [EVENTS.AD_CLICK, EVENTS.CTA_CLICK, EVENTS.CONTACT_SUBMIT, EVENTS.REVENUE_RECORD],
  sponsored_posts: [EVENTS.SPONSOR_VIEW, EVENTS.SPONSOR_CLICK, EVENTS.CTA_CLICK, EVENTS.CONTACT_SUBMIT],
  seo_traffic: [EVENTS.PAGE_VIEW, EVENTS.PERFORMANCE],
  newsletter: [EVENTS.NEWSLETTER_SIGNUP],
  community_growth: [EVENTS.SHARE_INSTAGRAM, EVENTS.SHARE_WHATSAPP, EVENTS.JOB_APPLY, EVENTS.CONTACT_SUBMIT],
  campaign_roi: [EVENTS.REVENUE_RECORD, EVENTS.SESSION_ATTRIB, EVENTS.AD_CLICK, EVENTS.SPONSOR_CLICK]
};

export const SOCIAL = {
  INSTAGRAM_MAIN: {
    network: "instagram",
    account: "main",
    event: EVENTS.SHARE_INSTAGRAM,
    match: ["instagram.com/infoparkdaily/", "instagram.com/infoparkdaily/?"]
  },
  INSTAGRAM_JOBS: {
    network: "instagram",
    account: "jobs",
    event: EVENTS.SHARE_INSTAGRAM,
    match: ["instagram.com/infoparkdaily.jobs"]
  },
  INSTAGRAM_MEDIA: {
    network: "instagram",
    account: "media",
    event: EVENTS.SHARE_INSTAGRAM,
    match: ["instagram.com/infoparkdaily.media"]
  },
  INSTAGRAM_BROADCAST: {
    network: "instagram",
    account: "broadcast",
    type: "broadcast",
    event: EVENTS.SHARE_INSTAGRAM,
    match: ["instagram.com/channel/"]
  },
  WHATSAPP_CHANNEL: {
    network: "whatsapp",
    type: "channel",
    event: EVENTS.SHARE_WHATSAPP,
    match: ["whatsapp.com/channel/", "wa.me/"]
  },
  WHATSAPP_GROUP: {
    network: "whatsapp",
    type: "group",
    event: EVENTS.SHARE_WHATSAPP,
    match: ["chat.whatsapp.com/"]
  },
  FACEBOOK: {
    network: "facebook",
    event: EVENTS.SHARE_FACEBOOK,
    match: ["facebook.com/", "fb.com/"]
  },
  THREADS: {
    network: "threads",
    event: EVENTS.SHARE_THREADS,
    match: ["threads.com/", "threads.net/"]
  },
  TELEGRAM: {
    network: "telegram",
    event: EVENTS.SHARE_TELEGRAM,
    match: ["t.me/", "telegram.me/"]
  },
  LINKEDIN: {
    network: "linkedin",
    event: EVENTS.SHARE_LINKEDIN,
    match: ["linkedin.com/", "lnkd.in/"]
  }
};

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id"];

export const STORAGE = {
  UTM: "ipd_utm",
  ATTRIB: "ipd_attrib",
  SESSION_ID: "ipd_sid",
  SCROLL_SENT: "ipd_scroll_sent",
  RETURNING: "ipd_seen",
  SAVED: "ipd_saved"
};

const NAME_RE = /^[a-z0-9]+(_[a-z0-9]+)*$/;

/** Canonical event catalog — single source of truth */
export const CATALOG = [
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
  { name: "error", object: "error", action: "log", desc: "JS exception / rejection / console", params: ["message", "source", "error_kind"] },
  { name: "performance", object: "performance", action: "metric", desc: "CWV or nav / resource timing", params: ["metric_name", "metric_value", "metric_rating"] },
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
  { name: "revenue_record", object: "revenue", action: "record", desc: "Closed deal / invoice value (ops)", params: ["value", "currency", "campaign_id", "company", "lead_id"] },
  { name: "image_error", object: "image", action: "error", desc: "Broken / failed image load", params: ["image_url", "page_path"] },
  { name: "api_fail", object: "api", action: "fail", desc: "fetch/XHR failure", params: ["api_url", "status", "method"] },
  { name: "resource_fail", object: "resource", action: "fail", desc: "Asset 4xx/5xx or load fail", params: ["resource_url", "status", "resource_type"] },
  { name: "seo_audit", object: "seo", action: "audit", desc: "On-page SEO audit summary", params: ["issue_count", "has_schema", "has_canonical", "page_path"] },
  { name: "seo_issue", object: "seo", action: "issue", desc: "Single SEO problem found", params: ["issue_code", "severity", "detail"] }
];

/** Legacy → canonical (Phase 3/4 aliases; do not use in new code) */
export const ALIASES = {
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

function listNames() {
  return CATALOG.map(function (e) {
    return e.name;
  });
}

function isValidName(name) {
  var n = String(name || "");
  if (!NAME_RE.test(n)) return false;
  var known = listNames();
  if (known.indexOf(n) !== -1) return true;
  return n.indexOf("_") !== -1;
}

export function resolveAlias(name) {
  var n = String(name || "");
  if (Object.prototype.hasOwnProperty.call(ALIASES, n) && ALIASES[n]) return ALIASES[n];
  return n;
}

export function assertName(name) {
  var resolved = resolveAlias(name);
  if (!isValidName(resolved)) {
    try {
      console.warn("[IPD Taxonomy] Invalid event name:", name, "→ use catalog in taxonomy.js");
    } catch (_e) {
      /* ignore */
    }
  }
  return resolved;
}
