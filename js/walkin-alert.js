/* "Walk-in drives this week" alert strip.
 * Renders into any element with id="walkin-alert" on a page that loads the JOBS list (/data/jobs-index.js).
 * Shows walk-ins whose date (walkInDate / walkinDates) falls between today and the next 7 days, soonest first,
 * so the latest drives stand out on the job boards. */
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
  const ICON_CLOCK =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  const ICON_PIN =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>';

  const cards = upcoming.slice(0, MAX_CARDS).map(({ job, day }) => {
    const diff = Math.round((day - today) / DAY_MS);
    const date = new Date(day);
    const role = (job.roles || [])[0] || "Walk-in interview";
    const venue = job.walkinLocation || job.location || "";
    const tag = diff === 0 ? "Today" : diff === 1 ? "Tomorrow" : date.toLocaleDateString("en-IN", { weekday: "short" });
    return `
      <a class="wia-card${diff === 0 ? " is-today" : diff === 1 ? " is-tomorrow" : ""}" href="${esc(href(job))}">
        <span class="wia-date" aria-label="${esc(dayLabel(day))}">
          <span class="wia-date-day">${date.getDate()}</span>
          <span class="wia-date-mon">${esc(date.toLocaleDateString("en-IN", { month: "short" }))}</span>
        </span>
        <span class="wia-body">
          <span class="wia-tag">${esc(tag)}</span>
          <strong class="wia-company" title="${esc(job.company || "")}">${esc(job.company || "")}</strong>
          <span class="wia-role" title="${esc(role)}">${esc(role)}</span>
          <span class="wia-meta">
            ${job.walkinTime ? `<span class="wia-meta-row">${ICON_CLOCK}${esc(job.walkinTime)}</span>` : ""}
            ${venue ? `<span class="wia-meta-row" title="${esc(venue)}">${ICON_PIN}<span class="wia-ellip">${esc(venue)}</span></span>` : ""}
          </span>
        </span>
      </a>`;
  });

  if (!document.getElementById("wia-style")) {
    const style = document.createElement("style");
    style.id = "wia-style";
    style.textContent = `
      .wia { --wia-red: #f05252; margin: 0 0 20px; padding: 16px 0 14px; border: 1px solid var(--line, rgba(127,127,127,.2));
        border-radius: var(--radius-sm, 14px); background: var(--surface, transparent); position: relative; }
      .wia-head { display: flex; align-items: center; gap: 10px; padding: 0 16px; margin-bottom: 12px; }
      .wia-title { margin: 0; font-family: var(--display, inherit); font-size: 1.02rem; font-weight: 700;
        display: flex; align-items: center; gap: 10px; color: var(--text, inherit); }
      .wia-live { display: inline-flex; align-items: center; gap: 6px; padding: 3px 8px; border-radius: 999px;
        font-size: .68rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase;
        color: var(--wia-red); background: rgba(240,82,82,.12); }
      .wia-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--wia-red); animation: wia-pulse 1.6s infinite; }
      @keyframes wia-pulse { 0% { box-shadow: 0 0 0 0 rgba(240,82,82,.55); } 70% { box-shadow: 0 0 0 7px rgba(240,82,82,0); } 100% { box-shadow: 0 0 0 0 rgba(240,82,82,0); } }
      @media (prefers-reduced-motion: reduce) { .wia-dot { animation: none; } .wia-track { scroll-behavior: auto; } }
      .wia-count { font-size: .8rem; font-weight: 600; color: var(--muted, inherit); }
      .wia-tools { margin-left: auto; display: flex; align-items: center; gap: 6px; }
      .wia-nav { width: 30px; height: 30px; display: grid; place-items: center; border-radius: 50%; cursor: pointer;
        border: 1px solid var(--line-strong, rgba(127,127,127,.3)); background: transparent; color: var(--text, inherit); }
      .wia-nav:hover:not(:disabled) { border-color: var(--accent, #ffc107); color: var(--accent, #ffc107); }
      .wia-nav:disabled { opacity: .35; cursor: default; }
      .wia-nav svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
      .wia-all { font-size: .82rem; font-weight: 700; color: var(--accent-strong, #b58500); text-decoration: none;
        white-space: nowrap; padding: 6px 10px; border-radius: 999px; }
      html.theme-light .wia-all, body.light .wia-all { color: #a16c00; }
      .wia-all:hover { background: var(--accent-soft, rgba(255,193,7,.14)); }
      .wia-track { display: flex; gap: 12px; overflow-x: auto; padding: 2px 16px 4px; scroll-padding: 0 16px;
        scroll-snap-type: x mandatory; scroll-behavior: smooth; scrollbar-width: none; }
      .wia-track::-webkit-scrollbar { display: none; }
      .wia-card { flex: 0 0 min(272px, 80vw); scroll-snap-align: start; display: flex; gap: 12px; padding: 12px;
        border-radius: 12px; color: var(--text, inherit); text-decoration: none; background: var(--bg-elev, transparent);
        border: 1px solid var(--line, rgba(127,127,127,.22)); transition: border-color .15s, transform .15s, box-shadow .15s; }
      .wia-card:hover, .wia-card:focus-visible { border-color: var(--accent, #ffc107); transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0,0,0,.12); outline: none; }
      .wia-date { flex: none; width: 50px; height: 56px; border-radius: 10px; display: flex; flex-direction: column;
        align-items: center; justify-content: center; background: var(--accent-soft, rgba(255,193,7,.14)); line-height: 1; }
      .wia-date-day { font-family: var(--display, inherit); font-size: 1.35rem; font-weight: 800; color: var(--text, inherit); }
      .wia-date-mon { margin-top: 4px; font-size: .66rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--muted, inherit); }
      .is-today .wia-date { background: var(--wia-red); }
      .is-today .wia-date-day, .is-today .wia-date-mon { color: #fff; }
      .wia-body { min-width: 0; flex: 1; display: flex; flex-direction: column; gap: 2px; }
      .wia-tag { align-self: flex-start; font-size: .66rem; font-weight: 800; letter-spacing: .07em; text-transform: uppercase; color: var(--muted, inherit); }
      .is-today .wia-tag { color: var(--wia-red); }
      .is-tomorrow .wia-tag { color: #d97706; }
      .wia-company { font-size: .93rem; font-weight: 700; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .wia-role { font-size: .82rem; line-height: 1.35; color: var(--muted, inherit); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .wia-meta { margin-top: 6px; display: flex; flex-direction: column; gap: 3px; }
      .wia-meta-row { display: flex; align-items: center; gap: 6px; min-width: 0; font-size: .76rem; color: var(--muted, inherit); }
      .wia-meta-row svg { flex: none; width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
      .wia-ellip { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      @media (max-width: 640px) { .wia-nav { display: none; } .wia-head { flex-wrap: wrap; } }`;
    document.head.appendChild(style);
  }

  const chevron = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
  root.className = "wia";
  root.setAttribute("aria-label", "Walk-in drives this week");
  root.innerHTML = `
    <div class="wia-head">
      <p class="wia-title"><span class="wia-live"><span class="wia-dot" aria-hidden="true"></span>Live</span>Walk-ins this week</p>
      <span class="wia-count">${upcoming.length} drive${upcoming.length === 1 ? "" : "s"}</span>
      <div class="wia-tools">
        <button type="button" class="wia-nav" data-dir="-1" aria-label="Previous walk-ins">${chevron("M15 6l-6 6 6 6")}</button>
        <button type="button" class="wia-nav" data-dir="1" aria-label="More walk-ins">${chevron("M9 6l6 6-6 6")}</button>
        <a class="wia-all" href="/jobs/today/?view=walkins">See all →</a>
      </div>
    </div>
    <div class="wia-track">${cards.join("")}</div>`;
  root.hidden = false;

  const track = root.querySelector(".wia-track");
  const [prev, next] = root.querySelectorAll(".wia-nav");
  const sync = () => {
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  };
  root.querySelectorAll(".wia-nav").forEach((btn) =>
    btn.addEventListener("click", () => track.scrollBy({ left: +btn.dataset.dir * track.clientWidth * 0.85 }))
  );
  track.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);
  sync();
})();
