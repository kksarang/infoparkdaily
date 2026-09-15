/**
 * Auth redirect sanitizer + analytics privacy helpers.
 */
import test from "node:test";
import assert from "node:assert/strict";

function safeResumeNext(next, base = "/resume-builder/") {
  const fallback = base + "my-resumes/";
  if (!next || typeof next !== "string") return fallback;
  if (!next.startsWith(base)) return fallback;
  if (next.includes("\\") || next.includes("//") || next.includes("://")) return fallback;
  if (next.includes("..")) return fallback;
  return next;
}

function safePortfolioNext(next) {
  if (!next?.startsWith("/portfolio/")) return "/portfolio/";
  if (next.includes("//") || next.includes("\\") || next.includes("://") || next.includes(".."))
    return "/portfolio/";
  return next;
}

function sanitizeUrl(raw, origin = "https://infoparkdaily.online") {
  const SENSITIVE =
    /^(email|e-mail|password|token|id_token|access_token|refresh_token|code|next|name|phone|tel|message|notes|resume|content)$/i;
  try {
    const u = new URL(String(raw || ""), origin);
    const drop = [];
    u.searchParams.forEach((_v, k) => {
      if (SENSITIVE.test(k) || /email|token|password|phone/i.test(k)) drop.push(k);
    });
    drop.forEach((k) => u.searchParams.delete(k));
    return u.pathname + (u.search || "");
  } catch {
    return String(raw || "").split("?")[0];
  }
}

test("resume next rejects open redirects", () => {
  assert.equal(safeResumeNext("/resume-builder/my-resumes/"), "/resume-builder/my-resumes/");
  assert.equal(safeResumeNext("/resume-builder/templates/?select=harbor"), "/resume-builder/templates/?select=harbor");
  assert.equal(safeResumeNext("https://evil.example/"), "/resume-builder/my-resumes/");
  assert.equal(safeResumeNext("//evil.example"), "/resume-builder/my-resumes/");
  assert.equal(safeResumeNext("/resume-builder//evil"), "/resume-builder/my-resumes/");
  assert.equal(safeResumeNext("/jobs/"), "/resume-builder/my-resumes/");
  assert.equal(safeResumeNext("/resume-builder/../jobs/"), "/resume-builder/my-resumes/");
});

test("portfolio next rejects open redirects", () => {
  assert.equal(safePortfolioNext("/portfolio/templates/"), "/portfolio/templates/");
  assert.equal(safePortfolioNext("//evil.example"), "/portfolio/");
  assert.equal(safePortfolioNext("/portfolio/../jobs/"), "/portfolio/");
  assert.equal(safePortfolioNext("https://evil.example"), "/portfolio/");
});

test("sanitizeUrl strips sensitive query params", () => {
  assert.equal(
    sanitizeUrl("https://infoparkdaily.online/resume-builder/sign-in/?next=/x&email=a@b.com&utm_source=ig"),
    "/resume-builder/sign-in/?utm_source=ig",
  );
  assert.match(sanitizeUrl("/portfolio/?token=abc&utm_medium=cpc"), /^\/portfolio\/\?utm_medium=cpc$/);
});

test("event catalog includes production journey events", async () => {
  const { EVENTS, CATALOG } = await import("../../analytics/src/events.js");
  const required = [
    "login_start",
    "login",
    "sign_up",
    "login_error",
    "logout",
    "password_reset_request",
    "resume_gallery_view",
    "resume_template_preview",
    "resume_template_select",
    "resume_start",
    "resume_save_success",
    "resume_export_start",
    "resume_export_success",
    "resume_export_error",
    "portfolio_gallery_view",
    "portfolio_template_preview",
    "package_select",
    "whatsapp_click",
    "job_view",
    "job_apply",
    "pricing_view",
  ];
  const names = new Set(CATALOG.map((e) => e.name));
  for (const n of required) {
    assert.ok(names.has(n), `missing catalog entry ${n}`);
    assert.ok(Object.values(EVENTS).includes(n), `missing EVENTS constant for ${n}`);
  }
});
