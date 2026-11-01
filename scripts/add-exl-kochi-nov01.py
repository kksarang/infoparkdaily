#!/usr/bin/env python3
"""Add unlisted EXL Kochi openings posted since 1 Sep 2026 (Oracle Recruiting site CX_2).

Text comes from each EXL posting. Generic titles get the function named in the
posting in brackets. Only October postings are pinned.
"""

from __future__ import annotations

import html
import importlib.util
import json
import re
import urllib.request
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

SITE = "https://fa-ewjt-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_2"
API = "https://fa-ewjt-saasfaprod1.fa.ocs.oraclecloud.com/hcmRestApi/resources/latest/recruitingCEJobRequisitionDetails"
SEARCH = f"{SITE}/jobs?lastSelectedFacet=LOCATIONS&locationId=300000000467203&selectedLocationsFacet=100001217567073"

SPECS = [
    ("21975", "Executive (Accounts Payable)", ["Accounts Payable", "Finance"]),
    ("22131", "Senior Executive - P2P", ["Accounts Payable", "Procure to Pay", "Finance"]),
    ("22132", "Assistant Manager (P&L Analysis)", ["Finance", "P&L"]),
    ("20948", "Senior Executive (Invoice to Pay)", ["Accounts Payable", "Finance"]),
    ("15686", "Senior Executive - P2P - Payment Processing", ["Accounts Payable", "Procure to Pay", "Finance"]),
    ("19303", "Assistant Manager - Claims", ["US Healthcare", "Claims", "Leadership"]),
    ("19261", "Assistant Manager (Accounts Receivable)", ["Accounts Receivable", "Collections", "Finance"]),
    ("11954", "Lead Assistant Manager (Lease & Fixed Asset Accounting)", ["General Ledger", "Lease Accounting", "Finance"]),
    ("19875", "Lead Assistant Manager (Accounts Payable)", ["Accounts Payable", "Finance", "Leadership"]),
    ("19887", "Analyst (Procure to Pay)", ["Accounts Payable", "Procure to Pay", "Finance"]),
    ("19889", "Analyst (Insurance Cash Application)", ["Insurance", "Cash Application", "Finance"]),
    ("19892", "Lead Assistant Manager (Accounts Payable - T&E)", ["Accounts Payable", "Finance", "Leadership"]),
    ("19872", "Assistant Manager (Accounts Payable)", ["Accounts Payable", "Finance", "Work From Home"]),
    ("19890", "Assistant Manager (Insurance Collections & AR)", ["Insurance", "Accounts Receivable", "Collections"]),
    ("19888", "Senior Manager (Procure to Pay)", ["Procure to Pay", "Finance", "Leadership"]),
    ("18687", "S2P Portuguese Language Specialist", ["Portuguese", "Accounts Payable", "Finance"]),
]
SKIP_LINE = re.compile(r"^(key accountabilities|essential functions|eligibility criteria.*)\s*:?$", re.I)
# Posting states different years per grade, or a minimum the pattern shortens.
YEARS_OVERRIDE = {"19875": "6-8 years", "19303": "5+ years"}
# The only posting that does not ask for prior experience.
OPEN_LEVEL = {"21975"}
EXP = re.compile(r"(\d+(?:\.\d+)?\s*(?:-|–|to)\s*\d+(?:\.\d+)?\s*years?|(?:minimum\s+)?\d+\+?\s*years?)", re.I)


def bullets(fragment: str, limit: int = 10) -> list[str]:
    text = re.sub(r"</?(p|li|br|ul|ol|div)[^>]*>", "\n", fragment or "", flags=re.I)
    text = html.unescape(re.sub(r"<[^>]+>", " ", text)).replace("\xa0", " ")
    out = []
    for line in text.split("\n"):
        line = re.sub(r"\s+", " ", line).strip(" •·-\t").rstrip(".").strip()
        if len(line) > 3 and not SKIP_LINE.match(line) and line not in out:
            out.append(line)
    return out[:limit]


def fetch(req_id: str) -> dict:
    url = f'{API}?expand=all&onlyData=true&finder=ById;Id=%22{req_id}%22,siteNumber=CX_2'
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0", "Accept": "application/json"})
    return json.load(urllib.request.urlopen(request, timeout=40))["items"][0]


def build(req_id: str, title: str, tags: list[str]) -> dict:
    d = fetch(req_id)
    link = f"{SITE}/job/{req_id}"
    resp_raw = bullets(d.get("ExternalResponsibilitiesStr"), 40)
    desc_raw = bullets(d.get("ExternalDescriptionStr"), 40)
    qual_raw = bullets(d.get("ExternalQualificationsStr"), 40)
    match = EXP.search(" ".join(qual_raw + desc_raw))
    years = re.sub(r"^minimum\s+", "", match.group(1), flags=re.I) if match else ""
    years = YEARS_OVERRIDE.get(req_id, years)
    mode = {"Hybrid": "Hybrid · Kochi", "Work From Office": "Work from office · Kochi", "Work From Home": "Work from home · Kochi"}[d["WorkplaceType"]]
    summary = f"{title} at EXL Kochi. {d.get('Category', '')} · {d.get('Function') or d.get('JobFunction') or ''}. {mode}.".replace(" · .", ".")
    return {
        "id": f"exl-{re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')[:60].rstrip('-')}-{req_id}-kochi-nov2026",
        "company": "EXL",
        "logo": "",
        "companyBlurb": f"EXL · {title} · Kochi" + (f" · {years}" if years else ""),
        "location": "Kochi, Kerala",
        "roles": [title],
        "experience": "both" if req_id in OPEN_LEVEL else "experienced",
        "experienceRange": years,
        "employmentType": "",
        "applyLink": link,
        "applyDeadline": "",
        "postedDate": d["ExternalPostedStartDate"][:10],
        "source": "Company careers page",
        "verified": True,
        "verificationNote": mod.NOTE,
        "tags": ["EXL", "Kochi"] + tags,
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": SITE + "/jobs",
        "address": "Kochi, Kerala",
        "industry": "",
        "companyDetails": "EXL opening listed on EXL's official careers site.",
        "workDetails": f"{summary} EXL requisition {req_id}.",
        "workStatus": "",
        "workMode": mode,
        "experienceYears": years,
        "skills": [],
        "requirements": qual_raw[:10],
        "responsibilities": (resp_raw or desc_raw)[:10],
        "benefits": [],
        "howToApply": f"Apply on EXL careers: {link}",
        "hiringNotes": f"Checked on EXL careers (Kochi) on 1 Nov 2026 · Requisition {req_id} · Portal posted {d['ExternalPostedStartDate'][:10]}.",
        "description": summary,
        "startingDate": "",
        "qualification": "",
        "officialLinks": {"exlJob": link, "exlKochiSearch": SEARCH},
    }


def main() -> None:
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    fresh = [build(*spec_) for spec_ in SPECS if f'/CX_2/job/{spec_[0]}"' not in text]
    if not fresh:
        print("No new EXL jobs")
        return
    pinned = [job for job in fresh if job["postedDate"] >= "2026-10-01"]
    for i, job in enumerate(pinned, start=1):
        job["pinOrder"] = i
    pins = [int(n) for n in re.findall(r"pinOrder: (\d+)", text)]
    dupes = [n for n, count in Counter(pins).items() if count != 1]
    if dupes:
        raise SystemExit(f"Duplicate pinOrder values: {dupes}")
    text = re.sub(r"pinOrder: (\d+)", lambda m: f"pinOrder: {int(m.group(1)) + len(pinned)}", text)
    block = ",\n".join(mod.render_job(item) for item in fresh) + ",\n"
    path.write_text(text.replace("var JOBS = [\n", "var JOBS = [\n" + block, 1), encoding="utf-8")
    print(f"Added {len(fresh)} EXL Kochi jobs ({len(pinned)} pinned)")


if __name__ == "__main__":
    main()
