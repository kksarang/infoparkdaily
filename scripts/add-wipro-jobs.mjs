#!/usr/bin/env node
/* Import Wipro India jobs from careers.wipro.com (SuccessFactors) into jobs-data.js.
 *
 * Usage: node scripts/add-wipro-jobs.mjs <sel.json> <pagesDir> [checkedOn]
 *   <sel.json>  JSON array of "response" rows from POST https://careers.wipro.com/services/recruiting/v1/jobs
 *               (body: {"locale":"en_US","pageNumber":n,"sortBy":"date","facetFilters":{"jobLocationCountry":["India"],"sfstd_jobLocation_obj":["Kochi"]}, …})
 *   <pagesDir>  one saved job page per job, named <id>.html, from https://careers.wipro.com/job/<urlTitle>/<id>-en_US
 *   [checkedOn] check date as YYYY-MM-DD (defaults to today).
 *
 * Only details stated on Wipro's listing are used; anything not stated stays empty.
 * Jobs whose Wipro job id is already in jobs-data.js are skipped. New jobs are not pinned. */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const [selPath, dir, checkedArg] = process.argv.slice(2);
if (!selPath || !dir) { console.error("Usage: node scripts/add-wipro-jobs.mjs <sel.json> <pagesDir> [YYYY-MM-DD]"); process.exit(1); }
const checkedOn = checkedArg || new Date().toISOString().slice(0, 10);
const checkedLabel = new Date(checkedOn + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "jobs-data.js");
const NOTE = "Job details can change after publishing. Always verify the opening on the employer's official channel before applying. InfoparkDaily is not a recruiter and never collects money for jobs. Never pay anyone for an application or interview.";
const MAX_ITEMS = 15;
const MAX_LEN = 500;

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", bull: "•", hellip: "…" };
const unescape1 = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&([a-z]+);/gi, (m, n) => ENT[n.toLowerCase()] ?? m);
const unescape = (s) => unescape1(unescape1(String(s || "")));
const trim = (l) => (l.length > MAX_LEN ? l.slice(0, MAX_LEN - 1).replace(/\s+\S*$/, "") + "…" : l);
const clean = (l) => trim(l.replace(/[ \t​͏]/g, " ").replace(/^[\s•▪◦·*\-–→o]+(?=\S)/, "").replace(/^\d{1,2}[.)]\s+/, "").replace(/\s+/g, " ").trim());
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const short = (s, max = 300) => (s.length > max ? s.slice(0, max - 1).replace(/\s+\S*$/, "") + "…" : s);
const usDate = (s) => { const m = String(s || "").match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/); return m ? `${m[3].length === 2 ? "20" + m[3] : m[3]}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}` : ""; };

// Wipro's standard company paragraph and closing "Reinvent your world" pitch appear on every posting.
const BOILER = /^wipro limited \(nyse|reinvent your world|we are building a modern wipro|end-to-end digital transformation partner|join a business powered by purpose|applications from people with disabilities|wipro is an equal/i;
const RESP = /respons|duties|role purpose|\bdo\b|key tasks|deliver|what you.ll do|job description|about the role|scope/i;
const REQ = /qualif|requir|skills?|experience|education|eligib|mandatory|must.have|good.to.have|expected seniority|competenc|criteria/i;

const parse = (html) => {
  const at = html.indexOf('itemprop="description"');
  if (at < 0) return null;
  // The itemprop span holds only Wipro's company paragraph; the role text follows it, up to the Apply button block.
  const endMarks = ["unify-button-container", "Information at a Glance", "Apply now"].map((m) => html.indexOf(m, at)).filter((i) => i > at);
  const seg = html.slice(html.indexOf(">", at) + 1, endMarks.length ? Math.min(...endMarks) : at + 30000);
  const lines = unescape(seg
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<\s*(br|\/p|\/li|li|\/div|div|p|ul|\/ul|ol|\/ol|h\d|\/h\d|tr|\/tr|td|\/td)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, ""))
    .split(/\r\n|\r|\n/).map((l) => l.replace(/[ \t​͏]/g, " ").trim()).filter((l) => l && l !== ".");
  const out = { resp: [], req: [], summary: [] };
  let cur = "summary", skills = "", exp = "";
  for (const raw of lines) {
    if (BOILER.test(raw) || /^#body|unify-|[{}]/.test(raw)) continue; // page CSS that sits inside the description block
    const ms = raw.match(/mandatory skills\s*:\s*(.+)$/i);
    if (ms) { skills = ms[1].replace(/\s*\.$/, "").trim(); continue; }
    const ex = raw.match(/^\W*experience\s*:\s*(.+)$/i);
    if (ex) { exp = ex[1].replace(/\s*\.$/, "").trim(); continue; }
    const bare = raw.replace(/\s*[:?]\s*$/, "").trim();
    if (bare.length <= 50 && bare.split(/\s+/).length <= 6 && !/[.;,]$/.test(bare) && (RESP.test(bare) || REQ.test(bare) || /:\s*$/.test(raw))) {
      cur = RESP.test(bare) && !REQ.test(bare) ? "resp" : REQ.test(bare) ? "req" : cur;
      continue;
    }
    const l = clean(raw);
    if (l.length < 3) continue;
    out[cur].push(l);
  }
  const uniq = (a) => [...new Set(a)].slice(0, MAX_ITEMS);
  return { resp: uniq(out.resp), req: uniq(out.req), summary: out.summary, skills, exp };
};

const titleCase = (t) => (t === t.toUpperCase() ? t.toLowerCase().replace(/\b([a-z])/g, (m) => m.toUpperCase()).replace(/\b(Ai|Ui|Ux|Qa|Sap|Aws|Gcp|It|Hr|Bpo|Sme|Ml|L\d|Erp|Crm|Api|Sql|Etl|Bi)\b/g, (m) => m.toUpperCase()) : t);

const toJob = (r, p) => {
  const city = (r.sfstd_jobLocation_obj || [""])[0] === "Trivandrum" ? "Thiruvananthapuram" : (r.sfstd_jobLocation_obj || [""])[0];
  const state = (r.jobLocationState || [""])[0];
  const location = [city, state].filter(Boolean).join(", ") || "India";
  const title = titleCase(r.unifiedStandardTitle || r.urlTitle.replace(/-/g, " "));
  const m = p.exp.match(/(\d+)\s*[-–]\s*(\d+)/) || p.exp.match(/(\d+)\s*\+/);
  const range = m ? (m[2] ? `${m[1]}–${m[2]} years` : `${m[1]}+ years`) : /fresher/i.test(p.exp) ? "Fresher" : "";
  const fresher = /fresher/i.test(p.exp) || (m && +m[1] === 0) || /\b(apprentice|trainee|intern)\b/i.test(title);
  const posted = usDate(r.unifiedStandardStart);
  const closes = usDate(r.unifiedStandardEnd);
  const area = (r.custRMKMappingPicklist || [""])[0];
  const applyLink = `https://careers.wipro.com/job/${r.urlTitle}/${r.id}-en_US`;
  const intro = p.summary.find((l) => l.length > 60) || p.resp.find((l) => /^the purpose of this role/i.test(l)) || "";
  const responsibilities = (p.resp.length ? p.resp : p.summary).filter((l) => l !== intro).slice(0, MAX_ITEMS);
  const requirements = [...new Set([p.skills ? `Mandatory skills: ${p.skills}` : "", p.exp ? `Experience: ${p.exp}` : "", ...p.req].filter(Boolean))].slice(0, MAX_ITEMS);
  return {
    id: `wipro-${slug(title)}-${slug(city || "india")}-${r.id}`,
    company: "Wipro",
    logo: "",
    companyBlurb: ["Wipro", title, city, range].filter(Boolean).join(" · "),
    location,
    roles: [title],
    experience: range ? (fresher || /^0/.test(range) ? (range === "Fresher" ? "fresher" : "both") : "experienced") : fresher ? "fresher" : "",
    experienceRange: range,
    employmentType: /apprentice/i.test(title) ? "Apprenticeship" : "",
    applyLink,
    applyDeadline: closes,
    postedDate: posted,
    source: "Company careers page",
    verified: true,
    verificationNote: NOTE,
    tags: [...new Set(["Wipro", area, city, state === "Kerala" ? "Kerala" : "", fresher ? "Freshers" : ""].filter(Boolean))],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://careers.wipro.com",
    address: "",
    industry: "IT services",
    companyDetails: "",
    workDetails: area ? `Practice: ${area}.` : "",
    workStatus: "",
    workMode: "",
    experienceYears: "",
    salaryRange: "",
    qualification: "",
    skills: p.skills ? p.skills.split(/\s*[,;/]\s*/).filter(Boolean).slice(0, 8) : [],
    requirements,
    responsibilities,
    benefits: [],
    howToApply: `Apply on Wipro careers (job ${r.id}).`,
    hiringNotes: `Checked on careers.wipro.com on ${checkedLabel} · Job ${r.id}${posted ? ` · Posted ${posted}` : ""}${closes ? ` · Listing ends ${closes}` : ""}.`,
    description: intro ? short(intro) : `${title} at Wipro, ${location}.`,
    startingDate: "",
  };
};

let data = readFileSync(FILE, "utf8");
const ids = new Set([...data.matchAll(/^\s+id: "([^"]+)"/gm)].map((m) => m[1]));
const have = new Set([...data.matchAll(/careers\.wipro\.com\/job\/[^"\s]*?\/(\d+)-en_US/g)].map((m) => m[1]));
const fresh = [];
let noPage = 0;
for (const r of JSON.parse(readFileSync(selPath, "utf8"))) {
  if (have.has(String(r.id))) continue;
  const f = join(dir, `${r.id}.html`);
  const p = existsSync(f) ? parse(readFileSync(f, "utf8")) : null;
  if (!p) { noPage++; continue; }
  const j = toJob(r, p);
  if (ids.has(j.id)) continue;
  ids.add(j.id); have.add(String(r.id)); fresh.push(j);
}
if (!fresh.length) { console.log("Nothing new"); process.exit(0); }
fresh.sort((a, b) => b.postedDate.localeCompare(a.postedDate));
const render = (j) => `  {\n${Object.entries(j).map(([k, v]) => `    ${k}: ${JSON.stringify(v)},`).join("\n")}\n  },\n`;
data = data.replace("var JOBS = [\n", "var JOBS = [\n" + fresh.map(render).join(""));
writeFileSync(FILE, data);
const byCity = {};
fresh.forEach((j) => { byCity[j.location] = (byCity[j.location] || 0) + 1; });
console.log(`Added ${fresh.length} Wipro jobs${noPage ? ` (${noPage} without a saved page skipped)` : ""}.`);
console.log(Object.entries(byCity).map(([c, n]) => `${c}: ${n}`).join(" · "));
