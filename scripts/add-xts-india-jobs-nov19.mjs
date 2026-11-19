#!/usr/bin/env node
/* Add XTS India's current openings (Malappuram, Calicut, Perinthalmanna) from xtsindia.com/careers (19 Nov 2026), pinned at the top of JOBS.
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

const XTS = "https://xtsindia.com/careers/jobs/";
const xts = (o) => job({
  company: "XTS India", source: "Company careers page", website: "https://xtsindia.com/careers/",
  industry: "Professional training (accounting, ERP, IT, management)", experience: "experienced",
  howToApply: "Apply on the XTS India job page by uploading your resume.",
  hiringNotes: "Listed under Current Openings on XTS India's careers page, seen 19 Nov 2026. Posting date not stated.",
  ...o, tags: ["XTS India", ...o.tags, "Kerala"],
});

const JOBS_NEW = [
  xts({ id: "xts-india-audit-manager-malappuram", applyLink: XTS + "audit-manager/",
    companyBlurb: "XTS India · Audit Manager · Malappuram · Hybrid · 7+ years",
    location: "Malappuram, Kerala", roles: ["Audit Manager"], experienceRange: "7+ years", workMode: "Hybrid",
    tags: ["Audit", "Accounting", "Non IT"], qualification: "Master's degree in Accounting or Finance; professional audit certification (e.g. CIA, CISA, CPA)",
    workDetails: "Lead the audit team on financial, operational and compliance audits: plan engagements, review workpapers and report findings to management.",
    responsibilities: ["Plan and manage audit engagements end to end", "Review audit workpapers and ensure documentation meets standards", "Identify internal control weaknesses and recommend improvements", "Prepare comprehensive audit reports for management", "Mentor and supervise junior audit staff"],
    requirements: ["Master's degree in Accounting or Finance", "Professional audit certification (e.g. CIA, CISA, CPA)", "7+ years of auditing experience, including at least 2 years in a managerial role", "Deep understanding of auditing standards and risk management", "Proven leadership and project management skills"],
    description: "Audit Manager at XTS India, Malappuram (hybrid); 7+ years in auditing." }),
  xts({ id: "xts-india-senior-accountant-perinthalmanna", applyLink: XTS + "senior-accountant/",
    companyBlurb: "XTS India · Senior Accountant · Perinthalmanna · Full-time · 5+ years",
    location: "Perinthalmanna, Malappuram, Kerala", roles: ["Senior Accountant"], experienceRange: "5+ years", employmentType: "Full-time",
    tags: ["Accounting", "Finance", "Non IT"], qualification: "Bachelor's degree in Accounting or Finance; CPA preferred",
    skills: ["Excel", "QuickBooks", "SAP", "Financial reporting", "GAAP"],
    workDetails: "Finance team role covering financial reporting, budget preparation and compliance with accounting standards.",
    responsibilities: ["Manage month-end and year-end closing", "Prepare and review financial statements and reports", "Ensure compliance with GAAP and internal policies", "Coordinate with external auditors", "Assist with budget preparation and expense tracking"],
    requirements: ["Bachelor's degree in Accounting or Finance; CPA preferred", "5+ years of accounting experience", "Proficiency in Excel and accounting software (e.g. QuickBooks, SAP)", "Strong analytical and problem-solving skills", "Excellent communication and interpersonal skills"],
    description: "Senior Accountant at XTS India, Perinthalmanna; 5+ years in accounting." }),
  xts({ id: "xts-india-senior-graphic-designer-malappuram", applyLink: XTS + "senior-graphic-designer/",
    companyBlurb: "XTS India · Senior Graphic Designer · Malappuram · Full-time · 2 years",
    location: "Malappuram, Kerala", roles: ["Senior Graphic Designer"], experienceRange: "2 years", employmentType: "Full-time",
    tags: ["Graphic Design", "Design", "Non IT"],
    skills: ["Photoshop", "Illustrator", "InDesign", "Premiere Pro", "After Effects", "AI-assisted design tools"],
    workDetails: "Turn ideas into visuals and keep brand consistency across all creatives.",
    requirements: ["2 years of graphic design experience", "Proficiency in Photoshop, Illustrator, InDesign, Premiere Pro and After Effects", "Strong understanding of branding, layouts, typography and visual hierarchy", "Ability to interpret briefs and create clean, engaging visuals", "Basic motion design / video editing knowledge is a plus", "A solid, diverse portfolio"],
    description: "Senior Graphic Designer at XTS India, Malappuram; 2 years' experience and a portfolio." }),
  xts({ id: "xts-india-tax-consultant-calicut", applyLink: XTS + "tax-consultant/",
    companyBlurb: "XTS India · Tax Consultant · Calicut · Full-time · 3+ years",
    location: "Kozhikode (Calicut), Kerala", roles: ["Tax Consultant"], experienceRange: "3+ years", employmentType: "Full-time",
    tags: ["Taxation", "Accounting", "Non IT"], qualification: "Bachelor's degree in Accounting, Finance or Law; CPA / Chartered Accountant highly desirable",
    skills: ["Tax returns", "Tax planning", "Tax software", "MS Office"],
    workDetails: "Provide tax services to clients: prepare returns, advise on tax strategy and ensure compliance.",
    responsibilities: ["Prepare and file tax returns for individuals and corporations", "Advise clients on tax planning and strategy", "Research and analyze tax laws and regulations", "Represent clients before tax authorities", "Meet all tax filing deadlines"],
    requirements: ["Bachelor's degree in Accounting, Finance or Law", "Professional certification (e.g. CPA, Chartered Accountant) highly desirable", "Minimum 3 years in tax consulting or compliance", "Expertise in tax software and MS Office", "Strong research and communication skills"],
    description: "Tax Consultant at XTS India, Calicut; 3+ years in tax consulting or compliance." }),
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
