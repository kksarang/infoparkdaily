#!/usr/bin/env python3
"""Refresh SayOne Fullstack Developer (Python / React / AI) — Infopark Kochi, 2–3 years.

Updates Infopark job 21131 with the current JD. Apply: careers@sayonetech.com.
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

JOB_ID = "ipv-sayone-technologies-pvt-ltd-full-stack-developer-python-reactjs-immediate-joiner-exp-21131"
INFOPARK_JOB = "https://infopark.in/company-jobs/details/129/21131"
EMAIL = "careers@sayonetech.com"
TODAY = mod.TODAY.isoformat()
NOTE = mod.NOTE
LOGO = "https://infopark.in/upload_images/company_logos/295rsz_sayone_logo_final.png"
APPLY = (
    "mailto:careers@sayonetech.com"
    "?subject=Fullstack%20Developer%20%E2%80%94%20Python%20/%20React%20%E2%80%94%202%E2%80%933%20years"
)

JOB = {
    "id": JOB_ID,
    "company": "SayOne Technologies Pvt.Ltd.",
    "logo": LOGO,
    "companyBlurb": (
        "SayOne · Fullstack Developer (Python / React / AI) · Infopark Kochi · "
        "2–3 years · Apply by 30 Oct 2026"
    ),
    "location": "Infopark, Kochi",
    "roles": ["Fullstack Developer"],
    "experience": "experienced",
    "experienceRange": "2–3 years",
    "employmentType": "Full-time",
    "applyLink": APPLY,
    "applyDeadline": "2026-10-30",
    "postedDate": TODAY,
    "source": "Infopark",
    "verified": True,
    "infoparkVerified": True,
    "verificationNote": NOTE,
    "tags": ["IT", "Python", "React", "Full Stack", "AI", "Django", "FastAPI", "Next.js", "Kochi", "Infopark"],
    "isWalkIn": False,
    "walkInDate": "",
    "email": EMAIL,
    "phone": "",
    "website": "https://www.sayonetech.com",
    "address": "Infopark, Kochi, Kerala",
    "industry": "IT Services / Software Product Engineering",
    "companyDetails": (
        "SayOne Technologies Pvt. Ltd. — Infopark Kochi. AI-driven engineering team hiring a "
        "Fullstack Developer for scalable APIs, React/Next.js frontends, and LLM workflows."
    ),
    "workDetails": (
        "Fullstack Developer · 2+ years · Infopark, Kochi (work from office). Strong backend with "
        "Django, Flask, or FastAPI; frontend with React.js / Next.js; AI/LLM work with Langchain or "
        "Crew AI. Build scalable APIs, integrate AI models, and deliver secure, high-performance apps. "
        "Hands-on with developer tools such as Cursor, Augment, or Windsurf."
    ),
    "workStatus": "Full-time",
    "workMode": "On-site · Infopark Kochi",
    "experienceYears": "2–3 years",
    "skills": [
        "Python",
        "Django",
        "Flask",
        "FastAPI",
        "React.js",
        "Next.js",
        "SQLAlchemy",
        "Django ORM",
        "Langchain",
        "Crew AI",
        "RAG",
        "Cursor",
        "UV",
        "Poetry",
        "black / ruff / flake8",
        "OAuth / JWT",
    ],
    "requirements": [
        "2+ years of hands-on backend and frontend development",
        "Proficiency in Django, Flask, or FastAPI",
        "Experience with SQLAlchemy or Django ORM",
        "Good with React.js",
        "Familiarity with Cursor, Augment, or Windsurf",
        "Experience with Poetry, UV, and virtual environments",
        "Understanding of backend security best practices",
        "Proficient with black, ruff, and flake8",
        "Experience with LLMs, RAG pipelines, Langchain, Crew AI, or AutoGen",
        "Strong API design, OAuth/JWT authentication, and performance tuning",
        "Nice to have: Docker and CI/CD",
        "Nice to have: AWS, GCP, or Azure",
        "Nice to have: Celery, RQ, and async programming",
        "Nice to have: developer platforms, SDKs, or internal tools",
        "Nice to have: open-source or personal AI projects",
    ],
    "responsibilities": [
        "Develop and maintain Python applications — clean, scalable code for backend services, data pipelines, and AI-integrated solutions",
        "Design RESTful APIs with Django, Flask, or FastAPI for web and mobile apps",
        "Build responsive frontends using React.js or Next.js",
        "Implement LLM workflows, RAG pipelines, and agent orchestration with Langchain, Crew AI, or similar",
        "Collaborate with frontend, DevOps, and data science teams on end-to-end features",
        "Develop server-side logic and third-party API integrations",
        "Debug, optimize, and secure applications",
        "Use developer productivity tools such as Cursor, Augment, or Windsurf",
        "Manage environments and dependencies with UV",
        "Maintain code quality with black, ruff, and flake8",
    ],
    "benefits": [
        "Official Infopark portal listing",
        "On-site with SayOne’s AI-driven engineering team at Infopark, Kochi",
        "Never pay anyone for this application",
    ],
    "howToApply": (
        f"Email your updated resume to {EMAIL} with subject Fullstack Developer — Python / React. "
        f"Official Infopark listing: {INFOPARK_JOB}"
    ),
    "hiringNotes": (
        f"Infopark job 21131 refreshed {TODAY} from the current SayOne Fullstack Developer notice. "
        "Confirm the role is open before applying."
    ),
    "description": (
        "SayOne Technologies hiring Fullstack Developer (Python / React / AI) at Infopark Kochi — "
        "2–3 years. Django/Flask/FastAPI, React/Next.js, Langchain/Crew AI. Apply by 30 Oct 2026."
    ),
    "startingDate": "",
    "alertBucket": "upcoming",
    "officialLinks": {
        "infoparkJob": INFOPARK_JOB,
        "website": "https://www.sayonetech.com",
    },
}


def remove_job(path: Path, jid: str) -> bool:
    text = path.read_text(encoding="utf-8")
    span = mod.find_job_span(text, jid)
    if not span:
        return False
    start, end = span
    if end < len(text) and text[end] == "\n":
        end += 1
    path.write_text(text[:start] + text[end:], encoding="utf-8")
    print(f"  removed {jid} from {path.name}")
    return True


def upsert_top(path: Path, array_name: str, job: dict) -> None:
    remove_job(path, job["id"])
    n = mod.insert_jobs(path, array_name, [job])
    print(f"  upserted {job['id']} at top of {path.name} ({n} inserted)")


def main() -> None:
    upsert_top(ROOT / "data" / "jobs-data.js", "JOBS", JOB)
    upsert_top(ROOT / "data" / "infopark-jobs-data.js", "INFOPARK_VERIFIED_JOBS", JOB)


if __name__ == "__main__":
    main()
