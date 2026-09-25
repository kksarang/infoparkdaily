// Responsive audit: loads every page at phone, tablet and desktop widths and
// reports horizontal page scroll plus visible elements that spill past the
// viewport edge. Usage:
//   node tests/responsive/audit.mjs            # all pages
//   node tests/responsive/audit.mjs /jobs/ /   # selected paths
// Serves the repo root itself on a free port; needs system Chrome.
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, stat, readdir } from "node:fs/promises";
import { extname, join, resolve, relative } from "node:path";

const ROOT = resolve(import.meta.dirname, "../..");
const SKIP_DIRS = new Set(["node_modules", ".git", "vendor", "artifacts", "firebase", "data"]);
const VIEWPORTS = [
  [320, 568],
  [360, 740],
  [375, 667],
  [390, 844],
  [414, 896],
  [480, 800],
  [667, 375],
  [768, 1024],
  [820, 1180],
  [1024, 768],
  [1280, 800],
  [1440, 900],
  [1920, 1080],
  [2560, 1440],
];
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
};

async function listPages(dir = ROOT, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await listPages(full, out);
    else if (entry.name.endsWith(".html")) {
      const rel = "/" + relative(ROOT, full).split("\\").join("/");
      out.push(rel.endsWith("/index.html") ? rel.slice(0, -"index.html".length) : rel);
    }
  }
  return out;
}

function serve() {
  const server = createServer(async (req, res) => {
    let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let file = join(ROOT, path);
    if (!file.startsWith(ROOT)) return res.writeHead(403).end();
    try {
      if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    } catch {
      if (!extname(file)) file += ".html";
    }
    try {
      const body = await readFile(file);
      res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  return new Promise((ok) => server.listen(0, "127.0.0.1", () => ok(server)));
}

// Runs in the page. Returns horizontal-scroll width and the outermost visible
// elements that extend beyond the viewport without an ancestor clipping them.
function measure() {
  const vw = document.documentElement.clientWidth;
  const scrollW = Math.max(document.documentElement.scrollWidth, document.body?.scrollWidth || 0);
  const clips = (el) => {
    const s = getComputedStyle(el);
    return s.overflowX !== "visible" || s.contain.includes("paint");
  };
  const clippedByAncestor = (el) => {
    // Also check body and html — overflow:clip on them prevents visual overflow
    // without creating a scroll container, so the user cannot see the content.
    for (let p = el.parentElement; p; p = p.parentElement) {
      if (clips(p)) {
        const r = p.getBoundingClientRect();
        if (r.right <= vw + 1 && r.left >= -1) return true;
        // body/html may be exactly viewport-width; treat them as clipping when
        // overflowX is non-visible (hidden, clip, scroll, auto).
        if (p === document.body || p === document.documentElement) return true;
      }
      if (p === document.documentElement) break;
    }
    return false;
  };
  const hidden = (el) => {
    for (let p = el; p; p = p.parentElement) {
      const s = getComputedStyle(p);
      if (s.display === "none" || s.visibility === "hidden" || Number(s.opacity) === 0) return true;
      if (p.getAttribute("aria-hidden") === "true" || p.hasAttribute("inert")) return true;
    }
    return false;
  };
  const describe = (el) => {
    let d = el.tagName.toLowerCase();
    if (el.id) d += "#" + el.id;
    const cls = [...el.classList].slice(0, 3).join(".");
    if (cls) d += "." + cls;
    const parent = el.parentElement;
    if (parent && parent !== document.body) {
      let pd = parent.tagName.toLowerCase();
      if (parent.id) pd += "#" + parent.id;
      else if (parent.classList[0]) pd += "." + parent.classList[0];
      d = pd + " > " + d;
    }
    return d;
  };
  const offenders = [];
  for (const el of document.body.querySelectorAll("*")) {
    if (el.closest("svg") && el.tagName.toLowerCase() !== "svg") continue;
    if (["script", "style", "noscript", "template", "br", "option"].includes(el.tagName.toLowerCase())) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const over = Math.round(Math.max(r.right - vw, -r.left));
    if (over <= 1) continue;
    if (r.right <= 0) continue; // parked off the left edge (skip links, drawers): never scrolls
    if (clippedByAncestor(el)) continue;
    const s = getComputedStyle(el);
    const invisible = hidden(el);
    // Invisible or fixed-position spill only matters when it actually widens the page.
    if ((invisible || s.position === "fixed") && scrollW - vw <= 1) continue;
    offenders.push({ el, over: invisible ? `${over}px hidden` : `${over}px` });
  }
  // Keep only the outermost offender in each chain.
  const set = new Set(offenders.map((o) => o.el));
  const top = offenders.filter((o) => {
    for (let p = o.el.parentElement; p; p = p.parentElement) if (set.has(p)) return false;
    return true;
  });
  return {
    vw,
    scroll: scrollW - vw,
    offenders: top.slice(0, 8).map((o) => `${describe(o.el)} (+${o.over})`),
  };
}

const paths = process.argv.slice(2).length ? process.argv.slice(2) : (await listPages()).sort();
const server = await serve();
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({ deviceScaleFactor: 1, reducedMotion: "reduce" });
await context.route("**/*", (route) => {
  const url = route.request().url();
  if (url.startsWith(base) || /fonts\.(googleapis|gstatic)\.com|cdnjs|jsdelivr/.test(url)) return route.continue();
  return route.abort();
});
// Stop service workers and unhandled errors from interfering with runs.
await context.addInitScript(() => {
  try {
    Object.defineProperty(navigator, "serviceWorker", { value: undefined });
  } catch {}
});

let failures = 0;
const queue = [...paths];
async function worker() {
  const page = await context.newPage();
  while (queue.length) {
    const path = queue.shift();
    const problems = [];
    try {
      await page.setViewportSize({ width: VIEWPORTS[0][0], height: VIEWPORTS[0][1] });
      await page.goto(base + path, { waitUntil: "load", timeout: 20000 }).catch(() => {});
      await page.waitForTimeout(400);
      for (const [width, height] of VIEWPORTS) {
        await page.setViewportSize({ width, height });
        await page.waitForTimeout(120);
        const r = await page.evaluate(measure);
        if (r.scroll > 1 || r.offenders.length) problems.push({ width, height, ...r });
      }
    } catch (error) {
      problems.push({ width: 0, error: String(error.message || error).split("\n")[0] });
    }
    if (problems.length) {
      failures++;
      console.log(`\n✗ ${path}`);
      for (const p of problems) {
        if (p.error) console.log(`   error: ${p.error}`);
        else console.log(`   ${p.width}x${p.height}  page-scroll:+${Math.max(0, p.scroll)}px  ${p.offenders.join(" | ")}`);
      }
    } else {
      console.log(`✓ ${path}`);
    }
  }
  await page.close();
}
await Promise.all(Array.from({ length: 6 }, worker));
await browser.close();
server.close();
console.log(`\n${paths.length - failures}/${paths.length} pages clean across ${VIEWPORTS.length} viewports`);
process.exitCode = failures ? 1 : 0;
