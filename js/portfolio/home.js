/* /portfolio/templates/ — featured-design filter and scroll reveals.
   Favourites, WhatsApp ordering and the personalisation demo stay in store.js. */
(function () {
  const root = document.querySelector(".pfh");
  if (!root) return;

  /* ---------- profession filter ---------- */
  const buttons = [...root.querySelectorAll("[data-pfh-filter]")];
  const cards = [...root.querySelectorAll(".pfh-card")];
  const allLink = root.querySelector("[data-pfh-all]");
  const status = root.querySelector("[data-pfh-status]");
  const allHref = allLink ? allLink.getAttribute("href") : "/portfolio/templates/all/";
  const allText = allLink ? allLink.innerHTML : "";

  function apply(group) {
    let shown = 0;
    cards.forEach((card) => {
      const on = group === "all" || card.dataset.category === group;
      card.hidden = !on;
      if (on) shown += 1;
    });
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.pfhFilter === group)));
    if (allLink) {
      if (group === "all") {
        allLink.setAttribute("href", allHref);
        allLink.innerHTML = allText;
      } else {
        allLink.setAttribute("href", `${allHref}?category=${encodeURIComponent(group)}`);
        allLink.innerHTML = allText.replace(/View all 42 designs/, `All ${group.replace(/s$/, "").toLowerCase()} templates`);
      }
    }
    if (status) status.textContent = group === "all" ? `Showing all ${shown} featured designs` : `Showing ${shown} featured design${shown === 1 ? "" : "s"} for ${group.toLowerCase()}`;
  }

  buttons.forEach((b) => b.addEventListener("click", () => apply(b.dataset.pfhFilter)));
  /* Arrow keys move between filter chips (one toolbar, one tab stop feel). */
  const bar = root.querySelector(".pfh-filters");
  if (bar) {
    bar.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const i = buttons.indexOf(document.activeElement);
      if (i < 0) return;
      e.preventDefault();
      const next = buttons[(i + (e.key === "ArrowRight" ? 1 : buttons.length - 1)) % buttons.length];
      next.focus();
    });
  }

  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- hero: profession switcher (Developer / Designer / Fresher / Freelancer) ---------- */
  const show = root.querySelector("[data-pfh-show]");
  if (show) {
    const MS = 4500;
    const items = (show.dataset.items || "").split("|").map((s) => {
      const [slug, name, prof] = s.split("~");
      return { slug, name, prof };
    });
    const tabs = [...show.querySelectorAll("[data-pfh-show-tab]")];
    const link = show.querySelector("[data-pfh-show-link]");
    const nameEl = show.querySelector("[data-pfh-show-name]");
    const profEl = show.querySelector("[data-pfh-show-prof]");
    let at = 0;
    let timer = null;
    let stopped = reduce; /* a click or reduced motion stops auto-advance for good */
    show.style.setProperty("--pfh-show-ms", MS + "ms");

    const go = (i) => {
      at = (i + items.length) % items.length;
      const it = items[at];
      tabs.forEach((t, n) => t.setAttribute("aria-pressed", String(n === at)));
      show.querySelectorAll("[data-pfh-show-img]").forEach((img) => {
        img.classList.toggle("is-on", Number(img.dataset.pfhShowImg) === at);
      });
      if (link && it) {
        link.setAttribute("href", `/portfolio/preview/${it.slug}/`);
        link.setAttribute("aria-label", `Open the ${it.name} preview`);
      }
      if (nameEl && it) nameEl.textContent = it.name;
      if (profEl && it) profEl.textContent = it.prof;
      /* restart the tab's progress line */
      const bar = tabs[at] && tabs[at].querySelector("i");
      if (bar) {
        bar.style.animation = "none";
        void bar.offsetWidth;
        bar.style.animation = "";
      }
    };
    const play = () => {
      if (stopped || timer) return;
      show.classList.add("is-playing");
      timer = setInterval(() => go(at + 1), MS);
    };
    const pause = () => {
      show.classList.remove("is-playing");
      clearInterval(timer);
      timer = null;
    };
    tabs.forEach((t) =>
      t.addEventListener("click", () => {
        stopped = true;
        pause();
        go(Number(t.dataset.pfhShowTab));
      })
    );
    show.addEventListener("mouseenter", pause);
    show.addEventListener("mouseleave", play);
    show.addEventListener("focusin", pause);
    show.addEventListener("focusout", (e) => {
      if (!show.contains(e.relatedTarget)) play();
    });
    /* Only rotate while the hero is on screen. */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((en) => (en[0].isIntersecting ? play() : pause())).observe(show);
    } else play();
  }

  /* ---------- template wall: pause / play ---------- */
  const wall = root.querySelector(".pfh-wall");
  const wallBtn = root.querySelector("[data-pfh-wall-toggle]");
  if (wall && wallBtn) {
    wallBtn.addEventListener("click", () => {
      const paused = wall.classList.toggle("is-paused");
      wallBtn.setAttribute("aria-pressed", String(paused));
      wallBtn.textContent = paused ? "Play" : "Pause";
    });
  }

  /* ---------- reveal on scroll (skipped for reduced motion) ---------- */
  const items = root.querySelectorAll(".pfh-reveal, .pfh-card");
  if (!reduce && "IntersectionObserver" in window) {
    root.classList.add("pfh-anim");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }),
      { rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach((el) => io.observe(el));
  }
})();
