/**
 * Company profile page — /company/<slug>/
 * Aggregates about + vacancies from JOBS for one employer.
 */
(function () {
  if (window.__IPD_IS_COMPANY_ROUTE__ !== true) return;

  const root = document.getElementById("job-detail-root");
  if (!root) return;

  const DAY_MS = 24 * 60 * 60 * 1000;
  const EXP_LABELS = {
    fresher: "Fresher",
    experienced: "Experienced",
    both: "Fresher + Exp"
  };

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

  function companySlug(name) {
    return String(name || "")
      .trim()
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getCompanySlug() {
    const match = String(window.location.pathname || "").match(/\/company\/([^/]+)\/?$/i);
    if (match && match[1]) return decodeURIComponent(match[1]).toLowerCase();
    const params = new URLSearchParams(window.location.search);
    return companySlug(params.get("company") || params.get("id") || "");
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

  function formatDate(iso) {
    if (!iso || iso === "Rolling") return iso || "";
    const ts = parseIso(iso);
    if (ts === null) return iso;
    return new Date(ts).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  function jobPath(id) {
    return `/job/${encodeURIComponent(id)}`;
  }

  function companyPath(slug) {
    return `/company/${encodeURIComponent(slug)}/`;
  }

  function pickAbout(jobs) {
    const ranked = jobs.slice().sort((a, b) => {
      const aLen = String(a.companyDetails || a.companyBlurb || a.description || "").length;
      const bLen = String(b.companyDetails || b.companyBlurb || b.description || "").length;
      return bLen - aLen;
    });
    const best = ranked[0] || {};
    return {
      name: best.companyLegalName || best.company || "Company",
      blurb: best.companyBlurb || best.description || "",
      details: best.companyDetails || "",
      location: best.location || best.address || "",
      industry: best.industry || "",
      website: best.website || "",
      email: best.email || "",
      phone: best.phone || "",
      address: best.address || "",
      verified: jobs.some((j) => j.verified || j.infoparkVerified)
    };
  }

  function renderMissing() {
    document.title = "Company not found | InfoparkDaily";
    root.innerHTML = `
      <section class="job-missing glass">
        <p class="jobs-kicker">Company profile</p>
        <h1>Company not found</h1>
        <p>We don’t have a profile for this company yet — browse openings or try another employer.</p>
        <a class="btn btn-primary" href="/jobs/">Back to Job Openings</a>
        <a class="btn btn-secondary" href="/">Home</a>
      </section>
    `;
  }

  function vacancyCard(job) {
    const status = deadlineStatus(job);
    const expired = status === "expired";
    const closing = status === "closing";
    const role = (job.roles && job.roles[0]) || "Open role";
    const exp = job.experienceRange || job.experienceYears || EXP_LABELS[job.experience] || "";
    const deadline =
      job.applyDeadline === "Rolling"
        ? "Open / Rolling"
        : job.applyDeadline
          ? formatDate(job.applyDeadline)
          : "";
    const chips = [exp, job.employmentType, job.workMode, job.location].filter(Boolean);
    const statusLabel = expired ? "Expired" : closing ? "Closing soon" : "Open";

    return `
      <article class="company-vacancy-card glass${expired ? " is-expired" : ""}${closing ? " is-closing" : ""}">
        <div class="company-vacancy-accent" aria-hidden="true"></div>
        <div class="company-vacancy-main">
          <div class="company-vacancy-top">
            <span class="company-vacancy-status company-vacancy-status--${status}">${statusLabel}</span>
            ${deadline ? `<span class="company-vacancy-deadline">${expired ? "Closed" : "Apply by"} · ${escapeHtml(deadline)}</span>` : ""}
          </div>
          <h3><a href="${escapeAttr(jobPath(job.id))}">${escapeHtml(role)}</a></h3>
          ${
            chips.length
              ? `<ul class="company-vacancy-meta">${chips
                  .map((chip) => `<li>${escapeHtml(chip)}</li>`)
                  .join("")}</ul>`
              : ""
          }
        </div>
        <a class="btn ${expired ? "btn-secondary" : "btn-primary"} company-vacancy-cta" href="${escapeAttr(jobPath(job.id))}">
          ${expired ? "View listing" : "View details"}
        </a>
      </article>
    `;
  }

  function renderCompany(slug, jobs) {
    const about = pickAbout(jobs);
    const openJobs = jobs.filter((j) => deadlineStatus(j) !== "expired");
    const expiredJobs = jobs.filter((j) => deadlineStatus(j) === "expired");
    const mark = initials(about.name);
    const shareJobsUrl = `/jobs/?company=${encodeURIComponent(slug)}`;

    document.title = `${about.name} Jobs & Company Profile | InfoparkDaily`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        `${about.name} hiring in ${about.location || "Kerala"} — company overview and ${openJobs.length} open role${
          openJobs.length === 1 ? "" : "s"
        } on InfoparkDaily.`
      );
    }

    const aboutText = about.details || about.blurb || `${about.name} is hiring through InfoparkDaily.`;
    const website =
      about.website && /^https?:\/\//i.test(about.website)
        ? `<a class="btn btn-secondary" href="${escapeAttr(about.website)}" target="_blank" rel="noopener noreferrer"><span class="company-btn-full">Company website</span><span class="company-btn-short">Website</span> ↗</a>`
        : "";
    const email = about.email
      ? `<a class="btn btn-ghost company-hero-mail" href="mailto:${escapeAttr(about.email)}"><span class="company-btn-full">${escapeHtml(about.email)}</span><span class="company-btn-short">Email</span></a>`
      : "";
    const metaChips = [
      about.location ? `<li>${escapeHtml(about.location)}</li>` : "",
      about.industry ? `<li>${escapeHtml(about.industry)}</li>` : "",
      about.verified ? `<li class="is-verified">Verified listings</li>` : ""
    ]
      .filter(Boolean)
      .join("");

    root.innerHTML = `
      <section class="company-profile">
        <nav class="company-breadcrumb" aria-label="Breadcrumb">
          <a href="/jobs/">← Jobs</a>
          <span class="company-breadcrumb-sep" aria-hidden="true">/</span>
          <span class="company-breadcrumb-current">${escapeHtml(about.name)}</span>
        </nav>

        <header class="company-hero glass">
          <div class="company-hero-glow" aria-hidden="true"></div>
          <div class="company-hero-top">
            <div class="company-hero-identity">
              <div class="company-hero-mark" aria-hidden="true">${escapeHtml(mark)}</div>
              <div class="company-hero-titles">
                <p class="jobs-kicker">Company profile</p>
                <h1>${escapeHtml(about.name)}</h1>
              </div>
            </div>
            ${metaChips ? `<ul class="company-hero-chips">${metaChips}</ul>` : ""}
          </div>

          <div class="company-hero-stats" role="list">
            <div class="company-stat company-stat--open" role="listitem">
              <strong>${openJobs.length}</strong>
              <span>Open roles</span>
            </div>
            <div class="company-stat" role="listitem">
              <strong>${jobs.length}</strong>
              <span>Total listed</span>
            </div>
            <div class="company-stat company-stat--expired" role="listitem">
              <strong>${expiredJobs.length}</strong>
              <span>Expired</span>
            </div>
          </div>

          <div class="company-hero-actions">
            <a class="btn btn-primary" href="${escapeAttr(shareJobsUrl)}">
              <span class="company-btn-full">See jobs from this company</span>
              <span class="company-btn-short">Company jobs</span>
            </a>
            ${website}
            ${email}
          </div>
        </header>

        <section class="company-about glass">
          <div class="section-heading">
            <p class="eyebrow">About</p>
            <h2>Brief about the company</h2>
          </div>
          <p class="company-about-text">${escapeHtml(aboutText)}</p>
          ${
            about.address
              ? `<p class="company-about-address"><span>Address</span>${escapeHtml(about.address)}</p>`
              : ""
          }
          <p class="company-about-note">
            InfoparkDaily is not the employer. Verify openings on official channels before applying. Never pay for a job.
          </p>
        </section>

        <section class="company-vacancies" aria-labelledby="company-open-title">
          <div class="section-heading company-section-head">
            <div>
              <p class="eyebrow">Vacancies</p>
              <h2 id="company-open-title">Open roles</h2>
            </div>
            <span class="company-count-pill">${openJobs.length} open</span>
          </div>
          ${
            openJobs.length
              ? `<div class="company-vacancy-list">${openJobs.map(vacancyCard).join("")}</div>`
              : `<p class="company-empty glass">No open vacancies right now. Check back soon or <a href="/jobs/">browse all jobs</a>.</p>`
          }
        </section>

        ${
          expiredJobs.length
            ? `<section class="company-vacancies company-vacancies--expired" aria-labelledby="company-expired-title">
                <div class="section-heading company-section-head">
                  <div>
                    <p class="eyebrow">Archive</p>
                    <h2 id="company-expired-title">Recently expired</h2>
                  </div>
                  <span class="company-count-pill company-count-pill--muted">${expiredJobs.length} closed</span>
                </div>
                <div class="company-vacancy-list">${expiredJobs.map(vacancyCard).join("")}</div>
              </section>`
            : ""
        }
      </section>
    `;

    try {
      if (window.IPDAnalytics && typeof window.IPDAnalytics.trackCompanyView === "function") {
        window.IPDAnalytics.trackCompanyView(about.name, {
          company_slug: slug,
          open_roles: openJobs.length,
          total_listings: jobs.length
        });
      }
    } catch (_e) {
      /* ignore */
    }

    const clean = companyPath(slug).replace(/\/$/, "");
    if (window.location.pathname.replace(/\/$/, "") !== clean) {
      try {
        window.history.replaceState({}, "", companyPath(slug));
      } catch (_e2) {
        /* ignore */
      }
    }
  }

  if (typeof JOBS === "undefined") {
    document.title = "Couldn’t load company | InfoparkDaily";
    root.innerHTML = `
      <section class="job-missing glass">
        <h1>Couldn’t load company data</h1>
        <p>Please refresh the page.</p>
        <a class="btn btn-primary" href="/jobs/">View Jobs</a>
      </section>
    `;
    return;
  }

  const slug = getCompanySlug();
  if (!slug) {
    renderMissing();
    return;
  }

  const jobs = JOBS.filter((job) => companySlug(job.company) === slug);
  if (!jobs.length) {
    renderMissing();
    return;
  }

  renderCompany(slug, jobs);
})();
