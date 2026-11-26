#!/usr/bin/env node
/* Add open, non-duplicate work-from-home jobs found via placementdriveinsta.in/category/work-from-home/ on 25 Nov 2026, pinned at the top of JOBS.
 * Verified all 16 posts across pages 1–2 of the category:
 *   - Added: Tech Mahindra Customer Support Associate / Customer Care Executive WFH (Kolkata hiring office, 60 openings, confirmed live on Tech Mahindra's official Naukri posting 091126005243 with @techmahindra.com HR email).
 *   - Already in jobs-data.js (open): Sutherland Associate / Sr. Associate (1639268), Persona Virtual Assistant, BiCSoM Web Developer Fresher, Reliance Jio Customer Support Advisor (jio.com/jca).
 *   - Closed / expired / not a job: Wipro Labeling walk-in (10–13 Nov passed; Vizag already listed), Amazon Central Operations (10429219, 404 + already listed), Sutherland Collection Specialist (Naukri expired), Amazon CSA JOB-IN-0000007860 (not available for application + WFO), HPE External Graduate (1194477, closed on Workday), Accenture/JPMorgan Forage virtual simulations (free self-paced courses), SBI Card Associate VKYC (19731, closed on Oracle Cloud), NITI Aayog Internship (SubmissionClosed.htm), Fresh Prints Growth Specialist (5712123004, 404 on Greenhouse), NoBroker Customer Service (Naukri expired), Blinkit/Startek Customer Care (Naukri expired).
 * Only details stated on the verified listing are used; anything not stated stays empty.
 * Skips any job whose id is already in jobs-data.js. */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "jobs-data.js");
const NOTE = "Job details can change after publishing. Always verify the opening on the employer's official channel before applying. InfoparkDaily is not a recruiter and never collects money for jobs. Never pay anyone for an application or interview.";

const job = (o) => ({
  logo: "", experienceRange: "", employmentType: "", applyDeadline: "Rolling", postedDate: "2026-11-25",
  source: "Naukri", verified: true, verificationNote: NOTE, tags: [], isWalkIn: false, walkInDate: "",
  email: "", phone: "", website: "", address: "", industry: "", companyDetails: "", workDetails: "",
  workStatus: "", workMode: "", experienceYears: "", salaryRange: "", qualification: "", skills: [],
  requirements: [], responsibilities: [], benefits: [], howToApply: "", hiringNotes: "",
  description: "", startingDate: "", ...o,
});

const JOBS_NEW = [
  job({
    id: "tech-mahindra-customer-support-associate-kolkata-wfh-091126005243",
    company: "Tech Mahindra",
    companyBlurb: "Tech Mahindra · Customer Support Associate (Hindi & English Voice) · 100% WFH (Kolkata office) · 12th pass · 0–1 yr · ₹14,000/mo · 60 openings",
    location: "Kolkata, West Bengal (100% Work From Home)",
    roles: ["Customer Support Associate (Voice Process – Hindi & English)", "Customer Care Executive"],
    experience: "both",
    experienceRange: "0–1 years (Freshers welcome)",
    experienceYears: "0–1 years",
    employmentType: "Internship (9 months, full-time)",
    workMode: "Remote (100% Work From Home)",
    workStatus: "Full-time · 9 months internship",
    salaryRange: "₹2 – 2.25 LPA (₹14,000/month in hand for freshers)",
    qualification: "Minimum 12th Pass (Higher Secondary); graduation not required",
    vacancies: 60,
    applyLink: "https://www.naukri.com/job-listings-customer-care-executive-tech-mahindra-kolkata-wfh-tech-mahindra-kolkata-0-to-1-years-091126005243",
    email: "nc001130946@techmahindra.com",
    phone: "+91 6291055422",
    website: "https://www.techmahindra.com",
    industry: "BPM / BPO",
    tags: ["Tech Mahindra", "Work from home", "Customer Support", "Voice Process", "Freshers", "12th Pass", "Internship", "Non IT", "BPO"],
    skills: ["English (verbal)", "Hindi (verbal)", "Voice customer support", "Typing (30 WPM / 90% accuracy)"],
    workDetails: "Tech Mahindra Business Services hiring for Customer Support Associate (Hindi & English voice process), 100% Work From Home (hiring office in Kolkata). 9-month internship with fixed salary (₹14,000/month in hand for freshers; ₹2–2.25 LPA listed). 60 openings. 24/7 rotational shifts, 5 working days with 2 rotational weekly offs.",
    responsibilities: [
      "Resolve customer queries via inbound/outbound voice calls in Hindi and English",
    ],
    requirements: [
      "Minimum education: Higher Secondary (12th Pass); graduation not required",
      "0–1 years experience; freshers are welcome",
      "Age criteria: 18 to 25 years",
      "Excellent verbal communication skills in English and Hindi with no major MTI (Mother Tongue Influence)",
      "Willing to work 24/7 rotational shifts (5 working days, 2 rotational weekly offs)",
      "Own Windows 10 or 11 system with 8 GB+ RAM and Core i5 (6th Gen+) or Ryzen 5 (6th Gen+) processor",
      "Minimum 20 Mbps upload/download broadband connection, power backup and noise-cancelling USB headset",
      "Mandatory documents: Aadhaar Card (with complete DOB), E-Aadhaar, PAN Card, and 10th & 12th mark sheets",
    ],
    selectionProcess: [
      "HR Round (Video Call; E-Aadhaar mandatory for WFH)",
      "Typing Test (minimum 30 WPM with 90% accuracy)",
      "Final Round (Google Meet; selfie with Aadhaar mandatory)",
    ],
    howToApply: "Apply on Tech Mahindra's Naukri listing (091126005243), email your resume to nc001130946@techmahindra.com, or call 6291055422 (as stated on the listing).",
    hiringNotes: "Found via placementdriveinsta.in; confirmed open on Tech Mahindra's corporate Naukri listing (091126005243) on 25 Nov 2026 (listed with 60 openings, originally posted 9 Nov 2026). Confirm role terms and never pay any fee before applying.",
    description: "Tech Mahindra 100% Work From Home Customer Support Associate (Hindi & English voice process) 9-month internship with 60 openings for 12th pass freshers and 0–1 year candidates (₹14,000/month in hand).",
    officialLinks: {
      naukriJob: "https://www.naukri.com/job-listings-customer-care-executive-tech-mahindra-kolkata-wfh-tech-mahindra-kolkata-0-to-1-years-091126005243",
    },
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
console.log(`Added ${fresh.length} job(s):`);
fresh.forEach((j, i) => console.log(`${String(i + 1).padStart(2)}. ${j.company} — ${j.roles[0]}`));
