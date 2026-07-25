/**
 * InfoparkDaily — shared disclaimer helper
 * Use: data-ipd-disclaimer="full" | "limited"
 * Shown on Jobs, Job detail (limited), and Contact only.
 */
(function () {
  var FULL_DISCLAIMER_HTML = [
    '<aside class="ipd-disclaimer" id="disclaimer" role="note" aria-label="InfoparkDaily disclaimer">',
    '  <header class="ipd-disclaimer-head">',
    '    <p class="ipd-disclaimer-kicker">InfoparkDaily Disclaimer · Safety first</p>',
    "    <h2>Independent community page — job data from public online sources</h2>",
    '    <p class="ipd-disclaimer-lead">We research and share public IT jobs for Kerala’s tech community. We are <strong>not</strong> the hiring company. Always do a detailed check on official channels before you proceed. <strong>No candidate fee. Ever.</strong></p>',
    "  </header>",
    '  <div class="ipd-disclaimer-grid">',
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Who we are</h3>",
    "      <p>InfoparkDaily is an independent community platform (website + social channels) that shares IT jobs, internships, walk-ins, hiring updates, and Kerala tech-park news. We are <strong>not Infopark management</strong>, not a company HR desk, not a registered recruitment agency, and not a government body.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Where listings come from</h3>",
    "      <p>Openings are collected from <strong>public online sources</strong> — Infopark Jobs, company websites, careers pages, LinkedIn, and similar channels. We try to verify carefully, but because information is taken from the internet we <strong>cannot guarantee genuineness, accuracy, or availability</strong> of every listing.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Detailed check before you proceed</h3>",
    "      <p>Whoever applies (he / she / they) must <strong>personally verify</strong> role, company, contacts, dates, and location on the official company website or careers portal before applying, travelling, sharing documents, or trusting any payment request. Only proceed after that official confirmation.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card ipd-disclaimer-card--alert">',
    "      <h3>Never pay · report fee / fraud to our team</h3>",
    "      <p>InfoparkDaily <strong>never charges</strong> candidates for jobs. If anyone asks for money, fees, OTP, or deposits — or you see a false / misleading statement or financial issue — <strong>contact our team</strong> via <a href=\"/contact/\">Contact</a>, <a href=\"mailto:infoparkstorieskochi@gmail.com\">infoparkstorieskochi@gmail.com</a>, or <a href=\"tel:+919995254290\">+91 99952 54290</a>. We can review and take action where possible.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Not official / not affiliated</h3>",
    "      <p>We are <strong>not affiliated with, endorsed by, or officially associated with</strong> Infopark, any IT company, or any government organization unless explicitly stated. Company names and logos belong to their owners and are used only for identification.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Liability &amp; our safety stance</h3>",
    "      <p>By using InfoparkDaily you acknowledge that we shall not be liable for loss arising from reliance on community information taken from online sources. We clarify this so everyone stays safer. For corrections, removals, or collaborations, use our official contact channels.</p>",
    "    </div>",
    "  </div>",
    '  <p class="ipd-disclaimer-footer-links">',
    '    <a href="/privacy/">Privacy Policy</a>',
    '    <a href="/terms/">Terms &amp; Conditions</a>',
    '    <a href="/terms/#report">Report an issue</a>',
    '    <a href="/contact/">Contact our team</a>',
    '    <a href="https://www.instagram.com/infoparkdaily/" target="_blank" rel="noopener noreferrer">@infoparkdaily</a>',
    '    <a href="https://www.instagram.com/infoparkdaily.jobs/" target="_blank" rel="noopener noreferrer">@infoparkdaily.jobs</a>',
    "  </p>",
    "</aside>"
  ].join("\n");

  var LIMITED_DISCLAIMER_HTML = [
    '<aside class="ipd-disclaimer ipd-disclaimer--limited" id="disclaimer" role="note" aria-label="InfoparkDaily disclaimer">',
    '  <header class="ipd-disclaimer-head">',
    '    <p class="ipd-disclaimer-kicker">InfoparkDaily Disclaimer · Safety first</p>',
    "    <h2>Public-source listing — verify in detail before you proceed</h2>",
    "  </header>",
    '  <ul class="ipd-disclaimer-limited-list">',
    "    <li>InfoparkDaily is an <strong>independent community page</strong>, not the hiring company or official Infopark HR.</li>",
    "    <li>Job details are taken from <strong>public online sources</strong>. We cannot guarantee genuineness — <strong>check the official company website</strong> before applying or travelling.</li>",
    "    <li>This is a <strong>free community</strong>. Never pay fees / OTP / deposits for a job.</li>",
    '    <li>Fee requests, false statements, or financial issues? <strong>Contact our team</strong> via <a href="/contact/">Contact</a> or <a href="mailto:infoparkstorieskochi@gmail.com">infoparkstorieskochi@gmail.com</a> — we can review.</li>',
    "  </ul>",
    '  <p class="ipd-disclaimer-footer-links">',
    '    <a href="/privacy/">Privacy</a>',
    '    <a href="/terms/">Terms</a>',
    '    <a href="/terms/#report">Report issue</a>',
    '    <a href="/contact/">Contact team</a>',
    '    <a href="https://www.instagram.com/infoparkdaily.jobs/" target="_blank" rel="noopener noreferrer">@infoparkdaily.jobs</a>',
    "  </p>",
    "</aside>"
  ].join("\n");

  window.IPD_DISCLAIMER_HTML = FULL_DISCLAIMER_HTML;
  window.IPD_DISCLAIMER_LIMITED_HTML = LIMITED_DISCLAIMER_HTML;

  function htmlFor(mode) {
    return mode === "limited" ? LIMITED_DISCLAIMER_HTML : FULL_DISCLAIMER_HTML;
  }

  function inject() {
    document.querySelectorAll("[data-ipd-disclaimer]").forEach(function (el) {
      var mode = (el.getAttribute("data-ipd-disclaimer") || "full").toLowerCase();
      el.innerHTML = htmlFor(mode);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
