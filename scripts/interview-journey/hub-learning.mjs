/* /interview/learning/ — learning hub, per-path detail pages and the live-code page. */
import { esc } from "./helpers.mjs";
import { pageShell, hubNav, hubRelated, crumbs, crumbsLd, ASSET_V, channelsRow, SITE } from "./shell.mjs";
import { PATHS, CATEGORIES, pathBySlug } from "./learning-paths.mjs";

const HUB_JS = `/js/interview-hub.js?v=20261108ui`;
const PG_JS = `/js/code-playground.js?v=${ASSET_V}`;
const base = [["InfoparkDaily", "/"], ["Interview hub", "/interview/"], ["Learning", "/interview/learning/"]];

/* Icon paths (24×24, filled). */
const ICON = {
  code: '<path d="M8.6 16.6 4 12l4.6-4.6L10 8.8 6.8 12l3.2 3.2-1.4 1.4Zm6.8 0L14 15.2l3.2-3.2L14 8.8l1.4-1.4L20 12l-4.6 4.6Z"/>',
  server: '<path d="M4 3h16v6H4V3Zm2 2v2h2V5H6Zm-2 6h16v6H4v-6Zm2 2v2h2v-2H6Zm-2 6h16v2H4v-2Z"/>',
  phone: '<path d="M7 1h10a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2Zm0 4v14h10V5H7Zm4 15h2v1h-2v-1Z"/>',
  chart: '<path d="M3 3h2v16h16v2H3V3Zm4 10h3v4H7v-4Zm5-5h3v9h-3V8Zm5-4h3v13h-3V4Z"/>',
  spark: '<path d="M12 2l2.2 5.8L20 10l-5.8 2.2L12 18l-2.2-5.8L4 10l5.8-2.2L12 2Zm7 13 1 2.5 2.5 1-2.5 1L19 22l-1-2.5-2.5-1 2.5-1L19 15Z"/>',
  db: '<path d="M12 2c4.4 0 8 1.3 8 3v14c0 1.7-3.6 3-8 3s-8-1.3-8-3V5c0-1.7 3.6-3 8-3Zm6 5.3C16.5 8 14.4 8.4 12 8.4S7.5 8 6 7.3V10c0 .5 2.2 1.5 6 1.5s6-1 6-1.5V7.3Zm0 5C16.5 13 14.4 13.4 12 13.4S7.5 13 6 12.3V15c0 .5 2.2 1.5 6 1.5s6-1 6-1.5v-2.7Z"/>',
  cloud: '<path d="M6.5 19A4.5 4.5 0 0 1 6 10a6 6 0 0 1 11.6-1.6A5 5 0 0 1 18 19H6.5Z"/>',
  shield: '<path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5l8-3Zm-1.2 13.6 5.7-5.7-1.4-1.4-4.3 4.3-2-2-1.4 1.4 3.4 3.4Z"/>',
  network: '<path d="M10 2h4v4h-1v3h6v4h1v4h-4v-4h1v-2h-4v2h1v4h-4v-4h1v-2H7v2h1v4H4v-4h1v-4h6V6h-1V2Z"/>',
  check: '<path d="M9.5 16.2 5.3 12l-1.4 1.4 5.6 5.6L20.1 8.4 18.7 7l-9.2 9.2Z"/>',
  pen: '<path d="M3 17.2V21h3.8L17.8 9.9l-3.8-3.8L3 17.2Zm17.7-10.1a1 1 0 0 0 0-1.4l-2.4-2.4a1 1 0 0 0-1.4 0l-1.8 1.8 3.8 3.8 1.8-1.8Z"/>',
  calc: '<path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm1 3v4h10V5H7Zm0 7v2h2v-2H7Zm4 0v2h2v-2h-2Zm4 0v6h2v-6h-2Zm-8 4v2h2v-2H7Zm4 0v2h2v-2h-2Z"/>',
  bank: '<path d="M12 2 2 7v2h20V7L12 2ZM4 11h3v7H4v-7Zm6 0h4v7h-4v-7Zm7 0h3v7h-3v-7ZM2 20h20v2H2v-2Z"/>',
  kanban: '<path d="M3 3h18v18H3V3Zm2 2v14h4V5H5Zm6 0v9h4V5h-4Zm6 0v6h2V5h-2Z"/>',
  megaphone: '<path d="M3 10v4h3l5 4V6L6 10H3Zm10-3v10c2.5-.4 5-2.3 5-5s-2.5-4.6-5-5Zm7 5c0-1.4-.4-2.6-1-3.6l1.6-1.2A8 8 0 0 1 22 12a8 8 0 0 1-1.4 4.8L19 15.6c.6-1 1-2.2 1-3.6Z"/>',
  handshake: '<path d="M2 11 7 6l3 2 2-2 5 1 5 4-4 5-2-1-3 3-2-1-2 2-3-3-2 1-2-3 2-2-2-1Z"/>',
  people: '<path d="M9 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm8 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM1 20c0-3.3 3.6-6 8-6s8 2.7 8 6v1H1v-1Zm17.5 1v-1c0-1.8-.8-3.5-2.1-4.7 3.4.2 6.6 2.1 6.6 4.7v1h-4.5Z"/>',
  headset: '<path d="M12 2a9 9 0 0 1 9 9v6a3 3 0 0 1-3 3h-3v-7h4v-2a7 7 0 0 0-14 0v2h4v7H6a3 3 0 0 1-3-3v-6a9 9 0 0 1 9-9Z"/>',
  sheet: '<path d="M4 3h16v18H4V3Zm2 2v3h5V5H6Zm7 0v3h5V5h-5Zm-7 5v3h5v-3H6Zm7 0v3h5v-3h-5Zm-7 5v4h5v-4H6Zm7 0v4h5v-4h-5Z"/>',
  palette: '<path d="M12 2a10 10 0 0 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.3A4.7 4.7 0 0 0 22 10.7C22 5.9 17.5 2 12 2Zm-5.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>',
  gear: '<path d="M19.4 13a7.6 7.6 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a7.4 7.4 0 0 0-1.7-1L15 3h-4l-.4 2.9c-.6.3-1.2.6-1.7 1l-2.5-1-2 3.5L6.6 11a7.6 7.6 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1c.5.4 1.1.7 1.7 1L11 21h4l.4-2.9c.6-.3 1.2-.6 1.7-1l2.5 1 2-3.5-2.2-1.6ZM13 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"/>',
  building: '<path d="M4 21V3h11v4h5v14h-6v-4h-4v4H4Zm3-15v2h2V6H7Zm4 0v2h2V6h-2Zm-4 4v2h2v-2H7Zm4 0v2h2v-2h-2Zm5 0v2h2v-2h-2Zm-9 4v2h2v-2H7Zm9 0v2h2v-2h-2Z"/>',
  bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>',
  bell: '<path d="M12 22a2.5 2.5 0 0 0 2.5-2.5h-5A2.5 2.5 0 0 0 12 22Zm7-6V11a7 7 0 0 0-5.5-6.8V3a1.5 1.5 0 0 0-3 0v1.2A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2Z"/>',
  cart: '<path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM2 2h3.3l.9 2H21l-3.5 8H8.1l-.9 2H19v2H4l2-4L4 4H2V2Z"/>',
  truck: '<path d="M2 5h12v9h1V8h4l3 4v5h-2a3 3 0 0 1-6 0H9a3 3 0 0 1-6 0H2V5Zm4 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm11 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM16 10v3h4l-2.2-3H16Z"/>',
  health: '<path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7V3Z"/>',
  board: '<path d="M2 4h20v12H2V4Zm2 2v8h16V6H4Zm5 12h6l1 3h-2l-.5-1.5h-3L10 21H8l1-3Z"/>',
  chat: '<path d="M4 4h16v11H8l-4 4V4Zm4 4v2h8V8H8Zm0 4h5v-2H8v2Z"/>',
  play: '<path d="M8 5v14l11-7L8 5Z"/>',
  search: '<path d="M10 3a7 7 0 0 1 5.6 11.2l5.1 5.1-1.4 1.4-5.1-5.1A7 7 0 1 1 10 3Zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"/>'
};
const svg = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[k] || ICON.code}</svg>`;
const catName = Object.fromEntries(CATEGORIES.map(([k, n]) => [k, n]));
const modCount = (p) => p.modules.length;

/* ---------- live code playground markup (shared) ---------- */
export const playgroundHtml = (defaultTab = "web") => `
          <div class="pg" data-playground data-pg-default="${defaultTab}">
            <div class="pg-tabs" role="tablist" aria-label="Language">
              <button type="button" role="tab" data-pg-tab="web" aria-selected="false">HTML · CSS · JS</button>
              <button type="button" role="tab" data-pg-tab="js" aria-selected="false">JavaScript</button>
              <button type="button" role="tab" data-pg-tab="sql" aria-selected="false">SQL</button>
              <button type="button" role="tab" data-pg-tab="py" aria-selected="false">Python</button>
            </div>
            <div class="pg-panel" role="tabpanel" data-pg-panel="web" hidden>
              <div class="pg-toolbar">
                <label>Example <select data-web-ex></select></label>
                <div class="pg-files" role="group" aria-label="File">
                  <button type="button" data-web-file="html" aria-pressed="true">HTML</button>
                  <button type="button" data-web-file="css" aria-pressed="false">CSS</button>
                  <button type="button" data-web-file="js" aria-pressed="false">JS</button>
                </div>
                <span class="pg-spacer"></span>
                <button type="button" class="pg-btn pg-btn--ghost" data-web-reset>Reset</button>
                <button type="button" class="pg-btn" data-web-run>Run ▶</button>
              </div>
              <div class="pg-split">
                <div class="pg-editor-wrap">
                  <textarea class="pg-editor" data-web="html" spellcheck="false" aria-label="HTML code"></textarea>
                  <textarea class="pg-editor" data-web="css" spellcheck="false" aria-label="CSS code" hidden></textarea>
                  <textarea class="pg-editor" data-web="js" spellcheck="false" aria-label="JavaScript code" hidden></textarea>
                </div>
                <div class="pg-preview"><p class="pg-out-label">Preview</p><iframe data-web-frame title="Live preview" sandbox="allow-scripts allow-modals"></iframe></div>
              </div>
            </div>
            <div class="pg-panel" role="tabpanel" data-pg-panel="js" hidden>
              <div class="pg-toolbar">
                <label>Example <select data-js-ex></select></label>
                <span class="pg-spacer"></span>
                <button type="button" class="pg-btn pg-btn--ghost" data-js-clear>Clear</button>
                <button type="button" class="pg-btn" data-js-run>Run ▶</button>
              </div>
              <div class="pg-task" data-task="js" hidden></div>
              <div class="pg-split">
                <div class="pg-editor-wrap"><textarea class="pg-editor" data-js-code spellcheck="false" aria-label="JavaScript code"></textarea></div>
                <div class="pg-console"><p class="pg-out-label">Console</p><div class="pg-out" data-js-out aria-live="polite"></div></div>
              </div>
            </div>
            <div class="pg-panel" role="tabpanel" data-pg-panel="sql" hidden>
              <div class="pg-toolbar">
                <label>Example <select data-sql-ex></select></label>
                <span class="pg-spacer"></span>
                <button type="button" class="pg-btn pg-btn--ghost" data-sql-reset>Reset data</button>
                <button type="button" class="pg-btn" data-sql-run>Run ▶</button>
              </div>
              <p class="pg-hint">Sample tables: <code>employees(id, name, dept_id, salary, joined)</code> · <code>departments(id, name)</code> · <code>users(id, email)</code></p>
              <div class="pg-task" data-task="sql" hidden></div>
              <div class="pg-split pg-split--stack">
                <div class="pg-editor-wrap"><textarea class="pg-editor pg-editor--short" data-sql-code spellcheck="false" aria-label="SQL query"></textarea></div>
                <div class="pg-console pg-console--light"><p class="pg-out-label">Result</p><div class="pg-out" data-sql-out aria-live="polite"><p class="pg-status">Press Run to see the result.</p></div></div>
              </div>
            </div>
            <div class="pg-panel" role="tabpanel" data-pg-panel="py" hidden>
              <div class="pg-toolbar">
                <label>Example <select data-py-ex></select></label>
                <span class="pg-spacer"></span>
                <button type="button" class="pg-btn pg-btn--ghost" data-py-clear>Clear</button>
                <button type="button" class="pg-btn" data-py-run>Run ▶</button>
              </div>
              <div class="pg-task" data-task="py" hidden></div>
              <div class="pg-split">
                <div class="pg-editor-wrap"><textarea class="pg-editor" data-py-code spellcheck="false" aria-label="Python code"></textarea></div>
                <div class="pg-console"><p class="pg-out-label">Output</p><div class="pg-out" data-py-out aria-live="polite"></div></div>
              </div>
            </div>
          </div>
          <p class="ij-small pg-foot">Code runs only in your browser. Press <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>Enter</kbd> to run. Pick a <strong>🏆 Challenge</strong> from the Example list to get your answer checked automatically.</p>`;

/* ---------- path card (hub grid) ---------- */
const card = (p) => `
            <a class="lp-card lp-card--${p.tone}" href="/interview/learning/${p.slug}/" data-lp-field="${p.field}" data-lp-cat="${p.cat}" data-lp-text="${esc(
              (p.title + " " + p.summary + " " + p.tools.join(" ") + " " + catName[p.cat]).toLowerCase()
            )}">
              <span class="lp-card-top">
                <span class="lp-icon">${svg(p.icon)}</span>
                <span class="lp-badges"><span class="lp-field lp-field--${p.field}">${p.field === "it" ? "IT" : "Non-IT"}</span>${p.live ? '<span class="lp-live">▶ Live code</span>' : ""}</span>
              </span>
              <span class="lp-cat">${catName[p.cat]}</span>
              <strong class="lp-title">${p.title}</strong>
              <span class="lp-sum">${p.summary}</span>
              <span class="lp-meta"><span>${p.level}</span><span>${p.duration}</span><span>${modCount(p)} modules</span></span>
              <span class="lp-go">View path <span aria-hidden="true">→</span></span>
            </a>`;

/* =====================================================================
   HUB /interview/learning/
   ===================================================================== */
export function learningHubPage(platforms, kerala) {
  const items = base;
  const it = PATHS.filter((p) => p.field === "it").length;
  const nonit = PATHS.length - it;
  const main = `
      <section class="lh-hero" aria-labelledby="lh-title">
        <div class="ax-glow" aria-hidden="true"></div>
        <div class="ij-wrap">
          ${crumbs(items)}
          <div class="lh-hero-copy">
            <p class="ax-pill"><span>Free</span> ${PATHS.length} learning paths · IT &amp; non-IT</p>
            <h1 id="lh-title">What do you want to <span>learn?</span></h1>
            <p class="ax-lede">Step-by-step learning paths for every career — software, data and cloud, plus accounts, banking, hospitality, mechanical, civil, nursing, teaching and more. Each path has a roadmap, free resources, certifications and projects.</p>
            <label class="lh-search"><span class="ij-sr">Search learning paths</span>${svg("search")}<input type="search" placeholder="Search: Python, Tally, AutoCAD, nursing, hotel…" data-lp-search autocomplete="off" /></label>
          </div>
          <div class="lh-fields" role="group" aria-label="Field">
            <button type="button" data-lp-fieldbtn="all" aria-pressed="true"><strong>All paths</strong><small>${PATHS.length} paths</small></button>
            <button type="button" data-lp-fieldbtn="it" aria-pressed="false"><strong><svg class="cs-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v10H4zM2 19h20"/></svg> Technical / IT</strong><small>${it} paths</small></button>
            <button type="button" data-lp-fieldbtn="nonit" aria-pressed="false"><strong><svg class="cs-ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></svg> Non-IT careers</strong><small>${nonit} paths</small></button>
            <a href="/interview/learning/live-code/" class="lh-live"><strong>▶ Live code</strong><small>Run &amp; check code</small></a>
          </div>
        </div>
      </section>
${hubNav("learning")}
      <section class="ez-section lh-section" id="paths" aria-labelledby="paths-title">
        <div class="ij-wrap">
          <div class="lh-cats" role="group" aria-label="Category">
            <button type="button" data-lp-catbtn="all" aria-pressed="true">All categories</button>
            ${CATEGORIES.map(([k, n, f]) => `<button type="button" data-lp-catbtn="${k}" data-lp-catfield="${f}" aria-pressed="false">${n}</button>`).join("")}
          </div>
          <div class="lh-bar"><h2 id="paths-title">Learning paths</h2><p data-lp-count aria-live="polite">${PATHS.length} paths</p></div>
          <div class="lp-grid">${PATHS.map(card).join("")}</div>
          <div class="iq-empty" data-lp-empty hidden><h2>No paths match.</h2><p>Try another word or category.</p><button type="button" class="ij-btn" data-lp-clear>Show all paths</button></div>
        </div>
      </section>

      <section class="ez-section ez-section--soft" aria-labelledby="feat-title">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">Practice</p><h2 id="feat-title">Learn by doing</h2></div>
          <div class="lh-feature">
            <a class="lh-feat lh-feat--code" href="/interview/learning/live-code/">
              <span class="lh-feat-icon">${svg("play")}</span>
              <strong>Live code playground</strong>
              <span>Write HTML, CSS, JavaScript, SQL and Python in your browser. Pick a 🏆 challenge and get your answer checked instantly.</span>
              <em>Open live code →</em>
            </a>
            <a class="lh-feat lh-feat--enx" href="https://sarangrajan.in/enitexa.ai/learning/" target="_blank" rel="noopener">
              <span class="lh-feat-icon">${svg("spark")}</span>
              <strong>Learn with Enitexa.ai</strong>
              <span>Guided learning for developers and job seekers from Enitexa.ai — then practise here with live code and real interview questions.</span>
              <em>Open Enitexa.ai Learning ↗</em>
            </a>
            <a class="lh-feat lh-feat--qs" href="/interview/questions/">
              <span class="lh-feat-icon">${svg("chat")}</span>
              <strong>Interview questions</strong>
              <span>354 questions with sample answers for 21 IT subjects and 21 non-IT fields.</span>
              <em>Practise questions →</em>
            </a>
          </div>
        </div>
      </section>

      <section class="ez-section" aria-labelledby="plat-title">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">Free courses &amp; certifications</p><h2 id="plat-title">Learning platforms</h2><p>Check each platform for current fees and certificate rules before enrolling.</p></div>
          <div class="learn-grid">
            ${platforms.map(([n, u, d, area, cost]) => `<a class="learn-card" href="${u}" target="_blank" rel="noopener noreferrer"><strong>${n} <span aria-hidden="true">↗</span></strong><span>${d}</span><span class="learn-tags"><em>${area}</em><em>${cost}</em></span></a>`).join("")}
          </div>
          <h3 class="hub-h3">Kerala skilling programmes</h3>
          <div class="learn-grid learn-grid--kerala">
            ${kerala.map(([n, u, d]) => `<a class="learn-card" href="${u}" target="_blank" rel="noopener noreferrer"><strong>${n} <span aria-hidden="true">↗</span></strong><span>${d}</span></a>`).join("")}
          </div>
          ${channelsRow("light", "Get job alerts from InfoparkDaily")}
        </div>
      </section>
${hubRelated("learning")}`;
  return pageShell({
    title: "Learning Paths for IT &amp; Non-IT Careers – Roadmaps, Free Courses, Live Code | InfoparkDaily",
    description: `${PATHS.length} free learning paths: web development, Java, Python, data, cloud, testing, plus accounting, banking, digital marketing, HR, mechanical, civil, electrical, hospitality, retail, logistics, nursing and teaching. Roadmaps, resources, certifications and a live code playground.`,
    path: "/interview/learning/",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ItemList",
          name: "InfoparkDaily learning paths",
          itemListElement: PATHS.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/interview/learning/${p.slug}/`, name: p.title }))
        },
        crumbsLd(items)
      ]
    },
    bodyClass: "hub-learning lh-page",
    main,
    scripts: [HUB_JS]
  });
}

/* =====================================================================
   PATH DETAIL /interview/learning/<slug>/
   ===================================================================== */
export function learningPathPage(p) {
  const items = [...base, [p.title, `/interview/learning/${p.slug}/`]];
  const related = PATHS.filter((x) => x.slug !== p.slug && (x.cat === p.cat || x.field === p.field)).slice(0, 4);
  const main = `
      <section class="lp-hero lp-hero--${p.tone}" aria-labelledby="lp-title">
        <div class="ax-glow" aria-hidden="true"></div>
        <div class="ij-wrap lp-hero-grid">
          <div>
            ${crumbs(items)}
            <p class="lp-hero-badges"><span class="lp-field lp-field--${p.field}">${p.field === "it" ? "Technical / IT" : "Non-IT career"}</span><span class="lp-hero-cat">${catName[p.cat]}</span>${p.live ? '<span class="lp-live">▶ Live code</span>' : ""}</p>
            <h1 id="lp-title">${p.title}</h1>
            <p class="ax-lede">${p.summary}</p>
            <p class="lp-who"><strong>Who it’s for:</strong> ${p.who}</p>
            <div class="ax-cta">
              <a class="ax-btn ax-btn--yellow" href="#roadmap">Start the roadmap →</a>
              ${p.live ? `<a class="ax-btn ax-btn--ghost" href="#practice">▶ Try live code</a>` : `<a class="ax-btn ax-btn--ghost" href="/interview/questions/#q-${p.qs}">Practise interview questions</a>`}
            </div>
          </div>
          <aside class="lp-facts">
            <span class="lp-facts-icon">${svg(p.icon)}</span>
            <dl>
              <div><dt>Level</dt><dd>${p.level}</dd></div>
              <div><dt>Duration</dt><dd>${p.duration}</dd></div>
              <div><dt>Modules</dt><dd>${modCount(p)}</dd></div>
              <div><dt>Cost</dt><dd>Free resources</dd></div>
            </dl>
          </aside>
        </div>
      </section>
${hubNav("learning", true)}
      <nav class="lp-jump" aria-label="On this page"><div class="ij-wrap"><div class="ij-subnav-track">
        <a href="#roadmap">Roadmap</a><a href="#tools">Tools</a><a href="#resources">Free resources</a><a href="#certs">Certifications</a><a href="#projects">Projects</a>${p.live ? '<a href="#practice">Live code</a>' : ""}<a href="#next">Interview &amp; jobs</a>
      </div></div></nav>

      <section class="ez-section" id="roadmap" aria-labelledby="rm-title">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">Roadmap</p><h2 id="rm-title">What you’ll learn</h2><p>Follow the modules in order. Finish a small project at the end of each one.</p></div>
          <ol class="lp-mods">
            ${p.modules
              .map(
                ([t, d, topics], i) => `<li class="lp-mod">
              <div class="lp-mod-head"><span class="lp-mod-num">${String(i + 1).padStart(2, "0")}</span><div><h3>${t}</h3><span class="lp-mod-time">${d}</span></div></div>
              <ul>${topics.map((x) => `<li>${x}</li>`).join("")}</ul>
            </li>`
              )
              .join("")}
          </ol>
        </div>
      </section>

      <section class="ez-section ez-section--soft" id="tools" aria-labelledby="tools-t">
        <div class="ij-wrap lp-two">
          <div>
            <div class="ez-head"><p class="ax-eyebrow">Tools</p><h2 id="tools-t">Tools &amp; skills to learn</h2></div>
            <ul class="lp-tools">${p.tools.map((t) => `<li>${t}</li>`).join("")}</ul>
          </div>
          <div id="certs">
            <div class="ez-head"><p class="ax-eyebrow">Certifications</p><h2>Useful certifications</h2></div>
            <ul class="lp-certs">${p.certs.map(([n, d]) => `<li><strong>${n}</strong><span>${d}</span></li>`).join("")}</ul>
            <p class="ij-small">Certificates support your profile — interviewers still ask what you built. Check current fees and rules on the official site.</p>
          </div>
        </div>
      </section>

      <section class="ez-section" id="resources" aria-labelledby="res-t">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">Free resources</p><h2 id="res-t">Where to learn</h2></div>
          <div class="learn-grid">
            ${p.resources.map(([n, u, d]) => `<a class="learn-card" href="${u}" target="_blank" rel="noopener noreferrer"><strong>${n} <span aria-hidden="true">↗</span></strong><span>${d}</span></a>`).join("")}
          </div>
        </div>
      </section>

      <section class="ez-section ez-section--soft" id="projects" aria-labelledby="proj-t">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">Practice</p><h2 id="proj-t">Projects to build</h2><p>Put these on your resume — they give you real stories for interviews.</p></div>
          <ol class="lp-projects">${p.projects.map((x, i) => `<li><span>${i + 1}</span>${x}</li>`).join("")}</ol>
        </div>
      </section>
${
  p.live
    ? `
      <section class="ez-section" id="practice" aria-labelledby="pg-title">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">Live code</p><h2 id="pg-title">Practise right here</h2><p>Run examples and try the 🏆 challenges — your answers are checked automatically.</p></div>
${playgroundHtml(p.live)}
        </div>
      </section>`
    : ""
}
      <section class="ez-section ez-section--soft" id="next" aria-labelledby="next-t">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">Next steps</p><h2 id="next-t">Interview &amp; jobs</h2></div>
          <div class="lp-next">
            <a class="lp-next-card lp-next-card--q" href="/interview/questions/#q-${p.qs}"><strong>Practise interview questions</strong><span>Sample answers for ${p.title.toLowerCase()} and HR rounds.</span><em>Open questions →</em></a>
            <a class="lp-next-card lp-next-card--j" href="${p.jobs}"><strong>Find matching jobs</strong><span>Openings on InfoparkDaily for this field.</span><em>Browse jobs →</em></a>
            <a class="lp-next-card" href="/resume-builder/templates/"><strong>Build your resume</strong><span>Add your new skills and projects.</span><em>Open builder →</em></a>
          </div>
          ${channelsRow("light", "Get job alerts for this field")}
          ${
            related.length
              ? `<h3 class="hub-h3">Related learning paths</h3><div class="lp-grid lp-grid--related">${related.map(card).join("")}</div>`
              : ""
          }
        </div>
      </section>`;
  return pageShell({
    title: `${esc(p.title)} – Learning Roadmap, Free Resources &amp; Certifications | InfoparkDaily`,
    description: `${p.summary} ${p.modules.length}-module roadmap (${p.duration}), tools, free resources, certifications and projects${p.live ? ", plus live code practice" : ""}.`,
    path: `/interview/learning/${p.slug}/`,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Course",
          name: p.title,
          description: p.summary,
          url: `${SITE}/interview/learning/${p.slug}/`,
          provider: { "@type": "Organization", name: "InfoparkDaily", sameAs: SITE },
          isAccessibleForFree: true,
          educationalLevel: p.level,
          syllabusSections: p.modules.map(([t, d]) => ({ "@type": "Syllabus", name: t, timeRequired: d }))
        },
        crumbsLd(items)
      ]
    },
    bodyClass: "hub-learning lp-page",
    main,
    scripts: p.live ? [HUB_JS, PG_JS] : [HUB_JS]
  });
}

/* =====================================================================
   LIVE CODE /interview/learning/live-code/
   ===================================================================== */
export function liveCodePage() {
  const items = [...base, ["Live code", "/interview/learning/live-code/"]];
  const main = `
      <section class="lh-hero lh-hero--short" aria-labelledby="lc-title">
        <div class="ax-glow" aria-hidden="true"></div>
        <div class="ij-wrap">
          ${crumbs(items)}
          <div class="lh-hero-copy">
            <p class="ax-pill"><span>Live</span> Code playground · answers checked instantly</p>
            <h1 id="lc-title">Write code. Run it. <span>Get it checked.</span></h1>
            <p class="ax-lede">Practise interview-style problems in HTML/CSS/JS, JavaScript, SQL and Python — right in your browser. Choose a 🏆 challenge to see whether your answer is correct.</p>
          </div>
        </div>
      </section>
${hubNav("learning", true)}
      <section class="ez-section" aria-label="Playground">
        <div class="ij-wrap">
${playgroundHtml("js")}
        </div>
      </section>
      <section class="ez-section ez-section--soft" aria-labelledby="how-lc">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">How it works</p><h2 id="how-lc">Practise like a real coding round</h2></div>
          <div class="lh-steps">
            <div><span>1</span><strong>Pick a language</strong><p>HTML/CSS/JS for UI, JavaScript and Python for logic, SQL for data questions.</p></div>
            <div><span>2</span><strong>Choose a challenge</strong><p>Open the Example list and pick any 🏆 challenge. The task appears above the editor.</p></div>
            <div><span>3</span><strong>Run &amp; check</strong><p>Press Run. We compare your output with the expected answer and show ✓ or what to fix.</p></div>
            <div><span>4</span><strong>Practise the theory</strong><p>Then answer related questions in the <a href="/interview/questions/?field=it">interview question bank</a>.</p></div>
          </div>
          ${channelsRow("light")}
        </div>
      </section>
${hubRelated("learning")}`;
  return pageShell({
    title: "Live Code Playground – Practise JavaScript, SQL, Python Online | InfoparkDaily",
    description: "Free online code playground for interview practice: HTML/CSS/JS live preview, JavaScript console, SQL on a sample database and Python — with coding challenges that check your answer automatically.",
    path: "/interview/learning/live-code/",
    jsonLd: { "@context": "https://schema.org", "@graph": [{ "@type": "WebApplication", name: "InfoparkDaily Live Code Playground", applicationCategory: "EducationalApplication", operatingSystem: "Any", url: `${SITE}/interview/learning/live-code/`, offers: { "@type": "Offer", price: "0", priceCurrency: "INR" } }, crumbsLd(items)] },
    bodyClass: "hub-learning lc-page",
    main,
    scripts: [HUB_JS, PG_JS]
  });
}

export { PATHS, pathBySlug };
