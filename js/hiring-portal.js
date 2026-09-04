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

  function fileName(id) {
    const el = document.getElementById(id);
    if (!el || !el.files || !el.files[0]) return "";
    return el.files[0].name;
  }

  function salaryPayload() {
    const mode = (form.querySelector('input[name="salary_mode"]:checked') || {}).value;
    if (mode === "hidden") return "Not disclosed";
    const min = val("hp-salary-min");
    const max = val("hp-salary-max");
    const nego = document.getElementById("hp-salary-nego") && document.getElementById("hp-salary-nego").checked;
    let text = "";
    if (min && max) text = `${min}–${max} LPA`;
    else if (min) text = `${min}+ LPA`;
    else if (max) text = `Up to ${max} LPA`;
    else text = val("hp-salary") || "Not specified";
    if (nego && text) text += " (negotiable)";
    return text || "Not specified";
  }

  function syncSalaryHidden() {
    const el = document.getElementById("hp-salary");
    if (el) el.value = salaryPayload();
  }

  function syncWalkinHidden() {
    const jobtype = val("hp-jobtype");
    const intent = val("hp-intent");
    const walk = jobtype === "Walk-in" || intent === "walkin";
    const parts = [];
    if (val("hp-walkin-date")) parts.push(`Date: ${val("hp-walkin-date")}`);
    if (val("hp-walkin-start") || val("hp-walkin-end")) {
      parts.push(`Time: ${val("hp-walkin-start") || "—"}${val("hp-walkin-end") ? "–" + val("hp-walkin-end") : ""}`);
    }
    if (val("hp-walkin-venue")) parts.push(`Venue: ${val("hp-walkin-venue")}`);
    if (val("hp-walkin-maps")) parts.push(`Maps: ${val("hp-walkin-maps")}`);
    if (val("hp-walkin-docs")) parts.push(`Docs: ${val("hp-walkin-docs")}`);
    const el = document.getElementById("hp-walkin");
    if (el) el.value = walk ? parts.join(" · ") : parts.join(" · ");
  }

  function extraRoles() {
    return Array.from(document.querySelectorAll("[data-extra-role]"))
      .map((input) => String(input.value || "").trim())
      .filter(Boolean);
  }

  function syncSkillsHidden() {
    const chips = Array.from(document.querySelectorAll(".rq-skill.is-on")).map((btn) => btn.dataset.skill);
    const extra = val("hp-skills-extra")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const el = document.getElementById("hp-skills");
    if (el) el.value = [...new Set(chips.concat(extra))].join(", ");
  }

  function buildBody() {
    syncSalaryHidden();
    syncWalkinHidden();
    syncSkillsHidden();
    const extra = extraRoles();
    const extraEl = document.getElementById("hp-extra-roles-value");
    if (extraEl) extraEl.value = extra.join(" | ");
    return [
      "InfoparkDaily Recruit — New Hiring Request",
      `Request ID: ${val("hp-request-id") || "pending"}`,
      `Intent: ${val("hp-intent") || "job"}`,
      `Package: ${val("hp-campaign") || "listing"}`,
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
      `Logo file: ${fileName("hp-logo") || "N/A"}`,
      `Poster file: ${fileName("hp-poster") || "N/A"}`,
      `Role: ${val("hp-role")}`,
      extra.length ? `Additional roles: ${extra.join(" | ")}` : "",
      `Vacancies: ${val("hp-vacancies") || "Not specified"}`,
      `Experience: ${val("hp-experience")}`,
      `Job type: ${val("hp-jobtype") || "Not specified"}`,
      `Work mode: ${val("hp-workmode") || "On-site"}`,
      `Category: ${val("hp-category") || "N/A"}`,
      `Skills: ${val("hp-skills") || "N/A"}`,
      `Deadline: ${deadlineForPayload()}`,
      `Salary: ${salaryPayload()}`,
      `Apply via: ${val("hp-apply-via") || "N/A"}`,
      `Apply contact: ${val("hp-apply")}`,
      `Apply link: ${val("hp-apply-link") || "N/A"}`,
      `Walk-in: ${val("hp-walkin") || "N/A"}`,
      "",
      "Job details:",
      val("hp-details")
    ]
      .filter((line) => line !== "")
      .join("\n");
  }

  function makeRequestId() {
    const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const n = String(Math.floor(1000 + Math.random() * 9000));
    return `IPD-${stamp}-${n}`;
  }

  const STORE_KEY = "ipd-recruit-submissions-v1";
  const COMPANY_KEY = "ipd-recruit-company-v1";

  function saveSubmission(record) {
    try {
      const list = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
      list.unshift(record);
      localStorage.setItem(STORE_KEY, JSON.stringify(list.slice(0, 40)));
    } catch (_e) {
      /* ignore */
    }
  }

  function saveCompanyProfile() {
    try {
      localStorage.setItem(
        COMPANY_KEY,
        JSON.stringify({
          company: val("hp-company"),
          park: val("hp-park"),
          location: val("hp-location"),
          website: val("hp-website"),
          linkedin: val("hp-linkedin")
        })
      );
    } catch (_e) {
      /* ignore */
    }
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
        toast.classList.remove("is-visible");
      }, 2200);
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (step !== STEPS.length - 1) {
      goStep(step + 1);
      return;
    }

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
    syncSalaryHidden();
    syncWalkinHidden();
    syncSkillsHidden();

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
      if (!emailCheck.ok) goStep(0);
      else if (!phoneCheck.ok) goStep(0);
      else if (!websiteCheck.ok) goStep(1);
      else if (!applyCheck.ok) goStep(3);
      else if (!deadlineCheck.ok) goStep(3);
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

    const idEl = document.getElementById("hp-request-id");
    if (idEl && !idEl.value) idEl.value = makeRequestId();
    const requestId = val("hp-request-id");
    const subject = `InfoparkDaily Recruit — ${requestId} — ${val("hp-company")} — ${val("hp-role")}`;
    const subjEl = document.getElementById("hp-subject");
    if (subjEl) subjEl.value = subject;
    const body = buildBody();
    const payload = {
      request_id: requestId,
      intent: val("hp-intent"),
      campaign: val("hp-campaign"),
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
      extra_roles: extraRoles().join(" | "),
      vacancies: val("hp-vacancies"),
      experience: val("hp-experience"),
      jobtype: val("hp-jobtype"),
      workmode: val("hp-workmode"),
      category: val("hp-category"),
      skills: val("hp-skills"),
      deadline: deadlineForPayload(),
      salary: salaryPayload(),
      apply_via: val("hp-apply-via"),
      apply: val("hp-apply"),
      apply_link: val("hp-apply-link"),
      walkin: val("hp-walkin"),
      details: val("hp-details"),
      logo: fileName("hp-logo"),
      poster: fileName("hp-poster"),
      _subject: subject
    };

    setStatus("Sending…");
    saveCompanyProfile();
    saveSubmission({
      id: requestId,
      company: payload.company,
      role: payload.role,
      intent: payload.intent,
      status: "submitted",
      createdAt: new Date().toISOString()
    });

    if (FORMSPREE_ENDPOINT) {
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Request failed");
        finishSuccess(requestId);
        return;
      } catch (_e) {
        setStatus("Couldn’t send online. Opening your email app instead…", true);
      }
    }

    const mailto = `mailto:${MAILTO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    finishSuccess(requestId);
  });

  function finishSuccess(requestId) {
    setStatus("");
    showSuccessToast("Recruit request submitted. Keep your request ID.", false);
    const success = document.getElementById("rq-success");
    const idLabel = document.getElementById("rq-success-id");
    const track = document.getElementById("rq-track-link");
    const body = form.querySelector(".recruit-form-body");
    const head = form.querySelector(".recruit-form-head");
    const foot = form.querySelector(".recruit-form-foot");
    if (idLabel) idLabel.textContent = requestId;
    if (track) track.href = `/recruit/track/?id=${encodeURIComponent(requestId)}`;
    if (success) success.hidden = false;
    if (body) body.hidden = true;
    if (head) head.hidden = true;
    if (foot) foot.hidden = true;
    success && success.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ----- wizard / product chrome ----- */
  const STEPS = ["rq-step-contact", "rq-step-company", "rq-step-role", "rq-step-apply", "rq-step-preview"];
  let step = 0;

  function goStep(next) {
    step = Math.max(0, Math.min(STEPS.length - 1, next));
    STEPS.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.toggle("is-active", i === step);
    });
    document.querySelectorAll("#rq-progress li").forEach((li, i) => {
      li.classList.toggle("is-active", i === step);
      li.classList.toggle("is-done", i < step);
      li.setAttribute("aria-current", i === step ? "step" : "false");
    });
    const back = document.getElementById("rq-back");
    const nextBtn = document.getElementById("rq-next");
    const submitBtn = document.getElementById("rq-submit");
    if (back) back.hidden = step === 0;
    if (nextBtn) nextBtn.hidden = step === STEPS.length - 1;
    if (submitBtn) submitBtn.hidden = step !== STEPS.length - 1;
    if (step === STEPS.length - 1) renderPreview();
  }

  function validateCurrentStep() {
    const id = STEPS[step];
    const root = document.getElementById(id);
    if (!root) return true;
    const fields = root.querySelectorAll("input, select, textarea");
    for (const el of fields) {
      if (typeof el.checkValidity === "function" && !el.checkValidity()) {
        el.reportValidity();
        return false;
      }
    }
    if (step === 0) {
      const emailCheck = validateEmail(val("hp-channel"), "Please enter your official work email.");
      const phoneCheck = validatePhone(val("hp-phone"), "Please enter HR / company phone for verification.");
      if (!emailCheck.ok) {
        setStatus(emailCheck.message, true);
        return false;
      }
      if (!phoneCheck.ok) {
        setStatus(phoneCheck.message, true);
        return false;
      }
    }
    if (step === 1 && !applyWebsiteValidity()) {
      setStatus("Please enter a valid company website.", true);
      return false;
    }
    setStatus("");
    return true;
  }

  const nextBtn = document.getElementById("rq-next");
  const backBtn = document.getElementById("rq-back");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (!validateCurrentStep()) return;
      goStep(step + 1);
    });
  }
  if (backBtn) backBtn.addEventListener("click", () => goStep(step - 1));

  document.querySelectorAll("#rq-progress li").forEach((li, i) => {
    li.addEventListener("click", () => {
      if (i < step) goStep(i);
    });
  });

  function setCampaign(value) {
    const next = value || "listing";
    const hidden = document.getElementById("hp-campaign");
    const pick = document.getElementById("hp-campaign-pick");
    if (hidden) hidden.value = next;
    if (pick) pick.value = next;
    document.querySelectorAll(".rq-pkg").forEach((el) => {
      const on = el.dataset.package === next;
      el.classList.toggle("is-active", on);
      el.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  document.querySelectorAll(".rq-pkg").forEach((btn) => {
    btn.addEventListener("click", () => setCampaign(btn.dataset.package || "listing"));
  });

  document.querySelectorAll(".rq-path").forEach((btn) => {
    btn.addEventListener("click", () => {
      const intent = btn.dataset.intent || "job";
      document.querySelectorAll(".rq-path").forEach((el) => el.classList.toggle("is-active", el === btn));
      const intentEl = document.getElementById("hp-intent");
      if (intentEl) intentEl.value = intent;
      const jobtype = document.getElementById("hp-jobtype");
      const vac = document.getElementById("hp-vacancies");
      if (intent === "walkin" && jobtype) jobtype.value = "Walk-in";
      if (intent === "mass" && vac && !vac.value) vac.placeholder = "100+";
      if (intent === "campaign") setCampaign("social");
      if (intent === "mass") setCampaign("mass-campaign");
      if (intent === "job") setCampaign("listing");
      if (intent === "walkin") setCampaign("listing");
      toggleWalkin();
      document.getElementById("post-job")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const campPick = document.getElementById("hp-campaign-pick");
  if (campPick) {
    campPick.addEventListener("change", () => setCampaign(campPick.value));
  }

  function toggleWalkin() {
    const panel = document.getElementById("hp-walkin-panel");
    const show = val("hp-jobtype") === "Walk-in" || val("hp-intent") === "walkin";
    if (panel) panel.hidden = !show;
  }
  const jobtypeEl = document.getElementById("hp-jobtype");
  if (jobtypeEl) jobtypeEl.addEventListener("change", toggleWalkin);

  const emailEl = document.getElementById("hp-channel");
  const emailWarn = document.getElementById("hp-email-warn");
  function checkPersonalEmail() {
    const raw = val("hp-channel").toLowerCase();
    const personal = /@(gmail|yahoo|outlook|hotmail|icloud|rediffmail)\./i.test(raw);
    if (emailWarn) emailWarn.hidden = !personal;
  }
  if (emailEl) {
    emailEl.addEventListener("input", checkPersonalEmail);
    emailEl.addEventListener("blur", checkPersonalEmail);
  }

  document.querySelectorAll(".rq-skill").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("is-on");
      syncSkillsHidden();
    });
  });
  const skillsExtra = document.getElementById("hp-skills-extra");
  if (skillsExtra) skillsExtra.addEventListener("input", syncSkillsHidden);

  function syncSalaryMode() {
    const range = document.getElementById("hp-salary-range");
    const mode = (form.querySelector('input[name="salary_mode"]:checked') || {}).value;
    if (range) range.hidden = mode === "hidden";
    syncSalaryHidden();
  }
  form.querySelectorAll('input[name="salary_mode"]').forEach((el) => el.addEventListener("change", syncSalaryMode));
  ["hp-salary-min", "hp-salary-max", "hp-salary-nego"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", syncSalaryHidden);
    if (el) el.addEventListener("change", syncSalaryHidden);
  });

  const addRoleBtn = document.getElementById("hp-add-role");
  const extraList = document.getElementById("hp-extra-roles-list");
  if (addRoleBtn && extraList) {
    addRoleBtn.addEventListener("click", () => {
      const n = extraList.querySelectorAll("[data-extra-role]").length + 2;
      const label = document.createElement("label");
      label.className = "hiring-field";
      label.innerHTML = `<span class="rq-label">Role ${n}</span><input data-extra-role type="text" placeholder="e.g. QA Engineer" />`;
      extraList.appendChild(label);
    });
  }

  const savedBtn = document.getElementById("hp-use-saved-company");
  try {
    const saved = JSON.parse(localStorage.getItem(COMPANY_KEY) || "null");
    if (saved && saved.company && savedBtn) {
      savedBtn.hidden = false;
      savedBtn.addEventListener("click", () => {
        const map = {
          "hp-company": saved.company,
          "hp-park": saved.park,
          "hp-location": saved.location,
          "hp-website": saved.website,
          "hp-linkedin": saved.linkedin
        };
        Object.entries(map).forEach(([id, value]) => {
          const el = document.getElementById(id);
          if (el && value) el.value = value;
        });
      });
    }
  } catch (_e) {
    /* ignore */
  }

  function renderPreview() {
    syncSalaryHidden();
    syncWalkinHidden();
    syncSkillsHidden();
    const card = document.getElementById("rq-preview-card");
    if (!card) return;
    const extras = extraRoles();
    card.innerHTML = `
      <p class="rq-preview-kicker">${escapeText(val("hp-company") || "Company")}</p>
      <h3>${escapeText(val("hp-role") || "Role")}</h3>
      <p class="rq-preview-meta">${[
        val("hp-park"),
        val("hp-workmode"),
        val("hp-jobtype"),
        val("hp-experience"),
        salaryPayload()
      ]
        .filter(Boolean)
        .map(escapeText)
        .join(" · ")}</p>
      ${val("hp-skills") ? `<p><strong>Skills</strong> ${escapeText(val("hp-skills"))}</p>` : ""}
      ${extras.length ? `<p><strong>Also hiring</strong> ${escapeText(extras.join(" · "))}</p>` : ""}
      <p><strong>Apply</strong> ${escapeText(val("hp-apply") || "—")} ${val("hp-apply-link") ? " · " + escapeText(val("hp-apply-link")) : ""}</p>
      <p><strong>Deadline</strong> ${escapeText(deadlineForPayload())}</p>
      ${val("hp-walkin") ? `<p><strong>Walk-in</strong> ${escapeText(val("hp-walkin"))}</p>` : ""}
      <p class="rq-preview-details">${escapeText(val("hp-details")).replace(/\n/g, "<br>")}</p>
    `;
    const dup = document.getElementById("rq-dup-warn");
    if (dup) {
      let previous = [];
      try {
        previous = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
      } catch (_e) {
        previous = [];
      }
      const hit = previous.find(
        (item) =>
          String(item.company || "").toLowerCase() === val("hp-company").toLowerCase() &&
          String(item.role || "").toLowerCase() === val("hp-role").toLowerCase()
      );
      dup.hidden = !hit;
      if (hit) {
        dup.textContent = `A similar opening from this company was already submitted (${hit.id}). You can still create a new vacancy if this is a different req.`;
      }
    }
  }

  function escapeText(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const localBanner = document.getElementById("rq-local-banner");
  const localCount = document.getElementById("rq-local-count");
  if (localBanner) {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
      if (Array.isArray(saved) && saved.length) {
        if (localCount) localCount.textContent = String(saved.length);
        localBanner.hidden = false;
      }
    } catch (_e) {
      /* private mode */
    }
  }

  goStep(0);
  toggleWalkin();
  syncSalaryMode();
})();
