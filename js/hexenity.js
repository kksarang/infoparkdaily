(function () {
  const year = document.getElementById("hx-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const nav = document.getElementById("hx-nav");
  const toggle = document.getElementById("hx-nav-toggle");
  const header = document.getElementById("hx-header");
  let lockedScrollY = 0;
  let backdrop = document.querySelector(".hx-nav-backdrop");

  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "hx-nav-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    document.body.appendChild(backdrop);
  }

  const setNavOpen = (open) => {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    backdrop.classList.toggle("is-visible", open);
    backdrop.setAttribute("aria-hidden", open ? "false" : "true");

    if (open) {
      lockedScrollY = window.scrollY || window.pageYOffset || 0;
      document.body.classList.add("nav-locked");
      document.body.style.top = `-${lockedScrollY}px`;
    } else if (document.body.classList.contains("nav-locked")) {
      document.body.classList.remove("nav-locked");
      document.body.style.top = "";
      window.scrollTo(0, lockedScrollY);
    }
  };

  if (nav && toggle) {
    toggle.addEventListener("click", () => {
      setNavOpen(!nav.classList.contains("is-open"));
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setNavOpen(false);
    });
    backdrop.addEventListener("click", () => setNavOpen(false));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setNavOpen(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) setNavOpen(false);
    });
  }

  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const reveals = document.querySelectorAll(".hx-reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  }

  const counters = document.querySelectorAll("[data-count]");
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window && !reduceMotion) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.45 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach(animateCounter);
  }
})();
