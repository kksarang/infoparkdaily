import { chromium } from "playwright";
import { spawn } from "node:child_process";
const srv = spawn("python3", ["-m", "http.server", "8799", "-d", "/Users/sarangr/infoparkdaily"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 800));
const b = await chromium.launch({ channel: "chrome", headless: true });

// Bisect consultant-signature at 768px
const p = await b.newPage({ viewport: { width: 768, height: 800 } });
await p.route("**/*", r => r.request().url().includes("127.0.0.1") || /fonts/.test(r.request().url()) ? r.continue() : r.abort());
await p.goto("http://127.0.0.1:8799/portfolio/demo/consultant-signature/", { waitUntil: "load" });
await p.waitForTimeout(600);
console.log(await p.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const scrollW = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
  const lines = [`vw=${vw} scrollW=${scrollW}`];
  
  // Bisect: hide each child of main, check which removes scroll
  const main = document.querySelector('main') || document.body;
  for (const child of main.children) {
    const prev = child.style.display;
    child.style.display = 'none';
    const sw = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    child.style.display = prev;
    if (sw <= vw) {
      let cls = child.tagName.toLowerCase();
      if (child.id) cls += '#' + child.id;
      [...child.classList].slice(0, 3).forEach(c => cls += '.' + c);
      lines.push('CULPRIT: ' + cls);
      // Drill deeper
      for (const gchild of child.querySelectorAll('*')) {
        const prev2 = gchild.style.display;
        gchild.style.display = 'none';
        const sw2 = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
        gchild.style.display = prev2;
        if (sw2 <= vw) {
          let gcls = gchild.tagName.toLowerCase();
          if (gchild.id) gcls += '#' + gchild.id;
          [...gchild.classList].slice(0, 3).forEach(c => gcls += '.' + c);
          const gs = getComputedStyle(gchild);
          lines.push(`  sub: ${gcls} offsetW=${gchild.offsetWidth} scrollW=${gchild.scrollWidth} minW=${gs.minWidth}`);
          break;
        }
      }
      break;
    }
  }
  return lines.join("\n");
}));
await b.close(); srv.kill();
