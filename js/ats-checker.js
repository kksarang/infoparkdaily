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

  function hasJobDescription(text) {
    const jd = String(text || "").trim();
    if (jd.length < MIN_JD) return false;
    if (
      jd.length < 280 &&
      /ats\s*friendly|check.{0,60}resume|is (this|the|my) resume|resume is ats/i.test(jd)
    ) {
      return false;
    }
    const hits = (jd.match(
      /experience|responsib|qualif|requirement|skill|opening|vacanc|role|position|years|looking for|must have|job description/gi
    ) || []).length;
    return hits >= 2 || jd.length >= 280;
  }

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
    "vue js",
    "customer service",
    "conflict resolution",
    "escalation management",
    "performance metrics",
    "data entry",
    "client retention",
    "technical support",
    "process improvement",
    "cross functional"
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

  function resumeLines(resume) {
    return String(resume || "")
      .split(/\n+/)
      .map((line) => line.replace(/^[\s•\-–—*·]+/, "").trim())
      .filter((line) => line.length >= 18 && line.length <= 280);
  }

  function guessEducation(resume) {
    const m = String(resume || "").match(
      /\b(b\.?\s*tech|b\.?\s*e\.?|b\.?\s*com|bcom|mba|mca|bca|m\.?\s*tech|bsc|msc|ba|ma)(?:\s+(?:in|of)\s+([a-z][a-z\s]{2,32}))?/i
    );
    if (!m) return "";
    return m[0].replace(/\s+/g, " ").trim();
  }

  function guessTenure(resume) {
    const months = String(resume || "").match(/(\d+)\s*(?:\+|plus)?\s*months?/i);
    const years = String(resume || "").match(/(\d+(?:\.\d)?)\s*(?:\+|plus)?\s*years?/i);
    if (months) return `${months[1]} months of experience`;
    if (years) return `${years[1]} years of experience`;
    return "";
  }

  function profileBadge(resume, matched) {
    const blob = `${resume} ${matched.join(" ")}`.toLowerCase();
    const finance = /finance|accounting|tally|gst|b\.?\s*com|bcom/.test(blob);
    const support = /customer|crm|support|inbound|outbound|service/.test(blob);
    const qa = /selenium|playwright|cypress|testing|qa\b/.test(blob);
    const dev = /java|python|javascript|react|node|angular|\.net|full stack/.test(blob);
    if (support && finance) return "Entry-level candidate with potential for finance-integrated support roles.";
    if (qa) return "QA-focused profile — emphasise tools, coverage, and defect metrics.";
    if (dev) return "Engineering profile — match exact stack names from the job description.";
    if (support) return "Customer support profile — add KPIs and process keywords from the JD.";
    if (finance) return "Finance background — map accounting tools to the job’s required skills.";
    return "Tailor this resume to the job’s required tools and outcomes.";
  }

  function rankingIssues(resume, hasEmail, hasPhone, foundSections, hasTablesHint, wordCount) {
    const issues = [];
    const personalHit = resume.match(
      /father'?s?\s*name|date of birth|\bdob\b|personal details|permanent address|religion|caste|marital status|nationality|passport size/i
    );
    if (personalHit) {
      issues.push({
        title: "Use of personal details",
        severity: "Low",
        why: "Personal info like Father’s Name, Date of Birth, or address can trigger bias or ATS parsing errors.",
        evidence: `Personal-details text includes “${personalHit[0]}”.`
      });
    }
    if (!hasEmail) {
      issues.push({
        title: "Missing email in plain text",
        severity: "High",
        why: "ATS systems look for an email as selectable text, not inside a header image.",
        evidence: "No email address was detected in the extracted resume text."
      });
    }
    if (!hasPhone) {
      issues.push({
        title: "Missing phone number",
        severity: "Medium",
        why: "Recruiters and parsers expect a mobile number in the contact line.",
        evidence: "No Indian mobile number (+91 / 10 digits) was detected as text."
      });
    }
    if (foundSections.length < 4) {
      issues.push({
        title: "Incomplete standard sections",
        severity: "Medium",
        why: "Many ATS templates look for Summary, Skills, Experience, Education, and Projects.",
        evidence: `Detected headings: ${foundSections.join(", ") || "none"}.`
      });
    }
    if (hasTablesHint) {
      issues.push({
        title: "Complex layout",
        severity: "Medium",
        why: "Tables and tab columns often scramble parsing order.",
        evidence: "Table or heavy tab characters were detected in the file text."
      });
    }
    if (wordCount < 180) {
      issues.push({
        title: "Resume too short",
        severity: "Medium",
        why: "Thin resumes score poorly on keyword coverage and impact.",
        evidence: `About ${wordCount} words extracted.`
      });
    }
    return issues;
  }

  function weakPhrasingItems(lines, missing) {
    const weak = /^(handled|responsible for|worked on|helped with|assisted in|performed|did|was involved in|looked after)\b/i;
    const items = [];
    const insert = missing.slice(0, 2).map(displayName);
    lines.forEach((line) => {
      if (items.length >= 3) return;
      if (!weak.test(line) || /\d/.test(line)) return;
      let rewrite = line.replace(weak, "Delivered");
      if (insert.length) {
        rewrite = rewrite.replace(/\.$/, "");
        rewrite += `, using ${insert.join(" and ")} to meet process KPIs.`;
      } else if (!/consistently|volume|quality|sla/i.test(rewrite)) {
        rewrite = rewrite.replace(/\.$/, "") + ", consistently meeting response-time KPIs.";
      }
      items.push({
        original: line,
        issue: "Passive / duty language",
        fix: "Focus on the outcome of the interactions.",
        rewrite,
        tags: insert.length ? insert : ["KPIs"]
      });
    });
    return items;
  }

  function sectionRecommendations(foundSections) {
    const recs = [];
    const have = new Set(foundSections);
    if (!have.has("summary")) recs.push("Add a 3-line professional summary at the top with the job title and 4–6 exact tools.");
    if (!have.has("skills")) recs.push("Group skills into categories such as Technical proficiency, Software, and Soft skills.");
    if (!have.has("experience")) recs.push("Use an Experience heading with company, role, dates, and 3–5 outcome bullets.");
    if (!have.has("education")) recs.push("Keep Education as plain text (degree, college, year) — not inside a sidebar graphic.");
    if (!have.has("project")) recs.push("Add a Projects section if you are a fresher — list tools used, not only the project name.");
    if (!recs.length) recs.push("Keep headings as plain text. Avoid putting Skills only inside icons or a two-column table.");
    return recs.slice(0, 4);
  }

  function jobFitItems(resume, matched, missing) {
    const blob = resume.toLowerCase();
    const strengths = [];
    const gaps = [];
    if (matched.some((k) => /crm|salesforce/.test(k)) || /\bcrm\b/.test(blob)) strengths.push("Relevant CRM experience");
    if (/finance|b\.?\s*com|accounting|tally/.test(blob)) strengths.push("Educational background in Finance");
    if (/sap|tally/.test(blob) || matched.some((k) => /sap|tally/.test(k))) {
      strengths.push("Technical certifications or tools (SAP, Tally, or similar)");
    }
    if (matched.some((k) => /customer|support|communication/.test(k))) {
      strengths.push("Customer service / communication keywords present");
    }
    if (matched.length >= 5) strengths.push("Core JD skills already appear in the resume");
    if (!strengths.length) strengths.push("Some overlapping terms with this job description");

    if (!/\d+%|\d+\+|kpi|sla|volume|reduced|increased|handled \d+/i.test(resume)) {
      gaps.push("Quantified achievements");
    }
    if (missing.some((k) => /kpi|metric|escalat|conflict|accuracy/.test(k))) {
      gaps.push("Process, KPI, or quality language from the JD");
    }
    if (missing.filter((k) => SKILL_HINTS.has(k) || k.includes(" ")).length >= 3) {
      gaps.push("Specific software / platform names beyond general tools");
    }
    if (!/\bsummary\b|\bprofile\b|\bobjective\b/i.test(resume)) {
      gaps.push("In-depth professional summary");
    }
    if (!gaps.length) gaps.push("Deeper mirroring of the job’s required tools");
    return { strengths: strengths.slice(0, 4), gaps: gaps.slice(0, 4) };
  }

  function optimizedSummary(resume, matched, missing) {
    const edu = guessEducation(resume);
    const tenure = guessTenure(resume);
    const tools = [...matched.slice(0, 3), ...missing.slice(0, 2)].map(displayName);
    const uniqueTools = [];
    tools.forEach((t) => {
      if (t && !uniqueTools.includes(t)) uniqueTools.push(t);
    });
    const toolBit = uniqueTools.slice(0, 4).join(", ");
    const who = edu ? `professional with ${edu}` : "professional";
    const exp = tenure ? ` and ${tenure}` : "";
    return `Customer-focused ${who}${exp}. Adept at using ${
      toolBit || "the tools listed in this job"
    } to improve service quality, streamline support, and ensure long-term customer satisfaction.`;
  }

  function recruiterNotes(ranking, fit, missing) {
    const notes = [];
    if (fit.strengths[0]) notes.push(`${fit.strengths[0]} is a useful selling point — keep it near the top.`);
    if (ranking.some((i) => /personal/i.test(i.title))) {
      notes.push("Remove personal declarations and static headers to free space for impact statements.");
    }
    if (missing.length) {
      notes.push(
        `If true, add these JD terms in Skills or bullets: ${missing.slice(0, 5).map(displayName).join(", ")}.`
      );
    }
    notes.push("Use a text PDF. Scanned or image-only resumes often score near zero in ATS.");
    return notes.slice(0, 4);
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
    const jdReady = hasJobDescription(jdInput.value);
    checkBtn.disabled = readingFile || !resumeReady;

    if (step1Status) {
      step1Status.textContent = resumeReady ? "Ready" : "Waiting";
      step1Status.classList.toggle("is-ready", resumeReady);
    }
    if (step2Status) {
      step2Status.textContent = jdReady ? "Added" : "Waiting";
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
        if (resumeReady) el.classList.add("is-active");
        if (result && !result.hidden) {
          el.classList.remove("is-active");
          el.classList.add("is-done");
        }
      }
    });
  }

  function validateRequired() {
    const resume = currentResume();
    let resumeMsg = "";

    if (!resume) resumeMsg = "Resume is required. Upload a PDF, DOCX or TXT, or paste the text.";
    else if (resume.length < MIN_RESUME) {
      resumeMsg = "Resume is too short to score. Add more text or try another file.";
    }

    setFieldError(resumeError, resumeBlock, resumeMsg);
    setFieldError(jdError, jdBlock, "");
    if (drop) drop.setAttribute("aria-invalid", resumeMsg ? "true" : "false");
    jdInput.setAttribute("aria-invalid", "false");
    if (pasteResume) pasteResume.setAttribute("aria-invalid", resumeMsg ? "true" : "false");

    if (resumeMsg && pasteResume && !currentResume()) {
      const pasteDetails = document.querySelector(".ats-paste-details");
      if (pasteDetails) pasteDetails.open = true;
    }

    return { ok: !resumeMsg, resumeMsg, jdMsg: "" };
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
    const jdMode = hasJobDescription(jd);
    const resumeNorm = normalize(resume);
    const resumeTokSet = new Set(rawTokens(resume));
    const resumeSkills = extractKeywords(resume);
    const jdKeywords = jdMode ? extractKeywords(jd) : [];
    const matched = jdMode
      ? jdKeywords.filter((k) => resumeHasKeyword(resumeNorm, resumeTokSet, k))
      : resumeSkills;
    const missing = jdMode
      ? jdKeywords.filter((k) => !resumeHasKeyword(resumeNorm, resumeTokSet, k))
      : [];
    const coverage = jdKeywords.length ? matched.length / jdKeywords.length : 0;

    const lower = resume.toLowerCase();
    const sections = ["experience", "education", "skills", "project", "summary", "contact"];
    const foundSections = sections.filter((s) => lower.includes(s));
    const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(resume);
    const hasPhone = /(\+91[\s-]?)?[6-9]\d{9}/.test(resume.replace(/\s/g, ""));
    const wordCount = resume.trim().split(/\s+/).filter(Boolean).length;
    const hasTablesHint = lower.includes("<table") || (resume.match(/\t/g) || []).length > 12;
    const hasPersonal = /father'?s?\s*name|date of birth|\bdob\b|personal details|marital status|religion|caste/i.test(
      resume
    );
    const bulletCount = resumeLines(resume).length;

    const issues = [];
    if (!hasEmail) issues.push("No email address detected — ATS systems look for contact details as plain text.");
    if (!hasPhone) {
      issues.push("No Indian mobile number detected. Add +91 and 10 digits in text, not only in a header image.");
    }
    if (foundSections.length < 4) {
      issues.push("Missing common sections (Summary, Skills, Experience, Education, Projects).");
    }
    if (wordCount < 180) {
      issues.push("Resume looks too short. Add measurable bullets and tools.");
    }
    if (wordCount > 1200) {
      issues.push("Resume may be too long for a fresher/mid-level ATS pass — aim for 1–2 pages.");
    }
    if (hasTablesHint) {
      issues.push("Complex tables or tab layouts can break ATS parsing. Prefer simple headings and bullets.");
    }
    if (jdMode && missing.length > 6) {
      issues.push("Many job keywords are missing. Mirror the job’s tools and skills in your Skills section.");
    }
    if (hasPersonal) {
      issues.push("Personal details (DOB, father’s name, etc.) can confuse ATS and look outdated.");
    }

    const tips = [
      "Put skills as a comma-separated list in plain text.",
      "Use a text PDF (not a scanned image) when you apply.",
      "Keep dates, company names, and role titles as text — not in text boxes or logos.",
      "Use headings: Summary, Skills, Experience, Education."
    ];

    let score;
    if (jdMode) {
      score = Math.round(coverage * 55 + foundSections.length * 4);
      if (hasEmail) score += 8;
      if (hasPhone) score += 7;
      if (wordCount >= 220 && wordCount <= 900) score += 8;
      if (matched.length >= 6) score += 5;
      if (!hasTablesHint) score += 4;
    } else {
      score = foundSections.length * 9;
      if (hasEmail) score += 12;
      if (hasPhone) score += 10;
      if (wordCount >= 220 && wordCount <= 900) score += 10;
      if (!hasTablesHint) score += 8;
      if (!hasPersonal) score += 8;
      if (bulletCount >= 4) score += 6;
      if (resumeSkills.length >= 6) score += 6;
    }
    score = Math.max(12, Math.min(96, score));

    let label = "Needs work";
    let tone = "weak";
    if (score >= 80) {
      label = jdMode ? "Strong" : "ATS-friendly";
      tone = "strong";
    } else if (score >= 60) {
      label = jdMode ? "Good" : "Mostly ATS-friendly";
      tone = "good";
    } else if (score >= 40) {
      label = jdMode ? "Fair" : "Partly ATS-friendly";
      tone = "fair";
    } else {
      label = jdMode ? "Needs work" : "Not ATS-friendly yet";
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
      hasTablesHint,
      jdMode
    });

    const ranking = rankingIssues(resume, hasEmail, hasPhone, foundSections, hasTablesHint, wordCount);
    const phrasing = weakPhrasingItems(resumeLines(resume), missing);
    const fit = jobFitItems(resume, matched, missing);
    const summaryText = optimizedSummary(resume, matched, missing);
    const resumeGaps = [];
    if (!hasEmail) resumeGaps.push("Plain-text email");
    if (!hasPhone) resumeGaps.push("Phone number");
    if (foundSections.length < 4) resumeGaps.push("Standard headings");
    if (hasTablesHint) resumeGaps.push("Simple one-column layout");
    if (hasPersonal) resumeGaps.push("No personal-detail fields");
    if (!/\d+%|\d+\+|kpi|sla/i.test(resume)) resumeGaps.push("Measurable KPIs");
    const suggested = jdMode
      ? missing.slice(0, 8).map(displayName)
      : ["text PDF", "comma-separated Skills", "3–5 outcome bullets"];
    const topFixes = [];
    if (ranking[0]) topFixes.push({ title: ranking[0].title, why: ranking[0].why });
    if (phrasing[0]) topFixes.push({ title: "Rewrite weak bullets", why: phrasing[0].fix });
    if (jdMode && missing.length) {
      topFixes.push({
        title: "Add missing JD keywords",
        why: `Mirror ${missing.slice(0, 3).map(displayName).join(", ")} in Skills if they are true for you.`
      });
    } else if (!jdMode && foundSections.length < 4) {
      topFixes.push({
        title: "Use ATS headings",
        why: "Add Summary, Skills, Experience, and Education as plain text headings."
      });
    }

    return {
      score,
      label,
      tone,
      jdMode,
      missing: jdMode ? missing.slice(0, 12).map(displayName) : resumeGaps,
      matched: matched.slice(0, 12).map(displayName),
      suggested,
      issues,
      tips,
      coverage,
      foundSections,
      comments,
      ranking,
      phrasing,
      fit,
      summaryText,
      sections: sectionRecommendations(foundSections),
      recruiter: recruiterNotes(ranking, fit, missing),
      badge: jdMode
        ? profileBadge(resume, matched)
        : "ATS-friendliness check from the resume file — no job description needed.",
      topFixes: topFixes.slice(0, 3)
    };
  }

  function buildComments(r) {
    let overall = "";
    if (!r.jdMode) {
      if (r.score >= 80) {
        overall =
          "This resume looks ATS-friendly. Headings, contact text, and length are in a good range. Keep Skills as plain text and avoid tables.";
      } else if (r.score >= 60) {
        overall =
          "Mostly ATS-friendly, with a few parsing risks. Fix the ranking issues below so more Kerala IT ATS forms can read it.";
      } else if (r.score >= 40) {
        overall =
          "Partly ATS-friendly. An ATS may skip parts of this file. Use standard headings, a text PDF, and a clear Skills line.";
      } else {
        overall =
          "Not ATS-friendly yet. The file is hard for parsers (missing contact text, headings, or a simple layout). Apply the top fixes first.";
      }
    } else if (r.score >= 80) {
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
      notes.push("Make relevant experience and tools easy to find near the top; include only claims you can support.");
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
    if (!list.length) {
      return `<p class="ats-chip-empty">${
        kind === "ok" ? "No overlapping skills detected yet." : kind === "suggest" ? "No extra suggestions." : "No major keyword gaps detected."
      }</p>`;
    }
    const cls = kind === "ok" ? " ats-chip--ok" : kind === "suggest" ? " ats-chip--suggest" : " ats-chip--miss";
    return list.map((k) => `<span class="ats-chip${cls}">${escapeHtml(k)}</span>`).join("");
  }

  function renderReport(report) {
    if (empty) {
      empty.hidden = true;
      empty.setAttribute("hidden", "");
    }
    result.hidden = false;
    result.removeAttribute("hidden");
    const layout = document.querySelector(".ats-layout");
    if (layout) layout.classList.add("is-scored");
    document.body.classList.add("ats-has-report");
    const ranking = report.ranking || [];
    const phrasing = report.phrasing || [];
    const suggested = report.suggested || [];
    const recruiter = report.recruiter || [];
    const sections = report.sections || [];
    const topFixes = report.topFixes || [];
    const tone = report.score >= 80 ? "good" : report.score >= 60 ? "ok" : report.score >= 40 ? "fair" : "weak";

    const rankingHtml = ranking
      .map(
        (item) => `
        <li class="ats-report-issue">
          <div><strong>${escapeHtml(item.title)}</strong><span class="ats-sev ats-sev--${escapeHtml(String(item.severity || "Low").toLowerCase())}">${escapeHtml(item.severity || "Low")}</span></div>
          <p>${escapeHtml(item.why)}</p>
        </li>`
      )
      .join("");
    const phrasingHtml = phrasing
      .map(
        (item) => `
        <li class="ats-report-rewrite">
          <p class="ats-orig">${escapeHtml(item.original)}</p>
          <p class="ats-rewrite">${escapeHtml(item.rewrite || item.fix || "")}</p>
        </li>`
      )
      .join("");

    result.innerHTML = `
      <article class="ats-report ats-report--${tone}">
        <header class="ats-report-head">
          <div class="ats-report-score">
            <strong>${report.score}</strong>
            <span>${escapeHtml(report.label)}</span>
          </div>
          <div class="ats-report-verdict">
            ${report.badge ? `<p class="ats-badge">${escapeHtml(report.badge)}</p>` : ""}
            <h2>${escapeHtml(report.comments.overall)}</h2>
            <p>${
              report.jdMode
                ? `Keyword coverage ${Math.round(report.coverage * 100)}%. Local estimate — not the employer’s ATS.`
                : "File readability and structure. Local estimate — not an employer ATS."
            }</p>
          </div>
        </header>
        ${
          topFixes.length
            ? `<section class="ats-report-block">
                <h3>Fix these first</h3>
                <ol class="ats-report-fixes">${topFixes
                  .map(
                    (fix, i) =>
                      `<li><span>${i + 1}</span><div><strong>${escapeHtml(fix.title)}</strong><p>${escapeHtml(fitWhy(fix))}</p></div></li>`
                  )
                  .join("")}</ol>
              </section>`
            : ""
        }
        <section class="ats-report-block">
          <h3>${report.jdMode ? "Keywords" : "Skills found"}</h3>
          <p class="ats-sub">${report.jdMode ? "Matched" : "On the resume"}</p>
          <div class="ats-chip-row">${chips(report.matched, "ok")}</div>
          ${
            report.missing.length
              ? `<p class="ats-sub">${report.jdMode ? "Missing from the resume" : "Possible ATS gaps"}</p><div class="ats-chip-row">${chips(report.missing, "gap")}</div>`
              : ""
          }
          ${
            suggested.length
              ? `<p class="ats-sub">Optional extras</p><div class="ats-chip-row">${chips(suggested, "suggest")}</div>`
              : ""
          }
        </section>
        <section class="ats-report-block">
          <h3>${report.jdMode ? "Job fit" : "ATS fit"}</h3>
          <div class="ats-report-fit">
            <div>
              <p class="ats-sub">Strengths</p>
              <ul class="ats-fit ats-fit--ok">${(report.fit.strengths || []).map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
            </div>
            ${(report.fit.gaps || []).length
              ? `<div><p class="ats-sub">Gaps</p><ul class="ats-fit ats-fit--gap">${report.fit.gaps.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ul></div>`
              : ""}
          </div>
        </section>
        ${
          rankingHtml
            ? `<section class="ats-report-block">
                <h3>Structure issues <span class="ats-count">${ranking.length}</span></h3>
                <ul class="ats-report-list">${rankingHtml}</ul>
              </section>`
            : ""
        }
        ${
          phrasingHtml
            ? `<section class="ats-report-block">
                <h3>Clearer bullets</h3>
                <ul class="ats-report-list">${phrasingHtml}</ul>
              </section>`
            : ""
        }
        ${
          recruiter.length
            ? `<section class="ats-report-block">
                <h3>Recruiter notes</h3>
                <ul class="ats-notes">${recruiter.map((n) => `<li>${escapeHtml(n)}</li>`).join("")}</ul>
              </section>`
            : ""
        }
        ${
          report.summaryText
            ? `<section class="ats-report-block">
                <div class="ats-insight-head">
                  <h3>Suggested summary</h3>
                  <button type="button" class="ats-copy" data-ats-copy>Copy</button>
                </div>
                <p class="ats-summary-text" data-ats-summary>${escapeHtml(report.summaryText)}</p>
              </section>`
            : ""
        }
        ${
          sections.length
            ? `<section class="ats-report-block">
                <h3>Sections</h3>
                <ul class="ats-notes">${sections.map((n) => `<li>${escapeHtml(n)}</li>`).join("")}</ul>
              </section>`
            : ""
        }
        <p class="ats-report-foot"><a class="ats-jobs-link" href="/jobs/">Browse open jobs →</a></p>
      </article>
    `;

    const copyBtn = result.querySelector("[data-ats-copy]");
    const summaryEl = result.querySelector("[data-ats-summary]");
    if (copyBtn && summaryEl) {
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(summaryEl.textContent || "");
          copyBtn.textContent = "Copied";
          setTimeout(() => (copyBtn.textContent = "Copy"), 1600);
        } catch (_e) {
          copyBtn.textContent = "Copy failed";
        }
      });
    }
    if (resultPanel) resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function fitWhy(fix) {
    return fix.why || "";
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
    setFieldError(jdError, jdBlock, "");
    jdInput.setAttribute("aria-invalid", "false");
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
    if (result) {
      result.scrollIntoView({ behavior: "smooth", block: "start" });
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
