(function () {
  const wall = document.getElementById("media-wall");
  const emptyState = document.getElementById("media-empty");
  if (!wall) return;

  const posts = (typeof MEDIA_POSTS !== "undefined" ? MEDIA_POSTS : []).filter(
    (url) => /instagram\.com\/(p|reel|tv)\//.test(String(url))
  );

  if (!posts.length) {
    if (emptyState) emptyState.hidden = false;
    return;
  }

  wall.innerHTML = posts
    .map((url) => {
      const clean = String(url).split("?")[0];
      return `
        <div class="media-embed">
          <blockquote
            class="instagram-media"
            data-instgrm-permalink="${clean}"
            data-instgrm-version="14"
          >
            <a href="${clean}" target="_blank" rel="noopener noreferrer">View this post on Instagram</a>
          </blockquote>
        </div>
      `;
    })
    .join("");

  const script = document.createElement("script");
  script.src = "https://www.instagram.com/embed.js";
  script.async = true;
  document.body.appendChild(script);
})();
