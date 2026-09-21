#!/usr/bin/env python3
"""Add Aabasoft full-time and internship hiring posters (Sep 2026)."""

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
EMAIL = "career@aabasoft.com"
PHONE_FT = "+91 9037222178"
PHONE_INTERN = "9249156666 / 9037222178"
LOCATION = "Infopark, Kakkanad, Kochi"
ADDRESS = "Aabasoft, Infopark, Kakkanad, Kochi"


def job(**kwargs) -> dict:
    base = {
        "company": COMPANY,
        "logo": LOGO,
        "location": LOCATION,
        "applyDeadline": "Rolling",
        "postedDate": POSTED,
        "source": "WhatsApp",
        "verified": True,
        "verificationNote": NOTE,
        "isWalkIn": False,
        "walkInDate": "",
        "email": EMAIL,
        "website": "https://www.aabasoft.com",
        "address": ADDRESS,
        "companyLegalName": LEGAL,
        "workStatus": "Full-time",
        "workMode": "On-site · Infopark Kochi",
        "skills": [],
        "startingDate": "",
        "benefits": [
            "Listing transcribed from an employer hiring creative",
            "Never pay anyone for this application",
        ],
    }
    base.update(kwargs)
    return base


def ft(
    slug: str,
    role: str,
    experience: str,
    exp_key: str,
    vacancies: int,
    tags: list[str],
    qualification: str = "As per role",
) -> dict:
    subject = role.replace(" ", "%20")
    return job(
        id=f"aabasoft-{slug}-infopark-sep2026",
        companyBlurb=(
            f"Aabasoft · {role} · {vacancies} opening{'s' if vacancies != 1 else ''} · "
            f"{experience} · Infopark Kochi"
        ),
        roles=[role],
        experience=exp_key,
        experienceRange=experience,
        employmentType="Full-time",
        applyLink=f"mailto:{EMAIL}?subject={subject}%20%E2%80%94%20Aabasoft",
        tags=tags,
        vacancies=vacancies,
        vacancyText=f"{vacancies} opening{'s' if vacancies != 1 else ''}",
        phone=PHONE_FT,
        industry="IT / Software · Infopark",
        companyDetails=(
            f"{LEGAL} is hiring for {role} at Infopark, Kochi. "
            f"{vacancies} opening{'s' if vacancies != 1 else ''}. Experience: {experience}."
        ),
        workDetails=(
            f"Full-time {role} at Aabasoft, Infopark, Kochi. "
            f"Experience required: {experience}. "
            f"Share your updated resume to apply."
        ),
        experienceYears=experience,
        qualification=qualification,
        requirements=[
            f"Role: {role}",
            f"Experience: {experience}",
            f"Vacancies: {vacancies}",
            f"Location: {LOCATION}",
            "Full-time · On-site at Infopark Kochi",
            f"Apply with updated resume to {EMAIL}",
            "Never pay any fee to apply or interview",
        ],
        responsibilities=[f"Deliver outcomes for the {role} role as discussed with Aabasoft during hiring"],
        howToApply=(
            f"Email your resume to {EMAIL} or call {PHONE_FT}. "
            f"Mention {role}."
        ),
        hiringNotes="Source: Aabasoft We Are Hiring poster · Sep 2026. Verify role details with Aabasoft.",
        description=f"Aabasoft hiring {role} · {vacancies} openings · {experience} · Infopark Kochi.",
    )


def intern(slug: str, role: str, tags: list[str]) -> dict:
    subject = role.replace(" ", "%20")
    return job(
        id=f"aabasoft-intern-{slug}-infopark-sep2026",
        companyBlurb=f"Aabasoft · {role} · Internship · Infopark Kochi",
        roles=[role],
        experience="fresher",
        experienceRange="Internship / Fresher",
        employmentType="Internship",
        applyLink=f"mailto:{EMAIL}?subject={subject}%20Internship%20%E2%80%94%20Aabasoft",
        tags=tags + ["Internship"],
        workStatus="Internship",
        phone=PHONE_INTERN,
        industry="IT / Internship · Infopark",
        companyDetails=f"{LEGAL} is hiring interns for {role} at Infopark, Kochi.",
        workDetails=(
            f"Internship: {role} at Aabasoft, Infopark, Kochi. "
            "Hands-on exposure with mentorship. Share your updated resume to apply."
        ),
        experienceYears="Internship / Fresher",
        qualification="As per role · Students and freshers welcome",
        requirements=[
            f"Internship role: {role}",
            f"Location: {LOCATION}",
            f"Apply with updated resume to {EMAIL}",
            f"Call or WhatsApp {PHONE_INTERN}",
            "Never pay any fee to apply or interview",
        ],
        responsibilities=[f"Support the {role} team and learn on live projects during the internship"],
        howToApply=(
            f"Email your resume to {EMAIL} or call/WhatsApp {PHONE_INTERN}. "
            f"Mention {role} internship."
        ),
        hiringNotes="Source: Aabasoft internship hiring poster · Sep 2026.",
        description=f"Aabasoft {role} internship · Infopark Kochi.",
    )


JOBS = [
    ft(
        "senior-dotnet-developer",
        "Senior .NET Developer",
        "4+ years",
        "experienced",
        3,
        ["IT", ".NET"],
        "Relevant degree with .NET experience",
    ),
    ft(
        "business-development-manager",
        "Business Development Manager",
        "3+ years",
        "experienced",
        5,
        ["Sales", "Business"],
        "Any degree · BDM experience",
    ),
    ft(
        "business-analyst",
        "Business Analyst",
        "2+ years",
        "experienced",
        3,
        ["IT", "Business"],
        "Relevant degree · BA experience",
    ),
    ft(
        "full-stack-developer",
        "Full Stack Developer",
        "1+ year",
        "experienced",
        6,
        ["IT", "Full Stack"],
        "Relevant degree / diploma",
    ),
    ft(
        "seo-analyst",
        "SEO Analyst",
        "1+ year",
        "experienced",
        3,
        ["Marketing", "SEO"],
        "Relevant degree · SEO experience",
    ),
    ft(
        "accounts-assistant",
        "Accounts Assistant",
        "1+ year",
        "experienced",
        8,
        ["Finance", "Accounts"],
        "Commerce / accounts background",
    ),
    ft(
        "video-editor",
        "Video Editor",
        "1+ year",
        "experienced",
        3,
        ["Design", "Media"],
        "Relevant qualification · editing portfolio",
    ),
    ft(
        "executive-assistant-ceo",
        "Executive Assistant to the CEO",
        "Freshers",
        "fresher",
        2,
        ["Admin", "Executive"],
        "Any degree / diploma",
    ),
    ft(
        "social-media-influencer",
        "Social Media Influencer",
        "Freshers",
        "fresher",
        3,
        ["Marketing", "Social Media"],
        "Any degree / diploma",
    ),
    intern("digital-marketing", "Digital Marketing", ["Marketing"]),
    intern("lead-gen-cloud", "Lead Gen Cloud", ["Sales", "Cloud"]),
    intern("operation-executive", "Operation Executive", ["Operations"]),
    intern("hr", "HR", ["HR"]),
    intern("technical-support-cloud", "Technical Support – Cloud", ["IT", "Support", "Cloud"]),
    intern("dotnet", ".NET", ["IT", ".NET"]),
    intern("product-consultant", "Product Consultant", ["Product", "Consulting"]),
    intern("software-testing", "Software Testing", ["IT", "QA"]),
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} Aabasoft poster job(s) to jobs-data.js")


if __name__ == "__main__":
    main()
