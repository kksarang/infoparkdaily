#!/usr/bin/env python3
"""Fill requirements / responsibilities / benefits for park jobs imported on 2 Nov 2026."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("enrich_oct30", ROOT / "scripts" / "enrich-park-details-oct30.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
base.DAY = "2026-11-02"


if __name__ == "__main__":
    base.main()
