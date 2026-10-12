#!/usr/bin/env python3
"""Official career listings — 12 Oct 2026 (Harmonic Bangalore, EY Kochi)."""

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
TODAY = "2026-10-12"


def listing(
    slug: str,
    company: str,
    title: str,
    location: str,
    *,
    apply_link: str,
    experience: str,
    experience_range: str,
    work_mode: str,
    tags: list[str],
    work_details: str,
    requirements: list[str],
    responsibilities: list[str],
    benefits: list[str],
    description: str,
    hiring_notes: str,
) -> dict:
    return {
        "id": f"{slug}-oct26",
        "company": company,
        "logo": "",
        "companyBlurb": f"{company} · {title} · {location}",
        "location": location,
        "roles": [title],
        "experience": experience,
        "experienceRange": experience_range,
        "employmentType": "Full-time",
        "applyLink": apply_link,
        "applyDeadline": "Rolling",
        "postedDate": TODAY,
        "source": "Direct",
        "verified": True,
        "verificationNote": NOTE,
        "tags": tags,
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": "",
        "address": location,
        "industry": "As per employer notice",
        "companyDetails": f"{company} — hiring for {title}.",
        "workDetails": work_details,
        "workStatus": "Full-time",
        "workMode": work_mode,
        "experienceYears": experience_range,
        "qualification": "",
        "skills": [],
        "requirements": requirements,
        "responsibilities": responsibilities,
        "benefits": benefits,
        "howToApply": f"Apply on the official careers page: {apply_link}",
        "hiringNotes": hiring_notes,
        "description": description,
        "startingDate": "",
        "officialLinks": {"careers": apply_link},
    }


JOBS = [
    listing(
        "harmonic-associate-sw-development-engineer-bangalore",
        "Harmonic",
        "Associate SW Development Engineer",
        "Bengaluru, India",
        apply_link="https://egmn.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/Harmonic/job/260140",
        experience="fresher",
        experience_range="BE ECE or Computer Science · 85% or 8.5 CGPA",
        work_mode="Hybrid · 3–4 days a week from the Bengaluru office",
        tags=["IT", "Freshers", "Bangalore", "Embedded", "C++"],
        work_details=(
            "Harmonic Broadband Devices team. Develop software features for embedded systems, "
            "debug cross-layer network device issues reported by QA and customers, and implement "
            "corrective fixes. Hybrid role: 3–4 days a week from the Bengaluru office."
        ),
        requirements=[
            "BE in Electronics and Communication or Computer Science with 85% or 8.5 CGPA",
            "No current backlogs, repeat year, or gap in studies",
            "Strong C++ / C programming",
            "Knowledge of Layer 2/3 networking protocols",
            "Fluent English (writing and speaking)",
            "Linux, and scripting in Perl, Python, or Bash, is an advantage",
        ],
        responsibilities=[
            "Develop software features for embedded systems",
            "Debug and resolve complex cross-layer system issues reported by QA and customers",
            "Perform root cause analysis and implement long-term corrective and preventive solutions",
        ],
        benefits=[
            "Apply only on Harmonic's official careers page",
            "Never pay anyone for this application",
        ],
        description="Harmonic hiring an Associate SW Development Engineer in Bengaluru (hybrid) for the Broadband Devices team.",
        hiring_notes="Added 12 Oct 2026 from Harmonic's official careers page (requisition 260140, posted 16 Jul 2026). Re-check the listing before applying.",
    ),
    listing(
        "ey-associate-analyst-usrm-enablement-kochi",
        "EY",
        "Associate Analyst – USRM Enablement",
        "Kochi, Kerala",
        apply_link="https://careers.ey.com/ey/job/Kochi-Associate-Analyst-USRM-Enablement-KL-682303/1424177133/",
        experience="experienced",
        experience_range="1–3 years · Risk management, finance, or related",
        work_mode="Hybrid",
        tags=["Finance", "Risk", "Kochi", "EY"],
        work_details=(
            "EY Global Delivery Services (GDS), Kochi. Associate Risk Management Analyst supporting "
            "CPA licensing compliance: mailbox and inquiry handling, license validation, renewals, "
            "dashboards, and process improvement. Hybrid role. Salary listed as competitive on the EY posting."
        ),
        requirements=[
            "Bachelor's degree in finance, business, risk management, or a related field",
            "1–3 years in risk management, finance, or a related area",
            "Advanced Microsoft Office, particularly Excel",
            "Strong analytical, organizational, and problem-solving skills",
            "Experience with risk management tools and systems is desirable",
        ],
        responsibilities=[
            "Support CPA licensing compliance through mailbox management, inquiry handling, and license validation",
            "Validate CPA licenses using internal and external regulatory sources",
            "Process licensing requests, renewals, jurisdiction updates, and compliance documentation",
            "Maintain operational dashboards, reports, and trackers",
            "Investigate employee inquiries and escalate complex issues",
            "Collaborate with onshore and offshore stakeholders and support process improvements",
        ],
        benefits=[
            "Apply only on EY Careers",
            "Never pay anyone for this application",
            "Continuous learning and a hybrid working setup, as described on the EY posting",
        ],
        description="EY Kochi hiring an Associate Analyst for USRM Enablement (GDS) — hybrid, 1–3 years.",
        hiring_notes="Added 12 Oct 2026 from EY Careers (posted 10 Oct 2026, requisition 1424177133). Re-check the listing before applying.",
    ),
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} direct jobs to jobs-data.js")


if __name__ == "__main__":
    main()
