#!/usr/bin/env python3
"""Add HPE India Administration & Workplace listings (unpinned if filled)."""

from __future__ import annotations

import importlib.util
import json
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

NOTE = mod.NOTE
POSTED = "2026-10-27"
CATEGORY = "https://careers.hpe.com/us/en/c/administration-workplace-jobs"
CAT_NAME = "Administration & Workplace"
PAGE_NAME = "administration-workplace"
UA = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Origin": "https://careers.hpe.com",
    "Referer": CATEGORY,
}


def slugify(title: str) -> str:
    return re.sub(r"[^a-zA-Z0-9]+", "-", title).strip("-")[:90]


def id_slug(title: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    return s[:52].rstrip("-") or "role"


def fetch_india_jobs() -> list[dict]:
    body = {
        "lang": "en_us",
        "deviceType": "desktop",
        "country": "us",
        "pageName": PAGE_NAME,
        "ddoKey": "refineSearch",
        "sortBy": "",
        "subsearch": "",
        "from": 0,
        "jobs": True,
        "counts": True,
        "all_fields": ["category", "country", "state", "city", "type", "remote"],
        "size": 100,
        "clearAll": False,
        "jdsource": "facets",
        "isSliderEnable": False,
        "pageId": "page2",
        "siteType": "external",
        "keywords": "",
        "global": True,
        "locationData": {},
        "selected_fields": {"category": [CAT_NAME], "country": ["India"]},
    }
    req = urllib.request.Request(
        "https://careers.hpe.com/widgets",
        data=json.dumps(body).encode(),
        headers=UA,
        method="POST",
    )
    block = json.loads(urllib.request.urlopen(req, timeout=60).read().decode())["refineSearch"]
    jobs = (block.get("data") or {}).get("jobs") or []
    seen: set[str] = set()
    uniq = []
    for job in jobs:
        rid = str(job.get("reqId") or "")
        if not rid or rid in seen:
            continue
        seen.add(rid)
        uniq.append(job)
    return uniq


def work_mode(raw: dict) -> str:
    first = (raw.get("ml_job_parser") or {}).get("descriptionTeaser_first200") or ""
    if re.search(r"Remote|Teleworker", first, re.I):
        return "Remote / teleworker · primarily work from home"
    if re.search(r"Hybrid", first, re.I):
        if "2 days" in first:
            return "Hybrid · average 2 days/week from an HPE office"
        return "Hybrid · see official HPE posting for office days"
    if re.search(r"Onsite|On-site|On site", first, re.I):
        return "On-site · primarily from an HPE office"
    return "See official HPE posting for work mode"


def build_job(raw: dict) -> dict:
    req_id = str(raw["reqId"])
    title = raw["title"]
    careers = f"https://careers.hpe.com/us/en/job/{req_id}/{slugify(title)}"
    teaser = (raw.get("descriptionTeaser") or "").strip()
    skills = [s for s in (raw.get("ml_skills") or [])[:10] if isinstance(s, str)]
    portal_posted = (raw.get("postedDate") or "")[:10]
    mode = work_mode(raw)
    city = (raw.get("city") or "Bengaluru").strip()
    loc = "Bengaluru, Karnataka, India" if city.lower() in {"bengaluru", "bangalore"} else f"{city}, India"
    # Prefer clearer intern titles when category page uses short name
    role_title = title
    if req_id == "1211843" and title == "College Intern":
        role_title = "College Intern"
    work = (
        f"{teaser} Work mode: {mode}. "
        f"Listed under HPE {CAT_NAME} on careers.hpe.com. "
        f"The official job detail page currently reports that this requisition ({req_id}) has been filled. "
        f"Confirm any remaining openings on careers.hpe.com before applying."
    )
    return {
        "id": f"hpe-{id_slug(role_title)}-{req_id}-oct2026",
        "company": "Hewlett Packard Enterprise",
        "logo": "",
        "companyBlurb": f"HPE · {role_title} · {loc} · Administration & Workplace · career page reports filled",
        "location": loc,
        "roles": [role_title],
        "experience": "fresher",
        "experienceRange": "Students / recent graduates · confirm on the official HPE posting",
        "employmentType": "Internship" if "intern" in role_title.lower() else (raw.get("type") or "Full-time"),
        "applyLink": careers,
        "applyDeadline": "2026-10-26",
        "postedDate": POSTED,
        "source": "Direct",
        "verified": True,
        "verificationNote": NOTE,
        "tags": ["HPE", "Internship", "Bengaluru", "Remote", "Fresher"],
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": "https://careers.hpe.com",
        "address": raw.get("location") or "Bengaluru, Karnātaka, 560048, India",
        "industry": "Technology / Enterprise Computing",
        "companyDetails": f"Hewlett Packard Enterprise opening listed under {CAT_NAME} on the official HPE careers site.",
        "workDetails": work,
        "workStatus": "Internship" if "intern" in role_title.lower() else (raw.get("type") or "Full-time"),
        "workMode": mode,
        "experienceYears": "Students / recent graduates · confirm on the official HPE posting",
        "skills": skills,
        "requirements": [
            "Match education and experience on the official HPE job detail page",
            f"Confirm requisition {req_id} on HPE careers — the detail page currently reports this job as filled",
        ],
        "responsibilities": [
            "Support senior team members on technical projects as listed on the official HPE posting when open.",
            "Assist with troubleshooting and hardware / software maintenance as assigned.",
        ],
        "benefits": [
            "Apply only on HPE careers — never pay anyone for this application",
            "Official careers.hpe.com listing",
        ],
        "howToApply": f"Apply on HPE careers: {careers}",
        "hiringNotes": (
            f"HPE job ID {req_id} · Category {CAT_NAME} · "
            f"Portal posted {portal_posted or 'unknown'} · Added {POSTED}. "
            f"Official detail page reports filled. Source: {CATEGORY}"
        ),
        "description": teaser or f"HPE {role_title} — {loc}.",
        "startingDate": "",
        "qualification": "See official HPE posting for education and experience requirements",
        "officialLinks": {"hpeCategory": CATEGORY, "hpeJob": careers},
    }


def main() -> None:
    raw_jobs = fetch_india_jobs()
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    built = []
    for raw in raw_jobs:
        job = build_job(raw)
        rid = str(raw["reqId"])
        if f'id: "{job["id"]}"' in text or f"job/{rid}/" in text or f"-{rid}-oct2026" in text:
            print(f"skip existing {rid} {raw.get('title')}")
            continue
        built.append(job)
    if not built:
        print(f"No new HPE Admin & Workplace India jobs (portal had {len(raw_jobs)})")
        return
    block = ",\n".join(mod.render_job(item) for item in built) + ",\n"
    needle = "var JOBS = [\n"
    if needle not in text:
        raise SystemExit("JOBS array not found")
    path.write_text(text.replace(needle, needle + block, 1), encoding="utf-8")
    print(f"Added {len(built)} / {len(raw_jobs)} HPE Admin & Workplace India jobs")
    for job in built:
        print(" -", job["id"])


if __name__ == "__main__":
    main()
