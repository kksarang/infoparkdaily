import { createHmac, timingSafeEqual, randomUUID } from "node:crypto";
import type { Store } from "./store.ts";
export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
export const features = [
  "template.premium",
  "export.premium_pdf",
  "customize.advanced",
];
export function signature(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}
export function verifySignature(
  value: string,
  provided: string,
  secret: string,
) {
  if (!/^[a-f0-9]{64}$/i.test(provided)) return false;
  return timingSafeEqual(
    Buffer.from(signature(value, secret), "hex"),
    Buffer.from(provided, "hex"),
  );
}
export class Payments {
  store: Store;
  mode: string;
  key: string;
  secret: string;
  webhookSecret: string;
  constructor(store: Store) {
    this.store = store;
    this.mode = process.env.RESUME_PAYMENT_MODE || "local";
    this.key = process.env.RAZORPAY_KEY_ID || "";
    this.secret = process.env.RAZORPAY_KEY_SECRET || "";
    this.webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "";
    if (!["local", "razorpay_test"].includes(this.mode))
      throw Error("Live payments are disabled in this local build.");
    if (
      this.mode === "razorpay_test" &&
      (!this.key.startsWith("rzp_test_") || !this.secret || !this.webhookSecret)
    )
      throw Error("Razorpay test credentials are required.");
  }
  async gateway(path: string, body?: unknown) {
    const r = await fetch("https://api.razorpay.com/v1/" + path, {
      method: body ? "POST" : "GET",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${this.key}:${this.secret}`).toString("base64"),
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(15000),
    });
    if (!r.ok)
      throw new HttpError(
        502,
        "The payment provider is unavailable. Please check this order again before retrying.",
      );
    return r.json() as Promise<any>;
  }
  async create(user: string, key: string) {
    if (!/^[a-zA-Z0-9_-]{8,100}$/.test(key))
      throw new HttpError(400, "A valid checkout reference is required.");
    const existing = this.store.get(
      "SELECT * FROM orders WHERE user_id=? AND idempotency_key=?",
      user,
      key,
    );
    if (existing) return existing;
    const id = randomUUID();
    this.store.run(
      "INSERT INTO orders VALUES(?,?,?,?,?,?,?,?,?,?,?)",
      id,
      user,
      "pro",
      9900,
      "INR",
      7 * 86400000,
      null,
      this.mode,
      "creating",
      key,
      Date.now(),
    );
    try {
      const gatewayId =
        this.mode === "local"
          ? "local_" + id
          : (
              await this.gateway("orders", {
                amount: 9900,
                currency: "INR",
                receipt: id,
              })
            ).id;
      this.store.run(
        "UPDATE orders SET gateway_id=?,status='created' WHERE id=?",
        gatewayId,
        id,
      );
    } catch (e) {
      this.store.run("UPDATE orders SET status='pending' WHERE id=?", id);
      throw e;
    }
    this.store.event("resume_checkout_started", id, this.mode);
    return this.store.get("SELECT * FROM orders WHERE id=?", id);
  }
  fulfill(orderId: string, payment: any) {
    return this.store.transaction(() => {
      const o = this.store.get("SELECT * FROM orders WHERE id=?", orderId);
      if (!o) throw new HttpError(404, "Order not found.");
      if (
        payment.order_id !== o.gateway_id ||
        payment.amount !== o.amount ||
        payment.currency !== o.currency
      )
        throw new HttpError(400, "Payment does not match the order.");
      const old = this.store.get(
        "SELECT * FROM payments WHERE id=?",
        payment.id,
      );
      if (old && old.order_id !== o.id)
        throw new HttpError(400, "Payment belongs to another order.");
      // A reversal observed by verification/reconciliation wins over an older
      // capture event. Record the payment even if it was never fulfilled.
      if (payment.amount_refunded > 0 || payment.status === "refunded") {
        const refunded = payment.amount_refunded || payment.amount;
        const full = refunded >= payment.amount;
        this.store.run(
          "INSERT INTO payments VALUES(?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET status=excluded.status,refunded=MAX(payments.refunded,excluded.refunded)",
          payment.id,
          o.id,
          full ? "refunded" : "review",
          payment.amount,
          refunded,
          Date.now(),
        );
        this.store.run(
          "UPDATE orders SET status=? WHERE id=?",
          full ? "refunded" : "review",
          o.id,
        );
        if (full)
          this.store.run(
            "UPDATE entitlements SET revoked_at=? WHERE payment_id=?",
            Date.now(),
            payment.id,
          );
        return this.store.get("SELECT * FROM orders WHERE id=?", o.id);
      }
      if (payment.status !== "captured" || old) return o;
      this.store.run(
        "INSERT INTO payments VALUES(?,?,?,?,?,?)",
        payment.id,
        o.id,
        payment.amount_refunded ? "review" : "captured",
        payment.amount,
        payment.amount_refunded || 0,
        Date.now(),
      );
      if (
        payment.amount_refunded ||
        o.status === "refunded" ||
        o.status === "disputed" ||
        o.status === "review"
      ) {
        this.store.run(
          "UPDATE payments SET status='review' WHERE id=?",
          payment.id,
        );
        return o;
      }
      if (o.status === "fulfilled") {
        this.store.run(
          "UPDATE payments SET status='duplicate_review' WHERE id=?",
          payment.id,
        );
        return o;
      }
      const now = Date.now();
      for (const feature of features) {
        const last = this.store.get(
          "SELECT MAX(expires_at) AS expiry FROM entitlements WHERE user_id=? AND feature=? AND revoked_at IS NULL",
          o.user_id,
          feature,
        );
        const start = Math.max(now, last?.expiry || 0);
        this.store.run(
          "INSERT INTO entitlements VALUES(?,?,?,?,?,?,NULL)",
          randomUUID(),
          o.user_id,
          feature,
          payment.id,
          start,
          start + o.duration,
        );
      }
      this.store.run("UPDATE orders SET status='fulfilled' WHERE id=?", o.id);
      this.store.event("resume_payment_successful", o.id, o.mode);
      return this.store.get("SELECT * FROM orders WHERE id=?", o.id);
    });
  }
  revoke(paymentId: string, amount: number, dispute = false) {
    this.store.transaction(() => {
      const p = this.store.get("SELECT * FROM payments WHERE id=?", paymentId);
      if (!p) return;
      const full = amount >= p.amount || dispute;
      this.store.run(
        "UPDATE payments SET status=?,refunded=? WHERE id=?",
        dispute ? "disputed" : full ? "refunded" : "review",
        amount,
        paymentId,
      );
      this.store.run(
        "UPDATE orders SET status=? WHERE id=?",
        dispute ? "disputed" : full ? "refunded" : "review",
        p.order_id,
      );
      if (full)
        this.store.run(
          "UPDATE entitlements SET revoked_at=? WHERE payment_id=?",
          Date.now(),
          paymentId,
        );
    });
  }
  async verify(order: any, body: any) {
    if (this.mode !== "razorpay_test")
      throw new HttpError(400, "Use the local test checkout for this order.");
    if (
      !verifySignature(
        order.gateway_id + "|" + body.razorpay_payment_id,
        body.razorpay_signature || "",
        this.secret,
      )
    )
      throw new HttpError(400, "Payment signature could not be verified.");
    const p = await this.gateway(
      "payments/" + encodeURIComponent(body.razorpay_payment_id),
    );
    return this.fulfill(order.id, p);
  }
  async processEvent(event: any) {
    const entity = event.payload?.payment?.entity;
    const refund = event.payload?.refund?.entity;
    const dispute = event.payload?.dispute?.entity;
    if (refund?.payment_id || dispute?.payment_id) {
      const pid = refund?.payment_id || dispute.payment_id;
      const p = await this.gateway("payments/" + encodeURIComponent(pid));
      const o = this.store.get(
        "SELECT * FROM orders WHERE gateway_id=?",
        p.order_id,
      );
      if (o && !this.store.get("SELECT id FROM payments WHERE id=?", pid))
        this.fulfill(o.id, {
          ...p,
          amount_refunded: refund
            ? Math.max(p.amount_refunded || 0, refund.amount)
            : p.amount,
        });
      this.revoke(pid, p.amount_refunded || refund?.amount || 0, !!dispute);
      return;
    }
    if (
      entity?.id &&
      ["payment.captured", "order.paid"].includes(event.event)
    ) {
      const o = this.store.get(
        "SELECT * FROM orders WHERE gateway_id=?",
        entity.order_id,
      );
      if (o) {
        const p = await this.gateway(
          "payments/" + encodeURIComponent(entity.id),
        );
        this.fulfill(o.id, p);
      }
    }
  }
  async reconcile() {
    if (this.mode !== "razorpay_test") return;
    for (const o of this.store.all(
      "SELECT * FROM orders WHERE status IN ('creating','created','pending') ORDER BY created_at LIMIT 30",
    )) {
      try {
        let gatewayId = o.gateway_id;
        if (!gatewayId) {
          const response = await this.gateway(
            "orders?receipt=" + encodeURIComponent(o.id),
          );
          const match = response.items?.filter((x: any) => x.receipt === o.id);
          if (match?.length === 1) {
            gatewayId = match[0].id;
            this.store.run(
              "UPDATE orders SET gateway_id=? WHERE id=?",
              gatewayId,
              o.id,
            );
          } else continue;
        }
        const list = await this.gateway(
          "orders/" + encodeURIComponent(gatewayId) + "/payments",
        );
        for (const p of list.items || [])
          if (p.status === "captured") this.fulfill(o.id, p);
      } catch {
        /* Order stays pending for a later verified retry. */
      }
    }
  }
}
