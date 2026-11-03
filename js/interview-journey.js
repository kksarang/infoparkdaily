/* Interview Journey: track switch, progress, journey map panel, situation picker, copy buttons. */
(function () {
  "use strict";

  const TRACK_KEY = "ipd-ij-track-v1";
  const DONE_KEY = "ipd-ij-done-v1";
  const body = document.body;

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (_e) {
      return null;
    }
    return null;
  }

  let stages = [];
  try {
    stages = JSON.parse(
      document.getElementById("ij-stages").textContent || "[]",
    );
  } catch (_e) {
    stages = [];
  }
  const stageById = new Map(stages.map((s) => [s.id, s]));
  const total = stages.length;

  /* ---------- toast ---------- */
  const toastEl = document.getElementById("ij-toast");
  let toastTimer = 0;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("is-open");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-open"), 2600);
  }

  /* ---------- track ---------- */
  function setTrack(track, announce) {
    const value =
      track === "fresher" || track === "experienced" ? track : "all";
    body.setAttribute("data-track", value);
    document.querySelectorAll("[data-set-track]").forEach((btn) => {
      btn.setAttribute(
        "aria-pressed",
        String(btn.getAttribute("data-set-track") === value),
      );
    });
    store(TRACK_KEY, value);
    if (announce) {
      toast(
        value === "all"
          ? "Showing both tracks"
          : value === "fresher"
            ? "Fresher track selected"
            : "Experienced track selected",
      );
    }
  }

  /* ---------- progress ---------- */
  let done = new Set();
  try {
    const saved = JSON.parse(store(DONE_KEY) || "[]");
    if (Array.isArray(saved))
      done = new Set(saved.filter((id) => stageById.has(id)));
  } catch (_e) {
    done = new Set();
  }

  function paintProgress() {
    const count = done.size;
    const pct = total ? Math.round((count / total) * 100) : 0;
    document
      .querySelectorAll("[data-ring]")
      .forEach((el) => el.style.setProperty("--p", String(pct)));
    document
      .querySelectorAll("[data-progress-pct]")
      .forEach((el) => (el.textContent = pct + "%"));
    document
      .querySelectorAll("[data-progress-count]")
      .forEach((el) => (el.textContent = count + " of " + total));
    document
      .querySelectorAll("[data-progress-bar]")
      .forEach((el) => (el.style.width = pct + "%"));
    document.querySelectorAll("[data-done]").forEach((btn) => {
      const on = done.has(btn.getAttribute("data-done"));
      btn.setAttribute("aria-pressed", String(on));
      btn.classList.toggle("is-done", on);
      const label = btn.querySelector(".ij-done-label");
      if (label) label.textContent = on ? "Completed" : "Mark complete";
      else if (btn.classList.contains("ij-done-inline"))
        btn.textContent = on ? "Completed ✓" : "Mark chapter complete";
    });
    document
      .querySelectorAll("[data-node]")
      .forEach((n) =>
        n.classList.toggle("is-done", done.has(n.getAttribute("data-node"))),
      );
    document
      .querySelectorAll("[data-toc]")
      .forEach((n) =>
        n.classList.toggle("is-done", done.has(n.getAttribute("data-toc"))),
      );
    document
      .querySelectorAll(".ij-chapter")
      .forEach((c) =>
        c.classList.toggle("is-done", done.has(c.getAttribute("data-chapter"))),
      );
    document.querySelectorAll("[data-phase-prog]").forEach((el) => {
      const ids = el.getAttribute("data-phase-prog").split(",");
      const n = ids.filter((id) => done.has(id)).length;
      const b = el.querySelector("b");
      if (b) b.textContent = String(n);
      const bar = el.querySelector(".ij-phase-bar > span");
      if (bar) bar.style.width = Math.round((n / ids.length) * 100) + "%";
      el.classList.toggle("is-full", n === ids.length);
    });
    const cont = document.querySelector("[data-continue]");
    if (cont) {
      const next = stages.find((st) => !done.has(st.id));
      if (count && next) {
        cont.textContent =
          "Continue: " + String(next.num).padStart(2, "0") + " " + next.title;
        cont.setAttribute("data-open", next.id);
        cont.setAttribute("href", "#ch-" + next.id);
      } else if (!count && stages[0]) {
        cont.textContent = "Start at chapter 1";
        cont.setAttribute("data-open", stages[0].id);
        cont.setAttribute("href", "#ch-" + stages[0].id);
      } else {
        cont.textContent = "All chapters complete ✓";
      }
    }
    if (dialogStage) paintDialogDone();
  }

  function toggleDone(id) {
    if (!stageById.has(id)) return;
    if (done.has(id)) done.delete(id);
    else done.add(id);
    store(DONE_KEY, JSON.stringify([...done]));
    paintProgress();
    if (done.has(id))
      toast(
        done.size === total
          ? "All 17 chapters complete — well done!"
          : "Chapter marked complete",
      );
  }

  /* ---------- open a chapter ---------- */
  const compact = window.matchMedia("(max-width: 960px)");
  const tocWrap = document.querySelector(".ij-toc-wrap");
  function syncToc() {
    if (tocWrap) tocWrap.open = !compact.matches;
  }
  syncToc();
  if (compact.addEventListener) compact.addEventListener("change", syncToc);

  function openChapter(id, focus) {
    const article = document.getElementById("ch-" + id);
    if (!article) return;
    if (compact.matches && tocWrap) tocWrap.open = false;
    const details = article.querySelector("[data-details]");
    if (details) details.open = true;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    article.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
    if (focus !== false) {
      const heading = article.querySelector("h2");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    }
    if (history.replaceState) history.replaceState(null, "", "#ch-" + id);
  }

  /* ---------- stage dialog ---------- */
  const dialog = document.getElementById("ij-stage-dialog");
  let dialogStage = null;
  let dialogReturn = null;

  function fillList(el, items) {
    el.textContent = "";
    items.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      el.appendChild(li);
    });
  }

  function paintDialogDone() {
    const btn = dialog && dialog.querySelector('[data-d="done"]');
    if (!btn || !dialogStage) return;
    const on = done.has(dialogStage.id);
    btn.setAttribute("aria-pressed", String(on));
    btn.textContent = on ? "Completed ✓" : "Mark complete";
  }

  function openStage(id, trigger) {
    const s = stageById.get(id);
    if (!s || !dialog) {
      openChapter(id);
      return;
    }
    dialogStage = s;
    dialogReturn = trigger || null;
    dialog.querySelector('[data-d="meta"]').textContent =
      "Chapter " +
      String(s.num).padStart(2, "0") +
      " · " +
      s.phase +
      " · " +
      s.time +
      " min";
    dialog.querySelector('[data-d="title"]').textContent = s.title;
    dialog.querySelector('[data-d="summary"]').textContent = s.summary;
    fillList(dialog.querySelector('[data-d="candidate"]'), s.candidate);
    fillList(dialog.querySelector('[data-d="company"]'), s.company);
    const tools = dialog.querySelector('[data-d="tools"]');
    tools.textContent = "";
    s.tools.forEach(([label, href]) => {
      const a = document.createElement("a");
      a.className = "ij-chip";
      a.href = href;
      a.textContent = label;
      tools.appendChild(a);
    });
    paintDialogDone();
    if (typeof dialog.showModal === "function") dialog.showModal();
    else openChapter(id);
  }

  function closeStage() {
    if (dialog && dialog.open) dialog.close();
  }

  if (dialog) {
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog || e.target.closest("[data-dialog-close]"))
        closeStage();
      const action = e.target.closest("[data-d]");
      if (!action || !dialogStage) return;
      if (action.getAttribute("data-d") === "open") {
        const id = dialogStage.id;
        dialogReturn = null;
        closeStage();
        openChapter(id);
      } else if (action.getAttribute("data-d") === "done") {
        toggleDone(dialogStage.id);
      }
    });
    dialog.addEventListener("close", () => {
      if (dialogReturn && dialogReturn.focus) dialogReturn.focus();
      dialogReturn = null;
    });
  }

  /* ---------- where am I ---------- */
  const situations = Array.isArray(window.IJ_SITUATIONS)
    ? window.IJ_SITUATIONS
    : [];
  const whereResult = document.getElementById("where-result");

  function showSituation(index, btn) {
    const s = situations[index];
    if (!s || !whereResult) return;
    document
      .querySelectorAll("[data-where]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    whereResult.hidden = false;
    whereResult.textContent = "";
    const wrap = document.createElement("div");
    wrap.className = "ij-where-card";
    const kicker = document.createElement("p");
    kicker.className = "ij-kicker";
    kicker.textContent = "Your next step";
    const h = document.createElement("h3");
    h.textContent =
      "Chapter " + String(s.num).padStart(2, "0") + ": " + s.title;
    const p = document.createElement("p");
    p.textContent = s.why;
    const actions = document.createElement("div");
    actions.className = "ij-hero-cta";
    const open = document.createElement("a");
    open.className = "ij-btn ij-btn--yellow";
    open.href = "#ch-" + s.chapter;
    open.setAttribute("data-open", s.chapter);
    open.textContent = "Open chapter " + String(s.num).padStart(2, "0");
    actions.appendChild(open);
    if (s.tool) {
      const tool = document.createElement("a");
      tool.className = "ij-btn ij-btn--ghost";
      tool.href = s.tool[0];
      tool.textContent = s.tool[1];
      actions.appendChild(tool);
    }
    const next = stages[s.num];
    if (next) {
      const after = document.createElement("p");
      after.className = "ij-small";
      after.textContent =
        "After that: Chapter " +
        String(next.num).padStart(2, "0") +
        " — " +
        next.title +
        ".";
      wrap.append(kicker, h, p, actions, after);
    } else {
      wrap.append(kicker, h, p, actions);
    }
    whereResult.appendChild(wrap);
    const node = document.querySelector('[data-node="' + s.chapter + '"]');
    document
      .querySelectorAll(".ij-node.is-current")
      .forEach((n) => n.classList.remove("is-current"));
    if (node) node.classList.add("is-current");
  }

  /* ---------- copy ---------- */
  async function copyFrom(btn) {
    const target = document.getElementById(btn.getAttribute("data-copy"));
    if (!target) return;
    const text = target.textContent;
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
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
    btn.textContent = ok ? "Copied ✓" : "Select & copy";
    toast(ok ? "Copied to clipboard" : "Press Ctrl/Cmd + C to copy");
    setTimeout(() => (btn.textContent = "Copy"), 2000);
  }

  /* ---------- events ---------- */
  document.addEventListener("click", (e) => {
    if (!e.target.closest) return;
    const trackBtn = e.target.closest("[data-set-track]");
    if (trackBtn) {
      setTrack(trackBtn.getAttribute("data-set-track"), true);
      return;
    }
    const doneBtn = e.target.closest("[data-done]");
    if (doneBtn) {
      toggleDone(doneBtn.getAttribute("data-done"));
      return;
    }
    const stageBtn = e.target.closest("[data-stage]");
    if (stageBtn) {
      openStage(stageBtn.getAttribute("data-stage"), stageBtn);
      return;
    }
    const opener = e.target.closest("[data-open]");
    if (opener) {
      e.preventDefault();
      openChapter(opener.getAttribute("data-open"));
      return;
    }
    const where = e.target.closest("[data-where]");
    if (where) {
      showSituation(Number(where.getAttribute("data-where")), where);
      return;
    }
    const copyBtn = e.target.closest("[data-copy]");
    if (copyBtn) {
      copyFrom(copyBtn);
      return;
    }
    const expand = e.target.closest("[data-expand]");
    if (expand) {
      const open = expand.getAttribute("data-expand") === "open";
      document
        .querySelectorAll("[data-details]")
        .forEach((d) => (d.open = open));
      return;
    }
    if (e.target.closest("[data-reset]")) {
      if (!done.size) return;
      if (window.confirm("Reset your chapter progress on this device?")) {
        done.clear();
        store(DONE_KEY, "[]");
        paintProgress();
        toast("Progress reset");
      }
    }
  });

  /* Highlight the chapter in view in the side list. */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("data-chapter");
          document.querySelectorAll("[data-toc]").forEach((li) => {
            const on = li.getAttribute("data-toc") === id;
            li.classList.toggle("is-active", on);
            const a = li.querySelector("a");
            if (a) {
              if (on) a.setAttribute("aria-current", "step");
              else a.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    document.querySelectorAll(".ij-chapter").forEach((c) => io.observe(c));
  }

  function openFromHash() {
    const m = /^#ch-([a-z0-9-]+)$/.exec(location.hash);
    if (m && stageById.has(m[1])) openChapter(m[1], false);
  }
  window.addEventListener("hashchange", openFromHash);

  /* ---------- polish: tables, map rows, reveal, scroll UI ---------- */
  document.querySelectorAll(".ij-table").forEach((table) => {
    const heads = [...table.querySelectorAll("thead th")].map((th) =>
      th.textContent.trim(),
    );
    table.querySelectorAll("tbody tr").forEach((tr) => {
      [...tr.children].forEach((cell, i) => {
        if (i > 0 && !cell.hasAttribute("data-label") && heads[i])
          cell.setAttribute("data-label", heads[i]);
      });
    });
  });

  function markRowStarts() {
    document.querySelectorAll(".ij-nodes").forEach((list) => {
      let lastTop = null;
      const column = getComputedStyle(list).flexDirection === "column";
      [...list.children].forEach((li) => {
        if (column) {
          li.classList.remove("is-row-start");
          return;
        }
        const top = li.offsetTop;
        li.classList.toggle(
          "is-row-start",
          lastTop !== null && top - lastTop > 8,
        );
        lastTop = top;
      });
    });
  }
  markRowStarts();
  let rowTimer = 0;
  window.addEventListener("resize", () => {
    clearTimeout(rowTimer);
    rowTimer = setTimeout(markRowStarts, 120);
  });
  if (document.fonts && document.fonts.ready)
    document.fonts.ready.then(markRowStarts);

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if ("IntersectionObserver" in window && !reduceMotion) {
    body.classList.add("ij-anim");
    const revealer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    document
      .querySelectorAll(".ij-reveal")
      .forEach((el) => revealer.observe(el));
  }

  const spyLinks = [...document.querySelectorAll("[data-spy]")];
  if ("IntersectionObserver" in window && spyLinks.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          spyLinks.forEach((a) => {
            const on = a.getAttribute("data-spy") === id;
            a.classList.toggle("is-active", on);
            if (on) {
              a.setAttribute("aria-current", "true");
              const track = a.parentElement;
              if (track && track.scrollWidth > track.clientWidth) {
                track.scrollTo({
                  left: a.offsetLeft - 16,
                  behavior: reduceMotion ? "auto" : "smooth",
                });
              }
            } else a.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    spyLinks.forEach((a) => {
      const sec = document.getElementById(a.getAttribute("data-spy"));
      if (sec) spy.observe(sec);
    });
  }

  const readbar = document.querySelector("[data-readbar]");
  const topBtn = document.querySelector("[data-top]");
  let ticking = false;
  function onScroll() {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = window.scrollY;
    if (readbar)
      readbar.style.transform =
        "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
    if (topBtn) topBtn.hidden = y < 1400;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true },
  );
  onScroll();
  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      const skip = document.querySelector(".ij-hero h1");
      if (skip) {
        skip.setAttribute("tabindex", "-1");
        skip.focus({ preventScroll: true });
      }
    });
  }

  /* ---------- init ---------- */
  setTrack(store(TRACK_KEY) || body.getAttribute("data-track") || "all", false);
  paintProgress();
  openFromHash();
})();
