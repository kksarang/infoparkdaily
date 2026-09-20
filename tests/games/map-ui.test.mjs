import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
// DOM/canvas test double: checks wiring without opening a browser or contacting APIs.
test("map UI loads, starts selected runner, updates position, pauses and restarts", async () => {
  const html = await readFile("games/infopark-run/index.html", "utf8");
  const gradient = { addColorStop() {} };
  const context = new Proxy(
    {
      measureText: (s) => ({ width: s.length * 6 }),
      createLinearGradient: () => gradient,
      createRadialGradient: () => gradient,
    },
    { get: (o, k) => o[k] || (() => {}) },
  );
  const el = () => ({
    hidden: false,
    disabled: false,
    textContent: "",
    dataset: {},
    tagName: "BUTTON",
    style: {},
    classList: { add() {}, remove() {}, toggle() {} },
    setAttribute() {},
    offsetWidth: 1,
    closest() {
      return null;
    },
    children: [],
    append(...items) {
      this.children.push(...items);
    },
    replaceChildren() {
      this.children = [];
    },
    addEventListener() {},
    focus() {},
    getBoundingClientRect: () => ({ width: 92, height: 92, left: 0, top: 0 }),
    getContext: () => context,
  });
  const elements = new Map(
    [...html.matchAll(/id="([^"]+)"/g)].map((m) => [m[1], el()]),
  );
  const handlers = new Map();
  let frame;
  globalThis.document = {
    getElementById: (id) => {
      assert.ok(elements.has(id), `Missing #${id}`);
      return elements.get(id);
    },
    querySelector: () => ({ value: "woman" }),
    querySelectorAll: () => [],
    createElement: el,
    addEventListener() {},
  };
  globalThis.window = {
    addEventListener: (event, fn) => handlers.set(event, fn),
  };
  globalThis.devicePixelRatio = 1;
  globalThis.ResizeObserver = class {
    observe() {}
  };
  globalThis.requestAnimationFrame = (fn) => {
    frame = fn;
  };
  const stored = new Map();
  globalThis.localStorage = {
    getItem: (k) => stored.get(k) || null,
    setItem: (k, v) => stored.set(k, v),
  };
  const geometry = [
    { lat: 10.008, lon: 76.36 },
    { lat: 10.008, lon: 76.361 },
    { lat: 10.009, lon: 76.361 },
    { lat: 10.009, lon: 76.362 },
  ];
  globalThis.fetch = async (url) => {
    if (String(url).includes("campus-snapshots") || String(url).includes("infopark-osm")) {
      return { ok: false, json: async () => ({}) };
    }
    return {
      ok: true,
      json: async () => ({
        elements: [
          {
            id: 1,
            type: "way",
            nodes: [1, 2, 3, 4],
            geometry,
            tags: { highway: "service", name: "Test Road" },
          },
        ],
      }),
    };
  };
  await import("../../js/games/infopark-run.js");
  assert.equal(elements.get("company-list").children.length, 4);
  await elements.get("start").onclick();
  assert.equal(elements.get("welcome").hidden, true);
  assert.equal(elements.get("pause").disabled, false);
  frame(1000);
  frame(1050);
  assert.match(elements.get("position").textContent, /Runner: 10\./);
  assert.match(elements.get("map-link").href, /openstreetmap\.org/);
  elements.get("pause").onclick();
  assert.equal(elements.get("pause").textContent, "Resume");
  elements.get("restart").onclick();
  assert.equal(elements.get("pause").textContent, "Pause");
  elements.get("change-runner").onclick();
  assert.equal(elements.get("welcome").hidden, false);
});
