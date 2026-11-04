// End-to-end check of the recruit-only hub (/infoparkdaily/) against Firebase emulators.
// Run with the dev server on :8000 and emulators (auth 9099, firestore 8080), e.g.:
//   firebase emulators:exec --only firestore,auth --project demo-infoparkdaily "node tests/infoparkdaily/recruit-flow.mjs"
// (firebase.json needs an "emulators" block with auth/firestore ports, or pass --config with one.)
import { chromium } from "playwright";
import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import assert from "node:assert/strict";

const origin = "http://localhost:8000";
const password = "Local-only-test-2026";
const env = await initializeTestEnvironment({ projectId: "demo-infoparkdaily", firestore: { host: "127.0.0.1", port: 8080 } });
await env.clearFirestore();
/** Read a document with rules bypassed (withSecurityRulesDisabled does not return the callback's value). */
async function adminGet(path) {
  let out;
  await env.withSecurityRulesDisabled(async (c) => { out = (await getDoc(doc(c.firestore(), path))).data(); });
  return out;
}

async function makeUser(email) {
  const res = await fetch("http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=demo-key", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, returnSecureToken: true })
  });
  const data = await res.json();
  assert.ok(data.localId, JSON.stringify(data));
  const v = await fetch("http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:update?key=demo-key", {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer owner" },
    body: JSON.stringify({ localId: data.localId, emailVerified: true })
  });
  assert.ok(v.ok, await v.text());
  return data.localId;
}
const adminEmail = `admin-${Date.now()}@example.test`;
await makeUser(adminEmail);
await env.withSecurityRulesDisabled((c) => setDoc(doc(c.firestore(), "marketAdmins", adminEmail), { active: true }));

const browser = await chromium.launch({ channel: "chrome", headless: true });
const errors = [];
const pages = [];
const SHOTS = process.env.RECRUIT_SHOTS || "";
const step = (msg) => console.log("✓ " + msg);
async function page(viewport = { width: 1366, height: 900 }) {
  const ctx = await browser.newContext({ viewport });
  await ctx.addInitScript(() => sessionStorage.setItem("ipd_market_emulator", "1"));
  const p = await ctx.newPage();
  p.on("pageerror", (e) => errors.push(p.url() + " :: " + e.message));
  // Console errors count, except network noise (offline blips) and the known relative sw.js registration 404 from js/site.js.
  p.on("console", (m) => {
    const t = m.text();
    if (m.type() !== "error" || /Failed to load resource|fetching the script|ERR_INTERNET_DISCONNECTED/.test(t)) return;
    errors.push(p.url() + " :: console: " + t);
  });
  pages.push(p);
  return p;
}
const future = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);

try {
  /* ---------- 1. Employer posts a walk-in without signing in ---------- */
  const guest = await page();
  await guest.goto(origin + "/infoparkdaily/post/?type=walkin", { waitUntil: "domcontentloaded" });
  const f = guest.locator("#rp-form");
  await f.waitFor();
  const fill = (name, value) => f.locator(`[name="${name}"]`).fill(value);
  await fill("contactName", "Asha Menon");
  await fill("contactEmail", "asha.hr@brightloop.example");
  await fill("contactPhone", "+91 98470 12345");
  await fill("company", "Brightloop Technologies");
  await fill("website", "https://brightloop.example");
  await f.locator('[name="park"]').selectOption({ index: 1 });
  await fill("location", "Phase 1, Infopark, Kochi");
  await fill("title", "Junior QA Engineer (Walk-in)");
  await fill("description", "Manual and API testing for our healthcare products. Freshers with ISTQB welcome.");
  await fill("walkDate", future);
  await fill("walkTime", "10:00 am – 1:00 pm");
  await fill("walkVenue", "Brightloop, 3rd floor, Athulya, Infopark");
  await fill("applyContact", "careers@brightloop.example");
  await f.locator('[name="noFee"]').check();
  await f.locator('[name="terms"]').check();
  await f.locator('button[type="submit"]').click();
  const walkId = (await guest.locator(".rp-done .rp-id code").textContent()).trim();
  assert.match(walkId, /^IPD-[A-Z0-9]{4}-[A-Z0-9]{5}-[A-Z0-9]{5}$/);
  step("Walk-in posted without an account → " + walkId);

  /* ---------- 2. Quick job alert without signing in ---------- */
  await guest.goto(origin + "/infoparkdaily/post/?type=alert", { waitUntil: "domcontentloaded" });
  await f.waitFor();
  await fill("contactName", "Ravi Nair");
  await fill("contactEmail", "ravi@spiceroute.example");
  await fill("contactPhone", "+91 94470 55555");
  await fill("company", "Spice Route Analytics");
  await f.locator('[name="park"]').selectOption({ index: 1 });
  await fill("location", "Technopark, Thiruvananthapuram");
  await fill("title", "Data Analyst — immediate joiners");
  await fill("alertNote", "Share resume by email. SQL + Excel required.");
  await fill("applyContact", "jobs@spiceroute.example");
  await f.locator('[name="noFee"]').check();
  await f.locator('[name="terms"]').check();
  await f.locator('button[type="submit"]').click();
  const alertPostId = (await guest.locator(".rp-done .rp-id code").textContent()).trim();
  step("Quick job alert posted without an account → " + alertPostId);

  /* ---------- 3. Tracking shows "pending" ---------- */
  await guest.goto(origin + "/infoparkdaily/track/?id=" + walkId, { waitUntil: "domcontentloaded" });
  await guest.locator(".rp-track-card .rp-state").waitFor();
  assert.match(await guest.locator(".rp-track-card .rp-state").textContent(), /waiting for review/i);
  await guest.goto(origin + "/infoparkdaily/track/?id=IPD-NOPE-NOPEN-NOPEN", { waitUntil: "domcontentloaded" });
  await guest.getByText("We couldn’t find that ID.").waitFor();
  step("Tracking shows pending, and an unknown ID shows 'not found'");

  /* ---------- 4. Job seeker subscribes, pauses and resumes ---------- */
  await guest.goto(origin + "/infoparkdaily/alerts/", { waitUntil: "domcontentloaded" });
  const ja = guest.locator("#ja-form");
  await ja.waitFor();
  await ja.locator('[name="name"]').fill("Neha");
  await ja.locator('[name="contact"]').fill("+91 99999 88888");
  await ja.locator('[name="keywords"]').fill("QA, data analyst");
  await ja.locator('[name="consent"]').check();
  await ja.locator('button[type="submit"]').click();
  const subId = (await guest.locator(".rp-done .rp-id code").textContent()).trim();
  await guest.goto(origin + "/infoparkdaily/alerts/?id=" + encodeURIComponent(subId), { waitUntil: "domcontentloaded" });
  await guest.locator('[data-st="paused"]').click();
  await guest.locator('[data-st="active"]').waitFor();
  await guest.locator('[data-st="active"]').click();
  await guest.locator('[data-st="paused"]').waitFor();
  step("Seeker subscribed to alerts, paused and resumed with the manage link");

  /* ---------- 5. Privacy: guests cannot list private data ---------- */
  const anon = env.unauthenticatedContext().firestore();
  await assert.rejects(getDocs(collection(anon, "hiringRequests")), "guest must not list requests");
  await assert.rejects(getDocs(collection(anon, "jobAlerts")), "guest must not list subscribers");
  step("Guests cannot list posts or alert subscribers");

  /* ---------- 6. Admin signs in and approves both posts ---------- */
  const admin = await page();
  await admin.goto(origin + "/infoparkdaily/sign-in/", { waitUntil: "domcontentloaded" });
  await admin.locator("#auth-form").waitFor();
  await admin.locator("#email").fill(adminEmail);
  await admin.locator("#password").fill(password);
  await admin.locator("#auth-form button[type=submit]").click();
  // First sign-in shows a one-time "set up your hiring workspace" form, then the dashboard.
  await admin.locator("#workspace-content, #onboarding-form").first().waitFor({ timeout: 20000 });
  if (await admin.locator("#onboarding-form").count()) {
    await admin.locator('#onboarding-form [name="name"]').fill("QA Admin");
    await admin.locator('#onboarding-form [name="company"]').fill("InfoparkDaily");
    await admin.locator('#onboarding-form button[type="submit"]').click();
    await admin.locator("#workspace-content").waitFor({ timeout: 20000 });
  }
  await admin.goto(origin + "/infoparkdaily/admin/", { waitUntil: "domcontentloaded" });
  await admin.locator("[data-admin-tab]").first().waitFor({ timeout: 20000 });
  for (const id of [walkId, alertPostId]) {
    const btn = admin.locator(`[data-req-action="approve"][data-req-id="${id}"]`);
    await btn.waitFor({ timeout: 20000 });
    await btn.click();
    // Wait until the database shows the request approved (the list may move it out of the pending view).
    let status = "";
    for (let t = 0; t < 40 && status !== "approved"; t++) {
      await admin.waitForTimeout(500);
      status = (await adminGet("hiringRequests/" + id))?.status;
    }
    const toastText = await admin.locator(".toast, [role=status]").allInnerTexts().catch(() => []);
    assert.equal(status, "approved", `approve ${id} failed; page says: ${toastText.join(" | ")}`);
  }
  for (const tab of ["requests", "jobs", "alerts"]) {
    await admin.locator(`[data-admin-tab="${tab}"]`).first().click();
    await admin.waitForTimeout(300);
  }
  step("Admin signed in, opened every review tab and approved both posts");

  /* ---------- 7. Public job has no tracking ID; tracking shows approved ---------- */
  const req = await adminGet("hiringRequests/" + walkId);
  assert.equal(req.status, "approved");
  assert.ok(req.jobId);
  const pub = (await getDoc(doc(anon, "marketJobs", req.jobId))).data();
  assert.equal(pub.status, "approved");
  assert.equal(pub.requestId, undefined, "public job must not expose the tracking ID");
  assert.ok(!JSON.stringify(pub).includes(walkId), "tracking ID leaked into public job");
  assert.ok(!JSON.stringify(pub).includes("98470 12345"), "poster phone leaked into public job");
  await guest.goto(origin + "/infoparkdaily/track/?id=" + walkId, { waitUntil: "domcontentloaded" });
  await guest.getByText("Approved — your post is live").waitFor();
  step("Public job carries no tracking ID or private contact; tracking shows approved");

  /* ---------- 8. Both appear on /jobs/ with the right tags ---------- */
  await guest.goto(origin + "/jobs/", { waitUntil: "domcontentloaded" });
  await guest.getByText("Junior QA Engineer (Walk-in)").first().waitFor({ timeout: 20000 });
  await guest.getByText("Data Analyst — immediate joiners").first().waitFor({ timeout: 20000 });
  const alertJob = await guest.evaluate(() => (window.JOBS || []).find((j) => (j.roles || []).includes("Data Analyst — immediate joiners")));
  assert.ok(alertJob && alertJob.tags.includes("Job alert"), "approved alert must keep its 'Job alert' tag: " + JSON.stringify(alertJob && alertJob.tags));
  const walkJob = await guest.evaluate(() => (window.JOBS || []).find((j) => (j.roles || []).includes("Junior QA Engineer (Walk-in)")));
  assert.ok(walkJob && walkJob.isWalkIn && walkJob.tags.includes("Walk-in"));
  step("Both posts are live on /jobs/; the alert keeps its 'Job alert' tag and the walk-in is flagged");

  /* ---------- 9. Phone width: no sideways scrolling ---------- */
  const phone = await page({ width: 390, height: 844 });
  for (const path of ["", "post/", "alerts/", "track/", "sign-in/", "contact/", "about/"]) {
    await phone.goto(origin + "/infoparkdaily/" + path, { waitUntil: "domcontentloaded" });
    await phone.waitForTimeout(500);
    const w = await phone.evaluate(() => document.documentElement.scrollWidth);
    assert.ok(w <= 390, `/infoparkdaily/${path} scrolls sideways (${w}px)`);
  }
  await phone.goto(origin + "/infoparkdaily/workers/", { waitUntil: "domcontentloaded" });
  await phone.waitForTimeout(800);
  assert.ok(!/workers/.test(new URL(phone.url()).pathname) || (await phone.locator("text=Find talent").count()) === 0, "workers page should not be reachable");
  step("All hub pages fit a 390px phone; the old /workers/ page is not shown");

  assert.deepEqual(errors, [], "page errors:\n" + errors.join("\n"));
  step("No JavaScript errors on any page");
  console.log("\nRECRUIT FLOW PASSED");
} catch (e) {
  if (SHOTS) for (const [i, p] of pages.entries()) {
    await p.screenshot({ path: `${SHOTS}/fail-${i}.png`, fullPage: false }).catch(() => {});
    console.log(`--- page ${i}: ${p.url()}\n` + (await p.locator("main").innerText().catch(() => "")).slice(0, 1200));
  }
  console.log("errors so far:", errors);
  throw e;
} finally {
  await browser.close();
  await env.cleanup();
}
