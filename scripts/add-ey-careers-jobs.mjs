#!/usr/bin/env node
/* Import EY India jobs from careers.ey.com (SuccessFactors career site) into jobs-data.js.
 *
 * Usage: node scripts/add-ey-careers-jobs.mjs <pagesDir> [checkedOn]
 *   <pagesDir> holds one saved job page per job, named <jobId>.html, from https://careers.ey.com/ey/job/<slug>/<jobId>/
 *   Job links come from the search pages https://careers.ey.com/ey/search/?q=&optionsFacetsDD_country=IN&startrow=<0,25,50…>.
 *   [checkedOn] is the check date as YYYY-MM-DD (defaults to today).
 *
 * Only details stated on EY's listing are used; anything not stated stays empty.
 * Jobs whose EY requisition or job link is already in jobs-data.js are skipped. New jobs are not pinned. */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const [dir, checkedArg] = process.argv.slice(2);
if (!dir) { console.error("Usage: node scripts/add-ey-careers-jobs.mjs <pagesDir> [YYYY-MM-DD]"); process.exit(1); }
const checkedOn = checkedArg || new Date().toISOString().slice(0, 10);
const checkedLabel = new Date(checkedOn + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "jobs-data.js");
const NOTE = "Job details can change after publishing. Always verify the opening on the employer's official channel before applying. InfoparkDaily is not a recruiter and never collects money for jobs. Never pay anyone for an application or interview.";
const MAX_ITEMS = 15;
const MAX_LEN = 500;
const CITY = {
  bengaluru: ["Bengaluru", "Karnataka"], bangaluru: ["Bengaluru", "Karnataka"], bangalore: ["Bengaluru", "Karnataka"], chennai: ["Chennai", "Tamil Nadu"],
  "kancheepuram district": ["Kancheepuram", "Tamil Nadu"], hyderabad: ["Hyderabad", "Telangana"], kochi: ["Kochi", "Kerala"],
  trivandrum: ["Thiruvananthapuram", "Kerala"], thiruvananthapuram: ["Thiruvananthapuram", "Kerala"], "new delhi": ["New Delhi", "Delhi"],
  mumbai: ["Mumbai", "Maharashtra"], gurugram: ["Gurugram", "Haryana"], gurgaon: ["Gurugram", "Haryana"], noida: ["Noida", "Uttar Pradesh"],
  pune: ["Pune", "Maharashtra"], kolkata: ["Kolkata", "West Bengal"], chandigarh: ["Chandigarh", "Chandigarh"], ahmedabad: ["Ahmedabad", "Gujarat"],
};

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", bull: "•", hellip: "…", rarr: "→" };
const unescape1 = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&([a-z]+);/gi, (m, n) => ENT[n.toLowerCase()] ?? m);
const unescape = (s) => unescape1(unescape1(String(s || ""))).replace(/ﬁ\s?/g, "fi").replace(/ﬂ\s?/g, "fl");
const trim = (l) => (l.length > MAX_LEN ? l.slice(0, MAX_LEN - 1).replace(/\s+\S*$/, "") + "…" : l);
const clean = (l) => trim(l.replace(/[ \t​]/g, " ").replace(/^[\s•▪◦·*\-–→_]+(?=\S)/, "").replace(/^\d{1,2}[.)]\s+/, "").replace(/\s+/g, " ").trim());
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const short = (s, max = 300) => (s.length > max ? s.slice(0, max - 1).replace(/\s+\S*$/, "") + "…" : s);
const text = (h) => unescape(String(h || "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const prop = (html, id) => text((html.match(new RegExp(`data-careersite-propertyid="${id}"[^>]*>([\\s\\S]*?)</span>`)) || [])[1]);

const RESP = /respons|accountabilit|duties|your key|what you.ll do|what you will do|role overview|the opportunity|day.to.day|you will|key tasks|job description|role summary|position summary|about the role/i;
const REQ = /qualif|requir|skills?|experience|education|eligib|competenc|to qualify|ideally|what we look|looking for|attributes|criteria|certification|must have|good to have|preferred|desired|technical/i;
const SKIP = /what we offer|what working at ey offers|ey \| building|about ey|benefits|how to apply|we offer|what we look for in you|join us/i;
const BOILER = /our journey started in 2002|as a global leader in assurance, tax, transaction and advisory|we.ll help you succeed in a globally connected powerhouse|global delivery services refers to ey.s worldwide network|at ey, you.ll have the chance|we.re counting on your unique voice|building a better working world|ey exists to build|enabled by data and technology|working across assurance, consulting|diverse ey teams in over/i;

const sections = (html) => {
  const lines = unescape(String(html || "")
    .replace(/<\s*(br|\/p|\/li|li|\/div|div|p|ul|\/ul|ol|\/ol|h\d|\/h\d|tr|\/tr)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, ""))
    .split("\n").map((l) => l.replace(/[ \t​]/g, " ").trim()).filter(Boolean);
  const out = { resp: [], req: [], summary: [], skip: [] };
  let cur = "summary", ended = false;
  for (const raw of lines) {
    if (/^ey \| building a better working world/i.test(raw)) { ended = true; continue; } // EY's closing boilerplate
    if (ended) continue;
    const bare = raw.replace(/\s*[:?]\s*$/, "").trim();
    const headingish = bare.length <= 60 && !/[.;]$/.test(bare) && (/:\s*$/.test(raw) || RESP.test(bare) || REQ.test(bare) || SKIP.test(bare)) && bare.split(/\s+/).length <= 8;
    if (headingish && !/^(experience|location|qualification)s?\s*:\s*\S/i.test(raw)) {
      cur = SKIP.test(bare) ? "skip" : RESP.test(bare) ? "resp" : REQ.test(bare) ? "req" : cur === "skip" ? "summary" : cur;
      continue;
    }
    const l = clean(raw);
    if (l.length < 3 || BOILER.test(l)) continue;
    out[cur].push(l);
  }
  const uniq = (a) => [...new Set(a)].slice(0, MAX_ITEMS);
  return { resp: uniq(out.resp), req: uniq(out.req), summary: out.summary };
};

const expRange = (t) => {
  const m = t.match(/(\d{1,2})\s*(?:-|–|to)\s*(\d{1,2})\s*\+?\s*(?:years|yrs)/i) || t.match(/(\d{1,2})\s*\+\s*(?:years|yrs)/i)
    || t.match(/(?:minimum|at least|min\.?)\s*(?:of\s*)?(\d{1,2})\s*(?:years|yrs)/i);
  if (!m) return "";
  return m[2] ? `${m[1]}–${m[2]} years` : `${m[1]}+ years`;
};

const parse = (html, jobId) => {
  const title = prop(html, "title");
  const city = prop(html, "city");
  const req = prop(html, "customfield5");
  const dateTxt = prop(html, "date");
  const other = text((html.match(/Other locations:\s*<\/span>([\s\S]*?)<\/div>/) || [])[1]).replace(/^Primary Location Only$/i, "");
  const descHtml = (html.match(/itemprop="description"[^>]*>([\s\S]*?)<\/span>\s*<\/div>/) || html.match(/itemprop="description"[^>]*>([\s\S]*?)<\/span>/) || [])[1] || "";
  const urlSlug = (html.match(/<link rel="canonical" href="https:\/\/careers\.ey\.com(\/ey\/job\/[^"]+)"/) || [])[1] || "";
  return { jobId, title, city, req, dateTxt, other, descHtml, urlSlug };
};

const toJob = (p) => {
  const [cityName, state] = CITY[p.city.toLowerCase()] || [p.city, ""];
  const others = p.other ? p.other.split(/\s*[,;]\s*/).filter((x) => x && !/^IN$|^\d+$/.test(x)) : [];
  const location = [cityName, state].filter(Boolean).join(", ") || "India";
  const { resp, req, summary } = sections(p.descHtml);
  const all = [...summary, ...req, ...resp].join(" \n ");
  const range = expRange(all);
  const fresher = /\b(fresher|freshers|campus|graduate trainee|0\s*[-–]\s*\d+\s*years?)\b/i.test(all + " " + p.title) || /^0/.test(range);
  const intern = /\bintern(ship)?\b/i.test(p.title);
  const gds = /\bGDS\b|global delivery services/i.test(p.title + " " + all);
  const company = gds ? "EY Global Delivery Services" : "EY";
  const posted = Date.parse(p.dateTxt + " UTC") ? new Date(Date.parse(p.dateTxt + " UTC")).toISOString().slice(0, 10) : "";
  const applyLink = p.urlSlug ? `https://careers.ey.com${p.urlSlug}` : `https://careers.ey.com/ey/job/${p.jobId}/`;
  const intro = summary.find((l) => l.length > 60) || resp.find((l) => l.length > 60 && /^(we are|we're|the |this |as a |you will)/i.test(l)) || "";
  return {
    id: `ey-${slug(p.title)}-${slug(cityName || "india")}-${p.req || p.jobId}`,
    company,
    logo: "",
    companyBlurb: [gds ? "EY GDS" : "EY", p.title, cityName, range].filter(Boolean).join(" · "),
    location,
    roles: [p.title],
    experience: range ? (fresher ? "both" : "experienced") : fresher ? "fresher" : "",
    experienceRange: range,
    employmentType: intern ? "Internship" : "",
    applyLink,
    applyDeadline: "",
    postedDate: posted,
    source: "Company careers page",
    verified: true,
    verificationNote: NOTE,
    tags: [...new Set(["EY", gds ? "EY GDS" : "", cityName, state === "Kerala" ? "Kerala" : "", intern ? "Internship" : "", fresher ? "Freshers" : ""].filter(Boolean))],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://careers.ey.com/ey/",
    address: "",
    industry: "Professional services (audit, tax, consulting)",
    companyDetails: "",
    workDetails: others.length ? `Also listed for: ${others.join(", ")}.` : "",
    workStatus: "",
    workMode: "",
    experienceYears: "",
    salaryRange: "",
    qualification: "",
    skills: [],
    requirements: req,
    responsibilities: resp.length ? resp : summary.filter((l) => l !== intro && l.length > 40).slice(0, 8),
    benefits: [],
    howToApply: `Apply on EY careers (requisition ${p.req || p.jobId}).`,
    hiringNotes: `Checked on careers.ey.com on ${checkedLabel}${p.req ? ` · Requisition ${p.req}` : ""}${posted ? ` · Posted ${posted}` : ""}.`,
    description: intro ? short(intro) : `${p.title} at ${company}, ${location}.`,
    startingDate: "",
  };
};

let data = readFileSync(FILE, "utf8");
const ids = new Set([...data.matchAll(/^\s+id: "([^"]+)"/gm)].map((m) => m[1]));
// Build the "already listed" lookups once; scanning the whole data file per job is very slow.
const haveJobIds = new Set([...data.matchAll(/careers\.ey\.com\/ey\/job\/[^"\s]*?\/(\d+)\//g)].map((m) => m[1]));
const haveReqs = new Set([
  ...[...data.matchAll(/(?:job|requisition|Requisition|Job ID) (\d{6,8})\b/g)].map((m) => m[1]),
  ...[...data.matchAll(/^\s+id: "ey-[^"]*-(\d{6,8})"/gm)].map((m) => m[1]),
]);
const fresh = [];
let skipped = 0;
for (const f of readdirSync(dir).filter((n) => n.endsWith(".html")).sort()) {
  const p = parse(readFileSync(join(dir, f), "utf8"), f.slice(0, -5));
  if (!p.title || !p.descHtml) { skipped++; continue; } // closed or empty listing
  if (haveJobIds.has(p.jobId) || (p.req && haveReqs.has(p.req))) continue;
  const j = toJob(p);
  if (ids.has(j.id)) continue;
  ids.add(j.id); fresh.push(j);
}
if (!fresh.length) { console.log("Nothing new"); process.exit(0); }
fresh.sort((a, b) => b.postedDate.localeCompare(a.postedDate));
const render = (j) => `  {\n${Object.entries(j).map(([k, v]) => `    ${k}: ${JSON.stringify(v)},`).join("\n")}\n  },\n`;
data = data.replace("var JOBS = [\n", "var JOBS = [\n" + fresh.map(render).join(""));
writeFileSync(FILE, data);
const byCity = {};
fresh.forEach((j) => { byCity[j.location] = (byCity[j.location] || 0) + 1; });
console.log(`Added ${fresh.length} EY jobs (${skipped} pages without a description skipped).`);
console.log(Object.entries(byCity).sort((a, b) => b[1] - a[1]).map(([c, n]) => `${c}: ${n}`).join(" · "));
