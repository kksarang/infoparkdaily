/* Shared Career Tools chrome: main InfoparkDaily menu + tools strip. */
(function () {
  const header = document.querySelector(".career-tools .topbar");
  if (!header || header.dataset.mainMenu === "1") return;
  header.dataset.mainMenu = "1";

  const toolsNav = header.querySelector('nav[aria-label="Career Tools"]');
  if (!toolsNav) return;

  const path = location.pathname;
  const primary = document.createElement("nav");
  primary.className = "career-primary-nav";
  primary.id = "career-primary-nav";
  primary.setAttribute("aria-label", "Primary");
  primary.innerHTML = [
    ["Recruit", "/recruit/"],
    ["Jobs", "/jobs/"],
    ["Career Tools", "/resume-builder/"],
    ["News", "/news/"],
    ["Services", "/services/"],
  ]
    .map(([label, href]) => {
      const current =
        href === "/resume-builder/"
          ? path.startsWith("/resume-builder") || path.startsWith("/ats-checker")
          : path === href || path.startsWith(href);
      return `<a href="${href}"${current ? ' aria-current="page"' : ""}>${label}</a>`;
    })
    .join("") +
    `<details class="career-about"><summary>About Us <span aria-hidden="true">⌄</span></summary><div class="career-about-links"><a href="/media/">About our community</a><a href="/infoparkdaily/">InfoparkDaily <span>Jobs, people &amp; opportunities</span></a></div></details>` +
    `<a href="/contact/"${path.startsWith("/contact") ? ' aria-current="page"' : ""}>Contact</a>` +
    `<a href="/software-solutions/" class="nav-enitexa">Enitexa.ai</a>`;

  const account = header.querySelector("#account-nav");
  header.insertBefore(primary, account || null);

  const strip = document.createElement("div");
  strip.className = "career-tools-strip";
  toolsNav.classList.add("career-tools-nav");
  strip.append(toolsNav);
  header.after(strip);

  const about = primary.querySelector(".career-about");
  if (about) {
    document.addEventListener("click", (event) => {
      if (!about.contains(event.target)) about.open = false;
    });
    about.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && about.open) {
        about.open = false;
        about.querySelector("summary")?.focus();
        event.stopPropagation();
      }
    });
  }

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "career-menu-toggle";
  toggle.setAttribute("aria-controls", "career-primary-nav");
  toggle.innerHTML =
    '<span aria-hidden="true"></span><span aria-hidden="true"></span>';
  const setOpen = (open) => {
    header.classList.toggle("menu-open", open);
    document.body.classList.toggle("career-menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu",
    );
  };
  setOpen(false);
  header.append(toggle);
  header.classList.add("menu-ready");
  toggle.addEventListener("click", () =>
    setOpen(!header.classList.contains("menu-open")),
  );
  header.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("menu-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (
      !header.contains(event.target) &&
      !strip.contains(event.target) &&
      header.classList.contains("menu-open")
    )
      setOpen(false);
  });
  primary.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  toolsNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  matchMedia("(max-width: 980px)").addEventListener("change", () =>
    setOpen(false),
  );
})();
