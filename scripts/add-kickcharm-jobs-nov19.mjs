#!/usr/bin/env node
/* Add jobs found via kickcharm.com (Bangalore category, 19 Nov 2026), each confirmed open on the employer's own careers page, pinned at the top of JOBS.
 * Only details from the official listing are used. Posts that only linked to Naukri (Tech Mahindra, Infosys) were skipped.
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

const seen = (d) => `Found via kickcharm.com; confirmed open on the employer's official careers page on 19 Nov 2026.${d ? ` Official posting date: ${d}.` : ""}`;
const D = ({ _posted, ...o }) => job({ source: "Direct", hiringNotes: seen(_posted), ...o });

const JOBS_NEW = [
  D({ id: "jpmorganchase-client-data-analyst-bengaluru-210788205", company: "JPMorganChase",
    companyBlurb: "JPMorganChase · Client Data Analyst (Operations, KYC/AML) · Bengaluru · Full-time",
    location: "Bengaluru, Karnataka", roles: ["Client Data Analyst"], employmentType: "Full-time",
    applyLink: "https://jpmc.fa.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1001/job/210788205", tags: ["JPMorganChase", "KYC", "AML", "Operations", "Non IT"],
    website: "https://careers.jpmorgan.com", industry: "Banking & financial services",
    workDetails: "Operations role reviewing and improving KYC data collection and verification so client records are accurate and complete.",
    skills: ["KYC / AML", "Data analysis", "MS Excel, Word, PowerPoint", "Customer service"],
    responsibilities: ["Handle escalated service issues while keeping high customer-service standards", "Make independent, data-driven decisions", "Support client onboarding and meet AML and KYC requirements", "Investigate to establish AML typologies and report findings", "Find process improvements and manage stakeholder relationships", "Analyze transaction data to spot patterns and verify legitimacy, working with bankers and customers"],
    requirements: ["Strong research and analytical skills for large amounts of unstructured data", "Client focus, strong customer service and ability to multi-task in a high-volume schedule", "Proficiency in Microsoft Office (Excel, Word, PowerPoint) and strong digital literacy", "Ability to act independently and manage stakeholder relationships", "Strong problem-solving and communication skills", "Preferred: knowledge of KYC/AML policies and experience in risk, audit or process improvement"],
    howToApply: "Apply on JPMorganChase careers (job 210788205).", description: "KYC/AML client data analyst in JPMorganChase Operations, Bengaluru." }),
  D({ id: "kpmg-associate-1-bts-tax-bangalore-30051704", company: "KPMG",
    companyBlurb: "KPMG · Associate 1 – BTS (US tax compliance) · Bangalore · Full-time",
    location: "Bengaluru, Karnataka", roles: ["Associate 1 – BTS – AM PE – FTS"], employmentType: "Full-time",
    applyLink: "https://ejgk.fa.em2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_3/job/30051704", tags: ["KPMG", "Tax", "US Tax", "Accounting", "Non IT"],
    website: "https://kpmg.com/in/en/careers.html", industry: "Professional services (audit, tax, advisory)",
    qualification: "Bachelor's degree in Accounting or MBA Finance (majoring in Accounting, Taxation or Finance)",
    skills: ["US federal & state tax returns", "Tax software", "MS Excel"],
    workDetails: "US corporate / partnership tax compliance using KPMG's tax technology tools.",
    responsibilities: ["Apply tax compliance process standards for corporate and/or partnership projects end to end", "Gather tax data and manage documents for basic tax return filings and deliverables", "Process tax and financial data with KPMG's proprietary tax technology tools", "Complete multiple tasks on time and to quality-control standards", "Work with the engagement lead on quality client service", "Take part in training and apply it to improve tax deliverables"],
    requirements: ["Bachelor's degree in Accounting or MBA Finance with excellent academic results (Accounting, Taxation or Finance)", "Proficiency in Microsoft Office, including Excel", "Understanding of annual US and state tax return compliance for corporate and/or partnership entities", "Strong verbal, written and organizational skills", "Ability to manage time and multiple assignments in a deadline-driven environment", "Ability to prepare simple single-entity federal, state and international returns using tax software"],
    howToApply: "Apply on KPMG careers (job 30051704).", description: "US tax compliance associate at KPMG, Bangalore." }),
  D({ id: "carelon-benefits-analyst-junior-fresher-gurugram-jr178504", company: "Carelon Global Solutions", _posted: "17 Nov 2026",
    companyBlurb: "Carelon Global Solutions · Benefits Analyst Jr (US Healthcare Operations) · Gurugram · Freshers",
    location: "Gurugram, Haryana", roles: ["Benefits Analyst Jr – US Healthcare Operations"], experience: "fresher", experienceRange: "Fresher", employmentType: "Full-time", postedDate: "2026-11-17",
    applyLink: "https://elevancehealth.wd1.myworkdayjobs.com/en-US/carelonglobal_in/job/Benefits-Analyst-Junior_JR178504", tags: ["Carelon", "US Healthcare", "Freshers", "Non IT"],
    website: "https://careers.carelon.com", industry: "Healthcare operations (Elevance Health)",
    qualification: "Bachelor's or Master's degree in fine arts / design; non-computer-science, non-BTech degree preferred",
    skills: ["US healthcare knowledge", "Analytical skills", "Communication"],
    workDetails: "Junior Associate in Benefits Support; good US healthcare knowledge, preferably benefits configuration (WPD benefit coding / auto-adjudication set-up). Willing to work any shift.",
    requirements: ["Bachelor's or Master's degree in fine arts / design (non-CS / non-BTech preferred)", "Fresher", "Good analytical and problem-solving skills", "Willing to work in any shift", "Excellent communication skills"],
    howToApply: "Apply on Carelon's Workday careers page (JR178504).", description: "Fresher benefits analyst for US healthcare operations at Carelon, Gurugram." }),
  D({ id: "google-silicon-engineer-university-graduate-2026-bengaluru-73379279982731974", company: "Google",
    companyBlurb: "Google · Silicon Engineer, Platform and Devices (University Graduate 2026) · Bengaluru",
    location: "Bengaluru, Karnataka", roles: ["Silicon Engineer, Platform and Devices, University Graduate, 2026"], experience: "fresher", experienceRange: "Early career",
    applyLink: "https://www.google.com/about/careers/applications/jobs/results/73379279982731974-silicon-engineer-platform-and-devices-university-graduate-2026", tags: ["Google", "Silicon", "ASIC", "Hardware", "Freshers"],
    website: "https://www.google.com/about/careers/", industry: "Technology",
    qualification: "Bachelor's degree in Electrical, Electronics and Communication Engineering, a relevant technical field, or equivalent practical experience",
    skills: ["SoC / ASIC design", "Design verification", "Physical design", "Verilog / SystemVerilog"],
    workDetails: "Consumer Hardware Silicon team building chips for Google devices (imaging, ML, video, security). Usually requires in-person interviews.",
    responsibilities: ["Work with SoC teams to develop power- and performance-optimized chips", "Contribute to design, verification and silicon implementation of ASICs and SoCs", "Work on design concepts around CPUs, image processing, machine learning, computer vision, security and video", "Help automate SoC design flows"],
    requirements: ["Bachelor's degree in Electrical, Electronics and Communication Engineering, a relevant field, or equivalent practical experience", "Experience with design concepts and computer hardware architecture", "Preferred: internship, work or project experience in hardware, electrical or mechanical engineering", "Preferred: experience in SoC/ASIC design, design verification, physical design or design for testability", "Preferred: Verilog/HDL or SystemVerilog coding"],
    howToApply: "Apply on Google Careers.", description: "University-graduate silicon engineer on Google's consumer hardware chips, Bengaluru." }),
  D({ id: "wipro-apprentices-l0-bengaluru-218174", company: "Wipro", _posted: "11 Nov 2026",
    companyBlurb: "Wipro · Apprentices L0 · Bengaluru",
    location: "Bengaluru, Karnataka", roles: ["Apprentices L0"], employmentType: "Apprenticeship", postedDate: "2026-11-11",
    applyLink: "https://careers.wipro.com/job/Apprentices-L0/218174-en_US", tags: ["Wipro", "Apprentice"],
    website: "https://careers.wipro.com", industry: "IT services",
    howToApply: "Apply on Wipro careers (job 218174). The official listing has no job description, so check the details with Wipro.",
    description: "Wipro apprentice (L0) opening in Bengaluru." }),
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
