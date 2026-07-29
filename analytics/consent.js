/**
 * InfoparkDaily Analytics — Cookie consent + Consent Mode v2 (Phase 14)
 * =====================================================================
 * Sets Google Consent Mode defaults (denied) before tags load, shows a
 * banner, and updates consent when the visitor chooses.
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "ipd_consent_v1";
  var VERSION = 1;

  function cfg() {
    return global.IPD_ANALYTICS_CONFIG || {};
  }

  function storageKey() {
    return cfg().consentStorageKey || STORAGE_KEY;
  }

  function ensureGtagStub() {
    var dlName = cfg().dataLayerName || "dataLayer";
    global[dlName] = global[dlName] || [];
    if (typeof global.gtag !== "function") {
      global.gtag = function () {
        global[dlName].push(arguments);
      };
    }
  }

  function defaultConsentState() {
    return {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      functionality_storage: "granted",
      personalization_storage: "denied",
      security_storage: "granted",
      wait_for_update: 800
    };
  }

  function grantedConsentState() {
    return {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted",
      functionality_storage: "granted",
      personalization_storage: "granted",
      security_storage: "granted"
    };
  }

  function deniedConsentState() {
    return {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      functionality_storage: "granted",
      personalization_storage: "denied",
      security_storage: "granted"
    };
  }

  function applyConsent(command, state) {
    ensureGtagStub();
    try {
      global.gtag("consent", command, state);
    } catch (_e) {
      /* ignore */
    }
  }

  function readStored() {
    try {
      var raw = global.localStorage.getItem(storageKey());
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || parsed.v !== VERSION) return null;
      return parsed;
    } catch (_e) {
      return null;
    }
  }

  function writeStored(choice) {
    var payload = {
      v: VERSION,
      choice: choice, // "accepted" | "rejected"
      analytics: choice === "accepted",
      ts: Date.now()
    };
    try {
      global.localStorage.setItem(storageKey(), JSON.stringify(payload));
    } catch (_e) {
      /* ignore */
    }
    return payload;
  }

  function hasDecision() {
    return Boolean(readStored());
  }

  function hasAnalyticsConsent() {
    if (cfg().requireConsent === false) return true;
    var stored = readStored();
    return Boolean(stored && stored.analytics);
  }

  function emitConsentEvent(choice) {
    try {
      var dl = global[cfg().dataLayerName || "dataLayer"] || [];
      dl.push({
        event: "ipd_consent_update",
        consent_choice: choice,
        analytics_storage: choice === "accepted" ? "granted" : "denied"
      });
    } catch (_e) {
      /* ignore */
    }
    try {
      global.dispatchEvent(
        new CustomEvent("ipd:consent", {
          detail: { choice: choice, analytics: choice === "accepted" }
        })
      );
    } catch (_e2) {
      /* IE ignore */
    }
  }

  function setChoice(choice) {
    writeStored(choice);
    if (choice === "accepted") {
      applyConsent("update", grantedConsentState());
      try {
        if (typeof global.clarity === "function") global.clarity("consent");
      } catch (_e) {
        /* ignore */
      }
    } else {
      applyConsent("update", deniedConsentState());
    }
    hideBanner();
    emitConsentEvent(choice);
  }

  function hideBanner() {
    var el = global.document && global.document.getElementById("ipd-consent-banner");
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function showBanner() {
    var doc = global.document;
    if (!doc || doc.getElementById("ipd-consent-banner")) return;

    var root = doc.createElement("div");
    root.id = "ipd-consent-banner";
    root.className = "ipd-consent";
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "false");
    root.setAttribute("aria-labelledby", "ipd-consent-title");
    root.innerHTML =
      '<div class="ipd-consent-inner glass">' +
      '<div class="ipd-consent-copy">' +
      '<p id="ipd-consent-title" class="ipd-consent-title">Cookies &amp; analytics</p>' +
      '<p class="ipd-consent-text">We use cookies and similar tech (Google Analytics, Microsoft Clarity) to understand traffic and improve InfoparkDaily. Essential preferences (like theme) always stay on-device. See our <a href="/privacy/#cookies">Privacy Policy</a>.</p>' +
      "</div>" +
      '<div class="ipd-consent-actions">' +
      '<button type="button" class="btn btn-secondary ipd-consent-reject">Reject</button>' +
      '<button type="button" class="btn btn-primary ipd-consent-accept">Accept</button>' +
      "</div>" +
      "</div>";

    (doc.body || doc.documentElement).appendChild(root);

    var accept = root.querySelector(".ipd-consent-accept");
    var reject = root.querySelector(".ipd-consent-reject");
    if (accept) {
      accept.addEventListener("click", function () {
        setChoice("accepted");
      });
    }
    if (reject) {
      reject.addEventListener("click", function () {
        setChoice("rejected");
      });
    }
  }

  function openPreferences() {
    // Re-show banner even if decided
    hideBanner();
    showBanner();
  }

  function bindOpenTriggers() {
    var doc = global.document;
    if (!doc) return;
    doc.addEventListener("click", function (ev) {
      var t = ev.target && ev.target.closest && ev.target.closest("[data-ipd-consent-open]");
      if (!t) return;
      ev.preventDefault();
      openPreferences();
    });
  }

  function initConsent() {
    ensureGtagStub();

    // Consent Mode v2 defaults — must run before GA config
    applyConsent("default", defaultConsentState());

    if (cfg().requireConsent === false) {
      applyConsent("update", grantedConsentState());
      return;
    }

    var stored = readStored();
    if (stored && stored.analytics) {
      applyConsent("update", grantedConsentState());
    } else if (stored && !stored.analytics) {
      applyConsent("update", deniedConsentState());
    } else {
      // No decision yet — keep defaults denied; show banner when DOM ready
      var boot = function () {
        showBanner();
        bindOpenTriggers();
      };
      if (global.document && global.document.readyState === "loading") {
        global.document.addEventListener("DOMContentLoaded", boot);
      } else {
        boot();
      }
      return;
    }

    bindOpenTriggers();
  }

  // Run immediately (script is deferred — still before analytics.js in order)
  initConsent();

  global.IPD_ANALYTICS_CONSENT = {
    STORAGE_KEY: STORAGE_KEY,
    hasDecision: hasDecision,
    hasAnalyticsConsent: hasAnalyticsConsent,
    accept: function () {
      setChoice("accepted");
    },
    reject: function () {
      setChoice("rejected");
    },
    openPreferences: openPreferences,
    getStored: readStored
  };
})(typeof window !== "undefined" ? window : this);
