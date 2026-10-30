#!/usr/bin/env python3
"""Add Advenxa careers openings for 30 Oct 2026 that are not already in jobs-data.js.

Source: https://advenxa.zohorecruit.in/jobs/Careers
"""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("advenxa_oct29", ROOT / "scripts" / "add-advenxa-jobs-oct29.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
base.POSTED = "2026-10-30"


if __name__ == "__main__":
    base.main()
