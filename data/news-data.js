/**
 * InfoparkDaily — Tech Park News data
 * ====================================
 * HOW TO ADD A NEWS STORY:
 * 1. Copy the TEMPLATE below.
 * 2. Paste it at the TOP of the NEWS array (newest first). Fill it in. Save.
 *
 * FIELDS
 * ------
 * id          string   Unique slug — used in URL: /news-article/?id=my-story
 * title       string   Headline
 * category    string   "Infrastructure" | "Investment" | "Campus" | "AI City" | "Metro" | "Events" | "Business" | "Community"
 * park        string   "Infopark Kochi" | "Technopark TVM" | "Cyberpark Kozhikode" | "SmartCity Kochi" | "Kerala"
 * date        string   ISO "YYYY-MM-DD" — drives sorting + New badge
 * image       string   Root path to cover image, e.g. "/assets/news/story.jpg"
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
 *   image: "/assets/news/story.svg",
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
    id: "cubet-ai-cube-studio-infopark-2026",
    title: "Cubet opens new office and AI Cube Studio research facility at Infopark Kochi",
    category: "AI City",
    park: "Infopark Kochi",
    date: "2026-10-23",
    image: "/assets/news/aicity.svg",
    imageAlt: "AI research facility illustration",
    summary: "Kochi IT company Cubet has opened a new office and an AI research facility, AI Cube Studio, at Infopark. Gaganyaan astronaut-designate Group Captain Prasanth B. Nair inaugurated it.",
    body: [
      "IT company Cubet has launched a new office and an artificial intelligence research facility called AI Cube Studio at Infopark, Kochi. The facility was inaugurated by Group Captain Prasanth B. Nair, a member of ISRO’s Gaganyaan mission crew.",
      "Cubet says AI Cube Studio will focus on research and development around practical applications of AI across business and technology sectors. Cubet CEO Luvjin John, G-Tech Chairman Jijo John, heads of Infopark companies and industry leaders attended the launch.",
      "Alongside the inauguration, a tech-leadership session titled ‘Apogee’ was held at Athulya Auditorium, Infopark, in collaboration with G-Tech. Prasanth B. Nair delivered the keynote, “Cultivating an Astronaut Mindset for Nation Building”, to technology professionals, Infopark industry leaders and college students."
    ],
    highlights: [
      "Facility: AI Cube Studio — AI research and development centre",
      "Location: Infopark, Kochi",
      "Inaugurated by Group Captain Prasanth B. Nair (Gaganyaan crew)",
      "Apogee tech-leadership session held at Athulya Auditorium, Infopark"
    ],
    attachments: [
      { label: "Press Network of India report", url: "https://www.pninews.com/cubet-opens-new-office-and-ai-research-center-at-kochi-infopark/" }
    ],
    source: "Press Network of India",
    sourceUrl: "https://www.pninews.com/cubet-opens-new-office-and-ai-research-center-at-kochi-infopark/",
    featured: false
  },
  {
    id: "kerala-tech-brand-it-parks-affiliation-scheme-2026",
    title: "Tech Keralam brand and IT Parks Affiliation Scheme launched at Technopark",
    category: "Infrastructure",
    park: "Kerala",
    date: "2026-10-08",
    image: "/assets/news/technopark.svg",
    imageAlt: "Technopark Thiruvananthapuram",
    summary: "IT Minister P K Kunhalikutty launched Tech Keralam, a common brand for Kerala\u2019s technology sector, and an IT Parks Affiliation Scheme that lets eligible firms outside government IT parks join the state ecosystem through an online portal.",
    body: [
      "Minister for Industries, IT and AI P K Kunhalikutty launched the Tech Keralam brand and the IT Parks Affiliation Scheme at Travancore Hall, Technopark, Thiruvananthapuram on 8 October 2026. The brand is meant to bring the state\u2019s technology sector \u2014 IT parks, companies, startups, academia and research \u2014 under a common identity. Some reports call it \u201cTech Kerala\u201d.",
      "The official site, techkeralam.in, presents Kerala as \u201cIndia\u2019s First Digital State\u201d and organises the ecosystem into four pillars: parks and infrastructure; innovation and entrepreneurship; research, academia and skilling; and digital government. It lists 1,200+ tech companies, 200,000+ tech employees, 8,000+ startups and 50+ Global Capability Centres. These are existing ecosystem-wide figures, not jobs or companies created by the launch.",
      "The affiliation scheme aims to connect IT companies, co-working spaces and private technology infrastructure outside the major government-owned IT parks to a state-level network, so that eligible firms can access benefits usually extended by IT parks. Registration is through the official affiliation portal. Affiliation is not the same as becoming a government IT park tenant, and the reports we checked did not list specific benefits or eligibility rules \u2014 check the portal before applying.",
      "The same function announced a Technopark prefabricated IT building project at Phase III \u2014 reported as about 2 lakh sq ft with common recreational areas, at an estimated \u20b990 crore. Technopark and Caspian Tech Parks also exchanged an MoU, and a Semicon Kerala Consortium was announced. These are announced projects; check Technopark\u2019s official channels for timelines."
    ],
    highlights: [
      "Date: 8 October 2026, Travancore Hall, Technopark",
      "Official site: techkeralam.in \u00b7 affiliation portal: affiliation.techkeralam.in",
      "Affiliation open to eligible firms, co-working spaces and private tech infrastructure outside government IT parks",
      "Ecosystem per official site: 1,200+ companies, 200,000+ employees, 8,000+ startups, 50+ GCCs",
      "Technopark Phase III prefab IT building: ~2 lakh sq ft, ~\u20b990 crore (announced)"
    ],
    attachments: [
      { label: "Tech Keralam official site", url: "https://techkeralam.in/" },
      { label: "IT Parks Affiliation portal", url: "https://affiliation.techkeralam.in/" },
      { label: "UNI India report", url: "https://www.uniindia.com/south-india/it-kerala-brand-launch/206455" },
      { label: "GKToday explainer", url: "https://www.gktoday.in/kerala-to-launch-it-parks-affiliation-scheme/" }
    ],
    source: "Tech Keralam / UNI India / GKToday",
    sourceUrl: "https://techkeralam.in/",
    featured: false
  },
  {
    id: "indiaai-coe-thiruvananthapuram-first-cohort-2026",
    title: "IndiaAI Centre of Excellence opens at Technopark Phase IV with 15 startups",
    category: "AI City",
    park: "Technopark TVM",
    date: "2026-09-30",
    image: "/assets/news/aicity.svg",
    imageAlt: "AI centre of excellence illustration",
    summary: "MeitY’s IndiaAI Centre of Excellence, run by Digital University Kerala, launched in Thiruvananthapuram with a first cohort of 15 AI startups across pre-incubation, incubation and acceleration tracks.",
    body: [
      "The IndiaAI Centre of Excellence, set up under the IndiaAI Mission with the Government of Kerala, launched on 30 September 2026 at Kabani, Technopark Phase IV, Thiruvananthapuram. Digital University Kerala is the implementing agency, with Innovation Incubator Advisory as industry partner.",
      "The first cohort has 15 startups, working on areas such as legal automation, document intelligence, industrial AI, embedded vision and speech technologies. Focus sectors include healthcare, climate and disaster resilience, e-governance and agriculture.",
      "Startups join one of three tracks: pre-incubation (3 months), incubation (6 months) or acceleration (6 months). Reports note that grants and government pilots are not guaranteed, compute is subsidised rather than free, and workspace at the centre is listed at ₹6,000 per seat per month."
    ],
    highlights: [
      "Launched 30 September 2026 at Kabani, Technopark Phase IV",
      "Implementing agency: Digital University Kerala",
      "First cohort: 15 AI startups",
      "Tracks: pre-incubation, incubation, acceleration"
    ],
    attachments: [
      { label: "CareerIndia report", url: "https://www.careerindia.com/news/indiaai-centre-of-excellence-2026-ai-jobs-startup-opportunities-kerala-011-66441.html" }
    ],
    source: "Media reports",
    sourceUrl: "https://www.careerindia.com/news/indiaai-centre-of-excellence-2026-ai-jobs-startup-opportunities-kerala-011-66441.html",
    featured: false
  },
  {
    id: "ust-d3-startup-challenge-2026",
    title: "UST D3 Startup Challenge draws 120+ applications from Indian startups",
    category: "Business",
    park: "Kerala",
    date: "2026-09-24",
    image: "/assets/news/milestone.svg",
    imageAlt: "Startup challenge illustration",
    summary: "UST’s first D3 Startup Challenge, run with Link Innovations, received more than 120 applications from startups across India. 19 were shortlisted for a Bengaluru pitch series.",
    body: [
      "UST has launched the D3 Startup Challenge 2026 to connect emerging technology startups with its global technology and business teams and explore enterprise adoption. The challenge is part of UST’s annual D3 (Dream, Develop, Disrupt) technology conference and is run in collaboration with Link Innovations.",
      "More than 120 startups from across India applied. Priority domains include AI models, trust and responsibility; healthcare and life sciences; telecom and technology; and engineering and semiconductors.",
      "According to ElectronicsForYou, 19 startups were selected for the Bengaluru City Pitch Series after a multi-stage review, with five set to move on to the D3 Expo."
    ],
    highlights: [
      "120+ applications from startups across India",
      "Run with Link Innovations as part of UST’s D3 conference",
      "19 startups shortlisted for Bengaluru City Pitch Series"
    ],
    attachments: [
      { label: "UNI India report", url: "https://www.uniindia.com/south-india/it-kerala-ust-d3/191516" },
      { label: "ElectronicsForYou report", url: "https://www.electronicsforyou.biz/?p=139413" }
    ],
    source: "UNI India / ElectronicsForYou",
    sourceUrl: "https://www.uniindia.com/south-india/it-kerala-ust-d3/191516",
    featured: false
  },
  {
    id: "prompttech-global-technopark-kallayi-2026",
    title: "PromptTech Global opens new facility at Technopark Phase I",
    category: "Campus",
    park: "Technopark TVM",
    date: "2026-09-23",
    image: "/assets/news/technopark.svg",
    imageAlt: "Technopark Thiruvananthapuram",
    summary: "Minister P K Kunhalikutty inaugurated PromptTech Global’s new facility in the Kallayi Building, Technopark Phase I.",
    body: [
      "PromptTech Global has opened a new facility in the Kallayi Building, Technopark Phase I, Thiruvananthapuram. Minister for Industries and Commerce, IT, AI and Startups P K Kunhalikutty inaugurated it on 23 September 2026.",
      "The company says it is building a global insurance marketplace for enterprises, combining insurance and risk expertise with technology. Technopark CEO Sandip Kumar and PromptTech Global founder and Executive Director Aby Abraham attended. The report did not mention headcount or hiring plans."
    ],
    highlights: [
      "Location: Kallayi Building, Technopark Phase I",
      "Inaugurated by Minister P K Kunhalikutty, 23 September 2026",
      "Focus: enterprise insurance and risk technology"
    ],
    attachments: [
      { label: "UNI India report", url: "https://www.uniindia.com/south-india/it-kerala-technopark-23ms71/190472" }
    ],
    source: "UNI India",
    sourceUrl: "https://www.uniindia.com/south-india/it-kerala-technopark-23ms71/190472",
    featured: false
  },
  {
    id: "prevalent-ai-22-million-infopark-expansion-2026",
    title: "Prevalent AI raises $22 million; plans to expand Infopark Kochi centre",
    category: "Investment",
    park: "Infopark Kochi",
    date: "2026-09-15",
    image: "/assets/news/milestone.svg",
    imageAlt: "Funding announcement illustration",
    summary: "London-based cybersecurity and enterprise AI company Prevalent AI, co-founded by Malayali Arun S Raj, raised about ₹210 crore from Integrity Growth Partners and plans to expand its Infopark development centre.",
    body: [
      "Prevalent AI, a London-based cybersecurity and enterprise AI company, has raised $22 million (about ₹210 crore) in equity from US-based Integrity Growth Partners. It is the company’s first external funding since it was founded in 2017.",
      "The company was co-founded by Arun S Raj, its Chief Operating Officer, and Paul Stokes. Its development centre is at Infopark, Kochi. Raj said the funding will help expand the Infopark centre and is expected to create more employment opportunities in Kerala; no hiring numbers or roles were given.",
      "The investment will also support the company’s US expansion and its move beyond cybersecurity into broader enterprise risk, including financial crime prevention."
    ],
    highlights: [
      "$22 million (~₹210 crore) from Integrity Growth Partners",
      "First external funding since 2017",
      "Development centre at Infopark Kochi set to expand",
      "No hiring numbers announced yet"
    ],
    attachments: [
      { label: "Onmanorama report", url: "https://www.onmanorama.com/news/business/2026/09/15/prevalent-ai-co-founded-by-malayali-raises-210-cr-eyes-kochi-expansion.html" },
      { label: "Tech.eu report", url: "https://tech.eu/2026/08/19/prevalent-ai-secures-22m-growth-investment-to-scale-enterprise-ai-platform/" }
    ],
    source: "Onmanorama / Tech.eu",
    sourceUrl: "https://www.onmanorama.com/news/business/2026/09/15/prevalent-ai-co-founded-by-malayali-raises-210-cr-eyes-kochi-expansion.html",
    featured: false
  },
  {
    id: "keralam-gcc-boilerplate-2026",
    title: "Keralam GCC Boilerplate launched to simplify Global Capability Centre set-up",
    category: "Business",
    park: "Kerala",
    date: "2026-09-05",
    image: "/assets/news/gcc-hub.svg",
    imageAlt: "Global Capability Centre illustration",
    summary: "The state unveiled the Keralam GCC Boilerplate at the ET GCC World SURGE summit in Kovalam — a single coordinated framework for global companies setting up Global Capability Centres in Kerala.",
    body: [
      "The Keralam GCC Boilerplate was launched on 5 September 2026 at the second edition of the Economic Times GCC World SURGE summit in Kovalam, Thiruvananthapuram. It was launched by Seeram Sambasiva Rao IAS, Special Secretary, Department of Electronics & IT. Minister P K Kunhalikutty attended online.",
      "The framework is described as a single coordinated process to make setting up Global Capability Centres (GCCs) in Kerala easier and faster, from the investment decision until the centre is operational. Technopark CEO Sandip Kumar and Infoparks Kerala CEO Susanth Kurunthil were present.",
      "Specific incentives under the framework were not visible in the report we checked; companies should confirm details with the Department of Electronics & IT or the IT parks."
    ],
    highlights: [
      "Launched 5 September 2026 at ET GCC World SURGE, Kovalam",
      "Single framework for GCC set-up in Kerala",
      "Technopark and Infopark CEOs present"
    ],
    attachments: [
      { label: "UNI India report", url: "https://www.uniindia.com/south-india/development-kerala-gcc-05ms38/170307" }
    ],
    source: "UNI India",
    sourceUrl: "https://www.uniindia.com/south-india/development-kerala-gcc-05ms38/170307",
    featured: false
  },
  {
    id: "i-by-infopark-40-percent-leased-2026",
    title: "I by Infopark at Ernakulam South Metro: 40% leased in nine months",
    category: "Metro",
    park: "Infopark Kochi",
    date: "2026-07-29",
    image: "/assets/news/metro.svg",
    imageAlt: "Kochi Metro station workspace",
    summary: "Infopark’s metro-integrated workspace at Ernakulam South Metro station has leased about 40% of its space within nine months of launch, with Zoho taking the fourth floor.",
    body: [
      "I by Infopark, the IT workspace at Ernakulam South Metro station, has leased about 40% of its office space within nine months of launch, according to Infopark officials quoted by Onmanorama. Talks are reportedly under way with several firms for the rest.",
      "The facility occupies the third floor upward of a nine-storey building, with a built-up area of 48,000 sq ft (about 6,530 sq ft per floor) and 580 workstations. Zoho has leased the fourth floor.",
      "Options include flexible co-working desks and office cabins for 10 to 21 people, along with plug-and-play furnished offices, meeting and training rooms, and a neurodiversity-friendly co-working centre. It has direct access from the Metro platform."
    ],
    highlights: [
      "~40% leased within nine months",
      "48,000 sq ft built-up, 580 workstations",
      "Zoho has leased the fourth floor",
      "Direct access from Ernakulam South Metro platform"
    ],
    attachments: [
      { label: "Onmanorama report", url: "https://www.onmanorama.com/news/kerala/2026/07/29/i-by-infopark-gains-traction-40-space-leased-in-nine-months.html" }
    ],
    source: "Onmanorama",
    sourceUrl: "https://www.onmanorama.com/news/kerala/2026/07/29/i-by-infopark-gains-traction-40-space-leased-in-nine-months.html",
    featured: false
  },
  {
    id: "huddle-global-2026-ecosystem-partners-82-sold-out",
    title: "Huddle Global 2026 names ecosystem partners; 82% of tickets sold out",
    category: "Events",
    park: "Kerala",
    date: "2026-10-27",
    image: "/assets/news/huddle-global-2026-ecosystem-partners.jpg",
    imageAlt: "Huddle Global 2026 ecosystem partners poster",
    summary: "Kerala Startup Mission has announced the ecosystem partners for Huddle Global 2026, including Technopark, Infopark and Cyberpark. Organisers say 82% of tickets are sold out for the 12\u201314 November festival at The Leela Raviz, Kovalam.",
    body: [
      "Kerala Startup Mission and Tech Keralam have announced the Ecosystem Partners for Huddle Global 2026, billed as Asia\u2019s largest beachside startup festival. The festival runs on 12, 13 and 14 November 2026 at The Leela Raviz, Kovalam, Trivandrum.",
      "Partners on the poster: Startup Middle East, Technopark Thiruvananthapuram, Cyberpark Kozhikode, Infopark, Wadhwani Foundation, Kerala Management Association (KMA), IIM Kozhikode LIVE, Bootstrap Foundation, The Circle Founders Club, Maharashtra State Innovation Society, GTECH, CITI 2.0, Young Indians (Yi), Cafit, IIM Bangalore NSRCEL, TiE Mumbai, SPJIMR WISE Tech, TiE Chennai, TiE Bangalore and BHIVE Workspace.",
      "A separate poster says 82% of Huddle Global 2026 tickets are sold out and invites visitors to meet Kerala\u2019s top startups in a curated, relaxed setting by the beach.",
      "The HUDDLE20 coupon gave 20% off passes until 25 October 2026: Diamond Pass \u20b97,200 (from \u20b99,000) and Golden Pass \u20b95,600 (from \u20b97,000). That offer has now closed \u2014 check current pass prices on huddleglobal.co.in."
    ],
    highlights: [
      "Dates: 12, 13, 14 November 2026",
      "Venue: The Leela Raviz, Kovalam, Trivandrum, Kerala",
      "82% of tickets sold out (as per organisers)",
      "Ecosystem partners include Technopark, Infopark, Cyberpark, TiE, Wadhwani Foundation and IIM incubators",
      "HUDDLE20 offer (Diamond \u20b97,200 / Golden \u20b95,600) closed on 25 October 2026"
    ],
    attachments: [
      { label: "Huddle Global official website", url: "https://www.huddleglobal.co.in/" },
      { label: "Poster: 82% tickets sold out", url: "/assets/news/huddle-global-2026-82-sold-out.jpg" },
      { label: "Poster: HUDDLE20 offer (closed 25 Oct)", url: "/assets/news/huddle-global-2026-huddle20-offer.jpg" }
    ],
    source: "Kerala Startup Mission / Huddle Global posters",
    sourceUrl: "https://www.huddleglobal.co.in/",
    featured: false
  },
  {
    id: "zentral-expand-north-star-roadshow-ksum-kochi-2026",
    title: "Destination Expand North Star roadshow held at KSUM Kochi, 22 October",
    category: "Events",
    park: "Kerala",
    date: "2026-10-22",
    image: "/assets/news/zentral-ens-roadshow-kochi-2026.jpg",
    imageAlt: "Zentral Destination Expand North Star roadshow preview",
    summary: "Zentral hosted the Destination Expand North Star roadshow at Kerala Startup Mission, Kalamassery, Kochi on 22 October 2026 at 4:00 PM, for Kerala founders planning to attend Expand North Star 2026 in Dubai.",
    body: [
      "Zentral, an ecosystem partner of Expand North Star, hosted the Destination Expand North Star Kochi roadshow at Kerala Startup Mission (KSUM), Kalamassery, Kochi on 22 October 2026 at 4:00 PM IST.",
      "The session covered how founders can turn three days at Expand North Star into investor connections, strategic partnerships and a Dubai base \u2014 including how pre-arranged meetings, the deal room and investor lounges work, which investors attend, and market entry into Dubai and the GCC.",
      "Zentral says it is inviting a select circle of 100 tech founders from Kerala to Dubai for a curated Expand North Star 2026 experience. Check eligibility and details on the official roadshow page. InfoparkDaily is not the organiser."
    ],
    highlights: [
      "Date: 22 October 2026, 4:00 PM IST",
      "Venue: Kerala Startup Mission (KSUM), Kalamassery, Kochi",
      "Host: Zentral \u00b7 Ecosystem Partner of Expand North Star",
      "Curated Expand North Star 2026 programme for 100 Kerala tech founders"
    ],
    attachments: [
      { label: "Roadshow page (Zentral)", url: "https://ens-rs.zentral.world/roadshow/kochi-ksum" }
    ],
    source: "Zentral",
    sourceUrl: "https://ens-rs.zentral.world/roadshow/kochi-ksum",
    featured: false
  },
  {
    id: "playwright-ai-workshop-infopark-oct-2026",
    title: "Free Playwright + AI workshop at Thapasya Auditorium, 31 October",
    category: "Events",
    park: "Infopark Kochi",
    date: "2026-10-17",
    image: "/assets/news/playwright-ai-workshop-2026.jpg",
    imageAlt: "Prathidhwani and KnoaLabs free Playwright + AI workshop poster",
    summary: "Prathidhwani and KnoaLabs are hosting a free Playwright + AI workshop on Saturday, 31 October 2026, 9:30 AM to 12:30 PM, at Thapasya Auditorium, Infopark Phase 1, Kochi. QA professionals with 1+ year of experience can register on the Google Form.",
    body: [
      "Prathidhwani, the welfare organisation of IT employees in Kerala, and KnoaLabs are hosting a free workshop on using Playwright with AI. The poster line is “Test Smarter, Ship Faster.”",
      "The speaker is Arundev Nair, Test Automation Architect and Senior Manager at Testing Mavens. The poster says the session is for QA professionals with 1+ year of experience. Themes listed on the flyer are modern testing skills, smarter workflows, and a future-ready you.",
      "It is on Saturday, 31 October 2026, from 9:30 AM to 12:30 PM, at Thapasya Auditorium, Infopark Phase 1, Kochi. The announcement says seats are limited. Register on the Google Form: https://forms.gle/Crv9R49LEuJbTdW27. A map pin is at https://share.google/IfgP2fIlW4saaEzwn.",
      "Questions: +91 70127 13681 or +91 97468 98696. InfoparkDaily is independent and is not the organiser. Confirm the seat, timing, and venue only with Prathidhwani or KnoaLabs before you travel."
    ],
    highlights: [
      "Free workshop · Playwright + AI",
      "Saturday, 31 October 2026 · 9:30 AM–12:30 PM",
      "Thapasya Auditorium, Infopark Phase 1, Kochi",
      "Speaker: Arundev Nair, Testing Mavens",
      "QA professionals with 1+ year of experience",
      "Register: forms.gle/Crv9R49LEuJbTdW27"
    ],
    attachments: [
      { label: "Register for the workshop", url: "https://forms.gle/Crv9R49LEuJbTdW27" },
      { label: "Thapasya Auditorium map", url: "https://share.google/IfgP2fIlW4saaEzwn" },
      { label: "Facebook announcement", url: "https://www.facebook.com/share/1U4tErNWxS/" }
    ],
    source: "Prathidhwani / KnoaLabs",
    sourceUrl: "https://www.facebook.com/share/1U4tErNWxS/",
    featured: true
  },
  {
    id: "samagra-2-student-faculty-discount-2026",
    title: "SAMAGRA 2.0: ₹1,000 off for student innovators and faculty",
    category: "Events",
    park: "Kerala",
    date: "2026-10-13",
    image: "/assets/news/samagra-2-2026.jpg",
    imageAlt: "SAMAGRA 2.0 Innovation Summit poster from IIT Palakkad TECHIN",
    summary: "TECHIN at IIT Palakkad is offering a ₹1,000 discount per registration for SAMAGRA 2.0. Student innovators and faculty pay ₹1,500 including GST. Mark interest and your organisation’s headcount on the form to request the discount and full-access delegate passes.",
    body: [
      "TECHIN of IIT Palakkad is offering an exclusive ₹1,000 discount per registration for SAMAGRA 2.0. With the discount, the registration fee is ₹1,500 including GST, for student innovators and faculty only.",
      "SAMAGRA 2.0 is the Innovation Summit 2026, scheduled for 29–30 October 2026 at Hyatt Regency, Thiruvananthapuram. The poster describes two days of ideas, innovation, investment and impact, with 500+ attendees, 40+ speakers, 30+ investors, 30+ mentors and 30+ corporates. The same poster lists an offer price of ₹2,000 — confirm the student and faculty rate on the interest form before you pay.",
      "Organisations are asked to say how many participants plan to register. Mark interest on the Google Form to avail the discount and full-access delegate passes: https://forms.gle/GKQ4bWrrMqVGidQZ6",
      "InfoparkDaily is independent and is not the organiser. Verify the fee, GST, pass inclusions and deadlines only with TECHIN / IIT Palakkad."
    ],
    highlights: [
      "₹1,000 off per registration for student innovators and faculty",
      "Discounted fee: ₹1,500 including GST",
      "29–30 October 2026 · Hyatt Regency, Thiruvananthapuram",
      "Tell TECHIN how many people from your organisation will register",
      "Interest form: forms.gle/GKQ4bWrrMqVGidQZ6"
    ],
    attachments: [
      { label: "Mark interest for the SAMAGRA 2.0 discount", url: "https://forms.gle/GKQ4bWrrMqVGidQZ6" },
      { label: "IIT Palakkad", url: "https://iitpkd.ac.in/" }
    ],
    source: "TECHIN, IIT Palakkad",
    sourceUrl: "https://forms.gle/GKQ4bWrrMqVGidQZ6",
    featured: true
  },
  {
    id: "huddle-global-2026-kovalam-festival",
    title: "Huddle Global 2026: beachside startup festival at Kovalam, 12\u201314 November",
    category: "Events",
    park: "Kerala",
    date: "2026-10-13",
    image: "/assets/news/huddle-global-40-off-2026.jpg",
    imageAlt: "Huddle Global 2026 poster with 40% off code HUDDLE40",
    summary: "Kerala Startup Mission\u2019s Huddle Global returns to The Leela Raviz, Kovalam on 12\u201314 November 2026. Gold and Diamond passes are on sale \u2014 poster promo code HUDDLE40 for 40% off was valid until 15 October 2026 on the official site.",
    body: [
      "Huddle Global is billed as Asia\u2019s largest beachside startup festival. The 2026 edition is scheduled for 12, 13 and 14 November 2026 at The Leela Raviz, Kovalam, Thiruvananthapuram, with Kerala Startup Mission and Kerala IT as organising partners.",
      "Passes on the official site include Gold (gateway access, networking, investor matchmaking, mentoring and more) and Diamond (adds business matchmaking, product launch and exhibit slots, and Sundown Huddle). A circulating poster offered 40% off with code HUDDLE40 until 15 October 2026 \u2014 confirm current pricing on huddleglobal.co.in before you pay.",
      "A later poster offered 20% off with code HUDDLE20, valid until 25 October 2026 \u2014 that offer has now ended. KSUM has also announced its Ecosystem Partners for Huddle Global 2026, billing the festival as a place to connect with ecosystem stakeholders and explore strategic partnerships. Register at huddleglobal.co.in.",
      "KSUM has also run Huddle Global roadshows in Thiruvananthapuram, Chennai, Mumbai, Bengaluru, Kozhikode, Gurugram and Kochi ahead of the main festival. InfoparkDaily is independent; we are not the organiser. Verify dates, pass inclusions and refunds only on the official Huddle Global channels."
    ],
    highlights: [
      "Dates: 12\u201314 November 2026",
      "Venue: The Leela Raviz, Kovalam, Trivandrum",
      "Official site: huddleglobal.co.in",
      "Poster promos: HUDDLE40 (40% off, until 15 Oct) and HUDDLE20 (20% off, until 25 Oct) \u2014 both ended",
      "Ecosystem Partners for Huddle Global 2026 announced by KSUM",
      "Organiser: Kerala Startup Mission / Kerala IT"
    ],
    attachments: [
      { label: "Huddle Global official website", url: "https://www.huddleglobal.co.in/" },
      { label: "Kerala Startup Mission", url: "https://startupmission.kerala.gov.in/" }
    ],
    source: "Kerala Startup Mission / Huddle Global posters",
    sourceUrl: "https://www.huddleglobal.co.in/",
    featured: false
  },
  {
    id: "huddle-global-roadshow-2026-schedule",
    title: "Huddle Global 2026 roadshow: multi-city tour before the Kovalam festival",
    category: "Events",
    park: "Kerala",
    date: "2026-10-13",
    image: "/assets/news/huddle-global-roadshow-2026.jpg",
    imageAlt: "Huddle Global 2026 roadshow city schedule poster",
    summary: "Before the November festival, Huddle Global roadshows visited seven cities from 18 September to 3 October 2026 \u2014 including Technopark Trivandrum, CyberPark Kozhikode and KSUM Kochi.",
    body: [
      "A Kerala Startup Mission poster listed Huddle Global Roadshow 2026 stops: Thiruvananthapuram (KSUM Technopark, 18 Sept), Chennai (StartupTN), Mumbai (SPJIMR), Bengaluru (BHIVE Platinum Church Street), Kozhikode (KSUM Govt CyberPark, 26 Sept), Gurugram (The Circle Work, 1 Oct) and Kochi (KSUM, 3 Oct).",
      "The roadshow promoted the main Huddle Global festival on 12\u201314 November 2026 at The Leela Raviz, Kovalam. Registration was advertised at huddleglobal.co.in/Roadshows.",
      "If you missed a local roadshow, the festival registration page remains the place to check passes and agenda. InfoparkDaily lists community posters for visibility \u2014 confirm any date or venue change with KSUM."
    ],
    highlights: [
      "Roadshow window: 18 Sept \u2013 3 Oct 2026 (seven cities)",
      "Kerala stops: Technopark TVM, CyberPark Kozhikode, KSUM Kochi",
      "Main festival: 12\u201314 Nov 2026, Kovalam",
      "Roadshow URL cited: huddleglobal.co.in/Roadshows"
    ],
    attachments: [
      { label: "Huddle Global roadshows", url: "https://www.huddleglobal.co.in/" }
    ],
    source: "Kerala Startup Mission poster",
    sourceUrl: "https://www.huddleglobal.co.in/",
    featured: false
  },
  {
    id: "ieee-entrepreneurship-workshop-kochi-nov-2026",
    title: "IEEE Entrepreneurship Workshop in Kochi, 16\u201317 November 2026",
    category: "Events",
    park: "Infopark Kochi",
    date: "2026-10-13",
    image: "/assets/news/ieee-entrepreneurship-workshop-2026.jpg",
    imageAlt: "IEEE Entrepreneurship Workshop Kochi poster",
    summary: "IEEE Entrepreneurship and Kerala Startup Mission announced a two-day workshop in Kochi on 16\u201317 November 2026 for early-stage founders and academic entrepreneurs. Poster application deadline: 16 October 2026.",
    body: [
      "The IEEE Entrepreneurship Workshop is scheduled for 16\u201317 November 2026 in Kochi, Kerala, with Kerala Startup Mission as the local partner. The poster listed an application deadline of 16 October 2026.",
      "Session experts named on the flyer include Dr. S. Raghu (ET Cube International, USA), Dr. Daniel Renner (Atacama Light, USA) and Dr. K.R. Suresh Nair (Amara Raja Design Alpha, India). The programme overview mentions course directors, key topics, selection process and live Q&A.",
      "Target participants include early-stage founders and aspiring academic entrepreneurs. Register via the KSUM short link on the poster: ksum.in/ENT_Workshop. InfoparkDaily does not handle applications \u2014 use only official KSUM / IEEE channels."
    ],
    highlights: [
      "Workshop: 16\u201317 November 2026, Kochi",
      "Apply by: 16 October 2026 (per poster)",
      "Register: ksum.in/ENT_Workshop",
      "Partners: IEEE Entrepreneurship + KSUM"
    ],
    attachments: [
      { label: "KSUM registration (ENT_Workshop)", url: "https://ksum.in/ENT_Workshop" },
      { label: "Kerala Startup Mission", url: "https://startupmission.kerala.gov.in/" }
    ],
    source: "IEEE Entrepreneurship / KSUM poster",
    sourceUrl: "https://ksum.in/ENT_Workshop",
    featured: false
  },
  {
    id: "maker-sprint-3-fablab-oct-2026",
    title: "Maker Sprint 3.0: six-day digital fabrication programme at FabLab Kerala",
    category: "Events",
    park: "Technopark TVM",
    date: "2026-10-13",
    image: "/assets/news/maker-sprint-3-2026.jpg",
    imageAlt: "Maker Sprint 3.0 FabLab Kerala poster",
    summary: "FabLab Kerala and KSUM\u2019s Maker Sprint 3.0 runs 26\u201331 October 2026 at Fab Lab Kerala, Technopark Phase 1 \u2014 vinyl, laser, 3D print, PCB, CNC and a final prototype project. Only 10 seats; registration on the FabLab site.",
    body: [
      "Maker Sprint 3.0 is a six-day hands-on digital fabrication programme themed \u201cFrom Idea to Prototype in Six Days.\u201d Dates on the poster: 26\u201331 October 2026 at Fab Lab Kerala, Trivandrum, Technopark Phase 1.",
      "Modules cover vinyl cutting, laser cutting and engraving, 3D design and printing, PCB design and milling, CNC routing, and a capstone prototype project. The flyer notes open participation, no prior fabrication experience required, materials included, mentorship, and a KSUM certificate \u2014 with only 10 seats.",
      "Registration: startupmission.kerala.gov.in/fablab/maker-sprint (QR on poster). InfoparkDaily is not FabLab \u2014 confirm fees, schedule and cancellation on the official registration page."
    ],
    highlights: [
      "26\u201331 October 2026 \u00b7 Fab Lab Kerala, Technopark Phase 1",
      "6 modules + final prototype",
      "10 seats only (per poster)",
      "Register: startupmission.kerala.gov.in/fablab/maker-sprint"
    ],
    attachments: [
      { label: "Maker Sprint registration", url: "https://startupmission.kerala.gov.in/fablab/maker-sprint" },
      { label: "FabLab Kerala", url: "https://fablabkerala.in/" }
    ],
    source: "FabLab Kerala / KSUM poster",
    sourceUrl: "https://startupmission.kerala.gov.in/fablab/maker-sprint",
    featured: false
  },
  {
    id: "fab-d-lite-design-fabrication-2026",
    title: "FAB D-LITE: design-focused digital fabrication programme by FabLab Kerala",
    category: "Events",
    park: "Kerala",
    date: "2026-10-13",
    image: "/assets/news/fab-d-lite-2026.jpg",
    imageAlt: "FAB D-LITE FabLab Kerala poster",
    summary: "FabLab Kerala and KSUM promoted FAB D-LITE \u2014 covering CAD, fabrication, moulding, electronics, textiles and project presentation. Poster last date to apply: 10 October 2026.",
    body: [
      "FAB D-LITE is described as a design-focused digital fabrication programme from FabLab Kerala and Kerala Startup Mission. Topics on the poster include digital design and CAD, digital fabrication, moulding and casting, interactive electronics, textile fabrication, and project development and presentation.",
      "The poster listed a last date to apply of 10 October 2026 and pointed to fabdlite.fablabkerala.in (scan-to-apply QR). If you are reading this after that date, check the FabLab site for the next cohort or waitlist.",
      "InfoparkDaily shares KSUM community flyers for founders and students \u2014 confirm intake status only with FabLab Kerala."
    ],
    highlights: [
      "Programme: FAB D-LITE (design + fabrication)",
      "Apply via: fabdlite.fablabkerala.in",
      "Poster deadline: 10 October 2026",
      "Partners: FabLab Kerala + KSUM"
    ],
    attachments: [
      { label: "FAB D-LITE", url: "https://fabdlite.fablabkerala.in/" }
    ],
    source: "FabLab Kerala / KSUM poster",
    sourceUrl: "https://fabdlite.fablabkerala.in/",
    featured: false
  },
  {
    id: "ksum-idea-box-platform-2026",
    title: "Kerala Startup Mission launches Idea Box for early-stage innovators",
    category: "Community",
    park: "Kerala",
    date: "2026-10-13",
    image: "/assets/news/ksum-idea-box-2026.jpg",
    imageAlt: "KSUM Idea Box Malayalam launch poster",
    summary: "KSUM\u2019s Idea Box invites people with new ideas to apply free at ideabox.startupmission.in \u2014 a platform to take concepts toward startup formation with mission support.",
    body: [
      "Kerala Startup Mission\u2019s Idea Box poster (Malayalam) introduces a channel for new ideas to find a platform and grow toward recognised startups, with KSUM alongside applicants.",
      "The call to action is free applications at ideabox.startupmission.in. Details on eligibility, selection and benefits are on that portal \u2014 not reproduced here.",
      "InfoparkDaily covers KSUM programmes for Kerala\u2019s tech and student community. This is not a job listing and not an Infopark park circular."
    ],
    highlights: [
      "Apply free: ideabox.startupmission.in",
      "Organiser: Kerala Startup Mission",
      "Focus: early ideas \u2192 startup pathway"
    ],
    attachments: [
      { label: "Idea Box portal", url: "https://ideabox.startupmission.in/" }
    ],
    source: "Kerala Startup Mission poster",
    sourceUrl: "https://ideabox.startupmission.in/",
    featured: false
  },
  {
    id: "bio-ai-incubation-coe-kochi-2026",
    title: "Bio-AI Incubation Program at Bio-AI CoE, Digital Hub Kochi",
    category: "Events",
    park: "Infopark Kochi",
    date: "2026-10-13",
    image: "/assets/news/bio-ai-incubation-2026.jpg",
    imageAlt: "Bio-AI Centre of Excellence incubation call poster",
    summary: "Bio-AI Centre of Excellence (KSUM) called startups for a Bio-AI incubation track in Ayurveda and spices \u2014 GPU/compute, mentoring and funding links. Poster applications open till 20 September 2026.",
    body: [
      "The Bio-AI Centre of Excellence under Kerala Startup Mission advertised a Bio-AI Incubation Program advancing AI-driven innovation in Ayurveda and spices, targeting startups.",
      "Listed benefits include incubation at the Bio-AI CoE at Digital Hub, Kochi; access to compute and GPU infrastructure; industry and institutional connects; domain expert mentoring; and funding opportunities.",
      "Applications were open till 20 September 2026 at bioai.startupmission.in per the poster. Check the portal for current cohort status if that deadline has passed."
    ],
    highlights: [
      "Location: Bio-AI CoE, Digital Hub, Kochi",
      "Focus: AI \u00d7 Ayurveda & spices",
      "Portal: bioai.startupmission.in",
      "Poster deadline: 20 September 2026"
    ],
    attachments: [
      { label: "Bio-AI applications", url: "https://bioai.startupmission.in/" }
    ],
    source: "Bio-AI CoE / KSUM poster",
    sourceUrl: "https://bioai.startupmission.in/",
    featured: false
  },
  {
    id: "social-entrepreneurship-conclave-2026",
    title: "Social Entrepreneurship Conclave 2026 at Hyatt Regency, Thiruvananthapuram",
    category: "Events",
    park: "Technopark TVM",
    date: "2026-10-13",
    image: "/assets/news/social-entrepreneurship-conclave-2026.jpg",
    imageAlt: "Social Entrepreneurship Conclave 2026 poster",
    summary: "KSUM\u2019s SEC 2026 on 30 September 2026 at Hyatt Regency, Thiruvananthapuram \u2014 launches for social entrepreneurship programme, startup literacy, women startup cell and handbook. Register at sec.startupmission.in.",
    body: [
      "The Social Entrepreneurship Conclave 2026 (SEC) was scheduled for 30 September 2026 at Hyatt Regency, Thiruvananthapuram, bringing together entrepreneurs, investors, government, academia, NGOs and communities.",
      "The poster announced launches including a Social Entrepreneurship Programme, Startup Literacy Campaign, Kerala\u2019s first Women Startup Cell, and a Women Startup Handbook.",
      "Registration was at sec.startupmission.in. InfoparkDaily archives the flyer for readers who want context \u2014 confirm whether follow-on programmes are still open on the KSUM site."
    ],
    highlights: [
      "Date: 30 September 2026",
      "Venue: Hyatt Regency, Thiruvananthapuram",
      "Register: sec.startupmission.in",
      "Women & social enterprise focus"
    ],
    attachments: [
      { label: "SEC 2026", url: "https://sec.startupmission.in/" }
    ],
    source: "Kerala Startup Mission poster",
    sourceUrl: "https://sec.startupmission.in/",
    featured: false
  },
  {
    id: "iedc-summit-2026-sahrdaya-thrissur",
    title: "IEDC Summit 2026 at Sahrdaya College, Kodakara \u2014 Asia\u2019s largest aspiring-entrepreneur summit",
    category: "Events",
    park: "Kerala",
    date: "2026-10-13",
    image: "/assets/news/iedc-summit-2026.jpg",
    imageAlt: "IEDC Summit 2026 Sahrdaya poster",
    summary: "IEDC Summit 2026 at Sahrdaya College of Engineering & Technology, Kodakara (Thrissur) on 28 September 2026, with a CM\u2019s Wings of Change round table on 26 September. Site: iedcsummit.in.",
    body: [
      "IEDC Summit 2026 is hosted at Sahrdaya College of Engineering & Technology, Kodakara, Thrissur, with theme \u201cInnovation Beyond The Future.\u201d The main summit date on the poster is 28 September 2026.",
      "Kerala Startup Mission\u2019s \u201cChief Minister\u2019s Wings of Change\u201d round table with IEDC district cluster coordinators was listed for 26 September 2026. Chief guest named on the poster: Shri V. D. Satheesan, Chief Minister of Keralam (as printed).",
      "Tickets and details: iedcsummit.in. Partners include IEDC Sahrdaya, Sahrdaya TBI Hub and KSUM. Verify any programme changes on the official summit site."
    ],
    highlights: [
      "Summit: 28 September 2026 \u00b7 Sahrdaya, Kodakara",
      "Round table: 26 September 2026 (KSUM Wings of Change)",
      "Website: iedcsummit.in"
    ],
    attachments: [
      { label: "IEDC Summit 2026", url: "https://iedcsummit.in/" }
    ],
    source: "IEDC Sahrdaya / KSUM poster",
    sourceUrl: "https://iedcsummit.in/",
    featured: false
  },
  {
    id: "she-tech-3-builds-ksum-kochi-2026",
    title: "she tech 3.0 </BUILDS> at KSUM Kochi, 16\u201317 October 2026",
    category: "Events",
    park: "Infopark Kochi",
    date: "2026-10-13",
    image: "/assets/news/she-tech-3-2026.jpg",
    imageAlt: "she tech 3.0 BUILDS registration poster",
    summary: "Kerala Startup Mission and Kerala IT\u2019s she tech 3.0 </BUILDS> is on 16\u201317 October 2026 at KSUM Kochi \u2014 team-based AI build track. Poster registration closed 10 September 2026.",
    body: [
      "she tech 3.0 </BUILDS> is promoted by Kerala Startup Mission and Kerala IT for 16\u201317 October 2026 at KSUM Kochi, with messaging for teams with AI ideas to build together.",
      "A registration-closing poster cited 10 September 2026 as the deadline (scan-to-apply QR). If you are past that date, check KSUM / she tech channels for walk-ins, waitlist or the next edition.",
      "InfoparkDaily shares the flyer for women-in-tech and student founders in the Kochi ecosystem \u2014 not an official registration desk."
    ],
    highlights: [
      "Event: 16\u201317 October 2026",
      "Venue: KSUM Kochi",
      "Poster reg. close: 10 September 2026",
      "Theme: AI ideas + teams"
    ],
    attachments: [
      { label: "Kerala Startup Mission", url: "https://startupmission.kerala.gov.in/" }
    ],
    source: "KSUM / Kerala IT poster",
    sourceUrl: "https://startupmission.kerala.gov.in/",
    featured: false
  },
  {
    id: "bio-connect-4-life-sciences-expo-2026",
    title: "BIO CONNECT 4.0 life sciences expo at Hyatt Regency, Thiruvananthapuram",
    category: "Events",
    park: "Technopark TVM",
    date: "2026-10-13",
    image: "/assets/news/bio-connect-4-2026.jpg",
    imageAlt: "BIO CONNECT 4.0 expo poster",
    summary: "BIO CONNECT 4.0 ran 8\u20139 October 2026 at Hyatt Regency, Trivandrum \u2014 life sciences expo and conclave with 30% delegate/exhibitor discount for startups and incubators via ksum.in/bioconnect30.",
    body: [
      "BIO CONNECT 4.0: Life Sciences Industries Expo & Conclave was scheduled for 8\u20139 October 2026 at Hyatt Regency, Thiruvananthapuram, with theme \u201cConnecting Science to Business.\u201d",
      "Partners on the poster included KSIDC, Kerala Lifesciences Industries Parks, bio 360 Life Sciences Park, BioConnect and Kerala Startup Mission. A 30% discount for startups and incubators registering as delegates or exhibitors was advertised at ksum.in/bioconnect30.",
      "For post-event materials or the next edition, use official BioConnect / KSUM links. InfoparkDaily recorded the community poster for founders in biopharma, medtech and agri-food innovation."
    ],
    highlights: [
      "8\u20139 October 2026 \u00b7 Hyatt Regency, Trivandrum",
      "Startup/incubator 30% off (poster)",
      "Apply link cited: ksum.in/bioconnect30"
    ],
    attachments: [
      { label: "BioConnect (KSUM)", url: "https://ksum.in/bioconnect30" }
    ],
    source: "KSUM / BioConnect poster",
    sourceUrl: "https://ksum.in/bioconnect30",
    featured: false
  },
  {
    id: "bio-connect-product-launch-slot-2026",
    title: "BioConnect 4.0 product launch slots for life-sciences startups",
    category: "Events",
    park: "Kerala",
    date: "2026-10-13",
    image: "/assets/news/bio-connect-product-launch-2026.jpg",
    imageAlt: "BioConnect product launch call poster",
    summary: "KSUM invited life-sciences startups and SMEs to launch products at BioConnect 4.0 (8\u20139 Oct 2026, Hyatt Regency Trivandrum). Poster application deadline: 28 September 2026 \u00b7 ksum.in/BioConnect.",
    body: [
      "A BioConnect 4.0 poster invited life-sciences startups and SMEs to launch products at the expo on 8\u20139 October 2026 at Hyatt Regency, Thiruvananthapuram.",
      "Focus areas listed: biopharma, medtech, nutraceuticals, agri-food innovation and artificial intelligence. Applications were open with deadline 28 September 2026 on ksum.in/BioConnect (QR on poster).",
      "InfoparkDaily notes this for biotech founders \u2014 confirm whether late applications are accepted on the official portal."
    ],
    highlights: [
      "Product launch track at BioConnect 4.0",
      "Event: 8\u20139 October 2026",
      "Poster apply by: 28 September 2026",
      "ksum.in/BioConnect"
    ],
    attachments: [
      { label: "BioConnect applications", url: "https://ksum.in/BioConnect" }
    ],
    source: "KSUM BioConnect poster",
    sourceUrl: "https://ksum.in/BioConnect",
    featured: false
  },
  {
    id: "fablab-pcb-designing-workshop-oct-2026",
    title: "Hands-on PCB designing workshop at KSUM Technopark, 3 October 2026",
    category: "Events",
    park: "Technopark TVM",
    date: "2026-10-13",
    image: "/assets/news/fablab-pcb-workshop-2026.jpg",
    imageAlt: "FabLab PCB designing workshop poster",
    summary: "FabLab Kerala and KSUM ran a full-day PCB workshop on 3 October 2026 at Tejaswini, Technopark \u2014 KiCad, layout, DRC, Gerber and fabrication workflow. Fee \u20b9300; register at ksum.in/Pcb_Designing.",
    body: [
      "FabLab Kerala and Kerala Startup Mission advertised a hands-on PCB designing workshop on 3 October 2026, 9:30 AM\u20135:30 PM, at Kerala Startup Mission, G3B, Tejaswini Building, Technopark.",
      "Topics included Fab Lab intro, basic electronics and PCB design, schematic design in KiCad, PCB layout, design rule check (DRC), Gerber generation and fabrication workflow. Participation fee on the poster: \u20b9300.",
      "Registration link: ksum.in/Pcb_Designing. Check FabLab Kerala for the next PCB batch if this date has passed."
    ],
    highlights: [
      "3 October 2026 \u00b7 Tejaswini, Technopark",
      "KiCad + fabrication workflow",
      "Fee: \u20b9300 (poster)",
      "ksum.in/Pcb_Designing"
    ],
    attachments: [
      { label: "PCB workshop registration", url: "https://ksum.in/Pcb_Designing" }
    ],
    source: "FabLab Kerala / KSUM poster",
    sourceUrl: "https://ksum.in/Pcb_Designing",
    featured: false
  },
  {
    id: "rink-ccif-exposure-visit-gcw-2026",
    title: "RINK exposure visit to CCIF instrumentation at Government College for Women, Vazhuthacaud",
    category: "Events",
    park: "Technopark TVM",
    date: "2026-10-13",
    image: "/assets/news/rink-ccif-visit-2026.jpg",
    imageAlt: "RINK CCIF exposure visit poster",
    summary: "One-day RINK visit to the Centralised Common Instrumentation Facility at GCW Vazhuthacaud on 16 September 2026 \u2014 NMR, Raman, microscopy and more. MoU between KSUM and GCW; fee \u20b9200; apply by 12 Sept at ksum.in/CCIF.",
    body: [
      "Research Innovation Network Kerala (RINK) and Kerala Startup Mission promoted a one-day exposure visit to the Centralised Common Instrumentation Facility (CCIF) at Government College for Women, Vazhuthacaud on 16 September 2026, 9:30 AM\u20132:30 PM.",
      "The poster highlighted 25+ instruments including NMR, fluorescence and confocal Raman microscopes, and a nano fibre electrospinning unit, plus MoU signing between KSUM and GCW for startup support. Registration fee \u20b9200; last date to apply 12 September 2026; ksum.in/CCIF; contact 8301919348.",
      "InfoparkDaily archives the notice for researchers and hardware founders \u2014 verify future CCIF open days on RINK / KSUM pages."
    ],
    highlights: [
      "16 September 2026 \u00b7 GCW Vazhuthacaud",
      "CCIF advanced instrumentation tour",
      "Fee \u20b9200 \u00b7 apply by 12 Sept 2026",
      "ksum.in/CCIF"
    ],
    attachments: [
      { label: "CCIF visit registration", url: "https://ksum.in/CCIF" }
    ],
    source: "RINK / KSUM / GCW poster",
    sourceUrl: "https://ksum.in/CCIF",
    featured: false
  },
  {
    id: "technopark-quad-350-crore-loan-2026",
    title: "Technopark seeks ₹350 crore loan to finish QUAD IT building in Phase IV",
    category: "Investment",
    park: "Technopark TVM",
    date: "2026-09-04",
    image: "/assets/news/technopark.svg",
    imageAlt: "Technopark Phase IV Technocity campus illustration",
    summary:
      "Technopark has invited banks to fund a ₹350 crore term loan so it can complete the QUAD IT building at Technocity (Phase IV) — about 8.97 lakh sq ft of new office space at Pallipuram.",
    body: [
      "Technopark is seeking a ₹350 crore term loan to complete its QUAD IT building at Technocity, the park’s Phase IV campus at Pallipuram, Thiruvananthapuram. The Times of India reported that the loan would cover most of a ₹432.57 crore project cost, excluding land.",
      "The proposed building has a built-up area of about 8.97 lakh sq ft. Technopark has invited expressions of interest from scheduled commercial banks and financial institutions. The park would put in ₹82.57 crore from its own funds. Repayment is planned mainly from rental income once the building is let.",
      "After lenders asked for more time for internal appraisal, the deadline to submit proposals was extended to 15 September 2026, 5 pm. Bids are scheduled to be opened at 3 pm on 16 September 2026 at Park Centre, Technopark.",
      "QUAD is one of the large developments planned at Technocity. Officials say nearly 9 lakh sq ft of extra built-up space should help the park take more companies and support more jobs when the building opens. InfoparkDaily is independent — this is not a Technopark or bank announcement. Confirm tenders and terms on technopark.org.",
      "For job seekers: new towers do not mean walk-ins tomorrow. Watch official Technopark and company careers pages when leasing starts. InfoparkDaily will keep covering Phase IV buildings, co-developer projects, and campus hiring as public updates appear."
    ],
    highlights: [
      "₹350 crore term loan sought from banks / FIs",
      "Project cost cited: ₹432.57 crore (excluding land)",
      "QUAD IT building: ~8.97 lakh sq ft at Technocity (Phase IV)",
      "Park contribution cited: ₹82.57 crore from internal resources",
      "EOI deadline extended to 15 Sept 2026; opening 16 Sept 2026"
    ],
    attachments: [
      {
        label: "Times of India — QUAD loan report",
        url: "https://timesofindia.indiatimes.com/city/thiruvananthapuram/technopark-seeks-350-crore-loan-to-complete-quad-it-building-at-phase-iv/articleshow/133741217.cms"
      },
      { label: "Technopark official website", url: "https://technopark.org/" }
    ],
    source: "The Times of India / Technopark EOI coverage",
    sourceUrl:
      "https://timesofindia.indiatimes.com/city/thiruvananthapuram/technopark-seeks-350-crore-loan-to-complete-quad-it-building-at-phase-iv/articleshow/133741217.cms",
    featured: true
  },
  {
    id: "technopark-semiconductor-science-park-100-crore-2026",
    title: "₹100 crore semiconductor & science park proposed at Technopark Phase IV",
    category: "Infrastructure",
    park: "Technopark TVM",
    date: "2026-09-03",
    image: "/assets/news/aicity.svg",
    imageAlt: "Illustration for science and semiconductor park at Technocity",
    summary:
      "A 10-acre Semiconductor Capability Development Park and Science–Technology Experience Park is proposed at Technocity, with an estimated ₹100 crore investment. The MoU was handed over in early September 2026.",
    body: [
      "Kerala has proposed a Semiconductor Capability Development Park and a Science and Technology Experience Park at Technocity (Technopark Phase IV). The Hindu and The Times of India report a 10-acre project with an estimated ₹100 crore investment.",
      "Xtra G Club Private Limited is to implement the project in collaboration with the Indian Institute of Information Technology and Management-Kerala (IIITM-K). On 3 September 2026, Industries and IT Minister P.K. Kunhalikutty handed over the MoU to Anian Koshy, managing director of Xtra G Club, according to The Hindu.",
      "Public descriptions include semiconductor process demonstration, electronics labs, chip-design learning spaces, prototyping, and industry programmes — framed as hands-on capability building, not a full chip fab. A science–technology experience park is also described, with interactive galleries.",
      "This is separate from other Technocity projects such as QUAD and longer-running science-park plans. InfoparkDaily is not the developer. Watch official Technopark and Government of Kerala updates for land, construction, and hiring — none of those are confirmed in the MoU handover reports we used."
    ],
    highlights: [
      "Estimated investment: ₹100 crore",
      "About 10 acres at Technocity (Phase IV)",
      "Developer cited: Xtra G Club Pvt Ltd with IIITM-K",
      "MoU handover reported 3 September 2026",
      "Focus: semiconductor skills + science–tech experience — not a confirmed fab"
    ],
    attachments: [
      {
        label: "The Hindu — semiconductor park",
        url: "https://www.thehindu.com/news/national/kerala/semiconductor-capability-development-park-to-come-up-in-thiruvananthapuram/article71416013.ece"
      },
      {
        label: "The Hindu — MoU handover",
        url: "https://www.thehindu.com/news/national/kerala/mou-on-semiconductor-capacity-building-park-in-keralams-capital-handed-over-to-xtra-g-club/article71424807.ece"
      },
      { label: "Technopark official website", url: "https://technopark.org/" }
    ],
    source: "The Hindu / The Times of India",
    sourceUrl:
      "https://www.thehindu.com/news/national/kerala/mou-on-semiconductor-capacity-building-park-in-keralams-capital-handed-over-to-xtra-g-club/article71424807.ece",
    featured: false
  },
  {
    id: "infopark-phase-3-ai-township-status-2026",
    title: "Infopark Phase 3 AI township: 300+ acres planned, land pooling still needs clearance",
    category: "AI City",
    park: "Infopark Kochi",
    date: "2026-09-01",
    image: "/assets/news/phase3.svg",
    imageAlt: "Infopark Phase 3 Integrated AI Township concept",
    summary:
      "Infopark and GCDA signed an MoU for Kerala’s first Integrated AI Township on 300+ acres. Land pooling in Kizhakkambalam / Kunnathunad has since hit legal-jurisdiction questions. Here is what is confirmed.",
    body: [
      "On 29 September 2025 Infopark and the Greater Cochin Development Authority signed an MoU, in the presence of the Chief Minister, for Infopark Phase 3 — described on Infopark’s site as Kerala’s first Integrated AI Township on more than 300 acres in Ernakulam, using land pooling.",
      "Public briefings after the MoU described a township model: GCDA to identify land, Infopark to remain project owner, with studies, surveys, and a detailed report to government. Infopark’s CEO has previously spoken of a 2030-horizon build-out. Those are plans, not a finished campus.",
      "In 2026, The Times of India reported that implementation is stuck on jurisdiction: the proposed site sits in Kizhakkambalam and Kunnathunad panchayats, outside GCDA’s usual area. Infopark’s CEO was quoted saying land pooling cannot start until legal and statutory issues are sorted, including possible amendments.",
      "InfoparkDaily will keep this as a project-level story — land, approvals, construction — not as a hiring notice. There is no public walk-in attached to Phase 3. Verify every update on infopark.in. We are not Infopark official."
    ],
    highlights: [
      "Official MoU: Infopark + GCDA, 29 September 2025",
      "Vision: Integrated AI Township, 300+ acres, land pooling",
      "2026 reports: land pooling paused over GCDA jurisdiction",
      "Not a jobs listing — watch infopark.in for official steps"
    ],
    attachments: [
      {
        label: "Infopark — MoU for Phase 3",
        url: "https://infopark.in/news/infopark-gcda-sign-mou-for-infopark-phase-3"
      },
      {
        label: "The Hindu — Phase III briefing (2025)",
        url: "https://www.thehindu.com/news/national/kerala/infopark-phase-iii-likely-to-be-completed-by-2030-says-ceo/article70113040.ece"
      }
    ],
    source: "Infopark official news / The Hindu / The Times of India",
    sourceUrl: "https://infopark.in/news/infopark-gcda-sign-mou-for-infopark-phase-3",
    featured: false
  },
  {
    id: "experion-ai-centre-technopark-2026",
    title: "Experion opens AI Centre of Excellence at Technopark, Bhavani Building",
    category: "Campus",
    park: "Technopark TVM",
    date: "2026-08-17",
    image: "/assets/news/aicity.svg",
    imageAlt: "AI and product engineering campus illustration",
    summary:
      "Experion Technologies inaugurated a 58,000 sq ft development centre at Technopark in August 2026. The site is the company’s AI Centre of Excellence, with capacity for more than 700 engineers.",
    body: [
      "Experion Technologies opened a 58,000 sq ft development centre at Technopark, Thiruvananthapuram, in August 2026. Company and trade-press reports say it is Experion’s largest development centre so far and will work as its AI Centre of Excellence.",
      "The facility is in the Bhavani Building. Reports describe capacity for more than 700 engineers, AI and embedded IoT labs, rapid prototyping, and a Forward Deployed Engineer Academy. Dr Tessy Thomas inaugurated the centre, according to Experion’s own announcement.",
      "This is a company campus story — more AI product-engineering seats in Trivandrum — not a park-wide hiring drive. Roles, if any, belong on Experion’s careers page. InfoparkDaily does not recruit for Experion."
    ],
    highlights: [
      "58,000 sq ft centre at Technopark (Bhavani Building)",
      "Described as AI Centre of Excellence",
      "Capacity cited: 700+ engineers",
      "Inauguration reported mid-August 2026"
    ],
    attachments: [
      {
        label: "TechnoparkToday — Experion AI CoE",
        url: "https://www.technoparktoday.com/experion-technologies-opens-ai-center-of-excellence-at-technopark-trivandrum/"
      },
      { label: "Technopark official website", url: "https://technopark.org/" }
    ],
    source: "Experion / TechnoparkToday / trade press",
    sourceUrl:
      "https://www.technoparktoday.com/experion-technologies-opens-ai-center-of-excellence-at-technopark-trivandrum/",
    featured: false
  },
  {
    id: "healthedge-brigade-square-technopark-2026",
    title: "HealthEdge opens 1.62 lakh sq ft campus at Brigade Square, Technopark",
    category: "Campus",
    park: "Technopark TVM",
    date: "2026-08-20",
    image: "/assets/news/milestone.svg",
    imageAlt: "Large IT campus expansion illustration",
    summary:
      "US healthcare-tech firm HealthEdge inaugurated a new Technopark campus at Brigade Square in August 2026 — about 162,000 sq ft across 11 floors, with seating cited around 1,500.",
    body: [
      "HealthEdge inaugurated a new campus at Brigade Square, Technopark Phase I, Thiruvananthapuram, on 20 August 2026, according to the company’s press release. The Economic Times reported a lease of about 1.62 lakh sq ft across 11 floors of the tower.",
      "HealthEdge says the campus spans about 162,000 sq ft across 11 of Brigade Square’s 12 upper floors, with seating for about 1,500 people, covering engineering, product, technology, operations, and corporate teams. Brigade Square is described as roughly 2 lakh sq ft including basements and 12 upper floors.",
      "The company lists India offices in Chennai, Coimbatore, Bengaluru, Hyderabad, Pune, Kochi, and Thiruvananthapuram. Seating capacity is not a confirmed hiring number. Check HealthEdge careers for actual openings. InfoparkDaily is not the employer."
    ],
    highlights: [
      "Brigade Square, Technopark Phase I",
      "Lease / campus size cited: ~1.62 lakh sq ft (11 floors)",
      "Seating cited: ~1,500 — not a job advertisement",
      "Inauguration: 20 August 2026 (company release)"
    ],
    attachments: [
      {
        label: "HealthEdge press release",
        url: "https://healthedge.com/resources/press-releases/healthedge-expands-india-footprint-with-new-thiruvananthapuram-campus-deepening-commitment-to-technology-innovation-and-growth-in-kerala"
      },
      {
        label: "Economic Times — lease report",
        url: "https://economictimes.indiatimes.com/industry/services/property-/-cstruction/healthedge-leases-1-62-lakh-sq-ft-in-thiruvananthapuram-for-new-campus/articleshow/133375968.cms"
      }
    ],
    source: "HealthEdge press release / The Economic Times",
    sourceUrl:
      "https://healthedge.com/resources/press-releases/healthedge-expands-india-footprint-with-new-thiruvananthapuram-campus-deepening-commitment-to-technology-innovation-and-growth-in-kerala",
    featured: false
  },
  {
    id: "lulu-twin-towers-non-sez-smartcity-2026",
    title: "LuLu IT Twin Towers: one tower opened as Non-SEZ space at SmartCity Kochi",
    category: "Business",
    park: "SmartCity Kochi",
    date: "2026-08-04",
    image: "/assets/news/gcc-hub.svg",
    imageAlt: "Grade-A IT office towers illustration",
    summary:
      "LuLu IT Parks has designated about 1.25 million sq ft at LuLu IT Twin Towers, SmartCity Kochi, as Non-SEZ / non-processing-area space — alongside 1.25 million sq ft that remains SEZ.",
    body: [
      "LuLu IT Twin Towers at SmartCity Kochi, Kakkanad, are two Grade-A office towers. Company and government coverage at inauguration (June 2025) cited about ₹1,500 crore investment, 12.74 acres, 3.5 million sq ft built-up, and 2.5 million sq ft leasable, with each tower about 30 office floors and 152 metres tall.",
      "In 2026 LuLu IT Parks said it is offering Non-SEZ IT/ITES space at the Twin Towers. Its LinkedIn post (4 August 2026) cites 1.25 million sq ft of Grade A Non-SEZ office space. Malayalam business daily Dhanam reported that one 12.5 lakh sq ft tower was shifted to a Non-Processing Area of the SEZ so domestic-market firms can sit alongside export-oriented SEZ units, with the other 12.5 lakh sq ft remaining SEZ.",
      "That split matters in Kochi: many GCCs, banks, and Indian IT firms prefer non-SEZ floors. Infopark’s own LuLu Cyber Towers in Phase 1 are a different campus. This story is SmartCity Kochi, not Infopark Phase 2.",
      "Dhanam also reported pre-leasing of 2.5 lakh sq ft. Treat tenant names as unconfirmed unless LuLu or the company publishes them. InfoparkDaily is not a leasing agent."
    ],
    highlights: [
      "Location: SmartCity Kochi, Kakkanad — not Infopark Phase 2",
      "Leasable campus cited: 2.5 million sq ft (two towers)",
      "About 1.25 million sq ft Non-SEZ / non-processing area",
      "About 1.25 million sq ft remains SEZ",
      "Inauguration reported June 2025; Non-SEZ offer posted August 2026"
    ],
    attachments: [
      {
        label: "LuLu IT Parks — Non-SEZ announcement (LinkedIn)",
        url: "https://www.linkedin.com/posts/lulutechpark_luluitparks-luluittwintowers-nonsez-activity-7490292145480769536-yQ_q"
      },
      {
        label: "The Hindu — Twin Towers inauguration",
        url: "https://www.thehindu.com/news/national/kerala/lulu-it-twin-towers-to-be-inaugurated-on-june-28/article69740566.ece"
      },
      { label: "SmartCity Kochi", url: "https://www.smartcity-infra.com/" }
    ],
    source: "LuLu IT Parks / The Hindu / Dhanam",
    sourceUrl:
      "https://www.linkedin.com/posts/lulutechpark_luluitparks-luluittwintowers-nonsez-activity-7490292145480769536-yQ_q",
    featured: false
  },
  {
    id: "ust-infopark-phase-2-campus-2026",
    title: "UST campus rising at Infopark Phase 2 — 9 acres, 6 lakh+ sq ft, late-2027 target",
    category: "Campus",
    park: "Infopark Kochi",
    date: "2026-05-22",
    image: "/assets/news/phase3.svg",
    imageAlt: "Infopark Phase 2 campus development illustration",
    summary:
      "UST is building its second owned India campus on 9 acres in Infopark Phase 2: a 10-floor, 6 lakh+ sq ft building with about 4,400 seats, aimed at completion by late 2027.",
    body: [
      "UST is constructing a self-owned campus in Infopark Kochi Phase 2 on a 9-acre plot. Company announcements at foundation (September 2024) described a 10-floor building of over 6 lakh sq ft, about 4,400 seats, a gym, and a 1,400-seat auditorium — UST’s second owned campus in India after Thiruvananthapuram.",
      "UST said it then employed more than 2,800 people at Infopark Kochi and aimed to add over 3,000 jobs over five years, targeting about 6,000 people in the region when the campus opens. Those are company targets, not guaranteed hires.",
      "The New Indian Express reported in May 2026 that the campus — 10 floors, over 6 lakh sq ft, seating about 4,400 — is slated for completion by late 2027. Infopark CEO Susanth Kurunthil said UST had been allotted 9 acres on land that was later frozen for SilverLine, then released by special order so work could continue. Piling has been reported as underway.",
      "This is a campus-and-capacity story. Apply only via UST careers or official park listings. InfoparkDaily is not UST and does not charge candidates."
    ],
    highlights: [
      "9 acres, Infopark Phase 2",
      "10 floors, 6 lakh+ sq ft, ~4,400 seats (company / press figures)",
      "Second owned India campus after Thiruvananthapuram",
      "Completion cited: late 2027",
      "Job figures are company targets — not an InfoparkDaily vacancy"
    ],
    attachments: [
      {
        label: "Express Computer — UST Kochi campus",
        url: "https://www.expresscomputer.in/news/ust-to-expand-india-presence-with-state-of-the-art-kochi-campus-and-create-over-3000-new-jobs-in-the-next-5-years/116691/"
      },
      {
        label: "The New Indian Express — Infopark land / UST campus",
        url: "https://www.newindianexpress.com/cities/kochi/2026/May/22/silverline-scrapped-easing-land-crunch-at-infopark-for-expansion-plans"
      },
      { label: "Infopark official website", url: "https://infopark.in/" }
    ],
    source: "UST announcements / Express Computer / The New Indian Express",
    sourceUrl:
      "https://www.newindianexpress.com/cities/kochi/2026/May/22/silverline-scrapped-easing-land-crunch-at-infopark-for-expansion-plans",
    featured: false
  },
  {
    id: "hilite-cyberpark-570-crore-2026",
    title: "HiLITE plans ₹570 crore IT complexes at Cyberpark Kozhikode — 12,500 jobs cited",
    category: "Investment",
    park: "Cyberpark Kozhikode",
    date: "2026-03-10",
    image: "/assets/news/milestone.svg",
    imageAlt: "Cyberpark Kozhikode IT tower illustration",
    summary:
      "HiLITE Group announced two IT complexes at Cyberpark Kozhikode with a combined ₹570 crore investment. BusinessLine cited about 10,000 jobs at Cyber Tower and 2,500 at Cyber Hub.",
    body: [
      "HiLITE Group announced two IT complexes at Cyberpark, Kozhikode, with Kerala State IT Infrastructure Ltd (KSITIL/KITFRA) and Cyberpark. The Hindu Business Line (11 March 2026) put combined investment at ₹570 crore.",
      "HiLITE Cyber Tower is described as a 28-floor building on 2.5 acres, about 9 lakh sq ft, around ₹500 crore, with about 10,000 jobs expected. HiLITE Cyber Hub is described as over 1.56 lakh sq ft and about ₹70 crore, with construction already started and about 2,500 direct IT jobs projected. Together, reports add those job figures to 12,500 — they are expectations, not filled seats.",
      "HiLITE’s own site later listed Cyber Hub groundbreaking on 9 March 2026. North Kerala’s IT story is still smaller than Infopark or Technopark; these towers are the capacity bet. InfoparkDaily is not HiLITE or Cyberpark. Confirm leasing and hiring on official pages."
    ],
    highlights: [
      "Combined investment cited: ₹570 crore",
      "Cyber Tower: 28 floors, ~9 lakh sq ft, ~₹500 crore",
      "Cyber Hub: ~1.56 lakh sq ft, construction reported underway",
      "Job numbers (10,000 + 2,500) are projections"
    ],
    attachments: [
      {
        label: "The Hindu Business Line",
        url: "https://www.thehindubusinessline.com/info-tech/hilite-group-to-invest-570-crore-in-two-it-complexes-at-kozhikode-cyberpark/article70729776.ece"
      },
      {
        label: "HiLITE — Cyber Hub groundbreaking",
        url: "https://hilitegroup.com/news-events/hilite-cyber-hub-groundbreaking-ceremony-held-at-cyberpark-kozhikode/"
      },
      { label: "Cyberpark Kozhikode", url: "https://cyberparks.in/" }
    ],
    source: "The Hindu Business Line / HiLITE Group",
    sourceUrl:
      "https://www.thehindubusinessline.com/info-tech/hilite-group-to-invest-570-crore-in-two-it-complexes-at-kozhikode-cyberpark/article70729776.ece",
    featured: false
  },
  {
    id: "infoparkdaily-career-guides-launch-2026",
    title: "InfoparkDaily launches career guides for Infopark & Technopark job seekers",
    category: "Community",
    park: "Kerala",
    date: "2026-08-05",
    image: "/assets/news/career-guides.svg",
    imageAlt: "Career guides illustration for Infopark and Technopark job seekers",
    summary:
      "New original guides cover how to apply, fresher prep, walk-ins, weekly hiring insights, and how to verify jobs before you share documents — written for Kerala IT park candidates.",
    body: [
      "InfoparkDaily has published a new Career Guides section for people hunting roles across Infopark Kochi, Technopark Trivandrum, and Cyberpark. The guides are original explainers — not scrapes of job cards — and they sit alongside our daily openings digest.",
      "The first set answers the questions we hear most often in the community: how to apply through park portals without missing deadlines, what fresher-friendly hiring usually means in Kochi, how to handle Infopark walk-ins, what hiring themes look like this week, and how to spot fee scams before you travel or share ID proofs.",
      "Each guide includes practical process advice, internal links to Jobs and Recruit, and a clear note that InfoparkDaily is not the employer. Candidates should always confirm roles on the official Infopark, Technopark, or company careers page before applying.",
      "You can start at the Guides hub, then jump into How to apply, the Fresher guide, Walk-in tips, Kerala IT hiring this week, or Verify jobs before you apply. We will keep updating the weekly hiring editorial as public portal patterns shift.",
      "If you are a company contact with an authorised opening, share it through Recruit. If you are a candidate, browse open jobs and use the guides as a checklist — not as a paid placement service. InfoparkDaily never charges applicants a fee to apply."
    ],
    highlights: [
      "Five original career guides live on /guides/",
      "Covers apply process, freshers, walk-ins, weekly hiring, and safety",
      "InfoparkDaily is independent — not the park authority or employer",
      "Companies can submit roles via /recruit/"
    ],
    attachments: [
      { label: "Career Guides", url: "https://infoparkdaily.online/guides/" },
      { label: "How to apply", url: "https://infoparkdaily.online/guides/how-to-apply-infopark-technopark-jobs/" },
      { label: "Browse jobs", url: "https://infoparkdaily.online/jobs/" },
      { label: "Recruit", url: "https://infoparkdaily.online/recruit/" }
    ],
    source: "InfoparkDaily editorial",
    sourceUrl: "https://infoparkdaily.online/guides/",
    featured: false
  },
  {
    id: "verify-infopark-job-posts-before-you-apply-2026",
    title: "Fake Infopark job posts are rising — verify before you apply or pay anyone",
    category: "Business",
    park: "Infopark Kochi",
    date: "2026-08-05",
    image: "/assets/news/govco.svg",
    imageAlt: "Abstract graphic about checking official channels before applying to jobs",
    summary:
      "As Kerala IT park hiring stays busy, scam chats often copy real company names. Here is InfoparkDaily’s short explainer on what to check before you share documents or travel for a walk-in.",
    body: [
      "Busy hiring weeks around Infopark Kochi and Technopark usually bring more genuine openings — and more fake “HR” messages. Scammers reuse company logos, claim urgent joining bonuses, and ask for UPI payments or OTPs. InfoparkDaily does not charge candidates to apply, and neither do legitimate park employers through random personal chats.",
      "Before you share a resume with sensitive IDs attached, match the company name to the Infopark or Technopark jobs portal or the employer’s official website. Confirm the role title, last date to apply, and the apply method on that official page. If the only “proof” is a forwarded WhatsApp image with no park reference and no company domain, pause.",
      "Never pay for an interview slot, offer letter, training bond cash demand, or “Infopark entry fee.” Call a phone number published on the company site — not a number that appears only inside a suspicious chat. For walk-ins, re-check the building and time window the same morning.",
      "We published a fuller checklist in Verify jobs before you apply, plus process help in How to apply for Infopark and Technopark jobs. Use our Jobs digest to discover openings, then complete the apply step on official channels.",
      "If something already went wrong — you paid or shared OTPs — stop further transfers, save chat and payment evidence, and report through cybercrime channels as appropriate. You can also flag suspicious posts to us via Contact so we can warn the community."
    ],
    highlights: [
      "Never pay to apply or to “confirm” an Infopark interview",
      "Match company + role on official park or careers pages",
      "Re-check walk-in venue the same morning",
      "Full checklist: /guides/verify-jobs-before-you-apply/"
    ],
    attachments: [
      { label: "Verify jobs before you apply", url: "https://infoparkdaily.online/guides/verify-jobs-before-you-apply/" },
      { label: "How to apply", url: "https://infoparkdaily.online/guides/how-to-apply-infopark-technopark-jobs/" },
      { label: "Open jobs", url: "https://infoparkdaily.online/jobs/" },
      { label: "Contact InfoparkDaily", url: "https://infoparkdaily.online/contact/" },
      { label: "Infopark jobs portal", url: "https://infopark.in/companies-job" }
    ],
    source: "InfoparkDaily editorial",
    sourceUrl: "https://infoparkdaily.online/guides/verify-jobs-before-you-apply/",
    featured: false
  },
  {
    id: "aarathi-panikkar-arch-rally-2026",
    title: "Aarathi Panikkar finishes 2nd in Women’s Category at ARCH Rally 2026",
    category: "Community",
    park: "Infopark Kochi",
    date: "2026-07-28",
    image: "/assets/news/aarathi-panikkar-arch-rally-2026.jpg",
    imageAlt: "Aarathi Panikkar with ARCH Rally 2026 trophy — 2nd place, Women’s Category",
    summary:
      "Infopark employee Aarathi Panikkar secured 2nd place in the Women’s Category at ARCH Rally 2026 at Kari Motor Speedway, Coimbatore — a proud moment for the Infopark community.",
    body: [
      "A proud moment for the Infopark community. Huge congratulations to Aarathi Panikkar on securing an incredible 2nd Place in the Women’s Category at the ARCH Rally 2026 held at Kari Motor Speedway, Coimbatore.",
      "As an Infopark employee, Aarathi has made the entire Infopark community proud with her passion, determination, and remarkable achievement in motorsport.",
      "ARCH Rally 2026 was held on 25th & 26th July 2026 at Kari Motor Speedway, Coimbatore. Aarathi, a Season 1 competitor, made an impressive debut in stage rallying by finishing 2nd in the Women’s Category.",
      "From the InfoparkDaily family, we proudly celebrate this inspiring milestone and wish Aarathi many more podium finishes, victories, and unforgettable moments ahead.",
      "Her achievement is an inspiration to many aspiring women in motorsports. Keep racing, keep inspiring. Congratulations, Aarathi!"
    ],
    highlights: [
      "2nd Place — Women’s Category, ARCH Rally 2026",
      "Venue: Kari Motor Speedway, Coimbatore",
      "Event dates: 25th & 26th July 2026",
      "Infopark employee · Season 1 competitor · stage-rally debut"
    ],
    attachments: [
      { label: "Aarathi Panikkar on Instagram", url: "https://www.instagram.com/aarathi_panikkar/" },
      { label: "InfoparkDaily News", url: "https://infoparkdaily.online/news/" },
      { label: "Infopark official website", url: "https://infopark.in/" }
    ],
    source: "InfoparkDaily community celebration",
    sourceUrl: "https://infoparkdaily.online/news/",
    featured: false
  },
  {
    id: "kerala-it-highlights-naviq-gcc-polaris",
    title: "Kerala IT highlights — Naviq launch, GCC roadmap, Polaris tower & AI hub push",
    category: "Business",
    park: "Kerala",
    date: "2026-07-24",
    image: "/assets/news/gcc-hub.svg",
    imageAlt: "Kerala IT sector AI, GCC and Infopark growth highlights",
    summary:
      "Kerala’s IT sector is advancing with Naviq Technology’s launch, a GCC roadmap targeting 150 centres and 2 lakh jobs by 2031, Caspian’s Polaris tower at Infopark Phase 2, and a statewide AI hub vision.",
    body: [
      "Kerala’s IT sector is advancing rapidly with major artificial intelligence initiatives, infrastructure expansions, and new global investments. Key updates include the launch of Naviq Technology, the rollout of a Global Capability Centre (GCC) roadmap, and new tower developments at Infopark.",
      "Naviq Technology launch: Kerala’s Chief Minister inaugurated Naviq Technology at IBS Tower in Infopark Phase I, Kochi — a new AI-focused travel tech company by IBS Software.",
      "New IT tower at Kochi: Caspian Techparks received land allocation to build a new IT tower named Polaris in Infopark Kochi Phase 2 — expanding campus built-up capacity for growing companies.",
      "GCC investment roadmap: Kerala released a comprehensive feasibility report aiming to scale the state to 150 operational Global Capability Centres and 2 lakh jobs by 2031.",
      "AI hub vision: State leaders announced strategic efforts to position Kerala as a premier national hub for artificial intelligence and emerging technologies.",
      "Together, these moves signal stronger hiring pipelines across AI, product engineering, GCCs, and campus infrastructure — always verify company careers pages and official Infopark updates before applying or investing decisions."
    ],
    highlights: [
      "Naviq Technology inaugurated at IBS Tower, Infopark Phase I",
      "Caspian Techparks allotted land for Polaris tower in Infopark Phase 2",
      "GCC roadmap: 150 centres & 2 lakh jobs by 2031",
      "State push to position Kerala as a national AI hub"
    ],
    attachments: [
      { label: "Infopark official website", url: "https://infopark.in/" },
      { label: "Infopark news & updates", url: "https://infopark.in/news" }
    ],
    source: "Infopark / Kerala IT updates curated by InfoparkDaily",
    sourceUrl: "https://infopark.in/",
    featured: false
  },
  {
    id: "caspian-polaris-tower-infopark-phase-2",
    title: "Caspian Techparks allotted land for Polaris IT tower at Infopark Phase 2",
    category: "Infrastructure",
    park: "Infopark Kochi",
    date: "2026-07-24",
    image: "/assets/news/land-restore.svg",
    imageAlt: "New Polaris IT tower planned at Infopark Kochi Phase 2",
    summary:
      "Caspian Techparks has received land allocation to build Polaris, a new IT tower in Infopark Kochi Phase 2 — adding fresh office capacity to the Kakkanad campus.",
    body: [
      "Caspian Techparks has received land allocation to develop a new IT tower named Polaris in Infopark Kochi Phase 2 — a fresh infrastructure addition for Kochi’s IT corridor.",
      "New towers typically expand ready-to-occupy and built-to-suit options for IT/ITES companies, product teams, and GCCs looking to scale teams in Kakkanad.",
      "The allotment sits alongside Infopark’s broader growth story: AI-led campuses, GCC attraction, and Phase 3 township planning.",
      "Companies and job seekers should treat timelines as subject to official clearances and construction progress — confirm updates via Infopark and developer announcements."
    ],
    highlights: [
      "Developer: Caspian Techparks",
      "Project: Polaris IT tower",
      "Location: Infopark Kochi Phase 2",
      "Adds new office capacity for campus growth"
    ],
    attachments: [
      { label: "Infopark official website", url: "https://infopark.in/" },
      { label: "Infopark news & updates", url: "https://infopark.in/news" }
    ],
    source: "Infopark / media reports on Phase 2 allotments",
    sourceUrl: "https://infopark.in/",
    featured: false
  },
  {
    id: "naviq-ai-talent-opportunities",
    title: "Naviq Technology opens doors in Kochi — IBS Software’s new AI venture",
    category: "Business",
    park: "Infopark Kochi",
    date: "2026-07-24",
    image: "/assets/news/naviq-opens-kochi.jpg",
    imageAlt: "Naviq Technology opens doors in Kochi — InfoparkDaily announcement graphic",
    summary:
      "IBS Software has launched Naviq Technology in Kochi — an AI venture creating opportunities for AI researchers, data scientists, software engineers, and technology specialists in global travel tech.",
    body: [
      "Kerala’s technology ecosystem is reaching new heights. IBS Software has officially launched Naviq Technology, its new AI venture in Kochi, marking another major milestone for the state’s growing innovation ecosystem.",
      "Naviq Technology is focused on building the future of the global travel industry by leveraging Artificial Intelligence, Data Science, Machine Learning, and next-generation software engineering. The company aims to create cutting-edge AI-powered travel solutions while opening exciting career opportunities.",
      "Exciting opportunities for AI researchers, data scientists, software engineers, technology specialists, and AI & innovation professionals — shaping how the world travels with intelligence and data.",
      "This launch further strengthens Infopark Kochi and Kerala’s tech corridor as one of India’s fastest-growing technology and innovation hubs, attracting global companies and creating high-value tech careers in the state.",
      "Stay with InfoparkDaily for IT jobs, AI & tech news, startup updates, walk-ins, internships, hiring alerts, and career opportunities across Kerala. Always verify openings on official company careers pages before applying."
    ],
    highlights: [
      "IBS Software’s new AI venture — Naviq Technology — opens in Kochi",
      "Focus: AI, Data Science, ML & next-gen software for global travel",
      "Roles: AI researchers, data scientists, software engineers & tech specialists",
      "Strengthens Infopark Kochi / Kerala as an AI & innovation hub"
    ],
    attachments: [
      { label: "Read more on InfoparkDaily News", url: "https://infoparkdaily.online/news/" },
      { label: "Infopark official website", url: "https://infopark.in/" }
    ],
    source: "InfoparkDaily community announcement",
    sourceUrl: "https://infoparkdaily.online/news/",
    featured: false
  },
  {
    id: "naviq-technology-inauguration",
    title: "Kerala CM inaugurates Naviq Technology — IBS Group’s AI travel campus at Infopark Kochi",
    category: "Business",
    park: "Infopark Kochi",
    date: "2026-07-23",
    image: "/assets/news/naviq-ibs-inauguration.jpg",
    imageAlt: "IBS Software Naviq Technology inauguration event in Kochi",
    summary:
      "Kerala CM inaugurated Naviq Technology, an AI-focused travel tech company by IBS Group, at Infopark Kochi on 23 July 2026 — with growth potential of up to 5,000 professionals.",
    body: [
      "Kerala’s Chief Minister inaugurated Naviq Technology, an AI-focused travel tech company promoted by IBS Group, at Infopark Kochi on 23 July 2026 — marking a major new campus announcement for the Kakkanad IT corridor.",
      "Naviq is positioned as a specialised AI company for the global travel sector. Industry updates around the launch indicate the campus could grow toward a workforce of up to 5,000 professionals as operations scale.",
      "The inauguration reinforces Infopark’s push to attract next-generation product and AI engineering teams alongside traditional IT services and Global Capability Centres (GCCs).",
      "For job seekers in Kochi, Naviq and similar AI-led campuses signal fresh demand across software engineering, data/AI, travel domain, and product roles — always verify openings on official company careers pages before applying."
    ],
    highlights: [
      "Inaugurated on 23 July 2026 at Infopark Kochi",
      "IBS Group’s AI-focused travel technology company",
      "Expected growth potential of up to 5,000 professionals",
      "Strengthens Infopark’s AI + product engineering footprint"
    ],
    attachments: [
      { label: "Infopark official website", url: "https://infopark.in/" },
      { label: "Infopark news & updates", url: "https://infopark.in/news" }
    ],
    source: "Infopark / media reports around the inauguration",
    sourceUrl: "https://infopark.in/",
    featured: false
  },
  {
    id: "infopark-government-company",
    title: "Infopark becomes a government company — tax flexibility for the next growth phase",
    category: "Business",
    park: "Infopark Kochi",
    date: "2026-03-15",
    image: "/assets/news/govco.svg",
    imageAlt: "Infopark status change to government company",
    summary:
      "In March 2026, Infopark transitioned from a charitable society to a government company under the Companies Act — aimed at tax benefits and more flexible expansion.",
    body: [
      "In March 2026, Infopark successfully transitioned from a charitable society structure to a government company under the Companies Act — a strategic governance shift for Kerala’s flagship IT park.",
      "Officials have described the change as a move to unlock tax benefits and improve operational flexibility for land leasing, co-developer partnerships, and long-term campus expansion.",
      "The new structure is expected to support faster decision-making as Infopark scales Phase 3 AI township plans, GCC attraction programmes, and campus infrastructure upgrades.",
      "For companies and co-developers watching Kochi, the status change is a signal that Infopark is preparing for a larger, more commercial growth cycle while remaining under government ownership."
    ],
    highlights: [
      "Transition completed in March 2026",
      "From charitable society → government company (Companies Act)",
      "Aimed at tax benefits and expansion flexibility",
      "Supports Phase 3, GCC pitch, and infra upgrades"
    ],
    attachments: [{ label: "Infopark official website", url: "https://infopark.in/" }],
    source: "Infopark / Government of Kerala related updates",
    sourceUrl: "https://infopark.in/",
    featured: false
  },
  {
    id: "infopark-phase-3-ai-township",
    title: "Infopark Phase 3 AI Township advances — 300 acres with GCDA at Kizhakkambalam",
    category: "AI City",
    park: "Infopark Kochi",
    date: "2026-07-20",
    image: "/assets/news/phase3.svg",
    imageAlt: "Infopark Phase 3 Integrated AI Township",
    summary:
      "Infopark and GCDA are advancing the 300-acre Phase 3 Integrated AI Township in Kizhakkambalam — targeting 20 million sq. ft. of IT space and over 2 lakh direct IT/GCC jobs.",
    body: [
      "Infopark and the Greater Cochin Development Authority (GCDA) are pushing ahead with the massive Phase 3 Integrated AI Township planned over about 300 acres in Kizhakkambalam — described as Kerala’s first integrated AI township scale campus.",
      "Plans cited in public updates include around 20 million sq. ft. of IT space and an ambition to create over 2 lakh direct IT / GCC jobs as the township builds out over multiple phases.",
      "Infopark has also publicly referenced Phase 3 and Phase 4 expansion ambitions, with Phase 3 framed as a futuristic AI-enabled tech city adjoining the Kochi IT growth corridor.",
      "An MoU between Infopark and GCDA for Phase 3 was highlighted as a historic step in late September 2025, and progress updates continue through 2026 as master-planning and partnership work advance.",
      "For Kochi’s talent market, Phase 3 is the long-term capacity story: more campuses, more GCCs, and a multi-year hiring pipeline across engineering, product, AI, and shared services."
    ],
    highlights: [
      "≈300-acre Integrated AI Township at Kizhakkambalam",
      "Infopark + GCDA partnership (MoU highlighted Sept 2025)",
      "Target: ~20 million sq. ft. IT space",
      "Ambition: 2 lakh+ direct IT / GCC jobs",
      "Part of Infopark Phase 3 & Phase 4 expansion narrative"
    ],
    attachments: [
      { label: "Infopark news — Phase 3 & Phase 4", url: "https://infopark.in/" },
      { label: "Infopark & GCDA MoU updates", url: "https://infopark.in/news" }
    ],
    source: "Infopark official news & updates / public reports",
    sourceUrl: "https://infopark.in/news",
    featured: false
  },
  {
    id: "infopark-gcc-hub-push",
    title: "Infopark pitches itself as South India’s next GCC hub",
    category: "Business",
    park: "Infopark Kochi",
    date: "2026-07-18",
    image: "/assets/news/gcc-hub.svg",
    imageAlt: "Infopark GCC hub pitch",
    summary:
      "Infopark is aggressively positioning Kochi as a Global Capability Centre hub for South India, partnering with consultants such as Inductus Group to attract multinational companies.",
    body: [
      "Infopark is aggressively pitching itself as South India’s hub for Global Capability Centres (GCCs), competing for multinational captive and shared-services investments that prefer tier-1 talent with lower operating friction.",
      "Public updates note partnerships with consultants such as Inductus Group to attract multinational companies evaluating Kochi for engineering, finance, analytics, and AI-enabled GCC operations.",
      "Kochi already hosts a dense campus ecosystem at Infopark, and the GCC pitch pairs with Phase 3 AI township capacity, metro connectivity progress, and campus infrastructure upgrades.",
      "For professionals, GCC growth usually means roles in software engineering, cloud, cybersecurity, finance & accounting, HR ops, analytics, and domain centres — verify each employer’s official careers page before applying."
    ],
    highlights: [
      "Positioning Infopark as a South India GCC hub",
      "Consultant partnerships including Inductus Group cited",
      "Targets multinational captive / shared-services centres",
      "Complements Phase 3 AI township capacity"
    ],
    attachments: [{ label: "Infopark official website", url: "https://infopark.in/" }],
    source: "Infopark updates / industry reports",
    sourceUrl: "https://infopark.in/",
    featured: false
  },
  {
    id: "infopark-land-infra-upgrades",
    title: "Infopark restores 20 acres after SilverLine freeze — parking & food courts next",
    category: "Infrastructure",
    park: "Infopark Kochi",
    date: "2026-07-16",
    image: "/assets/news/land-restore.svg",
    imageAlt: "Infopark campus infrastructure upgrades",
    summary:
      "After SilverLine project cancellation, Infopark restored about 20 acres of previously frozen land for IT co-developers — with funds earmarked for parking and food-court upgrades.",
    body: [
      "Following the cancellation of the SilverLine project, Infopark restored around 20 acres of previously frozen land that can now be leased to prospective IT co-developers.",
      "Authorities are actively using restored land and newly available funds to address day-to-day campus deficits — including additional parking facilities and expanded food courts for the growing workforce.",
      "The infrastructure push sits alongside Infopark’s larger growth agenda: government-company status, GCC attraction, and Phase 3 AI township planning.",
      "For employees and companies on campus, better parking and food amenities are practical quality-of-life upgrades as headcount continues to rise across Kakkanad."
    ],
    highlights: [
      "≈20 acres restored after SilverLine land freeze ended",
      "Land available to lease for IT co-developers",
      "Focus on parking facilities and food-court expansion",
      "Supports daily campus life as Infopark scales"
    ],
    attachments: [{ label: "Infopark official website", url: "https://infopark.in/" }],
    source: "Infopark / local infrastructure updates",
    sourceUrl: "https://infopark.in/",
    featured: false
  },
  {
    id: "infopark-phase-3",
    title: "Infopark Phase 3 takes off — mega expansion planned near Kunnathunad",
    category: "Infrastructure",
    park: "Infopark Kochi",
    date: "2026-07-15",
    image: "/assets/news/phase3.svg",
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
    featured: false
  },
  {
    id: "kochi-ai-city",
    title: "Kerala's AI City project kicks off — Kochi set to become an AI hub",
    category: "AI City",
    park: "Kerala",
    date: "2026-07-12",
    image: "/assets/news/aicity.svg",
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
    image: "/assets/news/metro.svg",
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
    image: "/assets/news/onam.svg",
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
    image: "/assets/news/technopark.svg",
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
    image: "/assets/news/milestone.svg",
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
