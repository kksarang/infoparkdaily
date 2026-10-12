#!/usr/bin/env python3
"""PUMA and Amazon career posts, plus open cyberparks.in listings not already stored."""

from __future__ import annotations

import importlib.util
import json
import re
from html import unescape
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

NOTE = mod.NOTE
TODAY = "2026-10-12"
UA = {"User-Agent": "Mozilla/5.0"}


def direct(
    slug: str,
    company: str,
    title: str,
    location: str,
    *,
    apply_link: str,
    experience: str,
    experience_range: str,
    employment_type: str,
    work_mode: str,
    tags: list[str],
    work_details: str,
    requirements: list[str],
    responsibilities: list[str],
    benefits: list[str],
    description: str,
    hiring_notes: str,
    posted: str,
) -> dict:
    return {
        "id": f"{slug}-oct26",
        "company": company,
        "logo": "",
        "companyBlurb": f"{company} · {title} · {location}",
        "location": location,
        "roles": [title],
        "experience": experience,
        "experienceRange": experience_range,
        "employmentType": employment_type,
        "applyLink": apply_link,
        "applyDeadline": "Rolling",
        "postedDate": posted,
        "source": "Direct",
        "verified": True,
        "verificationNote": NOTE,
        "tags": tags,
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": "",
        "address": location,
        "industry": "As per employer notice",
        "companyDetails": f"{company} — hiring for {title}.",
        "workDetails": work_details,
        "workStatus": employment_type,
        "workMode": work_mode,
        "experienceYears": experience_range,
        "skills": [],
        "requirements": requirements,
        "responsibilities": responsibilities,
        "benefits": benefits,
        "howToApply": f"Apply on the official careers page: {apply_link}",
        "hiringNotes": hiring_notes,
        "description": description,
        "startingDate": "",
        "officialLinks": {"careers": apply_link},
    }


DIRECT = [
    direct(
        "puma-intern-copywriting-bangalore",
        "PUMA",
        "Intern – Copywriting",
        "Bengaluru, India",
        apply_link="https://puma.wd502.myworkdayjobs.com/Jobs_at_Puma/job/Local-Office-Bangalore/Intern-Copywriting_R43735",
        experience="fresher",
        experience_range="Current student or recent graduate · 4 months",
        employment_type="Internship",
        work_mode="In-office · Bengaluru",
        tags=["Marketing", "Content", "Internship", "Bangalore"],
        posted="2026-10-08",
        work_details=(
            "PUMA marketing, social, and digital copywriting internship in Bengaluru. "
            "Reports to Head – Brand Creative, Social and Influencer. Duration: 4 months, in-office. "
            "Work covers campaign and event copy, ambassador content, and social trends."
        ),
        requirements=[
            "Current student or recent graduate",
            "Strong command of language",
            "Quick at thinking and creating content",
            "Aware of current social trends and language",
            "Tracks brand conversations on social media",
            "Understands the basics of fashion and fashion terms",
        ],
        responsibilities=[
            "Content strategy and ideation for key campaigns",
            "Copy and content planning for events and ambassadors",
            "Launch ideas for new ambassador onboarding",
            "Collaborate with the media team on social and digital copy",
        ],
        benefits=[
            "Apply only on PUMA's official Workday careers page",
            "Never pay anyone for this application",
        ],
        description="PUMA hiring a copywriting intern in Bengaluru for 4 months (in-office).",
        hiring_notes="Added 12 Oct 2026 from PUMA Workday (R43735, posted 8 Oct 2026). Re-check the listing before applying.",
    ),
    direct(
        "amazon-central-operations-support-executive-10429219",
        "Amazon",
        "Central Operations Support Executive, IN External Fulfillment",
        "Tamil Nadu, India (Virtual)",
        apply_link="https://www.amazon.jobs/en/jobs/10429219/central-operations-support-executive-in-external-fulfillment",
        experience="both",
        experience_range="Bachelor's in a quantitative or technical field",
        employment_type="Full-time",
        work_mode="Virtual / remote · Tamil Nadu",
        tags=["Amazon", "Operations", "Virtual", "Excel"],
        posted=TODAY,
        work_details=(
            "Amazon External Fulfillment, job 10429219. Remotely support seller operations: "
            "daily metrics, field-support triggers, audits, stakeholder coordination, and central control centres. "
            "The team supports inbound and outbound operations via voice and non-voice channels."
        ),
        requirements=[
            "Bachelor's degree in a quantitative or technical field such as computer science, engineering, or statistics",
            "Experience with Excel",
            "SQL experience is preferred",
        ],
        responsibilities=[
            "Remotely monitor assigned sites through outbound calls, email, and coordination with field executives",
            "Liaise between field executives, sellers, and internal and external agencies",
            "Train and direct sellers on execution and adherence to norms",
            "Devise SOPs, analyze data, and propose features and processes that improve the seller experience",
        ],
        benefits=[
            "Apply only on Amazon Jobs — never pay anyone for this application",
            "Official amazon.jobs listing",
        ],
        description="Amazon hiring a Central Operations Support Executive for External Fulfillment (virtual, Tamil Nadu).",
        hiring_notes="Added 12 Oct 2026 from Amazon Jobs (job ID 10429219). Re-check the listing before applying.",
    ),
]


def fetch_json(url: str):
    req = Request(url, headers=UA)
    with urlopen(req, timeout=45) as resp:
        return json.loads(resp.read().decode("utf-8", "replace"))


def known_post_ids() -> set[str]:
    ids: set[str] = set()
    for path in (ROOT / "data" / "cyberpark-jobs-data.js", ROOT / "data" / "jobs-data.js"):
        text = path.read_text(encoding="utf-8")
        ids.update(re.findall(r"post (\d+)", text))
        ids.update(re.findall(r"cyberparks\.in/wp-json/wp/v2/job-listings/(\d+)", text))
    return ids


def clean_html(raw: str) -> str:
    raw = re.sub(r"<li[^>]*>", "\n• ", raw, flags=re.I)
    text = mod.strip_html(raw)
    text = unescape(text)
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    if len(text) > 1800:
        text = text[:1800].rsplit(" ", 1)[0].strip()
    return text


def bullet_items(raw: str) -> list[str]:
    raw = re.sub(r"<li[^>]*>", "\n• ", raw, flags=re.I)
    return mod.bullets_from(mod.strip_html(raw))[:10]


def cyberpark_jobs() -> list[dict]:
    known = known_post_ids()
    rows = []
    for page in (1, 2):
        rows.extend(
            fetch_json(
                "https://cyberparks.in/wp-json/wp/v2/job-listings"
                f"?per_page=20&page={page}&orderby=date&order=desc"
            )
        )
    out = []
    for row in rows:
        pid = str(row["id"])
        if pid in known:
            continue
        meta = row.get("meta") or {}
        if str(meta.get("_filled") or "0") == "1":
            continue
        title = unescape(re.sub(r"<[^>]+>", "", (row.get("title") or {}).get("rendered") or "")).strip()
        company = unescape(str(meta.get("_company_name") or "Cyberpark company")).strip()
        location = unescape(str(meta.get("_job_location") or "Cyberpark, Kozhikode")).strip()
        link = (row.get("link") or "").strip()
        application = unescape(str(meta.get("_application") or "")).strip()
        email = application if re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", application) else ""
        content = (row.get("content") or {}).get("rendered") or ""
        posted = (row.get("date") or TODAY)[:10]
        exp, exp_range = mod.infer_exp(title)
        intern = bool(re.search(r"\bintern", title, re.I))
        if intern:
            exp = "fresher"
            if exp_range == "As per official posting":
                exp_range = "Fresher / Trainee / Intern"
        bullets = bullet_items(content)
        details = clean_html(content) or f"Official Cyberpark listing for {title}."
        if email:
            apply_link = f"mailto:{email}?subject={mod.quote(title)}"
            how = f"Email {email}. Official Cyberpark listing: {link}"
        elif application.startswith("http"):
            apply_link = application
            how = f"Apply: {application}. Official Cyberpark listing: {link}"
        else:
            apply_link = link
            how = f"Apply via official Cyberpark listing: {link}"
        out.append(
            {
                "id": f"cpv-{mod.slugify(company)}-{mod.slugify(title)}-{pid}",
                "company": company,
                "logo": "",
                "companyBlurb": f"{company} · {title} · Cyberpark Kozhikode",
                "location": location if location else "Cyberpark, Kozhikode",
                "roles": [title or "Open role"],
                "experience": exp,
                "experienceRange": exp_range,
                "employmentType": "Internship" if intern else "Full-time",
                "applyLink": apply_link,
                "applyDeadline": "Rolling",
                "postedDate": posted,
                "source": "Cyberpark",
                "verified": True,
                "cyberparkVerified": True,
                "verificationNote": NOTE,
                "tags": mod.infer_tags(title),
                "isWalkIn": False,
                "walkInDate": "",
                "email": email,
                "phone": "",
                "website": "https://cyberparks.in/careers/",
                "address": "Cyberpark, Nellikkode, Kozhikode, Kerala",
                "industry": "Cyberpark company",
                "companyDetails": f"{company} — listed on official Cyberpark Kozhikode careers.",
                "workDetails": details,
                "workStatus": "Internship" if intern else "Full-time",
                "workMode": "On-site · Cyberpark Kozhikode",
                "experienceYears": exp_range,
                "skills": [],
                "requirements": bullets or [
                    "Match experience on the official Cyberpark listing",
                    "Updated resume as required by the company",
                ],
                "responsibilities": bullets[:8] or ["Deliver role outcomes as listed on the official Cyberpark posting"],
                "benefits": ["Official Cyberpark Kozhikode careers listing", "Verified by InfoparkDaily"],
                "howToApply": how,
                "hiringNotes": f"Imported from cyberparks.in on {TODAY} · post {pid}. Re-check with the employer before applying.",
                "description": f"{title} at {company} — Cyberpark Kozhikode careers.",
                "startingDate": "",
                "alertBucket": "upcoming",
                "officialLinks": {"cyberparkJob": link},
            }
        )
    return out


def main() -> None:
    cp = cyberpark_jobs()
    print(f"Cyberpark.in new unfilled: {len(cp)}")
    if cp:
        mod.insert_jobs(ROOT / "data" / "cyberpark-jobs-data.js", "CYBERPARK_VERIFIED_JOBS", cp)
        mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", cp)
    mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", DIRECT)
    print("Done.")


if __name__ == "__main__":
    main()
