#!/usr/bin/env python3
"""SIMS Ponkunnam Dialysis Technician post shared 4 Nov 2026. Only details stated in the post."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("posters29", ROOT / "scripts" / "add-whatsapp-jobs-oct29.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
mod = base.mod

item = base.job(
    "sims-dialysis-technician-ponkunnam",
    "SIMS Multi-Speciality Hospital",
    "Dialysis Technician",
    "Ponkunnam",
    experience="fresher",
    experience_range="0–1 year (freshers can apply)",
    email="simshospitalhr25@gmail.com",
    apply_link="mailto:simshospitalhr25@gmail.com?subject=Dialysis%20Technician",
    tags=["Dialysis Technician", "Healthcare", "Hospital", "Freshers", "Ponkunnam"],
    work_details=(
        "Dialysis Technician at SIMS Multi-Speciality Hospital, Ponkunnam. "
        "0–1 year of experience; freshers can apply. Immediate joiners preferred."
    ),
    requirements=[
        "Diploma or B.Sc. in Dialysis Technology",
        "Basic knowledge of dialysis procedures and equipment",
        "Good patient care and communication skills",
        "Immediate joiners preferred",
    ],
    qualification="Diploma or B.Sc. in Dialysis Technology",
    how=(
        "Email your CV to simshospitalhr25@gmail.com (primary), "
        "or share it via LinkedIn: https://www.linkedin.com/in/aswinanoop (secondary)."
    ),
)
item["id"] = "sims-dialysis-technician-ponkunnam-nov04"
item["postedDate"] = "2026-11-04"
item["employmentType"] = ""
item["workStatus"] = ""
item["industry"] = "Healthcare / Hospital"
item["hiringNotes"] = "Added 4 Nov 2026 from the employer's hiring post (urgent requirement). Verify with the employer before applying."

path = ROOT / "data" / "jobs-data.js"
text = path.read_text(encoding="utf-8")
if f'id: "{item["id"]}"' not in text:
    path.write_text(text.replace("var JOBS = [\n", "var JOBS = [\n" + mod.render_job(item) + ",\n", 1), encoding="utf-8")
    print("Added SIMS Dialysis Technician")
