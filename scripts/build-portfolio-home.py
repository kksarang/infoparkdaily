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
V = "20261109ab4"

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
    ("spotlight", "Influencers", "Spotlight", "Bold", "Travel &amp; food creator",
     "Spotlight is a creator page with audience figures, a video content grid, collaborations and packages."),
    ("split-portrait", "Designers", "Split Portrait", "Light", "UI designer portfolio",
     "Split Portrait places your story beside a strong portrait panel — clean and personal."),
    ("agency-landing", "Professionals", "Agency Landing", "Light", "Product consultant portfolio",
     "Agency Landing is a polished enterprise-style site for consultants and small studios."),
]
PROFESSIONS = list(dict.fromkeys(f[1] for f in FEATURED))

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


import json as _json
N = len(_json.loads((ROOT / "data" / "portfolio" / "catalog.json").read_text(encoding="utf-8")))


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
<div class="pfh-actions"><a class="pfh-btn pfh-btn--ink pfh-btn--lg" href="/portfolio/templates/all/">Browse {N} templates {ARROW}</a><a class="pfh-btn pfh-btn--line pfh-btn--lg" href="#pricing">See plans</a></div>
<ul class="pfh-trust"><li>{CHECK}{N} complete designs</li><li>{CHECK}Desktop, tablet &amp; mobile</li><li>{CHECK}Personalised by our team</li><li>{CHECK}Enquire on WhatsApp</li></ul>
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
<div class="pfh-wrap pfh-head pfh-wall-head"><div><p class="pfh-eyebrow">The collection</p><h2 id="pfh-wall-title">{N} complete designs, ready to personalise.</h2></div><div class="pfh-wall-ctrl"><button type="button" class="pfh-wall-pause" data-pfh-wall-toggle aria-pressed="false">Pause</button><a class="pfh-link" href="/portfolio/templates/all/">Browse the collection {ARROW}</a></div></div>
<div class="pfh-wall-viewport" data-pfh-wall>{tracks}</div>
</section>"""



WEBSITE_TYPES = [
    ("Blog", "Bloggers", "Cover stories, topics and a post feed that invites the next read.", [("ink-margin", "Ink & Margin"), ("night-notes", "Night Notes")]),
    ("Story", "Storytellers", "A life or travel story told in chapters, photos and milestones.", [("chapter-one", "Chapter One"), ("long-way-home", "Long Way Home")]),
    ("Profile", "Profiles", "A link-in-bio card or a digital business card — one link for everything.", [("link-card", "Link Card"), ("calling-card", "Calling Card")]),
    ("Business", "Business", "Services, process, packages and an enquiry form for local businesses.", [("kayal-interiors", "Kayal Interiors"), ("brightpath-tutors", "Brightpath Tutors")]),
    ("E-commerce", "Online stores", "A product catalogue with prices and WhatsApp enquiry — no checkout needed.", [("chai-clay", "Chai & Clay"), ("kasavu-lane", "Kasavu Lane")]),
    ("Influencer", "Influencers", "Audience figures, a content grid and collaboration packages in a media-kit style.", [("spotlight", "Spotlight"), ("glow-diaries", "Glow Diaries")]),
]


def types_html() -> str:
    cards = []
    for label, cat, line, designs in WEBSITE_TYPES:
        a, b = designs
        shots = "".join(
            f'<img src="/assets/portfolio/previews/{slug}.webp" width="1200" height="900" alt="" loading="lazy">' for slug, _n in designs
        )
        links = " · ".join(f'<a href="/portfolio/preview/{slug}/">{esc(name)}</a>' for slug, name in designs)
        cards.append(
            f'<article class="pfh-type pfh-reveal"><a class="pfh-type-shots" href="/portfolio/templates/all/?category={cat.replace(" ", "+")}" aria-label="See {label.lower()} designs">{shots}</a>'
            f'<div class="pfh-type-body"><p class="pfh-type-label">{label} <span>2 designs</span></p><p>{line}</p><p class="pfh-type-links">{links}</p></div></article>'
        )
    return f"""<section class="pfh-section pfh-types" id="website-types" aria-labelledby="pfh-types-title">
<div class="pfh-wrap">
<div class="pfh-head pfh-reveal"><div><p class="pfh-eyebrow">New · Beyond portfolios</p><h2 id="pfh-types-title">A website for every kind of story.</h2><p class="pfh-sub">Blogs, life stories, profiles, local businesses, small shops and creators — each with its own complete demo, personalised by our team.</p></div><a class="pfh-link" href="/portfolio/templates/all/">Browse all {N} designs {ARROW}</a></div>
<div class="pfh-types-grid">{"".join(cards)}</div>
</div>
</section>"""


def studio_html() -> str:
    """Daily Web Studio promo: copy + a store switcher (desktop and phone previews). Links to /studio/."""
    logo = '<svg viewBox="0 0 32 32" width="46" height="46" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#ffc107"/><rect x="7" y="8" width="18" height="16" rx="3" fill="#fff" stroke="#14151a" stroke-width="2"/><path d="M7.5 13h17" stroke="#14151a" stroke-width="2"/><rect x="10" y="16" width="5.5" height="5" rx="1.2" fill="#ff5b3a"/><rect x="17.5" y="16" width="4.5" height="1.8" rx=".9" fill="#14151a"/><rect x="17.5" y="19.2" width="3.2" height="1.8" rx=".9" fill="#14151a" opacity=".55"/></svg>'
    stores = [
        ("chai-clay", "Chai &amp; Clay", "Handmade ceramics", "chai-and-clay"),
        ("kasavu-lane", "Kasavu Lane", "Handloom clothing", "kasavu-lane"),
        ("shop-window", "Shop Window", "Maker &amp; seller", "shop-window"),
    ]
    tabs = "".join(
        f'<button type="button" role="tab" id="pfh-st-{s}" aria-controls="pfh-sp-{s}" aria-selected="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}" data-studio-tab="{s}">{n}</button>'
        for i, (s, n, _t, _u) in enumerate(stores)
    )
    slides = "".join(
        f'<figure class="pfh-sx{" is-on" if i == 0 else ""}" role="tabpanel" id="pfh-sp-{s}" aria-labelledby="pfh-st-{s}" data-studio-slide="{s}"{"" if i == 0 else " hidden"}>'
        f'<div class="pfh-sx-browser"><span class="pfh-sx-bar" aria-hidden="true"><i></i><i></i><i></i><em>{u}.pages.dev</em></span>'
        f'<img src="/assets/portfolio/previews/{s}.webp" width="1200" height="900" alt="{n} online store design on a laptop" loading="lazy"></div>'
        f'<div class="pfh-sx-phone"><img src="/assets/portfolio/previews/{s}-mobile.webp" width="390" height="844" alt="{n} on a phone" loading="lazy"></div>'
        f'<figcaption><span><strong>{n}</strong>{t} · sample store</span><a href="/portfolio/preview/{s}/">Preview store {ARROW}</a></figcaption></figure>'
        for i, (s, n, t, u) in enumerate(stores)
    )
    steps = [
        ("Pick a store design", "Start from a complete, phone-ready layout."),
        ("Add your products", "Photos, prices and descriptions, in your words."),
        ("Take orders on WhatsApp", "Customers message you straight from each product."),
    ]
    steps_html = "".join(f'<li><span>{i + 1}</span><div><strong>{t}</strong><small>{d}</small></div></li>' for i, (t, d) in enumerate(steps))
    return f"""<section class="pfh-section pfh-studio" id="daily-web-studio" aria-labelledby="pfh-studio-title">
<div class="pfh-wrap"><div class="pfh-studio-card pfh-reveal">
<div class="pfh-studio-copy">
<p class="pfh-studio-brand">{logo}<span><b>Daily Web Studio</b><small>by InfoparkDaily</small></span><em>New</em></p>
<h2 id="pfh-studio-title">Rather build it yourself? <span>Start your own online store.</span></h2>
<p class="pfh-studio-lead">Daily Web Studio is our new do-it-yourself website builder. Set up a store, portfolio or business site in minutes, and keep the code to host free.</p>
<ol class="pfh-studio-steps">{steps_html}</ol>
<div class="pfh-studio-ctas"><a class="pfh-btn pfh-btn--lg pfh-studio-go" href="/studio/" target="_blank" rel="noopener">Explore Daily Web Studio {ARROW}<span class="pfh-sr"> (opens in a new tab)</span></a><a class="pfh-studio-link" href="/studio/app/#/new?type=ecommerce" target="_blank" rel="noopener">Start a store, free<span class="pfh-sr"> (opens in a new tab)</span></a></div>
<p class="pfh-studio-trust">Free in early access · No card needed · 12 website types</p>
</div>
<div class="pfh-studio-show">
<div class="pfh-studio-tabs" role="tablist" aria-label="Example online stores">{tabs}</div>
<div class="pfh-sx-stack">{slides}</div>
</div>
</div></div>
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

<section class="pfh-section pfh-about2" id="about-service" aria-labelledby="pfh-about">
<div class="pfh-wrap pfh-bento">
<div class="pfh-b-main pfh-reveal">
<p class="pfh-eyebrow">About this service</p>
<h2 id="pfh-about">A ready-made portfolio website, personalised for you.</h2>
<p class="pfh-b-lead">Not a website builder you have to learn. You choose a design and send your details; our team builds it, checks it on every screen and launches it for you.</p>
<ol class="pfh-b-flow"><li><span>1</span>You choose a design</li><li><span>2</span>You send your details</li><li><span>3</span>We build &amp; launch</li></ol>
<div class="pfh-b-ctas"><a class="pfh-btn pfh-btn--accent" href="#pricing">See plans {ARROW}</a><a class="pfh-b-link" href="#designs">Browse designs</a></div>
</div>
<div class="pfh-b-card pfh-b-get pfh-reveal">
<span class="pfh-b-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 5h16v11H4zM2 19h20"/></svg></span>
<h3>What you get</h3>
<ul class="pfh-b-checks"><li>{CHECK}A complete website that works on phones, tablets and laptops</li><li>{CHECK}Your skills, projects, experience and resume download</li><li>{CHECK}Contact and social links in one place</li><li>{CHECK}One link to share with recruiters, clients and on LinkedIn</li></ul>
</div>
<div class="pfh-b-card pfh-b-who pfh-reveal">
<span class="pfh-b-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5M16 4.8a3.3 3.3 0 0 1 0 6.4M18.5 14.8c1.7.8 2.8 2.6 3 5.2"/></svg></span>
<h3>Who it is for</h3>
<ul class="pfh-b-chips"><li>Freshers</li><li>Developers</li><li>Designers</li><li>Freelancers</li><li>Creators</li><li>Professionals</li></ul>
<p>Anyone who wants a professional online presence without writing code.</p>
</div>
<div class="pfh-b-card pfh-b-cost pfh-reveal">
<span class="pfh-b-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 4h10M7 8.5h10M7 4c4 0 6 1.8 6 4.5S11 13 7 13l7 7"/></svg></span>
<h3>What it costs</h3>
<p class="pfh-b-price"><small>From</small>₹999<small>one-time</small></p>
<p>For a one-page portfolio. Domain, shop and extra-page plans are below. Scope and price are confirmed in writing before you pay.</p>
</div>
</div>
</section>

<section class="pfh-section pfh-showcase" id="designs" aria-labelledby="pfh-designs">
<div class="pfh-wrap">
<div class="pfh-head pfh-reveal"><div><p class="pfh-eyebrow">Featured designs</p><h2 id="pfh-designs">Fresh starting points. {N} to explore.</h2></div><a class="pfh-link" href="/portfolio/templates/all/" data-pfh-all>View all {N} designs {ARROW}</a></div>
<div class="pfh-filters" role="group" aria-label="Show featured designs for">{filters}</div>
<p class="pfh-sr" aria-live="polite" data-pfh-status></p>
<div class="pfh-grid" id="pfh-grid">
{cards}
</div>
<div class="pfh-collection pfh-reveal" id="collection"><div><h3>{N} designs for every profession.</h3><p>Filter by profession and style, preview complete demos, shortlist favourites and open each template’s details page.</p></div><a class="pfh-btn pfh-btn--ink" href="/portfolio/templates/all/">Browse all {N} templates {ARROW}</a></div>
</div>
</section>

{types_html()}

{studio_html()}

<section class="pfh-section" id="how-it-works" aria-labelledby="pfh-how">
<div class="pfh-wrap"><div class="pfh-process">
<div class="pfh-head pfh-head--dark"><div><p class="pfh-eyebrow">From template to yours</p><h2 id="pfh-how">You bring the story. We bring it together.</h2></div><p class="pfh-sub">You pick one of our ready designs and send your resume, projects and photos. We personalise the design with your content, you review it, and we launch it.</p></div>
<ol class="pfh-steps">{steps}</ol>
</div></div>
</section>

<section class="pfh-section personalisation pfh-demo pfh-demo2" aria-labelledby="pfh-demo">
<div class="pfh-wrap"><div class="pfh-demo-card">
<div class="pfh-demo-copy pfh-reveal">
<p class="pfh-eyebrow">See it personalised</p>
<h2 id="pfh-demo">Same design. <span>Entirely your story.</span></h2>
<p class="pfh-sub">Switch between two fictional people below and watch the same layout change: name, colours, headline, projects and skills.</p>
<div class="personalisation-controls pfh-people" role="group" aria-label="Choose a sample">
<button type="button" class="active" data-personalise="original" aria-pressed="true"><span class="pfh-av" style="--av:#d8ecb0">NM</span><span><b>Neha’s sample</b><small>Flutter &amp; mobile developer</small></span></button>
<button type="button" data-personalise="alternate" aria-pressed="false"><span class="pfh-av" style="--av:#ffd18f">AD</span><span><b>Arun’s sample</b><small>Mobile product engineer</small></span></button>
</div>
<p class="pfh-changes-label">What we change for you</p>
<ul class="pfh-changes2">
<li><span aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.4-3.6 4.4-5.5 8-5.5s6.6 1.9 8 5.5"/></svg></span>Name &amp; initials</li>
<li><span aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17M3.5 12h8.5"/></svg></span>Accent colours</li>
<li><span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h10M4 17h13"/></svg></span>Skills &amp; projects</li>
<li><span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/></svg></span>Contact links</li>
</ul>
<div class="pfh-demo-foot"><p class="personalise-open"><a class="pfh-btn pfh-btn--ink pfh-btn--sm" href="/portfolio/demo/flutter-studio/" target="_blank" rel="noopener">Open the full demo ↗</a></p>
<p class="policy-note">Examples are fictional. Profile photos can replace initials where the layout supports them; layout redesigns need a separate quote.</p></div>
</div>
<div class="pfh-demo-stage">
<span class="pfh-live" aria-hidden="true"><i></i>Live preview</span>
<div class="pfh-browser"><div class="pfh-browser-bar" aria-hidden="true"><i></i><i></i><i></i><span>yourname.com</span></div><div class="personalise-shot"><iframe id="personalise-frame" title="Flutter Studio personalisation demonstration (preview)" src="/portfolio/demo/flutter-studio/" tabindex="-1" scrolling="no"></iframe></div></div>
</div>
</div></div>
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
