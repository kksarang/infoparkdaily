/* /learning/: Try-it editor, quizzes, progress (stored only in this browser) and hub search. */
(function () {
  "use strict";

  const KEY = "ipd-learning-progress-v1";
  const read = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}") || {};
    } catch (_e) {
      return {};
    }
  };
  const save = (data) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (_e) {}
  };
  let progress = read();
  const isDone = (id) => !!progress[id];

  /* ---------- progress UI ---------- */
  function paintProgress() {
    document.querySelectorAll("[data-ln-lesson]").forEach((a) => {
      a.classList.toggle("is-done", isDone(a.dataset.lnLesson));
    });
    const totals = {};
    document.querySelectorAll("[data-ln-label]").forEach((el) => {
      const track = el.dataset.lnLabel;
      const total = Number(el.dataset.total) || 0;
      const done = Object.keys(progress).filter((k) => progress[k] && k.startsWith(track + "/")).length;
      totals[track] = { done, total };
      el.textContent = done ? `${Math.min(done, total)} of ${total} complete` : el.tagName === "SMALL" ? "" : "Not started";
    });
    document.querySelectorAll("[data-ln-bar]").forEach((bar) => {
      const t = totals[bar.dataset.lnBar];
      bar.style.width = t && t.total ? `${Math.round((Math.min(t.done, t.total) / t.total) * 100)}%` : "0%";
    });
    /* "Continue" buttons → first lesson not yet complete on this page's lesson list. */
    document.querySelectorAll("[data-ln-continue]").forEach((btn) => {
      const track = btn.dataset.lnContinue;
      const t = totals[track];
      if (!t || !t.done) return;
      const links = [...document.querySelectorAll(`[data-ln-lesson^="${track}/"]`)];
      const next = links.find((a) => !isDone(a.dataset.lnLesson));
      if (next) {
        btn.href = next.getAttribute("href");
        btn.textContent = "Continue: " + next.textContent.trim();
      } else {
        btn.textContent = "Review lessons ✓";
      }
    });
    const current = document.querySelector("[data-ln-current]");
    const completeBtn = document.querySelector("[data-ln-complete]");
    if (current && completeBtn) {
      const done = isDone(current.dataset.lnCurrent);
      completeBtn.setAttribute("aria-pressed", String(done));
      completeBtn.textContent = done ? "✓ Completed — undo" : "Mark lesson complete";
    }
  }

  const setDone = (id, value) => {
    progress = read();
    if (value) progress[id] = Date.now();
    else delete progress[id];
    save(progress);
    paintProgress();
  };

  document.querySelector("[data-ln-complete]")?.addEventListener("click", () => {
    const id = document.querySelector("[data-ln-current]")?.dataset.lnCurrent;
    if (id) setDone(id, !isDone(id));
  });

  /* ---------- try it yourself ---------- */
  /* Injected first into the sandboxed frame: forwards console output and errors to this page. */
  const BRIDGE =
    "<script>(function(){function s(t,a){try{parent.postMessage({lnConsole:true,type:t,text:Array.prototype.map.call(a,function(v){try{return typeof v==='object'?JSON.stringify(v):String(v)}catch(e){return String(v)}}).join(' ')},'*')}catch(e){}}" +
    "['log','info','warn','error'].forEach(function(k){var o=console[k];console[k]=function(){s(k,arguments);o&&o.apply(console,arguments)}});" +
    "addEventListener('error',function(e){s('error',[e.message+(e.lineno?' (line '+e.lineno+')':'')])});})();<\/script>";

  const withBridge = (code) => {
    if (/<head[^>]*>/i.test(code)) return code.replace(/<head[^>]*>/i, (m) => m + BRIDGE);
    return BRIDGE + code;
  };

  document.querySelectorAll("[data-tryit]").forEach((box) => {
    const area = box.querySelector("[data-code]");
    const frame = box.querySelector("[data-frame]");
    const out = box.querySelector("[data-console]");
    const original = area.value;

    const run = () => {
      out.textContent = "";
      out.hidden = true;
      frame.srcdoc = withBridge(area.value);
    };

    window.addEventListener("message", (e) => {
      if (e.source !== frame.contentWindow || !e.data || !e.data.lnConsole) return;
      const line = document.createElement("span");
      line.className = "ln-log ln-log--" + e.data.type;
      line.textContent = (e.data.type === "error" ? "✖ " : "› ") + e.data.text + "\n";
      out.append(line);
      out.hidden = false;
    });

    box.querySelector("[data-run]").addEventListener("click", run);
    box.querySelector("[data-reset]").addEventListener("click", () => {
      area.value = original;
      run();
    });
    area.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        run();
      } else if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
        const { selectionStart: a, selectionEnd: b } = area;
        area.setRangeText("  ", a, b, "end");
      }
    });
    run();
  });

  /* ---------- quiz ---------- */
  document.querySelectorAll("[data-quiz]").forEach((quiz) => {
    const answer = Number(quiz.dataset.answer);
    const result = quiz.querySelector("[data-result]");
    const why = quiz.querySelector("[data-why]");
    quiz.querySelector("[data-check]").addEventListener("click", () => {
      const picked = quiz.querySelector("input:checked");
      result.hidden = false;
      quiz.querySelectorAll("label").forEach((l) => l.classList.remove("is-right", "is-wrong"));
      if (!picked) {
        result.textContent = "Choose an answer first.";
        result.className = "ln-quiz-result";
        return;
      }
      const ok = Number(picked.value) === answer;
      picked.closest("label").classList.add(ok ? "is-right" : "is-wrong");
      result.textContent = ok ? "✓ Correct!" : "Not quite — try again.";
      result.className = "ln-quiz-result " + (ok ? "is-right" : "is-wrong");
      why.hidden = !ok;
    });
  });

  /* ---------- hub search ---------- */
  const search = document.querySelector("[data-ln-search]");
  if (search) {
    const items = [...document.querySelectorAll("[data-search]")];
    const empty = document.querySelector("[data-ln-empty]");
    const filter = () => {
      const q = search.value.trim().toLowerCase();
      let shown = 0;
      items.forEach((el) => {
        const hit = !q || el.dataset.search.includes(q);
        el.hidden = !hit;
        if (hit) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    };
    search.addEventListener("input", filter);
  }

  /* Lesson list starts collapsed on phones so the lesson itself is first on screen. */
  if (window.matchMedia && matchMedia("(max-width: 900px)").matches) {
    document.querySelectorAll(".ln-side-box[open]").forEach((d) => d.removeAttribute("open"));
  }

  paintProgress();
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      progress = read();
      paintProgress();
    }
  });
})();
