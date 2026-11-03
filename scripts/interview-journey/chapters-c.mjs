import {
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
  qa,
} from "./helpers.mjs";

export const chaptersC = [
  {
    id: "final-hr-round",
    num: 13,
    phase: "Interviews",
    title: "Final HR round",
    summary:
      "Current and expected CTC, negotiation, notice period, joining date, location, shifts, benefits and terms.",
    time: 15,
    candidate: [
      "Know your numbers and your walk-away point",
      "Understand CTC vs in-hand",
      "Get every promise in writing",
    ],
    company: [
      "HR confirms budget fit, joining date and policies",
      "Collects documents for the offer",
    ],
    tools: [
      ["Kerala IT salary guide", "/guides/kerala-it-salary-guide/"],
      [
        "Offer & notice period guide",
        "/guides/offer-letter-notice-period-guide/",
      ],
    ],
    body: `
${h3("CTC is not your monthly salary")}
<p><strong>CTC (cost to company)</strong> is everything the company spends on you in a year — including employer PF, gratuity, insurance and sometimes bonuses you may not receive monthly. Your <strong>in-hand (take-home)</strong> salary is lower.</p>
${example(
  "Sample breakdown — ₹4.2 LPA CTC (₹35,000 a month)",
  `${table(
    ["Component (monthly)", "Amount", "Note"],
    [
      ["Basic salary", "₹14,000", "Often 40–50% of CTC"],
      ["HRA", "₹7,000", "House rent allowance"],
      ["Special allowance", "₹11,647", "Balancing component"],
      [
        "<strong>Gross salary</strong>",
        "<strong>₹32,647</strong>",
        "What appears as earnings on the payslip",
      ],
      [
        "Employer PF (12% of basic)",
        "₹1,680",
        "Part of CTC, goes to your PF account",
      ],
      [
        "Gratuity (4.81% of basic)",
        "₹673",
        "Part of CTC, paid on eligible exit",
      ],
      ["<strong>Total CTC</strong>", "<strong>₹35,000</strong>", ""],
      ["Less: employee PF (12% of basic)", "− ₹1,680", "Your contribution"],
      [
        "Less: professional tax",
        "about − ₹208",
        "State tax; Kerala collects it half-yearly",
      ],
      [
        "Less: income tax (TDS)",
        "₹0",
        "Nil at this income under the new tax regime (FY 2025-26 rules)",
      ],
      [
        "<strong>Approximate in-hand</strong>",
        "<strong>≈ ₹30,750</strong>",
        "",
      ],
    ],
    "CTC breakdown example",
  )}<p class="ij-small">Illustration only. Structures differ by company; PF may be calculated on a capped wage, and tax depends on your regime, deductions and the year’s rules.</p>`,
)}

${h3("Current CTC & expected CTC")}
${both(
  ul([
    "Freshers have no current CTC — say “I’m a fresher”.",
    "Most fresher salaries are fixed per batch or role band; negotiation room is small.",
    "Research the band for the role (posting, AmbitionBox, seniors).",
    "Say: “I’m comfortable with the standard fresher package for this role.” If asked a number, give the posted range.",
    "Focus on learning, training and conversion (for internships).",
  ]),
  ul([
    "State current CTC accurately: fixed + variable separately (“₹6.2 LPA fixed, ₹0.5 LPA variable”).",
    "Expected CTC: base it on market range, your skills and the role level. Job switches in Indian IT often bring a higher hike than annual appraisals — but it varies by company and skill.",
    "Give a number or narrow range: “₹8–8.5 LPA fixed.”",
    "If you have another offer, mention it honestly and only if true.",
    "Negotiate the whole package: joining bonus, notice buyout, relocation, WFH, title.",
  ]),
)}

${h3("Salary negotiation — a script that works")}
${copy(
  "Negotiation reply when the offer is below expectation",
  `Thank you for the offer — I'm genuinely excited about the role and the team.

Based on my 3 years in Spring Boot microservices and the market range for similar roles in Kochi, I was expecting around ₹8.5 LPA fixed. The current offer is ₹7.4 LPA.

Is there flexibility to move closer to ₹8.2–8.5 LPA? If the fixed component is limited, I'd be happy to discuss a joining bonus or an early review after 6 months.

I'm keen to make this work.`,
  "Polite, specific, data-based and flexible",
)}
${ul([
  "Negotiate once, clearly. Don’t go back and forth five times.",
  "Never lie about a competing offer or current salary — offer letters and payslips may be verified.",
  "Pause before accepting: “Could I have until tomorrow to review the full breakup?”",
  "Once you accept in writing, don’t reopen negotiation.",
])}

${h3("Notice period, joining date & counteroffers")}
${table(
  ["Topic", "What to know", "Smart move"],
  [
    [
      "Notice period",
      "Common: 30, 60 or 90 days, as per your appointment letter",
      "Tell the new employer the exact number; don’t promise less than you can deliver",
    ],
    [
      "Early release",
      "Your manager/HR may release you earlier after handover",
      "Ask after resigning; offer a solid handover plan",
    ],
    [
      "Notice buyout",
      "Some companies let you pay salary for the unserved days, or the new employer reimburses it",
      "Ask the new company whether they support buyout",
    ],
    [
      "Joining date",
      "Written in the offer; changes need approval",
      "Agree a realistic date; inform immediately if it moves",
    ],
    [
      "Counteroffer",
      "Current employer offers more money to stay",
      "Ask why you wanted to leave — if it wasn’t only money, a raise rarely fixes it. Decide quickly and honestly",
    ],
  ],
  "Notice period and joining",
)}

${h3("Other things to confirm before saying yes")}
${cards([
  [
    "Work location",
    "<p>Which office, which park, hybrid days, relocation support.</p>",
  ],
  [
    "Shift timings",
    "<p>Day/night/rotational, shift allowance, cab facility for night shifts.</p>",
  ],
  [
    "Benefits",
    "<p>Health insurance (self/family, sum insured), leave policy, PF, gratuity, learning budget, meals, WFH allowance.</p>",
  ],
  [
    "Employment terms",
    "<p>Probation length, notice period during probation, service agreement/bond, non-compete clauses, variable pay rules.</p>",
  ],
])}

${h3("Final HR questions with sample answers")}
${qa([
  [
    "Why should we hire you?",
    "“I match the core requirements — Selenium, API testing and SQL — and I’ve already applied them in a similar domain. I learn fast, as my automation project shows, and I’m ready to join quickly.”",
  ],
  [
    "Are you comfortable with a 1-year service agreement?",
    "“Could you explain what it covers — is it tied to paid training? I’m committed to staying, but I’d like to read the terms in writing.”",
    "Never sign a bond that requires you to submit original certificates or pay large sums without reading it fully.",
  ],
  [
    "Can you join in 15 days instead of 30?",
    "“I’ll request an early release and update you within two days of resigning. I can’t promise it, but I’ll do everything possible with a clean handover.”",
  ],
  [
    "What if we can’t meet your expected CTC?",
    "“The role and growth matter most to me. If the fixed pay has limits, could we look at a joining bonus or a review after six months?”",
  ],
])}
${warn("Do not hand over original certificates to any employer to keep. Genuine companies verify originals and return them the same day.")}
`,
  },

  {
    id: "selection",
    num: 14,
    phase: "Decision",
    title: "Final selection",
    summary:
      "Inside the company: interview feedback, assessment results and approvals that turn a candidate into a hire.",
    time: 8,
    candidate: [
      "Send thank-you notes",
      "Follow up once if the promised date passes",
      "Keep other options alive until the offer is in writing",
    ],
    company: [
      "Panel submits feedback",
      "Hiring manager and HR approve",
      "Finance approves compensation",
      "Offer is prepared",
    ],
    tools: [["Find more openings", "/jobs/"]],
    body: `
<p class="ij-perspective">Company perspective — what happens between your last interview and the offer.</p>
${flow(["Interview feedback submitted", "Assessment scores compared", "Debrief / hiring committee", "Hiring manager approval", "HR checks policy & budget", "Compensation approval", "Offer released"], "Final selection process")}

${h3("Each step explained")}
${table(
  ["Step", "Who", "What happens", "Typical time"],
  [
    [
      "Interview feedback",
      "Each interviewer",
      "Rates you on a rubric (e.g. 1–4) and writes notes: strengths, concerns, hire / no hire",
      "Same day to 2 days",
    ],
    [
      "Assessment results",
      "Recruiter",
      "Test scores and assignment reviews are added to the profile",
      "Same week",
    ],
    [
      "Debrief",
      "Panel + hiring manager",
      "Compare candidates; resolve mixed feedback; sometimes an extra round",
      "1–5 days",
    ],
    [
      "Hiring manager approval",
      "Manager",
      "Final choice between shortlisted candidates",
      "1–3 days",
    ],
    [
      "HR approval",
      "HR / talent acquisition",
      "Checks fit with grade, policy, internal salary bands",
      "1–3 days",
    ],
    [
      "Compensation approval",
      "HR + finance / leadership",
      "Approves CTC, joining bonus or exceptions",
      "1–7 days",
    ],
    [
      "Final selection",
      "Recruiter",
      "Calls you with a verbal offer, then sends the written offer",
      "After approvals",
    ],
  ],
  "Selection steps",
)}
${fact("A delay after a good final round is normal — approvals stack up. A verbal “you’re selected” is not an offer. Keep interviewing until the written offer is in your inbox and you have read it.")}

${h3("Selected or not? The decision branch")}
<div class="ij-decide">
  <div class="ij-decide-q">Did the panel recommend you?</div>
  <div class="ij-decide-branches">
    <div><span class="ij-yes">Yes</span><p>Approvals → verbal offer → written offer letter → Chapter 15.</p></div>
    <div><span class="ij-no">No</span><p>Rejection email or silence → feedback request and next steps → Chapter 17.</p></div>
  </div>
</div>
${copy(
  "Follow-up after the final round (when the promised date passes)",
  `Hi Meera,

Thank you again for coordinating the interviews for the Java Developer role. I wanted to check on the status of the final decision. I remain very interested and happy to provide anything else you need.

Best regards,
Rahul Nair`,
)}
`,
  },

  {
    id: "offer-stage",
    num: 15,
    phase: "Decision",
    title: "Offer letter & acceptance",
    summary:
      "Read the offer, check the compensation structure and conditions, negotiate if needed and accept professionally.",
    time: 11,
    candidate: [
      "Read every clause",
      "Check the CTC breakup",
      "Accept in writing — then resign",
    ],
    company: [
      "Sends the offer with a validity date",
      "Starts pre-joining and background checks",
    ],
    tools: [
      [
        "Offer letter & notice period guide",
        "/guides/offer-letter-notice-period-guide/",
      ],
    ],
    body: `
${h3("What an offer letter should contain")}
${table(
  ["Item", "Check that…"],
  [
    [
      "Company legal name and address",
      "Matches the company you interviewed with (letterhead, CIN/GST optional)",
    ],
    ["Job title and grade", "Matches what was discussed"],
    [
      "CTC and annexure",
      "Fixed, variable, PF, gratuity, insurance shown clearly; monthly gross is stated",
    ],
    ["Joining date and location", "Correct office and date"],
    ["Probation", "Length (often 3–6 months) and notice during probation"],
    ["Notice period", "After confirmation"],
    ["Working hours / shifts", "As agreed"],
    [
      "Conditions",
      "Subject to background verification, documents, medical check",
    ],
    [
      "Bond / service agreement",
      "Amount, duration and what triggers it — read carefully",
    ],
    ["Offer validity", "Date by which you must accept"],
    ["Signatory", "An authorised HR person with a company email"],
  ],
  "Offer letter checklist",
)}

${h3("Fresher vs experienced: what to watch")}
${both(
  ul([
    "Training period and stipend vs salary after training.",
    "Service agreement (bond) — amount and duration.",
    "Joining date may be months away for mass hiring; keep applying in the meantime.",
    "Location may be allocated later in large IT services firms.",
  ]),
  ul([
    "Fixed vs variable split and how variable is paid.",
    "Joining bonus clawback (repay if you leave within 12 months?).",
    "Notice buyout reimbursement, if promised, written in the offer.",
    "Title and grade — they set your next salary negotiation.",
    "Restrictive clauses (non-compete, non-solicit).",
  ]),
)}

${h3("Fake offer warning signs")}
${ul([
  "Offer without any interview, or after a 5-minute chat.",
  "Asks for a “security deposit”, “training fee”, “laptop fee” or “document verification charge”.",
  "Sent from a free email address with no company domain, or a lookalike domain (infosys-careers-hr.com).",
  "Salary far above market for the role.",
  "Pressure: “accept in 1 hour or lose the offer”.",
])}
${warn("If you’re unsure, call the company’s official number from its website (not the number in the email) and ask HR to confirm the offer.")}

${h3("Accepting the offer")}
${copy(
  "Offer acceptance email",
  `Subject: Acceptance of Offer – Java Developer – Rahul Nair

Dear Meera,

Thank you for the offer for the position of Java Developer at Brightloop Technologies. I am pleased to accept it on the terms stated in the offer letter dated 10 November, with a CTC of ₹8.2 LPA and a joining date of 15 December at Infopark, Kochi.

I have attached the signed offer letter. Please let me know the documents and formalities required before joining.

I look forward to being part of the team.

Warm regards,
Rahul Nair
+91 97XXX XXXXX`,
)}
${copy(
  "Declining an offer politely",
  `Subject: Offer for Java Developer – Rahul Nair

Dear Meera,

Thank you very much for the offer and for your time throughout the process. After careful thought, I have decided to accept another opportunity that aligns more closely with my current goals.

I truly appreciated meeting the team and hope our paths cross again.

Best regards,
Rahul Nair`,
)}
${tip("Accepting multiple offers and dropping out on joining day damages your reputation — recruiters talk, especially in Kerala’s parks. Decide, then inform the others promptly.")}
`,
  },

  {
    id: "pre-joining",
    num: 16,
    phase: "Decision",
    title: "Pre-joining & onboarding",
    summary:
      "Background verification, documents, resignation, joining formalities and your first working day.",
    time: 11,
    candidate: [
      "Submit documents promptly",
      "Resign professionally and complete handover",
      "Prepare for day one",
    ],
    company: [
      "Runs background verification",
      "Prepares laptop, accounts, induction",
    ],
    tools: [["Working in Infopark", "/guides/working-in-infopark-kochi-life/"]],
    body: `
${flow(["Offer accepted", "Documents submitted", "Background verification", "Resignation & notice (experienced)", "Relieving", "Joining day", "Induction & first week"], "Pre-joining timeline")}

${h3("Background verification (BGV)")}
<p>Many companies verify candidates through HR or an external verification agency. BGV can start before or after you join.</p>
${table(
  ["Check", "How it’s verified", "What can go wrong"],
  [
    [
      "Education",
      "University/college confirms degree, year and marks",
      "Degree not completed, fake certificate",
    ],
    [
      "Employment",
      "Previous HR confirms titles, dates, sometimes salary",
      "Dates or titles different from your resume",
    ],
    [
      "Identity & address",
      "ID documents, address verification",
      "Mismatched names or addresses",
    ],
    [
      "Criminal record / court check",
      "Database or police verification",
      "Rare, but serious",
    ],
    [
      "Reference check",
      "Calls to managers you named",
      "Reference unaware or negative",
    ],
    [
      "Dual employment / PF history",
      "UAN / EPF service history",
      "Overlapping employment you didn’t disclose",
    ],
  ],
  "Background verification checks",
)}
${warn("Fake experience certificates and inflated salaries are discovered in BGV. Consequences include offer withdrawal or termination — even months after joining.")}

${h3("Documents usually requested")}
${both(
  ul([
    "Aadhaar / passport / voter ID",
    "PAN card",
    "10th, 12th, degree marksheets and certificates (or provisional certificate)",
    "Passport-size photos",
    "Bank account details",
    "Internship certificates (if any)",
  ]),
  ul([
    "All of the fresher list",
    "Relieving letter and experience letter from previous employers",
    "Last 3 months’ payslips",
    "Form 16 / tax documents",
    "UAN for PF transfer",
    "Resignation acceptance from current employer",
  ]),
)}

${h3("Resigning from your current company (experienced)")}
${ol([
  "Resign only after you have the written offer and have accepted it (and ideally BGV has started cleanly).",
  "Tell your manager in person or on a call first, then send the email.",
  "Follow the company process (HRMS resignation, exit form).",
  "Prepare a handover document: tasks, credentials transfer, contacts, pending items.",
  "Stay professional through your notice — your relieving letter and references depend on it.",
  "Collect: relieving letter, experience letter, final settlement, Form 16.",
])}
${copy(
  "Resignation email",
  `Subject: Resignation – Rahul Nair – Java Developer

Dear Arjun,

Please accept this email as formal notice of my resignation from the role of Java Developer at XYZ Solutions. As per my notice period of 30 days, my last working day will be 14 December 2026.

Thank you for the guidance and opportunities over the past three years. I'll make sure the payments module handover is complete and documented, and I'm happy to help train my replacement.

Please let me know if an earlier release is possible after the handover.

Regards,
Rahul Nair`,
)}

${h3("Joining formalities & first day")}
${cards([
  [
    "Before day one",
    "<p>Confirm time, venue and reporting person. Plan the commute (Infopark/Technopark traffic peaks around 9 am). Keep originals ready for verification.</p>",
  ],
  [
    "Day one",
    "<p>HR induction, document verification, ID card, laptop and accounts, policy sessions (POSH, security, leave).</p>",
  ],
  [
    "First week",
    "<p>Meet the team, set up the dev environment, read docs, take notes, ask questions early.</p>",
  ],
  [
    "First 90 days",
    "<p>Agree goals with your manager, deliver a small win early, ask for feedback monthly — this is usually your probation.</p>",
  ],
])}
${tip("Write down everything you learn in week one. Asking a question once is normal; asking the same question three times is avoidable.")}
`,
  },

  {
    id: "rejection-journey",
    num: 17,
    phase: "Decision",
    title: "Rejection & next steps",
    summary:
      "Why rejections happen, how to ask for feedback, improve, follow up, reapply and keep a steady job-search routine.",
    time: 11,
    candidate: [
      "Ask for feedback once",
      "Fix one thing per week",
      "Keep a weekly routine",
    ],
    company: [
      "Keeps your profile in the ATS",
      "May consider you for future roles",
    ],
    tools: [
      ["Check your resume again", "/ats-checker/"],
      ["New openings", "/jobs/"],
    ],
    body: `
<p>Rejection is part of every job search. Most people receive many “no”s and silences before a “yes”. The difference between those who get hired and those who give up is a process for learning from each one.</p>

${h3("Common reasons candidates are rejected")}
${table(
  ["Stage", "Common reasons", "Fix"],
  [
    [
      "Resume screen",
      "Skills don’t match; unreadable format; failed eligibility",
      "Tailor to JD; simple template; ATS check",
    ],
    [
      "HR call",
      "Salary or notice mismatch; unclear communication; can’t relocate",
      "Research ranges; practise your intro; apply only where location works",
    ],
    ["Assessment", "Below cut-off; ran out of time", "Daily timed practice"],
    [
      "Technical",
      "Weak fundamentals; couldn’t explain own project",
      "Revise basics; rehearse project walkthrough",
    ],
    [
      "Managerial",
      "Vague answers; blamed others; poor attitude",
      "STAR stories with results",
    ],
    [
      "Final",
      "Another candidate was a closer fit; budget changed; internal hire",
      "Often outside your control — keep going",
    ],
  ],
  "Rejection reasons",
)}

${h3("How to ask for feedback")}
${copy(
  "Feedback request email",
  `Subject: Thank you – Junior QA Engineer interview – Anjali Menon

Dear Meera,

Thank you for letting me know about the decision. I appreciated the opportunity to interview with Brightloop.

If possible, could you share one or two areas I could improve? Any feedback would help me prepare better for future opportunities. I'd also be glad to be considered for similar roles later.

Thank you again,
Anjali Menon`,
)}
${fact("Many companies won’t share detailed feedback for legal or time reasons. Ask once, politely, and don’t take silence personally.")}

${h3("Improve: a self-review after every interview")}
${ol([
  "Within an hour, write down every question you remember.",
  "Mark each: answered well / partly / badly.",
  "For every “badly”, write the correct answer and practise it aloud.",
  "Update your resume if a question showed it overstated something.",
  "Do one mock interview a week with a friend or senior.",
])}

${h3("When to follow up and when to reapply")}
${table(
  ["Situation", "What to do"],
  [
    [
      "No response after applying",
      "Follow up once after 7–10 working days; move on after 3–4 weeks",
    ],
    [
      "Rejected after interview",
      "Thank them; ask for feedback; apply to a different matching role when one opens",
    ],
    [
      "Same role again",
      "Many companies have a cooling-off period (often around 6 months) — check the portal or ask HR",
    ],
    ["On hold", "Check in after 2 weeks, then monthly"],
  ],
  "Follow-up and reapply timing",
)}

${h3("A weekly job-search routine")}
${table(
  ["Day", "Focus", "Time"],
  [
    [
      "Daily",
      "Check InfoparkDaily feed and alerts; save relevant jobs",
      "15 min",
    ],
    ["Mon", "Apply to 3–5 well-matched roles (tailored resume)", "1–2 hrs"],
    ["Tue", "Skill practice: aptitude or coding / domain", "1 hr"],
    ["Wed", "Apply + 2 referral requests", "1 hr"],
    ["Thu", "Mock interview or project work", "1 hr"],
    ["Fri", "Follow-ups; update tracker", "30 min"],
    ["Weekend", "Learn one new skill; update LinkedIn/Naukri profile", "2 hrs"],
  ],
  "Weekly job search routine",
)}
${both(
  ul([
    "Build one new project a month that matches roles you want.",
    "Do an internship if job offers are slow — it’s experience.",
    "Join walk-in drives regularly; each is practice.",
    "Talk to seniors about which companies hire freshers.",
  ]),
  ul([
    "Ask ex-colleagues for referrals — they’re your strongest channel.",
    "Upskill in one in-demand tool for your role.",
    "If many rejections mention the same gap, fix it before applying more.",
    "Consider contract or consulting roles as bridges.",
  ]),
)}
${tip('Stay connected with the InfoparkDaily community. New openings arrive every day on the <a href="/jobs/">job board</a>, the <a href="https://whatsapp.com/channel/0029VbDJFfA4Y9lm5L4kpm22" target="_blank" rel="noopener noreferrer">WhatsApp channel</a> and <a href="https://www.instagram.com/infoparkdaily.jobs/" target="_blank" rel="noopener noreferrer">@infoparkdaily.jobs</a>.')}
`,
  },
];
