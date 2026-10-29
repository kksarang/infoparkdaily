#!/usr/bin/env python3
"""Import new Cyberpark Kozhikode careers listings and pin them at the top."""

from __future__ import annotations

import importlib.util
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)


def shift_pins(text: str, by: int) -> str:
    pins = [int(n) for n in re.findall(r"pinOrder: (\d+)", text)]
    dupes = [n for n, count in Counter(pins).items() if count != 1]
    if dupes:
        raise SystemExit(f"Duplicate pinOrder values: {dupes}")

    def repl(match: re.Match[str]) -> str:
        return f"pinOrder: {int(match.group(1)) + by}"

    return re.sub(r"pinOrder: (\d+)", repl, text)


def main() -> None:
    jobs = mod.build_cyberpark_kozhikode()
    path = ROOT / "data" / "jobs-data.js"
    extra = ROOT / "data" / "cyberpark-jobs-data.js"
    text = path.read_text(encoding="utf-8")
    extra_text = extra.read_text(encoding="utf-8") if extra.exists() else ""
    blob = text + extra_text
    fresh = []
    for job in jobs:
        suffix = job["id"].rsplit("-", 1)[-1]
        if f'id: "{job["id"]}"' in blob:
            continue
        if f"post {suffix}" in blob:
            continue
        fresh.append(job)
    if not fresh:
        print("No new Cyberpark Kozhikode jobs")
        return
    for index, job in enumerate(fresh, start=1):
        job["pinOrder"] = index
        print(f"{index:02d}. {job['company']} — {job['roles'][0]}")
    if extra.exists():
        mod.insert_jobs(extra, "CYBERPARK_VERIFIED_JOBS", fresh)
    text = path.read_text(encoding="utf-8")
    text = shift_pins(text, len(fresh))
    block = ",\n".join(mod.render_job(item) for item in fresh) + ",\n"
    needle = "var JOBS = [\n"
    if needle not in text:
        raise SystemExit("JOBS array not found")
    path.write_text(text.replace(needle, needle + block, 1), encoding="utf-8")
    print(f"Added {len(fresh)} Cyberpark jobs to jobs-data.js")


if __name__ == "__main__":
    main()
