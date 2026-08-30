/**
 * Official park company directories. Missing fields stay blank.
 */
(function () {
  const mount = document.querySelector("[data-park-companies]");
  if (!mount) return;

  const PAGE_SIZE = 30;
  const sources = {
    infopark: typeof INFOPARK_COMPANIES !== "undefined" ? INFOPARK_COMPANIES : [],
    technopark: typeof TECHNOPARK_COMPANIES !== "undefined" ? TECHNOPARK_COMPANIES : [],
    cyberpark: typeof CYBERPARK_COMPANIES !== "undefined" ? CYBERPARK_COMPANIES : []
  };
  const PARK_LABEL = {
    infopark: "Infopark Kochi",
    technopark: "Technopark",
    cyberpark: "Cyberpark Kozhikode"
  };

  function parkFromUrl() {
    const q = String(new URLSearchParams(window.location.search).get("park") || "").toLowerCase();
    if (sources[q]) return q;
    return String(mount.getAttribute("data-park-companies") || "infopark").toLowerCase();
  }

  let park = parkFromUrl();
  if (!sources[park]) park = "infopark";
  let companies = Array.isArray(sources[park]) ? sources[park].slice() : [];

  const searchInput = mount.querySelector("[data-park-company-search]");
  const locationsEl = mount.querySelector("[data-park-company-locations]");
  const lettersEl = mount.querySelector("[data-park-company-letters]");
  const grid = mount.querySelector("[data-park-company-grid]");
  const moreBtn = mount.querySelector("[data-park-company-more]");
  const countEl = mount.querySelector("[data-park-company-count]");
  const emptyEl = mount.querySelector("[data-park-company-empty]");
  const headingEl = document.querySelector("[data-park-heading]");
  const tabs = document.querySelectorAll("[data-park-tab]");

  if (!grid) return;

  let campus = "all";
  let letter = "all";
  let visible = PAGE_SIZE;

  function campusesOf(list) {
    return Array.from(new Set(list.map((c) => String(c.campus || "").trim()).filter(Boolean))).sort((a, b) =>
      a.localeCompare(b)
    );
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

  function initials(name) {
    const words = String(name || "")
      .replace(/[^a-zA-Z0-9 ]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .filter((w) => !/^(pvt|ltd|limited|private|llc|inc|the|and|of)$/i.test(w));
    return (words[0] || name || "?").slice(0, 4).toUpperCase();
  }

  function firstLetter(name) {
    const ch = String(name || "").trim().charAt(0).toUpperCase();
    if (ch >= "A" && ch <= "Z") return ch;
    return "#";
  }

  function displaySite(url) {
    if (!url) return "";
    try {
      return new URL(url).hostname.replace(/^www\./i, "");
    } catch (_e) {
      return String(url).replace(/^https?:\/\//i, "");
    }
  }

  function query() {
    return String(searchInput && searchInput.value ? searchInput.value : "")
      .trim()
      .toLowerCase();
  }

  function filtered() {
    const q = query();
    return companies.filter((c) => {
      if (campus !== "all" && String(c.campus || "").trim() !== campus) return false;
      if (letter !== "all" && firstLetter(c.name) !== letter) return false;
      if (!q) return true;
      const hay = [c.name, c.building, c.address, c.website, c.email, c.phone, (c.domains || []).join(" "), c.campus]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }

  function card(c) {
    const profile = `/company/${encodeURIComponent(c.slug)}/`;
    const jobsHref = c.jobsUrl || `/jobs/?company=${encodeURIComponent(c.slug)}`;
    const jobsExternal = /^https?:\/\//i.test(c.jobsUrl || "");
    const domains = (c.domains || []).filter(Boolean).slice(0, 4);
    const mark = initials(c.name);
    const site = displaySite(c.website);
    const bits = [site || c.email, c.phone, c.building || c.campus].filter(Boolean);
    const logo = c.logo
      ? `<img src="${escapeAttr(c.logo)}" alt="" width="56" height="56" loading="lazy" />`
      : `<span>${escapeHtml(mark)}</span>`;

    return `
      <article class="co-row">
        <a class="co-row-main" href="${escapeAttr(profile)}">
          <div class="co-row-logo">${logo}</div>
          <div class="co-row-copy">
            <h3>${escapeHtml(c.name)}</h3>
            <p class="co-row-meta">${bits.length ? escapeHtml(bits.join("  ·  ")) : "&nbsp;"}</p>
            ${
              domains.length
                ? `<p class="co-row-tags">${domains.map((d) => `<span>${escapeHtml(d)}</span>`).join("")}</p>`
                : ""
            }
          </div>
        </a>
        <div class="co-row-actions">
          <a href="${escapeAttr(profile)}">Profile</a>
          <a href="${escapeAttr(jobsHref)}"${jobsExternal ? ' target="_blank" rel="noopener noreferrer"' : ""}>Jobs</a>
        </div>
      </article>
    `;
  }

  function renderLocations() {
    if (!locationsEl) return;
    const campuses = campusesOf(companies);
    const keys = [{ id: "all", label: "All campuses" }].concat(campuses.map((c) => ({ id: c, label: c })));
    if (locationsEl.tagName === "SELECT") {
      locationsEl.innerHTML = keys
        .map(
          (item) =>
            `<option value="${escapeAttr(item.id)}"${campus === item.id ? " selected" : ""}>${escapeHtml(item.label)}</option>`
        )
        .join("");
      return;
    }
    locationsEl.innerHTML = keys
      .map((item) => {
        const on = campus === item.id ? " is-on" : "";
        return `<button type="button" class="park-dir-loc${on}" data-campus="${escapeAttr(item.id)}">${escapeHtml(
          item.label
        )}</button>`;
      })
      .join("");
  }

  function renderLetters() {
    if (!lettersEl) return;
    const present = new Set(companies.map((c) => firstLetter(c.name)));
    const keys = ["all"].concat("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter((l) => present.has(l)));
    if (present.has("#")) keys.push("#");
    if (lettersEl.tagName === "SELECT") {
      lettersEl.innerHTML = keys
        .map((key) => {
          const label = key === "all" ? "All letters" : key;
          return `<option value="${escapeAttr(key)}"${letter === key ? " selected" : ""}>${escapeHtml(label)}</option>`;
        })
        .join("");
      return;
    }
    lettersEl.innerHTML = keys
      .map((key) => {
        const label = key === "all" ? "A–Z" : key;
        const on = letter === key ? " is-on" : "";
        return `<button type="button" class="park-co-letter${on}" data-letter="${escapeAttr(key)}">${escapeHtml(
          label
        )}</button>`;
      })
      .join("");
  }

  function renderTabs() {
    tabs.forEach((btn) => {
      const id = String(btn.getAttribute("data-park-tab") || "").toLowerCase();
      const n = (sources[id] || []).length;
      const count = btn.querySelector("[data-park-tab-count]");
      if (count) count.textContent = String(n);
      btn.classList.toggle("is-on", id === park);
    });
  }

  function renderHeading() {
    if (headingEl) headingEl.textContent = `${PARK_LABEL[park] || "Park"} companies`;
    document.title =
      mount.hasAttribute("data-park-sync-url")
        ? `${PARK_LABEL[park] || "Park"} companies | InfoparkDaily`
        : document.title;
  }

  function render() {
    const rows = filtered();
    if (countEl) countEl.textContent = String(rows.length);
    grid.innerHTML = rows.slice(0, visible).map((c) => card(c)).join("");
    if (emptyEl) emptyEl.hidden = rows.length > 0;
    if (moreBtn) moreBtn.hidden = visible >= rows.length;
  }

  function switchPark(next) {
    if (!sources[next]) return;
    park = next;
    companies = sources[park].slice();
    campus = "all";
    letter = "all";
    visible = PAGE_SIZE;
    if (searchInput) searchInput.value = "";
    mount.setAttribute("data-park-companies", park);
    if (mount.hasAttribute("data-park-sync-url")) {
      try {
        window.history.replaceState({}, "", `/companies/?park=${encodeURIComponent(park)}`);
      } catch (_e) {
        /* ignore */
      }
    }
    renderTabs();
    renderHeading();
    renderLocations();
    renderLetters();
    render();
  }

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      switchPark(String(btn.getAttribute("data-park-tab") || "").toLowerCase());
    });
  });

  if (locationsEl) {
    locationsEl.addEventListener(locationsEl.tagName === "SELECT" ? "change" : "click", (event) => {
      if (locationsEl.tagName === "SELECT") {
        campus = locationsEl.value || "all";
      } else {
        const btn = event.target.closest("[data-campus]");
        if (!btn) return;
        campus = btn.getAttribute("data-campus") || "all";
      }
      visible = PAGE_SIZE;
      if (locationsEl.tagName !== "SELECT") renderLocations();
      render();
    });
  }

  if (lettersEl) {
    lettersEl.addEventListener(lettersEl.tagName === "SELECT" ? "change" : "click", (event) => {
      if (lettersEl.tagName === "SELECT") {
        letter = lettersEl.value || "all";
      } else {
        const btn = event.target.closest("[data-letter]");
        if (!btn) return;
        letter = btn.getAttribute("data-letter") || "all";
      }
      visible = PAGE_SIZE;
      if (lettersEl.tagName !== "SELECT") renderLetters();
      render();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      visible = PAGE_SIZE;
      render();
    });
  }

  if (moreBtn) {
    moreBtn.addEventListener("click", () => {
      visible += PAGE_SIZE;
      render();
    });
  }

  mount.setAttribute("data-park-companies", park);
  renderTabs();
  renderHeading();
  renderLocations();
  renderLetters();
  render();
})();
