(function () {
  const grid = document.getElementById("jobs-grid");
  const emptyState = document.getElementById("jobs-empty");
  const searchInput = document.getElementById("jobs-search");
  const filterBar = document.getElementById("jobs-filters");
  const tagBar = document.getElementById("jobs-tags");
  const sortSelect = document.getElementById("jobs-sort");
  const countEl = document.getElementById("jobs-count");
  const loadMoreBtn = document.getElementById("jobs-load-more");
  const stickyBar = document.getElementById("jobs-sticky-cta");
  const stickyDismiss = document.getElementById("jobs-sticky-dismiss");
  const statCompanies = document.getElementById("stat-companies");
  const statRoles = document.getElementById("stat-roles");
  const statFreshers = document.getElementById("stat-freshers");

  if (!grid || typeof JOBS === "undefined") return;

  const EXP_LABELS = {
    fresher: "Fresher",
    experienced: "Experienced",
    both: "Fresher + Exp"
  };

  const PAGE_SIZE = 12;
  const NEW_DAYS = 5;
  const STICKY_KEY = "jobsStickyDismissed";
  const MAX_ROLES_ON_CARD = 3;

  let activeFilter = "all";
  let activeTag = "all";
  let searchQuery = "";
  let sortMode = "newest";
  let visibleCount = PAGE_SIZE;

  function formatDate(iso) {
    if (!iso || iso === "Rolling") return iso || "";
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

  function isNew(job) {
    if (!job.postedDate) return false;
    const posted = new Date(`${job.postedDate}T00:00:00`);
    if (Number.isNaN(posted.getTime())) return false;
    const ageMs = Date.now() - posted.getTime();
    return ageMs >= 0 && ageMs <= NEW_DAYS * 24 * 60 * 60 * 1000;
  }

  function employmentType(job) {
    return String(job.employmentType || job.workStatus || "").toLowerCase();
  }

  function matchesFilter(job) {
    if (activeFilter === "all") return true;
    if (activeFilter === "walkin") return Boolean(job.isWalkIn);
    if (activeFilter === "internship") {
      const type = employmentType(job);
      return type.includes("internship") || type.includes("apprenticeship");
    }
    return job.experience === activeFilter;
  }

  function matchesTag(job) {
    if (activeTag === "all") return true;
    return (job.tags || []).some((tag) => String(tag).toLowerCase() === activeTag);
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
      job.companyBlurb,
      job.industry,
      job.employmentType,
      ...(job.roles || []),
      ...(job.tags || []),
      job.description || ""
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(searchQuery);
  }

  function deadlineSortValue(job) {
    const raw = job.applyDeadline;
    if (!raw || raw === "Rolling") return Number.POSITIVE_INFINITY;
    const date = new Date(`${raw}T00:00:00`);
    return Number.isNaN(date.getTime()) ? Number.POSITIVE_INFINITY : date.getTime();
  }

  function filteredJobs() {
    const list = JOBS.filter((job) => matchesFilter(job) && matchesTag(job) && matchesSearch(job));

    list.sort((a, b) => {
      if (sortMode === "deadline") {
        return deadlineSortValue(a) - deadlineSortValue(b);
      }
      return String(b.postedDate || "").localeCompare(String(a.postedDate || ""));
    });

    return list;
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

  function buildTagChips() {
    if (!tagBar) return;
    const tags = new Set();
    JOBS.forEach((job) => (job.tags || []).forEach((tag) => tags.add(String(tag))));
    const sorted = [...tags].sort((a, b) => a.localeCompare(b));

    tagBar.innerHTML = [
      `<button type="button" class="jobs-tag-chip is-active" data-tag="all" aria-pressed="true">All tags</button>`,
      ...sorted.map(
        (tag) =>
          `<button type="button" class="jobs-tag-chip" data-tag="${escapeAttr(
            tag.toLowerCase()
          )}" aria-pressed="false">${escapeHtml(tag)}</button>`
      )
    ].join("");
  }

  function renderCard(job, index) {
    const exp = job.experience || "both";
    const badgeLabel = EXP_LABELS[exp] || EXP_LABELS.both;
    const dateLine = job.isWalkIn && job.walkInDate
      ? job.walkInDate
      : job.startingDate
        ? `Starting ${formatDate(job.startingDate)}`
        : job.postedDate
          ? `Posted ${formatDate(job.postedDate)}`
          : "";
    const source = job.source
      ? `<span class="job-source">${escapeHtml(job.source)}</span>`
      : "";
    const blurb = job.companyBlurb || job.description
      ? `<p class="job-desc">${escapeHtml(job.companyBlurb || job.description)}</p>`
      : "";
    const roleCount = (job.roles || []).length;
    const deadline =
      job.applyDeadline
        ? `<span class="job-deadline">Deadline: ${escapeHtml(
            job.applyDeadline === "Rolling" ? "Rolling" : formatDate(job.applyDeadline)
          )}</span>`
        : "";

    const badges = [
      `<span class="job-badge job-badge--${escapeHtml(exp)}">${escapeHtml(badgeLabel)}</span>`,
      isNew(job) ? `<span class="job-badge job-badge--new">New</span>` : "",
      job.isWalkIn ? `<span class="job-badge job-badge--walkin">Walk-in Drive</span>` : "",
      job.verified ? `<span class="job-badge job-badge--verified">Verified</span>` : "",
      job.employmentType
        ? `<span class="job-status-chip">${escapeHtml(job.employmentType)}</span>`
        : job.workStatus
          ? `<span class="job-status-chip">${escapeHtml(job.workStatus)}</span>`
          : ""
    ]
      .filter(Boolean)
      .join("");

    const tagChips = (job.tags || [])
      .slice(0, 3)
      .map((tag) => `<span class="job-tag-pill">${escapeHtml(tag)}</span>`)
      .join("");

    return `
      <article class="job-card" data-experience="${escapeHtml(exp)}" style="--delay: ${Math.min(index, 8) * 40}ms">
        <div class="job-card-accent" aria-hidden="true"></div>
        ${
          job.isWalkIn && job.walkInDate
            ? `<p class="job-walkin-banner">${escapeHtml(job.walkInDate)}</p>`
            : ""
        }
        <header class="job-card-head">
          ${logoBlock(job)}
          <div class="job-card-meta">
            <h3>${escapeHtml(job.company)}</h3>
            <p class="job-location">${escapeHtml(job.location || "")}</p>
          </div>
        </header>
        <div class="job-card-tags">${badges}</div>
        ${tagChips ? `<div class="job-tag-row">${tagChips}</div>` : ""}
        <div class="job-card-body">
          <p class="job-roles-label">${roleCount} open role${roleCount === 1 ? "" : "s"}</p>
          ${rolesListHtml(job.roles, MAX_ROLES_ON_CARD)}
          ${blurb}
        </div>
        <footer class="job-card-foot">
          <div class="job-meta-row">
            ${dateLine ? `<span class="job-date">${escapeHtml(dateLine)}</span>` : ""}
            ${deadline}
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
    const visible = jobs.slice(0, visibleCount);
    grid.innerHTML = visible.map((job, i) => renderCard(job, i)).join("");

    if (countEl) {
      countEl.textContent =
        jobs.length === 1 ? "1 company shown" : `${jobs.length} companies match`;
    }

    if (emptyState) {
      emptyState.hidden = jobs.length > 0;
    }

    if (loadMoreBtn) {
      const hasMore = jobs.length > visibleCount;
      loadMoreBtn.hidden = !hasMore;
      loadMoreBtn.textContent = hasMore
        ? `Load more (${jobs.length - visibleCount} remaining)`
        : "Load more";
    }
  }

  function resetVisibleAndRender() {
    visibleCount = PAGE_SIZE;
    render();
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
      resetVisibleAndRender();
    });
  }

  if (tagBar) {
    tagBar.addEventListener("click", (event) => {
      const button = event.target.closest("[data-tag]");
      if (!button) return;
      activeTag = button.dataset.tag;
      tagBar.querySelectorAll("[data-tag]").forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
      resetVisibleAndRender();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchQuery = searchInput.value.trim().toLowerCase();
      resetVisibleAndRender();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      sortMode = sortSelect.value || "newest";
      resetVisibleAndRender();
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      visibleCount += PAGE_SIZE;
      render();
    });
  }

  if (stickyBar) {
    const dismissed = localStorage.getItem(STICKY_KEY) === "1";
    if (!dismissed) {
      const onScroll = () => {
        stickyBar.classList.toggle("is-visible", window.scrollY > 320);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    if (stickyDismiss) {
      stickyDismiss.addEventListener("click", () => {
        localStorage.setItem(STICKY_KEY, "1");
        stickyBar.classList.remove("is-visible");
        stickyBar.hidden = true;
      });
    }
  }

  updateHeroStats();
  buildTagChips();
  render();
})();
