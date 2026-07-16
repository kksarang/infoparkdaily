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
 * logo            string   Path to logo, e.g. "assets/logos/2base.png"
 * location        string   Short location, e.g. "Kakkanad, Infopark"
 * roles           string[] Open role titles
 * experience      string   "fresher" | "experienced" | "both"
 * postedDate      string   ISO date "YYYY-MM-DD"
 *
 * COMPANY + HIRING DETAILS (shown on full job page)
 * -------------------------------------------------
 * email           string   Hiring / career email
 * phone           string   Contact phone
 * website         string   Company or apply portal URL
 * address         string   Full company address
 * industry        string   e.g. "Fintech" | "IT Services"
 * companyDetails  string   About the company (longer text OK)
 * workDetails     string   Hiring / role overview
 * workStatus      string   "Full-time" | "Internship" | "Contract" | "Walk-in"
 * workMode        string   "On-site" | "Hybrid" | "Remote"
 * experienceYears string   e.g. "0–2 years" | "2+ years"
 * requirements    string[] Must-have skills / eligibility
 * responsibilities string[] What the role involves
 * benefits        string[] Perks / what they offer
 * howToApply      string   Step-by-step apply instructions
 * hiringNotes     string   Extra notes (walk-in timings, gender preference, etc.)
 *
 * OPTIONAL CARD FIELDS
 * --------------------
 * description     string   One-line blurb on the listing card
 * startingDate    string   e.g. "2026-07-13"
 * source          string   "WhatsApp" | "Instagram" | "Direct" | "Infopark"
 *
 * TEMPLATE:
 * {
 *   id: "company-slug",
 *   company: "Company Name",
 *   logo: "assets/logos/company.png",
 *   location: "Kakkanad, Infopark",
 *   roles: ["Role Title 1", "Role Title 2"],
 *   experience: "fresher",
 *   postedDate: "2026-07-16",
 *   email: "careers@company.com",
 *   phone: "+91 98765 43210",
 *   website: "https://www.company.com",
 *   address: "Building, Infopark, Kakkanad, Kochi, Kerala",
 *   industry: "IT Services",
 *   companyDetails: "About the company…",
 *   workDetails: "Hiring overview…",
 *   workStatus: "Full-time",
 *   workMode: "On-site",
 *   experienceYears: "0–2 years",
 *   requirements: ["Requirement 1", "Requirement 2"],
 *   responsibilities: ["Responsibility 1"],
 *   benefits: ["Benefit 1"],
 *   howToApply: "Email resume to careers@company.com with subject…",
 *   hiringNotes: "Optional extra note.",
 *   description: "Short card blurb.",
 *   startingDate: "2026-07-13",
 *   source: "WhatsApp"
 * },
 */

var JOBS = [
  {
    id: "aceware",
    company: "Aceware Fintech Services",
    logo: "assets/logos/aceware.png",
    location: "Kochi",
    roles: ["Front Office Executive"],
    experience: "fresher",
    postedDate: "2026-07-16",
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
    description: "Kickstart your career in a professional work environment. 0–2 years.",
    source: "WhatsApp"
  },
  {
    id: "2base",
    company: "2Base Technologies",
    logo: "assets/logos/2base.png",
    location: "Kakkanad, Infopark",
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
    postedDate: "2026-07-13",
    startingDate: "2026-07-13",
    email: "",
    phone: "",
    website: "https://www.infopark.in/companies-job",
    address: "Kakkanad Infopark / Smart Space, Kochi, Kerala",
    industry: "IT / Product Engineering",
    companyDetails:
      "2Base Technologies is hiring across engineering, design, QA, analysis, and growth functions from Infopark Kochi Smart Space. Multiple experienced roles are open in the current hiring cycle.",
    workDetails:
      "Experienced hiring drive with 8 open roles spanning system engineering, web development, design, QA, business analysis, UI/UX, marketing/growth, and business development.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Relevant experience matching the applied role",
      "Strong communication and ownership skills",
      "Ready to work from Infopark Kochi / Smart Space"
    ],
    responsibilities: [
      "Contribute to product, engineering, design, or growth goals based on role",
      "Collaborate with cross-functional teams",
      "Deliver quality outcomes with accountability"
    ],
    benefits: [
      "Multiple role tracks in one company",
      "Infopark Kochi work location",
      "Apply through official Infopark companies job portal"
    ],
    howToApply:
      "Apply through the Infopark companies job portal: https://www.infopark.in/companies-job — select 2Base Technologies and the role you want.",
    hiringNotes: "Listed in Infopark Kochi Smart Space openings starting the week of 13 Jul 2026.",
    source: "Infopark"
  },
  {
    id: "feathersoft",
    company: "Feathersoft Info Solutions",
    logo: "assets/logos/feathersoft.png",
    location: "Kakkanad, Infopark",
    roles: ["Data Engineer", "Apprenticeship for Diploma/B.Tech Students"],
    experience: "both",
    postedDate: "2026-07-13",
    startingDate: "2026-07-13",
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
    source: "Infopark"
  },
  {
    id: "ss-consulting",
    company: "SS Consulting",
    logo: "assets/logos/ss-consulting.png",
    location: "Kakkanad, Infopark",
    roles: ["AI Engineer"],
    experience: "experienced",
    postedDate: "2026-07-13",
    startingDate: "2026-07-13",
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
    source: "Infopark"
  },
  {
    id: "edstem",
    company: "Edstem Technologies",
    logo: "assets/logos/edstem.png",
    location: "Kakkanad, Infopark",
    roles: ["Business Analyst", "Technical Project Manager / Lead"],
    experience: "experienced",
    postedDate: "2026-07-13",
    startingDate: "2026-07-13",
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
    source: "Infopark"
  },
  {
    id: "nesa",
    company: "Nesa Software",
    logo: "assets/logos/nesa.png",
    location: "Kakkanad, Infopark",
    roles: ["Data Analyst"],
    experience: "experienced",
    postedDate: "2026-07-13",
    startingDate: "2026-07-13",
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
    source: "Infopark"
  },
  {
    id: "techwarelab",
    company: "Techware Lab",
    logo: "assets/logos/techwarelab.png",
    location: "Kakkanad, Infopark",
    roles: ["Founder's Office Assistant (MBA Freshers)", "UI/UX Developer"],
    experience: "both",
    postedDate: "2026-07-13",
    startingDate: "2026-07-13",
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
    source: "Infopark"
  },
  {
    id: "inspite",
    company: "Inspite Technologies",
    logo: "assets/logos/inspite.png",
    location: "Kakkanad, Infopark",
    roles: ["WordPress Developer", "Performance Marketing Intern"],
    experience: "both",
    postedDate: "2026-07-13",
    startingDate: "2026-07-13",
    website: "https://www.infopark.in/companies-job",
    address: "Kakkanad Infopark, Kochi, Kerala",
    industry: "Digital / Web",
    companyDetails:
      "Inspite Technologies is hiring for WordPress development and performance marketing internship roles from Infopark Kochi.",
    workDetails:
      "Openings for WordPress Developer and Performance Marketing Intern. Suitable for freshers and experienced candidates depending on the track.",
    workStatus: "Full-time / Internship",
    workMode: "On-site",
    experienceYears: "Fresher + Experienced",
    requirements: [
      "WordPress development skills for developer role",
      "Interest in ads / performance marketing for internship",
      "Willingness to work from Infopark Kochi"
    ],
    responsibilities: [
      "Build and maintain WordPress websites",
      "Support performance marketing campaigns (intern track)",
      "Coordinate with creative / growth teams"
    ],
    benefits: ["Internship + full-time tracks", "Infopark Kochi location"],
    howToApply: "Apply via https://www.infopark.in/companies-job — Inspite Technologies.",
    source: "Infopark"
  },
  {
    id: "jachoos",
    company: "Jachoos Technologies",
    logo: "assets/logos/jachoos.png",
    location: "Kakkanad, Infopark",
    roles: ["Telesales Executive (IT)"],
    experience: "both",
    postedDate: "2026-07-13",
    startingDate: "2026-07-13",
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
    source: "Infopark"
  },
  {
    id: "difinity",
    company: "Difinity Digital",
    logo: "assets/logos/difinity.png",
    location: "Kakkanad, Infopark",
    roles: [
      ".NET Full Stack Developer",
      "Digital Marketing Manager",
      "Senior .NET Full Stack Developer",
      "Product Consultant",
      "SAP B1 Functional Consultant"
    ],
    experience: "experienced",
    postedDate: "2026-07-13",
    startingDate: "2026-07-13",
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
    source: "Infopark"
  },
  {
    id: "trainonex",
    company: "Trainonex Solutions",
    logo: "assets/logos/trainonex.png",
    location: "Technopark Campus, Trivandrum",
    roles: ["Business Development Executive"],
    experience: "fresher",
    postedDate: "2026-07-15",
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
    hiringNotes: "Shared via InfoparkDaily Jobs Instagram channel. Confirm latest apply steps with the company.",
    source: "Instagram"
  },
  {
    id: "supporthub360",
    company: "SupportHub360",
    logo: "assets/logos/supporthub360.png",
    location: "Infopark Phase 2, Kochi",
    roles: ["Digital Marketing Executive"],
    experience: "experienced",
    postedDate: "2026-07-14",
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
    hiringNotes: "Shared via InfoparkDaily Jobs Instagram. Verify details with the hiring company.",
    source: "Instagram"
  }
];
