#!/usr/bin/env python3
"""Add Infopark portal jobs posted before the usual cutoff that are still open.

Keeps the portal's posted date and sets no pinOrder, so old posts stay out of the
pinned block. Skips roles already listed under another entry for the same company.
"""

from __future__ import annotations

import importlib.util
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)


def norm(value: str) -> str:
    return re.sub(r"[^a-z0-9]", "", value.lower())


def already_listed(job: dict, blocks: list[tuple[str, str]]) -> bool:
    first = norm(job["company"].split()[0])
    title = norm(job["roles"][0])
    return any(norm(company).startswith(first) and title in norm(roles) for company, roles in blocks)


def main() -> None:
    mod.INFOPARK_MIN_POSTED = "2000-01-01"
    path = ROOT / "data" / "jobs-data.js"
    extra = ROOT / "data" / "infopark-jobs-data.js"
    text = path.read_text(encoding="utf-8")
    blocks = re.findall(r'\n    company: "([^"]*)",.*?\n    roles: (\[.*?\]),', text, re.S)
    fresh = []
    for job in mod.build_infopark():
        if already_listed(job, blocks):
            print(f"skip, already listed: {job['company']} — {job['roles'][0]}")
            continue
        fresh.append(job)
        print(f"{job['postedDate']} {job['applyDeadline']} {job['company']} — {job['roles'][0]}")
    if not fresh:
        print("No older open Infopark jobs")
        return
    mod.insert_jobs(extra, "INFOPARK_VERIFIED_JOBS", fresh)
    block = ",\n".join(mod.render_job(item) for item in fresh) + ",\n"
    needle = "var JOBS = [\n"
    path.write_text(text.replace(needle, needle + block, 1), encoding="utf-8")
    print(f"Added {len(fresh)} older open Infopark jobs")


if __name__ == "__main__":
    main()
