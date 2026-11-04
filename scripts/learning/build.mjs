/* Build the /learning/ section: hub, track overviews and lesson pages.
   Run: node scripts/learning/build.mjs   (npm run build:learning) */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pageShell, crumbs, crumbsLd, SITE } from "../interview-journey/shell.mjs";
import { esc } from "../interview-journey/helpers.mjs";
import { PATHS } from "../interview-journey/learning-paths.mjs";
import { TRACKS } from "./tracks-web.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const V = "20261104learn";
const CSS = [`/css/learning.css?v=${V}`];
const JS = [`/js/learning.js?v=${V}`];

/* Tracks that are planned but not written yet — shown honestly as "coming soon". */
const PLANNED = [
  ["Python", "Programming basics, data handling and automation.", "#3776ab"],
  ["SQL", "Query, join and summarise data in databases.", "#00758f"],
  ["Git & GitHub", "Version control and collaborating on code.", "#f05032"],
  ["React", "Components, state and modern frontend apps.", "#149eca"],
  ["Java", "OOP and backend foundations.", "#b07219"],
  ["MS Excel", "Formulas, pivot tables and reports.", "#1d6f42"]
];

const write = (rel, html) => {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
};

const base = [["InfoparkDaily", "/"], ["Learning", "/learning/"]];
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
  const trackCards = TRACKS.map(
    (t) => `
            <article class="ln-track" style="--ln-c:${t.color}" data-ln-track="${t.key}" data-search="${esc([t.name, t.long, t.tagline, ...t.lessons.map((l) => l.title)].join(" ").toLowerCase())}">
              <div class="ln-track-badge" aria-hidden="true">${t.name}</div>
              <h3><a href="${trackUrl(t)}">${t.long}</a></h3>
              <p>${t.tagline}</p>
              <p class="ln-meta">${t.lessons.length} lessons · ${t.level} · Try-it editor · Quizzes</p>
              <div class="ln-progress" aria-hidden="true"><span data-ln-bar="${t.key}"></span></div>
              <p class="ln-progress-label" data-ln-label="${t.key}" data-total="${t.lessons.length}">Not started</p>
              <a class="ln-btn" href="${lessonUrl(t, t.lessons[0])}" data-ln-continue="${t.key}">Start ${t.name}</a>
            </article>`
  ).join("");

  const lessonIndex = TRACKS.map(
    (t) => `
            <div class="ln-index-col" style="--ln-c:${t.color}">
              <h3><a href="${trackUrl(t)}">${t.name}</a></h3>
              <ol>${t.lessons.map((l) => `<li data-search="${esc((t.name + " " + l.title + " " + l.summary).toLowerCase())}"><a href="${lessonUrl(t, l)}" data-ln-lesson="${t.key}/${l.slug}">${l.title}</a></li>`).join("")}</ol>
            </div>`
  ).join("");

  const planned = PLANNED.map(
    ([name, desc, color]) => `
            <div class="ln-planned" style="--ln-c:${color}" data-search="${esc((name + " " + desc).toLowerCase())}">
              <strong>${name}</strong><span>${desc}</span><em>Coming soon</em>
            </div>`
  ).join("");

  const careerCol = (field, label) => `
            <div>
              <h3>${label}</h3>
              <ul class="ln-paths">${PATHS.filter((p) => p.field === field)
                .map((p) => `<li data-search="${esc((p.title + " " + (p.summary || "")).toLowerCase())}"><a href="/interview/learning/${p.slug}/">${esc(p.title)}</a></li>`)
                .join("")}</ul>
            </div>`;

  const main = `
      <section class="lh-hero ln-hero" aria-labelledby="ln-title">
        <div class="ax-glow" aria-hidden="true"></div>
        <div class="ij-wrap">
          ${crumbs(base)}
          <div class="lh-hero-copy">
            <p class="ax-pill"><span>Free</span> ${TRACKS.length} tutorials · ${lessonsTotal} lessons · ${PATHS.length} career paths</p>
            <h1 id="ln-title">Learn to code. <span>Build job-ready skills.</span></h1>
            <p class="ax-lede">Short, practical tutorials with a live “Try it yourself” editor, quick quizzes and progress saved in your browser. Start with HTML, CSS and JavaScript, then follow a full career path.</p>
            <label class="lh-search">
              <span class="ij-sr">Search learning</span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 3a7 7 0 0 1 5.6 11.2l5.1 5.1-1.4 1.4-5.1-5.1A7 7 0 1 1 10 3Zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"/></svg>
              <input type="search" placeholder="Search: flexbox, forms, loops, Excel, nursing…" data-ln-search autocomplete="off" />
            </label>
          </div>
        </div>
      </section>
${trackBar("")}
      <section class="ez-section" aria-labelledby="ln-tutorials">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">Tutorials</p><h2 id="ln-tutorials">Start with the web foundations</h2></div>
          <div class="ln-tracks">${trackCards}
          </div>
          <p class="ln-empty" data-ln-empty hidden>No matches. Try another word, or browse the career paths below.</p>
        </div>
      </section>
      <section class="ez-section ez-section--soft" aria-labelledby="ln-all">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">Every lesson</p><h2 id="ln-all">Jump straight to a topic</h2></div>
          <div class="ln-index">${lessonIndex}
          </div>
        </div>
      </section>
      <section class="ez-section" aria-labelledby="ln-how">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">How it works</p><h2 id="ln-how">Read. Try. Check. Move on.</h2></div>
          <div class="lh-steps">
            <div><span>1</span><strong>Read a short lesson</strong><p>Each page explains one idea with plain examples.</p></div>
            <div><span>2</span><strong>Try it yourself</strong><p>Edit the code and press Run — the result appears instantly.</p></div>
            <div><span>3</span><strong>Answer the quiz</strong><p>One quick question checks that the idea stuck.</p></div>
            <div><span>4</span><strong>Track progress</strong><p>Mark lessons complete; your progress stays on this device.</p></div>
          </div>
        </div>
      </section>
      <section class="ez-section ez-section--soft" aria-labelledby="ln-practice">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">Practice</p><h2 id="ln-practice">Practise like a real coding round</h2></div>
          <div class="ln-practice">
            <a href="/interview/learning/live-code/"><strong>▶ Live code playground</strong><span>HTML/CSS/JS, JavaScript, SQL and Python challenges that check your answer.</span></a>
            <a href="/interview/questions/?field=it"><strong>Interview questions</strong><span>Technical and HR questions with model answers.</span></a>
            <a href="/portfolio/templates/"><strong>Show your work</strong><span>Turn your projects into a portfolio website.</span></a>
          </div>
        </div>
      </section>
      <section class="ez-section" aria-labelledby="ln-paths">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">Career paths</p><h2 id="ln-paths">Step-by-step roadmaps for ${PATHS.length} careers</h2><p>Each path has modules, free resources, certifications and projects.</p></div>
          <div class="ln-paths-grid">${careerCol("it", "💻 Technical / IT")}${careerCol("nonit", "🧭 Non-IT careers")}
          </div>
        </div>
      </section>
      <section class="ez-section ez-section--soft" aria-labelledby="ln-next">
        <div class="ij-wrap">
          <div class="ez-head"><p class="ax-eyebrow">On the roadmap</p><h2 id="ln-next">More tutorials are on the way</h2></div>
          <div class="ln-planned-grid">${planned}
          </div>
        </div>
      </section>`;

  return pageShell({
    title: "Learning – Free HTML, CSS & JavaScript Tutorials and Career Paths | InfoparkDaily",
    description: `Free coding tutorials with a live Try-it editor and quizzes: ${lessonsTotal} lessons in HTML, CSS and JavaScript, plus ${PATHS.length} career learning paths for IT and non-IT jobs.`,
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
            <p class="ax-lede">${t.long}. Every lesson has a runnable example you can edit, key points and a one-question quiz.</p>
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
          <section class="ln-try" aria-labelledby="try-${l.slug}" data-tryit>
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
                <iframe title="Result of the example code" sandbox="allow-scripts allow-modals" data-frame></iframe>
                <pre class="ln-console" data-console aria-live="polite" hidden></pre>
              </div>
            </div>
            <p class="ln-try-note">Edit the code and press Run (or Ctrl/⌘ + Enter). Code runs only in your browser, in a sandbox.</p>
          </section>
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
          <div class="ln-complete">
            <button type="button" class="ln-btn ln-btn--ghost" data-ln-complete aria-pressed="false">Mark lesson complete</button>
          </div>
${pager("bottom")}
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
