(function () {
  const FORMSPREE_ENDPOINT = "";
  const MAILTO = "infoparkstorieskochi@gmail.com";

  const form = document.getElementById("hiring-form");
  const statusEl = document.getElementById("hiring-form-status");
  const channelEl = document.getElementById("hp-channel");
  const phoneEl = document.getElementById("hp-phone");
  const applyEl = document.getElementById("hp-apply");
  const deadlineEl = document.getElementById("hp-deadline");
  const rollingEl = document.getElementById("hp-deadline-rolling");
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

  function todayISODate() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function syncRollingState() {
    if (!deadlineEl) return;
    const rolling = Boolean(rollingEl && rollingEl.checked);
    deadlineEl.disabled = rolling;
    if (rolling) {
      deadlineEl.value = "";
      deadlineEl.setCustomValidity("");
    }
  }

  function refreshDeadlineMin() {
    if (!deadlineEl) return;
    deadlineEl.setAttribute("min", todayISODate());
    syncRollingState();
    applyDeadlineValidity();
  }

  if (deadlineEl) {
    refreshDeadlineMin();

    if (rollingEl) {
      rollingEl.addEventListener("change", syncRollingState);
    }

    deadlineEl.addEventListener("change", function () {
      if (rollingEl && deadlineEl.value) rollingEl.checked = false;
      deadlineEl.disabled = false;
      applyDeadlineValidity();
    });

    deadlineEl.addEventListener("input", applyDeadlineValidity);
  }

  function validateDeadline() {
    if (rollingEl && rollingEl.checked) {
      return { ok: true, message: "", value: "Rolling" };
    }

    const raw = deadlineEl ? String(deadlineEl.value || "").trim() : "";
    if (!raw) {
      return { ok: true, message: "", value: "" };
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
      return { ok: false, message: "Please pick a valid apply deadline date.", value: raw };
    }

    const min = todayISODate();
    if (raw < min) {
      return {
        ok: false,
        message: "Apply deadline cannot be a past date. Choose today or a future date.",
        value: raw
      };
    }

    return { ok: true, message: "", value: raw };
  }

  function applyDeadlineValidity() {
    if (!deadlineEl) return true;
    const result = validateDeadline();
    if (rollingEl && rollingEl.checked) {
      deadlineEl.setCustomValidity("");
      return true;
    }
    deadlineEl.setCustomValidity(result.ok ? "" : result.message);
    return result.ok;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
  }

  function isValidPhone(value) {
    const digits = String(value).replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15;
  }

  function validateEmail(value, emptyMessage) {
    const raw = String(value || "").trim();
    if (!raw) {
      return { ok: false, message: emptyMessage || "Please enter an official work email." };
    }
    if (!isValidEmail(raw)) {
      return { ok: false, message: "Please enter a valid email address (example: you@company.com)." };
    }
    return { ok: true, message: "" };
  }

  function validatePhone(value, emptyMessage) {
    const raw = String(value || "").trim();
    if (!raw) {
      return { ok: false, message: emptyMessage || "Please enter an HR / company phone number." };
    }
    if (!isValidPhone(raw)) {
      return {
        ok: false,
        message: "Please enter a valid phone number with at least 10 digits (for verification)."
      };
    }
    return { ok: true, message: "" };
  }

  function validateContact(value, emptyMessage) {
    const raw = String(value || "").trim();
    if (!raw) {
      return { ok: false, message: emptyMessage || "Please enter an email or phone number." };
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

  function bindValidator(el, validateFn) {
    if (!el) return function () { return true; };

    function apply() {
      const result = validateFn(el.value);
      el.setCustomValidity(result.ok ? "" : result.message);
      return result.ok;
    }

    el.addEventListener("input", apply);
    el.addEventListener("blur", function () {
      apply();
      if (!validateFn(el.value).ok && String(el.value || "").trim()) {
        el.reportValidity();
      }
    });

    return apply;
  }

  const applyChannelValidity = bindValidator(channelEl, function (v) {
    return validateEmail(v, "Please enter your official work email.");
  });
  const applyPhoneValidity = bindValidator(phoneEl, function (v) {
    return validatePhone(v, "Please enter HR / company phone for verification.");
  });
  const applyApplyValidity = bindValidator(applyEl, function (v) {
    return validateContact(v, "Please enter the apply email or phone for candidates.");
  });

  function validateUrlField(raw, required, emptyMessage, invalidMessage) {
    const value = String(raw || "").trim();
    if (!value) {
      if (required) return { ok: false, message: emptyMessage || "This URL is required." };
      return { ok: true, message: "" };
    }
    try {
      const url = new URL(value);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        return { ok: false, message: invalidMessage || "Link must start with http:// or https://" };
      }
      return { ok: true, message: "" };
    } catch (_e) {
      return { ok: false, message: invalidMessage || "Please enter a valid URL." };
    }
  }

  function applyWebsiteValidity() {
    const el = document.getElementById("hp-website");
    if (!el) return true;
    const result = validateUrlField(
      el.value,
      true,
      "Please enter the company website for verification.",
      "Please enter a valid company website URL (https://…)."
    );
    el.setCustomValidity(result.ok ? "" : result.message);
    return result.ok;
  }

  function applyLinkValidity() {
    const linkEl = document.getElementById("hp-apply-link");
    if (!linkEl) return true;
    const result = validateUrlField(
      linkEl.value,
      false,
      "",
      "Please enter a valid careers / apply URL."
    );
    linkEl.setCustomValidity(result.ok ? "" : result.message);
    return result.ok;
  }

  function applyLinkedInValidity() {
    const el = document.getElementById("hp-linkedin");
    if (!el) return true;
    const result = validateUrlField(
      el.value,
      false,
      "",
      "Please enter a valid LinkedIn company URL."
    );
    el.setCustomValidity(result.ok ? "" : result.message);
    return result.ok;
  }

  ["hp-website", "hp-apply-link", "hp-linkedin"].forEach(function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    const fn =
      id === "hp-website"
        ? applyWebsiteValidity
        : id === "hp-linkedin"
          ? applyLinkedInValidity
          : applyLinkValidity;
    el.addEventListener("input", fn);
    el.addEventListener("blur", fn);
  });

  function deadlineForPayload() {
    return validateDeadline().value || "Not specified";
  }

  function buildBody() {
    return [
      "InfoparkDaily Recruit — New Hiring Request",
      "",
      `Name: ${val("hp-name")}`,
      `Designation: ${val("hp-designation")}`,
      `Work email: ${val("hp-channel")}`,
      `HR / company phone (verification): ${val("hp-phone")}`,
      `Company: ${val("hp-company")}`,
      `Location: ${val("hp-location")}`,
      `IT park: ${val("hp-park")}`,
      `Company website: ${val("hp-website")}`,
      `Company LinkedIn: ${val("hp-linkedin") || "N/A"}`,
      `Role: ${val("hp-role")}`,
      `Vacancies: ${val("hp-vacancies") || "Not specified"}`,
      `Experience: ${val("hp-experience")}`,
      `Job type: ${val("hp-jobtype") || "Not specified"}`,
      `Deadline: ${deadlineForPayload()}`,
      `Salary: ${val("hp-salary") || "Not disclosed"}`,
      `Apply contact: ${val("hp-apply")}`,
      `Apply link: ${val("hp-apply-link") || "N/A"}`,
      `Walk-in: ${val("hp-walkin") || "N/A"}`,
      "",
      "Job details:",
      val("hp-details")
    ].join("\n");
  }

  function showSuccessToast(message, thenRefresh) {
    var existing = document.getElementById("recruit-toast");
    if (existing) existing.remove();

    var toast = document.createElement("div");
    toast.id = "recruit-toast";
    toast.className = "recruit-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML =
      '<span class="recruit-toast-mark" aria-hidden="true">✓</span>' +
      "<span>" +
      message +
      "</span>";
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.classList.add("is-visible");
    });

    if (thenRefresh) {
      setTimeout(function () {
        window.location.reload();
      }, 1600);
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailCheck = validateEmail(val("hp-channel"), "Please enter your official work email.");
    const phoneCheck = validatePhone(val("hp-phone"), "Please enter HR / company phone for verification.");
    const applyCheck = validateContact(
      val("hp-apply"),
      "Please enter the apply email or phone for candidates."
    );
    applyChannelValidity();
    applyPhoneValidity();
    applyApplyValidity();
    const deadlineCheck = validateDeadline();
    applyDeadlineValidity();
    const websiteCheck = validateUrlField(
      val("hp-website"),
      true,
      "Please enter the company website for verification.",
      "Please enter a valid company website URL (https://…)."
    );
    applyWebsiteValidity();
    const linkCheck = validateUrlField(val("hp-apply-link"), false, "", "Please enter a valid careers / apply URL.");
    applyLinkValidity();
    const linkedInCheck = validateUrlField(
      val("hp-linkedin"),
      false,
      "",
      "Please enter a valid LinkedIn company URL."
    );
    applyLinkedInValidity();

    if (
      !form.checkValidity() ||
      !emailCheck.ok ||
      !phoneCheck.ok ||
      !applyCheck.ok ||
      !deadlineCheck.ok ||
      !websiteCheck.ok ||
      !linkCheck.ok ||
      !linkedInCheck.ok
    ) {
      form.reportValidity();
      if (!emailCheck.ok) setStatus(emailCheck.message, true);
      else if (!phoneCheck.ok) setStatus(phoneCheck.message, true);
      else if (!websiteCheck.ok) setStatus(websiteCheck.message, true);
      else if (!applyCheck.ok) setStatus(applyCheck.message, true);
      else if (!deadlineCheck.ok) setStatus(deadlineCheck.message, true);
      else if (!linkCheck.ok) setStatus(linkCheck.message, true);
      else if (!linkedInCheck.ok) setStatus(linkedInCheck.message, true);
      else setStatus("Please fill the required fields.", true);
      return;
    }

    const subject = "InfoparkDaily Recruit — New Hiring Request";
    const body = buildBody();
    const payload = {
      name: val("hp-name"),
      designation: val("hp-designation"),
      channel: val("hp-channel"),
      phone: val("hp-phone"),
      company: val("hp-company"),
      location: val("hp-location"),
      park: val("hp-park"),
      website: val("hp-website"),
      linkedin: val("hp-linkedin"),
      role: val("hp-role"),
      vacancies: val("hp-vacancies"),
      experience: val("hp-experience"),
      jobtype: val("hp-jobtype"),
      deadline: deadlineForPayload(),
      salary: val("hp-salary"),
      apply: val("hp-apply"),
      apply_link: val("hp-apply-link"),
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
        refreshDeadlineMin();
        applyChannelValidity();
        applyPhoneValidity();
        applyApplyValidity();
        applyWebsiteValidity();
        applyLinkValidity();
        applyLinkedInValidity();
        setStatus("");
        showSuccessToast("Recruit request submitted successfully.", true);
        return;
      } catch (_e) {
        setStatus("Couldn’t send online. Opening your email app instead…", true);
      }
    }

    const mailto = `mailto:${MAILTO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus("");
    showSuccessToast("Recruit request ready — send the email to complete.", true);
  });
})();
