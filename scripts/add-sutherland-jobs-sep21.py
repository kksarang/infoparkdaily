#!/usr/bin/env python3
"""Add Sutherland Kochi walk-in and SmartRecruiters mortgage role (Sep 2026)."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

NOTE = mod.NOTE
POSTED = "2026-09-21"
LOGO = "assets/logos/sutherland.svg"
VENUE = "Sutherland Global Services, 5th Floor, Technopolis, C-SEZ, Kakkanad, Kochi"
MORTGAGE_URL = (
    "https://jobs.smartrecruiters.com/Sutherland/"
    "744000147239959-applicant-mortgage"
)

JOBS = [
    {
        "id": "sutherland-customer-support-walkin-kochi-20260921",
        "company": "Sutherland",
        "logo": LOGO,
        "companyBlurb": (
            "Sutherland · Customer Support · Walk-in 21–26 Sep 2026 · "
            "Up to ₹25k + travel allowance · Technopolis, Kakkanad"
        ),
        "location": "Kakkanad, Kochi",
        "roles": ["Customer Support"],
        "experience": "both",
        "experienceRange": "As per Sutherland hiring at the walk-in",
        "employmentType": "Full-time",
        "applyLink": "",
        "applyDeadline": "2026-09-26",
        "postedDate": POSTED,
        "source": "Instagram",
        "verified": True,
        "verificationNote": (
            "Walk-in details can change after publishing. Confirm date, time, and venue "
            "with Sutherland before you travel. InfoparkDaily is not a recruiter and never "
            "collects money for jobs. Never pay anyone for an application or interview."
        ),
        "tags": ["Support", "BPO", "Walk-in", "Infopark"],
        "isWalkIn": True,
        "walkin": True,
        "walkInDate": "21–26 September 2026",
        "walkinDates": "21–26 September 2026",
        "walkinTime": "11:30 AM onwards",
        "walkinLocation": VENUE,
        "workLocations": ["Kochi", "Kakkanad"],
        "alertSheet": True,
        "alertLabel": "WALK-IN DRIVE · 21–26 SEP 2026",
        "alertBadge": "Walk-in",
        "walkinHeadline": (
            "Sutherland Kochi walk-in · 21–26 September 2026 · 11:30 AM onwards · "
            "Customer Support · 5th Floor, Technopolis, C-SEZ, Kakkanad"
        ),
        "urgentHiring": True,
        "email": "",
        "phone": "",
        "website": "https://www.sutherlandglobal.com/",
        "address": VENUE,
        "industry": "BPO / Customer Support",
        "companyDetails": (
            "Sutherland is hosting a walk-in drive in Kochi for Customer Support roles "
            "from Monday 21 to Saturday 26 September 2026."
        ),
        "companyLegalName": "Sutherland Global Services",
        "workDetails": (
            "Customer Support roles at Sutherland, Kochi. Walk-in Monday 21 September to "
            "Saturday 26 September 2026, from 11:30 AM onwards. Venue: 5th Floor, "
            "Technopolis, C-SEZ, Kakkanad. Earn up to ₹25,000 per month plus travel "
            "allowance up to ₹3,500 and insurance cover (as per official Instagram post)."
        ),
        "workStatus": "Full-time",
        "workMode": "On-site · Direct walk-in · Kakkanad",
        "experienceYears": "As briefed at the walk-in",
        "qualification": "As per Sutherland hiring criteria",
        "salary": "Up to ₹25,000 per month",
        "salaryRange": "Up to ₹25,000/month + up to ₹3,500 travel allowance + insurance",
        "skills": ["Customer support", "Communication"],
        "whoCanApply": [
            "Candidates interested in Customer Support roles at Sutherland Kochi",
            "Walk in with an updated resume during the drive dates",
        ],
        "requirements": [
            "Attend walk-in 21–26 September 2026 from 11:30 AM onwards",
            "Carry an updated resume",
            f"Venue: {VENUE}",
            "Confirm details with Sutherland before travelling",
        ],
        "responsibilities": [
            "Customer support duties as briefed after selection at the walk-in",
        ],
        "benefits": [
            "Up to ₹25,000 per month (as per official post)",
            "Travel allowance up to ₹3,500",
            "Insurance cover",
        ],
        "applySteps": [
            "Walk in between 21 and 26 September 2026 from 11:30 AM onwards",
            "Carry your updated resume",
            f"Venue: {VENUE}",
        ],
        "documentsRequired": ["Updated resume"],
        "importantNotes": [
            "Source: @sutherlandlifeindia Instagram post · Sep 2026",
            "Confirm date, time, and venue with Sutherland before travelling",
            "Never pay anyone for an application or interview",
        ],
        "howToApply": (
            f"Walk in 21–26 September 2026 from 11:30 AM onwards at {VENUE}. "
            "Bring your updated resume. Verify with Sutherland before travelling."
        ),
        "hiringNotes": "Source: Sutherland Instagram walk-in flyer · Sep 2026.",
        "description": (
            "Sutherland Customer Support walk-in · Kochi · 21–26 Sep 2026 · "
            "Up to ₹25k + allowances."
        ),
        "startingDate": "",
    },
    {
        "id": "sutherland-applicant-mortgage-smartrecruiters-sep2026",
        "company": "Sutherland",
        "logo": LOGO,
        "companyBlurb": (
            "Sutherland · Applicant – Mortgage (Underwriter) · 2–5 years · "
            "US night shifts · Apply on SmartRecruiters"
        ),
        "location": "Kochi, Kerala (confirm with Sutherland)",
        "roles": ["Applicant – Mortgage"],
        "experience": "experienced",
        "experienceRange": "2–5 years mortgage underwriting",
        "employmentType": "Full-time",
        "applyLink": MORTGAGE_URL,
        "applyDeadline": "Rolling",
        "postedDate": POSTED,
        "source": "SmartRecruiters",
        "verified": True,
        "verificationNote": NOTE,
        "tags": ["Finance", "Mortgage", "BPO"],
        "isWalkIn": False,
        "walkInDate": "",
        "urgentHiring": True,
        "email": "",
        "phone": "",
        "website": "https://www.sutherlandglobal.com/",
        "address": VENUE,
        "industry": "Mortgage / Financial Services",
        "companyDetails": (
            "Sutherland Global Services is hiring for Applicant – Mortgage "
            "(Mortgage Underwriter) via SmartRecruiters."
        ),
        "companyLegalName": "Sutherland Global Services",
        "workDetails": (
            "Mortgage Underwriter role analyzing and underwriting residential mortgage "
            "applications across Conventional and Non-QM programs (including DSCR and "
            "alternative documentation). Review credit, income, assets, employment, and "
            "collateral. Ensure compliance with agency, investor, and regulatory guidelines "
            "(Fannie Mae, Freddie Mac, ATR/QM, TRID, RESPA, TILA, HMDA, etc.). "
            "6 months work-from-office followed by work-from-home. US rotational night shifts. "
            "Immediate joiner preferred."
        ),
        "workStatus": "Full-time",
        "workMode": "6 months WFO, then WFH · US rotational night shifts",
        "experienceYears": "2–5 years",
        "qualification": "Bachelor's in Finance, Business, Economics, or related field preferred",
        "skills": [
            "Mortgage underwriting",
            "Conventional loans",
            "Non-QM / DSCR",
            "DU / LP",
            "Loan Origination Systems",
            "Credit analysis",
            "Regulatory compliance",
        ],
        "requirements": [
            "2–5 years mortgage underwriting experience",
            "Conventional and/or Non-QM loan product knowledge",
            "Fannie Mae / Freddie Mac guidelines",
            "LOS and AUS (DU/LP) proficiency",
            "US rotational night shifts",
            "Immediate joiner preferred",
            "Apply via official SmartRecruiters listing only",
        ],
        "responsibilities": [
            "Underwrite residential mortgage applications including Conventional, Non-QM, and DSCR products",
            "Analyze borrower credit, income, assets, and collateral",
            "Issue approvals, conditions, suspensions, or denials per guidelines",
            "Ensure regulatory and investor compliance",
            "Communicate decisions to loan officers, processors, and stakeholders",
        ],
        "benefits": [
            "6 months WFO transitioning to WFH",
            "Official SmartRecruiters application channel",
        ],
        "howToApply": f"Apply on SmartRecruiters: {MORTGAGE_URL}",
        "hiringNotes": (
            "Source: Sutherland SmartRecruiters listing · Sep 2026. "
            "Job description titles role as Mortgage Underwriter on the official page."
        ),
        "description": (
            "Sutherland Applicant – Mortgage (Underwriter) · 2–5 years · "
            "US night shifts · Apply on SmartRecruiters."
        ),
        "officialLinks": {"smartRecruiters": MORTGAGE_URL},
        "startingDate": "Immediate",
    },
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} Sutherland job(s) to jobs-data.js")


if __name__ == "__main__":
    main()
