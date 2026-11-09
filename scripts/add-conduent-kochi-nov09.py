#!/usr/bin/env python3
"""Conduent Kochi openings found on 9 Nov 2026 (careers.conduent.com, city filter Kochi).

- Three postings with new text become new entries (pinned at the top).
- New Job IDs whose posting text matches an existing entry are merged into that entry:
  opening count, Job ID list and other apply links are updated, and postedDate moves to the
  newest portal date. Nothing else in the entry changes.
Details are taken only from the posting text; unknown fields stay empty.
"""

from __future__ import annotations

import importlib.util
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("conduent27", ROOT / "scripts" / "add-conduent-kochi-oct27.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
mod = base.mod
base.POSTED = "2026-11-09"
JOB_URL = base.JOB_URL

NEW = [
    {
        "ids": ["26574"],
        "title": "Manager, Accounting Services",
        "experience": "experienced",
        "experienceRange": "8–12 years (service delivery operations with PTP team management)",
        "portalPosted": "9 Nov 2026",
        "qualification": "Bachelor's / master's degree in Commerce, Finance, Accounting or Business Administration",
        "tags": ["Accounting", "Procure to Pay", "Manager"],
        "summary": "Manager for end-to-end Procure-to-Pay (PTP) operations covering invoice processing, vendor management, payments, T&E and helpdesk, in a global shared services environment.",
        "skills": ["PTP", "SAP", "Oracle", "Coupa", "Ariba", "Team management", "Stakeholder management"],
        "requirements": [
            "Bachelor's / master's degree in Commerce, Finance, Accounting or Business Administration",
            "8–12 years of experience in service delivery operations with PTP team management experience",
            "Proven experience managing teams in a global shared services environment",
            "Hands-on experience with ERP platforms such as SAP, Oracle, Coupa or Ariba",
            "Strong analytical, stakeholder management and leadership skills",
        ],
        "responsibilities": [
            "Manage end-to-end PTP operations including invoice processing, vendor management, payments, T&E and helpdesk activities",
            "Ensure achievement of SLAs, KPIs, productivity, quality and compliance targets",
            "Identify process improvement and automation opportunities to enhance efficiency",
            "Lead, mentor and develop teams while driving a performance-based culture",
            "Manage client relationships and participate in operational review meetings",
        ],
    },
    {
        "ids": ["26965"],
        "title": "Director, Accounting Services",
        "location": "Bangalore, Kochi (India)",
        "experience": "experienced",
        "experienceRange": "12+ years in BPO / F&A services, including 5+ years at senior leadership or director level",
        "portalPosted": "6 Nov 2026",
        "workMode": "On-site · Bangalore or Kochi (UK hours)",
        "tags": ["Accounting", "Director", "BPO"],
        "summary": "Director leading global, multi-tower Finance & Accounting operations of 500+ FTEs, driving digital transformation (automation, AI, analytics, SAP modernisation), financial governance and client partnerships. Must be available to work UK hours.",
        "skills": ["F&A operations", "Multi-tower delivery", "Digital transformation", "SAP", "RFP / RFQ", "P&L management"],
        "requirements": [
            "12+ years in BPO operations and Finance & Accounting services (automotive domain an added advantage)",
            "5+ years in senior leadership or director-level roles leading global operations of 500+ FTEs",
            "Strong experience in multi-tower delivery, governance, contract negotiations and operational excellence",
            "Deep expertise in digital transformation, automation, AI, analytics and ERP/platform modernisation (SAP)",
            "Strong commercial acumen with a track record managing RFPs, RFQs, budgets, revenue and profitability",
            "Available to work in UK hours",
        ],
        "responsibilities": [
            "Lead global, multi-tower operations for 500+ FTEs, driving strategic execution, performance stability and resource optimisation",
            "Spearhead digital transformation initiatives including automation, AI, analytics and ERP modernisation",
            "Manage end-to-end financial governance, profitability and executive-level client partnerships",
            "Build organisational capability by developing leaders and strengthening succession pipelines",
            "Ensure optimal staffing and lead recruitment and training strategies",
            "Work with leadership to develop and implement strategy to achieve departmental objectives",
            "Support business development and represent the team in leadership and client meetings",
        ],
    },
    {
        "ids": ["27131"],
        "title": "Accounting Services Associate II",
        "experience": "experienced",
        "experienceRange": "2–4 years (Accounts Payable / P2P)",
        "portalPosted": "6 Nov 2026",
        "qualification": "Bachelor's degree in Commerce, Accounting, Finance or a related discipline (preferred)",
        "tags": ["Accounting", "Accounts Payable", "SAP"],
        "summary": "Accounts Payable (AP) associate for invoice processing, 2-way and 3-way matching, PO and non-PO invoices, exception handling, vendor queries, reconciliations and other Procure-to-Pay activities. Hands-on SAP experience is mandatory.",
        "skills": ["SAP", "Accounts Payable", "P2P", "Invoice matching", "Vendor reconciliation", "MS Excel"],
        "requirements": [
            "2 to 4 years of relevant experience in Accounts Payable / P2P",
            "Hands-on experience in SAP is mandatory",
            "Good knowledge of invoice processing, PO/non-PO invoices, 2-way/3-way matching, vendor reconciliation and payment processes",
            "Good understanding of accounting principles and Accounts Payable processes",
            "Proficiency in MS Excel and Microsoft Office",
            "Strong analytical, problem-solving and communication skills",
            "Ability to work effectively in an SLA-driven environment",
            "Bachelor's degree in Commerce, Accounting, Finance or a related discipline preferred",
        ],
        "responsibilities": [
            "Process supplier invoices accurately within defined timelines and SLAs",
            "Perform invoice validation and 2-way and 3-way matching",
            "Process PO and non-PO invoices",
            "Investigate and resolve invoice discrepancies, exceptions and processing blocks",
            "Handle vendor and internal stakeholder queries related to invoices and payments",
            "Perform vendor account reconciliations and follow up on open items",
            "Support month-end closing and AP reporting activities",
            "Ensure compliance with internal controls, accounting policies and SOPs",
            "Support process improvement and automation initiatives",
        ],
    },
]

# existing entry id -> (new Job IDs with identical posting text, newest portal posted date)
MERGE = {
    "conduent-kochi-accounting-services-associate-i-26592-oct2026": (["27068", "27163"], "2026-11-09"),
    "conduent-kochi-supervisor-accounting-services-26158-oct2026": (["26407", "26408", "26558"], "2026-11-05"),
    "conduent-kochi-accounting-services-associate-iii-26557-oct2026": (["27011"], "2026-11-04"),
    "conduent-kochi-accounting-services-associate-iv-25724-oct2026": (["27013", "27100"], "2026-11-04"),
    "conduent-kochi-accounting-services-associate-ii-26684-oct2026": (["27101", "26986"], "2026-11-04"),
    "conduent-kochi-accounting-services-associate-i-26814-oct2026": (["27103"], "2026-11-04"),
}


def merge(text: str, entry_id: str, add: list[str], posted: str) -> tuple[str, int]:
    start = text.index(f'id: "{entry_id}"')
    end = text.index("\n  },", start)
    block = text[start:end]
    m = re.search(r"\(Job IDs? ([\d, ]+)\)", block)
    ids = [i.strip() for i in m.group(1).split(",")]
    added = [i for i in add if i not in ids]
    if not added:
        return text, 0
    ids += added
    n = len(ids)
    count = f"{n} openings"
    label = f"Job IDs {', '.join(ids)}"
    block = re.sub(r"\(Job IDs? [\d, ]+\)", f"({label})", block)
    block = re.sub(r"\b\d+ openings?\b", count, block)
    others = " , ".join(JOB_URL.format(i) for i in ids[1:])
    block = re.sub(
        r'(howToApply: "Apply on Conduent Careers: [^"]*?)(\. Other openings with the same posting: [^"]*)?"',
        lambda mm: f'{mm.group(1)}. Other openings with the same posting: {others}"',
        block,
        count=1,
    )
    block = re.sub(r'postedDate: "[^"]*"', f'postedDate: "{posted}"', block, count=1)
    block = re.sub(
        r'(hiringNotes: "[^"]*?)"',
        lambda mm: f'{mm.group(1)} Re-checked 9 Nov 2026: new openings added (Job IDs {", ".join(added)})."',
        block,
        count=1,
    )
    return text[:start] + block + text[end:], len(added)


def main() -> None:
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    merged = 0
    for entry_id, (add, posted) in MERGE.items():
        text, k = merge(text, entry_id, add, posted)
        merged += k
        print(f"merged {k} into {entry_id}")
    fresh = []
    for item in NEW:
        job = base.build(item)
        job["id"] = job["id"].replace("-oct2026", "-nov2026")
        job["hiringNotes"] = job["hiringNotes"].replace("27 Oct 2026", "9 Nov 2026")
        if f'applyLink: "{job["applyLink"]}"' not in text:
            fresh.append(job)
    for i, job in enumerate(fresh, start=1):
        job["pinOrder"] = i
        print(f"new {i:02d}. {job['roles'][0]} — {job['location']}")
    if fresh:
        text = base.shift_pins(text, len(fresh))
        block = ",\n".join(mod.render_job(item) for item in fresh) + ",\n"
        text = text.replace("var JOBS = [\n", "var JOBS = [\n" + block, 1)
    path.write_text(text, encoding="utf-8")
    print(f"Added {len(fresh)} new Conduent Kochi jobs; merged {merged} new Job IDs into existing entries")


if __name__ == "__main__":
    main()
