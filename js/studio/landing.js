/* Daily Web Studio landing page: website-type chips from the shared data, header border on scroll. */
import { SITE_TYPES, icon } from "./data.js";

const strip = document.getElementById("types");
if (strip)
  strip.innerHTML = SITE_TYPES.map(
    (t) => `<a class="lx-chip" href="/studio/app/#/new?type=${t.id}" title="${t.short}"><span>${icon(t.id, 16)}</span>${t.label}</a>`,
  ).join("");

const head = document.querySelector(".lx-top");
const onScroll = () => head?.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
