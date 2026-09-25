#!/usr/bin/env python3
"""Add employer hiring creatives collected 25 Sep 2026."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "wa_sep21", ROOT / "scripts" / "add-whatsapp-jobs-sep21.py"
)
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
base.POSTED = "2026-09-25"
wa = base.wa
mod = base.mod

JOBS = [
    wa(
        "mantle-solutions-junior-executive-buying-infopark",
        "Mantle Solutions",
        "Junior Executive - Buying",
        "Lulu Cyber Tower 2, Infopark, Kochi",
        experience="fresher",
        experience_range="0–1 years · PG in Logistics / Supply Chain / Operations Management",
        tags=["Supply Chain", "Procurement", "Infopark"],
        website="https://mantlesolutions.in/careers/job/?id=87",
        extra={
            "applyLink": "https://mantlesolutions.in/careers/job/?id=87",
            "howToApply": "Apply online at https://mantlesolutions.in/careers/job/?id=87",
            "workDetails": "Junior Executive - Buying at Lulu Cyber Tower 2, Infopark, Kochi. 0–1 years experience. Any postgraduate degree in Logistics, Supply Chain Management or Operations Management. Basic system/computer awareness and willingness to learn. Fresh postgraduates are encouraged to apply.",
            "requirements": [
                "Any postgraduate degree in Logistics, Supply Chain Management, or Operations Management",
                "0–1 years experience; fresh postgraduates encouraged",
                "Basic system/computer awareness",
                "Willingness to learn",
            ],
        },
    ),
    wa(
        "90plus-admin-executive-infopark-thrissur",
        "90+ My Tuition App",
        "Admin Executive",
        "Infopark Thrissur, Koratty",
        experience="both",
        experience_range="Freshers & experienced · Any degree · Age up to 35",
        tags=["Admin", "EdTech", "Infopark Thrissur"],
        phone="9778403070",
        salary="Up to ₹16,000",
        extra={
            "applyLink": "https://wa.me/919778403070",
            "howToApply": "WhatsApp 97784 03070",
            "workDetails": "Admin Executive at Infopark Thrissur, Koratty. Freshers and experienced candidates can apply. Qualification: any degree. Age up to 35. Salary up to ₹16,000.",
            "requirements": ["Any degree", "Age up to 35", "Freshers and experienced candidates can apply"],
        },
    ),
    wa(
        "cybrosys-flutter-developer-fresher-calicut",
        "Cybrosys Technologies",
        "Flutter Developer (Fresher)",
        "Kinfra Techno Park, Calicut",
        experience="fresher",
        experience_range="Fresher · Any degree with basic coding skills · Initial 6 months training",
        tags=["IT", "Flutter", "Mobile"],
        email="hr@cybrosys.com",
        phone="+91 8076 59 67 31",
        website="https://www.cybrosys.com",
        extra={
            "applyLink": "mailto:hr@cybrosys.com?subject=Application%20for%20the%20Position%20of%20Flutter%20Developer%20(Fresher)",
            "howToApply": "Email your resume to hr@cybrosys.com with subject \"Application for the Position of Flutter Developer (Fresher)\"",
            "workDetails": "Flutter Developer (freshers) at Cybrosys Technologies, Kinfra Techno Park, Calicut. Initial 6 months training. Any degree with basic coding skills.",
            "requirements": ["Any degree", "Basic coding skills", "Freshers; initial 6 months training"],
        },
    ),
    wa(
        "zynder-tech-junior-developer-kochi",
        "Zynder Tech Private Limited",
        "Junior Developer",
        "Kochi, Kerala",
        experience="fresher",
        experience_range="Degree in Computer Science / IT · JavaScript an advantage",
        tags=["IT", "JavaScript", "Kochi"],
        email="careers@zyndertech.com",
        extra={
            "workDetails": "Zynder Tech is hiring Junior Developers in Kochi to work on real-world software projects, assist with development, testing and debugging, and collaborate with experienced developers through hands-on mentorship.",
            "requirements": [
                "Degree in Computer Science / IT",
                "Basic knowledge of JavaScript is an added advantage",
                "Good communication and problem-solving skills",
                "Passion for learning and software development",
            ],
            "responsibilities": [
                "Work on real-world software projects",
                "Assist with development, testing and debugging",
                "Collaborate with experienced developers",
                "Learn and grow through hands-on experience and mentorship",
            ],
        },
    ),
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} hiring-poster jobs to jobs-data.js")


if __name__ == "__main__":
    main()
