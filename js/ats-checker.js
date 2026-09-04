(function () {
  const fileInput = document.getElementById("ats-file");
  const drop = document.getElementById("ats-drop");
  const jdInput = document.getElementById("ats-jd");
  const checkBtn = document.getElementById("ats-check");
  const empty = document.getElementById("ats-empty");
  const result = document.getElementById("ats-result-body");
  const resultPanel = document.getElementById("ats-result-panel");
  const fileHint = document.getElementById("ats-file-hint");
  const pasteResume = document.getElementById("ats-resume-text");
  const step1Status = document.getElementById("ats-step1-status");
  const step2Status = document.getElementById("ats-step2-status");
  const flowSteps = Array.from(document.querySelectorAll("[data-ats-flow]"));

  if (!checkBtn || !drop || !fileInput || !jdInput) return;

  const STOP = new Set(
    "a an the and or of to for in on with from by at as is are was were be been being this that those these you your we our they their it its i me my about into over after before than then also can will just not no yes if but so such any all more most other some only own same too very using use used".split(
      " "
    )
  );

  let resumeText = "";

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function syncEnabled() {
    const resumeReady = resumeText.trim().length > 40;
    const jdReady = String(jdInput.value || "").trim().length > 40;
    checkBtn.disabled = !(resumeReady && jdReady);

    if (step1Status) {
      step1Status.textContent = resumeReady ? "Ready" : "Waiting";
      step1Status.classList.toggle("is-ready", resumeReady);
    }
    if (step2Status) {
      step2Status.textContent = jdReady ? "Ready" : "Waiting";
      step2Status.classList.toggle("is-ready", jdReady);
    }

    flowSteps.forEach((el) => {
      const step = el.getAttribute("data-ats-flow");
      el.classList.remove("is-active", "is-done");
      if (step === "1") {
        if (resumeReady) el.classList.add("is-done");
        else el.classList.add("is-active");
      } else if (step === "2") {
        if (jdReady) el.classList.add("is-done");
        else if (resumeReady) el.classList.add("is-active");
      } else if (step === "3") {
        if (resumeReady && jdReady) el.classList.add("is-active");
        if (result && !result.hidden) {
          el.classList.remove("is-active");
          el.classList.add("is-done");
        }
      }
    });
  }

  function tokens(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9+#.\s-]/g, " ")
      .split(/\s+/)
      .map((w) => w.trim())
      .filter((w) => w.length > 2 && !STOP.has(w) && !/^\d+$/.test(w));
  }

  function unique(list) {
    return [...new Set(list)];
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        if (existing.dataset.loaded === "1") {
          resolve();
          return;
        }
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error("Failed to load parser")), {
          once: true
        });
        return;
      }
      const el = document.createElement("script");
      el.src = src;
      el.async = true;
      el.onload = () => {
        el.dataset.loaded = "1";
        resolve();
      };
      el.onerror = () => reject(new Error("Failed to load parser"));
      document.head.appendChild(el);
    });
  }

  async function loadScriptFrom(urls) {
    let lastError = null;
    for (const src of urls) {
      try {
        await loadScript(src);
        return src;
      } catch (err) {
        lastError = err;
      }
    }
    throw lastError || new Error("Failed to load parser");
  }

  async function extractPdf(file) {
    const loadedFrom = await loadScriptFrom([
      "/vendor/pdfjs/pdf.min.js",
      "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js",
      "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.min.js"
    ]);
    const pdfjsLib = window.pdfjsLib;
    if (!pdfjsLib) throw new Error("PDF parser unavailable — paste resume text instead");
    pdfjsLib.GlobalWorkerOptions.workerSrc = loadedFrom.includes("/vendor/")
      ? "/vendor/pdfjs/pdf.worker.min.js"
      : loadedFrom.replace(/pdf\.min\.js(?:\?.*)?$/, "pdf.worker.min.js");
    const data = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i += 1) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ") + "\n";
    }
    return text;
  }

  async function extractDocx(file) {
    await loadScriptFrom([
      "/vendor/mammoth/mammoth.browser.min.js",
      "https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js",
      "https://unpkg.com/mammoth@1.8.0/mammoth.browser.min.js"
    ]);
    if (!window.mammoth) throw new Error("DOCX parser unavailable — paste resume text instead");
    const data = await file.arrayBuffer();
    const out = await window.mammoth.extractRawText({ arrayBuffer: data });
    return out.value || "";
  }

  async function readFile(file) {
    if (!file) return "";
    if (file.size > 5 * 1024 * 1024) throw new Error("File is larger than 5MB");
    const name = file.name.toLowerCase();
    if (name.endsWith(".txt") || file.type.startsWith("text/")) return file.text();
    if (name.endsWith(".pdf") || file.type === "application/pdf") return extractPdf(file);
    if (name.endsWith(".docx") || file.type.includes("wordprocessingml")) return extractDocx(file);
    throw new Error("Use PDF, DOCX, or TXT");
  }

  function scoreResume(resume, jd) {
    const resumeTok = tokens(resume);
    const jdTok = unique(tokens(jd));
    const resumeSet = new Set(resumeTok);
    const matched = jdTok.filter((w) => resumeSet.has(w));
    const missing = jdTok.filter((w) => !resumeSet.has(w)).slice(0, 18);
    const coverage = jdTok.length ? matched.length / jdTok.length : 0;

    const lower = resume.toLowerCase();
    const sections = ["experience", "education", "skills", "project", "summary", "contact"];
    const foundSections = sections.filter((s) => lower.includes(s));
    const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(resume);
    const hasPhone = /(\+91[\s-]?)?[6-9]\d{9}/.test(resume.replace(/\s/g, ""));
    const wordCount = resume.trim().split(/\s+/).length;
    const hasTablesHint = lower.includes("<table") || (resume.match(/\t/g) || []).length > 12;

    const issues = [];
    if (!hasEmail) issues.push("No email address detected — ATS systems look for contact details as plain text.");
    if (!hasPhone)
      issues.push("No Indian mobile number detected. Add +91 and 10 digits in text, not only in a header image.");
    if (foundSections.length < 4)
      issues.push("Missing common sections (Summary, Skills, Experience, Education, Projects).");
    if (wordCount < 180) issues.push("Resume looks too short. Add measurable bullets and tools from the job description.");
    if (wordCount > 1200)
      issues.push("Resume may be too long for a fresher/mid-level ATS pass — aim for 1–2 pages.");
    if (hasTablesHint)
      issues.push("Complex tables or tab layouts can break ATS parsing. Prefer simple headings and bullets.");
    if (missing.length > 8)
      issues.push("Many job keywords are missing. Mirror the job’s tools and skills in your Skills section.");

    const tips = [
      "Put skills as a comma-separated list in plain text.",
      "Repeat the exact job-title phrasing if it is true (e.g. Software Engineer, QA Engineer).",
      "Use PDF text (not a scanned image) when you apply.",
      "Keep dates, company names, and role titles on the same lines as text — not in text boxes."
    ];

    let score = Math.round(coverage * 70 + foundSections.length * 4);
    if (hasEmail) score += 6;
    if (hasPhone) score += 6;
    if (wordCount >= 220 && wordCount <= 900) score += 8;
    score = Math.max(18, Math.min(96, score));

    let label = "Needs work";
    if (score >= 80) label = "Strong";
    else if (score >= 60) label = "Good";
    else if (score >= 40) label = "Fair";

    return { score, label, missing, issues, tips, coverage, foundSections };
  }

  function ringColor(score) {
    if (score >= 80) return "#16a34a";
    if (score >= 60) return "#ea580c";
    return "#dc2626";
  }

  function renderReport(report) {
    empty.hidden = true;
    result.hidden = false;
    const deg = Math.round((report.score / 100) * 360);
    result.innerHTML = `
      <div class="ats-score-row">
        <div class="ats-ring" style="background: conic-gradient(${ringColor(report.score)} ${deg}deg, #e2e8f0 0deg)">
          <div>
            <strong style="color:${ringColor(report.score)}">${report.score}</strong>
            <small>${escapeHtml(report.label)}</small>
          </div>
        </div>
        <div>
          <h2>ATS compatibility score</h2>
          <p>Keyword coverage ${Math.round(report.coverage * 100)}% · sections found: ${escapeHtml(
            report.foundSections.join(", ") || "none"
          )}.</p>
          <p>This is a local estimate for Kerala IT applications. Always verify with the employer’s own form.</p>
        </div>
      </div>
      <div class="ats-lists">
        <div>
          <h3>Missing keywords</h3>
          <div>${
            report.missing.length
              ? report.missing.map((k) => `<span class="ats-chip">${escapeHtml(k)}</span>`).join("")
              : "No major keyword gaps detected."
          }</div>
        </div>
        <div>
          <h3>Formatting issues</h3>
          <ul>${(report.issues.length ? report.issues : ["No obvious formatting blockers detected."])
            .map((i) => `<li>${escapeHtml(i)}</li>`)
            .join("")}</ul>
        </div>
        <div>
          <h3>Resume improvement tips</h3>
          <ul>${report.tips.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
        </div>
      </div>
    `;
  }

  async function handleFile(file) {
    try {
      fileHint.textContent = "Reading resume…";
      checkBtn.disabled = true;
      resumeText = await readFile(file);
      if (!String(resumeText || "").trim()) {
        throw new Error("Could not extract text. Paste resume text below, or try another PDF/DOCX.");
      }
      drop.classList.add("is-ready");
      fileHint.textContent = file.name;
      if (pasteResume) pasteResume.value = resumeText.slice(0, 20000);
      syncEnabled();
    } catch (err) {
      resumeText = "";
      drop.classList.remove("is-ready");
      fileHint.textContent = err.message || "Could not read file";
      const pasteDetails = document.querySelector(".ats-paste-details");
      if (pasteDetails) pasteDetails.open = true;
      syncEnabled();
    }
  }

  function openPicker() {
    fileInput.click();
  }

  drop.addEventListener("click", openPicker);
  drop.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openPicker();
    }
  });
  drop.addEventListener("dragover", (e) => {
    e.preventDefault();
    drop.classList.add("is-drag");
  });
  drop.addEventListener("dragleave", () => drop.classList.remove("is-drag"));
  drop.addEventListener("drop", (e) => {
    e.preventDefault();
    drop.classList.remove("is-drag");
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) handleFile(file);
  });
  fileInput.addEventListener("change", () => {
    if (fileInput.files && fileInput.files[0]) handleFile(fileInput.files[0]);
  });
  jdInput.addEventListener("input", syncEnabled);
  if (pasteResume) {
    pasteResume.addEventListener("input", () => {
      resumeText = pasteResume.value;
      if (resumeText.trim().length > 40) drop.classList.add("is-ready");
      syncEnabled();
    });
  }

  checkBtn.addEventListener("click", () => {
    if (checkBtn.disabled) return;
    const report = scoreResume(resumeText, jdInput.value);
    renderReport(report);
    syncEnabled();
    if (resultPanel) {
      resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  try {
    const storedJd = sessionStorage.getItem("ipd-ats-jd");
    const storedTitle = sessionStorage.getItem("ipd-ats-title");
    if (storedJd) {
      jdInput.value = storedJd;
      sessionStorage.removeItem("ipd-ats-jd");
      if (storedTitle) {
        jdInput.setAttribute("aria-label", `Job description for ${storedTitle}`);
        sessionStorage.removeItem("ipd-ats-title");
      }
    }
  } catch (_e) {
    /* ignore */
  }

  syncEnabled();
})();
