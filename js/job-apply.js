/**
 * InfoparkDaily — on-site job application form
 * Collects candidate details, stores locally (+ optional Google Apps Script),
 * and emails a cover letter to InfoparkDaily official inbox.
 */
(function () {
  const MAX_RESUME_BYTES = 5 * 1024 * 1024;
  const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];
  const ALLOWED_EXT = /\.(pdf|doc|docx)$/i;

  function cfg(key, fallback) {
    try {
      if (typeof window[key] !== "undefined" && window[key]) return window[key];
    } catch (_e) {
      /* ignore */
    }
    return fallback;
  }

  function storageKey() {
    return cfg("IPD_APPLICATIONS_STORAGE_KEY", "ipd-job-applications-v1");
  }

  function mailtoAddress() {
    return cfg("IPD_APPLICATIONS_MAILTO", "infoparkstorieskochi@gmail.com");
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

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
  }

  function digitsOnly(phone) {
    return String(phone || "").replace(/\D/g, "");
  }

  function isValidPhone(phone) {
    const d = digitsOnly(phone);
    return d.length >= 10 && d.length <= 15;
  }

  function isValidUrl(value) {
    const v = String(value || "").trim();
    if (!v) return false;
    try {
      const u = new URL(v.startsWith("http") ? v : `https://${v}`);
      return Boolean(u.hostname && u.hostname.includes("."));
    } catch (_e) {
      return false;
    }
  }

  function normalizeUrl(value) {
    const v = String(value || "").trim();
    if (!v) return "";
    return v.startsWith("http") ? v : `https://${v}`;
  }

  function readLocalApps() {
    try {
      const raw = localStorage.getItem(storageKey());
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (_e) {
      return [];
    }
  }

  function writeLocalApps(list) {
    try {
      localStorage.setItem(storageKey(), JSON.stringify(list.slice(0, 500)));
    } catch (_e) {
      /* quota / private mode */
    }
  }

  function saveLocalApplication(app) {
    const list = readLocalApps();
    list.unshift(app);
    writeLocalApps(list);
    return app;
  }

  function fileToBase64(file) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload = function () {
        const result = String(reader.result || "");
        const comma = result.indexOf(",");
        resolve(comma >= 0 ? result.slice(comma + 1) : result);
      };
      reader.onerror = function () {
        reject(new Error("Could not read resume file"));
      };
      reader.readAsDataURL(file);
    });
  }

  function buildCoverLetter(job, data) {
    const role = (job.roles && job.roles[0]) || "the open role";
    const company = job.companyLegalName || job.company || "the company";
    const jobUrl =
      data.jobUrl ||
      `https://infoparkdaily.online/job/${encodeURIComponent(job.id)}/`;
    const note = String(data.message || "").trim();
    const lines = [
      "Dear InfoparkDaily hiring desk,",
      "",
      `I am applying for ${role} at ${company} through InfoparkDaily.`,
      "",
      "Candidate details",
      `• Full name: ${data.fullName}`,
      `• Email: ${data.email}`,
      `• Phone: ${data.phone}`,
      `• Experience: ${data.experience || "Not specified"}`,
      `• Current location: ${data.location || "Not specified"}`,
      `• Portfolio / LinkedIn: ${data.portfolioUrl || "Not provided"}`,
      `• Resume: ${data.resumeFileName || "Attached / uploaded"}`,
      "",
      `Job: ${role}`,
      `Company: ${company}`,
      `Job ID: ${job.id}`,
      `Job page: ${jobUrl}`,
      ""
    ];
    if (note) {
      lines.push("Candidate note", note, "");
    }
    lines.push(
      "Please find my resume with this application. Thank you for your consideration.",
      "",
      "Regards,",
      data.fullName
    );
    return lines.join("\n");
  }

  function formHtml(job) {
    const role = escapeHtml((job.roles && job.roles[0]) || "this role");
    const company = escapeHtml(job.companyLegalName || job.company || "");
    return `
      <section class="ipd-apply" id="apply" aria-labelledby="ipd-apply-title">
        <div class="ipd-apply-head">
          <p class="ipd-apply-kicker">Apply on InfoparkDaily</p>
          <h2 id="ipd-apply-title">Submit your application</h2>
          <p class="ipd-apply-lead">
            Apply for <strong>${role}</strong> at <strong>${company}</strong>.
            Your details and resume are stored for InfoparkDaily review, and a cover letter is emailed to our official inbox.
          </p>
        </div>
        <form class="ipd-apply-form" id="ipd-job-apply-form" novalidate>
          <div class="ipd-apply-grid">
            <label class="ipd-apply-field">
              <span>Full name <em>*</em></span>
              <input id="ipd-apply-name" name="fullName" type="text" autocomplete="name" required maxlength="120" placeholder="Your full name" />
            </label>
            <label class="ipd-apply-field">
              <span>Email address <em>*</em></span>
              <input id="ipd-apply-email" name="email" type="email" autocomplete="email" required maxlength="160" placeholder="you@email.com" />
            </label>
            <label class="ipd-apply-field">
              <span>Phone number <em>*</em></span>
              <input id="ipd-apply-phone" name="phone" type="tel" autocomplete="tel" required maxlength="20" placeholder="+91 …" />
            </label>
            <label class="ipd-apply-field">
              <span>Years of experience <em>*</em></span>
              <select id="ipd-apply-experience" name="experience" required>
                <option value="">Select</option>
                <option value="Fresher / 0 years">Fresher / 0 years</option>
                <option value="Up to 1 year">Up to 1 year</option>
                <option value="1–2 years">1–2 years</option>
                <option value="2–4 years">2–4 years</option>
                <option value="4+ years">4+ years</option>
              </select>
            </label>
            <label class="ipd-apply-field">
              <span>Current location <em>*</em></span>
              <input id="ipd-apply-location" name="location" type="text" required maxlength="120" placeholder="City / district" />
            </label>
            <label class="ipd-apply-field">
              <span>Portfolio / LinkedIn URL <em>*</em></span>
              <input id="ipd-apply-portfolio" name="portfolioUrl" type="url" required maxlength="300" placeholder="https://linkedin.com/in/… or portfolio link" />
            </label>
            <label class="ipd-apply-field ipd-apply-field--full">
              <span>Resume upload <em>*</em></span>
              <input id="ipd-apply-resume" name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required />
              <small>PDF, DOC, or DOCX · max 5 MB</small>
            </label>
            <label class="ipd-apply-field ipd-apply-field--full">
              <span>Short note for cover letter <em class="opt">optional</em></span>
              <textarea id="ipd-apply-message" name="message" rows="4" maxlength="1200" placeholder="Why you’re a fit for this design / creative role (optional)"></textarea>
            </label>
          </div>
          <label class="ipd-apply-consent">
            <input id="ipd-apply-consent" name="consent" type="checkbox" required />
            <span>I confirm my details are accurate. InfoparkDaily may store this application and email it to <strong>infoparkstorieskochi@gmail.com</strong> for review. Never pay anyone for a job.</span>
          </label>
          <div class="ipd-apply-actions">
            <button type="submit" class="btn btn-primary" id="ipd-apply-submit">Submit application</button>
            <p class="ipd-apply-status" id="ipd-apply-status" role="status" aria-live="polite"></p>
          </div>
        </form>
      </section>
    `;
  }

  function compactFormHtml(job) {
    return `
      <a class="btn btn-primary jd-apply-btn" href="#apply">Apply now</a>
      <p class="jd-apply-note">Fill the form on this page — resume, portfolio / LinkedIn, and contact details. InfoparkDaily receives your cover letter by email.</p>
    `;
  }

  function setStatus(el, message, isError) {
    if (!el) return;
    el.textContent = message || "";
    el.classList.toggle("is-error", Boolean(isError));
    el.classList.toggle("is-ok", Boolean(message) && !isError);
  }

  function showSuccessToast(message) {
    var existing = document.getElementById("ipd-apply-toast");
    if (existing) existing.remove();

    var toast = document.createElement("div");
    toast.id = "ipd-apply-toast";
    toast.className = "recruit-toast ipd-apply-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML =
      '<span class="recruit-toast-mark" aria-hidden="true">✓</span>' +
      "<span>" +
      String(message || "Application submitted successfully.") +
      "</span>";
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.classList.add("is-visible");
    });

    setTimeout(function () {
      toast.classList.remove("is-visible");
      setTimeout(function () {
        if (toast.parentNode) toast.remove();
      }, 320);
    }, 4200);
  }

  function clearApplyForm(form) {
    if (!form) return;
    form.reset();
    var resumeInput = form.querySelector("#ipd-apply-resume");
    if (resumeInput) resumeInput.value = "";
  }

  async function postToApi(payload) {
    const api = cfg("IPD_APPLICATIONS_API", "");
    if (!api) return { skipped: true };
    const res = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(function () {
      return {};
    });
    if (!res.ok || data.ok === false) {
      throw new Error(data.error || "Application API failed");
    }
    return data;
  }

  async function postToFormspree(payload, file) {
    const endpoint = cfg("IPD_APPLICATIONS_FORMSPREE", "");
    if (!endpoint) return { skipped: true };
    const fd = new FormData();
    fd.append("_subject", payload._subject);
    fd.append("fullName", payload.fullName);
    fd.append("email", payload.email);
    fd.append("_replyto", payload.email);
    fd.append("phone", payload.phone);
    fd.append("experience", payload.experience);
    fd.append("location", payload.location);
    fd.append("portfolioUrl", payload.portfolioUrl);
    fd.append("jobId", payload.jobId);
    fd.append("jobTitle", payload.jobTitle);
    fd.append("company", payload.company);
    fd.append("jobUrl", payload.jobUrl);
    fd.append("message", payload.coverLetter);
    if (file) fd.append("resume", file, file.name);
    const res = await fetch(endpoint, {
      method: "POST",
      body: fd,
      headers: { Accept: "application/json" }
    });
    if (!res.ok) throw new Error("Formspree submission failed");
    return { ok: true };
  }

  function openMailtoFallback(payload) {
    const subject = payload._subject;
    const body =
      payload.coverLetter +
      "\n\n---\nNote: Resume could not be attached via mailto. Please reply with your resume if this email opened without an attachment.";
    const href = `mailto:${encodeURIComponent(mailtoAddress())}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }

  function validate(form, file) {
    const data = {
      fullName: String(form.fullName.value || "").trim(),
      email: String(form.email.value || "").trim(),
      phone: String(form.phone.value || "").trim(),
      experience: String(form.experience.value || "").trim(),
      location: String(form.location.value || "").trim(),
      portfolioUrl: normalizeUrl(form.portfolioUrl.value),
      message: String(form.message.value || "").trim(),
      consent: Boolean(form.consent.checked)
    };
    if (!data.fullName) return { error: "Enter your full name." };
    if (!isValidEmail(data.email)) return { error: "Enter a valid email address." };
    if (!isValidPhone(data.phone)) return { error: "Enter a valid phone number (10–15 digits)." };
    if (!data.experience) return { error: "Select your experience." };
    if (!data.location) return { error: "Enter your current location." };
    if (!isValidUrl(data.portfolioUrl)) return { error: "Enter a valid portfolio or LinkedIn URL." };
    if (!file) return { error: "Upload your resume (PDF, DOC, or DOCX)." };
    if (file.size > MAX_RESUME_BYTES) return { error: "Resume must be 5 MB or smaller." };
    const typeOk = !file.type || ALLOWED_TYPES.includes(file.type) || ALLOWED_EXT.test(file.name);
    if (!typeOk) return { error: "Resume must be a PDF, DOC, or DOCX file." };
    if (!data.consent) return { error: "Please confirm the consent checkbox." };
    return { data };
  }

  function bind(job) {
    if (!job || !job.onSiteApply) return;
    const form = document.getElementById("ipd-job-apply-form");
    if (!form) return;

    const statusEl = document.getElementById("ipd-apply-status");
    const submitBtn = document.getElementById("ipd-apply-submit");
    const resumeInput = document.getElementById("ipd-apply-resume");

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const file = resumeInput && resumeInput.files && resumeInput.files[0] ? resumeInput.files[0] : null;
      const checked = validate(form, file);
      if (checked.error) {
        setStatus(statusEl, checked.error, true);
        return;
      }

      const data = checked.data;
      const jobUrl = `https://infoparkdaily.online/job/${encodeURIComponent(job.id)}/`;
      const id = `app-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const submittedAt = new Date().toISOString();
      const coverLetter = buildCoverLetter(job, {
        ...data,
        resumeFileName: file.name,
        jobUrl
      });
      const subject = `Application: ${(job.roles && job.roles[0]) || "Role"} — ${
        job.companyLegalName || job.company
      } — ${data.fullName}`;

      const localRecord = {
        id,
        submittedAt,
        jobId: job.id,
        jobTitle: (job.roles && job.roles[0]) || "",
        company: job.companyLegalName || job.company || "",
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        experience: data.experience,
        location: data.location,
        portfolioUrl: data.portfolioUrl,
        coverLetter,
        message: data.message,
        resumeFileName: file.name,
        resumeDriveUrl: "",
        resumeMimeType: file.type || "",
        status: "new",
        source: "InfoparkDaily Website",
        jobUrl
      };

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting…";
      }
      setStatus(statusEl, "Submitting your application…", false);

      try {
        let resumeBase64 = "";
        try {
          resumeBase64 = await fileToBase64(file);
        } catch (_e) {
          /* continue without base64 if read fails — mailto/Formspree may still work */
        }

        const apiPayload = {
          ...localRecord,
          resumeBase64,
          _subject: subject
        };

        let apiOk = false;
        let formspreeOk = false;
        let apiWarning = "";

        try {
          const apiRes = await postToApi(apiPayload);
          if (!apiRes.skipped) {
            apiOk = true;
            if (apiRes.resumeDriveUrl) localRecord.resumeDriveUrl = apiRes.resumeDriveUrl;
            if (apiRes.warning) apiWarning = apiRes.warning;
          }
        } catch (apiErr) {
          apiWarning = String(apiErr && apiErr.message ? apiErr.message : apiErr);
        }

        try {
          const fsRes = await postToFormspree(apiPayload, file);
          if (!fsRes.skipped) formspreeOk = true;
        } catch (_fsErr) {
          /* optional channel */
        }

        saveLocalApplication(localRecord);

        if (typeof window.ipdTrack === "function") {
          try {
            window.ipdTrack("job_apply_submit", { jobId: job.id, company: job.company });
          } catch (_e) {
            /* ignore */
          }
        }

        clearApplyForm(form);

        if (apiOk || formspreeOk) {
          const okMsg = apiWarning
            ? "Application submitted. " + apiWarning
            : "Application submitted successfully.";
          setStatus(statusEl, okMsg, false);
          showSuccessToast(okMsg);
        } else {
          const fallbackMsg =
            "Application submitted successfully. Opening email — attach your resume if needed.";
          setStatus(statusEl, fallbackMsg, false);
          showSuccessToast("Application submitted successfully.");
          setTimeout(function () {
            openMailtoFallback(apiPayload);
          }, 450);
        }
      } catch (err) {
        saveLocalApplication(localRecord);
        clearApplyForm(form);
        setStatus(
          statusEl,
          "Application saved. Opening email with your cover letter — please attach your resume.",
          false
        );
        showSuccessToast("Application submitted successfully.");
        setTimeout(function () {
          openMailtoFallback({ ...localRecord, _subject: subject });
        }, 450);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit application";
        }
      }
    });
  }

  window.IPDJobApply = {
    formHtml,
    compactCtaHtml: compactFormHtml,
    bind,
    readLocalApps,
    buildCoverLetter
  };
})();
