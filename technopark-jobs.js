(function () {
  const fresherGrid = document.getElementById("tp-fresher-grid");
  const experiencedGrid = document.getElementById("tp-experienced-grid");
  const countEl = document.getElementById("tp-count");
  const noteEl = document.getElementById("tp-verify-note");
  if (!fresherGrid || !experiencedGrid || typeof TECHNOPARK_VERIFIED_JOBS === "undefined") return;

  const JOBS = TECHNOPARK_VERIFIED_JOBS.slice();
  const DAY_MS = 24 * 60 * 60 * 1000;

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/'/g, "&#39;");
  }

  function initials(name) {
    const skip = new Set([
      "ltd",
      "pvt",
      "private",
      "limited",
      "llc",
      "inc",
      "opc",
      "p",
      "the",
      "and",
      "of",
      "india",
      "technologies",
      "technology",
      "solutions",
      "systems",
      "software",
      "services"
    ]);
    const parts = String(name || "?")
      .replace(/[().,&/]/g, " ")
      .split(/\s+/)
      .filter(Boolean)
      .filter((part) => !skip.has(part.toLowerCase()) && !/^\d+$/.test(part));
    if (!parts.length) return "?";
    if (parts.length === 1) {
      return parts[0].replace(/[^a-zA-Z0-9]/g, "").slice(0, 4).toUpperCase() || "?";
    }
    return parts
      .slice(0, 4)
      .map((part) => part[0].toUpperCase())
      .join("");
  }

  function parseIso(iso) {
    if (!iso || iso === "Rolling") return null;
    const date = new Date(`${iso}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date.getTime();
  }

  function formatDate(iso) {
    const ts = parseIso(iso);
    if (ts === null) return iso || "";
    return new Date(ts).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  function todayStart() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  }

  function daysLeft(job) {
    const ts = parseIso(job.applyDeadline);
    if (ts === null) return null;
    return Math.round((ts - todayStart()) / DAY_MS);
  }

  function deadlineStatus(job) {
    const left = daysLeft(job);
    if (left === null) return "open";
    if (left < 0) return "expired";
    if (left <= 7) return "closing";
    return "open";
  }

  function deadlineLabel(job) {
    const left = daysLeft(job);
    if (left === null) return "";
    if (left < 0) return "Closed";
    if (left === 0) return "Closes today";
    if (left === 1) return "1 day left";
    if (left <= 7) return `${left} days left`;
    return `Apply by ${formatDate(job.applyDeadline)}`;
  }

  function jobHref(job) {
    return `/job/${encodeURIComponent(job.id || "")}`;
  }

  function renderCard(job) {
    const status = deadlineStatus(job);
    const expired = status === "expired";
    const mark = initials(job.company);
    const exp = job.experience || "both";
    const expLabel =
      exp === "fresher" ? "Fresher / Trainee" : exp === "experienced" ? "Experienced" : "Fresher + Exp";
    const role = (job.roles || [])[0] || "Open role";

    return `
      <article class="job-card${expired ? " job-card--expired" : ""}${
        status === "closing" ? " job-card--closing" : ""
      }">
        <div class="job-card-accent" aria-hidden="true"></div>
        <header class="job-card-head">
          <div class="job-logo-wrap job-logo-wrap--text" data-initials="${escapeAttr(mark)}" aria-hidden="true">
            <span class="job-logo-fallback">${escapeHtml(mark)}</span>
          </div>
          <div class="job-card-meta">
            <h3>${escapeHtml(job.company)}</h3>
            <p class="job-location">${escapeHtml(job.location || "")}</p>
          </div>
          ${
            deadlineLabel(job)
              ? `<span class="job-deadline-pill job-deadline-pill--${status}">${escapeHtml(
                  deadlineLabel(job)
                )}</span>`
              : ""
          }
        </header>
        <div class="job-card-tags">
          ${expired ? `<span class="job-badge job-badge--expired">EXPIRED</span>` : ""}
          <span class="job-badge job-badge--verified">Verified</span>
          <span class="job-badge job-badge--${escapeAttr(exp)}">${escapeHtml(expLabel)}</span>
          ${
            status === "closing" && !expired
              ? `<span class="job-badge job-badge--closing">Closing soon</span>`
              : ""
          }
        </div>
        <div class="job-fact-row">
          <span class="job-fact"><span class="job-fact-label">Exp</span><span class="job-fact-value">${escapeHtml(
            job.experienceRange || expLabel
          )}</span></span>
          <span class="job-fact"><span class="job-fact-label">Posted</span><span class="job-fact-value">${escapeHtml(
            formatDate(job.postedDate)
          )}</span></span>
          <span class="job-fact"><span class="job-fact-label">Deadline</span><span class="job-fact-value">${escapeHtml(
            formatDate(job.applyDeadline)
          )}</span></span>
        </div>
        <div class="job-card-body">
          <p class="job-roles-label">Open role</p>
          <ul class="job-roles"><li>${escapeHtml(role)}</li></ul>
          ${job.companyBlurb ? `<p class="job-desc">${escapeHtml(job.companyBlurb)}</p>` : ""}
        </div>
        <div class="job-tag-row">
          <span class="job-tag-pill">TECHNOPARK</span>
          ${(job.tags || [])
            .slice(0, 2)
            .map((tag) => `<span class="job-tag-pill">${escapeHtml(tag)}</span>`)
            .join("")}
        </div>
        <footer class="job-card-foot">
          <div class="job-meta-row"><span class="job-source">Technopark</span></div>
          <a class="btn ${expired ? "btn-secondary" : "btn-primary"} job-details-btn" href="${escapeAttr(
            jobHref(job)
          )}">
            ${expired ? "View listing" : "View Details"}
          </a>
        </footer>
      </article>
    `;
  }

  const fresher = JOBS.filter((job) => job.experience === "fresher" || job.experience === "both");
  const experienced = JOBS.filter((job) => job.experience === "experienced");

  fresherGrid.innerHTML = fresher.map(renderCard).join("") || `<p class="jobs-empty">No open fresher/trainee listings in this verified set.</p>`;
  experiencedGrid.innerHTML =
    experienced.map(renderCard).join("") ||
    `<p class="jobs-empty">No open experienced listings in this verified set.</p>`;

  if (countEl) countEl.textContent = String(JOBS.length);
})();
