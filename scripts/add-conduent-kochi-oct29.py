#!/usr/bin/env python3
"""Add Conduent Kochi openings posted 28–29 Oct 2026; reuses the 27 Oct builder.

Job 26690 shares its posting text with the existing Accounting Services
Associate II listing (26684, 26716), so it is appended to that listing.
"""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("conduent27", ROOT / "scripts" / "add-conduent-kochi-oct27.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
mod = base.mod
base.POSTED = "2026-10-29"

SPECS = [
    {
        "ids": ["26158"],
        "title": "Supervisor, Accounting Services",
        "experience": "experienced",
        "portalPosted": "29 Oct 2026",
        "tags": ["Supervisor", "Accounting", "Team Management"],
        "summary": "Supervisor for an accounting services team at Conduent Kochi — daily direction, payment/expense report reviews, delivery to time and quality, and people management.",
        "requirements": [
            "Broad technical expertise and industry knowledge",
            "Comprehensive understanding of processes, procedures, systems and concepts in own field",
            "Able to manage performance appraisals, training for 3 or more employees, and hiring actions",
        ],
        "responsibilities": [
            "Provide daily direction so accounting services operations are performed to standards",
            "Review expenditure, expense, payment and outstanding reports for proper authorization and precision",
            "Serve as point of contact and mentor for complicated accounting issues",
            "Ensure delivery within the given timeframe and quality parameters",
            "Track project metrics and employee performance records and provide feedback",
            "Handle people management for assigned reportees",
            "Assist managers with departmental initiatives and process improvement",
        ],
    },
    {
        "ids": ["26725"],
        "title": "HR Operations and Delivery Associate IV",
        "location": "Kochi, Noida, Bangalore, Hyderabad (India)",
        "experience": "experienced",
        "experienceRange": "4+ years (IT technical sourcing)",
        "portalPosted": "29 Oct 2026",
        "workMode": "On-site · Kochi / Noida / Bangalore / Hyderabad",
        "tags": ["Recruitment", "Technical Sourcing", "HR"],
        "summary": "Technical sourcing role: end-to-end IT sourcing strategies with hiring managers and BU leaders, headhunting passive engineering, product and leadership talent. 4+ years of IT technical sourcing.",
        "skills": ["Technical sourcing", "Boolean search", "X-ray search", "Headhunting", "Offer negotiation"],
        "requirements": [
            "4+ years of strong IT technical sourcing experience",
            "Expert Boolean logic, X-ray searching, and data-driven sourcing methods",
            "Comprehensive understanding of the complete recruitment lifecycle",
            "Strong communication and convincing skills",
        ],
        "responsibilities": [
            "Drive end-to-end technical sourcing strategies in a fast-paced, quick-TAT environment",
            "Partner with hiring managers and Business Unit leaders across technical domains",
            "Headhunt passive engineering, product, and leadership talent",
            "Advise candidates and resolve compensation expectations, benefits, and competing offers",
            "Ensure smooth handoffs between sourcing, interviewing, and onboarding",
            "Diagnose sourcing-funnel bottlenecks and improve conversion rates",
        ],
    },
]

MERGE_INTO = "conduent-kochi-accounting-services-associate-ii-26684-oct2026"
MERGE_ID = "26690"


def merge_existing(text: str) -> str:
    span = mod.find_job_span(text, MERGE_INTO)
    if not span or f"job/{MERGE_ID}" in text[span[0]:span[1]]:
        return text
    start, end = span
    block = text[start:end]
    url = base.JOB_URL.format(MERGE_ID)
    block = block.replace("· 2 openings", "· 3 openings").replace("2 openings on careers", "3 openings on careers")
    block = block.replace("— 2 openings (Job IDs 26684, 26716)", f"— 3 openings (Job IDs 26684, 26716, {MERGE_ID})")
    block = block.replace("(Job IDs 26684, 26716)", f"(Job IDs 26684, 26716, {MERGE_ID})")
    block = block.replace(
        "https://careers.conduent.com/us/en/job/26716",
        f"https://careers.conduent.com/us/en/job/26716 , {url}",
        1,
    )
    return text[:start] + block + text[end:]


def main() -> None:
    path = ROOT / "data" / "jobs-data.js"
    text = merge_existing(path.read_text(encoding="utf-8"))
    fresh = []
    for item in SPECS:
        job = base.build(item)
        job["hiringNotes"] = job["hiringNotes"].replace("27 Oct 2026", "29 Oct 2026")
        if f'applyLink: "{job["applyLink"]}"' not in text:
            fresh.append(job)
    for i, job in enumerate(fresh, start=1):
        job["pinOrder"] = i
    if fresh:
        text = base.shift_pins(text, len(fresh))
        block = ",\n".join(mod.render_job(item) for item in fresh) + ",\n"
        text = text.replace("var JOBS = [\n", "var JOBS = [\n" + block, 1)
    path.write_text(text, encoding="utf-8")
    print(f"Added {len(fresh)} Conduent Kochi jobs; merged {MERGE_ID} into {MERGE_INTO}")


if __name__ == "__main__":
    main()
