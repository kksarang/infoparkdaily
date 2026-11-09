/* Daily Web Studio sign-in page (/studio/sign-in/).
 * Same InfoparkDaily account as the rest of the site; Studio's own look.
 * Views: signin · signup · forgot · sent (reset email) · verify (new account) · signedin.
 */
const CLOUD = "/js/studio/cloud.bundle.js?v=20261109ss";
const $ = (s, r = document) => r.querySelector(s);
const root = $("#si-app");
const params = new URLSearchParams(location.search);

/** Only return people to Studio pages. */
function nextPath() {
  const n = params.get("next") || "";
  if (!n.startsWith("/studio/") || n.startsWith("//") || /[\\\s]|:\/\/|\.\./.test(n) || n.startsWith("/studio/sign-in")) return "/studio/app/";
  return n;
}

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const GOOGLE =
  '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24Z"/><path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1Z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A11.9 11.9 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9Z"/></svg>';
const EYE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
const MAIL = '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/></svg>';

let cloud = null;
let view = params.get("mode") === "signup" ? "signup" : "signin";
let email = "";
let busy = false;

function field(name, label, type, attrs = "") {
  const pw = type === "password";
  return `<label class="si-field"><span>${label}</span><span class="si-input">
    <input name="${name}" type="${type}" ${attrs}>${pw ? `<button type="button" class="si-eye" data-eye aria-label="Show password" aria-pressed="false">${EYE}</button>` : ""}
  </span></label>`;
}

function render(user) {
  let html = "";
  const tabs = `<div class="si-tabs" role="tablist" aria-label="Account">
      <button type="button" role="tab" aria-selected="${view === "signin"}" data-view="signin">Sign in</button>
      <button type="button" role="tab" aria-selected="${view === "signup"}" data-view="signup">Create account</button>
    </div>`;
  const google = `<button type="button" class="si-google" data-google>${GOOGLE}<span>Continue with Google</span></button>
    <p class="si-or"><span>or use your email</span></p>`;
  if (user && !(user.password && !user.verified)) view = "signedin";
  else if (user && user.password && !user.verified && view !== "verify") view = "verify";

  if (view === "signin")
    html = `<h1>Welcome back</h1><p class="si-lead">Sign in to open your sites on any device.</p>${tabs}${google}
      <form class="si-form" data-form="signin" novalidate>
        ${field("email", "Email", "email", `autocomplete="email" required value="${esc(email)}" placeholder="you@example.com"`)}
        ${field("password", "Password", "password", 'autocomplete="current-password" required placeholder="Your password"')}
        <div class="si-row"><label class="si-check"><input type="checkbox" name="remember" checked><span>Keep me signed in</span></label><button type="button" class="si-link" data-view="forgot">Forgot password?</button></div>
        <p class="si-error" role="alert" hidden></p>
        <button class="si-submit" type="submit"><span>Sign in</span></button>
      </form>`;
  if (view === "signup")
    html = `<h1>Create your account</h1><p class="si-lead">Free during early access. Your sites save to your account and open on any device.</p>${tabs}${google}
      <form class="si-form" data-form="signup" novalidate>
        ${field("name", "Your name", "text", 'autocomplete="name" maxlength="100" placeholder="e.g. Anu Thomas"')}
        ${field("email", "Email", "email", `autocomplete="email" required value="${esc(email)}" placeholder="you@example.com"`)}
        ${field("password", "Password", "password", 'autocomplete="new-password" required minlength="8" placeholder="At least 8 characters"')}
        <div class="si-meter" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        <p class="si-hint" data-strength>Use 8 or more characters. Mixing letters, numbers and symbols makes it stronger.</p>
        <p class="si-error" role="alert" hidden></p>
        <button class="si-submit" type="submit"><span>Create account</span></button>
        <p class="si-fine">By creating an account you agree to our <a href="/terms/">Terms</a> and <a href="/privacy/">Privacy policy</a>.</p>
      </form>`;
  if (view === "forgot")
    html = `<button type="button" class="si-back" data-view="signin">← Back to sign in</button><h1>Reset your password</h1><p class="si-lead">Enter your account email and we’ll send you a link to choose a new password.</p>
      <form class="si-form" data-form="forgot" novalidate>
        ${field("email", "Email", "email", `autocomplete="email" required value="${esc(email)}" placeholder="you@example.com"`)}
        <p class="si-error" role="alert" hidden></p>
        <button class="si-submit" type="submit"><span>Send reset link</span></button>
      </form>`;
  if (view === "sent")
    html = `<div class="si-state"><span class="si-state-ico">${MAIL}</span><h1>Check your email</h1><p class="si-lead">If an account exists for <strong>${esc(email)}</strong>, a reset link is on its way. It can take a minute, and it may land in spam.</p>
      <button type="button" class="si-submit" data-view="signin"><span>Back to sign in</span></button></div>`;
  if (view === "verify")
    html = `<div class="si-state"><span class="si-state-ico">${MAIL}</span><h1>Verify your email</h1>
      <p class="si-lead">We sent a link to <strong>${esc(user?.email || email)}</strong>. Open it to start saving sites to your account. Until then, sites save on this device only.</p>
      <p class="si-error" role="alert" hidden></p><p class="si-ok" role="status" hidden></p>
      <button type="button" class="si-submit" data-verified><span>I’ve verified my email</span></button>
      <div class="si-actions"><button type="button" class="si-link" data-resend>Resend the email</button><a class="si-link" href="${esc(nextPath())}">Continue without verifying</a></div>
      <button type="button" class="si-link si-muted" data-signout>Use a different account</button></div>`;
  if (view === "signedin")
    html = `<div class="si-state"><span class="si-avatar" aria-hidden="true">${esc(((user?.name || user?.email || "?").trim()[0] || "?").toUpperCase())}</span><h1>You’re signed in</h1>
      <p class="si-lead">Signed in as <strong>${esc(user?.email || user?.name)}</strong>. Your sites save to this account.</p>
      <a class="si-submit" href="${esc(nextPath())}"><span>Continue to Studio</span></a>
      <button type="button" class="si-link si-muted" data-signout>Use a different account</button></div>`;
  root.innerHTML = html;
  root.querySelector("h1")?.setAttribute("tabindex", "-1");
}

function showError(msg) {
  const box = $(".si-error", root);
  if (!box) return;
  box.textContent = msg;
  box.hidden = !msg;
}

function setBusy(on, btn) {
  busy = on;
  root.querySelectorAll("button, input").forEach((el) => (el.disabled = on && !el.matches("[data-eye]")));
  if (btn) btn.classList.toggle("is-busy", on);
}

function strength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
  return pw.length < 8 ? Math.min(s, 1) : Math.max(s, 1);
}

async function go(v, user) {
  view = v;
  busy = false; // a finished action must never leave the next view locked
  render(user === undefined ? cloud?.currentUser() : user);
  root.querySelector("h1")?.focus({ preventScroll: true });
  root.querySelector("input:not([type=checkbox])")?.focus();
}

async function onSubmit(form) {
  if (busy) return;
  const kind = form.dataset.form;
  const data = new FormData(form);
  email = String(data.get("email") || "").trim();
  const pw = String(data.get("password") || "");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showError("Enter a valid email address."), form.email.focus();
  if (kind !== "forgot" && !pw) return showError("Enter your password."), form.password.focus();
  if (kind === "signup" && pw.length < 8) return showError("Use at least 8 characters for your password."), form.password.focus();
  showError("");
  const btn = $(".si-submit", form);
  setBusy(true, btn);
  try {
    if (kind === "signin") {
      const user = await cloud.signInEmail(email, pw, data.get("remember") === "on");
      if (user.password && !user.verified) return go("verify", user);
      location.assign(nextPath());
    } else if (kind === "signup") {
      const user = await cloud.signUpEmail(String(data.get("name") || ""), email, pw);
      go("verify", user);
    } else if (kind === "forgot") {
      try {
        await cloud.resetPassword(email);
      } catch (e) {
        /* Don't reveal whether an account exists, except for real input/network problems. */
        if (!/user-not-found|invalid-credential/.test(e?.code || "")) throw e;
      }
      go("sent");
    }
  } catch (e) {
    setBusy(false, btn);
    showError(cloud.authMessage(e));
  }
}

root.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmit(e.target);
});

root.addEventListener("input", (e) => {
  if (e.target.name === "password" && e.target.form?.dataset.form === "signup") {
    const s = strength(e.target.value);
    root.querySelectorAll(".si-meter i").forEach((bar, i) => (bar.className = i < s ? `on s${s}` : ""));
    const label = ["", "Weak", "Fair", "Good", "Strong"][s];
    $("[data-strength]", root).textContent = e.target.value ? `Password strength: ${label}.` : "Use 8 or more characters. Mixing letters, numbers and symbols makes it stronger.";
  }
  if ($(".si-error", root) && !$(".si-error", root).hidden) showError("");
});

root.addEventListener("click", async (e) => {
  const t = e.target.closest("button, a");
  if (!t || busy) return;
  if (t.dataset.view) {
    const em = $("input[name=email]", root);
    if (em) email = em.value.trim();
    return go(t.dataset.view, null);
  }
  if (t.hasAttribute("data-eye")) {
    const input = t.parentElement.querySelector("input");
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    t.setAttribute("aria-pressed", String(show));
    t.setAttribute("aria-label", show ? "Hide password" : "Show password");
    return;
  }
  if (t.hasAttribute("data-google")) {
    setBusy(true, t);
    try {
      await cloud.signInGoogle();
      location.assign(nextPath());
    } catch (err) {
      setBusy(false, t);
      showError(cloud.authMessage(err));
    }
    return;
  }
  if (t.hasAttribute("data-signout")) {
    await cloud.signOutUser();
    return go("signin", null);
  }
  if (t.hasAttribute("data-resend")) {
    setBusy(true, t);
    try {
      await cloud.resendVerification();
      const ok = $(".si-ok", root);
      ok.textContent = "Sent. Check your inbox (and spam).";
      ok.hidden = false;
    } catch (err) {
      showError(cloud.authMessage(err));
    }
    setBusy(false, t);
    return;
  }
  if (t.hasAttribute("data-verified")) {
    setBusy(true, t);
    const user = await cloud.refreshUser().catch(() => null);
    setBusy(false, t);
    if (user?.verified) return location.assign(nextPath());
    showError("We can’t see the verification yet. Open the link in the email, then try again.");
  }
});

(async () => {
  try {
    cloud = await import(CLOUD);
    await cloud.authReady;
    render(cloud.currentUser());
  } catch {
    root.innerHTML = `<h1>Sign-in isn’t available right now</h1><p class="si-lead">Check your internet connection and reload the page. You can still use Studio without an account.</p><a class="si-submit" href="/studio/app/"><span>Open Studio</span></a>`;
  }
})();
