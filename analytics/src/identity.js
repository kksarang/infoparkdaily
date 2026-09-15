/**
 * Opaque analytics User-ID helpers.
 * Never use email or hashed email. Clear on logout / account switch.
 */
import { config } from "./config.js";
import { hasAnalyticsConsent } from "./consent.js";
import { remoteAllowed } from "./loader.js";

const USER_PROP_KEYS = ["auth_state", "account_area"];

/**
 * @param {string|null|undefined} uid Firebase Auth uid or null to clear
 * @param {{ auth_state?: string, account_area?: string }} [props]
 */
export function setAnalyticsUser(uid, props = {}) {
  try {
    if (!remoteAllowed() || !hasAnalyticsConsent()) return;
    if (typeof globalThis.gtag !== "function") return;
    const id = uid ? String(uid).slice(0, 128) : null;
    globalThis.gtag("config", config.gaMeasurementId, {
      user_id: id || undefined,
      send_page_view: false
    });
    const userProps = {
      auth_state: props.auth_state || (id ? "signed_in" : "signed_out"),
      account_area: props.account_area || "none"
    };
    if (!id) {
      userProps.auth_state = "signed_out";
      userProps.account_area = "none";
    }
    globalThis.gtag("set", "user_properties", userProps);
    for (const key of USER_PROP_KEYS) {
      if (!id && key !== "auth_state" && key !== "account_area") continue;
    }
  } catch {
    /* analytics must never block auth */
  }
}

export function clearAnalyticsUser() {
  setAnalyticsUser(null, { auth_state: "signed_out", account_area: "none" });
}
