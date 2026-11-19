#!/usr/bin/env node
/* Import Accenture India jobs from accenture.com/in-en/careers/jobsearch into jobs-data.js.
 *
 * Usage: node scripts/add-accenture-jobs.mjs <list.json> [checkedOn]
 *   <list.json> is a JSON array of the "data" rows returned by POST https://www.accenture.com/api/accenture/elastic/findjobs
 *   (form fields: startIndex, maxResultSize, jobCountry=India, jobLanguage=en, countrySite=in-en, sortBy=1,
 *   searchType=vectorSearch, jobFilters=[{"fieldName":"location.keyword","items":[...cities],"multiSelect":true}]).
 *   Each row already carries the full job description.
 *   [checkedOn] is the check date as YYYY-MM-DD (defaults to today); "Posted N days ago" is counted back from it.
 *
 * Only details stated on Accenture's listing are used; anything not stated stays empty.
 * Jobs whose requisition already appears in jobs-data.js are skipped. New jobs are not pinned. */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const [listPath, checkedArg] = process.argv.slice(2);
if (!listPath) { console.error("Usage: node scripts/add-accenture-jobs.mjs <list.json> [YYYY-MM-DD]"); process.exit(1); }
const checkedOn = checkedArg || new Date().toISOString().slice(0, 10);
const checkedLabel = new Date(checkedOn + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "jobs-data.js");
const NOTE = "Job details can change after publishing. Always verify the opening on the employer's official channel before applying. InfoparkDaily is not a recruiter and never collects money for jobs. Never pay anyone for an application or interview.";
const MAX_ITEMS = 15;
const MAX_LEN = 500;
const STATE = {
  Chennai: "Tamil Nadu", Coimbatore: "Tamil Nadu", Tiruchirappalli: "Tamil Nadu", Kochi: "Kerala", Thiruvananthapuram: "Kerala",
  Bengaluru: "Karnataka", Hyderabad: "Telangana", Mumbai: "Maharashtra", "Navi Mumbai": "Maharashtra", Pune: "Maharashtra",
  Thane: "Maharashtra", Nagpur: "Maharashtra", Gurugram: "Haryana", Noida: "Uttar Pradesh", "New Delhi": "Delhi",
  Kolkata: "West Bengal", Bhubaneswar: "Odisha", Ahmedabad: "Gujarat", Gandhinagar: "Gujarat", Jaipur: "Rajasthan", Indore: "Madhya Pradesh",
};
const MODE = { Remote: "Remote", "Hybrid Eligible": "Hybrid", "On-Site": "Work from office" };

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", bull: "•", hellip: "…", rarr: "→" };
const unescape1 = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&([a-z]+);/gi, (m, n) => ENT[n.toLowerCase()] ?? m);
const unescape = (s) => unescape1(unescape1(s));
const clean = (l) => {
  l = l.replace(/[ \t]/g, " ").replace(/^[\s•▪◦·*\-–→o]+(?=\S)/, "").replace(/^\d{1,2}[.)]\s+/, "").replace(/\s+/g, " ").trim();
  return l.length > MAX_LEN ? l.slice(0, MAX_LEN - 1).replace(/\s+\S*$/, "") + "…" : l;
};
const isNA = (s) => !s || /^(na|n\/a|none|-)$/i.test(s.trim());

const BOILER = /fraudulent|important notice|no one is ever required to pay|equal (employment )?opportunit|visit us at www\.accenture|^accenture is a global professional services/i;
const KV = /^(project role description|project role|must have skills|good to have skills|educational qualification|skill required|designation|qualifications?|years of experience)$/i;
const RESP = /respons|what would you do|duties|key tasks|day.to.day|you will/i;
const REQ = /skill|qualif|requir|experience|education|what are we looking|need|bonus|desirable|prerequisite|attributes|competenc|expectations|proficiency|additional information/i;
const SUMMARY = /^(summary|job summary|overview|about the role)$/i;

const parse = (htmlText) => {
  const text = unescape((htmlText || "")
    .replace(/<(b|strong)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, t, inner) => {
      const s = inner.replace(/<[^>]+>/g, "").trim();
      return /[:?]\s*$/.test(s) ? `\n§${s}` : s;
    })
    .replace(/<\s*(br|\/p|\/li|li|\/div|ul|\/ul|ol|\/ol|p|div)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, ""))
    .replace(/\s•\s/g, "\n• ");
  const kv = {}, out = { resp: [], req: [], summary: [], about: [] };
  let cur = "summary";
  const heading = (label) => {
    const h = label.replace(/\s*[:?]\s*$/, "").trim();
    if (/^about accenture$/i.test(h)) return "about";
    if (SUMMARY.test(h)) return "summary";
    if (RESP.test(h)) return "resp";
    if (REQ.test(h)) return "req";
    return cur === "about" ? "summary" : cur; // sub-headings inside a list keep the current section
  };
  for (let raw of text.split("\n")) {
    raw = raw.replace(/[ \t]/g, " ").trim();
    if (!raw) continue;
    let label = "", rest = raw;
    if (raw.startsWith("§")) {
      const m = raw.slice(1).match(/^(.*?[:?])\s*(.*)$/);
      label = m ? m[1] : raw.slice(1); rest = m ? m[2] : "";
    } else {
      const m = raw.match(/^([A-Z][A-Za-z &/]{2,40}?)\s*:\s*(.*)$/);
      if (m && (KV.test(m[1].trim()) || !m[2])) { label = m[1] + ":"; rest = m[2]; }
    }
    if (label) {
      const name = label.replace(/\s*[:?]\s*$/, "").trim();
      if (KV.test(name)) { kv[name.toLowerCase()] = clean(rest); continue; }
      cur = heading(label);
      if (!rest) continue;
    }
    const l = clean(rest);
    if (l.length < 3 || BOILER.test(l)) continue;
    if (cur === "about") continue;
    if (/^minimum\s+\d+\s+year\(s\) of experience is required$/i.test(l)) { out.req.push(l); continue; }
    out[cur].push(l);
  }
  const uniq = (a) => [...new Set(a)].slice(0, MAX_ITEMS);
  return { kv, resp: uniq(out.resp), req: uniq(out.req), summary: out.summary };
};

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const isoMinusDays = (n) => new Date(Date.parse(checkedOn + "T00:00:00Z") - n * 864e5).toISOString().slice(0, 10);
const postedFrom = (t = "") => {
  if (/within last 24 hours|today/i.test(t)) return checkedOn;
  const m = t.match(/posted (\d+) days? ago/i);
  return m ? isoMinusDays(+m[1]) : "";
};
const short = (s, max = 300) => (s.length > max ? s.slice(0, max - 1).replace(/\s+\S*$/, "") + "…" : s);

const toJob = (r) => {
  const req = r.requisitionId;
  const cities = [...new Set(r.location || [])];
  const location = cities.length === 1 ? [cities[0], STATE[cities[0]]].filter(Boolean).join(", ") : `${cities.join(", ")} (India)`;
  const { kv, resp, req: reqs, summary } = parse(r.jobDescription);
  const range = (r.yearsOfExperience || "").replace(/^experience:\s*/i, "").replace(/(\d)\s*-\s*(\d)/, "$1–$2");
  const fresher = /^0\s*[–-]/.test(range);
  const experience = range ? (fresher ? "both" : "experienced") : "";
  const mode = MODE[r.remoteType] || "";
  const posted = postedFrom(r.postedDateText);
  const applyLink = `https://www.accenture.com/in-en/careers/jobdetails?id=${encodeURIComponent(r.guid || `${req}_en`)}`;
  const must = isNA(kv["must have skills"]) ? "" : kv["must have skills"];
  const good = isNA(kv["good to have skills"]) ? "" : kv["good to have skills"];
  const skills = [...new Set([must, ...(good ? good.split(/\s*[,|]\s*/) : []), ...(r.skill || []).filter((s) => !must.includes(s))].filter(Boolean))].slice(0, 10);
  // qualificationShort sometimes holds a whole HTML block or a recruiter placeholder; only use a short plain value.
  const plainQual = clean(unescape(String(r.qualificationShort || "").replace(/<[^>]+>/g, " ")));
  const qualification = [kv["educational qualification"], kv.qualifications, kv.qualification, plainQual]
    .find((q) => q && q.length <= 150 && !/\b(tbd|to be filled|recruiter)\b/i.test(q)) || "";
  const roleDesc = kv["project role description"] || "";
  const intro = roleDesc || summary.find((l) => l.length > 60) || "";
  const description = intro ? short(intro) : `${r.title} at Accenture, ${location}.`;
  const requirements = [...new Set([
    must ? `Must have: ${must}` : "", good ? `Good to have: ${good}` : "",
    kv["years of experience"] ? `Experience: ${kv["years of experience"]}` : "",
    ...reqs,
    qualification && !reqs.some((l) => l.includes(qualification)) ? `Qualification: ${qualification}` : "",
  ].filter(Boolean))].slice(0, MAX_ITEMS);
  const responsibilities = resp.length ? resp : summary.filter((l) => l !== intro && l.length > 40).slice(0, 6);

  return {
    id: `accenture-${slug(r.title)}-${slug(req)}-${slug(cities[0] || "india")}`,
    company: "Accenture",
    logo: "",
    companyBlurb: ["Accenture", r.title, cities.join(" / "), mode, range].filter(Boolean).join(" · "),
    location,
    roles: [r.title],
    experience,
    experienceRange: range,
    employmentType: /part/i.test(r.jobScheduleDescription || "") ? "Part-time" : "Full-time",
    applyLink,
    applyDeadline: "",
    postedDate: posted,
    source: "Company careers page",
    verified: true,
    verificationNote: NOTE,
    tags: [...new Set(["Accenture", ...(r.jobFamilyGroup || []), ...cities, cities.some((c) => STATE[c] === "Kerala") ? "Kerala" : "", mode === "Remote" ? "Work from home" : "", fresher ? "Freshers" : ""].filter(Boolean))],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://www.accenture.com/in-en/careers",
    address: "",
    industry: "IT Services / Consulting",
    companyDetails: "",
    workDetails: [roleDesc && summary.length ? short(summary.find((l) => l.length > 60) || "", 400) : "", r.careerLevel ? `Career level: ${r.careerLevel}.` : ""].filter(Boolean).join(" "),
    workStatus: r.jobScheduleDescription || "",
    workMode: mode,
    experienceYears: "",
    salaryRange: "",
    qualification,
    skills,
    requirements,
    responsibilities,
    benefits: [],
    howToApply: `Apply on Accenture Careers (job ${req}).`,
    hiringNotes: `Checked on Accenture careers on ${checkedLabel} · Requisition ${req} · ${r.postedDateText || "Posting date not shown"}.`,
    description,
    startingDate: "",
  };
};

let text = readFileSync(FILE, "utf8");
const have = new Set([...text.matchAll(/jobdetails\?id=([A-Za-z0-9-]+?)(?:_en|&|")/g)].map((m) => m[1]));
const ids = new Set([...text.matchAll(/^\s+id: "([^"]+)"/gm)].map((m) => m[1]));

const fresh = [];
for (const r of JSON.parse(readFileSync(listPath, "utf8"))) {
  if (!r?.requisitionId || have.has(r.requisitionId)) continue;
  const j = toJob(r);
  if (ids.has(j.id)) continue;
  ids.add(j.id); have.add(r.requisitionId);
  fresh.push(j);
}
if (!fresh.length) { console.log("Nothing new"); process.exit(0); }
fresh.sort((a, b) => b.postedDate.localeCompare(a.postedDate));

const render = (j) => `  {\n${Object.entries(j).map(([k, v]) => `    ${k}: ${JSON.stringify(v)},`).join("\n")}\n  },\n`;
text = text.replace("var JOBS = [\n", "var JOBS = [\n" + fresh.map(render).join(""));
writeFileSync(FILE, text);
const byCity = {};
fresh.forEach((j) => { byCity[j.location] = (byCity[j.location] || 0) + 1; });
console.log(`Added ${fresh.length} Accenture jobs.`);
console.log(Object.entries(byCity).sort((a, b) => b[1] - a[1]).map(([c, n]) => `${c}: ${n}`).join(" · "));
