#!/usr/bin/env node
/* Add jobs found via kickcharm.com (work-from-home category) and foundthejob.com (remote, latest, experienced and freshers categories) on 19 Nov 2026, each confirmed open on the employer's own careers page, pinned at the top of JOBS.
 * Only details from the official listing are used. Skipped: posts linking only to Naukri/LinkedIn or a general search page, walk-in posts with no
 * employer listing, LSEG AI/ML Intern (no longer in LSEG's job search) and Pearson (listing unreadable without a browser).
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

const seen = (d, via = "kickcharm.com") => `Found via ${via}; confirmed open on the employer's official careers page on 19 Nov 2026.${d ? ` Official posting date: ${d}.` : ""}`;
const D = ({ _posted, _via, ...o }) => job({ source: "Direct", hiringNotes: seen(_posted, _via), ...o });

const JOBS_NEW = [
  D({ id: "certifyos-operations-analyst-india-remote-759dbd75", company: "CertifyOS", _posted: "19 Oct 2026",
    companyBlurb: "CertifyOS · Operations Analyst · India (fully remote, Pune) · Full-time",
    location: "Pune, Maharashtra (remote)", roles: ["Operations Analyst"], employmentType: "Full-time", workMode: "Remote", postedDate: "2026-10-19",
    applyLink: "https://jobs.ashbyhq.com/certifyos/759dbd75-07dd-4e64-adf0-7ed47104c605", tags: ["CertifyOS", "Operations", "US Healthcare", "Work from home", "Non IT"],
    website: "https://www.certifyos.com", industry: "Healthcare data infrastructure",
    qualification: "Bachelor's degree or equivalent years of work experience",
    workDetails: "Process provider credentials, licences and payor enrolment applications for US healthcare customers. Fully remote.",
    responsibilities: ["Research and evaluate US provider licensure and continuing medical education information", "Complete credentialing, licensure or payor enrolment applications for customers", "Validate information on the credentialing/licensing platform with 100% accuracy", "Email providers and clients when more information is needed", "Help with monitoring and new client implementation projects", "Summarize research into clear guideline documents"],
    requirements: ["Fluency in English", "Bachelor's degree or equivalent work experience", "Ability to research large volumes of information, particularly via Google", "Strong attention to detail", "Sound knowledge of Microsoft Office and Google apps", "Excellent written and verbal communication", "Ability to meet deadlines under pressure"],
    howToApply: "Apply on CertifyOS's Ashby careers page.", description: "Remote operations analyst handling US provider credentialing and licensing at CertifyOS." }),
  D({ id: "rackspace-support-technician-i-india-remote-r-24047", company: "Rackspace Technology", _posted: "26 Oct 2026",
    companyBlurb: "Rackspace Technology · Support Technician I · India · work from home · 24/7 shifts",
    location: "India (remote)", roles: ["Support Technician I"], employmentType: "Full-time", workMode: "Remote", postedDate: "2026-10-26",
    applyLink: "https://rackspace.wd1.myworkdayjobs.com/en-US/External/job/IND-Work-from-Home-Remote/Support-Technician-I_R-24047", tags: ["Rackspace", "Technical Support", "Service Desk", "Work from home", "Night shift"],
    website: "https://www.rackspace.com/careers", industry: "Cloud services", qualification: "Graduate",
    skills: ["Windows 10", "Office 365", "Active Directory", "ITIL / ServiceNow", "Basic Azure"],
    workDetails: "Service desk support for an international (preferably US/UK) customer base. Must be open to 24/7 shifts.",
    responsibilities: ["Manage the ticket queue and route/troubleshoot inbound requests", "Handle technical calls and chats", "Provision user accounts", "Support business software including Microsoft Office", "Own tickets through their lifecycle under ITIL and resolve within SLA", "Keep customers updated on their open tickets"],
    requirements: ["Graduate", "Experience supporting global clients (preferably US/UK) on Microsoft Office and Windows OS", "Excellent communication skills", "Open to 24/7 shift work", "Win 10, Office 365 and Active Directory user/group management", "Incident management and hardware/software troubleshooting", "Basic Azure knowledge; ITIL/ServiceNow is a plus"],
    howToApply: "Apply on Rackspace's Workday careers page (R-24047).", description: "Remote IT service desk technician for international customers at Rackspace, 24/7 shifts." }),
  D({ id: "bruntwork-data-entry-assistant-crm-remote-66418368607", company: "BruntWork", _posted: "17 Nov 2026",
    companyBlurb: "BruntWork · Data Entry Assistant (CRM) · Remote · part-time (20 hrs/week, US hours)",
    location: "Remote (work from home)", roles: ["Data Entry Assistant (CRM)"], employmentType: "Part-time (independent contractor)", workMode: "Remote", postedDate: "2026-11-17",
    applyLink: "https://www.bruntworkcareers.co/jobs/66418368607", tags: ["BruntWork", "Data Entry", "Work from home", "Part-time", "Night shift", "Non IT"],
    website: "https://www.bruntworkcareers.co", industry: "Remote staffing",
    workDetails: "For a BruntWork client: build and maintain a CRM outreach database. Monday–Friday, 9 AM–1 PM PST (20 hours/week). Pay is hourly, set from the application assessment.",
    responsibilities: ["Search the lead database for contacts in agreed target categories", "Enter leads into the CRM one at a time", "Copy and download lead information accurately for email and phone campaigns", "Keep CRM records organized and up to date", "Answer occasional incoming calls and route them (no sales or outbound calls)"],
    requirements: ["Prior data entry or administrative experience", "Clear spoken and written English", "High attention to detail and data accuracy", "Strong written communication", "Professional phone manner", "Nice to have: experience with American companies"],
    howToApply: "Apply on BruntWork careers; the application includes assessment questions, a technical check and a voice recording.", description: "Part-time remote CRM data entry assistant (US hours) via BruntWork." }),
  D({ id: "scalex-operations-customer-success-executive-remote-29", company: "ScaleX Media",
    companyBlurb: "ScaleX Media · Operations (Customer Success) Executive · Bengaluru / permanently remote · Full-time",
    location: "Bengaluru, Karnataka (remote)", roles: ["Operations (Customer Success) Executive"], employmentType: "Full-time", workMode: "Remote",
    applyLink: "https://scalex.sensehq.com/careers/jobs/29", tags: ["ScaleX", "Customer Success", "Operations", "Webinars", "Work from home", "Non IT"],
    website: "https://scalex.sensehq.com/careers", industry: "Performance marketing",
    skills: ["Zoom Webinars / GoToWebinar / WebEx", "Canva", "Google Sheets", "Customer support"],
    workDetails: "Plan and run webinars, operational workflows and customer support for a performance marketing agency. Permanently remote; needs own laptop, stable internet and power backup.",
    responsibilities: ["Plan and execute end-to-end operational workflows: scheduling, logistics, content and participant communication", "Create presentations and materials in Canva", "Track schedules, participation and performance in Google Sheets", "Run webinar platforms: setup, live broadcasting, recording and post-event analysis", "Handle customer support across email, chat and phone", "Document standard processes and train team members"],
    requirements: ["Experience running webinars, customer support operations or similar workflows", "Proficiency in Canva or similar design tools", "Proficiency in webinar platforms (Zoom Webinars, GoToWebinar, WebEx)", "Excellent written and verbal communication", "Comfort with analytics and Google Sheets", "Own laptop, stable internet and power backup"],
    howToApply: "Apply on ScaleX's careers page (job 29).", description: "Remote operations and customer success executive running webinars at ScaleX Media." }),
  D({ id: "amazon-investigation-representative-row-ib-telangana-10378715", company: "Amazon",
    companyBlurb: "Amazon · Investigation Representative, ROW IB · Telangana",
    location: "Telangana", roles: ["Investigation Representative, ROW IB"],
    applyLink: "https://www.amazon.jobs/en/jobs/10378715/investigation-representative-row-ib", tags: ["Amazon", "Operations", "Seller Support", "Non IT"],
    website: "https://www.amazon.jobs", industry: "E-commerce", qualification: "Bachelor's degree, or 1+ years of work experience",
    workDetails: "Rest of World Inbound (ROW IB) team, India Operations: resolve seller and fulfilment-centre inbound issues. Official listing location: ASSPL – Telangana – D82.",
    responsibilities: ["Investigate and resolve seller issues by researching and querying internal tools", "Analyze data and spot trends to improve seller experience", "Manage the flow of information between stakeholders and report progress", "Deep-dive to summarize findings and propose fixes for gaps and risks"],
    requirements: ["Knowledge of Microsoft Office including Outlook, Word and Excel", "Bachelor's degree, or 1+ years of work experience", "Excellent written and verbal English", "Ability to follow issues through to resolution, in a team or independently", "Good typing and web navigation skills", "Preferred: good deep-diving skills and quick learning of complex processes"],
    howToApply: "Apply on Amazon Jobs (job 10378715).", description: "Amazon seller-support investigation representative on the ROW Inbound team, Telangana." }),
  D({ id: "clipboard-onboarding-documents-associate-remote-apac-82df7116", company: "Clipboard", _posted: "5 May 2026", _via: "foundthejob.com",
    companyBlurb: "Clipboard · Onboarding Documents Associate · Remote (APAC) · Full-time",
    location: "Remote (APAC)", roles: ["Onboarding Documents Associate"], employmentType: "Full-time", workMode: "Remote", postedDate: "2026-05-05",
    salaryRange: "$7.5K – $9K (as listed on Clipboard's careers page)",
    applyLink: "https://jobs.ashbyhq.com/clipboard/82df7116-0720-4434-a330-ca7e0389dc60", tags: ["Clipboard", "Operations", "Compliance", "US Healthcare", "Work from home", "Non IT"],
    website: "https://jobs.ashbyhq.com/clipboard", industry: "Healthcare staffing marketplace",
    workDetails: "Operations team: review and validate onboarding documents from healthcare professionals against facility, local, state and federal requirements. Shift-based queue work.",
    responsibilities: ["Review and validate onboarding documents for accuracy, completeness and compliance", "Monitor and manage document queues, backlogs and expirations during assigned shifts", "Update document statuses, map documents and resolve unread submissions", "Recommend improvements to internal policies", "Work with cross-functional teams on document-related queries"],
    howToApply: "Apply on Clipboard's Ashby careers page.", description: "Remote onboarding-documents associate validating healthcare compliance documents at Clipboard." }),
  D({ id: "kroll-data-analyst-operations-bangalore-21014254", company: "Kroll", _via: "foundthejob.com",
    companyBlurb: "Kroll · Data Analyst – Operations · Bangalore · Hybrid · 1–3 years",
    location: "Bengaluru, Karnataka", roles: ["Data Analyst – Operations"], experience: "experienced", experienceRange: "1–3 years", workMode: "Hybrid",
    applyLink: "https://careers.kroll.com/en/job/bangalore/data-analyst-operations/21014254", tags: ["Kroll", "Data Analyst", "Operations", "Cybersecurity"],
    website: "https://careers.kroll.com", industry: "Risk & cybersecurity consulting",
    qualification: "Bachelor's degree in Business, Finance, Economics, Data Analytics or a related field",
    skills: ["Advanced Excel", "Power BI", "Salesforce", "Reporting & dashboards"],
    workDetails: "Supports the cybersecurity service line's operations: reporting, data quality, and project and resource coordination.",
    responsibilities: ["Prepare operational reports, dashboards and KPIs (revenue, backlog, pipeline, utilization, capacity)", "Analyze operational data for trends, risks and improvements", "Validate operational data and run routine data-quality audits", "Assist with resource scheduling and project administration", "Partner with Finance, Sales Operations and Delivery teams"],
    requirements: ["Bachelor's degree in Business, Finance, Economics, Data Analytics or related field", "1–3 years in business operations, analytics, sales operations, project coordination or similar", "Advanced Excel and strong analytical skills", "Salesforce, Power BI or similar reporting tools preferred", "Strong attention to detail, organization and communication"],
    howToApply: "Apply on Kroll careers (job 21014254).", description: "Operations data analyst for Kroll's cybersecurity practice, Bangalore (hybrid)." }),
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
