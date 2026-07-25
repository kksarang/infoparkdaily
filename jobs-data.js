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
 * id              string   Unique slug used in URL: /job/aceware
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
    id: "jachoos-infopark-jul25",
    company: "Jachoos Technologies",
    logo: "assets/logos/jachoos.svg",
    companyBlurb: "3 open roles on Infopark Jobs · apply by 2026-07-30.",
    location: "Infopark, Kochi",
    roles: [
      "GOOGLE ADS SPECIALIST",
      "GOOGLE AD SPECIALIST",
      "Work Coordinator (IT Company)"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:hr@jachoos.com",
    applyDeadline: "2026-07-30",
    postedDate: "2026-07-25",
    source: "Infopark",
    verified: true,
    tags: [
      "Marketing"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "hr@jachoos.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Jachoos Technologies has active openings listed on the official Infopark Jobs portal (posted 2026-07-25).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email hr@jachoos.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/363/24733; https://infopark.in/company-jobs/details/363/24801; https://infopark.in/company-jobs/details/363/24832. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "3 roles · Infopark · Apply by 2026-07-30"
  },
{
    id: "2base-infopark-jul25",
    company: "2Base Technologies",
    logo: "assets/logos/2base.svg",
    companyBlurb: "5 open roles on Infopark Jobs · apply by 2026-07-25.",
    location: "Infopark, Kochi",
    roles: [
      "Marketing & Growth Lead",
      "Visual Designer",
      "Associate - System Engineer",
      "Business Development Manager",
      "Associate - QA Engineer"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:careers@2basetechnologies.com",
    applyDeadline: "2026-07-25",
    postedDate: "2026-07-25",
    source: "Infopark",
    verified: true,
    tags: [
      "Sales",
      "Design",
      "IT",
      "Marketing"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@2basetechnologies.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "2Base Technologies has active openings listed on the official Infopark Jobs portal (posted 2026-07-25).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email careers@2basetechnologies.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/312/24827; https://infopark.in/company-jobs/details/312/24828; https://infopark.in/company-jobs/details/312/24829; https://infopark.in/company-jobs/details/312/24830; https://infopark.in/company-jobs/details/312/24831. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "5 roles · Infopark · Apply by 2026-07-25"
  },
{
    id: "infintor-infopark-jul25",
    company: "Infintor Solutions",
    logo: "assets/logos/infintor.svg",
    companyBlurb: "1 open role on Infopark Jobs · apply by 2026-07-29.",
    location: "Infopark, Kochi",
    roles: [
      "Digital Marketing Executive"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:info@infintor.com",
    applyDeadline: "2026-07-29",
    postedDate: "2026-07-25",
    source: "Infopark",
    verified: true,
    tags: [
      "Marketing"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "info@infintor.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Infintor Solutions has active openings listed on the official Infopark Jobs portal (posted 2026-07-25).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email info@infintor.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/380/24826. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "1 roles · Infopark · Apply by 2026-07-29"
  },
{
    id: "cloudhouse-technologies-infopark-jul25",
    company: "CloudHouse Technologies",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "1 open role on Infopark Jobs · apply by 2026-07-31.",
    location: "Infopark, Kochi",
    roles: [
      "Full Stack Developer Intern"
    ],
    experience: "fresher",
    experienceRange: "Internship / Trainee",
    employmentType: "Internship",
    applyLink: "mailto:jobs@cloudstick.io",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-24",
    source: "Infopark",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "jobs@cloudstick.io",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "CloudHouse Technologies has active openings listed on the official Infopark Jobs portal (posted 2026-07-24).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Internship / Trainee",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email jobs@cloudstick.io with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/480/24825. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "1 roles · Infopark · Apply by 2026-07-31"
  },
{
    id: "newagesys-infopark-jul25",
    company: "NewAgeSys Solutions",
    logo: "assets/logos/newagesys.svg",
    companyBlurb: "2 open roles on Infopark Jobs · apply by 2026-07-27.",
    location: "Infopark, Kochi",
    roles: [
      "Junior QA Engineer (1 -2 YEARS Experience)",
      "PHP Developer/Senior Joomla Developer"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:career@newagesysindia.com",
    applyDeadline: "2026-07-27",
    postedDate: "2026-07-24",
    source: "Infopark",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "career@newagesysindia.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "NewAgeSys Solutions has active openings listed on the official Infopark Jobs portal (posted 2026-07-24).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email career@newagesysindia.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/109/24727; https://infopark.in/company-jobs/details/109/24824. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "2 roles · Infopark · Apply by 2026-07-27"
  },
{
    id: "array-platforms-infopark-jul25",
    company: "Array Platforms",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "1 open role on Infopark Jobs · apply by 2026-08-31.",
    location: "Infopark, Kochi",
    roles: [
      "Project Manager"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:neha.r@array.team",
    applyDeadline: "2026-08-31",
    postedDate: "2026-07-24",
    source: "Infopark",
    verified: true,
    tags: [
      "Business"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "neha.r@array.team",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Array Platforms has active openings listed on the official Infopark Jobs portal (posted 2026-07-24).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email neha.r@array.team with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/394/24823. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "1 roles · Infopark · Apply by 2026-08-31"
  },
{
    id: "thinkpalm-technologies-infopark-jul25",
    company: "Thinkpalm Technologies",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "1 open role on Infopark Jobs · apply by 2026-07-31.",
    location: "Infopark, Kochi",
    roles: [
      "Manual Testing with experience in Mobile Application Testing - 4+ Years"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:info@thinkpalm.com",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-24",
    source: "Infopark",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "info@thinkpalm.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Thinkpalm Technologies has active openings listed on the official Infopark Jobs portal (posted 2026-07-24).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email info@thinkpalm.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/49/24822. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "1 roles · Infopark · Apply by 2026-07-31"
  },
{
    id: "mapletech-space-infopark-jul25",
    company: "MapleTech Space",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "2 open roles on Infopark Jobs · apply by 2026-08-07.",
    location: "Infopark, Kochi",
    roles: [
      "Junior Digital Marketing Executive",
      "Business Development Manager(Female-WFH)"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:careers@mapletechspace.com",
    applyDeadline: "2026-08-07",
    postedDate: "2026-07-24",
    source: "Infopark",
    verified: true,
    tags: [
      "Sales",
      "Marketing"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@mapletechspace.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "MapleTech Space has active openings listed on the official Infopark Jobs portal (posted 2026-07-24).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email careers@mapletechspace.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/292/24819; https://infopark.in/company-jobs/details/292/24821. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "2 roles · Infopark · Apply by 2026-08-07"
  },
{
    id: "aventus-informatics-infopark-jul25",
    company: "Aventus Informatics",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "1 open role on Infopark Jobs · apply by 2026-10-01.",
    location: "Infopark, Kochi",
    roles: [
      "Business Intelligence (BI) Analyst – Analytics & Dashboarding"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:hr@aventusinformatics.com",
    applyDeadline: "2026-10-01",
    postedDate: "2026-07-24",
    source: "Infopark",
    verified: true,
    tags: [
      "Business"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "hr@aventusinformatics.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Aventus Informatics has active openings listed on the official Infopark Jobs portal (posted 2026-07-24).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email hr@aventusinformatics.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/148/24820. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "1 roles · Infopark · Apply by 2026-10-01"
  },
{
    id: "lucidplus-infotech-infopark-jul25",
    company: "LucidPlus Infotech",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "3 open roles on Infopark Jobs · apply by 2026-08-15.",
    location: "Infopark, Kochi",
    roles: [
      "Management Trainee – Business Operations",
      "Management Trainee – Project Management",
      "Management Trainee – Business Development"
    ],
    experience: "fresher",
    experienceRange: "Internship / Trainee",
    employmentType: "Full-time",
    applyLink: "mailto:career@lucidplus.com",
    applyDeadline: "2026-08-15",
    postedDate: "2026-07-24",
    source: "Infopark",
    verified: true,
    tags: [
      "Business",
      "Sales",
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "career@lucidplus.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "LucidPlus Infotech has active openings listed on the official Infopark Jobs portal (posted 2026-07-24).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Internship / Trainee",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email career@lucidplus.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/41/24815; https://infopark.in/company-jobs/details/41/24816; https://infopark.in/company-jobs/details/41/24818. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "3 roles · Infopark · Apply by 2026-08-15"
  },
{
    id: "apro-it-solutions-infopark-jul25",
    company: "Apro IT Solutions",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "1 open role on Infopark Jobs · apply by 2026-08-14.",
    location: "Infopark, Kochi",
    roles: [
      "QC (Quality Control) Intern"
    ],
    experience: "fresher",
    experienceRange: "Internship / Trainee",
    employmentType: "Internship",
    applyLink: "mailto:hr@aproitsolutions.in",
    applyDeadline: "2026-08-14",
    postedDate: "2026-07-24",
    source: "Infopark",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "hr@aproitsolutions.in",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Apro IT Solutions has active openings listed on the official Infopark Jobs portal (posted 2026-07-24).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Internship / Trainee",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email hr@aproitsolutions.in with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/420/24817. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "1 roles · Infopark · Apply by 2026-08-14"
  },
{
    id: "simelabs-astek-infopark-jul25",
    company: "Simelabs (Astek)",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "7 open roles on Infopark Jobs · apply by 2026-08-24.",
    location: "Infopark, Kochi",
    roles: [
      "ERP Consultant",
      "Cloud Administrator",
      "Lead AI/ML Engineer",
      "Solution Architect- Python",
      "Node.js Full Stack Engineer",
      "Jasper Report Developer",
      "Senior Data Engineer"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:hr@simelabs.com",
    applyDeadline: "2026-08-24",
    postedDate: "2026-07-24",
    source: "Infopark",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "hr@simelabs.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Simelabs (Astek) has active openings listed on the official Infopark Jobs portal (posted 2026-07-24).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email hr@simelabs.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/378/24730; https://infopark.in/company-jobs/details/378/24731; https://infopark.in/company-jobs/details/378/24732; https://infopark.in/company-jobs/details/378/24811; https://infopark.in/company-jobs/details/378/24812 (+2 more). Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "7 roles · Infopark · Apply by 2026-08-24"
  },
{
    id: "nas-infosolutions-infopark-jul25",
    company: "NAS Infosolutions",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "2 open roles on Infopark Jobs · apply by 2026-08-24.",
    location: "Infopark, Kochi",
    roles: [
      "Technical Consultant (ERP / SAP Business One)",
      "Functional Consultant (ERP/ SAP Business One)"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:hrd@nasinfosolutions.com",
    applyDeadline: "2026-08-24",
    postedDate: "2026-07-24",
    source: "Infopark",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "hrd@nasinfosolutions.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "NAS Infosolutions has active openings listed on the official Infopark Jobs portal (posted 2026-07-24).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email hrd@nasinfosolutions.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/278/24809; https://infopark.in/company-jobs/details/278/24810. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "2 roles · Infopark · Apply by 2026-08-24"
  },
{
    id: "inspite-infopark-jul25",
    company: "Inspite Technologies",
    logo: "assets/logos/inspite.svg",
    companyBlurb: "2 open roles on Infopark Jobs · apply by 2026-07-31.",
    location: "Infopark, Kochi",
    roles: [
      "AI Video Editor Internship Opportunity – Live US Projects",
      "AI Developer Internship Opportunity – Live US Projects"
    ],
    experience: "fresher",
    experienceRange: "Internship / Trainee",
    employmentType: "Internship",
    applyLink: "mailto:hr@inspitetech.com",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-23",
    source: "Infopark",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "hr@inspitetech.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Inspite Technologies has active openings listed on the official Infopark Jobs portal (posted 2026-07-23).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Internship / Trainee",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email hr@inspitetech.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/442/24797; https://infopark.in/company-jobs/details/442/24799. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "2 roles · Infopark · Apply by 2026-07-31"
  },
{
    id: "nuvento-systems-infopark-jul25",
    company: "Nuvento Systems",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "2 open roles on Infopark Jobs · apply by 2026-08-23.",
    location: "Infopark, Kochi",
    roles: [
      "Sales and Marketing Internship",
      "Finance Executive"
    ],
    experience: "fresher",
    experienceRange: "Internship / Trainee",
    employmentType: "Full-time",
    applyLink: "mailto:mohan@nuvento.com",
    applyDeadline: "2026-08-23",
    postedDate: "2026-07-23",
    source: "Infopark",
    verified: true,
    tags: [
      "Business",
      "Sales",
      "Marketing"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "mohan@nuvento.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Nuvento Systems has active openings listed on the official Infopark Jobs portal (posted 2026-07-23).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Internship / Trainee",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email mohan@nuvento.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/58/24755; https://infopark.in/company-jobs/details/58/24798. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "2 roles · Infopark · Apply by 2026-08-23"
  },
{
    id: "edstem-infopark-jul25",
    company: "Edstem Technologies",
    logo: "assets/logos/edstem.svg",
    companyBlurb: "3 open roles on Infopark Jobs · apply by 2026-08-05.",
    location: "Infopark, Kochi",
    roles: [
      "Senior Software Engineer – Squad Lead (Java + React)",
      "Technical Project Manager / Lead",
      "Business Analyst"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:careers@edstem.com",
    applyDeadline: "2026-08-05",
    postedDate: "2026-07-23",
    source: "Infopark",
    verified: true,
    tags: [
      "Business",
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@edstem.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Edstem Technologies has active openings listed on the official Infopark Jobs portal (posted 2026-07-23).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email careers@edstem.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/341/24794; https://infopark.in/company-jobs/details/341/24795; https://infopark.in/company-jobs/details/341/24796. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "3 roles · Infopark · Apply by 2026-08-05"
  },
{
    id: "distinct-infotech-infopark-jul25",
    company: "Distinct Infotech",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "4 open roles on Infopark Jobs · apply by 2026-09-01.",
    location: "Infopark, Kochi",
    roles: [
      "Backend Developer (.NET Core)",
      "Solution Architect",
      "Technical Manager",
      "QC Lead"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:hradmin@distinctinfotech.com",
    applyDeadline: "2026-09-01",
    postedDate: "2026-07-22",
    source: "Infopark",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "hradmin@distinctinfotech.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Distinct Infotech has active openings listed on the official Infopark Jobs portal (posted 2026-07-22).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email hradmin@distinctinfotech.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/529/24783; https://infopark.in/company-jobs/details/529/24784; https://infopark.in/company-jobs/details/529/24787; https://infopark.in/company-jobs/details/529/24788. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "4 roles · Infopark · Apply by 2026-09-01"
  },
{
    id: "aspire-systems-infopark-jul25",
    company: "Aspire Systems",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "2 open roles on Infopark Jobs · apply by 2026-08-30.",
    location: "Infopark, Kochi",
    roles: [
      "Immediate Opening for Module Lead /Technical Lead",
      "Immediate Opening for Data Engineer"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:keerthana.jayaraj@aspiresys.com",
    applyDeadline: "2026-08-30",
    postedDate: "2026-07-22",
    source: "Infopark",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "keerthana.jayaraj@aspiresys.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Aspire Systems has active openings listed on the official Infopark Jobs portal (posted 2026-07-22).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email keerthana.jayaraj@aspiresys.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/36/24785; https://infopark.in/company-jobs/details/36/24786. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "2 roles · Infopark · Apply by 2026-08-30"
  },
{
    id: "orestes-technologies-infopark-jul25",
    company: "Orestes Technologies",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "1 open role on Infopark Jobs · apply by 2026-09-05.",
    location: "Infopark, Kochi",
    roles: [
      "Sales Intern"
    ],
    experience: "fresher",
    experienceRange: "Internship / Trainee",
    employmentType: "Internship",
    applyLink: "mailto:aswathy@orestestech.com",
    applyDeadline: "2026-09-05",
    postedDate: "2026-07-22",
    source: "Infopark",
    verified: true,
    tags: [
      "Sales"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "aswathy@orestestech.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Orestes Technologies has active openings listed on the official Infopark Jobs portal (posted 2026-07-22).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Internship / Trainee",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email aswathy@orestestech.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/390/24782. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "1 roles · Infopark · Apply by 2026-09-05"
  },
{
    id: "voyon-technology-infopark-jul25",
    company: "Voyon Technology",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "1 open role on Infopark Jobs · apply by 2026-07-31.",
    location: "Infopark, Kochi",
    roles: [
      "Business Development Executive - UAE"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:careers@voyon.net",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-22",
    source: "Infopark",
    verified: true,
    tags: [
      "Sales"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@voyon.net",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Voyon Technology has active openings listed on the official Infopark Jobs portal (posted 2026-07-22).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email careers@voyon.net with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/372/24779. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "1 roles · Infopark · Apply by 2026-07-31"
  },
{
    id: "thoughtminds-infopark-jul25",
    company: "ThoughtMinds",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "1 open role on Infopark Jobs · apply by 2026-07-27.",
    location: "Infopark, Kochi",
    roles: [
      "Senior Software Engineer (Python/AI | 3-5 yrs)"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:careers@thoughtminds.io",
    applyDeadline: "2026-07-27",
    postedDate: "2026-07-22",
    source: "Infopark",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@thoughtminds.io",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "ThoughtMinds has active openings listed on the official Infopark Jobs portal (posted 2026-07-22).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email careers@thoughtminds.io with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/485/24778. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "1 roles · Infopark · Apply by 2026-07-27"
  },
{
    id: "lanware-solutions-infopark-jul25",
    company: "Lanware Solutions",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "1 open role on Infopark Jobs · apply by 2026-08-31.",
    location: "Infopark, Kochi",
    roles: [
      "Senior Digital Marketing Specialist"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:hr@lanwaresolutions.com",
    applyDeadline: "2026-08-31",
    postedDate: "2026-07-22",
    source: "Infopark",
    verified: true,
    tags: [
      "Marketing"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "hr@lanwaresolutions.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Lanware Solutions has active openings listed on the official Infopark Jobs portal (posted 2026-07-22).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email hr@lanwaresolutions.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/211/24777. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "1 roles · Infopark · Apply by 2026-08-31"
  },
{
    id: "ynot-infosolutions-infopark-jul25",
    company: "Ynot Infosolutions",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "2 open roles on Infopark Jobs · apply by 2026-07-27.",
    location: "Infopark, Kochi",
    roles: [
      "Backend Developer / Laravel Developer (Immediate Hiring)",
      "Digital Marketing Executive"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:hr@ynotinfo.com",
    applyDeadline: "2026-07-27",
    postedDate: "2026-07-21",
    source: "Infopark",
    verified: true,
    tags: [
      "IT",
      "Marketing"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "hr@ynotinfo.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Ynot Infosolutions has active openings listed on the official Infopark Jobs portal (posted 2026-07-21).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email hr@ynotinfo.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/262/24761; https://infopark.in/company-jobs/details/262/24762. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "2 roles · Infopark · Apply by 2026-07-27"
  },
{
    id: "techversant-infotech-infopark-jul25",
    company: "Techversant Infotech",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "1 open role on Infopark Jobs · apply by 2026-07-28.",
    location: "Infopark, Kochi",
    roles: [
      "Web Developer"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:careers@techversantinfotech.com",
    applyDeadline: "2026-07-28",
    postedDate: "2026-07-21",
    source: "Infopark",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@techversantinfotech.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Techversant Infotech has active openings listed on the official Infopark Jobs portal (posted 2026-07-21).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email careers@techversantinfotech.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/85/24759. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "1 roles · Infopark · Apply by 2026-07-28"
  },
{
    id: "cabot-technology-solutions-infopark-jul25",
    company: "Cabot Technology Solutions",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "1 open role on Infopark Jobs · apply by 2026-08-31.",
    location: "Infopark, Kochi",
    roles: [
      "Inside Sales Executive"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:careers@cabotsolutions.com",
    applyDeadline: "2026-08-31",
    postedDate: "2026-07-21",
    source: "Infopark",
    verified: true,
    tags: [
      "Sales"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@cabotsolutions.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Cabot Technology Solutions has active openings listed on the official Infopark Jobs portal (posted 2026-07-21).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email careers@cabotsolutions.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/64/24758. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "1 roles · Infopark · Apply by 2026-08-31"
  },
{
    id: "webdura-technologies-infopark-jul25",
    company: "Webdura Technologies",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "2 open roles on Infopark Jobs · apply by 2026-08-01.",
    location: "Infopark, Kochi",
    roles: [
      "Senior Frontend Developer",
      "Senior Backend Developer"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:careers@webdura.in",
    applyDeadline: "2026-08-01",
    postedDate: "2026-07-21",
    source: "Infopark",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@webdura.in",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Webdura Technologies has active openings listed on the official Infopark Jobs portal (posted 2026-07-21).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email careers@webdura.in with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/187/24754; https://infopark.in/company-jobs/details/187/24756. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "2 roles · Infopark · Apply by 2026-08-01"
  },
{
    id: "vipoint-solutions-infopark-jul25",
    company: "VIPoint Solutions",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "1 open role on Infopark Jobs · apply by 2026-08-31.",
    location: "Infopark, Kochi",
    roles: [
      "Senior System Administrator (SSA)"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:hr@vipointsolutions.net",
    applyDeadline: "2026-08-31",
    postedDate: "2026-07-21",
    source: "Infopark",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "hr@vipointsolutions.net",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "VIPoint Solutions has active openings listed on the official Infopark Jobs portal (posted 2026-07-21).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email hr@vipointsolutions.net with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/62/24753. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "1 roles · Infopark · Apply by 2026-08-31"
  },
{
    id: "difinity-infopark-jul25",
    company: "Difinity Digital",
    logo: "assets/logos/difinity.svg",
    companyBlurb: "3 open roles on Infopark Jobs · apply by 2026-08-20.",
    location: "Infopark, Kochi",
    roles: [
      "Senior Full-Stack Developer (8+ Years",
      "Senior AI Engineer (4+ Years Experience)",
      "Business Analyst (CRM Implementation)"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:careers@difinitydigital.com",
    applyDeadline: "2026-08-20",
    postedDate: "2026-07-21",
    source: "Infopark",
    verified: true,
    tags: [
      "Business",
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@difinitydigital.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Difinity Digital has active openings listed on the official Infopark Jobs portal (posted 2026-07-21).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email careers@difinitydigital.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/495/24725; https://infopark.in/company-jobs/details/495/24728; https://infopark.in/company-jobs/details/495/24751. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "3 roles · Infopark · Apply by 2026-08-20"
  },
{
    id: "dynamed-infopark-jul25",
    company: "Dynamed Healthcare Solutions",
    logo: "assets/logos/dynamed.svg",
    companyBlurb: "1 open role on Infopark Jobs · apply by 2026-07-31.",
    location: "Infopark, Kochi",
    roles: [
      "Business Development Trainee"
    ],
    experience: "fresher",
    experienceRange: "Internship / Trainee",
    employmentType: "Full-time",
    applyLink: "mailto:hr@dynamedhealth.com",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-21",
    source: "Infopark",
    verified: true,
    tags: [
      "Business",
      "Sales",
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "hr@dynamedhealth.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Dynamed Healthcare Solutions has active openings listed on the official Infopark Jobs portal (posted 2026-07-21).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Internship / Trainee",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email hr@dynamedhealth.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/132/24750. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "1 roles · Infopark · Apply by 2026-07-31"
  },
{
    id: "nesa-infopark-jul25",
    company: "Nesa Software",
    logo: "assets/logos/nesa.svg",
    companyBlurb: "1 open role on Infopark Jobs · apply by 2026-07-30.",
    location: "Infopark, Kochi",
    roles: [
      "Content Marketer"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:recruitment@nesasoftware.com",
    applyDeadline: "2026-07-30",
    postedDate: "2026-07-20",
    source: "Infopark",
    verified: true,
    tags: [
      "Marketing"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "recruitment@nesasoftware.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Nesa Software has active openings listed on the official Infopark Jobs portal (posted 2026-07-20).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email recruitment@nesasoftware.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/530/24726. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "1 roles · Infopark · Apply by 2026-07-30"
  },
{
    id: "urolime-infopark-jul25",
    company: "Urolime Technologies",
    logo: "assets/logos/urolime.svg",
    companyBlurb: "4 open roles on Infopark Jobs · apply by 2026-07-29.",
    location: "Infopark, Kochi",
    roles: [
      "Solution Architect - DevOps",
      "HR Recruiter",
      "DevOps Engineer",
      "System Engineer"
    ],
    experience: "experienced",
    experienceRange: "Experienced (role-dependent)",
    employmentType: "Full-time",
    applyLink: "mailto:careers@urolime.com",
    applyDeadline: "2026-07-29",
    postedDate: "2026-07-20",
    source: "Infopark",
    verified: true,
    tags: [
      "Business",
      "Design",
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@urolime.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Urolime Technologies has active openings listed on the official Infopark Jobs portal (posted 2026-07-20).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Experienced (role-dependent)",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email careers@urolime.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/118/24721; https://infopark.in/company-jobs/details/118/24722; https://infopark.in/company-jobs/details/118/24723; https://infopark.in/company-jobs/details/118/24724. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "4 roles · Infopark · Apply by 2026-07-29"
  },
{
    id: "zoiteckh-infopark-jul25",
    company: "Zoiteckh",
    logo: "assets/logos/placeholder.svg",
    companyBlurb: "1 open role on Infopark Jobs · apply by 2026-07-25.",
    location: "Infopark, Kochi",
    roles: [
      "Business Development Interns"
    ],
    experience: "fresher",
    experienceRange: "Internship / Trainee",
    employmentType: "Internship",
    applyLink: "mailto:careers@zoiteckh.com",
    applyDeadline: "2026-07-25",
    postedDate: "2026-07-20",
    source: "Infopark",
    verified: true,
    tags: [
      "Sales"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@zoiteckh.com",
    phone: "",
    website: "https://infopark.in/companies-job",
    address: "Infopark Kochi, Kakkanad, Kerala",
    industry: "IT / Infopark company",
    companyDetails: "Zoiteckh has active openings listed on the official Infopark Jobs portal (posted 2026-07-20).",
    workDetails: "Roles and deadlines are synced from https://infopark.in/companies-job. Verify the live posting before applying.",
    workStatus: "Full-time",
    workMode: "On-site",
    experienceYears: "Internship / Trainee",
    requirements: [
      "Match the experience stated on the Infopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Infopark Kochi based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Infopark Jobs",
      "Collaborate with the hiring team during interview / selection"
    ],
    benefits: [
      "Official Infopark Jobs listing",
      "Direct company hiring"
    ],
    howToApply: "Email careers@zoiteckh.com with the role in the subject, or apply via the Infopark Jobs portal: https://infopark.in/company-jobs/details/466/24720. Source: https://infopark.in/companies-job",
    hiringNotes: "Synced from Infopark Jobs. Only current-month open deadlines are listed. No park phone numbers are published as company contacts.",
    description: "1 roles · Infopark · Apply by 2026-07-25"
  },
{
    id: "techolas-data-analytics-trainer",
    company: "Techolas Technologies",
    logo: "assets/logos/techolas.svg",
    companyBlurb: "Data Analytics Trainer · Calicut · Freshers can apply · Immediate joiners preferred.",
    location: "Calicut, Kerala",
    roles: [
      "Data Analytics Trainer"
    ],
    experience: "both",
    experienceRange: "0–3 Years · Freshers can also apply",
    employmentType: "Full-time",
    applyLink: "mailto:hr@techolascalicut.com",
    applyDeadline: "Rolling",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT",
      "Training",
      "Data"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "hr@techolascalicut.com",
    phone: "+91 97787 18978",
    website: "",
    address: "Calicut, Kerala",
    industry: "IT Training / Data Analytics",
    companyDetails: "Techolas Technologies is hiring a Data Analytics Trainer in Calicut. Freshers can also apply. Immediate joiners preferred.",
    workDetails: "Design and deliver data analytics training, mentor participants, and stay updated with industry tools. Open until filled.",
    workStatus: "Full-time · Open until filled",
    workMode: "On-site · Calicut",
    experienceYears: "0–3 years",
    requirements: [
      "0–3 years experience (freshers can also apply)",
      "Strong knowledge of Python for Data Analytics",
      "Proficiency in SQL",
      "Hands-on with data visualization tools",
      "Good understanding of statistics and data modeling",
      "Excellent communication and presentation skills",
      "Passion for teaching"
    ],
    skills: [
      "Python",
      "SQL",
      "Data visualization",
      "Statistics",
      "Data modeling",
      "Training / mentoring"
    ],
    responsibilities: [
      "Design and deliver training sessions on data analytics",
      "Develop training materials and hands-on exercises",
      "Mentor participants and help build practical skills",
      "Evaluate performance and provide feedback",
      "Stay updated with industry trends",
      "Collaborate with the team for program improvement"
    ],
    benefits: [
      "Calicut-based trainer role",
      "Immediate joiner preference",
      "Teaching + analytics career path"
    ],
    howToApply: "Email your resume to hr@techolascalicut.com or call +91 97787 18978. Immediate joiners preferred. Verify details with the company before applying.",
    hiringNotes: "Published 21 July 2026 · Open until filled · InfoparkDaily independent community listing — no fee.",
    description: "Data Analytics Trainer · 0–3 Yrs · Calicut · Open until filled",
    startingDate: "Immediate joiners preferred"
  },
{
    id: "data-elektronik-tech-support",
    company: "Data Elektronik",
    logo: "assets/logos/dataelektronik.svg",
    companyBlurb: "Technical Support Engineer · Infopark Kochi · 0–2 years · Immediate joiners preferred.",
    location: "Infopark, Kochi",
    roles: [
      "Technical Support Engineer"
    ],
    experience: "both",
    experienceRange: "0–2 Years",
    employmentType: "Full-time",
    applyLink: "mailto:rantony@data-elektronik.de",
    applyDeadline: "Rolling",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT",
      "Support"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "rantony@data-elektronik.de",
    phone: "",
    website: "",
    address: "Infopark, Kochi, Kerala",
    industry: "IT / Technical Support",
    companyDetails: "Data Elektronik is hiring a Technical Support Engineer at Infopark Kochi for frontend, database, and API troubleshooting support.",
    workDetails: "Troubleshoot customer issues across frontend, database, and APIs. Collaborate with Dev, QA, and Product. Open until filled.",
    workStatus: "Full-time · Open until filled",
    workMode: "On-site · Infopark Kochi",
    experienceYears: "0–2 years",
    requirements: [
      "0–2 years experience",
      "Knowledge of HTML, CSS, JavaScript, SQL, and REST APIs",
      "Basic SQL and database concepts",
      "REST APIs, HTTP methods, status codes, and Postman",
      "Strong debugging and problem-solving skills",
      "Excellent communication and documentation abilities"
    ],
    skills: [
      "HTML/CSS/JS",
      "SQL",
      "REST APIs",
      "Postman",
      "Debugging",
      "Documentation"
    ],
    responsibilities: [
      "Analyze and troubleshoot customer-reported technical issues",
      "Investigate frontend, database, and API-related problems",
      "Reproduce issues, gather logs, and document findings clearly",
      "Collaborate with Development, QA, and Product teams",
      "Maintain support tickets and provide timely customer updates"
    ],
    benefits: [
      "Infopark Kochi campus role",
      "Immediate joiner preference"
    ],
    howToApply: "Email your resume to rantony@data-elektronik.de. Immediate joiners preferred. Verify details with the company before applying.",
    hiringNotes: "Published 21 July 2026 · Open until filled · Independent InfoparkDaily listing — never pay a fee.",
    description: "Technical Support Engineer · 0–2 Yrs · Infopark Kochi",
    startingDate: "Immediate joiners preferred"
  },
{
    id: "poothurans-admin-assistant",
    company: "Poothurans Enterprises",
    logo: "assets/logos/poothurans.svg",
    companyBlurb: "Admin Assistant · Angamaly · Freshers / 0–1 year · Immediate joiners preferred.",
    location: "Angamaly, Kerala",
    roles: [
      "Admin Assistant"
    ],
    experience: "fresher",
    experienceRange: "Fresher / 0–1 Year",
    employmentType: "Full-time",
    applyLink: "mailto:poothuranshr@gmail.com",
    applyDeadline: "Rolling",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "HR",
      "Admin",
      "Business"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "poothuranshr@gmail.com",
    phone: "",
    website: "",
    address: "Near KSRTC Bus Station, Angamaly, Kerala",
    industry: "Administration / Office Operations",
    companyDetails: "Poothurans Enterprises (near KSRTC Bus Station, Angamaly) is hiring an Admin Assistant for freshers and early-career candidates.",
    workDetails: "Office administration, documentation, calls/emails, scheduling, and day-to-day coordination. Open until filled.",
    workStatus: "Full-time · Open until filled",
    workMode: "On-site · Angamaly",
    experienceYears: "Fresher / 0–1 year",
    requirements: [
      "Bachelor’s degree in any stream",
      "Good communication skills",
      "Attention to detail",
      "Proficiency in MS Office (Word, Excel, PowerPoint)",
      "Multitasking ability",
      "Positive attitude and willingness to learn"
    ],
    skills: [
      "MS Office",
      "Communication",
      "Documentation",
      "Scheduling",
      "Coordination"
    ],
    responsibilities: [
      "Provide administrative support for efficient office operations",
      "Manage and organize documents, files, and records",
      "Handle calls, emails, and correspondence professionally",
      "Assist in scheduling meetings and managing calendars",
      "Support day-to-day office activities",
      "Coordinate with team members for smooth workflow"
    ],
    benefits: [
      "Fresher-friendly admin role",
      "Angamaly location",
      "Immediate joiner preference"
    ],
    howToApply: "Email your resume to poothuranshr@gmail.com. Immediate joiners preferred.",
    hiringNotes: "Published 21 July 2026 · Open until filled · Verify with company before applying.",
    description: "Admin Assistant · Fresher / 0–1 Yr · Angamaly",
    startingDate: "Immediate joiners preferred"
  },
{
    id: "estro-tech-multiple",
    company: "Estro Tech Robotics",
    logo: "assets/logos/estrotech.svg",
    companyBlurb: "Multiple BD / Marketing / Intern roles · Infopark Thrissur · WFO · Immediate joiners preferred.",
    location: "Infopark, Thrissur",
    roles: [
      "Business Development Executive",
      "Marketing Executive",
      "Research & Development Intern",
      "Business Development Intern",
      "Marketing Intern"
    ],
    experience: "both",
    experienceRange: "1–3 Years (exec roles) · Internships open",
    employmentType: "Full-time",
    applyLink: "mailto:hr@estrotech.in",
    applyDeadline: "Rolling",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "Sales",
      "Marketing",
      "Internship",
      "Business"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "hr@estrotech.in",
    phone: "",
    website: "",
    address: "Infopark, Thrissur, Kerala",
    industry: "Robotics / Technology",
    companyDetails: "Estro Tech Robotics is hiring multiple positions at Infopark Thrissur (Work From Office) — BD, Marketing, and internship tracks.",
    workDetails: "Business development, marketing, market research, and growth support roles. Open until filled. Immediate joiners preferred.",
    workStatus: "Full-time / Internship · Open until filled",
    workMode: "On-site · Infopark Thrissur (WFO)",
    experienceYears: "1–3 years for executive roles; internships for freshers",
    requirements: [
      "Excellent communication and interpersonal skills",
      "Strong analytical and problem-solving ability",
      "Proficiency in MS Office",
      "Creative thinking and attention to detail",
      "Self-motivated and willing to learn",
      "Ability to work independently and in a team"
    ],
    skills: [
      "Business development",
      "Marketing",
      "MS Office",
      "Communication",
      "Market research"
    ],
    responsibilities: [
      "Identify and pursue new business opportunities",
      "Build and maintain strong client relationships",
      "Conduct market research and competitor analysis",
      "Develop and implement marketing strategies",
      "Collaborate with teams to achieve business goals",
      "Support product innovation and business growth"
    ],
    benefits: [
      "Infopark Thrissur campus",
      "Multiple role tracks including internships",
      "Immediate joiner preference"
    ],
    howToApply: "Email your resume to hr@estrotech.in mentioning the role. Immediate joiners preferred.",
    hiringNotes: "Published 21 July 2026 · Multiple positions · Open until filled.",
    description: "BD / Marketing / Interns · Infopark Thrissur · Open until filled",
    startingDate: "Immediate joiners preferred"
  },
{
    id: "zybo-software-tester",
    company: "Zybo Tech Lab (P) Ltd",
    logo: "assets/logos/zybotech.svg",
    companyBlurb: "Software Tester (QA Engineer) · Technopark TVM · 6 months–1 year · Apply by 30 July 2026.",
    location: "Technopark, Trivandrum",
    roles: [
      "Software Tester (QA Engineer)"
    ],
    experience: "fresher",
    experienceRange: "6 Months – 1 Year (freshers with 6+ months also encouraged)",
    employmentType: "Full-time",
    applyLink: "mailto:jobs@zybotechlab.com",
    applyDeadline: "2026-07-30",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT",
      "QA"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "jobs@zybotechlab.com",
    phone: "",
    website: "",
    address: "Technopark, Trivandrum, Kerala",
    industry: "Software / QA",
    companyDetails: "Zybo Tech Lab (P) Ltd is hiring a Software Tester (QA Engineer) on-site at Technopark, Trivandrum.",
    workDetails: "Manual testing, test cases, defect tracking, functional/regression/integration testing. Apply before 30 July 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Technopark Trivandrum",
    experienceYears: "6 months – 1 year",
    requirements: [
      "Manual Testing, SDLC, STLC, Test Cases",
      "Experience with Jira, Postman, SQL",
      "Knowledge of AI tools is a plus",
      "Good understanding of functional testing concepts",
      "Strong analytical and problem-solving skills",
      "Good communication and attention to detail"
    ],
    skills: [
      "Manual Testing",
      "SDLC/STLC",
      "Jira",
      "Postman",
      "SQL",
      "Functional testing"
    ],
    responsibilities: [
      "Understand requirements and create test plans, test cases, and scenarios",
      "Execute manual test cases and report, track & validate defects",
      "Perform functional, regression, and integration testing",
      "Collaborate with developers and BA to resolve quality issues",
      "Participate in review meetings and improve testing processes",
      "Ensure product quality and continuous improvement"
    ],
    benefits: [
      "Technopark on-site role",
      "Immediate joiner preference"
    ],
    howToApply: "Email resume to jobs@zybotechlab.com before 30 July 2026. Immediate joiners preferred.",
    hiringNotes: "Apply before 30 July 2026 · Published 21 July 2026 · Verify with company.",
    description: "QA Engineer · 6mo–1 Yr · Technopark · Apply by 30 Jul 2026",
    startingDate: "Immediate joiners preferred"
  },
{
    id: "enfycon-senior-qa",
    company: "Enfycon",
    logo: "assets/logos/enfycon.svg",
    companyBlurb: "Senior QA Testing Engineer · Bangalore hybrid · 3–6 years · 1–1.3 LPM · 2–3 openings.",
    location: "Bangalore (Onsite/Hybrid · 3 days office, 2 days WFH)",
    roles: [
      "Senior QA Testing Engineer"
    ],
    experience: "experienced",
    experienceRange: "3–6 Years",
    employmentType: "Full-time",
    applyLink: "mailto:jyoti@enfycon.com",
    applyDeadline: "Rolling",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT",
      "QA",
      "AI"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "jyoti@enfycon.com",
    phone: "",
    website: "",
    address: "Bangalore, Karnataka",
    industry: "AI / Software QA",
    companySize: "2–3 openings",
    salaryRange: "₹1 – 1.3 LPM (as stated on hiring poster)",
    companyDetails: "Enfycon is hiring Senior QA Testing Engineers focused on manual testing for LLM / AI applications, test agents, and persona-based validation.",
    workDetails: "Senior manual QA for AI/LLM-based applications. Hybrid Bangalore (3 office / 2 WFH). Budget 1–1.3 LPM. 2–3 openings.",
    workStatus: "Full-time",
    workMode: "Hybrid · Bangalore (3 days office, 2 days WFH)",
    experienceYears: "3–6 years",
    requirements: [
      "3–6 years QA / manual testing experience",
      "Strong experience in LLM testing / test agents / persona-based validation",
      "Manual testing for AI / LLM-based applications",
      "Strong analytical and problem-solving skills"
    ],
    skills: [
      "Manual Testing",
      "LLM testing",
      "Test agents",
      "Persona-based validation",
      "AI application QA"
    ],
    responsibilities: [
      "Lead manual QA for AI / LLM-based products",
      "Validate test agents and personas",
      "Ensure quality of AI-driven user flows",
      "Collaborate with product and engineering on release readiness"
    ],
    benefits: [
      "Hybrid Bangalore schedule",
      "Budget 1–1.3 LPM (poster)",
      "2–3 openings"
    ],
    howToApply: "Send updated resume to jyoti@enfycon.com. Confirm salary, openings, and hybrid policy with Enfycon HR.",
    hiringNotes: "Pan-India listing shared on InfoparkDaily · Verify all details with Enfycon before applying · No fee.",
    description: "Senior QA · 3–6 Yrs · Bangalore Hybrid · 1–1.3 LPM",
    startingDate: ""
  },
{
    id: "wattlecorp-cyberpark",
    company: "Wattlecorp Cybersecurity Labs",
    logo: "assets/logos/wattlecorp.svg",
    companyBlurb: "Multiple roles · Govt. Cyberpark Calicut · Ops, SEO, Social Media, Inbound Sales.",
    location: "Govt. Cyberpark, Calicut",
    roles: [
      "Operations Manager",
      "SEO & Lead Generation Specialist",
      "Social Media Specialist",
      "Inbound Sales Executive"
    ],
    experience: "experienced",
    experienceRange: "1–4+ Years (role dependent)",
    employmentType: "Full-time",
    applyLink: "https://www.wattlecorp.com",
    applyDeadline: "Rolling",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "Sales",
      "Marketing",
      "Business",
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://www.wattlecorp.com",
    address: "Govt. Cyberpark, Calicut, Kerala",
    industry: "Cybersecurity",
    companyDetails: "Wattlecorp Cybersecurity Labs is hiring at Government Cyberpark, Calicut across operations, SEO/lead gen, social media, and inbound sales.",
    workDetails: "Ops Manager (4+ yrs), SEO & Lead Gen (3+), Social Media (3+), Inbound Sales (1+). Apply via www.wattlecorp.com.",
    workStatus: "Full-time",
    workMode: "On-site · Cyberpark Calicut",
    experienceYears: "1+ to 4+ years depending on role",
    requirements: [
      "Operations Manager: minimum 4+ years experience",
      "SEO & Lead Generation Specialist: minimum 3+ years",
      "Social Media Specialist: minimum 3+ years",
      "Inbound Sales Executive: minimum 1+ years"
    ],
    skills: [
      "Operations",
      "SEO",
      "Lead generation",
      "Social media",
      "Inbound sales"
    ],
    responsibilities: [
      "Role-specific operations, growth, or sales ownership at Cyberpark Calicut",
      "Drive leads, content, or inbound conversations as per hired track",
      "Collaborate across Wattlecorp cybersecurity go-to-market teams"
    ],
    benefits: [
      "Cyberpark Calicut campus",
      "Cybersecurity domain exposure"
    ],
    howToApply: "Apply via https://www.wattlecorp.com (Apply Now / careers). Verify live openings on the official site.",
    hiringNotes: "Published via hiring poster · Confirm role JD on wattlecorp.com before applying.",
    description: "Ops / SEO / Social / Sales · Cyberpark Calicut",
    startingDate: ""
  },
{
    id: "kochi-virtual-hiring-cs",
    company: "Virtual Hiring Drive · Kochi Customer Support",
    logo: "assets/logos/sutherland.svg",
    companyBlurb: "Virtual hiring for Customer Support · 24 & 25 July 2026 · 11:30 AM–4:00 PM · Scan QR / join online.",
    location: "Kochi (Virtual)",
    roles: [
      "Customer Support Roles"
    ],
    experience: "fresher",
    experienceRange: "10+2 pass · Good English",
    employmentType: "Full-time",
    applyLink: "",
    applyDeadline: "2026-07-25",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "Support",
      "Business"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "",
    address: "Virtual drive · Kochi hiring",
    industry: "BPO / Customer Support",
    companyDetails: "Virtual hiring drive for Customer Support roles targeting Kochi candidates on 24 & 25 July 2026.",
    workDetails: "Virtual interviews 24–25 July 2026, 11:30 AM – 4:00 PM. Eligibility: 10+2 + good English. Scan flyer QR to join.",
    workStatus: "Full-time · Virtual hiring drive",
    workMode: "Virtual interview · Kochi roles",
    experienceYears: "Entry-level",
    requirements: [
      "10+2 pass certificate",
      "Good spoken and written English",
      "Join via official QR / link from the hiring flyer"
    ],
    skills: [
      "Customer support",
      "English communication"
    ],
    responsibilities: [
      "Customer support as assigned after selection"
    ],
    benefits: [
      "Competitive pay",
      "Employee benefits",
      "Travel allowance",
      "Insurance coverage",
      "5-day work week"
    ],
    howToApply: "Scan the official flyer QR code to join the virtual hiring session on 24 or 25 July 2026 (11:30 AM – 4:00 PM). Do not pay any fee. Verify the organizer before joining.",
    hiringNotes: "Drive dates 24–25 July 2026 · After 25 July treat as EXPIRED unless a new date is announced.",
    description: "Virtual CS hiring · 24–25 Jul 2026 · Kochi",
    startingDate: ""
  },
{
    id: "wipro-intern-l1",
    company: "Wipro Limited",
    logo: "assets/logos/wipro.svg",
    companyBlurb: "Intern L1 · Pan-India internship · Kochi + 7 metros · Official Wipro Careers · Ref 181899 · Posted 6 Jul 2026.",
    location: "Pan India · Kochi, Bengaluru, Chennai, Hyderabad, Pune, Mumbai, Delhi / New Delhi",
    workLocations: [
      "Kochi (Kerala)",
      "Bengaluru (Karnataka)",
      "Chennai (Tamil Nadu)",
      "Hyderabad (Telangana)",
      "Pune (Maharashtra)",
      "Mumbai (Maharashtra)",
      "Delhi",
      "New Delhi"
    ],
    workStates: [
      "Kerala",
      "Karnataka",
      "Tamil Nadu",
      "Telangana",
      "Maharashtra",
      "Delhi"
    ],
    roles: [
      "Intern L1"
    ],
    experience: "fresher",
    experienceRange: "Freshers / Students · 2026 & 2027 batches",
    employmentType: "Internship",
    applyLink: "https://careers.wipro.com/job/INTERN-L1/181899-en_US/",
    applyDeadline: "Rolling",
    postedDate: "2026-07-23",
    postingStartDate: "2026-07-06",
    source: "Wipro Careers",
    verified: true,
    tags: [
      "IT",
      "Internship",
      "Fresher"
    ],
    isWalkIn: false,
    walkInDate: "",
    alertSheet: true,
    alertLabel: "INTERNSHIP JOB ALERT · PAN INDIA",
    referenceId: "181899",
    teamName: "North America Transformation Team (Early Careers / Intern track)",
    email: "",
    phone: "",
    website: "https://careers.wipro.com/",
    address: "Wipro offices across India — final location based on business requirements",
    industry: "IT Services / Consulting / Early Careers",
    companySize: "Global IT major · ~230,000+ employees worldwide · Early Careers & Intern programmes across India",
    salaryRange: "Internship stipend — as per Wipro Early Careers offer letter (not publicly listed on careers page)",
    companyDetails: "Wipro Limited is hiring Intern L1 through the official Wipro Careers portal (Reference ID: 181899). Official posting start date: 6 July 2026. This internship / co-op is part of North America’s Transformation Team initiatives — explore tech trends, build domain expertise, and craft solutions for real-world business challenges while collaborating with global teams and senior leaders.",
    workDetails: "Intern L1 — pan-India internship alert. Cities on official posting: Bengaluru, Chennai, Hyderabad, Pune, Mumbai, Delhi, Kochi, New Delhi. States: Delhi, Karnataka, Kerala, Maharashtra, Tamil Nadu, Telangana. Preferred: B.E. / B.Tech / MBA (also M.E. / M.Tech / MCA / BCA for some tracks). 2026 & 2027 batches welcome. No prior work experience required. Apply free only via official Wipro Careers.",
    workStatus: "Internship / Co-op",
    workMode: "On-site · Assigned Wipro office (business requirement)",
    experienceYears: "Freshers / Students · No prior work experience required",
    whoCanApply: [
      "B.E. / B.Tech students",
      "MBA students",
      "2026 and 2027 graduating batches (as per current hiring information)",
      "Freshers and students currently pursuing or recently completed eligible degrees",
      "M.E. / M.Tech / MCA / BCA candidates for some internship tracks",
      "Candidates open to joining any listed Wipro city based on business allocation"
    ],
    educationalQualification: [
      "B.E. / B.Tech (preferred)",
      "MBA (preferred)",
      "M.E. / M.Tech (some tracks)",
      "MCA / BCA (some internship tracks)",
      "Relevant academic background + any extra criteria shown during application"
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
      "Testing fundamentals",
      "Basic cloud / automation awareness (advantage)"
    ],
    softSkills: [
      "Good communication",
      "Problem solving",
      "Analytical thinking",
      "Team collaboration",
      "Adaptability",
      "Learning mindset",
      "Leadership qualities & self-confidence",
      "Networking with mentors / leaders"
    ],
    responsibilities: [
      "Collaborate with global teams and senior leaders on internal initiatives aligned to strategic partners",
      "Explore tech trends, develop domain expertise, and craft solutions for real-world business challenges",
      "Identify business requirements, translate into an actionable plan, and produce quality work",
      "Participate in key meetings with partner leaders and cross-functional stakeholders",
      "Engage and network with senior leaders who provide focused mentorship and leadership coaching",
      "Demonstrate leadership qualities and self-confidence while working collaboratively in a team",
      "Support software development, testing, documentation, research, POCs, or business tasks as assigned",
      "Gain practical industry experience through live projects and Agile ways of working"
    ],
    selectionProcess: [
      "1. Online application on Wipro Careers (or Start applying with LinkedIn)",
      "2. Resume shortlisting",
      "3. Online assessment (if applicable)",
      "4. Technical / functional interview",
      "5. HR interview",
      "6. Offer letter",
      "7. Background verification",
      "8. Onboarding"
    ],
    applySteps: [
      "Visit the official Wipro Careers page",
      "Open the Intern L1 job posting (Ref 181899)",
      "Read eligibility criteria and job description carefully",
      "Fill in personal and academic details",
      "Upload your latest resume (PDF)",
      "Submit the application — or use Start applying with LinkedIn on the careers page"
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
      "Highlight final-year / academic projects first",
      "Mention Flutter / React / Java / Python / C++ if relevant",
      "Add web development, AI/ML projects, cloud certifications",
      "List hackathons, open-source contributions, GitHub repos",
      "Include prior internships clearly with outcomes",
      "Keep resume to 1 page if possible; use PDF; no typos"
    ],
    applyChecklist: [
      "Official careers link opened (careers.wipro.com — Ref 181899)",
      "Eligibility checked (degree + batch)",
      "Resume PDF ready with projects + LinkedIn/GitHub",
      "Documents folder ready (ID, marksheets, certificates)",
      "No one asked for money — application is free",
      "You understand location may be any listed Wipro city"
    ],
    faqs: [
      "Is there an application fee? No. Apply only on official Wipro Careers.",
      "Can Kochi candidates apply? Yes — Kochi is listed on the official posting.",
      "Do I need prior experience? No. Freshers and students may apply.",
      "Will I get my preferred city? Final location depends on business requirements.",
      "Does applying guarantee selection? No. Shortlisting follows Wipro’s process.",
      "Suspicious job offer / fee request? Report to helpdesk.recruitment@wipro.com — do not share money or OTP."
    ],
    benefits: [
      "Practical experience with Wipro’s Transformation / Early Careers initiatives",
      "Mentorship and leadership coaching from senior leaders",
      "Exposure to tech trends, domain expertise, and real business challenges",
      "Collaboration with global / cross-functional teams",
      "Possible Pre-Placement Offer (PPO) pathway (performance & business dependent)",
      "Pathway to full-time Graduate Engineer / Early Career programmes",
      "Internal upskilling and certifications opportunities"
    ],
    interviewTips: [
      "Apply only on https://careers.wipro.com/job/INTERN-L1/181899-en_US/",
      "You can also start applying with LinkedIn from the official careers page",
      "Read the official JD carefully before submitting",
      "Upload latest PDF resume with projects + GitHub/LinkedIn",
      "Prepare basics: DSA, OOP, SQL, communication, and 1–2 project walkthroughs",
      "There is NO application fee — ignore anyone asking for money",
      "Meeting eligibility does not guarantee interview or selection"
    ],
    importantNotes: [
      "This is an official Wipro Careers opening (Ref ID: 181899).",
      "Official posting start date on Wipro Careers: 6 July 2026.",
      "There is no application fee.",
      "Apply only through the official Wipro Careers portal.",
      "Meeting eligibility criteria does not guarantee an interview or selection.",
      "Final shortlisting follows Wipro's recruitment process.",
      "Wipro may modify the hiring process at any stage.",
      "Candidates may be assigned to any eligible Wipro location based on business needs.",
      "Wipro is an Equal Opportunity Employer and provides reasonable accommodation during recruitment when requested in advance."
    ],
    safetyNotes: [
      "If you see suspicious mail, ads, or people offering Wipro jobs for a fee, email helpdesk.recruitment@wipro.com.",
      "Do not email your resume to helpdesk.recruitment@wipro.com — that ID is not monitored for applications.",
      "Unethical / unfair hiring concerns: ombuds.person@wipro.com.",
      "InfoparkDaily never charges candidates. Never pay for a job or internship."
    ],
    howToApply: "1) Visit official Wipro Careers. 2) Open Intern L1 posting (Ref 181899). 3) Read eligibility + JD. 4) Fill personal & academic details. 5) Upload latest resume. 6) Submit — or use Start applying with LinkedIn. Official link: https://careers.wipro.com/job/INTERN-L1/181899-en_US/",
    hiringNotes: "INTERNSHIP JOB ALERT · Pan-India · Intern L1 · Ref 181899 · Posted 6 Jul 2026 · Prefer B.E./B.Tech/MBA · 2026 & 2027 batches · Cities: Kochi, Bengaluru, Chennai, Hyderabad, Pune, Mumbai, Delhi/New Delhi · Apply free on official Wipro Careers only.",
    description: "Wipro Intern L1 · Pan India · Freshers/Students · Official Careers Ref 181899",
    startingDate: ""
  },
{
    id: "pickyassist-bd-executive",
    company: "Picky Assist (P) Ltd",
    logo: "assets/logos/pickyassist.svg",
    companyBlurb: "Business Development Executive · Technopark Trivandrum · Apply by 25 July 2026.",
    location: "Technopark, Trivandrum",
    roles: [
      "Business Development Executive"
    ],
    experience: "both",
    experienceRange: "Fresher + Experienced",
    employmentType: "Full-time",
    applyLink: "https://pickyassist.com/en",
    applyDeadline: "2026-07-25",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: [
      "Sales",
      "Business"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://pickyassist.com/en",
    address: "Technopark / Trivandrum, Kerala",
    industry: "SaaS / Conversational CRM / Business Automation",
    companySize: "Product company · Global customers · India hub in Trivandrum",
    salaryRange: "Not publicly listed — confirm during hiring",
    companyDetails: "Picky Assist is a product-based SaaS company offering no/low-code conversational CRM, chatbots, and business automation. Website: https://pickyassist.com/en",
    workDetails: "Business Development Executive to drive outbound / inbound sales for the platform. Closing: 25 July 2026. Posted: 17 July 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Technopark / Trivandrum",
    experienceYears: "As per company criteria",
    requirements: [
      "Strong English communication for B2B SaaS conversations",
      "Interest in CRM / automation product sales",
      "Willingness to work from Trivandrum / Technopark region"
    ],
    skills: [
      "B2B sales",
      "Lead follow-up",
      "CRM basics",
      "Demo coordination"
    ],
    responsibilities: [
      "Generate and nurture business development leads",
      "Coordinate demos and follow-ups with prospects",
      "Maintain pipeline hygiene in the company CRM"
    ],
    benefits: [
      "SaaS product sales exposure",
      "Global customer base learning"
    ],
    interviewTips: [
      "Research Picky Assist conversational CRM offerings before the interview",
      "Apply via the official company website / careers channel listed on pickyassist.com"
    ],
    howToApply: "Apply directly via the company website / careers channel at https://pickyassist.com/en. Verify the live BD Executive posting before sending your resume.",
    hiringNotes: "Category: Internships & Fellowships section on poster · Closing 25 July 2026 · Posted 17 July 2026 · Apply on company careers pages.",
    description: "BD Executive · Technopark TVM · Apply by 25 Jul 2026",
    startingDate: ""
  },
{
    id: "inometrics-sales-digital-marketing",
    company: "Inometrics Technology Systems (P) Ltd",
    logo: "assets/logos/inometrics.svg",
    companyBlurb: "Sales & Digital Marketing Executive · Technopark Trivandrum · Apply by 26 July 2026.",
    location: "Technopark, Trivandrum",
    roles: [
      "Sales & Digital Marketing Executive"
    ],
    experience: "experienced",
    experienceRange: "Experienced",
    employmentType: "Full-time",
    applyLink: "https://www.inometrics.com",
    applyDeadline: "2026-07-26",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: [
      "Sales",
      "Marketing"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://www.inometrics.com",
    address: "Technopark Campus, Thiruvananthapuram, Kerala",
    industry: "IT Services / Technology Systems",
    companySize: "Technopark IT company",
    salaryRange: "Not publicly listed — confirm with company HR",
    companyDetails: "Inometrics Technology Systems (P) Ltd is hiring a Sales & Digital Marketing Executive for Technopark, Trivandrum operations.",
    workDetails: "Experienced sales + digital marketing dual-track role. Closing: 26 July 2026. Posted: 17 July 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Technopark Trivandrum",
    experienceYears: "Experienced (as per company)",
    requirements: [
      "Prior sales and/or digital marketing experience preferred",
      "Comfortable with lead generation, campaigns, and client follow-ups",
      "Willingness to work on-site at Technopark, Trivandrum"
    ],
    skills: [
      "Digital marketing",
      "Lead generation",
      "Social ads basics",
      "B2B sales"
    ],
    responsibilities: [
      "Drive sales pipeline and digital marketing campaigns",
      "Coordinate lead follow-ups and campaign reporting",
      "Support brand visibility for Technopark offerings"
    ],
    benefits: [
      "Technopark role",
      "Sales + marketing dual exposure"
    ],
    interviewTips: [
      "Prepare examples of campaigns or sales targets you owned",
      "Apply via the company website / official careers channel"
    ],
    howToApply: "Apply directly on the company careers / contact channel (verify live posting on the Inometrics website). Keep resume as PDF.",
    hiringNotes: "Category: Experienced Professionals · Closing 26 July 2026 · Posted 17 July 2026 · Technopark Daily Alert.",
    description: "Sales & Digital Marketing Exec · Technopark · Apply by 26 Jul 2026",
    startingDate: ""
  },
{
    id: "gnx-technical-ba-pm",
    company: "GNX Digital Solutions (P) Ltd",
    logo: "assets/logos/gnx.svg",
    companyBlurb: "Technical Business Analyst cum Project Manager · Technopark Trivandrum · Apply by 28 July 2026.",
    location: "Technopark, Trivandrum",
    roles: [
      "Technical Business Analyst CUM Project Manager"
    ],
    experience: "experienced",
    experienceRange: "Experienced",
    employmentType: "Full-time",
    applyLink: "mailto:sumi.h@gnxsolutions.in",
    applyDeadline: "2026-07-28",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT",
      "Business"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "sumi.h@gnxsolutions.in",
    phone: "",
    website: "https://www.gnxsolutions.in",
    address: "Nila, Technopark, Thiruvananthapuram, Kerala",
    industry: "IT Services / Digital Solutions",
    companySize: "Growing Technopark IT firm · Nila campus",
    salaryRange: "Not publicly listed — confirm with GNX HR",
    companyDetails: "GNX Digital Solutions (P) Ltd operates from Nila, Technopark, Trivandrum. Hiring for Technical BA + Project Manager combined track.",
    workDetails: "Technical Business Analyst cum Project Manager. Closing: 28 July 2026. Posted: 17 July 2026. On-site Technopark.",
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
    skills: [
      "Business analysis",
      "Project management",
      "Requirement gathering",
      "Agile / Scrum",
      "Stakeholder management"
    ],
    responsibilities: [
      "Gather and document business / technical requirements",
      "Coordinate delivery timelines with engineering and stakeholders",
      "Track project risks, status, and acceptance criteria"
    ],
    benefits: [
      "Technopark Nila campus",
      "BA + PM dual-track growth"
    ],
    interviewTips: [
      "Email resume to sumi.h@gnxsolutions.in with role title in subject",
      "Bring sample BRD / SRS / process-flow examples if available",
      "Be ready to discuss Agile delivery and stakeholder management"
    ],
    howToApply: "Email your resume to sumi.h@gnxsolutions.in or apply via the company’s official hiring channel. Mention Technical BA cum Project Manager.",
    hiringNotes: "Category: Experienced Professionals · Closing 28 July 2026 · Posted 17 July 2026 · Technopark Daily Alert.",
    description: "Technical BA cum PM · Technopark · Apply by 28 Jul 2026",
    startingDate: ""
  },
{
    id: "zestybeanz-odoo-developer",
    company: "Zesty Beanz Technologies (P) Ltd",
    logo: "assets/logos/zestybeanz.svg",
    companyBlurb: "Odoo Developer (1–2 years) · Technopark Trivandrum · Apply by 31 Aug 2026.",
    location: "Technopark, Trivandrum",
    roles: [
      "Odoo Developer"
    ],
    experience: "experienced",
    experienceRange: "1–2 Years",
    employmentType: "Full-time",
    applyLink: "https://zbeanztech.com/jobs",
    applyDeadline: "2026-08-31",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT",
      "Development"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "contact@zbeanztech.com",
    phone: "+91 9895834246",
    website: "https://zbeanztech.com/",
    address: "Technopark / Thiruvananthapuram, Kerala",
    industry: "Odoo ERP / Digital Transformation",
    companySize: "100+ experts · Official Odoo Partner · India / UAE / Germany",
    salaryRange: "Not publicly listed — confirm with Zesty Beanz HR",
    companyDetails: "Zesty Beanz Technologies is an Official Odoo Partner delivering ERP, e-commerce, DevOps, and mobile solutions. Careers: https://zbeanztech.com/jobs — contact@zbeanztech.com.",
    workDetails: "Odoo Developer with 1–2 years experience. Closing: 31 Aug 2026. Posted: 17 July 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Technopark / Trivandrum",
    experienceYears: "1–2 years",
    requirements: [
      "1–2 years Odoo / Python development experience",
      "Understanding of Odoo modules, ORM, and customisation",
      "BE / B.Tech / MCA or equivalent preferred",
      "Willingness to work from Technopark / Trivandrum"
    ],
    skills: [
      "Odoo",
      "Python",
      "PostgreSQL",
      "XML / QWeb",
      "ERP customisation"
    ],
    responsibilities: [
      "Develop and customise Odoo modules",
      "Support ERP implementations and client change requests",
      "Debug, test, and document Odoo customisations"
    ],
    benefits: [
      "Official Odoo Partner environment",
      "Global delivery exposure"
    ],
    interviewTips: [
      "Highlight Odoo version experience and sample custom modules",
      "Email contact@zbeanztech.com or apply via https://zbeanztech.com/jobs",
      "Be ready for Python + Odoo technical screening"
    ],
    howToApply: "Apply via https://zbeanztech.com/jobs or email contact@zbeanztech.com. Phone: +91 9895834246. Verify the live Odoo Developer posting before applying.",
    hiringNotes: "Category: Experienced Professionals · Closing 31 Aug 2026 · Posted 17 July 2026 · Technopark Daily Alert.",
    description: "Odoo Developer · 1–2 Yrs · Technopark · Apply by 31 Aug 2026",
    startingDate: ""
  },
{
    id: "prompttech-insurance-team-lead",
    company: "PromptTech",
    logo: "assets/logos/prompttech.svg",
    companyBlurb: "Insurance – Team Lead · Technopark Trivandrum · Apply by 17 Aug 2026.",
    location: "Technopark, Trivandrum",
    roles: [
      "Insurance - Team Lead"
    ],
    experience: "experienced",
    experienceRange: "Team Lead / Experienced",
    employmentType: "Full-time",
    applyLink: "",
    applyDeadline: "2026-08-17",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: [
      "Business",
      "Insurance"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "",
    address: "Technopark Campus, Thiruvananthapuram, Kerala",
    industry: "Insurance / BPO / IT-enabled services",
    companySize: "Technopark operations",
    salaryRange: "Not publicly listed — confirm with PromptTech HR",
    companyDetails: "PromptTech is hiring an Insurance Team Lead for Technopark, Trivandrum. Apply via the company’s official careers / HR channel listed on the Technopark job alert.",
    workDetails: "Insurance Team Lead role. Closing: 17 Aug 2026. Posted: 17 July 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Technopark Trivandrum",
    experienceYears: "Team lead / experienced (insurance domain)",
    requirements: [
      "Prior insurance process / BPO leadership experience preferred",
      "Strong people management and quality ownership",
      "Willingness to work on-site at Technopark, Trivandrum"
    ],
    skills: [
      "Team leadership",
      "Insurance operations",
      "Quality monitoring",
      "Workforce management"
    ],
    responsibilities: [
      "Lead insurance operations team and daily SLAs",
      "Coach agents and monitor quality / productivity",
      "Escalate process risks and drive continuous improvement"
    ],
    benefits: [
      "Team leadership track",
      "Technopark campus role"
    ],
    interviewTips: [
      "Prepare metrics from previous team lead roles (AHT, quality, attrition)",
      "Apply via the official PromptTech careers / HR channel shown on the company posting"
    ],
    howToApply: "Apply directly on the company careers page / HR contact published with the Technopark job alert. Verify role details with PromptTech before applying.",
    hiringNotes: "Category: Experienced Professionals · Closing 17 Aug 2026 · Posted 17 July 2026 · Technopark Daily Alert.",
    description: "Insurance Team Lead · Technopark · Apply by 17 Aug 2026",
    startingDate: ""
  },
{
    id: "relaxplzz-react-training",
    company: "Relaxplzz Technologies",
    logo: "assets/logos/relaxplzz.svg",
    companyBlurb: "React JS Training — Freshers Welcome · Technopark Trivandrum · Apply by 31 July 2026.",
    location: "Technopark, Trivandrum",
    roles: [
      "React JS Training - Freshers Welcome"
    ],
    experience: "fresher",
    experienceRange: "Fresher / Training",
    employmentType: "Internship",
    applyLink: "",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT",
      "Development",
      "Internship"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "",
    address: "Technopark / Trivandrum, Kerala",
    industry: "IT Training / Software Development",
    companySize: "Technopark / Trivandrum tech training & services",
    salaryRange: "Training programme — confirm stipend / fee terms with company",
    companyDetails: "Relaxplzz Technologies is inviting freshers for React JS training at Technopark / Trivandrum. Confirm programme terms directly with the company before enrolling or applying.",
    workDetails: "React JS Training — Freshers Welcome. Closing: 31 July 2026. Posted: 17 July 2026.",
    workStatus: "Training / Fresher programme",
    workMode: "On-site · Technopark / Trivandrum",
    experienceYears: "Fresher",
    requirements: [
      "Freshers welcome — BE / B.Tech / BCA / MCA / B.Sc (CS / IT) preferred",
      "Basic programming interest; React beginners accepted as per company criteria",
      "Willingness to attend on-site at Technopark / Trivandrum"
    ],
    skills: [
      "JavaScript basics",
      "HTML / CSS",
      "Willingness to learn React",
      "Git basics"
    ],
    responsibilities: [
      "Complete React JS training modules",
      "Build practice projects as assigned",
      "Follow programme schedule and assessments"
    ],
    benefits: [
      "Fresher-friendly React pathway",
      "Technopark training environment"
    ],
    interviewTips: [
      "Clarify whether the programme is paid training, stipend internship, or placement-linked",
      "Ask for official offer / joining letter terms in writing",
      "Never pay recruitment fees — InfoparkDaily never charges candidates"
    ],
    howToApply: "Apply directly via the Relaxplzz company careers / contact channel published with the Technopark alert. Verify training vs employment terms before joining.",
    hiringNotes: "Category: Freshers & Trainee Roles · Closing 31 July 2026 · Posted 17 July 2026 · Disclaimer: confirm fee/stipend terms with company. InfoparkDaily never charges candidates.",
    description: "React JS Training · Freshers · Technopark · Apply by 31 Jul 2026",
    startingDate: ""
  },
{
    id: "sementor-etl-tester",
    company: "SE-Mentor Solutions (P) Ltd",
    logo: "assets/logos/sementor.svg",
    companyBlurb: "ETL Tester · Technopark Trivandrum · Apply by 31 July 2026.",
    location: "Technopark, Trivandrum",
    roles: [
      "ETL Tester"
    ],
    experience: "fresher",
    experienceRange: "Fresher / Entry-level",
    employmentType: "Full-time",
    applyLink: "",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT",
      "QA",
      "Data"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "",
    address: "Technopark Campus, Thiruvananthapuram, Kerala",
    industry: "IT Services / Data QA",
    companySize: "Technopark IT services",
    salaryRange: "Not publicly listed — confirm with SE-Mentor HR",
    companyDetails: "SE-Mentor Solutions (P) Ltd is hiring an ETL Tester at Technopark, Trivandrum.",
    workDetails: "ETL Tester role. Closing: 31 July 2026. Posted: 17 July 2026. Location: Technopark, Trivandrum.",
    workStatus: "Full-time",
    workMode: "On-site · Technopark Trivandrum",
    experienceYears: "Fresher / entry-level as per company",
    requirements: [
      "BE / B.Tech / MCA / B.Sc (CS / IT) preferred",
      "Interest in testing, SQL, and data validation",
      "Willingness to work on-site at Technopark, Trivandrum"
    ],
    skills: [
      "ETL testing",
      "SQL",
      "Test case design",
      "Defect tracking"
    ],
    responsibilities: [
      "Validate ETL mappings and data transformations",
      "Write test cases and log defects",
      "Compare source vs target data quality"
    ],
    benefits: [
      "Technopark QA / data testing start",
      "Hands-on ETL validation experience"
    ],
    interviewTips: [
      "Revise SQL and basic ETL testing scenarios",
      "Apply via SE-Mentor official careers / HR channel"
    ],
    howToApply: "Apply directly on the SE-Mentor company careers page / HR email published with the Technopark job alert.",
    hiringNotes: "Category: Freshers & Trainee Roles · Closing 31 July 2026 · Posted 17 July 2026 · Technopark Daily Alert.",
    description: "ETL Tester · Technopark TVM · Apply by 31 Jul 2026",
    startingDate: ""
  },
{
    id: "gescis-php-developer",
    company: "Gescis Technologies",
    logo: "assets/logos/gescis.svg",
    companyBlurb: "PHP Developer (0–1 Yr) · Technopark Trivandrum · Apply by 07 Aug 2026.",
    location: "Technopark, Trivandrum",
    roles: [
      "PHP Developer"
    ],
    experience: "fresher",
    experienceRange: "0–1 Year",
    employmentType: "Full-time",
    applyLink: "",
    applyDeadline: "2026-08-07",
    postedDate: "2026-07-17",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT",
      "Development"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "",
    address: "Technopark / Trivandrum, Kerala",
    industry: "IT Services / Web Development",
    companySize: "Technopark / Trivandrum tech company",
    salaryRange: "Not publicly listed — confirm with Gescis HR",
    companyDetails: "Gescis Technologies is hiring a PHP Developer (0–1 year experience) for Technopark / Trivandrum operations.",
    workDetails: "PHP Developer with 0–1 year experience. Closing: 07 Aug 2026. Posted: 17 July 2026.",
    workStatus: "Full-time",
    workMode: "On-site · Technopark / Trivandrum",
    experienceYears: "0–1 year",
    requirements: [
      "0–1 year PHP development experience (freshers with projects welcome)",
      "BE / B.Tech / BCA / MCA / B.Sc (CS / IT) preferred",
      "Basic MySQL and web fundamentals",
      "Willingness to work on-site at Technopark / Trivandrum"
    ],
    skills: [
      "PHP",
      "MySQL",
      "HTML / CSS / JavaScript",
      "Laravel / CodeIgniter familiarity preferred"
    ],
    responsibilities: [
      "Build and maintain PHP web applications",
      "Write and optimise MySQL queries",
      "Fix bugs and ship incremental features"
    ],
    benefits: [
      "Entry-level PHP role",
      "Technopark / Trivandrum location"
    ],
    interviewTips: [
      "Prepare a GitHub / project demo of PHP work",
      "Revise PHP basics, MySQL, and one framework if listed",
      "Apply via Gescis official careers / HR channel from the Technopark posting"
    ],
    howToApply: "Apply directly on the Gescis Technologies careers page / HR contact published with the Technopark job alert.",
    hiringNotes: "Category: Freshers & Trainee Roles · Closing 07 Aug 2026 · Posted 17 July 2026 · Technopark Daily Alert.",
    description: "PHP Developer · 0–1 Yr · Technopark · Apply by 07 Aug 2026",
    startingDate: ""
  },
{
    id: "urolime-hr-recruiter",
    company: "Urolime Technologies",
    logo: "assets/logos/urolime.svg",
    companyBlurb: "HR Recruiter (1–3 years) · Infopark Kochi · Apply by 28 July 2026 via Urolime Careers.",
    location: "Infopark, Kakkanad, Kochi",
    roles: [
      "HR Recruiter"
    ],
    experience: "experienced",
    experienceRange: "1–3 Years",
    employmentType: "Full-time",
    applyLink: "https://www.urolime.com/in/careers.html",
    applyDeadline: "2026-07-28",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "HR"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@urolime.com",
    phone: "+91 484 2984589",
    website: "https://www.urolime.com/",
    address: "6th Floor, Office No.6A-2, Wing 1, Jyothirmaya Building, Infopark Phase II, Puthencruz / Kakkanad, Ernakulam, Kerala 682303",
    industry: "DevOps / Cloud Consulting / IT Services",
    companySize: "Global team · India hub at Infopark Kochi (also UAE, USA, UK)",
    salaryRange: "Not publicly listed — confirm with Urolime HR during process",
    companyDetails: "Urolime Technologies is a DevOps, AWS, and cloud consulting company with product engineering and managed services offerings. The Kochi delivery hub sits in Jyothirmaya, Infopark Phase II. Official careers: https://www.urolime.com/in/careers.html — applications also accepted at careers@urolime.com.",
    workDetails: "HR Recruiter (1–3 years) for Infopark Kochi hiring across DevOps, cloud, and engineering roles. Work mode: on-site. Last date: 28 July 2026.",
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
    howToApply: "Apply on Urolime Careers: https://www.urolime.com/in/careers.html or email PDF resume to careers@urolime.com with subject “HR Recruiter – Infopark Kochi”.",
    hiringNotes: "Category: HR · Last date 28 July 2026 · Official careers https://www.urolime.com/in/careers.html · Map: Jyothirmaya, Infopark Phase II. Verify live openings on the careers page before applying.",
    description: "HR Recruiter · 1–3 Yrs · Infopark · Apply by 28 Jul 2026",
    startingDate: ""
  },
{
    id: "alphasky-hr-admin",
    company: "Alphasky Ventures Pvt. Ltd.",
    logo: "assets/logos/alphasky.svg",
    companyBlurb: "HR & Admin Executive (1–3 years) · Infopark Kochi · Apply via company website / HR contact by 31 July 2026.",
    location: "Infopark, Kakkanad, Kochi",
    roles: [
      "HR & Admin Executive"
    ],
    experience: "experienced",
    experienceRange: "1–3 Years",
    employmentType: "Full-time",
    applyLink: "https://www.alphasky.in",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "HR"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://www.alphasky.in",
    address: "Infopark, Kakkanad, Kochi, Kerala",
    industry: "Business / Ventures",
    companySize: "Growing Infopark Kochi team (exact headcount not public)",
    salaryRange: "Not publicly listed — ask HR during process",
    companyDetails: "Alphasky Ventures Pvt. Ltd. operates from Infopark Kochi and is hiring an HR & Admin Executive. Official website: https://www.alphasky.in — no separate public careers microsite was listed, so apply via the company website or official HR contact.",
    workDetails: "Combined people-ops + office admin role (1–3 years), on-site at Infopark Kakkanad. Last date: 31 July 2026.",
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
    howToApply: "Apply via the Alphasky company website https://www.alphasky.in or the official HR contact listed there. Prefer PDF resume titled “HR & Admin Executive – Infopark”.",
    hiringNotes: "Category: HR · Last date 31 July 2026 · Official site https://www.alphasky.in · alphaskyventures.com may not be an active careers host — use alphasky.in / official HR only.",
    description: "HR & Admin Executive · 1–3 Yrs · Infopark · Apply by 31 Jul 2026",
    startingDate: ""
  },
{
    id: "cascade-senior-hr-recruiter",
    company: "Cascade Revenue Management Pvt. Ltd.",
    logo: "assets/logos/cascade.svg",
    companyBlurb: "Senior HR Recruiter (3–6 years) · Infopark Kochi · Apply via cascaderevenue.com by 31 Aug 2026.",
    location: "Infopark, Kakkanad, Kochi",
    roles: [
      "Senior HR Recruiter"
    ],
    experience: "experienced",
    experienceRange: "3–6 Years",
    employmentType: "Full-time",
    applyLink: "https://www.cascaderevenue.com",
    applyDeadline: "2026-08-31",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "HR"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://www.cascaderevenue.com",
    address: "Infopark, Kakkanad, Kochi, Kerala",
    industry: "Revenue Cycle Management / Healthcare Business Services",
    companySize: "Mid-size RCM / healthcare operations employer (confirm on company site)",
    salaryRange: "Not publicly listed — senior recruiter band; confirm with HR",
    companyDetails: "Cascade Revenue Management Pvt. Ltd. focuses on revenue-cycle / healthcare business operations and is hiring a Senior HR Recruiter at Infopark Kochi. Official website: https://www.cascaderevenue.com — check Careers / Contact for live openings.",
    workDetails: "Senior recruiting ownership (3–6 years) for volume and specialised hiring. On-site Infopark. Last date: 31 August 2026.",
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
    howToApply: "Apply via https://www.cascaderevenue.com — use Careers or Contact channels listed on the official site. PDF resume recommended.",
    hiringNotes: "Category: HR · Last date 31 August 2026 · Official site https://www.cascaderevenue.com · Verify openings on Careers/Contact before applying.",
    description: "Senior HR Recruiter · 3–6 Yrs · Infopark · Apply by 31 Aug 2026",
    startingDate: ""
  },
{
    id: "thomson-ba-implementation",
    company: "Thomson Infocare LLP",
    logo: "assets/logos/thomson.svg",
    companyBlurb: "Business Analyst / Implementation Engineer · Infopark Kochi · Apply via company Careers by 10 Aug 2026.",
    location: "Infopark, Kakkanad, Kochi",
    roles: [
      "Business Analyst / Implementation Engineer"
    ],
    experience: "experienced",
    experienceRange: "Relevant Experience",
    employmentType: "Full-time",
    applyLink: "https://thomsuninfo.com/careers",
    applyDeadline: "2026-08-10",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT",
      "Business"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://thomsuninfo.com/careers",
    address: "Infopark, Kakkanad, Kochi, Kerala",
    industry: "IT Services / Implementation Consulting",
    companySize: "Infopark Kochi delivery team (exact headcount not public)",
    salaryRange: "Not publicly listed — confirm during hiring process",
    companyDetails: "Thomson Infocare LLP (listed careers host: thomsuninfo.com) is hiring a Business Analyst / Implementation Engineer at Infopark Kochi. Official careers: https://thomsuninfo.com/careers — apply via the company careers page.",
    workDetails: "Hybrid BA + implementation role for solution rollout and client configuration. On-site Infopark. Last date: 10 August 2026.",
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
    howToApply: "Apply via Thomson Infocare / Thomsun careers: https://thomsuninfo.com/careers . Fallback discovery: Infopark companies job portal.",
    hiringNotes: "Category: IT · Last date 10 August 2026 · Official careers https://thomsuninfo.com/careers · Always verify on the company careers page before sharing personal documents.",
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
    tags: [
      "IT",
      "DevOps",
      "Cloud"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@urolime.com",
    phone: "+91 484 2984589",
    website: "https://www.urolime.com/",
    address: "6th Floor, Office No.6A-2, Wing 1, Jyothirmaya Building, Infopark Phase II, Puthencruz / Kakkanad, Ernakulam, Kerala 682303",
    industry: "DevOps / Cloud Consulting / Platform Engineering",
    companySize: "Global DevOps & cloud consulting firm · Kochi Infopark delivery hub",
    salaryRange: "Not publicly listed — experienced DevOps bands; confirm with Urolime",
    companyDetails: "Urolime Technologies specialises in DevOps consulting, AWS/Azure/GCP, Kubernetes, CI/CD, and managed services. Kochi office: Jyothirmaya, Infopark Phase II. Official India careers: https://www.urolime.com/in/careers.html · Email: careers@urolime.com.",
    workDetails: "Three experienced openings from Urolime Careers — Solution Architect – DevOps (6+ years), DevOps Engineer (3–4 years), System Engineer L2/L3 (2+ years). On-site Infopark. Last date: 28 July 2026.",
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
    howToApply: "Apply on Urolime Careers: https://www.urolime.com/in/careers.html or email PDF resume to careers@urolime.com mentioning Solution Architect – DevOps / DevOps Engineer / System Engineer.",
    hiringNotes: "Category: IT · Last date 28 July 2026 · Official careers https://www.urolime.com/in/careers.html · Map: Jyothirmaya Infopark Phase II. Experience bars taken from Urolime’s published careers JD.",
    description: "DevOps hiring wave · 2–6+ Yrs · Infopark · Apply by 28 Jul 2026",
    startingDate: ""
  },
{
    id: "dynamed-azure-architect",
    company: "Dynamed Healthcare Solutions",
    logo: "assets/logos/dynamed.svg",
    companyBlurb: "Azure Infrastructure Architect (senior) · Infopark Kochi · Apply via dynamedhealthcare.com / LinkedIn by 31 July 2026.",
    location: "Infopark, Kakkanad, Kochi",
    roles: [
      "Azure Infrastructure Architect"
    ],
    experience: "experienced",
    experienceRange: "Senior Level",
    employmentType: "Full-time",
    applyLink: "https://dynamedhealthcare.com",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT",
      "Cloud"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://dynamedhealthcare.com",
    address: "Infopark, Kakkanad, Kochi, Kerala",
    industry: "Healthcare / Health-tech Services",
    companySize: "~60+ employees reported publicly · Infopark Kochi presence",
    salaryRange: "Not publicly listed — senior Azure architect band; confirm with employer",
    companyDetails: "Dynamed Healthcare Solutions is a healthcare services / health-tech employer hiring a senior Azure Infrastructure Architect for Infopark Kochi. Official website: https://dynamedhealthcare.com — careers also shared via Contact / LinkedIn Jobs.",
    workDetails: "Senior Azure architecture ownership for healthcare-related infrastructure. On-site Infopark. Last date: 31 July 2026.",
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
    howToApply: "Apply via https://dynamedhealthcare.com (Careers / Get in Touch) or the company’s LinkedIn Jobs posts for Azure Infrastructure Architect.",
    hiringNotes: "Category: IT · Last date 31 July 2026 · Official site https://dynamedhealthcare.com · Prefer company website or LinkedIn Jobs — never unofficial fee agents.",
    description: "Azure Infrastructure Architect · Senior · Infopark · Apply by 31 Jul 2026",
    startingDate: ""
  },
{
    id: "ss-consulting-dynamics365",
    company: "SS Consulting",
    logo: "assets/logos/ss-consulting.svg",
    companyBlurb: "Senior Consultant – Microsoft Dynamics 365 CRM · Infopark Kochi · Apply via ssconsulting.in / LinkedIn by 31 July 2026.",
    location: "Infopark, Kakkanad, Kochi",
    roles: [
      "Senior Consultant – Microsoft Dynamics 365 CRM"
    ],
    experience: "experienced",
    experienceRange: "Senior Level",
    employmentType: "Full-time",
    applyLink: "https://ssconsulting.co.in",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT",
      "Business"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://ssconsulting.co.in",
    address: "Infopark, Kakkanad, Kochi, Kerala",
    industry: "IT Consulting / Microsoft Dynamics 365",
    companySize: "Consulting practice with Infopark Kochi presence (branch careers may vary)",
    salaryRange: "Not publicly listed — senior Dynamics CRM band; confirm with SS Consulting",
    companyDetails: "SS Consulting delivers Microsoft Dynamics and related consulting services and is hiring a Senior Consultant – Microsoft Dynamics 365 CRM at Infopark Kochi. Official site (active): https://ssconsulting.co.in — careers section may vary by branch; LinkedIn Jobs is also used.",
    workDetails: "Senior Dynamics 365 CRM functional consulting. On-site Infopark. Last date: 31 July 2026.",
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
    howToApply: "Apply via https://ssconsulting.co.in (Careers / Contact) or the company’s LinkedIn Jobs listing for Senior Consultant – Microsoft Dynamics 365 CRM.",
    hiringNotes: "Category: IT · Last date 31 July 2026 · Prefer https://ssconsulting.co.in or LinkedIn Jobs · ssconsulting.in may vary by DNS/branch — use the working official site.",
    description: "Senior Consultant – Dynamics 365 CRM · Senior · Infopark · Apply by 31 Jul 2026",
    startingDate: ""
  },
{
    id: "woxro-hr-trainee",
    company: "Woxro Technologies",
    logo: "assets/logos/woxro.svg",
    companyBlurb: "HR Trainee opening for freshers at Infopark Kochi — 0–1 year experience.",
    location: "Infopark Kochi, Kakkanad",
    roles: [
      "HR Trainee"
    ],
    experience: "fresher",
    experienceRange: "Fresher / 0–1 Year",
    employmentType: "Full-time",
    applyLink: "https://woxro.com/careers",
    applyDeadline: "Rolling",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "HR",
      "Business"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "jobs@woxro.com",
    phone: "",
    website: "https://woxro.com/",
    address: "Infopark Kochi, Kakkanad, Kochi, Kerala",
    industry: "IT Services / Software Product",
    companyDetails: "Woxro Technologies is hiring an HR Trainee at Infopark Kochi for freshers and early-career candidates (0–1 year). Part of the July 2026 Infopark fresher hiring wave covering HR and IT roles across campus companies.",
    workDetails: "Entry-level HR role supporting recruitment, onboarding, and people operations. Immediate joiners preferred. Open until filled.",
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
    howToApply: "Apply via the official Woxro careers page (https://woxro.com/careers) or email your resume (PDF) to jobs@woxro.com. You can also check the Infopark Jobs listing: https://infopark.in/jobs/woxro. Keep LinkedIn updated and tailor your resume for HR / recruitment.",
    hiringNotes: "Part of InfoparkDaily fresher digest — Updated 21 July 2026. Always verify details on the official Woxro careers page before applying. Tip: PDF resume with projects, internships, and LinkedIn link.",
    description: "HR Trainee · Fresher / 0–1 Yr · Infopark Kochi",
    startingDate: "Immediate joiners preferred"
  },
{
    id: "newagesys-graduate-trainee",
    company: "NewAgeSys Solutions",
    logo: "assets/logos/newagesys.svg",
    companyBlurb: "Graduate Trainee / Junior Developer roles for freshers at Infopark Kochi.",
    location: "Infopark Kochi, Kakkanad",
    roles: [
      "Graduate Trainee",
      "Junior Developer"
    ],
    experience: "fresher",
    experienceRange: "Fresher / 0–1 Year",
    employmentType: "Full-time",
    applyLink: "https://www.newagesys.com",
    applyDeadline: "Rolling",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT",
      "Development"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://www.newagesys.com",
    address: "Infopark Kochi, Kakkanad, Kochi, Kerala",
    industry: "IT Services / Software Development",
    companyDetails: "NewAgeSys Solutions is hiring Graduate Trainees and Junior Developers at Infopark Kochi. Ideal for 2025 & 2026 pass-outs looking for an entry-level software development start.",
    workDetails: "Fresher / 0–1 year software trainee track. Apply through the official company careers page. Immediate joiners preferred. Open until filled.",
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
    howToApply: "Apply through the official NewAgeSys careers / company website: https://www.newagesys.com. Prepare a PDF resume with projects, internships, and GitHub / LinkedIn if available. Prefer official careers page over unofficial job boards.",
    hiringNotes: "Part of InfoparkDaily fresher digest — Updated 21 July 2026. Confirm role, batch eligibility, and apply steps on the official NewAgeSys site before sending your resume.",
    description: "Graduate Trainee / Junior Developer · Fresher · Infopark Kochi",
    startingDate: "Immediate joiners preferred"
  },
{
    id: "hashroot-devops-fresher",
    company: "HashRoot",
    logo: "assets/logos/hashroot.svg",
    companyBlurb: "Cloud / DevOps fresher opportunities at Infopark Kochi — 0–1 year.",
    location: "Infopark Kochi, Kakkanad",
    roles: [
      "Cloud / DevOps Fresher",
      "Junior Cloud Engineer (Fresher track)"
    ],
    experience: "fresher",
    experienceRange: "Fresher / 0–1 Year",
    employmentType: "Full-time",
    applyLink: "https://hashroot.com/careers",
    applyDeadline: "Rolling",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT",
      "DevOps",
      "Cloud"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://hashroot.com",
    address: "Infopark Kochi, Kakkanad, Kochi, Kerala",
    industry: "Cloud / DevOps / Managed Services",
    companyDetails: "HashRoot is hiring freshers for Cloud / DevOps opportunities at Infopark Kochi. Strong fit for graduates interested in Linux, cloud platforms, automation, and infrastructure careers.",
    workDetails: "Fresher Cloud / DevOps track. Apply via the HashRoot careers portal. Immediate joiners preferred. Open until filled.",
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
    howToApply: "Apply via the official HashRoot careers portal: https://hashroot.com/careers. Company site: https://hashroot.com. Use a PDF resume highlighting any cloud labs, Linux projects, certifications, or GitHub work.",
    hiringNotes: "Part of InfoparkDaily fresher digest — Updated 21 July 2026. Always apply through hashroot.com/careers and verify role details there before submitting.",
    description: "Cloud / DevOps Fresher · 0–1 Yr · Infopark Kochi",
    startingDate: "Immediate joiners preferred"
  },
{
    id: "nestsoft-software-trainee",
    company: "Nestsoft",
    logo: "assets/logos/nestsoft.svg",
    companyBlurb: "Software Trainee / Junior Developer openings for freshers at Infopark Kochi.",
    location: "Infopark Kochi, Kakkanad",
    roles: [
      "Software Trainee",
      "Junior Developer"
    ],
    experience: "fresher",
    experienceRange: "Fresher / 0–1 Year",
    employmentType: "Full-time",
    applyLink: "https://www.nestsoft.com/careers",
    applyDeadline: "Rolling",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT",
      "Development"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://www.nestsoft.com",
    address: "Infopark Kochi, Kakkanad, Kochi, Kerala",
    industry: "Software Product / IT Services",
    companyDetails: "Nestsoft is hiring Software Trainees and Junior Developers at Infopark Kochi for fresher and early-career candidates (0–1 year).",
    workDetails: "Entry-level software development roles. Apply through the Nestsoft careers page. Immediate joiners preferred. Open until filled.",
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
    howToApply: "Apply through Nestsoft careers: https://www.nestsoft.com/careers (company site: https://www.nestsoft.com). Submit a PDF resume tailored to software / junior developer roles with projects and GitHub if available.",
    hiringNotes: "Part of InfoparkDaily fresher digest — Updated 21 July 2026. Prefer the official Nestsoft careers page for applications.",
    description: "Software Trainee / Junior Developer · Fresher · Infopark Kochi",
    startingDate: "Immediate joiners preferred"
  },
{
    id: "infintor-junior-developer",
    company: "Infintor Solutions",
    logo: "assets/logos/infintor.svg",
    companyBlurb: "Junior Software Developer role for freshers at Infopark Kochi — 0–1 year.",
    location: "Infopark Kochi, Kakkanad",
    roles: [
      "Junior Software Developer"
    ],
    experience: "fresher",
    experienceRange: "Fresher / 0–1 Year",
    employmentType: "Full-time",
    applyLink: "https://people.infintor.com/jobs",
    applyDeadline: "Rolling",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT",
      "Development"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://www.infintor.com",
    address: "Infopark Kochi, Kakkanad, Kochi, Kerala",
    industry: "IT Services / Software Solutions",
    companyDetails: "Infintor Solutions is hiring Junior Software Developers at Infopark Kochi. Apply through the official Infintor careers / people portal for verified openings.",
    workDetails: "Junior software developer track for freshers and 0–1 year candidates. Immediate joiners preferred. Open until filled.",
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
    howToApply: "Apply through the official Infintor careers portal: https://www.infintor.com/career/ or jobs board: https://people.infintor.com/jobs. Use a PDF resume with projects, internships, and GitHub / LinkedIn links.",
    hiringNotes: "Part of InfoparkDaily fresher digest — Updated 21 July 2026. Always use Infintor’s official careers / people portal — avoid unofficial apply links.",
    description: "Junior Software Developer · Fresher / 0–1 Yr · Infopark Kochi",
    startingDate: "Immediate joiners preferred"
  },
{
    id: "worksent-entry-level",
    company: "WorkSent Technologies",
    logo: "assets/logos/worksent.svg",
    companyBlurb: "Entry-level IT roles for freshers at Infopark Kochi — 0–1 year experience.",
    location: "Infopark Kochi, Kakkanad",
    roles: [
      "Entry-Level IT Roles",
      "Junior IT Associate (Fresher track)"
    ],
    experience: "fresher",
    experienceRange: "Fresher / 0–1 Year",
    employmentType: "Full-time",
    applyLink: "https://worksent.com",
    applyDeadline: "Rolling",
    postedDate: "2026-07-21",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT",
      "Business"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://worksent.com",
    address: "Infopark Kochi, Kakkanad, Kochi, Kerala",
    industry: "IT Services / Technology Consulting",
    companyDetails: "WorkSent Technologies is hiring for entry-level IT roles at Infopark Kochi. Suitable for freshers and early-career candidates looking to start in IT services.",
    workDetails: "Entry-level IT openings. Apply via company careers page or LinkedIn. Immediate joiners preferred. Open until filled.",
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
    howToApply: "Apply via the WorkSent company website / careers: https://worksent.com, or through the company’s LinkedIn careers posts. Keep a PDF resume ready with projects, internships, and LinkedIn profile link.",
    hiringNotes: "Part of InfoparkDaily fresher digest — Updated 21 July 2026. Prefer official WorkSent careers or LinkedIn company posts. You may also browse Infopark Jobs Portal: https://infopark.in/careers for related campus listings.",
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
    tags: [
      "IT",
      "Business",
      "Sales"
    ],
    isWalkIn: true,
    walkInDate: "Hiring Drive — Infopark Kochi",
    email: "",
    phone: "",
    website: "https://vdartinc.com/",
    address: "Infopark, Kochi, Kerala",
    industry: "IT Services / Staffing",
    companyDetails: "VDart is running a hiring drive at Infopark Kochi for freshers (2025 / 2026 batches) across business analysis, process, customer support, QA, and technical support tracks.",
    workDetails: "Multiple fresher-friendly openings. Apply through the VDart careers site. Walk-in / drive format at Infopark Kochi.",
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
    benefits: [
      "Infopark Kochi opportunity",
      "Multiple role tracks for freshers"
    ],
    howToApply: "Apply online at https://vdartinc.com/ — select the relevant fresher role for the Infopark Kochi hiring drive.",
    hiringNotes: "Shared via InfoparkDaily Jobs. Verify schedule and apply steps on the VDart site before attending.",
    description: "Fresher hiring drive — BA, Process, Support, QA & Technical Support."
  },
{
    id: "cloud-nautical",
    company: "Cloud Nautical",
    logo: "assets/logos/cloud-nautical.svg",
    companyBlurb: "Business Analyst (immediate joiner) at Technopark, Trivandrum.",
    location: "Technopark, Trivandrum",
    roles: [
      "Business Analyst (Immediate Joiner)"
    ],
    experience: "experienced",
    experienceRange: "3+ Years",
    employmentType: "Full-time",
    applyLink: "mailto:careers@cloudnautical.com",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-15",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT",
      "Business"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@cloudnautical.com",
    phone: "",
    website: "",
    address: "Technopark, Trivandrum, Kerala",
    industry: "IT / Product Services",
    companyDetails: "Cloud Nautical is hiring a Business Analyst (immediate joiner preferred) for its Technopark, Trivandrum team.",
    workDetails: "Experienced BA role covering end-to-end project lifecycle, requirements ownership, stakeholder coordination, UAT, and wireframes / prototypes.",
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
    benefits: [
      "Technopark Trivandrum role",
      "Immediate joiner preferred"
    ],
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
    roles: [
      "Business Development Manager"
    ],
    experience: "experienced",
    experienceRange: "5–10 Years",
    employmentType: "Full-time",
    applyLink: "mailto:careers@2basetechnologies.com",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-15",
    source: "WhatsApp",
    verified: true,
    tags: [
      "Sales",
      "Business"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "careers@2basetechnologies.com",
    phone: "",
    website: "https://www.2basetechnologies.com",
    address: "Role location: Technopark, Trivandrum · Company: TransAsia Cyber Park, Infopark Phase II, Kochi 682303",
    industry: "IT / Digital Solutions",
    companyDetails: "2Base Technologies (Way 2 Digital) is hiring a Business Development Manager for Technopark, Trivandrum to drive B2B sales for web, mobile, and enterprise software services. Official contact: careers@2basetechnologies.com / info@2basetechnologies.com — no public phone on their contact page.",
    workDetails: "Senior BD role owning the full sales cycle — lead generation through closure, key accounts, and strategic revenue plans. Immediate joiners preferred.",
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
    benefits: [
      "Technopark Trivandrum location",
      "Immediate joiners preferred"
    ],
    howToApply: "Email your resume to careers@2basetechnologies.com with subject “Business Development Manager”. Do not use phone numbers from third-party posts — 2Base publishes email/form contact only.",
    hiringNotes: "Published 15 July 2026. Apply before 31 July 2026. Contact verified against https://www.2basetechnologies.com/contact-us.",
    description: "BDM · 5–10 years · Technopark TVM · Apply by 31 Jul."
  },
{
    id: "kameda",
    company: "Kameda Infologics",
    logo: "assets/logos/kameda.svg",
    companyBlurb: "Hiring Angular Developer and DevOps Engineer — apply by 31 July.",
    location: "Kerala",
    roles: [
      "Angular Developer – UI Design",
      "DevOps Engineer"
    ],
    experience: "experienced",
    experienceRange: "3–5+ Years",
    employmentType: "Full-time",
    applyLink: "mailto:preeyanka@kamedainfologics.com",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-16",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "preeyanka@kamedainfologics.com",
    phone: "",
    website: "",
    address: "Kerala",
    industry: "IT Services",
    companyDetails: "Kameda Infologics (P) Ltd is hiring experienced Angular and DevOps talent. Closing date for applications is 31 July 2026.",
    workDetails: "Two openings: Angular Developer – UI Design (4+ years) and DevOps Engineer (3–5 years).",
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
    benefits: [
      "Experienced career tracks",
      "Apply before 31 July 2026"
    ],
    howToApply: "Send your resume to preeyanka@kamedainfologics.com. Mention the role title in the subject line.",
    hiringNotes: "Closing date: 31 July 2026.",
    description: "Angular (4+) & DevOps (3–5 yrs) · Apply by 31 Jul."
  },
{
    id: "cognizant",
    company: "Cognizant",
    logo: "assets/logos/cognizant.svg",
    companyBlurb: "Technical Support Engineer for freshers / 0–2 years — scan to apply.",
    location: "Kerala / Cognizant (confirm location on apply)",
    roles: [
      "Technical Support Engineer"
    ],
    experience: "fresher",
    experienceRange: "Freshers / 0–2 Years",
    employmentType: "Full-time",
    applyLink: "https://www.instagram.com/infoparkdaily.jobs/",
    applyDeadline: "Rolling",
    postedDate: "2026-07-15",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
    website: "https://careers.cognizant.com/",
    address: "Confirm location via Cognizant apply flow",
    industry: "IT Services",
    companyDetails: "Cognizant is hiring Technical Support Engineers for freshers and early-career talent (0–2 years). Any degree with minimum 50% academics (eligible branches as per official JD).",
    workDetails: "Technical Support Engineer opening. Apply via the QR / link shared on InfoparkDaily Jobs posts, or through Cognizant careers.",
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
    howToApply: "Scan the QR code / follow the apply link shared on InfoparkDaily Jobs Instagram or WhatsApp posts for Cognizant Technical Support Engineer. Also check https://careers.cognizant.com/.",
    hiringNotes: "Verify location, JD eligibility, and apply steps on the official Cognizant careers flow before applying.",
    description: "Technical Support · Freshers / 0–2 yrs · Any degree (50%+)."
  },
{
    id: "bizforz",
    company: "Bizforz",
    logo: "assets/logos/bizforz.svg",
    companyBlurb: "Full Stack Developer (Node + React) — 2+ years at Kottakkal, Malappuram.",
    location: "Kottakkal, Malappuram",
    roles: [
      "Full Stack Developer"
    ],
    experience: "experienced",
    experienceRange: "2+ Years",
    employmentType: "Full-time",
    applyLink: "mailto:hr@bizforz.com",
    applyDeadline: "Rolling",
    postedDate: "2026-07-15",
    source: "WhatsApp",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "hr@bizforz.com",
    phone: "",
    website: "https://www.bizforz.com",
    address: "Kottakkal, Malappuram, Kerala",
    industry: "Software Product / Services",
    companyDetails: "Bizforz is hiring a Full Stack Developer for its Kottakkal, Malappuram team. Stack spans Node.js / Express, React / Next.js, SQL & NoSQL, WebSockets, and AWS.",
    workDetails: "Full-time Full Stack Developer role (2+ years). Build scalable apps, APIs, responsive UIs, real-time features, and AWS deployments.",
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
    benefits: [
      "Full-time role",
      "Modern Node + React stack"
    ],
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
    roles: [
      "Operations Executive"
    ],
    experience: "both",
    experienceRange: "Fresher / Experienced",
    employmentType: "Full-time",
    applyLink: "tel:+919947337555",
    applyDeadline: "Rolling",
    postedDate: "2026-07-15",
    source: "WhatsApp",
    verified: false,
    tags: [
      "Business",
      "Sales"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "9947 337 555",
    website: "",
    address: "Alappuzha, Kerala",
    industry: "Logistics / Last Mile",
    companyDetails: "Chrisma Consultancy is hiring an Operations Executive for a leading last-mile operations hub in Alappuzha. Salary band indicated: ₹15,000 – ₹18,000.",
    workDetails: "Logistics operations role covering daily last-mile deliveries, delivery-partner coordination, hub records, and customer query handling.",
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
    benefits: [
      "Salary ₹15,000 – ₹18,000",
      "Alappuzha-based hub role"
    ],
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
    roles: [
      "Video Editor Intern"
    ],
    experience: "fresher",
    experienceRange: "Freshers Only",
    employmentType: "Internship",
    applyLink: "mailto:hrtravelearnholidays@gmail.com",
    applyDeadline: "Rolling",
    postedDate: "2026-07-14",
    source: "WhatsApp",
    verified: false,
    tags: [
      "Marketing",
      "Design"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "hrtravelearnholidays@gmail.com",
    phone: "+91 79941 38555",
    website: "",
    address: "Calicut, Kerala",
    industry: "Travel / Creative",
    companyDetails: "Travelearn Holidays (Calicut) is hiring a Video Editor Intern for freshers. Creative travel brand looking for Premiere Pro / After Effects talent.",
    workDetails: "Internship focused on video editing for travel content. Freshers only. Drop your CV by email or WhatsApp.",
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
    benefits: [
      "Fresher-friendly internship",
      "Calicut-based creative role"
    ],
    howToApply: "Drop your CV to hrtravelearnholidays@gmail.com or WhatsApp +91 79941 38555. Instagram: @travelearn_holidays_calicut",
    hiringNotes: "Shared via InfoparkDaily Jobs. Confirm internship terms directly with the company.",
    description: "Video Editor Intern · Freshers only · Calicut."
  },
{
    id: "aceware",
    company: "Aceware Fintech Services",
    logo: "assets/logos/aceware.svg",
    companyBlurb: "Kochi fintech hiring front-office talent for client operations.",
    location: "Kochi",
    roles: [
      "Front Office Executive"
    ],
    experience: "fresher",
    experienceRange: "0–2 Years",
    employmentType: "Full-time",
    applyLink: "mailto:career@acemoney.in",
    applyDeadline: "Rolling",
    postedDate: "2026-07-16",
    source: "WhatsApp",
    verified: true,
    tags: [
      "Business",
      "Sales"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "career@acemoney.in",
    phone: "",
    website: "",
    address: "Kochi, Kerala",
    industry: "Fintech",
    companyDetails: "Aceware Fintech Services (Radiant Harmony) is a Kochi-based fintech organization. They are hiring front-office talent to support day-to-day client and office operations in a professional work environment.",
    workDetails: "Opening for Front Office Executive. Ideal for candidates looking to start or early-grow a career in a structured office setup. Experience range indicated: 0–2 years.",
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
    roles: [
      "Business Development Executive"
    ],
    experience: "fresher",
    experienceRange: "0–1 Years",
    employmentType: "Full-time",
    applyLink: "https://www.instagram.com/infoparkdaily.jobs/",
    applyDeadline: "2026-07-30",
    postedDate: "2026-07-15",
    source: "Instagram",
    verified: false,
    tags: [
      "Sales",
      "Business"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    website: "",
    address: "Technopark Campus, Trivandrum, Kerala",
    industry: "IT / Business Development",
    companyDetails: "Trainonex Solutions (P) Ltd is hiring a Business Development Executive for its Technopark Campus, Trivandrum operations.",
    workDetails: "Business Development Executive role with fresher preference (0–1 year). Focus on lead generation, outreach, and growth support.",
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
    benefits: [
      "Technopark Campus role",
      "Fresher-friendly BD opportunity"
    ],
    howToApply: "Follow updates and apply via details shared on InfoparkDaily Jobs Instagram: https://www.instagram.com/infoparkdaily.jobs/",
    description: "Fresher preferred (0–1 year).",
    hiringNotes: "Shared via InfoparkDaily Jobs Instagram channel. Confirm latest apply steps with the company."
  },
{
    id: "supporthub360",
    company: "SupportHub360",
    logo: "assets/logos/supporthub360.svg",
    companyBlurb: "Growth marketing team hiring at Infopark Phase 2.",
    location: "Infopark Phase 2, Kochi",
    roles: [
      "Digital Marketing Executive"
    ],
    experience: "experienced",
    experienceRange: "2+ Years",
    employmentType: "Full-time",
    applyLink: "https://www.instagram.com/infoparkdaily.jobs/",
    applyDeadline: "2026-07-28",
    postedDate: "2026-07-14",
    source: "Instagram",
    verified: false,
    tags: [
      "Marketing"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    website: "",
    address: "Infopark Phase 2, Kochi, Kerala",
    industry: "Digital Marketing",
    companyDetails: "SupportHub360 is hiring a Digital Marketing Executive for its Infopark Phase 2, Kochi team.",
    workDetails: "Experienced Digital Marketing Executive role covering campaign execution and growth marketing responsibilities.",
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
    benefits: [
      "Infopark Phase 2 location",
      "Full-time marketing role"
    ],
    howToApply: "Check InfoparkDaily Jobs Instagram for the latest apply instructions: https://www.instagram.com/infoparkdaily.jobs/",
    hiringNotes: "Shared via InfoparkDaily Jobs Instagram. Verify details with the hiring company."
  },
{
    id: "ss-consulting",
    company: "SS Consulting",
    logo: "assets/logos/ss-consulting.svg",
    companyBlurb: "AI consulting team hiring experienced AI Engineers.",
    location: "Kakkanad, Infopark",
    roles: [
      "AI Engineer"
    ],
    experience: "experienced",
    experienceRange: "Experienced",
    employmentType: "Full-time",
    applyLink: "https://www.infopark.in/companies-job",
    applyDeadline: "2026-07-25",
    postedDate: "2026-07-13",
    source: "Infopark",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: true,
    walkInDate: "Starting 13 July 2026",
    email: "",
    phone: "",
    website: "https://ssconsulting.co.in",
    address: "Infopark, Kakkanad, Kochi, Kerala",
    industry: "AI / Consulting",
    companyDetails: "SS Consulting is hiring an AI Engineer as part of Infopark Kochi Smart Space openings.",
    workDetails: "Experienced AI Engineer role focused on building and delivering AI solutions. Apply through the Infopark companies job portal or check ssconsulting.co.in.",
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
    benefits: [
      "Infopark Kochi location",
      "Full-time AI engineering track"
    ],
    howToApply: "Apply at https://www.infopark.in/companies-job for SS Consulting — AI Engineer.",
    hiringNotes: "Infopark Smart Space listing — week of 13 Jul 2026.",
    startingDate: "2026-07-13"
  },
{
    id: "techwarelab",
    company: "Techware Lab",
    logo: "assets/logos/techwarelab.svg",
    companyBlurb: "Startup ops and product design roles — MBA freshers welcome.",
    location: "Infopark Phase 2, Kochi",
    roles: [
      "Founder's Office Assistant (MBA Freshers)",
      "UI/UX Developer"
    ],
    experience: "both",
    experienceRange: "Fresher / ~2 years",
    employmentType: "Full-time",
    applyLink: "https://www.infopark.in/companies-job",
    applyDeadline: "2026-07-27",
    postedDate: "2026-07-13",
    source: "Infopark",
    verified: true,
    tags: [
      "Business",
      "Design"
    ],
    isWalkIn: true,
    walkInDate: "Starting 13 July 2026",
    website: "https://www.infopark.in/companies-job",
    address: "Infopark Phase 2 / Kakkanad Infopark, Kochi, Kerala",
    industry: "Technology / Startup Ops",
    companyDetails: "Techware Lab is hiring both MBA fresher talent for Founder's Office support and experienced UI/UX Developer profiles.",
    workDetails: "Two tracks: Founder's Office Assistant aimed at MBA freshers, and UI/UX Developer (around 2 years experience indicated in community posts).",
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
    benefits: [
      "Infopark Kochi opportunity",
      "Freshers + experienced tracks available"
    ],
    howToApply: "Apply through https://www.infopark.in/companies-job — Techware Lab.",
    description: "Founder's Office for MBA freshers; UI/UX Developer (2+ years).",
    hiringNotes: "Also featured on InfoparkDaily Jobs Instagram channel.",
    startingDate: "2026-07-13"
  }
];
