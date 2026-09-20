import fs from "node:fs";

const campuses = [
  { id: "technopark", bounds: "8.548,76.882,8.562,76.902" },
  { id: "cyberpark", bounds: "11.243,75.835,11.253,75.846" },
];
const urls = [
  "https://overpass.openstreetmap.ru/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];

async function fetchCampus(campus) {
  const query = `[out:json][timeout:25];(way[highway](${campus.bounds});way[building](${campus.bounds});nwr[office][name](${campus.bounds});nwr[amenity][name](${campus.bounds}););out geom;`;
  for (const url of urls) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "InfoparkDaily/1.0 (+https://infoparkdaily.online)",
        },
        body: `data=${encodeURIComponent(query)}`,
        signal: AbortSignal.timeout(90000),
      });
      if (!response.ok) {
        console.log(campus.id, url, response.status);
        continue;
      }
      const data = await response.json();
      const out = `data/campus-snapshots/${campus.id}-osm.json`;
      fs.writeFileSync(out, JSON.stringify(data));
      console.log(campus.id, "saved", out, "elements", data.elements?.length ?? 0);
      return true;
    } catch (error) {
      console.log(campus.id, url, error.message);
    }
  }
  return false;
}

for (const campus of campuses) {
  const ok = await fetchCampus(campus);
  if (!ok) process.exitCode = 1;
}
