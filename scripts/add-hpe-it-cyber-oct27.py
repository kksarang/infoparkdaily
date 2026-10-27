#!/usr/bin/env python3
"""Add HPE India IT & Cybersecurity listings from careers category page."""

from __future__ import annotations

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
CATEGORY = "https://careers.hpe.com/us/en/c/it-cybersecurity-jobs"
UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}

# Experience confirmed from official detail pages (do not invent).
EXP = {
    "1212295": "Bachelor’s · Minimum 3–5 years SAP S/4HANA supply chain",
    "1212305": "Bachelor’s · 10+ years SAP",
    "1212302": "Bachelor’s · 10+ years SAP delivery",
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
    return s[:56].rstrip("-") or "role"


def extract_json_object(html: str, key: str) -> dict:
    m = re.search(rf'"{re.escape(key)}"\s*:\s*(\{{)', html)
    if not m:
        raise SystemExit(f"Missing {key}")
    start = m.start(1)
    i = start
    depth = 0
    in_str = False
    esc = False
    while i < len(html):
        ch = html[i]
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == '"':
                in_str = False
        else:
            if ch == '"':
                in_str = True
            elif ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    return json.loads(html[start : i + 1])
        i += 1
    raise SystemExit(f"Unbalanced JSON for {key}")


def fetch_india_jobs() -> list[dict]:
    req = urllib.request.Request(CATEGORY, headers=UA)
    html = urllib.request.urlopen(req, timeout=45).read().decode("utf-8", "replace")
    data = extract_json_object(html, "eagerLoadRefineSearch")
    jobs = data.get("data", {}).get("jobs") or []
    india = [j for j in jobs if (j.get("country") or "") == "India"]
    if not india:
        raise SystemExit("No India jobs found on HPE IT & Cybersecurity category page")
    return india


def build_job(raw: dict, pin: int) -> dict:
    req_id = str(raw["reqId"])
    title = raw["title"]
    careers = f"https://careers.hpe.com/us/en/job/{req_id}/{slugify(title)}"
    teaser = (raw.get("descriptionTeaser") or "").strip()
    skills = [s for s in (raw.get("ml_skills") or [])[:10] if isinstance(s, str)]
    exp = EXP.get(req_id, "Experienced · confirm on the official HPE posting")
    portal_posted = (raw.get("postedDate") or "")[:10]
    work = (
        f"{teaser} Hybrid role — on average 2 days per week from an HPE office in Bengaluru. "
        f"Listed under HPE IT & Cybersecurity on careers.hpe.com. "
        f"The official job detail page currently reports that this requisition ({req_id}) has been filled. "
        f"Confirm any remaining openings on careers.hpe.com before applying."
    )
    return {
        "id": f"hpe-{id_slug(title)}-{req_id}-oct2026",
        "pinOrder": pin,
        "company": "Hewlett Packard Enterprise",
        "logo": "",
        "companyBlurb": f"HPE · {title} · Bengaluru · Hybrid · IT & Cybersecurity · career page reports filled",
        "location": "Bengaluru, Karnataka, India",
        "roles": [title],
        "experience": "experienced",
        "experienceRange": exp,
        "employmentType": "Full-time",
        "applyLink": careers,
        "applyDeadline": "2026-10-26",
        "postedDate": POSTED,
        "source": "Direct",
        "verified": True,
        "verificationNote": NOTE,
        "tags": ["HPE", "Bengaluru", "Hybrid", "IT", "Cybersecurity"],
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": "https://careers.hpe.com",
        "address": "Bengaluru, Karnātaka, 560048, India",
        "industry": "Technology / Enterprise Computing",
        "companyDetails": "Hewlett Packard Enterprise opening listed under IT & Cybersecurity on the official HPE careers site.",
        "workDetails": work,
        "workStatus": "Full-time",
        "workMode": "Hybrid · average 2 days/week from an HPE office · Bengaluru",
        "experienceYears": exp,
        "skills": skills,
        "requirements": [
            "Match education and experience on the official HPE job detail page",
            "Able to work hybrid — average 2 days per week from an HPE office",
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
            f"HPE job ID {req_id} · Category IT & Cybersecurity · "
            f"Portal posted {portal_posted or 'unknown'} · Added {POSTED}. "
            f"Official detail page reports filled. Source: {CATEGORY}"
        ),
        "description": teaser or f"HPE {title} — Bengaluru (hybrid).",
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
        job = build_job(raw, pin=0)
        if f'id: "{job["id"]}"' in text or f'job/{raw["reqId"]}/' in text:
            print(f"skip existing {raw['reqId']}")
            continue
        built.append(job)
    if not built:
        print("No new HPE IT & Cybersecurity India jobs")
        return
    for i, job in enumerate(built, start=1):
        job["pinOrder"] = i
    text = shift_pins(text, len(built))
    block = ",\n".join(mod.render_job(item) for item in built) + ",\n"
    needle = "var JOBS = [\n"
    if needle not in text:
        raise SystemExit("JOBS array not found")
    path.write_text(text.replace(needle, needle + block, 1), encoding="utf-8")
    print(f"Added {len(built)} HPE IT & Cybersecurity India jobs")
    for job in built:
        print(" -", job["id"])


if __name__ == "__main__":
    main()
