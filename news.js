(function () {
  const grid = document.getElementById("news-grid");
  const featuredWrap = document.getElementById("news-featured");
  const filterBar = document.getElementById("news-filters");
  const emptyState = document.getElementById("news-empty");
  if (!grid || typeof NEWS === "undefined") return;

  const NEW_DAYS = 5;
  const DAY_MS = 24 * 60 * 60 * 1000;
  let activeCategory = "all";

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
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }

  function isNew(item) {
    const date = new Date(`${item.date}T00:00:00`);
    if (Number.isNaN(date.getTime())) return false;
    const age = Date.now() - date.getTime();
    return age >= 0 && age <= NEW_DAYS * DAY_MS;
  }

  function sortedNews() {
    return [...NEWS].sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  }

  function articleHref(item) {
    return `/news-article/?id=${encodeURIComponent(item.id)}`;
  }

  function metaRow(item) {
    return `
      <div class="news-meta">
        <span class="news-cat news-cat--${escapeAttr(String(item.category || "").toLowerCase().replace(/\s+/g, "-"))}">${escapeHtml(item.category || "News")}</span>
        <span class="news-park">${escapeHtml(item.park || "")}</span>
        <span class="news-date">${escapeHtml(formatDate(item.date))}</span>
        ${isNew(item) ? `<span class="job-badge job-badge--new">New</span>` : ""}
      </div>
    `;
  }

  function renderFeatured(item) {
    if (!featuredWrap) return;
    if (!item) {
      featuredWrap.innerHTML = "";
      return;
    }
    featuredWrap.innerHTML = `
      <a class="news-featured glass" href="${escapeAttr(articleHref(item))}">
        <div class="news-featured-media">
          <img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.imageAlt || "")}" loading="lazy" onerror="this.parentElement.classList.add('news-media-missing')" />
        </div>
        <div class="news-featured-copy">
          <p class="eyebrow">Top story</p>
          <h2>${escapeHtml(item.title)}</h2>
          <p class="news-summary">${escapeHtml(item.summary || "")}</p>
          ${metaRow(item)}
          <span class="btn btn-primary news-read-btn">Read full story</span>
        </div>
      </a>
    `;
  }

  function renderCard(item, index) {
    return `
      <a class="news-card glass" href="${escapeAttr(articleHref(item))}" style="--delay: ${Math.min(index, 8) * 40}ms">
        <div class="news-card-media">
          <img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.imageAlt || "")}" loading="lazy" onerror="this.parentElement.classList.add('news-media-missing')" />
        </div>
        <div class="news-card-body">
          <h3>${escapeHtml(item.title)}</h3>
          <p class="news-summary">${escapeHtml(item.summary || "")}</p>
          ${metaRow(item)}
          <span class="news-card-cta">Read story →</span>
        </div>
      </a>
    `;
  }

  function buildFilters() {
    if (!filterBar) return;
    const categories = [...new Set(NEWS.map((item) => item.category).filter(Boolean))];
    filterBar.innerHTML = [
      `<button type="button" class="jobs-filter-btn is-active" data-category="all" aria-pressed="true">All news</button>`,
      ...categories.map(
        (cat) =>
          `<button type="button" class="jobs-filter-btn" data-category="${escapeAttr(cat.toLowerCase())}" aria-pressed="false">${escapeHtml(cat)}</button>`
      )
    ].join("");

    filterBar.addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      activeCategory = button.dataset.category;
      filterBar.querySelectorAll("[data-category]").forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
      render();
    });
  }

  function render() {
    const all = sortedNews();
    const list =
      activeCategory === "all"
        ? all
        : all.filter((item) => String(item.category || "").toLowerCase() === activeCategory);

    const featured =
      activeCategory === "all" ? list.find((item) => item.featured) || list[0] : null;
    const rest = featured ? list.filter((item) => item !== featured) : list;

    renderFeatured(featured);
    grid.innerHTML = rest.map((item, i) => renderCard(item, i)).join("");
    if (emptyState) emptyState.hidden = list.length > 0;
  }

  buildFilters();
  render();
})();
