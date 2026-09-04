/**
 * InfoparkDaily — email applications with the resume attached (no Google Sheet required)
 *
 * Setup (about 2 minutes):
 * 1. Open https://script.google.com → New project
 * 2. Delete any default code and paste this entire file
 * 3. Deploy → New deployment → Type: Web app
 *    Execute as: Me
 *    Who has access: Anyone
 * 4. Authorize, copy the /exec URL
 * 5. Paste that URL into data/applications-config.js → IPD_APPLICATIONS_API
 * 6. Redeploy the website
 *
 * After that, each apply emails infoparkstorieskochi@gmail.com WITH the PDF attached
 * and saves a copy in Google Drive folder "InfoparkDaily Job Applications".
 */

const NOTIFY_EMAIL = "infoparkstorieskochi@gmail.com";
const FROM_NAME = "InfoparkDaily Applications";
const DRIVE_FOLDER = "InfoparkDaily Job Applications";

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doGet() {
  return jsonOut_({ ok: true, service: "ipd-applications-mail" });
}

function resumeFolder_() {
  const existing = DriveApp.getFoldersByName(DRIVE_FOLDER);
  if (existing.hasNext()) return existing.next();
  return DriveApp.createFolder(DRIVE_FOLDER);
}

function parseBody_(e) {
  if (e && e.parameter && e.parameter.payload) {
    return JSON.parse(e.parameter.payload);
  }
  const raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
  return JSON.parse(raw);
}

function doPost(e) {
  try {
    const body = parseBody_(e);

    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim();
    const jobTitle = String(body.jobTitle || "").trim();
    const company = String(body.company || "").trim();
    const fileName = String(body.resumeFileName || "resume.pdf");
    const mime = String(body.resumeMimeType || "application/pdf");
    const base64 = String(body.resumeBase64 || "");

    if (!fullName || !email || !base64) {
      return jsonOut_({ ok: false, error: "Missing name, email, or resume" });
    }

    const bytes = Utilities.base64Decode(base64);
    const blob = Utilities.newBlob(bytes, mime, fileName);
    const id = String(body.id || "app-" + Date.now());
    const safeName = id + "__" + fileName.replace(/[^\w.\-()+ ]+/g, "_");
    const file = resumeFolder_().createFile(blob).setName(safeName);
    let driveUrl = "";
    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      driveUrl = file.getUrl();
    } catch (_e) {
      driveUrl = file.getUrl();
    }

    const subject =
      "Application: " +
      (jobTitle || "Role") +
      " — " +
      (company || "Company") +
      " — " +
      fullName;

    const html =
      "<p><strong>InfoparkDaily job application</strong></p>" +
      "<p>" +
      escapeHtml_(jobTitle) +
      " at " +
      escapeHtml_(company) +
      "</p>" +
      "<pre style='font-family:Georgia,serif;white-space:pre-wrap'>" +
      escapeHtml_(body.coverLetter || "") +
      "</pre>" +
      (driveUrl ? "<p><a href='" + driveUrl + "'>Download resume from Drive</a></p>" : "");

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: subject,
      htmlBody: html,
      body: String(body.coverLetter || subject),
      name: FROM_NAME,
      replyTo: email,
      attachments: [blob]
    });

    return jsonOut_({ ok: true, id: id, resumeDriveUrl: driveUrl });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  }
}

function escapeHtml_(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
