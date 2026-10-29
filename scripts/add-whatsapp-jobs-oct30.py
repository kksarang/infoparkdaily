#!/usr/bin/env python3
"""Hiring posters shared 30 Oct 2026. Only details printed on each poster."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("posters29", ROOT / "scripts" / "add-whatsapp-jobs-oct29.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
mod = base.mod


def job(*args, **kw) -> dict:
    item = base.job(*args, **kw)
    item["id"] = item["id"].replace("-oct29", "-oct30")
    item["postedDate"] = "2026-10-30"
    item["hiringNotes"] = "Added 30 Oct 2026 from the employer's hiring poster. Verify with the employer before applying."
    return item


JOBS = [
    job(
        "hamilton-activity-hub-all-rounder-kakkanad",
        "Hamilton Activity Hub",
        "Activity Hub All-Rounder (Part-time)",
        "Edachira, Kakkanad",
        experience="both",
        experience_range="",
        phone="80755 46819",
        employment_type="Part-time",
        work_mode="Part-time · 3 hours/day",
        tags=["Part-time", "Kids Activities", "Kakkanad"],
        work_details=(
            "Part-time Activity Hub All-Rounder at Hamilton Activity Hub, Edachira, Kakkanad. Working hours: 3 hours/day. "
            "The hub aims to make every afternoon fun, active and gadget-free for children."
        ),
        requirements=[
            "Good at managing kids",
            "Keep children engaged in fun activities",
            "Interested in dancing and singing",
            "Energetic, creative and child-friendly",
        ],
        address="Edachira, Kakkanad",
        how="Interested? Contact 80755 46819",
    ),
    job(
        "kmrl-apprenticeship-2026-27-kochi",
        "Kochi Metro Rail Limited (KMRL)",
        "Apprenticeship 2026–27 (Graduate / Diploma / ITI) – 70 vacancies",
        "Kochi, Kerala",
        roles=["Graduate Apprentice (NATS)", "Diploma Apprentice (NATS)", "ITI Apprentice (NAPS)"],
        experience="fresher",
        experience_range="Apprenticeship · Graduate / Diploma / ITI",
        apply_link="https://kochimetro.org/careers/",
        employment_type="Apprenticeship (1 year)",
        deadline="2026-11-10",
        tags=["Government", "Apprenticeship", "Freshers", "Kochi Metro", "Kochi"],
        work_mode="1-year apprenticeship · Kochi",
        work_details=(
            "Kochi Metro Rail Limited has notified 70 apprenticeship vacancies for 2026–27 (notification ref. "
            "KMRL/Apprenticeship/2026-27/HR-Admin/01) for Graduate, Diploma and ITI candidates under the NATS and NAPS schemes. "
            "One-year programme in Kochi. Applications open 15 October 2026 and close 10 November 2026 (23:59). "
            "Monthly stipend as per the applicable apprenticeship scheme and the official notification."
        ),
        requirements=[
            "Graduate, Diploma or ITI qualification, as per the official KMRL notification",
            "ITI candidates: register on NAPS (apprenticeshipindia.gov.in)",
            "Graduate / Diploma candidates: register on NATS (nats.education.gov.in)",
            "Eligibility and terms as per the official notification",
        ],
        benefits=["Monthly stipend as per the applicable apprenticeship scheme"],
        qualification="Graduate / Diploma / ITI",
        website="https://kochimetro.org/careers/",
        address="KMRL Corporate Office, Kaloor, Kochi",
        source="Company careers page",
        how=(
            "1) ITI: register on NAPS – https://www.apprenticeshipindia.gov.in · Graduate/Diploma: register on NATS – "
            "https://nats.education.gov.in. 2) Submit the application forms to the KMRL Corporate Office, Kaloor, Kochi, "
            "as instructed in the official notification at https://kochimetro.org/careers/. Last date: 10 Nov 2026."
        ),
    ),
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} poster jobs to jobs-data.js")


if __name__ == "__main__":
    main()
