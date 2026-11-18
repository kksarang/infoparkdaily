#!/usr/bin/env node
/* Add jobs restored on 18 Nov 2026 from official career pages and employer posts, pinned at the top of JOBS.
 * Only details printed on each poster are used; anything not on a poster stays empty.
 * Skips any job whose id is already in jobs-data.js. */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "jobs-data.js");
const NOTE = "Job details can change after publishing. Always verify the opening on the employer's official channel before applying. InfoparkDaily is not a recruiter and never collects money for jobs. Never pay anyone for an application or interview.";
const ADDED = "Added 18 Nov 2026 from the employer's official listing. Verify with the employer before applying.";
const mail = (email, subject) => `mailto:${email}?subject=${encodeURIComponent(subject)}`;

const job = (o) => ({
  logo: "", experienceRange: "", employmentType: "", applyDeadline: "Rolling", postedDate: "2026-11-18",
  source: "WhatsApp", verified: true, verificationNote: NOTE, tags: [], isWalkIn: false, walkInDate: "",
  email: "", phone: "", website: "", address: "", industry: "", companyDetails: "", workDetails: "",
  workStatus: "", workMode: "", experienceYears: "", salaryRange: "", qualification: "", skills: [],
  requirements: [], responsibilities: [], benefits: [], howToApply: "", hiringNotes: ADDED,
  description: "", startingDate: "", ...o,
});


const DIRECT = (o) => job({ source: "Direct", ...o });

const JOBS_NEW = [
  DIRECT({ id: "sutherland-associate-sr-associate-bengaluru-1639268-nov18", company: "Sutherland",
    companyBlurb: "Sutherland · Associate / Sr. Associate · Bengaluru · 2025 graduates (any UG/PG) · night shifts · must live within 25 km of office",
    location: "Bengaluru, Karnataka", roles: ["Associate / Sr. Associate"], experience: "fresher", experienceRange: "2025 pass-outs",
    applyLink: "https://www.jobs.sutherlandglobal.com/job-details/associate-sr-associate-refferal-in-insurance-jobs-1639268", postedDate: "2026-07-14", employmentType: "Full-time",
    tags: ["Sutherland", "Customer Support", "Freshers", "BPO", "Non IT"], website: "https://www.jobs.sutherlandglobal.com", address: "Bengaluru, Karnataka", industry: "BPO / Customer Experience",
    workMode: "On-site · shifts including nights", qualification: "Any full-time UG/PG graduate (Arts/Science/Commerce/Engineering/Pharma/MBA/MCA), 2025 pass-out",
    skills: ["English communication", "Typing", "Customer service"],
    requirements: ["Any full-time UG/PG graduate — 2025 pass-out", "Excellent verbal and written English", "Good analytical and typing skills", "Flexible to work shifts including nights", "Must reside within 25 km of the office"],
    responsibilities: ["Resolve customer requests and inquiries via email, chat or social media", "Achieve contact center statistics and SLAs", "Adhere to non-disclosure and data security policies", "Complete mandated upskilling and e-courses; attend coaching sessions", "Maintain 100% schedule adherence"],
    howToApply: "Apply on Sutherland's careers site (job 1639268). Sutherland never asks for payment for jobs.",
    hiringNotes: "Sutherland job 1639268 · posted 14 Jul 2026 · listing still live on 18 Nov 2026. Some sites call this work-from-home; the official listing is Bengaluru with a 25 km residence rule.",
    description: "Sutherland Associate / Sr. Associate · Bengaluru · 2025 graduates · customer support via email, chat and social · night shifts." }),
];

let text = readFileSync(FILE, "utf8");
const fresh = JOBS_NEW.filter((j) => !text.includes(`id: "${j.id}"`));
if (!fresh.length) { console.log("Nothing new"); process.exit(0); }
const pins = [...text.matchAll(/pinOrder: (\d+),/g)].map((m) => +m[1]);
if (new Set(pins).size !== pins.length) throw new Error("Duplicate pinOrder values");
text = text.replace(/pinOrder: (\d+),/g, (_, n) => `pinOrder: ${+n + fresh.length},`);
const render = (j, i) => {
  const body = Object.entries({ ...j, pinOrder: i + 1 })
    .map(([k, v]) => `    ${k}: ${JSON.stringify(v)},`).join("\n");
  return `  {\n${body}\n  },\n`;
};
text = text.replace("var JOBS = [\n", "var JOBS = [\n" + fresh.map(render).join(""));
writeFileSync(FILE, text);
console.log(`Added ${fresh.length} poster jobs:`);
fresh.forEach((j, i) => console.log(`${String(i + 1).padStart(2)}. ${j.company} — ${j.roles[0]}`));
