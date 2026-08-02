(function () {
  const FORMSPREE_ENDPOINT = "";
  const MAILTO = "infoparkstorieskochi@gmail.com";

  const form = document.getElementById("hiring-form");
  const statusEl = document.getElementById("hiring-form-status");
  const channelEl = document.getElementById("hp-channel");
  if (!form) return;

  function val(id) {
    const el = document.getElementById(id);
    return el ? String(el.value || "").trim() : "";
  }

  function setStatus(msg, isError) {
    if (!statusEl) return;
    statusEl.textContent = msg || "";
    statusEl.classList.toggle("is-error", Boolean(isError));
  }

  function isValidEmail(value) {
    // Practical email check: local@domain.tld
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
  }

  function isValidPhone(value) {
    const digits = String(value).replace(/\D/g, "");
    // Accept 10-digit local numbers, or longer with country code (10+)
    return digits.length >= 10 && digits.length <= 15;
  }

  function validateChannel(value) {
    const raw = String(value || "").trim();
    if (!raw) {
      return { ok: false, message: "Please enter an email or phone number." };
    }

    if (raw.includes("@")) {
      if (!isValidEmail(raw)) {
        return { ok: false, message: "Please enter a valid email address (example: you@company.com)." };
      }
      return { ok: true, message: "" };
    }

    if (!isValidPhone(raw)) {
      return {
        ok: false,
        message: "Please enter a valid phone number with at least 10 digits."
      };
    }

    return { ok: true, message: "" };
  }

  function applyChannelValidity() {
    if (!channelEl) return true;
    const result = validateChannel(channelEl.value);
    channelEl.setCustomValidity(result.ok ? "" : result.message);
    return result.ok;
  }

  if (channelEl) {
    channelEl.addEventListener("input", function () {
      applyChannelValidity();
    });
    channelEl.addEventListener("blur", function () {
      applyChannelValidity();
      if (!validateChannel(channelEl.value).ok && String(channelEl.value || "").trim()) {
        channelEl.reportValidity();
      }
    });
  }

  function buildBody() {
    return [
      "InfoparkDaily Recruit — New Hiring Request",
      "",
      `Name: ${val("hp-name")}`,
      `Contact: ${val("hp-channel")}`,
      `Company: ${val("hp-company")}`,
      `Location: ${val("hp-location")}`,
      `Role: ${val("hp-role")}`,
      `Vacancies: ${val("hp-vacancies") || "Not specified"}`,
      `Experience: ${val("hp-experience")}`,
      `Deadline: ${val("hp-deadline") || "Not specified"}`,
      `Walk-in: ${val("hp-walkin") || "N/A"}`,
      "",
      "Job details:",
      val("hp-details")
    ].join("\n");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const channelCheck = validateChannel(val("hp-channel"));
    applyChannelValidity();

    if (!form.checkValidity() || !channelCheck.ok) {
      form.reportValidity();
      setStatus(channelCheck.ok ? "Please fill the required fields." : channelCheck.message, true);
      return;
    }

    const subject = "InfoparkDaily Recruit — New Hiring Request";
    const body = buildBody();
    const payload = {
      name: val("hp-name"),
      channel: val("hp-channel"),
      company: val("hp-company"),
      location: val("hp-location"),
      role: val("hp-role"),
      vacancies: val("hp-vacancies"),
      experience: val("hp-experience"),
      deadline: val("hp-deadline"),
      walkin: val("hp-walkin"),
      details: val("hp-details"),
      _subject: subject
    };

    setStatus("Sending…");

    if (FORMSPREE_ENDPOINT) {
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Request failed");
        form.reset();
        applyChannelValidity();
        setStatus("Thanks — your Recruit request was sent. We’ll review and reply soon.");
        return;
      } catch (_e) {
        setStatus("Couldn’t send online. Opening your email app instead…", true);
      }
    }

    const mailto = `mailto:${MAILTO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus("Your email app should open with the Recruit request. Send it to complete.");
  });
})();
