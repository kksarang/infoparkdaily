#!/usr/bin/env python3
"""Add every ClaySys Technologies opening from claysys.com/careers — 10 Nov 2026.

Source: https://www.claysys.com/careers/#divOpenpositions
Each opening's details page (claysys.com/openings/?id=...) is read for its job
summary and description. Lines are sorted into responsibilities / requirements /
benefits by the posting's own headings; postings without headings use the split
points in SPLIT. The site shows no posted date or closing date, so postedDate is
the check date and applyDeadline is left empty. New listings are pinned at the top.
Pass --dry-run to print without writing.
"""

from __future__ import annotations

import html
import importlib.util
import json
import re
import sys
import urllib.request
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

CHECKED = "2026-11-10"
CAREERS = "https://www.claysys.com/careers/"
SEARCH = CAREERS + "#divOpenpositions"
LOGO = "https://infopark.in/upload_images/company_logos/188clasis.png"
UA = "Mozilla/5.0"

REQ_HEAD = re.compile(
    r"^(qualifications?|candidate requirements.*|educational qualification|basic requirements|skills required|requirements?)\s*:?$",
    re.I,
)
BEN_HEAD = re.compile(r"^benefits\s*:?$", re.I)
DUTY_HEAD = re.compile(
    r"^(roles? (and|&) responsibilities|key responsibilities|responsibilities|resonsibility)\s*:?$", re.I
)
NUM_HEAD = re.compile(r"^\d+\.\s+(.+)$")

# Postings with no section headings: index of the first line that is a requirement
# (everything before it is a responsibility). "all" = the whole list is requirements.
SPLIT = {
    "MzIx": "all",   # Structural Designer — list of skills
    "Mzgy": "all",   # AppForms Developer — list of skills
    "Mzc5": "all",   # No-code Developer — list of skills
    "MzQ3": 4,       # Draftsman — "Technical Skill: ..." starts the skills part
    "MzI1": 10,      # Senior Marketing Manager — "10 years of experience ..." onward
    "Mzkw": 1,       # Technician — first line is the experience preference
}
# Requirement lines moved to the front for postings whose first bullet is a requirement.
FIRST_IS_REQ = {"Mzkw"}

# Short role tags per opening id.
TAGS = {
    "Mzg4": ["Project Management"],
    "MzY3": ["System Administration", "IT Support"],
    "Mzc0": ["Civil Engineering", "Site Supervision"],
    "MzM3": ["Architecture", "Revit", "AutoCAD"],
    "MzIx": ["Structural Design", "Civil Engineering"],
    "MzQ3": ["AutoCAD", "Drafting"],
    "Mzcx": ["Drafting", "Site Supervision"],
    "Mzkw": ["Electrical", "Technician"],
    "Mzgy": ["AppForms", "Fresher", "SQL"],
    "Mzc5": ["No-code", "Fresher", "Non-IT"],
    "MzI4": ["BPO", "Night Shift"],
    "MzQ0": ["BPO", "Remote", "Data Entry"],
    "MzE0": ["Video Editing", "Premiere Pro", "After Effects"],
    "MzI1": ["Marketing", "Lead Generation"],
    "MzU3": ["RPA", "Technical Support"],
    "Mzc3": ["Digital Marketing", "SEO", "Social Media"],
    "Mzgw": ["Administration", "Excel"],
    "Mzg1": ["Healthcare", "Operations"],
    "Mzg5": ["Hospital Administration", "Healthcare"],
    "Mzg3": [".NET", "Angular", "Training"],
}


def get(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                return resp.read().decode("utf-8", "replace")
        except OSError:
            if attempt == 2:
                raise
    return ""


def text_of(fragment: str) -> str:
    s = re.sub(r"<li[^>]*>", "\n- ", fragment)
    s = re.sub(r"<(br|/p|/li|/div|/h\d|/ul|p|div)[^>]*>", "\n", s)
    s = html.unescape(re.sub(r"<[^>]+>", "", s)).replace("\xa0", " ").replace("�", " – ")
    s = re.sub(r"[ \t]+", " ", s)
    return re.sub(r"\n\s*\n+", "\n", s).strip()


def fetch_list() -> list[dict]:
    page = get(CAREERS)
    rows = re.findall(
        r'openings-item ([^"]*)">\s*<div[^>]*>\s*<a id="careerlink" href="([^"]+)">\s*(.*?)</a></div>'
        r"<div[^>]*>(.*?)</div>\s*<div[^>]*>(.*?)</div>",
        page,
        re.S,
    )
    return [
        {"url": u, "rid": u.split("id=")[1], "listTitle": html.unescape(t.strip()), "exp": e.strip(), "loc": l.strip()}
        for _c, u, t, e, l in rows
    ]


def fetch_detail(item: dict) -> dict:
    raw = get(item["url"])
    a = raw.find("Job Summary")
    b = raw.find("<!-- <p>", a)
    body = text_of(raw[a:b])
    reg = re.search(r'href="(https://www\.claysys\.com/registration/\?[^"]+)"', raw)
    fields = dict(re.findall(r"^(Job Position|Experience|Location|Department|Domain):\s*(.*)$", body, re.M))
    desc = body.split("Job Description:", 1)[1] if "Job Description:" in body else ""
    return {"fields": fields, "lines": join_wrapped(desc), "register": html.unescape(reg.group(1)) if reg else ""}


def join_wrapped(desc: str) -> list[tuple[str, bool]]:
    """Return (line, is_heading) pairs, rejoining bullets the site wraps mid-sentence."""
    out: list[tuple[str, bool]] = []
    bulleted = "\n- " in "\n" + desc
    for line in desc.split("\n"):
        line = line.strip()
        if not line:
            continue
        is_bullet = line.startswith("- ")
        body = line[2:].strip() if is_bullet else line
        body = body.lstrip("•·– ").strip()
        heading = bool(REQ_HEAD.match(body) or BEN_HEAD.match(body) or DUTY_HEAD.match(body) or NUM_HEAD.match(body))
        if bulleted and not is_bullet and not heading and out and not out[-1][1]:
            out[-1] = (f"{out[-1][0]} {body}", False)
            continue
        out.append((body, heading))
    return [(re.sub(r"\s+", " ", t).strip(), h) for t, h in out]


def sort_lines(rid: str, lines: list[tuple[str, bool]]) -> tuple[list[str], list[str], list[str]]:
    duties: list[str] = []
    reqs: list[str] = []
    bens: list[str] = []
    has_heads = any(h and not NUM_HEAD.match(t) for t, h in lines)
    if not has_heads:
        items = [t for t, h in lines if not h]
        cut = SPLIT.get(rid)
        if cut == "all":
            return [], items, []
        if isinstance(cut, int):
            if rid in FIRST_IS_REQ:
                return items[cut:], items[:cut], []
            return items[:cut], items[cut:], []
        return items, [], []
    bucket = duties
    for text, head in lines:
        if head:
            if REQ_HEAD.match(text):
                bucket = reqs
            elif BEN_HEAD.match(text):
                bucket = bens
            elif DUTY_HEAD.match(text):
                bucket = duties
            continue  # numbered sub-headings (1. Social Media Management) stay in the current bucket
        bucket.append(text)
    return duties, reqs, bens


def clean_title(title: str) -> str:
    return title.strip().replace("Administator", "Administrator")


def location_fields(loc: str, rid: str) -> tuple[str, str, str]:
    if loc == "Kochi, India":
        return "Kochi, Kerala", "On-site · Kochi", "kochi"
    if loc == "Cherthala, India":
        return "Cherthala, Kerala", "On-site · Cherthala", "cherthala"
    if loc == "Goa, India":
        return "Goa, India", "Remote (Goa)", "goa"
    # "All Locations": the Project Manager posting names Kerala, Tamil Nadu and Goa.
    if rid == "Mzg4":
        return "Kerala, Tamil Nadu, Goa", "On-site · Kerala / Tamil Nadu / Goa", "all-locations"
    return "All ClaySys locations (incl. Kochi)", "On-site · ClaySys locations", "all-locations"


def exp_fields(exp: str) -> tuple[str, str]:
    if exp.lower() == "fresher":
        return "fresher", "Fresher"
    m = re.match(r"(\d+)\s*-\s*(\d+)", exp)
    if not m:
        return "both", exp
    lo, hi = int(m.group(1)), int(m.group(2))
    return ("both" if lo == 0 else "experienced"), f"{lo}–{hi} years"


def build(item: dict, det: dict) -> dict:
    rid = item["rid"]
    f = det["fields"]
    title = clean_title(f.get("Job Position") or item["listTitle"].split("(")[0])
    count = re.search(r"\((\d+) Nos\)", item["listTitle"])
    n = int(count.group(1)) if count else 1
    openings = f"{n} opening{'s' if n != 1 else ''}"
    location, mode, loc_slug = location_fields(item["loc"], rid)
    exp, exp_label = exp_fields(item["exp"])
    duties, reqs, bens = sort_lines(rid, det["lines"])
    dept = (f.get("Department") or "").strip()
    domain = (f.get("Domain") or "").strip()
    if item["exp"].lower() != "fresher":
        reqs = [f"Experience: {item['exp']}"] + reqs
    lead = duties[0] if duties else (reqs[1] if len(reqs) > 1 else "")
    work = f"{title} at ClaySys Technologies ({dept}). {openings} listed on the ClaySys careers page."
    if lead:
        work += f" {lead.rstrip('.')}."
    how = f"Apply on the ClaySys careers page: {item['url']} (use Apply Now to register"
    how += f": {det['register']})." if det["register"] else ")."
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    tags = TAGS.get(rid, [domain])[:3]
    return {
        "id": f"claysys-{slug}-{loc_slug}-{rid.lower()}-nov2026",
        "company": "ClaySys Technologies",
        "logo": LOGO,
        "companyBlurb": f"ClaySys Technologies · {title} · {location} · {exp_label} · {openings}",
        "location": location,
        "roles": [title],
        "experience": exp,
        "experienceRange": exp_label,
        "employmentType": "Full-time",
        "applyLink": item["url"],
        "applyDeadline": "",
        "postedDate": CHECKED,
        "source": "Company careers page",
        "verified": True,
        "verificationNote": mod.NOTE,
        "tags": tags,
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": CAREERS,
        "address": location,
        "industry": "IT Services / Software",
        "companyDetails": f"ClaySys Technologies is hiring {title} ({openings}) in its {dept} department. Listed on the official ClaySys careers page.",
        "workDetails": work,
        "workStatus": "Full-time",
        "workMode": mode,
        "experienceYears": exp_label,
        "skills": [],
        "requirements": reqs,
        "responsibilities": duties,
        "benefits": bens,
        "howToApply": how,
        "hiringNotes": (
            f"Checked on {SEARCH} on 10 Nov 2026 · {openings} · Department: {dept} · Domain: {domain} · "
            f"Location on site: {item['loc']}. The site shows no posted or closing date."
        ),
        "description": f"{title} at ClaySys Technologies · {location} · {exp_label} · {openings}.",
        "startingDate": "",
        "officialLinks": {"claysysOpening": item["url"], "claysysCareers": SEARCH},
    }


def shift_pins(text: str, by: int) -> str:
    pins = [int(n) for n in re.findall(r"pinOrder: (\d+)", text)]
    dupes = [n for n, c in Counter(pins).items() if c != 1]
    if dupes:
        raise SystemExit(f"Duplicate pinOrder values: {dupes}")
    return re.sub(r"pinOrder: (\d+)", lambda m: f"pinOrder: {int(m.group(1)) + by}", text)


def main() -> None:
    dry = "--dry-run" in sys.argv
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    items = fetch_list()
    print(f"ClaySys careers: {len(items)} openings")
    jobs = [build(it, fetch_detail(it)) for it in items]
    fresh = [j for j in jobs if f'claysys.com/openings/?id={j["applyLink"].split("id=")[1]}"' not in text]
    if dry:
        for j in fresh:
            print(json.dumps(j, indent=1, ensure_ascii=False))
        return
    if not fresh:
        print("No new ClaySys jobs")
        return
    for i, job in enumerate(fresh, start=1):
        job["pinOrder"] = i
    text = shift_pins(text, len(fresh))
    block = ",\n".join(mod.render_job(j) for j in fresh) + ",\n"
    needle = "var JOBS = [\n"
    if needle not in text:
        raise SystemExit("JOBS array not found")
    path.write_text(text.replace(needle, needle + block, 1), encoding="utf-8")
    print(f"Added {len(fresh)} ClaySys listings (pinned)")
    for j in fresh:
        print(" -", j["roles"][0], "|", j["experienceRange"], "|", j["location"])


if __name__ == "__main__":
    main()
