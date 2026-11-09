/* Resume PDF download check — run after changing templates, render.js or pdf-export.js.
 *
 *   1. Start the site:      python3 scripts/serve-local.py --port 8080
 *   2. Run the check:       npm run test:pdf
 *      (optional) BASE=http://127.0.0.1:8080 ONLY=simple-ats,atlas npm run test:pdf
 *
 * For every resume template it builds the PDF from the sample resume (exactly like the
 * Download PDF button) and checks: A4 pages, 1 page for the sample, ATS-readable text that
 * contains the name, email and job title, a sensible file size, and build time.
 * It also checks that an empty resume is refused instead of producing a broken file.
 * Exits with code 1 if anything fails.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE || "http://127.0.0.1:8080";
const ONLY = (process.env.ONLY || "").split(",").filter(Boolean);

const browser = await chromium.launch(process.env.CHROME === "0" ? {} : { channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(e.message));
await page.goto(BASE + "/resume-builder/", { waitUntil: "load" });

const report = await page.evaluate(async (only) => {
  const R = await import("/js/resume-builder/render.js");
  const S = await import("/js/resume-builder/schema.js");
  const C = await import("/js/resume-builder/catalog.js");
  const X = await import("/js/resume-builder/pdf-export.js?check=" + Date.now());
  await new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = "/vendor/pdfjs/pdf.min.js";
    s.onload = res;
    s.onerror = rej;
    document.head.append(s);
  });
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = "/vendor/pdfjs/pdf.worker.min.js";

  const data = S.sampleResume();
  const must = [data.personal?.name, data.personal?.email, data.personal?.headline || data.personal?.title]
    .filter(Boolean)
    .map((s) => String(s).toLowerCase());
  const rows = [];
  for (const t of C.catalog.filter((t) => t.config && (!only.length || only.includes(t.id)))) {
    const row = { id: t.id, family: t.config.family };
    try {
      const t0 = performance.now();
      const blob = await X.resumePdfBlob(R.renderResume(data, t.config), "Check");
      row.ms = Math.round(performance.now() - t0);
      row.kb = Math.round(blob.size / 1024);
      const pdf = await window.pdfjsLib.getDocument({ data: await blob.arrayBuffer() }).promise;
      row.pages = pdf.numPages;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const pg = await pdf.getPage(i);
        const v = pg.getViewport({ scale: 1 });
        if (Math.round(v.width) !== 595 || Math.round(v.height) !== 842) row.notA4 = true;
        text += (await pg.getTextContent()).items.map((x) => x.str).join(" ") + " ";
      }
      const flat = text.replace(/\s+/g, " ").toLowerCase();
      row.missing = must.filter((m) => !flat.includes(m));
    } catch (e) {
      row.error = String(e && e.message ? e.message : e);
    }
    rows.push(row);
  }
  let emptyRefused = false;
  try {
    await X.resumePdfBlob("<!doctype html><html><head></head><body></body></html>", "Empty");
  } catch {
    emptyRefused = true;
  }
  return { rows, emptyRefused, must };
}, ONLY);

let failed = 0;
for (const r of report.rows) {
  const problems = [];
  if (r.error) problems.push("error: " + r.error);
  if (r.notA4) problems.push("not A4");
  if (r.pages !== 1) problems.push(`${r.pages} pages (sample should be 1)`);
  if (r.missing?.length) problems.push("text missing: " + r.missing.join(", "));
  if (r.kb > 1500) problems.push(`${r.kb} KB is too large`);
  if (problems.length) {
    failed += 1;
    console.log(`FAIL ${r.id} (${r.family}): ${problems.join("; ")}`);
  }
}
const ok = report.rows.length - failed;
const times = report.rows.filter((r) => r.ms).map((r) => r.ms).sort((a, b) => a - b);
const sizes = report.rows.filter((r) => r.kb).map((r) => r.kb).sort((a, b) => a - b);
console.log(`\n${ok}/${report.rows.length} templates passed · text checked for: ${report.must.join(" | ")}`);
if (times.length) console.log(`build time median ${times[times.length >> 1]} ms, slowest ${times.at(-1)} ms · size ${sizes[0]}–${sizes.at(-1)} KB`);
console.log(`empty resume refused: ${report.emptyRefused ? "yes" : "NO"}`);
if (pageErrors.length) console.log("page errors:", pageErrors);
await browser.close();
if (failed || !report.emptyRefused || pageErrors.length) process.exit(1);
