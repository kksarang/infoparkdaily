/**
 * InfoparkDaily Analytics — Acquisition / traffic sources (Phase 16 ESM)
 * Classifies session channel from UTMs + document.referrer.
 */

/** Channels the product wants reported (user list + GA4-style buckets). */
export const CHANNELS = [
  { id: "google_search", label: "Google Search", group: "organic" },
  { id: "instagram", label: "Instagram", group: "social" },
  { id: "whatsapp", label: "WhatsApp", group: "social" },
  { id: "facebook", label: "Facebook", group: "social" },
  { id: "linkedin", label: "LinkedIn", group: "social" },
  { id: "telegram", label: "Telegram", group: "social" },
  { id: "threads", label: "Threads", group: "social" },
  { id: "email", label: "Email", group: "email" },
  { id: "referral", label: "Referral", group: "referral" },
  { id: "direct", label: "Direct", group: "direct" },
  { id: "organic", label: "Organic", group: "organic" },
  { id: "campaign", label: "Campaign", group: "paid" }
];

export const UTM_FIELDS = [
  { key: "utm_source", label: "UTM Source", example: "instagram" },
  { key: "utm_medium", label: "UTM Medium", example: "social" },
  { key: "utm_campaign", label: "UTM Campaign", example: "jobs_daily" },
  { key: "utm_content", label: "UTM Content", example: "post_slug" },
  { key: "utm_term", label: "UTM Term", example: "react developer" }
];

/**
 * Recommended share templates — use these on every IG/WA/FB post & email.
 * Without UTMs, social in-app browsers often look like Direct.
 */
export const UTM_TEMPLATES = {
  google_search: null,
  instagram:
    "?utm_source=instagram&utm_medium=social&utm_campaign={campaign}&utm_content={content}",
  whatsapp:
    "?utm_source=whatsapp&utm_medium=social&utm_campaign={campaign}&utm_content={content}",
  facebook:
    "?utm_source=facebook&utm_medium=social&utm_campaign={campaign}&utm_content={content}",
  linkedin:
    "?utm_source=linkedin&utm_medium=social&utm_campaign={campaign}&utm_content={content}",
  telegram:
    "?utm_source=telegram&utm_medium=social&utm_campaign={campaign}&utm_content={content}",
  threads:
    "?utm_source=threads&utm_medium=social&utm_campaign={campaign}&utm_content={content}",
  email:
    "?utm_source=newsletter&utm_medium=email&utm_campaign={campaign}&utm_content={content}",
  campaign:
    "?utm_source={partner}&utm_medium=cpc&utm_campaign={campaign}&utm_content={creative}&utm_term={keyword}",
  organic: null,
  referral: null,
  direct: null
};

const SEARCH_HOSTS = [
  "google.",
  "bing.",
  "yahoo.",
  "duckduckgo.",
  "baidu.",
  "yandex.",
  "ecosia."
];

const SOCIAL_HOSTS = [
  { host: "instagram.", channel: "instagram" },
  { host: "l.instagram.", channel: "instagram" },
  { host: "facebook.", channel: "facebook" },
  { host: "fb.", channel: "facebook" },
  { host: "m.facebook.", channel: "facebook" },
  { host: "l.facebook.", channel: "facebook" },
  { host: "linkedin.", channel: "linkedin" },
  { host: "lnkd.in", channel: "linkedin" },
  { host: "t.me", channel: "telegram" },
  { host: "telegram.", channel: "telegram" },
  { host: "threads.", channel: "threads" },
  { host: "whatsapp.", channel: "whatsapp" },
  { host: "wa.me", channel: "whatsapp" },
  { host: "chat.whatsapp.", channel: "whatsapp" },
  { host: "twitter.", channel: "referral" },
  { host: "x.com", channel: "referral" },
  { host: "reddit.", channel: "referral" }
];

const PAID_MEDIA = ["cpc", "ppc", "paid", "paid_social", "display", "cpm", "cpv", "retargeting", "ads"];

function lower(s) {
  return String(s || "")
    .trim()
    .toLowerCase();
}

export function hostFromReferrer(ref) {
  try {
    if (!ref) return "";
    return lower(new URL(ref).hostname);
  } catch (_e) {
    return "";
  }
}

function isSearchHost(host) {
  host = lower(host);
  for (var i = 0; i < SEARCH_HOSTS.length; i++) {
    if (host.indexOf(SEARCH_HOSTS[i]) !== -1) return true;
  }
  return false;
}

function isGoogleHost(host) {
  return lower(host).indexOf("google.") !== -1;
}

function socialFromHost(host) {
  host = lower(host);
  for (var i = 0; i < SOCIAL_HOSTS.length; i++) {
    var rule = SOCIAL_HOSTS[i];
    if (host.indexOf(rule.host) !== -1) return rule.channel;
  }
  return null;
}

export function sourceToChannel(source) {
  source = lower(source);
  if (!source) return null;
  if (source === "instagram" || source === "ig") return "instagram";
  if (source === "whatsapp" || source === "wa") return "whatsapp";
  if (source === "facebook" || source === "fb" || source === "meta") return "facebook";
  if (source === "linkedin" || source === "li") return "linkedin";
  if (source === "telegram" || source === "tg") return "telegram";
  if (source === "threads") return "threads";
  if (source === "google" || source === "google_search") return "google_search";
  if (source === "newsletter" || source === "email" || source === "mailchimp" || source === "brevo")
    return "email";
  return null;
}

function mediumBucket(medium) {
  medium = lower(medium);
  if (!medium) return null;
  if (medium === "organic") return "organic";
  if (medium === "email" || medium === "e-mail" || medium === "newsletter") return "email";
  if (medium === "social" || medium === "social-network" || medium === "social_media") return "social";
  if (medium === "referral") return "referral";
  if (PAID_MEDIA.indexOf(medium) !== -1) return "paid";
  if (medium === "cpc" || medium === "ppc") return "paid";
  return null;
}

/**
 * Classify first-touch channel for this landing.
 * @param {{utm?: object, referrer?: string, locationHost?: string}} input
 */
export function classify(input) {
  input = input || {};
  var utm = input.utm || {};
  var source = lower(utm.utm_source);
  var medium = lower(utm.utm_medium);
  var campaign = lower(utm.utm_campaign);
  var ref = String(input.referrer || "");
  var refHost = hostFromReferrer(ref);
  var selfHost = lower(input.locationHost || "");

  var channel = null;
  var reason = "";

  var mBucket = mediumBucket(medium);
  if (mBucket === "paid" || (campaign && mBucket === "paid")) {
    channel = "campaign";
    reason = "utm_medium_paid";
  }

  if (!channel) {
    var fromSource = sourceToChannel(source);
    if (fromSource) {
      channel = fromSource;
      reason = "utm_source";
      if (fromSource === "google_search" && mBucket !== "organic" && mBucket === "paid") {
        channel = "campaign";
        reason = "google_paid";
      }
    }
  }

  if (!channel && mBucket === "email") {
    channel = "email";
    reason = "utm_medium_email";
  }
  if (!channel && mBucket === "organic") {
    channel = source === "google" || !source ? "google_search" : "organic";
    reason = "utm_medium_organic";
  }
  if (!channel && mBucket === "social" && source) {
    channel = sourceToChannel(source) || "referral";
    reason = "utm_medium_social";
  }

  if (!channel && campaign && (mBucket === "paid" || source)) {
    if (mBucket === "paid") {
      channel = "campaign";
      reason = "utm_campaign_paid";
    }
  }

  if (!channel && refHost) {
    if (selfHost && refHost === selfHost) {
      channel = null;
      reason = "self_referrer";
    } else if (isGoogleHost(refHost)) {
      channel = "google_search";
      reason = "referrer_google";
    } else if (isSearchHost(refHost)) {
      channel = "organic";
      reason = "referrer_search";
    } else {
      var social = socialFromHost(refHost);
      if (social) {
        channel = social;
        reason = "referrer_social";
      } else {
        channel = "referral";
        reason = "referrer_other";
      }
    }
  }

  if (!channel && reason !== "self_referrer") {
    channel = "direct";
    reason = "no_utm_no_referrer";
  }
  if (!channel && reason === "self_referrer") {
    channel = "direct";
    reason = "self_referrer_fallback";
  }

  var meta = CHANNELS.filter(function (c) {
    return c.id === channel;
  })[0];

  return {
    channel: channel,
    channel_label: (meta && meta.label) || channel,
    channel_group: (meta && meta.group) || "other",
    classify_reason: reason,
    utm_source: utm.utm_source || "",
    utm_medium: utm.utm_medium || "",
    utm_campaign: utm.utm_campaign || "",
    utm_content: utm.utm_content || "",
    utm_term: utm.utm_term || "",
    utm_id: utm.utm_id || "",
    referrer: ref,
    referrer_host: refHost,
    landing_path: input.landingPath || "",
    landing_location: input.landingLocation || ""
  };
}

export function readUtmsFromSearch(search) {
  var params = new URLSearchParams(search || "");
  var keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id"];
  var out = {};
  var any = false;
  keys.forEach(function (k) {
    var v = params.get(k);
    if (v) {
      out[k] = v;
      any = true;
    }
  });
  return any ? out : null;
}

export function buildShareUrl(baseUrl, channel, vars) {
  vars = vars || {};
  var tpl = UTM_TEMPLATES[channel];
  if (!tpl) return baseUrl;
  var q = tpl
    .replace("{campaign}", encodeURIComponent(vars.campaign || "share"))
    .replace("{content}", encodeURIComponent(vars.content || ""))
    .replace("{partner}", encodeURIComponent(vars.partner || "partner"))
    .replace("{creative}", encodeURIComponent(vars.creative || ""))
    .replace("{keyword}", encodeURIComponent(vars.keyword || ""));
  var join = String(baseUrl || "").indexOf("?") === -1 ? "" : "&";
  if (join) q = q.replace(/^\?/, "");
  return String(baseUrl || "") + (join ? "&" + q : q);
}
