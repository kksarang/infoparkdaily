import { curatedJobs, filterJobs, esc } from "./model.js";
import {
  header,
  footer,
  icon,
  link,
  empty,
  jobCard,
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
  jobDetail,
  workerDetail,
  workersHome,
} from "./public.js";
const route = location.pathname
  .replace(/^\/infoparkdaily\/?/, "")
  .replace(/\/$/, "");
export const state = {
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
else if (["jobs", "workers"].includes(route) && !id) {
  main.innerHTML = directory(state, route);
  updateDirectory(state, route);
} else if (route === "jobs" && id) {
  const j = state.jobs.find((j) => j.id === id);
  main.innerHTML = j
    ? jobDetail(j, state)
    : loading("Loading this opportunity…");
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
  if (target.hasAttribute("data-home-sector")) {
    document.querySelectorAll("[data-home-sector]").forEach((b) => {
      b.classList.toggle("active", b === target);
      b.setAttribute("aria-pressed", b === target);
    });
    const jobs = filterJobs(state.jobs, {
      sector: target.dataset.homeSector,
    }).slice(0, 8);
    document.querySelector("#home-job-grid").innerHTML = jobs.length
      ? jobs.map((j, i) => jobCard(j, i, state.savedIds.has(j.id))).join("")
      : empty(
          "More opportunities are on their way.",
          "Explore all current listings or check back soon.",
          link("Browse all jobs", "jobs"),
        );
  }
  if (target.hasAttribute("data-filter-toggle")) {
    const panel = document.querySelector("#directory-filters");
    panel.classList.toggle("open");
    target.setAttribute("aria-expanded", panel.classList.contains("open"));
  }
  if (target.dataset.page) {
    state.page = Number(target.dataset.page);
    updateDirectory(state, route);
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
    updateDirectory(state, route);
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
    updateDirectory(state, route);
  });
  filter.addEventListener("reset", () => {
    setTimeout(() => {
      filter.querySelectorAll("select").forEach((el) => (el.value = ""));
      filter.querySelectorAll("input").forEach((el) => (el.checked = false));
      state.filters = { q: state.filters.q, sort: state.filters.sort };
      state.page = 1;
      updateDirectory(state, route);
    }, 0);
  });
  document.querySelector("#directory-search").onsubmit = (e) => {
    e.preventDefault();
    state.filters.q = new FormData(e.target).get("q");
    state.page = 1;
    updateDirectory(state, route);
  };
  const sort = document.querySelector("#directory-sort");
  if (sort)
    sort.onchange = () => {
      state.filters.sort = sort.value;
      state.page = 1;
      updateDirectory(state, route);
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
  document.querySelectorAll(".reveal-section").forEach((el) => io.observe(el));
}

import("./members.js")
  .then((m) => m.start(state, main))
  .catch((e) => {
    console.error(e);
    if (!["", "jobs", "workers", "about", "contact"].includes(route))
      main.innerHTML = empty(
        "Your workspace couldn’t load.",
        "Please check your connection and try again.",
        '<button class="btn" onclick="location.reload()">Try again</button>',
      );
  });
