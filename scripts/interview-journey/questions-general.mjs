/* Interview question bank — HR, managerial and non-IT subjects.
   Row format: [level, question, sample answer]  level: "f" fresher · "e" experienced · "b" both */

export const GENERAL = [
  {
    id: "hr-round",
    name: "HR round",
    group: "HR & behavioural",
    round: "HR",
    intro: "Asked in almost every interview — phone screens, walk-ins and final HR rounds.",
    qs: [
      ["b", "Tell me about yourself.", "Use present → past → proof → future in 60–90 seconds: “I’m a 2026 B.Tech CSE graduate focused on testing. In my final-year project I wrote 120 test cases and automated login checks with Selenium. I want to start my career as a QA engineer in a product team like yours.”"],
      ["b", "Why do you want to join our company?", "Connect their work to your skills and goals: “You build logistics software for UAE and UK clients. I tested a delivery-tracking app in my project and your team uses Selenium and Jira, which I already know.”"],
      ["b", "Why should we hire you?", "Match 2–3 must-haves from the JD with proof, then add attitude: “I already know manual testing, Jira and SQL, I’ve automated basic flows, and I learn quickly — I picked up Postman in a week for my project.”"],
      ["b", "What are your strengths?", "Pick one or two relevant strengths and prove each with a short example. Avoid a list of adjectives."],
      ["b", "What is your greatest weakness?", "Give a real but non-critical weakness and what you are doing about it: “I used to take on too much without asking for help. Now I timebox problems and ask after 30 minutes.”"],
      ["b", "Where do you see yourself in five years?", "Show ambition aligned with the company: “Growing into a senior engineer who owns features end to end and mentors juniors.” Avoid saying you plan to leave."],
      ["f", "Why did you choose this field?", "Give a genuine reason with a moment that sparked interest — a project, a course, an internship — and what you enjoy about the work."],
      ["f", "Your CGPA is low. Why?", "Be honest, show improvement and redirect to strengths: “My first-year grades were low while I adjusted; I improved to 7.6 in later semesters and focused on hands-on projects.”"],
      ["f", "Are you willing to relocate or work in shifts?", "Answer clearly and honestly. If yes, say yes. If partly, say what you can do: “I can relocate to Kochi; I prefer day shift but can manage rotational shifts.”"],
      ["f", "Are you planning higher studies?", "If not soon, say so: “Not in the near future. I want industry experience first; any learning will be part-time and related to my work.”"],
      ["e", "Why are you leaving your current job?", "Stay positive and forward-looking: growth, scale, learning, domain. Never criticise your employer or manager."],
      ["e", "What is your current CTC and expected CTC?", "State current CTC accurately (fixed and variable separately) and give a researched expected range: “₹6.2 LPA fixed; I’m expecting ₹8–8.5 LPA based on the role and market.”"],
      ["e", "What is your notice period? Can you join earlier?", "Give the exact number of days and whether early release or buyout is possible. Don’t promise what you can’t deliver."],
      ["e", "Do you have any other offers?", "Be truthful. If yes: “I have one offer, but this role is my preference because of the product work.” Never invent an offer."],
      ["e", "Why have you changed jobs frequently?", "Give brief, factual reasons (project closure, relocation, growth) and show you are looking for stability now."],
      ["b", "Explain the gap in your resume.", "Brief reason plus what you did productively: courses, certifications, projects, family responsibilities. Keep it honest and short."],
      ["b", "How do you handle pressure or tight deadlines?", "Explain your method — prioritise, break work into steps, communicate early — and give one real example with a result."],
      ["b", "What do you know about our company?", "Mention what they do, key products or clients, size, location and something recent (news, launch). Shows you researched."],
      ["b", "Do you have any questions for us?", "Always ask 2–3: “What does success look like in the first 90 days?”, “How is the team structured?”, “What are the next steps?”"],
      ["b", "Are you comfortable with a service agreement (bond)?", "Ask for the details before committing: duration, amount and what it covers. Agree only after reading the terms in writing."]
    ]
  },
  {
    id: "managerial",
    name: "Managerial & behavioural",
    group: "HR & behavioural",
    round: "Managerial",
    intro: "Answer with STAR: Situation, Task, Action, Result — and say what you personally did.",
    qs: [
      ["b", "Tell me about a time you worked in a team.", "STAR example where you contributed and helped others — e.g. covering a teammate’s module before a deadline and still delivering on time."],
      ["b", "Describe a mistake you made and what you learned.", "Own a real mistake, explain the fix, and the lasting change: “I tested on the wrong build; now I verify the build number before every run.”"],
      ["b", "Tell me about a conflict with a colleague.", "Show you used facts and found a middle path, without blaming. End with the positive outcome."],
      ["b", "Describe a time you met a very tight deadline.", "Explain how you prioritised, what you cut or deferred, how you communicated, and the result."],
      ["b", "Tell me about something you learned quickly.", "Name the skill, how you learned it (docs, small project, mentor) and how fast you applied it."],
      ["e", "How do you handle an under-performing team member?", "Talk privately to understand causes, set clear expectations, offer support, check in regularly, and escalate only after support fails."],
      ["e", "Tell me about a decision you made with incomplete information.", "Explain the options, why you chose one (often the reversible or lowest-risk option), and the outcome."],
      ["e", "How do you prioritise when everything is urgent?", "Rank by impact and deadline, confirm the top priority with your manager, communicate what will slip, and protect focus time."],
      ["e", "How do you mentor juniors?", "Pair programming, code reviews with explanations, small ownership tasks, regular 1:1s — give an example of someone who improved."],
      ["e", "Tell me about a project you owned end to end.", "Cover requirement, plan, execution, risks, delivery and measurable result. Highlight your decisions."]
    ]
  },
  {
    id: "accounts",
    name: "Accounts & finance",
    group: "Business & finance",
    round: "Role-based",
    intro: "For accountant, accounts executive, AP/AR and finance associate roles.",
    qs: [
      ["f", "What are the golden rules of accounting?", "Personal account: debit the receiver, credit the giver. Real account: debit what comes in, credit what goes out. Nominal account: debit expenses and losses, credit incomes and gains."],
      ["f", "Pass the entry: paid office rent ₹10,000 by bank.", "Rent A/c Dr ₹10,000 · To Bank A/c ₹10,000."],
      ["f", "Pass the entry: sold goods on credit to Ravi for ₹25,000.", "Ravi A/c Dr ₹25,000 · To Sales A/c ₹25,000."],
      ["f", "What is the difference between capital and revenue expenditure?", "Capital expenditure creates long-term assets (buying a machine). Revenue expenditure is for day-to-day running (salaries, rent, repairs)."],
      ["f", "What is depreciation?", "The allocation of an asset’s cost over its useful life, reflecting wear and tear — e.g. straight-line or written-down value method."],
      ["b", "What is a bank reconciliation statement?", "A statement that matches the cash book balance with the bank passbook, explaining differences such as cheques issued but not presented, deposits not yet credited, and bank charges."],
      ["b", "Explain CGST, SGST and IGST.", "For a sale within the same state, GST is split into CGST (centre) and SGST (state). For a sale to another state, IGST is charged."],
      ["b", "What is TDS?", "Tax Deducted at Source — the payer deducts tax at prescribed rates when paying salary, rent, professional fees etc., and deposits it with the government."],
      ["b", "What is the difference between accrual and cash basis of accounting?", "Accrual records income and expenses when earned or incurred; cash basis records them only when cash is received or paid."],
      ["e", "How do you handle month-end closing?", "Reconcile bank and ledgers, book accruals and provisions, review AR/AP ageing, check GST/TDS entries, prepare trial balance and MIS, and resolve differences before sign-off."],
      ["e", "What is working capital and how can it be improved?", "Current assets minus current liabilities. Improve it by faster collections, better inventory control and negotiating longer supplier terms."]
    ]
  },
  {
    id: "hr-recruiter",
    name: "HR & recruitment roles",
    group: "Office & support",
    round: "Role-based",
    intro: "For HR executive, recruiter, talent acquisition and HR generalist roles.",
    qs: [
      ["f", "What does a recruiter do day to day?", "Understands requirements, sources candidates (portals, LinkedIn, referrals), screens, schedules interviews, coordinates feedback, negotiates offers and follows up until joining."],
      ["f", "What is a Boolean search? Give an example.", "A search using AND, OR, NOT and quotes to find profiles: <code>(\"Java Developer\" OR \"Backend Engineer\") AND \"Spring Boot\" AND Kochi</code>."],
      ["f", "What documents are collected at onboarding?", "Signed offer, ID and address proof, PAN, education certificates, previous relieving and experience letters, payslips, bank details, UAN, photographs."],
      ["b", "What is the difference between CTC, gross and net salary?", "CTC is the total employer cost; gross is monthly earnings before deductions; net is take-home after PF, professional tax and TDS."],
      ["b", "How do you reduce offer dropouts?", "Stay in touch until joining, share team and onboarding details, address concerns early, confirm notice timelines, and keep a backup candidate."],
      ["b", "What is employee engagement?", "How committed and involved employees are. Improved through recognition, growth, communication, feedback and a good work environment."],
      ["e", "Which recruitment metrics do you track?", "Time to fill, time to hire, source of hire, offer acceptance rate, cost per hire, interview-to-offer ratio and quality of hire."],
      ["e", "How would you hire 50 freshers in a month?", "Plan a drive: campus tie-ups and job posts, online aptitude screening, batch interviews on fixed days, quick offer approvals, and a joining tracker with regular follow-ups."]
    ]
  },
  {
    id: "customer-support",
    name: "Customer support & BPO",
    group: "Office & support",
    round: "Role-based",
    intro: "For voice, non-voice, chat, email and technical support roles.",
    qs: [
      ["f", "How would you handle an angry customer?", "Listen without interrupting, acknowledge the feeling, apologise for the experience, take action or explain next steps with a timeline, and follow up."],
      ["f", "What is the difference between voice and non-voice process?", "Voice process handles customers on calls; non-voice handles email, chat or back-office work."],
      ["f", "What do AHT, FCR and CSAT mean?", "AHT = Average Handling Time; FCR = First Call (Contact) Resolution; CSAT = Customer Satisfaction score."],
      ["f", "What is an SLA?", "Service Level Agreement — committed response and resolution times, e.g. respond to emails within 4 hours."],
      ["b", "A customer asks something you don’t know. What do you do?", "Be honest, put them on a short hold or promise a callback, check the knowledge base or ask a senior, then give accurate information."],
      ["b", "How do you say no to a customer politely?", "Explain the reason briefly, offer an alternative, and stay positive: “I can’t refund this item, but I can arrange a replacement today.”"],
      ["e", "How would you improve a team’s CSAT?", "Analyse low-score tickets for patterns, update scripts and knowledge base, coach agents with call reviews, and fix recurring product issues with the product team."]
    ]
  },
  {
    id: "sales",
    name: "Sales & business development",
    group: "Business & finance",
    round: "Role-based",
    intro: "For inside sales, business development and account management roles.",
    qs: [
      ["f", "Sell me this pen.", "Ask questions first to learn the buyer’s need (“When did you last need to sign something important?”), then position the pen as the solution, handle one objection and ask for the sale."],
      ["f", "What is the difference between a lead and a prospect?", "A lead is anyone who might be interested; a prospect is a qualified lead that fits your customer profile and has shown real interest."],
      ["b", "How do you handle the objection “your price is too high”?", "Acknowledge it, ask what they’re comparing with, restate value and outcomes, and offer options like a smaller package rather than a quick discount."],
      ["b", "What is a sales funnel?", "Stages from awareness to purchase: lead → qualified → meeting/demo → proposal → negotiation → closed. Track conversion at each stage."],
      ["e", "How do you plan to hit a monthly target?", "Work backwards from target using conversion rates to the number of calls, meetings and proposals needed per week; track daily and adjust."],
      ["e", "Which CRM have you used and how?", "Name it (Zoho CRM, HubSpot, Salesforce) and describe pipeline updates, follow-up tasks, reports and forecasting."]
    ]
  },
  {
    id: "digital-marketing",
    name: "Digital marketing",
    group: "Marketing & creative",
    round: "Role-based",
    intro: "For SEO, social media, performance marketing and content roles.",
    qs: [
      ["f", "What is SEO and its main types?", "Search Engine Optimisation — improving visibility in organic search. On-page (content, titles, headings), off-page (backlinks, mentions) and technical SEO (speed, crawlability, mobile)."],
      ["f", "What is the difference between organic and paid traffic?", "Organic traffic comes from unpaid search and social; paid traffic comes from ads such as Google Ads or Meta Ads."],
      ["f", "What do CTR, CPC and CPM mean?", "CTR = clicks ÷ impressions; CPC = cost per click; CPM = cost per 1,000 impressions."],
      ["b", "What is a conversion rate? Calculate one.", "Conversions ÷ visitors × 100. If 40 of 2,000 visitors sign up, the conversion rate is 2%."],
      ["b", "What is ROAS?", "Return on Ad Spend = revenue from ads ÷ ad spend. ₹50,000 revenue on ₹10,000 spend is a ROAS of 5 (or 500%)."],
      ["b", "What is A/B testing?", "Showing two versions (e.g. two ad headlines) to similar audiences and comparing results to choose the better one."],
      ["e", "How would you plan a campaign for a new product launch?", "Define goal and audience, choose channels, set budget and KPIs, prepare creatives, launch with tracking (UTM, pixels), test variations, and optimise weekly."]
    ]
  },
  {
    id: "office-admin",
    name: "Office admin & MS Excel",
    group: "Office & support",
    round: "Role-based",
    intro: "For admin, MIS, data entry and back-office roles.",
    qs: [
      ["f", "What does VLOOKUP do? Write an example.", "Looks up a value in the first column of a range and returns a value from another column: <code>=VLOOKUP(A2, Sheet2!A:C, 3, FALSE)</code>. FALSE means exact match."],
      ["f", "How do you sum values that meet a condition?", "Use SUMIF: <code>=SUMIF(B:B, \"Kochi\", C:C)</code>, or SUMIFS for multiple conditions."],
      ["f", "What is a pivot table?", "A tool that summarises large data — e.g. total sales by region and month — by dragging fields into rows, columns and values."],
      ["f", "How do you remove duplicates in Excel?", "Select the data → Data tab → Remove Duplicates, choosing which columns to compare. Or use <code>=UNIQUE()</code> in newer Excel."],
      ["b", "Difference between COUNT, COUNTA and COUNTIF?", "COUNT counts numeric cells; COUNTA counts non-empty cells; COUNTIF counts cells meeting a condition."],
      ["b", "How do you keep office records organised?", "Consistent file naming, folder structure, a master register, regular backups, access control and a retention schedule."],
      ["e", "How would you automate a weekly MIS report?", "Use a structured data table, pivot tables or Power Query to refresh data, formulas for KPIs, and a template that updates with one refresh."]
    ]
  },
  {
    id: "content-writing",
    name: "Content writing",
    group: "Marketing & creative",
    round: "Role-based",
    intro: "For content writer, copywriter and technical writer roles.",
    qs: [
      ["f", "How do you research a topic you don’t know?", "Read official and reputable sources, note key facts, check dates, compare at least two sources, and keep a list of references."],
      ["f", "What is the difference between content writing and copywriting?", "Content writing informs or educates (blogs, guides); copywriting persuades the reader to act (ads, landing pages)."],
      ["b", "How do you write for SEO without keyword stuffing?", "Answer the search intent, use the main keyword in title, first paragraph and a heading, use related terms naturally, and write for readers first."],
      ["b", "How do you handle editor feedback?", "Read it fully, ask about anything unclear, apply changes, and keep a list of recurring feedback to improve future drafts."],
      ["e", "How do you measure content performance?", "Organic traffic, time on page, scroll depth, conversions or sign-ups, rankings for target keywords, and backlinks earned."]
    ]
  }
];
