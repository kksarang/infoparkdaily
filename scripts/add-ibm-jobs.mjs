#!/usr/bin/env node
/* Import IBM India jobs into jobs-data.js from IBM's careers search API.
 *
 * Usage: node scripts/add-ibm-jobs.mjs <full.json> [checkedOn] [cities]
 *   <full.json> is a JSON array of "_source" rows from POST https://www-api.ibm.com/search/api/v2 with
 *     {"appId":"careers","scopes":["careers2"],"post_filter":{"bool":{"must":[{"term":{"field_keyword_05":"India"}}]}},
 *      "_source":["title","url","body","field_text_01","field_keyword_08","field_keyword_17","field_keyword_18","field_keyword_19","field_keyword_20","field_keyword_21","dcdate"], "size":100,"from":<n>}
 *   ("body" carries the full job text; IBM's job pages themselves sit behind a bot challenge, so they are not fetched.)
 *   [cities] is a comma list of cities to keep (default: Kerala + South India hubs).
 *
 * Only details stated in IBM's listing are used; anything not stated stays empty.
 * Jobs whose IBM job id is already in jobs-data.js are skipped. New jobs are not pinned. */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const [listPath, checkedArg, citiesArg] = process.argv.slice(2);
if (!listPath) { console.error("Usage: node scripts/add-ibm-jobs.mjs <full.json> [YYYY-MM-DD] [cities]"); process.exit(1); }
const checkedOn = checkedArg || new Date().toISOString().slice(0, 10);
const checkedLabel = new Date(checkedOn + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const KEEP = new Set((citiesArg || "bangalore,bengaluru,hyderabad,chennai,coimbatore,mysore,kochi,trivandrum,thiruvananthapuram").split(",").map((c) => c.trim().toLowerCase()));

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "jobs-data.js");
const NOTE = "Job details can change after publishing. Always verify the opening on the employer's official channel before applying. InfoparkDaily is not a recruiter and never collects money for jobs. Never pay anyone for an application or interview.";
const MAX_ITEMS = 15;
const MAX_LEN = 500;
const CITY = {
  bangalore: ["Bengaluru", "Karnataka"], bengaluru: ["Bengaluru", "Karnataka"], hyderabad: ["Hyderabad", "Telangana"], chennai: ["Chennai", "Tamil Nadu"],
  coimbatore: ["Coimbatore", "Tamil Nadu"], mysore: ["Mysuru", "Karnataka"], kochi: ["Kochi", "Kerala"], kolkata: ["Kolkata", "West Bengal"],
  pune: ["Pune", "Maharashtra"], mumbai: ["Mumbai", "Maharashtra"], gurgaon: ["Gurugram", "Haryana"], noida: ["Noida", "Uttar Pradesh"],
  "new delhi": ["New Delhi", "Delhi"], ahmedabad: ["Ahmedabad", "Gujarat"], bhubaneswar: ["Bhubaneswar", "Odisha"],
};
const MODE = { Hybrid: "Hybrid", Remote: "Remote", Onsite: "Work from office", "On-site": "Work from office" };

const trim = (l) => (l.length > MAX_LEN ? l.slice(0, MAX_LEN - 1).replace(/\s+\S*$/, "") + "…" : l);
const clean = (l) => trim(String(l).replace(/[ \t​]/g, " ").replace(/^[\s•▪◦·*\-–→]+(?=\S)/, "").replace(/\s+/g, " ").trim());
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const short = (s, max = 300) => (s.length > max ? s.slice(0, max - 1).replace(/\s+\S*$/, "") + "…" : s);

// IBM's standard intro sentences (business-unit pitch), not specific to the role.
const BOILER = /constant quest for knowledge|supported by mentors and coaches|culture of evolution and empathy|ibm consulting embraces long-term|your ability to accelerate impact and make meaningful change|visionaries across multiple industries|hybrid cloud and ai journeys|career in ibm|ibm consulting is built on|curiosity fuels success|culture of growth and empathy|with support from our strategic partners|you.ll be encouraged to challenge the norm|client innovation cent|being an ibmer|ibm is proud to be an equal|in this role, you will work for ibm bpo|accelerates digital transformation using agile|you.ll work with leading companies across industries|robust ibm technology|long-term client relationships/i;
// A bullet that states a requirement rather than a task.
const REQ_START = /^(experience|expertise|deep expertise|knowledge|proficien|familiar|ability|understanding|skills?|strong|proven|solid|good|excellent|hands.on|bachelor|master|degree|graduate|b\.?tech|b\.?e\b|mca|mba|\d+\+?\s*(?:-\s*\d+\s*)?(?:years|yrs)|minimum|at least|certif|working knowledge|exposure|demonstrated|background|track record|fluency|fluent|preferred|nice to have|must have|excellent|basic|advanced)/i;

// Some bodies carry UTF-8 text decoded as Latin-1 ("Youâ€™ll"); map the common sequences back.
const MOJIBAKE = [["â€™", "’"], ["â€˜", "‘"], ["â€œ", "“"], ["â€\u009d", "”"], ["â€", "”"], ["â€“", "–"], ["â€”", "—"], ["â€¢", "•"], ["Â ", " "], ["Â", ""]];
const demojibake = (s) => MOJIBAKE.reduce((acc, [a, b]) => acc.split(a).join(b), s);

const parseBody = (body, area) => {
  let t = demojibake(String(body || ""));
  // IBM appends the country, area, work mode, job type, location, legal entity and a skills list after the description.
  const tail = t.search(/\sIndia\s(?:(?!\.\s).){0,120}?\b(?:Professional|Internship)\b(?:(?!\.\s).){0,80}?, IN\b/);
  const tailAt = tail > 0 ? tail : area ? t.lastIndexOf(` India ${area}`) : -1;
  if (tailAt > 0) t = t.slice(0, tailAt);
  const head = t.split(/Your primary responsibilities (?:will )?include:?/i);
  const introText = head.length > 1 ? head[0] : t.split("•")[0];
  const bulletText = head.length > 1 ? head.slice(1).join(" ") : t.split("•").slice(1).join("•");
  const intro = introText.split(/(?<=[.!?])\s+(?=[A-Z])/).map(clean).filter((s) => s.length > 3 && !BOILER.test(s));
  const bullets = bulletText.split("•").map(clean).filter((s) => s.length > 3);
  const resp = [], req = [];
  // "Label: text" bullets: the label or the text may show it is a requirement.
  const isReq = (b) => {
    const m = b.match(/^([^:]{2,70}):\s*(.*)$/);
    return REQ_START.test(b) || (m && (REQ_START.test(m[2]) || /\b(knowledge|experience|expertise|skills?|proficiency|familiarity|understanding|certification|qualification|education|background)\b/i.test(m[1])));
  };
  for (const b of bullets) (isReq(b) ? req : resp).push(b);
  return { intro, resp: [...new Set(resp)].slice(0, MAX_ITEMS), req: [...new Set(req)].slice(0, MAX_ITEMS), text: t };
};

const expRange = (t) => {
  const m = t.match(/(\d{1,2})\s*(?:-|–|to)\s*(\d{1,2})\s*\+?\s*(?:years|yrs)/i) || t.match(/(\d{1,2})\s*\+\s*(?:years|yrs)/i)
    || t.match(/(?:minimum|at least|min\.?)\s*(?:of\s*)?(\d{1,2})\s*(?:years|yrs)/i);
  if (!m) return "";
  return m[2] ? `${m[1]}–${m[2]} years` : `${m[1]}+ years`;
};

const toJob = (r, cities) => {
  const jobId = String(r.field_text_01 || (String(r.url).match(/jobId=(\d+)/) || [])[1] || "");
  const places = cities.map((c) => CITY[c.toLowerCase()] || [c.replace(/\b\w/g, (x) => x.toUpperCase()).replace(/\B\w+/g, (x) => x.toLowerCase()), ""]);
  const location = places.length === 1 ? places[0].filter(Boolean).join(", ") : `${places.map((p) => p[0]).join(", ")} (India)`;
  const area = r.field_keyword_08 || "";
  const { intro, resp, req, text } = parseBody(r.body, area);
  const range = expRange(req.join(" \n ") + " \n " + text);
  const intern = /internship/i.test(r.field_keyword_18 || "") || /\bintern(ship)?\b/i.test(r.title);
  const fresher = intern || /\b(fresher|freshers|entry.level|campus|graduate trainee)\b/i.test(r.title + " " + text) || /^0/.test(range);
  const mode = MODE[r.field_keyword_17] || "";
  const desc = intro.join(" ");
  const applyLink = `https://careers.ibm.com/careers/JobDetail?jobId=${jobId}`;
  return {
    id: `ibm-${slug(r.title)}-${slug(places[0][0] || "india")}-${jobId}`,
    company: "IBM",
    logo: "",
    companyBlurb: ["IBM", r.title, places.map((p) => p[0]).join(" / "), mode, range].filter(Boolean).join(" · "),
    location,
    roles: [r.title],
    experience: range ? (fresher || /^0/.test(range) ? "both" : "experienced") : fresher ? "fresher" : "",
    experienceRange: range,
    employmentType: intern ? "Internship" : "",
    applyLink,
    applyDeadline: "",
    postedDate: String(r.dcdate || "").slice(0, 10),
    source: "Company careers page",
    verified: true,
    verificationNote: NOTE,
    tags: [...new Set(["IBM", area, ...places.map((p) => p[0]), places.some((p) => p[1] === "Kerala") ? "Kerala" : "", mode === "Remote" ? "Work from home" : "", intern ? "Internship" : "", fresher ? "Freshers" : ""].filter(Boolean))],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://www.ibm.com/in-en/careers",
    address: "",
    industry: "IT Services / Technology",
    companyDetails: r.field_keyword_20 ? `Hiring entity: ${String(r.field_keyword_20).replace(/^\(\d+\)\s*/, "")}.` : "",
    workDetails: area ? `Area: ${area}.` : "",
    workStatus: "",
    workMode: mode,
    experienceYears: "",
    salaryRange: "",
    qualification: "",
    skills: [],
    requirements: req,
    responsibilities: resp,
    benefits: [],
    howToApply: `Apply on IBM Careers (job ${jobId}).`,
    hiringNotes: `Checked on IBM careers on ${checkedLabel} · Job ID ${jobId}${r.dcdate ? ` · Listed ${String(r.dcdate).slice(0, 10)}` : ""}.`,
    description: desc ? short(desc) : `${r.title} at IBM, ${location}.`,
    startingDate: "",
  };
};

let data = readFileSync(FILE, "utf8");
const ids = new Set([...data.matchAll(/^\s+id: "([^"]+)"/gm)].map((m) => m[1]));
const have = new Set([...data.matchAll(/careers\.ibm\.com\/[^"]*?jobId=(\d+)/g)].map((m) => m[1]));
const fresh = [];
for (const r of JSON.parse(readFileSync(listPath, "utf8"))) {
  const all = (Array.isArray(r.field_keyword_21) && r.field_keyword_21.length ? r.field_keyword_21 : [String(r.field_keyword_19 || "").split(",")[0]]).map((c) => String(c).trim()).filter(Boolean);
  const cities = [...new Set(all.map((c) => c.toLowerCase()))].map((lc) => all.find((c) => c.toLowerCase() === lc));
  if (!cities.some((c) => KEEP.has(c.toLowerCase()))) continue;
  if (/referrals? only/i.test(r.title || "")) continue; // not open to public applicants
  const jobId = String(r.field_text_01 || "");
  if (jobId && have.has(jobId)) continue;
  const j = toJob(r, cities);
  if (ids.has(j.id)) continue;
  ids.add(j.id); have.add(jobId); fresh.push(j);
}
if (!fresh.length) { console.log("Nothing new"); process.exit(0); }
fresh.sort((a, b) => b.postedDate.localeCompare(a.postedDate));
const render = (j) => `  {\n${Object.entries(j).map(([k, v]) => `    ${k}: ${JSON.stringify(v)},`).join("\n")}\n  },\n`;
data = data.replace("var JOBS = [\n", "var JOBS = [\n" + fresh.map(render).join(""));
writeFileSync(FILE, data);
const byCity = {};
fresh.forEach((j) => { byCity[j.location] = (byCity[j.location] || 0) + 1; });
console.log(`Added ${fresh.length} IBM jobs.`);
console.log(Object.entries(byCity).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([c, n]) => `${c}: ${n}`).join(" · "));
