/**
 * Consent Mode v2 + cookie banner (ESM).
 */
import { config } from "./config.js";

const VERSION = 1;

function ensureGtagStub() {
  const dlName = config.dataLayerName || "dataLayer";
  globalThis[dlName] = globalThis[dlName] || [];
  if (typeof globalThis.gtag !== "function") {
    globalThis.gtag = function gtag() {
      globalThis[dlName].push(arguments);
    };
  }
}

function applyConsent(command, state) {
  ensureGtagStub();
  try {
    globalThis.gtag("consent", command, state);
  } catch {
    /* ignore */
  }
}

const DEFAULT_DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "granted",
  personalization_storage: "denied",
  security_storage: "granted",
  wait_for_update: 800
};

const GRANTED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "granted",
  functionality_storage: "granted",
  personalization_storage: "granted",
  security_storage: "granted"
};

const DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "granted",
  personalization_storage: "denied",
  security_storage: "granted"
};

function storageKey() {
  return config.consentStorageKey || "ipd_consent_v1";
}

export function readConsent() {
  try {
    const raw = globalThis.localStorage?.getItem(storageKey());
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.v !== VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(choice) {
  const payload = {
    v: VERSION,
    choice,
    analytics: choice === "accepted",
    ts: Date.now()
  };
  try {
    globalThis.localStorage?.setItem(storageKey(), JSON.stringify(payload));
  } catch {
    /* ignore */
  }
  return payload;
}

export function hasAnalyticsConsent() {
  if (config.requireConsent === false) return true;
  const stored = readConsent();
  return Boolean(stored && stored.analytics);
}

export function hasConsentDecision() {
  return Boolean(readConsent());
}

function emitConsent(choice) {
  const dl = globalThis[config.dataLayerName || "dataLayer"] || [];
  dl.push({
    event: "ipd_consent_update",
    consent_choice: choice,
    analytics_storage: choice === "accepted" ? "granted" : "denied"
  });
  try {
    globalThis.dispatchEvent(
      new CustomEvent("ipd:consent", {
        detail: { choice, analytics: choice === "accepted" }
      })
    );
  } catch {
    /* ignore */
  }
}

function hideBanner() {
  const el = globalThis.document?.getElementById("ipd-consent-banner");
  el?.parentNode?.removeChild(el);
}

function showBanner() {
  const doc = globalThis.document;
  if (!doc || doc.getElementById("ipd-consent-banner")) return;

  const root = doc.createElement("div");
  root.id = "ipd-consent-banner";
  root.className = "ipd-consent";
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-labelledby", "ipd-consent-title");
  root.innerHTML =
    '<div class="ipd-consent-inner glass">' +
    '<div class="ipd-consent-copy">' +
    '<p id="ipd-consent-title" class="ipd-consent-title">Manage Consent</p>' +
    '<p class="ipd-consent-text">We use cookies and similar tech (Google Analytics, Microsoft Clarity) to understand traffic and improve InfoparkDaily. Essential preferences (like theme) always stay on-device. See our <a href="/privacy/#cookies">Privacy Policy</a>.</p>' +
    "</div>" +
    '<div class="ipd-consent-actions">' +
    '<button type="button" class="btn btn-secondary ipd-consent-reject">Reject</button>' +
    '<button type="button" class="btn btn-primary ipd-consent-accept">Accept</button>' +
    "</div></div>";

  (doc.body || doc.documentElement).appendChild(root);
  root.querySelector(".ipd-consent-accept")?.addEventListener("click", () => setChoice("accepted"));
  root.querySelector(".ipd-consent-reject")?.addEventListener("click", () => setChoice("rejected"));
}

export function setChoice(choice) {
  writeConsent(choice);
  applyConsent("update", choice === "accepted" ? GRANTED : DENIED);
  if (choice === "accepted") {
    try {
      if (typeof globalThis.clarity === "function") globalThis.clarity("consent");
    } catch {
      /* ignore */
    }
  }
  hideBanner();
  emitConsent(choice);
}

export function openConsentPreferences() {
  hideBanner();
  showBanner();
}

function bindOpenTriggers() {
  globalThis.document?.addEventListener("click", (ev) => {
    const t = ev.target?.closest?.("[data-ipd-consent-open]");
    if (!t) return;
    ev.preventDefault();
    openConsentPreferences();
  });
}

/** Call once at startup — sets CM v2 defaults before tags. */
export function initConsent() {
  ensureGtagStub();
  applyConsent("default", DEFAULT_DENIED);

  if (config.requireConsent === false) {
    applyConsent("update", GRANTED);
    return;
  }

  const stored = readConsent();
  if (stored?.analytics) {
    applyConsent("update", GRANTED);
    bindOpenTriggers();
    return;
  }
  if (stored && !stored.analytics) {
    applyConsent("update", DENIED);
    bindOpenTriggers();
    return;
  }

  const boot = () => {
    showBanner();
    bindOpenTriggers();
  };
  if (globalThis.document?.readyState === "loading") {
    globalThis.document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
}
