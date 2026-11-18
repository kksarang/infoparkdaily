/* /courses/: free certifications, courses and virtual internships (data/courses-data.js). */
(function () {
  const grid = document.getElementById("courses-grid");
  if (!grid || typeof COURSES === "undefined") return;
  const kindBar = document.getElementById("courses-kind");
  const topicBar = document.getElementById("courses-topic");
  const q = document.getElementById("courses-q");
  const levelSel = document.getElementById("courses-level");
  const sortSel = document.getElementById("courses-sort");
  const count = document.getElementById("courses-count");
  const empty = document.getElementById("courses-empty");
  const reset = document.getElementById("courses-reset");
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const safeUrl = (u) => (/^https:\/\//.test(u) ? u : "#");
  const fmt = (d) => {
    const t = Date.parse(d);
    return Number.isFinite(t) ? new Date(t).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";
  };
  /* "New" for programmes added in the last 10 days. */
  const isNew = (c) => {
    const t = Date.parse(c.added || "");
    return Number.isFinite(t) && Date.now() - t < 10 * 864e5;
  };
  const LEVELS = { Beginner: 0, Intermediate: 1, Advanced: 2 };

  /* Filters come from the URL (?kind=&topic=&level=&q=&sort=) so a filtered view can be shared. */
  const params = new URLSearchParams(location.search);
  const state = {
    kind: params.get("kind") || "all",
    topic: params.get("topic") || "all",
    level: params.get("level") || "all",
    sort: params.get("sort") || "new",
  };
  q.value = params.get("q") || "";
  levelSel.value = state.level;
  sortSel.value = state.sort;
  if (levelSel.value !== state.level) state.level = levelSel.value = "all";
  if (sortSel.value !== state.sort) state.sort = sortSel.value = "new";
  /* Hide level options no programme uses. */
  [...levelSel.options].forEach((o) => {
    if (o.value !== "all" && !COURSES.some((c) => c.level === o.value)) o.remove();
  });

  /* Type buttons get counts. */
  kindBar.querySelectorAll("[data-kind]").forEach((b) => {
    const k = b.dataset.kind;
    const n = k === "all" ? COURSES.length : COURSES.filter((c) => c.kind === k).length;
    if (k !== "all" && !n) b.remove();
    else b.insertAdjacentHTML("beforeend", ` <span class="courses-n">${n}</span>`);
  });

  /* Topics: most used first. */
  const topicCount = (t) => COURSES.filter((c) => (c.topics || []).includes(t)).length;
  const topics = [...new Set(COURSES.flatMap((c) => c.topics || []))].sort((a, b) => topicCount(b) - topicCount(a) || a.localeCompare(b));
  topicBar.innerHTML =
    `<button type="button" data-topic="all">All topics</button>` +
    topics.map((t) => `<button type="button" data-topic="${esc(t)}">${esc(t)} <span>${topicCount(t)}</span></button>`).join("");

  /* Provider badge: initials on a colour picked from the provider name, so each provider looks the same everywhere. */
  const providerName = (c) => c.provider.split(" ·")[0].split(" (")[0].replace(/^Deloitte Australia on /, "Forage");
  const initials = (name) => name.replace(/[^A-Za-z ]/g, " ").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const hue = (name) => [...name].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) % 360, 7);

  const totalEl = document.getElementById("courses-stat-total");
  const provEl = document.getElementById("courses-stat-providers");
  if (totalEl) totalEl.textContent = String(COURSES.length);
  if (provEl) provEl.textContent = String(new Set(COURSES.map(providerName)).size);

  const cards = COURSES.map((c, i) => {
    const pn = providerName(c);
    const kindKey = c.kind.toLowerCase().replace(/\s+/g, "-");
    const el = document.createElement("article");
    el.className = "course-card";
    el.innerHTML = `
      <header class="course-head">
        <span class="course-badge" style="--h:${hue(pn)}" aria-hidden="true">${esc(initials(pn))}</span>
        <span class="course-by"><strong>${esc(c.provider)}</strong></span>
        ${isNew(c) ? `<span class="course-new">New</span>` : ""}
      </header>
      <div class="course-labels">
        <span class="course-kind course-kind--${esc(kindKey)}">${esc(c.kind)}</span>
        ${c.level ? `<span class="course-level">${esc(c.level)}</span>` : ""}
        <span class="course-cost">${esc(c.cost)}</span>
      </div>
      <h2><a href="${esc(safeUrl(c.url))}" target="_blank" rel="noopener">${esc(c.title)}</a></h2>
      <p class="course-summary">${esc(c.summary)}</p>
      <ul class="course-tags" aria-label="Topics">${(c.topics || []).map((t) => `<li><button type="button" data-topic="${esc(t)}">${esc(t)}</button></li>`).join("")}</ul>
      <footer class="course-foot">
        ${c.certificate ? `<p class="course-cert"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/></svg>${esc(c.certificate)}</p>` : ""}
        ${c.note ? `<details class="course-note"><summary>Before you start</summary><p>${esc(c.note)}</p></details>` : ""}
        <div class="course-actions">
          <small class="course-checked" title="Added ${esc(fmt(c.added))}">Checked ${esc(fmt(c.checked))}</small>
          <a class="course-open" href="${esc(safeUrl(c.url))}" target="_blank" rel="noopener">Open<span class="sr-only"> ${esc(c.title)} (opens in a new tab)</span> <span aria-hidden="true">↗</span></a>
        </div>
      </footer>`;
    return { c, i, el, search: [c.title, c.provider, c.kind, c.summary, c.level, ...(c.topics || [])].join(" ").toLowerCase() };
  });

  const sorters = {
    /* Newest `added` first; same date → the entry added later to the list comes first. */
    new: (a, b) => String(b.c.added || "").localeCompare(String(a.c.added || "")) || b.i - a.i,
    az: (a, b) => a.c.title.localeCompare(b.c.title),
    level: (a, b) => (LEVELS[a.c.level] ?? 9) - (LEVELS[b.c.level] ?? 9) || a.c.title.localeCompare(b.c.title),
  };

  const sync = () => {
    kindBar.querySelectorAll("[data-kind]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.kind === state.kind)));
    topicBar.querySelectorAll("[data-topic]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.topic === state.topic)));
  };

  function writeUrl() {
    const p = new URLSearchParams();
    if (state.kind !== "all") p.set("kind", state.kind);
    if (state.topic !== "all") p.set("topic", state.topic);
    if (state.level !== "all") p.set("level", state.level);
    if (state.sort !== "new") p.set("sort", state.sort);
    if (q.value.trim()) p.set("q", q.value.trim());
    const s = p.toString();
    history.replaceState(null, "", location.pathname + (s ? "?" + s : ""));
  }

  function apply() {
    const term = q.value.trim().toLowerCase();
    const shown = cards
      .filter(({ c, search }) =>
        (state.kind === "all" || c.kind === state.kind) &&
        (state.topic === "all" || (c.topics || []).includes(state.topic)) &&
        (state.level === "all" || c.level === state.level) &&
        (!term || term.split(/\s+/).every((w) => search.includes(w))))
      .sort(sorters[state.sort] || sorters.new);
    grid.replaceChildren(...shown.map((x) => x.el));
    count.innerHTML = `<strong>${shown.length}</strong> free ${shown.length === 1 ? "programme" : "programmes"}`;
    empty.hidden = shown.length > 0;
    sync();
    writeUrl();
  }

  kindBar.addEventListener("click", (e) => {
    const b = e.target.closest("[data-kind]");
    if (!b) return;
    state.kind = b.dataset.kind;
    apply();
  });
  const pickTopic = (t) => {
    state.topic = t;
    apply();
    topicBar.querySelector('[aria-pressed="true"]')?.scrollIntoView({ block: "nearest", inline: "center" });
  };
  topicBar.addEventListener("click", (e) => {
    const b = e.target.closest("[data-topic]");
    if (b) pickTopic(b.dataset.topic);
  });
  /* Topic tags on a card filter by that topic. */
  grid.addEventListener("click", (e) => {
    const b = e.target.closest(".course-tags [data-topic]");
    if (!b) return;
    pickTopic(b.dataset.topic);
    document.querySelector(".courses-tools")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  q.addEventListener("input", apply);
  levelSel.addEventListener("change", () => { state.level = levelSel.value; apply(); });
  sortSel.addEventListener("change", () => { state.sort = sortSel.value; apply(); });
  reset?.addEventListener("click", () => {
    Object.assign(state, { kind: "all", topic: "all", level: "all" });
    levelSel.value = "all";
    q.value = "";
    apply();
  });

  apply();
  /* Phones: keep the current section tab in view in the scrolling tab row. */
  document.querySelector('.courses-tabs [aria-current="page"]')?.scrollIntoView({ block: "nearest", inline: "end" });
})();
