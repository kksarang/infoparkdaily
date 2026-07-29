/**
 * InfoparkDaily — shared disclaimer helper
 * Use: data-ipd-disclaimer="full" | "limited"
 * Shown on Jobs, Job detail (limited), and Contact only.
 */
(function () {
  var FULL_DISCLAIMER_HTML = [
    '<aside class="ipd-disclaimer glass" id="disclaimer" role="note" aria-label="InfoparkDaily disclaimer">',
    '  <header class="ipd-disclaimer-head">',
    '    <p class="ipd-disclaimer-kicker">Disclaimer</p>',
    "    <h2>Independent community page — public-source job data</h2>",
    '    <p class="ipd-disclaimer-lead">We share public IT jobs for Kerala’s tech community. We are <strong>not</strong> the hiring company. Always verify on official channels before you apply. <strong>No candidate fee.</strong></p>',
    "  </header>",
    '  <div class="ipd-disclaimer-grid">',
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Who we are</h3>",
    "      <p>InfoparkDaily is an independent community platform. We are <strong>not Infopark management</strong>, not company HR, not a recruitment agency, and not a government body.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Where listings come from</h3>",
    "      <p>Openings come from <strong>public online sources</strong> such as Infopark Jobs, company sites, and careers pages. We cannot guarantee genuineness or availability of every listing.</p>",
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
    "      <h3>Liability</h3>",
    "      <p>By using InfoparkDaily you acknowledge we are not liable for loss from reliance on community information. For corrections or removals, use our contact channels.</p>",
    "    </div>",
    "  </div>",
    '  <p class="ipd-disclaimer-footer-links">',
    '    <a href="/privacy/">Privacy</a>',
    '    <a href="/terms/">Terms</a>',
    '    <a href="/terms/#report">Report an issue</a>',
    '    <a href="/contact/">Contact</a>',
    "  </p>",
    "</aside>"
  ].join("\n");

  var LIMITED_DISCLAIMER_HTML = [
    '<aside class="ipd-disclaimer ipd-disclaimer--limited glass" id="disclaimer" role="note" aria-label="InfoparkDaily disclaimer">',
    '  <p class="ipd-disclaimer-compact">',
    "    <strong>Note</strong>",
    "    <span>Public-source listing — not the employer. Verify on the official company site before applying. Never pay for a job.</span>",
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
