/**
 * InfoparkDaily — Job applications config
 *
 * SETUP (recommended for production storage + email):
 * 1. Create a Google Sheet.
 * 2. Extensions → Apps Script → paste scripts/applications-api.gs → Deploy as Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 3. Paste the /exec URL into IPD_APPLICATIONS_API below.
 *
 * Optional: Formspree endpoint with file upload enabled (emails submissions).
 * Until the API is set, applications still save in this browser (localStorage)
 * and open a mailto: cover letter to InfoparkDaily official email.
 */
var IPD_APPLICATIONS_API = "";

/** Optional Formspree form endpoint (file uploads supported on paid plans). */
var IPD_APPLICATIONS_FORMSPREE = "";

/** Official InfoparkDaily inbox for application cover letters. */
var IPD_APPLICATIONS_MAILTO = "infoparkstorieskochi@gmail.com";

/** localStorage key used as offline / admin mirror. */
var IPD_APPLICATIONS_STORAGE_KEY = "ipd-job-applications-v1";
