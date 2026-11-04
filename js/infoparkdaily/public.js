import {
  ROOT,
  SECTORS,
  BASES,
  esc,
  curatedJobs,
  filterJobs,
  filterWorkers,
  dateISO,
  money,
  safeURL,
} from "./model.js";
import {
  icon,
  href,
  link,
  mark,
  empty,
  pageHero,
  jobCard,
  workerCard,
  avatar,
  formatDate,
  select,
  area,
  field,
  check,
  message,
  dialog,
  toast,
} from "./ui.js";
export function home(state) {
  const companies = new Set(state.jobs.map((j) => j.company)).size;
  const WA = "https://whatsapp.com/channel/0029VbDJFfA4Y9lm5L4kpm22";
  const IG = "https://www.instagram.com/infoparkdaily.jobs/";
  const faq = [
    ["Is posting free?", "Yes. Both the quick hiring request and the employer workspace are free. Every post is reviewed before it goes live."],
    ["How long does review take?", "Usually within one working day. You can track a quick request with its ID, and employer posts show their status in your dashboard."],
    ["Can I post a walk-in drive or a quick job alert?", "Yes. Choose Walk-in drive to add date, time, venue and documents — or Quick job alert for just the role, contact and last date."],
    ["Do I need an account?", "No. Use Post without sign-in for any job, walk-in or job alert. Create a free employer account if you want a dashboard for all your posts."],
    ["What gets rejected?", "Posts that ask candidates for money, use unverifiable contacts, or have unclear company details. We’ll add a note so you can fix and resubmit."],
    ["Where do approved posts appear?", "On the InfoparkDaily jobs board, its park pages and job search — and they can be shared to our WhatsApp and Instagram job channels."]
  ];
  return `
<section class="rx-hero">
  <div class="rx-glow" aria-hidden="true"></div>
  <div class="container rx-hero-grid">
    <div class="rx-hero-copy">
      <p class="rx-pill"><span>Recruit</span> Kerala’s community hiring platform</p>
      <h1>Hire faster across<br><em>Kerala’s tech parks.</em></h1>
      <p class="rx-lede">Post a job or a walk-in drive, get it verified by the InfoparkDaily team, and reach 77K+ job seekers across Infopark, Technopark and Cyberpark.</p>
      <div class="rx-paths">
        <a class="rx-path rx-path--quick" href="${href("post")}">
          <span class="rx-path-icon">${icon("plus")}</span>
          <span class="rx-path-text"><strong>Post without sign-in</strong><small>Job, walk-in or job alert · track by ID</small></span>
          ${icon("right")}
        </a>
        <a class="rx-path rx-path--work" href="${href("post-job")}">
          <span class="rx-path-icon">${icon("briefcase")}</span>
          <span class="rx-path-text"><strong>Employer workspace</strong><small>Post, track applications &amp; hire</small></span>
          ${icon("right")}
        </a>
      </div>
      <ul class="rx-trust">
        <li>${icon("shield")} Every post verified</li>
        <li>${icon("pin")} Jobs &amp; walk-in drives</li>
        <li>${icon("check")} Free for employers</li>
      </ul>
    </div>
    <div class="rx-visual" aria-hidden="true">
      <div class="rx-card rx-card--post">
        <div class="rx-card-top"><span class="rx-chip rx-chip--walk">Walk-in drive</span><span class="rx-chip rx-chip--ok">Live</span></div>
        <h3>Junior QA Engineer</h3>
        <p>Brightloop · Infopark Phase 1, Kochi</p>
        <div class="rx-facts"><span>${icon("clock")} Sat · 10 am – 1 pm</span><span>${icon("users")} 6 openings</span></div>
        <ol class="rx-flow"><li class="on"><i></i>Submitted</li><li class="on"><i></i>Verified</li><li class="on"><i></i>Live on /jobs/</li></ol>
      </div>
      <div class="rx-card rx-card--stats">
        <p class="rx-k">This week</p>
        <div class="rx-bars"><span style="--h:40%"></span><span style="--h:62%"></span><span style="--h:48%"></span><span style="--h:80%"></span><span style="--h:66%"></span><span style="--h:92%"></span><span style="--h:74%"></span></div>
        <p class="rx-big"><strong>128</strong> candidate views</p>
      </div>
      <div class="rx-card rx-card--toast"><span>${icon("check")}</span><div><strong>Approved by InfoparkDaily</strong><small>Your post is now live</small></div></div>
      <div class="rx-card rx-card--reach"><span>${icon("bell")}</span><div><strong>Shared to job alerts</strong><small>WhatsApp · Instagram</small></div></div>
    </div>
  </div>
  <div class="container"><div class="rx-strip">
    <div><strong>77K+</strong><span>community reach</span></div>
    <div><strong data-job-count>${state.jobs.length}</strong><span>open roles on the board</span></div>
    <div><strong data-company-count>${companies}</strong><span>companies hiring</span></div>
    <div><strong>3</strong><span>IT parks · Kochi, TVM, Kozhikode</span></div>
  </div></div>
</section>

<section class="rx-section" id="two-ways">
  <div class="container">
    <div class="rx-head"><p class="rx-eyebrow">Two ways to hire</p><h2>Pick what fits your hiring.</h2><p>Both include regular jobs and walk-in drives — and every post is reviewed before it goes live.</p></div>
    <div class="rx-ways">
      <article class="rx-way rx-way--quick">
        <span class="rx-way-tag">No account needed</span>
        <h3>Post without sign-in</h3>
        <p>For one-time openings. Fill one guided form and our team publishes it after verification.</p>
        <ul>
          <li>${icon("check")} One guided form</li>
          <li>${icon("check")} Job, walk-in drive or quick job alert</li>
          <li>${icon("check")} Track status by request ID</li>
          <li>${icon("check")} Candidates apply via your email or link</li>
        </ul>
        <div class="rx-way-cta"><a class="btn" href="${href("post")}">Post without sign-in ${icon("right")}</a><a class="text-link" href="${href("track")}">Track a post</a></div>
      </article>
      <article class="rx-way rx-way--work">
        <span class="rx-way-tag">Free employer account</span>
        <h3>Employer workspace</h3>
        <p>For teams that hire regularly. Manage every job and walk-in drive from one dashboard.</p>
        <ul>
          <li>${icon("check")} Unlimited posts &amp; walk-ins</li>
          <li>${icon("check")} Live status for every post</li>
          <li>${icon("check")} Edit, repost or close any time</li>
          <li>${icon("check")} Company profile saved for next time</li>
        </ul>
        <div class="rx-way-cta"><a class="btn" href="${href("register")}">Create employer account ${icon("right")}</a>${link("Sign in", "sign-in", "text-link")}</div>
      </article>
    </div>
  </div>
</section>

<section class="rx-section rx-section--soft" id="how">
  <div class="container">
    <div class="rx-head"><p class="rx-eyebrow">How it works</p><h2>From post to hire in five steps.</h2></div>
    <ol class="rx-steps">
      ${[
        ["plus", "Post", "Share a regular job or a walk-in drive with company details."],
        ["shield", "Verified", "The InfoparkDaily team checks the company, contacts and details."],
        ["briefcase", "Live", "It appears on the jobs board and park pages."],
        ["bell", "Reach", "Shared to 77K+ followers on WhatsApp & Instagram alerts."],
        ["users", "Hire", "Candidates apply by email, your link or walk in."]
      ].map(([i, t, d], n) => `<li><span class="rx-step-icon">${icon(i)}</span><span class="rx-step-n">0${n + 1}</span><strong>${t}</strong><p>${d}</p></li>`).join("")}
    </ol>
  </div>
</section>

<section class="rx-section" id="reach">
  <div class="container rx-reach">
    <div class="rx-reach-main">
      <p class="rx-eyebrow rx-eyebrow--dark">Reach</p>
      <h2>Your opening, in front of Kerala’s tech community.</h2>
      <p>Approved posts appear where job seekers already look every day.</p>
      <div class="rx-reach-list">
        <a href="/jobs/">${icon("briefcase")}<span><strong>InfoparkDaily jobs board</strong><small>Search, filters and park pages</small></span></a>
        <a href="${WA}" target="_blank" rel="noopener noreferrer">${icon("chat")}<span><strong>WhatsApp job channel</strong><small>Daily job alerts</small></span></a>
        <a href="${IG}" target="_blank" rel="noopener noreferrer">${icon("star")}<span><strong>@infoparkdaily.jobs</strong><small>Instagram job posts</small></span></a>
        <a href="/jobs/?type=walkin">${icon("pin")}<span><strong>Walk-in listings</strong><small>Date, venue &amp; documents</small></span></a>
      </div>
    </div>
    <div class="rx-reach-num"><strong>77K+</strong><span>people in the InfoparkDaily community</span><a class="btn" href="${href("post")}">Post your opening ${icon("right")}</a></div>
  </div>
</section>

<section class="rx-section rx-section--soft" id="alerts">
  <div class="container rx-alerts">
    <div class="rx-alert rx-alert--seek">
      <span class="rx-alert-icon">${icon("bell")}</span>
      <p class="rx-eyebrow">For job seekers</p>
      <h2>Get job alerts on WhatsApp or email.</h2>
      <p>Choose roles, parks and experience — we send matching jobs and walk-in drives. No sign-in, pause any time.</p>
      <a class="btn" href="${href("alerts")}">Create a job alert ${icon("right")}</a>
    </div>
    <div class="rx-alert rx-alert--hire">
      <span class="rx-alert-icon">${icon("plus")}</span>
      <p class="rx-eyebrow rx-eyebrow--dark">For employers</p>
      <h2>Post a quick job alert.</h2>
      <p>Only the role, contact and last date. Verified and shared to the jobs board and alert subscribers.</p>
      <a class="btn" href="${href("post", "?type=alert")}">Post a job alert ${icon("right")}</a>
    </div>
  </div>
</section>

<section class="rx-section">
  <div class="container">
    <div class="rx-head"><p class="rx-eyebrow">Why InfoparkDaily</p><h2>Built for trust on both sides.</h2></div>
    <div class="rx-features">
      ${[
        ["shield", "Verified before it’s public", "Every job, walk-in and profile is checked by our team — no fee-taking or fake posts."],
        ["eye", "Track every step", "Request IDs and a live dashboard show exactly where each post stands."],
        ["pin", "Walk-in drives made simple", "Date, time, venue, map link and documents — clear for candidates."],
        ["chat", "Private hiring workspace", "Applications, shortlists and conversations stay in your account."],
        ["bell", "Job alerts for seekers", "Candidates subscribe to alerts, so the right people hear about your opening."],
        ["star", "Free for employers", "Posting and the employer dashboard cost nothing — and candidates never pay."]
      ].map(([i, t, d]) => `<div class="rx-feature"><span>${icon(i)}</span><h3>${t}</h3><p>${d}</p></div>`).join("")}
    </div>
  </div>
</section>

<section class="rx-section rx-section--soft" id="faq">
  <div class="container rx-faq-wrap">
    <div class="rx-head"><p class="rx-eyebrow">Employer FAQ</p><h2>Questions from hiring teams.</h2></div>
    <div class="rx-faq">${faq.map(([q, a], i) => `<details${i === 0 ? " open" : ""}><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>
  </div>
</section>

<section class="rx-section">
  <div class="container"><div class="rx-cta">
    <div><p class="rx-eyebrow rx-eyebrow--dark">Start hiring today</p><h2>Your next hire is in the community.</h2><p>Post a job or walk-in drive in minutes — free, verified and seen by 77K+ people.</p></div>
    <div class="rx-cta-btns"><a class="btn" href="${href("post")}">Post without sign-in ${icon("right")}</a>${link("Create employer account", "register", "btn secondary")}</div>
  </div></div>
</section>`;
}
const promoItems = [
  [
    "plus",
    "Post a role in minutes",
    "Share an opening with your company details. It goes live after a quick review.",
    "Post a role",
    href("post-job"),
  ],
  [
    "users",
    "Browse reviewed talent",
    "Explore professionals by skill, location and availability — then invite the right fit.",
    "Find talent",
    href("workers"),
  ],
  [
    "briefcase",
    "Run hiring in one place",
    "Track applications, invites and messages from your employer dashboard.",
    "Open workspace",
    href("dashboard"),
  ],
  [
    "settings",
    "Need custom software?",
    "Websites, apps and AI tools for growing teams — with Enitexa.ai.",
    "Meet Enitexa.ai",
    "/software-solutions/",
  ],
];
let promoOffset = 0;
function promos() {
  return promoItems
    .map((_, i) => promoItems[(i + promoOffset + 4) % 4])
    .map(
      ([i, t, d, l, u]) =>
        `<article class="promo">${icon(i)}<h3>${t}</h3><p>${d}</p><a class="text-link" href="${u}">${l} ${icon("arrow")}</a></article>`,
    )
    .join("");
}
export function rotatePromos(n) {
  promoOffset = (promoOffset + n + 4) % 4;
  document.querySelector("#promo-grid").innerHTML = promos();
}
export const workersHome = (workers) =>
  workers.length
    ? `<div class="grid four">${workers.slice(0, 4).map(workerCard).join("")}</div>`
    : empty(
        "Talent directory is opening up.",
        "Reviewed professionals will appear here. Meanwhile, post a role and start hiring from your workspace.",
        link("Post a role", "post-job") +
          " " +
          link("Create employer account", "register", "btn secondary"),
        "users",
      );
export function howItWorks() {
  return `<section class="section reveal-section" id="how-it-works"><div class="container"><div class="section-head"><div><p class="eyebrow">From brief to hire</p><h2>Hire in three clear steps.</h2></div></div><div class="grid three steps-grid">${[
    [
      "01",
      "Create your employer account",
      "Sign in with your work email, add your company, and open your hiring workspace.",
    ],
    [
      "02",
      "Post a role or invite talent",
      "Publish openings for review, or invite people from the talent directory to a role you own.",
    ],
    [
      "03",
      "Manage hiring in one place",
      "Track applications, request a hire, and continue the conversation after approval.",
    ],
  ]
    .map(
      ([n, t, d]) =>
        `<div class="step"><span class="step-number">${n}</span><h3>${t}</h3><p>${d}</p></div>`,
    )
    .join("")}</div></div></section>`;
}
export function directory(state, kind) {
  const workers = kind === "workers",
    qs = new URLSearchParams(location.search);
  state.filters = {
    q: qs.get("q") || "",
    sector: qs.get("sector") || "",
    location: qs.get("location") || "",
    basis: qs.get("basis") || "",
    sort: qs.get("sort") || "newest",
    urgent: qs.get("urgent") === "1",
    available: qs.get("available") === "1",
    source: qs.get("source") || "",
    remote: qs.get("remote") === "1",
    fresher: qs.get("fresher") === "1",
  };
  state.page = Number(qs.get("page")) || 1;
  return `${pageHero(workers ? "Find your next great hire." : "Find work that fits you.", workers ? "Explore reviewed professionals by skill, location and availability. Invite the right person to your role." : "Explore opportunities from Kerala’s IT parks and the InfoparkDaily community.", `<form class="search-bar" id="directory-search">${icon("search")}<input name="q" value="${esc(state.filters.q)}" aria-label="${workers ? "Search name, skill or location" : "Search job title, skill or company"}" placeholder="${workers ? "Name, skill or location" : "Job title, skill or company"}"><button class="btn">Search</button></form>`)}<div class="container directory"><button class="btn secondary filter-mobile" data-filter-toggle aria-expanded="false" aria-controls="directory-filters">${icon("filter")} Filter ${workers ? "workers" : "jobs"} ${icon("plus")}</button><form id="directory-filters" class="filter-panel"><div class="row spread"><h3>Filters</h3><button class="btn quiet" type="reset">Reset all</button></div>${select("Category", "sector", SECTORS, state.filters.sector, "All categories")}${select("Location", "location", [...new Set((workers ? state.workers : state.jobs).map((j) => j.location))].sort(), state.filters.location, "All locations")}${!workers ? select("Listing source", "source", [...new Set(state.jobs.map((j) => j.source || "Community"))].sort(), state.filters.source, "All sources") : ""}${select(
    workers ? "Rate basis" : "Pay basis",
    "basis",
    BASES.map((b) => [b, "Per " + b]),
    state.filters.basis,
    "Any basis",
  )}<div class="field">${check(workers ? "Available for work" : "Closing soon", workers ? "available" : "urgent", workers ? state.filters.available : state.filters.urgent)}${!workers ? check("Remote options", "remote", state.filters.remote) + check("Fresher friendly", "fresher", state.filters.fresher) : ""}</div></form><div><div class="results-toolbar"><strong id="result-count" role="status"></strong>${workers ? "" : `<select id="directory-sort" aria-label="Sort jobs"><option value="newest">Newest first</option><option value="closing">Closing soonest</option><option value="pay">Highest disclosed pay</option></select>`}</div><div id="directory-results"></div><div class="pagination" id="pagination"></div></div></div>`;
}
export function updateDirectory(state, kind) {
  const workers = kind === "workers",
    rows = workers
      ? filterWorkers(state.workers, state.filters)
      : filterJobs(state.jobs, state.filters),
    size = 12,
    pages = Math.max(1, Math.ceil(rows.length / size));
  state.page = Math.min(Math.max(1, state.page), pages);
  document.querySelector("#result-count").textContent =
    `${rows.length} ${workers ? "professionals" : "opportunities"} found`;
  document.querySelector("#directory-results").innerHTML = rows.length
    ? `<div class="grid three">${rows
        .slice((state.page - 1) * size, state.page * size)
        .map((r, i) =>
          workers ? workerCard(r) : jobCard(r, i, state.savedIds.has(r.id)),
        )
        .join("")}</div>`
    : empty(
        workers
          ? "Your next connection is on its way."
          : "No matches just yet.",
        workers
          ? "Talent profiles appear here after review. Post a role while the directory grows, or try another category."
          : "Try a different keyword or clear a filter to see more opportunities.",
        workers
          ? link("Post a role", "post-job") +
              " " +
              link("Employer sign-in", "sign-in", "btn secondary")
          : '<button class="btn secondary" data-clear-filters>Clear filters</button>',
        workers ? "users" : "search",
      );
  document.querySelector("#pagination").innerHTML =
    pages > 1
      ? `<button class="btn secondary small" data-page="${state.page - 1}" ${state.page === 1 ? "disabled" : ""}>Previous</button><span>Page ${state.page} of ${pages}</span><button class="btn secondary small" data-page="${state.page + 1}" ${state.page === pages ? "disabled" : ""}>Next</button>`
      : "";
  const sort = document.querySelector("#directory-sort");
  if (sort) sort.value = state.filters.sort;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(state.filters))
    if (v && v !== "newest") params.set(k, v === true ? "1" : v);
  if (state.page > 1) params.set("page", state.page);
  history.replaceState(
    null,
    "",
    location.pathname + (params.size ? "?" + params : ""),
  );
}
export function jobDetail(j, state) {
  const closed =
    j.status !== "approved" ||
    (j.closingDate && j.closingDate !== "Rolling" && j.closingDate < dateISO());
  /* External apply: curated listings, or community posts that use their own link/email. */
  const external =
    j.kind === "curated" || ["link", "email"].includes(j.applyMethod);
  const walkin = j.postType === "walkin" || j.applyMethod === "walkin";
  const applyURL = safeURL(
    j.applyLink ||
      (j.applyEmail ? "mailto:" + j.applyEmail : "") ||
      (j.email ? "mailto:" + j.email : ""),
    true,
  );
  const w = j.walkIn || {};
  return `<div class="container"><div class="breadcrumb" style="margin-top:30px">${link("Browse jobs", "jobs", "")}<span>/</span><span>${esc(j.company)}</span></div><div class="detail-layout"><div><div class="row" style="margin-bottom:24px">${mark(j.company)}<div><strong>${esc(j.company)}</strong><p class="small muted" style="margin:5px 0 0">${esc(j.location)}</p></div></div><h1 class="detail-title">${esc(j.title)}</h1><div class="tags"><span class="tag">${esc(j.sector)}</span><span class="tag neutral">${esc(j.employmentType || "Opportunity")}</span><span class="tag ${closed ? "red" : external ? "neutral" : ""}">${closed ? "Applications closed" : external ? "From an official listing" : "Reviewed community job"}</span></div><div class="fact-grid">${[
    ["Experience", j.experience || "See job details"],
    ["Work arrangement", j.workMode || "Not specified"],
    ["Pay", j.payText || (j.pay ? money(j.pay, j.basis) : "Not disclosed")],
    [
      "Apply by",
      j.closingDate && j.closingDate !== "Rolling"
        ? formatDate(j.closingDate)
        : "Rolling applications",
    ],
  ]
    .map(
      ([l, v]) =>
        `<div class="fact"><small>${l}</small><strong>${l === "Pay" && j.pay ? v : esc(v)}</strong></div>`,
    )
    .join(
      "",
    )}</div><div class="panel prose"><h2>About this opportunity</h2><p>${esc(j.description || "See the official listing for the full role description.")}</p>${
    j.allRoles?.length > 1
      ? `<h3>Other roles in this listing</h3><ul>${j.allRoles
          .slice(1)
          .map((role) => `<li>${esc(role)}</li>`)
          .join("")}</ul>`
      : ""
  }${j.requirements?.length ? `<h3>What you’ll bring</h3><ul>${j.requirements.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` : ""}${j.responsibilities?.length ? `<h3>What you’ll do</h3><ul>${j.responsibilities.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` : ""}${j.benefits?.length ? `<h3>What the employer offers</h3><ul>${j.benefits.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` : ""}${j.skills?.length ? `<h3>Skills</h3><div class="tags">${j.skills.map((s) => `<span class="tag neutral">${esc(s)}</span>`).join("")}</div>` : ""}${walkin ? `<div class="walkin-box"><h3>${icon("pin")} Walk-in drive</h3><dl>${w.date ? `<div><dt>Date</dt><dd>${esc(formatDate(w.date))}</dd></div>` : ""}${w.time ? `<div><dt>Time</dt><dd>${esc(w.time)}</dd></div>` : ""}${w.venue ? `<div><dt>Venue</dt><dd>${esc(w.venue)}</dd></div>` : ""}${w.documents ? `<div><dt>Bring</dt><dd>${esc(w.documents)}</dd></div>` : ""}</dl>${safeURL(w.mapLink) !== "#" ? `<a class="text-link" href="${esc(safeURL(w.mapLink))}" target="_blank" rel="noopener noreferrer">Open in Google Maps ${icon("arrow")}</a>` : ""}<p class="small muted">Confirm the drive with the company before travelling. Never pay to attend an interview.</p></div>` : ""}${j.howToApply ? `<h3 style="margin-top:26px">How to apply</h3><p>${esc(j.howToApply)}</p>` : ""}${
    external
      ? `<div class="source-links">${Object.entries(j.officialLinks || {})
          .filter(([k, v]) => /job|career/i.test(k) && safeURL(v) !== "#")
          .filter(([k, v], i, a) => a.findIndex((x) => x[1] === v) === i)
          .slice(0, 2)
          .map(
            ([k, v]) =>
              `<a class="text-link" href="${esc(safeURL(v))}" target="_blank" rel="noopener noreferrer">Read original listing ${icon("arrow")}</a>`,
          )
          .join(
            "",
          )}</div><p class="small" style="margin-top:25px">Listing information: ${esc(j.source)}. Check the employer’s original listing for any changes before applying.</p>`
      : ""
  }</div></div><aside class="panel"><h2>Your next move</h2><p class="small muted">${external ? "This employer accepts applications through its own application channel." : "Apply with your profile and a short introduction. Track your application in your workspace."}</p>${closed ? '<div class="notice warn">This listing is no longer accepting applications.</div>' : walkin ? `<div class="notice">${icon("pin")} Walk in on <strong>${esc(w.date ? formatDate(w.date) : "the date shown")}</strong>${w.time ? " · " + esc(w.time) : ""}${w.venue ? "<br>" + esc(w.venue) : ""}</div>` : external ? (applyURL !== "#" ? `<a class="btn wide" href="${esc(applyURL)}" target="_blank" rel="noopener noreferrer">Apply with employer ${icon("arrow")}</a>` : '<div class="notice warn">Check the application instructions in this listing.</div>') : `<button class="btn wide" data-apply="${esc(j.id)}">Apply for this role ${icon("right")}</button>`}<button class="btn secondary wide" style="margin-top:12px" data-save="${esc(j.id)}">${icon("bookmark")} ${state.savedIds.has(j.id) ? "Saved to your list" : "Save this job"}</button><button class="btn quiet wide" data-share-job>${icon("arrow")} Copy job link</button><p class="small muted" style="margin:20px 0 0">${external ? "After applying, mark it in your saved jobs to keep your own record." : "Your contact details and private documents are never shown on your public profile."}</p><div class="notice" style="margin:24px 0 0">Never pay an employer to apply or secure an interview. ${link("Report a concern", "contact", "")}</div></aside></div></div>`;
}
export function workerDetail(w, reviews = []) {
  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;
  return `<div class="container"><div class="breadcrumb" style="margin-top:30px">${link("Find workers", "workers", "")}<span>/</span><span>${esc(w.name)}</span></div><div class="detail-layout"><div><div class="row" style="margin-bottom:25px">${avatar(w, "large")}<div><span class="tag ${w.available ? "" : "neutral"}">${w.available ? "Available for work" : "Not currently available"}</span><h1 class="detail-title" style="margin:12px 0 7px">${esc(w.name)}</h1><p class="muted" style="margin:0">${esc(w.title)}</p></div></div><div class="fact-grid">${[
    ["Location", w.location],
    ["Experience", w.experience || "Not specified"],
    ["Category", w.sector],
    [
      "Reviews",
      avg
        ? `${avg} / 5 · ${reviews.length} completed hires`
        : "No completed-hire reviews yet",
    ],
  ]
    .map(
      ([l, v]) =>
        `<div class="fact"><small>${l}</small><strong>${esc(v)}</strong></div>`,
    )
    .join(
      "",
    )}</div><div class="panel prose"><h2>Meet ${esc(w.name.split(" ")[0])}</h2><p>${esc(w.about)}</p><h3>Skills & expertise</h3><div class="tags">${w.skills.map((s) => `<span class="tag neutral">${esc(s)}</span>`).join("")}</div></div><div class="panel" style="margin-top:24px"><h2>Reviews from completed work</h2>${reviews.length ? reviews.map((r) => `<div class="record"><div class="row spread"><strong>${esc(r.authorName)}</strong><span class="accent">${"★".repeat(r.rating)} <span class="muted">${r.rating}/5</span></span></div><p style="margin-top:12px">${esc(r.text)}</p><small class="muted">${formatDate(r.createdAt)}</small></div>`).join("") : '<p class="small muted" style="margin:0">Reviews appear here after a community hire is completed.</p>'}</div></div><aside class="panel"><h2>Good work starts with hello.</h2><div class="pay">${w.rate ? money(w.rate, w.basis) : "Rate open for discussion"}</div>${w.availableFrom ? `<p class="small muted">Available from ${formatDate(w.availableFrom)}</p>` : ""}<button class="btn wide" data-invite="${esc(w.uid)}">Invite to a job ${icon("right")}</button><p class="small muted" style="margin:20px 0 0">Choose one of your approved job posts. Once the invitation is accepted and the hire is approved, your private conversation opens.</p></aside></div></div>`;
}
export function about() {
  const proof = [
    ["77K+", "Community across Kerala IT"],
    ["Reels", "Daily stories & hiring tips"],
    ["3 parks", "Infopark · Technopark · Cyberpark"],
    ["Free", "Employer workspace to start"],
  ]
    .map(
      ([n, l]) =>
        `<div class="about-proof-item"><strong>${n}</strong><span>${l}</span></div>`,
    )
    .join("");
  const jumps = [
    ["#how-it-works", "How hiring works"],
    ["#community", "Our community"],
    ["#what-you-get", "What you get"],
    ["#guidelines", "FAQ"],
  ]
    .map(([h, l]) => `<a class="about-jump" href="${h}">${l}</a>`)
    .join("");
  return `${pageHero(
    "How hiring works here.",
    "A clear path for HR and talent teams: post a role, discover people, and manage conversations — backed by Kerala’s largest independent IT community.",
    `<div class="row about-hero-actions">${link("Post a role " + icon("right"), "post-job")}${link("Find talent", "workers", "btn secondary")}</div><nav class="about-jumps" aria-label="On this page">${jumps}</nav>`,
    "How it works",
  )}<section class="about-proof" aria-label="Community reach"><div class="container about-proof-grid">${proof}</div></section><section class="section" id="community"><div class="container about-split"><div class="about-split-copy"><p class="eyebrow">FROM OUR 77K+ COMMUNITY</p><h2>Built where Kerala’s tech community already gathers.</h2><p class="muted">InfoparkDaily is an independent community — not the parks, not company HR. We share jobs, walk-ins, campus stories and now short <strong>reels</strong> so hiring signals travel farther and faster.</p><ul class="about-bullets"><li>${icon("users")} <span><strong>77K+</strong> people in the InfoparkDaily community family</span></li><li>${icon("star")} <span><strong>Reels</strong> for quick hiring tips, openings and campus moments</span></li><li>${icon("pin")} <span>Reach across <strong>Infopark, Technopark and Cyberpark</strong></span></li><li>${icon("shield")} <span>Community posts and talent profiles are <strong>reviewed</strong> before they go live</span></li></ul><div class="row about-links">${link("Create employer account", "register")}<a class="text-link" href="https://www.instagram.com/infoparkdaily/" target="_blank" rel="noopener noreferrer">Watch reels on Instagram ${icon("arrow")}</a></div></div><figure class="about-split-media"><img src="/assets/infoparkdaily/office.webp" alt="Team collaborating in a modern office" width="1200" height="800" loading="lazy"><figcaption>Trusted by teams hiring across Kerala’s IT parks.</figcaption></figure></div></section>${howItWorks()}<section class="section soft" id="what-you-get"><div class="container"><div class="section-head"><div><p class="eyebrow">YOUR EMPLOYER TOOLKIT</p><h2>What hiring teams get.</h2><p>Everything you need to post, discover and follow up — in one workspace.</p></div></div><div class="grid two feature-grid">${[
    [
      "plus",
      "Post a role",
      "Share a clear opening with company details. It appears after a short review.",
    ],
    [
      "users",
      "Find talent",
      "Browse reviewed professionals by skill, location and availability, then invite a fit.",
    ],
    [
      "briefcase",
      "Hiring workspace",
      "Track applications, invites and updates from your employer dashboard.",
    ],
    [
      "chat",
      "Private conversations",
      "After a hire is approved, talk directly in your secure workspace.",
    ],
  ]
    .map(
      ([i, t, d]) =>
        `<div class="feature"><span class="feature-icon">${icon(i)}</span><div><h3>${t}</h3><p>${d}</p></div></div>`,
    )
    .join("")}</div></div></section><section class="section"><div class="container"><div class="about-seeker-note"><div><p class="eyebrow">LOOKING FOR WORK?</p><h2>Job seekers use a different door.</h2><p>Browse openings on the public jobs board, and use Career Tools for resumes, ATS checks and portfolios. This hub stays focused on hiring teams.</p></div><div class="row">${'<a class="btn secondary" href="/jobs/">Browse jobs board</a>'}<a class="btn quiet" href="/resume-builder/">Career Tools</a></div></div></div></section><section class="section soft" id="guidelines"><div class="container"><p class="eyebrow">CLEAR EXPECTATIONS</p><h2>Common questions from hiring teams.</h2><div class="faq">${[
    [
      "Who is this hub for?",
      "Employers, HR and talent acquisition teams. Job seekers should use the public jobs board and Career Tools.",
    ],
    [
      "How do I post a role?",
      "Create an employer account, verify your email, add your company name, then submit from Post a role. Posts appear after review.",
    ],
    [
      "How does Find talent work?",
      "Approved professional profiles appear in the directory. Invite someone to one of your open roles. Conversations open after a hire request is approved.",
    ],
    [
      "What is the 77K+ community?",
      "InfoparkDaily’s independent Instagram and community family across Infopark, Technopark and Cyberpark — jobs, stories and reels people already follow.",
    ],
    [
      "Is there a fee?",
      "Employer accounts and community role posts are currently free. Pay and contract terms are agreed directly between you and the professional.",
    ],
    [
      "How can I report a problem?",
      "Contact us with the listing or profile link and a short description. Never send passwords or verification codes.",
    ],
  ]
    .map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`)
    .join(
      "",
    )}</div></div></section><section class="section"><div class="container"><div class="cta"><div><p class="eyebrow cta-eyebrow">Start hiring</p><h2>Ready to hire with the community behind you?</h2><p>Open a free employer account and post your next role today.</p></div>${link("Get started " + icon("right"), "register")}</div></div></section>`;
}
export function contact() {
  return `${pageHero("We’re here to help hiring teams.", "Questions about your employer account, a job post or a community hire? Get in touch with the InfoparkDaily team.")}<section class="section soft"><div class="container grid three"><div class="contact-card">${icon("mail")}<h3>Send us an email</h3><p>For employer account support, listing corrections and reports. Include the page link so we can take a look.</p><a class="text-link" href="mailto:infoparkstorieskochi@gmail.com">Email InfoparkDaily ${icon("arrow")}</a></div><div class="contact-card">${icon("chat")}<h3>Start a conversation</h3><p>Prefer WhatsApp? Tell us what your hiring team needs help with and share the relevant listing.</p><a class="text-link" href="https://wa.me/919995254290" target="_blank" rel="noopener noreferrer">Open WhatsApp ${icon("arrow")}</a></div><div class="contact-card">${icon("settings")}<h3>Build something custom</h3><p>For websites, business software or an AI solution, explore what Enitexa.ai can help you create.</p><a class="text-link" href="/software-solutions/">Meet Enitexa.ai ${icon("arrow")}</a></div></div></section>`;
}

export function discovery(jobs) {
  const fresher = jobs.filter((j) =>
      /fresher|both/i.test(j.level + " " + j.experience),
    ).length,
    remote = jobs.filter((j) =>
      /remote|work from home/i.test(j.workMode + " " + j.location),
    ).length,
    closing = jobs.filter((j) => j.urgent).length;
  return `<section class="section discovery-section reveal-section"><div class="container"><div class="section-head"><div><p class="eyebrow">A few ways to find your fit</p><h2>A role for the chapter you’re in.</h2></div></div><div class="grid three discovery-grid">${[
    [
      "01",
      "A fresh beginning",
      "Fresher-friendly roles for your first step.",
      fresher,
      "fresher=1",
    ],
    [
      "02",
      "Room to work your way",
      "Openings with a remote working option.",
      remote,
      "remote=1",
    ],
    [
      "03",
      "One to move on now",
      "Opportunities approaching their deadline.",
      closing,
      "urgent=1",
    ],
  ]
    .map(
      ([n, t, d, count, q]) =>
        `<a class="discovery-card" href="${href("jobs", "?" + q)}"><span class="discovery-number">${n}</span><h3>${t}</h3><p>${d}</p><div class="row spread"><strong>${count} openings</strong>${icon("arrow")}</div></a>`,
    )
    .join("")}</div></div></section>`;
}
