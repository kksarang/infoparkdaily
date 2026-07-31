(function () {
  /**
   * FORMSPREE SETUP
   * ---------------
   * 1. Create a form at https://formspree.io
   * 2. Paste your endpoint below, e.g. "https://formspree.io/f/xxxxxxxx"
   * 3. Redeploy. Until this is set, submissions use a mailto: fallback.
   */
  const FORMSPREE_ENDPOINT = "";

  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("contact-form-status");
  const subjectInput = document.getElementById("contact-subject");
  const companyField = document.getElementById("company-field");
  const messageLabel = document.getElementById("message-label");
  const messageInput = document.getElementById("contact-message");
  const reasonInputs = document.querySelectorAll('input[name="reason"]');

  if (!form) return;

  const reasonHints = {
    "Post a Job": {
      showCompany: true,
      messageLabel: "Job details",
      placeholder:
        "Role, salary, experience, qualification, vacancy count (e.g. 100+), walk-in dates/time/location if any, apply email/phone, deadline… For mass hiring use our /admin/post-job/ composer."
    },
    "Partner for a Campaign": {
      showCompany: true,
      messageLabel: "Campaign brief",
      placeholder: "Brand goals, timeline, content type (reels / hiring promo / launch)…"
    },
    "Get IT/Software Support (Hexenity)": {
      showCompany: true,
      messageLabel: "Project needs",
      placeholder: "Website, app, portal, or ops tool — what do you need built or fixed?"
    },
    "Startup / Build Together": {
      showCompany: true,
      messageLabel: "Your idea & what you need",
      placeholder: "Describe your startup idea, stage, and whether you need partners, ERP/SaaS/web build, marketing, or all of the above…"
    },
    "General Inquiry": {
      showCompany: false,
      messageLabel: "Message",
      placeholder: "How can we help?"
    }
  };

  const reasonQueryMap = {
    build: "Startup / Build Together",
    startup: "Startup / Build Together",
    job: "Post a Job",
    campaign: "Partner for a Campaign",
    hexenity: "Get IT/Software Support (Hexenity)",
    it: "Get IT/Software Support (Hexenity)"
  };

  function applyReasonFromQuery() {
    try {
      const params = new URLSearchParams(window.location.search);
      const key = String(params.get("reason") || "").toLowerCase().trim();
      if (!key) return;
      const value = reasonQueryMap[key] || Object.keys(reasonHints).find((r) => r.toLowerCase() === key);
      if (!value) return;
      const input = Array.from(form.querySelectorAll('input[name="reason"]')).find((el) => el.value === value);
      if (input) {
        input.checked = true;
      }
    } catch (_e) {
      /* ignore */
    }
  }

  function selectedReason() {
    const checked = form.querySelector('input[name="reason"]:checked');
    return checked ? checked.value : "General Inquiry";
  }

  function syncReasonUI() {
    const reason = selectedReason();
    const hint = reasonHints[reason] || reasonHints["General Inquiry"];
    if (subjectInput) subjectInput.value = `InfoparkDaily inquiry: ${reason}`;
    if (companyField) companyField.hidden = !hint.showCompany;
    if (messageLabel) messageLabel.textContent = hint.messageLabel;
    if (messageInput) messageInput.placeholder = hint.placeholder;
  }

  reasonInputs.forEach((input) => input.addEventListener("change", syncReasonUI));
  applyReasonFromQuery();
  syncReasonUI();

  function setStatus(message, isError) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.toggle("is-error", Boolean(isError));
  }

  function buildMailto(data) {
    const body = [
      `Reason: ${data.reason}`,
      `Name: ${data.name}`,
      `Email/Phone: ${data.channel}`,
      data.company ? `Company: ${data.company}` : "",
      "",
      data.message
    ]
      .filter(Boolean)
      .join("\n");

    return `mailto:infoparkstorieskochi@gmail.com?subject=${encodeURIComponent(
      `InfoparkDaily inquiry: ${data.reason}`
    )}&body=${encodeURIComponent(body)}`;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const reason = selectedReason();
    const name = String(form.name.value || "").trim();
    const channel = String(form.channel.value || "").trim();
    const company = String(form.company?.value || "").trim();
    const message = String(form.message.value || "").trim();

    if (!name || !channel || !message) {
      setStatus("Please fill in name, email/phone, and message.", true);
      return;
    }

    const payload = { reason, name, channel, company, message };

    if (!FORMSPREE_ENDPOINT) {
      setStatus("Opening your email app (Formspree endpoint not set yet)…");
      window.location.href = buildMailto(payload);
      return;
    }

    setStatus("Sending…");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          reason,
          name,
          email: channel,
          company,
          message,
          _subject: `InfoparkDaily inquiry: ${reason}`
        })
      });

      if (!response.ok) throw new Error("Formspree error");
      form.reset();
      syncReasonUI();
      setStatus("Thanks — we usually reply within 24 hours.");
    } catch (_error) {
      setStatus("Could not reach Formspree. Opening email fallback…", true);
      window.location.href = buildMailto(payload);
    }
  });
})();
