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
      month: "short",
      year: "numeric"
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

  function heroStatStrip(job) {
    const deadline =
      job.applyDeadline === "Rolling"
        ? "Open until filled"
        : job.applyDeadline
          ? formatDate(job.applyDeadline)
          : "";
    const modeRaw = isKnown(job.workMode) ? String(job.workMode) : "";
    const modeShort = modeRaw
      ? modeRaw
          .replace(/\s*·\s*Infopark Kochi/i, "")
          .replace(/\s+/g, " ")
          .trim()
      : "";
    const stats = [
      ["Location", job.location || ""],
      ["Experience", job.experienceRange || job.experienceYears || EXP_LABELS[job.experience] || ""],
      ["Type", job.employmentType || job.workStatus || ""],
      ["Mode", modeShort || modeRaw],
      ["Apply before", deadline]
    ].filter(([, value]) => value);

    if (!stats.length) return "";
    return `
      <div class="job-hero-stats job-hero-stats--sheet" role="list">
        ${stats
          .map(
            ([label, value]) => `
              <div class="job-hero-stat" role="listitem">
                <span class="job-hero-stat-label">${escapeHtml(label)}</span>
                <span class="job-hero-stat-value">${escapeHtml(value)}</span>
              </div>
            `
          )
          .join("")}
      </div>
    `;
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
      job.source === "Infopark" || links.infoparkProfile
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
        <a class="job-apply-method" href="mailto:${escapeAttr(job.email)}">
          <span class="job-apply-method-icon job-apply-method-icon--mail" aria-hidden="true">@</span>
          <span class="job-apply-method-body">
            <strong>Apply email</strong>
            <span>${escapeHtml(job.email)}</span>
          </span>
        </a>
      `);
    }

    const careers =
      job.applyLink && !String(job.applyLink).startsWith("mailto:") ? job.applyLink : "";
    if (careers) {
      methods.push(`
        <a class="job-apply-method" href="${escapeAttr(careers)}" target="_blank" rel="noopener noreferrer">
          <span class="job-apply-method-icon job-apply-method-icon--web" aria-hidden="true">↗</span>
          <span class="job-apply-method-body">
            <strong>Official apply / careers</strong>
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
      <section class="job-panel glass">
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
    const externalApply =
      job.applyLink && !String(job.applyLink).startsWith("mailto:") ? job.applyLink : "";
    const mailApply = job.applyLink && String(job.applyLink).startsWith("mailto:")
      ? job.applyLink
      : job.email
        ? `mailto:${job.email}`
        : "";
    const applyCtaHref = externalApply || mailApply || "";
    const applyCtaLabel = externalApply
      ? "Official Apply ↗"
      : mailApply
        ? "Email resume"
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
            <p class="job-sheet-note" style="margin-top:0;margin-bottom:0.65rem">Tap a city to show only that city’s roles.</p>
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

        ${sheetSection(
          nextNum(),
          multiRole ? `All open positions (${openRoles.length})` : "Open position",
          openRolesHtml
        )}

        ${sheetSection(nextNum(), locationTitle, locationsHtml)}

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
        return `
          <a class="job-related-card glass" href="${jobPath(other.id)}">
            <div class="job-logo-wrap job-logo-wrap--text" data-initials="${escapeAttr(initials(other.company))}" aria-hidden="true">
              <span class="job-logo-fallback">${escapeHtml(initials(other.company))}</span>
            </div>
            <div class="job-related-copy">
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

    const applyUrl = (() => {
      const link = String(job.applyLink || "").trim();
      if (link && !link.toLowerCase().startsWith("mailto:")) return link;
      // Email / walk-in posts: do not pretend the company website is the apply link
      if (link.toLowerCase().startsWith("mailto:") || job.email) return "";
      const web = String(job.website || "").trim();
      if (/^https?:\/\//i.test(web)) return web;
      return "";
    })();
    const isSheet = Boolean(job.alertSheet);
    const loc = job.locationDetails || {};

    // Same clear “hiring sheet” style as /job/wipro-intern-l1 — only known, useful facts.
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

    let sectionNo = 0;
    const addSheet = (title, bodyHtml) => {
      if (!hasSheetBody(bodyHtml)) return "";
      const num = String(++sectionNo).padStart(2, "0");
      return sheetSection(num, title, bodyHtml);
    };

    const applyCtaLabel = isMassHiring(job)
      ? job.email && !applyUrl
        ? "📩 Send Resume"
        : "🚀 Apply Now"
      : job.email && !applyUrl
        ? `Email ${job.email}`
        : "Official Apply ↗";
    const applyCtaHref = applyUrl || (job.email ? `mailto:${job.email}` : "");

    const aboutBody = [
      isKnown(job.companyDetails)
        ? `<p class="job-detail-text">${escapeHtml(shortPlainText(job.companyDetails, 320))}</p>`
        : "",
      isKnown(job.workDetails)
        ? `<p class="job-detail-text">${escapeHtml(shortPlainText(job.workDetails, 220))}</p>`
        : "",
      !isKnown(job.companyDetails) && !isKnown(job.workDetails) && isKnown(job.jobSummary)
        ? `<p class="job-detail-text">${escapeHtml(shortPlainText(job.jobSummary, 220))}</p>`
        : ""
    ].join("");

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
      applyMethodsBlock(job),
      applyUrl
        ? `<a class="job-sheet-link" href="${escapeAttr(applyUrl)}" target="_blank" rel="noopener noreferrer"><strong>Official application link</strong><span>${escapeHtml(applyUrl)}</span></a>`
        : ""
    ].join("");

    const checklistBody = checklist.length
      ? `<ul class="job-detail-bullets job-sheet-checklist">${checklist
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join("")}</ul>`
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

    const standardLayout = `
      <section class="job-alert-banner" aria-label="Job hiring sheet">
        <p class="job-alert-banner-label">${escapeHtml(job.alertLabel || "JOB ALERT · INFOPARKDAILY")}</p>
        <h2>${escapeHtml((job.roles || [])[0] || job.company)} — hiring sheet</h2>
        <p>Clear facts only — scan fast, then apply on the official company channel.</p>
        ${
          applyCtaHref
            ? `<a class="btn btn-primary job-alert-apply" href="${escapeAttr(applyCtaHref)}" ${
                applyUrl ? 'target="_blank" rel="noopener noreferrer"' : ""
              }>${escapeHtml(applyCtaLabel)}</a>`
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

        ${addSheet("About this opening", aboutBody)}
        ${addSheet(
          openRoles.length > 1 ? "Open roles" : "Role",
          openRoles.length > 1
            ? `<ul class="job-role-grid">${roles}</ul>`
            : openRoles.length
              ? `<p class="job-detail-text">${escapeHtml(openRoles[0])}</p>`
              : ""
        )}
        ${addSheet("Location / office", locationBody)}
        ${addSheet("Who can apply?", listBlock(whoList))}
        ${addSheet("Educational qualification", listBlock(eduList))}
        ${addSheet("Role overview / responsibilities", listBlock(responsibilities))}
        ${addSheet("Skills", skillsBody)}
        ${addSheet("Selection process", numberedList(selection))}
        ${addSheet("How to apply", howToApplyBody)}
        ${whyJoinBlock(job)}
        ${walkInBlock(job)}
        ${contactHighlightBlock(job)}
        ${addSheet("Before you apply — checklist", checklistBody)}
        ${addSheet("Documents to keep ready", docsBody)}
        ${addSheet("Resume / interview tips", listBlock(tips))}
        ${isMassHiring(job) ? "" : addSheet("Benefits", listBlock(benefits))}
        ${addSheet("Quick FAQs", faqBlock(sheetFaqs))}
        ${addSheet("Important notes", notesBody)}
        ${addSheet("Safety", safetyBody)}
        ${addSheet("Official links", officialLinksBlock(job))}
      </section>

      ${shareBlock(job)}
      ${channelsBlock()}
    `;

    root.innerHTML = `
      <nav class="job-breadcrumb" aria-label="Breadcrumb">
        <a href="/jobs/">← Job Openings</a>
      </nav>

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

      <section class="job-detail-hero glass job-detail-hero--alert${expired ? " job-detail-hero--expired" : ""}${
        isMassHiring(job) && !expired ? " job-detail-hero--mass" : ""
      }">
        <div class="job-detail-hero-top">
          <div class="job-detail-hero-main">
            <div class="job-logo-wrap job-logo-wrap--lg job-logo-wrap--text" data-initials="${escapeAttr(mark)}" aria-hidden="true">
              <span class="job-logo-fallback">${escapeHtml(mark)}</span>
            </div>
            <div class="job-detail-hero-copy">
              <p class="jobs-kicker">${escapeHtml(
                isMassHiring(job) ? "🔥 Mass Hiring · InfoparkDaily" : job.alertLabel || "Job hiring sheet"
              )}</p>
              <h1 class="job-hero-title">${escapeHtml(
                (job.roles || []).length > 1
                  ? `${(job.roles || []).length} open positions`
                  : (job.roles || [])[0] || "Hiring"
              )}</h1>
              ${
                isWalkInJob(job)
                  ? `<p class="job-hero-walkin-callout">⚡ Walk-in drive · ${escapeHtml(
                      walkInDateText(job) || "Check date below"
                    )}${job.walkinTime ? ` · ${escapeHtml(job.walkinTime)}` : ""} · <strong>Fast apply</strong></p>`
                  : ""
              }
              <p class="job-hero-company">
                🏢 <a class="job-company-link" href="${escapeAttr(companyPath(job.company))}">${escapeHtml(
                  job.companyLegalName || job.company
                )}</a>
              </p>
              ${
                job.companyLegalName && job.companyLegalName !== job.company
                  ? `<p class="job-legal-aka">Listed as <a class="job-company-link" href="${escapeAttr(companyPath(job.company))}">${escapeHtml(job.company)}</a></p>`
                  : ""
              }
              <p class="job-location">📍 ${escapeHtml(job.location || "")}</p>
              ${
                qualificationText(job)
                  ? `<p class="job-hero-qual">🎓 ${escapeHtml(qualificationText(job))}</p>`
                  : ""
              }
              ${
                job.experienceRange || job.experienceYears
                  ? `<p class="job-hero-exp">👨‍💻 ${escapeHtml(job.experienceRange || job.experienceYears)}</p>`
                  : ""
              }
              <div class="job-card-tags">
                ${expired ? `<span class="job-badge job-badge--expired">EXPIRED</span>` : ""}
                ${!expired && isMassHiring(job) ? massHiringBadgeHtml() : ""}
                ${countdown ? `<span class="job-deadline-pill job-deadline-pill--${status}">${escapeHtml(countdown)}</span>` : ""}
                <span class="job-badge job-badge--${escapeAttr(exp)}">${escapeHtml(badgeLabel)}</span>
                ${job.employmentType ? `<span class="job-badge job-badge--intern">${escapeHtml(job.employmentType)}</span>` : ""}
                ${job.verified ? `<span class="job-badge job-badge--verified">Verified</span>` : ""}
                ${job.verificationLevel === "infopark-profile" ? `<span class="job-badge job-badge--verified">Infopark profile</span>` : ""}
                ${
                  isWalkInJob(job) && !(job.alertBadge || job.alertLabel)
                    ? `<span class="job-badge job-badge--walkin">Walk-in Drive</span>`
                    : ""
                }
                ${
                  job.alertSheet || job.urgentHiring || (isWalkInJob(job) && (job.alertBadge || job.alertLabel))
                    ? `<span class="job-badge job-badge--alert${job.urgentHiring ? " job-badge--urgent" : ""}">${escapeHtml(
                        job.alertBadge || job.alertLabel || "Hiring Alert"
                      )}</span>`
                    : ""
                }
                ${
                  /pan[\s-]?india/i.test(String(job.location || "")) ||
                  /pan[\s-]?india/i.test(String(job.alertLabel || ""))
                    ? `<span class="job-badge job-badge--pan">Pan India</span>`
                    : ""
                }
                ${job.industry && isKnown(job.industry) ? `<span class="job-status-chip">${escapeHtml(job.industry)}</span>` : ""}
              </div>
            </div>
          </div>
          <div class="job-detail-hero-actions">
            ${
              !expired && applyUrl
                ? `<a class="btn ${isMassHiring(job) ? "btn-mass-apply" : "btn-primary"}" href="${escapeAttr(applyUrl)}" target="_blank" rel="noopener noreferrer">${
                    isMassHiring(job) ? "🚀 Apply Now" : "Official Apply ↗"
                  }</a>`
                : !expired && job.email
                  ? `<a class="btn ${isMassHiring(job) ? "btn-mass-apply" : "btn-primary"}" href="mailto:${escapeAttr(job.email)}">${
                      isMassHiring(job)
                        ? "📩 Send Resume"
                        : isWalkInJob(job)
                          ? "Fast apply — Email resume"
                          : "Email to apply"
                    }</a>`
                  : ""
            }
            <a class="btn btn-secondary" href="${escapeAttr(companyPath(job.company))}">Company profile</a>
            <a class="btn ${expired ? "btn-primary" : "btn-ghost"}" href="/jobs/">${expired ? "See open jobs" : "All Openings"}</a>
          </div>
        </div>
        ${heroStatStrip(job)}
      </section>

      ${verifyBeforeApplyNote()}

      ${isSheet ? alertSheetBlock(job) : standardLayout}
      ${isSheet ? shareBlock(job) : ""}
      ${isSheet ? channelsBlock() : ""}
      ${relatedJobsBlock(job)}
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
          setTimeout(() => (copyBtn.textContent = "Copy link"), 2000);
        } catch (_e) {
          copyBtn.textContent = window.location.href;
        }
      });
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
