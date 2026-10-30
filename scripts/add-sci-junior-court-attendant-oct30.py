#!/usr/bin/env python3
"""Supreme Court of India advertisement No. F.3/2026-SC (RC), shared 30 Oct 2026. Only details printed in it."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("posters30", ROOT / "scripts" / "add-whatsapp-jobs-oct30.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
mod = base.mod

item = base.job(
    "supreme-court-junior-court-attendant-2026",
    "Supreme Court of India",
    "Junior Court Attendant (Group C Non-Clerical) – 130 vacancies",
    "All India · Test centres in 131 cities, including Kerala",
    roles=["Junior Court Attendant"],
    experience="both",
    experience_range="",
    apply_link="https://www.sci.gov.in",
    employment_type="Full-time",
    deadline="2026-11-25",
    tags=["Government", "Central Government", "Group C", "10th Pass", "12th Pass", "Supreme Court"],
    work_details=(
        "Advertisement No. F.3/2026-SC (RC), dated 15 October 2026: direct recruitment to prepare a panel for 130 tentative "
        "vacancies of Junior Court Attendant (Group 'C' Non-Clerical), Level 3 of Pay Matrix (Rs. 21,700–69,100), initial Basic Pay "
        "Rs. 21,700 plus allowances. The number of posts may change. Online applications: 4 November 2026 to 25 November 2026, 11:55 PM. "
        "Selection: Objective Type Test (tentatively 26 December 2026; 1½ hours; 100 questions, 100 marks, minimum 50 – General "
        "Intelligence & Reasoning, Numerical Aptitude, General English and General Awareness, 25 questions each; 0.25 negative marking "
        "per incorrect answer) and Interview (25 marks, minimum 13; online or in physical mode in Delhi). Application fee (non-refundable): "
        "Rs. 1,500 for General/Unreserved; Rs. 750 for SC/ST/OBC (Non-Creamy Layer)/Ex-Servicemen/Physically Challenged, plus bank "
        "charges, online through the UCO Bank payment gateway. Kerala test cities: Ernakulam, Kannur, Kollam, Kottayam, Kozhikode, "
        "Thiruvananthapuram and Thrissur."
    ),
    requirements=[
        "Indian citizen",
        "Minimum: X Standard examination from a Board/Institute recognised by the Government",
        "Maximum: XII Standard/10+2 examination from a Board/Institute recognised by the Government",
        "Age 18–27 years as on 1 October 2026",
        "Usual age relaxation for SC, ST, OBC (Non-Creamy Layer), Physically Challenged and Ex-Servicemen as per Government of India rules",
        "Up to 5 years' relaxation for dependants of freedom fighters",
        "Widows, divorced women and judicially separated women not remarried: up to 35 years (OBC Non-Creamy Layer 38; SC/ST 40)",
        "No upper age limit for Departmental candidates of the Registry of the Supreme Court; no relaxation for candidates working in other Government Departments, PSUs, Statutory bodies, Nationalized Banks, etc.",
        "Candidates in Central/State Government Departments, PSUs, Statutory bodies, Nationalized Banks, etc. must submit a No Objection Certificate at document verification",
        "Upload scanned photograph, signature, Class X and XII/10+2 certificates, and caste/community and disability certificates if applicable",
    ],
    responsibilities=[
        "Carry files, paper books, books and records",
        "Dust tables, chairs, almirahs, windows, book-shelves and other furniture",
        "Serve tea, coffee, snacks, water and other refreshments to officers/officials of the Registry",
    ],
    qualification="Minimum X Standard; maximum XII Standard/10+2",
    website="https://www.sci.gov.in",
    source="Official notification",
    how=(
        "Apply online through the link provided on www.sci.gov.in from 4 November 2026 to 25 November 2026, 11:55 PM. "
        "Online registration only; no postal applications. Applications cannot be withdrawn or modified after submission."
    ),
)
item["hiringNotes"] = "Added 30 Oct 2026 from the official Supreme Court advertisement. Verify on www.sci.gov.in before applying."
item["address"] = ""
item["vacancies"] = 130
item["vacancyText"] = "130"
item["salaryRange"] = "Rs. 21,700–69,100 (Pay Level 3)"


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", [item])
    print(f"Added {n} job to jobs-data.js")


if __name__ == "__main__":
    main()
