import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36" });
const r = await p.goto("https://dth.avature.net/en_US/careers/JobDetail?jobId=27802", { waitUntil: "networkidle", timeout: 60000 }).catch(e => null);
await p.waitForTimeout(4000);
console.log("STATUS", r?.status(), p.url(), "\nTITLE", await p.title());
console.log((await p.evaluate(() => document.body.innerText)).replace(/\n\s*\n+/g, "\n").slice(0, 9000));
await b.close();
