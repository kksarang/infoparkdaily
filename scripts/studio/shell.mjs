// Shared frame for generated Daily Web Studio pages.
//
// The header, footer, icon sprite and a few visuals are copied from studio/index.html, so the
// landing page stays the single source for shared chrome. layout() wraps a page body with the
// head (title, description, canonical, Open Graph, robots, JSON-LD) and that chrome.
// updateSitemap() rewrites the Studio block of sitemap.xml from the indexable Studio pages.
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const SITE = "https://infoparkdaily.online";
export const V = "20261109t1";
export const OG_IMAGE = `${SITE}/assets/studio/og.jpg`;
export const WHATSAPP = "919995254290";

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
export const ICO = (n) => `<svg class="i" aria-hidden="true"><use href="#i-${n}"/></svg>`;
export const NEW = (t) => `/studio/app/#/new${t ? `?type=${t}` : ""}`;
export const wa = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

/* ---------- chrome copied from the landing page ---------- */
const landing = await readFile(join(ROOT, "studio/index.html"), "utf8");
const cut = (from, to, incl = true) => {
  const a = landing.indexOf(from);
  const b = landing.indexOf(to, a);
  if (a < 0 || b < 0) throw new Error(`Landing marker missing: ${from}`);
  return landing.slice(a, incl ? b + to.length : b);
};
export const SPRITE = cut('<svg width="0" height="0"', "</svg>\n");
export const HEADER = cut('  <header class="lx-hd">', '<div class="lx-scrim" aria-hidden="true"></div>');
export const FOOTER = cut('  <footer class="lx-foot2">', "</footer>");
export const EDITOR = cut('<div class="lx-app" aria-hidden="true">', '\n        </div>\n        <div class="lx-cl lx-cl--r"', false);
export const CODE = cut('<div class="lx-code" aria-label="Example of an exported site">', "</pre>\n            </div>\n          </div>");

/* ---------- structured data ---------- */
export const ORG = {
  "@type": "Organization",
  "@id": `${SITE}/#org`,
  name: "InfoparkDaily",
  url: `${SITE}/`,
  logo: `${SITE}/assets/logo-infoparkdaily.png`,
  sameAs: [
    "https://www.instagram.com/infoparkdaily/",
    "https://www.facebook.com/profile.php?id=61590569168309",
    "https://www.threads.com/@infoparkdaily",
    "https://t.me/infoparkDailyupdate",
  ],
};
export const APP = {
  "@type": "SoftwareApplication",
  "@id": `${SITE}/studio/#app`,
  name: "Daily Web Studio",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Website builder",
  operatingSystem: "Web browser",
  url: `${SITE}/studio/`,
  publisher: { "@id": `${SITE}/#org` },
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR", description: "Free during early access" },
};
export const faqLd = (faq) => ({
  "@type": "FAQPage",
  mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});
export const crumbsLd = (crumbs) => ({
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, ...(url ? { item: SITE + url } : {}) })),
});

/** Visible breadcrumb. crumbs = [["Studio", "/studio/"], ["Pricing"]] */
export const crumbsHtml = (crumbs) =>
  `<nav class="dp-crumbs" aria-label="Breadcrumb">${crumbs
    .map(([n, u], i) => (i === crumbs.length - 1 ? `<span aria-current="page">${esc(n)}</span>` : u ? `<a href="${u}">${esc(n)}</a>` : `<span>${esc(n)}</span>`))
    .join('<span aria-hidden="true">/</span>')}</nav>`;

/**
 * Full HTML page.
 * index: false keeps a page out of search (held-back trust pages, app-only pages).
 */
export function layout({ path, title, desc, body, index = true, crumbs, jsonld = [], scripts = [], bodyClass = "lx dp" }) {
  const graph = [ORG, ...(crumbs ? [crumbsLd(crumbs)] : []), ...jsonld];
  const robots = index ? "index, follow, max-image-preview:large" : "noindex";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="robots" content="${robots}">
  <meta name="theme-color" content="#ffffff">
  <link rel="canonical" href="${SITE}${path}">
  <link rel="icon" href="/assets/studio/favicon.svg" type="image/svg+xml">
  <meta property="og:site_name" content="Daily Web Studio by InfoparkDaily">
  <meta property="og:locale" content="en_IN">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${SITE}${path}">
  <meta property="og:image" content="${OG_IMAGE}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c")}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Fraunces:opsz,wght@9..144,600&family=Inter:wght@400;500;600;700&display=swap">
  <link rel="stylesheet" href="/css/studio.css?v=${V}">
</head>
<body class="${bodyClass}">
  ${SPRITE}
  <a class="skip" href="#main">Skip to content</a>
${HEADER}

  <main id="main">
${body}
  </main>

${FOOTER}
  <script type="module" src="/js/studio/landing.js?v=${V}"></script>
${scripts.map((s) => `  <script type="module" src="${s}?v=${V}"></script>`).join("\n")}
</body>
</html>
`;
}

/** Shared closing call to action. */
export const ctaBand = (title = "Ready when you are.", text = "Start free during early access. No card needed.", href = NEW()) => `
    <div class="lx-wrap">
      <section class="lx-cta" aria-label="Get started">
        <h2>${esc(title)}</h2>
        <p>${esc(text)}</p>
        <a class="btn" href="${href}">Start building${ICO("arrow")}</a>
      </section>
    </div>`;

/** Shared FAQ block (two-column with accordion). */
export const faqBlock = (id, heading, faq) => `
    <section class="dp-section" aria-labelledby="${id}"><div class="lx-wrap lx-faq">
      <div class="lx-faq-aside"><p class="lx-eyebrow">Questions</p><h2 class="lx-h2" id="${id}" style="margin-top:12px">${esc(heading)}</h2><p class="lx-sub">Something else on your mind? We usually reply within one working day.</p><a class="btn btn--ghost" href="/studio/help/">Visit the help centre</a></div>
      <div class="lx-acc">${faq.map(([q, a], i) => `<details${i === 0 ? " open" : ""}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
    </div></section>`;

/* ---------- sitemap ---------- */
async function* pages(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* pages(p);
    else if (e.name === "index.html") yield p;
  }
}

/** Rewrites the Studio block of sitemap.xml with every indexable page under /studio/. */
export async function updateSitemap() {
  const urls = [];
  for await (const file of pages(join(ROOT, "studio"))) {
    const html = await readFile(file, "utf8");
    if (/<meta name="robots" content="noindex/.test(html)) continue;
    const rel = file.slice(ROOT.length).replace(/index\.html$/, "");
    /* Skip pages that name another URL as canonical (e.g. design pages duplicated under /portfolio/). */
    const canon = html.match(/<link rel="canonical" href="([^"]+)"/);
    if (canon && canon[1] !== SITE + rel) continue;
    urls.push(rel);
  }
  urls.sort((a, b) => a.length - b.length || a.localeCompare(b));
  const today = new Date().toISOString().slice(0, 10);
  const block = `  <!-- studio:start (generated by scripts/studio/shell.mjs) -->\n${urls
    .map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n")}\n  <!-- studio:end -->\n`;
  const file = join(ROOT, "sitemap.xml");
  let xml = await readFile(file, "utf8");
  xml = xml.includes("<!-- studio:start")
    ? xml.replace(/  <!-- studio:start[\s\S]*?<!-- studio:end -->\n/, block)
    : xml.replace("</urlset>", block + "</urlset>");
  await writeFile(file, xml);
  return urls.length;
}
