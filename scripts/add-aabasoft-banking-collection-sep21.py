#!/usr/bin/env python3
"""Add Aabasoft Banking Executive – Centralised Collection (Sep 2026)."""

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
POSTED = "2026-09-21"
LOGO = "assets/logos/aabasoft.svg"
COMPANY = "Aabasoft"
LEGAL = "Aabasoft Technologies India Private Limited"
EMAIL = "jobs@aabasoft.in"
VISMAYA = "Aabasoft, Vismaya, Infopark, Kakkanad, Kochi 682042"

JOBS = [
    {
        "id": "aabasoft-banking-executive-centralised-collection-infopark-sep2026",
        "company": COMPANY,
        "logo": LOGO,
        "companyBlurb": (
            "Aabasoft · Banking Executive – Centralised Collection · 50 vacancies · "
            "Freshers · Malayalam voice · Infopark Kochi · ₹10k in-hand + incentives"
        ),
        "location": "Infopark, Kakkanad, Kochi",
        "roles": ["Banking Executive – Centralised Collection"],
        "experience": "fresher",
        "experienceRange": "Freshers",
        "employmentType": "Full-time",
        "applyLink": (
            f"mailto:{EMAIL}?subject=Banking%20Executive%20%E2%80%94%20Centralised%20Collection%20%E2%80%94%20Aabasoft"
        ),
        "applyDeadline": "Rolling",
        "postedDate": POSTED,
        "source": "WhatsApp",
        "verified": True,
        "verificationNote": NOTE,
        "tags": ["Banking", "BPO", "Collections", "Infopark"],
        "isWalkIn": False,
        "walkInDate": "",
        "vacancies": 50,
        "vacancyText": "50 vacancies",
        "urgentHiring": True,
        "email": EMAIL,
        "phone": "8089009751 / 8089002222",
        "website": "https://www.aabasoft.com",
        "address": VISMAYA,
        "industry": "BPO · Banking Collections",
        "companyLegalName": LEGAL,
        "companyDetails": (
            f"{LEGAL} is hiring Banking Executives for centralised collection at "
            "Vismaya, Infopark, Kakkanad, Kochi. Male and female candidates welcome. "
            "Freshers preferred. Immediate joiners preferred."
        ),
        "workDetails": (
            "Banking Executive – Centralised Collection in a Malayalam voice process. "
            "Good communication skills in Malayalam required. "
            "Salary ₹12,000 CTC (PF & ESI) with approximately ₹10,000 in-hand, plus "
            "extra incentives starting from ₹1,000 up to ₹6,000. "
            "Qualification: any degree or diploma. 50 vacancies. Immediate joining preferred."
        ),
        "workStatus": "Full-time",
        "workMode": "On-site · Infopark Kochi",
        "experienceYears": "Freshers",
        "qualification": "Any degree / Diploma",
        "salary": "₹12,000 CTC (~₹10,000 in-hand) + incentives",
        "salaryRange": "₹12,000 CTC (PF & ESI) · ~₹10,000 in-hand · incentives ₹1,000–₹6,000",
        "skills": [
            "Malayalam communication",
            "Malayalam voice process",
            "Telecalling",
            "Collections",
            "Customer follow-ups",
        ],
        "whoCanApply": [
            "Freshers · Male / female",
            "Any degree or diploma",
            "Good communication skills in Malayalam",
            "Immediate joiners preferred",
        ],
        "requirements": [
            "Banking Executive – Centralised Collection",
            "50 vacancies",
            "Male / female · Freshers",
            "Qualification: any degree / diploma",
            "Good communication skills in Malayalam",
            "Malayalam voice process",
            "Salary ₹12,000 CTC (PF & ESI) · approximately ₹10,000 in-hand",
            "Extra incentives starting ₹1,000 up to ₹6,000",
            "Location: Aabasoft, Infopark, Kochi",
            "Immediate joining preferred",
            "Never pay any fee to apply or interview",
        ],
        "responsibilities": [
            "Handle centralised banking collection calls in Malayalam",
            "Follow up with customers as per process guidelines",
            "Meet quality and productivity targets on the voice process",
        ],
        "benefits": [
            "50 vacancies",
            "Freshers welcome",
            "Incentives ₹1,000–₹6,000 on top of in-hand pay",
            "Listing transcribed from an employer hiring notice",
            "Never pay anyone for this application",
        ],
        "howToApply": (
            f"Email your resume to {EMAIL} or call 8089009751 / 8089002222. "
            "Mention Banking Executive – Centralised Collection. "
            f"Work location: {VISMAYA}."
        ),
        "hiringNotes": "Source: Aabasoft hiring notice · Sep 2026. Verify salary, shift, and incentives with Aabasoft before applying.",
        "description": (
            "Aabasoft hiring 50 Banking Executives – Centralised Collection · Freshers · "
            "Malayalam voice · Infopark Kochi · ₹10k in-hand + incentives."
        ),
        "startingDate": "Immediate",
        "seoTitle": "Aabasoft Banking Executive Collections 50 Vacancies Infopark Kochi | InfoparkDaily",
        "seoDescription": (
            "Aabasoft is hiring 50 Banking Executives for centralised collection at Infopark Kochi. "
            "Freshers, Malayalam voice process, ₹12k CTC (~₹10k in-hand) plus ₹1k–₹6k incentives."
        ),
    }
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} Aabasoft banking collection job(s) to jobs-data.js")


if __name__ == "__main__":
    main()
