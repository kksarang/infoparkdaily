"""Validation, status and duplicate rules for InfoparkDaily job records.

Pure functions only (no network, no file I/O) so they can be unit-tested.
Dates are evaluated in Asia/Kolkata. Missing information is reported, never filled in.
"""

from __future__ import annotations

import re
from datetime import date, datetime, timedelta, timezone
from urllib.parse import urlparse

IST = timezone(timedelta(hours=5, minutes=30))
ISO_DATE = re.compile(r"^\d{4}-\d{2}-\d{2}$")

# Severity: "error" = data is wrong or misleading; "warn" = needs review; "info" = missing optional data.
ERROR, WARN, INFO = "error", "warn", "info"


def ist_today(now: datetime | None = None) -> date:
    return (now or datetime.now(timezone.utc)).astimezone(IST).date()


def parse_iso(value) -> date | None:
    """Strict YYYY-MM-DD parse. Returns None for blanks, 'Rolling' and malformed values."""
    text = str(value or "").strip()
    if not ISO_DATE.match(text):
        return None
    try:
        return date.fromisoformat(text)
    except ValueError:
        return None


def is_rolling(value) -> bool:
    return str(value or "").strip().lower() in {"rolling", "open until filled"}


def job_status(job: dict, today: date) -> str:
    """active | expired | rolling | undated — based only on the published deadline.

    A passed deadline means 'expired' (needs re-verification), never 'closed':
    only the employer can confirm a recruitment is closed.
    """
    deadline = job.get("applyDeadline")
    if is_rolling(deadline):
        return "rolling"
    parsed = parse_iso(deadline)
    if parsed is None:
        return "undated"
    return "expired" if parsed < today else "active"


def valid_url(value) -> bool:
    text = str(value or "").strip()
    if text.startswith("mailto:"):
        return bool(re.match(r"^mailto:[^@\s]+@[^@\s]+\.[^@\s]+", text))
    if text.startswith("tel:"):
        return bool(re.match(r"^tel:\+?\d{8,15}$", text))
    parsed = urlparse(text)
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc) and "." in parsed.netloc and " " not in text


VACANCY_CLAIM = re.compile(r"\b(\d{2,5})\s+(?:vacancies|openings|posts)\b", re.I)
FRESHER_CLAIM = re.compile(r"\bfreshers?\s+(?:can apply|eligible|welcome)\b", re.I)


def unsupported_claims(job: dict) -> list[str]:
    """Headline claims in blurbs/titles that are not backed by the job's detail text."""
    headline = " ".join([str(job.get("companyBlurb") or ""), " ".join(job.get("roles") or [])])
    detail = " ".join(
        str(x)
        for x in [job.get("workDetails"), job.get("description"), job.get("hiringNotes"), job.get("experienceRange")]
        + list(job.get("requirements") or [])
        if x
    )
    issues = []
    for match in VACANCY_CLAIM.finditer(headline):
        if match.group(1) not in detail:
            issues.append(f"vacancy count '{match.group(0)}' not found in the job details")
    if FRESHER_CLAIM.search(headline) and not re.search(r"fresher|0\s*[-–]\s*\d|no experience", detail, re.I):
        issues.append("fresher eligibility claimed in headline but not in the job details")
    return issues


def validate_job(job: dict, today: date) -> list[dict]:
    """Return a list of {code, severity, message} issues for one job."""
    issues: list[dict] = []

    def add(code: str, severity: str, message: str) -> None:
        issues.append({"code": code, "severity": severity, "message": message})

    if not str(job.get("id") or "").strip():
        add("missing_id", ERROR, "job has no id")
    if not str(job.get("company") or "").strip():
        add("missing_company", ERROR, "job has no company / recruiting organisation")
    roles = [r for r in (job.get("roles") or []) if str(r).strip()]
    if not roles:
        add("missing_title", ERROR, "job has no role / title")

    posted_raw, deadline_raw = job.get("postedDate"), job.get("applyDeadline")
    posted, deadline = parse_iso(posted_raw), parse_iso(deadline_raw)
    if posted_raw and posted is None:
        add("bad_posted_date", ERROR, f"postedDate '{posted_raw}' is not a valid YYYY-MM-DD date")
    if not posted_raw:
        add("missing_posted_date", WARN, "postedDate is missing")
    if deadline_raw and deadline is None and not is_rolling(deadline_raw):
        add("bad_deadline", ERROR, f"applyDeadline '{deadline_raw}' is not a valid date or 'Rolling'")
    if posted and posted > today + timedelta(days=1):
        add("posted_in_future", ERROR, f"postedDate {posted} is in the future")
    if posted and deadline and deadline < posted:
        add("deadline_before_posted", ERROR, f"deadline {deadline} is before postedDate {posted}")
    walk = parse_iso(job.get("walkInDate"))
    if job.get("isWalkIn") and walk and deadline and walk > deadline:
        add("walkin_after_deadline", WARN, f"walk-in date {walk} is after the deadline {deadline}")

    apply_link = str(job.get("applyLink") or "").strip()
    has_contact = bool(job.get("email") or job.get("phone"))
    if not apply_link and not has_contact:
        add("no_apply_route", ERROR, "no apply link, email or phone")
    elif apply_link and not valid_url(apply_link):
        add("bad_apply_link", ERROR, f"applyLink '{apply_link[:80]}' is malformed")
    if job.get("email") and not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", str(job["email"]).strip()):
        add("bad_email", ERROR, f"email '{job['email']}' is malformed")

    filler = re.compile(r"as per official posting|see (the )?official posting|deliver role outcomes|listing shared via", re.I)
    for field in ("experienceRange", "workMode", "industry"):
        if filler.search(str(job.get(field) or "")):
            add("placeholder_text", WARN, f"{field} contains placeholder text instead of source data")
    for field in ("requirements", "responsibilities", "benefits"):
        if any(filler.search(str(x)) for x in job.get(field) or []):
            add("placeholder_text", WARN, f"{field} contains placeholder text instead of source data")

    for message in unsupported_claims(job):
        add("unsupported_claim", WARN, message)

    if not job.get("location"):
        add("missing_location", WARN, "location is missing")
    if job_status(job, today) == "undated":
        add("no_deadline", INFO, "no published deadline; re-verify periodically")
    return issues


TRACKING_PARAMS = re.compile(r"^(utm_\w+|ref|source|fbclid|gclid|trk)$", re.I)


def canonical_url(value) -> str:
    """Lower-cased URL without fragment, trailing slash or tracking parameters (job ids in ?id= are kept)."""
    text = str(value or "").strip()
    if not text or text.startswith("mailto:"):
        return text.lower()
    parsed = urlparse(text)
    query = "&".join(
        sorted(p for p in parsed.query.split("&") if p and not TRACKING_PARAMS.match(p.split("=", 1)[0]))
    )
    path = parsed.path.rstrip("/")
    return f"{parsed.scheme}://{parsed.netloc}{path}".lower() + (f"?{query.lower()}" if query else "")


def _norm(text) -> str:
    return re.sub(r"[^a-z0-9]+", " ", str(text or "").lower()).strip()


def duplicate_keys(job: dict) -> list[str]:
    """Keys that identify the same vacancy across sources (one job may have several)."""
    keys = []
    link = canonical_url(job.get("applyLink"))
    title = _norm((job.get("roles") or [""])[0])
    # A shared careers page can host different posts, so the title is part of the key.
    if link and not link.startswith("mailto:") and title:
        keys.append(f"url:{link}|{title}")
    ref = str(job.get("referenceId") or "").strip()
    if ref:
        keys.append(f"ref:{_norm(job.get('company'))}:{ref.lower()}")
    return keys


def find_duplicates(jobs: list[dict]) -> dict:
    """Return duplicate ids and duplicate vacancies (same key, different records)."""
    seen_ids: dict[str, int] = {}
    for job in jobs:
        seen_ids[job.get("id")] = seen_ids.get(job.get("id"), 0) + 1
    dup_ids = sorted(i for i, n in seen_ids.items() if n > 1 and i)

    groups: dict[str, list[str]] = {}
    for job in jobs:
        for key in duplicate_keys(job):
            groups.setdefault(key, []).append(job.get("id"))
    dup_vacancies = {k: v for k, v in groups.items() if len(set(v)) > 1}
    return {"duplicate_ids": dup_ids, "duplicate_vacancies": dup_vacancies}
