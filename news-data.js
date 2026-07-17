/**
 * InfoparkDaily — Tech Park News data
 * ====================================
 * HOW TO ADD A NEWS STORY:
 * 1. Copy the TEMPLATE below.
 * 2. Paste it at the TOP of the NEWS array (newest first). Fill it in. Save.
 *
 * FIELDS
 * ------
 * id          string   Unique slug — used in URL: news-article.html?id=my-story
 * title       string   Headline
 * category    string   "Infrastructure" | "AI City" | "Metro" | "Events" | "Business" | "Community"
 * park        string   "Infopark Kochi" | "Technopark TVM" | "Kerala"
 * date        string   ISO "YYYY-MM-DD" — drives sorting + New badge
 * image       string   Path to cover image (poster/photo). Put files in assets/news/
 * imageAlt    string   Short description of the image
 * summary     string   1-2 line card summary
 * body        string[] Full article paragraphs (each string = one paragraph)
 * highlights  string[] Key points shown as a bullet box (optional)
 * attachments [{label, url}]  Official links, PDFs, circulars (optional)
 * source      string   Where it was reported, e.g. "Infopark Official / Media reports"
 * sourceUrl   string   Link to the original announcement (optional)
 * featured    boolean  true = shows as the big top story (only the newest featured is used)
 *
 * TEMPLATE:
 * {
 *   id: "story-slug",
 *   title: "Headline goes here",
 *   category: "Infrastructure",
 *   park: "Infopark Kochi",
 *   date: "2026-07-17",
 *   image: "assets/news/story.svg",
 *   imageAlt: "What the image shows",
 *   summary: "One or two line summary for the card.",
 *   body: ["Paragraph 1.", "Paragraph 2."],
 *   highlights: ["Key point 1", "Key point 2"],
 *   attachments: [{ label: "Official announcement", url: "https://..." }],
 *   source: "Media reports",
 *   sourceUrl: "",
 *   featured: false
 * },
 */

var NEWS = [
  {
    id: "infopark-phase-3",
    title: "Infopark Phase 3 takes off — mega expansion planned near Kunnathunad",
    category: "Infrastructure",
    park: "Infopark Kochi",
    date: "2026-07-15",
    image: "assets/news/phase3.svg",
    imageAlt: "Infopark Phase 3 expansion concept",
    summary:
      "Land identification and master-planning work for Infopark's third phase is moving forward, aimed at doubling IT office space and jobs in Kochi.",
    body: [
      "Infopark Kochi's long-awaited Phase 3 expansion has taken a major step forward, with land identification and initial master-planning work progressing near the Kunnathunad region adjoining the existing campus corridor.",
      "The third phase is expected to add large-scale IT office space along with residential, retail, and social infrastructure — following the integrated township model that made Phase 2 at Kakkanad a hiring magnet.",
      "Officials have indicated that the expansion is designed to accommodate the next decade of growth in Kerala's IT exports, with Infopark Kochi already hosting 600+ companies and over 70,000 employees.",
      "For job seekers, the expansion signals a strong pipeline of new openings across IT services, product companies, and global capability centers planning Kochi operations."
    ],
    highlights: [
      "Third phase planned near the existing Kakkanad corridor",
      "Integrated township model — offices + housing + retail",
      "Infopark already hosts 600+ companies, 70,000+ employees",
      "Strong long-term hiring pipeline expected"
    ],
    attachments: [{ label: "Infopark official website", url: "https://infopark.in/" }],
    source: "Infopark updates / media reports",
    sourceUrl: "https://infopark.in/",
    featured: true
  },
  {
    id: "kochi-ai-city",
    title: "Kerala's AI City project kicks off — Kochi set to become an AI hub",
    category: "AI City",
    park: "Kerala",
    date: "2026-07-12",
    image: "assets/news/aicity.svg",
    imageAlt: "AI City Kochi concept",
    summary:
      "The state's ambitious AI City initiative has moved from announcement to action, positioning Kochi as a dedicated hub for AI companies, research labs, and skilled talent.",
    body: [
      "Kerala's AI City initiative — announced as a flagship project to put the state on the global artificial intelligence map — has officially moved into its execution phase.",
      "The AI City is planned as a dedicated ecosystem for AI product companies, research labs, GPU data-center capacity, and skilling programs, with Kochi's existing IT corridor giving it a natural talent base.",
      "Industry watchers expect the project to attract AI-focused global capability centers and startups, complementing the existing strengths of Infopark Kochi and Technopark Trivandrum.",
      "For Kerala's tech workforce, the message is clear: AI, machine learning, and data engineering skills will be the most in-demand profiles over the coming years."
    ],
    highlights: [
      "Dedicated ecosystem for AI companies and research labs",
      "Planned GPU data-center and skilling infrastructure",
      "Complements Infopark Kochi and Technopark Trivandrum",
      "AI / ML / data skills expected to dominate hiring"
    ],
    attachments: [],
    source: "Government of Kerala announcements / media reports",
    sourceUrl: "",
    featured: false
  },
  {
    id: "kochi-metro-infopark",
    title: "Kochi Metro to Infopark — Kakkanad extension work progressing fast",
    category: "Metro",
    park: "Infopark Kochi",
    date: "2026-07-10",
    image: "assets/news/metro.svg",
    imageAlt: "Kochi Metro Kakkanad extension",
    summary:
      "Pillar work on the Kochi Metro Phase 2 extension toward Kakkanad and Infopark is visibly progressing along the Seaport–Airport Road corridor.",
    body: [
      "The Kochi Metro Phase 2 extension — connecting JLN Stadium to Kakkanad via the Seaport–Airport Road — is showing visible progress, with pillar and viaduct work advancing along the corridor that serves Infopark.",
      "The 11+ km extension will bring metro connectivity directly to Kerala's largest IT campus, dramatically easing the daily commute for tens of thousands of techies who currently depend on buses and private vehicles.",
      "The line includes a station planned to serve the Infopark campus area, integrating with feeder services across Kakkanad.",
      "Once operational, the extension is expected to reshape where Kochi's tech workforce chooses to live, opening up more affordable housing corridors along the metro line."
    ],
    highlights: [
      "Phase 2: JLN Stadium → Kakkanad, 11+ km",
      "Direct connectivity to the Infopark campus area",
      "Pillar / viaduct work visibly progressing",
      "Will ease commutes for tens of thousands of techies"
    ],
    attachments: [{ label: "Kochi Metro official site", url: "https://kochimetro.org/" }],
    source: "KMRL updates / media reports",
    sourceUrl: "https://kochimetro.org/",
    featured: false
  },
  {
    id: "infopark-onam-2026",
    title: "Infopark Onam 2026 — campus-wide celebration planning under way",
    category: "Events",
    park: "Infopark Kochi",
    date: "2026-07-08",
    image: "assets/news/onam.svg",
    imageAlt: "Infopark Onam celebration",
    summary:
      "Companies across Infopark are planning this year's Onam celebrations — pookalams, sadhya, games, and campus-wide cultural programs expected through the season.",
    body: [
      "Onam season is approaching, and planning is already under way across Infopark for the campus's most loved celebration of the year.",
      "Expect company-level pookalam competitions, traditional sadhya lunches, vadamvali (tug-of-war), thiruvathira, and cultural evenings — with many companies coordinating campus-wide programs through the season.",
      "InfoparkDaily will share event announcements, competition updates, and celebration highlights from across the campus on our Instagram and WhatsApp channels as the season kicks off.",
      "If your company is hosting an Onam program and wants it featured, reach out through our contact page."
    ],
    highlights: [
      "Pookalam contests, sadhya, games & cultural evenings",
      "Company-level and campus-wide programs expected",
      "InfoparkDaily will cover events across the campus",
      "Want your program featured? Contact us"
    ],
    attachments: [],
    source: "InfoparkDaily community desk",
    sourceUrl: "",
    featured: false
  },
  {
    id: "technopark-expansion",
    title: "Technopark keeps growing — new office towers and record employment",
    category: "Business",
    park: "Technopark TVM",
    date: "2026-07-05",
    image: "assets/news/technopark.svg",
    imageAlt: "Technopark Trivandrum campus",
    summary:
      "Technopark Trivandrum continues its expansion run with new office towers coming up and employment touching record levels across its four campuses.",
    body: [
      "Technopark Trivandrum — India's first IT park — continues its strong growth phase, with new office towers under development and employment at record levels across its campuses.",
      "The park's Phase 4 (Technocity) development continues to add capacity, while established phases maintain near-full occupancy with a mix of global majors and homegrown companies.",
      "Hiring activity remains steady across engineering, BPM, and product roles — reflected in the regular walk-in drives and openings that InfoparkDaily tracks from Technopark companies.",
      "Together with Infopark Kochi, the twin engines of Kerala IT now support well over 1.5 lakh direct tech jobs."
    ],
    highlights: [
      "New towers under development, Technocity expanding",
      "Record employment across four campuses",
      "Steady hiring in engineering, BPM & product roles",
      "Kerala IT: 1.5 lakh+ direct tech jobs and growing"
    ],
    attachments: [{ label: "Technopark official website", url: "https://technopark.org/" }],
    source: "Technopark updates / media reports",
    sourceUrl: "https://technopark.org/",
    featured: false
  },
  {
    id: "infopark-employee-milestone",
    title: "Infopark crosses new employment milestone as companies keep hiring",
    category: "Community",
    park: "Infopark Kochi",
    date: "2026-07-02",
    image: "assets/news/milestone.svg",
    imageAlt: "Infopark employment growth",
    summary:
      "Infopark Kochi's workforce continues to expand, with fresh hiring across IT services, GCCs, and startups pushing campus employment to new highs.",
    body: [
      "Infopark Kochi's employee base has touched a new high, reflecting sustained hiring momentum across the campus through 2026.",
      "Growth is coming from all directions — expanding IT services firms, new global capability centers choosing Kochi, and a fast-maturing startup ecosystem in and around the park.",
      "The employment surge is also fueling demand for housing, transport, and retail around Kakkanad, with the upcoming metro extension expected to accelerate the trend.",
      "InfoparkDaily tracks openings from campus companies daily — check the Jobs page for the latest verified openings and walk-in drives."
    ],
    highlights: [
      "Campus employment at an all-time high",
      "Growth from IT services, GCCs, and startups",
      "Rising demand for housing & transport around Kakkanad",
      "Daily verified openings on the InfoparkDaily Jobs page"
    ],
    attachments: [],
    source: "Infopark updates / InfoparkDaily desk",
    sourceUrl: "",
    featured: false
  }
];
