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
  const out = [];
  for (const el of document.body.querySelectorAll("*")) {
    if (!["SCRIPT","STYLE","NOSCRIPT","TEMPLATE"].includes(el.tagName)) continue;
    const prev = el.style.display; el.style.display = "none";
    const sw = document.body.scrollWidth;
    el.style.display = prev;
    if (sw <= vw) {
      const src = el.getAttribute("src") || el.textContent.trim().slice(0, 120);
      out.push(`<${el.tagName.toLowerCase()}> src="${el.getAttribute("src")}" | ${src}`);
    }
  }
  return out.join("\n") || "no script found";
}));
await b.close(); srv.kill();
