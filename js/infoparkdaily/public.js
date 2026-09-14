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
  const jobs = state.jobs.slice(0, 8);
  return `<section class="hero"><div class="container hero-grid"><div class="hero-copy"><div class="hero-tag">${icon("briefcase")} KERALA’S PEOPLE & OPPORTUNITIES</div><h1>Good work.<br>Great people.<br><em>Your next chapter.</em></h1><p>Find work that fits your skills. Meet people who can move your business forward. A fresh start begins with the right connection.</p><div class="row">${link("Find a job " + icon("right"), "jobs")}${link("Hire a professional", "workers", "btn secondary")}</div><div class="hero-foot"><span>${icon("check")} Free to get started</span><span>${icon("shield")} Reviewed community posts</span></div></div><div class="hero-jobs"><div class="hero-board-label"><span>YOUR NEXT OPPORTUNITY</span><span>Fresh from the job board</span></div>${jobs
    .filter((j, i, a) => a.findIndex((k) => k.company === j.company) === i)
    .slice(0, 3)
    .map(
      (j, i) =>
        `<a class="hero-job" href="${href("jobs", "?id=" + encodeURIComponent(j.id))}">${mark(j.company, i)}<div><h3>${esc(j.title)}</h3><p>${esc(j.company)} · ${esc(j.location)}</p><span class="tag ${i === 1 ? "neutral" : ""}">${esc(j.sector)}</span></div></a>`,
    )
    .join(
      "",
    )}<div class="hero-count">${icon("briefcase")} <span><strong data-job-count>${state.jobs.length}</strong> opportunities to explore</span></div></div></div></section><nav class="category-ribbon" aria-label="Browse jobs by category"><div class="container"><span class="ribbon-label">Find your field</span><div class="ribbon-links">${SECTORS.map((sector) => `<a href="${href("jobs", "?sector=" + encodeURIComponent(sector))}">${esc(sector)}</a>`).join("")}</div></div></nav><section class="promos"><div class="container"><div class="section-head"><div><p class="eyebrow">A LITTLE HELP ALONG THE WAY</p><h2>Make your next move count.</h2></div><div class="row"><button class="icon-btn" data-promos="-1" aria-label="Previous resources">${icon("right", "flip")}</button><button class="icon-btn" data-promos="1" aria-label="Next resources">${icon("right")}</button></div></div><div class="promo-grid" id="promo-grid">${promos()}</div></div></section><div class="container"><div class="stats-bar"><div class="stat"><strong data-job-count>${state.jobs.length}</strong><span>Open job listings</span></div><div class="stat"><strong data-company-count>${new Set(state.jobs.map((j) => j.company)).size}</strong><span>Companies with openings</span></div><div class="stat"><strong>${SECTORS.length}</strong><span>Work categories</span></div><div class="stat"><strong>Free</strong><span>To create your account</span></div></div></div><section class="section"><div class="container"><div class="section-head"><div><p class="eyebrow">FIND YOUR NEXT OPPORTUNITY</p><h2>Good work starts here.</h2><p>Fresh openings, across skills and experience levels.</p></div>${link("View all jobs " + icon("right"), "jobs", "text-link")}</div><div class="pills" id="home-job-filters" aria-label="Filter featured jobs">${["All", "Technology", "Sales & Marketing", "Office & Admin", "Design & Creative", "Finance"].map((s, i) => `<button class="pill ${i === 0 ? "active" : ""}" data-home-sector="${i ? esc(s) : ""}" aria-pressed="${i === 0}">${esc(s)}</button>`).join("")}</div><div class="grid four home-jobs" id="home-job-grid">${jobs.map((j, i) => jobCard(j, i, state.savedIds.has(j.id))).join("")}</div></div></section><section class="section soft"><div class="container"><div class="section-head"><div><p class="eyebrow">THE RIGHT SKILLS. THE RIGHT PEOPLE.</p><h2>Find the people behind great work.</h2><p>From your first hire to your next specialist.</p></div>${link("Find workers " + icon("right"), "workers", "text-link")}</div><div class="category-cards">${[
    [
      "office",
      "Technology",
      "Technology & office",
      "People who keep ideas moving.",
    ],
    [
      "trades",
      "Construction",
      "Skilled trades",
      "Practical skills. Real experience.",
    ],
    [
      "hospitality",
      "Hospitality",
      "Hospitality & service",
      "People who make every detail matter.",
    ],
  ]
    .map(
      ([p, s, t, d]) =>
        `<a class="category-card" href="${href("workers", "?sector=" + encodeURIComponent(s))}"><img src="/assets/infoparkdaily/${p}.webp" alt="" width="600" height="350" loading="lazy"><div><h3>${t} ${icon("arrow")}</h3><small>${d}</small></div></a>`,
    )
    .join(
      "",
    )}</div><div id="home-worker-grid">${workersHome(state.workers)}</div></div></section>${discovery(state.jobs)}${howItWorks()}<section class="section soft"><div class="container"><div class="section-head"><div><p class="eyebrow">BUILT AROUND THE CONNECTION</p><h2>A clearer way to find each other.</h2></div></div><div class="grid two" style="gap:38px">${[
    [
      "shield",
      "A considered first introduction",
      "Community profiles and jobs are reviewed before they appear in the directory.",
    ],
    [
      "chat",
      "Keep the conversation together",
      "After a hire is approved, talk directly in your private workspace.",
    ],
    [
      "file",
      "Your experience, in one place",
      "Create a skills profile, keep your documents private and choose when to share a resume.",
    ],
    [
      "star",
      "Feedback from real work",
      "Reviews are tied to completed community hires, so every rating has a real connection.",
    ],
  ]
    .map(
      ([i, t, d]) =>
        `<div class="feature"><span class="feature-icon">${icon(i)}</span><div><h3>${t}</h3><p>${d}</p></div></div>`,
    )
    .join(
      "",
    )}</div></div></section><section class="section"><div class="container"><div class="cta"><div><h2>Something good could start today.</h2><p>Bring your skills. Bring your ambition. We’ll help you find the next connection.</p></div>${link("Let’s get started " + icon("right"), "register")}</div></div></section>`;
}
const promoItems = [
  [
    "file",
    "A resume that opens doors",
    "Build a clear, professional resume with Career Tools.",
    "Create your resume",
    "/resume-builder/",
  ],
  [
    "shield",
    "Give your resume a check",
    "See how well a tracker can read your existing file.",
    "Try the ATS checker",
    "/ats-checker/",
  ],
  [
    "home",
    "Your work deserves a home",
    "Put your story and projects on a personal website.",
    "Explore portfolios",
    "/portfolio/",
  ],
  [
    "settings",
    "An idea worth building",
    "Custom software, websites and AI with Enitexa.ai.",
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
        "Make yourself discoverable.",
        "Our worker directory is opening to the community. Create your profile and be ready for your next opportunity.",
        link("Create a worker profile", "register", "btn", "?role=worker"),
        "users",
      );
export function howItWorks() {
  return `<section class="section" id="how-it-works"><div class="container"><div class="section-head"><div><p class="eyebrow">FROM HELLO TO HIRED</p><h2>Your next chapter, in three steps.</h2></div></div><div class="grid three">${[
    [
      "01",
      "Tell us what you bring",
      "Create an account as a job seeker or employer. Add your skills, or tell us about your team.",
    ],
    [
      "02",
      "Find the right connection",
      "Explore openings, apply to a community job or invite a professional to your role.",
    ],
    [
      "03",
      "Make good work happen",
      "For community hires, approval opens your conversation. Complete the work and share your experience.",
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
  return `${pageHero(workers ? "Find your next great hire." : "Find work that fits you.", workers ? "Explore people, skills and possibilities. Connect through a role that fits." : "Explore opportunities from Kerala’s IT parks and the InfoparkDaily community.", `<form class="search-bar" id="directory-search">${icon("search")}<input name="q" value="${esc(state.filters.q)}" aria-label="${workers ? "Search name, skill or location" : "Search job title, skill or company"}" placeholder="${workers ? "Name, skill or location" : "Job title, skill or company"}"><button class="btn">Search</button></form>`)}<div class="container directory"><button class="btn secondary filter-mobile" data-filter-toggle aria-expanded="false" aria-controls="directory-filters">${icon("filter")} Filter ${workers ? "workers" : "jobs"} ${icon("plus")}</button><form id="directory-filters" class="filter-panel"><div class="row spread"><h3>Filters</h3><button class="btn quiet" type="reset">Reset all</button></div>${select("Category", "sector", SECTORS, state.filters.sector, "All categories")}${select("Location", "location", [...new Set((workers ? state.workers : state.jobs).map((j) => j.location))].sort(), state.filters.location, "All locations")}${!workers ? select("Listing source", "source", [...new Set(state.jobs.map((j) => j.source || "Community"))].sort(), state.filters.source, "All sources") : ""}${select(
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
          ? "Profiles appear here after review. Join the directory, or try another category."
          : "Try a different keyword or clear a filter to see more opportunities.",
        workers
          ? link("Create your profile", "register", "btn", "?role=worker")
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
  const external = j.kind === "curated";
  const applyURL = safeURL(
    j.applyLink || (j.email ? "mailto:" + j.email : ""),
    true,
  );
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
  }${j.requirements?.length ? `<h3>What you’ll bring</h3><ul>${j.requirements.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` : ""}${j.responsibilities?.length ? `<h3>What you’ll do</h3><ul>${j.responsibilities.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` : ""}${j.benefits?.length ? `<h3>What the employer offers</h3><ul>${j.benefits.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` : ""}${j.skills?.length ? `<h3>Skills</h3><div class="tags">${j.skills.map((s) => `<span class="tag neutral">${esc(s)}</span>`).join("")}</div>` : ""}${j.howToApply ? `<h3 style="margin-top:26px">How to apply</h3><p>${esc(j.howToApply)}</p>` : ""}${
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
  }</div></div><aside class="panel"><h2>Your next move</h2><p class="small muted">${external ? "This employer accepts applications through its own application channel." : "Apply with your profile and a short introduction. Track your application in your workspace."}</p>${closed ? '<div class="notice warn">This listing is no longer accepting applications.</div>' : external ? (applyURL !== "#" ? `<a class="btn wide" href="${esc(applyURL)}" target="_blank" rel="noopener noreferrer">Apply with employer ${icon("arrow")}</a>` : '<div class="notice warn">Check the application instructions in this listing.</div>') : `<button class="btn wide" data-apply="${esc(j.id)}">Apply for this role ${icon("right")}</button>`}<button class="btn secondary wide" style="margin-top:12px" data-save="${esc(j.id)}">${icon("bookmark")} ${state.savedIds.has(j.id) ? "Saved to your list" : "Save this job"}</button><button class="btn quiet wide" data-share-job>${icon("arrow")} Copy job link</button><p class="small muted" style="margin:20px 0 0">${external ? "After applying, mark it in your saved jobs to keep your own record." : "Your contact details and private documents are never shown on your public profile."}</p><div class="notice" style="margin:24px 0 0">Never pay an employer to apply or secure an interview. ${link("Report a concern", "contact", "")}</div></aside></div></div>`;
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
  return `${pageHero("People first. Possibilities next.", "InfoparkDaily connects Kerala’s community with work, useful tools and the people who make things happen.")}<section class="section"><div class="container grid two" style="align-items:center;gap:50px"><div><p class="eyebrow">OUR COMMUNITY, A NEW CHAPTER</p><h2>More ways to move forward, together.</h2><p class="muted">InfoparkDaily began with a simple purpose: make useful information easier to find for Kerala’s tech and business community.</p><p class="muted">This is a new place to bring people and opportunities together. Explore curated IT park openings, post a role for your own business, or let employers discover the skills you bring.</p>${link("Find your next opportunity " + icon("right"), "jobs")}</div><img src="/assets/infoparkdaily/office.webp" alt="Colleagues working together around laptops in an office" style="border-radius:20px" width="1200" height="800"></div></section>${howItWorks()}<section class="section soft" id="guidelines"><div class="container"><p class="eyebrow">CLEAR EXPECTATIONS, BETTER CONNECTIONS</p><h2>How this community works.</h2><div class="faq">${[
    [
      "What happens after I create a profile?",
      "Verify your email, complete your worker profile and submit it for review. Approved profiles appear in the directory. Editing a public profile sends it back for review. Your phone number and documents stay private.",
    ],
    [
      "How do community applications work?",
      "Apply to an approved community role with a short introduction. The employer can shortlist you and request a hire. An administrator reviews the hire before a private conversation opens. You can follow every step in your applications page.",
    ],
    [
      "How are IT park job applications different?",
      "Curated listings from Infopark, Technopark and other official sources link to the employer’s own application channel. InfoparkDaily does not submit these applications or decide their outcome. Save a listing and mark it as applied to keep your own record.",
    ],
    [
      "When can I leave a review?",
      "Both parties can leave one review after the employer marks a community hire as completed. Reviews are connected to that hire and cannot be submitted by unrelated visitors.",
    ],
    [
      "What should I include in a job post?",
      "Use an accurate role title, your real company name, a clear description, location, pay basis and closing date. Do not post training advertisements as jobs or ask applicants for payment. Misleading posts and discriminatory or abusive content may be rejected.",
    ],
    [
      "Is there a fee?",
      "Creating an account, a worker profile and a community job post is currently free. Any salary, contract terms and payment arrangement are agreed directly between the worker and employer. InfoparkDaily does not process wages.",
    ],
    [
      "How can I report a problem?",
      "Contact the InfoparkDaily team with the job or profile link and a description of the concern. Never send passwords or verification codes. We can review community content and hiring requests.",
    ],
  ]
    .map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`)
    .join(
      "",
    )}</div></div></section><section class="section"><div class="container"><div class="cta"><div><h2>Bring your next chapter to life.</h2><p>There’s a place here for your skills, your team and your next idea.</p></div>${link("Join InfoparkDaily " + icon("right"), "register")}</div></div></section>`;
}
export function contact() {
  return `${pageHero("We’re here to help.", "Questions about your account, a listing or a community hire? Get in touch with the InfoparkDaily team.")}<section class="section soft"><div class="container grid three"><div class="contact-card">${icon("mail")}<h3>Send us an email</h3><p>For account support, listing corrections and reports. Include the page link so we can take a look.</p><a class="text-link" href="mailto:infoparkstorieskochi@gmail.com">Email InfoparkDaily ${icon("arrow")}</a></div><div class="contact-card">${icon("chat")}<h3>Start a conversation</h3><p>Prefer WhatsApp? Tell us what you need help with and share the relevant listing.</p><a class="text-link" href="https://wa.me/919995254290" target="_blank" rel="noopener noreferrer">Open WhatsApp ${icon("arrow")}</a></div><div class="contact-card">${icon("settings")}<h3>Build something custom</h3><p>For websites, business software or an AI solution, explore what Enitexa.ai can help you create.</p><a class="text-link" href="/software-solutions/">Meet Enitexa.ai ${icon("arrow")}</a></div></div></section>`;
}

export function discovery(jobs) {
  const fresher = jobs.filter((j) =>
      /fresher|both/i.test(j.level + " " + j.experience),
    ).length,
    remote = jobs.filter((j) =>
      /remote|work from home/i.test(j.workMode + " " + j.location),
    ).length,
    closing = jobs.filter((j) => j.urgent).length;
  return `<section class="section discovery-section"><div class="container"><div class="section-head"><div><p class="eyebrow">A FEW WAYS TO FIND YOUR FIT</p><h2>A role for the chapter you’re in.</h2></div></div><div class="grid three discovery-grid">${[
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
