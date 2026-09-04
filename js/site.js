const themeToggle = document.getElementById("theme-toggle");
const year = document.getElementById("year");
const counters = document.querySelectorAll(".counter");
const testimonialQuote = document.getElementById("testimonial-quote");
const testimonialAuthor = document.getElementById("testimonial-author");
const prevTestimonial = document.getElementById("prev-testimonial");
const nextTestimonial = document.getElementById("next-testimonial");
const newsletterForm = document.getElementById("newsletter-form");
const newsletterMessage = document.getElementById("newsletter-message");
const featuredJobsGrid = document.getElementById("featured-jobs-grid");

const testimonials = [
  {
    quote: "Infopark Daily gave our restaurant strong local visibility and a steady flow of new customers.",
    author: "Restaurant Owner, Kakkanad"
  },
  {
    quote: "Our startup launch campaign reached exactly the audience we needed in Kerala's tech ecosystem.",
    author: "Startup Founder, Kochi"
  },
  {
    quote: "Hiring promotions on Infopark Daily brought quality candidates faster than expected.",
    author: "HR Manager, IT Company"
  },
  {
    quote: "Their event coverage and reels brought premium engagement across our community channels.",
    author: "Community Lead, Tech Meetup"
  }
];

let testimonialIndex = 0;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function formatCounter(value, el) {
  if (el?.dataset.format === "full") {
    return `${Math.floor(value)}+`;
  }
  if (value >= 1000000) {
    return `${Math.floor(value / 1000000)}M+`;
  }
  if (value >= 1000) {
    return `${Math.floor(value / 1000)}K+`;
  }
  return `${value}+`;
}

function setCounterFinal(counter) {
  const target = Number(counter.dataset.target);
  if (!Number.isFinite(target)) return;
  counter.textContent = formatCounter(target, counter);
  counter.dataset.animated = "true";
}

function animateCounter(counter) {
  const target = Number(counter.dataset.target);
  if (!Number.isFinite(target) || counter.dataset.animated === "true") return;

  if (prefersReducedMotion) {
    setCounterFinal(counter);
    return;
  }

  const duration = 1200;
  const start = performance.now();
  counter.textContent = formatCounter(0, counter);

  function tick(timestamp) {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(target * eased);
    counter.textContent = formatCounter(current, counter);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      setCounterFinal(counter);
    }
  }

  requestAnimationFrame(tick);
}

function renderTestimonial(index) {
  if (!testimonialQuote || !testimonialAuthor) return;
  const current = testimonials[index];
  testimonialQuote.textContent = `"${current.quote}"`;
  testimonialAuthor.textContent = `- ${current.author}`;
}

function applyTheme(isLight) {
  document.body.classList.toggle("dark", !isLight);
  document.body.classList.toggle("light", isLight);
  document.documentElement.classList.toggle("theme-light", isLight);
  document.documentElement.classList.toggle("theme-dark", !isLight);
  document.documentElement.style.colorScheme = isLight ? "light" : "dark";
  document.documentElement.style.backgroundColor = isLight ? "#ffffff" : "#0b0b0f";
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.setAttribute("content", isLight ? "#ffffff" : "#0b0b0f");
  if (themeToggle) {
    themeToggle.textContent = isLight ? "Dark" : "Light";
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

function companySlug(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function initials(name) {
  const skip = new Set([
    "ltd",
    "pvt",
    "private",
    "limited",
    "llc",
    "inc",
    "opc",
    "p",
    "the",
    "and",
    "of",
    "india",
    "technologies",
    "technology",
    "solutions",
    "systems",
    "software",
    "services"
  ]);
  const parts = String(name || "?")
    .replace(/[().,&/]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((part) => !skip.has(part.toLowerCase()) && !/^\d+$/.test(part));
  if (!parts.length) return "?";
  if (parts.length === 1) {
    return parts[0].replace(/[^a-zA-Z0-9]/g, "").slice(0, 4).toUpperCase() || "?";
  }
  return parts
    .slice(0, 4)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function isUpcomingJob(job) {
  const deadline = String(job.applyDeadline || "").trim();
  if (!deadline || /^rolling$/i.test(deadline)) return true;
  const ts = new Date(`${deadline}T00:00:00`).getTime();
  if (Number.isNaN(ts)) return true;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return ts >= today;
}

function shortRoleName(role) {
  let name = String(role || "").trim();
  if (!name) return "";
  // Drop experience / vacancy explanations after em dash or en dash.
  name = name.split(/\s+[—–]\s+/)[0].trim();
  // Drop trailing vacancy counts like "(1)" or "(3 Vacancies)".
  name = name.replace(/\s*\(\d+(?:\s*[Vv]acanc(?:y|ies))?\)\s*$/u, "").trim();
  return name;
}

function renderFeaturedJobs() {
  if (!featuredJobsGrid || typeof JOBS === "undefined") return;

  // Home: only open / upcoming jobs — never show expired listings.
  const featured = [...JOBS]
    .filter(isUpcomingJob)
    .sort((a, b) => String(b.postedDate || "").localeCompare(String(a.postedDate || "")))
    .slice(0, 4);

  featuredJobsGrid.innerHTML = featured
    .map((job, index) => {
      const exp = job.experience || "both";
      const mark = initials(job.company);
      const roles = (job.roles || [])
        .slice(0, 2)
        .map((role) => shortRoleName(role))
        .filter(Boolean)
        .map((role) => `<li>${escapeHtml(role)}</li>`)
        .join("");
      const href = `/job/${encodeURIComponent(job.id || "")}`;

      return `
        <article class="job-card featured-job-card reveal" style="--delay: ${index * 60}ms">
          <header class="job-card-head">
            <div class="job-logo-wrap job-logo-wrap--text" data-initials="${escapeAttr(mark)}" aria-hidden="true">
              <span class="job-logo-fallback">${escapeHtml(mark)}</span>
            </div>
            <div class="job-card-meta">
              <h3><a class="job-company-link" href="${escapeAttr(`/company/${companySlug(job.company)}/`)}">${escapeHtml(job.company)}</a></h3>
              <p class="job-location">${escapeHtml(job.location || "")}</p>
            </div>
          </header>
          <div class="job-card-tags">
            <span class="job-badge job-badge--${escapeAttr(exp)}">${escapeHtml(
              exp === "fresher" ? "Fresher" : exp === "experienced" ? "Experienced" : "Fresher + Exp"
            )}</span>
            ${job.isWalkIn ? `<span class="job-badge job-badge--walkin">Walk-in</span>` : ""}
          </div>
          <ul class="job-roles">${roles}</ul>
          <a class="btn btn-primary job-details-btn" href="${escapeAttr(href)}">View Details</a>
        </article>
      `;
    })
    .join("");
}

function initRevealAnimations() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (prefersReducedMotion) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

function initMobileNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!header || !toggle || !nav) return;

  let backdrop = document.querySelector(".nav-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    document.body.appendChild(backdrop);
  }

  let drawer = document.getElementById("site-nav-drawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "site-nav-drawer";
    drawer.className = "site-nav-drawer";
    drawer.setAttribute("aria-hidden", "true");
    drawer.setAttribute("aria-label", "Site menu");

    const drawerHead = document.createElement("div");
    drawerHead.className = "site-nav-drawer-head";
    drawerHead.innerHTML = `
      <p class="site-nav-drawer-title">Menu</p>
      <button type="button" class="site-nav-drawer-close" aria-label="Close menu">
        <span aria-hidden="true">×</span>
      </button>
    `;

    const panel = nav.cloneNode(true);
    panel.id = "site-nav-panel";
    panel.classList.add("site-nav-panel");
    panel.removeAttribute("aria-label");

    drawer.appendChild(drawerHead);
    drawer.appendChild(panel);
    document.body.appendChild(drawer);
  }

  const panel = drawer.querySelector(".site-nav-panel") || drawer.querySelector(".site-nav");
  toggle.setAttribute("aria-controls", "site-nav-drawer");

  let lockedScrollY = 0;

  const scrollbarGap = () =>
    Math.max(0, window.innerWidth - document.documentElement.clientWidth);

  const scrollToY = (y) => {
    try {
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
    } catch (_error) {
      window.scrollTo(0, y);
    }
  };

  const setOpen = (open, options = {}) => {
    const { restoreScroll = true, unlock = true } = options;
    const isOpen = Boolean(open);
    header.classList.toggle("nav-open", isOpen);
    drawer.classList.toggle("is-open", isOpen);
    drawer.setAttribute("aria-hidden", isOpen ? "false" : "true");
    backdrop.classList.toggle("is-visible", isOpen);
    backdrop.setAttribute("aria-hidden", isOpen ? "false" : "true");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

    if (isOpen) {
      lockedScrollY = window.scrollY || window.pageYOffset || 0;
      const gap = scrollbarGap();
      document.body.classList.add("nav-locked");
      document.body.style.top = `-${lockedScrollY}px`;
      document.body.style.paddingRight = gap ? `${gap}px` : "";
      const closeBtn = drawer.querySelector(".site-nav-drawer-close");
      if (closeBtn) closeBtn.focus({ preventScroll: true });
    } else if (document.body.classList.contains("nav-locked") && unlock) {
      document.body.classList.remove("nav-locked");
      document.body.style.top = "";
      document.body.style.paddingRight = "";
      if (restoreScroll) scrollToY(lockedScrollY);
    }
  };

  toggle.addEventListener("click", () => {
    setOpen(!drawer.classList.contains("is-open"));
  });

  const closeBtn = drawer.querySelector(".site-nav-drawer-close");
  if (closeBtn) closeBtn.addEventListener("click", () => setOpen(false));

  backdrop.addEventListener("click", () => setOpen(false));

  (panel || nav).querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (!drawer.classList.contains("is-open")) return;

      const newTab =
        link.target === "_blank" ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.button === 1;

      if (newTab) {
        setOpen(false);
        return;
      }

      let url;
      try {
        url = new URL(link.href, window.location.href);
      } catch (_error) {
        setOpen(false);
        return;
      }

      const sameDoc =
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.search === window.location.search;

      if (sameDoc && url.hash) {
        setOpen(false, { restoreScroll: false });
        return;
      }

      if (!sameDoc) {
        setOpen(false, { unlock: false });
        return;
      }

      setOpen(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1100) setOpen(false);
  });

  window.addEventListener("pageshow", () => {
    if (document.body.classList.contains("nav-locked")) {
      setOpen(false);
    }
  });
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}

initMobileNav();

if (themeToggle) {
  // Fresh storage key: old "theme" values from the light-default era are ignored.
  const preferredTheme = localStorage.getItem("ipd-theme");
  applyTheme(preferredTheme === "light");

  themeToggle.addEventListener("click", () => {
    const isLight = !document.body.classList.contains("light");
    applyTheme(isLight);
    localStorage.setItem("ipd-theme", isLight ? "light" : "dark");
  });
}

if (counters.length) {
  // HTML already contains final values (no-JS / crawler safe).
  // JS animates from 0 → target when the section scrolls into view.
  if (prefersReducedMotion) {
    counters.forEach(setCounterFinal);
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    counters.forEach((counter) => {
      counter.dataset.animated = "false";
      observer.observe(counter);
    });
  }
}

if (testimonialQuote && testimonialAuthor) {
  renderTestimonial(testimonialIndex);
}

if (prevTestimonial && nextTestimonial) {
  prevTestimonial.addEventListener("click", () => {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial(testimonialIndex);
  });

  nextTestimonial.addEventListener("click", () => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    renderTestimonial(testimonialIndex);
  });
}

if (newsletterForm && newsletterMessage) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(newsletterForm);
    const email = String(formData.get("email") || "").trim();
    if (!email) {
      newsletterMessage.textContent = "Please enter a valid email address.";
      return;
    }
    newsletterMessage.textContent = "Thanks for subscribing. Weekly updates are on the way.";
    newsletterForm.reset();
  });
}

renderFeaturedJobs();
initRevealAnimations();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js?v=20260802ab")
      .then((registration) => registration.update())
      .catch(() => {
        // Service worker registration should not block core rendering.
      });
  });
}
