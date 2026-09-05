(function () {
  const root = document.getElementById("job-detail-root");
  if (!root) return;
  if (window.__IPD_IS_COMPANY_ROUTE__ === true) return;

  const EXP_LABELS = {
    fresher: "Fresher",
    experienced: "Experienced",
    both: "Fresher + Exp"
  };

  const CLOSING_DAYS = 7;
  const DAY_MS = 24 * 60 * 60 * 1000;
  const MASS_HIRING_MIN = 100;

  /* ---------- helpers ---------- */

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

  function companyPath(name) {
    const slug = companySlug(name);
    return slug ? `/company/${encodeURIComponent(slug)}/` : "/jobs/";
  }

  function todayStart() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  }

  function parseIso(iso) {
    if (!iso || iso === "Rolling") return null;
    const date = new Date(`${iso}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date.getTime();
  }

  function formatDate(iso) {
    if (!iso || iso === "Rolling") return iso || "";
    const ts = parseIso(iso);
    if (ts === null) return iso;
    return new Date(ts).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function formatDateTime(iso) {
    if (!iso || iso === "Rolling") return iso || "";
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return formatDate(iso);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
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
    if (left <= CLOSING_DAYS) return "closing";
    return "open";
  }

  function deadlineLabel(job) {
    const left = daysLeft(job);
    if (left === null) return job.applyDeadline === "Rolling" ? "Rolling deadline" : "";
    if (left < -1) return `Expired ${Math.abs(left)} days ago`;
    if (left === -1) return "Expired yesterday";
    if (left === 0) return "Last day to apply";
    if (left === 1) return "1 day left";
    if (left <= CLOSING_DAYS) return `${left} days left`;
    return `Apply by ${formatDate(job.applyDeadline)}`;
  }

  function vacancyCount(job) {
    const raw = job.vacancies;
    if (typeof raw === "number" && Number.isFinite(raw)) return raw;
    if (typeof raw === "string" && raw.trim()) {
      const n = parseInt(raw.replace(/[^\d]/g, ""), 10);
      return Number.isFinite(n) ? n : 0;
    }
    return 0;
  }

  function vacancyLabel(job) {
    if (job.vacancyText) return String(job.vacancyText);
    const n = vacancyCount(job);
    if (n >= MASS_HIRING_MIN) return "100+";
    if (n > 0) return String(n);
    return "";
  }

  function isMassHiring(job) {
    if (vacancyCount(job) >= MASS_HIRING_MIN) return true;
    if (job.featured === true) return true;
    const text = String(job.vacancyText || "").toLowerCase();
    return text.includes("100+") || text.includes("100 +");
  }

  function isWalkInJob(job) {
    return Boolean(job.isWalkIn || job.walkin);
  }

  function walkInDateText(job) {
    return job.walkinDates || job.walkInDate || "";
  }

  function qualificationText(job) {
    if (job.qualification) return String(job.qualification);
    const edu = job.educationalQualification;
    if (Array.isArray(edu) && edu.length) return edu.join(", ");
    return "";
  }

  function massHiringBadgeHtml() {
    return `
      <span class="job-badge job-badge--mass-hiring" title="100 or more open positions">
        <svg class="job-badge-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        100+ Vacancies
      </span>
    `;
  }

  function defaultMassSeo(job) {
    const role = (job.roles || [])[0] || "Professionals";
    const rolePlural =
      vacancyCount(job) >= MASS_HIRING_MIN || isMassHiring(job)
        ? `${role}${/s$/i.test(role) ? "" : "s"}`
        : role;
    const company = job.company || "Company";
    const locHint = /kochi|infopark/i.test(String(job.location || ""))
      ? "Freshers Jobs in Kochi"
      : `Jobs in ${job.location || "Kerala"}`;
    return {
      title: `${company} Hiring 100+ ${rolePlural} | ${locHint} | InfoparkDaily`,
      description: `${company} is hiring 100+ ${rolePlural} in ${
        job.location || "Kerala"
      }.${
        qualificationText(job) ? ` ${qualificationText(job)} candidates can apply.` : ""
      }${
        isWalkInJob(job) && walkInDateText(job)
          ? ` Walk-in interview from ${walkInDateText(job)}.`
          : ""
      } Apply through InfoparkDaily.`
    };
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

  /** Real dialable number only — hide empty / placeholder / verification notes. */
  function usablePhone(phone) {
    if (phone == null) return "";
    const text = String(phone).trim();
    if (!text) return "";
    if (/not officially/i.test(text)) return "";
    if (/verified from/i.test(text)) return "";
    if (/not available/i.test(text)) return "";
    if (/n\/?a\b/i.test(text)) return "";
    const digits = text.replace(/\D/g, "");
    if (digits.length < 6) return "";
    return text;
  }

  function assetUrl(path) {
    if (!path) return "";
    const value = String(path);
    if (/^(https?:|data:|mailto:|tel:|\/\/)/i.test(value)) return value;
    return `/${value.replace(/^\.?\//, "")}`;
  }

  function getJobId() {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = (params.get("id") || "").trim();
    if (fromQuery) return fromQuery.toLowerCase();

    const match = String(window.location.pathname || "").match(/\/job\/([^\/]+)\/?$/i);
    if (match && match[1]) {
      try {
        return decodeURIComponent(match[1]).trim().toLowerCase();
      } catch (_e) {
        return match[1].trim().toLowerCase();
      }
    }
    return "";
  }

  function jobPath(id) {
    return `/job/${encodeURIComponent(String(id || "").trim().toLowerCase())}`;
  }

  function findJob(id) {
    if (!id) return null;
    return (
      JOBS.find((job) => String(job.id || "").toLowerCase() === id) ||
      JOBS.find((job) => String(job.company || "").toLowerCase().replace(/\s+/g, "-") === id) ||
      null
    );
  }

  function listBlock(items) {
    if (!items || !items.length) return "";
    return `<ul class="job-detail-bullets">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function infoItem(label, valueHtml) {
    if (!valueHtml) return "";
    return `
      <div class="job-info-item">
        <dt>${escapeHtml(label)}</dt>
        <dd>${valueHtml}</dd>
      </div>
    `;
  }

  function linkHtml(url, label) {
    if (!url) return "";
    const text = label || url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `<a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text)}</a>`;
  }

  function emailHtml(email) {
    if (!email) return "";
    return `<a href="mailto:${escapeAttr(email)}">${escapeHtml(email)}</a>`;
  }

  function phoneHtml(phone) {
    const usable = usablePhone(phone);
    if (!usable) return "";
    const tel = usable.replace(/\s+/g, "");
    return `<a href="tel:${escapeAttr(tel)}">${escapeHtml(usable)}</a>`;
  }

  function section(title, bodyHtml, extraClass) {
    if (!bodyHtml) return "";
    return `
      <section class="job-panel glass${extraClass ? ` ${extraClass}` : ""}">
        <h2>${escapeHtml(title)}</h2>
        ${bodyHtml}
      </section>
    `;
  }

  function verifyBeforeApplyNote() {
    return `
      <aside class="job-verify-note" role="note" aria-label="Verify before you apply">
        <strong>NOTE:</strong>
        Verify this job on the company’s official website or email first — then only apply.
        InfoparkDaily is not the employer. Never pay anyone for a job or interview.
      </aside>
    `;
  }

  function renderMissing() {
    const isJobRoute = window.__IPD_IS_JOB_ROUTE__ !== false;
    document.title = isJobRoute ? "Job not found | InfoparkDaily" : "Page not found | InfoparkDaily";
    root.innerHTML = `
      <section class="job-missing glass">
        <p class="jobs-kicker">${isJobRoute ? "Hiring digest" : "404"}</p>
        <h1>${isJobRoute ? "Opening not found" : "Page not found"}</h1>
        <p>${
          isJobRoute
            ? "This job may have been removed or the link is incomplete."
            : "The page you requested doesn’t exist on InfoparkDaily."
        }</p>
        <a class="btn btn-primary" href="/jobs/">Back to Job Openings</a>
        <a class="btn btn-secondary" href="/">Home</a>
      </section>
    `;
  }

  function renderDataError() {
    document.title = "Couldn’t load job | InfoparkDaily";
    root.innerHTML = `
      <section class="job-missing glass">
        <p class="jobs-kicker">Temporary issue</p>
        <h1>Couldn’t load job data</h1>
        <p>Please refresh the page. If it keeps happening, open Jobs and try again.</p>
        <a class="btn btn-primary" href="/jobs/">View Jobs</a>
        <button class="btn btn-secondary" type="button" onclick="window.location.reload()">Refresh</button>
      </section>
    `;
  }

  /* ---------- premium blocks ---------- */

  function salaryDisplay(job) {
    const value = String(job.salary || job.salaryRange || "").trim();
    return isKnown(value) ? value : "Not disclosed";
  }

  function workModeDisplay(job) {
    if (isKnown(job.workMode)) return String(job.workMode);
    const blob = `${job.location || ""} ${job.employmentType || ""} ${job.workStatus || ""}`;
    if (/remote/i.test(blob)) return "Remote";
    if (/hybrid/i.test(blob)) return "Hybrid";
    return "On-site";
  }

  function typeBadgeLabel(job) {
    return String(job.employmentType || job.workStatus || EXP_LABELS[job.experience] || "Full-time");
  }

  function listingStatusMeta(job) {
    const status = deadlineStatus(job);
    if (status === "expired") return { cls: "expired", label: "Expired" };
    if (status === "closing") return { cls: "closing", label: "Closing soon" };
    return { cls: "live", label: "Live" };
  }

  function premiumFactTiles(job) {
    const expiredDeadline = deadlineStatus(job) === "expired";
    const deadline =
      job.applyDeadline === "Rolling"
        ? "Open / Rolling"
        : job.applyDeadline
          ? formatDate(job.applyDeadline)
          : "Not listed";
    const items = [
      ["Salary", salaryDisplay(job), "salary"],
      [
        "Experience",
        job.experienceRange || job.experienceYears || EXP_LABELS[job.experience] || "Not listed",
        "exp"
      ],
      ["Work mode", workModeDisplay(job), "mode"],
      [expiredDeadline ? "Deadline passed" : "Deadline", deadline, expiredDeadline ? "passed" : "deadline"]
    ];
    return `<div class="jd-facts">${items
      .map(
        ([label, value, key]) => `
      <div class="jd-fact jd-fact--${key}">
        <span class="jd-fact-icon" aria-hidden="true"></span>
        <span class="jd-fact-label">${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </div>`
      )
      .join("")}</div>`;
  }

  function usesOnSiteApply(job) {
    return Boolean(job && (job.onSiteApply || job.applyForm || job.collectApplications));
  }

  function isParkListingUrl(url) {
    const u = String(url || "");
    return /infopark\.in\/(company-jobs|jobs\/|companies-job)/i.test(u)
      || /technopark\.in\/job-details/i.test(u)
      || /cyberparks\.in\//i.test(u);
  }

  function mailApplyHref(job) {
    const link = String(job.applyLink || "").trim();
    if (/^mailto:/i.test(link)) return link;
    const email = String(job.email || "").trim();
    if (!email) return "";
    const subject = job.emailSubject || (job.roles || [])[0] || "Job application";
    return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  }

  function externalApplyHref(job) {
    const link = String(job.applyLink || "").trim();
    if (!link || /^mailto:/i.test(link) || link.startsWith("#") || link.includes("/#apply")) return "";
    if (mailApplyHref(job) && isParkListingUrl(link)) return "";
    if (/^https?:\/\//i.test(link)) return link;
    return "";
  }

  function applySidebarCard(job, expired, applyCtaHref, applyCtaLabel, applyUrl) {
    const st = listingStatusMeta(job);
    const deadline =
      job.applyDeadline === "Rolling"
        ? "Open / Rolling"
        : job.applyDeadline
          ? formatDate(job.applyDeadline)
          : "Not listed";
    const onSite = usesOnSiteApply(job);
    const ctaHtml = (() => {
      if (expired) {
        return `<a class="btn btn-secondary jd-apply-btn" href="/jobs/">Browse live jobs</a>`;
      }
      if (onSite && window.IPDJobApply && typeof window.IPDJobApply.compactCtaHtml === "function") {
        return window.IPDJobApply.compactCtaHtml(job);
      }
      if (onSite) {
        return `<a class="btn btn-primary jd-apply-btn" href="#apply">Apply now</a>
          <p class="jd-apply-note">Use the application form on this page — resume, portfolio / LinkedIn, and contact details.</p>`;
      }
      if (applyCtaHref) {
        return `<a class="btn btn-primary jd-apply-btn" href="${escapeAttr(applyCtaHref)}" ${
          applyUrl ? 'target="_blank" rel="noopener noreferrer"' : ""
        }>${escapeHtml(applyCtaLabel || "Apply now")}</a>`;
      }
      return `<a class="btn btn-secondary jd-apply-btn" href="/jobs/">Browse live jobs</a>`;
    })();
    return `
      <aside class="jd-side">
        <section class="jd-apply-card">
          <div class="jd-apply-head">
            <h2>Apply for this job</h2>
            <span class="ej-status ej-status--${st.cls}">${st.label}</span>
          </div>
          <ul class="jd-apply-facts">
            <li><span>Salary</span><strong>${escapeHtml(salaryDisplay(job))}</strong></li>
            <li><span>Experience</span><strong>${escapeHtml(
              job.experienceRange || job.experienceYears || EXP_LABELS[job.experience] || "Not listed"
            )}</strong></li>
            <li><span>Deadline</span><strong>${escapeHtml(deadline)}</strong></li>
            <li><span>Work mode</span><strong>${escapeHtml(workModeDisplay(job))}</strong></li>
          </ul>
          ${ctaHtml}
          ${
            expired
              ? `<p class="jd-apply-note">This listing has expired. Confirm with the employer before applying.</p>`
              : onSite
                ? ""
                : `<p class="jd-apply-note">Always verify on the official company site or email before you apply.</p>`
          }
        </section>
        <a class="jd-ats-card" href="/ats-checker/">
          <div class="jd-ats-top">
            <p class="jd-ats-kicker">Resume match</p>
            <span class="jd-ats-free">Free</span>
          </div>
          <strong>Check your ATS score for this job</strong>
          <p class="jd-ats-chance">See keyword gaps before you apply — analysis runs in your browser.</p>
          <span class="jd-ats-cta">Open ATS checker →</span>
        </a>
        <a class="jd-company-link-card" href="${escapeAttr(companyPath(job.company))}">
          <div class="jd-co-card">
            ${
              job.logo
                ? `<div class="job-logo-wrap" aria-hidden="true"><img src="${escapeAttr(assetUrl(job.logo))}" alt=""></div>`
                : `<div class="job-logo-wrap job-logo-wrap--text" data-initials="${escapeAttr(initials(job.company))}" aria-hidden="true"><span class="job-logo-fallback">${escapeHtml(initials(job.company))}</span></div>`
            }
            <div class="jd-co-card-copy">
              <span>Company profile</span>
              <strong>${escapeHtml(job.companyLegalName || job.company || "View company")}</strong>
              ${job.location ? `<p>${escapeHtml(job.location)}</p>` : ""}
            </div>
          </div>
          <span class="jd-ats-cta">View company →</span>
        </a>
      </aside>
    `;
  }

  function contentPanel(iconClass, title, bodyHtml) {
    if (!hasSheetBody(bodyHtml)) return "";
    return `
      <section class="jd-panel">
        <header class="jd-panel-head">
          <span class="jd-panel-icon jd-panel-icon--${escapeAttr(iconClass)}" aria-hidden="true"></span>
          <h2>${escapeHtml(title)}</h2>
        </header>
        <div class="jd-panel-body">${bodyHtml}</div>
      </section>
    `;
  }

  function postedLabel(job) {
    if (!job.postedDate) return "";
    const raw = String(job.postedDate);
    if (/T\d{2}:/.test(raw) || raw.includes(" ")) {
      return `Posted ${formatDateTime(raw)}`;
    }
    return `Posted ${formatDate(job.postedDate)}`;
  }

  const ND = "Not officially disclosed by the company.";

  function isKnown(value) {
    if (value == null) return false;
    if (typeof value !== "string") return Boolean(value);
    const text = value.trim();
    if (!text) return false;
    if (/^not officially (disclosed|available)/i.test(text)) return false;
    if (/not officially disclosed by the company/i.test(text)) return false;
    return true;
  }

  function naText(value) {
    const text = String(value ?? "").trim();
    if (!text || /^not officially available\.?$/i.test(text)) return ND;
    return text;
  }

  function knownList(items) {
    const clean = (items || []).filter((item) => isKnown(String(item)));
    return listBlock(clean);
  }

  function kvGrid(pairs) {
    const rows = (pairs || [])
      .filter(([, value]) => {
        if (typeof value === "string") return isKnown(value);
        return Boolean(value);
      })
      .map(([label, value]) =>
        infoItem(label, typeof value === "string" ? escapeHtml(value.trim()) : value)
      )
      .join("");
    return rows ? `<dl class="job-info-list job-info-list--grid">${rows}</dl>` : "";
  }

  function sectionIf(title, bodyHtml, extraClass) {
    if (!bodyHtml || !String(bodyHtml).trim()) return "";
    return section(title, bodyHtml, extraClass);
  }

  function quickFactsBlock(job) {
    const qf = job.quickFacts || {};
    const facts = [
      ["Company", qf.company || job.companyLegalName || job.company],
      ["Roles", qf.roles || (job.roles || []).join(", ")],
      ["Location", qf.location || job.location],
      ["Type", qf.employmentType || job.employmentType],
      ["Experience", qf.experience || job.experienceRange || job.experienceYears],
      ["Work mode", qf.workMode || job.workMode],
      ["Salary", qf.salary || job.salaryRange],
      [
        "Deadline",
        job.applyDeadline === "Rolling"
          ? "Rolling"
          : qf.deadline && qf.deadline !== ND
            ? qf.deadline
            : job.applyDeadline
      ],
      ["Email", qf.email || job.email],
      ["Phone", usablePhone(qf.phone || job.phone)]
    ].filter(([, value]) => isKnown(value));

    if (!facts.length) return "";
    return `
      <div class="job-quick-facts" role="list">
        ${facts
          .map(
            ([label, value]) => `
          <div class="job-quick-fact" role="listitem">
            <span>${escapeHtml(label)}</span>
            <strong>${escapeHtml(String(value).trim())}</strong>
          </div>`
          )
          .join("")}
      </div>
    `;
  }

  function injectJobPostingSchema(job) {
    const old = document.getElementById("job-posting-schema");
    if (old) old.remove();
    const s = job.schema || {};
    const apply =
      job.applyLink && !String(job.applyLink).startsWith("mailto:")
        ? job.applyLink
        : job.email
          ? `mailto:${job.email}`
          : job.canonicalUrl || window.location.href;
    const empMap = {
      "Full-time": "FULL_TIME",
      "Full Time": "FULL_TIME",
      Internship: "INTERN",
      Contract: "CONTRACTOR",
      Temporary: "TEMPORARY",
      Apprenticeship: "INTERN"
    };
    const employmentType = empMap[job.employmentType] || empMap[s.employmentType] || "FULL_TIME";
    const data = {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: s.title || (job.roles || [])[0] || job.company,
      description: job.jobSummary || job.seoDescription || job.companyDetails || "",
      datePosted: s.datePosted || job.postedDate || undefined,
      validThrough: s.validThrough || (job.applyDeadline && job.applyDeadline !== "Rolling" ? job.applyDeadline : undefined),
      employmentType,
      hiringOrganization: {
        "@type": "Organization",
        name: s.hiringOrganization || job.companyLegalName || job.company,
        sameAs: s.sameAs || job.website || undefined,
        logo: job.logo ? `https://infoparkdaily.online/${String(job.logo).replace(/^\//, "")}` : undefined
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          streetAddress: s.streetAddress || job.address || undefined,
          addressLocality: s.addressLocality || "Kochi",
          addressRegion: s.addressRegion || "Kerala",
          postalCode: s.postalCode || undefined,
          addressCountry: s.addressCountry || "IN"
        }
      },
      identifier: {
        "@type": "PropertyValue",
        name: "InfoparkDaily",
        value: s.identifier || job.id
      },
      directApply: Boolean(apply),
      url: job.canonicalUrl || window.location.href,
      applicantLocationRequirements: {
        "@type": "Country",
        name: "India"
      }
    };
    // Strip undefined keys recursively-ish
    const clean = JSON.parse(JSON.stringify(data));
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "job-posting-schema";
    el.textContent = JSON.stringify(clean);
    document.head.appendChild(el);
  }

  function numberedFromArray(items) {
    if (!items || !items.length) return "";
    return `<ol class="job-detail-steps">${items
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("")}</ol>`;
  }

  function faqBlock(faqs) {
    if (!faqs || !faqs.length) return "";
    const useful = faqs.filter((item) => {
      if (typeof item === "string") return isKnown(item) && !/not officially disclosed/i.test(item);
      return isKnown(item && item.a) && !/^not officially disclosed/i.test(String(item.a || "").trim());
    });
    if (!useful.length) return "";
    return `<div class="job-sheet-faqs">${useful
      .map((item) => {
        if (typeof item === "string") {
          const parts = item.split("?");
          if (parts.length < 2) return `<p class="job-detail-text">${escapeHtml(item)}</p>`;
          return `<div class="job-sheet-faq"><strong>${escapeHtml(`${parts[0]}?`)}</strong><span>${escapeHtml(parts.slice(1).join("?").trim())}</span></div>`;
        }
        return `<div class="job-sheet-faq"><strong>${escapeHtml(item.q || "")}</strong><span>${escapeHtml(item.a || "")}</span></div>`;
      })
      .join("")}</div>`;
  }

  function officialLinksBlock(job) {
    const links = job.officialLinks || {};
    const rows = [
      links.website ? infoItem("Official website", linkHtml(links.website)) : "",
      links.careers ? infoItem("Official apply / careers", linkHtml(links.careers, "Open apply page")) : "",
      links.apply && String(links.apply).startsWith("mailto:")
        ? infoItem("Apply email", emailHtml(String(links.apply).replace(/^mailto:/i, "")))
        : "",
      links.infoparkProfile
        ? infoItem("Infopark company profile", linkHtml(links.infoparkProfile, "View Infopark profile"))
        : "",
      links.infoparkJob
        ? infoItem("Infopark job listing", linkHtml(links.infoparkJob, "View on infopark.in"))
        : "",
      job.source === "Infopark" || links.infoparkProfile || links.infoparkJob
        ? infoItem("Infopark Jobs portal", linkHtml(links.infoparkJobs || "https://infopark.in/companies-job", "infopark.in/companies-job"))
        : "",
      links.linkedin ? infoItem("Official LinkedIn", linkHtml(links.linkedin)) : "",
      links.contactPage ? infoItem("Official contact page", linkHtml(links.contactPage)) : "",
      links.aboutPage ? infoItem("Official about page", linkHtml(links.aboutPage)) : ""
    ].join("");
    return rows ? `<dl class="job-info-list">${rows}</dl>` : "";
  }

  function verificationNoticeBlock(_job) {
    // Keep this short and single-purpose — do not repeat fraudWarning bullets here.
    return `
      <aside class="job-panel glass job-verify-panel job-verify-panel--compact" role="note">
        <h2>Verification note</h2>
        <p class="job-detail-text">
          Listings come from public sources. We are not the employer and cannot guarantee every role is genuine.
          Check the official company site before you apply. Never pay for a job.
          <a href="/contact/">Report an issue</a>
          · <a href="mailto:infoparkstorieskochi@gmail.com">infoparkstorieskochi@gmail.com</a>
        </p>
      </aside>
    `;
  }

  function shortPlainText(value, max = 280) {
    const text = String(value || "")
      .replace(/\s+/g, " ")
      .trim();
    if (!text) return "";
    if (text.length <= max) return text;
    return `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;
  }

  function textBlock(value) {
    const inner = formatJobProseInner(value);
    return inner ? `<div class="jd-prose">${inner}</div>` : "";
  }

  function pickJobDescriptionHtml(job) {
    const candidates = [job.workDetails, job.jobSummary, job.description]
      .filter((value) => isKnown(value))
      .map((value) => String(value).trim())
      .sort((a, b) => b.length - a.length);
    const kept = [];
    for (const text of candidates) {
      const compact = text.replace(/\s+/g, " ").trim().toLowerCase();
      if (kept.some((existing) => existing.replace(/\s+/g, " ").trim().toLowerCase().includes(compact))) {
        continue;
      }
      kept.push(text);
    }
    const inner = kept.map((text) => formatJobProseInner(text)).filter(Boolean).join("");
    return inner ? `<div class="jd-prose">${inner}</div>` : "";
  }

  function stripJdDecor(line) {
    return String(line || "")
      .replace(/[\u00a0\u200b]/g, " ")
      .replace(/^[\s\uFE0F]*(?:[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}🔹📁📌🔷📍📋🚀✨🌟⭐️💼🎯✅☑️✔️➡️➤►▸•●▪–—*\uF0B7\u2022]|📍)+\s*/u, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function isSkippedJdLine(line) {
    const text = stripJdDecor(line);
    if (!text) return true;
    if (/^click here to apply/i.test(text)) return true;
    if (/^apply now$/i.test(text)) return true;
    return false;
  }

  function isJdHeading(line) {
    const text = stripJdDecor(line).replace(/[:.\-–—]+\s*$/, "").trim();
    if (!text || text.length > 72) return false;
    if (
      /^(eligibility(?:\s*(?:&|and)\s*program)?|selection process|how to apply|job description|candidate profile|compensation(?:\s*(?:&|and)\s*benefits)?|perks(?:\s*&?\s*benefits)?|responsibilities|requirements|benefits|about(?:\s+the\s+(?:role|company|us))?|role details?|opportunities|what you will own|what you will not own|what this role exists to do|what you(?:'|’)ll do|who (?:can|should) apply|documents?(?:\s+required)?|important notes?|the role|key responsibilities|must have|good to have|nice to have|job (?:title|summary|overview)|register now)$/i.test(
        text
      )
    ) {
      return true;
    }
    if (/^what [a-z].{6,48}$/i.test(text) && !/[.!?]$/.test(text)) return true;
    return /[:：]\s*$/.test(stripJdDecor(line)) && text.length < 42 && !/\d/.test(text);
  }

  function isJdBullet(line) {
    const raw = String(line || "").trim();
    if (/^(?:[-–—*•●▪➤►▸🔹📁📌🔷✅☑️✔️➡️]|[\uF0B7\u2022])\s+\S/.test(raw)) return true;
    if (/^\d+[.)]\s+\S/.test(raw)) return true;
    if (/^->\s+\S/.test(raw)) return true;
    return false;
  }

  function stripJdBullet(line) {
    return String(line || "")
      .trim()
      .replace(/^(?:[-–—*•●▪➤►▸🔹📁📌🔷✅☑️✔️➡️]|[\uF0B7\u2022]|\d+[.)]|->)\s+/, "")
      .trim();
  }

  function parseJdKv(line) {
    const text = stripJdDecor(line);
    const match = text.match(
      /^(job title|experience|company(?: name)?|location|job type|salary|work (?:mode|status|type)|posted|deadline|vacancies|qualification|employment type)\s*[:：]\s*(.+)$/i
    );
    return match ? { key: match[1], value: match[2].trim() } : null;
  }

  function isJdProcessLine(line) {
    const text = stripJdDecor(line);
    if (text.length > 90 || /https?:/i.test(text)) return false;
    const parts = text.split(/\s*(?:→|->|➔|⇒)\s*/).map((part) => part.trim()).filter(Boolean);
    return parts.length >= 2 && parts.every((part) => part.length < 28);
  }

  function isJdLead(line, index) {
    if (index !== 0) return false;
    const text = stripJdDecor(line);
    if (!text || text.length > 90) return false;
    if (/\|/.test(text)) return true;
    if (text === text.toUpperCase() && /[A-Z]/.test(text) && text.length < 70) return true;
    return false;
  }

  function linkifyJdText(text) {
    const escaped = escapeHtml(text);
    return escaped
      .replace(/\bhttps?:\/\/[^\s<]+/gi, (url) => {
        const trailing = url.match(/[),.;]+$/) ? url.match(/[),.;]+$/)[0] : "";
        const href = url.slice(0, url.length - trailing.length);
        const label = href.replace(/^https?:\/\//i, "").replace(/\/$/, "");
        return `<a href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>${trailing}`;
      })
      .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, (email) => {
        return `<a href="mailto:${escapeAttr(email)}">${escapeHtml(email)}</a>`;
      });
  }

  function normalizeJdLines(value) {
    const raw = String(value || "")
      .replace(/\r\n/g, "\n")
      .replace(/\u00a0/g, " ")
      .replace(/\uF0B7/g, "•");
    const merged = [];
    raw.split("\n").forEach((part) => {
      const line = part.replace(/\s+/g, " ").trim();
      if (!line) {
        if (merged.length && merged[merged.length - 1] !== "") merged.push("");
        return;
      }
      const prev = merged[merged.length - 1];
      const continuation =
        prev &&
        prev !== "" &&
        !isJdHeading(line) &&
        !isJdBullet(line) &&
        !parseJdKv(line) &&
        !/^(https?:\/\/)/i.test(line) &&
        !isJdHeading(prev) &&
        !/[.!?…:]$/.test(stripJdDecor(prev));
      if (continuation) {
        merged[merged.length - 1] = `${prev} ${line}`;
      } else {
        merged.push(line);
      }
    });
    return merged;
  }

  function formatJobProseInner(value) {
    const text = String(value || "").trim();
    if (!isKnown(text)) return "";
    const lines = normalizeJdLines(text).filter((line) => !isSkippedJdLine(line) || line === "");
    const html = [];
    let bullets = [];
    let numbered = true;

    const flushBullets = () => {
      if (!bullets.length) return;
      const tag = numbered ? "ol" : "ul";
      html.push(
        `<${tag} class="jd-prose-list">${bullets
          .map((item) => `<li>${linkifyJdText(item)}</li>`)
          .join("")}</${tag}>`
      );
      bullets = [];
      numbered = true;
    };

    lines.forEach((line) => {
      if (!line) {
        flushBullets();
        return;
      }
      if (!html.length && !bullets.length && isJdLead(line, 0)) {
        html.push(`<p class="jd-prose-lead">${linkifyJdText(stripJdDecor(line))}</p>`);
        return;
      }
      if (isJdHeading(line)) {
        flushBullets();
        html.push(`<h3 class="jd-prose-h">${escapeHtml(stripJdDecor(line).replace(/[:.\-–—]+\s*$/, ""))}</h3>`);
        return;
      }
      const kv = parseJdKv(line);
      if (kv) {
        flushBullets();
        html.push(
          `<p class="jd-prose-kv"><span>${escapeHtml(kv.key)}</span><strong>${linkifyJdText(kv.value)}</strong></p>`
        );
        return;
      }
      if (isJdProcessLine(line)) {
        flushBullets();
        const steps = stripJdDecor(line)
          .split(/\s*(?:→|->|➔|⇒)\s*/)
          .map((step) => step.trim())
          .filter(Boolean);
        html.push(
          `<ol class="jd-prose-steps">${steps
            .map((step) => `<li>${escapeHtml(step)}</li>`)
            .join("")}</ol>`
        );
        return;
      }
      if (isJdBullet(line)) {
        const item = stripJdBullet(line);
        if (!item) return;
        if (!bullets.length) numbered = /^\d+[.)]\s+/.test(line.trim());
        bullets.push(item);
        return;
      }
      flushBullets();
      html.push(`<p>${linkifyJdText(stripJdDecor(line))}</p>`);
    });
    flushBullets();
    return html.join("");
  }

  function uniqueKnownTexts(values) {
    const seen = new Set();
    return (values || []).filter((value) => {
      if (!isKnown(value)) return false;
      const key = String(value).replace(/\s+/g, " ").trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function jobDescriptionForAts(job) {
    const lines = [
      `Role: ${(job.roles || []).filter(Boolean).join(", ")}`,
      `Company: ${job.companyLegalName || job.company || ""}`,
      job.location ? `Location: ${job.location}` : "",
      job.experienceRange || job.experienceYears
        ? `Experience: ${job.experienceRange || job.experienceYears}`
        : "",
      job.employmentType || job.workStatus ? `Type: ${job.employmentType || job.workStatus}` : "",
      job.workMode ? `Work mode: ${job.workMode}` : "",
      qualificationText(job) ? `Qualification: ${qualificationText(job)}` : "",
      job.jobSummary,
      job.companyDetails,
      job.workDetails,
      job.description,
      usefulItems(job.responsibilities).length
        ? `Responsibilities:\n- ${usefulItems(job.responsibilities).join("\n- ")}`
        : "",
      usefulItems(job.requirements).length
        ? `Requirements:\n- ${usefulItems(job.requirements).join("\n- ")}`
        : "",
      usefulItems(job.whoCanApply).length
        ? `Who can apply:\n- ${usefulItems(job.whoCanApply).join("\n- ")}`
        : "",
      usefulItems(job.technicalSkills).length
        ? `Technical skills: ${usefulItems(job.technicalSkills).join(", ")}`
        : "",
      usefulItems(job.skills).length ? `Skills: ${usefulItems(job.skills).join(", ")}` : "",
      isKnown(job.howToApply) ? `How to apply: ${job.howToApply}` : ""
    ];
    return uniqueKnownTexts(lines).join("\n\n");
  }

  function usefulItems(items) {
    return (items || []).filter((item) => {
      const text = String(item || "").trim();
      if (!isKnown(text)) return false;
      if (/not officially disclosed/i.test(text)) return false;
      return true;
    });
  }

  function verificationReportBlock(job) {
    const report = job.verificationReport;
    if (!report) return "";
    const flags = [
      ["Company legally exists / listed", report.companyExists],
      ["Official website verified", report.websiteVerified],
      ["Careers / apply page verified", report.careersPageVerified || report.applyLinkVerified],
      ["LinkedIn verified", report.linkedinVerified],
      ["Infopark profile verified", report.infoparkProfileVerified],
      ["Office address verified", report.addressVerified],
      ["Email verified", report.emailVerified],
      ["Phone verified", report.phoneVerified],
      ["Job title verified", report.jobTitleVerified],
      ["Experience verified", report.experienceVerified],
      ["Skills verified", report.skillsVerified],
      ["Salary verified", report.salaryVerified],
      ["Eligibility verified", report.eligibilityVerified],
      ["Hiring process verified", report.hiringProcessVerified],
      ["Application link verified", report.applyLinkVerified]
    ];
    return `
      <ul class="job-verify-checklist">
        ${flags
          .map(
            ([label, ok]) =>
              `<li class="${ok ? "is-yes" : "is-no"}"><span>${ok ? "Verified" : "Not disclosed"}</span><strong>${escapeHtml(label)}</strong></li>`
          )
          .join("")}
      </ul>
      ${
        report.sources && report.sources.length
          ? `<p class="job-detail-text"><strong>Sources used:</strong> ${escapeHtml(report.sources.join(" · "))}</p>`
          : ""
      }
      ${
        report.unverifiedFields && report.unverifiedFields.length
          ? `<p class="job-detail-text"><strong>Not officially disclosed:</strong> ${escapeHtml(report.unverifiedFields.join(", "))}</p>`
          : ""
      }
      <p class="job-detail-text">Accuracy takes priority over completeness. InfoparkDaily does not invent salaries, contacts, or eligibility rules.</p>
    `;
  }

  function applyMethodsBlock(job) {
    const methods = [];

    if (job.email) {
      methods.push(`
        <a class="job-apply-method" href="${escapeAttr(mailApplyHref(job) || `mailto:${job.email}`)}">
          <span class="job-apply-method-icon job-apply-method-icon--mail" aria-hidden="true">@</span>
          <span class="job-apply-method-body">
            <strong>Apply email</strong>
            <span>${escapeHtml(job.email)}</span>
          </span>
        </a>
      `);
    }

    const listingUrl =
      (job.officialLinks && (job.officialLinks.infoparkJob || job.officialLinks.careers)) ||
      (job.applyLink && !String(job.applyLink).startsWith("mailto:") ? job.applyLink : "");
    const careers =
      listingUrl && !mailApplyHref(job)
        ? listingUrl
        : listingUrl && isParkListingUrl(listingUrl)
          ? listingUrl
          : job.applyLink && !String(job.applyLink).startsWith("mailto:")
            ? job.applyLink
            : "";
    if (careers && !/^mailto:/i.test(careers)) {
      const park = isParkListingUrl(careers);
      methods.push(`
        <a class="job-apply-method" href="${escapeAttr(careers)}" target="_blank" rel="noopener noreferrer">
          <span class="job-apply-method-icon job-apply-method-icon--web" aria-hidden="true">↗</span>
          <span class="job-apply-method-body">
            <strong>${park ? "Infopark listing" : "Official apply / careers"}</strong>
            <span>${escapeHtml(String(careers).replace(/^https?:\/\//, "").replace(/\/$/, ""))}</span>
          </span>
        </a>
      `);
    }

    if (job.website && job.website !== careers && !/infopark\.in\/companies-job/.test(job.website)) {
      methods.push(`
        <a class="job-apply-method" href="${escapeAttr(job.website)}" target="_blank" rel="noopener noreferrer">
          <span class="job-apply-method-icon job-apply-method-icon--web" aria-hidden="true">◉</span>
          <span class="job-apply-method-body">
            <strong>Company website</strong>
            <span>${escapeHtml(String(job.website).replace(/^https?:\/\//, "").replace(/\/$/, ""))}</span>
          </span>
        </a>
      `);
    }

    const phone = usablePhone(job.phone);
    if (phone) {
      methods.push(`
        <a class="job-apply-method" href="tel:${escapeAttr(phone.replace(/\s+/g, ""))}">
          <span class="job-apply-method-icon job-apply-method-icon--phone" aria-hidden="true">✆</span>
          <span class="job-apply-method-body">
            <strong>Phone</strong>
            <span>${escapeHtml(phone)}</span>
          </span>
        </a>
      `);
    }

    if (!methods.length) return "";
    return `<div class="job-apply-methods">${methods.join("")}</div>`;
  }

  function walkInBlock(job) {
    if (!isWalkInJob(job)) return "";
    const dates = walkInDateText(job) || "Walk-in drive";
    const time = job.walkinTime || "";
    const venue = job.walkinLocation || job.address || job.location || "";
    const phone = usablePhone(job.phone);
    return `
      <details class="job-walkin-box" open>
        <summary class="job-walkin-box-summary">
          <span>Walk-in Interview</span>
          <span class="job-walkin-box-toggle" aria-hidden="true"></span>
        </summary>
        <div class="job-walkin-box-body">
          <ul class="job-walkin-lines">
            <li><span aria-hidden="true">📅</span><span>${escapeHtml(dates)}</span></li>
            ${time ? `<li><span aria-hidden="true">⏰</span><span>${escapeHtml(time)}</span></li>` : ""}
            ${
              venue
                ? `<li><span aria-hidden="true">📍</span><span>${escapeHtml(venue)}</span></li>`
                : ""
            }
            ${
              phone
                ? `<li><span aria-hidden="true">📞</span><a href="tel:${escapeAttr(
                    phone.replace(/\s+/g, "")
                  )}">${escapeHtml(phone)}</a></li>`
                : ""
            }
          </ul>
          <p class="job-walkin-note">Carry an updated resume and a valid ID. Verify timings with the company before travelling.</p>
        </div>
      </details>
    `;
  }

  function whyJoinBlock(job) {
    const items = usefulItems(job.whyJoin || job.benefits || []);
    if (!items.length && !isMassHiring(job)) return "";
    const list = items.length
      ? items
      : [
          `${vacancyLabel(job) || "100+"} Immediate Openings`,
          job.experience === "fresher" || job.experience === "both" ? "Freshers Preferred" : "",
          job.location || "",
          "Career Growth"
        ].filter(Boolean);
    return `
      <section class="job-why-join">
        <h2>Why Join?</h2>
        <ul class="job-why-join-list">
          ${list.map((item) => `<li>✅ ${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
    `;
  }

  function contactHighlightBlock(job) {
    const email = job.email || "";
    const phone = usablePhone(job.phone);
    if (!email && !phone) return "";
    return `
      <section class="job-contact-highlight">
        <h2>Contact</h2>
        <ul class="job-walkin-lines">
          ${
            email
              ? `<li><span aria-hidden="true">📧</span><a href="mailto:${escapeAttr(email)}">${escapeHtml(
                  email
                )}</a></li>`
              : ""
          }
          ${
            phone
              ? `<li><span aria-hidden="true">📞</span><a href="tel:${escapeAttr(
                  phone.replace(/\s+/g, "")
                )}">${escapeHtml(phone)}</a></li>`
              : ""
          }
        </ul>
      </section>
    `;
  }

  function resolveMapTarget(job) {
    const raw =
      (job.locationDetails && job.locationDetails.googleMapsQuery) ||
      job.walkinLocation ||
      job.address ||
      job.location ||
      "";
    const text = String(raw).toLowerCase();
    if (!text || text === String(ND).toLowerCase()) return null;

    // Known Kerala IT parks — pinned coords so embeds stay reliable offline-from-Google
    if (/technopark|kariavattom|thiruvananthapuram|trivandrum/.test(text)) {
      return {
        query: "Technopark Campus, Kariavattom, Thiruvananthapuram, Kerala 695581",
        lat: 8.5586,
        lng: 76.8828
      };
    }
    if (/infopark|kakkanad/.test(text)) {
      return {
        query: "Infopark Kochi Phase 1, Kakkanad, Ernakulam, Kerala 682042",
        lat: 10.0095,
        lng: 76.3632
      };
    }
    if (/cyberpark|kozhikode|calicut|nellikkode/.test(text)) {
      return {
        query: "Cyberpark Kozhikode, Nellikkode, Kerala 673016",
        lat: 11.2588,
        lng: 75.7804
      };
    }

    return { query: String(raw).trim(), lat: null, lng: null };
  }

  function mapBlock(job) {
    const target = resolveMapTarget(job);
    if (!target || !target.query) return "";

    const openHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(target.query)}`;
    let iframeSrc;
    if (target.lat != null && target.lng != null) {
      // Tight bbox ≈ max useful zoom on OSM embed (~street / campus level)
      const pad = 0.0018;
      const bbox = [
        (target.lng - pad).toFixed(5),
        (target.lat - pad).toFixed(5),
        (target.lng + pad).toFixed(5),
        (target.lat + pad).toFixed(5)
      ].join("%2C");
      // OpenStreetMap embed — works when Google Maps iframe is blocked / fails
      iframeSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${target.lat}%2C${target.lng}`;
    } else {
      iframeSrc = `https://maps.google.com/maps?q=${encodeURIComponent(target.query)}&hl=en&z=19&output=embed`;
    }

    return `
      <div class="job-map-embed" aria-label="Company location map">
        <iframe
          title="${escapeAttr(job.company)} location map"
          src="${escapeAttr(iframeSrc)}"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        ></iframe>
        <a
          class="job-map-open"
          href="${escapeAttr(openHref)}"
          target="_blank"
          rel="noopener noreferrer"
        >Open in Google Maps</a>
      </div>
    `;
  }

  function shareBlock(job) {
    const url = window.location.href;
    const text = `${job.company} is hiring${job.location ? ` in ${job.location}` : ""} — via InfoparkDaily`;
    return `
      <section class="job-panel job-share-panel glass">
        <h2>Share this opening</h2>
        <div class="job-share-actions">
          <a class="btn btn-secondary" href="https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}" target="_blank" rel="noopener noreferrer">Share on WhatsApp</a>
          <button type="button" class="btn btn-ghost" id="job-copy-link">Copy link</button>
        </div>
      </section>
    `;
  }

  function chipsRow(items, className) {
    if (!items || !items.length) return "";
    return `<div class="${className}">${items
      .map((item) => `<span class="job-sheet-chip">${escapeHtml(item)}</span>`)
      .join("")}</div>`;
  }

  function cityKey(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/bengaluru/g, "bangalore")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function citiesInText(text, cityList) {
    const hay = cityKey(text);
    if (!hay) return [];
    return (cityList || [])
      .map((city) => String(city || "").trim())
      .filter(Boolean)
      .filter((city) => {
        const needle = cityKey(city);
        if (!needle) return false;
        return new RegExp(`(?:^|[^a-z0-9])${needle.replace(/\s+/g, "[\\s-]*")}(?:$|[^a-z0-9])`).test(hay);
      });
  }

  function roleCitiesAttr(role, cityList) {
    const found = citiesInText(role, cityList);
    return found.map((city) => cityKey(city).replace(/\s+/g, "-")).join(" ");
  }

  function locationFilterChips(locations, cityVenues) {
    if (!locations.length) return "";
    const buttons = [
      `<button type="button" class="job-sheet-chip job-city-filter is-active" data-city-filter="all" aria-pressed="true">All cities</button>`,
      ...locations.map((city) => {
        const key = cityKey(city).replace(/\s+/g, "-");
        const venue =
          cityVenues && (cityVenues[city] || cityVenues[String(city)] || "");
        return `<button type="button" class="job-sheet-chip job-city-filter" data-city-filter="${escapeAttr(
          key
        )}" data-city-label="${escapeAttr(city)}"${
          venue ? ` data-city-venue="${escapeAttr(venue)}"` : ""
        } aria-pressed="false">${escapeHtml(city)}</button>`;
      })
    ];
    return `<div class="job-sheet-chips job-city-filters" role="group" aria-label="Filter roles by city">${buttons.join(
      ""
    )}</div>`;
  }

  function bindCityRoleFilter(rootEl) {
    const root = rootEl || document;
    const filters = root.querySelector(".job-city-filters");
    const rolesList = root.querySelector(".job-role-grid[data-city-filterable='true']");
    if (!filters || !rolesList) return;

    const titleEl = rolesList.closest(".job-sheet-block")?.querySelector("h2");
    const noteEl = root.querySelector("[data-city-venue-note]");
    const defaultVenue = noteEl ? noteEl.getAttribute("data-default-venue") || "" : "";
    const items = [...rolesList.querySelectorAll("li[data-cities]")];

    function applyFilter(city, label, venue) {
      filters.querySelectorAll(".job-city-filter").forEach((btn) => {
        const active = btn.getAttribute("data-city-filter") === city;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });

      let visible = 0;
      items.forEach((li) => {
        const cities = (li.getAttribute("data-cities") || "").split(/\s+/).filter(Boolean);
        const show = city === "all" || cities.includes(city);
        li.hidden = !show;
        if (show) {
          visible += 1;
          const num = li.querySelector(".job-role-num");
          if (num) num.textContent = String(visible).padStart(2, "0");
        }
      });

      if (titleEl) {
        titleEl.textContent =
          city === "all"
            ? `All open positions (${items.length})`
            : `${label || "City"} positions (${visible})`;
      }

      if (noteEl) {
        if (city === "all") {
          noteEl.textContent = defaultVenue
            ? `Primary walk-in venue (Kochi): ${defaultVenue}`
            : "Select a city to see matching roles.";
        } else if (venue) {
          noteEl.textContent = `${label} walk-in venue: ${venue}`;
        } else {
          noteEl.textContent = `${label} roles shown. Confirm the local Cognizant venue before you travel.`;
        }
      }
    }

    filters.addEventListener("click", (event) => {
      const btn = event.target.closest(".job-city-filter");
      if (!btn) return;
      applyFilter(
        btn.getAttribute("data-city-filter") || "all",
        btn.getAttribute("data-city-label") || "",
        btn.getAttribute("data-city-venue") || ""
      );
    });
  }

  function numberedList(items) {
    if (!items || !items.length) return "";
    return `<ol class="job-sheet-steps">${items
      .map((item) => `<li>${escapeHtml(String(item).replace(/^\d+\.\s*/, ""))}</li>`)
      .join("")}</ol>`;
  }

  function hasSheetBody(bodyHtml) {
    const html = String(bodyHtml || "").trim();
    if (!html) return false;
    // Keep sections that are mostly embeds / structured UI with little plain text.
    if (/<(iframe|img|ul|ol|dl|a|button)\b/i.test(html)) return true;
    return Boolean(html.replace(/<[^>]*>/g, "").replace(/\s+/g, "").length);
  }

  function sheetSection(num, title, bodyHtml) {
    if (!hasSheetBody(bodyHtml)) return "";
    return `
      <section class="job-sheet-block">
        <header class="job-sheet-block-head">
          <span class="job-sheet-num" aria-hidden="true">${escapeHtml(num)}</span>
          <h2>${escapeHtml(title)}</h2>
        </header>
        <div class="job-sheet-block-body">${bodyHtml}</div>
      </section>
    `;
  }

  function channelsBlock() {
    const channels = [
      ["Instagram", "https://www.instagram.com/infoparkdaily/", "@infoparkdaily"],
      ["Jobs Instagram", "https://www.instagram.com/infoparkdaily.jobs/", "@infoparkdaily.jobs"],
      ["Media Instagram", "https://www.instagram.com/infoparkdaily.media/", "@infoparkdaily.media"],
      ["Instagram Broadcast", "https://www.instagram.com/channel/AbYzHp5h-gx5xbu7/", "Broadcast channel"],
      ["WhatsApp Channel", "https://whatsapp.com/channel/0029VbDJFfA4Y9lm5L4kpm22", "Daily job alerts"],
      ["WhatsApp Group", "https://chat.whatsapp.com/CpjcQa9otzR3yu9sVP05eB", "Community group"]
    ];
    return `
      <section class="job-sheet-channels glass">
        <p class="eyebrow">Follow InfoparkDaily</p>
        <h2>Get the next internship &amp; job alert first</h2>
        <p class="job-detail-text">Fresh openings from Infopark, Technopark, and pan-India IT hiring — shared daily on our channels.</p>
        <div class="job-sheet-channel-grid">
          ${channels
            .map(
              ([label, href, note]) => `
            <a class="job-sheet-channel" href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">
              <strong>${escapeHtml(label)}</strong>
              <span>${escapeHtml(note)}</span>
            </a>`
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function alertSheetBlock(job) {
    if (!job.alertSheet) return "";

    const panIndia =
      /pan[\s-]?india/i.test(String(job.location || "")) ||
      /pan[\s-]?india/i.test(String(job.alertLabel || "")) ||
      (Array.isArray(job.workLocations) &&
        job.workLocations.some((loc) => /pan[\s-]?india/i.test(String(loc))));
    const locations = (job.workLocations || []).filter(Boolean);
    if (!locations.length) {
      if (job.walkinLocation) locations.push(job.walkinLocation);
      else if (job.address) locations.push(job.address);
      else if (job.location) locations.push(job.location);
    }
    const states = job.workStates || [];
    const who = job.whoCanApply || job.requirements || [];
    const edu = job.educationalQualification || [];
    const tech = job.technicalSkills || [];
    const soft = job.softSkills || [];
    const selection = job.selectionProcess || [];
    const applySteps = job.applySteps || [];
    const docs = job.documentsRequired || [];
    const notes = job.importantNotes || [];
    const tips = job.resumeTips || [];
    const checklist = job.applyChecklist || [];
    const faqs = job.faqs || [];
    const safety = job.safetyNotes || [];
    const mailApply = mailApplyHref(job);
    const externalApply = externalApplyHref(job);
    const applyCtaHref = mailApply || externalApply || "";
    const applyCtaLabel = mailApply
      ? "Email resume"
      : externalApply
        ? "Official Apply ↗"
        : "";
    const isInternSheet = /intern/i.test(String(job.employmentType || "")) || /intern/i.test(String(job.alertLabel || ""));

    const openRoles = (job.roles || []).filter(Boolean);
    const multiRole = openRoles.length > 1;
    const factRows = [
      [
        multiRole ? "Open positions" : "Job title",
        multiRole
          ? `${openRoles.length} positions${job.vacancyText ? ` · ${job.vacancyText}` : vacancyCount(job) > 0 ? ` · ${vacancyCount(job)} openings` : ""}`
          : openRoles[0] || ""
      ],
      ["Company", job.company],
      ["Reference ID", job.referenceId || ""],
      ["Job type", job.employmentType || job.workStatus || ""],
      [
        "Team / track",
        job.teamName
          ? String(job.teamName).split("(")[0].trim()
          : ""
      ],
      ["Experience", job.experienceRange || job.experienceYears || ""],
      [
        "Work mode",
        job.workMode
          ? String(job.workMode).replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim()
          : ""
      ],
      ["Location", panIndia ? "Pan India" : job.location || ""],
      ["Posting start", job.postingStartDate ? formatDate(job.postingStartDate) : ""],
      ["Deadline", job.applyDeadline === "Rolling" ? "Open / Rolling" : formatDate(job.applyDeadline) || ""],
      ["Salary / stipend", job.salaryRange || job.salary || ""]
    ].filter(([, v]) => v);

    let sectionNo = 0;
    const nextNum = () => String(++sectionNo).padStart(2, "0");
    const locationTitle = panIndia
      ? "Work locations (Pan India)"
      : locations.length > 1
        ? "Work locations"
        : "Work location";
    const locationNoteDefault = panIndia
      ? "Exact city depends on business requirements and team allocation."
      : job.walkinLocation
        ? `Primary walk-in venue (Kochi): ${job.walkinLocation}`
        : "Select a city to see matching roles.";
    const cityVenues = job.cityVenues || {};
    const canFilterCities =
      locations.length > 1 &&
      openRoles.some((role) => citiesInText(role, locations).length > 0);
    const openRolesHtml = openRoles.length
      ? `<ul class="job-role-grid"${canFilterCities ? ' data-city-filterable="true"' : ""}>${openRoles
          .map((role, i) => {
            const cities = roleCitiesAttr(role, locations);
            return `<li${cities ? ` data-cities="${escapeAttr(cities)}"` : ""}><span class="job-role-num">${String(
              i + 1
            ).padStart(2, "0")}</span><span>${escapeHtml(role)}</span></li>`;
          })
          .join("")}</ul>`
      : "";
    const locationsHtml = canFilterCities
      ? `
            <p class="job-sheet-note" style="margin-top:0;margin-bottom:0.65rem">Tap a city to show only that city’s roles below.</p>
            ${locationFilterChips(locations, cityVenues)}
            ${states.length ? `<p class="job-sheet-subhead">States / regions on official posting</p>${chipsRow(states, "job-sheet-chips")}` : ""}
            <p class="job-sheet-note" data-city-venue-note data-default-venue="${escapeAttr(
              job.walkinLocation || ""
            )}">${escapeHtml(locationNoteDefault)}</p>
          `
      : `
            ${chipsRow(locations, "job-sheet-chips")}
            ${states.length ? `<p class="job-sheet-subhead">States / regions on official posting</p>${chipsRow(states, "job-sheet-chips")}` : ""}
            ${
              panIndia
                ? `<p class="job-sheet-note">Exact city depends on business requirements and team allocation.</p>`
                : job.walkinLocation
                  ? `<p class="job-sheet-note">Walk-in venue: ${escapeHtml(job.walkinLocation)}</p>`
                  : ""
            }
          `;

    const walkDate = walkInDateText(job);
    const walkTime = job.walkinTime || "";
    const walkVenue = job.walkinLocation || job.address || "";
    const walkinLead =
      job.walkinHeadline ||
      (isWalkInJob(job)
        ? [
            walkDate || "Walk-in drive",
            walkTime,
            "Fast apply — walk in with resume or email now"
          ]
            .filter(Boolean)
            .join(" · ")
        : "");
    const sheetApplyLabel = isWalkInJob(job)
      ? mailApply
        ? "Fast apply — Email resume"
        : applyCtaLabel
      : applyCtaLabel;

    return `
      <section class="job-alert-banner${job.urgentHiring ? " job-alert-banner--urgent" : ""}${
        isWalkInJob(job) ? " job-alert-banner--walkin" : ""
      }" aria-label="Job hiring alert">
        <p class="job-alert-banner-label">${escapeHtml(
          job.alertLabel || (isWalkInJob(job) ? "WALK-IN DRIVE · FAST APPLY" : "JOB ALERT")
        )}</p>
        <h2>${escapeHtml(
          isWalkInJob(job)
            ? `${job.company} — walk-in hiring drive${walkDate ? ` · ${walkDate}` : ""}`
            : multiRole
              ? `${job.company} — ${openRoles.length} open positions`
              : `${openRoles[0] || "Role"} — full hiring sheet`
        )}</h2>
        <p>${escapeHtml(
          walkinLead ||
            "Everything you need in one clear sheet. Scan fast → apply only on the official company channel."
        )}</p>
        ${
          isWalkInJob(job)
            ? `<div class="job-alert-walkin-strip" role="note">
                <strong>Walk-in drive</strong>
                <span>${escapeHtml(walkDate || "Date on company notice")}${
                  walkTime ? ` · ${escapeHtml(walkTime)}` : ""
                }</span>
                ${walkVenue ? `<span>${escapeHtml(walkVenue)}</span>` : ""}
                <em>Fast apply — don’t wait. Walk in with resume or email today.</em>
              </div>`
            : ""
        }
        ${
          applyCtaHref
            ? `<a class="btn btn-primary job-alert-apply" href="${escapeAttr(applyCtaHref)}" ${
                externalApply ? 'target="_blank" rel="noopener noreferrer"' : ""
              }>${escapeHtml(sheetApplyLabel)}</a>`
            : ""
        }
      </section>

      <section class="job-sheet glass">
        <div class="job-sheet-facts">
          ${factRows
            .map(([label, value]) => {
              const body =
                label === "Company"
                  ? `<a class="job-company-link" href="${escapeAttr(companyPath(job.company))}">${escapeHtml(value)}</a>`
                  : escapeHtml(value);
              return `
            <div class="job-sheet-fact">
              <span class="job-sheet-fact-label">${escapeHtml(label)}</span>
              <strong class="job-sheet-fact-value">${body}</strong>
            </div>`;
            })
            .join("")}
        </div>

        ${
          isWalkInJob(job)
            ? sheetSection(
                nextNum(),
                `Walk-in drive${walkDate ? ` — ${walkDate}` : ""}`,
                `
                  <ul class="job-walkin-lines">
                    <li><span aria-hidden="true">📅</span><span><strong>Date:</strong> ${escapeHtml(
                      walkDate || "Confirm on company notice"
                    )}</span></li>
                    ${
                      walkTime
                        ? `<li><span aria-hidden="true">⏰</span><span><strong>Time:</strong> ${escapeHtml(
                            walkTime
                          )}</span></li>`
                        : ""
                    }
                    ${
                      walkVenue
                        ? `<li><span aria-hidden="true">📍</span><span><strong>Venue:</strong> ${escapeHtml(
                            walkVenue
                          )}</span></li>`
                        : ""
                    }
                    <li><span aria-hidden="true">⚡</span><span><strong>Fast apply:</strong> Walk in with your updated resume${
                      job.email
                        ? `, or email <a href="mailto:${escapeAttr(job.email)}">${escapeHtml(job.email)}</a> if you cannot attend`
                        : ""
                    }.</span></li>
                  </ul>
                  <p class="job-walkin-note">Arrive early. Carry resume + valid ID. Mention the role you want. Never pay any fee to apply.</p>
                `
              )
            : ""
        }

        ${sheetSection(nextNum(), locationTitle, locationsHtml)}

        ${sheetSection(
          nextNum(),
          multiRole ? `All open positions (${openRoles.length})` : "Open position",
          openRolesHtml
        )}

        ${sheetSection(nextNum(), "Who can apply?", listBlock(who))}

        ${sheetSection(nextNum(), "Educational qualification", listBlock(edu))}

        ${sheetSection(
          nextNum(),
          isInternSheet ? "Internship overview (official JD)" : "Role responsibilities",
          `
            ${job.teamName ? `<p class="job-sheet-note"><strong>Track:</strong> ${escapeHtml(job.teamName)}</p>` : ""}
            ${listBlock(job.responsibilities)}
          `
        )}

        ${sheetSection(
          nextNum(),
          "Skills preferred",
          `
            ${tech.length ? `<p class="job-sheet-subhead">Technical</p>${chipsRow(tech, "job-sheet-chips job-sheet-chips--tech")}` : ""}
            ${soft.length ? `<p class="job-sheet-subhead">Soft skills</p>${chipsRow(soft, "job-sheet-chips job-sheet-chips--soft")}` : ""}
            ${!tech.length && !soft.length ? listBlock(job.skills) : ""}
          `
        )}

        ${sheetSection(nextNum(), "Selection process", numberedList(selection))}

        ${sheetSection(
          nextNum(),
          "How to apply",
          `
            ${applySteps.length ? numberedList(applySteps) : job.howToApply ? `<p class="job-detail-text">${escapeHtml(job.howToApply)}</p>` : ""}
            ${
              externalApply
                ? `<a class="job-sheet-link" href="${escapeAttr(externalApply)}" target="_blank" rel="noopener noreferrer"><strong>Official application link</strong><span>${escapeHtml(externalApply)}</span></a>`
                : mailApply
                  ? `<a class="job-sheet-link" href="${escapeAttr(mailApply)}"><strong>Email resume</strong><span>${escapeHtml(job.email || mailApply.replace(/^mailto:/i, ""))}</span></a>`
                  : ""
            }
          `
        )}

        ${sheetSection(
          nextNum(),
          "Before you apply — checklist",
          checklist.length
            ? `<ul class="job-detail-bullets job-sheet-checklist">${checklist
                .map((item) => `<li>${escapeHtml(item)}</li>`)
                .join("")}</ul>`
            : ""
        )}

        ${sheetSection(nextNum(), "Documents to keep ready", listBlock(docs))}

        ${sheetSection(nextNum(), "Resume tips", listBlock(tips))}

        ${sheetSection(nextNum(), "Interview / prep tips", listBlock(job.interviewTips))}

        ${sheetSection(nextNum(), isInternSheet ? "Career growth after internship" : "Why join", listBlock(job.benefits))}

        ${sheetSection(
          nextNum(),
          "Quick FAQs",
          faqs.length
            ? `<div class="job-sheet-faqs">${faqs
                .map((item) => {
                  const parts = String(item).split("?");
                  if (parts.length < 2) return `<p class="job-detail-text">${escapeHtml(item)}</p>`;
                  const q = `${parts[0]}?`;
                  const a = parts.slice(1).join("?").trim();
                  return `<div class="job-sheet-faq"><strong>${escapeHtml(q)}</strong><span>${escapeHtml(a)}</span></div>`;
                })
                .join("")}</div>`
            : ""
        )}

        ${sheetSection(
          nextNum(),
          "Important notes",
          notes.length
            ? `<ul class="job-detail-bullets job-sheet-notes">${notes
                .map((n) => `<li>${escapeHtml(n)}</li>`)
                .join("")}</ul>`
            : ""
        )}

        ${sheetSection(
          nextNum(),
          "Safety · fraud alert",
          safety.length
            ? `<div class="job-sheet-safety">${listBlock(safety)}<p class="job-sheet-note">InfoparkDaily is not the employer. Always verify with the company before sharing documents. Never pay a fee to apply.</p></div>`
            : ""
        )}
      </section>
    `;
  }

  function relatedJobsBlock(job) {
    const tags = new Set((job.tags || []).map((t) => String(t).toLowerCase()));
    const related = JOBS.filter((other) => {
      if (other === job) return false;
      if (deadlineStatus(other) === "expired") return false;
      const otherTags = (other.tags || []).map((t) => String(t).toLowerCase());
      return otherTags.some((t) => tags.has(t)) || other.experience === job.experience;
    })
      .sort((a, b) => String(b.postedDate || "").localeCompare(String(a.postedDate || "")))
      .slice(0, 3);

    if (!related.length) return "";

    const cards = related
      .map((other) => {
        const status = deadlineStatus(other);
        const pill = deadlineLabel(other);
        const st = listingStatusMeta(other);
        return `
          <a class="job-related-card glass" href="${jobPath(other.id)}">
            <div class="job-logo-wrap job-logo-wrap--text" data-initials="${escapeAttr(initials(other.company))}" aria-hidden="true">
              <span class="job-logo-fallback">${escapeHtml(initials(other.company))}</span>
            </div>
            <div class="job-related-copy">
              <span class="ej-status ej-status--${st.cls}">${st.label}</span>
              <strong>${escapeHtml(other.company)}</strong>
              <span>${escapeHtml((other.roles || [])[0] || "")}${(other.roles || []).length > 1 ? ` +${(other.roles || []).length - 1}` : ""}</span>
              ${pill ? `<span class="job-deadline-pill job-deadline-pill--${status}">${escapeHtml(pill)}</span>` : ""}
            </div>
          </a>
        `;
      })
      .join("");

    return `
      <section class="job-related">
        <div class="section-heading">
          <p class="eyebrow">Keep exploring</p>
          <h2>More openings you may like</h2>
        </div>
        <div class="job-related-grid">${cards}</div>
      </section>
    `;
  }

  /* ---------- main render ---------- */

  function renderJob(job) {
    const exp = job.experience || "both";
    const badgeLabel = EXP_LABELS[exp] || EXP_LABELS.both;
    const mark = initials(job.company);
    const status = deadlineStatus(job);
    const expired = status === "expired";
    const countdown = deadlineLabel(job);
    const roles = (job.roles || [])
      .map((role, i) => `<li><span class="job-role-num">${String(i + 1).padStart(2, "0")}</span><span>${escapeHtml(role)}</span></li>`)
      .join("");

    const massSeo = isMassHiring(job) ? defaultMassSeo(job) : null;
    document.title =
      job.seoTitle ||
      (massSeo && massSeo.title) ||
      `${job.company} — ${(job.roles || [])[0] || "Hiring"} | InfoparkDaily`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        job.seoDescription ||
          (massSeo && massSeo.description) ||
          `${job.company} hiring in ${job.location || "Kerala"} — verified roles, requirements, and apply details on InfoparkDaily.`
      );
    }

    const onSiteApply = usesOnSiteApply(job);
    const applyUrl = onSiteApply ? "" : externalApplyHref(job);
    const loc = job.locationDetails || {};
    const factRows = [
      ["Job title", (job.roles || [])[0] || ""],
      ["Company", job.companyLegalName || job.company],
      ["Reference / job ID", job.referenceId || job.jobCode || job.jobIdOfficial || ""],
      ["Job type", job.employmentType || job.workStatus || ""],
      ["Experience", job.experienceRange || job.experienceYears || badgeLabel || ""],
      ["Work mode", isKnown(job.workMode) ? job.workMode : ""],
      ["Location", job.location || ""],
      ["Industry", isKnown(job.industry) ? job.industry : ""],
      ["Posted", job.postedDate ? formatDate(job.postedDate) : ""],
      [
        "Deadline",
        job.applyDeadline === "Rolling"
          ? "Open / Rolling"
          : job.applyDeadline
            ? formatDate(job.applyDeadline)
            : ""
      ],
      ["Notice period", isKnown(job.noticePeriod) ? job.noticePeriod : ""],
      ["Vacancies", isMassHiring(job) ? `${vacancyLabel(job) || "100+"} openings` : vacancyCount(job) > 0 ? String(vacancyCount(job)) : ""],
      ["Qualification", qualificationText(job)],
      ["Apply email", job.email || ""],
      ["Phone", usablePhone(job.phone)]
    ].filter(([, v]) => isKnown(v));

    const who =
      (job.whoCanApply && job.whoCanApply.length ? job.whoCanApply : null) ||
      (job.whoShouldApply && job.whoShouldApply.length ? job.whoShouldApply : null) ||
      job.requirements ||
      [];
    const edu = job.educationalQualification || [];
    const tech = (job.technicalSkills || []).filter((x) => isKnown(x));
    const soft = (job.softSkills || []).filter((x) => isKnown(x));
    const skillFallback = (job.skills || []).filter((x) => isKnown(x));
    const selection = usefulItems(job.selectionProcess || job.hiringProcess || []);
    const applySteps = usefulItems(job.applySteps || []);
    const docs = usefulItems(job.documentsRequired || []);
    const notes = usefulItems(job.importantNotes || []);
    const tips = usefulItems(job.resumeTips || job.interviewTips || []);
    const checklist = usefulItems(job.applyChecklist || []);
    const sheetFaqs = (job.faqs && job.faqs.length ? job.faqs : job.faq) || [];
    const safety = usefulItems(job.safetyNotes || []).length
      ? usefulItems(job.safetyNotes)
      : onSiteApply
        ? [
            "Never pay anyone for a job, registration, or interview.",
            "Do not share OTP, passwords, or bank details with recruiters.",
            "Apply only through the InfoparkDaily form on this page for this listing."
          ]
        : [
            "Never pay anyone for a job, registration, or interview.",
            "Do not share OTP, passwords, or bank details with recruiters.",
            "Apply only through the official email / website links on this page."
          ];
    const benefits = usefulItems(job.benefits || []);
    const responsibilities = usefulItems(job.responsibilities || []);
    const openRoles = (job.roles || []).filter((x) => isKnown(x));
    const whoList = usefulItems(who);
    const eduList = usefulItems(edu);

    const applyCtaLabel = onSiteApply
      ? "Apply now"
      : isMassHiring(job)
        ? mailApplyHref(job)
          ? "Send resume"
          : applyUrl
            ? "Apply on official site"
            : "Apply now"
        : mailApplyHref(job)
          ? "Email to apply"
          : applyUrl
            ? "Apply on official site"
            : "Apply now";
    const applyCtaHref = onSiteApply
      ? "#apply"
      : mailApplyHref(job) || applyUrl || "";

    const aboutBody = pickJobDescriptionHtml(job);

    const locationBody = `
      ${kvGrid([
        ["Listed location", job.location],
        ["Office address", loc.officeAddress || job.address],
        ["Infopark campus", loc.campus],
        ["Building", loc.building],
        ["City", loc.city],
        ["PIN", loc.pin]
      ])}
      <div class="job-map-wrap">${mapBlock(job)}</div>
    `;

    const skillsBody = [
      tech.length
        ? `<p class="job-sheet-subhead">Technical</p>${chipsRow(tech, "job-sheet-chips job-sheet-chips--tech")}`
        : "",
      soft.length
        ? `<p class="job-sheet-subhead">Soft skills</p>${chipsRow(soft, "job-sheet-chips job-sheet-chips--soft")}`
        : "",
      !tech.length && !soft.length
        ? chipsRow(skillFallback, "job-sheet-chips") || listBlock(skillFallback)
        : ""
    ].join("");

    const howToApplyBody = [
      applySteps.length ? numberedList(applySteps) : "",
      !applySteps.length && isKnown(job.howToApply)
        ? `<p class="job-detail-text">${escapeHtml(job.howToApply)}</p>`
        : "",
      onSiteApply
        ? `<p class="job-detail-text">Use the <a href="#apply">application form below</a> to submit your resume and portfolio. InfoparkDaily emails a cover letter to our official inbox and stores your application for review.</p>`
        : applyMethodsBlock(job),
      !onSiteApply && applyUrl
        ? `<a class="job-sheet-link" href="${escapeAttr(applyUrl)}" target="_blank" rel="noopener noreferrer"><strong>Official application link</strong><span>${escapeHtml(applyUrl)}</span></a>`
        : ""
    ].join("");

    const onSiteApplyFormHtml =
      onSiteApply && !expired && window.IPDJobApply && typeof window.IPDJobApply.formHtml === "function"
        ? window.IPDJobApply.formHtml(job)
        : onSiteApply && !expired
          ? `<section class="ipd-apply" id="apply"><p class="job-detail-text">Application form is loading… Refresh if it does not appear.</p></section>`
          : "";

    const checklistBody = checklist.length
      ? `<ul class="job-detail-bullets job-sheet-checklist">${checklist
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join("")}</ul>`
      : onSiteApply
        ? `<ul class="job-detail-bullets job-sheet-checklist">
          <li>Fill the InfoparkDaily application form on this page</li>
          <li>Upload resume (PDF / DOC) and add portfolio or LinkedIn</li>
          <li>Confirm role, location, and deadline on this listing</li>
          <li>No one asked for money — application should be free</li>
        </ul>`
        : `<ul class="job-detail-bullets job-sheet-checklist">
          <li>Open the official apply link or email on this page</li>
          <li>Confirm role, location, and deadline on the company / Infopark listing</li>
          <li>Resume PDF ready</li>
          <li>No one asked for money — application should be free</li>
        </ul>`;

    const docsBody = docs.length
      ? listBlock(docs)
      : listBlock(["Updated resume (PDF preferred)", "Other documents only if the company asks"]);

    const notesBody = notes.length
      ? listBlock(notes)
      : isKnown(job.hiringNotes)
        ? `<p class="job-detail-text">${escapeHtml(job.hiringNotes)}</p>`
        : "";

    const safetyBody = `${listBlock(safety)}
      <p class="job-sheet-note"><a href="/contact/">Report fee requests or false listings →</a></p>`;

    const companyBody = `
      <div class="jd-company-row">
        <div class="job-logo-wrap job-logo-wrap--text" data-initials="${escapeAttr(mark)}" aria-hidden="true">
          <span class="job-logo-fallback">${escapeHtml(mark)}</span>
        </div>
        <div>
          <strong><a class="job-company-link" href="${escapeAttr(companyPath(job.company))}">${escapeHtml(
            job.companyLegalName || job.company
          )}</a></strong>
          <p class="jd-company-loc">${escapeHtml(job.location || "")}</p>
          ${
            isKnown(job.industry)
              ? `<p class="jd-company-industry">${escapeHtml(job.industry)}</p>`
              : ""
          }
        </div>
      </div>
      ${
        isKnown(job.companyDetails)
          ? textBlock(job.companyDetails)
          : isKnown(job.jobSummary)
            ? textBlock(job.jobSummary)
            : ""
      }
    `;

    const additionalBody = kvGrid([
      ["Job type", job.employmentType || job.workStatus],
      ["Experience", job.experienceRange || job.experienceYears || badgeLabel],
      ["Work mode", job.workMode || workModeDisplay(job)],
      ["Salary", salaryDisplay(job) !== "Not disclosed" ? salaryDisplay(job) : ""],
      ["Vacancies", isMassHiring(job) ? `${vacancyLabel(job) || "100+"} openings` : vacancyCount(job) > 0 ? String(vacancyCount(job)) : ""],
      ["Notice period", job.noticePeriod],
      ["Starting date", job.startingDate],
      ["Reference / job ID", job.referenceId || job.jobCode || job.jobIdOfficial],
      ["Qualification", qualificationText(job)],
      ["Industry", job.industry],
      ["Posted", job.postedDate ? formatDate(job.postedDate) : ""],
      [
        "Deadline",
        job.applyDeadline === "Rolling"
          ? "Open / Rolling"
          : job.applyDeadline
            ? formatDate(job.applyDeadline)
            : ""
      ],
      ["Source", job.source]
    ]);

    const st = listingStatusMeta(job);
    const roleTitle =
      (job.roles || []).length > 1
        ? `${(job.roles || []).length} open positions`
        : (job.roles || [])[0] || "Hiring";

    const mainContent = `
      <div class="jd-main">
        ${contentPanel("desc", "Job description", aboutBody)}
        ${contentPanel("req", "Requirements", listBlock(whoList))}
        ${contentPanel("nice", "Good to have", listBlock(usefulItems(job.goodToHave || [])))}
        ${contentPanel("resp", "Responsibilities", listBlock(responsibilities))}
        ${contentPanel("skills", "Required skills", skillsBody)}
        ${contentPanel("info", "Additional details", additionalBody)}
        ${contentPanel(
          "roles",
          openRoles.length > 1 ? "Open roles" : "Role",
          openRoles.length > 1
            ? `<ul class="job-role-grid">${roles}</ul>`
            : openRoles.length
              ? `<p class="job-detail-text">${escapeHtml(openRoles[0])}</p>`
              : ""
        )}
        ${contentPanel("edu", "Educational qualification", listBlock(eduList))}
        ${contentPanel("apply", "How to apply", howToApplyBody)}
        ${onSiteApplyFormHtml}
        ${contentPanel("loc", "Location / office", locationBody)}
        ${walkInBlock(job)}
        ${contentPanel("process", "Selection process", numberedList(selection))}
        ${whyJoinBlock(job)}
        ${contactHighlightBlock(job)}
        ${contentPanel("check", "Before you apply — checklist", checklistBody)}
        ${contentPanel("docs", "Documents to keep ready", docsBody)}
        ${contentPanel("tips", "Resume / interview tips", listBlock(tips))}
        ${isMassHiring(job) ? "" : contentPanel("perk", "Benefits", listBlock(benefits))}
        ${contentPanel("company", "Company", companyBody)}
        ${contentPanel("faq", "Quick FAQs", faqBlock(sheetFaqs))}
        ${contentPanel("notes", "Important notes", notesBody)}
        ${contentPanel("safety", "Safety", safetyBody)}
        ${contentPanel("links", "Official links", officialLinksBlock(job))}
        ${job.verificationReport ? contentPanel("verify", "Verification report", verificationReportBlock(job)) : ""}

        <section class="job-sheet-facts jd-facts-grid">
          ${factRows
            .map(([label, value]) => {
              const body =
                label === "Company"
                  ? `<a class="job-company-link" href="${escapeAttr(companyPath(job.company))}">${escapeHtml(value)}</a>`
                  : label === "Apply email"
                    ? `<a href="mailto:${escapeAttr(value)}">${escapeHtml(value)}</a>`
                    : escapeHtml(value);
              return `
            <div class="job-sheet-fact">
              <span class="job-sheet-fact-label">${escapeHtml(label)}</span>
              <strong class="job-sheet-fact-value">${body}</strong>
            </div>`;
            })
            .join("")}
        </section>
      </div>
    `;

    const premiumHero = `
      <section class="jd-hero${expired ? " jd-hero--expired" : ""}">
        <div class="jd-hero-top">
          <div class="jd-hero-identity">
            <div class="job-logo-wrap job-logo-wrap--lg job-logo-wrap--text jd-company-mark" data-initials="${escapeAttr(mark)}" aria-hidden="true">
              <span class="job-logo-fallback">${escapeHtml(mark)}</span>
            </div>
            <div class="jd-hero-copy">
              <div class="jd-title-row">
                <h1>${escapeHtml(roleTitle)}</h1>
                <div class="jd-hero-badges">
                  <span class="jd-type-pill">${escapeHtml(typeBadgeLabel(job))}</span>
                  <span class="ej-status ej-status--${st.cls}">${st.label}</span>
                  ${!expired && isMassHiring(job) ? massHiringBadgeHtml() : ""}
                  ${countdown ? `<span class="job-deadline-pill job-deadline-pill--${status}">${escapeHtml(countdown)}</span>` : ""}
                  ${job.verified ? `<span class="job-badge job-badge--verified">Verified</span>` : ""}
                </div>
              </div>
              <ul class="jd-hero-meta">
                <li class="jd-meta jd-meta--company"><a class="job-company-link" href="${escapeAttr(companyPath(job.company))}">${escapeHtml(
                  job.companyLegalName || job.company
                )}</a></li>
                ${job.location ? `<li class="jd-meta jd-meta--loc">${escapeHtml(job.location)}</li>` : ""}
                ${postedLabel(job) ? `<li class="jd-meta jd-meta--date">${escapeHtml(postedLabel(job))}</li>` : ""}
              </ul>
              ${
                isWalkInJob(job)
                  ? `<p class="job-hero-walkin-callout">Walk-in drive · ${escapeHtml(
                      walkInDateText(job) || "Check date below"
                    )}${job.walkinTime ? ` · ${escapeHtml(job.walkinTime)}` : ""}</p>`
                  : ""
              }
            </div>
          </div>
          <div class="jd-hero-actions">
            ${
              !expired && applyCtaHref
                ? `<a class="btn btn-primary jd-apply-btn" href="${escapeAttr(applyCtaHref)}" ${
                    applyUrl && !onSiteApply ? 'target="_blank" rel="noopener noreferrer"' : ""
                  }>${escapeHtml(applyCtaLabel)}</a>`
                : `<a class="btn btn-secondary jd-apply-btn" href="/jobs/">${expired ? "See live jobs" : "Browse jobs"}</a>`
            }
          </div>
        </div>
        ${premiumFactTiles(job)}
      </section>
    `;

    root.innerHTML = `
      <div class="jd-page">
        <div class="jd-toolbar">
          <a class="jd-back" href="/jobs/">← Back to jobs</a>
          <button type="button" class="btn btn-ghost jd-share-btn" id="job-copy-link">Share this job</button>
        </div>

        ${
          expired
            ? `<div class="job-expired-banner" role="status">
                <span class="job-badge job-badge--expired">EXPIRED</span>
                <strong>Do not apply or travel for this role unless the company confirms it is still open.</strong>
                <p>
                  Deadline was ${escapeHtml(formatDate(job.applyDeadline))}.
                  This page is kept for reference only.
                  <a href="/jobs/">Browse open jobs →</a>
                </p>
              </div>`
            : ""
        }

        ${premiumHero}
        ${verifyBeforeApplyNote()}

        <div class="jd-layout">
          ${mainContent}
          ${applySidebarCard(job, expired, applyCtaHref, applyCtaLabel, applyUrl)}
        </div>

        ${
          !expired && applyCtaHref
            ? `<div class="jd-mobile-cta" aria-hidden="false">
                <a class="btn btn-primary" href="${escapeAttr(applyCtaHref)}" ${
                  applyUrl && !onSiteApply ? 'target="_blank" rel="noopener noreferrer"' : ""
                }>${escapeHtml(applyCtaLabel)}</a>
              </div>`
            : ""
        }

        ${shareBlock(job)}
        ${channelsBlock()}
        ${relatedJobsBlock(job)}
      </div>
    `;

    if (job.canonicalUrl) {
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", job.canonicalUrl);
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute("content", job.canonicalUrl);
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", job.ogTitle || job.seoTitle || document.title);
    }
    injectJobPostingSchema(job);

    const copyBtn = document.getElementById("job-copy-link");
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          copyBtn.textContent = "Link copied!";
          setTimeout(() => (copyBtn.textContent = "Share this job"), 2000);
        } catch (_e) {
          copyBtn.textContent = window.location.href;
        }
      });
    }

    const atsCard = root.querySelector(".jd-ats-card");
    if (atsCard) {
      atsCard.addEventListener("click", () => {
        try {
          sessionStorage.setItem("ipd-ats-jd", jobDescriptionForAts(job));
          sessionStorage.setItem("ipd-ats-title", (job.roles || [])[0] || job.company || "this job");
        } catch (_e) {
          /* ignore */
        }
      });
    }

    if (usesOnSiteApply(job) && window.IPDJobApply && typeof window.IPDJobApply.bind === "function") {
      window.IPDJobApply.bind(job);
    }

    bindCityRoleFilter(root);
  }

  if (typeof JOBS === "undefined") {
    renderDataError();
    return;
  }

  const jobId = getJobId();
  if (!jobId && window.__IPD_IS_JOB_ROUTE__ === false) {
    renderMissing();
    return;
  }

  const job = findJob(jobId);
  if (!job) {
    renderMissing();
    return;
  }

  // Keep shareable clean URL in the address bar.
  const cleanPath = jobPath(job.id);
  if (window.location.pathname.replace(/\/$/, "") !== cleanPath) {
    try {
      window.history.replaceState({}, "", cleanPath);
    } catch (_e) {
      /* ignore */
    }
  }

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", `https://infoparkdaily.online${cleanPath}`);
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", `https://infoparkdaily.online${cleanPath}`);

  renderJob(job);
})();
