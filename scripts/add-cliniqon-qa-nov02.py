#!/usr/bin/env python3
"""Cliniqon QA Engineer poster shared on LinkedIn 2 Nov 2026. Only details stated in the poster."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("posters29", ROOT / "scripts" / "add-whatsapp-jobs-oct29.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
mod = base.mod

item = base.job(
    "cliniqon-qa-engineer-kochi",
    "Cliniqon",
    "QA Engineer",
    "Kochi",
    experience="experienced",
    experience_range="2–5 years",
    email="incareers@cliniqon.com",
    apply_link="mailto:incareers@cliniqon.com?subject=QA%20Engineer",
    tags=["QA", "Testing", "Healthcare", "Kochi"],
    work_details=(
        "Cliniqon is looking for a detail-oriented and proactive QA Engineer with 2–5 years of experience in software "
        "quality assurance. The ideal candidate should have strong knowledge of manual testing, test case design, defect "
        "tracking and software testing methodologies. Knowledge of automation testing is preferred and will be an added advantage."
    ),
    requirements=[
        "2–5 years of hands-on experience in software quality assurance and testing",
        "Strong understanding of the Software Testing Life Cycle (STLC) and SDLC",
        "Experience in writing test cases, executing test scenarios and reporting defects",
        "Good analytical, problem-solving and debugging skills",
        "Familiarity with Agile/Scrum development methodologies",
        "Experience using Azure DevOps",
        "Strong communication skills and ability to collaborate with cross-functional teams",
        "Preferred: hands-on experience with Selenium, Playwright or Cypress",
        "Preferred: experience with API testing using Postman",
    ],
    responsibilities=[
        "Understand business requirements and identify test scenarios",
        "Prepare and maintain test plans, test cases, test data and test execution reports",
        "Perform functional, regression, smoke, integration and end-to-end testing",
        "Identify, document, track and retest defects using tools such as Azure DevOps or Jira",
        "Validate database records and application data using SQL queries",
        "Collaborate with Developers and Business Analysts",
        "Conduct cross-browser, UI, usability and basic compatibility testing",
    ],
    website="https://www.cliniqon.com",
    source="LinkedIn",
    how="Send your resume to incareers@cliniqon.com.",
)
item["id"] = "cliniqon-qa-engineer-kochi-nov02"
item["postedDate"] = "2026-11-02"
item["employmentType"] = ""
item["workStatus"] = ""
item["skills"] = ["Manual Testing", "STLC", "SDLC", "Azure DevOps", "Jira", "SQL", "Agile/Scrum", "Selenium", "Playwright", "Cypress", "Postman"]
item["hiringNotes"] = "Added 2 Nov 2026 from Cliniqon's hiring poster shared on LinkedIn. Verify with the employer before applying."

path = ROOT / "data" / "jobs-data.js"
text = path.read_text(encoding="utf-8")
if f'id: "{item["id"]}"' not in text:
    path.write_text(text.replace("var JOBS = [\n", "var JOBS = [\n" + mod.render_job(item) + ",\n", 1), encoding="utf-8")
    print("Added Cliniqon QA Engineer")
