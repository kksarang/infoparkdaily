#!/usr/bin/env python3
"""Add every opening published on https://advenxa.zohorecruit.in/jobs/Careers."""

from __future__ import annotations

import importlib.util
import json
import re
import time
import urllib.request
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LIST_URL = "https://advenxa.zohorecruit.in/recruit/v2/public/Job_Openings?pagename=Careers"
DETAIL_URL = "https://advenxa.zohorecruit.in/recruit/v2/public/Job_Openings/{id}?pagename=Careers"
CAREERS = "https://advenxa.zohorecruit.in/jobs/Careers"
POSTED = "2026-10-19"
EMAIL = "resumes@advenxa.zohorecruitmail.in"

spec = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

UA = {"User-Agent": "InfoparkDaily job import", "Accept": "application/json"}
NOTE = mod.NOTE


def fetch_json(url: str) -> dict:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=45) as resp:
        return json.loads(resp.read().decode("utf-8", "replace"))


def tidy(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip(" ,")


def html_to_text(html: str) -> str:
    html = re.sub(r"(?is)<script[^>]*>.*?</script>", " ", html or "")
    html = re.sub(r"(?is)<style[^>]*>.*?</style>", " ", html)
    html = re.sub(r"<br\s*/?>", "\n", html, flags=re.I)
    html = re.sub(r"</(?:p|div|li|h[1-6]|tr)>", "\n", html, flags=re.I)
    html = re.sub(r"<li[^>]*>", "\n• ", html, flags=re.I)
    html = re.sub(r"<[^>]+>", " ", html)
    text = unescape(html).replace("\xa0", " ")
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]{2,}", " ", text)
    return text.strip()


def location_of(city: str, state: str, country: str) -> str:
    raw_city = tidy(city)
    raw_state = tidy(state)
    raw_country = tidy(country)
    blob = f"{raw_city} {raw_state} {raw_country}".lower()
    if "infopark" in blob:
        return "Infopark, Kakkanad, Kochi"
    key = re.sub(r"[^a-z]", "", raw_city.lower())
    known = {
        "ernakulam": "Ernakulam, Kerala",
        "eranakulam": "Ernakulam, Kerala",
        "edappalli": "Edappally, Kochi",
        "edappally": "Edappally, Kochi",
        "padivattomedappally": "Padivattom, Edappally, Kochi",
        "angamaly": "Angamaly, Kerala",
        "palakkad": "Palakkad, Kerala",
        "thrissur": "Thrissur, Kerala",
        "ponnani": "Ponnani, Kerala",
        "nilambur": "Nilambur, Kerala",
        "trivandrum": "Trivandrum, Kerala",
        "sultanateofoman": "Sultanate of Oman",
        "sultanstateoman": "Sultanate of Oman",
        "dubai": "Dubai, United Arab Emirates",
        "derby": "Derby, United Kingdom",
        "douglas": "Douglas, United Kingdom",
        "ibri": "Ibri, Sultanate of Oman",
    }
    if key in known:
        return known[key]
    parts = [raw_city]
    if raw_state and raw_state.lower() not in raw_city.lower():
        parts.append(raw_state)
    if raw_country and raw_country.lower() not in " ".join(parts).lower():
        parts.append(raw_country)
    return ", ".join(part for part in parts if part) or "Location on the official posting"


def section(text: str, headings: list[str], stops: list[str]) -> str:
    pattern = "|".join(re.escape(h) for h in headings)
    stop = "|".join(re.escape(h) for h in stops)
    match = re.search(rf"(?:^|\n)\s*(?:{pattern})\s*:?\s*(?:\n|$)", text, re.I)
    if not match:
        return ""
    rest = text[match.end() :]
    end = re.search(rf"(?:^|\n)\s*(?:{stop})\s*:?\s*(?:\n|$)", rest, re.I)
    return (rest[: end.start()] if end else rest).strip()


def bullets(text: str) -> list[str]:
    out: list[str] = []
    seen: set[str] = set()
    for line in text.splitlines():
        line = re.sub(r"\s+", " ", line).strip()
        item = re.sub(r"^(?:[•\-\*]|\d+[.)])\s*", "", line).strip(" .")
        if len(item) < 8 or len(item) > 360:
            continue
        key = item.lower()
        if key in seen:
            continue
        seen.add(key)
        out.append(item)
        if len(out) >= 16:
            break
    return out


def salary_of(api_salary: str, text: str) -> str:
    match = re.search(r"Salary Package\s*:\s*(.+)", text, re.I)
    if match:
        value = tidy(match.group(1))
        if value and not re.search(r"industry standard|not disclosed|as per", value, re.I):
            return value
    value = tidy(api_salary)
    if value and not re.search(r"industry standard|not disclosed|as per", value, re.I):
        return value
    return ""


def experience_of(title: str, work_experience: str) -> tuple[str, str]:
    title_l = title.lower()
    if re.search(r"\bintern\b", title_l):
        return "fresher", tidy(work_experience) or "Internship"
    if re.search(r"fresher|trainee", title_l):
        return "fresher", tidy(work_experience) or "Fresher"
    years = tidy(work_experience)
    if years:
        if re.match(r"^0\b", years):
            return "fresher", years
        return "experienced", years
    level, label = mod.infer_exp(title)
    return level, label


def employment_of(job_type: str, title: str) -> str:
    if re.search(r"\bintern\b", title, re.I):
        return "Internship"
    kind = tidy(job_type).lower()
    if "part" in kind:
        return "Part-time"
    if "contract" in kind:
        return "Contract"
    return "Full-time"


def tags_of(industry: str, title: str) -> list[str]:
    tags: list[str] = []
    industry_map = {
        "BPO": "BPO",
        "Health Care": "Healthcare",
        "Logistics": "Logistics",
        "Financial Services": "Finance",
        "Human Resources": "HR",
        "IT Services": "IT",
        "IT & Service": "Sales",
        "Construction": "Construction",
        "E-commerce": "E-commerce",
        "Sales - Marketing": "Sales",
        "Shipping/Marine": "Shipping",
        "Travel and Tourism": "Travel",
    }
    if industry in industry_map:
        tags.append(industry_map[industry])
    title_l = title.lower()
    for tag, keys in (
        ("Sales", ("sales", "business development")),
        ("Finance", ("account", "finance")),
        ("HR", ("recruiter", "hr ")),
        ("Healthcare", ("nurse", "medical")),
        ("Support", ("customer support", "support worker")),
    ):
        if any(key in title_l for key in keys) and tag not in tags:
            tags.append(tag)
    return tags[:4] or ["Hiring"]


def build_job(summary: dict, detail: dict) -> dict:
    title = tidy(detail.get("Posting_Title") or detail.get("Job_Opening_Name") or summary.get("Posting_Title"))
    zoho_id = str(detail.get("id") or summary.get("id"))
    location = location_of(detail.get("City") or summary.get("City"), detail.get("State"), detail.get("Country") or summary.get("Country"))
    text = html_to_text(detail.get("Job_Description") or "")
    stops = [
        "Job Overview",
        "Overview",
        "Responsibilities",
        "Key Responsibilities",
        "Requirements",
        "Required Skills",
        "Important Requirement",
        "Salary Package",
        "How to Apply",
    ]
    overview = section(text, ["Job Overview", "Overview"], stops) or ""
    resp_text = section(text, ["Responsibilities", "Key Responsibilities"], stops)
    req_text = section(text, ["Requirements", "Required Skills", "Important Requirement"], stops)
    responsibilities = bullets(resp_text) or [
        "Day-to-day work is described on the official Advenxa posting. Read it before you apply."
    ]
    requirements = bullets(req_text) or [
        "Qualifications are on the official Advenxa posting. Confirm them before you apply."
    ]
    work = tidy(overview) or tidy(re.sub(r"\s+", " ", text))[:420]
    if not work:
        work = f"{title} — {location}. Listed on Advenxa's official careers page."
    level, exp_range = experience_of(title, detail.get("Work_Experience") or "")
    salary = salary_of(detail.get("Salary") or "", text)
    filled = bool(detail.get("Is_Locked") or summary.get("Is_Locked"))
    apply = detail.get("$appy_url") or summary.get("$url") or CAREERS
    opened = tidy(detail.get("Date_Opened") or "")
    slug = mod.slugify(title)
    job = {
        "id": f"advenxa-{slug}-{zoho_id[-6:]}",
        "company": "Advenxa",
        "logo": "",
        "companyBlurb": f"Advenxa · {title} · {location}",
        "location": location,
        "roles": [title],
        "experience": level,
        "experienceRange": exp_range,
        "employmentType": employment_of(detail.get("Job_Type") or summary.get("Job_Type") or "", title),
        "applyLink": apply,
        "applyDeadline": "2026-10-18" if filled else "Rolling",
        "postedDate": POSTED,
        "source": "Direct",
        "verified": True,
        "verificationNote": NOTE,
        "tags": tags_of(detail.get("Industry") or summary.get("Industry") or "", title),
        "isWalkIn": False,
        "walkInDate": "",
        "email": EMAIL,
        "phone": "",
        "website": CAREERS,
        "address": location,
        "industry": tidy(detail.get("Industry") or summary.get("Industry") or ""),
        "companyDetails": "Opening published on Advenxa's official careers page. Confirm the employer, location, and terms on that page before you apply.",
        "workDetails": work[:900],
        "workStatus": employment_of(detail.get("Job_Type") or "", title),
        "workMode": "As stated on the official posting",
        "experienceYears": exp_range,
        "qualification": "",
        "skills": [],
        "requirements": requirements,
        "responsibilities": responsibilities,
        "benefits": [
            "Apply only through the official Advenxa careers page",
            "Never pay anyone for this application",
        ],
        "howToApply": f"Apply on the official posting: {apply}",
        "hiringNotes": (
            f"Checked on the Advenxa careers page on {POSTED}."
            + (f" Date opened on that page: {opened}." if opened else "")
            + (" Marked position filled on the careers page." if filled else "")
        ),
        "description": work[:280],
        "startingDate": "",
    }
    if salary:
        job["salaryRange"] = salary
    return job


def main() -> None:
    listing = fetch_json(LIST_URL)
    rows = listing.get("data") or []
    jobs = []
    for index, row in enumerate(rows):
        detail_payload = fetch_json(DETAIL_URL.format(id=row["id"]))
        detail = detail_payload.get("data") or {}
        if isinstance(detail, list):
            detail = detail[0] if detail else {}
        job = build_job(row, detail)
        jobs.append(job)
        print(f"{index + 1:02d}. {job['location']} — {job['roles'][0]}")
        time.sleep(0.12)
    print(f"built {len(jobs)} jobs")
    mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", jobs)


if __name__ == "__main__":
    main()
