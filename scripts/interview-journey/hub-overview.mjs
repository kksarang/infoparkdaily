/* /interview/ — InfoparkDaily Career Academy overview (course-catalogue layout). */
import { pageShell, hubNav, crumbs, crumbsLd, ASSET_V, channelsRow } from "./shell.mjs";
import { chaptersA } from "./chapters-a.mjs";
import { chaptersB } from "./chapters-b.mjs";
import { chaptersC } from "./chapters-c.mjs";

const I = {
  prep: '<path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3Zm-6 9.2V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-3.8l-6 3.3-6-3.3Z"/>',
  qa: '<path d="M4 4h16v11H8l-4 4V4Zm7.1 3.2c-1.2 0-2 .6-2.3 1.7l1.3.5c.2-.6.5-.8 1-.8s.9.3.9.7c0 .3-.2.6-.7.9-.7.4-1 .9-1 1.6v.4h1.4v-.3c0-.4.2-.6.6-.9.8-.5 1.2-1 1.2-1.8 0-1.2-1-2-2.4-2Zm-.7 6.1v1.4h1.5v-1.4h-1.5Z"/>',
  learn: '<path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4V4Zm16 0h-4a3 3 0 0 0-1 .2V20a2 2 0 0 1 2-2h3V4Z"/>',
  mail: '<path d="M3 5h18v14H3V5Zm2 2v.5l7 4.6 7-4.6V7H5Zm14 2.9-7 4.6-7-4.6V17h14V9.9Z"/>',
  resume: '<path d="M6 2h9l5 5v15H6V2Zm8 1.5V8h4.5L14 3.5ZM9 12v1.5h8V12H9Zm0 3v1.5h8V15H9Zm0 3v1.5h5V18H9Z"/>',
  jobs: '<path d="M9 3h6a2 2 0 0 1 2 2v2h4v12H3V7h4V5a2 2 0 0 1 2-2Zm0 4h6V5H9v2Zm-4 5v5h14v-5h-6v1h-2v-1H5Z"/>',
  clock: '<path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm1 3v5.4l3.5 2.1-1 1.7L11 13.5V7h2Z"/>',
  book: '<path d="M5 3h12a2 2 0 0 1 2 2v16l-4-2-4 2-4-2-4 2V5a2 2 0 0 1 2-2Z"/>',
  level: '<path d="M4 20h4V12H4v8Zm6 0h4V7h-4v13Zm6 0h4V3h-4v17Z"/>',
  check: '<path d="M9.5 16.2 5.3 12l-1.4 1.4 5.6 5.6L20.1 8.4 18.7 7l-9.2 9.2Z"/>'
};
const svg = (p, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;

const COURSES = [
  {
    key: "preparation",
    href: "/interview/preparation/",
    icon: I.prep,
    cat: "Core programme",
    tone: "ink",
    title: "Interview Preparation",
    text: "The complete hiring journey — from finding jobs to joining day — for freshers and experienced professionals.",
    points: ["Fresher & experienced tracks", "HR, technical and managerial rounds", "Salary, offer and joining"],
    meta: [[I.book, "17 chapters"], [I.clock, "3.5 hrs"], [I.level, "All levels"]],
    progress: "journey",
    total: 17,
    unit: "chapters",
    cta: "Start course"
  },
  {
    key: "questions",
    href: "/interview/questions/",
    icon: I.qa,
    cat: "Practice lab",
    tone: "yellow",
    title: "Interview Questions & Answers",
    text: "Frequently asked HR, technical and role-based questions with sample answers you can adapt.",
    points: ["HR & managerial questions", "21 IT subjects", "21 non-IT career fields"],
    meta: [[I.book, "354 questions"], [I.level, "44 subjects"], [I.clock, "Self-paced"]],
    progress: "questions",
    total: 354,
    unit: "practised",
    cta: "Start practising"
  },
  {
    key: "learning",
    href: "/interview/learning/",
    icon: I.learn,
    cat: "Skills",
    tone: "soft",
    title: "Learning & Skill Development",
    text: "31 learning paths for IT and non-IT careers, free courses, certifications and live code practice.",
    points: ["31 learning paths (IT & non-IT)", "Live code with answer checking", "Free courses & certifications"],
    meta: [[I.book, "31 learning paths"], [I.clock, "Self-paced"], [I.level, "All levels"]],
    cta: "Explore skills"
  },
  {
    key: "email",
    href: "/interview/email-guide/",
    icon: I.mail,
    cat: "Communication",
    tone: "ink",
    title: "Professional Email Guide",
    text: "When to send each email, subject lines, samples to copy, and the dos and don’ts recruiters notice.",
    points: ["Application & resume emails", "Follow-up & confirmation", "Thank-you & offer emails"],
    meta: [[I.book, "11 templates"], [I.clock, "20 min"], [I.level, "All levels"]],
    cta: "Open guide"
  },
  {
    key: "resume",
    href: "/interview/resume-ats/",
    icon: I.resume,
    cat: "Applications",
    tone: "cream",
    title: "Resume & ATS Preparation",
    text: "Structure a strong resume, understand ATS screening, fix common mistakes and optimise for each job.",
    points: ["Resume structure & bullets", "How ATS reads resumes", "Free builder & ATS checker"],
    meta: [[I.book, "5 modules"], [I.clock, "25 min"], [I.level, "All levels"]],
    cta: "Open guide",
    extra: [["/resume-builder/templates/", "Build resume"], ["/ats-checker/", "Check ATS"]]
  },
  {
    key: "jobs",
    href: "/jobs/",
    icon: I.jobs,
    cat: "Job board",
    tone: "yellow",
    title: "Find Jobs on InfoparkDaily",
    text: "Latest openings, fresher roles, walk-ins and community updates from Infopark, Technopark and Cyberpark.",
    points: ["Fresher & experienced jobs", "Walk-in interviews", "IT & non-IT openings"],
    meta: [[I.book, "Updated daily"], [I.level, "All levels"], [I.clock, "Alerts available"]],
    cta: "Browse jobs"
  }
];

const MODULES = [
  ["Module 1", "Prepare & apply", "Find the right roles, decode the JD, build your resume and apply the right way.", [1, 6]],
  ["Module 2", "Inside the company", "What happens after you click Apply — ATS, recruiters and shortlisting.", [7, 8]],
  ["Module 3", "Interview rounds", "HR call, aptitude and technical tests, technical and managerial interviews, salary.", [9, 13]],
  ["Module 4", "Decision & joining", "Selection, offer letter, onboarding — and how to bounce back from rejection.", [14, 17]]
];

const PATH = [
  ["Build your resume", "/resume-builder/templates/", "Free ATS-friendly templates"],
  ["Check it against a job", "/ats-checker/", "Private keyword & readability check"],
  ["Find & apply", "/jobs/", "InfoparkDaily job board + alerts"],
  ["Practise questions", "/interview/questions/", "354 questions · IT & non-IT"],
  ["Prepare each round", "/interview/preparation/", "17-chapter interview course"],
  ["Accept & join", "/interview/preparation/#ch-offer-stage", "Offer, BGV and day one"]
];

const PLANS = {
  fresher: {
    label: "Fresher / student plan",
    intro: "No experience yet? That’s fine. Follow these steps in order — most freshers get interview-ready in 2–4 weeks.",
    steps: [
      ["Make your first resume", "Use a simple one-page template. Put projects, internships and skills first — you don’t need work experience.", "30 min", "/resume-builder/templates/", "Build my resume", "resume"],
      ["Check it against a job", "Paste a job description and see which keywords are missing. Fix them honestly.", "10 min", "/ats-checker/", "Check my resume", "ats"],
      ["Find fresher jobs & walk-ins", "Look for Trainee, Associate, Junior and Intern roles. Walk-ins are great practice.", "15 min a day", "/jobs/?type=fresher", "See fresher jobs", "jobs"],
      ["Send a proper application email", "Short subject, 5–6 lines, resume attached as PDF. Copy a template and change the details.", "10 min", "/interview/email-guide/#email-job-application", "Get email template", "email"],
      ["Practise HR & aptitude questions", "Start with “Tell me about yourself”, then aptitude and basics of your subject.", "30 min a day", "/interview/questions/?level=fresher", "Practise fresher questions", "questions"],
      ["Learn & try live code", "Fill skill gaps with free courses and practise code right in your browser.", "Ongoing", "/interview/learning/", "Start learning", "code"],
      ["Prepare for each interview round", "Understand HR, test, technical and manager rounds — what they check and how to answer.", "2–3 hrs", "/interview/preparation/", "Open the guide", "interview"],
      ["Got an offer? Check it first", "Understand CTC vs in-hand, bond, joining date and documents before you accept.", "20 min", "/interview/preparation/#ch-offer-stage", "Read offer tips", "offer"]
    ]
  },
  experienced: {
    label: "Experienced professional plan",
    intro: "Switching jobs? Work through these steps while you’re still employed — start 2–3 months before you want to move.",
    steps: [
      ["Update your resume with results", "Show achievements with numbers, not duties. Keep titles and dates exactly as in your letters.", "45 min", "/resume-builder/templates/", "Update my resume", "resume"],
      ["Match it to the roles you want", "Check keywords against 2–3 target job descriptions.", "10 min per job", "/ats-checker/", "Check my resume", "ats"],
      ["Find experienced roles & referrals", "Use the Experienced and Referral filters on InfoparkDaily Jobs, plus LinkedIn and Naukri.", "15 min a day", "/jobs/?type=experienced", "See experienced jobs", "jobs"],
      ["Reach recruiters and referrers", "Send short referral requests and recruiter replies that get answered.", "15 min", "/interview/email-guide/#more-emails", "Get email templates", "email"],
      ["Practise technical & managerial questions", "System questions, project stories and STAR answers for manager rounds.", "30 min a day", "/interview/questions/?level=experienced", "Practise experienced questions", "questions"],
      ["Prepare salary & notice-period answers", "Know your current CTC, expected range, notice period and buyout options.", "30 min", "/interview/preparation/#ch-final-hr-round", "Salary & negotiation guide", "salary"],
      ["Compare offers, then resign right", "Check the offer letter, accept in writing, then resign and hand over cleanly.", "30 min", "/interview/preparation/#ch-offer-stage", "Offer & resignation guide", "offer"]
    ]
  }
};

/* Flat illustrations for plan cards (240×140, brand colours). */
const ART = {
  resume: `<svg viewBox="0 0 240 140" aria-hidden="true"><rect x="78" y="14" width="84" height="112" rx="10" fill="#fff" stroke="#12151b" stroke-width="3"/><circle cx="100" cy="38" r="10" fill="#ffc107"/><rect x="116" y="32" width="34" height="6" rx="3" fill="#12151b"/><rect x="116" y="42" width="22" height="5" rx="2.5" fill="#12151b" opacity=".35"/><rect x="92" y="62" width="58" height="5" rx="2.5" fill="#12151b" opacity=".45"/><rect x="92" y="74" width="50" height="5" rx="2.5" fill="#12151b" opacity=".45"/><rect x="92" y="86" width="56" height="5" rx="2.5" fill="#12151b" opacity=".45"/><rect x="92" y="98" width="40" height="5" rx="2.5" fill="#12151b" opacity=".45"/><circle cx="170" cy="104" r="18" fill="#12151b"/><path d="M161 104l6 6 12-13" fill="none" stroke="#ffc107" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  ats: `<svg viewBox="0 0 240 140" aria-hidden="true"><rect x="40" y="22" width="96" height="98" rx="10" fill="#fff" stroke="#12151b" stroke-width="3"/><rect x="54" y="40" width="60" height="6" rx="3" fill="#12151b"/><rect x="54" y="54" width="68" height="5" rx="2.5" fill="#ffc107"/><rect x="54" y="66" width="48" height="5" rx="2.5" fill="#12151b" opacity=".35"/><rect x="54" y="78" width="62" height="5" rx="2.5" fill="#ffc107"/><rect x="54" y="90" width="40" height="5" rx="2.5" fill="#12151b" opacity=".35"/><circle cx="160" cy="76" r="36" fill="#12151b"/><path d="M160 76m-26 0a26 26 0 1 1 52 0" fill="none" stroke="#ffc107" stroke-width="8" stroke-linecap="round"/><text x="160" y="88" text-anchor="middle" font-family="Space Grotesk, Arial" font-size="20" font-weight="700" fill="#fff">82%</text></svg>`,
  jobs: `<svg viewBox="0 0 240 140" aria-hidden="true"><rect x="56" y="40" width="128" height="80" rx="14" fill="#12151b"/><rect x="96" y="22" width="48" height="24" rx="8" fill="none" stroke="#12151b" stroke-width="6"/><rect x="56" y="72" width="128" height="6" fill="#ffc107"/><rect x="110" y="64" width="20" height="20" rx="5" fill="#fff"/><circle cx="186" cy="38" r="16" fill="#fff" stroke="#12151b" stroke-width="3"/><text x="186" y="44" text-anchor="middle" font-family="Space Grotesk, Arial" font-size="15" font-weight="700" fill="#12151b">12</text></svg>`,
  email: `<svg viewBox="0 0 240 140" aria-hidden="true"><rect x="52" y="30" width="136" height="88" rx="12" fill="#fff" stroke="#12151b" stroke-width="3"/><path d="M52 42l68 42 68-42" fill="none" stroke="#12151b" stroke-width="4" stroke-linejoin="round"/><circle cx="186" cy="34" r="18" fill="#ffc107" stroke="#12151b" stroke-width="3"/><path d="M178 34l6 6 10-12" fill="none" stroke="#12151b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  questions: `<svg viewBox="0 0 240 140" aria-hidden="true"><rect x="34" y="22" width="112" height="48" rx="14" fill="#12151b"/><path d="M52 70l-6 14 18-14" fill="#12151b"/><rect x="50" y="36" width="70" height="7" rx="3.5" fill="#ffc107"/><rect x="50" y="50" width="48" height="6" rx="3" fill="#fff" opacity=".55"/><rect x="96" y="76" width="112" height="44" rx="14" fill="#fff" stroke="#12151b" stroke-width="3"/><path d="M190 120l6 12-18-12" fill="#fff" stroke="#12151b" stroke-width="3" stroke-linejoin="round"/><rect x="112" y="90" width="76" height="6" rx="3" fill="#12151b"/><rect x="112" y="102" width="52" height="6" rx="3" fill="#12151b" opacity=".35"/><text x="182" y="58" font-family="Space Grotesk, Arial" font-size="36" font-weight="700" fill="#12151b">?</text></svg>`,
  code: `<svg viewBox="0 0 240 140" aria-hidden="true"><rect x="38" y="18" width="164" height="104" rx="12" fill="#12151b"/><rect x="38" y="18" width="164" height="20" rx="12" fill="#262b35"/><circle cx="52" cy="28" r="4" fill="#ff5f57"/><circle cx="64" cy="28" r="4" fill="#febc2e"/><circle cx="76" cy="28" r="4" fill="#28c840"/><path d="M70 66l-14 12 14 12M170 66l14 12-14 12" fill="none" stroke="#ffc107" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M130 58l-20 42" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>`,
  interview: `<svg viewBox="0 0 240 140" aria-hidden="true"><rect x="36" y="34" width="72" height="72" rx="14" fill="#fff" stroke="#12151b" stroke-width="3"/><circle cx="72" cy="60" r="12" fill="#ffc107"/><rect x="54" y="78" width="36" height="16" rx="8" fill="#12151b"/><rect x="132" y="34" width="72" height="72" rx="14" fill="#12151b"/><circle cx="168" cy="60" r="12" fill="#fff"/><rect x="150" y="78" width="36" height="16" rx="8" fill="#ffc107"/><path d="M112 70h16" stroke="#12151b" stroke-width="3" stroke-dasharray="4 4"/></svg>`,
  offer: `<svg viewBox="0 0 240 140" aria-hidden="true"><rect x="64" y="16" width="112" height="112" rx="10" fill="#fff" stroke="#12151b" stroke-width="3"/><rect x="80" y="34" width="56" height="7" rx="3.5" fill="#12151b"/><rect x="80" y="50" width="80" height="5" rx="2.5" fill="#12151b" opacity=".35"/><rect x="80" y="62" width="72" height="5" rx="2.5" fill="#12151b" opacity=".35"/><rect x="80" y="74" width="60" height="5" rx="2.5" fill="#12151b" opacity=".35"/><circle cx="150" cy="104" r="16" fill="#ffc107" stroke="#12151b" stroke-width="3"/><path d="M142 118l-4 14 12-6 12 6-4-14" fill="#12151b"/><path d="M84 104c6-8 12 8 18 0s12 8 18 0" fill="none" stroke="#12151b" stroke-width="3" stroke-linecap="round"/></svg>`,
  salary: `<svg viewBox="0 0 240 140" aria-hidden="true"><rect x="40" y="30" width="120" height="76" rx="12" fill="#12151b"/><circle cx="100" cy="68" r="20" fill="#ffc107"/><text x="100" y="76" text-anchor="middle" font-family="Space Grotesk, Arial" font-size="22" font-weight="700" fill="#12151b">₹</text><rect x="52" y="42" width="18" height="6" rx="3" fill="#ffc107"/><rect x="130" y="88" width="18" height="6" rx="3" fill="#ffc107"/><path d="M170 104l20-26 14 12 18-30" fill="none" stroke="#12151b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M212 58l10 2-2 10" fill="none" stroke="#12151b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};
const TONES = ["yellow", "ink", "cream", "soft"];

const QUICK = [
  ["Practise interview questions", "/interview/questions/", I.qa],
  ["Write a job email", "/interview/email-guide/", I.mail],
  ["Build or fix my resume", "/resume-builder/templates/", I.resume],
  ["Find jobs today", "/jobs/", I.jobs]
];

const HELP = [
  ["I’m a fresher with no experience. Is this for me?", "Yes. Choose <strong>Fresher / student</strong> above. Every step is written for people applying for their first job — projects and internships count."],
  ["I don’t know which job to apply for.", "Start with <a href=\"/jobs/?type=fresher\">fresher jobs</a> or <a href=\"/jobs/?type=walkin\">walk-ins</a>, read a few job descriptions, and pick roles that match your degree and projects. The <a href=\"/interview/learning/\">Learning</a> page shows what each role needs."],
  ["I have an interview tomorrow. What should I do?", "Practise “Tell me about yourself” and the <a href=\"/interview/questions/#q-hr-round\">HR questions</a>, revise your resume line by line, and read the <a href=\"/interview/preparation/#ch-initial-interview\">HR call</a> and <a href=\"/interview/preparation/#ch-technical-interview\">technical interview</a> chapters."],
  ["Is everything free? Do I need to sign up?", "Everything here is free and works without signing up. Your progress is saved in your browser. Sign in only if you want to save resumes in the Resume Builder."],
  ["Is InfoparkDaily the company hiring me?", "No. InfoparkDaily lists openings from companies and public sources. Always apply through the method on the job listing, and never pay anyone for a job."]
];

export function overviewPage() {
  const items = [["InfoparkDaily", "/"], ["Interview hub", "/interview/"]];

  const totalTime = (kind) => (kind === "fresher" ? "About 2–4 weeks" : "About 8–12 weeks alongside your job");
  const plan = (kind) => {
    const p = PLANS[kind];
    return `
          <div class="ez-plan" data-plan="${kind}">
            <div class="ez-plan-bar">
              <div class="ez-plan-left">
                <span class="ez-plan-tag">${kind === "fresher" ? "🎓" : "💼"} ${p.label}</span>
                <p>${p.intro}</p>
              </div>
              <ul class="ez-plan-facts">
                <li><strong>${p.steps.length}</strong><span>steps</span></li>
                <li><strong>${kind === "fresher" ? "2–4" : "8–12"}</strong><span>weeks</span></li>
              </ul>
            </div>
            <ol class="pc-grid" aria-label="${p.label}: ${totalTime(kind)}">
              ${p.steps
                .map(
                  ([t, d, time, href, cta, art], i) => `<li class="pc pc--${TONES[i % TONES.length]}">
                <a class="pc-art" href="${href}" tabindex="-1" aria-hidden="true">${ART[art] || ""}<span class="pc-num">Step ${i + 1}</span></a>
                <div class="pc-body">
                  <h3><a href="${href}">${t}</a></h3>
                  <p>${d}</p>
                </div>
                <div class="pc-foot">
                  <span class="pc-time">${svg(I.clock)}${time}</span>
                  <a class="pc-btn" href="${href}">${cta} <span aria-hidden="true">→</span></a>
                </div>
              </li>`
                )
                .join("")}
            </ol>
            <p class="ez-switch">Not you? <button type="button" data-set-track="${kind === "fresher" ? "experienced" : "fresher"}">Switch to the ${kind === "fresher" ? "experienced" : "fresher"} plan</button></p>
          </div>`;
  };

  const tile = (c) => `
            <a class="ez-tile ez-tile--${c.tone}" href="${c.href}">
              <span class="ez-tile-icon" aria-hidden="true">${svg(c.icon)}</span>
              <span class="ez-tile-body"><strong>${c.title}</strong><span>${c.text}</span><em>${c.meta.map(([, t]) => t).slice(0, 2).join(" · ")}</em></span>
              <span class="ez-tile-go" aria-hidden="true">→</span>
            </a>`;

  const main = `
      <section class="ez-hero" aria-labelledby="hub-title">
        <div class="ax-glow" aria-hidden="true"></div>
        <div class="ij-wrap">
          ${crumbs(items)}
          <div class="ez-hero-copy">
            <p class="ax-pill"><span>Free</span> InfoparkDaily career hub</p>
            <h1 id="hub-title"><small class="ez-h1-kw">Interview preparation for Kerala IT jobs</small> Prepare. Learn. Improve. <span>Get hired.</span></h1>
            <p class="ax-lede">A simple step-by-step plan to get your next job — from your resume to your offer letter. Tell us where you are, and we’ll show you what to do next.</p>
          </div>
          <div class="ez-choose" role="group" aria-labelledby="ez-q">
            <p class="ez-q" id="ez-q">Who are you?</p>
            <div class="ez-choices">
              <button type="button" class="ez-choice" data-set-track="fresher" aria-pressed="false">
                <span class="ez-choice-emoji" aria-hidden="true">🎓</span>
                <span class="ez-choice-text"><strong>I’m a fresher / student</strong><small>Looking for my first job, internship or campus placement</small></span>
                <span class="ez-choice-go" aria-hidden="true">→</span>
              </button>
              <button type="button" class="ez-choice" data-set-track="experienced" aria-pressed="false">
                <span class="ez-choice-emoji" aria-hidden="true">💼</span>
                <span class="ez-choice-text"><strong>I’m experienced</strong><small>Already working and want to switch or grow</small></span>
                <span class="ez-choice-go" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
          <div class="ez-quick">
            <span>Know what you need?</span>
            ${QUICK.map(([t, h, ic]) => `<a href="${h}">${svg(ic)}${t}</a>`).join("")}
          </div>
        </div>
      </section>
${hubNav("overview")}
      <section class="ez-section" id="plan" aria-labelledby="plan-title">
        <div class="ij-wrap">
          <div class="ez-head">
            <p class="ax-eyebrow">Your plan</p>
            <h2 id="plan-title">Your step-by-step plan</h2>
          </div>
          <div class="ez-empty">
            <p><strong>Choose “fresher” or “experienced” above</strong> to see your plan.</p>
            <div class="ez-empty-btns">
              <button type="button" class="ax-btn ax-btn--yellow" data-set-track="fresher">🎓 Show fresher plan</button>
              <button type="button" class="ax-btn ez-btn-dark" data-set-track="experienced">💼 Show experienced plan</button>
            </div>
          </div>
          ${plan("fresher")}
          ${plan("experienced")}
        </div>
      </section>

      <section class="ez-section ez-section--soft" id="courses" aria-labelledby="courses-title">
        <div class="ij-wrap">
          <div class="ez-head">
            <p class="ax-eyebrow">All resources</p>
            <h2 id="courses-title">Or explore everything</h2>
            <p>Every guide and tool, in one place.</p>
          </div>
          <div class="ez-tiles">${COURSES.map(tile).join("")}</div>
        </div>
      </section>

      <section class="ac-section" id="job-search" aria-labelledby="js-title">
        <div class="ij-wrap">
          <div class="ac-jobs">
            <div class="ac-jobs-main">
              <span class="ac-badge">Primary platform</span>
              <h2 id="js-title">Discover job opportunities with InfoparkDaily</h2>
              <p>The latest openings, fresher roles, walk-in interviews and career updates from Infopark Kochi, Technopark, Cyberpark and other companies — in one community feed.</p>
              <ul class="ac-jobs-links">
                <li><a href="/jobs/today/">Latest job updates</a></li>
                <li><a href="/jobs/?type=fresher">Fresher jobs</a></li>
                <li><a href="/jobs/?type=experienced">Experienced jobs</a></li>
                <li><a href="/jobs/?type=walkin">Walk-in interviews</a></li>
                <li><a href="/jobs/?type=nonit">Non-IT jobs</a></li>
                <li><a href="/join/">Job alerts</a></li>
              </ul>
              <div class="ac-hero-cta"><a class="ac-btn ac-btn--yellow" href="/jobs/">Explore jobs → infoparkdaily.online/jobs</a></div>
${channelsRow("dark")}
            </div>
            <div class="ac-jobs-side">
              <h3>Other job search platforms</h3>
              <p>InfoparkDaily is your main starting point. No single site lists every vacancy, so check these too:</p>
              <ul>
                ${[
                  ["LinkedIn Jobs", "https://www.linkedin.com/jobs/"],
                  ["Naukri", "https://www.naukri.com/"],
                  ["Indeed", "https://in.indeed.com/"],
                  ["Company career pages", "https://www.google.com/search?q=company+careers"],
                  ["Infopark job board", "https://infopark.in/companies-job"],
                  ["Technopark job search", "https://technopark.in/job-search"],
                  ["Cyberpark careers", "https://cyberparks.in/careers/"],
                  ["Internshala", "https://internshala.com/"]
                ]
                  .map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener noreferrer">${n} <span aria-hidden="true">↗</span></a></li>`)
                  .join("")}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="ez-section ez-section--soft" id="help" aria-labelledby="help-title">
        <div class="ij-wrap ez-narrow">
          <div class="ez-head">
            <p class="ax-eyebrow">Help</p>
            <h2 id="help-title">Not sure where to start?</h2>
          </div>
          <div class="ez-help">
            ${HELP.map(([q, a], i) => `<details class="ez-help-item"${i === 0 ? " open" : ""}><summary>${q}</summary><p>${a}</p></details>`).join("")}
          </div>
        </div>
      </section>`;

  return pageShell({
    title: "Interview Preparation &amp; Questions for Freshers | InfoparkDaily",
    description: "Free interview prep for freshers & experienced: 354 Q&As, resume & ATS tips, email templates and Infopark, Technopark job links.",
    path: "/interview/",
    ogTitle: "Interview preparation for Kerala IT jobs — InfoparkDaily",
    ogImage: "https://infoparkdaily.online/assets/og/interview-hub.jpg",
    ogImageAlt: "InfoparkDaily interview preparation: plans for freshers and experienced, 354 questions, 31 learning paths",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ItemList",
          name: "InfoparkDaily Career Academy courses",
          itemListElement: COURSES.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://infoparkdaily.online${c.href}`,
            name: c.title
          }))
        },
        {
          "@type": "FAQPage",
          mainEntity: HELP.map(([q, a]) => ({
            "@type": "Question",
            name: q.replace(/&rsquo;|’/g, "'"),
            acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "") }
          }))
        },
        crumbsLd(items)
      ]
    },
    bodyClass: "hub-overview ac-page",
    main,
    scripts: [`/js/interview-hub.js?v=${ASSET_V}`]
  });
}
