/* "Walk-in drives this week" alert strip.
 * Renders into any element with id="walkin-alert" on a page that loads the JOBS list (/data/jobs-index.js).
 * Shows walk-ins whose date (walkInDate / walkinDates) falls between today and the next 7 days, soonest first,
 * so the latest drives stand out on the home page and the job boards. */
(function () {
  "use strict";

  const root = document.getElementById("walkin-alert");
  if (!root || typeof JOBS === "undefined") return;

  const WINDOW_DAYS = 7;
  const MAX_CARDS = 10;
  const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11 };
  const DAY_MS = 86400000;

  const esc = (v) =>
    String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  function startOfToday() {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  }

  /* First walk-in day as a local midnight timestamp: "2026-11-21", "21 November 2026", "21–26 September 2026". */
  function walkInDay(job) {
    const text = String(job.walkInDate || job.walkinDates || "").trim();
    if (!text) return null;
    let m = text.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3]).getTime();
    m = text.match(/(\d{1,2})(?:st|nd|rd|th)?(?:\s*[–-]\s*\d{1,2}(?:st|nd|rd|th)?)?\s+([A-Za-z]{3,9})\.?,?\s+(\d{4})/);
    if (!m) return null;
    const name = m[2].toLowerCase();
    const month = MONTHS[name.slice(0, 4)] ?? MONTHS[name.slice(0, 3)];
    return month === undefined ? null : new Date(+m[3], month, +m[1]).getTime();
  }

  const today = startOfToday();
  const upcoming = JOBS.filter((job) => job && (job.isWalkIn || job.walkin))
    .map((job) => ({ job, day: walkInDay(job) }))
    .filter((row) => row.day !== null && row.day >= today && row.day <= today + WINDOW_DAYS * DAY_MS)
    .sort((a, b) => a.day - b.day || String(a.job.walkinTime || "").localeCompare(String(b.job.walkinTime || "")));

  if (!upcoming.length) return;

  function dayLabel(day) {
    const diff = Math.round((day - today) / DAY_MS);
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return new Date(day).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  }

  const href = (job) => `/job/${encodeURIComponent(String(job.id || "").toLowerCase())}`;
  const cards = upcoming.slice(0, MAX_CARDS).map(({ job, day }) => {
    const soon = Math.round((day - today) / DAY_MS) <= 1;
    const role = (job.roles || [])[0] || "Walk-in interview";
    const venue = job.walkinLocation || job.location || "";
    return `
      <a class="wia-card${soon ? " wia-card--soon" : ""}" href="${esc(href(job))}">
        <span class="wia-when">${esc(dayLabel(day))}${job.walkinTime ? ` · ${esc(job.walkinTime)}` : ""}</span>
        <strong class="wia-company">${esc(job.company || "")}</strong>
        <span class="wia-role">${esc(role)}</span>
        ${venue ? `<span class="wia-venue">📍 ${esc(venue)}</span>` : ""}
      </a>`;
  });

  if (!document.getElementById("wia-style")) {
    const style = document.createElement("style");
    style.id = "wia-style";
    style.textContent = `
      .wia { margin: 0 0 18px; padding: 14px 14px 12px; border: 1px solid var(--accent, #ffc107); border-radius: 14px;
        background: var(--accent-soft, rgba(255,193,7,.14)); }
      .wia-head { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; margin-bottom: 10px; }
      .wia-title { margin: 0; font-size: 1rem; font-weight: 700; display: flex; align-items: center; gap: 8px; }
      .wia-dot { width: 10px; height: 10px; border-radius: 50%; background: #e5484d; box-shadow: 0 0 0 0 rgba(229,72,77,.6);
        animation: wia-pulse 1.6s infinite; flex: none; }
      @keyframes wia-pulse { 0% { box-shadow: 0 0 0 0 rgba(229,72,77,.55); } 70% { box-shadow: 0 0 0 9px rgba(229,72,77,0); } 100% { box-shadow: 0 0 0 0 rgba(229,72,77,0); } }
      @media (prefers-reduced-motion: reduce) { .wia-dot { animation: none; } }
      .wia-all { margin-left: auto; font-size: .85rem; font-weight: 600; color: inherit; text-decoration: underline; }
      .wia-track { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 4px; scroll-snap-type: x mandatory; }
      .wia-card { flex: 0 0 min(240px, 78vw); scroll-snap-align: start; display: flex; flex-direction: column; gap: 3px;
        padding: 10px 12px; border-radius: 10px; color: inherit; text-decoration: none;
        background: rgba(127,127,127,.10); border: 1px solid rgba(127,127,127,.22); }
      .wia-card:hover, .wia-card:focus-visible { border-color: var(--accent, #ffc107); }
      .wia-card--soon { border-color: #e5484d; }
      .wia-when { font-size: .78rem; font-weight: 700; text-transform: uppercase; letter-spacing: .02em; color: #e5484d; }
      .wia-company { font-size: .95rem; line-height: 1.25; }
      .wia-role, .wia-venue { font-size: .82rem; opacity: .85; line-height: 1.3; overflow: hidden; text-overflow: ellipsis;
        display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }`;
    document.head.appendChild(style);
  }

  root.className = "wia";
  root.setAttribute("aria-label", "Walk-in drives this week");
  root.innerHTML = `
    <div class="wia-head">
      <p class="wia-title"><span class="wia-dot" aria-hidden="true"></span>Walk-in drives this week (${upcoming.length})</p>
      <a class="wia-all" href="/jobs/today/?view=walkins">See all walk-ins</a>
    </div>
    <div class="wia-track">${cards.join("")}</div>`;
  root.hidden = false;
})();
