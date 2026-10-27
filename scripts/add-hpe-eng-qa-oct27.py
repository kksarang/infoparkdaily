#!/usr/bin/env python3
"""Add HPE India Engineering & QA listings from careers category page.

Official detail pages currently report many of these as filled; they are
added as expired reference listings (unpinned) so open-job pins stay intact.
"""

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
CATEGORY = "https://careers.hpe.com/us/en/c/engineering-qa-jobs"
UA = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Origin": "https://careers.hpe.com",
    "Referer": CATEGORY,
}

INDIA_CITIES = {
    "bengaluru",
    "bangalore",
    "hyderabad",
    "chennai",
    "pune",
    "mumbai",
    "delhi",
    "noida",
    "gurgaon",
    "gurugram",
    "kolkata",
    "kondapur",
}


def slugify(title: str) -> str:
    return re.sub(r"[^a-zA-Z0-9]+", "-", title).strip("-")[:90]


def id_slug(title: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    return s[:52].rstrip("-") or "role"


def fetch_page(frm: int, size: int = 100) -> tuple[int, list[dict]]:
    body = {
        "lang": "en_us",
        "deviceType": "desktop",
        "country": "us",
        "pageName": "engineering-qa",
        "ddoKey": "refineSearch",
        "sortBy": "",
        "subsearch": "",
        "from": frm,
        "jobs": True,
        "counts": True,
        "all_fields": ["category", "country", "state", "city", "type", "remote"],
        "size": size,
        "clearAll": False,
        "jdsource": "facets",
        "isSliderEnable": False,
        "pageId": "page2",
        "siteType": "external",
        "keywords": "",
        "global": True,
        "locationData": {},
        "selected_fields": {"category": ["Engineering & QA"], "country": ["India"]},
    }
    req = urllib.request.Request(
        "https://careers.hpe.com/widgets",
        data=json.dumps(body).encode(),
        headers=UA,
        method="POST",
    )
    payload = json.loads(urllib.request.urlopen(req, timeout=60).read().decode())
    block = payload["refineSearch"]
    return int(block.get("totalHits") or 0), (block.get("data") or {}).get("jobs") or []


def fetch_india_jobs() -> list[dict]:
    total, first = fetch_page(0, 100)
    jobs = list(first)
    for frm in range(100, total, 100):
        _, page = fetch_page(frm, 100)
        jobs.extend(page)
    seen: set[str] = set()
    uniq: list[dict] = []
    for job in jobs:
        rid = str(job.get("reqId") or "")
        if not rid or rid in seen:
            continue
        seen.add(rid)
        uniq.append(job)
    return uniq


def work_mode(raw: dict) -> str:
    first = ((raw.get("ml_job_parser") or {}).get("descriptionTeaser_first200") or "")
    if re.search(r"Hybrid", first, re.I):
        if "2 days" in first:
            return "Hybrid · average 2 days/week from an HPE office"
        return "Hybrid · see official HPE posting for office days"
    if re.search(r"Onsite|On-site|On site", first, re.I):
        return "On-site · primarily from an HPE office"
    return "See official HPE posting for work mode"


def location_for(raw: dict) -> tuple[str, str]:
    city = (raw.get("city") or "").strip()
    multi = raw.get("multi_location") or []
    india_bits = []
    for loc in multi:
        low = loc.lower()
        if any(c in low for c in INDIA_CITIES) or "india" in low or "karn" in low:
            india_bits.append(loc)
    if city.lower() in INDIA_CITIES or city.lower() == "kondapur":
        label_city = "Bengaluru" if city.lower() in {"bangalore", "bengaluru"} else city
        loc = f"{label_city}, Karnataka, India" if label_city in {"Bengaluru", "Kondapur"} else f"{label_city}, India"
        # refine common states
        if label_city == "Hyderabad":
            loc = "Hyderabad, Telangana, India"
        elif label_city == "Chennai":
            loc = "Chennai, Tamil Nadu, India"
        elif label_city == "Pune":
            loc = "Pune, Maharashtra, India"
        elif label_city == "Kolkata":
            loc = "Kolkata, West Bengal, India"
        addr = (india_bits[0] if india_bits else raw.get("location") or loc)
        return loc, addr
    if india_bits:
        # Primary city outside India but posting includes India locations
        return f"{india_bits[0]} (multi-location incl. India)", ", ".join(india_bits[:4])
    return "India", raw.get("location") or "India"


def build_job(raw: dict) -> dict:
    req_id = str(raw["reqId"])
    title = raw["title"]
    careers = f"https://careers.hpe.com/us/en/job/{req_id}/{slugify(title)}"
    teaser = (raw.get("descriptionTeaser") or "").strip()
    skills = [s for s in (raw.get("ml_skills") or [])[:10] if isinstance(s, str)]
    portal_posted = (raw.get("postedDate") or "")[:10]
    mode = work_mode(raw)
    loc, addr = location_for(raw)
    work = (
        f"{teaser} Work mode: {mode}. "
        f"Listed under HPE Engineering & QA on careers.hpe.com. "
        f"The official job detail page currently reports that this requisition ({req_id}) has been filled. "
        f"Confirm any remaining openings on careers.hpe.com before applying."
    )
    return {
        "id": f"hpe-{id_slug(title)}-{req_id}-oct2026",
        "company": "Hewlett Packard Enterprise",
        "logo": "",
        "companyBlurb": f"HPE · {title} · {loc} · Engineering & QA · career page reports filled",
        "location": loc,
        "roles": [title],
        "experience": "experienced",
        "experienceRange": "Experienced · confirm on the official HPE posting",
        "employmentType": raw.get("type") or "Full-time",
        "applyLink": careers,
        "applyDeadline": "2026-10-26",
        "postedDate": POSTED,
        "source": "Direct",
        "verified": True,
        "verificationNote": NOTE,
        "tags": ["HPE", "Engineering", "QA", "India"],
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": "https://careers.hpe.com",
        "address": addr,
        "industry": "Technology / Enterprise Computing",
        "companyDetails": "Hewlett Packard Enterprise opening listed under Engineering & QA on the official HPE careers site.",
        "workDetails": work,
        "workStatus": raw.get("type") or "Full-time",
        "workMode": mode,
        "experienceYears": "Experienced · confirm on the official HPE posting",
        "skills": skills,
        "requirements": [
            "Match education and experience on the official HPE job detail page",
            f"Confirm requisition {req_id} on HPE careers — the detail page currently reports this job as filled",
        ],
        "responsibilities": [
            "Deliver role outcomes as listed on the official HPE posting when the role is open.",
        ],
        "benefits": [
            "Apply only on HPE careers — never pay anyone for this application",
            "Official careers.hpe.com listing",
        ],
        "howToApply": f"Apply on HPE careers: {careers}",
        "hiringNotes": (
            f"HPE job ID {req_id} · Category Engineering & QA · "
            f"Portal posted {portal_posted or 'unknown'} · Added {POSTED}. "
            f"Official detail page reports filled. Source: {CATEGORY}"
        ),
        "description": teaser or f"HPE {title} — {loc}.",
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
            continue
        built.append(job)
    if not built:
        print(f"No new HPE Engineering & QA India jobs (portal had {len(raw_jobs)})")
        return
    block = ",\n".join(mod.render_job(item) for item in built) + ",\n"
    needle = "var JOBS = [\n"
    if needle not in text:
        raise SystemExit("JOBS array not found")
    path.write_text(text.replace(needle, needle + block, 1), encoding="utf-8")
    print(f"Added {len(built)} / {len(raw_jobs)} HPE Engineering & QA India jobs (unpinned, marked filled/expired)")


if __name__ == "__main__":
    main()
