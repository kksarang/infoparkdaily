export type TemplateConfig = {
  family: string;
  accent: string;
  font: string;
  spacing: number;
  nameSize: number;
  tracking: number;
  heading: string;
  rule: string;
  style: string;
  sideWidth?: number;
};
export type Template = {
  id: string;
  name: string;
  category: string;
  access: string;
  tags: string[];
  version: number;
  status: string;
  config: TemplateConfig;
};
const groups: [string, string[], number][] = [
  [
    "ATS-Friendly",
    [
      "ATS Essential",
      "ATS Professional",
      "ATS Graduate",
      "ATS Technical",
      "ATS Finance",
      "ATS Management",
      "ATS Specialist",
      "ATS Executive",
    ],
    3,
  ],
  [
    "Professional",
    [
      "The Standard",
      "Modern Professional",
      "Clean Slate",
      "Corporate Edit",
      "Business Class",
      "The Consultant",
      "Precision",
      "Professional Outline",
    ],
    3,
  ],
  [
    "Freshers",
    [
      "First Chapter",
      "Campus Classic",
      "The Graduate",
      "Engineering Start",
      "MBA Launch",
      "Internship Edit",
      "Early Career",
    ],
    3,
  ],
  [
    "Technology",
    [
      "Developer Notes",
      "Full Stack",
      "Data Story",
      "Cloud Engineer",
      "Product Designer",
    ],
    1,
  ],
  [
    "Creative",
    [
      "The Editorial",
      "Studio Minimal",
      "Portfolio Edit",
      "Creative Direction",
      "Modern Identity",
    ],
    2,
  ],
  ["Executive", ["The Director", "Leadership", "Executive Brief"], 0],
];
const familyMap: Record<string, string[]> = {
  "ATS-Friendly": [
    "classic",
    "compact",
    "classic",
    "compact",
    "classic",
    "compact",
    "classic",
    "compact",
  ],
  Professional: [
    "classic",
    "centered",
    "compact",
    "executive",
    "classic",
    "editorial",
    "compact",
    "centered",
  ],
  Freshers: [
    "centered",
    "classic",
    "compact",
    "classic",
    "executive",
    "sidebar",
    "centered",
  ],
  Technology: ["compact", "sidebar", "editorial", "classic", "sidebar"],
  Creative: ["editorial", "sidebar", "editorial", "centered", "sidebar"],
  Executive: ["executive", "editorial", "executive"],
};
const styles = [
  "plain",
  "label",
  "smallcaps",
  "rule",
  "timeline",
  "band",
  "airy",
  "label",
];
export const catalog: Template[] = groups.flatMap(([category, names, free]) =>
  names.map((name, i) => ({
    id: name.toLowerCase().replaceAll(" ", "-"),
    name,
    category,
    access: "free",
    tags: [category, ...name.split(" ")],
    version: 1,
    status: "published",
    config: {
      family: familyMap[category][i],
      accent: ["#17334d", "#245add", "#303d4b", "#087b77", "#833344"][i % 5],
      font:
        category === "Creative" || category === "Executive" ? "serif" : "sans",
      spacing: [18, 16, 20, 22, 15, 19, 24, 17][i],
      nameSize: [34, 31, 37, 32, 35, 30, 38, 33][i],
      tracking: [1, 0, 2, 0.5, 1.5, 0, 1, 2][i],
      heading: i % 2 ? "title" : "caps",
      rule: i % 3 ? "line" : "double",
      style: styles[i],
      sideWidth: 28 + (i % 3) * 3,
    },
  })),
);
// Studio collection: 24 additional compositions. Existing IDs/versions are kept
// intact so adding this catalog does not modify anybody's saved resume.
const studio: [string, string, string, string, string, string, string][] = [
  ["ATS Clarity", "ATS-Friendly", "free", "ribbon", "#193b57", "sans", "plain"],
  ["ATS Focus", "ATS-Friendly", "free", "folio", "#24574e", "sans", "rule"],
  [
    "ATS Meridian",
    "ATS-Friendly",
    "free",
    "ribbon",
    "#33446b",
    "sans",
    "label",
  ],
  [
    "ATS Structure",
    "ATS-Friendly",
    "free",
    "folio",
    "#3b414b",
    "sans",
    "smallcaps",
  ],
  ["Harbor", "Professional", "free", "rail", "#173c55", "sans", "plain"],
  ["Meridian", "Professional", "free", "ledger", "#1f5c5a", "sans", "rule"],
  [
    "Northstar",
    "Professional",
    "free",
    "masthead",
    "#263c65",
    "sans",
    "label",
  ],
  [
    "Signature",
    "Professional",
    "free",
    "split",
    "#613844",
    "serif",
    "plain",
  ],
  ["Spark", "Freshers", "free", "masthead", "#235caf", "sans", "plain"],
  ["Launchpad", "Freshers", "free", "ribbon", "#00685d", "sans", "rule"],
  ["New Horizons", "Freshers", "free", "ledger", "#354887", "sans", "label"],
  [
    "Campus Portfolio",
    "Freshers",
    "free",
    "split",
    "#526338",
    "sans",
    "smallcaps",
  ],
  ["Circuit", "Technology", "free", "ledger", "#215268", "mono", "plain"],
  ["Stack Studio", "Technology", "free", "rail", "#343865", "sans", "rule"],
  ["Systems", "Technology", "free", "masthead", "#244945", "mono", "label"],
  ["Interface", "Technology", "free", "split", "#384aaa", "sans", "plain"],
  ["Atelier", "Creative", "free", "folio", "#924330", "serif", "plain"],
  ["Monograph", "Creative", "free", "split", "#34363b", "serif", "rule"],
  ["Chromatic", "Creative", "free", "rail", "#60336a", "sans", "label"],
  ["Neue", "Creative", "free", "masthead", "#16645d", "sans", "smallcaps"],
  ["Boardroom", "Executive", "free", "ledger", "#273a50", "serif", "plain"],
  ["Principal", "Executive", "free", "folio", "#6a4c31", "serif", "rule"],
  ["Summit", "Executive", "free", "ribbon", "#303d49", "serif", "label"],
  ["Pinnacle", "Executive", "free", "rail", "#334f4a", "serif", "plain"],
];
catalog.push(
  ...studio.map(([name, category, access, family, accent, font, style], i) => ({
    id: name.toLowerCase().replaceAll(" ", "-"),
    name,
    category,
    access,
    tags: [category, "Studio collection", family, ...name.split(" ")],
    version: 1,
    status: "published",
    config: {
      family,
      accent,
      font,
      style,
      spacing: i % 2 ? 19 : 22,
      nameSize: family === "folio" ? 42 : family === "masthead" ? 38 : 34,
      tracking: font === "serif" ? 0 : 0.8,
      heading: i % 3 ? "caps" : "title",
      rule: "line",
      sideWidth: 29 + (i % 3),
    },
  })),
);

const gallery: [string, string, string, string, string, string, string][] = [
  ["Linea", "ATS-Friendly", "free", "classic", "#1a365d", "sans", "plain"],
  ["Quiet Page", "ATS-Friendly", "free", "compact", "#2d3748", "sans", "label"],
  ["Atlas", "ATS-Friendly", "free", "folio", "#1e3a5f", "sans", "rule"],
  ["Beacon", "ATS-Friendly", "free", "ribbon", "#0f766e", "sans", "smallcaps"],
  ["Kochi Classic", "Professional", "free", "classic", "#17334d", "sans", "plain"],
  ["Marine Drive", "Professional", "free", "rail", "#0b3d5c", "sans", "label"],
  ["Linen", "Professional", "free", "ledger", "#6b5344", "serif", "rule"],
  ["Vesper", "Professional", "free", "masthead", "#1f2937", "sans", "label"],
  ["Copperline", "Professional", "free", "ribbon", "#8b5a2b", "serif", "band"],
  ["Bright Start", "Freshers", "free", "ribbon", "#b8860b", "sans", "plain"],
  ["Campus Ink", "Freshers", "free", "masthead", "#0f766e", "sans", "rule"],
  ["First Light", "Freshers", "free", "split", "#3b6ea5", "sans", "label"],
  ["Open Desk", "Freshers", "free", "centered", "#2563eb", "sans", "airy"],
  ["Pixel Note", "Technology", "free", "compact", "#1e40af", "sans", "plain"],
  ["Soft Grid", "Technology", "free", "ledger", "#155e75", "sans", "rule"],
  ["Terminal", "Technology", "free", "rail", "#111827", "mono", "label"],
  ["Relay", "Technology", "free", "split", "#4338ca", "sans", "timeline"],
  ["Paper Studio", "Creative", "free", "folio", "#9a5b4a", "serif", "plain"],
  ["Ink Well", "Creative", "free", "split", "#3f3f46", "serif", "rule"],
  ["Blush Column", "Creative", "free", "rail", "#9f4d6a", "sans", "label"],
  ["Sage Panel", "Creative", "free", "sidebar", "#4d6b57", "serif", "band"],
  ["Canopy", "Creative", "free", "masthead", "#365c45", "sans", "smallcaps"],
  ["Charter", "Executive", "free", "executive", "#1c2b3a", "serif", "plain"],
  ["Manor", "Executive", "free", "ribbon", "#2c241e", "serif", "label"],
  /* Canva-inspired additions */
  ["Nova Frame", "Professional", "free", "sidebar", "#1e3a5f", "sans", "label"],
  ["Soft Peach", "Creative", "free", "rail", "#b07d7a", "sans", "plain"],
  ["Ivory Line", "Professional", "free", "classic", "#334155", "serif", "rule"],
  ["Sky Band", "Freshers", "free", "ribbon", "#3b82f6", "sans", "smallcaps"],
  ["Meridian Pro", "Technology", "free", "split", "#312e81", "sans", "timeline"],
  ["Arcadia", "Executive", "free", "executive", "#0f172a", "sans", "band"],
  ["Paperfold", "Creative", "free", "folio", "#7c5c46", "serif", "airy"],
  ["Clearpath", "ATS-Friendly", "free", "ledger", "#1e293b", "sans", "plain"],
  /* Canva soft-panel gallery (Rivera-style) */
  ["Rivera Soft", "Professional", "free", "gallery", "#57534e", "serif", "airy"],
  ["Pearl Panel", "Creative", "free", "gallery", "#6b7280", "serif", "plain"],
  ["Ash Band", "Professional", "free", "gallery", "#44403c", "sans", "rule"],
];
catalog.unshift(
  ...gallery.map(([name, category, access, family, accent, font, style], i) => ({
    id: name.toLowerCase().replaceAll(" ", "-"),
    name,
    category,
    access,
    tags: [category, "Gallery collection", family, ...name.split(" ")],
    version: 1,
    status: "published",
    config: {
      family,
      accent,
      font,
      style,
      spacing: i % 2 ? 18 : 21,
      nameSize: family === "folio" ? 42 : family === "masthead" ? 38 : 34,
      tracking: font === "serif" ? 0 : 0.7,
      heading: i % 2 ? "caps" : "title",
      rule: i % 3 ? "line" : "double",
      sideWidth: 28 + (i % 3),
    },
  })),
);

export function validateConfig(c: TemplateConfig) {
  if (
    !c ||
    ![
      "classic",
      "compact",
      "centered",
      "editorial",
      "sidebar",
      "executive",
      "ribbon",
      "rail",
      "ledger",
      "folio",
      "masthead",
      "split",
      "gallery",
    ].includes(c.family) ||
    !/^#[a-f0-9]{6}$/i.test(c.accent) ||
    !["sans", "serif", "mono"].includes(c.font) ||
    !["caps", "title"].includes(c.heading) ||
    !["line", "double"].includes(c.rule) ||
    !styles.includes(c.style) ||
    !Number.isFinite(c.spacing) ||
    c.spacing < 10 ||
    c.spacing > 30 ||
    !Number.isFinite(c.nameSize) ||
    c.nameSize < 24 ||
    c.nameSize > 42 ||
    !Number.isFinite(c.tracking) ||
    c.tracking < 0 ||
    c.tracking > 3 ||
    (c.sideWidth !== undefined &&
      (!Number.isFinite(c.sideWidth) || c.sideWidth < 25 || c.sideWidth > 35))
  )
    throw Error("Choose valid template settings.");
  return c;
}
