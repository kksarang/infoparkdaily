# Infopark After Hours

Entry: `/media/#campus-game` → `/games/infopark-run/`.

Free static JavaScript/Canvas game. No Firebase, billing, authentication, API keys or paid map tiles. Players choose a male or female runner with identical speed and controls. WASD/arrows/touch move along a connected mapped road network; P pauses. Zoom, restart and runner changes are available. Each run has chai tokens and mapped-building checkpoints. Best time and a daily map cache stay in local storage.

## Geographic data

The game explicitly requests OpenStreetMap geometry through the public Overpass API when the player clicks Load. The bounding box covers Infopark Phase 1 and surrounding Kakkanad streets: south 9.997, west 76.347, north 10.019, east 76.382. These are query bounds, not a surveyed campus boundary. Road shapes and building footprints come from returned data; office names appear when present in OSM. The displayed coordinates are the fictional runner's mapped position, not the player's GPS position. There is no geolocation request or live traffic feed.

A connected road graph supplies the playable network; disconnected segments and motorway/trunk/construction ways are excluded from objectives. A small distance margin keeps movement along mapped centrelines. This is gameplay, not turn-by-turn routing: access restrictions, gates, road conditions and closures are not verified. Buildings use illustrative visual styling. Map completeness and accuracy depend on OSM contributors. Company pins are building-centre matches, not verified office entrances.

Public map services have capacity limits and no uptime guarantee. The UI handles timeout/failure and offers an explicit retry, with no fabricated fallback map. OSM geometry is cached for 24 hours per browser to reduce load. For a high-traffic launch, review Overpass usage and distribute a periodically refreshed attributed static extract instead of making every visitor query the service.

Data attribution is shown on the canvas: [OpenStreetMap contributors / ODbL](https://www.openstreetmap.org/copyright). Overpass documentation: https://wiki.openstreetmap.org/wiki/Overpass_API .

## Selected company locations

Official directory entries checked 20 September 2026:

- ContactPoint 360 — First floor SBC-2, Thapasya: https://infopark.in/companies-profile/contactpoint-360
- Softop Solutions — 8th floor Vismaya: https://infopark.in/companies-profile/softop-solutions-pvt-ltd
- Elixr Labs — GA-3 ground floor Athulya: https://infopark.in/companies-profile/elixr-labs-technologies-private-limited
- Kakapo Systems India — GA-2 ground floor Athulya: https://infopark.in/companies-profile/kakapo-systems-india-private-limited

The page links to the full official company directory. If the corresponding building name cannot be matched in OSM, the game explicitly disables its jump button instead of inventing coordinates. Choosing a mapped building restarts the challenge at the nearest connected road. These entries do not claim current office occupancy or live business status.

## Verification and deployment

Run `node --test tests/games/*.test.mjs` and `node --check js/games/infopark-run.js`. Tests use synthetic geometry and a DOM/canvas test double, not surveyed data. They cover geographic conversion, connected objectives, restricted movement, error handling and UI start/pause/restart wiring.

A real-browser map-service smoke test remains required. The local preview server was blocked when automatic approval review could not complete due to a usage limit. No browser/API integration success is claimed. Files have not been deployed. After preview is allowed, verify live Overpass loading, building labels, mobile controls, keyboard play, map failure/retry and About-page navigation before normal static deployment.
