(function () {
  const listEl = document.getElementById("review-list");
  const emptyEl = document.getElementById("review-empty");
  const countEl = document.getElementById("review-count");
  const avgEl = document.getElementById("review-avg");
  const formEl = document.getElementById("review-write-form");
  const starPicker = document.getElementById("review-star-picker");
  const messageEl = document.getElementById("review-message");

  if (!listEl || typeof IPD_REVIEWS === "undefined") return;

  const REVIEW_URL =
    typeof IPD_GOOGLE_REVIEW_URL === "string" && IPD_GOOGLE_REVIEW_URL
      ? IPD_GOOGLE_REVIEW_URL
      : "https://g.page/r/Cf_jW_WIN2EoEBM/review";

  let selectedRating = 5;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function starsHtml(rating) {
    const full = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
    return "★★★★★".slice(0, full) + "<span class=\"review-stars-empty\">" + "★★★★★".slice(full) + "</span>";
  }

  function formatDate(iso) {
    if (!iso) return "";
    const date = new Date(`${iso}T00:00:00`);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }

  function renderStars() {
    if (!starPicker) return;
    starPicker.innerHTML = "";
    for (let i = 1; i <= 5; i += 1) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "review-star-btn" + (i <= selectedRating ? " is-active" : "");
      btn.setAttribute("aria-label", `${i} star${i === 1 ? "" : "s"}`);
      btn.setAttribute("aria-pressed", i <= selectedRating ? "true" : "false");
      btn.textContent = "★";
      btn.dataset.rating = String(i);
      btn.addEventListener("click", () => {
        selectedRating = i;
        renderStars();
      });
      starPicker.appendChild(btn);
    }
  }

  function renderReviews() {
    const reviews = IPD_REVIEWS.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));

    if (countEl) {
      countEl.textContent =
        reviews.length === 0
          ? "Be the first to review on Google"
          : `${reviews.length} community highlight${reviews.length === 1 ? "" : "s"}`;
    }

    if (avgEl && reviews.length) {
      const avg = reviews.reduce((sum, item) => sum + (Number(item.rating) || 0), 0) / reviews.length;
      avgEl.innerHTML = `<span class="review-avg-stars" aria-label="${avg.toFixed(1)} out of 5">${starsHtml(avg)}</span> <strong>${avg.toFixed(1)}</strong> / 5`;
    } else if (avgEl) {
      avgEl.textContent = "No Google rating yet — your review helps!";
    }

    listEl.innerHTML = reviews
      .map(
        (review) => `
      <article class="review-card">
        <header class="review-card-head">
          <div>
            <p class="review-card-author">${escapeHtml(review.author || "Community member")}</p>
            ${review.role ? `<p class="review-card-role">${escapeHtml(review.role)}</p>` : ""}
          </div>
          <p class="review-card-stars" aria-label="${Number(review.rating) || 5} out of 5 stars">${starsHtml(review.rating)}</p>
        </header>
        <p class="review-card-text">${escapeHtml(review.text || "")}</p>
        <footer class="review-card-foot">
          ${review.source ? `<span>${escapeHtml(review.source)}</span>` : ""}
          ${review.date ? `<time datetime="${escapeHtml(review.date)}">${escapeHtml(formatDate(review.date))}</time>` : ""}
        </footer>
      </article>`
      )
      .join("");

    if (emptyEl) {
      emptyEl.hidden = reviews.length > 0;
    }
  }

  renderStars();
  renderReviews();

  if (formEl) {
    formEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = messageEl && messageEl.value.trim();
      if (message) {
        try {
          sessionStorage.setItem("ipd-review-draft", message);
        } catch (_e) {
          /* ignore */
        }
      }
      window.open(REVIEW_URL, "_blank", "noopener,noreferrer");
    });
  }

  try {
    const draft = sessionStorage.getItem("ipd-review-draft");
    if (draft && messageEl && !messageEl.value) {
      messageEl.value = draft;
    }
  } catch (_e) {
    /* ignore */
  }
})();
