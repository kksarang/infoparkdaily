#!/usr/bin/env python3
"""Add Cee Cee Solutions Data Annotation walk-in (Sep 17–18, 2026)."""

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
POSTED = "2026-09-20"


def job(**kwargs) -> dict:
    base = {
        "logo": "",
        "postedDate": POSTED,
        "source": "WhatsApp",
        "verified": True,
        "verificationNote": NOTE,
        "isWalkIn": True,
        "walkInDate": "17 & 18 September 2026",
        "walkinTime": "10:00 AM – 12:00 PM",
        "walkinLocation": "Infopark, Kochi",
        "startingDate": "",
        "skills": ["Basic computer knowledge", "Communication"],
        "applyDeadline": "2026-09-18",
        "benefits": [
            "Listing transcribed from employer walk-in creative",
            "Never pay anyone for this application",
        ],
    }
    base.update(kwargs)
    return base


JOBS = [
    job(
        id="cee-cee-solutions-data-annotation-walkin-sep2026",
        company="Cee Cee Solutions",
        companyBlurb="Cee Cee Solutions · Data Annotation · Walk-in 17–18 Sep · Freshers · Infopark, Kochi",
        location="Infopark, Kochi",
        roles=["Data Annotation"],
        experience="fresher",
        experienceRange="Freshers",
        employmentType="Full-time",
        applyLink="mailto:ceeceesolutions.hr@gmail.com?subject=Data%20Annotation%20%E2%80%93%20Walk-in",
        tags=["IT"],
        email="ceeceesolutions.hr@gmail.com",
        phone="8136866726",
        website="",
        address="Infopark, Kochi, Kerala",
        industry="IT Services / Data",
        salary="₹8,000 – ₹10,000",
        salaryRange="₹8,000 – ₹10,000 per month",
        companyDetails="Cee Cee Solutions is hiring freshers for Data Annotation roles at Infopark, Kochi. Walk-in on 17 and 18 September 2026.",
        workDetails="Data Annotation · Freshers · Salary ₹8,000–₹10,000 · Walk-in 17 & 18 Sep 2026, 10:00 AM–12:00 PM at Infopark, Kochi.",
        workStatus="Full-time",
        workMode="On-site · Infopark, Kochi",
        experienceYears="Freshers",
        requirements=[
            "Basic computer knowledge",
            "Good communication skills",
            "Walk in on 17 or 18 September 2026 between 10:00 AM and 12:00 PM",
            "Carry resume and ID proof",
        ],
        responsibilities=[
            "Label and annotate data as per project guidelines",
            "Maintain accuracy and quality standards",
            "Follow team instructions and deadlines",
        ],
        howToApply=(
            "Walk in on 17 or 18 September 2026, 10:00 AM–12:00 PM, at Infopark, Kochi. "
            "Or email your resume to ceeceesolutions.hr@gmail.com or call +91 8136866726."
        ),
        hiringNotes=(
            "Source: Cee Cee Solutions walk-in creative · Sep 2026. "
            "Map: https://share.google/M4BTbCentITr2G9HB — confirm with the company before travelling."
        ),
        description="Cee Cee Solutions — Data Annotation walk-in for freshers at Infopark, Kochi. 17–18 Sep 2026.",
    ),
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} job(s) to jobs-data.js")


if __name__ == "__main__":
    main()
