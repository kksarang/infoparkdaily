/**
 * Push branded Firebase Auth email templates and the custom action URL.
 *
 * Usage (from repo root, signed into Firebase CLI):
 *   node scripts/apply-auth-email-templates.mjs
 *
 * If the API blocks template edits, paste the HTML from firebase/email-templates/
 * into Firebase Console → Authentication → Templates, set sender name to
 * InfoparkDaily, and set the action URL to https://infoparkdaily.online/auth/action/
 */
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";

const PROJECT = "infoparkdailyweb";
const ACTION_URL = "https://infoparkdaily.online/auth/action/";

function token() {
  const fromEnv = process.env.GOOGLE_ACCESS_TOKEN || process.env.FIREBASE_TOKEN;
  if (fromEnv) return fromEnv.trim();
  return execFileSync(
    "python3",
    [
      "-c",
      "import json,os,time; p=os.path.expanduser('~/.config/configstore/firebase-tools.json'); d=json.load(open(p)); t=d.get('tokens') or {}; print(t.get('access_token') or '')",
    ],
    { encoding: "utf8" },
  ).trim();
}

const verify = await readFile("firebase/email-templates/verify-email.html", "utf8");
const reset = await readFile("firebase/email-templates/reset-password.html", "utf8");
const access = token();
if (!access) {
  console.error("Sign in with the Firebase CLI, then run this script again.");
  process.exit(1);
}

const body = {
  notification: {
    sendEmail: {
      callbackUri: ACTION_URL,
      verifyEmailTemplate: {
        senderDisplayName: "InfoparkDaily",
        senderLocalPart: "noreply",
        subject: "Confirm your InfoparkDaily email",
        body: verify,
        bodyFormat: "HTML",
      },
      resetPasswordTemplate: {
        senderDisplayName: "InfoparkDaily",
        senderLocalPart: "noreply",
        subject: "Reset your InfoparkDaily password",
        body: reset,
        bodyFormat: "HTML",
      },
    },
  },
};

const url =
  `https://identitytoolkit.googleapis.com/admin/v2/projects/${PROJECT}/config` +
  "?updateMask=notification.sendEmail.callbackUri," +
  "notification.sendEmail.verifyEmailTemplate," +
  "notification.sendEmail.resetPasswordTemplate";

const res = await fetch(url, {
  method: "PATCH",
  headers: {
    Authorization: "Bearer " + access,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});
const text = await res.text();
if (!res.ok) {
  console.error(res.status, text);
  console.error(
    "If this is EMAIL_TEMPLATE_UPDATE_NOT_ALLOWED, paste the HTML in Firebase Console instead.",
  );
  process.exit(1);
}
console.log("Updated Auth email templates and action URL.");
