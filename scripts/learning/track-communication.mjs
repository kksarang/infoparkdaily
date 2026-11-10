/* Communication for interviews — original InfoparkDaily lessons. Each lesson has a model script or template to adapt. */

export const COMM_TRACK = {
  key: "communication",
  name: "Communication",
  long: "Communication for interviews — introductions, HR answers, group discussions and workplace English",
  color: "#be185d",
  tagline: "Speak and write with confidence at work.",
  level: "All levels",
  lang: "static",
  wrapExample: true,
  feature: "Model answers + templates",
  heroLine: "Every lesson has a model script or template you can adapt",
  exampleTitle: "Model answer",
  exampleBadge: "Adapt it — don't memorise word for word",
  outputTitle: "Why it works",
  exampleNote: "Names, companies and figures are fictional. Replace them with your real details and practise saying it aloud.",
  lessons: [
    {
      slug: "self-introduction",
      title: "Tell me about yourself",
      summary: "A 60–90 second introduction using present → past → future, for freshers and experienced candidates.",
      body: `<p>“Tell me about yourself” opens almost every interview. It's not a request for your life story — it's a short professional pitch that shows why you fit <em>this</em> role.</p>
<h3>The structure: present → past → future</h3>
<ol>
<li><strong>Present</strong> — who you are now: your degree or current role, and your main skills.</li>
<li><strong>Past</strong> — one or two achievements that prove those skills (a project, internship or result with a number).</li>
<li><strong>Future</strong> — why you want this role at this company.</li>
</ol>
<p>Keep it to 60–90 seconds. Don't repeat your whole resume, don't start with family details or hobbies, and end on the role — that invites the next question.</p>`,
      example: `Fresher (B.Tech, applying for a junior developer role):

"Good morning. I'm Anu Kumar, a final-year B.Tech Computer Science
student from Kochi. I enjoy building web applications, and I've worked
mainly with JavaScript, React and Node.js.

For my final-year project, my team of three built a job-tracking web
app. I handled the React frontend and the login API, and we got
40 classmates to use it during placement season.

I also completed a two-month internship where I fixed UI bugs and
wrote unit tests for a client dashboard.

I'm applying for this role because your team builds products with
React and Node, and I want to grow as a full-stack developer in a
product company like yours."`,
      output: `• Opens with name, education and core skills — relevant to the job.
• Gives proof: a project with a clear personal role and a number (40 users).
• Ends by linking the candidate's skills to the company — a natural
  lead-in to the next question.
• About 70 seconds when spoken at a calm pace.`,
      points: ["Use present → past → future.", "Keep it 60–90 seconds.", "Include one or two achievements with numbers.", "End with why you want this role."],
      practice: "Write your own introduction using the three-part structure, record it on your phone, and cut anything that doesn't help you get this specific job.",
      quiz: { q: "What should 'Tell me about yourself' focus on?", options: ["Your family background", "A short professional summary that fits the role", "Your full resume, point by point", "Your hobbies"], answer: 1, why: "Interviewers want a concise pitch showing your skills, proof and motivation for the role." },
      interview: [
        ["Walk me through your resume.", "Use the same structure in time order: education or first role, the most relevant experiences with one result each, and what you're looking for now. Keep it to about two minutes and point to the parts that match the job."],
        ["Why should we hire you?", "Connect three things: the role's key needs (from the job description), your matching skills with proof, and your attitude — for example quick learning or ownership. Keep it specific to this job, not generic."]
      ]
    },
    {
      slug: "hr-answers",
      title: "Answering common HR questions",
      summary: "Strengths and weaknesses, why this company, career gaps, salary expectations and questions to ask.",
      body: `<p>HR rounds check attitude, communication and fit. Good answers are <strong>honest, specific and short</strong>, and they always come back to the job.</p>
<ul>
<li><strong>Strengths</strong> — name one or two that matter for the role, each with a short example.</li>
<li><strong>Weakness</strong> — a real but non-critical weakness, plus what you're doing to improve it.</li>
<li><strong>Why our company?</strong> — mention something specific you researched: their products, clients, tech stack or growth.</li>
<li><strong>Salary expectations</strong> — research the market range first; give a range and say you're flexible for the right role.</li>
<li><strong>Gaps</strong> — explain briefly and honestly, then show what you learned or did during the gap.</li>
</ul>
<p>At the end, always ask one or two questions — about the team, the first 90 days, or how performance is measured.</p>`,
      example: `Q: "What is your greatest weakness?"

"I used to find it hard to say no, so I'd take on too many tasks and
some deadlines got tight. Now I write my tasks in a simple tracker
with dates, and when a new request comes in I check my list and agree
on a realistic deadline with my lead. It's helped me deliver on time
and communicate earlier when something might slip."

Q: "What are your salary expectations?"

"From my research, the range for this role in Kochi is about
4 to 5.5 LPA for freshers. I'd expect something within that range,
but I'm flexible — the learning and the role matter most to me."`,
      output: `Weakness answer:
• Real, but not a core skill the job depends on.
• Shows self-awareness and a concrete improvement habit.

Salary answer:
• Shows research, gives a realistic range, stays open to discussion.
• Avoids naming a single number too early.`,
      points: ["Strengths need examples; weaknesses need an improvement plan.", "Research the company for 'Why us?'.", "Give a researched salary range, not a single number.", "Always ask the interviewer a question at the end."],
      practice: "Write answers to 'Why do you want to join us?' for two different companies you'd apply to, making each one specific to that company.",
      quiz: { q: "Which is the best way to answer 'What is your weakness?'", options: ["Say you have none", "Give a real, non-critical weakness and how you're improving it", "Mention a skill the job depends on", "Say 'I work too hard' with no example"], answer: 1, why: "Interviewers look for honesty and self-improvement; claiming no weakness or a disguised strength sounds rehearsed." },
      interview: [
        ["Where do you see yourself in five years?", "Show ambition tied to the role: becoming strong in the core skills, taking on bigger responsibility (leading modules or mentoring juniors) and growing with the company. Avoid saying you plan to leave, study abroad or start a business."],
        ["Why are you leaving your current job?", "Stay positive: focus on what you're moving towards — bigger responsibility, new technology, a better fit — rather than complaining about your current manager or company."]
      ]
    },
    {
      slug: "star-method",
      title: "Behavioural answers with STAR",
      summary: "Answering 'Tell me about a time…' questions with Situation, Task, Action, Result.",
      body: `<p>Behavioural questions start with “Tell me about a time when…” — a conflict, a mistake, a tight deadline, a difficult customer. Interviewers believe past behaviour predicts future behaviour.</p>
<h3>STAR</h3>
<ul>
<li><strong>S — Situation:</strong> brief context (one or two sentences).</li>
<li><strong>T — Task:</strong> what you had to achieve.</li>
<li><strong>A — Action:</strong> what <em>you</em> did, step by step. Spend most of your time here, and say “I”, not just “we”.</li>
<li><strong>R — Result:</strong> the outcome, ideally with a number, and what you learned.</li>
</ul>
<p>Prepare five or six stories from projects, internships, jobs or college events. One good story can answer several different questions.</p>`,
      example: `Q: "Tell me about a time you handled a tight deadline."

S: "During my internship, a client demo was moved two days earlier,
    and the dashboard's export feature wasn't finished."
T: "I was responsible for the export module and had to deliver it
    in two days instead of four."
A: "I listed the remaining work and agreed with my lead to ship CSV
    export first and leave PDF for the next release. I reused an
    existing library instead of writing my own, and I asked a senior
    to review my code the same evening so fixes didn't wait."
R: "We demoed CSV export on time, the client approved the dashboard,
    and PDF export shipped the following week. I learned to agree on
    scope early when time is short."`,
      output: `• Situation and task are short; most of the answer is the actions.
• Actions are specific and personal ("I listed", "I reused", "I asked").
• Result is concrete and includes a lesson learned.
• About 90 seconds when spoken.`,
      points: ["STAR = Situation, Task, Action, Result.", "Spend most time on your actions.", "Say 'I' for your part; credit the team honestly.", "Prepare five or six reusable stories."],
      practice: "Write STAR answers for 'a time you made a mistake' and 'a time you disagreed with a teammate'. Each answer must include what you learned.",
      quiz: { q: "Which part of a STAR answer should usually be the longest?", options: ["Situation", "Task", "Action", "Result"], answer: 2, why: "Interviewers want to understand what you personally did, so the Action part carries most of the weight." },
      interview: [
        ["Tell me about a conflict with a teammate.", "Use STAR. Describe a real disagreement about work (not personal), show that you listened and discussed it respectfully with facts, explain how you reached agreement or escalated properly, and give the positive outcome."],
        ["Tell me about a mistake you made.", "Pick a genuine but recoverable mistake, take ownership without blaming others, explain how you fixed it quickly and what you changed afterwards so it doesn't happen again."]
      ]
    },
    {
      slug: "group-discussion",
      title: "Group discussions",
      summary: "How GDs are evaluated, starting well, adding value, handling dominant speakers and summarising.",
      body: `<p>Many campus drives and BPO, banking and management roles use a <strong>group discussion (GD)</strong>: 6–12 candidates discuss a topic for 10–15 minutes while evaluators watch.</p>
<h3>What evaluators look for</h3>
<ul>
<li>Relevant content with facts or examples — not just opinions.</li>
<li>Clear communication — short points, good pace, simple English.</li>
<li>Listening and building on others' points (“Adding to what Ravi said…”).</li>
<li>Leadership — bringing the group back on track, inviting quiet members, summarising.</li>
</ul>
<h3>Do and don't</h3>
<ul>
<li>Do speak early, two or three times, with quality points.</li>
<li>Don't shout, interrupt mid-sentence or repeat what others said.</li>
<li>If you don't know the topic, listen first and then summarise or connect points.</li>
</ul>`,
      example: `Topic: "Should companies allow permanent work from home?"

Opening (if you start):
"I'd like to begin by looking at this from three sides — employees,
companies and customers. For employees, work from home saves travel
time; surveys during 2020–21 showed many people valued that highly.
But for companies, collaboration and training new freshers can be
harder remotely."

Building on others:
"I agree with Meera about productivity, and I'd add that it depends
on the role — support and coding can work well remotely, while
hardware or lab work can't."

Summarising (near the end):
"To sum up, the group agrees that a hybrid model balances flexibility
and collaboration, with the exact mix decided by the type of role."`,
      output: `• The opening gives a structure the group can follow.
• Building on a named person shows listening and teamwork.
• The summary is neutral and covers the group's view, not only
  your own — evaluators notice this.`,
      points: ["Evaluators score content, communication, listening and leadership.", "Speak early with structured, factual points.", "Build on others' points by name.", "Offer a balanced summary at the end."],
      practice: "Pick a topic such as 'AI will create more jobs than it removes', write three points for each side, and practise a 30-second opening and a 30-second summary.",
      quiz: { q: "You don't know much about the GD topic. What's the best approach?", options: ["Stay silent the whole time", "Listen first, then build on points and offer a summary", "Speak loudly to be noticed", "Change the topic"], answer: 1, why: "Listening and then connecting or summarising others' points still shows communication and leadership." },
      interview: [
        ["How do you handle someone who dominates a group discussion?", "Wait for a pause, acknowledge their point briefly, then bring in your view or invite others: \"That's a good point. I'd like to hear what others think about cost.\" Stay polite and never argue personally."],
        ["What's the difference between a GD and a debate?", "A debate is about winning your side. A GD is a collaborative discussion where the group explores the topic and ideally reaches a balanced view; evaluators reward teamwork as much as content."]
      ]
    },
    {
      slug: "professional-email",
      title: "Professional emails & messages",
      summary: "Subject lines, structure, tone and templates for applying, following up and replying to recruiters.",
      body: `<p>Your emails and WhatsApp/LinkedIn messages are often a recruiter's first impression. Professional writing is short, clear and polite.</p>
<h3>Structure</h3>
<ol>
<li><strong>Subject</strong> — specific: “Application – Junior Java Developer – Anu Kumar”.</li>
<li><strong>Greeting</strong> — “Dear Ms Menon,” or “Hello Hiring Team,”.</li>
<li><strong>Purpose</strong> in the first line.</li>
<li><strong>Key details</strong> in two or three short sentences or bullets.</li>
<li><strong>Clear next step</strong> and a polite close.</li>
<li><strong>Signature</strong> — full name, phone, LinkedIn or portfolio.</li>
</ol>
<p>Avoid “Hi dear”, text-speak (“plz”, “u”), all capitals and long paragraphs. Attach your resume as a PDF named <code>Anu-Kumar-Resume.pdf</code>.</p>`,
      example: `Subject: Application – Junior Java Developer (Ref: JD-214) – Anu Kumar

Dear Hiring Team,

I'm writing to apply for the Junior Java Developer role posted on
your careers page. I'm a 2026 B.Tech Computer Science graduate with
hands-on experience in Java, Spring Boot and MySQL.

• Built a REST API for a library system (Spring Boot, JPA, MySQL)
• Completed a 3-month internship on backend bug fixes and unit tests
• Available to join immediately

My resume is attached. I'd be glad to discuss how I can contribute
to your team.

Regards,
Anu Kumar
+91 90000 00000 · linkedin.com/in/anu-kumar-example`,
      output: `• The subject line tells the recruiter the role, reference and name.
• Purpose is in the first sentence; proof is in three scannable bullets.
• It ends with a clear, polite next step.
• It can be read in under 30 seconds.`,
      points: ["Use a specific subject line.", "State the purpose in the first line.", "Keep it short with scannable points.", "Sign off with your full name and contact details."],
      practice: "Write a follow-up email to a recruiter one week after an interview: thank them, restate your interest in one line and politely ask about next steps.",
      quiz: { q: "Which is the best subject line for a job application email?", options: ["Hi", "Job", "Application – Junior Java Developer – Anu Kumar", "PLEASE CHECK MY RESUME"], answer: 2, why: "A specific subject line helps the recruiter find, sort and open your email." },
      interview: [
        ["How should you follow up after an interview?", "Within a day, send a short thank-you email mentioning something specific from the conversation and your continued interest. If you hear nothing by the date they gave, send one polite follow-up asking about the timeline."],
        ["How do you reply to a recruiter's call or message when you're not interested?", "Thank them, decline politely in one line, and keep the door open: \"Thank you for considering me. I'm not looking for a change right now, but I'd be happy to stay in touch for future roles.\""]
      ]
    },
    {
      slug: "workplace-communication",
      title: "Workplace communication & meetings",
      summary: "Daily stand-ups, status updates, asking for help, giving bad news early and speaking in meetings.",
      body: `<p>Once you're hired, communication decides how quickly people trust you. Most of it is simple habits:</p>
<ul>
<li><strong>Stand-ups</strong> — say what you did yesterday, what you'll do today and anything blocking you. Keep it under a minute.</li>
<li><strong>Status updates</strong> — share progress before someone has to ask, especially near deadlines.</li>
<li><strong>Asking for help</strong> — first try for a reasonable time, then ask with context: what you tried and where you're stuck.</li>
<li><strong>Bad news early</strong> — if a deadline may slip, say so as soon as you know, with a reason and a new estimate.</li>
<li><strong>Meetings</strong> — prepare, take notes, and send a short summary with action items and owners.</li>
<li><strong>Clients</strong> — be polite, avoid jargon and confirm understanding in writing.</li>
</ul>`,
      example: `Daily stand-up update:
"Yesterday I finished the login page validation and raised a PR.
Today I'll fix the review comments and start the password-reset API.
I'm blocked on the email service credentials — Ravi, could you share
them after the call?"

Asking for help (team chat):
"Hi Meera, I'm getting a 403 when the frontend calls /api/orders.
I've checked the token is sent and the role is USER. Could you take
a quick look at the security config when you have 10 minutes?"

Flagging a delay early:
"Hi Priya, a heads-up: the report export will need one more day
because the client's sample file has a different date format.
New estimate: Thursday EOD. I'll update you tomorrow afternoon."`,
      output: `• Stand-up: three short parts, with the blocker and who can help.
• Help request: shows effort and context, and respects the other
  person's time.
• Delay message: early, gives the reason, a new date and the next update.`,
      points: ["Stand-ups: yesterday, today, blockers.", "Share progress before you're asked.", "Ask for help with context: what you tried and where you're stuck.", "Raise risks and delays early with a new estimate."],
      practice: "Write a message to your lead flagging that a task will be one day late, including the reason, the new estimate and when you'll next update them.",
      quiz: { q: "You realise on Monday that Friday's deadline will slip. When should you tell your lead?", options: ["On Friday evening", "Only if they ask", "As soon as you know, with a reason and a new estimate", "Never — work overtime instead"], answer: 2, why: "Raising risks early lets the team re-plan; late surprises damage trust much more than early warnings." },
      interview: [
        ["How do you explain a technical issue to a non-technical person?", "Start with the impact on them, use a simple analogy, avoid jargon, give the plan and timeline, and confirm they understood. Follow up in writing for important points."],
        ["What do you do when you disagree with your manager's decision?", "Ask questions to understand their reasons, share your concern privately with facts and a suggested alternative, and if the decision stands, commit to it fully and professionally."]
      ]
    }
  ]
};
