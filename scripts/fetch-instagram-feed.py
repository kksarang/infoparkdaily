#!/usr/bin/env python3
"""Sync the latest Instagram reels and posters into data/instagram-feed.js.

Runs from .github/workflows/instagram-feed.yml every few hours. Each account
needs a long-lived Instagram API token (Instagram API with Instagram Login) in
an environment variable:

    IG_TOKEN_INFOPARKDAILY       -> @infoparkdaily
    IG_TOKEN_INFOPARKDAILY_JOBS  -> @infoparkdaily.jobs

Accounts without a token are skipped and their previously synced posts kept.
Cover images are saved to assets/instagram/ because Instagram's media URLs
expire; videos stay on Instagram and open through their permalink.
"""

from __future__ import annotations

import json
import os
import re
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "instagram-feed.js"
IMG_DIR = ROOT / "assets" / "instagram"
GRAPH = "https://graph.instagram.com"
PER_ACCOUNT = 30

ACCOUNTS = [
    {"key": "infoparkdaily", "handle": "@infoparkdaily", "env": "IG_TOKEN_INFOPARKDAILY"},
    {"key": "infoparkdaily-jobs", "handle": "@infoparkdaily.jobs", "env": "IG_TOKEN_INFOPARKDAILY_JOBS"},
]
FIELDS = "id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url,thumbnail_url}"


def get_json(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": "InfoparkDaily-feed/1.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read().decode("utf-8"))


def refresh(token: str) -> None:
    """Extend the long-lived token's 60-day life; failures are non-fatal."""
    try:
        get_json(f"{GRAPH}/refresh_access_token?grant_type=ig_refresh_token&access_token={urllib.parse.quote(token)}")
    except Exception as exc:  # token may be < 24h old, which Instagram refuses to refresh
        print(f"  token refresh skipped: {exc}")


def fetch_media(token: str) -> list[dict]:
    url = f"{GRAPH}/me/media?fields={urllib.parse.quote(FIELDS)}&limit={PER_ACCOUNT}&access_token={urllib.parse.quote(token)}"
    return (get_json(url).get("data") or [])[:PER_ACCOUNT]


def cover_url(item: dict) -> str:
    if item.get("media_type") == "VIDEO":
        return item.get("thumbnail_url") or ""
    if item.get("media_type") == "CAROUSEL_ALBUM":
        first = ((item.get("children") or {}).get("data") or [{}])[0]
        return first.get("thumbnail_url") or first.get("media_url") or item.get("media_url") or ""
    return item.get("media_url") or ""


def save_cover(media_id: str, url: str) -> str:
    path = IMG_DIR / f"{media_id}.jpg"
    if not path.exists():
        req = urllib.request.Request(url, headers={"User-Agent": "InfoparkDaily-feed/1.0"})
        with urllib.request.urlopen(req, timeout=60) as resp:
            path.write_bytes(resp.read())
    return f"/assets/instagram/{path.name}"


def caption_parts(caption: str) -> tuple[str, str]:
    text = re.sub(r"\s+", " ", caption or "").strip()
    title = re.split(r"(?<=[.!?])\s|\s#", text, maxsplit=1)[0].strip() or text
    return title[:120], text[:600]


def load_existing() -> list[dict]:
    if not DATA.exists():
        return []
    match = re.search(r"var INSTAGRAM_FEED = (\{.*\});", DATA.read_text(encoding="utf-8"), re.S)
    return json.loads(match.group(1)).get("posts", []) if match else []


def main() -> None:
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    existing = load_existing()
    posts: list[dict] = []
    synced: list[str] = []
    for account in ACCOUNTS:
        token = os.environ.get(account["env"], "").strip()
        if not token:
            print(f"{account['handle']}: no token ({account['env']}), keeping previous posts")
            posts += [p for p in existing if p.get("account") == account["key"]]
            continue
        refresh(token)
        try:
            items = fetch_media(token)
        except Exception as exc:
            print(f"{account['handle']}: fetch failed ({exc}), keeping previous posts")
            posts += [p for p in existing if p.get("account") == account["key"]]
            continue
        for item in items:
            url = cover_url(item)
            if not url:
                continue
            try:
                image = save_cover(item["id"], url)
            except Exception as exc:
                print(f"  cover failed {item['id']}: {exc}")
                continue
            title, caption = caption_parts(item.get("caption") or "")
            is_video = item.get("media_type") == "VIDEO"
            posts.append({
                "id": item["id"],
                "account": account["key"],
                "handle": account["handle"],
                "type": "video" if is_video else "poster",
                "isReel": item.get("media_product_type") == "REELS",
                "isAlbum": item.get("media_type") == "CAROUSEL_ALBUM",
                "title": title,
                "caption": caption,
                "image": image,
                "permalink": item.get("permalink") or "",
                "date": (item.get("timestamp") or "")[:10],
                "timestamp": item.get("timestamp") or "",
            })
        synced.append(account["handle"])
        print(f"{account['handle']}: {len(items)} items")

    posts.sort(key=lambda p: p.get("timestamp") or "", reverse=True)
    keep = {Path(p["image"]).name for p in posts}
    for path in IMG_DIR.glob("*.jpg"):
        if path.name not in keep:
            path.unlink()

    if posts == existing and DATA.exists():
        print("Feed unchanged")
        return
    feed = {
        "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "accounts": [{"key": a["key"], "handle": a["handle"]} for a in ACCOUNTS],
        "posts": posts,
    }
    header = "/* Generated by scripts/fetch-instagram-feed.py — do not edit by hand. */\n"
    DATA.write_text(header + "var INSTAGRAM_FEED = " + json.dumps(feed, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
    print(f"Wrote {len(posts)} posts ({', '.join(synced) or 'no accounts synced'})")


if __name__ == "__main__":
    sys.exit(main())
