#!/usr/bin/env python3
"""Add KPMG Kochi openings from KPMG's Oracle Recruiting site (CX_3) — 10 Nov 2026, pinned at the top.

Source: https://ejgk.fa.em2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_3/jobs (Kochi, 25 mi)
Requisitions with identical text are merged into one listing that lists every apply link.
Only details printed on the KPMG posting are used. Pass --dry-run to print without writing.
"""

from __future__ import annotations

import html
import importlib.util
import json
import re
import sys
import time
import urllib.request
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py")
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

HOST = "https://ejgk.fa.em2.oraclecloud.com"
SITE = f"{HOST}/hcmUI/CandidateExperience/en/sites/CX_3"
SEARCH = f"{SITE}/jobs?location=Kochi%2C+Kerala%2C+India&locationId=300002240961870&locationLevel=city&mode=location&radius=25&radiusUnit=MI"
LIST_API = (f"{HOST}/hcmRestApi/resources/latest/recruitingCEJobRequisitions?onlyData=true&expand=requisitionList"
            "&finder=findReqs;siteNumber=CX_3,limit=200,locationId=300002240961870,radius=25,radiusUnit=MI,sortBy=POSTING_DATES_DESC")
DETAIL_API = f"{HOST}/hcmRestApi/resources/latest/recruitingCEJobRequisitionDetails?expand=all&onlyData=true&finder=ById;Id=%22{{id}}%22,siteNumber=CX_3"
CHECKED = "10 Nov 2026"

# Readable titles and tags per role (keyed by the posting's own title).
ROLES = {
    "Associate 1 - FTE_AM HF&PE_Kochi": ("Associate 1 – US Tax Compliance (HF&PE)", "both", ["US Tax", "Tax Compliance", "Accounting"]),
    "Strategic Corp_Associate 2_Kochi": ("Associate 2 – US Tax Compliance (Strategic Corporate)", "both", ["US Tax", "Tax Compliance", "Accounting"]),
    "Strategic Corp - Senior Associate - Kochi": ("Senior Associate – US Tax Compliance (Strategic Corporate)", "experienced", ["US Tax", "Tax Compliance", "Alteryx"]),
    "GTA - Manager - Kochi (3 of 3)": ("Manager – IT Audit (GTA: SOX, SOC 1/SOC 2)", "experienced", ["IT Audit", "SOX", "SOC 2"]),
    "Consultant": ("Consultant – Indirect Tax Technology (SAP/Oracle, Vertex/ONESOURCE)", "experienced", ["Indirect Tax", "SAP", "Vertex"]),
}
WORKMODE = {  # stated in the posting text
    "Consultant": "On-site · Kochi · 11:30 AM–8 PM (supports US & EU)",
}
EXPERIENCE = {  # stated in the posting text
    "Strategic Corp - Senior Associate - Kochi": "2–3 years",
    "GTA - Manager - Kochi (3 of 3)": "6–10 years",
    "Consultant": "5–12 years",
}

REQ_HEAD = re.compile(r"^(experience\s*&\s*qualifications|this role is for you|educational qualifications|work experience|preferred technical|federal\s*(and\s*state\s*)?tax|education qualification)", re.I)
DUTY_HEAD = re.compile(r"^(roles?\s*&\s*responsibilities|managing engagements|managing people)", re.I)
SKIP_HEAD = re.compile(r"^(job details|state and local tax|international tax|federal tax)$", re.I)


def get_json(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": "InfoparkDaily job import", "Accept": "application/json"})
    for attempt in range(4):  # the Oracle API sometimes drops a connection
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except OSError:
            if attempt == 3:
                raise
            time.sleep(2 * (attempt + 1))
    return {}


def lines_of(fragment: str) -> list[str]:
    s = re.sub(r"<li[^>]*>", "\n", fragment or "")
    s = re.sub(r"<(br|/p|/li|/ul|/h\d|p|/div)[^>]*>", "\n", s)
    s = html.unescape(re.sub(r"<[^>]+>", "", s)).replace("\xa0", " ")
    out = []
    for line in s.split("\n"):
        line = re.sub(r"\s+", " ", line).strip(" •—-–:\t")
        if line:
            out.append(line)
    return out


def split(lines: list[str]) -> tuple[list[str], list[str]]:
    duties, reqs, bucket = [], [], None
    for line in lines:
        if SKIP_HEAD.match(line):
            bucket = None if line.lower() == "job details" else bucket
            continue
        if DUTY_HEAD.match(line):
            bucket = duties
            continue
        if REQ_HEAD.match(line):
            bucket = reqs
            m = re.match(r"^(education qualification|work experience)\s*:?\s*(.+)$", line, re.I)
            if m and len(m.group(2)) > 3:
                reqs.append(f"{m.group(1).capitalize()}: {m.group(2)}")
            continue
        if bucket is None or len(line) < 12 or line.endswith(":") and len(line) < 40:
            continue
        if line not in bucket:
            bucket.append(line)
    return duties[:14], reqs[:14]


def main() -> None:
    dry = "--dry-run" in sys.argv
    rows = get_json(LIST_API)["items"][0]["requisitionList"]
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    groups: dict[tuple, list] = {}
    for r in rows:
        if f"/CX_3/job/{r['Id']}" in text:
            continue
        d = get_json(DETAIL_API.format(id=r["Id"]))["items"][0]
        body = "\n".join(d.get(k) or "" for k in ("ExternalDescriptionStr", "ExternalQualificationsStr", "ExternalResponsibilitiesStr"))
        groups.setdefault((d["Title"], re.sub(r"\s+", " ", body)), []).append(d)
    jobs = []
    for (title, _), ds in groups.items():
        ds.sort(key=lambda d: d.get("ExternalPostedStartDate") or "", reverse=True)
        name, level, tags = ROLES.get(title, (title, "both", ["KPMG"]))
        ids = [d["Id"] for d in ds]
        links = [f"{SITE}/job/{i}" for i in ids]
        d0 = ds[0]
        duties, reqs = split(lines_of(d0.get("ExternalDescriptionStr")) + lines_of(d0.get("ExternalQualificationsStr")) + lines_of(d0.get("ExternalResponsibilitiesStr")))
        ends = sorted(e[:10] for e in (d.get("ExternalPostedEndDate") for d in ds) if e)
        posted = min((d.get("ExternalPostedStartDate") or "")[:10] for d in ds)
        exp = EXPERIENCE.get(title, "")
        count = f"{len(ids)} openings" if len(ids) > 1 else "1 opening"
        how = f"Apply on KPMG careers: {links[0]}"
        if links[1:]:
            how += ". Same role, other requisitions: " + " , ".join(links[1:])
        note = f"Checked on KPMG careers (Kochi) on {CHECKED} · Requisition{'s' if len(ids) > 1 else ''} {', '.join(ids)} · Posted {posted}"
        if ends and len(ends) == len(ds):
            note += f" · Posting closes {ends[-1]}" + (" (12:00 PM IST)" if ends[-1] == "2026-11-10" else "")
        elif ends:
            note += f" · {len(ends)} of {len(ds)} requisitions close {ends[-1]}; the other has no closing date"
        jobs.append({
            "id": f"kpmg-{re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')[:60].rstrip('-')}-kochi-{ids[0]}",
            "company": "KPMG in India",
            "logo": "",
            "companyBlurb": f"KPMG · {name} · Kochi · {exp or 'experience not stated'} · {count}",
            "location": "Kochi, Kerala",
            "roles": [name],
            "experience": level,
            "experienceRange": exp,
            "employmentType": "Full-time",
            "applyLink": links[0],
            "applyDeadline": ends[-1] if ends and len(ends) == len(ds) else "",
            "postedDate": posted,
            "source": "Company careers page",
            "verified": True,
            "verificationNote": mod.NOTE,
            "tags": tags,
            "isWalkIn": False, "walkInDate": "", "email": "", "phone": "",
            "website": SITE,
            "address": "Kochi, Kerala",
            "industry": "Professional Services / Tax & Advisory",
            "companyDetails": "KPMG in India — tax, audit and advisory services. Opening listed on KPMG's official careers site for Kochi.",
            "workDetails": f"{name} at KPMG, Kochi. {count} on KPMG careers. {duties[0] if duties else ''}".strip(),
            "workStatus": "Full-time",
            "workMode": WORKMODE.get(title, "On-site · Kochi"),
            "experienceYears": exp,
            "skills": [],
            "requirements": reqs,
            "responsibilities": duties,
            "benefits": [],
            "howToApply": how + ". KPMG does not charge candidates any fee.",
            "hiringNotes": note + ".",
            "description": f"{name} at KPMG · Kochi · {count}.",
            "startingDate": "",
            "officialLinks": {"kpmgJob": links[0], "kpmgKochiSearch": SEARCH},
        })
    if dry:
        for j in jobs:
            print(json.dumps(j, indent=1, ensure_ascii=False))
        return
    if not jobs:
        print("No new KPMG Kochi jobs")
        return
    pins = [int(n) for n in re.findall(r"pinOrder: (\d+)", text)]
    if [n for n, c in Counter(pins).items() if c != 1]:
        raise SystemExit("Duplicate pinOrder values")
    for i, j in enumerate(jobs, start=1):
        j["pinOrder"] = i
    text = re.sub(r"pinOrder: (\d+)", lambda m: f"pinOrder: {int(m.group(1)) + len(jobs)}", text)
    block = ",\n".join(mod.render_job(j) for j in jobs) + ",\n"
    path.write_text(text.replace("var JOBS = [\n", "var JOBS = [\n" + block, 1), encoding="utf-8")
    print(f"Added {len(jobs)} KPMG Kochi listings covering {sum(len(v) for v in groups.values())} requisitions (pinned)")
    for j in jobs:
        print(" -", j["roles"][0], "|", j["experienceRange"] or "-", "|", j["applyDeadline"] or "no closing date")


if __name__ == "__main__":
    main()
