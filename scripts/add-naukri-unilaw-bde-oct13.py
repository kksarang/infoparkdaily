#!/usr/bin/env python3
"""Unilaw Global Sr. BDE — Naukri listing 121026005253 (Kochi / Kakkanad)."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

JOB_ID = "unilaw-senior-business-development-executive-kochi-oct26"
NAUKRI = "https://www.naukri.com/job-listings-121026005253"
TODAY = mod.TODAY.isoformat()
NOTE = mod.NOTE

JOB = {
    "id": JOB_ID,
    "company": "Unilaw Technologies",
    "logo": "https://infopark.in/upload_images/company_logos/Unilaw_Global_Private_Limited-1754298915.jpg",
    "companyBlurb": "Unilaw Global · Sr. Business Development Executive · Kochi (Kakkanad) · ₹3.6–9 LPA",
    "location": "Kochi (Kakkanad), Kerala",
    "roles": ["Sr. Business Development Executive"],
    "experience": "experienced",
    "experienceRange": "3–6 years · IT services sales / business development",
    "employmentType": "Full-time",
    "applyLink": NAUKRI,
    "applyDeadline": "Rolling",
    "postedDate": TODAY,
    "source": "Naukri",
    "verified": True,
    "verificationNote": NOTE,
    "tags": ["Sales", "IT", "B2B", "Infopark", "Kochi", "US Market"],
    "isWalkIn": False,
    "walkInDate": "",
    "email": "hr@unilawtech.com",
    "phone": "+91 99950 45717",
    "website": "https://unilawtech.com/career",
    "address": "5th Floor, 5A-1, Carnival Infopark Phase 2, Infopark, Kochi, Kerala 682042",
    "industry": "IT Services & Consulting",
    "companyDetails": (
        "Unilaw Global (Unilaw Technologies) — Infopark Kochi. IT consultancy and software "
        "development tailored to client needs."
    ),
    "workDetails": (
        "Sr. Business Development Executive for IT services sales (software development, IT consulting, "
        "digital solutions). Handle leads from first contact through deal closure. Find new business via "
        "calls, emails, networking, and online platforms. Strong focus on international / US market "
        "opportunities alongside GCC and European accounts. On-site at Kochi (Kakkanad / Infopark area). "
        "Perks include provident fund."
    ),
    "workStatus": "Full-time",
    "workMode": "In-person · Kochi (Kakkanad)",
    "experienceYears": "3–6 years · IT services sales / business development",
    "skills": [
        "Lead generation",
        "IT software sales",
        "International business development",
        "US market",
        "End-to-end sales",
        "B2B sales",
    ],
    "requirements": [
        "3–6 years selling IT services (software development, IT consulting, digital solutions)",
        "Experience handling leads from first contact to deal closure",
        "Comfort prospecting via calls, email, networking, and online platforms",
        "Any graduate (UG)",
    ],
    "responsibilities": [
        "Generate and qualify leads through outreach and networking",
        "Manage the sales cycle from first contact through deal closure",
        "Promote software development, IT consulting, and digital solution offerings",
        "Collaborate with delivery teams on proposals and client requirements",
    ],
    "benefits": [
        "Provident fund (per Naukri listing)",
        "Competitive salary with performance incentives",
        "Apply on Naukri or email hr@unilawtech.com — never pay anyone for this application",
    ],
    "howToApply": (
        f"Apply on Naukri: {NAUKRI} — or email hr@unilawtech.com with subject "
        "Sr. Business Development Executive."
    ),
    "hiringNotes": (
        f"Synced from Naukri job 121026005253 on {TODAY}. Also listed on InfoparkDaily direct "
        "channels; confirm the role is open before applying."
    ),
    "description": (
        "Unilaw Global hiring Sr. Business Development Executive in Kochi (Kakkanad) — "
        "3–6 years IT services sales, ₹3.6–9 LPA on Naukri."
    ),
    "startingDate": "",
    "salaryRange": "₹3.6–9 LPA (per Naukri listing)",
    "officialLinks": {
        "naukri": NAUKRI,
        "careers": "https://unilawtech.com/career",
        "infopark": "https://infopark.in/jobs/unilaw-global-private-limited",
    },
}


def main() -> None:
    path = ROOT / "data" / "jobs-data.js"
    if mod.replace_job(path, JOB):
        print(f"Updated {JOB_ID} in jobs-data.js")
    else:
        n = mod.insert_jobs(path, "JOBS", [JOB])
        print(f"Inserted {n} job into jobs-data.js")


if __name__ == "__main__":
    main()
