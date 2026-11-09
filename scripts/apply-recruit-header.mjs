// Write the shared site header (+ Recruit section bar) into every Recruit page's pre-rendered
// HTML, link css/site-header.css, and mark <body> so phone padding applies. Safe to re-run.
import { readFile, writeFile, readdir } from "node:fs/promises";
import { header } from "../js/infoparkdaily/ui.js";

const V = process.argv[2] || "20261109sec2";
const dirs = ["", ...(await readdir("infoparkdaily", { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name)];
let done = 0;
for (const route of dirs) {
  const path = "infoparkdaily/" + (route ? route + "/" : "") + "index.html";
  let html;
  try { html = await readFile(path, "utf8"); } catch { continue; }
  const start = html.indexOf('<a class="skip" href="#main">');
  const oldEnd = html.indexOf("</header>", start);
  const newEnd = html.indexOf("</nav>", html.indexOf('<nav class="section-bar"', start));
  /* Pages pre-rendered by build-community.mjs carry a header to replace; the others are
     drawn entirely by the app, so they only need the stylesheet and body class. */
  if (start >= 0) {
    const end = html.includes('<nav class="section-bar"', start) && newEnd > 0 ? newEnd + 6 : oldEnd + 9;
    html = html.slice(0, start) + header(route) + html.slice(end);
  }
  html = html.replace(/<link rel="stylesheet" href="\/css\/site-header\.css\?v=[^"]*">/, "");
  html = html.replace(/(<link rel="stylesheet" href="\/css\/infoparkdaily\/app\.css\?v=[^"]*">)/, `$1<link rel="stylesheet" href="/css/site-header.css?v=${V}">`);
  html = html.replace(/<body(?: class="([^"]*)")?>/, (m, c) => (c && c.includes("has-site-header") ? m : `<body class="${c ? c + " " : ""}has-site-header light">`));
  html = html.replace(/<html lang="en"(?: class="[^"]*")?>/, '<html lang="en" class="theme-light">');
  await writeFile(path, html);
  done += 1;
}
console.log("updated", done, "Recruit pages");
