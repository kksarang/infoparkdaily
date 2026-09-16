/* Career Tools: Portfolio-style store header (text links + yellow underline). */
(function () {
  const header = document.querySelector(".store-header");
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

  const siteHeader = document.querySelector("body.career-tools > .site-header");
  if (siteHeader) {
    siteHeader.hidden = true;
    siteHeader.setAttribute("aria-hidden", "true");
  }

  const path = location.pathname.replace(/\/$/, "") || "/";
  header.querySelectorAll("#store-nav > a, .career-tools-nav > a").forEach((a) => {
    const href = (a.getAttribute("href") || "").replace(/\/$/, "") || "/";
    let on = false;
    if (href === "/ats-checker") on = path.startsWith("/ats-checker");
    else if (href === "/resume-builder/templates")
      on =
        path.startsWith("/resume-builder/templates") ||
        path.startsWith("/resume-builder/editor");
    else if (href === "/portfolio/templates")
      on = path.startsWith("/portfolio/templates");
    else if (href === "/portfolio")
      on =
        path.startsWith("/portfolio") &&
        !path.startsWith("/portfolio/templates");
    else if (href === "/resume-builder")
      on =
        path.startsWith("/resume-builder") &&
        !path.startsWith("/resume-builder/templates") &&
        !path.startsWith("/resume-builder/editor") &&
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
  if (accountNav && location.pathname.startsWith("/ats-checker")) {
    import("/js/resume-builder/cloud.bundle.js?v=20260916del")
      .then((mod) => mod.request("/me"))
      .then((me) => {
        accountNav.innerHTML = me
          ? '<button type="button" class="store-signin" id="ats-logout">Log out</button>'
          : '<a class="store-signin" href="/resume-builder/sign-in/?next=%2Fats-checker%2F">Sign in</a>';
        document.getElementById("ats-logout")?.addEventListener("click", async () => {
          try {
            const mod = await import("/js/resume-builder/cloud.bundle.js?v=20260916del");
            await mod.request("/auth/logout", { method: "POST" });
            window.IPDAnalytics?.track?.("logout", { feature: "ats_checker" });
            window.IPDAnalytics?.clearUserId?.();
            location.assign("/ats-checker/");
          } catch (e) {
            alert(e.message || "Sign-out failed. Please try again.");
          }
        });
      })
      .catch(() => {});
  }
