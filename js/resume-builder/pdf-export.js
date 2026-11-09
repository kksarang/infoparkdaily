/* One-tap resume PDF download — no print dialog, on phones and computers.
 *
 * How it works
 *  1. The resume HTML (the same markup as the live preview) is laid out in a hidden frame at
 *     the width of an A4 page's printable area.
 *  2. Page breaks are chosen so no line of text is cut and no heading is left at a page bottom.
 *  3. Each A4 page is drawn as a sharp image (≈240 dpi) — it looks exactly like the preview.
 *  4. An invisible text layer is placed over every line, in reading order, so the PDF text can
 *     be selected, searched and read by ATS software. Links (email, LinkedIn…) stay clickable.
 *
 * The two libraries (html2canvas, jsPDF — both MIT) load only when someone downloads.
 */

const LIBS = ["/vendor/html2canvas/html2canvas.min.js", "/vendor/jspdf/jspdf.umd.min.js"];
const A4 = { w: 595.28, h: 841.89 }; // points
const M = { top: 40, right: 42, bottom: 40, left: 42 }; // ≈ 14 mm / 15 mm, as in the print CSS
const PX = 0.75; // 1 CSS px = 0.75 pt
const CONTENT_PT = A4.w - M.left - M.right;
const CONTENT_PX = Math.round(CONTENT_PT / PX);
const PAGE_PX = (A4.h - M.top - M.bottom) / PX;
const SCALE = 2.5; // image resolution: 2.5 × 96 dpi = 240 dpi
/* A resume that overflows one page by a little (a stray last line) is shrunk to fit one page
   instead of starting a mostly empty second page. Text stays at least 83% of its size. */
const FIT_LIMIT = 1.2;

let loading = null;
function loadLibs() {
  if (window.jspdf && window.html2canvas) return Promise.resolve();
  loading ||= Promise.all(
    LIBS.map(
      (src) =>
        new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = src;
          s.async = true;
          s.onload = resolve;
          s.onerror = () => reject(new Error("Could not load the PDF tools. Check your connection and try again."));
          document.head.append(s);
        }),
    ),
  ).catch((e) => {
    loading = null;
    throw e;
  });
  return loading;
}

/* The invisible text layer uses a built-in PDF font, which covers Western European text.
   Map the few common characters outside it; the visible page is unaffected. */
function layerText(s) {
  return s
    .replace(/₹/g, "Rs.")
    .replace(/[‐‑‒]/g, "-")
    .replace(/[   ]/g, " ")
    .replace(/[^\u0000-ÿŒœŠšŸŽžƒˆ˜–—‘-‚“-„†-•…‰‹›€™]/g, "");
}

function transform(text, tt) {
  if (tt === "uppercase") return text.toUpperCase();
  if (tt === "lowercase") return text.toLowerCase();
  if (tt === "capitalize") return text.replace(/\b\p{L}/gu, (c) => c.toUpperCase());
  return text;
}

/* html2canvas cannot read CSS Color 4 values such as color(srgb …) (from color-mix() tints in
   some templates). Rewrite them to rgba() on the hidden copy before drawing. */
const COLOR_PROPS = ["color", "background-color", "background-image", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color", "outline-color", "text-decoration-color", "box-shadow", "column-rule-color", "fill", "stroke"];
function toRgba(value) {
  return value.replace(/color\(\s*(?:srgb|display-p3)\s+([\d.e-]+)\s+([\d.e-]+)\s+([\d.e-]+)(?:\s*\/\s*([\d.e%-]+))?\s*\)/g, (_m, r, g, b, a) => {
    const c = (v) => Math.round(Math.min(1, Math.max(0, parseFloat(v))) * 255);
    const alpha = a === undefined ? 1 : a.endsWith("%") ? parseFloat(a) / 100 : parseFloat(a);
    return `rgba(${c(r)}, ${c(g)}, ${c(b)}, ${alpha})`;
  }).replace(/\b(?:oklch|oklab|lab|lch)\([^)]*\)/g, "rgba(0, 0, 0, 0)");
}
function normaliseColors(doc) {
  const win = doc.defaultView;
  for (const el of doc.body.querySelectorAll("*")) {
    for (const pseudo of [null, "::before", "::after"]) {
      const cs = win.getComputedStyle(el, pseudo);
      for (const prop of COLOR_PROPS) {
        const v = cs.getPropertyValue(prop);
        if (v && /color\(|oklch\(|oklab\(|\blab\(|\blch\(/.test(v)) {
          if (pseudo) continue; /* pseudo-elements: their parent's tint is enough for the page */
          el.style.setProperty(prop, toRgba(v), "important");
        }
      }
    }
  }
}

/* Every visible line of text, with its box and font size, in document (reading) order. */
function collectLines(doc) {
  const lines = [];
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
  const range = doc.createRange();
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const raw = node.nodeValue;
    if (!raw || !raw.trim()) continue;
    const el = node.parentElement;
    const cs = doc.defaultView.getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none") continue;
    const fontPx = parseFloat(cs.fontSize) || 12;
    let current = null;
    const re = /\S+/g;
    let m;
    while ((m = re.exec(raw))) {
      range.setStart(node, m.index);
      range.setEnd(node, m.index + m[0].length);
      const r = range.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if (current && Math.abs(r.top - current.top) < fontPx * 0.5) {
        current.right = Math.max(current.right, r.right);
        current.bottom = Math.max(current.bottom, r.bottom);
        current.words.push(m[0]);
      } else {
        current = { top: r.top, bottom: r.bottom, left: r.left, right: r.right, words: [m[0]], fontPx, tt: cs.textTransform };
        lines.push(current);
      }
    }
  }
  for (const l of lines) l.text = transform(l.words.join(" "), l.tt);
  return lines;
}

/* Page breaks that never cut a line and keep headings with what follows. */
function pageBreaks(doc, lines, total) {
  const heads = [...doc.querySelectorAll("h2, .entry-heading, .resume-entry > strong")].map((h) => h.getBoundingClientRect());
  const breaks = [0];
  let y = 0;
  while (y + PAGE_PX < total - 1) {
    let cut = y + PAGE_PX;
    for (let pass = 0; pass < 4; pass += 1) {
      for (const l of lines) if (l.top < cut && l.bottom > cut) cut = Math.min(cut, l.top - 2);
      for (const h of heads) if (h.top < cut && h.bottom + 28 > cut) cut = Math.min(cut, h.top - 4);
    }
    if (cut < y + PAGE_PX * 0.5) cut = y + PAGE_PX; /* never leave a page mostly empty */
    breaks.push(cut);
    y = cut;
  }
  breaks.push(total);
  return breaks;
}

/* Safety limits: a resume that hits any of these is not downloaded broken — the caller
   falls back to the print view instead. */
const TIME_LIMIT_MS = 30000;
const MAX_PAGES = 12;
const MIN_BYTES = 2000;
const MAX_BYTES = 15 * 1024 * 1024;

/** Build the PDF and return it as a Blob. Rejects (never returns a broken file) on any problem. */
export function resumePdfBlob(html, title = "Resume") {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error("Making the PDF took too long on this device.")), TIME_LIMIT_MS);
  });
  return Promise.race([buildPdf(html, title), timeout]).finally(() => clearTimeout(timer));
}

async function buildPdf(html, title) {
  await loadLibs();
  /* Phones with little memory get a slightly lighter image (still ≈190 dpi). */
  const scale = (navigator.deviceMemory || 4) <= 2 ? 2 : SCALE;
  const frame = document.createElement("iframe");
  frame.setAttribute("aria-hidden", "true");
  frame.tabIndex = -1;
  Object.assign(frame.style, { position: "fixed", left: "-10000px", top: "0", width: CONTENT_PX + "px", height: "1200px", border: "0" });
  document.body.append(frame);
  try {
    const doc = frame.contentDocument;
    doc.open();
    /* The preview adds screen padding and a fixed page width; the PDF margins replace both. */
    doc.write(
      html.replace(
        "</head>",
        `<style>html,body{background:#fff!important}body{padding:0!important;margin:0!important;width:${CONTENT_PX}px!important;min-height:0!important}</style></head>`,
      ),
    );
    doc.close();
    if (doc.fonts?.ready) await doc.fonts.ready;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    normaliseColors(doc);
    const total = Math.ceil(doc.body.scrollHeight);
    frame.style.height = total + "px";
    const lines = collectLines(doc);
    if (!lines.length || total < 20) throw new Error("The resume looks empty, so there is nothing to download yet.");
    const links = [...doc.querySelectorAll("a[href]")]
      .map((a) => ({ href: a.getAttribute("href"), r: a.getBoundingClientRect() }))
      .filter((l) => /^(https?:|mailto:|tel:)/i.test(l.href) && l.r.width);
    const fit = total > PAGE_PX && total <= PAGE_PX * FIT_LIMIT ? PAGE_PX / total : 1;
    const breaks = fit < 1 ? [0, total] : pageBreaks(doc, lines, total);
    if (breaks.length - 1 > MAX_PAGES) throw new Error("This resume is longer than " + MAX_PAGES + " pages.");
    const k = PX * fit; /* CSS px → PDF pt on the page */
    let written = 0;
    const x0 = M.left + (CONTENT_PT - CONTENT_PT * fit) / 2; /* keep a shrunk page centred */

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait", compress: true });
    pdf.setProperties({ title, subject: "Resume", creator: "InfoparkDaily Resume Builder" });
    pdf.setFont("helvetica", "normal");

    for (let p = 0; p < breaks.length - 1; p += 1) {
      const y0 = breaks[p];
      const y1 = breaks[p + 1];
      if (p > 0) pdf.addPage("a4", "portrait");
      const canvas = await window.html2canvas(doc.body, {
        scale,
        x: 0,
        y: y0,
        width: CONTENT_PX,
        height: Math.ceil(y1 - y0),
        windowWidth: CONTENT_PX,
        windowHeight: total,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
      });
      if (!canvas.width || !canvas.height) throw new Error("The page image could not be drawn on this device.");
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.9), "JPEG", x0, M.top, CONTENT_PT * fit, (y1 - y0) * k, undefined, "FAST");
      canvas.width = canvas.height = 0; /* free memory on phones */

      for (const l of lines) {
        if (l.top < y0 - 1 || l.top >= y1 - 1) continue;
        const text = layerText(l.text);
        if (!text.trim()) continue;
        pdf.setFontSize(l.fontPx * k);
        const natural = pdf.getTextWidth(text) || 1;
        const target = (l.right - l.left) * k;
        pdf.text(text, x0 + l.left * k, M.top + (l.top - y0) * k, {
          baseline: "top",
          renderingMode: "invisible",
          horizontalScale: Math.max(0.3, Math.min(3, target / natural)),
        });
        written += 1;
      }
      for (const q of links) {
        if (q.r.top < y0 || q.r.top >= y1) continue;
        pdf.link(x0 + q.r.left * k, M.top + (q.r.top - y0) * k, q.r.width * k, q.r.height * k, { url: q.href });
      }
    }
    /* Final checks before anyone gets the file. */
    if (!written) throw new Error("The PDF text could not be written.");
    const blob = pdf.output("blob");
    if (blob.size < MIN_BYTES || blob.size > MAX_BYTES) throw new Error("The PDF came out the wrong size.");
    return blob;
  } finally {
    frame.remove();
  }
}

/** Save the blob as a file. Works on Android Chrome, iOS Safari 13+ and desktop browsers. */
export function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

/** Share sheet with the PDF attached (WhatsApp, Gmail, Drive…) where the phone supports it. */
export function canSharePdf() {
  try {
    const f = new File([""], "resume.pdf", { type: "application/pdf" });
    return Boolean(navigator.canShare && navigator.canShare({ files: [f] }));
  } catch {
    return false;
  }
}
export async function sharePdf(blob, filename, title) {
  const file = new File([blob], filename, { type: "application/pdf" });
  await navigator.share({ files: [file], title });
}

export function pdfFilename(title) {
  return (String(title || "").replace(/[^a-z0-9 _-]/gi, "").trim().replace(/\s+/g, "-") || "resume") + ".pdf";
}
