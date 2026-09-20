import {
  loadMap,
  getCampus,
  getCompanies,
  nearestRoad,
  moveOnRoad,
} from "./infopark-map.js";
const $ = (id) => document.getElementById(id),
  canvas = $("world"),
  ctx = canvas.getContext("2d");
let map = null,
  player = null,
  active = false,
  paused = false,
  last = 0,
  width = 900,
  height = 560,
  zoom = 1.25,
  noticeEnd = 0,
  selected = null,
  avatar = "man",
  campusId = "infopark",
  best = null,
  camera = { x: 0, y: 0 },
  followRunner = true,
  drag = null,
  searchQuery = "",
  joyVector = { x: 0, y: 0 },
  joyDrag = null,
  clock = 0,
  soundOn = true,
  lastMove = { x: 0, y: 0 };
const fx = [];
const keys = new Set(),
  touches = new Map();
let audioCtx = null;
const joyZone = () => $("joystick-zone"),
  joyKnob = () => $("joystick-knob");
const format = (t) =>
  `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
function say(text, persist = false) {
  $("notice").textContent = text;
  noticeEnd = persist ? Infinity : performance.now() + 5000;
}
function cameraCenter() {
  return followRunner && player
    ? { x: player.x, y: player.y }
    : { x: camera.x, y: camera.y };
}
function project(p, z = 0) {
  const center = cameraCenter();
  return {
    x: width / 2 + (p.x - center.x) * zoom,
    y: height / 2 + (p.y - center.y) * zoom - z,
  };
}
function updateRunnerChip() {
  const woman = avatar === "woman",
    badge = $("runner-badge");
  badge.classList.toggle("female", woman);
  badge.classList.toggle("male", !woman);
  $("runner-title").textContent = woman ? "Female runner" : "Male runner";
}
function setMovePadVisible(on) {
  const pad = $("move-pad");
  if (pad) pad.hidden = !on;
}
function resetJoystick() {
  joyVector.x = 0;
  joyVector.y = 0;
  joyDrag = null;
  const knob = joyKnob();
  if (knob) knob.style.transform = "";
}
function updateScale() {
  const widths = [5, 10, 20, 50, 100, 200];
  const metres =
    widths.find((m) => m * zoom >= 42 && m * zoom <= 88) ||
    widths[widths.length - 1];
  $("scale-bar").style.width = `${Math.round(metres * zoom)}px`;
  $("scale-label").textContent = `${metres} m`;
}
function setFollowRunner(on) {
  followRunner = on;
  $("recenter").setAttribute("aria-pressed", String(on));
  if (on && player) {
    camera.x = player.x;
    camera.y = player.y;
  }
}
function mapSourceNote() {
  if (!map?.source) return "";
  if (map.source === "snapshot")
    return " Using the bundled campus snapshot while live map data is unavailable.";
  if (map.source === "cache") return " Loaded from your saved campus map.";
  return " Live OpenStreetMap data loaded.";
}
function ensureAudio() {
  if (!audioCtx)
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}
function playSound(kind) {
  if (!soundOn) return;
  try {
    const ac = ensureAudio(),
      now = ac.currentTime;
    if (kind === "chai") {
      const o = ac.createOscillator(),
        g = ac.createGain();
      o.connect(g);
      g.connect(ac.destination);
      o.type = "sine";
      o.frequency.setValueAtTime(660, now);
      o.frequency.exponentialRampToValueAtTime(990, now + 0.08);
      g.gain.setValueAtTime(0.07, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      o.start(now);
      o.stop(now + 0.14);
    } else if (kind === "place") {
      const o = ac.createOscillator(),
        g = ac.createGain();
      o.connect(g);
      g.connect(ac.destination);
      o.type = "triangle";
      o.frequency.setValueAtTime(392, now);
      o.frequency.setValueAtTime(523, now + 0.07);
      g.gain.setValueAtTime(0.06, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      o.start(now);
      o.stop(now + 0.22);
    } else if (kind === "lunch") {
      [440, 554, 659].forEach((f, i) => {
        const o = ac.createOscillator(),
          g = ac.createGain();
        o.connect(g);
        g.connect(ac.destination);
        const t = now + i * 0.06;
        o.type = "sine";
        o.frequency.value = f;
        g.gain.setValueAtTime(0.065, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        o.start(t);
        o.stop(t + 0.18);
      });
    } else if (kind === "complete") {
      [392, 523, 659, 784].forEach((f, i) => {
        const o = ac.createOscillator(),
          g = ac.createGain();
        o.connect(g);
        g.connect(ac.destination);
        const t = now + i * 0.11;
        o.frequency.value = f;
        g.gain.setValueAtTime(0.05, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
        o.start(t);
        o.stop(t + 0.28);
      });
    }
  } catch {}
}
function spawnBurst(x, y, color, count = 10, speed = 1) {
  for (let i = 0; i < count; i++) {
    const a = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    fx.push({
      x,
      y,
      vx: Math.cos(a) * (35 + Math.random() * 55) * speed,
      vy: Math.sin(a) * (35 + Math.random() * 55) * speed,
      life: 0.45 + Math.random() * 0.35,
      age: 0,
      color,
      size: 2 + Math.random() * 3,
    });
  }
}
function spawnSteam(x, y) {
  for (let i = 0; i < 6; i++) {
    fx.push({
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      vx: (Math.random() - 0.5) * 10,
      vy: -16 - Math.random() * 10,
      life: 0.7,
      age: 0,
      color: "#ffffffaa",
      size: 2 + Math.random() * 2,
      kind: "steam",
    });
  }
}
function spawnRipple(x, y, color) {
  fx.push({
    x,
    y,
    vx: 0,
    vy: 0,
    life: 0.65,
    age: 0,
    color,
    size: 6,
    kind: "ripple",
  });
}
function spawnPopup(x, y, text, color) {
  fx.push({
    x,
    y,
    vx: 0,
    vy: -34,
    life: 1.05,
    age: 0,
    color,
    text,
    kind: "popup",
  });
}
function spawnSparkle(x, y, color) {
  for (let i = 0; i < 10; i++) {
    const a = Math.random() * Math.PI * 2;
    fx.push({
      x,
      y,
      vx: Math.cos(a) * (50 + Math.random() * 50),
      vy: Math.sin(a) * (50 + Math.random() * 50) - 18,
      life: 0.45 + Math.random() * 0.35,
      age: 0,
      color,
      size: 2 + Math.random() * 3,
      kind: "sparkle",
    });
  }
}
function celebrateCollect(x, y, { color, popup, sound, statId, message, extra }) {
  spawnBurst(x, y, color, 16, 1.05);
  spawnRipple(x, y, color);
  spawnPopup(x, y, popup, color);
  extra?.(x, y);
  navigator.vibrate?.(14);
  playSound(sound);
  pulseScore(statId);
  say(message);
}
function updateFx(dt) {
  for (let i = fx.length - 1; i >= 0; i--) {
    const p = fx[i];
    p.age += dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (p.kind === "steam") p.vy -= 18 * dt;
    else if (p.kind !== "ripple" && p.kind !== "popup") p.vy += 24 * dt;
    if (p.age >= p.life) fx.splice(i, 1);
  }
}
function drawFx() {
  for (const p of fx) {
    const q = project({ x: p.x, y: p.y });
    const t = 1 - p.age / p.life;
    if (p.kind === "ripple") {
      const r = (p.size + p.age * 95) * Math.max(zoom, 0.75);
      ctx.globalAlpha = t * 0.75;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(q.x, q.y, r, 0, 7);
      ctx.stroke();
      continue;
    }
    if (p.kind === "popup") {
      ctx.globalAlpha = t;
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "#17392fdd";
      ctx.fillText(p.text, q.x + 1, q.y - p.age * 42 + 1);
      ctx.fillStyle = p.color;
      ctx.fillText(p.text, q.x, q.y - p.age * 42);
      continue;
    }
    ctx.globalAlpha = t * (p.kind === "steam" ? 0.45 : 0.85);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(q.x, q.y, p.size * Math.max(zoom, 0.8) * t, 0, 7);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}
function drawAmbient() {
  const g = ctx.createLinearGradient(0, 0, 0, height);
  g.addColorStop(0, "#55664d");
  g.addColorStop(0.4, "#8fa07f");
  g.addColorStop(1, "#b8c7a3");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);
  const glow = ctx.createRadialGradient(
    width * 0.7,
    height * 0.15,
    10,
    width * 0.55,
    height * 0.35,
    Math.max(width, height) * 0.55,
  );
  glow.addColorStop(0, "#ffe9a428");
  glow.addColorStop(1, "#0000");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
}
function lerpCamera(dt) {
  if (!followRunner || !player) return;
  const ease = Math.min(1, dt * 6.5);
  camera.x += (player.x - camera.x) * ease;
  camera.y += (player.y - camera.y) * ease;
}
function pulseScore(id) {
  const el = $(id)?.closest(".stat");
  if (!el) return;
  el.classList.remove("stat-pop");
  void el.offsetWidth;
  el.classList.add("stat-pop");
}
function updateProgressBars() {
  if (!map || !player) return;
  const chai = $("chai-bar"),
    lunch = $("lunch-bar"),
    places = $("places-bar");
  if (chai && map.tokens.length)
    chai.style.width = `${(player.cups.size / map.tokens.length) * 100}%`;
  if (lunch && map.lunch?.length)
    lunch.style.width = `${(player.lunches.size / map.lunch.length) * 100}%`;
  if (places && map.checkpoints.length)
    places.style.width = `${(player.places.size / map.checkpoints.length) * 100}%`;
}
function showCelebration() {
  const el = $("celebration");
  if (!el) return;
  $("celebration-time").textContent = `Your time: ${format(player.time)}`;
  el.hidden = false;
  spawnBurst(player.x, player.y, "#d1e7b2", 22, 1.3);
  spawnBurst(player.x, player.y, "#f9d563", 16, 1);
  playSound("complete");
}
function hideCelebration() {
  const el = $("celebration");
  if (el) el.hidden = true;
}
function line(points, color, size) {
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  points.forEach((p, i) => {
    const q = project(p);
    i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y);
  });
  ctx.stroke();
}
function shape(points, color, z = 0) {
  ctx.fillStyle = color;
  ctx.beginPath();
  points.forEach((p, i) => {
    const q = project(p, z);
    i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y);
  });
  ctx.closePath();
  ctx.fill();
}
function label(p, text, color = "#17392f") {
  const q = project(p);
  if (q.x < -100 || q.x > width + 100 || q.y < 0 || q.y > height) return;
  ctx.font = "600 10px sans-serif";
  ctx.textAlign = "center";
  const textWidth = ctx.measureText(text).width;
  ctx.fillStyle = "#f4f3e9e8";
  ctx.fillRect(q.x - textWidth / 2 - 4, q.y - 11, textWidth + 8, 16);
  ctx.fillStyle = color;
  ctx.fillText(text, q.x, q.y);
}
function drawRunner(sprinting) {
  if (!player) return;
  const q = project(player),
    moving =
      keys.size + touches.size > 0 || joyVector.x || joyVector.y
        ? !paused
        : false,
    swing = moving ? Math.sin(player.distance * 0.6) * 6 : 0,
    bob = moving ? Math.sin(player.distance * 0.9) * 2 : 0,
    scale = 1.55;
  ctx.save();
  ctx.translate(q.x, q.y + bob);
  if (sprinting && moving) {
    ctx.strokeStyle = "#ffffff55";
    ctx.lineWidth = 2;
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(-10 - i * 8, -6);
      ctx.lineTo(-18 - i * 10, -6 + (i % 2 ? 3 : -3));
      ctx.stroke();
    }
  }
  const pulse = 1 + Math.sin(clock * 3) * 0.04;
  ctx.strokeStyle = sprinting ? "#f9d563aa" : "#ffffffcc";
  ctx.lineWidth = sprinting ? 4 : 3;
  ctx.beginPath();
  ctx.arc(0, -8, 24 * scale * pulse, 0, 7);
  ctx.stroke();
  ctx.fillStyle = "#16392f55";
  ctx.beginPath();
  ctx.ellipse(0, 6, 14 * scale, 7 * scale, 0, 0, 7);
  ctx.fill();
  ctx.scale(scale, scale);
  ctx.lineCap = "round";
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#223e45";
  for (const sign of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(sign * 4, -9);
    ctx.lineTo(sign * 5 + swing * sign, 3);
    ctx.stroke();
  }
  ctx.fillStyle = avatar === "woman" ? "#7562c8" : "#ed7954";
  ctx.fillRect(-8, -28, 16, 20);
  ctx.strokeStyle = "#d6a475";
  for (const sign of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(sign * 9, -25);
    ctx.lineTo(sign * 12, -15 + swing * sign);
    ctx.stroke();
  }
  ctx.fillStyle = "#e4b68b";
  ctx.beginPath();
  ctx.arc(0, -36, 8, 0, 7);
  ctx.fill();
  ctx.fillStyle = "#263b30";
  ctx.beginPath();
  ctx.arc(0, -39, 8, Math.PI, Math.PI * 2);
  ctx.fill();
  if (avatar === "woman") {
    ctx.beginPath();
    ctx.ellipse(9, -33, 4, 10, -0.5, 0, 7);
    ctx.fill();
  }
  ctx.restore();
}
function minimap() {
  const w = width < 500 ? 94 : 135,
    h = 95,
    x = width - w - 12,
    y = 15,
    all = map.segments.flatMap((s) => [s.a, s.b]);
  const minX = Math.min(...all.map((p) => p.x)),
    maxX = Math.max(...all.map((p) => p.x)),
    minY = Math.min(...all.map((p) => p.y)),
    maxY = Math.max(...all.map((p) => p.y));
  const f = (p) => ({
    x: x + ((p.x - minX) / (maxX - minX || 1)) * w,
    y: y + ((p.y - minY) / (maxY - minY || 1)) * h,
  });
  ctx.fillStyle = "#f4f3e9ee";
  ctx.fillRect(x - 5, y - 5, w + 10, h + 25);
  ctx.strokeStyle = "#80917a";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (const s of map.segments) {
    const a = f(s.a),
      b = f(s.b);
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
  }
  ctx.stroke();
  ctx.fillStyle = "#ed7954";
  const p = f(player);
  ctx.beginPath();
  ctx.arc(p.x, p.y, 4, 0, 7);
  ctx.fill();
  ctx.font = "9px sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "#16392f";
  ctx.fillText(map.campus?.minimap || "N ↑  CAMPUS", x + w / 2, y + h + 14);
}
function updateCampusUI() {
  const campus = getCampus(campusId);
  const heading = document.querySelector(".map-heading strong");
  if (heading) heading.textContent = `${campus.label}`;
  const mode = $("view-mode");
  if (mode) mode.textContent = `${campus.city.toUpperCase()} · ${campus.region.toUpperCase()}`;
  const link = $("satellite-link");
  if (link)
    link.href = `https://www.google.com/maps/@?api=1&map_action=map&center=${campus.satellite.lat},${campus.satellite.lon}&zoom=19&basemap=satellite`;
  const all = document.querySelector(".all-companies");
  if (all) {
    all.href = campus.directoryUrl;
    all.textContent = `Full ${campus.short} directory ↗`;
  }
  const eyebrow = document.querySelector(".explorer-heading .eyebrow");
  if (eyebrow) eyebrow.textContent = `${campus.region.toUpperCase()}, KERALA`;
  const explorerTitle = document.querySelector(".explorer-heading h1 em");
  if (explorerTitle) explorerTitle.textContent = `${campus.short}.`;
  const welcomeCopy = document.querySelector(".welcome-copy > p:last-of-type");
  if (welcomeCopy)
    welcomeCopy.textContent = `Take the long way home. Find familiar buildings, collect a little chai, and explore the roads around ${campus.short}.`;
  document.title = `${campus.short} After Hours — Explore the campus`;
}
function switchCampus(nextId) {
  if (nextId === campusId) return;
  campusId = nextId;
  map = null;
  mapPromise = null;
  try {
    localStorage.setItem("ipd-campus", campusId);
  } catch {}
  updateCampusUI();
  directory();
  ensureMap()
    .then(() => {
      applyLoadedMap();
      $("start").textContent = map ? "Enter the campus ↗" : "Enter the campus ↗";
    })
    .catch(() => {
      $("load-status").textContent = `Loading ${getCampus(campusId).label} map…`;
    });
}
function drawChaiToken(p, i) {
  const q = project(p),
    pulse = 1 + Math.sin(clock * 4 + i) * 0.18,
    bob = Math.sin(clock * 3 + i * 0.7) * 2,
    r = 7 * pulse * Math.max(zoom, 0.7);
  ctx.fillStyle = "#f9d56333";
  ctx.beginPath();
  ctx.arc(q.x, q.y + bob, r + 5, 0, 7);
  ctx.fill();
  ctx.fillStyle = "#f9d563";
  ctx.beginPath();
  ctx.arc(q.x, q.y + bob, r, 0, 7);
  ctx.fill();
  ctx.fillStyle = "#755023";
  ctx.font = "bold 9px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("☕", q.x, q.y + bob + 3);
}
function drawLunchSpot(p, i) {
  const q = project(p),
    pulse = 1 + Math.sin(clock * 3.2 + i * 0.9) * 0.16,
    bob = Math.sin(clock * 2.8 + i) * 2.5,
    r = 8 * pulse * Math.max(zoom, 0.7);
  ctx.fillStyle = "#ff8f5a33";
  ctx.beginPath();
  ctx.arc(q.x, q.y + bob, r + 6, 0, 7);
  ctx.fill();
  ctx.fillStyle = "#ff8f5a";
  ctx.beginPath();
  ctx.arc(q.x, q.y + bob, r, 0, 7);
  ctx.fill();
  ctx.fillStyle = "#6b2d12";
  ctx.font = "bold 10px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("🍛", q.x, q.y + bob + 4);
}
function drawCheckpoint(p, i, found) {
  const q = project(p),
    pulse = found ? 1 : 1 + Math.sin(clock * 2.5 + i) * 0.12;
  ctx.strokeStyle = found ? "#477952" : "#fff2ad";
  ctx.lineWidth = found ? 2 : 3;
  ctx.beginPath();
  ctx.arc(q.x, q.y, 12 * pulse, 0, 7);
  ctx.stroke();
  if (!found) {
    ctx.strokeStyle = "#fff2ad44";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(q.x, q.y, 18 * pulse, 0, 7);
    ctx.stroke();
  }
}
function draw() {
  drawAmbient();
  if (!map) {
    ctx.strokeStyle = "#96ab7f";
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 45) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    return;
  }
  for (const r of map.roads) {
    const thin = ["footway", "path", "steps", "pedestrian"].includes(
      r.tags.highway,
    );
    line(r.points, "#d8d4b9", (thin ? 8 : 18) * zoom);
    line(r.points, r.walkable ? "#829082" : "#68736b", (thin ? 4 : 12) * zoom);
  }
  for (const b of map.buildings) {
    const shadow = b.points.map((p) => ({ x: p.x + 3 / zoom, y: p.y + 4 / zoom }));
    shape(shadow, "#2f403888");
    shape(b.points, "#4a6356");
    shape(b.points, "#799187", 6);
  }
  for (const r of map.roads) {
    if (r.name !== "Unnamed mapped path")
      label(r.points[Math.floor(r.points.length / 2)], r.name, "#5f6e5d");
  }
  for (const p of map.places.filter(
    (p) => p.kind === "building" || p.kind === "company",
  ))
    label(p, p.name);
  if (!player) return;
  map.tokens.forEach((p, i) => {
    if (player.cups.has(i)) return;
    drawChaiToken(p, i);
  });
  map.lunch?.forEach((p, i) => {
    if (player.lunches.has(i)) return;
    drawLunchSpot(p, i);
  });
  map.checkpoints.forEach((p, i) => {
    drawCheckpoint(p, i, player.places.has(i));
  });
  if (selected) {
    const q = project(selected);
    ctx.strokeStyle = "#884ed2";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(q.x, q.y, 18, 0, 7);
    ctx.stroke();
    label({ ...selected, y: selected.y - 24 / zoom }, selected.name, "#68449a");
  }
  drawFx();
  drawRunner(lastMove.sprinting);
  if (lastMove.x || lastMove.y) {
    const q = project(player),
      len = Math.hypot(lastMove.x, lastMove.y) || 1;
    ctx.fillStyle = "#ffffffcc";
    ctx.beginPath();
    ctx.moveTo(q.x, q.y - 20);
    ctx.lineTo(q.x - (lastMove.x / len) * 14, q.y - 20 - (lastMove.y / len) * 14);
    ctx.lineTo(q.x + (lastMove.y / len) * 5, q.y - 20 - (lastMove.x / len) * 5);
    ctx.closePath();
    ctx.fill();
  }
  minimap();
}
function reset() {
  player = {
    ...map.spawn,
    time: 0,
    distance: 0,
    cups: new Set(),
    lunches: new Set(),
    places: new Set(),
    finished: false,
    road: map.spawn.segment.name,
  };
  selected = null;
  keys.clear();
  touches.clear();
  fx.length = 0;
  hideCelebration();
  active = true;
  paused = false;
  setFollowRunner(true);
  $("pause").textContent = "Pause";
  $("hint").textContent =
    "Golden ☕ chai and orange 🍛 lunch spots are waiting on the roads.";
  $("pause").disabled = false;
  $("restart").disabled = false;
  $("welcome").hidden = true;
  setMovePadVisible(true);
  updateRunnerChip();
  updateScale();
  say(`Explore Infopark.${mapSourceNote()}`);
  canvas.focus();
}
function pause() {
  if (!active) return;
  paused = !paused;
  keys.clear();
  touches.clear();
  resetJoystick();
  $("pause").textContent = paused ? "Resume" : "Pause";
  say(
    paused ? "Paused. Press Resume or P to continue." : "Back on the road.",
    paused,
  );
}
function hud() {
  const ll = map.toLatLon(player);
  $("tokens").textContent = `${player.cups.size} / ${map.tokens.length} chai`;
  $("lunch").textContent = `${player.lunches.size} / ${map.lunch?.length || 0} lunch`;
  $("places").textContent =
    `${player.places.size} / ${map.checkpoints.length} places`;
  $("timer").textContent = format(player.time);
  $("position").textContent =
    `Runner: ${ll.lat.toFixed(5)}, ${ll.lon.toFixed(5)} · ${player.road}`;
  $("map-link").href =
    `https://www.openstreetmap.org/?mlat=${ll.lat.toFixed(6)}&mlon=${ll.lon.toFixed(6)}#map=18/${ll.lat.toFixed(6)}/${ll.lon.toFixed(6)}`;
  updateProgressBars();
}
function frame(t) {
  const dt = last ? Math.min((t - last) / 1000, 0.05) : 0;
  last = t;
  clock += dt;
  updateFx(dt);
  if (active) lerpCamera(dt);
  if (active && !paused) {
    const held = new Set([...keys, ...touches.values()]);
    let dx =
        Number(held.has("ArrowRight") || held.has("d")) -
        Number(held.has("ArrowLeft") || held.has("a")),
      dy =
        Number(held.has("ArrowDown") || held.has("s")) -
        Number(held.has("ArrowUp") || held.has("w"));
    if (joyVector.x || joyVector.y) {
      dx = joyVector.x;
      dy = joyVector.y;
    }
    const sprinting = held.has("Shift");
    lastMove = { x: dx, y: dy, sprinting };
    moveOnRoad(player, dx, dy, dt, map, sprinting);
    if (sprinting && (dx || dy) && Math.random() < 0.25)
      spawnBurst(player.x, player.y, "#d8d4b966", 2, 0.4);
    if (!player.finished) player.time += dt;
    map.tokens.forEach((p, i) => {
      if (
        !player.cups.has(i) &&
        Math.hypot(p.x - player.x, p.y - player.y) < 13
      ) {
        player.cups.add(i);
        celebrateCollect(p.x, p.y, {
          color: "#f9d563",
          popup: "+☕ Chai",
          sound: "chai",
          statId: "tokens",
          message: "Chai collected!",
          extra: spawnSteam,
        });
      }
    });
    map.lunch?.forEach((p, i) => {
      if (
        !player.lunches.has(i) &&
        Math.hypot(p.x - player.x, p.y - player.y) < 14
      ) {
        player.lunches.add(i);
        celebrateCollect(p.x, p.y, {
          color: "#ff8f5a",
          popup: "+🍛 Lunch",
          sound: "lunch",
          statId: "lunch",
          message: p.name ? `Lunch at ${p.name}!` : "Lunch spot found!",
          extra: spawnSparkle,
        });
      }
    });
    map.checkpoints.forEach((p, i) => {
      if (
        !player.places.has(i) &&
        Math.hypot(p.x - player.x, p.y - player.y) < 20
      ) {
        player.places.add(i);
        celebrateCollect(p.x, p.y, {
          color: "#b8e08a",
          popup: "✦ Found",
          sound: "place",
          statId: "places",
          message: `Found ${p.name}`,
          extra: (x, y) => spawnBurst(x, y, "#fff2ad", 8, 0.8),
        });
      }
    });
    if (
      !player.finished &&
      player.cups.size === map.tokens.length &&
      player.places.size === map.checkpoints.length
    ) {
      player.finished = true;
      showCelebration();
      say("Campus trail complete! Keep exploring or restart.", true);
      if (!best || player.time < best) {
        best = player.time;
        try {
          localStorage.setItem(bestKey(), String(best));
        } catch {}
        $("best").textContent = `Best for this map: ${format(best)}`;
      }
    }
    hud();
  }
  if (t > noticeEnd) $("notice").textContent = "";
  draw();
  requestAnimationFrame(frame);
}
function bestKey() {
  const spots = [
    ...map.tokens,
    ...(map.lunch || []),
    ...map.checkpoints,
  ];
  return (
    `ipd-map-best-${map.campusId}-` +
    spots.map((p) => `${p.x.toFixed(0)},${p.y.toFixed(0)}`).join(";")
  );
}
function buildingMatch(c) {
  return map?.places.find(
    (p) =>
      p.kind === "building" &&
      p.name.toLowerCase().includes(c.building.toLowerCase()) &&
      !p.name.toLowerCase().includes("annexe"),
  );
}
function directory() {
  const list = $("company-list"),
    empty = $("search-empty");
  list.replaceChildren();
  const filtered = getCompanies(campusId).filter((c) => {
    if (!searchQuery) return true;
    const hay = `${c.name} ${c.building} ${c.address}`.toLowerCase();
    return hay.includes(searchQuery);
  });
  empty.hidden = filtered.length > 0;
  for (const c of filtered) {
    const card = document.createElement("article"),
      title = document.createElement("h3"),
      address = document.createElement("p"),
      source = document.createElement("a"),
      button = document.createElement("button");
    title.textContent = c.name;
    address.textContent = c.address;
    source.textContent = "Official company listing ↗";
    source.href = c.url;
    source.target = "_blank";
    source.rel = "noopener noreferrer";
    const match = buildingMatch(c);
    if (!map) {
      button.textContent = "Enter campus to locate";
      button.disabled = true;
    } else if (match) {
      button.textContent = "Go to building in game";
      button.onclick = () => {
        const near = nearestRoad(match, map.segments);
        if (near.distance > 180) {
          say("No mapped road close enough to this building.");
          return;
        }
        selected = { ...match, name: c.building };
        player.x = near.x;
        player.y = near.y;
        player.road = near.segment.name;
        setFollowRunner(true);
        hud();
        say(`Viewing ${c.building} on the map.`);
        canvas.focus();
      };
    } else {
      button.textContent = "Building pin unavailable";
      button.disabled = true;
    }
    card.append(title, address, button, source);
    list.append(card);
  }
}
let mapPromise = null;
async function ensureMap() {
  if (map) return map;
  if (!mapPromise) {
    mapPromise = loadMap(campusId)
      .then((loaded) => {
        map = loaded;
        campusId = loaded.campusId;
        directory();
        return loaded;
      })
      .catch((error) => {
        mapPromise = null;
        throw error;
      });
  }
  return mapPromise;
}
function applyLoadedMap() {
  try {
    const n = Number(localStorage.getItem(bestKey()));
    best = n > 0 ? n : null;
  } catch {}
  $("best").textContent = best
    ? `Best for this map: ${format(best)}`
    : "No completed runs for this map yet.";
  const stamp = map.stamp ? map.stamp.slice(0, 10) : "unknown date";
  $("data-date").textContent =
    `OSM map snapshot: ${stamp}. Company addresses checked 20 Sep 2026.${mapSourceNote()}`;
  $("load-status").textContent = map
    ? "Campus map ready. Both runners have the same speed."
    : "Loads public map data. Both runners have the same speed.";
}
$("start").onclick = async () => {
  campusId = document.querySelector("[name=campus]:checked")?.value || campusId;
  avatar = document.querySelector("[name=runner]:checked").value;
  try {
    localStorage.setItem("ipd-runner", avatar);
    localStorage.setItem("ipd-campus", campusId);
  } catch {}
  map = null;
  mapPromise = null;
  updateCampusUI();
  const button = $("start");
  button.disabled = true;
  button.classList.add("is-loading");
  button.textContent = map ? "Starting your run…" : "Loading real campus map…";
  $("load-status").textContent = map
    ? "Preparing your runner on the mapped roads."
    : "Fetching mapped roads and buildings. This can take up to 35 seconds.";
  try {
    await ensureMap();
    applyLoadedMap();
    reset();
    directory();
    hud();
  } catch (error) {
    $("load-status").textContent =
      `${error.message} No fictional roads have been substituted.`;
    button.textContent = "Retry loading the map";
  } finally {
    button.disabled = false;
    button.classList.remove("is-loading");
  }
};
$("pause").onclick = pause;
$("restart").onclick = () => {
  if (map) reset();
};
$("change-runner").onclick = () => {
  if (active && !paused) pause();
  setMovePadVisible(false);
  resetJoystick();
  $("welcome").hidden = false;
  $("start").textContent = map ? "Start a new run" : "Enter the campus ↗";
  $("load-status").textContent =
    "Changing your runner starts a new challenge. Both runners have the same speed.";
};
$("recenter").onclick = () => {
  if (!player) return;
  setFollowRunner(true);
  say("Following your runner.");
  canvas.focus();
};
$("zoom-in").onclick = () => {
  zoom = Math.min(3, zoom + 0.25);
  updateScale();
};
$("zoom-out").onclick = () => {
  zoom = Math.max(0.5, zoom - 0.25);
  updateScale();
};
$("fullscreen").onclick = async () => {
  const game = document.querySelector(".game");
  try {
    if (!document.fullscreenElement) await game.requestFullscreen();
    else await document.exitFullscreen();
  } catch {}
};
document.addEventListener("fullscreenchange", () => {
  $("fullscreen").textContent = document.fullscreenElement ? "⤢" : "⛶";
});
$("sound-toggle").onclick = () => {
  soundOn = !soundOn;
  const btn = $("sound-toggle");
  btn.setAttribute("aria-pressed", String(soundOn));
  btn.textContent = soundOn ? "🔊" : "🔇";
  try {
    localStorage.setItem("ipd-game-sound", soundOn ? "on" : "off");
  } catch {}
  if (soundOn) playSound("chai");
};
try {
  soundOn = localStorage.getItem("ipd-game-sound") !== "off";
  $("sound-toggle").setAttribute("aria-pressed", String(soundOn));
  $("sound-toggle").textContent = soundOn ? "🔊" : "🔇";
} catch {}
$("company-search").addEventListener("input", (e) => {
  searchQuery = e.target.value.trim().toLowerCase();
  directory();
});
for (const input of document.querySelectorAll("[name=runner]")) {
  input.addEventListener("change", () => {
    avatar = input.value;
    updateRunnerChip();
    try {
      localStorage.setItem("ipd-runner", avatar);
    } catch {}
  });
}
for (const input of document.querySelectorAll("[name=campus]")) {
  input.addEventListener("change", () => {
    if (!active || $("welcome").hidden === false) switchCampus(input.value);
  });
}
canvas.addEventListener(
  "wheel",
  (e) => {
    if (!active || !$("welcome").hidden) return;
    e.preventDefault();
    zoom = Math.min(3, Math.max(0.5, zoom - e.deltaY * 0.0015));
    updateScale();
  },
  { passive: false },
);
canvas.addEventListener("pointerdown", (e) => {
  if (!active || !player || $("welcome").hidden === false || e.button !== 0)
    return;
  drag = {
    x: e.clientX,
    y: e.clientY,
    cx: cameraCenter().x,
    cy: cameraCenter().y,
  };
  setFollowRunner(false);
  canvas.setPointerCapture(e.pointerId);
});
for (const event of ["pointermove", "pointerup", "pointercancel"]) {
  canvas.addEventListener(event, (e) => {
    if (!drag) return;
    if (event === "pointermove") {
      camera.x = drag.cx - (e.clientX - drag.x) / zoom;
      camera.y = drag.cy - (e.clientY - drag.y) / zoom;
      return;
    }
    drag = null;
  });
}
window.addEventListener("keydown", (e) => {
  if (
    !active ||
    !$("welcome").hidden ||
    e.target.closest("a,input,select,textarea")
  )
    return;
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (
    [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "w",
      "a",
      "s",
      "d",
      "Shift",
      "p",
    ].includes(k)
  ) {
    e.preventDefault();
    if (k === "p") {
      if (!e.repeat) pause();
    } else keys.add(k);
  }
});
window.addEventListener("keyup", (e) =>
  keys.delete(e.key.length === 1 ? e.key.toLowerCase() : e.key),
);
for (const b of document.querySelectorAll("[data-key]")) {
  b.addEventListener("pointerdown", (e) => {
    if (!active || paused) return;
    e.preventDefault();
    e.stopPropagation();
    b.setPointerCapture(e.pointerId);
    touches.set(e.pointerId, b.dataset.key);
  });
  for (const event of ["pointerup", "pointercancel", "lostpointercapture"])
    b.addEventListener(event, (e) => touches.delete(e.pointerId));
}
function setJoystickFromPointer(clientX, clientY) {
  const zone = joyZone(),
    knob = joyKnob();
  if (!zone || !knob) return;
  const rect = zone.getBoundingClientRect(),
    cx = rect.left + rect.width / 2,
    cy = rect.top + rect.height / 2,
    max = rect.width * 0.28,
    rawX = clientX - cx,
    rawY = clientY - cy,
    length = Math.hypot(rawX, rawY) || 1,
    clamped = Math.min(length, max);
  joyVector.x = (rawX / length) * (clamped / max);
  joyVector.y = (rawY / length) * (clamped / max);
  knob.style.transform = `translate(${joyVector.x * max}px, ${joyVector.y * max}px)`;
}
const zone = joyZone();
if (zone) {
  zone.addEventListener("pointerdown", (e) => {
    if (!active || paused || !$("welcome").hidden) return;
    e.preventDefault();
    e.stopPropagation();
    joyDrag = e.pointerId;
    zone.setPointerCapture(e.pointerId);
    setJoystickFromPointer(e.clientX, e.clientY);
  });
  for (const event of ["pointermove", "pointerup", "pointercancel"]) {
    zone.addEventListener(event, (e) => {
      if (joyDrag !== e.pointerId) return;
      if (event === "pointermove") {
        setJoystickFromPointer(e.clientX, e.clientY);
        return;
      }
      resetJoystick();
    });
  }
}
window.addEventListener("blur", () => {
  keys.clear();
  touches.clear();
  resetJoystick();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden && active && !paused) pause();
});
function resize() {
  const r = canvas.getBoundingClientRect();
  width = r.width;
  height = r.height;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  updateScale();
}
try {
  const saved = localStorage.getItem("ipd-runner");
  if (saved === "woman" || saved === "man") {
    avatar = saved;
    const input = document.querySelector(`[name=runner][value="${saved}"]`);
    if (input) input.checked = true;
  }
  const savedCampus = localStorage.getItem("ipd-campus");
  if (savedCampus && getCampus(savedCampus)) {
    campusId = savedCampus;
    const campusInput = document.querySelector(
      `[name=campus][value="${savedCampus}"]`,
    );
    if (campusInput) campusInput.checked = true;
  }
} catch {}
updateRunnerChip();
updateCampusUI();
setFollowRunner(true);
setMovePadVisible(false);
directory();
resize();
requestAnimationFrame(frame);
ensureMap()
  .then(() => {
    applyLoadedMap();
    $("start").textContent = "Enter the campus ↗";
  })
  .catch(() => {});
