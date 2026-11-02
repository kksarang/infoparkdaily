#!/usr/bin/env python3
"""NeST Digital Java Developer and Sunrise Hospital Radiology In-charge posters, 2 Nov 2026. Only details stated in the posters."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("posters29", ROOT / "scripts" / "add-whatsapp-jobs-oct29.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
mod = base.mod

nest = base.job(
    "nest-digital-java-struts-ejb-kochi",
    "NeST Digital",
    "Java Developer (Struts & EJB)",
    "Kochi",
    roles=["Java Developer (Struts & EJB)"],
    experience="experienced",
    experience_range="2–5 years",
    email="Arusha.KC@nestgroup.net",
    apply_link="mailto:Arusha.KC@nestgroup.net,Anjusha.Mohan@nestgroup.net?subject=Java%20Developer%20(Struts%20%26%20EJB)",
    tags=["Java", "Struts", "EJB", "Kochi"],
    work_details="NeST Digital is hiring a Java Developer (Struts & EJB) in Kochi. 2–5 years of experience. Qualification: Engineering Graduate. Proficiency in Malayalam is mandatory.",
    requirements=[
        "Engineering Graduate",
        "2–5 years of experience",
        "Core Java",
        "Struts & EJB",
        "SQL & MySQL",
        "iReport / JasperReports",
        "Proficiency in Malayalam (mandatory)",
    ],
    qualification="Engineering Graduate",
    how="Share your CV with Arusha.KC@nestgroup.net or Anjusha.Mohan@nestgroup.net.",
)
nest["skills"] = ["Core Java", "Struts", "EJB", "SQL", "MySQL", "iReport", "JasperReports"]

sunrise = base.job(
    "sunrise-hospital-radiology-in-charge-kochi",
    "Sunrise Hospital",
    "Radiology In-charge",
    "Kochi",
    experience="experienced",
    experience_range="10+ years",
    email="recruitment@sunrisehospital.in",
    phone="97786 90720",
    tags=["Radiology", "Healthcare", "Hospital", "Kochi"],
    work_details="Sunrise Hospital, Kochi is hiring a Radiology In-charge. Qualification: B.Sc. / M.Sc. in Radiology & Medical Imaging Technology. Experience: 10+ years.",
    requirements=["B.Sc. / M.Sc. in Radiology & Medical Imaging Technology", "10+ years of experience"],
    qualification="B.Sc. / M.Sc. in Radiology & Medical Imaging Technology",
    address="Sunrise Hospital, Kochi",
    how="Apply to recruitment@sunrisehospital.in or hr@sunrisehospital.in, or call 97786 90720.",
)

for item in (nest, sunrise):
    item["id"] = item["id"].replace("-oct29", "-nov02")
    item["postedDate"] = "2026-11-02"
    item["employmentType"] = ""
    item["workStatus"] = ""
    item["hiringNotes"] = "Added 2 Nov 2026 from the employer's hiring poster. Verify with the employer before applying."

path = ROOT / "data" / "jobs-data.js"
text = path.read_text(encoding="utf-8")
added = 0
for item in (sunrise, nest):
    if f'id: "{item["id"]}"' not in text:
        text = text.replace("var JOBS = [\n", "var JOBS = [\n" + mod.render_job(item) + ",\n", 1)
        added += 1
path.write_text(text, encoding="utf-8")
print(f"Added {added} poster jobs")
