#!/usr/bin/env python3
"""Add Codepluse Gen PHP Laravel Developer — Coimbatore, 22 Oct 2026."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

EMAIL = "hrcodepluse@gmail.com"
PHONE = "+91 98400 70929"


def main() -> None:
    job = {
        "id": "codepluse-php-laravel-developer-coimbatore-oct2026",
        "pinOrder": 1,
        "company": "Codepluse Gen Private Limited",
        "logo": "",
        "companyBlurb": "Codepluse Gen · PHP Laravel Developer · Coimbatore · 1–3 years",
        "location": "Coimbatore",
        "roles": ["PHP Laravel Developer"],
        "experience": "experienced",
        "experienceRange": "1–3 years",
        "employmentType": "Full-time",
        "applyLink": f"mailto:{EMAIL}?subject=PHP%20Laravel%20Developer%20%E2%80%94%20Coimbatore",
        "applyDeadline": "Rolling",
        "postedDate": "2026-10-22",
        "source": "WhatsApp",
        "verified": True,
        "verificationNote": mod.NOTE,
        "tags": ["IT", "PHP", "Laravel"],
        "isWalkIn": False,
        "walkInDate": "",
        "email": EMAIL,
        "phone": PHONE,
        "website": "",
        "industry": "IT / Software",
        "companyDetails": "Codepluse Gen Private Limited is hiring a PHP Laravel Developer in Coimbatore.",
        "workDetails": "Full-time PHP Laravel Developer. 1–3 years. Skills listed: PHP, Laravel, MySQL, REST APIs, and Git.",
        "workStatus": "Full-time",
        "workMode": "On-site · Coimbatore",
        "experienceYears": "1–3 years",
        "skills": ["PHP", "Laravel", "MySQL", "REST APIs", "Git"],
        "requirements": [
            "1–3 years of experience",
            "PHP",
            "Laravel",
            "MySQL",
            "REST APIs",
            "Git",
        ],
        "responsibilities": [
            "Build and maintain PHP Laravel applications",
            "Work with MySQL and REST APIs",
            "Use Git for source control",
        ],
        "benefits": [
            "Listing transcribed from an employer hiring notice",
            "Never pay anyone for this application",
        ],
        "howToApply": f"Email your updated resume to {EMAIL} or WhatsApp {PHONE}.",
        "hiringNotes": "Hiring notice, 22 Oct 2026. Coimbatore. Full-time.",
        "description": "PHP Laravel Developer at Codepluse Gen Private Limited, Coimbatore. 1–3 years. PHP, Laravel, MySQL, REST APIs, and Git.",
        "startingDate": "",
        "companyLegalName": "Codepluse Gen Private Limited",
        "qualification": "",
    }
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", [job])
    print(f"Added {n} Codepluse job")


if __name__ == "__main__":
    main()
