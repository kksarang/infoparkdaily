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
    applyLink: "mailto:info@jachoos.com",
    applyDeadline: "2026-07-30",
    postedDate: "2026-07-25",
    source: "Infopark",
    verified: true,
    tags: [
      "Marketing"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "info@jachoos.com",
    phone: "+9181290 05574",
    website: "https://www.jachoos.com",
    address: "SBC 3, 3rd floor, Thapasya Building, Phase 1, Infopark Kochi - 682030",
    industry: "IT / Infopark company",
    companyDetails: "jachoos Technologies Private Limited is a full-service Interactive Digital Transformation Agency founded 10 May 2018.It is an established IT and Media Company with an enviable and proven track-record engaged in providing Business Web Hosting, application development services, e-commerce technology, technology consulting, IT infrastructure solutions, digital and internet marketing services, video and animation making, music and audio solutions, content writings for various aspects, and various other IT and media services to clients worldwide. We are a fully in-house digital company focusing on branding, marketing, web design and development with clients ranging from start-ups to Fortune 100 companies. We pride ourselves on partnering with cl",
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
    description: "3 roles · Infopark · Apply by 2026-07-30",
    companyLegalName: "Jachoos Technologies Private Limited",
    infoparkProfile: "https://infopark.in/companies-profile/jachoos-technologies-private-limited",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to info@jachoos.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.jachoos.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/jachoos-technologies-private-limited",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Jachoos Technologies Private Limited – GOOGLE ADS SPECIALIST | InfoparkDaily Jobs",
    seoDescription: "Jachoos Technologies Private Limited hiring for GOOGLE ADS SPECIALIST in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to info@jachoos.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Jachoos Technologies",
      "Jachoos Technologies Private Limited",
      "GOOGLE ADS SPECIALIST",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Marketing"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Jachoos Technologies Private Limited is hiring for GOOGLE ADS SPECIALIST, GOOGLE AD SPECIALIST, Work Coordinator (IT Company) (Full-time) in Infopark, Kochi. Deadline: 2026-07-30.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Jachoos Technologies"
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
    website: "https://www.2basetechnologies.com",
    address: "11C, Tower 1, TransAsia Cyber Park, Infopark Phase II SEZ, Infopark Campus, Kochi, KL, India - 682303",
    industry: "IT / Infopark company",
    companyDetails: "2Base Technologies is an enterprise software development company specializing in end-to-end IT digital transformation services. With registered offices in the UK, USA, and Australia and R&D centers in Kochi and Palakkad, India, we help businesses worldwide drive efficiency, innovation, and growth through custom software solutions. With 16+ years of expertise, we have delivered tailored digital solutions across industries, including InsurTech, EdTech, Transportation & Logistics, Travel & Tourism, Healthcare, FinTech, SaaS, Agriculture, Oil & Gas, Non-Profit, and Hi-Tech. Trusted by 200+ global clients, we focus on co-creating digital strategies that align with long-term business goals. Our core services include Custom Software Development, B",
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
    description: "5 roles · Infopark · Apply by 2026-07-25",
    companyLegalName: "2Base Technologies Pvt Ltd",
    infoparkProfile: "https://infopark.in/companies-profile/2base-technologies-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Not officially available.",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to careers@2basetechnologies.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.2basetechnologies.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/2base-technologies-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "2Base Technologies Pvt Ltd – Marketing & Growth Lead | InfoparkDaily Jobs",
    seoDescription: "2Base Technologies Pvt Ltd hiring for Marketing & Growth Lead in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to careers@2basetechnologies.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "2Base Technologies",
      "2Base Technologies Pvt Ltd",
      "Marketing & Growth Lead",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Sales",
      "Design",
      "IT",
      "Marketing"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["phone","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "2Base Technologies Pvt Ltd is hiring for Marketing & Growth Lead, Visual Designer, Associate - System Engineer, Business Development Manager, Associate - QA Engineer (Full-time) in Infopark, Kochi. Deadline: 2026-07-25.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "2Base Technologies"
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
    phone: "+919422799989",
    website: "https://www.infintor.com",
    address: "8th Floor, Vismaya, Infopark Kochi Phase 1, Kochi, Kerala, India- 682030",
    industry: "IT / Infopark company",
    companyDetails: "Infintor – Your Trusted Partner for Digital Transformation Since 2014. As a globally recognized digital transformation consulting firm, Infintor has been delivering innovative solutions to enterprises and SMEs since 2014. With a proven track record and certification as an Odoo partner, we specialize in consulting, implementation, and customization of Odoo ERP, offering unmatched expertise to drive business growth. Our offices in India, Germany, Japan, Qatar, and the UAE enable us to provide tailored services to clients worldwide. ERP Implementation: Seamless integration and customization of Odoo ERP systems. Digital Engineering: Cutting-edge solutions to modernize your business processes. Mobile App Development: Custom mobile applications f",
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
    description: "1 roles · Infopark · Apply by 2026-07-29",
    companyLegalName: "Infintor Solutions LLP",
    infoparkProfile: "https://infopark.in/companies-profile/infintor-solutions-llp",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to info@infintor.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.infintor.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/infintor-solutions-llp",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Infintor Solutions LLP – Digital Marketing Executive | InfoparkDaily Jobs",
    seoDescription: "Infintor Solutions LLP hiring for Digital Marketing Executive in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to info@infintor.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Infintor Solutions",
      "Infintor Solutions LLP",
      "Digital Marketing Executive",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Marketing"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Infintor Solutions LLP is hiring for Digital Marketing Executive (Full-time) in Infopark, Kochi. Deadline: 2026-07-29.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Infintor Solutions"
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
    applyLink: "mailto:info@cloudhousetechnologies.com",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-24",
    source: "Infopark",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "info@cloudhousetechnologies.com",
    phone: "0480 2737360",
    website: "https://infopark.in/companies-job",
    address: "CloudHouse Technologies Pvt.Ltd, Special Economic Zone (SEZ), Indeevaram Buiding, Infopark Thrissur, Nalukettu Road, Koratty, Kerala, India - 680308",
    industry: "IT / Infopark company",
    companyDetails: "CloudHouse Technologies Pvt. Ltd. is a premier IT and software development firm specializing in cloud solutions, ERP integrations, and innovative software products. With extensive expertise in cloud infrastructure, server management, and enterprise software, CloudHouse delivers scalable, secure, and cost-effective IT solutions to businesses worldwide. The company is known for its flagship product, CloudStick, a powerful cloud control panel that simplifies server and website management. Additionally, CloudHouse provides ERP solutions, custom software development, and server management services through GetMyAdmin. It leverages open-source technologies and cutting-edge architectures to drive business efficiency and digital transformation. Clou",
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
    description: "1 roles · Infopark · Apply by 2026-07-31",
    companyLegalName: "CloudHouse Technologies Pvt.Ltd",
    infoparkProfile: "https://infopark.in/companies-profile/cloudhouse-technologies-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Infopark Jobs portal",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Internship / Trainee",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to info@cloudhousetechnologies.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/cloudhouse-technologies-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "CloudHouse Technologies Pvt.Ltd – Full Stack Developer Intern | InfoparkDaily Jobs",
    seoDescription: "CloudHouse Technologies Pvt.Ltd hiring for Full Stack Developer Intern in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to info@cloudhousetechnologies.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "CloudHouse Technologies",
      "CloudHouse Technologies Pvt.Ltd",
      "Full Stack Developer Intern",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "CloudHouse Technologies Pvt.Ltd is hiring for Full Stack Developer Intern (Internship) in Infopark, Kochi. Deadline: 2026-07-31.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "CloudHouse Technologies"
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
    phone: "0484-2983032",
    website: "https://www.newagesysindia.com",
    address: "7th Floor, Phase – II, Carnival Infopark, Infopark SEZ, Kakkanad, Kochi – / 2983033, 2983033",
    industry: "IT / Infopark company",
    companyDetails: "NewAgeSys Solutions (P) Ltd, is a growing company and has been in business since 1994. Currently we have two functional offices - Info Park Cochin, Kerala, India and at Princeton Junction, New Jersey, USA. For over 22 years we have been constantly focused on providing Excellent Client Services, providing Consulting and Software Development Services to companies in USA. Our expertise are spread wide across the fields of Software Development and Recruitment Process Outsourcing. Our Clients include major players from the United States of America, especially the Fortune 1000 Companies. Please see www.newagesysindia.com,  www.newagesys.com, and www.newagesysit.com for more info.",
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
    description: "2 roles · Infopark · Apply by 2026-07-27",
    companyLegalName: "NewAgeSys Solutions (P) Ltd.",
    infoparkProfile: "https://infopark.in/companies-profile/newagesys-solutions-p-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to career@newagesysindia.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.newagesysindia.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/newagesys-solutions-p-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "NewAgeSys Solutions (P) Ltd. – Junior QA Engineer (1 -2 YEARS Experience) | InfoparkDaily Jobs",
    seoDescription: "NewAgeSys Solutions (P) Ltd. hiring for Junior QA Engineer (1 -2 YEARS Experience) in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to career@newagesysindia.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "NewAgeSys Solutions",
      "NewAgeSys Solutions (P) Ltd.",
      "Junior QA Engineer (1 -2 YEARS Experience)",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "NewAgeSys Solutions (P) Ltd. is hiring for Junior QA Engineer (1 -2 YEARS Experience), PHP Developer/Senior Joomla Developer (Full-time) in Infopark, Kochi. Deadline: 2026-07-27.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "NewAgeSys Solutions"
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
    phone: "0484-4041580",
    website: "https://infopark.in/companies-job",
    address: "Ground Floor, Athulya Annexe, Infopark Kochi Phase 1, Kakkanad P.O, Kochi , Kerala, India , 682042",
    industry: "IT / Infopark company",
    companyDetails: "Array Platforms Pvt Ltd (earlier Macrosive) is a premier technology consulting firm and a distinguished Microsoft Partner, specializing in Tech Business Applications Consulting, Low Code No Code Apps, Business AI, and Software RPA. Our commitment to innovation and state-of-the-art solutions empowers businesses to harness technology for enhanced efficiency and growth. Beyond our technology consulting expertise, we proudly offer a suite of cutting-edge products designed to meet specific business needs. These products leverage the latest advancements in Tech Business Applications, Low Code No Code Apps, Business AI, and Software RPA, ensuring our clients stay at the forefront of technological progress. Our parent company, Macrosive Ltd., is ba",
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
    description: "1 roles · Infopark · Apply by 2026-08-31",
    companyLegalName: "Array Platforms Pvt Ltd",
    infoparkProfile: "https://infopark.in/companies-profile/array-platforms-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Infopark Jobs portal",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to neha.r@array.team",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/array-platforms-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Array Platforms Pvt Ltd – Project Manager | InfoparkDaily Jobs",
    seoDescription: "Array Platforms Pvt Ltd hiring for Project Manager in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to neha.r@array.team with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Array Platforms",
      "Array Platforms Pvt Ltd",
      "Project Manager",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Business"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Array Platforms Pvt Ltd is hiring for Project Manager (Full-time) in Infopark, Kochi. Deadline: 2026-08-31.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Array Platforms"
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
    phone: "0484-4104100",
    website: "https://www.thinkpalm.com",
    address: "1st Floor, 'Athulya' Infopark Kakkanad, Kochi - 682 030",
    industry: "IT / Infopark company",
    companyDetails: "ThinkPalm Technologies Private Ltd. is a product engineering and software services company, formulated by a team of entrepreneurs with boundless passion for technology and innovative thinking. Promoted by a multi-million dollar company, ThinkPalm exists to deliver products and services to clients spread across the globe. Aiming to achieve service excellence through integrity, reliability and our core values, company seek to provide an environment of equal rights and satisfaction to the employees and the stake holders, and thereby build up an improved social system. The founders of ThinkPalm bring in with them extensive experience in some of the most challenging markets viz. US, Japan and EMEA and hence seek to build an organization focusing",
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
    description: "1 roles · Infopark · Apply by 2026-07-31",
    companyLegalName: "Thinkpalm Technologies Pvt.Ltd",
    infoparkProfile: "https://infopark.in/companies-profile/thinkpalm-technologies-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to info@thinkpalm.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.thinkpalm.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/thinkpalm-technologies-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Thinkpalm Technologies Pvt.Ltd – Manual Testing with experience in Mobile Application Testing - 4+ Years | InfoparkDaily Jobs",
    seoDescription: "Thinkpalm Technologies Pvt.Ltd hiring for Manual Testing with experience in Mobile Application Testing - 4+ Years in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to info@thinkpalm.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Thinkpalm Technologies",
      "Thinkpalm Technologies Pvt.Ltd",
      "Manual Testing with experience in Mobile Application Testing - 4+ Years",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Thinkpalm Technologies Pvt.Ltd is hiring for Manual Testing with experience in Mobile Application Testing - 4+ Years (Full-time) in Infopark, Kochi. Deadline: 2026-07-31.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Thinkpalm Technologies"
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
    applyLink: "mailto:info@mapletechspace.com",
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
    email: "info@mapletechspace.com",
    phone: "7559923436",
    website: "https://infopark.in/companies-job",
    address: "3rd Floor Indeevaram, Infopark Thrissur, Koratty PO, Kerala - 680 308",
    industry: "IT / Infopark company",
    companyDetails: "MAPLE TECH SPACE PVT LTD is formed by Mr. Rohith Mohandas and Mr. Jithin Parakka in 2021 who are also the co-founders of MAPLE TECH SPACE INC (MTS) which is an MNC with its headquarters in Canada (1325 Eglinton Ave E, Mississauga, ON L4W 4L9, Canada). Mr. Jithin who is an IT professional for more than 10 years was earlier worked as the HOD of Computer Science Dept. of St. Thomas College of Engineering and Technology, Kannur. Mr. Rohith was the product manager of various technology products in Kodak Mahindra & ICICI bank before settling in Canada. While Rohith manages the business development and marketing of the organization in Canada, Jithin takes care of the technical solutions from Kerala. MAPLE TECH SPACE PVT LTD will be executing the p",
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
    description: "2 roles · Infopark · Apply by 2026-08-07",
    companyLegalName: "MapleTech Space Pvt Ltd",
    infoparkProfile: "https://infopark.in/companies-profile/mapletech-space-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Infopark Jobs portal",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to info@mapletechspace.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/mapletech-space-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "MapleTech Space Pvt Ltd – Junior Digital Marketing Executive | InfoparkDaily Jobs",
    seoDescription: "MapleTech Space Pvt Ltd hiring for Junior Digital Marketing Executive in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to info@mapletechspace.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "MapleTech Space",
      "MapleTech Space Pvt Ltd",
      "Junior Digital Marketing Executive",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Sales",
      "Marketing"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "MapleTech Space Pvt Ltd is hiring for Junior Digital Marketing Executive, Business Development Manager(Female-WFH) (Full-time) in Infopark, Kochi. Deadline: 2026-08-07.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "MapleTech Space"
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
    phone: "7907091213",
    website: "https://www.aventusinformatics.com",
    address: "Third Floor, Indeevaram buildinh, Infopark Thrissur, Koratty, Thrissur- 680308",
    industry: "IT / Infopark company",
    companyDetails: "We are a complete 360° Digital, Marketing, and IT company focusing on creating the most suitable technological solutions for your problems. Aventus Informatics has a global presence with headquarters in Kerala, India, and offices in Koratty, New Delhi, India and Doha, Qatar. Our 50+-strong and experienced in-house development, marketing and creative teams enable us to offer both onshore and nearshore delivery. We will help you take your business to the next level with the best combination of the latest technological enhancements and digital strategies.",
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
    description: "1 roles · Infopark · Apply by 2026-10-01",
    companyLegalName: "AVENTUS INFORMATICS",
    infoparkProfile: "https://infopark.in/companies-profile/aventus-informatics",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to hr@aventusinformatics.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.aventusinformatics.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/aventus-informatics",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "AVENTUS INFORMATICS – Business Intelligence (BI) Analyst – Analytics & Dashboarding | InfoparkDaily Jobs",
    seoDescription: "AVENTUS INFORMATICS hiring for Business Intelligence (BI) Analyst – Analytics & Dashboarding in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to hr@aventusinformatics.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Aventus Informatics",
      "AVENTUS INFORMATICS",
      "Business Intelligence (BI) Analyst – Analytics & Dashboarding",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Business"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "AVENTUS INFORMATICS is hiring for Business Intelligence (BI) Analyst – Analytics & Dashboarding (Full-time) in Infopark, Kochi. Deadline: 2026-10-01.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Aventus Informatics"
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
    phone: "0480 2731677",
    website: "https://www.lucidplus.com",
    address: "Chandanam Building, Infopark Thrissur, Nalukettu Road, Koratty - 680308",
    industry: "IT / Infopark company",
    companyDetails: "LucidPlus is a technology company with operations in Kerala, Bangalore, and Pune, delivering custom digital solutions, services, and proprietary products. We build modern, secure, and scalable applications powered by cloud-native architectures, microservices, DevOps, and AI/ML. Our expertise spans modern tech stacks, intelligent document processing (OCR), multi-channel messaging (WhatsApp, SMS, Email, RCS, Viber), AI-driven chatbots, and smart enterprise applications. Our products, LP Ensemble and LP Converse, enable businesses to achieve greater efficiency, accelerate digital transformation, enhance agility, and unlock long-term value.",
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
    description: "3 roles · Infopark · Apply by 2026-08-15",
    companyLegalName: "LucidPlus Infotech Pvt Ltd",
    infoparkProfile: "https://infopark.in/companies-profile/lucidplus",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Internship / Trainee",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to career@lucidplus.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.lucidplus.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/lucidplus",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "LucidPlus Infotech Pvt Ltd – Management Trainee – Business Operations | InfoparkDaily Jobs",
    seoDescription: "LucidPlus Infotech Pvt Ltd hiring for Management Trainee – Business Operations in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to career@lucidplus.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "LucidPlus Infotech",
      "LucidPlus Infotech Pvt Ltd",
      "Management Trainee – Business Operations",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Business",
      "Sales",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "LucidPlus Infotech Pvt Ltd is hiring for Management Trainee – Business Operations, Management Trainee – Project Management, Management Trainee – Business Development (Full-time) in Infopark, Kochi. Deadline: 2026-08-15.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile"
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
    applyLink: "mailto:info@aproitsolutions.com",
    applyDeadline: "2026-08-14",
    postedDate: "2026-07-24",
    source: "Infopark",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "info@aproitsolutions.com",
    phone: "+91 6238683058",
    website: "https://www.aproitsolutions.com",
    address: "Office No 1A-5, First Floor, Special Economic Zone (SEZ), Indeevaram, Infopark Thrissur Campus, Koratty P.O., Thrissur District - 680308",
    industry: "IT / Infopark company",
    companyDetails: "Founded in 2018, Apro IT Solutions is a dynamic and innovative digital solutions company, offering a comprehensive suite of services tailored to meet the evolving needs of businesses worldwide. Specializing in Graphic Design & Branding, Website & App Development, UI/UX Design, Digital Marketing & SEO, Social Media Marketing, Pay-Per-Click advertising ,we are committed to empowering our clients with cutting-edge solutions that drive growth and enhance brand visibility. At Apro IT Solutions, we pride ourselves on our personalized approach, delivering visually stunning websites, robust web applications, and strategic marketing campaigns designed to achieve tangible results for our clients. With a focus on excellence, expertise, and continuous ",
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
    description: "1 roles · Infopark · Apply by 2026-08-14",
    companyLegalName: "Apro IT Solutions Pvt Ltd",
    infoparkProfile: "https://infopark.in/companies-profile/apro-it-solutions-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Internship / Trainee",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to info@aproitsolutions.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.aproitsolutions.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/apro-it-solutions-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Apro IT Solutions Pvt Ltd – QC (Quality Control) Intern | InfoparkDaily Jobs",
    seoDescription: "Apro IT Solutions Pvt Ltd hiring for QC (Quality Control) Intern in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to info@aproitsolutions.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Apro IT Solutions",
      "Apro IT Solutions Pvt Ltd",
      "QC (Quality Control) Intern",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Apro IT Solutions Pvt Ltd is hiring for QC (Quality Control) Intern (Internship) in Infopark, Kochi. Deadline: 2026-08-14.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Apro IT Solutions"
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
    phone: "8590718392",
    website: "https://www.simelabs.com",
    address: "Unit No 305 & 306, Tower A, World Trade Centre, Infopark Phase 1 SEZ, Kochi",
    industry: "IT / Infopark company",
    companyDetails: "Simelabs, an Astek company, is a fast-growing digital engineering and transformation partner delivering cutting-edge solutions across AI, data, cloud, and enterprise technologies. Headquartered in Kochi, India, Simelabs combines deep technical expertise with agile delivery to help global enterprises innovate, scale, and stay ahead in a rapidly evolving digital landscape. Backed by the global strength of Astek, the company brings together strong domain knowledge, a customer-first mindset, and a passion for building impactful, future-ready solutions across industries.",
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
    description: "7 roles · Infopark · Apply by 2026-08-24",
    companyLegalName: "Simelabs - An Astek Company",
    infoparkProfile: "https://infopark.in/companies-profile/simelabs-an-astek-company",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to hr@simelabs.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.simelabs.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/simelabs-an-astek-company",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Simelabs - An Astek Company – ERP Consultant | InfoparkDaily Jobs",
    seoDescription: "Simelabs - An Astek Company hiring for ERP Consultant in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to hr@simelabs.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Simelabs (Astek)",
      "Simelabs - An Astek Company",
      "ERP Consultant",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Simelabs - An Astek Company is hiring for ERP Consultant, Cloud Administrator, Lead AI/ML Engineer, Solution Architect- Python, Node.js Full Stack Engineer, Jasper Report Developer, Senior Data Engineer (Full-time) in Infopark, Kochi. Deadline: 2026-08-24.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Simelabs (Astek)"
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
    applyLink: "mailto:Operations@nasinfosolutions.com",
    applyDeadline: "2026-08-24",
    postedDate: "2026-07-24",
    source: "Infopark",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "Operations@nasinfosolutions.com",
    phone: "04802998676",
    website: "https://www.nasinfosolutions.com",
    address: "1st Floor Mandaram, Infopark Thrissur, Koratty – 680308, Kerala – India",
    industry: "IT / Infopark company",
    companyDetails: "NAS Infosolutions is a leading provider of SAP Business One implementation services, empowering small and medium-sized enterprises (SMEs) to streamline their operations, enhance productivity, and accelerate growth. With a focus on delivering tailored solutions and exceptional customer service, we specialize in helping businesses harness the power of SAP Business One to achieve their strategic objectives. Our mission at NAS Infosolutions is to empower SMEs with affordable, scalable, and innovative SAP Business One solutions that drive operational efficiency, enable informed decision-making, and fuel business success. We are committed to delivering value through our expertise, integrity, and dedication to exceeding customer expectations.",
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
    description: "2 roles · Infopark · Apply by 2026-08-24",
    companyLegalName: "NAS Infosolutions Pvt Ltd",
    infoparkProfile: "https://infopark.in/companies-profile/nas-infosolutions-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to Operations@nasinfosolutions.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.nasinfosolutions.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/nas-infosolutions-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "NAS Infosolutions Pvt Ltd – Technical Consultant (ERP / SAP Business One) | InfoparkDaily Jobs",
    seoDescription: "NAS Infosolutions Pvt Ltd hiring for Technical Consultant (ERP / SAP Business One) in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to Operations@nasinfosolutions.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "NAS Infosolutions",
      "NAS Infosolutions Pvt Ltd",
      "Technical Consultant (ERP / SAP Business One)",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "NAS Infosolutions Pvt Ltd is hiring for Technical Consultant (ERP / SAP Business One), Functional Consultant (ERP/ SAP Business One) (Full-time) in Infopark, Kochi. Deadline: 2026-08-24.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "NAS Infosolutions"
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
    applyLink: "mailto:inspitetechnologies@gmail.com",
    applyDeadline: "2026-07-31",
    postedDate: "2026-07-23",
    source: "Infopark",
    verified: true,
    tags: [
      "IT"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "inspitetechnologies@gmail.com",
    phone: "8714153735",
    website: "https://www.inspitetech.com",
    address: "#14 TBC, Thapasya, 4th floor, Infopark Phase1, Kakkanad",
    industry: "IT / Infopark company",
    companyDetails: "Established in 2020, Inspite Technologies Pvt Ltd is a dynamic and innovative company headquartered in the Infopark Campus, Kakkanad, Kochi, with additional branches in the Government Cyberpark, Kozhikode, and Al Karama, Dubai. Our expertise spans a broad spectrum of digital solutions, including web development, web design, e-commerce development, mobile app development, custom software development, and branding. With a strong focus on integrating Artificial Intelligence into our services, we are dedicated to delivering cutting-edge, customized solutions that meet the evolving needs of businesses. Our team is committed to excellence, ensuring high-quality service delivery and customer satisfaction across all our projects.",
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
    description: "2 roles · Infopark · Apply by 2026-07-31",
    companyLegalName: "Inspite Technologies Pvt.Ltd",
    infoparkProfile: "https://infopark.in/companies-profile/inspite-technologies-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Internship / Trainee",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to inspitetechnologies@gmail.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.inspitetech.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/inspite-technologies-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Inspite Technologies Pvt.Ltd – AI Video Editor Internship Opportunity – Live US Projects | InfoparkDaily Jobs",
    seoDescription: "Inspite Technologies Pvt.Ltd hiring for AI Video Editor Internship Opportunity – Live US Projects in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to inspitetechnologies@gmail.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Inspite Technologies",
      "Inspite Technologies Pvt.Ltd",
      "AI Video Editor Internship Opportunity – Live US Projects",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Inspite Technologies Pvt.Ltd is hiring for AI Video Editor Internship Opportunity – Live US Projects, AI Developer Internship Opportunity – Live US Projects (Internship) in Infopark, Kochi. Deadline: 2026-07-31.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Inspite Technologies"
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
    phone: "+91 484 4066070",
    website: "https://www.nuvento.com",
    address: "Trans Asia Cyber Park, Infopark Phase 2, Infopark SEZ, Phase II, Kochi-682303",
    industry: "IT / Infopark company",
    companyDetails: "Nuvento is synonymous with innovative technology services. We kicked off our specialized solutions & services in 2007 and have rapidly grown in the areas of Business Intelligence, Data Analytics, Software Quality Assurance and Software Architecture. This has helped us forge partnerships with Oracle Platinum, Microsoft Silver and IBM Technologies in the business intelligence (BI) area. Head quartered in Kansas USA, we serve across various verticals such as financial services, insurance (BFSI), telecom, retail, construction and hi-tech. Our operations also extend to India (Thrichur) with sophisticated R&D center to cope with the growing list of customers from across the globe.",
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
    description: "2 roles · Infopark · Apply by 2026-08-23",
    companyLegalName: "Nuvento Systems Private Limited",
    infoparkProfile: "https://infopark.in/companies-profile/nuvento-systems-private-limited",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Internship / Trainee",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to mohan@nuvento.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.nuvento.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/nuvento-systems-private-limited",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Nuvento Systems Private Limited – Sales and Marketing Internship | InfoparkDaily Jobs",
    seoDescription: "Nuvento Systems Private Limited hiring for Sales and Marketing Internship in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to mohan@nuvento.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Nuvento Systems",
      "Nuvento Systems Private Limited",
      "Sales and Marketing Internship",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Business",
      "Sales",
      "Marketing"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Nuvento Systems Private Limited is hiring for Sales and Marketing Internship, Finance Executive (Full-time) in Infopark, Kochi. Deadline: 2026-08-23.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Nuvento Systems"
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
    applyLink: "mailto:info@edstem.com",
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
    email: "info@edstem.com",
    phone: "+91 9048738807",
    website: "https://www.edstem.com",
    address: "Office No-2B-1,Wing-2, Second Floor, Jyothirmaya Building, Infopark Phase II, Kunnathunadu Taluk, Brahmapuram P O, Kochi Ernakulam, Pin: 682030",
    industry: "IT / Infopark company",
    companyDetails: "Edstem Technologies is a complete software solutions partner you can trust in building challenging software projects. We are delivering projects from 2012 onwards for our clients across the globe, and has been instrumental in developing best in class solutions, in latest technologies. We are the experts who can bring in undiluted expertise, can keep you innovating and are easy to work with to solve your business problems. •  Custom Software Development for Web and Mobile apps •  User Experience (UI/UX) design for Web and Mobile apps •  Senior professionals engagement for remote teams •  Business as Usual teams for Software Maintenance and Support Some of the reasons why our customers have been choosing us for all their technological needs -",
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
    description: "3 roles · Infopark · Apply by 2026-08-05",
    companyLegalName: "Edstem Technologies Pvt Ltd",
    infoparkProfile: "https://infopark.in/companies-profile/edstem-technologies-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to info@edstem.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.edstem.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/edstem-technologies-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Edstem Technologies Pvt Ltd – Senior Software Engineer – Squad Lead (Java + React) | InfoparkDaily Jobs",
    seoDescription: "Edstem Technologies Pvt Ltd hiring for Senior Software Engineer – Squad Lead (Java + React) in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to info@edstem.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Edstem Technologies",
      "Edstem Technologies Pvt Ltd",
      "Senior Software Engineer – Squad Lead (Java + React)",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Business",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Edstem Technologies Pvt Ltd is hiring for Senior Software Engineer – Squad Lead (Java + React), Technical Project Manager / Lead, Business Analyst (Full-time) in Infopark, Kochi. Deadline: 2026-08-05.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Edstem Technologies"
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
    phone: "+91 9074508742",
    website: "https://www.distinctinfotech.com",
    address: "Office No. 9C, 9th Floor, Carnival Infopark Phase 2 Building, Infopark Campus, Kakkanad, Kochi- 682042.",
    industry: "IT / Infopark company",
    companyDetails: "Since 2005, Distinct Infotech Solutions has been delivering innovative software solutions for the money exchange and financial services industry. Headquartered in the UAE and serving clients across the Middle East, Asia, and Africa, we support over 50 clients in 13 countries. Our scalable, web-based technologies help businesses streamline operations, enhance customer experiences, and make smarter decisions. Alongside our software expertise, we provide strategic outsourcing with AI-powered recruitment to build high-performing teams. At DIS, we are more than a technology provider — we are a trusted partner driving growth and innovation in financial services.",
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
    description: "4 roles · Infopark · Apply by 2026-09-01",
    companyLegalName: "Distinct Infotech Solutions",
    infoparkProfile: "https://infopark.in/companies-profile/distinct-infotech-solutions",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to hradmin@distinctinfotech.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.distinctinfotech.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/distinct-infotech-solutions",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Distinct Infotech Solutions – Backend Developer (.NET Core) | InfoparkDaily Jobs",
    seoDescription: "Distinct Infotech Solutions hiring for Backend Developer (.NET Core) in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to hradmin@distinctinfotech.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Distinct Infotech",
      "Distinct Infotech Solutions",
      "Backend Developer (.NET Core)",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Distinct Infotech Solutions is hiring for Backend Developer (.NET Core), Solution Architect, Technical Manager, QC Lead (Full-time) in Infopark, Kochi. Deadline: 2026-09-01.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Distinct Infotech"
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
    phone: "0484 4061901",
    website: "https://www.aspiresys.com",
    address: "SEZ Unit 304-306, 3rd Floor, Tower B, World Trade Center, Infopark Campus, Infopark, Kochi, Kerala 682042, 0484 4061901",
    industry: "IT / Infopark company",
    companyDetails: "Aspire Systems is a global technology services firm serving as a trusted technology partner for our customers. We work with some of the world's most innovative enterprises and independent software vendors, helping them leverage technology and outsourcing in our specific areas of expertise. Our services include Product Engineering, Enterprise Solutions, Independent Testing Services and IT Infrastructure Support services. Our core philosophy of \"Attention. Always.\" communicates our belief in lavishing care and attention on our customers and employees.",
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
    description: "2 roles · Infopark · Apply by 2026-08-30",
    companyLegalName: "Aspire Systems Digital Private Limited",
    infoparkProfile: "https://infopark.in/companies-profile/aspire-systems-digital-private-limited",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to keerthana.jayaraj@aspiresys.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.aspiresys.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/aspire-systems-digital-private-limited",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Aspire Systems Digital Private Limited – Immediate Opening for Module Lead /Technical Lead | InfoparkDaily Jobs",
    seoDescription: "Aspire Systems Digital Private Limited hiring for Immediate Opening for Module Lead /Technical Lead in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to keerthana.jayaraj@aspiresys.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Aspire Systems",
      "Aspire Systems Digital Private Limited",
      "Immediate Opening for Module Lead /Technical Lead",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Aspire Systems Digital Private Limited is hiring for Immediate Opening for Module Lead /Technical Lead, Immediate Opening for Data Engineer (Full-time) in Infopark, Kochi. Deadline: 2026-08-30.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Aspire Systems"
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
    applyLink: "mailto:info@orestestech.com",
    applyDeadline: "2026-09-05",
    postedDate: "2026-07-22",
    source: "Infopark",
    verified: true,
    tags: [
      "Sales"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "info@orestestech.com",
    phone: "+918078206146",
    website: "https://www.orestestech.com",
    address: "First Floor, Carnival Infopark Phase 1, Infopark Kochi, Kakkanad, Kochi – 682042",
    industry: "IT / Infopark company",
    companyDetails: "Orestes Technologies Pvt. Ltd. successfully Started in June, 2015 and later registered to private limited on 28th January, 2019 to service global customers in the field of web design & development, Mobile App development, Web Application, Software Development, branding. We aim to meet and exceed customer satisfaction in every way possible. We have built a team of exceptionally talented professionals whom perfection is a habit.",
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
    description: "1 roles · Infopark · Apply by 2026-09-05",
    companyLegalName: "Orestes Technologies Pvt Ltd",
    infoparkProfile: "https://infopark.in/companies-profile/orestes-technologies-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Internship / Trainee",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to info@orestestech.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.orestestech.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/orestes-technologies-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Orestes Technologies Pvt Ltd – Sales Intern | InfoparkDaily Jobs",
    seoDescription: "Orestes Technologies Pvt Ltd hiring for Sales Intern in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to info@orestestech.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Orestes Technologies",
      "Orestes Technologies Pvt Ltd",
      "Sales Intern",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Sales"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Orestes Technologies Pvt Ltd is hiring for Sales Intern (Internship) in Infopark, Kochi. Deadline: 2026-09-05.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Orestes Technologies"
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
    phone: "06282685797",
    website: "https://www.voyonfolks.com",
    address: "SBC-3-6, Third Floor, Thapasya, Infopark Kochi PO, Kochi - 682042",
    industry: "IT / Infopark company",
    companyDetails: "Voyon is a company on the fast track, offering advanced IT solutions and services to clients belonging to various industry verticals. Leveraging world class talent, mature processes and proven methodologies, and taking full advantage of emerging technology trends, Voyon develops solutions that enable organizations to achieve greater efficiency at significantly lower costs.",
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
    description: "1 roles · Infopark · Apply by 2026-07-31",
    companyLegalName: "Voyon Technology Pvt Ltd",
    infoparkProfile: "https://infopark.in/companies-profile/voyon-technology-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to careers@voyon.net",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.voyonfolks.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/voyon-technology-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Voyon Technology Pvt Ltd – Business Development Executive - UAE | InfoparkDaily Jobs",
    seoDescription: "Voyon Technology Pvt Ltd hiring for Business Development Executive - UAE in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to careers@voyon.net with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Voyon Technology",
      "Voyon Technology Pvt Ltd",
      "Business Development Executive - UAE",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Sales"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Voyon Technology Pvt Ltd is hiring for Business Development Executive - UAE (Full-time) in Infopark, Kochi. Deadline: 2026-07-31.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Voyon Technology"
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
    phone: "+91 7510303111",
    website: "https://thoughtminds.ai/",
    address: "3rd floor, Unit No: 3C, Carnival Infopark, Phase II, Kochi, Kerala 682042",
    industry: "IT / Infopark company",
    companyDetails: "ThoughtMinds is a technology solution provider specializing in AI and digital engineering for AI First digital enterprises, from fast scaling startups to global Fortune companies, across industries such as manufacturing, healthcare, technology, banking and finance. We deliver AI business solutions that help organizations innovate and scale with confidence. With over two decades of entrepreneurial and engineering experience, our founders have built and scaled global technology firms, bringing deep expertise in data modernization, AI driven automation, enterprise grade AI product engineering, and end to end AI business solutions. What sets us apart is our “Half Human + Half AI” approach, which fuses human creativity with AI precision to desig",
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
    description: "1 roles · Infopark · Apply by 2026-07-27",
    companyLegalName: "ThoughtMinds System Pvt Ltd",
    infoparkProfile: "https://infopark.in/companies-profile/thoughtminds-system-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to careers@thoughtminds.io",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://thoughtminds.ai/",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/thoughtminds-system-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "ThoughtMinds System Pvt Ltd – Senior Software Engineer (Python/AI | 3-5 yrs) | InfoparkDaily Jobs",
    seoDescription: "ThoughtMinds System Pvt Ltd hiring for Senior Software Engineer (Python/AI | 3-5 yrs) in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to careers@thoughtminds.io with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "ThoughtMinds",
      "ThoughtMinds System Pvt Ltd",
      "Senior Software Engineer (Python/AI | 3-5 yrs)",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "ThoughtMinds System Pvt Ltd is hiring for Senior Software Engineer (Python/AI | 3-5 yrs) (Full-time) in Infopark, Kochi. Deadline: 2026-07-27.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "ThoughtMinds"
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
    phone: "9778423737",
    website: "https://www.lanwaresolutions.com",
    address: "9-G, Trans Asia Cyber Park Infopark Kochi Phase 2, Brahmapuram P.O., Kochi – 682303 Email: contact@lanwaresolutions.com Mob :",
    industry: "IT / Infopark company",
    companyDetails: "Lanware Solutions (LWS) is a leading provider of information technology solutions and consulting services, dedicated to helping the world's leading companies build stronger businesses.  Lanware Solutions designs, develops and deploys powerful integrated solutions for web, embedded, power, touchscreen and desktop applications. LWS provide hardware and software services to high technology industries with proven expertise in Embedded, Cloud, IOT solutions. LWS supports with a wide spectrum of strategic and tactical product and software development services.     We can help to drive some or all of your Product deliverable — whether developing a new product, migrating to new platform from a legacy framework, adding new functionality, testing or ",
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
    description: "1 roles · Infopark · Apply by 2026-08-31",
    companyLegalName: "Lanware Solutions",
    infoparkProfile: "https://infopark.in/companies-profile/lanware-solutions",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to hr@lanwaresolutions.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.lanwaresolutions.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/lanware-solutions",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Lanware Solutions – Senior Digital Marketing Specialist | InfoparkDaily Jobs",
    seoDescription: "Lanware Solutions hiring for Senior Digital Marketing Specialist in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to hr@lanwaresolutions.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Lanware Solutions",
      "Lanware Solutions",
      "Senior Digital Marketing Specialist",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Marketing"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Lanware Solutions is hiring for Senior Digital Marketing Specialist (Full-time) in Infopark, Kochi. Deadline: 2026-08-31.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile"
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
    phone: "+91 9544885558",
    website: "https://www.ynotinfo.com",
    address: "3B-16, 3rd Floor, Indeevaram Building, Infopark, Koratty P O, Thrissur, Pin - 680308., +91 9544885558",
    industry: "IT / Infopark company",
    companyDetails: "YNOT INFOSOLUTIONS is a leading Web & Mobile App Development Company based in Infopark, Kerala, India. With over a decade of experience, we take pride in our young and dynamic team of creative designers, expert developers, and technology strategists. Our passion for digital innovation and commitment to excellence have earned us recognition across various industries. We collaborate closely with clients to deliver cutting-edge solutions that maximize business growth and efficiency. By leveraging the latest digital technologies, we ensure that every project is built from the ground up for long-term success. Our exposure to businesses across India and 20+ other countries has strengthened our expertise in crafting scalable and customized digital",
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
    description: "2 roles · Infopark · Apply by 2026-07-27",
    companyLegalName: "Ynot Infosolutions",
    infoparkProfile: "https://infopark.in/companies-profile/ynot-infosolutions",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to hr@ynotinfo.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.ynotinfo.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/ynot-infosolutions",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Ynot Infosolutions – Backend Developer / Laravel Developer (Immediate Hiring) | InfoparkDaily Jobs",
    seoDescription: "Ynot Infosolutions hiring for Backend Developer / Laravel Developer (Immediate Hiring) in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to hr@ynotinfo.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Ynot Infosolutions",
      "Ynot Infosolutions",
      "Backend Developer / Laravel Developer (Immediate Hiring)",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "Marketing"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Ynot Infosolutions is hiring for Backend Developer / Laravel Developer (Immediate Hiring), Digital Marketing Executive (Full-time) in Infopark, Kochi. Deadline: 2026-07-27.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile"
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
    phone: "0484 4014666",
    website: "https://www.techversantinfotech.com",
    address: "First Floor, Lulu Cyber Park, Infopark, Kakkanad Kochi – 682030",
    industry: "IT / Infopark company",
    companyDetails: "Techversant is a leading provider of end-to-end IT services and solutions for Global 1000 companies. Techversant is a Global Technology Services and Solutions Company providing high-quality end-to-end IT Solutions and Services to its clients across the globe for more than 15 years.Techversant has been providing Technology services in the key areas of Digital Transformation, Understanding the Evolving Industrial Scenarios, Investment Priorities and Technology Disruption. We offer expertise and consultation in multiple technology domains like – ColdFusion, Python, Java, .NET, NodeJS, Ruby on Rails, Golang, PHP, Angular, ReactJS, VueJS, IOS, Android, Flutter, ReactNative, Artificial Intelligence, Data Science, Blockchain, Business Intelligence",
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
    description: "1 roles · Infopark · Apply by 2026-07-28",
    companyLegalName: "Techversant Infotech Pvt Ltd",
    infoparkProfile: "https://infopark.in/companies-profile/techversant-infotech-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to careers@techversantinfotech.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.techversantinfotech.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/techversant-infotech-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Techversant Infotech Pvt Ltd – Web Developer | InfoparkDaily Jobs",
    seoDescription: "Techversant Infotech Pvt Ltd hiring for Web Developer in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to careers@techversantinfotech.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Techversant Infotech",
      "Techversant Infotech Pvt Ltd",
      "Web Developer",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Techversant Infotech Pvt Ltd is hiring for Web Developer (Full-time) in Infopark, Kochi. Deadline: 2026-07-28.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Techversant Infotech"
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
    applyLink: "mailto:info@cabotsolutions.com",
    applyDeadline: "2026-08-31",
    postedDate: "2026-07-21",
    source: "Infopark",
    verified: true,
    tags: [
      "Sales"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "info@cabotsolutions.com",
    phone: "0484 404 5555",
    website: "https://www.cabotsolutions.com",
    address: "204, Second Floor, Lulu Cyber Tower-1, Infopark, Kakkanad, Kochi-682042.",
    industry: "IT / Infopark company",
    companyDetails: "Cabot is a value-based technology consulting firm providing end-to-end IT solutions for its clients across North America, Europe, and Australia. We have a highly skilled team in the areas of Healthcare software development, Cloud Computing, Product Design & Development Development, Business Intelligence, and IoT. Since our inception, we have delivered over 500+ projects on the web and mobile platforms using cutting-edge technologies. Our dedicated teams seamlessly integrate with the onsite development teams of our clients and add value to the client business by providing technical knowledge and flexibility. We take pride in our high-quality deliverables and our attention to our clients and partners.",
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
    description: "1 roles · Infopark · Apply by 2026-08-31",
    companyLegalName: "Cabot Technology Solutions Pvt. Ltd.",
    infoparkProfile: "https://infopark.in/companies-profile/cabot-technology-solutions-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to info@cabotsolutions.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.cabotsolutions.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/cabot-technology-solutions-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Cabot Technology Solutions Pvt. Ltd. – Inside Sales Executive | InfoparkDaily Jobs",
    seoDescription: "Cabot Technology Solutions Pvt. Ltd. hiring for Inside Sales Executive in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to info@cabotsolutions.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Cabot Technology Solutions",
      "Cabot Technology Solutions Pvt. Ltd.",
      "Inside Sales Executive",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Sales"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Cabot Technology Solutions Pvt. Ltd. is hiring for Inside Sales Executive (Full-time) in Infopark, Kochi. Deadline: 2026-08-31.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Cabot Technology Solutions"
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
    phone: "8714746555",
    website: "https://www.webduratech.com",
    address: "Ground Floor, Vismaya, Infopark Kochi Phase 1, Infopark Kochi P.O., Kochi - 682042",
    industry: "IT / Infopark company",
    companyDetails: "Webdura Technologies is a full-service web and mobile development company established in 2010. We create cost-effective and reliable software technology solutions for big and small enterprises to help them simplify business processes. From developing simple business website and mobile applications to enterprise-grade software solutions, we have been driving digital transformation for a diverse set of clients from around the globe.",
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
    description: "2 roles · Infopark · Apply by 2026-08-01",
    companyLegalName: "Webdura Technologies",
    infoparkProfile: "https://infopark.in/companies-profile/webdura-technologies",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to careers@webdura.in",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.webduratech.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/webdura-technologies",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Webdura Technologies – Senior Frontend Developer | InfoparkDaily Jobs",
    seoDescription: "Webdura Technologies hiring for Senior Frontend Developer in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to careers@webdura.in with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Webdura Technologies",
      "Webdura Technologies",
      "Senior Frontend Developer",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Webdura Technologies is hiring for Senior Frontend Developer, Senior Backend Developer (Full-time) in Infopark, Kochi. Deadline: 2026-08-01.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile"
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
    phone: "484-4050222",
    website: "https://www.vipointsolutions.net",
    address: "VIPoint Solutions Pvt Ltd Unit 1G,Carnival Infopark 2 Infopark, Kakkanad Cochin - 682030",
    industry: "IT / Infopark company",
    companyDetails: "VIPoint Solutions Pvt. Ltd a technology-driven IT services provider with an excellent track record in achieving customer satisfaction. ViPoint Solutions offers effective technical support solutions in the web hosting sector. Our clientele ranges from single clients, ISPs, resellers to data centers. ViPoint Solutions’ strength lies in its excellent team of skilled and experienced Server Admins and Database management experts. We offer services in hosting support, data center support, server monitoring/administration, back-up restoration, etc. By availing technical support from VIPoint Solutions you can get access to qualified and experienced server administrators who possess the know-how to tackle and resolve complex server issues quickly. T",
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
    description: "1 roles · Infopark · Apply by 2026-08-31",
    companyLegalName: "VIPoint Solutions Pvt Ltd",
    infoparkProfile: "https://infopark.in/companies-profile/vipoint-solutions-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to hr@vipointsolutions.net",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.vipointsolutions.net",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/vipoint-solutions-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "VIPoint Solutions Pvt Ltd – Senior System Administrator (SSA) | InfoparkDaily Jobs",
    seoDescription: "VIPoint Solutions Pvt Ltd hiring for Senior System Administrator (SSA) in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to hr@vipointsolutions.net with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "VIPoint Solutions",
      "VIPoint Solutions Pvt Ltd",
      "Senior System Administrator (SSA)",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "VIPoint Solutions Pvt Ltd is hiring for Senior System Administrator (SSA) (Full-time) in Infopark, Kochi. Deadline: 2026-08-31.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "VIPoint Solutions"
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
    phone: "+91 99950 99789",
    website: "https://infopark.in/companies-job",
    address: "Carnival Infopark Phase 1,1st Floor, Kakkanad, Kochi - 682030",
    industry: "IT / Infopark company",
    companyDetails: "We provide services that drive business transformation and operational efficiency. Building on a legacy of high standards and proven results, we deliver innovative solutions in AI, Data Analytics, and Enterprise Automation.",
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
    description: "3 roles · Infopark · Apply by 2026-08-20",
    companyLegalName: "Difinity Digital",
    infoparkProfile: "https://infopark.in/companies-profile/difinity-digital",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Infopark Jobs portal",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to careers@difinitydigital.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/difinity-digital",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Difinity Digital – Senior Full-Stack Developer (8+ Years | InfoparkDaily Jobs",
    seoDescription: "Difinity Digital hiring for Senior Full-Stack Developer (8+ Years in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to careers@difinitydigital.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Difinity Digital",
      "Difinity Digital",
      "Senior Full-Stack Developer (8+ Years",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Business",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Difinity Digital is hiring for Senior Full-Stack Developer (8+ Years, Senior AI Engineer (4+ Years Experience), Business Analyst (CRM Implementation) (Full-time) in Infopark, Kochi. Deadline: 2026-08-20.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile"
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
    phone: "9072955500",
    website: "https://www.dynamedhealth.com",
    address: "8th Floor, Wing 2, Jyothirmaya Infopark Phase 2, Brahmapuram P.O., Kochi - 682303",
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
    description: "1 roles · Infopark · Apply by 2026-07-31",
    companyLegalName: "Dynamed Healthcare Solutions Pvt.Ltd.",
    infoparkProfile: "https://infopark.in/companies-profile/dynamed-healthcare-solutions-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Internship / Trainee",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to hr@dynamedhealth.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.dynamedhealth.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/dynamed-healthcare-solutions-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Dynamed Healthcare Solutions Pvt.Ltd. – Business Development Trainee | InfoparkDaily Jobs",
    seoDescription: "Dynamed Healthcare Solutions Pvt.Ltd. hiring for Business Development Trainee in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to hr@dynamedhealth.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Dynamed Healthcare Solutions",
      "Dynamed Healthcare Solutions Pvt.Ltd.",
      "Business Development Trainee",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Business",
      "Sales",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Dynamed Healthcare Solutions Pvt.Ltd. is hiring for Business Development Trainee (Full-time) in Infopark, Kochi. Deadline: 2026-07-31.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Dynamed Healthcare Solutions"
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
    applyLink: "mailto:info@nesasoftware.com",
    applyDeadline: "2026-07-30",
    postedDate: "2026-07-20",
    source: "Infopark",
    verified: true,
    tags: [
      "Marketing"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "info@nesasoftware.com",
    phone: "+91 7593 833663",
    website: "https://www.nesasoftware.com",
    address: "Office No. GB-1, Ground Floor, Jyothiraya Building, Infopark Phase 2, Kakkanad, Kochi, Kerala - 682303",
    industry: "IT / Infopark company",
    companyDetails: "NESA Software Pvt. Ltd. is a technology-driven company focused on delivering innovative digital solutions and advanced engineering services to global clients. The company specializes in software development, Internet of Things (IoT), embedded systems, data analytics, artificial intelligence (AI) engineering, and Software-as-a-Service (SaaS) product development. NESA Software aims to help organizations improve operational efficiency, enhance decision-making, and accelerate digital transformation through scalable and secure technology solutions. The company proposes to establish its development and innovation operations at Infopark Kochi, one of the leading IT hubs in Kerala known for its strong technology ecosystem and global connectivity. F",
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
    description: "1 roles · Infopark · Apply by 2026-07-30",
    companyLegalName: "Nesa Software Pvt Ltd",
    infoparkProfile: "https://infopark.in/companies-profile/nesa-software-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to info@nesasoftware.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.nesasoftware.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/nesa-software-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Nesa Software Pvt Ltd – Content Marketer | InfoparkDaily Jobs",
    seoDescription: "Nesa Software Pvt Ltd hiring for Content Marketer in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to info@nesasoftware.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Nesa Software",
      "Nesa Software Pvt Ltd",
      "Content Marketer",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Marketing"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Nesa Software Pvt Ltd is hiring for Content Marketer (Full-time) in Infopark, Kochi. Deadline: 2026-07-30.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Nesa Software"
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
    applyLink: "mailto:hr@urolime.com",
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
    email: "hr@urolime.com",
    phone: "0484-2984589",
    website: "https://www.urolime.com",
    address: "Sixth Floor, Office No.6A-2, Wing 1, Jyothirmaya Building, Infopark Phase II, Puthencruz, Ernakulam, Kerala, 682303",
    industry: "IT / Infopark company",
    companyDetails: "Urolime, as the top DevOps consulting company in India develops bespoke innovative DevOps solutions.",
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
    description: "4 roles · Infopark · Apply by 2026-07-29",
    companyLegalName: "UROLIME",
    infoparkProfile: "https://infopark.in/companies-profile/urolime-technologies-private-limited",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced (role-dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to hr@urolime.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.urolime.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/urolime-technologies-private-limited",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "UROLIME – Solution Architect - DevOps | InfoparkDaily Jobs",
    seoDescription: "UROLIME hiring for Solution Architect - DevOps in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to hr@urolime.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Urolime Technologies",
      "UROLIME",
      "Solution Architect - DevOps",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Business",
      "Design",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "UROLIME is hiring for Solution Architect - DevOps, HR Recruiter, DevOps Engineer, System Engineer (Full-time) in Infopark, Kochi. Deadline: 2026-07-29.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile"
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
    applyLink: "mailto:hrmanager@zoiteckh.com",
    applyDeadline: "2026-07-25",
    postedDate: "2026-07-20",
    source: "Infopark",
    verified: true,
    tags: [
      "Sales"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "hrmanager@zoiteckh.com",
    phone: "+91-7306892494",
    website: "https://www.zoiteckh.com",
    address: "Ground Floor, Vismaya, Infopark Kochi Phase 1, Kakkanad 682042",
    industry: "IT / Infopark company",
    companyDetails: "ZOITECKH Information Solutions, established in 2023, was founded with a vision to harness the creativity and expertise of talented, innovative minds to deliver world-class IT services. Committed to excellence, we provide high-quality solutions tailored to meet our clients' talent requirements and business challenges. With a focus on strategic guidance and exceptional deliverables, we uphold a customer-centric approach in every engagement. We specialize in a broad spectrum of IT services, including web development, mobile application solutions, and comprehensive technical support. Our highly skilled and professional team is dedicated to addressing diverse customer needs and values client feedback. We follow rigorous standard operating proced",
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
    description: "1 roles · Infopark · Apply by 2026-07-25",
    companyLegalName: "Zoiteckh Informations Solutions",
    infoparkProfile: "https://infopark.in/companies-profile/zoiteckh-informations-solutions",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Internship / Trainee",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to hrmanager@zoiteckh.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.zoiteckh.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/zoiteckh-informations-solutions",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Zoiteckh Informations Solutions – Business Development Interns | InfoparkDaily Jobs",
    seoDescription: "Zoiteckh Informations Solutions hiring for Business Development Interns in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to hrmanager@zoiteckh.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Zoiteckh",
      "Zoiteckh Informations Solutions",
      "Business Development Interns",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Sales"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Infopark Jobs posting","Company website"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Zoiteckh Informations Solutions is hiring for Business Development Interns (Internship) in Infopark, Kochi. Deadline: 2026-07-25.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile",
    companyDisplay: "Zoiteckh"
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
    phone: "",
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
    startingDate: "Immediate joiners preferred",
    companyLegalName: "Techolas Technologies",
    contactVerification: {
      email: "As listed on the hiring source — confirm with the company",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Not officially available.",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "As stated on the source posting",
      department: "Not officially available."
    },
    technicalSkills: [
      "Python",
      "SQL",
      "Data visualization",
      "Statistics",
      "Data modeling",
      "Training / mentoring"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 0–3 Years · Freshers can also apply",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to hr@techolascalicut.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Techolas Technologies – Data Analytics Trainer | InfoparkDaily Jobs",
    seoDescription: "Techolas Technologies hiring for Data Analytics Trainer in Calicut, Kerala. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to hr@techolascalicut.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Techolas Technologies",
      "Techolas Technologies",
      "Data Analytics Trainer",
      "Calicut, Kerala",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "Training",
      "Data"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: true,
      phoneVerified: false,
      addressVerified: false,
      applyLinkVerified: true,
      sources: ["Listing source: WhatsApp"],
      unverifiedFields: ["phone","website","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","department"]
    },
    jobSummary: "Techolas Technologies is hiring for Data Analytics Trainer (Full-time) in Calicut, Kerala. Deadline: Rolling / open until filled.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "Immediate joiners preferred",
    companyLegalName: "Data Elektronik",
    contactVerification: {
      email: "As listed on the hiring source — confirm with the company",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Not officially available.",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "As stated on the source posting",
      department: "Not officially available."
    },
    technicalSkills: [
      "HTML/CSS/JS",
      "SQL",
      "REST APIs",
      "Postman",
      "Debugging",
      "Documentation"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 0–2 Years",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to rantony@data-elektronik.de",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Data Elektronik – Technical Support Engineer | InfoparkDaily Jobs",
    seoDescription: "Data Elektronik hiring for Technical Support Engineer in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to rantony@data-elektronik.de with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Data Elektronik",
      "Data Elektronik",
      "Technical Support Engineer",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "Support"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: true,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Listing source: WhatsApp"],
      unverifiedFields: ["phone","website","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","department"]
    },
    jobSummary: "Data Elektronik is hiring for Technical Support Engineer (Full-time) in Infopark, Kochi. Deadline: Rolling / open until filled.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "Immediate joiners preferred",
    companyLegalName: "Poothurans Enterprises",
    contactVerification: {
      email: "As listed on the hiring source — confirm with the company",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Not officially available.",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "As stated on the source posting",
      department: "Not officially available."
    },
    technicalSkills: [
      "MS Office",
      "Communication",
      "Documentation",
      "Scheduling",
      "Coordination"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Fresher / 0–1 Year",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to poothuranshr@gmail.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Poothurans Enterprises – Admin Assistant | InfoparkDaily Jobs",
    seoDescription: "Poothurans Enterprises hiring for Admin Assistant in Angamaly, Kerala. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to poothuranshr@gmail.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Poothurans Enterprises",
      "Poothurans Enterprises",
      "Admin Assistant",
      "Angamaly, Kerala",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "HR",
      "Admin",
      "Business"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: true,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Listing source: WhatsApp"],
      unverifiedFields: ["phone","website","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","department"]
    },
    jobSummary: "Poothurans Enterprises is hiring for Admin Assistant (Full-time) in Angamaly, Kerala. Deadline: Rolling / open until filled.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "Immediate joiners preferred",
    companyLegalName: "Estro Tech Robotics",
    contactVerification: {
      email: "As listed on the hiring source — confirm with the company",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Not officially available.",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "As stated on the source posting",
      department: "Not officially available."
    },
    technicalSkills: [
      "Business development",
      "Marketing",
      "MS Office",
      "Communication",
      "Market research"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 1–3 Years (exec roles) · Internships open",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to hr@estrotech.in",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Estro Tech Robotics – Business Development Executive | InfoparkDaily Jobs",
    seoDescription: "Estro Tech Robotics hiring for Business Development Executive in Infopark, Thrissur. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to hr@estrotech.in with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Estro Tech Robotics",
      "Estro Tech Robotics",
      "Business Development Executive",
      "Infopark, Thrissur",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Sales",
      "Marketing",
      "Internship",
      "Business"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: true,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Listing source: WhatsApp"],
      unverifiedFields: ["phone","website","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","department"]
    },
    jobSummary: "Estro Tech Robotics is hiring for Business Development Executive, Marketing Executive, Research & Development Intern, Business Development Intern, Marketing Intern (Full-time) in Infopark, Thrissur. Deadline: Rolling / open until filled.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "Immediate joiners preferred",
    companyLegalName: "Zybo Tech Lab (P) Ltd",
    contactVerification: {
      email: "As listed on the hiring source — confirm with the company",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Not officially available.",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "As stated on the source posting",
      department: "Not officially available."
    },
    technicalSkills: [
      "Manual Testing",
      "SDLC/STLC",
      "Jira",
      "Postman",
      "SQL",
      "Functional testing"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 6 Months – 1 Year (freshers with 6+ months also encouraged)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to jobs@zybotechlab.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Zybo Tech Lab (P) Ltd – Software Tester (QA Engineer) | InfoparkDaily Jobs",
    seoDescription: "Zybo Tech Lab (P) Ltd hiring for Software Tester (QA Engineer) in Technopark, Trivandrum. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to jobs@zybotechlab.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Zybo Tech Lab (P) Ltd",
      "Zybo Tech Lab (P) Ltd",
      "Software Tester (QA Engineer)",
      "Technopark, Trivandrum",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "QA"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: true,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Listing source: WhatsApp"],
      unverifiedFields: ["phone","website","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","department"]
    },
    jobSummary: "Zybo Tech Lab (P) Ltd is hiring for Software Tester (QA Engineer) (Full-time) in Technopark, Trivandrum. Deadline: 2026-07-30.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "",
    companyLegalName: "Enfycon",
    contactVerification: {
      email: "As listed on the hiring source — confirm with the company",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Not officially available.",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "As stated on the source posting",
      founded: "Not officially available.",
      companySize: "As stated on an official source",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [
      "Manual Testing",
      "LLM testing",
      "Test agents",
      "Persona-based validation",
      "AI application QA"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 3–6 Years",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to jyoti@enfycon.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Enfycon – Senior QA Testing Engineer | InfoparkDaily Jobs",
    seoDescription: "Enfycon hiring for Senior QA Testing Engineer in Bangalore (Onsite/Hybrid · 3 days office, 2 days WFH). Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to jyoti@enfycon.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Enfycon",
      "Enfycon",
      "Senior QA Testing Engineer",
      "Bangalore (Onsite/Hybrid · 3 days office, 2 days WFH)",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "QA",
      "AI"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: true,
      phoneVerified: false,
      addressVerified: false,
      applyLinkVerified: true,
      sources: ["Listing source: WhatsApp"],
      unverifiedFields: ["phone","website","linkedin","founded","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Enfycon is hiring for Senior QA Testing Engineer (Full-time) in Bangalore (Onsite/Hybrid · 3 days office, 2 days WFH). Deadline: Rolling / open until filled.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "",
    companyLegalName: "Wattlecorp Cybersecurity Labs",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [
      "Operations",
      "SEO",
      "Lead generation",
      "Social media",
      "Inbound sales"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 1–4+ Years (role dependent)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there"
    ],
    officialLinks: {
      website: "https://www.wattlecorp.com",
      careers: "https://www.wattlecorp.com",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Wattlecorp Cybersecurity Labs – Operations Manager | InfoparkDaily Jobs",
    seoDescription: "Wattlecorp Cybersecurity Labs hiring for Operations Manager in Govt. Cyberpark, Calicut. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Wattlecorp Cybersecurity Labs",
      "Wattlecorp Cybersecurity Labs",
      "Operations Manager",
      "Govt. Cyberpark, Calicut",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Sales",
      "Marketing",
      "Business",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Company website","Listing source: WhatsApp"],
      unverifiedFields: ["email","phone","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Wattlecorp Cybersecurity Labs is hiring for Operations Manager, SEO & Lead Generation Specialist, Social Media Specialist, Inbound Sales Executive (Full-time) in Govt. Cyberpark, Calicut. Deadline: Rolling / open until filled.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "",
    companyLegalName: "Virtual Hiring Drive · Kochi Customer Support",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Not officially available.",
      careersPage: "Not officially available.",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [
      "Customer support",
      "English communication"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 10+2 pass · Good English",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Follow the official company or Infopark Jobs apply instructions"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Virtual Hiring Drive · Kochi Customer Support – Customer Support Roles | InfoparkDaily Jobs",
    seoDescription: "Virtual Hiring Drive · Kochi Customer Support hiring for Customer Support Roles in Kochi (Virtual). Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Virtual Hiring Drive · Kochi Customer Support",
      "Virtual Hiring Drive · Kochi Customer Support",
      "Customer Support Roles",
      "Kochi (Virtual)",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Support",
      "Business"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: false,
      sources: ["Listing source: WhatsApp"],
      unverifiedFields: ["email","phone","website","careersPage","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Virtual Hiring Drive · Kochi Customer Support is hiring for Customer Support Roles (Full-time) in Kochi (Virtual). Deadline: 2026-07-25.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there"
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
    startingDate: "",
    companyLegalName: "Wipro Limited",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "As stated on the source posting",
      founded: "Not officially available.",
      companySize: "As stated on an official source",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    preferredSkills: [],
    eligibility: [
      "Experience: Freshers / Students · 2026 & 2027 batches",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    officialLinks: {
      website: "https://careers.wipro.com/",
      careers: "https://careers.wipro.com/job/INTERN-L1/181899-en_US/",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Wipro Limited – Intern L1 | InfoparkDaily Jobs",
    seoDescription: "Wipro Limited hiring for Intern L1 in Pan India · Kochi, Bengaluru, Chennai, Hyderabad, Pune, Mumbai, Delhi / New Delhi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Wipro Limited",
      "Wipro Limited",
      "Intern L1",
      "Pan India · Kochi, Bengaluru, Chennai, Hyderabad, Pune, Mumbai, Delhi / New Delhi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "Internship",
      "Fresher"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Company website","Listing source: Wipro Careers"],
      unverifiedFields: ["email","phone","linkedin","founded","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Wipro Limited is hiring for Intern L1 (Internship) in Pan India · Kochi, Bengaluru, Chennai, Hyderabad, Pune, Mumbai, Delhi / New Delhi. Deadline: Rolling / open until filled.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "",
    companyLegalName: "Picky Assist (P) Ltd",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "As stated on the source posting",
      founded: "Not officially available.",
      companySize: "As stated on an official source",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [
      "B2B sales",
      "Lead follow-up",
      "CRM basics",
      "Demo coordination"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Fresher + Experienced",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there"
    ],
    officialLinks: {
      website: "https://pickyassist.com/en",
      careers: "https://pickyassist.com/en",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Picky Assist (P) Ltd – Business Development Executive | InfoparkDaily Jobs",
    seoDescription: "Picky Assist (P) Ltd hiring for Business Development Executive in Technopark, Trivandrum. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Picky Assist (P) Ltd",
      "Picky Assist (P) Ltd",
      "Business Development Executive",
      "Technopark, Trivandrum",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Sales",
      "Business"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Company website","Listing source: WhatsApp"],
      unverifiedFields: ["email","phone","linkedin","founded","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Picky Assist (P) Ltd is hiring for Business Development Executive (Full-time) in Technopark, Trivandrum. Deadline: 2026-07-25.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "",
    companyLegalName: "Inometrics Technology Systems (P) Ltd",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "As stated on the source posting",
      founded: "Not officially available.",
      companySize: "As stated on an official source",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [
      "Digital marketing",
      "Lead generation",
      "Social ads basics",
      "B2B sales"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there"
    ],
    officialLinks: {
      website: "https://www.inometrics.com",
      careers: "https://www.inometrics.com",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Inometrics Technology Systems (P) Ltd – Sales & Digital Marketing Executive | InfoparkDaily Jobs",
    seoDescription: "Inometrics Technology Systems (P) Ltd hiring for Sales & Digital Marketing Executive in Technopark, Trivandrum. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Inometrics Technology Systems (P) Ltd",
      "Inometrics Technology Systems (P) Ltd",
      "Sales & Digital Marketing Executive",
      "Technopark, Trivandrum",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Sales",
      "Marketing"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Company website","Listing source: WhatsApp"],
      unverifiedFields: ["email","phone","linkedin","founded","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Inometrics Technology Systems (P) Ltd is hiring for Sales & Digital Marketing Executive (Full-time) in Technopark, Trivandrum. Deadline: 2026-07-26.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "",
    companyLegalName: "GNX Digital Solutions (P) Ltd",
    contactVerification: {
      email: "As listed on the hiring source — confirm with the company",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "As stated on the source posting",
      founded: "Not officially available.",
      companySize: "As stated on an official source",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [
      "Business analysis",
      "Project management",
      "Requirement gathering",
      "Agile / Scrum",
      "Stakeholder management"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to sumi.h@gnxsolutions.in",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.gnxsolutions.in",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "GNX Digital Solutions (P) Ltd – Technical Business Analyst CUM Project Manager | InfoparkDaily Jobs",
    seoDescription: "GNX Digital Solutions (P) Ltd hiring for Technical Business Analyst CUM Project Manager in Technopark, Trivandrum. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to sumi.h@gnxsolutions.in with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "GNX Digital Solutions (P) Ltd",
      "GNX Digital Solutions (P) Ltd",
      "Technical Business Analyst CUM Project Manager",
      "Technopark, Trivandrum",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "Business"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: false,
      emailVerified: true,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Company website","Listing source: WhatsApp"],
      unverifiedFields: ["phone","linkedin","founded","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "GNX Digital Solutions (P) Ltd is hiring for Technical Business Analyst CUM Project Manager (Full-time) in Technopark, Trivandrum. Deadline: 2026-07-28.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    phone: "",
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
    startingDate: "",
    companyLegalName: "Zesty Beanz Technologies (P) Ltd",
    contactVerification: {
      email: "As listed on the hiring source — confirm with the company",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "As stated on the source posting",
      founded: "Not officially available.",
      companySize: "As stated on an official source",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [
      "Odoo",
      "Python",
      "PostgreSQL",
      "XML / QWeb",
      "ERP customisation"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 1–2 Years",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there",
      "Email your resume to contact@zbeanztech.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://zbeanztech.com/",
      careers: "https://zbeanztech.com/jobs",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Zesty Beanz Technologies (P) Ltd – Odoo Developer | InfoparkDaily Jobs",
    seoDescription: "Zesty Beanz Technologies (P) Ltd hiring for Odoo Developer in Technopark, Trivandrum. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to contact@zbeanztech.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Zesty Beanz Technologies (P) Ltd",
      "Zesty Beanz Technologies (P) Ltd",
      "Odoo Developer",
      "Technopark, Trivandrum",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "Development"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: false,
      emailVerified: true,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Company website","Listing source: WhatsApp"],
      unverifiedFields: ["phone","linkedin","founded","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Zesty Beanz Technologies (P) Ltd is hiring for Odoo Developer (Full-time) in Technopark, Trivandrum. Deadline: 2026-08-31.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "",
    companyLegalName: "PromptTech",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Not officially available.",
      careersPage: "Not officially available.",
      linkedin: "Not officially available.",
      salary: "As stated on the source posting",
      founded: "Not officially available.",
      companySize: "As stated on an official source",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [
      "Team leadership",
      "Insurance operations",
      "Quality monitoring",
      "Workforce management"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Team Lead / Experienced",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Follow the official company or Infopark Jobs apply instructions"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "PromptTech – Insurance - Team Lead | InfoparkDaily Jobs",
    seoDescription: "PromptTech hiring for Insurance - Team Lead in Technopark, Trivandrum. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "PromptTech",
      "PromptTech",
      "Insurance - Team Lead",
      "Technopark, Trivandrum",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Business",
      "Insurance"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: false,
      sources: ["Listing source: WhatsApp"],
      unverifiedFields: ["email","phone","website","careersPage","linkedin","founded","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "PromptTech is hiring for Insurance - Team Lead (Full-time) in Technopark, Trivandrum. Deadline: 2026-08-17.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "",
    companyLegalName: "Relaxplzz Technologies",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Not officially available.",
      careersPage: "Not officially available.",
      linkedin: "Not officially available.",
      salary: "As stated on the source posting",
      founded: "Not officially available.",
      companySize: "As stated on an official source",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [
      "JavaScript basics",
      "HTML / CSS",
      "Willingness to learn React",
      "Git basics"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Fresher / Training",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Follow the official company or Infopark Jobs apply instructions"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Relaxplzz Technologies – React JS Training - Freshers Welcome | InfoparkDaily Jobs",
    seoDescription: "Relaxplzz Technologies hiring for React JS Training - Freshers Welcome in Technopark, Trivandrum. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Relaxplzz Technologies",
      "Relaxplzz Technologies",
      "React JS Training - Freshers Welcome",
      "Technopark, Trivandrum",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "Development",
      "Internship"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: false,
      sources: ["Listing source: WhatsApp"],
      unverifiedFields: ["email","phone","website","careersPage","linkedin","founded","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Relaxplzz Technologies is hiring for React JS Training - Freshers Welcome (Internship) in Technopark, Trivandrum. Deadline: 2026-07-31.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "",
    companyLegalName: "SE-Mentor Solutions (P) Ltd",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Not officially available.",
      careersPage: "Not officially available.",
      linkedin: "Not officially available.",
      salary: "As stated on the source posting",
      founded: "Not officially available.",
      companySize: "As stated on an official source",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [
      "ETL testing",
      "SQL",
      "Test case design",
      "Defect tracking"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Fresher / Entry-level",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Follow the official company or Infopark Jobs apply instructions"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "SE-Mentor Solutions (P) Ltd – ETL Tester | InfoparkDaily Jobs",
    seoDescription: "SE-Mentor Solutions (P) Ltd hiring for ETL Tester in Technopark, Trivandrum. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "SE-Mentor Solutions (P) Ltd",
      "SE-Mentor Solutions (P) Ltd",
      "ETL Tester",
      "Technopark, Trivandrum",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "QA",
      "Data"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: false,
      sources: ["Listing source: WhatsApp"],
      unverifiedFields: ["email","phone","website","careersPage","linkedin","founded","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "SE-Mentor Solutions (P) Ltd is hiring for ETL Tester (Full-time) in Technopark, Trivandrum. Deadline: 2026-07-31.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "",
    companyLegalName: "Gescis Technologies",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Not officially available.",
      careersPage: "Not officially available.",
      linkedin: "Not officially available.",
      salary: "As stated on the source posting",
      founded: "Not officially available.",
      companySize: "As stated on an official source",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [
      "PHP",
      "MySQL",
      "HTML / CSS / JavaScript",
      "Laravel / CodeIgniter familiarity preferred"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 0–1 Year",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Follow the official company or Infopark Jobs apply instructions"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Gescis Technologies – PHP Developer | InfoparkDaily Jobs",
    seoDescription: "Gescis Technologies hiring for PHP Developer in Technopark, Trivandrum. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Gescis Technologies",
      "Gescis Technologies",
      "PHP Developer",
      "Technopark, Trivandrum",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "Development"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: false,
      sources: ["Listing source: WhatsApp"],
      unverifiedFields: ["email","phone","website","careersPage","linkedin","founded","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Gescis Technologies is hiring for PHP Developer (Full-time) in Technopark, Trivandrum. Deadline: 2026-08-07.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    email: "hr@urolime.com",
    phone: "0484-2984589",
    website: "https://www.urolime.com",
    address: "Sixth Floor, Office No.6A-2, Wing 1, Jyothirmaya Building, Infopark Phase II, Puthencruz, Ernakulam, Kerala, 682303",
    industry: "DevOps / Cloud Consulting / IT Services",
    companySize: "Global team · India hub at Infopark Kochi (also UAE, USA, UK)",
    salaryRange: "Not publicly listed — confirm with Urolime HR during process",
    companyDetails: "Urolime, as the top DevOps consulting company in India develops bespoke innovative DevOps solutions.",
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
    startingDate: "",
    companyLegalName: "UROLIME",
    infoparkProfile: "https://infopark.in/companies-profile/urolime-technologies-private-limited",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "As stated on the source posting",
      founded: "Not officially available.",
      companySize: "As stated on an official source",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [
      "Full-cycle recruitment",
      "Technical hiring coordination",
      "ATS / tracker hygiene",
      "Stakeholder management",
      "Screening & interview scheduling"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 1–3 Years",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there",
      "Email your resume to hr@urolime.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.urolime.com",
      careers: "https://www.urolime.com/in/careers.html",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/urolime-technologies-private-limited",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "UROLIME – HR Recruiter | InfoparkDaily Jobs",
    seoDescription: "UROLIME hiring for HR Recruiter in Infopark, Kakkanad, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to hr@urolime.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Urolime Technologies",
      "UROLIME",
      "HR Recruiter",
      "Infopark, Kakkanad, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "HR"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Company website","Listing source: WhatsApp"],
      unverifiedFields: ["linkedin","founded","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "UROLIME is hiring for HR Recruiter (Full-time) in Infopark, Kakkanad, Kochi. Deadline: 2026-07-28.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile"
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
    startingDate: "",
    companyLegalName: "Alphasky Ventures Pvt. Ltd.",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "As stated on the source posting",
      founded: "Not officially available.",
      companySize: "As stated on an official source",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [
      "HR operations",
      "Office administration",
      "Recruitment coordination",
      "Vendor / facility coordination",
      "MS Office / Google Workspace"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 1–3 Years",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there"
    ],
    officialLinks: {
      website: "https://www.alphasky.in",
      careers: "https://www.alphasky.in",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Alphasky Ventures Pvt. Ltd. – HR & Admin Executive | InfoparkDaily Jobs",
    seoDescription: "Alphasky Ventures Pvt. Ltd. hiring for HR & Admin Executive in Infopark, Kakkanad, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Alphasky Ventures Pvt. Ltd.",
      "Alphasky Ventures Pvt. Ltd.",
      "HR & Admin Executive",
      "Infopark, Kakkanad, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "HR"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Company website","Listing source: WhatsApp"],
      unverifiedFields: ["email","phone","linkedin","founded","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Alphasky Ventures Pvt. Ltd. is hiring for HR & Admin Executive (Full-time) in Infopark, Kakkanad, Kochi. Deadline: 2026-07-31.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "",
    companyLegalName: "Cascade Revenue Management Pvt. Ltd.",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "As stated on the source posting",
      founded: "Not officially available.",
      companySize: "As stated on an official source",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [
      "Talent acquisition leadership",
      "Boolean / LinkedIn sourcing",
      "Pipeline & funnel reporting",
      "Interview panel coordination",
      "Employer branding basics"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 3–6 Years",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there"
    ],
    officialLinks: {
      website: "https://www.cascaderevenue.com",
      careers: "https://www.cascaderevenue.com",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Cascade Revenue Management Pvt. Ltd. – Senior HR Recruiter | InfoparkDaily Jobs",
    seoDescription: "Cascade Revenue Management Pvt. Ltd. hiring for Senior HR Recruiter in Infopark, Kakkanad, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Cascade Revenue Management Pvt. Ltd.",
      "Cascade Revenue Management Pvt. Ltd.",
      "Senior HR Recruiter",
      "Infopark, Kakkanad, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "HR"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Company website","Listing source: WhatsApp"],
      unverifiedFields: ["email","phone","linkedin","founded","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Cascade Revenue Management Pvt. Ltd. is hiring for Senior HR Recruiter (Full-time) in Infopark, Kakkanad, Kochi. Deadline: 2026-08-31.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "",
    companyLegalName: "Thomson Infocare LLP",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "As stated on the source posting",
      founded: "Not officially available.",
      companySize: "As stated on an official source",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [
      "Requirements analysis",
      "Solution configuration / implementation",
      "Client workshops",
      "UAT & go-live support",
      "Process documentation"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Relevant Experience",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there"
    ],
    officialLinks: {
      website: "https://thomsuninfo.com/careers",
      careers: "https://thomsuninfo.com/careers",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Thomson Infocare LLP – Business Analyst / Implementation Engineer | InfoparkDaily Jobs",
    seoDescription: "Thomson Infocare LLP hiring for Business Analyst / Implementation Engineer in Infopark, Kakkanad, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Thomson Infocare LLP",
      "Thomson Infocare LLP",
      "Business Analyst / Implementation Engineer",
      "Infopark, Kakkanad, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "Business"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Company website","Listing source: WhatsApp"],
      unverifiedFields: ["email","phone","linkedin","founded","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Thomson Infocare LLP is hiring for Business Analyst / Implementation Engineer (Full-time) in Infopark, Kakkanad, Kochi. Deadline: 2026-08-10.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    email: "hr@urolime.com",
    phone: "0484-2984589",
    website: "https://www.urolime.com",
    address: "Sixth Floor, Office No.6A-2, Wing 1, Jyothirmaya Building, Infopark Phase II, Puthencruz, Ernakulam, Kerala, 682303",
    industry: "DevOps / Cloud Consulting / Platform Engineering",
    companySize: "Global DevOps & cloud consulting firm · Kochi Infopark delivery hub",
    salaryRange: "Not publicly listed — experienced DevOps bands; confirm with Urolime",
    companyDetails: "Urolime, as the top DevOps consulting company in India develops bespoke innovative DevOps solutions.",
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
    startingDate: "",
    companyLegalName: "UROLIME",
    infoparkProfile: "https://infopark.in/companies-profile/urolime-technologies-private-limited",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "As stated on the source posting",
      founded: "Not officially available.",
      companySize: "As stated on an official source",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [
      "CI/CD pipelines",
      "Docker & Kubernetes",
      "Terraform / Ansible / CloudFormation",
      "AWS · Azure · GCP",
      "Linux administration",
      "ELK · Prometheus · Grafana",
      "MySQL / MongoDB / PostgreSQL familiarity"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 2–6+ Years (role-wise)",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there",
      "Email your resume to hr@urolime.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.urolime.com",
      careers: "https://www.urolime.com/in/careers.html",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/urolime-technologies-private-limited",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "UROLIME – Solution Architect – DevOps | InfoparkDaily Jobs",
    seoDescription: "UROLIME hiring for Solution Architect – DevOps in Infopark, Kakkanad, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to hr@urolime.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Urolime Technologies",
      "UROLIME",
      "Solution Architect – DevOps",
      "Infopark, Kakkanad, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "DevOps",
      "Cloud"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Company website","Listing source: WhatsApp"],
      unverifiedFields: ["linkedin","founded","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "UROLIME is hiring for Solution Architect – DevOps, DevOps Engineer, System Engineer (L2/L3) (Full-time) in Infopark, Kakkanad, Kochi. Deadline: 2026-07-28.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile"
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
    email: "hr@dynamedhealth.com",
    phone: "9072955500",
    website: "https://www.dynamedhealth.com",
    address: "8th Floor, Wing 2, Jyothirmaya Infopark Phase 2, Brahmapuram P.O., Kochi - 682303",
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
    startingDate: "",
    companyLegalName: "Dynamed Healthcare Solutions Pvt.Ltd.",
    infoparkProfile: "https://infopark.in/companies-profile/dynamed-healthcare-solutions-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "As stated on the source posting",
      founded: "Not officially available.",
      companySize: "As stated on an official source",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [
      "Azure architecture",
      "Landing zones & governance",
      "Identity & access (Entra ID / IAM)",
      "Networking & security baselines",
      "IaC (Bicep / Terraform) preferred",
      "Cost & reliability design"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Senior Level",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there",
      "Email your resume to hr@dynamedhealth.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.dynamedhealth.com",
      careers: "https://dynamedhealthcare.com",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/dynamed-healthcare-solutions-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Dynamed Healthcare Solutions Pvt.Ltd. – Azure Infrastructure Architect | InfoparkDaily Jobs",
    seoDescription: "Dynamed Healthcare Solutions Pvt.Ltd. hiring for Azure Infrastructure Architect in Infopark, Kakkanad, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to hr@dynamedhealth.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Dynamed Healthcare Solutions",
      "Dynamed Healthcare Solutions Pvt.Ltd.",
      "Azure Infrastructure Architect",
      "Infopark, Kakkanad, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "Cloud"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Company website","Listing source: WhatsApp"],
      unverifiedFields: ["linkedin","founded","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Dynamed Healthcare Solutions Pvt.Ltd. is hiring for Azure Infrastructure Architect (Full-time) in Infopark, Kakkanad, Kochi. Deadline: 2026-07-31.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile"
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
    startingDate: "",
    companyLegalName: "SS Consulting",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "As stated on the source posting",
      founded: "Not officially available.",
      companySize: "As stated on an official source",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [
      "Dynamics 365 CRM / CE",
      "Functional consulting",
      "Requirements & process design",
      "Configuration & UAT leadership",
      "Stakeholder management"
    ],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Senior Level",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there"
    ],
    officialLinks: {
      website: "https://ssconsulting.co.in",
      careers: "https://ssconsulting.co.in",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "SS Consulting – Senior Consultant – Microsoft Dynamics 365 CRM | InfoparkDaily Jobs",
    seoDescription: "SS Consulting hiring for Senior Consultant – Microsoft Dynamics 365 CRM in Infopark, Kakkanad, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "SS Consulting",
      "SS Consulting",
      "Senior Consultant – Microsoft Dynamics 365 CRM",
      "Infopark, Kakkanad, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "Business"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Company website","Listing source: WhatsApp"],
      unverifiedFields: ["email","phone","linkedin","founded","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "SS Consulting is hiring for Senior Consultant – Microsoft Dynamics 365 CRM (Full-time) in Infopark, Kakkanad, Kochi. Deadline: 2026-07-31.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "Immediate joiners preferred",
    companyLegalName: "Woxro Technologies",
    contactVerification: {
      email: "As listed on the hiring source — confirm with the company",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "As stated on the source posting",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Fresher / 0–1 Year",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there",
      "Email your resume to jobs@woxro.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://woxro.com/",
      careers: "https://woxro.com/careers",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Woxro Technologies – HR Trainee | InfoparkDaily Jobs",
    seoDescription: "Woxro Technologies hiring for HR Trainee in Infopark Kochi, Kakkanad. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to jobs@woxro.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Woxro Technologies",
      "Woxro Technologies",
      "HR Trainee",
      "Infopark Kochi, Kakkanad",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "HR",
      "Business"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: false,
      emailVerified: true,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Company website","Listing source: WhatsApp"],
      unverifiedFields: ["phone","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","department"]
    },
    jobSummary: "Woxro Technologies is hiring for HR Trainee (Full-time) in Infopark Kochi, Kakkanad. Deadline: Rolling / open until filled.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    email: "career@newagesysindia.com",
    phone: "0484-2983032",
    website: "https://www.newagesysindia.com",
    address: "7th Floor, Phase – II, Carnival Infopark, Infopark SEZ, Kakkanad, Kochi – / 2983033, 2983033",
    industry: "IT Services / Software Development",
    companyDetails: "NewAgeSys Solutions (P) Ltd, is a growing company and has been in business since 1994. Currently we have two functional offices - Info Park Cochin, Kerala, India and at Princeton Junction, New Jersey, USA. For over 22 years we have been constantly focused on providing Excellent Client Services, providing Consulting and Software Development Services to companies in USA. Our expertise are spread wide across the fields of Software Development and Recruitment Process Outsourcing. Our Clients include major players from the United States of America, especially the Fortune 1000 Companies. Please see www.newagesysindia.com,  www.newagesys.com, and www.newagesysit.com for more info.",
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
    startingDate: "Immediate joiners preferred",
    companyLegalName: "NewAgeSys Solutions (P) Ltd.",
    infoparkProfile: "https://infopark.in/companies-profile/newagesys-solutions-p-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "As stated on the source posting",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Fresher / 0–1 Year",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there",
      "Email your resume to career@newagesysindia.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.newagesysindia.com",
      careers: "https://www.newagesys.com",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/newagesys-solutions-p-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "NewAgeSys Solutions (P) Ltd. – Graduate Trainee | InfoparkDaily Jobs",
    seoDescription: "NewAgeSys Solutions (P) Ltd. hiring for Graduate Trainee in Infopark Kochi, Kakkanad. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to career@newagesysindia.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "NewAgeSys Solutions",
      "NewAgeSys Solutions (P) Ltd.",
      "Graduate Trainee",
      "Infopark Kochi, Kakkanad",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "Development"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Company website","Listing source: WhatsApp"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","department"]
    },
    jobSummary: "NewAgeSys Solutions (P) Ltd. is hiring for Graduate Trainee, Junior Developer (Full-time) in Infopark Kochi, Kakkanad. Deadline: Rolling / open until filled.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile"
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
    startingDate: "Immediate joiners preferred",
    companyLegalName: "HashRoot",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "As stated on the source posting",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Fresher / 0–1 Year",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there"
    ],
    officialLinks: {
      website: "https://hashroot.com",
      careers: "https://hashroot.com/careers",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "HashRoot – Cloud / DevOps Fresher | InfoparkDaily Jobs",
    seoDescription: "HashRoot hiring for Cloud / DevOps Fresher in Infopark Kochi, Kakkanad. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "HashRoot",
      "HashRoot",
      "Cloud / DevOps Fresher",
      "Infopark Kochi, Kakkanad",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "DevOps",
      "Cloud"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Company website","Listing source: WhatsApp"],
      unverifiedFields: ["email","phone","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","department"]
    },
    jobSummary: "HashRoot is hiring for Cloud / DevOps Fresher, Junior Cloud Engineer (Fresher track) (Full-time) in Infopark Kochi, Kakkanad. Deadline: Rolling / open until filled.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "Immediate joiners preferred",
    companyLegalName: "Nestsoft",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "As stated on the source posting",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Fresher / 0–1 Year",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there"
    ],
    officialLinks: {
      website: "https://www.nestsoft.com",
      careers: "https://www.nestsoft.com/careers",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Nestsoft – Software Trainee | InfoparkDaily Jobs",
    seoDescription: "Nestsoft hiring for Software Trainee in Infopark Kochi, Kakkanad. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Nestsoft",
      "Nestsoft",
      "Software Trainee",
      "Infopark Kochi, Kakkanad",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "Development"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Company website","Listing source: WhatsApp"],
      unverifiedFields: ["email","phone","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","department"]
    },
    jobSummary: "Nestsoft is hiring for Software Trainee, Junior Developer (Full-time) in Infopark Kochi, Kakkanad. Deadline: Rolling / open until filled.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    email: "info@infintor.com",
    phone: "+919422799989",
    website: "https://www.infintor.com",
    address: "8th Floor, Vismaya, Infopark Kochi Phase 1, Kochi, Kerala, India- 682030",
    industry: "IT Services / Software Solutions",
    companyDetails: "Infintor – Your Trusted Partner for Digital Transformation Since 2014. As a globally recognized digital transformation consulting firm, Infintor has been delivering innovative solutions to enterprises and SMEs since 2014. With a proven track record and certification as an Odoo partner, we specialize in consulting, implementation, and customization of Odoo ERP, offering unmatched expertise to drive business growth. Our offices in India, Germany, Japan, Qatar, and the UAE enable us to provide tailored services to clients worldwide. ERP Implementation: Seamless integration and customization of Odoo ERP systems. Digital Engineering: Cutting-edge solutions to modernize your business processes. Mobile App Development: Custom mobile applications f",
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
    startingDate: "Immediate joiners preferred",
    companyLegalName: "Infintor Solutions LLP",
    infoparkProfile: "https://infopark.in/companies-profile/infintor-solutions-llp",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Verified from official Infopark company profile",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "As stated on the source posting",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Fresher / 0–1 Year",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there",
      "Email your resume to info@infintor.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.infintor.com",
      careers: "https://people.infintor.com/jobs",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/infintor-solutions-llp",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Infintor Solutions LLP – Junior Software Developer | InfoparkDaily Jobs",
    seoDescription: "Infintor Solutions LLP hiring for Junior Software Developer in Infopark Kochi, Kakkanad. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to info@infintor.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Infintor Solutions",
      "Infintor Solutions LLP",
      "Junior Software Developer",
      "Infopark Kochi, Kakkanad",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "Development"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: true,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Company website","Listing source: WhatsApp"],
      unverifiedFields: ["linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","department"]
    },
    jobSummary: "Infintor Solutions LLP is hiring for Junior Software Developer (Full-time) in Infopark Kochi, Kakkanad. Deadline: Rolling / open until filled.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile"
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
    startingDate: "Immediate joiners preferred",
    companyLegalName: "WorkSent Technologies",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "As stated on the source posting",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Fresher / 0–1 Year",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there"
    ],
    officialLinks: {
      website: "https://worksent.com",
      careers: "https://worksent.com",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "WorkSent Technologies – Entry-Level IT Roles | InfoparkDaily Jobs",
    seoDescription: "WorkSent Technologies hiring for Entry-Level IT Roles in Infopark Kochi, Kakkanad. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "WorkSent Technologies",
      "WorkSent Technologies",
      "Entry-Level IT Roles",
      "Infopark Kochi, Kakkanad",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "Business"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Company website","Listing source: WhatsApp"],
      unverifiedFields: ["email","phone","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","department"]
    },
    jobSummary: "WorkSent Technologies is hiring for Entry-Level IT Roles, Junior IT Associate (Fresher track) (Full-time) in Infopark Kochi, Kakkanad. Deadline: Rolling / open until filled.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    description: "Fresher hiring drive — BA, Process, Support, QA & Technical Support.",
    companyLegalName: "VDart",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Freshers 2025 / 2026",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there"
    ],
    officialLinks: {
      website: "https://vdartinc.com/",
      careers: "https://vdartinc.com/",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "VDart – Business Analyst | InfoparkDaily Jobs",
    seoDescription: "VDart hiring for Business Analyst in Infopark, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "VDart",
      "VDart",
      "Business Analyst",
      "Infopark, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "Business",
      "Sales"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Company website","Listing source: WhatsApp"],
      unverifiedFields: ["email","phone","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "VDart is hiring for Business Analyst, Process Associate, Customer Support, QA Tester, Technical Support (Full-time) in Infopark, Kochi. Deadline: Rolling / open until filled.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    description: "BA · 3+ years · Immediate joiners · Apply by 31 Jul.",
    companyLegalName: "Cloud Nautical",
    contactVerification: {
      email: "As listed on the hiring source — confirm with the company",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Not officially available.",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 3+ Years",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to careers@cloudnautical.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Cloud Nautical – Business Analyst (Immediate Joiner) | InfoparkDaily Jobs",
    seoDescription: "Cloud Nautical hiring for Business Analyst (Immediate Joiner) in Technopark, Trivandrum. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to careers@cloudnautical.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Cloud Nautical",
      "Cloud Nautical",
      "Business Analyst (Immediate Joiner)",
      "Technopark, Trivandrum",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT",
      "Business"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: true,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Listing source: WhatsApp"],
      unverifiedFields: ["phone","website","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Cloud Nautical is hiring for Business Analyst (Immediate Joiner) (Full-time) in Technopark, Trivandrum. Deadline: 2026-07-31.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    address: "11C, Tower 1, TransAsia Cyber Park, Infopark Phase II SEZ, Infopark Campus, Kochi, KL, India - 682303",
    industry: "IT / Digital Solutions",
    companyDetails: "2Base Technologies is an enterprise software development company specializing in end-to-end IT digital transformation services. With registered offices in the UK, USA, and Australia and R&D centers in Kochi and Palakkad, India, we help businesses worldwide drive efficiency, innovation, and growth through custom software solutions. With 16+ years of expertise, we have delivered tailored digital solutions across industries, including InsurTech, EdTech, Transportation & Logistics, Travel & Tourism, Healthcare, FinTech, SaaS, Agriculture, Oil & Gas, Non-Profit, and Hi-Tech. Trusted by 200+ global clients, we focus on co-creating digital strategies that align with long-term business goals. Our core services include Custom Software Development, B",
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
    description: "BDM · 5–10 years · Technopark TVM · Apply by 31 Jul.",
    companyLegalName: "2Base Technologies Pvt Ltd",
    infoparkProfile: "https://infopark.in/companies-profile/2base-technologies-pvt-ltd",
    contactVerification: {
      email: "Verified from official Infopark company profile",
      phone: "Not officially available.",
      address: "Verified from official Infopark company profile",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 5–10 Years",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to careers@2basetechnologies.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.2basetechnologies.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "https://infopark.in/companies-profile/2base-technologies-pvt-ltd",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "2Base Technologies Pvt Ltd – Business Development Manager | InfoparkDaily Jobs",
    seoDescription: "2Base Technologies Pvt Ltd hiring for Business Development Manager in Technopark, Trivandrum. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to careers@2basetechnologies.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "2Base Technologies",
      "2Base Technologies Pvt Ltd",
      "Business Development Manager",
      "Technopark, Trivandrum",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Sales",
      "Business"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: true,
      emailVerified: true,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark company profile","Company website","Listing source: WhatsApp"],
      unverifiedFields: ["phone","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "2Base Technologies Pvt Ltd is hiring for Business Development Manager (Full-time) in Technopark, Trivandrum. Deadline: 2026-07-31.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "infopark-profile"
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
    description: "Angular (4+) & DevOps (3–5 yrs) · Apply by 31 Jul.",
    companyLegalName: "Kameda Infologics",
    contactVerification: {
      email: "As listed on the hiring source — confirm with the company",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Not officially available.",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 3–5+ Years",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to preeyanka@kamedainfologics.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Kameda Infologics – Angular Developer – UI Design | InfoparkDaily Jobs",
    seoDescription: "Kameda Infologics hiring for Angular Developer – UI Design in Kerala. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to preeyanka@kamedainfologics.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Kameda Infologics",
      "Kameda Infologics",
      "Angular Developer – UI Design",
      "Kerala",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: true,
      phoneVerified: false,
      addressVerified: false,
      applyLinkVerified: true,
      sources: ["Listing source: WhatsApp"],
      unverifiedFields: ["phone","website","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Kameda Infologics is hiring for Angular Developer – UI Design, DevOps Engineer (Full-time) in Kerala. Deadline: 2026-07-31.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    description: "Technical Support · Freshers / 0–2 yrs · Any degree (50%+).",
    companyLegalName: "Cognizant",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Freshers / 0–2 Years",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there"
    ],
    officialLinks: {
      website: "https://careers.cognizant.com/",
      careers: "https://www.instagram.com/infoparkdaily.jobs/",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Cognizant – Technical Support Engineer | InfoparkDaily Jobs",
    seoDescription: "Cognizant hiring for Technical Support Engineer in Kerala / Cognizant (confirm location on apply). Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Cognizant",
      "Cognizant",
      "Technical Support Engineer",
      "Kerala / Cognizant (confirm location on apply)",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Company website","Listing source: WhatsApp"],
      unverifiedFields: ["email","phone","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Cognizant is hiring for Technical Support Engineer (Full-time) in Kerala / Cognizant (confirm location on apply). Deadline: Rolling / open until filled.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    description: "Full Stack · Node/React · 2+ years · Malappuram.",
    companyLegalName: "Bizforz",
    contactVerification: {
      email: "As listed on the hiring source — confirm with the company",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Official company website",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 2+ Years",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to hr@bizforz.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "https://www.bizforz.com",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Bizforz – Full Stack Developer | InfoparkDaily Jobs",
    seoDescription: "Bizforz hiring for Full Stack Developer in Kottakkal, Malappuram. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to hr@bizforz.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Bizforz",
      "Bizforz",
      "Full Stack Developer",
      "Kottakkal, Malappuram",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: false,
      emailVerified: true,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Company website","Listing source: WhatsApp"],
      unverifiedFields: ["phone","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Bizforz is hiring for Full Stack Developer (Full-time) in Kottakkal, Malappuram. Deadline: Rolling / open until filled.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    verified: true,
    tags: [
      "Business",
      "Sales"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "",
    phone: "",
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
    description: "Operations Executive · Alappuzha · ₹15k–18k · Call to apply.",
    companyLegalName: "Chrisma Consultancy",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Not officially available.",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Fresher / Experienced",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there"
    ],
    officialLinks: {
      website: "",
      careers: "tel:+919947337555",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Chrisma Consultancy – Operations Executive | InfoparkDaily Jobs",
    seoDescription: "Chrisma Consultancy hiring for Operations Executive in Alappuzha. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Chrisma Consultancy",
      "Chrisma Consultancy",
      "Operations Executive",
      "Alappuzha",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Business",
      "Sales"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: false,
      applyLinkVerified: true,
      sources: ["Listing source: WhatsApp"],
      unverifiedFields: ["email","phone","website","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Chrisma Consultancy is hiring for Operations Executive (Full-time) in Alappuzha. Deadline: Rolling / open until filled.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    verified: true,
    tags: [
      "Marketing",
      "Design"
    ],
    isWalkIn: false,
    walkInDate: "",
    email: "hrtravelearnholidays@gmail.com",
    phone: "",
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
    description: "Video Editor Intern · Freshers only · Calicut.",
    companyLegalName: "Travelearn Holidays",
    contactVerification: {
      email: "As listed on the hiring source — confirm with the company",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Not officially available.",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Freshers Only",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to hrtravelearnholidays@gmail.com",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Travelearn Holidays – Video Editor Intern | InfoparkDaily Jobs",
    seoDescription: "Travelearn Holidays hiring for Video Editor Intern in Calicut. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to hrtravelearnholidays@gmail.com with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Travelearn Holidays",
      "Travelearn Holidays",
      "Video Editor Intern",
      "Calicut",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Marketing",
      "Design"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: true,
      phoneVerified: false,
      addressVerified: false,
      applyLinkVerified: true,
      sources: ["Listing source: WhatsApp"],
      unverifiedFields: ["phone","website","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Travelearn Holidays is hiring for Video Editor Intern (Internship) in Calicut. Deadline: Rolling / open until filled.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    description: "Kickstart your career in a professional work environment. 0–2 years.",
    companyLegalName: "Aceware Fintech Services",
    contactVerification: {
      email: "As listed on the hiring source — confirm with the company",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Not officially available.",
      careersPage: "Email application channel listed on official posting",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 0–2 Years",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Email your resume to career@acemoney.in",
      "Subject line: include the exact job title",
      "Attach resume in PDF unless the company specifies another format"
    ],
    officialLinks: {
      website: "",
      careers: "",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Aceware Fintech Services – Front Office Executive | InfoparkDaily Jobs",
    seoDescription: "Aceware Fintech Services hiring for Front Office Executive in Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official channel. If an email is listed, write to career@acemoney.in with the role in the subject."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Aceware Fintech Services",
      "Aceware Fintech Services",
      "Front Office Executive",
      "Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Business",
      "Sales"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: true,
      phoneVerified: false,
      addressVerified: false,
      applyLinkVerified: true,
      sources: ["Listing source: WhatsApp"],
      unverifiedFields: ["phone","website","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Aceware Fintech Services is hiring for Front Office Executive (Full-time) in Kochi. Deadline: Rolling / open until filled.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    verified: true,
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
    hiringNotes: "Shared via InfoparkDaily Jobs Instagram channel. Confirm latest apply steps with the company.",
    companyLegalName: "Trainonex Solutions",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Not officially available.",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 0–1 Years",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there"
    ],
    officialLinks: {
      website: "",
      careers: "https://www.instagram.com/infoparkdaily.jobs/",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Trainonex Solutions – Business Development Executive | InfoparkDaily Jobs",
    seoDescription: "Trainonex Solutions hiring for Business Development Executive in Technopark Campus, Trivandrum. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Trainonex Solutions",
      "Trainonex Solutions",
      "Business Development Executive",
      "Technopark Campus, Trivandrum",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Sales",
      "Business"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Listing source: Instagram"],
      unverifiedFields: ["email","phone","website","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "Trainonex Solutions is hiring for Business Development Executive (Full-time) in Technopark Campus, Trivandrum. Deadline: 2026-07-30.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    verified: true,
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
    hiringNotes: "Shared via InfoparkDaily Jobs Instagram. Verify details with the hiring company.",
    companyLegalName: "SupportHub360",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Not officially available.",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "Not officially available.",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: 2+ Years",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there"
    ],
    officialLinks: {
      website: "",
      careers: "https://www.instagram.com/infoparkdaily.jobs/",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "SupportHub360 – Digital Marketing Executive | InfoparkDaily Jobs",
    seoDescription: "SupportHub360 hiring for Digital Marketing Executive in Infopark Phase 2, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "SupportHub360",
      "SupportHub360",
      "Digital Marketing Executive",
      "Infopark Phase 2, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Marketing"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Listing source: Instagram"],
      unverifiedFields: ["email","phone","website","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","joiningDate","department"]
    },
    jobSummary: "SupportHub360 is hiring for Digital Marketing Executive (Full-time) in Infopark Phase 2, Kochi. Deadline: 2026-07-28.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "2026-07-13",
    companyLegalName: "SS Consulting",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Official company website",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "As stated on the source posting",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Experienced",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there"
    ],
    officialLinks: {
      website: "https://ssconsulting.co.in",
      careers: "https://www.infopark.in/companies-job",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "SS Consulting – AI Engineer | InfoparkDaily Jobs",
    seoDescription: "SS Consulting hiring for AI Engineer in Kakkanad, Infopark. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "SS Consulting",
      "SS Consulting",
      "AI Engineer",
      "Kakkanad, Infopark",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "IT"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: true,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark Jobs posting","Company website"],
      unverifiedFields: ["email","phone","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","department"]
    },
    jobSummary: "SS Consulting is hiring for AI Engineer (Full-time) in Kakkanad, Infopark. Deadline: 2026-07-25.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
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
    startingDate: "2026-07-13",
    companyLegalName: "Techware Lab",
    contactVerification: {
      email: "Not officially available.",
      phone: "Not officially available.",
      address: "As listed on the hiring source — confirm with the company",
      website: "Infopark Jobs portal",
      careersPage: "Official apply / careers / Infopark Jobs link",
      linkedin: "Not officially available.",
      salary: "Not officially available.",
      founded: "Not officially available.",
      companySize: "Not officially available.",
      reportingManager: "Not officially available.",
      workingHours: "Not officially available.",
      workingDays: "Not officially available.",
      shift: "Not officially available.",
      noticePeriod: "Not officially available.",
      openPositions: "Not officially available.",
      joiningDate: "As stated on the source posting",
      department: "Not officially available."
    },
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    eligibility: [
      "Experience: Fresher / ~2 years",
      "Education: Not officially available.",
      "Year of passing: Not officially available.",
      "Percentage / CGPA cutoff: Not officially available.",
      "Certifications: Not officially available."
    ],
    hiringProcess: [
      "Resume screening",
      "Interview rounds as decided by the hiring company",
      "Offer / joining timeline: Not officially available."
    ],
    requiredDocuments: [
      "Updated resume (PDF preferred unless the company asks otherwise)",
      "Cover letter: Not officially available.",
      "Portfolio: Not officially available.",
      "Certificates / experience letters / ID: Not officially available. — provide only if the company requests them"
    ],
    applySteps: [
      "Open the official apply / Infopark Jobs detail link listed on this page",
      "Read the live job description on the official page",
      "Submit your application exactly as instructed there"
    ],
    officialLinks: {
      website: "",
      careers: "https://www.infopark.in/companies-job",
      infoparkJobs: "https://infopark.in/companies-job",
      infoparkProfile: "",
      linkedin: "",
      contactPage: ""
    },
    seoTitle: "Techware Lab – Founder's Office Assistant (MBA Freshers) | InfoparkDaily Jobs",
    seoDescription: "Techware Lab hiring for Founder's Office Assistant (MBA Freshers) in Infopark Phase 2, Kochi. Verified contacts, eligibility, and official apply links on InfoparkDaily.",
    faq: [
      {"q":"Is this job verified?","a":"InfoparkDaily checks publicly available official sources such as the company website, Infopark company profile, and Infopark Jobs. Always re-check the live official listing before applying."},
      {"q":"Does InfoparkDaily charge a fee?","a":"No. InfoparkDaily never charges candidates for job listings."},
      {"q":"How should I apply?","a":"Use the official careers or Infopark Jobs apply link on this page."},
      {"q":"Why is some information missing?","a":"Fields marked \"Not officially available.\" could not be confirmed on official public sources. We do not guess or invent details."}
    ],
    keywords: [
      "Techware Lab",
      "Techware Lab",
      "Founder's Office Assistant (MBA Freshers)",
      "Infopark Phase 2, Kochi",
      "Infopark Kochi jobs",
      "Kerala IT jobs",
      "Business",
      "Design"
    ],
    internalLinks: [
      {"label":"All Job Openings","href":"/jobs/"},
      {"label":"InfoparkDaily Home","href":"/"},
      {"label":"Contact InfoparkDaily","href":"/contact/"}
    ],
    fraudWarning: [
      "This opportunity has been checked against publicly available official company sources (company website / Infopark company profile / Infopark Jobs posting).",
      "Apply only through the official company website, verified careers page, or the official Infopark Jobs listing.",
      "InfoparkDaily never charges any fee for jobs. Never pay anyone for recruitment.",
      "If you notice incorrect information, contact InfoparkDaily immediately."
    ],
    verificationNotice: "InfoparkDaily Verification Notice: This opportunity has been checked using publicly available official company sources. Apply only through official company or Infopark Jobs channels. InfoparkDaily never charges any fee for jobs.",
    verificationReport: {
      companyExists: true,
      websiteVerified: false,
      infoparkProfileVerified: false,
      emailVerified: false,
      phoneVerified: false,
      addressVerified: true,
      applyLinkVerified: true,
      sources: ["Infopark Jobs posting"],
      unverifiedFields: ["email","phone","linkedin","salary","founded","companySize","reportingManager","workingHours","workingDays","shift","noticePeriod","openPositions","department"]
    },
    jobSummary: "Techware Lab is hiring for Founder's Office Assistant (MBA Freshers), UI/UX Developer (Full-time) in Infopark Phase 2, Kochi. Deadline: 2026-07-27.",
    salaryRange: "Not officially available.",
    department: "Not officially available.",
    verificationLevel: "source-listed"
  }
];
