(() => {
  const header = document.querySelector(".en-header");
  const menu = document.querySelector(".en-menu-toggle");
  const nav = document.getElementById("en-nav");
  const setMenu = (open) => {
    header.classList.toggle("en-menu-open", open);
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu",
    );
  };
  header.classList.add("en-menu-ready");
  menu.addEventListener("click", () =>
    setMenu(menu.getAttribute("aria-expanded") !== "true"),
  );
  header.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menu.getAttribute("aria-expanded") === "true"
    ) {
      setMenu(false);
      menu.focus();
    }
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) setMenu(false);
  });
  matchMedia("(max-width: 950px)").addEventListener("change", () =>
    setMenu(false),
  );

  const filters = [...document.querySelectorAll("[data-filter]")];
  const projects = [...document.querySelectorAll(".project[data-category]")];
  const filterProjects = (value) => {
    filters.forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === value),
      ),
    );
    projects.forEach(
      (project) =>
        (project.hidden =
          value !== "All" && project.dataset.category !== value),
    );
    document.getElementById("project-count").textContent =
      `${projects.filter((p) => !p.hidden).length} projects`;
  };
  filters.forEach((button) =>
    button.addEventListener("click", () =>
      filterProjects(button.dataset.filter),
    ),
  );
  document
    .querySelectorAll(".preview")
    .forEach((link) =>
      link.addEventListener("click", () => filterProjects("All")),
    );
  document.querySelectorAll("img").forEach((img) =>
    img.addEventListener("error", () => {
      const note = document.createElement("p");
      note.className = "source-note";
      note.textContent = img.alt + " — image temporarily unavailable.";
      img.replaceWith(note);
    }),
  );

  const form = document.getElementById("en-enquiry");
  const status = document.getElementById("en-form-status");
  document.getElementById("en-send").disabled = false;
  const picker = document.getElementById("en-service-picker");
  const serviceError = document.getElementById("en-services-error");
  const choices = [...form.querySelectorAll('input[name="services"]')];
  const handoff = document.getElementById("en-form-handoff");
  const emailDraft = document.getElementById("en-email-draft");
  const whatsappDraft = document.getElementById("en-whatsapp-draft");
  let brief = "";
  const setStatus = (message, error = false) => {
    status.textContent = message;
    status.classList.toggle("is-error", error);
  };
  const syncServices = () => {
    const selected = choices.filter((choice) => choice.checked);
    document.getElementById("en-service-count").textContent = selected.length
      ? selected.length === 1
        ? selected[0].value
        : `${selected.length} services selected`
      : "Choose one or more services";
    if (selected.length) {
      serviceError.hidden = true;
      picker.querySelector("summary").removeAttribute("aria-describedby");
    }
  };
  choices.forEach((choice) => choice.addEventListener("change", syncServices));
  document
    .querySelectorAll("[data-service], [data-engagement]")
    .forEach((link) => {
      link.addEventListener("click", () => {
        if (link.dataset.service) {
          const choice = choices.find(
            (item) => item.value === link.dataset.service,
          );
          if (choice) choice.checked = true;
          syncServices();
        }
        if (link.dataset.engagement) {
          form.elements.engagement.value = link.dataset.engagement;
          const note = document.getElementById("en-engagement-note");
          note.hidden = false;
          note.textContent = `Interested in: ${link.dataset.engagement}`;
        }
        handoff.hidden = true;
        setStatus("");
      });
    });
  form.addEventListener("input", () => {
    handoff.hidden = true;
    setStatus("");
    form
      .querySelectorAll('[aria-invalid="true"]')
      .forEach((field) => field.removeAttribute("aria-invalid"));
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = choices
      .filter((choice) => choice.checked)
      .map((choice) => choice.value);
    if (!selected.length) {
      picker.open = true;
      serviceError.hidden = false;
      picker
        .querySelector("summary")
        .setAttribute("aria-describedby", serviceError.id);
      picker.querySelector("summary").focus();
      return;
    }
    const values = Object.fromEntries(new FormData(form));
    for (const [name, min, message] of [
      ["name", 1, "Please enter your name."],
      [
        "description",
        20,
        "Tell us a little more about your project (at least 20 characters).",
      ],
    ]) {
      if (String(values[name] || "").trim().length < min) {
        setStatus(message, true);
        form.elements[name].setAttribute("aria-invalid", "true");
        form.elements[name].focus();
        return;
      }
    }
    const rows = [
      "Enitexa.ai — Project enquiry",
      "",
      `Name: ${values.name.trim()}`,
      `Work email: ${values.email.trim()}`,
      values.company.trim() ? `Company: ${values.company.trim()}` : "",
      values.phone.trim() ? `Phone / WhatsApp: ${values.phone.trim()}` : "",
      `Services: ${selected.join(", ")}`,
      values.engagement ? `Engagement: ${values.engagement}` : "",
      values.budget ? `Budget range: ${values.budget}` : "",
      values.timeline.trim()
        ? `Preferred timeline: ${values.timeline.trim()}`
        : "",
      "",
      "Project description:",
      values.description.trim(),
    ];
    brief = rows.filter((row) => row !== "").join("\n");
    const mailto = `mailto:info.enitexa@gmail.com?subject=${encodeURIComponent("Enitexa.ai project enquiry")}&body=${encodeURIComponent(brief)}`;
    emailDraft.href = mailto;
    whatsappDraft.href = `https://wa.me/919995254290?text=${encodeURIComponent(brief)}`;
    handoff.hidden = false;
    setStatus(
      "Your draft is ready, but has not been sent. Choose email or WhatsApp below, review the draft, and send it to complete your enquiry.",
    );
    status.focus();
    // There is no configured server submission endpoint. Never claim receipt.
    // The user chooses email or WhatsApp after reviewing the prepared draft.
  });
  document.getElementById("en-copy").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setStatus(
        "Project details copied. Paste them into an email or WhatsApp message and send to complete your enquiry.",
      );
    } catch {
      setStatus(
        "Copy is unavailable in this browser. Use the email or WhatsApp link; your details are still in the form.",
        true,
      );
    }
  });
})();
