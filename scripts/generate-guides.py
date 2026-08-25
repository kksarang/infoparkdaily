#!/usr/bin/env python3
"""Generate InfoparkDaily /guides/ pages for AdSense content readiness."""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSS_VER = "20260819a"
SITE_JS = "20260819a"
ANALYTICS = "20260730e"
DISCLAIMER = "20260825b"

HEAD = """<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>{title}</title>
    <meta name="description" content="{description}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta name="author" content="InfoparkDaily" />
    <meta name="theme-color" content="#0b0b0f" />
    <meta property="og:site_name" content="InfoparkDaily" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:title" content="{og_title}" />
    <meta property="og:description" content="{description}" />
    <meta property="og:type" content="{og_type}" />
    <meta property="og:url" content="https://infoparkdaily.online{path}" />
    <meta property="og:image" content="https://infoparkdaily.online/preview.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{og_title}" />
    <meta name="twitter:description" content="{description}" />
    <meta name="twitter:image" content="https://infoparkdaily.online/preview.jpg" />
    <link rel="canonical" href="https://infoparkdaily.online{path}" />
    <meta name="google-adsense-account" content="ca-pub-4593359890362954" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="48x48" href="/assets/icons/favicon-48.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/assets/icons/favicon-192.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/favicon-180.png" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="stylesheet" href="/css/styles.css?v={css_ver}" />
    <script>
      (function () {{
        try {{
          if (localStorage.getItem("ipd-theme") === "light") document.documentElement.classList.add("theme-light");
          else document.documentElement.classList.add("theme-dark");
        }} catch (_e) {{
          document.documentElement.classList.add("theme-dark");
        }}
      }})();
    </script>
  </head>
  <body class="guides-body dark">
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <header class="site-header glass">
      <a class="brand" href="/" aria-label="Infopark Daily home">
        <img class="brand-logo" src="/assets/logo-infoparkdaily.png" alt="Infoparkdaily Kochi logo" />
        <div>
          <p class="brand-name">INFOPARKDAILY</p>
          <p class="brand-tagline">Kerala's Largest Tech &amp; Business Community</p>
        </div>
      </a>
      <nav id="site-nav" class="site-nav" aria-label="Primary">
        <a href="/recruit/">Recruit</a>
        <a href="/jobs/">Jobs</a>
        <a href="/news/">News</a>
        <a href="/services/">Services</a>
        <a href="/media/">About Us</a>
        <a href="/contact/">Contact</a>
        <a href="https://sarangrajan.in/hexenity/" class="nav-enitexa" target="_blank" rel="noopener noreferrer">Enitexa.ai</a>
      </nav>
      <div class="header-actions">
        <button id="theme-toggle" type="button" class="theme-toggle" aria-label="Toggle theme">Theme</button>
        <button id="nav-toggle" type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">
          <span class="nav-toggle-bars" aria-hidden="true"><span></span><span></span><span></span></span>
        </button>
      </div>
    </header>
"""

FOOT = """
    <footer class="site-footer">
      <div class="footer-grid">
        <div class="footer-brand-col">
          <div class="footer-brand">
            <img src="/assets/logo-infoparkdaily.png" alt="" width="40" height="40" />
            <p class="footer-brand-name">INFOPARKDAILY</p>
          </div>
          <p class="footer-tagline">
            Independent community for Infopark Kochi jobs, news, and career guidance — not an official Infopark page.
          </p>
          <div class="footer-cta-row">
            <a class="btn btn-primary" href="/jobs/">View Jobs</a>
            <a class="btn btn-secondary" href="/guides/">Career Guides</a>
          </div>
        </div>
        <div class="footer-contact-col">
          <h2>Get in touch</h2>
          <p class="footer-contact-item"><span>Call</span><a href="tel:+919995254290">+91 99952 54290</a></p>
          <p class="footer-contact-item"><span>Email</span><a href="mailto:infoparkstorieskochi@gmail.com">infoparkstorieskochi@gmail.com</a></p>
          <p class="footer-contact-item"><span>Visit</span>Thapasya Rd, Infopark Campus, Kakkanad, Kochi, Kerala</p>
          <p class="footer-contact-item"><span>Legal</span><a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a></p>
        </div>
        <div class="contact-map footer-map" aria-label="Infopark location map">
          <iframe title="Infopark Location Map" src="https://www.google.com/maps?q=Thapasya+Rd,+Infopark+Campus,+Infopark,+Kochi,+Kakkanad,+Kerala+682042&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
      <nav class="footer-links" aria-label="Social links">
        <a href="https://www.instagram.com/infoparkdaily/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.instagram.com/infoparkdaily.jobs/" target="_blank" rel="noopener noreferrer">Jobs Instagram</a>
        <a href="https://www.instagram.com/infoparkdaily.media/" target="_blank" rel="noopener noreferrer">Media Instagram</a>
        <a href="https://whatsapp.com/channel/0029VbDJFfA4Y9lm5L4kpm22" target="_blank" rel="noopener noreferrer">WhatsApp Channel</a>
        <a href="https://www.instagram.com/enitexa/" target="_blank" rel="noopener noreferrer">Enitexa Instagram</a>
      </nav>
      <div class="footer-bottom">
        <p class="copyright">&copy; <span id="year"></span> Enitexa.ai. All rights reserved.</p>
        <p class="footer-legal">
          <a href="/privacy/">Privacy Policy</a>
          <span aria-hidden="true">·</span>
          <a href="/terms/">Terms &amp; Conditions</a>
          <span aria-hidden="true">·</span>
          <a href="/privacy/#disclaimer">Disclaimer</a>
          <span aria-hidden="true">·</span>
          <a href="/media/">About Us</a>
          <span aria-hidden="true">·</span>
          <a href="/contact/">Contact</a>
          <span aria-hidden="true">·</span>
          <a href="/guides/">Guides</a>
        </p>
        <p class="footer-credit">
          Made with <span aria-hidden="true">&#10084;</span>
          <a href="https://sarangrajan.in/hexenity/" target="_blank" rel="noopener noreferrer">Enitexa.ai</a> - Digital &amp; Software Solutions Company
        </p>
      </div>
    </footer>
    <script type="module" src="/analytics/main.js?v={analytics}"></script>
    <script src="/js/site.js?v={site_js}" defer></script>
    <script src="/js/disclaimer.js?v={disclaimer}" defer></script>
    <script src="/js/ads.js?v=20260805a" defer></script>
  </body>
</html>
"""

NOTICE = """
    <div class="guide-notice">
      <strong>Disclaimer:</strong> InfoparkDaily exists to help youngsters and job seekers. Job and hiring data on
      this site is collected from <strong>outside sources</strong> — public websites, individuals, social media,
      Infopark / Technopark portals, LinkedIn, and similar channels. We are not Infopark Kerala, Technopark,
      Cyberpark, or any employer. We <strong>cannot guarantee</strong> that every listing is 100% genuine, original,
      or still correct. <strong>You must strictly verify</strong> on official channels before applying, travelling,
      or sharing documents. <strong>Never pay any amount</strong> for a job or interview. If any issue arises after
      you use community information, InfoparkDaily is <strong>not responsible</strong>. See our
      <a href="/privacy/">Privacy Policy</a> and <a href="/terms/">Terms</a>.
    </div>
"""


def wrap(path: str, title: str, description: str, og_title: str, body: str, *, index: bool = False) -> str:
    return (
        HEAD.format(
            title=title,
            description=description,
            path=path,
            og_title=og_title,
            og_type="website" if index else "article",
            css_ver=CSS_VER,
        )
        + body
        + FOOT.format(analytics=ANALYTICS, site_js=SITE_JS, disclaimer=DISCLAIMER)
    )


def article(
    crumb: str,
    kicker: str,
    h1: str,
    updated: str,
    read: str,
    lead: str,
    sections_html: str,
    more_links: str,
) -> str:
    mid = '<aside class="ipd-ad-slot" data-ad-slot="guide-mid" hidden aria-hidden="true"></aside>'
    if "<!--IPD_AD_MID-->" in sections_html:
        sections_html = sections_html.replace("<!--IPD_AD_MID-->", mid, 1)
    else:
        sections_html = sections_html + "\n    " + mid
    return f"""
<main id="main-content" class="guides-page">
  <header class="guide-top glass">
    <nav class="guide-breadcrumb" aria-label="Breadcrumb">
      <a href="/guides/">Guides</a>
      <span aria-hidden="true">/</span>
      <span>{crumb}</span>
    </nav>
    <p class="eyebrow">{kicker}</p>
    <h1>{h1}</h1>
    <p class="guide-meta">Updated {updated} · {read} · By InfoparkDaily editorial</p>
    <p class="guide-lead">{lead}</p>
    <div class="guide-cta-row guide-cta-row--top">
      <a class="btn btn-primary" href="/jobs/">Browse open jobs</a>
      <a class="btn btn-secondary" href="/guides/">All guides</a>
    </div>
  </header>

  <div class="guide-layout">
    <article class="guide-article glass">
      <aside class="ipd-ad-slot" data-ad-slot="guide-top" hidden aria-hidden="true"></aside>
      <div class="guide-prose">
        {sections_html}
      </div>
      {NOTICE}
      <div class="guide-cta-row">
        <a class="btn btn-primary" href="/jobs/">Browse open jobs</a>
        <a class="btn btn-secondary" href="/guides/">All guides</a>
        <a class="btn btn-secondary" href="/recruit/">Recruit</a>
      </div>
    </article>

    <aside class="guide-rail" aria-label="Guide shortcuts">
      <div class="guide-rail-card glass">
        <p class="guide-rail-kicker">Keep exploring</p>
        <h2>More career guides</h2>
        <ul class="guide-rail-links">
          {more_links}
        </ul>
      </div>
      <div class="guide-rail-card glass">
        <p class="guide-rail-kicker">Safety first</p>
        <h2>Before you apply</h2>
        <p>Verify the company on official channels. Never pay for a job or interview. InfoparkDaily is not the employer.</p>
        <div class="guide-cta-row">
          <a class="btn btn-secondary" href="/guides/verify-jobs-before-you-apply/">Safety guide</a>
          <a class="btn btn-ghost" href="/terms/">Terms</a>
        </div>
      </div>
      <div class="guide-rail-card glass">
        <p class="guide-rail-kicker">Hiring digest</p>
        <h2>Open roles</h2>
        <p>Browse Infopark, Technopark, and Cyberpark openings — then confirm on the official portal.</p>
        <div class="guide-cta-row">
          <a class="btn btn-primary" href="/jobs/">View Jobs</a>
        </div>
      </div>
    </aside>
  </div>
</main>
"""


PAGES: list[tuple[str, str]] = []

# --- Index ---
index_body = """
<main id="main-content" class="guides-page guides-index">
  <section class="guide-top guide-hero glass">
    <div class="guide-hero-copy">
      <p class="eyebrow">Career guides · Kerala IT parks</p>
      <h1>Guides for Infopark, Technopark &amp; Kochi tech careers</h1>
      <p class="guide-lead">
        Original, practical articles from InfoparkDaily — how to apply safely, prepare as a fresher, handle walk-ins,
        understand salary bands, write a resume that passes screening, and verify openings before you share documents.
        Written for Kerala IT park candidates who want clarity, not spam.
      </p>
      <p class="guide-meta">11 guides · Last updated 15 August 2026 · Independent community content</p>
      <div class="guide-cta-row">
        <a class="btn btn-primary" href="/jobs/">Browse open jobs</a>
        <a class="btn btn-secondary" href="/guides/verify-jobs-before-you-apply/">Safety guide</a>
      </div>
    </div>
    <aside class="guide-hero-panel glass" aria-label="Quick links">
      <p class="guide-rail-kicker">Start here</p>
      <ul class="guide-rail-links">
        <li><a href="/guides/how-to-apply-infopark-technopark-jobs/">How to apply</a></li>
        <li><a href="/guides/resume-guide-kerala-it-jobs/">Resume guide</a></li>
        <li><a href="/guides/interview-preparation-kerala-it/">Interview preparation</a></li>
        <li><a href="/guides/kerala-it-salary-guide/">Salary expectations</a></li>
        <li><a href="/guides/verify-jobs-before-you-apply/">Verify before you apply</a></li>
      </ul>
    </aside>
  </section>

  <aside class="ipd-ad-slot" data-ad-slot="guides-index" hidden aria-hidden="true"></aside>

  <section class="guide-section-head">
    <h2>Applying for a job</h2>
    <p>The process from finding a listing to sending an application that gets read.</p>
  </section>

  <section class="guide-card-grid" aria-label="Application guides">
    <a class="guide-card glass" href="/guides/how-to-apply-infopark-technopark-jobs/">
      <p class="guide-card-kicker">Process</p>
      <h2>How to apply for Infopark &amp; Technopark jobs</h2>
      <p>Portals, resumes, deadlines, and a safe apply checklist for Kerala IT parks.</p>
      <span class="guide-card-meta">~10 min read</span>
    </a>
    <a class="guide-card glass" href="/guides/resume-guide-kerala-it-jobs/">
      <p class="guide-card-kicker">Resume</p>
      <h2>Resume guide for Kerala IT jobs</h2>
      <p>ATS-friendly rules, how to make a clean resume, and bullets that survive recruiter screening.</p>
      <span class="guide-card-meta">~16 min read</span>
    </a>
    <a class="guide-card glass" href="/guides/interview-preparation-kerala-it/">
      <p class="guide-card-kicker">Interviews</p>
      <h2>Interview preparation for Kerala IT companies</h2>
      <p>IT fresher and experienced rounds, non-IT domains inside parks, language tips, and common mistakes.</p>
      <span class="guide-card-meta">~18 min read</span>
    </a>
    <a class="guide-card glass" href="/guides/walk-in-interview-tips-infopark/">
      <p class="guide-card-kicker">Walk-ins</p>
      <h2>Walk-in interview tips for Infopark</h2>
      <p>What to carry, how early to arrive, and how to stay professional on campus walk-in days.</p>
      <span class="guide-card-meta">~8 min read</span>
    </a>
  </section>

  <section class="guide-section-head">
    <h2>Pay, offers and joining</h2>
    <p>What the numbers mean, what to negotiate, and what to check before you sign.</p>
  </section>

  <section class="guide-card-grid" aria-label="Offer and salary guides">
    <a class="guide-card glass" href="/guides/kerala-it-salary-guide/">
      <p class="guide-card-kicker">Salary</p>
      <h2>Salary expectations in Kerala IT parks</h2>
      <p>CTC breakdowns, experience bands, negotiation tactics, and compensation red flags.</p>
      <span class="guide-card-meta">~11 min read</span>
    </a>
    <a class="guide-card glass" href="/guides/offer-letter-notice-period-guide/">
      <p class="guide-card-kicker">Offer stage</p>
      <h2>Offer letters, notice periods &amp; background checks</h2>
      <p>Reading the contract, training bonds, resigning well, and passing verification.</p>
      <span class="guide-card-meta">~12 min read</span>
    </a>
    <a class="guide-card glass" href="/guides/working-in-infopark-kochi-life/">
      <p class="guide-card-kicker">Campus life</p>
      <h2>Working in Infopark Kochi: commute, costs &amp; campus life</h2>
      <p>Getting to Kakkanad, where to live, budgeting your first months, and shift realities.</p>
      <span class="guide-card-meta">~11 min read</span>
    </a>
  </section>

  <section class="guide-section-head">
    <h2>Starting out and switching</h2>
    <p>Guides for first-job seekers and people moving into IT from another field.</p>
  </section>

  <section class="guide-card-grid" aria-label="Career stage guides">
    <a class="guide-card glass" href="/guides/fresher-guide-kochi-it-parks/">
      <p class="guide-card-kicker">Freshers</p>
      <h2>Fresher guide for Kochi IT parks</h2>
      <p>What Infopark hiring looks like for first-job seekers — skills, internships, and expectations.</p>
      <span class="guide-card-meta">~12 min read</span>
    </a>
    <a class="guide-card glass" href="/guides/career-switch-into-kerala-it/">
      <p class="guide-card-kicker">Switching</p>
      <h2>Switching careers into Kerala IT</h2>
      <p>Realistic entry roles, evaluating training claims, and using your old career as an advantage.</p>
      <span class="guide-card-meta">~12 min read</span>
    </a>
    <a class="guide-card glass" href="/guides/verify-jobs-before-you-apply/">
      <p class="guide-card-kicker">Safety</p>
      <h2>Verify jobs before you apply</h2>
      <p>Red flags, fee scams, and a verification checklist before you travel or share ID proofs.</p>
      <span class="guide-card-meta">~7 min read</span>
    </a>
    <a class="guide-card glass" href="/guides/kerala-it-hiring-this-week/">
      <p class="guide-card-kicker">Editorial</p>
      <h2>Kerala IT hiring this week</h2>
      <p>Our weekly editorial view of hiring themes across Infopark, Technopark, and Cyberpark.</p>
      <span class="guide-card-meta">Updated weekly</span>
    </a>
  </section>

  <section class="guide-index-note glass">
    <h2>About these guides</h2>
    <p>
      InfoparkDaily started to help youngsters and job seekers. We share career guidance and digests based on
      <strong>outside sources</strong> (park portals, company sites, LinkedIn, social media, individuals, and Recruit).
      We are <strong>not the employer</strong> and cannot guarantee every listing is genuine — you must strictly verify
      before applying, and never pay for a job or interview. If issues arise, InfoparkDaily is not responsible.
      See <a href="/terms/">Terms</a>, <a href="/privacy/">Privacy</a>,
      <a href="/jobs/">Jobs</a>, and <a href="/media/">About Us</a>.
    </p>
  </section>
</main>
"""

PAGES.append(
    (
        "guides/index.html",
        wrap(
            "/guides/",
            "Career Guides — Infopark & Kerala IT Jobs | InfoparkDaily",
            "11 original InfoparkDaily career guides: salary expectations, resumes, interview preparation, offer letters, walk-ins, fresher advice, and job safety for Kerala IT parks.",
            "Career Guides | InfoparkDaily",
            index_body,
            index=True,
        ),
    )
)

# --- Guide 1 ---
g1 = article(
    "How to apply",
    "Career guide · Kerala IT parks",
    "How to apply for Infopark &amp; Technopark jobs",
    "5 August 2026",
    "10 min read",
    "Kerala’s IT parks publish openings every week — but many candidates lose time because they apply on the wrong page, miss deadlines, or trust unofficial forwards. This guide walks through a practical, safe process for Infopark Kochi and Technopark Trivandrum applications using official channels and InfoparkDaily’s curated digest.",
    """
    <h2>1. Start with official park portals</h2>
    <p>
      Infopark Kerala lists company openings on
      <a href="https://infopark.in/companies-job" target="_blank" rel="noopener noreferrer">infopark.in/companies-job</a>.
      Technopark lists roles on
      <a href="https://technopark.in/job-search" target="_blank" rel="noopener noreferrer">technopark.in/job-search</a>.
      These portals are facilitators — they are not the employer. Always open the company detail page, note the last date
      to apply, and follow the apply instructions published there (careers link, email, or form).
    </p>
    <p>
      InfoparkDaily mirrors upcoming listings on
      <a href="/jobs/">Jobs</a>,
      <a href="/infopark-jobs/">Infopark Jobs</a>, and
      <a href="/technopark-jobs/">Technopark Jobs</a>
      so you can filter by location, fresher-friendly roles, and closing dates. We are an independent community site —
      <strong>not the hiring company</strong> and not an official Infopark or Technopark office.
    </p>

    <h2>2. Build a park-ready resume</h2>
    <p>
      Most Infopark and Technopark recruiters skim fast. Lead with your name, phone, email, city (Kochi / Trivandrum),
      and a short summary that matches the role family — for example “Fresher .NET developer” or “2 years React + Node”.
      Put education and skills next, then projects or internships with measurable outcomes. Skip long soft-skill essays;
      use clear bullets instead.
    </p>
    <p>
      Save a PDF with a clean filename like <code>Name_Role_Infopark.pdf</code>. Keep a second version tailored for
      marketing, QA, or support roles if you apply across categories. Never pay anyone to “boost” your resume into
      Infopark hiring — that is a common scam pattern.
    </p>

    <h2>3. Match the role before you click Apply</h2>
    <p>
      Read the full posting: experience band, must-have stack, walk-in vs online apply, and deadline. If the portal says
      “Immediate requirement”, treat the closing date seriously — many listings close early when the pipeline fills.
      Cross-check the same role on the company’s careers page when a website is listed on InfoparkDaily’s company profile.
    </p>
    <p>
      Use filters on <a href="/jobs/">Jobs</a> to separate open vs expired, and browse
      <a href="/jobs/today/">Today Jobs</a> when you want a same-day focus list.
    </p>

    <!--IPD_AD_MID-->
    <h2>4. Apply the way the company asks</h2>
    <p>
      If the listing says email your CV, use a clear subject line such as “Application — Full Stack Developer — Your Name”.
      If it links to a careers form, apply there and keep a confirmation screenshot. For walk-ins, carry printed resumes,
      ID, and certificates named in the notice — arrive early and dress for a professional campus setting.
    </p>
    <p>
      Do not share OTPs, bank details, or Aadhaar copies with strangers on WhatsApp, and never pay “registration fees”.
      InfoparkDaily never collects money for applications. If something feels wrong, stop and verify on the official
      company site or park portal. See
      <a href="/guides/verify-jobs-before-you-apply/">Verify jobs before you apply</a>.
    </p>

    <h2>5. Track deadlines and follow up once</h2>
    <p>
      Keep a simple sheet: company, role, applied date, deadline, portal link. One polite follow-up after 7–10 working
      days is reasonable if the posting is still open. Multiple daily messages usually hurt more than help.
    </p>
    <p>
      Freshers should also read
      <a href="/guides/fresher-guide-kochi-it-parks/">Fresher guide for Kochi IT parks</a>
      and
      <a href="/guides/walk-in-interview-tips-infopark/">Walk-in interview tips</a>.
      Companies can share openings via <a href="/recruit/">Recruit</a> — candidates still apply on official channels.
    </p>

    <h2>6. Email apply — a template that stays professional</h2>
    <p>
      When a listing asks you to email HR, keep the message short. State the exact role title from the park portal,
      where you saw it (Infopark / Technopark / company careers), your current city, and years of experience. Attach
      one PDF resume only unless the notice asks for additional documents. Avoid long career autobiographies in the
      email body — recruiters in busy park companies often decide in under a minute whether to open the attachment.
    </p>
    <p>
      If you are applying to more than one role in the same company, send separate emails with role-specific subject
      lines. Mixing “any open position” into one message makes filtering harder for HR and looks unfocused. Save the
      sent mail and any auto-reply; that is your proof of apply date if deadlines are disputed later.
    </p>

    <h2>7. Online forms and assessments</h2>
    <p>
      Many Infopark tenants use ATS portals or Google Forms linked from the park listing. Complete every required field
      honestly. For coding or aptitude tests, use a quiet connection and read the time limit twice. Do not outsource
      the test to someone else — companies in Kochi and Trivandrum frequently re-test the same skills in a live round.
    </p>
    <p>
      Screenshot the confirmation page when you finish. If the form fails, retry once, then use the alternate contact
      method on the official posting if one exists. Do not paste your resume into unknown “job agent” websites that
      appear in search ads next to the real company name.
    </p>

    <h2>8. When the listing says “immediate joiners”</h2>
    <p>
      Immediate-requirement posts are common during delivery peaks. Apply the same day if you match the stack, and be
      ready to discuss notice period clearly. If you need 60–90 days to exit a current role, say so early — parks hire
      both immediate and planned joiners, but mismatched expectations waste everyone’s time.
    </p>
    <p>
      Walk-in “immediate” drives still need the same verification steps as portal jobs. Confirm the building and time
      window the morning of the drive, then follow
      <a href="/guides/walk-in-interview-tips-infopark/">walk-in tips</a>.
    </p>

    <h2>9. After you apply — what good follow-through looks like</h2>
    <p>
      Continue applying to other verified roles while you wait. A healthy weekly rhythm for experienced candidates is a
      focused shortlist rather than hundreds of identical mails. For freshers, combine portal applies with project
      polish and mock interviews. Revisit
      <a href="/guides/kerala-it-hiring-this-week/">Kerala IT hiring this week</a>
      for editorial context on which role families are active.
    </p>
    <p>
      If you get a call from a number that is not on the company site, ask for the recruiter’s official email and call
      back using a published office line. That single habit prevents many fake-HR scams during busy hiring weeks.
    </p>

    <h2>Quick checklist</h2>
    <ul>
      <li>Confirm the role on the Infopark or Technopark portal (or company careers page).</li>
      <li>Note the last date to apply and the apply method.</li>
      <li>Send a tailored PDF resume — never pay a fee to apply.</li>
      <li>Save confirmation and portal URL for your records.</li>
      <li>Use InfoparkDaily <a href="/news/">News</a> for campus context, not as a substitute for official verification.</li>
    </ul>
    """,
    """
        <li><a href="/guides/resume-guide-kerala-it-jobs/">Resume guide for Kerala IT jobs</a></li>
        <li><a href="/guides/interview-preparation-kerala-it/">Interview preparation guide</a></li>
        <li><a href="/guides/kerala-it-salary-guide/">Salary expectations in Kerala IT parks</a></li>
        <li><a href="/guides/fresher-guide-kochi-it-parks/">Fresher guide for Kochi IT parks</a></li>
        <li><a href="/guides/walk-in-interview-tips-infopark/">Walk-in interview tips</a></li>
        <li><a href="/guides/verify-jobs-before-you-apply/">Verify jobs before you apply</a></li>
    """,
)
PAGES.append(
    (
        "guides/how-to-apply-infopark-technopark-jobs/index.html",
        wrap(
            "/guides/how-to-apply-infopark-technopark-jobs/",
            "How to Apply for Infopark & Technopark Jobs | InfoparkDaily",
            "Step-by-step guide to finding and applying for Infopark Kochi and Technopark Trivandrum jobs — portals, resumes, verification, and safe apply tips.",
            "How to Apply for Infopark & Technopark Jobs",
            g1,
        ),
    )
)

# --- Guide 2 ---
g2 = article(
    "Fresher guide",
    "Freshers · Kochi IT",
    "Fresher guide for Kochi IT parks",
    "5 August 2026",
    "12 min read",
    "Starting a career from Infopark Kochi or nearby Kerala parks is realistic — if you treat hiring like a process, not a lottery. This fresher guide explains what companies typically look for, how internships fit in, and how to use InfoparkDaily without confusing us with the employer.",
    """
    <h2>What “fresher-friendly” usually means</h2>
    <p>
      In Infopark job posts, fresher-friendly often means 0–1 year experience, trainee, graduate engineer trainee,
      internship-to-hire, or junior associate titles. Some roles still expect strong fundamentals: data structures for
      developers, basic accounting for finance ops, or clear English for support and BPO-adjacent teams. Read the
      experience line carefully — “Junior” is not always zero experience.
    </p>
    <p>
      On InfoparkDaily, use the fresher-friendly filters and park pages under
      <a href="/jobs/">Jobs</a> and <a href="/infopark-jobs/">Infopark Jobs</a>. Listings change quickly, so always
      re-check the official Infopark or company page before you travel for a walk-in.
    </p>

    <h2>Skills that help you stand out in Kochi</h2>
    <p>
      For software roles, a small portfolio beats a long claim list: two projects with GitHub links, a short demo, and
      the ability to explain trade-offs. For QA, show test cases you wrote. For marketing or content roles common in
      park companies, show campaigns, writing samples, or analytics screenshots you created yourself.
    </p>
    <p>
      Soft skills still matter on campus: punctuality, polite follow-ups, and honesty about what you have not learned
      yet. Interviewers in Infopark companies see hundreds of identical resumes — clarity and ownership win more than
      buzzword stuffing.
    </p>

    <!--IPD_AD_MID-->
    <h2>Internships, apprenticeships, and first offers</h2>
    <p>
      Many Kerala IT companies use internships or apprenticeships as a screening path. Treat them seriously: ask about
      stipend, duration, conversion criteria, and working hours in writing. If a “training institute” asks for large
      fees to place you inside Infopark, step back — that is not how official park hiring works.
    </p>
    <p>
      When you receive an offer, verify the company legal name, joining location (Phase 1 / Phase 2 / other campus),
      and HR email domain. Compare it with the careers page and with what you saw on the Infopark portal. Our
      <a href="/guides/verify-jobs-before-you-apply/">verification guide</a> covers common fraud patterns.
    </p>

    <h2>A weekly rhythm that works</h2>
    <p>
      Pick three target role families (for example Java, QA, and support). Each week: update your resume once, apply to
      a focused set of open roles, practise one interview topic, and review walk-in notices. Use
      <a href="/guides/kerala-it-hiring-this-week/">Kerala IT hiring this week</a> for editorial context and
      <a href="/news/">News</a> for campus developments that affect mobility and hiring mood.
    </p>
    <p>
      Networking helps, but keep it professional: InfoparkDaily WhatsApp and Instagram channels share alerts; they are
      not HR inboxes. Apply through the method listed on the company or park posting.
    </p>

    <h2>Mindset for the first 90 days of searching</h2>
    <p>
      Rejection is normal in park hiring cycles. Track what failed — missing skill, weak project explanation, or late
      apply — and adjust. Avoid mass-mailing the same PDF to every address you find online; personalised, verified
      applications convert better and keep you safer.
    </p>

    <h2>Education vs proof of skill</h2>
    <p>
      Degrees and university names matter for eligibility filters, but Infopark interviewers usually dig into what you
      can do on day one. If your college project was unfinished, rebuild a smaller version that runs and document it.
      If you completed online courses, keep certificates secondary and put working demos first. Recruiters in Kochi see
      the same certificate logos every week — a short Loom-style walkthrough or GitHub README with screenshots is rarer
      and more convincing.
    </p>
    <p>
      Non-engineering freshers should prepare role-specific proof too: a content calendar you wrote, a support ticket
      simulation, a sales pipeline exercise, or a design case study. The principle is the same across Infopark companies:
      show evidence, not adjectives.
    </p>

    <h2>Where to look beyond one portal</h2>
    <p>
      Start with Infopark and Technopark job pages, then company careers sites linked from those listings. InfoparkDaily
      digests help you scan faster on <a href="/jobs/">Jobs</a>, but the apply action should still land on an official
      channel. Campus placement cells and college alumni groups can tip you off to drives — still verify the notice
      before you travel.
    </p>
    <p>
      Cyberpark Calicut openings matter if you can relocate or already live in North Kerala. Treat multi-park search as
      parallel tracks with separate trackers so deadlines do not collide. Our
      <a href="/guides/how-to-apply-infopark-technopark-jobs/">how to apply guide</a>
      covers the shared process across parks.
    </p>

    <h2>Interview themes freshers should practise</h2>
    <p>
      Expect a mix of HR screening and basics: why this company, why Kochi, what you built, and how you debug. For
      developer roles, revise one language deeply instead of five languages shallowly. For QA, practise writing clear
      bug reports. For operations and support, practise calm explanations under time pressure.
    </p>
    <p>
      Ask thoughtful questions at the end: team size, training plan, on-site expectations, and probation criteria.
      Questions show seriousness. Avoid leading with salary in the first minute unless the interviewer opens that topic;
      be ready with a researched range for Kerala junior roles when asked.
    </p>

    <h2>Money, bonds, and training offers</h2>
    <p>
      Read offer letters carefully. Clarify probation length, notice period, and any training bond before you resign
      from another commitment. If a “placement partner” demands fees for Infopark jobs, treat it as a red flag and read
      <a href="/guides/verify-jobs-before-you-apply/">Verify jobs before you apply</a>.
      Legitimate companies hire through HR and published careers flows — not cash-on-UPI shortcuts.
    </p>
    """,
    """
        <li><a href="/guides/how-to-apply-infopark-technopark-jobs/">How to apply for Infopark &amp; Technopark jobs</a></li>
        <li><a href="/guides/resume-guide-kerala-it-jobs/">Resume guide for Kerala IT jobs</a></li>
        <li><a href="/guides/interview-preparation-kerala-it/">Interview preparation guide</a></li>
        <li><a href="/guides/career-switch-into-kerala-it/">Switching careers into Kerala IT</a></li>
        <li><a href="/guides/walk-in-interview-tips-infopark/">Walk-in interview tips</a></li>
        <li><a href="/guides/verify-jobs-before-you-apply/">Verify jobs before you apply</a></li>
    """,
)
PAGES.append(
    (
        "guides/fresher-guide-kochi-it-parks/index.html",
        wrap(
            "/guides/fresher-guide-kochi-it-parks/",
            "Fresher Guide for Kochi IT Parks | InfoparkDaily",
            "Practical fresher guide for Infopark Kochi and Kerala IT park careers — skills, internships, first offers, and a weekly job-search rhythm.",
            "Fresher Guide for Kochi IT Parks",
            g2,
        ),
    )
)

# --- Guide 3 ---
g3 = article(
    "Walk-in tips",
    "Walk-ins · Infopark Kochi",
    "Walk-in interview tips for Infopark",
    "5 August 2026",
    "8 min read",
    "Walk-in interviews are common across Infopark Kochi. They reward preparation and punctuality — and punish last-minute WhatsApp forwards that skip the official notice. Use this checklist before you enter campus.",
    """
    <h2>Confirm the walk-in is real</h2>
    <p>
      Before you leave home, open the original notice: company name, building, date, time window, roles, and documents
      required. Prefer links from the Infopark jobs portal or the employer’s careers page. If you only have a forwarded
      image with no company domain or park reference, verify first using
      <a href="/guides/verify-jobs-before-you-apply/">our safety checklist</a>.
    </p>
    <p>
      InfoparkDaily may highlight walk-ins on <a href="/jobs/">Jobs</a> and social channels. We still expect you to
      confirm venue and timing on an official source the morning of the interview.
    </p>

    <h2>What to carry</h2>
    <p>
      Bring multiple printed resumes, a government ID, a notepad, and any certificates listed in the notice (degree,
      experience letters, or portfolio printouts). Keep files on your phone as PDF backups. Arrive with a charged
      battery — some processes include online forms on site.
    </p>
    <p>
      Dress for a professional tech campus: neat formal or business casual is safer than party wear or overly casual
      sportswear unless the notice says otherwise.
    </p>

    <h2>Timing and campus etiquette</h2>
    <p>
      Reach 20–30 minutes early. Infopark campuses are large; wrong tower or wrong gate wastes your slot. Follow
      security instructions, wear any visitor pass given, and stay in the waiting area assigned by HR.
    </p>
    <p>
      Be polite with coordinators and other candidates. Loud phone calls, arguing about queues, or photographing
      restricted areas can end your chance quickly. If HR says the walk-in is closed for the day, ask whether online
      apply is still open — then leave gracefully.
    </p>

    <!--IPD_AD_MID-->
    <h2>During the interview</h2>
    <p>
      Listen fully before answering. For technical rounds, talk through your approach; for HR rounds, be honest about
      notice period, expected CTC range, and willingness to work on-site. Do not invent experience. If you do not know
      something, say what you would do to learn it.
    </p>
    <p>
      After the round, note interviewer names if shared and any next-step timeline. One thank-you email to the official
      HR address (if provided) is enough — do not spam personal numbers collected from strangers.
    </p>

    <h2>After the walk-in</h2>
    <p>
      Update your tracker and continue applying to other verified openings the same week. Walk-ins are one channel,
      not the only path. Pair them with portal applications described in
      <a href="/guides/how-to-apply-infopark-technopark-jobs/">How to apply</a>.
    </p>

    <h2>Common walk-in mistakes we see</h2>
    <p>
      Arriving without enough printed resumes, relying only on a phone gallery screenshot of the notice, and joining
      the wrong queue for a different company’s drive are the most frequent problems. Another mistake is arguing with
      security about visitor rules — Infopark campuses run controlled entry for a reason. Plan your route the night
      before, including bus or metro connections if you do not drive.
    </p>
    <p>
      Do not post live location tags that reveal badge numbers or restricted floors. Do not share other candidates’
      resumes from a shared table. Keep your documents in a simple folder so you are not scrambling when your name is
      called.
    </p>

    <h2>Group discussions and written tests on site</h2>
    <p>
      Some Infopark walk-ins include a short written test or group discussion before technical rounds. Read
      instructions fully. In group discussions, make a few clear points instead of dominating the room. In written
      tests, manage time — unanswered easy questions hurt more than one incomplete hard question.
    </p>
    <p>
      If the process spans multiple hours, carry water and a light snack if allowed, and keep your phone on silent.
      Coordinators notice candidates who stay organised under waiting-room stress.
    </p>

    <h2>When you should skip a walk-in</h2>
    <p>
      Skip drives that demand upfront cash, refuse to name the employer clearly, or ask you to leave original degree
      certificates with a stranger “for verification”. Skip venues that do not match any published Infopark or company
      address. Your safety and documents matter more than one uncertain opportunity — use
      <a href="/guides/verify-jobs-before-you-apply/">our verification guide</a>
      whenever something feels off.
    </p>
    """,
    """
        <li><a href="/guides/interview-preparation-kerala-it/">Interview preparation guide</a></li>
        <li><a href="/guides/how-to-apply-infopark-technopark-jobs/">How to apply for Infopark &amp; Technopark jobs</a></li>
        <li><a href="/guides/working-in-infopark-kochi-life/">Working in Infopark Kochi</a></li>
        <li><a href="/guides/fresher-guide-kochi-it-parks/">Fresher guide for Kochi IT parks</a></li>
        <li><a href="/guides/verify-jobs-before-you-apply/">Verify jobs before you apply</a></li>
    """,
)
PAGES.append(
    (
        "guides/walk-in-interview-tips-infopark/index.html",
        wrap(
            "/guides/walk-in-interview-tips-infopark/",
            "Walk-in Interview Tips for Infopark | InfoparkDaily",
            "Infopark Kochi walk-in interview tips: verify the notice, what to carry, campus etiquette, and how to follow up safely.",
            "Walk-in Interview Tips for Infopark",
            g3,
        ),
    )
)

# --- Guide 4 ---
g4 = article(
    "Hiring this week",
    "Editorial · Weekly",
    "Kerala IT hiring this week",
    "5 August 2026",
    "7 min read",
    "This is InfoparkDaily’s editorial snapshot of hiring themes across Kerala IT parks — not a raw dump of every job card. We update it to help candidates prioritise, and to explain what we are seeing in public Infopark, Technopark, and Cyberpark listings.",
    """
    <h2>What we are seeing right now</h2>
    <p>
      Recent Infopark portal activity continues to mix experienced engineering roles (full-stack, data, DevOps, AI/ML)
      with business functions such as HR, marketing, and business development. Immediate-requirement posts still appear
      often — those usually reward candidates who apply the same day with a tailored resume.
    </p>
    <p>
      Fresher and trainee openings remain available but competitive. Candidates who show projects, internships, or clear
      fundamentals tend to progress further than those who only list course names. Browse live openings on
      <a href="/jobs/">Jobs</a> and park-specific pages, then verify on the official portal before you apply.
    </p>

    <h2>How to use this editorial</h2>
    <p>
      Treat this page as orientation: which skill families are active, which parks to watch, and which safety habits to
      keep. It is not a promise that any single company will hire you. InfoparkDaily is not the employer and does not
      control Infopark or Technopark recruitment decisions.
    </p>
    <p>
      For process help, read
      <a href="/guides/how-to-apply-infopark-technopark-jobs/">How to apply</a>.
      For first-job seekers, use the
      <a href="/guides/fresher-guide-kochi-it-parks/">fresher guide</a>.
      For campus walk-ins, use
      <a href="/guides/walk-in-interview-tips-infopark/">walk-in tips</a>.
    </p>

    <!--IPD_AD_MID-->
    <h2>Candidate priorities this week</h2>
    <ul>
      <li>Apply early to “immediate requirement” posts with matching skills.</li>
      <li>Re-check deadlines daily — park listings move to closed quickly.</li>
      <li>Prefer official portals and company career sites over unpaid “referral agent” chats.</li>
      <li>Follow <a href="/news/">InfoparkDaily News</a> for campus context that can affect commuting and hiring seasons.</li>
    </ul>

    <h2>For companies hiring in Kerala parks</h2>
    <p>
      If you are an authorised company contact, share openings through
      <a href="/recruit/">Recruit</a>. We review before publishing. Candidates still apply on your official channel —
      that keeps trust high for everyone.
    </p>

    <h2>Update note</h2>
    <p>
      We refresh this editorial as public hiring patterns shift. For the complete live list, always use
      <a href="/jobs/">Jobs</a> rather than relying only on this summary.
    </p>

    <h2>Park-by-park notes</h2>
    <p>
      <strong>Infopark Kochi</strong> remains the densest feed we digest day to day: product companies, services firms,
      and growing AI/data teams. Phase and building details matter for walk-ins — always confirm the tower on the
      official notice. <strong>Technopark Trivandrum</strong> continues to show a mix of product engineering and
      enterprise delivery roles; candidates relocating from Kochi should plan commute and joining location early.
      <strong>Cyberpark</strong> listings are fewer on some weeks but still worth a dedicated filter if you are based
      in Kozhikode or open to move.
    </p>
    <p>
      Cross-park applicants should keep separate shortlists so Technopark deadlines do not bury Infopark walk-in times.
      Use park pages on InfoparkDaily —
      <a href="/infopark-jobs/">Infopark</a>,
      <a href="/technopark-jobs/">Technopark</a>,
      <a href="/cyberpark-jobs/">Cyberpark</a>
      — then verify on each park’s official site.
    </p>

    <h2>Skills in demand (editorial view)</h2>
    <p>
      On the engineering side, we continue to see full-stack JavaScript/TypeScript, Java/.NET delivery roles, cloud and
      DevOps support, and selective AI/ML or data openings that expect stronger fundamentals than a short course title.
      On the business side, HR recruiters, inside sales, digital marketing, and customer success roles appear in bursts —
      often with on-site expectations.
    </p>
    <p>
      That mix means candidates should not chase every trend label. Align your resume to one or two families, then apply
      deeply. Freshers should pair this editorial with the
      <a href="/guides/fresher-guide-kochi-it-parks/">fresher guide</a>
      instead of applying blindly to senior “immediate” posts.
    </p>

    <h2>What we will not do on this page</h2>
    <p>
      We will not paste dozens of scraped job titles without commentary, and we will not pretend InfoparkDaily is the
      employer. Thin list pages hurt readers and weaken trust with advertisers and platforms. Our job here is editorial
      clarity: what to prioritise, what to verify, and where to click next.
    </p>
    """,
    """
        <li><a href="/guides/kerala-it-salary-guide/">Salary expectations in Kerala IT parks</a></li>
        <li><a href="/guides/how-to-apply-infopark-technopark-jobs/">How to apply for Infopark &amp; Technopark jobs</a></li>
        <li><a href="/guides/resume-guide-kerala-it-jobs/">Resume guide for Kerala IT jobs</a></li>
        <li><a href="/guides/fresher-guide-kochi-it-parks/">Fresher guide for Kochi IT parks</a></li>
        <li><a href="/guides/verify-jobs-before-you-apply/">Verify jobs before you apply</a></li>
    """,
)
PAGES.append(
    (
        "guides/kerala-it-hiring-this-week/index.html",
        wrap(
            "/guides/kerala-it-hiring-this-week/",
            "Kerala IT Hiring This Week | InfoparkDaily",
            "Weekly InfoparkDaily editorial on Kerala IT park hiring themes across Infopark, Technopark, and Cyberpark — priorities for candidates and recruiters.",
            "Kerala IT Hiring This Week",
            g4,
        ),
    )
)

# --- Guide 5 ---
g5 = article(
    "Verify first",
    "Safety · Candidates",
    "Verify jobs before you apply",
    "5 August 2026",
    "7 min read",
    "Job scams follow real hiring seasons. When Infopark and Technopark activity rises, fake “HR” chats rise too. This guide is InfoparkDaily’s verification checklist so you protect your money, documents, and time.",
    """
    <h2>Golden rule</h2>
    <p>
      <strong>Never pay</strong> for a job application, interview slot, offer letter, or “Infopark entry fee”. Legitimate
      park companies do not collect candidate fees through random UPI IDs. InfoparkDaily never charges candidates to
      apply.
    </p>

    <h2>Verify the company</h2>
    <p>
      Match the company name on the listing with the Infopark / Technopark portal entry or the employer’s official
      website. Check that email domains look like the company (not free inboxes pretending to be HR). If InfoparkDaily
      shows a company profile, use <em>Company website</em> only when it opens the real employer domain.
    </p>
    <p>
      Be careful with lookalike names, edited screenshots, and “urgent joining bonus after fee” stories. When unsure,
      call a published office number from the company website — not a number pasted only in a WhatsApp forward.
    </p>

    <h2>Verify the role and venue</h2>
    <p>
      Confirm role title, experience, last date, and apply method on an official page. For walk-ins, confirm building
      and time the same morning. If someone asks you to meet in a hotel lobby or unrelated café to “collect cash for
      processing”, walk away.
    </p>

    <!--IPD_AD_MID-->
    <h2>Protect your documents</h2>
    <p>
      Do not share OTPs, banking passwords, Aadhaar XML, or signed blank papers. Share resume and certificates only
      through the apply channel you trust. Watermark portfolio samples if needed. Keep a log of where you applied.
    </p>

    <h2>How InfoparkDaily fits in</h2>
    <p>
      We publish digests from public sources and reviewed <a href="/recruit/">Recruit</a> requests to help the Kerala
      IT community. We are <strong>not the employer</strong> and cannot guarantee every third-party listing forever —
      details change. Read our <a href="/privacy/">Privacy</a> and <a href="/terms/">Terms</a>, and report suspicious
      posts via <a href="/contact/">Contact</a>.
    </p>
    <p>
      Next steps: learn the apply flow in
      <a href="/guides/how-to-apply-infopark-technopark-jobs/">How to apply</a>,
      then browse <a href="/jobs/">open jobs</a>.
    </p>

    <h2>Red flags in messages and posters</h2>
    <p>
      Watch for urgency paired with payment (“pay today to confirm interview”), secrecy (“delete this chat after
      paying”), and authority cosplay (“Infopark chairman office selected you”). Real park hiring uses company names,
      published buildings, and normal HR processes. Edited logos and blurred seals on offer PDFs are common scam props.
    </p>
    <p>
      Also be wary of “work from home data entry for Infopark companies” ads that ask for registration fees. Infopark
      tenants hire through their own HR teams; random Telegram channels are not a substitute for careers pages.
    </p>

    <h2>A five-minute verification routine</h2>
    <p>
      Before you share documents or travel: (1) find the company on the park portal or official website,
      (2) match the role title and deadline, (3) confirm the apply email domain or form URL, (4) search the company name
      plus “scam” or “fraud” for recent reports without panicking at every forum post, and (5) ask yourself whether any
      step requires money. If step five is yes, stop.
    </p>
    <p>
      For walk-ins, add a sixth step: confirm the building with a published notice the same morning. Carry that habit
      into every busy hiring week covered in
      <a href="/guides/kerala-it-hiring-this-week/">Kerala IT hiring this week</a>.
    </p>

    <h2>If you already paid or shared too much</h2>
    <p>
      Stop further payments immediately. Preserve chat logs, UPI references, and phone numbers. Report to cybercrime
      portals and local police as appropriate, and warn your college or peer groups with facts — not panic forwards.
      Change passwords if you shared OTPs. Contact the real company only through published channels if you need to ask
      whether a message was genuine.
    </p>
    <p>
      InfoparkDaily can help the community by taking down or correcting suspicious posts you report through
      <a href="/contact/">Contact</a>, but we cannot recover money or reverse bank transfers. Prevention is the real
      protection — verify first, apply second.
    </p>
    """,
    """
        <li><a href="/guides/career-switch-into-kerala-it/">Switching careers into Kerala IT</a></li>
        <li><a href="/guides/offer-letter-notice-period-guide/">Offer letters &amp; notice periods</a></li>
        <li><a href="/guides/how-to-apply-infopark-technopark-jobs/">How to apply for Infopark &amp; Technopark jobs</a></li>
        <li><a href="/guides/fresher-guide-kochi-it-parks/">Fresher guide for Kochi IT parks</a></li>
        <li><a href="/guides/walk-in-interview-tips-infopark/">Walk-in interview tips</a></li>
    """,
)
PAGES.append(
    (
        "guides/verify-jobs-before-you-apply/index.html",
        wrap(
            "/guides/verify-jobs-before-you-apply/",
            "Verify Jobs Before You Apply | InfoparkDaily",
            "Job safety checklist for Kerala IT park candidates — spot scams, verify companies, protect documents, and apply without paying fees.",
            "Verify Jobs Before You Apply",
            g5,
        ),
    )
)


# --- Guide 6 ---
g6 = article(
    "Salary guide",
    "Pay &amp; negotiation · Kerala IT",
    "Salary expectations in Kerala IT parks",
    "15 August 2026",
    "11 min read",
    "Salary is the question every candidate asks and almost no listing answers. This guide explains how pay is structured in Infopark Kochi and Technopark Trivandrum companies, why Kerala bands differ from Bengaluru or Hyderabad, how to read a CTC breakdown, and how to negotiate without losing the offer.",
    """
    <h2>Why Kerala park salaries look different</h2>
    <p>
      Candidates often compare a Kochi offer directly against a Bengaluru number and conclude they are underpaid. The
      comparison is incomplete. Kerala IT park salaries are shaped by three things: the cost base of running an office
      in Kakkanad or Kazhakkoottam, the type of work the company does, and whether the employer is a product company,
      a services firm, or an offshore delivery centre for a foreign client.
    </p>
    <p>
      Product companies and global capability centres generally pay more than local services firms for the same title,
      because their revenue per engineer is higher. Services and staffing-led companies compete on cost, so their bands
      are tighter. Two people with the same years of experience and the same job title can sit in very different bands
      simply because of the business model behind the role.
    </p>
    <p>
      The practical takeaway: never benchmark on job title alone. Benchmark on company type, the client the team serves,
      and the skill scarcity in Kerala for that specific stack.
    </p>

    <h2>Understanding CTC versus what reaches your account</h2>
    <p>
      Indian offers are quoted as CTC — cost to company. CTC is not salary. It is everything the employer spends on you
      in a year, and a meaningful slice of it never appears in your monthly bank credit. A typical Kerala park offer
      breaks into basic pay, house rent allowance, special allowance, employer provident fund contribution, gratuity
      provisioning, and sometimes insurance premium and a variable or performance component.
    </p>
    <p>
      Two deductions surprise freshers most. First, the employer PF contribution is counted inside CTC but goes into
      your PF account, not your salary account. Second, the variable component is conditional — it depends on company
      performance, project ratings, or client renewals, and it may be paid quarterly or annually rather than monthly.
      An offer with a large variable slice looks bigger on paper than it feels in month one.
    </p>
    <p>
      Before you accept, ask HR for the full annual breakdown in writing and calculate your expected monthly in-hand
      after PF, professional tax, and income tax. A reasonable question to ask directly is: what will my net monthly
      credit be in the first month, assuming no variable payout? Good HR teams answer this without hesitation.
    </p>

    <!--IPD_AD_MID-->
    <h2>How experience bands typically progress</h2>
    <p>
      Kerala park hiring loosely follows four stages. Trainee and fresher roles cover the first year, often with a
      training or probation period where pay is lower and confirmation depends on assessment. The junior or associate
      stage covers roughly one to three years, where you own tasks but not design decisions. The mid stage, roughly
      three to seven years, is where compensation moves fastest because you begin owning modules, mentoring, and client
      communication. Senior, lead, and architect roles beyond that reward scope and accountability more than raw coding
      speed.
    </p>
    <p>
      The largest single jump most people experience is not a yearly increment. It is a role change — moving from
      execution to ownership, or moving from a services firm to a product company. If your pay has been flat for three
      years in the same seat, the problem is usually scope, not the appraisal cycle.
    </p>
    <p>
      Skill scarcity also matters. In any given hiring season, a handful of stacks are genuinely hard to fill in Kerala.
      Those roles carry a premium. Widely available skills, however well you know them, do not. This is why our
      <a href="/guides/kerala-it-hiring-this-week/">weekly hiring editorial</a> is worth reading alongside job cards.
    </p>

    <h2>Researching a realistic number before the call</h2>
    <p>
      Walking into a salary discussion without a researched range is the most common self-inflicted wound. Do this
      before your first HR round. Look at what the same role is asking for across several listings on
      <a href="/jobs/">Jobs</a> and the official park portals. Note the experience band and the stack, not just the
      title. Ask two or three people already working in similar Kochi or Trivandrum companies what a fair range looks
      like — most will answer a range even if they will not share their own figure.
    </p>
    <p>
      Then build three numbers for yourself: the figure you would be delighted with, the figure you would accept
      comfortably, and the figure below which you would decline. Knowing the third number in advance is what keeps a
      negotiation calm, because you are no longer guessing under pressure.
    </p>

    <h2>Answering the expected CTC question</h2>
    <p>
      Most Kerala HR screens ask for current CTC and expected CTC early. You do not have to fire a single number
      immediately. A reasonable response is to give a range anchored to your research and to say it is flexible for the
      right role and growth path. If you are a fresher with no current CTC, say so plainly and ask what band the company
      has budgeted for the position — many will tell you.
    </p>
    <p>
      Be honest about your current compensation. Inflating it is easy to detect during background verification, and a
      withdrawn offer over an inflated number is a far worse outcome than a modest hike. If your current pay is low
      relative to your skill, argue from market value and your demonstrated work rather than from a percentage on top
      of an old salary.
    </p>

    <h2>Negotiating without damaging the relationship</h2>
    <p>
      Negotiation in Kerala park companies works best when it is specific, respectful, and single-round. Once you have
      the offer, respond with appreciation, then make one clear counter with a reason attached. Reasons that land well
      include a competing offer, a scarce skill the team explicitly needs, relocation cost, or a notice-period buyout
      you must fund yourself.
    </p>
    <p>
      Reasons that rarely land include personal expenses, comparisons to unrelated industries, and vague claims that
      the offer is unfair. If the base cannot move, ask about alternatives that often have more flexibility: joining
      bonus, earlier appraisal review, higher band on confirmation, certification sponsorship, or a written commitment
      on role scope. Get whatever is agreed into the offer letter or an email from HR, not a verbal promise in a call.
    </p>
    <p>
      Do not negotiate through multiple channels at once, and do not use another candidate as leverage. Kerala's IT
      hiring community is small — recruiters across Infopark and Technopark companies talk to each other more than
      candidates assume.
    </p>

    <h2>Signals that a compensation offer is unhealthy</h2>
    <p>
      A few patterns should slow you down. An unusually high number for a role that normally pays far less, paired with
      vague responsibilities, often means aggressive sales targets or unpaid overtime rather than generosity. A refusal
      to put the breakdown in writing is a serious warning. So is a training bond with a large penalty attached to an
      entry-level role, particularly when combined with a training fee you are asked to pay.
    </p>
    <p>
      Any process that asks you for money is not a job offer. Read
      <a href="/guides/verify-jobs-before-you-apply/">Verify jobs before you apply</a>
      before you share documents or pay anything to anyone claiming to place you inside a park company.
    </p>

    <h2>Thinking beyond the number</h2>
    <p>
      Two offers with identical CTC can differ enormously in value. Consider the commute, because an hour saved each
      way in Kochi traffic is real time returned to your life. Consider whether the work builds a skill that is
      portable, or a proprietary internal tool that will not transfer. Consider the manager, the learning budget, and
      whether the team ships to real users.
    </p>
    <p>
      Early in a career, the compounding value of good mentorship and modern stack exposure usually beats a modest pay
      difference. Later, when your skills are established, the calculus shifts toward compensation and scope. Be honest
      with yourself about which stage you are in.
    </p>

    <h2>A short pre-acceptance checklist</h2>
    <ul>
      <li>Written CTC breakdown with fixed and variable components separated.</li>
      <li>Expected first-month net credit confirmed by HR.</li>
      <li>Probation length, confirmation criteria, and appraisal cycle stated.</li>
      <li>Notice period and any bond or penalty clause read in full.</li>
      <li>Work location, shift, and on-site expectation in writing.</li>
      <li>Every verbal promise repeated in the offer letter or an HR email.</li>
    </ul>
    <p>
      Once you are comfortable, the next stage is the paperwork itself — covered in
      <a href="/guides/offer-letter-notice-period-guide/">Offer letters, notice periods and background checks</a>.
    </p>
    """,
    """
        <li><a href="/guides/offer-letter-notice-period-guide/">Offer letters &amp; notice periods</a></li>
        <li><a href="/guides/resume-guide-kerala-it-jobs/">Resume guide for Kerala IT jobs</a></li>
        <li><a href="/guides/interview-preparation-kerala-it/">Interview preparation guide</a></li>
        <li><a href="/guides/verify-jobs-before-you-apply/">Verify jobs before you apply</a></li>
    """,
)
PAGES.append(
    (
        "guides/kerala-it-salary-guide/index.html",
        wrap(
            "/guides/kerala-it-salary-guide/",
            "Salary Expectations in Kerala IT Parks | InfoparkDaily",
            "How salaries work in Infopark Kochi and Technopark companies — CTC breakdowns, experience bands, negotiation tactics, and red flags before you accept.",
            "Salary Expectations in Kerala IT Parks",
            g6,
        ),
    )
)

# --- Guide 7 ---
g7 = article(
    "Resume guide",
    "Applications · Kerala IT",
    "Resume guide for Kerala IT jobs",
    "15 August 2026",
    "16 min read",
    "Most resumes rejected by Infopark and Technopark companies are not rejected for lack of talent. They are rejected because a busy recruiter could not find the answer to one question in the first ten seconds: can this person do the job we posted? This guide shows how to write a resume that answers it — including how to make an ATS-friendly version that survives automated screening.",
    """
    <h2>How your resume is actually read</h2>
    <p>
      Picture the reality on the other side. A recruiter at a Kakkanad services company posts one opening and receives
      a few hundred applications in a week. They are not reading your resume — they are scanning it against the
      requirement list they were given by the delivery manager. The first pass takes seconds and answers one question:
      does this person plausibly match?
    </p>
    <p>
      Everything in this guide follows from that. Your resume is not an autobiography and not a tribute to your effort.
      It is a targeted argument that you match a specific posting. If a recruiter has to dig for evidence, they move to
      the next file, and your genuine ability never enters the conversation.
    </p>

    <h2>What ATS-friendly means</h2>
    <p>
      ATS means Applicant Tracking System — software many Infopark and Technopark companies use to store applications,
      filter by keywords, and rank candidates before a human opens the file. If the system cannot parse your resume
      cleanly, your application may never reach a recruiter even when you are a strong match.
    </p>
    <p>
      An ATS-friendly resume is not a different document from a human-readable one. It is a clean, single-column file
      with standard headings, real words for skills, and no decorative layout tricks. Build one version that works for
      both the software and the person — that is the version you should send almost everywhere.
    </p>

    <h2>ATS-friendly conditions — the checklist</h2>
    <ul>
      <li>Use a single-column layout. No sidebars, tables for the whole page, or text boxes.</li>
      <li>Use standard section headings: Summary, Skills, Experience, Projects, Education, Certifications.</li>
      <li>Write in a common font (Calibri, Arial, Georgia, or similar). Avoid icon fonts and symbol fonts.</li>
      <li>Do not put important text in headers, footers, or page margins — many parsers skip those areas.</li>
      <li>Do not use photos, skill bars, pie charts, or graphics that hide text.</li>
      <li>Spell technology names the way job posts spell them: React, not “frontend JS library”.</li>
      <li>Include both the acronym and the full form once when useful: “SQL (Structured Query Language)”.</li>
      <li>Use months and years for dates (Jan 2024 – Present), not only years.</li>
      <li>Save as a text-based PDF or .docx when asked. Avoid scanned images of a resume.</li>
      <li>Do not password-protect the file or lock editing when the portal asks for Word upload.</li>
    </ul>

    <h2>How to make an ATS-friendly resume step by step</h2>
    <p>
      <strong>Step 1 — Start from a plain document.</strong> Open Word, Google Docs, or a simple Markdown-to-PDF flow.
      Do not start from a Canva template with two columns and coloured panels. Those look polished on Instagram and
      fail quietly in ATS portals used by Kerala park companies.
    </p>
    <p>
      <strong>Step 2 — Put contact details in the body.</strong> Name on the first line, then phone, email, city
      (Kochi / Trivandrum), LinkedIn, and GitHub if relevant. Avoid putting the only phone number in a header field.
    </p>
    <p>
      <strong>Step 3 — Write a short summary with role keywords.</strong> Two or three lines naming your role family
      and main stack — for example “Fresher Java developer with Spring Boot projects” or “3 years React + Node,
      Infopark Kochi”. This gives the parser and the human the same first signal.
    </p>
    <p>
      <strong>Step 4 — Build a skills line from the job description.</strong> Copy the must-have skills from the
      posting into a draft list, then keep only the ones you can honestly defend. Place that skills section near the
      top so both ATS keyword filters and recruiters see it early.
    </p>
    <p>
      <strong>Step 5 — Write experience and projects as plain bullets.</strong> Start each bullet with a verb and include
      tools by name. Prefer “Built REST APIs with Node.js and PostgreSQL” over “Responsible for backend work”.
    </p>
    <p>
      <strong>Step 6 — Export carefully.</strong> In Google Docs or Word, export PDF using the built-in export, not a
      screenshot or print-to-image. Then test: select all text in the PDF and paste into Notepad. If the order is
      jumbled or words are missing, the ATS will struggle too — simplify the layout and export again.
    </p>
    <p>
      <strong>Step 7 — Name the file for humans.</strong> Use <code>YourName_Role_Company.pdf</code>. ATS systems
      store the file name; recruiters search by it. Avoid <code>resume_final_new2.pdf</code>.
    </p>

    <h2>The structure that works</h2>
    <p>
      Use a single-column layout in a plain, readable font. Skip photographs, decorative sidebars, skill rating bars,
      and colour blocks. They consume space, break applicant tracking systems, and communicate nothing verifiable. A
      rating that claims eight out of ten in Python means nothing to a reviewer who has no idea what your scale is.
    </p>
    <p>
      Open with your name, phone number, professional email address, city, and links to GitHub, LinkedIn, or a
      portfolio where relevant. Follow with a two-line summary that names the role family and your experience level.
      Then list skills, experience, projects, and education. Freshers should place projects and internships above
      education only when the projects are genuinely substantial; otherwise education first is fine.
    </p>
    <p>
      One page is right for freshers and candidates up to roughly three years. Two pages are acceptable beyond that.
      Three pages almost never help — long resumes usually signal an inability to prioritise rather than a wealth of
      experience.
    </p>

    <!--IPD_AD_MID-->
    <h2>Writing bullets that carry evidence</h2>
    <p>
      The single biggest upgrade available to most candidates is converting responsibility statements into outcome
      statements. A responsibility statement says what you were assigned. An outcome statement says what changed
      because you were there.
    </p>
    <p>
      Compare two versions of the same work. The weak version reads: responsible for backend development and bug
      fixing. The strong version reads: built and maintained six REST endpoints for the billing module in Node and
      Postgres, cutting invoice generation time from about forty seconds to under five. The second version is the same
      job, described in a way a reviewer can evaluate.
    </p>
    <p>
      You do not need dramatic numbers. Volume, time saved, error reduction, user counts, ticket throughput, and team
      size are all legitimate. If you truly cannot quantify something, describe the technical decision you made and
      why. Judgement is evidence too.
    </p>

    <h2>Getting the skills section right</h2>
    <p>
      Group skills into honest tiers rather than dumping every technology you have encountered into one line. Separate
      what you can work with independently from what you have used in a supporting capacity. A recruiter who sees
      fifteen frameworks listed flatly assumes surface knowledge of all fifteen, which weakens genuine strengths.
    </p>
    <p>
      Only list what you can discuss for five minutes under questioning. Kerala park interviews frequently open by
      picking one item from the skills line and drilling into it. Nothing damages credibility faster than being unable
      to explain something you claimed on page one.
    </p>
    <p>
      Mirror the vocabulary used in the posting where it is truthful. If the listing says .NET Core and your resume
      says Microsoft technologies, you have created unnecessary work for the person scanning. Matching real terms is
      not keyword stuffing; it is clarity.
    </p>

    <h2>Projects — where freshers win or lose</h2>
    <p>
      For a fresher applying to Infopark or Technopark companies, projects are the entire argument. A college project
      that everyone in your batch submitted is weak evidence. A smaller project that actually runs, has a readable
      repository, and solves something concrete is strong evidence.
    </p>
    <p>
      For each project, state what it does, the stack, your specific contribution if it was a team effort, and one
      interesting problem you solved. Link to a working demo or a repository with a proper README and screenshots.
      Reviewers rarely clone code, but they do open a README, and a well-written one signals professional habits before
      a single line is read.
    </p>
    <p>
      Non-engineering candidates should apply the same principle with different artifacts: a content calendar you
      produced, a campaign with before-and-after metrics, a design case study explaining the decisions, or a support
      workflow you improved. More detail on building this portfolio sits in our
      <a href="/guides/fresher-guide-kochi-it-parks/">fresher guide</a>.
    </p>

    <h2>Tailoring efficiently without rewriting everything</h2>
    <p>
      Full customisation for every application is unrealistic. Instead, maintain two or three base versions aligned to
      the role families you target — for example one for backend engineering, one for QA, one for support. For each
      application, adjust only the summary line, reorder the top three skills, and reorder bullets so the most relevant
      experience appears first.
    </p>
    <p>
      That is roughly five minutes of work per application and it measurably improves response rates. Sending one
      identical file to eighty companies is faster and almost always produces worse outcomes.
    </p>

    <h2>Handling gaps, switches, and short stints honestly</h2>
    <p>
      Career gaps are common and rarely disqualifying on their own. What creates suspicion is an unexplained hole in
      the timeline. Name the period and give a brief, factual reason — health, family responsibility, higher study,
      relocation, or a deliberate upskilling break. If you learned or built something during that time, say so in one
      line and move on.
    </p>
    <p>
      Short stints are similar. One brief role is unremarkable. Several in a row invite questions, so prepare a calm,
      consistent explanation and make sure your resume dates match what background verification will eventually find.
      Never adjust dates to close a gap; discrepancies surface later at the worst possible moment.
    </p>
    <p>
      Candidates moving in from another field should read
      <a href="/guides/career-switch-into-kerala-it/">Switching careers into Kerala IT</a>,
      which covers how to frame transferable experience.
    </p>

    <h2>Formatting and file hygiene</h2>
    <p>
      Always send a PDF unless the employer explicitly asks for a Word document. PDFs preserve layout across devices.
      Name the file so it is identifiable in a crowded inbox — your name, the role, and optionally the company. A file
      called resume final v3 updated is a small but real irritation for the person filing it.
    </p>
    <p>
      Use a professional email address. Keep the phone number active and answer unknown local numbers during a job
      search. Verify that every link works, and check spelling of technology names carefully — writing Javasript or
      MySql on a technical resume undermines the impression instantly.
    </p>

    <h2>What to leave out</h2>
    <p>
      Remove declaration statements, date and signature lines, father's name, marital status, full residential address,
      and date of birth. These are legacy conventions that add no value and expose personal data unnecessarily. Remove
      objective statements that describe what you want from the company; the summary should describe what you offer.
    </p>
    <p>
      Remove school marks once you have a degree, and remove unrelated certificates that dilute the technical picture.
      Every line should earn its place by supporting the argument that you match the role.
    </p>

    <h2>Final review before you send</h2>
    <ul>
      <li>Does the top third of page one prove you match the posting?</li>
      <li>Would paste-from-PDF into Notepad still read in a sensible order (ATS smoke test)?</li>
      <li>Is every bullet an outcome rather than a duty?</li>
      <li>Can you defend every skill listed for five minutes?</li>
      <li>Do all links open, and is the file a cleanly named PDF?</li>
      <li>Is the timeline complete, accurate, and consistent with what verification will show?</li>
      <li>Has someone else proofread it at least once?</li>
    </ul>
    <p>
      When the resume is ready, the next step is the apply process itself — see
      <a href="/guides/how-to-apply-infopark-technopark-jobs/">How to apply for Infopark and Technopark jobs</a>,
      and prepare for the conversation with our
      <a href="/guides/interview-preparation-kerala-it/">interview preparation guide</a>.
    </p>
    """,
    """
        <li><a href="/guides/interview-preparation-kerala-it/">Interview preparation guide</a></li>
        <li><a href="/guides/kerala-it-salary-guide/">Salary expectations in Kerala IT parks</a></li>
        <li><a href="/guides/how-to-apply-infopark-technopark-jobs/">How to apply for Infopark &amp; Technopark jobs</a></li>
        <li><a href="/guides/fresher-guide-kochi-it-parks/">Fresher guide for Kochi IT parks</a></li>
    """,
)
PAGES.append(
    (
        "guides/resume-guide-kerala-it-jobs/index.html",
        wrap(
            "/guides/resume-guide-kerala-it-jobs/",
            "Resume Guide for Kerala IT Jobs | InfoparkDaily",
            "ATS-friendly resume guide for Infopark and Technopark jobs — how to make a resume that passes automated screening, write outcome bullets, and survive recruiter review.",
            "Resume Guide for Kerala IT Jobs",
            g7,
        ),
    )
)

# --- Guide 8 ---
g8 = article(
    "Interview prep",
    "Interviews · Kerala IT",
    "Interview preparation for Kerala IT companies",
    "15 August 2026",
    "18 min read",
    "Interview processes at Infopark and Technopark companies are more predictable than most candidates expect. This guide covers IT interviews for freshers and experienced engineers, non-IT interviews inside IT companies (HR, marketing, finance, support, and more), language expectations, and the common mistakes that cause rejections.",
    """
    <h2>The shape of a typical process</h2>
    <p>
      Most Kerala park companies run three to five stages. It usually begins with an HR or recruiter screen covering
      your background, notice period, location, and expected compensation. Then comes a technical or role assessment,
      which may be an online test, a take-home task, or a live problem-solving round. After that, one or two interviews
      with the team, sometimes followed by a manager or client-facing round, and finally an HR closure discussion.
    </p>
    <p>
      Smaller companies compress this into a single day, and walk-in drives often run screening, test, and technical
      rounds back to back within a few hours. Larger organisations and global capability centres spread stages across
      weeks. Ask the recruiter at the start how many rounds there are and what each covers — this is a normal question
      and the answer helps you prepare precisely rather than generally.
    </p>

    <h2>Preparing for the recruiter screen</h2>
    <p>
      The first call is a filter, not a formality. Recruiters are checking whether your background matches the
      requisition, whether your notice period fits the joining window, and whether your expectations are within budget.
      Candidates lose opportunities here by rambling, by being vague about notice period, or by refusing to discuss
      compensation at all.
    </p>
    <p>
      Prepare a ninety-second introduction covering who you are professionally, what you have worked on most recently,
      and what you are looking for next. Practise it aloud until it flows without sounding memorised. Have your notice
      period, current location, and researched salary range ready — the reasoning behind that range is covered in our
      <a href="/guides/kerala-it-salary-guide/">salary guide</a>.
    </p>

    <!--IPD_AD_MID-->
    <h2>IT interview — freshers</h2>
    <p>
      For first-job seekers, Infopark and Technopark interviews usually test fundamentals more than years of delivery.
      Expect questions on one primary language (Java, Python, JavaScript, C#, or similar), basic OOP, simple data
      structures, SQL basics, and a deep walkthrough of one or two projects on your resume. Many drives also include an
      aptitude or written test before the technical round.
    </p>
    <p>
      What wins for freshers is clarity, not volume. Pick one language and know it well enough to write a small program
      on paper or a shared screen. Be ready to explain every line of your best project: why you chose the stack, how
      data flows, what broke, and how you fixed it. If you used ChatGPT or a tutorial heavily, still own the design —
      interviewers can tell when you cannot explain your own repository.
    </p>
    <p>
      Soft rounds for freshers focus on willingness to learn, willingness to work on-site, and honesty about what you
      have not studied yet. Saying “I have not used Redis, but I understand caching and can learn it” is stronger than
      claiming five tools you cannot discuss. Pair this section with our
      <a href="/guides/fresher-guide-kochi-it-parks/">fresher guide</a>
      and an ATS-clean resume from the
      <a href="/guides/resume-guide-kerala-it-jobs/">resume guide</a>.
    </p>
    <p>
      Typical fresher themes to practise aloud: introduce yourself in under two minutes, explain one project end to
      end, reverse a string or find duplicates in a list, write a basic SQL join, describe HTTP vs HTTPS, and answer
      why this company and why Kochi or Trivandrum.
    </p>

    <h2>IT interview — experienced candidates</h2>
    <p>
      With two or more years of experience, the bar shifts from “can you learn” to “can you own”. Interviewers dig into
      production incidents, design trade-offs, code review habits, testing strategy, and how you worked with product or
      clients. Resume claims about leadership or architecture will be tested with follow-up questions.
    </p>
    <p>
      Prepare stories for: a bug you diagnosed in production, a performance improvement you made, a disagreement on
      approach, a time you mentored someone, and a system you would redesign if you started again. Use concrete numbers
      where you can — latency, error rate, ticket volume, team size — without inventing precision you do not have.
    </p>
    <p>
      For mid-level and senior roles, expect system design or module design discussions even in Kerala services
      companies: how you would structure an API, where you put caching, how you handle auth, how you deploy, and how
      you monitor. You do not need FAANG-level whiteboard theatre; you need a clear, practical design you can defend.
    </p>
    <p>
      Notice period, current CTC, and reason for change will come early. Be consistent with what you said on the form
      and what background verification will show. Negotiation details sit in the
      <a href="/guides/kerala-it-salary-guide/">salary guide</a>;
      offer paperwork sits in
      <a href="/guides/offer-letter-notice-period-guide/">offer letters and notice periods</a>.
    </p>

    <h2>Technical assessments and take-home tasks</h2>
    <p>
      Online assessments in Kerala park hiring typically mix aptitude questions with language fundamentals and one or
      two coding problems. Read the total time limit before starting and budget it across sections. Attempt everything
      you can answer quickly first, then return to harder problems. Unanswered easy questions cost more marks than an
      imperfect attempt at a difficult one.
    </p>
    <p>
      Take-home tasks deserve real care because they are the strongest signal you can send. Follow the brief exactly.
      Write clear, readable code rather than clever code. Include a short README explaining how to run it, what you
      chose to build, and what you would improve with more time. That final paragraph frequently impresses reviewers
      more than the code itself, because it demonstrates engineering judgement.
    </p>
    <p>
      Do not have someone else complete an assessment for you. Companies routinely re-examine the same material in the
      live round, and the gap between the submission and your explanation is immediately obvious.
    </p>

    <h2>The technical interview (core habits)</h2>
    <p>
      Technical rounds in Kerala parks tend to start from your resume rather than from abstract puzzles. Expect the
      interviewer to pick a project you listed and go deep: why you chose that approach, what broke, how you debugged
      it, what you would do differently. This is why resume honesty matters so much — every claim is a potential
      question.
    </p>
    <p>
      When given a problem, think aloud. Restate the question, confirm the constraints, describe your approach before
      coding, then implement. Interviewers are assessing how you reason, not only whether you arrive at the answer. A
      candidate who explains a partial solution clearly often scores above a candidate who produces a correct answer in
      silence.
    </p>
    <p>
      When you do not know something, say so directly and then describe how you would find out. Fabricating an answer
      is the fastest way to end a technical round badly. Admitting a gap and showing a method is a genuinely acceptable
      outcome.
    </p>

    <h2>Non-IT interviews inside IT companies — simple explanation</h2>
    <p>
      Infopark and Technopark are full of non-engineering roles: HR and recruitment, digital marketing, content,
      business development, finance and accounts, operations, admin, customer support, UI/UX, and business analysis.
      These interviews are not coding interviews. The company still expects professionalism, clear English (or the
      language named in the posting), domain knowledge, and proof you can do the work — not a GitHub repo.
    </p>
    <p>
      In plain terms: HR will check your background and fit; the hiring manager will check whether you understand the
      job; and you may get a short task (write an email, plan a campaign, solve an Excel problem, role-play a support
      call). Prepare examples from past work, bring samples if you have them, and learn the company’s product enough to
      speak about customers without guessing wildly.
    </p>

    <h2>Non-IT by domain — what to expect</h2>
    <p>
      <strong>HR / recruitment:</strong> sourcing channels, screening questions, offer process basics, confidentiality,
      and how you handle difficult candidates. You may be asked to role-play a screening call.
    </p>
    <p>
      <strong>Digital marketing / content:</strong> campaigns you ran, channels you used, metrics (leads, CTR, engagement),
      tools (Meta Ads, Google Analytics, SEO basics), and a writing or content sample. Expect a small live task.
    </p>
    <p>
      <strong>Sales / business development:</strong> pipeline thinking, how you open a conversation, how you handle
      objections, CRM hygiene, and willingness to work targets. Role-plays are common.
    </p>
    <p>
      <strong>Finance / accounts:</strong> GST and invoice basics for Indian companies, Excel comfort, month-end habits,
      and accuracy under pressure. Have concrete examples of reconciliations or reports you owned.
    </p>
    <p>
      <strong>Customer support / operations:</strong> calm communication, ticket tools, escalation judgement, and shift
      flexibility. You may get a scenario: angry customer, missed SLA, or unclear ticket.
    </p>
    <p>
      <strong>UI/UX / design:</strong> portfolio walkthrough, design decisions, tools (Figma and similar), and how you
      work with developers. Be ready to critique a screen and explain trade-offs.
    </p>
    <p>
      <strong>Business analysis:</strong> requirement gathering, writing clear user stories, stakeholder communication,
      and basic process mapping. Domain experience (banking, healthcare, logistics) is often the real differentiator.
    </p>

    <h2>Language and communication in Kerala park interviews</h2>
    <p>
      Most Infopark and Technopark interviews run primarily in English, especially for client-facing, support, and
      engineering roles. Malayalam often appears naturally in HR chats and informal moments, but you should still be
      ready to answer technical and behavioural questions in clear English. If a posting names Malayalam, Hindi, or
      another language as required for support or sales, practise those scenarios as well — language is part of the
      job skill, not a side note.
    </p>
    <p>
      You do not need perfect accent or literary English. You need complete sentences, the right role vocabulary, and
      the ability to explain a problem without long pauses filled with filler. Practise aloud. Record yourself once.
      If English is a weak point, prepare written notes for your introduction and project story so you do not freeze.
    </p>

    <h2>Behavioural and managerial rounds</h2>
    <p>
      These rounds test reliability, communication, and fit with how the team works. Common questions cover a
      disagreement with a colleague, a missed deadline, a time you received difficult feedback, and why you are leaving
      your current role.
    </p>
    <p>
      Answer with a short story structure: the situation, what you specifically did, and the result. Keep it under two
      minutes. Prepare four or five real examples in advance and reuse them across questions rather than inventing new
      material live.
    </p>
    <p>
      Never criticise a previous employer harshly. Even when your reasons are entirely valid, describe them
      professionally — limited growth, no exposure to the technology you want, or a change in project direction. The
      Kerala IT community is small enough that interviewers may know people at your previous company.
    </p>

    <h2>Questions you should ask</h2>
    <p>
      Every interview ends with an invitation to ask questions, and having none is read as low interest. Prepare three
      or four that show you are evaluating the role seriously. Ask what the team is building right now, what the first
      three months look like for a new joiner, how feedback and performance are assessed, and what the on-site or shift
      expectation is. For engineering roles, ask about code review and deployment. For non-IT roles, ask about tools,
      targets, and training.
    </p>

    <h2>Online and walk-in practicalities</h2>
    <p>
      Many first rounds now happen over video. Test your camera, microphone, and connection well before the call, and
      have a mobile hotspot ready as backup. Sit somewhere quiet with light on your face rather than behind you. Join
      two or three minutes early. If the connection fails, message the recruiter immediately.
    </p>
    <p>
      Walk-in drives compress everything and add crowd pressure. Carry multiple printed resumes, documents named in the
      notice, water, and a pen. Detailed campus guidance is in our
      <a href="/guides/walk-in-interview-tips-infopark/">walk-in interview tips</a>.
    </p>

    <h2>After the interview</h2>
    <p>
      Write down what was asked while it is fresh. Over a few interviews this becomes the most valuable preparation
      material you own, because Kerala park companies hiring for similar roles ask overlapping questions.
    </p>
    <p>
      Send one brief thank-you email to the recruiter if you have their address, restating your interest. Then continue
      applying. Waiting on a single pending result is the most common way candidates lose momentum during a search.
    </p>

    <h2>Common reasons candidates are rejected</h2>
    <ul>
      <li>Claiming skills on the resume that collapse under one follow-up question.</li>
      <li>Answering silently instead of explaining the reasoning.</li>
      <li>No questions at the end, signalling low interest in the role.</li>
      <li>Vague or inconsistent answers about notice period and availability.</li>
      <li>Speaking negatively about a previous employer or team.</li>
      <li>Preparing only for coding when the role is non-IT — or only for HR chat when the role is technical.</li>
      <li>Preparing generic material instead of studying the actual job description.</li>
    </ul>
    <p>
      Once an offer arrives, move on to
      <a href="/guides/offer-letter-notice-period-guide/">Offer letters, notice periods and background checks</a>
      before you sign anything.
    </p>
    """,
    """
        <li><a href="/guides/resume-guide-kerala-it-jobs/">Resume guide for Kerala IT jobs</a></li>
        <li><a href="/guides/kerala-it-salary-guide/">Salary expectations in Kerala IT parks</a></li>
        <li><a href="/guides/offer-letter-notice-period-guide/">Offer letters &amp; notice periods</a></li>
        <li><a href="/guides/walk-in-interview-tips-infopark/">Walk-in interview tips</a></li>
    """,
)
PAGES.append(
    (
        "guides/interview-preparation-kerala-it/index.html",
        wrap(
            "/guides/interview-preparation-kerala-it/",
            "Interview Preparation for Kerala IT Companies | InfoparkDaily",
            "Interview help for Infopark and Technopark — IT fresher and experienced rounds, non-IT roles by domain, language tips, assessments, and follow-up.",
            "Interview Preparation for Kerala IT Companies",
            g8,
        ),
    )
)

# --- Guide 9 ---
g9 = article(
    "Working in Infopark",
    "Campus life · Kochi",
    "Working in Infopark Kochi: commute, costs and campus life",
    "15 August 2026",
    "11 min read",
    "Accepting a job in Infopark Kochi means more than accepting a salary. It means a daily commute into Kakkanad, a decision about where to live, and a working life shaped by campus facilities and shift timings. This guide covers the practical realities candidates rarely ask about until after they join.",
    """
    <h2>Where Infopark actually is</h2>
    <p>
      Infopark Kochi sits in Kakkanad, on the eastern side of the city, and is spread across more than one campus.
      Phase 1 and Phase 2 are distinct locations, and the difference matters on your first day — arriving at the wrong
      phase for an interview or a joining formality costs a stressful half hour. Your offer letter or interview notice
      will name the building; read it carefully rather than assuming.
    </p>
    <p>
      Beyond Kochi, the same organisation operates campuses at Cherthala and Thrissur, and there is a smaller presence
      near the Ernakulam South metro area. If a listing mentions one of these, confirm the exact work location before
      you plan housing, because a Kakkanad assumption can be wrong by a long distance.
    </p>

    <h2>Getting there each day</h2>
    <p>
      Most people reach Kakkanad by bus, by two-wheeler, by car, or by a combination of metro and a last-mile
      connection. Kochi Metro does not terminate at the park itself, so metro users typically complete the final leg by
      bus, auto, or a shared ride. Many companies and the park operator run shuttle services on common routes; ask HR
      during onboarding whether your company participates, because it can meaningfully reduce both cost and stress.
    </p>
    <p>
      Traffic on the approach roads builds significantly during morning and evening peaks. A journey that takes
      twenty-five minutes at midday can take close to an hour at nine in the morning. Before accepting an offer, do a
      trial run at the actual time you would travel. A commute that looks acceptable on a map at the weekend can feel
      very different on a Monday.
    </p>
    <p>
      Night-shift and rotational-shift employees face a different problem: public transport thins out considerably late
      at night. If the role involves US or European shift timings, ask specifically about company transport, drop
      facilities, and safety arrangements before you sign.
    </p>

    <!--IPD_AD_MID-->
    <h2>Choosing where to live</h2>
    <p>
      Broadly, people working at Infopark either live close to Kakkanad for a short commute, or live in central
      Ernakulam and accept a longer daily journey in exchange for more of the city around them. Neither choice is
      wrong; they suit different priorities.
    </p>
    <p>
      Living near the park typically means a quieter area, lower rent than the city centre, and a commute measured in
      minutes rather than hours. The trade-off is fewer entertainment and social options within walking distance.
      Living centrally gives you the city, better connectivity to the rest of Kochi, and more housing supply, at the
      cost of daily travel time and fuel or fare expense.
    </p>
    <p>
      Freshers and people relocating from outside Kochi often start in shared accommodation or a paying-guest
      arrangement near the park, then move once they know the city. That is a sensible sequence. Signing a long lease in
      an unfamiliar area before your first month is the more common mistake.
    </p>
    <p>
      When you evaluate a place, check water supply reliability, power backup, internet options, and how the road
      behaves during monsoon. Kochi's rainy season is intense, and a route that is fine in January can be difficult in
      July.
    </p>

    <h2>Budgeting your first months</h2>
    <p>
      Build a realistic monthly picture before you commit to a lifestyle. The recurring items are rent, utilities and
      internet, food, commute, phone, and a buffer for health and emergencies. Kochi is more affordable than Bengaluru
      or Hyderabad on housing, but food and transport costs are not dramatically lower.
    </p>
    <p>
      Plan for one-time costs at the start that surprise first-time earners: a security deposit that may run to several
      months of rent, basic furnishing, and the gap before your first full salary lands. Many companies pay a partial
      first month depending on your joining date, so ask HR when your first credit will arrive and how much it will be.
    </p>
    <p>
      Start a small savings habit from the first salary even if the amount feels trivial. Understand your provident
      fund, keep your tax declarations current, and avoid taking on EMI commitments during probation. Our
      <a href="/guides/kerala-it-salary-guide/">salary guide</a>
      explains how CTC translates into actual monthly income.
    </p>

    <h2>Campus facilities and daily rhythm</h2>
    <p>
      Infopark campuses include food courts and cafeterias, banking and ATM access, convenience retail, and open spaces
      for walking. Individual buildings vary, so what is available depends partly on which tower you work in. Larger
      companies run their own cafeterias and recreation areas.
    </p>
    <p>
      Entry is controlled. You will receive an access card during onboarding, and visitors need to be registered in
      advance. Treat this seriously — attempting to bring someone in casually, or sharing your access card, is a
      genuine policy problem rather than a minor rule.
    </p>
    <p>
      Working hours differ by company and client. Product companies serving Indian or European clients often run
      standard day hours. Teams supporting US clients may start in the afternoon or work overnight. Support and
      operations functions frequently run rotational shifts. Confirm the pattern before accepting, because a rotating
      shift reshapes your sleep, your social life, and your commute options.
    </p>

    <h2>The social side of park life</h2>
    <p>
      Kakkanad has grown a substantial community of young professionals, and the practical effect is that most people
      build their social circle through work and neighbours rather than through the wider city. Companies run internal
      clubs, sports teams, and cultural events, particularly around Onam and year-end. Participating in these early is
      the fastest way to settle in if you have moved from another district or state.
    </p>
    <p>
      The park also hosts community and cultural events through the year. Our
      <a href="/news/">news section</a>
      covers campus developments and events that affect people working here.
    </p>

    <h2>Practical advice for your first month</h2>
    <p>
      Keep your onboarding documents organised: offer letter, joining letter, PF details, insurance cards, and access
      card. Learn the emergency and facility contacts for your building. Save your HR contact and your manager's
      extension. Find out where the medical room is.
    </p>
    <p>
      Introduce yourself deliberately to the people you will depend on — your immediate team, the person who handles IT
      access, and whoever runs your deployment or QA process. Asking questions in the first weeks is expected. Asking
      the same question in month four, having never written the answer down, is not.
    </p>
    <p>
      Finally, take the commute seriously as a long-term factor in whether you stay. Many people leave otherwise good
      Kochi jobs because of travel fatigue rather than the work itself. If you can shorten it — by moving, by adjusting
      your hours with your manager, or by using shuttle services — the improvement in daily life is substantial.
    </p>

    <h2>Questions worth asking before you accept</h2>
    <ul>
      <li>Which campus and building will I actually work from?</li>
      <li>What are the shift timings, and do they rotate?</li>
      <li>Is company transport or a shuttle route available from my area?</li>
      <li>Is the role fully on-site, hybrid, or flexible?</li>
      <li>When will my first salary be credited, and for how many days?</li>
      <li>What facilities exist in my building for food, parking, and medical needs?</li>
    </ul>
    <p>
      For the paperwork side of joining, read
      <a href="/guides/offer-letter-notice-period-guide/">Offer letters, notice periods and background checks</a>.
    </p>
    """,
    """
        <li><a href="/guides/kerala-it-salary-guide/">Salary expectations in Kerala IT parks</a></li>
        <li><a href="/guides/offer-letter-notice-period-guide/">Offer letters &amp; notice periods</a></li>
        <li><a href="/guides/fresher-guide-kochi-it-parks/">Fresher guide for Kochi IT parks</a></li>
        <li><a href="/guides/walk-in-interview-tips-infopark/">Walk-in interview tips</a></li>
    """,
)
PAGES.append(
    (
        "guides/working-in-infopark-kochi-life/index.html",
        wrap(
            "/guides/working-in-infopark-kochi-life/",
            "Working in Infopark Kochi: Commute, Costs & Campus Life | InfoparkDaily",
            "What daily life at Infopark Kakkanad is really like — commute options, where to live, budgeting your first months, campus facilities, and shift realities.",
            "Working in Infopark Kochi: Commute, Costs & Campus Life",
            g9,
        ),
    )
)

# --- Guide 10 ---
g10 = article(
    "Career switch",
    "Transitions · Kerala IT",
    "Switching careers into Kerala IT",
    "15 August 2026",
    "12 min read",
    "Every week, people in Kerala decide to move into IT from teaching, banking, sales, engineering fields outside software, or a career break. The move is genuinely possible, and it is also routinely oversold by training institutes. This guide sets out what actually works, what it costs in time, and how to avoid the traps.",
    """
    <h2>Start with an honest assessment</h2>
    <p>
      Before choosing a course or paying anyone, answer three questions properly. What specifically attracts you to IT
      — the work itself, the pay, or the perceived stability? What can you realistically commit weekly, given your
      current job and responsibilities? And how long can you sustain your finances if the transition takes longer than
      hoped?
    </p>
    <p>
      These matter because the honest timeline for a career switch is usually six to eighteen months of consistent
      effort, not the six weeks advertised on posters. People who plan for the realistic timeline generally make it.
      People who expect the advertised one tend to quit at month four, just before the effort would have paid off.
    </p>

    <h2>Choosing a realistic entry point</h2>
    <p>
      Not every IT role has the same barrier. Some paths are considerably more accessible to career switchers than
      others, and choosing well is more important than working harder on the wrong target.
    </p>
    <p>
      Quality assurance and manual testing remain among the most accessible technical entry points, particularly for
      people with strong attention to detail and domain knowledge. Support and service desk roles value patience and
      communication and often provide a route into infrastructure or cloud work later. Business analysis suits people
      with domain experience in finance, healthcare, or logistics, because the scarce skill there is understanding the
      business, not writing code.
    </p>
    <p>
      Digital marketing, content, and design roles inside park companies are open to people with genuine portfolios
      regardless of background. HR and recruitment roles within IT companies are a common and underrated route for
      people already in people-facing work. Software development is very much achievable, but it is the longest path
      and demands the most sustained practice.
    </p>
    <p>
      Pick the entry point where your existing experience is an advantage rather than an irrelevance. A banking
      professional moving into fintech business analysis is competing with their strength. The same person attempting
      to become a machine learning engineer in six months is competing with their weakness.
    </p>

    <!--IPD_AD_MID-->
    <h2>Evaluating training options without getting exploited</h2>
    <p>
      Kerala has a large training market around its IT parks. Some of it is excellent. Some of it sells placement
      promises it cannot keep, at prices that are difficult to justify.
    </p>
    <p>
      Treat guaranteed placement claims with scepticism, and ask for specifics rather than percentages. Which companies
      hired their students in the last six months, in which roles, and can you speak to two of those graduates
      directly? A confident institute will facilitate that conversation. An evasive answer tells you what you need to
      know.
    </p>
    <p>
      Be extremely cautious about any arrangement requiring a large upfront payment, a loan, or a signed agreement that
      commits you to fees regardless of outcome. Nobody can place you inside an Infopark company by paying a fee — park
      tenants hire through their own HR processes. Anyone claiming otherwise is describing a scam. Our
      <a href="/guides/verify-jobs-before-you-apply/">verification guide</a>
      covers these patterns in detail.
    </p>
    <p>
      Self-directed learning combined with a small number of well-chosen paid resources is often the better value
      route, particularly for disciplined learners. What you cannot skip is structure — a plan, a schedule, and a way
      to measure whether you are progressing.
    </p>

    <h2>Building proof instead of collecting certificates</h2>
    <p>
      This is the point where most career switchers go wrong. They accumulate certificates and assume the certificates
      will do the persuading. They will not. A hiring manager at a Kochi company sees the same certificate logos every
      week and has learned that they predict very little about capability.
    </p>
    <p>
      What persuades is evidence of work. For a developer path, that means two or three applications that actually run,
      with clean repositories and readable documentation. For QA, a test suite you designed for a real application,
      with well-written bug reports. For business analysis, requirement documents and process diagrams for a genuine
      scenario. For marketing, campaigns with real numbers attached.
    </p>
    <p>
      Aim for depth rather than volume. Three substantial pieces of work you can discuss in detail beat fifteen
      tutorial exercises. Our
      <a href="/guides/resume-guide-kerala-it-jobs/">resume guide</a>
      explains how to present this evidence so a reviewer actually registers it.
    </p>

    <h2>Using your previous career as an advantage</h2>
    <p>
      The instinct of most switchers is to hide their old career, as if it were a liability. This is a mistake. Domain
      knowledge is genuinely scarce inside IT companies and frequently commands a premium.
    </p>
    <p>
      A teacher moving into IT brings explanation skills that make them effective at documentation, training, and
      client communication. Someone from banking understands financial workflows that fintech product teams struggle to
      explain to fresh graduates. A healthcare professional understands clinical processes that health-tech companies
      need. Someone from sales understands customer conversations that pre-sales and customer success roles depend on.
    </p>
    <p>
      Frame the transition as an addition rather than an erasure. You are not a beginner who happens to have a past.
      You are a domain expert who has now acquired technical skills. That framing changes how interviewers hear your
      story.
    </p>

    <h2>Applying as a switcher</h2>
    <p>
      Expect a lower response rate than a conventional candidate, and plan for it emotionally. Target roles where your
      combination is explicitly useful, and write a short covering note that connects your background to the specific
      job rather than sending a bare resume.
    </p>
    <p>
      Be flexible on the first role. Your entry position is a bridge, not a destination. Accepting a junior title or a
      support-adjacent role to get inside a park company is usually a faster route to your actual target than waiting
      indefinitely for a perfect first offer. Internal movement within Kerala IT companies is common once you have
      proven yourself and know the systems.
    </p>
    <p>
      Be realistic about compensation for the first role too. A switch often involves a temporary step back in pay
      before a steeper climb. Understanding that in advance prevents you from rejecting a good bridge opportunity for
      the wrong reason.
    </p>

    <h2>Sustaining the effort</h2>
    <p>
      The hardest part of a career switch is not the learning. It is maintaining momentum for a year while working a
      full-time job, often without visible progress for long stretches.
    </p>
    <p>
      Protect a fixed weekly schedule rather than relying on motivation. Ten focused hours every week beats forty hours
      in one burst followed by three idle weeks. Track what you complete, because visible progress is what sustains
      effort when results are slow. Find at least one other person on a similar path — isolation is the most common
      reason people abandon the attempt.
    </p>
    <p>
      Set a review point at six months. Assess honestly whether you are progressing, whether the target role still
      appeals, and whether the plan needs adjusting. Changing direction based on evidence is sensible. Quietly drifting
      is what to avoid.
    </p>

    <h2>Warning signs to walk away from</h2>
    <ul>
      <li>Any offer to place you in an Infopark or Technopark company in exchange for a fee.</li>
      <li>Guaranteed job promises with no verifiable record of past placements.</li>
      <li>Pressure to sign a loan or large payment on the day you enquire.</li>
      <li>Courses that avoid naming the companies that hired their graduates.</li>
      <li>Anyone asking for your original certificates as security.</li>
    </ul>
    <p>
      When you are ready to apply, follow the process in
      <a href="/guides/how-to-apply-infopark-technopark-jobs/">How to apply for Infopark and Technopark jobs</a>
      and prepare with our
      <a href="/guides/interview-preparation-kerala-it/">interview preparation guide</a>.
    </p>
    """,
    """
        <li><a href="/guides/resume-guide-kerala-it-jobs/">Resume guide for Kerala IT jobs</a></li>
        <li><a href="/guides/interview-preparation-kerala-it/">Interview preparation guide</a></li>
        <li><a href="/guides/verify-jobs-before-you-apply/">Verify jobs before you apply</a></li>
        <li><a href="/guides/kerala-it-salary-guide/">Salary expectations in Kerala IT parks</a></li>
    """,
)
PAGES.append(
    (
        "guides/career-switch-into-kerala-it/index.html",
        wrap(
            "/guides/career-switch-into-kerala-it/",
            "Switching Careers into Kerala IT | InfoparkDaily",
            "A realistic guide to moving into IT from another field in Kerala — accessible entry roles, evaluating training, building proof of work, and avoiding placement scams.",
            "Switching Careers into Kerala IT",
            g10,
        ),
    )
)

# --- Guide 11 ---
g11 = article(
    "Offers &amp; joining",
    "Offer stage · Kerala IT",
    "Offer letters, notice periods and background checks",
    "15 August 2026",
    "12 min read",
    "The offer stage is where careful candidates get careless. An offer arrives, excitement takes over, and clauses that matter for the next two years get skimmed. This guide explains how to read an Indian IT offer letter, how notice periods really work, what background verification checks, and how to resign professionally.",
    """
    <h2>Reading the offer letter properly</h2>
    <p>
      An offer letter is a contract. Read every page before signing, and read it when you are calm rather than in the
      first ten minutes of receiving it. Most Kerala IT offers are fair, but the terms vary more than candidates
      assume, and the differences only become visible when you want to leave or when a bonus is due.
    </p>
    <p>
      Check that the basics match what was discussed verbally: job title, reporting manager or function, work location
      including campus and phase, start date, and the full compensation breakdown. If the recruiter promised something
      in a call — a joining bonus, an early review, a specific team — confirm it appears in the document. A verbal
      promise from a recruiter who leaves the company three months later is not enforceable in practice.
    </p>
    <p>
      Then read the clauses candidates usually skip: probation length and confirmation conditions, notice period during
      and after probation, any training bond and its penalty amount, non-compete or non-solicitation language,
      intellectual property assignment, and the conditions attached to any variable pay.
    </p>

    <h2>Probation and confirmation</h2>
    <p>
      Probation in Indian IT companies commonly runs three to six months. During this period the notice period is
      usually much shorter on both sides, which cuts both ways — you can leave quickly, and the company can also end
      the arrangement with limited notice.
    </p>
    <p>
      Ask what confirmation depends on. In well-run companies it is a documented review against defined expectations.
      In less organised ones it is informal, which creates ambiguity you should be aware of. Also confirm whether any
      benefits, such as full insurance coverage or eligibility for the appraisal cycle, begin only after confirmation.
    </p>

    <!--IPD_AD_MID-->
    <h2>Understanding training bonds</h2>
    <p>
      Some companies, particularly those investing in extended fresher training, include a service agreement requiring
      you to stay for a defined period or pay a penalty. These are common and not automatically unreasonable, but the
      terms matter enormously.
    </p>
    <p>
      Look at three things: the duration, the penalty amount, and whether the company holds any original documents.
      A bond of a year or so with a modest penalty tied to genuine training cost is a normal commercial arrangement. A
      multi-year bond with a large penalty attached to an entry-level role with minimal training is not, and it will
      restrict your options at exactly the stage when your market value is growing fastest.
    </p>
    <p>
      Never surrender original educational certificates as security. Reputable employers do not require this. If a
      company insists, treat it as a serious warning sign and read
      <a href="/guides/verify-jobs-before-you-apply/">Verify jobs before you apply</a>.
    </p>

    <h2>How notice periods really work</h2>
    <p>
      Notice periods in Indian IT typically range from thirty to ninety days, and longer periods are more common in
      larger organisations and client-facing delivery roles. The written notice period is only part of the picture. The
      practical questions are whether the company allows a buyout, whether unused leave can offset part of the notice,
      and whether early release is negotiable in practice.
    </p>
    <p>
      Ask about all three before you resign, because they determine your realistic joining date for the next role. A
      new employer expecting you in thirty days while your current employer enforces ninety creates a problem that is
      much easier to solve before you accept than after.
    </p>
    <p>
      If a buyout is permitted, establish who pays. Some employers reimburse notice buyout for candidates they want
      urgently. This is a reasonable thing to raise during negotiation, as covered in our
      <a href="/guides/kerala-it-salary-guide/">salary guide</a>.
    </p>

    <h2>Resigning professionally</h2>
    <p>
      Tell your manager before you send the formal email. A resignation that reaches your manager through HR or, worse,
      through office gossip damages a relationship you may need for a reference later. Have the conversation directly,
      then send a short, neutral resignation letter stating your last working day per the notice period.
    </p>
    <p>
      Keep the letter free of grievances. Whatever your reasons for leaving, the written record should be brief and
      professional. Kerala's IT sector is small enough that people who worked together in one Infopark company
      routinely meet again in another.
    </p>
    <p>
      Expect a counter-offer if you are valued. Think about it in advance. Counter-offers solve compensation but rarely
      solve the underlying reason people leave, which is usually growth, management, or the nature of the work. If pay
      was genuinely the only issue, a counter-offer can be reasonable. If it was not, accepting one often postpones the
      same decision by six months.
    </p>

    <h2>Serving the notice period well</h2>
    <p>
      How you spend your final weeks shapes your reference and your reputation. Document what you own, hand over
      properly, and complete what you reasonably can. Prepare a written handover covering your responsibilities,
      systems access, pending items, and who to contact for what.
    </p>
    <p>
      Collect your documents before your last day: relieving letter, experience certificate, final payslips, Form 16,
      and PF details. Chasing these after you have left is considerably harder. Confirm the process for transferring or
      withdrawing your provident fund, and make sure your contact details on record are current.
    </p>

    <h2>What background verification actually checks</h2>
    <p>
      Most established IT companies run background verification either before or shortly after joining, usually through
      a third-party agency. Typical checks cover employment history including dates and titles, educational
      qualifications, address verification, and sometimes a criminal record check. Some client-facing roles add
      client-mandated checks.
    </p>
    <p>
      Verification failures are almost never caused by imperfect careers. They are caused by discrepancies. Adjusted
      employment dates to hide a gap, an inflated job title, a salary figure that does not match payslips, or a degree
      year that differs from records — these are what cause offers to be withdrawn, sometimes after you have already
      resigned elsewhere.
    </p>
    <p>
      The protection is straightforward: state everything accurately from the first application. A three-month gap
      honestly declared is a non-issue. The same gap concealed and then discovered is a serious one. Keep your own
      copies of offer letters, relieving letters, payslips, and certificates in one organised folder so you can respond
      quickly when the agency asks.
    </p>

    <h2>The gap between offer and joining</h2>
    <p>
      Stay in periodic contact with your new employer's HR during the notice period. Confirm the joining date, the
      reporting location and building, documents to bring, and the onboarding schedule a week or two in advance.
    </p>
    <p>
      Offers are occasionally revoked before joining due to project changes or hiring freezes. It is uncommon but it
      happens. Reduce your exposure by not making irreversible commitments — a long lease, a relocation, a large
      purchase — until you have a confirmed joining date and, ideally, have completed background verification.
    </p>
    <p>
      For what comes next, our guide on
      <a href="/guides/working-in-infopark-kochi-life/">working in Infopark Kochi</a>
      covers commute, housing, and campus practicalities for your first month.
    </p>

    <h2>Offer-stage checklist</h2>
    <ul>
      <li>Title, location, campus, start date, and reporting line all match the discussion.</li>
      <li>Full compensation breakdown with fixed and variable separated.</li>
      <li>Probation length and confirmation criteria understood.</li>
      <li>Notice period, buyout policy, and leave adjustment clarified.</li>
      <li>Any bond duration, penalty, and document requirement reviewed carefully.</li>
      <li>Every verbal promise reflected in writing.</li>
      <li>All previous employment and education details declared accurately.</li>
      <li>Relieving letter and documents secured from your current employer.</li>
    </ul>
    """,
    """
        <li><a href="/guides/kerala-it-salary-guide/">Salary expectations in Kerala IT parks</a></li>
        <li><a href="/guides/working-in-infopark-kochi-life/">Working in Infopark Kochi</a></li>
        <li><a href="/guides/interview-preparation-kerala-it/">Interview preparation guide</a></li>
        <li><a href="/guides/verify-jobs-before-you-apply/">Verify jobs before you apply</a></li>
    """,
)
PAGES.append(
    (
        "guides/offer-letter-notice-period-guide/index.html",
        wrap(
            "/guides/offer-letter-notice-period-guide/",
            "Offer Letters, Notice Periods & Background Checks | InfoparkDaily",
            "How to read an Indian IT offer letter, understand probation and training bonds, serve notice professionally, and pass background verification without surprises.",
            "Offer Letters, Notice Periods & Background Checks",
            g11,
        ),
    )
)


def main() -> None:
    for rel, html in PAGES:
        path = ROOT / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(html, encoding="utf-8")
        print("wrote", rel, "chars", len(html))


if __name__ == "__main__":
    main()
