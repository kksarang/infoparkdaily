import { chromium } from "playwright";
import { spawn } from "node:child_process";
const srv = spawn("python3", ["-m", "http.server", "8799", "-d", "/Users/sarangr/infoparkdaily"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 800));
const b = await chromium.launch({ channel: "chrome", headless: true });

for (const vw of [667, 768, 1024, 1920, 2560]) {
  const p = await b.newPage({ viewport: { width: vw, height: 768 } });
  await p.route("**/*", r => r.request().url().includes("127.0.0.1") || /fonts/.test(r.request().url()) ? r.continue() : r.abort());
  await p.goto("http://127.0.0.1:8799/", { waitUntil: "load" });
  await p.waitForTimeout(600);
  const result = await p.evaluate((vw) => {
    const scrollW = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    const diff = scrollW - vw;
    if (diff <= 1) return `${vw}px: OK`;
    // Find outermost overflowing elements (not in overflow:hidden containers)
    const clips = (el) => {
      const s = getComputedStyle(el);
      return s.overflowX !== 'visible';
    };
    const isClipped = (el) => {
      for (let p = el.parentElement; p; p = p.parentElement) {
        if (clips(p)) return true;
      }
      return false;
    };
    const offenders = [];
    for (const el of document.body.querySelectorAll("*")) {
      if (el.tagName === "SCRIPT" || el.tagName === "STYLE") continue;
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 && !isClipped(el)) {
        let desc = el.tagName.toLowerCase();
        if (el.id) desc += "#" + el.id;
        const cls = [...el.classList].slice(0, 3).join(".");
        if (cls) desc += "." + cls;
        offenders.push(`${desc} right=${Math.round(r.right)}`);
      }
    }
    return `${vw}px scroll=+${diff}: ${offenders.join(", ")}`;
  }, vw);
  console.log(result);
  await p.close();
}

await b.close(); srv.kill();
