/* Daily Web Studio — shared data: website types, looks, accent colours and icons.
 * Plain data so the landing page, the wizard and (later) the template marketplace all agree.
 */

/* 24px stroke icons (currentColor). */
export const ICONS = {
  portfolio: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.2-3.6 3.9-5.5 7-5.5s5.8 1.9 7 5.5"/>',
  business: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
  agency: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
  restaurant: '<path d="M7 3v8M4.5 3v5a2.5 2.5 0 0 0 5 0V3M7 11v10M17 21V3c-2.2 1.4-3.5 4-3.5 7v3H17"/>',
  corporate: '<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M15 9h3a2 2 0 0 1 2 2v10M3 21h18M8 7h3M8 11h3M8 15h3"/>',
  startup: '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M14 4c3-1 6-1 6-1s0 3-1 6l-6 6-4-4 5-7Z"/><path d="M9 11 6 10l2.5-3H12M13 15l1 3 3-2.5V12"/>',
  landing: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  blog: '<path d="M4 5h12v14H6a2 2 0 0 1-2-2V5ZM16 9h4v8a2 2 0 0 1-2 2h-2"/><path d="M7.5 9h5M7.5 12.5h5M7.5 16h3"/>',
  ecommerce: '<path d="M5 8h14l-1.2 11a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/>',
  event: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17M8 14h3"/>',
  realestate: '<path d="m3 11 9-7 9 7"/><path d="M5.5 9.5V20h13V9.5M10 20v-5h4v5"/>',
  education: '<path d="m2.5 9 9.5-5 9.5 5-9.5 5-9.5-5Z"/><path d="M6.5 11.2V16c1.6 1.6 3.4 2.4 5.5 2.4s3.9-.8 5.5-2.4v-4.8M21.5 9v6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  home: '<path d="m3 10.5 9-7 9 7"/><path d="M5.5 9v11h13V9"/>',
  sites: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
  templates: '<rect x="3" y="3" width="7.5" height="9" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="5" rx="1.5"/><rect x="13.5" y="11" width="7.5" height="10" rx="1.5"/><rect x="3" y="15" width="7.5" height="6" rx="1.5"/>',
  publish: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"/>',
  card: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6.5 15h4"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.3.6.9 1 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  trash: '<path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
  download: '<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c1.4-3.6 4.4-5.5 8-5.5s6.6 1.9 8 5.5"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  device: '<rect x="3" y="4.5" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16.5V20"/>',
  code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
};

export const icon = (name, size = 20) =>
  `<svg class="ico" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;

/* What people can build. `pages` are suggested; people can switch any of them off. */
export const SITE_TYPES = [
  { id: "portfolio", label: "Personal portfolio", short: "Show your work and get hired", pages: ["Home", "About", "Work", "Resume", "Contact"] },
  { id: "business", label: "Business website", short: "Services, hours and enquiries", pages: ["Home", "Services", "About", "Reviews", "Contact"] },
  { id: "agency", label: "Agency website", short: "Case studies and a team that sells", pages: ["Home", "Work", "Services", "Team", "Contact"] },
  { id: "restaurant", label: "Restaurant & café", short: "Menu, location and table bookings", pages: ["Home", "Menu", "Gallery", "Visit us", "Contact"] },
  { id: "corporate", label: "Corporate website", short: "Company profile, leadership, careers", pages: ["Home", "About", "Solutions", "Careers", "Contact"] },
  { id: "startup", label: "Startup website", short: "Product, pricing and early sign-ups", pages: ["Home", "Product", "Pricing", "About", "Contact"] },
  { id: "landing", label: "Landing page", short: "One page, one clear action", pages: ["Home"] },
  { id: "blog", label: "Blog or news", short: "Articles, categories and an archive", pages: ["Home", "Articles", "About", "Contact"] },
  { id: "ecommerce", label: "Online store", short: "Products with WhatsApp or payment links", pages: ["Home", "Shop", "About", "FAQ", "Contact"] },
  { id: "event", label: "Event website", short: "Schedule, speakers and registration", pages: ["Home", "Schedule", "Speakers", "Venue", "Register"] },
  { id: "realestate", label: "Real estate", short: "Listings, locations and site visits", pages: ["Home", "Listings", "About", "Contact"] },
  { id: "education", label: "Education", short: "Courses, faculty and admissions", pages: ["Home", "Courses", "Faculty", "Admissions", "Contact"] },
];

export const typeById = (id) => SITE_TYPES.find((t) => t.id === id);

/* Starting looks. Each one is a small set of design tokens that the preview (and later the
   editor's theme panel) reads. */
export const LOOKS = [
  { id: "clean", label: "Clean", note: "Bright, simple, easy to read", bg: "#ffffff", surface: "#f4f5f7", text: "#14161b", muted: "#5b6070", heading: "'Inter', system-ui, sans-serif", body: "'Inter', system-ui, sans-serif", radius: "12px" },
  { id: "bold", label: "Bold", note: "Dark and confident", bg: "#0f1115", surface: "#1a1d24", text: "#f4f5f7", muted: "#a3a9b8", heading: "'Bricolage Grotesque', 'Inter', sans-serif", body: "'Inter', system-ui, sans-serif", radius: "16px" },
  { id: "warm", label: "Warm", note: "Soft cream with friendly curves", bg: "#fbf6ee", surface: "#f2e9da", text: "#2a211a", muted: "#6f6156", heading: "'Fraunces', Georgia, serif", body: "'Inter', system-ui, sans-serif", radius: "22px" },
  { id: "editorial", label: "Editorial", note: "Magazine-style, big headlines", bg: "#fdfdfb", surface: "#f0efe9", text: "#111111", muted: "#5d5d58", heading: "'Fraunces', Georgia, serif", body: "Georgia, 'Times New Roman', serif", radius: "2px" },
];

export const lookById = (id) => LOOKS.find((l) => l.id === id) || LOOKS[0];

export const ACCENTS = [
  { id: "coral", label: "Coral", value: "#ff5b3a" },
  { id: "indigo", label: "Indigo", value: "#4f46e5" },
  { id: "teal", label: "Teal", value: "#0d9488" },
  { id: "amber", label: "Amber", value: "#d97706" },
  { id: "rose", label: "Rose", value: "#e11d48" },
  { id: "forest", label: "Forest", value: "#15803d" },
];
