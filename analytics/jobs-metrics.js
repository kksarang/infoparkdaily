/**
 * InfoparkDaily Analytics — Job analytics metrics (Phase 6)
 * ==========================================================
 * Defines how each job KPI is computed from taxonomy events.
 * Use in GA4 Explore / Looker Studio. Helpers for client-side rollups (debug).
 */
(function (global) {
  "use strict";

  var C = global.IPD_ANALYTICS_CONSTANTS || {};
  var EVENTS = C.EVENTS || {};

  /**
   * Metric registry — single definition for dashboards.
   * formula uses event counts keyed by job_id (or dimension).
   */
  var METRICS = [
    {
      id: "most_viewed_jobs",
      label: "Most Viewed Jobs",
      event: EVENTS.JOB_VIEW || "job_view",
      dimension: "job_id",
      aggregate: "count",
      sort: "desc"
    },
    {
      id: "most_applied_jobs",
      label: "Most Applied Jobs",
      event: EVENTS.JOB_APPLY || "job_apply",
      dimension: "job_id",
      aggregate: "count",
      sort: "desc"
    },
    {
      id: "most_shared_jobs",
      label: "Most Shared Jobs",
      event: EVENTS.JOB_SHARE || "job_share",
      dimension: "job_id",
      aggregate: "count",
      sort: "desc"
    },
    {
      id: "highest_ctr_jobs",
      label: "Highest CTR Jobs",
      formula: "job_apply / job_view",
      dimension: "job_id",
      aggregate: "ratio",
      sort: "desc",
      minViews: 10
    },
    {
      id: "lowest_ctr_jobs",
      label: "Lowest CTR Jobs",
      formula: "job_apply / job_view",
      dimension: "job_id",
      aggregate: "ratio",
      sort: "asc",
      minViews: 10
    },
    {
      id: "avg_reading_time",
      label: "Average Reading Time",
      event: EVENTS.JOB_ENGAGE || "job_engage",
      metric: "engaged_sec",
      aggregate: "avg",
      dimension: "job_id"
    },
    {
      id: "avg_scroll_pct",
      label: "Average Scroll %",
      event: EVENTS.SCROLL || "scroll",
      metric: "percent",
      aggregate: "avg_max",
      dimension: "job_id",
      note: "Prefer max_scroll from job_engage / job_exit"
    },
    {
      id: "application_cvr",
      label: "Application Conversion Rate",
      formula: "sum(job_apply) / sum(job_view)",
      aggregate: "ratio_global"
    },
    {
      id: "search_keywords",
      label: "Search Keywords",
      event: EVENTS.JOB_SEARCH || "job_search",
      dimension: "search_term",
      aggregate: "count",
      sort: "desc"
    },
    {
      id: "filter_usage",
      label: "Filter Usage",
      event: EVENTS.JOB_FILTER || "job_filter",
      dimension: "status|experience|type|tag|company|location|sort",
      aggregate: "count_params",
      sort: "desc"
    },
    {
      id: "category_popularity",
      label: "Category Popularity",
      event: EVENTS.JOB_VIEW || "job_view",
      dimension: "category",
      aggregate: "count",
      sort: "desc"
    },
    {
      id: "location_popularity",
      label: "Location Popularity",
      event: EVENTS.JOB_VIEW || "job_view",
      dimension: "location",
      aggregate: "count",
      sort: "desc"
    },
    {
      id: "company_popularity",
      label: "Company Popularity",
      event: EVENTS.JOB_VIEW || "job_view",
      dimension: "company",
      aggregate: "count",
      sort: "desc"
    },
    {
      id: "fresher_vs_experienced",
      label: "Freshers vs Experienced Interest",
      event: EVENTS.JOB_VIEW || "job_view",
      dimension: "experience",
      aggregate: "count",
      sort: "desc",
      values: ["fresher", "experienced", "both"]
    },
    {
      id: "dead_jobs",
      label: "Dead Jobs",
      formula: "job_view < 3 AND job_apply = 0 over 14d",
      aggregate: "rule",
      note: "Looker filter; low interest listings"
    },
    {
      id: "expired_job_views",
      label: "Expired Job Views",
      event: EVENTS.JOB_VIEW || "job_view",
      filter: { expired: true },
      dimension: "job_id",
      aggregate: "count",
      sort: "desc"
    },
    {
      id: "highest_exit_rate",
      label: "Jobs with highest exit rate",
      formula: "job_exit(applied=false) / job_view",
      dimension: "job_id",
      aggregate: "ratio",
      sort: "desc",
      minViews: 10
    },
    {
      id: "highest_engagement",
      label: "Jobs with highest engagement",
      formula: "avg(engaged_sec) * avg(max_scroll)",
      event: EVENTS.JOB_ENGAGE || "job_engage",
      dimension: "job_id",
      aggregate: "engagement_score",
      sort: "desc"
    }
  ];

  /** CTR = applies / views (0–1). Guard divide-by-zero. */
  function ctr(applies, views) {
    var a = Number(applies) || 0;
    var v = Number(views) || 0;
    if (v <= 0) return 0;
    return Math.round((a / v) * 10000) / 10000;
  }

  function ctrPct(applies, views) {
    return Math.round(ctr(applies, views) * 1000) / 10;
  }

  /**
   * Build per-job rollup from arrays of event rows:
   * [{ event, job_id, engaged_sec, max_scroll, applied, expired, ... }]
   */
  function rollupByJob(rows) {
    var map = {};
    (rows || []).forEach(function (r) {
      var id = r.job_id || r.jobId;
      if (!id) return;
      if (!map[id]) {
        map[id] = {
          job_id: id,
          company: r.company || "",
          views: 0,
          applies: 0,
          shares: 0,
          exits: 0,
          exits_no_apply: 0,
          engaged_sec_sum: 0,
          engage_n: 0,
          max_scroll_sum: 0,
          expired_views: 0
        };
      }
      var m = map[id];
      if (r.company) m.company = r.company;
      var ev = r.event || r.name;
      if (ev === "job_view") {
        m.views += 1;
        if (r.expired) m.expired_views += 1;
      } else if (ev === "job_apply") {
        m.applies += 1;
      } else if (ev === "job_share") {
        m.shares += 1;
      } else if (ev === "job_exit") {
        m.exits += 1;
        if (!r.applied) m.exits_no_apply += 1;
        if (r.engaged_sec) {
          m.engaged_sec_sum += Number(r.engaged_sec) || 0;
          m.engage_n += 1;
        }
        if (r.max_scroll) m.max_scroll_sum += Number(r.max_scroll) || 0;
      } else if (ev === "job_engage") {
        m.engaged_sec_sum += Number(r.engaged_sec) || 0;
        m.engage_n += 1;
        if (r.max_scroll) m.max_scroll_sum += Number(r.max_scroll) || 0;
      }
    });

    return Object.keys(map).map(function (id) {
      var m = map[id];
      var avgRead = m.engage_n ? m.engaged_sec_sum / m.engage_n : 0;
      var avgScroll = m.engage_n ? m.max_scroll_sum / m.engage_n : 0;
      return {
        job_id: m.job_id,
        company: m.company,
        views: m.views,
        applies: m.applies,
        shares: m.shares,
        ctr: ctr(m.applies, m.views),
        ctr_pct: ctrPct(m.applies, m.views),
        avg_reading_sec: Math.round(avgRead * 10) / 10,
        avg_scroll_pct: Math.round(avgScroll * 10) / 10,
        exit_rate: ctr(m.exits_no_apply, m.views),
        engagement_score: Math.round(avgRead * (avgScroll / 100) * 10) / 10,
        expired_views: m.expired_views,
        is_dead: m.views < 3 && m.applies === 0
      };
    });
  }

  function topBy(rows, key, dir, limit, minViews) {
    var list = rollupByJob(rows).filter(function (r) {
      return !minViews || r.views >= minViews;
    });
    list.sort(function (a, b) {
      var av = a[key] || 0;
      var bv = b[key] || 0;
      return dir === "asc" ? av - bv : bv - av;
    });
    return list.slice(0, limit || 10);
  }

  function countByDimension(rows, eventName, dimension) {
    var counts = {};
    (rows || []).forEach(function (r) {
      if ((r.event || r.name) !== eventName) return;
      var key = String(r[dimension] || "(none)");
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.keys(counts)
      .map(function (k) {
        return { key: k, count: counts[k] };
      })
      .sort(function (a, b) {
        return b.count - a.count;
      });
  }

  global.IPD_ANALYTICS_JOB_METRICS = {
    METRICS: METRICS,
    ctr: ctr,
    ctrPct: ctrPct,
    rollupByJob: rollupByJob,
    topBy: topBy,
    countByDimension: countByDimension,
    mostViewed: function (rows, n) {
      return topBy(rows, "views", "desc", n);
    },
    mostApplied: function (rows, n) {
      return topBy(rows, "applies", "desc", n);
    },
    mostShared: function (rows, n) {
      return topBy(rows, "shares", "desc", n);
    },
    highestCtr: function (rows, n) {
      return topBy(rows, "ctr", "desc", n, 10);
    },
    lowestCtr: function (rows, n) {
      return topBy(rows, "ctr", "asc", n, 10);
    },
    highestExit: function (rows, n) {
      return topBy(rows, "exit_rate", "desc", n, 10);
    },
    highestEngagement: function (rows, n) {
      return topBy(rows, "engagement_score", "desc", n);
    },
    deadJobs: function (rows) {
      return rollupByJob(rows).filter(function (r) {
        return r.is_dead;
      });
    }
  };
})(typeof window !== "undefined" ? window : this);
