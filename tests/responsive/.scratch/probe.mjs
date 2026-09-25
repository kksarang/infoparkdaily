import { chromium } from "playwright";
import { spawn } from "node:child_process";
const srv = spawn("python3", ["-m", "http.server", "8799", "-d", "/Users/sarangr/infoparkdaily"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 800));
const [path, w, h] = [process.argv[2], +process.argv[3], +process.argv[4]];
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: w, height: h } });
await p.route("**/*", r => r.request().url().includes("127.0.0.1") || /fonts/.test(r.request().url()) ? r.continue() : r.abort());
await p.goto("http://127.0.0.1:8799" + path, { waitUntil: "load" });
await p.waitForTimeout(600);
console.log(await p.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const out = [`vw=${vw} html.scrollW=${document.documentElement.scrollWidth} body.scrollW=${document.body.scrollWidth}`];
  // Bisect: hide each top-level section in turn and see which removes the scroll.
  const walk = (root, depth) => {
    for (const el of root.children) {
      const prev = el.style.display; el.style.display = "none";
      const sw = document.documentElement.scrollWidth;
      el.style.display = prev;
      if (sw <= vw) {
        out.push("  ".repeat(depth) + el.tagName + "." + [...el.classList].join(".") + (el.id ? "#" + el.id : ""));
        if (depth < 8) walk(el, depth + 1);
        return;
      }
    }
  };
  walk(document.body, 0);
  return out.join("\n");
}));
await b.close(); srv.kill();
