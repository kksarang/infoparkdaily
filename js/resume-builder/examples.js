/* Role-based example resumes for the resume builder and the ATS checker.
 *
 * Every person, company and number here is fictional, written by InfoparkDaily as a model of
 * structure: a targeted summary, grouped skills, action-verb bullets with results, and standard
 * headings. Each example scores 90+ in the InfoparkDaily ATS checker when exported as PDF
 * (checked with scripts in tests/resume-builder/). People must replace everything with their
 * own true details — the builder shows that reminder when an example is loaded.
 */
import { blankResume } from "./schema.js";

let n = 0;
const id = (p) => `${p}-${++n}`;
const job = (role, employer, location, start, end, bullets) => ({ id: id("exp"), role, employer, location, start, end, bullets });
const edu = (qualification, institution, start, end, grade = "", details = "") => ({ id: id("edu"), qualification, institution, field: "", start, end, grade, details });
const skills = (groups) => Object.entries(groups).map(([label, items]) => ({ id: id("skill"), label, items }));
const project = (name, role, technologies, bullets) => ({ id: id("project"), name, role, url: "", technologies, bullets });
const cert = (name, issuer, issued) => ({ id: id("cert"), name, issuer, issued, expiry: "", url: "" });

function build(e) {
  const d = blankResume();
  d.personal = { name: e.name, headline: e.headline, email: e.email, phone: e.phone, location: e.location, linkedin: e.linkedin || "", github: e.github || "", portfolio: e.portfolio || "" };
  d.summary = e.summary;
  d.experience = e.experience || [];
  d.education = e.education || [];
  d.skills = e.skills || [];
  d.projects = e.projects || [];
  d.certifications = e.certifications || [];
  d.languages = (e.languages || ["English:Fluent", "Malayalam:Native"]).map((x) => {
    const [name, proficiency] = x.split(":");
    return { id: id("lang"), name, proficiency };
  });
  return d;
}

/* kind matches the ATS checker's role detection (dev, qa, data, design, finance, support, hr, sales). */
export const EXAMPLES = [
  {
    id: "fresher-developer",
    title: "Fresher software developer",
    kind: "dev",
    template: "fresher-launch",
    templateName: "Fresher Launch",
    data: () =>
      build({
        name: "ADITHYA NAIR",
        headline: "Junior Software Developer | Java, Spring Boot, React",
        email: "adithya.nair@example.com",
        phone: "+91 90000 11111",
        location: "Kochi, Kerala",
        linkedin: "linkedin.com/in/example-adithya",
        github: "github.com/example-adithya",
        summary:
          "Computer Science graduate (2026) and junior software developer with hands-on experience in Java, Spring Boot, React and MySQL. Built and deployed three full-stack projects used by more than 150 students, and completed a six-month backend internship writing REST APIs and unit tests. Looking for a junior Java or full-stack developer role in Kochi or Trivandrum.",
        experience: [
          job("Software Developer Intern", "Example Softworks", "Infopark, Kochi", "2025-12", "2026-05", [
            "Built 8 REST API endpoints in Spring Boot for an inventory module, used by 3 client warehouses.",
            "Wrote 60+ JUnit tests, raising module test coverage from 45% to 78%.",
            "Fixed 25 reported bugs across the React admin panel and reduced page load time by 30%.",
            "Documented API changes in Swagger and presented progress in weekly sprint reviews.",
          ]),
        ],
        education: [edu("B.Tech in Computer Science and Engineering", "Example College of Engineering, Kerala", "2022-08", "2026-05", "CGPA 8.2 / 10")],
        skills: skills({
          Languages: ["Java", "JavaScript", "SQL", "Python"],
          "Frameworks & tools": ["Spring Boot", "React", "Node.js", "MySQL", "Git", "Postman", "JUnit"],
          Concepts: ["REST API", "OOP", "Data structures", "Agile"],
        }),
        projects: [
          project("Campus Placement Tracker", "Team lead · 3 members", ["React", "Spring Boot", "MySQL"], [
            "Built a portal where 150+ students track applications, deadlines and interview rounds.",
            "Designed 6 database tables and role-based login for students and placement officers.",
          ]),
          project("Bus Pass Renewal App", "Personal project", ["Node.js", "Express", "MongoDB"], [
            "Created an online renewal flow that cut a 2-day manual process to under 10 minutes in a pilot with 40 users.",
          ]),
        ],
        certifications: [cert("Oracle Certified Foundations Associate, Java", "Oracle", "2025-11")],
      }),
  },
  {
    id: "full-stack-developer",
    title: "Full-stack developer (2–4 years)",
    kind: "dev",
    template: "stack-pro",
    templateName: "Stack Pro",
    data: () =>
      build({
        name: "SNEHA THOMAS",
        headline: "Full-Stack Developer | React, Node.js, TypeScript, AWS",
        email: "sneha.thomas@example.com",
        phone: "+91 90000 22222",
        location: "Trivandrum, Kerala",
        linkedin: "linkedin.com/in/example-sneha",
        github: "github.com/example-sneha",
        summary:
          "Full-stack developer with 3 years of experience building web applications with React, TypeScript, Node.js and PostgreSQL on AWS. Shipped features for a SaaS product with 20,000 monthly users, improved API performance by 45%, and mentored two junior developers. Comfortable owning features from design discussion to production monitoring.",
        experience: [
          job("Software Engineer", "Example Cloud Labs", "Technopark, Trivandrum", "2023-07", "", [
            "Led development of a React and TypeScript billing dashboard used by 20,000 monthly users.",
            "Cut average API response time by 45% by adding PostgreSQL indexes and Redis caching.",
            "Set up a CI/CD pipeline with GitHub Actions and Docker, reducing release time from 2 days to 3 hours.",
            "Mentored 2 junior developers through code reviews and pair programming.",
          ]),
          job("Associate Software Engineer", "Example Digital Solutions", "Kochi", "2022-06", "2023-06", [
            "Built 15 reusable UI components in React, adopted across 4 internal products.",
            "Wrote Node.js REST APIs with 85% unit-test coverage using Jest.",
          ]),
        ],
        education: [edu("B.Tech in Information Technology", "Example Engineering College, Kerala", "2018-08", "2022-05", "CGPA 8.0 / 10")],
        skills: skills({
          Frontend: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind"],
          Backend: ["Node.js", "Express", "PostgreSQL", "Redis", "REST API"],
          "Cloud & tools": ["AWS", "Docker", "Git", "GitHub Actions", "Jest"],
        }),
        projects: [
          project("Open-source form library", "Contributor", ["TypeScript", "React"], [
            "Contributed accessibility fixes and 12 merged pull requests to an open-source form library.",
          ]),
        ],
        certifications: [cert("AWS Certified Cloud Practitioner", "Amazon Web Services", "2024-03")],
      }),
  },
  {
    id: "qa-engineer",
    title: "QA / software test engineer",
    kind: "qa",
    template: "qa-precision",
    templateName: "QA Precision",
    data: () =>
      build({
        name: "RAHUL VARGHESE",
        headline: "QA Engineer | Manual & Automation Testing, Selenium, API Testing",
        email: "rahul.varghese@example.com",
        phone: "+91 90000 33333",
        location: "Kochi, Kerala",
        linkedin: "linkedin.com/in/example-rahul",
        summary:
          "QA engineer with 2 years of experience in manual and automation testing of web and mobile banking applications. Writes clear test cases and bug reports, automates regression suites with Selenium and Java, and tests REST APIs in Postman. Helped cut production defects by 35% across 12 releases.",
        experience: [
          job("QA Engineer", "Example Fintech Services", "Infopark, Kochi", "2024-08", "", [
            "Designed and executed 600+ test cases for a mobile banking app across 12 releases.",
            "Automated a 180-case regression suite with Selenium WebDriver, Java and TestNG, cutting regression time from 3 days to 6 hours.",
            "Logged and tracked 220+ defects in Jira, helping reduce production defects by 35%.",
            "Tested 40 REST API endpoints in Postman, including negative and security cases.",
          ]),
          job("QA Intern", "Example Testing Labs", "Kochi", "2024-01", "2024-07", [
            "Performed smoke, sanity and regression testing for 3 web applications.",
          ]),
        ],
        education: [edu("B.Sc in Computer Science", "Example Arts and Science College, Kerala", "2020-06", "2023-04", "78%")],
        skills: skills({
          Testing: ["Manual testing", "Regression testing", "API testing", "Test cases", "Bug reporting"],
          Automation: ["Selenium", "Java", "TestNG", "Postman", "SQL"],
          Tools: ["Jira", "Git", "Agile"],
        }),
        projects: [
          project("E-commerce test automation", "Personal project", ["Selenium", "Java", "TestNG"], [
            "Built a Page Object Model framework with 45 automated tests and HTML reports.",
          ]),
        ],
        certifications: [cert("ISTQB Certified Tester Foundation Level", "ISTQB", "2024-05")],
      }),
  },
  {
    id: "data-analyst",
    title: "Data analyst",
    kind: "data",
    template: "data-clear",
    templateName: "Data Clear",
    data: () =>
      build({
        name: "FATHIMA RIYAS",
        headline: "Data Analyst | SQL, Power BI, Excel, Python",
        email: "fathima.riyas@example.com",
        phone: "+91 90000 44444",
        location: "Kozhikode, Kerala",
        linkedin: "linkedin.com/in/example-fathima",
        summary:
          "Data analyst with 2 years of experience turning sales and operations data into clear dashboards and decisions. Skilled in SQL, Power BI, Excel and Python (pandas). Built reporting that saved 25 hours of manual work a month and helped a retail team lift repeat sales by 12%.",
        experience: [
          job("Data Analyst", "Example Retail Analytics", "Cyberpark, Kozhikode", "2024-06", "", [
            "Built 14 Power BI dashboards for sales, stock and store performance used by 60 managers.",
            "Wrote SQL queries and automated Excel reports, saving 25 hours of manual work every month.",
            "Analysed customer purchase data in Python (pandas), finding segments that lifted repeat sales by 12%.",
            "Cleaned and validated data from 3 sources, reducing reporting errors by 40%.",
          ]),
          job("Junior Data Analyst Intern", "Example Insights", "Kozhikode", "2023-12", "2024-05", [
            "Prepared weekly KPI reports in Excel with pivot tables and XLOOKUP.",
          ]),
        ],
        education: [edu("B.Sc in Statistics", "Example University College, Kerala", "2020-06", "2023-04", "8.4 CGPA")],
        skills: skills({
          Analysis: ["SQL", "Excel", "Power BI", "Python", "pandas", "Statistics"],
          Reporting: ["Dashboards", "DAX", "Data cleaning", "KPI reporting"],
        }),
        projects: [
          project("Kerala tourism trends dashboard", "Personal project", ["Power BI", "Excel"], [
            "Built an interactive dashboard from public tourism data covering 10 years and 14 districts.",
          ]),
        ],
        certifications: [cert("Microsoft Certified: Power BI Data Analyst Associate", "Microsoft", "2025-02")],
      }),
  },
  {
    id: "accountant",
    title: "Accountant / accounts executive",
    kind: "finance",
    template: "ledger-pro",
    templateName: "Ledger Pro",
    data: () =>
      build({
        name: "ARJUN KRISHNAN",
        headline: "Accounts Executive | Tally, GST, TDS, Reconciliation",
        email: "arjun.krishnan@example.com",
        phone: "+91 90000 55555",
        location: "Thrissur, Kerala",
        linkedin: "linkedin.com/in/example-arjun",
        summary:
          "Accounts executive with 3 years of experience in bookkeeping, GST and TDS compliance, bank reconciliation and month-end closing for trading and service companies. Skilled in Tally Prime and Excel. Filed 100% of GST returns on time and cut month-end closing from 8 days to 4.",
        experience: [
          job("Accounts Executive", "Example Traders Pvt Ltd", "Thrissur", "2023-04", "", [
            "Managed accounts payable and receivable for 120+ vendors and customers in Tally Prime.",
            "Filed monthly GST and quarterly TDS returns with 100% on-time compliance for 3 years.",
            "Reconciled 6 bank accounts monthly with 99% accuracy, clearing a 9-month backlog in 10 weeks.",
            "Reduced month-end closing time from 8 days to 4 by standardising Excel templates.",
          ]),
          job("Accounts Assistant", "Example Consultants", "Thrissur", "2022-06", "2023-03", [
            "Recorded 400+ vouchers a month and prepared payroll inputs for 35 employees.",
          ]),
        ],
        education: [edu("M.Com in Finance", "Example College, University of Calicut", "2020-06", "2022-05", "First class"), edu("B.Com", "Example College, University of Calicut", "2017-06", "2020-04")],
        skills: skills({
          Accounting: ["Tally", "GST", "TDS", "Bank reconciliation", "Accounts payable", "Accounts receivable"],
          Tools: ["Excel", "Payroll", "MIS reporting"],
        }),
        projects: [],
        certifications: [cert("Tally Prime Certified Professional", "Tally Education", "2022-09")],
      }),
  },
  {
    id: "customer-support",
    title: "Customer support executive",
    kind: "support",
    template: "service-star",
    templateName: "Service Star",
    data: () =>
      build({
        name: "ANJALI MOHAN",
        headline: "Customer Support Executive | International Voice & Chat, CRM",
        email: "anjali.mohan@example.com",
        phone: "+91 90000 66666",
        location: "Kochi, Kerala",
        linkedin: "linkedin.com/in/example-anjali",
        summary:
          "Customer support executive with 2 years of experience in international voice and chat support for a US healthcare client. Consistently above target on CSAT (94%) and first-contact resolution (82%), handling 60+ queries a day in Salesforce CRM. Open to rotational and night shifts.",
        experience: [
          job("Customer Support Executive", "Example Global Services", "Infopark, Kochi", "2024-07", "", [
            "Resolved 60+ customer calls and chats a day for a US healthcare client with a 94% CSAT score.",
            "Achieved 82% first-contact resolution, 7 points above the team target.",
            "Logged and escalated cases in Salesforce CRM within SLA, maintaining 98% SLA compliance.",
            "Trained 6 new joiners on call flow, HIPAA privacy rules and CRM usage.",
          ]),
          job("Customer Care Associate", "Example Telecom Retail", "Kochi", "2023-06", "2024-06", [
            "Handled 40+ walk-in and phone queries a day and upsold plans worth ₹2 lakh a quarter.",
            "Cut repeat complaints by 20% by writing a simple troubleshooting guide for common issues.",
          ]),
        ],
        education: [edu("B.A. in English", "Example College, Mahatma Gandhi University", "2020-06", "2023-04")],
        skills: skills({
          Support: ["Customer service", "Inbound calls", "Chat support", "Email support", "Escalation handling"],
          Tools: ["Salesforce", "CRM", "Zendesk", "MS Excel"],
          Communication: ["English", "Active listening", "Problem solving"],
        }),
        projects: [],
        certifications: [cert("Service Cloud Basics (Trailhead badge)", "Salesforce", "2024-10")],
        languages: ["English:Fluent", "Malayalam:Native", "Hindi:Conversational"],
      }),
  },
  {
    id: "hr-recruiter",
    title: "HR / talent acquisition",
    kind: "hr",
    template: "people-first",
    templateName: "People First",
    data: () =>
      build({
        name: "NIVEDYA RAJ",
        headline: "HR Executive | Talent Acquisition, Onboarding, HRIS",
        email: "nivedya.raj@example.com",
        phone: "+91 90000 77777",
        location: "Kochi, Kerala",
        linkedin: "linkedin.com/in/example-nivedya",
        summary:
          "HR executive with 2 years of experience in end-to-end recruitment for IT roles, onboarding and HR operations. Closed 70+ technical positions, reduced average time-to-hire from 38 to 24 days, and kept candidate records accurate in the HRIS. MBA in Human Resource Management.",
        experience: [
          job("HR Executive – Talent Acquisition", "Example Tech Park Solutions", "Infopark, Kochi", "2024-05", "", [
            "Hired for 70+ technical roles including developers, testers and analysts across 4 teams.",
            "Cut average time-to-hire from 38 to 24 days by building a referral pipeline and LinkedIn sourcing.",
            "Coordinated 300+ interviews and ran onboarding for 45 new joiners with a 95% first-week completion rate.",
            "Maintained employee records and offer letters in the HRIS with 100% audit accuracy.",
          ]),
          job("HR Intern", "Example Staffing", "Kochi", "2023-12", "2024-04", [
            "Screened 500+ resumes and scheduled 120 interviews for 15 open roles.",
          ]),
        ],
        education: [edu("MBA in Human Resource Management", "Example School of Management, Kerala", "2022-07", "2024-05", "First class"), edu("B.Com", "Example College, Kerala", "2019-06", "2022-04")],
        skills: skills({
          Recruitment: ["Talent acquisition", "Sourcing", "Screening", "Interview coordination", "Onboarding"],
          Tools: ["LinkedIn Recruiter", "Naukri", "HRIS", "MS Excel"],
          "HR operations": ["Payroll inputs", "Employee records", "Offer letters"],
        }),
        projects: [
          project("Campus hiring drive", "Coordinator", ["Planning", "Assessment"], [
            "Organised a campus drive across 5 colleges that hired 18 freshers in 2 weeks.",
          ]),
        ],
      }),
  },
  {
    id: "digital-marketing",
    title: "Digital marketing executive",
    kind: "sales",
    template: "growth-grid",
    templateName: "Growth Grid",
    data: () =>
      build({
        name: "MEERA JOSEPH",
        headline: "Digital Marketing Executive | SEO, Google Ads, Meta Ads, Content",
        email: "meera.joseph@example.com",
        phone: "+91 90000 88888",
        location: "Kochi, Kerala",
        linkedin: "linkedin.com/in/example-meera",
        portfolio: "example-meera.pages.dev",
        summary:
          "Digital marketing executive with 2 years of experience in SEO, Google Ads, Meta Ads and content for education and retail brands. Grew organic traffic by 140% in a year, managed ₹6 lakh a month in ad spend at a 4.2x return, and reports results in Google Analytics 4.",
        experience: [
          job("Digital Marketing Executive", "Example Media Studio", "Kochi", "2024-04", "", [
            "Grew organic website traffic by 140% in 12 months through keyword research and on-page SEO.",
            "Managed ₹6 lakh a month in Google Ads and Meta Ads spend at a 4.2x return on ad spend.",
            "Planned and published 20 social posts and 4 blog articles a month for 5 brands.",
            "Built Google Analytics 4 dashboards that report leads and cost per lead every week.",
          ]),
          job("Marketing Intern", "Example Edtech", "Kochi", "2023-10", "2024-03", [
            "Ran an email campaign to 8,000 subscribers with a 28% open rate.",
          ]),
        ],
        education: [edu("BBA in Marketing", "Example College, Kerala", "2020-06", "2023-04", "")],
        skills: skills({
          Marketing: ["SEO", "Google Ads", "Meta Ads", "Content marketing", "Email marketing", "Social media marketing"],
          Tools: ["Google Analytics", "Google Search Console", "Canva", "WordPress"],
        }),
        projects: [],
        certifications: [cert("Google Ads Search Certification", "Google", "2024-08")],
      }),
  },
  {
    id: "business-development",
    title: "Business development / IT sales",
    kind: "sales",
    template: "deal-flow",
    templateName: "Deal Flow",
    data: () =>
      build({
        name: "AKHIL PRASAD",
        headline: "Business Development Executive | IT Services Sales, Lead Generation, CRM",
        email: "akhil.prasad@example.com",
        phone: "+91 90000 99999",
        location: "Kochi, Kerala",
        linkedin: "linkedin.com/in/example-akhil",
        summary:
          "Business development executive with 3 years of experience selling IT services to SMEs in India and the Middle East. Generated ₹1.8 crore in new contracts last year, built a pipeline of 250+ qualified leads through LinkedIn and cold outreach, and manages every deal in HubSpot CRM.",
        experience: [
          job("Business Development Executive", "Example IT Services", "Infopark, Kochi", "2023-05", "", [
            "Closed ₹1.8 crore in new web and app development contracts in FY 2025–26, 120% of target.",
            "Built a pipeline of 250+ qualified leads through LinkedIn outreach, cold email and referrals.",
            "Ran 90+ discovery calls and product demos a quarter with clients in India, UAE and Qatar.",
            "Tracked all deals in HubSpot CRM and improved lead-to-meeting conversion from 8% to 15%.",
          ]),
          job("Sales Trainee", "Example Software Solutions", "Kochi", "2022-06", "2023-04", [
            "Booked 40 qualified meetings for senior sales managers through cold calling.",
            "Researched 300 target companies and kept lead data accurate in the CRM every week.",
          ]),
        ],
        education: [edu("MBA in Marketing", "Example Business School, Kerala", "2020-07", "2022-05", "")],
        skills: skills({
          Sales: ["Business development", "Lead generation", "Cold calling", "Negotiation", "Proposal writing"],
          Tools: ["HubSpot", "CRM", "LinkedIn Sales Navigator", "MS Excel"],
        }),
        projects: [],
        certifications: [cert("Inbound Sales Certification", "HubSpot Academy", "2024-01")],
      }),
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX designer",
    kind: "design",
    template: "design-lens",
    templateName: "Design Lens",
    data: () =>
      build({
        name: "VISHNU DAS",
        headline: "UI/UX Designer | Figma, User Research, Design Systems",
        email: "vishnu.das@example.com",
        phone: "+91 90000 10101",
        location: "Trivandrum, Kerala",
        linkedin: "linkedin.com/in/example-vishnu",
        portfolio: "example-vishnu.pages.dev",
        summary:
          "UI/UX designer with 2 years of experience designing web and mobile products in Figma, from user research and wireframes to high-fidelity prototypes and developer handoff. Redesigned a checkout flow that lifted conversion by 18%, and built a design system used across 3 products.",
        experience: [
          job("UI/UX Designer", "Example Product Studio", "Technopark, Trivandrum", "2024-03", "", [
            "Redesigned a mobile checkout flow in Figma, increasing conversion by 18% in A/B testing.",
            "Built a design system of 60+ components used by 8 developers across 3 products.",
            "Ran 25 user interviews and 4 usability tests to prioritise features for the next release.",
            "Prepared developer handoff specs that cut UI rework tickets by 30%.",
          ]),
          job("Design Intern", "Example Creative Agency", "Trivandrum", "2023-09", "2024-02", [
            "Designed 12 landing pages and social creatives for 4 clients.",
          ]),
        ],
        education: [edu("B.Des in Communication Design", "Example Institute of Design, Kerala", "2019-07", "2023-05", "")],
        skills: skills({
          Design: ["Figma", "UI design", "UX design", "Wireframing", "Prototyping", "Design systems"],
          Research: ["User research", "Usability testing", "Information architecture"],
          Tools: ["Adobe Illustrator", "Photoshop", "HTML", "CSS"],
        }),
        projects: [
          project("Bus route finder app", "Personal case study", ["Figma", "User research"], [
            "Designed a bus-route app for Kerala commuters after interviewing 15 daily travellers.",
          ]),
        ],
      }),
  },
  /* ---------- senior professionals (8–15 years; up to two pages is normal) ---------- */
  {
    id: "senior-tech-lead",
    title: "Senior software engineer / tech lead",
    kind: "dev",
    level: "senior",
    maxPages: 2,
    template: "tech-lead",
    templateName: "Tech Lead",
    data: () =>
      build({
        name: "HARIKRISHNAN MENON",
        headline: "Technical Lead | Java, Spring Boot, Microservices, AWS | 10 Years",
        email: "hari.menon@example.com",
        phone: "+91 90000 20202",
        location: "Kochi, Kerala",
        linkedin: "linkedin.com/in/example-hari",
        github: "github.com/example-hari",
        summary:
          "Technical lead with 10 years of experience designing and running Java and Spring Boot microservices on AWS for banking and logistics clients. Leads a team of 8 engineers, owns architecture and code-review standards, and has delivered platforms handling 2 million transactions a day at 99.95% uptime. Known for turning unclear requirements into reliable releases and growing junior engineers into owners.",
        experience: [
          job("Technical Lead", "Example Financial Technologies", "Infopark, Kochi", "2021-04", "", [
            "Lead a team of 8 engineers building payment microservices in Java 17, Spring Boot and Kafka for 3 banking clients.",
            "Designed an event-driven settlement platform that processes 2 million transactions a day at 99.95% uptime.",
            "Cut cloud costs by 32% (₹48 lakh a year) by right-sizing AWS EKS clusters and moving batch jobs to spot instances.",
            "Introduced code-review guidelines, contract tests and SonarQube gates, reducing production incidents by 45%.",
            "Mentored 5 engineers to senior roles and ran 40+ technical interviews a year.",
          ]),
          job("Senior Software Engineer", "Example Logistics Systems", "Technopark, Trivandrum", "2018-01", "2021-03", [
            "Split a monolithic shipment-tracking system into 12 Spring Boot services, cutting release time from 3 weeks to 2 days.",
            "Built a real-time tracking API serving 15,000 requests a minute with Redis caching and PostgreSQL read replicas.",
            "Set up CI/CD with Jenkins and Docker for 20 services, with automated rollback on failed health checks.",
          ]),
          job("Software Engineer", "Example Software Services", "Kochi", "2015-07", "2017-12", [
            "Developed Java and Oracle modules for an insurance claims system used by 1,200 agents.",
            "Improved slow report queries by 70% through indexing and query rewrites.",
          ]),
        ],
        education: [edu("B.Tech in Computer Science and Engineering", "Example Government Engineering College, Kerala", "2011-08", "2015-05", "First class with distinction")],
        skills: skills({
          "Languages & frameworks": ["Java", "Spring Boot", "Kafka", "Microservices", "REST API", "Hibernate"],
          "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
          Data: ["PostgreSQL", "Oracle", "Redis"],
          Leadership: ["Architecture", "Code review", "Mentoring", "Agile", "Hiring"],
        }),
        projects: [],
        certifications: [cert("AWS Certified Solutions Architect – Associate", "Amazon Web Services", "2022-06"), cert("Oracle Certified Professional, Java SE", "Oracle", "2017-03")],
      }),
  },
  {
    id: "senior-project-manager",
    title: "Project / delivery manager",
    kind: "general",
    level: "senior",
    maxPages: 2,
    template: "delivery-head",
    templateName: "Delivery Head",
    data: () =>
      build({
        name: "DEEPA SURESH",
        headline: "Senior Project Manager | Agile Delivery, PMP, Client Management | 12 Years",
        email: "deepa.suresh@example.com",
        phone: "+91 90000 30303",
        location: "Kochi, Kerala",
        linkedin: "linkedin.com/in/example-deepa",
        summary:
          "PMP-certified project manager with 12 years in IT services, the last 6 leading delivery for US and European clients. Runs portfolios of 4–6 concurrent Agile projects worth ₹18 crore a year with teams of up to 45 people. Consistently delivers on time and within budget, and has grown two key accounts by 60% through steady client trust and clear reporting.",
        experience: [
          job("Senior Project Manager", "Example IT Solutions", "Infopark, Kochi", "2020-02", "", [
            "Manage a delivery portfolio of 5 Agile projects worth ₹18 crore a year with 45 engineers, testers and analysts.",
            "Delivered 94% of milestones on time across 3 years while keeping budgets within 3% of plan.",
            "Grew the two largest client accounts by 60% through quarterly business reviews and roadmap planning.",
            "Introduced Jira dashboards and a weekly risk register, cutting escalations to senior management by 50%.",
            "Hired and onboarded 18 team members and set up a project-manager mentoring circle.",
          ]),
          job("Project Manager", "Example Global Services", "Technopark, Trivandrum", "2016-06", "2020-01", [
            "Led 9 web and mobile projects for retail and healthcare clients, each 6–18 months long.",
            "Moved 3 teams from waterfall to Scrum, shortening release cycles from quarterly to monthly.",
            "Managed vendor contracts and change requests worth ₹2.4 crore with full audit traceability.",
          ]),
          job("Senior Business Analyst", "Example Technologies", "Kochi", "2013-07", "2016-05", [
            "Gathered requirements and wrote 200+ user stories for an ERP rollout across 14 branches.",
            "Ran user acceptance testing with 60 end users and cut post-launch defects by 35%.",
          ]),
        ],
        education: [edu("MBA in Operations Management", "Example School of Business, Kerala", "2011-07", "2013-05", "First class"), edu("B.Tech in Electronics and Communication", "Example College of Engineering, Kerala", "2007-08", "2011-05")],
        skills: skills({
          Delivery: ["Agile", "Scrum", "Kanban", "Risk management", "Budgeting", "Stakeholder management"],
          Tools: ["Jira", "Confluence", "MS Project", "Power BI", "Excel"],
          Leadership: ["Team building", "Client management", "Vendor management", "Hiring"],
        }),
        projects: [],
        certifications: [cert("Project Management Professional (PMP)", "Project Management Institute", "2018-09"), cert("Certified ScrumMaster (CSM)", "Scrum Alliance", "2017-04")],
      }),
  },
  {
    id: "senior-finance-manager",
    title: "Finance manager",
    kind: "finance",
    level: "senior",
    maxPages: 2,
    template: "finance-controller",
    templateName: "Finance Controller",
    data: () =>
      build({
        name: "THOMAS ABRAHAM",
        headline: "Finance Manager | Chartered Accountant | Reporting, Tax, Audit | 13 Years",
        email: "thomas.abraham@example.com",
        phone: "+91 90000 40404",
        location: "Kochi, Kerala",
        linkedin: "linkedin.com/in/example-thomas",
        summary:
          "Chartered accountant and finance manager with 13 years across manufacturing and IT services. Leads a 9-member finance team covering monthly reporting, GST and income tax, statutory audit and treasury for a ₹320 crore business. Closed the books in 5 working days, saved ₹1.1 crore through tax planning, and delivered three clean audits in a row.",
        experience: [
          job("Finance Manager", "Example Industries Ltd", "Kochi", "2019-05", "", [
            "Lead a 9-member team handling accounts, GST, TDS, income tax and treasury for a ₹320 crore company.",
            "Cut monthly closing from 12 to 5 working days by standardising reconciliations in SAP and Excel.",
            "Saved ₹1.1 crore in two years through tax planning and better working-capital management.",
            "Managed statutory, internal and tax audits with three consecutive clean audit reports.",
            "Built a cash-flow forecast that helped negotiate a ₹25 crore credit line at 1.2% lower interest.",
          ]),
          job("Assistant Finance Manager", "Example IT Services", "Infopark, Kochi", "2015-01", "2019-04", [
            "Prepared Ind AS financial statements and MIS reports for the board every month.",
            "Handled transfer-pricing documentation and GST transition for 4 entities.",
          ]),
          job("Audit Senior", "Example & Co, Chartered Accountants", "Kochi", "2012-08", "2014-12", [
            "Led statutory audits for 25+ clients in manufacturing, retail and services.",
          ]),
        ],
        education: [edu("Chartered Accountant (CA)", "Institute of Chartered Accountants of India", "2009-01", "2012-07"), edu("B.Com", "Example College, Mahatma Gandhi University", "2006-06", "2009-04")],
        skills: skills({
          Finance: ["Financial reporting", "Ind AS", "GST", "Income tax", "TDS", "Statutory audit", "Treasury", "Budgeting"],
          Tools: ["SAP", "Tally", "Excel", "Power BI"],
          Leadership: ["Team management", "Board reporting", "Banking relationships"],
        }),
        projects: [],
      }),
  },
  {
    id: "senior-hr-manager",
    title: "HR manager",
    kind: "hr",
    level: "senior",
    maxPages: 2,
    template: "hr-leader",
    templateName: "HR Leader",
    data: () =>
      build({
        name: "LAKSHMI PILLAI",
        headline: "HR Manager | Talent Acquisition, HR Operations, Employee Engagement | 11 Years",
        email: "lakshmi.pillai@example.com",
        phone: "+91 90000 50505",
        location: "Trivandrum, Kerala",
        linkedin: "linkedin.com/in/example-lakshmi",
        summary:
          "HR manager with 11 years in IT and product companies, leading end-to-end HR for teams of up to 900 people. Built hiring engines that close 250+ roles a year, reduced attrition from 24% to 14%, and rolled out an HRMS across 3 locations. Partners closely with business heads on workforce planning, performance and culture.",
        experience: [
          job("HR Manager", "Example Product Labs", "Technopark, Trivandrum", "2019-09", "", [
            "Lead a 7-member HR team supporting 900 employees across Trivandrum, Kochi and Bengaluru.",
            "Reduced annual attrition from 24% to 14% through stay interviews, career paths and manager training.",
            "Scaled hiring to 250+ roles a year while cutting average time-to-hire from 45 to 28 days.",
            "Rolled out an HRMS for payroll, leave and performance across 3 locations, saving 120 HR hours a month.",
            "Redesigned the appraisal process and trained 60 managers on goal setting and feedback.",
          ]),
          job("Senior HR Business Partner", "Example IT Services", "Infopark, Kochi", "2015-04", "2019-08", [
            "Partnered with 4 delivery heads on workforce plans, promotions and compensation reviews for 400 employees.",
            "Ran engagement surveys and action plans that raised engagement scores by 18 points.",
          ]),
          job("HR Executive", "Example Software", "Kochi", "2013-06", "2015-03", [
            "Handled recruitment, onboarding and statutory compliance (PF, ESI) for 150 employees.",
          ]),
        ],
        education: [edu("MBA in Human Resource Management", "Example Institute of Management, Kerala", "2011-07", "2013-05", "First class"), edu("B.A. in Psychology", "Example College, University of Kerala", "2008-06", "2011-04")],
        skills: skills({
          HR: ["Talent acquisition", "HR operations", "Performance management", "Employee engagement", "Compensation", "Labour law compliance"],
          Tools: ["HRMS", "LinkedIn Recruiter", "Excel", "Power BI"],
          Leadership: ["Workforce planning", "Manager coaching", "Change management"],
        }),
        projects: [],
        certifications: [cert("SHRM Certified Professional (SHRM-CP)", "SHRM", "2020-11")],
      }),
  },
  {
    id: "senior-sales-manager",
    title: "Sales / business head",
    kind: "sales",
    level: "senior",
    maxPages: 2,
    template: "sales-leader",
    templateName: "Sales Leader",
    data: () =>
      build({
        name: "SURESH NAMBIAR",
        headline: "Regional Sales Manager | B2B Sales, Team Leadership, Key Accounts | 12 Years",
        email: "suresh.nambiar@example.com",
        phone: "+91 90000 60606",
        location: "Kochi, Kerala",
        linkedin: "linkedin.com/in/example-suresh",
        summary:
          "Regional sales manager with 12 years in B2B technology and services sales across Kerala and the Middle East. Leads a team of 14 sales executives with an annual target of ₹42 crore, achieving 112% of target over the last three years. Builds steady pipelines, opens new territories and grows key accounts through long-term relationships.",
        experience: [
          job("Regional Sales Manager", "Example Business Solutions", "Kochi", "2019-04", "", [
            "Lead 14 sales executives across Kerala with a ₹42 crore annual target, averaging 112% achievement for 3 years.",
            "Opened the Gulf market, signing 22 enterprise clients worth ₹9 crore in the first 18 months.",
            "Grew the top 10 key accounts by 40% through quarterly reviews and bundled service plans.",
            "Set up a CRM-based weekly pipeline review that raised forecast accuracy from 70% to 92%.",
            "Hired and coached 11 executives, 4 of whom now lead their own territories.",
          ]),
          job("Key Account Manager", "Example Technologies", "Kochi", "2015-01", "2019-03", [
            "Managed 35 enterprise accounts worth ₹14 crore a year with a 95% renewal rate.",
            "Won 3 multi-year contracts worth over ₹1 crore each through competitive tenders.",
          ]),
          job("Sales Executive", "Example Systems", "Kozhikode", "2012-06", "2014-12", [
            "Exceeded quarterly targets in 9 of 10 quarters selling networking and security products.",
          ]),
        ],
        education: [edu("MBA in Marketing", "Example Business School, Kerala", "2010-07", "2012-05", "First class"), edu("B.Sc in Physics", "Example College, University of Calicut", "2007-06", "2010-04")],
        skills: skills({
          Sales: ["B2B sales", "Key account management", "Business development", "Negotiation", "Sales forecasting", "Tendering"],
          Tools: ["Salesforce", "CRM", "Excel", "Power BI"],
          Leadership: ["Team leadership", "Sales coaching", "Territory planning"],
        }),
        projects: [],
      }),
  },
];

export const exampleById = (exampleId) => EXAMPLES.find((e) => e.id === exampleId) || null;

/** A fresh copy of an example's resume data (new ids each time). */
export function exampleResume(exampleId) {
  const e = exampleById(exampleId);
  return e ? e.data() : null;
}
