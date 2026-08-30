(() => {
  const MONTHS = {
    january: 0,
    jan: 0,
    february: 1,
    feb: 1,
    march: 2,
    mar: 2,
    april: 3,
    apr: 3,
    may: 4,
    june: 5,
    jun: 5,
    july: 6,
    jul: 6,
    august: 7,
    aug: 7,
    september: 8,
    sep: 8,
    sept: 8,
    october: 9,
    oct: 9,
    november: 10,
    nov: 10,
    december: 11,
    dec: 11
  };

  const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const MONTH_LABELS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const calendarEl = document.getElementById("today-calendar");
  const weekStripEl = document.getElementById("today-week-strip");
  const monthLabelEl = document.getElementById("today-month-label");
  const monthSubEl = document.getElementById("today-month-sub");
  const dayTitleEl = document.getElementById("today-day-title");
  const dayCountEl = document.getElementById("today-day-count");
  const dayListEl = document.getElementById("today-day-list");
  const emptyEl = document.getElementById("today-day-empty");
  const prevBtn = document.getElementById("today-prev-month");
  const nextBtn = document.getElementById("today-next-month");
  const jumpTodayBtn = document.getElementById("today-jump-today");
  const statTodayEl = document.getElementById("today-stat-today");
  const statWeekEl = document.getElementById("today-stat-week");
  const statMonthEl = document.getElementById("today-stat-month");

  if (!calendarEl || !dayListEl) return;

  const jobs = Array.isArray(globalThis.JOBS) ? globalThis.JOBS : [];

  let viewYear;
  let viewMonth;
  let selectedKey;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function toKey(y, m, d) {
    return `${y}-${pad(m + 1)}-${pad(d)}`;
  }

  function todayKey() {
    const now = new Date();
    return toKey(now.getFullYear(), now.getMonth(), now.getDate());
  }

  function parseKey(key) {
    const [y, m, d] = String(key || "")
      .split("-")
      .map((n) => parseInt(n, 10));
    if (!y || !m || !d) return null;
    return { y, m: m - 1, d };
  }

  function addDays(key, delta) {
    const parts = parseKey(key);
    if (!parts) return key;
    const dt = new Date(parts.y, parts.m, parts.d);
    dt.setDate(dt.getDate() + delta);
    return toKey(dt.getFullYear(), dt.getMonth(), dt.getDate());
  }

  function formatLong(key) {
    const parts = parseKey(key);
    if (!parts) return "";
    const dt = new Date(parts.y, parts.m, parts.d);
    return dt.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function formatShortDay(key) {
    const parts = parseKey(key);
    if (!parts) return "";
    const dt = new Date(parts.y, parts.m, parts.d);
    return dt.toLocaleDateString("en-IN", { weekday: "short" });
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

  function daysInMonth(y, m) {
    return new Date(y, m + 1, 0).getDate();
  }

  function startWeekdayMon0(y, m) {
    const sun0 = new Date(y, m, 1).getDay();
    return (sun0 + 6) % 7;
  }

  function parseSingleDate(raw, fallbackYear) {
    const text = String(raw || "")
      .replace(/^[A-Za-z]+,\s*/g, "")
      .trim();
    if (!text) return null;

    const m = text.match(/^(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)(?:\s+(\d{4}))?$/i);
    if (!m) return null;

    const day = parseInt(m[1], 10);
    const month = MONTHS[m[2].toLowerCase()];
    const year = m[3] ? parseInt(m[3], 10) : fallbackYear;
    if (!Number.isFinite(day) || month == null || !Number.isFinite(year)) return null;
    if (day < 1 || day > 31) return null;
    return { y: year, m: month, d: day };
  }

  function expandRange(start, end) {
    const out = [];
    const a = new Date(start.y, start.m, start.d);
    const b = new Date(end.y, end.m, end.d);
    if (b < a) return out;
    const cursor = new Date(a);
    let guard = 0;
    while (cursor <= b && guard < 120) {
      out.push(toKey(cursor.getFullYear(), cursor.getMonth(), cursor.getDate()));
      cursor.setDate(cursor.getDate() + 1);
      guard += 1;
    }
    return out;
  }

  function parseWalkInDateKeys(text) {
    const raw = String(text || "").trim();
    if (!raw) return [];

    const normalized = raw
      .replace(/\u2013|\u2014|–|—/g, "-")
      .replace(/\s+to\s+/gi, " - ")
      .replace(/\s+&\s+/g, " | ")
      .replace(/\s+and\s+/gi, " | ");

    const keys = new Set();

    const rangeMatch = normalized.match(
      /^(\d{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+(?:\s+\d{4})?)\s*-\s*(\d{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+(?:\s+\d{4})?)$/i
    );
    if (rangeMatch) {
      const end = parseSingleDate(rangeMatch[2], new Date().getFullYear());
      const start = parseSingleDate(rangeMatch[1], end?.y || new Date().getFullYear());
      if (start && end) {
        if (!/\d{4}/.test(rangeMatch[1]) && end) start.y = end.y;
        expandRange(start, end).forEach((k) => keys.add(k));
        return [...keys];
      }
    }

    const chunks = normalized.split(/\s*\|\s*/).filter(Boolean);
    let lastYear = new Date().getFullYear();
    chunks.forEach((chunk) => {
      const parsed = parseSingleDate(chunk, lastYear);
      if (!parsed) return;
      lastYear = parsed.y;
      keys.add(toKey(parsed.y, parsed.m, parsed.d));
    });

    return [...keys];
  }

  function isWalkInJob(job) {
    return Boolean(job.isWalkIn || job.walkin || job.walkinDates || job.walkInDate);
  }

  function walkInText(job) {
    return job.walkinDates || job.walkInDate || "";
  }

  function jobHref(job) {
    const id = job.id || String(job.company || "").toLowerCase().replace(/\s+/g, "-");
    return `/job/${encodeURIComponent(id)}`;
  }

  function companySlug(name) {
    return String(name || "")
      .trim()
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function companyPath(name) {
    const slug = companySlug(name);
    return slug ? `/company/${encodeURIComponent(slug)}/` : "/jobs/";
  }

  function isExpired(job) {
    const raw = job.applyDeadline;
    if (!raw || raw === "Rolling") return false;
    const d = new Date(`${raw}T00:00:00`);
    if (Number.isNaN(d.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
  }

  function shortTime(value) {
    const text = String(value || "").replace(/\s+/g, " ").trim();
    if (!text) return "";
    // Prefer first clock token for the agenda rail
    const m = text.match(/\d{1,2}:\d{2}\s*(?:AM|PM)?/i);
    return m ? m[0] : text.split("–")[0].split("-")[0].trim().slice(0, 14);
  }

  function isIsoDate(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(String(value || "").trim());
  }

  function formatIsoShort(value) {
    if (!isIsoDate(value)) return String(value || "").trim();
    const [y, m, d] = String(value).split("-").map((n) => parseInt(n, 10));
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  function jobKey(job) {
    return String(job.id || `${job.company || ""}|${(job.roles || [])[0] || ""}`);
  }

  function kindRank(kinds) {
    if (kinds.includes("walk-in")) return 0;
    if (kinds.includes("deadline")) return 1;
    if (kinds.includes("posted")) return 2;
    return 3;
  }

  function primaryKind(kinds) {
    if (kinds.includes("walk-in")) return "walk-in";
    if (kinds.includes("deadline")) return "deadline";
    if (kinds.includes("posted")) return "posted";
    return "posted";
  }

  function openCount(key) {
    const list = byDate.get(key) || [];
    return list.filter((item) => !item.expired).length || list.length;
  }

  function pushKind(map, key, job, kind) {
    if (!key || !isIsoDate(key)) return;
    if (!map.has(key)) map.set(key, []);
    const list = map.get(key);
    const id = jobKey(job);
    let entry = list.find((item) => jobKey(item.job) === id);
    if (!entry) {
      entry = {
        job,
        dateKey: key,
        kinds: [],
        expired: isExpired(job)
      };
      list.push(entry);
    }
    if (!entry.kinds.includes(kind)) entry.kinds.push(kind);
    entry.expired = isExpired(job);
  }

  function buildIndex() {
    const map = new Map();

    jobs.forEach((job) => {
      if (isWalkInJob(job)) {
        const keys = parseWalkInDateKeys(walkInText(job));
        keys.forEach((key) => pushKind(map, key, job, "walk-in"));
      }

      const posted = String(job.postedDate || "").trim();
      if (isIsoDate(posted)) pushKind(map, posted, job, "posted");

      const deadline = String(job.applyDeadline || "").trim();
      if (isIsoDate(deadline) && deadline !== "Rolling") {
        pushKind(map, deadline, job, "deadline");
      }
    });

    map.forEach((list) => {
      list.sort((a, b) => {
        const byKind = kindRank(a.kinds) - kindRank(b.kinds);
        if (byKind !== 0) return byKind;
        return String(a.job.company || "").localeCompare(String(b.job.company || ""));
      });
    });

    return map;
  }

  const byDate = buildIndex();

  function countForMonth(y, m) {
    let n = 0;
    const dim = daysInMonth(y, m);
    for (let d = 1; d <= dim; d += 1) {
      n += openCount(toKey(y, m, d));
    }
    return n;
  }

  function countRange(startKey, days) {
    let n = 0;
    for (let i = 0; i < days; i += 1) n += openCount(addDays(startKey, i));
    return n;
  }

  function renderStats() {
    const today = todayKey();
    if (statTodayEl) statTodayEl.textContent = String(openCount(today));
    if (statWeekEl) statWeekEl.textContent = String(countRange(today, 7));
    if (statMonthEl) {
      const now = new Date();
      statMonthEl.textContent = String(countForMonth(now.getFullYear(), now.getMonth()));
    }
  }

  function renderWeekStrip() {
    if (!weekStripEl) return;
    const today = todayKey();
    const cells = [];
    for (let i = 0; i < 7; i += 1) {
      const key = addDays(today, i);
      const parts = parseKey(key);
      const count = openCount(key);
      const classes = [
        "today-week-day",
        count ? "has-events" : "",
        key === today ? "is-today" : "",
        key === selectedKey ? "is-selected" : ""
      ]
        .filter(Boolean)
        .join(" ");
      cells.push(`
        <button
          type="button"
          class="${classes}"
          data-date="${escapeAttr(key)}"
          aria-pressed="${key === selectedKey ? "true" : "false"}"
          aria-label="${escapeAttr(formatLong(key))}${count ? `, ${count} openings` : ""}"
        >
          <span class="today-week-dow">${escapeHtml(formatShortDay(key))}</span>
          <span class="today-week-num">${parts ? parts.d : ""}</span>
          <span class="today-week-count">${count ? `${count} live` : "—"}</span>
        </button>
      `);
    }
    weekStripEl.innerHTML = cells.join("");
  }

  function renderCalendar() {
    const monthCount = countForMonth(viewYear, viewMonth);
    if (monthLabelEl) monthLabelEl.textContent = `${MONTH_LABELS[viewMonth]} ${viewYear}`;
    if (monthSubEl) {
      monthSubEl.textContent =
        monthCount > 0
          ? `${monthCount} hiring date${monthCount === 1 ? "" : "s"} this month`
          : "No hiring dates marked this month";
    }

    const dim = daysInMonth(viewYear, viewMonth);
    const offset = startWeekdayMon0(viewYear, viewMonth);
    const today = todayKey();
    const cells = [];

    WEEKDAYS.forEach((label) => {
      cells.push(`<span class="today-cal-dow" aria-hidden="true">${label}</span>`);
    });

    for (let i = 0; i < offset; i += 1) {
      cells.push(`<span class="today-cal-cell today-cal-cell--empty" aria-hidden="true"></span>`);
    }

    for (let d = 1; d <= dim; d += 1) {
      const key = toKey(viewYear, viewMonth, d);
      const count = openCount(key);
      const isToday = key === today;
      const isSelected = key === selectedKey;
      const classes = [
        "today-cal-cell",
        count ? "has-events" : "",
        isToday ? "is-today" : "",
        isSelected ? "is-selected" : ""
      ]
        .filter(Boolean)
        .join(" ");

      cells.push(`
        <button
          type="button"
          class="${classes}"
          data-date="${escapeAttr(key)}"
          aria-pressed="${isSelected ? "true" : "false"}"
          aria-label="${escapeAttr(formatLong(key))}${count ? `, ${count} opening${count === 1 ? "" : "s"}` : ""}"
        >
          <span class="today-cal-daynum">${d}</span>
          ${count ? `<span class="today-cal-dot" aria-hidden="true">${count > 9 ? "9+" : count}</span>` : ""}
        </button>
      `);
    }

    calendarEl.innerHTML = cells.join("");
  }

  function kindBadgesHtml(kinds, expired) {
    if (expired) {
      return `<span class="today-interview-badge today-interview-badge--expired">Expired</span>`;
    }
    const order = ["walk-in", "deadline", "posted"];
    const labels = {
      "walk-in": { text: "Walk-in", className: "" },
      deadline: { text: "Apply by", className: "today-interview-badge--deadline" },
      posted: { text: "Published", className: "today-interview-badge--posted" }
    };
    return order
      .filter((k) => kinds.includes(k))
      .map((k) => {
        const meta = labels[k];
        return `<span class="today-interview-badge${meta.className ? ` ${meta.className}` : ""}">${meta.text}</span>`;
      })
      .join("");
  }

  function railForItem(item) {
    const kind = primaryKind(item.kinds);
    if (kind === "walk-in") {
      return shortTime(item.job.walkinTime) || "Walk-in";
    }
    if (kind === "deadline") return "Apply by";
    return "Published";
  }

  function railSubForItem(item) {
    if (item.expired) return "Closed";
    const kind = primaryKind(item.kinds);
    if (kind === "walk-in") return "Drive";
    if (kind === "deadline") return "Deadline";
    return "Posted";
  }

  function renderDayList() {
    const items = byDate.get(selectedKey) || [];
    const openItems = items.filter((item) => !item.expired);
    const show = openItems.length ? openItems : items;

    if (dayTitleEl) dayTitleEl.textContent = formatLong(selectedKey);
    if (dayCountEl) {
      dayCountEl.textContent =
        show.length === 0
          ? "No openings"
          : `${show.length} opening${show.length === 1 ? "" : "s"}`;
    }

    if (!show.length) {
      dayListEl.innerHTML = "";
      if (emptyEl) emptyEl.hidden = false;
      return;
    }

    if (emptyEl) emptyEl.hidden = true;

    dayListEl.innerHTML = show
      .map((item, index) => {
        const { job, expired, kinds } = item;
        const role = (job.roles && job.roles[0]) || "Hiring";
        const time = job.walkinTime || "";
        const venue = job.walkinLocation || job.address || job.location || "";
        const when = walkInText(job);
        const posted = String(job.postedDate || "").trim();
        const deadline = String(job.applyDeadline || "").trim();
        const showWalkMeta = kinds.includes("walk-in");
        return `
          <article class="today-interview-card${expired ? " is-expired" : ""}" style="animation-delay: ${Math.min(index, 6) * 45}ms">
            <div class="today-interview-time">
              <strong>${escapeHtml(railForItem(item))}</strong>
              <span>${escapeHtml(railSubForItem(item))}</span>
            </div>
            <div class="today-interview-body">
              <header class="today-interview-head">
                <div>
                  <p class="today-interview-company">
                    ${
                      job.company
                        ? `<a class="job-company-link" href="${escapeAttr(companyPath(job.company))}">${escapeHtml(
                            job.company
                          )}</a>`
                        : ""
                    }
                  </p>
                  <h3 class="today-interview-role">${escapeHtml(role)}</h3>
                </div>
                <div class="today-interview-badges">${kindBadgesHtml(kinds, expired)}</div>
              </header>
              <ul class="today-interview-meta">
                ${
                  posted
                    ? `<li><span>Published</span><strong>${escapeHtml(formatIsoShort(posted))}</strong></li>`
                    : ""
                }
                ${
                  deadline
                    ? `<li><span>Apply by</span><strong>${escapeHtml(
                        deadline === "Rolling" ? "Rolling" : formatIsoShort(deadline)
                      )}</strong></li>`
                    : ""
                }
                ${showWalkMeta && when ? `<li><span>Walk-in</span><strong>${escapeHtml(when)}</strong></li>` : ""}
                ${showWalkMeta && time ? `<li><span>Time</span><strong>${escapeHtml(time)}</strong></li>` : ""}
                ${venue ? `<li><span>Venue</span><strong>${escapeHtml(venue)}</strong></li>` : ""}
                ${
                  job.experienceRange || job.experienceYears
                    ? `<li><span>Exp</span><strong>${escapeHtml(
                        job.experienceRange || job.experienceYears
                      )}</strong></li>`
                    : ""
                }
              </ul>
              <footer class="today-interview-actions">
                <a class="btn btn-primary" href="${escapeAttr(jobHref(job))}">View Details</a>
              </footer>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function selectDate(key, opts = {}) {
    if (!key || !/^\d{4}-\d{2}-\d{2}$/.test(key)) return;
    selectedKey = key;
    const parts = parseKey(key);
    if (parts) {
      viewYear = parts.y;
      viewMonth = parts.m;
    }
    renderCalendar();
    renderWeekStrip();
    renderDayList();
    try {
      const url = new URL(globalThis.location.href);
      url.searchParams.set("date", key);
      globalThis.history.replaceState({}, "", url);
    } catch {
      /* ignore */
    }
    if (opts.scrollAgenda) {
      document.getElementById("today-day-title")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  function initFromUrl() {
    const params = new URLSearchParams(globalThis.location.search);
    const q = params.get("date");
    const today = todayKey();
    if (q && /^\d{4}-\d{2}-\d{2}$/.test(q)) {
      selectedKey = q;
    } else {
      selectedKey = today;
    }
    const parts = parseKey(selectedKey) || parseKey(today);
    viewYear = parts.y;
    viewMonth = parts.m;
  }

  function isOpenJob(job) {
    const deadline = String(job.applyDeadline || "").trim();
    if (!deadline || deadline === "Rolling") return true;
    return deadline >= todayKey();
  }

  function parkLabel(job) {
    const loc = String(job.location || job.source || "").toLowerCase();
    if (loc.includes("technopark")) return "Technopark";
    if (loc.includes("cyberpark")) return "Cyberpark";
    if (loc.includes("infopark")) return "Infopark";
    return job.source || job.location || "Kerala IT park";
  }

  function walkinParkGroup(job) {
    const park = parkLabel(job);
    if (park === "Infopark" || park === "Technopark") return park;
    return "Other";
  }

  function walkInSortKey(job) {
    const keys = parseWalkInDateKeys(walkInText(job)).filter(Boolean).sort();
    if (keys.length) return keys[0];
    const deadline = String(job.applyDeadline || "").trim();
    if (isIsoDate(deadline)) return deadline;
    const posted = String(job.postedDate || "").trim();
    return isIsoDate(posted) ? posted : "9999-12-31";
  }

  function classifyEntryRole(job) {
    const title = (job.roles || []).join(" ").toLowerCase();
    const exp = String(job.experience || "").toLowerCase();
    const range = String(job.experienceRange || job.experienceYears || "").toLowerCase();

    const intern = /\bintern(?:ship)?s?\b|\bapprentices?/.test(title);

    const fresher =
      exp === "fresher" ||
      /\bfresher|\btrainee|\bgraduate/.test(title) ||
      /\b0\s*[-–to]{1,3}\s*[012]\s*year/.test(`${title} ${range}`) ||
      (/\b(junior|jr\.|jr )\b/.test(title) && exp !== "experienced");

    if (intern) return "intern";
    if (fresher) return "fresher";
    return "";
  }

  function matchesFreshersQuery(job, query) {
    if (!query) return true;
    const hay = [
      job.company,
      ...(job.roles || []),
      job.location,
      job.source,
      job.experienceRange,
      job.employmentType
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(query);
  }

  function initFreshersBoard() {
    const panel = document.getElementById("today-freshers");
    const board = document.querySelector(".today-board");
    const btn = document.getElementById("today-freshers-btn");
    const groupsEl = document.getElementById("today-freshers-groups");
    const emptyEl = document.getElementById("today-freshers-empty");
    const countEl = document.getElementById("today-freshers-count");
    const searchEl = document.getElementById("today-freshers-q");
    const nAll = document.getElementById("today-freshers-n-all");
    const nIntern = document.getElementById("today-freshers-n-intern");
    const nFresher = document.getElementById("today-freshers-n-fresher");
    if (!panel || !btn || !groupsEl) return;

    const catalog = jobs
      .map((job) => ({ job, kind: classifyEntryRole(job) }))
      .filter((row) => row.kind && isOpenJob(row.job));

    let kind = "all";
    let query = "";

    function setUrlView(open) {
      try {
        const url = new URL(globalThis.location.href);
        if (open) url.searchParams.set("view", "freshers");
        else if (url.searchParams.get("view") === "freshers") url.searchParams.delete("view");
        if (open && kind !== "all") url.searchParams.set("kind", kind);
        else url.searchParams.delete("kind");
        globalThis.history.replaceState({}, "", url);
      } catch {
        /* ignore */
      }
    }

    function setOpen(open) {
      if (open) {
        const walkinsPanel = document.getElementById("today-walkins");
        const walkinsBtn = document.getElementById("today-walkins-btn");
        if (walkinsPanel) walkinsPanel.hidden = true;
        if (walkinsBtn) {
          walkinsBtn.setAttribute("aria-pressed", "false");
          walkinsBtn.textContent = "Walk-in Drive";
        }
        document.body.classList.remove("today-walkins-open");
      }
      panel.hidden = !open;
      if (board) board.hidden = open;
      btn.setAttribute("aria-pressed", open ? "true" : "false");
      btn.textContent = open ? "Back to calendar" : "Freshers Hiring";
      document.body.classList.toggle("today-freshers-open", open);
      setUrlView(open);
      if (open) {
        renderFreshers();
        panel.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    function renderFreshers() {
      const internRows = catalog.filter((row) => row.kind === "intern" && matchesFreshersQuery(row.job, query));
      const fresherRows = catalog.filter((row) => row.kind === "fresher" && matchesFreshersQuery(row.job, query));
      if (nAll) nAll.textContent = String(internRows.length + fresherRows.length);
      if (nIntern) nIntern.textContent = String(internRows.length);
      if (nFresher) nFresher.textContent = String(fresherRows.length);

      const sections = [];
      if (kind !== "fresher") sections.push({ key: "intern", title: "Internships & intern roles", rows: internRows });
      if (kind !== "intern") sections.push({ key: "fresher", title: "Fresher & trainee jobs", rows: fresherRows });

      const visible = sections.reduce((sum, section) => sum + section.rows.length, 0);
      if (countEl) {
        countEl.textContent = visible === 0 ? "No openings" : `${visible} open role${visible === 1 ? "" : "s"}`;
      }

      if (!visible) {
        groupsEl.innerHTML = "";
        if (emptyEl) emptyEl.hidden = false;
        return;
      }

      if (emptyEl) emptyEl.hidden = true;
      groupsEl.innerHTML = sections
        .filter((section) => section.rows.length)
        .map((section) => {
          const cards = section.rows
            .map((row) => {
              const { job } = row;
              const role = (job.roles && job.roles[0]) || "Open role";
              const deadline = String(job.applyDeadline || "").trim();
              const posted = String(job.postedDate || "").trim();
              const kindLabel = row.kind === "intern" ? "Internship" : "Fresher";
              return `
                <article class="today-fresher-card">
                  <div class="today-fresher-card-top">
                    <span class="today-fresher-kind today-fresher-kind--${row.kind}">${kindLabel}</span>
                    <span class="today-fresher-park">${escapeHtml(parkLabel(job))}</span>
                  </div>
                  <h4>${escapeHtml(role)}</h4>
                  <p class="today-fresher-company">${
                    job.company
                      ? `<a class="job-company-link" href="${escapeAttr(companyPath(job.company))}">${escapeHtml(
                          job.company
                        )}</a>`
                      : ""
                  }</p>
                  <ul class="today-fresher-meta">
                    ${
                      deadline
                        ? `<li><span>Apply by</span>${escapeHtml(
                            deadline === "Rolling" ? "Rolling" : formatIsoShort(deadline)
                          )}</li>`
                        : ""
                    }
                    ${posted ? `<li><span>Posted</span>${escapeHtml(formatIsoShort(posted))}</li>` : ""}
                    ${
                      job.experienceRange || job.experienceYears
                        ? `<li><span>Level</span>${escapeHtml(job.experienceRange || job.experienceYears)}</li>`
                        : ""
                    }
                  </ul>
                  <a class="btn btn-primary" href="${escapeAttr(jobHref(job))}">View details</a>
                </article>
              `;
            })
            .join("");
          return `
            <section class="today-freshers-group" aria-label="${escapeAttr(section.title)}">
              <h3>${escapeHtml(section.title)} <span class="today-freshers-group-count">· ${section.rows.length}</span></h3>
              <div class="today-freshers-grid">${cards}</div>
            </section>
          `;
        })
        .join("");
    }

    panel.querySelectorAll("[data-freshers-kind]").forEach((tab) => {
      tab.addEventListener("click", () => {
        kind = tab.getAttribute("data-freshers-kind") || "all";
        panel.querySelectorAll("[data-freshers-kind]").forEach((other) => {
          const on = other === tab;
          other.classList.toggle("is-active", on);
          other.setAttribute("aria-pressed", on ? "true" : "false");
        });
        setUrlView(true);
        renderFreshers();
      });
    });

    searchEl?.addEventListener("input", () => {
      query = String(searchEl.value || "").trim().toLowerCase();
      renderFreshers();
    });

    btn.addEventListener("click", () => {
      setOpen(panel.hidden);
    });

    const params = new URLSearchParams(globalThis.location.search);
    const startKind = params.get("kind");
    if (startKind === "intern" || startKind === "fresher") {
      kind = startKind;
      const tab = panel.querySelector(`[data-freshers-kind="${kind}"]`);
      if (tab) {
        panel.querySelectorAll("[data-freshers-kind]").forEach((other) => {
          const on = other === tab;
          other.classList.toggle("is-active", on);
          other.setAttribute("aria-pressed", on ? "true" : "false");
        });
      }
    }
    if (params.get("view") === "freshers") setOpen(true);
  }

  function initWalkinsBoard() {
    const panel = document.getElementById("today-walkins");
    const board = document.querySelector(".today-board");
    const btn = document.getElementById("today-walkins-btn");
    const groupsEl = document.getElementById("today-walkins-groups");
    const emptyEl = document.getElementById("today-walkins-empty");
    const countEl = document.getElementById("today-walkins-count");
    const searchEl = document.getElementById("today-walkins-q");
    const nAll = document.getElementById("today-walkins-n-all");
    const nInfopark = document.getElementById("today-walkins-n-infopark");
    const nTechnopark = document.getElementById("today-walkins-n-technopark");
    const nOther = document.getElementById("today-walkins-n-other");
    if (!panel || !btn || !groupsEl) return;

    const catalog = jobs
      .filter((job) => isWalkInJob(job) && isOpenJob(job))
      .sort((a, b) => {
        const byDate = walkInSortKey(a).localeCompare(walkInSortKey(b));
        if (byDate !== 0) return byDate;
        return String(a.company || "").localeCompare(String(b.company || ""));
      });

    let park = "all";
    let query = "";

    function setUrlView(open) {
      try {
        const url = new URL(globalThis.location.href);
        if (open) url.searchParams.set("view", "walkins");
        else if (url.searchParams.get("view") === "walkins") url.searchParams.delete("view");
        if (open && park !== "all") url.searchParams.set("park", park.toLowerCase());
        else url.searchParams.delete("park");
        url.searchParams.delete("kind");
        globalThis.history.replaceState({}, "", url);
      } catch {
        /* ignore */
      }
    }

    function setOpen(open) {
      if (open) {
        const freshersPanel = document.getElementById("today-freshers");
        const freshersBtn = document.getElementById("today-freshers-btn");
        if (freshersPanel) freshersPanel.hidden = true;
        if (freshersBtn) {
          freshersBtn.setAttribute("aria-pressed", "false");
          freshersBtn.textContent = "Freshers Hiring";
        }
        document.body.classList.remove("today-freshers-open");
      }
      panel.hidden = !open;
      if (board) board.hidden = open;
      btn.setAttribute("aria-pressed", open ? "true" : "false");
      btn.textContent = open ? "Back to calendar" : "Walk-in Drive";
      document.body.classList.toggle("today-walkins-open", open);
      setUrlView(open);
      if (open) {
        renderWalkins();
        panel.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    function matchesWalkinsQuery(job, q) {
      if (!query) return true;
      const hay = [
        job.company,
        ...(job.roles || []),
        job.location,
        job.walkinLocation,
        job.address,
        walkInText(job),
        job.walkinTime
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    }

    function renderWalkins() {
      const matching = catalog.filter((job) => matchesWalkinsQuery(job, query));
      const infoparkRows = matching.filter((job) => walkinParkGroup(job) === "Infopark");
      const technoparkRows = matching.filter((job) => walkinParkGroup(job) === "Technopark");
      const otherRows = matching.filter((job) => walkinParkGroup(job) === "Other");
      if (nAll) nAll.textContent = String(matching.length);
      if (nInfopark) nInfopark.textContent = String(infoparkRows.length);
      if (nTechnopark) nTechnopark.textContent = String(technoparkRows.length);
      if (nOther) nOther.textContent = String(otherRows.length);

      const sections = [];
      if (park === "all" || park === "Infopark") {
        sections.push({ title: "Infopark walk-ins", rows: infoparkRows });
      }
      if (park === "all" || park === "Technopark") {
        sections.push({ title: "Technopark walk-ins", rows: technoparkRows });
      }
      if (park === "all" || park === "Other") {
        sections.push({ title: "Other walk-ins", rows: otherRows });
      }

      const visible = sections.reduce((sum, section) => sum + section.rows.length, 0);
      if (countEl) {
        countEl.textContent = visible === 0 ? "No walk-ins" : `${visible} walk-in${visible === 1 ? "" : "s"}`;
      }

      if (!visible) {
        groupsEl.innerHTML = "";
        if (emptyEl) emptyEl.hidden = false;
        return;
      }

      if (emptyEl) emptyEl.hidden = true;
      groupsEl.innerHTML = sections
        .filter((section) => section.rows.length)
        .map((section) => {
          const cards = section.rows
            .map((job) => {
              const role = (job.roles && job.roles[0]) || "Walk-in drive";
              const when = walkInText(job);
              const time = job.walkinTime || "";
              const venue = job.walkinLocation || job.address || job.location || "";
              return `
                <article class="today-fresher-card">
                  <div class="today-fresher-card-top">
                    <span class="today-fresher-kind today-fresher-kind--walkin">Walk-in</span>
                    <span class="today-fresher-park">${escapeHtml(parkLabel(job))}</span>
                  </div>
                  <h4>${escapeHtml(role)}</h4>
                  <p class="today-fresher-company">${
                    job.company
                      ? `<a class="job-company-link" href="${escapeAttr(companyPath(job.company))}">${escapeHtml(
                          job.company
                        )}</a>`
                      : ""
                  }</p>
                  <ul class="today-fresher-meta">
                    ${when ? `<li><span>Dates</span>${escapeHtml(when)}</li>` : ""}
                    ${time ? `<li><span>Time</span>${escapeHtml(time)}</li>` : ""}
                    ${venue ? `<li><span>Venue</span>${escapeHtml(venue)}</li>` : ""}
                  </ul>
                  <a class="btn btn-primary" href="${escapeAttr(jobHref(job))}">View details</a>
                </article>
              `;
            })
            .join("");
          return `
            <section class="today-freshers-group" aria-label="${escapeAttr(section.title)}">
              <h3>${escapeHtml(section.title)} <span class="today-freshers-group-count">· ${section.rows.length}</span></h3>
              <div class="today-freshers-grid">${cards}</div>
            </section>
          `;
        })
        .join("");
    }

    panel.querySelectorAll("[data-walkins-park]").forEach((tab) => {
      tab.addEventListener("click", () => {
        park = tab.getAttribute("data-walkins-park") || "all";
        panel.querySelectorAll("[data-walkins-park]").forEach((other) => {
          const on = other === tab;
          other.classList.toggle("is-active", on);
          other.setAttribute("aria-pressed", on ? "true" : "false");
        });
        setUrlView(true);
        renderWalkins();
      });
    });

    searchEl?.addEventListener("input", () => {
      query = String(searchEl.value || "").trim().toLowerCase();
      renderWalkins();
    });

    btn.addEventListener("click", () => {
      setOpen(panel.hidden);
    });

    const params = new URLSearchParams(globalThis.location.search);
    const startPark = (params.get("park") || "").toLowerCase();
    if (startPark === "infopark" || startPark === "technopark" || startPark === "other") {
      park = startPark === "infopark" ? "Infopark" : startPark === "technopark" ? "Technopark" : "Other";
      const tab = panel.querySelector(`[data-walkins-park="${park}"]`);
      if (tab) {
        panel.querySelectorAll("[data-walkins-park]").forEach((other) => {
          const on = other === tab;
          other.classList.toggle("is-active", on);
          other.setAttribute("aria-pressed", on ? "true" : "false");
        });
      }
    }
    if (params.get("view") === "walkins") setOpen(true);
  }

  let lastPickAt = 0;
  let lastPickKey = "";

  function pickDate(key, opts = {}) {
    if (!key) return;
    const now = Date.now();
    // Dedupe click + pointerup on the same day chip
    if (key === lastPickKey && now - lastPickAt < 350) return;
    lastPickKey = key;
    lastPickAt = now;
    selectDate(key, opts);
  }

  function onDateActivate(ev) {
    const btn = ev.target.closest?.("[data-date]");
    if (!btn || !document.contains(btn)) return;
    if (ev.type === "click" && typeof ev.button === "number" && ev.button !== 0) return;
    const key = btn.getAttribute("data-date");
    const fromWeek = Boolean(btn.closest("#today-week-strip"));
    pickDate(key, { scrollAgenda: fromWeek });
  }

  // Board-level delegation so week strip + month grid always receive taps
  const boardEl = document.querySelector(".today-board");
  boardEl?.addEventListener("click", onDateActivate);

  // Scrollable week strip on iOS can swallow click — capture pointerup too
  weekStripEl?.addEventListener("pointerup", (ev) => {
    if (ev.pointerType === "mouse" && ev.button !== 0) return;
    const btn = ev.target.closest?.("[data-date]");
    if (!btn || !weekStripEl.contains(btn)) return;
    pickDate(btn.getAttribute("data-date"), { scrollAgenda: true });
  });

  prevBtn?.addEventListener("click", () => {
    viewMonth -= 1;
    if (viewMonth < 0) {
      viewMonth = 11;
      viewYear -= 1;
    }
    renderCalendar();
  });

  nextBtn?.addEventListener("click", () => {
    viewMonth += 1;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear += 1;
    }
    renderCalendar();
  });

  jumpTodayBtn?.addEventListener("click", () => {
    const freshersPanel = document.getElementById("today-freshers");
    const walkinsPanel = document.getElementById("today-walkins");
    const freshersBtn = document.getElementById("today-freshers-btn");
    const walkinsBtn = document.getElementById("today-walkins-btn");
    const board = document.querySelector(".today-board");
    if (freshersPanel) freshersPanel.hidden = true;
    if (walkinsPanel) walkinsPanel.hidden = true;
    if (freshersBtn) {
      freshersBtn.setAttribute("aria-pressed", "false");
      freshersBtn.textContent = "Freshers Hiring";
    }
    if (walkinsBtn) {
      walkinsBtn.setAttribute("aria-pressed", "false");
      walkinsBtn.textContent = "Walk-in Drive";
    }
    if (board) board.hidden = false;
    document.body.classList.remove("today-freshers-open", "today-walkins-open");
    selectDate(todayKey(), { scrollAgenda: true });
  });

  initFromUrl();
  renderStats();
  renderCalendar();
  renderWeekStrip();
  renderDayList();
  initFreshersBoard();
  initWalkinsBoard();
})();
