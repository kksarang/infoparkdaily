/* Placement prep — original InfoparkDaily lessons for freshers getting their first IT job.
   Company names in examples are fictional; hiring steps are described in general terms
   because exact test patterns change every year — always check the company's own careers page. */

export const PLACEMENT_TRACK = {
  key: "placement",
  name: "Placement Prep",
  long: "Placement prep — from resume and online tests to offers, CTC and avoiding job scams",
  color: "#0f766e",
  tagline: "Land your first IT job, step by step.",
  level: "Freshers",
  lang: "static",
  wrapExample: true,
  feature: "Checklists + worked examples",
  heroLine: "Practical steps for campus and off-campus hiring, written for Kerala freshers",
  exampleTitle: "Worked example",
  exampleBadge: "Adapt it to your situation",
  outputTitle: "What to notice",
  exampleNote: "Names, companies and numbers are fictional examples. Always confirm details on the employer's official site.",
  lessons: [
    {
      slug: "how-hiring-works",
      title: "How fresher hiring works",
      summary: "Campus vs off-campus hiring, the usual rounds, and how service and product companies differ.",
      body: `<p>Most freshers in India get their first IT job through one of two routes:</p>
<ul>
<li><strong>Campus hiring</strong> — the company visits (or runs an online drive for) your college through the placement cell. Eligibility rules such as minimum marks or no active backlogs are set by the company.</li>
<li><strong>Off-campus hiring</strong> — you apply directly: company careers pages, national hiring tests, job portals, referrals, walk-in drives and park job boards like Infopark, Technopark and Cyberpark.</li>
</ul>
<h3>The usual rounds</h3>
<ol>
<li><strong>Application screen</strong> — your resume and eligibility are checked, often by software (an ATS).</li>
<li><strong>Online assessment</strong> — aptitude, logical reasoning, verbal English and, for tech roles, one to three coding questions.</li>
<li><strong>Technical interview</strong> — programming basics, your projects, and core subjects such as OOP, DBMS, OS and networks.</li>
<li><strong>HR / managerial interview</strong> — communication, attitude, relocation, shifts and joining date.</li>
</ol>
<p>Not every company runs every round, and some merge technical and HR into one conversation.</p>
<h3>Service vs product companies</h3>
<p><strong>IT services</strong> companies hire freshers in large batches, train them, and place them on client projects. Selection leans on aptitude and basics. <strong>Product companies and startups</strong> hire fewer freshers and usually test coding and problem solving more deeply. Neither is "better" — many careers start in services and move later.</p>`,
      example: `Anu (B.Tech, 2026 batch) — her first 3 months of applications:

Campus:   2 drives via placement cell  → cleared 1 online test,
                                          rejected in technical round
Off-campus:
  • 25 applications on company careers pages
  • 8 applications through Infopark / Technopark job boards
  • 3 referrals from seniors on LinkedIn
  • 1 walk-in drive in Kakkanad
Result:   4 online tests → 3 interviews → 1 offer (via a referral)`,
      output: `• Offers usually come from volume plus focus: dozens of applications,
  a handful of interviews.
• Referrals and park job boards had a much better hit rate than cold
  applications — use every route, not just one.
• A rejection in one round is normal; the next company may test
  different things.`,
      points: ["Use both campus and off-campus routes.", "Typical rounds: screen → online test → technical → HR.", "Service companies test breadth; product companies test depth.", "Check each company's own careers page for its current process."],
      practice: "List ten companies you'd like to join. For each, note whether it is services, product or startup, where it is located, and the official careers page link.",
      quiz: { q: "Which round usually comes first after your application is accepted?", options: ["HR interview", "Online assessment", "Managerial round", "Offer discussion"], answer: 1, why: "Most fresher processes filter large numbers with an online test before any interview." },
      interview: [
        ["Why do you want to join a service company / a startup?", "Be honest and specific: services offer structured training and exposure to many clients; startups offer ownership and speed. Link your answer to what you want to learn in the first two years."],
        ["Are you open to relocation and shifts?", "Answer truthfully. If you have limits, say so politely with the reason — a mismatch found after joining is worse for both sides."]
      ]
    },
    {
      slug: "fresher-resume",
      title: "A one-page fresher resume that passes ATS",
      summary: "The sections, order and wording that both software filters and recruiters read easily.",
      body: `<p>Your resume is read twice: first by an <strong>Applicant Tracking System (ATS)</strong> that extracts text and matches keywords, then by a recruiter who spends well under a minute on it. Design for both.</p>
<h3>Section order for freshers</h3>
<ol>
<li><strong>Header</strong> — name, phone, email, city, LinkedIn and GitHub links as plain text.</li>
<li><strong>Summary</strong> — two or three lines: degree, target role, three to five key skills.</li>
<li><strong>Skills</strong> — a plain comma-separated list grouped by type (Languages, Frameworks, Tools).</li>
<li><strong>Projects</strong> — your strongest section as a fresher: what you built, your role, the tech used and one result.</li>
<li><strong>Internships / experience</strong> — even short ones count.</li>
<li><strong>Education</strong> — degree, college, year, and marks if they are good.</li>
<li><strong>Certifications / achievements</strong> — only relevant ones.</li>
</ol>
<h3>Rules that keep the ATS happy</h3>
<ul>
<li>One column, standard headings, no tables, text boxes or skill bars.</li>
<li>Save as a text-based PDF — never a scanned image.</li>
<li>Copy exact tool names from the job post when they are true for you ("React", not "ReactJS framework knowledge").</li>
<li>Skip photo, date of birth, father's name, religion and a "Declaration" — they waste space.</li>
</ul>
<p>Check your resume against a real job description with the <a href="/ats-checker/">InfoparkDaily ATS checker</a>, and build one in the <a href="/resume-builder/">resume builder</a>.</p>`,
      example: `PROJECTS

Job Tracker Web App                        React, Node.js, MongoDB
• Built the React frontend and login API for a 3-member team project.
• Added search and filters so users find a saved job in under 5 seconds.
• Used by 40 classmates during placement season.

Weak version of the same project:
• Did a project on job tracking using MERN stack. Worked on frontend.`,
      output: `• Strong bullets start with an action verb (Built, Added, Used by).
• They name the exact tools — the ATS can match them to a job post.
• They show your personal part in a team project.
• One number (40 users, 5 seconds) makes the work concrete.`,
      points: ["One page, one column, text PDF.", "Projects are the core section for freshers.", "Mirror exact tool names from the job post — only if true.", "Remove personal details and declarations."],
      practice: "Rewrite your two best project bullets using: action verb + what you built + tools + one result. Then run your resume against a real job post in the ATS checker.",
      quiz: { q: "Which layout is safest for ATS parsing?", options: ["Two columns with skill bars", "A single column with standard headings", "A designed image exported as PDF", "Tables for every section"], answer: 1, why: "ATS software reads text top to bottom; columns, tables and images often scramble or hide your content." },
      interview: [
        ["Walk me through your resume.", "Go in order — education, projects, internship — spending most time on the one most relevant to this job, with your role and one result."],
        ["Why is this skill on your resume? Tell me how you used it.", "Only list skills you can discuss. Answer with a specific project or task where you used it and what you learned."]
      ]
    },
    {
      slug: "linkedin-naukri",
      title: "LinkedIn and job-portal profiles recruiters find",
      summary: "Headline, skills, keywords and activity that make recruiters contact you.",
      body: `<p>Recruiters search LinkedIn and job portals with keywords, location and experience filters. If your profile doesn't contain the words they search for, you won't appear — however good you are.</p>
<h3>LinkedIn essentials</h3>
<ul>
<li><strong>Photo</strong> — clear, plain background, professional clothing.</li>
<li><strong>Headline</strong> — not just "Student". Use target role + key skills: <em>"Aspiring Java Developer | Spring Boot, SQL, Git | B.Tech 2026"</em>.</li>
<li><strong>About</strong> — four or five lines: what you do, what you've built, what you're looking for.</li>
<li><strong>Skills</strong> — add the exact tools from job posts you target; ask classmates to endorse the top three.</li>
<li><strong>Projects and certificates</strong> — with GitHub or live links.</li>
<li><strong>Open to work</strong> — set role titles and locations (Kochi, Trivandrum, Bengaluru, remote).</li>
</ul>
<h3>Job portals</h3>
<p>On portals, keep your profile complete and updated: many portals rank recently updated profiles higher in recruiter searches. Fill the "key skills" field with real tools, set preferred locations, and upload the same resume you use elsewhere.</p>
<p>Being active helps: share a project you built or a short note on something you learned, and comment thoughtfully on posts from people in roles you want.</p>`,
      example: `Before:  "Student at ABC College of Engineering"

After:   "Aspiring Frontend Developer | React, JavaScript, Tailwind |
          B.Tech CSE 2026 | Open to Kochi & Bengaluru"

About (after):
"Final-year CSE student who enjoys building fast, accessible web apps.
I've built a job-tracker app (React + Node) used by 40 classmates and
contributed bug fixes to an open-source UI library. Looking for a
frontend or full-stack fresher role from July 2026."`,
      output: `• The new headline contains the words recruiters type: role, React,
  JavaScript, location.
• The About section gives proof (a project with users, open source)
  instead of adjectives like "hard-working".
• It states availability, which recruiters filter on.`,
      points: ["Headline = target role + key skills.", "Use the exact tool names recruiters search for.", "Keep job-portal profiles updated regularly.", "Show proof: projects, links, numbers."],
      practice: "Rewrite your LinkedIn headline and About section using the pattern above. Search LinkedIn for your target role in your city and compare your profile with three people already in that job.",
      quiz: { q: "Why does a keyword-rich headline matter?", options: ["It looks more professional", "Recruiters search profiles by keywords, so it helps you appear in results", "LinkedIn requires it", "It increases connections automatically"], answer: 1, why: "Recruiter searches match keywords; your headline and skills are heavily weighted." },
      interview: [
        ["How do you keep your skills up to date?", "Mention a concrete habit — a weekly project, a course you finished, newsletters or communities you follow — and one thing you learned recently."],
        ["Can you share your GitHub or portfolio?", "Have a clean link ready. Pin your two best repositories with a README that explains what the project does and how to run it."]
      ]
    },
    {
      slug: "online-assessment",
      title: "Online assessments: aptitude, coding and proctoring",
      summary: "What online tests contain, how to manage time, and rules you must not break.",
      body: `<p>Online assessments filter large applicant pools, so the goal is to clear the cut-off, not to score 100%. They usually contain some of these sections:</p>
<ul>
<li><strong>Quantitative aptitude</strong> — percentages, ratios, time and work, speed and distance, interest. Practise in the <a href="/learning/aptitude/">Aptitude track</a>.</li>
<li><strong>Logical reasoning</strong> — series, coding-decoding, arrangements, syllogisms.</li>
<li><strong>Verbal ability</strong> — grammar, reading comprehension, sentence correction.</li>
<li><strong>Coding</strong> — one to three problems in a language of your choice, checked against hidden test cases. Practise in the <a href="/learning/dsa/">DSA track</a>.</li>
<li><strong>Technical MCQs</strong> — output of short code, OOP, DBMS and OS basics.</li>
</ul>
<h3>Time strategy</h3>
<ol>
<li>Read the rules first: is there negative marking? Can you return to a question?</li>
<li>Do one pass answering what you know quickly; mark the rest.</li>
<li>In coding, first write a simple correct solution that passes basic cases, then optimise if time remains — partial test-case credit is common.</li>
</ol>
<h3>Proctoring rules</h3>
<p>Many tests use webcam and screen monitoring. Use a quiet room, a charged laptop and a stable connection; don't switch tabs, use a second device or have someone help. Violations can disqualify you from that company for a long period.</p>`,
      example: `Coding question: "Return the second largest distinct number in a list."

Step 1 — simple and correct (passes most cases):
  sort the distinct values, return the second last

Step 2 — handle edge cases the hidden tests will try:
  • list with one element        → return -1 (as the problem states)
  • all elements equal           → return -1
  • negative numbers             → still works

Step 3 — only if time remains: single pass, O(n), no sorting`,
      output: `• Getting a correct answer first secures partial or full marks.
• Hidden test cases almost always include edge cases — empty, single
  element, duplicates, negatives. Read the constraints for them.
• Optimise last; an elegant solution that fails edge cases scores less.`,
      points: ["Aim to clear the cut-off, not to be perfect.", "Check negative marking before guessing.", "Correct first, then edge cases, then optimise.", "Follow proctoring rules strictly."],
      practice: "Take a timed 30-minute aptitude set from the Aptitude track, then one coding problem from the DSA track in 25 minutes. Note which topics cost you the most time.",
      quiz: { q: "In a coding test with hidden test cases, what should you do first?", options: ["Write the most optimised solution", "Write a simple correct solution, then handle edge cases", "Skip coding and do MCQs", "Copy a template from memory without reading constraints"], answer: 1, why: "A correct solution with edge cases handled usually earns most of the marks; optimise only after that." },
      interview: [
        ["Your test score was average. Why should we move you forward?", "Acknowledge it briefly, then point to evidence of your ability — projects, a skill you've improved since, or how you solve problems — without making excuses."],
        ["Which language did you use in the coding round and why?", "Name it and give a practical reason: you know its standard library well, it's what you used in projects, or it suits the problem."]
      ]
    },
    {
      slug: "technical-interview",
      title: "The technical interview: what freshers are asked",
      summary: "A checklist of core subjects and how to answer when you don't know something.",
      body: `<p>Fresher technical interviews mostly check fundamentals and whether you really did your projects. Expect questions from these areas:</p>
<ul>
<li><strong>Your main language</strong> — data types, loops, functions, strings, collections, exceptions. Be ready to write small programs on paper or a shared editor.</li>
<li><strong>OOP</strong> — class vs object, encapsulation, inheritance, polymorphism, abstraction, with a small example of each.</li>
<li><strong>DBMS & SQL</strong> — keys, normalisation, joins, GROUP BY, and writing simple queries. See the <a href="/learning/sql/">SQL track</a>.</li>
<li><strong>Operating systems</strong> — process vs thread, deadlock, memory basics.</li>
<li><strong>Networks</strong> — what happens when you type a URL, HTTP vs HTTPS, IP and DNS basics.</li>
<li><strong>Data structures</strong> — arrays, strings, stacks, queues, linked lists, hash maps; time complexity in big-O.</li>
<li><strong>Your projects</strong> — the deepest questions come from here.</li>
</ul>
<h3>When you don't know</h3>
<p>Say so honestly, then reason aloud: "I haven't used that, but I think it works like ... because ...". Interviewers value clear thinking and honesty more than a bluff they will detect immediately.</p>
<h3>Thinking aloud while coding</h3>
<p>Repeat the problem in your words, ask about edge cases, describe your approach before typing, then test your code with a small example.</p>`,
      example: `Interviewer: "What's the difference between an abstract class and an
interface in Java?"

Candidate:
"Both define behaviour that other classes implement. An abstract
class can hold state — fields — and constructors, and a class can
extend only one. An interface mainly defines a contract; a class can
implement many interfaces. In my project I used an interface,
PaymentMethod, so that UPI and card payments could be swapped
without changing the checkout code."`,
      output: `• Starts with what they have in common, then the differences.
• Gives the key practical rule (single vs multiple inheritance).
• Ends with a real example from the candidate's own project — this
  is what turns a textbook answer into a strong one.`,
      points: ["Revise OOP, DBMS, OS, networks and DS basics.", "Expect deep questions on your own projects.", "Say 'I don't know' honestly, then reason aloud.", "Explain your approach before you code."],
      practice: "For each topic in the list, write a one-paragraph answer in your own words with an example from your projects or daily life. Explain two of them aloud to a friend.",
      quiz: { q: "You're asked about a concept you've never used. What's the best response?", options: ["Bluff confidently", "Stay silent", "Say you haven't used it, then reason about how it might work", "Change the topic to your project"], answer: 2, why: "Honesty plus visible reasoning shows how you think — which is what the interviewer is assessing." },
      interview: [
        ["What happens when you type a URL in the browser?", "DNS lookup to find the IP, a TCP (and TLS for HTTPS) connection, an HTTP request, the server's response, and the browser parsing HTML and loading CSS/JS. Go deeper only where asked."],
        ["Explain time complexity with an example.", "It describes how running time grows with input size. Searching an unsorted array is O(n); binary search on a sorted array is O(log n) because it halves the range each step."]
      ]
    },
    {
      slug: "explain-your-project",
      title: "Explaining your final-year project",
      summary: "A two-minute structure, the follow-up questions to expect, and how to show your own contribution.",
      body: `<p>For freshers, the project discussion is often the longest part of the technical round. Interviewers use it to check whether you understand what you built — and what <em>you</em> personally did.</p>
<h3>A two-minute structure</h3>
<ol>
<li><strong>Problem</strong> — what problem it solves and for whom (one or two lines).</li>
<li><strong>Solution</strong> — what the system does, in plain words.</li>
<li><strong>Tech stack and architecture</strong> — frontend, backend, database, and how they talk to each other.</li>
<li><strong>Your role</strong> — the parts you built yourself.</li>
<li><strong>A challenge</strong> — one difficult problem and how you solved it.</li>
<li><strong>Result and next steps</strong> — users, accuracy, speed, and what you'd improve.</li>
</ol>
<h3>Follow-ups to prepare for</h3>
<ul>
<li>Why did you choose this database / framework?</li>
<li>Draw the tables or the flow of a request.</li>
<li>How did you handle login and passwords?</li>
<li>What happens if 1,000 users use it at once?</li>
<li>What would you do differently now?</li>
</ul>`,
      example: `"Our project is a hostel complaint system for our college.
Students used to report problems on paper, and complaints got lost.

We built a web app where students log complaints with a photo, and
wardens track and close them. It uses React on the frontend, a
Node.js and Express API, and MySQL.

I built the complaint API and the database design — four tables:
students, rooms, complaints and status updates.

The tricky part was duplicate complaints for the same broken fan.
I added a check that groups open complaints by room and category,
which cut duplicates by about half.

It ran in our hostel for six weeks with around 300 complaints.
Next, I'd add notifications so students know when a complaint closes."`,
      output: `• Follows problem → solution → stack → role → challenge → result.
• Clearly separates "we" (the team) from "I" (personal work).
• The challenge shows real problem solving, not just feature lists.
• Numbers (four tables, six weeks, ~300 complaints) add credibility.`,
      points: ["Problem → solution → stack → your role → challenge → result.", "Be clear about what you personally built.", "Prepare to draw the architecture and tables.", "Know why you chose each technology."],
      practice: "Write and time your two-minute project explanation. Then answer the five follow-up questions above in writing, and draw your system's architecture on one page.",
      quiz: { q: "What do interviewers most want to learn from your project discussion?", options: ["How many features it had", "Whether you understand it and what you personally contributed", "Which college guide approved it", "How long the report was"], answer: 1, why: "They are checking real understanding and your own contribution, which predicts how you'll work on the job." },
      interview: [
        ["What was the hardest bug you faced in your project?", "Describe the symptom, how you investigated (logs, breakpoints, isolating the cause), the fix, and what you learned. Keep it specific."],
        ["If you rebuilt your project today, what would you change?", "Show growth: mention a design decision you'd improve, such as validation, security, tests or a better database design, and why."]
      ]
    },
    {
      slug: "off-campus-plan",
      title: "A 30-day off-campus job search plan",
      summary: "A weekly routine for applications, referrals, skill building and tracking.",
      body: `<p>Off-campus searching works best as a routine, not a burst of random applications. A simple 30-day plan:</p>
<h3>Week 1 — set up</h3>
<ul>
<li>Pick one or two target roles (for example Java developer, QA engineer, data analyst).</li>
<li>Prepare one tailored resume per role and check it with the <a href="/ats-checker/">ATS checker</a>.</li>
<li>Update LinkedIn and job-portal profiles; pin two projects on GitHub.</li>
<li>Create a tracker: company, role, link, date applied, status, follow-up date.</li>
</ul>
<h3>Weeks 2–4 — daily routine (about two hours)</h3>
<ul>
<li><strong>Apply</strong> to three to five fresh, relevant openings — company careers pages first, then park job boards and portals. Check <a href="/jobs/">InfoparkDaily jobs</a> for verified listings.</li>
<li><strong>Network</strong> — one or two polite referral requests to alumni or employees.</li>
<li><strong>Practise</strong> — one aptitude set or one coding problem.</li>
<li><strong>Follow up</strong> on applications older than a week where you have a contact.</li>
</ul>
<h3>Every weekend</h3>
<p>Review your tracker: which sources gave tests or interviews? Spend more time there and less on sources that never reply.</p>`,
      example: `Referral request (LinkedIn message, under 100 words):

"Hi Rahul, I'm Anu, a 2026 B.Tech CSE graduate from Kochi. I saw that
Example Tech is hiring a Junior Java Developer (job ID 4521). I've built
a Spring Boot + MySQL inventory app and completed a 2-month backend
internship. Would you be open to referring me if my profile fits? I've
attached my resume and the job link. Thank you for your time!"

Tracker row:
Example Tech | Junior Java Dev | careers link | 12 Nov | Referred | 19 Nov`,
      output: `• The message is short, specific (job ID), and shows proof of fit.
• It makes the request easy: resume and link are already attached.
• The tracker turns a stressful search into a measurable routine —
  you'll know where interviews actually come from.`,
      points: ["Choose one or two target roles.", "Apply to a few relevant openings daily, not hundreds at once.", "Ask for referrals politely with the job ID and resume.", "Track everything and review weekly."],
      practice: "Build your tracker today and add 15 suitable openings. Send two referral requests using the template, adapted to your real profile.",
      quiz: { q: "What makes a referral request most likely to get a reply?", options: ["A long message about your life story", "A short, specific message with the job ID, proof of fit and your resume", "Asking for any job at the company", "Messaging dozens of employees the same text"], answer: 1, why: "A short, specific request is easy to act on; vague or copy-pasted messages are usually ignored." },
      interview: [
        ["You graduated six months ago. What have you been doing?", "Be honest and show progress: courses, projects, freelance work, certifications or family responsibilities — and what you learned."],
        ["How did you hear about this role?", "Name the actual source. If it's a referral, mention the person; if a careers page, say what attracted you to the role."]
      ]
    },
    {
      slug: "offer-ctc-in-hand",
      title: "Offer letters, CTC and in-hand salary",
      summary: "Read an offer letter, understand CTC vs take-home pay, and check bonds and notice periods.",
      body: `<p>An offer's headline number is usually the <strong>CTC (cost to company)</strong> — everything the company spends on you in a year. Your monthly <strong>in-hand (take-home)</strong> pay is lower because CTC includes items you don't receive as monthly cash.</p>
<h3>What CTC often includes</h3>
<ul>
<li><strong>Basic salary</strong> and allowances (HRA, special allowance) — paid monthly.</li>
<li><strong>Employer's PF contribution</strong> — goes to your provident fund account, not your bank.</li>
<li><strong>Gratuity</strong> — paid only after you complete the eligible years of service.</li>
<li><strong>Variable pay / bonus</strong> — depends on performance; may be paid yearly or quarterly.</li>
<li><strong>Insurance</strong> and one-time joining bonuses.</li>
</ul>
<p>From the monthly gross, deductions such as your own <strong>PF contribution</strong>, <strong>professional tax</strong> (a small state tax) and any <strong>income tax</strong> (TDS) are taken. Ask HR for the salary break-up if it isn't in the letter.</p>
<h3>Check before you accept</h3>
<ul>
<li>Role, location, joining date and probation period.</li>
<li><strong>Service agreements / bonds</strong> — the amount, the period, and what happens if you leave early. Read them carefully.</li>
<li>Notice period after confirmation.</li>
<li>The offer comes from an official company email domain — never pay any fee to receive or confirm an offer.</li>
</ul>
<p>More detail: <a href="/guides/offer-letter-notice-period-guide/">offer letter and notice period guide</a>.</p>`,
      example: `Fictional offer: CTC ₹4,20,000 per year

Annual CTC break-up (example)
  Basic                     1,68,000
  HRA                         84,000
  Special allowance         1,27,840
  Employer PF (12% of basic)  20,160
  Gratuity provision          ... included only in some letters
                            ---------
  CTC                       4,20,000

Monthly (approx.)
  Gross cash  = (1,68,000 + 84,000 + 1,27,840) / 12  ≈ 31,650
  − Employee PF (12% of basic) = 14,000 × 12%        ≈  1,680
  − Professional tax (state rules)                   ≈    200
  − Income tax (often nil at this level; check the current year's rules)
  In-hand                                            ≈ 29,800`,
      output: `• In-hand (~₹29,800) is clearly less than CTC ÷ 12 (₹35,000).
• Employer PF is part of CTC but goes to your PF account, not salary.
• Exact deductions depend on the company's structure and the tax
  rules for the year — always ask HR for your own break-up.`,
      points: ["CTC is not your monthly take-home.", "Ask for the salary break-up.", "Read bond and notice-period clauses carefully.", "Real offers never ask you to pay a fee."],
      practice: "Take any offer or a sample break-up and calculate the monthly in-hand: gross cash ÷ 12, minus employee PF, professional tax and estimated tax.",
      quiz: { q: "Why is in-hand salary lower than CTC ÷ 12?", options: ["Companies keep part of your salary", "CTC includes items like employer PF and variable pay, and deductions apply to your gross", "In-hand includes your bonus", "CTC is a monthly figure"], answer: 1, why: "CTC counts all employer costs, some of which are not monthly cash, and your gross pay has PF and tax deductions." },
      interview: [
        ["What are your salary expectations?", "Research the market range for the role and city, give a realistic range, and add that you're open to discussion based on the full offer and learning opportunity."],
        ["Can you join in two weeks?", "Answer based on your real situation: notice period, exams, relocation. If you need more time, explain why and propose a date."]
      ]
    },
    {
      slug: "avoid-job-scams",
      title: "Spotting fake jobs and paid-placement scams",
      summary: "Warning signs of job fraud and how to verify an opening before you share any details.",
      body: `<p>Fake job offers target freshers because they are eager and inexperienced with hiring. The single most important rule: <strong>a genuine employer never asks you to pay for a job, interview, training, laptop, uniform or "registration".</strong></p>
<h3>Warning signs</h3>
<ul>
<li>A fee for anything before or after selection — "refundable" deposits included.</li>
<li>An offer without any interview, or after a short chat on a messaging app.</li>
<li>Emails from free email services instead of the company's own domain, or domains with small spelling changes.</li>
<li>Pressure: "only today", "limited seats", "confirm in 2 hours".</li>
<li>Salary far above the market for a fresher with no experience required.</li>
<li>Requests for bank OTPs, card details, or Aadhaar/PAN copies before any formal offer.</li>
<li>"Work from home" tasks that pay small amounts first, then ask you to "invest" to earn more.</li>
</ul>
<h3>How to verify</h3>
<ol>
<li>Find the job on the company's <strong>official careers page</strong> — search for the role yourself; don't trust links in the message.</li>
<li>Check the sender's email domain against the company's website.</li>
<li>Look up the recruiter on LinkedIn and confirm they work at the company.</li>
<li>Call the company's official number from its website if unsure.</li>
</ol>
<p>Report cyber fraud at the national cybercrime portal or by calling the cybercrime helpline 1930. Read more: <a href="/guides/verify-jobs-before-you-apply/">verify jobs before you apply</a>.</p>`,
      example: `Message received on WhatsApp:

"Congratulations! You are selected for Data Entry Executive at
 [Big IT Company]. Salary ₹45,000/month, work from home.
 Pay ₹2,500 refundable registration fee to confirm your slot today.
 Contact HR: bigitcompany.hr@gmail.com"

Red flags:
  1. Selected without any application or interview
  2. ₹45,000 for data entry with no experience — too good to be true
  3. A fee, called "refundable"
  4. Gmail address, not the company's domain
  5. "Today" — artificial urgency`,
      output: `• Five separate red flags — any one of them is enough to stop.
• The fix is simple: don't pay, don't share documents or OTPs, and
  check the official careers page yourself.
• Warn your friends — these messages are usually forwarded widely.`,
      points: ["Never pay for a job, training or registration.", "Verify on the official careers page yourself.", "Check the email domain and the recruiter's identity.", "Report fraud on helpline 1930 or the cybercrime portal."],
      practice: "Take any job message you've received recently and check it against the warning signs. Then find the same company's official careers page and see whether the role is listed there.",
      quiz: { q: "A recruiter asks for a ₹1,500 'refundable security deposit' to confirm your offer. What should you do?", options: ["Pay it — it's refundable", "Negotiate a lower amount", "Refuse and verify the offer on the official careers page", "Pay half now and half later"], answer: 2, why: "Genuine employers don't charge fees. Treat any payment request as a scam until verified through official channels." },
      interview: [
        ["How did you verify this job opening?", "Mention that you found it on the official careers page or a trusted source, and checked the company website — it shows care and professionalism."],
        ["Do you have any questions about the hiring process?", "Ask about the remaining rounds, timeline and onboarding steps — a genuine recruiter will answer clearly."]
      ]
    },
    {
      slug: "follow-up-and-rejection",
      title: "Follow-ups, rejections and trying again",
      summary: "When and how to follow up, how to ask for feedback, and how to improve after a no.",
      body: `<p>Most applications end in silence or a rejection — that's normal for everyone. What matters is following up professionally and improving each time.</p>
<h3>Following up</h3>
<ul>
<li>After an interview, send a short thank-you email the same day, mentioning one thing you discussed.</li>
<li>If the recruiter gave a timeline, wait until it passes, then send one polite follow-up.</li>
<li>Follow up at most twice. After that, move on and keep applying.</li>
</ul>
<h3>After a rejection</h3>
<ol>
<li>Reply politely and thank them — recruiters remember courteous candidates for future roles.</li>
<li>Ask for one or two points of feedback; some will share.</li>
<li>Write your own notes immediately: which questions went well, which didn't.</li>
<li>Turn the weak areas into a one-week practice plan.</li>
<li>Check the company's re-application rules — many allow you to apply again after a waiting period.</li>
</ol>`,
      example: `Thank-you email (same day):

Subject: Thank you — Junior QA Engineer interview

"Dear Ms. Priya,
Thank you for speaking with me today about the Junior QA Engineer
role. I enjoyed discussing how your team tests the mobile banking app,
especially the regression suite you're automating. I'm excited about
the chance to contribute to it.
Best regards,
Anu Kumar | +91 98xxx xxxxx"

Follow-up (after the promised date has passed):
"Dear Ms. Priya, I wanted to check whether there's any update on the
Junior QA Engineer role. I'm still very interested. Thank you!"`,
      output: `• Both emails are short, polite and specific to the conversation.
• The thank-you mentions a real detail, showing genuine interest.
• The follow-up waits for the promised timeline and doesn't pressure.`,
      points: ["Send a thank-you email the same day.", "Follow up once after the promised timeline, at most twice.", "Ask for feedback politely after a rejection.", "Turn every rejection into a short practice plan."],
      practice: "After your next interview, write down every question asked within an hour. Mark each as strong, okay or weak, and plan practice for the weak ones.",
      quiz: { q: "When is the right time for a follow-up email after an interview?", options: ["Every day until they reply", "After the timeline the recruiter gave has passed", "Immediately after the interview, asking for the result", "Never"], answer: 1, why: "Waiting for the stated timeline is respectful; one polite follow-up after it is professional." },
      interview: [
        ["Tell me about a time you failed.", "Use STAR: a real setback, what you did, and — most importantly — what you learned and changed afterwards."],
        ["You applied here before. What has changed since?", "Point to concrete improvements: new skills, projects, certifications or experience gained since your last application."]
      ]
    }
  ]
};
