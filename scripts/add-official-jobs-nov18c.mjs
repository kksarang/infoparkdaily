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

const JOBS_NEW = [
  DIRECT({ id: "hcltech-campus-beginner-bhubaneshwar-189023-nov18", company: "HCLTech",
    companyBlurb: "HCLTech · Campus Beginner (Python) · Bhubaneshwar, Odisha · fresh graduates",
    location: "Bhubaneshwar, Odisha", roles: ["Campus Beginner (Python developer)"], experience: "fresher", experienceRange: "Fresh graduates",
    applyLink: "https://careers.hcltech.com/job/Campus-Beginner/189023-en_US/", tags: ["HCLTech", "Freshers", "Python"],
    website: "https://careers.hcltech.com", address: "Bhubaneshwar, Odisha", industry: "IT Services",
    workDetails: "Work with experienced engineering teams to develop, test and maintain Python-based applications, with exposure to automation, AI and cloud technologies.",
    skills: ["Python", "Databases"],
    requirements: ["Fresh graduates with a passion for programming and software development"],
    responsibilities: ["Develop, test and maintain Python applications and scripts", "Write clean, efficient, reusable code following coding standards", "Debug and troubleshoot issues under guidance from senior developers", "Participate in code reviews and team discussions", "Work with databases to store and retrieve application data", "Support automation, data processing and application enhancement"],
    howToApply: "Apply on HCLTech Careers (job 189023).",
    hiringNotes: "HCLTech job 189023 · Added 18 Nov 2026 from the official HCLTech careers listing. The listing does not state degree, batch, percentage or salary.",
    description: "HCLTech Campus Beginner · Python developer · Bhubaneshwar · fresh graduates." }),
  DIRECT({ id: "hcltech-administrator-support-operations-madurai-183226-nov18", company: "HCLTech",
    companyBlurb: "HCLTech · Administrator (Support & Operations) · Madurai, Tamil Nadu · ticket resolution, on-call support",
    location: "Madurai, Tamil Nadu", roles: ["Administrator (Support & Operations)"], experience: "", experienceRange: "",
    applyLink: "https://careers.hcltech.com/job/Administrator-%28Support-%26-Operations%29/183226-en_US/", tags: ["HCLTech", "IT Support", "Operations"],
    website: "https://careers.hcltech.com", address: "Madurai, Tamil Nadu", industry: "IT Services",
    workDetails: "Independently resolve tickets, provide on-call support and do root cause analysis to ensure positive customer feedback.",
    responsibilities: ["Adhere to quality standards, regulatory requirements and company policies", "Support on-call escalations and do root cause analysis", "Update and manage the knowledge base, train freshers and coach analysts", "Resolve tickets independently within agreed SLAs", "Drive CSAT through first-call resolution and minimal reopened cases"],
    howToApply: "Apply on HCLTech Careers (job 183226).",
    hiringNotes: "HCLTech job 183226 · Added 18 Nov 2026 from the official HCLTech careers listing. The listing does not state experience, qualification or skills.",
    description: "HCLTech Administrator (Support & Operations) · Madurai · ticket resolution and on-call support." }),
  DIRECT({ id: "ntt-data-helpdesk-associate-itil-bangalore-369157-nov18", company: "NTT DATA",
    companyBlurb: "NTT DATA · Helpdesk Associate – ITIL · Bangalore · 24/7 rotational shifts · work from office",
    location: "Bangalore, Karnataka", roles: ["Helpdesk Associate – ITIL"], experience: "", experienceRange: "",
    applyLink: "https://careers-inc.nttdata.com/job/Bangalore-Helpdesk-Associate-ITIL-KA/1433812200/", postedDate: "2026-10-24", tags: ["NTT DATA", "IT Support", "Service Desk"],
    website: "https://careers-inc.nttdata.com", address: "Bangalore, Karnataka", industry: "IT Services", workMode: "Work from office · 24/7 rotational shifts and week offs",
    skills: ["IT service desk", "Windows 10", "macOS", "iOS", "Android", "Google Suite", "Microsoft environment", "Troubleshooting"],
    requirements: ["Excellent English written and verbal communication skills", "Exceptional customer service skills", "24/7 rotational shifts and week offs; work from office mandatory", "Strong troubleshooting skills", "IT software and hardware troubleshooting knowledge (Win 10, macOS, iOS, Android, Google Suite, Microsoft environment)"],
    responsibilities: ["Provide IT service desk support, guidance and training to end users", "Record, update and escalate support issues promptly", "Support IT onboarding activities", "Work with internal IT teams on system testing, integration and maintenance", "Suggest and implement process and technology improvements"],
    howToApply: "Apply on NTT DATA Careers (Req ID 369157).",
    hiringNotes: "NTT DATA Req ID 369157 · posted 24 Oct 2026 · Added 18 Nov 2026 from the official NTT DATA careers listing.",
    description: "NTT DATA Helpdesk Associate – ITIL · Bangalore · IT service desk · 24/7 rotational shifts, work from office." }),
  DIRECT({ id: "nike-retail-associate-dahisar-mumbai-r-91064-nov18", company: "Nike",
    companyBlurb: "Nike · Retail Associate (company-owned store) · Dahisar, Mumbai · VM, stock and front-of-house roles",
    location: "Dahisar, Mumbai", roles: ["Retail Associate – Nike (COCO), Dahisar"], experience: "both", experienceRange: "1+ year customer service / retail preferred",
    applyLink: "https://careers.nike.com/retail-associate-nike-direct-dahisar-mumbai/job/R-91064", postedDate: "2026-11-03", employmentType: "Full-time", tags: ["Nike", "Retail", "Non IT"],
    website: "https://careers.nike.com", address: "Shop No 3 & 4, Crescent Western Trade Center, Service Road, Pandurang Wadi, Dahisar, Mumbai", industry: "Retail",
    workDetails: "Nike Direct Athlete at a new company-owned store in Dahisar. Openings include VM specialists, back-of-house (stock) and front-of-house associates. Shortlisted candidates are invited to an in-person interview in Mumbai.",
    qualification: "Secondary school qualification",
    requirements: ["Completed a secondary school qualification", "Able to perform basic math", "Able to communicate effectively in verbal and written English", "Able to twist, bend, squat, reach, climb a ladder and stand for extended periods", "Able to multitask in a fast-paced, team environment and give excellent customer service", "One or more years of customer service and/or retail experience preferred"],
    responsibilities: ["Provide world-class service using Nike's Know, Equip, Engage, Inspire principles", "Learn all store roles: service, visual presentation and stockroom", "Help the team run daily retail operations"],
    howToApply: "Apply on Nike Careers (R-91064).",
    description: "Nike Retail Associate · Dahisar, Mumbai · company-owned store · secondary school · retail experience preferred." }),
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
