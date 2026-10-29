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

  function reelUrl(id) {
    return "https://www.instagram.com/reel/" + encodeURIComponent(id) + "/";
  }

  // Reels load Instagram's player only when tapped, so the page doesn't open with empty black frames.
  var reelsRoot = document.getElementById("sarang-reels");
  if (reelsRoot) {
    reelsRoot.innerHTML = SARANG_REELS.map(function (item) {
      var url = reelUrl(item.id);
      return (
        '<figure class="sgx-reel">' +
        '<button type="button" class="sgx-reel-play" data-reel="' +
        escapeAttr(item.id) +
        '" aria-label="Play ' +
        escapeAttr(item.label) +
        ' here">' +
        '<span class="sgx-reel-icon" aria-hidden="true">▶</span>' +
        '<span class="sgx-reel-label">' +
        escapeHtml(item.label) +
        "</span>" +
        '<span class="sgx-reel-hint">Tap to play</span>' +
        "</button>" +
        '<figcaption><a href="' +
        escapeAttr(url) +
        '" target="_blank" rel="noopener noreferrer">Open on Instagram ↗</a></figcaption>' +
        "</figure>"
      );
    }).join("");

    reelsRoot.addEventListener("click", function (event) {
      var button = event.target.closest("[data-reel]");
      if (!button) return;
      var id = button.getAttribute("data-reel");
      var label = button.getAttribute("aria-label") || "Instagram reel";
      var frame = document.createElement("div");
      frame.className = "sgx-reel-frame";
      frame.innerHTML =
        '<iframe title="' +
        escapeAttr(label) +
        '" src="' +
        escapeAttr(reelUrl(id)) +
        'embed" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
      button.replaceWith(frame);
    });
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
          '<a class="sgx-channel" href="' +
          escapeAttr(item.url) +
          '" target="_blank" rel="noopener noreferrer">' +
          '<span class="sgx-badge sgx-badge--' +
          escapeAttr(item.tone || "ig") +
          '">' +
          escapeHtml(item.badge || "IG") +
          '</span><span class="sgx-channel-copy"><strong>' +
          escapeHtml(item.name) +
          "</strong><span>" +
          escapeHtml(item.blurb || "") +
          '</span></span><span class="sgx-channel-cta">' +
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
        .map(function (item) {
          return (
            '<a class="sgx-work" href="' +
            escapeAttr(workHref(item)) +
            '"><div class="sgx-work-media"><img src="' +
            escapeAttr(item.image) +
            '" alt="' +
            escapeAttr(item.imageAlt || item.title) +
            '" loading="lazy" /></div>' +
            '<div class="sgx-work-body"><p class="sgx-work-meta"><span>' +
            escapeHtml(item.kicker || "Social") +
            "</span><span>" +
            escapeHtml(formatDate(item.date)) +
            "</span></p><h3>" +
            escapeHtml(item.title) +
            "</h3><p>" +
            escapeHtml(item.excerpt || "") +
            '</p><span class="sgx-work-cta">' +
            (item.page ? "Open event page →" : "View details →") +
            "</span></div></a>"
          );
        })
        .join("");
    }
  }
})();
