#!/usr/bin/env node
/* Add new Kerala EXL Finance & Accounting openings from EXL's Oracle careers site (19 Nov 2026), pinned at the top of JOBS.
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

const SEARCH = "https://fa-ewjt-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_2/jobs?keyword=Finance+%26+Accounting&location=India&locationId=300000000467203&locationLevel=country&mode=job-location";
const url = (id) => `https://fa-ewjt-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_2/job/${id}`;
const exl = ({ req, title, area, loc, posted, range, ...o }) => job({
  id: `exl-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${req}-${loc.startsWith("Kochi") ? "kochi" : "kerala"}-nov19-2026`,
  company: "EXL", source: "Company careers page", location: loc, roles: [`${title} (${area})`],
  companyBlurb: `EXL · ${title} (${area}) · ${loc.split(",")[0]} · hybrid · ${range} years`,
  experience: "experienced", experienceRange: `${range} years`, postedDate: posted, applyDeadline: "",
  applyLink: url(req), website: "https://fa-ewjt-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_2/jobs",
  workMode: "Hybrid", companyDetails: "EXL opening listed on EXL's official careers site.",
  tags: ["EXL", "Finance & Accounting", area, "Kerala", "Non IT"],
  howToApply: `Apply on EXL careers (requisition ${req}).`,
  hiringNotes: `Checked on EXL careers on 19 Nov 2026 · Requisition ${req} · Portal posted ${posted}.`,
  officialLinks: { exlJob: url(req), exlSearch: SEARCH }, ...o,
});

const AP_SE = {
  title: "Senior Executive", area: "Accounts Payable", loc: "Kochi, Kerala", posted: "2026-11-18", range: "2-4",
  qualification: "Graduate in Accounting or MBA Finance",
  skills: ["Accounts Payable", "PO / non-PO invoice processing", "Invoice-to-pay", "SOX compliance"],
  requirements: ["Graduate in Accounting or MBA Finance", "2-4 years of experience in Accounts Payable", "Sound knowledge of purchase orders and PO / non-PO invoice processing with exception handling"],
  responsibilities: [
    "Process complex/special invoices for critical suppliers, handle exceptions and pre-payment requests",
    "Track invoice reconciliation aging and follow up with requestors and approvers to meet payment terms",
    "Research and resolve discrepancies, open items and payment queries",
    "Quality-check invoices as per the established QC process",
    "Prepare, review and report duplicate payments and high-value transactions",
    "Meet assigned targets within SLAs and KPIs, following SOPs and SOX / regulatory requirements",
  ],
  workDetails: "Invoice-to-pay process: complex supplier invoices, exceptions and pre-payment requests. Hybrid, Kochi.",
  description: "Accounts payable senior executive at EXL Kochi, 2-4 years.",
};
const TAX_COMMON = [
  "Work under tight deadlines and lead closure of reporting timelines",
  "Fixed asset workpapers and depreciation",
  "Worldwide income reporting",
  "Quarterly estimates and yearly extension calculations",
  "Handle process-related issues and queries; build client relationships",
];

const JOBS_NEW = [
  exl({ req: "22148", ...AP_SE }),
  exl({ req: "22213", ...AP_SE }),
  exl({ req: "22672", title: "Assistant Manager", area: "Accounts Payable", loc: "Kerala", posted: "2026-11-18", range: "4-6",
    qualification: "Bachelor's or postgraduate degree",
    skills: ["Oracle ERP procurement modules", "Vendor management", "Payment processing", "Supervision", "Analytical skills", "Communication"],
    requirements: ["Bachelor's or postgraduate degree", "4-6 years of experience", "Knowledge of Oracle ERP procurement modules, vendor management and payment processing"],
    workDetails: "Accounts payable team lead role. Hybrid; location listed as Kerala.",
    description: "Accounts payable assistant manager at EXL, Kerala, 4-6 years." }),
  exl({ req: "22044", title: "Assistant Manager", area: "Tax", loc: "Kerala", posted: "2026-11-05", range: "4-6",
    qualification: "CA / CPA / postgraduate / graduate in Finance",
    skills: ["Sales & Use Tax (SUT)", "EMEA VAT", "OneSource", "ProSystem", "GoSystem", "RIA"],
    requirements: ["CA/CPA/postgraduate/graduate in Finance with 4-6 years in SUT or EMEA VAT", "Clear understanding of tax legislation", "Experience with tax reporting applications such as OneSource, ProSystem, GoSystem or RIA", "Good written and verbal communication", "Tax experience in the manufacturing industry is an advantage"],
    responsibilities: TAX_COMMON,
    workDetails: "Sales & Use Tax / EMEA VAT process. Hybrid; location listed as Kerala.",
    description: "SUT / EMEA VAT tax assistant manager at EXL, Kerala, 4-6 years." }),
  exl({ req: "22058", title: "Lead Assistant Manager", area: "Tax", loc: "Kerala", posted: "2026-11-05", range: "4-6",
    qualification: "CA / CPA / postgraduate / graduate in Finance",
    skills: ["US corporate tax", "Forms 1120 and 1120-S", "Sales & Use Tax", "Property tax", "OneSource", "ProSystem", "GoSystem", "RIA"],
    requirements: ["CA/CPA/postgraduate/graduate in Finance with 4-6 years in US corporate tax", "Experience with federal/state income tax, sales & use tax, property tax and partnerships, and preparing forms such as 1120 and 1120-S", "Experience with tax reporting applications such as OneSource, ProSystem, GoSystem or RIA", "Strong written and verbal communication", "US manufacturing tax experience is an advantage"],
    responsibilities: TAX_COMMON,
    workDetails: "US corporate tax process. Hybrid; location listed as Kerala.",
    description: "US corporate tax lead assistant manager at EXL, Kerala, 4-6 years." }),
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
