/**
 * InfoparkDaily Analytics — constants
 * Event names follow Phase 5 taxonomy: {object}_{action} (see taxonomy.js).
 */
(function (global) {
  "use strict";

  var EVENTS = {
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
    REVENUE_RECORD: "revenue_record"
  };

  /** GA4 conversions (Phase 2 P0/P1 + Phase 10 commercial) */
  var CONVERSIONS = [
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

  var GOALS = {
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

  var SOCIAL = {
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

  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id"];

  var STORAGE = {
    UTM: "ipd_utm",
    ATTRIB: "ipd_attrib",
    SESSION_ID: "ipd_sid",
    SCROLL_SENT: "ipd_scroll_sent",
    RETURNING: "ipd_seen",
    SAVED: "ipd_saved"
  };

  global.IPD_ANALYTICS_CONSTANTS = {
    EVENTS: EVENTS,
    CONVERSIONS: CONVERSIONS,
    GOALS: GOALS,
    SOCIAL: SOCIAL,
    UTM_KEYS: UTM_KEYS,
    STORAGE: STORAGE
  };
})(typeof window !== "undefined" ? window : this);
