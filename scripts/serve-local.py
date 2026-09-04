#!/usr/bin/env python3
"""Local static server that mirrors GitHub Pages SPA routes.

Serves 404.html for /job/* and /company/* so job detail pages work locally.
"""

from __future__ import annotations

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):  # noqa: N802
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        if self._is_spa_route(path):
            self.path = "/404.html"
        return super().do_GET()

    @staticmethod
    def _is_spa_route(path: str) -> bool:
        parts = [p for p in path.strip("/").split("/") if p]
        if len(parts) >= 1 and parts[0] in {"job", "company"} and len(parts) == 2:
            # Only rewrite missing deep links; let real files win if they exist.
            candidate = ROOT.joinpath(*parts)
            if candidate.is_file() or (candidate / "index.html").is_file():
                return False
            return True
        return False


def main() -> None:
    parser = argparse.ArgumentParser(description="InfoparkDaily local server")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8080)
    args = parser.parse_args()
    server = ThreadingHTTPServer((args.host, args.port), Handler)
    print(f"Serving {ROOT} at http://{args.host}:{args.port}/")
    print("SPA routes enabled: /job/<id> and /company/<id>")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
