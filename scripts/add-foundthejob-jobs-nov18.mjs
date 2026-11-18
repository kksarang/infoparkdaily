#!/usr/bin/env node
/* Add jobs and internships found via foundthejob.com (18 Nov 2026), each confirmed open on the employer's own careers page, pinned at the top of JOBS.
 * Only details stated on the official listing are used; anything not stated stays empty.
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
const seen = (d) => `Found via foundthejob.com; confirmed open on the official careers page on 18 Nov 2026. Official posting date: ${d}.`;

const JOBS_NEW = [
  DIRECT({ id: "worldwide-clinical-trials-associate-accounts-receivable-trivandrum-jr102614", company: "Worldwide Clinical Trials",
    companyBlurb: "Worldwide Clinical Trials · Associate, Accounts Receivable · Trivandrum",
    location: "Trivandrum, Kerala", roles: ["Associate, Accounts Receivable"], employmentType: "Full-time",
    applyLink: "https://worldwide.wd1.myworkdayjobs.com/External/job/Trivandrum/Associate--Accounts-Receivable_JR102614", tags: ["Worldwide Clinical Trials", "Accounts", "Finance", "Kerala", "Non IT"],
    website: "https://careers.worldwide.com", industry: "Clinical research (CRO)", workDetails: "Vendor/client invoice processing and accounting in the Accounts Receivable or Accounts Payable team.",
    howToApply: "Apply on Worldwide Clinical Trials' Workday site (JR102614).", hiringNotes: seen("8 Sep 2026"), description: "Accounts receivable associate at a global CRO, Trivandrum." }),
  DIRECT({ id: "sap-sales-development-associate-ai-bangalore-remote-744000161726670", company: "SAP",
    companyBlurb: "SAP · Sales Development Associate (AI Expertise) · Bangalore · remote · no sales experience needed",
    location: "Bangalore (remote)", roles: ["Sales Development Associate (AI Expertise)"], experience: "fresher", employmentType: "Full-time",
    applyLink: "https://jobs.sap.com/en/jobs/744000161726670/sales-development-associate-ai-expertise/", tags: ["SAP", "Sales", "Early talent", "Work from home"],
    website: "https://jobs.sap.com", industry: "Enterprise software", workMode: "Remote", workDetails: "Early-talent role: mentoring by sales development colleagues, structured academies and certifications.",
    requirements: ["No prior sales experience required"], howToApply: "Apply on SAP careers (744000161726670).", hiringNotes: seen("16 Nov 2026"), description: "SAP early-career sales development role, remote from Bangalore." }),
  DIRECT({ id: "akamai-associate-cloud-support-engineer-weekend-remote-4139", company: "Akamai",
    companyBlurb: "Akamai · Associate Cloud Support Engineer (Weekend Shift) · India · remote",
    location: "India (remote)", roles: ["Associate Cloud Support Engineer (Weekend Shift)"], employmentType: "Full-time",
    applyLink: "https://fa-extu-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1/job/4139", tags: ["Akamai", "Cloud Support", "Technical Support", "Work from home"],
    website: "https://www.akamai.com/careers", industry: "Cloud / CDN", workMode: "Remote · weekend shift", workDetails: "AkaTec team: resolve technical issues for global customers, 24/7/365 support.",
    howToApply: "Apply on Akamai careers (job 4139).", hiringNotes: seen("Oct 2026"), description: "Akamai remote cloud support engineer on a weekend shift." }),
  DIRECT({ id: "yipitdata-data-qa-associate-india-remote-7026087", company: "YipitData",
    companyBlurb: "YipitData · Data QA Associate · India · fully remote · 0–2 years",
    location: "India (fully remote)", roles: ["Data QA Associate"], experience: "both", experienceRange: "0–2 years", employmentType: "Full-time",
    applyLink: "https://job-boards.greenhouse.io/yipitdatajobs/jobs/7026087", tags: ["YipitData", "Accounting", "Data QA", "Work from home"],
    website: "https://www.yipitdata.com", industry: "Market research / analytics", workMode: "Remote", workDetails: "Working hours 8 AM – 5 PM IST.",
    qualification: "Bachelor's degree or above", skills: ["Accounting / bookkeeping", "SAP / Oracle / NetSuite / QuickBooks / Xero"],
    requirements: ["0–2 years accounting or bookkeeping experience (internships count), or 0–2 years as a data/QA analyst in finance data", "Hands-on with at least one ERP, accounting or expense system"],
    howToApply: "Apply on YipitData's Greenhouse page.", hiringNotes: seen("18 Sep 2026"), description: "Remote finance-data QA associate for freshers and early-career candidates." }),
  DIRECT({ id: "panoptyc-associate-theft-investigator-remote-india", company: "Panoptyc",
    companyBlurb: "Panoptyc · Associate Theft Investigator · India · fully remote",
    location: "India (remote)", roles: ["Associate Theft Investigator"], employmentType: "Full-time",
    applyLink: "https://jobs.ashbyhq.com/Panoptyc/3f296e0a-06c8-43fc-832d-e5e487af8354", tags: ["Panoptyc", "Loss Prevention", "Work from home", "Non IT"],
    industry: "Retail security", workMode: "Remote", workDetails: "Minimum 30 hours/week (ideally 40); 2-day self-paced training and a 2-week nesting period.",
    requirements: ["Attend the 2-day self-paced training", "Complete the 2-week nesting period", "Commit to at least 30 hours a week"],
    howToApply: "Apply on Panoptyc's Ashby page.", hiringNotes: seen("31 Mar 2026"), description: "Remote retail loss-prevention role reviewing footage for theft." }),
  DIRECT({ id: "wing-customer-service-representative-india-remote", company: "Wing Assistant",
    companyBlurb: "Wing · Customer Service Representative (India) · remote · US hours · 1+ year",
    location: "India (remote)", roles: ["Customer Service Representative"], experience: "experienced", experienceRange: "1+ years", employmentType: "Part-time / Full-time",
    applyLink: "https://jobs.lever.co/getwingapp/f6c44f7d-2606-4e18-a886-8e96e59ed2f2", tags: ["Wing", "Customer Support", "Work from home", "Night shift"],
    workMode: "Remote", workDetails: "US work hours (graveyard shift), 20–40 hours per week. Holiday and overtime pay.",
    requirements: ["At least 1 year as a customer service representative (B2C or B2B)", "English at B2 level or above", "Able to work a graveyard shift"],
    howToApply: "Apply on Wing's Lever page; shortlisted candidates take an assessment.", hiringNotes: seen("Nov 2026"), description: "Remote customer service for US clients, night hours." }),
  DIRECT({ id: "fresh-prints-sales-recruiter-hyderabad-remote-6230724004", company: "Fresh Prints",
    companyBlurb: "Fresh Prints · Sales Recruiter · Hyderabad (remote) · 7:30 PM – 4:30 AM IST",
    location: "Hyderabad (remote)", roles: ["Sales Recruiter"], employmentType: "Full-time",
    applyLink: "https://job-boards.greenhouse.io/freshprints/jobs/6230724004", tags: ["Fresh Prints", "Recruitment", "Sales", "Work from home", "Night shift"],
    workMode: "Remote", workDetails: "Monday–Friday, 7:30 PM – 4:30 AM IST. 40% recruiting, 60% sales and communication.",
    howToApply: "Apply on Fresh Prints' Greenhouse page.", hiringNotes: seen("1 Nov 2026"), description: "Remote recruiter hiring US campus managers, night shift." }),
  DIRECT({ id: "teoco-utility-credit-analyst-bengaluru-716532", company: "TEOCO",
    companyBlurb: "TEOCO · Utility Credit Analyst (US business hours) · Bengaluru",
    location: "Bengaluru, Karnataka", roles: ["Utility Credit Analyst"], employmentType: "Full-time",
    applyLink: "https://teoco.na.teamtailor.com/jobs/716532-utility-credit-analyst-us-business-hours", tags: ["TEOCO", "Analyst", "Non IT"],
    workDetails: "US business hours or a split US/India schedule.", skills: ["Attention to detail", "Analysis", "Written communication"],
    howToApply: "Apply on TEOCO's careers page (716532).", hiringNotes: seen("8 Oct 2026"), description: "Utility credit analyst working US hours, Bengaluru." }),
  DIRECT({ id: "keyvalue-business-development-executive-karnataka-4915294", company: "KeyValue Software Systems",
    companyBlurb: "KeyValue · Business Development Executive · Karnataka · English & Kannada",
    location: "Karnataka", roles: ["Business Development Executive"], employmentType: "Full-time",
    applyLink: "https://keyvalue.zohorecruit.in/jobs/Careers/144720000004915294/Business-Development-Executive-Karnataka", tags: ["KeyValue", "Business Development", "Sales", "Non IT"],
    skills: ["English", "Kannada", "Cold calling", "Email campaigns"], requirements: ["Strong communication in English and Kannada"],
    howToApply: "Apply on KeyValue's Zoho Recruit page.", hiringNotes: seen("Nov 2026"), description: "Business development executive for the Karnataka market." }),
  DIRECT({ id: "gusti-leder-purchasing-assistant-qc-kolkata", company: "Gusti Leder",
    companyBlurb: "Gusti Leder · Purchasing Assistant – QC & Quality Inspection · Kolkata · hybrid · ₹5–5.5 LPA · no experience needed",
    location: "Kolkata, West Bengal", roles: ["Purchasing Assistant – QC & Quality Inspection"], experience: "fresher", employmentType: "Full-time", salaryRange: "₹5,00,000 – ₹5,50,000 per year",
    applyLink: "https://gustileder.recruitee.com/o/purchasing-assistant-qc-quality-inspection-kolkata-hybrid-1", tags: ["Gusti Leder", "Purchasing", "Quality", "Freshers", "Non IT"],
    workMode: "Hybrid", workDetails: "Work with suppliers; visits to leather tanneries and production locations.", requirements: ["No experience required"],
    howToApply: "Apply on Gusti Leder's Recruitee page.", hiringNotes: seen("2 Nov 2026"), description: "Hybrid purchasing and QC assistant role in Kolkata, open to freshers." }),
  DIRECT({ id: "swiggy-client-servicing-executive-mumbai-6000000001576904", company: "Swiggy",
    companyBlurb: "Swiggy · Client Servicing Executive (Dineout Mag) · Mumbai · 1–2 years",
    location: "Mumbai, Maharashtra", roles: ["Client Servicing Executive"], experience: "experienced", experienceRange: "1–2 years", employmentType: "Full-time",
    applyLink: "https://jobs.smartrecruiters.com/SWIGGY/6000000001576904-client-servicing-executive-", tags: ["Swiggy", "Client Servicing", "Media", "Non IT"],
    requirements: ["1–2 years in a client-facing role, preferably creative, media or digital agency", "Excellent verbal and written communication"],
    howToApply: "Apply on Swiggy's SmartRecruiters page.", hiringNotes: seen("14 Nov 2026") + " Some sites list this as work from home; the official listing says Mumbai.", description: "Client servicing for Swiggy's Dineout Mag food media team, Mumbai." }),
  DIRECT({ id: "capco-full-stack-developer-pune-8336309", company: "Capco",
    companyBlurb: "Capco (a Wipro company) · Full Stack Developer · Pune · Spring Boot",
    location: "Pune, Maharashtra", roles: ["Full Stack Developer"], experience: "experienced", employmentType: "Full-time",
    applyLink: "https://job-boards.greenhouse.io/capco/jobs/8336309", tags: ["Capco", "Full Stack", "Java", "Spring Boot"],
    skills: ["Spring Boot", "Spring Cloud", "Spring MVC", "Hibernate", "REST APIs"], workDetails: "Later interview stage is face-to-face at Capco's Pune office.",
    howToApply: "Apply on Capco's Greenhouse page.", hiringNotes: seen("10 Nov 2026"), description: "Full stack developer (Java / Spring) at Capco, Pune." }),
  DIRECT({ id: "abbott-trainee-tbm-hyderabad-31119200", company: "Abbott",
    companyBlurb: "Abbott · Trainee TBM · Hyderabad",
    location: "Hyderabad, Telangana", roles: ["Trainee TBM"], employmentType: "Full-time",
    applyLink: "https://www.jobs.abbott/us/en/job/31119200/Trainee-TBM", tags: ["Abbott", "Sales", "Healthcare", "Non IT"],
    howToApply: "Apply on Abbott careers (31119200).", hiringNotes: seen("15 Nov 2026") + " Some sites list this as work from home; the official listing says Hyderabad.", description: "Abbott trainee territory business manager, Hyderabad." }),
  DIRECT({ id: "baxter-apprentice-software-bangalore-103378332112", company: "Baxter",
    companyBlurb: "Baxter · Apprentice (software) · Bangalore · CS / ECE graduates",
    location: "Bangalore, Karnataka", roles: ["Apprentice"], experience: "fresher", employmentType: "Apprenticeship",
    applyLink: "https://jobs.baxter.com/en/job/-/-/152/103378332112", tags: ["Baxter", "Apprentice", "Software", "Freshers"],
    qualification: "Bachelor's in Computer Engineering, Computer Science or Electronics & Communication", skills: ["Java", "C", "C++"],
    howToApply: "Apply on Baxter careers.", hiringNotes: seen("16 Nov 2026"), description: "Baxter software apprenticeship in Bangalore for CS/ECE graduates." }),
  DIRECT({ id: "volvo-graduate-apprentice-trainee-cad-creo-bangalore-562122", company: "Volvo Group",
    companyBlurb: "Volvo Group · Graduate Apprentice Trainee (CAD/Creo) · Bangalore · 2024–26 Mech/Auto grads · 65%+",
    location: "Bangalore, Karnataka", roles: ["Graduate Apprentice Trainee – CAD/Creo"], experience: "fresher", experienceRange: "2024, 2025 or 2026 graduates", employmentType: "Apprenticeship",
    applyLink: "https://jobs.volvogroup.com/job/Bangalore-Graduate-Apprentice-Trainee-CADCreo-562122/1376142555/", tags: ["Volvo", "Apprentice", "Mechanical", "CAD", "Freshers"],
    qualification: "Mechanical / Automobile Engineering graduate (2024–2026), minimum 65% in 10th, 12th/Diploma and graduation", skills: ["Mechanical / Automobile fundamentals", "Creo CAD", "MS Excel, Word, PowerPoint"],
    workDetails: "Programme duration as per NATS (National Apprenticeship Training Scheme) guidelines.",
    howToApply: "Apply on Volvo Group careers (562122).", hiringNotes: seen("Nov 2026"), description: "Volvo graduate apprentice in CAD/Creo for mechanical and automobile graduates, Bangalore." }),
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
