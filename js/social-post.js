(function () {
  const root = document.getElementById("social-post-root");
  if (!root || typeof SOCIAL_WORKS === "undefined") return;

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
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  }

  function getId() {
    const params = new URLSearchParams(window.location.search);
    return (params.get("id") || "").trim().toLowerCase();
  }

  function isExternal(url) {
    return /^https?:\/\//i.test(String(url || ""));
  }

  function renderMissing() {
    document.title = "Post not found | InfoparkDaily";
    root.innerHTML = `
      <section class="job-missing glass">
        <p class="jobs-kicker">Social Media Works</p>
        <h1>Post not found</h1>
        <p>This work may have been removed or the link is incomplete.</p>
        <a class="btn btn-primary" href="/social/">Back to Social Works</a>
      </section>
    `;
  }

  const work = SOCIAL_WORKS.find((item) => String(item.id || "").toLowerCase() === getId());
  if (!work) {
    renderMissing();
    return;
  }

  if (work.page) {
    window.location.replace(work.page);
    return;
  }

  document.title = `${work.title} | Social Media Works · InfoparkDaily`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc && work.excerpt) desc.setAttribute("content", work.excerpt);

  const body = (work.body || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  const extras = (work.images || []).filter((src) => src && src !== work.image);
  const highlights =
    work.highlights && work.highlights.length
      ? `
        <aside class="news-highlights">
          <p class="news-highlights-title">At a glance</p>
          <ul>${work.highlights.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
        </aside>
      `
      : "";

  const links =
    work.links && work.links.length
      ? `
        <div class="jobs-park-cta sw-post-links">
          ${work.links
            .map((link, index) => {
              const cls = index === 0 ? "btn btn-primary" : "btn btn-secondary";
              const extra = isExternal(link.url)
                ? ' target="_blank" rel="noopener noreferrer"'
                : "";
              return `<a class="${cls}" href="${escapeAttr(link.url)}"${extra}>${escapeHtml(link.label)}</a>`;
            })
            .join("")}
        </div>
      `
      : "";

  const gallery = extras.length
    ? `
      <div class="sw-gallery">
        ${extras
          .map(
            (src) => `
              <figure class="sw-gallery-item">
                <img src="${escapeAttr(src)}" alt="${escapeAttr(work.imageAlt || work.title)}" />
              </figure>
            `
          )
          .join("")}
      </div>
    `
    : "";

  const related = SOCIAL_WORKS.filter((other) => other.id !== work.id).slice(0, 3);
  const relatedBlock = related.length
    ? `
      <section class="job-related">
        <div class="section-heading">
          <p class="eyebrow">More works</p>
          <h2>Other social posts</h2>
        </div>
        <div class="news-grid">
          ${related
            .map(
              (item) => `
                <a class="news-card glass sw-card" href="${escapeAttr(item.page || `/social-post/?id=${encodeURIComponent(item.id)}`)}">
                  <div class="news-card-media sw-card-media">
                    <img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.imageAlt || item.title)}" loading="lazy" />
                  </div>
                  <div class="news-card-body">
                    <h3>${escapeHtml(item.title)}</h3>
                    <span class="news-card-cta">View details →</span>
                  </div>
                </a>
              `
            )
            .join("")}
        </div>
      </section>
    `
    : "";

  root.innerHTML = `
    <nav class="job-breadcrumb" aria-label="Breadcrumb">
      <a href="/social/">← Social Media Works</a>
    </nav>

    <header class="news-story-top glass">
      <div class="news-story-hero">
        <div class="news-story-hero-copy">
          <div class="news-meta">
            <span class="news-cat">${escapeHtml(work.kicker || "Social")}</span>
            <span class="news-park">${escapeHtml(work.account || "")}</span>
            <span class="news-date">${escapeHtml(formatDate(work.date))}</span>
          </div>
          <h1>${escapeHtml(work.title)}</h1>
          <p class="news-article-summary">${escapeHtml(work.excerpt || "")}</p>
          ${links}
        </div>
        <figure class="news-story-hero-media sw-story-media">
          <img src="${escapeAttr(work.image)}" alt="${escapeAttr(work.imageAlt || work.title)}" />
        </figure>
      </div>
    </header>

    <article class="news-article glass">
      ${highlights}
      <div class="news-article-body">${body}</div>
      ${gallery}
    </article>

    ${relatedBlock}
  `;
})();
