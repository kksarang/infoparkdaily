/* Public recruit pages (no sign-in): post a job / walk-in / job alert, track a post, and job-seeker job alerts. */
import { SECTORS, esc, dateISO } from "./model.js";
import { icon, href, toast } from "./ui.js";

const PARKS = ["Infopark Kochi", "Technopark Trivandrum", "Cyberpark Kozhikode", "Other Kerala", "Remote / Hybrid"];
const TYPES = [
  ["job", "briefcase", "Regular job", "Full details. Candidates apply by email or your careers link."],
  ["walkin", "pin", "Walk-in drive", "A date, time and venue. Candidates come in person."],
  ["alert", "bell", "Quick job alert", "Just the essentials — role, contact and last date. Posted fast."]
];
const WA = "https://whatsapp.com/channel/0029VbDJFfA4Y9lm5L4kpm22";

const inp = (label, name, opts = {}) => {
  const { type = "text", required = false, max = 200, placeholder = "", value = "", hint = "", extra = "", cls = "" } = opts;
  return `<label class="rp-field ${cls}"><span>${label}${required ? ' <b aria-hidden="true">*</b>' : ""}</span><input type="${type}" name="${name}" ${required ? "required" : ""} maxlength="${max}" placeholder="${esc(placeholder)}" value="${esc(value)}" ${extra}>${hint ? `<small>${hint}</small>` : ""}</label>`;
};
const sel = (label, name, options, value = "", opts = {}) =>
  `<label class="rp-field ${opts.cls || ""}"><span>${label}${opts.required ? ' <b aria-hidden="true">*</b>' : ""}</span><select name="${name}" ${opts.required ? "required" : ""}>${options
    .map((o) => (Array.isArray(o) ? o : [o, o]))
    .map(([v, l]) => `<option value="${esc(v)}" ${v === value ? "selected" : ""}>${esc(l)}</option>`)
    .join("")}</select></label>`;
const txt = (label, name, opts = {}) =>
  `<label class="rp-field rp-full ${opts.cls || ""}"><span>${label}${opts.required ? ' <b aria-hidden="true">*</b>' : ""}</span><textarea name="${name}" rows="${opts.rows || 5}" maxlength="${opts.max || 6000}" ${opts.required ? "required" : ""} placeholder="${esc(opts.placeholder || "")}"></textarea>${opts.hint ? `<small>${opts.hint}</small>` : ""}</label>`;

function pageTop(kicker, title, lede, extra = "") {
  return `<section class="rp-hero"><div class="rx-glow" aria-hidden="true"></div><div class="container"><p class="rx-pill"><span>${kicker}</span> InfoparkDaily Recruit</p><h1>${title}</h1><p class="rp-lede">${lede}</p>${extra}</div></section>`;
}

/* =====================================================================
   POST (no sign-in)
   ===================================================================== */
export function renderPost(main, C) {
  const params = new URLSearchParams(location.search);
  const start = ["job", "walkin", "alert"].includes(params.get("type")) ? params.get("type") : "job";
  main.innerHTML = `${pageTop(
    "No sign-in",
    "Post a job in minutes.",
    "Regular job, walk-in drive or a quick job alert. Our team verifies every post, then it goes live on the InfoparkDaily jobs board and job alerts.",
    `<ol class="rp-flow"><li><span>1</span>Fill the form</li><li><span>2</span>We verify it</li><li><span>3</span>Live on /jobs/ &amp; alerts</li></ol>`
  )}
  <section class="rp-section"><div class="container rp-layout">
    <form id="rp-form" class="rp-form" novalidate>
      <fieldset class="rp-types"><legend>What are you posting?</legend>
        ${TYPES.map(([v, i, t, d]) => `<label class="rp-type"><input type="radio" name="postType" value="${v}" ${v === start ? "checked" : ""}><span>${icon(i)}<strong>${t}</strong><small>${d}</small></span></label>`).join("")}
      </fieldset>

      <div class="rp-card"><h2><span>1</span>Your details <small>For verification only — not shown publicly</small></h2><div class="rp-grid">
        ${inp("Your name", "contactName", { required: true, max: 100, extra: 'autocomplete="name"' })}
        ${inp("Designation", "designation", { max: 100, placeholder: "HR Manager, Founder…" })}
        ${inp("Official work email", "contactEmail", { type: "email", required: true, max: 200, placeholder: "you@company.com", hint: "Company email domains are verified faster than Gmail.", extra: 'autocomplete="email"' })}
        ${inp("Phone (HR / company)", "contactPhone", { type: "tel", required: true, max: 30, placeholder: "+91 98xxx xxxxx", extra: 'autocomplete="tel"' })}
      </div></div>

      <div class="rp-card"><h2><span>2</span>Company</h2><div class="rp-grid">
        ${inp("Company name", "company", { required: true, max: 150 })}
        ${inp("Company website", "website", { type: "url", max: 300, placeholder: "https://", hint: "Helps us verify the company." })}
        ${sel("IT park / area", "park", ["", ...PARKS].map((p) => [p, p || "Select…"]), "", { required: true })}
        ${inp("Office location", "location", { required: true, max: 150, placeholder: "Building, area, city" })}
      </div></div>

      <div class="rp-card"><h2><span>3</span>The role</h2><div class="rp-grid">
        ${inp("Job title", "title", { required: true, max: 200, placeholder: "e.g. Junior QA Engineer" })}
        ${inp("Other roles (optional)", "extraRoles", { max: 600, placeholder: "e.g. Java Developer | UI Designer" })}
        ${inp("Openings", "vacancies", { max: 20, placeholder: "e.g. 5" })}
        ${sel("Experience", "experience", ["Freshers", "0–2 years", "2–5 years", "5+ years", "Fresher + Experienced"], "Freshers")}
        ${sel("Employment type", "employmentType", ["Full-time", "Part-time", "Contract", "Internship"], "Full-time", { cls: "rp-hide-alert" })}
        ${sel("Work mode", "workMode", ["On-site", "Hybrid", "Remote"], "On-site", { cls: "rp-hide-alert" })}
        ${sel("Category", "sector", SECTORS, "Technology", { cls: "rp-hide-alert" })}
        ${inp("Salary (optional)", "salary", { max: 100, placeholder: "e.g. 3–4 LPA", cls: "rp-hide-alert" })}
        ${inp("Last date to apply", "closingDate", { type: "date", extra: `min="${dateISO()}"` })}
        ${inp("Key skills (optional)", "skills", { max: 700, placeholder: "Manual testing, SQL, Jira", cls: "rp-hide-alert" })}
        ${txt("Job description", "description", { required: true, rows: 6, placeholder: "Responsibilities, requirements, qualifications, benefits…", hint: "At least 20 characters.", cls: "rp-hide-alert" })}
        ${txt("Short note (optional)", "alertNote", { rows: 3, max: 600, placeholder: "e.g. Immediate joiners preferred. Share resume by email.", cls: "rp-only-alert" })}
      </div></div>

      <div class="rp-card rp-only-walkin"><h2><span>4</span>Walk-in details</h2><div class="rp-grid">
        ${inp("Walk-in date", "walkDate", { type: "date", extra: `min="${dateISO()}"` })}
        ${inp("Time", "walkTime", { max: 60, placeholder: "10:00 am – 1:00 pm" })}
        ${inp("Venue", "walkVenue", { max: 300, placeholder: "Building, floor, park, city", cls: "rp-full" })}
        ${inp("Google Maps link (optional)", "walkMap", { type: "url", max: 500, placeholder: "https://maps.app.goo.gl/…" })}
        ${inp("Documents to bring", "walkDocs", { max: 500, placeholder: "Resume, ID proof, photos" })}
      </div></div>

      <div class="rp-card"><h2><span class="rp-num-apply">4</span>How should candidates apply?</h2><div class="rp-grid">
        ${sel("Apply via", "applyMethod", ["Email", "Careers page", "WhatsApp", "Phone"], "Email")}
        ${inp("Email / link / number", "applyContact", { required: true, max: 300, placeholder: "careers@company.com or https://…" })}
      </div>
      <label class="rp-consent"><input type="checkbox" name="noFee" required> I confirm candidates will <strong>never be asked to pay</strong> for applying, interviews or joining.</label>
      <label class="rp-consent"><input type="checkbox" name="terms" required> I agree to the <a class="accent" href="/terms/" target="_blank" rel="noopener">Terms</a> and <a class="accent" href="/privacy/" target="_blank" rel="noopener">Privacy Policy</a>.</label>
      </div>

      <p class="rp-error" role="alert" hidden></p>
      <div class="rp-submit"><button class="btn" type="submit">Submit for verification ${icon("right")}</button><span class="small muted">${icon("shield")} Reviewed by the InfoparkDaily team, usually within one working day.</span></div>
    </form>

    <aside class="rp-side">
      <div class="rp-side-card"><h3>${icon("shield")} What we check</h3><ul><li>Real company &amp; website</li><li>Contact details match the company</li><li>No fees asked from candidates</li><li>Clear role and apply details</li></ul></div>
      <div class="rp-side-card rp-side-card--dark"><h3>${icon("briefcase")} Hire regularly?</h3><p>Create a free employer account to manage all your posts in one dashboard.</p><a class="btn" href="${href("register")}">Create account</a></div>
      <div class="rp-side-card"><h3>${icon("eye")} Already posted?</h3><p>Check the status with your request ID.</p><a class="text-link" href="${href("track")}">Track a post ${icon("arrow")}</a></div>
    </aside>
  </div></section>`;

  const form = main.querySelector("#rp-form");
  const err = main.querySelector(".rp-error");
  const sync = () => {
    const type = form.querySelector('input[name="postType"]:checked').value;
    form.dataset.type = type;
    form.querySelectorAll(".rp-only-walkin").forEach((el) => (el.hidden = type !== "walkin"));
    form.querySelectorAll(".rp-only-alert").forEach((el) => (el.hidden = type !== "alert"));
    form.querySelectorAll(".rp-hide-alert").forEach((el) => (el.hidden = type === "alert"));
    main.querySelector(".rp-num-apply").textContent = type === "walkin" ? "5" : "4";
    const desc = form.elements.description;
    desc.required = type !== "alert";
  };
  form.addEventListener("change", sync);
  sync();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    err.hidden = true;
    const f = Object.fromEntries(new FormData(form));
    const type = f.postType;
    const fail = (msg, name) => {
      err.textContent = msg;
      err.hidden = false;
      const el = name && form.elements[name];
      if (el) el.focus();
      return null;
    };
    const t = (v, n) => String(v || "").trim().slice(0, n);
    if (!t(f.contactName, 100)) return fail("Add your name.", "contactName");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t(f.contactEmail, 200))) return fail("Add a valid work email.", "contactEmail");
    if (t(f.contactPhone, 30).replace(/\D/g, "").length < 8) return fail("Add a phone number we can verify.", "contactPhone");
    if (!t(f.company, 150)) return fail("Add the company name.", "company");
    if (f.website && !/^https?:\/\//i.test(f.website)) return fail("Website must start with https://", "website");
    if (!f.park) return fail("Choose the IT park or area.", "park");
    if (!t(f.location, 150)) return fail("Add the office location.", "location");
    if (!t(f.title, 200)) return fail("Add the job title.", "title");
    const description = type === "alert" ? t(f.alertNote, 6000) : t(f.description, 6000);
    if (type !== "alert" && description.length < 20) return fail("Describe the role in at least 20 characters.", "description");
    if (type === "walkin" && (!f.walkDate || !t(f.walkVenue, 300))) return fail("Add the walk-in date and venue.", "walkDate");
    if (!t(f.applyContact, 300)) return fail("Add how candidates should apply.", "applyContact");
    if (!f.noFee || !f.terms) return fail("Please confirm both checkboxes.", "noFee");

    const record = {
      postType: type,
      contactName: t(f.contactName, 100),
      designation: t(f.designation, 100),
      contactEmail: t(f.contactEmail, 200),
      contactPhone: t(f.contactPhone, 30),
      company: t(f.company, 150),
      website: t(f.website, 300),
      linkedin: "",
      location: t(f.location, 150),
      park: t(f.park, 60),
      title: t(f.title, 200),
      extraRoles: t(f.extraRoles, 600),
      vacancies: t(f.vacancies, 20),
      experience: t(f.experience, 100),
      employmentType: type === "walkin" ? "Walk-in" : t(f.employmentType || "Full-time", 50),
      workMode: t(f.workMode || "On-site", 50),
      sector: t(f.sector || "Other", 50),
      skills: t(f.skills, 700),
      closingDate: t(f.closingDate || "Rolling", 20),
      salary: t(f.salary, 100),
      applyMethod: t(f.applyMethod, 40),
      applyContact: t(f.applyContact, 300),
      applyLink: /^https?:\/\//i.test(t(f.applyContact, 500)) ? t(f.applyContact, 500) : "",
      description
    };
    if (type === "walkin")
      record.walkIn = { date: t(f.walkDate, 10), time: t(f.walkTime, 60), venue: t(f.walkVenue, 300), mapLink: t(f.walkMap, 500), documents: t(f.walkDocs, 500) };

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = "Submitting…";
    try {
      const id = await C.submitRequest(record);
      try {
        const list = JSON.parse(localStorage.getItem("ipd-recruit-submissions-v1") || "[]");
        list.unshift({ id, company: record.company, role: record.title, status: "submitted", createdAt: new Date().toISOString() });
        localStorage.setItem("ipd-recruit-submissions-v1", JSON.stringify(list.slice(0, 40)));
      } catch {}
      const trackUrl = href("track", "?id=" + encodeURIComponent(id));
      main.querySelector(".rp-layout").innerHTML = `<div class="rp-done">
        <span class="rp-done-icon">${icon("check")}</span>
        <h2>Submitted for verification.</h2>
        <p>Our team will review <strong>${esc(record.title)}</strong> at ${esc(record.company)}. Save your request ID to check the status from any device.</p>
        <div class="rp-id"><code>${esc(id)}</code><button type="button" class="btn secondary small" data-copy-id="${esc(id)}">Copy ID</button></div>
        <div class="row"><a class="btn" href="${trackUrl}">Track this post ${icon("right")}</a><a class="btn secondary" href="${href("post")}">Post another</a></div>
        <p class="small muted">Tip: bookmark the tracking page — the link contains your ID.</p></div>`;
      main.querySelector("[data-copy-id]").onclick = () =>
        navigator.clipboard.writeText(id).then(() => toast("Request ID copied.")).catch(() => toast(id));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (ex) {
      console.error(ex);
      btn.disabled = false;
      btn.innerHTML = `Submit for verification ${icon("right")}`;
      fail("We couldn’t submit right now. Please check your connection and try again.");
    }
  });
}

/* =====================================================================
   TRACK
   ===================================================================== */
const STATUS = {
  pending: ["Submitted — waiting for review", "amber"],
  approved: ["Approved — your post is live", "green"],
  changes: ["Changes requested", "red"],
  rejected: ["Not approved", "red"]
};
export function renderTrack(main, C) {
  const params = new URLSearchParams(location.search);
  main.innerHTML = `${pageTop("Track", "Track your post.", "Enter the request ID you received after posting. Status updates live as our team reviews it.")}
  <section class="rp-section"><div class="container rp-narrow">
    <form class="rp-track-form" id="rp-track"><label class="rp-field"><span>Request ID</span><input name="id" placeholder="IPD-XXXX-XXXXX-XXXXX" autocomplete="off" spellcheck="false" value="${esc(params.get("id") || "")}"></label><button class="btn" type="submit">${icon("search")} Check status</button></form>
    <div id="rp-track-out" aria-live="polite"></div>
    <div id="rp-track-local"></div>
    <div class="tk-help">
      <div class="tk-help-card"><h3>${icon("search")} Where’s my request ID?</h3><p>It appears on the confirmation screen right after you post, and starts with <code>IPD-</code>. Posts made from this browser are also listed above.</p></div>
      <div class="tk-help-card"><h3>${icon("pending")} What the statuses mean</h3><ul class="tk-legend">
        <li><span class="rp-state rp-state--amber">Submitted</span> Waiting for our team to review it.</li>
        <li><span class="rp-state rp-state--green">Approved</span> Live on the jobs board — open it from the status card.</li>
        <li><span class="rp-state rp-state--red">Changes requested</span> Read our note, then submit an updated post.</li>
        <li><span class="rp-state rp-state--red">Not approved</span> The note explains why. Posts that ask candidates for money are always rejected.</li>
      </ul></div>
      <div class="tk-help-card"><h3>${icon("chat")} Need help?</h3><p>Lost your ID or need to correct a live post? Send us the company name and job title.</p><p class="tk-help-links"><a class="text-link" href="${href("contact")}">Contact the team ${icon("arrow")}</a><a class="text-link" href="${href("post")}">Post another job ${icon("arrow")}</a></p></div>
    </div>
  </div></section>`;
  const out = main.querySelector("#rp-track-out");
  const when = (v) => {
    const ms = v?.toMillis ? v.toMillis() : v?.seconds ? v.seconds * 1000 : 0;
    return ms ? new Date(ms).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "";
  };
  async function look(id) {
    id = String(id || "").trim().toUpperCase();
    if (!id) return;
    history.replaceState(null, "", location.pathname + "?id=" + encodeURIComponent(id));
    out.innerHTML = `<p class="muted">Checking ${esc(id)}…</p>`;
    try {
      const r = await C.getRequest(id);
      if (!r) {
        out.innerHTML = `<div class="rp-track-card"><h3>We couldn’t find that ID.</h3><p class="muted">Check it on your confirmation screen. Requests sent by email before November 2026 don’t have live tracking.</p></div>`;
        return;
      }
      const [label, tone] = STATUS[r.status] || [r.status, "amber"];
      const reached = r.status === "approved" ? 3 : r.status === "pending" ? 1 : 2;
      out.innerHTML = `<article class="rp-track-card">
        <p class="rp-track-id">${esc(r.id)}</p>
        <h3>${esc(r.title)}</h3>
        <p class="muted">${esc(r.company)} · ${esc(r.location)} · ${r.postType === "walkin" ? "Walk-in drive" : r.postType === "alert" ? "Job alert" : "Job post"}</p>
        <span class="rp-state rp-state--${tone}">${esc(label)}</span>
        <ol class="rp-pipe">${["Submitted", r.status === "changes" ? "Changes requested" : r.status === "rejected" ? "Not approved" : "Verified", "Live on /jobs/"].map((s, i) => `<li class="${i < reached ? (i === 1 && tone === "red" ? "is-stop" : "is-done") : ""}"><span>${i + 1}</span>${s}</li>`).join("")}</ol>
        ${r.adminNote ? `<p class="rp-note"><strong>Note from InfoparkDaily:</strong> ${esc(r.adminNote)}</p>` : ""}
        ${r.status === "approved" && r.jobId ? `<a class="btn" href="/job/c-${encodeURIComponent(r.jobId)}/">View your live job ${icon("right")}</a>` : ""}
        ${["changes", "rejected"].includes(r.status) ? `<a class="btn secondary" href="${href("post")}">Submit an updated post</a>` : ""}
        <p class="small muted">Submitted ${esc(when(r.createdAt))}</p>
      </article>`;
    } catch (e) {
      console.error(e);
      out.innerHTML = `<p class="rp-error">Couldn’t check right now. Please try again.</p>`;
    }
  }
  main.querySelector("#rp-track").onsubmit = (e) => {
    e.preventDefault();
    look(new FormData(e.target).get("id"));
  };
  try {
    const list = JSON.parse(localStorage.getItem("ipd-recruit-submissions-v1") || "[]");
    if (list.length)
      main.querySelector("#rp-track-local").innerHTML = `<h3 class="rp-sub">Posted from this browser</h3><div class="rp-local">${list
        .slice(0, 8)
        .map((x) => `<button type="button" data-look="${esc(x.id)}"><strong>${esc(x.role)}</strong><small>${esc(x.company)} · ${esc(x.id)}</small></button>`)
        .join("")}</div>`;
    main.querySelectorAll("[data-look]").forEach((b) => (b.onclick = () => look(b.dataset.look)));
  } catch {}
  if (params.get("id")) look(params.get("id"));
}

/* =====================================================================
   JOB ALERTS (job seekers, no sign-in)
   ===================================================================== */
export function renderAlerts(main, C) {
  const params = new URLSearchParams(location.search);
  const manageId = params.get("id");
  main.innerHTML = `${pageTop(
    "Job alerts",
    "Never miss the right opening.",
    "Tell us what you’re looking for. We’ll send matching jobs and walk-in drives from Kerala’s IT parks to your WhatsApp or email. Free — pause any time."
  )}
  <section class="rp-section"><div class="container rp-layout">
    <div id="ja-main">${manageId ? `<p class="muted">Loading your alert…</p>` : alertForm()}</div>
    <aside class="rp-side">
      <div class="rp-side-card rp-side-card--yellow"><h3>${icon("bell")} Instant updates</h3><p>Join the InfoparkDaily WhatsApp channel for every new job, every day.</p><a class="btn" href="${WA}" target="_blank" rel="noopener noreferrer">Join WhatsApp channel</a></div>
      <div class="rp-side-card rp-side-card--dark"><h3>${icon("briefcase")} Hiring?</h3><p>Post a quick job alert — no sign-in. Our team verifies and shares it.</p><a class="btn" href="${href("post", "?type=alert")}">Post a job alert</a></div>
      <div class="rp-side-card"><h3>${icon("shield")} Your privacy</h3><p>Your contact is used only to send job alerts. We never share it with employers or ask for fees.</p></div>
    </aside>
  </div></section>`;
  if (manageId) return manage(manageId);
  bindForm();

  function alertForm() {
    const chk = (name, value, label, on) => `<label class="ja-chip"><input type="checkbox" name="${name}" value="${esc(value)}" ${on ? "checked" : ""}><span>${label}</span></label>`;
    return `<form id="ja-form" class="rp-form" novalidate>
      <div class="rp-card"><h2><span>1</span>Where should we send alerts?</h2>
        <div class="ja-channel"><label class="ja-chip ja-chip--big"><input type="radio" name="channel" value="whatsapp" checked><span>${icon("chat")} WhatsApp</span></label><label class="ja-chip ja-chip--big"><input type="radio" name="channel" value="email"><span>${icon("mail")} Email</span></label></div>
        <div class="rp-grid">${inp("Your name (optional)", "name", { max: 100, extra: 'autocomplete="name"' })}${inp("WhatsApp number or email", "contact", { required: true, max: 200, placeholder: "+91 98xxx xxxxx", extra: 'autocomplete="tel"' })}</div>
      </div>
      <div class="rp-card"><h2><span>2</span>What are you looking for?</h2>
        <div class="rp-grid">${inp("Roles or skills", "keywords", { max: 300, placeholder: "e.g. QA tester, React, accounts, customer support", cls: "rp-full", hint: "Separate with commas. Leave empty for all jobs." })}</div>
        <p class="ja-label">Locations</p><div class="ja-chips">${PARKS.map((p, i) => chk("locations", p, p, i === 0)).join("")}</div>
        <p class="ja-label">Experience</p><div class="ja-chips">${[["any", "Any"], ["fresher", "Fresher"], ["experienced", "Experienced"]].map(([v, l], i) => `<label class="ja-chip"><input type="radio" name="experience" value="${v}" ${i === 0 ? "checked" : ""}><span>${l}</span></label>`).join("")}</div>
        <p class="ja-label">Send me</p><div class="ja-chips">${chk("types", "jobs", "Jobs", true)}${chk("types", "walkins", "Walk-in drives", true)}${chk("types", "alerts", "Quick job alerts", true)}</div>
      </div>
      <div class="rp-card"><label class="rp-consent"><input type="checkbox" name="consent" required> I agree to receive job alerts from InfoparkDaily on the contact above, and to the <a class="accent" href="/privacy/" target="_blank" rel="noopener">Privacy Policy</a>. I can pause or stop any time.</label></div>
      <p class="rp-error" role="alert" hidden></p>
      <div class="rp-submit"><button class="btn" type="submit">${icon("bell")} Create my job alert</button></div>
    </form>`;
  }
  function bindForm() {
    const form = main.querySelector("#ja-form");
    const err = main.querySelector(".rp-error");
    const contact = form.elements.contact;
    form.addEventListener("change", () => {
      const ch = form.querySelector('input[name="channel"]:checked').value;
      contact.type = ch === "email" ? "email" : "tel";
      contact.placeholder = ch === "email" ? "you@example.com" : "+91 98xxx xxxxx";
      contact.closest(".rp-field").querySelector("span").firstChild.textContent = ch === "email" ? "Email address " : "WhatsApp number ";
    });
    form.onsubmit = async (e) => {
      e.preventDefault();
      err.hidden = true;
      const fd = new FormData(form);
      const channel = fd.get("channel");
      const value = String(fd.get("contact") || "").trim();
      const bad = (m) => {
        err.textContent = m;
        err.hidden = false;
      };
      if (channel === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return bad("Add a valid email address.");
      if (channel === "whatsapp" && value.replace(/\D/g, "").length < 10) return bad("Add a valid WhatsApp number with country code.");
      const types = fd.getAll("types");
      if (!types.length) return bad("Choose at least one alert type.");
      if (!fd.get("consent")) return bad("Please agree to receive job alerts.");
      const data = {
        name: String(fd.get("name") || "").trim().slice(0, 100),
        channel,
        contact: value.slice(0, 200),
        keywords: String(fd.get("keywords") || "").trim().slice(0, 300),
        locations: fd.getAll("locations").slice(0, 6),
        experience: fd.get("experience") || "any",
        types: types.slice(0, 3)
      };
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      try {
        const id = await C.subscribeAlert(data);
        const link = location.origin + href("alerts", "?id=" + encodeURIComponent(id));
        main.querySelector("#ja-main").innerHTML = `<div class="rp-done"><span class="rp-done-icon">${icon("bell")}</span><h2>Your job alert is on.</h2><p>We’ll send matching ${esc(data.keywords || "jobs")} to your ${channel === "email" ? "email" : "WhatsApp"}.</p><div class="rp-id"><code>${esc(id)}</code><button type="button" class="btn secondary small" data-copy>Copy manage link</button></div><p class="small muted">Keep this link to pause or stop alerts later.</p><div class="row"><a class="btn" href="/jobs/">Browse jobs now</a><a class="btn secondary" href="${WA}" target="_blank" rel="noopener noreferrer">Join WhatsApp channel</a></div></div>`;
        main.querySelector("[data-copy]").onclick = () => navigator.clipboard.writeText(link).then(() => toast("Manage link copied.")).catch(() => toast(link));
      } catch (ex) {
        console.error(ex);
        btn.disabled = false;
        bad("We couldn’t save your alert. Please try again.");
      }
    };
  }
  async function manage(id) {
    const box = main.querySelector("#ja-main");
    try {
      const a = await C.getAlert(id);
      if (!a) {
        box.innerHTML = `<div class="rp-track-card"><h3>Alert not found.</h3><p class="muted">Check your manage link, or create a new alert.</p><a class="btn" href="${href("alerts")}">Create a job alert</a></div>`;
        return;
      }
      const draw = () => {
        box.innerHTML = `<article class="rp-track-card"><p class="rp-track-id">${esc(a.id)}</p><h3>${esc(a.keywords || "All jobs")}</h3><p class="muted">${esc((a.locations || []).join(", ") || "Any location")} · ${esc(a.experience)} · via ${a.channel === "email" ? "email" : "WhatsApp"}</p>
          <span class="rp-state rp-state--${a.status === "active" ? "green" : "amber"}">${a.status === "active" ? "Active" : a.status === "paused" ? "Paused" : "Stopped"}</span>
          <div class="row" style="margin-top:16px">${a.status !== "active" ? `<button class="btn" data-st="active">Resume alerts</button>` : `<button class="btn secondary" data-st="paused">Pause alerts</button>`}${a.status !== "unsubscribed" ? `<button class="btn quiet" data-st="unsubscribed">Stop all alerts</button>` : ""}</div></article>`;
        box.querySelectorAll("[data-st]").forEach(
          (b) =>
            (b.onclick = async () => {
              b.disabled = true;
              try {
                await C.setAlertStatus(a.id, b.dataset.st);
                a.status = b.dataset.st;
                toast(a.status === "active" ? "Alerts resumed." : a.status === "paused" ? "Alerts paused." : "You won’t receive alerts any more.");
                draw();
              } catch {
                toast("Couldn’t update. Please try again.");
                b.disabled = false;
              }
            })
        );
      };
      draw();
    } catch (e) {
      box.innerHTML = `<p class="rp-error">Couldn’t load your alert right now.</p>`;
    }
  }
}
