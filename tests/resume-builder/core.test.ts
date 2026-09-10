import { test } from "node:test";
import { request as httpRequest } from "node:http";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { createApp } from "../../services/resume-api/server.ts";
import {
  signature,
  verifySignature,
} from "../../services/resume-api/payments.ts";
import {
  blankResume,
  sampleResume,
  validateResume,
} from "../../js/resume-builder/schema.js";
import { renderResume, safeLink } from "../../js/resume-builder/render.js";

test("local Resume Builder security and complete purchase/export flow", async (t) => {
  const dir = mkdtempSync(join(tmpdir(), "ipd-resume-test-"));
  const app = createApp({
    dbPath: join(dir, "test.sqlite"),
    artifactPath: join(dir, "artifacts"),
  });
  await new Promise<void>((r) => app.server.listen(0, "127.0.0.1", r));
  const address = app.server.address() as { port: number };
  const base = "http://127.0.0.1:" + address.port;
  let a = "",
    b = "",
    aid = "",
    bid = "",
    resume: any,
    order: any,
    exportId = "";
  async function request(
    path: string,
    method = "GET",
    body?: any,
    cookie = "",
    headers: Record<string, string> = {},
  ) {
    const response = await fetch(base + path, {
      method,
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const type = response.headers.get("Content-Type") || "";
    const data = type.includes("json")
      ? await response.json()
      : await response.arrayBuffer();
    return { status: response.status, data, headers: response.headers };
  }
  try {
    await t.test("static routes and private source boundaries", async () => {
      for (const path of [
        "/resume-builder/",
        "/resume-builder/editor/",
        "/resume-builder/templates/",
        "/jobs/",
        "/ats-checker/",
        "/job/example/",
      ])
        assert.equal((await request(path)).status, 200, path);
      for (const path of [
        "/.local/resume-builder.sqlite",
        "/services/resume-api/catalog.ts",
        "/package.json",
        "/.env",
        "/node_modules/playwright/package.json",
      ])
        assert.equal((await request(path)).status, 404, path);
      const r = await request("/v1/resumes");
      assert.equal(r.status, 401);
      assert.equal(r.headers.get("Cache-Control"), "no-store");
    });
    await t.test(
      "public catalog has 84 designs and 32 free with no premium config",
      async () => {
        const r = await request("/v1/templates");
        assert.equal(r.data.length, 84);
        assert.equal(r.data.filter((x: any) => x.access === "free").length, 32);
        assert.ok(
          r.data
            .filter((x: any) => x.access === "premium")
            .every((x: any) => !("config" in x)),
        );
      },
    );
    await t.test(
      "local signup, session security and wrong-password rejection",
      async () => {
        const first = await request("/v1/auth/signup", "POST", {
          name: "First User",
          email: "first@example.com",
          password: "testing-password-123",
        });
        assert.equal(first.status, 200);
        a = first.headers.get("Set-Cookie")!.split(";")[0];
        aid = first.data.id;
        assert.match(first.headers.get("Set-Cookie")!, /HttpOnly/);
        assert.match(first.headers.get("Set-Cookie")!, /SameSite=Strict/);
        const second = await request("/v1/auth/signup", "POST", {
          name: "Second User",
          email: "second@example.com",
          password: "testing-password-456",
        });
        b = second.headers.get("Set-Cookie")!.split(";")[0];
        bid = second.data.id;
        assert.equal(
          (
            await request("/v1/auth/login", "POST", {
              email: "first@example.com",
              password: "incorrect-password",
            })
          ).status,
          401,
        );
        assert.equal(
          (
            await request("/v1/auth/local", "POST", {}, "", {
              Origin: "https://evil.example",
            })
          ).status,
          403,
        );
        const rejectedHost = await new Promise<number | undefined>(
          (resolve, reject) => {
            httpRequest(
              base + "/v1/health",
              { headers: { Host: "evil.example" } },
              (r) => {
                r.resume();
                resolve(r.statusCode);
              },
            )
              .on("error", reject)
              .end();
          },
        );
        assert.equal(rejectedHost, 403);
      },
    );
    await t.test(
      "save, reload, owner isolation, duplicate and stale saves",
      async () => {
        const create = await request(
          "/v1/resumes",
          "POST",
          {
            title: "Developer resume",
            data: sampleResume(),
            template_id: "ats-essential",
          },
          a,
        );
        assert.equal(create.status, 201);
        resume = create.data;
        assert.equal(
          (await request("/v1/resumes/" + resume.id, "GET", undefined, b))
            .status,
          404,
        );
        assert.equal(
          (
            await request(
              "/v1/resumes/" + resume.id,
              "PATCH",
              { revision: 1, title: "Stolen" },
              b,
            )
          ).status,
          404,
        );
        assert.equal(
          (await request("/v1/resumes/" + resume.id, "DELETE", {}, b)).status,
          404,
        );
        const data = structuredClone(resume.data);
        data.personal.name = "First User";
        const changed = await request(
          "/v1/resumes/" + resume.id,
          "PATCH",
          { revision: resume.revision, data },
          a,
        );
        assert.equal(changed.status, 200);
        assert.equal(changed.data.data.personal.name, "First User");
        assert.equal(
          (
            await request(
              "/v1/resumes/" + resume.id,
              "PATCH",
              { revision: 1, title: "Stale" },
              a,
            )
          ).status,
          409,
        );
        resume = changed.data;
        const copy = await request(
          "/v1/resumes/" + resume.id + "/duplicate",
          "POST",
          {},
          a,
        );
        assert.equal(copy.status, 201);
        assert.notEqual(copy.data.id, resume.id);
        assert.deepEqual(copy.data.data, resume.data);
      },
    );
    await t.test(
      "members resume their last section after sign-in and can revoke all sessions",
      async () => {
        const changed = await request(
          "/v1/resumes/" + resume.id,
          "PATCH",
          { revision: resume.revision, last_section: "experience" },
          a,
        );
        assert.equal(changed.status, 200);
        resume = changed.data;
        const login = await request("/v1/auth/login", "POST", {
          email: "first@example.com",
          password: "testing-password-123",
          remember: false,
        });
        assert.equal(login.status, 200);
        assert.ok(!login.headers.get("Set-Cookie")!.includes("Max-Age"));
        const sessionCookie = login.headers.get("Set-Cookie")!.split(";")[0];
        const saved = await request(
          "/v1/resumes/" + resume.id,
          "GET",
          undefined,
          sessionCookie,
        );
        assert.equal(saved.data.last_section, "experience");
        assert.equal(saved.data.data.personal.name, "First User");
        const remembered = await request("/v1/auth/login", "POST", {
          email: "first@example.com",
          password: "testing-password-123",
          remember: true,
        });
        assert.match(remembered.headers.get("Set-Cookie")!, /Max-Age=604800/);
        const rememberedCookie = remembered.headers
          .get("Set-Cookie")!
          .split(";")[0];
        assert.equal(
          (await request("/v1/auth/logout-all", "POST", {}, sessionCookie))
            .status,
          200,
        );
        assert.equal(
          (await request("/v1/me", "GET", undefined, a)).status,
          401,
        );
        assert.equal(
          (await request("/v1/me", "GET", undefined, rememberedCookie)).status,
          401,
        );
        assert.equal(
          (await request("/v1/me", "GET", undefined, b)).status,
          200,
        );
        const again = await request("/v1/auth/login", "POST", {
          email: "first@example.com",
          password: "testing-password-123",
        });
        a = again.headers.get("Set-Cookie")!.split(";")[0];
        assert.equal(
          (await request("/v1/resumes/" + resume.id, "GET", undefined, a)).data
            .last_section,
          "experience",
        );
        assert.equal(
          (
            await request(
              "/v1/resumes/" + resume.id,
              "PATCH",
              { revision: resume.revision, last_section: "invalid" },
              a,
            )
          ).status,
          400,
        );
        assert.equal(
          (await request("/v1/admin/members", "GET", undefined, a)).status,
          403,
        );
        const admin = await request("/v1/auth/local", "POST", {});
        const list = await request(
          "/v1/admin/members",
          "GET",
          undefined,
          admin.headers.get("Set-Cookie")!.split(";")[0],
        );
        assert.equal(list.status, 200);
        const member = list.data.find((m: any) => m.id === aid);
        assert.equal(member.resume_count, 2);
        assert.ok(member.last_login_at);
        assert.ok(!("password" in member));
        assert.ok(!("data" in member));
      },
    );
    await t.test(
      "validation, premium access and role escalation are enforced",
      async () => {
        const invalid = sampleResume();
        invalid.experience[0].start = "not-a-month";
        assert.equal(
          (
            await request(
              "/v1/resumes",
              "POST",
              { title: "Invalid", data: invalid },
              a,
            )
          ).status,
          400,
        );
        assert.equal(
          (
            await request(
              "/v1/resumes",
              "POST",
              { title: "Premium", template_id: "ats-technical" },
              a,
            )
          ).status,
          403,
        );
        assert.equal(
          (await request("/v1/admin/templates", "GET", undefined, a)).status,
          403,
        );
        assert.equal(
          (await request("/v1/me", "PATCH", { admin: true }, a)).status,
          404,
        );
        const data = sampleResume();
        data.appearance.font = "serif";
        assert.equal(
          (await request("/v1/resumes", "POST", { title: "Advanced", data }, a))
            .status,
          403,
        );
      },
    );
    await t.test(
      "server-set order price, owner binding and retry idempotency",
      async () => {
        assert.equal(
          (
            await request(
              "/v1/orders",
              "POST",
              { plan: "pro", amount: 1, idempotency_key: randomUUID() },
              a,
            )
          ).status,
          400,
        );
        const key = randomUUID();
        const r = await request(
          "/v1/orders",
          "POST",
          { plan: "pro", idempotency_key: key },
          a,
        );
        assert.equal(r.status, 201);
        assert.equal(r.data.amount, 9900);
        order = r.data;
        const retry = await request(
          "/v1/orders",
          "POST",
          { plan: "pro", idempotency_key: key },
          a,
        );
        assert.equal(retry.data.id, order.id);
        assert.equal(
          (
            await request(
              "/v1/orders/" + order.id + "/simulate",
              "POST",
              { outcome: "captured" },
              b,
            )
          ).status,
          404,
        );
        assert.equal(
          (await request("/v1/orders/" + order.id, "GET", undefined, b)).status,
          404,
        );
      },
    );
    await t.test(
      "authorized payments do not unlock, signatures cannot be forged",
      async () => {
        const p = {
          id: "wrong",
          order_id: order.gateway_id,
          status: "authorized",
          amount: 9900,
          currency: "INR",
        };
        app.payments.fulfill(order.id, p);
        assert.equal(app.store.allowed(aid, "template.premium"), false);
        assert.throws(() =>
          app.payments.fulfill(order.id, {
            ...p,
            status: "captured",
            amount: 1,
          }),
        );
        assert.throws(() =>
          app.payments.fulfill(order.id, {
            ...p,
            status: "captured",
            currency: "USD",
          }),
        );
        assert.throws(() =>
          app.payments.fulfill(order.id, {
            ...p,
            status: "captured",
            order_id: "other",
          }),
        );
        const sig = signature("raw webhook", "test-secret");
        assert.ok(verifySignature("raw webhook", sig, "test-secret"));
        assert.equal(verifySignature("tampered", sig, "test-secret"), false);
        assert.equal(
          verifySignature("raw webhook", "nope", "test-secret"),
          false,
        );
      },
    );
    await t.test(
      "capture replay grants once; access is read from the server",
      async () => {
        const captured = await request(
          "/v1/orders/" + order.id + "/simulate",
          "POST",
          { outcome: "captured" },
          a,
        );
        assert.equal(captured.data.status, "fulfilled");
        const first = await request("/v1/me/entitlements", "GET", undefined, a);
        assert.equal(first.data.length, 3);
        await request(
          "/v1/orders/" + order.id + "/simulate",
          "POST",
          { outcome: "captured" },
          a,
        );
        const second = await request(
          "/v1/me/entitlements",
          "GET",
          undefined,
          a,
        );
        assert.deepEqual(first.data, second.data);
        const changed = await request(
          "/v1/resumes/" + resume.id,
          "PATCH",
          { revision: resume.revision, template_id: "ats-technical" },
          a,
        );
        assert.equal(changed.status, 200);
        assert.deepEqual(changed.data.data, resume.data);
        resume = changed.data;
      },
    );
    await t.test(
      "PDF export preserves a snapshot and protects downloads",
      async () => {
        const response = await request(
          "/v1/exports",
          "POST",
          {
            resume_id: resume.id,
            revision: resume.revision,
            idempotency_key: randomUUID(),
          },
          a,
        );
        assert.equal(response.status, 202);
        exportId = response.data.id;
        assert.equal(
          (await request("/v1/exports/" + exportId, "GET", undefined, b))
            .status,
          404,
        );
        let state: any;
        for (let i = 0; i < 60; i++) {
          state = await request("/v1/exports/" + exportId, "GET", undefined, a);
          if (["ready", "failed"].includes(state.data.status)) break;
          await new Promise((r) => setTimeout(r, 500));
        }
        assert.equal(state.data.status, "ready", JSON.stringify(state.data));
        const pdf = await request(
          "/v1/exports/" + exportId + "/download",
          "GET",
          undefined,
          a,
        );
        assert.equal(pdf.status, 200);
        assert.equal(Buffer.from(pdf.data).subarray(0, 5).toString(), "%PDF-");
        assert.equal(pdf.headers.get("Cache-Control"), "no-store");
        assert.ok(Buffer.from(pdf.data).length > 10000);
        assert.equal(
          (
            await request(
              "/v1/exports/" + exportId + "/download",
              "GET",
              undefined,
              b,
            )
          ).status,
          404,
        );
      },
    );
    await t.test(
      "full refund revokes access, replay cannot restore, data survives",
      async () => {
        await request(
          "/v1/orders/" + order.id + "/simulate",
          "POST",
          { outcome: "refunded" },
          a,
        );
        assert.equal(app.store.allowed(aid, "template.premium"), false);
        await request(
          "/v1/orders/" + order.id + "/simulate",
          "POST",
          { outcome: "captured" },
          a,
        );
        assert.equal(app.store.allowed(aid, "template.premium"), false);
        assert.equal(
          (
            await request(
              "/v1/exports/" + exportId + "/download",
              "GET",
              undefined,
              a,
            )
          ).status,
          403,
        );
        const existing = await request(
          "/v1/resumes/" + resume.id,
          "GET",
          undefined,
          a,
        );
        assert.equal(existing.status, 200);
        const changed = await request(
          "/v1/resumes/" + resume.id,
          "PATCH",
          { revision: resume.revision, template_id: "the-standard" },
          a,
        );
        assert.equal(changed.status, 200);
        assert.deepEqual(changed.data.data, resume.data);
        resume = changed.data;
      },
    );
    await t.test(
      "concurrent real purchases extend once each and expired grants deny",
      async () => {
        const one = await app.payments.create(aid, randomUUID()),
          two = await app.payments.create(aid, randomUUID());
        await Promise.all([
          Promise.resolve().then(() =>
            app.payments.fulfill(one.id, {
              id: "concurrent-one",
              order_id: one.gateway_id,
              status: "captured",
              amount: 9900,
              currency: "INR",
            }),
          ),
          Promise.resolve().then(() =>
            app.payments.fulfill(two.id, {
              id: "concurrent-two",
              order_id: two.gateway_id,
              status: "captured",
              amount: 9900,
              currency: "INR",
            }),
          ),
        ]);
        const grants = app.store.all(
          "SELECT * FROM entitlements WHERE user_id=? AND feature='template.premium' AND revoked_at IS NULL ORDER BY starts_at",
          aid,
        );
        assert.equal(grants.length, 2);
        assert.equal(grants[0].expires_at, grants[1].starts_at);
        assert.equal(grants[1].expires_at - grants[0].starts_at, 14 * 86400000);
        app.store.run(
          "UPDATE entitlements SET expires_at=? WHERE user_id=?",
          Date.now() - 1,
          aid,
        );
        assert.equal(app.store.allowed(aid, "template.premium"), false);
      },
    );
    await t.test(
      "admin publication versions configs and rejects executable uploads",
      async () => {
        const local = await request("/v1/auth/local", "POST", {});
        const cookie = local.headers.get("Set-Cookie")!.split(";")[0];
        const tpl = app.store.template("ats-essential")!;
        const invalid = await request(
          "/v1/admin/templates",
          "POST",
          {
            id: "test-design",
            name: "Test Design",
            access: "free",
            category: "Professional",
            status: "draft",
            config: {
              ...tpl.config,
              accent: "red; background:url(https://evil)",
            },
          },
          cookie,
        );
        assert.equal(invalid.status, 400);
        const valid = await request(
          "/v1/admin/templates",
          "POST",
          {
            id: "test-design",
            name: "Test Design",
            access: "free",
            category: "Professional",
            status: "draft",
            config: tpl.config,
          },
          cookie,
        );
        assert.equal(valid.status, 201);
        assert.equal(valid.data.version, 1);
        assert.equal(
          (await request("/v1/templates")).data.some(
            (x: any) => x.id === "test-design",
          ),
          false,
        );
      },
    );
    await t.test(
      "deletion clears owner content and invalidates sessions",
      async () => {
        await request(
          "/v1/resumes",
          "POST",
          { title: "Second user draft", data: sampleResume() },
          b,
        );
        assert.equal(
          (await request("/v1/me", "DELETE", { confirm: "DELETE" }, b)).status,
          200,
        );
        assert.equal(
          (await request("/v1/me", "GET", undefined, b)).status,
          401,
        );
        assert.equal(
          app.store.get("SELECT COUNT(*) n FROM resumes WHERE user_id=?", bid)
            .n,
          0,
        );
      },
    );
  } finally {
    await app.close();
    rmSync(dir, { recursive: true, force: true });
  }
});
test("render escapes content and rejects active URL schemes", () => {
  const data = sampleResume();
  data.personal.name = "<script>alert(1)</script>";
  data.personal.portfolio = "javascript:alert(1)";
  const dir = mkdtempSync(join(tmpdir(), "ipd-render-test-"));
  const app = createApp({
    dbPath: join(dir, "db.sqlite"),
    artifactPath: join(dir, "out"),
  });
  const html = renderResume(data, app.store.template("ats-essential")!.config);
  assert.ok(!html.includes("<script>"));
  assert.match(html, /&lt;script&gt;/);
  assert.equal(safeLink("javascript:alert(1)"), "");
  assert.equal(safeLink("https://example.com"), "https://example.com/");
  assert.ok(!html.includes('href="javascript:'));
  app.store.db.close();
  rmSync(dir, { recursive: true, force: true });
});
test("schema supports custom sections and catches invalid limits", () => {
  const d = blankResume();
  d.customSections = [
    {
      id: "custom-volunteer",
      heading: "Volunteering",
      title: "Community volunteer",
      bullets: ["Organized community events."],
    },
  ];
  d.sectionOrder.push("custom-volunteer");
  assert.equal(validateResume(d), d);
  d.summary = "x".repeat(5001);
  assert.throws(() => validateResume(d));
});

test("Razorpay test adapter verifies callbacks, durable webhooks and out-of-order refunds with a fake provider", async () => {
  const dir = mkdtempSync(join(tmpdir(), "ipd-gateway-test-"));
  const previous = Object.fromEntries(
    [
      "RESUME_PAYMENT_MODE",
      "RAZORPAY_KEY_ID",
      "RAZORPAY_KEY_SECRET",
      "RAZORPAY_WEBHOOK_SECRET",
    ].map((k) => [k, process.env[k]]),
  );
  process.env.RESUME_PAYMENT_MODE = "razorpay_test";
  process.env.RAZORPAY_KEY_ID = "rzp_test_fixture";
  process.env.RAZORPAY_KEY_SECRET = "fixture-key-secret";
  process.env.RAZORPAY_WEBHOOK_SECRET = "fixture-webhook-secret";
  const app = createApp({
    dbPath: join(dir, "db.sqlite"),
    artifactPath: join(dir, "out"),
  });
  for (const [k, v] of Object.entries(previous)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
  await new Promise<void>((r) => app.server.listen(0, "127.0.0.1", r));
  const base =
    "http://127.0.0.1:" + (app.server.address() as { port: number }).port;
  const provider = new Map<string, any>();
  app.payments.gateway = async (path: string, body?: any) => {
    if (path === "orders") return { id: "provider_" + body.receipt };
    if (path.startsWith("payments/")) {
      const payment = provider.get(path.slice(9));
      if (!payment) throw Error("Provider unavailable");
      return structuredClone(payment);
    }
    throw Error("Unexpected provider path");
  };
  try {
    const login = await fetch(base + "/v1/auth/local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });
    const cookie = login.headers.get("Set-Cookie")!.split(";")[0];
    const user = (await login.json()) as any;
    const order = await app.payments.create(user.id, randomUUID());
    const payment = {
      id: "provider_payment_1",
      order_id: order.gateway_id,
      status: "captured",
      amount: 9900,
      currency: "INR",
      amount_refunded: 0,
    };
    provider.set(payment.id, payment);
    const callback = async (sig: string) =>
      fetch(base + "/v1/orders/" + order.id + "/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json", Cookie: cookie },
        body: JSON.stringify({
          razorpay_payment_id: payment.id,
          razorpay_order_id: "untrusted-client-id",
          razorpay_signature: sig,
        }),
      });
    assert.equal((await callback("bad")).status, 400);
    assert.equal(
      (
        await callback(
          signature(order.gateway_id + "|" + payment.id, "fixture-key-secret"),
        )
      ).status,
      200,
    );
    assert.equal(app.store.allowed(user.id, "template.premium"), true);
    const event = {
      event: "payment.captured",
      payload: { payment: { entity: payment } },
    };
    const raw = JSON.stringify(event);
    const webhook = async (body: string, sig: string, id: string) =>
      fetch(base + "/v1/webhooks/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-razorpay-signature": sig,
          "x-razorpay-event-id": id,
        },
        body,
      });
    assert.equal((await webhook(raw, "invalid", "event-invalid")).status, 400);
    const sig = signature(raw, "fixture-webhook-secret");
    assert.equal((await webhook(raw, sig, "event-capture")).status, 200);
    assert.equal((await webhook(raw, sig, "event-capture")).status, 200);
    await new Promise((r) => setTimeout(r, 25));
    assert.equal(
      app.store.get(
        "SELECT COUNT(*) n FROM webhook_events WHERE id='event-capture'",
      ).n,
      1,
    );
    assert.equal(
      app.store.get(
        "SELECT COUNT(*) n FROM entitlements WHERE user_id=?",
        user.id,
      ).n,
      3,
    );
    const second = await app.payments.create(user.id, randomUUID());
    const refunded = {
      id: "provider_payment_refund_first",
      order_id: second.gateway_id,
      status: "refunded",
      amount: 9900,
      currency: "INR",
      amount_refunded: 9900,
    };
    provider.set(refunded.id, refunded);
    await app.payments.processEvent({
      event: "refund.processed",
      payload: {
        refund: { entity: { payment_id: refunded.id, amount: 9900 } },
      },
    });
    assert.equal(
      app.store.get("SELECT status FROM orders WHERE id=?", second.id).status,
      "refunded",
    );
    app.payments.fulfill(second.id, {
      ...refunded,
      status: "captured",
      amount_refunded: 0,
    });
    assert.equal(
      app.store.get(
        "SELECT COUNT(*) n FROM entitlements WHERE payment_id=?",
        refunded.id,
      ).n,
      0,
    );
    // Expiry/refund of one purchase must not invalidate a different valid pass.
    assert.equal(app.store.allowed(user.id, "template.premium"), true);
    // A second captured payment for one fulfilled order is recorded for review.
    app.payments.fulfill(order.id, { ...payment, id: "provider_duplicate" });
    assert.equal(
      app.store.get("SELECT status FROM payments WHERE id='provider_duplicate'")
        .status,
      "duplicate_review",
    );
    assert.equal(
      app.store.get(
        "SELECT COUNT(*) n FROM entitlements WHERE user_id=?",
        user.id,
      ).n,
      3,
    );
    // Provider timeouts retain one pending order across request retries.
    app.payments.gateway = async () => {
      throw Error("Provider timeout");
    };
    const retryKey = randomUUID();
    await assert.rejects(app.payments.create(user.id, retryKey));
    const pending = await app.payments.create(user.id, retryKey);
    assert.equal(pending.status, "pending");
    assert.equal(
      app.store.get(
        "SELECT COUNT(*) n FROM orders WHERE user_id=? AND idempotency_key=?",
        user.id,
        retryKey,
      ).n,
      1,
    );
    const retryRaw = JSON.stringify({
      event: "payment.captured",
      payload: {
        payment: { entity: { ...payment, id: "temporarily_unavailable" } },
      },
    });
    await webhook(
      retryRaw,
      signature(retryRaw, "fixture-webhook-secret"),
      "event-retry",
    );
    await new Promise((r) => setTimeout(r, 25));
    assert.equal(
      app.store.get("SELECT state FROM webhook_events WHERE id='event-retry'")
        .state,
      "retry",
    );
  } finally {
    await app.close();
    rmSync(dir, { recursive: true, force: true });
  }
});
