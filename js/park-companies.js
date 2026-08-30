/**
 * Official park company directories — Infopark-style catalog, InfoparkDaily premium UI.
 * Data comes only from the park sites. Missing fields stay blank.
 */
(function () {
  const mount = document.querySelector("[data-park-companies]");
  if (!mount) return;

  const PAGE_SIZE = 24;
  const park = String(mount.getAttribute("data-park-companies") || "").toLowerCase();
  const sources = {
    infopark: typeof INFOPARK_COMPANIES !== "undefined" ? INFOPARK_COMPANIES : [],
    technopark: typeof TECHNOPARK_COMPANIES !== "undefined" ? TECHNOPARK_COMPANIES : [],
    cyberpark: typeof CYBERPARK_COMPANIES !== "undefined" ? CYBERPARK_COMPANIES : []
  };
  const companies = Array.isArray(sources[park]) ? sources[park].slice() : [];

  const searchInput = mount.querySelector("[data-park-company-search]");
  const locationsEl = mount.querySelector("[data-park-company-locations]");
  const lettersEl = mount.querySelector("[data-park-company-letters]");
  const grid = mount.querySelector("[data-park-company-grid]");
  const moreBtn = mount.querySelector("[data-park-company-more]");
  const countEl = mount.querySelector("[data-park-company-count]");
  const emptyEl = mount.querySelector("[data-park-company-empty]");

  if (!grid) return;

  const campuses = Array.from(
    new Set(companies.map((c) => String(c.campus || "").trim()).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  let campus = "all";
  let letter = "all";
  let visible = PAGE_SIZE;

  const ICO_WEB =
    '<svg class="park-dir-ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3 12h18M12 3c2.4 2.6 3.6 5.4 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.4-3.6-9S9.6 5.6 12 3z" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>';
  const ICO_PHONE =
    '<svg class="park-dir-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 3.6h3.1l1.2 3.1-1.9 1.2a12.2 12.2 0 0 0 6.3 6.3l1.2-1.9 3.1 1.2v3.1c0 .9-.8 1.7-1.7 1.7C9.4 18.3 5.7 14.6 5.7 5.3c0-.9.8-1.7 1.5-1.7z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';

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

  function contactRow(icon, value, href) {
    const empty = !value;
    const inner = value ? escapeHtml(value) : "&nbsp;";
    const body =
      href && value
        ? `<a href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">${inner}</a>`
        : inner;
    return `<p class="park-dir-contact${empty ? " is-empty" : ""}">${icon}<span>${body}</span></p>`;
  }

  function card(c, index) {
    const profile = `/company/${encodeURIComponent(c.slug)}/`;
    const jobsHref = c.jobsUrl || `/jobs/?company=${encodeURIComponent(c.slug)}`;
    const jobsExternal = /^https?:\/\//i.test(c.jobsUrl || "");
    const domains = (c.domains || []).filter(Boolean);
    const mark = initials(c.name);
    const site = displaySite(c.website);
    const delay = Math.min(index, 11) * 40;
    const logo = c.logo
      ? `<img src="${escapeAttr(c.logo)}" alt="" width="96" height="96" loading="lazy" />`
      : `<span class="park-dir-mark">${escapeHtml(mark)}</span>`;

    return `
      <article class="park-dir-card" style="--delay: ${delay}ms">
        <div class="park-dir-logo">${logo}</div>
        <h3>${escapeHtml(c.name)}</h3>
        <div class="park-dir-rule" aria-hidden="true"></div>
        ${contactRow(ICO_WEB, site, c.website)}
        ${contactRow(ICO_PHONE, c.phone, c.phone ? `tel:${String(c.phone).replace(/[^\d+]/g, "")}` : "")}
        ${
          domains.length
            ? `<p class="park-dir-domain-label">Domain</p>
               <ul class="park-dir-tags">${domains
                 .map((d) => `<li>${escapeHtml(d)}</li>`)
                 .join("")}</ul>`
            : `<p class="park-dir-domain-label">Domain</p><ul class="park-dir-tags park-dir-tags--empty"><li>&nbsp;</li></ul>`
        }
        <div class="park-dir-actions">
          <a class="park-dir-btn" href="${escapeAttr(jobsHref)}"${
            jobsExternal ? ' target="_blank" rel="noopener noreferrer"' : ""
          }>Job Openings</a>
          <a class="park-dir-btn park-dir-btn--gold" href="${escapeAttr(profile)}">Company Profile</a>
        </div>
      </article>
    `;
  }

  function renderLocations() {
    if (!locationsEl) return;
    const keys = [{ id: "all", label: "All Locations" }].concat(
      campuses.map((c) => ({ id: c, label: c }))
    );
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

  function render() {
    const rows = filtered();
    if (countEl) countEl.textContent = String(rows.length);
    const slice = rows.slice(0, visible);
    grid.innerHTML = slice.map((c, i) => card(c, i)).join("");
    if (emptyEl) emptyEl.hidden = rows.length > 0;
    if (moreBtn) moreBtn.hidden = slice.length >= rows.length;
  }

  if (locationsEl) {
    locationsEl.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-campus]");
      if (!btn) return;
      campus = btn.getAttribute("data-campus") || "all";
      visible = PAGE_SIZE;
      renderLocations();
      render();
    });
  }

  if (lettersEl) {
    lettersEl.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-letter]");
      if (!btn) return;
      letter = btn.getAttribute("data-letter") || "all";
      visible = PAGE_SIZE;
      renderLetters();
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

  renderLocations();
  renderLetters();
  render();
})();
