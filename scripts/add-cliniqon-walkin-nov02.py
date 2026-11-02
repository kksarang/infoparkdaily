#!/usr/bin/env python3
"""Cliniqon Home Health Coders walk-in poster shared 2 Nov 2026. Only details stated in the post."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("posters29", ROOT / "scripts" / "add-whatsapp-jobs-oct29.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
mod = base.mod

VENUE = "3rd Floor, A & B Block, Amrit Tower, CSEZ, Kakkanad, Kochi"
DATES = "November 3, 4 & 5, 2026 (Tuesday, Wednesday & Thursday)"

item = base.job(
    "cliniqon-home-health-coders-walkin-kakkanad",
    "Cliniqon",
    "Home Health Coders (Walk-in)",
    "CSEZ, Kakkanad, Kochi",
    roles=["Home Health Coder"],
    experience="both",
    experience_range="",
    phone="9048312626",
    apply_link="tel:+919048312626",
    deadline="2026-11-05",
    tags=["Walk-in", "Healthcare", "Medical Coding", "Life Science", "Kakkanad"],
    work_details=f"Grand walk-in drive for Home Health Coders at Cliniqon on {DATES}, at {VENUE}. Qualification: Life Science Graduates. Walk in with your resume.",
    requirements=["Life Science Graduates", "Bring your resume"],
    qualification="Life Science Graduates",
    website="https://www.cliniqon.com",
    address=VENUE,
    walk_in="2026-11-03",
    how=f"Walk in with your resume on {DATES} at {VENUE}. Contact: 9048312626.",
)
item["id"] = "cliniqon-home-health-coders-walkin-kakkanad-nov02"
item["postedDate"] = "2026-11-02"
item["employmentType"] = ""
item["workStatus"] = ""
item["walkinDates"] = "November 3, 4 & 5, 2026"
item["hiringNotes"] = "Added 2 Nov 2026 from the employer's hiring poster. Verify with the employer before attending."

path = ROOT / "data" / "jobs-data.js"
text = path.read_text(encoding="utf-8")
if f'id: "{item["id"]}"' not in text:
    path.write_text(text.replace("var JOBS = [\n", "var JOBS = [\n" + mod.render_job(item) + ",\n", 1), encoding="utf-8")
    print("Added Cliniqon walk-in")
