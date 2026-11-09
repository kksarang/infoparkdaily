// Give every Career Tools page the main site header (same as the home page) and turn the
// tools menu into the section bar beneath it. Idempotent: safe to run after any build.
//
//   node scripts/apply-site-header.mjs            # all Career Tools pages
//   node scripts/apply-site-header.mjs portfolio  # only pages under portfolio/
//
// The full-screen sign-in pages keep their own layout and are skipped.
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { siteHeaderHtml } from "../js/site-header.js";

const SKIP = new Set(["resume-builder/sign-in/index.html", "portfolio/sign-in/index.html", "auth/action/index.html"]);
const ROOTS = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["resume-builder", "ats-checker", "career-tools", "interview", "learning", "portfolio"];

const ASSET_V = "20261109nb";

/** The tools menu item for a page path, so the current tool is marked in the header. */
export function toolFor(path = "") {
  const p = "/" + String(path).replace(/^\.?\//, "").replace(/index\.html$/, "");
  if (p.startsWith("/ats-checker")) return "/ats-checker/";
  if (p.startsWith("/learning") || p.startsWith("/interview/learning")) return "/learning/";
  if (p.startsWith("/interview")) return "/interview/";
  if (p.startsWith("/resume-builder/email-examples")) return "/resume-builder/email-examples/";
  if (p.startsWith("/resume-builder/templates") || p.startsWith("/resume-builder/editor")) return "/resume-builder/templates/";
  if (p.startsWith("/portfolio")) return "/portfolio/templates/";
  if (p.startsWith("/resume-builder")) return "/resume-builder/";
  return "";
}

/** Transform one page's HTML: one header with the home design and the Career Tools menu. */
export function applySiteHeader(html, path = "") {
  /* The current tool is marked in the browser by js/career-nav.js, so generated pages and
     this script always write identical markup. (toolFor stays available for other uses.) */
  const header = siteHeaderHtml("tools");
  if (html.includes('data-section="tools"')) {
    /* Already converted: refresh it in place (keeps re-runs idempotent). */
    html = html.replace(/<header class="site-header glass" data-section="tools">[\s\S]*?<\/header>/, header);
  } else if (html.includes('class="store-header')) {
    /* Drop an earlier main-site header, then replace the old tools header with the new one. */
    html = html.replace(/<header class="site-header[^"]*"(?![^>]*data-section)[^>]*>[\s\S]*?<\/header>/, "");
    html = html.replace(/<header class="store-header[\s\S]*?<\/header>/, header);
  } else {
    return html;
  }
  /* Pages without the main stylesheet/script (Portfolio) get the shared header CSS and wiring. */
  if (!html.includes("/css/styles.css") && !html.includes("/css/site-header.css")) {
    html = html.replace(
      "</head>",
      `<link rel="stylesheet" href="/css/site-header.css?v=${ASSET_V}"><script type="module" src="/js/site-header-init.js?v=${ASSET_V}"></script></head>`,
    );
    html = html.replace(/<html lang="en"(?: class="([^"]*)")?>/, (m, c) => (c && c.includes("theme-light") ? m : `<html lang="en" class="${c ? c + " " : ""}theme-light">`));
  }
  return html;
}

async function* pages(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* pages(path);
    else if (entry.name === "index.html") yield path;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  let changed = 0;
  let seen = 0;
  for (const root of ROOTS) {
    for await (const path of pages(root)) {
      if (SKIP.has(path)) continue;
      const before = await readFile(path, "utf8");
      if (!before.includes('class="store-header') && !before.includes('data-section="tools"')) continue;
      seen += 1;
      const after = applySiteHeader(before, path);
      if (after !== before) {
        await writeFile(path, after);
        changed += 1;
      }
    }
  }
  console.log(`Career Tools pages with the site header: ${seen} (updated ${changed})`);
}
