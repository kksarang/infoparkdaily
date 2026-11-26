#!/usr/bin/env node
/* Add two jobs sent as official links, each confirmed open on the employer's careers page on 26 Nov 2026, pinned at the top of JOBS:
 * Hexaware Gen AI Developer Associate (Oracle CX job 605215, India) and
 * YASH Technologies Trainee Consultant – SAP NextGen, Hyderabad (requisition 66559, posted 30 Oct 2026).
 * Zoho Technical Support Engineers (193779000024445975) is already listed; the script only notes that the
 * official page still publishes it and names the country as India, with no city.
 * Only details stated on the official listing are used. Skips any job id already in jobs-data.js. */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "jobs-data.js");
const NOTE = "Job details can change after publishing. Always verify the opening on the employer's official channel before applying. InfoparkDaily is not a recruiter and never collects money for jobs. Never pay anyone for an application or interview.";

const job = (o) => ({
  logo: "", experienceRange: "", employmentType: "", applyDeadline: "Rolling", postedDate: "2026-11-26",
  source: "Direct", verified: true, verificationNote: NOTE, tags: [], isWalkIn: false, walkInDate: "",
  email: "", phone: "", website: "", address: "", industry: "", companyDetails: "", workDetails: "",
  workStatus: "", workMode: "", experienceYears: "", salaryRange: "", qualification: "", skills: [],
  requirements: [], responsibilities: [], benefits: [], howToApply: "", hiringNotes: "",
  description: "", startingDate: "", ...o,
});

const seen = (d) => `Confirmed open on the employer's official careers page on 26 Nov 2026.${d ? ` Official posting date: ${d}.` : " The listing does not state a posting date."}`;

const JOBS_NEW = [
  job({ id: "hexaware-gen-ai-developer-associate-india-605215", company: "Hexaware Technologies",
    companyBlurb: "Hexaware · Gen AI Developer Associate · India · fresh graduates or up to 1 year",
    location: "India", roles: ["Gen AI Developer Associate"], experience: "both",
    experienceRange: "Fresh graduates, or up to 1 year",
    applyLink: "https://jobs.hexaware.com/#en/sites/CX_1/job/605215",
    tags: ["Hexaware", "Generative AI", "Machine Learning", "NLP", "Python", "Freshers"],
    website: "https://hexaware.com", industry: "IT services",
    qualification: "Bachelor's degree in Computer Science, Mathematics, Engineering, or a related field",
    skills: ["Python", "TensorFlow", "PyTorch", "scikit-learn", "Machine learning", "NLP", "Generative AI"],
    workDetails: "Early-career generative AI role for fresh graduates or people with up to 1 year of experience. The Hexaware listing gives the location as India and does not name a city, salary, or closing date.",
    responsibilities: ["Develop and implement machine learning models, focused on generative AI and NLP", "Work on data preprocessing, feature engineering, and model evaluation", "Research and experiment with recent generative AI and NLP work", "Write clean, efficient, well-documented code", "Help deploy and maintain AI models in production"],
    requirements: ["Bachelor's degree in Computer Science, Mathematics, Engineering, or a related field", "Fresh graduate, or up to 1 year of experience", "Strong Python, and familiarity with TensorFlow, PyTorch, or scikit-learn", "Basic supervised and unsupervised machine learning", "NLP techniques and tools", "Familiarity with generative AI models such as GPT", "Linear algebra, probability, and statistics"],
    howToApply: "Apply on Hexaware careers (job 605215).",
    hiringNotes: seen(""),
    description: "Hexaware Gen AI Developer Associate in India for fresh graduates or candidates with up to 1 year of experience." }),
  job({ id: "yash-trainee-consultant-sap-nextgen-hyderabad-66559", company: "YASH Technologies",
    companyBlurb: "YASH Technologies · Trainee Consultant – SAP NextGen Technical Innovation · Hyderabad · 0–1 years",
    location: "Hyderabad, Telangana", roles: ["Trainee Consultant – SAP NextGen Technical Innovation"],
    experience: "both", experienceRange: "0–1 years", postedDate: "2026-10-30",
    applyLink: "https://careers.yash.com/job/Hyderabad-Trainee-Consultant-SAP-NextGen-Technical-Innovation-Job-TG/1368219166/",
    tags: ["YASH", "SAP", "SAP BTP", "SAPUI5", "JavaScript", "Freshers"],
    website: "https://www.yash.com", industry: "IT services / SAP",
    skills: ["SAP BTP Integration Suite", "SAPUI5", "JavaScript", "Node.js", "CSS", "React", "HTML5"],
    workDetails: "Trainee consultant role in SAP NextGen technical innovation, based in Hyderabad. Requisition 66559. Posted 30 Oct 2026. The listing does not state a salary or a closing date.",
    responsibilities: ["Work as an individual contributor with a fair degree of accountability and limited assistance", "Run unit tests on your own developments", "Build the requirement from the technical specification", "Follow coding standards and performance measures set by the customer or the organisation", "Take nominated training and work on your own development"],
    requirements: ["0–1 years of experience", "Knowledge of SAP technologies such as BTP Integration Suite or UI5", "JavaScript, including data structures, typing, and prototype inheritance", "One or more of Node.js, CSS, React, Ember, or Vue", "Familiarity with front-end technologies such as JavaScript and HTML5", "Good to have: relevant certifications"],
    benefits: ["Flexible work arrangements", "Career-oriented skilling and continuous learning", "Stable employment"],
    howToApply: "Apply on YASH Technologies careers (requisition 66559).",
    hiringNotes: seen("30 Oct 2026"),
    description: "YASH trainee consultant in Hyderabad for SAP BTP Integration Suite and UI5, open to 0–1 years of experience." }),
];

let text = readFileSync(FILE, "utf8");
const fresh = JOBS_NEW.filter((j) => !text.includes(`id: "${j.id}"`));
if (!fresh.length) console.log("Nothing new to insert");
else {
  const pins = [...text.matchAll(/pinOrder: (\d+),/g)].map((m) => +m[1]);
  if (new Set(pins).size !== pins.length) throw new Error("Duplicate pinOrder values");
  text = text.replace(/pinOrder: (\d+),/g, (_, n) => `pinOrder: ${+n + fresh.length},`);
  const render = (j, i) => {
    const body = Object.entries({ ...j, pinOrder: i + 1 })
      .map(([k, v]) => `    ${k}: ${JSON.stringify(v)},`).join("\n");
    return `  {\n${body}\n  },\n`;
  };
  text = text.replace("var JOBS = [\n", "var JOBS = [\n" + fresh.map(render).join(""));
  console.log(`Added ${fresh.length}: ${fresh.map((j) => j.id).join(", ")}`);
}

const zohoId = 'id: "zoho-technical-support-engineers-193779000024445975-nov18"';
const zi = text.indexOf(zohoId);
if (zi < 0) console.log("Zoho record not found");
else {
  const st = text.lastIndexOf("\n  {\n", zi);
  const end = text.indexOf("\n  },\n", zi);
  let seg = text.slice(st, end);
  const oldLoc = '    location: "",';
  const oldNotes = '    hiringNotes: "Added 18 Nov 2026 from the official Zoho careers listing. The listing does not state location, experience or qualification. Never pay anyone for an application.",';
  const oldBlurb = '    companyBlurb: "Zoho · Technical Support Engineers · voice support (inbound/outbound) · night shifts",';
  if (!seg.includes(oldLoc) || !seg.includes(oldNotes)) console.log("Zoho record already updated");
  else {
    seg = seg.replace(oldLoc, '    location: "India",');
    seg = seg.replace(oldBlurb, '    companyBlurb: "Zoho · Technical Support Engineers · India · voice support (inbound/outbound) · night shifts",');
    seg = seg.replace(oldNotes, '    hiringNotes: "Reconfirmed open on Zoho Careers on 26 Nov 2026 (Publish is true). The listing names the country as India and does not state a city, experience, qualification, salary, or closing date.",');
    text = text.slice(0, st) + seg + text.slice(end);
    console.log("Updated Zoho location to India");
  }
}
writeFileSync(FILE, text);
