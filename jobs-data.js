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
 * companySize, salaryRange, skills[], interviewTips[]
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
    id: "wipro-intern-l1",
    company: "Wipro Limited",
    logo: "assets/logos/wipro.svg",
    companyBlurb: "Intern L1 · Pan-India internship · Kochi + major metros · Official Wipro Careers · Ref 181899.",
    location: "Pan India · Kochi, Bengaluru, Chennai, Hyderabad, Pune, Mumbai, Delhi / New Delhi",
    workLocations: [
      "Kochi",
      "Bengaluru",
      "Chennai",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Delhi",
      "New Delhi"
    ],
    roles: ["Intern L1"],
    experience: "fresher",
    experienceRange: "Freshers / Students · 2026 & 2027 batches",
    employmentType: "Internship",
    applyLink: "https://careers.wipro.com/job/INTERN-L1/181899-en_US/",
    applyDeadline: "Rolling",
    postedDate: "2026-07-23",
    source: "Wipro Careers",
    verified: true,
    tags: ["IT", "Internship", "Fresher"],
    isWalkIn: false,
    walkInDate: "",
    alertSheet: true,
    alertLabel: "INTERNSHIP JOB ALERT · PAN INDIA",
    referenceId: "181899",
    email: "",
    phone: "",
    website: "https://careers.wipro.com/",
    address: "Wipro offices across India — final location based on business requirements",
    industry: "IT Services / Consulting / Early Careers",
    companySize: "Global IT major · Early Careers & Intern programmes across India",
    salaryRange: "Internship stipend — as per Wipro Early Careers offer letter",
    companyDetails:
      "Wipro Limited is hiring Intern L1 through the official Wipro Careers portal (Reference ID: 181899). This is an Early Careers internship / co-op track where interns work with experienced Wipro professionals on technology and business transformation projects. Final work location depends on business requirements and team allocation.",
    workDetails:
      "Intern L1 — pan-India internship alert. Preferred: B.E. / B.Tech / MBA (also M.E. / M.Tech / MCA / BCA for some tracks). Freshers and students from 2026 & 2027 graduating batches may apply. No prior work experience required. Apply only via official Wipro Careers — no application fee.",
    workStatus: "Internship / Co-op",
    workMode: "On-site · Assigned Wipro office (business requirement)",
    experienceYears: "Freshers / Students · No prior work experience required",
    whoCanApply: [
      "B.E. / B.Tech students",
      "MBA students",
      "2026 and 2027 graduating batches (as per current hiring information)",
      "Freshers and students currently pursuing or recently completed eligible degrees",
      "M.E. / M.Tech / MCA / BCA candidates for some internship tracks"
    ],
    requirements: [
      "Preferred degrees: B.E., B.Tech, MBA (also M.E., M.Tech, MCA, BCA for some tracks)",
      "2026 & 2027 graduating batches indicated in current hiring information",
      "Freshers / students — no prior work experience required",
      "Relevant academic background; meet any extra criteria shown during application",
      "Willingness to join any eligible Wipro location based on business needs",
      "Internships, academic projects, hackathons, and certifications are an added advantage"
    ],
    skills: [
      "Programming fundamentals",
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "SQL basics",
      "Git basics",
      "Software Development Life Cycle",
      "Testing fundamentals",
      "Good communication",
      "Problem solving",
      "Analytical thinking",
      "Team collaboration",
      "Adaptability & learning mindset"
    ],
    technicalSkills: [
      "Programming fundamentals",
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "SQL basics",
      "Git basics",
      "SDLC",
      "Testing fundamentals"
    ],
    softSkills: [
      "Good communication",
      "Problem solving",
      "Analytical thinking",
      "Team collaboration",
      "Adaptability",
      "Learning mindset"
    ],
    responsibilities: [
      "Work with experienced Wipro professionals on live client or internal projects",
      "Support technology and business transformation initiatives",
      "Develop software modules, debug applications, and perform testing",
      "Write documentation, create reports, and build proof-of-concepts (POCs)",
      "Participate in Agile ceremonies and collaborate with global / cross-functional teams",
      "Research emerging technologies and assist automation initiatives",
      "Present findings to managers and stakeholders",
      "Receive mentoring from experienced engineers and business leaders"
    ],
    selectionProcess: [
      "1. Online application on Wipro Careers",
      "2. Resume shortlisting",
      "3. Online assessment (if applicable)",
      "4. Technical / functional interview",
      "5. HR interview",
      "6. Offer letter",
      "7. Background verification",
      "8. Onboarding"
    ],
    documentsRequired: [
      "Updated resume (PDF preferred)",
      "Passport-size photograph (if requested)",
      "Government ID",
      "Academic mark sheets",
      "Degree / provisional certificate (if graduated)",
      "Internship / project certificates (if any)",
      "Project portfolio",
      "GitHub / LinkedIn profile (optional but recommended)"
    ],
    resumeTips: [
      "Highlight final-year projects",
      "Mention Flutter / React / Java / Python / C++ if relevant",
      "Add web development, AI/ML projects, cloud certifications",
      "List hackathons, open-source contributions, GitHub repos",
      "Include prior internships clearly"
    ],
    benefits: [
      "Live project experience with a global IT major",
      "Mentoring from experienced engineers and leaders",
      "Exposure to emerging technologies and industry trends",
      "Possible Pre-Placement Offer (PPO) pathway",
      "Pathway to full-time Graduate Engineer / Early Career programmes (performance & business dependent)",
      "Internal upskilling and certifications opportunities"
    ],
    interviewTips: [
      "Apply only on https://careers.wipro.com/job/INTERN-L1/181899-en_US/",
      "Read eligibility and JD carefully before submitting",
      "Upload your latest PDF resume with projects + GitHub/LinkedIn",
      "There is NO application fee — ignore anyone asking for money",
      "Meeting eligibility does not guarantee interview or selection"
    ],
    importantNotes: [
      "This is an official Wipro Careers opening (Ref ID: 181899).",
      "There is no application fee.",
      "Apply only through the official Wipro Careers portal.",
      "Meeting eligibility criteria does not guarantee an interview or selection.",
      "Final shortlisting follows Wipro's recruitment process.",
      "Wipro may modify the hiring process at any stage.",
      "Candidates may be assigned to any eligible Wipro location based on business needs."
    ],
    howToApply:
      "1) Visit official Wipro Careers. 2) Open Intern L1 posting (Ref 181899). 3) Read eligibility + JD. 4) Fill personal & academic details. 5) Upload latest resume. 6) Submit. Official link: https://careers.wipro.com/job/INTERN-L1/181899-en_US/",
    hiringNotes:
      "INTERNSHIP JOB ALERT · Pan-India · Intern L1 · Ref 181899 · Prefer B.E./B.Tech/MBA · 2026 & 2027 batches · Locations: Kochi, Bengaluru, Chennai, Hyderabad, Pune, Mumbai, Delhi/New Delhi · Apply free on official Wipro Careers only.",
    description: "Wipro Intern L1 · Pan India · Freshers/Students · Official Careers Ref 181899",
    startingDate: ""
  },
  {
    id: "toonz-hr-intern",
    company: "Toonz Animation India (P) Ltd",
    logo: "assets/logos/toonz.svg",
    companyBlurb: "HR Intern · Technopark Trivandrum · Apply by 24 July 2026.",
    location: "Technopark, Trivandrum",
    roles: ["HR Intern"],
    experience: "fresher",
    experienceRange: "Internship / Freshers",
    employmentType: "Internship",
    applyLink: "https://toonz.co/career/",
    applyDeadline: "2026-07-24",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: ["HR", "Internship"],
    isWalkIn: false,
    walkInDate: "",
    email: "hr@toonzanimationindia.com",
    phone: "",
    website: "https://toonz.co/",
    address: "Technopark Campus, Thiruvananthapuram, Kerala",
    industry: "Animation / Media / Entertainment",
    companySize: "Toonz Media Group · Animation & content studio at Technopark",
    salaryRange: "Internship stipend — confirm with Toonz HR",
    companyDetails:
      "Toonz Animation India (P) Ltd (Toonz Media Group) is a Technopark-based animation and media company. Careers: https://toonz.co/career/ — applications via hr@toonzanimationindia.com.",
    workDetails:
      "HR Intern opening at Technopark, Trivandrum. Part of Daily Job Alert: Technopark (21 July 2026). Closing: 24 July 2026. Posted: 17 July 2026.",
    workStatus: "Internship",
    workMode: "On-site · Technopark Trivandrum",
    experienceYears: "Fresher / Internship",
    requirements: [
      "MBA (HR) / BBA / graduates interested in HR preferred",
      "Strong communication and organisation skills",
      "Willingness to work on-site at Technopark, Trivandrum",
      "Freshers / final-year students eligible as per company criteria"
    ],
    skills: ["HR operations basics", "Recruitment coordination", "MS Office", "Communication"],
    responsibilities: [
      "Support HR day-to-day operations and documentation",
      "Assist recruitment coordination and candidate follow-ups",
      "Help with onboarding and people-ops tasks"
    ],
    benefits: ["Technopark campus experience", "Animation / media industry exposure", "Internship pathway"],
    interviewTips: [
      "Send an updated PDF resume to hr@toonzanimationindia.com",
      "Mention HR Intern + Technopark in the subject line",
      "Highlight any HR internship, campus placement, or people-ops experience"
    ],
    howToApply:
      "Apply via https://toonz.co/career/ or email your resume (PDF) to hr@toonzanimationindia.com. Always verify the live posting on the official Toonz careers page.",
    hiringNotes:
      "Category: Internships & Fellowships · Technopark Daily Alert · Closing 24 July 2026 · Posted 17 July 2026 · Apply on company careers pages.",
    description: "HR Intern · Technopark TVM · Apply by 24 Jul 2026",
    startingDate: ""
  },
  {
    id: "toonz-head-of-finance",
    company: "Toonz Animation India (P) Ltd",
    logo: "assets/logos/toonz.svg",
    companyBlurb: "Head of Finance · Technopark Trivandrum · Apply by 24 July 2026.",
    location: "Technopark, Trivandrum",
    roles: ["Head of Finance"],
    experience: "experienced",
    experienceRange: "Senior / Experienced",
    employmentType: "Full-time",
    applyLink: "https://toonz.co/career/",
    applyDeadline: "2026-07-24",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: ["Business", "Finance"],
    isWalkIn: false,
    walkInDate: "",
    email: "hr@toonzanimationindia.com",
    phone: "",
    website: "https://toonz.co/",
    address: "Technopark Campus, Thiruvananthapuram, Kerala",
    industry: "Animation / Media / Entertainment",
    companySize: "Toonz Media Group · Animation & content studio at Technopark",
    salaryRange: "Not publicly listed — confirm with Toonz HR",
    companyDetails:
      "Toonz Animation India (P) Ltd is hiring a Head of Finance for its Technopark Trivandrum operations. Official careers: https://toonz.co/career/.",
    workDetails:
      "Senior finance leadership role. Closing: 24 July 2026. Posted: 17 July 2026. On-site at Technopark, Trivandrum.",
    workStatus: "Full-time",
    workMode: "On-site · Technopark Trivandrum",
    experienceYears: "Senior / experienced finance leadership",
    requirements: [
      "Strong finance / accounting leadership background (CA / CMA / MBA Finance preferred)",
      "Experience leading finance teams and reporting for mid-to-large organisations",
      "Hands-on with budgeting, statutory compliance, and stakeholder reporting",
      "Must work on-site at Technopark, Trivandrum"
    ],
    skills: ["Financial planning", "Statutory compliance", "Budgeting & forecasting", "Team leadership", "ERP / accounting systems"],
    responsibilities: [
      "Lead finance function and reporting for the Technopark entity",
      "Own budgeting, audits, and compliance calendars",
      "Partner with leadership on commercial and investment decisions"
    ],
    benefits: ["Leadership role at Technopark", "Animation / media group exposure"],
    interviewTips: [
      "Lead with finance leadership outcomes (team size, P&L, audits)",
      "Email hr@toonzanimationindia.com with Head of Finance in the subject",
      "Be ready to discuss Kerala / India statutory compliance experience"
    ],
    howToApply:
      "Apply via https://toonz.co/career/ or email your resume to hr@toonzanimationindia.com. Confirm role details on the official careers page before applying.",
    hiringNotes:
      "Category: Internships & Fellowships section on poster (senior finance opening) · Closing 24 July 2026 · Posted 17 July 2026.",
    description: "Head of Finance · Technopark TVM · Apply by 24 Jul 2026",
    startingDate: ""
  },
  {
    id: "toonz-marketing-coordinator",
    company: "Toonz Animation India (P) Ltd",
    logo: "assets/logos/toonz.svg",
    companyBlurb: "Marketing Coordinator · Technopark Trivandrum · Apply by 24 July 2026.",
    location: "Technopark, Trivandrum",
    roles: ["Marketing Coordinator"],
    experience: "both",
    experienceRange: "Fresher + Experienced",
    employmentType: "Full-time",
    applyLink: "https://toonz.co/career/",
    applyDeadline: "2026-07-24",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: ["Marketing"],
    isWalkIn: false,
    walkInDate: "",
    email: "hr@toonzanimationindia.com",
    phone: "",
    website: "https://toonz.co/",
    address: "Technopark Campus, Thiruvananthapuram, Kerala",
    industry: "Animation / Media / Entertainment",
    companySize: "Toonz Media Group · Animation & content studio at Technopark",
    salaryRange: "Not publicly listed — confirm with Toonz HR",
    companyDetails:
      "Toonz Animation India (P) Ltd is hiring a Marketing Coordinator at Technopark, Trivandrum. Careers: https://toonz.co/career/.",
    workDetails:
      "Marketing coordination for brand, campaigns, and studio outreach. Closing: 24 July 2026. Posted: 17 July 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Technopark Trivandrum",
    experienceYears: "As per company criteria",
    requirements: [
      "Degree in Marketing, Mass Communication, Business, or related field",
      "Strong written English and social / content coordination skills",
      "Willingness to work on-site at Technopark, Trivandrum"
    ],
    skills: ["Campaign coordination", "Social media", "Content calendar", "Stakeholder communication"],
    responsibilities: [
      "Coordinate marketing campaigns and content calendars",
      "Support brand and studio outreach activities",
      "Track campaign metrics and vendor / agency follow-ups"
    ],
    benefits: ["Technopark media / animation brand exposure", "Cross-functional marketing experience"],
    interviewTips: [
      "Share a sample campaign calendar or social content portfolio",
      "Apply via toonz.co/career or hr@toonzanimationindia.com"
    ],
    howToApply:
      "Apply via https://toonz.co/career/ or email your resume to hr@toonzanimationindia.com.",
    hiringNotes:
      "Technopark Daily Alert · Closing 24 July 2026 · Posted 17 July 2026 · Apply on company careers pages.",
    description: "Marketing Coordinator · Technopark TVM · Apply by 24 Jul 2026",
    startingDate: ""
  },
  {
    id: "pickyassist-bd-executive",
    company: "Picky Assist (P) Ltd",
    logo: "assets/logos/pickyassist.svg",
    companyBlurb: "Business Development Executive · Technopark Trivandrum · Apply by 25 July 2026.",
    location: "Technopark, Trivandrum",
    roles: ["Business Development Executive"],
    experience: "both",
    experienceRange: "Fresher + Experienced",
    employmentType: "Full-time",
    applyLink: "https://pickyassist.com/en",
    applyDeadline: "2026-07-25",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: ["Sales", "Business"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://pickyassist.com/en",
    address: "Technopark / Trivandrum, Kerala",
    industry: "SaaS / Conversational CRM / Business Automation",
    companySize: "Product company · Global customers · India hub in Trivandrum",
    salaryRange: "Not publicly listed — confirm during hiring",
    companyDetails:
      "Picky Assist is a product-based SaaS company offering no/low-code conversational CRM, chatbots, and business automation. Website: https://pickyassist.com/en",
    workDetails:
      "Business Development Executive to drive outbound / inbound sales for the platform. Closing: 25 July 2026. Posted: 17 July 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Technopark / Trivandrum",
    experienceYears: "As per company criteria",
    requirements: [
      "Strong English communication for B2B SaaS conversations",
      "Interest in CRM / automation product sales",
      "Willingness to work from Trivandrum / Technopark region"
    ],
    skills: ["B2B sales", "Lead follow-up", "CRM basics", "Demo coordination"],
    responsibilities: [
      "Generate and nurture business development leads",
      "Coordinate demos and follow-ups with prospects",
      "Maintain pipeline hygiene in the company CRM"
    ],
    benefits: ["SaaS product sales exposure", "Global customer base learning"],
    interviewTips: [
      "Research Picky Assist conversational CRM offerings before the interview",
      "Apply via the official company website / careers channel listed on pickyassist.com"
    ],
    howToApply:
      "Apply directly via the company website / careers channel at https://pickyassist.com/en. Verify the live BD Executive posting before sending your resume.",
    hiringNotes:
      "Category: Internships & Fellowships section on poster · Closing 25 July 2026 · Posted 17 July 2026 · Apply on company careers pages.",
    description: "BD Executive · Technopark TVM · Apply by 25 Jul 2026",
    startingDate: ""
  },
  {
    id: "inometrics-sales-digital-marketing",
    company: "Inometrics Technology Systems (P) Ltd",
    logo: "assets/logos/inometrics.svg",
    companyBlurb: "Sales & Digital Marketing Executive · Technopark Trivandrum · Apply by 26 July 2026.",
    location: "Technopark, Trivandrum",
    roles: ["Sales & Digital Marketing Executive"],
    experience: "experienced",
    experienceRange: "Experienced",
    employmentType: "Full-time",
    applyLink: "https://www.inometrics.com",
    applyDeadline: "2026-07-26",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: ["Sales", "Marketing"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://www.inometrics.com",
    address: "Technopark Campus, Thiruvananthapuram, Kerala",
    industry: "IT Services / Technology Systems",
    companySize: "Technopark IT company",
    salaryRange: "Not publicly listed — confirm with company HR",
    companyDetails:
      "Inometrics Technology Systems (P) Ltd is hiring a Sales & Digital Marketing Executive for Technopark, Trivandrum operations.",
    workDetails:
      "Experienced sales + digital marketing dual-track role. Closing: 26 July 2026. Posted: 17 July 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Technopark Trivandrum",
    experienceYears: "Experienced (as per company)",
    requirements: [
      "Prior sales and/or digital marketing experience preferred",
      "Comfortable with lead generation, campaigns, and client follow-ups",
      "Willingness to work on-site at Technopark, Trivandrum"
    ],
    skills: ["Digital marketing", "Lead generation", "Social ads basics", "B2B sales"],
    responsibilities: [
      "Drive sales pipeline and digital marketing campaigns",
      "Coordinate lead follow-ups and campaign reporting",
      "Support brand visibility for Technopark offerings"
    ],
    benefits: ["Technopark role", "Sales + marketing dual exposure"],
    interviewTips: [
      "Prepare examples of campaigns or sales targets you owned",
      "Apply via the company website / official careers channel"
    ],
    howToApply:
      "Apply directly on the company careers / contact channel (verify live posting on the Inometrics website). Keep resume as PDF.",
    hiringNotes:
      "Category: Experienced Professionals · Closing 26 July 2026 · Posted 17 July 2026 · Technopark Daily Alert.",
    description: "Sales & Digital Marketing Exec · Technopark · Apply by 26 Jul 2026",
    startingDate: ""
  },
  {
    id: "gnx-technical-ba-pm",
    company: "GNX Digital Solutions (P) Ltd",
    logo: "assets/logos/gnx.svg",
    companyBlurb: "Technical Business Analyst cum Project Manager · Technopark Trivandrum · Apply by 28 July 2026.",
    location: "Technopark, Trivandrum",
    roles: ["Technical Business Analyst CUM Project Manager"],
    experience: "experienced",
    experienceRange: "Experienced",
    employmentType: "Full-time",
    applyLink: "mailto:sumi.h@gnxsolutions.in",
    applyDeadline: "2026-07-28",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Business"],
    isWalkIn: false,
    walkInDate: "",
    email: "sumi.h@gnxsolutions.in",
    phone: "",
    website: "https://www.gnxsolutions.in",
    address: "Nila, Technopark, Thiruvananthapuram, Kerala",
    industry: "IT Services / Digital Solutions",
    companySize: "Growing Technopark IT firm · Nila campus",
    salaryRange: "Not publicly listed — confirm with GNX HR",
    companyDetails:
      "GNX Digital Solutions (P) Ltd operates from Nila, Technopark, Trivandrum. Hiring for Technical BA + Project Manager combined track.",
    workDetails:
      "Technical Business Analyst cum Project Manager. Closing: 28 July 2026. Posted: 17 July 2026. On-site Technopark.",
    workStatus: "Full-time",
    workMode: "On-site · Nila, Technopark Trivandrum",
    experienceYears: "Experienced (BA + PM track)",
    requirements: [
      "Hands-on business analysis and project coordination experience",
      "Ability to gather requirements and drive delivery with engineering teams",
      "Strong documentation (BRD / SRS / process flows) skills",
      "Agile / Scrum familiarity preferred",
      "On-site at Technopark, Trivandrum"
    ],
    skills: ["Business analysis", "Project management", "Requirement gathering", "Agile / Scrum", "Stakeholder management"],
    responsibilities: [
      "Gather and document business / technical requirements",
      "Coordinate delivery timelines with engineering and stakeholders",
      "Track project risks, status, and acceptance criteria"
    ],
    benefits: ["Technopark Nila campus", "BA + PM dual-track growth"],
    interviewTips: [
      "Email resume to sumi.h@gnxsolutions.in with role title in subject",
      "Bring sample BRD / SRS / process-flow examples if available",
      "Be ready to discuss Agile delivery and stakeholder management"
    ],
    howToApply:
      "Email your resume to sumi.h@gnxsolutions.in or apply via the company’s official hiring channel. Mention Technical BA cum Project Manager.",
    hiringNotes:
      "Category: Experienced Professionals · Closing 28 July 2026 · Posted 17 July 2026 · Technopark Daily Alert.",
    description: "Technical BA cum PM · Technopark · Apply by 28 Jul 2026",
    startingDate: ""
  },
  {
    id: "zestybeanz-odoo-developer",
    company: "Zesty Beanz Technologies (P) Ltd",
    logo: "assets/logos/zestybeanz.svg",
    companyBlurb: "Odoo Developer (1–2 years) · Technopark Trivandrum · Apply by 31 Aug 2026.",
    location: "Technopark, Trivandrum",
    roles: ["Odoo Developer"],
    experience: "experienced",
    experienceRange: "1–2 Years",
    employmentType: "Full-time",
    applyLink: "https://zbeanztech.com/jobs",
    applyDeadline: "2026-08-31",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Development"],
    isWalkIn: false,
    walkInDate: "",
    email: "contact@zbeanztech.com",
    phone: "+91 9895834246",
    website: "https://zbeanztech.com/",
    address: "Technopark / Thiruvananthapuram, Kerala",
    industry: "Odoo ERP / Digital Transformation",
    companySize: "100+ experts · Official Odoo Partner · India / UAE / Germany",
    salaryRange: "Not publicly listed — confirm with Zesty Beanz HR",
    companyDetails:
      "Zesty Beanz Technologies is an Official Odoo Partner delivering ERP, e-commerce, DevOps, and mobile solutions. Careers: https://zbeanztech.com/jobs — contact@zbeanztech.com.",
    workDetails:
      "Odoo Developer with 1–2 years experience. Closing: 31 Aug 2026. Posted: 17 July 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Technopark / Trivandrum",
    experienceYears: "1–2 years",
    requirements: [
      "1–2 years Odoo / Python development experience",
      "Understanding of Odoo modules, ORM, and customisation",
      "BE / B.Tech / MCA or equivalent preferred",
      "Willingness to work from Technopark / Trivandrum"
    ],
    skills: ["Odoo", "Python", "PostgreSQL", "XML / QWeb", "ERP customisation"],
    responsibilities: [
      "Develop and customise Odoo modules",
      "Support ERP implementations and client change requests",
      "Debug, test, and document Odoo customisations"
    ],
    benefits: ["Official Odoo Partner environment", "Global delivery exposure"],
    interviewTips: [
      "Highlight Odoo version experience and sample custom modules",
      "Email contact@zbeanztech.com or apply via https://zbeanztech.com/jobs",
      "Be ready for Python + Odoo technical screening"
    ],
    howToApply:
      "Apply via https://zbeanztech.com/jobs or email contact@zbeanztech.com. Phone: +91 9895834246. Verify the live Odoo Developer posting before applying.",
    hiringNotes:
      "Category: Experienced Professionals · Closing 31 Aug 2026 · Posted 17 July 2026 · Technopark Daily Alert.",
    description: "Odoo Developer · 1–2 Yrs · Technopark · Apply by 31 Aug 2026",
    startingDate: ""
  },
  {
    id: "prompttech-insurance-team-lead",
    company: "PromptTech",
    logo: "assets/logos/prompttech.svg",
    companyBlurb: "Insurance – Team Lead · Technopark Trivandrum · Apply by 17 Aug 2026.",
    location: "Technopark, Trivandrum",
    roles: ["Insurance - Team Lead"],
    experience: "experienced",
    experienceRange: "Team Lead / Experienced",
    employmentType: "Full-time",
    applyLink: "",
    applyDeadline: "2026-08-17",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: ["Business", "Insurance"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "",
    address: "Technopark Campus, Thiruvananthapuram, Kerala",
    industry: "Insurance / BPO / IT-enabled services",
    companySize: "Technopark operations",
    salaryRange: "Not publicly listed — confirm with PromptTech HR",
    companyDetails:
      "PromptTech is hiring an Insurance Team Lead for Technopark, Trivandrum. Apply via the company’s official careers / HR channel listed on the Technopark job alert.",
    workDetails:
      "Insurance Team Lead role. Closing: 17 Aug 2026. Posted: 17 July 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Technopark Trivandrum",
    experienceYears: "Team lead / experienced (insurance domain)",
    requirements: [
      "Prior insurance process / BPO leadership experience preferred",
      "Strong people management and quality ownership",
      "Willingness to work on-site at Technopark, Trivandrum"
    ],
    skills: ["Team leadership", "Insurance operations", "Quality monitoring", "Workforce management"],
    responsibilities: [
      "Lead insurance operations team and daily SLAs",
      "Coach agents and monitor quality / productivity",
      "Escalate process risks and drive continuous improvement"
    ],
    benefits: ["Team leadership track", "Technopark campus role"],
    interviewTips: [
      "Prepare metrics from previous team lead roles (AHT, quality, attrition)",
      "Apply via the official PromptTech careers / HR channel shown on the company posting"
    ],
    howToApply:
      "Apply directly on the company careers page / HR contact published with the Technopark job alert. Verify role details with PromptTech before applying.",
    hiringNotes:
      "Category: Experienced Professionals · Closing 17 Aug 2026 · Posted 17 July 2026 · Technopark Daily Alert.",
    description: "Insurance Team Lead · Technopark · Apply by 17 Aug 2026",
    startingDate: ""
  },
  {
    id: "softnotions-operations-trainee",
    company: "Softnotions Technologies (P) Ltd",
    logo: "assets/logos/softnotions.svg",
    companyBlurb: "Operations Trainee · Technopark Trivandrum · Apply by 24 July 2026.",
    location: "Technopark, Trivandrum",
    roles: ["Operations Trainee"],
    experience: "fresher",
    experienceRange: "Trainee / Freshers",
    employmentType: "Full-time",
    applyLink: "https://softnotions-team.freshteam.com/jobs",
    applyDeadline: "2026-07-24",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: ["Business", "Operations"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://softnotions.com/",
    address: "Technopark Campus, Thiruvananthapuram, Kerala",
    industry: "IT Services / Software Product",
    companySize: "Technopark software company · Trivandrum + Kochi presence",
    salaryRange: "Trainee package — confirm with Softnotions HR",
    companyDetails:
      "Softnotions Technologies is an innovative software company in Technopark, Trivandrum. Careers portal: https://softnotions-team.freshteam.com/jobs — also https://softnotions.com/who-we-are/job-openings/",
    workDetails:
      "Operations Trainee role. Closing: 24 July 2026. Posted: 17 July 2026.",
    workStatus: "Full-time · Trainee",
    workMode: "On-site · Technopark Trivandrum",
    experienceYears: "Fresher / Trainee",
    requirements: [
      "Graduate / postgraduate willing to start in operations",
      "Good communication and process discipline",
      "Willingness to work on-site at Technopark, Trivandrum"
    ],
    skills: ["Operations coordination", "MS Office", "Process documentation", "Communication"],
    responsibilities: [
      "Support day-to-day operations workflows",
      "Coordinate internal process follow-ups",
      "Maintain operational trackers and documentation"
    ],
    benefits: ["Technopark trainee start", "Softnotions learning culture"],
    interviewTips: [
      "Apply via Freshteam: https://softnotions-team.freshteam.com/jobs",
      "Keep resume as PDF and tailor for operations / coordination"
    ],
    howToApply:
      "Apply via https://softnotions-team.freshteam.com/jobs or Softnotions job openings page. Prefer official Softnotions careers portal over third-party forwards.",
    hiringNotes:
      "Category: Experienced Professionals section on poster (trainee track) · Closing 24 July 2026 · Posted 17 July 2026.",
    description: "Operations Trainee · Technopark · Apply by 24 Jul 2026",
    startingDate: ""
  },
  {
    id: "relaxplzz-react-training",
    company: "Relaxplzz Technologies",
    logo: "assets/logos/relaxplzz.svg",
    companyBlurb: "React JS Training — Freshers Welcome · Technopark Trivandrum · Apply by 31 July 2026.",
    location: "Technopark, Trivandrum",
    roles: ["React JS Training - Freshers Welcome"],
    experience: "fresher",
    experienceRange: "Fresher / Training",
    employmentType: "Internship",
    applyLink: "",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Development", "Internship"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "",
    address: "Technopark / Trivandrum, Kerala",
    industry: "IT Training / Software Development",
    companySize: "Technopark / Trivandrum tech training & services",
    salaryRange: "Training programme — confirm stipend / fee terms with company",
    companyDetails:
      "Relaxplzz Technologies is inviting freshers for React JS training at Technopark / Trivandrum. Confirm programme terms directly with the company before enrolling or applying.",
    workDetails:
      "React JS Training — Freshers Welcome. Closing: 31 July 2026. Posted: 17 July 2026.",
    workStatus: "Training / Fresher programme",
    workMode: "On-site · Technopark / Trivandrum",
    experienceYears: "Fresher",
    requirements: [
      "Freshers welcome — BE / B.Tech / BCA / MCA / B.Sc (CS / IT) preferred",
      "Basic programming interest; React beginners accepted as per company criteria",
      "Willingness to attend on-site at Technopark / Trivandrum"
    ],
    skills: ["JavaScript basics", "HTML / CSS", "Willingness to learn React", "Git basics"],
    responsibilities: [
      "Complete React JS training modules",
      "Build practice projects as assigned",
      "Follow programme schedule and assessments"
    ],
    benefits: ["Fresher-friendly React pathway", "Technopark training environment"],
    interviewTips: [
      "Clarify whether the programme is paid training, stipend internship, or placement-linked",
      "Ask for official offer / joining letter terms in writing",
      "Never pay recruitment fees — InfoparkDaily never charges candidates"
    ],
    howToApply:
      "Apply directly via the Relaxplzz company careers / contact channel published with the Technopark alert. Verify training vs employment terms before joining.",
    hiringNotes:
      "Category: Freshers & Trainee Roles · Closing 31 July 2026 · Posted 17 July 2026 · Disclaimer: confirm fee/stipend terms with company. InfoparkDaily never charges candidates.",
    description: "React JS Training · Freshers · Technopark · Apply by 31 Jul 2026",
    startingDate: ""
  },
  {
    id: "sementor-data-engineer",
    company: "SE-Mentor Solutions (P) Ltd",
    logo: "assets/logos/sementor.svg",
    companyBlurb: "Data Engineer · Technopark Trivandrum · Apply by 24 July 2026.",
    location: "Technopark, Trivandrum",
    roles: ["Data Engineer"],
    experience: "fresher",
    experienceRange: "Fresher / Entry-level",
    employmentType: "Full-time",
    applyLink: "",
    applyDeadline: "2026-07-24",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Data"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "",
    address: "Technopark Campus, Thiruvananthapuram, Kerala",
    industry: "IT Services / Data Engineering",
    companySize: "Technopark IT services",
    salaryRange: "Not publicly listed — confirm with SE-Mentor HR",
    companyDetails:
      "SE-Mentor Solutions (P) Ltd is hiring a Data Engineer at Technopark, Trivandrum as part of the July 2026 Technopark daily job alert.",
    workDetails:
      "Data Engineer role. Closing: 24 July 2026. Posted: 17 July 2026. Location: Technopark, Trivandrum.",
    workStatus: "Full-time",
    workMode: "On-site · Technopark Trivandrum",
    experienceYears: "Fresher / entry-level as per company",
    requirements: [
      "BE / B.Tech / MCA / B.Sc (CS / IT) preferred",
      "Interest in data pipelines, SQL, and ETL concepts",
      "Willingness to work on-site at Technopark, Trivandrum"
    ],
    skills: ["SQL", "ETL basics", "Python preferred", "Data warehousing concepts"],
    responsibilities: [
      "Support data pipeline development and maintenance",
      "Write and optimise SQL / data transformations",
      "Collaborate with analytics and engineering teams"
    ],
    benefits: ["Technopark data engineering start", "Hands-on ETL / pipeline exposure"],
    interviewTips: [
      "Revise SQL joins, ETL concepts, and basic Python",
      "Apply via SE-Mentor official careers / HR channel from the Technopark posting"
    ],
    howToApply:
      "Apply directly on the SE-Mentor company careers page / HR email published with the Technopark job alert.",
    hiringNotes:
      "Category: Freshers & Trainee Roles · Closing 24 July 2026 · Posted 17 July 2026 · Technopark Daily Alert.",
    description: "Data Engineer · Technopark TVM · Apply by 24 Jul 2026",
    startingDate: ""
  },
  {
    id: "sementor-etl-tester",
    company: "SE-Mentor Solutions (P) Ltd",
    logo: "assets/logos/sementor.svg",
    companyBlurb: "ETL Tester · Technopark Trivandrum · Apply by 31 July 2026.",
    location: "Technopark, Trivandrum",
    roles: ["ETL Tester"],
    experience: "fresher",
    experienceRange: "Fresher / Entry-level",
    employmentType: "Full-time",
    applyLink: "",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "QA", "Data"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "",
    address: "Technopark Campus, Thiruvananthapuram, Kerala",
    industry: "IT Services / Data QA",
    companySize: "Technopark IT services",
    salaryRange: "Not publicly listed — confirm with SE-Mentor HR",
    companyDetails:
      "SE-Mentor Solutions (P) Ltd is hiring an ETL Tester at Technopark, Trivandrum.",
    workDetails:
      "ETL Tester role. Closing: 31 July 2026. Posted: 17 July 2026. Location: Technopark, Trivandrum.",
    workStatus: "Full-time",
    workMode: "On-site · Technopark Trivandrum",
    experienceYears: "Fresher / entry-level as per company",
    requirements: [
      "BE / B.Tech / MCA / B.Sc (CS / IT) preferred",
      "Interest in testing, SQL, and data validation",
      "Willingness to work on-site at Technopark, Trivandrum"
    ],
    skills: ["ETL testing", "SQL", "Test case design", "Defect tracking"],
    responsibilities: [
      "Validate ETL mappings and data transformations",
      "Write test cases and log defects",
      "Compare source vs target data quality"
    ],
    benefits: ["Technopark QA / data testing start", "Hands-on ETL validation experience"],
    interviewTips: [
      "Revise SQL and basic ETL testing scenarios",
      "Apply via SE-Mentor official careers / HR channel"
    ],
    howToApply:
      "Apply directly on the SE-Mentor company careers page / HR email published with the Technopark job alert.",
    hiringNotes:
      "Category: Freshers & Trainee Roles · Closing 31 July 2026 · Posted 17 July 2026 · Technopark Daily Alert.",
    description: "ETL Tester · Technopark TVM · Apply by 31 Jul 2026",
    startingDate: ""
  },
  {
    id: "gescis-php-developer",
    company: "Gescis Technologies",
    logo: "assets/logos/gescis.svg",
    companyBlurb: "PHP Developer (0–1 Yr) · Technopark Trivandrum · Apply by 07 Aug 2026.",
    location: "Technopark, Trivandrum",
    roles: ["PHP Developer"],
    experience: "fresher",
    experienceRange: "0–1 Year",
    employmentType: "Full-time",
    applyLink: "",
    applyDeadline: "2026-08-07",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Development"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "",
    address: "Technopark / Trivandrum, Kerala",
    industry: "IT Services / Web Development",
    companySize: "Technopark / Trivandrum tech company",
    salaryRange: "Not publicly listed — confirm with Gescis HR",
    companyDetails:
      "Gescis Technologies is hiring a PHP Developer (0–1 year experience) for Technopark / Trivandrum operations.",
    workDetails:
      "PHP Developer with 0–1 year experience. Closing: 07 Aug 2026. Posted: 17 July 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Technopark / Trivandrum",
    experienceYears: "0–1 year",
    requirements: [
      "0–1 year PHP development experience (freshers with projects welcome)",
      "BE / B.Tech / BCA / MCA / B.Sc (CS / IT) preferred",
      "Basic MySQL and web fundamentals",
      "Willingness to work on-site at Technopark / Trivandrum"
    ],
    skills: ["PHP", "MySQL", "HTML / CSS / JavaScript", "Laravel / CodeIgniter familiarity preferred"],
    responsibilities: [
      "Build and maintain PHP web applications",
      "Write and optimise MySQL queries",
      "Fix bugs and ship incremental features"
    ],
    benefits: ["Entry-level PHP role", "Technopark / Trivandrum location"],
    interviewTips: [
      "Prepare a GitHub / project demo of PHP work",
      "Revise PHP basics, MySQL, and one framework if listed",
      "Apply via Gescis official careers / HR channel from the Technopark posting"
    ],
    howToApply:
      "Apply directly on the Gescis Technologies careers page / HR contact published with the Technopark job alert.",
    hiringNotes:
      "Category: Freshers & Trainee Roles · Closing 07 Aug 2026 · Posted 17 July 2026 · Technopark Daily Alert.",
    description: "PHP Developer · 0–1 Yr · Technopark · Apply by 07 Aug 2026",
    startingDate: ""
  },
  {
    id: "urolime-hr-recruiter",
    company: "Urolime Technologies",
    logo: "assets/logos/urolime.svg",
    companyBlurb: "HR Recruiter (1–3 years) · Infopark Kochi · Apply by 28 July 2026 via Urolime Careers.",
    location: "Infopark, Kakkanad, Kochi",
    roles: ["HR Recruiter"],
    experience: "experienced",
    experienceRange: "1–3 Years",
    employmentType: "Full-time",
    applyLink: "https://www.urolime.com/in/careers.html",
    applyDeadline: "2026-07-28",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: ["HR"],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@urolime.com",
    phone: "+91 484 2984589",
    website: "https://www.urolime.com/",
    address: "6th Floor, Office No.6A-2, Wing 1, Jyothirmaya Building, Infopark Phase II, Puthencruz / Kakkanad, Ernakulam, Kerala 682303",
    industry: "DevOps / Cloud Consulting / IT Services",
    companySize: "Global team · India hub at Infopark Kochi (also UAE, USA, UK)",
    salaryRange: "Not publicly listed — confirm with Urolime HR during process",
    companyDetails:
      "Urolime Technologies is a DevOps, AWS, and cloud consulting company with product engineering and managed services offerings. The Kochi delivery hub sits in Jyothirmaya, Infopark Phase II. Official careers: https://www.urolime.com/in/careers.html — applications also accepted at careers@urolime.com.",
    workDetails:
      "HR Recruiter (1–3 years) for Infopark Kochi hiring across DevOps, cloud, and engineering roles. Work mode: on-site. Last date: 28 July 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Infopark Kochi",
    experienceYears: "1–3 years",
    requirements: [
      "1–3 years recruitment / talent acquisition experience",
      "Graduate / postgraduate in HR, Business, or related field preferred",
      "Strong English communication for technical hiring coordination",
      "Hands-on with LinkedIn, Naukri, and campus / referral sourcing",
      "Must work on-site at Infopark Phase II, Kakkanad"
    ],
    skills: [
      "Full-cycle recruitment",
      "Technical hiring coordination",
      "ATS / tracker hygiene",
      "Stakeholder management",
      "Screening & interview scheduling"
    ],
    responsibilities: [
      "Source and screen candidates for Urolime openings",
      "Coordinate interviews with hiring managers",
      "Own candidate experience from outreach to offer support",
      "Maintain pipeline reports and hiring SLAs"
    ],
    benefits: [
      "Infopark Kochi campus role",
      "Global DevOps / cloud company exposure",
      "Supportive high-energy engineering culture (per Urolime careers page)",
      "Direct apply via official careers + careers@urolime.com"
    ],
    interviewTips: [
      "Keep a PDF resume with measurable hiring metrics (time-to-hire, roles closed)",
      "Highlight any DevOps / IT / cloud hiring experience",
      "Apply only via Urolime Careers or careers@urolime.com — avoid unofficial agents",
      "Be ready to discuss Infopark on-site availability"
    ],
    howToApply:
      "Apply on Urolime Careers: https://www.urolime.com/in/careers.html or email PDF resume to careers@urolime.com with subject “HR Recruiter – Infopark Kochi”.",
    hiringNotes:
      "Category: HR · Last date 28 July 2026 · Official careers https://www.urolime.com/in/careers.html · Map: Jyothirmaya, Infopark Phase II. Verify live openings on the careers page before applying.",
    description: "HR Recruiter · 1–3 Yrs · Infopark · Apply by 28 Jul 2026",
    startingDate: ""
  },
  {
    id: "alphasky-hr-admin",
    company: "Alphasky Ventures Pvt. Ltd.",
    logo: "assets/logos/alphasky.svg",
    companyBlurb: "HR & Admin Executive (1–3 years) · Infopark Kochi · Apply via company website / HR contact by 31 July 2026.",
    location: "Infopark, Kakkanad, Kochi",
    roles: ["HR & Admin Executive"],
    experience: "experienced",
    experienceRange: "1–3 Years",
    employmentType: "Full-time",
    applyLink: "https://www.alphasky.in",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: ["HR"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://www.alphasky.in",
    address: "Infopark, Kakkanad, Kochi, Kerala",
    industry: "Business / Ventures",
    companySize: "Growing Infopark Kochi team (exact headcount not public)",
    salaryRange: "Not publicly listed — ask HR during process",
    companyDetails:
      "Alphasky Ventures Pvt. Ltd. operates from Infopark Kochi and is hiring an HR & Admin Executive. Official website: https://www.alphasky.in — no separate public careers microsite was listed, so apply via the company website or official HR contact.",
    workDetails:
      "Combined people-ops + office admin role (1–3 years), on-site at Infopark Kakkanad. Last date: 31 July 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Infopark Kochi",
    experienceYears: "1–3 years",
    requirements: [
      "1–3 years HR and/or administration experience",
      "Graduate / MBA (HR) / BBA preferred",
      "Knowledge of recruitment support, attendance, and office coordination",
      "Strong organisation and written communication"
    ],
    skills: [
      "HR operations",
      "Office administration",
      "Recruitment coordination",
      "Vendor / facility coordination",
      "MS Office / Google Workspace"
    ],
    responsibilities: [
      "Run day-to-day HR processes and employee coordination",
      "Support recruitment documentation and onboarding",
      "Handle office admin, vendors, and facility follow-ups",
      "Maintain compliance and HR record hygiene"
    ],
    benefits: [
      "Infopark Kochi location",
      "Cross-functional HR + Admin exposure",
      "Direct company website / HR apply path"
    ],
    interviewTips: [
      "Prepare examples of HR + admin ownership in prior roles",
      "Carry PDF resume and ID proofs for Infopark on-site interviews",
      "Confirm apply channel on alphasky.in — no fee should be charged"
    ],
    howToApply:
      "Apply via the Alphasky company website https://www.alphasky.in or the official HR contact listed there. Prefer PDF resume titled “HR & Admin Executive – Infopark”.",
    hiringNotes:
      "Category: HR · Last date 31 July 2026 · Official site https://www.alphasky.in · alphaskyventures.com may not be an active careers host — use alphasky.in / official HR only.",
    description: "HR & Admin Executive · 1–3 Yrs · Infopark · Apply by 31 Jul 2026",
    startingDate: ""
  },
  {
    id: "cascade-senior-hr-recruiter",
    company: "Cascade Revenue Management Pvt. Ltd.",
    logo: "assets/logos/cascade.svg",
    companyBlurb: "Senior HR Recruiter (3–6 years) · Infopark Kochi · Apply via cascaderevenue.com by 31 Aug 2026.",
    location: "Infopark, Kakkanad, Kochi",
    roles: ["Senior HR Recruiter"],
    experience: "experienced",
    experienceRange: "3–6 Years",
    employmentType: "Full-time",
    applyLink: "https://www.cascaderevenue.com",
    applyDeadline: "2026-08-31",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: ["HR"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://www.cascaderevenue.com",
    address: "Infopark, Kakkanad, Kochi, Kerala",
    industry: "Revenue Cycle Management / Healthcare Business Services",
    companySize: "Mid-size RCM / healthcare operations employer (confirm on company site)",
    salaryRange: "Not publicly listed — senior recruiter band; confirm with HR",
    companyDetails:
      "Cascade Revenue Management Pvt. Ltd. focuses on revenue-cycle / healthcare business operations and is hiring a Senior HR Recruiter at Infopark Kochi. Official website: https://www.cascaderevenue.com — check Careers / Contact for live openings.",
    workDetails:
      "Senior recruiting ownership (3–6 years) for volume and specialised hiring. On-site Infopark. Last date: 31 August 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Infopark Kochi",
    experienceYears: "3–6 years",
    requirements: [
      "3–6 years full-cycle recruitment experience",
      "Proven sourcing via LinkedIn, job portals, and employee referrals",
      "Experience hiring for process / healthcare / ITeS roles preferred",
      "Strong stakeholder and offer-negotiation skills"
    ],
    skills: [
      "Talent acquisition leadership",
      "Boolean / LinkedIn sourcing",
      "Pipeline & funnel reporting",
      "Interview panel coordination",
      "Employer branding basics"
    ],
    responsibilities: [
      "Own priority requisitions end-to-end",
      "Improve time-to-hire and quality-of-hire metrics",
      "Partner with business leaders on hiring plans",
      "Mentor junior recruiters when needed"
    ],
    benefits: [
      "Infopark Kochi campus",
      "Senior TA ownership",
      "Healthcare / RCM domain exposure"
    ],
    interviewTips: [
      "Quantify past hiring (roles closed, channels used, SLAs hit)",
      "Prepare healthcare / process hiring examples if you have them",
      "Apply only via cascaderevenue.com Careers/Contact"
    ],
    howToApply:
      "Apply via https://www.cascaderevenue.com — use Careers or Contact channels listed on the official site. PDF resume recommended.",
    hiringNotes:
      "Category: HR · Last date 31 August 2026 · Official site https://www.cascaderevenue.com · Verify openings on Careers/Contact before applying.",
    description: "Senior HR Recruiter · 3–6 Yrs · Infopark · Apply by 31 Aug 2026",
    startingDate: ""
  },
  {
    id: "newagesys-recruitment-coordinator",
    company: "NewAgeSys Solutions Pvt. Ltd.",
    logo: "assets/logos/newagesys.svg",
    companyBlurb: "Associate Recruitment Coordinator (0–2 years) · Carnival Infopark · Apply via NewAgeSys Careers.",
    location: "Infopark, Kakkanad, Kochi",
    roles: ["Associate Recruitment Coordinator"],
    experience: "both",
    experienceRange: "0–2 Years",
    employmentType: "Full-time",
    applyLink: "https://newagesyssolutions.com/careers-newagesys/",
    applyDeadline: "2026-07-20",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: ["HR"],
    isWalkIn: false,
    walkInDate: "",
    email: "info@newagesysindia.com",
    phone: "",
    website: "https://newagesyssolutions.com/",
    address: "7th Floor, Phase II, Carnival Infopark, Kakkanad, Ernakulam, Kochi, Kerala",
    industry: "IT Services / Mobile & Web Development (US parent since 1994)",
    companySize: "India delivery centre at Carnival Infopark Phase 2 · serves NA, UK, EU, ME, APAC clients",
    salaryRange: "Not publicly listed — early-career HR band; confirm with NewAgeSys",
    companyDetails:
      "NewAgeSys Solutions (NewAgeSys IT / NewAgeSys India) is a US-founded (1994) mobile and web development firm with its Kochi centre at Carnival Infopark Phase 2. Official careers: https://newagesyssolutions.com/careers-newagesys/ · support email: info@newagesysindia.com.",
    workDetails:
      "Associate Recruitment Coordinator (0–2 years) supporting hiring coordination for Infopark delivery teams. Typical campus shift noted on careers pages: ~11 AM–8 PM onsite. Listed last date: 20 July 2026 — reconfirm on careers page.",
    workStatus: "Full-time",
    workMode: "On-site · Carnival Infopark Phase 2",
    experienceYears: "0–2 years",
    requirements: [
      "0–2 years recruitment coordination / HR support experience (freshers welcome)",
      "Graduate / MBA (HR) / BBA preferred",
      "Excellent English communication for international delivery environment",
      "Comfort with Excel trackers / basic ATS workflows",
      "On-site at Carnival Infopark, Kakkanad"
    ],
    skills: [
      "Interview scheduling",
      "Candidate communication",
      "Recruitment trackers",
      "Screening follow-ups",
      "Onboarding coordination support"
    ],
    responsibilities: [
      "Coordinate interviews and candidate updates",
      "Maintain recruitment trackers and status reports",
      "Support sourcing follow-ups for open roles",
      "Assist HR with documentation and onboarding tasks"
    ],
    benefits: [
      "Carnival Infopark Phase 2 campus",
      "Exposure to US / global client delivery culture",
      "Official NewAgeSys careers portal"
    ],
    interviewTips: [
      "Apply only on https://newagesyssolutions.com/careers-newagesys/",
      "Mention Infopark on-site availability and shift comfort",
      "Keep PDF resume + any internship / campus recruitment proof ready"
    ],
    howToApply:
      "Apply via NewAgeSys Careers: https://newagesyssolutions.com/careers-newagesys/ . For queries: info@newagesysindia.com. Prefer PDF resume for Associate Recruitment Coordinator.",
    hiringNotes:
      "Category: HR · Listed last date 20 July 2026 (may show as expired) · Careers https://newagesyssolutions.com/careers-newagesys/ · Map: Carnival Infopark Phase II, Kakkanad.",
    description: "Associate Recruitment Coordinator · 0–2 Yrs · Carnival Infopark",
    startingDate: ""
  },
  {
    id: "edstem-business-analyst",
    company: "Edstem Technologies",
    logo: "assets/logos/edstem.svg",
    companyBlurb: "Business Analyst · Infopark Phase II · Apply via Edstem Careers (edstem.com/careers).",
    location: "Infopark, Kakkanad, Kochi",
    roles: ["Business Analyst"],
    experience: "experienced",
    experienceRange: "Relevant Experience",
    employmentType: "Full-time",
    applyLink: "https://www.edstem.com/careers/",
    applyDeadline: "2026-07-20",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Business"],
    isWalkIn: false,
    walkInDate: "",
    email: "info@edstem.com",
    phone: "+91 224 618 3018",
    website: "https://www.edstem.com/",
    address: "Office No-2B-1, Second Floor, Jyothirmaya, Infopark Phase II, Ernakulam, Kerala 682303",
    industry: "Product Engineering / IT Services · AWS Partner · ISO 27001 & ISO 9001",
    companySize: "Product & engineering teams in India (Infopark) + USA (Delaware)",
    salaryRange: "Not publicly listed — confirm with Edstem recruiting",
    companyDetails:
      "Edstem Technologies builds product engineering solutions with offices in Infopark Phase II (Jyothirmaya) and Delaware, USA. ISO 27001:2022 & ISO 9001:2015 certified AWS Partner. Official careers: https://www.edstem.com/careers/ · info@edstem.com.",
    workDetails:
      "Business Analyst role for Infopark Kochi with relevant BA experience. On-site at Jyothirmaya, Infopark Phase II. Listed last date: 20 July 2026 — reconfirm on Edstem Careers.",
    workStatus: "Full-time",
    workMode: "On-site · Infopark Phase II",
    experienceYears: "Relevant BA experience",
    requirements: [
      "Relevant Business Analyst experience in product / IT delivery",
      "Strong requirement gathering and documentation skills",
      "Ability to work with engineering and business stakeholders",
      "On-site at Infopark Phase II, Kochi"
    ],
    skills: [
      "Requirements analysis",
      "User stories / acceptance criteria",
      "Process mapping",
      "Stakeholder workshops",
      "UAT coordination"
    ],
    responsibilities: [
      "Elicit and document product / business requirements",
      "Clarify scope with engineering and stakeholders",
      "Support backlog readiness and UAT",
      "Maintain clear specs and change communication"
    ],
    benefits: [
      "Jyothirmaya Infopark Phase II campus",
      "AWS Partner / ISO-certified organisation",
      "India–USA delivery exposure",
      "Official Edstem Careers apply path"
    ],
    interviewTips: [
      "Apply only via https://www.edstem.com/careers/",
      "Bring BA artefacts examples (sanitised PRDs / user stories)",
      "Highlight domain + stakeholder communication strengths"
    ],
    howToApply:
      "Apply on Edstem Careers: https://www.edstem.com/careers/ . Contact: info@edstem.com | India +91 224 618 3018.",
    hiringNotes:
      "Category: IT · Listed last date 20 July 2026 · Careers https://www.edstem.com/careers/ · Map: Jyothirmaya, Infopark Phase II.",
    description: "Business Analyst · Relevant Exp · Infopark Phase II",
    startingDate: ""
  },
  {
    id: "thomson-ba-implementation",
    company: "Thomson Infocare LLP",
    logo: "assets/logos/thomson.svg",
    companyBlurb: "Business Analyst / Implementation Engineer · Infopark Kochi · Apply via company Careers by 10 Aug 2026.",
    location: "Infopark, Kakkanad, Kochi",
    roles: ["Business Analyst / Implementation Engineer"],
    experience: "experienced",
    experienceRange: "Relevant Experience",
    employmentType: "Full-time",
    applyLink: "https://thomsuninfo.com/careers",
    applyDeadline: "2026-08-10",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Business"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://thomsuninfo.com/careers",
    address: "Infopark, Kakkanad, Kochi, Kerala",
    industry: "IT Services / Implementation Consulting",
    companySize: "Infopark Kochi delivery team (exact headcount not public)",
    salaryRange: "Not publicly listed — confirm during hiring process",
    companyDetails:
      "Thomson Infocare LLP (listed careers host: thomsuninfo.com) is hiring a Business Analyst / Implementation Engineer at Infopark Kochi. Official careers: https://thomsuninfo.com/careers — apply via the company careers page.",
    workDetails:
      "Hybrid BA + implementation role for solution rollout and client configuration. On-site Infopark. Last date: 10 August 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Infopark Kochi",
    experienceYears: "Relevant BA / implementation experience",
    requirements: [
      "Relevant Business Analyst or implementation experience",
      "Ability to translate requirements into workflows / configurations",
      "Strong client communication and documentation",
      "Willingness to work on-site at Infopark, Kakkanad"
    ],
    skills: [
      "Requirements analysis",
      "Solution configuration / implementation",
      "Client workshops",
      "UAT & go-live support",
      "Process documentation"
    ],
    responsibilities: [
      "Analyse client requirements and map to product capabilities",
      "Configure / implement solutions and support go-live",
      "Train users and maintain process docs",
      "Coordinate with delivery and support teams"
    ],
    benefits: [
      "Infopark Kochi campus",
      "BA + Implementation dual exposure",
      "Official company careers apply path"
    ],
    interviewTips: [
      "Apply via https://thomsuninfo.com/careers",
      "Prepare implementation / BA case examples",
      "If the careers page is temporarily unreachable, recheck later or use Infopark company job listings — never pay agents"
    ],
    howToApply:
      "Apply via Thomson Infocare / Thomsun careers: https://thomsuninfo.com/careers . Fallback discovery: Infopark companies job portal.",
    hiringNotes:
      "Category: IT · Last date 10 August 2026 · Official careers https://thomsuninfo.com/careers · Always verify on the company careers page before sharing personal documents.",
    description: "BA / Implementation Engineer · Infopark · Apply by 10 Aug 2026",
    startingDate: ""
  },
  {
    id: "urolime-devops-hiring",
    company: "Urolime Technologies",
    logo: "assets/logos/urolime.svg",
    companyBlurb: "Solution Architect – DevOps · DevOps Engineer · System Engineer · Apply via Urolime Careers by 28 July 2026.",
    location: "Infopark, Kakkanad, Kochi",
    roles: [
      "Solution Architect – DevOps",
      "DevOps Engineer",
      "System Engineer (L2/L3)"
    ],
    experience: "experienced",
    experienceRange: "2–6+ Years (role-wise)",
    employmentType: "Full-time",
    applyLink: "https://www.urolime.com/in/careers.html",
    applyDeadline: "2026-07-28",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "DevOps", "Cloud"],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@urolime.com",
    phone: "+91 484 2984589",
    website: "https://www.urolime.com/",
    address: "6th Floor, Office No.6A-2, Wing 1, Jyothirmaya Building, Infopark Phase II, Puthencruz / Kakkanad, Ernakulam, Kerala 682303",
    industry: "DevOps / Cloud Consulting / Platform Engineering",
    companySize: "Global DevOps & cloud consulting firm · Kochi Infopark delivery hub",
    salaryRange: "Not publicly listed — experienced DevOps bands; confirm with Urolime",
    companyDetails:
      "Urolime Technologies specialises in DevOps consulting, AWS/Azure/GCP, Kubernetes, CI/CD, and managed services. Kochi office: Jyothirmaya, Infopark Phase II. Official India careers: https://www.urolime.com/in/careers.html · Email: careers@urolime.com.",
    workDetails:
      "Three experienced openings from Urolime Careers — Solution Architect – DevOps (6+ years), DevOps Engineer (3–4 years), System Engineer L2/L3 (2+ years). On-site Infopark. Last date: 28 July 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Infopark Phase II",
    experienceYears: "Solution Architect 6+ · DevOps 3–4 · System Engineer 2+",
    requirements: [
      "Solution Architect – DevOps: 5–7 years DevOps / open-source; 3+ years Docker & Kubernetes; advanced IaC (Terraform/Ansible/CloudFormation); deep AWS/Azure/GCP (EKS/AKS/GKE)",
      "DevOps Engineer: 3–4 years DevOps/CI-CD; 2–3 years Docker & Kubernetes; strong Linux; IaC + cloud + monitoring (ELK/Prometheus/Grafana)",
      "System Engineer L2/L3: 2+ years Linux/Windows/cloud support; incident troubleshooting; patching; Bash/Python/Ansible exposure",
      "Strong Git workflows and scripting (Bash/Python/Go as applicable)",
      "On-site at Infopark Kochi"
    ],
    skills: [
      "CI/CD pipelines",
      "Docker & Kubernetes",
      "Terraform / Ansible / CloudFormation",
      "AWS · Azure · GCP",
      "Linux administration",
      "ELK · Prometheus · Grafana",
      "MySQL / MongoDB / PostgreSQL familiarity"
    ],
    responsibilities: [
      "Architect / build CI/CD and cloud platforms (role-dependent)",
      "Lead containerised microservices deployments",
      "Operate monitoring, logging, and reliability tooling",
      "Provide L2/L3 production support and automation (System Engineer)",
      "Collaborate with delivery, SRE, and client stakeholders"
    ],
    benefits: [
      "Infopark Phase II campus (Jyothirmaya)",
      "Global cloud / DevOps project exposure",
      "Clear senior tracks across Architect / Engineer / Systems",
      "Official careers + careers@urolime.com"
    ],
    interviewTips: [
      "Match your resume to the exact role JD on Urolime Careers",
      "Be ready for hands-on questions on Kubernetes, IaC, and Linux",
      "Email careers@urolime.com with the role name in the subject line",
      "No recruitment fee — apply only via official Urolime channels"
    ],
    howToApply:
      "Apply on Urolime Careers: https://www.urolime.com/in/careers.html or email PDF resume to careers@urolime.com mentioning Solution Architect – DevOps / DevOps Engineer / System Engineer.",
    hiringNotes:
      "Category: IT · Last date 28 July 2026 · Official careers https://www.urolime.com/in/careers.html · Map: Jyothirmaya Infopark Phase II. Experience bars taken from Urolime’s published careers JD.",
    description: "DevOps hiring wave · 2–6+ Yrs · Infopark · Apply by 28 Jul 2026",
    startingDate: ""
  },
  {
    id: "dynamed-azure-architect",
    company: "Dynamed Healthcare Solutions",
    logo: "assets/logos/dynamed.svg",
    companyBlurb: "Azure Infrastructure Architect (senior) · Infopark Kochi · Apply via dynamedhealthcare.com / LinkedIn by 31 July 2026.",
    location: "Infopark, Kakkanad, Kochi",
    roles: ["Azure Infrastructure Architect"],
    experience: "experienced",
    experienceRange: "Senior Level",
    employmentType: "Full-time",
    applyLink: "https://dynamedhealthcare.com",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Cloud"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://dynamedhealthcare.com",
    address: "Infopark, Kakkanad, Kochi, Kerala",
    industry: "Healthcare / Health-tech Services",
    companySize: "~60+ employees reported publicly · Infopark Kochi presence",
    salaryRange: "Not publicly listed — senior Azure architect band; confirm with employer",
    companyDetails:
      "Dynamed Healthcare Solutions is a healthcare services / health-tech employer hiring a senior Azure Infrastructure Architect for Infopark Kochi. Official website: https://dynamedhealthcare.com — careers also shared via Contact / LinkedIn Jobs.",
    workDetails:
      "Senior Azure architecture ownership for healthcare-related infrastructure. On-site Infopark. Last date: 31 July 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Infopark Kochi",
    experienceYears: "Senior level",
    requirements: [
      "Senior Azure infrastructure / cloud architecture experience",
      "Deep Azure networking, identity, compute, storage, and security knowledge",
      "Experience designing scalable, governed cloud landing zones",
      "Healthcare or regulated-industry cloud experience is a plus"
    ],
    skills: [
      "Azure architecture",
      "Landing zones & governance",
      "Identity & access (Entra ID / IAM)",
      "Networking & security baselines",
      "IaC (Bicep / Terraform) preferred",
      "Cost & reliability design"
    ],
    responsibilities: [
      "Architect and govern Azure environments",
      "Define security, networking, and cost controls",
      "Lead migrations / modernisation with app teams",
      "Document standards and mentor engineers"
    ],
    benefits: [
      "Infopark Kochi campus",
      "Senior Azure ownership in healthcare domain",
      "Apply via official website / LinkedIn Jobs"
    ],
    interviewTips: [
      "Apply via https://dynamedhealthcare.com Careers/Contact or LinkedIn Jobs",
      "Prepare Azure architecture diagrams and governance examples",
      "Highlight any healthcare / compliance cloud work"
    ],
    howToApply:
      "Apply via https://dynamedhealthcare.com (Careers / Get in Touch) or the company’s LinkedIn Jobs posts for Azure Infrastructure Architect.",
    hiringNotes:
      "Category: IT · Last date 31 July 2026 · Official site https://dynamedhealthcare.com · Prefer company website or LinkedIn Jobs — never unofficial fee agents.",
    description: "Azure Infrastructure Architect · Senior · Infopark · Apply by 31 Jul 2026",
    startingDate: ""
  },
  {
    id: "ss-consulting-dynamics365",
    company: "SS Consulting",
    logo: "assets/logos/ss-consulting.svg",
    companyBlurb: "Senior Consultant – Microsoft Dynamics 365 CRM · Infopark Kochi · Apply via ssconsulting.in / LinkedIn by 31 July 2026.",
    location: "Infopark, Kakkanad, Kochi",
    roles: ["Senior Consultant – Microsoft Dynamics 365 CRM"],
    experience: "experienced",
    experienceRange: "Senior Level",
    employmentType: "Full-time",
    applyLink: "https://ssconsulting.co.in",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: ["IT", "Business"],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://ssconsulting.co.in",
    address: "Infopark, Kakkanad, Kochi, Kerala",
    industry: "IT Consulting / Microsoft Dynamics 365",
    companySize: "Consulting practice with Infopark Kochi presence (branch careers may vary)",
    salaryRange: "Not publicly listed — senior Dynamics CRM band; confirm with SS Consulting",
    companyDetails:
      "SS Consulting delivers Microsoft Dynamics and related consulting services and is hiring a Senior Consultant – Microsoft Dynamics 365 CRM at Infopark Kochi. Official site (active): https://ssconsulting.co.in — careers section may vary by branch; LinkedIn Jobs is also used.",
    workDetails:
      "Senior Dynamics 365 CRM functional consulting. On-site Infopark. Last date: 31 July 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Infopark Kochi",
    experienceYears: "Senior level",
    requirements: [
      "Senior Microsoft Dynamics 365 CRM consulting experience",
      "Strong functional workshops, process design, and client handling",
      "Hands-on CRM configuration / customisation delivery experience",
      "Ability to lead solution design and mentor juniors"
    ],
    skills: [
      "Dynamics 365 CRM / CE",
      "Functional consulting",
      "Requirements & process design",
      "Configuration & UAT leadership",
      "Stakeholder management"
    ],
    responsibilities: [
      "Lead Dynamics 365 CRM consulting engagements",
      "Run discovery workshops and design CRM processes",
      "Guide configuration, UAT, and go-live",
      "Coordinate with technical teams and mentor juniors"
    ],
    benefits: [
      "Infopark Kochi campus",
      "Senior Dynamics 365 CRM consulting track",
      "Official website / LinkedIn Jobs apply paths"
    ],
    interviewTips: [
      "Apply via https://ssconsulting.co.in or SS Consulting LinkedIn Jobs",
      "Prepare CRM project case studies (modules, outcomes, your role)",
      "Confirm branch / Infopark location during HR screening"
    ],
    howToApply:
      "Apply via https://ssconsulting.co.in (Careers / Contact) or the company’s LinkedIn Jobs listing for Senior Consultant – Microsoft Dynamics 365 CRM.",
    hiringNotes:
      "Category: IT · Last date 31 July 2026 · Prefer https://ssconsulting.co.in or LinkedIn Jobs · ssconsulting.in may vary by DNS/branch — use the working official site.",
    description: "Senior Consultant – Dynamics 365 CRM · Senior · Infopark · Apply by 31 Jul 2026",
    startingDate: ""
  },
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
