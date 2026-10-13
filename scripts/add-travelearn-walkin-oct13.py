#!/usr/bin/env python3
"""Travelearn Holidays walk-in — Calicut, 21 Oct 2026 (4 roles)."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

NOTE = mod.NOTE
POSTED = mod.TODAY.isoformat()
WALK_DATE = "21 October 2026"
WALK_TIME = "10:00 AM – 3:00 PM"
VENUE = "Calicut (Kozhikode), Kerala"
EMAIL = "hrtravelearnholidays@gmail.com"
PHONE = "+91 79941 38555"
APPLY_MAIL = f"mailto:{EMAIL}?subject=Travelearn%20Holidays%20%E2%80%94%20Walk-in%20{WALK_DATE.replace(' ', '%20')}"


def walkin_base(**kwargs) -> dict:
    base = {
        "company": "Travelearn Holidays",
        "logo": "",
        "postedDate": POSTED,
        "source": "WhatsApp",
        "verified": True,
        "verificationNote": NOTE,
        "isWalkIn": True,
        "walkInDate": WALK_DATE,
        "walkinTime": WALK_TIME,
        "walkinLocation": VENUE,
        "applyDeadline": "2026-10-21",
        "employmentType": "Full-time",
        "applyLink": APPLY_MAIL,
        "email": EMAIL,
        "phone": PHONE,
        "website": "",
        "address": VENUE,
        "industry": "Travel & tourism",
        "workMode": f"On-site · {VENUE}",
        "workStatus": "Full-time",
        "startingDate": "",
        "benefits": [
            "Walk-in interview on the date below — carry resume and ID",
            "Never pay anyone for this application",
        ],
        "howToApply": (
            f"Walk in on {WALK_DATE}, {WALK_TIME}, at {VENUE}. "
            f"Email {EMAIL} or WhatsApp {PHONE}. Scan the employer QR on the poster to register if prompted."
        ),
        "hiringNotes": (
            f"Source: Travelearn Holidays walk-in creative · {POSTED}. "
            "Confirm venue address with the company before travelling."
        ),
    }
    base.update(kwargs)
    return base


JOBS = [
    walkin_base(
        id="travelearn-hr-operations-executive-walkin-oct26",
        companyBlurb=f"Travelearn Holidays · HR & Operations Executive · Walk-in {WALK_DATE} · Calicut",
        location=VENUE,
        roles=["HR & Operations Executive"],
        experience="both",
        experienceRange="6 months – 1.5 years",
        experienceYears="6 months – 1.5 years",
        tags=["HR", "Operations", "Calicut"],
        companyDetails="Travelearn Holidays — travel company hiring for HR & operations at a Calicut walk-in.",
        workDetails=(
            "HR & Operations Executive · 6 months–1.5 years experience. Recruitment, onboarding, employee records, "
            "HR documentation, daily operations, administration, and process coordination. MS Office (Excel, Word); "
            "strong operations management, team coordination, communication, and organization."
        ),
        requirements=[
            "6 months to 1.5 years relevant experience",
            "Recruitment, onboarding, employee records, and HR documentation",
            "Operations, administration, and process coordination",
            "MS Office (Excel, Word)",
            f"Walk in {WALK_DATE}, {WALK_TIME}",
        ],
        responsibilities=[
            "Handle recruitment, onboarding, and HR documentation",
            "Support daily operations and administration",
            "Coordinate processes and team activities",
        ],
        description=f"Travelearn Holidays — HR & Operations Executive walk-in in Calicut on {WALK_DATE}.",
    ),
    walkin_base(
        id="travelearn-ticketing-cum-accountant-walkin-oct26",
        companyBlurb=f"Travelearn Holidays · Ticketing cum Accountant · Walk-in {WALK_DATE} · Calicut",
        location=VENUE,
        roles=["Ticketing cum Accountant"],
        experience="experienced",
        experienceRange="1–2 years",
        experienceYears="1–2 years",
        tags=["Finance", "Travel", "Calicut"],
        companyDetails="Travelearn Holidays — air/travel ticketing and accounts role at Calicut walk-in.",
        workDetails=(
            "Ticketing cum Accountant · 1–2 years. Air and travel ticketing (reservations, reissues, cancellations); "
            "GDS (Amadeus, Galileo, or Sabre) an advantage. Billing, invoicing, reconciliation, daily accounts; "
            "Tally or accounting software and MS Excel."
        ),
        requirements=[
            "1–2 years experience",
            "Air and travel ticketing operations",
            "Billing, invoicing, reconciliation, and daily accounts",
            "Tally or accounting software and MS Excel",
            f"Walk in {WALK_DATE}, {WALK_TIME}",
        ],
        responsibilities=[
            "Manage reservations, reissues, and cancellations",
            "Handle billing, invoicing, and account reconciliation",
            "Maintain accuracy and support customers",
        ],
        description=f"Travelearn Holidays — Ticketing cum Accountant walk-in in Calicut on {WALK_DATE}.",
    ),
    walkin_base(
        id="travelearn-senior-tour-advisor-walkin-oct26",
        companyBlurb=f"Travelearn Holidays · Senior Tour Advisor · Walk-in {WALK_DATE} · Calicut",
        location=VENUE,
        roles=["Senior Tour Advisor"],
        experience="experienced",
        experienceRange="4+ years in travel industry",
        experienceYears="4+ years in travel industry",
        tags=["Sales", "Travel", "Calicut"],
        companyDetails="Travelearn Holidays — senior sales and tour packaging role at Calicut walk-in.",
        workDetails=(
            "Senior Tour Advisor · 4 years in travel. Design and sell customized tour packages; advise on itineraries "
            "and destinations. Communication, negotiation, sales targets, destination knowledge, client relationships, "
            "and ability to guide a team."
        ),
        requirements=[
            "4 years experience in the travel industry",
            "Custom tour packaging and itinerary sales",
            "Strong communication, negotiation, and destination knowledge",
            "Track record on sales targets",
            f"Walk in {WALK_DATE}, {WALK_TIME}",
        ],
        responsibilities=[
            "Design and sell customized tour packages",
            "Advise clients on itineraries and destinations",
            "Lead and support team members as required",
        ],
        description=f"Travelearn Holidays — Senior Tour Advisor walk-in in Calicut on {WALK_DATE}.",
    ),
    walkin_base(
        id="travelearn-video-editor-walkin-oct26",
        companyBlurb=f"Travelearn Holidays · Video Editor · Walk-in {WALK_DATE} · Calicut",
        location=VENUE,
        roles=["Video Editor"],
        experience="both",
        experienceRange="6 months – 1 year",
        experienceYears="6 months – 1 year",
        tags=["Design", "Marketing", "Calicut"],
        companyDetails="Travelearn Holidays — creative video role at Calicut walk-in.",
        workDetails=(
            "Video Editor · 6 months–1 year. AI video creation, motion graphics and animation, video editing "
            "software and creative AI tools; creative mindset and attention to detail."
        ),
        requirements=[
            "6 months to 1 year video editing experience",
            "AI video creation and motion graphics / animation",
            "Video editing software and creative AI tools",
            f"Walk in {WALK_DATE}, {WALK_TIME}",
        ],
        responsibilities=[
            "Produce and edit travel marketing videos",
            "Apply motion graphics and animation where needed",
            "Use AI-assisted creative tools with quality control",
        ],
        description=f"Travelearn Holidays — Video Editor walk-in in Calicut on {WALK_DATE}.",
    ),
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} job(s) to jobs-data.js")


if __name__ == "__main__":
    main()
