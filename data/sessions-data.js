/**
 * InfoparkDaily — Live Sessions & Workshops data
 * ================================================
 * HOW TO ADD A SESSION:
 * 1. Copy the TEMPLATE below.
 * 2. Paste it at the TOP of the SESSIONS array (newest first). Fill it in. Save.
 *
 * FIELDS
 * ------
 * id           string   Unique slug — used in URL: /sessions/?id=my-session
 * title        string   Session / course title
 * organizer    string   Company or person running the session
 * category     string   "Digital Marketing" | "Web Development" | "Design" | "Data Science"
 *                        | "HR & Recruitment" | "Sales" | "Finance" | "AI & ML" | "Community"
 * mode         string   "Online" | "Offline" | "Hybrid"
 * price        string   "Free" | "Paid" | "Partial"  (Partial = some free, rest paid)
 * priceText    string   Human-readable price, e.g. "₹2,999" or "First 3 classes free"
 * date         string   ISO start date "YYYY-MM-DD" — drives sorting + New badge
 * endDate      string   ISO end date (optional), e.g. "2026-10-31"
 * time         string   Time window, e.g. "6:00 PM – 8:00 PM"
 * location     string   Venue (for Offline/Hybrid), e.g. "Infopark, Kakkanad"
 * registrationLink  string   WhatsApp group link, website URL, or mailto:
 * summary      string   1-2 line summary shown on card
 * image        string   Path to image, e.g. "/assets/sessions/thinkware.jpg" (optional)
 * imageAlt     string   Short alt text for image
 * highlights   string[] Key points (optional)
 * source       string   "WhatsApp" | "Instagram" | "Direct" | "Website"
 * sourceUrl    string   Where the info came from (optional)
 * featured     boolean  true = show as featured card
 * tags         string[] e.g. ["Marketing", "Career", "Free"]
 *
 * TEMPLATE:
 * {
 *   id: "session-slug",
 *   title: "Session Title",
 *   organizer: "Organizer Name",
 *   category: "Digital Marketing",
 *   mode: "Online",
 *   price: "Free",
 *   priceText: "Free",
 *   date: "2026-10-01",
 *   endDate: "",
 *   time: "",
 *   location: "",
 *   registrationLink: "https://chat.whatsapp.com/...",
 *   summary: "Short summary of what attendees will learn.",
 *   image: "",
 *   imageAlt: "",
 *   highlights: ["Point 1", "Point 2"],
 *   source: "WhatsApp",
 *   sourceUrl: "",
 *   featured: false,
 *   tags: ["Marketing", "Free"]
 * },
 */

var SESSIONS = [
  {
    id: "lbs-skill-centre-ai-fullstack-developer-kazhakuttom-2026",
    title: "AI-Powered Full Stack Developer Program",
    organizer: "LBS Skill Centre – Kazhakuttom",
    category: "Web Development",
    mode: "Offline",
    price: "Paid",
    priceText: "Contact for fee details",
    date: "2026-10-01",
    endDate: "",
    time: "",
    location: "LBS Skill Centre, Kazhakuttom, Trivandrum",
    registrationLink: "tel:8594006050",
    summary: "LBS Professional AI & Machine Learning Full Stack Developer Flagship Program — 10 months training + 2 months industry internship. 7 certificates including AI Digital Marketing and Persona Pro Max.",
    image: "",
    imageAlt: "LBS Skill Centre AI Full Stack Developer Program",
    highlights: [
      "10 months training + 2 months industry internship",
      "Python Development, Full Stack, AI, Machine Learning with Python",
      "4 LBS certificates + 3 additional professional certificates",
      "100% Placement Support",
      "Expert trainers, practical learning, real-world projects",
      "Limited seats — admissions open"
    ],
    source: "WhatsApp",
    sourceUrl: "",
    featured: true,
    tags: ["Python", "Full Stack", "AI", "Machine Learning", "Internship", "Certificate", "Trivandrum"]
  },
  {
    id: "thinkware-performance-marketing-2026",
    title: "Live Performance Marketing Classes",
    organizer: "Thinkware Academy",
    category: "Digital Marketing",
    mode: "Online",
    price: "Partial",
    priceText: "First 3 classes free",
    date: "2026-10-01",
    endDate: "",
    time: "",
    location: "",
    registrationLink: "https://chat.whatsapp.com/DjsK8TcqoPs9dXFPvWZd8p",
    summary: "Live Performance Marketing classes by Thinkware Academy — attend the first 3 classes for free and decide if you want to continue.",
    image: "",
    imageAlt: "Thinkware Academy Performance Marketing live classes",
    highlights: [
      "Live sessions — not recorded",
      "First 3 classes completely free",
      "Performance marketing skills for digital careers",
      "Join the WhatsApp group to get started"
    ],
    source: "WhatsApp",
    sourceUrl: "",
    featured: true,
    tags: ["Digital Marketing", "Free", "Live", "Career"]
  }
];
