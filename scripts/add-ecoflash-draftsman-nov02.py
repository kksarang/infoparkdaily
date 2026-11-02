#!/usr/bin/env python3
"""Ecoflash Draftsman post shared 2 Nov 2026. Only details stated in the post."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("posters29", ROOT / "scripts" / "add-whatsapp-jobs-oct29.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
mod = base.mod

item = base.job(
    "ecoflash-draftsman-civil-landscape-calicut",
    "Ecoflash Initiative and Sustainable Solutions Pvt. Ltd.",
    "Draftsman (Civil / Landscape Projects)",
    "Calicut",
    experience="experienced",
    experience_range="3+ years",
    email="hr.admin@eissworld.com",
    apply_link="mailto:hr.admin@eissworld.com?subject=Draftsman%20(Civil%20%2F%20Landscape%20Projects)",
    salary="₹25,000 – ₹30,000 per month",
    tags=["Draftsman", "Civil", "AutoCAD", "Landscape", "Calicut"],
    work_details=(
        "Draftsman for civil and landscape projects at Ecoflash Initiative and Sustainable Solutions Pvt. Ltd., Calicut. "
        "3+ years of experience. Salary ₹25,000 – ₹30,000 per month."
    ),
    requirements=[
        "Diploma or Degree in Civil Engineering or a related field",
        "Minimum 3 years of experience as a Draftsman/Civil Draftsman",
        "Strong expertise in AutoCAD drafting and construction drawings",
        "Experience in shop drawings, quantity take-offs and BOQ preparation",
        "Ability to interpret engineering drawings and site requirements",
        "Attention to detail, strong communication and coordination skills",
        "Ability to manage multiple projects and deadlines; problem-solving mindset",
        "Preferred: SketchUp, Revit, Lumion, Enscape, Twinmotion or D5 Render",
        "Preferred: landscape or hardscape project experience",
        "Preferred: rendering and presentation drawing skills; basic Photoshop knowledge",
    ],
    responsibilities=[
        "Conduct site visits, take measurements and verify site conditions",
        "Prepare and modify drawings based on actual site requirements",
        "Develop detailed shop drawings, layouts, sections, elevations and construction details using AutoCAD",
        "Prepare hatching, dimensioning and annotations as per project standards",
        "Extract quantities from drawings for estimation and BOQ preparation",
        "Create 3D models and visual presentations when required",
        "Maintain drawing revisions and document control",
        "Coordinate with engineers, project managers and site teams to ensure drawing accuracy",
    ],
    qualification="Diploma or Degree in Civil Engineering or a related field",
    how="Send your CV along with your portfolio to hr.admin@eissworld.com.",
)
item["id"] = "ecoflash-draftsman-civil-landscape-calicut-nov02"
item["postedDate"] = "2026-11-02"
item["employmentType"] = ""
item["workStatus"] = ""
item["hiringNotes"] = "Added 2 Nov 2026 from the employer's hiring post. Verify with the employer before applying."

path = ROOT / "data" / "jobs-data.js"
text = path.read_text(encoding="utf-8")
if f'id: "{item["id"]}"' not in text:
    path.write_text(text.replace("var JOBS = [\n", "var JOBS = [\n" + mod.render_job(item) + ",\n", 1), encoding="utf-8")
    print("Added Ecoflash Draftsman")
