#!/usr/bin/env python3
"""Fill requirements / responsibilities / benefits for park jobs imported on 29 Oct 2026.

The park importers only read a few fixed headings ("Requirements", "Key
Responsibilities"). Postings use many other headings ("What We're Looking For",
"Must-Have Skills", "Qualifications" ...), so this pass re-reads each official
detail page, splits it on any heading line, and patches only the fields it can
fill. Fields are replaced in place so pinOrder and other keys are kept.

Only text printed on the posting is used; nothing is added when a page has no
matching section.
"""

from __future__ import annotations

import html as htmllib
import importlib.util
import json
import re
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

DAY = "2026-10-29"
FILES = {
    "ipv": [ROOT / "data" / "jobs-data.js", ROOT / "data" / "infopark-jobs-data.js"],
    "tpv": [ROOT / "data" / "jobs-data.js", ROOT / "data" / "technopark-jobs-data.js"],
}

KINDS = [
    ("apply", r"how to apply|to apply|application process|interested candidates|apply now"),
    ("benefits", r"benefit|perks|what we offer|we offer|why join|why work|compensation|salary"),
    ("responsibilities", r"responsib|duties|what you('|’)?ll do|what you will do|your role|the role|role overview|key tasks|job description|scope of work|day[- ]to[- ]day"),
    ("requirements", r"requir|qualif|looking for|must[- ]have|skills|eligib|experience|who you are|who can apply|preferred|nice to have|good to have|education|candidate profile|what you bring|you have|technical|expect|ideal candidate"),
]
APPLY_LINE = re.compile(r"share (your )?(updated )?(resume|cv)|send (your )?(resume|cv)|(e-?)?mail (your )?(updated )?(resumes?|cv)|kindly share|apply (now|at|via|to)|interested candidates", re.I)
SKIP_LINE = re.compile(r"^(location|job location|work location|salary|ctc|shift|job type|employment type)\s*:", re.I)


def heading_kind(line: str) -> str | None:
    bare = line.strip().strip("*:#-–•").strip()
    if not bare or len(bare) > 60 or bare.endswith((".", ",", ";")):
        return None
    if re.match(r"^[-•*]\s", line.strip()):
        return None
    if len(bare.split()) > 8:
        return None
    low = bare.lower()
    for kind, pat in KINDS:
        if re.search(pat, low):
            return kind
    return None


def split_sections(text: str) -> tuple[str, dict[str, list[str]]]:
    intro: list[str] = []
    out: dict[str, list[str]] = {"requirements": [], "responsibilities": [], "benefits": [], "apply": []}
    current = None
    for raw in text.split("\n"):
        line = raw.strip()
        if not line:
            continue
        kind = heading_kind(line)
        inline = re.match(r"^([A-Za-z’' /&-]{3,40}):\s*(.{12,})$", line)
        if kind is None and inline and heading_kind(inline.group(1)):
            kind = heading_kind(inline.group(1))
            line = inline.group(2)
        elif kind is not None:
            current = kind
            continue
        if kind is not None:
            current = kind
        item = re.sub(r"^(?:[-•*·▪➢✓✔➤►]+|\d{1,2}[.)])\s*", "", line).strip().rstrip(";")
        if current is None:
            intro.append(line)
            continue
        if APPLY_LINE.search(item):
            out["apply"].append(item)
            continue
        if SKIP_LINE.match(item):
            continue
        if current == "benefits" and re.search(r"\b(is|are) (looking|seeking|hiring)\b", item, re.I):
            intro.append(item)
            continue
        words = item.split()
        if current != "requirements" and len(words) <= 3 and not re.search(r"[.,;:]", item):
            continue  # sub-heading such as "Graphic Design"
        if 8 <= len(item) <= 320:
            out[current].append(item.rstrip(".") if not item.endswith("etc.") else item)
    for key in out:
        out[key] = list(dict.fromkeys(out[key]))[:16]
    return "\n".join(intro).strip(), out


def html_text(fragment: str) -> str:
    s = re.sub(r"<(script|style)[\s\S]*?</\1>", "", fragment or "", flags=re.I)
    s = re.sub(r"<(br|/p|/li|/div|/h\d|/tr|/ul|/ol)[^>]*>", "\n", s, flags=re.I)
    s = re.sub(r"<li[^>]*>", "\n- ", s, flags=re.I)
    s = htmllib.unescape(re.sub(r"<[^>]+>", " ", s)).replace("\xa0", " ")
    s = re.sub(r"[\u200b-\u200f\u2060\ufeff]", "", s)
    s = re.sub(r"[ \t]+", " ", s)
    return re.sub(r"\n\s*\n+", "\n", s).strip()


def js(value) -> str:
    if isinstance(value, str):
        return mod.js_str(value)
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, list) and all(isinstance(x, str) for x in value):
        return "[" + ", ".join(mod.js_str(x) for x in value) + "]" if value else "[]"
    return json.dumps(value)


def patch(path: Path, jid: str, fields: dict) -> bool:
    text = path.read_text(encoding="utf-8")
    span = mod.find_job_span(text, jid)
    if not span:
        return False
    start, end = span
    block = text[start:end]
    for key, value in fields.items():
        line_re = re.compile(rf"^    {re.escape(key)}: .*,$", re.M)
        new_line = f"    {key}: {js(value)},"
        if line_re.search(block):
            block = line_re.sub(lambda _m: new_line, block, count=1)
        else:
            block = block.replace("\n  }", f"\n{new_line}\n  }}", 1)
    path.write_text(text[:start] + block + text[end:], encoding="utf-8")
    return True


def targets(prefix: str) -> list[dict]:
    text = (ROOT / "data" / "jobs-data.js").read_text(encoding="utf-8")
    out = []
    for m in re.finditer(rf'    id: "({prefix}-[^"]+)"', text):
        start, end = mod.find_job_span(text, m.group(1))
        block = text[start:end]
        if DAY not in mod.extract_js_string(block, "hiringNotes"):
            continue
        out.append({
            "id": m.group(1),
            "title": (mod.extract_js_list(block, "roles") or [""])[0],
            "link": mod.extract_js_string(block, "applyLink"),
            "official": re.search(r'"(https://[^"]+/(?:company-jobs/details|job-details)/[^"]+)"', block),
            "requirements": mod.extract_js_list(block, "requirements"),
            "responsibilities": mod.extract_js_list(block, "responsibilities"),
            "benefits": mod.extract_js_list(block, "benefits"),
            "experienceRange": mod.extract_js_string(block, "experienceRange"),
            "workDetails": mod.extract_js_string(block, "workDetails"),
        })
    return out


def common_fields(job: dict, body: str) -> dict:
    intro, sec = split_sections(body)
    fields: dict = {}
    for key in ("requirements", "responsibilities", "benefits"):
        if not job[key] and sec[key]:
            fields[key] = sec[key]
    if not job["experienceRange"]:
        exp, exp_range = mod.infer_exp_from_text(job["title"], body)
        if exp_range:
            fields["experience"] = exp
            fields["experienceRange"] = exp_range
            fields["experienceYears"] = exp_range
    return fields, intro, sec


def enrich_infopark(job: dict) -> dict:
    m = job["official"]
    if not m:
        return {}
    url = m.group(1)
    page = mod.fetch(url)
    body_m = re.search(r'<div class="comp-job-deatiil">([\s\S]*?)</div>\s*</div>', page)
    body = html_text(body_m.group(1) if body_m else "")
    body = re.sub(r"^[^\n]*\n", "", body, count=1)  # drop the repeated job title line
    fields, intro, _ = common_fields(job, body)
    return fields


def enrich_technopark(job: dict) -> dict:
    m = job["official"]
    if not m:
        return {}
    url = m.group(1)
    page = mod.fetch(url)
    dm = re.search(r'data-page="([^"]+)"', page)
    if not dm:
        return {}
    data = json.loads(htmllib.unescape(dm.group(1)))
    jl = (data.get("props") or {}).get("jobListing") or {}
    if str(jl.get("id")) not in url:
        return {}
    body = html_text(jl.get("job_description") or "")
    fields, intro, _ = common_fields(job, body)
    # Technopark's "preferred skills" box; companies often put required skills here.
    _, pref_sec = split_sections("Skills\n" + html_text(jl.get("preferred_skills") or ""))
    extra = pref_sec["requirements"] + pref_sec["responsibilities"]
    if extra:
        reqs = fields.get("requirements", job["requirements"])
        fields["requirements"] = list(dict.fromkeys(reqs + extra))[:20]
    if intro:
        para = intro if len(intro) <= 1500 else intro[:1500].rsplit(" ", 1)[0] + "…"
        fields["workDetails"] = para
        first = next((p for p in intro.split("\n") if len(p) > 40), intro.split("\n")[0])
        fields["description"] = first[:400]
    email = (jl.get("contact_email") or "").strip()
    if email and re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email):
        fields["email"] = email
        fields["howToApply"] = f"Email {email} or apply via the official Technopark listing: {url}"
    comp = jl.get("company") or {}
    if comp.get("website"):
        fields["website"] = comp["website"]
    if comp.get("address"):
        addr = re.sub(r"\s*[\r\n]+\s*", ", ", comp["address"].strip()).strip(", ")
        fields["address"] = addr if "thiruvananthapuram" in addr.lower() else f"{addr}, Thiruvananthapuram, Kerala"
    if jl.get("walk_in_address_content"):
        fields["walkInAddress"] = html_text(jl["walk_in_address_content"])
    return fields


def main() -> None:
    which = sys.argv[1:] or ["ipv", "tpv"]
    for prefix in which:
        jobs = targets(prefix)
        filled = 0
        for job in jobs:
            try:
                fields = enrich_infopark(job) if prefix == "ipv" else enrich_technopark(job)
            except Exception as exc:  # network / parse issues: leave the job as imported
                print(f"  fail {job['id']}: {exc}")
                continue
            if fields:
                for path in FILES[prefix]:
                    patch(path, job["id"], fields)
                filled += 1
            time.sleep(0.15)
        print(f"{prefix}: {len(jobs)} jobs from {DAY}, patched {filled}")


if __name__ == "__main__":
    main()
