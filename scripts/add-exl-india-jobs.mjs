#!/usr/bin/env node
/* Import EXL's open India jobs from its Oracle careers site (CX_2) into jobs-data.js.
 *
 * Usage: node scripts/add-exl-india-jobs.mjs <detailsDir> [checkedOn]
 *   <detailsDir> holds one JSON file per requisition, each the response of
 *   https://fa-ewjt-saasfaprod1.fa.ocs.oraclecloud.com/hcmRestApi/resources/latest/recruitingCEJobRequisitionDetails?expand=all&onlyData=true&finder=ById;Id="<id>",siteNumber=CX_2
 *   (the requisition ids come from recruitingCEJobRequisitions?finder=findReqs;siteNumber=CX_2,locationId=300000000467203).
 *   The site throttles parallel requests, so fetch slowly and retry.
 *   [checkedOn] is the check date as YYYY-MM-DD (defaults to today).
 *
 * Only details stated on EXL's listing are used; anything not stated stays empty.
 * Jobs whose requisition already appears in jobs-data.js are skipped. New jobs are not pinned
 * (non-Infopark jobs list by posted date), so existing pinOrder values stay as they are. */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const [dir, checkedArg] = process.argv.slice(2);
if (!dir) { console.error("Usage: node scripts/add-exl-india-jobs.mjs <detailsDir> [YYYY-MM-DD]"); process.exit(1); }
const checkedOn = checkedArg || new Date().toISOString().slice(0, 10);
const checkedLabel = new Date(checkedOn + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "jobs-data.js");
const NOTE = "Job details can change after publishing. Always verify the opening on the employer's official channel before applying. InfoparkDaily is not a recruiter and never collects money for jobs. Never pay anyone for an application or interview.";
const BASE = "https://fa-ewjt-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_2";
const SEARCH = `${BASE}/jobs?location=India&locationId=300000000467203&locationLevel=country&mode=job-location`;
const MAX_ITEMS = 15;
const MAX_LEN = 500;

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", bull: "•", hellip: "…" };
const unescape1 = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&([a-z]+);/gi, (m, n) => ENT[n.toLowerCase()] ?? m);
const unescape = (s) => unescape1(unescape1(s));

const lines = (htmlText) => {
  if (!htmlText) return [];
  const text = unescape(htmlText
    .replace(/<\s*(br|\/p|\/li|li|\/div|\/h\d|tr|\/tr)[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, ""));
  return text.split(/\n|\s•\s/)
    .map((l) => l.replace(/[ \t]/g, " ").replace(/^[\s•▪◦·*\-–o]+(?=\S)/, "").replace(/^\d{1,2}[.)]\s+/, "").replace(/\s+/g, " ").trim())
    .filter((l) => l.length > 2 && !(l.endsWith(":") && l.length <= 60))
    .map((l) => (l.length > MAX_LEN ? l.slice(0, MAX_LEN - 1).replace(/\s+\S*$/, "") + "…" : l));
};

const firstSentences = (s, max = 300) => {
  const t = lines(s).join(" ");
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const end = cut.lastIndexOf(". ");
  return end > 80 ? cut.slice(0, end + 1) : cut.replace(/\s+\S*$/, "") + "…";
};

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const flex = (r, prompt) => (r.requisitionFlexFields || []).find((x) => x.Prompt === prompt)?.Value || "";
const shortLoc = (loc) => (loc || "India").replace(/,\s*India$/, "") || "India";
const MODE = { Hybrid: "Hybrid", "Work From Office": "Work from office", "Work From Home": "Remote" };

const toJob = (r) => {
  const req = String(r.Id);
  const loc = shortLoc(r.PrimaryLocation);
  const city = loc.split(",")[0];
  const extra = (r.secondaryLocations || []).map((s) => shortLoc(s.Name));
  const fn = r.JobFunction || "";
  const role = fn && !r.Title.toLowerCase().includes(fn.toLowerCase()) ? `${r.Title} (${fn})` : r.Title;
  const exp = flex(r, "Experience (In Years)");
  const experience = exp === "Fresher" ? "fresher" : /^0\s*-/.test(exp) ? "both" : exp ? "experienced" : "";
  const experienceRange = exp === "Fresher" ? "Fresher" : exp ? `${exp} years` : "";
  const mode = MODE[r.WorkplaceType] || "";
  const posted = (r.ExternalPostedStartDate || "").slice(0, 10);
  const applyLink = `${BASE}/job/${encodeURIComponent(req)}`;

  const requirements = [...new Set(lines(r.ExternalQualificationsStr))].slice(0, MAX_ITEMS);
  const reqSet = new Set(requirements);
  const responsibilities = [...new Set([...lines(r.ExternalDescriptionStr), ...lines(r.ExternalResponsibilitiesStr)])]
    .filter((l) => !reqSet.has(l)).slice(0, MAX_ITEMS);
  const skills = [...new Set((r.skills || []).map((s) => s.Skill).filter(Boolean))].slice(0, 12);
  const summary = firstSentences(r.ShortDescriptionStr);

  const tags = [...new Set(["EXL", r.Category, fn, city,
    loc.includes("Kerala") ? "Kerala" : "", mode === "Remote" ? "Work from home" : "",
    experience === "fresher" || experience === "both" ? "Freshers" : ""].filter(Boolean))];

  return {
    id: `exl-${slug(r.Title)}-${slug(req)}-${slug(city)}`,
    company: "EXL",
    companyBlurb: ["EXL", role, city, mode, experienceRange].filter(Boolean).join(" · "),
    logo: "",
    location: loc,
    roles: [role],
    experience,
    experienceRange,
    employmentType: "",
    applyLink,
    applyDeadline: "",
    postedDate: posted,
    source: "Company careers page",
    verified: true,
    verificationNote: NOTE,
    tags,
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: `${BASE}/jobs`,
    address: "",
    industry: "",
    companyDetails: "EXL opening listed on EXL's official careers site.",
    workDetails: [summary, extra.length ? `Also listed for: ${extra.join("; ")}.` : ""].filter(Boolean).join(" "),
    workStatus: "",
    workMode: mode,
    experienceYears: "",
    salaryRange: "",
    qualification: "",
    skills,
    requirements,
    responsibilities,
    benefits: [],
    howToApply: `Apply on EXL careers (requisition ${req}).`,
    hiringNotes: `Checked on EXL careers on ${checkedLabel} · Requisition ${req}${posted ? ` · Portal posted ${posted}` : ""}.`,
    description: summary || `${role} at EXL, ${loc}.`,
    startingDate: "",
    officialLinks: { exlJob: applyLink, exlSearch: SEARCH },
  };
};

let text = readFileSync(FILE, "utf8");
const have = new Set([...text.matchAll(/CX_2\/job\/([^"\s?#]+)/g)].map((m) => decodeURIComponent(m[1])));
const ids = new Set([...text.matchAll(/^\s+id: "([^"]+)"/gm)].map((m) => m[1]));

const fresh = [];
for (const f of readdirSync(dir).filter((n) => n.endsWith(".json")).sort()) {
  const r = JSON.parse(readFileSync(join(dir, f), "utf8")).items?.[0];
  if (!r || have.has(String(r.Id))) continue;
  const j = toJob(r);
  if (ids.has(j.id)) continue;
  ids.add(j.id); have.add(String(r.Id));
  fresh.push(j);
}
if (!fresh.length) { console.log("Nothing new"); process.exit(0); }
fresh.sort((a, b) => b.postedDate.localeCompare(a.postedDate));

const render = (j) => `  {\n${Object.entries(j).map(([k, v]) => `    ${k}: ${JSON.stringify(v)},`).join("\n")}\n  },\n`;
text = text.replace("var JOBS = [\n", "var JOBS = [\n" + fresh.map(render).join(""));
writeFileSync(FILE, text);
const byCity = {};
fresh.forEach((j) => { const c = j.location.split(",")[0]; byCity[c] = (byCity[c] || 0) + 1; });
console.log(`Added ${fresh.length} EXL jobs.`);
console.log(Object.entries(byCity).sort((a, b) => b[1] - a[1]).map(([c, n]) => `${c}: ${n}`).join(" · "));
