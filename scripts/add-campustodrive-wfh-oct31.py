#!/usr/bin/env python3
"""Remote jobs seen on CampusToDrive, 31 Oct 2026. Details taken from each employer's own page."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("posters29", ROOT / "scripts" / "add-whatsapp-jobs-oct29.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
mod = base.mod


def job(slug: str, *args, **kw) -> dict:
    item = base.job(slug, *args, source="Company careers page", **kw)
    item["id"] = f"{slug}-oct31"
    item["postedDate"] = "2026-10-31"
    item["address"] = ""
    item["hiringNotes"] = "Added 31 Oct 2026 from the employer's careers page. Verify on that page before applying."
    return item


JOBS = [
    job(
        "portcast-data-analyst-intern-remote",
        "Portcast",
        "Data Analyst Intern",
        "Remote · Bangalore, Chennai, Delhi, Hyderabad, Kolkata, Mumbai",
        experience="fresher",
        experience_range="Final-year students / recent graduates",
        apply_link="https://jobs.lever.co/portcast/f18cc64e-c34a-416c-b213-62a39906260e",
        employment_type="Internship",
        work_mode="Remote",
        tags=["Internship", "Remote", "Data Analyst", "Python", "SQL"],
        work_details="Remote Data Analyst Intern in Portcast's Data Science department. Portcast is a Singapore-based logistics technology startup building a real-time transportation visibility platform.",
        requirements=[
            "Final-year student or recent graduate in Computer Science, Data Analytics, Data Science, Engineering, Information Technology, Statistics or a related field",
            "Working knowledge of Python and SQL",
            "Prior internship experience in a Data Analyst or Business Analyst role, preferably in a product-based startup",
        ],
        responsibilities=[
            "Check ingested and system-generated data for anomalies and gaps, and trace them to the source",
            "Help build and run QA checks, report generation and automations using Python and SQL",
            "Assist the Data Analysts on customer data queries and dashboard upkeep",
            "Support new data-source integrations",
            "Document what you build and find",
        ],
        website="https://jobs.lever.co/portcast",
        how="Apply on Portcast's careers page.",
    ),
    job(
        "persona-virtual-assistant-remote",
        "Persona",
        "Virtual Assistant",
        "Remote (Worldwide)",
        experience="fresher",
        experience_range="No prior work experience required",
        apply_link="https://apply.personatalent.com/j/virtual-assistant-YkqDNQ2lep",
        employment_type="Full-time",
        work_mode="Remote · U.S. business hours (PT, CT or ET)",
        tags=["Remote", "Virtual Assistant", "Freshers", "Admin"],
        work_details="Persona, a recruiting and staffing company, is hiring a Virtual Assistant to support one client company in a full-time, long-term remote role.",
        requirements=[
            "Fully fluent in English",
            "Skilled in modern productivity apps",
            "Strong written communication and detail orientation",
            "Able to commit long-term and full-time",
            "Able to work U.S. business hours (PT, CT or ET)",
            "Preferred: Associate's or Bachelor's degree in any field",
        ],
        responsibilities=[
            "Draft, send and triage business emails",
            "Take video conferences and distribute notes and action items",
            "Manage calendars and schedule meetings across time zones",
            "Conduct online research and assemble findings into spreadsheets",
            "Prepare basic reports, decks and analyses",
        ],
        website="https://apply.personatalent.com/j/virtual-assistant-YkqDNQ2lep",
        how="Apply on Persona's application page.",
    ),
    job(
        "bicsom-web-developer-fresher",
        "BiCSoM Technologies Private Limited",
        "Web Developer – Fresher",
        "Bengaluru and Remote",
        experience="fresher",
        experience_range="Fresher",
        apply_link="https://bicsom.co/jobs/web-developer-fresher/",
        employment_type="Full-time",
        work_mode="Bengaluru city and Remote · 6 days a week",
        tags=["Freshers", "Remote", "WordPress", "PHP", "Web Developer"],
        work_details="Web Developer – Fresher in BiCSoM's WordPress development team, building responsive websites. Work location: Bengaluru city and Remote. Working days: 6 days a week.",
        requirements=[
            "Bachelor's degree in Engineering or Diploma in Web development or related field, or relevant experience",
            "Proficient in WordPress, PHP, JavaScript, HTML, CSS, Bootstrap, jQuery, Ajax and ES6",
            "Understanding of SOLID principles and programming web applications",
        ],
        responsibilities=[
            "Develop and maintain responsive websites on WordPress and other web technologies",
            "Use WordPress styling frameworks like Elementor and WPBakery",
            "Unit test website code and maintain web coding standards",
            "Correct feature problems shared through customer feedback",
        ],
        qualification="Bachelor's degree in Engineering or Diploma in Web development",
        website="https://bicsom.co/jobs/web-developer-fresher/",
        how="Apply on BiCSoM's job page.",
    ),
]


def main() -> None:
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    fresh = [item for item in JOBS if f'id: "{item["id"]}"' not in text]
    if fresh:
        block = ",\n".join(mod.render_job(item) for item in fresh) + ",\n"
        path.write_text(text.replace("var JOBS = [\n", "var JOBS = [\n" + block, 1), encoding="utf-8")
    print(f"Added {len(fresh)} jobs")


if __name__ == "__main__":
    main()
