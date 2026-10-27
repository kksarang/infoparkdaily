#!/usr/bin/env python3
"""Aabasoft hiring posters shared 27 Oct 2026. Only details printed on each poster."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "add_whatsapp", ROOT / "scripts" / "add-whatsapp-jobs-oct27.py"
)
wa = importlib.util.module_from_spec(spec)
spec.loader.exec_module(wa)

job = wa.job
mod = wa.mod

COMPANY = "Aabasoft"
SITE = "https://www.aabasoft.com"
EMAIL = "career@aabasoft.com"

JOBS = [
    job(
        "aabasoft-bdm-cloud-solutions-kochi-calicut",
        COMPANY,
        "Business Development Manager – Cloud Solutions",
        "Kochi · Calicut",
        experience="experienced",
        experience_range="5+ years",
        email=EMAIL,
        phone="+91 92491 56666",
        website=SITE,
        tags=["Sales", "Cloud", "Business Development", "Kochi", "Calicut"],
        work_details=(
            "Business Development Manager – Cloud Solutions at Aabasoft. Experience: 5+ years. "
            "Open positions: Kochi – 3 openings, Calicut – 3 openings."
        ),
        responsibilities=[
            "Drive business growth for cloud solutions and related services",
            "Manage key accounts, negotiate high-value deals, and achieve revenue targets",
            "Build strategic partnerships and identify new business opportunities",
            "Collaborate with technical teams to deliver client-centric cloud solutions",
        ],
        how="Send your resume to career@aabasoft.com. For queries: +91 92491 56666",
    ),
    job(
        "aabasoft-bde-cloud-solutions-kochi-calicut",
        COMPANY,
        "Business Development Executive – Cloud Solutions",
        "Kochi · Calicut",
        experience="experienced",
        experience_range="2–3 years",
        email=EMAIL,
        phone="+91 92491 56666",
        website=SITE,
        tags=["Sales", "Cloud", "Business Development", "Kochi", "Calicut"],
        work_details=(
            "Business Development Executive – Cloud Solutions at Aabasoft. Experience: 2–3 years. "
            "Open positions: Kochi – 3, Calicut – 3."
        ),
        responsibilities=[
            "Identify and generate new business opportunities for cloud solutions",
            "Build and maintain strong client relationships",
            "Drive business growth and achieve sales targets",
            "Collaborate with technical teams to offer the right cloud solutions",
        ],
        how="Send your resume to career@aabasoft.com. For queries: +91 92491 56666",
    ),
    job(
        "aabasoft-business-analyst-kochi",
        COMPANY,
        "Business Analyst",
        "Kochi",
        experience="experienced",
        experience_range="1+ years",
        email=EMAIL,
        phone="9037222178",
        website=SITE,
        tags=["Business Analyst", "ERP", "Kochi"],
        work_details="Business Analyst at Aabasoft, Kochi. Experience: 1+ years.",
        requirements=[
            "Strong analytical, logical, and problem-solving skills",
            "Expertise in requirements gathering, analysis, and documentation",
            "Ability to work independently, prioritise tasks, and meet deadlines",
            "Experience in preparing reports and delivering client presentations",
            "Proficiency in traditional and AI-powered prototyping tools",
            "Experience in handling ERP projects",
        ],
        how="Send your resume to career@aabasoft.com or call 9037222178",
    ),
    job(
        "aabasoft-accounts-assistant",
        COMPANY,
        "Accounts Assistant",
        "",
        experience="experienced",
        experience_range="1+ years",
        email=EMAIL,
        phone="9037222178",
        website=SITE,
        tags=["Accounts", "Finance", "GST"],
        work_details="Accounts Assistant at Aabasoft. Experience: 1+ years.",
        requirements=[
            "Knowledge of GST, TDS, tax calculations, and statutory compliance",
            "Hands-on experience in invoice processing, billing, accounts receivable, and bank reconciliations",
        ],
        how="Send your resume to career@aabasoft.com or call 9037222178",
    ),
    job(
        "aabasoft-lead-generation-executive-kochi",
        COMPANY,
        "Lead Generation Executive",
        "Kochi",
        experience="experienced",
        experience_range="1+ years",
        email=EMAIL,
        phone="92491 56666",
        website=SITE,
        tags=["Sales", "Lead Generation", "CRM", "Kochi"],
        work_details="Lead Generation Executive at Aabasoft, Kochi. Experience: 1+ years.",
        responsibilities=[
            "Research, identify and reach out to potential clients across industries",
            "Initiate conversations, understand client requirements and nurture leads to create business opportunities",
            "Work closely with the sales and marketing teams, maintain CRM updates and contribute to achieving revenue targets",
        ],
        how="Send your resume to career@aabasoft.com or call 92491 56666",
    ),
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} Aabasoft jobs to jobs-data.js")


if __name__ == "__main__":
    main()
