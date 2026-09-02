/**
 * InfoparkDaily — Social Media Works
 * ==================================
 * HOW TO ADD A POST (manual):
 * 1. Put the image in /assets/media/ (png or jpg).
 * 2. Copy a SOCIAL_WORKS object below, give it a new id (lowercase-dashes).
 * 3. Fill title, date, excerpt, body, image, and optional Instagram links.
 * 4. Save. The post appears on /social/.
 *    If you set page: "/onam/", the card opens that event page instead of a details screen.
 *
 * HOW TO ADD A SOCIAL PAGE:
 * Add one object to SOCIAL_CHANNELS with name, url, and blurb.
 */

var SOCIAL_CHANNELS = [
  {
    id: "ig-main",
    badge: "IG",
    tone: "ig",
    name: "@infoparkdaily",
    blurb: "Main page — stories, news & community",
    url: "https://www.instagram.com/infoparkdaily/",
    cta: "Follow"
  },
  {
    id: "ig-jobs",
    badge: "IG",
    tone: "jobs",
    name: "@infoparkdaily.jobs",
    blurb: "Daily IT jobs, walk-ins & internships",
    url: "https://www.instagram.com/infoparkdaily.jobs/",
    cta: "Follow"
  },
  {
    id: "ig-media",
    badge: "IG",
    tone: "media",
    name: "@infoparkdaily.media",
    blurb: "Brand campaigns, reels & productions",
    url: "https://www.instagram.com/infoparkdaily.media/",
    cta: "Follow"
  },
  {
    id: "ig-tbc",
    badge: "IG",
    tone: "tbc",
    name: "@infopark_tbc",
    blurb: "Infopark TBC — IT professional community",
    url: "https://www.instagram.com/infopark_tbc/",
    cta: "Follow"
  },
  {
    id: "ig-divine",
    badge: "IG",
    tone: "divine",
    name: "@thedivineproduction_7",
    blurb: "The Divine Productions — events & stage",
    url: "https://www.instagram.com/thedivineproduction_7/",
    cta: "Follow"
  },
  {
    id: "ig-broadcast",
    badge: "BC",
    tone: "bc",
    name: "Instagram Broadcast",
    blurb: "Instant updates straight to your DMs",
    url: "https://www.instagram.com/channel/AbYzHp5h-gx5xbu7/",
    cta: "Join"
  },
  {
    id: "wa-channel",
    badge: "WA",
    tone: "wa",
    name: "WhatsApp Channel",
    blurb: "Job alerts & hiring digests, daily",
    url: "https://whatsapp.com/channel/0029VbDJFfA4Y9lm5L4kpm22",
    cta: "Join"
  },
  {
    id: "wa-group",
    badge: "WA",
    tone: "wa",
    name: "WhatsApp Group",
    blurb: "Community discussion & networking",
    url: "https://chat.whatsapp.com/CpjcQa9otzR3yu9sVP05eB",
    cta: "Join"
  },
  {
    id: "facebook",
    badge: "FB",
    tone: "ig",
    name: "Facebook",
    blurb: "InfoparkDaily on Facebook",
    url: "https://www.facebook.com/profile.php?id=61590569168309",
    cta: "Follow"
  },
  {
    id: "threads",
    badge: "TH",
    tone: "jobs",
    name: "Threads",
    blurb: "@infoparkdaily on Threads",
    url: "https://www.threads.com/@infoparkdaily",
    cta: "Follow"
  },
  {
    id: "ig-enitexa",
    badge: "IG",
    tone: "media",
    name: "@enitexa",
    blurb: "Enitexa.ai — digital & software",
    url: "https://www.instagram.com/enitexa/",
    cta: "Follow"
  },
  {
    id: "ig-ptf",
    badge: "IG",
    tone: "tbc",
    name: "@primetimefestivals",
    blurb: "Prime Time Festivals — RAJAONAM & events",
    url: "https://www.instagram.com/primetimefestivals/",
    cta: "Follow"
  },
  {
    id: "ig-pte",
    badge: "IG",
    tone: "divine",
    name: "@primetimeeventsindia",
    blurb: "Prime Time Events — shows & productions",
    url: "https://www.instagram.com/primetimeeventsindia/",
    cta: "Follow"
  }
];

var SOCIAL_WORKS = [
  {
    id: "cpe-opscloud-corporate-project-experience",
    featured: true,
    page: "/cpe/",
    title: "CPE — Corporate Project Experience",
    kicker: "Career training · Opscloud",
    account: "Opscloud Technologies",
    date: "2026-09-02",
    excerpt:
      "Explore a tech domain practically before a long course — 1-month & 4-month programs for freshers. Python+AI, Software Testing & more.",
    body: [
      "Freshers-ന് tech field-ൽ opportunities ഒരുപാടുണ്ട് — പക്ഷേ ആ opportunities-ലേക്ക് എങ്ങനെ എത്തണം എന്നതാണ് പലർക്കും അറിയാത്തത്.",
      "CPE by Opscloud Technologies is a career-focused practical training program — explore the right domain for one month before committing to a long-term course.",
      "First explore. Then learn. Then decide. Then build your career."
    ],
    highlights: [
      "1-month explore program",
      "4-month advanced program",
      "Python+AI · Software Testing · more",
      "opscloudtechnologies.com"
    ],
    image: "/assets/media/cpe-opscloud.png?v=20260902b",
    images: ["/assets/media/cpe-opscloud.png?v=20260902b"],
    imageAlt: "CPE Corporate Project Experience by Opscloud Technologies",
    links: [
      { label: "Open CPE page", url: "/cpe/", external: false },
      { label: "Opscloud Technologies", url: "https://opscloudtechnologies.com" },
      { label: "Browse IT jobs", url: "/jobs/", external: false }
    ]
  },
  {
    id: "aavesham-2k26",
    featured: true,
    page: "/onam/",
    title: "AAVESHAM 2K26",
    kicker: "Onam celebration",
    account: "Infopark TBC & The Divine Productions",
    date: "2026-08-17",
    excerpt:
      "ONAM 2K26 — a grand celebration filled with music, dance, culture, colours and unforgettable moments.",
    body: [
      "Infopark TBC & The Divine Productions present ONAM 2K26 — a grand celebration filled with music, dance, culture, colours and unforgettable moments!",
      "From vibrant cultural performances to electrifying music, come celebrate the joy of Onam together.",
      "Live band & DJ with Sayanora Philip from 7 PM to 10 PM. Hosted by Meera Anil. Venue partner Infopark Square."
    ],
    highlights: [
      "Live Band & DJ Performance",
      "17 August 2026",
      "7 PM – 10 PM",
      "Infopark Square"
    ],
    image: "/assets/media/aavesham-2k26.png",
    images: ["/assets/media/aavesham-2k26.png", "/assets/media/aavesham-2k26-promo.png"],
    imageAlt: "AAVESHAM 2K26 official poster at Infopark Square",
    links: [
      { label: "Open event page", url: "/onam/", external: false },
      { label: "Infopark TBC Instagram", url: "https://www.instagram.com/infopark_tbc/" },
      {
        label: "The Divine Productions Instagram",
        url: "https://www.instagram.com/thedivineproduction_7/"
      }
    ]
  },
  {
    id: "rajaonam-2026",
    featured: true,
    page: "/rajaonam/",
    title: "RAJAONAM 2026",
    kicker: "Palace sadhya",
    account: "Prime Time Festivals & Prime Time Events",
    date: "2026-08-26",
    excerpt:
      "A royal Onam at Bolgatty Palace, Kochi — palace sadhya, live music, games, and gold in your ticket.",
    body: [
      "ഈ ഓണം… രാജകീയമായി ആഘോഷിക്കാം!! ഒപ്പം സ്വർണ്ണവും നേടാം!!",
      "RAJAONAM 2026 — ഒരു കൊട്ടാരസദ്യ at Bolgatty Palace on 26 August, 11 AM to 5 PM."
    ],
    highlights: ["26 August 2026", "11 AM – 5 PM", "Bolgatty Palace, Kochi", "Book at rajaonam.com"],
    image: "/assets/media/rajaonam-2026.png",
    images: [
      "/assets/media/rajaonam-2026.png",
      "/assets/media/rajaonam-2026-venue.png",
      "/assets/media/rajaonam-magician-ajith.png",
      "/assets/media/rajaonam-rowmin-live.png"
    ],
    imageAlt: "RAJAONAM 2026 official poster at Bolgatty Palace",
    links: [
      { label: "Book tickets", url: "https://rajaonam.com" },
      { label: "Prime Time Festivals", url: "https://www.instagram.com/primetimefestivals/" },
      { label: "Prime Time Events", url: "https://www.instagram.com/primetimeeventsindia/" }
    ]
  }
];

/* Older Instagram-embed list — unused after Social Works. Kept so old scripts do not break. */
var MEDIA_POSTS = [];
