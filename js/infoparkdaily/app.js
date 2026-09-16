import { curatedJobs } from "./model.js";
import {
  header,
  footer,
  icon,
  empty,
  toast,
  loading,
} from "./ui.js";
import {
  home,
  directory,
  updateDirectory,
  rotatePromos,
  about,
  contact,
} from "./public.js";

/* Central analytics for hiring hub */
if (!document.querySelector("script[data-ipd-analytics]") && !globalThis.IPDAnalytics) {
  const s = document.createElement("script");
  s.type = "module";
  s.src = "/analytics/main.js?v=20260916act";
  s.dataset.ipdAnalytics = "1";
  document.head.appendChild(s);
}

const route = location.pathname
  .replace(/^\/infoparkdaily\/?/, "")
  .replace(/\/$/, "");

// Seeker job browse lives on the main board; this hub is employer-only.
if (route === "jobs") {
  location.replace("/jobs/" + location.search + location.hash);
} else {
  const state = {
    route,
    jobs: curatedJobs(window.JOBS || []),
    workers: [],
    savedIds: new Set(),
    user: null,
    member: null,
    admin: false,
    filters: {},
    page: 1,
  };
  const app = document.querySelector("#app");
  app.innerHTML = header(route) + '<main id="main"></main>' + footer();
  const main = document.querySelector("#main");
  const id = new URLSearchParams(location.search).get("id");
  if (route === "") main.innerHTML = home(state);
  else if (route === "workers" && !id) {
    main.innerHTML = directory(state, "workers");
    updateDirectory(state, "workers");
  } else if (route === "workers" && id)
    main.innerHTML = loading("Loading this profile…");
  else if (route === "about") main.innerHTML = about();
  else if (route === "contact") main.innerHTML = contact();
  else main.innerHTML = loading();

  const menu = document.querySelector("#market-nav"),
    toggle = document.querySelector("#market-menu-toggle");
  function setMenu(open) {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.innerHTML = icon(open ? "close" : "menu");
  }
  toggle.onclick = (e) => {
    e.stopPropagation();
    setMenu(!menu.classList.contains("open"));
  };
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".market-header")) setMenu(false);
  });
  document.addEventListener("click", (e) => {
    const target = e.target.closest("button");
    if (!target) return;
    if (target.hasAttribute("data-share-job")) {
      navigator.clipboard
        .writeText(location.href)
        .then(() => toast("Job link copied."))
        .catch(() =>
          toast("Copy the page address from your browser to share this job."),
        );
    }
    if (target.dataset.promos) rotatePromos(Number(target.dataset.promos));
    if (target.hasAttribute("data-filter-toggle")) {
      const panel = document.querySelector("#directory-filters");
      panel.classList.toggle("open");
      target.setAttribute("aria-expanded", panel.classList.contains("open"));
    }
    if (target.dataset.page) {
      state.page = Number(target.dataset.page);
      updateDirectory(state, "workers");
      document
        .querySelector(".results-toolbar")
        .scrollIntoView({ block: "start", behavior: "smooth" });
    }
    if (target.hasAttribute("data-clear-filters")) {
      state.filters = { q: "", sort: "newest" };
      state.page = 1;
      document.querySelector("#directory-search").reset();
      document.querySelector("#directory-filters").reset();
      document.querySelector("#directory-search input").value = "";
      updateDirectory(state, "workers");
    }
  });

  const filter = document.querySelector("#directory-filters");
  if (filter) {
    filter.addEventListener("change", () => {
      Object.assign(state.filters, Object.fromEntries(new FormData(filter)), {
        urgent: !!filter.elements.urgent?.checked,
        available: !!filter.elements.available?.checked,
        remote: !!filter.elements.remote?.checked,
        fresher: !!filter.elements.fresher?.checked,
      });
      state.page = 1;
      updateDirectory(state, "workers");
    });
    filter.addEventListener("reset", () => {
      setTimeout(() => {
        filter.querySelectorAll("select").forEach((el) => (el.value = ""));
        filter.querySelectorAll("input").forEach((el) => (el.checked = false));
        state.filters = { q: state.filters.q, sort: state.filters.sort };
        state.page = 1;
        updateDirectory(state, "workers");
      }, 0);
    });
    document.querySelector("#directory-search").onsubmit = (e) => {
      e.preventDefault();
      state.filters.q = new FormData(e.target).get("q");
      state.page = 1;
      updateDirectory(state, "workers");
    };
  }

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );
    document
      .querySelectorAll(".reveal-section")
      .forEach((el) => io.observe(el));
  }

  import("./members.js")
    .then((m) => m.start(state, main))
    .catch((e) => {
      console.error(e);
      if (!["", "workers", "about", "contact"].includes(route))
        main.innerHTML = empty(
          "Your workspace couldn’t load.",
          "Please check your connection and try again.",
          '<button class="btn" onclick="location.reload()">Try again</button>',
        );
    });
}
