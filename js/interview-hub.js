/* Interview & Career Hub pages: track switch, copy buttons, reveal, scroll UI, index highlight. */
(function () {
  "use strict";

  const TRACK_KEY = "ipd-ij-track-v1";
  const body = document.body;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function read(k) {
    try {
      return localStorage.getItem(k);
    } catch (_e) {
      return null;
    }
  }
  function write(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch (_e) {
      /* private mode */
    }
  }

  const toastEl = document.getElementById("ij-toast");
  let toastTimer = 0;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("is-open");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-open"), 2400);
  }

  /* ---------- track (fresher / experienced) ---------- */
  function setTrack(value, scroll) {
    const t = value === "fresher" || value === "experienced" ? value : "all";
    body.setAttribute("data-track", t);
    document.querySelectorAll("[data-set-track]").forEach((b) => b.setAttribute("aria-pressed", String(b.getAttribute("data-set-track") === t)));
    write(TRACK_KEY, t);
    if (scroll) {
      const first = document.querySelector(".prep-stages");
      if (first) first.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      toast(t === "all" ? "Showing both journeys" : t === "fresher" ? "Beginner / fresher journey" : "Experienced professional journey");
    }
  }

  /* ---------- copy ---------- */
  async function copyFrom(btn) {
    const target = document.getElementById(btn.getAttribute("data-copy"));
    if (!target) return;
    let ok = false;
    try {
      await navigator.clipboard.writeText(target.textContent);
      ok = true;
    } catch (_e) {
      const range = document.createRange();
      range.selectNodeContents(target);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      try {
        ok = document.execCommand("copy");
      } catch (_err) {
        ok = false;
      }
      sel.removeAllRanges();
    }
    const label = btn.getAttribute("data-label") || "Copy";
    btn.textContent = ok ? "Copied ✓" : "Select & copy";
    toast(ok ? "Copied to clipboard" : "Press Ctrl/Cmd + C to copy");
    setTimeout(() => (btn.textContent = label), 2000);
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest) return;
    const tb = e.target.closest("[data-set-track]");
    if (tb) return setTrack(tb.getAttribute("data-set-track"), true);
    const cb = e.target.closest("[data-copy]");
    if (cb) return copyFrom(cb);
    if (e.target.closest("[data-top]")) window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* Copy buttons on hub pages say "Copy email" where the block is an email. */
  document.querySelectorAll(".hub-email .ij-copy-btn").forEach((b) => {
    b.textContent = "Copy email";
    b.setAttribute("data-label", "Copy email");
  });

  /* ---------- reveal ---------- */
  if ("IntersectionObserver" in window && !reduceMotion) {
    body.classList.add("ij-anim");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".ij-reveal").forEach((el) => io.observe(el));
  }

  /* ---------- side index highlight (stages / emails) ---------- */
  const targets = [...document.querySelectorAll(".prep-stage, .mail, .mail-more")];
  if ("IntersectionObserver" in window && targets.length) {
    const links = [...document.querySelectorAll(".prep-index a, .mail-index a")];
    const spy = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const id = "#" + en.target.id;
          links.forEach((a) => {
            const on = a.getAttribute("href") === id;
            a.classList.toggle("is-active", on);
            if (on) a.setAttribute("aria-current", "step");
            else a.removeAttribute("aria-current");
          });
        }),
      { rootMargin: "-35% 0px -55% 0px" }
    );
    targets.forEach((t) => spy.observe(t));
  }

  /* ---------- scroll UI ---------- */
  const readbar = document.querySelector("[data-readbar]");
  const topBtn = document.querySelector("[data-top]");
  let ticking = false;
  function onScroll() {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = window.scrollY;
    if (readbar) readbar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
    if (topBtn) topBtn.hidden = y < 1200;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );

  /* ---------- academy overview: progress from the course pages ---------- */
  function readList(key) {
    try {
      const v = JSON.parse(read(key) || "[]");
      return Array.isArray(v) ? v : [];
    } catch (_e) {
      return [];
    }
  }
  const lessons = [...document.querySelectorAll("[data-ac-lesson]")];
  if (lessons.length || document.querySelector("[data-ac-progress]")) {
    const doneChapters = new Set(readList("ipd-ij-done-v1"));
    const practised = readList("ipd-iq-practised-v1").length;
    const counts = { journey: lessons.filter((li) => doneChapters.has(li.getAttribute("data-ac-lesson"))).length, questions: practised };
    lessons.forEach((li) => li.classList.toggle("is-done", doneChapters.has(li.getAttribute("data-ac-lesson"))));
    document.querySelectorAll("[data-ac-progress]").forEach((el) => {
      const key = el.getAttribute("data-ac-progress");
      const total = Number(el.getAttribute("data-total")) || 1;
      const n = Math.min(counts[key] || 0, total);
      const pct = Math.round((n / total) * 100);
      el.querySelector(".ac-bar span").style.width = pct + "%";
      el.querySelector("[data-ac-pct]").textContent = pct + "%";
      el.querySelector("[data-ac-status]").textContent = n ? n + " of " + total + " " + el.getAttribute("data-unit") : "Not started";
      const cta = document.querySelector('[data-ac-cta="' + key + '"]');
      if (cta && n) cta.firstChild.textContent = n >= total ? "Review " : "Continue ";
    });
    const next = lessons.find((li) => !doneChapters.has(li.getAttribute("data-ac-lesson")));
    const pctJourney = lessons.length ? Math.round((counts.journey / lessons.length) * 100) : 0;
    document.querySelectorAll("[data-ac-ring]").forEach((el) => el.style.setProperty("--p", String(pctJourney)));
    document.querySelectorAll("[data-ac-ring-pct]").forEach((el) => (el.textContent = pctJourney + "%"));
    if (counts.journey && next) {
      const a = next.querySelector("a");
      document.querySelectorAll("[data-ac-continue]").forEach((btn) => {
        btn.href = a.getAttribute("href");
        btn.textContent = "Continue: " + next.querySelector(".ac-lesson-title").textContent;
      });
    }
  }

  setTrack(read(TRACK_KEY) || body.getAttribute("data-track") || "all", false);
  onScroll();
})();
