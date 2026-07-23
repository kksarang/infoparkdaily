(function () {
  const root = document.getElementById("job-detail-root");
  if (!root || typeof JOBS === "undefined") return;

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

  function getJobId() {
    const params = new URLSearchParams(window.location.search);
    return (params.get("id") || "").trim().toLowerCase();
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
    document.title = "Job not found | InfoparkDaily";
    root.innerHTML = `
      <section class="job-missing glass">
        <p class="jobs-kicker">Hiring digest</p>
        <h1>Opening not found</h1>
        <p>This job may have been removed or the link is incomplete.</p>
        <a class="btn btn-primary" href="jobs.html">Back to Job Openings</a>
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

  function applyMethodsBlock(job) {
    const methods = [];

    if (job.email) {
      methods.push(`
        <a class="job-apply-method" href="mailto:${escapeAttr(job.email)}">
          <span class="job-apply-method-icon job-apply-method-icon--mail" aria-hidden="true">@</span>
          <span class="job-apply-method-body">
            <strong>HR / Apply email</strong>
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
            <strong>Official careers page</strong>
            <span>${escapeHtml(String(careers).replace(/^https?:\/\//, "").replace(/\/$/, ""))}</span>
          </span>
        </a>
      `);
    }

    if (job.website && job.website !== careers) {
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
            <strong>Call / WhatsApp</strong>
            <span>${escapeHtml(job.phone)}</span>
          </span>
        </a>
      `);
    }

    const steps = job.howToApply
      ? `<p class="job-detail-text job-apply-steps">${escapeHtml(job.howToApply)}</p>`
      : "";

    if (!methods.length && !steps) return "";
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
    const query = job.address || job.location;
    if (!query) return "";
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

  function disclaimerBlock() {
    return `
      <aside class="job-sheet-disclaimer" role="note">
        <strong>Disclaimer</strong>
        <p>
          InfoparkDaily is an independent IT Jobs &amp; Career Community. We share publicly available
          job opportunities and company submissions. We are <em>not</em> a recruitment agency and
          <em>never charge any fee</em>. Apply only through the official company careers portal.
          Meeting eligibility does not guarantee selection. Please verify all details directly with
          the hiring company before applying.
        </p>
      </aside>
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
      ["Team / track", job.teamName || ""],
      ["Experience", job.experienceRange || "Freshers / Students"],
      ["Work mode", job.workMode || ""],
      ["Posting start", job.postingStartDate ? formatDate(job.postingStartDate) : ""],
      ["Deadline", job.applyDeadline === "Rolling" ? "Open / Rolling" : formatDate(job.applyDeadline) || ""],
      ["Stipend", job.salaryRange || ""]
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
          <a class="job-related-card glass" href="job.html?id=${encodeURIComponent(other.id)}">
            <div class="job-logo-wrap" data-initials="${escapeAttr(initials(other.company))}">
              <span class="job-logo-fallback" aria-hidden="true">${escapeHtml(initials(other.company))}</span>
              ${other.logo ? `<img class="job-logo" src="${escapeAttr(other.logo)}" alt="" loading="lazy" onerror="this.remove()" />` : ""}
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

    document.title = `${job.company} — ${(job.roles || [])[0] || "Hiring"} | InfoparkDaily`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        `${job.company} hiring in ${job.location || "Kerala"} — roles, requirements, and apply details curated by InfoparkDaily.`
      );
    }

    const applyUrl =
      job.applyLink && !String(job.applyLink).startsWith("mailto:") ? job.applyLink : "";
    const isSheet = Boolean(job.alertSheet);

    const contactBlock = [
      infoItem("HR Email", emailHtml(job.email)),
      infoItem("Phone", phoneHtml(job.phone)),
      infoItem("Official careers", linkHtml(applyUrl, "Open careers page")),
      infoItem("Website", linkHtml(job.website)),
      infoItem("Reference ID", escapeHtml(job.referenceId || "")),
      infoItem("Address", escapeHtml(job.address || job.location))
    ].join("");

    const snapshotBlock = [
      infoItem("Company", escapeHtml(job.company)),
      infoItem("Industry", escapeHtml(job.industry)),
      infoItem("Company size", escapeHtml(job.companySize)),
      infoItem("Location", escapeHtml(job.location)),
      infoItem("Experience", escapeHtml(badgeLabel)),
      infoItem("Experience years", escapeHtml(job.experienceYears || job.experienceRange)),
      infoItem("Expected salary", escapeHtml(job.salaryRange)),
      infoItem("Work status", escapeHtml(job.workStatus)),
      infoItem("Work mode", escapeHtml(job.workMode)),
      infoItem("Posted", job.postedDate ? escapeHtml(formatDate(job.postedDate)) : ""),
      infoItem(
        "Apply deadline",
        job.applyDeadline
          ? escapeHtml(job.applyDeadline === "Rolling" ? "Rolling / Open until filled" : formatDate(job.applyDeadline))
          : ""
      ),
      infoItem("Starting", job.startingDate ? escapeHtml(formatDate(job.startingDate)) : ""),
      infoItem("Walk-in", job.isWalkIn ? escapeHtml(job.walkInDate || "Yes") : ""),
      infoItem("Source", escapeHtml(job.source)),
      infoItem("Listing ID", escapeHtml(job.id))
    ].join("");

    const skillsBlock = listBlock(job.skills || job.requiredSkills);
    const tipsBlock = listBlock(job.interviewTips);

    const standardLayout = `
      <div class="job-detail-layout">
        <div class="job-detail-main">
          ${section("How to apply", applyMethodsBlock(job), "job-apply-panel")}
          ${walkInBlock(job)}
          ${section("About the company", job.companyDetails ? `<p class="job-detail-text">${escapeHtml(job.companyDetails)}</p>` : "")}
          ${section(
            "Hiring overview",
            job.workDetails || job.description
              ? `<p class="job-detail-text">${escapeHtml(job.workDetails || job.description)}</p>`
              : ""
          )}
          ${section("Open roles", roles ? `<ul class="job-role-grid">${roles}</ul>` : "")}
          ${section("Requirements / eligibility", listBlock(job.requirements))}
          ${section("Required skills", skillsBlock)}
          ${section("Responsibilities", listBlock(job.responsibilities))}
          ${section("Benefits & perks", listBlock(job.benefits))}
          ${section("Interview tips", tipsBlock)}
          ${section("Hiring notes", job.hiringNotes ? `<p class="job-detail-text">${escapeHtml(job.hiringNotes)}</p>` : "")}
        </div>
        <aside class="job-detail-side">
          ${section(
            "Contact & location",
            contactBlock ? `<dl class="job-info-list">${contactBlock}</dl>${mapBlock(job)}` : ""
          )}
          ${section("Company snapshot", snapshotBlock ? `<dl class="job-info-list job-info-list--grid">${snapshotBlock}</dl>` : "")}
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
        <a href="jobs.html">← Job Openings</a>
      </nav>

      ${
        expired
          ? `<div class="job-expired-banner" role="status">
              <strong>This listing has expired.</strong>
              The apply deadline was ${escapeHtml(formatDate(job.applyDeadline))}. Details are kept for reference — check current openings instead.
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
                  ? `<img class="job-logo" src="${escapeAttr(job.logo)}" alt="" loading="lazy" onerror="this.remove()" />`
                  : ""
              }
            </div>
            <div class="job-detail-hero-copy">
              <p class="jobs-kicker">${isSheet ? escapeHtml(job.alertLabel || "Internship job alert") : "Company hiring page"}</p>
              <h1>${escapeHtml(job.company)}</h1>
              <p class="job-hero-role">${escapeHtml((job.roles || [])[0] || "")}${job.referenceId ? ` · Ref ${escapeHtml(job.referenceId)}` : ""}</p>
              <p class="job-location">${escapeHtml(job.location || "")}</p>
              <div class="job-card-tags">
                ${countdown ? `<span class="job-deadline-pill job-deadline-pill--${status}">${escapeHtml(countdown)}</span>` : ""}
                <span class="job-badge job-badge--${escapeAttr(exp)}">${escapeHtml(badgeLabel)}</span>
                ${job.employmentType ? `<span class="job-badge job-badge--intern">${escapeHtml(job.employmentType)}</span>` : ""}
                ${job.verified ? `<span class="job-badge job-badge--verified">Verified</span>` : ""}
                ${job.isWalkIn ? `<span class="job-badge job-badge--walkin">Walk-in Drive</span>` : ""}
                ${isSheet ? `<span class="job-badge job-badge--pan">Pan India</span>` : ""}
                ${job.industry ? `<span class="job-status-chip">${escapeHtml(job.industry)}</span>` : ""}
              </div>
            </div>
          </div>
          <div class="job-detail-hero-actions">
            ${
              applyUrl
                ? `<a class="btn btn-primary" href="${escapeAttr(applyUrl)}" target="_blank" rel="noopener noreferrer">Official Apply ↗</a>`
                : ""
            }
            <a class="btn btn-secondary" href="jobs.html">All Openings</a>
          </div>
        </div>
        ${heroStatStrip(job)}
      </section>

      ${isSheet ? alertSheetBlock(job) : standardLayout}
      ${isSheet ? shareBlock(job) : ""}
      ${isSheet ? channelsBlock() : ""}
      ${relatedJobsBlock(job)}
      ${disclaimerBlock()}
    `;

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

  const job = findJob(getJobId());
  if (!job) {
    renderMissing();
    return;
  }
  renderJob(job);
})();
