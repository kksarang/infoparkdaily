#!/usr/bin/env python3
"""Add the Conduent Kochi opening found on 2 Nov 2026; reuses the 27 Oct builder."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("conduent27", ROOT / "scripts" / "add-conduent-kochi-oct27.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
mod = base.mod
base.POSTED = "2026-11-02"

SPECS = [
    {
        "ids": ["25973"],
        "title": "Senior Business Solution Architect",
        "location": "Bangalore, Kochi, Hyderabad (India)",
        "experience": "experienced",
        "experienceRange": "8+ years (F&A operations, consulting, outsourcing or shared services)",
        "portalPosted": "30 Oct 2026",
        "workMode": "Remote",
        "qualification": "Bachelor's degree in Accounting, Finance, Business Administration or a related field",
        "tags": ["Solution Architect", "Finance & Accounting", "Remote"],
        "summary": (
            "Finance & Accounting Solution Architect designing end-to-end F&A outsourcing solutions for prospective "
            "clients across Source to Pay, Order to Cash and Record to Report. Leads solution design during pursuit "
            "and proposal phases, develops staffing and delivery models, and creates responses to RFPs, RFIs and "
            "client presentations."
        ),
        "skills": ["F&A Operations", "Solution Design", "RFP Response", "Benchmarking", "Financial Modeling", "Excel", "PowerPoint"],
        "requirements": [
            "Bachelor's degree in Accounting, Finance, Business Administration or a related field",
            "8+ years of Finance & Accounting operations, consulting, outsourcing, shared services or business process services experience",
            "3+ years designing solutions for F&A outsourcing, managed services or shared services organizations",
            "Experience supporting large-scale RFP responses and competitive pursuits",
            "Strong understanding of F&A process areas and operating models",
            "Experience building staffing, productivity and financial models using benchmark data",
            "Advanced Microsoft Excel and PowerPoint skills",
            "Strong business writing and executive presentation skills",
            "Preferred: experience in BPO, shared services, consulting or finance transformation environments",
            "Preferred: knowledge of ERP platforms such as SAP, Oracle",
            "Preferred: experience with automation technologies including RPA, OCR, AI and workflow platforms",
            "Preferred: familiarity with Six Sigma, Lean or continuous improvement methodologies",
        ],
        "responsibilities": [
            "Design end-to-end Finance & Accounting service delivery solutions across Source to Pay, Order to Cash and Record to Report",
            "Translate client requirements into scalable operating models",
            "Use internal and external benchmark data to set productivity, staffing, cost and service level assumptions",
            "Develop capacity models and forecasts to support deal pricing and business cases",
            "Lead the F&A solution response for RFPs, RFIs and client pursuits",
            "Collaborate with pricing teams on cost models and commercial recommendations",
            "Facilitate discovery workshops and present solution recommendations to executive stakeholders",
            "Develop transition and implementation approaches and support the handoff to implementation teams",
        ],
        "benefits": [
            "Remote work",
            "Health & welfare benefits from day one",
            "Retirement savings programs",
            "Employee discounts",
            "Paid training",
            "Paid time off",
        ],
    },
]


def main() -> None:
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    fresh = []
    for item in SPECS:
        job = base.build(item)
        job["hiringNotes"] = job["hiringNotes"].replace("27 Oct 2026", "2 Nov 2026")
        if f'applyLink: "{job["applyLink"]}"' not in text:
            fresh.append(job)
    for i, job in enumerate(fresh, start=1):
        job["pinOrder"] = i
    if fresh:
        text = base.shift_pins(text, len(fresh))
        block = ",\n".join(mod.render_job(item) for item in fresh) + ",\n"
        text = text.replace("var JOBS = [\n", "var JOBS = [\n" + block, 1)
    path.write_text(text, encoding="utf-8")
    print(f"Added {len(fresh)} Conduent Kochi jobs")


if __name__ == "__main__":
    main()
