#!/usr/bin/env node
/* Import jobs from company careers portals (Zoho Recruit, Keka, Zwayam) into jobs-data.js.
 *
 * Usage: node scripts/add-portal-jobs.mjs <dataDir> [checkedOn]
 *   <dataDir> may contain any of these saved portal responses (each is optional):
 *     thanal.json          – jobs array embedded in https://thanal.zohorecruit.in/jobs/Careers (HTML-escaped JSON on the page)
 *     keka-<sub>.json      – GET https://<sub>.keka.com/careers/api/embedjobs/default/active/<orgGuid>  (orgGuid is on /careers/)
 *     niveus.json          – POST https://public.zwayam.com/jobs/search (companyId=MTU3MTk=, domain=career.niveussolutions.com)
 *     niveus-d/<id>.json   – POST https://public.zwayam.com/jobs-service/v1/jobs/careersite {jobUrl, externalSource:"CAREERSITE", campusUrl:"empty", companyId:"15719"}
 *                            (full description; the search result only has a shortened one)
 *     thanal-d/<id>.json   – optional single-job rows from a Thanal job page, used to fill fields the list leaves out (e.g. salary)
 *   [checkedOn] is the check date as YYYY-MM-DD (defaults to today).
 *
 * Only India openings are imported, and only details the listing states; anything not stated stays empty.
 * Jobs whose apply link already appears in jobs-data.js are skipped. New jobs are not pinned. */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const [dir, checkedArg] = process.argv.slice(2);
if (!dir) { console.error("Usage: node scripts/add-portal-jobs.mjs <dataDir> [YYYY-MM-DD]"); process.exit(1); }
const checkedOn = checkedArg || new Date().toISOString().slice(0, 10);
const checkedLabel = new Date(checkedOn + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "jobs-data.js");
const NOTE = "Job details can change after publishing. Always verify the opening on the employer's official channel before applying. InfoparkDaily is not a recruiter and never collects money for jobs. Never pay anyone for an application or interview.";
const MAX_ITEMS = 15;
const MAX_LEN = 500;

const KERALA = /kerala|kozhikode|calicut|kochi|ernakulam|thiruvananthapuram|trivandrum|kannur|kasaragod|thrissur|kollam|alappuzha|kottayam|idukki|malappuram|palakkad|pathanamthitta|wayanad/i;
const STATE_OF = { Bangalore: "Karnataka", Bengaluru: "Karnataka", Mangaluru: "Karnataka", Mangalore: "Karnataka", Udupi: "Karnataka", Kozhikode: "Kerala" };

/* ---------- text helpers ---------- */
const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", bull: "•", hellip: "…", rarr: "→" };
const unescape1 = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&([a-z]+);/gi, (m, n) => ENT[n.toLowerCase()] ?? m);
const unescape = (s) => unescape1(unescape1(String(s || "")));
const trim = (l) => (l.length > MAX_LEN ? l.slice(0, MAX_LEN - 1).replace(/\s+\S*$/, "") + "…" : l);
const HEADING_ONLY = /^(key )?(responsibilities|qualifications?|requirements|experience|skills|education|eligibility)\.?$/i;
const clean = (l) => trim(l.replace(/[ \t]/g, " ").replace(/^[\s•▪◦·*\-–→✅✔️🔹🔸📍📈💶🎯🎓💡👀]+(?=\S)/u, "").replace(/^\d{1,2}[.)]\s+/, "").replace(/\s+/g, " ").trim());
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const short = (s, max = 300) => (s.length > max ? s.slice(0, max - 1).replace(/\s+\S*$/, "") + "…" : s);

const RESP = /respons|duties|what you('ll| will) do|the role|role overview|key tasks|day.to.day|you will/i;
const REQ = /qualif|requir|skill|experience|education|eligib|must.have|good.to.have|who you are|looking for|nice to have|preferred|competenc|criteria/i;
const SKIP = /^(about us|about the company|why join|why .{2,30}\?|what we offer|benefits|perks|attributes we value|how to apply|compensation|job location|location)$/i;
const BOILER = /equal opportunity|we want to hear from you|join us at /i;

/* Split HTML into headed sections, then sort into duties / requirements / summary. */
const htmlSections = (htmlText) => {
  const lines = unescape(String(htmlText || "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<\s*(br|\/p|\/li|li|\/div|div|p|ul|\/ul|ol|\/ol|h\d|\/h\d|tr|\/tr)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, ""))
    .split("\n").map((l) => l.replace(/[ \t]/g, " ").trim()).filter(Boolean);
  const out = { resp: [], req: [], summary: [], skip: [] };
  let cur = "summary";
  for (const raw of lines) {
    const bare = raw.replace(/^[^\p{L}\p{N}]+/u, "").replace(/\s*[:?]\s*$/, "").trim();
    // A short line that ends a block with ":" or is a known heading word switches section.
    if (bare.length <= 60 && (/[:?]\s*$/.test(raw) || SKIP.test(bare) || /^(key responsibilities|responsibilities|requirements|qualifications|skills|the role|role|about the role|job description)$/i.test(bare))) {
      cur = SKIP.test(bare) ? "skip" : RESP.test(bare) ? "resp" : REQ.test(bare) ? "req" : /summary|overview|about the role|job description/i.test(bare) ? "summary" : cur;
      continue;
    }
    const l = clean(raw);
    if (l.length < 3 || BOILER.test(l) || HEADING_ONLY.test(l)) continue;
    out[cur].push(l);
  }
  const uniq = (a) => [...new Set(a)].slice(0, MAX_ITEMS);
  if (!out.resp.length && !out.req.length) out.resp = out.summary.slice(1);
  return { resp: uniq(out.resp), req: uniq(out.req), summary: out.summary };
};

/* Thanal's portal stores plain text with headings run into the sentences; split by sentence and heading words. */
const HEAD_RE = /\b(Key Responsibilities|Roles? (?:and|&) Responsibilities|Responsibilities|Job Responsibilities|Duties(?: and Responsibilities)?|Qualifications?(?: and Experience| & Experience)?|Requirements|Required Skills|Skills(?: Required)?|Eligibility(?: Criteria)?|Educational Qualifications?|Experience Required|Job Summary|Role Summary|Job Purpose|Preferred Qualifications?)\s*:?\s+(?=[A-Z])/g;
const plainSections = (text) => {
  const parts = String(text || "").replace(/\s+/g, " ").replace(HEAD_RE, "\n§$1\n").split("\n");
  const out = { resp: [], req: [], summary: [] };
  let cur = "summary";
  for (const p of parts) {
    if (p.startsWith("§")) { const h = p.slice(1); cur = /summary|purpose/i.test(h) ? "summary" : RESP.test(h) || /duties/i.test(h) ? "resp" : "req"; continue; }
    for (const s of p.split(/(?<=[.!?])\s+(?=[A-Z])/)) {
      const l = clean(s);
      if (l.length >= 3 && !HEADING_ONLY.test(l)) out[cur].push(l);
    }
  }
  const uniq = (a) => [...new Set(a)].slice(0, MAX_ITEMS);
  if (!out.resp.length && !out.req.length) { out.resp = out.summary.slice(1); out.summary = out.summary.slice(0, 1); }
  return { resp: uniq(out.resp), req: uniq(out.req), summary: out.summary };
};

const expInfo = (s) => {
  const t = String(s || "").trim();
  if (!t || /^none$/i.test(t)) return { experience: "", experienceRange: "", extra: "" };
  if (/fresher/i.test(t) && /experienced/i.test(t)) return { experience: "both", experienceRange: "Freshers / experienced", extra: "" };
  if (/^fresher/i.test(t)) return { experience: "fresher", experienceRange: "Fresher", extra: "" };
  const m = t.match(/(\d+(?:\.\d+)?)\s*(?:-|–|to)\s*(\d+(?:\.\d+)?)/) || t.match(/(\d+(?:\.\d+)?)\s*\+/) || t.match(/^(\d+(?:\.\d+)?)\s*(?:years?|yrs?)?$/i);
  if (!m) return { experience: "", experienceRange: "", extra: t };
  const range = m[2] ? `${m[1]}–${m[2]} years` : /\+/.test(m[0]) ? `${m[1]}+ years` : `${m[1]} year${m[1] === "1" ? "" : "s"}`;
  return { experience: +m[1] === 0 ? "both" : "experienced", experienceRange: range, extra: t.length > 25 ? t : "" };
};

const base = (o) => ({
  logo: "", experience: "", experienceRange: "", employmentType: "", applyDeadline: "", postedDate: "",
  source: "Company careers page", verified: true, verificationNote: NOTE, tags: [], isWalkIn: false, walkInDate: "",
  email: "", phone: "", website: "", address: "", industry: "", companyDetails: "", workDetails: "", workStatus: "",
  workMode: "", experienceYears: "", salaryRange: "", qualification: "", skills: [], requirements: [], responsibilities: [],
  benefits: [], howToApply: "", hiringNotes: "", description: "", startingDate: "", ...o,
});
const tagsFor = (company, extra, location, exp) => [...new Set([company, ...extra, ...location.split(/,\s*|\s*\/\s*|\s*\(/).slice(0, 1), KERALA.test(location) ? "Kerala" : "", exp === "fresher" || exp === "both" ? "Freshers" : ""].filter(Boolean))];

/* ---------- Thanal (Zoho Recruit) ---------- */
const fromThanal = (rows) => rows.filter((r) => (r.Country || "India") === "India").map((r) => {
  const title = String(r.Posting_Title || r.Job_Opening_Name).replace(/\s+/g, " ").replace(/\s*-\s*/g, " – ").trim();
  const city = String(r.City || "").trim();
  const location = [city, r.State].filter(Boolean).join(", ") || "India";
  const { resp, req, summary } = plainSections(r.Job_Description);
  const exp = expInfo(r.Work_Experience);
  const applyLink = `https://thanal.zohorecruit.in/jobs/Careers/${r.id}/${encodeURIComponent(String(r.Posting_Title).trim().replace(/\s+/g, "-"))}`;
  const salary = r.Salary && !/^None$/i.test(r.Salary) ? String(r.Salary).replace(/^INR\s*/, "₹").replace(/\s*-\s*INR\s*/, " – ₹") : "";
  const intro = summary.find((l) => l.length > 50) || "";
  return base({
    id: `thanal-${slug(title)}-${slug(city || "india")}-${String(r.id).slice(-8)}`,
    company: "Thanal", companyBlurb: ["Thanal", title, city, exp.experienceRange].filter(Boolean).join(" · "),
    location, roles: [title], ...exp, extra: undefined, employmentType: /part/i.test(r.Job_Type || "") ? "Part-time" : /full/i.test(r.Job_Type || "") ? "Full-time" : "",
    applyLink, postedDate: r.Date_Opened || "", website: "https://thanal.zohorecruit.in/jobs/Careers",
    industry: r.Industry || "Nonprofit healthcare and rehabilitation",
    companyDetails: "Opening listed on Thanal's careers portal (Daya Rehabilitation Trust).",
    tags: tagsFor("Thanal", ["Healthcare", "Non IT"], location, exp.experience),
    salaryRange: salary, workStatus: r.Job_Type || "",
    requirements: [...(exp.extra ? [`Experience: ${exp.extra}`] : []), ...req].slice(0, MAX_ITEMS), responsibilities: resp,
    howToApply: "Apply on Thanal's careers portal.",
    hiringNotes: `Checked on Thanal's careers portal on ${checkedLabel} · Job opened ${r.Date_Opened || "date not stated"}.`,
    description: intro ? short(intro) : `${title} at Thanal, ${location}.`,
  });
});

/* ---------- Keka ---------- */
const KEKA_NAMES = { dropxcelllp: { name: "Finanshels", industry: "Accounting, tax & audit services" }, discoverdollar: { name: "Discover Dollar", industry: "AI for finance (spend & revenue recovery)" } };
const fromKeka = (sub, rows) => rows.flatMap((r) => {
  const meta = KEKA_NAMES[sub] || { name: sub, industry: "" };
  const cities = [...new Set((r.jobLocations || []).map((l) => String(l.city || "").trim()).filter(Boolean))];
  const indian = cities.filter((c) => STATE_OF[c] || KERALA.test(c) || /india/i.test(c));
  if (!indian.length) return [];
  const location = indian.length === 1 ? [indian[0], STATE_OF[indian[0]]].filter(Boolean).join(", ") : `${indian.join(", ")} (India)`;
  const { resp, req, summary } = htmlSections(r.description);
  const exp = expInfo(r.experience);
  const s = r.salaryRange;
  const salary = s && s.maximum >= 1000 ? `${s.currency === "INR" ? "₹" : s.currency + " "}${s.minimum.toLocaleString("en-IN")} – ${s.currency === "INR" ? "₹" : ""}${s.maximum.toLocaleString("en-IN")}${s.salaryPeriod === 0 ? " per year" : s.salaryPeriod === 4 ? " per year" : ""}` : "";
  const intro = summary.find((l) => l.length > 60 && !/join us|why /i.test(l)) || "";
  const applyLink = `https://${sub}.keka.com/careers/jobdetails/${r.id}`;
  return [base({
    id: `${slug(meta.name)}-${slug(r.title)}-${slug(indian[0])}-${r.id}`,
    company: meta.name, companyBlurb: [meta.name, r.title, indian.join(" / "), exp.experienceRange].filter(Boolean).join(" · "),
    location, roles: [r.title], experience: exp.experience, experienceRange: exp.experienceRange,
    applyLink, postedDate: String(r.publishedOn || "").slice(0, 10), website: `https://${sub}.keka.com/careers/`, industry: meta.industry,
    tags: tagsFor(meta.name, [r.departmentName].filter(Boolean), location, exp.experience),
    salaryRange: salary, skills: (r.skillNames || []).slice(0, 10),
    workDetails: [r.departmentName ? `${r.departmentName} team.` : "", cities.length > indian.length ? `Also listed for: ${cities.filter((c) => !indian.includes(c)).join(", ")}.` : ""].filter(Boolean).join(" "),
    requirements: [...(exp.extra ? [`Experience: ${exp.extra}`] : []), ...req].slice(0, MAX_ITEMS), responsibilities: resp,
    howToApply: `Apply on ${meta.name}'s Keka careers page (job ${r.id}).`,
    hiringNotes: `Checked on ${meta.name} careers on ${checkedLabel} · Job ${r.id} · Published ${String(r.publishedOn || "").slice(0, 10)}.`,
    description: intro ? short(intro) : `${r.title} at ${meta.name}, ${location}.`,
  })];
});

/* ---------- Niveus (Zwayam) ---------- */
const fromNiveus = (rows) => rows.map((x) => x._source).filter(Boolean).flatMap((s) => {
  const places = String(s.locationSeparatedbySlash || "").split(/\s*\/\s*/).map((p) => p.replace(/,\s*India$/, "").trim()).filter((p) => p && p !== "India");
  const location = places.length === 1 ? places[0] : places.length ? `${places.map((p) => p.split(",")[0]).join(", ")} (India)` : "India";
  const detailFile = join(dir, "niveus-d", `${s.id}.json`);
  const detail = existsSync(detailFile) ? (({ reponseObject, ...rest }) => reponseObject || rest)(JSON.parse(readFileSync(detailFile, "utf8"))) : null;
  const { resp, req, summary } = htmlSections(detail?.longDescription || s.mediumDescription);
  const range = s.experienceUIField || (s.minYearOfExperience != null ? `${s.minYearOfExperience}-${s.maxYearOfExperience} years` : "");
  const exp = expInfo(range);
  const applyLink = `https://career.niveussolutions.com/niveussolutions/jobview/${s.jobUrl}`;
  const posted = s.jobCreatedDate ? new Date(+s.jobCreatedDate).toISOString().slice(0, 10) : "";
  const intro = summary.find((l) => l.length > 60) || "";
  return [base({
    id: `niveus-${slug(s.jobTitle)}-${slug(places[0] || "india")}-${s.id || s.JobId}`,
    company: "Niveus Solutions", companyBlurb: ["Niveus Solutions", s.jobTitle, places.map((p) => p.split(",")[0]).join(" / "), exp.experienceRange].filter(Boolean).join(" · "),
    location, roles: [s.jobTitle], experience: exp.experience, experienceRange: exp.experienceRange,
    applyLink, postedDate: posted, website: "https://career.niveussolutions.com/niveussolutions/", industry: "Cloud services (Google Cloud partner)",
    tags: tagsFor("Niveus Solutions", [s.text1, s.departmentName].filter(Boolean), location, exp.experience),
    skills: (s.mandatorySkills || s.skillsToEvaluateList || []).slice(0, 10),
    workDetails: [s.departmentName ? `${s.departmentName}.` : "", s.positionsRequired > 1 ? `${s.positionsRequired} positions.` : ""].filter(Boolean).join(" "),
    requirements: req, responsibilities: resp,
    howToApply: `Apply on Niveus Solutions' careers site (job code ${s.newJobCode || s.referenceNumber || s.id}).`,
    hiringNotes: `Checked on Niveus careers on ${checkedLabel} · Job code ${s.newJobCode || s.referenceNumber || s.id}${posted ? ` · Created ${posted}` : ""}.`,
    description: intro ? short(intro) : `${s.jobTitle} at Niveus Solutions, ${location}.`,
  })];
});

/* ---------- run ---------- */
const read = (f) => JSON.parse(readFileSync(join(dir, f), "utf8"));
const candidates = [];
if (existsSync(join(dir, "thanal.json"))) {
  const extra = existsSync(join(dir, "thanal-d")) ? readdirSync(join(dir, "thanal-d")).flatMap((f) => read(join("thanal-d", f))) : [];
  const byId = new Map(extra.map((r) => [String(r.id), r]));
  candidates.push(...fromThanal(read("thanal.json").map((r) => ({ ...r, ...Object.fromEntries(Object.entries(byId.get(String(r.id)) || {}).filter(([k, v]) => k !== "Job_Description" && v != null && v !== "")) }))));
}
for (const f of readdirSync(dir).filter((n) => /^keka-[a-z0-9-]+\.json$/.test(n))) candidates.push(...fromKeka(f.slice(5, -5), read(f)));
if (existsSync(join(dir, "niveus.json"))) candidates.push(...fromNiveus(read("niveus.json").data?.data || []));

let text = readFileSync(FILE, "utf8");
const ids = new Set([...text.matchAll(/^\s+id: "([^"]+)"/gm)].map((m) => m[1]));
const fresh = [];
for (const j of candidates) {
  delete j.extra;
  const key = j.applyLink.replace(/\/[^/]*$/, (m) => (j.company === "Thanal" ? "" : m)); // Thanal links match on the id, not the slug
  if (ids.has(j.id) || text.includes(key)) continue;
  ids.add(j.id); fresh.push(j);
}
if (!fresh.length) { console.log("Nothing new"); process.exit(0); }
fresh.sort((a, b) => b.postedDate.localeCompare(a.postedDate));
const render = (j) => `  {\n${Object.entries(j).map(([k, v]) => `    ${k}: ${JSON.stringify(v)},`).join("\n")}\n  },\n`;
text = text.replace("var JOBS = [\n", "var JOBS = [\n" + fresh.map(render).join(""));
writeFileSync(FILE, text);
const byCo = {};
fresh.forEach((j) => { byCo[j.company] = (byCo[j.company] || 0) + 1; });
console.log(`Added ${fresh.length} jobs: ` + Object.entries(byCo).map(([c, n]) => `${c} ${n}`).join(" · "));
