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

  function vacancyCard(item, index) {
    const job = item.job;
    const role = item.role || "Open role";
    const status = deadlineStatus(job);
    const expired = status === "expired";
    const closing = status === "closing";
    const exp = job.experienceRange || job.experienceYears || EXP_LABELS[job.experience] || "";
    const deadline =
      job.applyDeadline === "Rolling"
        ? "Rolling"
        : job.applyDeadline
          ? formatDate(job.applyDeadline)
          : "";
    const meta = [exp, job.employmentType, job.workMode || job.location].filter(Boolean).slice(0, 3);
    const statusLabel = expired ? "Expired" : closing ? "Closing soon" : "Open";
    const href = jobPath(job.id);
    const idx = String((index || 0) + 1).padStart(2, "0");

    return `
      <a class="cp-role${expired ? " is-expired" : ""}${closing ? " is-closing" : ""}" href="${escapeAttr(href)}" style="--i:${index || 0}">
        <span class="cp-role-index" aria-hidden="true">${idx}</span>
        <div class="cp-role-body">
          <div class="cp-role-top">
            <span class="cp-role-status cp-role-status--${status}">${statusLabel}</span>
            ${deadline ? `<span class="cp-role-deadline">${expired ? "Closed" : "Apply by"} ${escapeHtml(deadline)}</span>` : ""}
          </div>
          <h3 class="cp-role-title">${escapeHtml(role)}</h3>
          ${meta.length ? `<p class="cp-role-meta">${meta.map((m) => escapeHtml(m)).join(" · ")}</p>` : ""}
        </div>
        <span class="cp-role-go">${expired ? "View" : "Details"}</span>
      </a>
    `;
  }

  function splitCompanyName(name) {
    const raw = String(name || "").trim();
    const parts = raw.split(/\s+[–—-]\s+/);
    if (parts.length >= 2) {
      return { primary: parts[0].trim(), secondary: parts.slice(1).join(" – ").trim() };
    }
    return { primary: raw, secondary: "" };
  }

  function renderCompany(slug, jobs, directory) {
    const about = pickAbout(jobs, directory);
    const openJobs = jobs.filter((j) => deadlineStatus(j) !== "expired");
    const expiredJobs = jobs.filter((j) => deadlineStatus(j) === "expired");
    const openRoles = expandRoleVacancies(openJobs);
    const expiredRoles = expandRoleVacancies(expiredJobs);
    const shareJobsUrl = `/jobs/?company=${encodeURIComponent(slug)}`;
    const parkKey =
      about.park === "Technopark" ? "technopark" : about.park === "Cyberpark" ? "cyberpark" : "infopark";
    const parkHome = `/companies/?park=${parkKey}`;

    document.title = `${about.name} | Company profile | InfoparkDaily`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        `${about.name}${about.park ? ` at ${about.park}` : ""} — company listing on InfoparkDaily. Confirm details on the official park or employer page.`
      );
    }

    const rawAbout = String(about.details || about.blurb || "").trim();
    const looksLikeJobBlurb =
      !rawAbout ||
      /^.{0,12}$/.test(rawAbout) ||
      (/·/.test(rawAbout) && rawAbout.length < 140) ||
      /role at|portal ·|official listing/i.test(rawAbout);
    const locationLine = [about.building, about.campus, about.location, about.park ? `${about.park}, Kerala` : ""]
      .filter(Boolean)
      .filter((v, i, arr) => arr.findIndex((x) => x.toLowerCase() === v.toLowerCase()) === i)
      .slice(0, 2)
      .join(" · ");
    const aboutText = looksLikeJobBlurb
      ? `${about.name} is listed${about.park ? ` at ${about.park}` : ""}${
          locationLine ? ` (${locationLine})` : ""
        }. ${
          openRoles.length
            ? `${openRoles.length} open role${openRoles.length === 1 ? "" : "s"} curated on InfoparkDaily.`
            : "Check the official park or employer page for current openings."
        }`
      : rawAbout;

    const siteLabel =
      about.website && /^https?:\/\//i.test(about.website)
        ? about.website.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "")
        : "";

    function contactLink(label, href) {
      if (!label || !href) return "";
      const external = href.startsWith("http");
      return `<a class="cp-contact" href="${escapeAttr(href)}"${
        external ? ' target="_blank" rel="noopener noreferrer"' : ""
      }>${escapeHtml(label)}</a>`;
    }

    const contactLinks = [
      siteLabel && about.website ? contactLink(siteLabel, about.website) : "",
      about.email ? contactLink(about.email, `mailto:${about.email}`) : "",
      about.phone ? contactLink(about.phone, `tel:${String(about.phone).replace(/[^\d+]/g, "")}`) : ""
    ].filter(Boolean);

    const parkLabel = about.park || "Company profile";
    const ledeParts = [
      openRoles.length ? `Hiring now · ${openRoles.length} open role${openRoles.length === 1 ? "" : "s"}` : "No open roles listed right now",
      locationLine || null
    ].filter(Boolean);
    const { primary: namePrimary, secondary: nameSecondary } = splitCompanyName(about.name);

    const facts = [
      { label: "Open roles", value: String(openRoles.length) },
      about.park ? { label: "Park", value: about.park } : null,
      locationLine ? { label: "Location", value: locationLine } : null,
      siteLabel && about.website
        ? {
            label: "Website",
            value: `<a href="${escapeAttr(about.website)}" target="_blank" rel="noopener noreferrer">${escapeHtml(siteLabel)}</a>`,
            html: true
          }
        : null,
      about.phone
        ? {
            label: "Phone",
            value: `<a href="tel:${escapeAttr(String(about.phone).replace(/[^\d+]/g, ""))}">${escapeHtml(about.phone)}</a>`,
            html: true
          }
        : null
    ].filter(Boolean);

    document.body.classList.add("company-route");

    root.innerHTML = `
      <article class="cp">
        <div class="cp-wrap">
          <nav class="cp-nav" aria-label="Breadcrumb">
            <a href="${escapeAttr(parkHome)}">← Companies</a>
            <span class="cp-nav-sep" aria-hidden="true">/</span>
            <a href="${escapeAttr(shareJobsUrl)}">Jobs from this company</a>
          </nav>
        </div>

        <header class="cp-stage">
          <div class="cp-stage-inner">
            <div class="cp-stage-copy">
              <p class="cp-kicker">${escapeHtml(parkLabel)}</p>
              <h1 class="cp-name">
                ${escapeHtml(namePrimary)}
                ${nameSecondary ? `<span class="cp-name-sub">${escapeHtml(nameSecondary)}</span>` : ""}
              </h1>
              <p class="cp-lede">${escapeHtml(ledeParts.join(" · "))}</p>
              <div class="cp-stage-actions">
                <a class="cp-btn cp-btn--primary" href="${openRoles.length ? "#cp-open-roles" : "/jobs/"}">${
                  openRoles.length ? "View open roles" : "Browse jobs"
                }</a>
                ${
                  about.officialUrl
                    ? `<a class="cp-btn cp-btn--ghost" href="${escapeAttr(about.officialUrl)}" target="_blank" rel="noopener noreferrer">Official listing</a>`
                    : `<a class="cp-btn cp-btn--ghost" href="${escapeAttr(shareJobsUrl)}">All company jobs</a>`
                }
              </div>
              ${
                contactLinks.length
                  ? `<div class="cp-contacts">${contactLinks.join("")}</div>`
                  : ""
              }
            </div>
            <aside class="cp-stage-aside" aria-label="Open roles count">
              <div class="cp-open-meter">
                <strong>${openRoles.length}</strong>
                <span>Open roles</span>
              </div>
            </aside>
          </div>
        </header>

        <div class="cp-body">
          <div class="cp-wrap">
            <div class="cp-story">
              <section class="cp-about" aria-labelledby="cp-about-title">
                <h2 id="cp-about-title">About the company</h2>
                <p class="cp-about-text">${escapeHtml(aboutText)}</p>
                ${about.address ? `<p class="cp-address">${escapeHtml(about.address)}</p>` : ""}
                <p class="cp-note">
                  InfoparkDaily is a directory, not the employer. Confirm openings on official channels before you apply. Never pay for a job.
                </p>
              </section>
              <aside class="cp-facts" aria-label="Company facts">
                ${facts
                  .map(
                    (f) => `<div class="cp-fact">
                      <span class="cp-fact-label">${escapeHtml(f.label)}</span>
                      <div class="cp-fact-value">${f.html ? f.value : escapeHtml(f.value)}</div>
                    </div>`
                  )
                  .join("")}
              </aside>
            </div>

            <section class="cp-roles" id="cp-open-roles" aria-labelledby="cp-open-title">
              <div class="cp-roles-head">
                <h2 id="cp-open-title">Open roles</h2>
                <span class="cp-count">${openRoles.length}</span>
              </div>
              ${
                openRoles.length
                  ? `<div class="cp-role-list">${openRoles.map((item, i) => vacancyCard(item, i)).join("")}</div>`
                  : `<p class="cp-empty">No open vacancies here right now. Check the official park or employer page, or <a href="/jobs/">browse all jobs</a>.</p>`
              }
            </section>

            ${
              expiredRoles.length
                ? `<section class="cp-roles cp-roles--archive" aria-labelledby="cp-expired-title">
                    <div class="cp-roles-head">
                      <h2 id="cp-expired-title">Recently closed</h2>
                      <span class="cp-count cp-count--muted">${expiredRoles.length}</span>
                    </div>
                    <div class="cp-role-list">${expiredRoles.map((item, i) => vacancyCard(item, i)).join("")}</div>
                  </section>`
                : ""
            }
          </div>
        </div>
      </article>
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
