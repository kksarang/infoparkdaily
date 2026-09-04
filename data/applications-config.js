/**
 * InfoparkDaily — Job applications config
 *
 * To get the resume PDF in Gmail (required for shortlisting):
 *
 * BEST — Google Apps Script (real attachment + Drive copy):
 * 1. https://script.google.com → New project
 * 2. Paste scripts/applications-mail.gs
 * 3. Deploy → Web app → Execute as Me, Who has access: Anyone
 * 4. Paste the /exec URL into IPD_APPLICATIONS_API below, then redeploy the site
 *
 * FALLBACK — FormSubmit native form POST (AJAX cannot attach files):
 * After Activate Form, IPD_APPLICATIONS_FORMSUBMIT_KEY is used. Submit navigates
 * through FormSubmit so the PDF can attach, then returns to the job page.
 */
var IPD_APPLICATIONS_API =
  "https://script.google.com/macros/s/AKfycbwUiTVI_u2aM4_nTAdlwsFkMAcFA7blorheTErtW2D3mLDRuiq2sIms9yz0T1uIZtrLHw/exec";

/** Optional Formspree form endpoint (file uploads supported on paid plans). */
var IPD_APPLICATIONS_FORMSPREE = "";

/**
 * Send applications (with resume file) via FormSubmit when API/Formspree are empty.
 * Set to false only if you rely solely on Apps Script / Formspree.
 */
var IPD_APPLICATIONS_FORMSUBMIT = true;

/**
 * FormSubmit form id from the activation email (replaces the naked inbox in the action URL).
 * https://formsubmit.co/{this-key}
 */
var IPD_APPLICATIONS_FORMSUBMIT_KEY = "5edae36d9bd43a37c0a87d0f44194bc1";

/** Official InfoparkDaily inbox for application cover letters + resume. */
var IPD_APPLICATIONS_MAILTO = "infoparkstorieskochi@gmail.com";

/** localStorage key used as offline / admin mirror. */
var IPD_APPLICATIONS_STORAGE_KEY = "ipd-job-applications-v1";
