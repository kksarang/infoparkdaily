export const ROOT = "/infoparkdaily/";
export const SECTORS = [
  "Technology",
  "Sales & Marketing",
  "Office & Admin",
  "Design & Creative",
  "Finance",
  "Construction",
  "Events",
  "Logistics",
  "Hospitality",
  "Driving",
  "Healthcare",
  "Other",
];
export const BASES = [
  "hour",
  "day",
  "week",
  "month",
  "year",
  "project",
  "contract",
];
export const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export const dateISO = () => new Date().toLocaleDateString("en-CA");
export const stamp = (value) =>
  value?.toMillis
    ? value.toMillis()
    : value?.seconds
      ? value.seconds * 1000
      : Number(value) || 0;
export function safeURL(value, allowMail = false) {
  if (typeof value !== "string" || !value.trim()) return "#";
  try {
    const u = new URL(value, location.origin);
    return ["https:", "http:", ...(allowMail ? ["mailto:"] : [])].includes(
      u.protocol,
    )
      ? u.href
      : "#";
  } catch {
    return "#";
  }
}
export const money = (value, basis = "month") =>
  Number(value) > 0
    ? `₹${new Intl.NumberFormat("en-IN").format(Number(value))}<small> /${esc(basis)}</small>`
    : "Discuss with employer";
export function sectorFor(job) {
  const text = [job.roles?.[0], ...(job.tags || [])].join(" ");
  if (/account|financ|audit|payroll|compliance|risk officer/i.test(text))
    return "Finance";
  if (/design|video|creative|copywriter|content writer/i.test(text))
    return "Design & Creative";
  if (/sales|marketing|business develop|seo|telesales/i.test(text))
    return "Sales & Marketing";
  if (
    /recruit|human resources|\bhr\b|operations|office|executive assistant/i.test(
      text,
    )
  )
    return "Office & Admin";
  if (/nurs|medical|clinical|healthcare/i.test(text)) return "Healthcare";
  if (/driver|driving|rider/i.test(text)) return "Driving";
  if (/logistics|warehouse|delivery partner/i.test(text)) return "Logistics";
  if (/construction|civil|plumb|electrician/i.test(text)) return "Construction";
  if (/hotel|cook|chef|food|hospitality/i.test(text)) return "Hospitality";
  if (/event staff|event manager/i.test(text)) return "Events";
  return /software|engineer|developer|architect|\bIT\b|\bAI\b|data|test|technical|cloud|support/i.test(
    text,
  )
    ? "Technology"
    : "Other";
}
export function curatedJobs(data = []) {
  return data
    .filter(
      (j) =>
        j.id &&
        (!j.applyDeadline ||
          j.applyDeadline === "Rolling" ||
          j.applyDeadline >= dateISO()),
    )
    .map((j) => ({
      id: j.id,
      kind: "curated",
      title: j.roles?.[0] || "Open opportunity",
      company: j.company,
      location: j.location || "Location not specified",
      sector: sectorFor(j),
      description: j.workDetails || j.description || j.companyBlurb || "",
      requirements: j.requirements || [],
      responsibilities: j.responsibilities || [],
      benefits: j.benefits || [],
      skills: j.skills || [],
      allRoles: j.roles || [],
      experience: j.experienceRange || "",
      level: j.experience || "",
      pay: 0,
      payText: j.salary || j.salaryRange || "",
      basis: "month",
      employmentType: j.employmentType || "Not specified",
      workMode: j.workMode || "Not specified",
      vacancies: j.vacancies || null,
      urgent:
        !!j.isWalkIn ||
        (j.applyDeadline &&
          j.applyDeadline <=
            new Date(Date.now() + 3 * 864e5).toLocaleDateString("en-CA")),
      postedDate: j.postedDate,
      closingDate: j.applyDeadline || "",
      applyLink: j.applyLink || "",
      howToApply: j.howToApply || "",
      email: j.email || "",
      logo: j.logo || "",
      source: j.source || "InfoparkDaily",
      officialLinks: j.officialLinks || {},
      companyWebsite: j.website || "",
      status: "approved",
      updatedAt: Date.parse(j.postedDate) || 0,
    }))
    .sort((a, b) => b.updatedAt - a.updatedAt);
}
export function filterJobs(rows, filters = {}) {
  const text = String(filters.q || "")
    .trim()
    .toLowerCase();
  let result = rows.filter(
    (j) =>
      (!filters.sector || j.sector === filters.sector) &&
      (!filters.basis || j.basis === filters.basis) &&
      (!filters.location || j.location === filters.location) &&
      (!filters.urgent || j.urgent) &&
      (!filters.source || (j.source || "Community") === filters.source) &&
      (!filters.remote ||
        /remote|work from home/i.test(j.workMode + " " + j.location)) &&
      (!filters.fresher ||
        /fresher|both/i.test(j.level + " " + j.experience)) &&
      (!text ||
        [
          j.title,
          j.company,
          j.location,
          ...(j.skills || []),
          ...(j.allRoles || []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(text)),
  );
  if (filters.sort === "pay")
    result.sort((a, b) => Number(b.pay || 0) - Number(a.pay || 0));
  else if (filters.sort === "closing")
    result.sort((a, b) =>
      String(a.closingDate || "9999").localeCompare(
        String(b.closingDate || "9999"),
      ),
    );
  else
    result.sort(
      (a, b) =>
        stamp(b.createdAt || b.updatedAt) - stamp(a.createdAt || a.updatedAt),
    );
  return result;
}
export function filterWorkers(rows, filters = {}) {
  const text = String(filters.q || "")
    .trim()
    .toLowerCase();
  return rows.filter(
    (w) =>
      (!filters.sector || w.sector === filters.sector) &&
      (!filters.basis || w.basis === filters.basis) &&
      (!filters.location || w.location === filters.location) &&
      (!filters.available || w.available) &&
      (!text ||
        [w.name, w.title, w.location, ...(w.skills || [])]
          .join(" ")
          .toLowerCase()
          .includes(text)),
  );
}
export const initials = (value) =>
  String(value || "IP")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
export function parseSkills(value) {
  return [
    ...new Set(
      String(value || "")
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
    ),
  ].slice(0, 20);
}
export function csv(rows) {
  return rows
    .map((row) =>
      row
        .map(
          (v) =>
            '"' +
            String(v ?? "")
              .replace(/^\s*[=+@-]/, "'$&")
              .replace(/"/g, '""') +
            '"',
        )
        .join(","),
    )
    .join("\r\n");
}
export function download(name, body, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([body], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
