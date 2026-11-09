// Daily Web Studio detail pages (/studio/<slug>/), one per menu item.
//
//   node scripts/build-studio-pages.mjs
//
// The header, icon sprite, footer and editor/code visuals are copied from studio/index.html,
// so the landing page stays the single source for shared chrome. Content lives in PAGES below.
// Pages are honest about status: "Available now", "In early access" or "Coming soon".
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { previewHtml } from "../js/studio/preview.js";
import { ROOT, esc, ICO, NEW, EDITOR, CODE, layout, faqLd, APP, crumbsHtml, updateSitemap } from "./studio/shell.mjs";

/* ---------- visuals ---------- */
const shot = (slug, alt) => `<div class="dp-browser"><span class="dp-bar" aria-hidden="true"><i></i><i></i><i></i><em>${slug}.pages.dev</em></span><img src="/assets/portfolio/previews/${slug}.webp" width="1200" height="900" alt="${esc(alt)}"></div>`;
const phone = (slug) => `<div class="dp-phone" aria-hidden="true"><img src="/assets/portfolio/previews/${slug}-mobile.webp" width="390" height="844" alt=""></div>`;
const firstLook = (p, label) =>
  `<div class="dp-browser"><span class="dp-bar" aria-hidden="true"><i></i><i></i><i></i><em>${esc(p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}.pages.dev</em></span><iframe class="dp-frame" title="${esc(label)}" sandbox="" loading="lazy" srcdoc="${esc(previewHtml({ id: "preview", ...p }))}"></iframe></div><p class="dp-vis-note">A real first look made by Studio from the setup answers. Sample business.</p>`;
const VIS = {
  editor: () => `<div class="dp-editor">${EDITOR}</div>`,
  code: () => `<div class="dp-code">${CODE}</div>`,
  shots: (a, b) => `<div class="dp-pair">${shot(a, `${a} design`)}${phone(b || a)}</div>`,
  hosts: () => `<div class="dp-hosts">${[
    ["cloud", "Cloudflare Pages", "Free · business OK", "Fast worldwide network, free HTTPS, custom domains."],
    ["globe", "Netlify", "Free · business OK", "Drag-and-drop deploys and built-in contact forms."],
    ["git", "GitHub Pages", "Free · personal sites", "Great for portfolios. Not for shops or business sites."],
  ].map(([i, t, b, d]) => `<div class="dp-host"><span>${ICO(i)}</span><div><strong>${t}</strong><small>${d}</small></div><em${b.includes("personal") ? ' class="lim"' : ""}>${b}</em></div>`).join("")}</div>`,
  dns: () => `<div class="dp-dns" aria-label="Example DNS records"><div class="dp-dns-head"><strong>yourbusiness.in</strong><span>DNS records</span></div>
    <table><thead><tr><th>Type</th><th>Name</th><th>Points to</th></tr></thead><tbody>
    <tr><td>CNAME</td><td>www</td><td>your-site.pages.dev</td></tr><tr><td>CNAME</td><td>@</td><td>your-site.pages.dev</td></tr></tbody></table>
    <p>${ICO("check")}HTTPS certificate issued automatically</p></div>`,
};

/* ---------- content ---------- */
const DESIGNS = {
  store: [["chai-clay", "Chai & Clay", "Handmade ceramics"], ["kasavu-lane", "Kasavu Lane", "Handloom clothing"], ["shop-window", "Shop Window", "Maker & seller"]],
  portfolio: [["developer-pro", "Developer Pro", "Software developer"], ["product-designer", "Product Designer", "Product designer"], ["fresh-start", "Fresh Start", "Graduate"], ["photo-journal", "Photo Journal", "Photographer"], ["independent-pro", "Independent Pro", "Freelance web designer"], ["executive-minimal", "Executive Minimal", "Business leader"]],
  business: [["kayal-interiors", "Kayal Interiors", "Interior design studio"], ["brightpath-tutors", "Brightpath Tutors", "Home tuition centre"], ["consultant-signature", "Consultant Signature", "Strategy consultant"]],
  agency: [["agency-landing", "Agency Landing", "Product consultancy"], ["orbit-studio", "Orbit Studio", "Digital marketing"], ["brand-atelier", "Brand Atelier", "Brand studio"]],
  all: [["chai-clay", "Chai & Clay", "Online store"], ["kayal-interiors", "Kayal Interiors", "Business"], ["brightpath-tutors", "Brightpath Tutors", "Education"], ["ink-margin", "Ink & Margin", "Blog"], ["developer-pro", "Developer Pro", "Portfolio"], ["spotlight", "Spotlight", "Creator"], ["kasavu-lane", "Kasavu Lane", "Clothing store"], ["agency-landing", "Agency Landing", "Agency"], ["photo-journal", "Photo Journal", "Photographer"]],
};

const STATUS = { now: ["Available now", "now"], early: ["In early access", "early"], soon: ["Coming soon", "soon"] };

const PAGES = [
  {
    slug: "website-builder", group: "Product", title: "Website builder", status: "early",
    h1: "Build your website in minutes, not weeks.",
    lead: "Answer a few simple questions about your business, choose a look, pick your pages, and Studio sets up your site with a first look of your homepage. No code, no designer needed.",
    cta: ["Start building", NEW()], visual: () => firstLook({ name: "Malabar Spice Kitchen", tagline: "Slow-cooked Malabar flavours since 1998", location: "Kakkanad, Kochi", type: "restaurant", look: "warm", accent: "amber", pages: ["Home", "Menu", "Gallery", "Visit us", "Contact"] }, "First look of a restaurant website"),
    features: [
      ["rows", "Guided setup", "Five short steps: type, details, look, pages and review. Change any answer before you create the site."],
      ["bag", "12 website types", "Portfolio, business, agency, restaurant, corporate, startup, landing page, blog, store, event, real estate and education."],
      ["desktop", "Instant first look", "See your homepage on desktop and phone the moment you finish, built from your answers."],
      ["cloud", "Saved to your account", "Sign in and your sites save to your InfoparkDaily account and open on any device."],
      ["unlock", "Yours to keep", "Your site will export as plain HTML and CSS, so you’re never locked in."],
      ["hand", "Help when you want it", "Prefer not to build it yourself? Our team can build and launch it for you."],
    ],
    steps: [["Tell us about it", "Pick your website type and add a name and one line about what you do."], ["Choose a look", "Clean, Bold, Warm or Editorial, plus an accent colour that matches your brand."], ["Pick your pages", "We suggest the right pages for your type. Add or remove any."]],
    faq: [
      ["Is the website builder free?", "Yes. Studio is free during early access. Paid plans with premium templates come later, and you’ll always be able to export what you’ve built."],
      ["Do I need to know how to code?", "No. Everything is done by answering questions and, soon, by clicking and editing in the visual editor."],
      ["What can I do today?", "Set up sites for all 12 website types and see a first look of your homepage. The template marketplace, visual editor and code export are coming next."],
      ["Can I build more than one site?", "Yes, up to 50 sites per account during early access."],
    ],
    related: ["designs", "visual-editor", "export"],
  },
  {
    slug: "designs", group: "Product", title: "Website designs", status: "now",
    h1: "Complete designs, ready for your story.",
    lead: "Start from a finished, phone-ready website made for your kind of work. Every design comes with real sections, sample content and layouts tested on phones, tablets and laptops.",
    cta: ["Browse all designs", "/portfolio/templates/all/"], cta2: ["Start building", NEW()], visual: () => VIS.shots("kayal-interiors", "brightpath-tutors"),
    features: [
      ["desktop", "Fully responsive", "Every design adapts to phones, tablets and large screens without extra work."],
      ["rows", "Real sections", "Hero, services, work, testimonials, pricing, contact and more, already laid out."],
      ["bag", "Made for your field", "Designs for stores, studios, tutors, writers, creators, developers and consultants."],
      ["bolt", "Fast by design", "Light pages without heavy scripts, so they load quickly on mobile data."],
      ["check", "Live previews", "Open any design as a full website before you choose."],
      ["hand", "We can set it up", "Choose a design and our team can personalise it with your content, from ₹1,999."],
    ],
    designs: "all", designsTitle: "A few of the designs",
    steps: [["Browse", "Filter designs by your field and style, and open full previews."], ["Choose", "Pick the one that fits your work and brand."], ["Make it yours", "Personalise it in Studio, or let our team do it for you."]],
    faq: [
      ["How many designs are there?", "There are 54 designs today across portfolios, business sites, stores, blogs and creator pages, with more added regularly."],
      ["Can I use these designs in Studio now?", "You can preview all of them now. They become editable Studio templates when the template marketplace opens; until then our team can personalise any of them for you."],
      ["Are the names and photos real?", "No. Every design uses fictional sample content that you replace with your own."],
      ["Will my site look the same as someone else’s?", "Your colours, fonts, text, photos and sections make it yours. Many people can start from the same design and end up with very different sites."],
    ],
    related: ["website-builder", "online-store", "portfolio-website"],
  },
  {
    slug: "visual-editor", group: "Product", title: "Visual editor", status: "soon",
    h1: "Edit your website like a document.",
    lead: "Click any text to change it, drag sections into place, swap photos, and set your colours and fonts. What you see is exactly what your visitors get, on every screen size.",
    cta: ["Start setting up your site", NEW()], visual: VIS.editor,
    soonNote: "The visual editor is in development. Sites you set up today carry straight into it when it launches.",
    features: [
      ["rows", "Sections and layers", "Add, reorder, duplicate and remove sections from a clear list."],
      ["copy", "Click-to-edit text", "Change headings, paragraphs and buttons right on the page."],
      ["desktop", "Desktop, tablet and phone", "Switch views and fine-tune how your site looks on every screen."],
      ["bolt", "Theme controls", "Colours, fonts, corner radius and button styles applied across the whole site."],
      ["undo", "Undo and redo", "Try ideas freely. Every change can be undone."],
      ["cloud", "Autosave", "Changes save to your account as you work."],
    ],
    steps: [["Pick a section", "Choose any part of the page from the canvas or the section list."], ["Change it", "Edit text, swap images, adjust spacing and colours in the side panel."], ["Preview and publish", "Check it on every screen size, then export or publish."]],
    faq: [
      ["When will the editor launch?", "It’s the next major part of Studio after the template marketplace. Early-access users get it first."],
      ["Will it be hard to use?", "No. A simple mode covers text, images, sections and colours. An advanced mode adds layout and spacing controls for people who want them."],
      ["Will my current sites work in it?", "Yes. Every site you set up now carries its type, look, colours and pages into the editor."],
      ["Does it work on a phone?", "You’ll be able to make quick text and photo edits on a phone. Full design work is best on a laptop."],
    ],
    related: ["website-builder", "export", "designs"],
  },
  {
    slug: "export", group: "Product", title: "Export your code", status: "soon",
    h1: "Your website, as clean code you own.",
    lead: "Download your whole site as plain HTML, CSS and images in one ZIP. Open it on your computer, edit it in any code editor, or host it free anywhere. No Studio code inside, ever.",
    cta: ["Start building", NEW()], visual: VIS.code,
    soonNote: "Code export arrives with the visual editor. It will be included free.",
    features: [
      ["zip", "One-click ZIP", "Every page, stylesheet and image in a tidy folder, ready to use."],
      ["unlock", "No lock-in", "Plain web files with no Studio scripts, so you can leave any time and keep everything."],
      ["git", "Push to GitHub", "Send your site straight to a GitHub repository you own."],
      ["cloud", "Host it free", "Upload to Cloudflare Pages, Netlify or GitHub Pages at no cost."],
      ["bolt", "Fast and light", "Static pages load quickly and are easy for search engines to read."],
      ["copy", "Readable code", "Sensible file names and tidy markup, so a developer can take over easily."],
    ],
    steps: [["Finish your site", "Build and preview it in Studio."], ["Export", "Download the ZIP or push it to GitHub."], ["Go live", "Upload it to a free host and connect your domain."]],
    faq: [
      ["Is export free?", "Yes. Exporting your own site will always be free. You own what you build."],
      ["Can I run my site on my computer?", "Yes. Open index.html in a browser, or run a simple local server if your site has several pages."],
      ["Can a developer edit the exported code?", "Yes. It’s standard HTML and CSS that any web developer can work with."],
      ["What about forms and online payments?", "Contact forms work through free services such as Netlify Forms. Payments work through payment links (for example Razorpay). Full shopping carts need a server and aren’t included."],
    ],
    related: ["free-hosting", "domains", "fast-websites"],
  },
  {
    slug: "online-store", group: "Build for", title: "Online store", status: "early", type: "ecommerce",
    h1: "Sell online without the monthly fees.",
    lead: "Show your products with photos, prices and descriptions, and let customers order on WhatsApp or pay with a payment link. Perfect for makers, boutiques, home bakers and small shops across Kerala.",
    cta: ["Start your store", NEW("ecommerce")], visual: () => VIS.shots("chai-clay", "kasavu-lane"),
    features: [
      ["bag", "Product catalogue", "Product cards with photos, prices, sizes and short descriptions."],
      ["chat", "Orders on WhatsApp", "An order button on every product opens WhatsApp with the product already named."],
      ["unlock", "Payment links", "Add Razorpay or UPI payment links for customers who want to pay upfront."],
      ["phone", "Made for phones", "Most shoppers browse on a phone. Every store design is built for small screens first."],
      ["cloud", "Free hosting", "Publish on Cloudflare Pages or Netlify with no monthly hosting bill."],
      ["hand", "Store set-up help", "Our Shop + Domain package builds and launches your store for you, from ₹4,499."],
    ],
    designs: "store", designsTitle: "Store designs",
    steps: [["Set up your store", "Choose “Online store”, add your shop name and pick a look."], ["Add products", "Photos, prices and descriptions in your own words."], ["Start taking orders", "Share your link on Instagram and WhatsApp, and orders come to you."]],
    faq: [
      ["Can customers pay on my site?", "Yes, through payment links such as Razorpay or UPI. A full checkout with a cart and stock tracking needs a server and isn’t part of Studio yet."],
      ["Do you take a commission on sales?", "No. Orders and payments go directly to you."],
      ["How many products can I add?", "As many as you like. For very large catalogues (hundreds of products), talk to us about a custom store."],
      ["Can I use my own domain?", "Yes. Connect a domain you already own, or ask us to register one for you."],
    ],
    related: ["whatsapp-orders", "business-website", "free-hosting"],
  },
  {
    slug: "portfolio-website", group: "Build for", title: "Portfolio website", status: "early", type: "portfolio",
    h1: "A portfolio that gets you hired.",
    lead: "Show your best work, your skills and your story on one link you can share with recruiters and clients. Designs for developers, designers, freshers, photographers, writers and consultants.",
    cta: ["Build your portfolio", NEW("portfolio")], visual: () => VIS.shots("developer-pro", "product-designer"),
    features: [
      ["user", "About you", "A clear introduction, your photo and what you’re looking for."],
      ["rows", "Projects and case studies", "Show the problem, your process and the result for each project."],
      ["check", "Skills and experience", "Skills, tools, education and a career timeline."],
      ["zip", "Resume download", "Link your resume so recruiters can download it in one tap."],
      ["globe", "Your own link", "Use a free address or your own domain, like yourname.in."],
      ["hand", "Done for you, from ₹1,999", "Send us your resume and projects and we’ll build it for you."],
    ],
    designs: "portfolio", designsTitle: "Portfolio designs",
    steps: [["Choose Personal portfolio", "Add your name and a one-line summary of what you do."], ["Add your work", "Projects, skills, experience and a resume link."], ["Share your link", "Add it to your resume, LinkedIn and job applications."]],
    faq: [
      ["I’m a fresher with few projects. Is a portfolio worth it?", "Yes. College projects, internships and practice work all count. Our Fresh Start and Campus Portfolio designs are made for exactly this."],
      ["Can I host it on GitHub Pages?", "Yes. GitHub Pages is free and a great fit for personal portfolios."],
      ["Does it work with the InfoparkDaily resume builder?", "Yes. Build your resume with our free resume builder and link the PDF from your portfolio."],
      ["Can you build it for me?", "Yes. Our team builds portfolio websites from ₹1,999, or ₹2,999 with your own domain."],
    ],
    related: ["designs", "free-hosting", "export"],
  },
  {
    slug: "restaurant-website", group: "Build for", title: "Restaurant website", status: "early", type: "restaurant",
    h1: "A restaurant website that fills tables.",
    lead: "Put your menu, opening hours, location and photos online, with a one-tap way to call, get directions or reserve a table. Built for restaurants, cafés, bakeries and cloud kitchens.",
    cta: ["Build your restaurant site", NEW("restaurant")],
    visual: () => firstLook({ name: "Malabar Spice Kitchen", tagline: "Slow-cooked Malabar flavours since 1998", location: "Kakkanad, Kochi", type: "restaurant", look: "warm", accent: "amber", pages: ["Home", "Menu", "Gallery", "Visit us", "Contact"] }, "First look of a restaurant website"),
    features: [
      ["food", "Menu page", "Dishes, prices, categories and today’s specials, easy to read on a phone."],
      ["clock", "Hours and location", "Opening times, a map link and one-tap directions."],
      ["chat", "Reserve on WhatsApp", "A booking button that opens WhatsApp with the date and party size to fill in."],
      ["desktop", "Photo gallery", "Show your food, your space and your team."],
      ["bolt", "Fast on mobile data", "Light pages that load quickly for hungry customers on the move."],
      ["globe", "Found on Google", "Clean pages that search engines read easily, with your name, area and cuisine."],
    ],
    steps: [["Choose Restaurant & café", "Add your restaurant name, a tagline and your area."], ["Pick your pages", "Menu, gallery, visit us and contact are suggested for you."], ["Share it", "Add the link to Google Maps, Instagram and your WhatsApp profile."]],
    faq: [
      ["Can customers order food on my site?", "They can send orders on WhatsApp from your menu. Full online ordering with payments and delivery tracking isn’t part of Studio yet."],
      ["Can I update the menu myself?", "Yes. When the visual editor launches you can change dishes and prices any time."],
      ["Does it work with Swiggy or Zomato?", "You can add buttons that link to your Swiggy and Zomato pages."],
      ["Are restaurant designs available now?", "You can set up a restaurant site and see its first look today. Full restaurant templates arrive with the template marketplace."],
    ],
    related: ["whatsapp-orders", "business-website", "website-builder"],
  },
  {
    slug: "event-website", group: "Build for", title: "Event website", status: "early", type: "event",
    h1: "One page for everything about your event.",
    lead: "Share the schedule, speakers, venue and registration link in one clean place. For meetups, conferences, workshops, college fests, weddings and community events.",
    cta: ["Build your event site", NEW("event")],
    visual: () => firstLook({ name: "Kochi Product Meetup", tagline: "An evening of talks and networking for product people", location: "Infopark, Kochi", type: "event", look: "bold", accent: "indigo", pages: ["Home", "Schedule", "Speakers", "Venue", "Register"] }, "First look of an event website"),
    features: [
      ["clock", "Schedule", "Sessions, times and rooms laid out clearly, day by day."],
      ["user", "Speakers", "Photos, titles and short bios for every speaker."],
      ["globe", "Venue and directions", "Address, map link, parking and travel tips."],
      ["check", "Registration", "Link to Google Forms, Razorpay or any ticketing page."],
      ["chat", "Updates on WhatsApp", "Point attendees to your WhatsApp or Telegram group for last-minute news."],
      ["bolt", "Ready in an afternoon", "A focused one- or few-page site you can set up quickly."],
    ],
    steps: [["Choose Event website", "Add the event name, date line and city."], ["Add the details", "Schedule, speakers, venue and a registration link."], ["Share everywhere", "Post the link on social media, in emails and on posters with a QR code."]],
    faq: [
      ["Can people buy tickets on the site?", "Yes, through a payment link or an external ticketing page. Studio doesn’t sell tickets itself."],
      ["Can I reuse the site for next year’s event?", "Yes. Duplicate the site and update the details."],
      ["Is there a countdown timer?", "A countdown section is planned for event templates in the marketplace."],
      ["Can I collect registrations without payment?", "Yes. Link a free form such as Google Forms or Tally."],
    ],
    related: ["website-builder", "free-hosting", "domains"],
  },
  {
    slug: "business-website", group: "By business", title: "Business website", status: "early", type: "business",
    h1: "A professional website for your business.",
    lead: "Tell customers what you do, where you are and how to reach you, with reviews and enquiries that turn visitors into calls. For shops, clinics, studios, contractors and service businesses.",
    cta: ["Build your business site", NEW("business")], visual: () => VIS.shots("kayal-interiors", "brightpath-tutors"),
    features: [
      ["bag", "Services and prices", "Clear service cards with what’s included and starting prices."],
      ["clock", "Hours and location", "Opening hours, address, map link and service areas."],
      ["chat", "Enquiries on WhatsApp", "One-tap WhatsApp, call and email buttons on every page."],
      ["check", "Reviews", "Show what customers say about you."],
      ["globe", "Your own domain", "Look established with yourbusiness.in or .com."],
      ["hand", "Business email", "Need email like hello@yourbusiness.in? Our team can set it up with your site."],
    ],
    designs: "business", designsTitle: "Business designs",
    steps: [["Choose Business website", "Add your business name, what you do and your area."], ["Pick your pages", "Home, services, about, reviews and contact are ready for you."], ["Get found", "Add your link to Google Business Profile, Instagram and WhatsApp."]],
    faq: [
      ["Can I take bookings?", "You can add a WhatsApp or form-based booking button. Calendar booking with payments isn’t part of Studio yet."],
      ["Do you offer business email?", "Yes, through our Business Website + Domain + Mail package. We quote it based on your needs."],
      ["Will my site show on Google?", "Studio sites are light and easy for search engines to read. Adding your site to your Google Business Profile helps most."],
      ["Can you build it for me?", "Yes. See our done-for-you packages, from a one-page site to a full business website."],
    ],
    related: ["agency-website", "domains", "whatsapp-orders"],
  },
  {
    slug: "agency-website", group: "By business", title: "Agency website", status: "early", type: "agency",
    h1: "Show clients work worth hiring.",
    lead: "Case studies, services, process and team on a site that sells your agency before the first call. For design studios, marketing agencies, consultancies and freelancers growing into teams.",
    cta: ["Build your agency site", NEW("agency")], visual: () => VIS.shots("agency-landing", "orbit-studio"),
    features: [
      ["rows", "Case studies", "Tell the story of each project: the challenge, your approach and the results."],
      ["bag", "Services", "Explain what you offer and who it’s for."],
      ["user", "Team", "Introduce the people clients will work with."],
      ["check", "Process", "Show how you work, step by step, so clients know what to expect."],
      ["chat", "Start a project", "A clear enquiry form or WhatsApp button on every page."],
      ["unlock", "Hand it to your developer", "Export clean code your own developers can extend."],
    ],
    designs: "agency", designsTitle: "Agency designs",
    steps: [["Choose Agency website", "Add your agency name and the one line that sums up what you do."], ["Add your best work", "Pick three to six projects that show your range."], ["Win clients", "Share the link in proposals, LinkedIn and pitch emails."]],
    faq: [
      ["Can I add client logos?", "Yes. A client-logo strip is part of agency templates."],
      ["Can my team edit the site?", "Team access is planned for Studio’s Business plan. For now one account owns each site."],
      ["Can I white-label sites for my clients?", "Client handover and white-label export are planned for a future plan. Tell us if you need it."],
      ["Can you build a custom agency site?", "Yes. For custom designs and features, talk to Enitexa.ai, our software partner."],
    ],
    related: ["business-website", "startup-website", "export"],
  },
  {
    slug: "startup-website", group: "By business", title: "Startup website", status: "early", type: "startup",
    h1: "Launch your startup’s website today.",
    lead: "Explain your product, show pricing and collect early sign-ups on a fast landing site. Ship it before your launch post, then grow it as your product grows.",
    cta: ["Build your startup site", NEW("startup")],
    visual: () => firstLook({ name: "Ledgerly", tagline: "Simple GST billing for small shops in Kerala", location: "Kochi", type: "startup", look: "clean", accent: "teal", pages: ["Home", "Product", "Pricing", "About", "Contact"] }, "First look of a startup website"),
    features: [
      ["bolt", "Clear product story", "A focused hero, how it works and the problem you solve."],
      ["bag", "Pricing", "Plans side by side with what each one includes."],
      ["check", "Waitlist sign-ups", "Connect a free form tool to collect early-access emails."],
      ["desktop", "Product screenshots", "Show your app on laptop and phone frames."],
      ["unlock", "Grow with your code", "Export the site and hand it to your developers as you scale."],
      ["cloud", "Free hosting", "Launch on Cloudflare Pages or Netlify without a hosting bill."],
    ],
    steps: [["Choose Startup website", "Add your product name and one line about the problem it solves."], ["Tell the story", "Product, pricing, about and contact pages are ready for you."], ["Launch", "Share the link with your first users and investors."]],
    faq: [
      ["Can I connect analytics?", "Yes. Exported sites can include any analytics snippet you choose, such as Google Analytics or Plausible."],
      ["Can I add a blog later?", "Yes. Add pages any time; blog templates are coming to the marketplace."],
      ["Do I own the code?", "Yes. Export it any time and keep full control."],
      ["Is it good for SEO?", "Static pages are fast and easy to index, which helps. Good content matters most."],
    ],
    related: ["agency-website", "export", "fast-websites"],
  },
  {
    slug: "education-website", group: "By business", title: "Education website", status: "early", type: "education",
    h1: "A website that brings in admissions.",
    lead: "Present your courses, faculty, timetable and results, with a simple way for parents and students to enquire. For tuition centres, coaching institutes, schools and trainers.",
    cta: ["Build your education site", NEW("education")], visual: () => VIS.shots("brightpath-tutors", "brightpath-tutors"),
    features: [
      ["rows", "Courses", "Subjects, batches, duration and fees, easy to compare."],
      ["user", "Faculty", "Introduce your teachers and their experience."],
      ["clock", "Timetable", "Batch timings and areas served, at a glance."],
      ["check", "Results", "Show toppers, results and student feedback."],
      ["chat", "Admissions enquiry", "WhatsApp and call buttons for parents on the go."],
      ["phone", "Parent-friendly", "Big text, clear buttons and fast pages on any phone."],
    ],
    designs: "business", designsTitle: "Related designs",
    steps: [["Choose Education", "Add your institute name, what you teach and your area."], ["Add courses and faculty", "Courses, faculty, admissions and contact pages are ready for you."], ["Open admissions", "Share the link on WhatsApp groups, flyers and Google Maps."]],
    faq: [
      ["Can students pay fees online?", "You can add a payment link (for example Razorpay or UPI). A full fee-management system isn’t part of Studio."],
      ["Can I post notices?", "You can update an announcements section any time once the visual editor launches."],
      ["Can I add an online class link?", "Yes. Add Google Meet, Zoom or YouTube links to any page."],
      ["Do you build sites for schools?", "Yes. Contact us for a done-for-you site or a custom quote."],
    ],
    related: ["business-website", "event-website", "domains"],
  },
  {
    slug: "whatsapp-orders", group: "Grow", title: "Orders on WhatsApp", status: "now",
    h1: "Turn visitors into WhatsApp orders.",
    lead: "Most Kerala customers would rather message than fill a form. Add WhatsApp buttons to your products and services so every order lands straight in your chats, with no app, checkout or commission.",
    cta: ["Start your store", NEW("ecommerce")], visual: () => VIS.shots("shop-window", "chai-clay"),
    features: [
      ["chat", "Order buttons", "A WhatsApp button on every product or service card."],
      ["copy", "Pre-filled messages", "The message already names the product, so customers just tap send."],
      ["phone", "Works on every phone", "Opens the WhatsApp app on phones and WhatsApp Web on computers."],
      ["unlock", "No commission", "Orders come directly to you. Studio takes nothing."],
      ["bag", "Catalogue friendly", "Pairs well with your WhatsApp Business catalogue."],
      ["check", "Add payment links", "Send a Razorpay or UPI link when the customer is ready to pay."],
    ],
    steps: [["Add your number", "Enter your WhatsApp Business number once."], ["Add buttons", "Every product and contact section gets an order or chat button."], ["Reply and sell", "Orders arrive in WhatsApp, where you already talk to customers."]],
    faq: [
      ["Do I need WhatsApp Business?", "No, any WhatsApp number works. WhatsApp Business adds useful extras like quick replies, labels and a catalogue."],
      ["Is this available now?", "Yes. All of our store designs already include WhatsApp order buttons, and our team sets them up in done-for-you packages. Editing them yourself comes with the visual editor."],
      ["Can customers pay through WhatsApp?", "They can pay with a UPI or Razorpay link you send in the chat."],
      ["Will my number be public?", "Yes, it appears in the button link. Use a business number if you’d like to keep your personal one private."],
    ],
    related: ["online-store", "restaurant-website", "business-website"],
  },
  {
    slug: "fast-websites", group: "Grow", title: "Fast and search-friendly", status: "soon", soonNote: "Publishing arrives with code export. Until then, our team can publish a fast site for you.",
    h1: "Fast pages. Found on Google.",
    lead: "Studio sites are plain HTML pages without heavy app code. They load quickly on mobile data, score well on speed tests, and give search engines exactly what they need to understand your business.",
    cta: ["Start building", NEW()], visual: VIS.code,
    features: [
      ["bolt", "Light by default", "No page builders running in the background, just the page your visitor needs."],
      ["globe", "Served worldwide", "Free hosts like Cloudflare Pages serve your site from servers near your visitors."],
      ["check", "Clean structure", "Proper headings, page titles and descriptions that search engines read easily."],
      ["phone", "Mobile first", "Designs are tested on phones, where Google judges your site first."],
      ["desktop", "Readable for everyone", "Good contrast and real text, not text baked into images."],
      ["unlock", "Add your own tools", "Exported code can include analytics or search-console verification you choose."],
    ],
    steps: [["Build it light", "Choose a design and keep images a sensible size."], ["Publish on a fast host", "Cloudflare Pages and Netlify serve sites quickly worldwide."], ["Tell Google", "Add your site to Google Search Console and your Google Business Profile."]],
    faq: [
      ["Will my site rank first on Google?", "No one can promise rankings. Fast, clear pages help; useful content, reviews and a Google Business Profile help most."],
      ["Why are static sites faster?", "There’s no database or server code to run for each visitor, so pages are ready to send immediately."],
      ["Do you add page titles and descriptions?", "Yes. Each page has a title and description you can edit."],
      ["Can I check my speed?", "Yes. Try Google PageSpeed Insights on your published site."],
    ],
    related: ["free-hosting", "export", "domains"],
  },
  {
    slug: "free-hosting", group: "Grow", title: "Free hosting", status: "soon", soonNote: "One-click publishing arrives with code export. The hosting guide below works today for any static site.",
    h1: "Host your website for free.",
    lead: "Because Studio sites are plain web files, you can publish them on trusted free hosts instead of paying a monthly hosting bill. Here’s how each option compares and which one to choose.",
    cta: ["Start building", NEW()], visual: VIS.hosts,
    features: [
      ["cloud", "Cloudflare Pages", "Our default pick: unlimited bandwidth on the free plan, free HTTPS and custom domains. Business sites are allowed."],
      ["globe", "Netlify", "Easy drag-and-drop deploys, built-in contact forms and custom domains. Business sites are allowed on the free plan."],
      ["git", "GitHub Pages", "Free and simple for personal portfolios and résumés. Its terms don’t allow online shops or business sites."],
      ["check", "Free HTTPS", "All three give you a secure padlock automatically."],
      ["globe", "Your own domain", "Connect yourname.in or yourbusiness.com on any of them."],
      ["unlock", "Switch any time", "Your files work on every host, so you can move whenever you like."],
    ],
    guide: {
      title: "Publish on Cloudflare Pages in five minutes",
      steps: [
        "Create a free Cloudflare account at dash.cloudflare.com.",
        "Open Workers & Pages, choose Create, then Pages, then Upload assets.",
        "Name your project (this becomes your-name.pages.dev) and upload your exported site folder.",
        "Click Deploy. Your site is live with HTTPS in about a minute.",
        "Optional: open Custom domains to connect a domain you own.",
      ],
      note: "Steps reflect each host’s free plan at the time of writing. Check the host’s own documentation for the latest details.",
    },
    steps: [["Export your site", "Download the ZIP from Studio."], ["Upload to a free host", "Cloudflare Pages, Netlify or GitHub Pages."], ["Connect your domain", "Optional: point your own domain at it."]],
    faq: [
      ["Is free hosting really free forever?", "These hosts offer generous free plans that cover most small sites. Each host sets its own limits and may change them."],
      ["Which one should I choose?", "Cloudflare Pages for business sites and stores, GitHub Pages for personal portfolios, Netlify if you want built-in forms."],
      ["What if my site gets lots of visitors?", "Cloudflare Pages has unlimited bandwidth on its free plan. Netlify and GitHub Pages have soft monthly limits that small sites rarely reach."],
      ["Can you publish it for me?", "Yes. Our done-for-you packages include hosting set-up."],
    ],
    related: ["export", "domains", "fast-websites"],
  },
  {
    slug: "domains", group: "Grow", title: "Domains", status: "soon",
    h1: "Your own name on the web.",
    lead: "Connect a domain you already own, or get a new one, with every price shown up front: the first-year price, the renewal price and any service fee. No surprises at renewal time.",
    cta: ["Get a domain with our team", "/portfolio/templates/#pricing"], visual: VIS.dns,
    soonNote: "Domain search and buying inside Studio are coming. Today our team registers domains for you in the + Domain packages, in your name.",
    features: [
      ["globe", "Connect your domain", "Step-by-step DNS help for whichever host you choose."],
      ["check", "Clear pricing", "First-year price, renewal price and service fee shown before you pay."],
      ["user", "Registered in your name", "You own the domain, not us."],
      ["unlock", "Free HTTPS", "Secure padlock set up automatically after connecting."],
      ["clock", "Renewal reminders", "Reminders well before your domain expires."],
      ["hand", "We can do it for you", "Our + Domain packages include registration and set-up."],
    ],
    steps: [["Choose a name", "Short, easy to spell and easy to say on the phone."], ["Register or connect it", "Buy a new one or use one you already own."], ["Point it at your site", "Add two DNS records and your site is live on your name."]],
    faq: [
      ["How much does a domain cost?", "It depends on the ending. .in and .com are usually affordable for the first year; renewal prices can be higher, which is why we always show both."],
      ["I already have a domain. Can I use it?", "Yes. You keep it with your current registrar and point it at your site."],
      ["Who owns the domain?", "You do. Domains we register for you are registered in your name."],
      ["Can I get email on my domain?", "Yes, through our Business Website + Domain + Mail package."],
    ],
    related: ["free-hosting", "business-website", "export"],
  },
  {
    slug: "website-types", group: "Product", title: "All website types", status: "early",
    h1: "Twelve kinds of websites. One builder.",
    lead: "Whatever you do, Studio sets up the right pages and suggests the right designs. Pick your type to start, or open its page to learn more.",
    cta: ["Start building", NEW()], visual: () => VIS.shots("chai-clay", "developer-pro"), types: true,
    steps: [["Pick your type", "Choose the closest match. You can change it later."], ["Get the right pages", "Studio suggests the pages that type usually needs."], ["Make it yours", "Change anything, add pages and pick your look."]],
    faq: [
      ["My business isn’t listed. What should I choose?", "Choose Business website. It works for almost any local business or service."],
      ["Can I change my website type later?", "Yes. Your type only decides the starting pages and suggested designs."],
      ["Can one site do more than one thing?", "Yes. Add any pages you need, such as a shop page on a portfolio site."],
      ["Which types have full designs today?", "Portfolios, business sites, stores, blogs and creator pages. More arrive with the template marketplace."],
    ],
    related: ["website-builder", "designs", "online-store"],
  },
];

const BY_SLUG = Object.fromEntries(PAGES.map((p) => [p.slug, p]));
const TYPES = [
  ["portfolio", "Personal portfolio", "Show your work and get hired", "portfolio-website"],
  ["business", "Business website", "Services, hours and enquiries", "business-website"],
  ["agency", "Agency website", "Case studies and a team that sells", "agency-website"],
  ["restaurant", "Restaurant & café", "Menu, location and table bookings", "restaurant-website"],
  ["corporate", "Corporate website", "Company profile, leadership, careers", null],
  ["startup", "Startup website", "Product, pricing and early sign-ups", "startup-website"],
  ["landing", "Landing page", "One page, one clear action", null],
  ["blog", "Blog or news", "Articles, categories and an archive", null],
  ["ecommerce", "Online store", "Products with WhatsApp or payment links", "online-store"],
  ["event", "Event website", "Schedule, speakers and registration", "event-website"],
  ["realestate", "Real estate", "Listings, locations and site visits", null],
  ["education", "Education", "Courses, faculty and admissions", "education-website"],
];

/* ---------- page template ---------- */
function page(p) {
  const [statusLabel, statusKey] = STATUS[p.status];
  const visual = typeof p.visual === "function" ? p.visual() : "";
  const features = (p.features || []).map(([i, t, d]) => `<div class="dp-feat"><span class="dp-feat-ico">${ICO(i)}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("");
  const designs = p.designs
    ? `<section class="dp-section" aria-labelledby="dp-designs"><div class="lx-wrap"><div class="dp-head"><h2 class="lx-h2" id="dp-designs">${esc(p.designsTitle)}</h2><a class="dp-more" href="/studio/templates/">See all designs ${ICO("arrow")}</a></div>
      <div class="lx-show">${DESIGNS[p.designs].map(([s, n, t]) => `<a class="lx-card" href="/studio/templates/${s}/"><span class="lx-card-img"><img src="/assets/portfolio/previews/${s}.webp" width="1200" height="900" alt="${esc(n)} design" loading="lazy"><em>${esc(t)}</em></span><span class="lx-card-body"><span><strong>${esc(n)}</strong><small>Open full preview</small></span><span class="lx-card-go">${ICO("arrow")}</span></span></a>`).join("")}</div></div></section>`
    : "";
  const types = p.types
    ? `<section class="dp-section" aria-labelledby="dp-types"><div class="lx-wrap"><h2 class="lx-h2" id="dp-types" style="margin-bottom:28px">Choose your website type</h2><div class="dp-types">${TYPES.map(
        ([id, t, d, slug]) => `<div class="dp-type"><span class="dp-feat-ico"><svg class="ico" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${TYPE_ICON[id]}</svg></span><div><h3>${t}</h3><p>${d}</p><span class="dp-type-links"><a href="${NEW(id)}">Start</a>${slug ? `<a href="/studio/${slug}/">Learn more</a>` : ""}</span></div></div>`,
      ).join("")}</div></div></section>`
    : "";
  const guide = p.guide
    ? `<section class="dp-section" aria-labelledby="dp-guide"><div class="lx-wrap"><div class="dp-guide"><div><p class="lx-eyebrow">Step-by-step</p><h2 class="lx-h2" id="dp-guide" style="margin-top:12px">${esc(p.guide.title)}</h2><p class="lx-sub">${esc(p.guide.note)}</p></div><ol>${p.guide.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol></div></div></section>`
    : "";
  const soon = p.soonNote ? `<div class="dp-soon" role="note">${ICO("clock")}<p><strong>Coming soon.</strong> ${esc(p.soonNote)}</p></div>` : "";
  const related = p.related.map((s) => BY_SLUG[s]).filter(Boolean)
    .map((r) => `<a class="dp-rel" href="/studio/${r.slug}/"><small>${esc(r.group)}</small><strong>${esc(r.title)}</strong><span>${esc(r.lead.split(". ")[0])}.</span><em>Learn more ${ICO("arrow")}</em></a>`).join("");
  const cta2 = p.cta2 || (p.type ? ["See designs", "/studio/designs/"] : ["How it works", "/studio/#how"]);
  const desc = `${p.title} with Daily Web Studio by InfoparkDaily. ${p.lead.split(". ")[0]}.`;
  const crumbs = [["Studio", "/studio/"], [p.group], [p.title]];
  const body = `
    <section class="dp-hero" aria-labelledby="dp-title">
      <div class="lx-wrap dp-hero-grid">
        <div class="dp-hero-copy">
          ${crumbsHtml(crumbs)}
          <span class="dp-status dp-status--${statusKey}">${statusLabel}</span>
          <h1 id="dp-title">${esc(p.h1)}</h1>
          <p class="lx-sub">${esc(p.lead)}</p>
          <div class="dp-ctas"><a class="lx-go" href="${p.cta[1]}">${esc(p.cta[0])}</a><a class="dp-ghost" href="${cta2[1]}">${esc(cta2[0])} ${ICO("arrow")}</a></div>
          ${soon}
        </div>
        <div class="dp-visual">${visual}</div>
      </div>
    </section>
${features ? `
    <section class="dp-section" aria-labelledby="dp-feat"><div class="lx-wrap"><div class="dp-head"><h2 class="lx-h2" id="dp-feat">What you get</h2></div><div class="dp-feats">${features}</div></div></section>` : ""}
${types}
    <section class="dp-section dp-section--soft" aria-labelledby="dp-how"><div class="lx-wrap"><div class="dp-head"><h2 class="lx-h2" id="dp-how">How it works</h2></div>
      <ol class="dp-steps">${p.steps.map(([t, d], i) => `<li><span>${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join("")}</ol></div></section>
${designs}
${guide}
    <section class="dp-section" aria-labelledby="dp-faq"><div class="lx-wrap lx-faq">
      <div class="lx-faq-aside"><p class="lx-eyebrow">Questions</p><h2 class="lx-h2" id="dp-faq" style="margin-top:12px">${esc(p.title)}: good to know</h2><p class="lx-sub">Something else on your mind? We usually reply within one working day.</p><a class="btn btn--ghost" href="/studio/help/">Visit the help centre</a></div>
      <div class="lx-acc">${p.faq.map(([q, a], i) => `<details${i === 0 ? " open" : ""}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
    </div></section>

    <section class="dp-section" aria-labelledby="dp-rel"><div class="lx-wrap"><div class="dp-head"><h2 class="lx-h2" id="dp-rel">Keep exploring</h2></div><div class="dp-rels">${related}</div></div></section>

    <div class="lx-wrap">
      <section class="lx-cta" aria-labelledby="dp-cta">
        <h2 id="dp-cta">Ready when you are.</h2>
        <p>Start free during early access. No card needed.</p>
        <a class="btn" href="${p.cta[1].startsWith("/studio/app") ? p.cta[1] : NEW()}">Start building${ICO("arrow")}</a>
      </section>
    </div>
`;
  return layout({
    path: `/studio/${p.slug}/`,
    title: `${p.title} · Daily Web Studio`,
    desc,
    crumbs,
    jsonld: [APP, faqLd(p.faq)],
    body,
  });

}

/* Website-type icons (same drawings as js/studio/data.js). */
import { ICONS as TYPE_ICON } from "../js/studio/data.js";

for (const p of PAGES) {
  const dir = join(ROOT, "studio", p.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), page(p));
}
const n = await updateSitemap();
console.log(`Sitemap: ${n} Studio pages`);
console.log(`Wrote ${PAGES.length} Studio detail pages: ${PAGES.map((p) => p.slug).join(", ")}`);
