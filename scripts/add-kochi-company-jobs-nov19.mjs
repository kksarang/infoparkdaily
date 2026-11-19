#!/usr/bin/env node
/* Add IDCREX Manager - US Accounting Services, Emerinter Finance Manager and SFO Technologies current openings (all Kochi), from each company's own careers page (19 Nov 2026), pinned at the top of JOBS.
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

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const SFO_PAGE = "https://sfotechnologies.net/about-us/careers/";
const SFO_MAIL = "careers.sfo@nestgroup.net";
// [division, position, domain, qualification, skillset, experience] exactly as listed on SFO's Current Openings tables.
const SFO_ROWS = [
  ["Manufacturing", "Program Manager", "Electronics", "B.Tech, MBA", "Techno commercial skills, Communication skills, Customer Interaction Skills", "2-5 yrs"],
  ["Manufacturing", "Program Manager", "Electronics", "B.Tech, MBA", "Techno commercial skills, Communication skills, Customer Interaction Skills", "8-12 yrs"],
  ["Manufacturing", "Engineer – Sourcing", "Electronics", "B.Tech, MBA", "Negotiation Skills, Commodity & component Sourcing Skills, RFQ, Vendor development", "2-4 yrs"],
  ["Manufacturing", "Engineer – Sourcing", "Cable & Wire Harness", "B.Tech, MBA", "Negotiation Skills, Commodity & component Sourcing Skills, RFQ, Vendor development", "2-4 yrs"],
  ["Manufacturing", "Assistant Manager – Sourcing", "Electro Mechanical", "B.Tech, MBA", "Negotiation Skills, Commodity & component Sourcing Skills, RFQ, Vendor development", "5-8 yrs"],
  ["Manufacturing", "Engineer / Sr. Engineer – Purchase", "Electronics", "B.Tech", "Communication, Buying, Responsiveness", "2-8 yrs"],
  ["Manufacturing", "Manager – Finance", "Finance", "CA/CMA/ICWA", "Chartered Accountants", "5-8 yrs"],
  ["Manufacturing", "Assistant Manager – Finance", "Finance", "CA/CMA/ICWA", "Chartered Accountants", "3-5 yrs"],
  ["Manufacturing", "Component Engineer", "", "B.Tech", "ROHS, REACH Directive, GREEN, Halogen and LEAD-FREE standards, knowledge of all stages of product life cycle, Cycle Status, MSL value, Packaging Information, Part Marking, ROHS Status, AEC & PPAP", "3-6 yrs"],
  ["R&D", "System Engineer – Optronics", "Optoelectronics", "B.Tech/M.Tech", "High end Laser and sensor system development, Optoelectronic system architecture, Analog and digital electronics design, Embedded firmware development, Mil Qualification of products", "3-6 years in same field"],
  ["R&D", "Hardware Design Engineer – Power Electronics", "Industrial", "BE/BTech/MTech", "Power Electronics, Digital Power Systems / Variable Frequency Drives", "1-4 yrs"],
  ["R&D", "Hardware Project Lead – Power Electronics", "Industrial", "BE/BTech/MTech", "Power Electronics, Digital Power Systems / Variable Frequency Drives", "5-8 yrs"],
  ["R&D", "Project Lead – Mechanical", "Aerospace & Defence", "BE/BTech/MTech", "Mechanical CAD Tools: Catia V6/NX/Creo, Product Design, 3D Modeling, Product Validation", "6-8 yrs"],
  ["R&D", "Senior Design Engineer – Mechanical", "Healthcare", "BE/BTech/MTech", "Mechanical CAD Tools: NX/Creo/Solid Works, Product Design / 3D Modelling / Verification & Validation / ISO 13485", "4-6 yrs"],
  ["R&D", "Lead Engineer – Optoelectronics", "Photonics R&D", "B.Tech Electronics with experience in Optoelectronics System Design", "Circuit design, Embedded system integration", "4+ yrs"],
  ["R&D", "Senior Design Engineer – Optics", "Photonics R&D", "PG in Applied Optics / Optics", "Optical Design Tools, Prototyping, Optical Characterization", "2+ yrs"],
  ["R&D", "Senior Design Engineer – Optoelectronics", "Photonics R&D", "B.Tech Electronics; PG in Optoelectronics preferred", "Optoelectronic control circuit design and simulation / analysis", "2+ yrs"],
  ["R&D", "Engineer – Optics", "Photonics R&D", "M.Tech in Applied Optics / M.Sc in Optics", "Optical Design Tools, Opto-mechanical design", "0-1 yrs"],
  ["R&D", "Engineer – Optoelectronics", "Photonics R&D", "B.Tech Electronics", "Optoelectronic Design", "0-1 yrs"],
  ["R&D", "Engineer – Fibre Optic Systems", "Photonics R&D", "B.Tech in Electronics", "Training in Fibre Optics Systems", "0-1 yrs"],
  ["R&D", "Research Assistant – Optics / Fibre Optics", "Photonics R&D", "B.Sc Optical Instrumentation / Applied Optics", "Precision optical alignment, Optical measurements", "1+ yrs"],
  ["R&D", "Engineer – Industrial Design", "Industrial", "B.Des / M.Des", "Industrial Design or Equivalent", "2-4 yrs"],
  ["R&D", "Hardware Lead – FPGA", "Electronics", "BE/BTech/MTech in Electronics", "VHDL / Verilog Coding / Embedded C", "5-8 yrs"],
  ["R&D", "Design Engineer – FPGA", "Electronics", "BE/BTech/MTech in Electronics", "VHDL / Verilog Coding / Embedded C", "2-5 yrs"],
  ["R&D", "Hardware Lead – Embedded", "Electronics", "BE/BTech/MTech in Electronics", "OS / RTOS", "5-8 yrs"],
  ["R&D", "RF Design Lead", "Electronics", "BE/BTech/MTech in Electronics", "RF & Wireless System Design and Simulation / Antenna design", "5-8 yrs"],
  ["R&D", "RF Design Engineer", "Electronics", "BE/BTech/MTech in Electronics", "RF & Wireless System Design and Simulation / Antenna design", "2-5 yrs"],
  ["Software", "Product Analyst", "Transportation", "BE/BTech/MTech", "Automotive Infotainment / Digital Instrument cluster / Body Control Module", "8-12 yrs"],
  ["Software", "Software Engineer – QT", "Aerospace", "BE/BTech/MTech", "QT / Linux", "3+ yrs"],
  ["Software", "Dot Net Developer", "Aerospace", "BE/BTech/MTech", "C# / Asp.net (Web)", "2-9 yrs"],
];
const SYS_ENG_REQS = [
  "Analyze high-level customer requirements and application use cases to derive key system requirements",
  "Conceptualize the design and work with optical, mechanical, electrical and firmware teams to prototype and test the system design",
  "Prior experience in similar system design, to guide and optimize optoelectronic system architecture for performance, size and cost",
  "Designing and characterizing opto-electronics modules",
  "Familiar with analog and digital electronics design and embedded firmware development",
  "Hands-on experience in system build",
  "Mil qualification of products",
  "Ability to work in a multi-disciplinary team",
  "Program management experience (preferred)",
];
const sfo = ([division, role, domain, qual, skillset, exp]) => {
  const range = exp.replace(/\s*yrs?$/i, " years").replace(/(\d)-(\d)/, "$1–$2");
  const fresher = /^0/.test(range);
  const lvl = (range.match(/^(\d+)/) || [])[1];
  return job({
    id: `sfo-technologies-${slug(role)}-${slug(domain || division)}-${slug(range)}-kochi`,
    company: "SFO Technologies", source: "Company careers page",
    companyBlurb: ["SFO Technologies", role, domain, "Kochi", range].filter(Boolean).join(" · "),
    location: "Kochi, Kerala", roles: [role], experience: fresher ? "both" : "experienced", experienceRange: range,
    applyLink: mail(SFO_MAIL, `Application – ${role}${domain ? ` (${domain})` : ""} – ${range}`), email: SFO_MAIL,
    website: SFO_PAGE, address: "Plot No. 2, Cochin Special Economic Zone, Kakkanad, Kochi – 682 037",
    industry: "Electronics design and manufacturing (NeST Group)",
    tags: ["SFO Technologies", "NeST Group", `${division} Division`, domain, "Kerala", fresher ? "Freshers" : ""].filter(Boolean),
    qualification: qual,
    skills: skillset.split(/\s*,\s*/).filter(Boolean),
    requirements: [`Qualification: ${qual}`, `Experience: ${range}`, ...(role.startsWith("System Engineer – Optronics") ? SYS_ENG_REQS : [`Skill set: ${skillset}`])],
    workDetails: `${division} Division${domain ? ` · ${domain} domain` : ""}.`,
    howToApply: `Email your detailed resume to ${SFO_MAIL}, mentioning the position.`,
    hiringNotes: "Listed under Current Openings on SFO Technologies' careers page, seen 19 Nov 2026. The page gives SFO's Kochi corporate office as its address but does not state a work location or posting date for each role.",
    description: `${role} in SFO Technologies' ${division} Division${domain ? ` (${domain})` : ""}, ${range}.`,
  });
};

const JOBS_NEW = [
  job({ id: "idcrex-manager-us-accounting-services-kochi-101006", company: "IDCREX", source: "Company careers page",
    companyBlurb: "IDCREX · Manager – US Accounting Services · Kochi · 5+ years",
    location: "Kochi, Kerala", roles: ["Manager – US Accounting Services"], experience: "experienced", experienceRange: "5+ years",
    applyLink: "https://idcrex.com/1/global/job_101006.php", tags: ["IDCREX", "Accounting", "US Accounting", "US Taxation", "Kerala", "Non IT"],
    website: "https://idcrex.com", industry: "Accounting, fund services and back office",
    workDetails: "Day-to-day online accounting services for clients in the US; manages a team in the assigned area.",
    requirements: ["Minimum 5 years of experience in US accounting and US taxation", "Experience understanding customer requirements and creating solutions"],
    responsibilities: [
      "Meet daily, weekly and monthly client deliverables as set out in service agreements",
      "Plan, assign and monitor the workflow of a team, meeting production standards efficiently and cost-effectively",
      "Keep the area adequately staffed and trained",
      "Review operating procedures and recommend productivity improvements",
      "Answer customer and internal staff questions about the area's activities",
      "Maintain daily, weekly and monthly reports on departmental activity",
      "Troubleshoot issues in the area and refer complex problems to senior management",
      "Evaluate and recommend resources needed for volume increases from new business",
      "Promote teamwork and cross-training",
      "Escalate customer service, operational and employee issues appropriately",
      "Monitor team attendance and verify hours before payroll submission (shift allowance, incentives)",
      "Apply HR policies and procedures fairly and consistently",
    ],
    howToApply: "See the listing on IDCREX's careers page (job 101006) for how to apply.",
    hiringNotes: "Listed on IDCREX's own careers page, seen 19 Nov 2026. Posting date and application method not stated on the listing.",
    description: "US accounting services manager at IDCREX, Kochi; 5+ years in US accounting and taxation." }),
  job({ id: "emerinter-finance-manager-kochi-fm", company: "Emerinter", source: "Company careers page",
    companyBlurb: "Emerinter · Finance Manager · Kochi · 10+ years · BCom / MCom / MBA",
    location: "Kochi, Kerala", roles: ["Finance Manager"], experience: "experienced", experienceRange: "10+ years", employmentType: "Full-time",
    applyLink: "https://talent.enfinor.com/emerinter/candidate/career_details.php?cid=FM", tags: ["Emerinter", "Finance", "Accounting", "Kerala", "Non IT"],
    website: "https://emerinter.com", qualification: "BCom / MCom / MBA",
    skills: ["Financial reporting", "Budgeting & forecasting", "Financial analysis", "Internal controls", "Accounting software"],
    workDetails: "Oversees all financial operations and advises management on new project investments: planning, budgeting, reporting and the accuracy of financial information.",
    requirements: [
      "Bachelor's / Master's degree in Accounting or Finance",
      "10+ years of proven experience in accounting or finance roles",
      "Strong knowledge of accounting principles, financial reporting standards and tax regulations",
      "Ability to work under pressure and manage multiple tasks",
      "Strong communication and interpersonal skills, with a customer-oriented approach",
    ],
    responsibilities: [
      "Prepare and present accurate, timely financial statements (balance sheet, income statement, cash flow)",
      "Conduct financial analysis and recommend business performance improvements",
      "Lead budgeting and forecasting",
      "Implement and maintain internal controls and ensure compliance with financial regulations",
      "Manage accounting software and financial systems",
      "Improve financial processes and systems for efficiency",
    ],
    howToApply: "Submit your CV through the form on Emerinter's recruitment portal (job code FM).",
    hiringNotes: "Listed on Emerinter's recruitment portal (talent.enfinor.com), seen 19 Nov 2026. Posting date not stated.",
    description: "Finance Manager at Emerinter, Kochi; 10+ years in accounting or finance." }),
  ...SFO_ROWS.map(sfo),
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
