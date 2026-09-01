/**
 * InfoparkDaily — Community reviews
 * Add Google review excerpts to IPD_REVIEWS after they appear on the Business Profile.
 * Public website reviews are loaded from /data/site-reviews.json (and optional API below).
 */
var IPD_GOOGLE_REVIEW_URL = "https://g.page/r/Cf_jW_WIN2EoEBM/review";

/** Curated reviews (shown to all visitors). */
var IPD_REVIEWS = [];

/** Public JSON list — commit updates or use the optional reviews API. */
var IPD_SITE_REVIEWS_URL = "/data/site-reviews.json";

/**
 * Optional: Google Apps Script web app URL for shared reviews (GET list, POST new).
 * Deploy scripts/reviews-api.gs to Google Sheets, then paste the /exec URL here.
 */
var IPD_REVIEWS_API = "";

/** Optional: Formspree endpoint to email new reviews for moderation. */
var IPD_REVIEW_FORMSPREE = "";
