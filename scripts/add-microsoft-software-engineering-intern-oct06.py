#!/usr/bin/env python3
"""Add Microsoft Software Engineering Intern (India) — 6 Oct 2026.

Source: https://apply.careers.microsoft.com/careers/job/1970393556911730
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

LINK = "https://apply.careers.microsoft.com/careers/job/1970393556911730"
JOB_ID = "1970393556911730"
DISPLAY_ID = "200041085"
TITLE = "Software Engineering Intern"

JOBS = [
    {
        "id": f"microsoft-software-engineering-intern-india-{JOB_ID}-oct26",
        "company": "Microsoft",
        "logo": "",
        "companyBlurb": f"Microsoft · {TITLE} · India (multiple locations)",
        "location": "India (multiple Microsoft locations)",
        "roles": [TITLE],
        "experience": "fresher",
        "experienceRange": "University intern · Bachelors/Masters in CS or related · 1+ semester remaining after internship",
        "employmentType": "Internship",
        "applyLink": LINK,
        "applyDeadline": "Rolling",
        "postedDate": TODAY,
        "source": "WhatsApp",
        "verified": True,
        "verificationNote": NOTE,
        "tags": ["Microsoft", "India", "Internship", "Software Engineering", "Freshers"],
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": "https://careers.microsoft.com",
        "address": "India — multiple locations (see official posting)",
        "industry": "Technology",
        "companyDetails": "Microsoft India university internship on the official Microsoft careers portal.",
        "workDetails": (
            "Software Engineering Intern — work with teammates to solve problems and build software. "
            "Design, develop, and test next-generation software; learn new technologies and engineering methods. "
            "Real-world projects with global teams. Role type: individual contributor; employment type: internship; "
            "work site: fully on-site; travel less than 25%."
        ),
        "workStatus": "Internship",
        "workMode": "On-site · multiple India locations",
        "experienceYears": "Intern / student",
        "qualification": "Pursuing Bachelor's or Master's in Computer Science, Engineering, or related field",
        "skills": ["Data structures", "Algorithms", "Object-oriented programming"],
        "requirements": [
            "Currently pursuing Bachelor's or Master's in Computer Science, Engineering, or related field",
            "At least one semester/term remaining after the internship completes",
            "One year of programming experience in an object-oriented language",
            "Understanding of computer science fundamentals (preferred)",
        ],
        "responsibilities": [
            "Apply engineering principles to solve complex problems",
            "Work with stakeholders to determine user requirements",
            "Learn and incorporate new engineering methods",
            "Seek feedback and apply best practices to improve solutions",
            "Complete software projects in a cooperative team environment",
            "Improve reliability, efficiency, and performance of products at scale",
        ],
        "benefits": [
            "Apply only on the official Microsoft careers site — never pay anyone for this application",
            "Official apply.careers.microsoft.com listing",
        ],
        "howToApply": f"Apply on Microsoft Careers: {LINK}",
        "hiringNotes": (
            f"Microsoft requisition {DISPLAY_ID} · PCS job id {JOB_ID} · "
            "Applications accepted on an ongoing basis until filled · Added Oct 2026."
        ),
        "description": "Microsoft Software Engineering Intern — India, multiple locations; university internship program.",
        "startingDate": "",
    },
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} job(s) to jobs-data.js")


if __name__ == "__main__":
    main()
