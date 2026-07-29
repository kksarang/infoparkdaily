/**
 * InfoparkDaily Analytics — user journey / funnel definitions
 * Phase 4: every step has an event; drop-off = 1 - (step_n / step_n-1).
 *
 * Use in GA4 Explore (Funnel exploration) or Looker Studio.
 * Steps use the same event names as constants.js / events.js.
 */
(function (global) {
  "use strict";

  var C = global.IPD_ANALYTICS_CONSTANTS || {};
  var EVENTS = C.EVENTS || {};

  /**
   * @typedef {{ id: string, label: string, event: string, match?: object, onSite: boolean }} FunnelStep
   * @typedef {{ id: string, name: string, goal: string, steps: FunnelStep[] }} Journey
   */

  /** @type {Journey[]} */
  var JOURNEYS = [
    {
      id: "candidate_apply",
      name: "Candidate → Apply",
      goal: "job_applications",
      description: "Homepage to official apply / company site",
      steps: [
        { id: "home", label: "Homepage", event: EVENTS.PAGE_VIEW || "page_view", match: { page_path: "/" }, onSite: true },
        { id: "jobs", label: "Jobs list", event: EVENTS.PAGE_VIEW || "page_view", match: { page_path: "/jobs/" }, onSite: true },
        { id: "search", label: "Search / filter", event: EVENTS.JOB_SEARCH || "job_search", onSite: true, alternateEvents: [EVENTS.JOB_FILTER || "job_filter"] },
        { id: "open_job", label: "Open job", event: EVENTS.JOB_VIEW || "job_view", onSite: true },
        { id: "read_job", label: "Read job (engage)", event: EVENTS.SCROLL || "scroll", match: { percent: 50 }, onSite: true },
        { id: "click_apply", label: "Click Apply", event: EVENTS.JOB_APPLY || "job_apply", onSite: true },
        { id: "company_site", label: "Visit company website", event: EVENTS.COMPANY_CLICK || "company_click", match: { outbound_type: "external" }, onSite: true },
        { id: "submit_app", label: "Submit application (employer ATS)", event: null, onSite: false, note: "Off-site — not measurable; proxy = job_apply CTR" }
      ]
    },
    {
      id: "candidate_direct_job",
      name: "Deep link → Apply",
      goal: "job_applications",
      description: "Shared /job/<id> or SEO landing directly on detail",
      steps: [
        { id: "land_job", label: "Land on job detail", event: EVENTS.JOB_VIEW || "job_view", onSite: true },
        { id: "read_job", label: "Read job (50% scroll)", event: EVENTS.SCROLL || "scroll", match: { percent: 50 }, onSite: true },
        { id: "click_apply", label: "Click Apply", event: EVENTS.JOB_APPLY || "job_apply", onSite: true }
      ]
    },
    {
      id: "park_jobs",
      name: "Park hub → Apply",
      goal: "job_applications",
      description: "Infopark / Technopark / Cyberpark curated pages",
      steps: [
        { id: "park", label: "Park jobs page", event: EVENTS.PAGE_VIEW || "page_view", match: { page_path_prefix: "/infopark-jobs|/technopark-jobs|/cyberpark-jobs" }, onSite: true },
        { id: "open_job", label: "Open job", event: EVENTS.JOB_VIEW || "job_view", onSite: true },
        { id: "click_apply", label: "Click Apply", event: EVENTS.JOB_APPLY || "job_apply", onSite: true }
      ]
    },
    {
      id: "instagram_follow",
      name: "Community → Instagram",
      goal: "instagram_followers",
      steps: [
        { id: "any_page", label: "Any page view", event: EVENTS.PAGE_VIEW || "page_view", onSite: true },
        { id: "ig_click", label: "Instagram click", event: EVENTS.SHARE_INSTAGRAM || "share_instagram", match: { network: "instagram" }, onSite: true },
        { id: "follow", label: "Follow on Instagram", event: null, onSite: false, note: "Off-site Meta metric" }
      ]
    },
    {
      id: "whatsapp_join",
      name: "Community → WhatsApp",
      goal: "whatsapp_members",
      steps: [
        { id: "any_page", label: "Any page view", event: EVENTS.PAGE_VIEW || "page_view", onSite: true },
        { id: "wa_click", label: "WhatsApp click", event: EVENTS.SHARE_WHATSAPP || "share_whatsapp", match: { network: "whatsapp" }, onSite: true },
        { id: "join", label: "Join channel/group", event: null, onSite: false, note: "Off-site WhatsApp metric" }
      ]
    },
    {
      id: "broadcast_sub",
      name: "Community → Broadcast",
      goal: "broadcast_subscribers",
      steps: [
        { id: "any_page", label: "Any page view", event: EVENTS.PAGE_VIEW || "page_view", onSite: true },
        { id: "bc_click", label: "Broadcast click", event: EVENTS.SHARE_INSTAGRAM || "share_instagram", match: { type: "broadcast" }, onSite: true },
        { id: "subscribe", label: "Subscribe", event: null, onSite: false, note: "Off-site Instagram metric" }
      ]
    },
    {
      id: "employer_enquiry",
      name: "Employer → Enquiry",
      goal: "employer_enquiries",
      steps: [
        { id: "land", label: "Land (home/services/jobs)", event: EVENTS.PAGE_VIEW || "page_view", onSite: true },
        { id: "contact", label: "Open contact", event: EVENTS.PAGE_VIEW || "page_view", match: { page_path: "/contact/" }, onSite: true },
        { id: "start", label: "Start form", event: EVENTS.CONTACT_START || "contact_start", onSite: true },
        { id: "submit", label: "Submit enquiry", event: EVENTS.CONTACT_SUBMIT || "contact_submit", onSite: true }
      ]
    },
    {
      id: "sponsor_pipeline",
      name: "Sponsor / campaign interest",
      goal: "sponsored_posts",
      steps: [
        { id: "services", label: "Services / Build / Hexenity CTA", event: EVENTS.CTA_CLICK || "cta_click", onSite: true },
        { id: "contact", label: "Contact (campaign reason)", event: EVENTS.PAGE_VIEW || "page_view", match: { page_path: "/contact/" }, onSite: true },
        { id: "submit", label: "Submit campaign enquiry", event: EVENTS.CONTACT_SUBMIT || "contact_submit", match: { reason: "Partner for a Campaign" }, onSite: true }
      ]
    },
    {
      id: "seo_engage",
      name: "SEO → Engage",
      goal: "seo_traffic",
      steps: [
        { id: "organic_land", label: "Organic landing", event: EVENTS.PAGE_VIEW || "page_view", match: { session_source: "organic" }, onSite: true, note: "Filter in GA4 by Organic Search" },
        { id: "engage", label: "Engaged (scroll 50% or job_view)", event: EVENTS.SCROLL || "scroll", onSite: true },
        { id: "convert", label: "Apply or social or contact", event: EVENTS.JOB_APPLY || "job_apply", onSite: true, alternateEvents: [EVENTS.SHARE_INSTAGRAM || "share_instagram", EVENTS.SHARE_WHATSAPP || "share_whatsapp", EVENTS.CONTACT_SUBMIT || "contact_submit"] }
      ]
    },
    {
      id: "newsletter",
      name: "Newsletter signup",
      goal: "newsletter",
      steps: [
        { id: "home", label: "Homepage", event: EVENTS.PAGE_VIEW || "page_view", match: { page_path: "/" }, onSite: true },
        { id: "submit", label: "Newsletter submit", event: EVENTS.NEWSLETTER_SIGNUP || "newsletter_signup", onSite: true },
        { id: "confirm", label: "Confirmed subscriber", event: null, onSite: false, note: "Needs real list backend" }
      ]
    },
    {
      id: "news_reader",
      name: "News discovery",
      goal: "returning_visitors",
      steps: [
        { id: "news_list", label: "News list", event: EVENTS.PAGE_VIEW || "page_view", match: { page_path: "/news/" }, onSite: true },
        { id: "article", label: "Open article", event: EVENTS.PAGE_VIEW || "page_view", match: { page_path: "/news-article/" }, onSite: true },
        { id: "read", label: "Read (75% scroll)", event: EVENTS.SCROLL || "scroll", match: { percent: 75 }, onSite: true }
      ]
    },
    {
      id: "return_visitor",
      name: "Return & re-engage",
      goal: "returning_visitors",
      steps: [
        { id: "return", label: "Returning session", event: EVENTS.PAGE_VIEW || "page_view", match: { user_type: "returning" }, onSite: true, note: "GA4 user type dimension" },
        { id: "jobs", label: "Visit jobs", event: EVENTS.PAGE_VIEW || "page_view", match: { page_path: "/jobs/" }, onSite: true },
        { id: "action", label: "Apply or social", event: EVENTS.JOB_APPLY || "job_apply", alternateEvents: [EVENTS.SHARE_INSTAGRAM || "share_instagram", EVENTS.SHARE_WHATSAPP || "share_whatsapp"], onSite: true }
      ]
    }
  ];

  /**
   * Drop-off between consecutive on-site steps.
   * dropOffPct[i] = (1 - count[i] / count[i-1]) * 100  for i >= 1
   * conversionRate = count[lastOnSite] / count[first] * 100
   */
  function calcDropoffs(stepCounts) {
    var dropOffPct = [];
    var i;
    for (i = 0; i < stepCounts.length; i++) {
      if (i === 0) {
        dropOffPct.push(0);
        continue;
      }
      var prev = Number(stepCounts[i - 1]) || 0;
      var cur = Number(stepCounts[i]) || 0;
      dropOffPct.push(prev <= 0 ? 100 : Math.round((1 - cur / prev) * 1000) / 10);
    }
    var first = Number(stepCounts[0]) || 0;
    var last = Number(stepCounts[stepCounts.length - 1]) || 0;
    return {
      dropOffPct: dropOffPct,
      stepConversionPct: stepCounts.map(function (c, idx) {
        if (idx === 0) return 100;
        return first <= 0 ? 0 : Math.round((Number(c) / first) * 1000) / 10;
      }),
      overallConversionPct: first <= 0 ? 0 : Math.round((last / first) * 1000) / 10
    };
  }

  function getJourney(id) {
    for (var i = 0; i < JOURNEYS.length; i++) {
      if (JOURNEYS[i].id === id) return JOURNEYS[i];
    }
    return null;
  }

  function onSiteSteps(journey) {
    return (journey.steps || []).filter(function (s) {
      return s.onSite !== false && s.event;
    });
  }

  global.IPD_ANALYTICS_JOURNEYS = {
    JOURNEYS: JOURNEYS,
    calcDropoffs: calcDropoffs,
    getJourney: getJourney,
    onSiteSteps: onSiteSteps
  };
})(typeof window !== "undefined" ? window : this);
