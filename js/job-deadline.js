/**
 * InfoparkDaily — shared job deadline logic.
 * Rolling / no deadline → listing expires 45 days after postedDate.
 */
(function (global) {
  "use strict";

  const CLOSING_DAYS = 7;
  const ROLLING_LISTING_DAYS = 45;
  const DAY_MS = 24 * 60 * 60 * 1000;

  function todayStart() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  }

  function parseIso(iso) {
    if (!iso || iso === "Rolling") return null;
    const date = new Date(`${iso}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date.getTime();
  }

  function toIsoDate(ts) {
    const d = new Date(ts);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function isRollingDeadline(job) {
    const d = job && job.applyDeadline;
    return !d || d === "Rolling";
  }

  /** Last calendar day the listing is open (inclusive). */
  function effectiveDeadlineIso(job) {
    if (!job) return null;
    if (!isRollingDeadline(job)) return job.applyDeadline || null;
    const postedTs = parseIso(job.postedDate);
    if (postedTs === null) return null;
    return toIsoDate(postedTs + ROLLING_LISTING_DAYS * DAY_MS);
  }

  function daysLeft(job) {
    const iso = isRollingDeadline(job) ? effectiveDeadlineIso(job) : job.applyDeadline;
    const ts = parseIso(iso);
    if (ts === null) return null;
    return Math.round((ts - todayStart()) / DAY_MS);
  }

  function deadlineStatus(job) {
    const left = daysLeft(job);
    if (left === null) return "open";
    if (left < 0) return "expired";
    if (left <= CLOSING_DAYS) return "closing";
    return "open";
  }

  function formatDate(iso, opts) {
    if (!iso || iso === "Rolling") return iso || "";
    const ts = parseIso(iso);
    if (ts === null) return iso;
    return new Date(ts).toLocaleDateString("en-IN", {
      day: "numeric",
      month: opts && opts.short ? "short" : "long",
      year: "numeric"
    });
  }

  function deadlineLabel(job, opts) {
    const left = daysLeft(job);
    const rolling = isRollingDeadline(job);
    if (left === null) {
      return rolling ? `Open listing (${ROLLING_LISTING_DAYS}-day window)` : "";
    }
    if (left < -1) return `Expired ${Math.abs(left)} days ago`;
    if (left === -1) return "Expired yesterday";
    if (left === 0) return "Last day to apply";
    if (left === 1) return "1 day left";
    if (left <= CLOSING_DAYS) return `${left} days left`;
    if (rolling) {
      const end = effectiveDeadlineIso(job);
      return `Open · closes ${formatDate(end, opts)}`;
    }
    return `Apply by ${formatDate(job.applyDeadline, opts)}`;
  }

  function isExpired(job) {
    return deadlineStatus(job) === "expired";
  }

  global.IPDJobDeadline = {
    CLOSING_DAYS,
    ROLLING_LISTING_DAYS,
    DAY_MS,
    todayStart,
    parseIso,
    toIsoDate,
    isRollingDeadline,
    effectiveDeadlineIso,
    daysLeft,
    deadlineStatus,
    deadlineLabel,
    formatDate,
    isExpired
  };
})(typeof window !== "undefined" ? window : globalThis);
