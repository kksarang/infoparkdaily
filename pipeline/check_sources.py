#!/usr/bin/env python3
"""Probe every registry source once and record reachability in reports/source-runs.json.

One GET per source, no retries beyond a single timeout, no bypassing of bot checks.
A failed or blocked probe is recorded as such; it never means "no vacancies".

Usage: python3 -m pipeline.check_sources
"""

from __future__ import annotations

import json
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REGISTRY = ROOT / "pipeline" / "registry.json"
RUNS = ROOT / "reports" / "source-runs.json"
UA = "InfoparkDaily-source-check/1.0 (+https://infoparkdaily.online/)"
# Challenge / denial pages only; many normal pages mention "captcha" in a form script.
BLOCK_MARKERS = ("<title>Just a moment...</title>", "<TITLE>Access Denied</TITLE>", "_cf_chl_opt")


def probe(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            head = resp.read(20000).decode("utf-8", "replace")
            blocked = any(marker in head for marker in BLOCK_MARKERS)
            return {"ok": not blocked, "http": resp.status, "result": "blocked" if blocked else "reachable"}
    except urllib.error.HTTPError as exc:
        body = exc.read(20000).decode("utf-8", "replace") if exc.fp else ""
        blocked = exc.code in (401, 403, 429) or any(marker in body for marker in BLOCK_MARKERS)
        return {"ok": False, "http": exc.code, "result": "blocked" if blocked else "http-error"}
    except Exception as exc:  # DNS, TLS, timeout
        return {"ok": False, "http": None, "result": "unreachable", "error": str(exc)[:200]}


def main() -> None:
    sources = json.loads(REGISTRY.read_text(encoding="utf-8"))["sources"]
    previous = json.loads(RUNS.read_text(encoding="utf-8")) if RUNS.exists() else {}
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    runs = {}
    for source in sources:
        prev = previous.get(source["key"], {})
        if not source.get("probe"):
            runs[source["key"]] = {**prev, "result": "not-probed", "checked": now}
            continue
        outcome = probe(source["probe"])
        last_ok = now if outcome["ok"] else prev.get("last_success")
        runs[source["key"]] = {**outcome, "checked": now, "last_success": last_ok}
        print(f"{source['key']:<20} {outcome['result']:<12} {outcome.get('http')}")
    RUNS.parent.mkdir(parents=True, exist_ok=True)
    RUNS.write_text(json.dumps(runs, indent=1) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
