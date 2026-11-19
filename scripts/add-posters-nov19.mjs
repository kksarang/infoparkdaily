#!/usr/bin/env node
/* Add hiring posters shared on 19 Nov 2026, pinned at the top of JOBS.
 * Only details printed on each poster are used; anything not on a poster stays empty.
 * Skips any job whose id is already in jobs-data.js. */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "jobs-data.js");
const NOTE = "Job details can change after publishing. Always verify the opening on the employer's official channel before applying. InfoparkDaily is not a recruiter and never collects money for jobs. Never pay anyone for an application or interview.";
const ADDED = "Added 19 Nov 2026 from the employer's hiring poster. Verify with the employer before applying.";
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
  job({
    id: "sutherland-kochi-walkin-bharata-mata-college-21nov2026",
    company: "Sutherland", companyBlurb: "Sutherland walk-in hiring drive · Associates / Sr. Associates · Kochi · freshers & experienced · Bharata Mata College · 21 Nov 2026, 11:30 AM",
    location: "Kochi, Kerala", roles: ["Associate / Sr. Associate"], experience: "both", experienceRange: "Freshers & experienced",
    applyLink: "", applyDeadline: "2026-11-21", isWalkIn: true, walkInDate: "2026-11-21", walkinTime: "11:30 AM", walkinLocation: "Bharata Mata College, Kochi",
    tags: ["Sutherland", "Walk-in", "BPO", "Insurance", "Freshers", "Non IT", "Kerala"],
    website: "https://www.jobs.sutherlandglobal.com", industry: "Business Process Services",
    requirements: ["Open to freshers and experienced candidates", "Prior BPO / Insurance experience is an added advantage"],
    howToApply: "Walk in on Saturday, 21 November 2026, at 11:30 AM at Bharata Mata College, Kochi. Terms & conditions apply (as printed on the poster).",
    description: "Sutherland walk-in hiring drive for Associates / Sr. Associates in Kochi, 21 Nov 2026 at Bharata Mata College. Freshers and experienced; BPO / insurance experience is an advantage.",
  }),
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
