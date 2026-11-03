import {
  ext,
  ul,
  ol,
  tip,
  warn,
  fact,
  both,
  h3,
  example,
  table,
  copy,
  cards,
  flow,
  toolCta,
} from "./helpers.mjs";

/* ---------- Chapter 01 platform data ---------- */

const PLATFORMS = [
  {
    name: "LinkedIn Jobs",
    url: "https://www.linkedin.com/jobs/",
    best: "Product companies, MNCs, startups, experienced roles",
    overview:
      "A professional network with a job board built in. Recruiters use it two ways: they post jobs, and they search member profiles to find people who never applied.",
    jobs: "Software, data, product, design, marketing, sales and leadership roles. Strong for 1+ years of experience; fewer walk-in or entry-level support roles.",
    account: [
      "Sign up at linkedin.com with an email you check daily (not a college ID you will lose).",
      "Confirm the email and phone number.",
      "Add your current city — Kochi, Thiruvananthapuram or Kozhikode — so local recruiters find you.",
    ],
    profile: [
      "Clear face photo and a headline that says what you do: <em>“Java Developer · Spring Boot · 2 yrs”</em> or <em>“B.Tech CSE 2026 · Python · SQL · Looking for fresher roles”</em>.",
      "About section: 3–5 lines on skills, domain and what you want next.",
      "Experience and Education with dates that match your resume exactly.",
      "Add relevant skills (LinkedIn lets you list many; pin your strongest).",
      "Turn on <strong>Open to Work</strong>. Choose “Recruiters only” if your current employer should not see it.",
    ],
    search: [
      "Search a role (“QA Engineer”) and a location (“Kochi, Kerala, India”).",
      "Filter <strong>Date posted → Past week</strong>, <strong>Experience level</strong> (Internship, Entry level, Associate, Mid-Senior) and On-site / Hybrid / Remote.",
      "Save searches you repeat.",
    ],
    apply: [
      "<strong>Easy Apply</strong> sends your LinkedIn profile + uploaded resume inside LinkedIn.",
      "<strong>Apply</strong> opens the company’s own careers site — finish the form there or nothing is sent.",
    ],
    alerts:
      "On a search results page, switch on <strong>Set alert</strong>. You get daily or weekly emails and app notifications.",
    pros: [
      "Recruiters contact you directly",
      "See who works at the company (referrals)",
      "Company pages, posts and employee count help research",
    ],
    cons: [
      "Easy Apply posts get hundreds of applicants",
      "Some jobs are reposts that are already filled",
      "Fake “recruiters” exist — verify before sharing documents",
    ],
    tips: [
      "Apply in the first 2–3 days a post is live.",
      "After applying, send one short note to the recruiter or hiring manager. Do not spam connections.",
      "Post about a project once a month — profiles with activity show up more.",
    ],
  },
  {
    name: "Naukri",
    url: "https://www.naukri.com/",
    best: "Indian IT services, BFSI, mid-level roles, recruiter search",
    overview:
      "India’s largest job portal. Besides job posts, recruiters search Naukri’s resume database (Resdex), so a complete, recently updated profile matters as much as applying.",
    jobs: "IT services, banking, insurance, sales, accounts, support and mid-level tech roles across India. Many Infopark and Technopark service companies recruit here.",
    account: [
      "Register at naukri.com and choose <strong>Fresher</strong> or <strong>Experienced</strong> — this changes the form.",
      "Verify email and mobile.",
      "Upload your resume as PDF or DOCX.",
    ],
    profile: [
      "Resume headline (one line): <em>“Manual & automation tester · Selenium, Java · 3 yrs · Kochi”</em>.",
      "Key skills: add the exact tools from job posts you target.",
      "Fill employment, education, projects, current & expected CTC, notice period and preferred locations.",
      "Profile summary in 3–4 lines.",
      "Edit something small every week — recruiters often filter by recently active profiles.",
    ],
    search: [
      "Search skills or titles plus location and years of experience.",
      "Use filters: Freshness, Salary, Work mode, Industry, Company type.",
      "Read the “Job description” and “Role” sections fully; many posts list more years than they truly need.",
    ],
    apply: [
      "<strong>Apply</strong> sends your Naukri profile to the employer.",
      "<strong>Apply on company site</strong> takes you away — complete that form.",
    ],
    alerts:
      "Click <strong>Create job alert</strong> on search results, or set preferences in your profile for recommended jobs.",
    pros: [
      "Huge volume of Indian openings",
      "Recruiters find you without you applying",
      "Clear CTC and notice-period fields",
    ],
    cons: [
      "Paid add-ons are promoted; none are required to get a job",
      "Fake callers pretend to be “Naukri” and ask for fees",
      "Many duplicate agency posts",
    ],
    tips: [
      "Naukri never needs you to pay a recruiter. Anyone asking for a “registration fee” is a scam.",
      "Keep the profile CTC and notice period honest — they are checked later.",
      "Write the headline the way recruiters search: role + main tool + years + city.",
    ],
  },
  {
    name: "Indeed",
    url: "https://in.indeed.com/",
    best: "Non-IT, support, sales, accounts, walk-ins, small companies",
    overview:
      "A search engine for jobs. It shows jobs posted directly on Indeed and jobs collected from company sites and other boards.",
    jobs: "Customer support, BPO, sales, accounting, admin, hospital and retail roles, plus some IT jobs from smaller companies.",
    account: [
      "Sign in with email or Google.",
      "Upload a resume or create an Indeed resume.",
      "Choose whether employers can find your resume.",
    ],
    profile: [
      "Job title you want, desired pay and locations.",
      "Work experience, education and skills.",
      "Answer the “ready to work” preferences honestly.",
    ],
    search: [
      "Type <strong>What</strong> (role) and <strong>Where</strong> (city).",
      "Filter by Date posted, Remote, Salary estimate and Job type.",
      "Open the company name to read reviews before applying.",
    ],
    apply: [
      "<strong>Easily apply</strong> sends your Indeed resume and screener answers.",
      "Other posts redirect to the employer’s site.",
    ],
    alerts:
      "Below search results, add your email to <strong>get new jobs for this search by email</strong>.",
    pros: [
      "Simple, quick applications",
      "Good for non-IT and entry roles",
      "Company reviews and salary ranges",
    ],
    cons: [
      "Older listings sometimes stay visible",
      "Scam posts appear — verify the employer",
      "Less recruiter outreach than LinkedIn or Naukri",
    ],
    tips: [
      "Answer screener questions carefully; they filter you before a human reads anything.",
      "Check the post date and the employer’s website before you apply.",
    ],
  },
  {
    name: "Foundit (formerly Monster India)",
    url: "https://www.foundit.in/",
    best: "Experienced professionals, BFSI, sales, operations",
    overview:
      "Monster India rebranded as foundit. It works like Naukri: post-based applications plus a resume database recruiters search.",
    jobs: "Experienced roles in IT, banking, sales, operations and Gulf/overseas openings.",
    account: [
      "Register with email and phone.",
      "Upload your resume and pick your industry and function.",
    ],
    profile: [
      "Headline, key skills, experience, CTC, notice period, locations.",
      "Keep it consistent with your Naukri and LinkedIn data.",
    ],
    search: [
      "Search by skill or title, filter by experience, location and salary.",
    ],
    apply: [
      "Apply with your profile, or go to the employer’s site when redirected.",
    ],
    alerts: "Save a search or set job alerts from your dashboard.",
    pros: [
      "Less crowded than the biggest portals",
      "Useful extra reach for experienced candidates",
    ],
    cons: [
      "Smaller fresher volume",
      "Profile data can go stale if you forget it",
    ],
    tips: [
      "Create it once, then update every few weeks while you are searching.",
    ],
  },
  {
    name: "Internshala",
    url: "https://internshala.com/",
    best: "Students, internships, first jobs",
    overview:
      "A platform focused on internships and fresher jobs, with short application questions instead of long forms.",
    jobs: "Internships (remote and in-office), fresher roles in development, marketing, content, design, HR and sales.",
    account: [
      "Register as a student/fresher.",
      "Fill education, skills, projects and links (GitHub, portfolio).",
    ],
    profile: [
      "Add projects with links.",
      "Write a short, specific “Why should you be hired?” answer you can adapt.",
    ],
    search: [
      "Filter by profile, location, work-from-home, stipend and duration.",
    ],
    apply: [
      "Answer the employer’s questions; some include a small assignment.",
    ],
    alerts:
      "Turn on preferences and email notifications for matching internships.",
    pros: [
      "Built for people with no experience",
      "Assignments let you prove skill",
    ],
    cons: [
      "Some internships are unpaid or very low stipend",
      "Paid trainings are promoted — optional, not a hiring requirement",
    ],
    tips: [
      "Never pay an employer to join an internship.",
      "A completed internship with a reference beats three certificates.",
    ],
  },
  {
    name: "Google job search",
    url: "https://www.google.com/search?q=jobs+in+kochi",
    best: "Finding the same job across many boards at once",
    overview:
      "Search “jobs in Kochi” or “react developer jobs Trivandrum” and Google often shows a jobs panel pulled from many sites. Google does not hire — it links to the source.",
    jobs: "Whatever the source sites publish: portals, company pages and aggregators.",
    account: [
      "No separate account needed; signing in to Google may save searches.",
    ],
    profile: ["None — your profile lives on the site you apply through."],
    search: [
      "Use role + city, then filters like Date posted and Type.",
      "Open “Apply on” options and prefer the company’s own site.",
    ],
    apply: ["Click through to the source and apply there."],
    alerts:
      "Availability changes; rely on the alerts of the portal you finally use.",
    pros: [
      "One search covers many sites",
      "Shows which boards carry the same job",
    ],
    cons: [
      "Can surface outdated or copied listings",
      "You still apply elsewhere",
    ],
    tips: [
      "When the same job shows on many sites, apply on the employer’s own page if it exists.",
    ],
  },
  {
    name: "Official company career pages",
    url: "https://www.google.com/search?q=company+name+careers",
    best: "Most accurate source; jobs that never reach portals",
    overview:
      "Most mid-size and large companies run their own careers page or an ATS portal (Workday, Greenhouse, Lever, Zoho Recruit, Darwinbox and others).",
    jobs: "Every role the company chooses to publish — including ones not posted on portals.",
    account: [
      "Many portals ask you to create a candidate account per company.",
      "Save your password; you will check application status there.",
    ],
    profile: [
      "Upload resume; the portal auto-fills fields — always correct what it parsed wrong.",
    ],
    search: [
      "Search “Company name careers” and confirm the domain matches the company’s main website.",
      "Mass-hiring examples: TCS NextStep, Infosys Careers, Wipro Careers.",
    ],
    apply: [
      "Fill every field, answer knock-out questions honestly, submit and save the confirmation email.",
    ],
    alerts: "Many portals have “Job alerts” or “Talent community” sign-ups.",
    pros: [
      "Official and current",
      "Your application goes straight into the employer’s ATS",
    ],
    cons: ["A new account for each company", "Long forms"],
    tips: [
      "Bookmark career pages of your 20 target companies and check them weekly.",
    ],
  },
  {
    name: "Official IT park job boards",
    url: "https://infopark.in/companies-job",
    best: "Companies inside Infopark, Technopark and Cyberpark",
    overview:
      "Kerala’s IT parks publish openings from companies on their campuses.",
    jobs: "Openings posted by tenant companies — usually with email or careers-page instructions.",
    account: ["No account needed; apply as each post instructs."],
    profile: ["Keep one ATS-friendly PDF ready."],
    search: [
      `${ext("https://infopark.in/companies-job", "Infopark Kochi")} · ${ext("https://technopark.in/job-search", "Technopark Trivandrum")} · ${ext(
        "https://cyberparks.in/careers/",
        "Cyberpark Kozhikode",
      )} · ${ext("https://www.ulcyberpark.com/jobs", "UL CyberPark")}`,
    ],
    apply: [
      "Follow the exact method on the post: email address, form link or company site.",
    ],
    alerts:
      "No alerts — this is why InfoparkDaily collects park openings in one feed.",
    pros: ["Official source for park tenants", "Local jobs"],
    cons: [
      "Not every park company posts there",
      "Old posts can stay visible after hiring closes",
    ],
    tips: ["Read the last date before travelling for any walk-in."],
  },
  {
    name: "Government recruitment portals",
    url: "https://www.ncs.gov.in/",
    best: "Public-sector, PSC and central government jobs",
    overview:
      "Government jobs follow notifications, exams and rank lists — a separate track from private IT hiring.",
    jobs: "State and central government posts, PSUs, and some government IT/technical positions.",
    account: [
      `Kerala PSC uses One Time Registration on ${ext("https://thulasi.psc.kerala.gov.in/", "Thulasi")}.`,
      `${ext("https://www.ncs.gov.in/", "National Career Service")} and ${ext("https://eemployment.kerala.gov.in/", "Kerala Employment Exchange")} have their own registration.`,
    ],
    profile: [
      "Enter details exactly as in certificates — mismatches can disqualify you.",
    ],
    search: [
      `${ext("https://www.keralapsc.gov.in/", "Kerala PSC notifications")} · ${ext("https://upsc.gov.in/", "UPSC")} · ${ext("https://ssc.gov.in/", "SSC")}`,
    ],
    apply: [
      "Apply only on the official portal before the closing date in the notification.",
    ],
    alerts: "Check notification pages; follow official channels only.",
    pros: ["Transparent, rule-based selection", "Job security"],
    cons: ["Long timelines (months to years)", "Exam preparation needed"],
    tips: [
      "Government jobs never require payment to an agent. Fees are paid only on the official portal when a notification says so.",
    ],
  },
];

const platformCard = (p) => `
<details class="ij-platform">
  <summary>
    <span class="ij-platform-name">${p.name}</span>
    <span class="ij-platform-best">${p.best}</span>
  </summary>
  <div class="ij-platform-body">
    <p>${p.overview}</p>
    <dl class="ij-platform-grid">
      <div><dt>Jobs you usually find</dt><dd>${p.jobs}</dd></div>
      <div><dt>Create an account</dt><dd>${ol(p.account, "ij-mini-steps")}</dd></div>
      <div><dt>Complete your profile</dt><dd>${ul(p.profile)}</dd></div>
      <div><dt>Search for vacancies</dt><dd>${ul(p.search)}</dd></div>
      <div><dt>How to apply</dt><dd>${ul(p.apply)}</dd></div>
      <div><dt>Job alerts</dt><dd><p>${p.alerts}</p></dd></div>
      <div><dt>Advantages</dt><dd>${ul(p.pros, "ij-pros")}</dd></div>
      <div><dt>Limitations</dt><dd>${ul(p.cons, "ij-cons")}</dd></div>
      <div class="ij-platform-wide"><dt>Practical tips</dt><dd>${ul(p.tips)}</dd></div>
    </dl>
    <p class="ij-platform-link">${ext(p.url, `Open ${p.name.split(" (")[0]} ↗`)}</p>
  </div>
</details>`;

export const chaptersA = [
  {
    id: "job-discovery",
    num: 1,
    phase: "Prepare",
    title: "Job discovery",
    summary:
      "Start on InfoparkDaily, then widen your search to portals, company pages and park boards.",
    time: 14,
    candidate: [
      "Check InfoparkDaily daily and join the WhatsApp/Instagram alerts",
      "Shortlist 5–10 relevant openings a week",
      "Track every application",
    ],
    company: [
      "Publishes the vacancy on its careers page, portals, LinkedIn or by email",
      "May only share it with agencies or through employee referrals",
    ],
    tools: [
      ["Browse InfoparkDaily jobs", "/jobs/"],
      ["Join job alerts", "/join/"],
    ],
    body: `
<section class="ij-hub" aria-labelledby="ij-hub-title">
  <div class="ij-hub-copy">
    <p class="ij-kicker">Start here · Primary job hub</p>
    <h3 id="ij-hub-title">InfoparkDaily: Kerala tech jobs in one place</h3>
    <p>Openings are scattered across portals, company sites, park boards, WhatsApp forwards and HR posts. InfoparkDaily gathers public openings from these sources into one community-focused feed, so you start with a shortlist instead of twenty tabs. It is a starting point, not every job in the market — so this chapter also shows where else to look.</p>
    <div class="ij-hub-actions">
      <a class="ij-btn" href="/jobs/">Browse latest jobs</a>
      <a class="ij-btn ij-btn--ghost" href="/join/">Join job alerts</a>
    </div>
  </div>
  <ul class="ij-hub-links">
    <li><a href="/jobs/?type=fresher"><strong>Fresher openings</strong><span>Entry-level and 0–1 year roles</span></a></li>
    <li><a href="/jobs/?type=experienced"><strong>Experienced openings</strong><span>Roles for 1+ years</span></a></li>
    <li><a href="/jobs/?type=walkin"><strong>Walk-in interviews</strong><span>Date, venue and documents</span></a></li>
    <li><a href="/jobs/?type=nonit"><strong>Non-IT jobs</strong><span>Accounts, HR, support, sales</span></a></li>
    <li><a href="/jobs/?type=internship"><strong>Internships</strong><span>For students and freshers</span></a></li>
    <li><a href="/infopark-jobs/"><strong>Infopark Kochi</strong><span>Park vacancies</span></a></li>
    <li><a href="/technopark-jobs/"><strong>Technopark</strong><span>Trivandrum vacancies</span></a></li>
    <li><a href="/cyberpark-jobs/"><strong>Cyberpark</strong><span>Kozhikode vacancies</span></a></li>
    <li><a href="/jobs/today/"><strong>Posted today</strong><span>The newest listings</span></a></li>
    <li><a href="/jobs/?type=masshiring"><strong>Hiring announcements</strong><span>Mass hiring drives</span></a></li>
  </ul>
  <div class="ij-hub-social">
    ${ext("https://whatsapp.com/channel/0029VbDJFfA4Y9lm5L4kpm22", "<strong>WhatsApp channel</strong><span>Daily job alerts</span>")}
    ${ext("https://www.instagram.com/infoparkdaily.jobs/", "<strong>@infoparkdaily.jobs</strong><span>Job posts on Instagram</span>")}
    ${ext("https://www.instagram.com/infoparkdaily/", "<strong>@infoparkdaily</strong><span>Community, reels and hiring news</span>")}
  </div>
</section>

${h3("How to use the InfoparkDaily job board")}
${ol([
  'Open <a href="/jobs/">Jobs</a> and choose a park (Infopark, Technopark, Cyberpark) or leave All Parks.',
  "Tap a filter chip: <strong>Freshers</strong>, <strong>Experienced</strong>, <strong>Walk-in Interview</strong>, <strong>Non IT</strong>, <strong>Internships</strong>, <strong>Remote</strong> or <strong>Referral</strong>.",
  "Type a role or skill in the search box (“tester”, “React”, “accountant”).",
  "Read the status on each card: <strong>Live</strong>, <strong>Closing</strong> or <strong>Expired</strong>. Skip expired posts.",
  "Open <strong>View Details</strong> to see roles, experience, location, deadline and the apply method.",
  'Tap the heart to save jobs you want to apply for; they stay in <a href="/jobs/saved/">Saved jobs</a>.',
  "Use <strong>Share</strong> to send an opening to a friend on WhatsApp or Instagram.",
  "Before applying, open the official link on the listing and confirm the job is still open.",
])}
${tip("Five minutes every morning on the InfoparkDaily feed beats an hour once a week. Early applicants are more likely to be read before a recruiter has enough candidates.")}

${h3("How to identify a relevant vacancy")}
<p>Use this 30-second filter before you spend time on an application:</p>
${table(
  ["Check", "Apply if…", "Skip or think again if…"],
  [
    [
      "Experience",
      "You meet it or are within about a year of it",
      "It asks for 5 years and you have none",
    ],
    [
      "Must-have skills",
      "You have most of the must-haves",
      "You have none of the core skills",
    ],
    [
      "Location / mode",
      "You can work there or the post allows remote",
      "Relocation you can’t do",
    ],
    [
      "Deadline",
      "Date is in the future or “rolling”",
      "Deadline passed / post marked Expired",
    ],
    [
      "Source",
      "Company site, park board or a named HR contact",
      "Asks for money, OTP, or uses only a personal Gmail with no company trail",
    ],
  ],
  "Vacancy relevance check",
)}

${both(
  `${h3("Finding fresher jobs")}${ul([
    "On InfoparkDaily, use the <strong>Freshers</strong> and <strong>Internships</strong> filters, and watch <strong>Mass Hiring</strong> drives.",
    "Search portals for “trainee”, “associate”, “graduate engineer trainee”, “junior”, “intern”, “0–1 years”.",
    "Large IT services companies run fresher programmes on their own portals (for example TCS NextStep, Infosys Careers, Wipro Careers).",
    "Walk-in drives at Infopark and Technopark often hire support, testing and non-voice process freshers.",
    "Your college placement cell and alumni are channels too — ask seniors which companies hired them.",
  ])}`,
  `${h3("Finding experienced roles")}${ul([
    "On InfoparkDaily, use <strong>Experienced</strong> and <strong>Referral</strong> filters.",
    "Search by title + main tool (“Senior QA Selenium Kochi”) rather than only the title.",
    "Keep Naukri and LinkedIn profiles updated — many experienced hires start with a recruiter messaging you.",
    "Ask ex-colleagues in target companies for referrals before applying cold.",
    "Follow target companies on LinkedIn; many announce openings in posts before portals.",
  ])}`,
)}

${h3("Walk-in interviews")}
${ul([
  'Use the <a href="/jobs/?type=walkin">Walk-in</a> filter on InfoparkDaily. Each listing shows date, time, venue and roles.',
  "Confirm the venue and date on the official notice the same morning — walk-ins get rescheduled.",
  "Carry printed resumes, ID proof, photos and certificate copies (originals only if asked).",
  "Arrive 30–45 minutes early; registrations often close before the posted end time.",
])}
<p>More detail: <a href="/guides/walk-in-interview-tips-infopark/">Walk-in interview tips for Infopark</a>.</p>

${h3("Why one site is never enough")}
${fact(
  "Jobs are distributed across many places. Some employers publish only on their own careers site, some only on LinkedIn, some only through a recruitment agency, and some just email a park list or share a WhatsApp post. Using InfoparkDaily as your daily hub and checking a few other sources weekly gives you the widest view of the market.",
)}
${flow(["Daily: InfoparkDaily feed + alerts", "2–3× a week: LinkedIn / Naukri / Indeed alerts", "Weekly: target company career pages", "Weekly: park job boards", "Always: referrals from your network"], "Recommended job search routine")}

${h3("Other platforms — what each is for")}
<p>Open a platform to see what jobs it has, how to set it up, how to search and apply, alerts, pros and cons, and practical tips.</p>
<div class="ij-platforms">${PLATFORMS.map(platformCard).join("")}</div>

${h3("Platform comparison")}
${table(
  ["Platform", "Best for", "Fresher-friendly", "Recruiters find you", "Alerts"],
  [
    [
      "<strong>InfoparkDaily</strong>",
      "Kerala IT park & community openings in one feed",
      "Yes — dedicated filters",
      "Through community reach and employer posts",
      "WhatsApp, Instagram",
    ],
    [
      "LinkedIn",
      "Product companies, experienced roles, networking",
      "Moderate",
      "Yes — profile search",
      "Email/app",
    ],
    [
      "Naukri",
      "Indian IT services, BFSI, mid-level",
      "Yes (fresher profile)",
      "Yes — resume database",
      "Email/app",
    ],
    ["Indeed", "Non-IT, support, smaller firms", "Yes", "Partly", "Email"],
    ["foundit", "Experienced, BFSI, sales", "Limited", "Yes", "Email"],
    [
      "Internshala",
      "Internships, first jobs",
      "Built for it",
      "Limited",
      "Email",
    ],
    [
      "Company pages",
      "Accurate, official openings",
      "Depends on company",
      "Talent community",
      "Often",
    ],
    ["Park boards", "Park tenant companies", "Yes", "No", "No"],
  ],
  "Job platform comparison",
)}
${warn('Real employers do not charge for applications, interviews, training kits or offer letters. Never share OTPs, bank PINs or Aadhaar scans with an unverified “recruiter”. Read <a href="/guides/verify-jobs-before-you-apply/">how to verify a job before you apply</a>.')}
`,
  },

  {
    id: "job-research",
    num: 2,
    phase: "Prepare",
    title: "Job research & reading the JD",
    summary:
      "Decode every line of a job description and research the company before you apply.",
    time: 12,
    candidate: [
      "Read the JD line by line",
      "Research the company, role and salary range",
      "Decide: apply, stretch-apply or skip",
    ],
    company: [
      "Hiring manager writes the requirement",
      "HR turns it into a JD with must-haves and nice-to-haves",
    ],
    tools: [["Check a JD against your resume", "/ats-checker/"]],
    body: `
<p>A job description (JD) is the company’s shopping list. Reading it carefully tells you whether to apply, which keywords to use in your resume, and what you will be asked in interviews.</p>

${h3("Every part of a job posting")}
${table(
  ["Part", "What it tells you", "What to do with it"],
  [
    [
      "Job title",
      "Level and function (Trainee, Associate, Senior, Lead)",
      "Use the same title in your email subject and resume headline if it honestly fits",
    ],
    [
      "Company name",
      "Who is hiring — or an agency hiring for a client",
      "Look up the website, LinkedIn page and reviews",
    ],
    [
      "Location",
      "Office city/park and whether relocation is needed",
      "Only apply if you can commute or relocate",
    ],
    [
      "Experience",
      "A range, e.g. 0–2 or 3–5 years",
      "Within about a year of the minimum is usually fine to try",
    ],
    [
      "Qualification",
      "Degree/stream required, sometimes year of passing",
      "Treat “B.Tech/MCA only” and batch limits as hard rules",
    ],
    [
      "Required skills",
      "Must-haves the screen will check",
      "Mirror these exact words in your resume — only if true",
    ],
    [
      "Preferred skills",
      "Nice-to-haves",
      "Mention any you have; don’t skip the job if you lack them",
    ],
    [
      "Salary",
      "Range or “as per industry standards”",
      "Prepare your expected CTC; research the range",
    ],
    [
      "Shift timings",
      "Day, night, rotational, US/UK shift",
      "Be sure you can do it before applying",
    ],
    ["Work mode", "On-site, hybrid or remote", "Note days in office"],
    [
      "Responsibilities",
      "What you’ll actually do",
      "Prepare a project or example for each",
    ],
    [
      "Application instructions",
      "Email, form, portal, walk-in",
      "Follow exactly; wrong channel = not seen",
    ],
    [
      "Last date",
      "Deadline or “rolling”",
      "Apply well before; don’t travel for an expired walk-in",
    ],
  ],
  "Parts of a job description",
)}

${h3("Example JD explained line by line")}
<div class="ij-jd">
  <div class="ij-jd-post" aria-label="Sample job description">
    <p class="ij-jd-line" data-n="1"><strong>Junior QA Engineer</strong> — Brightloop Technologies Pvt Ltd</p>
    <p class="ij-jd-line" data-n="2">Infopark Phase II, Kochi · Work from office, 5 days</p>
    <p class="ij-jd-line" data-n="3">Experience: 0–2 years · B.Tech / BCA / MCA / B.Sc CS (2024–2026 pass-outs)</p>
    <p class="ij-jd-line" data-n="4">Must have: manual testing, writing test cases, bug reporting in Jira, basic SQL</p>
    <p class="ij-jd-line" data-n="5">Good to have: Selenium with Java or Python, Postman API testing, ISTQB Foundation</p>
    <p class="ij-jd-line" data-n="6">Responsibilities: test web and mobile releases, log and retest defects, join daily stand-ups</p>
    <p class="ij-jd-line" data-n="7">Shift: 9:30 am – 6:30 pm · CTC: ₹2.8–3.6 LPA</p>
    <p class="ij-jd-line" data-n="8">Apply: send resume to careers@brightloop.example with subject “QA Fresher – Your Name” before 20 Nov</p>
  </div>
  <ol class="ij-jd-notes">
    <li><strong>Title:</strong> “Junior” = entry level. You will be asked testing basics, not architecture.</li>
    <li><strong>Location & mode:</strong> daily commute to Kakkanad. Ask yourself if that works before applying.</li>
    <li><strong>Eligibility:</strong> batch 2024–2026 is a hard filter. A 2021 graduate will likely be screened out automatically.</li>
    <li><strong>Must-haves:</strong> these four words — <em>manual testing, test cases, Jira, SQL</em> — should appear in your resume skills and project lines.</li>
    <li><strong>Good to have:</strong> a small Selenium or Postman project puts you ahead of other freshers.</li>
    <li><strong>Responsibilities:</strong> prepare to explain the bug life cycle and how you would write a test case for a login page.</li>
    <li><strong>CTC:</strong> ₹2.8–3.6 LPA is yearly cost-to-company, not monthly take-home (see Chapter 13). That is ₹23,300–30,000 a month as CTC; in-hand pay is lower after PF and other deductions.</li>
    <li><strong>Instructions:</strong> use that exact subject line. Applications that ignore instructions are an easy reject.</li>
  </ol>
</div>
<p class="ij-small">Sample company and email are fictional, for learning only.</p>

${h3("Research the company in 15 minutes")}
${ol([
  "<strong>Website:</strong> what the company sells, who its clients are, which countries it serves.",
  "<strong>LinkedIn page:</strong> employee count, recent posts, people in the role you want.",
  "<strong>Reviews:</strong> Glassdoor or AmbitionBox for interview questions and culture — read patterns, not single angry reviews.",
  "<strong>Legitimacy:</strong> does the email domain match the website? Is there a real office address? Is the company listed on the park’s site?",
  "<strong>News:</strong> recent funding, layoffs, new clients or awards.",
  '<strong>Salary:</strong> compare ranges on AmbitionBox, Glassdoor and the <a href="/guides/kerala-it-salary-guide/">Kerala IT salary guide</a>.',
])}
${example(
  "Notes a strong candidate writes before applying",
  ul([
    "Brightloop — 120 people, SaaS for logistics, clients in UAE and UK.",
    "Testers use Jira + Selenium (from employee profiles).",
    "Interview pattern (reviews): written test → technical → HR.",
    "Talking point: my college project tested a delivery-tracking app — same domain.",
  ]),
)}

${h3("Apply, stretch, or skip?")}
${table(
  ["You match…", "Decision", "Why"],
  [
    ["80–100% of must-haves", "Apply now", "You are a strong fit"],
    [
      "60–80% and you can learn the rest quickly",
      "Stretch-apply",
      "Many hires don’t tick every box; show the gap is small",
    ],
    [
      "Under half the must-haves, or fail a hard rule (batch, degree, shift)",
      "Skip",
      "Spend the time on better-matched roles",
    ],
  ],
  "Apply decision",
)}
`,
  },

  {
    id: "application-strategy",
    num: 3,
    phase: "Prepare",
    title: "Application strategy",
    summary:
      "Pick the right channel — email, portal, Easy Apply, referral, agency or walk-in — for each job.",
    time: 10,
    candidate: [
      "Use the channel the listing asks for",
      "Prefer referrals and company portals",
      "Log every application in a tracker",
    ],
    company: ["Receives applications from many channels into one ATS or inbox"],
    tools: [["Email examples", "/resume-builder/email-examples/"]],
    body: `
<p>The same resume can succeed or vanish depending on how you send it. Use the method the job post asks for; when several are possible, choose the one that reaches a human fastest.</p>
${table(
  ["Method", "When to use", "How to do it well", "Watch out"],
  [
    [
      "Referral",
      "You know someone in the company (even a senior from college)",
      "Send them the job link/ID, your resume and a 3-line summary so they can submit easily",
      "A referral gets you read, not hired — still prepare",
    ],
    [
      "Company career portal",
      "The company has an official portal or the listing links to it",
      "Fill every field, correct auto-parsed data, save confirmation email",
      "Duplicate accounts with different emails confuse the ATS",
    ],
    [
      "Direct email",
      "Listing gives an HR email (common at park companies and walk-ins)",
      "Exact subject from the post, short body, one PDF",
      "Check the domain; personal Gmail-only “HR” deserves verification",
    ],
    [
      "LinkedIn Easy Apply",
      "Quick roles you match well",
      "Complete profile + tailored resume upload; message the poster after",
      "Very high competition; low effort = low response",
    ],
    [
      "Naukri apply",
      "Indian IT services, mid-level roles",
      "Keep profile complete; answer screening questions",
      "Agency posts may hide the real company",
    ],
    [
      "Indeed apply",
      "Non-IT, support, smaller firms",
      "Answer screener questions carefully",
      "Verify the employer",
    ],
    [
      "Recruitment agency / consultant",
      "Agency calls you or posts a role",
      "Ask the client company name, role, CTC and location before sharing documents",
      "Genuine agencies are paid by employers — never pay them",
    ],
    [
      "Walk-in interview",
      "Listing gives date, time and venue",
      "Go early with printed resumes and documents",
      "Confirm the drive is still on the same morning",
    ],
    [
      "InfoparkDaily listing",
      "You find the job on InfoparkDaily",
      "Open the listing’s official link or email and apply there",
      "InfoparkDaily is not the employer — apply through the method on the listing",
    ],
  ],
  "Application methods",
)}

${h3("Choosing a channel — decision path")}
<div class="ij-decide">
  <div class="ij-decide-q">Do you know someone at the company?</div>
  <div class="ij-decide-branches">
    <div><span class="ij-yes">Yes</span><p>Ask for a referral <em>and</em> apply on the portal with the same email.</p></div>
    <div><span class="ij-no">No</span><p>Does the post name a channel? Use exactly that. If it lists both email and portal, use the portal, then send a short email.</p></div>
  </div>
</div>

${both(
  `${h3("Fresher strategy")}${ul([
    "Aim for 5–10 well-matched applications a week instead of 100 random ones.",
    "Target: trainee programmes, park walk-ins, internships that convert to jobs, and mass-hiring drives.",
    "Ask college alumni on LinkedIn for referrals — be specific about the role.",
    "Create a simple portfolio or GitHub with 2–3 projects; link it everywhere.",
  ])}`,
  `${h3("Job-switch strategy")}${ul([
    "Make a list of 20–30 target companies and the roles that fit your next step.",
    "Referrals first, then recruiters, then cold applications.",
    "Apply 2–3 months before you want to move, because notice periods are often 30–90 days.",
    "Keep searching discreet: “Open to Work — recruiters only”, no posts about leaving.",
    "Don’t resign before you have a written offer (and ideally completed background checks).",
  ])}`,
)}

${h3("Track every application")}
<p>Keep a simple sheet. It prevents duplicate applications and tells you when to follow up.</p>
${table(
  ["Date", "Company", "Role", "Channel", "Contact", "Status", "Next step"],
  [
    [
      "04 Nov",
      "Brightloop",
      "Junior QA",
      "Email",
      "careers@…",
      "Applied",
      "Follow up 11 Nov",
    ],
    [
      "05 Nov",
      "Northwind Labs",
      "Python Intern",
      "Internshala",
      "—",
      "Assignment sent",
      "Wait for result",
    ],
    [
      "06 Nov",
      "Acme Infotech",
      "Support Exec",
      "Walk-in",
      "HR desk",
      "Round 2 on 9 Nov",
      "Prepare",
    ],
  ],
  "Sample application tracker",
)}
<p class="ij-small">Save jobs on InfoparkDaily with the heart icon and you’ll find them again in <a href="/jobs/saved/">Saved jobs</a>.</p>
`,
  },

  {
    id: "resume-creation",
    num: 4,
    phase: "Prepare",
    title: "Resume creation",
    summary:
      "Build a clean, honest, ATS-friendly resume — different for freshers and experienced professionals.",
    time: 15,
    candidate: [
      "Choose a simple one-column template",
      "Write achievement-focused bullets",
      "Export a text PDF named properly",
    ],
    company: [
      "Recruiters skim a resume for 6–30 seconds in the first pass",
      "ATS parses it into fields",
    ],
    tools: [
      ["Build your resume", "/resume-builder/templates/"],
      ["Resume templates", "/resume-builder/templates/"],
    ],
    body: `
${toolCta(
  "Build your resume with InfoparkDaily",
  "Free ATS-friendly templates, live A4 preview and a selectable-text PDF with no watermark.",
  "/resume-builder/templates/",
  "Build your resume",
  ["/resume-builder/", "About the builder"],
)}

${h3("Standard resume structure")}
${table(
  ["Section", "Fresher", "Experienced"],
  [
    [
      "Header",
      "Name, phone, email, city, LinkedIn/GitHub",
      "Same — drop full address, date of birth and photo unless asked",
    ],
    [
      "Summary",
      "2 lines: degree, key skills, target role",
      "3 lines: years, domain, strongest results",
    ],
    [
      "Skills",
      "Grouped: Languages · Tools · Databases",
      "Grouped and matched to the JD",
    ],
    [
      "Experience",
      "Internships, freelance, part-time",
      "Most important section — reverse chronological",
    ],
    [
      "Projects",
      "Main proof of skill — put above education",
      "Only notable ones, or inside each job",
    ],
    ["Education", "Degree, college, year, CGPA if good", "One line at the end"],
    ["Certifications", "Relevant ones only", "Relevant ones only"],
    [
      "Achievements",
      "Hackathons, ranks, leadership",
      "Awards, promotions, measurable impact",
    ],
  ],
  "Resume structure",
)}

${both(
  `${h3("Resume without experience")}
${ul([
  "Lead with <strong>Projects</strong>: what you built, the tools, and your role.",
  "Internships count as experience — list them under Experience.",
  "Add numbers wherever possible: users, pages, test cases, accuracy, marks.",
  "One page is enough.",
])}
${example(
  "Weak vs strong fresher project bullet",
  `<p class="ij-bad">✗ Did a project on library management using PHP.</p>
   <p class="ij-good">✓ Built a library management web app (PHP, MySQL) with login, book search and fine calculation; tested 40 cases and deployed on a college server used by 200 students.</p>`,
)}
${copy(
  "Fresher summary example",
  "B.Tech Computer Science graduate (2026) with hands-on projects in Python, SQL and Django. Built and tested a student attendance system used by 3 departments. Looking for a junior developer or QA role in Kochi.",
  "Edit the degree, tools and project to match you",
)}`,
  `${h3("Resume with employment history")}
${ul([
  "Each job: title, company, city, month-year to month-year.",
  "3–6 bullets per recent role. Start with a verb, end with a result.",
  "Show impact with numbers: time saved, revenue, bugs reduced, users, uptime.",
  "Two pages is fine for 5+ years. Older roles can be one line each.",
  "Dates and titles must match your relieving letters — background checks compare them.",
])}
${example(
  "Duty vs achievement",
  `<p class="ij-bad">✗ Responsible for API development.</p>
   <p class="ij-good">✓ Built 14 REST APIs in Spring Boot for a payments module, cutting average response time from 900 ms to 250 ms.</p>
   <p class="ij-bad">✗ Handled testing.</p>
   <p class="ij-good">✓ Automated 320 regression cases with Selenium + TestNG, reducing release testing from 3 days to 6 hours.</p>`,
)}
${copy(
  "Experienced summary example",
  "QA engineer with 4 years in fintech and e-commerce testing. Automated 300+ regression cases with Selenium and Java, set up API test suites in Postman and cut release testing time by 70%. Looking for a Senior QA role in Kochi or remote.",
  "Replace years, domain and numbers with your own",
)}`,
)}

${h3("Skills, projects, experience — writing formula")}
${cards([
  [
    "Skills",
    `<p>Group them: <code>Languages: Java, Python · Testing: Selenium, Postman · Tools: Jira, Git · DB: MySQL</code>. Only list what you can answer questions on.</p>`,
  ],
  [
    "Project bullet",
    `<p><strong>What</strong> you built + <strong>tools</strong> + <strong>your part</strong> + <strong>result</strong>.</p>`,
  ],
  [
    "Experience bullet",
    `<p><strong>Action verb</strong> + <strong>task</strong> + <strong>number/result</strong>. Use: built, reduced, automated, led, migrated, improved.</p>`,
  ],
  [
    "Education",
    `<p>Degree, college, university, year, CGPA/percentage (if 60%+ or the JD asks).</p>`,
  ],
  [
    "Certifications",
    `<p>Name, issuer, year. Example: <em>AWS Certified Cloud Practitioner — Amazon Web Services, 2026</em>.</p>`,
  ],
  [
    "Achievements",
    `<p>Hackathon finalist, top 5% in a coding contest, promoted within 18 months, client award.</p>`,
  ],
])}

${h3("PDF export and file naming")}
${ul([
  "Export a <strong>text-based PDF</strong> (you can select the text). Never a photo or scan.",
  "Name it <code>Firstname_Lastname_Role_Resume.pdf</code> — e.g. <code>Anjali_Menon_QA_Resume.pdf</code>.",
  "Keep it under 1 MB; some portals reject large files.",
  "Use DOCX only when a portal specifically asks for Word.",
])}

${h3("Common resume mistakes")}
${table(
  ["Mistake", "Why it hurts", "Fix"],
  [
    [
      "Two-column design with icons and graphics",
      "Some ATS read columns in the wrong order",
      "Use a one-column, ATS-friendly template",
    ],
    [
      "Skills listed as star ratings or bars",
      "ATS can’t read them; recruiters don’t trust them",
      "Plain text skill list",
    ],
    [
      "Objective like “seeking a challenging role…”",
      "Says nothing",
      "Specific 2–3 line summary",
    ],
    [
      "Photo, DOB, religion, marital status",
      "Not needed; wastes space",
      "Remove unless an employer asks",
    ],
    [
      "Spelling mistakes / inconsistent dates",
      "Looks careless",
      "Read aloud; use one date format",
    ],
    [
      "Fake experience or inflated titles",
      "Background verification catches it; offers get withdrawn",
      "Be honest; show projects instead",
    ],
    [
      "Same resume for every job",
      "Low keyword match",
      "Tweak summary and skills per JD",
    ],
  ],
  "Common resume mistakes",
)}
<p>Deep dive: <a href="/guides/resume-guide-kerala-it-jobs/">Resume guide for Kerala IT jobs</a>.</p>
`,
  },

  {
    id: "ats-compatibility",
    num: 5,
    phase: "Prepare",
    title: "ATS compatibility",
    summary:
      "Understand how applicant tracking systems read resumes — and what an ATS score can and can’t tell you.",
    time: 11,
    candidate: [
      "Use standard headings and a simple layout",
      "Match honest keywords to the JD",
      "Check your resume privately before sending",
    ],
    company: [
      "ATS stores every application",
      "Recruiters search and filter candidates inside it",
    ],
    tools: [["Check your resume", "/ats-checker/"]],
    body: `
${toolCta(
  "Check your resume against a job description",
  "The InfoparkDaily ATS checker runs in your browser. It checks readability and keyword match, and your file stays on your device.",
  "/ats-checker/",
  "Check your resume",
)}

${h3("What ATS means")}
<p>An <strong>Applicant Tracking System</strong> is software companies use to collect applications, store resumes, move candidates through stages (Applied → Screening → Interview → Offer) and send emails. Common ones include Workday, SuccessFactors, Greenhouse, Lever, Zoho Recruit and Darwinbox. Smaller companies may simply use a shared inbox and a spreadsheet.</p>
${flow(["Your resume is uploaded", "ATS parses text into fields", "Knock-out questions are checked", "Recruiter searches / filters", "A human reads shortlisted resumes"], "How an ATS handles a resume")}

${h3("Resume parsing")}
<p>Parsing means the ATS reads your file and fills fields: name, email, phone, job titles, companies, dates, education and skills. If parsing fails, your profile may look empty to a recruiter even though your PDF looks perfect.</p>
${example(
  "What the ATS sees",
  table(
    ["Field", "Parsed well", "Parsed badly"],
    [
      ["Name", "Anjali Menon", "(blank — name was inside a header image)"],
      [
        "Experience",
        "QA Intern · Brightloop · Jan 2026–Jun 2026",
        "“Jan 2026 QA Brightloop Intern Jun” (two columns mixed)",
      ],
      [
        "Skills",
        "Manual testing, Jira, SQL, Selenium",
        "(blank — skills were icons)",
      ],
    ],
    "Parsing example",
  ),
)}

${h3("Keyword and job-description matching")}
${ul([
  "Recruiters search the ATS by keywords like “Selenium”, “React”, “Tally”, “IELTS” — your resume must contain the exact words.",
  "Use both forms of common terms once: “Search Engine Optimization (SEO)”.",
  "Put keywords where they make sense: summary, skills and inside bullets.",
  "Don’t paste the JD in white text — recruiters see the parsed text and will reject you.",
])}

${h3("Formatting rules that keep you readable")}
${table(
  ["Do", "Avoid"],
  [
    [
      "One column, standard fonts (Arial, Calibri, Inter, Georgia)",
      "Text boxes, tables for layout, multiple columns",
    ],
    [
      "Headings: Summary, Skills, Experience, Projects, Education",
      "Creative headings like “My Journey” or “What I Bring”",
    ],
    ["Dates as “Jan 2025 – Mar 2026”", "Only years, or mixed formats"],
    [
      "Contact details in the body",
      "Contact info only inside header/footer or images",
    ],
    [
      "Text-based PDF or DOCX",
      "Scanned PDFs, JPG resumes, password-protected files",
    ],
  ],
  "ATS formatting",
)}

${h3("What an ATS score means — and what it cannot guarantee")}
${fact(
  "An ATS checker (including ours) is a preparation tool. It estimates how readable your resume is and how many JD keywords it contains. It is <strong>not</strong> the employer’s actual ATS, it does not log in to any company system, and a high score does not guarantee shortlisting. Every employer configures its ATS differently, and in most companies a human recruiter still makes the decision.",
)}
${table(
  ["Score range (typical checker)", "What it suggests", "Next step"],
  [
    [
      "Low",
      "Parsing problems or very few matching keywords",
      "Switch to a simple template; add honest missing skills",
    ],
    ["Medium", "Readable, partial match", "Tune summary and skills to this JD"],
    [
      "High",
      "Readable and well matched",
      "Send it — then focus on interview prep",
    ],
  ],
  "ATS score meaning",
)}
${warn("Chasing 100% by stuffing keywords you don’t know backfires in the technical interview. Match honestly.")}
`,
  },

  {
    id: "application-email",
    num: 6,
    phase: "Prepare",
    title: "Application email",
    summary:
      "Write professional application, referral and follow-up emails — with copy-ready templates.",
    time: 10,
    candidate: [
      "Use the subject line format the post asks for",
      "Keep the body short and specific",
      "Attach one PDF and follow up once",
    ],
    company: [
      "HR inbox receives dozens to hundreds of emails a day",
      "Subject lines decide what gets opened",
    ],
    tools: [["More email examples", "/resume-builder/email-examples/"]],
    body: `
${h3("Anatomy of a good application email")}
${cards([
  [
    "Subject",
    "<p>Role + experience + your name. Use the post’s format if it gives one.</p>",
  ],
  [
    "Greeting",
    "<p>“Dear Hiring Team,” or “Dear Ms. Priya,” if a name is given. Avoid “Dear Sir/Madam” where a name is known.</p>",
  ],
  [
    "Opening",
    "<p>Which role, where you saw it, and one line on who you are.</p>",
  ],
  ["Proof", "<p>2–3 lines on matching skills or results.</p>"],
  ["Close", "<p>Availability, notice period (experienced), thanks.</p>"],
  ["Signature", "<p>Name, phone, LinkedIn/portfolio. No quotes or images.</p>"],
])}

${h3("Subject line examples")}
${ul([
  "<code>Application – Junior QA Engineer – Anjali Menon (Fresher, 2026)</code>",
  "<code>Application for Java Developer | 3 Yrs | Notice 30 Days | Rahul Nair</code>",
  "<code>Referral from Arun Kumar – Data Analyst (Job ID 4512) – Sneha Thomas</code>",
  "<code>Follow-up: Application for Customer Support Executive – 04 Nov</code>",
])}

${h3("Templates")}
${copy(
  "Fresher application email",
  `Subject: Application – Junior QA Engineer – Anjali Menon (Fresher, 2026)

Dear Hiring Team,

I am applying for the Junior QA Engineer position at Brightloop Technologies, which I found on InfoparkDaily.

I completed my B.Tech in Computer Science (2026) from ABC College of Engineering. During my final-year project I wrote and executed 120 test cases for a delivery-tracking app, logged defects in Jira and used SQL to verify data. I have also built a small Selenium automation suite for a demo login page.

I am available to join immediately and can work from Infopark, Kochi. My resume is attached for your review.

Thank you for your time.

Regards,
Anjali Menon
+91 98XXX XXXXX
linkedin.com/in/anjalimenon`,
  "Attach: Anjali_Menon_QA_Resume.pdf",
)}
${copy(
  "Experienced application email",
  `Subject: Application for Java Developer | 3 Yrs | Notice 30 Days | Rahul Nair

Dear Ms. Priya,

I would like to apply for the Java Developer role (Job ID JD-221) posted on your careers page.

I have 3 years of experience building Spring Boot microservices for a payments platform at XYZ Solutions, Technopark. Recently I built 14 REST APIs that reduced response time from 900 ms to 250 ms, and I led our migration from MySQL 5.7 to 8.0 with zero downtime.

Current CTC: ₹6.2 LPA · Notice period: 30 days · Location: Trivandrum (open to Kochi)

My resume is attached. I would welcome a chance to discuss how I can contribute to your team.

Best regards,
Rahul Nair
+91 97XXX XXXXX · linkedin.com/in/rahulnair`,
  "Share CTC in the email only if the post asks; otherwise keep it for the HR call",
)}
${copy(
  "Asking for a referral",
  `Hi Arun,

Hope you're doing well. I saw that Northwind Labs is hiring a Data Analyst (Job ID 4512): <job link>

I have 2 years of experience in SQL, Power BI and Python reporting, and I think I match the role well. Would you be comfortable referring me? I've attached my resume and a 3-line summary below to make it easy:

• 2 years as Data Analyst at ABC Corp – built 12 Power BI dashboards used by sales leadership
• Strong SQL (joins, window functions), Python (pandas)
• Notice period: 30 days

Thank you either way — I really appreciate it.

Sneha`,
  "Send on LinkedIn or WhatsApp to someone you know",
)}
${copy(
  "Email to HR after a referral",
  `Subject: Referral from Arun Kumar – Data Analyst (Job ID 4512) – Sneha Thomas

Dear Hiring Team,

Arun Kumar from your Analytics team has referred me for the Data Analyst role (Job ID 4512). I have 2 years of experience building SQL and Power BI reporting for sales teams and would be glad to discuss the role.

Resume attached. Notice period: 30 days.

Regards,
Sneha Thomas
+91 95XXX XXXXX`,
)}
${copy(
  "Direct email to HR (no specific opening)",
  `Subject: Interest in QA / Testing Roles – 2 Yrs Experience – Nikhil Joseph

Dear Hiring Team,

I am a QA engineer with 2 years of experience in manual and API testing (Postman, Jira, SQL). I follow Brightloop's work in logistics software and would like to be considered for any current or upcoming QA openings at your Kochi office.

My resume is attached. Thank you for considering my profile.

Regards,
Nikhil Joseph
+91 94XXX XXXXX`,
)}
${copy(
  "Follow-up email (7–10 working days later)",
  `Subject: Follow-up: Application for Junior QA Engineer – Anjali Menon

Dear Hiring Team,

I applied for the Junior QA Engineer role on 4 November and wanted to check whether there is an update. I remain very interested and am available for a test or interview at your convenience.

Thank you,
Anjali Menon
+91 98XXX XXXXX`,
  "Follow up once or twice at most, a week apart",
)}
${copy(
  "Thank-you email after an interview",
  `Subject: Thank you – Technical Interview for Java Developer – Rahul Nair

Dear Mr. Varghese,

Thank you for your time today. I enjoyed discussing the payment reconciliation service and how your team handles retries. Our conversation made me even more keen on the role.

Please let me know if you need anything else from me.

Regards,
Rahul Nair`,
)}

${h3("Resume attachment checklist")}
${ul([
  "Attach the PDF — don’t paste a Google Drive link unless asked (and if you do, set it to “Anyone with the link can view”).",
  "Check the attachment opened correctly before sending; send a test to yourself first.",
  "Mention the attachment in the email body.",
  "Don’t attach certificates unless asked; offer to share them.",
  "Use a professional email address: <code>firstname.lastname@…</code>, not <code>coolboy123@…</code>.",
])}
${warn("Write separate emails to separate companies — never put 30 HR addresses in To or CC.")}
<p>More templates for every situation: <a href="/resume-builder/email-examples/">Email examples</a> · <a href="/guides/email-recruiter-kerala-it/">Emailing recruiters in Kerala IT</a>.</p>
`,
  },
];
