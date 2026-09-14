// Local integration check. All accounts, documents and messages use Firebase emulators.
import { chromium } from "playwright";
import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { doc, setDoc } from "firebase/firestore";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const origin = "http://localhost:8000",
  password = "Local-only-test-2026";
const env = await initializeTestEnvironment({
  projectId: "demo-infoparkdaily",
  firestore: { host: "127.0.0.1", port: 8080 },
});
await env.clearFirestore();
const stamp = Date.now();
const accounts = {};
for (const role of ["worker", "employer", "admin"]) {
  const email = `${role}-${stamp}@example.test`;
  const res = await fetch(
    "http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=demo-key",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    },
  );
  const data = await res.json();
  assert.ok(data.localId, JSON.stringify(data));
  const verify = await fetch(
    "http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:update?key=demo-key",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer owner",
      },
      body: JSON.stringify({ localId: data.localId, emailVerified: true }),
    },
  );
  assert.ok(verify.ok, await verify.text());
  accounts[role] = { uid: data.localId, email };
}
await env.withSecurityRulesDisabled(async (c) =>
  setDoc(doc(c.firestore(), "marketAdmins", accounts.admin.email), {
    active: true,
  }),
);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const errors = [];
await mkdir("/tmp/market-qa", { recursive: true });
async function actor(role) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  await ctx.addInitScript(() =>
    sessionStorage.setItem("ipd_market_emulator", "1"),
  );
  const p = await ctx.newPage();
  p.on("pageerror", (e) => errors.push(role + ": " + e.message));
  await p.goto(origin + "/infoparkdaily/sign-in/", {
    waitUntil: "domcontentloaded",
  });
  await p.locator("#auth-form").waitFor();
  await p.locator("#email").fill(accounts[role].email);
  await p.locator("#password").fill(password);
  await p.locator("#auth-form button[type=submit]").click();
  await p.locator("#onboarding-form").waitFor();
  await p
    .locator(
      '#onboarding-form input[value="' +
        (role === "worker" ? "worker" : "employer") +
        '"]',
    )
    .check();
  await p
    .locator("#name")
    .fill(
      role === "worker"
        ? "QA Worker"
        : role === "employer"
          ? "QA Employer"
          : "QA Admin",
    );
  if (role !== "worker")
    await p
      .getByLabel("Company name (for employers)")
      .fill("QA Software Company");
  await p.locator("#onboarding-form button[type=submit]").click();
  await p.locator("#workspace-content").waitFor();
  return p;
}
try {
  const employer = await actor("employer");
  console.log("Employer onboarding passed");
  await employer.goto(origin + "/infoparkdaily/post-job/", {
    waitUntil: "domcontentloaded",
  });
  await employer.locator("#job-form").waitFor();
  await employer
    .getByLabel("Job title", { exact: false })
    .fill("QA Community Developer");
  await employer.getByLabel("Location", { exact: false }).fill("Kochi");
  await employer.getByLabel("Experience required").fill("2 years");
  await employer
    .getByLabel("Closing date", { exact: false })
    .fill("2027-01-30");
  await employer
    .getByLabel("About the role", { exact: false })
    .fill(
      "Build useful web applications with our small software team. This is an isolated emulator test.",
    );
  await employer
    .getByLabel("Requirements (one per line)")
    .fill("JavaScript\nClear communication");
  await employer.locator("#job-form button[type=submit]").click();
  await employer.waitForURL("**/dashboard/?posted=1");
  await employer
    .getByText("QA Community Developer", { exact: true })
    .first()
    .waitFor();
  console.log("Employer job submission passed");
  const worker = await actor("worker");
  await worker.goto(origin + "/infoparkdaily/profile/", {
    waitUntil: "domcontentloaded",
  });
  await worker.locator("#profile-form").waitFor();
  await worker
    .getByLabel("Professional title", { exact: false })
    .fill("Web developer");
  await worker.getByLabel("Location", { exact: false }).fill("Kochi");
  await worker
    .getByLabel("Skills (separate with commas)")
    .fill("JavaScript, HTML, CSS");
  await worker
    .getByLabel("About you", { exact: false })
    .fill("I build thoughtful websites and accessible user interfaces.");
  await worker.locator("#profile-form button[type=submit]").click();
  await worker.getByText("Awaiting review", { exact: true }).waitFor();
  console.log("Worker profile submitted");
  await worker.goto(origin + "/infoparkdaily/account/", {
    waitUntil: "domcontentloaded",
  });
  await worker.locator("#document-form").waitFor();
  await worker
    .locator("#document")
    .setInputFiles({
      name: "test-resume.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.from("%PDF-1.4\nLocal emulator test resume\n%%EOF"),
    });
  await worker.locator("#document-form button[type=submit]").click();
  await worker.getByText(/test-resume.pdf/).waitFor();
  console.log("Private resume upload passed");
  const admin = await actor("admin");
  await admin.goto(origin + "/infoparkdaily/admin/", {
    waitUntil: "domcontentloaded",
  });
  await admin.locator('[data-admin-tab="jobs"]').waitFor();
  const jobCard = admin
    .locator(".record")
    .filter({
      has: admin.getByRole("heading", {
        name: "QA Community Developer",
        exact: true,
      }),
    });
  await jobCard.getByRole("button", { name: "Approve", exact: true }).click();
  await jobCard.getByText("Approved", { exact: true }).waitFor();
  await admin.locator('[data-admin-tab="profiles"]').click();
  const profile = admin
    .locator(".record")
    .filter({
      has: admin.getByRole("heading", { name: "QA Worker", exact: true }),
    });
  await profile.getByRole("button", { name: "Approve", exact: true }).click();
  await profile.getByText("Approved", { exact: true }).waitFor();
  console.log("Admin job and profile approval passed");
  await worker.goto(
    origin + "/infoparkdaily/jobs/?q=QA%20Community%20Developer",
    { waitUntil: "domcontentloaded" },
  );
  await worker
    .getByRole("heading", { name: "QA Community Developer" })
    .waitFor();
  await worker
    .getByRole("heading", { name: "QA Community Developer" })
    .getByRole("link")
    .click();
  await worker.locator("[data-apply]").waitFor();
  await worker.locator("[data-apply]").click();
  await worker.locator("#apply-form").waitFor();
  await worker
    .getByLabel("Why are you a good fit?", { exact: false })
    .fill("My JavaScript experience matches this role.");
  await worker
    .getByLabel("Share a copy of my saved resume with this employer")
    .check();
  await worker.locator("#apply-form button[type=submit]").click();
  await worker.locator("#market-dialog").waitFor({ state: "detached" });
  console.log("Application with private resume sharing passed");
  await employer.goto(origin + "/infoparkdaily/applications/", {
    waitUntil: "domcontentloaded",
  });
  await employer
    .getByRole("button", { name: "Request hire approval", exact: true })
    .first()
    .waitFor();
  await employer
    .getByRole("button", { name: "Request hire approval", exact: true })
    .first()
    .click();
  await employer.locator("#market-dialog button[type=submit]").click();
  await employer
    .getByText("Hire awaiting approval", { exact: true })
    .first()
    .waitFor();
  console.log("Employer hire request passed");
  await admin.goto(origin + "/infoparkdaily/admin/?tab=applications", {
    waitUntil: "domcontentloaded",
  });
  await admin
    .getByRole("button", { name: "Approve hire & open chat", exact: true })
    .first()
    .waitFor();
  await admin
    .getByRole("button", { name: "Approve hire & open chat", exact: true })
    .first()
    .click();
  await admin.locator("#market-dialog button[type=submit]").click();
  await admin.locator("#market-dialog").waitFor({ state: "detached" });
  console.log("Admin hire approval passed");
  await worker.goto(origin + "/infoparkdaily/messages/", {
    waitUntil: "domcontentloaded",
  });
  await worker.locator("#chat-form").waitFor();
  await worker
    .getByLabel("Your message", { exact: true })
    .fill("Hello, ready to discuss the next steps.");
  await worker.locator("#chat-form button[type=submit]").click();
  await worker
    .getByText("Hello, ready to discuss the next steps.", { exact: false })
    .first()
    .waitFor();
  await employer.goto(origin + "/infoparkdaily/messages/", {
    waitUntil: "domcontentloaded",
  });
  await employer
    .getByText("Hello, ready to discuss the next steps.", { exact: false })
    .first()
    .waitFor();
  console.log("Private chat send and receive passed");
  await employer.goto(origin + "/infoparkdaily/applications/", {
    waitUntil: "domcontentloaded",
  });
  await employer
    .getByRole("button", { name: "Mark work completed", exact: true })
    .first()
    .waitFor();
  await employer
    .getByRole("button", { name: "Mark work completed", exact: true })
    .first()
    .click();
  await employer.locator("#market-dialog button[type=submit]").click();
  await employer.getByText("Completed", { exact: true }).first().waitFor();
  await worker.goto(origin + "/infoparkdaily/applications/", {
    waitUntil: "domcontentloaded",
  });
  await worker
    .getByRole("button", { name: "Leave a review", exact: true })
    .first()
    .waitFor();
  await worker
    .getByRole("button", { name: "Leave a review", exact: true })
    .first()
    .click();
  await worker
    .getByLabel("Your review", { exact: false })
    .fill("Clear expectations and a good working experience.");
  await worker.locator("#market-dialog button[type=submit]").click();
  await worker.locator("#market-dialog").waitFor({ state: "detached" });
  console.log("Completion and review passed");
  await worker.screenshot({
    path: "/tmp/market-qa/applications-desktop.png",
    fullPage: true,
  });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  await ctx.addInitScript(() =>
    sessionStorage.setItem("ipd_market_emulator", "1"),
  );
  const mobile = await ctx.newPage();
  mobile.on("pageerror", (e) => errors.push("mobile: " + e.message));
  for (const route of ["", "jobs/", "workers/", "register/", "sign-in/"]) {
    await mobile.goto(origin + "/infoparkdaily/" + route, {
      waitUntil: "domcontentloaded",
    });
    await mobile.locator("h1").waitFor();
    if (route === "register/" || route === "sign-in/")
      await mobile.locator("#auth-form").waitFor();
    await mobile.evaluate(() => document.fonts.ready);
    await mobile.screenshot({
      path:
        "/tmp/market-qa/" + (route.replace("/", "") || "home") + "-mobile.png",
      fullPage: true,
    });
    assert.equal(
      await mobile.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      "Overflow: " + route,
    );
  }
  await mobile.locator("#market-menu-toggle").click();
  assert.equal(
    await mobile
      .locator("#market-nav")
      .evaluate((e) => e.classList.contains("open")),
    true,
  );
  await mobile.keyboard.press("Escape");
  assert.equal(
    await mobile.locator("#market-menu-toggle").getAttribute("aria-expanded"),
    "false",
  );
  assert.deepEqual(errors, []);
  await writeFile(
    "/tmp/market-qa/result.json",
    JSON.stringify(
      {
        passed: true,
        accounts: Object.fromEntries(
          Object.entries(accounts).map(([k, v]) => [k, v.uid]),
        ),
        errors,
      },
      null,
      2,
    ),
  );
  console.log("Desktop/mobile workflow passed without page errors.");
} catch (e) {
  for (const context of browser.contexts())
    for (const [i, p] of context.pages().entries()) {
      console.error(
        "Page:",
        p.url(),
        (await p.locator(".form-message").allTextContents()).filter(Boolean),
      );
      await p.screenshot({
        path:
          "/tmp/market-qa/failure-" +
          browser.contexts().indexOf(context) +
          "-" +
          i +
          ".png",
        fullPage: true,
      });
    }
  throw e;
} finally {
  await browser.close();
  await env.cleanup();
}
