/**
 * InfoparkDaily Analytics — Clarity / heatmaps bridge (Phase 16 ESM)
 * Documents Clarity features and bridges our events → Clarity tags.
 */

/**
 * Clarity feature checklist — all free on Clarity once the project is live.
 * source: "clarity" = Clarity UI · "bridge" = we also send a custom signal
 */
export const FEATURES = [
  {
    id: "session_recording",
    label: "Session Recording",
    source: "clarity",
    claritySetting: "Settings → Recordings (on by default)",
    note: "Watch real sessions; filter by URL, device, Clarity tags"
  },
  {
    id: "heatmaps",
    label: "Heatmaps",
    source: "clarity",
    claritySetting: "Heatmaps → Click maps per URL",
    note: "Aggregate clicks on jobs list, job detail, home, contact"
  },
  {
    id: "scroll_maps",
    label: "Scroll Maps",
    source: "clarity",
    claritySetting: "Heatmaps → Scroll maps",
    note: "Complements our scroll event (25/50/75/100)"
  },
  {
    id: "dead_clicks",
    label: "Dead Clicks",
    source: "clarity",
    claritySetting: "Dashboard → Smart events → Dead clicks",
    note: "Clicks with no DOM response — fix UI affordances"
  },
  {
    id: "rage_clicks",
    label: "Rage Clicks",
    source: "clarity",
    claritySetting: "Dashboard → Smart events → Rage clicks",
    note: "Rapid repeated clicks — friction / broken controls"
  },
  {
    id: "quick_backs",
    label: "Quick Backs",
    source: "clarity",
    claritySetting: "Dashboard → Smart events → Quick backs",
    note: "Land then leave fast — weak landing or wrong intent"
  },
  {
    id: "javascript_errors",
    label: "JavaScript Errors",
    source: "both",
    claritySetting: "Dashboard → Smart events → Script errors",
    note: "Clarity captures script errors; we also emit error + clarity event"
  }
];

/** Selectors masked in recordings (emails, phones, form bodies) */
export const DEFAULT_MASK_SELECTORS = [
  "input[type=email]",
  "input[type=tel]",
  "input[type=password]",
  "textarea",
  "[data-clarity-mask]",
  ".contact-form textarea",
  ".contact-form input[name=name]",
  ".contact-form input[name=company]",
  ".contact-form input[name=message]"
];

/** Custom Clarity tags we set for filtering recordings */
export const TAG_KEYS = [
  "channel",
  "channel_group",
  "content_type",
  "page_path",
  "job_id",
  "company",
  "utm_campaign",
  "utm_source"
];

/** Events mirrored as Clarity custom events (for filtering recordings) */
export const MIRROR_EVENTS = [
  "page_view",
  "job_view",
  "job_apply",
  "job_search",
  "job_filter",
  "contact_start",
  "contact_submit",
  "newsletter_signup",
  "ad_click",
  "sponsor_click",
  "company_click",
  "company_view",
  "share_instagram",
  "share_whatsapp",
  "error",
  "session_attrib"
];

/** Events that should upgrade the Clarity session (keep full recording) */
export const UPGRADE_EVENTS = [
  "job_apply",
  "contact_submit",
  "newsletter_signup",
  "ad_click",
  "sponsor_click",
  "revenue_record",
  "share_whatsapp",
  "share_instagram"
];

export function callClarity() {
  try {
    if (typeof globalThis.clarity === "function") {
      globalThis.clarity.apply(globalThis, arguments);
      return true;
    }
  } catch (_e) {
    /* ignore */
  }
  return false;
}

export function setTag(key, value) {
  if (value === undefined || value === null || value === "") return false;
  return callClarity("set", String(key), String(value));
}

export function setTags(map) {
  map = map || {};
  Object.keys(map).forEach(function (k) {
    setTag(k, map[k]);
  });
}

export function trackClarityEvent(name) {
  if (!name) return false;
  return callClarity("event", String(name));
}

export function upgradeSession(reason) {
  return callClarity("upgrade", String(reason || "conversion"));
}

export function identify(customId, sessionId, pageId, friendlyName) {
  return callClarity("identify", customId || "", sessionId || "", pageId || "", friendlyName || "");
}

/**
 * Apply masking hints. Clarity also masks inputs by default in many projects;
 * data-clarity-mask / data-clarity-unmask in HTML overrides.
 */
export function applyMaskHints(selectors) {
  selectors = selectors || DEFAULT_MASK_SELECTORS;
  try {
    var doc = globalThis.document;
    if (!doc) return;
    selectors.forEach(function (sel) {
      var nodes = doc.querySelectorAll(sel);
      for (var i = 0; i < nodes.length; i++) {
        if (!nodes[i].hasAttribute("data-clarity-mask")) {
          nodes[i].setAttribute("data-clarity-mask", "true");
        }
      }
    });
  } catch (_e) {
    /* ignore */
  }
}

export function shouldUpgrade(eventName) {
  return UPGRADE_EVENTS.indexOf(String(eventName || "")) !== -1;
}

export function shouldMirror(eventName) {
  return MIRROR_EVENTS.indexOf(String(eventName || "")) !== -1;
}
