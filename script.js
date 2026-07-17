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

function formatCounter(value) {
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
  counter.textContent = formatCounter(target);
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
  counter.textContent = formatCounter(0);

  function tick(timestamp) {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(target * eased);
    counter.textContent = formatCounter(current);

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

function initials(name) {
  return String(name || "?")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function renderFeaturedJobs() {
  if (!featuredJobsGrid || typeof JOBS === "undefined") return;

  const featured = [...JOBS]
    .sort((a, b) => String(b.postedDate || "").localeCompare(String(a.postedDate || "")))
    .slice(0, 4);

  featuredJobsGrid.innerHTML = featured
    .map((job, index) => {
      const exp = job.experience || "both";
      const mark = initials(job.company);
      const logo = job.logo
        ? `<img class="job-logo" src="${escapeAttr(job.logo)}" alt="" loading="lazy" onerror="this.remove()" />`
        : "";
      const roles = (job.roles || []).slice(0, 2).map((role) => `<li>${escapeHtml(role)}</li>`).join("");
      const extra = Math.max(0, (job.roles || []).length - 2);
      const href = `job.html?id=${encodeURIComponent(job.id || "")}`;

      return `
        <article class="job-card featured-job-card reveal" style="--delay: ${index * 60}ms">
          <header class="job-card-head">
            <div class="job-logo-wrap" data-initials="${escapeAttr(mark)}">
              <span class="job-logo-fallback" aria-hidden="true">${escapeHtml(mark)}</span>
              ${logo}
            </div>
            <div class="job-card-meta">
              <h3>${escapeHtml(job.company)}</h3>
              <p class="job-location">${escapeHtml(job.location || "")}</p>
            </div>
          </header>
          <div class="job-card-tags">
            <span class="job-badge job-badge--${escapeAttr(exp)}">${escapeHtml(
              exp === "fresher" ? "Fresher" : exp === "experienced" ? "Experienced" : "Fresher + Exp"
            )}</span>
            ${job.isWalkIn ? `<span class="job-badge job-badge--walkin">Walk-in</span>` : ""}
          </div>
          <ul class="job-roles">${roles}${
            extra > 0 ? `<li class="job-roles-more">+${extra} more</li>` : ""
          }</ul>
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

  const setOpen = (open) => {
    header.classList.toggle("nav-open", open);
    document.body.classList.toggle("nav-locked", open);
    backdrop.classList.toggle("is-visible", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => {
    setOpen(!header.classList.contains("nav-open"));
  });

  backdrop.addEventListener("click", () => setOpen(false));

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 940) setOpen(false);
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
    document.documentElement.classList.toggle("theme-light", isLight);
    document.documentElement.classList.toggle("theme-dark", !isLight);
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
      .register("./sw.js?v=20260717d")
      .then((registration) => registration.update())
      .catch(() => {
        // Service worker registration should not block core rendering.
      });
  });
}
