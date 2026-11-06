#!/usr/bin/env python3
"""Add new Accenture Kochi openings — 6 Nov 2026, pinned at the top.

Source: https://www.accenture.com/in-en/careers/jobsearch?ct=Kochi
Reuses the 21 Oct Kerala importer, limited to Kochi; skips requisitions
already in jobs-data.js.
"""

from __future__ import annotations

import importlib.util
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("acn_oct21", ROOT / "scripts" / "add-accenture-kerala-oct21.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)


def main() -> None:
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    existing = set(base.REQ_RE.findall(text))
    fresh = [j for j in base.fetch_location("Kochi") if j["requisitionId"] not in existing]
    fresh.sort(key=lambda j: str(j.get("updateDate") or ""), reverse=True)
    if not fresh:
        print("No new Accenture Kochi jobs")
        return
    records = []
    for i, raw in enumerate(fresh, start=1):
        job = base.build(raw, i)
        job["id"] = job["id"].replace("-oct2026", "-nov2026")
        job["hiringNotes"] += " · Checked 6 Nov 2026"
        records.append(job)
    pins = [int(n) for n in re.findall(r"pinOrder: (\d+)", text)]
    dupes = [n for n, c in Counter(pins).items() if c != 1]
    if dupes:
        raise SystemExit(f"Duplicate pinOrder values: {dupes}")
    text = re.sub(r"pinOrder: (\d+)", lambda m: f"pinOrder: {int(m.group(1)) + len(records)}", text)
    block = ",\n".join(base.mod.render_job(r) for r in records) + ",\n"
    path.write_text(text.replace("var JOBS = [\n", "var JOBS = [\n" + block, 1), encoding="utf-8")
    print(f"Added {len(records)} Accenture Kochi jobs (pinned)")
    for r in records:
        print(" -", r["roles"][0], r["experienceRange"], r["applyLink"])


if __name__ == "__main__":
    main()
