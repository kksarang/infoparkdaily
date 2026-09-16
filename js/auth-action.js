import {
  completeAuthEmailAction,
  safeAuthContinuePath,
} from "./resume-builder/cloud.bundle.js?v=20260916mail";

const root = document.getElementById("auth-action");
const params = new URLSearchParams(location.search);
const mode = params.get("mode") || "";
const oobCode = params.get("oobCode") || "";
const next = safeAuthContinuePath(params.get("continueUrl"));

function card(title, html) {
  root.innerHTML = `<div class="auth-action-card"><a href="/"><img src="/assets/logo-infoparkdaily.png" width="48" height="48" alt="InfoparkDaily"></a><h1>${title}</h1>${html}</div>`;
}

function esc(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function done(title, message) {
  card(
    title,
    `<p>${esc(message)}</p><p class="verify-panel-hint">(If you still see an unverified banner, refresh that page or tap I’ve verified.)</p><a class="button" href="${esc(next)}">Continue</a>`,
  );
}

function fail(error) {
  card(
    "This link did not work",
    `<p class="auth-action-error">${esc(error.message || error)}</p><p>Request a new email from InfoparkDaily, and check Spam or Promotions if it does not arrive.</p><a class="button" href="${esc(next)}">Back to InfoparkDaily</a>`,
  );
}

function passwordForm(email) {
  card(
    "Choose a new password",
    `<p>Resetting the password for <strong>${esc(email)}</strong>.</p><form id="reset-form"><div class="field"><label for="new-password">New password</label><input id="new-password" name="password" type="password" autocomplete="new-password" required minlength="10" maxlength="128"></div><button class="button" type="submit">Save password</button></form>`,
  );
  document.getElementById("reset-form").onsubmit = async (event) => {
    event.preventDefault();
    const password = new FormData(event.target).get("password");
    try {
      const result = await completeAuthEmailAction({
        mode,
        oobCode,
        newPassword: String(password || ""),
      });
      done(result.title, result.message);
    } catch (error) {
      fail(error);
    }
  };
}

card("Opening your email link…", "<p>Please wait a moment.</p>");

try {
  const result = await completeAuthEmailAction({ mode, oobCode });
  if (result.needsPassword) passwordForm(result.email);
  else done(result.title, result.message);
} catch (error) {
  fail(error);
}
