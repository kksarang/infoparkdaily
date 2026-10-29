/**
 * Latest Instagram reels and posters — renders INSTAGRAM_FEED into [data-ig-feed].
 * data-ig-limit="6" shows a short preview without filters (used on /media/).
 */
(function () {
  const mounts = document.querySelectorAll("[data-ig-feed]");
  if (!mounts.length) return;

  const feed = typeof INSTAGRAM_FEED !== "undefined" ? INSTAGRAM_FEED : { posts: [], accounts: [] };
  const posts = (feed.posts || []).slice().sort((a, b) => String(b.timestamp || "").localeCompare(String(a.timestamp || "")));
  const PAGE_SIZE = 12;

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

  function card(post) {
    const kind = post.type === "video" ? (post.isReel ? "Reel" : "Video") : post.isAlbum ? "Album" : "Poster";
    return `
      <a class="ig-card" href="${escapeAttr(post.permalink)}" target="_blank" rel="noopener noreferrer">
        <div class="ig-card-media">
          <img src="${escapeAttr(post.image)}" alt="${escapeAttr(post.title || `${kind} from ${post.handle}`)}" loading="lazy" />
          <span class="ig-card-kind ig-card-kind--${post.type === "video" ? "video" : "poster"}">${escapeHtml(kind)}</span>
          ${post.type === "video" ? '<span class="ig-card-play" aria-hidden="true">▶</span>' : ""}
        </div>
        <div class="ig-card-body">
          <p class="ig-card-meta">${escapeHtml(post.handle)} · ${escapeHtml(formatDate(post.date))}</p>
          ${post.title ? `<p class="ig-card-title">${escapeHtml(post.title)}</p>` : ""}
        </div>
      </a>
    `;
  }

  function emptyState() {
    return `<p class="ig-empty">Latest reels and posters appear here after the next Instagram sync. Meanwhile, follow
      <a href="https://www.instagram.com/infoparkdaily/" target="_blank" rel="noopener noreferrer">@infoparkdaily</a> and
      <a href="https://www.instagram.com/infoparkdaily.jobs/" target="_blank" rel="noopener noreferrer">@infoparkdaily.jobs</a>.</p>`;
  }

  mounts.forEach((mount) => {
    const limit = Number(mount.getAttribute("data-ig-limit")) || 0;
    if (!posts.length) {
      mount.innerHTML = emptyState();
      return;
    }

    if (limit) {
      mount.innerHTML = `<div class="ig-grid">${posts.slice(0, limit).map(card).join("")}</div>`;
      return;
    }

    let type = "all";
    let account = "all";
    let visible = PAGE_SIZE;
    const accounts = (feed.accounts || []).filter((a) => posts.some((p) => p.account === a.key));

    mount.innerHTML = `
      <div class="ig-toolbar" role="toolbar" aria-label="Filter posts">
        <div class="ig-chips" data-ig-type>
          <button type="button" class="ig-chip is-on" data-value="all">All</button>
          <button type="button" class="ig-chip" data-value="video">Videos</button>
          <button type="button" class="ig-chip" data-value="poster">Posters</button>
        </div>
        ${
          accounts.length > 1
            ? `<div class="ig-chips" data-ig-account>
                <button type="button" class="ig-chip is-on" data-value="all">All accounts</button>
                ${accounts.map((a) => `<button type="button" class="ig-chip" data-value="${escapeAttr(a.key)}">${escapeHtml(a.handle)}</button>`).join("")}
              </div>`
            : ""
        }
      </div>
      <div class="ig-grid" data-ig-grid></div>
      <p class="ig-empty" data-ig-none hidden>No posts match that filter.</p>
      <div class="ig-more-row"><button type="button" class="btn btn-secondary" data-ig-more>Load more</button></div>
    `;

    const grid = mount.querySelector("[data-ig-grid]");
    const none = mount.querySelector("[data-ig-none]");
    const more = mount.querySelector("[data-ig-more]");

    function render() {
      const rows = posts.filter((p) => (type === "all" || p.type === type) && (account === "all" || p.account === account));
      grid.innerHTML = rows.slice(0, visible).map(card).join("");
      none.hidden = rows.length > 0;
      more.hidden = visible >= rows.length;
    }

    function bindChips(selector, set) {
      const group = mount.querySelector(selector);
      if (!group) return;
      group.addEventListener("click", (event) => {
        const btn = event.target.closest("[data-value]");
        if (!btn) return;
        group.querySelectorAll("[data-value]").forEach((b) => b.classList.toggle("is-on", b === btn));
        set(btn.getAttribute("data-value"));
        visible = PAGE_SIZE;
        render();
      });
    }

    bindChips("[data-ig-type]", (value) => (type = value));
    bindChips("[data-ig-account]", (value) => (account = value));
    more.addEventListener("click", () => {
      visible += PAGE_SIZE;
      render();
    });
    render();
  });
})();
