import { chromium } from "playwright";
import { spawn } from "node:child_process";
const srv = spawn("python3", ["-m", "http.server", "8799", "-d", "/Users/sarangr/infoparkdaily"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 800));
const b = await chromium.launch({ channel: "chrome", headless: true });

// Check homepage: what is the computed overflowX of partners-section vs partners-marquee
const p = await b.newPage({ viewport: { width: 1024, height: 768 } });
await p.route("**/*", r => r.request().url().includes("127.0.0.1") || /fonts/.test(r.request().url()) ? r.continue() : r.abort());
await p.goto("http://127.0.0.1:8799/", { waitUntil: "load" });
await p.waitForTimeout(600);
console.log(await p.evaluate(() => {
  const section = document.querySelector('.partners-section');
  const marquee = document.querySelector('.partners-marquee');
  const track = document.querySelector('.partners-track');
  const hero = document.querySelector('.hero');
  const h1 = document.querySelector('.hero-content h1');
  const accent = document.querySelector('.hero-content h1 .accent');
  const sS = section ? getComputedStyle(section) : null;
  const mS = marquee ? getComputedStyle(marquee) : null;
  const tS = track ? getComputedStyle(track) : null;
  const lines = [
    `partners-section overflowX=${sS?.overflowX} scrollW=${section?.scrollWidth} offsetW=${section?.offsetWidth}`,
    `partners-marquee overflowX=${mS?.overflowX} scrollW=${marquee?.scrollWidth} offsetW=${marquee?.offsetWidth}`,
    `partners-track width=${tS?.width} scrollW=${track?.scrollWidth} offsetW=${track?.offsetWidth}`,
    `hero scrollW=${hero?.scrollWidth} offsetW=${hero?.offsetWidth}`,
    `h1 scrollW=${h1?.scrollWidth} offsetW=${h1?.offsetWidth} fontSize=${getComputedStyle(h1)?.fontSize}`,
    `accent scrollW=${accent?.scrollWidth} offsetW=${accent?.offsetWidth}`,
  ];
  return lines.join("\n");
}));
await b.close(); srv.kill();
