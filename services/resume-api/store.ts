import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";
import { catalog, type Template } from "./catalog.ts";
export class Store {
  db: DatabaseSync;
  constructor(path: string) {
    mkdirSync(dirname(path), { recursive: true });
    this.db = new DatabaseSync(path);
    this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;
 CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,email TEXT UNIQUE NOT NULL,name TEXT NOT NULL,password TEXT,admin INTEGER NOT NULL DEFAULT 0,created_at INTEGER NOT NULL);
 CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,expires_at INTEGER NOT NULL);
 CREATE INDEX IF NOT EXISTS sessions_user ON sessions(user_id);
 CREATE TABLE IF NOT EXISTS resumes(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,title TEXT NOT NULL,data TEXT NOT NULL,template_id TEXT NOT NULL,template_version INTEGER NOT NULL,revision INTEGER NOT NULL DEFAULT 1,job_id TEXT,created_at INTEGER NOT NULL,updated_at INTEGER NOT NULL);
 CREATE INDEX IF NOT EXISTS resumes_owner ON resumes(user_id,updated_at);
 CREATE TABLE IF NOT EXISTS templates(id TEXT PRIMARY KEY,name TEXT NOT NULL,category TEXT NOT NULL,access TEXT NOT NULL CHECK(access IN ('free','premium')),tags TEXT NOT NULL,status TEXT NOT NULL,current_version INTEGER NOT NULL);
 CREATE TABLE IF NOT EXISTS template_versions(template_id TEXT NOT NULL REFERENCES templates(id),version INTEGER NOT NULL,config TEXT NOT NULL,created_at INTEGER NOT NULL,PRIMARY KEY(template_id,version));
 CREATE TABLE IF NOT EXISTS orders(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,plan TEXT NOT NULL,amount INTEGER NOT NULL,currency TEXT NOT NULL,duration INTEGER NOT NULL,gateway_id TEXT UNIQUE,mode TEXT NOT NULL,status TEXT NOT NULL,idempotency_key TEXT NOT NULL,created_at INTEGER NOT NULL,UNIQUE(user_id,idempotency_key));
 CREATE TABLE IF NOT EXISTS payments(id TEXT PRIMARY KEY,order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,status TEXT NOT NULL,amount INTEGER NOT NULL,refunded INTEGER NOT NULL DEFAULT 0,created_at INTEGER NOT NULL);
 CREATE TABLE IF NOT EXISTS entitlements(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,feature TEXT NOT NULL,payment_id TEXT NOT NULL REFERENCES payments(id) ON DELETE CASCADE,starts_at INTEGER NOT NULL,expires_at INTEGER NOT NULL,revoked_at INTEGER,UNIQUE(payment_id,feature));
 CREATE INDEX IF NOT EXISTS entitlements_owner ON entitlements(user_id,feature,expires_at);
 CREATE TABLE IF NOT EXISTS webhook_events(id TEXT PRIMARY KEY,type TEXT NOT NULL,payload TEXT NOT NULL,state TEXT NOT NULL,attempts INTEGER NOT NULL DEFAULT 0,error TEXT,created_at INTEGER NOT NULL);
 CREATE TABLE IF NOT EXISTS exports(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,resume_id TEXT NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,data TEXT NOT NULL,template_id TEXT NOT NULL,template_version INTEGER NOT NULL,revision INTEGER NOT NULL,status TEXT NOT NULL,error TEXT,path TEXT,expires_at INTEGER NOT NULL,created_at INTEGER NOT NULL,idempotency_key TEXT NOT NULL,UNIQUE(user_id,idempotency_key));
 CREATE INDEX IF NOT EXISTS exports_owner ON exports(user_id,created_at);
 CREATE TABLE IF NOT EXISTS audit_log(id TEXT PRIMARY KEY,actor TEXT NOT NULL,operation TEXT NOT NULL,resource TEXT NOT NULL,created_at INTEGER NOT NULL);
 CREATE TABLE IF NOT EXISTS outbox(id TEXT PRIMARY KEY,event TEXT NOT NULL,resource TEXT NOT NULL,mode TEXT NOT NULL,created_at INTEGER NOT NULL,UNIQUE(event,resource));
 `);
    // Small additive migrations preserve existing local members and drafts.
    if (
      !this.all("PRAGMA table_info(resumes)").some(
        (c) => c.name === "last_section",
      )
    )
      this.db.exec(
        "ALTER TABLE resumes ADD COLUMN last_section TEXT NOT NULL DEFAULT 'personal'",
      );
    if (
      !this.all("PRAGMA table_info(users)").some(
        (c) => c.name === "last_login_at",
      )
    )
      this.db.exec("ALTER TABLE users ADD COLUMN last_login_at INTEGER");
    for (const t of catalog) {
      this.run(
        "INSERT OR IGNORE INTO templates VALUES(?,?,?,?,?,?,?)",
        t.id,
        t.name,
        t.category,
        t.access,
        JSON.stringify(t.tags),
        t.status,
        t.version,
      );
      this.run(
        "INSERT OR IGNORE INTO template_versions VALUES(?,?,?,?)",
        t.id,
        t.version,
        JSON.stringify(t.config),
        Date.now(),
      );
    }
    this.db.exec("PRAGMA optimize");
  }
  run(sql: string, ...args: any[]) {
    return this.db.prepare(sql).run(...args);
  }
  get(sql: string, ...args: any[]): any {
    return this.db.prepare(sql).get(...args);
  }
  all(sql: string, ...args: any[]): any[] {
    return this.db.prepare(sql).all(...args);
  }
  transaction<T>(fn: () => T): T {
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const result = fn();
      this.db.exec("COMMIT");
      return result;
    } catch (e) {
      this.db.exec("ROLLBACK");
      throw e;
    }
  }
  template(id: string, version?: number): Template | undefined {
    const t = this.get("SELECT * FROM templates WHERE id=?", id);
    if (!t) return;
    const v = this.get(
      "SELECT * FROM template_versions WHERE template_id=? AND version=?",
      id,
      version || t.current_version,
    );
    if (!v) return;
    return {
      id: t.id,
      name: t.name,
      category: t.category,
      access: t.access,
      tags: JSON.parse(t.tags),
      status: t.status,
      version: v.version,
      config: JSON.parse(v.config),
    };
  }
  templates(all = false) {
    return this.all(
      `SELECT id FROM templates ${all ? "" : "WHERE status='published'"} ORDER BY rowid`,
    ).map((r) => this.template(r.id)!);
  }
  allowed(user: string, feature: string, now = Date.now()) {
    return !!this.get(
      "SELECT id FROM entitlements WHERE user_id=? AND feature=? AND revoked_at IS NULL AND starts_at<=? AND expires_at>?",
      user,
      feature,
      now,
      now,
    );
  }
  entitlements(user: string) {
    return this.all(
      "SELECT feature,MIN(starts_at) AS starts_at,MAX(expires_at) AS expires_at FROM entitlements WHERE user_id=? AND revoked_at IS NULL AND expires_at>? GROUP BY feature",
      user,
      Date.now(),
    );
  }
  audit(actor: string, operation: string, resource: string) {
    this.run(
      "INSERT INTO audit_log VALUES(?,?,?,?,?)",
      randomUUID(),
      actor,
      operation,
      resource,
      Date.now(),
    );
  }
  event(event: string, resource: string, mode = "local") {
    this.run(
      "INSERT OR IGNORE INTO outbox VALUES(?,?,?,?,?)",
      randomUUID(),
      event,
      resource,
      mode,
      Date.now(),
    );
  }
}
export function resumeResult(r: any) {
  return { ...r, data: JSON.parse(r.data) };
}
