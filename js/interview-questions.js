/* Interview question bank: search, level + group filters, practised tracking, random question, copy. */
(function () {
  "use strict";

  const PRACTISED_KEY = "ipd-iq-practised-v1";
  const LEVEL_KEY = "ipd-iq-level-v1";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const items = [...document.querySelectorAll(".iq-item")];
  const subjects = [...document.querySelectorAll(".iq-subject")];
  const total = items.length;
  const search = document.querySelector("[data-iq-search]");
  const result = document.querySelector("[data-iq-result]");
  const empty = document.querySelector("[data-iq-empty]");

  function read(key) {
    try {
      return localStorage.getItem(key);
    } catch (_e) {
      return null;
    }
  }
  function write(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (_e) {
      /* private mode */
    }
  }

  /* ---------- toast ---------- */
  const toastEl = document.getElementById("ij-toast");
  let toastTimer = 0;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("is-open");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-open"), 2400);
  }

  /* ---------- practised ---------- */
  const validKeys = new Set(items.map((i) => i.getAttribute("data-q")));
  let practised = new Set();
  try {
    const saved = JSON.parse(read(PRACTISED_KEY) || "[]");
    if (Array.isArray(saved)) practised = new Set(saved.filter((k) => validKeys.has(k)));
  } catch (_e) {
    practised = new Set();
  }

  function paintPractised() {
    const n = practised.size;
    const pct = total ? Math.round((n / total) * 100) : 0;
    document.querySelectorAll("[data-ring]").forEach((el) => el.style.setProperty("--p", String(pct)));
    document.querySelectorAll("[data-iq-pct]").forEach((el) => (el.textContent = pct + "%"));
    document.querySelectorAll("[data-iq-count]").forEach((el) => (el.textContent = n + " of " + total));
    items.forEach((item) => {
      const on = practised.has(item.getAttribute("data-q"));
      item.classList.toggle("is-practised", on);
      const btn = item.querySelector("[data-practised]");
      if (btn) {
        btn.setAttribute("aria-pressed", String(on));
        btn.textContent = on ? "Practised ✓" : "Mark as practised";
      }
    });
    subjects.forEach((s) => {
      const id = s.id.replace(/^q-/, "");
      const list = s.querySelectorAll(".iq-item");
      const done = s.querySelectorAll(".iq-item.is-practised").length;
      const li = document.querySelector('[data-index="' + id + '"]');
      if (li) li.classList.toggle("is-done", list.length > 0 && done === list.length);
    });
  }

  /* ---------- filters ---------- */
  let level = read(LEVEL_KEY) || "all";
  if (!["all", "fresher", "experienced"].includes(level)) level = "all";
  let group = "all";

  function applyFilters() {
    const q = search ? search.value.trim().toLowerCase() : "";
    let shown = 0;
    subjects.forEach((s) => {
      const groupOk = group === "all" || s.getAttribute("data-group") === group;
      let inSubject = 0;
      s.querySelectorAll(".iq-item").forEach((item) => {
        const lv = item.getAttribute("data-level");
        const levelOk = level === "all" || lv === level || lv === "both";
        const textOk = !q || item.getAttribute("data-text").includes(q);
        const ok = groupOk && levelOk && textOk;
        item.hidden = !ok;
        if (ok) inSubject += 1;
      });
      s.hidden = inSubject === 0;
      const count = s.querySelector("[data-subject-count]");
      if (count) count.textContent = String(inSubject);
      const li = document.querySelector('[data-index="' + s.id.replace(/^q-/, "") + '"]');
      if (li) li.hidden = inSubject === 0;
      shown += inSubject;
    });
    document.querySelectorAll(".iq-index-group").forEach((label) => {
      const list = label.nextElementSibling;
      const visible = list && [...list.children].some((li) => !li.hidden);
      label.hidden = !visible;
      if (list) list.hidden = !visible;
    });
    if (result) {
      const filtered = q || level !== "all" || group !== "all";
      result.textContent = filtered ? "Showing " + shown + " of " + total + " questions" : "";
    }
    if (empty) empty.hidden = shown > 0;
  }

  function setLevel(value) {
    level = value;
    write(LEVEL_KEY, value);
    document.querySelectorAll("[data-iq-level]").forEach((b) => b.setAttribute("aria-pressed", String(b.getAttribute("data-iq-level") === value)));
    applyFilters();
  }

  function setGroup(value) {
    group = value;
    document.querySelectorAll("[data-iq-group]").forEach((b) => b.setAttribute("aria-pressed", String(b.getAttribute("data-iq-group") === value)));
    applyFilters();
  }

  let searchTimer = 0;
  if (search) {
    search.addEventListener("input", () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(applyFilters, 120);
    });
  }

  /* ---------- copy ---------- */
  async function copyQA(item, btn) {
    const q = item.querySelector(".iq-q").textContent.trim();
    const a = item.querySelector(".iq-answer > p:not(.ij-qa-label)").textContent.trim();
    const text = "Q: " + q + "\nA: " + a;
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch (_e) {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        ok = document.execCommand("copy");
      } catch (_err) {
        ok = false;
      }
      area.remove();
    }
    btn.textContent = ok ? "Copied ✓" : "Copy failed";
    toast(ok ? "Question and answer copied" : "Could not copy — select the text instead");
    setTimeout(() => (btn.textContent = "Copy Q&A"), 1800);
  }

  function reveal(item) {
    item.open = true;
    item.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    item.classList.add("is-flash");
    setTimeout(() => item.classList.remove("is-flash"), 1600);
    const summary = item.querySelector("summary");
    if (summary) summary.focus({ preventScroll: true });
  }

  /* ---------- events ---------- */
  document.addEventListener("click", (e) => {
    if (!e.target.closest) return;
    const lv = e.target.closest("[data-iq-level]");
    if (lv) return setLevel(lv.getAttribute("data-iq-level"));
    const gr = e.target.closest("[data-iq-group]");
    if (gr) return setGroup(gr.getAttribute("data-iq-group"));
    const pr = e.target.closest("[data-practised]");
    if (pr) {
      const key = pr.getAttribute("data-practised");
      if (practised.has(key)) practised.delete(key);
      else practised.add(key);
      write(PRACTISED_KEY, JSON.stringify([...practised]));
      paintPractised();
      if (practised.has(key)) toast(practised.size + " of " + total + " practised");
      return;
    }
    const cp = e.target.closest("[data-copy-q]");
    if (cp) {
      const item = cp.closest(".iq-item");
      if (item) copyQA(item, cp);
      return;
    }
    if (e.target.closest("[data-iq-random]")) {
      const pool = items.filter((i) => !i.hidden && !practised.has(i.getAttribute("data-q")));
      const from = pool.length ? pool : items.filter((i) => !i.hidden);
      if (!from.length) return toast("No questions match your filters");
      reveal(from[Math.floor(Math.random() * from.length)]);
      return;
    }
    const ex = e.target.closest("[data-iq-expand]");
    if (ex) {
      const open = ex.getAttribute("data-iq-expand") === "open";
      items.forEach((i) => {
        if (!i.hidden) i.open = open;
      });
      return;
    }
    if (e.target.closest("[data-iq-reset]")) {
      if (practised.size && window.confirm("Reset practised questions on this device?")) {
        practised.clear();
        write(PRACTISED_KEY, "[]");
        paintPractised();
        toast("Practised list reset");
      }
      return;
    }
    if (e.target.closest("[data-iq-clear]")) {
      if (search) search.value = "";
      setGroup("all");
      setLevel("all");
      return;
    }
    if (e.target.closest("[data-top]")) {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  });

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

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id.replace(/^q-/, "");
          document.querySelectorAll("[data-index]").forEach((li) => li.classList.toggle("is-active", li.getAttribute("data-index") === id));
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    subjects.forEach((s) => io.observe(s));
  }

  /* Deep link: #q-java or #q-java-3 */
  function openFromHash() {
    const m = /^#q-([a-z0-9-]+?)(?:-(\d+))?$/.exec(location.hash);
    if (!m) return;
    if (m[2]) {
      const item = document.querySelector('[data-q="' + m[1] + "-" + m[2] + '"]');
      if (item) reveal(item);
    }
  }
  window.addEventListener("hashchange", openFromHash);

  /* ---------- init ---------- */
  setLevel(level);
  paintPractised();
  onScroll();
  openFromHash();
})();
