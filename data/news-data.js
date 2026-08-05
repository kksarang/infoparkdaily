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
 * category    string   "Infrastructure" | "AI City" | "Metro" | "Events" | "Business" | "Community"
 * park        string   "Infopark Kochi" | "Technopark TVM" | "Kerala"
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
    id: "infoparkdaily-career-guides-launch-2026",
    title: "InfoparkDaily launches career guides for Infopark & Technopark job seekers",
    category: "Community",
    park: "Kerala",
    date: "2026-08-05",
    image: "/assets/news/milestone.svg",
    imageAlt: "Illustration representing career milestones for Kerala IT park job seekers",
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
    featured: true
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
    featured: true
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
