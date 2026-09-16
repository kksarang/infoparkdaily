import * as C from "./cloud.js";
import {
  ROOT,
  SECTORS,
  BASES,
  esc,
  dateISO,
  stamp,
  parseSkills,
  csv,
  download,
  curatedJobs,
} from "./model.js";
import {
  icon,
  href,
  link,
  empty,
  loading,
  field,
  area,
  select,
  check,
  message,
  showMessage,
  toast,
  dialog,
  statusTag,
  statusLabel,
  formatDate,
  workerCard,
  avatar,
  jobCard,
} from "./ui.js";
import {
  updateDirectory,
  jobDetail,
  workerDetail,
  workersHome,
} from "./public.js";
let S,
  main,
  unsubscribe = [],
  ownJobs = [],
  applications = [],
  profile = null,
  registering = false;
const privateRoutes = [
  "dashboard",
  "profile",
  "post-job",
  "applications",
  "messages",
  "saved",
  "account",
  "admin",
];
const seekerPrivateRoutes = ["profile", "saved"];
const params = new URLSearchParams(location.search);
const redirect = () => {
  const next = params.get("next");
  const safe =
    next?.startsWith(ROOT) &&
    !next.includes("://") &&
    !next.includes("//") &&
    !next.includes("\\") &&
    !next.includes("..")
      ? next
      : href("dashboard");
  location.href = safe;
};
const employerFields = () =>
  `<input type="hidden" name="role" value="employer"><div class="notice">This hub is for employers and hiring teams. Job seekers should use the <a class="accent" href="/jobs/">jobs board</a> and <a class="accent" href="/resume-builder/">Career Tools</a>.</div>`;
const password = () =>
  `<div class="field"><label for="password">Password</label><div class="password-field"><input id="password" name="password" type="password" required minlength="${S.route === "register" ? 10 : 1}" maxlength="128" autocomplete="${S.route === "register" ? "new-password" : "current-password"}"><button type="button" class="icon-btn" data-password aria-label="Show password">${icon("eye")}</button></div></div>`;
function authView(register = false) {
  return `<div class="auth-layout"><section class="auth-story"><p class="eyebrow">EMPLOYER HIRING HUB</p><h1>${register ? "Hire with<br>clarity." : "Welcome back,<br>hiring team."}</h1><p>${register ? "Create an employer account to post roles, discover talent and manage hiring conversations." : "Your roles, applications and talent conversations — ready when you are."}</p><div class="auth-benefits"><span>${icon("check")} Post roles for review</span><span>${icon("check")} Browse the talent directory</span><span>${icon("shield")} Private hiring workspace</span></div><img src="/assets/infoparkdaily/office.webp" alt="Colleagues collaborating in an office" width="600" height="350"></section><section class="auth-main"><div class="auth-box"><h2>${register ? "Create your employer account" : "Sign in to hire"}</h2><p>${register ? "Already have an account? " + link("Sign in", "sign-in", "text-link") : "New hiring team? " + link("Create an employer account", "register", "text-link")}</p><form class="stack" id="auth-form">${register ? employerFields() + field("Your name", "name", "", { required: true, max: 100, extra: 'autocomplete="name"' }) + field("Company name", "company", "", { required: true, max: 120, extra: 'autocomplete="organization"' }) : ""}${field("Work email", "email", "", { type: "email", required: true, max: 254, extra: 'autocomplete="email"' })}${password()}${register ? '<small class="muted">Use at least 10 characters. You’ll verify your email before posting roles.</small>' : `<div class="row spread">${check("Remember me", "remember")}<button type="button" class="btn quiet small" data-reset>Forgot password?</button></div>`}${register ? `<label class="check"><input type="checkbox" name="consent" required><span>I agree to the <a class="accent" href="/terms/" target="_blank">Terms</a> and <a class="accent" href="/privacy/" target="_blank">Privacy Policy</a>.</span></label>` : ""}${message()}<button class="btn wide" type="submit">${register ? "Create employer account" : "Sign in"} ${icon("right")}</button></form><div class="divider">or continue with</div><button class="btn secondary wide" data-google><span style="font-weight:800;font-size:1.1rem;color:#4285f4">G</span> Google</button><p class="small muted" style="text-align:center;margin:24px 0 0">${icon("shield")} Looking for a job? <a class="accent" href="/jobs/">Browse the jobs board</a> instead.</p></div></section></div>`;
}
function verifyView() {
  main.innerHTML = `<section class="section soft"><div class="container" style="max-width:650px"><div class="panel stack"><span class="feature-icon" style="width:max-content">${icon("mail")}</span><h1 style="font-size:2rem;margin:0">Check your inbox.</h1><p class="muted" style="margin:0">Open the confirmation link sent to <strong>${esc(S.user.email)}</strong>. Then come back here to finish your employer account.</p><div class="notice">Your email needs to be verified before you can post a role or contact talent.</div><div class="notice warn">(Sometimes this mail goes to Spam or Promotions. Open that folder, then mark InfoparkDaily as Not spam so the next one reaches Inbox.)</div><form id="verify-form" class="stack">${message()}<button class="btn" type="submit">I’ve verified my email ${icon("right")}</button><button type="button" class="btn secondary" data-resend>Resend verification email</button></form><button class="btn quiet" data-logout>Use another account</button></div></div></section>`;
  document.querySelector("#verify-form").onsubmit = (e) =>
    run(e, async () => {
      if (!(await C.verifyAgain()))
        throw Error(
          "The email is still unverified. Open the link in Inbox or Spam, then try again.",
        );
      await authChanged(C.auth.currentUser);
    });
}
function onboarding() {
  let draft = {};
  try {
    draft = JSON.parse(sessionStorage.getItem("ipd_market_signup") || "{}");
  } catch {}
  main.innerHTML = `<section class="section soft"><div class="container" style="max-width:650px"><div class="panel"><p class="eyebrow">EMPLOYER ONBOARDING</p><h1 style="font-size:2rem">Set up your hiring workspace.</h1><p class="muted">Add your details so candidates and the review team know who is hiring.</p><form class="stack" id="onboarding-form">${employerFields()}${field("Your name", "name", S.user.displayName || draft.name || "", { required: true, max: 100 })}${field("Phone number (private, optional)", "phone", "", { type: "tel", max: 30, extra: 'autocomplete="tel"' })}${field("Company name", "company", draft.company || "", { required: true, max: 120 })}${message()}<button class="btn" type="submit">Continue to my workspace ${icon("right")}</button></form></div></div></section>`;
  document.querySelector("#onboarding-form").onsubmit = (e) =>
    run(e, async (data) => {
      if (!data.company.trim())
        throw Error("Add your company name to continue as an employer.");
      data.role = "employer";
      await C.saveMember(data);
      sessionStorage.removeItem("ipd_market_signup");
      if (["sign-in", "register"].includes(S.route)) redirect();
      else await authChanged(S.user);
    });
}
async function run(event, task, success) {
  event.preventDefault();
  const form = event.currentTarget || event.target;
  const buttons = [...form.querySelectorAll("[type=submit]")];
  buttons.forEach((b) => (b.disabled = true));
  try {
    await task(Object.fromEntries(new FormData(form)), form);
    if (success) await success();
  } catch (e) {
    showMessage(form, C.failText(e));
  } finally {
    buttons.forEach((b) => (b.disabled = false));
  }
}
function nav() {
  document.querySelector("#nav-account").innerHTML = S.user
    ? `${link("Post a role", "post-job", "btn secondary")}${link("My workspace", "dashboard", "btn")}`
    : `${link("Sign in", "sign-in", "btn quiet")}${link("Post a role", "post-job", "btn secondary")}${link("Get started", "register")}`;
}
function workspace(title, text, body) {
  const links = [
    ["dashboard", "home", "Overview"],
    [
      "applications",
      "briefcase",
      "Hiring & applications",
    ],
    ["messages", "chat", "Messages"],
    ["post-job", "plus", "Post a role"],
    ["account", "settings", "Account"],
    ...(S.admin ? [["admin", "shield", "Community review"]] : []),
  ];
  main.innerHTML = `<section class="workspace"><div class="container workspace-grid"><nav class="workspace-nav" aria-label="Hiring workspace"><div class="member-name">${esc(S.member.name)}<small>${S.member.company ? esc(S.member.company) + " · " : ""}Employer workspace</small></div>${links.map(([r, i, l]) => `<a href="${href(r)}" ${S.route === r ? 'aria-current="page"' : ""}>${icon(i)}${l}</a>`).join("")}<button data-logout>${icon("logout")}Sign out</button></nav><div><div class="workspace-head"><h1>${title}</h1><p>${text}</p></div><div id="workspace-content">${body}</div></div></div></section>`;
}
async function authChanged(user) {
  unsubscribe.forEach((fn) => fn());
  unsubscribe = [];
  S.user = user;
  S.member = null;
  S.admin = false;
  nav();
  if (registering) return;
  if (!user) {
    S.savedIds = new Set();
    if (["sign-in", "register"].includes(S.route)) {
      main.innerHTML = authView(S.route === "register");
      bindAuth();
    } else if (privateRoutes.includes(S.route)) {
      main.innerHTML = `<section class="section soft"><div class="container" style="max-width:650px">${empty("Sign in to your hiring workspace.", "Post roles, browse talent and manage applications from your employer dashboard.", link("Sign in", "sign-in", "btn", "?next=" + encodeURIComponent(location.pathname + location.search)) + " " + link("Create employer account", "register", "btn secondary"), "users")}</div></section>`;
    }
    return;
  }
  if (!user.emailVerified) {
    if (
      privateRoutes.includes(S.route) ||
      ["sign-in", "register"].includes(S.route)
    )
      verifyView();
    return;
  }
  try {
    [S.member, S.admin] = await Promise.all([C.getMember(), C.isAdmin()]);
  } catch (e) {
    if (privateRoutes.includes(S.route))
      main.innerHTML = empty(
        "Your workspace is unavailable.",
        C.failText(e),
        '<button class="btn" data-reload>Try again</button>',
      );
    return;
  }
  if (!S.member) {
    if (
      privateRoutes.includes(S.route) ||
      ["sign-in", "register"].includes(S.route)
    )
      onboarding();
    return;
  }
  try {
    S.savedIds = new Set((await C.savedJobs()).map((j) => j.id));
    refreshSavedButtons();
  } catch {}
  if (["sign-in", "register"].includes(S.route)) {
    main.innerHTML = `<section class="section soft"><div class="container" style="max-width:650px">${empty("You’re signed in.", "Welcome back, " + esc(S.member.name) + ". Your next step is waiting in your workspace.", link("Open my workspace", "dashboard") + ' <button class="btn secondary" data-logout>Sign out</button>', "check")}</div></section>`;
    return;
  }
  if (privateRoutes.includes(S.route)) {
    await renderPrivate();
  } else if (params.get("id") && ["jobs", "workers"].includes(S.route))
    await loadPublicDetail();
}
function bindAuth() {
  const form = document.querySelector("#auth-form");
  form.onsubmit = (e) =>
    run(e, async (data) => {
      if (S.route === "register") {
        registering = true;
        sessionStorage.setItem(
          "ipd_market_signup",
          JSON.stringify({
            role: "employer",
            name: data.name,
            company: data.company,
          }),
        );
        try {
          await C.register(data);
        } finally {
          registering = false;
        }
        S.user = C.auth.currentUser;
        nav();
        verifyView();
      } else {
        await C.logIn(data.email, data.password, !!data.remember);
        redirect();
      }
    });
}
function guard() {
  if (!S.user) {
    location.href = href(
      "sign-in",
      "?next=" + encodeURIComponent(location.pathname + location.search),
    );
    return false;
  }
  if (!S.user.emailVerified) {
    location.href = href("dashboard");
    return false;
  }
  if (!S.member) {
    location.href = href("dashboard");
    return false;
  }
  return true;
}
function refreshSavedButtons() {
  document.querySelectorAll("[data-save]").forEach((b) => {
    const saved = S.savedIds.has(b.dataset.save);
    b.classList.toggle("saved", saved);
    b.setAttribute("aria-pressed", saved);
    if (!b.classList.contains("card-save"))
      b.innerHTML =
        icon("bookmark") +
        " " +
        (saved ? "Saved to your list" : "Save this job");
  });
}
async function renderPrivate() {
  const r = S.route;
  if (seekerPrivateRoutes.includes(r)) {
    location.replace(href("dashboard"));
    return;
  }
  if (r === "account") await renderAccount();
  else if (r === "post-job") await renderJobForm();
  else if (r === "admin") await renderAdmin();
  else if (["dashboard", "applications", "messages"].includes(r)) {
    workspace(
      r === "dashboard"
        ? `Hello, ${esc(S.member.name.split(" ")[0])}.`
        : r === "messages"
          ? "Your conversations."
          : "Every next step, together.",
      r === "dashboard"
        ? "Your opportunities and connections, at a glance."
        : r === "messages"
          ? "Private conversations open after a community hire is approved."
          : "Follow applications and invitations from the first hello to completed work.",
      loading(),
    );
    profile = await C.getRecord("profiles", S.user.uid);
    let loaded = 0;
    const refresh = () => {
      if (++loaded < 2) return;
      if (r === "dashboard") renderDashboard();
      else if (r === "applications") renderApplications();
      else renderMessages();
    };
    unsubscribe.push(
      C.watchOwn(
        "jobs",
        "ownerUid",
        (rows) => {
          ownJobs = rows;
          refresh();
        },
        (err) => toast(C.failText(err)),
      ),
    );
    const fields =
      S.member.role === "employer"
        ? ["employerUid", "workerUid"]
        : ["workerUid", "employerUid"];
    let sets = {};
    for (const f of fields)
      unsubscribe.push(
        C.watchOwn(
          "applications",
          f,
          (rows) => {
            sets[f] = rows;
            applications = [
              ...new Map(
                Object.values(sets)
                  .flat()
                  .map((a) => [a.id, a]),
              ).values(),
            ].sort((a, b) => stamp(b.updatedAt) - stamp(a.updatedAt));
            refresh();
          },
          (err) => toast(C.failText(err)),
        ),
      );
  }
}
function renderProfile() {
  const p = profile || { name: S.member.name, basis: "month", available: true };
  workspace(
    "Put your skills in the spotlight.",
    "Your profile appears in the worker directory after review.",
    `${p.status ? `<div class="notice ${p.status === "rejected" ? "warn" : ""}">${statusTag(p.status)} <span style="margin-left:10px">${p.status === "approved" ? "Editing your profile sends it back for review." : p.status === "rejected" ? "Please check your details and resubmit. Contact us if you need guidance." : "Your profile is waiting for the team’s review."}</span></div>` : ""}<form id="profile-form" class="panel stack"><div class="row">${avatar(p)}<div class="field"><label for="photo">Profile photo (optional)</label><input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp"><small>JPG, PNG or WebP. We’ll resize it for your profile.</small></div></div><div class="form-grid">${field("Full name", "name", p.name, { required: true, max: 100 })}${field("Professional title", "title", p.title, { required: true, max: 150, placeholder: "e.g. Frontend developer" })}${select("Work category", "sector", SECTORS, p.sector, null)}${field("Location", "location", p.location, { required: true, max: 150, placeholder: "City, district" })}${field("Experience", "experience", p.experience, { max: 100, placeholder: "e.g. 3 years in frontend development" })}${field("Skills (separate with commas)", "skills", (p.skills || []).join(", "), { max: 700, placeholder: "React, JavaScript, UI development" })}${field("Expected rate in ₹ (optional)", "rate", p.rate || "", { type: "number", extra: 'min="0" max="10000000" step="1"' })}${select("Rate basis", "basis", BASES, p.basis, null)}<div class="full">${area("About you", "about", p.about, { required: true, max: 3000, placeholder: "Tell employers about your experience and the work you do well." })}</div>${field("Available from (optional)", "availableFrom", p.availableFrom, { type: "date" })}<div class="field">${check("I’m available for work", "available", p.available)}</div></div><div class="notice">Your name, skills, location, rate and photo will be public after approval. Keep phone numbers, email addresses and identity documents out of this profile.</div>${message()}<div class="row"><button class="btn" type="submit">Submit profile for review ${icon("right")}</button>${p.status === "approved" ? link("View public profile", "workers", "text-link", "?id=" + encodeURIComponent(S.user.uid)) : ""}</div></form>`,
  );
  document.querySelector("#profile-form").onsubmit = (e) =>
    run(e, async (data, form) => {
      const file = form.elements.photo.files[0];
      const photo = file ? await resizePhoto(file) : p.photo || "";
      await C.saveProfile({
        name: data.name.trim(),
        title: data.title.trim(),
        sector: data.sector,
        location: data.location.trim(),
        experience: data.experience.trim(),
        skills: parseSkills(data.skills),
        about: data.about.trim(),
        rate: Number(data.rate) || 0,
        basis: data.basis,
        available: !!data.available,
        availableFrom: data.availableFrom,
        photo,
      });
      profile = await C.getRecord("profiles", S.user.uid);
      renderProfile();
      toast("Profile submitted for review.");
    });
}
async function resizePhoto(file) {
  if (file.size > 6000000) throw Error("Choose a photo smaller than 6 MB.");
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    throw Error("Choose a JPG, PNG or WebP photo.");
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 240;
  const ctx = canvas.getContext("2d"),
    size = Math.min(bitmap.width, bitmap.height);
  ctx.drawImage(
    bitmap,
    (bitmap.width - size) / 2,
    (bitmap.height - size) / 2,
    size,
    size,
    0,
    0,
    240,
    240,
  );
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.75);
}
async function renderAccount() {
  const docs = await C.documentList();
  workspace(
    "Your employer account.",
    "Keep your hiring details current. Private documents stay with your workspace.",
    `<form id="account-form" class="panel stack"><h2>Company &amp; contact</h2>${employerFields()}<div class="form-grid">${field("Name", "name", S.member.name, { required: true, max: 100 })}${field("Phone (private, optional)", "phone", S.member.phone, { type: "tel", max: 30 })}${field("Company name", "company", S.member.company, { required: true, max: 120 })}<div class="field"><label>Email address</label><p class="small muted" style="margin:5px 0">${esc(S.user.email)} · Verified</p></div></div>${message()}<div class="row"><button class="btn" type="submit">Save changes</button><button type="button" class="btn secondary" data-reset>Reset password</button></div></form><div class="panel account-docs"><h2>Private documents</h2><p class="small muted">Only you and the review team can access these files.</p>${[
      "resume",
      "certificate",
      "other",
    ]
      .map((slot) => {
        const d = docs.find((d) => d.id === slot);
        return `<div class="file-row">${icon("file")}<div><strong>${slot === "other" ? "Supporting document" : slot[0].toUpperCase() + slot.slice(1)}</strong><small>${d ? esc(d.name) + " · " + Math.ceil(d.size / 1000) + " KB" : "No file uploaded"}</small></div>${d ? `<button class="icon-btn" data-document="${slot}" aria-label="Download ${slot}">${icon("download")}</button><button class="btn quiet small" data-remove-document="${slot}">Remove</button>` : ""}</div>`;
      })
      .join(
        "",
      )}<form id="document-form" class="stack" style="margin-top:24px">${select(
      "Choose document",
      "slot",
      [
        ["resume", "Resume"],
        ["certificate", "Certificate"],
        ["other", "Supporting document"],
      ],
      "resume",
      null,
    )}<div class="field"><label for="document">Choose a file</label><input name="document" id="document" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" required><small>PDF, Word, JPG or PNG · Up to 700 KB per file. Uploading replaces that document.</small></div>${message()}<button class="btn secondary" type="submit">Upload private document</button></form></div><div class="panel account-docs"><h2>Privacy & account help</h2><p class="small muted">To request removal of your account data, contact the team from your registered email. Looking for work? Use the <a class="accent" href="/jobs/">jobs board</a>.</p>${link("Contact support", "contact", "text-link")}</div>`,
  );
  document.querySelector("#account-form").onsubmit = (e) =>
    run(e, async (data) => {
      if (!data.company.trim())
        throw Error("Add your company name for an employer account.");
      data.role = "employer";
      await C.saveMember(data);
      S.member = await C.getMember();
      showMessage(
        document.querySelector("#account-form"),
        "Account details saved.",
        true,
      );
    });
  document.querySelector("#document-form").onsubmit = (e) =>
    run(e, async (data, form) => {
      await C.uploadDocument(data.slot, form.elements.document.files[0]);
      await renderAccount();
      toast("Document uploaded privately.");
    });
}
async function renderJobForm() {
  if (S.member.role !== "employer") {
    workspace(
      "Build your next great team.",
      "Post a role for the InfoparkDaily community.",
      empty(
        "Finish your employer setup.",
        "Add your company name in account settings to post roles. Job seekers should use the public jobs board.",
        link("Open account settings", "account") +
          ' <a class="btn secondary" href="/jobs/">Browse jobs board</a>',
        "briefcase",
      ),
    );
    return;
  }
  let job = { company: S.member.company, basis: "month", vacancies: 1 };
  const edit = params.get("edit");
  if (edit) {
    job = await C.getRecord("jobs", edit);
    if (!job || job.ownerUid !== S.user.uid)
      throw Error("This job is not available to edit.");
  }
  workspace(
    edit
      ? "Give your role a fresh update."
      : "Find the person your team needs.",
    "Clear details help the right people find you. Every community post is reviewed.",
    `<form id="job-form" class="panel stack"><div class="form-grid">${field("Job title", "title", job.title, { required: true, max: 200, placeholder: "e.g. Customer support associate" })}${field("Company name", "company", job.company, { required: true, max: 150 })}${select("Category", "sector", SECTORS, job.sector, null)}${field("Location", "location", job.location, { required: true, max: 150, placeholder: "City, district or remote" })}${select("Employment type", "employmentType", ["Full-time", "Part-time", "Contract", "Internship", "Temporary", "Freelance"], job.employmentType || "Full-time", null)}${select("Work arrangement", "workMode", ["On-site", "Hybrid", "Remote"], job.workMode || "On-site", null)}${field("Experience required", "experience", job.experience, { max: 100, placeholder: "e.g. Freshers welcome or 2–4 years" })}${field("Number of openings", "vacancies", job.vacancies, { required: true, type: "number", extra: 'min="1" max="10000"' })}${field("Pay in ₹ (optional)", "pay", job.pay || "", { type: "number", extra: 'min="0" max="10000000" step="1"' })}${select("Pay basis", "basis", BASES, job.basis, null)}${field("Closing date", "closingDate", job.closingDate, { required: true, type: "date", extra: 'min="' + dateISO() + '"' })}<div class="field">${check("Mark as urgent hiring", "urgent", job.urgent)}</div><div class="full">${area("About the role", "description", job.description, { required: true, max: 6000, placeholder: "Describe the work, responsibilities, team and what a typical day looks like." })}</div><div class="full">${area("Requirements (one per line)", "requirements", (job.requirements || []).join("\n"), { max: 3000, placeholder: "Add the qualifications and skills this role needs." })}</div><div class="full">${field("Skills (separate with commas)", "skills", (job.skills || []).join(", "), { max: 700 })}</div></div><div class="notice">Applications arrive in your workspace. Keep personal contact details out of the public description. Editing an approved post sends it back for review.</div>${message()}<button class="btn" type="submit">${edit ? "Resubmit job for review" : "Submit job for review"} ${icon("right")}</button></form>`,
  );
  document.querySelector("#job-form").onsubmit = (e) =>
    run(e, async (data) => {
      if (data.description.trim().length < 30)
        throw Error("Add at least 30 characters to describe the role.");
      await C.postJob(
        {
          title: data.title.trim(),
          company: data.company.trim(),
          sector: data.sector,
          location: data.location.trim(),
          employmentType: data.employmentType,
          workMode: data.workMode,
          experience: data.experience.trim(),
          vacancies: Number(data.vacancies),
          pay: Number(data.pay) || 0,
          basis: data.basis,
          closingDate: data.closingDate,
          urgent: !!data.urgent,
          description: data.description.trim(),
          requirements: data.requirements
            .split("\n")
            .map((v) => v.trim())
            .filter(Boolean)
            .slice(0, 20),
          skills: parseSkills(data.skills),
        },
        edit,
      );
      location.href = href("dashboard", "?posted=1");
    });
}
function renderDashboard() {
  const active = applications.filter(
    (a) => !["declined", "withdrawn", "completed"].includes(a.status),
  );
  const newUpdates = applications.filter(
    (a) => stamp(a.updatedAt) > stamp(S.member.lastReadAt),
  );
  const workerNotice =
    S.member.role !== "employer"
      ? `<div class="notice warn">This hub is for hiring teams. Add your company in Account to continue as an employer, or browse jobs on the <a class="accent" href="/jobs/">public board</a>.</div>`
      : "";
  document.querySelector("#workspace-content").innerHTML =
    `${params.get("posted") ? '<div class="notice">Your role was submitted. It will appear publicly after review.</div>' : ""}${workerNotice}<div class="grid three metrics"><a class="metric" href="${href("workers")}">${icon("users")}<strong>${S.workers?.length || "—"}</strong><span>Talent directory</span></a><a class="metric" href="${href("applications")}">${icon("briefcase")}<strong>${active.length}</strong><span>Active hiring</span></a><a class="metric" href="${href("applications")}">${icon("bell")}<strong>${newUpdates.length}</strong><span>Recent updates</span></a></div><div class="panel" style="margin-top:24px"><div class="row spread"><h2 style="margin:0">Your job posts</h2>${link("Post a role " + icon("plus"), "post-job", "text-link")}</div><div class="stack" style="margin-top:24px">${ownJobs.length ? ownJobs.map((j) => `<article class="record"><div class="row spread"><h3 style="margin:0">${esc(j.title)}</h3>${statusTag(j.status)}</div><p>${esc(j.company)} · ${esc(j.location)}</p><div class="row">${link("Edit", "post-job", "btn secondary small", "?edit=" + encodeURIComponent(j.id))}${j.status !== "closed" ? `<button class="btn quiet small" data-close-job="${esc(j.id)}">Close post</button>` : ""}</div></article>`).join("") : empty("Your next great hire starts here.", "Post a clear role and invite talent from the directory.", link("Post a role", "post-job"))}</div></div><div class="panel" style="margin-top:24px"><div class="row spread"><h2 style="margin:0">Latest hiring activity</h2>${link("View all", "applications", "text-link")}</div><div class="stack" style="margin-top:24px">${
      applications.length
        ? applications
            .slice(0, 4)
            .map(
              (a) =>
                `<a class="record" href="${href("applications")}"><div class="row spread"><strong>${esc(a.jobTitle)}</strong>${statusTag(a.status)}</div><p style="margin:10px 0 0">${esc(a.company)} · ${formatDate(a.updatedAt, true)}</p></a>`,
            )
            .join("")
        : '<p class="small muted" style="margin:0">Invitations, applications and hire updates will appear here.</p>'
    }</div></div>`;
}
async function renderSaved() {
  const saved = await C.savedJobs();
  workspace(
    "Good opportunities, kept close.",
    "Save now, come back when you’re ready. Track applications you send to external employers.",
    saved.length
      ? `<div class="stack">${saved.map((j) => `<article class="record"><div class="row spread"><h3 style="margin:0">${esc(j.title)}</h3><button class="icon-btn saved" data-unsave="${esc(j.id)}" aria-label="Remove saved job">${icon("bookmark")}</button></div><p>${esc(j.company)}</p><div class="row">${link("View job", "jobs", "btn secondary small", "?id=" + encodeURIComponent(j.jobId))}${j.kind === "curated" ? (j.applied ? '<span class="tag">Marked as applied</span>' : `<button class="btn small" data-mark-applied="${esc(j.id)}">I’ve applied with the employer</button>`) : '<span class="tag neutral">Community job</span>'}</div></article>`).join("")}</div>`
      : empty(
          "Keep your next possibilities here.",
          "Save jobs as you explore. They’ll be here when you come back.",
          link("Find talent", "workers"),
          "bookmark",
        ),
  );
}
function applicationActions(a) {
  const worker = a.workerUid === S.user.uid,
    employer = a.employerUid === S.user.uid,
    s = a.status;
  let actions = [];
  if (worker) {
    if (s === "invited") actions.push(["submitted", "Accept invitation"]);
    if (["invited", "submitted", "shortlisted", "hire_requested"].includes(s))
      actions.push([
        "withdrawn",
        s === "invited" ? "Decline invitation" : "Withdraw application",
      ]);
    if (s === "approved")
      actions.push(["completion_requested", "Request completion"]);
  }
  if (employer) {
    if (s === "submitted") actions.push(["shortlisted", "Shortlist"]);
    if (["submitted", "shortlisted"].includes(s))
      actions.push(["hire_requested", "Request hire approval"]);
    if (["invited", "submitted", "shortlisted", "hire_requested"].includes(s))
      actions.push(["declined", "Decline"]);
    if (["approved", "completion_requested"].includes(s))
      actions.push(["completed", "Mark work completed"]);
  }
  return (
    actions
      .map(
        ([s, l], i) =>
          `<button class="btn ${i ? "secondary " : ""}small" data-transition="${esc(a.id)}" data-status="${s}">${l}</button>`,
      )
      .join("") +
    (["approved", "completion_requested", "completed"].includes(s)
      ? link(
          "Open chat",
          "messages",
          "btn secondary small",
          "?id=" + encodeURIComponent(a.id),
        )
      : "") +
    (s === "completed"
      ? `<button class="btn secondary small" data-review="${esc(a.id)}">Leave a review</button>`
      : "")
  );
}
function renderApplications() {
  document.querySelector("#workspace-content").innerHTML = applications.length
    ? `<div class="row spread" style="margin-bottom:20px"><span class="small muted">${applications.length} community connection${applications.length === 1 ? "" : "s"}</span><button class="btn secondary small" data-mark-read>Mark updates as read</button></div><div class="stack">${applications.map((a) => `<article class="record"><div class="row spread"><h3 style="margin:0">${esc(a.jobTitle)}</h3>${statusTag(a.status)}</div><p style="margin-top:10px">${esc(a.company)} · ${a.workerUid === S.user.uid ? "Your application" : esc(a.workerName)}</p><time>${formatDate(a.updatedAt, true)}</time><details><summary>View introduction & details</summary><p>${esc(a.coverLetter || "No introduction added.")}</p><div class="row">${link("Job details", "jobs", "text-link", "?id=" + encodeURIComponent(a.jobId))}${a.employerUid === S.user.uid ? link("Worker profile", "workers", "text-link", "?id=" + encodeURIComponent(a.workerUid)) : ""}<button class="btn secondary small" data-shared-resume="${esc(a.id)}">View attached resume</button></div></details>${a.status === "hire_requested" ? '<div class="notice warn" style="margin:15px 0 0">This hire is waiting for admin approval. The worker’s profile must be approved before chat opens.</div>' : ""}<div class="row">${applicationActions(a)}</div></article>`).join("")}</div>`
    : empty(
        "Your next connection starts with a hello.",
        "Apply to a community job or invite a worker to one of your approved roles. Curated IT park applications can be tracked in Saved jobs.",
        link(
          "Find talent",
          S.member.role === "employer" ? "workers" : "jobs",
        ),
        "briefcase",
      );
}
let chatUnsubscribe = null,
  currentChat = null;
function renderMessages() {
  const open = applications.filter((a) =>
    ["approved", "completion_requested", "completed"].includes(a.status),
  );
  if (!open.length) {
    document.querySelector("#workspace-content").innerHTML = empty(
      "A conversation worth waiting for.",
      "Your private chat opens after a community hire is approved. Until then, follow the next step in your applications.",
      link("View applications", "applications"),
      "chat",
    );
    return;
  }
  const id = params.get("id");
  const selected = open.find((a) => a.id === id) || open[0];
  if (currentChat === selected.id && document.querySelector("#chat-log"))
    return;
  currentChat = selected.id;
  if (chatUnsubscribe) chatUnsubscribe();
  document.querySelector("#workspace-content").innerHTML =
    `<div class="chat-layout"><nav class="chat-threads" aria-label="Conversations">${open.map((a) => `<a class="thread ${a.id === selected.id ? "active" : ""}" href="${href("messages", "?id=" + encodeURIComponent(a.id))}"><strong>${esc(a.workerUid === S.user.uid ? a.company : a.workerName)}</strong><small>${esc(a.jobTitle)}</small></a>`).join("")}</nav><div class="chat-pane"><div class="chat-title">${esc(selected.jobTitle)}<div class="small muted" style="margin-top:6px">${esc(selected.workerUid === S.user.uid ? selected.company : selected.workerName)}</div></div><div class="chat-log" id="chat-log" role="log" aria-live="polite" aria-label="Messages">${loading("Loading conversation…")}</div><form class="chat-form" id="chat-form"><label class="hide" for="chat-text">Your message</label><textarea id="chat-text" name="text" maxlength="3000" required placeholder="Write a message…" aria-label="Your message"></textarea><button class="btn" type="submit">${icon("right")}<span>Send</span></button></form><div id="chat-error" class="small" role="status" style="padding:0 16px 8px;color:#b42318"></div></div></div>`;
  chatUnsubscribe = C.watchMessages(
    selected.id,
    (rows) => {
      const log = document.querySelector("#chat-log");
      if (!log) return;
      const atBottom = log.scrollHeight - log.scrollTop - log.clientHeight < 80;
      log.innerHTML = rows.length
        ? rows
            .map(
              (m) =>
                `<div class="bubble ${m.senderUid === S.user.uid ? "mine" : ""}">${esc(m.text)}<time>${m.createdAt ? formatDate(m.createdAt, true) : "Sending…"}</time></div>`,
            )
            .join("")
        : '<p class="small muted">Say hello and discuss the next steps for this role.</p>';
      if (atBottom || rows.length < 4) log.scrollTop = log.scrollHeight;
    },
    (e) => toast(C.failText(e)),
  );
  document.querySelector("#chat-form").onsubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget,
      text = form.elements.text.value.trim();
    if (!text) return;
    form.querySelector("button").disabled = true;
    try {
      await C.sendMessage(selected.id, text);
      form.reset();
      document.querySelector("#chat-error").textContent = "";
      document.querySelector("#chat-log").scrollTop =
        document.querySelector("#chat-log").scrollHeight;
    } catch (e) {
      document.querySelector("#chat-error").textContent = C.failText(e);
    } finally {
      form.querySelector("button").disabled = false;
    }
  };
}
let adminData = {};
async function renderAdmin() {
  if (!S.admin) {
    workspace(
      "Community review.",
      "This workspace is for authorised administrators.",
      empty(
        "You don’t have review access.",
        "Contact the InfoparkDaily team if you need administrator access.",
        link("Contact the team", "contact"),
        "shield",
      ),
    );
    return;
  }
  workspace(
    "Keep the community moving.",
    "Review new profiles, job posts and hire requests.",
    loading("Loading review queue…"),
  );
  const results = await Promise.all(
    ["jobs", "profiles", "applications", "private", "reviews"].map(
      async (k) => [k, await C.adminRecords(k)],
    ),
  );
  adminData = Object.fromEntries(results);
  renderAdminTab(params.get("tab") || "jobs");
}
function renderAdminTab(tab) {
  const all = adminData[tab] || adminData.jobs;
  document.querySelector("#workspace-content").innerHTML =
    `<div class="tabs">${[
      ["jobs", "Job posts"],
      ["profiles", "Worker profiles"],
      ["applications", "Hire requests"],
      ["private", "Members"],
      ["reviews", "Reviews"],
    ]
      .map(
        ([k, l]) =>
          `<button class="pill ${tab === k ? "active" : ""}" data-admin-tab="${k}">${l} <span class="small">${adminData[k].length}</span></button>`,
      )
      .join(
        "",
      )}</div><div class="row spread" style="margin-bottom:24px"><span class="small muted">${all.length} records · newest first</span><button class="btn secondary small" data-export="${tab}">${icon("download")}Export CSV</button></div><div class="stack">${
      all.length
        ? all
            .sort(
              (a, b) =>
                stamp(b.updatedAt || b.createdAt) -
                stamp(a.updatedAt || a.createdAt),
            )
            .map(
              (r) =>
                `<article class="record"><div class="row spread"><h3 style="margin:0">${esc((tab === "profiles" ? r.name : r.title) || r.name || r.jobTitle || r.authorName)}</h3>${r.status ? statusTag(r.status) : ""}</div><p style="margin-top:10px">${esc(r.company || r.location || r.email || r.text || "")}</p>${tab === "jobs" ? `<details><summary>Read job post</summary><p>${esc(r.description)}</p><p>${esc((r.requirements || []).join("\n"))}</p></details>` : tab === "profiles" ? `<details><summary>Read worker profile</summary><p>${esc(r.title)} · ${esc(r.location)}</p><p>${esc(r.about)}</p><p>${esc(r.skills.join(", "))}</p><button class="btn secondary small" data-admin-docs="${esc(r.uid)}">View private documents</button></details>` : tab === "applications" ? `<p>${esc(r.workerName)} → ${esc(r.company)}</p><p>${esc(r.coverLetter)}</p>` : tab === "private" ? `<p>${esc(r.role)} · ${esc(r.email)} · ${esc(r.phone || "No phone")}</p><button class="btn secondary small" data-admin-docs="${esc(r.id)}">View private documents</button>` : tab === "reviews" ? `<p>${r.rating}/5 · ${esc(r.text)}</p>` : ""}<div class="row">${["jobs", "profiles"].includes(tab) ? `<button class="btn small" data-moderate="${esc(r.id)}" data-kind="${tab}" data-status="approved" ${r.status === "approved" ? "disabled" : ""}>Approve</button><button class="btn secondary small" data-moderate="${esc(r.id)}" data-kind="${tab}" data-status="rejected">Request changes</button>${link("View details", tab === "jobs" ? "jobs" : "workers", "text-link", "?id=" + encodeURIComponent(r.id))}` : tab === "applications" && r.status === "hire_requested" ? `<button class="btn small" data-transition="${esc(r.id)}" data-status="approved">Approve hire & open chat</button><button class="btn secondary small" data-transition="${esc(r.id)}" data-status="declined">Decline hire</button>` : ""}</div></article>`,
            )
            .join("")
        : empty(
            "The queue is clear.",
            "New community submissions will appear here.",
            "",
            "shield",
          )
    }</div>`;
}
async function applyModal(id) {
  if (!guard()) return;
  const job = S.jobs.find((j) => j.id === id);
  if (!job) throw Error("This job is no longer available.");
  const p = await C.getRecord("profiles", S.user.uid);
  if (!p) {
    dialog(
      `<h2>Looking for work?</h2><p>This hub is for hiring teams. Browse openings on the public jobs board, or use Career Tools for your resume.</p><a class="btn" href="/jobs/">Browse jobs board</a> <a class="btn secondary" href="/resume-builder/">Career Tools</a>`,
    );
    return;
  }
  const docs = await C.documentList(),
    hasResume = docs.some((d) => d.id === "resume");
  const dlg = dialog(
    `<h2>Make your introduction.</h2><p>${esc(job.title)} · ${esc(job.company)}</p><form id="apply-form" class="stack">${area("Why are you a good fit?", "coverLetter", "", { required: true, max: 2500, placeholder: "Share a short introduction and the experience you bring." })}${hasResume ? check("Share a copy of my saved resume with this employer", "attachResume") : `<small class="muted">No saved resume. ${link("Upload one in your account", "account", "text-link")} or apply with your profile only.</small>`}<div class="notice">The employer will see your profile and this introduction. Your private phone number and other documents stay private.</div>${message()}<button class="btn" type="submit">Send application ${icon("right")}</button></form>`,
  );
  dlg.querySelector("form").onsubmit = (e) =>
    run(e, async (data) => {
      await C.apply(job, data.coverLetter.trim(), !!data.attachResume);
      dlg.close();
      toast("Application sent. Track it in My applications.");
    });
}
async function inviteModal(id) {
  if (!guard()) return;
  if (S.member.role !== "employer") {
    dialog(
      `<h2>Hiring for your team?</h2><p>Switch to an employer account and post a job before inviting a professional.</p>${link("Open account settings", "account")}`,
    );
    return;
  }
  const jobs = S.jobs.filter(
    (j) =>
      j.kind === "community" &&
      j.ownerUid === S.user.uid &&
      j.status === "approved",
  );
  if (!jobs.length) {
    dialog(
      `<h2>Give your invitation a purpose.</h2><p>You need an approved job post before inviting a worker. Add the role you’re hiring for first.</p>${link("Post a job", "post-job")}`,
    );
    return;
  }
  const w =
    S.workers.find((w) => w.uid === id) || (await C.getRecord("profiles", id));
  const dlg = dialog(
    `<h2>Invite ${esc(w.name.split(" ")[0])} to your role.</h2><form class="stack">${select(
      "Choose a job",
      "jobId",
      jobs.map((j) => [j.id, j.title]),
      jobs[0].id,
      null,
    )}${area("Your invitation", "text", "", { required: true, max: 2500, placeholder: "Introduce your team and explain why this role could be a good fit." })}${message()}<button class="btn" type="submit">Send invitation ${icon("right")}</button></form>`,
  );
  dlg.querySelector("form").onsubmit = (e) =>
    run(e, async (data) => {
      await C.invite(
        w,
        jobs.find((j) => j.id === data.jobId),
        data.text.trim(),
      );
      dlg.close();
      toast("Invitation sent. Follow it in Hiring & applications.");
    });
}
async function downloadFile(uid, slot, appId) {
  const data = await C.getDocument(uid, slot, appId);
  const url = URL.createObjectURL(data.blob),
    a = document.createElement("a");
  a.href = url;
  a.download = data.name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
export async function start(state, target) {
  S = state;
  main = target;
  C.watchAuth((user) =>
    authChanged(user).catch((e) => {
      console.error(e);
      toast(C.failText(e));
    }),
  );
  const initial = curatedJobs(window.JOBS || []);
  const publicError = () => {
    const results = document.querySelector("#directory-results");
    if (S.route === "workers" && results)
      results.innerHTML = empty(
        "The worker directory is temporarily unavailable.",
        "Please try again shortly. Your account and documents remain private.",
        '<button class="btn secondary" data-reload>Try again</button>',
        "users",
      );
  };
  C.watchPublic(
    "jobs",
    (jobs) => {
      S.jobs = [
        ...jobs.filter((j) => !j.closingDate || j.closingDate >= dateISO()),
        ...initial,
      ];
      if (S.route === "jobs" && !params.get("id")) updateDirectory(S, "jobs");
      document
        .querySelectorAll("[data-job-count]")
        .forEach((el) => (el.textContent = S.jobs.length));
      document
        .querySelectorAll("[data-company-count]")
        .forEach(
          (el) => (el.textContent = new Set(S.jobs.map((j) => j.company)).size),
        );
      if (S.route === "jobs" && params.get("id")) loadPublicDetail();
    },
    publicError,
  );
  C.watchPublic(
    "profiles",
    (workers) => {
      S.workers = workers;
      if (S.route === "workers" && !params.get("id"))
        updateDirectory(S, "workers");
      if (S.route === "") {
        const grid = document.querySelector("#home-worker-grid");
        if (grid) grid.innerHTML = workersHome(workers);
      }
      if (S.route === "workers" && params.get("id")) loadPublicDetail();
    },
    publicError,
  );
  if (params.get("id") && ["jobs", "workers"].includes(S.route))
    loadPublicDetail();
  document.addEventListener("click", async (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    try {
      if (b.hasAttribute("data-password")) {
        const input = b.previousElementSibling;
        input.type = input.type === "password" ? "text" : "password";
        b.setAttribute(
          "aria-label",
          input.type === "password" ? "Show password" : "Hide password",
        );
      }
      if (b.hasAttribute("data-reload")) location.reload();
      if (b.hasAttribute("data-logout")) {
        if (chatUnsubscribe) chatUnsubscribe();
        try {
          window.IPDAnalytics?.track?.("logout", { feature: "hiring_hub" });
          window.IPDAnalytics?.clearUserId?.();
        } catch (_e) {}
        await C.logOut();
        location.href = ROOT;
      }
      if (b.hasAttribute("data-google")) {
        if (S.route === "register") {
          const form = document.querySelector("#auth-form");
          if (!form.elements.consent.checked) {
            form.elements.consent.reportValidity();
            return;
          }
          sessionStorage.setItem(
            "ipd_market_signup",
            JSON.stringify({ role: form.elements.role.value }),
          );
        }
        b.disabled = true;
        try {
          await C.google();
          redirect();
        } finally {
          b.disabled = false;
        }
      }
      if (b.hasAttribute("data-resend")) {
        b.disabled = true;
        try {
          await C.resendVerification();
          toast("Email sent. Check Inbox, Spam, and Promotions.");
        } finally {
          b.disabled = false;
        }
      }
      if (b.hasAttribute("data-reset")) {
        const dlg = dialog(
          `<h2>Let’s get you back in.</h2><p>Enter your email. If an account exists, we’ll send a password reset link.</p><form class="stack">${field("Email address", "resetEmail", S.user?.email || document.querySelector("#email")?.value || "", { type: "email", required: true, max: 254 })}${message()}<button class="btn" type="submit">Send reset link</button></form>`,
        );
        dlg.querySelector("form").onsubmit = (e) =>
          run(e, async (data, form) => {
            await C.resetPassword(data.resetEmail);
            showMessage(
              form,
              "If this email has an account, a reset link is on its way. Check your inbox and spam folder.",
              true,
            );
          });
      }
      if (b.dataset.save) {
        if (!guard()) return;
        b.disabled = true;
        try {
          const job =
            S.jobs.find((j) => j.id === b.dataset.save) ||
            (await C.getRecord("jobs", b.dataset.save));
          const saved = await C.toggleSave(job);
          saved ? S.savedIds.add(job.id) : S.savedIds.delete(job.id);
          refreshSavedButtons();
          toast(
            saved ? "Saved to your opportunities." : "Removed from saved jobs.",
          );
        } finally {
          b.disabled = false;
        }
      }
      if (b.dataset.apply) await applyModal(b.dataset.apply);
      if (b.dataset.invite) await inviteModal(b.dataset.invite);
      if (b.dataset.document)
        await downloadFile(S.user.uid, b.dataset.document);
      if (b.dataset.removeDocument) {
        await C.removeDocument(b.dataset.removeDocument);
        await renderAccount();
        toast(
          "Document removed. Previously shared application copies are unchanged.",
        );
      }
      if (b.dataset.sharedResume) {
        try {
          await downloadFile("", "resume", b.dataset.sharedResume);
        } catch {
          toast("No resume was attached to this application.");
        }
      }
      if (b.dataset.unsave) {
        await C.toggleSave({ id: b.dataset.unsave });
        S.savedIds.delete(b.dataset.unsave);
        await renderSaved();
      }
      if (b.dataset.markApplied) {
        await C.markExternalApplied(b.dataset.markApplied);
        await renderSaved();
        toast("Marked as applied in your personal record.");
      }
      if (b.dataset.closeJob) {
        await C.closeJob(b.dataset.closeJob);
        toast("Job post closed.");
      }
      if (b.hasAttribute("data-mark-read")) {
        await C.markRead();
        S.member = await C.getMember();
        toast("Updates marked as read.");
      }
      if (b.dataset.transition) {
        const s = b.dataset.status;
        const titles = {
          hire_requested: "Request approval for this hire?",
          completed: "Mark this work as completed?",
          withdrawn: "Withdraw this application?",
          declined: "Decline this connection?",
          approved: "Approve this hire and open chat?",
        };
        if (titles[s]) {
          const dlg = dialog(
            `<h2>${titles[s]}</h2><p>${s === "completed" ? "Both parties will be able to leave a review after completion." : s === "approved" ? "The worker’s profile must be approved. Both parties will be able to send private messages." : "The updated status will be visible to both parties in their workspace."}</p><form class="stack">${message()}<button class="btn" type="submit">Confirm ${icon("check")}</button></form>`,
          );
          dlg.querySelector("form").onsubmit = (e) =>
            run(e, async () => {
              await C.transition(b.dataset.transition, s);
              dlg.close();
              if (S.route === "admin") await renderAdmin();
              toast("Connection updated.");
            });
        } else {
          await C.transition(b.dataset.transition, s);
          toast("Connection updated.");
        }
      }
      if (b.dataset.review) {
        const a = applications.find((a) => a.id === b.dataset.review);
        const dlg = dialog(
          `<h2>How was the experience?</h2><p>${esc(a.jobTitle)} · ${esc(a.company)}</p><form class="stack">${select(
            "Your rating",
            "rating",
            [
              ["5", "5 — Excellent"],
              ["4", "4 — Good"],
              ["3", "3 — Fair"],
              ["2", "2 — Poor"],
              ["1", "1 — Very poor"],
            ],
            "5",
            null,
          )}${area("Your review", "text", "", { required: true, max: 1000, placeholder: "Share useful, fair feedback about this completed work." })}<small class="muted">Your review and name will be public. One review is allowed per completed hire.</small>${message()}<button class="btn" type="submit">Publish review</button></form>`,
        );
        dlg.querySelector("form").onsubmit = (e) =>
          run(e, async (data) => {
            await C.review(a, Number(data.rating), data.text.trim());
            dlg.close();
            toast("Your review has been published.");
          });
      }
      if (b.dataset.adminTab) renderAdminTab(b.dataset.adminTab);
      if (b.dataset.moderate) {
        await C.moderate(b.dataset.kind, b.dataset.moderate, b.dataset.status);
        adminData[b.dataset.kind].find(
          (r) => r.id === b.dataset.moderate,
        ).status = b.dataset.status;
        renderAdminTab(b.dataset.kind);
        toast("Review decision saved.");
      }
      if (b.dataset.adminDocs) {
        const docs = await C.documentList(b.dataset.adminDocs);
        const dlg = dialog(
          `<h2>Private documents</h2><p>For authorised review only. Do not share these documents outside the review process.</p>${docs.length ? docs.map((d) => `<div class="file-row"><div><strong>${esc(d.name)}</strong><small>${Math.ceil(d.size / 1000)} KB · ${esc(d.id)}</small></div><button class="btn secondary small" data-admin-download="${esc(d.id)}" data-uid="${esc(b.dataset.adminDocs)}">Download</button></div>`).join("") : "<p>No documents uploaded.</p>"}`,
        );
      }
      if (b.dataset.adminDownload)
        await downloadFile(b.dataset.uid, b.dataset.adminDownload);
      if (b.dataset.export) {
        const rows = adminData[b.dataset.export] || [];
        const columns =
          b.dataset.export === "private"
            ? ["id", "name", "email", "phone", "company", "role"]
            : b.dataset.export === "profiles"
              ? ["id", "name", "title", "location", "sector", "status"]
              : b.dataset.export === "applications"
                ? ["id", "jobTitle", "company", "workerName", "status"]
                : b.dataset.export === "reviews"
                  ? ["id", "authorName", "recipientUid", "rating", "text"]
                  : ["id", "title", "company", "location", "sector", "status"];
        download(
          "infoparkdaily-" + b.dataset.export + "-" + dateISO() + ".csv",
          csv([columns, ...rows.map((r) => columns.map((c) => r[c] ?? ""))]),
          "text/csv;charset=utf-8",
        );
      }
    } catch (error) {
      console.error(error);
      toast(C.failText(error));
    }
  });
}
let detailVersion = 0;
async function loadPublicDetail() {
  const version = ++detailVersion,
    id = params.get("id");
  try {
    if (S.route === "jobs") {
      const j =
        S.jobs.find((j) => j.id === id) || (await C.getRecord("jobs", id));
      if (version !== detailVersion) return;
      main.innerHTML = j
        ? jobDetail(j, S)
        : empty(
            "This opportunity is unavailable.",
            "It may have closed or be waiting for review.",
            link("Explore other jobs", "jobs"),
          );
      if (j) document.title = j.title + " · " + j.company + " · InfoparkDaily";
    } else {
      const w =
        S.workers.find((w) => w.uid === id) ||
        (await C.getRecord("profiles", id));
      if (version !== detailVersion) return;
      if (!w) throw Error("Unavailable");
      const reviews = await C.reviewsFor(id);
      main.innerHTML = workerDetail(w, reviews);
      document.title = w.name + " · " + w.title + " · InfoparkDaily";
    }
  } catch {
    if (version === detailVersion)
      main.innerHTML = empty(
        S.route === "jobs"
          ? "This opportunity is unavailable."
          : "This profile is unavailable.",
        "It may be waiting for review. Sign in if this is your own submission.",
        link("Find talent", "workers") +
          " " +
          link("Sign in", "sign-in", "btn secondary"),
      );
  }
}
