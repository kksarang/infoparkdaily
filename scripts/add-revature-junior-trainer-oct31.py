#!/usr/bin/env python3
"""Revature Junior Trainer post shared 31 Oct 2026. Only details stated in the post."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("posters29", ROOT / "scripts" / "add-whatsapp-jobs-oct29.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
mod = base.mod

item = base.job(
    "revature-junior-trainer-chennai",
    "Revature",
    "Junior Trainer",
    "Chennai, India",
    experience="fresher",
    experience_range="2025–2027 graduating batches (varies by degree)",
    apply_link="https://www.revature.com/revature-junior-trainer-candidature-confirmation-form",
    tags=["Freshers", "Trainer", "Chennai"],
    work_details="Revature is hiring Junior Trainers in Chennai, India. Apply to receive the test link.",
    requirements=[
        "B.E. / B.Tech: 2025 & 2026 batches",
        "M.E. / M.Tech / MCA / M.Sc: 2025, 2026 & 2027 batches",
    ],
    qualification="B.E. / B.Tech / M.E. / M.Tech / MCA / M.Sc",
    how="Apply on the Revature form to receive the test link.",
)
item["id"] = "revature-junior-trainer-chennai-oct31"
item["postedDate"] = "2026-10-31"
item["hiringNotes"] = "Added 31 Oct 2026 from a shared hiring post. Verify with the employer before applying."
item["address"] = ""

text = (ROOT / "data" / "jobs-data.js").read_text(encoding="utf-8")
if f'id: "{item["id"]}"' not in text:
    block = mod.render_job(item) + ",\n"
    (ROOT / "data" / "jobs-data.js").write_text(text.replace("var JOBS = [\n", "var JOBS = [\n" + block, 1), encoding="utf-8")
    print("Added Revature Junior Trainer")
