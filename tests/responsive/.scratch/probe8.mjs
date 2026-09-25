import { chromium } from "playwright";
import { spawn } from "node:child_process";
const srv = spawn("python3", ["-m", "http.server", "8799", "-d", "/Users/sarangr/infoparkdaily"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 800));
const b = await chromium.launch({ channel: "chrome", headless: true });

for (const vw of [667, 1024]) {
  const p = await b.newPage({ viewport: { width: vw, height: 768 } });
  await p.route("**/*", r => r.request().url().includes("127.0.0.1") || /fonts/.test(r.request().url()) ? r.continue() : r.abort());
  await p.goto("http://127.0.0.1:8799/", { waitUntil: "load" });
  await p.waitForTimeout(600);
  console.log(await p.evaluate((vw) => {
    const hero = document.querySelector('.hero');
    const heroCont = hero?.querySelector('.hero-content');
    const heroViz = hero?.querySelector('.hero-visual');
    const container = hero?.closest('.container, .wrap, [class*="container"], [class*="wrap"], section') || hero?.parentElement;
    const lines = [`\n--- vw=${vw} ---`];
    for (const [name, el] of [['container', container], ['hero', hero], ['hero-content', heroCont], ['hero-visual', heroViz]]) {
      if (!el) continue;
      const s = getComputedStyle(el);
      lines.push(`${name}: offsetW=${el.offsetWidth} scrollW=${el.scrollWidth} overflowX=${s.overflowX} minW=${s.minWidth} display=${s.display}`);
    }
    // Check each child of hero-visual
    if (heroViz) {
      for (const child of heroViz.querySelectorAll('*')) {
        const s = getComputedStyle(child);
        let cls = child.tagName.toLowerCase();
        if (child.id) cls += '#' + child.id;
        if (child.className) cls += '.' + [...child.classList].slice(0,3).join('.');
        if (child.scrollWidth > vw || child.offsetWidth > vw) {
          lines.push(`  HV-child: ${cls} offsetW=${child.offsetWidth} scrollW=${child.scrollWidth} minW=${s.minWidth}`);
        }
      }
    }
    // Check hero-content children
    if (heroCont) {
      for (const child of heroCont.querySelectorAll('*')) {
        if (child.scrollWidth > hero?.offsetWidth || child.offsetWidth > hero?.offsetWidth) {
          let cls = child.tagName.toLowerCase();
          if (child.id) cls += '#' + child.id;
          if (child.className) cls += '.' + [...child.classList].slice(0,3).join('.');
          lines.push(`  HC-child: ${cls} offsetW=${child.offsetWidth} scrollW=${child.scrollWidth}`);
        }
      }
    }
    return lines.join("\n");
  }, vw));
  await p.close();
}
await b.close(); srv.kill();
