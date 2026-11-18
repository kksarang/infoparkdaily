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
  const checkHint = document.getElementById("ats-check-hint");

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
    "ui",
    "jest",
    "tailwind",
    "microservices",
    "vuejs"
  ]);

  /* Spellings of the same skill collapse to one canonical key, so "React", "React.js"
     and "react js" show once and match each other between resume and job post. */
  const ALIASES = {
    reactjs: "react",
    "react.js": "react",
    "react js": "react",
    node: "nodejs",
    "node js": "nodejs",
    vue: "vuejs",
    "vue js": "vuejs",
    "next js": "nextjs",
    "next.js": "nextjs",
    "express js": "express",
    expressjs: "express",
    "express.js": "express",
    "restful api": "rest api",
    "rest apis": "rest api",
    "restful apis": "rest api",
    "micro services": "microservices",
    "dot net": "dotnet",
    "asp net": "aspnet",
    postgres: "postgresql",
    "power bi": "powerbi",
    golang: "go"
  };

  /* Job titles are matched as JD keywords, but they are not skills. */
  const ROLE_PHRASES = new Set([
    "full stack",
    "front end",
    "back end",
    "business analyst",
    "data analyst",
    "software engineer",
    "software developer",
    "web developer",
    "mobile developer",
    "android developer",
    "ios developer"
  ]);

  /* Hint words that are too vague to show on their own as a "skill". */
  const VAGUE_SKILLS = new Set(["manual", "automation", "testing", "api", "rest", "embedded", "node"]);

  /* Nouns that turn a skill into a phrase, not a new skill ("react developer"). */
  const BIGRAM_NOISE = new Set(
    "developer developers engineer engineers framework frameworks based integration integrations services service development apps app application applications components component projects project dashboards dashboard migration panel backend frontend".split(
      " "
    )
  );

  const DISPLAY = {
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
    typescript: "TypeScript",
    react: "React",
    "react native": "React Native",
    "rest api": "REST API",
    api: "API",
    graphql: "GraphQL",
    sql: "SQL",
    mysql: "MySQL",
    "sql server": "SQL Server",
    html: "HTML",
    css: "CSS",
    aws: "AWS",
    "aws cloud": "AWS",
    gcp: "GCP",
    "google cloud": "Google Cloud",
    azure: "Azure",
    "azure cloud": "Azure",
    git: "Git",
    github: "GitHub",
    gitlab: "GitLab",
    php: "PHP",
    "ci cd": "CI/CD",
    "spring boot": "Spring Boot",
    qa: "QA",
    seo: "SEO",
    sem: "SEM",
    crm: "CRM",
    sap: "SAP",
    gst: "GST",
    ui: "UI",
    ux: "UX",
    uiux: "UI/UX",
    ios: "iOS",
    jquery: "jQuery",
    nestjs: "NestJS",
    fastapi: "FastAPI",
    devops: "DevOps",
    vlsi: "VLSI",
    matlab: "MATLAB",
    autocad: "AutoCAD",
    wordpress: "WordPress",
    "pcb design": "PCB design"
  };

  function canonical(key) {
    const k = String(key || "").trim();
    return ALIASES[k] || k;
  }

  function isSkillWord(word) {
    /* "+"/"#" only mark a skill when they follow letters (C++, C#), never "+91". */
    return SKILL_HINTS.has(word) || SKILL_HINTS.has(canonical(word)) || /^[a-z][a-z0-9]*[+#]+$/.test(word);
  }

  let resumeText = "";
  let readingFile = false;
  /** What the last uploaded file looked like ({ kind, pages, chars }); null for pasted text. */
  let lastExtract = null;

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
    const key = canonical(token);
    if (DISPLAY[key]) return DISPLAY[key];
    const text = key.replace(/-/g, " ");
    /* Known single-word tools get a capital ("Docker", "Python"); phrases get sentence case
       with any known acronym kept upper-case ("Unit testing", "SQL Server"). */
    if (!text.includes(" ")) {
      return SKILL_HINTS.has(text) ? text.charAt(0).toUpperCase() + text.slice(1) : text;
    }
    return text
      .split(" ")
      .map((w, i) => DISPLAY[w] || (i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
      .join(" ");
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
    if (/@|\.(?:com|in|org|net|io|co)$/.test(word)) return false; /* emails, domains */
    if (/^[a-z][a-z0-9]*[+#]+$/.test(word) || /^[a-z]+\.[a-z]+$/.test(word)) return true;
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

    /* Pairs never cross a line break or comma: "Summary / React developer" is not "summary react". */
    const pairs = [];
    String(text || "")
      .split(/[\n,;|•()/]+/)
      .forEach((chunk) => {
        const ct = rawTokens(chunk);
        for (let i = 0; i < ct.length - 1; i += 1) pairs.push([ct[i], ct[i + 1]]);
      });
    for (const [a, b] of pairs) {
      if (GENERIC.has(a) || GENERIC.has(b) || a.length < 3 || b.length < 3) continue;
      const pair = `${a} ${b}`;
      if (PHRASES.includes(pair) || ALIASES[pair]) continue; /* already counted as a phrase */
      /* Two skills side by side ("react javascript") are two skills, not a new one;
         a skill plus a plain noun ("react developer") is not a skill either. */
      if (isSkillWord(a) && isSkillWord(b)) continue;
      if (BIGRAM_NOISE.has(a) || BIGRAM_NOISE.has(b)) continue;
      /* "jest unit testing" is Jest + Unit testing, not "jest unit". */
      if (PHRASES.some((ph) => ph.startsWith(`${b} `) || ph.endsWith(` ${a}`))) continue;
      if (isSkillWord(a) || isSkillWord(b)) found.push(pair);
    }

    toks.forEach((w) => {
      if (looksLikeSkill(w)) found.push(w);
    });

    const unique = [];
    const seen = new Set();
    found.forEach((item) => {
      let key = canonical(item.trim());
      /* "rest" is only the REST API skill when "api" is also on the page. */
      if (key === "rest") key = norm.includes(" api") || norm.startsWith("api") ? "rest api" : "";
      if (!key || seen.has(key)) return;
      seen.add(key);
      unique.push(key);
    });
    /* Drop single words that only appear inside a phrase already listed ("api" in "REST API"). */
    const phrases = unique.filter((k) => PHRASES.includes(k));
    for (let i = unique.length - 1; i >= 0; i -= 1) {
      const k = unique[i];
      if (!k.includes(" ") && phrases.some((p) => p.split(" ").includes(k))) unique.splice(i, 1);
    }

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
    /* (?![a-z]) stops "ba" matching inside "backend" or "ma" inside "manual". */
    const m = String(resume || "").match(
      /\b(b\.?\s*tech|b\.?\s*e\.?|b\.?\s*com|bcom|mba|mca|bca|m\.?\s*tech|b\.?\s*sc|m\.?\s*sc|b\.?\s*a\.?|m\.?\s*a\.?)(?![a-z])(?:[ \t]+(?:in|of)[ \t]+([a-z][a-z \t]{2,32}))?/i
    );
    if (!m) return "";
    return m[0].replace(/\s+/g, " ").trim();
  }

  const ROLE_KINDS = [
    ["qa", /selenium|playwright|cypress|\bqa\b|test (?:cases|engineer|automation)|manual testing|automation testing/],
    ["dev", /\b(?:java|python|javascript|typescript|react|node(?:\.?js)?|angular|vue|\.net|php|laravel|django|flutter|kotlin|android|full stack|developer|software engineer)\b/],
    ["data", /\bdata analy|power ?bi|tableau|\bsql\b.*\bexcel\b|\bexcel\b.*\bsql\b|data science|machine learning/],
    ["design", /\bfigma\b|photoshop|illustrator|ui\/?ux|graphic design/],
    ["hr", /recruit|talent acquisition|payroll|onboarding|\bhr\b/],
    ["finance", /\baccount(?:s|ing|ant)\b|\btally\b|\bgst\b|\bfinance\b|\bb\.?\s*com\b|\bbcom\b/],
    ["sales", /lead generation|business development|\bsales\b|cold calling|telecall/],
    ["support", /customer (?:support|service|care)|\bcrm\b|inbound|outbound|helpdesk|help desk/]
  ];

  const ROLE_DEFAULT_TITLE = {
    qa: "QA engineer",
    dev: "Software developer",
    data: "Data analyst",
    design: "Designer",
    hr: "HR professional",
    finance: "Finance professional",
    sales: "Sales professional",
    support: "Customer support professional",
    general: "Professional"
  };

  const TITLE_CASE = { "ui/ux": "UI/UX", qa: "QA", ios: "iOS", react: "React", java: "Java", python: "Python", php: "PHP", devops: "DevOps", angular: "Angular", flutter: "Flutter", android: "Android" };

  /* Work out what kind of resume this is from its own text, so advice and the suggested
     summary fit a developer, a tester or a support executive rather than one generic voice. */
  function detectRole(resume) {
    const text = String(resume || "");
    const lower = text.toLowerCase();
    const kind = (ROLE_KINDS.find(([, re]) => re.test(lower)) || ["general"])[0];
    const head = text.split(/\n/).slice(0, 8).join("\n");
    const t = head.match(
      /\b((?:senior |junior |lead |associate )?(?:software|frontend|front[- ]end|backend|back[- ]end|full[- ]?stack|web|mobile|android|ios|react|angular|java|python|\.net|php|flutter|qa|test|automation|data|devops|cloud|ui\/ux|ux|ui|graphic|product)\s+(?:developer|engineer|analyst|designer|tester))\b/i
    );
    let title = ROLE_DEFAULT_TITLE[kind];
    if (t) {
      const words = t[1].toLowerCase().split(/\s+/).map((w) => TITLE_CASE[w] || w);
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      title = words.join(" ");
    }
    return { kind, title };
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
    const kind = detectRole(resume).kind;
    const finance = kind === "finance" || (kind === "general" && /finance|accounting|tally|\bgst\b|\bb\.?\s*com\b|\bbcom\b/.test(blob));
    const support = kind === "support" || (kind === "general" && /customer|crm|support|inbound|outbound|service/.test(blob));
    /* "Unit testing" on a developer's resume does not make it a QA profile: use the detected role. */
    const qa = kind === "qa";
    const dev = kind === "dev";
    if (support && finance) return "Entry-level candidate with potential for finance-integrated support roles.";
    if (qa) return "QA-focused profile — emphasise tools, coverage, and defect metrics.";
    if (dev) return "Engineering profile — match exact stack names from the job description.";
    if (support) return "Customer support profile — add KPIs and process keywords from the JD.";
    if (finance) return "Finance background — map accounting tools to the job’s required skills.";
    return "Tailor this resume to the job’s required tools and outcomes.";
  }

  /* ---------- accuracy helpers ---------- */

  /* A heading is a short line that starts with one of these words, like an ATS parser reads it.
     "3 years of experience" in a sentence is not an Experience section. */
  const SECTION_HEADINGS = {
    summary: /^(?:professional |career |profile |executive )?(?:summary|profile|objective|about me|career objective|overview)\b/,
    skills: /^(?:technical |key |core |professional |it |soft )?(?:skills?|competenc(?:y|ies)|expertise|technologies|tools(?: and technologies| & technologies)?|tech stack|skill set)\b/,
    experience: /^(?:work |professional |relevant |industry |employment |career )?(?:experience|employment(?: history)?|work history|internships?|career history)\b/,
    education: /^(?:education(?:al)?(?: qualifications?| background| details)?|academic(?:s| qualifications?| details| background)?|qualifications?)\b/,
    project: /^(?:academic |personal |key |major |mini |final year )?projects?\b/,
    contact: /^(?:contact(?: details| information| info)?)\b/
  };

  function headingKey(line) {
    const clean = String(line || "")
      .replace(/^[\s•\-–—*·#|:]+/, "")
      .replace(/[:\s|–—-]+$/, "")
      .toLowerCase();
    if (!clean || clean.length > 40 || clean.split(/\s+/).length > 5) return "";
    for (const [key, re] of Object.entries(SECTION_HEADINGS)) if (re.test(clean)) return key;
    return "";
  }

  /** Which sections exist, plus the lines under each heading. */
  function analyseSections(resume, hasContact) {
    const lines = String(resume || "").split(/\n/);
    const found = new Set();
    const body = {};
    let current = "";
    lines.forEach((raw) => {
      let key = headingKey(raw);
      /* Side-heading layouts put "SKILLS" in a left column, so the PDF line reads
         "SKILLS Java, Spring Boot, ...". An ALL-CAPS heading at the start of a line counts. */
      if (!key) {
        const side = raw.match(/^\s*([A-Z][A-Z&/ ]{3,38}[A-Z])(?:\s*[:|–—-]\s*|\s+)(\S.*)$/);
        if (side && headingKey(side[1])) {
          key = headingKey(side[1]);
          found.add(key);
          current = key;
          (body[key] = body[key] || []).push(side[2].trim());
          return;
        }
      }
      if (key) {
        found.add(key);
        current = key;
        /* "Skills: React, Java" — the rest of the heading line belongs to the section. */
        const rest = raw.replace(/^[^:]*:/, "");
        if (rest !== raw && rest.trim()) (body[key] = body[key] || []).push(rest.trim());
        return;
      }
      if (current && raw.trim()) (body[current] = body[current] || []).push(raw.trim());
    });
    /* Pasted text with no line breaks: fall back to headings written inline ("Skills: ..."). */
    if (lines.length <= 3) {
      const lower = String(resume || "").toLowerCase();
      if (/\b(?:professional summary|career objective|summary|objective|profile)\b/.test(lower)) found.add("summary");
      if (/\b(?:technical skills|key skills|skills)\b/.test(lower)) found.add("skills");
      if (/\b(?:work experience|professional experience|employment history|internship)\b/.test(lower)) found.add("experience");
      if (/\b(?:education|academic qualifications?)\b/.test(lower)) found.add("education");
      if (/\bprojects?\b/.test(lower)) found.add("project");
    }
    if (hasContact) found.add("contact");
    const order = ["experience", "education", "skills", "project", "summary", "contact"];
    return { found: order.filter((k) => found.has(k)), body };
  }

  /** Plain word stem so "testing", "tests" and "tested" meet; only for longer words. */
  function stem(word) {
    const w = String(word || "");
    if (w.length < 5 || /[+#\d]/.test(w)) return w;
    return w.replace(/(?:ations?|ments?|ings?|ers?|ed|es|s)$/, "") || w;
  }

  /** Must-have keywords weigh more than "good to have" ones; known tools more than plain words. */
  function keywordWeights(jd, keywords) {
    const lines = String(jd || "").toLowerCase().split(/\n|(?<=[.;])\s+/);
    let mode = "";
    const tagged = lines.map((line) => {
      if (/good to have|nice to have|preferred|is a plus|added advantage|bonus|optional|desirable/.test(line)) mode = "nice";
      else if (/must have|mandatory|required|requirements?|essential|should have|you have|qualification/.test(line)) mode = "must";
      return { line: normalize(line), mode };
    });
    const weights = {};
    keywords.forEach((k) => {
      let w = knownSkills([k]).length ? 3 : PHRASES.includes(k) ? 2 : 1;
      const hits = tagged.filter((t) => new RegExp(`(?:^|\\s)${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:\\s|$)`).test(t.line));
      if (hits.length) {
        if (hits.every((t) => t.mode === "nice")) w *= 0.5;
        else if (hits.some((t) => t.mode === "must")) w *= 1.3;
        if (hits.length > 1) w += Math.min(hits.length - 1, 2) * 0.5;
      }
      weights[k] = w;
    });
    return weights;
  }

  /** Minimum years the job asks for ("3+ years", "2-4 yrs", "minimum 5 years"); null if none. */
  function jdMinYears(jd) {
    const m = String(jd || "")
      .toLowerCase()
      .match(/(?:minimum|min\.?|at least|atleast)?\s*(\d{1,2})(?:\.\d)?\s*(?:\+|plus)?\s*(?:-|–|to)?\s*(?:\d{1,2})?\s*(?:\+\s*)?(?:years?|yrs?)\b(?![^.\n]{0,25}\b(?:old|age)\b)/);
    if (!m) return null;
    const n = Number(m[1]);
    return n >= 1 && n <= 25 ? n : null;
  }

  const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };

  /** Years of work shown in the resume: date ranges in the experience section, else "X years". */
  function resumeYears(resume, experienceLines) {
    const now = new Date();
    const block = (experienceLines && experienceLines.length ? experienceLines.join("\n") : "").toLowerCase();
    const range =
      /(?:(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*)?((?:19|20)\d{2})\s*(?:-|–|—|to)\s*(?:(present|current|now|till date|ongoing|today)|(?:(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*)?((?:19|20)\d{2}))/g;
    let months = 0;
    let m;
    while ((m = range.exec(block))) {
      const start = new Date(Number(m[2]), m[1] ? MONTHS[m[1]] : 0, 1);
      const end = m[3] ? now : new Date(Number(m[5]), m[4] ? MONTHS[m[4]] : m[1] ? 11 : 0, 1);
      const diff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
      if (diff > 0 && diff < 480) months += diff;
    }
    if (months) return Math.round((months / 12) * 10) / 10;
    const stated = String(resume || "").match(/(\d{1,2}(?:\.\d)?)\s*\+?\s*(?:years?|yrs?)\s+(?:of\s+)?(?:work\s+|professional\s+|industry\s+)?experience/i);
    if (stated) return Number(stated[1]);
    if (/\bfresher\b|\bfresh graduate\b/i.test(resume)) return 0;
    return null;
  }

  const DEGREE_FAMILIES = [
    ["engineering", /\bb\.?\s?tech\b|\bb\.?\s?e\b(?!\w)|\bm\.?\s?tech\b|\bm\.?\s?e\b(?!\w)|\bbachelor of (?:technology|engineering)\b/i],
    ["computer apps", /\bmca\b|\bbca\b|\bm\.?\s?sc (?:in )?(?:computer|it)\b|\bb\.?\s?sc (?:in )?(?:computer|it)\b/i],
    ["mba", /\bmba\b|\bpgdm\b/i],
    ["commerce", /\bb\.?\s?com\b|\bm\.?\s?com\b|\bca\b(?: inter| final)?|\bcma\b|\bacca\b/i],
    ["science", /\bb\.?\s?sc\b|\bm\.?\s?sc\b/i],
    ["diploma", /\bdiploma\b|\biti\b/i],
    ["arts", /\bb\.?\s?a\b(?!\w)|\bm\.?\s?a\b(?!\w)/i],
    ["nursing", /\bgnm\b|\bb\.?\s?sc nursing\b|\bpharm/i]
  ];

  /** Degree check: which degree families the job names, and whether the resume has one. */
  function degreeCheck(jd, resume) {
    const jdText = String(jd || "");
    if (/any (?:degree|graduate|graduation)|any discipline|all streams/i.test(jdText)) return null;
    const wanted = DEGREE_FAMILIES.filter(([, re]) => re.test(jdText)).map(([name]) => name);
    if (!wanted.length) return null;
    const have = DEGREE_FAMILIES.filter(([, re]) => re.test(resume)).map(([name]) => name);
    return { wanted, have, ok: wanted.some((w) => have.includes(w)) };
  }

  /* ---------- improvement plan ----------
     calc() repeats the scoring formula on a set of facts, so the plan can say what the score
     would be after each fix. It mirrors scoreResume(): base points, job penalties, caps. */
  function calc(f) {
    let s;
    if (f.jdMode) {
      s = Math.round(f.coverage * 55 + f.sections * 4);
      if (f.hasEmail) s += 8;
      if (f.hasPhone) s += 7;
      if (f.lengthOk) s += 8;
      if (f.matched >= 6) s += 5;
      if (!f.tables) s += 4;
    } else {
      s = f.sections * 9;
      if (f.hasEmail) s += 12;
      if (f.hasPhone) s += 10;
      if (f.lengthOk) s += 10;
      if (!f.tables) s += 8;
      if (!f.personal) s += 8;
      if (f.bullets >= 4) s += 6;
      if (f.skills >= 6) s += 6;
    }
    s = Math.max(12, Math.min(96, s));
    if (f.jdMode) {
      if (f.yearsGap) s -= f.yearsPenalty;
      if (f.degreeGap) s -= 6;
      if (f.missingMust) s -= Math.min(12, f.missingMust * 3);
      s = Math.max(12, s);
    }
    if (f.scanned) s = Math.min(s, 30);
    const high = !f.hasEmail || f.scanned || (f.yearsGap && f.yearsHigh) || f.missingMust >= 4;
    const medium = !f.hasPhone || f.sections < 4 || f.tables || f.short || (f.yearsGap && !f.yearsHigh) || f.degreeGap || f.missingMust >= 2;
    if (high) s = Math.min(s, 59);
    else if (medium) s = Math.min(s, 79);
    return s;
  }

  const SECTION_LABEL = { summary: "Summary", skills: "Skills", experience: "Experience", education: "Education", project: "Projects" };

  /** Ordered fixes with the points each is worth, applied one after another. */
  function improvementPlan(facts, score, ctx) {
    const steps = [];
    let f = { ...facts };
    let last = calc(f);
    const add = (title, detail, change) => {
      const next = { ...f, ...change };
      const s = calc(next);
      steps.push({ title, detail, gain: Math.max(0, s - last) });
      f = next;
      last = s;
    };
    if (facts.scanned) add("Export a text PDF", "Re-save from Word, Google Docs or our resume builder so the text can be selected. Scanned images score near zero in most trackers.", { scanned: false });
    if (!facts.hasEmail) add("Add your email as plain text", "Put it on the contact line at the top, not inside an image or header graphic.", { hasEmail: true });
    if (!facts.hasPhone) add("Add your mobile number", "Write it as text with the country code, e.g. +91 98xxx xxxxx.", { hasPhone: true });
    if (ctx.missingSections.length) add(`Add ${ctx.missingSections.map((k) => SECTION_LABEL[k]).join(", ")} section${ctx.missingSections.length > 1 ? "s" : ""}`, "Use these exact headings on their own line so trackers can find each part.", { sections: Math.max(facts.sections, Math.min(5, facts.sections + ctx.missingSections.length)) });
    if (!facts.lengthOk) add(facts.long ? "Trim to one or two pages" : "Add detail: 220–900 words", facts.long ? "Cut older or unrelated roles to one line each and keep the last 5–7 years in detail." : "Add 2–3 bullets per role or project with what you did, the tools you used and a result.", { lengthOk: true, short: false, long: false });
    if (facts.tables) add("Use a single-column layout", "Move content out of tables, text boxes and side columns. Our ATS 90+ templates are single-column.", { tables: false });
    if (facts.jdMode && ctx.missingMust.length) add(`Add must-have skills you really have: ${ctx.missingMust.slice(0, 4).map(displayName).join(", ")}`, "Mention each in Skills and in a bullet that shows where you used it. Skip any you haven't used.", { missingMust: 0, coverage: Math.min(1, facts.coverage + ctx.mustWeightShare), matched: facts.matched + ctx.missingMust.length });
    if (facts.jdMode && ctx.missingOther.length) add(`Mirror other job keywords: ${ctx.missingOther.slice(0, 4).map(displayName).join(", ")}`, "Use the job's exact wording where it is true for you.", { coverage: 1, matched: Math.max(f.matched, 6) });
    if (!facts.jdMode && facts.personal) add("Remove personal details", "Date of birth, father's name, religion and marital status aren't needed and can trigger bias.", { personal: false });
    if (!facts.jdMode && facts.bullets < 4) add("Write at least 4 bullet points", "One idea per bullet, each starting with an action verb.", { bullets: 4 });
    if (!facts.jdMode && facts.skills < 6) add("List 6–15 specific skills", "Name real tools and methods (Excel, Tally, SQL, Selenium) instead of soft skills only.", { skills: 6 });
    const projected = Math.max(score, last);
    return { steps: steps.filter((s) => s.gain > 0 || /must-have|keywords|text PDF/.test(s.title)), projected };
  }

  function band(score) {
    if (score >= 90) return { key: "top", title: "Ready to send", text: "Your resume is easy for trackers to read. Tailor the summary and skills for each job you apply to." };
    if (score >= 80) return { key: "strong", title: "Fine-tune for 90+", text: "A few small changes will move you into the top band. Work through the steps below." };
    if (score >= 60) return { key: "good", title: "Close the gaps to reach 80+", text: "The basics are there. The steps below are the ones that move your score the most." };
    if (score >= 40) return { key: "fair", title: "Fix the high-priority issues first", text: "Trackers may skip this resume today. Start with step 1 — each step is worth the points shown." };
    return { key: "weak", title: "Rebuild on an ATS-friendly template", text: "It's faster to start from an example that already scores 90+ and replace it with your details." };
  }

  const BUZZWORDS = /\b(hard[- ]?working|team player|self[- ]?motivated|go[- ]?getter|quick learner|result[- ]?oriented|dynamic|passionate|detail[- ]?oriented|out[- ]of[- ]the[- ]box|synergy|dedicated)\b/gi;

  /** Specific, line-level checks: what's fine and what to change, area by area. */
  function deepChecks(resume, sectionInfo, role, skillCount, hasEmail) {
    const out = [];
    const body = sectionInfo.body;
    /* Text pasted without line breaks: section contents can't be told apart, so only run
       the checks that don't depend on lines. */
    const oneLine = String(resume || "").split(/\n/).filter((l) => l.trim()).length <= 3;
    if (oneLine) out.push({ area: "Review", ok: false, text: "The text has no line breaks, so section-by-section checks were skipped. Upload the PDF or DOCX, or paste with line breaks, for a full review." });
    if (oneLine) return out.concat(wordingChecks(resume, role, hasEmail));
    const summary = (body.summary || []).join(" ");
    const sumWords = summary.split(/\s+/).filter(Boolean).length;
    if (!summary) out.push({ area: "Summary", ok: false, text: "No summary found. Add 2–3 lines at the top: your target role, years of experience (or degree), and 4–6 key tools." });
    else if (sumWords > 90) out.push({ area: "Summary", ok: false, text: `Your summary is ${sumWords} words. Keep it under 70 so recruiters read it in a few seconds.` });
    else if (/seeking a (?:challenging|suitable|good)|to work in a (?:challenging|reputed)|growth of the organi[sz]ation/i.test(summary)) out.push({ area: "Summary", ok: false, text: "It reads like an old-style objective (\"seeking a challenging position…\"). Say what you offer: role, skills and one result." });
    else out.push({ area: "Summary", ok: true, text: `Summary present (${sumWords} words).` });

    const skillLines = body.skills || [];
    if (!skillLines.length && !skillCount) out.push({ area: "Skills", ok: false, text: "No Skills section found. List tools as plain comma-separated text under a 'Skills' heading." });
    else if (skillCount < 6) out.push({ area: "Skills", ok: false, text: `Only ${skillCount} specific tools were recognised. Name the exact software, languages and methods you use.` });
    else if (skillCount > 35) out.push({ area: "Skills", ok: false, text: `${skillCount} skills listed — long lists look like keyword stuffing. Keep the 15–25 most relevant and group them.` });
    else out.push({ area: "Skills", ok: true, text: `${skillCount} specific skills recognised.` });

    const bullets = [...(body.experience || []), ...(body.project || [])].filter((l) => l.length >= 25 && !/^(?:(?:19|20)\d{2}|[a-z]{3,9}\.? (?:19|20)\d{2})/i.test(l));
    const longOnes = bullets.filter((l) => l.length > 220);
    const withNum = bullets.filter((l) => /\d/.test(l));
    if (bullets.length) {
      if (withNum.length / bullets.length < 0.4) out.push({ area: "Results", ok: false, text: `${withNum.length} of ${bullets.length} bullets include a number. Aim for at least half: users served, % improved, time saved, volume handled.` });
      else out.push({ area: "Results", ok: true, text: `${withNum.length} of ${bullets.length} bullets show a measurable result.` });
      if (longOnes.length) out.push({ area: "Bullets", ok: false, text: `${longOnes.length} bullet${longOnes.length > 1 ? "s are" : " is"} longer than two lines. Split into one idea per bullet.` });
    }

    return out.concat(wordingChecks(resume, role, hasEmail, body));
  }

  function wordingChecks(resume, role, hasEmail, body = {}) {
    const out = [];
    const buzz = [...new Set((resume.match(BUZZWORDS) || []).map((w) => w.toLowerCase()))];
    if (buzz.length) out.push({ area: "Wording", ok: false, text: `Replace claims like "${buzz.slice(0, 3).join('", "')}" with proof — a project, number or example that shows it.` });

    const firstPerson = (resume.match(/\b(?:I|my|me)\b/g) || []).length;
    if (firstPerson > 4) out.push({ area: "Wording", ok: false, text: `"I/my/me" appears ${firstPerson} times. Resume bullets usually start with the verb: "Built…", not "I built…".` });

    const fmtMonthName = /\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(?:19|20)\d{2}/i.test(resume);
    const fmtNumeric = /\b(?:0?[1-9]|1[0-2])\s*[/-]\s*(?:19|20)\d{2}\b/.test(resume);
    if (fmtMonthName && fmtNumeric) out.push({ area: "Dates", ok: false, text: "Dates use two formats (e.g. 'Jan 2024' and '01/2024'). Pick one and use it everywhere." });
    if ((body.experience || []).length && !/(?:19|20)\d{2}/.test((body.experience || []).join(" "))) out.push({ area: "Dates", ok: false, text: "Experience has no dates. Add start and end month and year for each role." });

    const tech = ["dev", "qa", "data", "design"].includes(role.kind);
    const hasLinkedIn = /linkedin\.com\//i.test(resume);
    const hasPortfolio = /github\.com\/|behance\.net|dribbble\.com|\.pages\.dev|\.vercel\.app|\.netlify\.app|portfolio/i.test(resume);
    if (!hasLinkedIn) out.push({ area: "Contact", ok: false, text: "Add your LinkedIn profile URL to the contact line — most recruiters check it." });
    if (tech && !hasPortfolio) out.push({ area: "Contact", ok: false, text: role.kind === "design" ? "Add a portfolio link (Behance, Dribbble or your own site)." : "Add a GitHub or portfolio link so recruiters can see your code." });
    const email = (resume.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i) || [""])[0];
    if (hasEmail && /\d{4,}|(?:cool|cute|baby|king|queen|rock|star|angel)/i.test(email.split("@")[0])) out.push({ area: "Contact", ok: false, text: `Use a simple, professional email (firstname.lastname@…) instead of "${email}".` });
    if (hasLinkedIn && (!tech || hasPortfolio)) out.push({ area: "Contact", ok: true, text: "Contact links look complete." });
    return out;
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

  const STRONG_VERB = {
    handled: "Managed",
    "responsible for": "Owned",
    "worked on": "Built",
    "helped with": "Contributed to",
    "assisted in": "Supported",
    performed: "Carried out",
    did: "Completed",
    "was involved in": "Contributed to",
    "looked after": "Managed"
  };

  const RESULT_HINT = {
    dev: "add the result: users, speed gained or bugs cut",
    qa: "add the result: test cases, defects caught or release time saved",
    data: "add the result: reports shipped, hours saved or decisions informed",
    design: "add the result: screens shipped, usability gains or conversions",
    support: "add the result: tickets per day, CSAT or response time",
    sales: "add the result: leads, meetings booked or revenue",
    hr: "add the result: roles closed, time-to-hire or joiners",
    finance: "add the result: entries per month, accuracy or closing time",
    general: "add the result: a number, a scale or time saved"
  };

  /* Swap duty language for a stronger verb. We never invent the outcome: the rewrite
     leaves a bracketed prompt for the real number instead of a made-up KPI. */
  function weakPhrasingItems(lines, role) {
    const weak = /^(handled|responsible for|worked on|helped with|assisted in|performed|did|was involved in|looked after)\b/i;
    const items = [];
    const hint = RESULT_HINT[role.kind] || RESULT_HINT.general;
    lines.forEach((line) => {
      if (items.length >= 3) return;
      const m = line.match(weak);
      if (!m || /\d/.test(line)) return;
      const verb = STRONG_VERB[m[1].toLowerCase()] || "Delivered";
      const rest = line.slice(m[0].length).replace(/\.$/, "");
      items.push({
        original: line,
        issue: "Passive / duty language",
        fix: "Start with a strong verb and add the result you got.",
        rewrite: `${verb}${rest} [${hint}].`
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

  /* Job fit compares the resume with a job post, so it only exists when one was given. */
  function jobFitItems(resume, matched, missing, jdMode) {
    if (!jdMode) return null;
    const blob = resume.toLowerCase();
    const strengths = [];
    const gaps = [];
    if (matched.some((k) => /crm|salesforce/.test(k)) || /\bcrm\b/.test(blob)) strengths.push("Relevant CRM experience");
    if (/\bfinance\b|\bb\.?\s*com\b|\bbcom\b|accounting|\btally\b/.test(blob)) strengths.push("Educational background in Finance");
    if (/sap|tally/.test(blob) || matched.some((k) => /sap|tally/.test(k))) {
      strengths.push("Technical certifications or tools (SAP, Tally, or similar)");
    }
    if (matched.some((k) => /customer|support|communication/.test(k))) {
      strengths.push("Customer service / communication keywords present");
    }
    if (matched.length >= 5) strengths.push("Core JD skills already appear in the resume");
    else if (matched.length) strengths.push(`Shares ${matched.slice(0, 3).map(displayName).join(", ")} with this job`);
    if (!strengths.length) strengths.push("Few of this job’s skills appear yet. See Missing above.");

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

  /* Two openings per kind of role; "Try another" cycles through them. Every tool named comes
     from the resume itself, so the summary never claims a skill the person did not list. */
  const SUMMARY_TEMPLATES = {
    dev: [
      "{title}{exp} building web applications with {tools}. Writes clean, tested code and works closely with design and backend teams to ship features on time.",
      "{title}{exp} experienced in {tools}. Focused on maintainable code, reliable API integrations and features that hold up in production."
    ],
    qa: [
      "{title}{exp} skilled in {tools}. Designs test cases, tracks defects to closure and helps teams release with fewer bugs.",
      "{title}{exp} working with {tools} across manual and automated testing, with a focus on clear bug reports and stable releases."
    ],
    data: [
      "{title}{exp} working with {tools} to clean data, build reports and turn numbers into clear decisions.",
      "{title}{exp} skilled in {tools}. Builds accurate dashboards and explains findings in plain language for business teams."
    ],
    design: [
      "{title}{exp} using {tools} to design clear, usable interfaces from wireframe to developer handoff.",
      "{title}{exp} skilled in {tools}, with an eye for layout, consistency and how real users move through a product."
    ],
    support: [
      "{title}{exp} using {tools} to resolve customer issues quickly, follow process and keep service quality high.",
      "{title}{exp} skilled in {tools}. Handles queries calmly, documents cases clearly and works toward first-contact resolution."
    ],
    finance: [
      "{title}{exp} with hands-on use of {tools} for accurate bookkeeping, reconciliation and reporting.",
      "{title}{exp} skilled in {tools}, focused on clean records, on-time filings and clear month-end reports."
    ],
    hr: [
      "{title}{exp} using {tools} across sourcing, screening and onboarding.",
      "{title}{exp} skilled in {tools}, with a focus on a smooth candidate experience and accurate HR records."
    ],
    sales: [
      "{title}{exp} using {tools} to generate leads, follow up consistently and move deals to close.",
      "{title}{exp} skilled in {tools}, with steady pipeline habits and clear communication with prospects."
    ],
    general: [
      "{title}{exp} skilled in {tools}. Brings ownership, clear communication and steady delivery to the team.",
      "{title}{exp} with working knowledge of {tools}, eager to take on responsibility and learn quickly."
    ]
  };

  function summaryVariants(resume, skills, role) {
    const edu = guessEducation(resume);
    const tenure = guessTenure(resume);
    const tools = [];
    skills.map(displayName).forEach((t) => {
      if (t && !tools.includes(t)) tools.push(t);
    });
    const list = tools.slice(0, 4);
    const toolBit =
      list.length > 1 ? `${list.slice(0, -1).join(", ")} and ${list[list.length - 1]}` : list[0] || "the tools in your Skills section";
    const exp = tenure ? ` with ${tenure}` : edu ? ` with a ${edu}` : "";
    return (SUMMARY_TEMPLATES[role.kind] || SUMMARY_TEMPLATES.general).map((tpl) =>
      tpl.replace("{title}", role.title).replace("{exp}", exp).replace("{tools}", toolBit)
    );
  }

  function recruiterNotes(ranking, fit, missing, skills) {
    const notes = [];
    if (fit && fit.strengths[0]) notes.push(`${fit.strengths[0]} is a useful selling point. Keep it near the top.`);
    else if (!fit && skills.length) {
      notes.push(`Your Skills list (${skills.slice(0, 4).map(displayName).join(", ")}) reads as plain text. Keep it near the top.`);
    }
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

  /* Real tools and skills only: no role titles, vague words or plain 4-letter nouns. */
  function knownSkills(list) {
    return list.filter(
      (k) =>
        !ROLE_PHRASES.has(k) &&
        !VAGUE_SKILLS.has(k) &&
        (SKILL_HINTS.has(k) || PHRASES.includes(k) || /^[a-z][a-z0-9]*[+#]+$/.test(k))
    );
  }

  function resumeHasKeyword(resumeNorm, resumeTokSet, keyword, resumeCanon, resumeStems) {
    if (resumeCanon && resumeCanon.has(keyword)) return true;
    if (keyword.includes(" ")) {
      if (resumeNorm.includes(keyword)) return true;
      /* "unit testing" also matches "unit tests" / "unit tested": compare word by word on stems. */
      if (!resumeStems) return false;
      const parts = keyword.split(" ").map(stem);
      const toks = resumeNorm.split(" ").map(stem);
      for (let i = 0; i + parts.length <= toks.length; i += 1) {
        if (parts.every((p, j) => toks[i + j] === p)) return true;
      }
      return false;
    }
    if (resumeTokSet.has(keyword)) return true;
    if (keyword.endsWith("s") && resumeTokSet.has(keyword.slice(0, -1))) return true;
    if (resumeStems && keyword.length >= 5 && resumeStems.has(stem(keyword))) return true;
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
    if (checkHint) {
      checkHint.textContent = readingFile
        ? "Reading your file…"
        : resumeReady
          ? jdReady
            ? "Ready: readability plus keyword match."
            : "Ready: readability check. Add a job post for keyword match."
          : "Add a resume to continue. Upload a file or paste a few lines.";
      checkHint.classList.toggle("is-ready", resumeReady && !readingFile);
    }

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
      /* Rebuild real lines: a new line starts when the text baseline moves or the PDF marks an
         end of line. Without this every page became one long line and headings/bullets vanished. */
      let lastY = null;
      let line = "";
      const lines = [];
      content.items.forEach((item) => {
        const y = item.transform ? Math.round(item.transform[5]) : null;
        if (lastY !== null && y !== null && Math.abs(y - lastY) > 2 && line.trim()) {
          lines.push(line.trim());
          line = "";
        }
        line += line && !/\s$/.test(line) && item.str && !/^\s/.test(item.str) ? ` ${item.str}` : item.str;
        if (item.hasEOL) {
          lines.push(line.trim());
          line = "";
          lastY = null;
        } else if (y !== null) {
          lastY = y;
        }
      });
      if (line.trim()) lines.push(line.trim());
      text += lines.filter(Boolean).join("\n") + "\n\n";
    }
    /* Almost no text per page means a scanned / image-only PDF that ATS software cannot read. */
    lastExtract = { kind: "pdf", pages: pdf.numPages, chars: text.replace(/\s/g, "").length };
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
    const resumeStems = new Set([...resumeTokSet].map(stem));
    const resumeKeywords = extractKeywords(resume);
    const resumeCanon = new Set(resumeKeywords);
    const resumeSkills = knownSkills(resumeKeywords);
    const role = detectRole(resume);
    /* JD keywords: real tools, curated phrases, and other words only when the post repeats them.
       This keeps "building", "reusable" or "include" out of Matched / Missing. */
    const jdNorm = normalize(jd);
    const repeats = (k) => (jdNorm.match(new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g")) || []).length;
    const jdKeywords = jdMode
      ? extractKeywords(jd).filter(
          (k) =>
            knownSkills([k]).length ||
            PHRASES.includes(k) ||
            (!k.includes(" ") && k.length >= 5 && !BIGRAM_NOISE.has(k) && repeats(k) >= 2)
        )
      : [];
    const weights = jdMode ? keywordWeights(jd, jdKeywords) : {};
    const byWeight = (a, b) => (weights[b] || 0) - (weights[a] || 0);
    const has = (k) => resumeHasKeyword(resumeNorm, resumeTokSet, k, resumeCanon, resumeStems);
    const matched = jdMode ? jdKeywords.filter(has).sort(byWeight) : resumeSkills;
    /* Most important gaps first, so "Missing" leads with the must-have tools. */
    const missing = jdMode ? jdKeywords.filter((k) => !has(k)).sort(byWeight) : [];
    const totalWeight = jdKeywords.reduce((sum, k) => sum + (weights[k] || 1), 0);
    const coverage = totalWeight ? matched.reduce((sum, k) => sum + (weights[k] || 1), 0) / totalWeight : 0;
    const missingMust = missing.filter((k) => (weights[k] || 0) >= 3.9);

    const lower = resume.toLowerCase();
    const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(resume);
    /* Any phone written as text: Indian mobiles, landlines and international numbers (+971 ...). */
    const hasPhone = (resume.match(/\+?\d[\d\s().-]{8,17}\d/g) || []).some((cand) => {
      const digits = cand.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 13) return false;
      if (/^(?:19|20)\d{2}(?:19|20)\d{2}$/.test(digits)) return false; /* "2019 - 2023" */
      return /^(?:91)?[6-9]\d{9}$/.test(digits) || cand.trim().startsWith("+") || /^0\d{9,11}$/.test(digits);
    });
    const sectionInfo = analyseSections(resume, false);
    const foundSections = sectionInfo.found;
    /* Skills listed under the Skills heading count too (Tally, GST, Figma...), not only known tech tools. */
    const listedSkills = (sectionInfo.body.skills || [])
      .flatMap((l) => l.replace(/^[^:]{2,30}:\s*/, "").split(/[,|•;·]/))
      .map((s) => s.trim())
      .filter((s) => s.length > 1 && s.length < 40 && s.split(/\s+/).length <= 4);
    const skillCount = Math.max(resumeSkills.length, new Set(listedSkills.map((s) => s.toLowerCase())).size);
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
      if (skillCount >= 6) score += 6;
    }
    score = Math.max(12, Math.min(96, score));

    /* The score must agree with "Fix these first": a High issue keeps it out of the good
       range and a Medium issue keeps it out of the top band. */
    const ranking = rankingIssues(resume, hasEmail, hasPhone, foundSections, hasTablesHint, wordCount);

    /* Image-only PDF: the file opened but held almost no text. */
    const scanned = Boolean(lastExtract && lastExtract.kind === "pdf" && lastExtract.chars < 250 * Math.max(1, lastExtract.pages));
    if (scanned) {
      ranking.unshift({
        title: "PDF looks scanned or image-based",
        severity: "High",
        why: "ATS software reads text, not pictures. Most of this PDF had no selectable text.",
        evidence: `Only about ${lastExtract.chars} characters of text across ${lastExtract.pages} page(s).`
      });
    }

    /* Measurable results: share of experience/project bullets that carry a number. */
    const impactLines = [...(sectionInfo.body.experience || []), ...(sectionInfo.body.project || [])].filter(
      (l) => l.length >= 25 && !/^(?:(?:19|20)\d{2}|[a-z]{3,9}\.? (?:19|20)\d{2})/i.test(l)
    );
    const quantified = impactLines.filter((l) => /\d+\s*%|\d[\d,]*\+?\s*(?:users?|clients?|customers?|tickets?|calls?|leads?|projects?|hours?|days?|reports?|accounts?|crore|lakh|k\b)|₹|\$|\b\d{2,}\b/i.test(l));
    if (impactLines.length >= 3 && quantified.length / impactLines.length < 0.25) {
      ranking.push({
        title: "Few measurable results",
        severity: "Low",
        why: "Recruiters and ranking tools favour bullets with numbers: users, %, time saved, volume handled.",
        evidence: `${quantified.length} of ${impactLines.length} experience/project bullets include a number.`
      });
    }

    /* Job requirements the keyword list can't see: years of experience and degree. */
    const needYears = jdMode ? jdMinYears(jd) : null;
    const haveYears = resumeYears(resume, sectionInfo.body.experience);
    const yearsGap = needYears !== null && haveYears !== null && haveYears + 0.5 < needYears;
    if (yearsGap) {
      ranking.push({
        title: "Experience below the job's requirement",
        severity: needYears - haveYears >= 2 ? "High" : "Medium",
        why: "Many ATS filters screen out profiles below the minimum years. Apply only if you can justify it, and make relevant work easy to spot.",
        evidence: `Job asks for ${needYears}+ years; the resume shows about ${haveYears} year${haveYears === 1 ? "" : "s"}.`
      });
    }
    const degree = jdMode ? degreeCheck(jd, resume) : null;
    const degreeGap = Boolean(degree && !degree.ok);
    if (degreeGap) {
      ranking.push({
        title: "Degree doesn't match the job",
        severity: "Medium",
        why: "The job names specific degrees. ATS knockout questions often filter on qualification.",
        evidence: `Job asks for: ${degree.wanted.join(" / ")}. Resume shows: ${degree.have.join(" / ") || "no recognised degree"}.`
      });
    }
    if (jdMode && missingMust.length >= 2) {
      ranking.push({
        title: "Must-have skills missing",
        severity: missingMust.length >= 4 ? "High" : "Medium",
        why: "These tools are in the job's required list. Add them only if you have really used them.",
        evidence: `Missing: ${missingMust.slice(0, 5).map(displayName).join(", ")}.`
      });
    }
    if (jdMode) {
      if (yearsGap) score -= Math.min(15, Math.round((needYears - haveYears) * 4));
      if (degreeGap) score -= 6;
      if (missingMust.length) score -= Math.min(12, missingMust.length * 3);
      score = Math.max(12, score);
    }
    if (scanned) score = Math.min(score, 30);
    const sevRank = { High: 0, Medium: 1, Low: 2 };
    ranking.sort((a, b) => sevRank[a.severity] - sevRank[b.severity]);
    const highCount = ranking.filter((i) => i.severity === "High").length;
    const mediumCount = ranking.filter((i) => i.severity === "Medium").length;
    if (highCount) score = Math.min(score, 59);
    else if (mediumCount) score = Math.min(score, 79);
    const fixCount = highCount + mediumCount;

    const facts = {
      jdMode,
      coverage,
      sections: foundSections.filter((s) => s !== "contact").length,
      hasEmail,
      hasPhone,
      lengthOk: wordCount >= 220 && wordCount <= 900,
      short: wordCount < 180,
      long: wordCount > 900,
      tables: hasTablesHint,
      personal: hasPersonal,
      bullets: bulletCount,
      skills: skillCount,
      matched: matched.length,
      yearsGap,
      yearsHigh: yearsGap && needYears - haveYears >= 2,
      yearsPenalty: yearsGap ? Math.min(15, Math.round((needYears - haveYears) * 4)) : 0,
      degreeGap,
      missingMust: missingMust.length >= 2 ? missingMust.length : 0,
      scanned
    };
    const mustWeight = missingMust.reduce((sum, k) => sum + (weights[k] || 1), 0);
    const plan = improvementPlan(facts, score, {
      missingSections: ["summary", "skills", "experience", "education", "project"].filter((k) => !foundSections.includes(k)).slice(0, Math.max(0, 5 - foundSections.length)),
      missingMust,
      missingOther: missing.filter((k) => !missingMust.includes(k)),
      mustWeightShare: totalWeight ? mustWeight / totalWeight : 0
    });
    plan.band = band(score);
    if (yearsGap || degreeGap)
      plan.note = "Some gaps can't be fixed by editing (years of experience or degree). The estimate leaves them in.";
    const checks = deepChecks(resume, sectionInfo, role, skillCount, hasEmail);

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

    const phrasing = weakPhrasingItems(resumeLines(resume), role);
    const fit = jobFitItems(resume, matched, missing, jdMode);
    if (fit) {
      if (yearsGap) fit.gaps.unshift(`Experience: job asks ${needYears}+ years, resume shows about ${haveYears}`);
      else if (needYears !== null && haveYears !== null) fit.strengths.unshift(`Meets the ${needYears}+ years experience ask`);
      if (degreeGap) fit.gaps.unshift(`Qualification: job asks ${degree.wanted.join(" / ")}`);
      else if (degree && degree.ok) fit.strengths.push("Degree matches the job's qualification");
      fit.strengths = fit.strengths.slice(0, 4);
      fit.gaps = fit.gaps.slice(0, 4);
    }
    const summaries = summaryVariants(resume, jdMode ? matched.filter((k) => resumeSkills.includes(k)).concat(resumeSkills) : resumeSkills, role);
    const resumeGaps = [];
    if (!hasEmail) resumeGaps.push("Plain-text email");
    if (!hasPhone) resumeGaps.push("Phone number");
    if (foundSections.length < 4) resumeGaps.push("Standard headings");
    if (hasTablesHint) resumeGaps.push("Simple one-column layout");
    if (hasPersonal) resumeGaps.push("No personal-detail fields");
    if (!/\d+%|\d+\+|kpi|sla/i.test(resume)) resumeGaps.push("Measurable KPIs");
    /* With a JD the missing list already says what to add; extras are for the no-JD check. */
    const suggested = jdMode ? [] : ["text PDF", "comma-separated Skills", "3–5 outcome bullets"];
    const topFixes = [];
    if (ranking[0]) topFixes.push({ title: ranking[0].title, why: ranking[0].why, severity: ranking[0].severity });
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
      plan,
      checks,
      roleKind: role.kind,
      years: haveYears,
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
      summaryText: summaries[0],
      summaries,
      fixCount,
      sections: sectionRecommendations(foundSections),
      recruiter: recruiterNotes(ranking, fit, missing, resumeSkills),
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

  /* Example resumes that score 90+ (from the resume builder) for the detected role, each with
     its ATS 90+ template. Loaded on demand so the checker stays light; hidden if it fails. */
  const SAME_FIELD = { dev: ["dev", "qa", "data"], qa: ["qa", "dev"], data: ["data", "dev"], design: ["design"], finance: ["finance"], support: ["support", "sales"], sales: ["sales", "support"], hr: ["hr"], general: [] };
  async function showExamples(report) {
    const box = result.querySelector("[data-ats-examples]");
    if (!box || report.score >= 92) return;
    try {
      const { EXAMPLES } = await import("/js/resume-builder/examples.js?v=20261118snr");
      const near = SAME_FIELD[report.roleKind] || [];
      /* 6+ years shown on the resume → senior examples first; otherwise early-career ones. */
      const wantSenior = Number(report.years) >= 6;
      const levelRank = (e) => ((e.level === "senior") === wantSenior ? 0 : 1);
      /* Freshers' examples don't help someone with 6+ years. */
      const ordered = [...EXAMPLES].filter((e) => !(wantSenior && /^fresher/.test(e.id))).sort((a, b) => levelRank(a) - levelRank(b));
      const picks = [
        ...ordered.filter((e) => e.kind === report.roleKind && levelRank(e) === 0),
        ...ordered.filter((e) => e.kind !== report.roleKind && near.includes(e.kind) && levelRank(e) === 0),
        ...ordered.filter((e) => e.kind === report.roleKind),
        ...ordered.filter((e) => near.includes(e.kind)),
        ...ordered
      ].filter((e, i, list) => list.indexOf(e) === i).slice(0, 3);
      if (!picks.length || !result.contains(box)) return;
      box.innerHTML = `
        <h3>Start from a resume that scores 90+</h3>
        <p class="ats-sub">Fictional examples written for your kind of role, on single-column ATS templates. Open one in the resume builder and replace every detail with your own.</p>
        <ul class="ats-examples">${picks
          .map(
            (e) => `<li><div><strong>${escapeHtml(e.title)}</strong><small>${e.level === "senior" ? "Senior · " : ""}${escapeHtml(e.templateName || e.template)} template · scores 90+ in this checker</small></div>
              <a class="ats-btn ats-btn--secondary" href="/resume-builder/templates/?select=${encodeURIComponent(e.template)}&example=${encodeURIComponent(e.id)}">Use this example</a></li>`
          )
          .join("")}</ul>
        <p class="ats-sub"><a href="/resume-builder/templates/">Browse all ATS-friendly templates</a></p>`;
      box.hidden = false;
    } catch (_e) {
      /* recommendations are optional */
    }
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
          ${fixLink(item.title)}
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

    const plan = report.plan;
    const planHtml = plan
      ? `<section class="ats-report-block ats-plan ats-plan--${escapeHtml(plan.band.key)}">
          <div class="ats-plan-head">
            <div>
              <p class="ats-sub">Your path to a higher score</p>
              <h3>${escapeHtml(plan.band.title)}</h3>
              <p>${escapeHtml(plan.band.text)}</p>
            </div>
            ${plan.projected > report.score
              ? `<div class="ats-plan-meter" aria-label="Score now ${report.score}, about ${plan.projected} after these fixes"><span>${report.score}</span><i aria-hidden="true">→</i><strong>${plan.projected}</strong><small>after fixes</small></div>`
              : ""}
          </div>
          ${plan.steps.length
            ? `<ol class="ats-plan-steps">${plan.steps
                .map((s, i) => `<li><span class="ats-plan-n">${i + 1}</span><div><strong>${escapeHtml(s.title)}</strong><p>${escapeHtml(s.detail)}</p></div><em>${s.gain > 0 ? `+${s.gain}` : "job fit"}</em></li>`)
                .join("")}</ol>`
            : `<p class="ats-sub">No score-changing fixes left. Use the review below to polish wording and results.</p>`}
          ${plan.note ? `<p class="ats-sub ats-plan-note">${escapeHtml(plan.note)}</p>` : ""}
          <p class="ats-sub ats-plan-note">Estimates use this checker's own scoring. Employers' systems differ, so treat them as a guide.</p>
        </section>`
      : "";
    const checks = report.checks || [];
    const checksHtml = checks.length
      ? `<section class="ats-report-block">
          <h3>Detailed review <span class="ats-count">${checks.filter((c) => !c.ok).length} to improve</span></h3>
          <ul class="ats-checks">${checks
            .map((c) => `<li class="${c.ok ? "is-ok" : "is-fix"}"><span class="ats-check-mark" aria-hidden="true">${c.ok ? "✓" : "!"}</span><div><strong>${escapeHtml(c.area)}</strong><p>${escapeHtml(c.text)}</p></div></li>`)
            .join("")}</ul>
        </section>`
      : "";
    const examplesHtml = `<section class="ats-report-block" data-ats-examples hidden></section>`;

    const fitHtml = report.fit
      ? `<section class="ats-report-block">
          <h3>Job fit</h3>
          <div class="ats-report-fit">
            <div>
              <p class="ats-sub">Strengths</p>
              <ul class="ats-fit ats-fit--ok">${report.fit.strengths.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
            </div>
            ${report.fit.gaps.length
              ? `<div><p class="ats-sub">Gaps</p><ul class="ats-fit ats-fit--gap">${report.fit.gaps.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ul></div>`
              : ""}
          </div>
        </section>`
      : `<section class="ats-report-block ats-report-jdcta">
          <h3>Job fit</h3>
          <p>Add a job description to see which of the job’s skills your resume already covers.</p>
          <button type="button" class="ats-btn ats-btn--secondary" data-ats-add-jd>Add a job description</button>
        </section>`;

    result.innerHTML = `
      <article class="ats-report ats-report--${tone}">
        <header class="ats-report-head">
          <div class="ats-report-score">
            <strong>${report.score}</strong>
            <span>${escapeHtml(report.label)}</span>
            ${report.fixCount ? `<em>${report.fixCount} fix${report.fixCount > 1 ? "es" : ""} to make</em>` : ""}
          </div>
          <div class="ats-report-verdict">
            ${report.badge ? `<p class="ats-badge">${escapeHtml(report.badge)}</p>` : ""}
            <h2>${escapeHtml(report.comments.overall)}</h2>
            <p>${
              report.jdMode
                ? `Score = keyword coverage (${Math.round(report.coverage * 100)}%) plus contact details, headings and length. Local estimate, not the employer’s ATS.`
                : "Score = how easily a tracker can read this file: contact details, standard headings, length and layout. It does not measure job fit. Local estimate, not an employer ATS."
            }</p>
          </div>
        </header>
        ${planHtml}
        ${
          topFixes.length
            ? `<section class="ats-report-block">
                <h3>Fix these first</h3>
                <ol class="ats-report-fixes">${topFixes
                  .map(
                    (fix, i) =>
                      `<li><span>${i + 1}</span><div><div class="ats-fix-title"><strong>${escapeHtml(fix.title)}</strong>${fix.severity ? `<em class="ats-sev ats-sev--${escapeHtml(fix.severity.toLowerCase())}">${escapeHtml(fix.severity)}</em>` : ""}</div><p>${escapeHtml(fitWhy(fix))}</p>${fixLink(fix.title)}</div></li>`
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
        ${
          rankingHtml
            ? `<section class="ats-report-block">
                <h3>Structure issues <span class="ats-count">${ranking.length}</span></h3>
                <ul class="ats-report-list">${rankingHtml}</ul>
              </section>`
            : ""
        }
        ${checksHtml}
        ${fitHtml}
        ${examplesHtml}
        ${
          phrasingHtml
            ? `<section class="ats-report-block">
                <h3>Clearer bullets</h3>
                <ul class="ats-report-list">${phrasingHtml}</ul>
              </section>`
            : ""
        }
        ${
          report.summaryText
            ? `<section class="ats-report-block">
                <div class="ats-insight-head">
                  <h3>Suggested summary</h3>
                  <span class="ats-insight-actions">
                    ${(report.summaries || []).length > 1 ? `<button type="button" class="ats-copy" data-ats-regen>Try another</button>` : ""}
                    <button type="button" class="ats-copy" data-ats-copy>Copy</button>
                  </span>
                </div>
                <p class="ats-summary-text" data-ats-summary>${escapeHtml(report.summaryText)}</p>
                <p class="ats-sub ats-summary-note">Built from the skills on your resume. Edit it so every claim is true for you.</p>
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
          sections.length
            ? `<section class="ats-report-block">
                <h3>Sections</h3>
                <ul class="ats-notes">${sections.map((n) => `<li>${escapeHtml(n)}</li>`).join("")}</ul>
              </section>`
            : ""
        }
        <div class="ats-report-actions" role="group" aria-label="Report actions">
          <button type="button" class="ats-btn ats-btn--primary" data-ats-reset>Check another resume</button>
          <button type="button" class="ats-btn ats-btn--secondary" data-ats-copy-report>Copy report</button>
          <a class="ats-btn ats-btn--tertiary" href="/resume-builder/templates/">Open Resume Builder →</a>
        </div>
      </article>
    `;
    showExamples(report);

    const flash = (btn, text, reset) => {
      btn.textContent = text;
      setTimeout(() => (btn.textContent = reset), 1600);
    };
    const copyBtn = result.querySelector("[data-ats-copy]");
    const summaryEl = result.querySelector("[data-ats-summary]");
    if (copyBtn && summaryEl) {
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(summaryEl.textContent || "");
          flash(copyBtn, "Copied", "Copy");
        } catch (_e) {
          flash(copyBtn, "Copy failed", "Copy");
        }
      });
    }
    const regenBtn = result.querySelector("[data-ats-regen]");
    if (regenBtn && summaryEl) {
      let at = 0;
      regenBtn.addEventListener("click", () => {
        at = (at + 1) % report.summaries.length;
        summaryEl.textContent = report.summaries[at];
      });
    }
    const reportBtn = result.querySelector("[data-ats-copy-report]");
    if (reportBtn) {
      reportBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(reportText(report, summaryEl ? summaryEl.textContent : ""));
          flash(reportBtn, "Report copied", "Copy report");
        } catch (_e) {
          flash(reportBtn, "Copy failed", "Copy report");
        }
      });
    }
    result.querySelector("[data-ats-reset]")?.addEventListener("click", resetChecker);
    result.querySelector("[data-ats-add-jd]")?.addEventListener("click", () => {
      (jdBlock || jdInput).scrollIntoView({ behavior: "smooth", block: "center" });
      jdInput.focus({ preventScroll: true });
    });
    if (resultPanel) resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function reportText(report, summary) {
    const lines = [`ATS check · ${report.score}/100 · ${report.label}`, report.comments.overall, ""];
    if (report.topFixes.length) {
      lines.push("Fix these first:");
      report.topFixes.forEach((f, i) => lines.push(`${i + 1}. ${f.title} - ${f.why}`));
      lines.push("");
    }
    lines.push(`${report.jdMode ? "Matched keywords" : "Skills found"}: ${report.matched.join(", ") || "none"}`);
    if (report.missing.length) lines.push(`${report.jdMode ? "Missing" : "Possible gaps"}: ${report.missing.join(", ")}`);
    if (report.ranking.length) {
      lines.push("", "Structure issues:");
      report.ranking.forEach((r) => lines.push(`- ${r.title} (${r.severity}): ${r.evidence}`));
    }
    if (summary) lines.push("", "Suggested summary:", summary);
    lines.push("", "Local estimate from infoparkdaily.online/ats-checker/, not an employer ATS.");
    return lines.join("\n");
  }

  /* "Check another resume": clear the resume, keep any job description, back to the start. */
  function resetChecker() {
    resumeText = "";
    lastExtract = null;
    if (pasteResume) pasteResume.value = "";
    fileInput.value = "";
    drop.classList.remove("is-ready");
    if (fileHint) fileHint.textContent = "PDF, DOCX or TXT · 5MB";
    setFieldError(resumeError, resumeBlock, "");
    result.hidden = true;
    result.innerHTML = "";
    if (empty) empty.hidden = false;
    document.querySelector(".ats-layout")?.classList.remove("is-scored");
    document.body.classList.remove("ats-has-report");
    syncEnabled();
    (resumeBlock || drop).scrollIntoView({ behavior: "smooth", block: "start" });
    drop.focus({ preventScroll: true });
  }

  const FIX_SECTIONS = {
    "Use of personal details": "personal",
    "Missing email in plain text": "personal",
    "Missing phone number": "personal",
    "Incomplete standard sections": "summary",
    "Use ATS headings": "summary",
    "Rewrite weak bullets": "experience",
    "Add missing JD keywords": "skills",
  };

  function fixLink(title) {
    const section = FIX_SECTIONS[title];
    if (!section) return "";
    return `<a class="ats-fix-link" href="/resume-builder/my-resumes/" data-fix-section="${section}">Fix this in Resume Builder →</a>`;
  }

  function fitWhy(fix) {
    return fix.why || "";
  }

  async function handleFile(file) {
    try {
      readingFile = true;
      lastExtract = null;
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
      const name = String(file.name || "").toLowerCase();
      const kind = name.endsWith(".pdf") ? "pdf" : name.endsWith(".docx") ? "docx" : name.endsWith(".txt") ? "txt" : "other";
      window.IPDAnalytics?.trackAtsCheckStart?.(kind);
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
      lastExtract = null;
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
    try {
      window.IPDAnalytics?.trackAtsCheckComplete?.(report);
    } catch (_e) {
      /* ignore */
    }
    syncEnabled();
    if (result) {
      result.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  result.addEventListener("click", (event) => {
    const link = event.target.closest && event.target.closest("[data-fix-section]");
    if (!link) return;
    try {
      sessionStorage.setItem("ipd-rb-section", link.getAttribute("data-fix-section"));
    } catch (_e) {
      /* the builder still opens, at its usual section */
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
        const note = document.createElement("p");
        note.className = "ats-job-note";
        note.textContent = `Job description loaded for ${storedTitle.replace(/\.+$/, "")}. Now add your resume.`;
        jdInput.insertAdjacentElement("beforebegin", note);
        sessionStorage.removeItem("ipd-ats-title");
      }
    }
  } catch (_e) {
    /* ignore */
  }

  syncEnabled();

  /* Read-only hook so the scoring rules can be checked against sample resumes in tests. */
  window.IPDAtsChecker = { scoreResume };
})();
