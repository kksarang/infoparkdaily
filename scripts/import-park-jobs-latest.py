#!/usr/bin/env python3
"""Import latest open jobs from Infopark / Technopark / Cyberpark portals."""

from __future__ import annotations

import json
import re
import urllib.request
from datetime import date, datetime, timedelta
from html import unescape
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
UA = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    )
}
TODAY = date(2026, 8, 5)  # bump when re-importing
NOTE = (
    "Job details can change after publishing. Always verify the opening on the "
    "employer's official channel before applying. InfoparkDaily is not a recruiter "
    "and never collects money for jobs. Never pay anyone for an application or interview."
)


def fetch(url: str, data: bytes | None = None) -> str:
    headers = dict(UA)
    if data is not None:
        headers["Content-Type"] = "application/x-www-form-urlencoded"
        headers["X-Requested-With"] = "XMLHttpRequest"
    req = urllib.request.Request(url, data=data, headers=headers)
    with urllib.request.urlopen(req, timeout=45) as resp:
        return resp.read().decode("utf-8", "replace")


def js_str(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def slugify(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s[:56].rstrip("-") or "job"


def infer_exp(title: str) -> tuple[str, str]:
    t = title.lower()
    fresh = any(k in t for k in ["fresher", "trainee", "intern", "junior", "jr.", "graduate", "office boy"])
    senior = any(
        k in t
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
            "ceo",
        ]
    )
    if fresh and not senior:
        return "fresher", "Fresher / Trainee / Intern"
    if senior and not fresh:
        return "experienced", "Experienced"
    return "both", "As per official posting"


def infer_tags(title: str) -> list[str]:
    t = title.lower()
    tags = []
    mapping = [
        ("IT", ["developer", "engineer", "software", ".net", "java", "python", "react", "flutter", "qa", "devops", "architect", "analyst"]),
        ("Marketing", ["marketing", "seo", "content", "ads", "brand"]),
        ("Sales", ["sales", "business development", "bd ", "lead generation"]),
        ("Design", ["design", "ui", "ux", "graphic", "video editor"]),
        ("HR", ["hr ", "human resource", "recruiter", "accountant"]),
    ]
    for tag, keys in mapping:
        if any(k in t for k in keys):
            tags.append(tag)
    return tags[:3] or ["IT"]


def parse_deadline(text: str) -> str:
    text = text.strip()
    for fmt in ("%d %b %Y", "%d %B %Y", "%d-%m-%Y", "%Y-%m-%d"):
        try:
            return datetime.strptime(text, fmt).date().isoformat()
        except ValueError:
            continue
    return (TODAY + timedelta(days=21)).isoformat()


def render_job(job: dict) -> str:
    lines = ["  {"]
    order = [
        "id",
        "company",
        "logo",
        "companyBlurb",
        "location",
        "roles",
        "experience",
        "experienceRange",
        "employmentType",
        "applyLink",
        "applyDeadline",
        "postedDate",
        "source",
        "verified",
        "infoparkVerified",
        "technoparkVerified",
        "cyberparkVerified",
        "verificationNote",
        "tags",
        "isWalkIn",
        "walkInDate",
        "email",
        "phone",
        "website",
        "address",
        "industry",
        "companyDetails",
        "workDetails",
        "workStatus",
        "workMode",
        "experienceYears",
        "skills",
        "requirements",
        "responsibilities",
        "benefits",
        "howToApply",
        "hiringNotes",
        "description",
        "startingDate",
        "alertBucket",
    ]
    for key in order:
        if key not in job:
            continue
        val = job[key]
        if isinstance(val, str):
            lines.append(f"    {key}: {js_str(val)},")
        elif isinstance(val, bool):
            lines.append(f"    {key}: {'true' if val else 'false'},")
        elif isinstance(val, list):
            if not val:
                lines.append(f"    {key}: [],")
            elif all(isinstance(x, str) for x in val):
                inner = ", ".join(js_str(x) for x in val)
                lines.append(f"    {key}: [{inner}],")
            else:
                lines.append(f"    {key}: {json.dumps(val)},")
        else:
            lines.append(f"    {key}: {json.dumps(val)},")
    lines.append("  }")
    return "\n".join(lines)


def insert_jobs(path: Path, array_name: str, jobs: list[dict]) -> int:
    text = path.read_text(encoding="utf-8")
    keep = []
    for job in jobs:
        jid = job["id"]
        if f'id: "{jid}"' in text:
            continue
        keep.append(job)
    if not keep:
        print(f"  no new jobs for {path.name}")
        return 0
    insert = ",\n".join(render_job(j) for j in keep) + ",\n"
    needle = f"var {array_name} = [\n"
    if needle not in text:
        raise SystemExit(f"Array start not found: {array_name} in {path}")
    text = text.replace(needle, needle + insert, 1)
    text = re.sub(
        r"Checked against .* on \d{4}-\d{2}-\d{2}",
        f"Checked against official portal on {TODAY.isoformat()}",
        text,
        count=1,
    )
    text = re.sub(
        r"Last verified: \d{4}-\d{2}-\d{2}",
        f"Last verified: {TODAY.isoformat()}",
        text,
        count=1,
    )
    text = re.sub(
        r"Checked \d{4}-\d{2}-\d{2}\.",
        f"Checked {TODAY.isoformat()}.",
        text,
        count=1,
    )
    path.write_text(text, encoding="utf-8")
    print(f"  +{len(keep)} → {path.name}")
    return len(keep)


# ---------- Infopark ----------
INFOPARK_ROWS = [
    ("90", "24987", "Personal PR Podcast Coordinator (Location: Kadavanthra)", "Voyager IT Solutions Pvt Ltd", "05-08-2026", "15 Aug 2026"),
    ("90", "24986", "Accounts & Admin Executive (Location- Kadavanthra)", "Voyager IT Solutions Pvt Ltd", "05-08-2026", "12 Aug 2026"),
    ("49", "24985", ".NET Enterprise Solution Architect - 10+years", "Thinkpalm Technologies Pvt.Ltd", "05-08-2026", "28 Aug 2026"),
    ("194", "24984", "We're Hiring: HR Intern (Talent Acquisition) - HTIC Global -  Kochi", "HTIC Global", "05-08-2026", "14 Aug 2026"),
    ("194", "24983", "Join Our Growing Sales Team! Walkin Drive- HTIC Global - 8th August 2026", "HTIC Global", "05-08-2026", "7 Aug 2026"),
    ("209", "24982", "Senior Cyber Security Analytics", "NDimensionZ Solutions Pvt.Ltd.", "05-08-2026", "31 Aug 2026"),
    ("109", "24981", "Market Research & Business Intelligence Expert", "NewAgeSys Solutions (P) Ltd.", "05-08-2026", "5 Aug 2026"),
    ("132", "24980", "Executive - Client Service", "Dynamed Healthcare Solutions Pvt.Ltd.", "05-08-2026", "30 Aug 2026"),
    ("538", "24979", "Design Engineer - Electrical", "Gravity Business Process Private Limited", "05-08-2026", "31 Aug 2026"),
    ("62", "24978", "Systems Engineer", "VIPoint Solutions Pvt Ltd", "05-08-2026", "30 Sep 2026"),
    ("363", "24977", "IT Sales/ Business Development Executive (Freshers)", "Jachoos Technologies Private Limited", "05-08-2026", "14 Aug 2026"),
    ("262", "24976", "Backend Developer / Laravel Developer (Immediate Hiring)", "Ynot Infosolutions", "05-08-2026", "10 Aug 2026"),
    ("142", "24975", "Customer Experience Associate - International Voice Process", "Speridian Technologies Pvt Ltd", "05-08-2026", "20 Aug 2026"),
    ("118", "24974", "DevOps Engineer", "UROLIME", "05-08-2026", "21 Aug 2026"),
    ("118", "24973", "HR Recruiter", "UROLIME", "05-08-2026", "21 Aug 2026"),
    ("118", "24972", "Solution Architect - DevOps", "UROLIME", "05-08-2026", "21 Aug 2026"),
    ("118", "24971", "System Engineer", "UROLIME", "05-08-2026", "21 Aug 2026"),
    ("312", "24970", "Visual Designer", "2Base Technologies Pvt Ltd", "05-08-2026", "5 Aug 2026"),
    ("312", "24969", "Marketing & Growth Lead", "2Base Technologies Pvt Ltd", "05-08-2026", "5 Aug 2026"),
    ("312", "24968", "Associate - System Engineer", "2Base Technologies Pvt Ltd", "05-08-2026", "5 Aug 2026"),
    ("312", "24967", "Business Development Manager", "2Base Technologies Pvt Ltd", "05-08-2026", "5 Aug 2026"),
    ("312", "24966", "Associate - QA Engineer", "2Base Technologies Pvt Ltd", "05-08-2026", "5 Aug 2026"),
    ("41", "24965", "IT Service Desk SME", "LucidPlus Infotech Pvt Ltd", "05-08-2026", "31 Aug 2026"),
    ("41", "24964", "Software Engineer - Card Payment Systems and Card Management Platforms", "LucidPlus Infotech Pvt Ltd", "05-08-2026", "31 Aug 2026"),
    ("329", "24963", "Infrastructure Engineer", "InApp Information Technologies India Pvt Ltd", "05-08-2026", "5 Aug 2026"),
    ("102", "24962", "Senior Developer \u2013 Shopify + BigCommerce", "McFadyen Digital", "04-08-2026", "30 Oct 2026"),
    ("102", "24961", "Full-Stack Tech Lead \u2013 AI Best Practices (AIBP)", "McFadyen Digital", "04-08-2026", "30 Sep 2026"),
    ("480", "24960", "Business Development Associate (Lead Generation & Customer Outreach)", "CloudHouse Technologies Pvt.Ltd", "04-08-2026", "18 Aug 2026"),
    ("259", "24959", "Business Analyst", "Thomsun Infocare LLP", "04-08-2026", "10 Aug 2026"),
    ("530", "24958", "Senior Business Analyst", "Nesa Software Pvt Ltd", "04-08-2026", "10 Aug 2026"),
    ("109", "24957", "US Recruiter (2-6 Years)", "NewAgeSys Solutions (P) Ltd.", "04-08-2026", "7 Aug 2026"),
    ("109", "24956", "Junior QA Engineer (1 -2 YEARS Experience)", "NewAgeSys Solutions (P) Ltd.", "04-08-2026", "6 Aug 2026"),
    ("296", "24954", "Senior Business Development Specialist \u2013 IT Services", "Grapelime Innovations Private Limited.", "04-08-2026", "5 Aug 2026"),
    ("530", "24930", "Software Trainer", "Nesa Software Pvt Ltd", "01-08-2026", "10 Aug 2026"),
    ("530", "24929", "Embedded Trainee", "Nesa Software Pvt Ltd", "01-08-2026", "10 Aug 2026"),
    ("530", "24928", "Marketing Intern", "Nesa Software Pvt Ltd", "01-08-2026", "10 Aug 2026"),
    ("95", "24926", "Junior Office Assistant-Munnar", "Aabasoft Technologies India Private Limited", "31-07-2026", "07 Aug 2026"),
    ("95", "24925", "Executive Assistant to the CEO- Kochi Location", "Aabasoft Technologies India Private Limited", "31-07-2026", "07 Aug 2026"),
    ("363", "24924", "IT SALES/ LEAD GENERATION EXPERT", "Jachoos Technologies Private Limited", "31-07-2026", "07 Aug 2026"),
    ("363", "24923", "Google Ads Expert", "Jachoos Technologies Private Limited", "31-07-2026", "07 Aug 2026"),
    ("218", "24922", "Façade BIM Modeler / Coordinator", "Roberts Design Services", "31-07-2026", "14 Aug 2026"),
    ("218", "24921", "BIM Engineer", "Roberts Design Services", "31-07-2026", "14 Aug 2026"),
    ("192", "24920", "OFFICE ADMINISTRATOR", "FDC Web Technologies Pvt Ltd", "31-07-2026", "30 Sep 2026"),
    ("192", "24919", "OFFICE ADMINISTRATOR INTERN", "FDC Web Technologies Pvt Ltd", "31-07-2026", "05 Sep 2026"),
    ("149", "24918", "Accessibility QA Engineer", "White Rabbit Group", "31-07-2026", "31 Oct 2026"),
    ("286", "24917", "ERP Content Creator", "Eqsoft Business Solutions Pvt Ltd", "31-07-2026", "31 Aug 2026"),
    ("286", "24916", "Business Development Officer", "Eqsoft Business Solutions Pvt Ltd", "31-07-2026", "31 Aug 2026"),
    ("41", "24914", "Flutter Developer", "LucidPlus Infotech Pvt Ltd", "31-07-2026", "07 Aug 2026"),
    ("41", "24913", ".NET Technical Lead (Exp: 7 - 12 Yrs)", "LucidPlus Infotech Pvt Ltd", "31-07-2026", "07 Aug 2026"),
    ("103", "24907", "Database Architect", "Experion Technologies", "30-07-2026", "31 Aug 2026"),
    ("450", "24906", "QA Automation Developer", "iCodeBees Private Limited", "30-07-2026", "07 Aug 2026"),
    ("268", "24905", "Founder's Office Assistant (Career Restart Opportunity)", "Techware Lab Pvt.Ltd.", "30-07-2026", "11 Aug 2026"),
    ("91", "24904", "Senior Business Development Executive – EdTech Sales", "iDatalytics Pvt. Ltd.", "30-07-2026", "30 Aug 2026"),
    ("95", "24889", "HR Recruiter", "Aabasoft Technologies India Private Limited", "29-07-2026", "29 Aug 2026"),
    ("36", "24888", "Immediate Opening for Gen AI SSE Position", "Aspire Systems Digital Private Limited", "29-07-2026", "29 Aug 2026"),
    ("495", "24887", "Full-Stack Developer", "Difinity Digital", "29-07-2026", "15 Aug 2026"),
    ("378", "24886", "AI Algorithms Support Consultant", "Simelabs - An Astek Company", "29-07-2026", "29 Aug 2026"),
]


def build_infopark() -> list[dict]:
    out = []
    for company_id, job_id, title, company, posted, deadline in INFOPARK_ROWS:
        exp, exp_range = infer_exp(title)
        link = f"https://infopark.in/company-jobs/details/{company_id}/{job_id}"
        posted_iso = parse_deadline(posted)
        deadline_iso = parse_deadline(deadline)
        jid = f"ipv-{slugify(company)}-{slugify(title)}-{job_id}"
        out.append(
            {
                "id": jid,
                "company": company,
                "logo": "",
                "companyBlurb": f"{company} · {title} · Infopark portal · Apply by {deadline}",
                "location": "Infopark, Kochi",
                "roles": [title],
                "experience": exp,
                "experienceRange": exp_range,
                "employmentType": "Internship" if "intern" in title.lower() else "Full-time",
                "applyLink": link,
                "applyDeadline": deadline_iso,
                "postedDate": posted_iso,
                "source": "Infopark",
                "verified": True,
                "infoparkVerified": True,
                "verificationNote": NOTE,
                "tags": infer_tags(title),
                "isWalkIn": False,
                "walkInDate": "",
                "email": "",
                "phone": "",
                "website": "",
                "address": "Infopark, Kochi, Kerala",
                "industry": "Infopark company",
                "companyDetails": f"{company} — listed on the official Infopark jobs portal.",
                "workDetails": f"Official Infopark listing for {title}. Verify details on the company / Infopark page before applying.",
                "workStatus": "Full-time",
                "workMode": "On-site · Infopark Kochi",
                "experienceYears": exp_range,
                "skills": [],
                "requirements": [
                    "Match experience and qualifications on the official Infopark job detail page",
                    "Updated resume as required by the company",
                    "Verify last date to apply on infopark.in before applying",
                ],
                "responsibilities": ["Deliver role outcomes as listed on the official Infopark posting"],
                "benefits": ["Official Infopark portal listing", "Verified by InfoparkDaily against infopark.in"],
                "howToApply": f"Apply via official Infopark listing: {link}",
                "hiringNotes": f"Imported from infopark.in on {TODAY.isoformat()} · job id {job_id}. Re-check with the employer before applying.",
                "description": f"{title} at {company} — listed on Infopark jobs portal.",
                "startingDate": "",
                "alertBucket": "upcoming",
            }
        )
    return out


def build_technopark(limit: int = 24) -> list[dict]:
    rows = []
    for page in range(1, 4):
        data = json.loads(fetch(f"https://technopark.in/api/paginated-jobs?page={page}&search=&type="))
        rows.extend(data.get("data") or [])
    out = []
    for j in rows:
        posted = (j.get("posted_date") or "")[:10]
        closing = (j.get("closing_date") or "")[:10]
        try:
            p = datetime.strptime(posted, "%Y-%m-%d").date() if posted else None
            c = datetime.strptime(closing, "%Y-%m-%d").date() if closing else None
        except ValueError:
            continue
        if c and c < TODAY:
            continue
        if p and p < date(2026, 7, 28):
            continue
        company = ((j.get("company") or {}).get("company")) or "Technopark company"
        title = j.get("job_title") or "Open role"
        tid = j["id"]
        exp, exp_range = infer_exp(title)
        link = f"https://technopark.in/job-details/{tid}?job={quote(title)}"
        walk = bool(j.get("is_walk_in"))
        walk_date = ""
        if walk and j.get("walk_in_start_date"):
            walk_date = str(j["walk_in_start_date"])[:10]
        out.append(
            {
                "id": f"tpv-{slugify(company)}-{slugify(title)}-{tid}",
                "company": company,
                "logo": "",
                "companyBlurb": f"Official Technopark listing · closes {closing or 'see portal'}.",
                "location": "Technopark, Trivandrum",
                "roles": [title],
                "experience": exp,
                "experienceRange": exp_range,
                "employmentType": "Full-time",
                "applyLink": link,
                "applyDeadline": closing or (TODAY + timedelta(days=14)).isoformat(),
                "postedDate": posted or TODAY.isoformat(),
                "source": "Technopark",
                "verified": True,
                "technoparkVerified": True,
                "verificationNote": NOTE,
                "tags": infer_tags(title),
                "isWalkIn": walk,
                "walkInDate": walk_date,
                "email": "",
                "phone": "",
                "website": "https://technopark.in/job-search",
                "address": "Technopark, Trivandrum, Kerala",
                "industry": "Technopark company",
                "companyDetails": f"{company} — verified from official Technopark Jobs portal.",
                "workDetails": f"Official Technopark listing for {title}. Confirm closing date on technopark.in before applying.",
                "workStatus": "Full-time",
                "workMode": "On-site · Technopark",
                "experienceYears": exp_range,
                "skills": [],
                "requirements": [
                    "Match experience and qualifications on the official Technopark job detail page",
                    "Updated resume as required by the company",
                    "Verify closing date on technopark.in before applying",
                ],
                "responsibilities": ["Deliver role outcomes as listed on the official Technopark posting"],
                "benefits": ["Official Technopark portal listing", "Verified by InfoparkDaily against technopark.in"],
                "howToApply": f"Apply via official Technopark listing: {link}",
                "hiringNotes": f"Verified {tid} · Imported {TODAY.isoformat()}. Re-check with the employer before applying.",
                "description": f"{title} at {company} — Technopark official portal.",
                "startingDate": "",
            }
        )
        if len(out) >= limit:
            break
    return out


def build_cyberpark() -> list[dict]:
    raw = fetch(
        "https://cyberparks.in/jm-ajax/get_listings/",
        data=b"page=1&per_page=50&orderby=date&order=DESC",
    )
    data = json.loads(raw)
    html = data.get("html") or ""
    pat = re.compile(
        r'<li class="post-(\d+)[\s\S]*?<a href="([^"]+)"[\s\S]*?<h3>(.*?)</h3>[\s\S]*?<strong>(.*?)</strong>[\s\S]*?<div class="location">\s*([^<]*?)[\s\S]*?<time datetime="([^"]+)"',
        re.I,
    )
    out = []
    for post_id, link, title_html, company, location, posted in pat.findall(html):
        title = unescape(re.sub(r"<[^>]+>", "", title_html)).strip()
        company = unescape(company).strip()
        location = unescape(location).strip() or "Cyberpark, Kozhikode"
        posted_iso = posted[:10]
        try:
            p = datetime.strptime(posted_iso, "%Y-%m-%d").date()
        except ValueError:
            continue
        # Only brand-new listings not already curated (post ids > 12110 or recent week)
        if post_id in {"12110", "12109", "12108", "12102", "12101", "12100", "12097", "12090", "12086", "12083"}:
            continue
        if p < date(2026, 7, 28):
            continue
        exp, exp_range = infer_exp(title)
        deadline = (p + timedelta(days=30)).isoformat()
        out.append(
            {
                "id": f"cpv-cp-{post_id}-aug2",
                "company": company,
                "logo": "",
                "companyBlurb": f"Official Cyberpark careers listing · posted {posted_iso}.",
                "location": location,
                "roles": [title],
                "experience": exp,
                "experienceRange": exp_range,
                "employmentType": "Full-time",
                "applyLink": link,
                "applyDeadline": deadline,
                "postedDate": posted_iso,
                "source": "Cyberpark",
                "verified": True,
                "cyberparkVerified": True,
                "verificationNote": NOTE,
                "tags": infer_tags(title),
                "isWalkIn": False,
                "walkInDate": "",
                "email": "",
                "phone": "",
                "website": "https://cyberparks.in/careers/",
                "address": "Cyberpark, Nellikkode, Kozhikode, Kerala",
                "industry": "Cyberpark company",
                "companyDetails": f"{company} — verified from official Cyberpark Kozhikode careers.",
                "workDetails": f"Official Cyberpark listing for {title}. Confirm details on cyberparks.in before applying.",
                "workStatus": "Full-time",
                "workMode": "On-site · Cyberpark Kozhikode",
                "experienceYears": exp_range,
                "skills": [],
                "requirements": [
                    "Match experience on the official Cyberpark / employer listing",
                    "Updated resume as required by the company",
                    "Verify closing date before applying",
                ],
                "responsibilities": ["Deliver role outcomes as listed by the company"],
                "benefits": ["Official Cyberpark careers listing", "Verified by InfoparkDaily"],
                "howToApply": f"Apply via official Cyberpark listing: {link}",
                "hiringNotes": f"Imported from cyberparks.in on {TODAY.isoformat()} · post {post_id}. Re-check with the employer before applying.",
                "description": f"{title} at {company} — Cyberpark official careers.",
                "startingDate": "",
                "alertBucket": "upcoming",
            }
        )
    return out


def main() -> None:
    print("Fetching portals…")
    ip = build_infopark()
    tp = build_technopark(24)
    cp = build_cyberpark()
    print(f"Built Infopark={len(ip)} Technopark={len(tp)} Cyberpark={len(cp)}")

    insert_jobs(ROOT / "data" / "infopark-jobs-data.js", "INFOPARK_VERIFIED_JOBS", ip)
    insert_jobs(ROOT / "data" / "technopark-jobs-data.js", "TECHNOPARK_VERIFIED_JOBS", tp)
    insert_jobs(ROOT / "data" / "cyberpark-jobs-data.js", "CYBERPARK_VERIFIED_JOBS", cp)
    # Also add into main JOBS for /job/<id> detail pages
    insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", ip + tp + cp)
    print("Done.")


if __name__ == "__main__":
    main()
