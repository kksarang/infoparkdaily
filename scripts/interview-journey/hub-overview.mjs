/* /interview/ — InfoparkDaily Career Academy overview (course-catalogue layout). */
import { pageShell, hubNav, crumbs, crumbsLd, ASSET_V } from "./shell.mjs";
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
    points: ["HR & managerial questions", "21 technical subjects", "Non-IT roles"],
    meta: [[I.book, "254 questions"], [I.level, "30 subjects"], [I.clock, "Self-paced"]],
    progress: "questions",
    total: 254,
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
    text: "Role roadmaps, communication practice, free courses and certifications to build job-ready skills.",
    points: ["8 role roadmaps", "Communication plan", "19 free learning platforms"],
    meta: [[I.book, "8 roadmaps"], [I.clock, "30-day plan"], [I.level, "Beginner+"]],
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
  ["Practise questions", "/interview/questions/", "254 questions with answers"],
  ["Prepare each round", "/interview/preparation/", "17-chapter interview course"],
  ["Accept & join", "/interview/preparation/#ch-offer-stage", "Offer, BGV and day one"]
];

export function overviewPage() {
  const chapters = [...chaptersA, ...chaptersB, ...chaptersC];
  const items = [["InfoparkDaily", "/"], ["Career Tools", "/resume-builder/"], ["Interview hub", "/interview/"]];

  const SIZE = { preparation: "xl", questions: "wide", learning: "sm", email: "sm", resume: "wide", jobs: "wide" };
  const course = (c) => {
    const size = SIZE[c.key] || "sm";
    const extraXl =
      size === "xl"
        ? `<ol class="bx-mods">${MODULES.map(
            ([tag, title, , [from, to]]) => `<li><span>${tag.replace("Module ", "M")}</span>${title}<em>${to - from + 1} lessons</em></li>`
          ).join("")}</ol><div class="bx-tracks"><span>Tracks</span><b>🎓 Fresher</b><b>💼 Experienced</b></div>`
        : "";
    return `
          <article class="bx bx--${size} bx--${c.tone} ij-reveal" id="hub-${c.key}">
            <div class="bx-top">
              <span class="bx-icon" aria-hidden="true">${svg(c.icon)}</span>
              <span class="bx-cat">${c.cat}</span>
            </div>
            <h3><a href="${c.href}" class="bx-link">${c.title}</a></h3>
            <p class="bx-text">${c.text}</p>
            ${extraXl}
            <ul class="bx-meta">${c.meta.map(([ic, t]) => `<li>${svg(ic)}${t}</li>`).join("")}</ul>
            ${
              c.progress
                ? `<div class="ac-progress bx-progress" data-ac-progress="${c.progress}" data-total="${c.total}" data-unit="${c.unit}"><div class="ac-bar"><span></span></div><p><span data-ac-status>Not started</span><b data-ac-pct>0%</b></p></div>`
                : ""
            }
            <div class="bx-actions">
              <span class="bx-cta" data-ac-cta="${c.progress || ""}">${c.cta} </span><span class="bx-arrow" aria-hidden="true">→</span>
              ${(c.extra || []).map(([h, l]) => `<a class="bx-chip" href="${h}">${l}</a>`).join("")}
            </div>
          </article>`;
  };

  const module = ([tag, title, text, [from, to]]) => {
    const list = chapters.slice(from - 1, to);
    const mins = list.reduce((s, c) => s + c.time, 0);
    return `
          <details class="ac-module ij-reveal"${from === 1 ? " open" : ""}>
            <summary>
              <span class="ac-module-tag">${tag}</span>
              <span class="ac-module-title"><strong>${title}</strong><small>${list.length} lessons · ${mins} min</small></span>
              <span class="ac-module-chev" aria-hidden="true"></span>
            </summary>
            <p class="ac-module-text">${text}</p>
            <ol class="ac-lessons">
              ${list
                .map(
                  (c) => `<li data-ac-lesson="${c.id}"><a href="/interview/preparation/#ch-${c.id}"><span class="ac-lesson-num">${String(c.num).padStart(2, "0")}</span><span class="ac-lesson-title">${c.title}</span><span class="ac-lesson-time">${c.time} min</span><span class="ac-lesson-state" aria-hidden="true"></span></a></li>`
                )
                .join("")}
            </ol>
          </details>`;
  };

  const CHIPS = [["HR round", "/interview/questions/#q-hr-round"], ["Java", "/interview/questions/#q-java"], ["SQL", "/interview/questions/#q-sql"], ["Python", "/interview/questions/#q-python"], ["Testing", "/interview/questions/#q-manual-testing"], ["Accounts", "/interview/questions/#q-accounts"]];
  const main = `
      <section class="ax-hero" aria-labelledby="hub-title">
        <div class="ax-glow" aria-hidden="true"></div>
        <div class="ij-wrap ax-grid">
          <div class="ax-copy">
            ${crumbs(items)}
            <p class="ax-pill"><span>New</span> InfoparkDaily Career Academy · 100% free</p>
            <h1 id="hub-title">Prepare. Learn. Improve.<br /><span>Get hired.</span></h1>
            <p class="ax-lede">Everything you need for your next career move — from finding jobs to cracking interviews. Self-paced courses, 254 practice questions and live code, for freshers and experienced professionals.</p>
            <form class="ax-search" action="/interview/questions/" method="get" role="search">
              <label class="ij-sr" for="ax-q">Search interview questions</label>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 3a7 7 0 0 1 5.6 11.2l5.1 5.1-1.4 1.4-5.1-5.1A7 7 0 1 1 10 3Zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"/></svg>
              <input id="ax-q" name="q" type="search" placeholder="Search interview questions — e.g. “second highest salary”" autocomplete="off" />
              <button type="submit">Search</button>
            </form>
            <div class="ax-chips"><span>Popular:</span>${CHIPS.map(([t, h]) => `<a href="${h}">${t}</a>`).join("")}</div>
            <div class="ax-cta">
              <a class="ax-btn ax-btn--yellow" href="/interview/preparation/" data-ac-continue>Start interview course →</a>
              <a class="ax-btn ax-btn--ghost" href="#courses">Explore career resources</a>
            </div>
            <ul class="ax-stats">
              <li><strong>17</strong> chapters</li>
              <li><strong>254</strong> questions</li>
              <li><strong>30</strong> subjects</li>
              <li><strong>11</strong> email templates</li>
            </ul>
          </div>

          <div class="ax-visual" aria-hidden="true">
            <div class="ax-card ax-card--course">
              <div class="ax-card-head"><span class="ax-dot"></span>Interview Preparation<em>Course</em></div>
              <div class="ax-course-row">
                <div class="ac-ring ax-ring" data-ac-ring style="--p:0"><span data-ac-ring-pct>0%</span></div>
                <div><strong>Your progress</strong><small>17 chapters · fresher &amp; experienced</small></div>
              </div>
              <ul class="ax-lessons">
                <li class="is-done"><i></i>Job discovery</li>
                <li class="is-done"><i></i>Resume creation</li>
                <li class="is-now"><i></i>HR screening call</li>
                <li><i></i>Technical interview</li>
              </ul>
            </div>
            <div class="ax-card ax-card--q">
              <span class="ax-q-tag">HR round · Fresher</span>
              <p class="ax-q">“Tell me about yourself.”</p>
              <p class="ax-a">Present → past → proof → future, in 60–90 seconds…</p>
              <span class="ax-q-btn">Practised ✓</span>
            </div>
            <div class="ax-card ax-card--code">
              <div class="ax-code-bar"><span></span><span></span><span></span><em>query.sql</em></div>
              <pre><b>SELECT</b> MAX(salary)
<b>FROM</b> employees
<b>WHERE</b> salary &lt; (…);</pre>
            </div>
            <div class="ax-card ax-card--toast"><span class="ax-toast-icon">✓</span><div><strong>Offer received</strong><small>Java Developer · Infopark</small></div></div>
          </div>
        </div>
        <div class="ij-wrap">
          <p class="ax-parks"><span>Built for jobs at</span> Infopark Kochi <i></i> Technopark <i></i> Cyberpark <i></i> UL CyberPark <i></i> SmartCity Kochi</p>
        </div>
      </section>
${hubNav("overview")}
      <section class="ac-section ax-courses" id="courses" aria-labelledby="courses-title">
        <div class="ij-wrap">
          <div class="ac-head">
            <div>
              <p class="ax-eyebrow">Course catalogue</p>
              <h2 id="courses-title">Everything you need, in one academy</h2>
              <p>Short overviews here — open any course for lessons, examples, templates and tools.</p>
            </div>
            <a class="ax-link" href="/interview/preparation/">View full curriculum →</a>
          </div>
          <div class="bx-grid">${COURSES.map(course).join("")}</div>
        </div>
      </section>

      <section class="ac-section ac-section--soft" id="curriculum" aria-labelledby="cur-title">
        <div class="ij-wrap ac-curriculum">
          <div class="ac-cur-intro">
            <p class="ac-eyebrow">Curriculum</p>
            <h2 id="cur-title">Interview Preparation course outline</h2>
            <p>Four modules, seventeen lessons. Open any lesson directly, or follow them in order. Lessons you mark complete are ticked here.</p>
            <dl class="ac-cur-facts">
              <div><dt>Lessons</dt><dd>17</dd></div>
              <div><dt>Duration</dt><dd>${Math.round(chapters.reduce((s, c) => s + c.time, 0) / 60 * 10) / 10} hrs</dd></div>
              <div><dt>Tracks</dt><dd>Fresher · Experienced</dd></div>
              <div><dt>Format</dt><dd>Guides, examples, templates</dd></div>
            </dl>
            <a class="ac-btn" href="/interview/preparation/" data-ac-continue>Start the course</a>
          </div>
          <div class="ac-modules">${MODULES.map(module).join("")}</div>
        </div>
      </section>

      <section class="ac-section" id="job-search" aria-labelledby="js-title">
        <div class="ij-wrap">
          <div class="ac-jobs">
            <div class="ac-jobs-main">
              <span class="ac-badge">Primary platform</span>
              <h2 id="js-title">Discover job opportunities with InfoparkDaily</h2>
              <p>Find the latest openings, fresher opportunities, walk-in interviews and career updates from Infopark Kochi, Technopark, Cyberpark and other companies — collected from public sources into one community feed.</p>
              <ul class="ac-jobs-links">
                <li><a href="/jobs/today/">Latest job updates</a></li>
                <li><a href="/jobs/?type=fresher">Fresher jobs</a></li>
                <li><a href="/jobs/?type=experienced">Experienced jobs</a></li>
                <li><a href="/jobs/?type=walkin">Walk-in interviews</a></li>
                <li><a href="/jobs/?type=nonit">Non-IT jobs</a></li>
                <li><a href="/join/">Job alerts</a></li>
              </ul>
              <div class="ac-hero-cta"><a class="ac-btn ac-btn--yellow" href="/jobs/">Explore jobs → infoparkdaily.online/jobs</a></div>
            </div>
            <div class="ac-jobs-side">
              <h3>Other job search platforms</h3>
              <p>InfoparkDaily is your primary job discovery platform. No single portal lists every vacancy, so explore these too:</p>
              <ul>
                ${[
                  ["LinkedIn Jobs", "https://www.linkedin.com/jobs/"],
                  ["Naukri", "https://www.naukri.com/"],
                  ["Indeed", "https://in.indeed.com/"],
                  ["Company career pages", "https://www.google.com/search?q=company+careers"],
                  ["IT park job boards", "https://infopark.in/companies-job"],
                  ["Internshala", "https://internshala.com/"]
                ]
                  .map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener noreferrer">${n} <span aria-hidden="true">↗</span></a></li>`)
                  .join("")}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="ac-section ac-section--soft" aria-labelledby="route-title">
        <div class="ij-wrap">
          <div class="ac-head"><div><p class="ac-eyebrow">Learning path</p><h2 id="route-title">Your route from resume to offer</h2></div></div>
          <ol class="ac-route ij-reveal">
            ${PATH.map(([t, h, d], i) => `<li><a href="${h}"><span class="ac-route-num">Step ${i + 1}</span><strong>${t}</strong><small>${d}</small></a></li>`).join("")}
          </ol>
        </div>
      </section>

      <section class="ac-section" aria-labelledby="how-title">
        <div class="ij-wrap">
          <div class="ac-head"><div><p class="ac-eyebrow">How it works</p><h2 id="how-title">Learn the way that suits you</h2></div></div>
          <div class="ac-features">
            <div><span>${svg(I.book)}</span><h3>Self-paced lessons</h3><p>Read one chapter at a time or jump to the stage you’re at.</p></div>
            <div><span>${svg(I.level)}</span><h3>Two tracks</h3><p>Switch between fresher and experienced content anywhere.</p></div>
            <div><span>${svg(I.check)}</span><h3>Track progress</h3><p>Mark lessons and questions complete — saved on your device.</p></div>
            <div><span>${svg(I.mail)}</span><h3>Real templates</h3><p>Copy emails, answers and scripts and adapt them to you.</p></div>
          </div>
        </div>
      </section>

      <section class="ij-wrap ac-final" aria-labelledby="final-title">
        <div>
          <p class="ac-eyebrow">Ready?</p>
          <h2 id="final-title">Start your first lesson today.</h2>
          <p>Build your resume, practise questions and apply to today’s openings — all free.</p>
        </div>
        <div class="ac-hero-cta">
          <a class="ac-btn ac-btn--yellow ac-btn--lg" href="/interview/preparation/" data-ac-continue>Start learning</a>
          <a class="ac-btn ac-btn--ghost-dark ac-btn--lg" href="/jobs/">Browse jobs</a>
        </div>
      </section>`;

  return pageShell({
    title: "Career Academy – Interview Preparation, Questions, Learning &amp; Resume | InfoparkDaily",
    description:
      "InfoparkDaily Career Academy: free self-paced interview preparation for freshers and experienced, 254 interview questions with answers, skill roadmaps and free courses, professional email templates, and resume & ATS guides.",
    path: "/interview/",
    ogTitle: "Prepare. Learn. Improve. Get hired. — InfoparkDaily Career Academy",
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
        crumbsLd(items)
      ]
    },
    bodyClass: "hub-overview ac-page",
    main,
    scripts: [`/js/interview-hub.js?v=${ASSET_V}`]
  });
}
