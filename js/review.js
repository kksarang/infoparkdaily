(function () {
  const listEl = document.getElementById("review-list");
  const emptyEl = document.getElementById("review-empty");
  const countEl = document.getElementById("review-count");
  const avgEl = document.getElementById("review-avg");
  const formEl = document.getElementById("review-write-form");
  const starPicker = document.getElementById("review-star-picker");
  const nameEl = document.getElementById("review-name");
  const messageEl = document.getElementById("review-message");
  const statusEl = document.getElementById("review-form-status");

  if (!listEl) return;

  const LOCAL_KEY = "ipd-site-reviews";
  const SESSION_KEY = "ipd-site-reviews";
  const SITE_REVIEWS_URL =
    typeof IPD_SITE_REVIEWS_URL === "string" && IPD_SITE_REVIEWS_URL
      ? IPD_SITE_REVIEWS_URL
      : "/data/site-reviews.json";
  const REVIEWS_API = typeof IPD_REVIEWS_API === "string" ? IPD_REVIEWS_API.trim() : "";
  const FORMSPREE_ENDPOINT =
    typeof IPD_REVIEW_FORMSPREE === "string" ? IPD_REVIEW_FORMSPREE.trim() : "";

  /** In-memory list — always used for render so posts show instantly. */
  let memoryReviews = [];
  let publicReviews = [];

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
    return "★★★★★".slice(0, full) + '<span class="review-stars-empty">' + "★★★★★".slice(full) + "</span>";
  }

  function formatDate(iso) {
    if (!iso) return "";
    const date = new Date(`${iso}T00:00:00`);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }

  function todayIso() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function normalizeReview(raw) {
    if (!raw || typeof raw !== "object") return null;
    const text = String(raw.text || raw.message || "").trim();
    if (!text) return null;
    return {
      id: String(raw.id || `review-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`),
      author: String(raw.author || raw.name || "Community member").trim() || "Community member",
      role: String(raw.role || "Posted on InfoparkDaily Website").trim(),
      rating: Math.max(1, Math.min(5, Number(raw.rating) || 5)),
      date: String(raw.date || todayIso()),
      source: String(raw.source || "InfoparkDaily").trim(),
      text,
      local: Boolean(raw.local),
    };
  }

  function readStorage(storage) {
    try {
      const raw = storage.getItem(LOCAL_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(normalizeReview).filter(Boolean);
    } catch (_e) {
      return [];
    }
  }

  function loadDeviceReviews() {
    const fromLocal = readStorage(localStorage);
    const fromSession = readStorage(sessionStorage);
    const merged = new Map();
    fromLocal.concat(fromSession).forEach((item) => merged.set(item.id, item));
    return Array.from(merged.values());
  }

  function persistDeviceReviews(reviews) {
    memoryReviews = reviews.slice();
    const payload = JSON.stringify(reviews);
    let ok = false;
    try {
      localStorage.setItem(LOCAL_KEY, payload);
      ok = true;
    } catch (_e) {
      /* ignore */
    }
    try {
      sessionStorage.setItem(SESSION_KEY, payload);
      ok = true;
    } catch (_e) {
      /* ignore */
    }
    return ok;
  }

  function curatedReviews() {
    return Array.isArray(typeof IPD_REVIEWS !== "undefined" ? IPD_REVIEWS : [])
      ? (typeof IPD_REVIEWS !== "undefined" ? IPD_REVIEWS : [])
      : [];
  }

  function allReviews() {
    const merged = new Map();
    publicReviews.concat(curatedReviews()).concat(memoryReviews).forEach((item) => {
      const normalized = normalizeReview(item);
      if (normalized) merged.set(normalized.id, normalized);
    });
    return Array.from(merged.values()).sort((a, b) => String(b.date).localeCompare(String(a.date)));
  }

  function setStatus(text, type) {
    if (!statusEl) return;
    statusEl.textContent = text || "";
    statusEl.classList.toggle("is-success", type === "success");
    statusEl.classList.toggle("is-error", type === "error");
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
    const reviews = allReviews();

    if (countEl) {
      countEl.textContent =
        reviews.length === 0
          ? "Be the first to review"
          : `${reviews.length} review${reviews.length === 1 ? "" : "s"}`;
    }

    if (avgEl && reviews.length) {
      const avg = reviews.reduce((sum, item) => sum + (Number(item.rating) || 0), 0) / reviews.length;
      avgEl.innerHTML = `<span class="review-avg-stars" aria-label="${avg.toFixed(1)} out of 5">${starsHtml(avg)}</span> <strong>${avg.toFixed(1)}</strong> / 5`;
    } else if (avgEl) {
      avgEl.textContent = "No rating yet — your review helps!";
    }

    listEl.innerHTML = reviews
      .map(
        (review) => `
      <article class="review-card${review.local ? " review-card--local" : ""}">
        <header class="review-card-head">
          <div>
            <p class="review-card-author">${escapeHtml(review.author)}</p>
            ${review.role ? `<p class="review-card-role">${escapeHtml(review.role)}</p>` : ""}
          </div>
          <p class="review-card-stars" aria-label="${review.rating} out of 5 stars">${starsHtml(review.rating)}</p>
        </header>
        <p class="review-card-text">${escapeHtml(review.text)}</p>
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

  function notifyAdmin(review) {
    if (!FORMSPREE_ENDPOINT) return;
    fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        name: review.author,
        rating: review.rating,
        message: review.text,
        date: review.date,
        _subject: `InfoparkDaily website review (${review.rating}★) — ${review.author}`,
      }),
    }).catch(() => {
      /* ignore */
    });
  }

  function submitToApi(review) {
    if (!REVIEWS_API) return Promise.resolve(false);
    return fetch(REVIEWS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    })
      .then((res) => res.ok)
      .catch(() => false);
  }

  async function loadPublicReviews() {
    const tasks = [];

    tasks.push(
      fetch(`${SITE_REVIEWS_URL}?v=${Date.now()}`, { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => (Array.isArray(data) ? data : []))
        .catch(() => [])
    );

    if (REVIEWS_API) {
      tasks.push(
        fetch(REVIEWS_API, { cache: "no-store" })
          .then((res) => (res.ok ? res.json() : []))
          .then((data) => (Array.isArray(data) ? data : data && Array.isArray(data.reviews) ? data.reviews : []))
          .catch(() => [])
      );
    }

    const batches = await Promise.all(tasks);
    const merged = new Map();
    batches.flat().forEach((item) => {
      const normalized = normalizeReview(item);
      if (normalized) {
        normalized.local = false;
        merged.set(normalized.id, normalized);
      }
    });
    publicReviews = Array.from(merged.values());
    renderReviews();
  }

  function submitSiteReview() {
    const message = messageEl && messageEl.value.trim();
    const name = nameEl && nameEl.value.trim();

    if (!message || message.length < 8) {
      setStatus("Please write at least 8 characters in your feedback.", "error");
      messageEl && messageEl.focus();
      return;
    }

    const review = normalizeReview({
      id: `local-${Date.now()}`,
      author: name || "Community member",
      role: "Posted on InfoparkDaily Website",
      rating: selectedRating,
      date: todayIso(),
      source: "InfoparkDaily Website",
      text: message,
      local: true,
    });

    if (!review) return;

    const next = [review].concat(memoryReviews.length ? memoryReviews : loadDeviceReviews());
    memoryReviews = next.slice();
    renderReviews();

    const persisted = persistDeviceReviews(next);
    notifyAdmin(review);
    submitToApi(review);

    if (formEl) formEl.reset();
    selectedRating = 5;
    renderStars();

    if (listEl.children.length === 0) {
      setStatus("Your review could not be saved in this browser. Please try again.", "error");
      return;
    }

    setStatus(
      persisted
        ? "Thank you! Your review is now listed below."
        : "Thank you! Your review is listed for this session (browser storage is blocked).",
      "success"
    );

    listEl.firstElementChild.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  memoryReviews = loadDeviceReviews();
  renderStars();
  renderReviews();
  loadPublicReviews();

  if (formEl) {
    formEl.addEventListener("submit", (event) => {
      event.preventDefault();
      submitSiteReview();
    });
  }
})();
