/* Daily Web Studio site pages: template filters, help search, design preview sizes.
 * Each part only runs on the page that has its markup. */

/* ---------- /studio/templates/ : type + style filters and search ---------- */
(() => {
  const grid = document.getElementById("tg-grid");
  if (!grid) return;
  const cards = [...grid.querySelectorAll(".tg-card")];
  const q = document.getElementById("tg-q");
  const count = document.getElementById("tg-count");
  const empty = document.getElementById("tg-empty");
  const typeBtns = [...document.querySelectorAll("[data-type]:not(.tg-card)")];
  const styleBtns = [...document.querySelectorAll("[data-style]")];
  const params = new URLSearchParams(location.search);
  let type = typeBtns.some((b) => b.dataset.type === params.get("type")) ? params.get("type") : "all";
  const styles = new Set();

  function apply() {
    const text = q.value.trim().toLowerCase();
    let shown = 0;
    cards.forEach((c) => {
      const ok =
        (type === "all" || c.dataset.type === type) &&
        [...styles].every((s) => c.dataset.styles.split(" ").includes(s)) &&
        (!text || c.dataset.q.includes(text));
      c.hidden = !ok;
      shown += ok;
    });
    typeBtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.type === type)));
    styleBtns.forEach((b) => b.setAttribute("aria-pressed", String(styles.has(b.dataset.style))));
    count.textContent = `${shown} design${shown === 1 ? "" : "s"}`;
    empty.hidden = shown > 0;
    const url = new URL(location.href);
    if (type === "all") url.searchParams.delete("type");
    else url.searchParams.set("type", type);
    history.replaceState(null, "", url);
  }
  typeBtns.forEach((b) => b.addEventListener("click", () => ((type = b.dataset.type), apply())));
  styleBtns.forEach((b) =>
    b.addEventListener("click", () => {
      const s = b.dataset.style;
      styles.has(s) ? styles.delete(s) : styles.add(s);
      apply();
    }),
  );
  q.addEventListener("input", apply);
  apply();
})();

/* ---------- /studio/help/ : search across all answers ---------- */
(() => {
  const q = document.getElementById("hc-q");
  if (!q) return;
  const groups = [...document.querySelectorAll(".hc-group")];
  const empty = document.getElementById("hc-empty");
  q.addEventListener("input", () => {
    const text = q.value.trim().toLowerCase();
    let total = 0;
    groups.forEach((g) => {
      let shown = 0;
      g.querySelectorAll("details").forEach((d) => {
        const ok = !text || d.textContent.toLowerCase().includes(text);
        d.hidden = !ok;
        if (text && ok) d.open = true;
        shown += ok;
      });
      g.hidden = shown === 0;
      total += shown;
    });
    empty.hidden = total > 0;
  });
  /* Opening a topic link opens its first answer. */
  if (location.hash) document.querySelector(`${CSS.escape(location.hash)} details`)?.setAttribute("open", "");
})();

/* ---------- /studio/templates/<slug>/ : desktop / tablet / phone preview ---------- */
(() => {
  const wrap = document.getElementById("td-wrap");
  if (!wrap) return;
  const btns = [...document.querySelectorAll(".td-seg [data-size]")];
  btns.forEach((b) =>
    b.addEventListener("click", () => {
      btns.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      wrap.dataset.size = b.dataset.size;
    }),
  );
})();
