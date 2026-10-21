#!/usr/bin/env python3
"""Add Accenture openings in Kochi and Thiruvananthapuram — 21 Oct 2026.

Source: https://www.accenture.com/in-en/careers/jobsearch
India-wide search is capped around 10,000 roles. This import keeps Kerala
locations from that search and skips requisitions already in jobs-data.js.
New roles are pinned after the current pinned posters.
"""

from __future__ import annotations

import importlib.util
import json
import re
import subprocess
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

NOTE = mod.NOTE
CAREERS = "https://www.accenture.com/in-en/careers"
SEARCH = f"{CAREERS}/jobsearch"
API = "https://www.accenture.com/api/accenture/elastic/findjobs"
KERALA = ("Kochi", "Thiruvananthapuram")
TAG_RE = re.compile(r"<[^>]+>")
LI_RE = re.compile(r"<li[^>]*>(.*?)</li>", re.I | re.S)
WS_RE = re.compile(r"\s+")
REQ_RE = re.compile(r"(?:AIOC-S\d+|R\d{5,})")
PIN_RE = re.compile(r"pinOrder:\s*(\d+)")


def clean(value: str) -> str:
    text = unescape(TAG_RE.sub(" ", value or ""))
    text = text.replace("\xa0", " ")
    return WS_RE.sub(" ", text).strip()


def sentences(text: str, limit: int) -> list[str]:
    body = clean(text)
    for cut in ("About Accenture", "What would you do?", "Visit us at"):
        idx = body.find(cut)
        if idx > 80:
            body = body[:idx].strip()
    parts = [p.strip(" .") for p in re.split(r"(?<=[.])\s+", body) if len(p.strip()) > 40]
    out = []
    for part in parts:
        if len(out) >= limit:
            break
        out.append(part[:240].rstrip() + ("." if not part.endswith(".") else ""))
    return out


def requirements_from(job: dict, years: str) -> list[str]:
    items = [clean(li) for li in LI_RE.findall(job.get("qualificationShort") or "")]
    items = [
        item
        for item in items
        if item
        and "do not remove" not in item.lower()
        and "about accenture" not in item.lower()
        and len(item) > 12
    ]
    out = []
    for item in items:
        if len(out) >= 8:
            break
        out.append(item[:280])
    if years:
        out.insert(0, years.replace("Experience:", "Experience:").strip())
    edu = [e for e in (job.get("education") or []) if isinstance(e, str)]
    if edu:
        out.append("Education listed: " + ", ".join(edu[:3]))
    qual = clean(job.get("qualificationClean") or "")
    if qual and len(qual) <= 80:
        out.append(qual)
    return out[:8] or ["See the Accenture posting for the full requirements"]


def experience_fields(raw: str) -> tuple[str, str]:
    match = re.search(r"(\d+)\s*[-–]\s*(\d+)", raw or "")
    if not match:
        label = clean(raw) or "See posting"
        return "both", label
    lo, hi = int(match.group(1)), int(match.group(2))
    label = f"{lo}–{hi} years"
    if lo == 0 and hi == 0:
        return "fresher", label
    if lo == 0:
        return "both", label
    return "experienced", label


def place(locations: list[str]) -> tuple[str, str, str]:
    locs = [c for c in locations if isinstance(c, str)]
    kerala = [c for c in locs if c in KERALA]
    others = [c for c in locs if c not in KERALA]
    if not others and len(kerala) == 1:
        city = kerala[0]
        slug = "kochi" if city == "Kochi" else "thiruvananthapuram"
        return f"{city}, Kerala", f"On-site · {city}", slug
    if not others:
        return (
            " · ".join(kerala) + ", Kerala",
            "On-site · " + " and ".join(kerala),
            "kerala",
        )
    if len(locs) > 5:
        joined = " and ".join(kerala) or "Kerala"
        return (
            f"India (includes {joined})",
            f"On-site · multiple India cities, including {joined}",
            "india",
        )
    shown = ", ".join(kerala + others)
    slug = "thiruvananthapuram" if "Thiruvananthapuram" in kerala else "kochi"
    return shown, f"On-site · {shown}", slug


def slugify(title: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    return slug[:72].strip("-") or "role"


def fetch_location(location: str) -> list[dict]:
    found: list[dict] = []
    start = 0
    while True:
        filt = json.dumps(
            [{"fieldName": "location.keyword", "items": [location], "multiSelect": False}]
        )
        cmd = [
            "curl", "-sS", "-A", "Mozilla/5.0", "-H", "Accept: application/json",
            "-X", "POST", API,
            "-F", f"startIndex={start}",
            "-F", "maxResultSize=50",
            "-F", "jobKeyword=",
            "-F", "jobCountry=India",
            "-F", "jobLanguage=en",
            "-F", "countrySite=in-en",
            "-F", "sortBy=1",
            "-F", "searchType=vectorSearch",
            "-F", "enableQueryBoost=true",
            "-F", "minScore=0.6",
            "-F", "getFeedbackJudgmentEnabled=true",
            "-F", "useCleanEmbedding=true",
            "-F", "score=true",
            "-F", "totalHits=true",
            "-F", "debugQuery=false",
            "-F", f"jobFilters={filt}",
        ]
        payload = json.loads(subprocess.check_output(cmd))
        batch = payload.get("data") or []
        found.extend(batch)
        start += len(batch)
        if len(batch) < 50:
            break
    return found


def build(raw: dict, pin: int) -> dict:
    req = raw["requisitionId"]
    title = clean(raw.get("title") or "Accenture role")
    locs = [c for c in (raw.get("location") or []) if isinstance(c, str)]
    location, work_mode, city_slug = place(locs)
    exp, exp_label = experience_fields(raw.get("yearsOfExperience") or "")
    posted = str(raw.get("updateDate") or "")[:10]
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", posted):
        posted = "2026-10-21"
    link = f"{CAREERS}/jobdetails?id={req}_en"
    skills = [clean(s) for s in (raw.get("workdaySkill") or raw.get("skill") or []) if clean(str(s))]
    skills = skills[:8] or ["See posting"]
    overview = clean(raw.get("jobOverview") or raw.get("staticExtractiveSummary") or "")
    if len(overview) > 400:
        overview = overview[:400].rsplit(" ", 1)[0].rstrip(" ,;:") + "…"
    duties = sentences(overview, 5) or [f"See the Accenture posting for {title}."]
    tags = []
    for skill in skills:
        if len(tags) >= 2 or len(skill) > 36:
            continue
        tags.append(skill)
    if not tags:
        tags.append("IT")
    if "Kochi" in locs:
        tags.append("Kochi")
    elif "Thiruvananthapuram" in locs:
        tags.append("Thiruvananthapuram")
    career = clean(raw.get("careerLevel") or raw.get("jobTypeDescription") or "")
    schedule = clean(raw.get("employeeType") or raw.get("jobScheduleDescription") or "Full-time")
    posted_text = clean(raw.get("postedDateText") or "")
    return {
        "id": f"accenture-{slugify(title)}-{req.lower()}-{city_slug}-oct2026",
        "pinOrder": pin,
        "company": "Accenture",
        "logo": "",
        "companyBlurb": f"Accenture · {title} · {location} · {req}",
        "location": location,
        "roles": [title],
        "experience": exp,
        "experienceRange": exp_label,
        "employmentType": schedule or "Full-time",
        "applyLink": link,
        "applyDeadline": "Rolling",
        "postedDate": posted,
        "source": "Company careers page",
        "verified": True,
        "verificationNote": NOTE,
        "tags": tags[:3],
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": CAREERS,
        "industry": "IT / Consulting",
        "companyDetails": (
            f"Accenture is hiring {title} for {location}. "
            f"{career + '. ' if career else ''}Job {req}."
        ),
        "workDetails": (overview[:420].rstrip() or f"{title} at Accenture, {location}."),
        "workStatus": schedule or "Full-time",
        "workMode": work_mode,
        "experienceYears": exp_label,
        "skills": skills,
        "requirements": requirements_from(raw, clean(raw.get("yearsOfExperience") or "")),
        "responsibilities": duties,
        "benefits": [
            "Listing transcribed from the employer's official careers page",
            "Never pay anyone for this application",
        ],
        "howToApply": (
            f"Apply on Accenture careers: {link} — Accenture does not ask candidates to pay. "
            "Report payment requests to india.fc.check@accenture.com."
        ),
        "hiringNotes": (
            f"Source: {SEARCH} · Job {req} · {posted_text or posted} · "
            + ", ".join(locs)
        ),
        "description": f"{title} at Accenture · {location} · {exp_label}.",
        "startingDate": "",
        "address": location,
    }


def main() -> None:
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    existing = set(REQ_RE.findall(text))
    pins = [int(n) for n in PIN_RE.findall(text)]
    next_pin = (max(pins) if pins else 0) + 1

    merged: dict[str, dict] = {}
    for city in KERALA:
        for job in fetch_location(city):
            rid = job["requisitionId"]
            prev = merged.get(rid)
            if prev:
                locs = list(dict.fromkeys((prev.get("location") or []) + (job.get("location") or [])))
                prev["location"] = locs
            else:
                merged[rid] = job
    fresh = [job for rid, job in merged.items() if rid not in existing]
    fresh.sort(key=lambda job: str(job.get("updateDate") or ""), reverse=True)
    records = [build(job, next_pin + i) for i, job in enumerate(fresh)]
    n = mod.insert_jobs(path, "JOBS", records)
    print(f"Accenture Kerala fetched {len(merged)}, new {len(records)}, inserted {n}, pins {next_pin}–{next_pin + max(len(records) - 1, 0)}")


if __name__ == "__main__":
    main()
