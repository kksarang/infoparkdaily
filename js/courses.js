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
  const topicCount = (t) => COURSES.filter((c) => (c.topics || []).includes(t)).length;
  topicBar.innerHTML =
    `<span class="courses-topics-label">Topic</span><button type="button" data-topic="all" aria-pressed="${topic === "all"}">All</button>` +
    topics.map((t) => `<button type="button" data-topic="${esc(t)}" aria-pressed="${t === topic}">${esc(t)} <span>${topicCount(t)}</span></button>`).join("");

  /* Provider badge: initials on a colour picked from the provider name, so each provider looks the same everywhere. */
  const providerName = (c) => c.provider.split(" ·")[0].split(" (")[0].replace(/^Deloitte Australia on /, "Forage");
  const initials = (name) => name.replace(/[^A-Za-z ]/g, " ").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const hue = (name) => [...name].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) % 360, 7);

  const totalEl = document.getElementById("courses-stat-total");
  const provEl = document.getElementById("courses-stat-providers");
  if (totalEl) totalEl.textContent = String(COURSES.length);
  if (provEl) provEl.textContent = String(new Set(COURSES.map(providerName)).size);

  grid.innerHTML = COURSES.map((c) => {
    const pn = providerName(c);
    const kindKey = c.kind.toLowerCase().replace(/\s+/g, "-");
    return `<article class="course-card" data-kind="${esc(c.kind)}" data-topics="${esc((c.topics || []).join("|"))}" data-search="${esc([c.title, c.provider, c.kind, c.summary, ...(c.topics || [])].join(" ").toLowerCase())}">
      <header class="course-head">
        <span class="course-badge" style="--h:${hue(pn)}" aria-hidden="true">${esc(initials(pn))}</span>
        <span class="course-by"><strong>${esc(c.provider)}</strong><small>${esc(c.level || "")}</small></span>
        <span class="course-kind course-kind--${esc(kindKey)}">${esc(c.kind)}</span>
      </header>
      <h2>${esc(c.title)}</h2>
      <p class="course-summary">${esc(c.summary)}</p>
      <ul class="course-tags" aria-label="Topics">${(c.topics || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      <footer class="course-foot">
        ${c.certificate ? `<p class="course-cert"><span aria-hidden="true">✓</span>${esc(c.certificate)}</p>` : ""}
        ${c.note ? `<p class="course-note"><span aria-hidden="true">ⓘ</span>${esc(c.note)}</p>` : ""}
        <div class="course-actions">
          <span class="course-cost">${esc(c.cost)}</span>
          <a class="course-open" href="${esc(safeUrl(c.url))}" target="_blank" rel="noopener">Open course <span aria-hidden="true">↗</span><span class="sr-only"> — ${esc(c.title)} (opens in a new tab)</span></a>
        </div>
        <p class="course-checked">Link checked ${esc(fmt(c.checked))}</p>
      </footer>
    </article>`;
  }).join("");

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
