/**
 * @typedef {{id: string, [key: string]: string | string[]}} ResumeEntry
 * @typedef {{schemaVersion: number, personal: Record<string, string>, summary: string,
 * experience: ResumeEntry[], education: ResumeEntry[], skills: ResumeEntry[],
 * projects: ResumeEntry[], certifications: ResumeEntry[], achievements: ResumeEntry[],
 * languages: ResumeEntry[], interests: ResumeEntry[], customSections: ResumeEntry[],
 * sectionOrder: string[], hiddenSections: string[],
 * appearance: {accent: string, font: string, density: string}}} ResumeDocument
 */
export const sections = {
  personal: {
    name: "Personal details",
    icon: "01",
    fields: [
      "name",
      "headline",
      "email",
      "phone",
      "location",
      "linkedin",
      "github",
      "portfolio",
    ],
  },
  summary: { name: "Professional summary", icon: "02" },
  experience: {
    name: "Experience",
    icon: "03",
    fields: ["role", "employer", "location", "start", "end", "bullets"],
  },
  education: {
    name: "Education",
    icon: "04",
    fields: [
      "qualification",
      "institution",
      "field",
      "start",
      "end",
      "grade",
      "details",
    ],
  },
  skills: { name: "Skills", icon: "05", fields: ["label", "items"] },
  projects: {
    name: "Projects",
    icon: "06",
    fields: ["name", "role", "url", "technologies", "bullets"],
  },
  certifications: {
    name: "Certifications",
    icon: "07",
    fields: ["name", "issuer", "issued", "expiry", "url"],
  },
  achievements: {
    name: "Achievements",
    icon: "08",
    fields: ["title", "details"],
  },
  languages: { name: "Languages", icon: "09", fields: ["name", "proficiency"] },
  interests: { name: "Interests", icon: "10", fields: ["name"] },
  customSections: {
    name: "Custom sections",
    icon: "11",
    fields: ["heading", "title", "bullets"],
  },
};
export const arrayFields = ["bullets", "items", "technologies"];
/** @returns {ResumeDocument} */
export function blankResume() {
  return {
    schemaVersion: 1,
    personal: Object.fromEntries(sections.personal.fields.map((f) => [f, ""])),
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    achievements: [],
    languages: [],
    interests: [],
    customSections: [],
    sectionOrder: Object.keys(sections).filter(
      (k) => k !== "personal" && k !== "customSections",
    ),
    hiddenSections: [],
    appearance: { accent: "default", font: "default", density: "standard" },
  };
}
export function sampleResume() {
  const d = blankResume();
  d.personal = {
    name: "ANANYA MENON",
    headline: "Software Developer",
    email: "ananya@example.com",
    phone: "+91 90000 00000",
    location: "Kochi, Kerala",
    linkedin: "linkedin.com/in/example",
    github: "github.com/example",
    portfolio: "",
  };
  d.summary =
    "Software developer focused on thoughtful, accessible digital experiences. Experienced in building web applications, collaborating with product teams, and turning complex requirements into clear, maintainable solutions.";
  d.experience = [
    {
      id: "exp-sample",
      role: "Software Developer",
      employer: "Example Technologies",
      location: "Kochi",
      start: "2023-06",
      end: "",
      bullets: [
        "Developed responsive web interfaces with React and TypeScript for customer-facing products.",
        "Collaborated with designers and engineers to improve accessibility and simplify user journeys.",
        "Built reusable components and automated tests to support reliable releases.",
      ],
    },
  ];
  d.education = [
    {
      id: "edu-sample",
      qualification: "B.Tech in Computer Science",
      institution: "Example Institute of Technology",
      field: "",
      start: "2019-08",
      end: "2023-05",
      grade: "",
      details: "",
    },
  ];
  d.skills = [
    {
      id: "skill-sample",
      label: "Technical",
      items: ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "Git"],
    },
  ];
  d.projects = [
    {
      id: "project-sample",
      name: "Community Events Platform",
      role: "Personal project",
      url: "",
      technologies: ["React", "PostgreSQL"],
      bullets: [
        "Designed a searchable events directory with accessible filters and a responsive layout.",
      ],
    },
  ];
  return d;
}
export function validateResume(d) {
  if (!d || typeof d !== "object" || Array.isArray(d) || d.schemaVersion !== 1)
    throw Error("Unsupported resume format.");
  if (JSON.stringify(d).length > 262144)
    throw Error("Resume exceeds the 256 KB limit.");
  const allowed = new Set([...Object.keys(blankResume())]);
  for (const key of Object.keys(d))
    if (!allowed.has(key)) throw Error("Unknown resume field.");
  const string = (v, max = 2000) => {
    if (typeof v !== "string" || v.length > max)
      throw Error(`Please use text of ${max} characters or fewer.`);
  };
  if (!d.personal || typeof d.personal !== "object")
    throw Error("Personal details are required.");
  for (const key of sections.personal.fields)
    string(d.personal[key] ?? "", 500);
  string(d.summary, 5000);
  for (const [key, section] of Object.entries(sections)) {
    if (key === "personal" || key === "summary") continue;
    if (
      !Array.isArray(d[key]) ||
      d[key].length > (key === "customSections" ? 10 : 20)
    )
      throw Error(`Too many entries in ${section.name}.`);
    const ids = new Set();
    for (const entry of d[key]) {
      if (!entry || typeof entry !== "object")
        throw Error("Invalid section entry.");
      string(entry.id, 100);
      if (ids.has(entry.id)) throw Error("Duplicate section entry.");
      ids.add(entry.id);
      for (const field of section.fields) {
        const v = entry[field] ?? (arrayFields.includes(field) ? [] : "");
        if (arrayFields.includes(field)) {
          if (!Array.isArray(v) || v.length > 30)
            throw Error("Use at most 30 list items.");
          v.forEach((x) => string(x));
        } else {
          string(v);
          if (
            ["start", "end", "issued", "expiry"].includes(field) &&
            v &&
            !/^\d{4}-(0[1-9]|1[0-2])$/.test(v)
          )
            throw Error("Use a valid month and year.");
        }
      }
    }
  }
  const validSections = new Set([
    ...Object.keys(sections).filter(
      (k) => k !== "personal" && k !== "customSections",
    ),
    ...d.customSections.map((x) => x.id),
  ]);
  for (const key of ["sectionOrder", "hiddenSections"]) {
    if (
      !Array.isArray(d[key]) ||
      d[key].length > 30 ||
      new Set(d[key]).size !== d[key].length ||
      d[key].some((x) => !validSections.has(x))
    )
      throw Error("Invalid section order.");
  }
  if (
    !d.appearance ||
    !["default", "navy", "blue", "teal", "charcoal", "burgundy"].includes(
      d.appearance.accent,
    ) ||
    !["default", "sans", "serif", "mono"].includes(d.appearance.font) ||
    !["standard", "compact", "relaxed"].includes(d.appearance.density)
  )
    throw Error("Invalid appearance settings.");
  return d;
}
export function exportable(d) {
  return (
    !!d.personal.name.trim() &&
    (!!d.summary.trim() ||
      Object.keys(sections).some(
        (k) => k !== "personal" && k !== "summary" && d[k].length,
      ))
  );
}
