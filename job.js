(function () {
  const root = document.getElementById("job-detail-root");
  if (!root || typeof JOBS === "undefined") return;

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

  function formatDate(iso) {
    if (!iso) return "";
    const date = new Date(`${iso}T00:00:00`);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
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

  function section(title, bodyHtml) {
    if (!bodyHtml) return "";
    return `
      <section class="job-panel glass">
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

  function renderJob(job) {
    const exp = job.experience || "both";
    const badgeLabel = EXP_LABELS[exp] || EXP_LABELS.both;
    const mark = initials(job.company);
    const roles = (job.roles || [])
      .map((role) => `<li><span>${escapeHtml(role)}</span></li>`)
      .join("");

    document.title = `${job.company} Hiring | InfoparkDaily`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        `${job.company} hiring in ${job.location || "Kerala"} — roles, requirements, and apply details curated by InfoparkDaily.`
      );
    }

    const contactBlock = [
      infoItem("Email", emailHtml(job.email)),
      infoItem("Phone", phoneHtml(job.phone)),
      infoItem("Website / portal", linkHtml(job.website)),
      infoItem("Address", escapeHtml(job.address || job.location))
    ].join("");

    const snapshotBlock = [
      infoItem("Experience", escapeHtml(badgeLabel)),
      infoItem("Experience years", escapeHtml(job.experienceYears)),
      infoItem("Work status", escapeHtml(job.workStatus)),
      infoItem("Work mode", escapeHtml(job.workMode)),
      infoItem("Industry", escapeHtml(job.industry)),
      infoItem("Posted", job.postedDate ? escapeHtml(formatDate(job.postedDate)) : ""),
      infoItem("Deadline", job.applyDeadline ? escapeHtml(job.applyDeadline === "Rolling" ? "Rolling" : formatDate(job.applyDeadline)) : ""),
      infoItem("Starting", job.startingDate ? escapeHtml(formatDate(job.startingDate)) : ""),
      infoItem("Walk-in", job.isWalkIn ? escapeHtml(job.walkInDate || "Yes") : ""),
      infoItem("Source", escapeHtml(job.source))
    ].join("");


    root.innerHTML = `
      <nav class="job-breadcrumb" aria-label="Breadcrumb">
        <a href="jobs.html">← Job Openings</a>
      </nav>

      <section class="job-detail-hero glass">
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
            <p class="jobs-kicker">Company hiring page</p>
            <h1>${escapeHtml(job.company)}</h1>
            <p class="job-location">${escapeHtml(job.location || "")}</p>
            <div class="job-card-tags">
              <span class="job-badge job-badge--${escapeAttr(exp)}">${escapeHtml(badgeLabel)}</span>
              ${job.verified ? `<span class="job-badge job-badge--verified">Verified</span>` : ""}
              ${job.isWalkIn ? `<span class="job-badge job-badge--walkin">Walk-in Drive</span>` : ""}
              ${job.employmentType ? `<span class="job-status-chip">${escapeHtml(job.employmentType)}</span>` : ""}
              ${job.workStatus ? `<span class="job-status-chip">${escapeHtml(job.workStatus)}</span>` : ""}
              ${job.workMode ? `<span class="job-status-chip">${escapeHtml(job.workMode)}</span>` : ""}
              ${job.industry ? `<span class="job-status-chip">${escapeHtml(job.industry)}</span>` : ""}
            </div>
          </div>
        </div>
        <div class="job-detail-hero-actions">
          <a class="btn btn-secondary" href="jobs.html">All Openings</a>
        </div>
      </section>

      <div class="job-detail-layout">
        <div class="job-detail-main">
          ${section("About the company", job.companyDetails ? `<p class="job-detail-text">${escapeHtml(job.companyDetails)}</p>` : "")}
          ${section(
            "Hiring overview",
            job.workDetails || job.description
              ? `<p class="job-detail-text">${escapeHtml(job.workDetails || job.description)}</p>`
              : ""
          )}
          ${section(
            "Open roles",
            roles ? `<ul class="job-role-grid">${roles}</ul>` : ""
          )}
          ${section("Requirements", listBlock(job.requirements))}
          ${section("Responsibilities", listBlock(job.responsibilities))}
          ${section("Benefits", listBlock(job.benefits))}
          ${section(
            "How to apply",
            job.howToApply ? `<p class="job-detail-text">${escapeHtml(job.howToApply)}</p>` : ""
          )}
          ${section(
            "Hiring notes",
            job.hiringNotes ? `<p class="job-detail-text">${escapeHtml(job.hiringNotes)}</p>` : ""
          )}
        </div>

        <aside class="job-detail-side">
          ${section("Quick facts", snapshotBlock ? `<dl class="job-info-list">${snapshotBlock}</dl>` : "")}
          ${section("Contact & location", contactBlock ? `<dl class="job-info-list">${contactBlock}</dl>` : "")}
          <section class="job-panel glass job-side-cta">
            <h2>Stay updated</h2>
            <p class="job-detail-text">New Infopark openings are shared daily on our channels.</p>
            <div class="job-side-actions">
              <a class="btn btn-primary" href="https://www.instagram.com/infoparkdaily.jobs/" target="_blank" rel="noopener noreferrer">Instagram Jobs</a>
              <a class="btn btn-secondary" href="https://whatsapp.com/channel/0029VbDJFfA4Y9lm5L4kpm22" target="_blank" rel="noopener noreferrer">WhatsApp Channel</a>
            </div>
          </section>
        </aside>
      </div>

      <p class="jobs-disclaimer">
        InfoparkDaily is an independent IT Jobs &amp; Career Community. We share publicly available job
        opportunities and company submissions. We are not a recruitment agency and never charge any fee.
        Please verify job details directly with the hiring company before applying.
      </p>
    `;
  }

  const job = findJob(getJobId());
  if (!job) {
    renderMissing();
    return;
  }
  renderJob(job);
})();
