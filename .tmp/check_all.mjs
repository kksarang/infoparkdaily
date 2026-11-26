import { chromium } from "playwright";
import fs from "node:fs";
const cand = JSON.parse(fs.readFileSync("/tmp/pdi_cand.json", "utf8"));
const CLOSED = /(page you are looking for doesn'?t exist|position has been filled|no longer (available|accepting|active|open)|job is no longer|not available at this time|this job (has )?(expired|closed)|job you are looking for is expired|job not found|page not found|404|position is closed|posting has (expired|closed)|applications? (are |is )?closed|registration (status: )?closed|submission ?closed|this requisition|no longer exists|couldn.t find|job has been (removed|closed)|not available for application|expired|has ended|unpublished|archived)/i;
let b; try { b = await chromium.launch({ channel: "chrome", headless: true }); } catch { b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true }); }
const ctx = await b.newContext({ userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36" });
await ctx.route("**/*.{png,jpg,jpeg,gif,webp,svg,woff,woff2,mp4}", r => r.abort());
const out = [];
async function one(c) {
  if (/\.pdf($|\?)/i.test(c.u)) { out.push({ ...c, kind: "pdf" }); return; }
  const p = await ctx.newPage();
  try {
    const r = await p.goto(c.u, { waitUntil: "domcontentloaded", timeout: 30000 });
    await p.waitForTimeout(5000);
    const t = (await p.evaluate(() => document.body?.innerText || "")).replace(/\s+/g, " ");
    const m = t.slice(0, 6000).match(CLOSED);
    out.push({ ...c, s: r?.status(), f: p.url(), title: (await p.title()).slice(0, 120), closed: (r && r.status() >= 400) || !!m, why: m ? m[0] : (r && r.status() >= 400 ? "HTTP " + r.status() : ""), len: t.length, t: t.slice(0, 2500) });
  } catch (e) { out.push({ ...c, err: e.message.slice(0, 100) }); }
  finally { await p.close().catch(() => {}); }
}
const N = 10;
for (let i = 0; i < cand.length; i += N) { await Promise.all(cand.slice(i, i + N).map(one)); if (i % 100 === 0) console.log("done", i); }
await b.close();
fs.writeFileSync("/tmp/pdi_cand_checked.json", JSON.stringify(out, null, 1));
const open = out.filter(o => !o.closed && !o.err && o.kind !== "pdf");
console.log("total", out.length, "closed", out.filter(o => o.closed).length, "err", out.filter(o => o.err).length, "pdf", out.filter(o => o.kind === "pdf").length, "maybe-open", open.length);
