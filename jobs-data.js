/**
 * InfoparkDaily — Job Openings data
 * ==================================
 * HOW TO UPDATE (weekly):
 * 1. Copy the TEMPLATE object below.
 * 2. Paste it at the TOP of the JOBS array (newest first).
 * 3. Fill in the fields. Save. Done — no other files to touch.
 *
 * REQUIRED
 * --------
 * id              string   Unique slug used in URL: job.html?id=aceware
 * company         string   Company name
 * logo            string   Path to logo, e.g. "assets/logos/2base.svg"
 * location        string   Short location, e.g. "Kakkanad, Infopark"
 * roles           string[] Open role titles
 * experience      string   "fresher" | "experienced" | "both"  (alias: experienceLevel)
 * postedDate      string   ISO date "YYYY-MM-DD" — drives New badge + newest sort
 * applyLink       string   URL or mailto: for Apply CTA
 *
 * FILTER / BADGE FIELDS
 * ---------------------
 * employmentType  string   "Full-time" | "Internship" | "Apprenticeship" | "Contract"
 * experienceRange string   e.g. "0–2 Years" (shown on cards / detail)
 * applyDeadline   string   ISO "YYYY-MM-DD" or "Rolling"
 * tags            string[] e.g. ["IT", "Marketing", "Design", "Sales", "Business"]
 * verified        boolean  Shows "Verified by InfoparkDaily" badge
 * isWalkIn        boolean  Walk-in drive filter + badge
 * walkInDate      string   Human date text when isWalkIn is true
 * source          string   "WhatsApp" | "Instagram" | "Direct" | "Infopark"
 *
 * COMPANY + HIRING DETAILS (shown on full job page)
 * -------------------------------------------------
 * companyBlurb / description  string   One-line card blurb
 * email, phone, website, address, industry
 * companyDetails, workDetails, workStatus, workMode
 * requirements[], responsibilities[], benefits[]
 * howToApply, hiringNotes, startingDate
 *
 * TEMPLATE:
 * {
 *   id: "company-slug",
 *   company: "Company Name",
 *   logo: "assets/logos/company.svg",
 *   companyBlurb: "One-line company blurb.",
 *   location: "Kakkanad, Infopark",
 *   roles: ["Role Title 1", "Role Title 2"],
 *   experience: "fresher",
 *   experienceRange: "0–2 Years",
 *   employmentType: "Full-time",
 *   applyLink: "mailto:careers@company.com",
 *   applyDeadline: "Rolling",
 *   postedDate: "2026-07-16",
 *   source: "WhatsApp",
 *   verified: true,
 *   tags: ["IT"],
 *   isWalkIn: false,
 *   walkInDate: "",
 *   email: "careers@company.com",
 *   phone: "",
 *   website: "https://www.company.com",
 *   address: "Building, Infopark, Kakkanad, Kochi, Kerala",
 *   industry: "IT Services",
 *   companyDetails: "About the company…",
 *   workDetails: "Hiring overview…",
 *   workStatus: "Full-time",
 *   workMode: "On-site",
 *   experienceYears: "0–2 years",
 *   requirements: ["Requirement 1"],
 *   responsibilities: ["Responsibility 1"],
 *   benefits: ["Benefit 1"],
 *   howToApply: "Email resume…",
 *   hiringNotes: "Optional note.",
 *   description: "Short card blurb.",
 *   startingDate: "2026-07-13"
 * },
 */

var JOBS = [
  {
    id: "woxro-hr-trainee",
    company: "Woxro Technologies",
    logo: "assets/logos/woxro.svg",
    companyBlurb: "HR Trainee opening for freshers at Infopark Kochi — 0–1 year experience.",
    location: "Infopark Kochi, Kakkanad",
    roles: ["HR Trainee"],
    experience: "fresher",
    experienceRange: "Fresher / 0–1 Year",
    employmentType: "Full-time",
    applyLink: "https://woxro.com/careers",
    applyDeadline: "Rolling",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: ["HR", "Business"],
    isWalkIn: false,
    walkInDate: "",
    email: "jobs@woxro.com",
    phone: "",
    website: "https://woxro.com/",
    address: "Infopark Kochi, Kakkanad, Kochi, Kerala",
    industry: "IT Services / Software Product",
    companyDetails:
      "Woxro Technologies is hiring an HR Trainee at Infopark Kochi for freshers and early-career candidates (0–1 year). Part of the July 2026 Infopark fresher hiring wave covering HR and IT roles across campus companies.",
    workDetails:
      "Entry-level HR role supporting recruitment, onboarding, and people operations. Immediate joiners preferred. Open until filled.",
    workStatus: "Full-time · Open until filled",
    workMode: "On-site",
    experienceYears: "Fresher / 0–1 year",
    requirements: [
      "MBA (HR) / BBA preferred for HR track",
      "BE / B.Tech, BCA / MCA, B.Sc (CS / IT) also accepted as per company requirements",
      "2025 & 2026 pass-outs welcome",
      "Fresher or up to 1 year experience",
      "Good communication and people skills",
      "Willingness to work on-site at Infopark Kochi, Kakkanad"
    ],
    responsibilities: [
      "Support day-to-day HR and recruitment operations",
      "Assist with candidate coordination and onboarding",
      "Maintain HR records and process documentation",
      "Collaborate with hiring managers on fresher / junior hiring"
    ],
    benefits: [
      "Infopark Kochi campus role",
      "Fresher-friendly HR career start",
      "Official careers portal + Infopark Jobs listing",
      "Immediate joiner preference"
    ],
    howToApply:
      "Apply via the official Woxro careers page (https://woxro.com/careers) or email your resume (PDF) to jobs@woxro.com. You can also check the Infopark Jobs listing: https://infopark.in/jobs/woxro. Keep LinkedIn updated and tailor your resume for HR / recruitment.",
    hiringNotes:
      "Part of InfoparkDaily fresher digest — Updated 21 July 2026. Always verify details on the official Woxro careers page before applying. Tip: PDF resume with projects, internships, and LinkedIn link.",
    description: "HR Trainee · Fresher / 0–1 Yr · Infopark Kochi",
    startingDate: "Immediate joiners preferred"
  },
  {
    id: "newagesys-graduate-trainee",
    company: "NewAgeSys Solutions",
    logo: "assets/logos/newagesys.svg",
    companyBlurb: "Graduate Trainee / Junior Developer roles for freshers at Infopark Kochi.",
    location: "Infopark Kochi, Kakkanad",
    roles: ["Graduate Trainee", "Junior Developer"],
    experience: "fresher",
    experienceRange: "Fresher / 0–1 Year",
    employmentType: "Full-time",
    applyLink: "https://www.newagesys.com",
    applyDeadline: "Rolling",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Development"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://www.newagesys.com",
    address: "Infopark Kochi, Kakkanad, Kochi, Kerala",
    industry: "IT Services / Software Development",
    companyDetails:
      "NewAgeSys Solutions is hiring Graduate Trainees and Junior Developers at Infopark Kochi. Ideal for 2025 & 2026 pass-outs looking for an entry-level software development start.",
    workDetails:
      "Fresher / 0–1 year software trainee track. Apply through the official company careers page. Immediate joiners preferred. Open until filled.",
    workStatus: "Full-time · Open until filled",
    workMode: "On-site",
    experienceYears: "Fresher / 0–1 year",
    requirements: [
      "BE / B.Tech (All Streams)",
      "BCA / MCA or B.Sc (CS / IT)",
      "2025 & 2026 pass-outs preferred",
      "Fresher or up to 1 year experience",
      "Basic programming / problem-solving aptitude",
      "Willingness to work from Infopark Kochi, Kakkanad"
    ],
    responsibilities: [
      "Learn and contribute to software development projects",
      "Write, test, and maintain application code under guidance",
      "Collaborate with seniors on feature delivery",
      "Follow coding standards, reviews, and documentation practices"
    ],
    benefits: [
      "Infopark Kochi campus opportunity",
      "Graduate trainee / junior developer career path",
      "Official company careers portal apply flow",
      "Immediate joiner preference"
    ],
    howToApply:
      "Apply through the official NewAgeSys careers / company website: https://www.newagesys.com. Prepare a PDF resume with projects, internships, and GitHub / LinkedIn if available. Prefer official careers page over unofficial job boards.",
    hiringNotes:
      "Part of InfoparkDaily fresher digest — Updated 21 July 2026. Confirm role, batch eligibility, and apply steps on the official NewAgeSys site before sending your resume.",
    description: "Graduate Trainee / Junior Developer · Fresher · Infopark Kochi",
    startingDate: "Immediate joiners preferred"
  },
  {
    id: "hashroot-devops-fresher",
    company: "HashRoot",
    logo: "assets/logos/hashroot.svg",
    companyBlurb: "Cloud / DevOps fresher opportunities at Infopark Kochi — 0–1 year.",
    location: "Infopark Kochi, Kakkanad",
    roles: ["Cloud / DevOps Fresher", "Junior Cloud Engineer (Fresher track)"],
    experience: "fresher",
    experienceRange: "Fresher / 0–1 Year",
    employmentType: "Full-time",
    applyLink: "https://hashroot.com/careers",
    applyDeadline: "Rolling",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "DevOps", "Cloud"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://hashroot.com",
    address: "Infopark Kochi, Kakkanad, Kochi, Kerala",
    industry: "Cloud / DevOps / Managed Services",
    companyDetails:
      "HashRoot is hiring freshers for Cloud / DevOps opportunities at Infopark Kochi. Strong fit for graduates interested in Linux, cloud platforms, automation, and infrastructure careers.",
    workDetails:
      "Fresher Cloud / DevOps track. Apply via the HashRoot careers portal. Immediate joiners preferred. Open until filled.",
    workStatus: "Full-time · Open until filled",
    workMode: "On-site",
    experienceYears: "Fresher / 0–1 year",
    requirements: [
      "BE / B.Tech (All Streams), BCA / MCA, or B.Sc (CS / IT)",
      "2025 & 2026 pass-outs welcome",
      "Fresher or up to 1 year experience",
      "Interest in Linux, cloud (AWS / Azure / GCP), CI/CD, or scripting",
      "Willingness to learn DevOps tooling and on-call practices",
      "On-site at Infopark Kochi, Kakkanad"
    ],
    responsibilities: [
      "Support cloud infrastructure and DevOps workflows",
      "Assist with monitoring, deployments, and automation tasks",
      "Learn Linux administration and CI/CD pipelines",
      "Collaborate with senior engineers on production operations"
    ],
    benefits: [
      "Infopark Kochi Cloud / DevOps career start",
      "Hands-on exposure to modern infrastructure stack",
      "Official HashRoot careers portal",
      "Immediate joiner preference"
    ],
    howToApply:
      "Apply via the official HashRoot careers portal: https://hashroot.com/careers. Company site: https://hashroot.com. Use a PDF resume highlighting any cloud labs, Linux projects, certifications, or GitHub work.",
    hiringNotes:
      "Part of InfoparkDaily fresher digest — Updated 21 July 2026. Always apply through hashroot.com/careers and verify role details there before submitting.",
    description: "Cloud / DevOps Fresher · 0–1 Yr · Infopark Kochi",
    startingDate: "Immediate joiners preferred"
  },
  {
    id: "nestsoft-software-trainee",
    company: "Nestsoft",
    logo: "assets/logos/nestsoft.svg",
    companyBlurb: "Software Trainee / Junior Developer openings for freshers at Infopark Kochi.",
    location: "Infopark Kochi, Kakkanad",
    roles: ["Software Trainee", "Junior Developer"],
    experience: "fresher",
    experienceRange: "Fresher / 0–1 Year",
    employmentType: "Full-time",
    applyLink: "https://www.nestsoft.com/careers",
    applyDeadline: "Rolling",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Development"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://www.nestsoft.com",
    address: "Infopark Kochi, Kakkanad, Kochi, Kerala",
    industry: "Software Product / IT Services",
    companyDetails:
      "Nestsoft is hiring Software Trainees and Junior Developers at Infopark Kochi for fresher and early-career candidates (0–1 year).",
    workDetails:
      "Entry-level software development roles. Apply through the Nestsoft careers page. Immediate joiners preferred. Open until filled.",
    workStatus: "Full-time · Open until filled",
    workMode: "On-site",
    experienceYears: "Fresher / 0–1 year",
    requirements: [
      "BE / B.Tech (All Streams)",
      "BCA / MCA or B.Sc (CS / IT)",
      "2025 & 2026 pass-outs preferred",
      "Fresher or up to 1 year experience",
      "Basic programming fundamentals and willingness to learn",
      "Work from Infopark Kochi, Kakkanad"
    ],
    responsibilities: [
      "Train on Nestsoft product / project stack",
      "Contribute to feature development under mentorship",
      "Fix bugs, write tests, and document changes",
      "Participate in team standups and code reviews"
    ],
    benefits: [
      "Infopark Kochi software career start",
      "Trainee-to-junior developer growth path",
      "Official Nestsoft careers apply link",
      "Immediate joiner preference"
    ],
    howToApply:
      "Apply through Nestsoft careers: https://www.nestsoft.com/careers (company site: https://www.nestsoft.com). Submit a PDF resume tailored to software / junior developer roles with projects and GitHub if available.",
    hiringNotes:
      "Part of InfoparkDaily fresher digest — Updated 21 July 2026. Prefer the official Nestsoft careers page for applications.",
    description: "Software Trainee / Junior Developer · Fresher · Infopark Kochi",
    startingDate: "Immediate joiners preferred"
  },
  {
    id: "infintor-junior-developer",
    company: "Infintor Solutions",
    logo: "assets/logos/infintor.svg",
    companyBlurb: "Junior Software Developer role for freshers at Infopark Kochi — 0–1 year.",
    location: "Infopark Kochi, Kakkanad",
    roles: ["Junior Software Developer"],
    experience: "fresher",
    experienceRange: "Fresher / 0–1 Year",
    employmentType: "Full-time",
    applyLink: "https://people.infintor.com/jobs",
    applyDeadline: "Rolling",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Development"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://www.infintor.com",
    address: "Infopark Kochi, Kakkanad, Kochi, Kerala",
    industry: "IT Services / Software Solutions",
    companyDetails:
      "Infintor Solutions is hiring Junior Software Developers at Infopark Kochi. Apply through the official Infintor careers / people portal for verified openings.",
    workDetails:
      "Junior software developer track for freshers and 0–1 year candidates. Immediate joiners preferred. Open until filled.",
    workStatus: "Full-time · Open until filled",
    workMode: "On-site",
    experienceYears: "Fresher / 0–1 year",
    requirements: [
      "BE / B.Tech (All Streams), BCA / MCA, or B.Sc (CS / IT)",
      "2025 & 2026 pass-outs welcome",
      "Fresher or up to 1 year experience",
      "Strong interest in software engineering and continuous learning",
      "Good communication and teamwork",
      "On-site at Infopark Kochi, Kakkanad"
    ],
    responsibilities: [
      "Develop and maintain software features",
      "Collaborate with product and engineering teams",
      "Debug issues and improve application quality",
      "Follow Infintor coding and delivery practices"
    ],
    benefits: [
      "Infopark Kochi junior developer role",
      "Official Infintor careers / people portal",
      "Career growth in software solutions",
      "Immediate joiner preference"
    ],
    howToApply:
      "Apply through the official Infintor careers portal: https://www.infintor.com/career/ or jobs board: https://people.infintor.com/jobs. Use a PDF resume with projects, internships, and GitHub / LinkedIn links.",
    hiringNotes:
      "Part of InfoparkDaily fresher digest — Updated 21 July 2026. Always use Infintor’s official careers / people portal — avoid unofficial apply links.",
    description: "Junior Software Developer · Fresher / 0–1 Yr · Infopark Kochi",
    startingDate: "Immediate joiners preferred"
  },
  {
    id: "worksent-entry-level",
    company: "WorkSent Technologies",
    logo: "assets/logos/worksent.svg",
    companyBlurb: "Entry-level IT roles for freshers at Infopark Kochi — 0–1 year experience.",
    location: "Infopark Kochi, Kakkanad",
    roles: ["Entry-Level IT Roles", "Junior IT Associate (Fresher track)"],
    experience: "fresher",
    experienceRange: "Fresher / 0–1 Year",
    employmentType: "Full-time",
    applyLink: "https://worksent.com",
    applyDeadline: "Rolling",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Business"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://worksent.com",
    address: "Infopark Kochi, Kakkanad, Kochi, Kerala",
    industry: "IT Services / Technology Consulting",
    companyDetails:
      "WorkSent Technologies is hiring for entry-level IT roles at Infopark Kochi. Suitable for freshers and early-career candidates looking to start in IT services.",
    workDetails:
      "Entry-level IT openings. Apply via company careers page or LinkedIn. Immediate joiners preferred. Open until filled.",
    workStatus: "Full-time · Open until filled",
    workMode: "On-site",
    experienceYears: "Fresher / 0–1 year",
    requirements: [
      "BE / B.Tech (All Streams), BCA / MCA, or B.Sc (CS / IT)",
      "MBA (HR) / BBA also relevant for certain entry tracks as per company need",
      "2025 & 2026 pass-outs welcome",
      "Fresher or up to 1 year experience",
      "Willingness to learn and work on-site at Infopark Kochi"
    ],
    responsibilities: [
      "Support entry-level IT delivery and operations tasks",
      "Learn company tools, processes, and client workflows",
      "Assist seniors on projects and tickets",
      "Maintain documentation and communication standards"
    ],
    benefits: [
      "Infopark Kochi entry-level IT start",
      "Company careers / LinkedIn apply options",
      "Exposure to IT services environment",
      "Immediate joiner preference"
    ],
    howToApply:
      "Apply via the WorkSent company website / careers: https://worksent.com, or through the company’s LinkedIn careers posts. Keep a PDF resume ready with projects, internships, and LinkedIn profile link.",
    hiringNotes:
      "Part of InfoparkDaily fresher digest — Updated 21 July 2026. Prefer official WorkSent careers or LinkedIn company posts. You may also browse Infopark Jobs Portal: https://infopark.in/careers for related campus listings.",
    description: "Entry-Level IT Roles · Fresher / 0–1 Yr · Infopark Kochi",
    startingDate: "Immediate joiners preferred"
  },
  {
    id: "vdart",
    company: "VDart",
    logo: "assets/logos/vdart.svg",
    companyBlurb: "Hiring drive at Infopark Kochi for freshers — multiple IT & support roles.",
    location: "Infopark, Kochi",
    roles: [
      "Business Analyst",
      "Process Associate",
      "Customer Support",
      "QA Tester",
      "Technical Support"
    ],
    experience: "fresher",
    experienceRange: "Freshers 2025 / 2026",
    employmentType: "Full-time",
    applyLink: "https://vdartinc.com/",
    applyDeadline: "Rolling",
    postedDate: "2026-07-16",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Business", "Sales"],
    isWalkIn: true,
    walkInDate: "Hiring Drive — Infopark Kochi",
    email: "",
    phone: "",
    website: "https://vdartinc.com/",
    address: "Infopark, Kochi, Kerala",
    industry: "IT Services / Staffing",
    companyDetails:
      "VDart is running a hiring drive at Infopark Kochi for freshers (2025 / 2026 batches) across business analysis, process, customer support, QA, and technical support tracks.",
    workDetails:
      "Multiple fresher-friendly openings. Apply through the VDart careers site. Walk-in / drive format at Infopark Kochi.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Freshers (2025 / 2026)",
    requirements: [
      "Fresher — 2025 or 2026 batch preferred",
      "Good communication skills",
      "Willingness to work from Infopark Kochi"
    ],
    responsibilities: [
      "Role-dependent across BA, process, support, QA, and technical support tracks",
      "Collaborate with team leads and stakeholders",
      "Deliver day-to-day operational or technical outcomes"
    ],
    benefits: ["Infopark Kochi opportunity", "Multiple role tracks for freshers"],
    howToApply: "Apply online at https://vdartinc.com/ — select the relevant fresher role for the Infopark Kochi hiring drive.",
    hiringNotes: "Shared via InfoparkDaily Jobs. Verify schedule and apply steps on the VDart site before attending.",
    description: "Fresher hiring drive — BA, Process, Support, QA & Technical Support."
  },
  {
    id: "sutherland",
    company: "Sutherland",
    logo: "assets/logos/sutherland.svg",
    companyBlurb: "Virtual Kochi hiring drive for Customer Support Associates — July 17 & 18.",
    location: "Kochi (Virtual Drive)",
    roles: ["Customer Support Associate"],
    experience: "fresher",
    experienceRange: "10+2 / Freshers welcome",
    employmentType: "Full-time",
    applyLink: "https://www.instagram.com/infoparkdaily.jobs/",
    applyDeadline: "2026-07-18",
    postedDate: "2026-07-16",
    source: "WhatsApp",
    verified: true,
    tags: ["Business", "Sales"],
    isWalkIn: true,
    walkInDate: "17 & 18 July 2026 · 11:30 AM – 4:00 PM",
    email: "",
    phone: "",
    website: "",
    address: "Kochi, Kerala (Virtual hiring drive)",
    industry: "BPO / Customer Support",
    companyDetails:
      "Sutherland is hosting a virtual Kochi hiring drive for Customer Support Associates. Competitive pay, travel allowance, insurance, and a 5-day work week are highlighted in the campaign.",
    workDetails:
      "Virtual hiring drive on 17 & 18 July 2026, 11:30 AM – 4:00 PM. Scan the QR code from the InfoparkDaily Jobs post to join / register.",
    workStatus: "Full-time",
    workMode: "On-site / Hybrid (confirm with recruiter)",
    experienceYears: "Freshers / 10+2 eligible",
    requirements: [
      "10+2 pass certificate",
      "Good spoken and written English"
    ],
    responsibilities: [
      "Handle customer support interactions",
      "Meet quality and productivity standards",
      "Collaborate with team leads on daily targets"
    ],
    benefits: [
      "Competitive pay plus benefits",
      "Travel allowance",
      "Insurance coverage",
      "5-day work week"
    ],
    howToApply:
      "Scan the QR code shared on InfoparkDaily Jobs Instagram / WhatsApp channel posts for the Sutherland Virtual Kochi Hiring Drive, or follow apply instructions in that post.",
    hiringNotes: "Virtual drive — confirm joining link and documents before the session. Verify all details with Sutherland.",
    description: "Virtual Kochi drive · Customer Support · Jul 17–18."
  },
  {
    id: "cloud-nautical",
    company: "Cloud Nautical",
    logo: "assets/logos/cloud-nautical.svg",
    companyBlurb: "Business Analyst (immediate joiner) at Technopark, Trivandrum.",
    location: "Technopark, Trivandrum",
    roles: ["Business Analyst (Immediate Joiner)"],
    experience: "experienced",
    experienceRange: "3+ Years",
    employmentType: "Full-time",
    applyLink: "mailto:careers@cloudnautical.com",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-15",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Business"],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@cloudnautical.com",
    phone: "",
    website: "",
    address: "Technopark, Trivandrum, Kerala",
    industry: "IT / Product Services",
    companyDetails:
      "Cloud Nautical is hiring a Business Analyst (immediate joiner preferred) for its Technopark, Trivandrum team.",
    workDetails:
      "Experienced BA role covering end-to-end project lifecycle, requirements ownership, stakeholder coordination, UAT, and wireframes / prototypes.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "3+ years",
    requirements: [
      "3+ years experience as a Business Analyst",
      "CCBA / CBAP or related certification is an added advantage",
      "Proficient in MS Office, JIRA, Visio, Balsamiq (or similar)",
      "Good understanding of Agile Scrum practices",
      "Strong written, verbal & interpersonal communication",
      "B.Tech in Mechanical Engineering is an added advantage"
    ],
    responsibilities: [
      "Lead and manage end-to-end project lifecycle",
      "Act as requirements owner and coordinate with all stakeholders",
      "Analyze business processes and identify areas for improvement",
      "Work closely with the technical team and produce key deliverables",
      "Review test cases, coordinate UAT & ensure successful delivery",
      "Create wireframes, mock-ups & prototypes",
      "Gather & document requirements and translate into technical specifications"
    ],
    benefits: ["Technopark Trivandrum role", "Immediate joiner preferred"],
    howToApply: "Send your resume to careers@cloudnautical.com. Mention “Business Analyst – Immediate Joiner” in the subject line.",
    hiringNotes: "Job published 15 July 2026. Closing date 31 July 2026. Immediate joiners preferred.",
    description: "BA · 3+ years · Immediate joiners · Apply by 31 Jul."
  },
  {
    id: "2base-bdm",
    company: "2Base Technologies",
    logo: "assets/logos/2base.svg",
    companyBlurb: "Business Development Manager for Technopark, Trivandrum — 5–10 years B2B sales.",
    location: "Technopark, Trivandrum",
    roles: ["Business Development Manager"],
    experience: "experienced",
    experienceRange: "5–10 Years",
    employmentType: "Full-time",
    applyLink: "mailto:careers@2basetechnologies.com",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-15",
    source: "WhatsApp",
    verified: true,
    tags: ["Sales", "Business"],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@2basetechnologies.com",
    phone: "",
    website: "https://www.2basetechnologies.com",
    address: "Technopark, Trivandrum, Kerala",
    industry: "IT / Digital Solutions",
    companyDetails:
      "2Base Technologies (Way 2 Digital) is hiring a Business Development Manager for Technopark, Trivandrum to drive B2B sales for web, mobile, and enterprise software services.",
    workDetails:
      "Senior BD role owning the full sales cycle — lead generation through closure, key accounts, and strategic revenue plans. Immediate joiners preferred.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "5–10 years",
    requirements: [
      "5–10 years in B2B sales (IT services / digital solutions)",
      "Strong understanding of web, mobile, SaaS & enterprise solutions",
      "Experience with international clients",
      "Proficient in CRM (Zoho, HubSpot, Salesforce) & LinkedIn Sales Navigator",
      "Excellent communication, presentation & negotiation skills"
    ],
    responsibilities: [
      "Identify & generate qualified leads via outbound, referrals & research",
      "Drive new business for web, mobile & enterprise software services",
      "Own & manage the complete sales cycle from lead to closure",
      "Develop & execute strategic sales plans to achieve revenue targets",
      "Handle key accounts & build long-term client relationships",
      "Identify upsell & cross-sell opportunities within existing accounts"
    ],
    benefits: ["Technopark Trivandrum location", "Immediate joiners preferred"],
    howToApply: "Email your resume to careers@2basetechnologies.com with subject “Business Development Manager”.",
    hiringNotes: "Published 15 July 2026. Apply before 31 July 2026.",
    description: "BDM · 5–10 years · Technopark TVM · Apply by 31 Jul."
  },
  {
    id: "kenland",
    company: "Kenland IT Solutions",
    logo: "assets/logos/kenland.svg",
    companyBlurb: "Business Analyst (immediate joiner) at Technopark Campus, Kariyavattom.",
    location: "Technopark Campus, Kariyavattom, Trivandrum",
    roles: ["Business Analyst (Immediate Joiner)"],
    experience: "experienced",
    experienceRange: "3+ Years",
    employmentType: "Full-time",
    applyLink: "mailto:recruiter@kenland.in",
    applyDeadline: "2026-07-20",
    postedDate: "2026-07-14",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Business"],
    isWalkIn: false,
    walkInDate: "",
    email: "recruiter@kenland.in",
    phone: "",
    website: "",
    address: "Technopark Campus, Kariyavattom, Trivandrum, Kerala",
    industry: "IT / Software",
    companyDetails:
      "Kenland IT Solutions (P) Ltd is hiring a Business Analyst (immediate joiner) at Technopark Campus, Kariyavattom, Trivandrum.",
    workDetails:
      "BA role focused on requirements gathering, documentation (BRD / FRD / SRS), wireframes, Agile ceremonies, and stakeholder liaison.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "3+ years",
    requirements: [
      "3+ years as a Business Analyst in IT / software",
      "Experience with BRD, FRD, and SRS documentation",
      "Proficiency in MS Office and Confluence",
      "Excellent communication and interpersonal skills",
      "Strong analytical thinking and problem-solving",
      "Experience with cross-functional teams and multiple stakeholders"
    ],
    responsibilities: [
      "Gather and analyze business requirements from clients and stakeholders",
      "Translate requirements into clear functional and non-functional documents",
      "Create use case diagrams, flowcharts, and wireframes",
      "Act as a liaison between the client and the technical team",
      "Participate in Agile ceremonies and assist in backlog grooming",
      "Manage requirement changes using structured change control",
      "Contribute to the product roadmap and process improvements"
    ],
    benefits: ["Technopark Campus role", "Immediate joiners preferred"],
    howToApply: "Send your resume to recruiter@kenland.in. Mention “Business Analyst – Immediate Joiner” in the subject.",
    hiringNotes: "Published 14 July 2026. Closing date 20 July 2026.",
    description: "BA · 3+ years · Apply by 20 Jul · Immediate joiners."
  },
  {
    id: "kameda",
    company: "Kameda Infologics",
    logo: "assets/logos/kameda.svg",
    companyBlurb: "Hiring Angular Developer and DevOps Engineer — apply by 31 July.",
    location: "Kerala",
    roles: ["Angular Developer – UI Design", "DevOps Engineer"],
    experience: "experienced",
    experienceRange: "3–5+ Years",
    employmentType: "Full-time",
    applyLink: "mailto:preeyanka@kamedainfologics.com",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-16",
    source: "WhatsApp",
    verified: true,
    tags: ["IT"],
    isWalkIn: false,
    walkInDate: "",
    email: "preeyanka@kamedainfologics.com",
    phone: "",
    website: "",
    address: "Kerala",
    industry: "IT Services",
    companyDetails:
      "Kameda Infologics (P) Ltd is hiring experienced Angular and DevOps talent. Closing date for applications is 31 July 2026.",
    workDetails:
      "Two openings: Angular Developer – UI Design (4+ years) and DevOps Engineer (3–5 years).",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Angular 4+ years / DevOps 3–5 years",
    requirements: [
      "Angular Developer: 4+ years relevant UI / Angular experience",
      "DevOps Engineer: 3–5 years relevant DevOps experience",
      "Strong ownership and delivery mindset"
    ],
    responsibilities: [
      "Build and maintain Angular UI experiences (Angular track)",
      "Own CI/CD, infrastructure, and release workflows (DevOps track)",
      "Collaborate with product and engineering teams"
    ],
    benefits: ["Experienced career tracks", "Apply before 31 July 2026"],
    howToApply: "Send your resume to preeyanka@kamedainfologics.com. Mention the role title in the subject line.",
    hiringNotes: "Closing date: 31 July 2026.",
    description: "Angular (4+) & DevOps (3–5 yrs) · Apply by 31 Jul."
  },
  {
    id: "klystron",
    company: "Klystron Technologies",
    logo: "assets/logos/klystron.svg",
    companyBlurb: "Flutter Developer and Accounts & Operations Executive — apply by 20 July.",
    location: "Kerala",
    roles: ["Flutter Developer", "Accounts & Operations Executive"],
    experience: "experienced",
    experienceRange: "2–5 Years",
    employmentType: "Full-time",
    applyLink: "mailto:jobs.in@klystronglobal.com",
    applyDeadline: "2026-07-20",
    postedDate: "2026-07-16",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Business"],
    isWalkIn: false,
    walkInDate: "",
    email: "jobs.in@klystronglobal.com",
    phone: "",
    website: "",
    address: "Kerala",
    industry: "IT / Technology",
    companyDetails:
      "Klystron Technologies is hiring a Flutter Developer (4–5 years) and an Accounts & Operations Executive (2–3 years).",
    workDetails:
      "Two experienced openings. Send resumes to jobs.in@klystronglobal.com before the closing date.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Flutter 4–5 years / Accounts & Ops 2–3 years",
    requirements: [
      "Flutter Developer: 4–5 years Flutter / mobile development experience",
      "Accounts & Operations Executive: 2–3 years relevant experience"
    ],
    responsibilities: [
      "Build and maintain Flutter applications (Flutter track)",
      "Support accounts and day-to-day operations (Ops track)"
    ],
    benefits: ["Two open tracks", "Apply before 20 July 2026"],
    howToApply: "Send your resume to jobs.in@klystronglobal.com. Mention the applied role in the subject line.",
    hiringNotes: "Closing date: 20 July 2026.",
    description: "Flutter (4–5 yrs) & Accounts/Ops (2–3 yrs) · Apply by 20 Jul."
  },
  {
    id: "tcs-walkin",
    company: "Tata Consultancy Services (TCS)",
    logo: "assets/logos/tcs.svg",
    companyBlurb: "Walk-in drive for multiple IT positions at Technopark TCS Delivery Center.",
    location: "Technopark, Trivandrum",
    roles: [
      "Java Full Stack",
      "Java Spring Boot",
      "DevOps",
      "ServiceNow",
      "Network Security",
      "Cisco Network Engineer",
      "Network Automation Engineer",
      "NICE CXOne Developer"
    ],
    experience: "experienced",
    experienceRange: "4–12 Years",
    employmentType: "Full-time",
    applyLink: "mailto:careers@tcs.com",
    applyDeadline: "2026-07-11",
    postedDate: "2026-07-10",
    source: "WhatsApp",
    verified: true,
    tags: ["IT"],
    isWalkIn: true,
    walkInDate: "11 July 2026 (Sat) · 9:30 AM – 2:00 PM",
    email: "careers@tcs.com",
    phone: "",
    website: "https://www.tcs.com/careers",
    address: "Technopark, TCS Delivery Center, Kariyavattom P.O., Trivandrum – 695581",
    industry: "IT Services",
    companyDetails:
      "Tata Consultancy Services (TCS) is conducting a walk-in drive for multiple experienced IT positions at the Technopark TCS Delivery Center, Trivandrum.",
    workDetails:
      "Walk-in on 11 July 2026 (Saturday), 9:30 AM – 2:00 PM. Experience 4–12 years depending on role. Register via TCS iBegin and obtain a Technopark entry pass before attending.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "4–12 years (role-dependent)",
    requirements: [
      "4–12 years relevant experience (role-dependent)",
      "Updated resume",
      "TCS Application Form (iBegin)",
      "Original & photocopy of PAN / Aadhaar",
      "2 passport-size photographs",
      "Technopark Entry Pass required before attending"
    ],
    responsibilities: [
      "Deliver on the applied technology track (Java, DevOps, ServiceNow, Networking, etc.)",
      "Collaborate with project and delivery teams",
      "Meet TCS quality and delivery standards"
    ],
    benefits: ["Multiple specialized IT tracks", "Technopark TCS Delivery Center"],
    howToApply:
      "Apply through the TCS iBegin Portal, obtain a Technopark Entry Pass, then attend the walk-in. You may also reach careers@tcs.com for guidance. Bring all required documents listed above.",
    hiringNotes:
      "Walk-in date: 11 July 2026, 9:30 AM – 2:00 PM. Location: Technopark, TCS Delivery Center, Kariyavattom P.O., Trivandrum – 695581.",
    description: "Walk-in · 4–12 yrs · Multiple IT roles · 11 Jul · Technopark."
  },
  {
    id: "cognizant",
    company: "Cognizant",
    logo: "assets/logos/cognizant.svg",
    companyBlurb: "Technical Support Engineer for freshers / 0–2 years — scan to apply.",
    location: "Kerala / Cognizant (confirm location on apply)",
    roles: ["Technical Support Engineer"],
    experience: "fresher",
    experienceRange: "Freshers / 0–2 Years",
    employmentType: "Full-time",
    applyLink: "https://www.instagram.com/infoparkdaily.jobs/",
    applyDeadline: "Rolling",
    postedDate: "2026-07-15",
    source: "WhatsApp",
    verified: true,
    tags: ["IT"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://careers.cognizant.com/",
    address: "Confirm location via Cognizant apply flow",
    industry: "IT Services",
    companyDetails:
      "Cognizant is hiring Technical Support Engineers for freshers and early-career talent (0–2 years). Any degree with minimum 50% academics (eligible branches as per official JD).",
    workDetails:
      "Technical Support Engineer opening. Apply via the QR / link shared on InfoparkDaily Jobs posts, or through Cognizant careers.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Freshers / 0–2 years",
    requirements: [
      "Freshers or up to 2 years experience",
      "Any degree — eligible branches as per official JD",
      "Minimum 50% in academics"
    ],
    responsibilities: [
      "Provide technical support to customers / internal users",
      "Troubleshoot and escalate issues as per process",
      "Document resolutions and follow quality standards"
    ],
    benefits: [
      "Grow your career",
      "Learn & innovate",
      "Work with the best",
      "Wellness & well-being"
    ],
    howToApply:
      "Scan the QR code / follow the apply link shared on InfoparkDaily Jobs Instagram or WhatsApp posts for Cognizant Technical Support Engineer. Also check https://careers.cognizant.com/.",
    hiringNotes: "Verify location, JD eligibility, and apply steps on the official Cognizant careers flow before applying.",
    description: "Technical Support · Freshers / 0–2 yrs · Any degree (50%+)."
  },
  {
    id: "bizforz",
    company: "Bizforz",
    logo: "assets/logos/bizforz.svg",
    companyBlurb: "Full Stack Developer (Node + React) — 2+ years at Kottakkal, Malappuram.",
    location: "Kottakkal, Malappuram",
    roles: ["Full Stack Developer"],
    experience: "experienced",
    experienceRange: "2+ Years",
    employmentType: "Full-time",
    applyLink: "mailto:hr@bizforz.com",
    applyDeadline: "Rolling",
    postedDate: "2026-07-15",
    source: "WhatsApp",
    verified: true,
    tags: ["IT"],
    isWalkIn: false,
    walkInDate: "",
    email: "hr@bizforz.com",
    phone: "",
    website: "https://www.bizforz.com",
    address: "Kottakkal, Malappuram, Kerala",
    industry: "Software Product / Services",
    companyDetails:
      "Bizforz is hiring a Full Stack Developer for its Kottakkal, Malappuram team. Stack spans Node.js / Express, React / Next.js, SQL & NoSQL, WebSockets, and AWS.",
    workDetails:
      "Full-time Full Stack Developer role (2+ years). Build scalable apps, APIs, responsive UIs, real-time features, and AWS deployments.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "2+ years",
    requirements: [
      "2+ years full stack experience",
      "Backend: Node.js, Express.js, RESTful APIs, SQL & NoSQL, WebSockets, AWS",
      "Frontend: React, Next.js, JavaScript, HTML, CSS, Redux, responsive UI"
    ],
    responsibilities: [
      "Develop and maintain scalable full stack applications",
      "Design and build secure RESTful APIs",
      "Build modern and responsive user interfaces",
      "Implement real-time features using WebSockets",
      "Work with SQL & NoSQL databases",
      "Deploy and manage applications on AWS",
      "Collaborate with cross-functional teams",
      "Write clean, efficient & maintainable code"
    ],
    benefits: ["Full-time role", "Modern Node + React stack"],
    howToApply: "Email your resume to hr@bizforz.com. Visit www.bizforz.com for more about the company.",
    hiringNotes: "Shared via InfoparkDaily Jobs. Verify details with Bizforz before applying.",
    description: "Full Stack · Node/React · 2+ years · Malappuram."
  },
  {
    id: "chrisma",
    company: "Chrisma Consultancy",
    logo: "assets/logos/chrisma.svg",
    companyBlurb: "Operations Executive for last-mile logistics hub in Alappuzha.",
    location: "Alappuzha",
    roles: ["Operations Executive"],
    experience: "both",
    experienceRange: "Fresher / Experienced",
    employmentType: "Full-time",
    applyLink: "tel:+919947337555",
    applyDeadline: "Rolling",
    postedDate: "2026-07-15",
    source: "WhatsApp",
    verified: false,
    tags: ["Business", "Sales"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "9947 337 555",
    website: "",
    address: "Alappuzha, Kerala",
    industry: "Logistics / Last Mile",
    companyDetails:
      "Chrisma Consultancy is hiring an Operations Executive for a leading last-mile operations hub in Alappuzha. Salary band indicated: ₹15,000 – ₹18,000.",
    workDetails:
      "Logistics operations role covering daily last-mile deliveries, delivery-partner coordination, hub records, and customer query handling.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Fresher / Experienced",
    requirements: [
      "Fresher or experienced candidates welcome",
      "Willingness to work in logistics / last-mile operations",
      "Good coordination and communication skills"
    ],
    responsibilities: [
      "Manage and monitor daily last-mile operations and deliveries",
      "Coordinate with delivery partners and ensure on-time delivery",
      "Ensure smooth hub operations and maintain accurate records",
      "Handle customer queries and resolve issues effectively",
      "Work closely with the team to achieve daily targets"
    ],
    benefits: ["Salary ₹15,000 – ₹18,000", "Alappuzha-based hub role"],
    howToApply: "Contact Chrisma Consultancy at 9947 337 555 for apply / interview details.",
    hiringNotes: "Shared via InfoparkDaily. Verify role and salary details directly with the consultancy before applying.",
    description: "Operations Executive · Alappuzha · ₹15k–18k · Call to apply."
  },
  {
    id: "travelearn",
    company: "Travelearn Holidays",
    logo: "assets/logos/travelearn.svg",
    companyBlurb: "Video Editor Intern — freshers only, Calicut.",
    location: "Calicut",
    roles: ["Video Editor Intern"],
    experience: "fresher",
    experienceRange: "Freshers Only",
    employmentType: "Internship",
    applyLink: "mailto:hrtravelearnholidays@gmail.com",
    applyDeadline: "Rolling",
    postedDate: "2026-07-14",
    source: "WhatsApp",
    verified: false,
    tags: ["Marketing", "Design"],
    isWalkIn: false,
    walkInDate: "",
    email: "hrtravelearnholidays@gmail.com",
    phone: "+91 79941 38555",
    website: "",
    address: "Calicut, Kerala",
    industry: "Travel / Creative",
    companyDetails:
      "Travelearn Holidays (Calicut) is hiring a Video Editor Intern for freshers. Creative travel brand looking for Premiere Pro / After Effects talent.",
    workDetails:
      "Internship focused on video editing for travel content. Freshers only. Drop your CV by email or WhatsApp.",
    workStatus: "Internship",
    workMode: "On-site",
    experienceYears: "Freshers only",
    requirements: [
      "Freshers only",
      "Familiarity with Adobe Premiere Pro and/or After Effects preferred",
      "Interest in travel / social video content"
    ],
    responsibilities: [
      "Edit short-form and promotional travel videos",
      "Work with the creative team on content calendars",
      "Maintain brand style and timely delivery"
    ],
    benefits: ["Fresher-friendly internship", "Calicut-based creative role"],
    howToApply:
      "Drop your CV to hrtravelearnholidays@gmail.com or WhatsApp +91 79941 38555. Instagram: @travelearn_holidays_calicut",
    hiringNotes: "Shared via InfoparkDaily Jobs. Confirm internship terms directly with the company.",
    description: "Video Editor Intern · Freshers only · Calicut."
  },
  {
    id: "aceware",
    company: "Aceware Fintech Services",
    logo: "assets/logos/aceware.svg",
    companyBlurb: "Kochi fintech hiring front-office talent for client operations.",
    location: "Kochi",
    roles: ["Front Office Executive"],
    experience: "fresher",
    experienceRange: "0–2 Years",
    employmentType: "Full-time",
    applyLink: "mailto:career@acemoney.in",
    applyDeadline: "Rolling",
    postedDate: "2026-07-16",
    source: "WhatsApp",
    verified: true,
    tags: ["Business", "Sales"],
    isWalkIn: false,
    walkInDate: "",
    email: "career@acemoney.in",
    phone: "",
    website: "",
    address: "Kochi, Kerala",
    industry: "Fintech",
    companyDetails:
      "Aceware Fintech Services (Radiant Harmony) is a Kochi-based fintech organization. They are hiring front-office talent to support day-to-day client and office operations in a professional work environment.",
    workDetails:
      "Opening for Front Office Executive. Ideal for candidates looking to start or early-grow a career in a structured office setup. Experience range indicated: 0–2 years.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "0–2 years",
    requirements: [
      "Fresher or up to 2 years of relevant experience",
      "Good communication skills in English / Malayalam",
      "Professional front-office / client-facing attitude",
      "Basic computer and office tool familiarity"
    ],
    responsibilities: [
      "Handle front office and visitor coordination",
      "Support day-to-day administrative and client interactions",
      "Maintain professional communication standards",
      "Assist internal teams with scheduling and coordination as needed"
    ],
    benefits: [
      "Professional office environment",
      "Opportunity to start a career in fintech operations",
      "Kochi-based role"
    ],
    howToApply: "Send your resume / application to career@acemoney.in. Mention the role “Front Office Executive” in the subject line.",
    hiringNotes: "Shared via InfoparkDaily Jobs WhatsApp alerts. Verify details directly with the company before applying.",
    description: "Kickstart your career in a professional work environment. 0–2 years."
  },
  {
    id: "trainonex",
    company: "Trainonex Solutions",
    logo: "assets/logos/trainonex.svg",
    companyBlurb: "Technopark campus team looking for fresher BD talent.",
    location: "Technopark Campus, Trivandrum",
    roles: ["Business Development Executive"],
    experience: "fresher",
    experienceRange: "0–1 Years",
    employmentType: "Full-time",
    applyLink: "https://www.instagram.com/infoparkdaily.jobs/",
    applyDeadline: "2026-07-30",
    postedDate: "2026-07-15",
    source: "Instagram",
    verified: false,
    tags: ["Sales", "Business"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    website: "",
    address: "Technopark Campus, Trivandrum, Kerala",
    industry: "IT / Business Development",
    companyDetails:
      "Trainonex Solutions (P) Ltd is hiring a Business Development Executive for its Technopark Campus, Trivandrum operations.",
    workDetails:
      "Business Development Executive role with fresher preference (0–1 year). Focus on lead generation, outreach, and growth support.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "0–1 year (Fresher preferred)",
    requirements: [
      "Fresher preferred (0–1 year)",
      "Strong communication and presentation skills",
      "Interest in business development / sales"
    ],
    responsibilities: [
      "Identify and nurture business leads",
      "Support outreach and follow-ups",
      "Coordinate with internal teams on opportunities"
    ],
    benefits: ["Technopark Campus role", "Fresher-friendly BD opportunity"],
    howToApply:
      "Follow updates and apply via details shared on InfoparkDaily Jobs Instagram: https://www.instagram.com/infoparkdaily.jobs/",
    description: "Fresher preferred (0–1 year).",
    hiringNotes: "Shared via InfoparkDaily Jobs Instagram channel. Confirm latest apply steps with the company."
  },
  {
    id: "supporthub360",
    company: "SupportHub360",
    logo: "assets/logos/supporthub360.svg",
    companyBlurb: "Growth marketing team hiring at Infopark Phase 2.",
    location: "Infopark Phase 2, Kochi",
    roles: ["Digital Marketing Executive"],
    experience: "experienced",
    experienceRange: "2+ Years",
    employmentType: "Full-time",
    applyLink: "https://www.instagram.com/infoparkdaily.jobs/",
    applyDeadline: "2026-07-28",
    postedDate: "2026-07-14",
    source: "Instagram",
    verified: false,
    tags: ["Marketing"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    website: "",
    address: "Infopark Phase 2, Kochi, Kerala",
    industry: "Digital Marketing",
    companyDetails:
      "SupportHub360 is hiring a Digital Marketing Executive for its Infopark Phase 2, Kochi team.",
    workDetails:
      "Experienced Digital Marketing Executive role covering campaign execution and growth marketing responsibilities.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced",
    requirements: [
      "Experience in digital marketing execution",
      "Familiarity with social ads / SEO / content workflows (as applicable)",
      "Infopark Phase 2 availability"
    ],
    responsibilities: [
      "Plan and run digital campaigns",
      "Track performance and optimize results",
      "Coordinate with creative and sales stakeholders"
    ],
    benefits: ["Infopark Phase 2 location", "Full-time marketing role"],
    howToApply:
      "Check InfoparkDaily Jobs Instagram for the latest apply instructions: https://www.instagram.com/infoparkdaily.jobs/",
    hiringNotes: "Shared via InfoparkDaily Jobs Instagram. Verify details with the hiring company."
  },
  {
    id: "2base",
    company: "2Base Technologies",
    logo: "assets/logos/2base.svg",
    companyBlurb: "Walk-in drive at Infopark Phase 1 — 8 roles across engineering, design & growth.",
    location: "Infopark Phase 1, Kochi",
    roles: [
      "Associate System Engineer",
      "Software Engineer – Web",
      "Visual Designer",
      "Marketing & Growth Lead",
      "Senior QA Engineer",
      "Senior Business Analyst",
      "Senior UI/UX Designer",
      "Business Development Manager"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "tel:+918590888400",
    applyDeadline: "Rolling",
    postedDate: "2026-07-13",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Design", "Marketing", "Sales"],
    isWalkIn: true,
    walkInDate: "Starting 13 July 2026 · Mon–Sat 9:30 AM – 4:00 PM",
    email: "",
    phone: "8590888400",
    website: "https://www.infopark.in/companies-job",
    address: "2Base Technologies, Ground Floor, Athulya Building, Infopark Phase 1, Kochi",
    industry: "IT / Product Engineering",
    companyDetails:
      "2Base Technologies is running a walk-in hiring drive at Infopark Phase 1, Kochi for multiple experienced roles across engineering, design, QA, analysis, marketing/growth, and business development.",
    workDetails:
      "Walk-in from 13 July 2026 onwards, Monday–Saturday, 9:30 AM – 4:00 PM. Bring an updated resume. Contact HR: 8590888400.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Relevant experience matching the applied role",
      "Updated resume required for walk-in",
      "Ready to work from Infopark Phase 1, Kochi"
    ],
    responsibilities: [
      "Contribute to product, engineering, design, or growth goals based on role",
      "Collaborate with cross-functional teams",
      "Deliver quality outcomes with accountability"
    ],
    benefits: [
      "Multiple role tracks in one company",
      "Infopark Phase 1 walk-in access",
      "Also listed on Infopark companies job portal"
    ],
    howToApply:
      "Walk in to 2Base Technologies, Ground Floor, Athulya Building, Infopark Phase 1, Kochi (Mon–Sat, 9:30 AM – 4:00 PM) with an updated resume. Contact: 8590888400. You can also apply via https://www.infopark.in/companies-job.",
    hiringNotes: "Walk-in starting 13 July 2026. Verify timings with HR before visiting.",
    startingDate: "2026-07-13",
    description: "Walk-in · 8 roles · Infopark Phase 1 · From 13 Jul · Call 8590888400."
  },
  {
    id: "feathersoft",
    company: "Feathersoft Info Solutions",
    logo: "assets/logos/feathersoft.svg",
    companyBlurb: "Data engineering and student apprenticeship tracks at Infopark.",
    location: "Kakkanad, Infopark",
    roles: ["Data Engineer", "Apprenticeship for Diploma/B.Tech Students"],
    experience: "both",
    experienceRange: "Fresher to experienced",
    employmentType: "Apprenticeship",
    applyLink: "https://www.infopark.in/companies-job",
    applyDeadline: "Rolling",
    postedDate: "2026-07-13",
    source: "Infopark",
    verified: true,
    tags: ["IT"],
    isWalkIn: true,
    walkInDate: "Starting 13 July 2026",
    email: "",
    website: "https://www.infopark.in/companies-job",
    address: "Kakkanad Infopark, Kochi, Kerala",
    industry: "IT Services / Data",
    companyDetails:
      "Feathersoft Info Solutions is an Infopark Kochi company currently hiring for data engineering talent and student apprenticeship tracks.",
    workDetails:
      "Openings include Data Engineer (experienced track) and Apprenticeship opportunities for Diploma / B.Tech students. Freshers and experienced candidates can explore relevant tracks.",
    workStatus: "Full-time / Apprenticeship",
    workMode: "On-site",
    experienceYears: "Fresher to experienced (role-dependent)",
    requirements: [
      "For Data Engineer: relevant data / engineering background",
      "For Apprenticeship: Diploma or B.Tech students / fresh graduates",
      "Willingness to learn and work from Infopark Kochi"
    ],
    responsibilities: [
      "Data engineering delivery for applicable role",
      "Learning and project contribution for apprenticeship track",
      "Team collaboration and timely execution"
    ],
    benefits: [
      "Infopark Kochi opportunity",
      "Apprenticeship pathway for students",
      "Official Infopark portal application"
    ],
    howToApply: "Apply via https://www.infopark.in/companies-job and choose Feathersoft Info Solutions.",
    hiringNotes: "Part of Infopark Smart Space hiring updates (week of 13 Jul 2026).",
    startingDate: "2026-07-13"
  },
  {
    id: "ss-consulting",
    company: "SS Consulting",
    logo: "assets/logos/ss-consulting.svg",
    companyBlurb: "AI consulting team hiring experienced AI Engineers.",
    location: "Kakkanad, Infopark",
    roles: ["AI Engineer"],
    experience: "experienced",
    experienceRange: "Experienced",
    employmentType: "Full-time",
    applyLink: "https://www.infopark.in/companies-job",
    applyDeadline: "2026-07-25",
    postedDate: "2026-07-13",
    source: "Infopark",
    verified: true,
    tags: ["IT"],
    isWalkIn: true,
    walkInDate: "Starting 13 July 2026",
    website: "https://www.infopark.in/companies-job",
    address: "Kakkanad Infopark, Kochi, Kerala",
    industry: "AI / Consulting",
    companyDetails:
      "SS Consulting is hiring an AI Engineer as part of Infopark Kochi Smart Space openings.",
    workDetails:
      "Experienced AI Engineer role focused on building and delivering AI solutions. Apply through the Infopark companies job portal.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced",
    requirements: [
      "Hands-on AI / ML engineering experience",
      "Strong problem-solving and implementation skills",
      "Ready for Infopark Kochi based role"
    ],
    responsibilities: [
      "Design and develop AI solutions",
      "Collaborate with stakeholders on delivery",
      "Maintain quality and performance of AI systems"
    ],
    benefits: ["Infopark Kochi location", "Full-time AI engineering track"],
    howToApply: "Apply at https://www.infopark.in/companies-job for SS Consulting — AI Engineer.",
    hiringNotes: "Infopark Smart Space listing — week of 13 Jul 2026.",
    startingDate: "2026-07-13"
  },
  {
    id: "edstem",
    company: "Edstem Technologies",
    logo: "assets/logos/edstem.svg",
    companyBlurb: "Product and delivery roles for experienced BA and TPM talent.",
    location: "Kakkanad, Infopark",
    roles: ["Business Analyst", "Technical Project Manager / Lead"],
    experience: "experienced",
    experienceRange: "Experienced",
    employmentType: "Full-time",
    applyLink: "https://www.infopark.in/companies-job",
    applyDeadline: "Rolling",
    postedDate: "2026-07-13",
    source: "Infopark",
    verified: true,
    tags: ["IT", "Business"],
    isWalkIn: true,
    walkInDate: "Starting 13 July 2026",
    website: "https://www.infopark.in/companies-job",
    address: "Kakkanad Infopark, Kochi, Kerala",
    industry: "Product / IT Services",
    companyDetails:
      "Edstem Technologies is hiring experienced Business Analyst and Technical Project Manager / Lead talent from Infopark Kochi.",
    workDetails:
      "Two experienced openings: Business Analyst and Technical Project Manager / Lead. Ideal for candidates with delivery and stakeholder management experience.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced",
    requirements: [
      "Relevant BA or TPM / project lead experience",
      "Strong communication and documentation skills",
      "Ability to coordinate technical and business stakeholders"
    ],
    responsibilities: [
      "Gather and translate requirements (BA)",
      "Lead project delivery and team coordination (TPM / Lead)",
      "Drive timelines, quality, and stakeholder alignment"
    ],
    benefits: ["Infopark Kochi role", "Leadership / analysis career track"],
    howToApply: "Apply via https://www.infopark.in/companies-job — Edstem Technologies.",
    hiringNotes: "Infopark Smart Space openings starting 13 Jul 2026.",
    startingDate: "2026-07-13"
  },
  {
    id: "nesa",
    company: "Nesa Software",
    logo: "assets/logos/nesa.svg",
    companyBlurb: "Analytics team hiring a Data Analyst at Infopark Kochi.",
    location: "Kakkanad, Infopark",
    roles: ["Data Analyst"],
    experience: "experienced",
    experienceRange: "Experienced",
    employmentType: "Full-time",
    applyLink: "https://www.infopark.in/companies-job",
    applyDeadline: "Rolling",
    postedDate: "2026-07-13",
    source: "Infopark",
    verified: true,
    tags: ["IT"],
    isWalkIn: true,
    walkInDate: "Starting 13 July 2026",
    website: "https://www.infopark.in/companies-job",
    address: "Kakkanad Infopark, Kochi, Kerala",
    industry: "Software / Analytics",
    companyDetails:
      "Nesa Software is hiring a Data Analyst as part of Infopark Kochi’s current company openings.",
    workDetails:
      "Experienced Data Analyst role. Candidates should be comfortable with analytics workflows and business reporting needs.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced",
    requirements: [
      "Experience in data analysis / reporting",
      "Familiarity with analytics tools and Excel / SQL (as applicable)",
      "Infopark Kochi availability"
    ],
    responsibilities: [
      "Analyze datasets and prepare insights",
      "Support business reporting needs",
      "Collaborate with teams on data-driven decisions"
    ],
    benefits: ["Infopark Kochi workplace", "Full-time analytics role"],
    howToApply: "Apply at https://www.infopark.in/companies-job for Nesa Software — Data Analyst.",
    startingDate: "2026-07-13"
  },
  {
    id: "techwarelab",
    company: "Techware Lab",
    logo: "assets/logos/techwarelab.svg",
    companyBlurb: "Startup ops and product design roles — MBA freshers welcome.",
    location: "Infopark Phase 2, Kochi",
    roles: ["Founder's Office Assistant (MBA Freshers)", "UI/UX Developer"],
    experience: "both",
    experienceRange: "Fresher / ~2 years",
    employmentType: "Full-time",
    applyLink: "https://www.infopark.in/companies-job",
    applyDeadline: "2026-07-27",
    postedDate: "2026-07-13",
    source: "Infopark",
    verified: true,
    tags: ["Business", "Design"],
    isWalkIn: true,
    walkInDate: "Starting 13 July 2026",
    website: "https://www.infopark.in/companies-job",
    address: "Infopark Phase 2 / Kakkanad Infopark, Kochi, Kerala",
    industry: "Technology / Startup Ops",
    companyDetails:
      "Techware Lab is hiring both MBA fresher talent for Founder's Office support and experienced UI/UX Developer profiles.",
    workDetails:
      "Two tracks: Founder's Office Assistant aimed at MBA freshers, and UI/UX Developer (around 2 years experience indicated in community posts).",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Fresher (MBA) / ~2 years (UI/UX)",
    requirements: [
      "MBA fresher profile for Founder's Office Assistant",
      "UI/UX experience (approx. 2 years) for Developer track",
      "Strong communication and ownership"
    ],
    responsibilities: [
      "Support founder office operations and coordination (MBA track)",
      "Design and improve product UI/UX experiences (UI/UX track)",
      "Collaborate with product / growth stakeholders"
    ],
    benefits: ["Infopark Kochi opportunity", "Freshers + experienced tracks available"],
    howToApply: "Apply through https://www.infopark.in/companies-job — Techware Lab.",
    description: "Founder's Office for MBA freshers; UI/UX Developer (2+ years).",
    hiringNotes: "Also featured on InfoparkDaily Jobs Instagram channel.",
    startingDate: "2026-07-13"
  },
  {
    id: "inspite",
    company: "Inspite Technologies",
    logo: "assets/logos/inspite.svg",
    companyBlurb: "WordPress Developer (1–3 years) in Kochi — email HR to apply.",
    location: "Kochi / Infopark",
    roles: ["WordPress Developer", "Performance Marketing Intern"],
    experience: "both",
    experienceRange: "1–3 Years (WP) / Fresher (Intern)",
    employmentType: "Full-time",
    applyLink: "mailto:hr@inspitetech.com",
    applyDeadline: "Rolling",
    postedDate: "2026-07-14",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Marketing"],
    isWalkIn: true,
    walkInDate: "Also listed in Infopark Smart Space from 13 July 2026",
    email: "hr@inspitetech.com",
    website: "https://www.infopark.in/companies-job",
    address: "Kochi / Kakkanad Infopark, Kerala",
    industry: "Digital / Web",
    companyDetails:
      "Inspite Technologies is hiring a WordPress Developer (1–3 years) in Kochi, plus a Performance Marketing Intern track listed via Infopark openings.",
    workDetails:
      "WordPress Developer role requiring strong WP skills, DNS knowledge, debugging, and solid communication. Also exploring performance marketing internship via Infopark listings.",
    workStatus: "Full-time / Internship",
    workMode: "On-site",
    experienceYears: "WordPress 1–3 years / Intern fresher-friendly",
    requirements: [
      "Strong WordPress development skills",
      "Knowledge of DNS management",
      "Strong debugging, troubleshooting & problem-solving",
      "Excellent communication & interpersonal skills",
      "Ability to work independently and in a team",
      "1–3 years experience for WordPress Developer track"
    ],
    responsibilities: [
      "Build and maintain WordPress websites",
      "Handle DNS-related setup as needed",
      "Debug and troubleshoot WP issues",
      "Support performance marketing campaigns (intern track)",
      "Coordinate with creative / growth teams"
    ],
    benefits: ["Kochi / Infopark opportunity", "Internship + full-time tracks"],
    howToApply:
      "Send your resume to hr@inspitetech.com for WordPress Developer. Performance Marketing Intern / other tracks may also appear on https://www.infopark.in/companies-job.",
    hiringNotes: "Verify role and apply email with Inspite before applying.",
    startingDate: "2026-07-13",
    description: "WordPress Developer · 1–3 yrs · Kochi · hr@inspitetech.com"
  },
  {
    id: "jachoos",
    company: "Jachoos Technologies",
    logo: "assets/logos/jachoos.svg",
    companyBlurb: "IT telesales role open to freshers and experienced candidates.",
    location: "Kakkanad, Infopark",
    roles: ["Telesales Executive (IT)"],
    experience: "both",
    experienceRange: "Fresher + Experienced",
    employmentType: "Full-time",
    applyLink: "https://www.infopark.in/companies-job",
    applyDeadline: "Rolling",
    postedDate: "2026-07-13",
    source: "Infopark",
    verified: true,
    tags: ["Sales"],
    isWalkIn: true,
    walkInDate: "Starting 13 July 2026",
    website: "https://www.infopark.in/companies-job",
    address: "Kakkanad Infopark, Kochi, Kerala",
    industry: "IT Services / Sales",
    companyDetails:
      "Jachoos Technologies is hiring a Telesales Executive (IT) as part of Infopark Kochi openings.",
    workDetails:
      "IT telesales role open to freshers and experienced candidates. Focus on outreach, follow-ups, and converting leads.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Fresher + Experienced",
    requirements: [
      "Good communication and persuasion skills",
      "Comfortable with phone / CRM based sales outreach",
      "Interest in IT services sales"
    ],
    responsibilities: [
      "Outbound / inbound telesales for IT offerings",
      "Follow up leads and maintain pipeline hygiene",
      "Achieve weekly / monthly outreach targets"
    ],
    benefits: ["Infopark Kochi workplace", "Open to freshers and experienced"],
    howToApply: "Apply at https://www.infopark.in/companies-job — Jachoos Technologies.",
    startingDate: "2026-07-13"
  },
  {
    id: "difinity",
    company: "Difinity Digital",
    logo: "assets/logos/difinity.svg",
    companyBlurb: "Digital solutions firm hiring .NET, marketing, and SAP talent.",
    location: "Kakkanad, Infopark",
    roles: [
      ".NET Full Stack Developer",
      "Digital Marketing Manager",
      "Senior .NET Full Stack Developer",
      "Product Consultant",
      "SAP B1 Functional Consultant"
    ],
    experience: "experienced",
    experienceRange: "Experienced / Senior",
    employmentType: "Full-time",
    applyLink: "https://www.infopark.in/companies-job",
    applyDeadline: "2026-07-26",
    postedDate: "2026-07-13",
    source: "Infopark",
    verified: true,
    tags: ["IT", "Marketing", "Business"],
    isWalkIn: true,
    walkInDate: "Starting 13 July 2026",
    website: "https://www.infopark.in/companies-job",
    address: "Kakkanad Infopark, Kochi, Kerala",
    industry: "Digital Solutions / ERP",
    companyDetails:
      "Difinity Digital is hiring across .NET engineering, digital marketing, product consulting, and SAP B1 functional consulting from Infopark Kochi.",
    workDetails:
      "Five experienced openings covering full-stack .NET (including senior), digital marketing leadership, product consulting, and SAP Business One functional consulting.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced / Senior (role-dependent)",
    requirements: [
      "Relevant experience for the applied role",
      ".NET stack expertise for developer roles",
      "SAP B1 functional knowledge for consultant role",
      "Digital marketing leadership experience for manager role"
    ],
    responsibilities: [
      "Build and maintain .NET applications",
      "Lead digital marketing strategy and execution",
      "Consult on product / SAP B1 implementations"
    ],
    benefits: ["Multiple specialized career tracks", "Infopark Kochi location"],
    howToApply: "Apply via https://www.infopark.in/companies-job — Difinity Digital.",
    startingDate: "2026-07-13"
  }
];
