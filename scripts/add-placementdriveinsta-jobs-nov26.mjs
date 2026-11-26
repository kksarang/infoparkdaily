#!/usr/bin/env node
/* Add jobs found via placementdriveinsta.in/category/jobs/ (posts 3 Oct – 25 Nov 2026), each confirmed open on the employer's own careers page on 26 Nov 2026, pinned at the top of JOBS.
 * Skipped: posts already in jobs-data.js (HCLTech 189023 and 183226, Google FDE intern, EY 1681365, Amazon JOB-IN-0000007857, Cognizant service desk, NTT Data, Nike, Accenture AIOC-S01664425, Tech Mahindra WFH);
 * listings closed on the official site (LSEG R0123659, Accenture AIOC-S01671014, Wipro 201557 / 212634 / 199371, Cognizant 00070260513, Canva, EY 1433203533, Deloitte 369345, Vassar Labs hireathon);
 * expired Naukri posts (Accenture Gurugram walk-in, Genpact, Tech Mahindra Pune and Hyderabad); walk-ins / drives with no employer listing (TCS Mumbai, Sutherland);
 * an unattributed Microsoft Forms "HCLTech" registration link; Amazon HirePro (captcha, no readable job details); and non-job posts.
 * Only details stated on the official listing are used; anything not stated stays empty.
 * Skips any job whose id is already in jobs-data.js. */
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

const seen = (d) => `Found via placementdriveinsta.in; confirmed open on the employer's official careers page on 26 Nov 2026.${d ? ` Official posting date: ${d}.` : ""}`;
const D = ({ _posted, ...o }) => job({ hiringNotes: seen(_posted), ...o });

const JOBS_NEW = [
  D({ id: "ibm-system-support-representative-freshers-india-142095", company: "IBM",
    companyBlurb: "IBM · System Support Representative · B.E./B.Tech (ECE / Electronics / IT) freshers · multiple Indian cities",
    location: "Bengaluru, Hyderabad, Pune, Chennai, Gurugram, Noida, New Delhi", roles: ["System Support Representative"],
    experience: "fresher", experienceRange: "Freshers (0 years)", employmentType: "Full-time",
    applyLink: "https://careers.ibm.com/en_US/careers/JobDetail?jobId=142095", tags: ["IBM", "Technical Support", "Hardware", "Field Service", "Freshers"],
    website: "https://www.ibm.com/careers", industry: "IT hardware & services (IBM Systems)",
    qualification: "B.E./B.Tech in Electronics, Electronics & Communication or Information Technology; no backlogs",
    workDetails: "IBM Systems field role: on-site installation, maintenance and repair of IBM and multi-vendor hardware, networking products, software and operating systems at customer sites. Listed locations: Hyderabad, Pune, Gurgaon, Chennai, Noida, Bangalore and New Delhi.",
    responsibilities: ["Install, maintain and repair IBM and multi-vendor systems, networking products, software and operating systems on site", "Act as the main technical contact for customers on hardware and software support", "Keep customer satisfaction high across service delivery and technical support", "Manage critical situations with the customer until the problem is fixed"],
    requirements: ["B.E./B.Tech in Electronics, Electronics & Communication or Information Technology", "Freshers (0 years of experience)", "No backlogs at the time of the IBM selection process"],
    howToApply: "Apply on IBM Careers (job 142095).", description: "IBM fresher role for ECE / Electronics / IT engineers doing on-site hardware and systems support across Indian cities." }),
  D({ id: "phonepe-platform-engineer-1-bengaluru-1000000000006623", company: "PhonePe", _posted: "23 Nov 2026",
    companyBlurb: "PhonePe · Platform Engineer 1 (Tech Infra & IT) · Bengaluru · 0–2 years · any graduate",
    location: "Bengaluru, Karnataka", roles: ["Platform Engineer 1"], experience: "both", experienceRange: "0–2 years (internships / projects count)", employmentType: "Full-time", postedDate: "2026-11-23",
    applyLink: "https://jobs.smartrecruiters.com/PHONEPELIMITED/1000000000006623", tags: ["PhonePe", "Linux", "Windows Server", "IT Infrastructure", "Freshers"],
    website: "https://www.phonepe.com/careers/", industry: "Fintech / digital payments", qualification: "Any graduate",
    address: "Salarpuria Softzone, Bellandur, Bengaluru, Karnataka 560103",
    skills: ["Linux", "Windows Server", "Active Directory", "DNS / DHCP", "Shell scripting", "Monitoring & patching"],
    workDetails: "Entry-level role in the Tech Infra & IT team focused on patching, monitoring and day-to-day operations of Windows and Linux servers, working under supervision.",
    responsibilities: ["Monitor systems, track alerts and report daily operational status", "Run regular patching, server updates and basic OS tasks", "Handle user access requests and basic Active Directory / DNS administration", "Do daily health checks and automate routine maintenance", "Document incidents, knowledge-base articles and SOPs"],
    requirements: ["Any graduate", "0–2 years of experience, or relevant internships / projects in IT infrastructure support", "Basic Linux / Windows, networking (DNS, DHCP) and shell scripting knowledge", "Willingness to learn platform, cloud and automation tools"],
    benefits: ["Medical, critical illness, accident and life insurance", "Parental support (maternity, paternity, adoption, day-care)", "PF, gratuity, NPS and leave encashment", "Relocation support and higher education assistance"],
    howToApply: "Apply on PhonePe's SmartRecruiters page (1000000000006623).", description: "Entry-level platform engineer handling Linux / Windows server operations at PhonePe, Bengaluru." }),
  D({ id: "accenture-technology-architect-azure-stack-bengaluru-atci-5781497", company: "Accenture",
    companyBlurb: "Accenture · Technology Architect (Azure Stack) · Bengaluru · 0–2 years",
    location: "Bengaluru, Karnataka", roles: ["Technology Architect – Technology Architecture Associate"], experience: "both", experienceRange: "0–2 years", employmentType: "Full-time",
    applyLink: "https://www.accenture.com/in-en/careers/jobdetails?id=ATCI-5781497-S2073563_en&title=Technology+Architect", tags: ["Accenture", "Azure", "Cloud", "Linux", "Windows Server"],
    website: "https://www.accenture.com/in-en/careers", industry: "IT services & consulting", qualification: "15 years of full-time education",
    skills: ["Azure Stack", "Windows Server administration", "Linux", "Hybrid cloud"],
    workDetails: "Design and deliver technology architecture for a platform, product or client engagement, meeting performance, capability and scalability needs. Must-have skill: Azure Stack (0–2 years).",
    responsibilities: ["Build knowledge and support the team", "Take part in problem-solving discussions", "Work with cross-functional teams to turn requirements into architecture", "Help document architecture designs and decisions", "Share architecture best practices with junior team members"],
    requirements: ["0–2 years of experience in Azure Stack", "15 years of full-time education", "Good to have: Linux and Microsoft Windows Server administration", "Familiarity with cloud infrastructure and hybrid cloud", "Strong problem-solving and attention to detail"],
    howToApply: "Apply on Accenture careers (ATCI-5781497-S2073563).", description: "Early-career Azure Stack technology architect role at Accenture, Bengaluru." }),
  D({ id: "deloitte-usi-bta-quality-engineer-hyderabad-368242", company: "Deloitte USI",
    companyBlurb: "Deloitte USI · BTA – Quality Engineer (Data analytics testing) · Hyderabad · entry level",
    location: "Hyderabad, Telangana", roles: ["BTA – Quality Engineer"], experience: "fresher", experienceRange: "Entry level", employmentType: "Full-time",
    applyLink: "https://usijobs.deloitte.com/en_US/careersUSI/JobDetail/USI-EH27-Tax-GESTC-Quality-Engineer-with-Data-analytics-L25-BTA-Hyderabad/368242", tags: ["Deloitte", "Software Testing", "QA", "SQL", "Data Analytics", "Freshers"],
    website: "https://usijobs.deloitte.com", industry: "Professional services (Tax technology)",
    qualification: "Bachelor's degree in Computer Science or a related field, or equivalent",
    skills: ["Manual testing", "SQL", "API testing", "ETL / data validation", "Excel", "Jira / Azure DevOps", "Python / C# / JavaScript basics", "Playwright / Selenium / Postman"],
    workDetails: "Entry-level quality engineer in the Analytics Horizontal team testing reports, dashboards, ETL pipelines, APIs and AI-enabled applications, with training on the team's tools. Shift: 11:00 AM – 8:00 PM.",
    responsibilities: ["Turn requirements and acceptance criteria into test scenarios and test cases", "Run functional, integration, regression, API and end-to-end tests", "Check reports and dashboards for data accuracy, filters, access and performance", "Validate data with SQL and source-to-target comparisons", "Test AI-enabled features for correctness, relevance and guardrails", "Log, track and retest defects with clear evidence", "Help maintain automation scripts for API, UI and data checks"],
    requirements: ["Bachelor's degree in Computer Science or related field, or equivalent", "Basics of software testing, SDLC and defect life cycle", "Basic SQL (joins, filters, aggregations, reconciliation)", "Clear written and verbal communication", "Working knowledge of Microsoft Excel", "Nice to have: Jira / Azure DevOps, Python / C# / JavaScript, Playwright / Selenium / Postman, Power BI or Qlik, ISTQB Foundation"],
    howToApply: "Apply on Deloitte USI careers (job 368242).", description: "Entry-level QA engineer testing analytics, data pipelines and AI apps at Deloitte USI, Hyderabad." }),
  D({ id: "grid-india-executive-trainee-gate-2027-cc-26-2026", company: "GRID-INDIA (Grid Controller of India Limited)", _posted: "16 Sep 2026 (Advt. No. CC/26/2026)",
    companyBlurb: "GRID-INDIA · Executive Trainee (Electrical / Computer Science) through GATE 2027 · 52 posts · ₹50,000–1,60,000 · apply after GATE 2027 results",
    location: "Delhi, Mumbai, Kolkata, Bengaluru, Guwahati, Shillong", roles: ["Executive Trainee (Electrical)", "Executive Trainee (Computer Science)"],
    experience: "fresher", experienceRange: "Freshers; final-year students eligible", employmentType: "Full-time (Government PSU)", postedDate: "2026-09-16", applyDeadline: "",
    vacancies: 52, salaryRange: "₹50,000 – ₹1,60,000 (E2 level, IDA pay scale)",
    applyLink: "https://grid-india.in/en/careers/current-openings", email: "recruitment@grid-india.in",
    tags: ["Government Jobs", "PSU", "GATE 2027", "Electrical", "Computer Science", "Freshers"],
    website: "https://grid-india.in", industry: "Power system operations (Government of India, Ministry of Power)",
    qualification: "Full-time B.E./B.Tech/B.Sc (Engg.)/Integrated Dual Degree with minimum 65% (or equivalent CGPA) in Electrical / Electrical (Power) / EEE / Power Systems, or Computer Science / Computer Engineering / IT",
    workDetails: "Advt. No. CC/26/2026: 37 Executive Trainee (Electrical) posts (35 fresh + 2 backlog) and 15 Executive Trainee (Computer Science) posts. Selection uses GATE 2027 marks (85%), group discussion (3%) and personal interview (12%). One year of on-the-job training at E2 level. Service bond: ₹5,00,000 (General / OBC-NCL / EWS) or ₹2,50,000 (SC / ST / PwBD) to complete training and serve at least three years.",
    requirements: ["Qualify in GATE 2027: Electrical Engineering (EE) paper for Electrical, Computer Science & IT (CS) paper for Computer Science; GATE 2026 or older scores are not valid", "Full-time B.E./B.Tech/B.Sc (Engg.)/IDD in an eligible discipline with minimum 65% or equivalent CGPA", "Final-year students can apply if results are expected by 14 Aug 2027 and they have 65% up to the pre-final year", "Upper age limit 28 years as on 31 Jul 2027 (born on or after 1 Aug 1999); relaxation for OBC-NCL (3 yrs), SC/ST (5 yrs), PwBD (10 yrs extra)", "Application fee ₹500 (SC / ST / PwBD / Ex-SM / departmental candidates exempt)"],
    selectionProcess: ["GATE 2027 score (85% weightage)", "Group discussion (3%)", "Personal interview (12%; qualifying 40% UR/EWS, 30% reserved)", "Pre-employment medical examination"],
    howToApply: "Write GATE 2027 in the EE or CS paper. GRID-INDIA will open its online application window and publish a separate notice on grid-india.in after GATE 2027 results are declared. Queries only to recruitment@grid-india.in.",
    description: "GRID-INDIA (Ministry of Power PSU) will recruit 52 Electrical and Computer Science Executive Trainees through GATE 2027; applications open after GATE 2027 results.",
    officialLinks: { careers: "https://grid-india.in/en/careers/current-openings", notification: "https://webcdn.grid-india.in/files/grdw/2026/09/Detailed%20Advt_GATE%202027_187.pdf", gate: "https://gate2027.iitm.ac.in" } }),
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
