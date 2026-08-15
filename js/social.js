(function () {
  const channelsRoot = document.getElementById("social-channels");
  const worksRoot = document.getElementById("social-works");
  const emptyState = document.getElementById("social-empty");
  if (!channelsRoot && !worksRoot) return;

  const channels = typeof SOCIAL_CHANNELS !== "undefined" ? SOCIAL_CHANNELS : [];
  const works = (typeof SOCIAL_WORKS !== "undefined" ? SOCIAL_WORKS : []).slice();

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

  function workHref(item) {
    if (item.page) return item.page;
    return `/social-post/?id=${encodeURIComponent(item.id)}`;
  }

  if (channelsRoot) {
    channelsRoot.innerHTML = channels
      .map(
        (item) => `
          <a class="media-channel glass" href="${escapeAttr(item.url)}" target="_blank" rel="noopener noreferrer">
            <span class="media-channel-badge media-channel-badge--${escapeAttr(item.tone || "ig")}">${escapeHtml(item.badge || "IG")}</span>
            <div>
              <strong>${escapeHtml(item.name)}</strong>
              <span>${escapeHtml(item.blurb || "")}</span>
            </div>
            <span class="media-channel-cta">${escapeHtml(item.cta || "Open")} →</span>
          </a>
        `
      )
      .join("");
  }

  if (!worksRoot) return;

  if (!works.length) {
    if (emptyState) emptyState.hidden = false;
    return;
  }

  works.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));

  worksRoot.innerHTML = works
    .map(
      (item, index) => `
        <a class="news-card glass sw-card" href="${escapeAttr(workHref(item))}" style="--delay: ${index * 40}ms">
          <div class="news-card-media sw-card-media">
            <img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.imageAlt || item.title)}" loading="lazy" />
          </div>
          <div class="news-card-body">
            <div class="news-meta">
              <span class="news-cat">${escapeHtml(item.kicker || "Social")}</span>
              <span class="news-date">${escapeHtml(formatDate(item.date))}</span>
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p class="news-summary">${escapeHtml(item.excerpt || "")}</p>
            <span class="news-card-cta">${item.page ? "Open event page →" : "View details →"}</span>
          </div>
        </a>
      `
    )
    .join("");
})();
