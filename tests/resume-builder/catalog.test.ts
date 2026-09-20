import { test } from "node:test";
import assert from "node:assert/strict";
import { catalog as serverCatalog } from "../../services/resume-api/catalog.ts";
import { catalog, publicTemplates } from "../../js/resume-builder/catalog.js";

test("public Career Tools catalog matches the server library", () => {
  assert.equal(catalog.length, serverCatalog.length);
  assert.equal(catalog.length, 167);
  const published = publicTemplates();
  assert.equal(published.length, 167);
  assert.ok(published.every((t) => t.access === "free"));
  assert.ok(published.every((t) => t.config && t.thumbnail.startsWith("data:image/svg+xml")));
  assert.ok(serverCatalog.every((t) => t.access === "free"));
  assert.ok(published.some((t) => t.id === "harbor"));
  assert.ok(published.some((t) => t.id === "atelier"));
  assert.ok(published.some((t) => t.id === "spark"));
  assert.ok(published.some((t) => t.id === "nova-frame"));
  assert.ok(published.some((t) => t.id === "soft-peach"));
  assert.ok(published.some((t) => t.id === "clearpath"));
  assert.ok(published.some((t) => t.id === "meridian-pro"));
  assert.ok(published.some((t) => t.id === "rivera-soft"));
  assert.ok(
    published.find((t) => t.id === "rivera-soft")?.config?.family === "gallery",
  );
  assert.ok(published.some((t) => t.id === "simple-ats"));
  assert.ok(published.some((t) => t.id === "two-column-modern"));
  assert.ok(
    published.find((t) => t.id === "simple-ats")?.config?.family === "docs",
  );
  assert.ok(
    published.find((t) => t.id === "two-column-modern")?.config?.family ===
      "docs-split",
  );
});
