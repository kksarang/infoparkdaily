import { chromium } from "playwright";
import { spawn } from "node:child_process";
const srv = spawn("python3", ["-m", "http.server", "8799", "-d", "/Users/sarangr/infoparkdaily"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 800));
const b = await chromium.launch({ channel: "chrome", headless: true });

const p = await b.newPage({ viewport: { width: 768, height: 800 } });
await p.route("**/*", r => r.request().url().includes("127.0.0.1") || /fonts/.test(r.request().url()) ? r.continue() : r.abort());
await p.goto("http://127.0.0.1:8799/portfolio/demo/consultant-signature/", { waitUntil: "load" });
await p.waitForTimeout(600);
console.log(await p.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const introcopy = document.querySelector('.intro-copy');
  const lines = [`intro-copy offsetW=${introcopy?.offsetWidth} scrollW=${introcopy?.scrollWidth}`];
  
  if (introcopy) {
    for (const el of introcopy.querySelectorAll('*')) {
      const s = getComputedStyle(el);
      if (el.scrollWidth > vw || el.offsetWidth > vw) {
        let cls = el.tagName.toLowerCase();
        if (el.id) cls += '#' + el.id;
        [...el.classList].slice(0,3).forEach(c => cls += '.'+c);
        lines.push(`WIDE: ${cls} offsetW=${el.offsetWidth} scrollW=${el.scrollWidth} minW=${s.minWidth} display=${s.display}`);
      }
    }
    // Also check offsetLeft position 
    for (const el of introcopy.querySelectorAll('*')) {
      let left = 0, cur = el;
      while (cur && cur !== document.body) { left += cur.offsetLeft; cur = cur.offsetParent; }
      const right = left + el.offsetWidth;
      if (right > vw + 2) {
        let cls = el.tagName.toLowerCase();
        if (el.id) cls += '#' + el.id;
        [...el.classList].slice(0,3).forEach(c => cls += '.'+c);
        const s = getComputedStyle(el);
        lines.push(`OFFSET-RIGHT: ${cls} left=${left} right=${right} minW=${s.minWidth}`);
      }
    }
    // Also check intro section layout
    const intro = document.querySelector('.intro');
    const introS = getComputedStyle(intro);
    lines.push(`intro: offsetW=${intro.offsetWidth} scrollW=${intro.scrollWidth} grid=${introS.gridTemplateColumns}`);
    for (const child of intro.children) {
      lines.push(`  intro child: ${child.tagName}.${[...child.classList].join('.')} offsetW=${child.offsetWidth} scrollW=${child.scrollWidth}`);
    }
  }
  return lines.join("\n");
}));
await b.close(); srv.kill();
