#!/usr/bin/env python3
"""Add Accenture Kochi openings (Experience: 0-2 years) — 4 Oct 2026.

Source: https://www.accenture.com/in-en/careers/jobsearch?ct=Kochi&jt=Experience%3A%200-2%20years
(12 results). Skipped — already listed: R00357359, R00357354 (FrontEnd), R00357520 (Backend).
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
CAREERS = "https://www.accenture.com/in-en/careers"

TESTING = {
    "slug": "manual-testing",
    "title": "Associate Engineer – Manual Testing",
    "tags": ["IT", "QA / Testing", "Kochi"],
    "short": "Manual Testing",
    "details": "Accenture ACS Song is hiring an Associate Engineer (Functional Test Engineer) for manual testing in Kochi. Management Level 12 – Associate.",
    "work": "1–2 years of manual testing experience. Execute functional, UI, regression and smoke testing, manage the defect life cycle and test data, and take part in Agile ceremonies. E-commerce domain exposure is a plus.",
    "skills": ["Manual Testing", "STLC", "Agile (Scrum/Kanban)", "Postman", "API Testing", "Jira", "Xray", "TestLink", "Cross-browser Testing"],
    "requirements": [
        "Graduation required",
        "Around 1–2 years of hands-on manual testing experience",
        "Familiarity with STLC and Agile methodologies (Scrum/Kanban)",
        "Strong requirement analysis, test case preparation and execution skills",
        "Basic API manual testing using Postman or similar tools",
        "Exposure to Jira, Xray or TestLink is a plus",
        "Basic understanding of cross-browser and cross-device testing",
    ],
    "responsibilities": [
        "Analyze project requirements and acceptance criteria",
        "Design, write and execute manual test cases",
        "Perform functional, UI, regression and smoke testing",
        "Log, track and verify defects through the defect life cycle",
        "Prepare and manage test data for execution",
        "Participate in sprint planning, stand-ups and retrospectives; support releases and maintain test documentation",
    ],
    "desc": "Manual Testing",
}

BACKEND = {
    "slug": "backend",
    "title": "Associate Engineer – Backend Development",
    "tags": ["IT", "Backend", "Java"],
    "short": "Backend",
    "details": "Accenture ACS Song is hiring a Java/Spring Boot backend developer for its Kochi office. Management Level 12 – Associate.",
    "work": "1–2 years of hands-on backend development with Java 11+ and Spring Boot. Develop eCommerce features and integrations, build RESTful services, write unit tests and troubleshoot escalated incidents.",
    "skills": ["Java", "Spring Boot", "Spring", "REST APIs", "JUnit", "Mockito", "PowerMock", "SLF4J/Logback/Log4j", "SQL", "RDBMS", "NoSQL", "CI/CD"],
    "requirements": [
        "Graduation required",
        "1–2 years hands-on Java 11+ / Spring Boot backend development",
        "Strong data structures, algorithms and problem-solving skills",
        "Solid OOP fundamentals and design principles (SOLID, DRY)",
        "JUnit testing with Mockito / PowerMock",
        "RDBMS or NoSQL experience with SQL queries",
        "Familiarity with CI/CD pipelines and any cloud technology",
    ],
    "responsibilities": [
        "Write clean, maintainable and well-documented Java code",
        "Develop and maintain backend services and RESTful APIs with Spring Boot",
        "Contribute to eCommerce features and external system integrations",
        "Troubleshoot complex and escalated incidents",
        "Collaborate with cross-functional teams and mentor less experienced developers",
    ],
    "desc": "Java/Spring Boot",
}

BA = {
    "slug": "business-analyst",
    "title": "Associate – Business Analyst",
    "tags": ["IT", "Business Analysis", "Kochi"],
    "short": "Business Analyst",
    "details": "Accenture ACS Song is hiring an Associate Business Analyst in Kochi. Management Level 12 – Associate.",
    "work": "1–2 years of experience. Support requirement gathering and documentation, as-is / to-be process mapping, client workshops, user stories and acceptance criteria, and backlog refinement on digital commerce engagements.",
    "skills": ["Requirement Gathering", "Documentation", "User Stories", "Agile", "Process Mapping", "Excel", "APIs (basic)", "JIRA / Azure DevOps", "SAP Hybris / Salesforce (plus)"],
    "requirements": [
        "Graduation required",
        "1–2 years of experience",
        "Foundational business analysis and requirement documentation skills",
        "Exposure to Agile delivery, backlog refinement and sprint execution",
        "Basic understanding of APIs (good to have)",
        "Awareness of commerce platforms such as SAP Hybris or Salesforce is beneficial",
        "Data analysis with Excel and efficient use of AI tools",
    ],
    "responsibilities": [
        "Document as-is processes and help define to-be processes",
        "Prepare and document client workshops, interviews and requirement sessions",
        "Draft user stories and acceptance criteria under guidance",
        "Create and maintain requirement artefacts (process flows, functional docs)",
        "Support stakeholder alignment between the client, delivery team and leadership",
    ],
    "desc": "Requirements / Agile",
}

# (requisition id, profile, Accenture posting date)
POSTINGS = [
    ("R00357522", BACKEND, "2026-10-01"),
    ("R00356953", BA, "2026-09-30"),
    ("R00357526", BACKEND, "2026-09-30"),
    ("R00356316", TESTING, "2026-09-28"),
    ("R00356313", TESTING, "2026-09-24"),
    ("R00357314", TESTING, "2026-09-24"),
    ("R00357523", BACKEND, "2026-09-23"),
    ("R00356315", TESTING, "2026-09-18"),
    ("R00354485", TESTING, "2026-09-17"),
]


def job(req: str, p: dict, posted: str) -> dict:
    link = f"{CAREERS}/jobdetails?id={req}_en"
    return {
        "id": f"accenture-associate-{p['slug']}-{req.lower()}-kochi-oct2026",
        "company": "Accenture",
        "logo": "",
        "companyBlurb": f"Accenture · {p['title']} · Kochi · {req}",
        "location": "Kochi, Kerala",
        "roles": [p["title"]],
        "experience": "experienced",
        "experienceRange": "1–2 years",
        "employmentType": "Full-time",
        "applyLink": link,
        "applyDeadline": "Rolling",
        "postedDate": posted,
        "source": "Company careers page",
        "verified": True,
        "verificationNote": NOTE,
        "tags": p["tags"],
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": CAREERS,
        "industry": "IT / Consulting",
        "companyDetails": p["details"],
        "workDetails": p["work"],
        "workStatus": "Full-time",
        "workMode": "On-site · Kochi",
        "experienceYears": "1–2 years",
        "skills": p["skills"],
        "requirements": p["requirements"],
        "responsibilities": p["responsibilities"],
        "benefits": [
            "Listing transcribed from the employer's official careers page",
            "Never pay anyone for this application",
        ],
        "howToApply": f"Apply on Accenture careers: {link}",
        "hiringNotes": f"Source: Accenture careers · Job {req} · Oct 2026.",
        "description": f"{p['title']} at Accenture · Kochi · 1–2 yrs · {p['desc']}.",
        "startingDate": "",
    }


JOBS = [job(*row) for row in POSTINGS]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} Accenture Kochi jobs to jobs-data.js")


if __name__ == "__main__":
    main()
