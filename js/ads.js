/**
 * InfoparkDaily AdSense units — gated until approval.
 *
 * Phase 3 (pre-approval): keep page meta + adsbygoogle.js script if present;
 * leave displayAds false so units stay hidden.
 * Phase 4 (after approval): set displayAds true, redeploy, then test mobile/desktop.
 */
(function () {
  var CLIENT = "ca-pub-4593359890362954";

  /** Flip to true only after Google AdSense approves InfoparkDaily. */
  var displayAds = false;

  /** Optional Auto ads — enable only after approval + Better Ads check. */
  var autoAds = false;

  window.IPD_ADSENSE = {
    client: CLIENT,
    displayAds: displayAds,
    autoAds: autoAds
  };

  function ensureScript(cb) {
    if (window.adsbygoogle && document.querySelector('script[src*="adsbygoogle.js"]')) {
      cb();
      return;
    }
    var existing = document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');
    if (existing) {
      existing.addEventListener("load", cb);
      if (window.adsbygoogle) cb();
      return;
    }
    var s = document.createElement("script");
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(CLIENT);
    s.onload = cb;
    document.head.appendChild(s);
  }

  function fillUnit(wrap, slotId) {
    if (!wrap || wrap.getAttribute("data-ad-filled") === "1") return;
    wrap.removeAttribute("hidden");
    wrap.setAttribute("aria-hidden", "false");
    wrap.setAttribute("aria-label", "Advertisement");
    wrap.innerHTML = "";
    var ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", CLIENT);
    if (slotId) ins.setAttribute("data-ad-slot", slotId);
    ins.setAttribute("data-ad-format", "auto");
    ins.setAttribute("data-full-width-responsive", "true");
    wrap.appendChild(ins);
    wrap.setAttribute("data-ad-filled", "1");
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_e) {
      /* ignore */
    }

    function sync() {
      var status = ins.getAttribute("data-ad-status");
      if (status === "filled") {
        wrap.classList.add("is-filled");
        return;
      }
      if (status === "unfilled") {
        wrap.setAttribute("hidden", "");
        wrap.setAttribute("aria-hidden", "true");
      }
    }
    try {
      new MutationObserver(sync).observe(ins, {
        attributes: true,
        attributeFilter: ["data-ad-status"]
      });
    } catch (_e) {
      /* ignore */
    }
    setTimeout(function () {
      if (ins.getAttribute("data-ad-status") !== "filled") {
        wrap.setAttribute("hidden", "");
        wrap.setAttribute("aria-hidden", "true");
      }
    }, 8000);
  }

  function activate() {
    if (!displayAds) {
      document.querySelectorAll(".ipd-ad-slot, #jobs-ad-slot").forEach(function (el) {
        el.setAttribute("hidden", "");
        el.setAttribute("aria-hidden", "true");
      });
      return;
    }

    ensureScript(function () {
      if (autoAds) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: CLIENT,
            enable_page_level_ads: true
          });
        } catch (_e) {
          /* ignore */
        }
      }

      var slotMap = {
        "guides-index": "",
        "guide-top": "",
        "guide-mid": "",
        "home-below-hero": "",
        "home-above-footer": "",
        "news-after-headline": "",
        "news-end": "",
        "jobs-listing": "5101534424"
      };

      document.querySelectorAll(".ipd-ad-slot").forEach(function (el) {
        var key = el.getAttribute("data-ad-slot") || "";
        fillUnit(el, slotMap[key] || "");
      });

      var jobs = document.getElementById("jobs-ad-slot");
      if (jobs) fillUnit(jobs, "5101534424");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", activate);
  } else {
    activate();
  }
})();
