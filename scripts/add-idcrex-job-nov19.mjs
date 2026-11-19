#!/usr/bin/env node
/* Add IDCREX Analyst - Australian Accounting (Kochi) from the company's own careers page (19 Nov 2026), pinned at the top of JOBS.
 * Only details stated on the official listing are used; anything not stated stays empty.
 * Skips any job whose id is already in jobs-data.js. */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "jobs-data.js");
const NOTE = "Job details can change after publishing. Always verify the opening on the employer's official channel before applying. InfoparkDaily is not a recruiter and never collects money for jobs. Never pay anyone for an application or interview.";
const ADDED = "Added 19 Nov 2026 from the employer's official listing. Verify with the employer before applying.";
const mail = (email, subject) => `mailto:${email}?subject=${encodeURIComponent(subject)}`;

const job = (o) => ({
  logo: "", experienceRange: "", employmentType: "", applyDeadline: "Rolling", postedDate: "2026-11-19",
  source: "WhatsApp", verified: true, verificationNote: NOTE, tags: [], isWalkIn: false, walkInDate: "",
  email: "", phone: "", website: "", address: "", industry: "", companyDetails: "", workDetails: "",
  workStatus: "", workMode: "", experienceYears: "", salaryRange: "", qualification: "", skills: [],
  requirements: [], responsibilities: [], benefits: [], howToApply: "", hiringNotes: ADDED,
  description: "", startingDate: "", ...o,
});

const JOBS_NEW = [
  job({ id: "idcrex-analyst-us-accounting-kochi-101008", company: "IDCREX", source: "Company careers page",
    companyBlurb: "IDCREX · Analyst – US Accounting · Kochi · no prior experience needed",
    location: "Kochi, Kerala", roles: ["Analyst – US Accounting"], experience: "both",
    applyLink: "https://idcrex.com/1/global/job_101008.php", tags: ["IDCREX", "Accounting", "US Accounting", "Kerala", "Non IT"],
    website: "https://idcrex.com", industry: "Accounting, fund services and back office",
    workDetails: "Day-to-day online accounting services for clients in the US.",
    requirements: ["No prior experience required; accounting experience is an advantage"],
    responsibilities: [
      "Meet daily, weekly and monthly client deliverables as set out in service agreements",
      "Troubleshoot issues in the assigned area and refer complex problems to the manager",
      "Work within established policies and procedures",
    ],
    howToApply: "See the listing on IDCREX's careers page (job 101008) for how to apply.",
    hiringNotes: "Listed on IDCREX's own careers page, seen 19 Nov 2026. Posting date and application method not stated on the listing.",
    description: "US accounting analyst at IDCREX, Kochi; open to candidates without prior experience." }),
  job({ id: "idcrex-analyst-australian-accounting-kochi-101007", company: "IDCREX", source: "Company careers page",
    companyBlurb: "IDCREX · Analyst – Australian Accounting · Kochi · no prior experience needed",
    location: "Kochi, Kerala", roles: ["Analyst – Australian Accounting"], experience: "both",
    applyLink: "https://idcrex.com/1/global/job_101007.php", tags: ["IDCREX", "Accounting", "Australian Accounting", "Kerala", "Non IT"],
    website: "https://idcrex.com", industry: "Accounting, fund services and back office",
    workDetails: "Day-to-day online accounting services for clients in Australia.",
    requirements: ["No prior experience required; accounting experience is an advantage"],
    responsibilities: [
      "Meet daily, weekly and monthly client deliverables as set out in service agreements",
      "Answer customer and internal staff questions about the area's activities",
      "Maintain daily, weekly and monthly reports on departmental activity",
      "Troubleshoot issues in the assigned area and escalate complex ones to senior management",
      "Work within established policies and procedures",
    ],
    howToApply: "See the listing on IDCREX's careers page (job 101007) for how to apply.",
    hiringNotes: "Listed on IDCREX's own careers page, seen 19 Nov 2026. Posting date and application method not stated on the listing.",
    description: "Australian accounting analyst at IDCREX, Kochi; open to candidates without prior experience." }),
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
console.log(`Added ${fresh.length} jobs:`);
fresh.forEach((j, i) => console.log(`${String(i + 1).padStart(2)}. ${j.company} — ${j.roles[0]}`));
