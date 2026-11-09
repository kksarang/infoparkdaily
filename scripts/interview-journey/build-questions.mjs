/**
 * Builds /interview/questions/index.html — the interview question bank.
 * Called from build.mjs (npm run build:journey).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { esc } from "./helpers.mjs";
import { header, footer, hubNav, hubRelated, ASSET_V } from "./shell.mjs";
import { GENERAL } from "./questions-general.mjs";
import { TECH } from "./questions-tech.mjs";
import { NONIT } from "./questions-nonit.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const OUT = path.join(root, "interview/questions/index.html");
const OLD = path.join(root, "interview-journey/questions/index.html");
const VERSION = ASSET_V;
const SITE = "https://infoparkdaily.online";
const PAGE = `${SITE}/interview/questions/`;

const LEVEL = { f: ["fresher", "Fresher"], e: ["experienced", "Experienced"], b: ["both", "Fresher & experienced"] };
const GROUP_ORDER = [
  "HR & behavioural",
  "Core CS",
  "Programming",
  "Web & mobile",
  "Data & cloud",
  "Testing",
  "Business & finance",
  "Office & support",
  "Marketing & creative",
  "Core engineering",
  "Healthcare & education",
  "Hospitality, retail & logistics"
];
const IT_GROUPS = new Set(["Core CS", "Programming", "Web & mobile", "Data & cloud", "Testing"]);
const fieldOf = (g) => (g === "HR & behavioural" ? "common" : IT_GROUPS.has(g) ? "it" : "nonit");

export function buildQuestions() {
  const hr = GENERAL.filter((s) => s.group === "HR & behavioural");
  const nonIt = [...GENERAL.filter((s) => s.group !== "HR & behavioural"), ...NONIT];
  const subjects = [...hr, ...TECH, ...nonIt].sort(
    (a, b) => GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group)
  );
  const ids = new Set();
  subjects.forEach((s) => {
    if (ids.has(s.id)) throw new Error(`Duplicate subject id ${s.id}`);
    ids.add(s.id);
    s.qs.forEach((q) => {
      if (!LEVEL[q[0]]) throw new Error(`Bad level in ${s.id}: ${q[1]}`);
    });
  });

  const total = subjects.reduce((n, s) => n + s.qs.length, 0);
  const count = (lv) => subjects.reduce((n, s) => n + s.qs.filter((q) => q[0] === lv || q[0] === "b").length, 0);
  const groups = GROUP_ORDER.filter((g) => subjects.some((s) => s.group === g));
  const plain = (h) => String(h).replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, " ");

  const subjectHtml = (s) => `
<section class="iq-subject ij-reveal" id="q-${s.id}" data-group="${esc(s.group)}" data-field="${fieldOf(s.group)}" aria-labelledby="q-${s.id}-title">
  <header class="iq-subject-head">
    <div>
      <p class="iq-subject-meta"><span class="iq-round iq-round--${s.round.toLowerCase().replace(/[^a-z]+/g, "-")}">${s.round === "Role-based" ? "Role-based" : s.round + " round"}</span> ${s.group}</p>
      <h2 id="q-${s.id}-title">${s.name}</h2>
      <p>${s.intro}</p>
    </div>
    <span class="iq-count"><b data-subject-count="${s.id}">${s.qs.length}</b> questions</span>
  </header>
  <div class="iq-list">
    ${s.qs
      .map(([lv, q, a], i) => {
        const key = `${s.id}-${i + 1}`;
        return `<details class="iq-item" data-level="${LEVEL[lv][0]}" data-q="${key}" data-text="${esc(plain(s.name + " " + q + " " + a).toLowerCase())}">
      <summary><span class="iq-num">${i + 1}</span><span class="iq-q">${q}</span><span class="iq-level iq-level--${LEVEL[lv][0]}">${LEVEL[lv][1]}</span></summary>
      <div class="iq-answer">
        <p class="ij-qa-label">Sample answer</p>
        <p>${a}</p>
        <div class="iq-actions">
          <button type="button" class="iq-practised" data-practised="${key}" aria-pressed="false">Mark as practised</button>
          <button type="button" class="iq-copy" data-copy-q="${key}">Copy Q&amp;A</button>
        </div>
      </div>
    </details>`;
      })
      .join("")}
  </div>
</section>`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Interview questions and answers — HR, managerial and technical rounds",
        url: PAGE,
        description: `${total} interview questions with sample answers across ${subjects.length} subjects, for freshers and experienced candidates.`,
        inLanguage: "en-IN",
        isPartOf: { "@type": "WebSite", name: "InfoparkDaily", url: SITE },
        about: subjects.map((s) => s.name)
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "InfoparkDaily", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Interview hub", item: `${SITE}/interview/` },
          { "@type": "ListItem", position: 3, name: "Interview questions", item: PAGE }
        ]
      }
    ]
  };

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${total}+ Interview Questions &amp; Answers – HR &amp; Technical Rounds | InfoparkDaily</title>
    <meta
      name="description"
      content="Free interview question bank: ${total} questions with sample answers across ${subjects.length} subjects — HR, Java, Python, SQL, testing, data, DevOps, plus non-IT careers: banking, accounts, nursing, teaching, mechanical, civil, electrical, hospitality, retail, logistics and sales. Fresher and experienced."
    />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta name="theme-color" content="#fafaf7" />
    <meta property="og:site_name" content="InfoparkDaily" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:title" content="Interview questions & answers — HR and technical rounds" />
    <meta property="og:description" content="${total} questions with sample answers across ${subjects.length} subjects. Fresher and experienced." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${PAGE}" />
    <meta property="og:image" content="${SITE}/preview.jpg" />
    <link rel="canonical" href="${PAGE}" />
    <link rel="icon" href="/favicon.ico" />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <script>
      (function () {
        var root = document.documentElement;
        root.classList.remove("theme-light", "theme-dark");
        root.classList.add("theme-light");
        root.style.colorScheme = "light";
        root.style.backgroundColor = "#fafaf7";
        function syncBody() {
          if (!document.body) return false;
          document.body.classList.add("light");
          document.body.classList.remove("dark");
          return true;
        }
        if (!syncBody()) {
          new MutationObserver(function (_m, obs) {
            if (syncBody()) obs.disconnect();
          }).observe(root, { childList: true, subtree: true });
        }
      })();
    </script>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/css/styles.css?v=20261102chk" />
    <link rel="stylesheet" href="/css/resume-builder.css?v=20260920r" />
    <link rel="stylesheet" href="/css/career-nav.css?v=20261109sec" />
    <link rel="stylesheet" href="/css/career-premium.css?v=20261102login" />
    <link rel="stylesheet" href="/css/interview-journey.css?v=${VERSION}" />
    <link rel="stylesheet" href="/css/interview-hub.css?v=${VERSION}" />
    <link rel="stylesheet" href="/css/career-system.css?v=20261108ui" />
    <script defer src="/js/career-nav.js?v=20261109nb"></script>
  </head>
  <body class="career-tools ij-page hub-page iq-page light">
    <a class="skip" href="#main">Skip to content</a>
${header()}
    <div class="ij-readbar" aria-hidden="true"><span data-readbar></span></div>
    <main id="main">
      <section class="ij-hero iq-hero" aria-labelledby="iq-title">
        <div class="ij-wrap">
          <nav class="ij-crumbs" aria-label="Breadcrumb"><a href="/">InfoparkDaily</a> / <a href="/interview/">Interview hub</a> / <span aria-current="page">Interview questions</span></nav>
          <p class="ij-badge-hero"><b>FREE</b> ${total} questions · ${subjects.length} subjects · sample answers</p>
          <h1 id="iq-title">Interview questions<br /><span>for every round.</span></h1>
          <p class="ij-lede">
            HR, managerial and role-based questions for <strong>IT and non-IT careers</strong> — from Java, SQL and testing to
            <strong>banking, accounts, nursing, teaching, engineering, hospitality, retail, logistics and sales</strong>. Each has a
            sample answer you can adapt. Filter by field, subject and experience, then mark questions as practised.
          </p>
          <ul class="ij-hero-stats">
            <li><strong>${total}</strong><span>questions</span></li>
            <li><strong>${subjects.length}</strong><span>subjects</span></li>
            <li><strong>${subjects.filter((s) => fieldOf(s.group) === "it").length}</strong><span>IT subjects</span></li>
            <li><strong>${subjects.filter((s) => fieldOf(s.group) === "nonit").length}</strong><span>non-IT fields</span></li>
          </ul>
          <div class="ij-hero-progress iq-progress" aria-live="polite">
            <div class="ij-ring ij-ring--sm" data-ring style="--p: 0"><span data-iq-pct>0%</span></div>
            <div><strong data-iq-count>0 of ${total}</strong><span>practised on this device</span></div>
          </div>
        </div>
      </section>

${hubNav("questions")}
      <div class="iq-toolbar" role="search">
        <div class="ij-wrap">
          <div class="iq-toolbar-row">
            <label class="ij-search iq-search"><span class="ij-sr">Search questions</span><input type="search" placeholder="Search questions and answers…" data-iq-search autocomplete="off" /></label>
            <div class="ij-aside-track iq-level-switch" role="group" aria-label="Experience level">
              <button type="button" data-iq-level="all" aria-pressed="true">All</button>
              <button type="button" data-iq-level="fresher" aria-pressed="false">Fresher</button>
              <button type="button" data-iq-level="experienced" aria-pressed="false">Experienced</button>
            </div>
            <button type="button" class="ij-btn ij-btn--yellow iq-random" data-iq-random>Random question</button>
          </div>
          <div class="iq-field-row">
            <div class="iq-field" role="group" aria-label="Career field">
              <button type="button" data-iq-field="all" aria-pressed="true">All fields</button>
              <button type="button" data-iq-field="it" aria-pressed="false">IT / software</button>
              <button type="button" data-iq-field="nonit" aria-pressed="false">Non-IT careers</button>
            </div>
          </div>
          <div class="iq-chips" role="group" aria-label="Question group">
            <button type="button" data-iq-group="all" aria-pressed="true">All subjects</button>
            ${groups.map((g) => `<button type="button" data-iq-group="${esc(g)}" data-field="${fieldOf(g)}" aria-pressed="false">${g}</button>`).join("")}
          </div>
        </div>
      </div>

      <section class="ij-section iq-section" aria-label="Question bank">
        <div class="ij-wrap iq-layout">
          <aside class="iq-index" aria-label="Subjects">
            <div class="iq-index-inner">
              <p class="ij-kicker">Subjects</p>
              ${groups
                .map(
                  (g) => `<p class="iq-index-group" data-field="${fieldOf(g)}">${g}</p><ul>${subjects
                    .filter((s) => s.group === g)
                    .map((s) => `<li data-index="${s.id}"><a href="#q-${s.id}">${s.name}<span>${s.qs.length}</span></a></li>`)
                    .join("")}</ul>`
                )
                .join("")}
              <div class="iq-index-actions">
                <button type="button" class="ij-reset" data-iq-expand="open">Expand all</button>
                <button type="button" class="ij-reset" data-iq-expand="close">Collapse all</button>
                <button type="button" class="ij-reset" data-iq-reset>Reset practised</button>
              </div>
            </div>
          </aside>
          <div class="iq-subjects">
            <p class="iq-result" data-iq-result aria-live="polite"></p>
            ${subjects.map(subjectHtml).join("")}
            <div class="iq-empty" data-iq-empty hidden>
              <h2>No questions match.</h2>
              <p>Try another word, or clear the filters.</p>
              <button type="button" class="ij-btn" data-iq-clear>Clear filters</button>
            </div>
          </div>
        </div>
      </section>

      <section class="ij-section ij-section--soft" aria-labelledby="iq-tips-title">
        <div class="ij-wrap">
          <div class="ij-head">
            <p class="ij-eyebrow">How to use this bank</p>
            <h2 id="iq-tips-title">Practise answers. Don’t memorise them.</h2>
          </div>
          <div class="ij-cards">
            <div class="ij-card"><h4>Say it out loud</h4><p>Read the question, answer aloud in your own words, then compare with the sample answer.</p></div>
            <div class="ij-card"><h4>Add your own example</h4><p>Replace sample projects and numbers with your real experience. Interviewers ask follow-ups.</p></div>
            <div class="ij-card"><h4>Use STAR for behaviour</h4><p>Situation, Task, Action, Result — and say what <em>you</em> did.</p></div>
            <div class="ij-card"><h4>Know your resume</h4><p>Every skill on your resume is fair game. Practise those subjects first.</p></div>
          </div>
          <p class="ij-small" style="margin-top:16px">Want the full process — HR screening, tests, salary talks and offers? Read the <a href="/interview/preparation/">Interview Journey</a>. Sample answers are guidance; adapt them honestly to your own background.</p>
        </div>
      </section>
${hubRelated("questions")}
    </main>
${footer()}
    <button type="button" class="ij-top" data-top aria-label="Back to top" hidden><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4l-6 6 1.4 1.4L9 7.8V16h2V7.8l3.6 3.6L16 10l-6-6Z"/></svg></button>
    <div class="ij-toast" id="ij-toast" role="status" aria-live="polite"></div>
    <script src="/js/interview-questions.js?v=${VERSION}" defer></script>
    <script src="/js/site.js?v=20261108sw" defer></script>
  </body>
</html>
`;

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, html);
  fs.mkdirSync(path.dirname(OLD), { recursive: true });
  fs.writeFileSync(
    OLD,
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Interview questions moved | InfoparkDaily</title><meta name="robots" content="noindex"><link rel="canonical" href="${PAGE}"><meta http-equiv="refresh" content="0; url=/interview/questions/"><script>location.replace("/interview/questions/" + location.hash);</script></head><body><p>Moved to <a href="/interview/questions/">Interview questions</a>.</p></body></html>\n`
  );
  console.log(`Wrote ${path.relative(root, OUT)} — ${total} questions across ${subjects.length} subjects`);
}
