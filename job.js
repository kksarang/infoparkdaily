(function () {
  const root = document.getElementById("job-detail-root");
  if (!root) return;

  const EXP_LABELS = {
    fresher: "Fresher",
    experienced: "Experienced",
    both: "Fresher + Exp"
  };

  const CLOSING_DAYS = 4;
  const DAY_MS = 24 * 60 * 60 * 1000;

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

  function initials(name) {
    return String(name || "?")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");
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
    if (!phone) return "";
    const tel = String(phone).replace(/\s+/g, "");
    return `<a href="tel:${escapeAttr(tel)}">${escapeHtml(phone)}</a>`;
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
    const stats = [
      ["Location", job.location || ""],
      ["Experience", job.experienceRange || job.experienceYears || EXP_LABELS[job.experience] || ""],
      ["Type", job.employmentType || job.workStatus || ""],
      ["Mode", job.workMode ? String(job.workMode).split("(")[0].trim() : ""],
      ["Apply before", deadline],
      ["Published", job.postedDate ? formatDate(job.postedDate) : ""],
      ["Apply email", job.email || ""],
      ["Open roles", String((job.roles || []).length)]
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

  function naText(value) {
    const text = String(value ?? "").trim();
    if (!text || /^not officially available\.?$/i.test(text)) return ND;
    return text;
  }

  function plainOrNd(value) {
    return escapeHtml(naText(value));
  }

  function listOrNd(items) {
    return listBlock(items) || `<p class="job-detail-text">${escapeHtml(ND)}</p>`;
  }

  function kvGrid(pairs) {
    const rows = pairs
      .map(([label, value]) => infoItem(label, typeof value === "string" ? plainOrNd(value) : value || escapeHtml(ND)))
      .join("");
    return rows ? `<dl class="job-info-list job-info-list--grid">${rows}</dl>` : "";
  }

  function quickFactsBlock(job) {
    const qf = job.quickFacts || {};
    return `
      <div class="job-quick-facts" role="list">
        ${[
          ["Company", qf.company || job.companyLegalName || job.company],
          ["Roles", qf.roles || (job.roles || []).join(", ")],
          ["Location", qf.location || job.location],
          ["Type", qf.employmentType || job.employmentType],
          ["Experience", qf.experience || job.experienceRange],
          ["Work mode", qf.workMode || job.workMode],
          ["Salary", qf.salary || job.salaryRange],
          ["Deadline", qf.deadline || job.applyDeadline],
          ["Email", qf.email || job.email || ND],
          ["Phone", qf.phone || job.phone || ND]
        ]
          .map(
            ([label, value]) => `
          <div class="job-quick-fact" role="listitem">
            <span>${escapeHtml(label)}</span>
            <strong>${escapeHtml(naText(value))}</strong>
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
    return `<div class="job-sheet-faqs">${faqs
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
      links.infoparkProfile
        ? infoItem("Infopark company profile", linkHtml(links.infoparkProfile, "View Infopark profile"))
        : "",
      links.infoparkJobs
        ? infoItem("Infopark Jobs portal", linkHtml(links.infoparkJobs, "infopark.in/companies-job"))
        : "",
      links.linkedin ? infoItem("Official LinkedIn", linkHtml(links.linkedin)) : infoItem("Official LinkedIn", escapeHtml(ND)),
      links.contactPage ? infoItem("Official contact page", linkHtml(links.contactPage)) : infoItem("Official contact page", escapeHtml(ND)),
      links.aboutPage ? infoItem("Official about page", linkHtml(links.aboutPage)) : infoItem("Official about page", escapeHtml(ND)),
      links.privacyPolicy ? infoItem("Privacy policy", linkHtml(links.privacyPolicy)) : infoItem("Privacy policy", escapeHtml(ND)),
      links.terms ? infoItem("Terms", linkHtml(links.terms)) : infoItem("Terms", escapeHtml(ND))
    ].join("");
    return rows ? `<dl class="job-info-list">${rows}</dl>` : "";
  }

  function verificationNoticeBlock(job) {
    const notice =
      job.verificationNotice ||
      "InfoparkDaily Verification Notice: Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.";
    const warnings = job.fraudWarning || [];
    return `
      <section class="job-panel glass job-verify-panel">
        <h2>InfoparkDaily Verification Notice</h2>
        <p class="job-detail-text">${escapeHtml(notice)}</p>
        ${listBlock(warnings)}
      </section>
    `;
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
            <strong>Verified apply email</strong>
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

    if (job.phone) {
      methods.push(`
        <a class="job-apply-method" href="tel:${escapeAttr(String(job.phone).replace(/\s+/g, ""))}">
          <span class="job-apply-method-icon job-apply-method-icon--phone" aria-hidden="true">✆</span>
          <span class="job-apply-method-body">
            <strong>Verified phone</strong>
            <span>${escapeHtml(job.phone)}</span>
          </span>
        </a>
      `);
    }

    const steps = job.applySteps && job.applySteps.length
      ? numberedFromArray(job.applySteps)
      : job.howToApply
        ? `<p class="job-detail-text job-apply-steps">${escapeHtml(job.howToApply)}</p>`
        : "";

    if (!methods.length && !steps) {
      return `<p class="job-detail-text">${escapeHtml(ND)}</p>`;
    }
    return `
      ${steps}
      ${methods.length ? `<div class="job-apply-methods">${methods.join("")}</div>` : ""}
    `;
  }

  function walkInBlock(job) {
    if (!job.isWalkIn) return "";
    const rows = [
      infoItem("Drive", escapeHtml(job.walkInDate || "Walk-in drive")),
      infoItem("Venue", escapeHtml(job.address || job.location || "")),
      infoItem("Starting", job.startingDate ? escapeHtml(formatDate(job.startingDate)) : "")
    ].join("");
    return `
      <section class="job-panel glass job-walkin-panel">
        <h2>Walk-in Drive</h2>
        <dl class="job-info-list">${rows}</dl>
        <p class="job-detail-text job-walkin-note">Carry an updated resume and a valid ID. Verify timings with the company before travelling.</p>
      </section>
    `;
  }

  function mapBlock(job) {
    const query =
      (job.locationDetails && job.locationDetails.googleMapsQuery) || job.address || job.location;
    if (!query || query === ND) return "";
    return `
      <div class="job-map-embed" aria-label="Company location map">
        <iframe
          title="${escapeAttr(job.company)} location map"
          src="https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
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

  function numberedList(items) {
    if (!items || !items.length) return "";
    return `<ol class="job-sheet-steps">${items
      .map((item) => `<li>${escapeHtml(String(item).replace(/^\d+\.\s*/, ""))}</li>`)
      .join("")}</ol>`;
  }

  function sheetSection(num, title, bodyHtml) {
    if (!bodyHtml) return "";
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

    const locations = job.workLocations || [];
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
    const applyUrl =
      job.applyLink && !String(job.applyLink).startsWith("mailto:") ? job.applyLink : job.website || "";

    const factRows = [
      ["Job title", (job.roles || [])[0] || "Intern"],
      ["Company", job.company],
      ["Reference ID", job.referenceId || ""],
      ["Job type", job.employmentType || job.workStatus || "Internship"],
      [
        "Team / track",
        job.teamName
          ? String(job.teamName).split("(")[0].trim()
          : ""
      ],
      ["Experience", job.experienceRange || "Freshers / Students"],
      [
        "Work mode",
        job.workMode
          ? String(job.workMode).replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim()
          : ""
      ],
      ["Posting start", job.postingStartDate ? formatDate(job.postingStartDate) : ""],
      ["Deadline", job.applyDeadline === "Rolling" ? "Open / Rolling" : formatDate(job.applyDeadline) || ""],
      [
        "Stipend",
        job.salaryRange
          ? String(job.salaryRange).includes("offer letter")
            ? "As per Wipro offer letter"
            : job.salaryRange
          : ""
      ]
    ].filter(([, v]) => v);

    let sectionNo = 0;
    const nextNum = () => String(++sectionNo).padStart(2, "0");

    return `
      <section class="job-alert-banner" aria-label="Internship job alert">
        <p class="job-alert-banner-label">${escapeHtml(job.alertLabel || "INTERNSHIP JOB ALERT")}</p>
        <h2>${escapeHtml((job.roles || [])[0] || "Intern")} — full hiring sheet</h2>
        <p>Everything you need in one clear sheet. Scan fast → apply only on the official Wipro Careers link.</p>
        ${
          applyUrl
            ? `<a class="btn btn-primary job-alert-apply" href="${escapeAttr(applyUrl)}" target="_blank" rel="noopener noreferrer">Apply on Wipro Careers ↗</a>`
            : ""
        }
      </section>

      <section class="job-sheet glass">
        <div class="job-sheet-facts">
          ${factRows
            .map(
              ([label, value]) => `
            <div class="job-sheet-fact">
              <span class="job-sheet-fact-label">${escapeHtml(label)}</span>
              <strong class="job-sheet-fact-value">${escapeHtml(value)}</strong>
            </div>`
            )
            .join("")}
        </div>

        ${sheetSection(
          nextNum(),
          "Work locations (Pan India)",
          `
            ${chipsRow(locations, "job-sheet-chips")}
            ${states.length ? `<p class="job-sheet-subhead">States / regions on official posting</p>${chipsRow(states, "job-sheet-chips")}` : ""}
            <p class="job-sheet-note">Exact city depends on business requirements and team allocation. Kochi (Kerala) is included on the official listing.</p>
          `
        )}

        ${sheetSection(nextNum(), "Who can apply?", listBlock(who))}

        ${sheetSection(nextNum(), "Educational qualification", listBlock(edu))}

        ${sheetSection(
          nextNum(),
          "Internship overview (official JD)",
          `
            ${job.companyDetails ? `<p class="job-detail-text">${escapeHtml(job.companyDetails)}</p>` : ""}
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
              applyUrl
                ? `<a class="job-sheet-link" href="${escapeAttr(applyUrl)}" target="_blank" rel="noopener noreferrer"><strong>Official application link</strong><span>${escapeHtml(applyUrl)}</span></a>`
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

        ${sheetSection(nextNum(), "Career growth after internship", listBlock(job.benefits))}

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
          `<ul class="job-detail-bullets job-sheet-notes">${(notes || [])
            .map((n) => `<li>${escapeHtml(n)}</li>`)
            .join("")}</ul>`
        )}

        ${sheetSection(
          nextNum(),
          "Safety · fraud alert",
          safety.length
            ? `<div class="job-sheet-safety">${listBlock(safety)}<p class="job-sheet-note">InfoparkDaily is not Wipro HR. Always verify on careers.wipro.com before sharing documents.</p></div>`
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
            <div class="job-logo-wrap" data-initials="${escapeAttr(initials(other.company))}">
              <span class="job-logo-fallback" aria-hidden="true">${escapeHtml(initials(other.company))}</span>
              ${other.logo ? `<img class="job-logo" src="${escapeAttr(assetUrl(other.logo))}" alt="" loading="lazy" onerror="this.remove()" />` : ""}
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

    document.title = job.seoTitle || `${job.company} — ${(job.roles || [])[0] || "Hiring"} | InfoparkDaily`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        job.seoDescription ||
          `${job.company} hiring in ${job.location || "Kerala"} — verified roles, requirements, and apply details on InfoparkDaily.`
      );
    }

    const applyUrl =
      job.applyLink && !String(job.applyLink).startsWith("mailto:") ? job.applyLink : "";
    const isSheet = Boolean(job.alertSheet);
    const cv = job.contactVerification || {};
    const loc = job.locationDetails || {};
    const dates = job.importantDates || {};
    const stack = job.techStack || {};
    const prep = job.interviewPreparation || {};

    const contactBlock = [
      infoItem("Official HR / apply email", emailHtml(job.email) || escapeHtml(ND)),
      infoItem("Official phone", phoneHtml(job.phone) || escapeHtml(ND)),
      infoItem("Official careers / apply", linkHtml(applyUrl, "Open official apply page") || escapeHtml(ND)),
      infoItem(
        "Official website",
        linkHtml(job.website && !/infopark\.in\/companies-job/.test(job.website) ? job.website : "") ||
          escapeHtml(ND)
      ),
      infoItem("Legal company name", escapeHtml(job.companyLegalName || job.company)),
      infoItem("Brand name", escapeHtml(job.brandName || job.company)),
      infoItem("Office address", escapeHtml(naText(job.address))),
      infoItem("Email verification", escapeHtml(naText(cv.email))),
      infoItem("Phone verification", escapeHtml(naText(cv.phone)))
    ].join("");

    const companyOverviewBlock = kvGrid([
      ["Official company name", job.companyLegalName || job.company],
      ["Brand name", job.brandName || job.company],
      ["Parent company", job.parentCompany],
      ["Industry", job.industry || job.businessCategory],
      ["Company size", job.companySize || job.employeeCount],
      ["Year founded", job.foundedYear],
      ["Founders", job.founders],
      ["CEO", job.ceo],
      ["CTO", job.cto],
      ["Headquarters", job.headquarters],
      ["India / Kochi presence", job.indiaHeadquarters],
      ["Products", job.products],
      ["Services", job.services],
      ["Major clients", job.majorClients],
      ["Awards", job.awards],
      ["Certifications", job.certifications],
      ["Funding", job.funding],
      ["Revenue", job.revenue],
      ["Glassdoor rating", job.glassdoorRating],
      ["AmbitionBox rating", job.ambitionBoxRating],
      ["Google rating", job.googleRating],
      ["Official LinkedIn", job.linkedinUrl],
      ["Official Instagram", job.instagramUrl],
      ["Official Facebook", job.facebookUrl],
      ["Official X (Twitter)", job.twitterUrl]
    ]);

    const jobDetailsBlock = kvGrid([
      ["Job title(s)", (job.roles || []).join(", ")],
      ["Department", job.department],
      ["Team", job.team],
      ["Job code / ID", job.jobCode !== ND ? job.jobCode : job.jobIdOfficial],
      ["Vacancy count", job.vacancyCount],
      ["Hiring urgency", job.hiringUrgency],
      ["Employment type", job.employmentType || job.workStatus],
      ["Work mode", job.workMode],
      ["Shift", job.shift],
      ["Working hours", job.workingHours],
      ["Working days", job.workingDays],
      ["Weekend policy", job.weekendPolicy],
      ["Notice period", job.noticePeriod],
      ["Joining timeline", job.joiningTimeline],
      ["Experience", job.experienceRange || job.experienceYears || badgeLabel],
      ["Listing source", job.source],
      ["InfoparkDaily listing ID", job.id]
    ]);

    const locationBlock = kvGrid([
      ["Office address", loc.officeAddress || job.address],
      ["Infopark campus", loc.campus],
      ["Building", loc.building],
      ["Floor", loc.floor],
      ["City", loc.city],
      ["District", loc.district],
      ["State", loc.state],
      ["Country", loc.country],
      ["PIN code", loc.pin],
      ["Nearest metro", loc.nearestMetro],
      ["Nearest bus stop", loc.nearestBusStop],
      ["Nearest railway", loc.nearestRailway],
      ["Landmarks", loc.landmarks],
      ["Parking", loc.parking]
    ]);

    const salaryBlock = kvGrid([
      ["Salary (as disclosed)", job.salaryRange],
      ["Minimum salary", job.salaryMin],
      ["Maximum salary", job.salaryMax],
      ["Annual CTC", job.salaryAnnualCtc],
      ["Monthly salary", job.salaryMonthly],
      ["Bonus", job.bonus],
      ["Variable pay", job.variablePay],
      ["Joining bonus", job.joiningBonus],
      ["Stock options", job.stockOptions],
      ["Performance bonus", job.performanceBonus]
    ]);

    const datesBlock = kvGrid([
      ["Date posted", dates.datePosted ? formatDate(dates.datePosted) : ND],
      [
        "Application deadline",
        dates.applicationDeadline === "Rolling applications" || job.applyDeadline === "Rolling"
          ? "Rolling applications"
          : dates.applicationDeadline && dates.applicationDeadline !== ND
            ? formatDate(dates.applicationDeadline)
            : ND
      ],
      ["Interview date", dates.interviewDate],
      ["Joining date", dates.joiningDate && dates.joiningDate !== ND ? formatDate(dates.joiningDate) : ND],
      ["Expected hiring timeline", dates.expectedHiringTimeline]
    ]);

    const techStackBlock = kvGrid([
      ["Frontend", stack.frontend],
      ["Backend", stack.backend],
      ["Mobile", stack.mobile],
      ["Cloud", stack.cloud],
      ["DevOps", stack.devops],
      ["Databases", stack.databases],
      ["AI / ML", stack.aiMl],
      ["Security", stack.security],
      ["Automation", stack.automation],
      ["Testing", stack.testing]
    ]);

    const techSkills = listBlock(job.technicalSkills || job.skills || job.requiredSkills);
    const softSkills = listBlock(job.softSkills);
    const preferredSkills = listBlock(job.preferredSkills);
    const skillsBlock = [
      techSkills ? `<p class="job-sheet-subhead">Technical / role skills</p>${techSkills}` : "",
      softSkills ? `<p class="job-sheet-subhead">Soft skills</p>${softSkills}` : "",
      preferredSkills ? `<p class="job-sheet-subhead">Preferred / good-to-have</p>${preferredSkills}` : "",
      !techSkills && !softSkills && !preferredSkills ? `<p class="job-detail-text">${escapeHtml(ND)}</p>` : ""
    ].join("");

    const interviewBlock = `
      ${kvGrid([
        ["Interview pattern", prep.interviewPattern],
        ["System design", prep.systemDesign]
      ])}
      <p class="job-sheet-subhead">Technical topics</p>
      ${listOrNd(prep.technicalTopics)}
      <p class="job-sheet-subhead">HR / behavioural</p>
      ${listOrNd([].concat(prep.hrQuestions || [], prep.behaviouralQuestions || []))}
      <p class="job-sheet-subhead">Coding topics</p>
      ${listOrNd(prep.codingTopics)}
      <p class="job-sheet-subhead">Preparation resources</p>
      ${listOrNd(prep.preparationResources)}
    `;

    const seoBlock = kvGrid([
      ["SEO title", job.seoTitle],
      ["SEO description", job.seoDescription],
      ["Slug", job.seoSlug || job.id],
      ["Canonical URL", job.canonicalUrl],
      ["Open Graph title", job.ogTitle || job.seoTitle],
      ["Twitter title", job.twitterTitle || job.seoTitle],
      ["Image ALT", job.imageAlt],
      ["Keywords", (job.keywords || []).join(", ")]
    ]);

    const internalLinks = (job.internalLinks || [])
      .map((item) => `<li><a href="${escapeAttr(item.href)}">${escapeHtml(item.label)}</a></li>`)
      .join("");

    const standardLayout = `
      <div class="job-detail-layout job-detail-layout--premium">
        <div class="job-detail-main">
          ${verificationNoticeBlock(job)}
          ${section("Job summary", `<p class="job-detail-text">${plainOrNd(job.jobSummary)}</p>`)}
          ${section("Quick facts", quickFactsBlock(job))}
          ${section("Company overview", companyOverviewBlock)}
          ${section(
            "About the company",
            job.companyDetails
              ? `<p class="job-detail-text">${escapeHtml(job.companyDetails)}</p>`
              : `<p class="job-detail-text">${escapeHtml(ND)}</p>`
          )}
          ${section("Why join this company", listOrNd(job.whyJoin))}
          ${section("Career growth", `<p class="job-detail-text">${plainOrNd(job.careerGrowth)}</p>`)}
          ${section("Work culture", `<p class="job-detail-text">${plainOrNd(job.workCulture)}</p>`)}
          ${section("Work environment", `<p class="job-detail-text">${plainOrNd(job.workEnvironment)}</p>`)}
          ${section("Global presence", `<p class="job-detail-text">${plainOrNd(job.globalPresence)}</p>`)}
          ${section("Hiring trends", `<p class="job-detail-text">${plainOrNd(job.hiringTrends)}</p>`)}
          ${section("Job details", jobDetailsBlock)}
          ${section("Open roles", roles ? `<ul class="job-role-grid">${roles}</ul>` : `<p class="job-detail-text">${escapeHtml(ND)}</p>`)}
          ${section(
            "Hiring overview",
            job.workDetails || job.description
              ? `<p class="job-detail-text">${escapeHtml(job.workDetails || job.description)}</p>`
              : `<p class="job-detail-text">${escapeHtml(ND)}</p>`
          )}
          ${section("Responsibilities", listOrNd(job.responsibilities))}
          ${section("Required skills", skillsBlock)}
          ${section("Preferred skills", listOrNd(job.preferredSkills))}
          ${section("Company technology stack", techStackBlock)}
          ${section("Eligibility criteria", listOrNd(job.eligibility))}
          ${section("Who should apply", listOrNd(job.whoShouldApply))}
          ${section("Who should not apply", listOrNd(job.whoShouldNotApply))}
          ${section("Salary & compensation", salaryBlock)}
          ${section("Employee benefits", listOrNd(job.benefitsDetailed || job.benefits))}
          ${section("Office location", `${locationBlock}${mapBlock(job)}`)}
          ${
            /infopark/i.test(String(job.address || "") + String(job.location || ""))
              ? section(
                  "About Infopark office",
                  `<p class="job-detail-text">This employer is listed with an Infopark campus address on the official Infopark company directory. Campus amenities, shuttle timings, and entry rules are managed by Infopark / the company and are ${escapeHtml(ND)} on this page. Confirm visit instructions with the employer before travelling.</p>`
                )
              : ""
          }
          ${section("Hiring process", numberedFromArray(job.hiringProcess) || `<p class="job-detail-text">${escapeHtml(ND)}</p>`)}
          ${section("Required documents", listOrNd(job.requiredDocuments))}
          ${section("How to apply (step-by-step)", applyMethodsBlock(job), "job-apply-panel")}
          ${walkInBlock(job)}
          ${section("Interview preparation", interviewBlock)}
          ${section("Important dates", datesBlock)}
          ${section("Frequently asked questions", faqBlock(job.faq))}
          ${section("Official company links", officialLinksBlock(job))}
          ${section("SEO & discoverability metadata", seoBlock)}
          ${section("Final verification report", verificationReportBlock(job))}
          ${section(
            "Fraud warning",
            listBlock(job.fraudWarning) ||
              `<p class="job-detail-text">Never pay anyone for a job. Apply only through official channels.</p>`
          )}
          ${section("Hiring notes", job.hiringNotes ? `<p class="job-detail-text">${escapeHtml(job.hiringNotes)}</p>` : "")}
          ${
            internalLinks
              ? section("Explore more on InfoparkDaily", `<ul class="job-detail-bullets">${internalLinks}</ul>`)
              : ""
          }
        </div>
        <aside class="job-detail-side">
          ${section(
            "Official contact information",
            contactBlock ? `<dl class="job-info-list">${contactBlock}</dl>` : ""
          )}
          ${section("Quick facts", quickFactsBlock(job))}
          ${section("Important dates", datesBlock)}
          ${shareBlock(job)}
          <section class="job-panel glass job-side-cta">
            <h2>Stay updated</h2>
            <p class="job-detail-text">New openings are shared daily on our channels.</p>
            <div class="job-side-actions">
              <a class="btn btn-primary" href="https://www.instagram.com/infoparkdaily.jobs/" target="_blank" rel="noopener noreferrer">Instagram Jobs</a>
              <a class="btn btn-secondary" href="https://whatsapp.com/channel/0029VbDJFfA4Y9lm5L4kpm22" target="_blank" rel="noopener noreferrer">WhatsApp Channel</a>
            </div>
          </section>
        </aside>
      </div>
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

      <section class="job-detail-hero glass${expired ? " job-detail-hero--expired" : ""}${isSheet ? " job-detail-hero--alert" : ""}">
        <div class="job-detail-hero-top">
          <div class="job-detail-hero-main">
            <div class="job-logo-wrap job-logo-wrap--lg" data-initials="${escapeAttr(mark)}">
              <span class="job-logo-fallback" aria-hidden="true">${escapeHtml(mark)}</span>
              ${
                job.logo
                  ? `<img class="job-logo" src="${escapeAttr(assetUrl(job.logo))}" alt="${escapeAttr(job.imageAlt || job.company + " logo")}" loading="lazy" onerror="this.remove()" />`
                  : ""
              }
            </div>
            <div class="job-detail-hero-copy">
              <p class="jobs-kicker">${isSheet ? escapeHtml(job.alertLabel || "Internship job alert") : "Premium verified hiring brief"}</p>
              <h1>${escapeHtml(job.companyLegalName || job.company)}</h1>
              ${
                job.companyLegalName && job.companyLegalName !== job.company
                  ? `<p class="job-legal-aka">Listed as ${escapeHtml(job.company)}</p>`
                  : ""
              }
              <p class="job-hero-role">${escapeHtml((job.roles || [])[0] || "")}${job.referenceId ? ` · Ref ${escapeHtml(job.referenceId)}` : ""}</p>
              <p class="job-location">${escapeHtml(job.location || "")}</p>
              <div class="job-card-tags">
                ${expired ? `<span class="job-badge job-badge--expired">EXPIRED</span>` : ""}
                ${countdown ? `<span class="job-deadline-pill job-deadline-pill--${status}">${escapeHtml(countdown)}</span>` : ""}
                <span class="job-badge job-badge--${escapeAttr(exp)}">${escapeHtml(badgeLabel)}</span>
                ${job.employmentType ? `<span class="job-badge job-badge--intern">${escapeHtml(job.employmentType)}</span>` : ""}
                ${job.verified ? `<span class="job-badge job-badge--verified">Verified</span>` : ""}
                ${job.verificationLevel === "infopark-profile" ? `<span class="job-badge job-badge--verified">Infopark profile</span>` : ""}
                ${job.isWalkIn ? `<span class="job-badge job-badge--walkin">Walk-in Drive</span>` : ""}
                ${isSheet ? `<span class="job-badge job-badge--pan">Pan India</span>` : ""}
                ${job.industry ? `<span class="job-status-chip">${escapeHtml(job.industry)}</span>` : ""}
              </div>
            </div>
          </div>
          <div class="job-detail-hero-actions">
            ${
              !expired && applyUrl
                ? `<a class="btn btn-primary" href="${escapeAttr(applyUrl)}" target="_blank" rel="noopener noreferrer">Official Apply ↗</a>`
                : ""
            }
            <a class="btn ${expired ? "btn-primary" : "btn-secondary"}" href="/jobs/">${expired ? "See open jobs" : "All Openings"}</a>
          </div>
        </div>
        ${heroStatStrip(job)}
      </section>

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
