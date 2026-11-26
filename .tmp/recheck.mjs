import { chromium } from "playwright";
import fs from "node:fs";
const d = JSON.parse(fs.readFileSync("/tmp/pdi_cand_checked.json", "utf8"));
const want = d.filter(r => !r.kind && !r.closed && /myworkdayjobs|keka\.com|careers\.ibm|bsc-ignite|visa\.co\.in|screenloop|heizen|tnqtech|enterprisedb|deshaw|clootrack|infrrd|oceaneering|alstom|thomsonreuters|meesho|rippling|syfe|hitachids|powerschool|hetero|atkinsrealis|cornerstone|natwest|justdial|iqvia|zowork|clickup|blackfig|zluri/.test(r.u)).map(r=>r.u);
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36" });
const out = [];
async function one(u) {
  const p = await ctx.newPage();
  try {
    await p.goto(u, { waitUntil: "networkidle", timeout: 40000 }).catch(()=>{});
    await p.waitForTimeout(6000);
    const t = (await p.evaluate(() => document.body?.innerText || "")).replace(/\s+/g, " ");
    out.push({ u, f: p.url(), t: t.slice(0, 3000) });
  } catch (e) { out.push({ u, err: e.message.slice(0, 100) }); }
  finally { await p.close().catch(() => {}); }
}
for (let i = 0; i < want.length; i += 6) await Promise.all(want.slice(i, i + 6).map(one));
await b.close();
fs.writeFileSync("/tmp/pdi_recheck.json", JSON.stringify(out, null, 1));
console.log(want.length);
