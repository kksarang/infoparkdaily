#!/usr/bin/env python3
"""Hiring posters shared 1 Nov 2026. Only details printed on each poster."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("posters29", ROOT / "scripts" / "add-whatsapp-jobs-oct29.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
mod = base.mod


def job(slug: str, *args, **kw) -> dict:
    item = base.job(slug, *args, **kw)
    item["id"] = f"{slug}-nov01"
    item["postedDate"] = "2026-11-01"
    item["employmentType"] = ""
    item["workStatus"] = ""
    item["hiringNotes"] = "Added 1 Nov 2026 from the employer's hiring poster. Verify with the employer before applying."
    return item


JOBS = [
    job(
        "guardian-hospital-lab-pharmacy-assistant-thrissur",
        "Guardian Multi Speciality Hospital",
        "Laboratory Assistant / Pharmacy Assistant",
        "Thrissur",
        roles=["Laboratory Assistant", "Pharmacy Assistant"],
        experience="both",
        experience_range="Freshers and experienced candidates welcome",
        email="hrguardianhospitalkpm@gmail.com",
        tags=["Healthcare", "Hospital", "Freshers", "Thrissur"],
        work_details="Guardian Multi Speciality Hospital, Thrissur, is hiring a Laboratory Assistant (DMLT / B.Sc. MLT) and a Pharmacy Assistant (D.Pharm / B.Pharm). Freshers and experienced candidates welcome.",
        requirements=[
            "Laboratory Assistant: DMLT / B.Sc. MLT",
            "Pharmacy Assistant: D.Pharm / B.Pharm",
        ],
        qualification="DMLT / B.Sc. MLT / D.Pharm / B.Pharm",
        address="Thrissur",
        how="Apply by email to hrguardianhospitalkpm@gmail.com",
    ),
    job(
        "lahara-rust-developer-infopark",
        "Lahara",
        "Rust Developer",
        "Infopark, Kochi",
        experience="experienced",
        experience_range="1+ years",
        email="hr@laharaprotocollabs.com",
        phone="+91 799 483 1241",
        tags=["Rust", "Developer", "Infopark", "Kochi"],
        work_details="Rust Developer at Lahara, Infopark, Kochi. Experience: 1+ years.",
        requirements=[
            "Strong proficiency in Rust, ownership & concurrency",
            "Async Rust, Tokio & REST APIs",
            "Networking: TCP/IP, HTTP, WebSockets",
            "Testing, CI/CD & Rust tooling",
            "Linux, debugging & performance optimization",
            "Design patterns & production systems",
            "Good to have: Docker & distributed systems",
            "Good to have: Blockchain & P2P networking",
            "Good to have: Redis, Kafka, NATS",
            "Good to have: Basic C/C++ knowledge",
        ],
        address="Infopark, Kochi",
        how="Apply at hr@laharaprotocollabs.com. Contact: +91 799 483 1241",
    ),
]


def main() -> None:
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    fresh = [item for item in JOBS if f'id: "{item["id"]}"' not in text]
    if fresh:
        block = ",\n".join(mod.render_job(item) for item in fresh) + ",\n"
        path.write_text(text.replace("var JOBS = [\n", "var JOBS = [\n" + block, 1), encoding="utf-8")
    print(f"Added {len(fresh)} jobs")


if __name__ == "__main__":
    main()
