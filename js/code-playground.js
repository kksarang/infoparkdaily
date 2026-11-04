/* Live code playground for /interview/learning/: Web (HTML/CSS/JS), JavaScript, SQL (sql.js) and Python (Pyodide).
   User code runs only in the visitor's browser. Web/JS run inside a sandboxed iframe (no same-origin access). */
(function () {
  "use strict";

  const root = document.querySelector("[data-playground]");
  if (!root) return;

  const SQL_JS = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.js";
  const SQL_WASM_DIR = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/";
  const PYODIDE_JS = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
  const PYODIDE_DIR = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";

  /* ---------- examples ---------- */
  const EX = {
    web: [
      {
        name: "Counter button",
        html: '<div class="card">\n  <h1>Clicks: <span id="count">0</span></h1>\n  <button id="btn">Click me</button>\n</div>',
        css: "body { font-family: system-ui; display: grid; place-items: center; height: 100vh; margin: 0; background: #fafaf7; }\n.card { padding: 24px 32px; border-radius: 16px; background: #12151b; color: #fff; text-align: center; }\nbutton { padding: 10px 18px; border: 0; border-radius: 10px; background: #ffc107; font-weight: 700; cursor: pointer; }",
        js: 'let count = 0;\ndocument.getElementById("btn").addEventListener("click", () => {\n  count++;\n  document.getElementById("count").textContent = count;\n});'
      },
      {
        name: "Flexbox job cards",
        html: '<div class="grid">\n  <div class="job"><h3>QA Engineer</h3><p>Infopark · 0–2 yrs</p></div>\n  <div class="job"><h3>Java Developer</h3><p>Technopark · 3 yrs</p></div>\n  <div class="job"><h3>Data Analyst</h3><p>Kochi · 1–3 yrs</p></div>\n</div>',
        css: "body { font-family: system-ui; margin: 20px; background: #f2f2ec; }\n.grid { display: flex; flex-wrap: wrap; gap: 12px; }\n.job { flex: 1 1 180px; padding: 16px; border-radius: 12px; background: #fff; border: 1px solid #e3e4dc; }\n.job h3 { margin: 0 0 6px; }\n.job p { margin: 0; color: #5c6370; }",
        js: ""
      },
      {
        name: "Form validation",
        html: '<form id="f">\n  <label>Email <input id="email" type="text" placeholder="you@example.com"></label>\n  <button>Apply</button>\n  <p id="msg"></p>\n</form>',
        css: "body { font-family: system-ui; margin: 24px; }\ninput { padding: 8px; margin: 0 8px; }\n#msg { font-weight: 700; }",
        js: 'document.getElementById("f").addEventListener("submit", (e) => {\n  e.preventDefault();\n  const v = document.getElementById("email").value.trim();\n  const ok = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v);\n  const msg = document.getElementById("msg");\n  msg.textContent = ok ? "✓ Valid email" : "✗ Please enter a valid email";\n  msg.style.color = ok ? "green" : "crimson";\n});'
      }
    ],
    js: [
      { name: "Palindrome check", code: 'function isPalindrome(s) {\n  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");\n  return clean === clean.split("").reverse().join("");\n}\n\nconsole.log(isPalindrome("Malayalam")); // true\nconsole.log(isPalindrome("Infopark"));  // false' },
      { name: "Second largest number", code: "function secondLargest(arr) {\n  let first = -Infinity, second = -Infinity;\n  for (const x of arr) {\n    if (x > first) { second = first; first = x; }\n    else if (x > second && x !== first) second = x;\n  }\n  return second;\n}\n\nconsole.log(secondLargest([12, 45, 7, 45, 33])); // 33" },
      { name: "Event loop order", code: 'console.log("1: sync");\nsetTimeout(() => console.log("4: setTimeout (macrotask)"), 0);\nPromise.resolve().then(() => console.log("3: promise (microtask)"));\nconsole.log("2: sync");\n\n// Interview question: what order is printed — and why?' },
      { name: "Closure counter", code: "function makeCounter() {\n  let count = 0;            // private variable\n  return () => ++count;     // the closure remembers count\n}\n\nconst next = makeCounter();\nconsole.log(next(), next(), next()); // 1 2 3" },
      { name: "0.1 + 0.2", code: "console.log(0.1 + 0.2);            // 0.30000000000000004\nconsole.log(0.1 + 0.2 === 0.3);    // false\nconsole.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true\nconsole.log(typeof null);          // \"object\"\nconsole.log('5' == 5, '5' === 5);   // true false" },
      { name: "FizzBuzz", code: 'for (let i = 1; i <= 15; i++) {\n  console.log(i % 15 === 0 ? "FizzBuzz" : i % 3 === 0 ? "Fizz" : i % 5 === 0 ? "Buzz" : i);\n}' },
      { name: "🏆 Challenge: reverse a string", task: "Complete <code>reverse(s)</code> so that <code>console.log(reverse(\"kochi\"))</code> prints <code>ihcok</code>.", code: "function reverse(s) {\n  // your code here\n}\n\nconsole.log(reverse(\"kochi\"));", expect: ["ihcok"] },
      { name: "🏆 Challenge: sum of even numbers", task: "Print the sum of all even numbers from 1 to 100 (one number only).", code: "let total = 0;\n// your loop here\n\nconsole.log(total);", expect: ["2550"] },
      { name: "🏆 Challenge: count vowels", task: "Print how many vowels (a, e, i, o, u — any case) are in <code>\"Infopark Daily\"</code>.", code: "const text = \"Infopark Daily\";\n// count the vowels\n\nconsole.log(/* your answer */);", expect: ["5"] },
      { name: "🏆 Challenge: largest number", task: "Print the largest number in <code>[12, 45, 7, 45, 33]</code> without using <code>Math.max</code>.", code: "const nums = [12, 45, 7, 45, 33];\n// find the largest\n\nconsole.log(/* your answer */);", expect: ["45"] }
    ],
    sql: [
      { name: "Second highest salary", code: "SELECT MAX(salary) AS second_highest\nFROM employees\nWHERE salary < (SELECT MAX(salary) FROM employees);" },
      { name: "Find duplicate emails", code: "SELECT email, COUNT(*) AS times\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;" },
      { name: "JOIN employees + departments", code: "SELECT e.name, d.name AS department, e.salary\nFROM employees e\nINNER JOIN departments d ON d.id = e.dept_id\nORDER BY d.name, e.salary DESC;" },
      { name: "Top 2 salaries per department", code: "SELECT * FROM (\n  SELECT e.name, d.name AS department, e.salary,\n         DENSE_RANK() OVER (PARTITION BY e.dept_id ORDER BY e.salary DESC) AS rnk\n  FROM employees e JOIN departments d ON d.id = e.dept_id\n) t\nWHERE rnk <= 2;" },
      { name: "Average salary by department", code: "SELECT d.name AS department, COUNT(*) AS people, ROUND(AVG(e.salary)) AS avg_salary\nFROM employees e JOIN departments d ON d.id = e.dept_id\nGROUP BY d.name\nHAVING COUNT(*) >= 2\nORDER BY avg_salary DESC;" },
      { name: "LEFT JOIN — departments with no employees", code: "SELECT d.name, COUNT(e.id) AS employees\nFROM departments d\nLEFT JOIN employees e ON e.dept_id = d.id\nGROUP BY d.name;" },
      { name: "Show all tables", code: "SELECT * FROM employees;\n-- Tables: employees(id, name, dept_id, salary, joined), departments(id, name), users(id, email)" },
      { name: "🏆 Challenge: QA team names", task: "List the <strong>names</strong> of employees in the <strong>QA</strong> department, sorted alphabetically (one column).", code: "-- Hint: join employees with departments\nSELECT ...", expect: [["Anjali Menon"], ["Divya S"], ["Nikhil Joseph"]] },
      { name: "🏆 Challenge: headcount by department", task: "Show each department name and its number of employees, highest count first (two columns). Leave out departments with no employees.", code: "SELECT ...", expect: [["Engineering", "4"], ["QA", "3"], ["Sales", "2"], ["HR", "1"]] },
      { name: "🏆 Challenge: Engineering salary bill", task: "Return the <strong>total salary</strong> of the Engineering department (one number).", code: "SELECT ...", expect: [["3360000"]] },
      { name: "🏆 Challenge: duplicate emails", task: "Return each email that appears more than once, sorted alphabetically (one column).", code: "SELECT ...", expect: [["anjali@example.com"], ["rahul@example.com"]] }
    ],
    py: [
      { name: "Palindrome check", code: 'def is_palindrome(s):\n    s = "".join(c.lower() for c in s if c.isalnum())\n    return s == s[::-1]\n\nprint(is_palindrome("Malayalam"))  # True\nprint(is_palindrome("Kochi"))      # False' },
      { name: "Anagram check", code: 'from collections import Counter\n\ndef is_anagram(a, b):\n    return Counter(a.lower()) == Counter(b.lower())\n\nprint(is_anagram("listen", "silent"))  # True\nprint(is_anagram("apple", "paper"))    # False' },
      { name: "Mutable default trap", code: 'def add_item(item, bag=[]):      # bug: the same list is reused\n    bag.append(item)\n    return bag\n\nprint(add_item("a"))  # [\'a\']\nprint(add_item("b"))  # [\'a\', \'b\']  <- surprise!\n\ndef add_item_fixed(item, bag=None):\n    bag = [] if bag is None else bag\n    bag.append(item)\n    return bag\n\nprint(add_item_fixed("a"), add_item_fixed("b"))' },
      { name: "List comprehension & generator", code: "squares = [x * x for x in range(10) if x % 2 == 0]\nprint(squares)\n\ndef countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nprint(list(countdown(5)))" },
      { name: "Decorator", code: 'import time\n\ndef timer(fn):\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = fn(*args, **kwargs)\n        print(f"{fn.__name__} took {time.perf_counter() - start:.4f}s")\n        return result\n    return wrapper\n\n@timer\ndef total(n):\n    return sum(range(n))\n\nprint(total(1_000_000))' },
      { name: "Two-sum with a dict", code: "def two_sum(nums, target):\n    seen = {}\n    for i, x in enumerate(nums):\n        if target - x in seen:\n            return seen[target - x], i\n        seen[x] = i\n\nprint(two_sum([2, 7, 11, 15], 9))  # (0, 1)" },
      { name: "🏆 Challenge: factorial", task: "Complete <code>factorial(n)</code> so that <code>print(factorial(5))</code> prints <code>120</code>.", code: "def factorial(n):\n    # your code here\n    pass\n\nprint(factorial(5))", expect: ["120"] },
      { name: "🏆 Challenge: count words", task: "Print the number of words in <code>\"practice makes a person perfect\"</code>.", code: "sentence = \"practice makes a person perfect\"\n# your code here\n", expect: ["5"] },
      { name: "🏆 Challenge: primes under 20", task: "Print a Python list of all prime numbers below 20, e.g. <code>[2, 3, ...]</code>.", code: "primes = []\n# fill the list\n\nprint(primes)", expect: ["[2, 3, 5, 7, 11, 13, 17, 19]"] },
      { name: "🏆 Challenge: FizzBuzz to 15", task: "Print the numbers 1 to 15, one per line, but print <code>Fizz</code> for multiples of 3, <code>Buzz</code> for multiples of 5 and <code>FizzBuzz</code> for both.", code: "for i in range(1, 16):\n    # your code here\n    pass", expect: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"] }
    ]
  };

  const SEED = `
CREATE TABLE departments (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO departments VALUES (1,'Engineering'),(2,'QA'),(3,'HR'),(4,'Sales'),(5,'Design');
CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, dept_id INTEGER REFERENCES departments(id), salary INTEGER, joined TEXT);
INSERT INTO employees VALUES
 (1,'Anjali Menon',2,360000,'2025-01-10'),(2,'Rahul Nair',1,820000,'2023-06-01'),(3,'Sneha Thomas',1,950000,'2022-03-15'),
 (4,'Arun Das',4,420000,'2024-08-20'),(5,'Fathima Rahman',1,950000,'2021-11-05'),(6,'Nikhil Joseph',2,480000,'2023-02-14'),
 (7,'Meera Pillai',3,550000,'2020-07-01'),(8,'Aswin Kumar',4,390000,'2025-03-03'),(9,'Divya S',2,410000,'2024-01-22'),(10,'Joel Mathew',1,640000,'2024-09-09');
CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT);
INSERT INTO users VALUES (1,'anjali@example.com'),(2,'rahul@example.com'),(3,'anjali@example.com'),(4,'meera@example.com'),(5,'rahul@example.com'),(6,'arun@example.com');`;

  /* ---------- helpers ---------- */
  const $ = (sel, el = root) => el.querySelector(sel);
  const $$ = (sel, el = root) => [...el.querySelectorAll(sel)];
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.crossOrigin = "anonymous";
      s.onload = resolve;
      s.onerror = () => reject(new Error("Could not load " + src));
      document.head.appendChild(s);
    });
  }
  function esc(t) {
    return String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  }
  function fillSelect(sel, list) {
    sel.innerHTML = list.map((e, i) => `<option value="${i}">${esc(e.name)}</option>`).join("");
  }
  /* ---------- challenges: task panel + automatic answer check ---------- */
  function showTask(lang, ex) {
    const box = $('[data-task="' + lang + '"]');
    if (!box) return;
    if (!ex || !ex.task) {
      box.hidden = true;
      box.innerHTML = "";
      return;
    }
    box.hidden = false;
    box.innerHTML = '<p class="pg-task-title">🏆 Challenge</p><p class="pg-task-text">' + ex.task + '</p><p class="pg-verdict" data-verdict>Write your answer, then press <strong>Run</strong> to check it.</p>';
  }
  function verdict(lang, ok, got, expect) {
    const el = $('[data-task="' + lang + '"] [data-verdict]');
    if (!el) return;
    el.className = "pg-verdict " + (ok ? "is-ok" : "is-no");
    if (ok) {
      el.innerHTML = "✓ <strong>Correct!</strong> Nice work — try the next challenge.";
    } else {
      const show = (v) => esc(Array.isArray(v) ? v.map((r) => (Array.isArray(r) ? r.join(" | ") : r)).join(" · ") : v);
      el.innerHTML = "✗ <strong>Not yet.</strong> Expected: <code>" + show(expect) + "</code>" + (got && got.length ? " — you got: <code>" + show(got) + "</code>" : " — no output yet.");
    }
  }
  const norm = (v) => String(v).trim();
  function sameLines(got, expect) {
    return got.length === expect.length && got.every((g, i) => norm(g) === norm(expect[i]));
  }

  /* Tab inserts two spaces; Ctrl/Cmd+Enter runs. */
  function enhanceEditor(ta, run) {
    ta.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const { selectionStart: a, selectionEnd: b, value } = ta;
        ta.value = value.slice(0, a) + "  " + value.slice(b);
        ta.selectionStart = ta.selectionEnd = a + 2;
      } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        run();
      }
    });
  }

  /* ---------- tabs ---------- */
  function showTab(name) {
    $$("[data-pg-tab]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.pgTab === name)));
    $$("[data-pg-panel]").forEach((p) => (p.hidden = p.dataset.pgPanel !== name));
    if (name === "web") runWeb();
  }
  $$("[data-pg-tab]").forEach((b) => b.addEventListener("click", () => showTab(b.dataset.pgTab)));
  $(".pg-tabs").addEventListener("keydown", (e) => {
    const tabs = $$("[data-pg-tab]");
    const i = tabs.indexOf(document.activeElement);
    if (i < 0 || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
    next.focus();
    showTab(next.dataset.pgTab);
  });

  /* ---------- Web (HTML/CSS/JS) ---------- */
  const web = { html: $("[data-web=html]"), css: $("[data-web=css]"), js: $("[data-web=js]"), frame: $("[data-web-frame]"), sel: $("[data-web-ex]") };
  fillSelect(web.sel, EX.web);
  function loadWeb(i) {
    const ex = EX.web[i];
    web.html.value = ex.html;
    web.css.value = ex.css;
    web.js.value = ex.js;
    runWeb();
  }
  function runWeb() {
    web.frame.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><style>${web.css.value}</style></head><body>${web.html.value}<script>${web.js.value.replace(
      /<\/script/gi,
      "<\\/script"
    )}<\/script></body></html>`;
  }
  let webTimer = 0;
  [web.html, web.css, web.js].forEach((ta) => {
    enhanceEditor(ta, runWeb);
    ta.addEventListener("input", () => {
      clearTimeout(webTimer);
      webTimer = setTimeout(runWeb, 400);
    });
  });
  $$("[data-web-file]").forEach((b) =>
    b.addEventListener("click", () => {
      $$("[data-web-file]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      [web.html, web.css, web.js].forEach((ta) => (ta.hidden = ta.dataset.web !== b.dataset.webFile));
    })
  );
  web.sel.addEventListener("change", () => loadWeb(Number(web.sel.value)));
  $("[data-web-run]").addEventListener("click", runWeb);
  $("[data-web-reset]").addEventListener("click", () => loadWeb(Number(web.sel.value)));

  /* ---------- JavaScript console (sandboxed iframe) ---------- */
  const jsEd = $("[data-js-code]");
  const jsOut = $("[data-js-out]");
  const jsSel = $("[data-js-ex]");
  fillSelect(jsSel, EX.js);
  let jsFrame = null;
  let jsToken = "";
  let jsLines = [];
  function printJs(kind, text) {
    if (kind === "log") jsLines.push(text);
    const line = document.createElement("div");
    line.className = "pg-line pg-line--" + kind;
    line.textContent = text;
    jsOut.appendChild(line);
  }
  window.addEventListener("message", (e) => {
    if (!jsFrame || e.source !== jsFrame.contentWindow || !e.data || e.data.token !== jsToken) return;
    printJs(e.data.kind, e.data.text);
  });
  function runJs() {
    jsOut.textContent = "";
    if (jsFrame) jsFrame.remove();
    jsToken = Math.random().toString(36).slice(2);
    jsFrame = document.createElement("iframe");
    jsFrame.setAttribute("sandbox", "allow-scripts");
    jsFrame.setAttribute("aria-hidden", "true");
    jsFrame.hidden = true;
    const runner = `<script>
      (function(){
        var T=${JSON.stringify(jsToken)};
        function fmt(v){ if(typeof v==="string") return v; try{ return JSON.stringify(v); }catch(e){ return String(v); } }
        function send(kind,args){ parent.postMessage({token:T,kind:kind,text:[].map.call(args,fmt).join(" ")},"*"); }
        console.log=function(){send("log",arguments)}; console.info=console.log;
        console.warn=function(){send("warn",arguments)}; console.error=function(){send("error",arguments)};
        window.onerror=function(m,s,l){send("error",[m+(l?" (line "+(l-1)+")":"")]);};
        window.addEventListener("unhandledrejection",function(e){send("error",["Unhandled promise rejection: "+(e.reason&&e.reason.message||e.reason)])});
      })();
    <\/script><script>\n${jsEd.value.replace(/<\/script/gi, "<\\/script")}\n<\/script>`;
    jsFrame.srcdoc = runner;
    document.body.appendChild(jsFrame);
    jsLines = [];
    const ex = EX.js[Number(jsSel.value)];
    setTimeout(() => {
      if (!jsOut.childNodes.length) printJs("muted", "(no output — use console.log)");
      if (ex && ex.expect) verdict("js", sameLines(jsLines, ex.expect), jsLines, ex.expect);
    }, 1200);
  }
  enhanceEditor(jsEd, runJs);
  jsSel.addEventListener("change", () => {
    const ex = EX.js[Number(jsSel.value)];
    jsEd.value = ex.code;
    jsOut.textContent = "";
    showTask("js", ex);
  });
  $("[data-js-run]").addEventListener("click", runJs);
  $("[data-js-clear]").addEventListener("click", () => (jsOut.textContent = ""));

  /* ---------- SQL (sql.js, SQLite in the browser) ---------- */
  const sqlEd = $("[data-sql-code]");
  const sqlOut = $("[data-sql-out]");
  const sqlSel = $("[data-sql-ex]");
  fillSelect(sqlSel, EX.sql);
  let sqlDb = null;
  let sqlLoading = null;
  function freshDb(SQL) {
    const db = new SQL.Database();
    db.run(SEED);
    return db;
  }
  async function getSql() {
    if (sqlDb) return sqlDb;
    if (!sqlLoading) {
      sqlOut.innerHTML = '<p class="pg-status">Loading SQLite (first run only)…</p>';
      sqlLoading = loadScript(SQL_JS).then(() => window.initSqlJs({ locateFile: (f) => SQL_WASM_DIR + f }));
    }
    const SQL = await sqlLoading;
    root._SQL = SQL;
    sqlDb = freshDb(SQL);
    return sqlDb;
  }
  async function runSql() {
    try {
      const db = await getSql();
      const results = db.exec(sqlEd.value);
      const ex = EX.sql[Number(sqlSel.value)];
      if (ex && ex.expect) {
        const last = results[results.length - 1];
        const got = last ? last.values.map((r) => r.map((v) => (v === null ? "NULL" : String(v)))) : [];
        const ok = got.length === ex.expect.length && got.every((r, i) => r.length === ex.expect[i].length && r.every((v, j) => norm(v) === norm(ex.expect[i][j])));
        verdict("sql", ok, got.slice(0, 6), ex.expect);
      }
      if (!results.length) {
        sqlOut.innerHTML = '<p class="pg-status">Query ran. No rows returned.</p>';
        return;
      }
      sqlOut.innerHTML = results
        .map(
          (r) =>
            `<div class="pg-table-wrap"><table class="pg-table"><thead><tr>${r.columns.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${r.values
              .map((row) => `<tr>${row.map((v) => `<td>${v === null ? '<em>NULL</em>' : esc(v)}</td>`).join("")}</tr>`)
              .join("")}</tbody></table><p class="pg-status">${r.values.length} row${r.values.length === 1 ? "" : "s"}</p></div>`
        )
        .join("");
    } catch (err) {
      sqlOut.innerHTML = `<p class="pg-line pg-line--error">${esc(err.message || err)}</p>`;
      const ex = EX.sql[Number(sqlSel.value)];
      if (ex && ex.expect) verdict("sql", false, ["Error: " + (err.message || err)], ex.expect);
    }
  }
  enhanceEditor(sqlEd, runSql);
  sqlSel.addEventListener("change", () => {
    sqlEd.value = EX.sql[Number(sqlSel.value)].code;
    showTask("sql", EX.sql[Number(sqlSel.value)]);
    sqlOut.innerHTML = '<p class="pg-status">Press Run to see the result.</p>';
  });
  $("[data-sql-run]").addEventListener("click", runSql);
  $("[data-sql-reset]").addEventListener("click", async () => {
    if (root._SQL) sqlDb = freshDb(root._SQL);
    sqlOut.innerHTML = '<p class="pg-status">Sample database reset.</p>';
  });

  /* ---------- Python (Pyodide) ---------- */
  const pyEd = $("[data-py-code]");
  const pyOut = $("[data-py-out]");
  const pySel = $("[data-py-ex]");
  fillSelect(pySel, EX.py);
  let pyLoading = null;
  let pyLines = [];
  function printPy(kind, text) {
    if (kind === "log") pyLines.push(...String(text).split("\n"));
    const line = document.createElement("div");
    line.className = "pg-line pg-line--" + kind;
    line.textContent = text;
    pyOut.appendChild(line);
  }
  async function getPy() {
    if (!pyLoading) {
      pyOut.textContent = "";
      printPy("muted", "Loading Python in your browser (about 10 MB, first run only)…");
      pyLoading = loadScript(PYODIDE_JS).then(() => window.loadPyodide({ indexURL: PYODIDE_DIR }));
    }
    return pyLoading;
  }
  async function runPy() {
    const btn = $("[data-py-run]");
    btn.disabled = true;
    try {
      const py = await getPy();
      pyOut.textContent = "";
      pyLines = [];
      py.setStdout({ batched: (t) => printPy("log", t) });
      py.setStderr({ batched: (t) => printPy("error", t) });
      await py.runPythonAsync(pyEd.value);
      if (!pyOut.childNodes.length) printPy("muted", "(no output — use print())");
      const ex = EX.py[Number(pySel.value)];
      if (ex && ex.expect) verdict("py", sameLines(pyLines.filter((l) => l.trim() !== ""), ex.expect), pyLines, ex.expect);
    } catch (err) {
      printPy("error", String(err.message || err).trim().split("\n").slice(-3).join("\n"));
      const ex = EX.py[Number(pySel.value)];
      if (ex && ex.expect) verdict("py", false, pyLines, ex.expect);
    } finally {
      btn.disabled = false;
    }
  }
  enhanceEditor(pyEd, runPy);
  pySel.addEventListener("change", () => {
    pyEd.value = EX.py[Number(pySel.value)].code;
    showTask("py", EX.py[Number(pySel.value)]);
    pyOut.textContent = "";
  });
  $("[data-py-run]").addEventListener("click", runPy);
  $("[data-py-clear]").addEventListener("click", () => (pyOut.textContent = ""));

  /* ---------- init ---------- */
  web.html.hidden = false;
  web.css.hidden = true;
  web.js.hidden = true;
  loadWeb(0);
  jsEd.value = EX.js[0].code;
  sqlEd.value = EX.sql[0].code;
  pyEd.value = EX.py[0].code;
  const startTab = root.dataset.pgDefault;
  showTab(["web", "js", "sql", "py"].includes(startTab) ? startTab : "web");
})();
