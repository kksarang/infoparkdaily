import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage();
await p.goto("https://www.tcs.com/careers/india/tcs-bsc-ignite-Hiring", { waitUntil: "networkidle", timeout: 60000 }).catch(()=>{});
await p.waitForTimeout(4000);
const t = (await p.evaluate(() => document.body.innerText)).replace(/\s+/g, " ");
const i = Math.max(0, t.indexOf("Registration Process"));
console.log(t.slice(i, i + 5000));
await b.close();
