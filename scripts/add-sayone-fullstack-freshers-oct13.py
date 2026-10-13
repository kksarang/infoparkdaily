#!/usr/bin/env python3
"""Refresh SayOne Full-Stack Engineering Freshers (Python / React) — Kochi.

Updates the existing Infopark listing (job 18902) with the current registration
form, 3-month internship, and ₹3.0 LPA conversion. Removes a duplicate card if present.
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

JOB_ID = "ipv-sayone-technologies-pvt-ltd-opening-for-full-stack-engineering-freshers-python-react-18902"
DUP_ID = "sayone-fullstack-engineering-freshers-python-react-kochi-oct26"
FORM = "https://forms.gle/gC44jXDdQHJa1o7Z7"
INFOPARK_JOB = "https://infopark.in/company-jobs/details/129/18902"
EMAIL = "hr@sayonetech.com"
TODAY = mod.TODAY.isoformat()
NOTE = mod.NOTE
LOGO = "https://infopark.in/upload_images/company_logos/295rsz_sayone_logo_final.png"

JOB = {
    "id": JOB_ID,
    "company": "SayOne Technologies Pvt.Ltd.",
    "logo": LOGO,
    "companyBlurb": (
        "SayOne · Full-Stack Engineering Freshers (Python / React) · Infopark Kochi · "
        "3-month internship · conversion ₹3.0 LPA · Apply by 30 Oct 2026"
    ),
    "location": "Infopark, Kochi",
    "roles": ["Full-Stack Engineering Freshers (Python / React)"],
    "experience": "fresher",
    "experienceRange": "0–1 year · 2023 / 2024 / 2025 B.E. / B.Tech",
    "employmentType": "Internship",
    "applyLink": FORM,
    "applyDeadline": "2026-10-30",
    "postedDate": TODAY,
    "source": "Infopark",
    "verified": True,
    "infoparkVerified": True,
    "verificationNote": NOTE,
    "tags": ["IT", "Python", "React", "Full Stack", "AI", "Freshers", "Internship", "Kochi", "Infopark"],
    "isWalkIn": False,
    "walkInDate": "",
    "email": EMAIL,
    "phone": "",
    "website": "https://www.sayonetech.com",
    "address": "Infopark, Kochi, Kerala",
    "industry": "IT Services / Software Product Engineering",
    "companyDetails": (
        "SayOne Technologies Pvt. Ltd. — Infopark Kochi. Hiring fresher engineers who have "
        "completed full-stack training in Python and React JS, with a foundational understanding of AI."
    ),
    "workDetails": (
        "Full-stack fresher programme (Python + React JS, basic AI) at Infopark, Kochi (work from office). "
        "Selection: aptitude test, group discussion, a two-day coding task for GD-shortlisted candidates, "
        "then a final review meeting. Internship of 3 months; successful interns receive a full-time offer "
        "at SayOne at ₹3.0 LPA."
    ),
    "workStatus": "Internship",
    "workMode": "On-site · Infopark Kochi",
    "experienceYears": "0–1 year",
    "qualification": "B.E. / B.Tech (no backlogs) · 2023, 2024, or 2025 graduates",
    "educationalQualification": [
        "B.E. / B.Tech (no backlogs)",
        "2023, 2024, or 2025 graduates",
    ],
    "skills": ["Python", "React JS", "Full-stack development", "AI fundamentals"],
    "requirements": [
        "B.E. / B.Tech with no backlogs",
        "2023, 2024, or 2025 graduates",
        "Completed training in Python + React full-stack development",
        "Solid foundational understanding of AI concepts",
        "0–1 year experience (freshers)",
    ],
    "responsibilities": [
        "Build and maintain full-stack features using Python and React JS",
        "Apply foundational AI concepts as required by the team",
        "Write clean, reviewable code and work with the engineering team during the internship",
    ],
    "selectionProcess": [
        "Aptitude Test",
        "Group Discussion (GD)",
        "Coding Task — two-day assignment for candidates shortlisted from GD (practical skills and code quality)",
        "Final Review Meeting — based on assignment performance",
    ],
    "benefits": [
        "3-month internship",
        "Successful interns receive a full-time offer at SayOne at ₹3.0 LPA",
        "Official Infopark portal listing",
        "Register only on the official Google Form — never pay anyone for this application",
    ],
    "howToApply": (
        f"Register on the Google Form: {FORM}. "
        f"You can also email your updated resume to {EMAIL}. "
        f"Official Infopark listing: {INFOPARK_JOB}"
    ),
    "hiringNotes": (
        f"Infopark job 18902 refreshed {TODAY} from the current SayOne fresher notice "
        "(3-month internship, ₹3.0 LPA conversion, new registration form). "
        "Confirm dates and process with the company before applying."
    ),
    "description": (
        "SayOne Technologies hiring Full-Stack Engineering Freshers (Python / React) at Infopark Kochi — "
        "3-month internship with full-time conversion at ₹3.0 LPA. Apply by 30 Oct 2026."
    ),
    "startingDate": "",
    "alertBucket": "upcoming",
    "salaryRange": "Internship (3 months) · Full-time conversion ₹3.0 LPA",
    "googleForm": FORM,
    "officialLinks": {
        "googleForm": FORM,
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
    chunk = text[start:end]
    # Drop a following newline so we do not leave a blank hole in the array.
    if end < len(text) and text[end] == "\n":
        end += 1
    # If this was the only trailing comma case, leave surrounding commas intact
    # (find_job_span already includes the object's comma).
    path.write_text(text[:start] + text[end:], encoding="utf-8")
    print(f"  removed {jid} from {path.name} ({len(chunk)} chars)")
    return True


def upsert_top(path: Path, array_name: str, job: dict) -> None:
    remove_job(path, job["id"])
    n = mod.insert_jobs(path, array_name, [job])
    print(f"  upserted {job['id']} at top of {path.name} ({n} inserted)")


def main() -> None:
    jobs_path = ROOT / "data" / "jobs-data.js"
    park_path = ROOT / "data" / "infopark-jobs-data.js"
    remove_job(jobs_path, DUP_ID)
    upsert_top(jobs_path, "JOBS", JOB)
    upsert_top(park_path, "INFOPARK_VERIFIED_JOBS", JOB)


if __name__ == "__main__":
    main()
