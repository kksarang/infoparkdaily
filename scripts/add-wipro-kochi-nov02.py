#!/usr/bin/env python3
"""Add new Wipro Kochi openings for 2 Nov 2026, using the 29 Oct importer."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("wipro_oct29", ROOT / "scripts" / "add-wipro-kochi-oct29.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
base.POSTED = "2026-11-02"
original_build = base.build


def build(group: list) -> dict:
    job = original_build(group)
    job["hiringNotes"] = job["hiringNotes"].replace("on 29 Oct 2026", "on 2 Nov 2026")
    return job


base.build = build

if __name__ == "__main__":
    base.main()
