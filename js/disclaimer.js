/**
 * InfoparkDaily — shared disclaimer helper
 * Use: data-ipd-disclaimer="full" | "limited"
 * Shown on Jobs, Recruit, Job detail (limited), Contact, Privacy, Terms.
 */
(function () {
  var FULL_DISCLAIMER_HTML = [
    '<aside class="ipd-disclaimer glass" id="disclaimer" role="note" aria-label="InfoparkDaily disclaimer">',
    '  <header class="ipd-disclaimer-head">',
    '    <p class="ipd-disclaimer-kicker">Disclaimer</p>',
    "    <h2>Independent community page — help for job seekers</h2>",
    '    <p class="ipd-disclaimer-lead">InfoparkDaily shares IT jobs for Kerala’s tech community as a <strong>community help</strong> service. We are <strong>not</strong> the hiring company. Listings go live only after we review them. Always verify on official channels before you apply. <strong>No candidate fee.</strong></p>',
    "  </header>",
    '  <div class="ipd-disclaimer-grid">',
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Who we are</h3>",
    "      <p>InfoparkDaily is an independent community platform. We are <strong>not Infopark management</strong>, not company HR, not a recruitment agency, and not a government body. We help job seekers discover openings.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Where listings come from</h3>",
    "      <p>Openings come from <strong>public online sources</strong> (Infopark Jobs, company sites, careers pages) and from company requests via <a href=\"/recruit/\">Recruit</a>. We cannot guarantee genuineness or availability of every listing.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Recruit · verify before Jobs</h3>",
    "      <p>Hiring requests submitted on Recruit are <strong>not posted automatically</strong>. We review and verify company and role details first. Only after that check may an opening appear on Jobs.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Fake or unclear requests</h3>",
    "      <p>If a request looks fake, incomplete, misleading, or cannot be verified, <strong>we will not add it to Jobs</strong>. We may ask for official confirmation or reject the request without listing it.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Check before you proceed</h3>",
    "      <p>Verify role, company, contacts, and dates on the official company website or careers portal before applying, travelling, or sharing documents.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Never pay · report issues</h3>",
    '      <p>We never charge candidates. If anyone asks for money, OTP, or deposits — contact us via <a href="/contact/">Contact</a> or <a href="mailto:infoparkstorieskochi@gmail.com">infoparkstorieskochi@gmail.com</a>.</p>',
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Not affiliated</h3>",
    "      <p>We are not affiliated with Infopark or any IT company unless explicitly stated. Company names and logos belong to their owners.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Liability · Privacy &amp; Terms</h3>",
    '      <p>By using InfoparkDaily you acknowledge we are not liable for loss from reliance on community information. Full rules, Recruit conditions, and future updates live in our <a href="/privacy/">Privacy Policy</a> and <a href="/terms/">Terms</a>. For corrections or removals, use our contact channels.</p>',
    "    </div>",
    "  </div>",
    '  <p class="ipd-disclaimer-footer-links">',
    '    <a href="/privacy/">Privacy</a>',
    '    <a href="/terms/">Terms</a>',
    '    <a href="/terms/#recruit">Recruit rules</a>',
    '    <a href="/terms/#report">Report an issue</a>',
    '    <a href="/contact/">Contact</a>',
    "  </p>",
    "</aside>"
  ].join("\n");

  var LIMITED_DISCLAIMER_HTML = [
    '<aside class="ipd-disclaimer ipd-disclaimer--limited glass" id="disclaimer" role="note" aria-label="InfoparkDaily disclaimer">',
    '  <p class="ipd-disclaimer-compact">',
    "    <strong>Note</strong>",
    "    <span>Community listing — not the employer. Verify on the official company site before applying. Never pay for a job. See Privacy &amp; Terms for full rules.</span>",
    '    <a class="ipd-disclaimer-compact-link" href="/contact/">Report issue</a>',
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
