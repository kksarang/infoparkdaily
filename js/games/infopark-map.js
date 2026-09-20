// OSM geometry is loaded only on request; no paid tiles or routing service.
export const CAMPUSES = {
  infopark: {
    id: "infopark",
    label: "Infopark Kochi",
    short: "Infopark",
    city: "Kakkanad",
    region: "Kochi",
    bounds: { south: 10.007, west: 76.358, north: 10.011, east: 76.366 },
    snapshot: "/data/campus-snapshots/infopark-osm.json",
    spawn: { lat: 10.009, lon: 76.362 },
    landmark: /thapasya|vismaya|athulya|infopark/i,
    checkpoints:
      /thapasya|vismaya|athulya|lulu|world trade|infopark|wipro|cognizant/i,
    minimap: "N ↑  KAKKANAD",
    directoryUrl: "https://infopark.in/companies/infopark-kochi-phase-1",
    satellite: { lat: 10.0108087, lon: 76.3635943 },
    companies: [
      {
        name: "ContactPoint 360",
        building: "Thapasya",
        address: "First floor, SBC-2, Thapasya · Phase 1",
        url: "https://infopark.in/companies-profile/contactpoint-360",
      },
      {
        name: "Softop Solutions",
        building: "Vismaya",
        address: "8th floor, Vismaya · Phase 1",
        url: "https://infopark.in/companies-profile/softop-solutions-pvt-ltd",
      },
      {
        name: "Elixr Labs",
        building: "Athulya",
        address: "GA-3, ground floor, Athulya · Phase 1",
        url: "https://infopark.in/companies-profile/elixr-labs-technologies-private-limited",
      },
      {
        name: "Kakapo Systems India",
        building: "Athulya",
        address: "GA-2, ground floor, Athulya · Phase 1",
        url: "https://infopark.in/companies-profile/kakapo-systems-india-private-limited",
      },
    ],
  },
  technopark: {
    id: "technopark",
    label: "Technopark Trivandrum",
    short: "Technopark",
    city: "Kazhakkoottam",
    region: "Trivandrum",
    bounds: { south: 8.548, west: 76.882, north: 8.562, east: 76.902 },
    snapshot: "/data/campus-snapshots/technopark-osm.json",
    spawn: { lat: 8.5545, lon: 76.8915 },
    landmark: /technopark|thejaswini|clover|park centre/i,
    checkpoints:
      /technopark|thejaswini|clover|nalanchira|bhavani|leela|nila|yamuna/i,
    minimap: "N ↑  TECHNOPARK",
    directoryUrl: "https://technopark.in/company-list",
    satellite: { lat: 8.5545, lon: 76.8915 },
    companies: [
      {
        name: "UST Global",
        building: "Technopark",
        address: "Technopark Campus, Kazhakkoottam",
        url: "https://technopark.in/",
      },
      {
        name: "Tata Consultancy Services",
        building: "Technopark",
        address: "Technopark Campus, Kazhakkoottam",
        url: "https://technopark.in/",
      },
      {
        name: "Allianz Technology",
        building: "Technopark",
        address: "Technopark Campus, Kazhakkoottam",
        url: "https://technopark.in/",
      },
    ],
  },
  cyberpark: {
    id: "cyberpark",
    label: "Cyberpark Kozhikode",
    short: "Cyberpark",
    city: "Nellikkode",
    region: "Kozhikode",
    bounds: { south: 11.243, west: 75.835, north: 11.253, east: 75.846 },
    snapshot: "/data/campus-snapshots/cyberpark-osm.json",
    spawn: { lat: 11.248, lon: 75.8405 },
    landmark: /cyberpark|ul cyberpark/i,
    checkpoints: /cyberpark|government|ul|nest|india/i,
    minimap: "N ↑  KOZHIKODE",
    directoryUrl: "https://www.cyberparkkerala.in/companies",
    satellite: { lat: 11.248, lon: 75.8405 },
    companies: [
      {
        name: "Cyberpark Kerala",
        building: "Cyberpark",
        address: "UL Cyberpark, Nellikkode",
        url: "https://www.cyberparkkerala.in/",
      },
      {
        name: "NeST Digital",
        building: "Cyberpark",
        address: "Cyberpark Campus, Kozhikode",
        url: "https://www.cyberparkkerala.in/",
      },
    ],
  },
};
const defaultCampus = CAMPUSES.infopark;
const FOOD_AMENITIES = new Set([
  "cafe",
  "restaurant",
  "fast_food",
  "food_court",
  "tea",
  "bakery",
  "ice_cream",
]);
const FOOD_NAME = /cafe|restaurant|tea|coffee|canteen|food|lunch|snack|diner|mess|biryani|meal/i;
const LUNCH_FALLBACK = [
  "Tea kadai",
  "Lunch counter",
  "Filter coffee",
  "Canteen",
  "Snack spot",
  "Meals ready",
  "Evening chai",
  "Quick bite",
];
function isFoodPlace(tags) {
  return (
    FOOD_AMENITIES.has(tags.amenity) ||
    (tags.shop === "bakery" && !!tags.name) ||
    FOOD_NAME.test(tags.name || "")
  );
}
function roadSpots(segments, count, avoid = [], minDist = 20) {
  const sorted = segments
      .slice()
      .sort((a, b) => a.a.x - b.a.x || a.a.y - b.a.y),
    spots = [];
  for (let i = 0; i < count * 4 && spots.length < count; i++) {
    const s = sorted[Math.floor((i * sorted.length) / (count * 4))] || sorted[0];
    if (!s) break;
    const p = { x: (s.a.x + s.b.x) / 2, y: (s.a.y + s.b.y) / 2 };
    if (
      [...avoid, ...spots].every(
        (q) => Math.hypot(q.x - p.x, q.y - p.y) >= minDist,
      )
    )
      spots.push(p);
  }
  return spots;
}
function createProjection(bounds) {
  const latMetres = 111320,
    midLat = (bounds.north + bounds.south) / 2,
    lonMetres = 111320 * Math.cos((midLat * Math.PI) / 180);
  return {
    bounds,
    latMetres,
    lonMetres,
    toXY({ lat, lon }) {
      return {
        x: (lon - bounds.west) * lonMetres,
        y: (bounds.north - lat) * latMetres,
      };
    },
    toLatLon({ x, y }) {
      return {
        lat: bounds.north - y / latMetres,
        lon: bounds.west + x / lonMetres,
      };
    },
  };
}
const defaultProj = createProjection(defaultCampus.bounds);
export const toXY = (p) => defaultProj.toXY(p);
export const toLatLon = (p) => defaultProj.toLatLon(p);
export function getCampus(id) {
  return CAMPUSES[id] || defaultCampus;
}
export function listCampuses() {
  return Object.values(CAMPUSES);
}
export function getCompanies(campusId) {
  return getCampus(campusId).companies;
}
export const companies = defaultCampus.companies;
export function nearestPoint(p, a, b) {
  const dx = b.x - a.x,
    dy = b.y - a.y,
    l = dx * dx + dy * dy;
  const t = l
    ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l))
    : 0;
  const x = a.x + t * dx,
    y = a.y + t * dy;
  return { x, y, distance: Math.hypot(p.x - x, p.y - y) };
}
export function nearestRoad(p, segments) {
  let result = null;
  for (const s of segments) {
    const n = nearestPoint(p, s.a, s.b);
    if (!result || n.distance < result.distance) result = { ...n, segment: s };
  }
  return result;
}
const pedestrian = (t) =>
  t.highway &&
  ![
    "motorway",
    "motorway_link",
    "trunk",
    "trunk_link",
    "construction",
    "proposed",
    "raceway",
  ].includes(t.highway) &&
  t.foot !== "no" &&
  !(t.access === "no" && t.foot !== "yes");
export function buildMap(data, campusId = "infopark") {
  if (!Array.isArray(data.elements)) throw Error("Invalid map response");
  const campus = getCampus(campusId),
    proj = createProjection(campus.bounds),
    toXYLocal = (p) => proj.toXY(p);
  const roads = [],
    buildings = [],
    places = [];
  for (const e of data.elements) {
    const tags = e.tags || {},
      geometry = e.geometry?.filter(
        (p) => Number.isFinite(p.lat) && Number.isFinite(p.lon),
      );
    if (geometry?.length > 1 && tags.highway) {
      const points = geometry.map(toXYLocal);
      roads.push({
        id: e.id,
        name: tags.name || "Unnamed mapped path",
        points,
        nodes: e.nodes || [],
        tags,
        walkable: pedestrian(tags),
      });
    }
    if (geometry?.length > 2 && tags.building) {
      const points = geometry.map(toXYLocal),
        center = points.reduce(
          (a, p) => ({
            x: a.x + p.x / points.length,
            y: a.y + p.y / points.length,
          }),
          { x: 0, y: 0 },
        );
      const name = tags.name || tags["addr:housename"] || "";
      buildings.push({ id: e.id, points, center, name });
      if (name)
        places.push({
          ...center,
          name,
          kind: "building",
          osmType: e.type,
          id: e.id,
        });
    } else if (tags.name && (tags.office || tags.amenity || tags.shop)) {
      const center =
        e.center ||
        (Number.isFinite(e.lat) ? e : null) ||
        (geometry?.length
          ? geometry.reduce(
              (a, p) => ({
                lat: a.lat + p.lat / geometry.length,
                lon: a.lon + p.lon / geometry.length,
              }),
              { lat: 0, lon: 0 },
            )
          : null);
      if (center)
        places.push({
          ...toXYLocal(center),
          name: tags.name,
          kind: tags.office ? "company" : "place",
          food: isFoodPlace(tags),
          osmType: e.type,
          id: e.id,
        });
    }
  }
  const adjacency = new Map(),
    allSegments = [],
    inside = (p) => {
      const ll = proj.toLatLon(p);
      return (
        ll.lat >= campus.bounds.south &&
        ll.lat <= campus.bounds.north &&
        ll.lon >= campus.bounds.west &&
        ll.lon <= campus.bounds.east
      );
    };
  for (const road of roads.filter((r) => r.walkable))
    for (let i = 1; i < road.points.length; i++) {
      const a = road.points[i - 1],
        b = road.points[i],
        ka = String(road.nodes[i - 1] ?? `${a.x.toFixed(2)},${a.y.toFixed(2)}`),
        kb = String(road.nodes[i] ?? `${b.x.toFixed(2)},${b.y.toFixed(2)}`);
      if (!inside(a) || !inside(b)) continue;
      const s = { a, b, ka, kb, name: road.name };
      allSegments.push(s);
      if (!adjacency.has(ka)) adjacency.set(ka, []);
      if (!adjacency.has(kb)) adjacency.set(kb, []);
      adjacency.get(ka).push(kb);
      adjacency.get(kb).push(ka);
    }
  const seen = new Set();
  let largest = new Set();
  for (const k of adjacency.keys()) {
    if (seen.has(k)) continue;
    const component = new Set(),
      stack = [k];
    while (stack.length) {
      const n = stack.pop();
      if (seen.has(n)) continue;
      seen.add(n);
      component.add(n);
      stack.push(...adjacency.get(n).filter((v) => !seen.has(v)));
    }
    if (component.size > largest.size) largest = component;
  }
  const segments = allSegments.filter((s) => largest.has(s.ka));
  if (segments.length < 3)
    throw Error(
      "No connected walking network was returned. Please retry later.",
    );
  const campusPlace = places.find((p) => campus.landmark.test(p.name));
  const spawn = nearestRoad(
    campusPlace || toXYLocal(campus.spawn),
    segments,
  );
  const tokens = roadSpots(segments, 22);
  const lunch = [];
  for (const p of places.filter((p) => p.food)) {
    const near = nearestRoad(p, segments);
    if (
      near.distance < 160 &&
      !lunch.some((q) => q.name === p.name) &&
      lunch.length < 10
    )
      lunch.push({ ...near, name: p.name });
  }
  for (const p of roadSpots(segments, 10 - lunch.length, [...tokens, ...lunch], 24)) {
    if (lunch.length >= 10) break;
    lunch.push({
      ...p,
      name: LUNCH_FALLBACK[lunch.length % LUNCH_FALLBACK.length],
    });
  }
  const checkpoints = [];
  for (const p of places.filter((p) => campus.checkpoints.test(p.name))) {
    const near = nearestRoad(p, segments);
    if (
      near.distance < 180 &&
      !checkpoints.some((q) => q.name === p.name) &&
      checkpoints.length < 4
    )
      checkpoints.push({ ...near, name: p.name });
  }
  if (!tokens.length) throw Error("No playable route found.");
  return {
    campusId: campus.id,
    campus,
    roads,
    buildings,
    places,
    segments,
    tokens,
    lunch,
    checkpoints,
    spawn,
    toXY: toXYLocal,
    toLatLon: (p) => proj.toLatLon(p),
    stamp:
      typeof data.osm3s?.timestamp_osm_base === "string"
        ? data.osm3s.timestamp_osm_base
        : null,
  };
}
const OVERPASS_URLS = [
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass-api.de/api/interpreter",
  "https://lz4.overpass-api.de/api/interpreter",
];
const OVERPASS_HEADERS = {
  "Content-Type": "application/x-www-form-urlencoded",
  "User-Agent": "InfoparkDaily/1.0 (+https://infoparkdaily.online)",
};
async function fetchOverpass(query) {
  for (const url of OVERPASS_URLS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: OVERPASS_HEADERS,
          body: `data=${encodeURIComponent(query)}`,
          signal: AbortSignal.timeout(60000),
        });
        if (response.ok) return await response.json();
      } catch {}
      await new Promise((resolve) => setTimeout(resolve, 900 * (attempt + 1)));
    }
  }
  return null;
}
async function loadSnapshot(path) {
  try {
    const response = await fetch(path, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
export async function loadMap(campusId = "infopark") {
  const campus = getCampus(campusId),
    cacheKey = `ipd-osm-v2-${campus.id}`;
  try {
    const cache = JSON.parse(localStorage.getItem(cacheKey));
    if (cache && Date.now() - cache.saved < 86400000) {
      const map = buildMap(cache.data, campus.id);
      map.source = "cache";
      return map;
    }
  } catch {}
  const b = `${campus.bounds.south},${campus.bounds.west},${campus.bounds.north},${campus.bounds.east}`;
  const query = `[out:json][timeout:60];(way[highway](${b});way[building](${b});nwr[office][name](${b});nwr[amenity][name](${b}););out geom;`;
  let data = await loadSnapshot(campus.snapshot);
  let source = data ? "snapshot" : "live";
  if (!data) {
    data = await fetchOverpass(query);
    source = "live";
  } else {
    fetchOverpass(query)
      .then((live) => {
        if (!live) return;
        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ saved: Date.now(), data: live }),
          );
        } catch {}
      })
      .catch(() => {});
  }
  if (!data)
    throw Error(
      `Map for ${campus.label} is unavailable right now. Please retry in a minute.`,
    );
  const map = buildMap(data, campus.id);
  map.source = source;
  if (source === "live") {
    try {
      localStorage.setItem(cacheKey, JSON.stringify({ saved: Date.now(), data }));
    } catch {}
  }
  return map;
}
export function moveOnRoad(player, dx, dy, dt, map, sprint) {
  const length = Math.hypot(dx, dy);
  if (!length) return;
  const distance = (sprint ? 55 : 30) * Math.min(Math.max(dt, 0), 0.05),
    candidate = {
      x: player.x + (dx / length) * distance,
      y: player.y + (dy / length) * distance,
    };
  const near = nearestRoad(candidate, map.segments);
  if (near && near.distance < 7) {
    player.distance += Math.hypot(near.x - player.x, near.y - player.y);
    player.x = near.x;
    player.y = near.y;
    player.road = near.segment.name;
  }
}
