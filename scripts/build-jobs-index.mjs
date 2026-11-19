#!/usr/bin/env node
/* Build the fast job files from data/jobs-data.js (the source of truth).
 *
 *   data/jobs-index.js          Slim JOBS list (open jobs) for the list pages (home, /jobs/, park boards, job + company pages).
 *   data/jobs-expired.js        The same slim records for jobs whose deadline had passed at build time
 *                               (window.IPD_JOBS_EXPIRED). js/jobs.js loads it only for the "Expired" views.
 *                               Long text is trimmed and the heavy fields are left out; each job gets a "_q"
 *                               search-token string and an "_edu" education string built from the full record.
 *   data/job-details/<n>.json   Full job records, split into SHARDS files by a hash of the job id.
 *                               The job detail page loads just the one shard it needs (js/job-detail-loader.js).
 *
 * It also stamps the new version into every page that loads data/jobs-index.js, so browsers fetch the fresh copy.
 *
 * Usage: node scripts/build-jobs-index.mjs        (run after any change to data/jobs-data.js)
 * A GitHub Action (.github/workflows/jobs-index.yml) runs this automatically when jobs-data.js changes on main. */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, existsSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "data", "jobs-data.js");
const OUT_INDEX = join(ROOT, "data", "jobs-index.js");
const OUT_EXPIRED = join(ROOT, "data", "jobs-expired.js");
const OUT_DIR = join(ROOT, "data", "job-details");
export const SHARDS = 128;

/* Must match shardOf() in js/job-detail-loader.js. */
export function shardOf(id) {
  let h = 0x811c9dc5;
  const s = String(id || "").trim().toLowerCase();
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h % SHARDS;
}

// Fields only the job detail page needs (it loads them from the shard).
const DETAIL_ONLY = new Set([
  "requirements", "responsibilities", "verificationNote", "hiringNotes", "benefits", "startingDate", "faq", "faqs",
  "applySteps", "applyChecklist", "documentsRequired", "selectionProcess", "hiringProcess", "interviewTips", "resumeTips",
  "safetyNotes", "importantNotes", "whoCanApply", "whoShouldApply", "whyJoin", "goodToHave", "softSkills", "technicalSkills",
  "quickFacts", "verificationReport", "schema", "jd", "jobSummary", "locationDetails", "cityVenues", "workLocations",
  "workStates", "educationalQualification", "seoDescription", "seoTitle", "ogTitle", "canonicalUrl", "applyQr", "registerQr",
  "registrationQr", "applyForm",
]);
// Trim these on the list (the full text stays in the shard).
const TRIM = { companyBlurb: 140, description: 150, workDetails: 90, companyDetails: 90, qualification: 140, address: 90, salaryRange: 80, experienceRange: 60, experienceYears: 60, website: 120 };
const DEFAULT_MAX = 200;

const trim = (s, n) => (s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : s);

/* Same normalisation as js/jobs.js normalizeText(). */
function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/(^|[^a-z0-9])\.net\b/g, "$1 dotnet ")
    .replace(/\b(asp|ado|vb)\.net\b/g, "$1 dotnet")
    .replace(/[^a-z0-9+#]+/g, " ")
    .trim();
}
const STOP = new Set("a an and are as at be by for from has have in is it of on or our the this to we will with you your who what job jobs role roles work working team company opening openings apply candidate candidates required requirement requirements good strong ability able etc".split(" "));

// Fields js/jobs.js already searches directly from the list; _q adds only words from the longer text.
export const LIST_SEARCH_FIELDS = (job) => [
  ...(job.roles || []), job.company, job.companyBlurb, job.location, job.industry, job.employmentType, job.workMode,
  job.experienceRange, job.qualification, ...(job.tags || []), ...(job.skills || []).slice(0, 8),
];
function searchTokens(job) {
  const parts = [
    ...(job.skills || []).slice(8, 14), job.description, String(job.workDetails || "").slice(0, 400),
    ...(job.requirements || []).slice(0, 6), ...(job.responsibilities || []).slice(0, 4),
  ];
  const seen = new Set(normalizeText(LIST_SEARCH_FIELDS(job).filter(Boolean).join(" ")).split(" "));
  const out = [];
  for (const w of normalizeText(parts.filter(Boolean).join(" ")).split(" ")) {
    if (!w || STOP.has(w) || seen.has(w) || (w.length < 2 && !/[0-9]/.test(w))) continue;
    seen.add(w);
    out.push(w);
    if (out.length >= 45) break;
  }
  return out.join(" ");
}

const EDU_RE = /plus\s*two|10\s*\+\s*2|\+2|12th|higher secondary|\bhsc\b|\biti\b|ncvt|diploma|\bgnm\b|pharm|bachelor|graduat|degree|b\.?\s?(?:com|tech|sc|ca|ba|des|arch)\b|\bb\.e\b|mbbs|llb|bsc|bca|bba|master|post\s?graduat|\bpg\b|mba|mha|mhrm|m\.?\s?(?:com|tech|sc|ca)\b|\bm\.e\b|mca|\bca\b|cma|acca/i;
function eduText(job) {
  const lines = [job.qualification, ...(job.requirements || []).filter((l) => EDU_RE.test(String(l)))].filter(Boolean).map(String);
  return trim(lines.join(" · "), 300);
}

function slim(job) {
  const out = {};
  for (const [k, v] of Object.entries(job)) {
    if (DETAIL_ONLY.has(k) || v === "" || v === null || v === undefined) continue;
    if (Array.isArray(v) && !v.length) continue;
    if (k === "officialLinks" && v && typeof v === "object") {
      const keep = {};
      for (const key of ["infoparkJob", "technoparkJob", "cyberparkJob"]) if (v[key]) keep[key] = v[key];
      if (Object.keys(keep).length) out[k] = keep;
      continue;
    }
    if (k === "howToApply" && !/\/(?:details\/\d+\/|job-details\/)\d+/i.test(String(v))) continue; // only needed for portal ids
    if (typeof v === "string") { out[k] = trim(v, TRIM[k] || DEFAULT_MAX); continue; }
    if (k === "skills" && Array.isArray(v)) { out[k] = v.slice(0, 8); continue; }
    if (Array.isArray(v) || (v && typeof v === "object")) {
      if (JSON.stringify(v).length > 600) continue; // big nested blocks are detail-only
    }
    out[k] = v;
  }
  out._q = searchTokens(job);
  const edu = eduText(job);
  if (edu) out._edu = edu;
  return out;
}

const text = readFileSync(SRC, "utf8");
const JOBS = new Function(`${text}; return JOBS;`)();
if (!Array.isArray(JOBS)) throw new Error("data/jobs-data.js did not define JOBS");

const version = createHash("sha1").update(text).digest("hex").slice(0, 10);

// Jobs the site already shows as expired (same rule as js/job-deadline.js: past deadline, or a rolling
// listing older than its window) go to the expired file.
const deadlineCtx = {};
new Function("window", "self", "globalThis", readFileSync(join(ROOT, "js", "job-deadline.js"), "utf8"))(deadlineCtx, deadlineCtx, deadlineCtx);
const deadlineLib = deadlineCtx.IPDJobDeadline;
if (!deadlineLib || typeof deadlineLib.deadlineStatus !== "function") throw new Error("js/job-deadline.js did not expose IPDJobDeadline");
const todayIST = new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);
const isExpired = (job) => deadlineLib.deadlineStatus(job) === "expired";

function encodeList(list) {
// Repeated values (company, location, tags, careers URLs…) are stored once in a string table "S";
// in these keys a number means "S[number]"; the small decoder written into each file expands them.
const TABLE_KEYS = ["company", "location", "source", "industry", "website", "logo", "experienceRange", "experienceYears", "workMode",
  "employmentType", "experience", "workStatus", "companyBlurb", "qualification", "address", "companyDetails", "applyDeadline",
  "postedDate", "salaryRange", "tags", "skills", "roles", "_edu", "description", "workDetails"];
const freq = new Map();
const bump = (v) => { if (typeof v === "string" && v.length > 3) freq.set(v, (freq.get(v) || 0) + 1); };
for (const j of list) for (const k of TABLE_KEYS) { const v = j[k]; if (Array.isArray(v)) v.forEach(bump); else bump(v); }
const S = [...freq.entries()].filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).map(([v]) => v);
const pos = new Map(S.map((v, i) => [v, i]));
const enc = (v) => (typeof v === "string" && pos.has(v) ? pos.get(v) : v);
for (const j of list) for (const k of TABLE_KEYS) { const v = j[k]; if (v === undefined) continue; j[k] = Array.isArray(v) ? v.map(enc) : enc(v); }
return JSON.stringify(JSON.stringify({ S, K: TABLE_KEYS, J: list })); // a JS string literal holding the JSON
}

const DECODE = (literal) =>
    `(function (d) {\n` +
    `  var S = d.S, K = d.K, J = d.J, i, k, v, j;\n` +
    `  for (i = 0; i < J.length; i++) {\n` +
    `    j = J[i];\n` +
    `    for (k = 0; k < K.length; k++) {\n` +
    `      v = j[K[k]];\n` +
    `      if (typeof v === "number") j[K[k]] = S[v];\n` +
    `      else if (Array.isArray(v)) j[K[k]] = v.map(function (x) { return typeof x === "number" ? S[x] : x; });\n` +
    `    }\n` +
    `  }\n` +
    `  return J;\n` +
    `})(JSON.parse(${literal}))`;

// Index: JSON inside JSON.parse() parses much faster than a large object literal.
const openList = JOBS.filter((j) => !isExpired(j)).map(slim);
const expiredList = JOBS.filter(isExpired).map(slim);
const HEAD = `/* GENERATED by scripts/build-jobs-index.mjs from data/jobs-data.js — do not edit by hand. */\n`;
writeFileSync(
  OUT_INDEX,
  HEAD +
    `window.IPD_JOBS_VERSION = ${JSON.stringify(version)};\n` +
    `window.IPD_JOBS_SHARDS = ${SHARDS};\n` +
    `window.IPD_JOBS_EXPIRED_COUNT = ${expiredList.length};\n` +
    `var JOBS = ${DECODE(encodeList(openList))};\n`,
);
writeFileSync(OUT_EXPIRED, HEAD + `window.IPD_JOBS_EXPIRED = ${DECODE(encodeList(expiredList))};\n`);

// Detail shards.
mkdirSync(OUT_DIR, { recursive: true });
for (const f of readdirSync(OUT_DIR)) if (f.endsWith(".json")) rmSync(join(OUT_DIR, f));
const shards = Array.from({ length: SHARDS }, () => ({}));
for (const job of JOBS) {
  const id = String(job.id || "").trim().toLowerCase();
  if (!id) continue;
  shards[shardOf(id)][id] = job;
}
shards.forEach((s, i) => writeFileSync(join(OUT_DIR, `${i}.json`), JSON.stringify(s)));

// Stamp the version into every page that loads the index (or still loads the full file).
const SKIP_DIRS = new Set(["node_modules", ".git", "data", "scripts", "vendor", "tests", "pipeline", "build", "artifacts"]);
const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) { if (!SKIP_DIRS.has(name)) walk(p); }
    else if (name.endsWith(".html")) pages.push(p);
  }
})(ROOT);
let stamped = 0;
for (const p of pages) {
  const html = readFileSync(p, "utf8");
  const next = html
    .replace(/\/data\/jobs-data\.js(\?v=[^"']*)?/g, `/data/jobs-index.js?v=${version}`)
    .replace(/\/data\/jobs-index\.js(\?v=[^"']*)?/g, `/data/jobs-index.js?v=${version}`)
    .replace(/\/data\/jobs-expired\.js(\?v=[^"']*)?/g, `/data/jobs-expired.js?v=${version}`);
  if (next !== html) { writeFileSync(p, next); stamped++; }
}

const kb = (f) => Math.round(statSync(f).size / 1024);
console.log(`jobs-data.js ${kb(SRC)} KB → jobs-index.js ${kb(OUT_INDEX)} KB (${openList.length} open) + jobs-expired.js ${kb(OUT_EXPIRED)} KB (${expiredList.length} expired as of ${todayIST}); ${SHARDS} detail shards in ${relative(ROOT, OUT_DIR)}/`);
console.log(`version ${version}; ${stamped} page(s) updated`);
