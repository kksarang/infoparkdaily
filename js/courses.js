/* /courses/: free certifications, courses and virtual internships (data/courses-data.js). */
(function () {
  const grid = document.getElementById("courses-grid");
  if (!grid || typeof COURSES === "undefined") return;
  const kindBar = document.getElementById("courses-kind");
  const topicBar = document.getElementById("courses-topic");
  const q = document.getElementById("courses-q");
  const count = document.getElementById("courses-count");
  const empty = document.getElementById("courses-empty");
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const safeUrl = (u) => (/^https:\/\//.test(u) ? u : "#");
  const fmt = (d) => {
    const t = Date.parse(d);
    return Number.isFinite(t) ? new Date(t).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";
  };

  let kind = "all";
  let topic = "all";
  /* ?kind=Course or ?topic=Python preselects a filter (shareable links). */
  const params = new URLSearchParams(location.search);
  if (params.get("kind")) kind = params.get("kind");
  if (params.get("topic")) topic = params.get("topic");

  const topics = [...new Set(COURSES.flatMap((c) => c.topics || []))].sort();
  topicBar.innerHTML =
    `<button type="button" data-topic="all" aria-pressed="${topic === "all"}">All topics</button>` +
    topics.map((t) => `<button type="button" data-topic="${esc(t)}" aria-pressed="${t === topic}">${esc(t)}</button>`).join("");

  grid.innerHTML = COURSES.map(
    (c) => `<article class="course-card" data-kind="${esc(c.kind)}" data-topics="${esc((c.topics || []).join("|"))}" data-search="${esc([c.title, c.provider, c.kind, c.summary, ...(c.topics || [])].join(" ").toLowerCase())}">
      <div class="course-top"><span class="course-kind course-kind--${esc(c.kind.toLowerCase().replace(/\s+/g, "-"))}">${esc(c.kind)}</span><span class="course-cost">${esc(c.cost)}</span></div>
      <h2>${esc(c.title)}</h2>
      <p class="course-provider">${esc(c.provider)}${c.level ? ` · ${esc(c.level)}` : ""}</p>
      <p class="course-summary">${esc(c.summary)}</p>
      <ul class="course-facts">
        ${c.certificate ? `<li>${esc(c.certificate)}</li>` : ""}
        <li>Topics: ${esc((c.topics || []).join(", "))}</li>
      </ul>
      ${c.note ? `<p class="course-note">${esc(c.note)}</p>` : ""}
      <div class="course-actions">
        <a class="btn btn-primary" href="${esc(safeUrl(c.url))}" target="_blank" rel="noopener">Open official page ↗<span class="sr-only"> for ${esc(c.title)} (opens in a new tab)</span></a>
        <span class="course-checked">Link checked ${esc(fmt(c.checked))}</span>
      </div>
    </article>`
  ).join("");

  const sync = (bar, attr, value) =>
    bar.querySelectorAll(`[data-${attr}]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset[attr] === value)));

  function apply() {
    const term = (q.value || "").trim().toLowerCase();
    let shown = 0;
    grid.querySelectorAll(".course-card").forEach((card) => {
      const ok =
        (kind === "all" || card.dataset.kind === kind) &&
        (topic === "all" || card.dataset.topics.split("|").includes(topic)) &&
        (!term || card.dataset.search.includes(term));
      card.hidden = !ok;
      shown += ok;
    });
    count.textContent = `${shown} free ${shown === 1 ? "programme" : "programmes"}`;
    empty.hidden = shown > 0;
  }

  kindBar.addEventListener("click", (e) => {
    const b = e.target.closest("[data-kind]");
    if (!b) return;
    kind = b.dataset.kind;
    sync(kindBar, "kind", kind);
    apply();
  });
  topicBar.addEventListener("click", (e) => {
    const b = e.target.closest("[data-topic]");
    if (!b) return;
    topic = b.dataset.topic;
    sync(topicBar, "topic", topic);
    apply();
  });
  q.addEventListener("input", apply);
  sync(kindBar, "kind", kind);
  apply();
  /* Phones: keep the current section tab in view in the scrolling tab row. */
  document.querySelector('.courses-tabs [aria-current="page"]')?.scrollIntoView({ block: "nearest", inline: "end" });
})();
