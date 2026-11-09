/* Daily Web Studio — the app at /studio/app/.
 *
 * Hash routes (work on static hosting with no server rewrites):
 *   #/              Home (dashboard)
 *   #/new           Create-a-site wizard   (#/new?type=restaurant starts on a type)
 *   #/sites         My sites
 *   #/site/<id>     One site: first-look preview and next steps
 *   #/templates, #/publish, #/domains, #/billing   Honest "coming next" pages
 *   #/settings      Account, storage and data
 *
 * Sites save to the InfoparkDaily account when signed in with a verified email, otherwise on this
 * device (see store.js and cloud.js). Sign-in uses the Studio page at /studio/sign-in/ with the same
 * InfoparkDaily account as the rest of the site. An account is optional.
 */
import { icon, SITE_TYPES, typeById, LOOKS, lookById, ACCENTS } from "./data.js";
import * as store from "./store.js?v=20261109ss";
import { previewHtml, esc } from "./preview.js";

const $ = (s, r = document) => r.querySelector(s);
const view = $("#view");
const SIGN_IN = "/studio/sign-in/?next=%2Fstudio%2Fapp%2F";

export const LOGO =
  '<svg class="dws-mark" viewBox="0 0 32 32" width="32" height="32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#ffc107"/><rect x="7" y="8" width="18" height="16" rx="3" fill="#fff" stroke="#14151a" stroke-width="2"/><path d="M7.5 13h17" stroke="#14151a" stroke-width="2"/><rect x="10" y="16" width="5.5" height="5" rx="1.2" fill="#ff5b3a"/><rect x="17.5" y="16" width="4.5" height="1.8" rx=".9" fill="#14151a"/><rect x="17.5" y="19.2" width="3.2" height="1.8" rx=".9" fill="#14151a" opacity=".55"/></svg>';

/* ---------- small helpers ---------- */
const ago = (t) => {
  const s = Math.max(1, Math.round((Date.now() - t) / 1000));
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hr ago`;
  const d = Math.round(h / 24);
  if (d < 30) return `${d} day${d === 1 ? "" : "s"} ago`;
  return new Date(t).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};
const accentOf = (p) => (ACCENTS.find((a) => a.id === p.accent) || ACCENTS[0]).value;

let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-on"), 3200);
}

function setTitle(t) {
  document.title = t ? `${t} · Daily Web Studio` : "Daily Web Studio";
}

/* ---------- account ----------
   Signed in with a verified email → sites live in the account (Firestore).
   Signed out, or email not verified yet → sites stay on this device. */
let me = null;
let cloud = null;
let accountState = "checking"; // checking | out | unverified | in | unavailable
const SYNC_TEXT = { loading: "Loading your sites…", saving: "Saving…", saved: "Saved to your account", error: "Not saved", offline: "Offline · will save later", idle: "" };

async function loadAccount() {
  try {
    cloud = await import("/js/studio/cloud.bundle.js?v=20261109ss");
    await cloud.authReady;
  } catch {
    accountState = "unavailable";
    paintAccount();
    return;
  }
  cloud.onUser(async (user) => {
    me = user;
    if (user && (user.verified || !user.password)) {
      accountState = "in";
      paintAccount();
      await store.useAccount(cloud, user.uid);
    } else {
      accountState = user ? "unverified" : "out";
      store.useDevice();
    }
    paintAccount();
    rerender();
  });
}

function paintAccount() {
  const box = $("#account");
  if (!box) return;
  if (me) {
    const name = esc(me.name || me.email || "Your account");
    const sync = store.getSync();
    const pill =
      accountState === "in"
        ? `<span class="sync-pill" data-state="${sync.state}" role="status">${SYNC_TEXT[sync.state] || ""}</span>`
        : `<span class="sync-pill" data-state="offline">Email not verified · saving on this device</span>`;
    box.innerHTML = `<a class="acct" href="#/settings"><span class="acct-avatar" aria-hidden="true">${esc((me.name || me.email || "?").trim()[0] || "?").toUpperCase()}</span><span class="acct-text"><strong>${name}</strong><small>${esc(me.email)}</small></span></a>${pill}`;
  } else {
    const sub = accountState === "checking" ? "Checking…" : accountState === "unavailable" ? "Unavailable offline" : "Save sites to your account";
    box.innerHTML = `<a class="acct acct--out" href="${SIGN_IN}">${icon("user", 18)}<span class="acct-text"><strong>Sign in</strong><small>${sub}</small></span></a>`;
  }
}

/** Account notices shown at the top of Home, My sites and Settings. */
function accountBanners() {
  let html = "";
  if (accountState === "unverified")
    html += `<div class="banner banner--warn" role="status">${icon("lock", 20)}<p><strong>Verify your email to save sites to your account.</strong> We sent a link to ${esc(me?.email)}. Until then, sites save on this device.</p><div class="row"><button type="button" class="btn btn--ghost" data-act="resend">Resend email</button><button type="button" class="btn" data-act="verified">I’ve verified</button></div></div>`;
  const local = accountState === "in" ? store.deviceProjects().length : 0;
  if (local)
    html += `<div class="banner" role="status">${icon("device", 20)}<p><strong>${local} site${local === 1 ? " is" : "s are"} saved only on this device.</strong> Move ${local === 1 ? "it" : "them"} to your account to open ${local === 1 ? "it" : "them"} anywhere.</p><div class="row"><button type="button" class="btn" data-act="move">Move to my account</button></div></div>`;
  const sync = store.getSync();
  if (accountState === "in" && sync.state === "error")
    html += `<div class="banner banner--error" role="alert">${icon("lock", 20)}<p><strong>Your last change wasn’t saved.</strong> ${esc(sync.message)}</p><div class="row"><button type="button" class="btn btn--ghost" data-act="retry">Reload</button></div></div>`;
  return html;
}

/** Re-render the current page after data changes, without stealing focus from a field. */
function rerender() {
  if (location.hash.startsWith("#/new")) return;
  const a = document.activeElement;
  if (a && view.contains(a) && /INPUT|TEXTAREA|SELECT/.test(a.tagName)) return;
  if ($("#dlg")?.open) return;
  route(false);
}

/* ---------- shell ---------- */
const NAV = [
  ["#/", "Home", "home"],
  ["#/sites", "My sites", "sites"],
  ["#/templates", "Templates", "templates", "Soon"],
  ["#/publish", "Export & publish", "publish", "Soon"],
  ["#/domains", "Domains", "globe", "Soon"],
  ["#/billing", "Plans & billing", "card", "Soon"],
];

function shell() {
  $("#side").innerHTML = `
    <a class="side-brand" href="/studio/" aria-label="Daily Web Studio home">${LOGO}<span><strong>Daily Web Studio</strong><small>by InfoparkDaily</small></span></a>
    <a class="side-new" href="#/new">${icon("plus", 18)}<span>Create a site</span></a>
    <nav class="side-nav" aria-label="Studio">${NAV.map(([h, l, i, tag]) => `<a href="${h}" data-nav="${h}">${icon(i, 19)}<span>${l}</span>${tag ? `<em>${tag}</em>` : ""}</a>`).join("")}</nav>
    <div class="side-foot">
      <a href="#/settings" data-nav="#/settings">${icon("settings", 19)}<span>Settings</span></a>
      <a href="/studio/help/" target="_blank" rel="noopener">${icon("spark", 19)}<span>Help &amp; FAQ</span><em class="side-ext" aria-hidden="true">↗</em><span class="sr"> (opens in a new tab)</span></a>
      <div id="account"></div>
    </div>`;
  paintAccount();
}

function markNav(route) {
  const key = route === "site" ? "#/sites" : route ? `#/${route}` : "#/";
  document.querySelectorAll("[data-nav]").forEach((a) => {
    if (a.dataset.nav === key) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

function closeSide() {
  document.body.classList.remove("side-open");
  $("#menu-btn")?.setAttribute("aria-expanded", "false");
}

/* ---------- pages ---------- */
function siteCard(p) {
  const t = typeById(p.type);
  return `<article class="site-card">
    <a class="site-thumb" href="#/site/${p.id}" style="--a:${accentOf(p)}" aria-label="Open ${esc(p.name)}" data-look="${p.look}">
      <span class="st-bar"><i></i><i></i><i></i></span><span class="st-h"></span><span class="st-l"></span><span class="st-row"><b></b><b></b><b></b></span>
    </a>
    <div class="site-meta">
      <div><h3><a href="#/site/${p.id}">${esc(p.name)}</a></h3><p>${esc(t?.label || "Website")} · edited ${ago(p.updatedAt)}</p></div>
      <div class="site-actions">
        <button type="button" class="icon-btn" data-act="rename" data-id="${p.id}" aria-label="Rename ${esc(p.name)}" title="Rename">${icon("edit", 17)}</button>
        <button type="button" class="icon-btn" data-act="duplicate" data-id="${p.id}" aria-label="Duplicate ${esc(p.name)}" title="Duplicate">${icon("copy", 17)}</button>
        <button type="button" class="icon-btn" data-act="delete" data-id="${p.id}" aria-label="Delete ${esc(p.name)}" title="Delete">${icon("trash", 17)}</button>
      </div>
    </div>
  </article>`;
}

function storageWarning() {
  if (store.getMode() === "account") return accountBanners();
  return accountBanners() + (store.storageAvailable()
    ? ""
    : `<div class="notice notice--warn" role="alert">${icon("lock", 18)}<p><strong>Saving is blocked in this browser.</strong> Private browsing or blocked site data stops Studio from keeping your sites. Allow site storage to continue.</p></div>`);
}

function pageHome() {
  setTitle("Home");
  const sites = store.listProjects();
  const first = me?.name ? esc(me.name.split(" ")[0]) : "";
  const hasSite = sites.length > 0;
  const steps = [
    ["Create your first site", "Answer a few questions to set it up.", hasSite, "#/new"],
    ["Pick a template", "Choose a full design for your site type.", false, "#/templates"],
    ["Edit in the visual editor", "Change text, images, colours and sections.", false, null],
    ["Export your code", "Download clean HTML and host it free.", false, null],
  ];
  view.innerHTML = `
    ${storageWarning()}
    <header class="page-head">
      <div><p class="eyebrow">Daily Web Studio · Early access</p><h1>${first ? `Welcome back, ${first}.` : "Let’s build your website."}</h1><p class="lead">Set up a site in a couple of minutes. The template marketplace and visual editor are on the way, and every site you start now carries over.</p></div>
    </header>
    <section class="home-grid">
      <a class="start-card" href="#/new">
        <span class="start-icon">${icon("plus", 26)}</span>
        <span><strong>Create a new site</strong><small>Portfolio, business, restaurant, store and 8 more types</small></span>
        <span class="start-go">${icon("arrow", 20)}</span>
      </a>
      <section class="panel checklist" aria-labelledby="gs">
        <h2 id="gs">Getting started</h2>
        <ol>${steps
          .map(([t, d, done, href], i) => {
            const soon = !done && !href ? '<em class="tag">Soon</em>' : "";
            const inner = `<span class="ck ${done ? "is-done" : ""}">${done ? icon("check", 14) : i + 1}</span><span><strong>${t}</strong><small>${d}</small></span>${soon}`;
            return `<li>${href && !done ? `<a href="${href}">${inner}</a>` : `<div>${inner}</div>`}</li>`;
          })
          .join("")}</ol>
      </section>
    </section>
    <section class="block">
      <div class="block-head"><h2>Recent sites</h2>${hasSite ? '<a class="link" href="#/sites">See all</a>' : ""}</div>
      ${hasSite ? `<div class="site-grid">${sites.slice(0, 3).map(siteCard).join("")}</div>` : loadingSites() ? `<div class="empty">${icon("sites", 28)}<p><strong>Loading your sites…</strong></p></div>` : `<div class="empty">${icon("sites", 28)}<p><strong>No sites yet.</strong> Your sites will appear here.</p><a class="btn" href="#/new">Create a site</a></div>`}
    </section>
    <section class="block">
      <div class="block-head"><h2>Start from a type</h2></div>
      <div class="type-strip">${SITE_TYPES.slice(0, 6).map((t) => `<a href="#/new?type=${t.id}" class="type-chip">${icon(t.id, 18)}<span>${t.label}</span></a>`).join("")}<a href="#/new" class="type-chip type-chip--more"><span>All 12 types</span>${icon("arrow", 16)}</a></div>
    </section>
    ${
      store.getMode() === "account"
        ? `<aside class="notice">${icon("check", 18)}<p>Your sites are saved <strong>to your InfoparkDaily account</strong> and open on any device where you sign in.</p></aside>`
        : `<aside class="notice">${icon("device", 18)}<p>Sites are saved <strong>in this browser on this device</strong>. <a href="${SIGN_IN}">Sign in</a> to save them to your account and open them anywhere.</p></aside>`
    }`;
}

/** True while the account's sites are still on their way (avoid flashing "No sites yet"). */
const loadingSites = () => accountState === "checking" || store.getSync().state === "loading";

function pageSites() {
  setTitle("My sites");
  const sites = store.listProjects();
  view.innerHTML = `
    ${storageWarning()}
    <header class="page-head page-head--row"><div><h1>My sites</h1><p class="lead">${sites.length ? `${sites.length} site${sites.length === 1 ? "" : "s"} ${store.getMode() === "account" ? "in your account" : "on this device"}` : "Sites you create appear here."}</p></div><a class="btn" href="#/new">${icon("plus", 18)}Create a site</a></header>
    ${
      sites.length
        ? `<label class="search">${icon("templates", 18)}<span class="sr">Search your sites</span><input id="site-q" type="search" placeholder="Search by name or type" autocomplete="off"></label>
           <div class="site-grid" id="site-list">${sites.map(siteCard).join("")}</div><p class="empty-inline" id="no-match" hidden>No sites match that search.</p>`
        : loadingSites()
        ? `<div class="empty">${icon("sites", 28)}<p><strong>Loading your sites…</strong></p></div>`
        : `<div class="empty">${icon("sites", 28)}<p><strong>No sites yet.</strong> Answer a few questions and your first site is ready to shape.</p><a class="btn" href="#/new">Create a site</a></div>`
    }`;
  const q = $("#site-q");
  q?.addEventListener("input", () => {
    const v = q.value.trim().toLowerCase();
    let shown = 0;
    document.querySelectorAll("#site-list .site-card").forEach((card) => {
      const hit = !v || card.textContent.toLowerCase().includes(v);
      card.hidden = !hit;
      shown += hit;
    });
    $("#no-match").hidden = shown > 0;
  });
}

function pageSite(id) {
  const p = store.getProject(id);
  if (!p && (accountState === "checking" || store.getSync().state === "loading")) {
    setTitle("Loading");
    view.innerHTML = `<div class="empty empty--big">${icon("sites", 30)}<h1>Opening your site…</h1><p>Loading your sites.</p></div>`;
    return;
  }
  if (!p)
    return store.getMode() === "account"
      ? pageMissing("That site isn’t in your account", "It may have been deleted, or it belongs to a different account.")
      : pageMissing("That site isn’t on this device", "It may have been deleted, or it was saved to an account. Sign in to see account sites.");
  setTitle(p.name);
  const t = typeById(p.type);
  const look = lookById(p.look);
  view.innerHTML = `
    <a class="crumb" href="#/sites">${icon("back", 16)}My sites</a>
    <header class="page-head page-head--row">
      <div><p class="eyebrow">${esc(t.label)}</p><h1>${esc(p.name)}</h1><p class="lead">${esc(p.tagline || t.short)}</p></div>
      <div class="head-actions">
        <button type="button" class="btn btn--ghost" data-act="rename" data-id="${p.id}">${icon("edit", 17)}Rename</button>
        <button type="button" class="btn" disabled title="The visual editor arrives in Phase 3">${icon("edit", 17)}Open editor<em class="tag tag--on">Soon</em></button>
      </div>
    </header>
    <section class="site-layout">
      <div class="preview">
        <div class="preview-bar">
          <span class="dots"><i></i><i></i><i></i></span>
          <span class="url">${esc(p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "your-site")}.pages.dev</span>
          <div class="seg" role="group" aria-label="Preview size">
            <button type="button" data-size="desktop" aria-pressed="true">${icon("device", 16)}<span class="sr">Desktop</span></button>
            <button type="button" data-size="mobile" aria-pressed="false"><svg class="ico" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 17.5h2"/></svg><span class="sr">Mobile</span></button>
          </div>
        </div>
        <div class="preview-stage"><iframe id="pv" title="First look at ${esc(p.name)}" sandbox="" referrerpolicy="no-referrer" loading="lazy"></iframe></div>
        <p class="preview-note">This is a first look built from your answers. You’ll choose a full template next.</p>
      </div>
      <aside class="site-side">
        <section class="panel">
          <h2>Your choices</h2>
          <dl class="facts">
            <div><dt>Type</dt><dd>${esc(t.label)}</dd></div>
            <div><dt>Look</dt><dd>${esc(look.label)}</dd></div>
            <div><dt>Accent</dt><dd><span class="sw" style="--a:${accentOf(p)}"></span>${esc((ACCENTS.find((a) => a.id === p.accent) || ACCENTS[0]).label)}</dd></div>
            ${p.location ? `<div><dt>Location</dt><dd>${esc(p.location)}</dd></div>` : ""}
            <div><dt>Pages</dt><dd>${p.pages.map(esc).join(", ")}</dd></div>
            <div><dt>Created</dt><dd>${ago(p.createdAt)}</dd></div>
          </dl>
        </section>
        <section class="panel">
          <h2>What happens next</h2>
          <ol class="next">
            <li class="is-done"><span class="ck is-done">${icon("check", 14)}</span><span><strong>Site set up</strong><small>Your answers are saved.</small></span></li>
            <li><span class="ck">2</span><span><strong>Choose a template</strong><small>Full designs made for ${esc(t.label.toLowerCase())}s.</small></span><em class="tag">Soon</em></li>
            <li><span class="ck">3</span><span><strong>Edit visually</strong><small>Drag sections, change text and images.</small></span><em class="tag">Soon</em></li>
            <li><span class="ck">4</span><span><strong>Export &amp; publish</strong><small>Download the code or publish free.</small></span><em class="tag">Soon</em></li>
          </ol>
        </section>
        <section class="panel panel--accent">
          <h2>Need it sooner?</h2>
          <p>Our team can build and launch your site for you, from ₹1,999.</p>
          <a class="btn btn--ghost" href="/portfolio/templates/#pricing">See done-for-you packages ${icon("arrow", 16)}</a>
        </section>
        <button type="button" class="danger-link" data-act="delete" data-id="${p.id}">${icon("trash", 16)}Delete this site</button>
      </aside>
    </section>`;
  const frame = $("#pv");
  frame.srcdoc = previewHtml(p);
  view.querySelectorAll("[data-size]").forEach((b) =>
    b.addEventListener("click", () => {
      view.querySelectorAll("[data-size]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      $(".preview-stage").classList.toggle("is-mobile", b.dataset.size === "mobile");
    }),
  );
}

const SOON = {
  templates: ["Template marketplace", "templates", "Full, professionally designed templates for all 12 site types, with live desktop, tablet and phone previews, search and filters.", "Phase 2"],
  publish: ["Export & publish", "publish", "Download your site as clean HTML and CSS in a ZIP, push it to GitHub, or publish free on Cloudflare Pages or Netlify. You own every line of code.", "Phase 4"],
  domains: ["Domains", "globe", "Connect a domain you already own with step-by-step DNS help, or buy a new one with the registration and renewal price shown up front.", "Later"],
  billing: ["Plans & billing", "card", "Studio is free during early access. Paid plans with premium templates and advanced blocks come later. Prefer we build it for you? Done-for-you packages are available today.", "Later"],
};

function pageSoon(key) {
  const [title, ic, text, when] = SOON[key];
  setTitle(title);
  view.innerHTML = `
    <header class="page-head"><div><p class="eyebrow">Coming ${when === "Later" ? "later" : `in ${when}`}</p><h1>${title}</h1><p class="lead">${text}</p></div></header>
    <div class="soon">
      <span class="soon-icon">${icon(ic, 30)}</span>
      <p>Your sites are ready for it: everything you set up now carries over.</p>
      <div class="soon-actions"><a class="btn" href="#/new">Create a site</a>${key === "templates" ? '<a class="btn btn--ghost" href="/studio/templates/" target="_blank" rel="noopener">Browse all 66 designs ↗</a>' : key === "billing" || key === "domains" ? '<a class="btn btn--ghost" href="/studio/pricing/#done-for-you" target="_blank" rel="noopener">Done-for-you packages ↗</a>' : '<a class="btn btn--ghost" href="#/sites">My sites</a>'}</div>
    </div>`;
}

function pageSettings() {
  setTitle("Settings");
  const n = store.listProjects().length;
  const inAccount = store.getMode() === "account";
  const account = me
    ? `<p>Signed in as <strong>${esc(me.email || me.name)}</strong>${me.verified ? "" : " (email not verified yet)"}. This is the same account you use across InfoparkDaily.</p><div class="row"><a class="btn btn--ghost" href="/resume-builder/account/">Manage account</a><button type="button" class="btn btn--ghost" data-act="logout">Log out</button></div>`
    : `<p>Sign in to save your sites to your account and open them on any device. It’s the same account you use across InfoparkDaily.</p><div class="row"><a class="btn" href="${SIGN_IN}">Sign in</a><a class="btn btn--ghost" href="${SIGN_IN.replace("?", "?mode=signup&")}">Create an account</a></div>`;
  const where = inAccount
    ? `${n} site${n === 1 ? "" : "s"} saved to your account. Only you can see them, and deleting your InfoparkDaily account deletes them too.`
    : `${n} site${n === 1 ? "" : "s"} saved in this browser. Nothing is uploaded. Clearing your browser data removes them, so sign in or keep a backup.`;
  view.innerHTML = `
    ${accountBanners()}
    <header class="page-head"><div><h1>Settings</h1><p class="lead">Your account and the data Studio keeps.</p></div></header>
    <section class="panel settings">
      <h2>Account</h2>
      ${accountState === "checking" ? "<p>Checking your account…</p>" : account}
    </section>
    <section class="panel settings">
      <h2>Your data</h2>
      <p>${where}</p>
      <div class="row"><button type="button" class="btn btn--ghost" data-act="backup" ${n ? "" : "disabled"}>${icon("download", 17)}Download backup (JSON)</button><button type="button" class="btn btn--danger" data-act="wipe" ${n ? "" : "disabled"}>${icon("trash", 17)}Delete all sites</button></div>
    </section>
    <section class="panel settings">
      <h2>About</h2>
      <p>Daily Web Studio is a product of <a href="/">InfoparkDaily</a>. <a href="/terms/">Terms</a> · <a href="/privacy/">Privacy</a> · <a href="/contact/">Contact</a></p>
    </section>`;
}

function pageMissing(title = "Page not found", text = "That page doesn’t exist in Studio.") {
  setTitle(title);
  view.innerHTML = `<div class="empty empty--big">${icon("sites", 30)}<h1>${esc(title)}</h1><p>${esc(text)}</p><div class="row"><a class="btn" href="#/sites">My sites</a><a class="btn btn--ghost" href="#/">Home</a></div></div>`;
}

/* ---------- wizard ---------- */
const STEPS = ["Type", "Details", "Look", "Pages", "Review"];
let wiz = null;

function freshWizard(type) {
  return { step: type ? 1 : 0, type: type || "", name: "", tagline: "", location: "", look: "clean", accent: "coral", pages: type ? [...typeById(type).pages] : [] };
}

function pageWizard(query) {
  setTitle("Create a site");
  const qType = new URLSearchParams(query).get("type");
  const draft = store.readDraft();
  if (qType && typeById(qType) && (!draft || draft.type !== qType)) wiz = freshWizard(qType);
  else if (!wiz) wiz = draft && typeof draft === "object" && Number.isInteger(draft.step) ? { ...freshWizard(), ...draft } : freshWizard();
  renderWizard();
}

function renderWizard(focus = true) {
  const s = wiz.step;
  const t = typeById(wiz.type);
  let body = "";
  if (s === 0)
    body = `<h1 tabindex="-1" class="wz-title">What are you building?</h1><p class="lead">Pick the closest match. You can change anything later.</p>
      <div class="type-grid" role="radiogroup" aria-label="Website type">${SITE_TYPES.map(
        (x) => `<button type="button" role="radio" class="type-opt" data-type="${x.id}" aria-checked="${wiz.type === x.id}"><span class="to-ico">${icon(x.id, 22)}</span><span><strong>${x.label}</strong><small>${x.short}</small></span><span class="to-check">${icon("check", 14)}</span></button>`,
      ).join("")}</div>`;
  if (s === 1)
    body = `<h1 tabindex="-1" class="wz-title">Tell us about your ${esc(t.label.toLowerCase())}</h1><p class="lead">This fills in your first draft. Keep it short; you can rewrite it in the editor.</p>
      <form class="fields" id="wz-form" novalidate>
        <label class="field"><span>Site name <b aria-hidden="true">*</b></span><input id="f-name" name="name" maxlength="60" required autocomplete="organization" value="${esc(wiz.name)}" placeholder="${t.id === "portfolio" ? "e.g. Anu Thomas" : "e.g. Malabar Spice Kitchen"}" aria-describedby="f-name-err"><em class="err" id="f-name-err" hidden>Please add a name for your site.</em></label>
        <label class="field"><span>One line about it</span><input name="tagline" maxlength="140" value="${esc(wiz.tagline)}" placeholder="${esc(t.short)}"><small>Shown under your name on the home page.</small></label>
        <label class="field"><span>City or area <i>(optional)</i></span><input name="location" maxlength="60" autocomplete="address-level2" value="${esc(wiz.location)}" placeholder="e.g. Kakkanad, Kochi"></label>
      </form>`;
  if (s === 2)
    body = `<h1 tabindex="-1" class="wz-title">Choose a starting look</h1><p class="lead">Sets fonts, colours and shapes. Templates and the editor build on it.</p>
      <div class="look-grid" role="radiogroup" aria-label="Look">${LOOKS.map(
        (l) => `<button type="button" role="radio" class="look-opt" data-look="${l.id}" aria-checked="${wiz.look === l.id}" style="--bg:${l.bg};--sf:${l.surface};--tx:${l.text};--mt:${l.muted};--r:${l.radius};--hf:${l.heading}">
          <span class="lo-art"><span class="lo-h">Aa</span><span class="lo-l"></span><span class="lo-l lo-l--s"></span><span class="lo-b"></span></span>
          <span class="lo-text"><strong>${l.label}</strong><small>${l.note}</small></span></button>`,
      ).join("")}</div>
      <fieldset class="accents"><legend>Accent colour</legend><div>${ACCENTS.map(
        (a) => `<label class="acc" title="${a.label}"><input type="radio" name="accent" value="${a.id}" ${wiz.accent === a.id ? "checked" : ""}><span style="--a:${a.value}"></span><em class="sr">${a.label}</em></label>`,
      ).join("")}</div></fieldset>`;
  if (s === 3) {
    const options = [...new Set([...t.pages, ...wiz.pages])];
    body = `<h1 tabindex="-1" class="wz-title">Which pages do you need?</h1><p class="lead">We suggested these for a ${esc(t.label.toLowerCase())}. Home is always included.</p>
      <div class="page-list">${options
        .map(
          (p) => `<label class="page-opt"><input type="checkbox" value="${esc(p)}" ${wiz.pages.includes(p) || p === "Home" ? "checked" : ""} ${p === "Home" ? "disabled" : ""}><span class="po-box">${icon("check", 14)}</span><span>${esc(p)}</span>${p === "Home" ? "<small>Always on</small>" : ""}</label>`,
        )
        .join("")}</div>
      <form class="add-page" id="add-page"><label class="sr" for="new-page">Add another page</label><input id="new-page" maxlength="30" placeholder="Add another page, e.g. Gallery"><button type="button" class="btn btn--ghost" id="add-page-btn">${icon("plus", 16)}Add</button></form>`;
  }
  if (s === 4) {
    const draft = { ...wiz, id: "preview-only", name: wiz.name || "Your site" };
    body = `<h1 tabindex="-1" class="wz-title">Here’s your first look</h1><p class="lead">Happy with it? Create the site, then pick a full template.</p>
      <div class="review">
        <div class="preview preview--sm"><div class="preview-stage"><iframe id="wz-pv" title="First look" sandbox="" referrerpolicy="no-referrer"></iframe></div></div>
        <dl class="facts facts--review">
          <div><dt>Type</dt><dd>${esc(t.label)}</dd><button type="button" class="link" data-go="0">Change</button></div>
          <div><dt>Name</dt><dd>${esc(wiz.name)}</dd><button type="button" class="link" data-go="1">Change</button></div>
          <div><dt>Look</dt><dd>${esc(lookById(wiz.look).label)} · <span class="sw" style="--a:${accentOf(wiz)}"></span>${esc((ACCENTS.find((a) => a.id === wiz.accent) || ACCENTS[0]).label)}</dd><button type="button" class="link" data-go="2">Change</button></div>
          <div><dt>Pages</dt><dd>${wiz.pages.map(esc).join(", ")}</dd><button type="button" class="link" data-go="3">Change</button></div>
        </dl>
      </div>`;
    queueMicrotask(() => {
      const f = $("#wz-pv");
      if (f) f.srcdoc = previewHtml(draft);
    });
  }
  const pct = Math.round((s / (STEPS.length - 1)) * 100);
  view.innerHTML = `
    <div class="wizard">
      <div class="wz-top">
        <a class="crumb" href="#/" data-wz="cancel">${icon("close", 16)}Cancel</a>
        <ol class="wz-steps" aria-label="Progress">${STEPS.map((x, i) => `<li class="${i < s ? "is-done" : i === s ? "is-on" : ""}" ${i === s ? 'aria-current="step"' : ""}><span>${i < s ? icon("check", 12) : i + 1}</span>${x}</li>`).join("")}</ol>
        <p class="wz-count">Step ${s + 1} of ${STEPS.length}</p>
      </div>
      <div class="wz-bar" aria-hidden="true"><span style="width:${Math.max(6, pct)}%"></span></div>
      <section class="wz-body">${body}</section>
      <footer class="wz-foot">
        ${s > 0 ? `<button type="button" class="btn btn--ghost" data-wz="back">${icon("back", 17)}Back</button>` : "<span></span>"}
        <p class="wz-hint" id="wz-hint" role="status" aria-live="polite"></p>
        ${s === 0 && !wiz.type ? "<span></span>" : s < STEPS.length - 1 ? `<button type="button" class="btn" data-wz="next">Next${icon("arrow", 17)}</button>` : `<button type="button" class="btn" data-wz="create">${icon("check", 17)}Create site</button>`}
      </footer>
    </div>`;
  if (focus) $(".wz-title")?.focus({ preventScroll: false });
  bindWizard();
}

function collectDetails() {
  const f = $("#wz-form");
  if (!f) return;
  wiz.name = f.name.value.trim();
  wiz.tagline = f.tagline.value.trim();
  wiz.location = f.location.value.trim();
}

function collectPages() {
  const boxes = [...document.querySelectorAll(".page-opt input")];
  if (!boxes.length) return;
  wiz.pages = ["Home", ...boxes.filter((b) => b.checked && b.value !== "Home").map((b) => b.value)];
}

function saveDraft() {
  store.writeDraft(wiz);
}

function go(step) {
  if (wiz.step === 1) collectDetails();
  if (wiz.step === 3) collectPages();
  wiz.step = Math.max(0, Math.min(STEPS.length - 1, step));
  saveDraft();
  renderWizard();
  window.scrollTo({ top: 0 });
}

function next() {
  const s = wiz.step;
  if (s === 0 && !wiz.type) return hint("Pick a website type to continue.");
  if (s === 1) {
    collectDetails();
    if (!wiz.name) {
      const input = $("#f-name");
      input.setAttribute("aria-invalid", "true");
      $("#f-name-err").hidden = false;
      input.focus();
      return;
    }
  }
  go(s + 1);
}

function hint(msg) {
  const h = $("#wz-hint");
  if (h) h.textContent = msg;
}

function bindWizard() {
  view.querySelectorAll(".type-opt").forEach((b) =>
    b.addEventListener("click", () => {
      const changed = wiz.type !== b.dataset.type;
      wiz.type = b.dataset.type;
      if (changed) wiz.pages = [...typeById(wiz.type).pages];
      saveDraft();
      go(1);
    }),
  );
  view.querySelectorAll(".look-opt").forEach((b) =>
    b.addEventListener("click", () => {
      wiz.look = b.dataset.look;
      view.querySelectorAll(".look-opt").forEach((x) => x.setAttribute("aria-checked", String(x === b)));
      saveDraft();
    }),
  );
  view.querySelectorAll('input[name="accent"]').forEach((r) =>
    r.addEventListener("change", () => {
      wiz.accent = r.value;
      saveDraft();
    }),
  );
  view.querySelectorAll(".page-opt input").forEach((c) => c.addEventListener("change", () => (collectPages(), saveDraft())));
  const addPage = () => {
    const input = $("#new-page");
    const v = input.value.replace(/\s+/g, " ").trim().slice(0, 30);
    if (!v) return input.focus();
    collectPages();
    if (wiz.pages.some((p) => p.toLowerCase() === v.toLowerCase())) return hint(`“${v}” is already in your list.`);
    if (wiz.pages.length >= 12) return hint("You can have up to 12 pages to start with.");
    wiz.pages.push(v);
    saveDraft();
    renderWizard(false);
    $("#new-page")?.focus();
  };
  $("#add-page-btn")?.addEventListener("click", addPage);
  $("#add-page")?.addEventListener("submit", (e) => (e.preventDefault(), addPage()));
  $("#wz-form")?.addEventListener("submit", (e) => (e.preventDefault(), next()));
  $("#wz-form")?.addEventListener("input", (e) => {
    if (e.target.name === "name" && e.target.value.trim()) {
      e.target.removeAttribute("aria-invalid");
      $("#f-name-err").hidden = true;
    }
    collectDetails();
    saveDraft();
  });
  view.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => go(+b.dataset.go)));
  $('[data-wz="cancel"]')?.addEventListener("click", () => {
    store.clearDraft();
    wiz = null;
  });
  $('[data-wz="back"]')?.addEventListener("click", () => go(wiz.step - 1));
  $('[data-wz="next"]')?.addEventListener("click", next);
  $('[data-wz="create"]')?.addEventListener("click", () => {
    const res = store.createProject(wiz);
    if (!res.ok) return hint(res.error);
    store.clearDraft();
    wiz = null;
    toast("Site created. Nice start!");
    location.hash = `#/site/${res.project.id}`;
  });
  /* Arrow keys move between options in the radio-style grids. */
  view.querySelectorAll('[role="radiogroup"]').forEach((g) =>
    g.addEventListener("keydown", (e) => {
      const items = [...g.querySelectorAll('[role="radio"]')];
      const i = items.indexOf(document.activeElement);
      if (i < 0) return;
      const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!d) return;
      e.preventDefault();
      items[(i + d + items.length) % items.length].focus();
    }),
  );
}

/* ---------- dialogs and shared actions ---------- */
function askName(current) {
  return new Promise((resolve) => {
    const dlg = $("#dlg");
    dlg.innerHTML = `<form method="dialog" class="dlg-body"><h2>Rename site</h2><label class="field"><span>Site name</span><input name="n" maxlength="60" required value="${esc(current)}"></label><div class="row row--end"><button class="btn btn--ghost" value="cancel" formnovalidate>Cancel</button><button class="btn" value="ok">Save</button></div></form>`;
    dlg.showModal();
    const input = dlg.querySelector("input");
    input.select();
    dlg.addEventListener("close", () => resolve(dlg.returnValue === "ok" ? input.value.trim() : null), { once: true });
  });
}

function confirmBox(title, text, okLabel) {
  return new Promise((resolve) => {
    const dlg = $("#dlg");
    dlg.innerHTML = `<form method="dialog" class="dlg-body"><h2>${esc(title)}</h2><p>${esc(text)}</p><div class="row row--end"><button class="btn btn--ghost" value="cancel" autofocus>Cancel</button><button class="btn btn--danger" value="ok">${esc(okLabel)}</button></div></form>`;
    dlg.showModal();
    dlg.addEventListener("close", () => resolve(dlg.returnValue === "ok"), { once: true });
  });
}

document.addEventListener("click", async (e) => {
  const el = e.target.closest("[data-act]");
  if (!el) return;
  const { act, id } = el.dataset;
  if (act === "rename") {
    const p = store.getProject(id);
    if (!p) return;
    const name = await askName(p.name);
    if (name === null) return;
    const res = store.updateProject(id, { name });
    toast(res.ok ? "Renamed." : res.error);
    route();
  }
  if (act === "duplicate") {
    const res = store.duplicateProject(id);
    toast(res.ok ? `Created “${res.project.name}”.` : res.error);
    route();
  }
  if (act === "delete") {
    const p = store.getProject(id);
    if (!p || !(await confirmBox(`Delete “${p.name}”?`, store.getMode() === "account" ? "This removes the site from your account on every device. It can’t be undone." : "This removes the site from this device. It can’t be undone.", "Delete site"))) return;
    const res = store.deleteProject(id);
    toast(res.ok ? "Site deleted." : res.error);
    if (location.hash.startsWith("#/site/")) location.hash = "#/sites";
    else route();
  }
  if (act === "backup") {
    const blob = new Blob([store.exportAll()], { type: "application/json" });
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: `daily-web-studio-backup-${new Date().toISOString().slice(0, 10)}.json` });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    toast("Backup downloaded.");
  }
  if (act === "wipe") {
    const where = store.getMode() === "account" ? "from your account" : "from this browser";
    if (!(await confirmBox("Delete all sites?", `Every site will be removed ${where}. Download a backup first if you might need them.`, "Delete all"))) return;
    toast((await store.deleteAll()) ? "All sites deleted." : "Couldn’t delete all sites. Try again.");
    route();
  }
  if (act === "logout") {
    try {
      await cloud?.signOutUser();
      toast("Logged out. Sites you create now save on this device.");
    } catch {
      toast("Couldn’t log out. Check your connection.");
    }
  }
  if (act === "move") {
    el.disabled = true;
    const r = await store.moveDeviceSitesToAccount();
    const parts = [];
    if (r.moved) parts.push(`Moved ${r.moved} site${r.moved === 1 ? "" : "s"} to your account.`);
    if (r.failed) parts.push(`${r.failed} couldn’t be moved. Try again.`);
    if (r.skipped) parts.push(`${r.skipped} didn’t fit (limit ${store.MAX_PROJECTS}).`);
    toast(parts.join(" ") || "Nothing to move.");
    rerender();
  }
  if (act === "resend") {
    try {
      await cloud.resendVerification();
      toast("Verification email sent. Check your inbox and spam.");
    } catch (err) {
      toast(cloud.authMessage(err));
    }
  }
  if (act === "verified") {
    const user = await cloud?.refreshUser().catch(() => null);
    if (user?.verified) {
      me = user;
      accountState = "in";
      await store.useAccount(cloud, user.uid);
      paintAccount();
      toast("Email verified. Your sites now save to your account.");
      rerender();
    } else toast("Not verified yet. Open the link in the email, then try again.");
  }
  if (act === "retry") location.reload();
});

/* ---------- router ---------- */
function route(moveFocus = true) {
  const raw = location.hash.replace(/^#\/?/, "");
  const [path, query = ""] = raw.split("?");
  const [head, arg] = path.split("/");
  if (moveFocus) closeSide();
  markNav(head);
  document.body.dataset.route = head || "home";
  if (head !== "new") wiz = null;
  if (moveFocus) view.focus({ preventScroll: true });
  if (!head) pageHome();
  else if (head === "new") pageWizard(query);
  else if (head === "sites") pageSites();
  else if (head === "site" && arg) pageSite(arg);
  else if (SOON[head]) pageSoon(head);
  else if (head === "settings") pageSettings();
  else pageMissing();
}

shell();
window.addEventListener("hashchange", () => {
  route();
  if (!location.hash.startsWith("#/new")) window.scrollTo({ top: 0 });
});
store.onProjectsChange(rerender);
let lastSync = "";
store.onSyncChange((s) => {
  paintAccount();
  /* Show or clear the "not saved" banner when the save state changes to or from an error. */
  if ((s.state === "error") !== (lastSync === "error")) rerender();
  lastSync = s.state;
});
$("#menu-btn").addEventListener("click", () => {
  const open = !document.body.classList.contains("side-open");
  document.body.classList.toggle("side-open", open);
  $("#menu-btn").setAttribute("aria-expanded", String(open));
});
$("#scrim").addEventListener("click", closeSide);
document.addEventListener("keydown", (e) => e.key === "Escape" && closeSide());
route();
loadAccount();
