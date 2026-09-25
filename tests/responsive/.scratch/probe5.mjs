import { chromium } from "playwright";
import { spawn } from "node:child_process";
const srv = spawn("python3", ["-m", "http.server", "8799", "-d", "/Users/sarangr/infoparkdaily"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 800));
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ viewport: { width: 1024, height: 768 } });
await p.route("**/*", r => r.request().url().includes("127.0.0.1") || /fonts/.test(r.request().url()) ? r.continue() : r.abort());
await p.goto("http://127.0.0.1:8799/", { waitUntil: "load" });
await p.waitForTimeout(600);
console.log(await p.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const scrollW = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
  const html = document.documentElement;
  const body = document.body;
  const htmlS = getComputedStyle(html);
  const bodyS = getComputedStyle(body);
  
  // Check min-width
  const lines = [
    `vw=${vw} scrollW=${scrollW}`,
    `html: overflowX=${htmlS.overflowX} minWidth=${htmlS.minWidth} width=${htmlS.width}`,
    `body: overflowX=${bodyS.overflowX} minWidth=${bodyS.minWidth} width=${bodyS.width} offsetWidth=${body.offsetWidth}`,
  ];
  
  // Check direct children of body with large offsetWidth
  for (const el of body.children) {
    const s = getComputedStyle(el);
    const desc = `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className ? '.' + el.className.trim().split(/\s+/).slice(0,2).join('.') : ''}`;
    if (el.scrollWidth > vw || el.offsetWidth > vw) {
      lines.push(`  child: ${desc} scrollW=${el.scrollWidth} offsetW=${el.offsetWidth} overflowX=${s.overflowX}`);
    }
  }
  
  // Check grandchildren too
  for (const el of body.querySelectorAll("*")) {
    const s = getComputedStyle(el);
    if (el.offsetWidth > vw && s.overflowX === 'visible') {
      let desc = el.tagName.toLowerCase();
      if (el.id) desc += "#" + el.id;
      const cls = [...el.classList].slice(0,3).join(".");
      if (cls) desc += "." + cls;
      lines.push(`  unconstrained: ${desc} offsetW=${el.offsetWidth}`);
    }
  }
  
  return lines.join("\n");
}));
await b.close(); srv.kill();
