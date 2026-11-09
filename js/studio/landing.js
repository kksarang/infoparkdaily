/* Daily Web Studio landing page: website-type grid from the shared data, header shadow on scroll. */
import { SITE_TYPES, icon } from "./data.js";

const grid = document.getElementById("types");
if (grid)
  grid.innerHTML = SITE_TYPES.map(
    (t) => `<a class="l-type" href="/studio/app/#/new?type=${t.id}"><span class="to-ico">${icon(t.id, 21)}</span><span><strong>${t.label}</strong><small>${t.short}</small></span></a>`,
  ).join("");

const head = document.querySelector(".l-head");
const onScroll = () => head?.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
