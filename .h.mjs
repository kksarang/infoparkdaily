import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1440, height: 400 } });
for (const [u,n] of [["/","home"],["/learning/","learn"],["/jobs/","jobs"]]) {
  await p.goto("http://localhost:8765"+u, { waitUntil: "networkidle" });
  await p.evaluate(() => document.querySelectorAll("[class*=consent],[id*=consent]").forEach(e=>e.remove()));
  await p.screenshot({ path: process.argv[2]+"/hdr-"+n+".png", clip:{x:0,y:0,width:1440,height:140} });
  console.log(n, await p.evaluate(() => { const h=document.querySelector(".site-header"); return h? h.dataset.section+" | "+getComputedStyle(h).backgroundColor+" | body "+document.body.className : "none"; }));
}
await b.close();
