#!/usr/bin/env python3
"""Rebuild the <main> of /portfolio/templates/ with the redesigned layout.

The old generator (build-portfolios.py) no longer matches this page, so this script owns
the page body. Plan cards and FAQ answers are copied verbatim from the current page, so
prices and terms never drift; everything else is defined below. Safe to re-run.
"""

from __future__ import annotations

import re
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "portfolio" / "templates" / "index.html"
V = "20261108pf3"

FEATURED = [
    ("developer-pro", "Developers", "Developer Pro", "Dark", "Software developer portfolio",
     "Developer Pro pairs a technical introduction with project stories."),
    ("product-designer", "Designers", "Product Designer", "Light", "Product designer portfolio",
     "Product Designer pairs large case studies with problem, process, and outcome."),
    ("motion-house", "Creators", "Motion House", "Dark", "Motion designer & editor portfolio",
     "Motion House pairs a playable sample showreel with motion studies."),
    ("business-profile", "Professionals", "Business Profile", "Minimal", "Business professional portfolio",
     "Business Profile pairs a formal introduction with a career timeline."),
    ("fresh-start", "Freshers", "Fresh Start", "Light", "Computer science graduate portfolio",
     "Fresh Start pairs education with practical project work."),
    ("independent-pro", "Freelancers", "Independent Pro", "Bold", "Independent web designer portfolio",
     "Independent Pro pairs services with selected work and enquiries."),
    ("sidebar-folio", "Developers", "Sidebar Folio", "Dark", "Full-stack developer portfolio",
     "Sidebar Folio pairs a fixed left navigation with a dark, developer-first story."),
    ("split-portrait", "Designers", "Split Portrait", "Light", "UI designer portfolio",
     "Split Portrait places your story beside a strong portrait panel — clean and personal."),
    ("agency-landing", "Professionals", "Agency Landing", "Light", "Product consultant portfolio",
     "Agency Landing is a polished enterprise-style site for consultants and small studios."),
]
PROFESSIONS = ["Developers", "Designers", "Freshers", "Freelancers", "Creators", "Professionals"]

STEPS = [
    ("Choose your design", "Preview complete websites and find a design that fits your work."),
    ("Select your plan",
     "Pick Portfolio, + Domain, Shop, Extra Pages, or contact Enitexa.ai (custom software &amp; business websites) for business sites."),
    ("Share your content", "Send your resume, projects, images, and approved public contact links."),
    ("Review and launch", "Review your personalised preview, use the agreed revisions, and approve launch."),
]

CHECK = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 10.5 3.2 3L15 6.5"/></svg>'
ARROW = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5"/></svg>'


def esc(s: str) -> str:
    return escape(s, quote=True)


def frame(slug: str, cls: str, label: str) -> str:
    load = 'fetchpriority="high"' if "front" in cls else 'loading="lazy"'
    return (
        f'<figure class="pfh-frame {cls}"><div class="pfh-frame-bar" aria-hidden="true"><i></i><i></i><i></i></div>'
        f'<img src="/assets/portfolio/previews/{slug}.webp" width="1200" height="900" alt="{esc(label)}" {load}></figure>'
    )


def card(slug, cat, name, style, prof, blurb) -> str:
    return f"""<article class="pfh-card" data-slug="{slug}" data-category="{cat}">
<div class="pfh-card-media"><a class="pfh-card-thumb" href="/portfolio/preview/{slug}/" aria-label="Preview {esc(name)}"><img src="/assets/portfolio/previews/{slug}.webp" alt="{esc(name)} website demo preview" width="1200" height="900" loading="lazy"><span class="pfh-card-hover" aria-hidden="true">Preview website ↗</span></a><button type="button" class="favourite pfh-fav" data-favourite="{slug}" aria-label="Save {esc(name)} to favourites" aria-pressed="false">♡</button></div>
<div class="pfh-card-body"><div class="pfh-card-title"><h3><a href="/portfolio/templates/{slug}/">{esc(name)}</a></h3><span class="pfh-style pfh-style--{style.lower()}">{style}</span></div><p class="pfh-card-prof">{esc(prof)}</p><p class="pfh-card-blurb">{esc(blurb)}</p>
<div class="pfh-card-actions"><a class="pfh-btn pfh-btn--line pfh-btn--sm" href="/portfolio/preview/{slug}/">Preview</a><a class="pfh-btn pfh-btn--ink pfh-btn--sm" href="/portfolio/templates/{slug}/">Choose template {ARROW}</a></div></div>
</article>"""


def extract(page: str) -> tuple[str, str]:
    """Plan tiers + policy, and FAQ <details>, exactly as currently published."""
    start = page.index('<div class="plan-tier">')
    end_marker = '<a href="/portfolio/terms/">Package scope & ownership details ↗</a></div>'
    end = page.index(end_marker, start) + len(end_marker)
    plans = page[start:end]
    faq_start = page.index('id="faqs"')
    faq_end = page.index("</section>", faq_start)
    details = "".join(re.findall(r"<details>.*?</details>", page[faq_start:faq_end], flags=re.S))
    if plans.count('<article class="plan-card') != 5 or details.count("<details>") != 8:
        raise SystemExit("Unexpected pricing / FAQ structure — check the page before rebuilding.")
    return plans, details



SHOWCASE = [
    ("Developer", "developer-pro", "Developer Pro", "Software developer portfolio"),
    ("Designer", "product-designer", "Product Designer", "Product designer portfolio"),
    ("Fresher", "fresh-start", "Fresh Start", "Computer science graduate portfolio"),
    ("Freelancer", "independent-pro", "Independent Pro", "Independent web designer portfolio"),
]


def hero_html() -> str:
    tabs = "".join(
        f'<button type="button" aria-pressed="{str(i == 0).lower()}" data-pfh-show-tab="{i}"><span>{who}</span><i aria-hidden="true"></i></button>'
        for i, (who, *_rest) in enumerate(SHOWCASE)
    )
    eager, lazy = 'fetchpriority="high"', 'loading="lazy"'
    screens = "".join(
        f'<img class="{"is-on" if i == 0 else ""}" data-pfh-show-img="{i}" src="/assets/portfolio/previews/{slug}.webp" width="1200" height="900" alt="{esc(name)} template on desktop" {eager if i == 0 else lazy}>'
        for i, (_w, slug, name, _p) in enumerate(SHOWCASE)
    )
    phones = "".join(
        f'<img class="{"is-on" if i == 0 else ""}" data-pfh-show-img="{i}" src="/assets/portfolio/previews/{slug}-mobile.webp" width="390" height="844" alt="" loading="lazy">'
        for i, (_w, slug, _n, _p) in enumerate(SHOWCASE)
    )
    data = "|".join(f"{slug}~{name}~{prof}" for _w, slug, name, prof in SHOWCASE)
    first = SHOWCASE[0]
    return f"""<section class="pfh-hero" aria-labelledby="pfh-title">
<div class="pfh-wrap pfh-hero-grid">
<div class="pfh-hero-copy">
<p class="pfh-kicker"><span class="pfh-kicker-dot" aria-hidden="true"></span>Portfolio websites · From ₹999</p>
<h1 id="pfh-title"><span>Your skills.</span> <span>Your work.</span> <span>Your own <em>website.</em></span></h1>
<p class="pfh-lead">Choose a complete design. We personalise it with your projects, experience, and contact details — then you share one link.</p>
<div class="pfh-actions"><a class="pfh-btn pfh-btn--ink pfh-btn--lg" href="/portfolio/templates/all/">Browse 42 templates {ARROW}</a><a class="pfh-btn pfh-btn--line pfh-btn--lg" href="#pricing">See plans</a></div>
<ul class="pfh-trust"><li>{CHECK}42 complete designs</li><li>{CHECK}Desktop, tablet &amp; mobile</li><li>{CHECK}Personalised by our team</li><li>{CHECK}Enquire on WhatsApp</li></ul>
</div>
<div class="pfh-show" data-pfh-show data-items="{esc(data)}">
<div class="pfh-show-tabs" role="group" aria-label="See a design made for a">{tabs}</div>
<div class="pfh-show-stage">
<a class="pfh-show-browser" href="/portfolio/preview/{first[1]}/" data-pfh-show-link aria-label="Open the {esc(first[2])} preview">
<div class="pfh-browser-bar" aria-hidden="true"><i></i><i></i><i></i><span>yourname.com</span></div>
<div class="pfh-show-screens">{screens}</div>
</a>
<div class="pfh-show-phone" aria-hidden="true"><div class="pfh-show-phone-in">{phones}</div></div>
<div class="pfh-show-card" aria-live="polite"><span class="pfh-show-badge">✦ Personalised by our team</span><strong data-pfh-show-name>{esc(first[2])}</strong><small data-pfh-show-prof>{esc(first[3])}</small></div>
</div>
</div>
</div>
<div class="pfh-wrap"><ul class="pfh-prices" aria-label="Plans at a glance">
<li><a href="#pricing"><strong>₹999</strong><span>Portfolio website</span></a></li>
<li><a href="#pricing"><strong>₹1,999</strong><span>+ Domain</span></a></li>
<li><a href="#pricing"><strong>₹3,499</strong><span>Shop + Domain</span></a></li>
<li><a href="#pricing"><strong>₹4,999</strong><span>Extra pages + Domain</span></a></li>
<li><a href="#pricing"><strong>Quote</strong><span>Business + Mail</span></a></li>
</ul></div>
</section>"""


def catalog() -> list[dict]:
    src = (ROOT / "js" / "portfolio" / "catalog.js").read_text(encoding="utf-8")
    import json
    return json.loads(src[src.index("["): src.index("];") + 1])


def wall_html() -> str:
    items = catalog()
    half = (len(items) + 1) // 2
    rows = [items[:half], items[half:]]

    def row(list_, rev, copy):
        hidden = ' aria-hidden="true"' if copy else ""
        tab = ' tabindex="-1"' if copy else ""
        lis = "".join(
            f'<li><a href="{esc(i["previewPath"])}"{tab}><img src="/assets/portfolio/previews/{esc(i["slug"])}.webp" width="1200" height="900" alt="" loading="lazy"><span><strong>{esc(i["name"])}</strong><small>{esc(i["category"])}</small></span></a></li>'
            for i in list_
        )
        return f'<ul class="pfh-wall-set"{hidden}>{lis}</ul>'

    tracks = "".join(
        f'<div class="pfh-wall-track{" pfh-wall-track--rev" if r else ""}">{row(lst, r, False)}{row(lst, r, True)}</div>'
        for r, lst in enumerate(rows)
    )
    return f"""<section class="pfh-wall" aria-labelledby="pfh-wall-title">
<div class="pfh-wrap pfh-head pfh-wall-head"><div><p class="pfh-eyebrow">The collection</p><h2 id="pfh-wall-title">42 complete designs, ready to personalise.</h2></div><div class="pfh-wall-ctrl"><button type="button" class="pfh-wall-pause" data-pfh-wall-toggle aria-pressed="false">Pause</button><a class="pfh-link" href="/portfolio/templates/all/">Browse the collection {ARROW}</a></div></div>
<div class="pfh-wall-viewport" data-pfh-wall>{tracks}</div>
</section>"""


def build_main(plans: str, details: str) -> str:
    filters = '<button type="button" aria-pressed="true" data-pfh-filter="all">All <span>9</span></button>' + "".join(
        f'<button type="button" aria-pressed="false" data-pfh-filter="{p}">{p} <span>{sum(1 for f in FEATURED if f[1] == p)}</span></button>'
        for p in PROFESSIONS
    )
    cards = "\n".join(card(*f) for f in FEATURED)
    steps = "".join(
        f'<li class="pfh-reveal"><span class="pfh-step-n">0{i + 1}</span><h3>{t}</h3><p>{d}</p></li>' for i, (t, d) in enumerate(STEPS)
    )
    return f"""<main id="main" class="pfh">
{hero_html()}

{wall_html()}

<section class="pfh-section" id="about-service" aria-labelledby="pfh-about">
<div class="pfh-wrap pfh-about">
<div class="pfh-about-head pfh-reveal"><p class="pfh-eyebrow">About this service</p><h2 id="pfh-about">A ready-made portfolio website, personalised for you.</h2><p class="pfh-sub">Not a website builder you have to learn — our team does the work.</p></div>
<ul class="pfh-values">
<li class="pfh-reveal"><span class="pfh-value-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 5h16v11H4zM2 19h20"/></svg></span><div><h3>What you get</h3><p>A complete personal website that shows your skills, projects, experience and contact links — with one link you can share with recruiters, clients and on LinkedIn.</p></div></li>
<li class="pfh-reveal"><span class="pfh-value-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5M16 4.8a3.3 3.3 0 0 1 0 6.4M18.5 14.8c1.7.8 2.8 2.6 3 5.2"/></svg></span><div><h3>Who it is for</h3><p>Freshers, developers, designers, freelancers, creators and professionals who want a professional online presence without coding.</p></div></li>
<li class="pfh-reveal"><span class="pfh-value-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 4h10M7 8.5h10M7 4c4 0 6 1.8 6 4.5S11 13 7 13l7 7"/></svg></span><div><h3>What it costs</h3><p>Plans start at ₹999 for a one-page portfolio. Domain, shop and extra-page plans are below; the final scope and price are confirmed in writing before you pay.</p></div></li>
</ul>
</div>
</section>

<section class="pfh-section pfh-showcase" id="designs" aria-labelledby="pfh-designs">
<div class="pfh-wrap">
<div class="pfh-head pfh-reveal"><div><p class="pfh-eyebrow">Featured designs</p><h2 id="pfh-designs">Fresh starting points. 42 to explore.</h2></div><a class="pfh-link" href="/portfolio/templates/all/" data-pfh-all>View all 42 designs {ARROW}</a></div>
<div class="pfh-filters" role="group" aria-label="Show featured designs for">{filters}</div>
<p class="pfh-sr" aria-live="polite" data-pfh-status></p>
<div class="pfh-grid" id="pfh-grid">
{cards}
</div>
<div class="pfh-collection pfh-reveal" id="collection"><div><h3>42 designs for every profession.</h3><p>Filter by profession and style, preview complete demos, shortlist favourites and open each template’s details page.</p></div><a class="pfh-btn pfh-btn--ink" href="/portfolio/templates/all/">Browse all 42 templates {ARROW}</a></div>
</div>
</section>

<section class="pfh-section" id="how-it-works" aria-labelledby="pfh-how">
<div class="pfh-wrap"><div class="pfh-process">
<div class="pfh-head pfh-head--dark"><div><p class="pfh-eyebrow">From template to yours</p><h2 id="pfh-how">You bring the story. We bring it together.</h2></div><p class="pfh-sub">You pick one of our ready designs and send your resume, projects and photos. We personalise the design with your content, you review it, and we launch it.</p></div>
<ol class="pfh-steps">{steps}</ol>
</div></div>
</section>

<section class="pfh-section personalisation pfh-demo" aria-labelledby="pfh-demo">
<div class="pfh-wrap pfh-demo-grid">
<div class="pfh-demo-copy pfh-reveal">
<p class="pfh-eyebrow">A personalisation demonstration</p>
<h2 id="pfh-demo">Same foundation. Entirely your story.</h2>
<p class="pfh-sub">Names, initials, accent colours, skills, projects, and contact labels can change within the selected layout. These examples are fictional.</p>
<ul class="pfh-changes"><li>{CHECK}Name &amp; initials</li><li>{CHECK}Accent colours</li><li>{CHECK}Skills &amp; projects</li><li>{CHECK}Contact labels</li></ul>
<div class="personalisation-controls pfh-seg" role="group" aria-label="Choose a sample"><button type="button" class="active" data-personalise="original" aria-pressed="true">Neha’s sample</button><button type="button" data-personalise="alternate" aria-pressed="false">Arun’s sample</button></div>
<p class="personalise-open"><a class="pfh-link" href="/portfolio/demo/flutter-studio/" target="_blank" rel="noopener">Open the full demo ↗</a></p>
<p class="policy-note">Profile photos can replace initials where the selected layout supports them. Layout redesigns require a separate quote.</p>
</div>
<div class="pfh-browser"><div class="pfh-browser-bar" aria-hidden="true"><i></i><i></i><i></i><span>yourname.com</span></div><div class="personalise-shot"><iframe id="personalise-frame" title="Flutter Studio personalisation demonstration (preview)" src="/portfolio/demo/flutter-studio/" tabindex="-1" scrolling="no"></iframe></div></div>
</div>
</section>

<section class="pfh-section pricing-section pfh-pricing" id="pricing" aria-labelledby="pfh-plans">
<div class="pfh-wrap">
<div class="pfh-head pfh-head--center pfh-reveal"><div><p class="pfh-eyebrow">A clear starting point</p><h2 id="pfh-plans">Your website. Your choice.</h2><p class="pfh-sub">Pick a plan, preview templates, then continue on WhatsApp with your subscription pre-filled.</p></div></div>
{plans}
</div>
</section>

<section class="pfh-section" id="faqs" aria-labelledby="pfh-faq">
<div class="pfh-wrap pfh-faq">
<div class="pfh-faq-aside">
<p class="pfh-eyebrow">Before you begin</p><h2 id="pfh-faq">Good questions. Clear answers.</h2>
<div class="pfh-ask"><strong>Still deciding?</strong><p>Ask us on WhatsApp before you choose a plan.</p><button type="button" class="pfh-btn pfh-btn--ink" data-general-enquiry>Ask on WhatsApp ↗</button></div>
<a class="pfh-link" href="/portfolio/terms/#faqs">More answers about revisions, ownership &amp; delivery ↗</a>
</div>
<div class="faq-list pfh-faq-list">{details}</div>
</div>
</section>

<section class="pfh-section pfh-final-wrap" aria-labelledby="pfh-final">
<div class="pfh-wrap"><div class="pfh-final">
<div class="pfh-final-copy"><p class="pfh-eyebrow">Your next move</p><h2 id="pfh-final">You have the experience. <em>Give it a place to stand out.</em></h2>
<div class="pfh-actions"><a class="pfh-btn pfh-btn--accent pfh-btn--lg" href="/portfolio/templates/all/">Choose my template ↗</a><button type="button" class="pfh-btn pfh-btn--ghost-dark pfh-btn--lg" data-general-enquiry>Ask on WhatsApp ↗</button></div></div>
<div class="pfh-final-art" aria-hidden="true"><img src="/assets/portfolio/previews/motion-house.webp" alt="" width="1200" height="900" loading="lazy"><img src="/assets/portfolio/previews/fresh-start.webp" alt="" width="1200" height="900" loading="lazy"><img src="/assets/portfolio/previews/independent-pro.webp" alt="" width="1200" height="900" loading="lazy"></div>
</div></div>
</section>

<section class="enitexa-promo" aria-labelledby="enitexa-promo-title"><div class="enitexa-promo-inner"><div><p class="enitexa-promo-brand">ENITEXA<span>.AI</span> · SOFTWARE &amp; DIGITAL SOLUTIONS</p><h2 id="enitexa-promo-title">Need something built for your business?</h2><p>From custom websites and mobile apps to ERP, CRM, and business software, Enitexa.ai helps turn your ideas into tools that work for you.</p></div><div class="enitexa-promo-actions"><a class="enitexa-promo-primary" href="/software-solutions/#contact" target="_top">Discuss your project <span aria-hidden="true">↗</span></a><a href="/software-solutions/" target="_top">Explore Enitexa.ai <span aria-hidden="true">→</span></a></div></div></section>
</main>"""


def main() -> None:
    page = PAGE.read_text(encoding="utf-8")
    plans, details = extract(page)
    start, end = page.index('<main id="main"'), page.index("</main>") + len("</main>")
    page = page[:start] + build_main(plans, details) + page[end:]

    page = re.sub(r'<body class="[^"]*">', '<body class="career-tools light pf-service pf-home">', page, count=1)
    css = f'<link rel="stylesheet" href="/css/portfolio-home.css?v={V}">'
    page = re.sub(r'<link rel="stylesheet" href="/css/portfolio-home\.css\?v=[^"]*">', "", page)
    page = page.replace("</head>", css + "</head>", 1)
    js = f'<script defer src="/js/portfolio/home.js?v={V}"></script>'
    page = re.sub(r'<script defer src="/js/portfolio/home\.js\?v=[^"]*"></script>', "", page)
    page = page.replace("</body>", js + "</body>", 1)
    PAGE.write_text(page, encoding="utf-8")
    print(f"Rebuilt {PAGE.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
