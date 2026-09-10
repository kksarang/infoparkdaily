import { chromium, type Browser } from "playwright";
import { mkdirSync, writeFileSync, existsSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { renderResume } from "../../js/resume-builder/render.js";
import { sampleResume } from "../../js/resume-builder/schema.js";
import type { Store } from "../resume-api/store.ts";
import type { Template } from "../resume-api/catalog.ts";
export class Renderer {
  browser?: Browser;
  starting?: Promise<Browser>;
  queue: Promise<unknown> = Promise.resolve();
  root: string;
  store: Store;
  constructor(store: Store, root: string) {
    this.store = store;
    this.root = root;
    mkdirSync(root, { recursive: true });
    store.run("UPDATE exports SET status='queued' WHERE status='rendering'");
  }
  async browserInstance() {
    if (this.browser) return this.browser;
    this.starting ??= chromium.launch({
      headless: true,
      ...(process.env.RESUME_CHROME_PATH
        ? { executablePath: process.env.RESUME_CHROME_PATH }
        : existsSync(
              "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
            )
          ? { channel: "chrome" }
          : {}),
    });
    this.browser = await this.starting;
    return this.browser;
  }
  enqueue<T>(fn: () => Promise<T>) {
    const task = this.queue.then(fn);
    this.queue = task.catch(() => {});
    return task;
  }
  async render(data: any, template: Template, format: "pdf" | "png") {
    return this.enqueue(async () => {
      const browser = await this.browserInstance();
      const context = await browser.newContext({
        javaScriptEnabled: false,
        viewport: { width: 794, height: 1123 },
      });
      await context.route("**/*", (route) => route.abort());
      try {
        const page = await context.newPage();
        page.setDefaultTimeout(20000);
        await page.setContent(renderResume(data, template.config), {
          waitUntil: "load",
          timeout: 20000,
        });
        await page.evaluate(() => document.fonts.ready);
        if (format === "pdf") {
          await page.emulateMedia({ media: "print" });
          const height = await page.evaluate(() => document.body.scrollHeight);
          if (height > 10400)
            throw Error(
              "This resume is too long. Reduce the content to about 10 pages.",
            );
          return await page.pdf({
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            tagged: true,
          });
        }
        const height = await page.evaluate(() => document.body.scrollHeight);
        if (height > 12000) throw Error("This resume is too long to preview.");
        return await page.screenshot({
          type: "png",
          fullPage: true,
          timeout: 20000,
        });
      } finally {
        await context.close();
      }
    });
  }
  async thumbnail(t: Template) {
    const path = join(this.root, `sample-${t.id}-${t.version}-r3.png`);
    if (!existsSync(path))
      writeFileSync(path, await this.render(sampleResume(), t, "png"));
    return path;
  }
  async export(id: string) {
    const job = this.store.get(
      "SELECT * FROM exports WHERE id=? AND status='queued'",
      id,
    );
    if (!job) return;
    this.store.run("UPDATE exports SET status='rendering' WHERE id=?", id);
    try {
      const t = this.store.template(job.template_id, job.template_version);
      if (!t || t.status === "withdrawn")
        throw Error("This template is unavailable. Choose another template.");
      if (
        t.access === "premium" &&
        !this.store.allowed(job.user_id, "export.premium_pdf")
      )
        throw Error(
          "Your Pro Pass has expired. Switch to a free template or renew.",
        );
      const pdf = await this.render(JSON.parse(job.data), t, "pdf");
      if (!this.store.get("SELECT id FROM exports WHERE id=?", id)) return;
      const path = join(this.root, `${id}.pdf`);
      writeFileSync(path, pdf);
      this.store.run(
        "UPDATE exports SET status='ready',path=? WHERE id=?",
        path,
        id,
      );
      this.store.event("resume_export_ready", id);
    } catch (e) {
      this.store.run(
        "UPDATE exports SET status='failed',error=? WHERE id=?",
        e instanceof Error ? e.message : "Export failed.",
        id,
      );
    }
  }
  tick() {
    for (const job of this.store.all(
      "SELECT id FROM exports WHERE status='queued' LIMIT 2",
    ))
      void this.export(job.id);
    for (const job of this.store.all(
      "SELECT id,path FROM exports WHERE expires_at<?",
      Date.now(),
    )) {
      if (job.path && existsSync(job.path)) unlinkSync(job.path);
      this.store.run("DELETE FROM exports WHERE id=?", job.id);
    }
  }
  async close() {
    await this.queue;
    await this.browser?.close();
  }
}
