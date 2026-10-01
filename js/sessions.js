(function () {
  const grid = document.getElementById("sessions-grid");
  const featuredWrap = document.getElementById("sessions-featured");
  const filterBar = document.getElementById("sessions-filters");
  const emptyState = document.getElementById("sessions-empty");
  if (!grid || typeof SESSIONS === "undefined") return;

  const NEW_DAYS = 7;
  const DAY_MS = 24 * 60 * 60 * 1000;
  let activeCategory = "all";

  function escapeHtml(v) {
    return String(v ?? "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function escapeAttr(v) { return escapeHtml(v).replace(/'/g, "&#39;"); }

  function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(`${iso}T00:00:00`);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }

  function isNew(item) {
    const d = new Date(`${item.date}T00:00:00`);
    if (Number.isNaN(d.getTime())) return false;
    const age = Date.now() - d.getTime();
    return age >= 0 && age <= NEW_DAYS * DAY_MS;
  }

  function clip(v, max) {
    const t = String(v || "").replace(/\s+/g, " ").trim();
    if (t.length <= max) return t;
    const cut = t.slice(0, max - 1).replace(/\s+\S*$/, "");
    return `${cut || t.slice(0, max - 1)}…`;
  }

  function sorted() {
    return [...SESSIONS].sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  }

  function priceBadgeClass(price) {
    if (!price) return "session-badge--mode";
    const p = price.toLowerCase();
    if (p === "free") return "session-badge--free";
    if (p === "paid") return "session-badge--paid";
    return "session-badge--partial";
  }

  function metaRow(item) {
    const price = item.price || "";
    const priceLabel = item.priceText || price || "";
    const modeBadge = item.mode ? `<span class="session-badge session-badge--mode">${escapeHtml(item.mode)}</span>` : "";
    const priceBadge = priceLabel ? `<span class="session-badge ${priceBadgeClass(price)}">${escapeHtml(priceLabel)}</span>` : "";
    const catBadge = item.category ? `<span class="session-badge session-badge--cat">${escapeHtml(item.category)}</span>` : "";
    const newBadge = isNew(item) ? `<span class="session-badge session-badge--new">New</span>` : "";
    return `<div class="session-meta">${catBadge}${modeBadge}${priceBadge}${newBadge}</div>`;
  }

  function dateRow(item) {
    if (!item.date && !item.location) return "";
    const parts = [];
    if (item.date) parts.push(formatDate(item.date));
    if (item.location) parts.push(escapeHtml(item.location));
    return `<p class="session-date-row">${parts.join(" &middot; ")}</p>`;
  }

  function regLink(item) {
    const link = item.registrationLink || "";
    if (!link) return "#";
    return link;
  }

  function renderFeatured(item) {
    if (!featuredWrap) return;
    if (!item) { featuredWrap.innerHTML = ""; return; }
    featuredWrap.innerHTML = `
      <a class="sessions-featured glass" href="${escapeAttr(regLink(item))}" target="_blank" rel="noopener noreferrer">
        <div class="news-featured-copy">
          <p class="eyebrow">Featured session</p>
          <p class="session-organizer">${escapeHtml(item.organizer || "")}</p>
          <h2 class="session-title">${escapeHtml(clip(item.title, 90))}</h2>
          <p class="session-summary">${escapeHtml(clip(item.summary, 200))}</p>
          ${metaRow(item)}
          ${dateRow(item)}
          <span class="btn btn-primary" style="margin-top:.75rem;display:inline-block">Register / Join →</span>
        </div>
        ${item.highlights && item.highlights.length ? `
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem">
          ${item.highlights.map(h => `<li style="font-size:.875rem;display:flex;gap:.5rem;align-items:flex-start"><span aria-hidden="true" style="color:#a78bfa;font-weight:700;flex-shrink:0">✓</span>${escapeHtml(h)}</li>`).join("")}
        </ul>
        ` : ""}
      </a>
    `;
  }

  function renderCard(item, index) {
    return `
      <a class="session-card glass" href="${escapeAttr(regLink(item))}" target="_blank" rel="noopener noreferrer" style="--delay:${Math.min(index,8)*40}ms">
        <div class="session-top">
          <p class="session-organizer">${escapeHtml(item.organizer || "")}</p>
        </div>
        <h3 class="session-title">${escapeHtml(clip(item.title, 70))}</h3>
        <p class="session-summary">${escapeHtml(clip(item.summary, 110))}</p>
        ${metaRow(item)}
        ${dateRow(item)}
        <p class="session-cta">Register / Join →</p>
      </a>
    `;
  }

  function buildFilters() {
    if (!filterBar) return;
    const cats = [...new Set(SESSIONS.map(s => s.category).filter(Boolean))];
    filterBar.innerHTML = [
      `<button type="button" class="jobs-filter-btn is-active" data-category="all" aria-pressed="true">All sessions</button>`,
      `<button type="button" class="jobs-filter-btn" data-category="free" aria-pressed="false">Free</button>`,
      `<button type="button" class="jobs-filter-btn" data-category="online" aria-pressed="false">Online</button>`,
      `<button type="button" class="jobs-filter-btn" data-category="offline" aria-pressed="false">Offline</button>`,
      ...cats.map(cat => `<button type="button" class="jobs-filter-btn" data-category="${escapeAttr(cat.toLowerCase())}" aria-pressed="false">${escapeHtml(cat)}</button>`)
    ].join("");

    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-category]");
      if (!btn) return;
      activeCategory = btn.dataset.category;
      filterBar.querySelectorAll("[data-category]").forEach(b => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });
      render();
    });
  }

  function filterList(all) {
    if (activeCategory === "all") return all;
    if (activeCategory === "free") return all.filter(s => (s.price || "").toLowerCase() === "free");
    if (activeCategory === "online") return all.filter(s => (s.mode || "").toLowerCase() === "online");
    if (activeCategory === "offline") return all.filter(s => (s.mode || "").toLowerCase() === "offline");
    return all.filter(s => (s.category || "").toLowerCase() === activeCategory);
  }

  function render() {
    const all = sorted();
    const list = filterList(all);
    const featured = activeCategory === "all" ? list.find(s => s.featured) || list[0] : null;
    const rest = featured ? list.filter(s => s !== featured) : list;
    renderFeatured(featured);
    grid.innerHTML = rest.map((s, i) => renderCard(s, i)).join("");
    if (emptyState) emptyState.hidden = list.length > 0;
  }

  buildFilters();
  render();
})();
