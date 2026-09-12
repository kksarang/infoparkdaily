import {
  blankResume,
  sampleResume,
  sections,
  arrayFields,
  validateResume,
} from "./schema.js";
import { renderResume, esc } from "./render.js";
import { publicTemplates } from "./catalog.js?v=20260911a";
import { request as cloudRequest } from "./cloud.bundle.js?v=20260910e";
const base = "/resume-builder/";
const main = document.getElementById("main");
const modal = document.getElementById("modal");
const params = new URLSearchParams(location.search);
const route = location.pathname.replace(base, "").split("/")[0];
const localHost = ["localhost", "127.0.0.1", "[::1]"].includes(
  location.hostname,
);
function useLocalApi() {
  if (!localHost) return false;
  if (params.get("local") === "1")
    sessionStorage.setItem("ipd_use_local_api", "1");
  if (params.get("local") === "0")
    sessionStorage.removeItem("ipd_use_local_api");
  return sessionStorage.getItem("ipd_use_local_api") === "1";
}
let templates = [],
  me = null,
  config = {},
  resume = null,
  activeSection = "personal",
  saveTimer,
  savePromise = null,
  dirty = false,
  generation = 0,
  previewGeneration = 0,
  previewURL = null,
  saveError = false,
  toastTimer,
  previewTimer,
  lastSaveStarted = 0;
let authDraft = { email: "", name: "" };
let authMode = "login",
  category = "All",
  access = "all",
  search = "";
const categories = [
  "All",
  "ATS-Friendly",
  "Professional",
  "Freshers",
  "Technology",
  "Creative",
  "Executive",
];
async function api(path, options = {}) {
  if (!useLocalApi()) {
    if (options.blob)
      throw Error(
        "Server PDF export is only available in the local preview.",
      );
    return cloudRequest(path, options);
  }
  let r;
  try {
    r = await fetch("/v1" + path, {
      credentials: "same-origin",
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
      body:
        options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  } catch {
    throw Error(
      "Cannot reach the local server. Your unsaved edits are still here. Try again when it is running.",
    );
  }
  let data;
  if (options.blob && r.ok) return r.blob();
  try {
    data = await r.json();
  } catch {
    throw Error(
      "The Resume Builder server is not running. Start the local preview with npm run dev.",
    );
  }
  if (!r.ok) {
    const e = Error(data.error || "Please try again.");
    e.status = r.status;
    throw e;
  }
  return data;
}
const post = (p, b = {}) => api(p, { method: "POST", body: b });
const pro = () =>
  !!me?.entitlements?.some(
    (e) =>
      e.feature === "template.premium" &&
      e.starts_at <= Date.now() &&
      e.expires_at > Date.now(),
  );
const date = (v) =>
  new Date(v).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
const PRO_WHATSAPP = "919497725429";
function proWhatsAppUrl(templateName) {
  const who = me?.name && me.name !== "Local preview" ? me.name : "";
  const message = [
    "Hello InfoparkDaily,",
    who ? `This is ${who}.` : "",
    templateName
      ? `I would like to use the Pro resume template “${templateName}”.`
      : "I would like Pro access to the premium resume templates.",
    "Please let me know how I can activate the Pro variants. Thank you.",
  ]
    .filter(Boolean)
    .join(" ");
  return `https://wa.me/${PRO_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
function proWhatsAppButton(label, templateName) {
  return `<a class="button" href="${esc(proWhatsAppUrl(templateName))}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
}
function toast(message) {
  const t = document.getElementById("toast");
  t.textContent = message;
  t.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("visible"), 6000);
}
function showDialog(title, html, wide = false) {
  modal.className = wide ? "template-dialog" : "";
  modal.innerHTML = `<div class="dialog-head"><h2>${esc(title)}</h2><button class="dialog-close" data-action="close" aria-label="Close dialog">×</button></div><div class="dialog-body">${html}</div>`;
  if (!modal.open) modal.showModal();
}
function closeDialog() {
  modal.close();
}
const button = (text, action, extra = "", kind = "secondary") =>
  `<button class="button small ${kind}" data-action="${action}" ${extra}>${text}</button>`;
function accountNav() {
  const nav = document.getElementById("account-nav");
  if (nav) {
    if (location.pathname.includes("/sign-in"))
      nav.innerHTML = `<a class="button small secondary" href="${base}">Home</a>`;
    else
      nav.innerHTML = me
        ? `<a class="button small secondary" href="${base}my-resumes/">My resumes</a>`
        : `<a class="button small secondary" href="${base}sign-in/">Sign in</a>`;
  }
  document.querySelectorAll(".topbar nav a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    const path = location.pathname;
    let on = false;
    if (href === "/ats-checker/") on = path.startsWith("/ats-checker");
    else if (href.includes("/templates")) on = path.includes("/templates");
    else if (href === "/jobs/") on = false;
    else if (href === "/resume-builder/")
      on =
        path.startsWith("/resume-builder") &&
        !path.includes("/templates") &&
        !path.includes("/sign-in");
    a.classList.toggle("active", on);
  });
}
function subnav() {
  return `<nav class="subnav" aria-label="Resume workspace">${[
    ["", "Home"],
    ["templates", "Templates"],
    ["my-resumes", "My resumes"],
    ["pricing", "Pricing"],
    ["account", "Account"],
  ]
    .map(([r, l]) => {
      const href = r ? `${base}${r}/` : base;
      const on = r ? route === r : !route;
      return `<a href="${href}" class="${on ? "active" : ""}">${l}</a>`;
    })
    .join("")}${me?.admin ? '<a href="/admin/resume-templates/">Templates admin</a><a href="/admin/members/">Members</a>' : ""}</nav>`;
}
function page(title, subtitle, body, action = "") {
  main.className = "page-bg";
  const kicker =
    {
      templates: "Resume designs",
      "my-resumes": "Your workspace",
      pricing: "Plans",
      account: "Your account",
      "payment-status": "Pro Pass",
    }[route] || (location.pathname.includes("/admin/") ? "Admin" : "Career Tools");
  main.innerHTML =
    subnav() +
    `<div class="rb-width page-head"><p class="ct-kicker">${kicker}</p><div class="section-heading"><div><h1>${esc(title)}</h1><p>${esc(subtitle)}</p></div>${action}</div></div><div class="rb-width">${body}</div>`;
}
function ensureAuth() {
  if (me) return true;
  const next = location.pathname + location.search;
  location.assign(base + "sign-in/?next=" + encodeURIComponent(next));
  return false;
}
function returnPath() {
  const next = params.get("next") || base + "my-resumes/";
  return next.startsWith(base) && !next.includes("\\")
    ? next
    : base + "my-resumes/";
}
function templateCard(t) {
  return `<article class="template-card"><button class="template-image" data-action="template-preview" data-id="${esc(t.id)}" aria-label="Preview ${esc(t.name)}"><span class="template-badge ${t.access === "premium" ? "premium" : ""}">${t.access === "premium" ? "✦ PRO" : "FREE"}</span><img src="${esc(t.thumbnail)}" alt="${esc(t.name)} resume design" loading="lazy" width="500" height="707"></button><div class="template-info"><div><h3>${esc(t.name)}</h3><p>${esc(t.category)}</p>${t.tags.includes("Studio collection") ? '<span class="studio-tag">NEW · Studio collection</span>' : ""}</div><button class="template-use" data-action="template-select" data-id="${esc(t.id)}" aria-label="Use ${esc(t.name)}">↗</button></div></article>`;
}
function landing() {
  const picks = ["harbor", "atelier", "spark"]
    .map((id) => templates.find((t) => t.id === id))
    .filter(Boolean);
  const target = document.getElementById("featured-templates");
  if (target) target.innerHTML = picks.map(templateCard).join("");
  const stack = document.getElementById("ct-hero-previews");
  if (stack && picks.length)
    stack.innerHTML = picks
      .map(
        (t, i) =>
          `<figure class="ct-sheet ct-sheet-${i}"><img src="${esc(t.thumbnail)}" alt=""></figure>`,
      )
      .join("");
  const count = templates.length,
    free = templates.filter((t) => t.access === "free").length;
  const tally = document.getElementById("template-count");
  if (tally)
    tally.textContent = `${count} designs · ${free} free. Change the layout anytime without rewriting.`;
}
function gallery() {
  page(
    "Templates",
    "Choose a starting point. You can change the design later without rewriting.",
    `<div class="filter-search"><input id="template-search" type="search" placeholder="Search templates…" aria-label="Search templates"><select id="access-filter" aria-label="Template access"><option value="all">Free & Pro</option><option value="free">Free only</option><option value="premium">Pro only</option></select></div><div class="filters"><div class="chips">${categories.map((c) => `<button class="chip ${c === category ? "active" : ""}" data-action="filter-category" data-category="${c}">${c}</button>`).join("")}</div></div><div id="gallery-count" class="count"></div><div id="gallery-results" class="template-grid" style="padding-bottom:50px"></div>`,
  );
  filterGallery();
  if (params.get("select"))
    void selectTemplate(params.get("select")).catch((e) => toast(e.message));
}
function filterGallery() {
  const filtered = templates.filter(
    (t) =>
      (category === "All" || t.category === category) &&
      (access === "all" || t.access === access) &&
      [t.name, t.category, ...t.tags]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  document.getElementById("gallery-count").textContent =
    `${filtered.length} templates · ${templates.filter((t) => t.access === "free").length} always free`;
  document.getElementById("gallery-results").innerHTML = filtered.length
    ? filtered.map(templateCard).join("")
    : '<div class="empty"><h2>No templates found</h2><p>Try another search or choose a different category.</p></div>';
}
function previewTemplate(id) {
  const t = templates.find((x) => x.id === id);
  if (!t) return;
  showDialog(
    t.name,
    `<p>${esc(t.category)} · ${t.access === "free" ? "Free, including PDF download" : "Included in the ₹99 Pro Pass"}</p><div style="background:#edf1f6;padding:20px;text-align:center;border-radius:8px;max-height:48vh;overflow:auto"><img src="${esc(t.thumbnail)}" alt="${esc(t.name)} sample resume" style="width:100%;max-width:350px"></div><p class="hint" style="margin-top:16px">Fictional sample content. Your resume will contain only the information you add.</p><button class="button" data-action="template-select" data-id="${esc(t.id)}" style="width:100%">${resume ? "Use this template" : "Create with this template"} ↗</button>`,
  );
}
async function selectTemplate(id) {
  const t = templates.find((x) => x.id === id);
  if (!t) return;
  if (!me) {
    location.assign(
      base +
        "sign-in/?next=" +
        encodeURIComponent(
          base +
            "templates/?select=" +
            id +
            (params.get("job")
              ? "&job=" + encodeURIComponent(params.get("job"))
              : ""),
        ),
    );
    return;
  }
  if (!useLocalApi() && !me.email_verified) {
    showDialog(
      "Verify your email first",
      `<p>We sent a verification link to <strong>${esc(me.email)}</strong>. Cloud saving starts after you verify.</p><div class="actions">${button("Resend email", "resend-verify")}${button("I’ve verified", "refresh-verify")}</div>`,
    );
    return;
  }
  if (t.access === "premium" && !pro()) {
    if (resume) await save();
    showDialog(
      "Make it yours with Pro",
      useLocalApi()
        ? `<p><strong>${esc(t.name)}</strong> is a Pro template. Get seven days of access to all ${templates.length} designs for ₹99.</p><p class="hint">Your existing content stays saved. Free templates include a clean PDF without a watermark.</p><div class="warning">Local test checkout · no money will be charged.</div><div class="actions">${button("Try the Pro Pass", "checkout", `data-template="${esc(id)}"`, "")}${button("Browse free templates", "browse-free")}</div>`
        : `<p><strong>${esc(t.name)}</strong> is a Pro template. Message InfoparkDaily on WhatsApp to request Pro access.</p><p class="hint">Your saved content stays with you. You can keep editing with a free template until Pro is activated.</p><div class="actions">${proWhatsAppButton("Message InfoparkDaily on WhatsApp", t.name)}${button("Browse free templates", "browse-free")}</div>`,
    );
    return;
  }
  if (resume) {
    await save();
    if (dirty)
      throw Error("Save your current edits before changing the template.");
    resume = await api("/resumes/" + resume.id, {
      method: "PATCH",
      body: { revision: resume.revision, template_id: id },
    });
    closeDialog();
    updateEditorTemplate();
    renderPreview();
    toast("Template changed. Your content stays the same.");
    return;
  }
  const data = blankResume();
  if (me.name !== "Local preview") data.personal.name = me.name;
  const r = await post("/resumes", {
    template_id: id,
    title: "My professional resume",
    data,
    job_id: params.get("job") || undefined,
  });
  location.assign(base + "editor/?id=" + r.id);
}
function auth() {
  document.body.classList.add("career-tools-auth");
  main.className = "auth-page";
  const signup = authMode === "signup";
  const waitingTemplate = params.get("next")?.includes("templates");
  const lead = me
    ? ""
    : signup
      ? "One account for your resumes. Pick up where you left off."
      : waitingTemplate
        ? "Your template is waiting. Sign in to start that resume."
        : "Sign in to save your work and keep your next application moving.";
  main.innerHTML = `<div class="auth-shell"><aside class="auth-story" aria-label="Your Career Tools workspace"><a class="auth-back" href="${base}">← Back to Career Tools</a><div><p class="auth-eyebrow">A LITTLE PREPARATION. A BIG NEXT STEP.</p><h2>Your next chapter<br>starts with you.</h2><p class="auth-story-lead">Give your experience a place to shine. We’ll help you put it on the page.</p><div class="auth-workspace-preview" aria-hidden="true"><div class="auth-preview-top"><span>YOUR WORKSPACE</span><span>✦</span></div><div class="auth-preview-document"><span class="auth-document-icon">≡</span><div><strong>My next opportunity</strong><small>A resume that tells your story</small></div></div><div class="auth-preview-progress"><i></i><i></i><i></i><i></i></div><span class="auth-preview-foot">Your experience. Your pace.</span></div><ul class="auth-benefits"><li>Save drafts and come back anytime</li><li>Switch templates without starting over</li><li>Keep your resumes in one place</li></ul></div><p class="auth-story-bottom">Built for your next move · InfoparkDaily</p></aside><section class="auth-card" aria-label="${me ? "Signed in" : signup ? "Create account" : "Sign in"}">
      ${
        me
          ? `<p class="ct-kicker">Signed in</p><h1>You’re in.</h1><p class="auth-lead">Continue as <strong>${esc(me.name)}</strong><br><span class="hint">${esc(me.email)}</span></p><a class="button auth-primary" href="${esc(returnPath())}">Open my resumes</a><button class="auth-switch" data-action="auth-signout">Use a different account</button>`
          : `<p class="ct-kicker">YOUR CAREER, ONE STEP FORWARD</p>
      <h1>${signup ? "Make it your workspace." : "Welcome back."}</h1>
      <p class="auth-lead">${lead}</p>
      <div class="auth-mode-tabs" role="group" aria-label="Account access">
        <button type="button" data-action="auth-mode" data-mode="login" aria-pressed="${!signup}" class="${!signup ? "active" : ""}">Sign in</button>
        <button type="button" data-action="auth-mode" data-mode="signup" aria-pressed="${signup}" class="${signup ? "active" : ""}">Create account</button>
      </div>
      <div id="auth-error" role="alert" tabindex="-1"></div>
      ${useLocalApi() ? "" : `<button type="button" class="button secondary auth-google" data-action="google-login"><span class="auth-google-mark" aria-hidden="true">G</span>Continue with Google</button><p class="auth-or">or continue with email</p>`}
      <form id="auth-form">
      ${signup ? `<div class="field"><label for="auth-name">Name</label><input id="auth-name" name="name" autocomplete="name" placeholder="Your name" required maxlength="100" value="${esc(authDraft.name)}"></div>` : ""}
      <div class="field"><label for="auth-email">Email</label><input id="auth-email" name="email" type="email" autocomplete="email" inputmode="email" spellcheck="false" placeholder="you@example.com" required maxlength="254" value="${esc(authDraft.email)}"></div>
      <div class="field"><label for="auth-password">Password</label><div class="password-field"><input id="auth-password" name="password" type="password" autocomplete="${signup ? "new-password" : "current-password"}" placeholder="${signup ? "At least 10 characters" : "Password"}" required minlength="10" maxlength="128" ${signup ? 'aria-describedby="password-help"' : ""}><button type="button" data-action="toggle-password" aria-label="Show password" aria-pressed="false">Show</button></div>${signup ? '<small id="password-help">Use at least 10 characters.</small>' : ""}</div>
      ${signup ? '<div class="field"><label for="auth-confirm">Confirm password</label><input id="auth-confirm" name="confirmPassword" type="password" autocomplete="new-password" required minlength="10" maxlength="128" placeholder="Enter it again"></div>' : ""}
      <div class="auth-form-options">${signup ? `<label class="check-label"><input type="checkbox" name="agree" value="yes" required><span>I agree to the <a href="/terms/#career-tools">Terms</a> and <a href="/privacy/#career-tools">Privacy Policy</a>.</span></label>` : `<label class="check-label"><input type="checkbox" name="remember" value="yes">Remember me</label>`}${!signup ? '<button type="button" class="auth-help-link" data-action="account-help">Need help?</button>' : ""}</div>
      <button class="button auth-primary" type="submit">${signup ? "Create account" : "Sign in"}</button>
      </form>`
      }
      ${
        useLocalApi()
          ? `<div class="auth-note"><span class="auth-local-tag">LOCAL</span><p>Accounts on this computer only — not Firebase.</p></div><details class="preview-tools"><summary>Owner preview</summary><p>Shared demo for product checks. Use your own account for drafts.</p><button type="button" class="button secondary small" data-action="local-login">Open demo workspace</button></details>`
          : `<p class="auth-note">By continuing, you agree to our <a href="/terms/#career-tools">Terms</a> and <a href="/privacy/#career-tools">Privacy Policy</a>.</p>`
      }
      <div class="auth-bottom-links"><a href="${base}templates/">Browse templates</a><a href="/ats-checker/">ATS checker</a><a href="/terms/#career-tools">Terms</a><a href="/privacy/">Privacy</a></div>
    </section></div>`;
}
function verifyBanner() {
  if (useLocalApi() || !me || me.email_verified) return "";
  return `<div class="warning" style="margin-bottom:22px">Verify ${esc(me.email)} to save resumes in the cloud. Check your inbox, then tap refresh.${button("Resend email", "resend-verify")}${button("I’ve verified", "refresh-verify")}</div>`;
}
async function dashboard() {
  if (!ensureAuth()) return;
  const resumes = await api("/resumes");
  page(
    `My resumes`,
    "Continue a draft or start a new one.",
    verifyBanner() +
    (resumes.length
      ? `<section class="continue-draft"><div class="continue-icon">▤</div><div><div class="eyebrow">PICK UP WHERE YOU LEFT OFF</div><h2>${esc(resumes[0].title)}</h2><p>${esc(sections[resumes[0].last_section]?.name || (resumes[0].last_section === "appearance" ? "Design & order" : "Personal details"))} · Last saved ${date(resumes[0].updated_at)}</p></div><a class="button" href="${base}editor/?id=${resumes[0].id}">Continue editing →</a></section><div class="dashboard-section-title"><h2>All your resumes</h2><span>${resumes.length} saved ${resumes.length === 1 ? "resume" : "resumes"}</span></div><div class="dashboard-grid">${resumes.map((r) => `<article class="resume-card"><div class="document-icon">▤</div><h2>${esc(r.title)}</h2><p>${esc(templates.find((t) => t.id === r.template_id)?.name || r.template_id)} · Updated ${date(r.updated_at)}</p>${r.job_id ? "<p>Created for a job application</p>" : ""}<div class="actions"><a class="button small" href="${base}editor/?id=${r.id}">Edit resume ↗</a>${button("Duplicate", "duplicate", `data-id="${r.id}"`)}${button("Rename", "rename", `data-id="${r.id}" data-title="${esc(r.title)}"`)}${button("Delete", "delete-resume", `data-id="${r.id}"`)}</div></article>`).join("")}</div>`
      : `<div class="empty" style="margin-bottom:60px"><div class="document-icon" style="margin:0 auto 20px">▤</div><h2>No saved resumes yet</h2><p>Start with a free template. Sign-in keeps drafts in your account.</p><a class="button" href="${base}templates/">Browse templates</a></div>`),
    `<a class="button" href="${base}templates/">＋ Create new resume</a>`,
  );
}
function pricing() {
  const free = templates.filter((t) => t.access === "free").length;
  page(
    "Pricing",
    "Free templates include PDF export. Pro is a 7-day pass — no subscription.",
    `<div class="pricing-grid"><section class="card price-card"><div class="eyebrow">Always free</div><h2>Free</h2><div class="price">₹0 <small>always</small></div><p>Everything you need for a clear, professional resume.</p><ul><li>${free} free templates</li><li>Save up to 20 resumes</li><li>Live editing and template switching</li><li>A4 PDF without a watermark</li><li>Free local ATS checker</li></ul><a class="button secondary" href="${base}templates/">Choose a free template</a></section><section class="card price-card pro"><div class="eyebrow">Seven-day pass</div><h2>Pro Pass</h2><div class="price">₹99 <small>/ 7 days</small></div><p>Unlock every published design when you need a stronger first page.</p><ul><li>All ${templates.length} published templates</li><li>Premium PDF downloads</li><li>Additional fonts and spacing</li><li>Everything included in Free</li><li>Your resumes stay after expiry</li></ul>${useLocalApi() ? `<button class="button" data-action="checkout">${pro() ? "Extend Pro by 7 days" : "Try Pro in local test mode"}</button>` : `${proWhatsAppButton("Message InfoparkDaily on WhatsApp")}<p class="hint" style="margin-top:12px">₹99 for 7 days. Send a WhatsApp message to 9497725429 and we’ll help you with Pro resume templates.</p>`}${pro() ? `<p class="hint" style="margin-top:12px">Current pass ends ${date(me.entitlements.find((e) => e.feature === "template.premium").expires_at)}.</p>` : ""}</section></div><div class="card" style="max-width:850px;margin:0 auto 50px"><h3 style="font-size:18px">A few things to know</h3><p style="font-size:14px">After your pass expires, you can still edit every resume and export it with a free template. PDFs you already downloaded are yours to keep. Downloads are limited to 30 per hour to keep the service reliable.</p><p class="hint">${useLocalApi() ? "This is a local preview. The ₹99 price is a proposed launch price. No real payments are collected here." : "Live Career Tools includes free templates, cloud-saved resumes, and WhatsApp requests for Pro templates."}</p></div>`,
  );
}
async function checkout(templateId) {
  if (!useLocalApi()) {
    const t = templates.find((x) => x.id === templateId);
    window.open(proWhatsAppUrl(t?.name), "_blank", "noopener,noreferrer");
    return;
  }
  if (!me) {
    location.assign(
      base + "sign-in/?next=" + encodeURIComponent(base + "pricing/"),
    );
    return;
  }
  if (resume) {
    await save();
    if (dirty) throw Error("Please save your resume before checkout.");
  }
  const next = resume
    ? base +
      "editor/?id=" +
      resume.id +
      (templateId ? "&select=" + templateId : "")
    : templateId
      ? base + "templates/?select=" + templateId
      : returnPath();
  let key = sessionStorage.getItem("ipd_resume_checkout_key");
  if (!key) {
    key = crypto.randomUUID();
    sessionStorage.setItem("ipd_resume_checkout_key", key);
  }
  const order = await post("/orders", { plan: "pro", idempotency_key: key });
  const status =
    base +
    "payment-status/?order=" +
    order.id +
    "&next=" +
    encodeURIComponent(next);
  if (config.payments === "razorpay_test" && order.gateway_id) {
    await new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve();
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      script.onerror = () =>
        reject(Error("Unable to open test checkout. Your order is saved."));
      document.head.append(script);
    });
    const checkout = new window.Razorpay({
      key: config.key_id,
      order_id: order.gateway_id,
      amount: order.amount,
      currency: "INR",
      name: "InfoparkDaily",
      description: "Pro Pass · 7 days · TEST",
      handler: async (result) => {
        try {
          await post("/orders/" + order.id + "/verify", result);
        } finally {
          location.assign(status);
        }
      },
      modal: { ondismiss: () => location.assign(status) },
    });
    checkout.open();
  } else location.assign(status);
}
async function paymentStatus() {
  if (!ensureAuth()) return;
  const id = params.get("order");
  if (!id) throw Error("No order was selected.");
  const order = await api("/orders/" + id);
  const success = order.status === "fulfilled";
  if (success || ["failed", "refunded"].includes(order.status))
    sessionStorage.removeItem("ipd_resume_checkout_key");
  const descriptions = {
    fulfilled:
      "Your seven-day Pro Pass is active. Your templates and PDF downloads are ready.",
    pending:
      "Confirmation is pending. Your order is saved; please check again before starting another checkout.",
    failed:
      "The test payment was not completed. Your resumes and edits are safe.",
    refunded:
      "The test payment was refunded and its Pro access has been removed.",
    review:
      "This payment needs review. Your free templates and saved resumes are still available.",
    created:
      "Choose a test outcome below to walk through checkout. No card details or money are needed.",
    creating: "Your order is being prepared.",
  };
  page(
    "Your Pro Pass",
    "A clear view of your payment and access.",
    `<section class="card status-card"><div class="status-symbol">${success ? "✓" : order.status === "failed" ? "×" : "◇"}</div><h2>${success ? "Ready for your next step." : order.status === "created" ? "Local test checkout" : order.status === "pending" ? "Waiting for confirmation" : order.status === "refunded" ? "Test refund complete" : order.status === "failed" ? "Payment not completed" : "Payment status"}</h2><p>${descriptions[order.status] || "Check again for the latest status."}</p><div class="purchase"><span>Pro Pass · 7 days</span><strong>₹99</strong></div><p class="hint" style="margin-top:15px">Reference: ${esc(order.id)}</p>${order.mode === "local" ? '<div class="warning">SIMULATION ONLY · No money is charged. These controls are only available in the local development server.</div>' : ""}<div class="actions" style="justify-content:center">${success ? `<a class="button" href="${esc(returnPath())}">Continue to my resume ↗</a>` : ""}${order.mode === "local" && !["fulfilled", "refunded", "review"].includes(order.status) ? `${button("Test successful payment", "simulate", `data-outcome="captured" data-id="${id}"`, "")}${button("Test pending", "simulate", `data-outcome="pending" data-id="${id}"`)}${button("Test failed payment", "simulate", `data-outcome="failed" data-id="${id}"`)}` : ""}${order.mode === "local" && success ? button("Test full refund", "simulate", `data-outcome="refunded" data-id="${id}"`) : ""}${button("Refresh status", "refresh-payment")}</div><p class="hint" style="margin-top:22px">Payment status is read from the server. Closing this page does not remove a completed pass.</p></section>`,
  );
}
async function account() {
  if (!ensureAuth()) return;
  const orders = await api("/orders");
  page(
    "Your account",
    "Your resumes, your access, your choice.",
    `<div class="account-layout"><section class="card"><h2>${esc(me.name)}</h2><p>${esc(me.email)}</p><p class="hint">${useLocalApi() ? "Local account · saved on this computer" : me.email_verified ? "Firebase account · saved in the cloud" : "Verify your email to enable cloud saving."}</p>${button("Sign out", "logout")}${useLocalApi() ? " " + button("Sign out on all devices", "logout-all") : ""}</section><section class="card"><h2>${pro() ? "Your Pro Pass is active" : "You’re on the Free plan"}</h2><p>${pro() ? "Access until " + date(me.entitlements.find((e) => e.feature === "template.premium").expires_at) : "Create, save and download resumes with our free templates."}</p><a class="button small secondary" href="${base}pricing/">View plans</a></section><section class="card"><h2>Purchase history</h2>${orders.length ? orders.map((o) => `<a class="purchase" href="${base}payment-status/?order=${o.id}"><span>Pro Pass · ₹99<small style="display:block;color:var(--muted);margin-top:5px">${date(o.created_at)} · ${esc(o.mode)}</small></span><strong>${esc(o.status)}</strong></a>`).join("") : "<p>No purchases yet.</p>"}</section><section class="card"><h2>Your data</h2><p>${useLocalApi() ? "Download your saved resumes as structured data, or delete this local account and its resumes." : "Download a copy of your cloud-saved resumes, or delete your account and its drafts."}</p><div class="actions">${useLocalApi() ? '<a class="button small secondary" href="/v1/me/data" download>Download my data</a>' : button("Download my data", "download-data")}${button(useLocalApi() ? "Delete local account" : "Delete account", "delete-account", "", "danger")}</div></section></div>`,
  );
}
function fieldLabel(key) {
  return (
    {
      name: "Full name",
      headline: "Professional title",
      email: "Email address",
      phone: "Phone number",
      linkedin: "LinkedIn",
      github: "GitHub",
      portfolio: "Portfolio website",
      role: "Job title / role",
      employer: "Company",
      institution: "Institution",
      qualification: "Qualification",
      field: "Field of study",
      grade: "Grade (optional)",
      start: "Start month",
      end: "End month",
      issued: "Issued month",
      expiry: "Expiry month",
      url: "Website / credential link",
      bullets: "Highlights",
      items: "Skills",
      technologies: "Technologies",
      label: "Group name",
      heading: "Section heading",
      title: "Title",
      details: "Details",
      proficiency: "Proficiency",
      location: "Location",
    }[key] || key
  );
}
function inputField(section, field, value, index) {
  const isList = arrayFields.includes(field),
    long = isList || field === "details" || section === "summary";
  const id = `field-${section}-${index ?? "single"}-${field}`;
  const dateField = ["start", "end", "issued", "expiry"].includes(field);
  const personal = section === "personal";
  const label =
    section === "summary"
      ? "Professional summary"
      : field === "name" && !personal
        ? "Name"
        : fieldLabel(field);
  const val = isList ? (value || []).join("\n") : value || "";
  const attr = `id="${id}" data-field="${field}" data-section="${section}" ${index !== undefined ? `data-index="${index}"` : ""}`;
  return `<div class="field ${["name", "headline", "email", "bullets", "details", "items", "technologies", "portfolio", "linkedin", "github", "summary"].includes(field) ? "full" : ""}"><label for="${id}">${label}</label>${long ? `<textarea ${attr} maxlength="${section === "summary" ? 5000 : 60000}" rows="${section === "summary" ? 8 : 4}" placeholder="${isList ? "One item per line" : ""}">${esc(val)}</textarea>` : `<input ${attr} value="${esc(val)}" ${dateField ? 'type="month"' : field === "email" ? 'type="email"' : 'type="text"'} maxlength="${personal ? 500 : 2000}" placeholder="${field === "headline" ? "e.g. Software Developer" : field === "location" ? "e.g. Kochi, Kerala" : ""}" ${personal ? `autocomplete="${field === "email" ? "email" : field === "phone" ? "tel" : field === "name" ? "name" : "off"}"` : ""}>`}${isList ? "<small>One item per line. Use only skills and achievements that are true for you.</small>" : field === "end" ? "<small>Leave empty if this is your current role or course.</small>" : ""}</div>`;
}
function sectionForm() {
  const panel = document.getElementById("edit-panel");
  const d = resume.data;
  if (activeSection === "appearance") {
    panel.innerHTML = `<h2>Make it yours.</h2><p>Presentation changes never remove your content.</p><div class="field"><label for="accent">Accent colour</label><select id="accent" data-appearance="accent">${["default", "navy", "blue", "teal", "charcoal", "burgundy"].map((v) => `<option value="${v}" ${d.appearance.accent === v ? "selected" : ""}>${v === "default" ? "Template default" : v[0].toUpperCase() + v.slice(1)}</option>`).join("")}</select></div><div class="field"><label for="font">Font ${pro() ? "" : "· Pro"}</label><select id="font" data-appearance="font" ${pro() ? "" : "disabled"}>${["default", "sans", "serif", "mono"].map((v) => `<option value="${v}" ${d.appearance.font === v ? "selected" : ""}>${v === "default" ? "Template default" : v}</option>`).join("")}</select></div><div class="field"><label for="density">Spacing ${pro() ? "" : "· Pro"}</label><select id="density" data-appearance="density" ${pro() ? "" : "disabled"}>${["standard", "compact", "relaxed"].map((v) => `<option value="${v}" ${d.appearance.density === v ? "selected" : ""}>${v}</option>`).join("")}</select></div><h3 style="font-size:16px;margin-top:30px">Section order & visibility</h3><div>${d.sectionOrder.map((s, i) => `<div class="admin-row"><span>${esc(sections[s]?.name || d.customSections.find((x) => x.id === s)?.heading || "Custom section")}</span><div style="display:flex;gap:3px"><button class="icon-button" data-action="section-up" data-index="${i}" aria-label="Move section up" ${i === 0 ? "disabled" : ""}>↑</button><button class="icon-button" data-action="section-down" data-index="${i}" aria-label="Move section down" ${i === d.sectionOrder.length - 1 ? "disabled" : ""}>↓</button><button class="icon-button" data-action="section-hide" data-id="${s}" aria-pressed="${d.hiddenSections.includes(s)}">${d.hiddenSections.includes(s) ? "Show" : "Hide"}</button></div></div>`).join("")}</div>`;
    return;
  }
  const section = sections[activeSection];
  panel.innerHTML = `<h2>${section.name}</h2><p>${activeSection === "personal" ? "A few details to help employers reach you." : activeSection === "summary" ? "A brief introduction to your experience and strengths." : "Add what matters for the opportunity you want."}</p>${activeSection === "personal" ? `<div class="field-grid">${section.fields.map((f) => inputField(activeSection, f, d.personal[f])).join("")}</div>` : activeSection === "summary" ? inputField("summary", "summary", d.summary) : `${d[activeSection].map((entry, i) => `<section class="entry-form"><div class="entry-form-top"><strong>${esc(activeSection === "customSections" ? entry.heading || "Custom section" : section.name.slice(0, 30))} ${i + 1}</strong><div><button class="icon-button" data-action="entry-up" data-index="${i}" aria-label="Move entry up" ${i === 0 ? "disabled" : ""}>↑</button><button class="icon-button" data-action="remove-entry" data-index="${i}" aria-label="Remove entry">×</button></div></div>${section.fields.map((f) => inputField(activeSection, f, entry[f], i)).join("")}</section>`).join("")}<button class="add-entry" data-action="add-entry">＋ Add ${activeSection === "customSections" ? "custom section" : section.name.toLowerCase()}</button>`}`;
}
function editor() {
  main.className = "editor-main";
  document.querySelector(".footer").style.display = "none";
  const t =
    templates.find((x) => x.id === resume.template_id) || resume.template;
  main.innerHTML = `${verifyBanner()}<div class="editor-toolbar"><div><input id="resume-title" aria-label="Resume title" value="${esc(resume.title)}" maxlength="120"><div id="save-status" class="save-status" role="status" aria-live="polite">Saved · ${date(resume.updated_at)}</div></div><div class="actions"><button class="button small secondary" data-action="sample">Use sample content</button><button class="button small secondary" data-action="change-template">Change template</button><button class="button small" id="export-button" data-action="export">${useLocalApi() ? "Download PDF ↓" : "Print / Save PDF"}</button></div></div><div class="mobile-editor-tabs"><button class="chip active" data-action="editor-edit">Edit details</button><button class="chip" data-action="editor-preview">Preview resume</button></div><div class="editor-layout" id="editor-layout"><aside class="section-nav" aria-label="Resume sections"><p>YOUR RESUME</p>${Object.entries(
    sections,
  )
    .map(
      ([k, s]) =>
        `<button data-action="edit-section" data-section="${k}" class="${k === activeSection ? "active" : ""}"><span class="num">${s.icon}</span>${s.name}</button>`,
    )
    .join(
      "",
    )}<button class="settings-button" data-action="edit-section" data-section="appearance"><span>◈</span>Design & order</button><a class="text-link" href="${base}my-resumes/" style="display:block;font-size:11px;margin:25px 10px">← All my resumes</a></aside><section class="edit-panel" id="edit-panel"></section><section class="preview-panel"><div class="preview-toolbar"><span id="preview-template-name">${esc(t?.name || resume.template_id)}</span><label style="margin:0;font-size:11px">Zoom <select id="preview-zoom" aria-label="Preview zoom"><option value="fit">Fit page</option><option value="0.7">70%</option><option value="1">100%</option></select></label></div><div class="preview-canvas" id="preview-canvas"></div><p class="preview-note">A4 · Text-based PDF · ${useLocalApi() ? "Final page breaks are applied on export" : "Use Print → Save as PDF for a text-based download"}</p></section></div><div class="editor-footer"><span>${resume.job_id ? "Job-linked draft · " + esc(resume.job_id) : "Your content stays yours. Only include accurate information."}</span><span>${useLocalApi() ? "Local preview · no real payments" : me?.email_verified ? "Saved to your InfoparkDaily account" : "Verify email to cloud-save"}</span></div>`;
  sectionForm();
  renderPreview();
  if (params.get("select"))
    void selectTemplate(params.get("select")).catch((e) => toast(e.message));
}
function updateEditorTemplate() {
  const t =
    templates.find((x) => x.id === resume.template_id) || resume.template;
  document.getElementById("preview-template-name").textContent =
    t?.name || resume.template_id;
}
function setStatus(text, error = false) {
  const el = document.getElementById("save-status");
  if (!el) return;
  el.textContent = text;
  el.style.color = error ? "#a33445" : "";
  if (error) {
    const retry = document.createElement("button");
    retry.className = "icon-button";
    retry.textContent = "Retry save";
    retry.dataset.action = "retry-save";
    retry.style.marginLeft = "8px";
    el.append(retry);
    if (saveError === 409) {
      const copy = document.createElement("button");
      copy.className = "icon-button";
      copy.textContent = "Keep as a copy";
      copy.dataset.action = "conflict-copy";
      el.append(copy);
    }
  }
}
function markDirty() {
  dirty = true;
  generation++;
  saveError = false;
  setStatus("Unsaved changes");
  clearTimeout(saveTimer);
  const delay = useLocalApi() ? 800 : 3000;
  const wait =
    !useLocalApi() && lastSaveStarted && Date.now() - lastSaveStarted < 15000
      ? Math.max(delay, 15000 - (Date.now() - lastSaveStarted))
      : delay;
  saveTimer = setTimeout(() => void save(), wait);
  renderPreview();
}
async function save() {
  clearTimeout(saveTimer);
  if (savePromise) {
    await savePromise;
    if (dirty && !saveError) return save();
    return;
  }
  if (!dirty) return;
  const version = generation;
  let data;
  try {
    data = structuredClone(validateResume(resume.data));
  } catch (e) {
    saveError = true;
    setStatus(e.message, true);
    return;
  }
  setStatus("Saving…");
  lastSaveStarted = Date.now();
  savePromise = (async () => {
    try {
      const saved = await api("/resumes/" + resume.id, {
        method: "PATCH",
        body: {
          revision: resume.revision,
          title: resume.title,
          data,
          last_section: resume.last_section || activeSection,
        },
      });
      resume.revision = saved.revision;
      resume.updated_at = saved.updated_at;
      if (generation === version) {
        dirty = false;
        saveError = false;
        setStatus("Saved · " + date(saved.updated_at));
      } else {
        setStatus("Unsaved changes");
        clearTimeout(saveTimer);
        saveTimer = setTimeout(() => void save(), 800);
      }
      if (
        templates.find((t) => t.id === resume.template_id)?.access === "premium"
      )
        renderPreview();
    } catch (e) {
      saveError = e.status || true;
      setStatus(e.message, true);
    }
  })();
  await savePromise;
  savePromise = null;
}
function fitPreview() {
  const wrap = document.getElementById("preview-canvas"),
    frame = wrap?.querySelector("iframe");
  if (!frame) return;
  const zoom = document.getElementById("preview-zoom").value;
  const scale =
    zoom === "fit" ? Math.min(1, wrap.clientWidth / 794) : Number(zoom);
  const height = Math.max(
    1123,
    frame.contentDocument?.body?.scrollHeight || 1123,
  );
  frame.style.width = "794px";
  frame.style.height = height + "px";
  frame.style.left = Math.max(0, (wrap.clientWidth - 794 * scale) / 2) + "px";
  frame.style.transform = `scale(${scale})`;
  wrap.style.height = height * scale + "px";
  wrap.style.overflow = zoom === "fit" ? "hidden" : "auto";
}
function renderPreview() {
  const wrap = document.getElementById("preview-canvas");
  if (!wrap || !resume) return;
  const t =
    templates.find((x) => x.id === resume.template_id) || resume.template;
  if (!t || t.status === "withdrawn") {
    wrap.innerHTML =
      '<div class="empty"><p>This template is archived or unavailable. Choose another template to preview your content.</p></div>';
    return;
  }
  if (t.access === "free" && t.config) {
    clearTimeout(previewTimer);
    let frame = wrap.querySelector("iframe");
    if (!frame) {
      wrap.innerHTML =
        '<iframe title="Live resume preview" sandbox="allow-same-origin"></iframe>';
      frame = wrap.querySelector("iframe");
      frame.onload = fitPreview;
    }
    frame.srcdoc = renderResume(resume.data, t.config);
    requestAnimationFrame(fitPreview);
    return;
  }
  if (!pro()) {
    wrap.innerHTML =
      '<div class="empty"><h2>Your content is safe.</h2><p>Switch to a free template or renew Pro to preview this design.</p><button class="button small" data-action="change-template">Choose a template</button></div>';
    return;
  }
  if (dirty) return;
  clearTimeout(previewTimer);
  const rev = ++previewGeneration;
  previewTimer = setTimeout(async () => {
    try {
      const blob = await api("/previews", {
        method: "POST",
        body: { resume_id: resume.id, revision: resume.revision },
        blob: true,
      });
      if (rev !== previewGeneration) return;
      if (previewURL) URL.revokeObjectURL(previewURL);
      previewURL = URL.createObjectURL(blob);
      wrap.style.height = "auto";
      wrap.innerHTML = `<img src="${previewURL}" alt="Your premium resume preview">`;
    } catch (e) {
      if (rev === previewGeneration) toast(e.message);
    }
  }, 500);
}
function printResumeHtml(html) {
  document.getElementById("resume-print-frame")?.remove();
  const frame = document.createElement("iframe");
  frame.id = "resume-print-frame";
  frame.title = "Print resume";
  frame.setAttribute("aria-hidden", "true");
  Object.assign(frame.style, {
    position: "fixed",
    right: "0",
    bottom: "0",
    width: "0",
    height: "0",
    border: "0",
  });
  document.body.appendChild(frame);
  const doc = frame.contentDocument;
  if (!doc || !frame.contentWindow)
    throw Error("Could not open the print view. Please try again.");
  doc.open();
  doc.write(html);
  doc.close();
  const win = frame.contentWindow;
  const cleanup = () => frame.remove();
  win.addEventListener("afterprint", cleanup);
  win.focus();
  win.print();
  setTimeout(cleanup, 120000);
}
function showPortfolioSuggestion() {
  if (document.getElementById("portfolio-after-export")) return;
  const footer = document.querySelector(".editor-footer");
  if (!footer) return;
  const note = document.createElement("p");
  note.id = "portfolio-after-export";
  note.className = "hint";
  note.style.cssText = "padding:16px 24px;margin:0";
  note.append("Give your projects a home. ");
  const link = document.createElement("a");
  link.href = "/portfolio/";
  link.textContent = "Explore portfolio websites personalised by our team →";
  link.style.textDecoration = "underline";
  note.append(link);
  footer.after(note);
}
async function downloadPDF() {
  const btn = document.getElementById("export-button");
  btn.disabled = true;
  const previous = btn.textContent;
  btn.textContent = useLocalApi() ? "Preparing PDF…" : "Opening print dialog…";
  try {
    if (!useLocalApi()) {
      const t =
        templates.find((x) => x.id === resume.template_id) || resume.template;
      if (!t?.config)
        throw Error("Choose a free template to export a PDF on the live site.");
      printResumeHtml(renderResume(resume.data, t.config));
      toast("In the print dialog, choose Save as PDF.");
      showPortfolioSuggestion();
      save().catch((e) => toast(e.message));
      return;
    }
    await save();
    if (dirty) throw Error("Please resolve the save issue before exporting.");
    const job = await post("/exports", {
      resume_id: resume.id,
      revision: resume.revision,
      idempotency_key: crypto.randomUUID(),
    });
    let result = job;
    for (let i = 0; i < 60; i++) {
      if (result.status === "ready") {
        const blob = await api("/exports/" + job.id + "/download", {
          blob: true,
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download =
          (resume.title.replace(/[^a-z0-9 _-]/gi, "").trim() || "resume") +
          ".pdf";
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 30000);
        toast("Your PDF is ready.");
        showPortfolioSuggestion();
        return;
      }
      if (result.status === "failed")
        throw Error(result.error || "Export failed. Please retry.");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      result = await api("/exports/" + job.id);
    }
    throw Error(
      "Your PDF is taking longer than expected. Please try again shortly.",
    );
  } finally {
    btn.disabled = false;
    btn.textContent = previous;
  }
}
let memberRows = [];
function memberTable(query = "") {
  const rows = memberRows.filter((m) =>
    (m.name + " " + m.email).toLowerCase().includes(query.toLowerCase()),
  );
  document.getElementById("member-rows").innerHTML = rows.length
    ? rows
        .map(
          (m) =>
            `<tr><td><strong>${esc(m.name)}</strong><small>${esc(m.email)}</small></td><td><span class="member-role">${m.admin ? "Administrator" : "Member"}</span></td><td>${m.resume_count}</td><td>${m.last_login_at ? date(m.last_login_at) : "—"}</td><td>${m.last_saved_at ? date(m.last_saved_at) : "No drafts yet"}</td></tr>`,
        )
        .join("")
    : '<tr><td colspan="5">No matching members.</td></tr>';
}
async function members() {
  if (!ensureAuth()) return;
  if (!me.admin) {
    page(
      "Administrator access required",
      "Member management is available only to administrators.",
      '<div class="empty"><a class="button" href="/resume-builder/my-resumes/">My workspace</a></div>',
    );
    return;
  }
  memberRows = await api("/admin/members");
  page(
    "Members",
    "A clear view of your local member accounts. Resume content stays private.",
    `<div class="filter-search"><input id="member-search" type="search" aria-label="Search members" placeholder="Search by name or email"></div><p class="count">${memberRows.length} local members · up to 200 most recent accounts</p><div class="member-table-wrap"><table class="member-table"><thead><tr><th>Member</th><th>Role</th><th>Resumes</th><th>Last sign-in</th><th>Last draft saved</th></tr></thead><tbody id="member-rows"></tbody></table></div><p class="hint" style="padding-bottom:30px">Local preview accounts only. Production account verification, disable/re-enable controls, and password-reset emails will be managed through Firebase Authentication.</p>`,
  );
  memberTable();
}
async function admin() {
  if (!ensureAuth()) return;
  if (!me.admin) {
    page(
      "Administrator access required",
      "This area is limited to template administrators.",
      '<div class="empty"><a class="button" href="/resume-builder/">Back to Career Tools</a></div>',
    );
    return;
  }
  const rows = await api("/admin/templates");
  page(
    "Template library",
    "Publish thoughtful designs. Keep every version.",
    `<div class="admin-grid"><section class="card"><h2 style="font-size:23px">Add or update a template</h2><p class="hint">Use an existing ID to create a new version. New layouts use the supported design families.</p><form id="template-admin-form"><div class="field"><label for="admin-id">Template ID</label><input id="admin-id" name="id" required pattern="[a-z0-9-]{3,60}" placeholder="my-professional-template"></div><div class="field"><label for="admin-name">Template name</label><input id="admin-name" name="name" required maxlength="120"></div><div class="field"><label for="admin-category">Category</label><select id="admin-category" name="category">${categories
      .slice(1)
      .map((x) => `<option>${x}</option>`)
      .join(
        "",
      )}</select></div><div class="field"><label for="admin-access">Access</label><select id="admin-access" name="access"><option value="free">Free</option><option value="premium">Premium</option></select></div><div class="field"><label for="admin-family">Layout family</label><select id="admin-family" name="family">${["classic", "compact", "centered", "editorial", "sidebar", "executive", "ribbon", "rail", "ledger", "folio", "masthead", "split"].map((x) => `<option>${x}</option>`).join("")}</select></div><div class="field"><label for="admin-style">Section treatment</label><select id="admin-style" name="style">${["plain", "label", "smallcaps", "rule", "timeline", "band", "airy"].map((x) => `<option>${x}</option>`).join("")}</select></div><div class="field"><label for="admin-accent">Accent</label><input id="admin-accent" name="accent" type="color" value="#17334d"></div><div class="field"><label for="admin-font">Font</label><select id="admin-font" name="font"><option value="sans">Sans serif</option><option value="serif">Serif</option><option value="mono">Monospace</option></select></div><div class="field"><label for="admin-tags">Tags</label><input id="admin-tags" name="tags" placeholder="Developer, IT, Fresher"></div><div class="field"><label for="admin-status">Status</label><select id="admin-status" name="status"><option value="draft">Draft</option><option value="published">Published</option></select></div><div id="admin-error"></div><button class="button" type="submit">Save template version</button><p class="hint" style="margin-top:15px">Published versions pass a sample PDF render. Sample previews are generated automatically from fictional data.</p></form></section><section class="card admin-list"><h2 style="font-size:23px">${rows.length} templates</h2>${rows.map((t) => `<div class="admin-row"><div><strong>${esc(t.name)}</strong><small>${esc(t.id)} · v${t.version} · ${t.access} · ${t.status}</small></div><div style="display:flex;gap:5px">${button("Edit", "admin-edit", `data-id="${t.id}"`)}${button("Archive", "archive-template", `data-id="${t.id}"`)}</div></div>`).join("")}</section></div>`,
  );
  window.rbAdminTemplates = rows;
}
async function act(el) {
  const action = el.dataset.action,
    id = el.dataset.id;
  switch (action) {
    case "close":
      closeDialog();
      break;
    case "template-preview":
      previewTemplate(id);
      break;
    case "template-select":
      await selectTemplate(id);
      break;
    case "filter-category":
      category = el.dataset.category;
      document
        .querySelectorAll('[data-action="filter-category"]')
        .forEach((b) =>
          b.classList.toggle("active", b.dataset.category === category),
        );
      filterGallery();
      break;
    case "browse-free":
      if (resume) {
        closeDialog();
        showDialog(
          "Choose a free template",
          `<div class="template-grid dialog-templates">${templates
            .filter((t) => t.access === "free")
            .map(templateCard)
            .join("")}</div>`,
          true,
        );
      } else {
        location.assign(base + "templates/?access=free");
      }
      break;
    case "auth-switch":
    case "auth-mode":
      authDraft.email =
        document.getElementById("auth-email")?.value || authDraft.email;
      authDraft.name =
        document.getElementById("auth-name")?.value || authDraft.name;
      authMode = el.dataset.mode || (authMode === "login" ? "signup" : "login");
      auth();
      break;
    case "toggle-password": {
      const password = document.getElementById("auth-password");
      const show = password.type === "password";
      password.type = show ? "text" : "password";
      el.textContent = show ? "Hide" : "Show";
      el.setAttribute("aria-label", show ? "Hide password" : "Show password");
      el.setAttribute("aria-pressed", String(show));
      break;
    }
    case "auth-signout":
      await post("/auth/logout");
      me = null;
      accountNav();
      auth();
      break;
    case "google-login": {
      const remember = document.querySelector('[name="remember"]')?.checked;
      await post("/auth/google", { remember: remember ? "yes" : "" });
      location.assign(returnPath());
      break;
    }
    case "resend-verify":
      await post("/auth/verify");
      toast("Verification email sent. Check your inbox and spam folder.");
      break;
    case "refresh-verify":
      me = await post("/auth/refresh");
      accountNav();
      if (me.email_verified) {
        closeDialog();
        toast("Email verified. Cloud saving is on.");
        if (route === "my-resumes") await dashboard();
        else if (route === "editor") editor();
        else if (route === "account") await account();
      } else toast("Not verified yet. Open the email link, then tap again.");
      break;
    case "download-data": {
      const payload = await api("/me/data");
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "infoparkdaily-career-tools-data.json";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      break;
    }
    case "account-help":
      showDialog(
        "Help with your account",
        useLocalApi()
          ? `<p>This preview uses accounts saved on this computer. Use the same email and password you used when creating the account.</p><p>Email password recovery is not connected in this local preview.</p><p>Your saved drafts are kept when you sign out. Signing into a different account shows that account’s own drafts.</p>${button("Back to sign in", "close")}`
          : `<p>Use Continue with Google, or the email and password you used to create this InfoparkDaily account.</p><form id="reset-form"><div class="field"><label for="reset-email">Email for a reset link</label><input id="reset-email" name="email" type="email" required maxlength="254" value="${esc(authDraft.email)}"></div><button class="button" type="submit">Send reset email</button></form><p class="hint">We send a generic confirmation so reset requests cannot be used to check whether an email has an account.</p>${button("Back to sign in", "close")}`,
      );
      break;
    case "logout-all":
      await post("/auth/logout-all");
      location.assign(base + "sign-in/");
      break;
    case "local-login":
      await post("/auth/local");
      location.assign(returnPath());
      break;
    case "logout":
      await post("/auth/logout");
      location.assign(base);
      break;
    case "duplicate":
      await post("/resumes/" + id + "/duplicate");
      toast("Resume duplicated.");
      await dashboard();
      break;
    case "rename":
      showDialog(
        "Rename resume",
        `<form id="rename-form" data-id="${id}"><div class="field"><label for="new-title">Resume title</label><input id="new-title" name="title" value="${esc(el.dataset.title)}" required maxlength="120"></div><button class="button" type="submit">Save title</button></form>`,
      );
      break;
    case "delete-resume":
      showDialog(
        "Delete this resume?",
        `<p>This removes the saved draft and its generated PDFs from this computer.</p><div class="actions">${button("Delete resume", "confirm-delete-resume", `data-id="${id}"`, "danger")}${button("Keep resume", "close")}</div>`,
      );
      break;
    case "confirm-delete-resume":
      await api("/resumes/" + id, { method: "DELETE", body: {} });
      closeDialog();
      await dashboard();
      toast("Resume deleted.");
      break;
    case "checkout":
      await checkout(el.dataset.template);
      break;
    case "simulate":
      await post("/orders/" + id + "/simulate", {
        outcome: el.dataset.outcome,
      });
      me = await api("/me");
      await paymentStatus();
      break;
    case "refresh-payment":
      me = await api("/me");
      await paymentStatus();
      break;
    case "delete-account":
      showDialog(
        "Delete this account?",
        `<p>${useLocalApi() ? "Your resumes and local test purchases will be permanently removed from this computer." : "Your Firebase account and cloud-saved resumes will be permanently deleted. This cannot be undone."}</p><form id="delete-account-form"><div class="field"><label for="delete-confirm">Type DELETE to confirm</label><input id="delete-confirm" name="confirm" required pattern="DELETE" autocomplete="off"></div><button class="button danger" type="submit">${useLocalApi() ? "Delete local account" : "Delete account"}</button></form>`,
      );
      break;
    case "edit-section":
      await save();
      activeSection = el.dataset.section;
      resume.last_section = activeSection;
      markDirty();
      document
        .querySelectorAll('[data-action="edit-section"]')
        .forEach((b) =>
          b.classList.toggle("active", b.dataset.section === activeSection),
        );
      sectionForm();
      break;
    case "add-entry": {
      const arr = resume.data[activeSection];
      if (arr.length >= (activeSection === "customSections" ? 10 : 20))
        throw Error("This section has reached its entry limit.");
      const entry = Object.fromEntries(
        sections[activeSection].fields.map((f) => [
          f,
          arrayFields.includes(f) ? [] : "",
        ]),
      );
      entry.id = crypto.randomUUID();
      arr.push(entry);
      if (activeSection === "customSections")
        resume.data.sectionOrder.push(entry.id);
      markDirty();
      sectionForm();
      break;
    }
    case "remove-entry": {
      const entry = resume.data[activeSection][Number(el.dataset.index)];
      if (
        Object.entries(entry).some(
          ([k, v]) =>
            k !== "id" &&
            (Array.isArray(v) ? v.some((x) => x.trim()) : String(v).trim()),
        )
      ) {
        showDialog(
          "Remove this entry?",
          `<p>This entry will be removed from your resume.</p>${button("Remove entry", "confirm-remove-entry", `data-index="${el.dataset.index}"`, "danger")} ${button("Keep entry", "close")}`,
        );
      } else removeEntry(Number(el.dataset.index));
      break;
    }
    case "confirm-remove-entry":
      removeEntry(Number(el.dataset.index));
      closeDialog();
      break;
    case "entry-up": {
      const i = Number(el.dataset.index),
        arr = resume.data[activeSection];
      if (i > 0) [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
      markDirty();
      sectionForm();
      break;
    }
    case "section-up":
    case "section-down": {
      const i = Number(el.dataset.index),
        arr = resume.data.sectionOrder,
        j = action === "section-up" ? i - 1 : i + 1;
      if (j >= 0 && j < arr.length) [arr[i], arr[j]] = [arr[j], arr[i]];
      markDirty();
      sectionForm();
      break;
    }
    case "section-hide": {
      const arr = resume.data.hiddenSections;
      resume.data.hiddenSections = arr.includes(id)
        ? arr.filter((x) => x !== id)
        : [...arr, id];
      markDirty();
      sectionForm();
      break;
    }
    case "retry-save":
      await save();
      break;
    case "conflict-copy": {
      const copy = await post("/resumes", {
        title: (resume.title + " (recovered copy)").slice(0, 120),
        template_id: pro() ? resume.template_id : "ats-essential",
        data: {
          ...resume.data,
          appearance: pro()
            ? resume.data.appearance
            : {
                ...resume.data.appearance,
                font: "default",
                density: "standard",
              },
        },
      });
      dirty = false;
      location.assign(base + "editor/?id=" + copy.id);
      break;
    }
    case "sample":
      showDialog(
        "Try the sample content?",
        `<p>This replaces the content in this draft with a fictional example. You can create another draft to keep your current work.</p><div class="actions">${button("Use fictional sample", "confirm-sample", "", "")}${button("Keep my content", "close")}</div>`,
      );
      break;
    case "confirm-sample":
      resume.data = sampleResume();
      markDirty();
      sectionForm();
      closeDialog();
      toast(
        "Fictional sample added. Replace it with your own experience before applying.",
      );
      break;
    case "change-template":
      await save();
      showDialog(
        "A new look. The same story.",
        `<p>Choose another template without re-entering your information.</p><div class="template-grid dialog-templates">${templates.map(templateCard).join("")}</div>`,
        true,
      );
      break;
    case "export":
      await downloadPDF();
      break;
    case "editor-edit":
    case "editor-preview":
      document
        .getElementById("editor-layout")
        .classList.toggle("show-preview", action === "editor-preview");
      document
        .querySelectorAll(".mobile-editor-tabs .chip")
        .forEach((b) =>
          b.classList.toggle("active", b.dataset.action === action),
        );
      renderPreview();
      break;
    case "archive-template":
      await api("/admin/templates/" + id, {
        method: "PATCH",
        body: { status: "archived" },
      });
      await admin();
      toast("Template archived. Existing resumes retain their version.");
      break;
    case "admin-edit": {
      const t = window.rbAdminTemplates.find((x) => x.id === id),
        f = document.getElementById("template-admin-form");
      for (const [k, v] of Object.entries({
        id: t.id,
        name: t.name,
        category: t.category,
        access: t.access,
        family: t.config.family,
        style: t.config.style,
        accent: t.config.accent,
        font: t.config.font,
        tags: t.tags.join(", "),
        status: t.status === "published" ? "published" : "draft",
      }))
        f.elements[k].value = v;
      f.dataset.original = JSON.stringify(t.config);
      document.getElementById("admin-id").focus();
      break;
    }
  }
}
function removeEntry(i) {
  const [entry] = resume.data[activeSection].splice(i, 1);
  if (activeSection === "customSections") {
    resume.data.sectionOrder = resume.data.sectionOrder.filter(
      (s) => s !== entry.id,
    );
    resume.data.hiddenSections = resume.data.hiddenSections.filter(
      (s) => s !== entry.id,
    );
  }
  markDirty();
  sectionForm();
}
document.addEventListener("click", (event) => {
  const el = event.target.closest("[data-action]");
  if (!el || el.disabled) return;
  event.preventDefault();
  const disable = [
    "google-login",
    "local-login",
    "checkout",
    "template-select",
    "duplicate",
    "confirm-delete-resume",
    "simulate",
    "archive-template",
  ].includes(el.dataset.action);
  if (disable) el.disabled = true;
  void act(el)
    .catch((e) => toast(e.message))
    .finally(() => {
      if (disable) el.disabled = false;
    });
});
document.addEventListener("input", (event) => {
  const el = event.target;
  if (el.id === "member-search") {
    memberTable(el.value);
    return;
  }
  if (el.id === "template-search") {
    search = el.value;
    filterGallery();
    return;
  }
  if (!resume) return;
  if (el.id === "resume-title") {
    resume.title = el.value;
    markDirty();
    return;
  }
  if (el.dataset.field) {
    const { section, field, index } = el.dataset;
    let value = arrayFields.includes(field) ? el.value.split("\n") : el.value;
    if (section === "personal") resume.data.personal[field] = value;
    else if (section === "summary") resume.data.summary = value;
    else resume.data[section][Number(index)][field] = value;
    markDirty();
  }
});
document.addEventListener("change", (event) => {
  const el = event.target;
  if (el.id === "access-filter") {
    access = el.value;
    filterGallery();
  }
  if (el.id === "preview-zoom") fitPreview();
  if (el.dataset.appearance && resume) {
    resume.data.appearance[el.dataset.appearance] = el.value;
    markDirty();
  }
});
document.addEventListener("submit", async (event) => {
  const form = event.target;
  if (
    ![
      "auth-form",
      "rename-form",
      "delete-account-form",
      "template-admin-form",
      "reset-form",
    ].includes(form.id)
  )
    return;
  event.preventDefault();
  const submit = form.querySelector('[type="submit"]');
  submit.disabled = true;
  try {
    const fields = Object.fromEntries(new FormData(form));
    if (form.id === "reset-form") {
      await post("/auth/reset", { email: fields.email });
      closeDialog();
      toast("If an account exists for that email, a reset link is on its way.");
    }
    if (form.id === "auth-form") {
      if (authMode === "signup" && fields.password !== fields.confirmPassword)
        throw Error(
          "Your passwords do not match. Enter the same password in both fields.",
        );
      await post("/auth/" + authMode, {
        ...fields,
        remember: fields.remember === "yes",
      });
      location.assign(returnPath());
    }
    if (form.id === "rename-form") {
      const r = await api("/resumes/" + form.dataset.id);
      await api("/resumes/" + r.id, {
        method: "PATCH",
        body: { revision: r.revision, title: fields.title },
      });
      closeDialog();
      await dashboard();
    }
    if (form.id === "delete-account-form") {
      await api("/me", { method: "DELETE", body: fields });
      location.assign(base);
    }
    if (form.id === "template-admin-form") {
      const original = form.dataset.original
        ? JSON.parse(form.dataset.original)
        : {};
      const c = {
        family: fields.family,
        style: fields.style,
        accent: fields.accent,
        font: fields.font,
        spacing: original.spacing || 18,
        nameSize: original.nameSize || 34,
        tracking: original.tracking || 1,
        heading: original.heading || "caps",
        rule: original.rule || "line",
        sideWidth: original.sideWidth || 29,
      };
      await post("/admin/templates", { ...fields, config: c });
      templates = await api("/templates");
      await admin();
      toast("Template version saved.");
    }
  } catch (e) {
    const box = document.getElementById(
      form.id === "auth-form"
        ? "auth-error"
        : form.id === "template-admin-form"
          ? "admin-error"
          : "nonexistent",
    );
    if (box) {
      box.className = "error";
      box.textContent = e.message;
      box.focus();
    } else toast(e.message);
  } finally {
    submit.disabled = false;
  }
});
window.addEventListener("beforeunload", (event) => {
  if (dirty) {
    event.preventDefault();
    event.returnValue = "";
  }
});
window.addEventListener("resize", fitPreview);
window.addEventListener("online", () => {
  if (dirty) void save();
});
async function boot() {
  try {
    const notice = document.querySelector(".local-notice");
    if (notice) {
      if (useLocalApi()) {
        notice.hidden = false;
        notice.classList.add("is-local");
        notice.innerHTML =
          "LOCAL PREVIEW <span>Accounts on this computer. Add ?local=0 to use Firebase.</span>";
      } else {
        notice.hidden = true;
        notice.classList.remove("is-local");
      }
    }
    if ("serviceWorker" in navigator)
      void navigator.serviceWorker.getRegistration("/").then((registration) => {
        registration?.update().catch(() => {});
      });
    if (useLocalApi()) {
      [templates, config, me] = await Promise.all([
        api("/templates"),
        api("/config"),
        api("/me").catch((e) => {
          if (e.status === 401) return null;
          throw e;
        }),
      ]);
    } else {
      templates = publicTemplates();
      config = { payments: "unavailable", cloud: true, key_id: null };
      me = await api("/me").catch((e) => {
        if (e.status === 401) return null;
        throw e;
      });
    }
    templates.sort((a, b) => {
      const rank = (t) =>
        t.tags.includes("Gallery collection")
          ? 2
          : t.tags.includes("Studio collection")
            ? 1
            : 0;
      return rank(b) - rank(a);
    });
    accountNav();
    if (params.get("access") === "free") access = "free";
    if (location.pathname.startsWith("/admin/members/")) return members();
    if (location.pathname.startsWith("/admin/resume-templates/"))
      return admin();
    switch (route) {
      case "templates":
        gallery();
        if (access === "free") {
          document.getElementById("access-filter").value = "free";
          filterGallery();
        }
        break;
      case "sign-in":
        auth();
        break;
      case "my-resumes":
        await dashboard();
        break;
      case "pricing":
        pricing();
        break;
      case "payment-status":
        await paymentStatus();
        break;
      case "account":
        await account();
        break;
      case "editor":
        if (!ensureAuth()) return;
        resume = await api(
          "/resumes/" + encodeURIComponent(params.get("id") || ""),
        );
        activeSection = [...Object.keys(sections), "appearance"].includes(
          resume.last_section,
        )
          ? resume.last_section
          : "personal";
        editor();
        break;
      default:
        landing();
    }
  } catch (e) {
    main.className = "page-bg";
    main.innerHTML = `<div class="rb-width section"><div class="empty"><h1>Let’s get you back on track.</h1><p>${esc(e.message)}</p><a class="button" href="${base}">Back to Career Tools</a></div></div>`;
  }
}
void boot();

