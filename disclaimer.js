/**
 * InfoparkDaily — shared disclaimer + privacy footer helper
 * Injects into any element with [data-ipd-disclaimer]
 */
(function () {
  var FULL_DISCLAIMER_HTML = [
    '<aside class="ipd-disclaimer" id="disclaimer" role="note" aria-label="InfoparkDaily disclaimer">',
    '  <header class="ipd-disclaimer-head">',
    '    <p class="ipd-disclaimer-kicker">InfoparkDaily Disclaimer</p>',
    "    <h2>Independent Instagram community — not an official Infopark or company page</h2>",
    '    <p class="ipd-disclaimer-lead">We are a free community that shares public IT jobs, internships, walk-ins, and career updates. Always verify and apply only on official company portals. <strong>No fee. Ever.</strong></p>',
    "  </header>",
    '  <div class="ipd-disclaimer-grid">',
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Who we are</h3>",
    "      <p>InfoparkDaily is an independent community platform created to share IT job opportunities, internships, walk-in interviews, hiring drives, career updates, tech news, and events related to Infopark and Kerala’s IT ecosystem. We operate mainly as an <strong>Instagram / social community</strong> — not as Infopark management, not as a company HR desk, and not as a government body.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Not official / not affiliated</h3>",
    "      <p>We are <strong>not affiliated with, endorsed by, or officially associated with</strong> Infopark, any IT company, or any government organization unless explicitly stated. Company names, logos, and trademarks belong to their respective owners and are used only for informational and identification purposes.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Where listings come from</h3>",
    "      <p>Job openings, internship opportunities, and hiring updates are collected from official company career portals, company websites, LinkedIn, public announcements, or trusted sources. While we make every effort to verify information before publishing, we <strong>cannot guarantee</strong> the accuracy, completeness, or availability of every listing.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Please check &amp; verify before applying</h3>",
    "      <p>Applicants are strongly encouraged to <strong>verify all details</strong> through the respective company’s official website / careers page before applying. Meeting eligibility does not guarantee selection. You are responsible for your own application and career decisions.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card ipd-disclaimer-card--alert">',
    "      <h3>This is a free community — never pay anyone</h3>",
    "      <p>InfoparkDaily <strong>never charges any fee</strong> for sharing job opportunities or recruitment information. If anyone requests payment claiming to represent InfoparkDaily, please ignore and report it immediately through our official social channels.</p>",
    "    </div>",
    '    <div class="ipd-disclaimer-card">',
    "      <h3>Liability</h3>",
    "      <p>By using our platform, you acknowledge that InfoparkDaily shall not be liable for any loss or inconvenience arising from reliance on the information shared. For corrections, content removal requests, or business collaborations, contact us through our official social media pages or website.</p>",
    "    </div>",
    "  </div>",
    '  <p class="ipd-disclaimer-footer-links">',
    '    <a href="privacy.html">Privacy Policy &amp; full disclaimer</a>',
    '    <a href="contact.html">Contact</a>',
    '    <a href="https://www.instagram.com/infoparkdaily/" target="_blank" rel="noopener noreferrer">@infoparkdaily</a>',
    '    <a href="https://www.instagram.com/infoparkdaily.jobs/" target="_blank" rel="noopener noreferrer">@infoparkdaily.jobs</a>',
    "  </p>",
    "</aside>"
  ].join("\n");

  window.IPD_DISCLAIMER_HTML = FULL_DISCLAIMER_HTML;

  function inject() {
    document.querySelectorAll("[data-ipd-disclaimer]").forEach(function (el) {
      el.innerHTML = FULL_DISCLAIMER_HTML;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
