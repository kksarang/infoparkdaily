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
TODAY = date(2026, 8, 15)  # bump when re-importing
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
# New rows from https://infopark.in/companies-job (job ids > last import 25019).
INFOPARK_ROWS = [
    ("296", "25088", "Senior Business Development Specialist \u2013 IT Services", "Grapelime Innovations Private Limited.", "14-08-2026", "17 Aug 2026"),
    ("70", "25087", "Software Engineer", "Empress InfoTech", "14-08-2026", "21 Aug 2026"),
    ("371", "25086", "Software Test Engineer - 0-2 years", "Gizmeon Technologies Private Limited", "14-08-2026", "31 Aug 2026"),
    ("530", "25085", "Senior Test Engineer", "Nesa Software Pvt Ltd", "14-08-2026", "30 Aug 2026"),
    ("251", "25084", "IT Business Analyst (4+ Years of Experience in the FinTech Domain Preferred)", "Empay Software Solutions Private Limited", "14-08-2026", "31 Aug 2026"),
    ("251", "25083", "Senior Java Developer (4+ Year\u2019s)", "Empay Software Solutions Private Limited", "14-08-2026", "31 Aug 2026"),
    ("251", "25082", "Java Team Lead (5+ years of experience in Java, with at least 2+years of experience in lead role)", "Empay Software Solutions Private Limited", "14-08-2026", "31 Aug 2026"),
    ("3", "25080", "INTERNSHIP- WALK-IN INTERVIEW RHCE Certified Linux System Engineer (Fresher) @02nd September 2026", "Armia Systems Pvt. Ltd", "14-08-2026", "02 Sep 2026"),
    ("62", "25079", "Internal System Administrator", "VIPoint Solutions Pvt Ltd", "14-08-2026", "30 Sep 2026"),
    ("328", "25078", "Senior Sales Manager", "Daskalos virtual Academy pvt Limited", "14-08-2026", "28 Aug 2026"),
    ("259", "25077", "SEO Analyst-2-4 years", "Thomsun Infocare LLP", "14-08-2026", "15 Sep 2026"),
    ("259", "25076", "Digital Performance Marketing Specialist-4+ years", "Thomsun Infocare LLP", "14-08-2026", "15 Sep 2026"),
    ("542", "25074", "HR Head", "Lisbell Technologies Pvt Ltd", "14-08-2026", "21 Aug 2026"),
    ("542", "25073", "AI Intern", "Lisbell Technologies Pvt Ltd", "14-08-2026", "21 Aug 2026"),
    ("542", "25072", "Digital Marketing GenAI Internship", "Lisbell Technologies Pvt Ltd", "13-08-2026", "31 Aug 2026"),
    ("450", "25071", "Microsoft PPM Consultant", "iCodeBees Private Limited", "13-08-2026", "18 Aug 2026"),
    ("494", "25070", "Business Analyst", "Neork Technologies", "13-08-2026", "15 Sep 2026"),
    ("450", "25069", "Systems Operations Specialist", "iCodeBees Private Limited", "13-08-2026", "20 Aug 2026"),
    ("450", "25068", "Systems Analyst and Documentation Expert", "iCodeBees Private Limited", "13-08-2026", "20 Aug 2026"),
    ("450", "25067", "Network and Cybersecurity Specialist", "iCodeBees Private Limited", "13-08-2026", "20 Aug 2026"),
    ("351", "25060", "HR Recruiter", "Stepping Stone Consultancy Services", "12-08-2026", "12 Sep 2026"),
    ("189", "25059", "Digital Marketing Executive(1+ years)", "GALTech Technologies Pvt Ltd", "12-08-2026", "29 Aug 2026"),
    ("468", "25058", "Technical Manager", "SS Consulting", "12-08-2026", "10 Sep 2026"),
    ("420", "25057", "SEO Intern", "Apro IT Solutions Pvt Ltd", "12-08-2026", "29 Aug 2026"),
    ("387", "25056", "Software Developer (Contract, Remote)", "AlignMinds Technologies", "12-08-2026", "15 Aug 2026"),
    ("363", "25054", "IT SALES and LEAD GENERATION EXPERT", "Jachoos Technologies Private Limited", "12-08-2026", "19 Aug 2026"),
    ("363", "25053", "GOOGLE ADS EXPERT", "Jachoos Technologies Private Limited", "12-08-2026", "19 Aug 2026"),
    ("148", "25051", "Business Intelligence (BI) Analyst \u2013 GA & GSC Specialist", "AVENTUS INFORMATICS", "12-08-2026", "16 Sep 2026"),
    ("55", "25045", "Project Manager \u2013 .NET required for JTSi Technologies India Pvt Ltd at Kochi Infopark.", "JTSi Technologies India Private Limited", "12-08-2026", "19 Aug 2026"),
    ("530", "25044", "Node js Developer", "Nesa Software Pvt Ltd", "11-08-2026", "30 Aug 2026"),
    ("95", "25043", "Business Support Executive", "Aabasoft Technologies India Private Limited", "11-08-2026", "28 Aug 2026"),
    ("396", "25042", "Graphic Designer & Video Editor \u2013 AI & Digital Content", "Merabt Technologies Private Limited", "11-08-2026", "31 Aug 2026"),
    ("95", "25041", "Business Coordinator- Male", "Aabasoft Technologies India Private Limited", "11-08-2026", "28 Aug 2026"),
    ("189", "25040", "Business Development Executive (1\u2013 2Years)", "GALTech Technologies Pvt Ltd", "11-08-2026", "29 Aug 2026"),
    ("73", "25038", "Financial Analyst \u2013 Investor Relations", "ValueMentor Infosec Pvt. Ltd.", "11-08-2026", "27 Aug 2026"),
    ("256", "25037", "Full-Stack Engineer- AI Integration & ERP Modernization", "Yellowfish Digital Innovations Pvt Ltd.", "11-08-2026", "10 Sep 2026"),
    ("148", "25030", "Business Intelligence (BI) Analyst", "AVENTUS INFORMATICS", "10-08-2026", "02 Sep 2026"),
    ("83", "25029", "Senior Consultant - Magento (Contract)", "Fingent Global Solutions", "10-08-2026", "08 Sep 2026"),
    ("495", "25028", "Project Coordinator", "Difinity Digital", "10-08-2026", "31 Aug 2026"),
    ("269", "25020", "Senior Computational Biologist", "Feathersoft Info Solutions Private Ltd", "09-08-2026", "30 Sep 2026"),
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


def build_technopark(limit: int = 160) -> list[dict]:
    rows = []
    for page in range(1, 9):
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
        if p and p < date(2026, 8, 7):
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


def main(parks: set[str] | None = None) -> None:
    parks = parks or {"infopark", "technopark", "cyberpark"}
    print("Fetching portals…")
    ip = build_infopark() if "infopark" in parks else []
    tp = build_technopark(160) if "technopark" in parks else []
    cp = build_cyberpark() if "cyberpark" in parks else []
    print(f"Built Infopark={len(ip)} Technopark={len(tp)} Cyberpark={len(cp)}")

    if ip:
        insert_jobs(ROOT / "data" / "infopark-jobs-data.js", "INFOPARK_VERIFIED_JOBS", ip)
    if tp:
        insert_jobs(ROOT / "data" / "technopark-jobs-data.js", "TECHNOPARK_VERIFIED_JOBS", tp)
    if cp:
        insert_jobs(ROOT / "data" / "cyberpark-jobs-data.js", "CYBERPARK_VERIFIED_JOBS", cp)
    # Also add into main JOBS for /job/<id> detail pages
    combined = ip + tp + cp
    if combined:
        insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", combined)
    print("Done.")


if __name__ == "__main__":
    import sys

    selected = {a.lower() for a in sys.argv[1:]} if len(sys.argv) > 1 else None
    main(selected)
