#!/usr/bin/env python3
"""Add new Wipro Kochi openings for 10 Nov 2026, using the 29 Oct importer.

Also reads the singular "Area of Responsibility" heading some postings use, and
rejoins duty lines the posting breaks mid-sentence (line ending with a comma).
"""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("wipro_oct29", ROOT / "scripts" / "add-wipro-kochi-oct29.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
base.POSTED = "2026-11-10"
original_build = base.build
original_parse = base.parse


def join_broken(lines: list[str]) -> list[str]:
    out: list[str] = []
    for line in lines:
        if out and out[-1].endswith(","):
            out[-1] = f"{out[-1]} {line}"
        else:
            out.append(line)
    return out


def parse(raw: dict, text: str) -> dict:
    info = original_parse(raw, text)
    if not info["duties"]:
        info["duties"] = base.section(text, ("Area of Responsibility",), base.STOPS)[:10]
    info["duties"] = join_broken(info["duties"])
    return info


def build(group: list) -> dict:
    job = original_build(group)
    job["hiringNotes"] = job["hiringNotes"].replace("on 29 Oct 2026", "on 10 Nov 2026")
    return job


base.parse = parse
base.build = build

if __name__ == "__main__":
    base.main()
