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
      /* First-time visitors see no "Not started" / empty bars; progress appears once they start. */
      el.textContent = done ? `${Math.min(done, total)} of ${total} complete` : "";
      el.hidden = !done;
    });
    document.querySelectorAll("[data-ln-bar]").forEach((bar) => {
      const t = totals[bar.dataset.lnBar];
      bar.style.width = t && t.total ? `${Math.round((Math.min(t.done, t.total) / t.total) * 100)}%` : "0%";
      if (bar.parentElement) bar.parentElement.hidden = !(t && t.done);
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
        const title = (next.querySelector("strong") || next).textContent.trim();
        btn.textContent = btn.classList.contains("ln-card-go") ? "Continue →" : "Continue: " + title;
        btn.title = "Continue: " + title;
      } else {
        btn.textContent = btn.classList.contains("ln-card-go") ? "Review ✓" : "Review lessons ✓";
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

  /* ----- Python: Pyodide inside a Web Worker, so a runaway loop can be stopped ----- */
  const PYODIDE_DIR = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";
  const PY_LIMIT_MS = 10000;
  const PY_WORKER_SRC =
    "importScripts('" + PYODIDE_DIR + "pyodide.js');" +
    "let py=null;" +
    "self.onmessage=async(e)=>{" +
    " try{ if(!py){ py=await loadPyodide({indexURL:'" + PYODIDE_DIR + "'}); }" +
    "  self.postMessage({type:'start'});" +
    "  py.setStdout({batched:(t)=>self.postMessage({type:'log',text:t})});" +
    "  py.setStderr({batched:(t)=>self.postMessage({type:'error',text:t})});" +
    "  await py.runPythonAsync(e.data.code,{globals:py.toPy({'__name__':'__main__'})});" +
    " }catch(err){ self.postMessage({type:'error',text:String(err&&err.message||err)}); }" +
    " self.postMessage({type:'done'});" +
    "};";
  let pyWorker = null;
  const newPyWorker = () => new Worker(URL.createObjectURL(new Blob([PY_WORKER_SRC], { type: "text/javascript" })));
  /* Keep only the user-relevant part of a Pyodide traceback. */
  const tidyTraceback = (text) => {
    const lines = text.split("\n");
    const at = lines.findIndex((l) => l.includes('File "<exec>"'));
    return at > 0 ? ["Traceback (most recent call last):", ...lines.slice(at)].join("\n").replace(/File "<exec>", line (\d+)/g, "Line $1") : text;
  };

  function runPython(code, box) {
    box.textContent = "";
    const pre = document.createElement("pre");
    pre.className = "ln-console ln-console--py";
    pre.textContent = pyWorker ? "Running…\n" : "Loading Python (first run takes a few seconds)…\n";
    box.append(pre);
    if (!pyWorker) pyWorker = newPyWorker();
    const worker = pyWorker;
    let started = false;
    let printed = false;
    let timer = null;
    const write = (cls, text) => {
      if (!printed) {
        pre.textContent = "";
        printed = true;
      }
      const span = document.createElement("span");
      span.className = "ln-log ln-log--" + cls;
      span.textContent = text + "\n";
      pre.append(span);
    };
    worker.onmessage = (e) => {
      const m = e.data || {};
      if (m.type === "start") {
        started = true;
        pre.textContent = "";
        timer = setTimeout(() => {
          worker.terminate();
          pyWorker = null;
          write("error", "Stopped: the code ran for more than 10 seconds (is there an endless loop?).");
        }, PY_LIMIT_MS);
      } else if (m.type === "log") write("log", m.text);
      else if (m.type === "error") write("error", tidyTraceback(m.text));
      else if (m.type === "done") {
        clearTimeout(timer);
        if (!printed) write("muted", started ? "(no output — add print() to see values)" : "Could not start Python.");
      }
    };
    worker.onerror = () => {
      clearTimeout(timer);
      write("error", "Python could not load. Check your internet connection and try again.");
      pyWorker = null;
    };
    worker.postMessage({ code });
  }

  /* ----- SQL: sql.js (SQLite compiled to WebAssembly), fresh sample database per run ----- */
  const SQLJS_DIR = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/";
  let sqlReady = null;
  const loadSqlJs = () =>
    sqlReady ||
    (sqlReady = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = SQLJS_DIR + "sql-wasm.js";
      s.onload = () => window.initSqlJs({ locateFile: (f) => SQLJS_DIR + f }).then(resolve, reject);
      s.onerror = () => {
        sqlReady = null;
        reject(new Error("SQL engine could not load. Check your internet connection and try again."));
      };
      document.head.append(s);
    }));

  function renderTable(res) {
    const wrap = document.createElement("div");
    wrap.className = "ln-table-wrap";
    const table = document.createElement("table");
    const head = table.createTHead().insertRow();
    res.columns.forEach((c) => {
      const th = document.createElement("th");
      th.textContent = c;
      head.append(th);
    });
    const body = table.createTBody();
    res.values.forEach((row) => {
      const tr = body.insertRow();
      row.forEach((v) => {
        const td = tr.insertCell();
        td.textContent = v === null ? "NULL" : String(v);
        if (v === null) td.className = "is-null";
      });
    });
    wrap.append(table);
    const count = document.createElement("p");
    count.className = "ln-result-count";
    count.textContent = res.values.length + (res.values.length === 1 ? " row" : " rows");
    wrap.append(count);
    return wrap;
  }

  async function runSql(code, box, seed) {
    box.textContent = "";
    const msg = document.createElement("p");
    msg.className = "ln-result-hint";
    msg.textContent = "Running…";
    box.append(msg);
    let db = null;
    try {
      const SQL = await loadSqlJs();
      db = new SQL.Database();
      db.run(seed);
      const results = db.exec(code);
      box.textContent = "";
      if (!results.length) {
        const p = document.createElement("p");
        p.className = "ln-result-hint";
        p.textContent = "Statement ran successfully — no rows to show. Add a SELECT to see data.";
        box.append(p);
      }
      results.forEach((r) => box.append(renderTable(r)));
    } catch (err) {
      box.textContent = "";
      const p = document.createElement("p");
      p.className = "ln-result-error";
      p.textContent = "✖ " + (err && err.message ? err.message : String(err));
      box.append(p);
    } finally {
      if (db) db.close();
    }
  }

  document.querySelectorAll("[data-tryit]").forEach((box) => {
    const area = box.querySelector("[data-code]");
    const lang = box.dataset.lang || "web";
    const frame = box.querySelector("[data-frame]");
    const out = box.querySelector("[data-console]");
    const resultBox = box.querySelector("[data-result-box]");
    const seedTpl = box.querySelector("template[data-seed]");
    const seed = seedTpl ? seedTpl.content.textContent : "";
    const original = area.value;

    const run = () => {
      if (lang === "python") return runPython(area.value, resultBox);
      if (lang === "sql") return runSql(area.value, resultBox, seed);
      out.textContent = "";
      out.hidden = true;
      frame.srcdoc = withBridge(area.value);
    };

    if (frame) {
      window.addEventListener("message", (e) => {
        if (e.source !== frame.contentWindow || !e.data || !e.data.lnConsole) return;
        /* Babel-in-browser always warns about precompiling; irrelevant for lessons. */
        if (/in-browser Babel transformer/.test(e.data.text)) return;
        const line = document.createElement("span");
        line.className = "ln-log ln-log--" + e.data.type;
        line.textContent = (e.data.type === "error" ? "✖ " : "› ") + e.data.text + "\n";
        out.append(line);
        out.hidden = false;
      });
    }

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
        area.setRangeText(lang === "python" ? "    " : "  ", a, b, "end");
      }
    });
    /* Web and SQL examples run immediately; Python waits for Run (its engine is a large download). */
    if (lang !== "python") run();
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

  /* ---------- remember the last lesson opened (for "Continue where you left off") ---------- */
  const LAST = "ipd-learning-last-v1";
  const current = document.querySelector("[data-ln-current]");
  if (current) {
    try {
      const h1 = document.querySelector(".ln-article h1");
      localStorage.setItem(LAST, JSON.stringify({ id: current.dataset.lnCurrent, title: h1 ? h1.textContent.trim() : "", url: location.pathname, at: Date.now() }));
    } catch (_e) {}
  }
  const resume = document.querySelector("[data-ln-resume]");
  if (resume) {
    try {
      const last = JSON.parse(localStorage.getItem(LAST) || "null");
      if (last && last.url && /^\/learning\/[a-z-]+\/[a-z-]+\/$/.test(last.url)) {
        resume.href = last.url;
        resume.querySelector("[data-ln-resume-title]").textContent = last.title || "your last lesson";
        resume.hidden = false;
      }
    } catch (_e) {}
  }

  /* ---------- hub: curriculum tabs ---------- */
  const curriculum = document.querySelector("[data-ln-curriculum]");
  const tabs = curriculum ? [...curriculum.querySelectorAll("[data-ln-tab]")] : [];
  const panels = curriculum ? [...curriculum.querySelectorAll("[data-ln-panel]")] : [];
  function selectTab(key, focus) {
    tabs.forEach((t) => {
      const on = t.dataset.lnTab === key;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    panels.forEach((p) => p.toggleAttribute("data-ln-hidden", p.dataset.lnPanel !== key));
  }
  if (curriculum) {
    curriculum.classList.add("is-tabbed");
    selectTab(tabs[0].dataset.lnTab, false);
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => selectTab(t.dataset.lnTab, false));
      t.addEventListener("keydown", (e) => {
        const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (step) {
          e.preventDefault();
          selectTab(tabs[(i + step + tabs.length) % tabs.length].dataset.lnTab, true);
        } else if (e.key === "Home" || e.key === "End") {
          e.preventDefault();
          selectTab(tabs[e.key === "Home" ? 0 : tabs.length - 1].dataset.lnTab, true);
        }
      });
    });
  }

  /* ---------- hub: category filter + search ---------- */
  const search = document.querySelector("[data-ln-search]");
  const filterBtns = [...document.querySelectorAll("[data-ln-filter]")];
  let group = "all";
  function applyHub() {
    const q = search ? search.value.trim().toLowerCase() : "";
    document.body.classList.toggle("ln-searching", !!q);
    if (curriculum) curriculum.classList.toggle("is-tabbed", !q);
    let shownCards = 0;
    document.querySelectorAll("[data-search]").forEach((el) => {
      const textHit = !q || el.dataset.search.includes(q);
      const groupHit = !el.dataset.groups || group === "all" || el.dataset.groups.split(" ").includes(group);
      el.hidden = !(textHit && groupHit);
      if (!el.hidden && el.classList.contains("ln-card")) shownCards++;
    });
    /* While searching, show every panel that still has a matching lesson. */
    panels.forEach((p) => {
      p.toggleAttribute("data-ln-empty-panel", !!q && !p.querySelector("li:not([hidden])"));
    });
    const empty = document.querySelector("[data-ln-empty]");
    if (empty) empty.hidden = shownCards > 0 || !!q && !!document.querySelector(".ln-panel-list li:not([hidden])");
    renderResults(q);
  }

  /* Lesson-level results right under the search box, so typing "join" shows the JOINs lesson
     immediately instead of only filtering tutorial cards further down the page. */
  const lessonIndex = [...document.querySelectorAll(".ln-panel")].flatMap((panel) => {
    const track = ((panel.querySelector(".ln-panel-head h3") || {}).textContent || "").split(" — ")[0].trim();
    const color = panel.style.getPropertyValue("--ln-c");
    return [...panel.querySelectorAll(".ln-panel-list li[data-search]")].map((li) => {
      const a = li.querySelector("a");
      return {
        track,
        color,
        href: a ? a.getAttribute("href") : "#",
        title: ((li.querySelector("strong") || {}).textContent || "").trim(),
        desc: ((li.querySelector("small") || {}).textContent || "").trim(),
        hay: li.dataset.search
      };
    });
  });
  let results = null;
  if (search && lessonIndex.length) {
    results = document.createElement("div");
    results.className = "ln-results";
    results.id = "ln-results";
    results.setAttribute("role", "region");
    results.setAttribute("aria-label", "Matching lessons");
    results.hidden = true;
    (search.closest("label") || search).insertAdjacentElement("afterend", results);
    search.setAttribute("aria-controls", "ln-results");
  }
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  function renderResults(q) {
    if (!results) return;
    if (!q) {
      results.hidden = true;
      results.innerHTML = "";
      return;
    }
    const hits = lessonIndex
      .filter((l) => l.hay.includes(q))
      .sort((a, b) => Number(b.title.toLowerCase().includes(q)) - Number(a.title.toLowerCase().includes(q)));
    const shown = hits.slice(0, 6);
    results.hidden = false;
    results.innerHTML = hits.length
      ? `<p class="ln-results-count" role="status">${hits.length} lesson${hits.length > 1 ? "s match" : " matches"} “${esc(q)}”</p>
         <ol>${shown
           .map(
             (l) =>
               `<li><a href="${esc(l.href)}"><span class="ln-results-track" style="--ln-c:${esc(l.color)}">${esc(l.track)}</span><strong>${esc(l.title)}</strong><small>${esc(l.desc)}</small></a></li>`
           )
           .join("")}</ol>
         ${hits.length > shown.length ? `<a class="ln-results-more" href="#ln-all">See all ${hits.length} in the curriculum ↓</a>` : ""}`
      : `<p class="ln-results-count" role="status">No lessons match “${esc(q)}”. Try another word, like “loops” or “joins”.</p>`;
  }
  if (search) {
    search.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const first = results && results.querySelector("li a");
        if (first) {
          e.preventDefault();
          location.assign(first.getAttribute("href"));
        }
      } else if (e.key === "Escape" && search.value) {
        search.value = "";
        applyHub();
      }
    });
  }
  filterBtns.forEach((b) =>
    b.addEventListener("click", () => {
      group = b.dataset.lnFilter;
      filterBtns.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      applyHub();
    })
  );
  if (search) search.addEventListener("input", applyHub);

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
