#!/usr/bin/env python3
"""EXL healthcare back office walk-in post shared 1 Nov 2026. Only details stated in the post."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("posters29", ROOT / "scripts" / "add-whatsapp-jobs-oct29.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
mod = base.mod

VENUE = "EXL, 7th Floor, Lulu IT Tower 1, SmartCity Road, Infopark"

item = base.job(
    "exl-healthcare-back-office-walkin-infopark",
    "EXL",
    "Healthcare Back Office Executive (Walk-in)",
    "Lulu IT Tower 1, Infopark",
    roles=["Healthcare Back Office Executive"],
    experience="fresher",
    experience_range="Freshers only",
    deadline="2026-11-02",
    tags=["Walk-in", "Freshers", "Healthcare", "Back Office", "Night Shift", "Infopark"],
    work_details=(
        "Walk-in drive for Healthcare Back Office Executive on Monday, 2 November 2026, 1:00 PM – 4:00 PM, "
        f"at {VENUE}. Freshers only. Candidates who have attended an interview with EXL within the last "
        "90 days are not eligible."
    ),
    requirements=[
        "Graduation (must be a graduate)",
        "Freshers only",
        "Willingness to work in night shift",
        "Good communication and basic computer skills preferred",
        "Not eligible if interviewed with EXL within the last 90 days",
    ],
    qualification="Graduate",
    address=VENUE,
    walk_in="2026-11-02",
    walk_in_time="1:00 PM – 4:00 PM",
    how=f"Call EXL Kochi on 0484 408 6000 or email Kochi.Recruitment@exlservice.com to confirm before travelling. Walk-in as announced: Monday, 2 November 2026, 1:00 PM – 4:00 PM at {VENUE}.",
)
item["id"] = "exl-healthcare-back-office-walkin-infopark-nov01"
item["postedDate"] = "2026-11-01"
item["employmentType"] = ""
item["workStatus"] = ""
item["verified"] = False
item["phone"] = "0484 408 6000"
item["email"] = "Kochi.Recruitment@exlservice.com"
item["hiringNotes"] = "Added 1 Nov 2026 from a shared walk-in post. Not confirmed by EXL: confirm with EXL before attending."

path = ROOT / "data" / "jobs-data.js"
text = path.read_text(encoding="utf-8")
if f'id: "{item["id"]}"' not in text:
    path.write_text(text.replace("var JOBS = [\n", "var JOBS = [\n" + mod.render_job(item) + ",\n", 1), encoding="utf-8")
    print("Added EXL walk-in")
