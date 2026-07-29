#!/usr/bin/env python3
"""Local static server that mirrors GitHub Pages /job/<id> routing via 404.html."""

from __future__ import annotations

import argparse
import http.server
import re
import socketserver
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
JOB_PATH = re.compile(r"^/job/[^/]+/?$", re.I)


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        parsed = urlparse(self.path)
        path = unquote(parsed.path or "/")
        if JOB_PATH.match(path):
            self.path = "/404.html"
        return super().do_GET()

    def do_HEAD(self):
        parsed = urlparse(self.path)
        path = unquote(parsed.path or "/")
        if JOB_PATH.match(path):
            self.path = "/404.html"
        return super().do_HEAD()

    def log_message(self, fmt, *args):
        print("%s - %s" % (self.address_string(), fmt % args))


def main():
    parser = argparse.ArgumentParser(description="Serve InfoparkDaily with /job/<id> routes")
    parser.add_argument("--port", "-p", type=int, default=8080)
    args = parser.parse_args()

    class ThreadingHTTPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
        allow_reuse_address = True
        daemon_threads = True

    with ThreadingHTTPServer(("", args.port), Handler) as httpd:
        print(f"Serving {ROOT} at http://127.0.0.1:{args.port}/", flush=True)
        print("Job routes: http://127.0.0.1:%s/job/<id>" % args.port, flush=True)
        httpd.serve_forever()


if __name__ == "__main__":
    main()
