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
    "    <h2>Community help for youngsters &amp; job seekers — verify everything yourself</h2>",
    '    <p class="ipd-disclaimer-lead">InfoparkDaily started to <strong>help and support</strong> youngsters and job seekers. We only collect and share hiring information from <strong>outside sources</strong> (public websites, individuals, social media, Infopark / Technopark portals, LinkedIn, and similar channels). We are <strong>not</strong> the employer and we <strong>cannot guarantee</strong> that every listing is 100% genuine, original, or still correct. <strong>You must strictly check</strong> before you apply. <strong>Never pay any amount</strong> for a job or interview.</p>',
    "  </header>",
    '  <div class="ipd-disclaimer-grid">',
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Who we are</h3>",
    "      <p>InfoparkDaily is an <strong>individual Instagram community</strong> started by <strong>Sarang R</strong> — <strong>not Infopark official</strong>, not Technopark / Cyberpark authority, not company HR, and not a government body. <strong>InfoparkDaily Media</strong> and <strong>InfoparkDaily Jobs</strong> are the same independent community family. <strong>Enitexa</strong> is our freelance software service provider.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Where data comes from</h3>",
    "      <p>Openings and updates may come from <strong>external public sources</strong>: Infopark and Technopark job sites, company websites, LinkedIn, social media posts, individuals who share leads, and reviewed requests via <a href=\"/recruit/\">Recruit</a>. Because this is third-party / outside data, genuineness is <strong>not guaranteed</strong>.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Strict check is your duty</h3>",
    "      <p>Anyone who uses this website must <strong>strictly verify</strong> whether a role is genuine, original, and correct on the official company or park channel before applying, travelling, or sharing documents. Do not treat InfoparkDaily as final confirmation.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Never pay for interview / job</h3>",
    '      <p>We <strong>never</strong> charge candidates. If anyone asks for money, fees, deposits, or OTPs for an interview or job linked to our pages — treat it as fraud. Report via <a href="/contact/">Contact</a> or <a href="mailto:infoparkstorieskochi@gmail.com">infoparkstorieskochi@gmail.com</a>.</p>',
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Recruit · review before Jobs</h3>",
    "      <p>Hiring requests on Recruit are <strong>not posted automatically</strong>. We review first. Fake or unclear requests are rejected. Even after listing, candidates must still verify officially.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>We are not responsible for outcomes</h3>",
    '      <p>If you face loss, travel cost, rejection, scam, or any issue after using community information, InfoparkDaily and its operators are <strong>not responsible</strong>. Full rules: <a href="/privacy/">Privacy</a> and <a href="/terms/">Terms</a>. Guides: <a href="/guides/verify-jobs-before-you-apply/">Verify before you apply</a>.</p>',
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Not affiliated</h3>",
    "      <p>We are not affiliated with Infopark, Technopark, Cyberpark, or any IT company unless explicitly stated. InfoparkDaily, InfoparkDaily Media, InfoparkDaily Jobs, and Enitexa are independent — not official park pages. Company names and logos belong to their owners.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Privacy &amp; Terms may update</h3>",
    '      <p>As new situations arise, we may update Privacy, Terms, and Guides. Continued use means you accept the latest versions. Corrections or removals: <a href="/contact/">Contact</a>.</p>',
    "    </div>",
    "  </div>",
    '  <p class="ipd-disclaimer-footer-links">',
    '    <a href="/privacy/">Privacy</a>',
    '    <a href="/terms/">Terms</a>',
    '    <a href="/terms/#verify">Verify rules</a>',
    '    <a href="/guides/verify-jobs-before-you-apply/">Safety guide</a>',
    '    <a href="/contact/">Contact</a>',
    "  </p>",
    "</aside>"
  ].join("\n");

  var LIMITED_DISCLAIMER_HTML = [
    '<aside class="ipd-disclaimer ipd-disclaimer--limited glass" id="disclaimer" role="note" aria-label="InfoparkDaily disclaimer">',
    '  <p class="ipd-disclaimer-compact">',
    "    <strong>Note</strong>",
    "    <span>Community help only — data from outside public sources. Not the employer. Strictly verify genuineness yourself. Never pay for a job or interview. InfoparkDaily is not responsible for outcomes. See Privacy &amp; Terms.</span>",
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
