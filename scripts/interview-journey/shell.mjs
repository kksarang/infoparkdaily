/* Shared chrome for the Interview & Career Hub (/interview/) and Interview Journey pages. */
import { esc } from "./helpers.mjs";

export const SITE = "https://infoparkdaily.online";
export const ASSET_V = "20261104hub";

/* ---------- hub sections (single source of truth) ---------- */
export const HUB = [
  {
    key: "preparation",
    href: "/interview/preparation/",
    num: "01",
    title: "Interview Preparation",
    short: "Preparation",
    badge: "Featured",
    text: "Prepare for interviews step by step — understand each round, improve communication and walk in confident.",
    points: ["Beginner / fresher preparation", "Experienced professional preparation", "Interview process & rounds", "HR and technical interview tips"],
    cta: "Explore preparation"
  },
  {
    key: "questions",
    href: "/interview/questions/",
    num: "02",
    title: "Interview Questions & Answers",
    short: "Questions",
    text: "Frequently asked questions with explanations and sample answers you can adapt.",
    points: ["HR interview questions", "Technical questions for 21 IT subjects", "21 non-IT career fields", "Fresher and experienced levels"],
    cta: "Practise questions"
  },
  {
    key: "learning",
    href: "/interview/learning/",
    num: "03",
    title: "Learning & Skill Development",
    short: "Learning",
    text: "Build the technical and professional skills employers test — with free courses, certifications and roadmaps.",
    points: ["Technical skill roadmaps", "Communication skills", "Free courses & certifications", "Learning platforms & resources"],
    cta: "Start learning"
  },
  {
    key: "email",
    href: "/interview/email-guide/",
    num: "04",
    title: "Professional Email Guide",
    short: "Email guide",
    text: "Write professional emails for applying, sending your resume, following up and replying to recruiters.",
    points: ["Job application emails", "Sending your resume to HR", "Recruiter follow-up emails", "Interview confirmation & reply", "Thank-you emails"],
    cta: "Open email guide"
  },
  {
    key: "resume",
    href: "/interview/resume-ats/",
    num: "05",
    title: "Resume & ATS Preparation",
    short: "Resume & ATS",
    text: "Build a professional resume and understand how applicant tracking systems screen it.",
    points: ["Resume building", "ATS score checking", "Common resume mistakes", "Resume optimisation"],
    cta: "Resume & ATS guide"
  }
];

/* ---------- illustrations (inline SVG, brand colours) ---------- */
export const ILLUS = {
  preparation: `<svg viewBox="0 0 240 150" role="img" aria-hidden="true"><rect x="0" y="0" width="240" height="150" rx="18" fill="#12151b"/><circle cx="196" cy="30" r="40" fill="#ffc107" opacity=".18"/><rect x="26" y="34" width="86" height="82" rx="12" fill="#fff"/><circle cx="69" cy="62" r="13" fill="#ffc107"/><rect x="47" y="82" width="44" height="20" rx="10" fill="#262b35"/><rect x="128" y="34" width="86" height="82" rx="12" fill="#262b35"/><circle cx="171" cy="62" r="13" fill="#fff"/><rect x="149" y="82" width="44" height="20" rx="10" fill="#ffc107"/><path d="M112 75h16" stroke="#ffc107" stroke-width="3" stroke-dasharray="4 4"/><rect x="58" y="124" width="124" height="8" rx="4" fill="#ffc107"/></svg>`,
  questions: `<svg viewBox="0 0 240 150" role="img" aria-hidden="true"><rect width="240" height="150" rx="18" fill="#ffc107"/><rect x="22" y="26" width="128" height="52" rx="14" fill="#12151b"/><path d="M42 78l-6 16 20-16" fill="#12151b"/><rect x="38" y="40" width="80" height="8" rx="4" fill="#ffc107"/><rect x="38" y="56" width="56" height="8" rx="4" fill="#fff" opacity=".6"/><rect x="92" y="84" width="128" height="44" rx="14" fill="#fff"/><path d="M198 128l6 14-20-14" fill="#fff"/><rect x="108" y="98" width="88" height="7" rx="3.5" fill="#12151b"/><rect x="108" y="111" width="60" height="7" rx="3.5" fill="#12151b" opacity=".4"/><text x="186" y="64" font-family="Space Grotesk, Arial" font-size="40" font-weight="700" fill="#12151b">?</text></svg>`,
  learning: `<svg viewBox="0 0 240 150" role="img" aria-hidden="true"><rect width="240" height="150" rx="18" fill="#f2f2ec"/><path d="M120 30l70 30-70 30-70-30 70-30z" fill="#12151b"/><path d="M80 74v26c0 10 18 18 40 18s40-8 40-18V74l-40 17-40-17z" fill="#262b35"/><path d="M190 60v36" stroke="#ffc107" stroke-width="4" stroke-linecap="round"/><circle cx="190" cy="100" r="6" fill="#ffc107"/><rect x="24" y="112" width="40" height="22" rx="6" fill="#ffc107"/><rect x="176" y="118" width="40" height="16" rx="6" fill="#12151b"/></svg>`,
  email: `<svg viewBox="0 0 240 150" role="img" aria-hidden="true"><rect width="240" height="150" rx="18" fill="#12151b"/><rect x="40" y="34" width="160" height="96" rx="12" fill="#fff"/><path d="M40 46l80 50 80-50" fill="none" stroke="#12151b" stroke-width="5" stroke-linejoin="round"/><circle cx="196" cy="38" r="18" fill="#ffc107"/><path d="M188 38l6 6 10-12" fill="none" stroke="#12151b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  resume: `<svg viewBox="0 0 240 150" role="img" aria-hidden="true"><rect width="240" height="150" rx="18" fill="#fff6d6"/><rect x="50" y="18" width="96" height="118" rx="10" fill="#fff" stroke="#12151b" stroke-width="3"/><circle cx="74" cy="44" r="10" fill="#ffc107"/><rect x="90" y="38" width="44" height="6" rx="3" fill="#12151b"/><rect x="90" y="48" width="30" height="5" rx="2.5" fill="#12151b" opacity=".4"/><rect x="64" y="66" width="70" height="5" rx="2.5" fill="#12151b" opacity=".5"/><rect x="64" y="78" width="60" height="5" rx="2.5" fill="#12151b" opacity=".5"/><rect x="64" y="90" width="66" height="5" rx="2.5" fill="#12151b" opacity=".5"/><rect x="64" y="102" width="50" height="5" rx="2.5" fill="#12151b" opacity=".5"/><circle cx="172" cy="88" r="34" fill="#12151b"/><path d="M172 88m-24 0a24 24 0 1 1 48 0" fill="none" stroke="#ffc107" stroke-width="7" stroke-linecap="round"/><text x="172" y="98" text-anchor="middle" font-family="Space Grotesk, Arial" font-size="20" font-weight="700" fill="#fff">ATS</text></svg>`,
  jobs: `<svg viewBox="0 0 240 150" role="img" aria-hidden="true"><rect width="240" height="150" rx="18" fill="#ffc107"/><rect x="30" y="40" width="180" height="90" rx="14" fill="#12151b"/><rect x="92" y="24" width="56" height="22" rx="8" fill="none" stroke="#12151b" stroke-width="6"/><rect x="30" y="78" width="180" height="6" fill="#ffc107"/><rect x="108" y="70" width="24" height="22" rx="5" fill="#fff"/></svg>`
};

/* ---------- InfoparkDaily community channels ---------- */
export const CHANNELS = [
  ["whatsapp", "WhatsApp channel", "Daily job alerts", "https://whatsapp.com/channel/0029VbDJFfA4Y9lm5L4kpm22"],
  ["whatsapp", "WhatsApp group", "Community group", "https://chat.whatsapp.com/CpjcQa9otzR3yu9sVP05eB"],
  ["instagram", "@infoparkdaily.jobs", "Job posts on Instagram", "https://www.instagram.com/infoparkdaily.jobs/"],
  ["instagram", "@infoparkdaily", "Community & reels", "https://www.instagram.com/infoparkdaily/"]
];
const CH_ICON = {
  whatsapp:
    '<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/>',
  instagram:
    '<path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm5.3-3.6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"/>'
};

/** Row of community channel links (dark or light variant). */
export const channelsRow = (variant = "dark", heading = "Join our job alert channels") => `
            <div class="ch-row ch-row--${variant}">
              <p class="ch-title">${heading}</p>
              <div class="ch-list">
                ${CHANNELS.map(
                  ([kind, name, desc, url]) =>
                    `<a class="ch ch--${kind}" href="${url}" target="_blank" rel="noopener noreferrer"><span class="ch-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${CH_ICON[kind]}</svg></span><span class="ch-text"><strong>${name}</strong><small>${desc}</small></span><span class="ch-go" aria-hidden="true">↗</span></a>`
                ).join("")}
              </div>
              <a class="ch-all" href="/join/">All ways to join InfoparkDaily →</a>
            </div>`;

/* ---------- menu + chrome ---------- */
export const storeNav = () => `
        <nav id="store-nav" aria-label="Career tools">
          <a href="/resume-builder/">Resume builder</a>
          <a href="/ats-checker/">ATS checker</a>
          <a href="/interview/">Interview prep</a>
          <a href="/resume-builder/email-examples/">Email examples</a>
          <a href="/resume-builder/templates/">Resume templates</a>
          <a href="/portfolio/">Portfolio</a>
          <a href="/portfolio/templates/">Portfolio templates</a>
          <span id="account-nav"><a class="store-signin" href="/resume-builder/sign-in/?next=%2Finterview%2F">Sign in</a></span>
        </nav>`;

export const header = () => `
    <header class="store-header career-store-header">
      <div class="width">
        <a class="store-brand" href="/" aria-label="Infopark Daily home">
          <img src="/assets/icons/favicon-192.png" alt="" width="36" height="36" />
          <span>InfoparkDaily<small>CAREER TOOLS</small></span>
        </a>
        <button id="store-menu" type="button" aria-expanded="false" aria-controls="store-nav" aria-label="Open menu">
          <span class="store-menu-bars" aria-hidden="true"><span></span><span></span><span></span></span>
        </button>${storeNav()}
      </div>
    </header>`;

export const footer = () => `
    <footer class="footer rb-width">
      <span>© InfoparkDaily · Career tools for job seekers. Examples are for learning; company names in samples are fictional.</span>
      <div>
        <a href="/jobs/">Jobs</a>
        <a href="/interview/">Interview hub</a>
        <a href="/interview/preparation/">Preparation</a>
        <a href="/interview/questions/">Questions</a>
        <a href="/interview/learning/">Learning</a>
        <a href="/interview/email-guide/">Email guide</a>
        <a href="/resume-builder/">Resume builder</a>
        <a href="/ats-checker/">ATS checker</a>
        <a href="/terms/#career-tools">Terms</a>
        <a href="/privacy/">Privacy</a>
        <a href="/contact/">Contact</a>
      </div>
    </footer>`;

/** Tab bar linking all hub pages. */
export const hubNav = (current, isStatic = false) => `
      <nav class="hub-tabs${isStatic ? " hub-tabs--static" : ""}" aria-label="Interview & career hub">
        <div class="ij-wrap"><div class="hub-tabs-track">
          <a href="/interview/"${current === "overview" ? ' aria-current="page"' : ""}>Overview</a>
          ${HUB.map((h) => `<a href="${h.href}"${current === h.key ? ' aria-current="page"' : ""}>${h.short}</a>`).join("")}
          <a href="/jobs/" class="hub-tabs-jobs">Find jobs</a>
        </div></div>
      </nav>`;

export const crumbs = (items) =>
  `<nav class="ij-crumbs" aria-label="Breadcrumb">${items
    .map(([label, href], i) => (i < items.length - 1 ? `<a href="${href}">${label}</a>` : `<span aria-current="page">${label}</span>`))
    .join(" / ")}</nav>`;

export const crumbsLd = (items) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, href], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE + href }))
});

/* Icons + meta for the related-course cards. */
const REL = {
  preparation: { tone: "ink", meta: "17 chapters · 3.5 hrs", icon: '<path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3Zm-6 9.2V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-3.8l-6 3.3-6-3.3Z"/>' },
  questions: { tone: "yellow", meta: "354 questions · 44 subjects", icon: '<path d="M4 4h16v11H8l-4 4V4Zm7.1 3.2c-1.2 0-2 .6-2.3 1.7l1.3.5c.2-.6.5-.8 1-.8s.9.3.9.7c0 .3-.2.6-.7.9-.7.4-1 .9-1 1.6v.4h1.4v-.3c0-.4.2-.6.6-.9.8-.5 1.2-1 1.2-1.8 0-1.2-1-2-2.4-2Zm-.7 6.1v1.4h1.5v-1.4h-1.5Z"/>' },
  learning: { tone: "soft", meta: "8 roadmaps · live code", icon: '<path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4V4Zm16 0h-4a3 3 0 0 0-1 .2V20a2 2 0 0 1 2-2h3V4Z"/>' },
  email: { tone: "ink", meta: "11 templates · 20 min", icon: '<path d="M3 5h18v14H3V5Zm2 2v.5l7 4.6 7-4.6V7H5Zm14 2.9-7 4.6-7-4.6V17h14V9.9Z"/>' },
  resume: { tone: "cream", meta: "5 modules · 2 free tools", icon: '<path d="M6 2h9l5 5v15H6V2Zm8 1.5V8h4.5L14 3.5ZM9 12v1.5h8V12H9Zm0 3v1.5h8V15H9Zm0 3v1.5h5V18H9Z"/>' }
};

/** Related hub courses (excludes the current one). The next course in order is marked “Up next”. */
export const hubRelated = (current, heading = "Continue your preparation") => {
  const order = HUB.map((h) => h.key);
  const idx = order.indexOf(current);
  const nextKey = idx >= 0 ? order[(idx + 1) % order.length] : order[0];
  const list = HUB.filter((h) => h.key !== current);
  return `
      <section class="ij-section ij-section--soft hub-related" id="more" aria-labelledby="hub-related-title">
        <div class="ij-wrap">
          <div class="rel-head">
            <div>
              <p class="ij-eyebrow">Keep learning</p>
              <h2 id="hub-related-title">${heading}</h2>
              <p>Pick your next course. Everything is free and saves progress on this device.</p>
            </div>
            <a class="rel-back" href="/interview/">← Back to academy overview</a>
          </div>
          <div class="rel-grid">
            ${list
              .map((h) => {
                const r = REL[h.key];
                const next = h.key === nextKey;
                return `<a class="rel-card rel-card--${r.tone}${next ? " is-next" : ""}" href="${h.href}">
              <span class="rel-top">
                <span class="rel-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${r.icon}</svg></span>
                <span class="rel-num">Course ${h.num}</span>
                ${next ? '<span class="rel-next">Up next</span>' : ""}
              </span>
              <strong class="rel-title">${h.title}</strong>
              <span class="rel-text">${h.text}</span>
              <span class="rel-foot"><span class="rel-meta">${r.meta}</span><span class="rel-go" aria-hidden="true">→</span></span>
              <span class="ij-sr"> — ${h.cta}</span>
            </a>`;
              })
              .join("")}
          </div>
          <div class="rel-strip">
            <span>Ready to apply?</span>
            <a href="/jobs/">Find jobs on InfoparkDaily →</a>
            <a href="/resume-builder/templates/">Build resume</a>
            <a href="/ats-checker/">Check ATS score</a>
          </div>
        </div>
      </section>`;
};

/* Backwards-compatible alias used by older builders. */
export const featureDuo = (current) => hubRelated(current === "journey" ? "preparation" : current);

/** Full page document. */
export const pageShell = ({ title, description, path, ogTitle, ogDescription, jsonLd, bodyClass = "", main, scripts = [], extraCss = [] }) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${title}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta name="theme-color" content="#fafaf7" />
    <meta property="og:site_name" content="InfoparkDaily" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:title" content="${esc(ogTitle || title)}" />
    <meta property="og:description" content="${esc(ogDescription || description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${SITE}${path}" />
    <meta property="og:image" content="${SITE}/preview.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="canonical" href="${SITE}${path}" />
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
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/css/styles.css?v=20261102chk" />
    <link rel="stylesheet" href="/css/resume-builder.css?v=20260920r" />
    <link rel="stylesheet" href="/css/career-nav.css?v=20261013header" />
    <link rel="stylesheet" href="/css/career-premium.css?v=20261102login" />
    <link rel="stylesheet" href="/css/interview-journey.css?v=${ASSET_V}" />
    <link rel="stylesheet" href="/css/interview-hub.css?v=${ASSET_V}" />
    ${extraCss.map((c) => `<link rel="stylesheet" href="${c}" />`).join("\n    ")}
    <script defer src="/js/career-nav.js?v=${ASSET_V}"></script>
  </head>
  <body class="career-tools ij-page hub-page ${bodyClass} light" data-track="all">
    <a class="skip" href="#main">Skip to content</a>
${header()}
    <div class="ij-readbar" aria-hidden="true"><span data-readbar></span></div>
    <main id="main">
${main}
    </main>
${footer()}
    <button type="button" class="ij-top" data-top aria-label="Back to top" hidden><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4l-6 6 1.4 1.4L9 7.8V16h2V7.8l3.6 3.6L16 10l-6-6Z"/></svg></button>
    <div class="ij-toast" id="ij-toast" role="status" aria-live="polite"></div>
    ${scripts.map((s) => `<script src="${s}" defer></script>`).join("\n    ")}
    <script src="/js/site.js?v=20261102chk5" defer></script>
  </body>
</html>
`;
