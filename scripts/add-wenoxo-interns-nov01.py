#!/usr/bin/env python3
"""Wenoxo intern poster shared 1 Nov 2026. Only details printed on the poster."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("posters29", ROOT / "scripts" / "add-whatsapp-jobs-oct29.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
mod = base.mod

item = base.job(
    "wenoxo-flutter-operations-interns",
    "Wenoxo",
    "Flutter Developer Intern / Operation Executive Intern",
    "Location not printed on the notice",
    roles=["Flutter Developer Intern", "Operation Executive Intern"],
    experience="fresher",
    experience_range="Freshers can also apply",
    email="hrm@wenoxo.in",
    phone="+91 81220 31834",
    employment_type="Internship",
    tags=["Internship", "Freshers", "Flutter", "Operations"],
    work_details="Wenoxo is hiring interns. Flutter Developer Intern: Dart programming language is mandatory. Operation Executive Intern: Hindi is a must. Freshers can also apply. Stipend provided.",
    requirements=[
        "Flutter Developer Intern: Dart programming language (mandatory)",
        "Operation Executive Intern: Hindi, must know",
    ],
    benefits=["Stipend provided"],
    how="Send your resume to hrm@wenoxo.in. Contact: +91 81220 31834",
)
item["id"] = "wenoxo-flutter-operations-interns-nov01"
item["postedDate"] = "2026-11-01"
item["address"] = ""
item["hiringNotes"] = "Added 1 Nov 2026 from the employer's hiring poster. Verify with the employer before applying."

path = ROOT / "data" / "jobs-data.js"
text = path.read_text(encoding="utf-8")
if f'id: "{item["id"]}"' not in text:
    path.write_text(text.replace("var JOBS = [\n", "var JOBS = [\n" + mod.render_job(item) + ",\n", 1), encoding="utf-8")
    print("Added Wenoxo interns")
