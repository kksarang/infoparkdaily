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
const icons = {
  email:
    '<svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  phone:
    '<svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"/></svg>',
  location:
    '<svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M6.9 8.5H3.6V20h3.3V8.5zM5.2 3.5A1.9 1.9 0 1 0 5.2 7.3 1.9 1.9 0 0 0 5.2 3.5zM20.4 20h-3.3v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20H9.9V8.5h3.2v1.6h.1c.4-.8 1.5-1.8 3.2-1.8 3.4 0 4 2.2 4 5.1V20z"/></svg>',
  github:
    '<svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7 3.6 3.6 0 0 1 .1-2.7s.8-.3 2.8 1a9.6 9.6 0 0 1 5 0c2-.1 2.8-1 2.8-1a3.6 3.6 0 0 1 .1 2.7 3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>',
  web: '<svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm7.9 9h-3.2a15 15 0 0 0-1.3-5 8 8 0 0 1 4.5 5zM12 4c.9 1.3 1.6 3 2 5H10c.4-2 1.1-3.7 2-5zM4.1 11A8 8 0 0 1 8.6 6a15 15 0 0 0-1.3 5H4.1zm0 2h3.2a15 15 0 0 0 1.3 5 8 8 0 0 1-4.5-5zM12 20c-.9-1.3-1.6-3-2-5h4c-.4 2-1.1 3.7-2 5zm3.4-2a15 15 0 0 0 1.3-5h3.2a8 8 0 0 1-4.5 5zM9.5 13a13 13 0 0 1 0-2h5a13 13 0 0 1 0 2h-5z"/></svg>',
};
function contactItem(type, value, asLink = false) {
  if (!value) return "";
  const content = asLink ? link(value) : esc(value);
  return `<div class="contact-item">${icons[type] || icons.web}<span>${content}</span></div>`;
}
function proficiencyLevel(raw) {
  const s = String(raw || "")
    .trim()
    .toLowerCase();
  if (!s) return 3;
  const n = Number.parseInt(s, 10);
  if (n >= 1 && n <= 5) return n;
  if (/native|fluent|c2|full professional|bilingual/.test(s)) return 5;
  if (/advanced|c1|professional|proficient/.test(s)) return 4;
  if (/intermediate|b1|b2|working|conversational/.test(s)) return 3;
  if (/basic|elementary|a2|limited/.test(s)) return 2;
  if (/beginner|a1/.test(s)) return 1;
  return 3;
}
function languageDots(level) {
  return `<span class="lang-dots" aria-hidden="true">${[1, 2, 3, 4, 5]
    .map((i) => `<i class="${i <= level ? "on" : ""}"></i>`)
    .join("")}</span>`;
}
function initialsFrom(name) {
  return (
    String(name || "Y")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "Y"
  );
}
function entry(key, e, family = "classic") {
  const heading = (a, b = "", c = "") =>
    `<div class="entry-heading"><strong>${esc(a)}</strong><span>${esc(c)}</span></div>${b ? `<div class="entry-sub">${esc(b)}</div>` : ""}`;
  if (family === "gallery" && key === "experience") {
    return `<div class="gallery-entry"><div class="gallery-meta"><span>${esc(dates(e))}</span>${e.location ? `<span>${esc(e.location)}</span>` : ""}</div><div class="gallery-content"><strong>${esc(e.employer || e.role)}</strong>${e.employer && e.role ? `<div class="entry-sub">${esc(e.role)}</div>` : ""}${lines(e.bullets)}</div></div>`;
  }
  if (family === "gallery" && key === "education") {
    return `<div class="gallery-entry"><div class="gallery-meta"><span>${esc(dates(e))}</span></div><div class="gallery-content"><strong>${esc(e.institution || e.qualification)}</strong>${e.qualification ? `<div class="entry-sub">${esc(e.qualification)}</div>` : ""}${para([e.field, e.grade, e.details].filter(Boolean).join(" · "))}</div></div>`;
  }
  if (family === "gallery" && key === "skills") {
    const items = (e.items || []).filter((x) => String(x).trim());
    if (!items.length) return "";
    return `<ul class="skills-grid">${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  }
  if (family === "gallery" && key === "languages") {
    return `<div class="lang-row"><span>${esc(e.name)}</span>${languageDots(proficiencyLevel(e.proficiency))}</div>`;
  }
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
    const galleryTitles = {
      summary: "Summary",
      experience: "Professional Experience",
      education: "Education",
      skills: "Skills",
      languages: "Languages",
      projects: "Projects",
      certifications: "Certifications",
      achievements: "Achievements",
      interests: "Interests",
    };
    const title =
      c.family === "gallery"
        ? galleryTitles[key] || custom?.heading || sections[key]?.name || key
        : custom?.heading || sections[key]?.name || key;
    if (key === "summary")
      return d.summary.trim()
        ? `<section class="resume-section"><h2>${esc(title)}</h2><div class="section-body">${para(d.summary)}</div></section>`
        : "";
    const entries = custom ? [custom] : d[key];
    if (!entries?.length) return "";
    return `<section class="resume-section"><h2>${esc(title)}</h2><div class="section-body">${entries.map((e) => `<div class="resume-entry ${JSON.stringify(e).length > 1600 ? "long-entry" : ""}">${entry(key, e, c.family)}</div>`).join("")}</div></section>`;
  };
  const p = d.personal;
  const contact = [p.location, p.phone, p.email]
    .filter(Boolean)
    .map(esc)
    .join('<span class="sep"> · </span>');
  const header =
    c.family === "gallery"
      ? `<header class="resume-header"><div class="gallery-avatar" aria-hidden="true">${esc(initialsFrom(p.name))}</div><div class="gallery-intro"><div class="identity"><h1>${esc(p.name || "Your name")}</h1>${p.headline ? `<div class="headline">${esc(p.headline)}</div>` : ""}</div><div class="contact-grid">${contactItem("email", p.email)}${contactItem("phone", p.phone)}${contactItem("linkedin", p.linkedin, true)}${contactItem("location", p.location)}${contactItem("github", p.github, true)}${contactItem("web", p.portfolio, true)}</div></div></header>`
      : `<header class="resume-header"><div class="identity"><h1>${esc(p.name || "Your name")}</h1>${p.headline ? `<div class="headline">${esc(p.headline)}</div>` : ""}</div><div class="contact-block"><div class="contact">${contact}</div><div class="links">${[p.linkedin, p.github, p.portfolio].filter(Boolean).map(link).join('<span class="sep"> · </span>')}</div></div></header>`;
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
 @page{size:A4;margin:14mm 15mm}*{box-sizing:border-box}html{background:white}body{margin:0;color:#1f2937;font:10pt/1.55 ${font};--accent:${color};--muted:#64748b;--line:#e2e8f0;--soft:#f8fafc;--space:${a.density === "compact" ? "12" : a.density === "relaxed" ? "24" : c.spacing}px}a{color:inherit;text-decoration:none;overflow-wrap:anywhere}p{margin:6px 0;white-space:normal;overflow-wrap:anywhere}h1,h2,p{orphans:3;widows:3}h1{font-size:${c.nameSize}px;line-height:1.12;letter-spacing:${c.tracking}px;color:var(--accent);margin:0 0 6px;overflow-wrap:anywhere;font-weight:700}h2{font-size:9.5pt;letter-spacing:${c.heading === "caps" ? "1.4" : "0"}px;text-transform:${c.heading === "caps" ? "uppercase" : "none"};color:var(--accent);margin:0 0 10px;border-bottom:${c.rule === "line" ? "1px solid var(--line)" : "0"};padding-bottom:5px;break-after:avoid;font-weight:700}.resume-header{padding-bottom:16px;border-bottom:${c.rule === "double" ? "3px double" : "1.5px solid"} var(--accent);margin-bottom:var(--space)}.headline{font-size:11.5pt;margin:4px 0 8px;color:#334155;font-weight:600}.contact,.links{font-size:9pt;line-height:1.75;color:var(--muted);overflow-wrap:anywhere}.sep{padding:0 3px;color:#94a3b8}.resume-section{margin-top:var(--space)}.resume-entry{margin-bottom:11px;break-inside:avoid}.resume-entry.long-entry{break-inside:auto}.entry-heading{display:flex;justify-content:space-between;gap:14px;align-items:baseline;break-after:avoid}.entry-heading strong{overflow-wrap:anywhere;font-weight:700;color:#0f172a}.entry-heading span{font-size:8.5pt;flex-shrink:0;color:var(--muted)}.entry-sub{color:var(--muted);margin:2px 0 5px;break-after:avoid;font-size:9.5pt}ul{margin:5px 0;padding-left:16px}li{padding-left:2px;margin:3px 0;overflow-wrap:anywhere;orphans:3;widows:3;color:#334155}.family-centered .resume-header{text-align:center}.family-centered h2{text-align:center}.family-centered .contact-block{margin-top:8px}.family-editorial h1{font-family:Georgia,"Times New Roman",serif;font-weight:400;letter-spacing:-0.5px}.family-editorial h2{font-size:12pt;font-family:Georgia,serif;font-weight:400;text-transform:none;letter-spacing:0;border-bottom:1px solid var(--line)}.family-compact{font-size:9.5pt;line-height:1.45}.family-compact .resume-entry{margin-bottom:7px}.family-compact h2{margin-bottom:7px}.family-executive .resume-header{border:0;border-top:6px solid var(--accent);padding-top:18px;margin-bottom:22px}.family-executive h2{background:var(--soft);padding:7px 10px;border:0;border-left:3px solid var(--accent)}.family-classic h2{letter-spacing:1.2px}.resume-columns{display:grid;grid-template-columns:minmax(0,1fr) ${c.sideWidth || 30}%;gap:22px;align-items:start}.resume-columns aside{border-left:1px solid var(--line);padding-left:16px}.resume-columns .entry-heading{display:block}.resume-columns .entry-heading span{display:block;margin-top:2px}.resume-columns aside .resume-section{margin-top:16px}.resume-columns aside .resume-section:first-child{margin-top:0}.resume-columns aside h2{font-size:8.5pt;letter-spacing:1.2px}.resume-columns aside .resume-entry,.resume-columns aside p,.resume-columns aside li{font-size:8.75pt}.style-label h2{border:0;border-left:3px solid var(--accent);padding:2px 0 2px 10px}.style-band .resume-header{background:var(--soft);padding:22px 24px;border-bottom:0;border-left:5px solid var(--accent)}.style-smallcaps .headline{text-transform:uppercase;letter-spacing:1.8px;font-size:9.5pt;font-weight:700}.style-timeline .resume-entry{padding-left:12px;border-left:2px solid #cbd5e1;margin-left:2px}.style-airy h2{margin-top:26px}.style-rule .resume-section{border-top:1px solid var(--line);padding-top:12px}.style-rule .resume-section:first-child{border-top:0;padding-top:0}@media screen{body{padding:48px 52px;min-height:1123px;width:794px}}@media print{.resume-header{break-inside:avoid}.resume-section h2{break-after:avoid}a{color:inherit}}

 /* Studio compositions: Canva-like structural layouts. */
 .section-body{min-width:0}.resume-main-column{min-width:0}.resume-columns aside{min-width:0}
 .family-sidebar .resume-header{border-bottom:2px solid var(--accent);padding-bottom:14px}
 .family-sidebar .resume-columns{grid-template-columns:${c.sideWidth || 32}% minmax(0,1fr);gap:0}
 .family-sidebar .resume-main-column{grid-column:2;grid-row:1;padding-left:22px}
 .family-sidebar .resume-columns aside{grid-column:1;grid-row:1;background:color-mix(in srgb,var(--accent) 8%,#f8fafc);border:0;padding:18px 16px;border-radius:4px}
 .family-sidebar aside h2{color:var(--accent);border-bottom:1px solid color-mix(in srgb,var(--accent) 25%,transparent)}
 .family-ribbon .resume-header{background:var(--accent);color:#fff;padding:26px 28px;border:0;margin:0 0 24px;border-radius:4px}
 .family-ribbon .resume-header h1,.family-ribbon .resume-header a{color:#fff}
 .family-ribbon .headline{font-size:12.5pt;color:#f8fafc;font-weight:500}
 .family-ribbon .contact,.family-ribbon .links{color:#e2e8f0}
 .family-ribbon .contact-block{border-top:1px solid #ffffff44;margin-top:14px;padding-top:10px}
 .family-ribbon .sep{color:#ffffff66}
 .family-ribbon .resume-section>h2{padding:0 0 6px;border-bottom:2px solid var(--accent)}
 .family-rail .resume-header{border:0;margin:0 0 18px;padding:0 0 14px}
 .family-rail .resume-columns{grid-template-columns:31% minmax(0,1fr);gap:22px}
 .family-rail .resume-main-column{grid-column:2;grid-row:1}
 .family-rail .resume-columns aside{grid-column:1;grid-row:1;background:var(--accent);color:#fff;border:0;padding:20px 16px;border-radius:4px}
 .family-rail aside h2,.family-rail aside .entry-sub,.family-rail aside .entry-heading span,.family-rail aside .entry-heading strong,.family-rail aside p,.family-rail aside li{color:#fff}
 .family-rail aside h2{border-color:#ffffff55;font-size:8.5pt;letter-spacing:1px}
 .family-rail aside a{color:#fff}.family-rail aside .sep{color:#ffffff66}
 .family-rail aside .resume-section:first-child{margin-top:0}.family-rail aside .resume-entry{font-size:8.75pt}
 .family-rail .resume-main-column .resume-section:first-child{margin-top:0}
 .family-ledger .resume-header{border:0;border-bottom:2px solid var(--accent);padding:8px 0 18px}
 .family-ledger .resume-section{display:grid;grid-template-columns:118px minmax(0,1fr);gap:18px;border-top:1px solid var(--line);padding-top:14px}
 .family-ledger .resume-section:first-of-type{border-top:0}
 .family-ledger .resume-section>h2{border:0;font-size:8.75pt;letter-spacing:1px;padding:0;margin:0;overflow-wrap:anywhere}
 .family-ledger .resume-section .section-body>p:first-child{margin-top:0}
 .family-ledger .entry-heading{display:block}.family-ledger .entry-heading span{display:block;margin-top:2px;font-size:8.5pt}
 .family-folio .resume-header{border-top:1px solid var(--accent);border-bottom:3px solid var(--accent);padding:22px 0 18px}
 .family-folio .identity h1{font-weight:400;letter-spacing:-0.8px;max-width:95%;font-family:Georgia,"Times New Roman",serif}
 .family-folio .headline{font-size:12pt;letter-spacing:.3px;margin:10px 0;font-weight:500}
 .family-folio .resume-section>h2{font-family:Georgia,serif;font-size:12.5pt;font-weight:400;text-transform:none;letter-spacing:0;border:0;display:flex;align-items:center;gap:12px}
 .family-folio .resume-section>h2:after{content:'';height:1px;background:var(--line);flex:1}
 .family-masthead .resume-header{display:grid;grid-template-columns:minmax(0,1fr) 34%;gap:20px;border:0;border-bottom:3px solid var(--accent);padding-bottom:20px}
 .family-masthead .contact-block{border-left:2px solid var(--accent);padding-left:16px;align-self:center}
 .family-masthead .contact,.family-masthead .links{font-size:8.5pt}.family-masthead .contact .sep,.family-masthead .links .sep{display:block;font-size:0;line-height:5px;height:5px}
 .family-masthead .resume-section>h2{border:0;border-left:4px solid var(--accent);padding:1px 0 1px 10px;margin-bottom:12px}
 .family-split .resume-header{padding:22px 24px;background:var(--soft);border:0;border-left:7px solid var(--accent);margin-bottom:22px;border-radius:0 4px 4px 0}
 .family-split .resume-columns{grid-template-columns:minmax(0,1fr) 30%;gap:22px}
 .family-split .resume-columns aside{padding:4px 0 0 16px;border-left:1px solid var(--line)}
 .family-split .resume-section>h2{font-size:8.75pt;letter-spacing:1.1px}
 .family-split aside .resume-entry{font-size:8.75pt}.family-split .resume-section:first-child{margin-top:0}

 /* Gallery: Canva-style soft panel (header band, bar titles, date rail). */
 .family-gallery{color:#1f2937;--panel:#ececea;--ink:#1c1917}
 .family-gallery .resume-header{display:grid;grid-template-columns:88px minmax(0,1fr);gap:22px;align-items:center;background:var(--panel);border:0;border-radius:10px;padding:22px 24px;margin:0 0 22px}
 .family-gallery .gallery-avatar{width:88px;height:88px;border-radius:50%;background:color-mix(in srgb,var(--accent) 18%,#d6d3d1);color:var(--ink);display:grid;place-items:center;font:700 22px/1 Georgia,"Times New Roman",serif;letter-spacing:.5px}
 .family-gallery .gallery-intro{min-width:0}
 .family-gallery h1{color:var(--ink);font-family:Georgia,"Times New Roman",serif;font-weight:700;margin:0 0 4px;font-size:${Math.max(c.nameSize, 34)}px}
 .family-gallery .headline{color:#44403c;font-weight:500;margin:0 0 12px;font-size:12pt}
 .family-gallery .contact-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px 18px}
 .family-gallery .contact-item{display:flex;align-items:center;gap:8px;font-size:8.75pt;color:#57534e;min-width:0}
 .family-gallery .contact-item svg{flex:0 0 auto;color:#44403c}
 .family-gallery .contact-item span{overflow-wrap:anywhere}
 .family-gallery .resume-section{margin-top:18px}
 .family-gallery .resume-section>h2{background:var(--panel);color:var(--ink);border:0;text-align:center;padding:8px 12px;margin:0 0 14px;font-family:Georgia,"Times New Roman",serif;font-size:12.5pt;font-weight:700;letter-spacing:0;text-transform:none;border-radius:2px}
 .family-gallery .section-body{font-family:Georgia,"Times New Roman",serif;font-size:10pt;line-height:1.55;color:#292524}
 .family-gallery .gallery-entry{display:grid;grid-template-columns:118px minmax(0,1fr);gap:16px;margin-bottom:14px}
 .family-gallery .gallery-meta{font-family:Arial,sans-serif;font-size:8.5pt;line-height:1.45;color:#78716c}
 .family-gallery .gallery-meta span{display:block}
 .family-gallery .gallery-content strong{display:block;font-family:Arial,sans-serif;font-size:10.5pt;color:var(--ink);margin-bottom:2px}
 .family-gallery .gallery-content .entry-sub{font-family:Arial,sans-serif;color:#57534e;margin:0 0 6px}
 .family-gallery .gallery-content ul{margin:4px 0 0;padding-left:16px}
 .family-gallery .gallery-content li{font-size:9.75pt;margin:3px 0}
 .family-gallery .skills-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px 18px;margin:0;padding-left:16px;list-style:disc}
 .family-gallery .skills-grid li{font-family:Arial,sans-serif;font-size:9.5pt;margin:2px 0}
 .family-gallery .lang-row{display:flex;justify-content:space-between;align-items:center;gap:16px;font-family:Arial,sans-serif;font-size:9.75pt;margin:6px 0;max-width:280px}
 .family-gallery .lang-dots{display:inline-flex;gap:4px}
 .family-gallery .lang-dots i{width:8px;height:8px;border-radius:50%;background:#d6d3d1;display:inline-block}
 .family-gallery .lang-dots i.on{background:#292524}
 .family-gallery .resume-entry:has(.skills-grid),.family-gallery .resume-entry:has(.lang-row){margin-bottom:4px}
 @media (max-width:640px){.family-gallery .resume-header{grid-template-columns:1fr;justify-items:center;text-align:center}.family-gallery .contact-grid{grid-template-columns:1fr}.family-gallery .gallery-entry{grid-template-columns:1fr}.family-gallery .skills-grid{grid-template-columns:1fr 1fr}}
 </style></head><body class="family-${esc(c.family)} style-${esc(c.style)}">${header}${body}</body></html>`;
}
