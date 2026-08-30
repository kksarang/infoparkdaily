/**
 * Company profile page — /company/<slug>/
 * Aggregates official park directory fields plus vacancies from JOBS.
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

  function isParkPortalUrl(url) {
    if (!url || !/^https?:\/\//i.test(url)) return true;
    try {
      const host = new URL(url).hostname.replace(/^www\./i, "").toLowerCase();
      if (
        host === "infopark.in" ||
        host === "technopark.in" ||
        host === "cyberparks.in" ||
        host === "ulcyberpark.com"
      ) {
        return true;
      }
    } catch (_error) {
      return true;
    }
    return /companies-job|\/job-search|paginated-jobs/i.test(url);
  }

  // Official employer sites — used when job rows only have a park portal URL.
  const COMPANY_WEBSITES = {
    "aabasoft-technologies-india-private-limited": "https://www.aabasoft.com",
    "alphasky-ventures-pvt-ltd": "https://www.alphasky.in",
    "apro-it-solutions-pvt-ltd": "https://www.aproit.com",
    "armia-systems": "https://www.armia.com",
    "armia-systems-pvt-ltd": "https://www.armia.com",
    "aspire-systems": "https://www.aspiresys.com",
    "aspire-systems-digital-private-limited": "https://www.aspiresys.com",
    "aventus-informatics": "https://www.aventusinformatics.com",
    "cascade-revenue-management-pvt-ltd": "https://www.cascaderevenue.com",
    "cubet-techno-labs-pvt-ltd": "https://cubettech.com",
    "difinity-digital": "https://www.difinitydigital.com",
    "empress-infotech": "https://www.empressinfotech.com",
    "eqsoft-business-solutions-pvt-ltd": "https://www.eqsoft.com",
    "eurolink-technologies": "https://eurolinktechnologies.com/",
    "experion-technologies": "https://www.experionglobal.com",
    "fdc-web-technologies-pvt-ltd": "https://www.fdcwebtech.com",
    "feathersoft-info-solutions-private-ltd": "https://www.feathersoft.com",
    "fingent-global-solutions": "https://www.fingent.com",
    "flycatch-infotech-pvt-ltd": "https://www.flycatchtech.com",
    "global-surf-it-pvt-ltd": "https://www.globalsurfit.com",
    "icodebees-private-limited": "https://www.icodebees.com",
    "idatalytics-pvt-ltd": "https://www.idatalytics.com",
    "inspite-technologies": "https://www.inspitetech.com",
    "jachoos-technologies-private-limited": "https://www.jachoos.com",
    "lucidplus-infotech-pvt-ltd": "https://www.lucidplus.com",
    "mcfadyen-digital": "https://www.mcfadyen.com",
    "ndimensionz-solutions-pvt-ltd": "https://www.ndimensionz.com",
    "nesa-software-pvt-ltd": "https://nesasoftware.com",
    "pcs-india-private-limited": "https://www.pcs-india.com",
    "roberts-design-services": "https://www.robertsdesignservices.com",
    "seguro-technologies": "https://www.seguro.in",
    "simelabs": "https://www.simelabs.com",
    "simelabs-an-astek-company": "https://www.simelabs.com",
    "ss-consulting": "https://ssconsulting.co.in",
    "sutherland": "https://www.sutherlandglobal.com/",
    "techware-lab-pvt-ltd": "https://www.techwarelab.com",
    "thomsun-infocare-llp": "https://www.thomsuninfocare.com",
    "touchworld-technology-llc": "https://touchworldtechnology.com/",
    "urolime": "https://www.urolime.com",
    "virtual-sys-technologies": "https://www.virtualsys.in",
    "webdura-technologies": "https://www.webduratech.com",
    "white-rabbit-group": "https://www.whiterabbit.group",
    "ynot-infosolutions": "https://www.ynotinfo.com"
  };

  function lookupCompanyWebsite(name) {
    const slug = companySlug(name);
    if (COMPANY_WEBSITES[slug]) return COMPANY_WEBSITES[slug];
    const parts = slug.split("-");
    for (let i = parts.length; i >= 2; i -= 1) {
      const cand = parts.slice(0, i).join("-");
      if (COMPANY_WEBSITES[cand]) return COMPANY_WEBSITES[cand];
    }
    return "";
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

  function allDirectoryCompanies() {
    const bags = [];
    if (typeof INFOPARK_COMPANIES !== "undefined") bags.push(INFOPARK_COMPANIES);
    if (typeof TECHNOPARK_COMPANIES !== "undefined") bags.push(TECHNOPARK_COMPANIES);
    if (typeof CYBERPARK_COMPANIES !== "undefined") bags.push(CYBERPARK_COMPANIES);
    return bags.flat().filter(Boolean);
  }

  function findDirectory(slug) {
    const list = allDirectoryCompanies();
    return (
      list.find((c) => c.slug === slug) ||
      list.find((c) => companySlug(c.name) === slug) ||
      null
    );
  }

  function pickAbout(jobs, directory) {
    const ranked = jobs.slice().sort((a, b) => {
      const aLen = String(a.companyDetails || a.companyBlurb || a.description || "").length;
      const bLen = String(b.companyDetails || b.companyBlurb || b.description || "").length;
      return bLen - aLen;
    });
    const best = ranked[0] || {};
    const name = (directory && directory.name) || best.companyLegalName || best.company || "Company";

    let website = "";
    if (directory && directory.website && /^https?:\/\//i.test(directory.website)) {
      website = directory.website;
    } else if (!directory) {
      for (const job of ranked) {
        if (job.website && !isParkPortalUrl(job.website)) {
          website = job.website;
          break;
        }
      }
      if (!website) website = lookupCompanyWebsite(name);
    }

    const dirEmail = directory && directory.email ? directory.email : "";
    const dirPhone = directory && directory.phone ? directory.phone : "";
    const dirAddress = directory && directory.address ? directory.address : "";
    const dirIndustry = directory && directory.domains && directory.domains.length ? directory.domains[0] : "";

    return {
      name,
      blurb: best.companyBlurb || "",
      details: best.companyDetails || "",
      location: (directory && (directory.building || directory.campus)) || best.location || best.address || "",
      industry: dirIndustry || best.industry || "",
      website,
      email: dirEmail || (!directory ? best.email || "" : ""),
      phone: dirPhone || (!directory ? best.phone || "" : ""),
      address: dirAddress || (!directory ? best.address || "" : ""),
      building: (directory && directory.building) || "",
      campus: (directory && directory.campus) || "",
      park: (directory && directory.park) || "",
      logo: (directory && directory.logo) || "",
      officialUrl: (directory && directory.officialUrl) || "",
      jobsUrl: (directory && directory.jobsUrl) || "",
      contactPerson: (directory && directory.contactPerson) || "",
      designation: (directory && directory.designation) || "",
      domains: (directory && directory.domains) || [],
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

  /** Expand each job posting into one card per role (a company can hire for many roles in one post). */
  function expandRoleVacancies(jobList) {
    const items = [];
    (jobList || []).forEach((job) => {
      const roles = (job.roles || []).map((r) => String(r || "").trim()).filter(Boolean);
      if (!roles.length) {
        items.push({ job, role: "Open role" });
        return;
      }
      roles.forEach((role) => items.push({ job, role }));
    });
    return items;
  }

  function vacancyCard(item) {
    const job = item.job;
    const role = item.role || "Open role";
    const status = deadlineStatus(job);
    const expired = status === "expired";
    const closing = status === "closing";
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

  function renderCompany(slug, jobs, directory) {
    const about = pickAbout(jobs, directory);
    const openJobs = jobs.filter((j) => deadlineStatus(j) !== "expired");
    const expiredJobs = jobs.filter((j) => deadlineStatus(j) === "expired");
    const openRoles = expandRoleVacancies(openJobs);
    const expiredRoles = expandRoleVacancies(expiredJobs);
    const mark = initials(about.name);
    const shareJobsUrl = `/jobs/?company=${encodeURIComponent(slug)}`;
    const parkHome =
      about.park === "Technopark"
        ? "/technopark-jobs/"
        : about.park === "Cyberpark"
          ? "/cyberpark-jobs/"
          : "/infopark-jobs/";

    document.title = `${about.name} | Company profile | InfoparkDaily`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        `${about.name}${about.park ? ` at ${about.park}` : ""} — company listing on InfoparkDaily. Confirm details on the official park or employer page.`
      );
    }

    const aboutText = about.details || about.blurb || "";
    const jobsHref = about.jobsUrl || shareJobsUrl;
    const jobsExternal = /^https?:\/\//i.test(about.jobsUrl || "");
    const siteLabel =
      about.website && /^https?:\/\//i.test(about.website) ? about.website.replace(/^https?:\/\/(www\.)?/i, "") : "";
    const markHtml = about.logo
      ? `<div class="company-dir-logo"><img src="${escapeAttr(about.logo)}" alt="" width="120" height="120" /></div>`
      : `<div class="company-dir-logo company-dir-logo--mark" aria-hidden="true">${escapeHtml(mark)}</div>`;

    const line = (value, href, extraClass) => {
      const body = value
        ? href
          ? `<a href="${escapeAttr(href)}"${href.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : ""}>${escapeHtml(
              value
            )}</a>`
          : escapeHtml(value)
        : "&nbsp;";
      return `<p class="company-dir-line${value ? "" : " is-empty"}${extraClass ? ` ${extraClass}` : ""}">${body}</p>`;
    };
    const domainPills = (about.domains || [])
      .filter(Boolean)
      .map((d) => `<span class="job-badge job-badge--both">${escapeHtml(d)}</span>`)
      .join("");

    root.innerHTML = `
      <section class="company-profile">
        <nav class="company-breadcrumb" aria-label="Breadcrumb">
          <a class="company-back" href="${escapeAttr(parkHome + "#companies")}">← Back</a>
        </nav>

        <header class="company-dir-sheet">
          ${markHtml}
          <div class="company-dir-copy">
            <p class="jobs-kicker">${escapeHtml(about.park || "Company profile")}</p>
            <h1>${escapeHtml(about.name)}</h1>
            ${line(about.address, "", "company-dir-address")}
            ${line(about.email, about.email ? `mailto:${about.email}` : "")}
            ${line(about.phone, about.phone ? `tel:${String(about.phone).replace(/[^\d+]/g, "")}` : "")}
            ${line(siteLabel, about.website, "company-dir-web")}
            ${domainPills ? `<div class="job-card-tags company-dir-domains">${domainPills}</div>` : ""}
          </div>
          <div class="company-dir-cta">
            <a class="btn btn-primary" href="${escapeAttr(jobsHref)}"${
              jobsExternal ? ' target="_blank" rel="noopener noreferrer"' : ""
            }>Job Openings</a>
            ${
              about.officialUrl
                ? `<a class="btn btn-secondary" href="${escapeAttr(about.officialUrl)}" target="_blank" rel="noopener noreferrer">Official listing</a>`
                : ""
            }
          </div>
        </header>

        <section class="company-about glass">
          <div class="section-heading">
            <p class="eyebrow">About</p>
            <h2>Company listing</h2>
          </div>
          ${aboutText ? `<p class="company-about-text">${escapeHtml(aboutText)}</p>` : `<p class="company-about-text is-empty">&nbsp;</p>`}
          <p class="company-about-note">
            InfoparkDaily is not the employer and not the park authority. Blank fields were not published on the official directory. Verify openings on official channels before applying. Never pay for a job.
          </p>
        </section>

        <section class="company-vacancies" aria-labelledby="company-open-title">
          <div class="section-heading company-section-head">
            <div>
              <p class="eyebrow">Vacancies</p>
              <h2 id="company-open-title">Open roles</h2>
            </div>
            <span class="company-count-pill">${openRoles.length} open</span>
          </div>
          ${
            openRoles.length
              ? `<div class="company-vacancy-list">${openRoles.map(vacancyCard).join("")}</div>`
              : `<p class="company-empty glass">No open vacancies listed here. Check the official park or employer page, or <a href="/jobs/">browse all jobs</a>.</p>`
          }
        </section>

        ${
          expiredRoles.length
            ? `<section class="company-vacancies company-vacancies--expired" aria-labelledby="company-expired-title">
                <div class="section-heading company-section-head">
                  <div>
                    <p class="eyebrow">Archive</p>
                    <h2 id="company-expired-title">Recently expired</h2>
                  </div>
                  <span class="company-count-pill company-count-pill--muted">${expiredRoles.length} closed</span>
                </div>
                <div class="company-vacancy-list">${expiredRoles.map(vacancyCard).join("")}</div>
              </section>`
            : ""
        }
      </section>
    `;

    try {
      if (window.IPDAnalytics && typeof window.IPDAnalytics.trackCompanyView === "function") {
        window.IPDAnalytics.trackCompanyView(about.name, {
          company_slug: slug,
          open_roles: openRoles.length,
          total_listings: jobs.length,
          total_roles: openRoles.length + expiredRoles.length
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

  const slug = getCompanySlug();
  if (!slug) {
    renderMissing();
    return;
  }

  const jobs = typeof JOBS !== "undefined" ? JOBS.filter((job) => companySlug(job.company) === slug) : [];
  const directory = findDirectory(slug);
  if (!directory && !jobs.length) {
    renderMissing();
    return;
  }

  renderCompany(slug, jobs, directory);
})();
