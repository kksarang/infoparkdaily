import { chromium } from "playwright";
import { spawn } from "node:child_process";
const srv = spawn("python3", ["-m", "http.server", "8799", "-d", "/Users/sarangr/infoparkdaily"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 800));
const b = await chromium.launch({ channel: "chrome", headless: true });

for (const [path, vw] of [["/portfolio/demo/consultant-signature/", 768], ["/portfolio/demo/sidebar-folio/", 320]]) {
  const p = await b.newPage({ viewport: { width: vw, height: 800 } });
  await p.route("**/*", r => r.request().url().includes("127.0.0.1") || /fonts/.test(r.request().url()) ? r.continue() : r.abort());
  await p.goto(`http://127.0.0.1:8799${path}`, { waitUntil: "load" });
  await p.waitForTimeout(600);
  console.log(await p.evaluate((vw) => {
    const sw = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    const lines = [`\n${location.pathname} vw=${vw} scrollW=${sw}`];
    for (const el of document.body.querySelectorAll("*")) {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 && r.right > 0) {
        let s = getComputedStyle(el);
        let cls = el.tagName.toLowerCase();
        if (el.id) cls += '#'+el.id;
        [...el.classList].slice(0,3).forEach(c => cls += '.'+c);
        let parentS = el.parentElement ? getComputedStyle(el.parentElement) : null;
        let parentDesc = el.parentElement ? (el.parentElement.tagName.toLowerCase() + (el.parentElement.id ? '#'+el.parentElement.id : '')) : '';
        lines.push(`  ${cls} right=${Math.round(r.right)} overflowX=${s.overflowX} minW=${s.minWidth} parent=${parentDesc} parentOverflow=${parentS?.overflowX}`);
      }
      if (lines.length > 20) break;
    }
    return lines.join("\n");
  }, vw));
  await p.close();
}

await b.close(); srv.kill();
