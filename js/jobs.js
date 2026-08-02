(function () {
  const grid = document.getElementById("jobs-grid");
  const emptyState = document.getElementById("jobs-empty");
  const searchInput = document.getElementById("jobs-search");
  const filterBar = document.getElementById("jobs-filters");
  const statusBar = document.getElementById("jobs-status");
  const tagBar = document.getElementById("jobs-tags");
  const sortSelect = document.getElementById("jobs-sort");
  const locationSelect = document.getElementById("jobs-location");
  const companyInput = document.getElementById("jobs-company");
  const companySuggest = document.getElementById("jobs-company-suggest");
  const companyBanner = document.getElementById("jobs-company-banner");
  const shareHint = document.getElementById("jobs-share-hint");
  const countEl = document.getElementById("jobs-count");
  const clearBtn = document.getElementById("jobs-clear");
  const loadMoreBtn = document.getElementById("jobs-load-more");
  const stickyBar = document.getElementById("jobs-sticky-cta");
  const stickyDismiss = document.getElementById("jobs-sticky-dismiss");
  const expiredBanner = document.getElementById("jobs-expired-banner");
  const massHiringSection = document.getElementById("jobs-mass-hiring");
  const massHiringTrack = document.getElementById("jobs-mass-hiring-track");
  const massHiringCount = document.getElementById("jobs-mass-hiring-count");
  const statCompanies = document.getElementById("stat-companies");
  const statRoles = document.getElementById("stat-roles");
  const statFreshers = document.getElementById("stat-freshers");
  const statClosing = document.getElementById("stat-closing");

  if (!grid || typeof JOBS === "undefined") return;

  const MASS_HIRING_MIN = 100;

  const EXP_LABELS = {
    fresher: "Fresher",
    experienced: "Experienced",
    both: "Fresher + Exp"
  };

  const PAGE_SIZE = 12;
  const NEW_DAYS = 5;
  const CLOSING_DAYS = 7;
  const STICKY_KEY = "jobsStickyDismissed";
  const MAX_ROLES_ON_CARD = 2;
  const DAY_MS = 24 * 60 * 60 * 1000;

  let activeFilter = "all";
  let activeStatus = "open";
  let activeTag = "all";
  let activeLocation = "all";
  let activeCompany = "all";
  let companyQuery = "";
  let searchQuery = "";
  let sortMode = "newest";
  let visibleCount = PAGE_SIZE;
  /** @type {{ key: string, label: string, count: number }[]} */
  let companyCatalog = [];
  let suggestIndex = -1;

  /* ---------- date helpers ---------- */

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

  /**
   * Days from today until deadline. 0 = last day today,
   * negative = already expired, null = rolling / no deadline.
   */
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

  function isNew(job) {
    const posted = parseIso(job.postedDate);
    if (posted === null) return false;
    const ageMs = Date.now() - posted;
    return ageMs >= 0 && ageMs <= NEW_DAYS * DAY_MS;
  }

  /* ---------- misc helpers ---------- */

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

  function employmentType(job) {
    return String(job.employmentType || job.workStatus || "").toLowerCase();
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

  function isRemoteJob(job) {
    const mode = String(job.workMode || job.employmentType || "").toLowerCase();
    const tags = (job.tags || []).map((t) => String(t).toLowerCase());
    return mode.includes("remote") || tags.includes("remote");
  }

  function jobRegion(job) {
    const loc = String(job.location || "").toLowerCase();
    if (loc.includes("pan india") || loc.includes("pan-india") || job.alertSheet) return "Pan India";
    if (loc.includes("bangalore") || loc.includes("bengaluru")) return "Bangalore";
    if (loc.includes("infopark") && loc.includes("thrissur")) return "Infopark, Thrissur";
    if (loc.includes("infopark")) return "Infopark, Kochi";
    if (loc.includes("technopark")) return "Technopark, Trivandrum";
    if (loc.includes("cyberpark")) return "Cyberpark, Calicut";
    if (loc.includes("kochi")) return "Kochi";
    if (loc.includes("trivandrum")) return "Trivandrum";
    if (loc.includes("calicut") || loc.includes("kozhikode")) return "Calicut";
    if (loc.includes("angamaly")) return "Angamaly";
    if (loc.includes("thrissur")) return "Thrissur";
    if (loc.includes("malappuram") || loc.includes("kottakkal")) return "Malappuram";
    if (loc.includes("alappuzha")) return "Alappuzha";
    return "Other Kerala";
  }

  /* ---------- filtering ---------- */

  function matchesFilter(job) {
    if (activeFilter === "all") return true;
    if (activeFilter === "masshiring") return isMassHiring(job);
    if (activeFilter === "walkin") return isWalkInJob(job);
    if (activeFilter === "remote") return isRemoteJob(job);
    if (activeFilter === "verified") return Boolean(job.verified);
    if (activeFilter === "internship") {
      const type = employmentType(job);
      return type.includes("internship") || type.includes("apprenticeship");
    }
    return job.experience === activeFilter;
  }

  function matchesStatus(job) {
    const status = deadlineStatus(job);
    if (activeStatus === "all") return true;
    if (activeStatus === "open") return status !== "expired";
    return status === activeStatus;
  }

  function matchesTag(job) {
    if (activeTag === "all") return true;
    return (job.tags || []).some((tag) => String(tag).toLowerCase() === activeTag);
  }

  function matchesLocation(job) {
    if (activeLocation === "all") return true;
    return jobRegion(job) === activeLocation;
  }

  function companySlug(name) {
    return String(name || "")
      .trim()
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function companyKey(job) {
    return companySlug(job.company);
  }

  function companyLabelFromSlug(slug) {
    if (!slug || slug === "all") return "";
    const hit = companyCatalog.find((item) => item.key === slug);
    return hit ? hit.label : slug;
  }

  function matchesCompany(job) {
    if (activeCompany !== "all") return companyKey(job) === activeCompany;
    if (!companyQuery) return true;
    return String(job.company || "").toLowerCase().includes(companyQuery);
  }

  function locationSlug(region) {
    return companySlug(region);
  }

  function locationFromSlug(slug) {
    if (!slug || slug === "all" || !locationSelect) return "all";
    const match = [...locationSelect.options].find((opt) => locationSlug(opt.value) === slug);
    return match ? match.value : "all";
  }

  function syncUrlFromFilters() {
    const params = new URLSearchParams();
    if (activeCompany !== "all") params.set("company", activeCompany);
    if (activeLocation !== "all") params.set("location", locationSlug(activeLocation));
    if (activeStatus !== "open") params.set("status", activeStatus);
    if (activeFilter !== "all") params.set("type", activeFilter);
    if (activeTag !== "all") params.set("tag", activeTag);
    if (sortMode !== "newest") params.set("sort", sortMode);
    if (searchQuery) params.set("q", searchQuery);

    const qs = params.toString();
    const path = window.location.pathname || "/jobs/";
    const next = qs ? `${path}?${qs}` : path;
    const current = `${window.location.pathname}${window.location.search}`;
    if (current !== next) {
      window.history.replaceState({ jobsFilter: true }, "", next);
    }
    if (shareHint) {
      shareHint.hidden =
        activeCompany === "all" && activeLocation === "all" && !searchQuery && !companyQuery;
    }
  }

  function applyFiltersFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      const companyParam = companySlug(params.get("company") || "");
      const locationParam = companySlug(params.get("location") || "");
      const statusParam = (params.get("status") || "").trim().toLowerCase();
      const typeParam = (params.get("type") || "").trim().toLowerCase();
      const tagParam = (params.get("tag") || "").trim().toLowerCase();
      const sortParam = (params.get("sort") || "").trim().toLowerCase();
      const qParam = (params.get("q") || "").trim();

      if (companyParam) {
        const match = companyCatalog.find((item) => {
          const val = item.key;
          const label = companySlug(item.label);
          return (
            val === companyParam ||
            val.includes(companyParam) ||
            label.includes(companyParam) ||
            companyParam.includes(val)
          );
        });
        if (match) {
          selectCompany(match.key, match.label, false);
        }
      }

      if (locationParam && locationSelect) {
        const loc = locationFromSlug(locationParam);
        if (loc !== "all") {
          locationSelect.value = loc;
          activeLocation = loc;
        }
      }

      if (statusParam && ["open", "closing", "expired", "all"].includes(statusParam)) {
        activeStatus = statusParam;
      }
      if (typeParam) activeFilter = typeParam;
      if (tagParam) activeTag = tagParam;
      if (sortParam) {
        sortMode = sortParam;
        if (sortSelect) sortSelect.value = sortParam;
      }
      if (qParam) {
        searchQuery = qParam.toLowerCase();
        if (searchInput) searchInput.value = qParam;
      }

      const syncGroup = (bar, attr, value) => {
        if (!bar) return;
        bar.querySelectorAll(`[data-${attr}]`).forEach((btn) => {
          const isActive = btn.dataset[attr] === value;
          btn.classList.toggle("is-active", isActive);
          btn.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
      };
      syncGroup(filterBar, "filter", activeFilter);
      syncGroup(statusBar, "status", activeStatus);
      syncGroup(tagBar, "tag", activeTag);
    } catch (_e) {
      /* ignore bad query */
    }
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
      job.experienceRange,
      job.workMode,
      ...(job.roles || []),
      ...(job.tags || []),
      ...(job.requirements || []),
      job.description || ""
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(searchQuery);
  }

  function deadlineSortValue(job) {
    const ts = parseIso(job.applyDeadline);
    return ts === null ? Number.POSITIVE_INFINITY : ts;
  }

  function filteredJobs() {
    const list = JOBS.filter(
      (job) =>
        matchesFilter(job) &&
        matchesStatus(job) &&
        matchesTag(job) &&
        matchesLocation(job) &&
        matchesCompany(job) &&
        matchesSearch(job)
    );

    const expiredWeight = (job) =>
      activeStatus === "expired"
        ? 0
        : deadlineStatus(job) === "expired"
          ? 1
          : 0;

    list.sort((a, b) => {
      const sink = expiredWeight(a) - expiredWeight(b);
      if (sink !== 0) return sink;

      // Keep high-volume hiring near the top for default newest browsing.
      if (sortMode === "newest") {
        const massDelta = Number(isMassHiring(b)) - Number(isMassHiring(a));
        if (massDelta !== 0) return massDelta;
      }

      if (sortMode === "deadline") {
        return deadlineSortValue(a) - deadlineSortValue(b);
      }
      if (sortMode === "closing") {
        const la = daysLeft(a);
        const lb = daysLeft(b);
        const va = la === null || la < 0 ? Number.POSITIVE_INFINITY : la;
        const vb = lb === null || lb < 0 ? Number.POSITIVE_INFINITY : lb;
        if (va !== vb) return va - vb;
        return String(b.postedDate || "").localeCompare(String(a.postedDate || ""));
      }
      if (sortMode === "company") {
        return String(a.company || "").localeCompare(String(b.company || ""));
      }
      if (sortMode === "roles") {
        return (b.roles || []).length - (a.roles || []).length;
      }
      return String(b.postedDate || "").localeCompare(String(a.postedDate || ""));
    });

    return list;
  }

  /* ---------- rendering ---------- */

  function jobHref(job) {
    const id = job.id || String(job.company || "").toLowerCase().replace(/\s+/g, "-");
    return `/job/${encodeURIComponent(id)}`;
  }

  function assetUrl(path) {
    if (!path) return "";
    const value = String(path);
    if (/^(https?:|data:|mailto:|tel:|\/\/)/i.test(value)) return value;
    return `/${value.replace(/^\.?\//, "")}`;
  }

  function logoBlock(job, sizeClass) {
    const mark = initials(job.company);
    const size = sizeClass ? ` ${sizeClass}` : "";
    const src = assetUrl(job.logo);
    if (src) {
      return `
        <div class="job-logo-wrap${size}" aria-hidden="true">
          <img class="job-logo-img" src="${escapeAttr(src)}" alt="" loading="lazy" width="48" height="48" />
        </div>
      `;
    }
    return `
      <div class="job-logo-wrap job-logo-wrap--text${size}" data-initials="${escapeAttr(mark)}" aria-hidden="true">
        <span class="job-logo-fallback">${escapeHtml(mark)}</span>
      </div>
    `;
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

  function massHiringRibbonHtml() {
    return `<span class="job-mass-ribbon" aria-label="Mass hiring">🔥 100+ Hiring</span>`;
  }

  function cardToplineHtml(job, mass, expired) {
    if (!mass || expired) return "";
    const deadline = deadlinePill(job);
    return `
      <div class="job-card-topline">
        ${massHiringRibbonHtml()}
        ${deadline}
      </div>
    `;
  }

  /** Card preview: short role title only (full details on job page). */
  function cardRoleLabel(role) {
    return String(role || "").split("—")[0].trim();
  }

  function shortCardText(value, maxLen) {
    const text = String(value || "").replace(/\s+/g, " ").trim();
    if (!text) return "";
    if (text.length <= maxLen) return text;
    return `${text.slice(0, Math.max(0, maxLen - 1)).trim()}…`;
  }

  function cardBlurb(job) {
    if (isWalkInJob(job)) {
      const date = walkInDateText(job);
      const time = job.walkinTime ? String(job.walkinTime).replace(/\s+onwards$/i, "") : "";
      // Vacancy count is already shown via mass badge / ribbon — don't repeat "100+" in the blurb.
      const bits = [date ? `Walk-in ${date}` : "Walk-in drive", time].filter(Boolean).join(" · ");
      return shortCardText(bits, 96);
    }
    return shortCardText(job.companyBlurb || job.description || "", 96);
  }

  function rolesListHtml(roles, limit) {
    const list = (roles || []).map(cardRoleLabel).filter(Boolean);
    const shown = typeof limit === "number" ? list.slice(0, limit) : list;
    const extra = typeof limit === "number" ? Math.max(0, list.length - limit) : 0;
    const items = shown.map((role) => `<li>${escapeHtml(role)}</li>`).join("");
    const more =
      extra > 0 ? `<li class="job-roles-more">+${extra} more role${extra > 1 ? "s" : ""}</li>` : "";
    return `<ul class="job-roles">${items}${more}</ul>`;
  }

  function deadlinePill(job) {
    const status = deadlineStatus(job);
    const label = deadlineLabel(job);
    if (!label) return "";
    return `<span class="job-deadline-pill job-deadline-pill--${status}">${escapeHtml(label)}</span>`;
  }

  function factChip(label, value) {
    if (!value) return "";
    return `
      <span class="job-fact">
        <span class="job-fact-label">${escapeHtml(label)}</span>
        <span class="job-fact-value">${escapeHtml(value)}</span>
      </span>
    `;
  }

  function renderFeaturedCard(job) {
    const exp = job.experience || "both";
    const badgeLabel = EXP_LABELS[exp] || EXP_LABELS.both;
    const role = (job.roles || [])[0] || "Hiring";
    const walkDate = walkInDateText(job);
    const openings = vacancyLabel(job) || "100+";
    return `
      <article class="job-featured-card">
        <header class="job-featured-head">
          ${logoBlock(job, "job-logo-wrap--lg")}
          <div class="job-featured-meta">
            <p class="job-featured-company">${escapeHtml(job.company || "")}</p>
            <h3 class="job-featured-role">${escapeHtml(role)}</h3>
            <p class="job-featured-location">${escapeHtml(job.location || "")}</p>
          </div>
          <span class="job-featured-flag">🔥 MASS HIRING</span>
        </header>
        <ul class="job-featured-facts">
          ${
            job.industry
              ? `<li><span>Industry</span><strong>${escapeHtml(job.industry)}</strong></li>`
              : ""
          }
          <li><span>Experience</span><strong>${escapeHtml(job.experienceRange || job.experienceYears || badgeLabel)}</strong></li>
          <li><span>Openings</span><strong>${escapeHtml(openings)} Openings</strong></li>
          ${
            isWalkInJob(job)
              ? `<li><span>Walk-in</span><strong>${escapeHtml(walkDate || "Available")}</strong></li>`
              : ""
          }
        </ul>
        <div class="job-featured-aside">
          <div class="job-featured-badges">
            ${massHiringBadgeHtml()}
            ${isWalkInJob(job) ? `<span class="job-badge job-badge--walkin">Walk-In Available</span>` : ""}
          </div>
          <footer class="job-featured-actions">
            <a class="btn btn-secondary" href="${escapeAttr(jobHref(job))}">View Details</a>
          </footer>
        </div>
      </article>
    `;
  }

  function renderMassHiringSection(jobs) {
    if (!massHiringSection || !massHiringTrack) return;
    const featured = jobs.filter(
      (job) => isMassHiring(job) && deadlineStatus(job) !== "expired"
    );
    // Hide strip when Mass Hiring filter is on (grid already shows these) or when scoped search/company.
    const showStrip =
      featured.length > 0 &&
      activeFilter !== "masshiring" &&
      activeCompany === "all" &&
      !searchQuery &&
      !companyQuery;
    massHiringSection.hidden = !showStrip;
    if (!showStrip) {
      massHiringTrack.innerHTML = "";
      return;
    }
    if (massHiringCount) {
      massHiringCount.textContent =
        featured.length === 1 ? "1 campaign" : `${featured.length} campaigns`;
    }
    massHiringTrack.dataset.count = String(featured.length);
    massHiringTrack.innerHTML = featured.map((job) => renderFeaturedCard(job)).join("");
  }

  function renderCard(job, index) {
    const exp = job.experience || "both";
    const badgeLabel = EXP_LABELS[exp] || EXP_LABELS.both;
    const status = deadlineStatus(job);
    const expired = status === "expired";
    const mass = isMassHiring(job);
    const companyFoot = job.company
      ? `<a class="job-source job-company-link" href="${escapeAttr(`/company/${companyKey(job)}/`)}">${escapeHtml(job.company)}</a>`
      : "";
    const previewBlurb = cardBlurb(job);
    const blurb = previewBlurb ? `<p class="job-desc">${escapeHtml(previewBlurb)}</p>` : "";
    const roleCount = (job.roles || []).length;
    const modeShort = job.workMode
      ? String(job.workMode).split("·")[0].trim()
      : "";
    const expShort = shortCardText(job.experienceRange || job.experienceYears || "", 22);

    const badges = [
      expired
        ? `<span class="job-badge job-badge--expired" title="Apply deadline has passed">EXPIRED</span>`
        : "",
      !expired && mass ? massHiringBadgeHtml() : "",
      !expired && status === "closing"
        ? `<span class="job-badge job-badge--closing">Closing soon</span>`
        : "",
      !expired && isNew(job) ? `<span class="job-badge job-badge--new">New</span>` : "",
      !expired && (job.alertSheet || job.urgentHiring)
        ? `<span class="job-badge job-badge--alert${job.urgentHiring ? " job-badge--urgent" : ""}">${escapeHtml(
            shortCardText(job.alertBadge || (job.urgentHiring ? "Hiring Alert" : "Intern Alert"), 18)
          )}</span>`
        : "",
      `<span class="job-badge job-badge--${escapeHtml(exp)}">${escapeHtml(badgeLabel)}</span>`,
      isWalkInJob(job) && !(job.alertSheet || job.urgentHiring)
        ? `<span class="job-badge job-badge--walkin">Walk-in</span>`
        : "",
      job.verified ? `<span class="job-badge job-badge--verified">Verified</span>` : ""
    ]
      .filter(Boolean)
      .join("");

    const facts = [
      factChip("Type", job.employmentType || job.workStatus),
      factChip("Mode", modeShort),
      factChip("Exp", expShort),
      factChip("Posted", job.postedDate ? formatDate(job.postedDate) : "")
    ]
      .filter(Boolean)
      .join("");

    const tagChips = (job.tags || [])
      .slice(0, 3)
      .map((tag) => `<span class="job-tag-pill">${escapeHtml(tag)}</span>`)
      .join("");

    const ctaLabel = expired ? "View expired listing" : "View Details";

    return `
      <article
        class="job-card${expired ? " job-card--expired" : ""}${status === "closing" ? " job-card--closing" : ""}${mass && !expired ? " job-card--mass-hiring" : ""}${job.urgentHiring && !expired ? " job-card--urgent" : ""}"
        data-experience="${escapeHtml(exp)}"
        style="--delay: ${Math.min(index, 8) * 40}ms"
      >
        <div class="job-card-accent" aria-hidden="true"></div>
        ${cardToplineHtml(job, mass, expired)}
        <header class="job-card-head">
          ${logoBlock(job)}
          <div class="job-card-meta">
            <h3><a class="job-company-link" href="${escapeAttr(`/company/${companyKey(job)}/`)}">${escapeHtml(job.company)}</a></h3>
            <p class="job-location">${escapeHtml(job.location || "")}</p>
          </div>
          ${mass && !expired ? "" : deadlinePill(job)}
        </header>
        <div class="job-card-tags">${badges}</div>
        ${facts ? `<div class="job-fact-row">${facts}</div>` : ""}
        <div class="job-card-body">
          <p class="job-roles-label">${
            roleCount === 1 ? "Open role" : `${roleCount} open roles`
          }</p>
          ${rolesListHtml(job.roles, MAX_ROLES_ON_CARD)}
          ${blurb}
        </div>
        ${tagChips ? `<div class="job-tag-row">${tagChips}</div>` : ""}
        <footer class="job-card-foot">
          <div class="job-meta-row">
            ${companyFoot}
          </div>
          <a class="btn ${expired ? "btn-secondary" : "btn-primary"} job-details-btn" href="${escapeAttr(jobHref(job))}">
            ${ctaLabel}
          </a>
        </footer>
      </article>
    `;
  }

  function hasActiveFilters() {
    return (
      activeFilter !== "all" ||
      activeStatus !== "open" ||
      activeTag !== "all" ||
      activeLocation !== "all" ||
      activeCompany !== "all" ||
      companyQuery !== "" ||
      searchQuery !== "" ||
      sortMode !== "newest"
    );
  }

  function updateStatusFilterLabels() {
    if (!statusBar) return;
    const openCount = JOBS.filter((job) => deadlineStatus(job) !== "expired").length;
    const closingCount = JOBS.filter((job) => deadlineStatus(job) === "closing").length;
    const expiredCount = JOBS.filter((job) => deadlineStatus(job) === "expired").length;
    const labels = {
      open: `Open jobs (${openCount})`,
      closing: `Closing soon (${closingCount})`,
      expired: `Expired only (${expiredCount})`,
      all: `Open + Expired (${JOBS.length})`
    };
    statusBar.querySelectorAll("[data-status]").forEach((btn) => {
      const key = btn.dataset.status;
      if (labels[key]) btn.textContent = labels[key];
    });
  }

  function render() {
    const jobs = filteredJobs();
    const visible = jobs.slice(0, visibleCount);
    grid.innerHTML = visible.map((job, i) => renderCard(job, i)).join("");
    renderMassHiringSection(jobs);

    if (expiredBanner) {
      expiredBanner.hidden = activeStatus !== "expired" && activeStatus !== "all";
      if (activeStatus === "all") {
        expiredBanner.innerHTML = `
          <strong>Mixed view: Open + Expired</strong>
          <p>
            Cards marked <span class="job-badge job-badge--expired">EXPIRED</span> have passed their deadline.
            Prefer the <strong>Open jobs</strong> filter for current hiring. Always verify with the company.
          </p>`;
      } else if (activeStatus === "expired") {
        expiredBanner.innerHTML = `
          <strong>You are viewing expired listings only</strong>
          <p>
            These openings have passed their apply / walk-in date. Do <em>not</em> travel or apply unless the
            company confirms the role is still open. Switch back to <strong>Open jobs</strong> for current hiring.
          </p>`;
      }
    }

    if (countEl) {
      const roleCount = jobs.reduce((sum, job) => sum + (job.roles || []).length, 0);
      const expiredInView = jobs.filter((job) => deadlineStatus(job) === "expired").length;
      const closingCount = jobs.filter((job) => deadlineStatus(job) === "closing").length;
      const companyName = companyLabelFromSlug(activeCompany);
      const parts = [];

      if (companyName) {
        parts.push(`Company: ${companyName}`);
        parts.push(roleCount === 1 ? "1 open role shown" : `${roleCount} roles shown`);
      } else {
        parts.push(jobs.length === 1 ? "1 listing" : `${jobs.length} listings`);
        parts.push(`${roleCount} roles`);
      }

      if (activeStatus === "expired") parts.unshift("Expired archive");
      else if (activeStatus === "open") parts.unshift("Open hiring");
      else if (activeStatus === "closing") parts.unshift("Closing soon");

      if (activeLocation !== "all") parts.push(activeLocation);
      if (closingCount > 0 && activeStatus !== "expired") parts.push(`${closingCount} closing soon`);
      if (expiredInView > 0 && activeStatus === "all") parts.push(`${expiredInView} expired`);

      countEl.textContent = parts.join(" · ");
    }

    if (companyBanner) {
      if (activeCompany !== "all") {
        const companyName = companyLabelFromSlug(activeCompany);
        const roleCount = jobs.reduce((sum, job) => sum + (job.roles || []).length, 0);
        const sharePath = `${window.location.pathname}?company=${encodeURIComponent(activeCompany)}`;
        companyBanner.hidden = false;
        companyBanner.innerHTML = `
          <div>
            <strong>${escapeHtml(companyName)}</strong>
            <p>
              Showing ${roleCount} role${roleCount === 1 ? "" : "s"} for this company.
              Shareable link updates in the address bar as
              <code>${escapeHtml(sharePath)}</code>.
              Expired roles appear under <strong>Expired only</strong>.
            </p>
          </div>
          <div class="jobs-company-banner-actions">
            <a class="btn btn-primary" href="${escapeAttr(`/company/${activeCompany}/`)}">Company profile</a>
            <button type="button" class="btn btn-secondary" id="jobs-clear-company">Clear company</button>
            <button type="button" class="btn btn-ghost" id="jobs-copy-company-link">Copy link</button>
          </div>
        `;
        const clearCompanyBtn = document.getElementById("jobs-clear-company");
        const copyLinkBtn = document.getElementById("jobs-copy-company-link");
        if (clearCompanyBtn) {
          clearCompanyBtn.addEventListener("click", () => {
            clearCompanyFilter();
            resetVisibleAndRender();
          });
        }
        if (copyLinkBtn) {
          copyLinkBtn.addEventListener("click", async () => {
            const url = `${window.location.origin}${sharePath}`;
            try {
              await navigator.clipboard.writeText(url);
              copyLinkBtn.textContent = "Copied";
              setTimeout(() => {
                copyLinkBtn.textContent = "Copy link";
              }, 1600);
            } catch (_e) {
              window.prompt("Copy this company jobs link:", url);
            }
          });
        }
      } else {
        companyBanner.hidden = true;
        companyBanner.innerHTML = "";
      }
    }

    syncUrlFromFilters();

    if (clearBtn) {
      clearBtn.hidden = !hasActiveFilters();
    }

    if (emptyState) {
      emptyState.hidden = jobs.length > 0;
      if (jobs.length === 0 && activeStatus === "expired") {
        emptyState.innerHTML = `No expired listings in this filter — great news. Switch to <strong>Open jobs</strong> to browse current openings, or follow our <a href="https://whatsapp.com/channel/0029VbDJFfA4Y9lm5L4kpm22" target="_blank" rel="noopener noreferrer">WhatsApp channel</a>.`;
      } else if (jobs.length === 0) {
        emptyState.innerHTML = `No listings match — check back soon or follow our <a href="https://whatsapp.com/channel/0029VbDJFfA4Y9lm5L4kpm22" target="_blank" rel="noopener noreferrer">WhatsApp channel</a> for live updates.`;
      }
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

  /* ---------- hero stats + dynamic controls ---------- */

  function updateHeroStats() {
    const active = JOBS.filter((job) => deadlineStatus(job) !== "expired");
    const roleCount = active.reduce((sum, job) => sum + (job.roles || []).length, 0);
    const fresherFriendly = active.filter(
      (job) => job.experience === "fresher" || job.experience === "both"
    ).length;
    const closingWeek = JOBS.filter((job) => deadlineStatus(job) === "closing").length;

    if (statCompanies) statCompanies.textContent = String(active.length);
    if (statRoles) statRoles.textContent = String(roleCount);
    if (statFreshers) statFreshers.textContent = String(fresherFriendly);
    if (statClosing) statClosing.textContent = String(closingWeek);
  }

  function buildTagChips() {
    if (!tagBar) return;
    const tags = new Set();
    JOBS.forEach((job) => (job.tags || []).forEach((tag) => tags.add(String(tag))));
    const sorted = [...tags].sort((a, b) => a.localeCompare(b));

    tagBar.innerHTML = [
      `<button type="button" class="jobs-tag-chip is-active" data-tag="all" aria-pressed="true">All categories</button>`,
      ...sorted.map(
        (tag) =>
          `<button type="button" class="jobs-tag-chip" data-tag="${escapeAttr(
            tag.toLowerCase()
          )}" aria-pressed="false">${escapeHtml(tag)}</button>`
      )
    ].join("");
  }

  function buildLocationOptions() {
    if (!locationSelect) return;
    const counts = new Map();
    JOBS.forEach((job) => {
      const region = jobRegion(job);
      counts.set(region, (counts.get(region) || 0) + 1);
    });
    const preferred = [
      "Infopark, Kochi",
      "Technopark, Trivandrum",
      "Infopark, Thrissur",
      "Cyberpark, Calicut",
      "Kochi",
      "Trivandrum",
      "Calicut"
    ];
    const sorted = [...counts.entries()].sort((a, b) => {
      const ai = preferred.indexOf(a[0]);
      const bi = preferred.indexOf(b[0]);
      if (ai !== -1 || bi !== -1) {
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      }
      return b[1] - a[1] || a[0].localeCompare(b[0]);
    });
    const current = locationSelect.value || "all";
    locationSelect.innerHTML = [
      `<option value="all">All locations</option>`,
      ...sorted.map(
        ([region, count]) =>
          `<option value="${escapeAttr(region)}">${escapeHtml(region)} (${count})</option>`
      )
    ].join("");
    locationSelect.value = [...locationSelect.options].some((opt) => opt.value === current)
      ? current
      : "all";
  }

  function hideCompanySuggestions() {
    if (!companySuggest || !companyInput) return;
    companySuggest.hidden = true;
    companySuggest.innerHTML = "";
    companyInput.setAttribute("aria-expanded", "false");
    suggestIndex = -1;
  }

  function filterCompanyMatches(query) {
    const q = String(query || "").trim().toLowerCase();
    if (!q) return [];
    return companyCatalog
      .filter((item) => {
        const label = item.label.toLowerCase();
        return label.includes(q) || item.key.includes(companySlug(q));
      })
      .slice(0, 8);
  }

  function renderCompanySuggestions(query) {
    if (!companySuggest || !companyInput) return;
    const matches = filterCompanyMatches(query);
    if (!matches.length) {
      hideCompanySuggestions();
      return;
    }
    companySuggest.innerHTML = matches
      .map(
        (item, index) =>
          `<li role="option" id="jobs-company-opt-${index}" class="jobs-company-suggest-item" data-key="${escapeAttr(
            item.key
          )}" data-label="${escapeAttr(item.label)}" aria-selected="false">` +
          `<span class="jobs-company-suggest-name">${escapeHtml(item.label)}</span>` +
          `<span class="jobs-company-suggest-count">${item.count}</span>` +
          `</li>`
      )
      .join("");
    companySuggest.hidden = false;
    companyInput.setAttribute("aria-expanded", "true");
    suggestIndex = -1;
  }

  function highlightSuggest(index) {
    if (!companySuggest) return;
    const items = [...companySuggest.querySelectorAll(".jobs-company-suggest-item")];
    items.forEach((el, i) => {
      const on = i === index;
      el.classList.toggle("is-active", on);
      el.setAttribute("aria-selected", on ? "true" : "false");
    });
    suggestIndex = index;
    if (index >= 0 && items[index]) {
      companyInput?.setAttribute("aria-activedescendant", items[index].id);
    } else {
      companyInput?.removeAttribute("aria-activedescendant");
    }
  }

  function selectCompany(key, label, shouldRender) {
    activeCompany = key || "all";
    companyQuery = "";
    if (companyInput) {
      companyInput.value = activeCompany === "all" ? "" : label || companyLabelFromSlug(key);
    }
    hideCompanySuggestions();
    if (shouldRender !== false) resetVisibleAndRender();
  }

  function clearCompanyFilter() {
    activeCompany = "all";
    companyQuery = "";
    if (companyInput) companyInput.value = "";
    hideCompanySuggestions();
  }

  function buildCompanyOptions() {
    const counts = new Map();
    JOBS.forEach((job) => {
      const name = String(job.company || "").trim();
      if (!name) return;
      const key = companyKey(job);
      const prev = counts.get(key);
      if (prev) prev.count += 1;
      else counts.set(key, { label: name, count: 1 });
    });
    companyCatalog = [...counts.entries()]
      .sort((a, b) => a[1].label.localeCompare(b[1].label, undefined, { sensitivity: "base" }))
      .map(([key, info]) => ({ key, label: info.label, count: info.count }));
  }

  function clearAllFilters() {
    activeFilter = "all";
    activeStatus = "open";
    activeTag = "all";
    activeLocation = "all";
    searchQuery = "";
    sortMode = "newest";
    clearCompanyFilter();

    if (searchInput) searchInput.value = "";
    if (sortSelect) sortSelect.value = "newest";
    if (locationSelect) locationSelect.value = "all";

    const syncGroup = (bar, attr, value) => {
      if (!bar) return;
      bar.querySelectorAll(`[data-${attr}]`).forEach((btn) => {
        const isActive = btn.dataset[attr] === value;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    };
    syncGroup(filterBar, "filter", "all");
    syncGroup(statusBar, "status", "open");
    syncGroup(tagBar, "tag", "all");

    resetVisibleAndRender();
  }

  /* ---------- events ---------- */

  function bindChipGroup(bar, attr, onChange) {
    if (!bar) return;
    bar.addEventListener("click", (event) => {
      const button = event.target.closest(`[data-${attr}]`);
      if (!button) return;
      onChange(button.dataset[attr]);
      bar.querySelectorAll(`[data-${attr}]`).forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
      resetVisibleAndRender();
    });
  }

  bindChipGroup(filterBar, "filter", (value) => (activeFilter = value));
  bindChipGroup(statusBar, "status", (value) => (activeStatus = value));
  bindChipGroup(tagBar, "tag", (value) => (activeTag = value));

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

  if (locationSelect) {
    locationSelect.addEventListener("change", () => {
      activeLocation = locationSelect.value || "all";
      resetVisibleAndRender();
    });
  }

  if (companyInput) {
    companyInput.addEventListener("input", () => {
      const raw = companyInput.value;
      companyQuery = raw.trim().toLowerCase();
      activeCompany = "all";
      renderCompanySuggestions(raw);
      resetVisibleAndRender();
    });

    companyInput.addEventListener("keydown", (event) => {
      if (!companySuggest || companySuggest.hidden) {
        if (event.key === "Escape") {
          companyInput.blur();
        }
        return;
      }
      const items = [...companySuggest.querySelectorAll(".jobs-company-suggest-item")];
      if (!items.length) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        highlightSuggest(Math.min(suggestIndex + 1, items.length - 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        highlightSuggest(Math.max(suggestIndex - 1, 0));
      } else if (event.key === "Enter") {
        event.preventDefault();
        const pick = items[suggestIndex >= 0 ? suggestIndex : 0];
        if (pick) selectCompany(pick.dataset.key, pick.dataset.label);
      } else if (event.key === "Escape") {
        hideCompanySuggestions();
      }
    });

    companyInput.addEventListener("blur", () => {
      setTimeout(() => hideCompanySuggestions(), 150);
    });
  }

  if (companySuggest) {
    companySuggest.addEventListener("mousedown", (event) => {
      const item = event.target.closest(".jobs-company-suggest-item");
      if (!item) return;
      event.preventDefault();
      selectCompany(item.dataset.key, item.dataset.label);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", clearAllFilters);
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
  buildLocationOptions();
  buildCompanyOptions();
  applyFiltersFromUrl();
  updateStatusFilterLabels();
  render();
})();
