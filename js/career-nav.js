/* Career Tools: header behaviour (current tool highlight, account links). */
(function () {
  const header = document.querySelector(".store-header") || document.querySelector(".site-header[data-section]");
  if (!header) return;

  /* Header logo → main site home */
  header.querySelectorAll(".store-brand").forEach((a) => {
    a.setAttribute("href", "/");
    a.setAttribute("aria-label", "Infopark Daily home");
  });

  /* Career Tools stay light — no theme toggle; neutralize any leftover button. */
  document.querySelectorAll("#theme-toggle, .store-header .theme-toggle").forEach((el) => {
    el.remove();
  });

  /* The main site header is shown on Career Tools pages (same as the home page). */

  /* Interview Journey: add to the Career Tools menu on every page that lacks it. */
  const storeNav = header.querySelector("#store-nav");
  if (storeNav) {
    const extras = [["/interview/", "Interview prep"], ["/learning/", "Learning"]];
    /* Older pages may still carry the earlier separate links — fold them into the hub link.
       "Portfolio" merged into "Portfolio templates" (one menu entry for the whole portfolio store). */
    storeNav
      .querySelectorAll('a[href="/interview-journey/"], a[href="/interview-journey/questions/"], a[href*="enitexa.ai/learning"], a[href="/portfolio/"]')
      .forEach((a) => a.remove());
    let after = storeNav.querySelector('a[href="/ats-checker/"]');
    extras.forEach(([href, label, external]) => {
      let link = storeNav.querySelector('a[href="' + href + '"]');
      if (!link) {
        link = document.createElement("a");
        link.href = href;
        link.textContent = label;
        if (external) {
          link.target = "_blank";
          link.rel = "noopener";
        }
        if (after && after.parentNode === storeNav) after.after(link);
        else storeNav.append(link);
      }
      after = link;
    });
  }

  const path = location.pathname.replace(/\/$/, "") || "/";
  document.querySelectorAll("#site-nav > a:not(.nav-account), #store-nav > a, .career-tools-nav > a").forEach((a) => {
    const href = (a.getAttribute("href") || "").replace(/\/$/, "") || "/";
    let on = false;
    if (href === "/ats-checker") on = path.startsWith("/ats-checker");
    else if (href === "/interview")
      on = path.startsWith("/interview") && !path.startsWith("/interview/learning");
    else if (href === "/learning")
      on = path.startsWith("/learning") || path.startsWith("/interview/learning");
    else if (href === "/career-tools/faq") on = path.startsWith("/career-tools/faq");
    else if (href === "/resume-builder/email-examples")
      on = path.startsWith("/resume-builder/email-examples");
    else if (href === "/resume-builder/templates")
      on =
        path.startsWith("/resume-builder/templates") ||
        path.startsWith("/resume-builder/editor");
    else if (href === "/portfolio/templates")
      on = path.startsWith("/portfolio") && !path.includes("/sign-in");
    else if (href === "/resume-builder")
      /* Templates and the editor belong to Resume builder in the Career Tools menu. */
      on =
        path.startsWith("/resume-builder") &&
        !path.startsWith("/resume-builder/email-examples") &&
        !path.includes("/sign-in") &&
        !path.includes("/pricing") &&
        !path.includes("/my-resumes") &&
        !path.includes("/account") &&
        !path.includes("/payment-status");
    a.classList.toggle("active", on);
    if (on) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  const menu = header.querySelector("#store-menu");
  const nav = header.querySelector("#store-nav");
  if (menu && nav) {
    /* Some generated pages (portfolio) ship a plain "Menu" text button — give it the shared bars icon. */
    if (!menu.querySelector(".store-menu-bars")) {
      menu.innerHTML = '<span class="store-menu-bars" aria-hidden="true"><span></span><span></span><span></span></span>';
    }
    header.classList.add("menu-ready");
    const open = (value) => {
      header.classList.toggle("menu-open", value);
      menu.setAttribute("aria-expanded", String(value));
      menu.setAttribute("aria-label", value ? "Close menu" : "Open menu");
    };
    menu.addEventListener("click", (e) => {
      e.stopPropagation();
      open(menu.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", () => open(false));
    document.addEventListener("click", (ev) => {
      if (!header.contains(ev.target)) open(false);
    });
    header.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") {
        open(false);
        menu.focus();
      }
    });
  }
})();

  /* Boot site analytics once on Career Tools / ATS / Portfolio shells. */
  if (!document.querySelector('script[data-ipd-analytics]') && !window.IPDAnalytics) {
    const s = document.createElement("script");
    s.type = "module";
    s.src = "/analytics/main.js?v=20260916act";
    s.dataset.ipdAnalytics = "1";
    document.head.appendChild(s);
  }

  /* ATS checker account nav — Firebase Auth as source of truth. */
  const accountNav = document.getElementById("account-nav");
  const accountPage = location.pathname.startsWith("/ats-checker") || location.pathname.startsWith("/interview");
  if (accountNav && accountPage) {
    const here = location.pathname.startsWith("/ats-checker") ? "/ats-checker/" : location.pathname;
    import("/js/resume-builder/cloud.bundle.js?v=20261109ss")
      .then((mod) => mod.request("/me"))
      .then((me) => {
        accountNav.innerHTML = me
          ? '<button type="button" class="store-signin" id="ats-logout">Log out</button>'
          : '<a class="store-signin" href="/resume-builder/sign-in/?next=' + encodeURIComponent(here) + '">Sign in</a>';
        document.getElementById("ats-logout")?.addEventListener("click", async () => {
          try {
            const mod = await import("/js/resume-builder/cloud.bundle.js?v=20261109ss");
            await mod.request("/auth/logout", { method: "POST" });
            window.IPDAnalytics?.track?.("logout", { feature: here.startsWith("/interview") ? "interview_hub" : "ats_checker" });
            window.IPDAnalytics?.clearUserId?.();
            location.assign(here);
          } catch (e) {
            alert(e.message || "Sign-out failed. Please try again.");
          }
        });
      })
      .catch(() => {});
  }

/* Horizontal tab strips (Learning tutorials, Interview hub tabs, curriculum tabs): mark which
   side has hidden tabs so CSS can fade that edge. Updates on scroll and resize. */
(function () {
  const strips = document.querySelectorAll(".ln-trackbar-track, .hub-tabs-track, .ln-tabs");
  if (!strips.length) return;
  const update = (el) => {
    const max = el.scrollWidth - el.clientWidth;
    el.classList.toggle("cs-more-left", max > 2 && el.scrollLeft > 2);
    el.classList.toggle("cs-more-right", max > 2 && el.scrollLeft < max - 2);
  };
  strips.forEach((el) => {
    el.setAttribute("data-cs-scroll", "");
    update(el);
    el.addEventListener("scroll", () => update(el), { passive: true });
  });
  window.addEventListener("resize", () => strips.forEach(update), { passive: true });
})();
