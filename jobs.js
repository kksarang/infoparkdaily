(function () {
  const grid = document.getElementById("jobs-grid");
  const emptyState = document.getElementById("jobs-empty");
  const searchInput = document.getElementById("jobs-search");
  const filterBar = document.getElementById("jobs-filters");
  const countEl = document.getElementById("jobs-count");
  const statCompanies = document.getElementById("stat-companies");
  const statRoles = document.getElementById("stat-roles");
  const statFreshers = document.getElementById("stat-freshers");

  if (!grid || typeof JOBS === "undefined") return;

  const EXP_LABELS = {
    fresher: "Fresher",
    experienced: "Experienced",
    both: "Fresher + Exp"
  };

  const MAX_ROLES_ON_CARD = 3;
  let activeFilter = "all";
  let searchQuery = "";

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

  function matchesFilter(job) {
    if (activeFilter === "all") return true;
    return job.experience === activeFilter;
  }

  function matchesSearch(job) {
    if (!searchQuery) return true;
    const haystack = [
      job.company,
      job.location,
      job.email,
      job.address,
      job.workDetails,
      job.companyDetails,
      job.industry,
      ...(job.roles || []),
      job.description || ""
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(searchQuery);
  }

  function filteredJobs() {
    return JOBS.filter((job) => matchesFilter(job) && matchesSearch(job));
  }

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

  function jobHref(job) {
    const id = job.id || String(job.company || "").toLowerCase().replace(/\s+/g, "-");
    return `job.html?id=${encodeURIComponent(id)}`;
  }

  function logoBlock(job) {
    const mark = initials(job.company);
    const image = job.logo
      ? `<img
          class="job-logo"
          src="${escapeAttr(job.logo)}"
          alt=""
          loading="lazy"
          onerror="this.remove()"
        />`
      : "";
    return `
      <div class="job-logo-wrap" data-initials="${escapeAttr(mark)}">
        <span class="job-logo-fallback" aria-hidden="true">${escapeHtml(mark)}</span>
        ${image}
      </div>
    `;
  }

  function rolesListHtml(roles, limit) {
    const list = roles || [];
    const shown = typeof limit === "number" ? list.slice(0, limit) : list;
    const extra = typeof limit === "number" ? Math.max(0, list.length - limit) : 0;
    const items = shown.map((role) => `<li>${escapeHtml(role)}</li>`).join("");
    const more =
      extra > 0 ? `<li class="job-roles-more">+${extra} more role${extra > 1 ? "s" : ""}</li>` : "";
    return `<ul class="job-roles">${items}${more}</ul>`;
  }

  function updateHeroStats() {
    const roleCount = JOBS.reduce((sum, job) => sum + (job.roles || []).length, 0);
    const fresherFriendly = JOBS.filter(
      (job) => job.experience === "fresher" || job.experience === "both"
    ).length;

    if (statCompanies) statCompanies.textContent = String(JOBS.length);
    if (statRoles) statRoles.textContent = String(roleCount);
    if (statFreshers) statFreshers.textContent = String(fresherFriendly);
  }

  function renderCard(job, index) {
    const exp = job.experience || "both";
    const badgeLabel = EXP_LABELS[exp] || EXP_LABELS.both;
    const dateLine = job.startingDate
      ? `Starting ${formatDate(job.startingDate)}`
      : job.postedDate
        ? `Posted ${formatDate(job.postedDate)}`
        : "";
    const source = job.source
      ? `<span class="job-source">${escapeHtml(job.source)}</span>`
      : "";
    const description = job.description
      ? `<p class="job-desc">${escapeHtml(job.description)}</p>`
      : "";
    const roleCount = (job.roles || []).length;

    return `
      <article class="job-card" data-experience="${escapeHtml(exp)}" style="--delay: ${Math.min(index, 8) * 40}ms">
        <div class="job-card-accent" aria-hidden="true"></div>
        <header class="job-card-head">
          ${logoBlock(job)}
          <div class="job-card-meta">
            <h3>${escapeHtml(job.company)}</h3>
            <p class="job-location">${escapeHtml(job.location || "")}</p>
          </div>
        </header>
        <div class="job-card-tags">
          <span class="job-badge job-badge--${escapeHtml(exp)}">${escapeHtml(badgeLabel)}</span>
          ${job.workStatus ? `<span class="job-status-chip">${escapeHtml(job.workStatus)}</span>` : ""}
        </div>
        <div class="job-card-body">
          <p class="job-roles-label">${roleCount} open role${roleCount === 1 ? "" : "s"}</p>
          ${rolesListHtml(job.roles, MAX_ROLES_ON_CARD)}
          ${description}
        </div>
        <footer class="job-card-foot">
          <div class="job-meta-row">
            ${dateLine ? `<span class="job-date">${escapeHtml(dateLine)}</span>` : ""}
            ${source}
          </div>
          <a class="btn btn-primary job-details-btn" href="${escapeAttr(jobHref(job))}">
            View Details
          </a>
        </footer>
      </article>
    `;
  }

  function render() {
    const jobs = filteredJobs();
    grid.innerHTML = jobs.map((job, i) => renderCard(job, i)).join("");

    if (countEl) {
      countEl.textContent =
        jobs.length === 1 ? "1 company shown" : `${jobs.length} companies shown`;
    }

    if (emptyState) {
      emptyState.hidden = jobs.length > 0;
    }
  }

  if (filterBar) {
    filterBar.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      activeFilter = button.dataset.filter;
      filterBar.querySelectorAll("[data-filter]").forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
      render();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchQuery = searchInput.value.trim().toLowerCase();
      render();
    });
  }

  updateHeroStats();
  render();
})();
