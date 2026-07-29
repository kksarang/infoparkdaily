/**
 * InfoparkDaily Analytics — SEO metrics (Phase 13)
 * =================================================
 * Search performance (indexed pages, queries, CTR, position) lives in
 * Google Search Console. This module documents those KPIs and runs a
 * lightweight on-page audit (meta, canonical, schema, link hygiene).
 */
(function (global) {
  "use strict";

  var METRICS = [
    {
      id: "indexed_pages",
      label: "Indexed Pages",
      source: "gsc",
      report: "Search Console → Indexing → Pages",
      note: "Also: site:infoparkdaily.online"
    },
    {
      id: "top_keywords",
      label: "Top Keywords",
      source: "gsc",
      report: "Search Console → Performance → Queries (impressions)",
      note: "Queries ≈ keywords users typed"
    },
    {
      id: "top_search_queries",
      label: "Top Search Queries",
      source: "gsc",
      report: "Performance → Queries by clicks / impressions"
    },
    {
      id: "ctr",
      label: "CTR",
      source: "gsc",
      report: "Performance → CTR (clicks ÷ impressions)",
      formula: "clicks / impressions"
    },
    {
      id: "average_position",
      label: "Average Position",
      source: "gsc",
      report: "Performance → Average position"
    },
    {
      id: "top_landing_pages",
      label: "Top Landing Pages",
      source: "both",
      report: "GSC Performance → Pages; GA4 / session_attrib.landing_path",
      client: "session_attrib + page_view.is_landing"
    },
    {
      id: "schema_validation",
      label: "Schema Validation",
      source: "client",
      event: "seo_issue",
      note: "JSON-LD parse + required @type checks; confirm in Rich Results Test"
    },
    {
      id: "broken_links",
      label: "Broken Links",
      source: "client",
      event: "seo_issue",
      note: "Empty / javascript: / soft flags; same-origin HEAD sample"
    },
    {
      id: "missing_meta",
      label: "Missing Meta",
      source: "client",
      event: "seo_issue",
      note: "title, description, og:title, og:image, robots"
    },
    {
      id: "canonical_issues",
      label: "Canonical Issues",
      source: "client",
      event: "seo_issue",
      note: "Missing, multiple, or host mismatch vs location"
    }
  ];

  var EXPECTED_HOST = "infoparkdaily.online";

  function metaContent(doc, selector) {
    var el = doc.querySelector(selector);
    if (!el) return "";
    return String(el.getAttribute("content") || el.textContent || "").trim();
  }

  function collectJsonLd(doc) {
    var nodes = doc.querySelectorAll('script[type="application/ld+json"]');
    var out = [];
    for (var i = 0; i < nodes.length; i++) {
      var raw = (nodes[i].textContent || "").trim();
      if (!raw) continue;
      try {
        out.push({ ok: true, data: JSON.parse(raw), raw: raw.slice(0, 200) });
      } catch (err) {
        out.push({ ok: false, error: String(err && err.message ? err.message : err), raw: raw.slice(0, 120) });
      }
    }
    return out;
  }

  function schemaTypes(data) {
    var types = [];
    function walk(node) {
      if (!node) return;
      if (Array.isArray(node)) {
        node.forEach(walk);
        return;
      }
      if (typeof node !== "object") return;
      if (node["@type"]) {
        var t = node["@type"];
        if (Array.isArray(t)) types = types.concat(t);
        else types.push(String(t));
      }
      if (node["@graph"]) walk(node["@graph"]);
    }
    walk(data);
    return types;
  }

  function validateSchemaBlock(block) {
    var issues = [];
    if (!block.ok) {
      issues.push({ code: "schema_invalid_json", severity: "error", detail: block.error || "parse_error" });
      return issues;
    }
    var types = schemaTypes(block.data);
    if (!types.length) {
      issues.push({ code: "schema_missing_type", severity: "warning", detail: "no @type" });
      return issues;
    }
    // Soft checks for common InfoparkDaily types
    var data = block.data;
    var graph = Array.isArray(data) ? data : data["@graph"] ? data["@graph"] : [data];
    graph.forEach(function (node) {
      if (!node || typeof node !== "object") return;
      var t = String(node["@type"] || "");
      if (t === "JobPosting") {
        if (!node.title) issues.push({ code: "schema_job_missing_title", severity: "error", detail: "JobPosting.title" });
        if (!node.hiringOrganization) issues.push({ code: "schema_job_missing_org", severity: "warning", detail: "hiringOrganization" });
      }
      if (t === "NewsArticle" || t === "Article") {
        if (!node.headline) issues.push({ code: "schema_article_missing_headline", severity: "error", detail: "headline" });
      }
      if (t === "Organization" || t === "WebSite") {
        if (!node.name) issues.push({ code: "schema_missing_name", severity: "warning", detail: t + ".name" });
      }
    });
    return issues;
  }

  /**
   * On-page SEO audit for the current document.
   */
  function auditPage(options) {
    options = options || {};
    var doc = options.document || (global.document || null);
    var loc = options.location || global.location || {};
    var issues = [];
    var summary = {
      page_path: String(loc.pathname || ""),
      page_location: String(loc.href || ""),
      has_title: false,
      has_description: false,
      has_canonical: false,
      has_schema: false,
      schema_types: [],
      issue_count: 0
    };

    if (!doc) {
      return { summary: summary, issues: [{ code: "no_document", severity: "error", detail: "" }] };
    }

    var title = String((doc.querySelector("title") && doc.querySelector("title").textContent) || "").trim();
    summary.has_title = Boolean(title);
    if (!title) issues.push({ code: "missing_title", severity: "error", detail: "title" });
    else if (title.length < 15) issues.push({ code: "title_too_short", severity: "warning", detail: String(title.length) });
    else if (title.length > 65) issues.push({ code: "title_too_long", severity: "warning", detail: String(title.length) });

    var desc = metaContent(doc, 'meta[name="description"]');
    summary.has_description = Boolean(desc);
    if (!desc) issues.push({ code: "missing_description", severity: "error", detail: "meta description" });
    else if (desc.length < 50) issues.push({ code: "description_too_short", severity: "warning", detail: String(desc.length) });
    else if (desc.length > 170) issues.push({ code: "description_too_long", severity: "warning", detail: String(desc.length) });

    if (!metaContent(doc, 'meta[property="og:title"]')) {
      issues.push({ code: "missing_og_title", severity: "warning", detail: "og:title" });
    }
    if (!metaContent(doc, 'meta[property="og:image"]') && !metaContent(doc, 'meta[name="twitter:image"]')) {
      issues.push({ code: "missing_og_image", severity: "warning", detail: "og:image" });
    }
    var robots = metaContent(doc, 'meta[name="robots"]').toLowerCase();
    if (robots.indexOf("noindex") !== -1) {
      issues.push({ code: "robots_noindex", severity: "info", detail: robots });
    }

    var canonicals = doc.querySelectorAll('link[rel="canonical"]');
    summary.has_canonical = canonicals.length > 0;
    if (!canonicals.length) {
      issues.push({ code: "missing_canonical", severity: "error", detail: "link[rel=canonical]" });
    } else if (canonicals.length > 1) {
      issues.push({ code: "multiple_canonical", severity: "error", detail: String(canonicals.length) });
    } else {
      var href = String(canonicals[0].getAttribute("href") || "").trim();
      try {
        var cu = new URL(href, loc.href || "https://" + EXPECTED_HOST + "/");
        if (cu.hostname && cu.hostname.indexOf(EXPECTED_HOST) === -1 && cu.hostname !== "localhost") {
          issues.push({ code: "canonical_host_mismatch", severity: "warning", detail: cu.hostname });
        }
        if (loc.pathname && cu.pathname && cu.pathname !== loc.pathname && !/^\/job\//i.test(loc.pathname)) {
          // job pages often rewrite; only flag hard mismatches on static shells
          if (options.strictPathCanonical) {
            issues.push({ code: "canonical_path_mismatch", severity: "warning", detail: cu.pathname + " vs " + loc.pathname });
          }
        }
      } catch (_e) {
        issues.push({ code: "canonical_invalid_url", severity: "error", detail: href.slice(0, 120) });
      }
    }

    var ld = collectJsonLd(doc);
    summary.has_schema = ld.length > 0;
    if (!ld.length) {
      issues.push({ code: "missing_schema", severity: "warning", detail: "no JSON-LD" });
    } else {
      ld.forEach(function (block) {
        validateSchemaBlock(block).forEach(function (iss) {
          issues.push(iss);
        });
        if (block.ok) {
          summary.schema_types = summary.schema_types.concat(schemaTypes(block.data));
        }
      });
    }

    // Link hygiene (cheap checks only)
    var anchors = doc.querySelectorAll("a[href]");
    var brokenish = 0;
    var checked = 0;
    for (var i = 0; i < anchors.length && checked < 80; i++) {
      var a = anchors[i];
      var h = String(a.getAttribute("href") || "").trim();
      checked += 1;
      if (!h || h === "#" || /^javascript:/i.test(h)) {
        brokenish += 1;
        if (brokenish <= 5) {
          issues.push({
            code: "broken_link_soft",
            severity: "warning",
            detail: (h || "(empty)").slice(0, 80)
          });
        }
      }
    }
    summary.link_soft_issues = brokenish;

    summary.issue_count = issues.length;
    summary.schema_types = summary.schema_types.filter(function (v, idx, arr) {
      return arr.indexOf(v) === idx;
    });

    return { summary: summary, issues: issues };
  }

  /**
   * Optional same-origin HEAD probe for a small set of internal links.
   * Returns a Promise of issue objects (broken_link_http).
   */
  function probeInternalLinks(doc, loc, limit) {
    limit = limit || 8;
    doc = doc || global.document;
    loc = loc || global.location;
    if (!doc || !loc || typeof global.fetch !== "function") {
      return Promise.resolve([]);
    }
    var origin = loc.origin || "";
    var hrefs = [];
    var seen = {};
    var nodes = doc.querySelectorAll("a[href]");
    for (var i = 0; i < nodes.length && hrefs.length < limit; i++) {
      try {
        var u = new URL(nodes[i].href, loc.href);
        if (u.origin !== origin) continue;
        if (u.pathname === loc.pathname) continue;
        if (seen[u.pathname]) continue;
        seen[u.pathname] = 1;
        hrefs.push(u.href);
      } catch (_e) {
        /* ignore */
      }
    }

    return Promise.all(
      hrefs.map(function (url) {
        return global
          .fetch(url, { method: "HEAD", credentials: "same-origin" })
          .then(function (res) {
            if (res.status >= 400) {
              return { code: "broken_link_http", severity: "error", detail: res.status + " " + url.slice(0, 120) };
            }
            return null;
          })
          .catch(function () {
            return { code: "broken_link_http", severity: "warning", detail: "fail " + url.slice(0, 120) };
          });
      })
    ).then(function (rows) {
      return rows.filter(Boolean);
    });
  }

  global.IPD_ANALYTICS_SEO = {
    METRICS: METRICS,
    EXPECTED_HOST: EXPECTED_HOST,
    auditPage: auditPage,
    probeInternalLinks: probeInternalLinks,
    collectJsonLd: collectJsonLd,
    gscMetricIds: METRICS.filter(function (m) {
      return m.source === "gsc" || m.source === "both";
    }).map(function (m) {
      return m.id;
    }),
    clientMetricIds: METRICS.filter(function (m) {
      return m.source === "client" || m.source === "both";
    }).map(function (m) {
      return m.id;
    })
  };
})(typeof window !== "undefined" ? window : this);
