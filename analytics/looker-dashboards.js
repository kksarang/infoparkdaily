/**
 * InfoparkDaily Analytics — Looker Studio dashboards (Phase 15)
 * ==============================================================
 * Blueprint for free Looker Studio reports. Data sources:
 *   - GA4 (events + sessions) — primary
 *   - Search Console (queries / pages) — SEO board
 *   - Optional Google Sheet for offline revenue / ad spend (Revenue ROI)
 *
 * Create at: https://lookerstudio.google.com → Blank report → Add data → GA4 / GSC
 */
(function (global) {
  "use strict";

  var SOURCES = {
    GA4: "Google Analytics 4",
    GSC: "Search Console",
    SHEET: "Google Sheet (ops)",
    CLARITY: "Clarity (link out — not native Looker)"
  };

  /**
   * Each dashboard: id, audience, refresh tip, scorecards, charts, tables, filters.
   * metric/dimension names match GA4 Explore / Looker GA4 connector fields where possible.
   */
  var DASHBOARDS = [
    {
      id: "executive",
      label: "Executive Dashboard",
      audience: "Founder / weekly review",
      sources: [SOURCES.GA4],
      goal: "One screen: are we growing traffic, jobs intent, community, and leads?",
      scorecards: [
        { metric: "Active users", compare: "previous period" },
        { metric: "Sessions", compare: "previous period" },
        { metric: "Event count: job_apply", label: "Applies (intent)" },
        { metric: "Event count: contact_submit", label: "Employer leads" },
        { metric: "Event count: share_instagram + share_whatsapp", label: "Community CTAs" },
        { metric: "Engagement rate", compare: "previous period" }
      ],
      charts: [
        { type: "time_series", title: "Users & sessions (28d)", metrics: ["Active users", "Sessions"], dim: "Date" },
        { type: "stacked_bar", title: "Traffic by channel", metrics: ["Sessions"], dim: "Event parameter: channel" },
        { type: "scorecard_row", title: "P0 conversions", metrics: ["job_apply", "contact_submit", "share_instagram", "share_whatsapp"] }
      ],
      tables: [
        { title: "Top landing paths", dims: ["Landing page", "page_path"], metrics: ["Sessions", "job_apply"] }
      ],
      filters: ["Date range", "Device category", "channel"]
    },
    {
      id: "growth",
      label: "Growth Dashboard",
      audience: "Content / community ops",
      sources: [SOURCES.GA4],
      goal: "New vs returning, retention proxies, acquisition mix.",
      scorecards: [
        { metric: "New users" },
        { metric: "Sessions", filter: "returning_visit=true OR New/Returning = returning", label: "Returning sessions" },
        { metric: "Average engagement time per session" },
        { metric: "Event count: newsletter_signup" }
      ],
      charts: [
        { type: "time_series", title: "New users", metrics: ["New users"], dim: "Date" },
        { type: "pie", title: "New vs returning", metrics: ["Active users"], dim: "New / returning" },
        { type: "bar", title: "Channel group mix", metrics: ["Sessions"], dim: "channel_group" },
        { type: "bar", title: "Most returning pages", metrics: ["Event count: page_view"], dim: "page_path", filter: "returning_visit=true" }
      ],
      tables: [
        { title: "UTM campaigns driving growth", dims: ["utm_source", "utm_campaign"], metrics: ["Sessions", "New users", "job_apply"] }
      ],
      filters: ["Date range", "utm_source", "channel"]
    },
    {
      id: "seo",
      label: "SEO Dashboard",
      audience: "SEO / content",
      sources: [SOURCES.GSC, SOURCES.GA4],
      goal: "Queries, CTR, position, landings, on-page issues.",
      scorecards: [
        { metric: "Clicks", source: SOURCES.GSC },
        { metric: "Impressions", source: SOURCES.GSC },
        { metric: "Average CTR", source: SOURCES.GSC },
        { metric: "Average position", source: SOURCES.GSC },
        { metric: "Event count: seo_issue", label: "On-page SEO issues" }
      ],
      charts: [
        { type: "time_series", title: "Clicks & impressions", metrics: ["Clicks", "Impressions"], dim: "Date", source: SOURCES.GSC },
        { type: "scatter", title: "Query: impressions vs CTR", dims: ["Query"], metrics: ["Impressions", "CTR"], source: SOURCES.GSC },
        { type: "bar", title: "seo_issue by code", metrics: ["Event count"], dim: "issue_code", source: SOURCES.GA4 }
      ],
      tables: [
        { title: "Top queries", dims: ["Query"], metrics: ["Clicks", "Impressions", "CTR", "Position"], source: SOURCES.GSC },
        { title: "Top landing pages (GSC)", dims: ["Landing page"], metrics: ["Clicks", "Impressions", "CTR"], source: SOURCES.GSC },
        { title: "SEO issues (site)", dims: ["issue_code", "page_path", "severity"], metrics: ["Event count"], source: SOURCES.GA4 }
      ],
      filters: ["Date range", "Country", "Device", "Search type=Web"]
    },
    {
      id: "jobs",
      label: "Jobs Dashboard",
      audience: "Jobs curator",
      sources: [SOURCES.GA4],
      goal: "Views, applies, CTR, search, companies, engagement.",
      scorecards: [
        { metric: "Event count: job_view" },
        { metric: "Event count: job_apply" },
        { metric: "job_apply / job_view", label: "Apply CTR" },
        { metric: "Event count: job_search" },
        { metric: "Event count: company_click" }
      ],
      charts: [
        { type: "bar", title: "Most viewed jobs", metrics: ["job_view"], dim: "job_id", limit: 20 },
        { type: "bar", title: "Most applied jobs", metrics: ["job_apply"], dim: "job_id", limit: 20 },
        { type: "bar", title: "Highest CTR jobs", metrics: ["CTR formula"], dim: "job_id", note: "min 10 views" },
        { type: "bar", title: "Search terms", metrics: ["job_search"], dim: "search_term", limit: 25 },
        { type: "bar", title: "Company popularity", metrics: ["job_view"], dim: "company", limit: 20 },
        { type: "line", title: "Avg engaged_sec (job_engage)", metrics: ["Avg engaged_sec"], dim: "job_id" }
      ],
      tables: [
        { title: "Job funnel table", dims: ["job_id", "company", "location", "category"], metrics: ["job_view", "job_apply", "job_share", "CTR", "exit_rate"] },
        { title: "Filter usage", dims: ["Event parameter keys"], metrics: ["job_filter"] }
      ],
      filters: ["Date range", "company", "location", "experience", "channel"]
    },
    {
      id: "marketing",
      label: "Marketing Dashboard",
      audience: "Campaigns / partnerships",
      sources: [SOURCES.GA4],
      goal: "UTMs, campaigns, CTAs, ads, sponsors.",
      scorecards: [
        { metric: "Sessions with utm_campaign" },
        { metric: "Event count: cta_click" },
        { metric: "Event count: ad_click" },
        { metric: "sponsor_click / sponsor_view", label: "Sponsor CTR" }
      ],
      charts: [
        { type: "bar", title: "Campaign sessions", metrics: ["Sessions"], dim: "utm_campaign" },
        { type: "bar", title: "Source / medium", metrics: ["Sessions", "job_apply"], dims: ["utm_source", "utm_medium"] },
        { type: "bar", title: "Ad clicks by placement", metrics: ["ad_click"], dim: "placement" },
        { type: "bar", title: "Sponsor performance", metrics: ["sponsor_view", "sponsor_click"], dim: "sponsor_id" }
      ],
      tables: [
        { title: "Creative breakdown", dims: ["utm_campaign", "utm_content"], metrics: ["Sessions", "job_apply", "contact_submit"] }
      ],
      filters: ["Date range", "utm_source", "utm_campaign", "channel"]
    },
    {
      id: "social",
      label: "Social Dashboard",
      audience: "Social / community manager",
      sources: [SOURCES.GA4],
      goal: "IG / WA / Broadcast / FB / Threads attribution and CTA clicks.",
      scorecards: [
        { metric: "Event count: share_instagram" },
        { metric: "Event count: share_whatsapp" },
        { metric: "share_instagram where type=broadcast", label: "Broadcast clicks" },
        { metric: "Sessions where channel in social set" }
      ],
      charts: [
        { type: "pie", title: "Social outbound mix", metrics: ["Event count"], dim: "Event name", filter: "share_*" },
        { type: "bar", title: "Instagram account", metrics: ["share_instagram"], dim: "account" },
        { type: "bar", title: "WhatsApp type", metrics: ["share_whatsapp"], dim: "type" },
        { type: "time_series", title: "Social CTA trend", metrics: ["share_instagram", "share_whatsapp"], dim: "Date" },
        { type: "bar", title: "Landings from social channels", metrics: ["Sessions"], dim: "channel", filter: "instagram|whatsapp|facebook|threads|telegram|linkedin" }
      ],
      tables: [
        { title: "Social → apply", dims: ["channel", "utm_campaign"], metrics: ["Sessions", "job_apply"] }
      ],
      filters: ["Date range", "channel", "account", "type"],
      note: "Follower / member counts stay in Meta & WA admin — join by date offline if needed."
    },
    {
      id: "performance",
      label: "Performance Dashboard",
      audience: "Engineering / UX",
      sources: [SOURCES.GA4, SOURCES.CLARITY],
      goal: "CWV, slow assets, errors, 404s.",
      scorecards: [
        { metric: "p75 LCP", note: "Filter metric_name=LCP" },
        { metric: "p75 CLS" },
        { metric: "p75 INP" },
        { metric: "p75 TTFB" },
        { metric: "Event count: error" },
        { metric: "Event count: image_error" },
        { metric: "Event count: 404_page" }
      ],
      charts: [
        { type: "stacked_bar", title: "CWV rating mix", metrics: ["Event count"], dims: ["metric_name", "metric_rating"], filter: "LCP|CLS|INP|FCP|TTFB" },
        { type: "bar", title: "Slow images", metrics: ["Event count"], dim: "resource_url", filter: "metric_name=slow_image" },
        { type: "bar", title: "Large scripts", metrics: ["Event count"], dim: "resource_url", filter: "metric_name=large_script" },
        { type: "bar", title: "Errors by kind", metrics: ["Event count"], dim: "error_kind" }
      ],
      tables: [
        { title: "API failures", dims: ["api_url", "status"], metrics: ["api_fail"] },
        { title: "Broken images", dims: ["image_url", "page_path"], metrics: ["image_error"] }
      ],
      filters: ["Date range", "page_path", "Device category"],
      note: "Open Clarity Recordings for rage/dead clicks (link out)."
    },
    {
      id: "revenue",
      label: "Revenue Dashboard",
      audience: "Business / partnerships",
      sources: [SOURCES.GA4, SOURCES.SHEET],
      goal: "Leads, ads, sponsors, attributed revenue & ROI.",
      scorecards: [
        { metric: "Event count: contact_submit where lead_type=employer", label: "Employer leads" },
        { metric: "Event count: ad_click" },
        { metric: "Event count: sponsor_click" },
        { metric: "Sum of value (revenue_record)", label: "Attributed revenue" }
      ],
      charts: [
        { type: "bar", title: "Leads by channel", metrics: ["contact_submit"], dim: "channel", filter: "lead_type=employer" },
        { type: "bar", title: "Revenue by campaign", metrics: ["Sum value"], dim: "campaign_id" },
        { type: "table_calc", title: "Campaign ROI", note: "Join Sheet cost on campaign_id: (revenue-cost)/cost" }
      ],
      tables: [
        { title: "Revenue records", dims: ["campaign_id", "company", "channel"], metrics: ["Sum value", "Event count"] },
        { title: "Ad placements", dims: ["ad_id", "placement", "advertiser"], metrics: ["ad_click"] }
      ],
      filters: ["Date range", "campaign_id", "company"],
      note: "Create Sheet: campaign_id | cost_inr | start | end — blend in Looker."
    },
    {
      id: "employer",
      label: "Employer Dashboard",
      audience: "Employer success / BD",
      sources: [SOURCES.GA4],
      goal: "Company interest: views, profile visits, site clicks, enquiries.",
      scorecards: [
        { metric: "Event count: company_view" },
        { metric: "Event count: company_click" },
        { metric: "Event count: job_view" },
        { metric: "Event count: contact_submit", filter: "lead_type=employer" }
      ],
      charts: [
        { type: "bar", title: "Top companies by job_view", metrics: ["job_view"], dim: "company" },
        { type: "bar", title: "Company profile visits", metrics: ["company_view"], dim: "company" },
        { type: "bar", title: "Outbound career clicks", metrics: ["company_click"], dim: "company" },
        { type: "funnel", title: "company_view → company_click → contact_submit", metrics: ["counts"] }
      ],
      tables: [
        { title: "Employer pipeline", dims: ["company"], metrics: ["job_view", "company_view", "company_click", "contact_submit", "job_apply"] }
      ],
      filters: ["Date range", "company", "channel"]
    }
  ];

  /** Shared Looker setup checklist */
  var SETUP = [
    "lookerstudio.google.com → Create → Blank report",
    "Add data → Google Analytics → property infoparkdaily → events + sessions",
    "Add data → Search Console → URL prefix or Domain property → Web",
    "Optional: Google Sheet for campaign costs / closed revenue",
    "Register custom dimensions in GA4 (event-scoped): channel, channel_group, job_id, company, utm_*, metric_name, issue_code, lead_type, …",
    "Mark conversions: job_apply, contact_submit, share_instagram, share_whatsapp, ad_click, sponsor_click, revenue_record",
    "Duplicate report pages — one page per dashboard below",
    "Share link: view-only for stakeholders; edit for ops"
  ];

  /** Suggested custom dimensions to register in GA4 Admin → Custom definitions */
  var CUSTOM_DIMENSIONS = [
    "channel",
    "channel_group",
    "job_id",
    "company",
    "search_term",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "metric_name",
    "metric_rating",
    "issue_code",
    "lead_type",
    "content_type",
    "network_speed",
    "account",
    "type",
    "placement",
    "sponsor_id",
    "ad_id"
  ];

  function listDashboardIds() {
    return DASHBOARDS.map(function (d) {
      return d.id;
    });
  }

  function getDashboard(id) {
    for (var i = 0; i < DASHBOARDS.length; i++) {
      if (DASHBOARDS[i].id === id) return DASHBOARDS[i];
    }
    return null;
  }

  global.IPD_ANALYTICS_LOOKER = {
    SOURCES: SOURCES,
    DASHBOARDS: DASHBOARDS,
    SETUP: SETUP,
    CUSTOM_DIMENSIONS: CUSTOM_DIMENSIONS,
    listDashboardIds: listDashboardIds,
    getDashboard: getDashboard
  };
})(typeof window !== "undefined" ? window : this);
