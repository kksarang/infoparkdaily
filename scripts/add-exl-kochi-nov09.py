#!/usr/bin/env python3
"""Add EXL Kochi openings posted since 23 Sep 2026 that weren't listed yet (checked 9 Nov 2026).

Reuses the 1 Nov 2026 EXL builder: text comes from each EXL posting, generic titles get the
function named in the posting in brackets. Older pipeline postings (EXL-xx-… codes from
2024–2025) are left out, as in earlier EXL imports.
"""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("exl_nov01", ROOT / "scripts" / "add-exl-kochi-nov01.py")
exl = importlib.util.module_from_spec(spec)
spec.loader.exec_module(exl)

exl.SPECS = [
    ("22350", "Senior Executive (Order to Cash - Cash Application)", ["Accounts Receivable", "Cash Application", "Finance"]),
    ("21866", "Assistant Manager (Accounts Payable)", ["Accounts Payable", "Finance"]),
    ("21684", "Senior Executive (Invoice Processing - P2P)", ["Accounts Payable", "Procure to Pay", "Finance"]),
    ("20096", "Associate (Accounts Payable)", ["Accounts Payable", "Finance", "Freshers"]),
]
exl.OPEN_LEVEL = {"20096"}  # asks for 0-1 year of experience
exl.YEARS_OVERRIDE = {"21866": "4-6 years", "21684": "2+ years", "20096": "0-1 year", "22350": "2-5 years"}

_build = exl.build


def build(req_id, title, tags):
    job = _build(req_id, title, tags)
    job["id"] = job["id"].replace("-kochi-nov2026", "-kochi-nov09-2026")
    job["hiringNotes"] = job["hiringNotes"].replace("1 Nov 2026", "9 Nov 2026")
    return job


exl.build = build
# This batch's postings also use these section headings inside their lists.
exl.SKIP_LINE = __import__("re").compile(
    r"^(key accountabilities|essential functions|eligibility criteria.*|brief job description|technical skill requirements|competencies required)\s*:?$", __import__("re").I
)

if __name__ == "__main__":
    exl.main()
