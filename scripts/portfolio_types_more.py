"""Twelve more website templates for the types that had none: restaurant, event, startup,
real estate, corporate and landing page (two designs each).

Same contract as portfolio_types.py: each renderer returns (main_html, nav) and the shared demo
shell keeps the fictional-demo notice, header, contact form and footer. Every business, person,
price, menu, listing and figure is fictional and labelled as sample content on the page.
Imagery is original SVG/CSS art.
"""

from __future__ import annotations

from portfolio_types import e, prof, section_head, product_svg

ICONS = {
    "fish": '<path d="M3 12c3-5 9-6 14-3l4-3v12l-4-3c-5 3-11 2-14-3Z"/><circle cx="8" cy="11" r="1"/>',
    "leaf": '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19 13 11"/>',
    "clock": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    "pin": '<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
    "chat": '<path d="M4 19.5 5.3 16A8 8 0 1 1 8 18.7L4 19.5Z"/>',
    "cup": '<path d="M5 8h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V8Z"/><path d="M16 10h2a2 2 0 0 1 0 4h-2"/>',
    "cake": '<path d="M4 20h16v-8H4zM4 15c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 4 0"/><path d="M12 12V8M12 5v.01"/>',
    "mic": '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    "users": '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5M16 5a3 3 0 0 1 0 6M18 14.5c1.9.7 3.2 2.6 3.5 5.5"/>',
    "ticket": '<path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4Z"/><path d="M14 6v12" stroke-dasharray="2 2"/>',
    "music": '<path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
    "flower": '<circle cx="12" cy="12" r="2.5"/><path d="M12 9.5c0-4 4-5 4-2.5S12 9.5 12 9.5ZM14.5 12c4 0 5 4 2.5 4S14.5 12 14.5 12ZM12 14.5c0 4-4 5-4 2.5s4-2.5 4-2.5ZM9.5 12c-4 0-5-4-2.5-4s2.5 4 2.5 4Z"/>',
    "bolt": '<path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z"/>',
    "shield": '<path d="M12 3 4 6v6c0 4.6 3.4 8.4 8 9.5 4.6-1.1 8-4.9 8-9.5V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
    "phone": '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 17.5h2"/>',
    "chart": '<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
    "truck": '<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
    "box": '<path d="M3 7 12 3l9 4-9 4-9-4Z"/><path d="M3 7v10l9 4 9-4V7M12 11v10"/>',
    "globe": '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"/>',
    "code": '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
    "cloud": '<path d="M7 18.5a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 8.5a5 5 0 0 1-.5 10H7Z"/>',
    "home": '<path d="m3 11 9-7 9 7"/><path d="M5.5 9.5V20h13V9.5M10 20v-5h4v5"/>',
    "key": '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M15 8l2 2"/>',
    "tree": '<path d="M12 3 6 11h3l-3 5h12l-3-5h3l-6-8ZM12 16v5"/>',
    "pool": '<path d="M3 17c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0M3 21c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0M7 14V5a2 2 0 0 1 4 0M13 14V5a2 2 0 0 1 4 0M7 9h6"/>',
    "check": '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    "star": '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>',
    "pen": '<path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
    "layers": '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
    "calendar": '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17"/>',
}


def ico(k: str) -> str:
    return f'<span class="v2-ico"><svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[k]}</svg></span>'


def cards(items, cls="v2-biz-grid") -> str:
    return f'<div class="{cls}">' + "".join(f'<article class="v2-biz-card">{ico(k)}<h3>{a}</h3><p>{b}</p></article>' for k, a, b in items) + "</div>"


def packs(items, pop=1, cta="Enquire ↗") -> str:
    out = []
    for i, (name, price, small, lines) in enumerate(items):
        out.append(
            f'<article class="v2-pack{" is-pop" if i == pop else ""}"><h3>{name}</h3><p class="v2-pack-price">{price}<small>{small}</small></p>'
            f'<ul>{"".join(f"<li>{x}</li>" for x in lines)}</ul><a class="demo-button" href="#contact">{cta}</a></article>'
        )
    return '<div class="v2-packs">' + "".join(out) + "</div>"


def steps(items) -> str:
    return '<ol class="v2-steps">' + "".join(f"<li><b>0{i + 1}</b><h3>{a}</h3><p>{b}</p></li>" for i, (a, b) in enumerate(items)) + "</ol>"


def faq(items) -> str:
    return '<div class="v2-faq">' + "".join(f"<details><summary>{q}<span>＋</span></summary><p>{a}</p></details>" for q, a in items) + "</div>"


def stats(items, note="Sample figures for this demo.") -> str:
    return '<div class="v3-stats">' + "".join(f"<div><b>{a}</b><span>{b}</span></div>" for a, b in items) + f'<p class="v3-note">{note}</p></div>'


def quote(text, who) -> str:
    return f'<figure class="v3-quote"><blockquote>“{text}”</blockquote><figcaption>{who} <em>· sample review</em></figcaption></figure>'


def hero(t, lede, actions, art, cls="") -> str:
    return f"""<section id="intro" class="v3-hero {cls}"><div class="v3-hero-copy">{prof(t)}<h1>{e(t["headline"])}</h1>
<p class="v2-lede">{lede}</p><div class="intro-actions">{actions}</div></div><div class="v3-hero-art" aria-hidden="true">{art}</div></section>"""


# ================================================================ RESTAURANTS
MENUS = {
    "malabar-table": [
        ("Starters", [("Kallummakaya fry", "Mussels in a crisp masala coat", 320), ("Chemmeen ularthiyathu", "Prawns roasted with coconut slivers", 420), ("Kozhi 65", "Our take on the classic", 280)]),
        ("From the coast", [("Karimeen pollichathu", "Pearl spot in banana leaf", 560), ("Fish moilee", "Seer fish in mild coconut curry", 480), ("Njandu roast", "Mud crab, pepper and curry leaf", 690)]),
        ("Rice & bread", [("Malabar biryani", "Kaima rice, chicken, fried onions", 340), ("Appam (2)", "Lace-edged rice hoppers", 90), ("Kerala porotta (2)", "Flaky, layered, hot", 80)]),
    ],
    "filter-house": [
        ("Coffee", [("Filter coffee", "Chicory blend, frothy, served in a dabarah", 60), ("Cold filter", "Slow-steeped, over ice", 120), ("Cardamom latte", "Espresso, milk, a little elaichi", 160)]),
        ("Bakes", [("Banana walnut loaf", "Made each morning", 110), ("Coconut buns", "Soft, sweet, old-school", 50), ("Plum cake slice", "Our year-round favourite", 90)]),
        ("All-day plates", [("Egg roast & appam", "Mild, peppery, comforting", 190), ("Paneer kathi roll", "Wrapped in fresh porotta", 170), ("Tapioca & chilli chutney", "Kappa with a kick", 140)]),
    ],
}


def menu_html(slug, note="Sample menu and prices.") -> str:
    cols = "".join(
        f'<div class="v3-menu-col"><h3>{cat}</h3><ul>{"".join(f"<li><div><b>{n}</b><span>{d}</span></div><i></i><em>₹{p}</em></li>" for n, d, p in dishes)}</ul></div>'
        for cat, dishes in MENUS[slug]
    )
    return f'<div class="v3-menu">{cols}</div><p class="v3-note">{note}</p>'


def visit_html(rows, address) -> str:
    hours = "".join(f"<li><span>{d}</span><b>{h}</b></li>" for d, h in rows)
    return f"""<div class="v3-visit"><div class="v3-map" aria-hidden="true"><i></i><i></i><i></i><b></b></div>
<div><ul class="v3-hours">{hours}</ul><p class="v3-addr">{ico("pin")}<span>{address}<br><small>Sample address</small></span></p>
<div class="intro-actions"><a class="demo-button" href="#contact">Get directions ↗</a><a href="#contact">Call us</a></div></div></div>"""


def render_food(t) -> tuple[str, str]:
    slug = t["slug"]
    if slug == "malabar-table":
        art = f'<div class="v3-plate-stage"><div class="v3-plate v3-plate-a">{product_svg("plate", "#c46a3b", "#f2e2c9")}</div><div class="v3-plate v3-plate-b">{product_svg("bowl", "#8a3b2b", "#f0d9b5")}</div><span class="v3-chip">Open today · 12–11 pm</span></div>'
        intro = hero(t, f'Malabar Table is a fictional coastal kitchen run by <span data-person>{e(t["person"])}</span>: fresh catch, slow masalas and recipes from home.',
                     '<a class="demo-button" href="#reserve">Reserve a table ↗</a><a href="#menu">See the menu ↓</a>', art, "v3-hero--dark")
        sig = cards([("fish", "Today’s catch", "Whatever the boats bring in, cooked your way."), ("leaf", "Banana-leaf meals", "Lunch on a leaf, every weekday."), ("users", "Private dining", "A quiet room for twelve, by booking.")], "v2-biz-grid v3-grid-3")
        body = f"""<section id="menu" class="v2-sec">{section_head("THE MENU", "Coastal favourites.", "Prices include taxes in this sample.")}{menu_html(slug)}</section>
<section class="v2-sec">{section_head("WHY GUESTS RETURN", "More than a meal.")}{sig}</section>
<section id="reserve" class="v2-sec v3-band">{section_head("RESERVATIONS", "Book a table in a minute.")}{steps([("Pick a time", "Lunch or dinner, any day."), ("Message us", "Tap WhatsApp with your party size."), ("We confirm", "You get a reply within minutes."), ("Enjoy", "We’ll have your table ready.")])}</section>
<section id="visit" class="v2-sec">{section_head("VISIT US", "Find the table.")}{visit_html([("Mon – Fri", "12:00 – 3:30 pm · 7:00 – 11:00 pm"), ("Sat – Sun", "12:00 pm – 11:00 pm"), ("Kitchen closes", "30 minutes before closing")], "Marine Drive, Kochi")}</section>"""
        nav = [("#menu", "Menu"), ("#reserve", "Reserve"), ("#visit", "Visit"), ("#contact", "Call ↗")]
        return intro + body, nav
    art = f'<div class="v3-cafe-stage"><div class="v3-cafe-cup">{product_svg("cup", "#5a3b2e", "#f3e3cc")}</div><div class="v3-cafe-cake">{product_svg("teapot", "#c98a4b", "#fbeedd")}</div><span class="v3-chip v3-chip--light">Fresh bakes at 8 am</span></div>'
    intro = hero(t, f'Filter House is a fictional neighbourhood café by <span data-person>{e(t["person"])}</span>: strong coffee, warm bakes and a table for every mood.',
                 '<a class="demo-button" href="#menu">See today’s menu ↓</a><a href="#visit">Opening hours</a>', art)
    perks = cards([("cup", "Coffee your way", "Filter, cold or latte, with oat milk on request."), ("cake", "Bakes every morning", "Small batches, sold out by evening."), ("chat", "Order ahead", "Message us and skip the queue.")], "v2-biz-grid v3-grid-3")
    body = f"""<section id="menu" class="v2-sec">{section_head("MENU", "Something for every hour.")}{menu_html(slug)}</section>
<section class="v2-sec">{section_head("WHY COME BY", "Small café, big welcome.")}{perks}</section>
<section class="v2-sec">{quote("The filter coffee tastes exactly like my grandmother’s.", "Asha, Kakkanad")}</section>
<section id="visit" class="v2-sec">{section_head("VISIT", "Find us.")}{visit_html([("Every day", "7:30 am – 9:30 pm"), ("Breakfast", "Until 11:00 am"), ("Bakes", "Fresh from 8:00 am")], "Infopark Road, Kakkanad")}</section>"""
    nav = [("#menu", "Menu"), ("#visit", "Visit"), ("#contact", "Order ahead ↗")]
    return intro + body, nav


# ================================================================ EVENTS
def schedule_html(rows, note="Sample schedule.") -> str:
    items = "".join(f'<li><time>{a}</time><div><b>{b}</b><span>{c}</span></div><em>{d}</em></li>' for a, b, c, d in rows)
    return f'<ol class="v3-sched">{items}</ol><p class="v3-note">{note}</p>'


def people_html(rows) -> str:
    def initials(n):
        return "".join(w[0] for w in n.split()[:2])
    return '<div class="v3-people">' + "".join(f'<article><span class="v3-avatar">{initials(n)}</span><b>{n}</b><span>{r}</span></article>' for n, r in rows) + '</div><p class="v3-note">Fictional speakers.</p>'


def render_event(t) -> tuple[str, str]:
    if t["slug"] == "kochi-dev-summit":
        art = '<div class="v3-date-card"><span>SAT</span><b>14</b><span>MARCH</span><i>Sample date</i></div><div class="v3-ticket-art"><b>DEV SUMMIT</b><span>General admission</span><em>KOCHI</em></div>'
        intro = hero(t, f'Kochi Dev Summit is a fictional one-day conference organised by <span data-person>{e(t["person"])}</span> for developers, designers and founders across Kerala.',
                     '<a class="demo-button" href="#tickets">Get tickets ↗</a><a href="#schedule">See the schedule ↓</a>', art, "v3-hero--dark")
        body = f"""<section class="v2-sec">{stats([("40", "Talks"), ("1,200", "Attendees"), ("3", "Stages"), ("1", "Amazing day")])}</section>
<section id="schedule" class="v2-sec">{section_head("SCHEDULE", "From coffee to closing keynote.")}{schedule_html([("9:00", "Registration & breakfast", "Main foyer", "All"), ("10:00", "Opening keynote: building for India", "Stage A", "Keynote"), ("11:30", "Shipping faster with small teams", "Stage B", "Talk"), ("13:00", "Lunch & community tables", "Courtyard", "Break"), ("14:30", "Design systems that last", "Stage A", "Talk"), ("16:00", "Founder panel: from Infopark to the world", "Stage A", "Panel")])}</section>
<section id="speakers" class="v2-sec">{section_head("SPEAKERS", "People worth hearing.")}{people_html([("Ananya Iyer", "Platform engineer"), ("Rohan Joseph", "Product designer"), ("Meenakshi Nair", "Founder, fintech"), ("Faisal Ahmed", "Engineering manager"), ("Divya Krishnan", "ML researcher"), ("Sanjay Menon", "Open-source maintainer")])}</section>
<section id="tickets" class="v2-sec">{section_head("TICKETS", "Pick your pass.", "Sample prices.")}{packs([("Student", "₹499", "", ["All talks", "Lunch", "Student ID needed"]), ("General", "₹1,499", "", ["All talks", "Lunch and snacks", "Community dinner"]), ("Supporter", "₹4,999", "", ["Everything in General", "Front-row seating", "Speaker meet-up"])], cta="Register ↗")}</section>
<section id="venue" class="v2-sec">{section_head("VENUE", "Easy to reach.")}{cards([("pin", "Convention centre", "Sample venue near the Kakkanad junction."), ("truck", "Getting there", "Metro feeder buses run every 15 minutes."), ("calendar", "Doors open", "9:00 am. Bring your QR ticket.")], "v2-biz-grid v3-grid-3")}</section>
<section class="v2-sec">{section_head("QUESTIONS", "Before you come.")}{faq([("Will talks be recorded?", "In this sample, yes: recordings go up a week later."), ("Is there a refund?", "State your real refund policy here."), ("Can I volunteer?", "Tell people how to sign up as a volunteer.")])}</section>"""
        nav = [("#schedule", "Schedule"), ("#speakers", "Speakers"), ("#venue", "Venue"), ("#tickets", "Tickets ↗")]
        return intro + body, nav
    art = '<div class="v3-pookalam" aria-hidden="true"><i></i><i></i><i></i><i></i><b></b></div><span class="v3-chip v3-chip--light">Three days · free entry*</span>'
    intro = hero(t, f'Onam Utsav is a fictional community festival organised by <span data-person>{e(t["person"])}</span>: pookalam, music, games and a sadya for the whole neighbourhood.',
                 '<a class="demo-button" href="#register">Register a team ↗</a><a href="#days">See the programme ↓</a>', art)
    days = "".join(f'<article class="v3-day"><span>{d}</span><h3>{h}</h3><ul>{"".join(f"<li>{x}</li>" for x in xs)}</ul></article>' for d, h, xs in [("Day 1", "Pookalam & opening", ["Pookalam contest from 7 am", "Lamp lighting at 10 am", "Thiruvathira at 6 pm"]), ("Day 2", "Games & music", ["Tug of war and uriyadi", "Kids’ fancy dress", "Live chenda melam"]), ("Day 3", "Onam sadya", ["Sadya for 800 guests", "Cultural evening", "Prize distribution"])])
    body = f"""<section id="days" class="v2-sec">{section_head("PROGRAMME", "Three days of celebration.", "Sample programme.")}<div class="v3-days">{days}</div></section>
<section class="v2-sec">{section_head("HIGHLIGHTS", "Something for everyone.")}{cards([("flower", "Pookalam contest", "Teams of four, three hours, one flower carpet."), ("music", "Chenda melam", "A live percussion evening."), ("users", "Kids’ corner", "Games and fancy dress all day."), ("leaf", "Onam sadya", "Twenty-six dishes on a banana leaf.")])}</section>
<section id="register" class="v2-sec v3-band">{section_head("REGISTER", "Bring your team.")}{steps([("Pick an event", "Pookalam, games or cultural evening."), ("Message us", "Send team name and members."), ("Get confirmed", "We share your slot and rules."), ("Celebrate", "See you at the grounds!")])}</section>
<section class="v2-sec">{section_head("QUESTIONS", "Good to know.")}{faq([("Is entry free?", "In this sample, yes. Sadya passes are limited."), ("Where is it?", "Replace with your real venue and map link."), ("Can businesses sponsor?", "Explain your sponsorship options here.")])}</section>"""
    nav = [("#days", "Programme"), ("#register", "Register"), ("#contact", "Contact ↗")]
    return intro + body, nav


# ================================================================ STARTUPS
def laptop_mock(rows) -> str:
    bars = "".join(f'<li><span>{a}</span><b style="width:{w}%"></b><em>{c}</em></li>' for a, w, c in rows)
    return f'<div class="v3-laptop"><div class="v3-laptop-top"><i></i><i></i><i></i></div><div class="v3-laptop-body"><div class="v3-laptop-side"><i></i><i></i><i></i><i></i></div><div class="v3-laptop-main"><p>Today’s sales <small>sample</small></p><strong>₹18,420</strong><ul>{bars}</ul></div></div></div>'


def phone_mock(lines) -> str:
    items = "".join(f'<li><i></i><div><b>{a}</b><span>{b}</span></div><em>{c}</em></li>' for a, b, c in lines)
    return f'<div class="v3-phone"><div class="v3-phone-notch"></div><p>Today’s catch <small>sample</small></p><ul>{items}</ul><span class="v3-phone-btn">Order for noon</span></div>'


def render_startup(t) -> tuple[str, str]:
    if t["slug"] == "ledgerly":
        intro = hero(t, f'Ledgerly is a fictional billing app by <span data-person>{e(t["person"])}</span> for small shops: GST bills on your phone, stock that updates itself, and reports your accountant will love.',
                     '<a class="demo-button" href="#pricing">Start free trial ↗</a><a href="#how">How it works ↓</a>',
                     laptop_mock([("Groceries", 82, "₹7,240"), ("Snacks", 54, "₹4,780"), ("Household", 38, "₹3,410"), ("Dairy", 26, "₹2,990")]))
        body = f"""<section id="features" class="v2-sec">{section_head("FEATURES", "Everything a counter needs.")}{cards([("bolt", "Bills in seconds", "Scan, tap, print or WhatsApp the bill."), ("box", "Live stock", "Every sale updates your stock."), ("chart", "Daily reports", "Sales, profit and GST, ready each night."), ("shield", "Safe backups", "Your data, backed up every hour.")])}</section>
<section id="how" class="v2-sec">{section_head("HOW IT WORKS", "Up and running before lunch.")}{steps([("Sign up", "Your phone number is all you need."), ("Add products", "Import a list or scan barcodes."), ("Start billing", "Print or share bills on WhatsApp."), ("Grow", "Spot your bestsellers in reports.")])}</section>
<section class="v2-sec">{quote("I close the shop twenty minutes earlier every night now.", "Shopkeeper, Aluva")}</section>
<section id="pricing" class="v2-sec">{section_head("PRICING", "Simple plans.", "Sample prices.")}{packs([("Starter", "Free", "", ["1 counter", "100 bills a month", "Basic reports"]), ("Shop", "₹299", " /month", ["Unlimited bills", "Stock tracking", "GST reports"]), ("Chain", "₹999", " /month", ["Up to 5 counters", "Staff logins", "Priority support"])], cta="Choose plan ↗")}</section>
<section class="v2-sec">{section_head("QUESTIONS", "Before you switch.")}{faq([("Does it work offline?", "In this sample, yes: bills sync when you’re back online."), ("Can I import my old data?", "Describe your real import options here."), ("Is there a contract?", "No contract in this sample; cancel any time.")])}</section>"""
        nav = [("#features", "Features"), ("#how", "How it works"), ("#pricing", "Pricing"), ("#contact", "Get a demo ↗")]
        return intro + body, nav
    intro = hero(t, f'Kadal Connect is a fictional app by <span data-person>{e(t["person"])}</span> that brings the morning’s catch from fishing harbours straight to your kitchen, cleaned and cut how you like.',
                 '<a class="demo-button" href="#download">Get the app ↗</a><a href="#how">How it works ↓</a>',
                 phone_mock([("Seer fish", "Cleaned, steaks", "₹890/kg"), ("Pearl spot", "Whole, cleaned", "₹620/kg"), ("Tiger prawns", "Deveined", "₹780/kg")]), "v3-hero--dark")
    body = f"""<section class="v2-sec">{stats([("6 am", "Boats land"), ("9 am", "Cleaned & packed"), ("12 pm", "At your door"), ("0", "Middlemen")])}</section>
<section id="how" class="v2-sec">{section_head("HOW IT WORKS", "Harbour to home by noon.")}{steps([("Choose your fish", "See what landed this morning."), ("Pick the cut", "Whole, steaks, curry-cut or fillet."), ("Pay on delivery", "UPI or cash at your door."), ("Cook tonight", "Fresh, never frozen.")])}</section>
<section class="v2-sec">{section_head("WHY KADAL", "Fresh, fair and fast.")}{cards([("fish", "Truly fresh", "Bought at the harbour every morning."), ("users", "Fair to fishers", "Better prices for the families who fish."), ("truck", "Fast delivery", "Insulated boxes, delivered by noon.")], "v2-biz-grid v3-grid-3")}</section>
<section id="download" class="v2-sec v3-band v3-download">{section_head("GET THE APP", "Order your first catch.")}<div class="intro-actions"><a class="demo-button" href="#contact">Download for Android ↗</a><a class="demo-button v3-btn-ghost" href="#contact">Download for iPhone ↗</a></div><p class="v3-note">Sample app links.</p></section>"""
    nav = [("#how", "How it works"), ("#download", "Get the app ↗")]
    return intro + body, nav


# ================================================================ REAL ESTATE
def house_art(i) -> str:
    return f'<div class="v3-house v3-house-{i % 4}" aria-hidden="true"><i></i><b></b><em></em><span></span></div>'


LISTINGS = [
    ("3 BHK apartment", "Kakkanad", "₹78 lakh", "3 beds · 1,450 sq ft", "For sale"),
    ("Villa with garden", "Thrikkakara", "₹1.6 crore", "4 beds · 2,800 sq ft", "For sale"),
    ("2 BHK near metro", "Edappally", "₹26,000/month", "2 beds · 1,050 sq ft", "For rent"),
    ("Riverside plot", "Aluva", "₹9 lakh/cent", "12 cents", "Plot"),
    ("Studio apartment", "Infopark Phase 2", "₹15,000/month", "1 bed · 520 sq ft", "For rent"),
    ("Heritage home", "Fort Kochi", "₹2.4 crore", "5 beds · 3,600 sq ft", "For sale"),
]


def render_estate(t) -> tuple[str, str]:
    if t["slug"] == "backwater-homes":
        cur = ' aria-current="true"'
        chips = "".join(f'<a href="#listings"{cur if i == 0 else ""}>{c}</a>' for i, c in enumerate(["All", "For sale", "For rent", "Plots"]))
        cards_html = "".join(f'<article class="v3-listing">{house_art(i)}<span class="v3-listing-tag">{tag}</span><div><p class="v3-price">{price}</p><h3>{title}</h3><p class="v3-meta">{ico("pin")}{loc} · {meta}</p></div></article>' for i, (title, loc, price, meta, tag) in enumerate(LISTINGS))
        intro = hero(t, f'Backwater Homes is a fictional Kochi agency led by <span data-person>{e(t["person"])}</span>: verified homes, honest advice and site visits on your schedule.',
                     '<a class="demo-button" href="#listings">Browse homes ↓</a><a href="#contact">Book a site visit</a>',
                     f'<div class="v3-house-hero">{house_art(1)}<div class="v3-search-card"><b>Find a home</b><span>Kakkanad · 3 BHK · under ₹90 lakh</span><em>12 matches</em></div></div>')
        body = f"""<section id="listings" class="v2-sec">{section_head("LISTINGS", "Homes we’d live in.", "Sample listings and prices.")}<div class="v2-chips v3-chips">{chips}</div><div class="v3-listings">{cards_html}</div></section>
<section class="v2-sec">{section_head("WHY BACKWATER", "Buying made calm.")}{cards([("shield", "Verified documents", "Title and approvals checked before we list."), ("key", "Site visits", "Weekday evenings and weekends."), ("chat", "Straight answers", "No pressure, ever."), ("home", "After you move", "Help with registration and utilities.")])}</section>
<section class="v2-sec">{stats([("320+", "Homes sold"), ("15", "Years in Kochi"), ("4.8", "Average rating")])}</section>"""
        nav = [("#listings", "Listings"), ("#contact", "Site visit ↗")]
        return intro + body, nav
    plans = [("2 BHK", "1,120 sq ft", "₹62 lakh onwards"), ("3 BHK", "1,480 sq ft", "₹84 lakh onwards"), ("3 BHK + study", "1,720 sq ft", "₹98 lakh onwards")]
    table = "".join(f"<tr><td>{a}</td><td>{b}</td><td>{c}</td></tr>" for a, b, c in plans)
    amen = "".join(f"<li>{ico(k)}<span>{n}</span></li>" for k, n in [("pool", "Swimming pool"), ("tree", "Landscaped garden"), ("users", "Clubhouse"), ("shield", "24×7 security"), ("bolt", "Power backup"), ("truck", "Covered parking")])
    near = "".join(f"<li><b>{a}</b><span>{b}</span></li>" for a, b in [("Infopark", "6 min"), ("Metro station", "9 min"), ("International school", "5 min"), ("Hospital", "8 min")])
    intro = hero(t, f'Palm Grove Residences is a fictional apartment project presented by <span data-person>{e(t["person"])}</span>: 120 homes around a two-acre garden, ten minutes from the city.',
                 '<a class="demo-button" href="#contact">Book a site visit ↗</a><a href="#plans">See floor plans ↓</a>',
                 f'<div class="v3-tower" aria-hidden="true"><i></i><i></i><i></i><b></b></div><span class="v3-chip">Possession Dec 2027*</span>')
    body = f"""<section class="v2-sec">{stats([("120", "Homes"), ("2 acres", "Garden"), ("14", "Floors"), ("75%", "Open space")])}</section>
<section id="plans" class="v2-sec">{section_head("FLOOR PLANS", "Find your size.", "Sample sizes and prices.")}<div class="v2-tablewrap"><table class="v2-table"><thead><tr><th>Type</th><th>Size</th><th>Price</th></tr></thead><tbody>{table}</tbody></table></div></section>
<section class="v2-sec">{section_head("AMENITIES", "Life inside the gates.")}<ul class="v3-amen">{amen}</ul></section>
<section class="v2-sec">{section_head("LOCATION", "Close to everything.")}<ul class="v3-near">{near}</ul><p class="v3-note">Sample travel times. RERA registration number: sample.</p></section>"""
    nav = [("#plans", "Floor plans"), ("#contact", "Site visit ↗")]
    return intro + body, nav


# ================================================================ CORPORATE
def render_corp(t) -> tuple[str, str]:
    if t["slug"] == "meridian-logistics":
        intro = hero(t, f'Meridian Logistics is a fictional transport company led by <span data-person>{e(t["person"])}</span>, moving goods across South India for manufacturers, exporters and retailers.',
                     '<a class="demo-button" href="#contact">Request a quote ↗</a><a href="#solutions">Our solutions ↓</a>',
                     '<div class="v3-route" aria-hidden="true"><i></i><i></i><i></i><b></b><span>Kochi</span><span>Coimbatore</span><span>Bengaluru</span></div>')
        body = f"""<section class="v2-sec">{stats([("240", "Trucks"), ("18", "Warehouses"), ("99.2%", "On-time delivery"), ("1998", "Founded")])}</section>
<section id="solutions" class="v2-sec">{section_head("SOLUTIONS", "End-to-end logistics.")}{cards([("truck", "Road freight", "Full and part loads across five states."), ("box", "Warehousing", "Bonded and general storage near ports."), ("globe", "Port logistics", "Container handling at Kochi port."), ("chart", "Supply-chain planning", "Routes and stock planned with you.")])}</section>
<section id="about" class="v2-sec">{section_head("LEADERSHIP", "The team behind the trucks.")}{people_html([("Thomas Kurian", "Managing director"), ("Reshma George", "Chief operating officer"), ("Vivek Shenoy", "Head of warehousing"), ("Nisha Abraham", "Head of people")])}</section>
<section id="careers" class="v2-sec v3-band">{section_head("CAREERS", "Grow with us.")}<div class="v2-tablewrap"><table class="v2-table"><thead><tr><th>Role</th><th>Location</th><th>Type</th></tr></thead><tbody><tr><td>Fleet supervisor</td><td>Kochi</td><td>Full-time</td></tr><tr><td>Warehouse executive</td><td>Coimbatore</td><td>Full-time</td></tr><tr><td>Operations intern</td><td>Kochi</td><td>Internship</td></tr></tbody></table></div><p class="v3-note">Sample openings.</p></section>"""
        nav = [("#solutions", "Solutions"), ("#about", "Leadership"), ("#careers", "Careers"), ("#contact", "Get a quote ↗")]
        return intro + body, nav
    intro = hero(t, f'Techvale Systems is a fictional IT services company led by <span data-person>{e(t["person"])}</span>, building and running software for banks, hospitals and manufacturers.',
                 '<a class="demo-button" href="#contact">Talk to us ↗</a><a href="#work">Case studies ↓</a>',
                 '<div class="v3-orbit" aria-hidden="true"><i></i><i></i><i></i><b>TV</b></div>', "v3-hero--dark")
    work = "".join(f'<article class="v3-case"><span>{a}</span><h3>{b}</h3><p>{c}</p><b>{d}</b></article>' for a, b, c, d in [("Banking", "Loan approvals in hours, not weeks", "A new workflow platform for a co-operative bank.", "−70% approval time*"), ("Healthcare", "One record for every patient", "A unified records system across six hospitals.", "6 hospitals*"), ("Manufacturing", "A factory that reports itself", "Machine data turned into a live dashboard.", "+18% uptime*")])
    body = f"""<section id="services" class="v2-sec">{section_head("SERVICES", "What we do.")}{cards([("code", "Product engineering", "Web and mobile apps, built to last."), ("cloud", "Cloud & DevOps", "Migrations, automation and 24×7 support."), ("chart", "Data & AI", "Dashboards and models that answer real questions."), ("shield", "Security", "Audits and compliance, done properly.")])}</section>
<section id="work" class="v2-sec">{section_head("CASE STUDIES", "Work we’re proud of.", "*Sample results.")}<div class="v3-cases">{work}</div></section>
<section class="v2-sec">{stats([("650", "Engineers"), ("14", "Countries served"), ("2009", "Founded in Kochi")])}</section>
<section id="careers" class="v2-sec v3-band">{section_head("CAREERS", "Build what matters.")}{cards([("users", "Freshers programme", "Six months of paid training."), ("star", "Experienced roles", "Engineering, design and delivery."), ("home", "Hybrid work", "Offices in Kochi and Thiruvananthapuram.")], "v2-biz-grid v3-grid-3")}</section>"""
    nav = [("#services", "Services"), ("#work", "Work"), ("#careers", "Careers"), ("#contact", "Contact ↗")]
    return intro + body, nav


# ================================================================ LANDING PAGES
def render_landing(t) -> tuple[str, str]:
    if t["slug"] == "focusflow":
        intro = hero(t, f'FocusFlow is a fictional planning app made by <span data-person>{e(t["person"])}</span>: one list for today, one button to start, and nothing else to manage.',
                     '<a class="demo-button" href="#join">Join the early list ↗</a><a href="#how">See how ↓</a>',
                     '<div class="v3-focus" aria-hidden="true"><p>Today</p><ul><li class="done"><i></i>Reply to client</li><li class="on"><i></i>Design homepage <em>25:00</em></li><li><i></i>Plan Monday</li></ul></div>', "v3-hero--center")
        body = f"""<section class="v2-sec v3-problem">{section_head("THE PROBLEM", "Too many apps. Too little done.")}<div class="v3-split"><p>Planning tools have become projects of their own. You spend the morning organising instead of working.</p><p><b>FocusFlow does one thing:</b> it shows today’s three most important tasks and starts a focus timer.</p></div></section>
<section id="how" class="v2-sec">{section_head("HOW IT WORKS", "Three steps, every morning.")}{steps([("Pick three", "Choose today’s three tasks."), ("Press start", "A 25-minute focus timer begins."), ("Close the day", "One tap moves the rest to tomorrow.")])}</section>
<section class="v2-sec">{quote("It’s the first planner I’ve used for more than a week.", "Early tester, Thrissur")}</section>
<section id="join" class="v2-sec v3-band v3-join">{section_head("EARLY ACCESS", "Be first to try it.")}<div class="v3-join-box"><p class="v2-pack-price">Free<small> during the beta</small></p><a class="demo-button" href="#contact">Join the early list ↗</a></div><p class="v3-note">Sample launch page.</p></section>
<section class="v2-sec">{section_head("QUESTIONS", "Quick answers.")}{faq([("When does it launch?", "Add your real launch date here."), ("Which phones?", "Android and iPhone in this sample."), ("Will it stay free?", "Explain your pricing plans here.")])}</section>"""
        nav = [("#how", "How it works"), ("#join", "Early access ↗")]
        return intro + body, nav
    learn = "".join(f"<li>{ico('check')}<span>{x}</span></li>" for x in ["Turn an idea into simple user flows", "Sketch screens on paper, then in Figma", "Build a clickable prototype", "Test it with real people", "Present your work with confidence"])
    days = "".join(f'<article class="v3-day"><span>{d}</span><h3>{h}</h3><ul>{"".join(f"<li>{x}</li>" for x in xs)}</ul></article>' for d, h, xs in [("Saturday", "Ideas to screens", ["10:00 Problem & users", "12:00 Sketching", "15:00 Wireframes in Figma"]), ("Sunday", "Screens to prototype", ["10:00 Visual design basics", "13:00 Prototyping", "16:00 Show-and-tell"])])
    intro = hero(t, f'A fictional two-day workshop taught by <span data-person>{e(t["person"])}</span> for beginners who want to design their first app, no experience needed.',
                 '<a class="demo-button" href="#register">Reserve your seat ↗</a><a href="#learn">What you’ll learn ↓</a>',
                 '<div class="v3-seat-card"><b>Weekend UI Workshop</b><span>2 days · 25 seats · Kochi</span><em>8 seats left*</em><i></i></div>')
    body = f"""<section id="learn" class="v2-sec">{section_head("WHAT YOU’LL LEARN", "From blank page to prototype.")}<ul class="v3-learn">{learn}</ul></section>
<section class="v2-sec">{section_head("SCHEDULE", "Two focused days.", "Sample schedule.")}<div class="v3-days v3-days--2">{days}</div></section>
<section class="v2-sec">{section_head("YOUR TRAINER", "Learn from a working designer.")}{people_html([(t["person"], "Product designer, 9 years")])}</section>
<section id="register" class="v2-sec">{section_head("REGISTER", "Reserve your seat.", "Sample price.")}{packs([("Early bird", "₹2,499", "", ["Both days", "Lunch and snacks", "Certificate"]), ("Regular", "₹3,499", "", ["Both days", "Lunch and snacks", "Certificate", "Recording access"]), ("Team of 3", "₹8,999", "", ["Three seats", "Everything in Regular", "Team review session"])], cta="Reserve ↗")}</section>
<section class="v2-sec">{section_head("QUESTIONS", "Before you sign up.")}{faq([("Do I need a laptop?", "Yes, any laptop that runs a browser."), ("Is Figma free?", "The free plan is enough for this workshop."), ("Can I get a refund?", "State your real refund policy here.")])}</section>"""
    nav = [("#learn", "Curriculum"), ("#register", "Register ↗")]
    return intro + body, nav


TYPES_MORE = {
    "food-fine": render_food,
    "food-cafe": render_food,
    "event-conf": render_event,
    "event-fest": render_event,
    "startup-saas": render_startup,
    "startup-app": render_startup,
    "estate-agency": render_estate,
    "estate-project": render_estate,
    "corp-ops": render_corp,
    "corp-tech": render_corp,
    "landing-product": render_landing,
    "landing-course": render_landing,
}
