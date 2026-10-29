#!/usr/bin/env python3
"""Add EY Strategy and Transactions openings in Kochi / Trivandrum, pinned at the top.

Source: careers.ey.com search (Strategy and Transactions · India · Kochi), 29 Oct 2026.
Only details printed on each EY posting are used.
"""

from __future__ import annotations

import importlib.util
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

NOTE = mod.NOTE
POSTED = "2026-10-29"
BASE = "https://careers.ey.com/ey/job/"
SEARCH = (
    "https://careers.ey.com/ey/search/?createNewAlert=false&q=&optionsFacetsDD_customfield1="
    "Strategy+and+Transactions&optionsFacetsDD_country=IN&optionsFacetsDD_city=Kochi"
)
KOCHI = "Kochi, Kerala"
TVM = "Trivandrum, Kerala"

SPECS = [
    {
        "req": "1451729533",
        "path": "Kochi-EYP-Strategy-Senior-Manager-KL-682313",
        "title": "EYP - Strategy - Senior Manager (Associate Director, AI Strategy)",
        "location": KOCHI,
        "experience": "experienced",
        "experienceRange": "15+ years",
        "portalPosted": "27 Oct 2026",
        "tags": ["AI Strategy", "Consulting", "Leadership"],
        "summary": "Associate Director – AI Strategy at EY-Parthenon, EY GDS: lead AI-led business transformation engagements, enterprise AI and GenAI roadmaps, AI governance and value creation work.",
        "qualification": "Bachelor's in Engineering, Computer Science, Mathematics, Economics, Data Science, Statistics, Business or related; MBA or relevant Master's preferred",
        "skills": ["AI strategy", "Generative AI", "Agentic AI", "AI governance", "Digital transformation", "Strategy consulting"],
        "requirements": [
            "15+ years of consulting, strategy, technology, analytics or digital transformation experience",
            "5+ years leading enterprise-scale AI, analytics or transformation programmes",
            "Demonstrated experience working with C-suite stakeholders",
            "Strong understanding of strategic planning and business transformation",
            "Experience leading global delivery and distributed teams",
            "Bachelor's degree in Engineering, Computer Science, Mathematics, Economics, Data Science, Statistics, Business or a related discipline",
            "Preferred: strategy consulting firm experience (EY-Parthenon, MBB, Big Four, Accenture Strategy, Kearney, Strategy& or equivalent)",
            "Preferred: Private Equity, Corporate Strategy or Value Creation engagements",
            "Preferred: GenAI, Agentic AI, LLMs, AI governance, data strategy, intelligent automation, cloud AI platforms",
            "Preferred: MBA; Master's in AI, Data Science, Analytics or Technology Management; AI, Cloud, Analytics or Agile certifications",
        ],
        "responsibilities": [
            "Lead AI strategy engagements for Fortune 500 and private equity-backed organisations",
            "Advise C-suite executives on AI-enabled growth, operating model transformation and productivity",
            "Develop enterprise AI and Generative AI roadmaps and conduct AI maturity assessments",
            "Identify, prioritise and evaluate AI, GenAI and Agentic AI use cases and business cases",
            "Design Responsible AI frameworks and AI governance models, controls and policies",
            "Support commercial and technology due diligence from an AI perspective",
            "Lead proposals, client presentations and thought leadership",
            "Lead and mentor multidisciplinary teams of consultants, data scientists and AI specialists",
        ],
    },
    {
        "req": "1379281033",
        "path": "Kochi-Senior-Real-Estate-Hospitality-And-Tourism-RHT-Valuation-KL-682313",
        "title": "Senior - Real Estate Hospitality & Tourism (RHT) Valuation",
        "location": KOCHI,
        "experience": "experienced",
        "experienceRange": "3–5 years",
        "portalPosted": "24 Oct 2026",
        "tags": ["Valuation", "Real Estate", "Finance"],
        "summary": "Senior in EY-Parthenon's Valuation, Modeling & Economics team (Transactions Corporate Finance), leading Real Estate Hospitality & Tourism valuation engagements, mainly for financial reporting, with MENA stakeholders.",
        "qualification": "Post graduate degree in Finance or Economics, or CA / ACCA / CFA, or MBA – Finance from a top-tier B-School",
        "skills": ["Real estate valuation", "DCF", "Financial modelling", "MS Excel", "PowerPoint"],
        "requirements": [
            "Post graduate degree in Finance or Economics, or CA / ACCA / CFA Charter holder; MBA – Finance from a reputed top-tier B-School also considered",
            "Minimum 3 to 5 years direct experience with valuation techniques such as DCF, Income Approach and market comparables",
            "Experience in a valuation firm, venture capital, investment banking, commercial banking, financial research, or corporate finance (preferably M&A)",
            "Financial modelling experience, including building models from scratch in MS Excel, preferred",
            "Background in real estate valuation, acquisition due diligence, asset management, finance, or market research",
            "Strong Excel and PowerPoint skills; real estate databases experience preferred",
            "RICS or similar professional membership is a significant advantage",
            "Ideally: project management and strong presentation skills",
        ],
        "responsibilities": [
            "Lead RHT valuation engagements, primarily for financial reporting purposes",
            "Develop and maintain financial and valuation models and guide junior staff",
            "Participate in real estate advisory engagements: cash flow and property/portfolio modelling, market due diligence, appraisals",
            "Conduct fair value assessments across residential, office, retail, hotel, warehouse, industrial, mixed-use and infrastructure properties",
            "Conduct market research and prepare comprehensive reports",
            "Manage relationships with MENA stakeholders and present findings to senior management and clients",
        ],
    },
    {
        "req": "1428165833",
        "path": "Kochi-Business-Valuation-Senior-Contract-KL-682313",
        "title": "Business Valuation - Senior (Contract)",
        "location": KOCHI,
        "experience": "experienced",
        "experienceRange": "4–8 years",
        "employmentType": "Contract",
        "portalPosted": "17 Oct 2026",
        "tags": ["Valuation", "Finance", "Contract"],
        "summary": "Senior in EY Strategy and Transactions – Valuation, Modelling & Economics (Business Valuations), leading enterprise and asset valuations for MENA EY clients. Contract role.",
        "qualification": "CA / ACCA / CFA or MBA – Finance (preferably from a premier institute)",
        "skills": ["Business valuation", "Valuation modelling", "MS Excel / VBA", "Spotfire / Tableau / Alteryx"],
        "requirements": [
            "CA / ACCA / CFA or MBA – Finance (preferably from a premier institute) with a good academic background",
            "4 to 8 years of related work experience",
            "Big-4 experience in a similar role, or with a leading VC, investment bank, commercial bank, or national accounting firm, is a must",
            "Working knowledge of MS Excel with VBA; exposure to Spotfire, Tableau, Alteryx preferred",
            "Excellent interpersonal, leadership, and communication skills",
            "Available to travel outside the assigned office at least 50% of the time",
        ],
        "responsibilities": [
            "Lead a team of VME professionals performing enterprise and asset valuations for MENA EY clients",
            "Manage client relationships with user offices across the MENA region and support business development",
            "Act as single point of contact with the onshore team for project execution and delivery",
            "Mentor up to 3 team members",
            "Perform valuations and develop and review valuation models for financial reporting, feasibility studies and corporate transactions",
        ],
    },
    {
        "req": "1424595233",
        "path": "Trivandrum-EYP-DME-Senior-KL-695581",
        "title": "EYP - DME - Senior (Assistant / Associate Manager, Decision Modelling & Economics)",
        "location": TVM,
        "experience": "experienced",
        "experienceRange": "5–8 years",
        "portalPosted": "7 Oct 2026",
        "tags": ["Financial Modelling", "Finance", "Trivandrum"],
        "summary": "Assistant / Associate Manager in Decision Modelling & Economics (DME, VME), leading a team of financial modellers and managing client relationships across the MENA region.",
        "qualification": "Bachelor's in Business, Finance, or Accounting (Masters preferred); CA / CFA / CPA preferred or MBA",
        "skills": ["Financial modelling", "MS Excel / VBA", "PowerPoint", "Team leadership"],
        "requirements": [
            "Bachelor's degree in Business, Finance, or Accounting; Masters preferred",
            "CA / CFA / CPA preferred, or MBA (preferably from a premier institute)",
            "5-8 years of relevant work experience",
            "Experience with a VC, investment bank, commercial bank, or national accounting firm; financial modelling practice experience preferred",
            "Strong financial modelling skills and superior MS Excel with VBA",
            "Ability to manage engagements, team members, client interaction, and budgets",
            "Available to travel outside the assigned office at least 20-40% of the time",
        ],
        "responsibilities": [
            "Lead a team of financial modellers developing and reviewing financial models",
            "Manage client relationships across the MENA region and support business development",
            "Act as single point of contact with the onshore team in project execution and delivery",
            "Mentor a 3–5 member team",
            "Develop and review financial models for strategic planning, feasibility, capital allocation, transactions, M&A and investment appraisal",
        ],
    },
    {
        "req": "1422854833",
        "path": "Trivandrum-EYP-S-and-E-Oil-and-Gas-Manager-KL-695581",
        "title": "EYP - S and E - Oil and Gas - Manager",
        "location": TVM,
        "experience": "experienced",
        "experienceRange": "8–12 years (post MBA / Master's)",
        "portalPosted": "22 Oct 2026",
        "tags": ["Strategy Consulting", "Oil & Gas", "Trivandrum"],
        "summary": "Manager for EY-Parthenon strategy work in energy / oil & gas logistics: strategy design, target operating models, go-to-market and feasibility studies, working with EY MENA stakeholders.",
        "qualification": "Master's degree or MBA in Energy / Oil & Gas, Supply Chain, Logistics, Business Administration or related (MBA preferred); MBA in Petroleum & Energy studies",
        "skills": ["Strategy development", "Market research", "Go-to-market strategy", "Financial analysis", "PowerPoint", "Excel"],
        "requirements": [
            "8–12 years of relevant post-MBA / Master's experience",
            "Master's degree or MBA in Energy or Oil & Gas, Supply Chain, Logistics, Business Administration or related field (MBA preferred)",
            "Understanding of the energy or oil & gas value chain and ecosystems",
            "Market research, strategy development, corporate and business strategy, go-to-market, competitive benchmarking",
            "Detailed financial and commercial analysis, negotiation and influencing skills",
            "Experience with C-level clients and leading/mentoring analysts or senior associates",
            "Willing to travel to the region during project delivery as needed",
        ],
        "responsibilities": [
            "Lead workstreams on strategy design, target operating models, go-to-market, investment strategies and feasibility studies",
            "Drive transformation projects on oil & gas logistics strategies and operating models",
            "Work with EY MENA stakeholders on new pursuits and end-to-end proposals for government clients",
            "Coordinate multiple projects: scoping, data collection, analysis and business reports",
            "Recommend strategic alternatives through primary and secondary market research",
        ],
    },
]


def shift_pins(text: str, by: int) -> str:
    pins = [int(n) for n in re.findall(r"pinOrder: (\d+)", text)]
    dupes = [n for n, count in Counter(pins).items() if count != 1]
    if dupes:
        raise SystemExit(f"Duplicate pinOrder values: {dupes}")
    return re.sub(r"pinOrder: (\d+)", lambda m: f"pinOrder: {int(m.group(1)) + by}", text)


def build(s: dict) -> dict:
    link = f"{BASE}{s['path']}/{s['req']}/"
    city = s["location"].split(",")[0]
    kind = s.get("employmentType", "Full-time")
    return {
        "id": f"ey-{re.sub(r'[^a-z0-9]+', '-', s['title'].lower()).strip('-')[:60].rstrip('-')}-{s['req']}",
        "company": "EY",
        "logo": "",
        "companyBlurb": f"EY · {s['title']} · {s['location']} · {s['experienceRange']}",
        "location": s["location"],
        "roles": [s["title"]],
        "experience": s["experience"],
        "experienceRange": s["experienceRange"],
        "employmentType": kind,
        "applyLink": link,
        "applyDeadline": "",
        "postedDate": POSTED,
        "source": "Company careers page",
        "verified": True,
        "verificationNote": NOTE,
        "tags": ["EY", "Strategy and Transactions"] + s["tags"],
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": "https://careers.ey.com/",
        "address": s["location"],
        "industry": "Consulting / Professional Services",
        "companyDetails": "EY Global Delivery Services (GDS) opening in Strategy and Transactions, listed on the official EY careers site.",
        "workDetails": f"{s['summary']} EY job ID {s['req']}.",
        "workStatus": kind,
        "workMode": f"On-site · {city}",
        "experienceYears": s["experienceRange"],
        "skills": s["skills"],
        "requirements": s["requirements"],
        "responsibilities": s["responsibilities"],
        "benefits": [],
        "howToApply": f"Apply on EY careers: {link}",
        "hiringNotes": f"Checked on careers.ey.com on 29 Oct 2026 · EY job ID {s['req']} · Portal posted {s['portalPosted']}. No closing date published.",
        "description": s["summary"],
        "startingDate": "",
        "qualification": s["qualification"],
        "officialLinks": {"eyJob": link, "eySearch": SEARCH},
    }


def main() -> None:
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    fresh = [build(s) for s in SPECS if f"/{s['req']}/" not in text]
    if not fresh:
        print("No new EY jobs")
        return
    for i, job in enumerate(fresh, start=1):
        job["pinOrder"] = i
    text = shift_pins(text, len(fresh))
    block = ",\n".join(mod.render_job(item) for item in fresh) + ",\n"
    path.write_text(text.replace("var JOBS = [\n", "var JOBS = [\n" + block, 1), encoding="utf-8")
    print(f"Added {len(fresh)} EY jobs (pinned)")


if __name__ == "__main__":
    main()
