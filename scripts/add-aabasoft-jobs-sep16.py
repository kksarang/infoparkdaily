#!/usr/bin/env python3
"""Add Aabasoft hiring creatives collected 16 Sep 2026."""

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
POSTED = "2026-09-16"
LOGO = "assets/logos/aabasoft.svg"
COMPANY = "Aabasoft"
LEGAL = "Aabasoft Technologies India Private Limited"
EMAIL = "jobs@aabasoft.in"
CHAKOLAS = (
    "Aabasoft, 1st floor, Chakolas Heights, Seaport-Airport Road, "
    "Chittethukara, Kochi, Kakkanad, Kerala 682037 (near Infopark South Gate)"
)
VISMAYA = "Vismaya, Infopark, Kakkanad, Kochi 682042"
SHIFTS = "8:00 AM – 5:00 PM · 9:00 AM – 6:00 PM · 12:00 PM – 9:00 PM · 1:00 PM – 10:00 PM · 3:00 PM – 12:00 AM"


def job(**kwargs) -> dict:
    base = {
        "logo": LOGO,
        "postedDate": POSTED,
        "source": "WhatsApp",
        "verified": True,
        "verificationNote": NOTE,
        "isWalkIn": False,
        "walkInDate": "",
        "startingDate": "Immediate",
        "skills": [],
        "applyDeadline": "Rolling",
        "companyLegalName": LEGAL,
        "website": "https://www.aabasoft.com",
        "benefits": [
            "Listing transcribed from an employer hiring creative",
            "Never pay anyone for this application",
        ],
    }
    base.update(kwargs)
    return base


JOBS = [
    job(
        id="aabasoft-hiring-multiple-roles-sep2026",
        company=COMPANY,
        companyBlurb=(
            "Aabasoft · 20 vacancies · Technical Support / BDE / Service Desk · "
            "Freshers welcome · Online interview · Kakkanad"
        ),
        location="Kakkanad, Kochi (Chakolas Heights & Vismaya Infopark)",
        roles=[
            "Technical Support Executive",
            "Business Development Executive",
            "Service Desk Coordinator / Tele Calling",
        ],
        experience="both",
        experienceRange="Freshers to experienced (role-wise)",
        employmentType="Full-time",
        applyLink=f"mailto:{EMAIL}?subject=Aabasoft%20Hiring%20%E2%80%94%20Sep%202026",
        tags=["Sales", "Business", "Support", "BPO"],
        vacancies=20,
        vacancyText="20 vacancies",
        featured=False,
        isReferral=True,
        referralLabel="Referral available",
        urgentHiring=True,
        email=EMAIL,
        phone="8089009751 / 8089002222",
        address=CHAKOLAS,
        industry="IT / BPO · Sales & Support",
        companyDetails=(
            f"{LEGAL} is hiring for multiple voice-process roles in Kakkanad, Kochi. "
            "Roles include Technical Support Executive, Business Development Executive, "
            "and Service Desk Coordinator / Tele Calling. Online interview. "
            "Male and female candidates welcome. Referral option available."
        ),
        workDetails=(
            "Aabasoft is hiring across Technical Support, Business Development, and Service Desk / "
            "Tele Calling tracks. Malayalam fluency required for voice roles. 9-hour shifts with "
            "multiple slot options. Freshers preferred; 12th pass and degree dropouts can also apply "
            "for some roles. Online interview — email or call to apply."
        ),
        workStatus="Full-time",
        workMode="On-site · Online interview",
        experienceYears="Freshers to experienced (role-wise)",
        qualification="B.Tech · MCom · MCA · BCom (Computer) · Diploma in Computer · Any degree/Diploma · 12th pass (select roles)",
        salary="₹10,000 – ₹16,000 in-hand (role-wise)",
        salaryRange="₹10,000 – ₹16,000 in-hand + incentives (role-wise)",
        skills=[
            "Malayalam communication",
            "Telecalling / telesales",
            "Customer complaints & follow-ups",
            "ISP troubleshooting",
            "Networking",
            "Convincing & persuasion",
        ],
        whoCanApply=[
            "Technical Support Executive · Malayalam fluency · 9-hour shifts · ISP troubleshooting & networking · ₹12,000 CTC (PF & ESI) · ~₹10,000 in-hand · B.Tech / MCom / MCA / BCom (Computer) / Diploma in Computer",
            "Business Development Executive · Urgent hiring · Sales experience preferred · Immediate joiners · ₹15,000 – ₹16,000 monthly · ₹5,000+ incentives monthly",
            "Service Desk Coordinator / Tele Calling · Freshers can apply · Malayalam voice process · ~₹12,000 in-hand · 12th pass / degree dropouts welcome · Shifts 9 AM–6 PM or 1 PM–10 PM",
            "Male and female candidates · Freshers preferred · Referral option available",
        ],
        requirements=[
            "Good communication skills with fluency in Malayalam",
            "Ready to work in 9-hour shifts",
            "Handling customer complaints and follow-ups (Service Desk roles)",
            f"Shift options: {SHIFTS}",
            "ISP troubleshooting and networking (Technical Support)",
            "Malayalam voice process",
            "Qualification: B.Tech, MCom, MCA, BCom (Computer), Diploma in Computer — or 12th pass for select tele-calling roles",
            "Freshers preferred; degree dropouts can apply for Service Desk / Tele Calling",
            "Business Development: any sales experience preferred; immediate joiners",
            "Online interview — apply via email or phone",
            "Never pay any fee to apply or interview",
        ],
        responsibilities=[
            "Technical Support Executive: ISP troubleshooting, networking, Malayalam voice support across assigned shift",
            "Business Development Executive: Telephonic sales / convincing customers; drive business outcomes; earn monthly incentives",
            "Service Desk Coordinator / Tele Calling: Handle customer complaints, follow-ups, and Malayalam voice-process calls",
        ],
        benefits=[
            "20 vacancies across multiple roles",
            "Freshers welcome",
            "₹5,000+ monthly incentives in sales roles",
            "Referral option available",
            "Multiple shift slots",
        ],
        howToApply=(
            f"Email your resume to {EMAIL} or call 8089009751 / 8089002222. "
            "Mention the role you are applying for. Online interview will be scheduled. "
            f"Technical Support & BDE venue: {CHAKOLAS}. "
            f"Service Desk venue: {VISMAYA}."
        ),
        hiringNotes="Source: Aabasoft hiring creatives · Sep 2026. Verify salary and shift with Aabasoft before applying.",
        description=(
            "Aabasoft hiring 20 vacancies — Technical Support, BDE, Service Desk / Tele Calling · "
            "Freshers welcome · Malayalam voice · Online interview · Kakkanad."
        ),
        seoTitle="Aabasoft Hiring Sep 2026 | Tech Support BDE Service Desk 20 Vacancies Kochi | InfoparkDaily",
        seoDescription=(
            "Aabasoft is hiring Technical Support Executive, Business Development Executive, "
            "and Service Desk / Tele Calling roles in Kakkanad. 20 vacancies, freshers welcome, "
            "Malayalam voice process, online interview. ₹10k–₹16k in-hand + incentives."
        ),
    ),
    job(
        id="aabasoft-technical-support-executive-sep2026",
        company=COMPANY,
        companyBlurb=(
            "Aabasoft · Technical Support Executive · Malayalam · ISP troubleshooting · "
            "₹12,000 CTC (~₹10,000 in-hand) · Freshers · Kakkanad"
        ),
        location="Chittethukara, Kakkanad · Near Infopark South Gate",
        roles=["Technical Support Executive"],
        experience="fresher",
        experienceRange="Freshers preferred",
        employmentType="Full-time",
        applyLink=f"mailto:{EMAIL}?subject=Technical%20Support%20Executive%20%E2%80%94%20Aabasoft",
        tags=["IT", "Support", "BPO"],
        vacancies=20,
        email=EMAIL,
        phone="8089002222",
        address=CHAKOLAS,
        industry="IT / Technical Support",
        companyDetails=f"{LEGAL} is hiring Technical Support Executives at Chakolas Heights, near Infopark South Gate, Kakkanad.",
        workDetails=(
            "Technical Support Executive with Malayalam fluency. ISP troubleshooting and networking. "
            "Ready for 9-hour shifts. Salary ₹12,000 CTC (PF & ESI), approximately ₹10,000 in-hand. "
            f"Shift options: {SHIFTS}. Online interview."
        ),
        workStatus="Full-time",
        workMode="On-site · Online interview · Kakkanad",
        experienceYears="Freshers preferred",
        qualification="B.Tech · MCom · MCA · BCom (Computer) · Diploma in Computer",
        salary="₹12,000 CTC (~₹10,000 in-hand)",
        salaryRange="₹12,000 CTC (PF & ESI) · ~₹10,000 in-hand",
        skills=["Malayalam communication", "ISP troubleshooting", "Networking", "Customer support"],
        requirements=[
            "Good communication skills with fluency in Malayalam",
            "Ready to work in 9-hour shifts",
            f"Shift options: {SHIFTS}",
            "ISP troubleshooting and networking",
            "Malayalam voice process",
            "Qualification: B.Tech, MCom, MCA, BCom (Computer), Diploma in Computer",
            "Freshers preferred · Male / female",
            "Online interview",
        ],
        responsibilities=[
            "Provide technical support over phone in Malayalam",
            "Troubleshoot ISP and networking issues",
            "Handle customer complaints and follow-ups as required",
        ],
        howToApply=f"Email your resume to {EMAIL} or call 8089002222. Mention Technical Support Executive. Online interview.",
        hiringNotes="Source: Aabasoft Technical Support hiring creative · Sep 2026.",
        description="Aabasoft Technical Support Executive — Malayalam · ISP troubleshooting · ₹12k CTC · Freshers · Kakkanad.",
    ),
    job(
        id="aabasoft-business-development-executive-sep2026",
        company=COMPANY,
        companyBlurb=(
            "Aabasoft · Business Development Executive · Urgent · ₹15k–₹16k + ₹5k incentives · "
            "Sales experience · Immediate joiners · Kakkanad"
        ),
        location="Chittethukara, Kakkanad · Near Infopark South Gate",
        roles=["Business Development Executive"],
        experience="both",
        experienceRange="Any sales experience preferred",
        employmentType="Full-time",
        applyLink=f"mailto:{EMAIL}?subject=Business%20Development%20Executive%20%E2%80%94%20Aabasoft",
        tags=["Sales", "Business"],
        email=EMAIL,
        phone="8089009751",
        address=CHAKOLAS,
        industry="Sales / Business Development",
        companyDetails=f"{LEGAL} is urgently hiring Business Development Executives at Chakolas Heights, Kakkanad.",
        workDetails=(
            "Business Development Executive — Malayalam communication with excellent telephone convincing skills. "
            "Shift 9:00 AM – 6:00 PM. Salary ₹15,000 – ₹16,000 monthly plus ₹5,000+ incentives monthly. "
            "Any degree/Diploma. Sales experience preferred. Immediate joiners preferred. Online interview."
        ),
        workStatus="Full-time",
        workMode="On-site · Online interview · Kakkanad",
        experienceYears="Any sales experience preferred",
        qualification="Any degree / Diploma",
        salary="₹15,000 – ₹16,000 monthly + incentives",
        salaryRange="₹15,000 – ₹16,000 monthly · ₹5,000+ incentives monthly",
        skills=["Malayalam communication", "Telecalling", "Sales", "Convincing & persuasion"],
        urgentHiring=True,
        isReferral=True,
        referralLabel="Referral available",
        requirements=[
            "Good communication skills in Malayalam",
            "Excellent convincing capacity through telephone",
            "Any experience in sales preferred",
            "Any degree / Diploma",
            "Shift: 9:00 AM – 6:00 PM",
            "Immediate joining preferred",
            "Male / female",
            "Online interview",
        ],
        responsibilities=[
            "Convince customers through telephone in Malayalam",
            "Drive business development and sales outcomes",
            "Earn monthly incentives on top of base salary",
        ],
        benefits=["₹5,000+ monthly incentives", "Referral option available"],
        howToApply=f"Email your resume to {EMAIL} or call 8089009751. Mention Business Development Executive. Online interview.",
        hiringNotes="Source: Aabasoft BDE hiring creative · Sep 2026. Urgent hiring.",
        description="Aabasoft BDE — urgent · ₹15k–₹16k + ₹5k incentives · Malayalam tele-sales · Immediate joiners · Kakkanad.",
    ),
    job(
        id="aabasoft-service-desk-coordinator-sep2026",
        company=COMPANY,
        companyBlurb=(
            "Aabasoft · Service Desk Coordinator / Tele Calling · Freshers · "
            "~₹12,000 in-hand · 12th pass OK · Vismaya Infopark"
        ),
        location="Vismaya, Infopark, Kakkanad, Kochi",
        roles=["Service Desk Coordinator", "Tele Calling Executive"],
        experience="fresher",
        experienceRange="Freshers preferred · 12th pass welcome",
        employmentType="Full-time",
        applyLink=f"mailto:{EMAIL}?subject=Service%20Desk%20Coordinator%20%E2%80%94%20Aabasoft",
        tags=["Business", "BPO", "Support"],
        email=EMAIL,
        phone="8089009751",
        address=VISMAYA,
        industry="BPO · Customer Support",
        companyDetails=f"{LEGAL} is hiring Service Desk Coordinators / Tele Calling Executives at Vismaya, Infopark, Kakkanad.",
        workDetails=(
            "Service Desk Coordinator / Tele Calling role. Malayalam voice process. "
            "Handle customer complaints and follow-ups. 9-hour shifts: 9:00 AM – 6:00 PM or 1:00 PM – 10:00 PM. "
            "Approximately ₹12,000 in-hand. Freshers preferred. 12th pass and degree dropouts can apply. "
            "Any degree/Diploma also accepted. Online interview."
        ),
        workStatus="Full-time",
        workMode="On-site · Online interview · Vismaya Infopark",
        experienceYears="Freshers preferred",
        qualification="Any degree / Diploma · 12th pass also accepted",
        salary="~₹12,000 in-hand",
        salaryRange="~₹12,000 in-hand",
        skills=["Malayalam communication", "Customer complaints", "Follow-ups", "Telecalling"],
        requirements=[
            "Good communication skills with fluency in Malayalam",
            "Ready to work in 9-hour shifts",
            "Handling customer complaints and follow-ups",
            "Shift: 9:00 AM – 6:00 PM or 1:00 PM – 10:00 PM",
            "Malayalam voice process",
            "Qualification: Any degree/Diploma · 12th pass and degree dropouts can also apply",
            "Freshers preferred · Immediate joining preferred",
            "Male / female",
            "Online interview",
        ],
        responsibilities=[
            "Handle customer complaints and follow-ups over phone",
            "Work in Malayalam voice process",
            "Support service desk coordination tasks as assigned",
        ],
        howToApply=f"Email your resume to {EMAIL} or call 8089009751. Mention Service Desk Coordinator / Tele Calling. Online interview.",
        hiringNotes="Source: Aabasoft Service Desk hiring creative · Sep 2026.",
        description="Aabasoft Service Desk / Tele Calling — freshers · ~₹12k in-hand · 12th pass OK · Vismaya Infopark Kakkanad.",
    ),
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} Aabasoft jobs to jobs-data.js")


if __name__ == "__main__":
    main()
