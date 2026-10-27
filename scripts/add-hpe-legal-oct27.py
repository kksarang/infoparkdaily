#!/usr/bin/env python3
"""Add HPE India Legal listings; open/closed status checked on Workday (canApply)."""

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

NOTE = mod.NOTE
POSTED = "2026-10-27"
OPEN_DEADLINE = "2026-11-10"
CATEGORY = "https://careers.hpe.com/us/en/c/legal-jobs"
CAT_NAME = "Legal"
PAGE_NAME = "legal"
UA = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Origin": "https://careers.hpe.com",
    "Referer": CATEGORY,
}


def shift_pins(text: str, by: int) -> str:
    pins = [int(n) for n in re.findall(r"pinOrder: (\d+)", text)]
    dupes = [n for n, count in Counter(pins).items() if count != 1]
    if dupes:
        raise SystemExit(f"Duplicate pinOrder values: {dupes}")

    def repl(match: re.Match[str]) -> str:
        return f"pinOrder: {int(match.group(1)) + by}"

    return re.sub(r"pinOrder: (\d+)", repl, text)


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


def workday_info(apply_url: str) -> dict:
    """careers.hpe.com detail pages show a 'filled' banner even for live reqs; Workday is authoritative."""
    path = apply_url.split("/Jobsathpe/", 1)[1].removesuffix("/apply")
    req = urllib.request.Request(
        f"https://hpe.wd5.myworkdayjobs.com/wday/cxs/hpe/Jobsathpe/{path}",
        headers={"User-Agent": UA["User-Agent"], "Accept": "application/json"},
    )
    try:
        return json.loads(urllib.request.urlopen(req, timeout=60).read().decode())["jobPostingInfo"]
    except Exception:
        return {}


def plain(desc_html: str) -> str:
    text = re.sub(r"<(br|/p|/li|/div)[^>]*>", "\n", desc_html or "", flags=re.I)
    text = html.unescape(re.sub(r"<[^>]+>", "", text)).replace("\xa0", " ")
    return re.sub(r"\n\s*\n+", "\n", re.sub(r"[ \t]+", " ", text)).strip()


def work_mode(desc: str) -> str:
    if re.search(r"Remote|Teleworker", desc[:600], re.I):
        return "Remote / teleworker · primarily work from home"
    if re.search(r"Hybrid", desc[:600], re.I):
        if "2 days" in desc[:600]:
            return "Hybrid · average 2 days/week from an HPE office"
        return "Hybrid · see official HPE posting for office days"
    if re.search(r"Onsite|On-site|On site", desc[:600], re.I):
        return "On-site · primarily from an HPE office"
    return "See official HPE posting for work mode"


def build_job(raw: dict, wd: dict) -> dict:
    req_id = str(raw["reqId"])
    title = raw["title"]
    careers = f"https://careers.hpe.com/us/en/job/{req_id}/{slugify(title)}"
    is_open = bool(wd.get("canApply"))
    apply = (wd.get("externalUrl") or raw["applyUrl"].removesuffix("/apply")) if is_open else careers
    desc = plain(wd.get("jobDescription") or "")
    teaser = (raw.get("descriptionTeaser") or "").strip()
    mode = work_mode(desc or teaser)
    skills = [s for s in (raw.get("ml_skills") or [])[:10] if isinstance(s, str)]
    portal_posted = (raw.get("postedDate") or "")[:10]
    loc = "Bengaluru, Karnataka, India"
    m = re.search(r"(\d+\s*(?:\+|-|–|to)\s*\d*\s*years?)", desc, re.I)
    exp_years = m.group(1).strip() if m else ""
    status_line = (
        f"Workday shows requisition {req_id} as open for applications ({wd.get('postedOn', 'recently posted')})."
        if is_open
        else f"The official HPE posting reports that requisition {req_id} is no longer accepting applications."
    )
    summary = desc[:1400].rsplit(" ", 1)[0] + "…" if len(desc) > 1400 else desc
    return {
        "id": f"hpe-{id_slug(title)}-{req_id}-oct2026",
        "company": "Hewlett Packard Enterprise",
        "logo": "",
        "companyBlurb": f"HPE · {title} · Bengaluru · {mode.split(' ·')[0]} · Legal"
        + ("" if is_open else " · career page reports filled"),
        "location": loc,
        "roles": [title],
        "experience": "experienced",
        "experienceRange": exp_years,
        "employmentType": "Full-time",
        "applyLink": apply,
        "applyDeadline": OPEN_DEADLINE if is_open else "2026-10-26",
        "postedDate": POSTED,
        "source": "Direct",
        "verified": True,
        "verificationNote": NOTE,
        "tags": ["HPE", "Legal", "Bengaluru", "Hybrid", "MNC"],
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": "https://careers.hpe.com",
        "address": raw.get("location") or "Bengaluru, Karnataka, India",
        "industry": "Technology / Enterprise Computing",
        "companyDetails": f"Hewlett Packard Enterprise opening listed under {CAT_NAME} on the official HPE careers site.",
        "workDetails": f"{teaser} Work mode: {mode}. Listed under HPE {CAT_NAME} on careers.hpe.com. {status_line} "
        "Apply only through HPE's official careers / Workday portal.",
        "workStatus": "Full-time",
        "workMode": mode,
        "experienceYears": exp_years,
        "skills": skills,
        "requirements": [],
        "responsibilities": [],
        "benefits": [],
        "howToApply": f"Apply on HPE careers: {apply}",
        "hiringNotes": (
            f"HPE job ID {req_id} · Category {CAT_NAME} · Portal posted {portal_posted or 'unknown'} · "
            f"Added {POSTED}. {'Open on Workday' if is_open else 'Official posting reports filled'}. Source: {CATEGORY}"
        ),
        "description": summary or teaser or f"HPE {title} — {loc}.",
        "startingDate": "",
        "qualification": "",
        "officialLinks": {"hpeCategory": CATEGORY, "hpeJob": careers},
        "_open": is_open,
    }


def main() -> None:
    raw_jobs = fetch_india_jobs()
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    built = []
    for raw in raw_jobs:
        job = build_job(raw, workday_info(raw.get("applyUrl") or ""))
        rid = str(raw["reqId"])
        if f'id: "{job["id"]}"' in text or f"job/{rid}/" in text or f"-{rid}-oct2026" in text:
            print(f"skip existing {rid} {raw.get('title')}")
            continue
        built.append(job)
    if not built:
        print(f"No new HPE Legal India jobs (portal had {len(raw_jobs)})")
        return
    built.sort(key=lambda j: not j["_open"])
    open_jobs = [j for j in built if j["_open"]]
    for i, job in enumerate(open_jobs, start=1):
        job["pinOrder"] = i
    if open_jobs:
        text = shift_pins(text, len(open_jobs))
    for job in built:
        job.pop("_open")
    block = ",\n".join(mod.render_job(item) for item in built) + ",\n"
    needle = "var JOBS = [\n"
    if needle not in text:
        raise SystemExit("JOBS array not found")
    path.write_text(text.replace(needle, needle + block, 1), encoding="utf-8")
    print(f"Added {len(built)} HPE Legal India jobs ({len(open_jobs)} open, pinned)")
    for job in built:
        print(" -", job["id"], job["applyDeadline"])


if __name__ == "__main__":
    main()
