#!/usr/bin/env python3
"""Add Laser Experts India LLP multi-location hiring (Sep 2026)."""

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
POSTED = "2026-09-20"

BENEFITS = [
    "Food allowance",
    "Accommodation / stay support",
    "ESI",
    "PF",
    "Insurance",
    "Training & development",
    "Career growth opportunities",
    "Supportive work environment",
]

COMPANY_DETAILS = (
    "Laser Experts India LLP hires across Pune, Chennai, Bangalore, Coimbatore and Hosur. "
    "The company has international industry exposure through major exhibitions including "
    "LWOP (India) and EuroBLECH (Germany)."
)


def job(**kwargs) -> dict:
    base = {
        "logo": "",
        "postedDate": POSTED,
        "source": "WhatsApp",
        "verified": True,
        "verificationNote": NOTE,
        "isWalkIn": False,
        "walkInDate": "",
        "startingDate": "",
        "skills": [],
        "applyDeadline": "Rolling",
        "email": "hr@laserxprts.com",
        "phone": "8925558457",
        "website": "https://laserxprts.com",
        "benefits": BENEFITS,
        "companyDetails": COMPANY_DETAILS,
        "howToApply": (
            "Email hr@laserxprts.com with your updated resume. "
            "Mention position, preferred location, experience and contact number. "
            "Or call HR: 8925558457."
        ),
        "hiringNotes": (
            "Source: Laser Experts India LLP hiring creative · Sep 2026. "
            "Verify role and location with HR before applying."
        ),
    }
    base.update(kwargs)
    return base


JOBS = [
    job(
        id="laser-experts-service-engineer-sep2026",
        company="Laser Experts India LLP",
        companyBlurb="Laser Experts · Service Engineer · Pune & multiple locations · 6 months–5 years",
        location="Pune & multiple locations",
        roles=["Service Engineer"],
        experience="both",
        experienceRange="6 months – 5 years",
        employmentType="Full-time",
        applyLink="mailto:hr@laserxprts.com?subject=Service%20Engineer%20%E2%80%93%20Laser%20Experts",
        tags=["IT"],
        qualification="Diploma / BE / B.Tech (Mechanical, Electrical, Electronics, Mechatronics or related)",
        salary="₹1.80 LPA – ₹4.80 LPA",
        salaryRange="₹1.80 LPA – ₹4.80 LPA",
        address="Pune & multiple locations (Chennai, Bangalore, Coimbatore, Hosur)",
        industry="Industrial / Laser equipment",
        workDetails=(
            "Service Engineer · 6 months – 5 years · CTC ₹1.80–₹4.80 LPA. "
            "Installation, servicing and maintenance of laser/industrial equipment. "
            "Troubleshooting, customer-site visits and field service. Travel required."
        ),
        workStatus="Full-time",
        workMode="On-site · Field service",
        experienceYears="6 months – 5 years",
        requirements=[
            "Diploma / BE / B.Tech in Mechanical, Electrical, Electronics, Mechatronics or related",
            "Hands-on technical experience preferred",
            "Willingness to travel for customer-site and field service work",
            "Installation, servicing and maintenance of laser/industrial equipment",
        ],
        responsibilities=[
            "Installation, servicing and maintenance of laser/industrial equipment",
            "Troubleshooting and technical support",
            "Customer-site visits and field service",
        ],
        description="Service Engineer at Laser Experts India LLP — Pune & multiple locations.",
    ),
    job(
        id="laser-experts-client-partner-sep2026",
        company="Laser Experts India LLP",
        companyBlurb="Laser Experts · Client Partner · Chennai & Bangalore · 1–7 years",
        location="Chennai & Bangalore",
        roles=["Client Partner"],
        experience="experienced",
        experienceRange="1 – 7 years",
        employmentType="Full-time",
        applyLink="mailto:hr@laserxprts.com?subject=Client%20Partner%20%E2%80%93%20Laser%20Experts",
        tags=["Business", "Sales"],
        qualification="Diploma / BE / B.Tech",
        salary="₹2.40 LPA – ₹5.40 LPA",
        salaryRange="₹2.40 LPA – ₹5.40 LPA",
        address="Chennai & Bangalore",
        industry="Industrial / Laser equipment",
        workDetails=(
            "Client Partner · 1–7 years · CTC ₹2.40–₹5.40 LPA. "
            "Kannada & Hindi fluent communication required. "
            "Client communication, requirement understanding, coordination with technical teams."
        ),
        workStatus="Full-time",
        workMode="On-site · Customer visits",
        experienceYears="1 – 7 years",
        requirements=[
            "Diploma / BE / B.Tech",
            "Fluent Kannada and Hindi communication",
            "1–7 years experience in client-facing or relationship roles",
            "Willingness to travel for customer visits and field activities",
        ],
        responsibilities=[
            "Client communication and relationship management",
            "Understanding customer requirements",
            "Coordinating with internal technical/service teams",
            "Customer visits and field activities",
        ],
        description="Client Partner at Laser Experts India LLP — Chennai & Bangalore.",
    ),
    job(
        id="laser-experts-admin-coordinator-sep2026",
        company="Laser Experts India LLP",
        companyBlurb="Laser Experts · Admin / Co-ordinator · Chennai & Coimbatore · 1+ year",
        location="Chennai & Coimbatore",
        roles=["Admin / Co-ordinator"],
        experience="experienced",
        experienceRange="1+ year",
        employmentType="Full-time",
        applyLink="mailto:hr@laserxprts.com?subject=Admin%20%2F%20Co-ordinator%20%E2%80%93%20Laser%20Experts",
        tags=["Business"],
        qualification="Any Degree / Diploma",
        salary="₹1.80 LPA – ₹3.00 LPA",
        salaryRange="₹1.80 LPA – ₹3.00 LPA",
        address="Chennai & Coimbatore",
        industry="Industrial / Laser equipment",
        workDetails=(
            "Admin / Co-ordinator · 1+ year · CTC ₹1.80–₹3.00 LPA. "
            "Languages: English, Tamil, Hindi & Malayalam."
        ),
        workStatus="Full-time",
        workMode="On-site",
        experienceYears="1+ year",
        requirements=[
            "Any Degree or Diploma",
            "1+ year experience in office administration or coordination",
            "English, Tamil, Hindi and Malayalam communication",
        ],
        responsibilities=[
            "Office administration and coordination",
            "Documentation and back-office activities",
            "Internal communication and follow-ups",
            "Supporting day-to-day administrative operations",
        ],
        description="Admin / Co-ordinator at Laser Experts India LLP — Chennai & Coimbatore.",
    ),
    job(
        id="laser-experts-telecaller-hosur-sep2026",
        company="Laser Experts India LLP",
        companyBlurb="Laser Experts · Telecaller · Hosur · Freshers welcome",
        location="Hosur",
        roles=["Telecaller"],
        experience="both",
        experienceRange="Freshers / Experienced",
        employmentType="Full-time",
        applyLink="mailto:hr@laserxprts.com?subject=Telecaller%20%E2%80%93%20Laser%20Experts",
        tags=["Business"],
        qualification="Any Degree / Diploma",
        salary="₹1.80 LPA – ₹3.00 LPA",
        salaryRange="₹1.80 LPA – ₹3.00 LPA",
        address="Hosur",
        industry="Industrial / Laser equipment",
        workDetails=(
            "Telecaller · Freshers or experienced · CTC ₹1.80–₹3.00 LPA. "
            "Hindi, English & Telugu fluent communication required."
        ),
        workStatus="Full-time",
        workMode="On-site · Hosur",
        experienceYears="Freshers / Experienced",
        requirements=[
            "Any Degree or Diploma",
            "Fluent Hindi, English and Telugu",
            "Good communication and follow-up skills",
        ],
        responsibilities=[
            "Making and handling customer/business calls",
            "Lead follow-up and communication",
            "Maintaining call-related information",
            "Coordinating with concerned teams",
            "Building professional customer relationships",
        ],
        description="Telecaller at Laser Experts India LLP — Hosur.",
    ),
    job(
        id="laser-experts-hr-trainee-hosur-sep2026",
        company="Laser Experts India LLP",
        companyBlurb="Laser Experts · HR Trainee · Hosur head office · Freshers · MBA/PGDM HR",
        location="Hosur (Head Office)",
        roles=["HR Trainee"],
        experience="fresher",
        experienceRange="Freshers / 0–1 year",
        employmentType="Full-time",
        applyLink="mailto:hr@laserxprts.com?subject=HR%20Trainee%20%E2%80%93%20Laser%20Experts",
        tags=["HR"],
        qualification="MBA / PGDM – HR preferred",
        salary="₹1.80 LPA – ₹2.40 LPA",
        salaryRange="₹1.80 LPA – ₹2.40 LPA",
        address="Hosur (Head Office)",
        industry="Industrial / Laser equipment",
        workDetails=(
            "HR Trainee · Freshers / 0–1 year · CTC ₹1.80–₹2.40 LPA. "
            "Hindi, English & Telugu. Ideal for HR freshers in recruitment and people development."
        ),
        workStatus="Full-time",
        workMode="On-site · Hosur head office",
        experienceYears="Freshers / 0–1 year",
        requirements=[
            "MBA / PGDM in HR preferred",
            "Hindi, English and Telugu communication",
            "Interest in recruitment, employee coordination and people development",
        ],
        responsibilities=[
            "Recruitment and candidate coordination",
            "Interview scheduling and follow-ups",
            "Employee onboarding and documentation",
            "Attendance and HR operations support",
            "Training and employee engagement activities",
            "HR documentation and reporting",
        ],
        description="HR Trainee at Laser Experts India LLP — Hosur head office.",
    ),
    job(
        id="laser-experts-accounts-manager-hosur-sep2026",
        company="Laser Experts India LLP",
        companyBlurb="Laser Experts · Accounts Manager · Hosur · 3+ years · GST/Tally/Zoho",
        location="Hosur",
        roles=["Accounts Manager"],
        experience="experienced",
        experienceRange="3+ years",
        employmentType="Full-time",
        applyLink="mailto:hr@laserxprts.com?subject=Accounts%20Manager%20%E2%80%93%20Laser%20Experts",
        tags=["Business", "Finance"],
        qualification="Degree / Diploma in Commerce, Accounting, Finance or related",
        salary="₹3.60 LPA – ₹6.00 LPA",
        salaryRange="₹3.60 LPA – ₹6.00 LPA",
        address="Hosur",
        industry="Industrial / Laser equipment",
        workDetails=(
            "Accounts Manager · 3+ years · CTC ₹3.60–₹6.00 LPA. "
            "GST, TDS, ROC, PF/ESI/PT compliance, Tally Prime, Zoho Books, multi-branch accounting."
        ),
        workStatus="Full-time",
        workMode="On-site · Hosur",
        experienceYears="3+ years",
        skills=[
            "GST filing",
            "TDS return filing",
            "ROC compliance",
            "PF / ESI / PT compliance",
            "Tally Prime",
            "Zoho Books",
            "MIS reporting",
        ],
        requirements=[
            "3+ years as Accounts Analyst, Accounts Manager or Senior Accountant",
            "Degree / Diploma in Commerce, Accounting, Finance or related",
            "Hindi, English and Tamil communication",
            "GST filing & TDS return filing",
            "ROC compliance",
            "PF / ESI / PT compliance",
            "Tally Prime & Zoho Books",
            "Multi-branch accounting and statutory compliance",
            "Team handling / team lead experience in accounts",
        ],
        responsibilities=[
            "Financial reporting & MIS reporting",
            "GST, TDS, ROC and statutory compliance",
            "PF, ESI and PT compliance",
            "Multi-branch accounting operations",
            "Team handling as Accounts lead",
        ],
        description="Accounts Manager at Laser Experts India LLP — Hosur.",
    ),
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} Laser Experts job(s) to jobs-data.js")


if __name__ == "__main__":
    main()
