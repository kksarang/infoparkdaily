/**
 * InfoparkDaily — Post a Job portal (public steps 1–13)
 *
 * Submit: WhatsApp summary (primary) + optional GOOGLE_SHEET_ENDPOINT POST.
 * Publish stays manual via jobs-data.js after team review.
 *
 * Future admin tooling (not in public UI): verification status, spam score,
 * publishedBy, publishedDate, expiryDate, duplicate check, auto page gen.
 */
(function () {
  const form = document.getElementById("post-job-form");
  const stepHost = document.getElementById("post-job-step-host");
  const progressEl = document.getElementById("post-job-progress");
  const statusEl = document.getElementById("post-job-status");
  const backBtn = document.getElementById("post-job-back");
  const nextBtn = document.getElementById("post-job-next");
  const submitBtn = document.getElementById("post-job-submit");
  const successEl = document.getElementById("post-job-success");
  const previewBody = document.getElementById("post-job-preview-body");
  const previewWrap = document.querySelector(".post-job-preview-wrap");
  const previewToggle = document.getElementById("post-job-preview-toggle");
  const againBtn = document.getElementById("post-job-again");

  if (!form || !stepHost) return;

  /**
   * GOOGLE SHEET / APPS SCRIPT SETUP
   * 1. Deploy an Apps Script web app that accepts JSON POST
   * 2. Paste the URL below, e.g. "https://script.google.com/macros/s/.../exec"
   * Until set, only WhatsApp summary is used.
   */
  const GOOGLE_SHEET_ENDPOINT = "";
  const WHATSAPP_NUMBER = "919995254290";
  const DRAFT_KEY = "ipd-post-job-draft-v1";
  const MAX_FILE_BYTES = 300 * 1024;

  const SKILL_OPTIONS = [
    "Flutter", "React", "Angular", "Node.js", "Java", "Python", ".NET", "PHP", "Laravel",
    "Spring Boot", "AWS", "Azure", "GCP", "Docker", "Kubernetes", "MySQL", "MongoDB",
    "PostgreSQL", "DevOps", "UI/UX", "Testing", "QA", "HR", "Sales", "Marketing",
    "Customer Support", "Business Analyst", "Project Manager", "Data Science", "AI/ML",
    "Cyber Security", "SAP", "Oracle", "Power BI", "Excel", "Communication", "Leadership",
    "Problem Solving"
  ];

  const BENEFIT_OPTIONS = [
    "Health Insurance", "PF", "ESI", "Gratuity", "Food", "Cab", "Transport", "Laptop",
    "Training", "Certification", "Flexible Hours", "WFH", "Hybrid", "Paid Leave",
    "Performance Bonus", "Festival Bonus", "Annual Bonus", "Gym", "Employee Discounts",
    "Referral Bonus", "Stock Options"
  ];

  const INTERVIEW_OPTIONS = [
    "Resume Screening", "Online Test", "Coding Round", "Technical Round", "Assignment",
    "Manager Round", "HR Round", "Director Round", "Offer Letter", "Background Verification"
  ];

  const PREMIUM_OPTIONS = [
    "Feature this Job", "Urgent Hiring Badge", "Verified Employer Badge", "Sponsored Listing",
    "Homepage Feature", "Instagram Story Promotion", "Instagram Feed Promotion",
    "WhatsApp Broadcast", "Telegram Broadcast", "LinkedIn Promotion", "Facebook Promotion",
    "Priority Approval"
  ];

  const STEPS = [
    {
      id: "recruiter",
      title: "Recruiter details",
      blurb: "Who is submitting this opening?",
      fields: [
        { name: "fullName", label: "Full name", type: "text", required: true, autocomplete: "name" },
        { name: "workEmail", label: "Work email", type: "email", required: true, autocomplete: "email" },
        { name: "mobile", label: "Mobile number", type: "tel", required: true, autocomplete: "tel" },
        { name: "whatsapp", label: "WhatsApp number", type: "tel" },
        { name: "designation", label: "Designation", type: "text" },
        { name: "department", label: "Department", type: "text" },
        { name: "linkedinProfile", label: "LinkedIn profile", type: "url", placeholder: "https://" },
        { name: "companyEmail", label: "Official company email", type: "email" },
        {
          name: "posterRole",
          label: "Are you",
          type: "select",
          required: true,
          options: [
            "HR", "Recruiter", "Founder", "CEO", "Manager", "Team Lead", "Hiring Manager",
            "Individual Employer", "Consultancy", "Other"
          ]
        }
      ]
    },
    {
      id: "company",
      title: "Company information",
      blurb: "Tell candidates who you are.",
      fields: [
        { name: "companyName", label: "Company name", type: "text", required: true },
        { name: "companyWebsite", label: "Official company website", type: "url", required: true, placeholder: "https://" },
        { name: "companyLogoUrl", label: "Company logo URL", type: "url", placeholder: "https://…/logo.png", hint: "Or upload a small image below (max ~300KB)." },
        { name: "companyLogoFile", label: "Company logo upload", type: "file", accept: "image/*" },
        { name: "companyCoverUrl", label: "Company cover image URL", type: "url", placeholder: "https://" },
        { name: "companyDescription", label: "Company description", type: "textarea", rows: 4 },
        { name: "industry", label: "Industry", type: "text" },
        { name: "companySize", label: "Company size", type: "select", options: ["1–10", "11–50", "51–200", "201–500", "501–1000", "1000+"] },
        { name: "yearFounded", label: "Year founded", type: "text", placeholder: "e.g. 2018" },
        { name: "headOffice", label: "Head office", type: "text" },
        { name: "officeLocation", label: "Office location", type: "text", placeholder: "Infopark, Kochi" },
        { name: "companyMapsUrl", label: "Google Maps URL", type: "url", placeholder: "https://maps.google.com/…" },
        { name: "companyLinkedIn", label: "LinkedIn company page", type: "url" },
        { name: "companyInstagram", label: "Instagram", type: "url" },
        { name: "companyFacebook", label: "Facebook", type: "url" },
        { name: "companyTwitter", label: "Twitter / X", type: "url" },
        { name: "careersPage", label: "Careers page", type: "url" },
        { name: "glassdoor", label: "Glassdoor", type: "url" },
        { name: "registrationNumber", label: "Company registration number", type: "text", optional: true },
        { name: "gstNumber", label: "GST number", type: "text", optional: true }
      ]
    },
    {
      id: "job",
      title: "Job details",
      blurb: "Core facts candidates scan first.",
      fields: [
        { name: "jobTitle", label: "Job title", type: "text", required: true },
        { name: "jobDepartment", label: "Department", type: "text" },
        { name: "roleCategory", label: "Role category", type: "text", placeholder: "Engineering, Marketing…" },
        {
          name: "employmentType",
          label: "Employment type",
          type: "select",
          required: true,
          options: ["Full Time", "Part Time", "Internship", "Contract", "Freelance", "Temporary"]
        },
        {
          name: "workMode",
          label: "Work mode",
          type: "select",
          required: true,
          options: ["Work From Office", "Hybrid", "Remote"]
        },
        { name: "experienceRequired", label: "Experience required", type: "text", placeholder: "e.g. 2–4 years" },
        { name: "minExperience", label: "Minimum experience (years)", type: "number", min: 0, step: "0.5" },
        { name: "maxExperience", label: "Maximum experience (years)", type: "number", min: 0, step: "0.5" },
        { name: "educationRequired", label: "Education required", type: "text" },
        { name: "branchesEligible", label: "Branches eligible", type: "text" },
        { name: "freshersAllowed", label: "Freshers allowed?", type: "select", options: ["Yes", "No", "Role-dependent"] },
        { name: "vacancies", label: "Number of vacancies", type: "number", min: 1 },
        { name: "salaryRange", label: "Salary range", type: "text", placeholder: "e.g. ₹4–6 LPA" },
        { name: "monthlySalary", label: "Monthly salary", type: "text" },
        { name: "annualCtc", label: "Annual CTC", type: "text" },
        { name: "bonus", label: "Bonus", type: "text" },
        { name: "joiningBonus", label: "Joining bonus", type: "text" },
        { name: "shift", label: "Shift", type: "text" },
        { name: "workingDays", label: "Working days", type: "text", placeholder: "Mon–Fri" },
        { name: "workingHours", label: "Working hours", type: "text" },
        { name: "noticePeriod", label: "Notice period", type: "text" },
        { name: "immediateJoining", label: "Immediate joining?", type: "select", options: ["Yes", "No", "Preferred"] },
        { name: "applyDeadline", label: "Application deadline", type: "date" },
        { name: "joiningDate", label: "Expected joining date", type: "date" }
      ]
    },
    {
      id: "description",
      title: "Job description",
      blurb: "Write clear sections — no fluff.",
      fields: [
        { name: "aboutRole", label: "About the role", type: "textarea", rows: 4, required: true },
        { name: "responsibilities", label: "Responsibilities", type: "textarea", rows: 4, required: true },
        { name: "dailyTasks", label: "Daily tasks", type: "textarea", rows: 3 },
        { name: "requiredSkillsText", label: "Required skills", type: "textarea", rows: 3 },
        { name: "preferredSkillsText", label: "Preferred skills", type: "textarea", rows: 3 },
        { name: "softSkillsText", label: "Soft skills", type: "textarea", rows: 2 },
        { name: "goodToHave", label: "Good to have skills", type: "textarea", rows: 2 },
        { name: "techStack", label: "Technology stack", type: "textarea", rows: 2 },
        { name: "teamInfo", label: "Team information", type: "textarea", rows: 2 },
        { name: "careerGrowth", label: "Career growth", type: "textarea", rows: 2 }
      ]
    },
    {
      id: "skills",
      title: "Skills",
      blurb: "Select chips or add custom skills.",
      fields: [
        { name: "skills", label: "Skills", type: "chips", options: SKILL_OPTIONS, allowCustom: true }
      ]
    },
    {
      id: "requirements",
      title: "Candidate requirements",
      blurb: "Eligibility and document expectations.",
      fields: [
        { name: "minQualification", label: "Minimum qualification", type: "text" },
        { name: "preferredQualification", label: "Preferred qualification", type: "text" },
        { name: "percentage", label: "Percentage", type: "text" },
        { name: "cgpa", label: "CGPA", type: "text" },
        { name: "yearOfPassing", label: "Year of passing", type: "text" },
        { name: "genderPreference", label: "Gender preference", type: "select", options: ["No preference", "Male", "Female", "Other / as per role"] },
        { name: "languagesRequired", label: "Languages required", type: "text" },
        { name: "certificationRequired", label: "Certification required", type: "text" },
        { name: "portfolioRequired", label: "Portfolio required?", type: "select", options: ["Yes", "No", "Optional"] },
        { name: "githubRequired", label: "GitHub required?", type: "select", options: ["Yes", "No", "Optional"] },
        { name: "linkedinRequired", label: "LinkedIn required?", type: "select", options: ["Yes", "No", "Optional"] },
        { name: "resumeRequired", label: "Resume required?", type: "select", options: ["Yes", "No", "Optional"], required: true },
        { name: "workAuthorization", label: "Work authorization", type: "text" },
        { name: "relocationRequired", label: "Relocation required?", type: "select", options: ["Yes", "No", "Preferred"] },
        { name: "travelRequired", label: "Travel required?", type: "select", options: ["Yes", "No", "Occasional"] },
        { name: "bgvRequired", label: "Background verification required?", type: "select", options: ["Yes", "No", "After offer"] }
      ]
    },
    {
      id: "benefits",
      title: "Benefits",
      blurb: "Select what you offer.",
      fields: [
        { name: "benefits", label: "Benefits", type: "checkgrid", options: BENEFIT_OPTIONS }
      ]
    },
    {
      id: "interview",
      title: "Interview process",
      blurb: "How will you hire?",
      fields: [
        { name: "interviewSteps", label: "Process stages", type: "checkgrid", options: INTERVIEW_OPTIONS },
        { name: "interviewDuration", label: "Expected interview duration", type: "text", placeholder: "e.g. 1–2 weeks" },
        { name: "hiringTimeline", label: "Expected hiring timeline", type: "text", placeholder: "e.g. 30 days" }
      ]
    },
    {
      id: "apply",
      title: "Application method",
      blurb: "Where should candidates apply?",
      fields: [
        {
          name: "applyMethod",
          label: "How should candidates apply?",
          type: "select",
          required: true,
          options: [
            "Official Careers Website",
            "Apply URL",
            "Email",
            "WhatsApp",
            "Google Form",
            "InfoparkDaily Apply System"
          ]
        },
        { name: "applyUrl", label: "Apply URL", type: "url", placeholder: "https://" },
        { name: "applicationEmail", label: "Application email", type: "email" },
        { name: "applicationSubject", label: "Application subject", type: "text" },
        { name: "resumeFormat", label: "Resume format", type: "select", options: ["PDF", "DOCX", "Either", "Other"] },
        { name: "portfolioLinkRequired", label: "Portfolio link required?", type: "select", options: ["Yes", "No", "Optional"] },
        { name: "coverLetterRequired", label: "Cover letter required?", type: "select", options: ["Yes", "No", "Optional"] },
        { name: "additionalDocuments", label: "Additional documents", type: "textarea", rows: 2 }
      ]
    },
    {
      id: "office",
      title: "Office information",
      blurb: "Help candidates find you.",
      fields: [
        { name: "officeAddress", label: "Office address", type: "textarea", rows: 2 },
        { name: "buildingName", label: "Building name", type: "text" },
        { name: "campus", label: "Campus", type: "text", placeholder: "Infopark Phase 1" },
        { name: "floor", label: "Floor", type: "text" },
        { name: "nearestBusStop", label: "Nearest bus stop", type: "text" },
        { name: "nearestMetro", label: "Nearest metro", type: "text" },
        { name: "parking", label: "Parking", type: "text" },
        { name: "officeMapsUrl", label: "Google Maps URL", type: "url" }
      ]
    },
    {
      id: "media",
      title: "Media uploads",
      blurb: "Prefer https URLs. Small logo files ok (max ~300KB).",
      fields: [
        { name: "mediaLogoUrl", label: "Company logo URL", type: "url" },
        { name: "officeImagesUrl", label: "Office images URL (drive / album)", type: "url" },
        { name: "officeVideosUrl", label: "Office video URL", type: "url" },
        { name: "culturePhotosUrl", label: "Culture photos URL", type: "url" },
        { name: "teamPhotosUrl", label: "Team photos URL", type: "url" },
        { name: "recruitmentBannerUrl", label: "Recruitment banner URL", type: "url" },
        { name: "officeTourUrl", label: "Office tour video URL", type: "url" }
      ]
    },
    {
      id: "verification",
      title: "Verification",
      blurb: "Confirm this is a genuine opening.",
      fields: [
        { name: "confirmRepresent", label: "I represent this company / employer", type: "checkbox", required: true },
        { name: "confirmAccurate", label: "All information is accurate", type: "checkbox", required: true },
        { name: "confirmGenuine", label: "This is a genuine job opening", type: "checkbox", required: true },
        { name: "confirmNoFee", label: "No recruitment fee will be charged to candidates", type: "checkbox", required: true },
        { name: "confirmAuthorize", label: "I authorize InfoparkDaily to publish this listing after review", type: "checkbox", required: true },
        { name: "digitalSignature", label: "Digital signature (type full name)", type: "text", required: true },
        { name: "companySealUrl", label: "Company seal image URL (optional)", type: "url", optional: true }
      ]
    },
    {
      id: "premium",
      title: "Premium options",
      blurb: "Request-only — fulfilled manually after approval. No payment on this form.",
      fields: [
        { name: "premiumOptions", label: "Promotion requests", type: "checkgrid", options: PREMIUM_OPTIONS },
        { name: "premiumNotes", label: "Notes for our team", type: "textarea", rows: 3, placeholder: "Budget, timeline, or campaign preferences…" }
      ]
    }
  ];

  let stepIndex = 0;
  let state = loadDraft() || {};
  let logoDataUrl = state._logoDataUrl || "";

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_e) {
      return null;
    }
  }

  function saveDraft() {
    try {
      const payload = { ...collectFormIntoState(), _logoDataUrl: logoDataUrl, _step: stepIndex };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
    } catch (_e) {
      /* ignore quota */
    }
  }

  function clearDraft() {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (_e) {
      /* ignore */
    }
  }

  function fieldValue(name) {
    const v = state[name];
    if (Array.isArray(v)) return v;
    return v == null ? "" : String(v);
  }

  function renderField(field) {
    const id = `pj-${field.name}`;
    const val = fieldValue(field.name);
    const req = field.required ? ' <span class="pj-req">*</span>' : field.optional ? ' <span class="pj-opt">optional</span>' : "";
    const hint = field.hint ? `<span class="pj-hint">${escapeHtml(field.hint)}</span>` : "";

    if (field.type === "textarea") {
      return `
        <label class="pj-field" for="${id}">
          <span>${escapeHtml(field.label)}${req}</span>
          <textarea id="${id}" name="${escapeHtml(field.name)}" rows="${field.rows || 3}" ${field.required ? "required" : ""} placeholder="${escapeHtml(field.placeholder || "")}">${escapeHtml(val)}</textarea>
          ${hint}
        </label>`;
    }

    if (field.type === "select") {
      const opts = [`<option value="">Select…</option>`]
        .concat(
          (field.options || []).map(
            (o) => `<option value="${escapeHtml(o)}"${val === o ? " selected" : ""}>${escapeHtml(o)}</option>`
          )
        )
        .join("");
      return `
        <label class="pj-field" for="${id}">
          <span>${escapeHtml(field.label)}${req}</span>
          <select id="${id}" name="${escapeHtml(field.name)}" ${field.required ? "required" : ""}>${opts}</select>
          ${hint}
        </label>`;
    }

    if (field.type === "checkbox") {
      const checked = val === true || val === "true" || val === "on" || val === "1";
      return `
        <label class="pj-check">
          <input type="checkbox" id="${id}" name="${escapeHtml(field.name)}" ${checked ? "checked" : ""} ${field.required ? "required" : ""} />
          <span>${escapeHtml(field.label)}${req}</span>
        </label>`;
    }

    if (field.type === "chips") {
      const selected = Array.isArray(val) ? val : [];
      const chips = (field.options || [])
        .map((o) => {
          const on = selected.includes(o);
          return `<button type="button" class="pj-chip${on ? " is-on" : ""}" data-chip="${escapeHtml(o)}" aria-pressed="${on}">${escapeHtml(o)}</button>`;
        })
        .join("");
      return `
        <div class="pj-field pj-field--chips" data-chips-name="${escapeHtml(field.name)}">
          <span>${escapeHtml(field.label)}${req}</span>
          <div class="pj-chip-grid">${chips}</div>
          ${
            field.allowCustom
              ? `<div class="pj-custom-skill">
                  <input type="text" id="${id}-custom" placeholder="Add custom skill" />
                  <button type="button" class="btn btn-ghost pj-add-skill" data-target="${escapeHtml(field.name)}">Add</button>
                </div>`
              : ""
          }
          <input type="hidden" name="${escapeHtml(field.name)}" value="${escapeHtml(selected.join("|"))}" />
          ${hint}
        </div>`;
    }

    if (field.type === "checkgrid") {
      const selected = Array.isArray(val) ? val : [];
      const items = (field.options || [])
        .map((o) => {
          const on = selected.includes(o);
          return `
            <label class="pj-check pj-check--grid">
              <input type="checkbox" name="${escapeHtml(field.name)}" value="${escapeHtml(o)}" ${on ? "checked" : ""} />
              <span>${escapeHtml(o)}</span>
            </label>`;
        })
        .join("");
      return `
        <fieldset class="pj-field pj-field--grid">
          <legend>${escapeHtml(field.label)}${req}</legend>
          <div class="pj-check-grid">${items}</div>
          ${hint}
        </fieldset>`;
    }

    if (field.type === "file") {
      return `
        <label class="pj-field" for="${id}">
          <span>${escapeHtml(field.label)}${req}</span>
          <input id="${id}" name="${escapeHtml(field.name)}" type="file" accept="${escapeHtml(field.accept || "image/*")}" />
          ${logoDataUrl ? '<span class="pj-hint">Logo attached for this draft.</span>' : ""}
          ${hint}
        </label>`;
    }

    return `
      <label class="pj-field" for="${id}">
        <span>${escapeHtml(field.label)}${req}</span>
        <input
          id="${id}"
          name="${escapeHtml(field.name)}"
          type="${escapeHtml(field.type || "text")}"
          value="${escapeHtml(val)}"
          ${field.required ? "required" : ""}
          ${field.autocomplete ? `autocomplete="${escapeHtml(field.autocomplete)}"` : ""}
          ${field.placeholder ? `placeholder="${escapeHtml(field.placeholder)}"` : ""}
          ${field.min != null ? `min="${field.min}"` : ""}
          ${field.step != null ? `step="${field.step}"` : ""}
        />
        ${hint}
      </label>`;
  }

  function renderProgress() {
    progressEl.innerHTML = STEPS.map((step, i) => {
      const cls = i === stepIndex ? "is-current" : i < stepIndex ? "is-done" : "";
      return `
        <button type="button" class="post-job-step-pill ${cls}" data-step="${i}" ${i > stepIndex ? "disabled" : ""}>
          <span class="post-job-step-num">${String(i + 1).padStart(2, "0")}</span>
          <span class="post-job-step-label">${escapeHtml(step.title)}</span>
        </button>`;
    }).join("");
  }

  function renderStep() {
    const step = STEPS[stepIndex];
    stepHost.innerHTML = `
      <header class="post-job-step-head">
        <p class="jobs-kicker">Step ${stepIndex + 1} of ${STEPS.length}</p>
        <h2>${escapeHtml(step.title)}</h2>
        <p class="post-job-step-blurb">${escapeHtml(step.blurb)}</p>
      </header>
      <div class="pj-fields">${step.fields.map(renderField).join("")}</div>
    `;

    bindStepInteractions();
    renderProgress();
    backBtn.disabled = stepIndex === 0;
    const last = stepIndex === STEPS.length - 1;
    nextBtn.hidden = last;
    submitBtn.hidden = !last;
    statusEl.textContent = "";
    updatePreview();
    stepHost.focus({ preventScroll: true });
    stepHost.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function bindStepInteractions() {
    stepHost.querySelectorAll(".pj-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("is-on");
        btn.setAttribute("aria-pressed", btn.classList.contains("is-on") ? "true" : "false");
        syncChipsHidden(btn.closest("[data-chips-name]"));
        saveDraft();
        updatePreview();
      });
    });

    stepHost.querySelectorAll(".pj-add-skill").forEach((btn) => {
      btn.addEventListener("click", () => {
        const wrap = btn.closest("[data-chips-name]");
        const input = wrap.querySelector("input[type='text']");
        const skill = String(input.value || "").trim();
        if (!skill) return;
        const grid = wrap.querySelector(".pj-chip-grid");
        const existing = Array.from(grid.querySelectorAll(".pj-chip")).find(
          (c) => c.dataset.chip.toLowerCase() === skill.toLowerCase()
        );
        if (existing) {
          existing.classList.add("is-on");
        } else {
          const chip = document.createElement("button");
          chip.type = "button";
          chip.className = "pj-chip is-on";
          chip.dataset.chip = skill;
          chip.setAttribute("aria-pressed", "true");
          chip.textContent = skill;
          chip.addEventListener("click", () => {
            chip.classList.toggle("is-on");
            chip.setAttribute("aria-pressed", chip.classList.contains("is-on") ? "true" : "false");
            syncChipsHidden(wrap);
            saveDraft();
            updatePreview();
          });
          grid.appendChild(chip);
        }
        input.value = "";
        syncChipsHidden(wrap);
        saveDraft();
        updatePreview();
      });
    });

    const logoInput = stepHost.querySelector('input[name="companyLogoFile"]');
    if (logoInput) {
      logoInput.addEventListener("change", async () => {
        const file = logoInput.files && logoInput.files[0];
        if (!file) return;
        if (file.size > MAX_FILE_BYTES) {
          statusEl.textContent = "Logo too large — use a URL or an image under ~300KB.";
          logoInput.value = "";
          return;
        }
        logoDataUrl = await readFileAsDataUrl(file);
        statusEl.textContent = "Logo attached to draft.";
        saveDraft();
        updatePreview();
      });
    }

    stepHost.querySelectorAll("input, select, textarea").forEach((el) => {
      el.addEventListener("change", () => {
        collectFormIntoState();
        saveDraft();
        updatePreview();
      });
      el.addEventListener("input", () => {
        collectFormIntoState();
        updatePreview();
      });
    });
  }

  function syncChipsHidden(wrap) {
    if (!wrap) return;
    const name = wrap.getAttribute("data-chips-name");
    const selected = Array.from(wrap.querySelectorAll(".pj-chip.is-on")).map((c) => c.dataset.chip);
    const hidden = wrap.querySelector(`input[type="hidden"][name="${name}"]`);
    if (hidden) hidden.value = selected.join("|");
    state[name] = selected;
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function collectFormIntoState() {
    const step = STEPS[stepIndex];
    step.fields.forEach((field) => {
      if (field.type === "chips") {
        const wrap = stepHost.querySelector(`[data-chips-name="${field.name}"]`);
        if (wrap) syncChipsHidden(wrap);
        return;
      }
      if (field.type === "checkgrid") {
        state[field.name] = Array.from(
          stepHost.querySelectorAll(`input[name="${field.name}"]:checked`)
        ).map((el) => el.value);
        return;
      }
      if (field.type === "checkbox") {
        const el = stepHost.querySelector(`[name="${field.name}"]`);
        state[field.name] = el ? el.checked : false;
        return;
      }
      if (field.type === "file") return;
      const el = stepHost.querySelector(`[name="${field.name}"]`);
      if (el) state[field.name] = el.value;
    });
    state._logoDataUrl = logoDataUrl;
    return state;
  }

  function validateStep() {
    collectFormIntoState();
    const step = STEPS[stepIndex];
    const missing = [];

    step.fields.forEach((field) => {
      if (!field.required) return;
      if (field.type === "checkbox") {
        if (!state[field.name]) missing.push(field.label);
        return;
      }
      if (field.type === "chips" || field.type === "checkgrid") {
        if (!Array.isArray(state[field.name]) || !state[field.name].length) {
          /* chips/checkgrid optional unless required — skills not required */
          if (field.required) missing.push(field.label);
        }
        return;
      }
      const val = String(state[field.name] || "").trim();
      if (!val) missing.push(field.label);
      if (field.type === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        missing.push(`${field.label} (invalid)`);
      }
      if (field.type === "url" && val && !/^https?:\/\//i.test(val)) {
        missing.push(`${field.label} (use http/https)`);
      }
    });

    if (step.id === "company") {
      const hasLogo = String(state.companyLogoUrl || "").trim() || logoDataUrl;
      if (!hasLogo) missing.push("Company logo (URL or upload)");
    }

    if (step.id === "apply") {
      const method = state.applyMethod;
      if (method === "Email" && !String(state.applicationEmail || "").trim()) {
        missing.push("Application email");
      }
      if (
        (method === "Apply URL" || method === "Official Careers Website" || method === "Google Form") &&
        !String(state.applyUrl || "").trim()
      ) {
        missing.push("Apply URL");
      }
    }

    if (missing.length) {
      statusEl.textContent = `Please complete: ${missing.slice(0, 4).join(", ")}${missing.length > 4 ? "…" : ""}`;
      return false;
    }
    return true;
  }

  function updatePreview() {
    collectFormIntoState();
    const company = state.companyName || "Your company";
    const title = state.jobTitle || "Job title";
    const location = state.officeLocation || state.campus || state.officeAddress || "Location TBA";
    const skills = Array.isArray(state.skills) ? state.skills.slice(0, 8) : [];
    const benefits = Array.isArray(state.benefits) ? state.benefits.slice(0, 6) : [];
    const apply =
      state.applyMethod === "Email"
        ? state.applicationEmail || "Email TBA"
        : state.applyUrl || state.applyMethod || "Apply method TBA";

    previewBody.innerHTML = `
      <div class="pj-preview-hero">
        <div class="pj-preview-logo" aria-hidden="true">${escapeHtml((company || "?").slice(0, 2).toUpperCase())}</div>
        <div>
          <strong>${escapeHtml(company)}</strong>
          <p>${escapeHtml(title)}</p>
          <span>${escapeHtml(location)}</span>
        </div>
      </div>
      <div class="pj-preview-facts">
        ${fact("Type", state.employmentType)}
        ${fact("Mode", state.workMode)}
        ${fact("Experience", state.experienceRequired || [state.minExperience, state.maxExperience].filter(Boolean).join("–"))}
        ${fact("Deadline", state.applyDeadline)}
        ${fact("Salary", state.salaryRange || state.annualCtc || state.monthlySalary)}
      </div>
      ${
        state.aboutRole
          ? `<div class="pj-preview-block"><h3>About role</h3><p>${escapeHtml(String(state.aboutRole).slice(0, 220))}${String(state.aboutRole).length > 220 ? "…" : ""}</p></div>`
          : ""
      }
      ${
        skills.length
          ? `<div class="pj-preview-block"><h3>Skills</h3><div class="pj-preview-chips">${skills
              .map((s) => `<span>${escapeHtml(s)}</span>`)
              .join("")}</div></div>`
          : ""
      }
      ${
        benefits.length
          ? `<div class="pj-preview-block"><h3>Benefits</h3><p>${escapeHtml(benefits.join(" · "))}</p></div>`
          : ""
      }
      <div class="pj-preview-block">
        <h3>How to apply</h3>
        <p>${escapeHtml(apply)}</p>
      </div>
      <p class="pj-preview-note">Verified badge appears only after InfoparkDaily manual review.</p>
      <p class="pj-preview-note pj-preview-note--soft">AI SEO / interview tips — coming after approval.</p>
    `;
  }

  function fact(label, value) {
    if (!value) return "";
    return `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
  }

  function buildPayload() {
    collectFormIntoState();
    return {
      source: "infoparkdaily-post-job",
      submittedAt: new Date().toISOString(),
      status: "pending_review",
      recruiter: {
        fullName: state.fullName,
        workEmail: state.workEmail,
        mobile: state.mobile,
        whatsapp: state.whatsapp,
        designation: state.designation,
        department: state.department,
        linkedinProfile: state.linkedinProfile,
        companyEmail: state.companyEmail,
        posterRole: state.posterRole
      },
      company: {
        name: state.companyName,
        website: state.companyWebsite,
        logoUrl: state.companyLogoUrl || state.mediaLogoUrl || "",
        logoDataUrl: logoDataUrl ? "[attached]" : "",
        coverUrl: state.companyCoverUrl,
        description: state.companyDescription,
        industry: state.industry,
        size: state.companySize,
        yearFounded: state.yearFounded,
        headOffice: state.headOffice,
        officeLocation: state.officeLocation,
        mapsUrl: state.companyMapsUrl || state.officeMapsUrl,
        linkedin: state.companyLinkedIn,
        instagram: state.companyInstagram,
        facebook: state.companyFacebook,
        twitter: state.companyTwitter,
        careersPage: state.careersPage,
        glassdoor: state.glassdoor,
        registrationNumber: state.registrationNumber,
        gstNumber: state.gstNumber
      },
      job: {
        title: state.jobTitle,
        department: state.jobDepartment,
        roleCategory: state.roleCategory,
        employmentType: state.employmentType,
        workMode: state.workMode,
        experienceRequired: state.experienceRequired,
        minExperience: state.minExperience,
        maxExperience: state.maxExperience,
        educationRequired: state.educationRequired,
        branchesEligible: state.branchesEligible,
        freshersAllowed: state.freshersAllowed,
        vacancies: state.vacancies,
        salaryRange: state.salaryRange,
        monthlySalary: state.monthlySalary,
        annualCtc: state.annualCtc,
        bonus: state.bonus,
        joiningBonus: state.joiningBonus,
        shift: state.shift,
        workingDays: state.workingDays,
        workingHours: state.workingHours,
        noticePeriod: state.noticePeriod,
        immediateJoining: state.immediateJoining,
        applyDeadline: state.applyDeadline,
        joiningDate: state.joiningDate
      },
      description: {
        aboutRole: state.aboutRole,
        responsibilities: state.responsibilities,
        dailyTasks: state.dailyTasks,
        requiredSkillsText: state.requiredSkillsText,
        preferredSkillsText: state.preferredSkillsText,
        softSkillsText: state.softSkillsText,
        goodToHave: state.goodToHave,
        techStack: state.techStack,
        teamInfo: state.teamInfo,
        careerGrowth: state.careerGrowth
      },
      skills: state.skills || [],
      requirements: {
        minQualification: state.minQualification,
        preferredQualification: state.preferredQualification,
        percentage: state.percentage,
        cgpa: state.cgpa,
        yearOfPassing: state.yearOfPassing,
        genderPreference: state.genderPreference,
        languagesRequired: state.languagesRequired,
        certificationRequired: state.certificationRequired,
        portfolioRequired: state.portfolioRequired,
        githubRequired: state.githubRequired,
        linkedinRequired: state.linkedinRequired,
        resumeRequired: state.resumeRequired,
        workAuthorization: state.workAuthorization,
        relocationRequired: state.relocationRequired,
        travelRequired: state.travelRequired,
        bgvRequired: state.bgvRequired
      },
      benefits: state.benefits || [],
      interview: {
        steps: state.interviewSteps || [],
        duration: state.interviewDuration,
        hiringTimeline: state.hiringTimeline
      },
      application: {
        method: state.applyMethod,
        url: state.applyUrl,
        email: state.applicationEmail,
        subject: state.applicationSubject,
        resumeFormat: state.resumeFormat,
        portfolioLinkRequired: state.portfolioLinkRequired,
        coverLetterRequired: state.coverLetterRequired,
        additionalDocuments: state.additionalDocuments
      },
      office: {
        address: state.officeAddress,
        buildingName: state.buildingName,
        campus: state.campus,
        floor: state.floor,
        nearestBusStop: state.nearestBusStop,
        nearestMetro: state.nearestMetro,
        parking: state.parking,
        mapsUrl: state.officeMapsUrl
      },
      media: {
        logoUrl: state.mediaLogoUrl,
        officeImagesUrl: state.officeImagesUrl,
        officeVideosUrl: state.officeVideosUrl,
        culturePhotosUrl: state.culturePhotosUrl,
        teamPhotosUrl: state.teamPhotosUrl,
        recruitmentBannerUrl: state.recruitmentBannerUrl,
        officeTourUrl: state.officeTourUrl
      },
      verification: {
        confirmRepresent: !!state.confirmRepresent,
        confirmAccurate: !!state.confirmAccurate,
        confirmGenuine: !!state.confirmGenuine,
        confirmNoFee: !!state.confirmNoFee,
        confirmAuthorize: !!state.confirmAuthorize,
        digitalSignature: state.digitalSignature,
        companySealUrl: state.companySealUrl
      },
      premiumRequests: state.premiumOptions || [],
      premiumNotes: state.premiumNotes || ""
    };
  }

  function buildWhatsAppSummary(payload) {
    const premium = (payload.premiumRequests || []).length
      ? payload.premiumRequests.join(", ")
      : "None";
    const lines = [
      "InfoparkDaily — Post a Job request",
      "",
      `Company: ${payload.company.name}`,
      `Role: ${payload.job.title}`,
      `Type: ${payload.job.employmentType || "—"} · ${payload.job.workMode || "—"}`,
      `Location: ${payload.company.officeLocation || payload.office.campus || "—"}`,
      `Deadline: ${payload.job.applyDeadline || "—"}`,
      `Apply: ${payload.application.method}${payload.application.email ? ` · ${payload.application.email}` : ""}${payload.application.url ? ` · ${payload.application.url}` : ""}`,
      "",
      `Poster: ${payload.recruiter.fullName} (${payload.recruiter.posterRole || "—"})`,
      `Email: ${payload.recruiter.workEmail}`,
      `Mobile: ${payload.recruiter.mobile}`,
      `Website: ${payload.company.website}`,
      "",
      `Premium requests: ${premium}`,
      "",
      "Status: Pending InfoparkDaily verification"
    ];
    return lines.join("\n");
  }

  async function submitRequest(event) {
    event.preventDefault();
    if (!validateStep()) return;

    // Validate all required across steps quickly
    const payload = buildPayload();
    const hardRequired = [
      payload.recruiter.fullName,
      payload.recruiter.workEmail,
      payload.recruiter.mobile,
      payload.recruiter.posterRole,
      payload.company.name,
      payload.company.website,
      payload.job.title,
      payload.job.employmentType,
      payload.job.workMode,
      payload.description.aboutRole,
      payload.description.responsibilities,
      payload.application.method,
      payload.verification.digitalSignature
    ];
    if (hardRequired.some((v) => !String(v || "").trim())) {
      statusEl.textContent = "Some required fields are missing. Walk back through earlier steps.";
      return;
    }
    if (
      !payload.verification.confirmRepresent ||
      !payload.verification.confirmAccurate ||
      !payload.verification.confirmGenuine ||
      !payload.verification.confirmNoFee ||
      !payload.verification.confirmAuthorize
    ) {
      statusEl.textContent = "Please accept all verification checkboxes.";
      return;
    }

    submitBtn.disabled = true;
    statusEl.textContent = "Preparing WhatsApp summary…";

    if (GOOGLE_SHEET_ENDPOINT) {
      try {
        await fetch(GOOGLE_SHEET_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          mode: "no-cors"
        });
      } catch (_e) {
        /* Sheet is optional; WhatsApp still proceeds */
      }
    }

    const text = buildWhatsAppSummary(payload);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    clearDraft();
    form.hidden = true;
    progressEl.hidden = true;
    successEl.hidden = false;
    statusEl.textContent = "";
    submitBtn.disabled = false;
  }

  function goTo(index) {
    if (index < 0 || index >= STEPS.length) return;
    stepIndex = index;
    renderStep();
    saveDraft();
  }

  backBtn.addEventListener("click", () => {
    collectFormIntoState();
    saveDraft();
    goTo(stepIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (!validateStep()) return;
    saveDraft();
    goTo(stepIndex + 1);
  });

  form.addEventListener("submit", submitRequest);

  progressEl.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-step]");
    if (!btn) return;
    const idx = Number(btn.getAttribute("data-step"));
    if (Number.isNaN(idx) || idx > stepIndex) return;
    collectFormIntoState();
    saveDraft();
    goTo(idx);
  });

  if (previewToggle && previewWrap) {
    previewToggle.addEventListener("click", () => {
      previewWrap.classList.toggle("is-open");
      previewToggle.textContent = previewWrap.classList.contains("is-open")
        ? "Hide live preview"
        : "Show live preview";
    });
  }

  if (againBtn) {
    againBtn.addEventListener("click", () => {
      state = {};
      logoDataUrl = "";
      stepIndex = 0;
      clearDraft();
      successEl.hidden = true;
      form.hidden = false;
      progressEl.hidden = false;
      renderStep();
    });
  }

  if (typeof state._step === "number" && state._step >= 0 && state._step < STEPS.length) {
    stepIndex = state._step;
  }
  if (state._logoDataUrl) logoDataUrl = state._logoDataUrl;

  renderStep();
})();
