#!/usr/bin/env python3
"""Add EXL Kochi openings posted 29 Oct - 5 Nov 2026 (Oracle Recruiting site CX_2).

Reuses the 1 Nov importer. Text comes from each EXL posting; generic titles get
the function named in the posting in brackets. Requisitions 22216 and 22217 are
the same Deduction Analyst posting, so they are one listing.
"""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("exl_nov01", ROOT / "scripts" / "add-exl-kochi-nov01.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)

base.SPECS = [
    ("14183", "Senior Executive (Accounts Payable)", ["Accounts Payable", "Finance"]),
    ("22077", "Lead Assistant Manager (F&A Operations)", ["Finance", "Data Analytics", "Leadership"]),
    ("22217", "Analyst (Deduction Analyst - Accounts Receivable)", ["Accounts Receivable", "Order to Cash", "Finance"]),
    ("21366", "Manager (Accounts Receivable - Insurance)", ["Accounts Receivable", "Insurance", "Leadership"]),
    ("21373", "Manager (Accounts Payable - Insurance)", ["Accounts Payable", "Insurance", "Leadership"]),
    ("21375", "Senior Manager (Record to Report - Insurance)", ["Record to Report", "Insurance", "Leadership"]),
    ("21378", "Senior Manager (Accounts Receivable - Insurance)", ["Accounts Receivable", "Insurance", "Leadership"]),
    ("21379", "Senior Manager (Accounts Payable - Insurance)", ["Accounts Payable", "Insurance", "Leadership"]),
    ("21383", "Senior Assistant Vice President (Finance Operations)", ["Finance", "Insurance", "Leadership"]),
    ("21646", "Senior Executive (Accounts Payable & Bank Reconciliation)", ["Accounts Payable", "Oracle", "Finance"]),
    ("21920", "Manager (Medical Coding Audit)", ["Medical Coding", "US Healthcare", "Leadership"]),
    ("21993", "Senior Executive (Invoice to Pay)", ["Accounts Payable", "Procure to Pay", "Finance"]),
    ("22022", "Senior Executive - Order to Cash - Cash Application", ["Cash Application", "Order to Cash", "SAP"]),
    ("22027", "Assistant Manager (Cash Application)", ["Cash Application", "Accounts Receivable", "SAP"]),
]
base.YEARS_OVERRIDE = {
    "14183": "2-4 years", "21366": "7+ years", "21373": "5+ years", "21375": "10+ years",
    "21378": "8+ years", "21379": "8+ years", "21383": "10+ years", "22217": "0-2 years",
}
base.OPEN_LEVEL = {"22217"}
DUPLICATES = {"22217": "22216"}

original_build = base.build


def build(req_id: str, title: str, tags: list[str]) -> dict:
    job = original_build(req_id, title, tags)
    job["hiringNotes"] = job["hiringNotes"].replace("on 1 Nov 2026", "on 6 Nov 2026")
    job["id"] = job["id"].replace("-kochi-nov2026", "-kochi-nov06")
    other = DUPLICATES.get(req_id)
    if other:
        link = f"{base.SITE}/job/{other}"
        job["howToApply"] += f". The same posting is also open as requisition {other}: {link}"
        job["hiringNotes"] += f" Same posting also listed as requisition {other}."
        job["officialLinks"]["exlJobDuplicate"] = link
    return job


base.build = build

if __name__ == "__main__":
    base.main()
