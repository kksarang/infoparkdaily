#!/usr/bin/env node
/* Add hiring posters shared on 10 Nov 2026, pinned at the top of JOBS.
 * Only details printed on each poster are used; anything not on a poster stays empty.
 * Skips any job whose id is already in jobs-data.js. */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "jobs-data.js");
const NOTE = "Job details can change after publishing. Always verify the opening on the employer's official channel before applying. InfoparkDaily is not a recruiter and never collects money for jobs. Never pay anyone for an application or interview.";
const ADDED = "Added 10 Nov 2026 from the employer's hiring poster. Verify with the employer before applying.";
const mail = (email, subject) => `mailto:${email}?subject=${encodeURIComponent(subject)}`;

const job = (o) => ({
  logo: "", experienceRange: "", employmentType: "", applyDeadline: "Rolling", postedDate: "2026-11-10",
  source: "WhatsApp", verified: true, verificationNote: NOTE, tags: [], isWalkIn: false, walkInDate: "",
  email: "", phone: "", website: "", address: "", industry: "", companyDetails: "", workDetails: "",
  workStatus: "", workMode: "", experienceYears: "", salaryRange: "", qualification: "", skills: [],
  requirements: [], responsibilities: [], benefits: [], howToApply: "", hiringNotes: ADDED,
  description: "", startingDate: "", ...o,
});

const JOBS_NEW = [
  job({
    id: "kinder-hospitals-kochi-clinical-nurse-educator-nov10",
    company: "Kinder Hospitals", companyBlurb: "Kinder Hospitals Kochi · Clinical Nurse Educator · MSc/BSc Nursing · 3+ years hospital teaching · NABH exposure mandatory",
    location: "Kochi, Kerala", roles: ["Clinical Nurse Educator"], experience: "experienced", experienceRange: "Above 3 years",
    applyLink: mail("careers@kinderkochi.com", "Clinical Nurse Educator"), tags: ["Healthcare", "Nursing", "Non IT"],
    email: "careers@kinderkochi.com", phone: "9188203144", address: "Kochi, Kerala", industry: "Healthcare",
    companyDetails: "Kinder Hospitals, Kochi (hospital phone: 0484 666 0000).", workDetails: "Clinical Nurse Educator at Kinder Hospitals, Kochi.",
    experienceYears: "Above 3 years", qualification: "MSc / BSc Nursing",
    requirements: ["MSc or BSc Nursing", "Above 3 years of teaching experience in a hospital", "NABH exposure is mandatory"],
    howToApply: "Email your CV to careers@kinderkochi.com or call 9188203144.",
    description: "Kinder Hospitals Kochi · Clinical Nurse Educator · MSc/BSc Nursing · 3+ years hospital teaching · NABH exposure mandatory.",
  }),
  job({
    id: "minerva-spv-technopark-accountant-tally-erp-nov10",
    company: "Minerva Special Purpose Vehicle (P) Ltd", companyBlurb: "Minerva SPV · Accountant (Tally ERP) · Technopark, Trivandrum · B.Com/M.Com · 3+ years · apply by 30 Nov 2026",
    location: "Technopark, Trivandrum, Kerala", roles: ["Accountant (Tally ERP)"], experience: "experienced", experienceRange: "Minimum 3 years",
    applyLink: mail("jeny@tattvatvm.com", "Accountant (Tally ERP)"), applyDeadline: "2026-11-30", tags: ["Accounts", "Finance", "Non IT"],
    email: "jeny@tattvatvm.com", address: "Technopark, Trivandrum, Kerala", industry: "Accounting & Finance",
    workDetails: "Accountant handling Tally ERP, GST filing, payroll and bookkeeping at Technopark, Trivandrum.",
    experienceYears: "Minimum 3 years", qualification: "B.Com / M.Com",
    skills: ["Tally ERP", "MS Excel", "MS Word", "GST filing", "Payroll", "Bookkeeping"],
    requirements: ["B.Com or M.Com", "Minimum 3 years of experience", "Tally ERP experience is mandatory"],
    howToApply: "Email your CV to jeny@tattvatvm.com before 30 November 2026.",
    description: "Minerva SPV Accountant (Tally ERP) · Technopark Trivandrum · B.Com/M.Com · 3+ years · Tally, GST, payroll, bookkeeping · closes 30 Nov 2026.",
  }),
  job({
    id: "karunya-hrudayalaya-calicut-scrub-nurse-nov10",
    company: "Karunya Hrudayalaya Cardiac Centre", companyBlurb: "Karunya Hrudayalaya · Scrub Nurse · Calicut · BSc/GNM with Kerala Nursing Council registration · 1+ years · 1 opening",
    location: "Calicut, Kerala", roles: ["Scrub Nurse"], experience: "experienced", experienceRange: "1+ years",
    applyLink: mail("hr.khindia@gmail.com", "Scrub Nurse"), tags: ["Healthcare", "Nursing", "Non IT"], vacancies: 1,
    email: "hr.khindia@gmail.com", phone: "7907409749", website: "https://www.karunyahrudayalaya.com", address: "Calicut, Kerala", industry: "Healthcare",
    companyDetails: "Karunya Hrudayalaya Cardiac Centre — centres in Calicut, Tirur, Malappuram, Kochi, Thrissur, Valanchery, Edappal, Trivandrum and Bengaluru.",
    workDetails: "Scrub Nurse at Karunya Hrudayalaya, Calicut. One opening.",
    experienceYears: "1+ years", qualification: "BSc / GNM Nursing with valid Kerala Nursing Council registration",
    requirements: ["BSc or GNM Nursing", "Valid Kerala Nursing Council registration", "1+ years of experience"],
    howToApply: "Email your CV to hr.khindia@gmail.com or call 790 740 97 49.",
    description: "Karunya Hrudayalaya Scrub Nurse · Calicut · BSc/GNM with KNC registration · 1+ years · 1 opening.",
  }),
  job({
    id: "netweb-software-vadodara-multiple-roles-nov10",
    company: "NetWeb Software", companyBlurb: "NetWeb Software · Vadodara · Data Engineer, QA, Integration Testing, .NET, Lead Fullstack AI Engineer · 1–10+ years",
    location: "Vadodara, Gujarat",
    roles: ["Data Engineer (1–3 years)", "QA Engineer (5+ years)", "QA Manager (10+ years)", "Integration Testing Engineer (5+ years)", "Support Engineer – .NET (3+ years)", "Senior .NET Engineer (5+ years)", "Lead Fullstack AI Engineer (6+ years)"],
    experience: "experienced", experienceRange: "1–10+ years (varies by role)",
    applyLink: mail("careers@netweb.biz", "Vadodara opening"), tags: ["IT", ".NET", "QA", "Data Engineering", "AI"],
    email: "careers@netweb.biz", phone: "+91 635-189-9912", website: "https://www.netweb.biz", address: "Vadodara, Gujarat", industry: "IT Services",
    workDetails: "Seven open positions at NetWeb Software's Vadodara office.", experienceYears: "1–10+ years",
    requirements: ["Data Engineer: 1–3 years", "QA Engineer: 5+ years", "QA Manager: 10+ years", "Integration Testing Engineer: 5+ years", "Support Engineer – .NET: 3+ years", "Senior .NET Engineer: 5+ years", "Lead Fullstack AI Engineer: 6+ years"],
    howToApply: "Share your CV at careers@netweb.biz or +91 635-189-9912, or apply at www.netweb.biz. Mention the role and Vadodara.",
    description: "NetWeb Software Vadodara · Data Engineer, QA Engineer/Manager, Integration Testing, .NET Support/Senior, Lead Fullstack AI Engineer.",
  }),
  job({
    id: "netweb-software-hyderabad-integration-roles-nov10",
    company: "NetWeb Software", companyBlurb: "NetWeb Software · Hyderabad · Enterprise Integration Lead (7+ yrs) · Senior Integration Engineer (3+ yrs)",
    location: "Hyderabad, Telangana", roles: ["Enterprise Integration Lead (7+ years)", "Senior Integration Engineer (3+ years)"],
    experience: "experienced", experienceRange: "3–7+ years (varies by role)",
    applyLink: mail("careers@netweb.biz", "Hyderabad opening"), tags: ["IT", "Integration"],
    email: "careers@netweb.biz", phone: "+91 635-189-9912", website: "https://www.netweb.biz", address: "Hyderabad, Telangana", industry: "IT Services",
    workDetails: "Two integration positions at NetWeb Software's Hyderabad office.", experienceYears: "3–7+ years",
    requirements: ["Enterprise Integration Lead: 7+ years", "Senior Integration Engineer: 3+ years"],
    howToApply: "Share your CV at careers@netweb.biz or +91 635-189-9912, or apply at www.netweb.biz. Mention the role and Hyderabad.",
    description: "NetWeb Software Hyderabad · Enterprise Integration Lead (7+ yrs) and Senior Integration Engineer (3+ yrs).",
  }),
  job({
    id: "lira-kitchen-cochin-accounts-assistant-nov10",
    company: "Lira Kitchen", companyBlurb: "Lira Kitchen (modular kitchens & wardrobes) · Accounts Assistant · Cochin · B.Com/M.Com · 0–2 years, freshers can apply · immediate hiring",
    location: "Cochin, Kerala", roles: ["Accounts Assistant"], experience: "both", experienceRange: "0–2 years · freshers with accounting knowledge can apply",
    applyLink: "https://wa.me/918086662201", tags: ["Accounts", "Freshers", "Non IT"],
    phone: "8086662201", address: "Cochin, Kerala", industry: "Modular Kitchens & Wardrobes",
    companyDetails: "Lira Kitchen — modular kitchens and wardrobes.", workDetails: "Accounts Assistant supporting day-to-day accounting at Lira Kitchen, Cochin. Immediate hiring.",
    experienceYears: "0–2 years", qualification: "B.Com / M.Com or relevant qualification",
    skills: ["Tally", "MS Excel", "GST", "TDS"],
    requirements: ["B.Com / M.Com or relevant qualification", "Basic knowledge of Tally and MS Excel", "0–2 years of experience; freshers with accounting knowledge can apply"],
    responsibilities: ["Assist in day-to-day accounting and financial operations", "Maintain invoices, payments and expense records", "Support GST, TDS and statutory compliance", "Coordinate with internal teams and vendors", "Help prepare MIS and reports"],
    howToApply: "Send your CV on WhatsApp to 8086662201.",
    description: "Lira Kitchen Accounts Assistant · Cochin · B.Com/M.Com · Tally & Excel · 0–2 years, freshers can apply.",
  }),
  job({
    id: "sakon-pune-walkin-analyst-fulfillment-21nov2026",
    company: "Sakon", companyBlurb: "Sakon walk-in · Analyst / Senior Analyst – Fulfillment · Pune (hybrid) · 1–5 years telecom order management · 21 Nov 2026, 11 AM–2 PM",
    location: "Pune, Maharashtra (Hybrid)", roles: ["Analyst / Senior Analyst – Fulfillment"], experience: "experienced", experienceRange: "1–5 years",
    applyLink: mail("sakshi.sao@sakon.com", "Analyst / Senior Analyst – Fulfillment"), applyDeadline: "2026-11-21",
    tags: ["Walk-in", "Telecom", "Operations", "Non IT"], isWalkIn: true, walkInDate: "2026-11-21", walkinTime: "11:00 AM – 2:00 PM",
    walkinLocation: "Sakon, 6th Floor and Mezzanine, Ag Trade Center, NDA Pashan Rd, Ram Nagar, Bavdhan, Pune, Maharashtra 411021",
    email: "sakshi.sao@sakon.com", address: "Sakon, 6th Floor and Mezzanine, Ag Trade Center, NDA Pashan Rd, Ram Nagar, Bavdhan, Pune, Maharashtra 411021", industry: "Telecom Operations",
    workDetails: "Telecom order fulfilment analyst. Hybrid in Pune, rotational shifts including nights.", workMode: "Hybrid · rotational shifts including nights",
    experienceYears: "1–5 years", skills: ["Order management", "Telecom operations", "English communication", "MS Excel / Word / PowerPoint"],
    requirements: ["1–5 years of order management / telecom operations experience", "Strong English communication with a neutral or US accent", "Knowledge of mobile devices, telecom services and MS Office (Excel, Word, PowerPoint)", "Problem-solving mindset and able to work night shifts"],
    responsibilities: ["Manage telecom orders (buy, move, add, change, terminate) across vendor portals and email", "Coordinate with clients, vendors and partners for accurate, timely order processing", "Resolve order discrepancies and maintain SLA compliance", "Maintain order documentation, trackers and reports"],
    howToApply: "Walk in on 21 November 2026, 11:00 AM – 2:00 PM, at Sakon, 6th Floor and Mezzanine, Ag Trade Center, NDA Pashan Rd, Ram Nagar, Bavdhan, Pune 411021 — or share your profile at sakshi.sao@sakon.com.",
    description: "Sakon walk-in · Analyst / Senior Analyst – Fulfillment · telecom order management · 1–5 years · Pune hybrid, night shifts · 21 Nov 2026.",
  }),
  job({
    id: "pushpagiri-medical-college-hospital-neurotechnologist-nov10",
    company: "Pushpagiri Medical College Hospital", companyBlurb: "Pushpagiri Medical College Hospital · Neurotechnologist · degree/diploma in neurotechnology · 1+ year · EEG, PSG, NCS, EMG",
    location: "Pushpagiri Medical College Hospital", roles: ["Neurotechnologist"], experience: "experienced", experienceRange: "Minimum 1 year",
    applyLink: mail("careers@pushpagiri.in", "Neurotechnologist"), tags: ["Healthcare", "Non IT"],
    email: "careers@pushpagiri.in", phone: "9447845011 (WhatsApp)", industry: "Healthcare",
    workDetails: "Neurotechnologist performing neurophysiology and diagnostic procedures.",
    experienceYears: "Minimum 1 year", qualification: "Degree / Diploma in Neurotechnology",
    skills: ["EEG", "Video EEG", "PSG", "NCS", "Evoked potential studies", "EMG"],
    requirements: ["Degree or Diploma in Neurotechnology", "Minimum 1 year of experience"],
    responsibilities: ["Perform neurophysiology and diagnostic procedures, including EEG, Video EEG, PSG, NCS, evoked potential studies and EMG", "Ensure accurate test performance, proper patient preparation and equipment maintenance", "Follow hospital protocols and patient safety standards"],
    howToApply: "Send your CV to careers@pushpagiri.in or WhatsApp 9447845011.",
    hiringNotes: "Added 10 Nov 2026 from the employer's hiring poster. The poster does not state the hospital's location. Verify with the employer before applying.",
    description: "Pushpagiri Medical College Hospital Neurotechnologist · degree/diploma in neurotechnology · 1+ year · EEG, PSG, NCS, EMG.",
  }),
  job({
    id: "lifeline-hospital-senior-quality-executive-nov10",
    company: "The Lifeline Hospital", companyBlurb: "Lifeline Hospital · Senior Quality Executive · MBA or relevant qualification · 2+ years",
    location: "Kerala", roles: ["Senior Quality Executive"], experience: "experienced", experienceRange: "Minimum 2 years",
    applyLink: mail("Careerslifelinedr@gmail.com", "Senior Quality Executive"), tags: ["Healthcare", "Quality", "Non IT"],
    email: "Careerslifelinedr@gmail.com", phone: "04734219626, +91 9188619312", website: "https://www.lifelinehospitalkerala.com", industry: "Healthcare",
    companyDetails: "The Lifeline hospital (since 2005; NABH accredited, ISO 9001:2015). Hospital phone: 04734 - 219500, 223377.",
    workDetails: "Senior Quality Executive at The Lifeline hospital.", experienceYears: "Minimum 2 years", qualification: "MBA or relevant qualification",
    requirements: ["MBA or relevant qualification", "Minimum 2 years of relevant experience"],
    howToApply: "Email Careerslifelinedr@gmail.com or call 04734219626 / +91 9188619312.",
    hiringNotes: "Added 10 Nov 2026 from the employer's hiring poster. The poster does not name the town; see www.lifelinehospitalkerala.com. Verify with the employer before applying.",
    description: "Lifeline Hospital Senior Quality Executive · MBA or relevant qualification · 2+ years.",
  }),
  job({
    id: "white-matrix-ai-full-stack-engineer-kalamassery-nov08",
    company: "White Matrix Solutions", companyBlurb: "White Matrix · AI Full Stack Engineer · Kinfra Hi-Tech Park, Kalamassery · 0–3 years · ₹2–3 LPA",
    location: "Kinfra Hi-Tech Park, Kalamassery, Kochi", roles: ["AI Full Stack Engineer"], experience: "both", experienceRange: "0–3 years",
    applyLink: mail("hr@whitematrix.co.in", "AI Full Stack Engineer"), postedDate: "2026-11-08", tags: ["IT", "AI", "Full Stack"],
    email: "hr@whitematrix.co.in", address: "Kinfra Hi-Tech Park, Kalamassery, Kochi, Kerala", industry: "IT Services",
    workDetails: "AI Full Stack Engineer building end-to-end AI solutions.", experienceYears: "0–3 years", salaryRange: "₹2–3 LPA (CTC)",
    requirements: ["0–3 years of experience"],
    howToApply: "Email your CV to hr@whitematrix.co.in.",
    hiringNotes: "Added 10 Nov 2026 from the employer's hiring poster (dated 8 Nov 2026). Verify with the employer before applying.",
    description: "White Matrix AI Full Stack Engineer · Kalamassery, Kochi · 0–3 years · ₹2–3 LPA.",
  }),
  job({
    id: "peni-ice-candy-counter-staff-kerala-tn-nov10",
    company: "Peni Ice Candy", companyBlurb: "Peni Ice Candy · Counter Staff · across Kerala & Tamil Nadu · 12th / any degree / diploma · freshers can apply",
    location: "Across Kerala & Tamil Nadu", roles: ["Counter Staff"], experience: "fresher", experienceRange: "Freshers can apply",
    applyLink: mail("perfectsp.hr@gmail.com", "Counter Staff"), tags: ["Retail", "Freshers", "Non IT"],
    email: "perfectsp.hr@gmail.com", phone: "9037932500 / 8891815299", industry: "Food & Retail",
    workDetails: "Counter staff at Peni Ice Candy outlets across Kerala and Tamil Nadu. Weekly rotational shift.", workMode: "On-site · weekly rotational shift",
    experienceYears: "Freshers", qualification: "12th / any degree / diploma",
    requirements: ["12th, any degree or diploma", "Basic computer knowledge", "Freshers can apply", "Weekly rotational shift"],
    howToApply: "Email perfectsp.hr@gmail.com or call 9037932500 / 8891815299.",
    description: "Peni Ice Candy Counter Staff · across Kerala & Tamil Nadu · 12th/any degree/diploma · freshers can apply · rotational shift.",
  }),
  job({
    id: "offenso-hackers-academy-kochi-asst-operations-manager-nov10",
    company: "Offenso Hackers Academy", companyBlurb: "Offenso Hackers Academy · Asst Operations Manager · Kochi branch · 3–5 years in EdTech operations",
    location: "Kochi, Kerala", roles: ["Assistant Operations Manager"], experience: "experienced", experienceRange: "3–5 years",
    applyLink: mail("career@offensoacademy.com", "Asst Operations Manager"), tags: ["EdTech", "Operations", "Non IT"],
    email: "career@offensoacademy.com", phone: "+91 89215 73930", address: "Kochi branch, Kerala", industry: "EdTech / Cybersecurity training",
    companyDetails: "Offenso Hackers Academy — ethical hacking training academy.", workDetails: "Assistant Operations Manager at Offenso's Kochi branch.",
    experienceYears: "3–5 years", requirements: ["3–5 years of experience in EdTech operations"],
    howToApply: "Email career@offensoacademy.com or call +91 89215 73930.",
    description: "Offenso Hackers Academy Asst Operations Manager · Kochi · 3–5 years EdTech operations.",
  }),
  job({
    id: "ananthapuri-hospitals-trivandrum-endoscopy-technician-nov10",
    company: "Ananthapuri Hospitals and Research Institute", companyBlurb: "Ananthapuri Hospitals · Endoscopy Technician · Chacka, Trivandrum · BSc/Diploma in Endoscopy Technology · 2–4 years",
    location: "Chacka, NH Bypass, Trivandrum, Kerala", roles: ["Endoscopy Technician"], experience: "experienced", experienceRange: "2–4 years",
    applyLink: mail("ahrihrd@gmail.com", "Endoscopy Technician"), tags: ["Healthcare", "Non IT"],
    email: "ahrihrd@gmail.com", phone: "+91 85473 42403", website: "https://www.ananthapurihospitals.com", address: "Chacka, NH Bypass, Trivandrum, Kerala", industry: "Healthcare",
    companyDetails: "Ananthapuri Hospitals and Research Institute, Trivandrum (NABH accredited). Hospital phone: 0471 660 99 00.",
    workDetails: "Endoscopy Technician in the hospital's endoscopy unit.", experienceYears: "2–4 years", qualification: "BSc / Diploma in Endoscopy Technology",
    skills: ["Endoscopy procedures", "ERCP (desirable)"],
    requirements: ["BSc or Diploma in Endoscopy Technology", "2–4 years of relevant experience in an endoscopy unit", "Knowledge and skills in ERCP procedures (desirable)"],
    howToApply: "Email your resume to ahrihrd@gmail.com or contact +91 85473 42403.",
    description: "Ananthapuri Hospitals Endoscopy Technician · Trivandrum · BSc/Diploma in Endoscopy Technology · 2–4 years · ERCP desirable.",
  }),
  job({
    id: "prime-minds-consulting-bengaluru-python-odoo-developer-nov10",
    company: "Prime Minds Consulting Pvt. Ltd.", companyBlurb: "Prime Minds Consulting · Python Developer (Odoo) · Rajajinagar, Bengaluru · BE/B.Tech 2023–2026 · joining Dec 2026",
    location: "Rajajinagar, Bengaluru, Karnataka", roles: ["Python Developer (Odoo)"], experience: "fresher", experienceRange: "Freshers · 2023–2026 pass-outs",
    applyLink: mail("hr@primemindsconsulting.com", "Python Developer"), tags: ["IT", "Python", "Odoo", "Freshers"],
    email: "hr@primemindsconsulting.com", address: "Rajajinagar, Bengaluru, Karnataka", industry: "IT Consulting / ERP",
    workDetails: "Python developer role on Odoo ERP. Work from office in Rajajinagar, Bengaluru. Joining December 2026.", workMode: "Work from office",
    experienceYears: "Freshers", qualification: "BE / B.Tech (CSE / ISE / ECE / EEE / IT), 2023–2026 pass-outs", startingDate: "December 2026",
    skills: ["Python", "Odoo", "PostgreSQL", "QWeb / XML", "REST APIs", "Git"],
    requirements: ["BE / B.Tech in CSE, ISE, ECE, EEE or IT", "Year of passing 2023 to 2026", "No backlogs", "60% and above throughout academics", "Course completion certificate from the Python Institute"],
    responsibilities: ["Learn and work on Python, the Odoo framework and Odoo modules (CRM, Sales, Purchase, Inventory, HR, Accounting)", "ORM and model development; views, actions and reports; QWeb, XML and UI customisation", "API integration, PostgreSQL, Git, debugging and real-world project development"],
    howToApply: "Send your resume to hr@primemindsconsulting.com.",
    hiringNotes: "Added 10 Nov 2026 from the employer's hiring poster. The poster asks for a course completion certificate from 'the Python Institute' and gives no salary. Never pay for training or a certificate to get a job. Verify with the employer before applying.",
    description: "Prime Minds Consulting Python (Odoo) Developer · Bengaluru · BE/B.Tech 2023–2026, 60%+, no backlogs · joining Dec 2026.",
  }),
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
