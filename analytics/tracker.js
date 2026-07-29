/**
 * InfoparkDaily Analytics — low-level tracker
 * dataLayer, GTM bootstrap, Clarity, optional direct GA4.
 */
(function (global) {
  "use strict";

  function cfg() {
    return global.IPD_ANALYTICS_CONFIG || {};
  }

  function log() {
    if (!cfg().debug) return;
    var args = ["[IPD Analytics]"].concat([].slice.call(arguments));
    try {
      // eslint-disable-next-line no-console
      console.log.apply(console, args);
    } catch (_e) {
      /* ignore */
    }
  }

  function isLocalHost() {
    try {
      var h = global.location.hostname;
      return h === "localhost" || h === "127.0.0.1" || h === "0.0.0.0";
    } catch (_e) {
      return false;
    }
  }

  function remoteAllowed() {
    var c = cfg();
    if (!c.enabled) return false;
    if (c.disableRemoteOnLocalhost && isLocalHost()) return false;
    return true;
  }

  function ensureDataLayer() {
    var name = cfg().dataLayerName || "dataLayer";
    global[name] = global[name] || [];
    return global[name];
  }

  function pushDataLayer(payload) {
    var dl = ensureDataLayer();
    dl.push(payload);
    log("dataLayer", payload);
  }

  function loadGtm(id) {
    if (!id || global.__IPD_GTM_LOADED__) return;
    if (!remoteAllowed()) {
      log("GTM skipped (local or disabled)", id);
      return;
    }
    global.__IPD_GTM_LOADED__ = true;
    var dlName = cfg().dataLayerName || "dataLayer";
    ensureDataLayer();
    pushDataLayer({ "gtm.start": Date.now(), event: "gtm.js" });

    var s = global.document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(id);
    var first = global.document.getElementsByTagName("script")[0];
    if (first && first.parentNode) first.parentNode.insertBefore(s, first);
    else (global.document.head || global.document.body).appendChild(s);

    // noscript iframe for browsers without JS is HTML-only; skip here
    log("GTM loading", id);
  }

  function loadClarity(id) {
    if (!id || global.__IPD_CLARITY_LOADED__) return;
    if (!remoteAllowed()) {
      log("Clarity skipped (local or disabled)", id);
      return;
    }
    global.__IPD_CLARITY_LOADED__ = true;
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(global, global.document, "clarity", "script", id);

    // Queue project-level preferences (Clarity applies when ready)
    try {
      if (cfg().clarityConsent !== false && typeof global.clarity === "function") {
        // Signal consent for EU / consent-mode projects (no-op if unused)
        global.clarity("consent");
      }
    } catch (_e) {
      /* ignore */
    }

    log("Clarity loading", id);
  }

  /**
   * Bridge helpers — prefer IPD_ANALYTICS_CLARITY when loaded.
   */
  function claritySet(key, value) {
    var Cl = global.IPD_ANALYTICS_CLARITY;
    if (Cl && Cl.setTag) return Cl.setTag(key, value);
    try {
      if (typeof global.clarity === "function" && value != null && value !== "") {
        global.clarity("set", String(key), String(value));
        return true;
      }
    } catch (_e) {
      /* ignore */
    }
    return false;
  }

  function clarityEvent(name) {
    var Cl = global.IPD_ANALYTICS_CLARITY;
    if (Cl && Cl.trackClarityEvent) return Cl.trackClarityEvent(name);
    try {
      if (typeof global.clarity === "function" && name) {
        global.clarity("event", String(name));
        return true;
      }
    } catch (_e) {
      /* ignore */
    }
    return false;
  }

  function clarityUpgrade(reason) {
    var Cl = global.IPD_ANALYTICS_CLARITY;
    if (Cl && Cl.upgradeSession) return Cl.upgradeSession(reason);
    try {
      if (typeof global.clarity === "function") {
        global.clarity("upgrade", String(reason || "conversion"));
        return true;
      }
    } catch (_e) {
      /* ignore */
    }
    return false;
  }

  function ensureGtag() {
    if (typeof global.gtag === "function") return;
    global.dataLayer = ensureDataLayer();
    global.gtag = function () {
      global.dataLayer.push(arguments);
    };
  }

  function loadGaDirect(measurementId) {
    if (!measurementId || global.__IPD_GA_DIRECT__) return;
    if (!remoteAllowed()) {
      log("GA4 direct skipped", measurementId);
      return;
    }
    // Prefer GTM; only use direct if GTM empty
    if (cfg().gtmId) {
      log("GA4 via GTM preferred; skip direct config tag from site");
      return;
    }
    global.__IPD_GA_DIRECT__ = true;
    ensureGtag();
    var s = global.document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    (global.document.head || global.document.body).appendChild(s);
    global.gtag("js", new Date());
    global.gtag("config", measurementId, { send_page_view: false });
    log("GA4 direct loading", measurementId);
  }

  function sendEvent(name, params) {
    var payload = Object.assign({ event: name }, params || {});
    pushDataLayer(payload);

    // Direct GA fallback when no GTM
    if (!cfg().gtmId && cfg().gaMeasurementId && typeof global.gtag === "function" && remoteAllowed()) {
      try {
        global.gtag("event", name, params || {});
      } catch (_e) {
        /* ignore */
      }
    }
  }

  function setUserProperty(key, value) {
    pushDataLayer({ event: "ipd_user_property", property_key: key, property_value: value });
  }

  global.IPD_ANALYTICS_TRACKER = {
    log: log,
    remoteAllowed: remoteAllowed,
    ensureDataLayer: ensureDataLayer,
    pushDataLayer: pushDataLayer,
    loadGtm: loadGtm,
    loadClarity: loadClarity,
    loadGaDirect: loadGaDirect,
    sendEvent: sendEvent,
    setUserProperty: setUserProperty,
    claritySet: claritySet,
    clarityEvent: clarityEvent,
    clarityUpgrade: clarityUpgrade
  };
})(typeof window !== "undefined" ? window : this);
