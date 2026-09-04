/**
 * Shared job actions: save, share, report, relative time, recently viewed.
 */
(function () {
  const SAVED_KEY = "ipd-saved-jobs-v1";
  const VIEWED_KEY = "ipd-recent-jobs-v1";

  function readIds(key) {
    try {
      const list = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(list) ? list.map(String).filter(Boolean) : [];
    } catch (_e) {
      return [];
    }
  }

  function writeIds(key, ids) {
    try {
      localStorage.setItem(key, JSON.stringify(ids.slice(0, 80)));
    } catch (_e) {
      /* quota / private mode */
    }
  }

  function savedIds() {
    return readIds(SAVED_KEY);
  }

  function isSaved(id) {
    return savedIds().includes(String(id || ""));
  }

  function toggleSave(id) {
    const key = String(id || "");
    if (!key) return false;
    const list = savedIds();
    const idx = list.indexOf(key);
    if (idx >= 0) list.splice(idx, 1);
    else list.unshift(key);
    writeIds(SAVED_KEY, list);
    return idx < 0;
  }

  function recordView(id) {
    const key = String(id || "");
    if (!key) return;
    const list = readIds(VIEWED_KEY).filter((item) => item !== key);
    list.unshift(key);
    writeIds(VIEWED_KEY, list);
  }

  function recentlyViewedIds() {
    return readIds(VIEWED_KEY);
  }

  function shareText(job) {
    const role = (job.roles && job.roles[0]) || "Job opening";
    const loc = job.location ? `📍 ${job.location}` : "";
    const exp = job.experienceRange || job.experienceYears || "";
    const deadline =
      job.applyDeadline && job.applyDeadline !== "Rolling"
        ? `⏳ Apply before ${job.applyDeadline}`
        : job.applyDeadline === "Rolling"
          ? "⏳ Rolling deadline"
          : "";
    const url =
      job.shareUrl ||
      `https://infoparkdaily.online/job/${encodeURIComponent(job.id)}/`;
    return [
      `${role} — ${job.company || "Hiring"}`,
      loc,
      exp ? `💼 ${exp}` : "",
      deadline,
      "",
      "View details & apply:",
      url
    ]
      .filter((line, i, arr) => line || arr[i - 1])
      .join("\n")
      .replace(/\n{3,}/g, "\n\n");
  }

  async function shareJob(job) {
    const text = shareText(job);
    const url =
      job.shareUrl ||
      `https://infoparkdaily.online/job/${encodeURIComponent(job.id || "")}/`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${(job.roles && job.roles[0]) || "Job"} — ${job.company || "InfoparkDaily"}`,
          text,
          url
        });
        return true;
      }
    } catch (err) {
      if (err && err.name === "AbortError") return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      return "copied";
    } catch (_e) {
      window.prompt("Copy this job link", url);
      return "copied";
    }
  }

  function reportJob(job) {
    const role = (job.roles && job.roles[0]) || "this listing";
    const url =
      job.shareUrl ||
      `https://infoparkdaily.online/job/${encodeURIComponent(job.id || "")}/`;
    const subject = `Report listing — ${job.company || ""} — ${role}`;
    const body = [
      "I want to report this InfoparkDaily listing.",
      "",
      `Company: ${job.company || ""}`,
      `Role: ${role}`,
      `Job ID: ${job.id || ""}`,
      `Page: ${url}`,
      "",
      "Reason (expired / incorrect / spam / other):",
      ""
    ].join("\n");
    window.location.href =
      "mailto:infoparkstorieskochi@gmail.com?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
  }

  function postedAgo(iso) {
    if (!iso) return "";
    const date = new Date(/T/.test(iso) ? iso : `${iso}T00:00:00`);
    if (Number.isNaN(date.getTime())) return `Posted ${iso}`;
    const now = new Date();
    const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startPosted = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const days = Math.round((startToday - startPosted) / 86400000);
    if (days <= 0) return "Posted today";
    if (days === 1) return "Posted yesterday";
    if (days < 14) return `Posted ${days}d ago`;
    return `Posted ${date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`;
  }

  function lastCheckedLabel(job) {
    const raw = job.lastVerified || job.verifiedAt || job.postedDate || "";
    if (!raw) return "";
    const date = new Date(/T/.test(raw) ? raw : `${raw}T20:00:00`);
    if (Number.isNaN(date.getTime())) return String(raw);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  }

  function markTone(name) {
    const tones = ["navy", "teal", "indigo", "slate", "forest", "wine", "ocean", "bronze"];
    const s = String(name || "");
    let hash = 0;
    for (let i = 0; i < s.length; i += 1) hash = (hash * 33 + s.charCodeAt(i)) >>> 0;
    return tones[hash % tones.length];
  }

  window.IPDJobActions = {
    savedIds,
    isSaved,
    toggleSave,
    recordView,
    recentlyViewedIds,
    shareJob,
    shareText,
    reportJob,
    postedAgo,
    lastCheckedLabel,
    markTone
  };
})();
