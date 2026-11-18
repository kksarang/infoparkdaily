#!/usr/bin/env node
/* Add remote jobs found via jobviareferral.com (18 Nov 2026), each confirmed on the employer's own careers page, pinned at the top of JOBS.
 * Only details stated on the official page or the recruiter's post are used; anything not stated stays empty.
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
  DIRECT({ id: "testing-mavens-test-lead-us-health-insurance-remote-91164", company: "Testing Mavens",
    companyBlurb: "Testing Mavens · Test Lead – US Health Insurance · Remote · 8+ years · EST shift",
    location: "Remote (India)", roles: ["Test Lead – US Health Insurance"], experience: "experienced", experienceRange: "8+ years", employmentType: "Full-time",
    applyLink: "https://testingmavens.keka.com/careers/jobdetails/91164", tags: ["Testing Mavens", "QA", "Playwright", "Work from home", "Test Lead"],
    website: "https://testingmavens.com", industry: "Software testing / QA", workMode: "Remote", workDetails: "EST shift – 5:30 PM to 2:30 AM IST.",
    skills: ["US Health Insurance domain", "Playwright", "API testing", "Mobile testing", "Agile", "AI-augmented testing", "Cursor"],
    requirements: ["5+ years hands-on experience in the US Health Insurance domain", "Playwright test automation", "Team leadership and people management", "Test strategy, planning, estimation and execution", "Manual, API and mobile testing; defect lifecycle management"],
    responsibilities: ["Lead QA and automation activities across projects", "Establish QA processes and mentor team members", "Prepare and present QA metrics, dashboards and status reports"],
    howToApply: "Apply on Testing Mavens' Keka careers page (job 91164).",
    hiringNotes: "Found via jobviareferral.com remote jobs; confirmed open on Testing Mavens' careers page on 18 Nov 2026. Post date 5 Nov 2026.",
    description: "Remote Test Lead for US health-insurance projects: QA strategy, Playwright automation and team leadership." }),
  DIRECT({ id: "customertimes-qa-engineer-senior-india-jr223225", company: "Customertimes",
    companyBlurb: "Customertimes · QA Engineer Senior (Automation & Data) · Remote India · 5+ years · JR-223225",
    location: "Remote (India)", roles: ["QA Engineer Senior – Automation & Data"], experience: "experienced", experienceRange: "5+ years", employmentType: "Full-time",
    applyLink: "https://www.customertimes.com/open-positions", email: "reshma.ponnamma@customertimes.com",
    tags: ["Customertimes", "QA", "Playwright", "TypeScript", "Work from home"], website: "https://www.customertimes.com/careers", industry: "IT services",
    workMode: "Remote", workDetails: "Working hours 2:00 PM – 11:00 PM IST (per recruiter post).",
    skills: ["Playwright / Cypress", "TypeScript / JavaScript", "API automation", "GraphQL", "SQL", "Cloud data warehouse validation"],
    requirements: ["5+ years QA experience", "3+ years UI automation with Playwright (preferred) or Cypress", "TypeScript / JavaScript", "API automation; GraphQL strongly preferred", "SQL and data warehouse validation"],
    howToApply: "Find job JR-223225 on Customertimes' open positions page, or email your CV to the recruiter at reshma.ponnamma@customertimes.com with the job ID in the subject.",
    hiringNotes: "Job JR-223225 'QA Engineer Senior' (India, full-time) is listed on Customertimes' official open-positions page as of 18 Nov 2026. Remote mode, hours, experience and skills are from the recruiter's post shared via jobviareferral.com (11 Nov 2026).",
    description: "Senior QA engineer for automation, API testing and analytics data validation, remote in India." }),
  DIRECT({ id: "customertimes-qa-automation-engineer-middle-india-jr214790", company: "Customertimes",
    companyBlurb: "Customertimes · QA Automation Engineer (Middle) · Remote · Pune / Bangalore candidates · 5+ years · JR-214790",
    location: "Remote (Pune / Bangalore preferred)", roles: ["QA Automation Engineer (Middle)"], experience: "experienced", experienceRange: "5+ years", employmentType: "Full-time",
    applyLink: "https://www.customertimes.com/open-positions", email: "reshma.ponnamma@customertimes.com",
    tags: ["Customertimes", "QA", "Python", "Selenium", "SQL", "Work from home"], website: "https://www.customertimes.com/careers", industry: "IT services",
    workMode: "Remote", workDetails: "Second-round interview may be in person (per recruiter post).",
    skills: ["Manual / functional testing", "Python", "pytest", "Selenium", "SQL", "API testing", "Jira", "ETL concepts"],
    requirements: ["5+ years QA experience", "Strong manual / functional testing", "1–2 years practical automation scripting (Python, pytest, Selenium)", "SQL and backend data validation"],
    howToApply: "Find job JR-214790 on Customertimes' open positions page, or email your CV to the recruiter at reshma.ponnamma@customertimes.com with the job ID in the subject.",
    hiringNotes: "Job JR-214790 'QA Automation Engineer Middle' (India, full-time) is listed on Customertimes' official open-positions page as of 18 Nov 2026. Remote mode, locations, experience and skills are from the recruiter's post shared via jobviareferral.com (11 Nov 2026).",
    description: "QA engineer for analytics / BI applications with Python-Selenium automation, remote." }),
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
