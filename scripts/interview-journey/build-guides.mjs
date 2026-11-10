/**
 * Builds the field-wise interview guides at /interview/questions/<slug>/index.html
 * (e.g. "Web Development – 70 Important Interview Questions & Answers").
 * Content lives in guides/*.mjs (registered in guides/index.mjs). Called from build.mjs (npm run build:journey).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { esc, table } from "./helpers.mjs";
import { header, footer, hubNav, hubRelated, ASSET_V, SITE } from "./shell.mjs";
import { GUIDES } from "./guides/index.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
export const guideHref = (g) => `/interview/questions/${g.meta.slug}/`;
/** Learning-path slug → guide card info, used by the learning path pages. */
export const GUIDE_FOR_PATH = Object.fromEntries(
  GUIDES.map((g) => [g.meta.slug, { href: guideHref(g), title: `${g.meta.count} ${g.meta.name.toLowerCase()} interview questions`, text: `${g.meta.topics}, with answers.` }])
);

/* Inline formatting: escape, then `code` and **bold**. */
const inline = (s) =>
  esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

/* Answer text → HTML (paragraphs, bullets, numbered steps, code blocks, tables). */
function answerHtml(text) {
  const lines = text.split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (line.startsWith("```")) {
      const code = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      i++;
      out.push(`<pre><code>${esc(code.join("\n"))}</code></pre>`);
      continue;
    }
    if (line.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        rows.push(lines[i++].split("|").slice(1, -1).map((c) => inline(c.trim())));
      }
      const [head, ...body] = rows;
      out.push(table(head, body));
      continue;
    }
    const list = (re, tag, cls) => {
      const items = [];
      while (i < lines.length && re.test(lines[i])) items.push(inline(lines[i++].replace(re, "")));
      out.push(`<${tag}${cls ? ` class="${cls}"` : ""}>${items.map((x) => `<li>${x}</li>`).join("")}</${tag}>`);
    };
    if (/^- /.test(line)) { list(/^- /, "ul"); continue; }
    if (/^\d+\. /.test(line)) { list(/^\d+\. /, "ol"); continue; }
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(- |\d+\. |```|\|)/.test(lines[i])) para.push(lines[i++]);
    out.push(`<p>${inline(para.join(" "))}</p>`);
  }
  return out.join("");
}

/* Parse "## section / ### question / answer" text. */
function parse(src) {
  const sections = [];
  let sec = null;
  let q = null;
  for (const line of src.split("\n")) {
    if (line.startsWith("## ")) {
      sec = { title: line.slice(3).trim(), qs: [] };
      sections.push(sec);
      q = null;
    } else if (line.startsWith("### ")) {
      q = { q: line.slice(4).trim(), a: [] };
      sec.qs.push(q);
    } else if (q) {
      q.a.push(line);
    }
  }
  let n = 0;
  sections.forEach((s, si) => {
    s.id = `wd-${si + 1}`;
    s.qs.forEach((x) => {
      x.n = ++n;
      x.html = answerHtml(x.a.join("\n").trim());
      x.plain = x.a.join(" ").replace(/```/g, " ").replace(/[`*|]/g, " ").replace(/\s+/g, " ").trim();
    });
  });
  return { sections, total: n };
}

function guidePage(g) {
  const { meta } = g;
  const PAGE = SITE + guideHref(g);
  const { sections, total } = parse(g.text);
  if (total !== meta.count) throw new Error(`${meta.slug} guide should have ${meta.count} questions, found ${total}`);
  const NAME = meta.name;
  const others = GUIDES.filter((x) => x !== g);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        name: `${NAME} – ${total} Important Interview Questions & Answers`,
        url: PAGE,
        inLanguage: "en-IN",
        isPartOf: { "@type": "WebSite", name: "InfoparkDaily", url: SITE },
        mainEntity: sections.flatMap((s) =>
          s.qs.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.plain } }))
        )
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "InfoparkDaily", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Interview hub", item: `${SITE}/interview/` },
          { "@type": "ListItem", position: 3, name: "Interview questions", item: `${SITE}/interview/questions/` },
          { "@type": "ListItem", position: 4, name: NAME, item: PAGE }
        ]
      }
    ]
  };

  const sectionHtml = (s, si) => `
      <section class="ij-section${si % 2 ? " ij-section--soft" : ""} wd-section" id="${s.id}" aria-labelledby="${s.id}-title">
        <div class="ij-wrap">
          <div class="ij-head">
            <p class="ij-eyebrow">Part ${si + 1} · Questions ${s.qs[0].n}–${s.qs[s.qs.length - 1].n}</p>
            <h2 id="${s.id}-title">${esc(s.title)}</h2>
          </div>
          <div class="ij-qa wd-qa">
            ${s.qs
              .map(
                (x) => `<details class="ij-qa-item" id="wd-q${x.n}"><summary><span class="wd-num">${x.n}</span> ${inline(x.q)}</summary><div class="ij-qa-body"><p class="ij-qa-label">Answer</p>${x.html}</div></details>`
              )
              .join("\n            ")}
          </div>
        </div>
      </section>`;

  const practice = table(
    ["Area", "Practise this"],
    g.practice.map(([a, t]) => [esc(a), esc(t)]),
    "Practical tasks to prepare"
  );

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${esc(NAME)} Interview Questions &amp; Answers (${total}) | InfoparkDaily</title>
    <meta
      name="description"
      content="${total} important ${esc(NAME.toLowerCase())} interview questions with simple answers: ${esc(meta.topics)}. Free, for freshers and experienced candidates."
    />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta name="theme-color" content="#fafaf7" />
    <meta property="og:site_name" content="InfoparkDaily" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:title" content="${esc(NAME)} – ${total} Important Interview Questions &amp; Answers" />
    <meta property="og:description" content="${esc(meta.topics)} — ${esc(meta.level.toLowerCase())}." />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${PAGE}" />
    <meta property="og:image" content="${SITE}/preview.jpg" />
    <link rel="canonical" href="${PAGE}" />
    <link rel="icon" href="/favicon.ico" />
    <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>
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
    <link rel="stylesheet" href="/css/career-nav.css?v=20261109old" />
    <link rel="stylesheet" href="/css/career-premium.css?v=20261102login" />
    <link rel="stylesheet" href="/css/interview-journey.css?v=${ASSET_V}" />
    <link rel="stylesheet" href="/css/interview-hub.css?v=${ASSET_V}" />
    <link rel="stylesheet" href="/css/career-system.css?v=20261108ui" />
    <style>
      .wd-num { display: inline-grid; place-items: center; min-width: 1.9em; height: 1.9em; margin-right: 6px; border-radius: 8px; background: var(--ij-ink, #12151b); color: #fff; font-size: 0.8rem; font-weight: 800; }
      .wd-qa .ij-qa-body ul, .wd-qa .ij-qa-body ol { margin: 6px 0 8px; padding-left: 1.3em; }
      .wd-qa .ij-qa-body li { margin: 3px 0; }
      .wd-qa .ij-qa-body code { font-size: 0.88em; }
      .wd-toc { display: flex; flex-wrap: wrap; gap: 8px; margin: 18px 0 0; padding: 0; list-style: none; }
      .wd-toc a { display: inline-block; padding: 7px 12px; border-radius: 999px; background: #fff; border: 1px solid rgba(18, 21, 27, 0.14); font-weight: 600; font-size: 0.88rem; text-decoration: none; color: inherit; }
      .wd-toc a:hover { border-color: #12151b; }
      .wd-tools { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; }
    </style>
    <script defer src="/js/career-nav.js?v=20261109nb"></script>
  </head>
  <body class="career-tools ij-page hub-page iq-page light">
    <a class="skip" href="#main">Skip to content</a>
${header()}
    <main id="main">
      <section class="ij-hero iq-hero" aria-labelledby="wd-title">
        <div class="ij-wrap">
          <nav class="ij-crumbs" aria-label="Breadcrumb"><a href="/">InfoparkDaily</a> / <a href="/interview/">Interview hub</a> / <a href="/interview/questions/">Interview questions</a> / <span aria-current="page">${esc(NAME)}</span></nav>
          <p class="ij-badge-hero"><b>FREE</b> InfoparkDaily Learning · ${esc(meta.level)}</p>
          <h1 id="wd-title">${esc(NAME)}<br /><span>${total} important interview questions.</span></h1>
          <p class="ij-lede">
            Prepare for ${esc(NAME.toLowerCase())} interviews with ${total} important questions and answers on <strong>${esc(meta.topics)}</strong>.
            The answers are short and interview-friendly, so freshers and experienced candidates can understand them and explain them in their own words.
          </p>
          <ul class="ij-hero-stats">
            <li><strong>${total}</strong><span>questions</span></li>
            <li><strong>${sections.length}</strong><span>topics</span></li>
            <li><strong>${g.practice.length}</strong><span>practical tasks</span></li>
          </ul>
          <ul class="wd-toc" aria-label="Topics">
            ${sections.map((s) => `<li><a href="#${s.id}">${esc(s.title)}</a></li>`).join("")}
            <li><a href="#wd-practice">Practical tasks</a></li>
          </ul>
          <div class="wd-tools">
            <button type="button" class="ij-btn ij-btn--yellow" data-wd-expand="open">Expand all answers</button>
            <button type="button" class="ij-btn" data-wd-expand="close">Collapse all</button>
          </div>
        </div>
      </section>

${hubNav("questions")}
${sections.map(sectionHtml).join("\n")}

      <section class="ij-section ij-section--soft" id="wd-practice" aria-labelledby="wd-practice-title">
        <div class="ij-wrap">
          <div class="ij-head">
            <p class="ij-eyebrow">Beyond the ${total} questions</p>
            <h2 id="wd-practice-title">Practical interview tasks</h2>
            <p>Interviewers also ask you to write code and talk through your work. Practise these too.</p>
          </div>
          ${practice}
          <p class="ij-small" style="margin-top:16px">
            Want hands-on practice? Follow the <a href="/interview/learning/${meta.slug}/">${esc(NAME.toLowerCase())} learning path</a>, try the
            <a href="/learning/">InfoparkDaily Learning</a> tutorials and quizzes, or browse the full <a href="/interview/questions/">interview question bank</a>.
            Ready to apply? See the latest <a href="/jobs/">IT jobs</a>.
          </p>
          <h3 class="hub-h3" style="margin-top:22px">More interview guides</h3>
          <ul class="wd-toc">${others.map((x) => `<li><a href="${guideHref(x)}">${esc(x.meta.name)} (${x.meta.count})</a></li>`).join("")}</ul>
          <p class="ij-small">Original content by InfoparkDaily Learning. Answers are guidance — explain them in your own words and add examples from your projects.</p>
        </div>
      </section>
${hubRelated("questions")}
    </main>
${footer()}
    <script>
      document.addEventListener("click", function (e) {
        var b = e.target.closest("[data-wd-expand]");
        if (!b) return;
        var open = b.getAttribute("data-wd-expand") === "open";
        document.querySelectorAll(".wd-qa details").forEach(function (d) { d.open = open; });
      });
    </script>
    <script src="/js/site.js?v=20261110ip" defer></script>
  </body>
</html>
`;

  return { html, total };
}

export function buildGuides() {
  const slugs = new Set();
  let all = 0;
  for (const g of GUIDES) {
    if (slugs.has(g.meta.slug)) throw new Error(`Duplicate guide slug ${g.meta.slug}`);
    slugs.add(g.meta.slug);
    const { html, total } = guidePage(g);
    const out = path.join(root, guideHref(g).slice(1), "index.html");
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    all += total;
  }
  console.log(`Wrote ${GUIDES.length} interview guides — ${all} questions`);
}
