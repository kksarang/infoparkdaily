/* Daily Web Studio landing page (/studio/).
 * - Builds the header navigation (desktop mega menus + phone drawer) from one MENU list.
 * - Website-type chips from the shared data.
 * - Header border on scroll.
 *
 * Mega menus open on click, keyboard, or hover (with a short delay so they don't flicker),
 * close on Escape, outside click or mouse-out, and only one is open at a time.
 */
import { SITE_TYPES, icon } from "./data.js";

const NEW = (t) => `/studio/app/#/new${t ? `?type=${t}` : ""}`;

/* Every link points at something that exists today; unfinished features are marked "Soon". */
const MENU = [
  {
    id: "product",
    label: "Product",
    cols: [
      {
        title: "Create",
        items: [
          ["Website builder", "Set up a site in minutes with a few simple questions.", "/studio/website-builder/"],
          ["Templates", "66 complete, phone-ready designs to preview.", "/studio/templates/"],
          ["Visual editor", "Click to change text, images, colours and sections.", "/studio/visual-editor/", "Soon"],
          ["Export your code", "Download clean HTML and host it anywhere, free.", "/studio/export/"],
        ],
      },
      {
        title: "Build for",
        items: [
          ["Online store", "Sell with WhatsApp orders and payment links.", "/studio/online-store/"],
          ["Portfolio website", "Show your work and get hired.", "/studio/portfolio-website/"],
          ["Restaurant website", "Menu, location and table bookings.", "/studio/restaurant-website/"],
          ["Event website", "Schedule, speakers and registration.", "/studio/event-website/"],
        ],
      },
    ],
    band: ["See every feature", "What’s live today, what’s being built, and what’s planned.", "/studio/features/"],
  },
  {
    id: "solutions",
    label: "Solutions",
    cols: [
      {
        title: "By business",
        items: [
          ["Business website", "Services, opening hours and enquiries.", "/studio/business-website/"],
          ["Agency website", "Case studies and a team that sells.", "/studio/agency-website/"],
          ["Startup website", "Product, pricing and early sign-ups.", "/studio/startup-website/"],
          ["Education website", "Courses, faculty and admissions.", "/studio/education-website/"],
        ],
      },
      {
        title: "Grow",
        items: [
          ["Orders on WhatsApp", "Customers message you straight from each product.", "/studio/whatsapp-orders/"],
          ["Fast and search-friendly", "Plain HTML pages that load quickly.", "/studio/fast-websites/"],
          ["Free hosting", "Cloudflare Pages, Netlify or GitHub Pages.", "/studio/free-hosting/"],
          ["Domains", "Connect your own name, prices shown up front.", "/studio/domains/", "Soon"],
        ],
      },
      {
        title: "Get help",
        items: [
          ["Done-for-you websites", "Our team builds and launches it, from ₹1,999.", "/portfolio/templates/#pricing"],
          ["Custom software", "Bigger projects with Enitexa.ai.", "https://sarangrajan.in/enitexa.ai/"],
        ],
      },
    ],
    band: ["Prefer we build it?", "Done-for-you websites from ₹1,999, launched by our team.", "/portfolio/templates/#pricing"],
  },
  {
    id: "resources",
    label: "Resources",
    cols: [
      {
        title: "Learn",
        items: [
          ["Help centre", "Over 30 answers about saving, designs, hosting and billing.", "/studio/help/"],
          ["How it works", "Every step, with an honest label on each.", "/studio/how-it-works/"],
          ["Roadmap", "What’s live, what’s next, and what’s later.", "/studio/roadmap/"],
          ["Changelog", "Every release, newest first.", "/studio/changelog/"],
        ],
      },
      {
        title: "Support",
        items: [
          ["Contact us", "We usually reply within one working day.", "/contact/"],
          ["Join our community", "WhatsApp, Telegram and Instagram channels.", "/join/"],
          ["Security and privacy", "What Studio stores and how to delete it.", "/studio/security/"],
          ["InfoparkDaily blog", "News and guides for Kerala’s tech community.", "/news/"],
        ],
      },
    ],
    band: ["Your account", "Sign in to save your sites and open them on any device.", "/studio/sign-in/?next=%2Fstudio%2Fapp%2F"],
  },
];

const ext = (href) => (/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : "");
const ARROW = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const CHEV = '<svg class="lx-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

const item = ([t, d, href, tag]) =>
  `<li><a href="${href}"${ext(href)}><strong>${t}${tag ? ` <em>${tag}</em>` : ""}</strong><span>${d}</span></a></li>`;

function megaPanel(m) {
  return `<div class="lx-mega" id="mega-${m.id}" role="region" aria-label="${m.label}" hidden>
    <div class="lx-mega-in" data-cols="${m.cols.length}">
      ${m.cols.map((c) => `<div class="lx-mega-col"><p class="lx-mega-h">${c.title}</p><ul>${c.items.map(item).join("")}</ul></div>`).join("")}
    </div>
    <a class="lx-mega-band" href="${m.band[2]}"><strong>${m.band[0]} ${ARROW}</strong><span>${m.band[1]}</span></a>
  </div>`;
}

function buildNav() {
  const nav = document.getElementById("lx-nav");
  const drawer = document.getElementById("lx-drawer-body");
  const megaHost = document.getElementById("lx-megas");
  if (!nav || !megaHost) return;
  nav.innerHTML =
    MENU.map((m) => `<button type="button" class="lx-nav-btn" aria-expanded="false" aria-controls="mega-${m.id}" data-mega="${m.id}">${m.label}${CHEV}</button>`).join("") +
    `<a href="/studio/pricing/">Pricing</a><span class="lx-nav-sep" aria-hidden="true"></span><a href="/portfolio/templates/#pricing">Done for you</a>`;
  megaHost.innerHTML = MENU.map(megaPanel).join("");
  if (drawer)
    drawer.innerHTML =
      MENU.map(
        (m) => `<div class="lx-acc-sec"><button type="button" class="lx-acc-btn" aria-expanded="false" aria-controls="dr-${m.id}">${m.label}${CHEV}</button>
          <div class="lx-acc-panel" id="dr-${m.id}" hidden>${m.cols.map((c) => `<p class="lx-mega-h">${c.title}</p><ul>${c.items.map(item).join("")}</ul>`).join("")}</div></div>`,
      ).join("") + `<a class="lx-dr-link" href="/studio/pricing/">Pricing</a><a class="lx-dr-link" href="/portfolio/templates/#pricing">Done for you</a>`;
}

/* ---------- desktop mega menus ---------- */
function bindMega() {
  const head = document.querySelector(".lx-hd");
  const scrim = document.querySelector(".lx-scrim");
  const btns = [...document.querySelectorAll("[data-mega]")];
  if (!head || !btns.length) return;
  let openId = null;
  let timer = 0;
  const desktop = () => window.matchMedia("(min-width: 1101px)").matches;
  const hoverable = () => window.matchMedia("(hover: hover)").matches;

  function open(id, focusFirst = false) {
    clearTimeout(timer);
    btns.forEach((b) => {
      const on = b.dataset.mega === id;
      b.setAttribute("aria-expanded", String(on));
      document.getElementById(`mega-${b.dataset.mega}`).hidden = !on;
    });
    openId = id;
    head.classList.toggle("is-open", !!id);
    scrim?.classList.toggle("is-on", !!id);
    if (id && focusFirst) document.querySelector(`#mega-${id} a`)?.focus();
  }
  const close = (returnFocus = false) => {
    const was = openId;
    open(null);
    if (returnFocus && was) document.querySelector(`[data-mega="${was}"]`)?.focus();
  };

  btns.forEach((b) => {
    b.addEventListener("click", () => (openId === b.dataset.mega ? close() : open(b.dataset.mega)));
    b.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        open(b.dataset.mega, true);
      }
    });
    b.addEventListener("mouseenter", () => {
      if (!desktop() || !hoverable()) return;
      clearTimeout(timer);
      timer = setTimeout(() => open(b.dataset.mega), openId ? 0 : 120);
    });
  });
  head.addEventListener("mouseleave", () => {
    if (!hoverable() || !openId) return;
    clearTimeout(timer);
    timer = setTimeout(() => close(), 220);
  });
  head.addEventListener("mouseenter", () => clearTimeout(timer));
  document.addEventListener("keydown", (e) => e.key === "Escape" && openId && close(true));
  document.addEventListener("click", (e) => openId && !head.contains(e.target) && close());
  scrim?.addEventListener("click", () => close());
  head.addEventListener("focusout", () =>
    setTimeout(() => {
      if (openId && !head.contains(document.activeElement)) close();
    }, 0),
  );
  /* Clicking a link inside a panel (e.g. #pricing) closes it. */
  document.getElementById("lx-megas")?.addEventListener("click", (e) => e.target.closest("a") && close());
  window.matchMedia("(min-width: 1101px)").addEventListener?.("change", () => close());
}

/* ---------- phone drawer ---------- */
function bindDrawer() {
  const btn = document.getElementById("lx-burger");
  const drawer = document.getElementById("lx-drawer");
  if (!btn || !drawer) return;
  const set = (on) => {
    btn.setAttribute("aria-expanded", String(on));
    btn.setAttribute("aria-label", on ? "Close menu" : "Open menu");
    drawer.hidden = !on;
    document.documentElement.classList.toggle("lx-locked", on);
    if (on) drawer.querySelector("button, a")?.focus();
  };
  btn.addEventListener("click", () => set(btn.getAttribute("aria-expanded") !== "true"));
  drawer.addEventListener("click", (e) => {
    const acc = e.target.closest(".lx-acc-btn");
    if (acc) {
      const on = acc.getAttribute("aria-expanded") !== "true";
      acc.setAttribute("aria-expanded", String(on));
      document.getElementById(acc.getAttribute("aria-controls")).hidden = !on;
      return;
    }
    if (e.target.closest("a")) set(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !drawer.hidden) {
      set(false);
      btn.focus();
    }
  });
  window.matchMedia("(min-width: 1101px)").addEventListener?.("change", (m) => m.matches && set(false));
}

/* ---------- website-type chips ---------- */
const strip = document.getElementById("types");
if (strip)
  strip.innerHTML = SITE_TYPES.map(
    (t) => `<a class="lx-chip" href="${NEW(t.id)}" title="${t.short}"><span>${icon(t.id, 16)}</span>${t.label}</a>`,
  ).join("");

buildNav();
bindMega();
bindDrawer();

const head = document.querySelector(".lx-hd");
const onScroll = () => head?.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
