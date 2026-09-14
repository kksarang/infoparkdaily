import { chromium } from "playwright";
import assert from "node:assert/strict";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.addInitScript(() =>
  sessionStorage.setItem("ipd_market_emulator", "1"),
);
try {
  const email = "signup-" + Date.now() + "@example.test";
  await page.goto("http://localhost:8000/infoparkdaily/register/", {
    waitUntil: "domcontentloaded",
  });
  await page.locator("#auth-form").waitFor();
  await page.locator("#name").fill("Signup Test");
  await page.locator("#email").fill(email);
  await page.locator("#password").fill("Emulator-test-password");
  await page.locator("[name=consent]").check();
  await page.locator("#auth-form button[type=submit]").click();
  await page.locator("#verify-form").waitFor();
  const data = await (
    await fetch(
      "http://127.0.0.1:9099/emulator/v1/projects/demo-infoparkdaily/oobCodes",
    )
  ).json();
  const oob = data.oobCodes.find(
    (c) => c.email === email && c.requestType === "VERIFY_EMAIL",
  );
  assert.ok(oob);
  const verify = await fetch(
    "http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:update?key=demo-key",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oobCode: oob.oobCode }),
    },
  );
  assert.ok(verify.ok);
  await page.locator("#verify-form button[type=submit]").click();
  await page.locator("#onboarding-form").waitFor();
  console.log("Registration and email verification passed.");
  await page.locator("#onboarding-form button[type=submit]").click();
  await page.locator("#workspace-content").waitFor();
  await page.goto("http://localhost:8000/infoparkdaily/account/", {
    waitUntil: "domcontentloaded",
  });
  await page.locator("[data-reset]").click();
  await page.locator("#market-dialog button[type=submit]").click();
  await page.locator("#market-dialog .form-message.success").waitFor();
  const reset = await (
    await fetch(
      "http://127.0.0.1:9099/emulator/v1/projects/demo-infoparkdaily/oobCodes",
    )
  ).json();
  assert.ok(
    reset.oobCodes.some(
      (c) => c.email === email && c.requestType === "PASSWORD_RESET",
    ),
  );
  console.log("Password reset flow passed.");
} catch (error) {
  console.error(
    "Visible messages:",
    await page.locator(".form-message").allTextContents(),
  );
  throw error;
} finally {
  await browser.close();
}
