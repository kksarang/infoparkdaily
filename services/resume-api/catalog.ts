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
    access: i < free ? "free" : "premium",
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
    "premium",
    "ribbon",
    "#33446b",
    "sans",
    "label",
  ],
  [
    "ATS Structure",
    "ATS-Friendly",
    "premium",
    "folio",
    "#3b414b",
    "sans",
    "smallcaps",
  ],
  ["Harbor", "Professional", "free", "rail", "#173c55", "sans", "plain"],
  ["Meridian", "Professional", "premium", "ledger", "#1f5c5a", "sans", "rule"],
  [
    "Northstar",
    "Professional",
    "premium",
    "masthead",
    "#263c65",
    "sans",
    "label",
  ],
  [
    "Signature",
    "Professional",
    "premium",
    "split",
    "#613844",
    "serif",
    "plain",
  ],
  ["Spark", "Freshers", "free", "masthead", "#235caf", "sans", "plain"],
  ["Launchpad", "Freshers", "free", "ribbon", "#00685d", "sans", "rule"],
  ["New Horizons", "Freshers", "premium", "ledger", "#354887", "sans", "label"],
  [
    "Campus Portfolio",
    "Freshers",
    "premium",
    "split",
    "#526338",
    "sans",
    "smallcaps",
  ],
  ["Circuit", "Technology", "free", "ledger", "#215268", "mono", "plain"],
  ["Stack Studio", "Technology", "premium", "rail", "#343865", "sans", "rule"],
  ["Systems", "Technology", "premium", "masthead", "#244945", "mono", "label"],
  ["Interface", "Technology", "premium", "split", "#384aaa", "sans", "plain"],
  ["Atelier", "Creative", "free", "folio", "#924330", "serif", "plain"],
  ["Monograph", "Creative", "free", "split", "#34363b", "serif", "rule"],
  ["Chromatic", "Creative", "premium", "rail", "#60336a", "sans", "label"],
  ["Neue", "Creative", "premium", "masthead", "#16645d", "sans", "smallcaps"],
  ["Boardroom", "Executive", "premium", "ledger", "#273a50", "serif", "plain"],
  ["Principal", "Executive", "premium", "folio", "#6a4c31", "serif", "rule"],
  ["Summit", "Executive", "premium", "ribbon", "#303d49", "serif", "label"],
  ["Pinnacle", "Executive", "premium", "rail", "#334f4a", "serif", "plain"],
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
  ["Atlas", "ATS-Friendly", "premium", "folio", "#1e3a5f", "sans", "rule"],
  ["Beacon", "ATS-Friendly", "premium", "ribbon", "#0f766e", "sans", "smallcaps"],
  ["Kochi Classic", "Professional", "free", "classic", "#17334d", "sans", "plain"],
  ["Marine Drive", "Professional", "free", "rail", "#0b3d5c", "sans", "label"],
  ["Linen", "Professional", "free", "ledger", "#6b5344", "serif", "rule"],
  ["Vesper", "Professional", "premium", "masthead", "#1f2937", "sans", "label"],
  ["Copperline", "Professional", "premium", "ribbon", "#8b5a2b", "serif", "band"],
  ["Bright Start", "Freshers", "free", "ribbon", "#b8860b", "sans", "plain"],
  ["Campus Ink", "Freshers", "free", "masthead", "#0f766e", "sans", "rule"],
  ["First Light", "Freshers", "free", "split", "#3b6ea5", "sans", "label"],
  ["Open Desk", "Freshers", "premium", "centered", "#2563eb", "sans", "airy"],
  ["Pixel Note", "Technology", "free", "compact", "#1e40af", "sans", "plain"],
  ["Soft Grid", "Technology", "free", "ledger", "#155e75", "sans", "rule"],
  ["Terminal", "Technology", "premium", "rail", "#111827", "mono", "label"],
  ["Relay", "Technology", "premium", "split", "#4338ca", "sans", "timeline"],
  ["Paper Studio", "Creative", "free", "folio", "#9a5b4a", "serif", "plain"],
  ["Ink Well", "Creative", "free", "split", "#3f3f46", "serif", "rule"],
  ["Blush Column", "Creative", "premium", "rail", "#9f4d6a", "sans", "label"],
  ["Sage Panel", "Creative", "premium", "sidebar", "#4d6b57", "serif", "band"],
  ["Canopy", "Creative", "premium", "masthead", "#365c45", "sans", "smallcaps"],
  ["Charter", "Executive", "premium", "executive", "#1c2b3a", "serif", "plain"],
  ["Manor", "Executive", "premium", "ribbon", "#2c241e", "serif", "label"],
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
