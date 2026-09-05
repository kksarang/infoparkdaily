#!/usr/bin/env python3
"""Import latest open jobs from Infopark / Technopark / Cyberpark portals."""

from __future__ import annotations

import json
import re
import urllib.request
from datetime import date, datetime, timedelta
from html import unescape
from pathlib import Path
import time
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
UA = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    )
}
TODAY = date(2026, 9, 5)  # bump when re-importing
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
    intern = bool(re.search(r"\bintern(?:ship)?s?\b|\bapprentices?", t))
    fresh = intern or any(k in t for k in ["fresher", "trainee", "junior", "jr.", "graduate", "office boy"])
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
        ("Design", ["design", " ui", "ux", "graphic", "video editor"]),
        ("HR", ["hr ", "human resource", "recruiter", "talent acquisition", "accountant"]),
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


GENERIC_INFOPARK_REQ = "Match experience and qualifications on the official Infopark job detail page"
EMAIL_RE = re.compile(r"[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}", re.I)
SKIP_EMAIL_RE = re.compile(r"(infopark\.in|example\.com|wixpress|sentry\.io|noreply|donotreply)", re.I)
GOOGLE_FORM_RE = re.compile(r"https://(?:docs\.google\.com/forms/[^\s\"'<>]+|forms\.gle/[^\s\"'<>]+)", re.I)
INFOPARK_APPLY_RE = re.compile(r"https://infopark\.in/company-jobs/details/(\d+)/(\d+)")


def strip_html(html: str) -> str:
    html = re.sub(r"(?is)<script[^>]*>.*?</script>", " ", html)
    html = re.sub(r"(?is)<style[^>]*>.*?</style>", " ", html)
    html = re.sub(r"<br\s*/?>", "\n", html, flags=re.I)
    html = re.sub(r"</(?:p|div|li|h[1-6]|tr)>", "\n", html, flags=re.I)
    html = re.sub(r"<[^>]+>", " ", html)
    text = unescape(html).replace("**", "")
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]{2,}", " ", text)
    return text.strip()


def clean_lines(text: str) -> list[str]:
    return [re.sub(r"\s+", " ", line).strip() for line in text.splitlines()]


def bullets_from(text: str) -> list[str]:
    out: list[str] = []
    seen: set[str] = set()
    for line in clean_lines(text):
        m = re.match(r"^(?:[\*\-•]+)\s+(.*)$", line)
        item = (m.group(1) if m else "").strip(" .")
        if not item:
            continue
        if len(item) < 12 or len(item) > 320:
            continue
        if re.match(r"^(key responsibilities|responsibilities|requirements|benefits|how to apply)\b", item, re.I):
            continue
        key = item.lower()
        if key in seen:
            continue
        seen.add(key)
        out.append(item)
        if len(out) >= 18:
            break
    return out


def section_after(text: str, heading: str, stops: list[str]) -> str:
    m = re.search(rf"(?:^|\n)\s*{heading}\s*:?\s*(?:\n|$)", text, re.I)
    if not m:
        return ""
    rest = text[m.end() :]
    ends = [s.start() for s in (re.search(rf"(?:^|\n)\s*{stop}\s*:?\s*(?:\n|$)", rest, re.I) for stop in stops) if s]
    return rest[: min(ends)].strip() if ends else rest.strip()


def pick_emails(*chunks: str) -> list[str]:
    found: list[str] = []
    seen: set[str] = set()
    for chunk in chunks:
        for email in EMAIL_RE.findall(chunk or ""):
            email = email.strip(".,;:()[]<>").lower()
            if SKIP_EMAIL_RE.search(email) or email in seen:
                continue
            seen.add(email)
            found.append(email)
    return found


def pick_phone(*chunks: str) -> str:
    for chunk in chunks:
        for m in re.finditer(
            r"(?:\+91[\s\-.]*)?([6-9](?:\d[\s\-.]*){9})",
            chunk or "",
        ):
            digits = re.sub(r"\D", "", m.group(1))
            if len(digits) == 10:
                return f"+91 {digits[:5]} {digits[5:]}"
    return ""


def format_phone_display(raw: str) -> str:
    digits = re.sub(r"\D", "", raw or "")
    if digits.startswith("91") and len(digits) == 12:
        digits = digits[2:]
    if len(digits) == 10:
        return f"+91 {digits[:5]} {digits[5:]}"
    return raw.strip()


def infer_exp_from_text(title: str, body: str) -> tuple[str, str]:
    exp, exp_range = infer_exp(title)
    blob = f"{title}\n{body}"
    m = re.search(r"(\d+\s*(?:\+|plus)?(?:\s*(?:to|-|–)\s*\d+)?)\s*\+?\s*years?", blob, re.I)
    if m and exp != "fresher":
        token = re.sub(r"\s+", " ", m.group(1)).replace("plus", "+")
        exp_range = f"{token} years".replace("years years", "years")
        if exp == "both":
            exp = "experienced"
    return exp, exp_range


def parse_infopark_detail(html: str) -> dict:
    logo = ""
    logo_m = re.search(r'<div class="logo-con">\s*<img src="([^"]+)"', html, re.I)
    if logo_m:
        logo = logo_m.group(1).strip()

    company_phone = ""
    company_email = ""
    page_company = ""
    con_m = re.search(r'<div class="con">([\s\S]*?)</div>', html)
    if con_m:
        h4 = re.search(r"<h4>([^<]+)</h4>", con_m.group(1))
        if h4:
            page_company = unescape(h4.group(1)).strip()
        con_text = strip_html(con_m.group(1))
        company_emails = pick_emails(con_text)
        company_email = company_emails[0] if company_emails else ""
        span_phone = re.search(r"<span>(\+91[^<]+)</span>", con_m.group(1))
        if span_phone:
            company_phone = format_phone_display(span_phone.group(1))
        elif not company_phone:
            company_phone = pick_phone(con_text)

    body_m = re.search(r'<div class="comp-job-deatiil">([\s\S]*?)</div>\s*</div>', html)
    body = strip_html(body_m.group(1) if body_m else "")
    apply_sec = section_after(
        body,
        r"how\s+to\s+apply",
        [r"if this opportunity", r"about infopark", r"disclaimer"],
    )
    req_sec = section_after(
        body,
        r"requirements",
        [r"benefits", r"how\s+to\s+apply", r"if this opportunity"],
    )
    ben_sec = section_after(
        body,
        r"benefits",
        [r"how\s+to\s+apply", r"if this opportunity"],
    )
    resp_sec = section_after(
        body,
        r"(?:key\s+)?responsibilities",
        [r"requirements", r"benefits", r"how\s+to\s+apply"],
    )
    intro_m = re.split(
        r"(?:^|\n)\s*(?:key\s+)?responsibilities\s*:?\s*(?:\n|$)|(?:^|\n)\s*requirements\s*:?\s*(?:\n|$)|(?:^|\n)\s*benefits\s*:?\s*(?:\n|$)|(?:^|\n)\s*how\s+to\s+apply\s*:?\s*(?:\n|$)",
        body,
        maxsplit=1,
        flags=re.I,
    )
    intro = (intro_m[0] if intro_m else body).strip()
    intro = re.sub(r"^\s*[^\n]{3,80}\n+", "", intro, count=1).strip()
    intro = re.sub(r"\n{2,}", "\n\n", intro).strip()
    if len(intro) > 2200:
        cut = intro[:2200]
        intro = (cut.rsplit("\n\n", 1)[0] if "\n\n" in cut else cut.rsplit(" ", 1)[0]).strip()

    apply_emails = pick_emails(apply_sec, body)
    apply_email = ""
    if apply_emails:
        ranked = sorted(apply_emails, key=lambda e: (0 if re.search(r"recruit|career|hr|jobs|apply", e) else 1, e))
        apply_email = ranked[0]
    apply_phone = pick_phone(apply_sec) or company_phone
    subject_m = re.search(r"subject(?:\s*line)?\s*:\s*(.+)", apply_sec or body, re.I)
    subject = re.sub(r"\s+", " ", subject_m.group(1)).strip(" .") if subject_m else ""
    form = ""
    form_m = GOOGLE_FORM_RE.search(html) or GOOGLE_FORM_RE.search(body)
    if form_m:
        form = form_m.group(0).rstrip(").,;")

    reqs = bullets_from(req_sec)
    bens = bullets_from(ben_sec)
    resps = bullets_from(resp_sec)
    if not resps:
        resps = bullets_from(section_after(body, r"key responsibilities", [r"requirements", r"benefits"]))

    first_para = next((p.strip() for p in re.split(r"\n\s*\n", intro) if len(p.strip()) > 40), intro)

    how_parts = []
    if apply_email:
        bit = f"Email your updated resume to {apply_email}"
        if subject:
            bit += f' with subject "{subject}"'
        how_parts.append(bit + ".")
    if apply_phone:
        how_parts.append(f"Call or WhatsApp {apply_phone}.")
    if form:
        how_parts.append(f"Register on the Google Form listed by the company: {form}")
    if not how_parts:
        how_parts.append("Follow the apply instructions on the official Infopark job listing.")

    return {
        "logo": logo,
        "pageCompany": page_company,
        "email": apply_email,
        "phone": apply_phone,
        "companyEmail": company_email,
        "emailSubject": subject,
        "googleForm": form,
        "requirements": reqs,
        "benefits": bens,
        "responsibilities": resps,
        "intro": intro,
        "firstPara": first_para,
        "howToApply": " ".join(how_parts),
    }


def company_tokens(name: str) -> list[str]:
    s = re.sub(r"[^a-z0-9]+", " ", (name or "").lower())
    drop = {"pvt", "p", "ltd", "limited", "private", "the", "and", "of", "inc", "llp", "opc"}
    return [w for w in s.split() if w not in drop and len(w) > 1]


def companies_match(listed: str, page: str) -> bool:
    a, b = company_tokens(listed), company_tokens(page)
    if not a or not b:
        return False
    if a[0] == b[0]:
        return True
    shared = set(a) & set(b)
    return bool(shared) and (a[0] in b or b[0] in a)


def apply_infopark_detail(job: dict, html: str, listing_url: str) -> dict | None:
    url_m = INFOPARK_APPLY_RE.search(listing_url)
    suffix = str(job.get("id") or "").rsplit("-", 1)[-1]
    if not url_m or url_m.group(2) != suffix:
        return None
    detail = parse_infopark_detail(html)
    title = (job.get("roles") or ["Open role"])[0]
    company = job.get("company") or "Company"
    page_company = detail.get("pageCompany") or ""
    if not page_company:
        print(f"    skip no company name on Infopark page {suffix}", flush=True)
        return None
    if not companies_match(company, page_company):
        print(f"    skip company mismatch: listed={company!r} page={page_company!r}", flush=True)
        return None
    exp, exp_range = infer_exp_from_text(title, f"{detail['intro']}\n{detail['howToApply']}")
    job["experience"] = exp
    job["experienceRange"] = exp_range
    job["experienceYears"] = exp_range
    if detail["logo"] and not job.get("logo"):
        job["logo"] = detail["logo"]
    if detail["email"]:
        job["email"] = detail["email"]
        subject = detail["emailSubject"] or title
        job["applyLink"] = f"mailto:{detail['email']}?subject={quote(subject)}"
        if detail["emailSubject"]:
            job["emailSubject"] = detail["emailSubject"]
        else:
            job.pop("emailSubject", None)
    if detail["phone"]:
        job["phone"] = detail["phone"]
    if detail["intro"]:
        job["workDetails"] = detail["intro"]
    if detail["firstPara"]:
        job["description"] = detail["firstPara"]
    if detail["requirements"]:
        job["requirements"] = detail["requirements"]
    if detail["responsibilities"]:
        job["responsibilities"] = detail["responsibilities"]
    if detail["benefits"]:
        job["benefits"] = detail["benefits"]
    job["howToApply"] = f"{detail['howToApply']} Official Infopark listing: {listing_url}"
    job["companyDetails"] = f"{company} — listed on the official Infopark jobs portal."
    job["officialLinks"] = {"infoparkJob": listing_url}
    return job


def find_job_span(text: str, jid: str) -> tuple[int, int] | None:
    needle = f'    id: "{jid}"'
    i = text.find(needle)
    if i < 0:
        return None
    # Opening brace is the `{` on its own line immediately above `id:`
    line_start = text.rfind("\n", 0, i)
    brace_line_end = line_start
    brace_line_start = text.rfind("\n", 0, brace_line_end) + 1 if brace_line_end > 0 else 0
    brace_line = text[brace_line_start:brace_line_end]
    if brace_line.strip() != "{":
        start = text.rfind("{", 0, i)
        if start < 0:
            return None
    else:
        start = brace_line_start
    depth = 0
    in_str = False
    esc = False
    for j in range(start, len(text)):
        ch = text[j]
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == '"':
                in_str = False
            continue
        if ch == '"':
            in_str = True
            continue
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                end = j + 1
                if end < len(text) and text[end] == ",":
                    end += 1
                return start, end
    return None


def extract_js_string(block: str, key: str) -> str:
    m = re.search(rf'    {re.escape(key)}: ("(?:\\.|[^"\\])*")', block)
    if not m:
        return ""
    try:
        return json.loads(m.group(1))
    except json.JSONDecodeError:
        return ""


def extract_js_bool(block: str, key: str) -> bool:
    m = re.search(rf"    {re.escape(key)}: (true|false)", block)
    return bool(m and m.group(1) == "true")


def extract_js_list(block: str, key: str) -> list[str]:
    m = re.search(rf"    {re.escape(key)}: (\[.*?\])", block, re.S)
    if not m:
        return []
    try:
        data = json.loads(m.group(1))
        return [str(x) for x in data] if isinstance(data, list) else []
    except json.JSONDecodeError:
        return []


def job_from_block(block: str) -> dict:
    roles = extract_js_list(block, "roles")
    return {
        "id": extract_js_string(block, "id"),
        "company": extract_js_string(block, "company"),
        "logo": extract_js_string(block, "logo"),
        "companyBlurb": extract_js_string(block, "companyBlurb"),
        "location": extract_js_string(block, "location") or "Infopark, Kochi",
        "roles": roles or ["Open role"],
        "experience": extract_js_string(block, "experience") or "both",
        "experienceRange": extract_js_string(block, "experienceRange") or "As per official posting",
        "employmentType": extract_js_string(block, "employmentType") or "Full-time",
        "applyLink": extract_js_string(block, "applyLink"),
        "applyDeadline": extract_js_string(block, "applyDeadline"),
        "postedDate": extract_js_string(block, "postedDate"),
        "source": extract_js_string(block, "source") or "Infopark",
        "verified": extract_js_bool(block, "verified"),
        "infoparkVerified": True,
        "verificationNote": NOTE,
        "tags": extract_js_list(block, "tags") or infer_tags(roles[0] if roles else ""),
        "isWalkIn": extract_js_bool(block, "isWalkIn"),
        "walkInDate": extract_js_string(block, "walkInDate"),
        "email": extract_js_string(block, "email"),
        "phone": extract_js_string(block, "phone"),
        "website": extract_js_string(block, "website"),
        "address": extract_js_string(block, "address") or "Infopark, Kochi, Kerala",
        "industry": extract_js_string(block, "industry") or "Infopark company",
        "companyDetails": extract_js_string(block, "companyDetails"),
        "workDetails": extract_js_string(block, "workDetails"),
        "workStatus": extract_js_string(block, "workStatus") or "Full-time",
        "workMode": extract_js_string(block, "workMode") or "On-site · Infopark Kochi",
        "experienceYears": extract_js_string(block, "experienceYears"),
        "skills": extract_js_list(block, "skills"),
        "requirements": extract_js_list(block, "requirements"),
        "responsibilities": extract_js_list(block, "responsibilities"),
        "benefits": extract_js_list(block, "benefits"),
        "howToApply": extract_js_string(block, "howToApply"),
        "hiringNotes": extract_js_string(block, "hiringNotes"),
        "description": extract_js_string(block, "description"),
        "startingDate": extract_js_string(block, "startingDate"),
        "alertBucket": extract_js_string(block, "alertBucket") or "upcoming",
    }


def replace_job(path: Path, job: dict) -> bool:
    text = path.read_text(encoding="utf-8")
    span = find_job_span(text, job["id"])
    if not span:
        return False
    start, end = span
    rendered = render_job(job)
    trailing = "," if text[end - 1] == "," or (end < len(text) and text[start:end].rstrip().endswith(",")) else ""
    # find_job_span includes the comma after } when present
    original = text[start:end]
    has_comma = original.rstrip().endswith(",")
    replacement = rendered + ("," if has_comma else "")
    path.write_text(text[:start] + replacement + text[end:], encoding="utf-8")
    return True


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
        "emailSubject",
        "officialLinks",
    ]
    for key in order:
        if key not in job:
            continue
        val = job[key]
        if key == "emailSubject" and not val:
            continue
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
# Live scrape from https://infopark.in/companies-job (new rows since last import).
INFOPARK_ROW_RE = re.compile(
    r'<tr>\s*<td class="head">([^<]+)</td>\s*<td class="head">([^<]+)</td>\s*'
    r'<td class="date">([^<]+)</td>\s*<td>([^<]+)</td>\s*<td class="btn-sec">\s*'
    r'<a href="https://infopark.in/company-jobs/details/(\d+)/(\d+)"',
    re.I,
)
INFOPARK_LAST_IMPORTED_ID = 25337


def scrape_infopark_rows(pages: int = 3) -> list[tuple[str, str, str, str, str, str]]:
    rows: list[tuple[str, str, str, str, str, str]] = []
    seen: set[str] = set()
    for page in range(1, pages + 1):
        url = "https://infopark.in/companies-job" if page == 1 else f"https://infopark.in/companies-job?page={page}"
        html = fetch(url)
        for posted, title, company, deadline, company_id, job_id in INFOPARK_ROW_RE.findall(html):
            if job_id in seen:
                continue
            seen.add(job_id)
            rows.append(
                (
                    company_id,
                    job_id,
                    unescape(title).strip(),
                    unescape(company).strip(),
                    posted.strip(),
                    deadline.strip(),
                )
            )
    return rows


def build_infopark() -> list[dict]:
    out = []
    for company_id, job_id, title, company, posted, deadline in scrape_infopark_rows(4):
        if int(job_id) <= INFOPARK_LAST_IMPORTED_ID:
            continue
        exp, exp_range = infer_exp(title)
        link = f"https://infopark.in/company-jobs/details/{company_id}/{job_id}"
        posted_iso = parse_deadline(posted)
        deadline_iso = parse_deadline(deadline)
        if deadline_iso < TODAY.isoformat():
            continue
        jid = f"ipv-{slugify(company)}-{slugify(title)}-{job_id}"
        walk = bool(re.search(r"walk[\s-]?in", title.lower()))
        job = {
                "id": jid,
                "company": company,
                "logo": "",
                "companyBlurb": f"{company} · {title} · Infopark portal · Apply by {deadline}",
                "location": "Infopark, Kochi",
                "roles": [title],
                "experience": exp,
                "experienceRange": exp_range,
                "employmentType": "Internship" if re.search(r"\bintern(?:ship)?s?\b|\bapprentices?", title.lower()) else "Full-time",
                "applyLink": link,
                "applyDeadline": deadline_iso,
                "postedDate": posted_iso,
                "source": "Infopark",
                "verified": True,
                "infoparkVerified": True,
                "verificationNote": NOTE,
                "tags": infer_tags(title),
                "isWalkIn": walk,
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
                "officialLinks": {"infoparkJob": link},
            }
        try:
            html = fetch(link)
            filled = apply_infopark_detail(job, html, link)
            if not filled:
                print(f"  kept placeholder {job_id} (page did not match)")
            time.sleep(0.2)
        except Exception as exc:
            print(f"  detail fetch failed {job_id}: {exc}")
        out.append(job)
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
        if p and p < date(2026, 8, 23):
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


def collect_safe_infopark_targets(text: str) -> list[tuple[str, str]]:
    """Only pair a job with an infopark.in URL whose job-id suffix matches our id."""
    targets: list[tuple[str, str]] = []
    seen: set[str] = set()

    def consider(jid: str, url: str) -> None:
        m = INFOPARK_APPLY_RE.search(url)
        if not m:
            return
        suffix = jid.rsplit("-", 1)[-1]
        if suffix != m.group(2) or jid in seen:
            return
        seen.add(jid)
        targets.append((jid, m.group(0)))

    for m in re.finditer(
        r'    id: "(ipv-[^"]+)"([\s\S]{0,4500}?)(?=\n    id: "|\n  \]\s*;|\Z)',
        text,
    ):
        jid = m.group(1)
        blob = m.group(0)
        generic = GENERIC_INFOPARK_REQ in blob
        email = extract_js_string(blob, "email")
        if email and not generic:
            continue
        url = extract_js_string(blob, "applyLink")
        if not INFOPARK_APPLY_RE.search(url):
            how = extract_js_string(blob, "howToApply")
            links = blob
            found = INFOPARK_APPLY_RE.search(how) or INFOPARK_APPLY_RE.search(links)
            url = found.group(0) if found else ""
        consider(jid, url)
    return targets


def audit_infopark_email_alignment(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8")
    bad: list[str] = []
    for m in re.finditer(r'    id: "(ipv-[^"]+)"', text):
        jid = m.group(1)
        span = find_job_span(text, jid)
        if not span:
            continue
        block = text[span[0] : span[1]]
        um = INFOPARK_APPLY_RE.search(block)
        if not um:
            continue
        suffix = jid.rsplit("-", 1)[-1]
        if not suffix.isdigit():
            continue
        if um.group(2) != suffix:
            bad.append(f"{jid} points at infopark job {um.group(2)}")
    return bad


def enrich_placeholder_infopark_jobs(limit: int | None = None) -> int:
    """Fill email / phone / real JD from infopark.in. Never attach another company's contacts."""
    paths = [
        ROOT / "data" / "jobs-data.js",
        ROOT / "data" / "infopark-jobs-data.js",
    ]
    jobs_path = paths[0]
    text = jobs_path.read_text(encoding="utf-8")
    ids = collect_safe_infopark_targets(text)
    if limit:
        ids = ids[:limit]
    print(f"Enriching {len(ids)} Infopark jobs (id-matched URLs only)…", flush=True)
    updated = 0
    skipped = 0
    cache: dict[str, str] = {}
    for jid, listing in ids:
        text = jobs_path.read_text(encoding="utf-8")
        span = find_job_span(text, jid)
        if not span:
            print(f"  missing {jid}", flush=True)
            skipped += 1
            continue
        job = job_from_block(text[span[0] : span[1]])
        if job.get("id") != jid:
            print(f"  skip parse mismatch {jid}", flush=True)
            skipped += 1
            continue
        try:
            html = cache.get(listing) or fetch(listing)
            cache[listing] = html
        except Exception as exc:
            print(f"  skip {jid}: {exc}", flush=True)
            skipped += 1
            continue
        result = apply_infopark_detail(job, html, listing)
        if not result:
            skipped += 1
            continue
        written_url = (result.get("officialLinks") or {}).get("infoparkJob") or ""
        um = INFOPARK_APPLY_RE.search(written_url)
        if not um or um.group(2) != jid.rsplit("-", 1)[-1]:
            print(f"  skip write {jid}: listing id would not match", flush=True)
            skipped += 1
            continue
        for path in paths:
            if replace_job(path, result):
                updated += 1
        print(
            f"  {jid} → {result.get('email') or 'no email'} · {len(result.get('requirements') or [])} reqs",
            flush=True,
        )
        time.sleep(0.12)
    print(f"Updated {updated} file records · skipped {skipped}", flush=True)
    for path in paths:
        bad = audit_infopark_email_alignment(path)
        if bad:
            print(f"AUDIT FAIL {path.name}:", flush=True)
            for line in bad:
                print(f"  {line}", flush=True)
        else:
            print(f"AUDIT OK {path.name}: no cross-linked Infopark job ids", flush=True)
    return updated


def main(parks: set[str] | None = None) -> None:
    parks = parks or {"infopark", "technopark", "cyberpark"}
    if parks == {"enrich"}:
        enrich_placeholder_infopark_jobs()
        print("Done.")
        return
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
