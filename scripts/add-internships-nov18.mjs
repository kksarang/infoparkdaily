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

/* From the 2027-batch internships list (offcampusjobs4u.com) — only roles confirmed open on the employer's own
   careers page on 18 Nov 2026. Details come from those official pages. */
const VERIFIED = "Confirmed open on the employer's official careers page on 18 Nov 2026.";
const JOBS_NEW = [
  DIRECT({ id: "stripe-operations-associate-apprenticeship-bengaluru-8131339", company: "Stripe",
    companyBlurb: "Stripe · Operations Associate, Apprenticeship · Bengaluru · 6-month programme from Jan 2027 · current students or 2026 graduates",
    location: "Bengaluru, Karnataka", roles: ["Operations Associate, Apprenticeship"], experience: "fresher", experienceRange: "Current students or 2026 graduates",
    applyLink: "https://stripe.com/careers/listing/operations-associate-apprenticeship/8131339", employmentType: "Apprenticeship",
    tags: ["Stripe", "Apprenticeship", "Internship", "Operations", "Freshers", "Non IT"], website: "https://stripe.com/jobs", address: "Bengaluru, Karnataka", industry: "Fintech / Payments",
    workMode: "In office (at least 50% of the month)", startingDate: "January 2027",
    workDetails: "6-month Apprenticeship Intern Program under the Apprentices Act 1961, starting January 2027, in Stripe's operations and support teams.",
    requirements: ["Current student or 2026 graduate", "Excellent written and spoken English", "Strong analytical thinking, research and problem solving", "Interest in learning technical products and processes", "Organised, process-oriented self-starter who works well across teams", "Comfortable working from the office"],
    howToApply: "Apply on Stripe's careers site (job 8131339).",
    hiringNotes: `${VERIFIED} Stripe listed it from 1 Sep 2026.`,
    description: "Stripe Operations Associate Apprenticeship · Bengaluru · 6 months from Jan 2027 · students or 2026 graduates." }),
  DIRECT({ id: "enterpret-backend-software-engineering-intern-bengaluru-7847134003", company: "Enterpret",
    companyBlurb: "Enterpret · Backend Software Engineering Intern · Bengaluru (onsite) · stipend + possible PPO",
    location: "Bengaluru, Karnataka", roles: ["Software Engineering Intern (Backend, Onsite)"], experience: "fresher", experienceRange: "Internship",
    applyLink: "https://job-boards.greenhouse.io/enterpret/jobs/7847134003", employmentType: "Internship",
    tags: ["Internship", "Backend", "AI", "Software Engineering"], website: "https://www.enterpret.com", address: "Bengaluru, Karnataka", industry: "AI / SaaS", workMode: "Onsite",
    workDetails: "Backend internship on Enterpret's customer-intelligence platform (natural language processing, serverless and real-time analytics), shipping to production with experienced engineers.",
    benefits: ["Internship stipend", "Possible pre-placement offer (PPO) based on performance"],
    howToApply: "Apply on Enterpret's Greenhouse job board (job 7847134003).",
    hiringNotes: `${VERIFIED} Enterpret listed it from 7 Oct 2026.`,
    description: "Enterpret Backend Software Engineering Intern · Bengaluru onsite · stipend and possible PPO." }),
  DIRECT({ id: "rubrik-eng-project-program-intern-bangalore-8166514", company: "Rubrik",
    companyBlurb: "Rubrik · ENG Project/Program Intern · Bangalore (onsite) · 2027 graduates, CGPA 8+, circuital branches · Jan–May 2027",
    location: "Bangalore, Karnataka", roles: ["ENG Project / Program Intern"], experience: "fresher", experienceRange: "2027 graduates",
    applyLink: "https://www.rubrik.com/company/careers/departments/job.8166514?gh_jid=8166514", employmentType: "Internship",
    tags: ["Internship", "Program Management", "2027 Batch"], website: "https://www.rubrik.com/company/careers", address: "Bangalore, Karnataka", industry: "Cybersecurity / Data Security",
    workMode: "Onsite, no remote option", startingDate: "January 2027 (until May 2027)",
    qualification: "Pursuing a Bachelor's or Master's in Computer Science, Engineering, Information Systems or related field · CGPA 8+ · 2027 graduates of circuital branches",
    skills: ["Project planning", "SDLC", "Agile", "Dashboards / reporting"],
    requirements: ["Pursuing a Bachelor's or Master's in CS, Engineering, Information Systems or a related field", "CGPA 8 and above", "2027 graduates of circuital branches only", "Available January–May 2027 in Bangalore, onsite", "Organisational and analytical skills; basic SDLC and Agile knowledge", "Preferred: exposure to AWS/Azure/GCP, storage or enterprise products"],
    responsibilities: ["Help define programme scope, milestones and success metrics", "Maintain project plans, schedules and documentation", "Track progress and share updates with stakeholders", "Build dashboards and reports to track KPIs"],
    howToApply: "Apply on Rubrik's careers site (job 8166514).",
    hiringNotes: `${VERIFIED} Rubrik listed it from 3 Nov 2026.`,
    description: "Rubrik ENG Project/Program Intern · Bangalore onsite · Jan–May 2027 · 2027 graduates, CGPA 8+." }),
  DIRECT({ id: "nextpower-intern-systems-engineering-hyderabad-nx-4026", company: "Nextpower (Nextracker)",
    companyBlurb: "Nextpower · Intern – Systems Engineering · Hyderabad · Master's/PhD in Structural/Mechanical · FEA, MATLAB, Python",
    location: "Hyderabad, Telangana", roles: ["Intern – Systems Engineering"], experience: "fresher", experienceRange: "Internship",
    applyLink: "https://nextracker.wd5.myworkdayjobs.com/nextpower_careers/job/Hyderabad-Telangana---IND/Intern--Systems-Engineering_NX-4026", employmentType: "Internship",
    tags: ["Internship", "Mechanical", "FEA", "Python", "MATLAB", "Non IT"], address: "Center for Solar Excellence, Hyderabad", industry: "Solar Energy",
    workDetails: "R&D internship on solar tracker systems: load calculations, FEA, simulation models and system-level testing at the Center for Solar Excellence, Hyderabad.",
    qualification: "Master's degree / PhD in Structural / Mechanical engineering (as stated)",
    skills: ["FEA", "MATLAB / Simulink", "Python", "CAD / CAE"],
    requirements: ["Master's or PhD in Structural / Mechanical engineering", "Sound mechanical / applied physics knowledge for load calculations and FEA", "Programming in MATLAB/Simulink and Python to automate calculations"],
    responsibilities: ["Assist in system-level design of tracker solutions", "Analyse failure modes from testing", "Support field system-level testing", "Build MATLAB/Python design-optimisation tools", "Document and report results"],
    howToApply: "Apply on Nextpower's Workday careers site (NX-4026).",
    hiringNotes: `${VERIFIED} Nextpower listed it from 7 Jul 2026.`,
    description: "Nextpower Systems Engineering Intern · Hyderabad · Master's/PhD Mechanical/Structural · FEA, MATLAB, Python." }),
  DIRECT({ id: "ibm-research-software-intern-gurgaon-bangalore-137471", company: "IBM",
    companyBlurb: "IBM · IBM Research / Research Software – Intern · Gurugram or Bangalore · hybrid",
    location: "Gurugram, Haryana / Bangalore, Karnataka", roles: ["IBM Research / Research Software – Intern"], experience: "fresher", experienceRange: "Internship",
    applyLink: "https://careers.ibm.com/en_US/careers/JobDetail/IBM-Research-Research-Software-Intern/137471", employmentType: "Internship",
    tags: ["IBM", "Internship", "Research", "Software Engineering"], website: "https://www.ibm.com/careers", address: "IBM India Private Limited · Gurugram / Bangalore", industry: "Technology",
    workMode: "Hybrid", workDetails: "Software engineering internship (fixed term) with IBM Research in Gurugram or Bangalore, general day shift, no travel.",
    howToApply: "Apply on IBM Careers (job 137471).",
    hiringNotes: `${VERIFIED} The visible listing shows location, work arrangement and internship type; check eligibility on IBM's page before applying.`,
    description: "IBM Research Software Intern · Gurugram or Bangalore · hybrid." }),
  DIRECT({ id: "signzy-qa-intern-bengaluru-134560", company: "Signzy",
    companyBlurb: "Signzy · QA Intern · Bengaluru · part-time · 0–1 year · programming fundamentals + API basics",
    location: "Bengaluru, Karnataka", roles: ["QA Intern"], experience: "fresher", experienceRange: "0–1 year",
    applyLink: "https://signzy.keka.com/careers/jobdetails/134560", employmentType: "Internship",
    tags: ["Internship", "QA", "Software Testing", "Freshers"], address: "Bengaluru, Karnataka", industry: "Fintech / RegTech", workMode: "Part-time",
    skills: ["Java / JavaScript / Python", "Test scenarios", "API testing", "REST / JSON", "Debugging"],
    requirements: ["Strong programming fundamentals in one language such as Java, JavaScript or Python", "Good logical reasoning, problem solving and analytical skills", "Basic data structures, loops, functions and debugging", "Basic API concepts, HTTP methods, JSON and REST are a plus", "Good communication and willingness to learn automation"],
    responsibilities: ["Design and run positive, negative, boundary and edge-case tests", "Find, reproduce and document defects", "Test APIs and integrations; analyse logs and responses", "Write basic scripts for automation and data validation", "Take part in regression, sanity, integration and end-to-end testing"],
    howToApply: "Apply on Signzy's careers page (job 134560).",
    hiringNotes: VERIFIED,
    description: "Signzy QA Intern · Bengaluru · part-time · programming fundamentals, testing and API basics." }),
  DIRECT({ id: "ey-gds-project-rise-learning-deployment-intern-bengaluru-1682012", company: "EY Global Delivery Services",
    companyBlurb: "EY GDS · Project RISE – Learning Deployment Specialist Intern · Bengaluru",
    location: "Bengaluru, Karnataka", roles: ["Project RISE – Learning Deployment Specialist Intern"], experience: "fresher", experienceRange: "Internship",
    applyLink: "https://eyglobal.yello.co/jobs/5hVK1BeChlbcjalJ1R_3iw?job_board_id=c1riT--B2O-KySgYWsZO1Q", employmentType: "Internship",
    tags: ["EY", "Internship", "Learning & Development", "Non IT"], website: "https://www.ey.com/en_in/careers", address: "EY GDS, Bengaluru", industry: "Professional Services",
    skills: ["Reporting / dashboards", "Documentation", "Communication", "Attention to detail"],
    requirements: ["Good written and verbal communication", "Strong analytical and problem-solving ability", "Eye for detail and ability to multi-task", "Collaborative, eager to learn and digitally minded"],
    responsibilities: ["Support learning-deployment work for the assigned accounts", "File and archive required documentation on time", "Prepare reports and dashboards for client teams and leadership", "Review working papers and client folders", "Suggest ways to improve engagement productivity"],
    howToApply: "Apply on EY's careers site (job 1682012).",
    hiringNotes: VERIFIED,
    description: "EY GDS Project RISE Learning Deployment Specialist Intern · Bengaluru · reporting, documentation, communication." }),
  DIRECT({ id: "emerson-applications-engineer-i-chennai-26011142", company: "Emerson",
    companyBlurb: "Emerson · Applications Engineer I · Chennai · engineering degree · control valve sizing & selection",
    location: "Chennai, Tamil Nadu", roles: ["Applications Engineer I"], experience: "", experienceRange: "",
    applyLink: "https://hdjq.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1/job/26011142", employmentType: "Full-time",
    tags: ["Emerson", "Engineering", "Instrumentation", "Non IT"], website: "https://www.emerson.com/en-us/careers", address: "Chennai, Tamil Nadu", industry: "Industrial Automation",
    workDetails: "Design and select products for customers using Fisher software, and prepare techno-commercial quotes and responses to technical queries.",
    qualification: "Degree in an engineering field",
    skills: ["Control valve sizing & selection", "Fisher software", "Techno-commercial quotations"],
    requirements: ["A degree in an engineering field", "Hands-on knowledge and experience of control valve sizing and selection", "Good interpersonal and communication skills"],
    responsibilities: ["Prepare technical and commercial quotes meeting customer requirements", "Review project specifications and document customer guidelines", "Support sales offices after purchase orders and prepare order entry", "Provide technical support on revisions and change orders"],
    howToApply: "Apply on Emerson's careers site (job 26011142).",
    hiringNotes: `${VERIFIED} Emerson listed it from 4 Oct 2026.`,
    description: "Emerson Applications Engineer I · Chennai · engineering degree · control valve sizing and selection." }),
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
