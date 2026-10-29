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
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} poster jobs to jobs-data.js")


if __name__ == "__main__":
    main()
