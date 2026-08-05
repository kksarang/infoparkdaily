(function () {
  const root = document.getElementById("news-article-root");
  if (!root || typeof NEWS === "undefined") return;

  function assetUrl(path) {
    if (!path) return "";
    const value = String(path);
    if (/^(https?:|data:|\/\/)/i.test(value)) return value;
    return `/${value.replace(/^\.?\//, "")}`;
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

  function renderMissing() {
    document.title = "Story not found | InfoparkDaily";
    root.innerHTML = `
      <section class="job-missing glass">
        <p class="jobs-kicker">News desk</p>
        <h1>Story not found</h1>
        <p>This story may have been removed or the link is incomplete.</p>
        <a class="btn btn-primary" href="/news/">Back to News</a>
      </section>
    `;
  }

  function relatedBlock(article) {
    const related = NEWS.filter(
      (other) =>
        other !== article &&
        (other.category === article.category || other.park === article.park)
    )
      .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")))
      .slice(0, 3);

    if (!related.length) return "";

    return `
      <section class="job-related">
        <div class="section-heading">
          <p class="eyebrow">Keep reading</p>
          <h2>More tech park news</h2>
        </div>
        <div class="news-grid">
          ${related
            .map(
              (item) => `
                <a class="news-card glass" href="/news-article/?id=${encodeURIComponent(item.id)}">
                  <div class="news-card-media">
                    <img src="${escapeAttr(assetUrl(item.image))}" alt="${escapeAttr(item.imageAlt || "")}" loading="lazy" onerror="this.parentElement.classList.add('news-media-missing')" />
                  </div>
                  <div class="news-card-body">
                    <h3>${escapeHtml(String(item.title || "").length > 72 ? `${String(item.title).slice(0, 71).replace(/\s+\S*$/, "")}…` : item.title)}</h3>
                    <div class="news-meta">
                      <span class="news-cat">${escapeHtml(item.category || "News")}</span>
                      <span class="news-date">${escapeHtml(formatDate(item.date))}</span>
                    </div>
                    <span class="news-card-cta">Read story →</span>
                  </div>
                </a>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function guidesRelatedBlock() {
    return `
      <section class="content-section home-guides" aria-labelledby="article-guides-title">
        <div class="section-heading">
          <p class="eyebrow">Related guides</p>
          <h2 id="article-guides-title">Career guides for Kerala IT parks</h2>
        </div>
        <div class="home-guides-grid">
          <a href="/guides/how-to-apply-infopark-technopark-jobs/">
            <strong>How to apply</strong>
            <span>Safe apply process for Infopark &amp; Technopark roles.</span>
          </a>
          <a href="/guides/verify-jobs-before-you-apply/">
            <strong>Verify before you apply</strong>
            <span>Avoid fee scams and fake walk-in posts.</span>
          </a>
          <a href="/guides/kerala-it-hiring-this-week/">
            <strong>Hiring this week</strong>
            <span>Weekly editorial on Kerala IT park hiring.</span>
          </a>
        </div>
      </section>
    `;
  }

  function renderArticle(article) {
    document.title = `${article.title} | InfoparkDaily News`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && article.summary) desc.setAttribute("content", article.summary);

    const body = (article.body || [])
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
      .join("");

    const highlights =
      article.highlights && article.highlights.length
        ? `
          <aside class="news-highlights">
            <p class="news-highlights-title">Key points</p>
            <ul>${article.highlights.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
          </aside>
        `
        : "";

    const attachments =
      article.attachments && article.attachments.length
        ? `
          <section class="job-panel glass news-attachments">
            <h2>Official links &amp; attachments</h2>
            <div class="job-apply-methods">
              ${article.attachments
                .map(
                  (att) => `
                    <a class="job-apply-method" href="${escapeAttr(att.url)}" target="_blank" rel="noopener noreferrer">
                      <span class="job-apply-method-icon job-apply-method-icon--web" aria-hidden="true">↗</span>
                      <span class="job-apply-method-body">
                        <strong>${escapeHtml(att.label)}</strong>
                        <span>${escapeHtml(String(att.url).replace(/^https?:\/\//, "").replace(/\/$/, ""))}</span>
                      </span>
                    </a>
                  `
                )
                .join("")}
            </div>
          </section>
        `
        : "";

    const shareUrl = window.location.href;
    const shareText = `${article.title} — via InfoparkDaily`;

    root.innerHTML = `
      <nav class="job-breadcrumb" aria-label="Breadcrumb">
        <a href="/news/">← Tech Park News</a>
      </nav>

      <header class="news-story-top glass">
        <div class="news-story-hero">
          <div class="news-story-hero-copy">
            <div class="news-meta">
              <span class="news-cat">${escapeHtml(article.category || "News")}</span>
              <span class="news-park">${escapeHtml(article.park || "")}</span>
              <span class="news-date">${escapeHtml(formatDate(article.date))}</span>
            </div>
            <h1>${escapeHtml(article.title)}</h1>
            <p class="news-article-summary">${escapeHtml(article.summary || "")}</p>
            <div class="news-story-top-actions">
              <a class="btn btn-secondary" href="https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}" target="_blank" rel="noopener noreferrer">Share on WhatsApp</a>
              <button type="button" class="btn btn-ghost" id="news-copy-link-top">Copy link</button>
              <a class="btn btn-ghost" href="/guides/">Career Guides</a>
            </div>
          </div>
          <figure class="news-story-hero-media">
            <img src="${escapeAttr(assetUrl(article.image))}" alt="${escapeAttr(article.imageAlt || "")}" onerror="this.parentElement.remove()" />
            ${article.imageAlt ? `<figcaption>${escapeHtml(article.imageAlt)}</figcaption>` : ""}
          </figure>
        </div>
      </header>

      <div class="news-story-layout">
        <article class="news-article glass">
          <aside class="ipd-ad-slot" data-ad-slot="news-after-headline" hidden aria-hidden="true"></aside>
          ${highlights}
          <div class="news-article-body">${body}</div>
          <aside class="ipd-ad-slot" data-ad-slot="news-end" hidden aria-hidden="true"></aside>
          <footer class="news-article-foot">
            <p class="news-source">
              <strong>Source:</strong> ${escapeHtml(article.source || "InfoparkDaily desk")}
              ${article.sourceUrl ? ` · <a href="${escapeAttr(article.sourceUrl)}" target="_blank" rel="noopener noreferrer">Original announcement</a>` : ""}
            </p>
            <div class="job-share-actions news-share-actions">
              <a class="btn btn-secondary" href="https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}" target="_blank" rel="noopener noreferrer">Share on WhatsApp</a>
              <button type="button" class="btn btn-ghost" id="news-copy-link">Copy link</button>
            </div>
          </footer>
        </article>

        <aside class="news-story-rail" aria-label="Story shortcuts">
          <div class="news-rail-card glass">
            <p class="news-rail-kicker">Career guides</p>
            <h2>Related help</h2>
            <ul class="news-rail-links">
              <li><a href="/guides/how-to-apply-infopark-technopark-jobs/">How to apply</a></li>
              <li><a href="/guides/verify-jobs-before-you-apply/">Verify before you apply</a></li>
              <li><a href="/guides/kerala-it-hiring-this-week/">Hiring this week</a></li>
              <li><a href="/jobs/">Browse open jobs</a></li>
            </ul>
          </div>
          <div class="news-rail-card glass">
            <p class="news-rail-kicker">Community note</p>
            <h2>Not the employer</h2>
            <p>InfoparkDaily is an independent community page. Always verify news and jobs on official channels. Never pay for an interview.</p>
            <div class="news-share-actions">
              <a class="btn btn-ghost" href="/terms/">Terms</a>
              <a class="btn btn-ghost" href="/contact/">Contact</a>
            </div>
          </div>
        </aside>
      </div>

      ${attachments}
      ${guidesRelatedBlock()}
      ${relatedBlock(article)}
`;

    async function copyLink(btn) {
      if (!btn) return;
      try {
        await navigator.clipboard.writeText(window.location.href);
        btn.textContent = "Link copied!";
        setTimeout(() => (btn.textContent = "Copy link"), 2000);
      } catch (_e) {
        btn.textContent = window.location.href;
      }
    }

    const copyBtn = document.getElementById("news-copy-link");
    const copyBtnTop = document.getElementById("news-copy-link-top");
    if (copyBtn) copyBtn.addEventListener("click", () => copyLink(copyBtn));
    if (copyBtnTop) copyBtnTop.addEventListener("click", () => copyLink(copyBtnTop));
  }

  const id = getId();
  const article = NEWS.find((item) => String(item.id || "").toLowerCase() === id) || null;
  if (!article) {
    renderMissing();
    return;
  }
  renderArticle(article);
})();
