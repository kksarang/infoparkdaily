// Daily Web Studio — Batch 1 pages:
//   /studio/pricing/  /studio/features/  /studio/roadmap/  /studio/changelog/
//   /studio/how-it-works/  /studio/help/  /studio/templates/ (+ one page per design)
//   /studio/security/  and held-back drafts /studio/about/  /studio/refund-policy/ (noindex)
//
//   node scripts/build-studio-hub.mjs
//
// FEATURES below is the single source of truth for what is live: Pricing, Features and the
// Roadmap all read it. Mark anything that isn't usable today as "next" or "later".
import { writeFile, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { ROOT, SITE, esc, ICO, NEW, wa, layout, faqLd, crumbsHtml, APP, ctaBand, faqBlock, updateSitemap } from "./studio/shell.mjs";
import { templates } from "../js/portfolio/catalog.js";
import { SITE_TYPES } from "../js/studio/data.js";

const config = JSON.parse(await readFile(join(ROOT, "data/portfolio/config.json"), "utf8"));
const STATUS = { live: ["Live", "now"], next: ["Next", "early"], later: ["Later", "soon"] };
const badge = (s) => `<span class="st-badge st-badge--${s}">${STATUS[s][0]}</span>`;
const WAITLIST = (plan) => wa(`Hi InfoparkDaily, please add me to the Daily Web Studio ${plan} waitlist.`);

/* ------------------------------------------------------------------ */
/* Features: the single source of truth                                */
/* ------------------------------------------------------------------ */
const FEATURES = [
  // group, title, status, text, link, icon
  ["Build", "Guided setup", "live", "Five short questions set up your site: type, details, look, accent colour and pages.", "/studio/website-builder/", "rows"],
  ["Build", "12 website types", "live", "Portfolio, business, agency, restaurant, corporate, startup, landing page, blog, store, event, real estate and education.", "/studio/website-types/", "bag"],
  ["Build", "First-look homepage preview", "live", "See your homepage on desktop and phone the moment you finish setup.", "/studio/website-builder/", "desktop"],
  ["Build", "Choose your pages", "live", "Suggested pages for your type, plus any custom pages you add (up to 12).", "/studio/website-builder/", "copy"],
  ["Build", "Template marketplace", "next", "Pick a full template for your type and start editing from a finished site.", "/studio/templates/", "rows"],
  ["Build", "Visual editor", "next", "Click to edit text and images, reorder sections, undo and redo, with autosave.", "/studio/visual-editor/", "copy"],
  ["Build", "Section library", "later", "Ready-made sections such as heroes, menus, pricing, galleries, team and FAQs.", "/studio/roadmap/", "plus"],
  ["Design", "54 designs to preview", "live", "Complete, phone-ready designs in the InfoparkDaily collection, each with a live preview.", "/studio/templates/", "desktop"],
  ["Design", "Looks and accent colours", "live", "Four starting looks (Clean, Bold, Warm, Editorial) and six accent colours.", "/studio/website-builder/", "bolt"],
  ["Design", "Fonts, colours and spacing controls", "next", "Theme controls in the visual editor that apply across your whole site.", "/studio/visual-editor/", "bolt"],
  ["Design", "Desktop, tablet and phone editing", "next", "Fine-tune how each section looks on every screen size.", "/studio/visual-editor/", "phone"],
  ["Sell", "WhatsApp order buttons", "live", "Included in our store designs and done-for-you sites today; editable in Studio when the editor launches.", "/studio/whatsapp-orders/", "chat"],
  ["Sell", "Product catalogue", "later", "Products with photos, prices, sizes and categories, managed in Studio.", "/studio/online-store/", "bag"],
  ["Sell", "UPI and Razorpay payment links", "later", "Add payment links to products and services.", "/studio/online-store/", "unlock"],
  ["Grow", "Fast, static pages", "next", "Plain HTML pages that load quickly, ready when code export launches.", "/studio/fast-websites/", "bolt"],
  ["Grow", "SEO settings per page", "later", "Page titles, descriptions, share images and a sitemap.", "/studio/roadmap/", "globe"],
  ["Grow", "Contact and booking forms", "later", "Forms that work on free hosts through services such as Netlify Forms.", "/studio/roadmap/", "chat"],
  ["Grow", "Analytics", "later", "Add Google Analytics or a privacy-friendly alternative to your exported site.", "/studio/roadmap/", "check"],
  ["Own", "Code export (ZIP)", "next", "Download your site as plain HTML, CSS and images. Free, always.", "/studio/export/", "zip"],
  ["Own", "Push to GitHub", "later", "Send your site to a GitHub repository you own.", "/studio/export/", "git"],
  ["Own", "One-click publish", "later", "Publish to Cloudflare Pages or Netlify from Studio.", "/studio/free-hosting/", "cloud"],
  ["Own", "Custom domains", "later", "Connect or buy a domain with prices shown up front. Our team does this for you today.", "/studio/domains/", "globe"],
  ["Account", "Studio account and cloud saving", "live", "Sign in and your sites save to your InfoparkDaily account and open on any device.", "/studio/sign-in/?next=%2Fstudio%2Fapp%2F", "cloud"],
  ["Account", "Google sign-in", "live", "Sign in with Google or email and password.", "/studio/sign-in/?next=%2Fstudio%2Fapp%2F", "user"],
  ["Account", "Move device sites to your account", "live", "Sites made before signing in move to your account in one click.", "/studio/help/#account", "copy"],
  ["Account", "Backup download", "live", "Download all your sites as a JSON backup from Settings.", "/studio/help/#account", "zip"],
  ["Account", "Delete your data", "live", "Delete any site, or your whole account and every Studio site with it.", "/studio/security/", "trash"],
  ["Account", "Malayalam interface", "later", "Use Studio in Malayalam, with Hindi and Tamil to follow.", "/studio/roadmap/", "globe"],
  ["Account", "AI writing help", "later", "Draft and rewrite your site text, and translate it to Malayalam.", "/studio/roadmap/", "bolt"],
  ["Account", "Team and client access", "later", "For agencies building sites for clients: shared access and handover.", "/studio/roadmap/", "user"],
  ["Support", "Done-for-you websites", "live", "Our team builds and launches your site, from ₹1,999.", "/studio/pricing/#done-for-you", "hand"],
  ["Support", "WhatsApp support", "live", "Message us on WhatsApp. We usually reply within one working day.", wa("Hi InfoparkDaily, I have a question about Daily Web Studio."), "chat"],
];
const GROUPS = [
  ["Build", "Build", "Set up your site in minutes."],
  ["Design", "Design", "Make it look like your business."],
  ["Sell", "Sell", "Take orders where your customers already are."],
  ["Grow", "Grow", "Get found and get enquiries."],
  ["Own", "Own", "Your code, your hosting, your domain."],
  ["Account", "Account", "Your sites, safe and private."],
  ["Support", "Support", "Help whenever you want it."],
];

const linkAttr = (href) => (/^https?:/.test(href) ? ` href="${esc(href)}" target="_blank" rel="noopener"` : ` href="${href}"`);
const featCard = ([, title, status, text, link, icon]) =>
  `<a class="ft-card"${linkAttr(link)}><span class="dp-feat-ico">${ICO(icon)}</span><span class="ft-top"><strong>${esc(title)}</strong>${badge(status)}</span><span class="ft-text">${esc(text)}</span></a>`;

/* ------------------------------------------------------------------ */
/* Pages                                                               */
/* ------------------------------------------------------------------ */
const out = [];
const write = async (path, html) => {
  const dir = join(ROOT, path);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), html);
  out.push(path);
};
const hero = (crumbs, eyebrow, h1, lead, ctas = "", extra = "") => `
    <section class="dp-hero hb-hero" aria-labelledby="dp-title">
      <div class="lx-wrap hb-hero-in">
        ${crumbsHtml(crumbs)}
        ${eyebrow ? `<p class="hb-pill">${esc(eyebrow)}</p>` : ""}
        <h1 id="dp-title">${esc(h1)}</h1>
        <p class="lx-sub">${esc(lead)}</p>
        ${ctas}
        ${extra}
      </div>
    </section>`;
const statusKey = `<p class="st-key">${badge("live")} usable today ${badge("next")} being built now ${badge("later")} planned · <a href="/studio/roadmap/">See the roadmap</a></p>`;

/* ---------- Features ---------- */
{
  const crumbs = [["Studio", "/studio/"], ["Features"]];
  const body = `${hero(crumbs, "Features", "Everything Daily Web Studio does, and what’s coming.", "Every feature carries a clear label, so you always know what you can use today and what we’re still building.", `<div class="dp-ctas"><a class="lx-go" href="${NEW()}">Start building</a><a class="dp-ghost" href="/studio/roadmap/">See the roadmap ${ICO("arrow")}</a></div>`)}
    <div class="lx-wrap">${statusKey}</div>
    <nav class="lx-wrap ft-jump" aria-label="Feature groups">${GROUPS.map(([id, n]) => `<a href="#${id.toLowerCase()}">${n}</a>`).join("")}</nav>
${GROUPS.map(
  ([id, name, line]) => `
    <section class="dp-section ft-group" id="${id.toLowerCase()}" aria-labelledby="ft-${id}"><div class="lx-wrap">
      <div class="dp-head"><div><h2 class="lx-h2" id="ft-${id}">${name}</h2><p class="lx-sub" style="margin-top:8px">${line}</p></div></div>
      <div class="ft-grid">${FEATURES.filter((f) => f[0] === id).map(featCard).join("")}</div>
    </div></section>`,
).join("")}
${ctaBand()}`;
  await write("studio/features", layout({ path: "/studio/features/", title: "Features · Daily Web Studio", desc: "All Daily Web Studio features with clear labels: what’s live today, what’s being built now, and what’s planned.", crumbs, jsonld: [APP], body }));
}

/* ---------- Roadmap ---------- */
{
  const crumbs = [["Studio", "/studio/"], ["Roadmap"]];
  const col = (s, title, line) => `<section class="rm-col rm-col--${s}" aria-labelledby="rm-${s}"><div class="rm-head">${badge(s)}<h2 id="rm-${s}">${title}</h2><p>${line}</p></div><ul>${FEATURES.filter((f) => f[2] === s)
    .map(([g, t, , text]) => `<li><small>${g}</small><strong>${esc(t)}</strong><span>${esc(text)}</span></li>`).join("")}</ul></section>`;
  const body = `${hero(crumbs, "Roadmap", "What’s live, what’s next, and what’s later.", "This page is the single source of truth for Daily Web Studio. If a feature isn’t in the Live column, you can’t use it in Studio yet. Dates aren’t promised; order is.", `<div class="dp-ctas"><a class="lx-go"${linkAttr(wa("Hi InfoparkDaily, I’d like to suggest a feature for Daily Web Studio: "))}>Suggest a feature</a><a class="dp-ghost" href="/studio/changelog/">Read the changelog ${ICO("arrow")}</a></div>`)}
    <section class="dp-section" style="padding-top:0"><div class="lx-wrap rm-grid">
      ${col("live", "Live", "Use these today.")}
      ${col("next", "Next", "Being built now.")}
      ${col("later", "Later", "Planned, in rough order.")}
    </div></section>
    <section class="dp-section" style="padding-top:0"><div class="lx-wrap"><div class="dp-guide"><div><p class="lx-eyebrow">Have your say</p><h2 class="lx-h2" style="margin-top:12px">Tell us what to build next.</h2><p class="lx-sub">Early-access users shape the order. Message us on WhatsApp with what you need and why.</p></div>
      <ol><li>Tell us the feature and what you’d use it for.</li><li>We group requests and share progress in the changelog.</li><li>Popular requests move up the roadmap.</li></ol></div></div></section>
${ctaBand()}`;
  await write("studio/roadmap", layout({ path: "/studio/roadmap/", title: "Roadmap · Daily Web Studio", desc: "Daily Web Studio roadmap: features that are live today, what’s being built next, and what’s planned later.", crumbs, body }));
}

/* ---------- Changelog (real releases only) ---------- */
const CHANGELOG = [
  ["2026-11-09", "Pricing, features, roadmap, templates and help centre", ["New pages: Pricing, Features, Roadmap, Changelog, How it works and a Help centre with over 30 answers.", "Template gallery with all 54 designs, filters by website type and style, and a page for every design.", "Security and privacy page explaining what Studio stores and how to delete it."]],
  ["2026-11-09", "Clearer feature status", ["Features that aren’t live yet are now labelled “Coming soon” across the site.", "Saving and account answers updated for account saving."]],
  ["2026-11-09", "17 product and solution pages", ["Every menu item now opens its own page: website builder, designs, visual editor, export, store, portfolio, restaurant, event, business, agency, startup, education, WhatsApp orders, fast websites, free hosting, domains and website types."]],
  ["2026-11-09", "Studio sign-in and account saving", ["New Studio sign-in page with email, Google and password reset.", "Sites save to your InfoparkDaily account and appear on every device where you sign in.", "One-click move of sites made before signing in.", "Deleting your InfoparkDaily account now deletes your Studio sites too."]],
  ["2026-11-09", "Daily Web Studio early access", ["Guided setup for 12 website types with a first-look homepage preview.", "Dashboard to rename, duplicate and delete sites, plus a JSON backup download."]],
];
{
  const crumbs = [["Studio", "/studio/"], ["Changelog"]];
  const body = `${hero(crumbs, "Changelog", "What’s new in Daily Web Studio.", "Every release, newest first. For what’s coming next, see the roadmap.", `<div class="dp-ctas"><a class="dp-ghost" href="/studio/roadmap/">See the roadmap ${ICO("arrow")}</a></div>`)}
    <section class="dp-section" style="padding-top:0"><div class="lx-wrap cl-list">${CHANGELOG.map(
      ([d, t, items]) => `<article class="cl-item"><time datetime="${d}">${new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time><div><h2>${esc(t)}</h2><ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div></article>`,
    ).join("")}</div></section>
${ctaBand()}`;
  await write("studio/changelog", layout({ path: "/studio/changelog/", title: "Changelog · Daily Web Studio", desc: "Release notes for Daily Web Studio, newest first.", crumbs, body }));
}

/* ---------- Pricing ---------- */
{
  const crumbs = [["Studio", "/studio/"], ["Pricing"]];
  const has = (t) => FEATURES.find((f) => f[1] === t);
  const today = ["Guided setup", "12 website types", "First-look homepage preview", "54 designs to preview", "Studio account and cloud saving", "Google sign-in", "WhatsApp support"].map(has);
  const soonFree = ["Template marketplace", "Visual editor", "Code export (ZIP)"].map(has);
  const tick = (t) => `<li>${ICO("check")}<span>${esc(t)}</span></li>`;
  const clock = (t) => `<li class="pc-planned">${ICO("clock")}<span>${esc(t)}</span></li>`;
  const freeCard = `<article class="pv-free">
      <div class="pv-free-top"><span class="pc-flag">Early access</span><h3>Studio Free</h3><p class="pv-price">₹0<small>/ forever on the Free plan</small></p><p class="pv-sub">Everything that’s live today, free. No card needed.</p>
      <a class="pc-btn pc-btn--yellow" href="${NEW()}">Start building free ${ICO("arrow")}</a></div>
      <div class="pv-free-lists"><div><p class="pv-h">Included today</p><ul>${today.map((f) => tick(f[1] === "Studio account and cloud saving" ? "Save up to 50 sites to your account" : f[1])).join("")}</ul></div>
      <div><p class="pv-h">Coming next, also free</p><ul>${soonFree.map((f) => clock(f[1])).join("")}</ul></div></div>
    </article>`;
  const PAID = [
    ["Pro", "For freelancers and small businesses", ["Everything in Free", "Premium templates", "Remove the “Made with Studio” link", "Forms and SEO settings", "Custom domain help", "Priority support"]],
    ["Business", "For shops and growing businesses", ["Everything in Pro", "Product catalogue", "UPI and Razorpay payment links", "Analytics", "Several sites"]],
    ["Agency", "For agencies building for clients", ["Everything in Business", "Many client sites", "Client handover", "White-label export", "Team seats"]],
  ];
  const paid = `<section class="pv-paid" aria-labelledby="pv-paid-h"><div class="pv-paid-head"><div><span class="st-badge st-badge--later">Coming soon</span><h3 id="pv-paid-h">Paid plans</h3><p>Features may change and prices aren’t set yet. Join a waitlist and we’ll message you first.</p></div></div>
      <div class="pv-paid-grid">${PAID.map(([n, who, items]) => `<div class="pv-plan"><h4>${n}</h4><p class="pv-who">${who}</p><ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul><a class="pc-btn"${linkAttr(WAITLIST(n))} aria-label="Join the ${n} waitlist on WhatsApp">Join waitlist</a></div>`).join("")}</div></section>`;
  const money = (p) => (p.price ? `₹${p.price.toLocaleString("en-IN")}` : p.priceLabel);
  const BEST = { website: "Freshers and job seekers", domain: "Professionals who want their own name", shop: "Home bakers, boutiques and makers", pages: "Consultants, agencies and freelancers" };
  const pk = config.packages.filter((p) => p.price);
  const biz = config.packages.find((p) => !p.price);
  const dfyCards = pk.map((p) => `<article class="pv-dfy${p.id === "domain" ? " pv-dfy--pop" : ""}">${p.id === "domain" ? '<span class="pc-flag">Most popular</span>' : ""}<h3>${esc(p.name)}</h3><p class="pv-price pv-price--sm">${money(p)}<small> one-time</small></p><p class="pv-best">Best for: ${esc(BEST[p.id] || "")}</p><ul>${p.features.map(tick).join("")}</ul><a class="pc-btn${p.id === "domain" ? " pc-btn--yellow" : " pc-btn--ink"}"${linkAttr(wa(`Hi InfoparkDaily, I’m interested in the ${p.name} package (${money(p)}).`))}>Order on WhatsApp</a></article>`).join("");
  const bizCard = biz ? `<article class="pv-biz"><div><span class="hb-pill hb-pill--dark">Business</span><h3>${esc(biz.name)}</h3><p>${esc(biz.description)}</p><a class="pc-btn pc-btn--yellow" href="${esc(config.enitexaContact)}">Request a quote ${ICO("arrow")}</a></div><ul>${biz.features.map(tick).join("")}</ul></article>` : "";
  const STEPS = [["Choose a design", "Pick any of our 54 designs."], ["Share your content", "Send your details, photos and links."], ["Review", "See your site and ask for the agreed changes."], ["Launch", "We publish it and hand everything over."]];
  /* Comparison: Free reflects today; paid plans are planned. ✓ = included, P = planned, — = not included */
  const ROWS = [
    ["Building", [["Guided setup for 12 website types", "✓", "P", "P", "P"], ["First-look homepage preview", "✓", "P", "P", "P"], ["Sites per account", "50", "P", "P", "P"], ["Pages per site", "12", "P", "P", "P"], ["Template marketplace", "Next", "P", "P", "P"], ["Premium templates", "—", "P", "P", "P"], ["Visual editor", "Next", "P", "P", "P"], ["Section library", "Later", "P", "P", "P"]]],
    ["Design", [["Looks and accent colours", "✓", "P", "P", "P"], ["Fonts, colours and spacing controls", "Next", "P", "P", "P"], ["Remove “Made with Studio” link", "—", "P", "P", "P"], ["White-label export", "—", "—", "—", "P"]]],
    ["Selling", [["WhatsApp order buttons", "Next", "P", "P", "P"], ["Product catalogue", "—", "—", "P", "P"], ["UPI and Razorpay payment links", "—", "—", "P", "P"]]],
    ["Growth", [["SEO settings per page", "Later", "P", "P", "P"], ["Contact and booking forms", "Later", "P", "P", "P"], ["Analytics", "—", "—", "P", "P"]]],
    ["Ownership and hosting", [["Code export (ZIP)", "Next", "P", "P", "P"], ["Push to GitHub", "Later", "P", "P", "P"], ["One-click publish", "Later", "P", "P", "P"], ["Free hosting on Cloudflare Pages or Netlify", "Next", "P", "P", "P"], ["Custom domain help", "—", "P", "P", "P"], ["HTTPS certificate (through your host)", "Next", "P", "P", "P"]]],
    ["Account and safety", [["Cloud saving to your account", "✓", "P", "P", "P"], ["Google sign-in", "✓", "P", "P", "P"], ["JSON backup download", "✓", "P", "P", "P"], ["Delete account and all sites", "✓", "P", "P", "P"], ["Team seats", "—", "—", "—", "P"], ["Client handover", "—", "—", "—", "P"]]],
    ["Support", [["WhatsApp support", "✓", "P", "P", "P"], ["Priority support", "—", "P", "P", "P"], ["Done-for-you option", "✓ from ₹1,999", "✓", "✓", "✓"]]],
  ];
  const cell = (v) => (v === "✓" ? `<td class="ok">${ICO("check")}<span class="sr">Included</span></td>` : v === "P" ? `<td class="pl">Planned</td>` : v === "—" ? `<td class="no"><span aria-hidden="true">—</span><span class="sr">Not included</span></td>` : /^(Next|Later)$/.test(v) ? `<td>${badge(v.toLowerCase())}</td>` : `<td>${esc(v)}</td>`);
  const table = `<div class="cmp-wrap" tabindex="0" role="region" aria-label="Plan comparison"><table class="cmp"><thead><tr><th scope="col">Feature</th><th scope="col" class="cmp-hl">Free<small>Today</small></th><th scope="col">Pro<small>Planned</small></th><th scope="col">Business<small>Planned</small></th><th scope="col">Agency<small>Planned</small></th></tr></thead>${ROWS.map(
    ([g, rows]) => `<tbody><tr class="cmp-group"><th scope="rowgroup" colspan="5">${g}</th></tr>${rows.map(([n, ...v]) => `<tr><th scope="row">${esc(n)}</th>${v.map(cell).join("")}</tr>`).join("")}</tbody>`,
  ).join("")}</table></div>`;
  const FAQ = [
    ["Is Daily Web Studio really free?", "Yes. Everything in Studio is free during early access, with no card needed. When paid plans launch, the Free plan stays, and exporting your own site will always be free."],
    ["When do Pro, Business and Agency launch?", "After the template marketplace, visual editor and code export. Join a waitlist and we’ll message you first. Their features and prices are still being decided."],
    ["What do done-for-you prices include?", "Each package lists what’s included. Domain eligibility, hosting, renewals, revisions, delivery time, taxes and cancellation terms are confirmed in a written quote before you pay."],
    ["Do prices include GST?", "Any applicable taxes are shown in your written quote before you pay, so the total you agree to is the total you pay."],
    ["Can I get a refund?", "Studio Free has no charges to refund. For done-for-you work, cancellation and refund stages are agreed in writing before payment."],
    ["Do you offer student or non-profit discounts?", "We plan to. Mention it when you join a waitlist or order a done-for-you site, and we’ll tell you what we can offer."],
    ["How do I pay for done-for-you work?", "We confirm the scope and total on WhatsApp or email first, then share payment details. Don’t pay anyone who contacts you without a written quote from InfoparkDaily."],
    ["Will my price go up later?", "Early-access users will be told about any changes in advance. Sites you build stay yours and can be exported."],
  ];
  const switcher = `<div class="pv-switch" role="tablist" aria-label="Pricing options">
      <button type="button" role="tab" id="pv-tab-diy" aria-controls="pv-diy" aria-selected="true" data-pv="diy">Build it yourself<small>Free</small></button>
      <button type="button" role="tab" id="pv-tab-dfy" aria-controls="done-for-you" aria-selected="false" data-pv="done-for-you">We build it for you<small>from ₹1,999</small></button>
    </div>
    <ul class="pv-trust"><li>${ICO("check")}No card needed</li><li>${ICO("check")}You own your website</li><li>${ICO("check")}Written quote before you pay</li><li>${ICO("check")}WhatsApp support</li></ul>`;
  const body = `${hero(crumbs, "Pricing", "Simple pricing. Free to start.", "Build your website yourself for free during early access, or let our team build and launch it for you from ₹1,999.", "", switcher)}
    <section class="pv-panel" id="pv-diy" role="tabpanel" aria-labelledby="pv-tab-diy"><div class="lx-wrap pv-diy">${freeCard}${paid}</div></section>
    <section class="pv-panel" id="done-for-you" role="tabpanel" aria-labelledby="pv-tab-dfy"><div class="lx-wrap">
      <div class="pv-dfy-head"><h2 class="lx-h2">Done for you, from ₹1,999.</h2><p class="lx-sub">Our team personalises one of our designs with your content and launches it. Available today.</p></div>
      <div class="pv-dfy-grid">${dfyCards}</div>
      ${bizCard}
      <ol class="pv-steps">${STEPS.map(([t, d], i) => `<li><span>${i + 1}</span><strong>${t}</strong><small>${d}</small></li>`).join("")}</ol>
      <p class="pc-note">${esc(config.policy)}</p>
    </div></section>
    <section class="dp-section" aria-labelledby="cmp"><div class="lx-wrap"><div class="dp-head pv-center"><div><h2 class="lx-h2" id="cmp">Compare plans</h2><p class="lx-sub" style="margin-top:8px">The Free column shows Studio today. Paid columns show what’s planned.</p></div></div>${table}</div></section>
${faqBlock("pc-faq", "Pricing questions", FAQ)}
${ctaBand()}`;
  await write("studio/pricing", layout({ path: "/studio/pricing/", title: "Pricing · Daily Web Studio", desc: "Daily Web Studio is free during early access. Join the Pro, Business and Agency waitlists, or get a done-for-you website from ₹1,999.", crumbs, jsonld: [APP, faqLd(FAQ)], body, scripts: ["/js/studio/hub.js"] }));
}

/* ---------- How it works ---------- */
{
  const crumbs = [["Studio", "/studio/"], ["How it works"]];
  const STEPS = [
    ["live", "Set up your site", "Answer five short questions: what you’re building, its name and one line about it, a look and accent colour, and the pages you need.", ["Pick from 12 website types", "Add your name, tagline and city", "Choose Clean, Bold, Warm or Editorial", "Keep the suggested pages or add your own", "See a first look of your homepage"]],
    ["next", "Choose a template", "Pick a full template made for your type. Your name, colours and pages carry over.", ["Filter templates by type and style", "Preview each one on desktop and phone", "Switch templates without losing your text"]],
    ["next", "Edit visually", "Click any text to change it, swap photos, reorder sections and set your fonts and colours.", ["Click-to-edit text and images", "Sections list with drag to reorder", "Desktop, tablet and phone views", "Undo, redo and autosave"]],
    ["next", "Export and go live", "Download your site as clean code and publish it free, with your own domain if you like.", ["ZIP download of HTML, CSS and images", "Free hosting guides for Cloudflare Pages, Netlify and GitHub Pages", "Connect your own domain"]],
  ];
  const DFY = [["Choose your design", "Preview complete websites and pick the one that fits."], ["Select your package", "From ₹1,999 for a one-page portfolio to multi-page sites with a domain."], ["Share your content", "Send your details, projects, photos and links."], ["Review and launch", "Review your personalised preview, request the agreed revisions, then go live."]];
  const body = `${hero(crumbs, "How it works", "From idea to website, step by step.", "Here’s the whole journey in Daily Web Studio, with an honest label on each step. Not ready to do it yourself? Our team can build it for you.", `<div class="dp-ctas"><a class="lx-go" href="${NEW()}">Start step 1 now</a><a class="dp-ghost" href="#done-for-you">Or let us build it ${ICO("arrow")}</a></div>`)}
    <section class="dp-section" style="padding-top:0"><div class="lx-wrap hw-list">${STEPS.map(
      ([s, t, d, items], i) => `<article class="hw-step"><div class="hw-num">${i + 1}</div><div class="hw-body"><div class="hw-top"><h2>${esc(t)}</h2>${badge(s)}</div><p>${esc(d)}</p><ul>${items.map((x) => `<li>${ICO("check")}${esc(x)}</li>`).join("")}</ul>${i === 0 ? `<a class="dp-ghost" href="${NEW()}">Try it now ${ICO("arrow")}</a>` : `<a class="dp-ghost" href="/studio/roadmap/">See the roadmap ${ICO("arrow")}</a>`}</div></article>`,
    ).join("")}</div></section>
    <section class="dp-section dp-section--soft" id="done-for-you" aria-labelledby="hw-dfy"><div class="lx-wrap"><div class="dp-head"><div><p class="lx-eyebrow">Done for you</p><h2 class="lx-h2" id="hw-dfy" style="margin-top:12px">Or let our team build it.</h2><p class="lx-sub" style="margin-top:10px">Available today, from ₹1,999.</p></div><a class="dp-more" href="/studio/pricing/#done-for-you">See packages ${ICO("arrow")}</a></div>
      <ol class="dp-steps dp-steps--4">${DFY.map(([t, d], i) => `<li><span>${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join("")}</ol></div></section>
${ctaBand()}`;
  await write("studio/how-it-works", layout({ path: "/studio/how-it-works/", title: "How it works · Daily Web Studio", desc: "How Daily Web Studio works, step by step: set up, choose a template, edit visually and export, with a clear label on what’s live today.", crumbs, jsonld: [{ "@type": "HowTo", name: "Build a website with Daily Web Studio", step: STEPS.map(([, t, d]) => ({ "@type": "HowToStep", name: t, text: d })) }], body }));
}

/* ---------- Help centre ---------- */
const HELP = [
  ["start", "Getting started", [
    ["What is Daily Web Studio?", "A website builder from InfoparkDaily in Kochi. You set up a site by answering a few questions, and soon you’ll edit it visually and export it as clean code you own."],
    ["What can I do in Studio today?", "Set up sites for 12 website types, choose a look, colour and pages, see a first look of your homepage, and save sites to your account. The template marketplace, visual editor and code export are next. See the roadmap for details."],
    ["How much does it cost?", "Nothing during early access. Paid plans come later with a waitlist; done-for-you websites start at ₹1,999."],
    ["Which website type should I choose?", "The closest match to what you do. If you’re not sure, choose Business website. Your type only decides the starting pages and suggested designs, and you can change anything later."],
    ["Do I need to know how to code?", "No. Setup is a few simple questions, and the visual editor will work by clicking and typing."],
  ]],
  ["account", "Account and saving", [
    ["Where are my sites saved?", "Signed in with a verified email, your sites save to your InfoparkDaily account and open on every device where you sign in. Signed out, they’re kept only in this browser."],
    ["What happens if I clear my browser data?", "Sites saved in your account are safe. Sites saved only in the browser (while signed out) are deleted. Sign in and use “Move to my account”, or download a backup from Settings first."],
    ["How do I move sites from this device to my account?", "Sign in and verify your email. Studio shows a banner with a “Move to my account” button for any sites saved on the device."],
    ["Why do I need to verify my email?", "Verification proves the email is yours before we store anything in your account. Google sign-ins are verified automatically."],
    ["How many sites can I have?", "Up to 50 per account during early access."],
    ["Is it the same account as the resume builder?", "Yes. One InfoparkDaily account works for Studio, the resume builder and saved jobs."],
    ["How do I back up my sites?", "Open Settings in Studio and choose “Download backup (JSON)”."],
  ]],
  ["designs", "Designs and templates", [
    ["How many designs are there?", "54 complete designs today, mostly portfolios plus business sites, stores, blogs and creator pages. More types arrive with the template marketplace."],
    ["Can I use a design in Studio now?", "You can preview every design. They become editable Studio templates when the marketplace opens; until then our team can personalise any of them for you."],
    ["Are the people and businesses in the designs real?", "No. All sample names, photos and details are fictional and replaced with yours."],
    ["Which website types have designs today?", "Portfolios, business sites, online stores, blogs and creator pages. Restaurant, event, startup, corporate, real estate and landing page designs are coming."],
  ]],
  ["editing", "Editing", [
    ["When is the visual editor coming?", "It’s being built now, right after the template marketplace. Early-access users get it first."],
    ["Will my current sites work in the editor?", "Yes. Your type, look, colours and pages carry straight into it."],
    ["Can I edit on my phone?", "Quick text and photo edits will work on a phone. Full design work is best on a laptop."],
  ]],
  ["store", "Stores and WhatsApp", [
    ["Can I sell products?", "Yes, simply: products with WhatsApp ordering and payment links work without a server. Full carts with stock tracking aren’t planned for Studio’s first version."],
    ["How do WhatsApp order buttons work?", "Each product gets a button that opens WhatsApp with a message naming the product, so customers just tap send."],
    ["Do you take a commission?", "No. Orders and payments go directly to you."],
    ["Can customers pay online?", "Through payment links such as UPI or Razorpay that you share. Payment links inside Studio are planned."],
  ]],
  ["hosting", "Domains, hosting and export", [
    ["Will I really own my site?", "Yes. When code export launches you’ll download plain HTML, CSS and images with no Studio code inside, and you can keep them forever."],
    ["Where can I host my site for free?", "Cloudflare Pages and Netlify allow business sites on their free plans. GitHub Pages is free for personal portfolios only."],
    ["Can I use my own domain?", "Yes. Connect one you own, or ask our team to register one in your name through a done-for-you package."],
    ["Who owns the domain?", "You do. Domains we register for you are registered in your name."],
    ["Do I get HTTPS?", "Yes. Cloudflare Pages, Netlify and GitHub Pages add a secure certificate automatically."],
  ]],
  ["billing", "Done-for-you and billing", [
    ["What is done-for-you?", "Our team personalises one of our designs with your content and launches it, from ₹1,999."],
    ["How long does a done-for-you site take?", "It depends on the package and how quickly you share your content. We confirm the delivery estimate in your written quote."],
    ["How do revisions work?", "The number of revision rounds is agreed in your written quote before you pay."],
    ["How do I pay safely?", "Only pay after you receive a written quote from InfoparkDaily. We never ask for payment from unknown numbers."],
    ["Can I get a refund?", "Studio Free has no charges to refund. For done-for-you work, cancellation and refund stages are agreed in your written quote before you pay."],
    ["Are taxes included in the price?", "Any applicable taxes are shown in your written quote, so the total you agree to is the total you pay."],
  ]],
  ["privacy", "Privacy and security", [
    ["What does Studio store about me?", "Your account email and name, and for each site the setup answers: name, tagline, city, type, look, colour and pages. See the security page for details."],
    ["Who can see my sites?", "Only you. Firebase security rules let each account read and change only its own sites."],
    ["How do I delete my sites?", "Delete any site from My sites, or all of them from Settings."],
    ["How do I delete my account?", "From your InfoparkDaily account page. Deleting your account also deletes all your Studio sites."],
  ]],
];
{
  const crumbs = [["Studio", "/studio/"], ["Help centre"]];
  const all = HELP.flatMap(([, , qs]) => qs);
  const HELP_ICON = { start: "bolt", account: "user", designs: "desktop", editing: "copy", store: "bag", hosting: "cloud", billing: "hand", privacy: "unlock" };
  const search = `<label class="hc-search hc-search--hero"><span class="sr">Search help</span>${ICO("rows")}<input type="search" id="hc-q" placeholder="Search ${all.length} answers, e.g. domain, refund, WhatsApp" autocomplete="off"></label>`;
  const body = `${hero(crumbs, "Help centre", "How can we help?", `Answers about Daily Web Studio, grouped by topic. Can’t find yours? Message us on WhatsApp.`, "", search)}
    <section class="dp-section" style="padding-top:0"><div class="lx-wrap">
      <div class="hc-topics">${HELP.map(([id, n, qs]) => `<a class="hc-topic" href="#${id}"><span class="dp-feat-ico">${ICO(HELP_ICON[id] || "check")}</span><strong>${n}</strong><small>${qs.length} answers</small></a>`).join("")}</div>
    </div></section>
    <section class="dp-section" style="padding-top:0"><div class="lx-wrap hc-wrap">
      <aside class="hc-side"><nav aria-label="Help topics"><p class="hc-side-h">Topics</p><ul>${HELP.map(([id, n, qs]) => `<li><a href="#${id}">${n}<small>${qs.length}</small></a></li>`).join("")}</ul></nav>
        <div class="hc-askbox"><strong>Still stuck?</strong><p>We usually reply within one working day.</p><a class="hc-ask"${linkAttr(wa("Hi InfoparkDaily, I have a question about Daily Web Studio: "))}>${ICO("chat")}Ask on WhatsApp</a></div></aside>
      <div class="hc-main">${HELP.map(
        ([id, n, qs]) => `<section class="hc-group" id="${id}" aria-labelledby="hc-${id}"><h2 id="hc-${id}">${n}</h2><div class="lx-acc">${qs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div></section>`,
      ).join("")}<p class="hc-empty" id="hc-empty" hidden>No answers match. Try another word, or ask us on WhatsApp.</p></div>
    </div></section>
${ctaBand()}`;
  await write("studio/help", layout({ path: "/studio/help/", title: "Help centre · Daily Web Studio", desc: `Answers to ${all.length} common questions about Daily Web Studio: getting started, saving, designs, stores, domains, hosting, billing and privacy.`, crumbs, jsonld: [faqLd(all)], body, scripts: ["/js/studio/hub.js"] }));
}

/* ---------- Security (complete, public) ---------- */
{
  const crumbs = [["Studio", "/studio/"], ["Security and privacy"]];
  const S = [
    ["What we store", ["Your account: email address, display name, and whether your email is verified.", "Each site you save to your account: its name, tagline, city, website type, look, accent colour and page names, plus created and updated times.", "We don’t store payment details, and Studio doesn’t collect your visitors’ data."]],
    ["Where it’s stored", ["Accounts use Google Firebase Authentication. Sites are stored in Google Cloud Firestore under your account.", "If you stay signed out, sites are stored only in your browser’s local storage and never leave your device."]],
    ["How it’s protected", ["All traffic uses HTTPS.", "Security rules let each account read and change only its own sites; nobody else, including other users, can see them.", "Saving to your account requires a verified email.", "Site previews run in a sandboxed frame that can’t run scripts or reach your account."]],
    ["Your controls", ["Download a backup of all your sites from Settings.", "Delete any site, or all of them, at any time.", "Deleting your InfoparkDaily account deletes your Studio sites too, and your account data export includes them."]],
    ["Reporting a problem", ["If you find a security issue, please tell us privately through our contact page or WhatsApp, and don’t share it publicly until we’ve fixed it."]],
  ];
  const body = `${hero(crumbs, "Security and privacy", "What Studio stores, and how you stay in control.", "Plain answers about your data in Daily Web Studio. For the full legal terms, see the InfoparkDaily privacy policy.", `<div class="dp-ctas"><a class="dp-ghost" href="/privacy/">Privacy policy ${ICO("arrow")}</a></div>`)}
    <section class="dp-section" style="padding-top:0"><div class="lx-wrap sp-grid">${S.map(([t, items]) => `<article class="sp-card"><h2>${esc(t)}</h2><ul>${items.map((i) => `<li>${ICO("check")}<span>${esc(i)}</span></li>`).join("")}</ul></article>`).join("")}</div></section>
${ctaBand()}`;
  await write("studio/security", layout({ path: "/studio/security/", title: "Security and privacy · Daily Web Studio", desc: "What Daily Web Studio stores, where it’s stored, how it’s protected, and how to back up or delete your data.", crumbs, body }));
}

/* ---------- Held-back drafts (noindex, not linked) ---------- */
const TODO = (t) => `<mark class="todo">TODO: ${esc(t)}</mark>`;
{
  const crumbs = [["Studio", "/studio/"], ["About"]];
  const body = `${hero(crumbs, "About", "Made in Kochi for Kerala’s businesses.", "Daily Web Studio is built by InfoparkDaily, the community behind daily Kerala tech jobs, career tools and stories from Infopark, Technopark and Cyberpark.")}
    <section class="dp-section" style="padding-top:0"><div class="lx-wrap sp-grid">
      <article class="sp-card"><h2>Why we built Studio</h2><p>Small businesses told us the same thing: agencies are expensive, and big website builders lock you in. Studio is our answer: a simple builder where the website is yours to keep.</p><p>${TODO("founder story in your own words")}</p></article>
      <article class="sp-card"><h2>The team</h2><p>${TODO("team names, roles and photos")}</p></article>
      <article class="sp-card"><h2>Visit or contact us</h2><p>${TODO("office address in Kochi, phone, email, business hours, GST number if applicable")}</p></article>
      <article class="sp-card"><h2>In numbers</h2><p>${TODO("only real numbers, e.g. community size, sites built")}</p></article>
    </div></section>`;
  await write("studio/about", layout({ path: "/studio/about/", title: "About · Daily Web Studio", desc: "About Daily Web Studio and InfoparkDaily.", crumbs, index: false, body }));
}
{
  const crumbs = [["Studio", "/studio/"], ["Refund and cancellation"]];
  const body = `${hero(crumbs, "Refund and cancellation", "Refunds and cancellations.", "How refunds and cancellations work for Daily Web Studio and done-for-you websites.")}
    <section class="dp-section" style="padding-top:0"><div class="lx-wrap sp-grid">
      <article class="sp-card"><h2>Studio Free</h2><p>Studio is free during early access, so there is nothing to refund.</p></article>
      <article class="sp-card"><h2>Done-for-you websites</h2><p>${esc(config.policy)}</p><p>${TODO("cancellation stages and refund amounts (e.g. before design starts / after first draft / after launch)")}</p></article>
      <article class="sp-card"><h2>Domains</h2><p>${esc(config.domainPolicy)}</p><p>${TODO("whether registered domains are refundable")}</p></article>
      <article class="sp-card"><h2>How to request a refund</h2><p>${TODO("contact method and response time")}</p></article>
    </div></section>`;
  await write("studio/refund-policy", layout({ path: "/studio/refund-policy/", title: "Refund and cancellation · Daily Web Studio", desc: "Refund and cancellation terms for Daily Web Studio.", crumbs, index: false, body }));
}

/* ---------- Templates gallery + one page per design ---------- */
const TYPE_OF = (t) => {
  if (t.slug === "brightpath-tutors") return "education";
  if (t.slug === "agency-landing") return "agency";
  if (t.slug === "shop-window") return "ecommerce";
  return { "Online stores": "ecommerce", Business: "business", Bloggers: "blog", Storytellers: "blog" }[t.category] || "portfolio";
};
const typeLabel = (id) => SITE_TYPES.find((x) => x.id === id)?.label || id;
const TYPE_PAGE = { ecommerce: "online-store", portfolio: "portfolio-website", business: "business-website", agency: "agency-website", education: "education-website" };
{
  const crumbs = [["Studio", "/studio/"], ["Templates"]];
  const counts = Object.fromEntries(SITE_TYPES.map((t) => [t.id, templates.filter((x) => TYPE_OF(x) === t.id).length]));
  const styles = [...new Set(templates.flatMap((t) => t.styleTags))].sort();
  const cards = templates
    .map((t) => {
      const type = TYPE_OF(t);
      return `<a class="tg-card" href="/studio/templates/${t.slug}/" data-type="${type}" data-styles="${t.styleTags.join(" ").toLowerCase()}" data-q="${esc([t.name, t.profession, t.category, typeLabel(type), ...t.styleTags].join(" ").toLowerCase())}"><span class="lx-card-img"><img src="${t.thumbnail}" width="1200" height="900" alt="${esc(t.name)} design" loading="lazy"><em>${esc(typeLabel(type))}</em></span><span class="lx-card-body"><span><strong>${esc(t.name)}</strong><small>${esc(t.profession)}</small></span><span class="lx-card-go">${ICO("arrow")}</span></span></a>`;
    })
    .join("");
  const body = `${hero(crumbs, "Templates", `${templates.length} designs, made for your kind of work.`, "Complete, phone-ready designs from the InfoparkDaily collection. Preview any of them now. They become editable Studio templates when the template marketplace opens, and our team can personalise any of them for you today.")}
    <section class="dp-section" style="padding-top:0"><div class="lx-wrap">
      <div class="tg-bar">
        <label class="hc-search tg-search"><span class="sr">Search designs</span>${ICO("rows")}<input type="search" id="tg-q" placeholder="Search, e.g. bakery, developer" autocomplete="off"></label>
        <div class="tg-chips" role="group" aria-label="Website type"><button type="button" data-type="all" aria-pressed="true">All <span>${templates.length}</span></button>${SITE_TYPES.filter((t) => counts[t.id]).map((t) => `<button type="button" data-type="${t.id}" aria-pressed="false">${esc(t.label)} <span>${counts[t.id]}</span></button>`).join("")}</div>
        <div class="tg-chips tg-chips--style" role="group" aria-label="Style">${styles.map((s) => `<button type="button" data-style="${s.toLowerCase()}" aria-pressed="false">${esc(s)}</button>`).join("")}</div>
      </div>
      <p class="tg-count" id="tg-count" role="status">${templates.length} designs</p>
      <div class="lx-show tg-grid" id="tg-grid">${cards}</div>
      <p class="hc-empty" id="tg-empty" hidden>No designs match. Try another word or filter.</p>
      <div class="tg-gap"><h2>Designs for these types are coming</h2><p>${SITE_TYPES.filter((t) => !counts[t.id]).map((t) => esc(t.label)).join(", ")}. You can still set up these sites today and see a first look.</p><a class="dp-ghost" href="${NEW()}">Set up a site ${ICO("arrow")}</a></div>
    </div></section>
${ctaBand("Found one you like?", "Set up your site now, or let our team build it with your chosen design, from ₹1,999.")}`;
  await write("studio/templates", layout({ path: "/studio/templates/", title: "Website templates · Daily Web Studio", desc: `${templates.length} complete, phone-ready website designs for portfolios, businesses, stores, blogs and creators. Preview free.`, crumbs, jsonld: [{ "@type": "CollectionPage", name: "Daily Web Studio templates", hasPart: templates.map((t) => ({ "@type": "CreativeWork", name: t.name, url: `${SITE}/studio/templates/${t.slug}/` })) }], body, scripts: ["/js/studio/hub.js"] }));

  for (const t of templates) {
    const type = TYPE_OF(t);
    const tc = [["Studio", "/studio/"], ["Templates", "/studio/templates/"], [t.name]];
    const similar = templates.filter((x) => x.slug !== t.slug && TYPE_OF(x) === type).slice(0, 3);
    const body = `
    <section class="dp-hero td-hero" aria-labelledby="dp-title"><div class="lx-wrap">
      ${crumbsHtml(tc)}
      <div class="td-head"><div><span class="dp-status dp-status--early">Preview now · editable in Studio soon</span><h1 id="dp-title">${esc(t.name)}</h1><p class="lx-sub">${esc(t.description)} Made for: ${esc(t.profession)}.</p></div>
        <div class="dp-ctas"><a class="lx-go" href="/portfolio/templates/${t.slug}/">Get it built from ₹1,999</a><a class="dp-ghost" href="${NEW(type)}">Start ${/^[aeiou]/i.test(typeLabel(type)) ? "an" : "a"} ${esc(typeLabel(type).toLowerCase())} ${ICO("arrow")}</a></div></div>
      <div class="td-stage">
        <div class="td-bar"><span class="dots"><i></i><i></i><i></i></span><div class="seg td-seg" role="group" aria-label="Preview size"><button type="button" data-size="desktop" aria-pressed="true">Desktop</button><button type="button" data-size="tablet" aria-pressed="false">Tablet</button><button type="button" data-size="phone" aria-pressed="false">Phone</button></div><a class="td-open" href="${t.previewPath}" target="_blank" rel="noopener">Open full preview ${ICO("arrow")}</a></div>
        <div class="td-frame-wrap" id="td-wrap"><iframe class="td-frame" id="td-frame" title="Live preview of ${esc(t.name)}" src="/portfolio/demo/${t.slug}/" loading="lazy"></iframe></div>
      </div>
    </div></section>
    <section class="dp-section" style="padding-top:0"><div class="lx-wrap td-info">
      <article class="sp-card"><h2>Sections included</h2><ul class="td-tags">${t.supportedSections.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></article>
      <article class="sp-card"><h2>Details</h2><dl class="td-dl"><div><dt>Website type</dt><dd><a href="${TYPE_PAGE[type] ? `/studio/${TYPE_PAGE[type]}/` : "/studio/website-types/"}">${esc(typeLabel(type))}</a></dd></div><div><dt>Category</dt><dd>${esc(t.category)}</dd></div><div><dt>Style</dt><dd>${t.styleTags.map(esc).join(", ")}</dd></div><div><dt>Responsive</dt><dd>Desktop, tablet and phone</dd></div></dl></article>
      <article class="sp-card"><h2>How to use it</h2><ul><li>${ICO("check")}<span>Today: our team personalises it with your content, from ₹1,999.</span></li><li>${ICO("clock")}<span>Soon: pick it in the Studio template marketplace and edit it yourself.</span></li><li>${ICO("check")}<span>All sample names and content are fictional.</span></li></ul></article>
    </div></section>
${similar.length ? `    <section class="dp-section" style="padding-top:0"><div class="lx-wrap"><div class="dp-head"><h2 class="lx-h2">Similar designs</h2><a class="dp-more" href="/studio/templates/">All templates ${ICO("arrow")}</a></div><div class="lx-show">${similar.map((x) => `<a class="lx-card" href="/studio/templates/${x.slug}/"><span class="lx-card-img"><img src="${x.thumbnail}" width="1200" height="900" alt="${esc(x.name)} design" loading="lazy"><em>${esc(x.category)}</em></span><span class="lx-card-body"><span><strong>${esc(x.name)}</strong><small>${esc(x.profession)}</small></span><span class="lx-card-go">${ICO("arrow")}</span></span></a>`).join("")}</div></div></section>` : ""}
${ctaBand()}`;
    /* The design already has an indexed page under /portfolio/templates/; point search engines there. */
    const html = layout({ path: `/studio/templates/${t.slug}/`, title: `${t.name} template · Daily Web Studio`, desc: `${t.description} Preview the ${t.name} website design for ${t.profession.toLowerCase()}s.`, crumbs: tc, body, scripts: ["/js/studio/hub.js"] })
      .replace(`<link rel="canonical" href="${SITE}/studio/templates/${t.slug}/">`, `<link rel="canonical" href="${SITE}/portfolio/templates/${t.slug}/">`);
    await write(`studio/templates/${t.slug}`, html);
  }
}

const n = await updateSitemap();
console.log(`Wrote ${out.length} pages (${templates.length} design pages). Sitemap: ${n} Studio pages.`);
