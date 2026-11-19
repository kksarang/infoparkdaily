#!/usr/bin/env node
/* Import EY India early-careers jobs from EY's Yello job board into jobs-data.js.
 *
 * Usage: node scripts/add-ey-yello-jobs.mjs <pagesDir> [checkedOn]
 *   <pagesDir> holds one saved job page per job, named <jobKey>.html, from
 *   https://eyglobal.yello.co/jobs/<jobKey>?job_board_id=c1riT--B2O-KySgYWsZO1Q&locale=en
 *   The India job keys come from GET https://eyglobal.yello.co/job_boards/c1riT--B2O-KySgYWsZO1Q/search?query=&filters=30009&page_number=<n>
 *   (30009 = Country/Region "India"; send Accept: application/json and X-Requested-With: XMLHttpRequest).
 *   [checkedOn] is the check date as YYYY-MM-DD (defaults to today).
 *
 * Only details stated on EY's listing are used; anything not stated stays empty.
 * Jobs already in jobs-data.js (same Yello job key, or same EY requisition number) are skipped. New jobs are not pinned. */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const [dir, checkedArg] = process.argv.slice(2);
if (!dir) { console.error("Usage: node scripts/add-ey-yello-jobs.mjs <pagesDir> [YYYY-MM-DD]"); process.exit(1); }
const checkedOn = checkedArg || new Date().toISOString().slice(0, 10);
const checkedLabel = new Date(checkedOn + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "jobs-data.js");
const NOTE = "Job details can change after publishing. Always verify the opening on the employer's official channel before applying. InfoparkDaily is not a recruiter and never collects money for jobs. Never pay anyone for an application or interview.";
const BOARD = "c1riT--B2O-KySgYWsZO1Q";
const MAX_ITEMS = 15;
const MAX_LEN = 500;
const CITY = {
  Bengaluru: "Bengaluru, Karnataka", Bangalore: "Bengaluru, Karnataka", Chennai: "Chennai, Tamil Nadu", Gurgaon: "Gurugram, Haryana", Gurugram: "Gurugram, Haryana",
  Hyderabad: "Hyderabad, Telangana", Kochi: "Kochi, Kerala", Kolkata: "Kolkata, West Bengal", Mumbai: "Mumbai, Maharashtra", Noida: "Noida, Uttar Pradesh",
  Trivandrum: "Thiruvananthapuram, Kerala", Coimbatore: "Coimbatore, Tamil Nadu", Thiruvananthapuram: "Thiruvananthapuram, Kerala", Pune: "Pune, Maharashtra", Ahmedabad: "Ahmedabad, Gujarat", Delhi: "New Delhi, Delhi",
};

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", bull: "•", hellip: "…", rarr: "→" };
const unescape1 = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&([a-z]+);/gi, (m, n) => ENT[n.toLowerCase()] ?? m);
// EY's PDFs-turned-HTML split ligatures ("speciﬁ c"); rejoin them.
const unescape = (s) => unescape1(unescape1(String(s || ""))).replace(/ﬁ\s?/g, "fi").replace(/ﬂ\s?/g, "fl");
const trim = (l) => (l.length > MAX_LEN ? l.slice(0, MAX_LEN - 1).replace(/\s+\S*$/, "") + "…" : l);
const clean = (l) => trim(l.replace(/[ \t​]/g, " ").replace(/^[\s•▪◦·*\-–→_]+(?=\S)/, "").replace(/^\d{1,2}[.)]\s+/, "").replace(/\s+/g, " ").trim());
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const short = (s, max = 300) => (s.length > max ? s.slice(0, max - 1).replace(/\s+\S*$/, "") + "…" : s);
const text = (h) => unescape(String(h || "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const RESP = /respons|accountabilit|duties|your key|what you will do|role overview|the opportunity|day.to.day|you will/i;
const REQ = /qualif|requir|skills?|experience|education|eligib|competenc|to qualify|ideally|what we look|looking for|attributes|criteria/i;
const SKIP = /about ey|careers in ey|join one of our|what we offer|what working at ey|ey \| building|we operate from|our .{0,30}practice|^consulting$|^assurance$|^tax$|^strategy and transactions|^ey-parthenon|benefits|how to apply|job description for|share/i;
const BOILER = /at ey, you.ll have the chance|we.re counting on your unique voice|building a better working world|ey exists to build|we operate from|join a team of over|across our six locations|^argentina|^china|^india \(|^philippines|^poland|^uk \(/i;

const sections = (html) => {
  const lines = unescape(String(html || "")
    .replace(/<\s*(br|\/p|\/li|li|\/div|div|p|ul|\/ul|ol|\/ol|h\d|\/h\d|tr|\/tr)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, ""))
    .split("\n").map((l) => l.replace(/[ \t​]/g, " ").trim()).filter(Boolean);
  const out = { resp: [], req: [], summary: [], skip: [] };
  let cur = "summary";
  for (const raw of lines) {
    const bare = raw.replace(/\s*[:?]\s*$/, "").trim();
    if (/^_+$/.test(bare)) continue;
    const isHeading = bare.length <= 70 && (/:\s*$/.test(raw) || SKIP.test(bare) || /^(primary responsibilities|key responsibilities|responsibilities|skills needed|requirements|qualifications|behavioral competencies)\b/i.test(bare));
    if (isHeading) {
      cur = SKIP.test(bare) ? "skip" : RESP.test(bare) ? "resp" : REQ.test(bare) || /competenc/i.test(bare) ? "req" : cur === "skip" ? "summary" : cur;
      continue;
    }
    const l = clean(raw);
    if (l.length < 3 || BOILER.test(l)) continue;
    out[cur].push(l);
  }
  const uniq = (a) => [...new Set(a)].slice(0, MAX_ITEMS);
  return { resp: uniq(out.resp), req: uniq(out.req), summary: out.summary };
};

const parse = (html, key) => {
  const top = (html.match(/<div class="details-top__title[^"]*">([\s\S]*?)<\/div>/) || [])[1] || "";
  const title = text((top.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]);
  const spans = [...top.matchAll(/<span[^>]*>([\s\S]*?)<\/span>/g)].map((m) => text(m[1]));
  const req = spans.find((s) => /^\d{5,}$/.test(s)) || "";
  const locs = spans.filter((s) => s !== req).flatMap((s) => s.split(/\s*[,;|]\s*/)).filter(Boolean);
  const body = (html.match(/<div class="inner clearfix ck-rendered-content">([\s\S]*?)<\/section>/) || [])[1] || "";
  const side = {};
  for (const m of html.matchAll(/<span class="secondary-details__title">([\s\S]*?)<\/span>\s*([\s\S]*?)(?=<span class="secondary-details__title">|<\/aside>|Share:)/g)) side[text(m[1])] = text(m[2]);
  return { key, title, req, locs, body, side, gds: /about ey gds|global delivery services/i.test(body) };
};

const toJob = (p) => {
  // Office codes such as "HYD ITP-HT City/EYGDS/Non-SEZ" name the city by its first token.
  const cities = [...new Set(p.locs.map((l) => l.replace(/^IND-/i, "").trim()).map((c) => (/^HYD\b/i.test(c) ? "Hyderabad" : c)))].filter(Boolean);
  const places = cities.map((c) => CITY[c] || c);
  const location = places.length === 1 ? places[0] : places.length ? `${cities.join(", ")} (India)` : "India";
  const { resp, req, summary } = sections(p.body);
  const fullText = [p.title, ...req, ...resp, ...summary].join(" ");
  const intern = /\bintern(ship)?\b/i.test(p.title);
  const fresher = intern || /\b(graduate|fresher|freshers|campus|trainee|0\s*[-–]\s*\d+\s*years?)\b/i.test(fullText);
  const company = p.gds ? "EY Global Delivery Services" : "EY";
  const service = p.side["Service Line/Business Area"] || "";
  const applyLink = `https://eyglobal.yello.co/jobs/${p.key}?job_board_id=${BOARD}`;
  const intro = summary.find((l) => l.length > 60) || "";
  return {
    id: `ey-${slug(p.title)}-${slug(cities[0] || "india")}-${p.req || slug(p.key)}`,
    company,
    logo: "",
    companyBlurb: [p.gds ? "EY GDS" : "EY", p.title, cities.join(" / "), intern ? "Internship" : ""].filter(Boolean).join(" · "),
    location,
    roles: [p.title],
    experience: fresher ? "fresher" : "",
    experienceRange: "",
    employmentType: intern ? "Internship" : "",
    applyLink,
    applyDeadline: "",
    postedDate: "",
    source: "Company careers page",
    verified: true,
    verificationNote: NOTE,
    tags: [...new Set(["EY", p.gds ? "EY GDS" : "", service, ...cities, places.some((x) => /Kerala/.test(x)) ? "Kerala" : "", intern ? "Internship" : "", fresher ? "Freshers" : ""].filter(Boolean))],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: `https://eyglobal.yello.co/job_boards/${BOARD}`,
    address: "",
    industry: "Professional services (audit, tax, consulting)",
    companyDetails: "",
    workDetails: service ? `Service line: ${service}.` : "",
    workStatus: "",
    workMode: "",
    experienceYears: "",
    salaryRange: "",
    qualification: "",
    skills: [],
    requirements: req,
    responsibilities: resp.length ? resp : summary.filter((l) => l !== intro && l.length > 40).slice(0, 8),
    benefits: [],
    howToApply: `Apply on EY's careers site (job ${p.req || p.key}).`,
    hiringNotes: `Checked on EY's early-careers job board on ${checkedLabel}${p.req ? ` · Requisition ${p.req}` : ""}. Posting date not shown on the listing.`,
    description: intro ? short(intro) : `${p.title} at ${company}, ${location}.`,
    startingDate: "",
  };
};

let data = readFileSync(FILE, "utf8");
const ids = new Set([...data.matchAll(/^\s+id: "([^"]+)"/gm)].map((m) => m[1]));
const fresh = [];
for (const f of readdirSync(dir).filter((n) => n.endsWith(".html")).sort()) {
  const p = parse(readFileSync(join(dir, f), "utf8"), f.slice(0, -5));
  if (!p.title) continue;
  if (data.includes(`yello.co/jobs/${p.key}`) || (p.req && new RegExp(`\\b(job|requisition|Requisition) ${p.req}\\b|-${p.req}"`).test(data))) continue;
  const j = toJob(p);
  if (ids.has(j.id)) continue;
  ids.add(j.id); fresh.push(j);
}
if (!fresh.length) { console.log("Nothing new"); process.exit(0); }
const render = (j) => `  {\n${Object.entries(j).map(([k, v]) => `    ${k}: ${JSON.stringify(v)},`).join("\n")}\n  },\n`;
data = data.replace("var JOBS = [\n", "var JOBS = [\n" + fresh.map(render).join(""));
writeFileSync(FILE, data);
const byCity = {};
fresh.forEach((j) => { byCity[j.location] = (byCity[j.location] || 0) + 1; });
console.log(`Added ${fresh.length} EY jobs.`);
console.log(Object.entries(byCity).sort((a, b) => b[1] - a[1]).map(([c, n]) => `${c}: ${n}`).join(" · "));
