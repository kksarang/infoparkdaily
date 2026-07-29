/**
 * InfoparkDaily Analytics — Content metrics (Phase 16 ESM)
 * News, pages, companies, categories, search, shares, saves.
 */

import { EVENTS, STORAGE } from "./events.js";

/**
 * Metric registry — how each KPI is computed.
 * content_key: article_id | page_path | company | category | search_term | author
 */
export const METRICS = [
  {
    id: "top_news",
    label: "Top News",
    event: EVENTS.NEWS_VIEW,
    dimension: "article_id",
    aggregate: "count",
    sort: "desc",
    note: "Also break down by title, category, park"
  },
  {
    id: "top_companies",
    label: "Top Companies",
    events: [EVENTS.JOB_VIEW, EVENTS.COMPANY_CLICK],
    dimension: "company",
    aggregate: "count",
    sort: "desc",
    note: "Rank by views or by company_click (employer intent)"
  },
  {
    id: "top_categories",
    label: "Top Categories",
    events: [EVENTS.NEWS_VIEW, EVENTS.JOB_VIEW, EVENTS.JOB_FILTER],
    dimension: "category",
    aggregate: "count",
    sort: "desc"
  },
  {
    id: "top_pages",
    label: "Top Pages",
    event: EVENTS.PAGE_VIEW,
    dimension: "page_path",
    aggregate: "count",
    sort: "desc",
    note: "GA4 Pages and screens also works once GTM is live"
  },
  {
    id: "most_shared_content",
    label: "Most Shared Content",
    events: [EVENTS.NEWS_SHARE, EVENTS.JOB_SHARE, EVENTS.CONTENT_SHARE],
    dimension: "content_id",
    aggregate: "count",
    sort: "desc",
    note: "Unify via content_type + content_id (article_id or job_id)"
  },
  {
    id: "most_saved_content",
    label: "Most Saved Content",
    event: EVENTS.CONTENT_SAVE,
    dimension: "content_id",
    aggregate: "count",
    sort: "desc",
    note: "Requires save/bookmark UI; event ready"
  },
  {
    id: "top_search_queries",
    label: "Top Search Queries",
    event: EVENTS.JOB_SEARCH,
    dimension: "search_term",
    aggregate: "count",
    sort: "desc",
    note: "Add news_search when news list gets a query box"
  },
  {
    id: "top_authors",
    label: "Top Authors",
    event: EVENTS.NEWS_VIEW,
    dimension: "author",
    aggregate: "count",
    sort: "desc",
    note: "Use author field on NEWS items; fallback source until authored"
  },
  {
    id: "most_returning_pages",
    label: "Most Returning Pages",
    event: EVENTS.PAGE_VIEW,
    dimension: "page_path",
    filter: "user_type=returning OR returning_visit=true",
    aggregate: "count",
    sort: "desc",
    note: "GA4 New/returning × Page path; client sets returning_visit flag"
  },
  {
    id: "top_landing_pages",
    label: "Top Landing Pages",
    event: EVENTS.SESSION_ATTRIB,
    dimension: "landing_path",
    aggregate: "count",
    sort: "desc",
    note: "Also GA4 Landing page + session_attrib.landing_path"
  },
  {
    id: "top_exit_pages",
    label: "Top Exit Pages",
    event: EVENTS.PAGE_EXIT,
    dimension: "page_path",
    aggregate: "count",
    sort: "desc",
    note: "Fired on pagehide; last page of session ≈ exit"
  }
];

/** Classify path → content_type for page_view / page_exit */
export function contentTypeFromPath(path) {
  path = String(path || "");
  if (/^\/job\//i.test(path)) return "job";
  if (/^\/news-article/i.test(path)) return "news";
  if (/^\/news\/?$/i.test(path) || path === "/news") return "news_list";
  if (/^\/jobs\/?$/i.test(path) || path.indexOf("/jobs") === 0) return "jobs_list";
  if (/infopark-jobs|technopark-jobs|cyberpark-jobs/i.test(path)) return "park_jobs";
  if (/^\/media/i.test(path)) return "media";
  if (/^\/contact/i.test(path)) return "contact";
  if (/^\/services/i.test(path)) return "services";
  if (path === "/" || path === "") return "home";
  return "page";
}

export function contentIdFromContext(ctx) {
  ctx = ctx || {};
  if (ctx.article_id) return String(ctx.article_id);
  if (ctx.job_id) return String(ctx.job_id);
  if (ctx.content_id) return String(ctx.content_id);
  return String(ctx.page_path || "");
}

/**
 * Normalize share/save events to a common shape for Looker.
 */
export function normalizeContentEvent(name, params) {
  params = params || {};
  var type = params.content_type || "";
  var id = params.content_id || "";
  if (!type) {
    if (name === "news_view" || name === "news_share") type = "news";
    else if (name.indexOf("job_") === 0) type = "job";
    else type = contentTypeFromPath(params.page_path);
  }
  if (!id) {
    id =
      params.article_id ||
      params.job_id ||
      contentIdFromContext(params) ||
      params.page_path ||
      "";
  }
  return Object.assign({}, params, {
    content_type: type,
    content_id: id
  });
}

export function returningVisitFlag() {
  try {
    var seenKey = STORAGE.RETURNING;
    var sessionKey = "ipd_returning";
    var cached = null;
    try {
      cached = globalThis.sessionStorage.getItem(sessionKey);
    } catch (_s) {
      cached = null;
    }
    if (cached === "1") return true;
    if (cached === "0") return false;
    var seen = globalThis.localStorage.getItem(seenKey);
    var isReturning = Boolean(seen);
    try {
      globalThis.sessionStorage.setItem(sessionKey, isReturning ? "1" : "0");
    } catch (_s2) {
      /* ignore */
    }
    globalThis.localStorage.setItem(seenKey, "1");
    return isReturning;
  } catch (_e) {
    return false;
  }
}

/**
 * Debug rollup: top N by dimension from a flat event log.
 * Each row: { name, params }
 */
export function rollupTop(events, eventNames, dimension, n) {
  n = n || 10;
  var allow = {};
  (eventNames || []).forEach(function (e) {
    allow[e] = true;
  });
  var counts = {};
  (events || []).forEach(function (row) {
    var name = row.name || row.event;
    if (!allow[name]) return;
    var p = normalizeContentEvent(name, row.params || row);
    var key = String(p[dimension] || "").trim();
    if (!key) return;
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.keys(counts)
    .map(function (k) {
      return { key: k, count: counts[k] };
    })
    .sort(function (a, b) {
      return b.count - a.count;
    })
    .slice(0, n);
}
