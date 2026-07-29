#!/usr/bin/env python3
"""Import recent open Technopark jobs into jobs-data.js (grouped by company)."""

from __future__ import annotations

import json
import re
import urllib.request
from collections import defaultdict
from datetime import date, datetime, timedelta
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
JOBS_DATA = ROOT / "data" / "jobs-data.js"
UA = {"User-Agent": "Mozilla/5.0 (compatible; InfoparkDailyBot/1.0)"}
TODAY = date(2026, 7, 25)
POSTED_CUTOFF = TODAY - timedelta(days=14)


def fetch_json(url: str):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode())


def fetch_recent_open(pages: int = 5) -> list[dict]:
    rows: list[dict] = []
    for page in range(1, pages + 1):
        data = fetch_json(
            f"https://technopark.in/api/paginated-jobs?page={page}&search=&type="
        )
        rows.extend(data.get("data") or [])

    open_recent = []
    for job in rows:
        try:
            posted = datetime.strptime(job["posted_date"][:10], "%Y-%m-%d").date()
            closing = (
                datetime.strptime(job["closing_date"][:10], "%Y-%m-%d").date()
                if job.get("closing_date")
                else None
            )
        except Exception:
            continue
        if closing is not None and closing < TODAY:
            continue
        if posted < POSTED_CUTOFF:
            continue
        open_recent.append(job)
    return open_recent


def slugify(name: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    s = re.sub(r"-(p|opc)-ltd$", "", s)
    s = re.sub(r"-pvt-?ltd\.?$", "", s)
    s = re.sub(r"-ltd\.?$", "", s)
    s = (s[:48].rstrip("-") or "technopark-job") + "-tp-jul26"
    return s


def infer_exp(roles: list[str]) -> tuple[str, str]:
    text = " ".join(roles).lower()
    fresh = any(
        k in text
        for k in ["fresher", "trainee", "intern", "junior", "associate l1", "graduate"]
    )
    senior = any(
        k in text
        for k in [
            "senior",
            "lead",
            "principal",
            "architect",
            "manager",
            "director",
            "vp",
            "vice president",
            "head ",
        ]
    )
    if fresh and not senior:
        return "fresher", "Fresher / early career"
    if senior and not fresh:
        return "experienced", "Experienced (role-dependent)"
    if fresh and senior:
        return "both", "Fresher & experienced roles"
    return "both", "As per Technopark posting"


def infer_tags(roles: list[str]) -> list[str]:
    text = " ".join(roles).lower()
    mapping = [
        ("AI", ["ai ", " ai", "machine learning", "ml ", "llm", "genai", "data scientist"]),
        ("QA", ["qa", "test", "quality"]),
        ("Cloud", ["aws", "azure", "cloud", "devops"]),
        (
            "Marketing",
            [
                "marketing",
                "seo",
                "digital marketing",
                "sales",
                "presales",
                "business development",
                "bd ",
            ],
        ),
        ("Design", ["ui/ux", "designer", "figma"]),
        ("HR", ["hr ", "human resource", "recruiter", "talent"]),
        ("Admin", ["admin", "office", "coordinator"]),
        (
            "IT",
            [
                "developer",
                "engineer",
                "software",
                "full stack",
                "backend",
                "frontend",
                "python",
                "java",
                ".net",
                "react",
                "devops",
                "architect",
                "analyst",
            ],
        ),
    ]
    tags = [tag for tag, keys in mapping if any(k in text for k in keys)]
    return tags[:3] or ["IT"]


def js_escape(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def build_entry(company: str, items: list[dict]) -> str:
    roles: list[str] = []
    for item in items:
        title = str(item.get("job_title") or "").strip()
        if title and title not in roles:
            roles.append(title)

    posted = max(item["posted_date"] for item in items)
    closings = [item["closing_date"] for item in items if item.get("closing_date")]
    deadline = min(closings) if closings else "Rolling"
    walkins = [item for item in items if item.get("is_walk_in")]
    is_walk = bool(walkins)
    walk_date = ""
    if is_walk:
        walk_date = walkins[0].get("walk_in_start_date") or ""

    logo_path = (items[0].get("company") or {}).get("logo") or ""
    if logo_path.startswith("/"):
        logo = f"https://technopark.in{logo_path}"
    elif logo_path:
        logo = logo_path
    else:
        logo = "assets/logo-infoparkdaily.png"

    exp, exp_range = infer_exp(roles)
    tags = infer_tags(roles)
    newest = max(items, key=lambda item: item["posted_date"])
    detail = (
        f"https://technopark.in/job-details/{newest['id']}"
        f"?job={quote(newest['job_title'])}"
    )
    search_link = f"https://technopark.in/job-search?search={quote(company)}"
    slug = slugify(company)
    role_n = len(roles)
    blurb = f"{role_n} open role{'s' if role_n != 1 else ''} on Technopark Jobs · apply by {deadline}."
    roles_js = json.dumps(roles, ensure_ascii=False, indent=6)
    roles_js = "\n    ".join(roles_js.splitlines())
    tags_js = json.dumps(tags, ensure_ascii=False)
    role_preview = "; ".join(roles[:8]) + ("…" if role_n > 8 else "")

    return f"""{{
    id: {js_escape(slug)},
    company: {js_escape(company)},
    logo: {js_escape(logo)},
    companyBlurb: {js_escape(blurb)},
    location: "Technopark, Trivandrum",
    roles: {roles_js},
    experience: {js_escape(exp)},
    experienceRange: {js_escape(exp_range)},
    employmentType: "Full-time",
    applyLink: {js_escape(detail)},
    applyDeadline: {js_escape(deadline)},
    postedDate: {js_escape(posted)},
    source: "Technopark",
    verified: true,
    tags: {tags_js},
    isWalkIn: {"true" if is_walk else "false"},
    walkInDate: {js_escape(walk_date or "")},
    email: "",
    phone: "",
    website: {js_escape(search_link)},
    address: "Technopark, Trivandrum, Kerala",
    industry: "IT / Technopark company",
    companyDetails: {js_escape(company + " is hiring at Technopark, Trivandrum. Roles synced from the official Technopark job portal.")},
    workDetails: {js_escape(f"Open roles ({role_n}): {role_preview}. Verify live posting on Technopark before applying.")},
    workStatus: "Full-time",
    workMode: "On-site · Technopark Trivandrum",
    experienceYears: {js_escape(exp_range)},
    requirements: [
      "Match the experience stated on the Technopark job detail page for your role",
      "Updated resume / portfolio as required by the company",
      "Ready for Technopark Trivandrum based hiring process"
    ],
    responsibilities: [
      "Deliver role-specific outcomes as listed by the company on Technopark Jobs",
      "Collaborate with the team as per the official posting"
    ],
    benefits: [
      "Technopark campus role",
      "Official Technopark portal listing"
    ],
    howToApply: {js_escape(f"Apply via the official Technopark posting: {detail}. Browse company roles: {search_link}.")},
    hiringNotes: {js_escape(f"Synced from https://technopark.in/job-search · Posted {posted} · Deadline {deadline}. Always verify on the official portal.")},
    description: {js_escape(blurb)},
    startingDate: ""
  }}"""


def main() -> None:
    rows = fetch_recent_open(pages=5)
    by_company: dict[str, list[dict]] = defaultdict(list)
    for row in rows:
        by_company[row["company"]["company"]].append(row)

    existing_text = JOBS_DATA.read_text()
    existing_ids = set(re.findall(r'^\s*id:\s*"([^"]+)"', existing_text, flags=re.M))
    existing_companies = {
        m.group(1).strip().lower()
        for m in re.finditer(r'^\s*company:\s*"([^"]+)"', existing_text, flags=re.M)
    }

    entries: list[str] = []
    for company, items in sorted(
        by_company.items(),
        key=lambda pair: max(i["posted_date"] for i in pair[1]),
        reverse=True,
    ):
        slug = slugify(company)
        if slug in existing_ids:
            print("skip existing id", slug)
            continue
        if company.strip().lower() in existing_companies:
            print("skip existing company", company)
            continue
        entries.append(build_entry(company, items))

    if not entries:
        raise SystemExit("No new Technopark jobs to import.")

    block = ",\n".join(entries) + ",\n"
    marker = "var JOBS = [\n"
    if marker not in existing_text:
        raise SystemExit("Could not find JOBS array marker")
    if "source: \"Technopark\"" in existing_text and "-tp-jul26" in existing_text:
        # replace previous import block between first tp-jul26 id and jachoos
        pattern = re.compile(
            r"\{\n\s*id: \"[^\"]+-tp-jul26\"[\s\S]*?(?=\{\n\s*id: \"jachoos-infopark-jul25\")",
            re.M,
        )
        if pattern.search(existing_text):
            updated = pattern.sub(block, existing_text, count=1)
            JOBS_DATA.write_text(updated)
            print(f"Replaced previous Technopark import with {len(entries)} companies")
            return

    updated = existing_text.replace(marker, marker + block, 1)
    JOBS_DATA.write_text(updated)
    print(f"Inserted {len(entries)} Technopark companies ({len(rows)} open recent roles)")


if __name__ == "__main__":
    main()
