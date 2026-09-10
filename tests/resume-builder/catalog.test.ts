import { test } from "node:test";
import assert from "node:assert/strict";
import { catalog as serverCatalog } from "../../services/resume-api/catalog.ts";
import { catalog, publicTemplates } from "../../js/resume-builder/catalog.js";

test("public Career Tools catalog matches the server library", () => {
  assert.equal(catalog.length, serverCatalog.length);
  assert.equal(catalog.length, 60);
  const published = publicTemplates();
  assert.equal(published.length, 60);
  const free = published.filter((t) => t.access === "free");
  assert.equal(free.length, 20);
  assert.ok(free.every((t) => t.config && t.thumbnail.startsWith("data:image/svg+xml")));
  const premium = published.filter((t) => t.access === "premium");
  assert.ok(premium.every((t) => !t.config));
  assert.ok(published.some((t) => t.id === "harbor"));
  assert.ok(published.some((t) => t.id === "atelier"));
  assert.ok(published.some((t) => t.id === "spark"));
});
