(function () {
  const tabs = Array.from(document.querySelectorAll(".tonam-tier-tabs [data-tier]"));
  const panels = Array.from(document.querySelectorAll("[data-tier-panel]"));
  if (!tabs.length || !panels.length) return;

  function activate(id) {
    tabs.forEach((tab) => {
      const on = tab.getAttribute("data-tier") === id;
      tab.classList.toggle("is-active", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
    });
    panels.forEach((panel) => {
      const on = panel.getAttribute("data-tier-panel") === id;
      panel.classList.toggle("is-active", on);
      panel.hidden = !on;
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab.getAttribute("data-tier")));
  });
})();
