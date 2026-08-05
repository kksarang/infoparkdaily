#!/usr/bin/env python3
"""Generate InfoparkDaily /guides/ pages for AdSense content readiness."""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSS_VER = "20260805g"
SITE_JS = "20260802sa"
ANALYTICS = "20260730e"
DISCLAIMER = "20260805k"

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
  <article class="guide-article glass">
    <nav class="guide-breadcrumb" aria-label="Breadcrumb">
      <a href="/guides/">Guides</a>
      <span aria-hidden="true">/</span>
      <span>{crumb}</span>
    </nav>
    <p class="eyebrow">{kicker}</p>
    <h1>{h1}</h1>
    <p class="guide-meta">Updated {updated} · {read} · By InfoparkDaily editorial</p>
    <p class="guide-lead">{lead}</p>

    <aside class="ipd-ad-slot" data-ad-slot="guide-top" hidden aria-hidden="true"></aside>

    {sections_html}

    {NOTICE}

    <div class="guide-cta-row">
      <a class="btn btn-primary" href="/jobs/">Browse open jobs</a>
      <a class="btn btn-secondary" href="/guides/">All guides</a>
      <a class="btn btn-secondary" href="/recruit/">Recruit</a>
    </div>

    <nav class="guide-more" aria-label="More guides">
      <h2>More career guides</h2>
      <ul>
        {more_links}
      </ul>
    </nav>
  </article>
</main>
"""


PAGES: list[tuple[str, str]] = []

# --- Index ---
index_body = """
<main id="main-content" class="guides-page guides-index">
  <section class="guide-hero glass">
    <p class="eyebrow">Career guides · Kerala IT parks</p>
    <h1>Guides for Infopark, Technopark &amp; Kochi tech careers</h1>
    <p class="guide-lead">
      Original, practical articles from InfoparkDaily — how to apply safely, prepare as a fresher, handle walk-ins,
      and verify openings before you share documents. These guides are written for Kerala IT park candidates and
      recruiters who want clarity, not spam.
    </p>
    <p class="guide-meta">Last updated 5 August 2026 · Independent community content</p>
  </section>

  <aside class="ipd-ad-slot" data-ad-slot="guides-index" hidden aria-hidden="true"></aside>

  <section class="guide-card-grid" aria-label="Guide list">
    <a class="guide-card glass" href="/guides/how-to-apply-infopark-technopark-jobs/">
      <p class="guide-card-kicker">Process</p>
      <h2>How to apply for Infopark &amp; Technopark jobs</h2>
      <p>Portals, resumes, deadlines, and a safe apply checklist for Kerala IT parks.</p>
      <span class="guide-card-meta">~10 min read</span>
    </a>
    <a class="guide-card glass" href="/guides/fresher-guide-kochi-it-parks/">
      <p class="guide-card-kicker">Freshers</p>
      <h2>Fresher guide for Kochi IT parks</h2>
      <p>What Infopark hiring looks like for first-job seekers — skills, internships, and expectations.</p>
      <span class="guide-card-meta">~12 min read</span>
    </a>
    <a class="guide-card glass" href="/guides/walk-in-interview-tips-infopark/">
      <p class="guide-card-kicker">Walk-ins</p>
      <h2>Walk-in interview tips for Infopark</h2>
      <p>What to carry, how early to arrive, and how to stay professional on campus walk-in days.</p>
      <span class="guide-card-meta">~8 min read</span>
    </a>
    <a class="guide-card glass" href="/guides/kerala-it-hiring-this-week/">
      <p class="guide-card-kicker">Editorial</p>
      <h2>Kerala IT hiring this week</h2>
      <p>Our weekly editorial view of hiring themes across Infopark, Technopark, and Cyberpark.</p>
      <span class="guide-card-meta">Updated weekly</span>
    </a>
    <a class="guide-card glass" href="/guides/verify-jobs-before-you-apply/">
      <p class="guide-card-kicker">Safety</p>
      <h2>Verify jobs before you apply</h2>
      <p>Red flags, fee scams, and a verification checklist before you travel or share ID proofs.</p>
      <span class="guide-card-meta">~7 min read</span>
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
            "Original InfoparkDaily career guides: how to apply, fresher tips, walk-ins, hiring insights, and job safety for Kerala IT parks.",
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
        <li><a href="/guides/fresher-guide-kochi-it-parks/">Fresher guide for Kochi IT parks</a></li>
        <li><a href="/guides/walk-in-interview-tips-infopark/">Walk-in interview tips</a></li>
        <li><a href="/guides/verify-jobs-before-you-apply/">Verify jobs before you apply</a></li>
        <li><a href="/guides/kerala-it-hiring-this-week/">Kerala IT hiring this week</a></li>
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
        <li><a href="/guides/walk-in-interview-tips-infopark/">Walk-in interview tips</a></li>
        <li><a href="/guides/verify-jobs-before-you-apply/">Verify jobs before you apply</a></li>
        <li><a href="/guides/kerala-it-hiring-this-week/">Kerala IT hiring this week</a></li>
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
        <li><a href="/guides/how-to-apply-infopark-technopark-jobs/">How to apply for Infopark &amp; Technopark jobs</a></li>
        <li><a href="/guides/fresher-guide-kochi-it-parks/">Fresher guide for Kochi IT parks</a></li>
        <li><a href="/guides/verify-jobs-before-you-apply/">Verify jobs before you apply</a></li>
        <li><a href="/guides/kerala-it-hiring-this-week/">Kerala IT hiring this week</a></li>
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
        <li><a href="/guides/how-to-apply-infopark-technopark-jobs/">How to apply for Infopark &amp; Technopark jobs</a></li>
        <li><a href="/guides/fresher-guide-kochi-it-parks/">Fresher guide for Kochi IT parks</a></li>
        <li><a href="/guides/walk-in-interview-tips-infopark/">Walk-in interview tips</a></li>
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
        <li><a href="/guides/how-to-apply-infopark-technopark-jobs/">How to apply for Infopark &amp; Technopark jobs</a></li>
        <li><a href="/guides/fresher-guide-kochi-it-parks/">Fresher guide for Kochi IT parks</a></li>
        <li><a href="/guides/walk-in-interview-tips-infopark/">Walk-in interview tips</a></li>
        <li><a href="/guides/kerala-it-hiring-this-week/">Kerala IT hiring this week</a></li>
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


def main() -> None:
    for rel, html in PAGES:
        path = ROOT / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(html, encoding="utf-8")
        print("wrote", rel, "chars", len(html))


if __name__ == "__main__":
    main()
