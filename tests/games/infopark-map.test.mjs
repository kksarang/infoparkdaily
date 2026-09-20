import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildMap,
  getCampus,
  listCampuses,
  toXY,
  toLatLon,
  nearestPoint,
  nearestRoad,
  moveOnRoad,
} from "../../js/games/infopark-map.js";
// Synthetic network for logic tests only, not surveyed campus data.
const nodes = [
  { lat: 10.008, lon: 76.36 },
  { lat: 10.008, lon: 76.361 },
  { lat: 10.009, lon: 76.361 },
  { lat: 10.009, lon: 76.362 },
  { lat: 10.01, lon: 76.362 },
];
export const fixture = {
  osm3s: { timestamp_osm_base: "2026-09-20T00:00:00Z" },
  elements: [
    {
      type: "way",
      id: 1,
      nodes: [1, 2, 3, 4, 5],
      tags: { highway: "service", name: "Test campus road" },
      geometry: nodes,
    },
    {
      type: "way",
      id: 2,
      nodes: [10, 11],
      tags: { highway: "service" },
      geometry: [
        { lat: 10.015, lon: 76.37 },
        { lat: 10.016, lon: 76.37 },
      ],
    },
    {
      type: "way",
      id: 3,
      nodes: [20, 21],
      tags: { highway: "motorway" },
      geometry: [
        { lat: 10.012, lon: 76.36 },
        { lat: 10.013, lon: 76.36 },
      ],
    },
    {
      type: "way",
      id: 4,
      tags: { building: "yes", name: "Thapasya" },
      geometry: [
        { lat: 10.0081, lon: 76.3601 },
        { lat: 10.0081, lon: 76.3603 },
        { lat: 10.0083, lon: 76.3603 },
        { lat: 10.0081, lon: 76.3601 },
      ],
    },
    {
      type: "node",
      id: 6,
      lat: 10.0082,
      lon: 76.3604,
      tags: { office: "it", name: "Test company" },
    },
    {
      type: "node",
      id: 7,
      lat: 10.0086,
      lon: 76.3607,
      tags: { amenity: "cafe", name: "Campus Cafe" },
    },
  ],
};
test("lists three Kerala IT park campuses", () => {
  assert.equal(listCampuses().length, 3);
  assert.equal(getCampus("technopark").region, "Trivandrum");
  assert.equal(getCampus("cyberpark").region, "Kozhikode");
});
test("geographic projection round trips without inventing coordinates", () => {
  for (const p of nodes) {
    const result = toLatLon(toXY(p));
    assert.ok(Math.abs(p.lat - result.lat) < 1e-9);
    assert.ok(Math.abs(p.lon - result.lon) < 1e-9);
  }
});
test("keeps road geometry and company names; excludes disconnected and motorway objectives", () => {
  const m = buildMap(fixture, "infopark");
  assert.equal(m.roads[0].name, "Test campus road");
  assert.equal(m.segments.length, 4);
  assert.ok(m.places.some((p) => p.name === "Test company"));
  assert.equal(m.checkpoints[0].name, "Thapasya");
  assert.ok(m.lunch.length >= 1);
  assert.ok(m.lunch.some((p) => p.name === "Campus Cafe"));
  for (const p of m.tokens)
    assert.ok(nearestRoad(p, m.segments).distance < 0.001);
  for (const p of m.lunch)
    assert.ok(nearestRoad(p, m.segments).distance < 0.001);
});
test("runner cannot leave the mapped network and follows road bends", () => {
  const m = buildMap(fixture, "infopark"),
    p = { ...m.spawn, distance: 0 };
  for (let i = 0; i < 500; i++) moveOnRoad(p, 1, -1, 0.05, m, false);
  assert.ok(nearestRoad(p, m.segments).distance < 0.001);
  const before = { ...p };
  moveOnRoad(p, 1, 0, 100, m, true);
  assert.ok(Math.hypot(p.x - before.x, p.y - before.y) <= 3);
});
test("rejects unavailable or disconnected-only data instead of making up a map", () => {
  assert.throws(() => buildMap({}));
  assert.throws(() => buildMap({ elements: [] }));
});
test("nearest point handles zero-length geometry", () => {
  assert.deepEqual(
    nearestPoint({ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }),
    { x: 0, y: 0, distance: 1 },
  );
});
