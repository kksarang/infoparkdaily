import { ul, ol, tip, warn, fact, both, h3, example, table, copy, cards, flow, qa } from "./helpers.mjs";

export const chaptersB = [
  {
    id: "hr-screening",
    num: 7,
    phase: "Inside the company",
    title: "How companies receive & screen applications",
    summary: "Step into the HR seat: where applications land, how ATS and recruiters filter them, and how shortlists are made.",
    time: 13,
    candidate: ["Nothing visible happens — this is the waiting stage", "Keep applying elsewhere while you wait"],
    company: ["Applications collected in ATS, inbox or portal dashboards", "Eligibility filters and keyword search", "Recruiter reviews resumes and builds a shortlist", "Hiring manager approves who moves forward"],
    tools: [["Check your resume", "/ats-checker/"]],
    body: `
<p class="ij-perspective">Company perspective — this is what happens on the other side after you click Apply.</p>

${h3("Where applications reach the employer")}
${cards([
  ["Company career website", "<p>Goes straight into the company’s ATS with your answers to screening questions.</p>", "Most structured"],
  ["ATS", "<p>Workday, Greenhouse, Zoho Recruit, Darwinbox… one database for every channel.</p>"],
  ["Email inbox", "<p>Common in small and mid-size park companies. HR may download resumes into a folder or tracker sheet.</p>"],
  ["Job portal dashboard", "<p>Naukri, Indeed and foundit give employers a list of applicants plus database search.</p>"],
  ["LinkedIn Recruiter", "<p>Recruiters see Easy Apply candidates and also search profiles directly.</p>"],
  ["Employee referrals", "<p>Submitted through an internal referral tool — often reviewed first.</p>", "Fast lane"],
  ["Recruitment agencies", "<p>Agency screens first and sends a short list of profiles to the client.</p>"]
])}

${h3("Application-receiving workflow")}
<div class="ij-swim" role="img" aria-label="Diagram: applications from career site, email, portals, LinkedIn, referrals and agencies flow into one ATS or tracker, then through filters to recruiter review and a shortlist for the hiring manager">
  <div class="ij-swim-col">
    <p class="ij-swim-label">Channels</p>
    <span>Career site</span><span>Email</span><span>Naukri / Indeed</span><span>LinkedIn</span><span>Referral</span><span>Agency</span>
  </div>
  <div class="ij-swim-arrow" aria-hidden="true">→</div>
  <div class="ij-swim-col ij-swim-col--hub"><p class="ij-swim-label">Collected in</p><span class="ij-swim-hub">ATS or tracker sheet</span></div>
  <div class="ij-swim-arrow" aria-hidden="true">→</div>
  <div class="ij-swim-col"><p class="ij-swim-label">Screening</p><span>Eligibility filter</span><span>Keyword search</span><span>Recruiter review</span></div>
  <div class="ij-swim-arrow" aria-hidden="true">→</div>
  <div class="ij-swim-col"><p class="ij-swim-label">Output</p><span class="ij-swim-ok">Shortlist → hiring manager</span><span class="ij-swim-hold">Hold / talent pool</span><span class="ij-swim-no">Not progressed</span></div>
</div>

${h3("Step by step: how screening works")}
${ol([
  "<strong>Data collection.</strong> The ATS stores your resume, form answers, source (e.g. “LinkedIn”, “Referral”) and the date you applied.",
  "<strong>Resume parsing.</strong> The system extracts name, contact, titles, employers, dates, education and skills.",
  "<strong>Knock-out / eligibility filters.</strong> Hard rules set by HR: minimum degree, year of passing, location, notice period, work authorisation, minimum years. Fail one and you may be auto-rejected or sorted to the bottom.",
  "<strong>Keyword search and ranking.</strong> Recruiters search terms like “Selenium AND Java AND Kochi” or look at a match score the ATS calculates.",
  "<strong>Recruiter screening.</strong> A person skims the top resumes — often under a minute each in the first pass — checking role fit, stability, gaps and location.",
  "<strong>Experience and skill matching.</strong> Recruiter compares your projects or past roles with must-have skills from the hiring manager.",
  "<strong>Shortlist review.</strong> The hiring manager looks at the shortlist and picks who gets a call or test.",
  "<strong>Status update.</strong> Candidates move to Screening/Interview, Hold, or Rejected — but many systems never send the rejection email."
])}

${h3("Manual vs automated screening")}
${table(
  ["", "Automated (ATS)", "Manual (recruiter / manager)"],
  [
    ["Checks", "Eligibility questions, keywords, parsed fields", "Relevance, quality of projects, career story, communication"],
    ["Speed", "Instant", "Seconds to minutes per resume"],
    ["Common reasons to drop", "Failed a knock-out question; resume didn’t parse", "Skills don’t match; unexplained job hopping; unclear resume"],
    ["How to pass", "Answer screening questions honestly; simple format; JD keywords", "Clear summary, numbers, relevant projects at the top"]
  ],
  "Manual vs automated screening"
)}
${fact("In many small Kerala companies there is no ATS at all: an HR executive reads emails, keeps an Excel tracker and shares promising resumes with the team lead on WhatsApp or email. A clear subject line and a one-page readable PDF matter even more there.")}

${h3("What recruiters look for in the first 30 seconds")}
${both(
  ul([
    "Degree, year and eligibility for the batch",
    "Relevant projects or internship with the required tools",
    "Basic skills that match must-haves",
    "Location / willingness to relocate",
    "A neat, error-free resume"
  ]),
  ul([
    "Current title and company — is this the right level?",
    "Years in the core skill, not just total years",
    "Results and scale (users, transactions, team size)",
    "Stability: very short stints without reason raise questions",
    "Notice period and current location"
  ])
)}
${tip("Referrals, complete applications and early applications are usually reviewed before late, incomplete ones. You can’t control the volume — you can control being early, clear and complete.")}
`
  },

  {
    id: "shortlisting",
    num: 8,
    phase: "Inside the company",
    title: "Shortlisting & application status",
    summary: "Shortlisted, rejected, on hold or no response — what each outcome means and what to do next.",
    time: 9,
    candidate: ["Read status signals correctly", "Follow up politely once or twice", "Keep applying — never wait on one company"],
    company: ["Moves candidates into stages", "Often sends no update for rejections"],
    tools: [["Find more openings", "/jobs/"]],
    body: `
<p>After screening, your application lands in one of four states. You may never be told which one — so learn the signals.</p>
<div class="ij-status-grid">
  <div class="ij-status ij-status--ok">
    <span class="ij-status-icon" aria-hidden="true">✓</span>
    <h4>1. Shortlisted</h4>
    <p><strong>What it means:</strong> your profile matched and someone wants to talk or test you.</p>
    <p><strong>Signals:</strong> HR call, email with test link, interview invite, portal status “In review / Interview”.</p>
    <p><strong>Do next:</strong> reply within a few hours, confirm the slot, research the company, prepare (Chapters 9–12).</p>
  </div>
  <div class="ij-status ij-status--no">
    <span class="ij-status-icon" aria-hidden="true">✕</span>
    <h4>2. Rejected</h4>
    <p><strong>What it means:</strong> not progressing for this opening.</p>
    <p><strong>Possible reasons:</strong> missing must-have skills, eligibility rule, stronger candidates, role filled internally, budget.</p>
    <p><strong>Do next:</strong> thank them if they wrote to you, ask briefly for feedback, improve your resume, apply to other roles there later.</p>
  </div>
  <div class="ij-status ij-status--hold">
    <span class="ij-status-icon" aria-hidden="true">⏸</span>
    <h4>3. On hold</h4>
    <p><strong>What it means:</strong> you are acceptable but not first choice, or the hiring itself is paused.</p>
    <p><strong>Possible reasons:</strong> waiting for other candidates, budget approval, client project delays.</p>
    <p><strong>Do next:</strong> follow up after 2 weeks; keep interviewing elsewhere.</p>
  </div>
  <div class="ij-status ij-status--none">
    <span class="ij-status-icon" aria-hidden="true">…</span>
    <h4>4. No response</h4>
    <p><strong>What it means:</strong> the most common outcome. Usually a silent rejection, sometimes simply unread.</p>
    <p><strong>Possible reasons:</strong> hundreds of applicants, inbox overload, the role closed, wrong channel.</p>
    <p><strong>Do next:</strong> one follow-up after 7–10 working days; if nothing in 3–4 weeks, move on.</p>
  </div>
</div>
${fact("Candidates do not always receive a rejection message. Many companies only contact people they shortlist. Silence after 3–4 weeks usually means the application is not moving — it says nothing about your worth.")}

${h3("Typical response times")}
${table(
  ["Hiring type", "First response if shortlisted"],
  [
    ["Walk-in drive", "Same day (results of each round announced on the spot)"],
    ["Mass fresher hiring (IT services)", "1–6 weeks; tests in batches"],
    ["Small/mid park company", "2 days to 2 weeks"],
    ["Product company / senior role", "1–3 weeks"],
    ["Government recruitment", "Months — follows notification timelines"]
  ],
  "Typical response times"
)}
${copy(
  "Polite status check (WhatsApp / email to a known recruiter)",
  `Hi Meera, hope you're doing well. I applied for the Junior QA Engineer role on 4 Nov. Could you let me know if there's any update on my application? I'm still very interested. Thank you!`
)}
${warn("Calling HR repeatedly, sending the same email every day, or messaging the CEO on LinkedIn hurts more than it helps.")}
`
  },

  {
    id: "initial-interview",
    num: 9,
    phase: "Interviews",
    title: "Initial HR screening call",
    summary: "The first 10–20 minute call: introduction, communication, availability, location, salary and notice period.",
    time: 13,
    candidate: ["Answer calls from unknown numbers professionally while job searching", "Have your numbers ready: CTC, notice, location", "Confirm next steps before hanging up"],
    company: ["Recruiter checks basic fit and communication", "Confirms eligibility, salary range and joining time", "Decides whether to schedule tests/interviews"],
    tools: [["Interview preparation guide", "/guides/interview-preparation-kerala-it/"]],
    body: `
${h3("What the HR screen is checking")}
${cards([
  ["Introduction", "<p>Can you explain who you are in 60–90 seconds?</p>"],
  ["Experience", "<p>Does your background match what the resume says?</p>"],
  ["Communication", "<p>Clear, polite English (or the language the role needs).</p>"],
  ["Availability", "<p>When can you interview? When can you join?</p>"],
  ["Location", "<p>Can you work from the office city? Relocation?</p>"],
  ["Salary", "<p>Is your expectation within the budget?</p>"],
  ["Notice period", "<p>Immediate, 15, 30, 60 or 90 days? Negotiable?</p>"]
])}

${h3("How to handle the call")}
${ol([
  "If it’s a bad moment, say: “Thank you for calling — could I call you back in 15 minutes?” Then do it.",
  "Note the recruiter’s name, company, role and next step.",
  "Keep your resume open in front of you.",
  "Speak in short, clear sentences. Smile — it changes your voice.",
  "End with: “What are the next steps, and when should I expect to hear back?”",
  "Send a short thank-you message or email the same day."
])}

${h3("Tell me about yourself — structure")}
${flow(["Present: who you are now", "Past: education/experience that matters for this role", "Proof: one project or result", "Future: why this role"], "Self introduction structure")}
${both(
  copy(
    "Fresher self-introduction (about 60 seconds)",
    `Hi, I'm Anjali Menon. I completed my B.Tech in Computer Science from ABC College, Kochi, this year with 7.8 CGPA.

I've been focused on software testing. In my final-year project, I tested a delivery-tracking app — I wrote 120 test cases, reported bugs in Jira and checked data with SQL. I also built a small Selenium script to automate login tests.

I enjoy finding edge cases that others miss, and I'd like to start my career as a QA engineer in a product team like yours. I can join immediately and I'm based in Kakkanad.`
  ),
  copy(
    "Experienced self-introduction (about 90 seconds)",
    `Hi, I'm Rahul Nair, a Java developer with 3 years of experience at XYZ Solutions in Technopark.

I work on the payments team, building Spring Boot microservices that handle around 50,000 transactions a day. Last year I redesigned our reconciliation APIs, which cut response time from 900 ms to 250 ms, and I led a database migration with zero downtime.

I'm now looking for a role where I can work on larger distributed systems and mentor juniors, which is why this Backend Developer opening interested me. My notice period is 30 days.`
  )
)}

${h3("Sample HR screening questions and answers")}
${qa([
  ["Why are you looking for a change?", "“I’ve learned a lot in three years on the payments team, and I’m now looking for larger-scale backend work and a chance to mentor. This role offers both.”", "Positive, forward-looking; never criticise your current employer."],
  ["Why do you want to join our company?", "“I read that you build logistics software for UAE and UK clients. I tested a delivery-tracking app in my project, so the domain excites me, and your team uses Selenium and Jira, which I already know.”", "Shows research and connects your skills to their work."],
  ["What is your current CTC?", "“My current CTC is ₹6.2 LPA, fixed. There’s no variable component.”", "Be accurate — it may be checked with payslips or offer letters."],
  ["What is your expected CTC?", "Fresher: “I’ve seen the posted range is ₹2.8–3.6 LPA. I’m comfortable within that range and open to your structure.” Experienced: “Based on my experience and market range for this role, I’m expecting around ₹8–8.5 LPA. I’m open to discussing the overall package.”", "Anchor to research; give a range or a clear number; stay flexible."],
  ["What is your notice period? Can it be reduced?", "“It’s 30 days. I can request an early release if the transition plan allows; I’ll confirm once I have an offer.”", "Honest, shows willingness without over-promising."],
  ["Are you open to relocating to Kochi / working night shift?", "“Yes, I can relocate to Kochi by the joining date.” or “I prefer day shift; I can manage rotational shifts occasionally if needed.”", "A clear yes/no saves everyone time. Don’t say yes to something you won’t do."],
  ["Do you have any other offers?", "“I’m in the final round with one other company, but this role is my first preference because of the product work.”", "Truthful; creates gentle urgency without sounding like a threat."],
  ["Explain your career gap.", "“I took 8 months to prepare for GATE and complete an AWS certification. I’ve also built two projects during that time, which I can show you.”", "Brief reason + what you did productively."],
  ["When can you attend the technical round?", "“Any day this week after 4 pm, or Saturday morning. Which suits the panel?”", "Gives options — makes scheduling easy."]
])}
${warn("A genuine HR call never asks you to pay for a test, training, “document verification” or laptop. Stop the conversation if it does.")}
`
  },

  {
    id: "technical-assessment",
    num: 10,
    phase: "Interviews",
    title: "Aptitude & technical assessment",
    summary: "Online tests, coding rounds, assignments and domain tests — with real practice questions for IT and non-IT roles.",
    time: 16,
    candidate: ["Know the test format before you start", "Practise timed questions", "Use a stable internet connection and a quiet room"],
    company: ["Uses tests to filter large applicant pools fairly", "Sets cut-off scores per round"],
    tools: [["Interview preparation guide", "/guides/interview-preparation-kerala-it/"]],
    body: `
${h3("Types of assessments")}
${table(
  ["Type", "What it tests", "Common format", "Who uses it"],
  [
    ["Aptitude (quantitative)", "Percentages, ratios, time & work, speed, profit & loss", "MCQ, 20–40 questions, timed", "Mass fresher hiring, BPO, banking"],
    ["Logical reasoning", "Series, coding-decoding, syllogisms, puzzles", "MCQ", "Most fresher tests"],
    ["Verbal ability", "Grammar, reading comprehension, sentence correction", "MCQ, sometimes an email-writing task", "Support, content, IT services"],
    ["Coding test", "Writing working code for 1–3 problems", "Online editor (HackerRank, HackerEarth, Mettl, company tools)", "Software roles"],
    ["Online technical MCQ", "Language, DBMS, OS, networking basics", "MCQ", "IT services, QA"],
    ["Take-home assignment", "Build a small feature, API, design or report", "24–72 hours", "Startups, product companies, design"],
    ["Domain test", "Accounting, Excel, medical coding, HR, sales knowledge", "MCQ or practical", "Non-IT roles"],
    ["Practical task", "Typing speed, email reply, call simulation, Excel sheet", "Live, at office or walk-in", "Support, admin, data entry"]
  ],
  "Assessment types"
)}

${both(
  `${h3("Fresher focus")}${ul(["Aptitude + reasoning + basic coding/MCQ are the usual first filter.", "Speed matters: practise 20 timed questions a day for two weeks.", "Skip a hard question and come back — every question usually has equal marks.", "Check whether there is negative marking before guessing."])}`,
  `${h3("Experienced focus")}${ul(["Expect coding or a practical task close to the real job.", "Take-home assignments: follow the brief exactly, write a README, include tests.", "Clarify time limits and evaluation criteria before you start.", "Don’t do unpaid “assignments” that look like real client work taking days."])}`
)}

${h3("Practice: aptitude & reasoning (with answers)")}
${qa([
  ["A train 150 m long passes a pole in 10 seconds. What is its speed in km/h?", "Speed = 150 ÷ 10 = 15 m/s. Convert: 15 × 18/5 = <strong>54 km/h</strong>.", "To convert m/s to km/h multiply by 18/5."],
  ["Cost price ₹800, selling price ₹920. Profit percentage?", "Profit = 120. 120 ÷ 800 × 100 = <strong>15%</strong>.", "Profit % is always on cost price unless stated."],
  ["A can finish a job in 12 days and B in 18 days. Together?", "1/12 + 1/18 = 3/36 + 2/36 = 5/36 per day → 36 ÷ 5 = <strong>7.2 days</strong>.", "Add the per-day work rates."],
  ["A price rises 20% then falls 20%. Net change?", "100 → 120 → 96. <strong>4% decrease</strong>.", "Successive % changes don’t cancel."],
  ["Next number: 2, 6, 12, 20, 30, ?", "Differences: 4, 6, 8, 10 → next 12. 30 + 12 = <strong>42</strong>. (Also n × (n+1).)", "Look at differences first."],
  ["If CAT is coded as DBU, how is DOG coded?", "Each letter +1: D→E, O→P, G→H = <strong>EPH</strong>."],
  ["All developers are graduates. Some graduates are designers. Conclusion: “Some developers are designers.” Valid?", "<strong>Does not follow.</strong> The designers may be graduates who are not developers.", "Draw Venn circles for syllogisms."],
  ["Choose the correct sentence: (a) He don’t know the answer. (b) He doesn’t know the answer.", "<strong>(b)</strong> — third-person singular takes “doesn’t”."]
])}

${h3("Practice: IT technical (with answers)")}
${qa([
  ["Write a function to check whether a string is a palindrome.", "<pre><code>def is_palindrome(s):\n    s = ''.join(c.lower() for c in s if c.isalnum())\n    return s == s[::-1]\n\nis_palindrome(\"Malayalam\")  # True</code></pre>", "Handles case and spaces; mention time complexity O(n)."],
  ["Find the second highest salary from an <code>employees</code> table.", "<pre><code>SELECT MAX(salary) AS second_highest\nFROM employees\nWHERE salary &lt; (SELECT MAX(salary) FROM employees);</code></pre>", "Works even with duplicate top salaries. Alternative: DENSE_RANK()."],
  ["Find duplicate emails in a <code>users</code> table.", "<pre><code>SELECT email, COUNT(*) AS times\nFROM users\nGROUP BY email\nHAVING COUNT(*) &gt; 1;</code></pre>", "GROUP BY + HAVING is a favourite fresher question."],
  ["In JavaScript, what does <code>0.1 + 0.2 === 0.3</code> return, and why?", "<strong>false</strong>. Floating-point numbers are stored in binary, so 0.1 + 0.2 is 0.30000000000000004. Compare with a tolerance: <code>Math.abs(a - b) &lt; Number.EPSILON</code>."],
  ["Difference between <code>==</code> and <code>===</code> in JavaScript?", "<code>==</code> converts types before comparing (<code>'5' == 5</code> is true); <code>===</code> checks value and type (<code>'5' === 5</code> is false). Prefer <code>===</code>."],
  ["List vs tuple in Python?", "Lists are mutable (<code>[1, 2]</code>, can change); tuples are immutable (<code>(1, 2)</code>), slightly faster, and can be dictionary keys."],
  ["What is the bug life cycle? (QA)", "New → Assigned → Open → Fixed → Retest → Verified → Closed. Side paths: Rejected, Deferred, Duplicate, Reopened."],
  ["Write test cases for a login page. (QA)", "Valid login; wrong password; unregistered email; empty fields; password masked; SQL injection string in fields; case sensitivity; lockout after N failed attempts; “Forgot password” link; session after back button."]
])}

${h3("Practice: non-IT roles (with answers)")}
${qa([
  ["Excel: look up the price of a product code in A2 from a table on Sheet2 (codes in column A, price in column C).", "<code>=VLOOKUP(A2, Sheet2!A:C, 3, FALSE)</code> — or in newer Excel <code>=XLOOKUP(A2, Sheet2!A:A, Sheet2!C:C)</code>.", "FALSE means exact match."],
  ["Excel: total sales (column C) only for rows where city (column B) is “Kochi”.", "<code>=SUMIF(B:B, \"Kochi\", C:C)</code>"],
  ["Accounts: pass the journal entry for “Paid office rent ₹10,000 by bank”.", "Rent A/c Dr ₹10,000 · To Bank A/c ₹10,000.", "Expense debited, asset (bank) credited."],
  ["Customer support: a customer is angry that a refund is late. First response?", "“I’m sorry for the delay — I understand how frustrating that is. Let me check your refund status right now.” Then give a clear timeline and follow up.", "Acknowledge → apologise → act → give timeline."],
  ["HR role: what documents are collected at joining?", "Offer acceptance, ID and address proof, educational certificates, previous relieving/experience letters, payslips, PAN, bank details, UAN for PF, photographs."],
  ["Typing test: what speed is usually expected for data entry?", "Many employers look for about 30–40 words per minute with high accuracy; accuracy matters more than raw speed."]
])}

${h3("Online test day checklist")}
${ul([
  "Laptop charged, charger connected, stable Wi-Fi plus mobile hotspot backup.",
  "Webcam and mic working; some tests are proctored and flag tab switches.",
  "Quiet room, good light, ID card ready.",
  "Close other apps and notifications.",
  "Read instructions: total time, sections, negative marking, allowed languages."
])}
${warn("Never let someone else take your test or use AI assistance where it is prohibited. Proctoring tools record sessions, and caught candidates are blacklisted.")}
`
  },

  {
    id: "technical-interview",
    num: 11,
    phase: "Interviews",
    title: "Technical interview",
    summary: "Fundamentals, programming, frameworks, databases, projects and problem-solving — separate fresher and experienced examples.",
    time: 16,
    candidate: ["Revise fundamentals and every line on your resume", "Explain your projects end to end", "Think aloud while solving"],
    company: ["Engineer or team lead evaluates depth and problem-solving", "Scores against a rubric and recommends hire / no hire"],
    tools: [["Interview preparation guide", "/guides/interview-preparation-kerala-it/"]],
    body: `
${h3("What the panel evaluates")}
${table(
  ["Area", "What they ask", "How to prepare"],
  [
    ["Technical fundamentals", "OOP, data structures, OS, networking basics, HTTP", "Revise definitions with one example each"],
    ["Programming", "Write code live or on paper", "Practise 2–3 easy problems daily; talk while coding"],
    ["Frameworks", "React, Angular, Spring Boot, Django, .NET, Flutter", "Know the lifecycle, routing, state, how you used it"],
    ["Databases", "Joins, indexes, normalisation, transactions", "Write 10 queries by hand"],
    ["Projects", "“Walk me through your project”", "Problem → your role → architecture → challenges → result"],
    ["Real-world scenarios", "“The site is slow — what do you check?”", "Use a structured approach: reproduce, measure, isolate, fix"],
    ["Problem-solving", "Puzzles, algorithm questions", "Clarify, give a simple solution first, then optimise"],
    ["Previous experience", "Systems you built and decisions you made", "Prepare 3 stories with numbers"]
  ],
  "Technical interview areas"
)}

${h3("How to answer when you don’t know")}
${ul([
  "Say what you do know: “I haven’t used Kafka in production, but I understand it as a distributed log — producers write to topics and consumers read with offsets.”",
  "Ask a clarifying question instead of guessing silently.",
  "Never bluff — interviewers follow up until they find the edge of your knowledge."
])}

${both(
  `${h3("Fresher technical questions")}
${qa([
  ["What are the four pillars of OOP?", "Encapsulation (keep data and methods together, hide internals), Abstraction (show only essentials — e.g. an interface), Inheritance (a class reuses another — <code>Car extends Vehicle</code>), Polymorphism (same method, different behaviour — method overriding)."],
  ["Difference between an array and a linked list?", "Arrays store items in contiguous memory with O(1) index access but costly inserts in the middle. Linked lists use nodes with pointers: O(1) insert once you have the node, but O(n) access by index."],
  ["What is a primary key vs a foreign key?", "A primary key uniquely identifies each row (e.g. <code>student_id</code>). A foreign key in another table refers to it (e.g. <code>marks.student_id</code>) to link records."],
  ["Explain INNER JOIN vs LEFT JOIN.", "INNER JOIN returns only rows with matches in both tables. LEFT JOIN returns all rows from the left table, with NULLs where the right table has no match."],
  ["What happens when you type a URL in the browser?", "DNS lookup → TCP (and TLS for HTTPS) connection → HTTP request → server processes → response with HTML → browser parses and requests CSS/JS/images → renders the page."],
  ["Walk me through your final-year project.", "“We built an attendance system for our college using Django and MySQL. Problem: paper registers took 10 minutes per class. I built the backend APIs and the reports module. The hardest part was preventing duplicate marking, which we solved with a unique constraint on student + session. It’s used by three departments.”", "Problem → role → tech → challenge → result."]
])}`,
  `${h3("Experienced technical questions")}
${qa([
  ["How would you design a URL shortener?", "Requirements first (scale, custom aliases, expiry). API: POST /shorten, GET /{code}. Generate short codes using base62 encoding of an ID. Store code→URL in a key-value store with a cache in front for hot links. Add rate limiting and analytics asynchronously via a queue.", "Start simple, then scale — interviewers want trade-offs."],
  ["An API that was fast is now slow in production. How do you investigate?", "Check monitoring for when it started and what changed (deployments, traffic). Look at latency by endpoint, DB slow-query logs and missing indexes, external dependency timings, connection pool limits, memory/GC. Reproduce in staging, fix, then add an alert.", "Structured: measure → isolate → fix → prevent."],
  ["How do you ensure code quality in your team?", "Pull-request reviews with a checklist, unit and integration tests in CI, linting, small PRs, and clear definition of done. In my last team, adding PR templates and a test-coverage gate reduced production bugs by about 30% in two quarters."],
  ["Explain database indexing and when it can hurt.", "An index (typically a B-tree) speeds up lookups and sorting on indexed columns. It costs storage and slows inserts/updates, and unused or low-selectivity indexes add overhead with no benefit."],
  ["Tell me about a production incident you handled.", "Use STAR: Situation (payments failing for 20 minutes), Task (restore service), Action (identified a bad config deploy, rolled back, added config validation in CI), Result (no repeat in 12 months; wrote the post-mortem)."],
  ["Why did you choose microservices (or not) in your last project?", "Explain the context honestly: team size, deployment independence, scaling needs — and the costs: network calls, distributed tracing, data consistency. Senior candidates show they understand trade-offs."]
])}`
)}

${h3("Live coding: a winning routine")}
${ol([
  "Repeat the problem in your own words and confirm inputs/outputs.",
  "Ask about edge cases: empty input, duplicates, very large numbers.",
  "Explain a brute-force approach first.",
  "Improve it and state time/space complexity.",
  "Write clean code with meaningful names.",
  "Dry-run with a small example and fix bugs out loud."
])}
${tip("Prepare your resume line by line. Anything written there — every tool, every project — is fair game for questions.")}
`
  },

  {
    id: "managerial-round",
    num: 12,
    phase: "Interviews",
    title: "Managerial round",
    summary: "Teamwork, leadership, communication, conflict, decisions and ownership — answered with the STAR method.",
    time: 12,
    candidate: ["Prepare 5–6 real stories", "Use STAR structure", "Ask the manager smart questions"],
    company: ["Hiring manager checks team fit, ownership and judgement", "Decides if they want to work with you every day"],
    tools: [["Interview preparation guide", "/guides/interview-preparation-kerala-it/"]],
    body: `
<p>The managerial round answers one question: <em>“Do I want this person on my team?”</em> Skills got you here; judgement, attitude and communication decide this round.</p>

${h3("The STAR method")}
${cards([
  ["S — Situation", "<p>Short context: project, team, problem.</p>"],
  ["T — Task", "<p>What you were responsible for.</p>"],
  ["A — Action", "<p>What <em>you</em> did (say “I”, not just “we”).</p>"],
  ["R — Result", "<p>Outcome with a number and what you learned.</p>"]
])}

${h3("What is being evaluated")}
${table(
  ["Trait", "Typical question", "What a good answer shows"],
  [
    ["Teamwork", "Tell me about a time you helped a teammate.", "You share credit and unblock others"],
    ["Leadership", "Have you led anything without a title?", "Initiative, guiding people, owning outcomes"],
    ["Communication", "How do you update stakeholders on delays?", "Early, honest, with a plan"],
    ["Conflict handling", "Describe a disagreement with a colleague.", "Stays calm, uses facts, finds a solution"],
    ["Decision-making", "Tell me about a tough decision with incomplete data.", "Weighs options, takes responsibility"],
    ["Project ownership", "Tell me about a project you drove end to end.", "Accountability from start to delivery"],
    ["Problem-solving", "What would you do if you missed a deadline?", "Raises risk early, prioritises, learns"]
  ],
  "Managerial traits"
)}

${both(
  qa([
    ["Tell me about a time you worked in a team.", "S: In our final-year project, four of us built an attendance app. T: I handled the backend. A: When our frontend teammate fell sick before the review, I created a shared task list, paired with him on calls and wrote API docs so he could catch up. R: We demoed on time and scored an A grade; I learned to plan buffer time.", "Fresher-friendly — college projects, clubs and internships count."],
    ["Describe a mistake you made.", "In my internship I tested on the wrong build and reported 5 bugs that were already fixed. I apologised, retested on the right build within the hour, and since then I check the build number before every test run.", "Owns the mistake, shows a lasting fix."],
    ["Where do you see yourself in 3 years?", "“I want to become a strong automation engineer — owning test frameworks for a product and mentoring new testers. I see this role as the right start for that.”"]
  ]),
  qa([
    ["Tell me about a conflict with a colleague.", "S: A senior developer wanted to skip API tests to meet a release date. T: I owned release quality. A: I showed data that 40% of last quarter’s production bugs came from untested APIs and proposed testing only the 6 changed endpoints, which took 3 hours. R: We released on time with zero API defects, and the team adopted change-based testing.", "Disagree with data, propose a middle path."],
    ["How do you handle an under-performing team member?", "Talk privately first to understand the reason, set clear expectations and small goals, pair them with someone strong, check in weekly, and escalate to HR only if there’s no improvement after support.", "Fair, supportive, still accountable."],
    ["Tell me about a decision you made with incomplete information.", "During an outage I had to choose between rollback and a hotfix with only partial logs. I chose rollback because it was reversible and fastest to restore customers; we fixed forward the next day. Recovery took 12 minutes instead of an estimated hour.", "Explains reasoning and reversibility."],
    ["How do you prioritise when everything is urgent?", "I list tasks by impact and deadline, confirm the top priority with my manager, communicate what will be delayed and why, and protect focus time for the most critical item."]
  ])
)}

${h3("Questions to ask the manager")}
${ul([
  "What would success look like in the first 90 days?",
  "What are the team’s biggest challenges right now?",
  "How is work planned — sprints, Kanban, client-driven?",
  "How do you support learning and growth for people in this role?",
  "What do you enjoy most about working here?"
])}
${warn("Avoid asking only about leave, salary and work-from-home in this round. Save compensation for HR.")}
`
  }
];
