/* Build the /learning/ section: hub, track overviews and lesson pages.
   Run: node scripts/learning/build.mjs   (npm run build:learning) */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pageShell, crumbs, crumbsLd, SITE } from "../interview-journey/shell.mjs";
import { esc } from "../interview-journey/helpers.mjs";
import { PATHS, CATEGORIES } from "../interview-journey/learning-paths.mjs";
import { ICON as PATH_ICON } from "../interview-journey/hub-learning.mjs";
import { TRACKS as WEB_TRACKS } from "./tracks-web.mjs";
import { WEB_EXTRAS } from "./extras-web.mjs";
import { PY_TRACK } from "./track-python.mjs";
import { SQL_TRACK } from "./track-sql.mjs";
import { GIT_TRACK } from "./track-git.mjs";
import { REACT_TRACK } from "./track-react.mjs";
import { JAVA_TRACK } from "./track-java.mjs";
import { EXCEL_TRACK } from "./track-excel.mjs";
import { DSA_TRACK } from "./track-dsa.mjs";
import { APT_TRACK } from "./track-aptitude.mjs";

/* Web lessons get their practice / interview / further-reading extras merged in. */
for (const t of WEB_TRACKS) for (const l of t.lessons) Object.assign(l, WEB_EXTRAS[`${t.key}/${l.slug}`] || {});
const TRACKS = [...WEB_TRACKS, REACT_TRACK, PY_TRACK, SQL_TRACK, GIT_TRACK, JAVA_TRACK, DSA_TRACK, EXCEL_TRACK, APT_TRACK];
const OWNER = "Original lesson written by the InfoparkDaily team · © 2026 InfoparkDaily · Free to learn — no paid course or subscription.";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const V = "20261109lq";
const CSS = [`/css/learning.css?v=${V}`];
const JS = [`/js/learning.js?v=${V}`];

/* Tracks that are planned but not written yet — shown honestly as "coming soon". */
const PLANNED = [
  ["Node.js & Express", "Build REST APIs and backend services with JavaScript.", "#3c873a"],
  ["TypeScript", "Types for safer, larger JavaScript and React apps.", "#3178c6"],
  ["Spring Boot", "Java web services, REST APIs and JPA.", "#6db33f"],
  ["Docker & Linux basics", "Containers, shell commands and deployment basics.", "#2496ed"],
  ["Power BI", "Dashboards and reports for analyst roles.", "#c79a00"],
  ["Communication for interviews", "Introductions, HR answers and workplace email.", "#be185d"]
];

const write = (rel, html) => {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
};

const base = [["InfoparkDaily", "/"], ["Learning", "/learning/"]];
const MONO = { html: "&lt;/&gt;", css: "{ }", javascript: "JS", python: "Py", sql: "SQL", git: "Git", react: "Re", java: "Jv", excel: "XL", dsa: "DSA", aptitude: "Apt" };
const trackUrl = (t) => `/learning/${t.key}/`;
const lessonUrl = (t, l) => `/learning/${t.key}/${l.slug}/`;

const trackBar = (current) => `
      <nav class="ln-trackbar" aria-label="Tutorials">
        <div class="ij-wrap ln-trackbar-track">
          <a href="/learning/"${current ? "" : ' aria-current="page"'}>All learning</a>
          ${TRACKS.map((t) => `<a href="${trackUrl(t)}" style="--ln-c:${t.color}"${current === t.key ? ' aria-current="page"' : ""}>${t.name}</a>`).join("")}
          <a href="/interview/learning/live-code/">Live code</a>
          <a href="/interview/learning/">Career paths</a>
        </div>
      </nav>`;

/* ---------------- hub ---------------- */
function hubPage() {
  const lessonsTotal = TRACKS.reduce((n, t) => n + t.lessons.length, 0);
  const byKey = Object.fromEntries(TRACKS.map((t) => [t.key, t]));
  const runner = (t) => t.feature || (t.lang === "shell" ? "Terminal walkthroughs" : t.lang === "python" ? "Runs Python in browser" : t.lang === "sql" ? "Live SQL database" : "Live Try-it editor");

  /* Category of each track — drives the filter chips on the hub. */
  const GROUPS = [
    ["web", "Web development", ["html", "css", "javascript", "react"]],
    ["code", "Programming", ["python", "java", "dsa", "git"]],
    ["data", "Data & office", ["sql", "excel"]],
    ["prep", "Placement prep", ["aptitude", "dsa"]]
  ];
  const groupsOf = (key) => GROUPS.filter(([, , keys]) => keys.includes(key)).map(([g]) => g).join(" ");

  /* Goal-based starting points. Each step links to a real track. */
  const GOALS = [
    ["Frontend developer", "Build websites and web apps.", ["html", "css", "javascript", "react", "git"], "#e44d26"],
    ["Data analyst", "Turn spreadsheets and databases into answers.", ["excel", "sql", "python"], "#00758f"],
    ["Placement & coding rounds", "Clear aptitude tests and technical interviews.", ["aptitude", "dsa", "java"], "#7c3aed"]
  ];
  const goalCards = GOALS.map(([title, desc, keys, color]) => {
    const steps = keys.filter((k) => byKey[k]);
    const count = steps.reduce((n, k) => n + byKey[k].lessons.length, 0);
    const first = byKey[steps[0]];
    return `
            <article class="ln-goal" style="--ln-c:${color}">
              <p class="ln-goal-kicker">${count} lessons · ${steps.length} tutorials</p>
              <h3>${title}</h3>
              <p>${desc}</p>
              <ol class="ln-goal-steps">${steps.map((k) => `<li><a href="${trackUrl(byKey[k])}" style="--ln-c:${byKey[k].color}"><span class="ln-mono ln-mono--xs" aria-hidden="true">${MONO[k]}</span>${byKey[k].name}</a></li>`).join("")}</ol>
              <a class="ln-goal-cta" href="${lessonUrl(first, first.lessons[0])}">Start with ${first.name} →</a>
            </article>`;
  }).join("");

  const trackCards = TRACKS.map(
    (t) => `
            <article class="ln-card" style="--ln-c:${t.color}" data-ln-track="${t.key}" data-groups="${groupsOf(t.key)}" data-search="${esc([t.name, t.long, t.tagline, ...t.lessons.map((l) => l.title)].join(" ").toLowerCase())}">
              <span class="ln-mono" aria-hidden="true">${MONO[t.key] || t.name}</span>
              <h3><a href="${trackUrl(t)}">${t.name}</a></h3>
              <p>${t.tagline}</p>
              <p class="ln-card-meta">${t.lessons.length} lessons · ${runner(t)}</p>
              <div class="ln-progress" aria-hidden="true"><span data-ln-bar="${t.key}"></span></div>
              <div class="ln-card-foot">
                <span class="ln-progress-label" data-ln-label="${t.key}" data-total="${t.lessons.length}">Not started</span>
                <a class="ln-card-go" href="${lessonUrl(t, t.lessons[0])}" data-ln-continue="${t.key}">Start →</a>
              </div>
            </article>`
  ).join("");

  const POPULAR = [
    ["CSS Flexbox", "/learning/css/flexbox/"],
    ["React state", "/learning/react/state/"],
    ["SQL JOINs", "/learning/sql/joins/"],
    ["Excel XLOOKUP", "/learning/excel/lookups/"],
    ["Binary search", "/learning/dsa/binary-search/"],
    ["Percentages", "/learning/aptitude/percentages/"]
  ];

  /* Curriculum: one tab per track; without JavaScript every panel is shown. */
  const tabs = TRACKS.map((t, i) => `<button type="button" role="tab" id="tab-${t.key}" aria-controls="panel-${t.key}" aria-selected="${i === 0}" style="--ln-c:${t.color}" data-ln-tab="${t.key}"><span class="ln-mono ln-mono--xs" aria-hidden="true">${MONO[t.key]}</span>${t.name}</button>`).join("");
  const panels = TRACKS.map(
    (t, i) => `
            <div class="ln-panel" role="tabpanel" id="panel-${t.key}" aria-labelledby="tab-${t.key}" data-ln-panel="${t.key}" style="--ln-c:${t.color}"${i === 0 ? "" : " data-ln-hidden"}>
              <div class="ln-panel-head"><div><h3>${t.long}</h3><p>${t.lessons.length} lessons · ${t.level} · ${runner(t)}</p></div><a class="ln-btn" href="${trackUrl(t)}">Open ${t.name} tutorial →</a></div>
              <ol class="ln-panel-list">${t.lessons.map((l, n) => `<li data-search="${esc((t.name + " " + l.title + " " + l.summary).toLowerCase())}"><a href="${lessonUrl(t, l)}" data-ln-lesson="${t.key}/${l.slug}"><span class="ln-num">${String(n + 1).padStart(2, "0")}</span><span><strong>${l.title}</strong><small>${esc(l.summary)}</small></span></a></li>`).join("")}</ol>
            </div>`
  ).join("");

  const planned = PLANNED.map(
    ([name, desc, color]) => `
            <div class="ln-planned" style="--ln-c:${color}" data-search="${esc((name + " " + desc).toLowerCase())}">
              <em>Coming soon</em><strong>${name}</strong><span>${desc}</span>
            </div>`
  ).join("");

  /* Career paths: one card per path (icon, summary, level, length), grouped IT / non-IT with tabs. */
  const CAT_TONE = { software: "#2f5bd3", data: "#7c3aed", cloud: "#0e7490", testing: "#15803d", design: "#db2777", business: "#b45309", marketing: "#ea580c", office: "#4f46e5", engineering: "#475569", hospitality: "#be123c", health: "#dc2626", logistics: "#0f766e", soft: "#a16207" };
  const CAT_NAME = Object.fromEntries(CATEGORIES.map(([k, n]) => [k, n]));
  const pathCard = (p) => `
              <li class="lp-item" data-field="${p.field}" data-search="${esc((p.title + " " + (p.summary || "") + " " + (p.tools || []).join(" ")).toLowerCase())}">
                <a class="lp-card" href="/interview/learning/${p.slug}/" style="--lp-c:${CAT_TONE[p.cat] || "#171c24"}">
                  <span class="lp-top"><span class="lp-ico"><svg viewBox="0 0 24 24" aria-hidden="true">${PATH_ICON[p.icon] || PATH_ICON.code}</svg></span><span class="lp-cat">${esc(CAT_NAME[p.cat] || "")}</span></span>
                  <strong class="lp-title">${esc(p.title)}</strong>
                  <span class="lp-sum">${esc(p.summary || "")}</span>
                  <span class="lp-meta"><span>${esc(p.level || "")}</span><span>${esc(p.duration || "")}</span><span>${p.modules.length} modules</span></span>
                  <span class="lp-go">Open roadmap <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5"/></svg></span>
                </a>
              </li>`;
  const itCount = PATHS.filter((p) => p.field === "it").length;
  const nonCount = PATHS.length - itCount;
  const careerGroup = (field, title, note) => `
            <div class="lp-group" data-lp-group="${field}">
              <div class="lp-group-head"><h3>${title}</h3><span>${PATHS.filter((p) => p.field === field).length} paths</span><p>${note}</p></div>
              <ul class="lp-grid">${PATHS.filter((p) => p.field === field).map(pathCard).join("")}</ul>
            </div>`;
  const careerPaths = `
          <div class="lp-tabs" role="group" aria-label="Show career paths">
            <button type="button" data-lp-tab="all" aria-pressed="true">All <span>${PATHS.length}</span></button>
            <button type="button" data-lp-tab="it" aria-pressed="false"><b class="lp-long">Technical / </b>IT <span>${itCount}</span></button>
            <button type="button" data-lp-tab="nonit" aria-pressed="false">Non-IT<b class="lp-long">&nbsp;careers</b> <span>${nonCount}</span></button>
          </div>
          <div class="lp-wrap" data-lp-wrap>${careerGroup("it", "Technical / IT", "Software, data, cloud, testing and design roles.")}${careerGroup("nonit", "Non-IT careers", "Business, marketing, office, engineering, healthcare and more.")}
          </div>`;

  const main = `
      <section class="lh-hero ln-hero" aria-labelledby="ln-title">
        <div class="ax-glow" aria-hidden="true"></div>
        <div class="ij-wrap">
          ${crumbs(base)}
          <div class="lh-hero-copy">
            <p class="ax-pill"><span>Free</span> ${TRACKS.length} tutorials · ${lessonsTotal} lessons · ${PATHS.length} career paths</p>
            <h1 id="ln-title">Learn to code. <span>Build job-ready skills.</span></h1>
            <p class="ax-lede">Short lessons with live code editors, quizzes and interview questions — web development, Python, Java, SQL, Excel, DSA and aptitude. Written by the InfoparkDaily team and free forever.</p>
            <label class="lh-search">
              <span class="ij-sr">Search learning</span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 3a7 7 0 0 1 5.6 11.2l5.1 5.1-1.4 1.4-5.1-5.1A7 7 0 1 1 10 3Zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"/></svg>
              <input type="search" placeholder="Search ${lessonsTotal} lessons: flexbox, joins, XLOOKUP, recursion…" data-ln-search autocomplete="off" />
            </label>
            <nav class="ln-popular" aria-label="Popular topics"><span>Popular:</span>${POPULAR.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}</nav>
            <a class="ln-resume" href="#" data-ln-resume hidden><span class="ln-resume-label">Continue where you left off</span><strong data-ln-resume-title></strong><span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>
${trackBar("")}
      <section class="ez-section ln-search-hide" aria-labelledby="ln-goals">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">Where to start</p><h2 id="ln-goals">Pick a goal, follow the order</h2><p>Not sure what to learn first? Each goal lists the tutorials in the order we recommend.</p></div>
          <div class="ln-goals">${goalCards}
          </div>
        </div>
      </section>
      <section class="ez-section ez-section--soft" aria-labelledby="ln-tutorials">
        <div class="ij-wrap">
          <div class="ln-head-row">
            <div class="ez-head"><p class="ax-eyebrow">All tutorials</p><h2 id="ln-tutorials">${TRACKS.length} tutorials, ${lessonsTotal} lessons</h2></div>
            <div class="ln-filters" role="group" aria-label="Filter tutorials">
              <button type="button" aria-pressed="true" data-ln-filter="all">All</button>${GROUPS.map(([g, label]) => `<button type="button" aria-pressed="false" data-ln-filter="${g}">${label}</button>`).join("")}
            </div>
          </div>
          <div class="ln-cards">${trackCards}
          </div>
          <p class="ln-empty" data-ln-empty hidden>No matches. Try another word, or browse the career paths below.</p>
        </div>
      </section>
      <section class="ez-section" aria-labelledby="ln-all">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">Curriculum</p><h2 id="ln-all">Browse every lesson</h2></div>
          <div class="ln-curriculum" data-ln-curriculum>
            <div class="ln-tabs" role="tablist" aria-label="Tutorials">${tabs}</div>
            <div class="ln-panels">${panels}
            </div>
          </div>
        </div>
      </section>
      <section class="ez-section ez-section--soft ln-search-hide" aria-labelledby="ln-practice">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">How it works</p><h2 id="ln-practice">Read. Try. Check. Get interview-ready.</h2></div>
          <ol class="ln-how">
            <li><span>1</span><strong>Read a short lesson</strong><p>One idea per page, with plain examples.</p></li>
            <li><span>2</span><strong>Try it yourself</strong><p>Edit the code and press Run — results appear instantly.</p></li>
            <li><span>3</span><strong>Check with a quiz</strong><p>A quick question plus a practice task.</p></li>
            <li><span>4</span><strong>Prepare for interviews</strong><p>Real questions with model answers in every lesson.</p></li>
          </ol>
          <div class="ln-practice">
            <a href="/interview/learning/live-code/"><span class="ln-pr-icon" aria-hidden="true">▶</span><strong>Live code playground</strong><span>Coding challenges that check your answer automatically.</span></a>
            <a href="/interview/questions/?field=it"><span class="ln-pr-icon" aria-hidden="true">?</span><strong>Interview questions</strong><span>Technical and HR questions with model answers.</span></a>
            <a href="/portfolio/templates/"><span class="ln-pr-icon" aria-hidden="true">★</span><strong>Show your work</strong><span>Turn your projects into a portfolio website.</span></a>
          </div>
        </div>
      </section>
      <section class="ez-section" aria-labelledby="ln-paths">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">Career paths</p><h2 id="ln-paths">Step-by-step roadmaps for ${PATHS.length} careers</h2><p>Each path has modules, free resources, certifications and projects.</p></div>
          ${careerPaths}
        </div>
      </section>
      <section class="ez-section ez-section--soft" aria-labelledby="ln-next">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">On the roadmap</p><h2 id="ln-next">More tutorials are on the way</h2></div>
          <div class="ln-planned-grid">${planned}
          </div>
        </div>
      </section>
      <p class="ij-wrap ln-hub-owner">All lessons, examples, quizzes and interview answers on this page are original InfoparkDaily content, free to learn — no paid courses or subscriptions.</p>`;

  return pageShell({
    title: "Learning – Free Tutorials: HTML, CSS, JavaScript, React, Python, Java, SQL, Excel, DSA | InfoparkDaily",
    description: `Free, original tutorials with live code editors, quizzes and interview questions: ${lessonsTotal} lessons across ${TRACKS.length} tracks — web development, Python, Java, SQL, Excel, DSA and aptitude — plus ${PATHS.length} career learning paths.`,
    path: "/learning/",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", name: "InfoparkDaily Learning", url: `${SITE}/learning/` },
        crumbsLd(base)
      ]
    },
    bodyClass: "ln-page ln-hub",
    main,
    scripts: JS,
    extraCss: CSS
  });
}

/* ---------------- track overview ---------------- */
function trackPage(t) {
  const items = [...base, [t.name, trackUrl(t)]];
  const main = `
      <section class="lh-hero lh-hero--short ln-hero" aria-labelledby="ln-title" style="--ln-c:${t.color}">
        <div class="ax-glow" aria-hidden="true"></div>
        <div class="ij-wrap">
          ${crumbs(items)}
          <div class="lh-hero-copy">
            <p class="ax-pill"><span>${t.level}</span> ${t.lessons.length} lessons · free</p>
            <h1 id="ln-title">${t.name} tutorial <span>${t.tagline}</span></h1>
            <p class="ax-lede">${t.long}. ${t.heroLine || (t.lang === "shell" ? "Every lesson has a terminal walkthrough" : "Every lesson has a runnable example you can edit")}, key points, a practice task, a quiz and interview questions.</p>
            <div class="ln-hero-actions">
              <a class="ln-btn" href="${lessonUrl(t, t.lessons[0])}" data-ln-continue="${t.key}">Start learning ${t.name}</a>
              <span class="ln-progress-label" data-ln-label="${t.key}" data-total="${t.lessons.length}">Not started</span>
            </div>
          </div>
        </div>
      </section>
${trackBar(t.key)}
      <section class="ez-section" aria-labelledby="ln-lessons">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">Lessons</p><h2 id="ln-lessons">What you'll learn</h2></div>
          <ol class="ln-syllabus" style="--ln-c:${t.color}">
            ${t.lessons
              .map(
                (l, i) => `<li><a href="${lessonUrl(t, l)}" data-ln-lesson="${t.key}/${l.slug}"><span class="ln-num">${String(i + 1).padStart(2, "0")}</span><span><strong>${l.title}</strong><small>${esc(l.summary)}</small></span><span class="ln-tick" aria-hidden="true">✓</span></a></li>`
              )
              .join("\n            ")}
          </ol>
        </div>
      </section>`;
  return pageShell({
    title: `${t.name} Tutorial – Free Lessons with Examples | InfoparkDaily Learning`,
    description: `Learn ${t.name} free: ${t.lessons.length} short lessons with live examples you can edit, key points and quizzes. ${t.tagline}`,
    path: trackUrl(t),
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Course",
          name: `${t.name} tutorial`,
          description: t.tagline,
          provider: { "@type": "Organization", name: "InfoparkDaily", sameAs: SITE },
          url: `${SITE}${trackUrl(t)}`,
          isAccessibleForFree: true
        },
        crumbsLd(items)
      ]
    },
    bodyClass: "ln-page",
    main,
    scripts: JS,
    extraCss: CSS
  });
}

/* ---------------- try-it block per language ---------------- */
function tryBlock(t, l) {
  const lang = t.lang || "web";
  if (lang === "none") return "";
  if (lang === "static") {
    return `          <section class="ln-try ln-try--shell" aria-labelledby="try-${l.slug}">
            <div class="ln-try-head"><h2 id="try-${l.slug}">${t.exampleTitle || "Example"}</h2><span class="ln-try-badge">${t.exampleBadge || ""}</span></div>
            <pre class="ln-terminal"><code>${esc(l.example)}</code></pre>
            ${l.output ? `<p class="ln-output-label">${t.outputTitle || "Output"}</p>
            <pre class="ln-terminal ln-terminal--out"><code>${esc(l.output)}</code></pre>` : ""}
            ${t.exampleNote ? `<p class="ln-try-note">${t.exampleNote}</p>` : ""}
          </section>`;
  }
  if (lang === "shell") {
    return `          <section class="ln-try ln-try--shell" aria-labelledby="try-${l.slug}">
            <div class="ln-try-head"><h2 id="try-${l.slug}">Example in the terminal</h2><span class="ln-try-badge">Run these on your own computer</span></div>
            <pre class="ln-terminal"><code>${esc(l.example)}</code></pre>
            <p class="ln-try-note">Lines starting with <code>$</code> are commands you type; the rest is what Git prints. Names and URLs are examples.</p>
          </section>`;
  }
  const label = { web: "Result of the example code", python: "Python output", sql: "Query results" }[lang];
  const output =
    lang === "web"
      ? `<iframe title="${label}" sandbox="allow-scripts allow-modals" data-frame></iframe>
                <pre class="ln-console" data-console aria-live="polite" hidden></pre>`
      : `<div class="ln-result ln-result--${lang}" data-result-box aria-live="polite" aria-label="${label}"><p class="ln-result-hint">Press Run to see the ${lang === "sql" ? "results" : "output"}.</p></div>`;
  const note = {
    web: "Edit the code and press Run (or Ctrl/⌘ + Enter). Code runs only in your browser, in a sandbox.",
    python: "Edit and press Run (or Ctrl/⌘ + Enter). Python runs in your browser — the first run downloads the Python engine and takes a few seconds.",
    sql: "Runs on a small fictional sample database (companies, jobs) that is rebuilt on every run, so you can't break anything."
  }[lang];
  return `          <section class="ln-try" aria-labelledby="try-${l.slug}" data-tryit data-lang="${lang}">
            <div class="ln-try-head">
              <h2 id="try-${l.slug}">Try it yourself</h2>
              <div class="ln-try-actions">
                <button type="button" class="ln-btn" data-run>▶ Run</button>
                <button type="button" class="ln-btn ln-btn--ghost" data-reset>Reset</button>
              </div>
            </div>
            <div class="ln-try-grid">
              <label class="ln-editor"><span class="ij-sr">Code editor</span><textarea spellcheck="false" autocapitalize="off" autocomplete="off" data-code>${esc(l.example)}</textarea></label>
              <div class="ln-output">
                ${output}
              </div>
            </div>
            ${lang === "sql" ? `<template data-seed>${esc(t.seed)}</template>` : ""}
            <p class="ln-try-note">${note}</p>
          </section>`;
}

/* ---------------- lesson ---------------- */
function lessonPage(t, l, i) {
  const prev = t.lessons[i - 1];
  const next = t.lessons[i + 1];
  const items = [...base, [t.name, trackUrl(t)], [l.title, lessonUrl(t, l)]];
  const pager = (where) => `
            <nav class="ln-pager ln-pager--${where}" aria-label="Lesson navigation">
              ${prev ? `<a href="${lessonUrl(t, prev)}" rel="prev">← ${prev.title}</a>` : `<a href="${trackUrl(t)}">← ${t.name} home</a>`}
              ${next ? `<a href="${lessonUrl(t, next)}" rel="next">${next.title} →</a>` : `<a href="/learning/">All learning →</a>`}
            </nav>`;
  const quizId = `q-${t.key}-${l.slug}`;
  const main = `
${trackBar(t.key)}
      <div class="ij-wrap ln-layout" style="--ln-c:${t.color}">
        <aside class="ln-side">
          <details class="ln-side-box" open>
            <summary>${t.name} tutorial <small data-ln-label="${t.key}" data-total="${t.lessons.length}"></small></summary>
            <ol>
              ${t.lessons.map((x) => `<li><a href="${lessonUrl(t, x)}" data-ln-lesson="${t.key}/${x.slug}"${x === l ? ' aria-current="page"' : ""}>${x.title}</a></li>`).join("\n              ")}
            </ol>
          </details>
        </aside>
        <article class="ln-article" data-ln-current="${t.key}/${l.slug}">
          ${crumbs(items)}
          <p class="ax-eyebrow">${t.name} · Lesson ${i + 1} of ${t.lessons.length}</p>
          <h1>${l.title}</h1>
          <p class="ln-summary">${esc(l.summary)}</p>
${pager("top")}
          <div class="ln-body">
${l.body}
          </div>
${tryBlock(t, l)}
          <section class="ln-points" aria-labelledby="pts-${l.slug}">
            <h2 id="pts-${l.slug}">Key points</h2>
            <ul>${l.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          </section>
          <section class="ln-quiz" aria-labelledby="${quizId}" data-quiz data-answer="${l.quiz.answer}">
            <h2 id="${quizId}">Quick check</h2>
            <p>${esc(l.quiz.q)}</p>
            <div class="ln-quiz-options">
              ${l.quiz.options.map((o, k) => `<label><input type="radio" name="${quizId}" value="${k}"> <span>${esc(o)}</span></label>`).join("\n              ")}
            </div>
            <button type="button" class="ln-btn" data-check>Check answer</button>
            <p class="ln-quiz-result" data-result role="status" hidden></p>
            <p class="ln-quiz-why" data-why hidden>${esc(l.quiz.why)}</p>
          </section>
${l.practice ? `          <section class="ln-practice-task" aria-labelledby="prac-${l.slug}">
            <h2 id="prac-${l.slug}">Practice task</h2>
            <p>${esc(l.practice)}</p>
            ${l.practiceAnswer ? `<details class="ln-answer"><summary>Show answer</summary><p>${esc(l.practiceAnswer)}</p></details>` : ""}
          </section>` : ""}
${(l.interview || []).length ? `          <section class="ln-interview" aria-labelledby="iv-${l.slug}">
            <h2 id="iv-${l.slug}">Interview corner</h2>
            ${l.interview.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("\n            ")}
          </section>` : ""}
          <div class="ln-complete">
            <button type="button" class="ln-btn ln-btn--ghost" data-ln-complete aria-pressed="false">Mark lesson complete</button>
          </div>
${(l.further || []).length ? `          <section class="ln-further" aria-labelledby="fr-${l.slug}">
            <h2 id="fr-${l.slug}">Further reading</h2>
            <ul>${l.further.map(([label, url]) => `<li><a href="${url}" target="_blank" rel="noopener">${esc(label)} ↗</a></li>`).join("")}</ul>
            <p class="ln-note">Official documentation, linked for deeper study. These are outside sites; this lesson's text is our own.</p>
          </section>` : ""}
${pager("bottom")}
          <p class="ln-owner">${OWNER}</p>
        </article>
      </div>`;
  return pageShell({
    title: `${t.name} ${l.title.replace(new RegExp(`^${t.name}\\s+`, "i"), "")} – Tutorial with Examples | InfoparkDaily Learning`,
    description: `${l.summary} Free ${t.name} lesson with a live example you can edit and a quick quiz.`,
    path: lessonUrl(t, l),
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LearningResource",
          name: `${t.name}: ${l.title}`,
          description: l.summary,
          learningResourceType: "Tutorial",
          isAccessibleForFree: true,
          inLanguage: "en",
          url: `${SITE}${lessonUrl(t, l)}`,
          isPartOf: { "@type": "Course", name: `${t.name} tutorial`, url: `${SITE}${trackUrl(t)}` }
        },
        crumbsLd(items)
      ]
    },
    bodyClass: "ln-page ln-lesson",
    main,
    scripts: JS,
    extraCss: CSS
  });
}

/* ---------------- write ---------------- */
const urls = ["/learning/"];
write("learning/index.html", hubPage());
for (const t of TRACKS) {
  write(`learning/${t.key}/index.html`, trackPage(t));
  urls.push(trackUrl(t));
  t.lessons.forEach((l, i) => {
    write(`learning/${t.key}/${l.slug}/index.html`, lessonPage(t, l, i));
    urls.push(lessonUrl(t, l));
  });
}

const smapFile = join(ROOT, "sitemap.xml");
let smap = readFileSync(smapFile, "utf8");
let added = 0;
for (const u of urls) {
  if (!smap.includes(`<loc>${SITE}${u}</loc>`)) {
    smap = smap.replace("</urlset>", `  <url><loc>${SITE}${u}</loc></url>\n</urlset>`);
    added++;
  }
}
writeFileSync(smapFile, smap);
console.log(`Built learning hub, ${TRACKS.length} tracks and ${urls.length - 1 - TRACKS.length} lessons (${added} new sitemap URLs).`);
