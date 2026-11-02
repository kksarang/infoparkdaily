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

  const OWNER_KEY = "ipd-saved-owner-v1";
  const PENDING_KEY = "ipd-saved-pending-v1";
  const SYNC_FLAG_KEY = "ipd-saved-sync-v1";
  const PROMPT_KEY = "ipd-saved-prompt-dismissed-v1";
  const MAX_SAVED = 200;
  const PROMPT_AT = 3;
  const CLOUD_MODULE = "/js/saved-jobs-cloud.bundle.js?v=20261102save2";
  const SIGN_IN_URL = "/resume-builder/sign-in/?next=" + encodeURIComponent("/jobs/saved/");
  const isSavedPage = () => window.IPD_SAVED_ONLY === true;

  let cloud = null;
  let syncState = "loading"; // loading | guest | unverified | account | error
  let accountEmail = "";
  let flushing = Promise.resolve();

  function storageGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (_e) {
      return null;
    }
  }

  function storageSet(key, value) {
    try {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    } catch (_e) {
      /* quota / private mode */
    }
  }

  function savedIds() {
    return readIds(SAVED_KEY);
  }

  function setSavedIds(ids) {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(ids.slice(0, MAX_SAVED)));
    } catch (_e) {
      /* quota / private mode */
    }
  }

  function isSaved(id) {
    return savedIds().includes(String(id || ""));
  }

  function readPending() {
    try {
      const data = JSON.parse(storageGet(PENDING_KEY) || "{}");
      return {
        add: Array.isArray(data.add) ? data.add.map(String) : [],
        remove: Array.isArray(data.remove) ? data.remove.map(String) : [],
      };
    } catch (_e) {
      return { add: [], remove: [] };
    }
  }

  function writePending(pending) {
    storageSet(PENDING_KEY, pending.add.length || pending.remove.length ? JSON.stringify(pending) : null);
  }

  function queueChange(id, added) {
    const pending = readPending();
    pending.add = pending.add.filter((item) => item !== id);
    pending.remove = pending.remove.filter((item) => item !== id);
    (added ? pending.add : pending.remove).push(id);
    writePending(pending);
  }

  function flushPending() {
    flushing = flushing.then(async () => {
      if (!cloud || syncState !== "account") return;
      const sent = readPending();
      if (!sent.add.length && !sent.remove.length) return;
      try {
        await cloud.update(sent.add, sent.remove);
        const now = readPending();
        writePending({
          add: now.add.filter((id) => !sent.add.includes(id)),
          remove: now.remove.filter((id) => !sent.remove.includes(id)),
        });
      } catch (_e) {
        /* Stays queued and is retried on the next page load. */
      }
    });
    return flushing;
  }

  function emitChange() {
    paintSaveButtons();
    paintAccountBanner();
    document.dispatchEvent(new CustomEvent("ipd:saved-change"));
  }

  function toggleSave(id) {
    const key = String(id || "");
    if (!key) return false;
    const list = savedIds();
    const idx = list.indexOf(key);
    if (idx < 0 && list.length >= MAX_SAVED) return null;
    if (idx >= 0) list.splice(idx, 1);
    else list.unshift(key);
    setSavedIds(list);
    if (storageGet(OWNER_KEY)) {
      queueChange(key, idx < 0);
      flushPending();
    }
    return idx < 0;
  }

  function removeSaved(ids) {
    const drop = ids.map(String);
    const before = savedIds();
    drop.forEach((id) => {
      if (before.includes(id)) toggleSave(id);
    });
    emitChange();
    return drop.filter((id) => before.includes(id)).length;
  }

  /* ---------- account sync ---------- */

  async function applyUser(user) {
    const owner = storageGet(OWNER_KEY);
    accountEmail = user ? user.email : "";
    if (!user) {
      // Signed out: an account's list must not stay behind on a shared device.
      if (owner) {
        setSavedIds([]);
        writePending({ add: [], remove: [] });
        storageSet(OWNER_KEY, null);
      }
      storageSet(SYNC_FLAG_KEY, null);
      syncState = "guest";
      return;
    }
    storageSet(SYNC_FLAG_KEY, "1");
    if (owner && owner !== user.uid) {
      setSavedIds([]);
      writePending({ add: [], remove: [] });
      storageSet(OWNER_KEY, null);
    }
    if (!user.verified) {
      syncState = "unverified";
      return;
    }
    let remote;
    try {
      remote = (await cloud.getIds()).reverse();
    } catch (_e) {
      syncState = "error";
      return;
    }
    if (storageGet(OWNER_KEY) === user.uid) {
      const pending = readPending();
      setSavedIds(
        [...pending.add, ...remote.filter((id) => !pending.add.includes(id))].filter(
          (id) => !pending.remove.includes(id)
        )
      );
    } else {
      const device = savedIds();
      const fromDevice = device.filter((id) => !remote.includes(id));
      setSavedIds([...fromDevice, ...remote]);
      writePending({ add: fromDevice.slice(0, MAX_SAVED).reverse(), remove: [] });
      storageSet(OWNER_KEY, user.uid);
      if (fromDevice.length) {
        showToast(
          (fromDevice.length === 1 ? "1 saved job" : fromDevice.length + " saved jobs") + " added to your account"
        );
      }
    }
    syncState = "account";
    await flushPending();
  }

  async function startSync() {
    try {
      cloud = cloud || (await import(CLOUD_MODULE));
      await applyUser(await cloud.currentUser());
    } catch (_e) {
      syncState = storageGet(OWNER_KEY) ? "error" : "guest";
    }
    emitChange();
  }

  /* ---------- save buttons ---------- */

  const HEART =
    '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.5 8 3.6 4.5 7.2 4.5c2 0 3.6 1 4.8 2.8 1.2-1.8 2.8-2.8 4.8-2.8 3.6 0 5.7 3.5 4.5 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z" fill="var(--ipd-heart-fill, none)" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>';

  function saveButtonHtml(id, variant) {
    const key = String(id || "").replace(/"/g, "&quot;");
    const saved = isSaved(id);
    const labelled = variant === "labelled";
    return (
      '<button type="button" class="ipd-save' +
      (labelled ? " ipd-save--labelled" : "") +
      (saved ? " is-saved" : "") +
      '" data-save-job="' +
      key +
      '" aria-pressed="' +
      saved +
      '" aria-label="' +
      (saved ? "Remove from saved jobs" : "Save this job") +
      '">' +
      HEART +
      (labelled ? '<span class="ipd-save-text">' + (saved ? "Saved" : "Save job") + "</span>" : "") +
      "</button>"
    );
  }

  let authHint = null; // null until the quick check answers

  function paintAccountLink() {
    if (typeof window.IPDPaintAccount !== "function") return;
    if (syncState === "account" || syncState === "unverified" || syncState === "error") {
      window.IPDPaintAccount(true);
    } else if (syncState === "guest") {
      window.IPDPaintAccount(false);
    } else {
      window.IPDPaintAccount(authHint === true ? true : "checking");
    }
  }

  function paintSaveButtons() {
    paintAccountLink();
    const ids = savedIds();
    document.querySelectorAll("[data-save-job]").forEach((btn) => {
      const saved = ids.includes(btn.getAttribute("data-save-job"));
      btn.classList.toggle("is-saved", saved);
      btn.setAttribute("aria-pressed", saved ? "true" : "false");
      btn.setAttribute("aria-label", saved ? "Remove from saved jobs" : "Save this job");
      const text = btn.querySelector(".ipd-save-text");
      if (text) text.textContent = saved ? "Saved" : "Save job";
    });
    document.querySelectorAll('a[href="/jobs/saved/"]').forEach((link) => {
      let badge = link.querySelector(".ipd-saved-count");
      if (!ids.length) {
        if (badge) badge.remove();
        return;
      }
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "ipd-saved-count";
        link.appendChild(badge);
      }
      badge.textContent = String(ids.length);
    });
  }

  /* ---------- toast ---------- */

  let toastTimer = 0;

  function showToast(message, action) {
    let el = document.getElementById("ipd-save-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "ipd-save-toast";
      el.className = "ipd-save-toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = "";
    const text = document.createElement("span");
    text.textContent = message;
    el.appendChild(text);
    if (action) {
      const control = document.createElement(action.href ? "a" : "button");
      control.className = "ipd-save-toast-action";
      control.textContent = action.label;
      if (action.href) control.href = action.href;
      else {
        control.type = "button";
        control.addEventListener("click", action.onClick);
      }
      el.appendChild(control);
    }
    if (action && action.dismissible) {
      const close = document.createElement("button");
      close.type = "button";
      close.className = "ipd-save-toast-close";
      close.setAttribute("aria-label", "Dismiss");
      close.textContent = "×";
      close.addEventListener("click", () => {
        storageSet(PROMPT_KEY, "1");
        el.classList.remove("is-open");
      });
      el.appendChild(close);
    }
    el.classList.add("is-open");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-open"), action && action.dismissible ? 9000 : 4000);
  }

  function isGuestState() {
    return syncState === "guest" || (syncState === "loading" && !storageGet(OWNER_KEY));
  }

  function afterToggle(id, added) {
    if (added === null) {
      showToast("Your saved list is full. Remove a job to save another.");
      return;
    }
    if (!added) {
      showToast("Removed from saved jobs", {
        label: "Undo",
        onClick: () => {
          toggleSave(id);
          emitChange();
          showToast("Saved again");
        },
      });
      return;
    }
    const count = savedIds().length;
    if (isGuestState() && count >= PROMPT_AT && !storageGet(PROMPT_KEY)) {
      showToast("Keep your " + count + " saved jobs on every device", {
        label: "Create free account",
        href: SIGN_IN_URL,
        dismissible: true,
      });
      return;
    }
    const onSavedPage = isSavedPage();
    showToast(
      syncState === "account" ? "Saved to your account" : "Saved on this device",
      onSavedPage ? null : { label: "View saved", href: "/jobs/saved/" }
    );
  }

  /* ---------- saved page banner ---------- */

  function paintAccountBanner() {
    const el = document.getElementById("saved-account-banner");
    if (!el) return;
    const count = savedIds().length;
    const set = (kind, title, body, actions) => {
      el.hidden = false;
      el.className = "saved-account-banner saved-account-banner--" + kind;
      el.innerHTML =
        "<div><strong>" + title + "</strong><p>" + body + "</p></div>" +
        (actions ? '<div class="saved-account-actions">' + actions + "</div>" : "");
      if (accountEmail && kind !== "guest") {
        const row = document.createElement("p");
        row.className = "saved-account-who";
        row.append("Signed in as ");
        const who = document.createElement("strong");
        who.textContent = accountEmail;
        row.append(who);
        row.insertAdjacentHTML(
          "beforeend",
          ' · <a href="/resume-builder/account/">Account details</a> · <button type="button" data-saved-action="logout">Log out</button>'
        );
        el.appendChild(row);
      }
    };
    if (syncState === "loading") {
      el.hidden = false;
      el.className = "saved-account-banner saved-account-banner--loading";
      el.setAttribute("aria-busy", "true");
      el.innerHTML =
        '<span class="saved-spinner" aria-hidden="true"></span><div><strong>Checking your account…</strong><p>Your saved jobs are shown from this device meanwhile.</p></div>';
      return;
    }
    el.removeAttribute("aria-busy");
    if (syncState === "account") {
      set("ok", "Saved to your account", "Your list is available on any device when you sign in.");
    } else if (syncState === "unverified") {
      set(
        "warn",
        "Confirm your email to keep these on every device",
        "We sent you a confirmation link. Until then, your saved jobs stay on this device. Check Spam if you cannot find it.",
        '<button type="button" class="btn btn-primary" data-saved-action="refresh">I confirmed it</button>' +
          '<button type="button" class="btn btn-secondary" data-saved-action="resend">Resend email</button>'
      );
    } else if (syncState === "error") {
      set(
        "warn",
        "Could not reach your account",
        "Your saved jobs are safe on this device. We will try again the next time you open this page."
      );
    } else {
      set(
        "guest",
        count ? "These jobs are saved only on this device" : "No account needed to save jobs",
        count
          ? "Clearing your browser or changing phones will lose them. A free account keeps them on every device."
          : "Jobs you save stay on this device. A free account keeps them on every device.",
        '<a class="btn btn-primary" href="' + SIGN_IN_URL + '">Create free account</a>' +
          '<a class="btn btn-secondary" href="' + SIGN_IN_URL + '">Sign in</a>'
      );
    }
  }

  document.addEventListener("click", async (event) => {
    if (!event.target.closest) return;
    const save = event.target.closest("[data-save-job]");
    if (save) {
      event.preventDefault();
      const id = save.getAttribute("data-save-job");
      const added = toggleSave(id);
      emitChange();
      afterToggle(id, added);
      return;
    }
    const action = event.target.closest("[data-saved-action]");
    if (!action || !cloud) return;
    action.disabled = true;
    try {
      if (action.dataset.savedAction === "logout") {
        await cloud.logOut();
        await applyUser(null);
        emitChange();
        showToast("Logged out. Saved jobs from your account were removed from this device.");
      } else if (action.dataset.savedAction === "resend") {
        await cloud.resendVerification();
        showToast("Email sent. Check Inbox and Spam.");
      } else {
        const user = await cloud.refreshUser();
        await applyUser(user);
        if (syncState === "unverified") showToast("Not confirmed yet. Open the link in the email first.");
        emitChange();
      }
    } catch (_e) {
      showToast("That did not work. Please try again in a moment.");
    }
    action.disabled = false;
  });

  window.addEventListener("storage", (event) => {
    if (event.key === SAVED_KEY) emitChange();
  });

  document.addEventListener("DOMContentLoaded", () => {
    window.IPDAccountOwnedByPage = true;
    paintSaveButtons();
    paintAccountBanner();
    const known = storageGet(OWNER_KEY) || storageGet(SYNC_FLAG_KEY);
    if (known) {
      // This device has a sign-in record: confirm with Firebase straight away.
      authHint = true;
      paintAccountLink();
      if (isSavedPage()) startSync();
      else (window.requestIdleCallback || ((fn) => setTimeout(fn, 1200)))(startSync);
      return;
    }
    const hint = window.IPDAuthHint || Promise.resolve(null);
    hint.then(async (value) => {
      authHint = value;
      if (value === true || value === null) {
        // Signed in, unsure, or this device has a sign-in record: confirm with Firebase.
        if (isSavedPage()) startSync();
        else (window.requestIdleCallback || ((fn) => setTimeout(fn, 1200)))(startSync);
        paintAccountLink();
      } else {
        syncState = "guest";
        emitChange();
      }
    });
  });

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

  /* ---------- share sheet (WhatsApp / Instagram / copy / more) ---------- */

  const SHARE_ICONS = {
    share:
      '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    whatsapp:
      '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor"/></svg>',
    copy:
      '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
    more:
      '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="5" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="19" cy="12" r="1.8" fill="currentColor"/></svg>'
  };

  function jobUrl(job) {
    return job.shareUrl || `https://infoparkdaily.online/job/${encodeURIComponent(job.id || "")}/`;
  }

  function findJob(id) {
    const key = String(id || "");
    const list = typeof JOBS !== "undefined" && Array.isArray(JOBS) ? JOBS : [];
    const current = window.IPDCurrentJob;
    if (current && String(current.id) === key) return current;
    return list.find((j) => String(j.id) === key) || null;
  }

  function shareButtonHtml(id, variant) {
    const key = String(id || "").replace(/"/g, "&quot;");
    const labelled = variant === "labelled";
    return (
      '<button type="button" class="ipd-share' +
      (labelled ? " ipd-share--labelled" : "") +
      '" data-share-job="' +
      key +
      '" aria-label="Share this job" aria-haspopup="dialog">' +
      SHARE_ICONS.share +
      (labelled ? '<span class="ipd-share-text">Share</span>' : "") +
      "</button>"
    );
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_e) {
      try {
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand("copy");
        area.remove();
        return ok;
      } catch (_err) {
        return false;
      }
    }
  }

  async function shareTo(target, job) {
    const text = shareText(job);
    const url = jobUrl(job);
    if (target === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      return;
    }
    if (target === "copy") {
      showToast((await copyText(url)) ? "Job link copied." : "Could not copy. Long-press the address bar to copy.");
      return;
    }
    if (target === "instagram") {
      // Instagram has no web share link: copy the post, then hand off to the
      // phone's share sheet (Instagram is listed there) or Instagram DMs.
      const copied = await copyText(text);
      if (navigator.share) {
        try {
          await navigator.share({ text, url });
          return;
        } catch (err) {
          if (err && err.name === "AbortError") return;
        }
      }
      window.open("https://www.instagram.com/direct/inbox/", "_blank", "noopener");
      showToast(copied ? "Job details copied — paste them in Instagram." : "Open Instagram and share this link: " + url);
      return;
    }
    if (target === "more") {
      const result = await shareJob(job);
      if (result === "copied") showToast("Job details copied.");
    }
  }

  let shareSheet = null;
  let shareReturnFocus = null;

  function closeShareSheet() {
    if (!shareSheet) return;
    shareSheet.classList.remove("is-open");
    shareSheet.hidden = true;
    if (shareReturnFocus && shareReturnFocus.focus) shareReturnFocus.focus();
    shareReturnFocus = null;
  }

  function openShareSheet(job, trigger) {
    if (!job) return;
    if (!shareSheet) {
      shareSheet = document.createElement("div");
      shareSheet.className = "ipd-share-sheet";
      shareSheet.hidden = true;
      shareSheet.innerHTML =
        '<div class="ipd-share-backdrop" data-share-close></div>' +
        '<div class="ipd-share-panel" role="dialog" aria-modal="true" aria-labelledby="ipd-share-title">' +
        '<div class="ipd-share-head"><div><p class="ipd-share-title" id="ipd-share-title">Share this job</p>' +
        '<p class="ipd-share-sub"></p></div>' +
        '<button type="button" class="ipd-share-close" data-share-close aria-label="Close">×</button></div>' +
        '<div class="ipd-share-options">' +
        '<button type="button" class="ipd-share-opt ipd-share-opt--wa" data-share-to="whatsapp">' + SHARE_ICONS.whatsapp + "<span>WhatsApp</span></button>" +
        '<button type="button" class="ipd-share-opt ipd-share-opt--ig" data-share-to="instagram">' + SHARE_ICONS.instagram + "<span>Instagram</span></button>" +
        '<button type="button" class="ipd-share-opt" data-share-to="copy">' + SHARE_ICONS.copy + "<span>Copy link</span></button>" +
        '<button type="button" class="ipd-share-opt" data-share-to="more">' + SHARE_ICONS.more + "<span>More</span></button>" +
        "</div></div>";
      document.body.appendChild(shareSheet);
      shareSheet.addEventListener("click", (event) => {
        if (event.target.closest("[data-share-close]")) {
          closeShareSheet();
          return;
        }
        const opt = event.target.closest("[data-share-to]");
        if (!opt || !shareSheet.job) return;
        const target = opt.getAttribute("data-share-to");
        const current = shareSheet.job;
        closeShareSheet();
        shareTo(target, current);
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && shareSheet && !shareSheet.hidden) closeShareSheet();
      });
    }
    shareSheet.job = job;
    const role = (job.roles && job.roles[0]) || "Job opening";
    shareSheet.querySelector(".ipd-share-sub").textContent = `${role} — ${job.company || "InfoparkDaily"}`;
    const more = shareSheet.querySelector('[data-share-to="more"]');
    if (more) more.hidden = !navigator.share;
    shareReturnFocus = trigger || document.activeElement;
    shareSheet.hidden = false;
    requestAnimationFrame(() => shareSheet.classList.add("is-open"));
    const first = shareSheet.querySelector("[data-share-to]");
    if (first) first.focus();
  }

  document.addEventListener("click", (event) => {
    if (!event.target.closest) return;
    const direct = event.target.closest("[data-share-direct]");
    if (direct) {
      const job = findJob(direct.getAttribute("data-share-job-id"));
      if (job) {
        event.preventDefault();
        shareTo(direct.getAttribute("data-share-direct"), job);
      }
      return;
    }
    const btn = event.target.closest("[data-share-job]");
    if (!btn) return;
    const job = findJob(btn.getAttribute("data-share-job"));
    if (!job) return;
    event.preventDefault();
    event.stopPropagation();
    openShareSheet(job, btn);
  });

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
    saveButtonHtml,
    removeSaved,
    recordView,
    recentlyViewedIds,
    shareJob,
    shareText,
    shareTo,
    shareButtonHtml,
    openShareSheet,
    reportJob,
    postedAgo,
    lastCheckedLabel,
    markTone
  };
})();
