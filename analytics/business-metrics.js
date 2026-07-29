/**
 * InfoparkDaily Analytics — Business metrics (Phase 10)
 * =====================================================
 * Revenue, leads, ads, sponsorships, community attribution.
 * On-site we measure *intent*; closed revenue & follower counts need ops input.
 */
(function (global) {
  "use strict";

  var C = global.IPD_ANALYTICS_CONSTANTS || {};
  var EVENTS = C.EVENTS || {};

  /** Contact reasons that count as employer / commercial leads */
  var EMPLOYER_REASONS = [
    "Post a Job",
    "Partner for a Campaign",
    "Advertise",
    "Sponsorship",
    "Hire / Recruit"
  ];

  var METRICS = [
    {
      id: "employer_leads",
      label: "Employer Leads",
      event: EVENTS.CONTACT_SUBMIT || "contact_submit",
      filter: "lead_type=employer OR reason in EMPLOYER_REASONS",
      aggregate: "count",
      note: "P0 commercial signal"
    },
    {
      id: "contact_form_conversion",
      label: "Contact Form Conversion",
      formula: "contact_submit / contact_start",
      alternate: "contact_submit / page_view(path=/contact/)",
      aggregate: "ratio"
    },
    {
      id: "advertisement_clicks",
      label: "Advertisement Clicks",
      event: EVENTS.AD_CLICK || "ad_click",
      dimension: "ad_id",
      aggregate: "count",
      sort: "desc"
    },
    {
      id: "sponsored_post_performance",
      label: "Sponsored Post Performance",
      events: [EVENTS.SPONSOR_VIEW || "sponsor_view", EVENTS.SPONSOR_CLICK || "sponsor_click"],
      formula: "sponsor_click / sponsor_view",
      dimension: "sponsor_id",
      aggregate: "ratio",
      note: "Also track engagement via scroll on sponsor placement"
    },
    {
      id: "company_profile_visits",
      label: "Company Profile Visits",
      event: EVENTS.COMPANY_VIEW || "company_view",
      dimension: "company",
      aggregate: "count",
      sort: "desc",
      note: "Jobs filtered by company (?company=) or future /company/ pages"
    },
    {
      id: "company_website_clicks",
      label: "Company Website Clicks",
      event: EVENTS.COMPANY_CLICK || "company_click",
      dimension: "company",
      aggregate: "count",
      sort: "desc"
    },
    {
      id: "revenue_attribution",
      label: "Revenue Attribution",
      event: EVENTS.REVENUE_RECORD || "revenue_record",
      formula: "SUM(value) by channel / utm_campaign / company",
      note: "Ops fires revenue_record when invoice paid; inherits session UTMs if same browser — else pass campaign ids manually"
    },
    {
      id: "campaign_roi",
      label: "Campaign ROI",
      formula: "(SUM revenue_record.value − cost) / cost",
      dimension: "utm_campaign | campaign_id",
      note: "Cost is offline (ads spend sheet). Join in Looker on campaign_id"
    },
    {
      id: "instagram_growth_attribution",
      label: "Instagram Growth Attribution",
      event: EVENTS.SHARE_INSTAGRAM || "share_instagram",
      filter: "account!=broadcast OR type=profile",
      formula: "share_instagram × sessions where channel=instagram",
      note: "Proxy only — real follower delta from Meta Insights, join by date/campaign"
    },
    {
      id: "whatsapp_join_attribution",
      label: "WhatsApp Join Attribution",
      event: EVENTS.SHARE_WHATSAPP || "share_whatsapp",
      filter: "type=channel|group",
      note: "On-site join intent; WhatsApp admin stats for actual joins"
    },
    {
      id: "broadcast_join_attribution",
      label: "Broadcast Join Attribution",
      event: EVENTS.SHARE_INSTAGRAM || "share_instagram",
      filter: "type=broadcast OR account=broadcast",
      note: "Instagram Broadcast Channel click proxy"
    }
  ];

  function normalizeReason(reason) {
    return String(reason || "").trim();
  }

  function isEmployerLead(reason, extra) {
    extra = extra || {};
    var r = normalizeReason(reason);
    if (extra.lead_type === "employer") return true;
    if (EMPLOYER_REASONS.indexOf(r) !== -1) return true;
    var lower = r.toLowerCase();
    if (lower.indexOf("job") !== -1 || lower.indexOf("campaign") !== -1 || lower.indexOf("sponsor") !== -1 || lower.indexOf("advert") !== -1)
      return true;
    if (extra.company && String(extra.company).trim()) return true;
    return false;
  }

  function leadType(reason, extra) {
    if (isEmployerLead(reason, extra)) return "employer";
    var r = normalizeReason(reason).toLowerCase();
    if (r.indexOf("newsletter") !== -1) return "newsletter";
    if (r.indexOf("general") !== -1 || !r) return "general";
    return "other";
  }

  /**
   * ROI helper for Looker / debug — values in same currency.
   * roi = (revenue - cost) / cost ; null if cost missing/0
   */
  function calcRoi(revenue, cost) {
    var r = Number(revenue) || 0;
    var c = Number(cost) || 0;
    if (c <= 0) return null;
    return Math.round(((r - c) / c) * 1000) / 1000;
  }

  function calcContactCvr(submits, starts) {
    var s = Number(submits) || 0;
    var t = Number(starts) || 0;
    if (t <= 0) return null;
    return Math.round((s / t) * 10000) / 10000;
  }

  function calcSponsorCtr(clicks, views) {
    return calcContactCvr(clicks, views);
  }

  /**
   * Attribution keys to join IG/WA growth (offline) with on-site clicks.
   */
  function attributionKeys(params) {
    params = params || {};
    return {
      date: params.date || "",
      channel: params.channel || "",
      utm_campaign: params.utm_campaign || params.campaign_id || "",
      utm_content: params.utm_content || "",
      network: params.network || "",
      account: params.account || "",
      type: params.type || ""
    };
  }

  global.IPD_ANALYTICS_BUSINESS_METRICS = {
    METRICS: METRICS,
    EMPLOYER_REASONS: EMPLOYER_REASONS,
    isEmployerLead: isEmployerLead,
    leadType: leadType,
    calcRoi: calcRoi,
    calcContactCvr: calcContactCvr,
    calcSponsorCtr: calcSponsorCtr,
    attributionKeys: attributionKeys
  };
})(typeof window !== "undefined" ? window : this);
