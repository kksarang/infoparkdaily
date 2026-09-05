(function () {
  /* Add Instagram reel IDs here — they show in the Reels grid. */
  var SARANG_REELS = [
    { id: "Db-xP99BMRt", label: "Reel 01" },
    { id: "DcyREhPpBl4", label: "Reel 02" },
    { id: "Dben9kaBk4O", label: "Reel 03" }
  ];

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

  var reelsRoot = document.getElementById("sarang-reels");
  if (reelsRoot) {
    reelsRoot.innerHTML = SARANG_REELS.map(function (item) {
      var url = "https://www.instagram.com/reel/" + encodeURIComponent(item.id) + "/";
      return (
        '<figure class="sarang-reel">' +
        '<div class="sarang-reel-frame">' +
        '<iframe title="' +
        escapeAttr(item.label) +
        '" src="' +
        escapeAttr(url) +
        'embed" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>' +
        "</div>" +
        '<figcaption><a href="' +
        escapeAttr(url) +
        '" target="_blank" rel="noopener noreferrer">' +
        escapeHtml(item.label) +
        " — open on Instagram</a></figcaption>" +
        "</figure>"
      );
    }).join("");
  }

  var channelsRoot = document.getElementById("social-channels");
  var worksRoot = document.getElementById("social-works");
  var emptyState = document.getElementById("social-empty");
  var channels = typeof SOCIAL_CHANNELS !== "undefined" ? SOCIAL_CHANNELS : [];
  var works = (typeof SOCIAL_WORKS !== "undefined" ? SOCIAL_WORKS : []).slice();

  function formatDate(iso) {
    if (!iso) return "";
    var date = new Date(iso + "T00:00:00");
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }

  function workHref(item) {
    if (item.page) return item.page;
    return "/social-post/?id=" + encodeURIComponent(item.id);
  }

  if (channelsRoot) {
    channelsRoot.innerHTML = channels
      .map(function (item) {
        return (
          '<a class="media-channel glass" href="' +
          escapeAttr(item.url) +
          '" target="_blank" rel="noopener noreferrer">' +
          '<span class="media-channel-badge media-channel-badge--' +
          escapeAttr(item.tone || "ig") +
          '">' +
          escapeHtml(item.badge || "IG") +
          "</span><div><strong>" +
          escapeHtml(item.name) +
          "</strong><span>" +
          escapeHtml(item.blurb || "") +
          '</span></div><span class="media-channel-cta">' +
          escapeHtml(item.cta || "Open") +
          " →</span></a>"
        );
      })
      .join("");
  }

  if (worksRoot) {
    if (!works.length) {
      if (emptyState) emptyState.hidden = false;
    } else {
      works.sort(function (a, b) {
        return String(b.date || "").localeCompare(String(a.date || ""));
      });
      worksRoot.innerHTML = works
        .map(function (item, index) {
          return (
            '<a class="news-card glass sw-card" href="' +
            escapeAttr(workHref(item)) +
            '" style="--delay: ' +
            index * 40 +
            'ms">' +
            '<div class="news-card-media sw-card-media">' +
            '<img src="' +
            escapeAttr(item.image) +
            '" alt="' +
            escapeAttr(item.imageAlt || item.title) +
            '" loading="lazy" />' +
            "</div>" +
            '<div class="news-card-body"><div class="news-meta">' +
            '<span class="news-cat">' +
            escapeHtml(item.kicker || "Social") +
            '</span><span class="news-date">' +
            escapeHtml(formatDate(item.date)) +
            "</span></div><h3>" +
            escapeHtml(item.title) +
            '</h3><p class="news-summary">' +
            escapeHtml(item.excerpt || "") +
            '</p><span class="news-card-cta">' +
            (item.page ? "Open event page →" : "View details →") +
            "</span></div></a>"
          );
        })
        .join("");
    }
  }
})();
