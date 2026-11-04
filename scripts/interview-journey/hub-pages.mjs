/* /interview/ hub overview + learning, email guide and resume/ATS detail pages. */
import { esc, ul, ol, tip, warn, fact, table, copy, cards, ext } from "./helpers.mjs";
import { pageShell, hubNav, hubRelated, crumbs, crumbsLd, ILLUS, HUB, ASSET_V } from "./shell.mjs";

const HUB_JS = `/js/interview-hub.js?v=${ASSET_V}`;
const hubCrumb = [["InfoparkDaily", "/"], ["Interview hub", "/interview/"]];

const detailHero = (key, items, badge, h1a, h1b, lede, extra = "") => `
      <section class="ij-hero hub-detail-hero" aria-labelledby="${key}-title">
        <div class="ij-wrap hub-detail-grid">
          <div>
            ${crumbs(items)}
            <p class="ij-badge-hero"><b>${badge}</b> ${HUB.find((h) => h.key === key)?.title || ""}</p>
            <h1 id="${key}-title">${h1a}<br /><span>${h1b}</span></h1>
            <p class="ij-lede">${lede}</p>
            ${extra}
          </div>
          <div class="hub-detail-art">${ILLUS[key]}</div>
        </div>
      </section>`;

/* =====================================================================
   LEARNING /interview/learning/
   ===================================================================== */
const ROADMAPS = [
  ["Software developer", ["Programming basics in one language (Java, Python or JavaScript)", "Data structures: arrays, strings, hash maps, stacks, queues", "OOP and Git", "SQL and one database", "One framework (Spring Boot, Django, React, Node.js)", "Build and deploy 2–3 projects"], "/interview/questions/#q-java"],
  ["QA / software tester", ["Testing fundamentals: STLC, test cases, bug life cycle", "Jira and test management", "SQL for data checks", "API testing with Postman", "Selenium/Playwright with Java or Python", "ISTQB Foundation (optional)"], "/interview/questions/#q-manual-testing"],
  ["Data analyst", ["Excel: formulas, pivot tables, lookups", "SQL: joins, GROUP BY, window functions", "Power BI or Tableau dashboards", "Basic statistics", "Python with pandas (optional)", "Portfolio: 3 dashboards with real datasets"], "/interview/questions/#q-data-analyst"],
  ["Frontend / web", ["HTML semantics and accessibility", "CSS layout: flexbox, grid, responsive", "JavaScript fundamentals", "React (components, hooks, state)", "Calling APIs, Git, deployment", "Portfolio site + 2 apps"], "/interview/questions/#q-react"],
  ["Mobile developer", ["Dart + Flutter or Kotlin + Android", "Layouts, navigation and state", "REST APIs and local storage", "Firebase basics", "Publish a test app", "Architecture (MVVM / BLoC)"], "/interview/questions/#q-flutter"],
  ["DevOps / cloud", ["Linux commands and networking basics", "Git and CI (GitHub Actions/Jenkins)", "Docker", "One cloud (AWS or Azure) fundamentals", "Kubernetes basics", "Infrastructure as Code (Terraform)"], "/interview/questions/#q-devops-cloud"],
  ["Accounts / finance", ["Accounting principles and journal entries", "Tally Prime", "GST and TDS basics", "Bank reconciliation", "Excel for finance", "Zoho Books (useful)"], "/interview/questions/#q-accounts"],
  ["Digital marketing", ["Marketing basics and funnels", "SEO fundamentals", "Google Ads and Meta Ads", "Google Analytics", "Content and social media", "Portfolio of campaigns or a blog"], "/interview/questions/#q-digital-marketing"]
];

const PLATFORMS = [
  ["NPTEL", "https://nptel.ac.in/", "IIT/IISc courses with proctored certification exams", "Engineering, CS, management", "Free to learn; exam fee for certificate"],
  ["SWAYAM", "https://swayam.gov.in/", "Government of India MOOC platform", "UG/PG subjects, skills", "Free; some exams paid"],
  ["freeCodeCamp", "https://www.freecodecamp.org/learn/", "Project-based web development and Python", "Web, JavaScript, Python, data", "Free certifications"],
  ["Microsoft Learn", "https://learn.microsoft.com/en-us/training/", "Azure, .NET, Power BI learning paths", "Cloud, data, .NET", "Free; certification exams paid"],
  ["AWS Skill Builder", "https://skillbuilder.aws/", "AWS training including Cloud Practitioner prep", "Cloud", "Many free courses"],
  ["Google Cloud Skills", "https://cloud.google.com/learn/training", "Google Cloud training and labs", "Cloud, data, AI", "Free and paid"],
  ["Cisco Networking Academy", "https://www.netacad.com/", "Networking, cybersecurity and IT essentials", "Networking, security", "Many free courses"],
  ["Kaggle Learn", "https://www.kaggle.com/learn", "Short hands-on data science lessons", "Python, ML, SQL", "Free"],
  ["HubSpot Academy", "https://academy.hubspot.com/", "Marketing, sales and service courses", "Marketing, sales", "Free certificates"],
  ["Infosys Springboard", "https://infyspringboard.onwingspan.com/", "Infosys’ learning platform for students and job seekers", "Tech and soft skills", "Free"],
  ["Great Learning Academy", "https://www.mygreatlearning.com/academy", "Short courses across tech and business", "Tech, business", "Free courses"],
  ["Coursera", "https://www.coursera.org/", "University and industry courses", "All", "Audit options; financial aid available"],
  ["MDN Web Docs", "https://developer.mozilla.org/en-US/docs/Learn", "The reference for HTML, CSS and JavaScript", "Web", "Free"],
  ["W3Schools", "https://www.w3schools.com/", "Quick syntax tutorials and examples", "Web, SQL, Python", "Free to learn"],
  ["HackerRank", "https://www.hackerrank.com/", "Coding practice used in many hiring tests", "Coding, SQL", "Free practice"],
  ["LeetCode", "https://leetcode.com/", "Data structures and algorithms practice", "Coding interviews", "Free tier"],
  ["IndiaBIX", "https://www.indiabix.com/", "Aptitude and reasoning practice questions", "Aptitude", "Free"],
  ["ISTQB", "https://www.istqb.org/", "Software testing certification body", "QA", "Exam fee"],
  ["Enitexa.ai Learning", "https://sarangrajan.in/enitexa.ai/learning/", "Guided learning resources from Enitexa.ai", "Development and career skills", "See site"]
];

const KERALA = [
  ["ICT Academy of Kerala", "https://ictkerala.org/", "Industry-oriented IT skilling programmes in Kerala"],
  ["ASAP Kerala", "https://asapkerala.gov.in/", "Additional Skill Acquisition Programme — skill courses and community skill parks"],
  ["Kerala Knowledge Economy Mission", "https://knowledgemission.kerala.gov.in/", "State mission connecting job seekers with skilling and employers"]
];

export function learningPage() {
  const items = [...hubCrumb, ["Learning & skills", "/interview/learning/"]];
  const main = `
${detailHero("learning", items, "03", "Learn the skills", "interviews test.", "Technical roadmaps by role, communication skills, free courses and certifications — so you walk into interviews prepared.")}
${hubNav("learning")}
      <section class="ij-section enx-section" id="enitexa" aria-labelledby="enx-title">
        <div class="ij-wrap">
          <div class="enx">
            <div class="enx-copy">
              <span class="enx-badge">Featured learning partner</span>
              <h2 id="enx-title">Learn with Enitexa.ai</h2>
              <p>Guided learning for developers and job seekers from Enitexa.ai — build the skills that interviews test, then come back here to practise with live code and real interview questions.</p>
              <ul class="enx-points">
                <li>Structured learning for development skills</li>
                <li>Practical, project-focused lessons</li>
                <li>Pairs with the live code playground below</li>
              </ul>
              <div class="ij-hero-cta">
                <a class="ij-btn ij-btn--yellow" href="https://sarangrajan.in/enitexa.ai/learning/" target="_blank" rel="noopener">Open Enitexa.ai Learning <span aria-hidden="true">↗</span></a>
                <a class="ij-btn ij-btn--ghost hub-ghost-dark" href="#playground">Try live code</a>
              </div>
            </div>
            <div class="enx-art" aria-hidden="true">
              <div class="enx-window">
                <div class="enx-bar"><span></span><span></span><span></span><em>learning.js</em></div>
                <pre><code><b>const</b> skills = [<i>"JavaScript"</i>, <i>"SQL"</i>, <i>"Python"</i>];
<b>for</b> (<b>const</b> s <b>of</b> skills) {
  console.log(<i>\`Practising \${s}…\`</i>);
}
<u>// → Interview ready ✓</u></code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="ij-section ij-section--soft" id="playground" aria-labelledby="pg-title">
        <div class="ij-wrap">
          <div class="ij-head">
            <p class="ij-eyebrow">Live code playground</p>
            <h2 id="pg-title">Write code. Run it. See the result.</h2>
            <p>Practise interview problems right here — HTML/CSS/JS with live preview, a JavaScript console, SQL on a sample employees database, and Python. Your code runs only in your browser. Press <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>Enter</kbd> to run.</p>
          </div>
          <div class="pg" data-playground>
            <div class="pg-tabs" role="tablist" aria-label="Language">
              <button type="button" role="tab" data-pg-tab="web" aria-selected="true">HTML · CSS · JS</button>
              <button type="button" role="tab" data-pg-tab="js" aria-selected="false">JavaScript</button>
              <button type="button" role="tab" data-pg-tab="sql" aria-selected="false">SQL</button>
              <button type="button" role="tab" data-pg-tab="py" aria-selected="false">Python</button>
            </div>

            <div class="pg-panel" role="tabpanel" data-pg-panel="web">
              <div class="pg-toolbar">
                <label>Example <select data-web-ex></select></label>
                <div class="pg-files" role="group" aria-label="File">
                  <button type="button" data-web-file="html" aria-pressed="true">HTML</button>
                  <button type="button" data-web-file="css" aria-pressed="false">CSS</button>
                  <button type="button" data-web-file="js" aria-pressed="false">JS</button>
                </div>
                <span class="pg-spacer"></span>
                <button type="button" class="pg-btn pg-btn--ghost" data-web-reset>Reset</button>
                <button type="button" class="pg-btn" data-web-run>Run ▶</button>
              </div>
              <div class="pg-split">
                <div class="pg-editor-wrap">
                  <textarea class="pg-editor" data-web="html" spellcheck="false" aria-label="HTML code"></textarea>
                  <textarea class="pg-editor" data-web="css" spellcheck="false" aria-label="CSS code" hidden></textarea>
                  <textarea class="pg-editor" data-web="js" spellcheck="false" aria-label="JavaScript code" hidden></textarea>
                </div>
                <div class="pg-preview"><p class="pg-out-label">Preview</p><iframe data-web-frame title="Live preview" sandbox="allow-scripts allow-modals"></iframe></div>
              </div>
            </div>

            <div class="pg-panel" role="tabpanel" data-pg-panel="js" hidden>
              <div class="pg-toolbar">
                <label>Example <select data-js-ex></select></label>
                <span class="pg-spacer"></span>
                <button type="button" class="pg-btn pg-btn--ghost" data-js-clear>Clear</button>
                <button type="button" class="pg-btn" data-js-run>Run ▶</button>
              </div>
              <div class="pg-split">
                <div class="pg-editor-wrap"><textarea class="pg-editor" data-js-code spellcheck="false" aria-label="JavaScript code"></textarea></div>
                <div class="pg-console"><p class="pg-out-label">Console</p><div class="pg-out" data-js-out aria-live="polite"></div></div>
              </div>
            </div>

            <div class="pg-panel" role="tabpanel" data-pg-panel="sql" hidden>
              <div class="pg-toolbar">
                <label>Example <select data-sql-ex></select></label>
                <span class="pg-spacer"></span>
                <button type="button" class="pg-btn pg-btn--ghost" data-sql-reset>Reset data</button>
                <button type="button" class="pg-btn" data-sql-run>Run ▶</button>
              </div>
              <p class="pg-hint">Sample tables: <code>employees(id, name, dept_id, salary, joined)</code> · <code>departments(id, name)</code> · <code>users(id, email)</code></p>
              <div class="pg-split pg-split--stack">
                <div class="pg-editor-wrap"><textarea class="pg-editor pg-editor--short" data-sql-code spellcheck="false" aria-label="SQL query"></textarea></div>
                <div class="pg-console pg-console--light"><p class="pg-out-label">Result</p><div class="pg-out" data-sql-out aria-live="polite"><p class="pg-status">Press Run to see the result.</p></div></div>
              </div>
            </div>

            <div class="pg-panel" role="tabpanel" data-pg-panel="py" hidden>
              <div class="pg-toolbar">
                <label>Example <select data-py-ex></select></label>
                <span class="pg-spacer"></span>
                <button type="button" class="pg-btn pg-btn--ghost" data-py-clear>Clear</button>
                <button type="button" class="pg-btn" data-py-run>Run ▶</button>
              </div>
              <div class="pg-split">
                <div class="pg-editor-wrap"><textarea class="pg-editor" data-py-code spellcheck="false" aria-label="Python code"></textarea></div>
                <div class="pg-console"><p class="pg-out-label">Output</p><div class="pg-out" data-py-out aria-live="polite"></div></div>
              </div>
            </div>
          </div>
          <p class="ij-small pg-foot">Want more practice? Pair this with the <a href="/interview/questions/#q-javascript">JavaScript</a>, <a href="/interview/questions/#q-sql">SQL</a> and <a href="/interview/questions/#q-python">Python</a> question banks, or continue on <a href="https://sarangrajan.in/enitexa.ai/learning/" target="_blank" rel="noopener">Enitexa.ai Learning ↗</a>.</p>
        </div>
      </section>
      <section class="ij-section" aria-labelledby="road-title">
        <div class="ij-wrap">
          <div class="ij-head"><p class="ij-eyebrow">Technical skills</p><h2 id="road-title">Skill roadmaps by role</h2><p>Learn in this order. Build a small project after each step — projects are what you talk about in interviews.</p></div>
          <div class="learn-roads">
            ${ROADMAPS.map(
              ([role, steps, q]) => `<article class="learn-road ij-reveal"><h3>${role}</h3>${ol(steps, "ij-steps")}<a class="hub-more" href="${q}">Practise ${role.toLowerCase()} questions →</a></article>`
            ).join("")}
          </div>
        </div>
      </section>

      <section class="ij-section ij-section--soft" aria-labelledby="comm-title">
        <div class="ij-wrap">
          <div class="ij-head"><p class="ij-eyebrow">Communication skills</p><h2 id="comm-title">Speak clearly, write professionally</h2><p>Communication is assessed in every round — not just HR.</p></div>
          ${cards([
            ["Self-introduction", "<p>Practise a 60–90 second intro: present → past → proof → future. Record it and listen once.</p>"],
            ["Spoken English", "<p>Read aloud 10 minutes daily, watch tech talks with subtitles, and answer one interview question aloud every day.</p>"],
            ["Professional email", "<p>Short, specific, polite. Use the templates in the <a href=\"/interview/email-guide/\">Email guide</a>.</p>"],
            ["Explaining technical work", "<p>Use problem → approach → result. Avoid jargon unless asked; draw simple diagrams.</p>"],
            ["Listening", "<p>Pause before answering, repeat the question if unsure, and ask clarifying questions.</p>"],
            ["Body language", "<p>Sit upright, look at the camera on video calls, smile, and avoid reading from notes.</p>"]
          ])}
          <h3 class="hub-h3">7-day communication practice plan</h3>
          ${table(
            ["Day", "Practice", "Time"],
            [
              ["1", "Write and record your self-introduction", "20 min"],
              ["2", "Answer “Why should we hire you?” aloud 3 times", "15 min"],
              ["3", "Explain your best project to a friend in 2 minutes", "20 min"],
              ["4", "Write a job application email from a template", "15 min"],
              ["5", "Read a tech article aloud; summarise it in 3 lines", "20 min"],
              ["6", "Mock HR call with a friend", "30 min"],
              ["7", "Watch your recordings; fix filler words", "20 min"]
            ],
            "Communication plan"
          )}
        </div>
      </section>

      <section class="ij-section" aria-labelledby="plat-title">
        <div class="ij-wrap">
          <div class="ij-head"><p class="ij-eyebrow">Free courses & certifications</p><h2 id="plat-title">Learning platforms and resources</h2><p>Check each platform for current course fees and certificate rules before enrolling.</p></div>
          <div class="learn-grid">
            ${PLATFORMS.map(
              ([n, u, d, area, cost]) => `<a class="learn-card" href="${u}" target="_blank" rel="noopener noreferrer"><strong>${n} <span aria-hidden="true">↗</span></strong><span>${d}</span><span class="learn-tags"><em>${area}</em><em>${cost}</em></span></a>`
            ).join("")}
          </div>
          <h3 class="hub-h3">Kerala skilling programmes</h3>
          <div class="learn-grid learn-grid--kerala">
            ${KERALA.map(([n, u, d]) => `<a class="learn-card" href="${u}" target="_blank" rel="noopener noreferrer"><strong>${n} <span aria-hidden="true">↗</span></strong><span>${d}</span></a>`).join("")}
          </div>
        </div>
      </section>

      <section class="ij-section ij-section--soft" aria-labelledby="cert-title">
        <div class="ij-wrap">
          <div class="ij-head"><p class="ij-eyebrow">Certifications</p><h2 id="cert-title">Which certifications help?</h2></div>
          ${table(
            ["Role", "Useful certifications", "Note"],
            [
              ["Cloud / DevOps", "AWS Certified Cloud Practitioner, Microsoft Azure Fundamentals (AZ-900)", "Good entry points; hands-on labs matter more"],
              ["QA", "ISTQB Certified Tester Foundation Level", "Valued by many testing teams"],
              ["Data", "Microsoft Power BI Data Analyst (PL-300), Google Data Analytics", "Pair with a dashboard portfolio"],
              ["Networking / security", "Cisco CCNA, CompTIA Security+", "Common for network and security roles"],
              ["Marketing", "Google Ads certifications, HubSpot Inbound Marketing", "Free and quick"],
              ["Engineering students", "NPTEL courses in your branch", "Proctored exam adds credibility"]
            ],
            "Certifications by role"
          )}
          ${fact("Certificates support your profile — they don’t replace skills. Interviewers ask what you built with what you learned.")}
        </div>
      </section>

      <section class="ij-section" aria-labelledby="plan-title">
        <div class="ij-wrap">
          <div class="ij-head"><p class="ij-eyebrow">Study plan</p><h2 id="plan-title">A 30-day interview-ready plan</h2></div>
          ${table(
            ["Week", "Technical", "Aptitude / coding", "Communication"],
            [
              ["1", "Revise fundamentals of your main subject", "20 aptitude questions/day", "Self-introduction"],
              ["2", "Build or polish one project", "2 easy coding/SQL problems/day", "Project walkthrough"],
              ["3", "Framework/tool deep dive", "Timed mock test twice", "Mock HR interview"],
              ["4", "Practise the <a href=\"/interview/questions/\">question bank</a> for your role", "Revise weak topics", "Full mock interview"]
            ],
            "30-day plan"
          )}
        </div>
      </section>
${hubRelated("learning")}`;
  return pageShell({
    title: "Learning &amp; Skill Development – Free Courses, Certifications, Roadmaps | InfoparkDaily",
    description: "Skill roadmaps for developers, testers, data analysts, mobile, DevOps, accounts and marketing; communication practice; free courses and certifications from NPTEL, SWAYAM, Microsoft Learn, AWS and more; Kerala skilling programmes.",
    path: "/interview/learning/",
    jsonLd: { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", name: "Learning & Skill Development", url: "https://infoparkdaily.online/interview/learning/" }, crumbsLd(items)] },
    bodyClass: "hub-learning",
    main,
    scripts: [HUB_JS, `/js/code-playground.js?v=${ASSET_V}`]
  });
}

/* =====================================================================
   EMAIL GUIDE /interview/email-guide/
   ===================================================================== */
const EMAILS = [
  {
    id: "job-application",
    title: "Job application email",
    lead: "Applying for a job and attaching your resume.",
    when: ["The job post asks you to apply by email", "Applying to a walk-in or park listing with an HR email", "Within a few days of the post going live"],
    subject: "Application – Junior QA Engineer – Anjali Menon (Fresher, 2026)",
    body: `Dear Hiring Team,

I am applying for the Junior QA Engineer position at Brightloop Technologies, which I found on InfoparkDaily.

I completed my B.Tech in Computer Science (2026) from ABC College of Engineering. In my final-year project I wrote and executed 120 test cases for a delivery-tracking app, logged defects in Jira and used SQL to verify data.

I am available to join immediately and can work from Infopark, Kochi. My resume is attached for your review.

Thank you for your time.

Regards,
Anjali Menon
+91 98XXX XXXXX
linkedin.com/in/anjalimenon`,
    dos: ["Use the exact role title (and job ID) from the post", "Say where you saw the job", "Keep the body to 4–6 short lines", "Attach one PDF named Firstname_Lastname_Role_Resume.pdf"],
    donts: ["Send an empty email with only an attachment", "CC many companies in one email", "Write a long life story", "Use an unprofessional email address"]
  },
  {
    id: "resume-to-hr",
    title: "Sending your resume to HR",
    lead: "Sending your resume directly to a recruiter, with or without a posted opening.",
    when: ["You have an HR or careers email but no specific listing", "A contact told you the team is hiring", "Following up a phone call from a recruiter who asked for your CV"],
    subject: "Resume – QA Engineer – 2 Yrs Experience – Nikhil Joseph",
    body: `Dear Ms. Priya,

As discussed on our call today, please find my resume attached for QA Engineer roles at Brightloop.

I have 2 years of experience in manual and API testing (Postman, Jira, SQL) for e-commerce applications, and I am currently learning Selenium with Java.

Current CTC: ₹3.6 LPA · Notice period: 30 days · Location: Kochi

Please let me know if you need any other details.

Regards,
Nikhil Joseph
+91 94XXX XXXXX`,
    dos: ["Mention the call or referral that led to this email", "Add CTC and notice only if the recruiter asked", "Send within a few hours of the call"],
    donts: ["Send the same resume to every address you find", "Attach certificates and photos unless asked", "Share a Drive link without access set to view"]
  },
  {
    id: "follow-up",
    title: "Follow-up email",
    lead: "Following up after submitting a job application.",
    when: ["7–10 working days after applying with no response", "After the date HR promised an update", "Once more about a week later at most"],
    subject: "Follow-up: Application for Junior QA Engineer – Anjali Menon",
    body: `Dear Hiring Team,

I applied for the Junior QA Engineer role on 4 November and wanted to check whether there is an update on my application.

I remain very interested in the role and am available for a test or interview at your convenience. I have attached my resume again for easy reference.

Thank you,
Anjali Menon
+91 98XXX XXXXX`,
    dos: ["Reply in the same email thread if possible", "Mention the role and the date you applied", "Keep it short and polite"],
    donts: ["Follow up daily", "Sound demanding (“Why haven’t you replied?”)", "Follow up more than twice"]
  },
  {
    id: "interview-confirmation",
    title: "Interview confirmation email",
    lead: "Confirming an interview invitation professionally.",
    when: ["Within a few hours of receiving the invite", "When you need to confirm a slot, mode or venue", "When you need to request a different time"],
    subject: "Re: Interview Invitation – Junior QA Engineer",
    body: `Dear Meera,

Thank you for the invitation. I confirm my availability for the technical interview on Thursday, 13 November at 11:00 am (Google Meet).

Please let me know if I should prepare anything specific or bring any documents.

Regards,
Anjali Menon
+91 98XXX XXXXX`,
    dos: ["Repeat the date, time, mode and time zone to avoid confusion", "Reply to all if the invite came to multiple people", "Save the meeting link and test it beforehand"],
    donts: ["Ignore the invite until the last minute", "Ask to reschedule without offering alternatives", "Change the subject line"]
  },
  {
    id: "thank-you",
    title: "Thank-you email",
    lead: "Thanking the interviewer after an interview.",
    when: ["The same day, within a few hours of the interview", "After any round — HR, technical or managerial", "When you have the interviewer’s or recruiter’s email"],
    subject: "Thank you – Technical Interview for Java Developer – Rahul Nair",
    body: `Dear Mr. Varghese,

Thank you for taking the time to speak with me today about the Java Developer role. I enjoyed discussing the payment reconciliation service and how your team handles retries.

Our conversation made me even more excited about the opportunity to contribute to your team. Please let me know if you need any further information from me.

Best regards,
Rahul Nair
+91 97XXX XXXXX`,
    dos: ["Mention one specific topic from the conversation", "Keep it under 120 words", "Send separate notes if you met different people"],
    donts: ["Re-argue an answer you got wrong", "Ask “Did I get selected?”", "Copy-paste a generic message"]
  }
];

const MORE_EMAILS = [
  ["Asking for a referral", `Hi Arun,

Hope you're doing well. Northwind Labs is hiring a Data Analyst (Job ID 4512): <job link>

I have 2 years of experience in SQL, Power BI and Python reporting and think I match the role well. Would you be comfortable referring me? My resume and a 3-line summary are below.

• 2 years as Data Analyst at ABC Corp – 12 Power BI dashboards for sales leadership
• SQL (joins, window functions), Python (pandas)
• Notice period: 30 days

Thank you either way!
Sneha`],
  ["Requesting to reschedule", `Subject: Request to Reschedule – Technical Interview – Rahul Nair

Dear Meera,

Thank you for scheduling my interview on 13 November at 11 am. Unfortunately, I have a commitment I can't move that morning. Would any of these slots work?

• 13 Nov, after 4 pm
• 14 Nov, any time
• 15 Nov, before 1 pm

I apologise for the inconvenience.

Regards,
Rahul Nair`],
  ["Accepting an offer", `Subject: Acceptance of Offer – Java Developer – Rahul Nair

Dear Meera,

Thank you for the offer for the Java Developer position. I am pleased to accept it on the terms stated in the offer letter dated 10 November, with a joining date of 15 December at Infopark, Kochi. I have attached the signed copy.

Please let me know the documents required before joining.

Warm regards,
Rahul Nair`],
  ["Declining an offer politely", `Subject: Offer for Java Developer – Rahul Nair

Dear Meera,

Thank you very much for the offer and for your time throughout the process. After careful thought, I have decided to accept another opportunity that aligns more closely with my current goals.

I truly appreciated meeting the team and hope our paths cross again.

Best regards,
Rahul Nair`],
  ["Asking for feedback after rejection", `Subject: Thank you – Junior QA Engineer interview – Anjali Menon

Dear Meera,

Thank you for letting me know about the decision. If possible, could you share one or two areas I could improve? It would help me prepare better. I'd be glad to be considered for similar roles in future.

Thank you again,
Anjali Menon`],
  ["Resignation email", `Subject: Resignation – Rahul Nair – Java Developer

Dear Arjun,

Please accept this email as formal notice of my resignation from the role of Java Developer. As per my 30-day notice period, my last working day will be 14 December 2026.

Thank you for the guidance over the past three years. I'll make sure the handover is complete and documented.

Regards,
Rahul Nair`]
];

export function emailPage() {
  const items = [...hubCrumb, ["Email guide", "/interview/email-guide/"]];
  const emailBlock = (e, i) => `
          <article class="mail ij-reveal" id="email-${e.id}" aria-labelledby="email-${e.id}-title">
            <header class="mail-head">
              <span class="mail-num">${String(i + 1).padStart(2, "0")}</span>
              <div><h2 id="email-${e.id}-title">${e.title}</h2><p>${e.lead}</p></div>
            </header>
            <div class="mail-grid">
              <div class="mail-when"><h3>When to send this email</h3>${ul(e.when)}</div>
              <div class="mail-subject"><h3>Email subject</h3><p><code>${esc(e.subject)}</code></p></div>
            </div>
            ${copy("Sample email", `Subject: ${e.subject}\n\n${e.body}`, "Replace the names, role and details with your own")}
            <div class="mail-dd">
              <div class="mail-do"><h3>Do</h3>${ul(e.dos)}</div>
              <div class="mail-dont"><h3>Don’t</h3>${ul(e.donts)}</div>
            </div>
          </article>`;
  const main = `
${detailHero("email", items, "04", "Professional emails", "that get replies.", "Five essential job-search emails — when to send each one, the subject line, a sample you can copy, and the dos and don’ts.")}
${hubNav("email")}
      <section class="ij-section" aria-labelledby="mail-list-title">
        <div class="ij-wrap mail-layout">
          <aside class="mail-index" aria-label="Emails">
            <div class="iq-index-inner">
              <p class="ij-kicker" id="mail-list-title">Professional email examples</p>
              <ol>${EMAILS.map((e, i) => `<li><a href="#email-${e.id}"><span>${String(i + 1).padStart(2, "0")}</span>${e.title}</a></li>`).join("")}<li><a href="#more-emails"><span>+</span>More templates</a></li></ol>
            </div>
          </aside>
          <div class="mail-list">
            <div class="mail-anatomy">
              <h2 class="hub-h3">Anatomy of a professional email</h2>
              ${cards([
                ["Subject", "<p>Role + your name (+ experience). Use the post’s format if given.</p>"],
                ["Greeting", "<p>“Dear Ms. Priya,” if a name is known; otherwise “Dear Hiring Team,”.</p>"],
                ["Opening", "<p>Which role, where you saw it, who you are.</p>"],
                ["Proof", "<p>2–3 lines on matching skills or results.</p>"],
                ["Close", "<p>Availability, thanks, attachment mention.</p>"],
                ["Signature", "<p>Name, phone, LinkedIn. No images.</p>"]
              ])}
            </div>
            ${EMAILS.map(emailBlock).join("")}
            <section class="mail-more" id="more-emails" aria-labelledby="more-emails-title">
              <h2 id="more-emails-title">More ready-to-use templates</h2>
              ${MORE_EMAILS.map(([t, b]) => copy(t, b)).join("")}
              <p class="ij-small">Need even more? The <a href="/resume-builder/email-examples/">Email examples tool</a> has filters for every job type.</p>
            </section>
            ${warn("Write only to addresses printed on the official notice or company website. Never send OTPs, bank details or Aadhaar scans by email to an unverified recruiter.")}
          </div>
        </div>
      </section>
${hubRelated("email")}`;
  return pageShell({
    title: "Professional Email Guide for Job Seekers – Templates to Copy | InfoparkDaily",
    description: "Job application, resume to HR, follow-up, interview confirmation and thank-you email templates — with when to send, subject lines, samples to copy, and dos and don’ts. Plus referral, offer and resignation emails.",
    path: "/interview/email-guide/",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "HowTo",
          name: "How to write professional job search emails",
          step: EMAILS.map((e, i) => ({ "@type": "HowToStep", position: i + 1, name: e.title, text: e.lead, url: `https://infoparkdaily.online/interview/email-guide/#email-${e.id}` }))
        },
        crumbsLd(items)
      ]
    },
    bodyClass: "hub-email",
    main,
    scripts: [HUB_JS]
  });
}

/* =====================================================================
   RESUME & ATS /interview/resume-ats/
   ===================================================================== */
export function resumePage() {
  const items = [...hubCrumb, ["Resume & ATS", "/interview/resume-ats/"]];
  const main = `
${detailHero(
  "resume",
  items,
  "05",
  "A resume that",
  "gets shortlisted.",
  "How to structure your resume, what ATS software does with it, the mistakes to avoid — and free tools to build and check yours.",
  `<div class="ij-hero-cta"><a class="ij-btn ij-btn--yellow" href="/resume-builder/templates/">Build resume</a><a class="ij-btn ij-btn--ghost" href="/ats-checker/">Check ATS score</a></div>`
)}
${hubNav("resume")}
      <section class="ij-section" aria-labelledby="rs-title">
        <div class="ij-wrap hub-narrow">
          <div class="ij-head"><p class="ij-eyebrow">Resume preparation</p><h2 id="rs-title">Resume structure</h2></div>
          ${table(
            ["Section", "Fresher", "Experienced"],
            [
              ["Header", "Name, phone, email, city, LinkedIn/GitHub", "Same — no full address, DOB or photo unless asked"],
              ["Summary", "2 lines: degree, key skills, target role", "3 lines: years, domain, strongest results"],
              ["Skills", "Grouped: Languages · Tools · Databases", "Grouped and matched to the JD"],
              ["Experience", "Internships, freelance, part-time", "Main section — reverse chronological, achievements"],
              ["Projects", "Main proof — place above education", "Notable ones only"],
              ["Education", "Degree, college, year, CGPA if good", "One line at the end"],
              ["Certifications", "Relevant ones", "Relevant ones"]
            ],
            "Resume structure"
          )}
          <h3 class="hub-h3">Writing bullets that work</h3>
          <div class="ij-example"><figcaption>Duty vs achievement</figcaption><div>
            <p class="ij-bad">✗ Responsible for API development.</p>
            <p class="ij-good">✓ Built 14 REST APIs in Spring Boot for a payments module, cutting response time from 900 ms to 250 ms.</p>
            <p class="ij-bad">✗ Did a project on library management.</p>
            <p class="ij-good">✓ Built a library management app (PHP, MySQL) with search and fines; tested 40 cases; used by 200 students.</p>
          </div></div>
          ${tip("Formula: action verb + what you did + tools + result (number).")}
        </div>
      </section>

      <section class="ij-section ij-section--soft" aria-labelledby="ats-title">
        <div class="ij-wrap hub-narrow">
          <div class="ij-head"><p class="ij-eyebrow">ATS guide</p><h2 id="ats-title">How applicant tracking systems read your resume</h2><p>An ATS collects applications, parses your resume into fields, applies eligibility questions and lets recruiters search by keyword. A human usually makes the final decision.</p></div>
          <ol class="ij-miniflow" aria-label="ATS process"><li><span>Upload</span></li><li><span>Parse into fields</span></li><li><span>Knock-out questions</span></li><li><span>Keyword search / ranking</span></li><li><span>Recruiter review</span></li></ol>
          ${table(
            ["Do", "Avoid"],
            [
              ["One column, standard fonts", "Text boxes, tables for layout, multiple columns"],
              ["Standard headings: Summary, Skills, Experience, Projects, Education", "Creative headings like “My Journey”"],
              ["Exact JD keywords you genuinely have", "Keyword stuffing or hidden white text"],
              ["Text-based PDF (or DOCX if asked)", "Scanned PDF, image resume, password-protected file"],
              ["Dates like Jan 2025 – Mar 2026", "Only years or mixed formats"]
            ],
            "ATS do and avoid"
          )}
          ${fact("An ATS checker — including InfoparkDaily’s — is a preparation tool. It is not the employer’s system, and a high score doesn’t guarantee shortlisting.")}
        </div>
      </section>

      <section class="ij-section" aria-labelledby="mist-title">
        <div class="ij-wrap hub-narrow">
          <div class="ij-head"><p class="ij-eyebrow">Resume mistakes</p><h2 id="mist-title">Common mistakes and fixes</h2></div>
          ${table(
            ["Mistake", "Why it hurts", "Fix"],
            [
              ["Graphic two-column design", "Parsed in the wrong order", "Simple one-column template"],
              ["Skill bars and star ratings", "Unreadable and not trusted", "Plain skill list"],
              ["Generic objective", "Says nothing", "Specific 2–3 line summary"],
              ["Spelling errors, mixed dates", "Looks careless", "Read aloud; one format"],
              ["Fake experience", "Caught in background checks", "Show projects honestly"],
              ["Same resume for every job", "Low keyword match", "Tailor summary and skills"]
            ],
            "Resume mistakes"
          )}
        </div>
      </section>

      <section class="ij-section ij-section--soft" aria-labelledby="opt-title">
        <div class="ij-wrap hub-narrow">
          <div class="ij-head"><p class="ij-eyebrow">Resume optimisation</p><h2 id="opt-title">Optimise for each job in 10 minutes</h2></div>
          ${ol([
            "Copy the JD’s must-have skills into a list.",
            "Tick the ones you genuinely have; add any missing ones to your Skills section and a relevant bullet.",
            "Rewrite your summary to name the target role.",
            "Move the most relevant project or achievement to the top.",
            "Run the resume and JD through the <a href=\"/ats-checker/\">ATS checker</a>.",
            "Export a text PDF named Firstname_Lastname_Role_Resume.pdf."
          ])}
        </div>
      </section>

      <section class="ij-section" aria-labelledby="tools-title2">
        <div class="ij-wrap">
          <div class="ij-head"><p class="ij-eyebrow">Free tools</p><h2 id="tools-title2">Build and check your resume</h2></div>
          <div class="hub-tools">
            <a class="hub-tool" href="/resume-builder/templates/"><strong>Resume Builder</strong><span>ATS-friendly templates, live preview, PDF with no watermark.</span><em>Build resume →</em></a>
            <a class="hub-tool hub-tool--yellow" href="/ats-checker/"><strong>ATS Checker</strong><span>Private readability and keyword check against a job description.</span><em>Check ATS →</em></a>
            <a class="hub-tool" href="/resume-builder/templates/"><strong>Resume templates</strong><span>Pick a layout, then edit it in the builder.</span><em>Browse templates →</em></a>
            <a class="hub-tool" href="/guides/resume-guide-kerala-it-jobs/"><strong>Kerala IT resume guide</strong><span>Detailed tips for park companies.</span><em>Read guide →</em></a>
          </div>
        </div>
      </section>
${hubRelated("resume")}`;
  return pageShell({
    title: "Resume &amp; ATS Preparation Guide – Structure, Mistakes, Optimisation | InfoparkDaily",
    description: "Resume structure for freshers and experienced, how ATS screening works, common resume mistakes, a 10-minute optimisation checklist, and free tools: Resume Builder and ATS Checker.",
    path: "/interview/resume-ats/",
    jsonLd: { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", name: "Resume & ATS Preparation", url: "https://infoparkdaily.online/interview/resume-ats/" }, crumbsLd(items)] },
    bodyClass: "hub-resume",
    main,
    scripts: [HUB_JS]
  });
}
