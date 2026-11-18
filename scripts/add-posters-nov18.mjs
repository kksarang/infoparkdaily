#!/usr/bin/env node
/* Add hiring posters shared on 18 Nov 2026, pinned at the top of JOBS.
 * Only details printed on each poster are used; anything not on a poster stays empty.
 * Skips any job whose id is already in jobs-data.js. */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "jobs-data.js");
const NOTE = "Job details can change after publishing. Always verify the opening on the employer's official channel before applying. InfoparkDaily is not a recruiter and never collects money for jobs. Never pay anyone for an application or interview.";
const ADDED = "Added 18 Nov 2026 from the employer's hiring poster. Verify with the employer before applying.";
const mail = (email, subject) => `mailto:${email}?subject=${encodeURIComponent(subject)}`;

const job = (o) => ({
  logo: "", experienceRange: "", employmentType: "", applyDeadline: "Rolling", postedDate: "2026-11-18",
  source: "WhatsApp", verified: true, verificationNote: NOTE, tags: [], isWalkIn: false, walkInDate: "",
  email: "", phone: "", website: "", address: "", industry: "", companyDetails: "", workDetails: "",
  workStatus: "", workMode: "", experienceYears: "", salaryRange: "", qualification: "", skills: [],
  requirements: [], responsibilities: [], benefits: [], howToApply: "", hiringNotes: ADDED,
  description: "", startingDate: "", ...o,
});


const MPP = "careerstrd@mpp.co.in";
const JOBS_NEW = [
  job({
    id: "soti-kochi-software-developer-hiring-drive-20nov2026",
    company: "SOTI India Private Ltd.", companyBlurb: "SOTI hiring drive · Software Developer · .NET, C#, Angular & SQL · 5+ years · Infopark Kochi · 20 Nov 2026, 10 AM–5 PM",
    location: "Lulu Cyber Tower 2, Infopark Phase I, Kochi", roles: ["Software Developer (.NET, C#, Angular & SQL)"], experience: "experienced", experienceRange: "5+ years",
    applyLink: "", applyDeadline: "2026-11-20", tags: ["IT", ".NET", "C#", "Angular", "SQL", "Hiring Drive"], isWalkIn: true, walkInDate: "2026-11-20", walkinTime: "10:00 AM – 5:00 PM",
    walkinLocation: "SOTI India Private Ltd., Unit Number 1004, 10th floor, Lulu Cyber Tower 2, Infopark SEZ Phase I, Infopark PO, Kochi 682042, Kerala",
    address: "Unit Number 1004, 10th floor, Lulu Cyber Tower 2, Infopark SEZ Phase I, Infopark PO, Kochi 682042, Kerala", industry: "Software Product",
    workDetails: "Software Developer at SOTI, Infopark Kochi. Selection: apply → coding test → technical interview → managerial interview.",
    experienceYears: "5+ years", skills: [".NET", "C#", "Angular", "SQL"],
    requirements: ["5+ years of hands-on experience in .NET, C#, Angular & SQL"],
    responsibilities: ["Design solutions, write code, review code, perform unit testing and deliver high-quality software", "Translate business requirements into detailed design specifications and code", "Anticipate customer needs, present innovative ideas and coach developers on best practices", "Provide technical guidance for new product development and stay updated on tech trends"],
    howToApply: "Apply by scanning the QR code on SOTI's hiring-drive poster. Shortlisted candidates will be invited for the interview on Friday, 20 November 2026, 10 AM – 5 PM, at SOTI, Lulu Cyber Tower 2, Infopark Kochi.",
    hiringNotes: "Added 18 Nov 2026 from the employer's hiring poster. The poster's apply link is a QR code only; shortlisted candidates are invited. Verify with the employer before applying.",
    description: "SOTI Software Developer hiring drive · .NET, C#, Angular, SQL · 5+ years · Infopark Kochi · 20 Nov 2026.",
  }),
  job({
    id: "differentbyte-byteflow-kochi-tech-ai-walkin-21nov2026",
    company: "DifferentByte / Byteflow", companyBlurb: "DifferentByte & Byteflow walk-in · Tech & AI drive · Python Developer (FastAPI/Backend), AI Developer · 0–4 years · JAIN University, Kakkanad · 21 Nov 2026",
    location: "Kakkanad, Kochi", roles: ["Python Developer (FastAPI / Backend)", "AI Developer"], experience: "both", experienceRange: "0–4 years",
    applyLink: "", applyDeadline: "2026-11-21", tags: ["Walk-in", "IT", "Python", "AI", "Freshers"], isWalkIn: true, walkInDate: "2026-11-21", walkinTime: "10:00 AM onwards",
    walkinLocation: "JAIN University, Kakkanad, Kochi", address: "JAIN University, Kakkanad, Kochi", industry: "IT",
    workDetails: "Tech & AI walk-in drive on 21 Nov 2026 for Python (FastAPI / backend) and AI developers.",
    experienceYears: "0–4 years", skills: ["Python", "FastAPI"],
    requirements: ["0 to 4 years of experience", "Fresh graduates and junior professionals can apply", "Good coding skills"],
    howToApply: "Walk in on Saturday, 21 November 2026, from 10:00 AM at JAIN University, Kakkanad, Kochi.",
    hiringNotes: "Added 18 Nov 2026 from the employer's hiring poster. The same poster's Sales drive (SDE, BDE, Inside Sales) was on 14 Nov 2026 and is over. Verify with the employer before attending.",
    description: "DifferentByte / Byteflow Tech & AI walk-in · Python Developer (FastAPI), AI Developer · 0–4 years · JAIN University Kakkanad · 21 Nov 2026.",
  }),
  job({
    id: "malayala-manorama-kottayam-hr-intern-nov18",
    company: "Malayala Manorama", companyBlurb: "Malayala Manorama · HR Intern · Kottayam · 9-month paid internship · fresh graduates",
    location: "Kottayam, Kerala", roles: ["HR Intern"], experience: "fresher", experienceRange: "Fresh graduates",
    applyLink: mail("jobs@manorama.com", "HR Intern"), employmentType: "Internship", tags: ["HR", "Internship", "Freshers", "Non IT"],
    email: "jobs@manorama.com", address: "Kottayam, Kerala", industry: "Media",
    workDetails: "9-month paid HR internship at Malayala Manorama, Kottayam.", experienceYears: "Freshers",
    responsibilities: ["Talent acquisition", "Onboarding & induction", "Employee engagement", "Learning & development", "HRIS & payroll support", "Employer branding"],
    requirements: ["Fresh graduates"], benefits: ["Paid internship (9 months)"],
    howToApply: "Share your CV to jobs@manorama.com.",
    description: "Malayala Manorama HR Intern · Kottayam · 9-month paid internship · fresh graduates · CV to jobs@manorama.com.",
  }),
  job({
    id: "mathrubhumi-news-digital-content-producer-trivandrum-nov18",
    company: "Mathrubhumi News Digital", companyBlurb: "Mathrubhumi News Digital · Content Producer · Trivandrum · 2+ years in a news desk",
    location: "Trivandrum, Kerala", roles: ["Content Producer"], experience: "experienced", experienceRange: "2+ years in a news desk",
    applyLink: mail(MPP, "Content Producer for Mathrubhumi News Digital"), tags: ["Media", "Journalism", "Content", "Non IT"],
    email: MPP, address: "Trivandrum, Kerala", industry: "Media / News",
    workDetails: "Content Producer on the Mathrubhumi News digital desk. Key focus: swift news delivery, sharp news selection, regional & global insight, real-time adaptability.",
    experienceYears: "2+ years",
    requirements: ["2+ years in a news desk", "Strong awareness of current affairs & news monitoring"],
    responsibilities: ["Track breaking news and draft accurate, quick-turnaround text stories", "Support desk operations in fast-paced content delivery"],
    howToApply: "Email careerstrd@mpp.co.in with the subject line \"Content Producer for Mathrubhumi News Digital\".",
    description: "Mathrubhumi News Digital Content Producer · Trivandrum · 2+ years news desk.",
  }),
  job({
    id: "mathrubhumi-news-digital-content-manager-trivandrum-nov18",
    company: "Mathrubhumi News Digital", companyBlurb: "Mathrubhumi News Digital · Content Manager · Trivandrum · 5+ years in a news desk",
    location: "Trivandrum, Kerala", roles: ["Content Manager"], experience: "experienced", experienceRange: "5+ years in a news desk",
    applyLink: mail(MPP, "Content Manager for Mathrubhumi News Digital"), tags: ["Media", "Journalism", "Content", "Non IT"],
    email: MPP, address: "Trivandrum, Kerala", industry: "Media / News",
    workDetails: "Content Manager on the Mathrubhumi News digital desk. Key specializations: fast news delivery, sharp news selection & digital newsroom management.",
    experienceYears: "5+ years",
    requirements: ["5+ years in a news desk", "Deep understanding of current events, trends & breaking news"],
    responsibilities: ["Lead desk operations & drive real-time news coverage", "Curate top stories with high accuracy & speed"],
    howToApply: "Email careerstrd@mpp.co.in with the subject line \"Content Manager for Mathrubhumi News Digital\".",
    description: "Mathrubhumi News Digital Content Manager · Trivandrum · 5+ years news desk.",
  }),
  job({
    id: "club-fm-thrissur-media-sales-professional-nov18",
    company: "Club FM (A Mathrubhumi Initiative)", companyBlurb: "Club FM · Media Sales Professionals · Thrissur · 3–5 years in radio / media sales",
    location: "Thrissur, Kerala", roles: ["Media Sales Professional"], experience: "experienced", experienceRange: "3–5 years in radio / media sales",
    applyLink: mail(MPP, "Media Sales Professional for Club FM"), tags: ["Sales", "Media", "Non IT"],
    email: MPP, address: "Thrissur, Kerala", industry: "Media / Radio",
    workDetails: "Media sales at Club FM, Thrissur.", experienceYears: "3–5 years",
    requirements: ["3–5 years in radio / media sales"],
    skills: ["Advertising sales", "Client relationship management", "Negotiation"],
    responsibilities: ["Identify, pitch and close advertising deals with agencies and direct clients", "Ideate new events and activations", "Strong client relationship management and negotiation skills"],
    howToApply: "Share your CV to careerstrd@mpp.co.in with the subject line \"Media Sales Professional for Club FM\".",
    description: "Club FM Media Sales Professional · Thrissur · 3–5 years radio/media sales.",
  }),
  job({
    id: "credise-business-solutions-kalamassery-telecaller-nov18",
    company: "Credise Business Solutions", companyBlurb: "Credise · Telecaller (female only) · HMT Road, Kalamassery · ₹18K · night shift · immediate joining · 2 vacancies",
    location: "HMT Road, Kalamassery, Ernakulam", roles: ["Telecaller (Female only)"], experience: "", vacancies: 2,
    applyLink: "https://wa.me/919995750054", tags: ["Telecalling", "Non IT"],
    phone: "9995750054 (WhatsApp)", address: "HMT Road, Kalamassery, Ernakulam", industry: "Business Services",
    workDetails: "Telecaller, night shift, immediate joining. 2 vacancies.", workMode: "On-site · night shift", salaryRange: "₹18,000",
    requirements: ["Female candidates only", "Immediate joining", "Night shift"],
    howToApply: "Send your resume on WhatsApp to 9995750054.",
    description: "Credise Business Solutions Telecaller (female only) · Kalamassery · ₹18K · night shift · 2 vacancies.",
  }),
  job({
    id: "swas-academy-kozhikode-trainee-faculty-spoken-english-nov18",
    company: "SWAS Academy", companyBlurb: "SWAS Academy · Trainee Faculty – Spoken English · Puthiyara, Kozhikode",
    location: "Puthiyara, Kozhikode", roles: ["Trainee Faculty – Spoken English"], experience: "",
    applyLink: mail("swaswizard@gmail.com", "Trainee Faculty - Spoken English"), tags: ["Teaching", "Education", "Non IT"],
    email: "swaswizard@gmail.com", phone: "9400581231 (WhatsApp)", address: "SWAS Academy, Puthiyara, Kozhikode", industry: "Education / Training",
    workDetails: "Trainee faculty for spoken English at SWAS Academy, Kozhikode.",
    howToApply: "Send your CV to swaswizard@gmail.com or WhatsApp 9400 58 1231.",
    description: "SWAS Academy Trainee Faculty – Spoken English · Puthiyara, Kozhikode.",
  }),
  job({
    id: "corpxcloud-mern-developer-nov18",
    company: "CorpXCloud Technologies Private Limited", companyBlurb: "CorpXCloud · MERN Developer · React.js, Next.js & MongoDB",
    location: "", roles: ["MERN Developer (React.js, Next.js & MongoDB)"], experience: "",
    applyLink: mail("hr@corpxcloud.com", "MERN Developer"), tags: ["IT", "React", "Next.js", "MongoDB", "MERN"],
    email: "hr@corpxcloud.com", industry: "IT",
    workDetails: "MERN developer working with React.js, Next.js and MongoDB.", skills: ["React.js", "Next.js", "MongoDB"],
    requirements: ["Strong knowledge of React.js and Next.js", "Experience with MongoDB", "Good problem-solving skills and attention to detail", "Passion for building modern web applications"],
    howToApply: "Send your resume to hr@corpxcloud.com.",
    hiringNotes: "Added 18 Nov 2026 from the employer's hiring poster. The poster does not state the location or experience. Verify with the employer before applying.",
    description: "CorpXCloud MERN Developer · React.js, Next.js, MongoDB.",
  }),
  job({
    id: "interval-areekode-senior-performance-marketer-nov18",
    company: "Interval (Personalised Learning Platform)", companyBlurb: "Interval · Senior Performance Marketer · Areekode, Malappuram · 2–4 years · EdTech experience desirable",
    location: "Areekode, Malappuram", roles: ["Senior Performance Marketer"], experience: "experienced", experienceRange: "2–4 years",
    applyLink: "tel:+917034000342", tags: ["Marketing", "Performance Marketing", "EdTech", "Non IT"],
    phone: "+91 70340 00342", website: "https://www.intervaledu.com", address: "Areekode, Malappuram", industry: "EdTech",
    workDetails: "Senior Performance Marketer at Interval, Areekode.", experienceYears: "2–4 years",
    requirements: ["2–4 years of experience", "EdTech experience is desirable"],
    howToApply: "Contact +91 70340 00342. Website: www.intervaledu.com.",
    description: "Interval Senior Performance Marketer · Areekode, Malappuram · 2–4 years · EdTech experience desirable.",
  }),
  job({
    id: "hdfc-life-calicut-business-development-manager-nov18",
    company: "HDFC Life", companyBlurb: "HDFC Life · Business Development Manager · Calicut · Plus Two pass · age 23–49 · freshers welcome · ₹28,000 after 3 months' training",
    location: "Calicut, Kerala", roles: ["Business Development Manager"], experience: "both", experienceRange: "Freshers welcome",
    applyLink: mail("athulyac6@gmail.com", "Business Development Manager - Calicut"), tags: ["Sales", "Insurance", "Freshers", "Non IT"],
    email: "athulyac6@gmail.com", phone: "8136892825", address: "Calicut, Kerala", industry: "Insurance",
    workDetails: "Business Development Manager, Calicut. Per the poster, the role carries a ₹28,000 salary after 3 months of training.",
    salaryRange: "₹28,000 (after 3 months' training)", qualification: "Plus Two pass (degree-fail candidates can apply)",
    requirements: ["Age 23–49 years", "Plus Two pass", "Degree-fail candidates can apply", "Freshers welcome"],
    howToApply: "Send your resume to athulyac6@gmail.com or call 8136892825.",
    hiringNotes: "Added 18 Nov 2026 from a hiring poster. The contact is a personal Gmail address, not an HDFC Life domain — confirm the role is with HDFC Life before applying, and never pay any fee.",
    description: "HDFC Life Business Development Manager · Calicut · Plus Two · age 23–49 · freshers welcome · ₹28,000 after training.",
  }),
  job({
    id: "i2k2-networks-aws-devops-engineer-fresher-nov18",
    company: "i2k2 Networks Pvt. Ltd.", companyBlurb: "i2k2 Networks · AWS DevOps Engineer (fresher, 0–1 year) · 5 days a week",
    location: "", roles: ["AWS DevOps Engineer (Fresher)"], experience: "fresher", experienceRange: "0–1 year",
    applyLink: mail("priyanshu.verma@i2k2.com", "AWS DevOps Engineer (Fresher)"), tags: ["IT", "AWS", "DevOps", "Freshers"],
    email: "priyanshu.verma@i2k2.com", website: "https://www.i2k2.com", industry: "Cloud / Hosting",
    workDetails: "AWS DevOps Engineer for freshers. 5 working days a week.", experienceYears: "0–1 year",
    skills: ["AWS (EC2, S3, IAM, VPC, CloudWatch)", "Linux", "Windows", "Docker", "Kubernetes", "Grafana"],
    requirements: ["Good knowledge of AWS DevOps and AWS cloud services", "Understanding of AWS services such as EC2, S3, IAM and VPC", "Knowledge of Linux and Windows operating systems", "Basic understanding of Grafana and Amazon CloudWatch", "Familiarity with web hosting and server management", "Basic knowledge of Docker and Kubernetes", "Understanding of cloud and DevOps fundamentals", "Excellent verbal and written communication skills", "Strong problem-solving abilities and willingness to learn"],
    howToApply: "Send your updated CV to priyanshu.verma@i2k2.com.",
    hiringNotes: "Added 18 Nov 2026 from the employer's hiring poster. The poster does not state the location. Verify with the employer before applying.",
    description: "i2k2 Networks AWS DevOps Engineer · freshers 0–1 year · AWS, Linux, Docker, Kubernetes.",
  }),
  job({
    id: "clarigo-infotech-social-media-executive-nov18",
    company: "Clarigo Infotech", companyBlurb: "Clarigo · Social Media Executive · 1–2 years",
    location: "", roles: ["Social Media Executive"], experience: "experienced", experienceRange: "1–2 years",
    applyLink: mail("ayushi@clarigoinfotech.com", "Social Media Executive"), tags: ["Marketing", "Social Media", "Non IT"],
    email: "ayushi@clarigoinfotech.com", website: "https://www.clarigoinfotech.com", industry: "Digital Marketing",
    workDetails: "Social Media Executive at Clarigo.", experienceYears: "1–2 years",
    responsibilities: ["Manage and grow social media channels", "Create, schedule and publish engaging content", "Work on brand awareness and engagement", "Track performance and generate reports", "Stay updated with social media trends"],
    howToApply: "Email ayushi@clarigoinfotech.com.",
    hiringNotes: "Added 18 Nov 2026 from the employer's hiring poster. The poster does not state the location. Verify with the employer before applying.",
    description: "Clarigo Social Media Executive · 1–2 years.",
  }),
  job({
    id: "ioss-cyberpark-calicut-seo-intern-nov18",
    company: "Infinite Open Source Solutions LLP", companyBlurb: "IOSS · SEO Intern · Govt. Cyberpark, Calicut · freshers can apply",
    location: "Govt. Cyberpark, Calicut", roles: ["SEO Intern"], experience: "fresher", experienceRange: "Freshers can apply",
    applyLink: mail("hr@ioss.in", "SEO Intern"), employmentType: "Internship", tags: ["SEO", "Digital Marketing", "Internship", "Freshers"],
    email: "hr@ioss.in", address: "Govt. Cyberpark, Calicut", industry: "IT",
    workDetails: "SEO intern at IOSS, Cyberpark Calicut.", skills: ["SEO", "Keyword research", "Graphic design", "Content writing"],
    requirements: ["Freshers can apply", "Digital marketing certification", "Basic knowledge of SEO & keyword research", "Basic graphic designing skills", "Good communication and content-writing skills"],
    howToApply: "Send your CV to hr@ioss.in.",
    description: "IOSS SEO Intern · Cyberpark Calicut · freshers · digital marketing certification.",
  }),
  job({
    id: "cliniqon-kochi-dotnet-developer-nov18",
    company: "Cliniqon", companyBlurb: "Cliniqon · .NET Developer · Kochi · 3–5 years · .NET Core, React, SQL Server, Azure",
    location: "Kochi, Kerala", roles: [".NET Developer"], experience: "experienced", experienceRange: "3–5 years",
    applyLink: mail("incareers@cliniqon.com", ".NET Developer"), tags: ["IT", ".NET", "React", "Azure"],
    email: "incareers@cliniqon.com", address: "Kochi, Kerala", industry: "Healthcare IT",
    workDetails: ".NET Developer in Cliniqon's technology team, Kochi.", experienceYears: "3–5 years",
    skills: [".NET Core", "React", "SQL Server", "Azure", "Azure DevOps", "Git", "Postman", "Testing & debugging"],
    requirements: ["3–5 years of hands-on experience in .NET development", "Strong problem-solving and analytical skills", "Good communication and teamwork skills"],
    howToApply: "Share your CV to incareers@cliniqon.com.",
    description: "Cliniqon .NET Developer · Kochi · 3–5 years · .NET Core, React, SQL Server, Azure.",
  }),
  job({
    id: "electrifex-kochi-junior-ui-ux-designer-nov18",
    company: "Electrifex", companyBlurb: "Electrifex · Junior UI/UX Designer · Kochi · fresher – 1 year · full time",
    location: "Kochi, Kerala", roles: ["Junior UI/UX Designer"], experience: "both", experienceRange: "Fresher – 1 year",
    applyLink: mail("career@electrifex.com", "Junior UI/UX Designer"), employmentType: "Full-time", tags: ["UI/UX", "Design", "Figma", "Freshers"],
    email: "career@electrifex.com", address: "Kochi, Kerala", industry: "IT",
    workDetails: "Full-time Junior UI/UX Designer, Kochi.", experienceYears: "Fresher – 1 year", skills: ["UI/UX design", "Figma", "Typography", "User flows"],
    requirements: ["Strong basics in UI/UX design", "Good understanding of layout, spacing and typography", "Able to think in user flows, not just screens", "Comfortable designing in Figma", "Curious about how products and complex systems work"],
    howToApply: "Send your CV and portfolio to career@electrifex.com.",
    description: "Electrifex Junior UI/UX Designer · Kochi · fresher–1 year · Figma.",
  }),
  job({
    id: "adam-finastra-flutter-developer-nov18",
    company: "Adam Finastra", companyBlurb: "Adam Finastra · Flutter Developer · 2 years of experience",
    location: "", roles: ["Flutter Developer"], experience: "experienced", experienceRange: "2 years",
    applyLink: mail("hr@adamfinastra.tech", "Flutter Developer"), tags: ["IT", "Flutter", "Mobile"],
    email: "hr@adamfinastra.tech", website: "https://www.adamfinastra.tech", industry: "IT",
    workDetails: "Flutter Developer at Adam Finastra.", experienceYears: "2 years", skills: ["Flutter"],
    requirements: ["2 years of experience"],
    howToApply: "Email hr@adamfinastra.tech.",
    hiringNotes: "Added 18 Nov 2026 from the employer's hiring poster. The poster does not state the location. Verify with the employer before applying.",
    description: "Adam Finastra Flutter Developer · 2 years.",
  }),
  job({
    id: "genrobotics-kerala-operations-executive-intern-nov18",
    company: "Genrobotics", companyBlurb: "Genrobotics · Operations Executive Intern (O&M) · Kerala · 3-month paid internship · freshers, any degree · fluent Hindi mandatory",
    location: "Kerala", roles: ["Operations Executive Intern – Operations & Maintenance"], experience: "fresher", experienceRange: "Freshers",
    applyLink: "https://www.genrobotics.com", employmentType: "Internship", tags: ["Operations", "Internship", "Freshers", "Non IT"],
    phone: "9778691972", website: "https://www.genrobotics.com", address: "Kerala", industry: "Robotics",
    workDetails: "3-month paid internship in the Operations & Maintenance (O&M) department.", qualification: "Any degree",
    requirements: ["Fluent Hindi (mandatory)", "Strong communication & coordination", "Good at documentation & follow-up", "Proactive, team-oriented mindset"],
    responsibilities: ["Coordinate with site engineers & operators", "Track daily attendance & site reports", "Handle client calls & emails", "Prepare monthly reports & tender records"],
    benefits: ["Paid internship (3 months)"],
    howToApply: "Scan the QR code on the poster to apply, or call 97786 91972 for details. Website: www.genrobotics.com.",
    description: "Genrobotics Operations Executive Intern · O&M · Kerala · 3-month paid · any degree · fluent Hindi mandatory.",
  }),
  job({
    id: "ganit-chennai-freshers-data-de-ai-bi-nov18",
    company: "Ganit", companyBlurb: "Ganit · Freshers – Data (DE / AI / BI) · Chennai · full-time · B.E/B.Tech 2025/2026 pass-outs · 60%+ · Python, SQL, PySpark",
    location: "Chennai, Tamil Nadu", roles: ["Fresher – Data (DE / AI / BI)"], experience: "fresher", experienceRange: "Freshers · 2025/2026 pass-outs",
    applyLink: "", employmentType: "Full-time", tags: ["IT", "Data Engineering", "Python", "SQL", "PySpark", "Freshers"],
    address: "Chennai, Tamil Nadu", industry: "Data & Analytics",
    workDetails: "Full-time fresher role in cloud and analytics, with career growth in data engineering, AI and BI.", experienceYears: "Freshers",
    qualification: "B.E / B.Tech, 2025 or 2026 pass-outs", skills: ["Python", "SQL", "PySpark"],
    requirements: ["B.E/B.Tech graduates (2025/2026 pass-outs only) ready to join immediately as a fresher", "Minimum 60% or equivalent CGPA throughout academics", "Strong coding skills in Python, SQL and PySpark"],
    howToApply: "The poster gives no email or link. Apply through Ganit's official careers channel.",
    hiringNotes: "Added 18 Nov 2026 from the employer's hiring poster. The poster gives no apply email or link. Verify with the employer before applying.",
    description: "Ganit freshers · Data (DE/AI/BI) · Chennai · full-time · B.E/B.Tech 2025/2026 · 60%+ · Python, SQL, PySpark.",
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
