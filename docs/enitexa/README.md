# Enitexa.ai company page

Implemented at `/software-solutions/` using the existing static HTML/CSS/JavaScript architecture. No new runtime dependencies or routing changes.

## Editing

- `data/enitexa/content.json`: leadership, projects, all 36 services, FAQs, career timeline, and contact identity.
- `data/enitexa/contact-form.html`: enquiry form template.
- `scripts/build-enitexa.py`: static page renderer. Run `python3 scripts/build-enitexa.py`, then `npx prettier --write software-solutions/index.html`.
- `css/software-solutions.css`: responsive editorial layout.
- `js/software-solutions.js`: menu, portfolio filters, service selection, validation, draft handoff, clipboard fallback.

Content is rendered into HTML, so company information, native disclosure controls, and direct contact links remain available without JavaScript.

## Sources and asset provenance (12 September 2026)

Rendered public reference pages were inspected with Chromium, along with their publicly accessible JavaScript content modules:

- https://sarangrajan.in/enitexa.ai/about/
- https://sarangrajan.in/enitexa.ai/work/
- https://sarangrajan.in/enitexa.ai/core-enitexa/
- https://sarangrajan.in/

Leadership portraits were retrieved from `/assets/images/gallery/1.jpg`, `/assets/images/gallery/irs.png`, and `/assets/images/gallery/russ.jpeg` on sarangrajan.in. Names, roles and LinkedIn destinations were matched to its About content. Original photographs are preserved in `assets/enitexa/originals/`; optimized WebP crops are served locally.

Actual browser captures were taken of the local InfoparkDaily homepage, https://kk-travel-company.vercel.app/ and https://sarangrajan.in/expenser. Original PNGs are preserved separately; the page serves WebP copies. Expenser's capture is its product marketing page, not an application screenshot. Other projects use explicitly labelled typographic illustrations. The page's wordmark is a typographic treatment, not a claimed original logo file.

## Evidence limits

- The HOLY BRO destination `https://kksarang.github.io/holybro/` currently serves HTML whose asset paths fail to render the application. Its broken capture and live CTA are omitted.
- No actual in-app screenshots or verified store links were available for Zaffabit, Expenser, Business & Utility Suite, or Sarang Connect Chat.
- Business & Utility Suite ownership/client contribution and Sarang Connect ownership need confirmation. They are explicitly attributed as portfolio entries, not asserted client engagements.
- InfoparkDaily's source-listed React/Tailwind/Vite stack conflicts with this repository. The page shows the inspected HTML/CSS/JavaScript/Firebase stack and explains the difference.
- Career role names and dates follow the owner-supplied published timeline. “Present” is source wording, not an independently confirmed employment status.
- KK Traveler's website renders; payments, real availability, visa workflows and customer account transactions were not submitted or verified.
- ERP renders a sample dashboard with hardcoded figures and incomplete actions: labelled Prototype. SaaS provides a navigable demo gallery: labelled Demo. AI explicitly describes work in progress: labelled In development, with no promise of operational AI.
- Company totals, speed claims, generic testimonials, revenue/download claims, and global-office claims are omitted.

## Enquiry delivery

No configured, verified submission backend exists for this page. The form validates fields and required service selection, prepares a draft addressed to `info.enitexa@gmail.com`, and provides email, WhatsApp, and clipboard handoffs. It explicitly says the enquiry has **not been sent**. Actual sending is completed by the visitor in their selected app. No test message was sent, and no third-party form service was added.

## Validation

Chromium browser checks cover project filtering (3 mobile / 3 web / 1 business), service-to-form selection, all leadership profiles, all 36 service entries, required-service validation, draft recipient and contents, mobile menu and Escape dismissal, direct route refresh, internal anchor targets, reduced motion, image loading, and console errors. Responsive widths checked: 320, 360, 390, 600, 768, 950, 1024, and 1440px. Desktop, mobile, team, featured work, and contact layouts were visually inspected.
