#!/usr/bin/env python3
"""Add Instagram hiring creatives collected 20 Sep 2026."""

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
        "source": "Instagram",
        "verified": True,
        "verificationNote": NOTE,
        "isWalkIn": False,
        "walkInDate": "",
        "startingDate": "",
        "skills": [],
        "applyDeadline": "Rolling",
        "benefits": [
            "Listing transcribed from an employer hiring creative",
            "Never pay anyone for this application",
        ],
    }
    base.update(kwargs)
    return base


JOBS = [
    job(
        id="cavli-wireless-brand-communications-uiux-kochi-sep2026",
        company="Cavli Wireless",
        companyBlurb="Cavli Wireless · Associate – Brand Communications (UI/UX & Graphic Designer) · Kochi",
        location="Kochi, Kerala",
        roles=["Associate – Brand Communications (UI/UX & Graphic Designer)"],
        experience="experienced",
        experienceRange="2–5 years",
        employmentType="Full-time",
        tags=["Design", "UI/UX", "Marketing"],
        email="aneenary.joseph@cavliwireless.com",
        phone="",
        website="",
        industry="IoT / Technology",
        companyDetails="Cavli Wireless builds cellular IoT modules and connected solutions. Hiring for Marketing Operations in Kochi.",
        workDetails="Hybrid creative role bridging UI/UX design and graphic design. Support website revamp, digital presence, B2B marketing creatives, and AI-assisted design workflows.",
        workStatus="Full-time",
        workMode="On-site · Kochi",
        experienceYears="2–5 years",
        skills=[
            "Figma",
            "Adobe Photoshop",
            "Adobe Illustrator",
            "UI/UX",
            "Responsive web design",
            "Midjourney",
            "Adobe Firefly",
        ],
        requirements=[
            "Bachelor's in Design, Visual Communication, Multimedia, HCI, or related field",
            "2–5 years in website design, UI/UX, and digital graphic design",
            "Strong portfolio with responsive web design and corporate marketing graphics",
            "Advanced Figma and Adobe Creative Suite proficiency",
            "Understanding of responsive design, web grids, and WCAG accessibility",
            "Experience with AI design tools (Midjourney, Firefly, etc.) preferred",
        ],
        responsibilities=[
            "Design responsive website pages and landing pages aligned with brand identity",
            "Develop wireframes, user flows, high-fidelity designs, and prototypes",
            "Prepare developer-ready assets and collaborate on handoff and QA",
            "Create B2B marketing creatives, social media assets, and presentations",
            "Maintain design systems and visual consistency across channels",
            "Leverage AI tools to accelerate design exploration and asset generation",
        ],
        howToApply="Email aneenary.joseph@cavliwireless.com with your portfolio and CV",
        hiringNotes="Source: Cavli Wireless Instagram hiring creative · Sep 2026.",
        description="Associate – Brand Communications (UI/UX & Graphic Designer) at Cavli Wireless · Kochi · 2–5 yrs.",
    ),
    job(
        id="innovature-multi-roles-infopark-kochi-sep2026",
        company="Innovature",
        companyBlurb="Innovature · 7 openings · Infopark, Kochi",
        location="Infopark, Kochi",
        roles=[
            "Azure Data Engineer",
            "Technical Analyst",
            "Database Developer",
            "Senior DevOps Engineer",
            "Senior Software Engineer – Python",
            "Project Manager",
            "Pre-Sales – Solution & Sales Support Specialist",
        ],
        experience="experienced",
        experienceRange="3–14 years (role-specific)",
        employmentType="Full-time",
        tags=["IT", "Infopark"],
        email="hr@innovaturelabs.com",
        phone="",
        website="",
        applyLink="https://lnkd.in/gmXAs6Qn",
        industry="IT / Software",
        companyDetails="Innovature Software Labs is hiring across data, DevOps, engineering, project management, and pre-sales at Infopark, Kochi.",
        workDetails="Multiple openings: Azure Data Engineer (5–7 yrs, ADF/ADL, SSIS, ETL); Technical Analyst (6–10 yrs, SQL, Power BI, ETL); Database Developer (3–5 yrs, NoSQL, SSIS, SSRS); Senior DevOps Engineer (3–6 yrs, AWS/Azure/GCP, Linux, Terraform); Senior Software Engineer Python (5+ yrs, Django/Flask, SQL); Project Manager (9–14 yrs, min 2 yrs PM, Java/Python/PHP/C#); Pre-Sales Specialist (3–7 yrs, RFP/RFI, SOW, solution design).",
        workStatus="Full-time",
        workMode="On-site · Infopark",
        experienceYears="Role-specific",
        skills=[
            "Azure",
            "AWS",
            "Python",
            "DevOps",
            "SQL",
            "Power BI",
            "ETL",
            "Terraform",
        ],
        requirements=[
            "Relevant experience for the role applied",
            "See individual role requirements on Innovature application link",
        ],
        responsibilities=[
            "Perform duties as per the specific role applied for",
            "Collaborate with Innovature delivery and client teams",
        ],
        howToApply="Email hr@innovaturelabs.com or apply via https://lnkd.in/gmXAs6Qn",
        hiringNotes="Source: Innovature hiring creative via hireby.in · Sep 2026.",
        description="Innovature hiring 7 roles at Infopark · Data, DevOps, Python, PM, Pre-Sales.",
    ),
    job(
        id="caspian-junior-hr-associate-payroll-kochi-sep2026",
        company="CASPIAN",
        companyBlurb="CASPIAN · Junior HR Associate · Payroll & Statutory Compliance · Kochi",
        location="Kochi, Kerala",
        roles=["Junior HR Associate – Payroll & Statutory Compliance"],
        experience="both",
        experienceRange="~1 year · Freshers with interest may apply",
        employmentType="Full-time",
        tags=["HR", "Payroll"],
        email="hr.3pl@caspianindia.com",
        phone="",
        website="",
        industry="Logistics / 3PL",
        companyDetails="CASPIAN is hiring a Junior HR Associate for its Payroll & Statutory Compliance team in Kochi.",
        workDetails="MBA in HR. Around 1 year experience in HR, payroll, or statutory compliance. Freshers with strong interest in payroll and statutory may also apply.",
        workStatus="Full-time",
        workMode="On-site · Kochi",
        experienceYears="~1 year preferred",
        skills=["Payroll", "Statutory compliance", "HR operations"],
        requirements=[
            "MBA – HR",
            "Around 1 year experience in HR / Payroll / Statutory preferred",
            "Freshers with strong interest in Payroll & Statutory may also apply",
        ],
        responsibilities=[
            "Support payroll processing and statutory compliance",
            "Assist HR operations on documentation and filings",
            "Coordinate with finance and HR teams on compliance timelines",
        ],
        howToApply="Email your CV to hr.3pl@caspianindia.com",
        hiringNotes="Source: CASPIAN hiring creative via hireby.in · Sep 2026.",
        description="Junior HR Associate (Payroll & Statutory) at CASPIAN · Kochi · MBA HR.",
    ),
    job(
        id="aabasoft-telecalling-tamil-telugu-hindi-infopark-sep2026",
        company="Aabasoft",
        companyBlurb="Aabasoft · Telecalling · Tamil / Telugu / Hindi · Infopark · ₹15k–21k",
        location="Infopark, Kochi",
        roles=["Telecaller"],
        experience="both",
        experienceRange="As per hiring notice",
        employmentType="Full-time",
        tags=["Telecalling", "Infopark", "BPO"],
        email="jobs@aabasoft.in",
        phone="+91 9037920810",
        website="",
        address="Infopark, Kochi",
        industry="IT / BPO",
        companyDetails="Aabasoft Technologies India Private Limited is hiring telecallers fluent in Tamil, Telugu, or Hindi for its Infopark, Kochi office.",
        workDetails="Fluent in any one of Tamil, Telugu, or Hindi. Good communication and customer-handling skills. Convincing and negotiation skills through telephonic communication. Immediate joiners preferred. Kerala natives preferred. Salary ₹15,000–21,000.",
        workStatus="Full-time",
        workMode="On-site · Infopark",
        experienceYears="As per hiring notice",
        skills=[
            "Telecalling",
            "Tamil",
            "Telugu",
            "Hindi",
            "Customer handling",
            "Negotiation",
        ],
        requirements=[
            "Fluent in any one of Tamil, Telugu, or Hindi",
            "Good communication and customer-handling skills",
            "Excellent convincing and negotiation skills via phone",
            "Immediate joiners preferred",
            "Kerala natives preferred",
        ],
        responsibilities=[
            "Make outbound/inbound telecalling calls",
            "Handle customer queries and conversions",
            "Meet calling targets and quality standards",
        ],
        howToApply="Email jobs@aabasoft.in or WhatsApp/call +91 9037920810",
        hiringNotes="Source: Aabasoft Instagram post · Sep 2026. Separate from Malayalam voice-process listings.",
        description="Telecalling at Aabasoft · Infopark · Tamil/Telugu/Hindi · ₹15k–21k.",
    ),
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} Instagram jobs to jobs-data.js")


if __name__ == "__main__":
    main()
