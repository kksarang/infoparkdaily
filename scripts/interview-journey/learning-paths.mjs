/* Learning paths for /interview/learning/<slug>/ — IT and non-IT careers.
   Keep advice general and resources official/free where possible. */

/* Reusable resources: [name, url, note] */
const R = {
  roadmap: ["roadmap.sh", "https://roadmap.sh/", "Free step-by-step roadmaps for tech roles"],
  fcc: ["freeCodeCamp", "https://www.freecodecamp.org/learn/", "Free certifications with projects"],
  mdn: ["MDN Web Docs", "https://developer.mozilla.org/en-US/docs/Learn", "The reference for HTML, CSS and JavaScript"],
  w3: ["W3Schools", "https://www.w3schools.com/", "Quick syntax and try-it examples"],
  react: ["React docs — Learn", "https://react.dev/learn", "Official React tutorial"],
  java: ["dev.java — Learn", "https://dev.java/learn/", "Official Java learning path"],
  spring: ["Spring guides", "https://spring.io/guides", "Official Spring Boot guides"],
  pydocs: ["Python tutorial", "https://docs.python.org/3/tutorial/", "Official Python tutorial"],
  kaggle: ["Kaggle Learn", "https://www.kaggle.com/learn", "Short hands-on data and ML lessons"],
  sqlbolt: ["SQLBolt", "https://sqlbolt.com/", "Interactive SQL lessons"],
  w3sql: ["W3Schools SQL", "https://www.w3schools.com/sql/", "SQL syntax with examples"],
  powerbi: ["Microsoft Learn — Power BI", "https://learn.microsoft.com/en-us/training/powerplatform/power-bi", "Free official Power BI modules"],
  mslearn: ["Microsoft Learn", "https://learn.microsoft.com/en-us/training/", "Azure, .NET, data and AI paths"],
  aws: ["AWS Skill Builder", "https://skillbuilder.aws/", "Free AWS fundamentals training"],
  gcloud: ["Google Cloud Skills", "https://cloud.google.com/learn/training", "Google Cloud training and labs"],
  docker: ["Docker 101 tutorial", "https://www.docker.com/101-tutorial/", "Official getting-started tutorial"],
  k8s: ["Kubernetes tutorials", "https://kubernetes.io/docs/tutorials/", "Official interactive tutorials"],
  netacad: ["Cisco Networking Academy", "https://www.netacad.com/", "Networking, IT essentials and security"],
  owasp: ["OWASP Top 10", "https://owasp.org/www-project-top-ten/", "The most common web security risks"],
  postman: ["Postman Learning Center", "https://learning.postman.com/", "API testing guides"],
  selenium: ["Selenium documentation", "https://www.selenium.dev/documentation/", "Official WebDriver docs"],
  istqb: ["ISTQB", "https://www.istqb.org/", "Testing syllabus and certification"],
  flutter: ["Flutter docs", "https://docs.flutter.dev/", "Official Flutter documentation"],
  android: ["Android Developers courses", "https://developer.android.com/courses", "Official Kotlin & Android courses"],
  figma: ["Figma — Learn design", "https://www.figma.com/resources/learn-design/", "Design fundamentals from Figma"],
  canva: ["Canva Design School", "https://www.canva.com/designschool/", "Free design and social media lessons"],
  adobe: ["Adobe Learn", "https://www.adobe.com/learn", "Photoshop and Illustrator tutorials"],
  hubspot: ["HubSpot Academy", "https://academy.hubspot.com/", "Free marketing, sales and service courses"],
  skillshop: ["Google Skillshop", "https://skillshop.withgoogle.com/", "Google Ads and Analytics training"],
  tally: ["Tally Education", "https://tallyeducation.com/", "Tally courses and certifications"],
  gst: ["GST tutorials", "https://tutorial.gst.gov.in/", "Official GST portal user guides"],
  excel: ["Microsoft Excel help & learning", "https://support.microsoft.com/en-us/excel", "Official Excel tutorials"],
  iibf: ["IIBF", "https://www.iibf.org.in/", "Indian Institute of Banking & Finance courses"],
  nism: ["NISM", "https://www.nism.ac.in/", "Securities-market certifications"],
  rbi: ["RBI", "https://www.rbi.org.in/", "Official banking regulations and financial education"],
  pmi: ["PMI certifications", "https://www.pmi.org/certifications", "CAPM and PMP information"],
  scrum: ["The Scrum Guide", "https://scrumguides.org/", "The official Scrum guide (free)"],
  ascm: ["ASCM", "https://www.ascm.org/", "Supply chain learning and CSCP"],
  fostac: ["FoSTaC (FSSAI)", "https://fostac.fssai.gov.in/", "Food safety training and certification"],
  autodesk: ["Autodesk certification", "https://www.autodesk.com/certification", "AutoCAD and other Autodesk certifications"],
  nptel: ["NPTEL", "https://nptel.ac.in/", "IIT/IISc engineering courses with certificates"],
  swayam: ["SWAYAM", "https://swayam.gov.in/", "Government of India online courses"],
  mitocw: ["MIT OpenCourseWare", "https://ocw.mit.edu/", "Free university course material"],
  khan: ["Khan Academy", "https://www.khanacademy.org/", "Free maths, science and finance basics"],
  edx: ["edX", "https://www.edx.org/", "University courses (audit options)"],
  coursera: ["Coursera", "https://www.coursera.org/", "University courses; financial aid available"],
  ctet: ["CTET", "https://ctet.nic.in/", "Central Teacher Eligibility Test"],
  ktet: ["K-TET", "https://ktet.kerala.gov.in/", "Kerala Teacher Eligibility Test"],
  aha: ["American Heart Association CPR", "https://cpr.heart.org/", "BLS and ACLS courses"],
  duolingo: ["Duolingo", "https://www.duolingo.com/", "Daily English practice"],
  sololearn: ["Sololearn", "https://www.sololearn.com/", "Bite-size coding lessons on mobile"],
  exercism: ["Exercism", "https://exercism.org/", "Free coding exercises with mentoring"],
  hackerrank: ["HackerRank", "https://www.hackerrank.com/", "Coding and SQL practice used in hiring tests"],
  asap: ["ASAP Kerala", "https://asapkerala.gov.in/", "Kerala skill courses and community skill parks"],
  ict: ["ICT Academy of Kerala", "https://ictkerala.org/", "Industry-oriented IT skilling in Kerala"],
  enitexa: ["Enitexa.ai Learning", "https://sarangrajan.in/enitexa.ai/learning/", "Guided learning resources from Enitexa.ai"]
};

export const CATEGORIES = [
  ["software", "Software & web", "it"],
  ["data", "Data & AI", "it"],
  ["cloud", "Cloud & security", "it"],
  ["testing", "Testing", "it"],
  ["design", "Design & creative", "both"],
  ["business", "Business & finance", "nonit"],
  ["marketing", "Marketing & sales", "nonit"],
  ["office", "Office & support", "nonit"],
  ["engineering", "Core engineering", "nonit"],
  ["hospitality", "Hospitality & retail", "nonit"],
  ["health", "Healthcare & education", "nonit"],
  ["logistics", "Logistics", "nonit"],
  ["soft", "Soft skills", "both"]
];

/* m: [title, duration, [topics]] */
export const PATHS = [
  /* ---------------- IT ---------------- */
  {
    slug: "web-development", title: "Web development (frontend)", field: "it", cat: "software", icon: "code", tone: "ink", level: "Beginner", duration: "12–16 weeks",
    who: "Freshers and career switchers who want to build websites and web apps.",
    summary: "Learn HTML, CSS, JavaScript and React, then build and deploy real projects.",
    modules: [
      ["HTML & CSS foundations", "3 weeks", ["Semantic HTML and forms", "CSS box model, flexbox and grid", "Responsive design and media queries", "Accessibility basics"]],
      ["JavaScript essentials", "4 weeks", ["Variables, functions, arrays and objects", "DOM and events", "Fetch API and JSON", "ES modules, async/await"]],
      ["React", "4 weeks", ["Components, props and state", "Hooks: useState, useEffect", "Routing and forms", "Calling APIs and handling loading/errors"]],
      ["Tools & deployment", "2 weeks", ["Git and GitHub", "npm and Vite", "Deploying to a static host", "Basic performance and SEO"]]
    ],
    tools: ["HTML", "CSS", "JavaScript", "React", "Git", "VS Code", "Chrome DevTools"],
    resources: [R.mdn, R.fcc, R.react, R.roadmap, R.w3],
    certs: [["freeCodeCamp Responsive Web Design", "Free, project-based"], ["freeCodeCamp JavaScript Algorithms and Data Structures", "Free, project-based"]],
    projects: ["Personal portfolio site (responsive)", "Job-listing page that filters by city and type", "Weather or news app using a public API"],
    qs: "javascript", jobs: "/jobs/?q=frontend", live: "web"
  },
  {
    slug: "java-backend", title: "Java backend development", field: "it", cat: "software", icon: "server", tone: "yellow", level: "Beginner → Intermediate", duration: "16–20 weeks",
    who: "Graduates aiming for Java developer roles in IT services and product companies.",
    summary: "Core Java, OOP, collections, SQL and Spring Boot REST APIs — the most-hired backend stack in Kerala IT parks.",
    modules: [
      ["Core Java & OOP", "5 weeks", ["Syntax, types and control flow", "Classes, inheritance, interfaces", "Exceptions and collections", "Streams and lambdas"]],
      ["Databases", "3 weeks", ["SQL joins and aggregates", "Normalisation and indexes", "JDBC basics", "JPA/Hibernate overview"]],
      ["Spring Boot", "6 weeks", ["REST controllers and DTOs", "Dependency injection", "Spring Data JPA", "Validation and error handling"]],
      ["Production skills", "3 weeks", ["Unit testing with JUnit", "Maven/Gradle", "Logging and configuration", "Docker basics"]]
    ],
    tools: ["Java 17+", "Spring Boot", "MySQL/PostgreSQL", "IntelliJ IDEA", "Maven", "Postman", "Git"],
    resources: [R.java, R.spring, R.roadmap, R.sqlbolt, R.hackerrank],
    certs: [["Oracle Certified Professional: Java SE Developer", "Paid; recognised by employers"], ["Spring Certified Professional", "Paid; for experienced developers"]],
    projects: ["Student management REST API with CRUD and validation", "Job-portal backend with search and pagination", "Expense tracker API with authentication"],
    qs: "java", jobs: "/jobs/?q=java", live: "sql"
  },
  {
    slug: "python-development", title: "Python development", field: "it", cat: "software", icon: "code", tone: "cream", level: "Beginner", duration: "10–14 weeks",
    who: "Beginners who want a friendly first language for web, automation or data.",
    summary: "Python fundamentals, problem-solving, Django or FastAPI, and automation scripts.",
    modules: [
      ["Python basics", "3 weeks", ["Data types, loops, functions", "Lists, dicts, sets", "Files and exceptions", "Modules and virtual environments"]],
      ["Problem solving", "2 weeks", ["Strings and arrays practice", "Recursion basics", "Time complexity", "30 coding problems"]],
      ["Web with Django/FastAPI", "4 weeks", ["Models and ORM", "Views/routes and templates", "REST APIs", "Authentication"]],
      ["Automation & testing", "2 weeks", ["Working with CSV/Excel", "Requests and APIs", "pytest basics", "Scheduling scripts"]]
    ],
    tools: ["Python 3", "Django or FastAPI", "PostgreSQL", "pip/venv", "pytest", "Git"],
    resources: [R.pydocs, R.fcc, R.exercism, R.hackerrank, R.roadmap],
    certs: [["freeCodeCamp Scientific Computing with Python", "Free"], ["PCEP — Certified Entry-Level Python Programmer", "Paid, entry level"]],
    projects: ["Command-line expense tracker", "Django blog with login", "Script that cleans an Excel file and emails a report"],
    qs: "python", jobs: "/jobs/?q=python", live: "py"
  },
  {
    slug: "mobile-apps", title: "Mobile app development", field: "it", cat: "software", icon: "phone", tone: "soft", level: "Beginner → Intermediate", duration: "12–16 weeks",
    who: "People who want to build Android and iOS apps with Flutter or Kotlin.",
    summary: "Dart and Flutter (or Kotlin for Android), state management, APIs and publishing.",
    modules: [
      ["Language basics", "3 weeks", ["Dart or Kotlin syntax", "OOP and null safety", "Async programming", "Collections"]],
      ["UI building", "4 weeks", ["Widgets/Compose layouts", "Navigation", "Forms and validation", "Responsive layouts"]],
      ["Data & state", "4 weeks", ["REST APIs and JSON", "State management (Provider/Riverpod/BLoC or ViewModel)", "Local storage", "Firebase basics"]],
      ["Release", "2 weeks", ["App icons and splash", "Testing on devices", "Play Store release steps", "Crash monitoring"]]
    ],
    tools: ["Flutter & Dart", "Kotlin", "Android Studio", "Firebase", "Git"],
    resources: [R.flutter, R.android, R.roadmap, R.enitexa],
    certs: [["Associate Android Developer (Google)", "Check current availability before enrolling"]],
    projects: ["To-do app with local storage", "Job-search app using a public API", "Expense app with charts"],
    qs: "flutter", jobs: "/jobs/?q=flutter", live: "js"
  },
  {
    slug: "data-analyst", title: "Data analyst", field: "it", cat: "data", icon: "chart", tone: "yellow", level: "Beginner", duration: "10–12 weeks",
    who: "Graduates from any stream who like numbers and want analytics roles.",
    summary: "Excel, SQL, Power BI and basic statistics — turn data into decisions.",
    modules: [
      ["Excel for analysis", "2 weeks", ["Formulas, lookups (XLOOKUP)", "Pivot tables and charts", "Data cleaning", "Conditional formatting"]],
      ["SQL", "3 weeks", ["SELECT, WHERE, ORDER BY", "JOINs and GROUP BY", "Subqueries", "Window functions"]],
      ["Power BI / Tableau", "3 weeks", ["Importing and modelling data", "DAX measures", "Interactive dashboards", "Publishing and sharing"]],
      ["Statistics & storytelling", "2 weeks", ["Mean, median, distributions", "Correlation vs causation", "Choosing the right chart", "Presenting insights"]]
    ],
    tools: ["Excel", "SQL", "Power BI", "Tableau", "Python (pandas, optional)"],
    resources: [R.powerbi, R.sqlbolt, R.kaggle, R.excel, R.khan],
    certs: [["Microsoft Power BI Data Analyst (PL-300)", "Paid; widely recognised"], ["Google Data Analytics Professional Certificate", "On Coursera; financial aid available"]],
    projects: ["Sales dashboard from a public dataset", "SQL analysis of an employees database", "HR attrition analysis with insights deck"],
    qs: "data-analyst", jobs: "/jobs/?q=data%20analyst", live: "sql"
  },
  {
    slug: "data-science", title: "Data science & AI/ML", field: "it", cat: "data", icon: "spark", tone: "ink", level: "Intermediate", duration: "16–24 weeks",
    who: "Learners comfortable with Python and maths who want ML and AI roles.",
    summary: "Python, statistics, machine learning with scikit-learn, and an introduction to deep learning and LLMs.",
    modules: [
      ["Python for data", "3 weeks", ["NumPy and pandas", "Data cleaning", "Visualisation", "Jupyter notebooks"]],
      ["Statistics & maths", "3 weeks", ["Probability and distributions", "Hypothesis testing", "Linear algebra basics", "Gradient intuition"]],
      ["Machine learning", "6 weeks", ["Regression and classification", "Train/validation/test and cross-validation", "Metrics: precision, recall, F1", "Feature engineering"]],
      ["Deep learning & AI", "4 weeks", ["Neural network basics", "NLP and embeddings", "Using LLM APIs responsibly", "Model deployment basics"]]
    ],
    tools: ["Python", "pandas", "scikit-learn", "Jupyter", "TensorFlow or PyTorch", "Git"],
    resources: [R.kaggle, R.pydocs, R.coursera, R.mitocw, R.nptel],
    certs: [["NPTEL courses in ML/AI", "Proctored exam certificate"], ["Cloud ML fundamentals (Azure AI-900)", "Paid; entry level"]],
    projects: ["House-price prediction with clear evaluation", "Spam classifier with precision/recall analysis", "Resume–job matching using text similarity"],
    qs: "data-science", jobs: "/jobs/?q=data%20scientist", live: "py"
  },
  {
    slug: "sql-databases", title: "SQL & databases", field: "it", cat: "data", icon: "db", tone: "cream", level: "Beginner", duration: "4–6 weeks",
    who: "Developers, testers, analysts and support engineers — almost every IT role uses SQL.",
    summary: "Write confident queries, design simple schemas and answer the classic SQL interview questions.",
    modules: [
      ["Querying", "1 week", ["SELECT, WHERE, ORDER BY, LIMIT", "Aggregates and GROUP BY", "HAVING", "NULL handling"]],
      ["Joins", "1 week", ["INNER, LEFT, RIGHT joins", "Self joins", "Subqueries", "UNION"]],
      ["Advanced", "2 weeks", ["Window functions (RANK, DENSE_RANK)", "CTEs", "Indexes and EXPLAIN", "Transactions and ACID"]],
      ["Design", "1 week", ["Keys and relationships", "Normalisation", "ER diagrams", "Choosing data types"]]
    ],
    tools: ["MySQL", "PostgreSQL", "SQLite", "DBeaver"],
    resources: [R.sqlbolt, R.w3sql, R.hackerrank, R.kaggle],
    certs: [["HackerRank SQL skill certificate", "Free online test"]],
    projects: ["Library database with sample queries", "Top-N per group report", "Duplicate detection and clean-up script"],
    qs: "sql", jobs: "/jobs/?q=sql", live: "sql"
  },
  {
    slug: "devops-cloud", title: "DevOps & cloud", field: "it", cat: "cloud", icon: "cloud", tone: "soft", level: "Intermediate", duration: "14–18 weeks",
    who: "Developers, sysadmins and support engineers moving into cloud and DevOps.",
    summary: "Linux, Git, CI/CD, Docker, Kubernetes and one cloud platform.",
    modules: [
      ["Linux & networking", "3 weeks", ["Shell commands and permissions", "Processes and services", "DNS, HTTP, ports", "Bash scripting"]],
      ["CI/CD", "3 weeks", ["Git workflows", "GitHub Actions or Jenkins", "Automated tests in pipelines", "Artifacts and releases"]],
      ["Containers", "4 weeks", ["Docker images and compose", "Kubernetes pods, deployments, services", "Config and secrets", "Scaling and health checks"]],
      ["Cloud", "4 weeks", ["Compute, storage, networking on AWS or Azure", "IAM and security", "Infrastructure as Code (Terraform)", "Monitoring and alerts"]]
    ],
    tools: ["Linux", "Git", "Docker", "Kubernetes", "Terraform", "AWS or Azure", "Grafana"],
    resources: [R.aws, R.mslearn, R.docker, R.k8s, R.roadmap, R.gcloud],
    certs: [["AWS Certified Cloud Practitioner", "Paid; entry level"], ["Microsoft Azure Fundamentals (AZ-900)", "Paid; entry level"], ["Certified Kubernetes Administrator (CKA)", "Paid; advanced"]],
    projects: ["Containerise a web app with Docker Compose", "CI pipeline that tests and deploys on every push", "Terraform a small cloud environment"],
    qs: "devops-cloud", jobs: "/jobs/?q=devops", live: null
  },
  {
    slug: "cybersecurity", title: "Cybersecurity", field: "it", cat: "cloud", icon: "shield", tone: "ink", level: "Beginner → Intermediate", duration: "14–20 weeks",
    who: "IT graduates and network engineers interested in security analyst roles.",
    summary: "Networking, Linux, web security, threats and defensive tools — the foundations for SOC and security roles.",
    modules: [
      ["Foundations", "4 weeks", ["Networking (TCP/IP, ports, DNS)", "Linux and Windows basics", "CIA triad", "Encryption vs hashing"]],
      ["Web & application security", "3 weeks", ["OWASP Top 10", "SQL injection and XSS (and prevention)", "Authentication and sessions", "Secure coding basics"]],
      ["Defence & monitoring", "4 weeks", ["Firewalls and IDS", "Logs and SIEM basics", "Incident response steps", "Vulnerability scanning"]],
      ["Governance", "2 weeks", ["Policies and access control", "Risk assessment", "Security awareness", "Compliance overview"]]
    ],
    tools: ["Wireshark", "Nmap", "Burp Suite (Community)", "Linux", "A SIEM (e.g. Splunk Free)"],
    resources: [R.netacad, R.owasp, R.roadmap, R.nptel],
    certs: [["CompTIA Security+", "Paid; widely recognised entry cert"], ["Cisco CyberOps Associate", "Paid"]],
    projects: ["Home lab with a vulnerable test app (legal, isolated)", "Log-analysis report of suspicious logins", "Security checklist for a small company"],
    qs: "cybersecurity", jobs: "/jobs/?q=security", live: null
  },
  {
    slug: "networking-sysadmin", title: "Networking & system admin", field: "it", cat: "cloud", icon: "network", tone: "yellow", level: "Beginner", duration: "10–14 weeks",
    who: "Diploma and degree holders targeting IT support, NOC and system administrator roles.",
    summary: "Hardware, networking, Windows/Linux administration and troubleshooting.",
    modules: [
      ["IT essentials", "2 weeks", ["Hardware components", "OS installation", "Troubleshooting method", "Ticketing basics"]],
      ["Networking", "4 weeks", ["OSI and TCP/IP", "IP addressing and subnetting", "Switching and routing basics", "Wi-Fi and VPN"]],
      ["Administration", "3 weeks", ["Windows users, groups, Active Directory basics", "Linux administration", "Backups", "Patching"]],
      ["Support skills", "2 weeks", ["Remote support tools", "SLA and escalation", "Documentation", "Customer communication"]]
    ],
    tools: ["Windows Server", "Linux", "Cisco Packet Tracer", "Active Directory", "Ticketing tools"],
    resources: [R.netacad, R.nptel, R.mslearn, R.ict],
    certs: [["Cisco CCNA", "Paid; strong networking credential"], ["CompTIA A+ / Network+", "Paid; entry level"]],
    projects: ["Packet Tracer office network design", "Linux server set-up guide", "IT support knowledge-base with 10 articles"],
    qs: "linux-networking", jobs: "/jobs/?q=network", live: null
  },
  {
    slug: "software-testing", title: "Software testing (QA)", field: "it", cat: "testing", icon: "check", tone: "cream", level: "Beginner", duration: "10–12 weeks",
    who: "Freshers from any IT background — QA is one of the most common entry roles in park companies.",
    summary: "Manual testing, test cases, bug reporting, API testing and Selenium automation.",
    modules: [
      ["Testing fundamentals", "3 weeks", ["SDLC and STLC", "Test cases and test data", "Bug life cycle", "Types of testing"]],
      ["Tools & SQL", "2 weeks", ["Jira", "SQL for data checks", "Test management", "Writing clear bug reports"]],
      ["API testing", "2 weeks", ["HTTP methods and status codes", "Postman collections", "Assertions", "Environments"]],
      ["Automation", "4 weeks", ["Selenium WebDriver with Java or Python", "Locators and waits", "Page Object Model", "Running tests in CI"]]
    ],
    tools: ["Jira", "Postman", "Selenium", "TestNG/pytest", "SQL", "Git"],
    resources: [R.istqb, R.selenium, R.postman, R.roadmap],
    certs: [["ISTQB Certified Tester Foundation Level (CTFL)", "Paid; valued by testing teams"]],
    projects: ["Test plan + 50 test cases for a shopping site", "Postman collection for a public API", "Selenium suite for login and search"],
    qs: "manual-testing", jobs: "/jobs/?q=testing", live: "js"
  },
  {
    slug: "ui-ux-design", title: "UI/UX design", field: "it", cat: "design", icon: "pen", tone: "soft", level: "Beginner", duration: "10–14 weeks",
    who: "Creative people who want to design apps and websites.",
    summary: "Design principles, user research, wireframes, Figma prototypes and a case-study portfolio.",
    modules: [
      ["Design basics", "3 weeks", ["Layout, spacing and alignment", "Typography", "Colour and contrast", "Visual hierarchy"]],
      ["UX process", "3 weeks", ["User research and personas", "User flows", "Wireframes", "Usability testing"]],
      ["Figma", "3 weeks", ["Components and auto layout", "Prototyping", "Design systems", "Hand-off to developers"]],
      ["Portfolio", "2 weeks", ["Writing case studies", "Showing process, not just screens", "Presenting your work", "Accessibility checks"]]
    ],
    tools: ["Figma", "FigJam", "Adobe Illustrator", "Maze or similar testing tools"],
    resources: [R.figma, R.coursera, R.roadmap, R.canva],
    certs: [["Google UX Design Professional Certificate", "On Coursera; financial aid available"]],
    projects: ["Redesign a local business website", "Job-search app prototype with usability test", "Mini design system with 10 components"],
    qs: "ui-ux", jobs: "/jobs/?q=ui%20ux", live: "web"
  },

  /* ---------------- NON-IT ---------------- */
  {
    slug: "accounting-finance", title: "Accounting & finance", field: "nonit", cat: "business", icon: "calc", tone: "yellow", level: "Beginner", duration: "8–12 weeks",
    who: "B.Com, M.Com and BBA graduates aiming for accounts executive and finance roles.",
    summary: "Accounting principles, Tally Prime, GST and TDS basics, reconciliation and Excel.",
    modules: [
      ["Accounting basics", "2 weeks", ["Golden rules and journal entries", "Ledgers and trial balance", "P&L and balance sheet", "Accruals and depreciation"]],
      ["Tally Prime", "3 weeks", ["Company set-up and masters", "Vouchers and inventory", "GST in Tally", "Reports"]],
      ["Taxation basics", "2 weeks", ["GST: CGST, SGST, IGST and returns", "TDS basics", "E-invoicing and e-way bills overview", "Compliance calendar"]],
      ["Excel for finance", "2 weeks", ["Lookups and pivots", "Bank reconciliation", "Ageing reports", "MIS reports"]]
    ],
    tools: ["Tally Prime", "MS Excel", "Zoho Books", "GST portal"],
    resources: [R.tally, R.gst, R.excel, R.swayam, R.asap],
    certs: [["Tally certification (Tally Education)", "Recognised by many employers"], ["NISM certifications (for securities roles)", "Paid"]],
    projects: ["Complete a month of entries for a sample company in Tally", "Bank reconciliation in Excel", "GST summary report"],
    qs: "accounts", jobs: "/jobs/?q=accounts", live: null
  },
  {
    slug: "banking", title: "Banking & financial services", field: "nonit", cat: "business", icon: "bank", tone: "ink", level: "Beginner", duration: "8–10 weeks",
    who: "Graduates preparing for bank, NBFC, insurance and BFSI operations roles.",
    summary: "Banking concepts, products, KYC, regulation, customer service and sales skills.",
    modules: [
      ["Banking basics", "2 weeks", ["Deposits and CASA", "Loans and NPAs", "Payment systems: NEFT, RTGS, IMPS, UPI", "Role of the RBI"]],
      ["Products & sales", "2 weeks", ["Savings, FD, RD", "Loans and cards", "Insurance and investment basics", "Needs-based selling"]],
      ["Compliance", "2 weeks", ["KYC and AML", "Fraud awareness", "Customer grievance process", "Data privacy"]],
      ["Customer service", "2 weeks", ["Handling complaints", "Communication", "Targets and ethics", "Digital banking support"]]
    ],
    tools: ["Core banking basics", "MS Excel", "CRM tools"],
    resources: [R.iibf, R.rbi, R.nism, R.khan],
    certs: [["IIBF certificates", "Courses for bank staff and aspirants"], ["NISM Series certifications", "For securities/mutual-fund roles"], ["IRDAI licence (insurance)", "Required to sell insurance"]],
    projects: ["Product comparison sheet for 5 savings accounts", "KYC checklist for account opening", "Customer FAQ for digital banking"],
    qs: "banking", jobs: "/jobs/?q=bank", live: null
  },
  {
    slug: "project-management", title: "Project management & business analysis", field: "nonit", cat: "business", icon: "kanban", tone: "cream", level: "Intermediate", duration: "8–12 weeks",
    who: "Professionals moving into coordinator, BA, Scrum Master or project manager roles.",
    summary: "Requirements, Agile and Scrum, planning, risk and stakeholder management.",
    modules: [
      ["Business analysis", "3 weeks", ["Requirement gathering", "User stories and acceptance criteria", "Process mapping", "BRD/FRD"]],
      ["Agile & Scrum", "2 weeks", ["Scrum roles and events", "Backlogs and sprints", "Kanban", "Estimation"]],
      ["Planning & control", "3 weeks", ["Scope, schedule, cost", "Critical path", "Risk and RAID logs", "Status reporting"]],
      ["People skills", "2 weeks", ["Stakeholder management", "Facilitation", "Conflict resolution", "Presentations"]]
    ],
    tools: ["Jira", "Confluence", "MS Project", "Trello", "Excel", "Miro"],
    resources: [R.scrum, R.pmi, R.coursera, R.hubspot],
    certs: [["PMI CAPM / PMP", "Paid; PMP needs experience"], ["Professional Scrum Master (PSM I)", "Paid"], ["Certified Scrum Master (CSM)", "Paid"]],
    projects: ["Project charter and plan for a sample app", "Backlog with 20 user stories", "Risk register for a product launch"],
    qs: "project-management", jobs: "/jobs/?q=project", live: null
  },
  {
    slug: "digital-marketing", title: "Digital marketing", field: "nonit", cat: "marketing", icon: "megaphone", tone: "yellow", level: "Beginner", duration: "8–12 weeks",
    who: "Graduates and creatives who want marketing roles in agencies and companies.",
    summary: "SEO, social media, Google and Meta ads, analytics and content.",
    modules: [
      ["Marketing basics", "1 week", ["Funnels and customer journey", "Audiences and personas", "Brand basics", "KPIs"]],
      ["SEO & content", "3 weeks", ["Keyword research", "On-page and technical SEO", "Content writing for search", "Link building basics"]],
      ["Paid ads", "3 weeks", ["Google Ads search and display", "Meta ads", "Budgets and bidding", "A/B testing"]],
      ["Analytics", "2 weeks", ["Google Analytics", "UTM tracking", "Conversion tracking", "Reporting"]]
    ],
    tools: ["Google Analytics", "Google Ads", "Meta Ads Manager", "Search Console", "Canva"],
    resources: [R.skillshop, R.hubspot, R.canva, R.coursera],
    certs: [["Google Ads certifications (Skillshop)", "Free"], ["HubSpot Inbound / Content Marketing", "Free"]],
    projects: ["SEO audit of a local business site", "Mock ad campaign with budget and KPIs", "30-day social media content calendar"],
    qs: "digital-marketing", jobs: "/jobs/?q=digital%20marketing", live: null
  },
  {
    slug: "sales-business-development", title: "Sales & business development", field: "nonit", cat: "marketing", icon: "handshake", tone: "ink", level: "Beginner", duration: "6–8 weeks",
    who: "People who enjoy talking to customers — inside sales, BD and account management.",
    summary: "Prospecting, pitching, objection handling, CRM and negotiation.",
    modules: [
      ["Sales fundamentals", "2 weeks", ["Sales funnel", "Lead qualification", "Understanding customer needs", "Product knowledge"]],
      ["Communication", "2 weeks", ["Cold calling and emails", "Pitch structure", "Handling objections", "Follow-ups"]],
      ["Tools", "1 week", ["CRM (Zoho/HubSpot)", "Pipeline management", "Reporting", "LinkedIn prospecting"]],
      ["Closing", "2 weeks", ["Negotiation basics", "Proposals", "Closing techniques", "Account growth"]]
    ],
    tools: ["Zoho CRM", "HubSpot CRM", "Excel", "LinkedIn"],
    resources: [R.hubspot, R.coursera, R.swayam],
    certs: [["HubSpot Inbound Sales", "Free"]],
    projects: ["Sales pitch for an IT product (recorded)", "Prospect list with qualification notes", "Objection-handling script"],
    qs: "sales", jobs: "/jobs/?q=sales", live: null
  },
  {
    slug: "hr-recruitment", title: "HR & recruitment", field: "nonit", cat: "office", icon: "people", tone: "cream", level: "Beginner", duration: "8–10 weeks",
    who: "MBA (HR), BBA and graduates aiming for recruiter and HR executive roles.",
    summary: "Sourcing, screening, onboarding, HR operations, payroll basics and labour-law awareness.",
    modules: [
      ["Recruitment", "3 weeks", ["Job descriptions", "Sourcing on portals and LinkedIn", "Boolean search", "Screening and scheduling"]],
      ["Onboarding & HR ops", "2 weeks", ["Offer and documentation", "Induction", "HRMS", "Employee records"]],
      ["Payroll & compliance", "2 weeks", ["CTC structure", "PF, ESI, professional tax basics", "Leave and attendance", "Policy awareness"]],
      ["Engagement", "2 weeks", ["Performance reviews", "Engagement activities", "Exit process", "HR metrics"]]
    ],
    tools: ["Naukri Resdex", "LinkedIn Recruiter basics", "Excel", "HRMS (Zoho People, Darwinbox)"],
    resources: [R.coursera, R.swayam, R.excel, R.hubspot],
    certs: [["HR analytics or recruitment courses (SWAYAM/Coursera)", "Free or low cost"]],
    projects: ["Hiring plan for 20 freshers", "Onboarding checklist", "Recruitment dashboard in Excel"],
    qs: "hr-recruiter", jobs: "/jobs/?q=hr", live: null
  },
  {
    slug: "customer-support", title: "Customer support & BPO", field: "nonit", cat: "office", icon: "headset", tone: "soft", level: "Beginner", duration: "4–6 weeks",
    who: "Freshers looking for voice, chat and email support roles — a fast entry into park companies.",
    summary: "Communication, empathy, ticketing tools, SLAs and typing speed.",
    modules: [
      ["Communication", "2 weeks", ["Spoken English practice", "Active listening", "Tone and empathy", "Email and chat writing"]],
      ["Process", "1 week", ["Ticketing tools", "SLA, AHT, FCR, CSAT", "Escalation", "Knowledge bases"]],
      ["Handling difficult customers", "1 week", ["Acknowledge–apologise–act", "Saying no politely", "De-escalation", "Follow-ups"]],
      ["Typing & tools", "1 week", ["Typing 35+ WPM", "CRM basics", "Excel basics", "Multitasking"]]
    ],
    tools: ["Freshdesk/Zendesk", "CRM", "MS Office", "Typing practice"],
    resources: [R.duolingo, R.hubspot, R.swayam, R.asap],
    certs: [["HubSpot Customer Service", "Free"]],
    projects: ["Record a mock support call", "Write 10 email replies to common complaints", "Typing speed log over 2 weeks"],
    qs: "customer-support", jobs: "/jobs/?q=customer%20support", live: null
  },
  {
    slug: "office-admin-excel", title: "Office administration & MS Excel", field: "nonit", cat: "office", icon: "sheet", tone: "yellow", level: "Beginner", duration: "4–6 weeks",
    who: "Graduates for admin, MIS, data entry, front office and back-office roles.",
    summary: "MS Office, Excel formulas and pivots, reporting, records and front-desk skills.",
    modules: [
      ["MS Office", "1 week", ["Word documents and letters", "PowerPoint basics", "Outlook and calendars", "File organisation"]],
      ["Excel", "2 weeks", ["SUMIF, COUNTIF, XLOOKUP", "Pivot tables", "Charts", "Data validation"]],
      ["Reporting", "1 week", ["MIS reports", "Dashboards", "Templates", "Accuracy checks"]],
      ["Front office", "1 week", ["Phone etiquette", "Visitor management", "Scheduling", "Confidentiality"]]
    ],
    tools: ["MS Excel", "Word", "PowerPoint", "Google Sheets"],
    resources: [R.excel, R.khan, R.swayam, R.asap],
    certs: [["Microsoft Office Specialist (MOS) Excel", "Paid"]],
    projects: ["Monthly attendance MIS", "Inventory tracker with alerts", "Visitor log template"],
    qs: "office-admin", jobs: "/jobs/?q=admin", live: null
  },
  {
    slug: "graphic-design", title: "Graphic design", field: "nonit", cat: "design", icon: "palette", tone: "ink", level: "Beginner", duration: "8–12 weeks",
    who: "Creative learners aiming for graphic designer and social media designer roles.",
    summary: "Design principles, Photoshop, Illustrator, branding and a strong portfolio.",
    modules: [
      ["Principles", "2 weeks", ["Hierarchy, balance, contrast", "Typography", "Colour theory", "Grids"]],
      ["Tools", "4 weeks", ["Photoshop: layers, masks, retouching", "Illustrator: vectors and logos", "InDesign basics", "Canva for quick work"]],
      ["Branding & print", "2 weeks", ["Logos and brand guides", "Print: CMYK, bleed, 300 DPI", "Packaging basics", "Mock-ups"]],
      ["Portfolio", "2 weeks", ["Behance/Dribbble profile", "Case studies", "Client briefs", "Feedback handling"]]
    ],
    tools: ["Adobe Photoshop", "Adobe Illustrator", "InDesign", "Figma", "Canva"],
    resources: [R.adobe, R.canva, R.figma, R.coursera],
    certs: [["Adobe Certified Professional", "Paid"]],
    projects: ["Brand identity for a local café", "Set of 10 social media posts", "Event poster in print-ready format"],
    qs: "graphic-design", jobs: "/jobs/?q=graphic%20designer", live: null
  },
  {
    slug: "content-writing", title: "Content writing", field: "nonit", cat: "marketing", icon: "pen", tone: "cream", level: "Beginner", duration: "4–8 weeks",
    who: "Good writers who want content, copywriting and technical writing roles.",
    summary: "Clear writing, SEO content, copywriting and a writing portfolio.",
    modules: [
      ["Writing skills", "2 weeks", ["Grammar and clarity", "Structure and headings", "Tone of voice", "Editing"]],
      ["SEO content", "2 weeks", ["Search intent", "Keywords naturally", "Meta titles and descriptions", "Internal links"]],
      ["Copywriting", "1 week", ["Headlines", "Calls to action", "Ads and landing pages", "Email copy"]],
      ["Portfolio", "1 week", ["Samples across formats", "Blog or Medium profile", "Pitching", "Briefs and deadlines"]]
    ],
    tools: ["Google Docs", "Grammar tools", "WordPress", "Search Console"],
    resources: [R.hubspot, R.coursera, R.duolingo],
    certs: [["HubSpot Content Marketing", "Free"]],
    projects: ["3 SEO blog posts on career topics", "Landing page copy for a product", "How-to guide with screenshots"],
    qs: "content-writing", jobs: "/jobs/?q=content%20writer", live: null
  },
  {
    slug: "mechanical-engineering", title: "Mechanical engineering (CAD & production)", field: "nonit", cat: "engineering", icon: "gear", tone: "yellow", level: "Beginner → Intermediate", duration: "12–16 weeks",
    who: "Mechanical graduates targeting design, production, quality and maintenance roles.",
    summary: "Engineering drawing, CAD, manufacturing processes, quality tools and maintenance.",
    modules: [
      ["Drawing & GD&T", "3 weeks", ["Engineering drawing standards", "Tolerances and fits", "GD&T basics", "Reading drawings"]],
      ["CAD", "4 weeks", ["AutoCAD 2D drafting", "SolidWorks/CATIA/Creo 3D modelling", "Assemblies", "Drawings from models"]],
      ["Manufacturing", "3 weeks", ["Machining, welding, casting", "CNC basics", "Materials and heat treatment", "Production planning"]],
      ["Quality & maintenance", "3 weeks", ["7 QC tools, 5 Whys, fishbone", "Preventive vs predictive maintenance", "Safety", "Lean basics"]]
    ],
    tools: ["AutoCAD", "SolidWorks", "CATIA", "Creo", "MS Excel"],
    resources: [R.nptel, R.autodesk, R.mitocw, R.swayam, R.asap],
    certs: [["Autodesk Certified User/Professional (AutoCAD)", "Paid"], ["CSWA — Certified SolidWorks Associate", "Paid"], ["NPTEL courses in your specialisation", "Proctored exam"]],
    projects: ["3D model and drawing of a gearbox assembly", "Root-cause analysis of a sample defect", "Preventive maintenance schedule for a machine"],
    qs: "mechanical", jobs: "/jobs/?q=mechanical", live: null
  },
  {
    slug: "civil-engineering", title: "Civil engineering (site & design)", field: "nonit", cat: "engineering", icon: "building", tone: "ink", level: "Beginner → Intermediate", duration: "12–16 weeks",
    who: "Civil graduates for site engineer, structural design, QS and planning roles.",
    summary: "Drawings, concrete technology, estimation, structural software and site management.",
    modules: [
      ["Drawings & codes", "3 weeks", ["AutoCAD drafting", "Reading structural drawings", "Indian Standard codes overview", "Building bye-laws basics"]],
      ["Materials & site", "3 weeks", ["Concrete grades and mix", "Tests: slump, cube", "Curing and formwork", "Site safety"]],
      ["Estimation", "3 weeks", ["Quantity take-off", "BOQ and rate analysis", "Billing", "Cost control"]],
      ["Design & planning", "3 weeks", ["STAAD.Pro/ETABS basics", "Revit/BIM overview", "MS Project/Primavera", "Progress reporting"]]
    ],
    tools: ["AutoCAD", "STAAD.Pro", "ETABS", "Revit", "MS Project", "Excel"],
    resources: [R.nptel, R.autodesk, R.swayam, R.asap],
    certs: [["Autodesk Certified User (AutoCAD/Revit)", "Paid"], ["NPTEL civil engineering courses", "Proctored exam"]],
    projects: ["Estimate for a two-storey house", "Site quality checklist", "Project schedule with critical path"],
    qs: "civil", jobs: "/jobs/?q=civil", live: null
  },
  {
    slug: "electrical-engineering", title: "Electrical & electronics", field: "nonit", cat: "engineering", icon: "bolt", tone: "cream", level: "Beginner → Intermediate", duration: "12–16 weeks",
    who: "EEE/ECE graduates and diploma holders for electrical, maintenance and automation roles.",
    summary: "Circuits, machines, wiring and protection, PLCs and safety.",
    modules: [
      ["Fundamentals", "3 weeks", ["Ohm’s and Kirchhoff’s laws", "AC/DC, power factor", "Three-phase systems", "Measuring instruments"]],
      ["Machines & power", "3 weeks", ["Transformers", "Motors and starters", "Generators", "Power distribution"]],
      ["Wiring & protection", "3 weeks", ["Domestic and industrial wiring", "MCB, RCCB, relays", "Earthing", "Load calculation"]],
      ["Automation & safety", "3 weeks", ["PLC ladder logic", "Sensors and drives", "Lockout/tagout", "Electrical safety rules"]]
    ],
    tools: ["Multimeter", "PLC software", "AutoCAD Electrical", "MATLAB/Simulink (basic)"],
    resources: [R.nptel, R.swayam, R.mitocw, R.asap],
    certs: [["State electrical licence (wireman/supervisor)", "Check the Kerala licensing board requirements"], ["NPTEL electrical engineering courses", "Proctored exam"]],
    projects: ["Wiring diagram and load calculation for a house", "PLC program for a traffic signal", "Power-factor improvement calculation"],
    qs: "electrical", jobs: "/jobs/?q=electrical", live: null
  },
  {
    slug: "hotel-hospitality", title: "Hotel & hospitality", field: "nonit", cat: "hospitality", icon: "bell", tone: "yellow", level: "Beginner", duration: "6–10 weeks",
    who: "Hotel management graduates and freshers for front office, F&B and guest relations.",
    summary: "Front office, F&B service, housekeeping standards, food safety and guest service.",
    modules: [
      ["Front office", "2 weeks", ["Reservations and check-in/out", "PMS basics", "Billing", "Handling overbooking"]],
      ["Food & beverage", "2 weeks", ["Service styles", "Menu knowledge", "Order taking", "Upselling"]],
      ["Housekeeping & safety", "2 weeks", ["Room standards", "Hygiene", "Food safety and FSSAI basics", "Fire and emergency"]],
      ["Guest service", "2 weeks", ["LAST complaint handling", "Communication", "Revenue terms: ADR, RevPAR", "Reviews management"]]
    ],
    tools: ["Hotel PMS (e.g. Opera basics)", "POS systems", "MS Office"],
    resources: [R.fostac, R.swayam, R.asap, R.duolingo],
    certs: [["FoSTaC food safety training (FSSAI)", "Recognised food-safety certificate"]],
    projects: ["Standard operating procedure for check-in", "Complaint-handling scripts", "Upselling plan for a restaurant"],
    qs: "hospitality", jobs: "/jobs/?q=hotel", live: null
  },
  {
    slug: "retail-operations", title: "Retail & store operations", field: "nonit", cat: "hospitality", icon: "cart", tone: "soft", level: "Beginner", duration: "4–6 weeks",
    who: "Freshers for retail sales, cashier, store supervisor and visual merchandising roles.",
    summary: "Customer service, selling, billing, inventory and store KPIs.",
    modules: [
      ["Customer service & selling", "2 weeks", ["Greeting and needs", "Upselling and cross-selling", "Handling returns", "Complaints"]],
      ["Store operations", "1 week", ["POS and billing", "Cash handling", "Opening/closing", "Safety"]],
      ["Inventory", "1 week", ["Stock counting", "FIFO/FEFO", "Shrinkage control", "Replenishment"]],
      ["Merchandising & KPIs", "1 week", ["Visual merchandising", "Footfall and conversion", "Average bill value", "Daily reports"]]
    ],
    tools: ["POS systems", "MS Excel", "Inventory apps"],
    resources: [R.swayam, R.asap, R.hubspot],
    certs: [["Retail sector skill courses (RASCI / Skill India)", "Free or low cost"]],
    projects: ["Store KPI tracker in Excel", "Display plan for a festival season", "Returns policy guide for staff"],
    qs: "retail", jobs: "/jobs/?q=retail", live: null
  },
  {
    slug: "logistics-supply-chain", title: "Logistics & supply chain", field: "nonit", cat: "logistics", icon: "truck", tone: "ink", level: "Beginner", duration: "6–10 weeks",
    who: "Graduates for warehouse, procurement, logistics coordinator and export roles.",
    summary: "Inventory, warehousing, transport, procurement, documentation and analytics.",
    modules: [
      ["Supply chain basics", "2 weeks", ["Plan–source–make–deliver", "Lead time and safety stock", "Demand planning", "KPIs"]],
      ["Warehousing", "2 weeks", ["Receiving, put-away, picking", "FIFO/FEFO", "WMS", "Cycle counts"]],
      ["Transport & trade", "2 weeks", ["Modes and costs", "E-way bills", "Incoterms: FOB, CIF", "Shipping documents"]],
      ["Procurement & data", "2 weeks", ["Vendor selection", "Purchase orders", "Excel for logistics", "Cost reduction"]]
    ],
    tools: ["MS Excel", "SAP/ERP basics", "WMS", "GST portal"],
    resources: [R.ascm, R.gst, R.swayam, R.nptel],
    certs: [["ASCM CSCP / CPIM", "Paid; for experienced professionals"]],
    projects: ["Inventory turnover analysis", "Route and cost comparison sheet", "Warehouse layout proposal"],
    qs: "logistics", jobs: "/jobs/?q=logistics", live: null
  },
  {
    slug: "nursing-healthcare", title: "Nursing & healthcare", field: "nonit", cat: "health", icon: "health", tone: "cream", level: "Intermediate", duration: "Ongoing",
    who: "Nurses and healthcare graduates preparing for hospital interviews and career growth.",
    summary: "Clinical basics, patient safety, communication, documentation and life-support certification.",
    modules: [
      ["Clinical fundamentals", "Review", ["Vital signs", "Medication rights", "Infection control and hand hygiene", "Triage"]],
      ["Patient safety", "Review", ["Incident reporting", "Fall prevention", "Handover with SBAR", "Consent"]],
      ["Life support", "1–2 days", ["BLS course", "ACLS for critical care", "Emergency protocols", "Code teams"]],
      ["Career growth", "Ongoing", ["Specialisation options", "Interview preparation", "Documentation quality", "Communication with families"]]
    ],
    tools: ["Hospital information systems", "Clinical documentation", "MS Office"],
    resources: [R.aha, R.swayam, R.nptel, R.khan],
    certs: [["BLS / ACLS (AHA-aligned providers)", "Often required by hospitals"]],
    projects: ["SBAR handover practice scripts", "Medication safety checklist", "Patient education leaflet"],
    qs: "nursing", jobs: "/jobs/?q=nurse", live: null
  },
  {
    slug: "teaching-training", title: "Teaching & training", field: "nonit", cat: "health", icon: "board", tone: "yellow", level: "Beginner", duration: "8–12 weeks",
    who: "Graduates and B.Ed holders aiming for school teacher, tutor and corporate trainer roles.",
    summary: "Lesson planning, classroom management, assessment, edtech and eligibility tests.",
    modules: [
      ["Pedagogy", "3 weeks", ["Learning objectives", "Bloom’s taxonomy", "Lesson planning", "Differentiation"]],
      ["Classroom management", "2 weeks", ["Routines and rules", "Engagement strategies", "Handling behaviour", "Parent communication"]],
      ["Assessment", "2 weeks", ["Formative vs summative", "Question design", "Feedback", "Rubrics"]],
      ["Edtech & eligibility", "3 weeks", ["Slides, quizzes, LMS", "Online teaching", "CTET/K-TET preparation", "Demo-class practice"]]
    ],
    tools: ["Google Classroom", "PowerPoint/Slides", "Quiz tools", "Zoom/Meet"],
    resources: [R.ctet, R.ktet, R.swayam, R.khan],
    certs: [["CTET / K-TET", "Eligibility tests for school teaching"], ["SWAYAM teacher-training courses", "Free"]],
    projects: ["Five lesson plans for one unit", "Recorded 10-minute demo class", "Formative quiz with answer key"],
    qs: "teaching", jobs: "/jobs/?q=teacher", live: null
  },
  {
    slug: "communication-soft-skills", title: "Communication & soft skills", field: "nonit", cat: "soft", icon: "chat", tone: "soft", level: "All levels", duration: "4–6 weeks",
    who: "Everyone — communication is tested in every interview round, IT or non-IT.",
    summary: "Spoken English, self-introduction, emails, presentations, teamwork and interview confidence.",
    modules: [
      ["Spoken English", "2 weeks", ["Daily speaking practice", "Pronunciation and pace", "Common interview phrases", "Listening"]],
      ["Interview communication", "1 week", ["Self-introduction", "STAR answers", "Body language", "Video-call etiquette"]],
      ["Writing", "1 week", ["Professional emails", "Chat etiquette", "Summaries", "Reports"]],
      ["Workplace skills", "1 week", ["Teamwork", "Time management", "Feedback", "Presentations"]]
    ],
    tools: ["Phone recorder", "Google Docs", "Slides"],
    resources: [R.duolingo, R.swayam, R.coursera, R.enitexa],
    certs: [["IELTS / Cambridge English", "Only if you need it for jobs or study abroad"]],
    projects: ["Record your 60-second introduction and improve it 3 times", "Five STAR stories written out", "3-minute presentation on your project"],
    qs: "hr-round", jobs: "/jobs/", live: null
  }
];

export const pathBySlug = Object.fromEntries(PATHS.map((p) => [p.slug, p]));
