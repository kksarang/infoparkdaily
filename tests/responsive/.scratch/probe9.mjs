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
  const heroViz = document.querySelector('.hero-visual');
  const heroVizW = heroViz?.offsetWidth;
  const lines = [`hero-visual: offsetW=${heroVizW} scrollW=${heroViz?.scrollWidth}`];
  if (heroViz) {
    for (const child of heroViz.querySelectorAll('*')) {
      const s = getComputedStyle(child);
      let cls = child.tagName.toLowerCase();
      if (child.id) cls += '#' + child.id;
      if (child.className) cls += '.' + [...child.classList].slice(0,3).join('.');
      if (child.offsetWidth > heroVizW || child.scrollWidth > heroVizW) {
        lines.push(`  ${cls} offsetW=${child.offsetWidth} scrollW=${child.scrollWidth} minW=${s.minWidth} display=${s.display} pos=${s.position}`);
      }
    }
    // Also show all direct children regardless
    for (const child of heroViz.children) {
      const s = getComputedStyle(child);
      let cls = child.tagName.toLowerCase();
      if (child.id) cls += '#' + child.id;
      if (child.className) cls += '.' + [...child.classList].slice(0,3).join('.');
      lines.push(`  direct: ${cls} offsetW=${child.offsetWidth} scrollW=${child.scrollWidth} minW=${s.minWidth}`);
    }
  }
  return lines.join("\n");
}));
await b.close(); srv.kill();
