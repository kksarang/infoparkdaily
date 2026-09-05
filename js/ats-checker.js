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
  const resumeError = document.getElementById("ats-resume-error");
  const jdError = document.getElementById("ats-jd-error");
  const resumeBlock = document.getElementById("ats-resume-block");
  const jdBlock = document.getElementById("ats-jd-block");

  if (!checkBtn || !drop || !fileInput || !jdInput) return;

  const MIN_RESUME = 80;
  const MIN_JD = 80;

  const GENERIC = new Set(
    (
      "a an the and or of to for in on with from by at as is are was were be been being this that those these you your we our they their it its i me my about into over after before than then also can will just not no yes if but so such any all more most other some only own same too very using use used " +
      "must should shall may might need needs needed able well etc per via has had have having do does did doing get got given give " +
      "required requirement requirements preferred preference experience experienced year years yrs role roles job jobs position opening openings " +
      "candidate candidates company companies team teams work working worker workers ability skill skills knowledge good strong excellent solid " +
      "including across within please apply applying application resume cv email phone contact details description descriptions responsibility responsibilities " +
      "qualification qualifications degree graduate fresher intern internship looking join joining opportunity career updated share kindly aligns through " +
      "official listing portal infopark technopark cyberpark kerala kochi trivandrum thiruvananthapuram calicut kozhikode location deadline posted hiring " +
      "employment type fulltime full-time onsite on-site hybrid remote process interview selection shortlisted register google form forms " +
      "who what when where which how why their there here those these both each few many much like unlike plus minus " +
      "minimum maximum min max atleast at-least around about approx approximately " +
      "duty duties day days month months week weeks time times based basis relevant related relatedly " +
      "communicate communication communications written verbal interpersonal " +
      "environment environment environments fast-paced paced " +
      "notice period immediately asap willing commit committed " +
      "india indian malayalam english language languages " +
      "salary ctc lpa lakhs lakh package " +
      "new old current currently previously previous prior " +
      "one two three four five six seven eight nine ten"
    ).split(/\s+/)
  );

  const PHRASES = [
    "full stack",
    "front end",
    "back end",
    "react native",
    "react js",
    "node js",
    "express js",
    "rest api",
    "restful api",
    "spring boot",
    "dot net",
    "asp net",
    "ci cd",
    "unit testing",
    "manual testing",
    "automation testing",
    "quality assurance",
    "business analyst",
    "data analyst",
    "machine learning",
    "power bi",
    "sql server",
    "google cloud",
    "aws cloud",
    "azure cloud",
    "software engineer",
    "software developer",
    "web developer",
    "mobile developer",
    "android developer",
    "ios developer",
    "talent acquisition",
    "digital marketing",
    "lead generation",
    "cold calling",
    "embedded systems",
    "pcb design",
    "object oriented",
    "version control",
    "user stories",
    "micro services",
    "next js",
    "vue js"
  ];

  const SKILL_HINTS = new Set([
    "java",
    "python",
    "javascript",
    "typescript",
    "react",
    "angular",
    "vue",
    "nodejs",
    "node",
    "express",
    "django",
    "flask",
    "spring",
    "hibernate",
    "sql",
    "mysql",
    "postgresql",
    "postgres",
    "mongodb",
    "oracle",
    "redis",
    "aws",
    "azure",
    "gcp",
    "docker",
    "kubernetes",
    "linux",
    "git",
    "github",
    "gitlab",
    "html",
    "css",
    "php",
    "laravel",
    "dotnet",
    "csharp",
    "cplusplus",
    "android",
    "kotlin",
    "swift",
    "flutter",
    "dart",
    "ios",
    "selenium",
    "cypress",
    "playwright",
    "jira",
    "figma",
    "photoshop",
    "salesforce",
    "sap",
    "tally",
    "excel",
    "powerbi",
    "tableau",
    "hadoop",
    "spark",
    "kafka",
    "graphql",
    "rest",
    "api",
    "qa",
    "testing",
    "scrum",
    "agile",
    "recruitment",
    "payroll",
    "gst",
    "accounting",
    "embedded",
    "vlsi",
    "matlab",
    "autocad",
    "wordpress",
    "shopify",
    "seo",
    "sem",
    "crm",
    "bootstrap",
    "jquery",
    "redux",
    "nextjs",
    "nestjs",
    "fastapi",
    "terraform",
    "jenkins",
    "ansible",
    "postman",
    "manual",
    "automation",
    "devops",
    "uiux",
    "ux",
    "ui"
  ]);

  let resumeText = "";
  let readingFile = false;

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/c\+\+/g, " cplusplus ")
      .replace(/c#/g, " csharp ")
      .replace(/\.net/g, " dotnet ")
      .replace(/node\.js/g, " nodejs ")
      .replace(/next\.js/g, " nextjs ")
      .replace(/vue\.js/g, " vuejs ")
      .replace(/asp\.net/g, " aspnet ")
      .replace(/ci\/cd/g, " ci cd ")
      .replace(/power\s*bi/g, " powerbi ")
      .replace(/[^a-z0-9+#.\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function displayName(token) {
    const map = {
      cplusplus: "C++",
      csharp: "C#",
      dotnet: ".NET",
      nodejs: "Node.js",
      nextjs: "Next.js",
      vuejs: "Vue.js",
      aspnet: "ASP.NET",
      powerbi: "Power BI",
      postgresql: "PostgreSQL",
      mongodb: "MongoDB",
      javascript: "JavaScript",
      typescript: "TypeScript"
    };
    if (map[token]) return map[token];
    return token.replace(/-/g, " ");
  }

  function rawTokens(text) {
    return normalize(text)
      .split(/\s+/)
      .map((w) => w.replace(/^[-.]+|[-.]+$/g, ""))
      .filter((w) => w.length > 1 && !/^\d+$/.test(w));
  }

  function looksLikeSkill(word) {
    if (!word || GENERIC.has(word)) return false;
    if (SKILL_HINTS.has(word)) return true;
    if (/[+#.]/.test(word)) return true;
    if (/\d/.test(word) && /[a-z]/.test(word)) return true;
    if (word.length >= 4) return true;
    return false;
  }

  function extractKeywords(text) {
    const norm = normalize(text);
    const toks = rawTokens(text);
    const found = [];

    PHRASES.forEach((phrase) => {
      if (norm.includes(phrase)) found.push(phrase);
    });

    for (let i = 0; i < toks.length - 1; i += 1) {
      const a = toks[i];
      const b = toks[i + 1];
      if (GENERIC.has(a) || GENERIC.has(b) || a.length < 3 || b.length < 3) continue;
      if (SKILL_HINTS.has(a) || SKILL_HINTS.has(b)) found.push(`${a} ${b}`);
    }

    toks.forEach((w) => {
      if (looksLikeSkill(w)) found.push(w);
    });

    const unique = [];
    const seen = new Set();
    found.forEach((item) => {
      const key = item.trim();
      if (!key || seen.has(key)) return;
      seen.add(key);
      unique.push(key);
    });

    unique.sort((a, b) => {
      const aHint = SKILL_HINTS.has(a) || PHRASES.includes(a) ? 1 : 0;
      const bHint = SKILL_HINTS.has(b) || PHRASES.includes(b) ? 1 : 0;
      if (bHint !== aHint) return bHint - aHint;
      if (b.includes(" ") !== a.includes(" ")) return Number(b.includes(" ")) - Number(a.includes(" "));
      return b.length - a.length;
    });

    return unique.slice(0, 40);
  }

  function resumeHasKeyword(resumeNorm, resumeTokSet, keyword) {
    if (keyword.includes(" ")) return resumeNorm.includes(keyword);
    if (resumeTokSet.has(keyword)) return true;
    if (keyword.endsWith("s") && resumeTokSet.has(keyword.slice(0, -1))) return true;
    return false;
  }

  function setFieldError(el, block, message) {
    if (el) {
      el.hidden = !message;
      el.textContent = message || "";
    }
    if (block) block.classList.toggle("is-error", Boolean(message));
  }

  function currentResume() {
    const pasted = String(pasteResume && pasteResume.value ? pasteResume.value : "").trim();
    const uploaded = String(resumeText || "").trim();
    return pasted.length >= uploaded.length ? pasted : uploaded;
  }

  function syncEnabled() {
    const resumeReady = currentResume().length >= MIN_RESUME;
    const jdReady = String(jdInput.value || "").trim().length >= MIN_JD;
    checkBtn.disabled = readingFile;

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

  function validateRequired() {
    const resume = currentResume();
    const jd = String(jdInput.value || "").trim();
    let resumeMsg = "";
    let jdMsg = "";

    if (!resume) resumeMsg = "Resume is required. Upload a PDF, DOCX or TXT, or paste the text.";
    else if (resume.length < MIN_RESUME) {
      resumeMsg = "Resume is too short to score. Add more text or try another file.";
    }

    if (!jd) jdMsg = "Job description is required. Paste the full JD you are targeting.";
    else if (jd.length < MIN_JD) {
      jdMsg = "Paste a fuller job description so keyword matching can work.";
    }

    setFieldError(resumeError, resumeBlock, resumeMsg);
    setFieldError(jdError, jdBlock, jdMsg);
    if (drop) drop.setAttribute("aria-invalid", resumeMsg ? "true" : "false");
    jdInput.setAttribute("aria-invalid", jdMsg ? "true" : "false");
    if (pasteResume) pasteResume.setAttribute("aria-invalid", resumeMsg ? "true" : "false");

    if (resumeMsg && pasteResume && !currentResume()) {
      const pasteDetails = document.querySelector(".ats-paste-details");
      if (pasteDetails) pasteDetails.open = true;
    }

    return { ok: !resumeMsg && !jdMsg, resumeMsg, jdMsg };
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
    const resumeNorm = normalize(resume);
    const resumeTokSet = new Set(rawTokens(resume));
    const jdKeywords = extractKeywords(jd);
    const matched = jdKeywords.filter((k) => resumeHasKeyword(resumeNorm, resumeTokSet, k));
    const missing = jdKeywords.filter((k) => !resumeHasKeyword(resumeNorm, resumeTokSet, k));
    const coverage = jdKeywords.length ? matched.length / jdKeywords.length : 0;

    const lower = resume.toLowerCase();
    const sections = ["experience", "education", "skills", "project", "summary", "contact"];
    const foundSections = sections.filter((s) => lower.includes(s));
    const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(resume);
    const hasPhone = /(\+91[\s-]?)?[6-9]\d{9}/.test(resume.replace(/\s/g, ""));
    const wordCount = resume.trim().split(/\s+/).filter(Boolean).length;
    const hasTablesHint = lower.includes("<table") || (resume.match(/\t/g) || []).length > 12;

    const issues = [];
    if (!hasEmail) issues.push("No email address detected — ATS systems look for contact details as plain text.");
    if (!hasPhone) {
      issues.push("No Indian mobile number detected. Add +91 and 10 digits in text, not only in a header image.");
    }
    if (foundSections.length < 4) {
      issues.push("Missing common sections (Summary, Skills, Experience, Education, Projects).");
    }
    if (wordCount < 180) {
      issues.push("Resume looks too short. Add measurable bullets and tools from the job description.");
    }
    if (wordCount > 1200) {
      issues.push("Resume may be too long for a fresher/mid-level ATS pass — aim for 1–2 pages.");
    }
    if (hasTablesHint) {
      issues.push("Complex tables or tab layouts can break ATS parsing. Prefer simple headings and bullets.");
    }
    if (missing.length > 6) {
      issues.push("Many job keywords are missing. Mirror the job’s tools and skills in your Skills section.");
    }

    const tips = [
      "Put skills as a comma-separated list in plain text.",
      "Repeat the exact job-title phrasing if it is true (e.g. Software Engineer, QA Engineer).",
      "Use a text PDF (not a scanned image) when you apply.",
      "Keep dates, company names, and role titles as text — not in text boxes or logos."
    ];

    let score = Math.round(coverage * 55 + foundSections.length * 4);
    if (hasEmail) score += 8;
    if (hasPhone) score += 7;
    if (wordCount >= 220 && wordCount <= 900) score += 8;
    if (matched.length >= 6) score += 5;
    if (!hasTablesHint) score += 4;
    score = Math.max(12, Math.min(96, score));

    let label = "Needs work";
    let tone = "weak";
    if (score >= 80) {
      label = "Strong";
      tone = "strong";
    } else if (score >= 60) {
      label = "Good";
      tone = "good";
    } else if (score >= 40) {
      label = "Fair";
      tone = "fair";
    }

    const comments = buildComments({
      score,
      label,
      coverage,
      matched,
      missing,
      hasEmail,
      hasPhone,
      foundSections,
      wordCount,
      hasTablesHint
    });

    return {
      score,
      label,
      tone,
      missing: missing.slice(0, 12).map(displayName),
      matched: matched.slice(0, 12).map(displayName),
      issues,
      tips,
      coverage,
      foundSections,
      comments
    };
  }

  function buildComments(r) {
    let overall = "";
    if (r.score >= 80) {
      overall =
        "Strong match. Your resume already shares most of this job’s tool names. Keep those exact spellings in Skills and in 2–3 recent bullets before you apply.";
    } else if (r.score >= 60) {
      overall =
        "Good match, but an ATS may still skip you if required tools are missing. Add the missing keywords below — only if they are true for you.";
    } else if (r.score >= 40) {
      overall =
        "Fair match. Keyword overlap is thin. Tailor the Skills line and recent experience to this JD before you apply.";
    } else {
      overall =
        "Weak match for this JD. Too few of the job’s tools appear in your resume. Rewrite Skills and bullets against this description before you apply.";
    }

    const notes = [];
    if (r.matched.length) {
      notes.push(
        `Already present: ${r.matched.slice(0, 6).map(displayName).join(", ")}. Keep these spellings.`
      );
    }
    if (r.missing.length) {
      notes.push(
        `Not found in your resume: ${r.missing.slice(0, 6).map(displayName).join(", ")}. Add them in Skills or bullets only if you actually used them.`
      );
    }
    if (!r.hasEmail) {
      notes.push("Add a plain-text email. ATS often cannot read contact details inside a header image.");
    }
    if (!r.hasPhone) {
      notes.push("Add a +91 mobile number as text so parsers can find it.");
    }
    if (r.foundSections.length < 4) {
      notes.push(
        "Use clear headings: Summary, Skills, Experience, Education, Projects. Many Kerala IT ATS forms look for those words."
      );
    }
    if (r.wordCount < 180) {
      notes.push("The resume is short. Add measurable bullets (tools, scope, outcome) instead of one-line duties.");
    }
    if (r.wordCount > 1200) {
      notes.push("Trim to 1–2 pages. Long resumes get cut off in many ATS parsers.");
    }
    if (r.hasTablesHint) {
      notes.push("Avoid tables, text boxes, and multi-column layouts. Use simple headings and bullets.");
    }
    if (r.coverage < 0.35 && r.missing.length) {
      notes.push("Mirror the job title and required tools near the top — ATS scores the first screen heavily.");
    }

    return { overall, notes };
  }

  function ringColor(score) {
    if (score >= 80) return "#16a34a";
    if (score >= 60) return "#2563eb";
    if (score >= 40) return "#d97706";
    return "#dc2626";
  }

  function chips(list, kind) {
    if (!list.length) return `<p class="ats-chip-empty">${kind === "ok" ? "No overlapping skills detected yet." : "No major keyword gaps detected."}</p>`;
    return list.map((k) => `<span class="ats-chip${kind === "ok" ? " ats-chip--ok" : ""}">${escapeHtml(k)}</span>`).join("");
  }

  function renderReport(report) {
    empty.hidden = true;
    result.hidden = false;
    const deg = Math.round((report.score / 100) * 360);
    const color = ringColor(report.score);
    const notes = report.comments.notes.length
      ? `<ul class="ats-comments">${report.comments.notes.map((n) => `<li>${escapeHtml(n)}</li>`).join("")}</ul>`
      : "";
    result.innerHTML = `
      <div class="ats-score-row">
        <div class="ats-ring" style="background: conic-gradient(${color} ${deg}deg, var(--ats-track, #e2e8f0) 0deg)">
          <div>
            <strong style="color:${color}">${report.score}</strong>
            <small>${escapeHtml(report.label)}</small>
          </div>
        </div>
        <div>
          <h2>ATS compatibility score</h2>
          <p>Keyword coverage ${Math.round(report.coverage * 100)}% · sections found: ${escapeHtml(
            report.foundSections.join(", ") || "none"
          )}.</p>
          <p>Local estimate for Kerala IT applications — not the employer’s official ATS.</p>
        </div>
      </div>
      <aside class="ats-comment ats-comment--${escapeHtml(report.tone)}">
        <p class="ats-comment-kicker">Overall comment</p>
        <p>${escapeHtml(report.comments.overall)}</p>
        ${notes}
      </aside>
      <div class="ats-lists">
        <div>
          <h3>Matched keywords</h3>
          <div>${chips(report.matched, "ok")}</div>
        </div>
        <div>
          <h3>Missing keywords</h3>
          <div>${chips(report.missing, "gap")}</div>
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
      <a class="ats-jobs-link" href="/jobs/">Browse open jobs →</a>
    `;
  }

  async function handleFile(file) {
    try {
      readingFile = true;
      fileHint.textContent = "Reading resume…";
      checkBtn.disabled = true;
      resumeText = await readFile(file);
      if (!String(resumeText || "").trim()) {
        throw new Error("Could not extract text. Paste resume text below, or try another PDF/DOCX.");
      }
      drop.classList.add("is-ready");
      fileHint.textContent = file.name;
      if (pasteResume) pasteResume.value = resumeText.slice(0, 20000);
      setFieldError(resumeError, resumeBlock, "");
      drop.setAttribute("aria-invalid", "false");
    } catch (err) {
      resumeText = "";
      drop.classList.remove("is-ready");
      fileHint.textContent = err.message || "Could not read file";
      setFieldError(resumeError, resumeBlock, err.message || "Could not read file");
      const pasteDetails = document.querySelector(".ats-paste-details");
      if (pasteDetails) pasteDetails.open = true;
    } finally {
      readingFile = false;
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
  jdInput.addEventListener("input", () => {
    if (String(jdInput.value || "").trim().length >= MIN_JD) {
      setFieldError(jdError, jdBlock, "");
      jdInput.setAttribute("aria-invalid", "false");
    }
    syncEnabled();
  });
  if (pasteResume) {
    pasteResume.addEventListener("input", () => {
      resumeText = pasteResume.value;
      if (currentResume().length >= MIN_RESUME) {
        drop.classList.add("is-ready");
        setFieldError(resumeError, resumeBlock, "");
        drop.setAttribute("aria-invalid", "false");
      }
      syncEnabled();
    });
  }

  checkBtn.addEventListener("click", () => {
    if (checkBtn.disabled) return;
    const check = validateRequired();
    if (!check.ok) {
      const target = check.resumeMsg ? resumeBlock || drop : jdBlock || jdInput;
      if (target && typeof target.scrollIntoView === "function") {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    const report = scoreResume(currentResume(), jdInput.value);
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
