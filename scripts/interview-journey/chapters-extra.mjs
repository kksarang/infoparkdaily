/* Extra depth for each chapter, appended to the chapter body by build.mjs.
   Keep facts general and verifiable; company names in samples are fictional. */
import { ext, ul, ol, tip, warn, fact, both, h3, example, table, copy, cards, flow, qa } from "./helpers.mjs";

export const EXTRA = {
  /* 01 ------------------------------------------------------------ */
  "job-discovery": `
${h3("Kerala’s main IT hubs at a glance")}
${table(
  ["Hub", "City / area", "Typical employers", "Where to check"],
  [
    ["Infopark", "Kakkanad, Kochi (also Cherthala and Koratty campuses)", "IT services, product startups, BPO/KPO, QA, support", `<a href="/infopark-jobs/">InfoparkDaily Infopark jobs</a> · ${ext("https://infopark.in/companies-job", "infopark.in")}`],
    ["Technopark", "Kazhakkoottam, Thiruvananthapuram", "Large IT services, product engineering, fintech, aerospace software", `<a href="/technopark-jobs/">InfoparkDaily Technopark jobs</a> · ${ext("https://technopark.in/job-search", "technopark.in")}`],
    ["Cyberpark", "Kozhikode", "Growing IT services and startups", `<a href="/cyberpark-jobs/">InfoparkDaily Cyberpark jobs</a> · ${ext("https://cyberparks.in/careers/", "cyberparks.in")}`],
    ["UL CyberPark", "Kozhikode (a separate park)", "IT services and product firms", ext("https://www.ulcyberpark.com/jobs", "ulcyberpark.com")],
    ["SmartCity Kochi", "Kakkanad, Kochi", "IT/ITES tenants", "SmartCity’s openings page — check post dates"]
  ],
  "Kerala IT hubs"
)}

${h3("Search keyword cheat sheet")}
<p>Recruiters and portals use different words for the same job. Search several of them.</p>
${table(
  ["You want…", "Also search for"],
  [
    ["Software developer (fresher)", "Trainee Software Engineer, Associate Engineer, Junior Developer, Graduate Engineer Trainee (GET), Programmer Analyst"],
    ["Tester", "QA Engineer, Software Test Engineer, Quality Analyst, Manual Tester, SDET, Automation Tester"],
    ["Data roles", "Data Analyst, MIS Executive, Business Analyst, Reporting Analyst, BI Developer, Junior Data Scientist"],
    ["Support", "Technical Support Engineer, Customer Support Executive, Service Desk, L1 Support, Application Support"],
    ["Web / UI", "Frontend Developer, React Developer, UI Developer, Web Designer, Angular Developer"],
    ["Mobile", "Flutter Developer, Android Developer, iOS Developer, React Native Developer"],
    ["Accounts", "Accounts Executive, Accountant, AP/AR Executive, Finance Associate, Tally Operator"],
    ["HR", "HR Executive, Talent Acquisition Associate, Recruiter, HR Generalist, HR Intern"],
    ["Marketing", "Digital Marketing Executive, SEO Analyst, Social Media Executive, Performance Marketer, Content Writer"],
    ["Design", "UI/UX Designer, Product Designer, Graphic Designer, Visual Designer"]
  ],
  "Search keyword synonyms"
)}

${h3("Spotting fake job posts")}
${table(
  ["Red flag", "What a genuine post looks like"],
  [
    ["“Registration fee”, “training kit fee”, “refundable deposit”", "No payment of any kind to apply, interview or join"],
    ["Only a mobile number or personal Gmail, no company name", "Company name, website and an official email domain"],
    ["Salary far above the market for a fresher (“₹60,000/month, no experience, work from home”)", "A realistic range for the role"],
    ["“Selected” without any interview", "At least one conversation or test"],
    ["Pressure: “only 2 seats left, pay today”", "Normal timelines; time to read the offer"],
    ["Interview only over chat; asks for OTP, bank or Aadhaar details early", "ID documents only after an offer, through an official HR process"]
  ],
  "Fake job red flags"
)}
${tip("Report suspicious listings to InfoparkDaily from the job page (Report option) so others are warned.")}
`,

  /* 02 ------------------------------------------------------------ */
  "job-research": `
${h3("Common JD phrases decoded")}
${table(
  ["Phrase in the JD", "What it usually means", "What to ask or do"],
  [
    ["Immediate joiners preferred", "They want someone within 0–15 days", "Experienced: say clearly if your notice is longer"],
    ["Competitive / best in industry salary", "Salary not disclosed", "Research the range before the HR call"],
    ["Rotational shifts", "Day and night shifts may change weekly or monthly", "Ask about night-shift allowance and transport"],
    ["US / UK shift", "Evening or night working hours in India time", "Confirm exact timings"],
    ["C2H (contract-to-hire)", "You start as a contractor; may be made permanent later", "Ask the conversion timeline and who pays your salary"],
    ["On the payroll of a staffing company", "You work at the client but are employed by an agency", "Ask about benefits, leave and conversion"],
    ["Service agreement / bond", "You agree to stay for a period or pay an amount if you leave early", "Read the exact terms before accepting"],
    ["Hybrid (3 days WFO)", "3 days in office, 2 from home", "Check flexibility and office location"],
    ["Good communication skills", "Client-facing calls or emails are part of the job", "Prepare to speak clearly in English in interviews"],
    ["Willing to relocate", "Location may be decided later or may change", "Ask which cities are possible"]
  ],
  "JD phrases decoded"
)}

${h3("A second example: non-IT role")}
<div class="ij-jd">
  <div class="ij-jd-post" aria-label="Sample non-IT job description">
    <p class="ij-jd-line" data-n="1"><strong>Accounts Executive</strong> — Lakeview Logistics Pvt Ltd</p>
    <p class="ij-jd-line" data-n="2">Edappally, Kochi · On-site · Mon–Sat</p>
    <p class="ij-jd-line" data-n="3">B.Com / M.Com · 1–3 years in accounts</p>
    <p class="ij-jd-line" data-n="4">Must have: Tally Prime, GST returns, bank reconciliation, MS Excel</p>
    <p class="ij-jd-line" data-n="5">Good to have: Zoho Books, TDS filing</p>
    <p class="ij-jd-line" data-n="6">Salary: ₹2.4–3.6 LPA · Walk-in: 12 Nov, 10 am–1 pm</p>
  </div>
  <ol class="ij-jd-notes">
    <li><strong>Title:</strong> an executive-level role — you will do the entries yourself.</li>
    <li><strong>Mon–Sat:</strong> a six-day week, common in non-IT companies. Decide if that works.</li>
    <li><strong>B.Com/M.Com + 1–3 yrs:</strong> freshers with a strong Tally internship may still be considered at a walk-in.</li>
    <li><strong>Must-haves:</strong> expect a practical test — passing entries in Tally or a bank reconciliation in Excel.</li>
    <li><strong>Good to have:</strong> mention any Zoho Books or TDS exposure.</li>
    <li><strong>Walk-in window:</strong> reach before 10:30 am with printed resumes and certificates.</li>
  </ol>
</div>

${h3("Research checklist (copy into your notes)")}
${copy(
  "Company research template",
  `Company:
Website / domain:
What they sell & who their clients are:
Size (LinkedIn employees):
Office location & commute time:
Role & team:
Tech stack / tools mentioned:
Interview pattern (reviews / seniors):
Salary range (sources):
Red flags noticed:
Why I want this role (2 lines):
Questions I will ask them:`
)}
`,

  /* 03 ------------------------------------------------------------ */
  "application-strategy": `
${h3("Referral etiquette")}
${ol([
  "Ask people you know — classmates, seniors, ex-colleagues — before strangers.",
  "Send the exact job link or job ID. “Any openings?” is too vague to act on.",
  "Attach your resume and a 3-line summary they can paste into the referral form.",
  "Thank them whatever happens, and tell them the outcome.",
  "Never pressure someone who doesn’t know your work."
])}
${copy(
  "LinkedIn message to an alumnus (first contact)",
  `Hi Aswin, I'm Anjali, a 2026 CSE graduate from ABC College (your junior by 3 batches). I saw Brightloop is hiring a Junior QA Engineer (Job ID 3381). I've done a testing project with 120 test cases and some Selenium automation. Would you be open to a 10-minute chat about the team, or to referring me if you think I'm a fit? Thank you!`,
  "Keep it under 300 characters for connection requests; send the details after they accept"
)}

${h3("Walk-in interview checklist")}
${cards([
  ["Carry", "<p>5–6 printed resumes, photo ID, 2 passport photos, copies of certificates, a pen, a file folder.</p>"],
  ["Dress", "<p>Formal or smart casual. Ironed shirt, closed shoes. Simple is best.</p>"],
  ["Timing", "<p>Reach 30–45 minutes early. Many drives stop registration once enough candidates arrive.</p>"],
  ["On the day", "<p>Expect several rounds in one day: written/aptitude, technical, HR. Keep water and a snack.</p>"],
  ["Before leaving", "<p>Note the HR person’s name and ask when results will be shared.</p>"]
])}

${h3("How many applications is enough?")}
${table(
  ["Situation", "Suggested weekly target", "Why"],
  [
    ["Fresher, actively searching", "10–15 tailored applications + 1–2 walk-ins", "Volume matters, but tailoring keeps response rates up"],
    ["Experienced, employed", "5–8 applications + 3 referral requests", "Quality and referrals beat volume"],
    ["Career switcher", "5–10 applications + 1 project or course module", "Build proof alongside applying"]
  ],
  "Weekly application targets"
)}
`,

  /* 04 ------------------------------------------------------------ */
  "resume-creation": `
${h3("Strong action verbs")}
${table(
  ["Use for", "Verbs"],
  [
    ["Building", "Built, Developed, Designed, Implemented, Created, Launched"],
    ["Improving", "Improved, Reduced, Optimised, Automated, Streamlined, Accelerated"],
    ["Leading", "Led, Mentored, Coordinated, Owned, Drove, Trained"],
    ["Analysing", "Analysed, Identified, Investigated, Measured, Forecast"],
    ["Supporting", "Resolved, Supported, Maintained, Documented, Assisted"]
  ],
  "Action verbs"
)}

${h3("Keyword bank by role")}
<p>Use only the ones you can genuinely talk about.</p>
${table(
  ["Role", "Common keywords recruiters search"],
  [
    ["Java backend", "Java, Spring Boot, REST API, Microservices, Hibernate/JPA, MySQL/PostgreSQL, Maven, Git, JUnit, Docker"],
    ["Frontend", "JavaScript, TypeScript, React, Next.js, Angular, HTML5, CSS3, Tailwind, Redux, REST, Responsive design"],
    ["Python / Django", "Python, Django, Flask, FastAPI, REST, PostgreSQL, Celery, pandas, Git, Linux"],
    ["QA / testing", "Manual testing, Test cases, STLC, Bug life cycle, Jira, Selenium, TestNG, Postman, API testing, Regression"],
    ["Data analyst", "SQL, Excel, Power BI, Tableau, Python, pandas, Data cleaning, Dashboards, Statistics"],
    ["Mobile", "Flutter, Dart, Android, Kotlin, Firebase, REST, State management, Play Store release"],
    ["DevOps / cloud", "AWS, Azure, Linux, Docker, Kubernetes, CI/CD, Jenkins, GitHub Actions, Terraform, Monitoring"],
    ["Tech support", "Troubleshooting, Ticketing (ServiceNow/Freshdesk), Windows, Networking basics, SLA, Customer communication"],
    ["Accounts", "Tally Prime, GST, TDS, Bank reconciliation, Accounts payable/receivable, MS Excel, Zoho Books"],
    ["HR / recruitment", "Sourcing, Screening, Naukri/LinkedIn Recruiter, Onboarding, HRMS, Payroll basics, Employee engagement"],
    ["Digital marketing", "SEO, Google Ads, Meta Ads, Google Analytics, Content marketing, Social media, Email marketing"]
  ],
  "Keyword bank"
)}

${h3("Handling gaps and special cases")}
${table(
  ["Situation", "How to show it"],
  [
    ["Career gap (study, family, health)", "One honest line: “Career break (2025) — family responsibilities; completed AWS Cloud Practitioner.”"],
    ["Many short jobs", "Group contract roles under one heading; explain moves briefly in interviews"],
    ["Switching domains", "Lead with transferable skills and a relevant project; a short summary of the switch"],
    ["Low CGPA", "Don’t list it unless asked; lead with projects and skills"],
    ["Backlogs cleared", "Show final degree and year; answer honestly if asked"]
  ],
  "Gaps and special cases"
)}

${h3("Before you send: 10-point resume check")}
${ol([
  "Name and phone at the top, readable and correct.",
  "Email is professional and works.",
  "Summary mentions the target role.",
  "Skills match the JD (honestly).",
  "Every bullet starts with a verb.",
  "At least three numbers or results.",
  "Dates consistent (Mon YYYY – Mon YYYY).",
  "No spelling mistakes (read it aloud).",
  "One page (fresher) / two pages max (experienced).",
  "Saved as a text PDF with a clear file name."
])}
`,

  /* 05 ------------------------------------------------------------ */
  "ats-compatibility": `
${h3("Worked example: keyword match")}
${example(
  "JD: “Junior QA Engineer — manual testing, test cases, Jira, SQL; Selenium preferred”",
  table(
    ["Keyword", "Resume version A", "Resume version B"],
    [
      ["manual testing", "✗ (wrote “checked apps”)", "✓ Manual testing of web and Android apps"],
      ["test cases", "✗", "✓ Wrote 120 test cases"],
      ["Jira", "✗ (wrote “bug tool”)", "✓ Logged defects in Jira"],
      ["SQL", "✓", "✓ Verified data with SQL queries"],
      ["Selenium", "✗", "✓ Automated login tests with Selenium (Java)"],
      ["Result", "1 of 5 matched", "5 of 5 matched — same experience, clearer words"]
    ],
    "Keyword match comparison"
  )
)}

${h3("ATS myths vs facts")}
${table(
  ["Myth", "Fact"],
  [
    ["“ATS rejects 75% of resumes automatically.”", "Most rejections come from knock-out questions and from recruiters choosing other candidates. ATS mainly stores, searches and ranks."],
    ["“PDFs can’t be read by ATS.”", "Text-based PDFs are read by most modern systems. Scanned or image PDFs are the problem."],
    ["“You need a 100% score.”", "A clear, relevant resume with the key skills is enough; humans decide."],
    ["“Hide keywords in white text.”", "Recruiters see the parsed plain text. It looks dishonest and gets you rejected."],
    ["“Fancy design stands out.”", "Design matters less than clarity. Columns and graphics often parse badly."]
  ],
  "ATS myths"
)}

${h3("Section headings ATS recognise")}
${ul([
  "<code>Summary</code> or <code>Professional Summary</code>",
  "<code>Skills</code> or <code>Technical Skills</code>",
  "<code>Experience</code> or <code>Work Experience</code>",
  "<code>Projects</code>",
  "<code>Education</code>",
  "<code>Certifications</code>",
  "<code>Achievements</code> or <code>Awards</code>"
])}
`,

  /* 06 ------------------------------------------------------------ */
  "application-email": `
${h3("More templates")}
${copy(
  "Internship application",
  `Subject: Application for Python Development Internship – Fathima Rahman (B.Sc CS, 3rd year)

Dear Hiring Team,

I am a third-year B.Sc Computer Science student at XYZ College, Kochi, applying for the Python Development Internship posted on InfoparkDaily.

I have built two Django projects — a college event portal and a library tracker (GitHub: github.com/fathimar). I am comfortable with Python, SQL and Git, and I'm eager to learn how production code is written and reviewed.

I can work full-time from 1 December for 3–6 months. My resume is attached.

Thank you for your consideration.

Regards,
Fathima Rahman
+91 90XXX XXXXX`
)}
${copy(
  "Replying to an interview invitation",
  `Subject: Re: Interview Invitation – Junior QA Engineer

Dear Meera,

Thank you for the invitation. I confirm my availability for the technical interview on Thursday, 13 November at 11:00 am (Google Meet).

Please let me know if I should prepare anything specific.

Regards,
Anjali Menon
+91 98XXX XXXXX`
)}
${copy(
  "Requesting to reschedule",
  `Subject: Request to Reschedule – Technical Interview – Rahul Nair

Dear Meera,

Thank you for scheduling my interview on 13 November at 11 am. Unfortunately, I have a production release that morning that I can't move. Would any of these slots work instead?

• 13 Nov, after 4 pm
• 14 Nov, any time
• 15 Nov, before 1 pm

I apologise for the inconvenience and appreciate your flexibility.

Regards,
Rahul Nair`
)}
${copy(
  "Short WhatsApp message to HR (when the listing gives a WhatsApp number)",
  `Hello, I'm Anjali Menon. I saw the Junior QA Engineer opening at Brightloop on InfoparkDaily. I'm a 2026 B.Tech CSE graduate with manual testing and Selenium project experience, based in Kochi and available to join immediately. May I share my resume here or by email? Thank you.`,
  "Send during working hours; no voice notes; no repeated messages"
)}
${copy(
  "Walk-in follow-up",
  `Subject: Follow-up – Walk-in Interview on 12 Nov – Accounts Executive – Arun Das

Dear Hiring Team,

I attended the walk-in interview for Accounts Executive on 12 November and completed the Tally test and HR discussion. I wanted to thank you for the opportunity and check if there is an update on the next steps.

Regards,
Arun Das
+91 96XXX XXXXX`
)}

${h3("Email mistakes that get applications ignored")}
${table(
  ["Mistake", "Better"],
  [
    ["Empty body with only an attachment", "3–6 line body explaining the role and fit"],
    ["Subject: “Resume” or “Job”", "Role + your name (+ experience)"],
    ["Same email to 30 HRs in CC", "One email per company"],
    ["Resume file “CV final new (2).pdf”", "Anjali_Menon_QA_Resume.pdf"],
    ["Long life story", "Short, specific, relevant"],
    ["“Dear Sir” to a named female recruiter", "Use the name given: “Dear Ms. Priya”"]
  ],
  "Email mistakes"
)}
`,

  /* 07 ------------------------------------------------------------ */
  "hr-screening": `
${h3("How recruiters actually search")}
<p>On portals and in ATS databases, recruiters type Boolean searches. Your resume is found only if it contains the words they type.</p>
${example(
  "Sample recruiter searches",
  ul([
    "<code>(\"QA Engineer\" OR Tester) AND Selenium AND Java AND Kochi</code>",
    "<code>\"Spring Boot\" AND Microservices AND (Kafka OR RabbitMQ) NOT Intern</code>",
    "<code>\"Data Analyst\" AND (\"Power BI\" OR Tableau) AND SQL</code>",
    "<code>Tally AND GST AND \"bank reconciliation\"</code>"
  ])
)}

${h3("Things that make a recruiter pause")}
${table(
  ["Signal", "Why it worries them", "How to address it"],
  [
    ["Unexplained gaps", "Uncertainty", "One honest line on the resume"],
    ["Many jobs under a year", "May leave quickly", "Explain reasons briefly (project ended, relocation)"],
    ["Location far away with no relocation note", "May not join", "Add “Open to relocate to Kochi”"],
    ["Skills list with 40 technologies", "Looks padded", "List what you can be tested on"],
    ["Copy-pasted JD text", "Looks fake", "Write your own bullets with results"],
    ["Expected CTC far above band", "Budget mismatch", "Research ranges; be flexible"]
  ],
  "Recruiter concerns"
)}

${h3("Inside a typical small park company")}
${flow(["HR checks inbox twice a day", "Moves good resumes to a ‘Shortlist’ folder", "Shares with team lead on email/WhatsApp", "Lead picks 3–5 names", "HR calls candidates"], "Small company screening flow")}
`,

  /* 08 ------------------------------------------------------------ */
  shortlisting: `
${h3("What portal statuses usually mean")}
${table(
  ["Status you see", "Usually means", "Do next"],
  [
    ["Application submitted / Received", "It reached the ATS; no human may have seen it yet", "Wait; keep applying"],
    ["Application viewed (Naukri)", "A recruiter opened your profile", "Good sign — keep your phone available"],
    ["In review / Under consideration", "You’re in the pool being screened", "Wait 1–2 weeks"],
    ["Recruiter action / Shortlisted", "You passed first screening", "Expect a call or test link"],
    ["Interview / Assessment", "Next round scheduled", "Prepare"],
    ["On hold", "Paused or you’re a backup", "Follow up after 2 weeks"],
    ["Not selected / No longer under consideration", "Closed for this role", "Apply to others; reapply later"],
    ["Job closed / Position filled", "Hiring finished", "Move on"]
  ],
  "Portal status meanings"
)}
<p class="ij-small">Labels differ between portals and ATS products; treat these as typical meanings, not guarantees.</p>

${h3("Your status board")}
${cards([
  ["Applied (waiting)", "<p>Follow up once after 7–10 working days.</p>", "Week 1–2"],
  ["In process", "<p>Calls, tests or interviews scheduled — prioritise these.</p>", "Active"],
  ["On hold", "<p>Check in every 2 weeks, keep other options.</p>", "Parked"],
  ["Closed", "<p>Rejected or silent 4+ weeks. Note lessons, move on.</p>", "Done"]
])}
`,

  /* 09 ------------------------------------------------------------ */
  "initial-interview": `
${h3("Phone and video interview etiquette")}
${table(
  ["", "Phone call", "Video call (Meet / Teams / Zoom)"],
  [
    ["Before", "Quiet place, charged phone, resume open", "Test link, camera, mic and internet 15 minutes before"],
    ["Setup", "Earphones with mic for clarity", "Plain background, light facing you, camera at eye level"],
    ["Dress", "—", "Formal shirt or neat top"],
    ["During", "Speak slowly; pause before answering", "Look at the camera when speaking; mute when not"],
    ["If it drops", "Call back or message immediately", "Rejoin; message the recruiter if you can’t"]
  ],
  "Call etiquette"
)}

${h3("More HR questions")}
${qa([
  ["What are your strengths?", "“I’m detail-oriented and persistent. In my project I found an edge case where duplicate attendance was recorded on slow networks — I kept testing until I could reproduce it, and we fixed it before release.”", "Name 1–2 strengths and prove each with an example."],
  ["What is your weakness?", "“I used to hesitate to ask questions early and lost time. Now I timebox: if I’m stuck for 30 minutes, I ask. It’s made me faster.”", "A real, non-critical weakness plus what you’re doing about it."],
  ["Are you comfortable with a 6-day week / Saturday work?", "Answer honestly: “Yes, I can manage alternate Saturdays,” or “I’d prefer a 5-day week — is that negotiable?”"],
  ["Why is your CGPA low?", "“I struggled in my first two semesters while adjusting to hostel life. My CGPA improved from 6.1 to 7.6 in the last four semesters, and I focused on practical projects.”", "Own it, show improvement, move to strengths."],
  ["Are you planning higher studies?", "“Not in the near future. I want to build industry experience first; any learning I do will be part-time and related to my work.”", "Be honest — but employers want to know you’ll stay."],
  ["Do you have a laptop / stable internet? (remote roles)", "“Yes — an i5 laptop with 16 GB RAM and a fibre connection with mobile backup.”"]
])}

${h3("Your one-page call sheet")}
${copy(
  "Keep this in front of you during HR calls",
  `Role & company:
Recruiter name:
My 60-second intro: (practised ✓)
Current CTC: (fixed + variable)
Expected CTC: (range, researched)
Notice period: (days; early release possible?)
Current location / relocation:
Available interview slots:
Questions to ask:
 1. What are the next rounds?
 2. Team size and work location?
 3. Timeline for a decision?`
)}
`,

  /* 10 ------------------------------------------------------------ */
  "technical-assessment": `
${h3("More aptitude practice (with answers)")}
${qa([
  ["Find the average of 12, 15, 18, 21 and 24.", "Sum = 90; 90 ÷ 5 = <strong>18</strong>.", "For evenly spaced numbers, the average is the middle number."],
  ["Divide ₹1,200 between A and B in the ratio 2:3.", "Total parts 5 → ₹240 per part. A = <strong>₹480</strong>, B = <strong>₹720</strong>."],
  ["Simple interest on ₹10,000 at 8% per year for 3 years?", "SI = P × R × T ÷ 100 = 10,000 × 8 × 3 ÷ 100 = <strong>₹2,400</strong>."],
  ["Compound interest on ₹10,000 at 10% per year for 2 years?", "Amount = 10,000 × 1.1 × 1.1 = 12,100 → CI = <strong>₹2,100</strong>."],
  ["What is 40% of 250?", "0.4 × 250 = <strong>100</strong>."],
  ["A car covers 60 km in 1 hour 30 minutes. Speed?", "60 ÷ 1.5 = <strong>40 km/h</strong>."],
  ["Angle between the hands of a clock at 3:30?", "Hour hand = 3 × 30 + 30 × 0.5 = 105°. Minute hand = 180°. Difference = <strong>75°</strong>."],
  ["Odd one out: 3, 5, 7, 9, 11", "<strong>9</strong> — the others are prime numbers."],
  ["Ravi walks 5 km north, turns right and walks 3 km, turns right again and walks 5 km. Where is he from the start?", "He ends <strong>3 km east</strong> of the starting point."],
  ["A is B’s brother. C is A’s mother. How is C related to B?", "C is B’s <strong>mother</strong>."]
])}

${h3("More IT questions (with answers)")}
${qa([
  ["Method overloading vs overriding?", "Overloading: same method name, different parameters, in the same class (resolved at compile time). Overriding: a subclass redefines a parent method with the same signature (resolved at runtime)."],
  ["Stack vs queue?", "Stack is LIFO (last in, first out) — like undo. Queue is FIFO (first in, first out) — like a ticket line."],
  ["WHERE vs HAVING in SQL?", "WHERE filters rows before grouping; HAVING filters groups after GROUP BY (e.g. <code>HAVING COUNT(*) &gt; 1</code>)."],
  ["What do HTTP status codes 200, 201, 400, 401, 403, 404 and 500 mean?", "200 OK · 201 Created · 400 Bad Request · 401 Unauthorized (not logged in) · 403 Forbidden (no permission) · 404 Not Found · 500 Internal Server Error."],
  ["Which HTTP methods are idempotent?", "GET, PUT and DELETE (and HEAD, OPTIONS) — repeating them has the same effect. POST is not idempotent."],
  ["Basic Git workflow?", "<code>git clone</code> → create a branch <code>git checkout -b feature/login</code> → <code>git add</code> → <code>git commit -m</code> → <code>git push</code> → open a pull request → review → merge."],
  ["Severity vs priority? (QA)", "Severity = impact on the system (crash = high). Priority = how soon to fix (a typo in the company name on the homepage is low severity but high priority)."],
  ["Smoke vs sanity vs regression testing?", "Smoke: quick check that the build’s main features work. Sanity: focused check after a small fix. Regression: re-testing existing features to make sure new changes didn’t break them."],
  ["Process vs thread?", "A process is a running program with its own memory. Threads run inside a process and share its memory, so they’re lighter but need synchronisation."],
  ["Props vs state in React?", "Props are inputs passed from a parent (read-only in the child). State is data a component owns and can update, triggering a re-render."]
])}

${h3("Take-home assignment: how it’s judged")}
${table(
  ["Criteria", "What reviewers look for"],
  [
    ["Works as asked", "All requirements done; nothing missing"],
    ["Code quality", "Readable names, small functions, no dead code"],
    ["README", "How to run, assumptions, what you’d improve with more time"],
    ["Tests", "At least a few meaningful tests"],
    ["Git history", "Sensible commits, not one giant dump"],
    ["Time", "Submitted on time; ask early if you need more"]
  ],
  "Assignment criteria"
)}
`,

  /* 11 ------------------------------------------------------------ */
  "technical-interview": `
${h3("Topic map by role")}
${table(
  ["Role", "Fresher focus", "Experienced focus"],
  [
    ["Backend (Java/Python/.NET)", "OOP, collections, exceptions, SQL joins, REST basics", "Design patterns, transactions, caching, performance, microservices trade-offs"],
    ["Frontend", "HTML semantics, CSS layout (flex/grid), JS basics, DOM, React components", "State management, performance, accessibility, testing, build tooling"],
    ["QA", "STLC, test cases, bug life cycle, types of testing", "Framework design, CI integration, API automation, test strategy"],
    ["Data", "SQL, Excel, basic statistics, charts", "Data modelling, ETL, query optimisation, stakeholder reporting"],
    ["Mobile", "Activity/widget lifecycle, layouts, API calls", "Architecture (MVVM/BLoC), offline sync, release and crash monitoring"],
    ["DevOps", "Linux commands, networking basics, Git", "CI/CD pipelines, containers, IaC, monitoring and incident response"],
    ["Support", "OS basics, troubleshooting steps, ticket handling", "Root-cause analysis, SLAs, escalation, knowledge base"]
  ],
  "Technical topic map"
)}

${h3("Project walkthrough template")}
${copy(
  "Use this to prepare every project on your resume",
  `1. One-line summary: what it is and who uses it
2. Problem it solves
3. My role and what I personally built
4. Tech stack and why we chose it
5. Architecture in 3 boxes (frontend → API → database)
6. Hardest bug/challenge and how I solved it
7. Result: users, speed, accuracy, marks, feedback
8. What I would improve next`
)}

${h3("More questions")}
${both(
  qa([
    ["What is normalisation?", "Organising tables to reduce duplication: 1NF (atomic values), 2NF (no partial dependency on a composite key), 3NF (no transitive dependency). Example: store customer details once in a customers table, not in every order row."],
    ["What is an API?", "A defined way for programs to talk. A REST API exposes URLs like <code>GET /students/12</code> that return data, usually JSON."],
    ["Shallow vs deep copy in Python?", "A shallow copy copies the outer object but shares inner objects; a deep copy (<code>copy.deepcopy</code>) copies everything recursively."]
  ]),
  qa([
    ["How would you add caching to a slow endpoint?", "Measure first. Cache read-heavy, rarely changing data (e.g. Redis) with a sensible TTL; invalidate on writes; watch hit rate; avoid caching per-user sensitive data without keys."],
    ["How do you handle a breaking API change?", "Version the API (<code>/v2</code>), keep the old version for a deprecation period, communicate timelines, and monitor usage before removal."],
    ["How do you estimate a task?", "Break it into small parts, estimate each, add time for testing and review, call out unknowns and risks, and re-estimate after a spike if uncertainty is high."]
  ])
)}
`,

  /* 12 ------------------------------------------------------------ */
  "managerial-round": `
${h3("Prepare your story bank")}
<p>Prepare six stories. Most managerial questions can be answered by one of them.</p>
${table(
  ["Story", "Covers questions about"],
  [
    ["A big success", "Achievement, ownership, impact"],
    ["A failure or mistake", "Learning, honesty, resilience"],
    ["A conflict", "Teamwork, communication, influence"],
    ["A tight deadline", "Prioritisation, pressure, planning"],
    ["Helping or leading others", "Leadership, mentoring, collaboration"],
    ["Learning something fast", "Adaptability, curiosity, initiative"]
  ],
  "Story bank"
)}

${h3("More questions with sample answers")}
${qa([
  ["Why should I pick you over other candidates?", "“You need someone who can own API testing from day one. I’ve automated 300 cases and set up Postman suites in CI, so I can contribute in the first month, and I like mentoring juniors.”"],
  ["How do you handle feedback you disagree with?", "“I listen fully, ask for an example, and reflect before responding. If I still disagree, I share data calmly. Once a decision is made, I commit to it.”"],
  ["Tell me about a time you went beyond your role.", "“Our deployment notes were scattered, so I wrote a one-page release checklist on my own time. The team adopted it, and failed deployments dropped from 4 a month to 1.”"],
  ["How do you keep learning?", "“I set one learning goal per quarter — this quarter it’s Kubernetes basics. I spend 3 hours a week and apply it on a side project.”"]
])}
`,

  /* 13 ------------------------------------------------------------ */
  "final-hr-round": `
${h3("Hike calculator — examples")}
${table(
  ["Current fixed CTC", "Hike asked", "Expected CTC"],
  [
    ["₹3.0 LPA", "25%", "₹3.75 LPA"],
    ["₹4.5 LPA", "30%", "₹5.85 LPA"],
    ["₹6.2 LPA", "30%", "₹8.06 LPA"],
    ["₹10 LPA", "20%", "₹12 LPA"]
  ],
  "Hike examples"
)}
<p class="ij-small">Formula: expected = current × (1 + hike% ÷ 100). Base your ask on market range and the role, not just a percentage.</p>

${h3("Salary terms you’ll hear")}
${table(
  ["Term", "Meaning"],
  [
    ["Fixed pay", "Guaranteed salary paid monthly"],
    ["Variable pay", "Performance or company-linked bonus; may be paid quarterly/yearly and may not be 100%"],
    ["Joining bonus", "One-time payment after joining; often must be repaid if you leave within a set period"],
    ["Retention bonus", "Paid for staying a set period"],
    ["ESOPs / RSUs", "Company shares or options that vest over years"],
    ["Gross salary", "Monthly earnings before deductions"],
    ["Net / in-hand", "What reaches your bank after PF, tax and other deductions"],
    ["LPA", "Lakhs per annum (per year)"]
  ],
  "Salary terms"
)}

${h3("Benefits checklist")}
${ul([
  "Health insurance: sum insured, family cover, parents add-on",
  "Leave: casual, sick, earned/privilege leave per year",
  "Work from home allowance, internet reimbursement",
  "Night-shift allowance and cab facility",
  "Learning budget or certification reimbursement",
  "Meal, transport or fuel allowance",
  "Appraisal cycle — when is your first salary review?"
])}
`,

  /* 14 ------------------------------------------------------------ */
  selection: `
${h3("Why an offer can be delayed")}
${table(
  ["Reason", "What you can do"],
  [
    ["Approvals waiting with a busy manager or finance", "Polite follow-up after the date HR gave"],
    ["Another candidate being interviewed for comparison", "Keep other processes moving"],
    ["Budget or headcount review", "Ask if the role is still open"],
    ["Client project not confirmed (services companies)", "Ask for an expected timeline"],
    ["Reference checks in progress", "Inform your references to expect a call"]
  ],
  "Offer delay reasons"
)}

${h3("What a scoring rubric looks like")}
${table(
  ["Area", "1 – Weak", "2 – Mixed", "3 – Strong", "4 – Exceptional"],
  [
    ["Technical depth", "Basics missing", "Basics OK, gaps", "Solid, explains trade-offs", "Teaches the interviewer something"],
    ["Problem-solving", "Stuck without help", "Solves with hints", "Solves independently", "Optimises and tests edge cases"],
    ["Communication", "Unclear", "Understandable", "Clear and structured", "Clear, concise and engaging"],
    ["Culture & ownership", "Blames others", "Neutral", "Owns outcomes", "Raises the team’s bar"]
  ],
  "Sample interview rubric"
)}
<p class="ij-small">Illustrative; each company designs its own.</p>
`,

  /* 15 ------------------------------------------------------------ */
  "offer-stage": `
${h3("Compare two offers side by side")}
${table(
  ["Factor", "Offer A", "Offer B"],
  [
    ["Fixed CTC", "₹7.4 LPA", "₹8.0 LPA"],
    ["Variable", "₹0.6 LPA", "None"],
    ["Joining bonus", "₹50,000 (repay if you leave within 12 months)", "—"],
    ["Location / commute", "Infopark, 20 min", "Technopark, relocation"],
    ["Work mode", "Hybrid, 3 days office", "Full office"],
    ["Role & learning", "Product team, modern stack", "Service project, client-facing"],
    ["Insurance", "₹5 lakh family cover", "₹3 lakh self only"],
    ["Notice period", "60 days", "30 days"]
  ],
  "Offer comparison"
)}
${tip("Look at the full picture — money, growth, commute, stability and people. The highest CTC isn’t always the best offer.")}

${h3("Offer acceptance timeline")}
${flow(["Verbal offer", "Written offer received", "Review (1–3 days)", "Negotiate once", "Revised offer", "Sign & accept by validity date", "Resign"], "Offer acceptance timeline")}
`,

  /* 16 ------------------------------------------------------------ */
  "pre-joining": `
${h3("Moving your PF (EPF) to the new employer")}
${ol([
  "Your UAN (Universal Account Number) stays the same for your whole career — give it to the new employer, don’t create a new one.",
  "Make sure your UAN is linked with Aadhaar, PAN and bank account on the EPFO member portal.",
  `After the new employer starts contributions, check your service history and passbook on ${ext("https://unifiedportal-mem.epfindia.gov.in/", "the EPFO member portal")}.`,
  "If the old balance hasn’t moved, use “One Member – One EPF Account (Transfer Request)” on the portal and follow the steps."
])}

${h3("Full and final settlement (experienced)")}
${table(
  ["Item", "What happens"],
  [
    ["Final salary", "Paid for days worked in the last month"],
    ["Leave encashment", "Unused eligible leave may be paid as per policy"],
    ["Notice shortfall", "Deducted if you leave before the notice ends without release"],
    ["Asset return", "Laptop, ID card, access cards must be returned"],
    ["Documents", "Relieving letter, experience letter, Form 16, payslips"],
    ["Timeline", "Often 30–60 days after the last working day — check your policy"]
  ],
  "Full and final settlement"
)}

${h3("First-week checklist")}
${cards([
  ["Day 1", "<p>Induction, ID, laptop, email, HRMS login. Submit pending documents.</p>"],
  ["Day 2–3", "<p>Meet your manager and buddy. Get repository and tool access. Read team docs.</p>"],
  ["Day 4–5", "<p>Set up the project locally. Pick a small starter task. Note questions.</p>"],
  ["End of week", "<p>Agree 30-60-90 day goals with your manager.</p>"]
])}
`,

  /* 17 ------------------------------------------------------------ */
  "rejection-journey": `
${h3("30-day restart plan")}
${table(
  ["Week", "Focus", "Output"],
  [
    ["Week 1", "Review: collect every interview question you got; identify 3 weak areas", "A written list of gaps"],
    ["Week 2", "Fix: study the weak areas; rewrite resume bullets; run ATS check per JD", "Updated resume + notes"],
    ["Week 3", "Practise: 3 mock interviews; 20 aptitude/coding problems", "Recorded answers you improved"],
    ["Week 4", "Apply: 15 tailored applications, 5 referral requests, 1–2 walk-ins", "Fresh pipeline"]
  ],
  "30-day restart plan"
)}

${h3("Mock interview plan")}
${ol([
  "Ask a friend or senior to interview you for 30 minutes using a real JD.",
  "Record it (with permission) and watch it once.",
  "Note filler words, unclear answers and missed points.",
  "Rewrite your three weakest answers using STAR.",
  "Repeat weekly until answers feel natural, not memorised."
])}

${h3("Staying motivated")}
${both(
  ul(["Many freshers apply for weeks or months before the first offer — that’s normal.", "Celebrate progress: first interview, first test cleared.", "Learn with friends; share openings with each other.", "Use InfoparkDaily alerts so new jobs come to you."]),
  ul(["Switching while employed takes time — protect your current performance.", "Track response rates; change the resume if under 1 in 20 replies.", "Network steadily, not only when you need a job.", "Take breaks; burnout shows in interviews."])
)}
`
};

/* ---------- glossary ---------- */
export const GLOSSARY = [
  ["ATS", "Applicant Tracking System — software that stores and manages job applications."],
  ["BGV", "Background verification of education, employment, identity and records."],
  ["Bond / service agreement", "An agreement to stay for a period, often with a payment if you leave early."],
  ["Bench", "In IT services, employees not currently assigned to a client project."],
  ["C2H", "Contract-to-hire: start as a contractor, possibly become permanent."],
  ["Campus drive", "Recruitment conducted at or through a college."],
  ["Counteroffer", "Your current employer’s offer to keep you after you resign."],
  ["CTC", "Cost to company — the total yearly cost of employing you."],
  ["ECTC", "Expected CTC — the package you’re asking for."],
  ["EPF / PF", "Employees’ Provident Fund — retirement savings contributed by you and your employer."],
  ["Experience letter", "A letter from an employer confirming your role and dates."],
  ["Form 16", "Annual TDS certificate from your employer for income-tax filing."],
  ["Gratuity", "A lump sum paid on leaving after an eligible period of service, as per law and policy."],
  ["HRMS", "HR management system used for leave, payslips and records."],
  ["JD", "Job description."],
  ["Knock-out question", "A screening question that can reject you automatically (e.g. “Do you have a B.Tech?”)."],
  ["LPA", "Lakhs per annum."],
  ["Notice period", "Days you must work after resigning, as per your contract."],
  ["Notice buyout", "Paying (or having the new employer pay) salary for unserved notice days."],
  ["Offer validity", "The date by which you must accept an offer."],
  ["Onboarding", "Joining formalities and induction for new employees."],
  ["Probation", "An initial period (often 3–6 months) before confirmation."],
  ["Referral", "An employee recommending you for a role."],
  ["Relieving letter", "Confirms you left a company after completing exit formalities."],
  ["Resdex", "Naukri’s resume database that recruiters search."],
  ["STAR", "Situation, Task, Action, Result — a structure for behavioural answers."],
  ["TDS", "Tax deducted at source from your salary."],
  ["UAN", "Universal Account Number for your EPF; stays the same across jobs."],
  ["Walk-in", "An interview you attend without a prior appointment at a set date and venue."]
];

/* ---------- FAQ (also emitted as FAQPage JSON-LD) ---------- */
export const FAQ = [
  ["Is InfoparkDaily a recruitment agency?", "No. InfoparkDaily is an independent community platform that collects public job openings and career resources. You apply through the method on each listing — the employer’s email, form or careers page."],
  ["Does InfoparkDaily list every job in Kerala?", "No platform lists every job. InfoparkDaily is a strong starting point for Kerala IT park and community openings; also check LinkedIn, Naukri, company career pages and park boards."],
  ["How long does the hiring process usually take?", "Anywhere from one day (walk-in drives) to several weeks for most private roles. Mass fresher hiring and senior roles can take longer, and government recruitment can take months."],
  ["Why didn’t I get any reply after applying?", "Many employers only contact shortlisted candidates. Follow up once after 7–10 working days; if there’s no response in 3–4 weeks, focus on other applications."],
  ["Does a high ATS checker score guarantee an interview?", "No. An ATS checker estimates readability and keyword match. It isn’t the employer’s system, and recruiters still make the decision."],
  ["Should a fresher negotiate salary?", "Fresher salaries are often fixed per batch or role band, so there’s little room. Focus on learning, the role and training; negotiate only if you have a clear reason, such as a competing offer."],
  ["What is the difference between CTC and in-hand salary?", "CTC includes everything the company spends on you — including employer PF, gratuity and benefits. In-hand is what reaches your bank after deductions like PF, professional tax and income tax."],
  ["Should I resign before getting an offer letter?", "No. Resign only after you have a written offer that you’ve accepted, and ideally after background verification has started without issues."],
  ["Is it okay to pay for a job or interview?", "No. Genuine employers and recruiters don’t charge candidates. Any request for a registration, training or document fee is a strong scam signal."],
  ["How often should I check for new jobs?", "Daily if possible. A quick check of the InfoparkDaily feed and alerts each morning, plus portal alerts and target company pages weekly, keeps you early."]
];
