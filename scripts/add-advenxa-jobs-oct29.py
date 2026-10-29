#!/usr/bin/env python3
"""Add Advenxa careers openings that are not already in jobs-data.js.

Source: https://advenxa.zohorecruit.in/jobs/Careers
"""

from __future__ import annotations

import importlib.util
import re
import time
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
POSTED = "2026-10-29"

spec = importlib.util.spec_from_file_location(
    "advenxa_oct19", ROOT / "scripts" / "add-advenxa-jobs-oct19.py"
)
src = importlib.util.module_from_spec(spec)
spec.loader.exec_module(src)

park = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(park)
park.loader.exec_module(mod)


def salary_line(text: str, fallback: str) -> str:
    match = re.search(r"Salary\s*:\s*(.+)", text, re.I)
    if match:
        value = src.tidy(match.group(1))
        if value and not re.search(r"industry standard|not disclosed|as per", value, re.I):
            return value
    return fallback


def qualification_line(text: str) -> str:
    match = re.search(r"Qualification\s*:\s*(.+)", text, re.I)
    return src.tidy(match.group(1)) if match else ""


def shift_pins(text: str, by: int) -> str:
    pins = [int(n) for n in re.findall(r"pinOrder: (\d+)", text)]
    dupes = [n for n, count in Counter(pins).items() if count != 1]
    if dupes:
        raise SystemExit(f"Duplicate pinOrder values: {dupes}")

    def repl(match: re.Match[str]) -> str:
        return f"pinOrder: {int(match.group(1)) + by}"

    return re.sub(r"pinOrder: (\d+)", repl, text)


def main() -> None:
    listing = src.fetch_json(src.LIST_URL)
    rows = listing.get("data") or []
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    fresh = []
    for row in rows:
        zoho_id = str(row["id"])
        if zoho_id[-6:] in text and f"advenxa-" in text:
            # Match the stable id suffix used by the earlier importer.
            if re.search(rf'id: "advenxa-[^"]*{re.escape(zoho_id[-6:])}"', text):
                continue
        detail_payload = src.fetch_json(src.DETAIL_URL.format(id=zoho_id))
        detail = detail_payload.get("data") or {}
        if isinstance(detail, list):
            detail = detail[0] if detail else {}
        job = src.build_job(row, detail)
        if f'id: "{job["id"]}"' in text:
            continue
        plain = src.html_to_text(detail.get("Job_Description") or "")
        job["postedDate"] = POSTED
        job["pinOrder"] = len(fresh) + 1
        salary = salary_line(plain, job.get("salaryRange") or "")
        if salary:
            job["salaryRange"] = salary
        qualification = qualification_line(plain)
        if qualification:
            job["qualification"] = qualification
        shift = re.search(r"Shift\s*:\s*(.+)", plain, re.I)
        if shift:
            job["workMode"] = src.tidy(shift.group(1))
        job["hiringNotes"] = (
            f"Checked on the Advenxa careers page on {POSTED}."
            + (f" Date opened on that page: {src.tidy(detail.get('Date_Opened') or '')}." if detail.get("Date_Opened") else "")
        )
        fresh.append(job)
        print(f"{job['pinOrder']:02d}. {job['location']} — {job['roles'][0]}")
        time.sleep(0.12)
    if not fresh:
        print("No new Advenxa jobs")
        return
    text = shift_pins(text, len(fresh))
    block = ",\n".join(mod.render_job(item) for item in fresh) + ",\n"
    needle = "var JOBS = [\n"
    if needle not in text:
        raise SystemExit("JOBS array not found")
    path.write_text(text.replace(needle, needle + block, 1), encoding="utf-8")
    print(f"Added {len(fresh)} Advenxa jobs")


if __name__ == "__main__":
    main()
