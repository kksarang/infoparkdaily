"""Section layouts for the website-type templates: blog, story, profile, business, store, creator.

build-portfolios.py renders every demo with the shared shell (fictional-demo notice, header,
contact form, footer). For the layouts listed in TYPES it swaps the page body for the richer,
type-specific sections built here. All names, figures, prices and brands are fictional and
labelled as such on the page; imagery is original SVG/CSS art or the site's own sample photos.
"""

from __future__ import annotations

from html import escape

PHOTOS = ["/assets/portfolio/landscape.jpg", "/assets/portfolio/forest.jpg", "/assets/portfolio/ocean.jpg"]
PHOTO_ALT = ["Mountain landscape (sample photo)", "Forest canopy (sample photo)", "Coastline (sample photo)"]


def e(s) -> str:
    return escape(str(s), quote=True)


def photo(i: int, cls: str = "") -> str:
    i %= 3
    return f'<img class="{cls}" src="{PHOTOS[i]}" alt="{PHOTO_ALT[i]}" loading="lazy" width="1200" height="800">'


def tint(i: int, cls: str = "") -> str:
    """Abstract cover when a photo would repeat too often."""
    return f'<div class="v2-tint v2-tint-{i % 6} {cls}" aria-hidden="true"><i></i><b></b></div>'


# ---------------------------------------------------------------- product art (original SVG)
def product_svg(kind: str, c1: str, c2: str) -> str:
    shapes = {
        "cup": f'<path d="M58 70h84v52c0 26-19 44-42 44s-42-18-42-44z" fill="{c1}"/><path d="M142 86c22 0 26 34 0 34" fill="none" stroke="{c1}" stroke-width="10"/><path d="M58 92h84" stroke="{c2}" stroke-width="8"/><ellipse cx="100" cy="70" rx="42" ry="9" fill="{c2}"/>',
        "bowl": f'<path d="M36 92h128c0 40-29 64-64 64s-64-24-64-64z" fill="{c1}"/><ellipse cx="100" cy="92" rx="64" ry="12" fill="{c2}"/><path d="M60 118c26 10 54 10 80 0" stroke="{c2}" stroke-width="6" fill="none"/>',
        "planter": f'<path d="M100 26c-6 18-22 26-22 44 0 8 10 10 22 10s22-2 22-10c0-18-16-26-22-44z" fill="#4f7a4a"/><path d="M84 40c-16-4-28 6-30 20 14 2 26-4 30-20zM116 40c16-4 28 6 30 20-14 2-26-4-30-20z" fill="#6b9a5c"/><path d="M62 80h76l-10 80H72z" fill="{c1}"/><path d="M58 80h84v14H58z" fill="{c2}"/>',
        "vase": f'<path d="M86 30h28v20c0 10 26 22 26 58 0 34-18 52-40 52s-40-18-40-52c0-36 26-48 26-58z" fill="{c1}"/><path d="M66 104c22 8 46 8 68 0" stroke="{c2}" stroke-width="7" fill="none"/><path d="M84 30h32" stroke="{c2}" stroke-width="6"/>',
        "plate": f'<ellipse cx="100" cy="104" rx="72" ry="58" fill="{c2}"/><ellipse cx="100" cy="104" rx="52" ry="40" fill="{c1}"/><ellipse cx="100" cy="104" rx="30" ry="22" fill="{c2}" opacity=".6"/>',
        "teapot": f'<path d="M58 84h84c4 44-14 72-42 72s-46-28-42-72z" fill="{c1}"/><path d="M142 98c18-6 30 4 26 18-4 10-16 12-26 8" fill="none" stroke="{c1}" stroke-width="9"/><path d="M58 102c-18-8-30-2-30 10 0 6 4 10 10 12" fill="none" stroke="{c1}" stroke-width="9"/><path d="M74 84c4-14 48-14 52 0" fill="{c2}"/><circle cx="100" cy="66" r="7" fill="{c2}"/>',
        "candle": f'<rect x="66" y="70" width="68" height="88" rx="10" fill="{c1}"/><rect x="66" y="96" width="68" height="20" fill="{c2}"/><path d="M100 40c-8 10-10 18 0 26 10-8 8-16 0-26z" fill="#f2a33a"/><path d="M100 66v6" stroke="#333" stroke-width="3"/>',
        "tumbler": f'<path d="M70 48h60l-8 110H78z" fill="{c1}"/><path d="M72 76h56M74 104h52M76 132h48" stroke="{c2}" stroke-width="5"/>',
        "saree": f'<path d="M40 60h120v96H40z" fill="{c1}"/><path d="M40 60h120v14H40zM40 142h120v14H40z" fill="{c2}"/><path d="M40 82h120M40 134h120" stroke="{c2}" stroke-width="3"/><path d="M40 60l30 24v72" fill="none" stroke="#0002" stroke-width="2"/>',
        "kurta": f'<path d="M78 34h44l8 14 26 14-10 26-14-6v84H68V82l-14 6-10-26 26-14z" fill="{c1}"/><path d="M100 34v40" stroke="{c2}" stroke-width="4"/><path d="M68 150h64" stroke="{c2}" stroke-width="8"/>',
        "dupatta": f'<path d="M60 36c40 10 50 40 40 70s0 52 40 62H96c-30-14-36-40-26-66s6-46-30-66z" fill="{c1}"/><path d="M60 36c40 10 50 40 40 70" fill="none" stroke="{c2}" stroke-width="5"/>',
        "set": f'<path d="M50 40h44v116H50z" fill="{c1}"/><path d="M106 40h44v116h-44z" fill="{c2}"/><path d="M50 140h44M106 140h44" stroke="#fff6" stroke-width="6"/>',
    }
    return f'<svg viewBox="0 0 200 190" role="img" aria-label="Illustration of a {e(kind)}">{shapes[kind]}</svg>'


def section_head(over: str, title: str, aside: str = "") -> str:
    side = f'<p class="v2-aside">{aside}</p>' if aside else ""
    return f'<div class="v2-head"><div><p class="overline">{over}</p><h2>{title}</h2></div>{side}</div>'


def prof(t) -> str:
    return f'<p class="overline" data-profession>{e(t["profession"])}</p>'


# ---------------------------------------------------------------- BLOG
BLOG = {
    "ink-margin": {
        "name": "Ink &amp; Margin",
        "tagline": "Essays on food, slow living and the small rituals of a Kerala day.",
        "cats": ["Food", "Life", "Travel", "Craft"],
        "posts": [
            ("The slow art of a Sunday breakfast", "Food", 6, "12 Oct", "Puttu, steam and the quiet hour before the house wakes up."),
            ("What the monsoon teaches about patience", "Life", 4, "4 Oct", "Forty days of rain and one lesson I keep relearning."),
            ("Notes from a hill-station bookshop", "Travel", 7, "26 Sep", "A shelf of second-hand books and the stories inside the margins."),
            ("Writing every day for a hundred days", "Craft", 5, "18 Sep", "What changed, what didn’t, and the habit that finally stuck."),
            ("A small guide to quieter mornings", "Life", 3, "9 Sep", "Five tiny changes that made my first hour feel like mine."),
            ("Why I still keep a paper notebook", "Craft", 4, "1 Sep", "On ink, crossings-out and thinking at the speed of a pen."),
        ],
    },
    "night-notes": {
        "name": "Night Notes",
        "tagline": "Plain-language notes on building for the web, written after hours.",
        "cats": ["Web", "Backend", "Tools", "Basics"],
        "posts": [
            ("Understanding caching without the jargon", "Web", 8, "2026-10-14", "Why the second visit is faster, explained with a kitchen analogy."),
            ("A gentle introduction to message queues", "Backend", 10, "2026-10-02", "Producers, consumers and why your app should not wait in line."),
            ("Debugging habits that saved me hours", "Basics", 6, "2026-09-21", "Read the error, shrink the problem, change one thing at a time."),
            ("Reading a stack trace, line by line", "Basics", 5, "2026-09-09", "The scary wall of text is mostly a map. Here is how to read it."),
            ("What I learned shipping my first API", "Backend", 7, "2026-08-30", "Versioning, error messages and the questions I wish I had asked."),
            ("Small tools I use every day", "Tools", 4, "2026-08-17", "A short list of utilities that quietly make work easier."),
        ],
        "now": [("Reading", "A book on designing data-heavy applications"), ("Learning", "Rust, one small exercise at a time"), ("Building", "A tiny static site generator")],
    },
}


def render_blog(t) -> tuple[str, str]:
    d = BLOG[t["slug"]]
    posts = d["posts"]
    night = t["slug"] == "night-notes"
    chips = "".join(f'<a href="#posts">{c}</a>' for c in ["All"] + d["cats"])
    lead = posts[0]
    if night:
        intro = f"""<section id="intro" class="v2-blog-mast">
<div class="v2-term" aria-hidden="true"><span>~/notes</span> $ ls --latest</div>
{prof(t)}<h1>{e(t["headline"])}</h1>
<p class="v2-lede">{d["tagline"]} By <span data-person>{e(t["person"])}</span>.</p>
<nav class="v2-chips" aria-label="Topics">{chips}</nav>
</section>"""
        rows = "".join(
            f'<li><time>{p[3]}</time><div><h3><a href="#contact">{e(p[0])}</a></h3><p>{e(p[4])}</p></div><span class="v2-tag">#{p[1].lower()}</span><span class="v2-min">{p[2]} min</span></li>'
            for p in posts
        )
        now = "".join(f'<li><b>{k}</b><span>{e(v)}</span></li>' for k, v in d["now"])
        body = f"""<section id="posts" class="v2-sec">{section_head("LATEST NOTES", "Fresh from the notebook.", "Sample posts · titles and dates are illustrative.")}
<div class="v2-night-grid"><ol class="v2-postlist">{rows}</ol>
<aside class="v2-now" id="about"><p class="overline">/now</p><ul>{now}</ul>
<div class="v2-author"><span class="initials">{"".join(w[0] for w in t["person"].split())}</span><p>Written by <b data-person>{e(t["person"])}</b>, a fictional developer in this demo. Your bio and real writing go here.</p></div>
<a class="demo-button" href="#contact">Subscribe for new notes ↗</a></aside></div></section>"""
        nav = [("#posts", "Notes"), ("#about", "Now"), ("#contact", "Subscribe ↗")]
        return intro + body, nav

    feature = f"""<article class="v2-feature"><a href="#posts" class="v2-feature-media">{photo(0)}</a>
<div class="v2-feature-copy"><span class="v2-kicker">Featured · {lead[1]}</span><h2>{e(lead[0])}</h2><p>{e(lead[4])}</p>
<p class="v2-meta">{lead[3]} · {lead[2]} min read</p><a class="demo-button" href="#posts">Read the story ↗</a></div></article>"""
    intro = f"""<section id="intro" class="v2-blog-mast">
<div class="v2-mast-top"><p class="v2-mast-name">{d["name"]}</p><nav class="v2-chips" aria-label="Categories">{chips}</nav></div>
<div class="v2-mast-line">{prof(t)}<h1>{e(t["headline"])}</h1><p class="v2-lede">{d["tagline"]}</p></div>
{feature}
</section>"""
    cards = "".join(
        f'<article class="v2-post"><div class="v2-post-media">{photo(i) if i in (2, 4) else tint(i)}</div><span class="v2-kicker">{p[1]}</span><h3><a href="#contact">{e(p[0])}</a></h3><p>{e(p[4])}</p><p class="v2-meta">{p[3]} · {p[2]} min read</p></article>'
        for i, p in enumerate(posts[1:], start=1)
    )
    topics = "".join(f'<li><a href="#posts"><b>{c}</b><span>{sum(1 for p in posts if p[1] == c)} stories</span></a></li>' for c in d["cats"])
    body = f"""<section id="posts" class="v2-sec">{section_head("LATEST STORIES", "Fresh from the writing desk.", "Sample posts · every title and date is illustrative.")}<div class="v2-post-grid">{cards}</div></section>
<section id="topics" class="v2-sec v2-topics">{section_head("BROWSE BY TOPIC", "Find your kind of story.")}<ul>{topics}</ul></section>
<section id="about" class="v2-sec v2-authorband"><span class="v2-avatar">{"".join(w[0] for w in t["person"].split())}</span>
<div><p class="overline">ABOUT THE WRITER</p><h2>Hello, I’m <span data-person>{e(t["person"])}</span>.</h2><p>A fictional writer in this template demonstration. Your real bio, photo and favourite pieces replace this text.</p></div>
<a class="demo-button" href="#contact">Get new stories by email ↗</a></section>"""
    nav = [("#posts", "Stories"), ("#topics", "Topics"), ("#about", "About"), ("#contact", "Subscribe ↗")]
    return intro + body, nav


# ---------------------------------------------------------------- STORY
STORY = {
    "chapter-one": {
        "chapters": [
            ("Where it began", "A small town, one library and a habit of reading everything I could reach. The librarian let me borrow two books instead of one, and that felt like a promise."),
            ("The first stage", "A school debate I almost skipped. My hands shook, my voice didn’t, and I learned that being nervous and being ready can happen at the same time."),
            ("The hard years", "A steady job that never quite fit, evenings spent learning something new, and the long decision to begin again at twenty-nine."),
            ("What I know now", "Every chapter teaches the next one. I now help people tell their own stories — clearly, kindly and without pretending the hard parts away."),
        ],
        "quote": "You don’t need a perfect story. You need an honest one, told well.",
        "miles": [("Chapter 1", "First library card"), ("Chapter 2", "First talk on a stage"), ("Chapter 3", "A new career"), ("Chapter 4", "Helping others tell theirs")],
    },
    "long-way-home": {
        "stops": [
            ("Kochi", "The start", "Packed one bag, one notebook and far too many snacks.", 2),
            ("Munnar", "Into the hills", "Tea slopes, cold mornings and a bus driver who hummed the whole way.", 1),
            ("Hampi", "Among the boulders", "Sunrise on ancient stone and a lesson in walking slowly.", 0),
            ("Home again", "The return", "Same street, different eyes. The best part of leaving is coming back.", 2),
        ],
        "stats": [("4", "stops"), ("21", "days on the road"), ("1", "full notebook")],
    },
}


def render_story(t) -> tuple[str, str]:
    d = STORY[t["slug"]]
    initials = "".join(w[0] for w in t["person"].split())
    if t["slug"] == "long-way-home":
        stops = "".join(
            f'<li class="v2-stop"><div class="v2-stop-media">{photo(s[3])}</div><div class="v2-stop-copy"><span class="v2-stop-n">0{i + 1}</span><p class="overline">{e(s[1])}</p><h3>{e(s[0])}</h3><p>{e(s[2])}</p></div></li>'
            for i, s in enumerate(d["stops"])
        )
        stats = "".join(f"<div><b>{n}</b><span>{l}</span></div>" for n, l in d["stats"])
        intro = f"""<section id="intro" class="v2-cine">{photo(0, "v2-cine-bg")}
<div class="v2-cine-copy">{prof(t)}<h1>{e(t["headline"])}</h1>
<p class="v2-lede">A travel story by <span data-person>{e(t["person"])}</span> — told in four stops and one long road.</p>
<a class="demo-button" href="#journey">Begin the journey ↓</a></div></section>"""
        body = f"""<section class="v2-statband" aria-label="Trip at a glance (sample figures)">{stats}<small>Sample figures for this fictional demo.</small></section>
<section id="journey" class="v2-sec">{section_head("THE ROUTE", "Four stops. One long road.")}<ol class="v2-route">{stops}</ol></section>
<section id="about" class="v2-sec v2-story-about"><blockquote>“The road is the teacher. I just took notes.”</blockquote>
<p>A fictional travel storyteller in this template demonstration. Your own journey, photos and words replace these.</p></section>"""
        nav = [("#journey", "Journey"), ("#about", "About"), ("#contact", "Say hello ↗")]
        return intro + body, nav

    chapters = "".join(
        f'<article class="v2-chapter"><div class="v2-chapter-n"><span>Chapter</span><b>{i + 1:02d}</b></div><div class="v2-chapter-body"><h3>{e(c[0])}</h3><p>{e(c[1])}</p>{(photo(i) if i in (1, 3) else "")}</div></article>'
        + (f'<blockquote class="v2-pull">“{e(d["quote"])}”</blockquote>' if i == 1 else "")
        for i, c in enumerate(d["chapters"])
    )
    miles = "".join(f'<li><span>{a}</span><b>{e(b)}</b></li>' for a, b in d["miles"])
    intro = f"""<section id="intro" class="v2-story-hero"><div>{prof(t)}<h1>{e(t["headline"])}</h1>
<p class="v2-lede">The story of <span data-person>{e(t["person"])}</span> — four chapters about starting small, staying curious and beginning again.</p>
<a class="demo-button" href="#story">Start reading ↓</a></div>
<div class="v2-portrait" aria-hidden="true"><span class="about-monogram">{initials}</span><i></i></div></section>"""
    body = f"""<section id="story" class="v2-sec">{section_head("THE STORY", "Every chapter counts.", "A fictional life story written for this demo.")}<div class="v2-chapters">{chapters}</div></section>
<section id="milestones" class="v2-sec">{section_head("MILESTONES", "The moments in between.")}<ol class="v2-miles">{miles}</ol></section>
<section id="about" class="v2-sec v2-authorband"><span class="v2-avatar">{initials}</span><div><p class="overline">INVITE ME</p><h2>Talks, workshops and writing.</h2><p>Your real topics, past events and booking details go here.</p></div><a class="demo-button" href="#contact">Invite me to speak ↗</a></section>"""
    nav = [("#story", "Story"), ("#milestones", "Milestones"), ("#contact", "Invite ↗")]
    return intro + body, nav


# ---------------------------------------------------------------- PROFILE
def render_profile(t) -> tuple[str, str]:
    initials = "".join(w[0] for w in t["person"].split())
    if t["slug"] == "link-card":
        links = [("My portfolio", "Case studies and launches"), ("Latest article", "On writing product pages people read"), ("LinkedIn", "Your approved profile link"), ("Book a 20-minute call", "Opens the contact section")]
        buttons = "".join(f'<li><a href="#contact"><b>{a}</b><span>{b}</span><i aria-hidden="true">↗</i></a></li>' for a, b in links)
        socials = "".join(f'<a href="#contact">{s}</a>' for s in ["Instagram", "LinkedIn", "Medium", "Email"])
        tiles = "".join(f'<li>{tint(i + 1)}<span>{e(p["title"])}</span></li>' for i, p in enumerate(t["projects"]))
        intro = f"""<section id="intro" class="v2-linkcard"><div class="v2-lc">
<span class="v2-lc-avatar">{initials}</span>
<h1><span data-person>{e(t["person"])}</span></h1>{prof(t)}
<p class="v2-lede">{e(t["headline"])} Based in Kochi · open to collaborations.</p>
<nav class="v2-lc-social" aria-label="Profiles">{socials}</nav>
<ul class="v2-lc-links">{buttons}</ul>
<div id="highlights" class="v2-lc-hl"><p class="overline">HIGHLIGHTS</p><ul>{tiles}</ul></div>
<p class="v2-note">Fictional profile · links point to the demo contact form.</p>
</div></section>"""
        nav = [("#highlights", "Highlights"), ("#contact", "Contact ↗")]
        return intro, nav

    facts = [("Focus", "Operations &amp; growth"), ("Works with", "Small and mid-size teams"), ("Languages", "English · Malayalam · Hindi"), ("Availability", "Two new projects a month")]
    contact = [("Email", "Your approved email"), ("Phone", "Your approved number"), ("Location", "Kochi · remote-friendly"), ("Hours", "Mon–Fri · 10am–6pm")]
    services = "".join(f'<li><span>0{i + 1}</span><b>{e(s)}</b></li>' for i, s in enumerate(t["skills"]))
    intro = f"""<section id="intro" class="v2-vcard-hero"><div class="v2-vcard-copy">{prof(t)}<h1>{e(t["headline"])}</h1>
<p class="v2-lede">I’m <span data-person>{e(t["person"])}</span>. This page is my calling card — what I do, how to reach me, and when I’m free.</p>
<div class="intro-actions"><a class="demo-button" href="#contact">Save my contact ↗</a><span class="v2-avail"><i></i> Taking new projects</span></div></div>
<div class="v2-vcard" aria-label="Business card (fictional)"><div class="v2-vcard-front"><span class="v2-vcard-mono">{initials}</span><b data-person>{e(t["person"])}</b><small>{e(t["profession"])}</small><div class="v2-vcard-qr" aria-hidden="true">{"".join("<i></i>" for _ in range(25))}</div></div></div></section>"""
    body = f"""<section id="details" class="v2-sec">{section_head("AT A GLANCE", "The essentials.", "Fictional details for this demo.")}
<div class="v2-vgrid"><dl class="v2-facts">{"".join(f"<div><dt>{a}</dt><dd>{b}</dd></div>" for a, b in facts)}</dl>
<dl class="v2-facts v2-facts--contact">{"".join(f"<div><dt>{a}</dt><dd>{b}</dd></div>" for a, b in contact)}</dl></div></section>
<section id="services" class="v2-sec">{section_head("HOW I HELP", "Four ways to work together.")}<ol class="v2-svc">{services}</ol></section>"""
    nav = [("#details", "Details"), ("#services", "Services"), ("#contact", "Contact ↗")]
    return intro + body, nav


# ---------------------------------------------------------------- BUSINESS
BIZ_ICONS = {
    "home": '<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z"/>',
    "pan": '<path d="M3 12h13a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5zM16 12h5"/>',
    "desk": '<path d="M3 9h18M5 9v10M19 9v10M8 9V5h8v4"/>',
    "chat": '<path d="M4 5h16v11H9l-5 4z"/>',
    "calc": '<path d="M6 3h12v18H6zM9 7h6M9 12h1M14 12h1M9 16h1M14 16h1"/>',
    "flask": '<path d="M9 3h6M10 3v6l-5 10h14l-5-10V3"/>',
    "book": '<path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1z"/>',
    "code": '<path d="m8 8-4 4 4 4M16 8l4 4-4 4"/>',
}


def icon(k: str) -> str:
    return f'<svg viewBox="0 0 24 24" aria-hidden="true">{BIZ_ICONS[k]}</svg>'


def render_business(t) -> tuple[str, str]:
    if t["slug"] == "kayal-interiors":
        services = [("home", "Homes", "Full-home interiors planned around how you actually live."), ("pan", "Kitchens", "Practical layouts, durable finishes and storage that works."), ("desk", "Workspaces", "Offices and studios that help teams focus."), ("chat", "Consultations", "A two-hour session to plan before you spend.")]
        svc = "".join(f'<article class="v2-biz-card"><span class="v2-ico">{icon(k)}</span><h3>{a}</h3><p>{b}</p></article>' for k, a, b in services)
        steps = "".join(f'<li><b>0{i + 1}</b><h3>{a}</h3><p>{b}</p></li>' for i, (a, b) in enumerate([("Visit", "We see the space and listen."), ("Plan", "Layouts, materials and a written estimate."), ("Build", "Our partners execute; we supervise."), ("Handover", "A walkthrough and care guide.")]))
        work = "".join(f'<article class="v2-room v2-room-{i}"><div class="v2-room-art" aria-hidden="true"><i></i><b></b><em></em></div><div><h3>{e(p["title"])}</h3><p>{e(p["description"])}</p></div></article>' for i, p in enumerate(t["projects"]))
        pk = [("Consult", "₹6,999", ["Two-hour site visit", "Mood board", "Budget guidance"]), ("Room", "₹49,000", ["One room design", "3D views", "Material list"]), ("Home", "On quote", ["Full-home design", "Execution support", "Site supervision"])]
        packages = "".join(f'<article class="v2-pack{" is-pop" if i == 1 else ""}"><h3>{a}</h3><p class="v2-pack-price">{p}<small>{"" if p == "On quote" else " onwards"}</small></p><ul>{"".join(f"<li>{x}</li>" for x in xs)}</ul><a class="demo-button" href="#contact">Enquire ↗</a></article>' for i, (a, p, xs) in enumerate(pk))
        intro = f"""<section id="intro" class="v2-biz-hero"><div>{prof(t)}<h1>{e(t["headline"])}</h1>
<p class="v2-lede">Kayal Interiors is a fictional design studio run by <span data-person>{e(t["person"])}</span> — calm, practical spaces for homes and small offices.</p>
<div class="intro-actions"><a class="demo-button" href="#contact">Book a site visit ↗</a><a href="#work">See our work ↓</a></div></div>
<div class="v2-room v2-room-hero" aria-hidden="true"><div class="v2-room-art"><i></i><b></b><em></em></div><span class="v2-biz-badge">Sample studio · Kochi</span></div></section>"""
        body = f"""<section id="services" class="v2-sec">{section_head("SERVICES", "What we design.")}<div class="v2-biz-grid">{svc}</div></section>
<section id="process" class="v2-sec">{section_head("HOW WE WORK", "Four calm steps.")}<ol class="v2-steps">{steps}</ol></section>
<section id="work" class="v2-sec">{section_head("SELECTED WORK", "Spaces we’ve shaped.", "Illustrative projects for this demo.")}<div class="v2-rooms">{work}</div></section>
<section id="packages" class="v2-sec">{section_head("PACKAGES", "Clear starting points.", "Sample pricing — your real prices replace these.")}<div class="v2-packs">{packages}</div></section>"""
        nav = [("#services", "Services"), ("#work", "Work"), ("#packages", "Packages"), ("#contact", "Book a visit ↗")]
        return intro + body, nav

    subjects = [("calc", "Mathematics", "Classes 6–12 · board &amp; entrance basics"), ("flask", "Science", "Physics, chemistry and biology with practicals"), ("book", "English", "Grammar, writing and spoken confidence"), ("code", "Coding for kids", "Logic and Scratch for ages 9–14")]
    subj = "".join(f'<article class="v2-subj"><span class="v2-ico">{icon(k)}</span><h3>{a}</h3><p>{b}</p></article>' for k, a, b in subjects)
    rows = [("Mon · Wed · Fri", "4:30–6:00 pm", "Maths · Classes 8–10"), ("Tue · Thu", "4:30–6:00 pm", "Science · Classes 8–10"), ("Saturday", "10:00–12:00", "English · all classes"), ("Sunday", "11:00–12:30", "Coding for kids")]
    table = "".join(f"<tr><td>{a}</td><td>{b}</td><td>{c}</td></tr>" for a, b, c in rows)
    areas = "".join(f"<li>{x}</li>" for x in ["Kakkanad", "Edappally", "Vyttila", "Palarivattom", "Online"])
    faqs = [("How big are the batches?", "Small groups so every student gets attention. Your real batch size goes here."), ("Is there a trial class?", "Many centres offer one. State your actual policy here."), ("How are parents updated?", "Describe how you share progress — reports, meetings or messages.")]
    faq = "".join(f"<details><summary>{q}<span>＋</span></summary><p>{a}</p></details>" for q, a in faqs)
    why = "".join(f"<li><b>{a}</b><span>{b}</span></li>" for a, b in [("Small batches", "Room for every question"), ("Friendly tutors", "Patient, clear explanations"), ("Regular updates", "Parents always know where things stand")])
    intro = f"""<section id="intro" class="v2-local-hero"><div>{prof(t)}<h1>{e(t["headline"])}</h1>
<p class="v2-lede">Brightpath Tutors is a fictional tuition centre run by <span data-person>{e(t["person"])}</span>. Replace this with your centre’s real story.</p>
<div class="intro-actions"><a class="demo-button" href="#contact">Ask about admissions ↗</a><a href="#timetable">See the timetable ↓</a></div></div>
<div class="v2-local-board" aria-hidden="true"><span class="v2-sticker">Admissions<br>open*</span><b>A+</b><i></i><i></i><i></i><small>*Sample banner</small></div></section>"""
    body = f"""<section id="subjects" class="v2-sec">{section_head("SUBJECTS", "What we teach.")}<div class="v2-subjects">{subj}</div></section>
<section class="v2-sec v2-why">{section_head("WHY FAMILIES CHOOSE US", "Small classes. Big confidence.")}<ul>{why}</ul></section>
<section id="timetable" class="v2-sec">{section_head("TIMETABLE", "This term’s batches.", "Sample timetable.")}<div class="v2-tablewrap"><table class="v2-table"><thead><tr><th>Days</th><th>Time</th><th>Batch</th></tr></thead><tbody>{table}</tbody></table></div>
<p class="overline v2-areas-label">AREAS WE SERVE</p><ul class="v2-areas">{areas}</ul></section>
<section id="faq" class="v2-sec">{section_head("QUESTIONS", "Parents often ask.")}<div class="v2-faq">{faq}</div></section>"""
    nav = [("#subjects", "Subjects"), ("#timetable", "Timetable"), ("#faq", "FAQ"), ("#contact", "Admissions ↗")]
    return intro + body, nav


# ---------------------------------------------------------------- STORE
STORES = {
    "chai-clay": {
        "bar": "Sample store · orders by WhatsApp enquiry · no online checkout",
        "cats": ["All", "Cups", "Bowls", "Planters", "Gifts"],
        "products": [
            ("Monsoon mug", "Cups", 650, "cup", "#5b7f95", "#e8dccb", "New"),
            ("Breakfast bowl", "Bowls", 720, "bowl", "#c9774f", "#f1e2d0", ""),
            ("Tabletop planter", "Planters", 890, "planter", "#e3c9a8", "#b9824f", ""),
            ("Bud vase", "Gifts", 540, "vase", "#7e9a7a", "#e7e0cf", "Bestseller*"),
            ("Dinner plate", "Bowls", 980, "plate", "#d9a46b", "#f5ecdf", ""),
            ("Little teapot", "Gifts", 1450, "teapot", "#3f5f6e", "#d8c6a8", ""),
            ("Soy candle cup", "Gifts", 480, "candle", "#efe4d2", "#b9824f", ""),
            ("Ridge tumbler", "Cups", 420, "tumbler", "#a65f43", "#ecd9c4", ""),
        ],
    },
    "kasavu-lane": {
        "bar": "Sample label · enquire on WhatsApp for sizes and delivery",
        "cats": ["All", "Sarees", "Kurtas", "Dupattas", "Sets"],
        "products": [
            ("Gold border kasavu saree", "Sarees", 3400, "saree", "#f4ecd8", "#c9a24a", "New"),
            ("Everyday cotton kurta", "Kurtas", 1250, "kurta", "#2f4a43", "#c9a24a", ""),
            ("Temple stripe dupatta", "Dupattas", 890, "dupatta", "#8e2f2f", "#c9a24a", ""),
            ("Festive two-piece set", "Sets", 4200, "set", "#f4ecd8", "#c9a24a", "Limited*"),
            ("Indigo handloom kurta", "Kurtas", 1450, "kurta", "#2b3d63", "#e6d3a3", ""),
            ("Silk-blend saree", "Sarees", 5600, "saree", "#6b2737", "#d9b45c", ""),
        ],
    },
}


def money(n: int) -> str:
    return f"₹{n:,}"


def render_store(t) -> tuple[str, str]:
    d = STORES[t["slug"]]
    cur = ' aria-current="true"'
    chips = "".join(f'<a href="#shop"{cur if i == 0 else ""}>{c}</a>' for i, c in enumerate(d["cats"]))
    cards = "".join(
        f'<article class="v2-prod"><div class="v2-prod-media">{product_svg(k, c1, c2)}{f"<span class=v2-prod-tag>{tag}</span>" if tag else ""}</div>'
        f'<div class="v2-prod-copy"><span>{cat}</span><h3>{e(name)}</h3><p class="v2-price">{money(price)}</p></div>'
        f'<a class="v2-prod-btn" href="#contact">Enquire ↗</a></article>'
        for name, cat, price, k, c1, c2, tag in d["products"]
    )
    bar = f'<p class="v2-shopbar">{d["bar"]}</p>'
    if t["slug"] == "kasavu-lane":
        cols = [("Kasavu sarees", "saree", "#f4ecd8", "#c9a24a"), ("Everyday kurtas", "kurta", "#2f4a43", "#c9a24a"), ("Festive sets", "set", "#6b2737", "#d9b45c")]
        coll = "".join(f'<a class="v2-coll" href="#shop"><div class="v2-coll-art">{product_svg(k, c1, c2)}</div><b>{n}</b><span>Shop the edit →</span></a>' for n, k, c1, c2 in cols)
        sizes = "".join(f"<tr><td>{s}</td><td>{c}</td><td>{l}</td></tr>" for s, c, l in [("S", "36", "42"), ("M", "38", "43"), ("L", "40", "44"), ("XL", "42", "45")])
        steps = "".join(f"<li><b>0{i + 1}</b><span>{x}</span></li>" for i, x in enumerate(["Pick a design and size", "Send us a WhatsApp message", "Confirm price, delivery and payment details"]))
        intro = f"""{bar}<section id="intro" class="v2-loom-hero"><div>{prof(t)}<h1>{e(t["headline"])}</h1>
<p class="v2-lede">Kasavu Lane is a fictional handloom label by <span data-person>{e(t["person"])}</span> — woven slowly, worn often.</p>
<div class="intro-actions"><a class="demo-button" href="#collections">Explore the collection ↓</a><a href="#order">How to order</a></div></div>
<div class="v2-loom-art" aria-hidden="true">{product_svg("saree", "#f4ecd8", "#c9a24a")}{product_svg("dupatta", "#8e2f2f", "#c9a24a")}</div></section>"""
        body = f"""<section id="collections" class="v2-sec">{section_head("COLLECTIONS", "Three edits for every day.")}<div class="v2-colls">{coll}</div></section>
<section id="shop" class="v2-sec">{section_head("SHOP", "This season’s pieces.", "Sample products &amp; prices.")}<nav class="v2-chips" aria-label="Product types">{chips}</nav><div class="v2-prods">{cards}</div></section>
<section id="order" class="v2-sec v2-order">{section_head("HOW TO ORDER", "Simple, by message.")}<ol class="v2-order-steps">{steps}</ol>
<div class="v2-tablewrap"><table class="v2-table"><caption>Kurta size guide (inches, sample)</caption><thead><tr><th>Size</th><th>Chest</th><th>Length</th></tr></thead><tbody>{sizes}</tbody></table></div></section>"""
        nav = [("#collections", "Collections"), ("#shop", "Shop"), ("#order", "How to order"), ("#contact", "Enquire ↗")]
        return intro + body, nav

    intro = f"""{bar}<section id="intro" class="v2-craft-hero"><div>{prof(t)}<h1>{e(t["headline"])}</h1>
<p class="v2-lede">Chai &amp; Clay is a fictional ceramics studio by <span data-person>{e(t["person"])}</span>. Every piece is thrown, glazed and fired by hand.</p>
<div class="intro-actions"><a class="demo-button" href="#shop">Shop the collection ↓</a><a href="#story">Meet the maker</a></div></div>
<div class="v2-craft-art" aria-hidden="true"><div>{product_svg("teapot", "#3f5f6e", "#d8c6a8")}</div><div>{product_svg("cup", "#5b7f95", "#e8dccb")}</div><span>New · Monsoon glaze</span></div></section>"""
    perks = "".join(f"<li><b>{a}</b><span>{b}</span></li>" for a, b in [("Made by hand", "Small batches, each piece slightly different"), ("Packed with care", "Delivery details confirmed on enquiry"), ("Gift notes", "Add a handwritten note on request")])
    body = f"""<section id="shop" class="v2-sec">{section_head("THE COLLECTION", "Pieces for slow mornings.", "Sample products &amp; prices.")}<nav class="v2-chips" aria-label="Product types">{chips}</nav><div class="v2-prods">{cards}</div></section>
<section class="v2-sec v2-perks"><ul>{perks}</ul></section>
<section id="story" class="v2-sec v2-maker"><div class="v2-maker-art" aria-hidden="true">{product_svg("vase", "#7e9a7a", "#e7e0cf")}</div><div><p class="overline">THE MAKER</p><h2>Clay, patience and a little chai.</h2><p>A fictional maker’s story for this demo. Your studio story, process photos and care instructions go here.</p></div></section>"""
    nav = [("#shop", "Shop"), ("#story", "Our story"), ("#contact", "Enquire ↗")]
    return intro + body, nav


# ---------------------------------------------------------------- CREATOR / INFLUENCER
def render_creator(t) -> tuple[str, str]:
    initials = "".join(w[0] for w in t["person"].split())
    if t["slug"] == "spotlight":
        stats = "".join(f"<div><b>{n}</b><span>{l}</span></div>" for n, l in [("120K*", "community"), ("3.4M*", "monthly views"), ("85*", "brand stories")])
        tiles = []
        caps = ["Street food at midnight", "Sunrise above the clouds", "A 10-rupee breakfast", "Forest trail in the rain", "The coastal train", "Tea estate tour"]
        for i, c in enumerate(caps):
            media = photo(i) if i in (1, 3, 4) else tint(i + 2)
            tiles.append(f'<li class="v2-tile v2-tile-{i}">{media}<span class="v2-play">▶ {["0:48", "2:14", "1:05", "3:30", "0:59", "4:12"][i]}</span><b>{c}</b></li>')
        partners = "".join(f"<li>{p}</li>" for p in ["Kettle &amp; Kite", "Monsoon Trail Co.", "Coastline Stays", "Pepper Lane Kitchen"])
        packs = "".join(f'<article class="v2-pack"><h3>{a}</h3><p>{b}</p><p class="v2-pack-price">Rates on enquiry</p></article>' for a, b in [("Reel", "One 30–60 second vertical video with captions."), ("Story set", "Three to five stories with a link sticker."), ("Long-form", "A dedicated segment in a YouTube travel episode.")])
        intro = f"""<section id="intro" class="v2-spot-hero"><div>{prof(t)}<h1>{e(t["headline"])}</h1>
<p class="v2-lede">Hi, I’m <span data-person>{e(t["person"])}</span> — I travel slowly and eat everything. A fictional creator profile for this demo.</p>
<ul class="v2-platforms"><li>Instagram</li><li>YouTube</li><li>Newsletter</li></ul>
<div class="intro-actions"><a class="demo-button" href="#work-with-me">Work with me ↗</a><a href="#content">Watch the latest ↓</a></div></div>
<div class="v2-spot-stack" aria-hidden="true">{photo(1, "v2-spot-a")}{photo(2, "v2-spot-b")}<span class="v2-spot-badge">● New episode</span></div></section>
<section class="v2-statband v2-statband--pop" aria-label="Audience (sample figures)">{stats}<small>*Illustrative figures. Your verified numbers replace these.</small></section>"""
        body = f"""<section id="content" class="v2-sec">{section_head("LATEST CONTENT", "Stories from the road.")}<ul class="v2-tiles">{"".join(tiles)}</ul></section>
<section class="v2-sec v2-partners">{section_head("BRANDS I’VE WORKED WITH", "Collaborations.", "Illustrative partner names.")}<ul>{partners}</ul></section>
<section id="work-with-me" class="v2-sec">{section_head("WORK WITH ME", "Ways to collaborate.")}<div class="v2-packs">{packs}</div></section>"""
        nav = [("#content", "Content"), ("#work-with-me", "Collaborate"), ("#contact", "Media kit ↗")]
        return intro + body, nav

    age = "".join(f'<li><span>{a}</span><i style="--w:{w}%"></i><b>{w}%</b></li>' for a, w in [("18–24", 34), ("25–34", 46), ("35–44", 14), ("45+", 6)])
    cities = "".join(f'<li><span>{c}</span><i style="--w:{w}%"></i><b>{w}%</b></li>' for c, w in [("Kochi", 28), ("Bengaluru", 22), ("Chennai", 15), ("Dubai", 9)])
    pillars = "".join(f'<article class="v2-pillar v2-pillar-{i}"><span>0{i + 1}</span><h3>{a}</h3><p>{b}</p></article>' for i, (a, b) in enumerate([("Skincare routines", "Simple, budget-friendly routines for humid weather."), ("Slow living", "Home rituals, journaling and gentle weekends."), ("Honest finds", "Products tested for weeks before I share them.")]))
    collab = "".join(f"<li><b>{a}</b><span>{b}</span></li>" for a, b in [("Spring", "A three-part routine series for a skincare label"), ("Summer", "Home-fragrance launch with a giveaway"), ("Autumn", "A festive gifting guide for a local boutique")])
    intro = f"""<section id="intro" class="v2-glow-hero"><div class="v2-glow-ring" aria-hidden="true"><span>{initials}</span></div>
<div><span class="v2-glow-badge">Media kit · 2026 sample</span>{prof(t)}<h1>{e(t["headline"])}</h1>
<p class="v2-lede">I’m <span data-person>{e(t["person"])}</span>, a fictional lifestyle creator. Calm routines, honest reviews and a community that asks good questions.</p>
<div class="intro-actions"><a class="demo-button" href="#contact">Request the media kit ↗</a><a href="#audience">Audience ↓</a></div></div></section>"""
    body = f"""<section id="audience" class="v2-sec">{section_head("AUDIENCE", "Who’s listening.", "Illustrative figures for this demo.")}
<div class="v2-bars-grid"><div><p class="overline">AGE</p><ul class="v2-bars">{age}</ul></div><div><p class="overline">TOP CITIES</p><ul class="v2-bars">{cities}</ul></div></div></section>
<section id="pillars" class="v2-sec">{section_head("CONTENT PILLARS", "What I make.")}<div class="v2-pillars">{pillars}</div></section>
<section class="v2-sec v2-collab">{section_head("RECENT COLLABORATIONS", "A year of partnerships.", "Fictional examples.")}<ol>{collab}</ol></section>"""
    nav = [("#audience", "Audience"), ("#pillars", "Content"), ("#contact", "Media kit ↗")]
    return intro + body, nav


TYPES = {
    "blog-mag": render_blog,
    "blog-night": render_blog,
    "story-chapters": render_story,
    "story-journey": render_story,
    "profile-links": render_profile,
    "profile-card": render_profile,
    "biz-studio": render_business,
    "biz-local": render_business,
    "store-craft": render_store,
    "store-loom": render_store,
    "creator-media": render_creator,
    "creator-kit": render_creator,
}

# Restaurant, event, startup, real estate, corporate and landing-page layouts.
from portfolio_types_more import TYPES_MORE  # noqa: E402  (needs the helpers above)

TYPES.update(TYPES_MORE)

V2_CSS = '<link rel="stylesheet" href="/css/portfolio-demo-v2.css?v=1">'


def apply(t, html: str) -> str:
    """Swap the shared demo body for this layout's sections; keep notice, header, contact, footer."""
    render = TYPES.get(t["layout"])
    if not render:
        return html
    main, nav = render(t)
    start = html.index('<main id="main">') + len('<main id="main">')
    end = html.index('<section id="contact"')
    html = html[:start] + f'<div class="v2 v2-{t["layout"].split("-")[0]}">' + main + "</div>" + html[end:]
    n0, n1 = html.index('<nav id="demo-nav"'), html.index("</nav>", html.index('<nav id="demo-nav"')) + len("</nav>")
    links = "".join(f'<a href="{h}">{label}</a>' for h, label in nav)
    html = html[:n0] + f'<nav id="demo-nav" aria-label="Site sections">{links}</nav>' + html[n1:]
    return html.replace("</head>", V2_CSS + "</head>", 1)
