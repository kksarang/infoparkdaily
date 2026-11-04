/**
 * Builds /interview/preparation/index.html (the 17-chapter Interview Journey) from the chapter files.
 * /interview-journey/ becomes a redirect to it.
 * Run: npm run build:journey
 * Content lives in chapters-a/b/c.mjs; edit there, then rebuild.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { esc } from "./helpers.mjs";
import { chaptersA } from "./chapters-a.mjs";
import { chaptersB } from "./chapters-b.mjs";
import { chaptersC } from "./chapters-c.mjs";
import { EXTRA, GLOSSARY, FAQ } from "./chapters-extra.mjs";
import { header, footer, featureDuo, hubNav } from "./shell.mjs";
import { buildQuestions } from "./build-questions.mjs";
import { learningPage, emailPage, resumePage } from "./hub-pages.mjs";
import { overviewPage } from "./hub-overview.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const OUT = path.join(root, "interview/preparation/index.html");
const OLD_OUT = path.join(root, "interview-journey/index.html");
const VERSION = "20261104hub";
const SITE = "https://infoparkdaily.online";
const PAGE = `${SITE}/interview/preparation/`;

const chapters = [...chaptersA, ...chaptersB, ...chaptersC];
/* Append extra depth and derive reading time from real word count (~200 wpm, capped list skims faster). */
chapters.forEach((c) => {
  if (EXTRA[c.id]) c.body += EXTRA[c.id];
  const words = c.body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  c.words = words;
  c.time = Math.max(c.time, Math.round(words / 200));
});
chapters.forEach((c, i) => {
  if (c.num !== i + 1) throw new Error(`Chapter order mismatch at ${c.id}`);
});
const pad = (n) => String(n).padStart(2, "0");
const anchor = (c) => `ch-${c.id}`;
const byNum = (n) => chapters[n - 1];
const totalMinutes = chapters.reduce((s, c) => s + c.time, 0);

/* ---------- Where am I? ---------- */
const SITUATIONS = [
  [
    "I haven’t found a job yet",
    1,
    "Start with InfoparkDaily’s job board and learn where else openings are posted.",
    ["/jobs/", "Browse jobs"],
  ],
  [
    "I found a job I like",
    2,
    "Decode the job description and research the company before applying.",
    ["/ats-checker/", "Match it to my resume"],
  ],
  [
    "I need a resume",
    4,
    "Build a clean, ATS-friendly resume for your track.",
    ["/resume-builder/templates/", "Build my resume"],
  ],
  [
    "I have a resume",
    5,
    "Check readability and keyword match against the job description.",
    ["/ats-checker/", "Check my resume"],
  ],
  [
    "I’m ready to apply",
    6,
    "Pick the right channel and send a professional email.",
    ["/resume-builder/email-examples/", "Email examples"],
  ],
  [
    "I applied and I’m waiting",
    7,
    "See what happens inside HR after you click Apply.",
    null,
  ],
  [
    "I got no response",
    8,
    "Understand shortlisted, rejected, on-hold and silent outcomes.",
    null,
  ],
  [
    "I received an HR call",
    9,
    "Prepare your intro, salary answer and notice period.",
    null,
  ],
  [
    "I have a test or assessment",
    10,
    "Practise aptitude, coding and domain questions with answers.",
    null,
  ],
  [
    "I have a technical interview",
    11,
    "Revise fundamentals and rehearse your project walkthrough.",
    null,
  ],
  [
    "I have a manager round",
    12,
    "Prepare STAR stories for teamwork, conflict and ownership.",
    null,
  ],
  [
    "HR is discussing salary",
    13,
    "Understand CTC vs in-hand and negotiate confidently.",
    null,
  ],
  [
    "I completed my interviews",
    14,
    "Learn how final selection works and how to follow up.",
    null,
  ],
  [
    "I received an offer",
    15,
    "Evaluate the offer letter and accept or decline professionally.",
    null,
  ],
  [
    "I’m about to join",
    16,
    "Documents, background verification, resignation and day one.",
    null,
  ],
  [
    "I was rejected",
    17,
    "Get feedback, improve and restart with a routine.",
    ["/jobs/", "See new openings"],
  ],
];

/* ---------- Journey map ---------- */
const PHASE_KEY = {
  Prepare: "prepare",
  "Inside the company": "company",
  Interviews: "interviews",
  Decision: "decision",
};
const PHASES = [
  { name: "Prepare", note: "You, before applying", nums: [1, 2, 3, 4, 5, 6] },
  {
    name: "Inside the company",
    note: "HR & ATS",
    nums: [7, 8],
    decision: { after: 8, q: "Shortlisted?", yes: 9, no: 17 },
  },
  { name: "Interviews", note: "Rounds", nums: [9, 10, 11, 12, 13] },
  {
    name: "Decision",
    note: "Outcome",
    nums: [14, 15, 16, 17],
    decision: { after: 14, q: "Selected?", yes: 15, no: 17 },
  },
];

const node = (c) => `
<li class="ij-node" data-node="${c.id}">
  <button type="button" data-stage="${c.id}" aria-haspopup="dialog">
    <span class="ij-node-num">${pad(c.num)}</span>
    <span class="ij-node-text"><span class="ij-node-title">${c.title}</span><span class="ij-node-time">${c.time} min</span></span>
    <span class="ij-node-done" aria-hidden="true">✓</span>
  </button>
</li>`;

const diamond = (d) => `
<li class="ij-node ij-node--decision" aria-label="Decision: ${esc(d.q)} Yes goes to chapter ${d.yes}, no goes to chapter ${d.no}">
  <div class="ij-diamond"><span>${d.q}</span></div>
  <div class="ij-branch">
    <a class="ij-yes" href="#${anchor(byNum(d.yes))}" data-open="${byNum(d.yes).id}">Yes → ${pad(d.yes)} ${byNum(d.yes).title}</a>
    <a class="ij-no" href="#${anchor(byNum(d.no))}" data-open="${byNum(d.no).id}">No → ${pad(d.no)} ${byNum(d.no).title}</a>
  </div>
</li>`;

const journeyMap = PHASES.map(
  (p, i) => `
<div class="ij-phase" data-phase="${PHASE_KEY[p.name]}">
  <div class="ij-phase-head"><span class="ij-phase-num">Phase ${i + 1}</span><h3>${p.name}</h3><p>${p.note}</p>
    <div class="ij-phase-prog" data-phase-prog="${p.nums.map((n) => byNum(n).id).join(",")}"><span class="ij-phase-bar"><span></span></span><small><b>0</b>/${p.nums.length} done</small></div>
  </div>
  <ol class="ij-nodes">
    ${p.nums
      .map((n) => {
        const out = [node(byNum(n))];
        if (p.decision && p.decision.after === n) out.push(diamond(p.decision));
        return out.join("");
      })
      .join("")}
  </ol>
</div>`,
).join("");

/* ---------- Candidate vs company ---------- */
const sideRows = chapters
  .map(
    (c) => `
<tr>
  <th scope="row"><a href="#${anchor(c)}" data-open="${c.id}"><span>${pad(c.num)}</span> ${c.title}</a></th>
  <td><ul>${c.candidate.map((x) => `<li>${x}</li>`).join("")}</ul></td>
  <td><ul>${c.company.map((x) => `<li>${x}</li>`).join("")}</ul></td>
</tr>`,
  )
  .join("");

/* ---------- Chapters ---------- */
const chapterHtml = (c) => {
  const prev = chapters[c.num - 2];
  const next = chapters[c.num];
  return `
<article class="ij-chapter ij-reveal" id="${anchor(c)}" data-chapter="${c.id}" data-phase="${PHASE_KEY[c.phase]}" aria-labelledby="${anchor(c)}-title">
  <header class="ij-ch-head">
    <span class="ij-ch-num" aria-hidden="true">${pad(c.num)}</span>
    <div class="ij-ch-intro">
      <p class="ij-ch-meta">Chapter ${pad(c.num)} · ${c.phase} · ${c.time} min read</p>
      <h2 id="${anchor(c)}-title">${c.title}</h2>
      <p>${c.summary}</p>
    </div>
    <button type="button" class="ij-done" data-done="${c.id}" aria-pressed="false"><span class="ij-done-box" aria-hidden="true"></span><span class="ij-done-label">Mark complete</span></button>
  </header>
  <details class="ij-ch-details" data-details="${c.id}">
    <summary><span class="ij-open-label">Open chapter</span><span class="ij-close-label">Close chapter</span></summary>
    <div class="ij-ch-body">
      <div class="ij-sides">
        <div class="ij-side-you"><p class="ij-side-label">What you do</p><ul>${c.candidate.map((x) => `<li>${x}</li>`).join("")}</ul></div>
        <div class="ij-side-co"><p class="ij-side-label">What the company does</p><ul>${c.company.map((x) => `<li>${x}</li>`).join("")}</ul></div>
      </div>
      ${c.body}
      <footer class="ij-ch-foot">
        <div class="ij-ch-tools">${c.tools.map(([l, h]) => `<a class="ij-chip" href="${h}">${l}</a>`).join("")}</div>
        <div class="ij-ch-nav">
          ${prev ? `<a href="#${anchor(prev)}" data-open="${prev.id}" class="ij-btn ij-btn--ghost">← ${pad(prev.num)} ${prev.title}</a>` : ""}
          <button type="button" class="ij-btn ij-done-inline" data-done="${c.id}" aria-pressed="false">Mark chapter complete</button>
          ${next ? `<a href="#${anchor(next)}" data-open="${next.id}" class="ij-btn ij-btn--ghost">${pad(next.num)} ${next.title} →</a>` : ""}
        </div>
      </footer>
    </div>
  </details>
</article>`;
};

const tocHtml = chapters
  .map(
    (c) =>
      `<li data-toc="${c.id}"><a href="#${anchor(c)}" data-open="${c.id}"><span class="ij-toc-num">${pad(c.num)}</span><span class="ij-toc-title">${c.title}</span><span class="ij-toc-tick" aria-hidden="true"></span></a></li>`,
  )
  .join("");

const stageData = chapters.map((c) => ({
  id: c.id,
  num: c.num,
  phase: c.phase,
  title: c.title,
  summary: c.summary,
  candidate: c.candidate,
  company: c.company,
  tools: c.tools,
  time: c.time,
}));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LearningResource",
      "@id": `${PAGE}#journey`,
      name: "Interview Journey — the complete job search and hiring process",
      url: PAGE,
      description:
        "A free 17-chapter guide to the recruitment lifecycle in Kerala IT and beyond: job discovery, resumes, ATS, HR screening, assessments, interviews, offers, onboarding and rejection.",
      inLanguage: "en-IN",
      isAccessibleForFree: true,
      educationalLevel: ["Beginner", "Intermediate"],
      learningResourceType: "Guide",
      timeRequired: `PT${totalMinutes}M`,
      provider: { "@type": "Organization", name: "InfoparkDaily", url: SITE },
      hasPart: chapters.map((c) => ({
        "@type": "LearningResource",
        name: `Chapter ${c.num}: ${c.title}`,
        description: c.summary,
        url: `${PAGE}#${anchor(c)}`,
        timeRequired: `PT${c.time}M`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "InfoparkDaily",
          item: `${SITE}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Interview hub",
          item: `${SITE}/interview/`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Interview preparation",
          item: PAGE,
        },
      ],
    },
  ],
};

const ARROW = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" /></svg>`;

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>Interview Preparation – Complete Job Search &amp; Interview Journey | InfoparkDaily</title>
    <meta
      name="description"
      content="Learn the full hiring journey in 17 free chapters: find jobs on InfoparkDaily and other portals, write an ATS-friendly resume, pass HR screening, tests and interviews, negotiate CTC, read offer letters and join. Fresher and experienced tracks."
    />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta name="theme-color" content="#fafaf7" />
    <meta property="og:site_name" content="InfoparkDaily" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:title" content="Interview Journey – From job search to joining day" />
    <meta property="og:description" content="17 interactive chapters on how hiring really works — candidate side and company side. Fresher and experienced tracks." />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${PAGE}" />
    <meta property="og:image" content="${SITE}/preview.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="canonical" href="${PAGE}" />
    <link rel="icon" href="/favicon.ico" />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <script>
      (function () {
        /* Career Tools: always light. */
        var root = document.documentElement;
        root.classList.remove("theme-light", "theme-dark");
        root.classList.add("theme-light");
        root.style.colorScheme = "light";
        root.style.backgroundColor = "#fafaf7";
        function syncBody() {
          if (!document.body) return false;
          document.body.classList.add("light");
          document.body.classList.remove("dark");
          try {
            var t = localStorage.getItem("ipd-ij-track-v1");
            if (t === "fresher" || t === "experienced") document.body.setAttribute("data-track", t);
          } catch (_e) {}
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
    <link rel="stylesheet" href="/css/career-nav.css?v=20261013header" />
    <link rel="stylesheet" href="/css/career-premium.css?v=20261102login" />
    <link rel="stylesheet" href="/css/interview-journey.css?v=${VERSION}" />
    <link rel="stylesheet" href="/css/interview-hub.css?v=${VERSION}" />
    <script defer src="/js/career-nav.js?v=${VERSION}"></script>
  </head>
  <body class="career-tools ij-page hub-page light" data-track="all">
    <a class="skip" href="#main">Skip to content</a>
${header()}

    <div class="ij-readbar" aria-hidden="true"><span data-readbar></span></div>
    <main id="main">
      <section class="ij-hero" aria-labelledby="ij-title">
        <div class="ij-wrap ij-hero-grid">
          <div class="ij-hero-copy">
            <nav class="ij-crumbs" aria-label="Breadcrumb"><a href="/">InfoparkDaily</a> / <a href="/interview/">Interview hub</a> / <span aria-current="page">Interview preparation</span></nav>
            <p class="ij-badge-hero"><b>FREE</b> 17 chapters · fresher &amp; experienced tracks</p>
            <h1 id="ij-title">From job search<br /><span>to joining day.</span></h1>
            <p class="ij-lede">
              How hiring really works, step by step. See what <strong>you</strong> should do at each stage and what happens
              <strong>inside the company</strong> after you apply. It covers job discovery, resumes, ATS, HR screening, tests,
              interviews, salary, offers and onboarding, with real examples and ready-to-copy templates.
            </p>
            <div class="ij-hero-cta">
              <a class="ij-btn ij-btn--yellow" href="#where">Where am I in my journey? ${ARROW}</a>
              <a class="ij-btn ij-btn--ghost" href="#${anchor(chapters[0])}" data-open="${chapters[0].id}" data-continue>Start at chapter 1</a>
            </div>
            <ul class="ij-hero-stats">
              <li><strong>17</strong><span>chapters</span></li>
              <li><strong>${Math.round(totalMinutes / 60)} hrs</strong><span>of learning</span></li>
              <li><strong>2</strong><span>career tracks</span></li>
              <li><strong>130+</strong><span>answers, templates &amp; examples</span></li>
            </ul>
          </div>
          <div class="ij-hero-card" aria-labelledby="ij-track-title">
            <p class="ij-kicker" id="ij-track-title">Choose your track</p>
            <div class="ij-track-switch" role="group" aria-label="Career track">
              <button type="button" data-set-track="fresher" aria-pressed="false">
                <strong>Fresher / beginner</strong><span>First job · projects · internships · aptitude</span>
              </button>
              <button type="button" data-set-track="experienced" aria-pressed="false">
                <strong>Experienced</strong><span>Job switch · CTC · notice period · negotiation</span>
              </button>
              <button type="button" data-set-track="all" aria-pressed="true">
                <strong>Show both</strong><span>Compare the two journeys</span>
              </button>
            </div>
            <p class="ij-small">You can switch at any time. Chapters show content for the track you choose.</p>
            <div class="ij-hero-progress" aria-live="polite">
              <div class="ij-ring" data-ring style="--p: 0"><span data-progress-pct>0%</span></div>
              <div><strong data-progress-count>0 of ${chapters.length}</strong><span>chapters complete</span></div>
            </div>
          </div>
        </div>
        <div class="ij-wrap">
          <ol class="ij-hero-path" aria-label="The four phases of hiring">
            <li data-phase="prepare"><span class="ij-hp-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M11 4a7 7 0 1 0 4.2 12.6L20 21.4 21.4 20l-4.8-4.8A7 7 0 0 0 11 4Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"/></svg></span><strong>Prepare</strong><small>Find · research · resume · apply</small><em>01–06</em></li>
            <li data-phase="company"><span class="ij-hp-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 21V5l8-3 8 3v16h-6v-5h-4v5H4Zm4-12h2V7H8v2Zm6 0h2V7h-2v2Zm-6 4h2v-2H8v2Zm6 0h2v-2h-2v2Z"/></svg></span><strong>Inside the company</strong><small>ATS · HR screening · shortlist</small><em>07–08</em></li>
            <li data-phase="interviews"><span class="ij-hp-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 4h16v11H8l-4 4V4Zm4 4v2h8V8H8Zm0 4h5v-2H8v2Z"/></svg></span><strong>Interviews</strong><small>HR · tests · technical · manager · CTC</small><em>09–13</em></li>
            <li data-phase="decision"><span class="ij-hp-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9.5 16.2 5.3 12l-1.4 1.4 5.6 5.6L20.1 8.4 18.7 7l-9.2 9.2Z"/></svg></span><strong>Decision</strong><small>Selection · offer · joining · next steps</small><em>14–17</em></li>
          </ol>
        </div>
      </section>

${hubNav("preparation", true)}
      <nav class="ij-subnav" aria-label="On this page">
        <div class="ij-wrap"><div class="ij-subnav-track">
          <a href="#where" data-spy="where">Where am I?</a>
          <a href="#map" data-spy="map">Journey map</a>
          <a href="#sides" data-spy="sides">Two sides</a>
          <a href="#compare" data-spy="compare">Fresher vs experienced</a>
          <a href="#rounds" data-spy="rounds">Interview rounds</a>
          <a href="#paths" data-spy="paths">Offer or rejection</a>
          <a href="#chapters" data-spy="chapters">17 chapters</a>
          <a href="#glossary" data-spy="glossary">Glossary</a>
          <a href="#faq" data-spy="faq">FAQ</a>
          <a href="#tools" data-spy="tools">Tools</a>
          <a href="#more" data-spy="more">Career hub</a>
        </div></div>
      </nav>

      <section class="ij-section" id="where" aria-labelledby="where-title">
        <div class="ij-wrap">
          <div class="ij-head">
            <p class="ij-eyebrow">Career companion</p>
            <h2 id="where-title">Where am I in my job journey?</h2>
            <p>Pick the situation closest to yours. We’ll point you to the chapter and tool that help next.</p>
          </div>
          <div class="ij-where ij-reveal" role="group" aria-label="Your current situation">
            ${SITUATIONS.map(
              ([label, n], i) =>
                `<button type="button" class="ij-where-btn" data-where="${i}" aria-pressed="false"><span class="ij-where-num">${pad(n)}</span>${label}</button>`,
            ).join("")}
          </div>
          <div class="ij-where-result" id="where-result" aria-live="polite" hidden></div>
        </div>
      </section>

      <section class="ij-section ij-section--dark" id="map" aria-labelledby="map-title">
        <div class="ij-wrap">
          <div class="ij-head">
            <p class="ij-eyebrow">The recruitment lifecycle</p>
            <h2 id="map-title">The complete hiring journey</h2>
            <p>Select any stage to see what happens there, what you should do, and what the company is doing at the same time.</p>
          </div>
          <div class="ij-map ij-reveal">${journeyMap}</div>
          <p class="ij-map-legend"><span class="ij-legend-node"></span> Stage — select for details <span class="ij-legend-diamond"></span> Decision point <span class="ij-legend-done"></span> Completed</p>
        </div>
      </section>

      <section class="ij-section" id="sides" aria-labelledby="sides-title">
        <div class="ij-wrap">
          <div class="ij-head">
            <p class="ij-eyebrow">Two sides of every stage</p>
            <h2 id="sides-title">Candidate side vs company side</h2>
            <p>While you wait, a lot is happening on the other side. This view shows both at once.</p>
          </div>
          <div class="ij-table-wrap ij-sides-table" tabindex="0" role="region" aria-label="Candidate and company actions per stage">
            <table class="ij-table">
              <thead><tr><th scope="col">Stage</th><th scope="col">You (candidate)</th><th scope="col">Company (HR, recruiter, manager)</th></tr></thead>
              <tbody>${sideRows}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="ij-section ij-section--soft" id="compare" aria-labelledby="compare-title">
        <div class="ij-wrap">
          <div class="ij-head">
            <p class="ij-eyebrow">Two journeys</p>
            <h2 id="compare-title">Fresher vs experienced</h2>
            <p>The stages are the same, but what matters at each stage is different.</p>
          </div>
          <div class="ij-table-wrap" tabindex="0" role="region" aria-label="Fresher vs experienced comparison">
            <table class="ij-table ij-compare">
              <thead><tr><th scope="col">Stage</th><th scope="col">Fresher / beginner</th><th scope="col">Experienced professional</th></tr></thead>
              <tbody>
                <tr><th scope="row">Where to search</th><td>InfoparkDaily fresher &amp; walk-in filters, internships, mass-hiring portals, campus drives</td><td>InfoparkDaily experienced &amp; referral filters, LinkedIn, Naukri, recruiter outreach, referrals</td></tr>
                <tr><th scope="row">Resume focus</th><td>Projects, internships, skills, education — one page</td><td>Achievements with numbers, relevant experience, 1–2 pages</td></tr>
                <tr><th scope="row">ATS keywords</th><td>Core skills from the JD and project tools</td><td>Exact tools, domain terms, role titles</td></tr>
                <tr><th scope="row">Profiles</th><td>LinkedIn + GitHub/portfolio; Internshala; Naukri fresher profile</td><td>Optimised LinkedIn headline, Open to Work (recruiters only), updated Naukri</td></tr>
                <tr><th scope="row">Assessments</th><td>Aptitude, reasoning, basic coding/MCQ</td><td>Coding, take-home tasks, domain or system design</td></tr>
                <tr><th scope="row">Interviews</th><td>Fundamentals and your project</td><td>Real systems you built, scenarios, decisions, leadership</td></tr>
                <tr><th scope="row">Salary talk</th><td>Fixed fresher bands — little negotiation</td><td>Current vs expected CTC, negotiation, joining bonus, buyout</td></tr>
                <tr><th scope="row">Joining</th><td>Can often join immediately; training/bond clauses</td><td>Notice period 30–90 days, counteroffers, relieving letter, BGV</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="ij-section" id="rounds" aria-labelledby="rounds-title">
        <div class="ij-wrap">
          <div class="ij-head">
            <p class="ij-eyebrow">Interview round timeline</p>
            <h2 id="rounds-title">What a typical hiring process looks like</h2>
            <p>Not every company runs every round. Small companies may combine them into one or two; large ones may add more.</p>
          </div>
          <ol class="ij-timeline ij-reveal">
            <li><span class="ij-tl-time">Day 0</span><h3>Application</h3><p>Portal, email, referral or walk-in.</p><a href="#ch-application-strategy" data-open="application-strategy">Chapter 03</a></li>
            <li><span class="ij-tl-time">Day 1–14</span><h3>Screening</h3><p>ATS filters and recruiter review.</p><a href="#ch-hr-screening" data-open="hr-screening">Chapter 07</a></li>
            <li><span class="ij-tl-time">10–20 min</span><h3>HR call</h3><p>Fit, availability, CTC, notice.</p><a href="#ch-initial-interview" data-open="initial-interview">Chapter 09</a></li>
            <li><span class="ij-tl-time">30–120 min</span><h3>Assessment</h3><p>Aptitude, coding or practical task.</p><a href="#ch-technical-assessment" data-open="technical-assessment">Chapter 10</a></li>
            <li><span class="ij-tl-time">45–60 min</span><h3>Technical</h3><p>Skills, projects, problem-solving.</p><a href="#ch-technical-interview" data-open="technical-interview">Chapter 11</a></li>
            <li><span class="ij-tl-time">30–45 min</span><h3>Managerial</h3><p>Team fit, ownership, judgement.</p><a href="#ch-managerial-round" data-open="managerial-round">Chapter 12</a></li>
            <li><span class="ij-tl-time">20–30 min</span><h3>Final HR</h3><p>Salary, joining, policies.</p><a href="#ch-final-hr-round" data-open="final-hr-round">Chapter 13</a></li>
            <li><span class="ij-tl-time">2–10 days</span><h3>Decision &amp; offer</h3><p>Approvals, then the offer letter.</p><a href="#ch-selection" data-open="selection">Chapter 14</a></li>
          </ol>
        </div>
      </section>

      <section class="ij-section ij-section--soft" id="paths" aria-labelledby="paths-title">
        <div class="ij-wrap">
          <div class="ij-head">
            <p class="ij-eyebrow">After the final round</p>
            <h2 id="paths-title">Offer path and rejection path</h2>
          </div>
          <div class="ij-paths ij-reveal">
            <div class="ij-path ij-path--offer">
              <h3>Selected</h3>
              <ol>
                <li>Verbal offer from HR</li>
                <li>Written offer letter + CTC annexure</li>
                <li>Review, negotiate once, accept in writing</li>
                <li>Documents &amp; background verification</li>
                <li>Resign and serve notice (experienced)</li>
                <li>Joining day &amp; induction</li>
              </ol>
              <a class="ij-btn" href="#ch-offer-stage" data-open="offer-stage">Offer chapter</a>
            </div>
            <div class="ij-path-split" aria-hidden="true"><span>Final decision</span></div>
            <div class="ij-path ij-path--reject">
              <h3>Not selected</h3>
              <ol>
                <li>Rejection email — or no response</li>
                <li>Thank them, ask for feedback once</li>
                <li>Review your answers and fix gaps</li>
                <li>Improve resume and skills</li>
                <li>Apply to other roles (and reapply later)</li>
                <li>Keep the weekly routine going</li>
              </ol>
              <a class="ij-btn ij-btn--ghost" href="#ch-rejection-journey" data-open="rejection-journey">Next-steps chapter</a>
            </div>
          </div>
        </div>
      </section>

      <section class="ij-section" id="chapters" aria-labelledby="chapters-title">
        <div class="ij-wrap">
          <div class="ij-head ij-head--row">
            <div>
              <p class="ij-eyebrow">Learn every stage</p>
              <h2 id="chapters-title">The 17 chapters</h2>
              <p>Open any chapter on its own, or go from 1 to 17. Mark chapters complete to track your progress on this device.</p>
            </div>
            <div class="ij-head-actions">
              <button type="button" class="ij-btn ij-btn--ghost" data-expand="open">Expand all</button>
              <button type="button" class="ij-btn ij-btn--ghost" data-expand="close">Collapse all</button>
            </div>
          </div>
          <div class="ij-layout">
            <aside class="ij-aside" aria-label="Your progress">
              <div class="ij-aside-inner">
                <div class="ij-aside-progress">
                  <div class="ij-ring ij-ring--sm" data-ring style="--p: 0"><span data-progress-pct>0%</span></div>
                  <div><strong data-progress-count>0 of ${chapters.length}</strong><span>complete</span></div>
                </div>
                <div class="ij-bar" aria-hidden="true"><span data-progress-bar></span></div>
                <div class="ij-aside-track" role="group" aria-label="Career track">
                  <button type="button" data-set-track="fresher" aria-pressed="false">Fresher</button>
                  <button type="button" data-set-track="experienced" aria-pressed="false">Experienced</button>
                  <button type="button" data-set-track="all" aria-pressed="true">Both</button>
                </div>
                <details class="ij-toc-wrap" open>
                  <summary>Chapters</summary>
                  <ol class="ij-toc">${tocHtml}</ol>
                </details>
                <button type="button" class="ij-reset" data-reset>Reset progress</button>
              </div>
            </aside>
            <div class="ij-chapters">${chapters.map(chapterHtml).join("")}</div>
          </div>
        </div>
      </section>

      <section class="ij-section ij-section--soft" id="glossary" aria-labelledby="glossary-title">
        <div class="ij-wrap">
          <div class="ij-head ij-head--row">
            <div>
              <p class="ij-eyebrow">Hiring words, explained</p>
              <h2 id="glossary-title">Glossary</h2>
              <p>CTC, BGV, UAN, C2H… the terms recruiters use, in plain English.</p>
            </div>
            <label class="ij-search"><span class="ij-sr">Search the glossary</span><input type="search" placeholder="Search terms (e.g. notice)" data-glossary-search autocomplete="off" /></label>
          </div>
          <dl class="ij-glossary ij-reveal">${GLOSSARY.map(([t, d]) => `<div class="ij-term" data-term="${esc((t + " " + d).toLowerCase())}"><dt>${t}</dt><dd>${d}</dd></div>`).join("")}</dl>
          <p class="ij-small" data-glossary-empty hidden>No matching term. Try another word.</p>
        </div>
      </section>

      <section class="ij-section" id="faq" aria-labelledby="faq-title">
        <div class="ij-wrap ij-faq-wrap">
          <div class="ij-head">
            <p class="ij-eyebrow">Common questions</p>
            <h2 id="faq-title">Frequently asked questions</h2>
          </div>
          <div class="ij-qa ij-faq">${FAQ.map(([q, a]) => `<details class="ij-qa-item"><summary>${q}</summary><div class="ij-qa-body"><p>${a}</p></div></details>`).join("")}</div>
        </div>
      </section>

      <section class="ij-section ij-section--dark" id="tools" aria-labelledby="tools-title">
        <div class="ij-wrap">
          <div class="ij-head">
            <p class="ij-eyebrow">InfoparkDaily career tools</p>
            <h2 id="tools-title">Everything you need for each stage</h2>
          </div>
          <div class="ij-toolgrid ij-reveal">
            <a href="/jobs/"><strong>Job board</strong><span>Latest Kerala IT &amp; non-IT openings</span></a>
            <a href="/join/"><strong>Community job alerts</strong><span>WhatsApp &amp; Instagram updates</span></a>
            <a href="/resume-builder/"><strong>Resume builder</strong><span>Free ATS-friendly PDF</span></a>
            <a href="/resume-builder/templates/"><strong>Resume templates</strong><span>Pick a layout to start</span></a>
            <a href="/ats-checker/"><strong>ATS checker</strong><span>Private keyword &amp; readability check</span></a>
            <a href="/resume-builder/email-examples/"><strong>Email examples</strong><span>Copy-ready job emails</span></a>
          </div>
          <div class="ij-related">
            <p class="ij-kicker">Related guides</p>
            <ul>
              <li><a href="/guides/fresher-guide-kochi-it-parks/">Fresher guide to Kochi IT parks</a></li>
              <li><a href="/guides/how-to-apply-infopark-technopark-jobs/">How to apply for Infopark &amp; Technopark jobs</a></li>
              <li><a href="/guides/resume-guide-kerala-it-jobs/">Resume guide for Kerala IT jobs</a></li>
              <li><a href="/guides/interview-preparation-kerala-it/">Interview preparation</a></li>
              <li><a href="/guides/kerala-it-salary-guide/">Kerala IT salary guide</a></li>
              <li><a href="/guides/offer-letter-notice-period-guide/">Offer letter &amp; notice period</a></li>
              <li><a href="/guides/verify-jobs-before-you-apply/">Verify jobs before you apply</a></li>
              <li><a href="/guides/career-switch-into-kerala-it/">Career switch into Kerala IT</a></li>
            </ul>
          </div>
        </div>
      </section>

${featureDuo("journey")}

      <section class="ij-wrap ij-final" aria-labelledby="final-title">
        <h2 id="final-title">Your next opportunity is already posted.</h2>
        <p>Start with today’s openings on InfoparkDaily, and come back here at each stage.</p>
        <div class="ij-hero-cta">
          <a class="ij-btn ij-btn--yellow" href="/jobs/">Browse jobs ${ARROW}</a>
          <a class="ij-btn ij-btn--ghost" href="/join/">Join job alerts</a>
        </div>
      </section>
    </main>

${footer()}

    <dialog class="ij-dialog" id="ij-stage-dialog" aria-labelledby="ij-dialog-title">
      <div class="ij-dialog-inner">
        <button type="button" class="ij-dialog-close" data-dialog-close aria-label="Close">×</button>
        <p class="ij-dialog-meta" data-d="meta"></p>
        <h2 id="ij-dialog-title" data-d="title"></h2>
        <p data-d="summary"></p>
        <div class="ij-sides">
          <div class="ij-side-you"><p class="ij-side-label">What you do</p><ul data-d="candidate"></ul></div>
          <div class="ij-side-co"><p class="ij-side-label">What the company does</p><ul data-d="company"></ul></div>
        </div>
        <div class="ij-dialog-tools" data-d="tools"></div>
        <div class="ij-dialog-actions">
          <button type="button" class="ij-btn ij-btn--yellow" data-d="open">Read the full chapter</button>
          <button type="button" class="ij-btn ij-btn--ghost" data-d="done" aria-pressed="false">Mark complete</button>
        </div>
      </div>
    </dialog>
    <button type="button" class="ij-top" data-top aria-label="Back to top" hidden><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4l-6 6 1.4 1.4L9 7.8V16h2V7.8l3.6 3.6L16 10l-6-6Z"/></svg></button>
    <div class="ij-toast" id="ij-toast" role="status" aria-live="polite"></div>

    <script type="application/json" id="ij-stages">${JSON.stringify(stageData).replace(/</g, "\\u003c")}</script>
    <script>window.IJ_SITUATIONS = ${JSON.stringify(
      SITUATIONS.map(([label, n, why, tool]) => ({
        label,
        chapter: byNum(n).id,
        num: n,
        title: byNum(n).title,
        why,
        tool,
      })),
    ).replace(/</g, "\\u003c")};</script>
    <script src="/js/interview-journey.js?v=${VERSION}" defer></script>
    <script src="/js/site.js?v=20261102chk5" defer></script>
  </body>
</html>
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);
const words = html
  .replace(/<script[\s\S]*?<\/script>/g, "")
  .replace(/<[^>]+>/g, " ")
  .split(/\s+/)
  .filter(Boolean).length;
console.log(
  `Wrote ${path.relative(root, OUT)} — ${chapters.length} chapters, ~${words} words, ${totalMinutes} min`,
);

fs.mkdirSync(path.dirname(OLD_OUT), { recursive: true });
fs.writeFileSync(
  OLD_OUT,
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Interview preparation | InfoparkDaily</title><meta name="robots" content="noindex"><link rel="canonical" href="${PAGE}"><meta http-equiv="refresh" content="0; url=/interview/preparation/"><script>location.replace("/interview/preparation/" + location.hash);</script></head><body><p>Moved to <a href="/interview/preparation/">Interview preparation</a>.</p></body></html>\n`
);

buildQuestions();

const HUB_OUT = {
  "interview/index.html": overviewPage,
  "interview/learning/index.html": learningPage,
  "interview/email-guide/index.html": emailPage,
  "interview/resume-ats/index.html": resumePage
};
for (const [rel, fn] of Object.entries(HUB_OUT)) {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, fn());
  console.log(`Wrote ${rel}`);
}
