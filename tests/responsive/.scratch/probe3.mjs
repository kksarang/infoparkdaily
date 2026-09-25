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
  // Deep drill into all elements, not just children
  const all = [...document.body.querySelectorAll("*")];
  const out = [];
  for (const el of all) {
    const r = el.getBoundingClientRect();
    const right = Math.round(r.right);
    if (right > vw + 1) {
      let desc = el.tagName.toLowerCase();
      if (el.id) desc += "#" + el.id;
      const cls = [...el.classList].slice(0, 4).join(".");
      if (cls) desc += "." + cls;
      const parentTag = el.parentElement ? el.parentElement.tagName.toLowerCase() : "";
      const parentCls = el.parentElement ? [...el.parentElement.classList].slice(0,2).join(".") : "";
      out.push(`${desc} right=${right} (over ${right - vw}px) parent: ${parentTag}.${parentCls}`);
    }
  }
  return out.slice(0, 20).join("\n") || `body.scrollW=${document.body.scrollWidth}`;
}));
await b.close(); srv.kill();
