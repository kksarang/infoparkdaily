/**
 * InfoparkDaily — Job applications config
 *
 * Delivery order on submit:
 * 1) Google Apps Script API (best — Drive resume + email with attachment)
 * 2) Formspree (if endpoint set, file upload plan)
 * 3) FormSubmit.co native multipart email with resume attached (default)
 *
 * mailto: cannot attach files — it is never used when a resume is uploaded.
 *
 * Apps Script setup:
 * 1. Create a Google Sheet → Extensions → Apps Script → paste scripts/applications-api.gs
 * 2. Deploy → Web app (Execute as: Me, Who has access: Anyone)
 * 3. Paste the /exec URL into IPD_APPLICATIONS_API below.
 *
 * FormSubmit: after Activate Form, use IPD_APPLICATIONS_FORMSUBMIT_KEY (not the naked email)
 * in the form action. File uploads require enctype=multipart/form-data and input name=attachment.
 */
var IPD_APPLICATIONS_API = "";

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
