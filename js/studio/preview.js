/* Daily Web Studio — a first-look homepage built from the wizard answers.
 *
 * Shown in a sandboxed iframe (srcdoc, no scripts, opaque origin), so nothing in a site can
 * touch the app. Every value from the user is escaped. This is a starting sketch only; the
 * template marketplace (Phase 2) and the visual editor (Phase 3) replace it.
 */
import { typeById, lookById, ACCENTS } from "./data.js";

export const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/* Original sample copy per website type: [overline, call to action, three highlights]. */
const SAMPLE = {
  portfolio: ["Available for new projects", "See my work", ["Selected projects", "Skills & tools", "Get in touch"]],
  business: ["Trusted by local customers", "Book a service", ["What we offer", "Why choose us", "Opening hours"]],
  agency: ["Brand, web and growth", "Start a project", ["Case studies", "Our process", "Meet the team"]],
  restaurant: ["Open today · 11 am – 11 pm", "Reserve a table", ["Today’s specials", "Our kitchen", "Find us"]],
  corporate: ["Since 2010", "Talk to our team", ["Our solutions", "Leadership", "Careers"]],
  startup: ["Now in early access", "Join the waitlist", ["How it works", "Pricing", "Built for teams"]],
  landing: ["Limited spots", "Get started", ["The problem", "The solution", "What people say"]],
  blog: ["New stories every week", "Read the latest", ["Featured article", "Popular topics", "Newsletter"]],
  ecommerce: ["Free delivery over ₹999", "Shop now", ["New arrivals", "Best sellers", "Order on WhatsApp"]],
  event: ["One day · One city", "Register now", ["Schedule", "Speakers", "Venue"]],
  realestate: ["Verified listings", "Book a site visit", ["Featured homes", "Neighbourhoods", "Talk to an agent"]],
  education: ["Admissions open", "Apply now", ["Courses", "Faculty", "Campus life"]],
};

export function previewHtml(project) {
  const type = typeById(project.type) || typeById("portfolio");
  const look = lookById(project.look);
  const accent = (ACCENTS.find((a) => a.id === project.accent) || ACCENTS[0]).value;
  const [over, cta, cards] = SAMPLE[type.id] || SAMPLE.portfolio;
  const name = esc(project.name || "Your site");
  const tagline = esc(project.tagline || type.short);
  const where = project.location ? ` · ${esc(project.location)}` : "";
  const nav = (project.pages || ["Home"]).slice(0, 6).map((p) => `<a>${esc(p)}</a>`).join("");
  const dark = look.id === "bold";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Fraunces:opsz,wght@9..144,600&family=Inter:wght@400;500;600&display=swap">
<style>
*{box-sizing:border-box;margin:0}
body{background:${look.bg};color:${look.text};font:15px/1.6 ${look.body};-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
.w{width:min(1080px,100% - 40px);margin-inline:auto}
header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 0;flex-wrap:wrap}
.logo{display:flex;align-items:center;gap:10px;font:700 17px/1 ${look.heading}}
.logo i{width:30px;height:30px;border-radius:${look.radius === "2px" ? "2px" : "9px"};background:${accent};display:block}
nav{display:flex;gap:18px;font-size:13px;color:${look.muted};flex-wrap:wrap}
nav a:first-child{color:${look.text};font-weight:600}
.hero{padding:clamp(40px,9vw,96px) 0 clamp(36px,7vw,72px);display:grid;gap:18px;max-width:760px}
.over{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:${accent}}
.over:before{content:"";width:18px;height:2px;background:${accent}}
h1{font:800 clamp(34px,6.4vw,66px)/1.02 ${look.heading};letter-spacing:-.03em}
.lead{font-size:clamp(15px,1.8vw,18px);color:${look.muted};max-width:56ch}
.ctas{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px}
.btn{display:inline-flex;align-items:center;min-height:46px;padding:0 20px;border-radius:${look.radius};background:${accent};color:#fff;font-weight:600;font-size:14px}
.btn.ghost{background:transparent;color:${look.text};border:1px solid ${dark ? "rgba(255,255,255,.2)" : "rgba(0,0,0,.14)"}}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;padding-bottom:56px}
.card{background:${look.surface};border-radius:${look.radius};padding:22px;min-height:170px;display:flex;flex-direction:column;justify-content:space-between;gap:24px}
.card b{display:block;font:600 19px/1.2 ${look.heading}}
.card span{font-size:13px;color:${look.muted}}
.card .ph{height:64px;border-radius:calc(${look.radius} / 1.5);background:linear-gradient(135deg,${accent}33,${accent}0d)}
footer{border-top:1px solid ${dark ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.08)"};padding:22px 0 30px;font-size:12px;color:${look.muted}}
</style></head><body>
<div class="w"><header><span class="logo"><i></i>${name}</span><nav aria-label="Pages">${nav}</nav></header>
<section class="hero"><span class="over">${esc(over)}${where}</span><h1>${name}</h1><p class="lead">${tagline}</p><div class="ctas"><a class="btn">${esc(cta)}</a><a class="btn ghost">Learn more</a></div></section>
<section class="grid">${cards.map((c, i) => `<div class="card"><div class="ph"></div><div><b>${esc(c)}</b><span>Section ${i + 2} · you’ll edit this in the editor</span></div></div>`).join("")}</section>
<footer>© ${new Date().getFullYear()} ${name} · Made with Daily Web Studio</footer></div>
</body></html>`;
}
