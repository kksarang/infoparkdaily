/* The main InfoparkDaily header — identical to the home page — as one reusable piece.
 *
 * - siteHeaderHtml(section, current) returns the markup: the home header's design with the
 *   section's own menu ("recruit", "tools"), marking the current page's item.
 * - bindSiteHeader() wires the phone menu exactly like js/site.js (backdrop, scroll lock,
 *   Escape, close on link tap / desktop width) and adds the account icon.
 * - setSiteAccount({ signedIn, href }) updates the account icon and the menu entry.
 *
 * Used by the Recruit hub (bundled into js/infoparkdaily/app.bundle.js) and by
 * scripts/apply-site-header.mjs, which writes the same markup into Career Tools pages
 * (those pages already load js/site.js, which wires the header there).
 */

/* Each section keeps the home header's design but shows its own menu. */
export const SECTIONS = {
  home: {
    tagline: "Kerala's Largest Tech &amp; Business Community",
    links: [
      ["/infoparkdaily/", "Recruit"],
      ["/jobs/", "Jobs"],
      ["/resume-builder/", "Career Tools"],
      ["/news/", "News &amp; Blog"],
      ["/services/", "Services"],
      ["/media/", "About Us"],
      ["/contact/", "Contact"],
    ],
    pill: ["https://sarangrajan.in/enitexa.ai/", "Enitexa.ai"],
  },
  recruit: {
    tagline: "Recruit · Hiring for Kerala teams",
    links: [
      ["/infoparkdaily/", "Home"],
      ["/infoparkdaily/alerts/", "Job alerts"],
      ["/infoparkdaily/track/", "Track a post"],
      ["/infoparkdaily/about/", "How it works"],
      ["/infoparkdaily/contact/", "Contact"],
    ],
    pill: ["/infoparkdaily/post/", "Post a job"],
  },
  tools: {
    tagline: "Career Tools · Free for job seekers",
    links: [
      ["/resume-builder/", "Resume builder"],
      ["/ats-checker/", "ATS checker"],
      ["/interview/", "Interview prep"],
      ["/learning/", "Learning"],
      ["/resume-builder/email-examples/", "Email examples"],
      ["/portfolio/templates/", "Portfolio templates"],
    ],
    pill: null,
  },
};

/**
 * section: "home" | "recruit" | "tools"; current: the href of the current page's menu item.
 */
export function siteHeaderHtml(section = "home", current = "") {
  const cfg = SECTIONS[section] || SECTIONS.home;
  const mark = (href) => (href === current ? ' aria-current="page"' : "");
  const nav = cfg.links.map(([href, label]) => `<a href="${href}"${mark(href)}>${label}</a>`).join("");
  const external = (href) => (/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : "");
  const pill = cfg.pill ? `<a href="${cfg.pill[0]}" class="nav-enitexa"${mark(cfg.pill[0])}${external(cfg.pill[0])}>${cfg.pill[1]}</a>` : "";
  return `<header class="site-header glass" data-section="${section}">
      <a class="brand" href="/" aria-label="Infopark Daily home">
        <img class="brand-logo" src="/assets/logo-infoparkdaily.png" alt="Infoparkdaily Kochi logo" />
        <div>
          <p class="brand-name">INFOPARKDAILY</p>
          <p class="brand-tagline">${cfg.tagline}</p>
        </div>
      </a>
    <nav id="site-nav" class="site-nav" aria-label="${section === "recruit" ? "Recruit" : section === "tools" ? "Career tools" : "Primary"}">
        ${nav}
        ${pill}
      </nav>
      <div class="header-actions">
        <button id="theme-toggle" type="button" class="theme-toggle" aria-label="Toggle theme">Theme</button>
        <button id="nav-toggle" type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">
          <span class="nav-toggle-bars" aria-hidden="true"><span></span><span></span><span></span></span>
        </button>
      </div>
    </header>`;
}

const PERSON =
  '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M4 20c1.4-3.6 4.4-5.5 8-5.5s6.6 1.9 8 5.5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>';

export function setSiteAccount({ signedIn = false, href, label } = {}) {
  const text = label || (signedIn ? "My account" : "Sign in");
  document.querySelectorAll(".site-header .header-account, .site-nav .nav-account").forEach((el) => {
    if (href) el.href = href;
    el.classList.toggle("is-signed-in", signedIn);
    el.classList.remove("is-checking");
    el.setAttribute("aria-busy", "false");
    if (el.classList.contains("header-account")) {
      el.setAttribute("aria-label", text);
      el.title = text;
    } else {
      el.textContent = text;
    }
  });
}

export function bindSiteHeader() {
  const header = document.querySelector(".site-header");
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!header || !toggle || !nav || header.dataset.bound) return;
  header.dataset.bound = "1";

  /* Account icon after the theme switch (desktop) and an entry in the phone menu. */
  const actions = header.querySelector(".header-actions");
  if (actions && !actions.querySelector(".header-account")) {
    const icon = document.createElement("a");
    icon.className = "header-account";
    icon.innerHTML = PERSON;
    const theme = actions.querySelector(".theme-toggle");
    if (theme) theme.insertAdjacentElement("afterend", icon);
    else actions.prepend(icon);
  }
  if (!nav.querySelector(".nav-account")) {
    const link = document.createElement("a");
    link.className = "nav-account";
    nav.appendChild(link);
  }
  setSiteAccount({ signedIn: false, href: "/resume-builder/sign-in/?next=" + encodeURIComponent(location.pathname) });

  let backdrop = document.querySelector(".nav-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    document.body.appendChild(backdrop);
  }
  let lockedY = 0;
  const setOpen = (open) => {
    header.classList.toggle("nav-open", open);
    backdrop.classList.toggle("is-visible", open);
    backdrop.setAttribute("aria-hidden", open ? "false" : "true");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open && !document.body.classList.contains("nav-locked")) {
      lockedY = window.scrollY || 0;
      const gap = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
      document.documentElement.classList.add("nav-locked");
      document.body.classList.add("nav-locked");
      document.body.style.top = `-${lockedY}px`;
      document.body.style.paddingRight = gap ? `${gap}px` : "";
    } else if (!open && document.body.classList.contains("nav-locked")) {
      document.body.classList.remove("nav-locked");
      document.documentElement.classList.remove("nav-locked");
      document.body.style.top = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, lockedY);
      requestAnimationFrame(() => (document.documentElement.style.scrollBehavior = ""));
    }
  };
  toggle.addEventListener("click", () => setOpen(!header.classList.contains("nav-open")));
  backdrop.addEventListener("click", () => setOpen(false));
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header.classList.contains("nav-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia("(min-width: 1100px)").addEventListener?.("change", (m) => {
    if (m.matches) setOpen(false);
  });
}
