#!/usr/bin/env python3
"""Add new Wipro Kochi openings from careers.wipro.com, pinned at the top.

Source: https://careers.wipro.com/search/?q=&locationsearch=kochi&searchResultView=LIST
Postings with the same title, mandatory skill, experience and description are
merged into one listing; every Ref ID is kept in howToApply / hiringNotes.
Only details printed on the Wipro posting are used. Pass --dry-run to print
the listings without writing.
"""

from __future__ import annotations

import html
import http.cookiejar
import importlib.util
import json
import re
import sys
import urllib.request
from collections import Counter
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

NOTE = mod.NOTE
POSTED = "2026-10-27"
BASE = "https://careers.wipro.com"
SEARCH = f"{BASE}/search/?q=&locationsearch=kochi&searchResultView=LIST"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
FRAUD = "helpdesk.recruitment@wipro.com"

jar = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))


def get(url: str, data: bytes | None = None, headers: dict | None = None) -> str:
    req = urllib.request.Request(url, data=data, headers={"User-Agent": UA, **(headers or {})})
    with opener.open(req, timeout=60) as resp:
        return resp.read().decode("utf-8", "replace")


def fetch_list() -> list[dict]:
    page = get(SEARCH)
    token = re.search(r'var CSRFToken = "([^"]+)"', page).group(1)
    found: dict[str, dict] = {}
    for n in range(20):
        body = {
            "locale": "en_US", "pageNumber": n, "sortBy": "date", "keywords": "",
            "location": "kochi", "facetFilters": {}, "brand": "", "skills": [],
            "categoryId": 0, "alertId": "", "rcmCandidateId": "",
        }
        raw = get(
            f"{BASE}/services/recruiting/v1/jobs",
            json.dumps(body).encode(),
            {"Content-Type": "application/json", "X-CSRF-Token": token},
        )
        rows = json.loads(raw).get("jobSearchResult") or []
        if not rows:
            break
        for row in rows:
            r = row["response"]
            if "Kochi" in (r.get("sfstd_jobLocation_obj") or []):
                found[r["id"]] = r
    return list(found.values())


def us_date(value: str) -> str:
    try:
        return datetime.strptime(value, "%m/%d/%y").strftime("%Y-%m-%d")
    except (TypeError, ValueError):
        return ""


def page_text(raw: str) -> str:
    i = raw.find('itemprop="description"')
    s = raw[i:] if i >= 0 else raw
    s = s[s.find(">") + 1:]
    for stop in ("Reinvent your world", "[[custJD]]", "unify-apply-now"):
        if stop in s:
            s = s[: s.find(stop)]
    s = re.sub(r"<(br|/p|/li|/div|/h\d|/tr)[^>]*>", "\n", s)
    s = re.sub(r"<li[^>]*>", "\n- ", s)
    s = html.unescape(re.sub(r"<[^>]+>", "", s)).replace("͏", "").replace("\xa0", " ")
    s = re.sub(r"[ \t]+", " ", s)
    s = re.sub(r"\n\s*\n+", "\n", s)
    if "Job Description" in s:
        s = s.split("Job Description", 1)[1]
    elif "www.wipro.com." in s:
        s = s.split("www.wipro.com.", 1)[1]
    return s.strip()


def first(pattern: str, text: str) -> str:
    m = re.search(pattern, text)
    return m.group(1).strip(" .") if m else ""


def tidy(line: str) -> str:
    line = line.strip().lstrip("-•*").strip().strip('"').strip()
    line = re.sub(r'\s*"\s*', " ", line)
    line = re.sub(r"^[a-z]\.\s+|^\d+\.\s+|^[ivx]+\.\s+", "", line)
    m = re.match(r"^([A-Z][A-Za-z &/]{3,45}?)\s*[-–]\s*\"?(.+)$", line)
    if m and not m.group(1).endswith(" "):
        line = f"{m.group(1)}: {m.group(2)}"
    return re.sub(r"\s+", " ", line).strip(' ".')


def section(text: str, starts: tuple[str, ...], stops: tuple[str, ...]) -> list[str]:
    lines = text.split("\n")
    out: list[str] = []
    on = False
    for line in lines:
        bare = line.strip().rstrip(":").strip()
        if not on and any(bare.lower().startswith(s.lower()) for s in starts):
            on = True
            continue
        if on and any(bare.lower().startswith(s.lower()) for s in stops):
            break
        if on and len(bare) > 25:
            out.append(tidy(line))
    return list(dict.fromkeys(x for x in out if x))


STOPS = ("Deliver", "Mandatory Skills", "Location", "Primary Skills", "Secondary Skills",
         "Preferred Skills", "Transition Activities", "BAU Operations", "Required Skills",
         "Role Summary", "2. Manage", "3. Team", "2. Ensure", "2. Provide", "2. Perform", "3. Status")


def parse(raw: dict, text: str) -> dict:
    skill = first(r"Mandatory Skills:\s*(.+)", text)
    exp = first(r"Experience:\s*(.+)", text)
    purpose = first(r"(?:Role Purpose|Role:)\s*\n(.+)", text)
    duties = section(text, ("Areas of responsibility", "Do", "DO", "Key Responsibilities",
                            "Discovery & Assessment", "1. Hire", "1. Conduct", "1. Lead",
                            "1. Instrumental"), STOPS)
    return {"skill": skill, "exp": exp, "purpose": purpose, "duties": duties[:10], "text": text}


def exp_fields(exp: str) -> tuple[str, str]:
    m = re.match(r"(\d+)\s*-\s*(\d+)", exp)
    if m:
        return "experienced", f"{m.group(1)}–{m.group(2)} years"
    if exp.startswith(">"):
        return "experienced", f"{exp.lstrip('>').split()[0]}+ years"
    return "experienced", ""


def bullets(text: str, heading: str) -> list[str]:
    return section(text, (heading,), STOPS + ("Key Responsibilities", "Shift Timings"))


def custom(rid: str, info: dict) -> dict:
    """Extra fields for postings that print their own skills lists."""
    t = info["text"]
    if "Required Skills" in t:  # SailPoint ISC engineer
        req = bullets(t, "Required Skills")
        pref = [f"Preferred: {x}" for x in bullets(t, "Preferred Skills")]
        return {"requirements": req + pref,
                "skills": ["SailPoint ISC", "SailPoint IdentityIQ", "IAM", "RBAC", "REST APIs", "JSON"],
                "purpose": "SailPoint Identity Security Cloud (ISC) engineer for IAM work, including IdentityIQ to ISC migration and application onboarding."}
    if "Primary Skills" in t:  # SD-WAN / Cisco network postings
        prim = bullets(t, "Primary Skills")
        sec = bullets(t, "Secondary Skills")
        duties = (bullets(t, "Discovery & Assessment") + bullets(t, "Transition Activities")
                  + bullets(t, "BAU Operations"))
        return {"requirements": [f"Primary skill: {x}" for x in prim] + [f"Secondary skill: {x}" for x in sec],
                "duties": list(dict.fromkeys(duties))[:10],
                "skills": ["SD-WAN", "Cisco Viptela", "Versa", "Silver Peak", "Cisco Wireless", "Cisco Routing & Switching", "Firewalls"],
                "purpose": "Network engineer for SD-WAN, Cisco Wireless, Routing & Switching and firewall environments: discovery and assessment, transition, and L2/L3 BAU support.",
                "note": "Posting says Kochi is the preferred location; other locations may be considered."}
    if "Senior Oracle Cloud Infrastructure" in t:
        req = [tidy(x) for x in t.split("\n") if x.strip().startswith("- ")]
        req = [x for x in req if x and not x.endswith(":")]
        return {"requirements": req[:14],
                "duties": [],
                "skills": ["Oracle Cloud Infrastructure", "OCI Networking", "OCI IAM", "Terraform", "OCI Vault / KMS", "Disaster Recovery"],
                "purpose": "Senior Oracle Cloud Infrastructure (OCI) Administrator / Platform Engineer supporting operation, enhancement and adoption of OCI services.",
                "note": "Posting lists Hyderabad / Bengaluru / Gurugram / Kochi. Shift: CET hours currently, open to 24x7 when needed. Good to have: Azure, GCP, AWS, networking, server OS, Oracle middleware and databases."}
    return {}


def display_title(title: str, skill: str) -> str:
    if not skill or skill.lower() in title.lower() or title.lower().startswith(("sd-wan", "sailpoint", "cloud oracle")):
        return title
    return f"{title} – {skill}"


def city_list(r: dict) -> list[str]:
    return [c for c in (r.get("sfstd_jobLocation_obj") or []) if isinstance(c, str)]


def build(group: list[tuple[dict, dict]]) -> dict:
    group.sort(key=lambda g: g[0].get("unifiedStandardStart") and us_date(g[0]["unifiedStandardStart"]), reverse=True)
    r0, info = group[0]
    rid = r0["id"]
    title = r0["unifiedStandardTitle"].strip()
    if "|" in title:
        title = title.split("|")[0].strip()
    extra = custom(rid, info)
    exp, exp_range = exp_fields(info["exp"])
    cities = city_list(r0)
    multi = len(cities) > 1
    location = ", ".join(cities) + " (India)" if multi else "Kochi, Kerala"
    refs = [g[0]["id"] for g in group]
    links = [f"{BASE}/job/{g[0].get('urlTitle') or g[0].get('unifiedUrlTitle')}/{g[0]['id']}-en_US/" for g in group]
    ends = sorted(d for d in (us_date(g[0].get("unifiedStandardEnd", "")) for g in group) if d)
    starts = sorted(d for d in (us_date(g[0].get("unifiedStandardStart", "")) for g in group) if d)
    deadline = ends[-1] if ends else ""
    count = f"{len(refs)} openings" if len(refs) > 1 else "1 opening"
    shown = display_title(title, info["skill"])
    purpose = extra.get("purpose") or info["purpose"]
    requirements = []
    if info["exp"]:
        requirements.append(f"Experience: {info['exp']}")
    if info["skill"]:
        requirements.append(f"Mandatory skill: {info['skill']}")
    requirements += extra.get("requirements", [])
    skills = extra.get("skills") or ([info["skill"]] if info["skill"] else [])
    duties = extra.get("duties", info["duties"])
    how = f"Apply on Wipro Careers: {links[0]}"
    if links[1:]:
        how += ". Other openings with the same posting: " + " , ".join(links[1:])
    how += f". Wipro never charges candidates; report fraud to {FRAUD}."
    note = extra.get("note", "")
    contract = "(CONTRACT)" in title.upper()
    tags = ["Wipro", "Kochi"] + [s for s in skills[:2] if len(s) <= 32]
    return {
        "id": f"wipro-kochi-{re.sub(r'[^a-z0-9]+', '-', shown.lower()).strip('-')[:60].rstrip('-')}-{rid}",
        "company": "Wipro Limited",
        "logo": "assets/logos/wipro.svg",
        "companyBlurb": f"Wipro · {shown} · {location} · {exp_range or 'experience not stated'} · {count}",
        "location": location,
        "roles": [shown],
        "experience": exp,
        "experienceRange": exp_range,
        "employmentType": "Contract" if contract else "Full-time",
        "applyLink": links[0],
        "applyDeadline": deadline,
        "postedDate": POSTED,
        "source": "Wipro Careers",
        "verified": True,
        "referenceId": rid,
        "verificationNote": NOTE,
        "tags": list(dict.fromkeys(tags)),
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": "https://careers.wipro.com/",
        "address": location,
        "industry": "IT Services / Consulting",
        "companyDetails": "Wipro Limited is a technology services and consulting company. Opening listed on the official Wipro Careers site.",
        "workDetails": " ".join(x for x in (purpose, note, f"{count} on careers.wipro.com (Ref {', '.join(refs)}).") if x),
        "workStatus": "Contract" if contract else "Full-time",
        "workMode": f"On-site · {'Kochi' if not multi else ' / '.join(cities)}",
        "experienceYears": exp_range,
        "skills": skills,
        "requirements": requirements,
        "responsibilities": duties,
        "benefits": [],
        "howToApply": how,
        "hiringNotes": (
            f"Checked on careers.wipro.com Kochi search on 27 Oct 2026 — {count} (Ref {', '.join(refs)}). "
            f"Portal posted {starts[0] if starts else '?'}{' – ' + starts[-1] if len(set(starts)) > 1 else ''}"
            f"{'; listed until ' + deadline if deadline else ''}."
        ),
        "description": f"{shown} at Wipro, {location}. {purpose}".strip(),
        "startingDate": "",
        "officialLinks": {"wiproJob": links[0], "wiproKochiSearch": SEARCH},
    }


def shift_pins(text: str, by: int) -> str:
    pins = [int(n) for n in re.findall(r"pinOrder: (\d+)", text)]
    dupes = [n for n, count in Counter(pins).items() if count != 1]
    if dupes:
        raise SystemExit(f"Duplicate pinOrder values: {dupes}")
    return re.sub(r"pinOrder: (\d+)", lambda m: f"pinOrder: {int(m.group(1)) + by}", text)


def main() -> None:
    dry = "--dry-run" in sys.argv
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    have = set(re.findall(r"careers\.wipro\.com/job/[^/\"]+/(\d+)-en_US", text))
    have |= set(re.findall(r'referenceId: "(\d+)"', text))
    rows = [r for r in fetch_list() if r["id"] not in have]
    print(f"Wipro Kochi: {len(rows)} new postings")
    groups: dict[tuple, list] = {}
    for r in rows:
        url = f"{BASE}/job/{r.get('urlTitle') or r.get('unifiedUrlTitle')}/{r['id']}-en_US/"
        info = parse(r, page_text(get(url)))
        key = (r["unifiedStandardTitle"].strip().upper(), info["skill"], info["exp"], tuple(city_list(r)) if len(city_list(r)) > 1 else ())
        groups.setdefault(key, []).append((r, info))
    jobs = [build(g) for g in groups.values()]
    jobs.sort(key=lambda j: j["hiringNotes"], reverse=False)
    if dry:
        for job in jobs:
            print(json.dumps(job, indent=1, ensure_ascii=False))
        return
    fresh = [j for j in jobs if f'id: "{j["id"]}"' not in text]
    if not fresh:
        print("No new Wipro Kochi jobs")
        return
    for i, job in enumerate(fresh, start=1):
        job["pinOrder"] = i
    text = shift_pins(text, len(fresh))
    block = ",\n".join(mod.render_job(item) for item in fresh) + ",\n"
    needle = "var JOBS = [\n"
    if needle not in text:
        raise SystemExit("JOBS array not found")
    path.write_text(text.replace(needle, needle + block, 1), encoding="utf-8")
    print(f"Added {len(fresh)} Wipro Kochi listings (pinned)")
    for job in fresh:
        print(" -", job["roles"][0], "|", job["experienceRange"], "|", job["applyDeadline"])


if __name__ == "__main__":
    main()
