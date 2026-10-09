#!/usr/bin/env python3
"""Amlaforest Senior AI Product Engineer + urgent spotlight flags (Oct 2026)."""

from __future__ import annotations

import importlib.util
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

direct_spec = importlib.util.spec_from_file_location(
    "direct_oct09", ROOT / "scripts" / "add-direct-jobs-oct09.py"
)
direct_mod = importlib.util.module_from_spec(direct_spec)
direct_spec.loader.exec_module(direct_mod)
direct = direct_mod.direct

JOBS_PATH = ROOT / "data" / "jobs-data.js"

JOBS = [
    direct(
        "amlaforest-senior-ai-product-engineer",
        "Amlaforest",
        "Senior AI Product Engineer (Productionization & AI Engineering)",
        "Kerala (location not stated — confirm with employer)",
        experience="experienced",
        experience_range="8+ years software engineering · Graduates preferred · Immediate joiners",
        email="rejo@amlaforest.com",
        tags=[
            "IT",
            "AI",
            "Software Engineering",
            "Generative AI",
            "LLM",
            "RAG",
            "DevOps",
            "Immediate",
        ],
        employment_type="Full-time",
        work_details=(
            "Amlaforest is a technology and product development company and a sister concern of "
            "Sreedhareeyam Ayurveda Eye Hospital. Transform AI-assisted prototypes and proofs of concept "
            "into secure, scalable, production-ready products. Combine strong software engineering with "
            "hands-on AI engineering: LLMs, RAG, agents, embeddings, vector search, cloud-native services, "
            "CI/CD, observability and security. Immediate joiners preferred."
        ),
        requirements=[
            "8+ years software engineering experience building production systems",
            "Experience taking AI-driven applications and platforms into production",
            "Strong cloud, distributed systems, APIs, databases and DevOps knowledge",
            "Hands-on LLMs, RAG, prompt engineering, embeddings and vector databases",
            "Expertise in scalability, reliability, security and observability",
            "Graduate preferred",
        ],
        responsibilities=[
            "Convert prototypes and MVPs into production-grade applications",
            "Design scalable architectures, APIs, services and data pipelines",
            "Build and optimize AI solutions using LLMs, RAG, agents, embeddings and vector search",
            "Establish testing, observability, CI/CD, security and deployment best practices",
            "Evaluate technology and AI choices on quality, performance, reliability and cost",
        ],
        how=(
            "Email rejo@amlaforest.com with subject: "
            "Application for Senior AI Product Engineer – [Your Name]"
        ),
        urgent=True,
        alert_badge="Urgent · Immediate joiners",
        description=(
            "Amlaforest is hiring a Senior AI Product Engineer (8+ yrs) to productionize AI prototypes — "
            "LLMs, RAG, agents, cloud-native systems. Immediate joiners."
        ),
    ),
]

SPOTLIGHT_FIELDS = """
    urgentSpotlight: true,
    hiringCampaign: "amlaforest-priority",
    spotlightTitle: "Amlaforest priority hiring",
    spotlightIntro: "Sister concern of Sreedhareeyam Ayurveda Eye Hospital · AI & platform roles · immediate joiners",
"""


def add_spotlight_fields(path: Path) -> int:
    text = path.read_text(encoding="utf-8")
    updated = 0
    for jid in (
        "amlaforest-senior-ai-product-engineer-oct26",
        "amlaforest-devops-cloud-engineer-ai-platforms-oct26",
    ):
        if f'urgentSpotlight: true' in text and f'id: "{jid}"' in text:
            # already patched near this id — skip if spotlight exists after this id block
            chunk = text.split(f'id: "{jid}"', 1)[1][:1200]
            if "urgentSpotlight:" in chunk:
                continue
        marker = f'id: "{jid}"'
        if marker not in text:
            continue
        # Insert spotlight fields before closing of job object (before next job or after alertBadge)
        pattern = (
            rf'(id: "{jid}"[\s\S]*?alertBadge: "[^"]*",\n)'
            rf'(\s*\}},)'
        )
        if "alertBadge:" not in text.split(marker, 1)[1][:800]:
            pattern = (
                rf'(id: "{jid}"[\s\S]*?urgentHiring: true,\n)'
                rf'(\s*\}},)'
            )
        new_text, n = re.subn(pattern, rf"\1{SPOTLIGHT_FIELDS}\2", text, count=1)
        if n:
            text = new_text
            updated += 1
    if updated:
        path.write_text(text, encoding="utf-8")
    return updated


def add_seo_for_senior(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    jid = "amlaforest-senior-ai-product-engineer-oct26"
    if f'id: "{jid}"' not in text:
        return False
    chunk = text.split(f'id: "{jid}"', 1)[1][:2000]
    if "seoTitle:" in chunk:
        return False
    seo = """
    seoTitle: "Senior AI Product Engineer Jobs at Amlaforest | InfoparkDaily",
    seoDescription: "Amlaforest is hiring a Senior AI Product Engineer with 8+ years of software engineering experience. Immediate joiners. Email your resume to apply.",
"""
    pattern = (
        rf'(id: "{jid}"[\s\S]*?urgentSpotlight: true,\n'
        rf'    hiringCampaign: "amlaforest-priority",\n'
        rf'    spotlightTitle: "[^"]+",\n'
        rf'    spotlightIntro: "[^"]+",\n)'
        rf'(\s*\}},)'
    )
    new_text, n = re.subn(pattern, rf"\1{seo}\2", text, count=1)
    if n:
        path.write_text(new_text, encoding="utf-8")
        return True
    return False


def main() -> None:
    job = JOBS[0]
    job["source"] = "Direct"
    job["industry"] = "IT – Artificial Intelligence / Software Engineering"
    job["qualification"] = "Graduates preferred"
    n = mod.insert_jobs(JOBS_PATH, "JOBS", JOBS)
    print(f"inserted: {n}")
    patched = add_spotlight_fields(JOBS_PATH)
    print(f"spotlight patches: {patched}")
    if add_seo_for_senior(JOBS_PATH):
        print("seo fields added for senior AI role")


if __name__ == "__main__":
    main()
