#!/usr/bin/env python3
"""Add Amazon Financial Analyst Intern (Bengaluru) — 5 Oct 2026.

Source: https://www.amazon.jobs/en/jobs/10525952/financial-analyst-intern-nl-re-e-finance-team
"""

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
TODAY = mod.TODAY.isoformat()

LINK = (
    "https://www.amazon.jobs/en/jobs/10525952/"
    "financial-analyst-intern-nl-re-e-finance-team"
)
JOB_ID = "10525952"
TITLE = "Financial Analyst Intern, NL/RE&E Finance team"
LOCATION = "Bengaluru, Karnataka, India"

JOBS = [
    {
        "id": f"amazon-financial-analyst-intern-nl-re-e-finance-{JOB_ID}-oct26",
        "company": "Amazon",
        "logo": "",
        "companyBlurb": f"Amazon · {TITLE} · {LOCATION}",
        "location": LOCATION,
        "roles": [TITLE],
        "experience": "experienced",
        "experienceRange": "1+ years finance · 12–15 month internship tenure",
        "employmentType": "Internship",
        "applyLink": LINK,
        "applyDeadline": "Rolling",
        "postedDate": TODAY,
        "source": "WhatsApp",
        "verified": True,
        "verificationNote": NOTE,
        "tags": ["Amazon", "India", "Finance", "Internship", "Bengaluru"],
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": "https://www.amazon.jobs",
        "address": "ASSPL Karnataka B56 · Bengaluru, India",
        "industry": "Finance and Global Business Services",
        "companyDetails": "Amazon India finance opening listed on the official Amazon Jobs portal.",
        "workDetails": (
            "Support the business and finance leader with financial analysis for corrective actions and "
            "decision making. Define business and financial metrics for worldwide reporting and local "
            "needs; build processes to capture and analyze metrics. Tenure approximately 12–15 months."
        ),
        "workStatus": "Internship",
        "workMode": "On-site · Bengaluru",
        "experienceYears": "1+ years finance",
        "qualification": "Finance / related degree with corporate finance exposure",
        "skills": ["Excel", "SQL", "Financial modeling", "KPIs", "Oracle", "Essbase", "VBA"],
        "requirements": [
            "1+ years of finance experience",
            "1+ years applying KPIs in analyses",
            "Excel, Access, Oracle, Essbase, SQL and VBA skills",
            "Experience using data to influence business decisions",
            "Corporate finance: budgeting/planning, forecasting and reporting",
        ],
        "responsibilities": [
            "Produce and deliver financial analysis for the NL/RE&E finance team",
            "Define metrics aligned to global reporting and local business needs",
            "Build and maintain processes to capture and analyze financial data",
        ],
        "benefits": [
            "Apply only on Amazon Jobs — never pay anyone for this application",
            "Official amazon.jobs listing",
        ],
        "howToApply": f"Apply on Amazon Jobs: {LINK}",
        "hiringNotes": (
            f"Amazon job ID {JOB_ID} · Added Oct 2026 · Intern tenure 12–15 months · "
            "Verify role on the official posting."
        ),
        "description": (
            "Amazon Financial Analyst Intern on the NL/RE&E Finance team — Bengaluru, 12–15 month program."
        ),
        "startingDate": "",
    },
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} job(s) to jobs-data.js")


if __name__ == "__main__":
    main()
