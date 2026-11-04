import * as C from "./cloud.js";
import { renderPost, renderTrack, renderAlerts } from "./recruit.js";
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
  money,
  safeURL,
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
  const tab = (r, label) =>
    `<a class="au-tab ${(r === "register") === register ? "is-on" : ""}" href="${href(r, location.search)}">${label}</a>`;
  return `<div class="au">
  <section class="au-brand" aria-hidden="false">
    <div class="rx-glow" aria-hidden="true"></div>
    <a class="au-logo" href="${href("")}"><img src="/assets/logo-infoparkdaily.png" alt="" width="40" height="40"><span>InfoparkDaily<small>Recruit</small></span></a>
    <div class="au-copy">
      <p class="rx-pill"><span>Employers</span> Kerala’s community hiring platform</p>
      <h1>${register ? "Start hiring<br><em>in minutes.</em>" : "Welcome back,<br><em>hiring team.</em>"}</h1>
      <p>${register ? "Create a free employer account to post jobs and walk-in drives, track every post and manage hiring in one place." : "Your posts, walk-in drives and applications — all in one employer workspace."}</p>
      <ul class="au-points">
        <li>${icon("briefcase")}<span><strong>Jobs, walk-ins &amp; job alerts</strong><small>Post any hiring format in minutes</small></span></li>
        <li>${icon("shield")}<span><strong>Verified before it goes live</strong><small>Builds trust with candidates</small></span></li>
        <li>${icon("bell")}<span><strong>Reach 77K+ job seekers</strong><small>Jobs board, WhatsApp &amp; Instagram alerts</small></span></li>
      </ul>
    </div>
    <div class="au-mock" aria-hidden="true">
      <div class="au-mock-row"><span class="rx-chip rx-chip--walk">Walk-in</span><span class="rx-chip rx-chip--ok">Live</span></div>
      <strong>Junior QA Engineer</strong><small>Infopark Phase 1, Kochi</small>
      <ol class="rx-flow"><li class="on"><i></i>Submitted</li><li class="on"><i></i>Verified</li><li class="on"><i></i>Live</li></ol>
    </div>
  </section>
  <section class="au-main">
    <div class="au-box">
      <div class="au-tabs" role="tablist">${tab("sign-in", "Sign in")}${tab("register", "Create account")}</div>
      <h2>${register ? "Create your employer account" : "Sign in to your workspace"}</h2>
      <p class="au-sub">${register ? "Free for employers. Takes less than a minute." : "Use your work email or Google account."}</p>
      <button class="au-google" type="button" data-google><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24Z"/><path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1Z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9Z"/></svg>Continue with Google</button>
      <div class="au-or"><span>or with email</span></div>
      <form class="stack au-form" id="auth-form">
        ${register ? '<input type="hidden" name="role" value="employer">' + field("Your name", "name", "", { required: true, max: 100, extra: 'autocomplete="name"' }) + field("Company name", "company", "", { required: true, max: 120, extra: 'autocomplete="organization"' }) : ""}
        ${field("Work email", "email", "", { type: "email", required: true, max: 254, extra: 'autocomplete="email"' })}
        ${password()}
        ${register ? '<small class="muted">At least 10 characters. You’ll verify your email before posting.</small>' : `<div class="row spread au-row">${check("Remember me", "remember")}<button type="button" class="au-link" data-reset>Forgot password?</button></div>`}
        ${register ? `<label class="check"><input type="checkbox" name="consent" required><span>I agree to the <a class="accent" href="/terms/" target="_blank">Terms</a> and <a class="accent" href="/privacy/" target="_blank">Privacy Policy</a>.</span></label>` : ""}
        ${message()}
        <button class="btn wide au-submit" type="submit">${register ? "Create employer account" : "Sign in"} ${icon("right")}</button>
      </form>
      <a class="au-quick" href="${href("post")}"><span>${icon("plus")}</span><span><strong>Just one opening?</strong><small>Post without an account — no sign-in needed</small></span>${icon("right")}</a>
      <p class="au-foot">${icon("shield")} Secure sign-in by Google Firebase · Looking for a job? <a class="accent" href="/jobs/">Browse jobs</a></p>
    </div>
  </section>
</div>`;
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
    ? `${link("Post a job", "post-job", "btn secondary")}${link("My workspace", "dashboard", "btn")}`
    : `${link("Sign in", "sign-in", "btn quiet")}${link("Create account", "register")}`;
}
function workspace(title, text, body) {
  const links = [
    ["dashboard", "home", "Overview"],
    ["post-job", "plus", "Post a job"],
    ...(applications.length
      ? [
          ["applications", "briefcase", "Applications"],
          ["messages", "chat", "Messages"],
        ]
      : []),
    ["account", "settings", "Company & account"],
    ...(S.admin ? [["admin", "shield", "Review queue"]] : []),
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
    if (S.route === "sign-in") {
      main.innerHTML = authView(false);
      bindAuth();
      return;
    }
    if (S.route === "register") {
      main.innerHTML = authView(true);
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
    redirect();
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
    onboarding();
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
        ? "Your posts, reviews and applicants, at a glance."
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
  let job = {
    company: S.member.company,
    basis: "month",
    vacancies: 1,
    postType: params.get("type") === "walkin" ? "walkin" : "job",
  };
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
    `<form id="job-form" class="panel stack"><fieldset class="pt-choose"><legend>What are you posting?</legend><label class="pt-opt"><input type="radio" name="postType" value="job" ${job.postType !== "walkin" ? "checked" : ""}><span><strong>${icon("briefcase")} Regular job</strong><small>Candidates apply by email or on your careers page.</small></span></label><label class="pt-opt"><input type="radio" name="postType" value="walkin" ${job.postType === "walkin" ? "checked" : ""}><span><strong>${icon("pin")} Walk-in drive</strong><small>Candidates come to a venue on a set date and time.</small></span></label></fieldset><div class="form-grid">${field("Job title", "title", job.title, { required: true, max: 200, placeholder: "e.g. Customer support associate" })}${field("Company name", "company", job.company, { required: true, max: 150 })}${select("Category", "sector", SECTORS, job.sector, null)}${field("Location", "location", job.location, { required: true, max: 150, placeholder: "City, district or remote" })}${select("Employment type", "employmentType", ["Full-time", "Part-time", "Contract", "Internship", "Temporary", "Freelance"], job.employmentType || "Full-time", null)}${select("Work arrangement", "workMode", ["On-site", "Hybrid", "Remote"], job.workMode || "On-site", null)}${field("Experience required", "experience", job.experience, { max: 100, placeholder: "e.g. Freshers welcome or 2–4 years" })}${field("Number of openings", "vacancies", job.vacancies, { required: true, type: "number", extra: 'min="1" max="10000"' })}${field("Pay in ₹ (optional)", "pay", job.pay || "", { type: "number", extra: 'min="0" max="10000000" step="1"' })}${select("Pay basis", "basis", BASES, job.basis, null)}${field("Closing date", "closingDate", job.closingDate, { required: true, type: "date", extra: 'min="' + dateISO() + '"' })}<div class="field">${check("Mark as urgent hiring", "urgent", job.urgent)}</div><fieldset class="full pt-walkin" data-show-for="walkin"><legend>Walk-in details</legend><div class="form-grid">${field("Walk-in date", "walkDate", job.walkIn?.date, { type: "date", extra: 'min="' + dateISO() + '"' })}${field("Time", "walkTime", job.walkIn?.time, { max: 60, placeholder: "e.g. 10:00 am – 1:00 pm" })}<div class="full">${field("Venue address", "walkVenue", job.walkIn?.venue, { max: 300, placeholder: "Building, floor, park, city" })}</div>${field("Google Maps link (optional)", "walkMap", job.walkIn?.mapLink, { max: 500, type: "url", placeholder: "https://maps.app.goo.gl/…" })}${field("Documents to bring", "walkDocs", job.walkIn?.documents, { max: 500, placeholder: "Resume, ID proof, photos, certificates" })}</div></fieldset><fieldset class="full pt-apply" data-show-for="job"><legend>How should candidates apply?</legend><div class="form-grid">${select("Apply method", "applyMethod", [["email", "By email"], ["link", "Our careers page / ATS link"]], ["email", "link"].includes(job.applyMethod) ? job.applyMethod : "email", null)}${field("Apply link", "applyLink", job.applyLink, { max: 500, type: "url", placeholder: "https://careers.yourcompany.com/…" })}${field("Apply email", "applyEmail", job.applyEmail, { max: 200, type: "email", placeholder: "careers@yourcompany.com" })}</div></fieldset><div class="full">${area("About the role", "description", job.description, { required: true, max: 6000, placeholder: "Describe the work, responsibilities, team and what a typical day looks like." })}</div><div class="full">${area("Requirements (one per line)", "requirements", (job.requirements || []).join("\n"), { max: 3000, placeholder: "Add the qualifications and skills this role needs." })}</div><div class="full">${field("Skills (separate with commas)", "skills", (job.skills || []).join(", "), { max: 700 })}</div></div><div class="notice">Applications arrive in your workspace. Keep personal contact details out of the public description. Editing an approved post sends it back for review.</div>${message()}<button class="btn" type="submit">${edit ? "Resubmit job for review" : "Submit job for review"} ${icon("right")}</button></form>`,
  );
  const jobForm = document.querySelector("#job-form");
  const syncPostType = () => {
    const type = jobForm.querySelector('input[name="postType"]:checked')?.value || "job";
    jobForm.querySelectorAll("[data-show-for]").forEach((el) => (el.hidden = el.dataset.showFor !== type));
    const method = jobForm.querySelector('[name="applyMethod"]')?.value;
    const linkField = jobForm.querySelector('[name="applyLink"]')?.closest(".field");
    const mailField = jobForm.querySelector('[name="applyEmail"]')?.closest(".field");
    if (linkField) linkField.hidden = method !== "link";
    if (mailField) mailField.hidden = method !== "email";
  };
  jobForm.addEventListener("change", syncPostType);
  syncPostType();
  jobForm.onsubmit = (e) =>
    run(e, async (data) => {
      if (data.description.trim().length < 30)
        throw Error("Add at least 30 characters to describe the role.");
      const postType = data.postType === "walkin" ? "walkin" : "job";
      if (postType === "walkin" && (!data.walkDate || !String(data.walkVenue || "").trim()))
        throw Error("Add the walk-in date and venue.");
      const applyMethod = postType === "walkin" ? "walkin" : data.applyMethod || "email";
      if (applyMethod === "link" && !/^https?:\/\//i.test(String(data.applyLink || "").trim()))
        throw Error("Add your careers page or ATS link (starting with https://).");
      if (applyMethod === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.applyEmail || "").trim()))
        throw Error("Add a valid email address for applications.");
      const extra = { postType, applyMethod };
      if (applyMethod === "link") extra.applyLink = String(data.applyLink).trim().slice(0, 500);
      if (applyMethod === "email") extra.applyEmail = String(data.applyEmail).trim().slice(0, 200);
      if (postType === "walkin")
        extra.walkIn = {
          date: String(data.walkDate || "").slice(0, 10),
          time: String(data.walkTime || "").trim().slice(0, 60),
          venue: String(data.walkVenue || "").trim().slice(0, 300),
          mapLink: String(data.walkMap || "").trim().slice(0, 500),
          documents: String(data.walkDocs || "").trim().slice(0, 500),
        };
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
          ...extra,
        },
        edit,
      );
      location.href = href("dashboard", "?posted=1");
    });
}
function dashJobCard(j) {
  const walk = j.postType === "walkin";
  const steps = [
    ["Submitted", true],
    ["In review", j.status !== "pending" || true],
    [j.status === "rejected" ? "Changes needed" : j.status === "closed" ? "Closed" : "Live", j.status === "approved" || j.status === "closed" || j.status === "rejected"],
  ];
  return `<article class="dj-card dj-card--${esc(j.status)}">
    <div class="dj-top"><span class="rv-type rv-type--${walk ? "walkin" : j.postType === "alert" ? "alert" : "job"}">${walk ? "Walk-in drive" : j.postType === "alert" ? "Job alert" : "Job post"}</span>${statusTag(j.status)}</div>
    <h3>${esc(j.title)}</h3>
    <p class="dj-sub">${esc(j.company)} · ${esc(j.location)}${j.closingDate ? " · Closes " + esc(j.closingDate === "Rolling" ? "rolling" : formatDate(j.closingDate)) : ""}</p>
    <ol class="dj-steps">${steps.map(([l, on], i) => `<li class="${on && (i < 2 || j.status !== "pending") ? "is-on" : ""} ${i === 2 && j.status === "rejected" ? "is-warn" : ""}"><span>${i + 1}</span>${l}</li>`).join("")}</ol>
    ${j.status === "rejected" ? '<p class="dj-note">The review team asked for changes. Edit the post and resubmit.</p>' : j.status === "pending" ? '<p class="dj-note">Waiting for the InfoparkDaily team. Most posts are reviewed within one working day.</p>' : ""}
    <div class="row">${j.status === "approved" ? `<a class="btn small" href="/job/c-${encodeURIComponent(j.id)}/" target="_blank" rel="noopener">View live job</a>` : ""}${link("Edit", "post-job", "btn secondary small", "?edit=" + encodeURIComponent(j.id))}${j.status !== "closed" ? `<button class="btn quiet small" data-close-job="${esc(j.id)}">Close post</button>` : ""}</div>
  </article>`;
}
function renderDashboard() {
  const active = applications.filter(
    (a) => !["declined", "withdrawn", "completed"].includes(a.status),
  );
  const newUpdates = applications.filter(
    (a) => stamp(a.updatedAt) > stamp(S.member.lastReadAt),
  );
  const by = (st) => ownJobs.filter((j) => j.status === st).length;
  const isEmployer = S.member.role === "employer";
  const workerNotice = !isEmployer
    ? `<div class="notice warn">This hub is for hiring teams. Add your company in Account to continue as an employer, or browse jobs on the <a class="accent" href="/jobs/">public board</a>.</div>`
    : "";
  const sorted = ownJobs.slice().sort((a, b) => stamp(b.updatedAt || b.createdAt) - stamp(a.updatedAt || a.createdAt));
  document.querySelector("#workspace-content").innerHTML = `
    ${params.get("posted") ? '<div class="notice">Your post was submitted for review. You’ll see it go live here once approved — it then appears on the main InfoparkDaily jobs board.</div>' : ""}${workerNotice}
    <div class="dj-actions">
      <a class="dj-action dj-action--job" href="${href("post-job")}">${icon("briefcase")}<span><strong>Post a regular job</strong><small>Candidates apply online — on InfoparkDaily, your link or by email.</small></span>${icon("right")}</a>
      <a class="dj-action dj-action--walkin" href="${href("post-job", "?type=walkin")}">${icon("pin")}<span><strong>Post a walk-in drive</strong><small>Share a date, time, venue and documents to bring.</small></span>${icon("right")}</a>
    </div>
    <div class="dj-stats">
      <div><strong>${by("pending")}</strong><span>In review</span></div>
      <div><strong>${by("approved")}</strong><span>Live on the board</span></div>
      <div><strong>${by("rejected")}</strong><span>Need changes</span></div>
      <a href="${href("applications")}"><strong>${active.length}</strong><span>Active applications${newUpdates.length ? ` · ${newUpdates.length} new` : ""}</span></a>
    </div>
    <div class="dj-how">
      <p class="dj-how-title">How hiring works on InfoparkDaily</p>
      <ol><li><span>1</span>Post a job or walk-in</li><li><span>2</span>InfoparkDaily verifies it</li><li><span>3</span>It goes live on /jobs/</li><li><span>4</span>Candidates apply or walk in</li><li><span>5</span>Shortlist & hire</li></ol>
    </div>
    <div class="panel" style="margin-top:20px"><div class="row spread"><h2 style="margin:0">Your posts</h2>${link("New post " + icon("plus"), "post-job", "text-link")}</div>
      <div class="dj-list">${sorted.length ? sorted.map(dashJobCard).join("") : empty("Your next great hire starts here.", "Post a regular job or a walk-in drive. It goes live after a quick review.", link("Post a job", "post-job"))}</div>
    </div>
    <div class="panel" style="margin-top:20px"><div class="row spread"><h2 style="margin:0">Latest hiring activity</h2>${link("View all", "applications", "text-link")}</div><div class="stack" style="margin-top:20px">${
      applications.length
        ? applications
            .slice(0, 4)
            .map(
              (a) =>
                `<a class="record" href="${href("applications")}"><div class="row spread"><strong>${esc(a.jobTitle)}</strong>${statusTag(a.status)}</div><p style="margin:10px 0 0">${esc(a.company)} · ${formatDate(a.updatedAt, true)}</p></a>`,
            )
            .join("")
        : '<p class="small muted" style="margin:0">Applications, invitations and hire updates will appear here.</p>'
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
let adminFilter = "pending";
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
    "Review queue.",
    "Verify every job, walk-in drive and job alert before it goes live on InfoparkDaily.",
    loading("Loading review queue…"),
  );
  const kinds = ["requests", "jobs", "alerts", "profiles", "applications", "private", "reviews"];
  const results = await Promise.all(
    kinds.map(async (k) => {
      try {
        return [k, await C.adminRecords(k)];
      } catch (e) {
        console.warn("Could not load " + k, e);
        return [k, []];
      }
    }),
  );
  adminData = Object.fromEntries(results);
  renderAdminTab(params.get("tab") || "requests");
}
const reqDate = (v) => (v ? formatDate(v, true) : "");
const ext = (u, label) =>
  /^https?:\/\//i.test(u || "") ? `<a class="accent" href="${esc(safeURL(u))}" target="_blank" rel="noopener noreferrer">${esc(label || u)}</a>` : esc(u || "—");
function rvRow(label, value) {
  return value ? `<div><dt>${label}</dt><dd>${value}</dd></div>` : "";
}
function walkInBlock(w) {
  if (!w) return "";
  return `<div class="rv-walkin"><strong>${icon("pin")} Walk-in drive</strong><dl class="rv-grid">${rvRow("Date", esc(w.date))}${rvRow("Time", esc(w.time))}${rvRow("Venue", esc(w.venue))}${rvRow("Map", w.mapLink ? ext(w.mapLink, "Open map") : "")}${rvRow("Documents", esc(w.documents))}</dl></div>`;
}
function requestCard(r) {
  const pending = r.status === "pending";
  return `<article class="rv-card ${pending ? "is-pending" : ""}">
    <header class="rv-head"><div class="rv-badges"><span class="rv-type rv-type--${r.postType === "walkin" ? "walkin" : r.postType === "alert" ? "alert" : "job"}">${r.postType === "walkin" ? "Walk-in drive" : r.postType === "alert" ? "Job alert" : "Job post"}</span><span class="rv-src">No sign-in</span>${statusTag(r.status)}</div><span class="rv-id">${esc(r.id)} · ${reqDate(r.createdAt)}</span></header>
    <h3>${esc(r.title)}</h3>
    <p class="rv-sub">${esc(r.company)}${r.location ? " · " + esc(r.location) : ""}${r.park ? " · " + esc(r.park) : ""}</p>
    <dl class="rv-grid">
      ${rvRow("Contact", esc(r.contactName) + (r.designation ? ` <small>(${esc(r.designation)})</small>` : ""))}
      ${rvRow("Email", r.contactEmail ? `<a class="accent" href="mailto:${esc(r.contactEmail)}">${esc(r.contactEmail)}</a>` : "")}
      ${rvRow("Phone", r.contactPhone ? `<a class="accent" href="tel:${esc(r.contactPhone)}">${esc(r.contactPhone)}</a>` : "")}
      ${rvRow("Website", r.website ? ext(r.website) : "")}
      ${rvRow("LinkedIn", r.linkedin ? ext(r.linkedin, "Company page") : "")}
      ${rvRow("Experience", esc(r.experience))}
      ${rvRow("Openings", esc(r.vacancies))}
      ${rvRow("Type · mode", esc([r.employmentType, r.workMode].filter(Boolean).join(" · ")))}
      ${rvRow("Salary", esc(r.salary))}
      ${rvRow("Deadline", esc(r.closingDate))}
      ${rvRow("Apply via", esc([r.applyMethod, r.applyContact].filter(Boolean).join(": ")) + (r.applyLink ? " · " + ext(r.applyLink, "link") : ""))}
      ${rvRow("Skills", esc(r.skills))}
      ${rvRow("Other roles", esc(r.extraRoles))}
    </dl>
    ${r.postType === "walkin" ? walkInBlock(r.walkIn) : ""}
    <details class="rv-desc"><summary>Read job description</summary><p>${esc(r.description)}</p></details>
    ${r.adminNote ? `<p class="rv-note"><strong>Note sent:</strong> ${esc(r.adminNote)}</p>` : ""}
    ${
      pending
        ? `<div class="rv-verify"><p class="rv-verify-title">${icon("shield")} Verify before approving</p><label><input type="checkbox"> Company website and LinkedIn look real</label><label><input type="checkbox"> Email domain matches the company (not a random Gmail)</label><label><input type="checkbox"> Phone/HR contact confirmed</label><label><input type="checkbox"> No fees, deposits or suspicious pay promises</label></div>
           <label class="rv-note-field">Note to the employer <small>(shown on their tracking page — required for changes or rejection)</small><textarea data-req-note="${esc(r.id)}" rows="2" maxlength="1000" placeholder="e.g. Please add the official careers link and a clearer salary range."></textarea></label>
           <div class="rv-actions"><button class="btn small" data-req-action="approve" data-req-id="${esc(r.id)}">${icon("check")} Approve & publish</button><button class="btn secondary small" data-req-action="changes" data-req-id="${esc(r.id)}">Request changes</button><button class="btn quiet small" data-req-action="rejected" data-req-id="${esc(r.id)}">Reject</button></div>`
        : r.status === "approved" && r.jobId
          ? `<div class="rv-actions"><a class="btn secondary small" href="/job/c-${encodeURIComponent(r.jobId)}/" target="_blank" rel="noopener">View live job</a><button class="btn quiet small" data-moderate="${esc(r.jobId)}" data-kind="jobs" data-status="closed">Close job</button></div>`
          : `<div class="rv-actions"><button class="btn secondary small" data-req-action="reopen" data-req-id="${esc(r.id)}">Move back to pending</button></div>`
    }
  </article>`;
}
function adminJobCard(r) {
  const pending = r.status === "pending";
  return `<article class="rv-card ${pending ? "is-pending" : ""}">
    <header class="rv-head"><div class="rv-badges"><span class="rv-type rv-type--${r.postType === "walkin" ? "walkin" : r.postType === "alert" ? "alert" : "job"}">${r.postType === "walkin" ? "Walk-in drive" : r.postType === "alert" ? "Job alert" : "Job post"}</span><span class="rv-src">${r.kind === "request" ? "No sign-in" : "Employer account"}</span>${statusTag(r.status)}</div><span class="rv-id">${reqDate(r.updatedAt || r.createdAt)}</span></header>
    <h3>${esc(r.title)}</h3>
    <p class="rv-sub">${esc(r.company)} · ${esc(r.location)}</p>
    <dl class="rv-grid">${rvRow("Category", esc(r.sector))}${rvRow("Experience", esc(r.experience))}${rvRow("Openings", esc(r.vacancies))}${rvRow("Type · mode", esc([r.employmentType, r.workMode].join(" · ")))}${rvRow("Pay", r.payText ? esc(r.payText) : r.pay ? money(r.pay, r.basis) : "")}${rvRow("Closing", esc(r.closingDate))}${rvRow("Apply", esc(r.applyMethod === "link" ? "External link" : r.applyMethod === "email" ? "By email" : r.applyMethod === "walkin" ? "Walk-in" : "InfoparkDaily applications"))}${rvRow("Skills", esc((r.skills || []).join(", ")))}</dl>
    ${r.postType === "walkin" ? walkInBlock(r.walkIn) : ""}
    <details class="rv-desc"><summary>Read job post</summary><p>${esc(r.description)}</p>${(r.requirements || []).length ? `<ul>${r.requirements.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}</details>
    <div class="rv-actions">${pending || r.status === "rejected" ? `<button class="btn small" data-moderate="${esc(r.id)}" data-kind="jobs" data-status="approved">${icon("check")} Approve & publish</button>` : ""}${pending ? `<button class="btn secondary small" data-moderate="${esc(r.id)}" data-kind="jobs" data-status="rejected">Request changes</button>` : ""}${r.status === "approved" ? `<a class="btn secondary small" href="/job/c-${encodeURIComponent(r.id)}/" target="_blank" rel="noopener">View live job</a><button class="btn quiet small" data-moderate="${esc(r.id)}" data-kind="jobs" data-status="closed">Close job</button>` : ""}</div>
  </article>`;
}
function genericCard(tab, r) {
  return `<article class="record"><div class="row spread"><h3 style="margin:0">${esc((tab === "profiles" ? r.name : r.title) || r.name || r.jobTitle || r.authorName)}</h3>${r.status ? statusTag(r.status) : ""}</div><p style="margin-top:10px">${esc(r.company || r.location || r.email || r.text || "")}</p>${tab === "profiles" ? `<details><summary>Read worker profile</summary><p>${esc(r.title)} · ${esc(r.location)}</p><p>${esc(r.about)}</p><p>${esc((r.skills || []).join(", "))}</p><button class="btn secondary small" data-admin-docs="${esc(r.uid)}">View private documents</button></details>` : tab === "applications" ? `<p>${esc(r.workerName)} → ${esc(r.company)}</p><p>${esc(r.coverLetter)}</p>` : tab === "private" ? `<p>${esc(r.role)} · ${esc(r.email)} · ${esc(r.phone || "No phone")}</p><button class="btn secondary small" data-admin-docs="${esc(r.id)}">View private documents</button>` : tab === "reviews" ? `<p>${r.rating}/5 · ${esc(r.text)}</p>` : ""}<div class="row">${tab === "profiles" ? `<button class="btn small" data-moderate="${esc(r.id)}" data-kind="profiles" data-status="approved" ${r.status === "approved" ? "disabled" : ""}>Approve</button><button class="btn secondary small" data-moderate="${esc(r.id)}" data-kind="profiles" data-status="rejected">Request changes</button>${link("View details", "workers", "text-link", "?id=" + encodeURIComponent(r.id))}` : tab === "applications" && r.status === "hire_requested" ? `<button class="btn small" data-transition="${esc(r.id)}" data-status="approved">Approve hire & open chat</button><button class="btn secondary small" data-transition="${esc(r.id)}" data-status="declined">Decline hire</button>` : ""}</div></article>`;
}
function alertCard(r) {
  return `<article class="rv-card ${r.status === "active" ? "" : "is-muted"}"><header class="rv-head"><div class="rv-badges"><span class="rv-type rv-type--alert">${r.channel === "email" ? "Email" : "WhatsApp"}</span>${statusTag(r.status === "active" ? "approved" : r.status === "paused" ? "pending" : "closed")}</div><span class="rv-id">${reqDate(r.createdAt)}</span></header><h3>${esc(r.keywords || "All jobs")}</h3><p class="rv-sub">${esc(r.name || "Job seeker")} · ${r.channel === "email" ? `<a class="accent" href="mailto:${esc(r.contact)}">${esc(r.contact)}</a>` : `<a class="accent" href="https://wa.me/${esc(String(r.contact).replace(/\D/g, ""))}" target="_blank" rel="noopener noreferrer">${esc(r.contact)}</a>`}</p><dl class="rv-grid">${rvRow("Locations", esc((r.locations || []).join(", ") || "Any"))}${rvRow("Experience", esc(r.experience))}${rvRow("Send", esc((r.types || []).join(", ")))}</dl></article>`;
}
const isPending = (tab, r) =>
  tab === "applications" ? r.status === "hire_requested" : ["requests", "jobs", "profiles"].includes(tab) ? r.status === "pending" : true;
function renderAdminTab(tab) {
  if (!adminData[tab]) tab = "requests";
  const filterable = ["requests", "jobs", "profiles", "applications"].includes(tab);
  if (tab === "alerts") adminFilter = adminFilter;
  const rowsAll = (adminData[tab] || []).slice().sort((a, b) => stamp(b.updatedAt || b.createdAt) - stamp(a.updatedAt || a.createdAt));
  const rows = filterable && adminFilter === "pending" ? rowsAll.filter((r) => isPending(tab, r)) : rowsAll;
  const count = (k) => (adminData[k] || []).filter((r) => isPending(k, r)).length;
  const TABS = [
    ["requests", "No sign-in posts"],
    ["jobs", "Employer posts"],
    ["alerts", "Alert subscribers"],
    ["private", "Employer accounts"],
  ];
  const card = (r) => (tab === "requests" ? requestCard(r) : tab === "jobs" ? adminJobCard(r) : tab === "alerts" ? alertCard(r) : genericCard(tab, r));
  document.querySelector("#workspace-content").innerHTML = `
    <div class="rv-stats">
      <button class="rv-stat ${tab === "requests" ? "is-on" : ""}" data-admin-tab="requests"><strong>${count("requests")}</strong><span>No sign-in posts to verify</span></button>
      <button class="rv-stat ${tab === "jobs" ? "is-on" : ""}" data-admin-tab="jobs"><strong>${count("jobs")}</strong><span>Employer posts to review</span></button>
      <button class="rv-stat" data-admin-tab="jobs"><strong>${(adminData.jobs || []).filter((r) => r.status === "approved").length}</strong><span>Live on the jobs board</span></button>
      <button class="rv-stat ${tab === "alerts" ? "is-on" : ""}" data-admin-tab="alerts"><strong>${(adminData.alerts || []).filter((r) => r.status === "active").length}</strong><span>Active alert subscribers</span></button>
    </div>
    <div class="tabs">${TABS.map(([k, l]) => `<button class="pill ${tab === k ? "active" : ""}" data-admin-tab="${k}">${l} <span class="small">${(adminData[k] || []).length}</span></button>`).join("")}</div>
    <div class="row spread rv-toolbar">${filterable ? `<div class="rv-filter" role="group" aria-label="Filter"><button class="${adminFilter === "pending" ? "is-on" : ""}" data-admin-filter="pending">Needs action</button><button class="${adminFilter === "all" ? "is-on" : ""}" data-admin-filter="all">All</button></div>` : `<span class="small muted">${rowsAll.length} records</span>`}<button class="btn secondary small" data-export="${tab}">${icon("download")}Export CSV</button></div>
    <div class="stack">${rows.length ? rows.map(card).join("") : empty(filterable && adminFilter === "pending" ? "Nothing waiting — all caught up." : "No records yet.", filterable && adminFilter === "pending" ? "New submissions will appear here for review." : "", "", "shield")}</div>`;
  history.replaceState(null, "", location.pathname + "?tab=" + tab);
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
  if (S.route === "post") renderPost(main, C);
  if (S.route === "track") renderTrack(main, C);
  if (S.route === "alerts") renderAlerts(main, C);
  try {
    await C.completeGoogleRedirect();
  } catch (e) {
    toast(C.failText(e));
  }
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
        const form = document.querySelector("#auth-form");
        if (S.route === "register") {
          if (!form?.elements.consent?.checked) {
            form.elements.consent.reportValidity();
            return;
          }
          sessionStorage.setItem(
            "ipd_market_signup",
            JSON.stringify({
              role: "employer",
              name: form.elements.name?.value?.trim() || "",
              company: form.elements.company?.value?.trim() || "",
            }),
          );
        }
        b.disabled = true;
        try {
          const remember = !!form?.elements.remember?.checked;
          const user = await C.google(remember);
          if (!user) return;
        } catch (e) {
          if (form) showMessage(form, C.failText(e));
          else toast(C.failText(e));
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
      if (b.dataset.adminFilter) {
        adminFilter = b.dataset.adminFilter;
        renderAdminTab(new URLSearchParams(location.search).get("tab") || "requests");
      }
      if (b.dataset.reqAction) {
        const r = (adminData.requests || []).find((x) => x.id === b.dataset.reqId);
        if (!r) throw Error("This request is no longer available. Refresh the page.");
        const noteEl = document.querySelector(`[data-req-note="${CSS.escape(r.id)}"]`);
        const note = noteEl ? noteEl.value.trim() : "";
        const action = b.dataset.reqAction;
        b.disabled = true;
        if (action === "approve") {
          r.jobId = await C.publishRequest(r, note);
          r.status = "approved";
          r.adminNote = note;
          toast("Approved — the job is now live on the jobs board.");
        } else if (action === "reopen") {
          await C.reviewRequest(r.id, "pending", r.adminNote || "");
          r.status = "pending";
          toast("Moved back to pending.");
        } else {
          if (!note) {
            b.disabled = false;
            throw Error("Add a short note so the employer knows what to change.");
          }
          await C.reviewRequest(r.id, action, note);
          r.status = action;
          r.adminNote = note;
          toast(action === "changes" ? "Changes requested — the employer will see your note." : "Request rejected.");
        }
        renderAdminTab("requests");
      }
      if (b.dataset.moderate) {
        await C.moderate(b.dataset.kind, b.dataset.moderate, b.dataset.status);
        const rec = (adminData[b.dataset.kind] || []).find((r) => r.id === b.dataset.moderate);
        if (rec) rec.status = b.dataset.status;
        renderAdminTab(new URLSearchParams(location.search).get("tab") || b.dataset.kind);
        toast(b.dataset.status === "approved" ? "Approved — now live on the jobs board." : "Review decision saved.");
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
          b.dataset.export === "alerts"
            ? ["id", "name", "channel", "contact", "keywords", "locations", "experience", "types", "status"]
            : b.dataset.export === "requests"
            ? ["id", "postType", "title", "company", "contactName", "contactEmail", "contactPhone", "location", "status"]
            : b.dataset.export === "private"
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
