#!/usr/bin/env python3
"""Add Amazon SDE intern and Virtusa Associate listings, pinned at the top."""

from __future__ import annotations

import importlib.util
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

NOTE = mod.NOTE
POSTED = "2026-10-27"
AMAZON = "https://www.amazon.jobs/en/jobs/10541345/sde-i-intern-amazon-university-talent-acquisition"
VIRTUSA = "https://www.virtusa.com/careers/job-search/global/en/job/CREQ261742/Associate"


def shift_pins(text: str, by: int) -> str:
    pins = [int(n) for n in re.findall(r"pinOrder: (\d+)", text)]
    dupes = [n for n, count in Counter(pins).items() if count != 1]
    if dupes:
        raise SystemExit(f"Duplicate pinOrder values: {dupes}")

    def repl(match: re.Match[str]) -> str:
        return f"pinOrder: {int(match.group(1)) + by}"

    return re.sub(r"pinOrder: (\d+)", repl, text)


JOBS = [
    {
        "id": "amazon-sde-i-intern-10541345-oct2026",
        "pinOrder": 1,
        "company": "Amazon",
        "logo": "",
        "companyBlurb": "Amazon · SDE I Intern · India (Bengaluru, Chennai, Hyderabad, Delhi, Mumbai, Pune) · 6 months, 2027",
        "location": "India (Bengaluru, Chennai, Hyderabad, Delhi, Mumbai, Pune)",
        "roles": ["SDE I Intern, Amazon University Talent Acquisition"],
        "experience": "fresher",
        "experienceRange": "Currently enrolled · Graduation year 2027",
        "employmentType": "Internship",
        "applyLink": AMAZON,
        "applyDeadline": "Rolling",
        "postedDate": POSTED,
        "source": "Direct",
        "verified": True,
        "verificationNote": NOTE,
        "tags": ["Amazon", "Internship", "SDE", "India", "Fresher"],
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": "https://www.amazon.jobs",
        "address": "ADCI – Karnataka · India locations as listed on Amazon Jobs",
        "industry": "E-commerce / Technology",
        "companyDetails": "Amazon University Talent Acquisition internship listed on the official Amazon Jobs portal.",
        "workDetails": (
            "Software Development Engineer 6-month internship for 2027, in-person. Interns write production software with experienced SDEs on distributed systems, data mining, automation, optimization, scalability, and security. Full-time (40 hours/week) for 24–26 consecutive weeks, with start dates between January and June 2027. One application is considered for all India locations Amazon hires for, including Bengaluru, Chennai, Hyderabad, Delhi, Mumbai, and Pune. Offers require a university-signed availability declaration for the full internship."
        ),
        "workStatus": "Internship",
        "workMode": "On-site · India (location assigned after hiring)",
        "experienceYears": "Currently enrolled in a Bachelor’s or Master’s in CS, Computer Engineering, or a related field. Year of graduation 2027.",
        "qualification": "Currently enrolled Bachelor’s or Master’s in Computer Science, Computer Engineering, or related field · Year of Graduation 2027",
        "skills": ["C/C++", "Python", "Java", "Perl", "Data structures", "Algorithms", "OOP"],
        "requirements": [
            "Knowledge of computer science fundamentals: object-oriented design, operating systems, algorithms, data structures, and complexity analysis",
            "Knowledge of programming languages such as C/C++, Python, Java, or Perl",
            "Currently enrolled in a Bachelor’s or Master’s degree in Computer Science, Computer Engineering, or a related field at the time of application",
            "Year of graduation 2027",
            "Full-time availability for 24–26 consecutive weeks with no conflicting classes, projects, or other internships",
            "Preferred: previous technical internships; distributed systems, algorithms, and relational databases",
        ],
        "responsibilities": [
            "Collaborate with experienced Amazonians to design and ship products and services",
            "Design and build technologies in a large distributed computing environment",
            "Create solutions for predictions on distributed systems at scale",
            "Build distributed storage, index, and query systems",
            "Design and code solutions from broadly defined problems",
            "Work in an agile environment to deliver high-quality software",
        ],
        "benefits": [
            "Apply only on Amazon Jobs — never pay anyone for this application",
            "Official amazon.jobs listing",
        ],
        "howToApply": f"Apply on Amazon Jobs: {AMAZON}",
        "hiringNotes": "Amazon job ID 10541345 · Added 27 Oct 2026 · 6-month in-person internship, start January–June 2027. Verify on the official posting.",
        "description": "Amazon SDE I Intern (6 months, 2027) — India locations including Bengaluru, Chennai, Hyderabad, Delhi, Mumbai, and Pune. Graduation year 2027.",
        "startingDate": "January – June 2027",
    },
    {
        "id": "virtusa-associate-hyderabad-creq261742-oct2026",
        "pinOrder": 2,
        "company": "Virtusa",
        "logo": "",
        "companyBlurb": "Virtusa · Associate · Hyderabad · CREQ261742 · career page reports filled",
        "location": "Hyderabad, Telangana, India",
        "roles": ["Associate"],
        "experience": "both",
        "experienceRange": "Not stated on the remaining career-page notice",
        "employmentType": "Full-time",
        "applyLink": VIRTUSA,
        "applyDeadline": "2026-10-26",
        "postedDate": POSTED,
        "source": "Direct",
        "verified": True,
        "verificationNote": NOTE,
        "tags": ["Virtusa", "Hyderabad", "Associate"],
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": "https://www.virtusa.com/careers",
        "address": "Hyderabad, Telangana, India",
        "industry": "IT Services",
        "companyDetails": "Virtusa opening listed on the official Virtusa careers page.",
        "workDetails": "Associate role in Hyderabad, Telangana, India (requisition CREQ261742). The official careers page reports that this job has been filled. Confirm any remaining openings on virtusa.com/careers before applying.",
        "workStatus": "Full-time",
        "workMode": "On-site · Hyderabad",
        "experienceYears": "Not stated on the remaining career-page notice",
        "skills": [],
        "requirements": [
            "Confirm the requisition CREQ261742 on Virtusa careers",
            "The careers page currently reports this job as filled",
        ],
        "responsibilities": ["Associate work as listed on the official Virtusa posting when the role is open."],
        "benefits": [
            "Apply only on Virtusa careers — never pay anyone for this application",
            "Official virtusa.com listing",
        ],
        "howToApply": f"Apply on Virtusa careers: {VIRTUSA}",
        "hiringNotes": "Checked 27 Oct 2026. The Virtusa careers page says this job has been filled. Requisition CREQ261742.",
        "description": "Virtusa Associate, Hyderabad (CREQ261742). The official page reports the role as filled.",
        "startingDate": "",
    },
]


def main() -> None:
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    fresh = [job for job in JOBS if f'id: "{job["id"]}"' not in text]
    if not fresh:
        print("No new Amazon/Virtusa jobs")
        return
    text = shift_pins(text, len(fresh))
    block = ",\n".join(mod.render_job(item) for item in fresh) + ",\n"
    needle = "var JOBS = [\n"
    if needle not in text:
        raise SystemExit("JOBS array not found")
    path.write_text(text.replace(needle, needle + block, 1), encoding="utf-8")
    print(f"Added {len(fresh)} jobs")


if __name__ == "__main__":
    main()
