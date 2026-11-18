/* Example resumes must score 90+ in the InfoparkDaily ATS checker, as real PDFs.
 *
 *   1. Start the site:   npm run dev          (or python3 scripts/serve-local.py --port 8000)
 *   2. Run:              node tests/resume-builder/examples-ats.check.mjs
 *      (optional)        BASE=http://127.0.0.1:8080 node tests/resume-builder/examples-ats.check.mjs
 *
 * For each example in js/resume-builder/examples.js it renders the resume in its recommended
 * template, builds the PDF exactly like the Download PDF button, reads the text back the way the
 * ATS checker reads an uploaded PDF, and scores it with js/ats-checker.js (no job description).
 * Fails if any example scores below 90, needs more pages than allowed (1, or 2 for senior examples), or has a recommended template
 * that doesn't exist.
 */
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:8000";
const MIN = 90;

const browser = await chromium.launch(process.env.CHROME === "0" ? {} : { channel: "chrome" });
const page = await browser.newPage();
await page.goto(BASE + "/resume-builder/", { waitUntil: "load" });
const rows = await page.evaluate(async () => {
  const R = await import("/js/resume-builder/render.js");
  const C = await import("/js/resume-builder/catalog.js");
  const E = await import("/js/resume-builder/examples.js?check=" + Date.now());
  const X = await import("/js/resume-builder/pdf-export.js?check=" + Date.now());
  await new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = "/vendor/pdfjs/pdf.min.js";
    s.onload = res;
    s.onerror = rej;
    document.head.append(s);
  });
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = "/vendor/pdfjs/pdf.worker.min.js";
  const out = [];
  /* The builder pages call publicTemplates() (thumbnails included); a broken catalog sync fails here. */
  try {
    if (C.publicTemplates().length !== C.catalog.length) out.push({ id: "catalog", error: "publicTemplates() lost templates" });
  } catch (e) {
    out.push({ id: "catalog", error: "publicTemplates() failed: " + e.message });
  }
  for (const ex of E.EXAMPLES) {
    const t = C.catalog.find((x) => x.id === ex.template);
    if (!t) {
      out.push({ id: ex.id, error: `recommended template "${ex.template}" not found` });
      continue;
    }
    const blob = await X.resumePdfBlob(R.renderResume(ex.data(), t.config), "Check");
    const pdf = await window.pdfjsLib.getDocument({ data: await blob.arrayBuffer() }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      /* Same line rebuilding as js/ats-checker.js extractPdf(). */
      const content = await (await pdf.getPage(i)).getTextContent();
      let lastY = null;
      let line = "";
      const lines = [];
      content.items.forEach((item) => {
        const y = item.transform ? Math.round(item.transform[5]) : null;
        if (lastY !== null && y !== null && Math.abs(y - lastY) > 2 && line.trim()) {
          lines.push(line.trim());
          line = "";
        }
        line += line && !/\s$/.test(line) && item.str && !/^\s/.test(item.str) ? ` ${item.str}` : item.str;
        if (item.hasEOL) {
          lines.push(line.trim());
          line = "";
          lastY = null;
        } else if (y !== null) lastY = y;
      });
      if (line.trim()) lines.push(line.trim());
      text += lines.filter(Boolean).join("\n") + "\n\n";
    }
    out.push({ id: ex.id, template: ex.template, pages: pdf.numPages, maxPages: ex.maxPages || 1, text });
  }
  return out;
});
await browser.close();

/* Load the ATS checker's scoring in Node with a minimal fake page. */
const el = () =>
  new Proxy(
    { addEventListener() {}, querySelectorAll: () => [], querySelector: () => null, classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, removeAttribute() {}, style: {}, dataset: {}, value: "", hidden: false, insertAdjacentElement() {}, scrollIntoView() {} },
    { get: (t, k) => (k in t ? t[k] : () => {}), set: (t, k, v) => ((t[k] = v), true) },
  );
const ctx = { window: {}, document: { getElementById: el, querySelectorAll: () => [], createElement: el, addEventListener() {} }, sessionStorage: { getItem: () => null, setItem() {}, removeItem() {} }, console };
vm.createContext(ctx);
vm.runInContext(readFileSync(new URL("../../js/ats-checker.js", import.meta.url), "utf8"), ctx);
const score = ctx.window.IPDAtsChecker.scoreResume;

let failed = 0;
for (const r of rows) {
  if (r.error) {
    failed += 1;
    console.log(`✖ ${r.id}: ${r.error}`);
    continue;
  }
  const s = score(r.text, "");
  const ok = s.score >= MIN && r.pages <= r.maxPages;
  if (!ok) failed += 1;
  console.log(`${ok ? "✔" : "✖"} ${r.id.padEnd(22)} ${String(s.score).padStart(3)}  ${r.pages} page  (${r.template})${s.ranking.length ? "  fixes: " + s.ranking.map((i) => i.title).join("; ") : ""}`);
}
console.log(failed ? `\n${failed} example(s) failed.` : `\nAll ${rows.length} examples score ${MIN}+ within their page limit.`);
process.exit(failed ? 1 : 0);
