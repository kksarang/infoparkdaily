/**
 * InfoparkDaily — Job applications API (Google Sheets + Drive + email)
 *
 * Setup:
 * 1. Create a Google Sheet.
 * 2. Extensions → Apps Script → paste this file.
 * 3. (Optional) Create a Drive folder for resumes and set RESUME_FOLDER_ID below.
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the /exec URL into data/applications-config.js → IPD_APPLICATIONS_API
 *
 * Endpoints:
 *   GET  → list applications (JSON)
 *   POST → save application, store resume in Drive, email InfoparkDaily with cover letter
 */

const SHEET_NAME = "Applications";
const RESUME_FOLDER_ID = ""; // optional: paste a Drive folder ID
const NOTIFY_EMAIL = "infoparkstorieskochi@gmail.com";
const FROM_NAME = "InfoparkDaily Applications";

const HEADERS = [
  "id",
  "submittedAt",
  "jobId",
  "jobTitle",
  "company",
  "fullName",
  "email",
  "phone",
  "experience",
  "location",
  "portfolioUrl",
  "coverLetter",
  "message",
  "resumeFileName",
  "resumeDriveUrl",
  "resumeMimeType",
  "status",
  "source",
  "jobUrl"
];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
  } else if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
  }
  return sh;
}

function resumeFolder_() {
  if (RESUME_FOLDER_ID) {
    try {
      return DriveApp.getFolderById(RESUME_FOLDER_ID);
    } catch (_e) {
      /* fall through */
    }
  }
  const name = "InfoparkDaily Job Applications";
  const existing = DriveApp.getFoldersByName(name);
  if (existing.hasNext()) return existing.next();
  return DriveApp.createFolder(name);
}

function cors_(output) {
  return output;
}

function jsonOut_(obj) {
  return cors_(
    ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
      ContentService.MimeType.JSON
    )
  );
}

function rowToApp_(row) {
  const o = {};
  HEADERS.forEach(function (key, i) {
    o[key] = row[i] != null ? String(row[i]) : "";
  });
  return o;
}

function doGet(e) {
  const params = (e && e.parameter) || {};
  const jobId = String(params.jobId || "").trim();
  const sh = sheet_();
  const rows = sh.getDataRange().getValues();
  let apps = rows.slice(1).map(rowToApp_).filter(function (a) {
    return a.id && a.fullName;
  });
  if (jobId) {
    apps = apps.filter(function (a) {
      return a.jobId === jobId;
    });
  }
  apps.sort(function (a, b) {
    return String(b.submittedAt).localeCompare(String(a.submittedAt));
  });
  return jsonOut_({ ok: true, applications: apps });
}

function saveResume_(appId, fileName, mimeType, base64) {
  if (!base64 || !fileName) return { url: "", name: "" };
  const bytes = Utilities.base64Decode(base64);
  const blob = Utilities.newBlob(bytes, mimeType || "application/octet-stream", fileName);
  const folder = resumeFolder_();
  const safeName = appId + "__" + fileName.replace(/[^\w.\-()+ ]+/g, "_");
  const file = folder.createFile(blob).setName(safeName);
  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (_e) {
    /* sharing may be restricted by Workspace policy */
  }
  return { url: file.getUrl(), name: file.getName(), blob: blob };
}

function buildCoverLetterHtml_(body, app) {
  const lines = String(body || "")
    .split("\n")
    .map(function (line) {
      return line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    })
    .join("<br>");
  return (
    "<div style='font-family:Georgia,serif;font-size:15px;line-height:1.55;color:#111'>" +
    "<p style='margin:0 0 12px;color:#555;font-size:13px'>InfoparkDaily job application</p>" +
    "<p style='margin:0 0 16px'><strong>" +
    (app.jobTitle || "Role") +
    "</strong> at <strong>" +
    (app.company || "Company") +
    "</strong></p>" +
    "<div>" +
    lines +
    "</div>" +
    (app.resumeDriveUrl
      ? "<p style='margin:18px 0 0'><a href='" +
        app.resumeDriveUrl +
        "'>Download resume</a></p>"
      : "") +
    "</div>"
  );
}

function notifyEmail_(app, resumeBlob) {
  const subject =
    "Application: " +
    (app.jobTitle || "Role") +
    " — " +
    (app.company || "Company") +
    " — " +
    (app.fullName || "Candidate");

  const html = buildCoverLetterHtml_(app.coverLetter, app);
  const options = {
    htmlBody: html,
    name: FROM_NAME,
    replyTo: app.email || NOTIFY_EMAIL
  };
  if (resumeBlob) {
    options.attachments = [resumeBlob];
  }
  MailApp.sendEmail(NOTIFY_EMAIL, subject, app.coverLetter || subject, options);
}

function doPost(e) {
  try {
    const body =
      e && e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};

    if (body.action === "updateStatus") {
      return updateStatus_(body);
    }

    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const jobId = String(body.jobId || "").trim();
    const jobTitle = String(body.jobTitle || "").trim();
    const company = String(body.company || "").trim();

    if (!fullName || !email || !phone || !jobId) {
      return jsonOut_({ ok: false, error: "Missing required fields" });
    }

    const id = String(body.id || "app-" + Date.now());
    const submittedAt = String(
      body.submittedAt ||
        Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd'T'HH:mm:ssXXX")
    );

    const resume = saveResume_(
      id,
      String(body.resumeFileName || ""),
      String(body.resumeMimeType || ""),
      String(body.resumeBase64 || "")
    );

    const app = {
      id: id,
      submittedAt: submittedAt,
      jobId: jobId,
      jobTitle: jobTitle,
      company: company,
      fullName: fullName,
      email: email,
      phone: phone,
      experience: String(body.experience || "").trim(),
      location: String(body.location || "").trim(),
      portfolioUrl: String(body.portfolioUrl || "").trim(),
      coverLetter: String(body.coverLetter || "").trim(),
      message: String(body.message || "").trim(),
      resumeFileName: resume.name || String(body.resumeFileName || ""),
      resumeDriveUrl: resume.url || "",
      resumeMimeType: String(body.resumeMimeType || ""),
      status: "new",
      source: String(body.source || "InfoparkDaily Website"),
      jobUrl: String(body.jobUrl || "")
    };

    sheet_().appendRow(HEADERS.map(function (key) {
      return app[key] || "";
    }));

    try {
      notifyEmail_(app, resume.blob || null);
    } catch (mailErr) {
      return jsonOut_({
        ok: true,
        id: id,
        resumeDriveUrl: app.resumeDriveUrl,
        warning: "Saved but email failed: " + String(mailErr)
      });
    }

    return jsonOut_({ ok: true, id: id, resumeDriveUrl: app.resumeDriveUrl });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  }
}

function updateStatus_(body) {
  const id = String(body.id || "").trim();
  const status = String(body.status || "").trim();
  if (!id || !status) return jsonOut_({ ok: false, error: "Missing id/status" });

  const sh = sheet_();
  const rows = sh.getDataRange().getValues();
  const idCol = 0;
  const statusCol = HEADERS.indexOf("status");
  for (let r = 1; r < rows.length; r++) {
    if (String(rows[r][idCol]) === id) {
      sh.getRange(r + 1, statusCol + 1).setValue(status);
      return jsonOut_({ ok: true, id: id, status: status });
    }
  }
  return jsonOut_({ ok: false, error: "Not found" });
}
