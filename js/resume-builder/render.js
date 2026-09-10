import { sections } from "./schema.js";
export const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const colors = {
  navy: "#17334d",
  blue: "#245add",
  teal: "#087b77",
  charcoal: "#303d4b",
  burgundy: "#833344",
};
const fontFamilies = {
  sans: "Arial, sans-serif",
  serif: "Georgia, serif",
  mono: '"Courier New", monospace',
};
export function safeLink(v) {
  const s = String(v || "").trim();
  if (!s) return "";
  const u = /^https?:\/\//i.test(s) ? s : `https://${s}`;
  try {
    const p = new URL(u);
    if (
      !["http:", "https:"].includes(p.protocol) ||
      (/^[\w+.-]+:/.test(s) && !/^https?:/i.test(s))
    )
      return "";
    return p.href;
  } catch {
    return "";
  }
}
const link = (v) =>
  v
    ? `<a href="${esc(safeLink(v))}">${esc(v.replace(/^https?:\/\//, ""))}</a>`
    : "";
const month = (v) =>
  v
    ? new Date(v + "-01T00:00:00Z").toLocaleDateString("en-GB", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      })
    : "";
const dates = (e) =>
  [month(e.start), e.start && !e.end ? "Present" : month(e.end)]
    .filter(Boolean)
    .join(" – ");
const lines = (v) =>
  (v || []).filter((x) => x.trim()).length
    ? `<ul>${v
        .filter((x) => x.trim())
        .map((x) => `<li>${esc(x)}</li>`)
        .join("")}</ul>`
    : "";
const para = (v) => (v ? `<p>${esc(v).replace(/\n/g, "<br>")}</p>` : "");
function entry(key, e) {
  const heading = (a, b = "", c = "") =>
    `<div class="entry-heading"><strong>${esc(a)}</strong><span>${esc(c)}</span></div>${b ? `<div class="entry-sub">${esc(b)}</div>` : ""}`;
  if (key === "experience")
    return (
      heading(
        e.role,
        [e.employer, e.location].filter(Boolean).join(" · "),
        dates(e),
      ) + lines(e.bullets)
    );
  if (key === "education")
    return (
      heading(e.qualification, e.institution, dates(e)) +
      para([e.field, e.grade, e.details].filter(Boolean).join(" · "))
    );
  if (key === "skills")
    return `<p>${e.label ? `<strong>${esc(e.label)}: </strong>` : ""}${esc((e.items || []).join(" · "))}</p>`;
  if (key === "projects")
    return (
      heading(e.name, e.role) +
      para((e.technologies || []).join(" · ")) +
      link(e.url) +
      lines(e.bullets)
    );
  if (key === "certifications")
    return (
      heading(
        e.name,
        e.issuer,
        [month(e.issued), e.expiry ? `Expires ${month(e.expiry)}` : ""]
          .filter(Boolean)
          .join(" · "),
      ) + link(e.url)
    );
  if (key === "achievements") return heading(e.title) + para(e.details);
  if (key === "languages")
    return para([e.name, e.proficiency].filter(Boolean).join(" — "));
  if (key === "interests") return para(e.name);
  return heading(e.title) + lines(e.bullets);
}
export function renderResume(d, c) {
  const a = d.appearance;
  const color = colors[a.accent] || c.accent;
  const font =
    fontFamilies[a.font] || fontFamilies[c.font] || fontFamilies.sans;
  const order = [
    ...d.sectionOrder,
    ...Object.keys(sections).filter(
      (k) => !["personal", "customSections"].includes(k),
    ),
    ...d.customSections.map((e) => e.id),
  ].filter((v, i, l) => l.indexOf(v) === i && !d.hiddenSections.includes(v));
  const section = (key) => {
    const custom = d.customSections.find((x) => x.id === key);
    if (key === "summary")
      return d.summary.trim()
        ? `<section class="resume-section"><h2>Profile</h2><div class="section-body">${para(d.summary)}</div></section>`
        : "";
    const entries = custom ? [custom] : d[key];
    if (!entries?.length) return "";
    return `<section class="resume-section"><h2>${esc(custom?.heading || sections[key]?.name || key)}</h2><div class="section-body">${entries.map((e) => `<div class="resume-entry ${JSON.stringify(e).length > 1600 ? "long-entry" : ""}">${entry(key, e)}</div>`).join("")}</div></section>`;
  };
  const p = d.personal;
  const contact = [p.location, p.phone, p.email]
    .filter(Boolean)
    .map(esc)
    .join('<span class="sep"> · </span>');
  const header = `<header class="resume-header"><div class="identity"><h1>${esc(p.name || "Your name")}</h1>${p.headline ? `<div class="headline">${esc(p.headline)}</div>` : ""}</div><div class="contact-block"><div class="contact">${contact}</div><div class="links">${[p.linkedin, p.github, p.portfolio].filter(Boolean).map(link).join('<span class="sep"> · </span>')}</div></div></header>`;
  const sideKeys = [
    "skills",
    "education",
    "certifications",
    "languages",
    "interests",
  ];
  const body = ["sidebar", "rail", "split"].includes(c.family)
    ? `<div class="resume-columns"><div class="resume-main-column">${order
        .filter((k) => !sideKeys.includes(k))
        .map(section)
        .join("")}</div><aside>${order
        .filter((k) => sideKeys.includes(k))
        .map(section)
        .join("")}</aside></div>`
    : order.map(section).join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style>
 @page{size:A4;margin:16mm 17mm}*{box-sizing:border-box}html{background:white}body{margin:0;color:#243040;font:10pt/1.52 ${font};--accent:${color};--space:${a.density === "compact" ? "12" : a.density === "relaxed" ? "24" : c.spacing}px}a{color:inherit;text-decoration:none;overflow-wrap:anywhere}p{margin:6px 0;white-space:normal;overflow-wrap:anywhere}h1,h2,p{orphans:3;widows:3}h1{font-size:${c.nameSize}px;line-height:1.15;letter-spacing:${c.tracking}px;color:var(--accent);margin:0 0 8px;overflow-wrap:anywhere}h2{font-size:10pt;letter-spacing:${c.heading === "caps" ? "1.6" : "0"}px;text-transform:${c.heading === "caps" ? "uppercase" : "none"};color:var(--accent);margin:0 0 9px;border-bottom:${c.rule === "line" ? "1px solid #cad2db" : "0"};padding-bottom:5px;break-after:avoid}.resume-header{padding-bottom:18px;border-bottom:${c.rule === "double" ? "3px double" : "1px solid"} var(--accent);margin-bottom:var(--space)}.headline{font-size:12pt;margin:5px 0 9px}.contact,.links{font-size:9pt;line-height:1.8;overflow-wrap:anywhere}.sep{padding:0 3px}.resume-section{margin-top:var(--space)}.resume-entry{margin-bottom:12px;break-inside:avoid}.resume-entry.long-entry{break-inside:auto}.entry-heading{display:flex;justify-content:space-between;gap:14px;align-items:baseline;break-after:avoid}.entry-heading strong{overflow-wrap:anywhere}.entry-heading span{font-size:9pt;flex-shrink:0;color:#596573}.entry-sub{color:#566474;margin:2px 0 5px;break-after:avoid}ul{margin:6px 0;padding-left:17px}li{padding-left:2px;margin:4px 0;overflow-wrap:anywhere;orphans:3;widows:3}.family-centered .resume-header{text-align:center}.family-centered h2{text-align:center}.family-editorial h1{font-family:Georgia,serif;font-weight:normal}.family-editorial h2{font-size:13pt;font-family:Georgia,serif}.family-compact{font-size:9.5pt}.family-compact .resume-entry{margin-bottom:8px}.family-executive .resume-header{border-top:5px solid var(--accent);padding-top:20px}.family-executive h2{background:#f1f3f6;padding:6px 9px}.resume-columns{display:grid;grid-template-columns:minmax(0,1fr) ${c.sideWidth || 29}%;gap:24px}.resume-columns aside{border-left:1px solid #dce1e6;padding-left:17px}.resume-columns .entry-heading{display:block}.resume-columns .entry-heading span{display:block;margin-top:3px}.style-label h2{border-left:3px solid var(--accent);padding-left:9px}.style-band .resume-header{background:#f0f3f7;padding:20px}.style-smallcaps .headline{text-transform:uppercase;letter-spacing:2px;font-size:10pt}.style-timeline .resume-entry{padding-left:12px;border-left:1px solid #c7cfd8}.style-airy h2{margin-top:25px}.style-rule .resume-section{border-top:1px solid #e1e5e9;padding-top:10px}@media screen{body{padding:60px 64px;min-height:1123px;width:794px}}@media print{.resume-header{break-inside:avoid}.resume-section h2{break-after:avoid}a{color:inherit}}

 /* Studio compositions: structural layouts shared by preview and export. */
 .section-body{min-width:0}.resume-main-column{min-width:0}.resume-columns aside{min-width:0}
 .family-ribbon .resume-header{background:var(--accent);color:white;padding:25px 28px;border:0;margin-bottom:26px}
 .family-ribbon .resume-header h1,.family-ribbon .resume-header a{color:white}
 .family-ribbon .headline{font-size:13pt}.family-ribbon .contact-block{border-top:1px solid #ffffff55;margin-top:14px;padding-top:10px}
 .family-ribbon .resume-section>h2{padding:0 0 7px;border-bottom:2px solid var(--accent)}
 .family-rail .resume-header{border-bottom:0;margin:0 0 22px;padding:0 0 16px;border-top:6px solid var(--accent);padding-top:20px}
 .family-rail .resume-columns{grid-template-columns:30% minmax(0,1fr);gap:24px}
 .family-rail .resume-main-column{grid-column:2;grid-row:1}
 .family-rail .resume-columns aside{grid-column:1;grid-row:1;background:var(--accent);color:white;border:0;padding:18px 17px}
 .family-rail aside h2,.family-rail aside .entry-sub,.family-rail aside .entry-heading span{color:white}
 .family-rail aside h2{border-color:#ffffff66;font-size:9pt;letter-spacing:.7px}
 .family-rail aside .resume-section:first-child{margin-top:0}.family-rail aside .resume-entry{font-size:9pt}
 .family-rail .resume-main-column .resume-section:first-child{margin-top:0}
 .family-ledger .resume-header{border-top:2px solid var(--accent);padding-top:20px;padding-bottom:20px}
 .family-ledger .resume-section{display:grid;grid-template-columns:110px minmax(0,1fr);gap:22px;border-top:1px solid #dce1e7;padding-top:16px}
 .family-ledger .resume-section>h2{border:0;font-size:9pt;letter-spacing:.5px;padding:0;margin:0;overflow-wrap:anywhere}
 .family-ledger .resume-section .section-body>p:first-child{margin-top:0}
 .family-ledger .entry-heading{display:block}.family-ledger .entry-heading span{display:block;margin-top:3px;font-size:8.5pt}
 .family-folio .resume-header{border-top:1px solid var(--accent);border-bottom:4px solid var(--accent);padding:24px 0 21px}
 .family-folio .identity h1{font-weight:400;letter-spacing:-1px;max-width:95%}
 .family-folio .headline{font-size:13pt;letter-spacing:.4px;margin:12px 0}
 .family-folio .resume-section>h2{font-family:Georgia,serif;font-size:13pt;font-weight:400;text-transform:none;letter-spacing:0;border:0;display:flex;align-items:center;gap:13px}
 .family-folio .resume-section>h2:after{content:'';height:1px;background:#ccd3d9;flex:1}
 .family-masthead .resume-header{display:grid;grid-template-columns:minmax(0,1fr) 32%;gap:23px;border:0;border-bottom:4px solid var(--accent);padding-bottom:24px}
 .family-masthead .contact-block{border-left:1px solid var(--accent);padding-left:17px;align-self:center}
 .family-masthead .contact,.family-masthead .links{font-size:8.5pt}.family-masthead .contact .sep,.family-masthead .links .sep{display:block;font-size:0;line-height:4px;height:4px}
 .family-masthead .resume-section>h2{border-bottom:0;border-left:4px solid var(--accent);padding:2px 0 2px 10px;margin-bottom:13px}
 .family-split .resume-header{padding:23px 25px;background:#f0f3f6;border-bottom:0;border-left:8px solid var(--accent);margin-bottom:24px}
 .family-split .resume-columns{grid-template-columns:minmax(0,1fr) 31%;gap:25px}
 .family-split .resume-columns aside{padding:0 0 0 18px;border-left:2px solid var(--accent)}
 .family-split .resume-section>h2{font-size:9pt;letter-spacing:1px}
 .family-split aside .resume-entry{font-size:9pt}.family-split .resume-section:first-child{margin-top:0}
 </style></head><body class="family-${esc(c.family)} style-${esc(c.style)}">${header}${body}</body></html>`;
}
