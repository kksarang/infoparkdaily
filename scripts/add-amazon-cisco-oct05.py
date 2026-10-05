#!/usr/bin/env python3
"""Add Amazon Chennai + Cisco Bangalore fresher openings — 5 Oct 2026.

Sources:
- https://www.amazon.jobs/en/jobs/10530968/associate-retail-process-cmt
- https://careers.cisco.com/global/en/job/CISCISGLOBAL2014481EXTERNALENGLOBAL/Software-Engineer-Trainee-Technical-Graduate-Apprentice-India-UHR
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

AMAZON_LINK = "https://www.amazon.jobs/en/jobs/10530968/associate-retail-process-cmt"
CISCO_LINK = (
    "https://careers.cisco.com/global/en/job/CISCISGLOBAL2014481EXTERNALENGLOBAL/"
    "Software-Engineer-Trainee-Technical-Graduate-Apprentice-India-UHR"
)

JOBS = [
    {
        "id": "amazon-associate-retail-process-cmt-chennai-10530968-oct26",
        "company": "Amazon",
        "logo": "",
        "companyBlurb": "Amazon · Associate – Retail Process, CMT · Chennai · Any Graduate · Remote",
        "location": "Chennai, Tamil Nadu, India",
        "roles": ["Associate – Retail Process, CMT"],
        "experience": "fresher",
        "experienceRange": "Any Graduate · Freshers welcome",
        "employmentType": "Full-time",
        "applyLink": AMAZON_LINK,
        "applyDeadline": "Rolling",
        "postedDate": TODAY,
        "source": "WhatsApp",
        "verified": True,
        "verificationNote": NOTE,
        "tags": ["Amazon", "Freshers", "Operations", "Remote", "Chennai"],
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": "https://www.amazon.jobs",
        "address": "Chennai, Tamil Nadu, India",
        "industry": "E-commerce / Operations",
        "companyDetails": "Amazon operations role supporting retail pricing analytics and process quality for the CMT team.",
        "workDetails": (
            "Monitor and ensure accuracy of pricing analytics and operations through audits and process "
            "improvement. Audit team and system outputs, suggest and implement process/system improvements, "
            "track quality metrics, and partner with business, automation and technology teams."
        ),
        "workStatus": "Full-time",
        "workMode": "Remote · Work from home",
        "experienceYears": "Any Graduate",
        "salaryRange": "₹3 – ₹4.5 LPA (estimated — verify on Amazon Jobs)",
        "qualification": "Any Graduate",
        "skills": ["Attention to detail", "Process auditing", "Quality metrics", "Operations"],
        "requirements": [
            "Any graduate qualification",
            "Eye for detail and ability to work across teams",
            "Comfort with audits, quality tracking and process improvement",
        ],
        "responsibilities": [
            "Audit operations team and system outputs",
            "Track and maintain quality metrics for assigned processes",
            "Identify performance trends and drive operational improvements",
            "Collaborate with business, automation and technology teams",
        ],
        "benefits": [
            "Amazon brand",
            "Remote work mode",
            "Apply only on official Amazon Jobs — never pay anyone for this application",
        ],
        "howToApply": f"Apply on Amazon Jobs: {AMAZON_LINK}",
        "hiringNotes": "Amazon job ID 10530968 · Shared Oct 2026 · Salary range is community estimate, not from Amazon.",
        "description": "Amazon hiring Associate – Retail Process, CMT in Chennai — Any Graduate, remote / WFH.",
        "startingDate": "",
    },
    {
        "id": "cisco-software-engineer-trainee-apprentice-bangalore-2014481-oct26",
        "company": "Cisco",
        "logo": "",
        "companyBlurb": (
            "Cisco · Software Engineer Trainee / Technical Graduate Apprentice · Bangalore · "
            "Bachelor's / Master's · 12-month program"
        ),
        "location": "Bangalore, Karnataka, India",
        "roles": ["Software Engineer Trainee / Technical Graduate Apprentice"],
        "experience": "fresher",
        "experienceRange": "Freshers · 2025 / 2026 graduates",
        "employmentType": "Apprenticeship",
        "applyLink": CISCO_LINK,
        "applyDeadline": "Rolling",
        "postedDate": TODAY,
        "source": "WhatsApp",
        "verified": True,
        "verificationNote": NOTE,
        "tags": ["Cisco", "Freshers", "IT", "Software Engineering", "Apprenticeship", "Bangalore"],
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": "https://www.cisco.com",
        "address": "Bangalore, Karnataka, India",
        "industry": "Networking / Software",
        "companyDetails": (
            "Cisco Engineering trainee / graduate apprentice role in Bangalore. "
            "12-month program with exposure to AI, networking, security and SaaS operations."
        ),
        "workDetails": (
            "Join Cisco Engineering as a trainee on impactful projects (AI for energy-efficient data centers, "
            "security systems, network optimization). Learn programming, deployment in large SaaS environments, "
            "change management, and build automation tools for operations."
        ),
        "workStatus": "Apprenticeship",
        "workMode": "On-site · Bangalore",
        "experienceYears": "Bachelor's / Master's · Freshers",
        "skills": [
            "Programming fundamentals",
            "Software deployment",
            "Change management",
            "Automation",
            "Communication",
        ],
        "requirements": [
            "Bachelor's or Master's degree",
            "Graduated in 2025 or 2026 with final or provisional degree certificate",
            "Available for 12 months starting September 2026",
            "Enrolled on NATS (https://nats.education.gov.in/) with valid student enrolment number",
            "Good communication and passion for technology",
        ],
        "responsibilities": [
            "Learn programming languages and current development methodologies",
            "Support software deployment and upgrades in a large SaaS environment",
            "Follow change management and deployment processes",
            "Develop tools to automate complex operations tasks",
        ],
        "benefits": [
            "Cisco Engineering apprenticeship",
            "Official careers portal application only",
            "Never pay anyone for this application",
        ],
        "howToApply": f"Apply on Cisco careers: {CISCO_LINK}",
        "hiringNotes": (
            "Cisco requisition 2014481 · Technical Graduate Apprentice · NATS enrolment required · Oct 2026."
        ),
        "description": (
            "Cisco Software Engineer Trainee / Technical Graduate Apprentice in Bangalore for 2025–2026 grads."
        ),
        "startingDate": "2026-09-01",
    },
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} jobs to jobs-data.js")


if __name__ == "__main__":
    main()
