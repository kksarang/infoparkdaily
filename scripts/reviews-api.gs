/**
 * InfoparkDaily — optional Google Sheets reviews API
 *
 * Setup:
 * 1. Create a Google Sheet with columns: id | author | rating | date | text | source
 * 2. Extensions → Apps Script → paste this file → Deploy → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 3. Copy the /exec URL into data/review-data.js → IPD_REVIEWS_API
 */

const SHEET_NAME = "Reviews";

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(["id", "author", "rating", "date", "text", "source"]);
  }
  return sh;
}

function rowToReview(row) {
  return {
    id: String(row[0] || ""),
    author: String(row[1] || "Community member"),
    rating: Number(row[2]) || 5,
    date: String(row[3] || ""),
    text: String(row[4] || ""),
    source: String(row[5] || "InfoparkDaily Website"),
  };
}

function doGet() {
  const sh = sheet_();
  const rows = sh.getDataRange().getValues();
  const reviews = rows.slice(1).map(rowToReview).filter(function (r) {
    return r.text;
  });
  return ContentService.createTextOutput(JSON.stringify(reviews)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doPost(e) {
  const body = e && e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
  const id = String(body.id || "review-" + Date.now());
  const author = String(body.author || body.name || "Community member");
  const rating = Math.max(1, Math.min(5, Number(body.rating) || 5));
  const date = String(body.date || Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd"));
  const text = String(body.text || body.message || "").trim();
  const source = String(body.source || "InfoparkDaily Website");

  if (!text || text.length < 8) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Too short" })).setMimeType(
      ContentService.MimeType.JSON
    );
  }

  sheet_().appendRow([id, author, rating, date, text, source]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true, id: id })).setMimeType(
    ContentService.MimeType.JSON
  );
}
