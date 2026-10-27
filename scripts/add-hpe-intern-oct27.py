#!/usr/bin/env python3
"""Add HPE Intern, Software Engineer - I (job 1211844), pinned at the top."""

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
APPLY = "https://careers.hpe.com/us/en/job/1211844/Intern"


def shift_pins(text: str, by: int) -> str:
    pins = [int(n) for n in re.findall(r"pinOrder: (\d+)", text)]
    dupes = [n for n, count in Counter(pins).items() if count != 1]
    if dupes:
        raise SystemExit(f"Duplicate pinOrder values: {dupes}")

    def repl(match: re.Match[str]) -> str:
        return f"pinOrder: {int(match.group(1)) + by}"

    return re.sub(r"pinOrder: (\d+)", repl, text)


JOB = {
    "id": "hpe-intern-software-engineer-i-1211844-oct2026",
    "pinOrder": 1,
    "company": "Hewlett Packard Enterprise",
    "logo": "",
    "companyBlurb": "HPE · Intern, Software Engineer - I · Bengaluru · Hybrid · Batch 2027/2028/2029 · career page reports filled",
    "location": "Bengaluru, Karnataka, India",
    "roles": ["Intern, Software Engineer - I"],
    "experience": "fresher",
    "experienceRange": "Currently pursuing Bachelor’s · Batch 2027 / 2028 / 2029",
    "employmentType": "Internship",
    "applyLink": APPLY,
    "applyDeadline": "2026-10-26",
    "postedDate": POSTED,
    "source": "WhatsApp",
    "verified": True,
    "verificationNote": NOTE,
    "tags": ["HPE", "Internship", "Software Engineer", "Bengaluru", "Hybrid", "Fresher"],
    "isWalkIn": False,
    "walkInDate": "",
    "email": "",
    "phone": "",
    "website": "https://careers.hpe.com",
    "address": "Bengaluru, Karnātaka, 560048, India",
    "industry": "Technology / Enterprise Computing",
    "companyDetails": "Hewlett Packard Enterprise internship listed on the official HPE careers page.",
    "workDetails": (
        "Intern, Software Engineer - I at Hewlett Packard Enterprise in Bengaluru, Karnataka, India. "
        "Designed as Hybrid — on average 2 days per week from an HPE office. "
        "Aimed at students currently pursuing a Bachelor’s degree in Engineering, Computer Science, "
        "Information Technology, or a related technical field (batch 2027 / 2028 / 2029). "
        "Familiarity with programming languages or technical tools relevant to the role. "
        "The official HPE careers page currently reports that this requisition (1211844) has been filled. "
        "Confirm any remaining openings on careers.hpe.com before applying."
    ),
    "workStatus": "Internship",
    "workMode": "Hybrid · average 2 days/week from an HPE office · Bengaluru",
    "experienceYears": "Currently pursuing Bachelor’s · Batch 2027 / 2028 / 2029",
    "qualification": "Currently pursuing a Bachelor’s degree in Engineering, Computer Science, Information Technology, or a related technical field",
    "skills": [],
    "requirements": [
        "Currently pursuing a Bachelor’s degree in Engineering, Computer Science, Information Technology, or a related technical field",
        "Familiarity with programming languages or technical tools relevant to the role",
        "Batch 2027 / 2028 / 2029",
        "Able to work hybrid — average 2 days per week from an HPE office",
        "Confirm requisition 1211844 on HPE careers — the page currently reports this job as filled",
    ],
    "responsibilities": [
        "Software engineering internship work as listed on the official HPE posting when the role is open.",
    ],
    "benefits": [
        "Apply only on HPE careers — never pay anyone for this application",
        "Official careers.hpe.com listing",
    ],
    "howToApply": f"Apply on HPE careers: {APPLY}",
    "hiringNotes": "HPE job ID 1211844 · Added 27 Oct 2026. Official careers page reports this job has been filled. Verify on careers.hpe.com.",
    "description": "HPE Intern, Software Engineer - I — Bengaluru, hybrid (avg 2 days/week in office). Batch 2027/2028/2029. Official page reports filled.",
    "startingDate": "",
}


def main() -> None:
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    if f'id: "{JOB["id"]}"' in text:
        print("HPE intern already listed")
        return
    text = shift_pins(text, 1)
    block = mod.render_job(JOB) + ",\n"
    needle = "var JOBS = [\n"
    if needle not in text:
        raise SystemExit("JOBS array not found")
    path.write_text(text.replace(needle, needle + block, 1), encoding="utf-8")
    print("Added 1 HPE job")


if __name__ == "__main__":
    main()
