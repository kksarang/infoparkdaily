import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";
import {
  readFileSync,
  existsSync,
  statSync,
  realpathSync,
  unlinkSync,
} from "node:fs";
import { resolve, join, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import {
  randomBytes,
  randomUUID,
  scryptSync,
  timingSafeEqual,
  createHash,
} from "node:crypto";
import { Store, resumeResult } from "./store.ts";
import { Payments, HttpError, verifySignature } from "./payments.ts";
import { Renderer } from "../resume-worker/worker.ts";
import { validateConfig, type Template } from "./catalog.ts";
import {
  sections,
  blankResume,
  sampleResume,
  validateResume,
  exportable,
} from "../../js/resume-builder/schema.js";
import { renderResume } from "../../js/resume-builder/render.js";
const root = resolve(fileURLToPath(new URL("../../", import.meta.url)));
const sha = (s: string) => createHash("sha256").update(s).digest("hex");
const passwordHash = (
  password: string,
  salt = randomBytes(16).toString("hex"),
) => salt + ":" + scryptSync(password, salt, 64).toString("hex");
const passwordValid = (password: string, hash: string) => {
  const parts = (hash || "").split(":");
  if (parts.length !== 2) return false;
  const actual = passwordHash(password, parts[0]).split(":")[1];
  return timingSafeEqual(
    Buffer.from(actual, "hex"),
    Buffer.from(parts[1], "hex"),
  );
};
function publicTemplate(t: Template) {
  const { config, ...meta } = t;
  return {
    ...meta,
    thumbnail: `/v1/templates/${t.id}/thumbnail?v=${t.version}`,
    ...(t.access === "free" ? { config } : {}),
  };
}
const mime: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".webp": "image/webp",
  ".txt": "text/plain",
  ".xml": "application/xml",
};
export function createApp(
  options: { dbPath?: string; artifactPath?: string; port?: number } = {},
) {
  if (process.env.NODE_ENV === "production")
    throw Error(
      "This build is local-only. Complete the production integration checklist before deployment.",
    );
  const store = new Store(
    options.dbPath || join(root, ".local/resume-builder.sqlite"),
  );
  const payments = new Payments(store);
  const renderer = new Renderer(
    store,
    options.artifactPath || join(root, ".local/artifacts"),
  );
  const rates = new Map<string, { count: number; until: number }>();
  const processingEvents = new Set<string>();
  let reconciling = false;
  function user(req: IncomingMessage) {
    const token = req.headers.cookie?.match(
      /(?:^|;\s*)ipd_resume_session=([a-f0-9]+)/,
    )?.[1];
    return token
      ? store.get(
          "SELECT u.* FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.token=? AND s.expires_at>?",
          sha(token),
          Date.now(),
        )
      : undefined;
  }
  function session(res: ServerResponse, id: string, remember = false) {
    store.run("UPDATE users SET last_login_at=? WHERE id=?", Date.now(), id);
    const token = randomBytes(32).toString("hex");
    store.run(
      "INSERT INTO sessions VALUES(?,?,?)",
      sha(token),
      id,
      Date.now() + (remember ? 7 * 86400000 : 12 * 3600000),
    );
    res.setHeader(
      "Set-Cookie",
      `ipd_resume_session=${token}; HttpOnly; SameSite=Strict; Path=/${remember ? "; Max-Age=604800" : ""}`,
    );
  }
  function send(res: ServerResponse, status: number, data: any) {
    res.writeHead(status, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    });
    res.end(JSON.stringify(data));
  }
  function file(res: ServerResponse, path: string, privateFile = false) {
    res.writeHead(200, {
      "Content-Type": mime[extname(path)] || "application/octet-stream",
      "Cache-Control": privateFile ? "no-store" : "no-cache",
    });
    res.end(readFileSync(path));
  }
  async function body(req: IncomingMessage, raw = false) {
    const chunks: Buffer[] = [];
    let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > 300000) throw new HttpError(413, "This request is too large.");
      chunks.push(chunk);
    }
    const s = Buffer.concat(chunks).toString("utf8");
    if (raw) return s;
    try {
      return s ? JSON.parse(s) : {};
    } catch {
      throw new HttpError(400, "Invalid request data.");
    }
  }
  function own(table: string, id: string, uid: string) {
    const row = store.get(
      `SELECT * FROM ${table} WHERE id=? AND user_id=?`,
      id,
      uid,
    );
    if (!row) throw new HttpError(404, "Item not found.");
    return row;
  }
  function templateAccess(
    t: Template | undefined,
    uid: string,
    feature = "template.premium",
  ) {
    if (!t || t.status === "withdrawn")
      throw new HttpError(404, "Template unavailable.");
    if (t.access === "premium" && !store.allowed(uid, feature))
      throw new HttpError(
        403,
        "This template needs an active Pro Pass. Your content is safe; you can also choose a free template.",
      );
    return t;
  }
  function title(value: any) {
    if (typeof value !== "string" || !value.trim() || value.length > 120)
      throw new HttpError(
        400,
        "Use a resume title between 1 and 120 characters.",
      );
    return value.trim();
  }
  function checkAppearance(data: any, uid: string) {
    if (
      (data.appearance.font !== "default" ||
        data.appearance.density !== "standard") &&
      !store.allowed(uid, "customize.advanced")
    )
      throw new HttpError(
        403,
        "Advanced typography needs an active Pro Pass. Select the default font and standard spacing.",
      );
  }
  async function processWebhookRow(row: any) {
    if (processingEvents.has(row.id)) return;
    processingEvents.add(row.id);
    try {
      await payments.processEvent(JSON.parse(row.payload));
      store.run(
        "UPDATE webhook_events SET state='processed',payload='{}',error=NULL WHERE id=?",
        row.id,
      );
    } catch {
      store.run(
        "UPDATE webhook_events SET state=CASE WHEN attempts>=7 THEN 'failed' ELSE 'retry' END,attempts=attempts+1,error='Provider verification failed' WHERE id=?",
        row.id,
      );
    } finally {
      processingEvents.delete(row.id);
    }
  }
  const server = createServer(async (req, res) => {
    try {
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Referrer-Policy", "same-origin");
      res.setHeader("X-Frame-Options", "SAMEORIGIN");
      const hostname = (req.headers.host || "").split(":")[0];
      if (!["localhost", "127.0.0.1"].includes(hostname))
        throw new HttpError(
          403,
          "This preview is available only on localhost.",
        );
      const url = new URL(req.url || "/", "http://" + req.headers.host);
      const path = decodeURIComponent(url.pathname);
      const method = req.method || "GET";
      const isApi = path.startsWith("/v1/");
      if (isApi) {
        res.setHeader("Cache-Control", "no-store");
        if (
          !["GET", "HEAD"].includes(method) &&
          path !== "/v1/webhooks/razorpay"
        ) {
          const origin = req.headers.origin;
          if (origin && origin !== url.origin)
            throw new HttpError(403, "Request origin is not allowed.");
          if (req.headers["sec-fetch-site"] === "cross-site")
            throw new HttpError(403, "Cross-site requests are not allowed.");
          if (
            !String(req.headers["content-type"] || "").startsWith(
              "application/json",
            )
          )
            throw new HttpError(415, "Send JSON request data.");
        }
        const rateKey =
          (req.socket.remoteAddress || "local") +
          (path.startsWith("/v1/auth/") ? ":auth" : ":api");
        const limit = path.startsWith("/v1/auth/") ? 40 : 1500;
        const rate = rates.get(rateKey) || {
          count: 0,
          until: Date.now() + 60000,
        };
        if (rate.until < Date.now()) {
          rate.count = 0;
          rate.until = Date.now() + 60000;
        }
        rate.count++;
        rates.set(rateKey, rate);
        if (rate.count > limit)
          throw new HttpError(429, "Please wait a minute before trying again.");
      }
      if (path === "/v1/config")
        return send(res, 200, {
          mode: "local",
          payments: payments.mode,
          key_id: payments.mode === "razorpay_test" ? payments.key : null,
          liveEnabled: false,
        });
      if (path === "/v1/health")
        return send(res, 200, { ok: true, mode: "local" });
      if (path === "/v1/templates" && method === "GET")
        return send(res, 200, store.templates().map(publicTemplate));
      const thumb = path.match(/^\/v1\/templates\/([a-z0-9-]+)\/thumbnail$/);
      if (thumb) {
        const t = store.template(thumb[1]);
        if (!t || t.status !== "published")
          throw new HttpError(404, "Template not found.");
        return file(res, await renderer.thumbnail(t));
      }
      if (path === "/v1/auth/local" && method === "POST") {
        const email = "preview@infoparkdaily.local";
        let u = store.get("SELECT * FROM users WHERE email=?", email);
        if (!u) {
          store.run(
            "INSERT INTO users(id,email,name,password,admin,created_at) VALUES(?,?,?,?,?,?)",
            randomUUID(),
            email,
            "Local preview",
            null,
            1,
            Date.now(),
          );
          u = store.get("SELECT * FROM users WHERE email=?", email);
        }
        session(res, u.id);
        return send(res, 200, {
          id: u.id,
          name: u.name,
          email: u.email,
          admin: !!u.admin,
        });
      }
      if (
        (path === "/v1/auth/signup" || path === "/v1/auth/login") &&
        method === "POST"
      ) {
        const b = await body(req);
        const email = String(b.email || "")
          .trim()
          .toLowerCase();
        const password = String(b.password || "");
        if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
          email.length > 254 ||
          password.length < 10 ||
          password.length > 128
        )
          throw new HttpError(
            400,
            "Enter a valid email and a password of 10–128 characters.",
          );
        let u = store.get("SELECT * FROM users WHERE email=?", email);
        if (path.endsWith("signup")) {
          if (u)
            throw new HttpError(
              400,
              "Unable to create this account. Try signing in.",
            );
          const name = String(b.name || "").trim();
          if (!name || name.length > 100)
            throw new HttpError(400, "Enter your name (up to 100 characters).");
          store.run(
            "INSERT INTO users(id,email,name,password,admin,created_at) VALUES(?,?,?,?,?,?)",
            randomUUID(),
            email,
            name,
            passwordHash(password),
            0,
            Date.now(),
          );
          u = store.get("SELECT * FROM users WHERE email=?", email);
        } else if (!u || !passwordValid(password, u.password))
          throw new HttpError(401, "Email or password is incorrect.");
        session(res, u.id, b.remember === true);
        return send(res, 200, {
          id: u.id,
          name: u.name,
          email: u.email,
          admin: !!u.admin,
        });
      }
      if (path === "/v1/webhooks/razorpay" && method === "POST") {
        if (payments.mode !== "razorpay_test")
          throw new HttpError(
            404,
            "Webhook is unavailable in local simulation mode.",
          );
        const raw = (await body(req, true)) as string;
        if (
          !verifySignature(
            raw,
            String(req.headers["x-razorpay-signature"] || ""),
            payments.webhookSecret,
          )
        )
          throw new HttpError(400, "Invalid webhook signature.");
        let event;
        try {
          event = JSON.parse(raw);
        } catch {
          throw new HttpError(400, "Invalid event.");
        }
        const id = String(req.headers["x-razorpay-event-id"] || "");
        if (!id || id.length > 200)
          throw new HttpError(400, "Missing event reference.");
        store.run(
          "INSERT OR IGNORE INTO webhook_events VALUES(?,?,?,'received',0,NULL,?)",
          id,
          event.event,
          raw,
          Date.now(),
        );
        void processWebhookRow(
          store.get("SELECT * FROM webhook_events WHERE id=?", id),
        );
        return send(res, 200, { received: true });
      }
      const u = user(req);
      if (isApi) {
        if (!u) throw new HttpError(401, "Sign in to continue.");
        if (path === "/v1/me" && method === "GET")
          return send(res, 200, {
            id: u.id,
            name: u.name,
            email: u.email,
            admin: !!u.admin,
            entitlements: store.entitlements(u.id),
            mode: "local",
          });
        if (path === "/v1/me/entitlements")
          return send(res, 200, store.entitlements(u.id));
        if (path === "/v1/auth/logout" && method === "POST") {
          const token = req.headers.cookie?.match(
            /ipd_resume_session=([a-f0-9]+)/,
          )?.[1];
          if (token)
            store.run("DELETE FROM sessions WHERE token=?", sha(token));
          res.setHeader(
            "Set-Cookie",
            "ipd_resume_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0",
          );
          return send(res, 200, { ok: true });
        }
        if (path === "/v1/auth/logout-all" && method === "POST") {
          store.run("DELETE FROM sessions WHERE user_id=?", u.id);
          res.setHeader(
            "Set-Cookie",
            "ipd_resume_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0",
          );
          return send(res, 200, { ok: true });
        }
        if (path === "/v1/me/data" && method === "GET") {
          res.setHeader(
            "Content-Disposition",
            'attachment; filename="my-infoparkdaily-resumes.json"',
          );
          return send(res, 200, {
            profile: { name: u.name, email: u.email },
            resumes: store
              .all("SELECT * FROM resumes WHERE user_id=?", u.id)
              .map(resumeResult),
          });
        }
        if (path === "/v1/me" && method === "DELETE") {
          const b = await body(req);
          if (b.confirm !== "DELETE")
            throw new HttpError(400, "Type DELETE to confirm.");
          for (const e of store.all(
            "SELECT path FROM exports WHERE user_id=?",
            u.id,
          ))
            if (e.path && existsSync(e.path)) unlinkSync(e.path);
          store.run("DELETE FROM users WHERE id=?", u.id);
          res.setHeader(
            "Set-Cookie",
            "ipd_resume_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0",
          );
          return send(res, 200, { ok: true });
        }
        if (path === "/v1/resumes" && method === "GET")
          return send(
            res,
            200,
            store
              .all(
                "SELECT * FROM resumes WHERE user_id=? ORDER BY updated_at DESC",
                u.id,
              )
              .map(resumeResult),
          );
        if (path === "/v1/resumes" && method === "POST") {
          const b = await body(req);
          if (
            store.get("SELECT COUNT(*) n FROM resumes WHERE user_id=?", u.id)
              .n >= 20
          )
            throw new HttpError(
              400,
              "Your account can save up to 20 resumes. Delete a draft to create another.",
            );
          const t = templateAccess(
            store.template(b.template_id || "ats-essential"),
            u.id,
          );
          if (t.status !== "published")
            throw new HttpError(
              404,
              "This template is no longer available for new resumes.",
            );
          const data = validateResume(b.data || blankResume());
          checkAppearance(data, u.id);
          const id = randomUUID();
          const jobId = b.job_id ? String(b.job_id).slice(0, 150) : null;
          store.run(
            "INSERT INTO resumes(id,user_id,title,data,template_id,template_version,revision,job_id,created_at,updated_at) VALUES(?,?,?,?,?,?,1,?,?,?)",
            id,
            u.id,
            title(b.title || "Untitled resume"),
            JSON.stringify(data),
            t.id,
            t.version,
            jobId,
            Date.now(),
            Date.now(),
          );
          store.event("resume_created", id);
          return send(res, 201, resumeResult(own("resumes", id, u.id)));
        }
        const match = path.match(/^\/v1\/resumes\/([^/]+)(?:\/(duplicate))?$/);
        if (match) {
          const r = own("resumes", match[1], u.id);
          if (match[2] === "duplicate" && method === "POST") {
            if (
              store.get("SELECT COUNT(*) n FROM resumes WHERE user_id=?", u.id)
                .n >= 20
            )
              throw new HttpError(400, "You have reached the 20 resume limit.");
            const id = randomUUID();
            store.run(
              "INSERT INTO resumes(id,user_id,title,data,template_id,template_version,revision,job_id,created_at,updated_at) VALUES(?,?,?,?,?,?,1,?,?,?)",
              id,
              u.id,
              (r.title + " (copy)").slice(0, 120),
              r.data,
              r.template_id,
              r.template_version,
              r.job_id,
              Date.now(),
              Date.now(),
            );
            return send(res, 201, resumeResult(own("resumes", id, u.id)));
          }
          if (method === "GET") {
            const selected = store.template(r.template_id, r.template_version);
            return send(res, 200, {
              ...resumeResult(r),
              template: selected ? publicTemplate(selected) : null,
            });
          }
          if (method === "DELETE") {
            for (const e of store.all(
              "SELECT path FROM exports WHERE resume_id=?",
              r.id,
            ))
              if (e.path && existsSync(e.path)) unlinkSync(e.path);
            store.run(
              "DELETE FROM resumes WHERE id=? AND user_id=?",
              r.id,
              u.id,
            );
            return send(res, 200, { ok: true });
          }
          if (method === "PATCH") {
            const b = await body(req);
            if (b.revision !== r.revision)
              throw new HttpError(
                409,
                "This resume changed in another tab. Keep your edits as a copy or reload the saved version.",
              );
            const data = validateResume(b.data ?? JSON.parse(r.data));
            const t =
              b.template_id && b.template_id !== r.template_id
                ? templateAccess(store.template(b.template_id), u.id)
                : store.template(r.template_id, r.template_version);
            if (!t) throw new HttpError(404, "Template unavailable.");
            if (!store.allowed(u.id, "customize.advanced")) {
              const previous = JSON.parse(r.data);
              if (
                data.appearance.font !== previous.appearance.font ||
                data.appearance.density !== previous.appearance.density
              )
                checkAppearance(data, u.id);
            }
            const lastSection = b.last_section ?? r.last_section;
            if (![...Object.keys(sections), "appearance"].includes(lastSection))
              throw new HttpError(400, "Choose a valid resume section.");
            const result = store.run(
              "UPDATE resumes SET title=?,data=?,template_id=?,template_version=?,revision=revision+1,updated_at=?,last_section=? WHERE id=? AND user_id=? AND revision=?",
              title(b.title ?? r.title),
              JSON.stringify(data),
              t.id,
              t.version,
              Date.now(),
              lastSection,
              r.id,
              u.id,
              b.revision,
            );
            if (!result.changes)
              throw new HttpError(409, "This resume changed in another tab.");
            return send(res, 200, resumeResult(own("resumes", r.id, u.id)));
          }
        }
        if (path === "/v1/previews" && method === "POST") {
          const b = await body(req);
          const r = own("resumes", b.resume_id, u.id);
          if (b.revision !== r.revision)
            throw new HttpError(
              409,
              "Save your latest edits before previewing.",
            );
          const t = templateAccess(
            store.template(r.template_id, r.template_version),
            u.id,
          );
          const png = await renderer.render(JSON.parse(r.data), t, "png");
          if (!store.get("SELECT id FROM users WHERE id=?", u.id))
            throw new HttpError(401, "Session ended.");
          templateAccess(t, u.id);
          res.writeHead(200, {
            "Content-Type": "image/png",
            "Cache-Control": "no-store",
          });
          return res.end(png);
        }
        if (path === "/v1/exports" && method === "POST") {
          const b = await body(req);
          const r = own("resumes", b.resume_id, u.id);
          if (b.revision !== r.revision)
            throw new HttpError(
              409,
              "Save your latest edits before exporting.",
            );
          const existing = store.get(
            "SELECT * FROM exports WHERE user_id=? AND idempotency_key=?",
            u.id,
            String(b.idempotency_key || ""),
          );
          if (existing)
            return send(res, 200, { id: existing.id, status: existing.status });
          if (
            store.get(
              "SELECT COUNT(*) n FROM exports WHERE user_id=? AND created_at>?",
              u.id,
              Date.now() - 3600000,
            ).n >= 30
          )
            throw new HttpError(
              429,
              "Please wait before making more exports (30 per hour).",
            );
          templateAccess(
            store.template(r.template_id, r.template_version),
            u.id,
            "export.premium_pdf",
          );
          if (!exportable(JSON.parse(r.data)))
            throw new HttpError(
              400,
              "Add your name and at least one content section before exporting.",
            );
          if (
            typeof b.idempotency_key !== "string" ||
            b.idempotency_key.length < 8 ||
            b.idempotency_key.length > 100
          )
            throw new HttpError(400, "Invalid export reference.");
          const id = randomUUID();
          store.run(
            "INSERT INTO exports VALUES(?,?,?,?,?,?,?,?,NULL,NULL,?,?,?)",
            id,
            u.id,
            r.id,
            r.data,
            r.template_id,
            r.template_version,
            r.revision,
            "queued",
            Date.now() + 86400000,
            Date.now(),
            b.idempotency_key,
          );
          void renderer.export(id);
          return send(res, 202, { id, status: "queued" });
        }
        const ex = path.match(/^\/v1\/exports\/([^/]+)(?:\/(download))?$/);
        if (ex) {
          const e = own("exports", ex[1], u.id);
          if (e.expires_at < Date.now())
            throw new HttpError(
              410,
              "This download expired. Create a new export.",
            );
          if (ex[2]) {
            templateAccess(
              store.template(e.template_id, e.template_version),
              u.id,
              "export.premium_pdf",
            );
            if (e.status !== "ready" || !e.path || !existsSync(e.path))
              throw new HttpError(409, "Your PDF is not ready yet.");
            res.setHeader(
              "Content-Disposition",
              'attachment; filename="resume.pdf"',
            );
            store.event("resume_download_served", e.id);
            return file(res, e.path, true);
          }
          return send(res, 200, {
            id: e.id,
            status: e.status,
            error: e.error,
            expires_at: e.expires_at,
          });
        }
        if (path === "/v1/orders" && method === "GET")
          return send(
            res,
            200,
            store.all(
              "SELECT id,plan,amount,currency,status,mode,created_at FROM orders WHERE user_id=? ORDER BY created_at DESC",
              u.id,
            ),
          );
        if (path === "/v1/orders" && method === "POST") {
          const b = await body(req);
          if (
            b.plan !== "pro" ||
            b.amount !== undefined ||
            b.currency !== undefined
          )
            throw new HttpError(
              400,
              "Choose the available Pro plan. Prices are set by the server.",
            );
          return send(res, 201, await payments.create(u.id, b.idempotency_key));
        }
        const orderMatch = path.match(
          /^\/v1\/orders\/([^/]+)(?:\/(verify|simulate))?$/,
        );
        if (orderMatch) {
          const o = own("orders", orderMatch[1], u.id);
          if (method === "GET") return send(res, 200, o);
          if (method === "POST" && orderMatch[2] === "verify")
            return send(res, 200, await payments.verify(o, await body(req)));
          if (method === "POST" && orderMatch[2] === "simulate") {
            if (payments.mode !== "local")
              throw new HttpError(404, "Local checkout is unavailable.");
            const b = await body(req);
            if (b.outcome === "captured")
              return send(
                res,
                200,
                payments.fulfill(o.id, {
                  id: "local_payment_" + o.id,
                  order_id: o.gateway_id,
                  status: "captured",
                  amount: o.amount,
                  currency: o.currency,
                }),
              );
            if (b.outcome === "refunded") {
              payments.revoke("local_payment_" + o.id, o.amount);
              return send(res, 200, own("orders", o.id, u.id));
            }
            if (["pending", "failed"].includes(b.outcome)) {
              if (!["fulfilled", "refunded", "review"].includes(o.status))
                store.run(
                  "UPDATE orders SET status=? WHERE id=?",
                  b.outcome,
                  o.id,
                );
              return send(res, 200, own("orders", o.id, u.id));
            }
            throw new HttpError(400, "Choose a test outcome.");
          }
        }
        if (path.startsWith("/v1/admin/")) {
          if (!u.admin)
            throw new HttpError(403, "Administrator access is required.");
          if (path === "/v1/admin/members" && method === "GET")
            return send(
              res,
              200,
              store.all(`SELECT u.id,u.email,u.name,u.admin,u.created_at,u.last_login_at,
              (SELECT COUNT(*) FROM resumes r WHERE r.user_id=u.id) AS resume_count,
              (SELECT MAX(updated_at) FROM resumes r WHERE r.user_id=u.id) AS last_saved_at
              FROM users u ORDER BY u.created_at DESC LIMIT 200`),
            );
          if (path === "/v1/admin/templates" && method === "GET")
            return send(res, 200, store.templates(true));
          if (path === "/v1/admin/orders" && method === "GET")
            return send(
              res,
              200,
              store.all(
                "SELECT id,status,amount,mode,created_at FROM orders ORDER BY created_at DESC LIMIT 100",
              ),
            );
          if (path === "/v1/admin/templates" && method === "POST") {
            const b = await body(req);
            const id = String(b.id || "");
            if (!/^[a-z0-9-]{3,60}$/.test(id))
              throw new HttpError(400, "Use a unique lowercase template ID.");
            const name = title(b.name);
            if (
              ![
                "ATS-Friendly",
                "Professional",
                "Freshers",
                "Technology",
                "Creative",
                "Executive",
              ].includes(b.category) ||
              !["free", "premium"].includes(b.access)
            )
              throw new HttpError(
                400,
                "Choose a valid category and access level.",
              );
            const config = validateConfig(b.config);
            const old = store.template(id);
            const version = old ? old.version + 1 : 1;
            const status = b.status === "published" ? "published" : "draft";
            if (status === "published")
              await renderer.render(
                sampleResume(),
                {
                  id,
                  name,
                  config,
                  version,
                  access: b.access,
                  category: b.category,
                  tags: [],
                  status,
                },
                "pdf",
              );
            store.transaction(() => {
              if (old)
                store.run(
                  "UPDATE templates SET name=?,category=?,access=?,tags=?,status=?,current_version=? WHERE id=?",
                  name,
                  b.category,
                  b.access,
                  JSON.stringify(
                    String(b.tags || "")
                      .split(",")
                      .map((s: string) => s.trim())
                      .filter(Boolean),
                  ),
                  status,
                  version,
                  id,
                );
              else
                store.run(
                  "INSERT INTO templates VALUES(?,?,?,?,?,?,?)",
                  id,
                  name,
                  b.category,
                  b.access,
                  JSON.stringify(
                    String(b.tags || "")
                      .split(",")
                      .map((s: string) => s.trim())
                      .filter(Boolean),
                  ),
                  status,
                  version,
                );
              store.run(
                "INSERT INTO template_versions VALUES(?,?,?,?)",
                id,
                version,
                JSON.stringify(config),
                Date.now(),
              );
              store.audit(u.id, "template." + status, id);
            });
            return send(res, 201, store.template(id));
          }
          const tm = path.match(/^\/v1\/admin\/templates\/([a-z0-9-]+)$/);
          if (tm && method === "PATCH") {
            const b = await body(req);
            if (!["archived", "withdrawn"].includes(b.status))
              throw new HttpError(400, "Choose archive or withdrawal.");
            store.run(
              "UPDATE templates SET status=? WHERE id=?",
              b.status,
              tm[1],
            );
            store.audit(u.id, "template." + b.status, tm[1]);
            return send(res, 200, { ok: true });
          }
        }
        throw new HttpError(404, "API route not found.");
      }
      // An explicit public allowlist keeps database, private templates, source and secrets off HTTP.
      if (!["GET", "HEAD"].includes(method))
        throw new HttpError(405, "Method not allowed.");
      const segments = path.split("/").filter(Boolean);
      if (
        segments.some((s) => s.startsWith(".") || s === "..") ||
        path.includes("\\")
      )
        throw new HttpError(404, "Page not found.");
      const permittedDirs = [
        "assets",
        "css",
        "js",
        "data",
        "vendor",
        "analytics",
      ];
      const publicExt = [
        ".html",
        ".css",
        ".js",
        ".json",
        ".png",
        ".jpg",
        ".jpeg",
        ".svg",
        ".ico",
        ".webmanifest",
        ".woff2",
        ".webp",
        ".txt",
        ".xml",
      ];
      let candidate = resolve(root, "." + path);
      if (!candidate.startsWith(root + sep) && candidate !== root)
        throw new HttpError(404, "Page not found.");
      if (/^\/(job|company)\/[^/]+\/?$/.test(path))
        candidate = join(root, "404.html");
      else if (existsSync(candidate) && statSync(candidate).isDirectory())
        candidate = join(candidate, "index.html");
      const isPage =
        extname(candidate) === ".html" &&
        !["services/resume-api", "services/resume-worker"].some((p) =>
          candidate.startsWith(join(root, p)),
        );
      const isAsset =
        permittedDirs.includes(segments[0]) &&
        publicExt.includes(extname(candidate));
      const isRoot =
        segments.length === 1 &&
        [
          "favicon.ico",
          "manifest.webmanifest",
          "sw.js",
          "robots.txt",
          "ads.txt",
          "sitemap.xml",
        ].includes(segments[0]);
      if (
        (!isPage && !isAsset && !isRoot) ||
        !existsSync(candidate) ||
        !realpathSync(candidate).startsWith(root + sep)
      )
        throw new HttpError(404, "Page not found.");
      if (
        path.startsWith("/resume-builder/") ||
        path.startsWith("/admin/resume-templates/") ||
        path.startsWith("/admin/members/")
      ) {
        res.setHeader("Cache-Control", "no-store");
        res.setHeader("X-Robots-Tag", "noindex, nofollow");
        res.setHeader(
          "Content-Security-Policy",
          "default-src 'self'; script-src 'self' https://checkout.razorpay.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' blob: data:; frame-src 'self' blob: https://api.razorpay.com; connect-src 'self' https://api.razorpay.com; object-src 'none'; base-uri 'self'",
        );
      }
      return file(
        res,
        candidate,
        path.startsWith("/resume-builder/") ||
          path.startsWith("/admin/resume-templates/") ||
          path.startsWith("/admin/members/"),
      );
    } catch (e) {
      const status =
        e instanceof HttpError
          ? e.status
          : e instanceof Error &&
              /resume|section|entries|appearance|text|month|template|field|format|content/i.test(
                e.message,
              )
            ? 400
            : 500;
      send(res, status, {
        error:
          status === 500
            ? "Something went wrong. Please try again."
            : e instanceof Error
              ? e.message
              : "Request failed.",
      });
      if (status === 500)
        console.error(
          "Request error:",
          e instanceof Error ? e.name : "Unknown",
        );
    }
  });
  const tick = setInterval(() => {
    renderer.tick();
    for (const row of store.all(
      "SELECT * FROM webhook_events WHERE state IN ('received','retry') LIMIT 5",
    ))
      void processWebhookRow(row);
    store.run("DELETE FROM sessions WHERE expires_at<?", Date.now());
    for (const [key, rate] of rates)
      if (rate.until < Date.now()) rates.delete(key);
  }, 3000);
  tick.unref();
  const reconcile = setInterval(() => {
    if (!reconciling) {
      reconciling = true;
      void payments.reconcile().finally(() => {
        reconciling = false;
      });
    }
  }, 300000);
  reconcile.unref();
  return {
    server,
    store,
    renderer,
    payments,
    async close() {
      clearInterval(tick);
      clearInterval(reconcile);
      await renderer.close();
      await new Promise<void>((r) => server.close(() => r()));
      store.db.close();
    },
  };
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const app = createApp();
  const port = Number(process.env.PORT || 8000);
  app.server.listen(port, "127.0.0.1", () =>
    console.log(
      `InfoparkDaily local preview: http://localhost:${port}/resume-builder/\nLocal accounts and ${app.payments.mode === "local" ? "simulated payments (no money charged)" : "Razorpay test payments"}. Live deployment is disabled.`,
    ),
  );
  for (const signal of ["SIGINT", "SIGTERM"])
    process.on(signal, () => {
      void app.close().then(() => process.exit(0));
    });
}
