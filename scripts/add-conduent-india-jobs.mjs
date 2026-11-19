#!/usr/bin/env node
/* Import Conduent's open India jobs from careers.conduent.com (Phenom) into jobs-data.js.
 *
 * Usage: node scripts/add-conduent-india-jobs.mjs <pagesDir> [checkedOn]
 *   <pagesDir> holds one saved HTML page per job, named <jobId>.html, from
 *   https://careers.conduent.com/us/en/job/<jobId>. The India job ids come from POST https://careers.conduent.com/widgets
 *   with ddoKey "refineSearch" and selected_fields {"country":["India"]}.
 *   [checkedOn] is the check date as YYYY-MM-DD (defaults to today).
 *
 * Only details stated on Conduent's listing are used; anything not stated stays empty.
 * Jobs whose Conduent job id already appears in jobs-data.js are skipped. New jobs are not pinned. */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const [dir, checkedArg] = process.argv.slice(2);
if (!dir) { console.error("Usage: node scripts/add-conduent-india-jobs.mjs <pagesDir> [YYYY-MM-DD]"); process.exit(1); }
const checkedOn = checkedArg || new Date().toISOString().slice(0, 10);
const checkedLabel = new Date(checkedOn + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "jobs-data.js");
const NOTE = "Job details can change after publishing. Always verify the opening on the employer's official channel before applying. InfoparkDaily is not a recruiter and never collects money for jobs. Never pay anyone for an application or interview.";
const MAX_ITEMS = 15;
const MAX_LEN = 500;
const STATE_FIX = { Hyderabad: "Telangana" }; // the careers site files Hyderabad under Andhra Pradesh

/* Pull the jobDetail JSON object out of the page's embedded phApp.ddo. */
const jobDetail = (html) => {
  const at = html.indexOf('"jobDetail":');
  if (at < 0) return null;
  let i = html.indexOf("{", at), depth = 0, inStr = false;
  for (let j = i; j < html.length; j++) {
    const c = html[j];
    if (inStr) { if (c === "\\") j++; else if (c === '"') inStr = false; continue; }
    if (c === '"') inStr = true;
    else if (c === "{") depth++;
    else if (c === "}" && --depth === 0) return JSON.parse(html.slice(i, j + 1)).data?.job || null;
  }
  return null;
};

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

const BOILER = /through our dedicated associates|equal opportunity employer|reasonable accommodation|ADAAA|^conduent is an/i;
const RESP = /respons|duties|what you('ll| will) do|role purpose|key tasks|day.to.day/i;
const REQ = /qualif|requir|skill|experience|candidate profile|education|eligib|must.have|good.to.have|who you are|what we.re looking|technical|knowledge/i;
const SKIP = /^(job track description|general profile|functional knowledge|business expertise|leadership|problem solving|interpersonal skills|impact)\b/i;

/* Split the description into sections by its bold / heading lines, then sort lines into duties and requirements. */
const sections = (htmlText) => {
  // A block (paragraph, list item, line) is a heading only when the whole block is bold or a <h*>;
  // bold words inside a sentence stay part of that sentence.
  const marked = (htmlText || "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<(h\d)[^>]*>([\s\S]*?)<\/\1>/gi, "\n<strong>$2</strong>\n")
    .split(/<\s*(?:br|\/p|\/li|li|\/div|tr|\/tr|p|div|ul|\/ul|ol|\/ol)\b[^>]*>|\n/i)
    .map((block) => {
      const text = block.replace(/<[^>]+>/g, "");
      if (!text.trim()) return "";
      const bold = [...block.matchAll(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => m[2].replace(/<[^>]+>/g, "")).join("");
      const isHeading = bold.trim() && bold.replace(/\s+/g, "") === text.replace(/\s+/g, "");
      return isHeading ? `§${text}` : text;
    })
    .join("\n");
  const out = { resp: [], req: [], summary: [], other: [] };
  let cur = "summary", sawHeading = false;
  for (let raw of unescape(marked).split("\n")) {
    // Conduent's template headings are sometimes plain text rather than bold.
    if (/^\s*(job track description|general profile|functional knowledge|business expertise|leadership|problem solving|interpersonal skills|impact|responsibility statements)\s*[.:]?\s*$/i.test(raw)) raw = `§${raw.trim()}`;
    if (raw.trim().startsWith("§")) {
      const h = clean(raw.trim().slice(1)).replace(/[:.]$/, "");
      if (!h) continue;
      // A bold run inside a sentence is not a heading; keep it as text.
      if (h.length > 70) { if (!BOILER.test(h)) out[cur].push(h); continue; }
      sawHeading = true;
      cur = SKIP.test(h) ? (/job track/i.test(h) ? "track" : "skip")
        : RESP.test(h) ? "resp" : REQ.test(h) ? "req"
        : /summary|overview|about the role|position/i.test(h) ? "summary"
        : cur === "summary" ? "other" : cur;
      out[cur] ??= [];
      continue;
    }
    const l = clean(raw);
    if (l.length < 3 || BOILER.test(l) || (l.endsWith(":") && l.length <= 60)) continue;
    (out[cur] ??= []).push(l);
  }
  // Conduent's standard track text: keep only the education / experience line as a requirement.
  for (const l of out.track || []) if (/degree|years|experience/i.test(l)) out.req.push(l);
  if (!out.resp.length && !out.req.length) out.resp.push(...out.other, ...(sawHeading ? [] : out.summary.slice(1)));
  else if (out.other.length) out.req.push(...out.other);
  const uniq = (a) => [...new Set(a)].slice(0, MAX_ITEMS);
  return { resp: uniq(out.resp), req: uniq(out.req), summary: out.summary };
};

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const placeOf = (m) => {
  const city = m.city || "";
  const state = STATE_FIX[city] || m.state || "";
  return [city, state].filter(Boolean).join(", ") || m.country || "India";
};

const expRange = (text) => {
  const m = text.match(/(\d{1,2})\s*(?:-|–|to)\s*(\d{1,2})\s*\+?\s*(?:years|yrs)/i) || text.match(/(\d{1,2})\s*\+\s*(?:years|yrs)/i)
    || text.match(/(?:minimum|at least|min\.?)\s*(?:of\s*)?(\d{1,2})\s*(?:years|yrs)/i);
  if (!m) return "";
  return m[2] ? `${m[1]}–${m[2]} years` : /\+/.test(m[0]) ? `${m[1]}+ years` : `${m[1]}+ years`;
};

const toJob = (d) => {
  const id = String(d.jobId);
  const locs = (d.multi_location?.length ? d.multi_location : [d]).filter((m) => !m.country || m.country === "India");
  const places = [...new Set(locs.map(placeOf))];
  const location = places.length ? (places.length === 1 ? places[0] : places.map((p) => p.split(",")[0]).join(", ") + " (India)") : "India";
  const cities = [...new Set(locs.map((m) => m.city).filter(Boolean))];
  const { resp, req, summary } = sections(d.description);
  const fullText = [d.title, ...req, ...resp, ...summary].join(" \n ");
  const experienceRange = expRange([...req, ...summary, ...resp].join(" \n "));
  const fresher = /\bfreshers?\b/i.test(fullText);
  const experience = fresher ? (experienceRange && !/^0/.test(experienceRange) ? "both" : "fresher") : experienceRange ? (/^0/.test(experienceRange) ? "both" : "experienced") : "";
  // The careers-site "remote" flag does not match some descriptions (e.g. "Hyderabad / Hybrid"), so only the text counts.
  const remote = /\bremote\b|work from home|\bwfh\b/i.test(fullText);
  const workMode = [remote ? "Remote" : "", /\bhybrid\b/i.test(fullText) ? "Hybrid" : "", /work from office|\bwfo\b|on-?site/i.test(fullText) ? "Work from office" : ""].filter(Boolean).join(" / ");
  const posted = String(d.postedDate || "").slice(0, 10);
  const applyLink = `https://careers.conduent.com/us/en/job/${id}`;
  const intro = summary.find((l) => l.length > 60) || "";
  const description = intro ? (intro.length > 300 ? intro.slice(0, 299).replace(/\s+\S*$/, "") + "…" : intro) : `${d.title} at Conduent, ${location}.`;
  const employmentType = /temporary/i.test(d.type || "") ? "Full-time (temporary)" : /full-time/i.test(d.type || "") ? "Full-time" : /part-time/i.test(d.type || "") ? "Part-time" : "";

  return {
    id: `conduent-${slug(d.title)}-${id}-${slug(cities[0] || "india")}`,
    company: "Conduent",
    logo: "",
    companyBlurb: ["Conduent", d.title, location, workMode, experienceRange].filter(Boolean).join(" · "),
    location,
    roles: [d.title],
    experience,
    experienceRange,
    employmentType,
    applyLink,
    applyDeadline: "",
    postedDate: posted,
    source: "Company careers page",
    verified: true,
    verificationNote: NOTE,
    tags: [...new Set(["Conduent", d.category, ...cities, places.some((p) => p.includes("Kerala")) ? "Kerala" : "", remote ? "Work from home" : "", fresher ? "Freshers" : ""].filter(Boolean))],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://www.conduent.com",
    address: "",
    industry: "Business Process Services",
    companyDetails: "Conduent delivers mission-critical services and solutions on behalf of Fortune 100 companies and over 500 governments. Opening listed on the official Conduent careers site.",
    workDetails: description !== `${d.title} at Conduent, ${location}.` ? description : "",
    workStatus: d.type || "",
    workMode,
    experienceYears: "",
    salaryRange: "",
    qualification: "",
    skills: [],
    requirements: req,
    responsibilities: resp,
    benefits: [],
    howToApply: `Apply on Conduent Careers (job ${id}): ${applyLink}`,
    hiringNotes: `Checked on careers.conduent.com on ${checkedLabel} · Job ID ${id}${posted ? ` · Portal posted ${posted}` : ""}. No closing date published.`,
    description,
    startingDate: "",
  };
};

let text = readFileSync(FILE, "utf8");
const have = new Set([
  ...[...text.matchAll(/careers\.conduent\.com\/[a-z/]*job\/(\d+)/g)].map((m) => m[1]),
  ...[...text.matchAll(/Job IDs? ([\d, ]+)/g)].flatMap((m) => m[1].match(/\d{4,}/g) || []),
]);
const ids = new Set([...text.matchAll(/^\s+id: "([^"]+)"/gm)].map((m) => m[1]));

const fresh = [];
for (const f of readdirSync(dir).filter((n) => n.endsWith(".html")).sort()) {
  const d = jobDetail(readFileSync(join(dir, f), "utf8"));
  if (!d || have.has(String(d.jobId))) continue;
  if (!(d.multi_location || [d]).some((m) => m.country === "India")) continue;
  const j = toJob(d);
  if (ids.has(j.id)) continue;
  ids.add(j.id); have.add(String(d.jobId));
  fresh.push(j);
}
if (!fresh.length) { console.log("Nothing new"); process.exit(0); }
fresh.sort((a, b) => b.postedDate.localeCompare(a.postedDate));

const render = (j) => `  {\n${Object.entries(j).map(([k, v]) => `    ${k}: ${JSON.stringify(v)},`).join("\n")}\n  },\n`;
text = text.replace("var JOBS = [\n", "var JOBS = [\n" + fresh.map(render).join(""));
writeFileSync(FILE, text);
const byCity = {};
fresh.forEach((j) => { const c = j.location; byCity[c] = (byCity[c] || 0) + 1; });
console.log(`Added ${fresh.length} Conduent India jobs.`);
console.log(Object.entries(byCity).sort((a, b) => b[1] - a[1]).map(([c, n]) => `${c}: ${n}`).join(" · "));
