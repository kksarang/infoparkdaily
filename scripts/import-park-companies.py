#!/usr/bin/env python3
"""Import official company directories from Infopark, Technopark, and Cyberpark.

Only fields published by the park sites are stored. Missing values stay empty.
"""

from __future__ import annotations

import json
import re
import time
import urllib.error
import urllib.request
from datetime import date
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TODAY = date(2026, 8, 30)
UA = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    )
}


def fetch(url: str) -> str:
    last_err = None
    for attempt in range(8):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=60) as resp:
                return resp.read().decode("utf-8", "replace")
        except urllib.error.HTTPError as err:
            last_err = err
            if err.code == 404:
                raise
            if err.code in (429, 503) and attempt < 7:
                wait = 4 * (attempt + 1)
                print(f"  {err.code} on {url} — retry in {wait}s")
                time.sleep(wait)
                continue
            raise
        except urllib.error.URLError as err:
            last_err = err
            if attempt < 7:
                time.sleep(2 * (attempt + 1))
                continue
            raise
    raise last_err


def slugify(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", unescape(text or "").lower()).strip("-")
    return s[:80].rstrip("-") or "company"


def clean(text: str) -> str:
    t = unescape(re.sub(r"<[^>]+>", " ", text or ""))
    t = re.sub(r"<!--.*?-->", " ", t, flags=re.S)
    t = re.sub(r"\s+", " ", t).strip()
    t = re.sub(r"\bCityname,?\s*ST\b", " ", t, flags=re.I)
    return re.sub(r"\s+", " ", t).strip(" ,")


def abs_url(url: str, base: str) -> str:
    url = (url or "").strip()
    if not url:
        return ""
    if url.startswith("//"):
        return "https:" + url
    if url.startswith("/"):
        return base.rstrip("/") + url
    if url.startswith("http://") or url.startswith("https://"):
        return url
    return "https://" + url.lstrip("/")


def strip_comments(html: str) -> str:
    return re.sub(r"<!--.*?-->", "", html, flags=re.S)


def write_js(path: Path, var_name: str, companies: list[dict], source: str) -> None:
    payload = json.dumps(companies, ensure_ascii=False, indent=2)
    path.write_text(
        f"/**\n * Official company directory — {source}\n"
        f" * Imported {TODAY.isoformat()}. Empty fields were not published by the park site.\n"
        f" */\nvar {var_name} = {payload};\n",
        encoding="utf-8",
    )
    print(f"  {len(companies)} → {path.name}")


def scrape_infopark() -> list[dict]:
    out: list[dict] = []
    seen: set[str] = set()
    for page in range(1, 16):
        url = "https://infopark.in/companies" if page == 1 else f"https://infopark.in/companies?page={page}"
        html = fetch(url)
        blocks = re.findall(r'<div class="compy">([\s\S]*?)</div>\s*(?:<div class="compy">|$)', html)
        if not blocks:
            break
        count_before = len(out)
        for raw in re.findall(r'<div class="compy">([\s\S]*?)<div class="btn-sec">([\s\S]*?)</div>\s*</div>', html):
            body, btns = raw
            visible = strip_comments(body)
            name = clean(re.search(r"<h5>([\s\S]*?)</h5>", body).group(1) if re.search(r"<h5>", body) else "")
            if not name:
                continue
            slug = slugify(name)
            if slug in seen:
                continue
            seen.add(slug)
            logo_m = re.search(r'<img[^>]+src="([^"]+)"', visible)
            phone_m = re.search(r'<div class="phone">[\s\S]*?</i>\s*([^<]+)', visible)
            web_m = re.search(r'<div class="web">[\s\S]*?</i>\s*([^<]+)', visible)
            mail_m = re.search(r'<div class="mail">[\s\S]*?</i>\s*([^<]+)', visible)
            domains = [clean(x) for x in re.findall(r"<span>([^<]+)</span>", visible) if clean(x)]
            profile_m = re.search(r'href="(https://infopark.in/companies-profile/[^"]+)"', btns)
            jobs_m = re.search(r'href="(https://infopark.in/jobs/\d+)"', btns)
            out.append(
                {
                    "slug": slug,
                    "name": name,
                    "park": "Infopark",
                    "logo": abs_url(logo_m.group(1) if logo_m else "", "https://infopark.in"),
                    "website": abs_url(clean(web_m.group(1) if web_m else ""), ""),
                    "phone": clean(phone_m.group(1) if phone_m else ""),
                    "email": clean(mail_m.group(1) if mail_m else ""),
                    "address": "",
                    "building": "",
                    "domains": domains,
                    "contactPerson": "",
                    "designation": "",
                    "officialUrl": profile_m.group(1) if profile_m else "",
                    "jobsUrl": jobs_m.group(1) if jobs_m else "",
                    "sourceUrl": "https://infopark.in/companies",
                }
            )
        if len(out) == count_before:
            break
        time.sleep(0.25)
    out.sort(key=lambda c: c["name"].lower())
    return out


def scrape_technopark() -> list[dict]:
    time.sleep(2)
    rows = json.loads(fetch("https://technopark.in/api/companies?page=1"))
    logos: dict[str, str] = {}
    ids: dict[str, str] = {}
    page = 1
    last = 1
    try:
        while page <= last:
            data = json.loads(fetch(f"https://technopark.in/api/paginated-companies?page={page}"))
            last = int(data.get("last_page") or 1)
            for row in data.get("data") or []:
                name = (row.get("company") or "").strip()
                if not name:
                    continue
                s = slugify(name)
                logo = row.get("logo") or ""
                if logo:
                    logos[s] = abs_url(logo, "https://technopark.in")
                if row.get("id") is not None:
                    ids[s] = str(row["id"])
            page += 1
            time.sleep(0.45)
    except urllib.error.HTTPError as err:
        print(f"  Technopark logos skipped after {err.code} (directory contacts still imported)")

    out: list[dict] = []
    seen: set[str] = set()
    for row in rows:
        name = (row.get("company_name") or "").strip()
        if not name:
            continue
        s = slugify(name)
        if s in seen:
            continue
        seen.add(s)
        cid = ids.get(s) or ""
        official = f"https://technopark.in/company-details/{cid}" if cid else "https://technopark.in/company-list"
        out.append(
            {
                "slug": s,
                "name": name,
                "park": "Technopark",
                "logo": logos.get(s, ""),
                "website": "",
                "phone": (row.get("company_landline") or "").strip(),
                "email": (row.get("company_email") or "").strip(),
                "address": clean(row.get("company_address") or ""),
                "building": (row.get("company_buildings") or "").strip(),
                "domains": [],
                "contactPerson": (row.get("company_contact_person") or "").strip(),
                "designation": (row.get("company_designation") or "").strip(),
                "officialUrl": official,
                "jobsUrl": "https://technopark.in/job-search",
                "sourceUrl": "https://technopark.in/company-list",
                "campus": (row.get("company_parks") or "").strip(),
            }
        )
    out.sort(key=lambda c: c["name"].lower())
    return out


def scrape_cyberpark() -> list[dict]:
    out: list[dict] = []
    seen: set[str] = set()
    for page in range(1, 12):
        url = "https://cyberparks.in/listings/" if page == 1 else f"https://cyberparks.in/listings/page/{page}/"
        try:
            html = fetch(url)
        except urllib.error.HTTPError as err:
            if err.code == 404:
                break
            raise
        articles = re.findall(r'<article[\s\S]*?class="[^"]*listing[\s\S]*?</article>', html)
        if not articles:
            break
        for art in articles:
            title_m = re.search(r'<h3 class="listing-title"><a href="([^"]+)">([^<]+)</a>', art)
            if not title_m:
                continue
            profile, name = title_m.group(1), clean(title_m.group(2))
            slug = slugify(name)
            if not name or slug in seen:
                continue
            seen.add(slug)
            logo_m = re.search(r'<img[^>]+src="([^"]+)"', art)
            email_m = re.search(r'<span class="listing-price">([^<]+)</span>', art)
            addr_m = re.search(r'<span class="listing-address">([^<]*)</span>', art)
            zip_m = re.search(r'<span class="listing-city-state-zip">([^<]*)</span>', art)
            person_m = re.search(r'<li class="sqft">([^<]+)<span>Sq ft</span>', art)
            email = clean(email_m.group(1) if email_m else "")
            if email and "@" not in email:
                email = ""
            address = clean(" ".join(x for x in [addr_m.group(1) if addr_m else "", zip_m.group(1) if zip_m else ""] if x))
            out.append(
                {
                    "slug": slug,
                    "name": name,
                    "park": "Cyberpark",
                    "logo": abs_url(logo_m.group(1) if logo_m else "", "https://cyberparks.in"),
                    "website": "",
                    "phone": "",
                    "email": email,
                    "address": address,
                    "building": "",
                    "domains": [],
                    "contactPerson": clean(person_m.group(1) if person_m else ""),
                    "designation": "",
                    "officialUrl": profile,
                    "jobsUrl": "https://cyberparks.in/careers/",
                    "sourceUrl": "https://cyberparks.in/listings/",
                }
            )
        time.sleep(0.25)
    out.sort(key=lambda c: c["name"].lower())
    return out


def main() -> None:
    print("Fetching official company directories…")
    ip = scrape_infopark()
    print(f"  Infopark: {len(ip)}")
    write_js(ROOT / "data" / "infopark-companies-data.js", "INFOPARK_COMPANIES", ip, "https://infopark.in/companies")
    time.sleep(3)
    tp = scrape_technopark()
    print(f"  Technopark: {len(tp)}")
    write_js(ROOT / "data" / "technopark-companies-data.js", "TECHNOPARK_COMPANIES", tp, "https://technopark.in/company-list")
    time.sleep(2)
    cp = scrape_cyberpark()
    print(f"  Cyberpark: {len(cp)}")
    write_js(ROOT / "data" / "cyberpark-companies-data.js", "CYBERPARK_COMPANIES", cp, "https://cyberparks.in/listings/")
    print("Done.")


if __name__ == "__main__":
    main()
