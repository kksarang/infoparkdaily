import { ROOT, esc, initials, money } from "./model.js";
const paths = {
  arrow: "M7 17 17 7M7 7h10v10",
  right: "M5 12h14m-6-6 6 6-6 6",
  search: "m21 21-4.4-4.4M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  pin: "M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  briefcase: "M8 7V4h8v3M3 7h18v13H3ZM3 12c5 4 13 4 18 0M10 12h4v4h-4Z",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  check: "m5 12 4 4L19 6",
  shield: "M12 3 3 7v5c0 5 9 9 9 9s9-4 9-9V7Zm-4 9 3 3 5-6",
  bookmark: "M6 3h12v18l-6-4-6 4Z",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "m6 6 12 12M6 18 18 6",
  mail: "M3 5h18v14H3Zm0 0 9 8 9-8",
  chat: "M21 11a9 9 0 0 1-9 9c-2 0-4-.6-5-1l-5 2 2-5a9 9 0 1 1 17-5Z",
  file: "M14 2H5v20h14V7Zm0 0v5h5M8 12h8M8 16h8",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  clock: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M12 7v5l3 2",
  filter: "M4 6h16M7 12h10M10 18h4",
  home: "m3 10 9-7 9 7v11h-6v-7H9v7H3Z",
  logout: "M10 4H4v16h6M10 12h11m-4-4 4 4-4 4",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
  star: "m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z",
  plus: "M12 4v16M4 12h16",
  download: "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5",
  phone: "M5 3h4l2 5-3 2c2 3 3 4 6 6l2-3 5 2v4c0 5-8 1-13-4S0 3 5 3Z",
  settings:
    "M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1Z",
};
export const icon = (name, cls = "") =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.briefcase}"/></svg>`;
export const href = (route = "", query = "") =>
  ROOT + route + (route ? "/" : "") + query;
export const link = (label, route, cls = "btn", query = "") =>
  `<a class="${cls}" href="${href(route, query)}">${label}</a>`;
export const brand = () =>
  `<a class="market-brand" href="/" aria-label="InfoparkDaily home"><img src="/assets/logo-infoparkdaily.png" width="40" height="40" alt=""><span><strong>InfoparkDaily</strong><small>Good people. Great possibilities.</small></span></a>`;
export function header(route) {
  return `<a class="skip" href="#main">Skip to content</a><header class="market-header"><div class="container header-inner">${brand()}<button class="icon-btn menu-toggle" id="market-menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="market-nav">${icon("menu")}</button><nav class="market-nav" id="market-nav" aria-label="InfoparkDaily section">${[
    ["", "Home"],
    ["jobs", "Browse jobs"],
    ["workers", "Find workers"],
    ["about", "About"],
  ]
    .map(
      ([r, l]) =>
        `<a href="${href(r)}" ${r === route ? 'aria-current="page"' : ""}>${l}</a>`,
    )
    .join(
      "",
    )}<div class="nav-account" id="nav-account">${link("Sign in", "sign-in", "btn quiet")}${link("Post a job", "post-job", "btn secondary")}${link("Get started", "register")}</div></nav></div></header>`;
}
export function footer() {
  return `<footer class="market-footer"><div class="container"><div class="footer-grid"><div class="footer-brand">${brand()}<p>Connecting Kerala’s people, skills and opportunities. Find your next role or the right person for your team.</p><a href="/" class="text-link" >Back to InfoparkDaily ${icon("arrow")}</a></div><div><h3>Find your next step</h3><div class="footer-links">${link("Browse jobs", "jobs", "")}${link("Find workers", "workers", "")}${link("Create your profile", "register", "", "?role=worker")}<a href="/resume-builder/">Resume builder</a><a href="/ats-checker/">ATS checker</a></div></div><div><h3>For employers</h3><div class="footer-links">${link("Post a job", "post-job", "")}${link("Employer dashboard", "dashboard", "")}${link("How it works", "about", "", "#how-it-works")}${link("Contact us", "contact", "")}</div></div><div><h3>Let’s stay connected</h3><div class="footer-links"><a href="mailto:infoparkstorieskochi@gmail.com">infoparkstorieskochi@gmail.com</a><a href="https://wa.me/919995254290" target="_blank" rel="noopener noreferrer">WhatsApp · +91 99952 54290</a><a href="https://www.instagram.com/infoparkdaily/" target="_blank" rel="noopener noreferrer">Instagram ${icon("arrow")}</a></div></div></div><div class="footer-custom"><div><strong>Have something bigger in mind?</strong><p>For custom software, websites and AI solutions, meet Enitexa.ai.</p></div><a href="/software-solutions/">Explore Enitexa.ai ${icon("arrow")}</a></div><div class="footer-base"><span>© ${new Date().getFullYear()} InfoparkDaily. All rights reserved.</span><span><a href="/privacy/">Privacy policy</a> &nbsp; · &nbsp; <a href="/terms/">Terms of use</a> &nbsp; · &nbsp; ${link("Community guidelines", "about", "", "#guidelines")}</span></div></div></footer>`;
}
export const statusLabel = (s) =>
  ({
    pending: "Awaiting review",
    approved: "Approved",
    rejected: "Changes needed",
    closed: "Closed",
    submitted: "Application sent",
    invited: "Invitation received",
    shortlisted: "Shortlisted",
    hire_requested: "Hire awaiting approval",
    declined: "Declined",
    withdrawn: "Withdrawn",
    completion_requested: "Completion requested",
    completed: "Completed",
  })[s] || s;
export const statusTag = (s) =>
  `<span class="tag ${["pending", "hire_requested", "completion_requested", "invited"].includes(s) ? "amber" : ["rejected", "declined", "withdrawn", "closed"].includes(s) ? "neutral" : ""}">${esc(statusLabel(s))}</span>`;
export const mark = (value, n = 0) =>
  `<span class="company-mark ${["", "blue", "purple"][n % 3]}">${esc(initials(value))}</span>`;
export const avatar = (w, size = "") =>
  `<div class="avatar ${size}">${/^data:image\/(jpeg|png|webp);base64,/.test(w.photo || "") ? `<img src="${esc(w.photo)}" alt="${esc(w.name)}">` : esc(initials(w.name))}</div>`;
export const empty = (title, text, action = "", glyph = "briefcase") =>
  `<div class="empty">${icon(glyph)}<h3>${title}</h3><p>${text}</p>${action}</div>`;
export const loading = (text = "Loading your workspace…") =>
  `<div class="loading" role="status">${text}</div>`;
export const pageHero = (title, text, extra = "") =>
  `<section class="page-hero"><div class="container"><div class="breadcrumb">${link("Home", "", "")}<span>/</span><span>${esc(title)}</span></div><h1>${title}</h1><p>${text}</p>${extra}</div></section>`;
export const photoFor = (sector) =>
  ["Construction", "Driving", "Logistics"].includes(sector)
    ? "trades"
    : ["Hospitality", "Events", "Healthcare"].includes(sector)
      ? "hospitality"
      : "office";
export function jobCard(j, n = 0, saved = false) {
  return `<article class="job-card refined-job"><div class="job-card-body"><div class="row spread job-card-heading">${mark(j.company, n)}<button class="icon-btn card-save ${saved ? "saved" : ""}" data-save="${esc(j.id)}" aria-label="${saved ? "Unsave" : "Save"} ${esc(j.title)}" aria-pressed="${saved}">${icon("bookmark")}</button></div><div class="card-source">${esc(j.kind === "curated" ? j.source : "Community opportunity")}</div><h3><a href="${href("jobs", "?id=" + encodeURIComponent(j.id))}">${esc(j.title)}</a></h3><p class="company-name">${esc(j.company)}</p><div class="job-meta"><div class="place">${icon("pin")}<span>${esc(j.location)}</span></div>${j.experience ? `<div class="place">${icon("briefcase")}<span>${esc(j.experience)}</span></div>` : ""}</div><div class="tags">${j.employmentType && j.employmentType !== "Not specified" ? `<span class="tag neutral">${esc(j.employmentType)}</span>` : `<span class="tag neutral">${esc(j.sector)}</span>`}${j.urgent ? '<span class="tag amber">Closing soon</span>' : ""}${/remote|work from home/i.test(j.workMode + " " + j.location) ? '<span class="tag">Remote option</span>' : ""}</div><div class="pay">${j.payText ? esc(j.payText) : j.pay ? money(j.pay, j.basis) : '<span class="muted">Pay not disclosed</span>'}</div><div class="card-bottom"><span class="muted">${j.closingDate && j.closingDate !== "Rolling" ? "By " + esc(formatDate(j.closingDate)) : "Applications open"}</span><a class="text-link" href="${href("jobs", "?id=" + encodeURIComponent(j.id))}">View job ${icon("right")}</a></div></div></article>`;
}
export const workerCard = (w) =>
  `<article class="worker-card"><div class="row spread">${avatar(w)}<span class="tag ${w.available ? "" : "neutral"}">${w.available ? "Available" : "Not available"}</span></div><h3><a href="${href("workers", "?id=" + encodeURIComponent(w.uid))}">${esc(w.name)}</a></h3><p>${esc(w.title)}</p><p>${icon("pin")} ${esc(w.location)}</p><div class="tags">${(
    w.skills || []
  )
    .slice(0, 3)
    .map((s) => `<span class="tag neutral">${esc(s)}</span>`)
    .join(
      "",
    )}</div><div class="card-bottom"><span>${w.rate ? money(w.rate, w.basis) : "Rate on discussion"}</span>${link("View profile", "workers", "text-link", "?id=" + encodeURIComponent(w.uid))}</div></article>`;
export function formatDate(value, withTime = false) {
  const d = value?.toDate
    ? value.toDate()
    : new Date(value?.seconds ? value.seconds * 1000 : value);
  return isNaN(d)
    ? "Not specified"
    : new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        ...(withTime
          ? { hour: "numeric", minute: "2-digit" }
          : { year: "numeric" }),
      }).format(d);
}
export function field(
  label,
  name,
  value = "",
  {
    type = "text",
    required = false,
    max = 150,
    placeholder = "",
    help = "",
    extra = "",
  } = {},
) {
  return `<div class="field"><label for="${name}">${label}${required ? ' <span class="accent">*</span>' : ""}</label><input id="${name}" name="${name}" type="${type}" value="${esc(value)}" ${required ? "required" : ""} maxlength="${max}" placeholder="${esc(placeholder)}" ${extra}>${help ? `<small>${help}</small>` : ""}</div>`;
}
export const area = (
  label,
  name,
  value = "",
  { max = 3000, required = false, help = "", placeholder = "" } = {},
) =>
  `<div class="field"><label for="${name}">${label}${required ? ' <span class="accent">*</span>' : ""}</label><textarea id="${name}" name="${name}" maxlength="${max}" ${required ? "required" : ""} placeholder="${esc(placeholder)}">${esc(value)}</textarea>${help ? `<small>${help}</small>` : ""}</div>`;
export function select(
  label,
  name,
  options,
  value = "",
  emptyText = "Choose…",
) {
  return `<div class="field"><label for="${name}">${label}</label><select id="${name}" name="${name}">${emptyText !== null ? `<option value="">${emptyText}</option>` : ""}${options
    .map((o) => {
      const [v, l] = Array.isArray(o) ? o : [o, o];
      return `<option value="${esc(v)}" ${v === value ? "selected" : ""}>${esc(l)}</option>`;
    })
    .join("")}</select></div>`;
}
export const check = (label, name, checked = false) =>
  `<label class="check"><input type="checkbox" name="${name}" ${checked ? "checked" : ""}>${label}</label>`;
export const message = () =>
  '<div class="form-message" role="status" aria-live="polite"></div>';
export function showMessage(form, text, success = false) {
  const el = form.querySelector(".form-message");
  if (el) {
    el.textContent = text;
    el.classList.toggle("success", success);
    el.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
}
export async function submit(form, task, done) {
  const buttons = [...form.querySelectorAll("button[type=submit]")];
  buttons.forEach((b) => (b.disabled = true));
  try {
    await task();
    if (done) await done();
  } catch (e) {
    showMessage(form, e.message || "Please try again.");
  } finally {
    buttons.forEach((b) => (b.disabled = false));
  }
}
let toastTimer;
export function toast(text) {
  let el = document.querySelector("#toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    el.setAttribute("role", "status");
    document.body.append(el);
  }
  el.textContent = text;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (el.textContent = ""), 5500);
}
export function dialog(html) {
  document.querySelector("#market-dialog")?.remove();
  const el = document.createElement("dialog");
  el.id = "market-dialog";
  el.className = "market-dialog";
  el.innerHTML = `<button class="icon-btn dialog-close" aria-label="Close dialog">${icon("close")}</button>${html}`;
  document.body.append(el);
  el.querySelector(".dialog-close").onclick = () => el.close();
  el.addEventListener("click", (e) => {
    if (e.target === el) {
      const r = el.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        el.close();
    }
  });
  el.addEventListener("close", () => el.remove());
  el.showModal();
  return el;
}
