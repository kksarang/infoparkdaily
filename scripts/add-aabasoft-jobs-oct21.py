#!/usr/bin/env python3
"""Pin the 21 Oct 2026 Aabasoft hiring posters at the top of the jobs list."""

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
POSTED = "2026-10-21"
LOGO = "assets/logos/aabasoft.svg"
COMPANY = "Aabasoft"
LEGAL = "Aabasoft Technologies India Private Limited"
EMAIL = "jobs@aabasoft.in"
CHAKOLAS = (
    "Aabasoft, 1st floor, Chakolas Heights, Seaport-Airport Road, "
    "Chittethukara, Kochi, Kakkanad, Kerala 682037 (near Infopark South Gate)"
)
VISMAYA = "Vismaya, Infopark, Kakkanad, Kochi 682042"
REFERRAL_PHONE = "918891454290"
REFERRAL_NOTE = "For a referral, tap Refer. It messages InfoparkDaily on WhatsApp at +91 88914 54290 for this Aabasoft position."


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
        "applyDeadline": "Rolling",
        "company": COMPANY,
        "companyLegalName": LEGAL,
        "website": "https://www.aabasoft.com",
        "email": EMAIL,
        "industry": "IT / BPO",
        "workStatus": "Full-time",
        "employmentType": "Full-time",
        "isReferral": True,
        "referralLabel": "Refer",
        "referralPhone": REFERRAL_PHONE,
        "benefits": [
            "Listing transcribed from an employer hiring creative",
            "Never pay anyone for this application",
        ],
    }
    base.update(kwargs)
    role = (base.get("roles") or ["this role"])[0]
    if role == "Business Development Executive":
        role = "Business Development Executive (BDE)"
    base["referralMessage"] = (
        "Hi InfoparkDaily,\n\n"
        "This is a referral for the following positions at Aabasoft.\n\n"
        f"Role: {role}\n"
        f"Location: {base.get('location') or 'Kakkanad, Kochi'}\n\n"
        f"🔗 Job Details: https://infoparkdaily.online/job/{base['id']}\n\n"
        "For the Business Development Executive and Technical Support Executive positions, "
        "please send your updated resume along with a cover letter via WhatsApp to +91 97446 65199.\n\n"
        "Please mention “InfoparkDaily” in your cover letter as the referral source.\n\n"
        "If you are facing any struggle with the cover letter: "
        "https://infoparkdaily.online/resume-builder/email-examples/"
    )
    return base


JOBS = [
    job(
        id="aabasoft-tele-collection-specialist-oct2026",
        pinOrder=1,
        companyBlurb="Aabasoft · Tele Collection Specialist · Malayalam, Hindi and Tamil · Kakkanad",
        location="Kakkanad, Kochi",
        roles=["Tele Collection Specialist"],
        experience="fresher",
        experienceRange="0–1 years",
        experienceYears="0–1 years",
        applyLink=f"tel:+918089003186",
        tags=["BPO", "Collections", "Voice"],
        phone="+91 8089003186",
        address=CHAKOLAS,
        workMode="Work from office",
        qualification="Any Degree / Diploma",
        skills=["Malayalam", "Hindi", "Tamil", "Convincing"],
        requirements=[
            "Good communication skills in Malayalam, Hindi and Tamil",
            "Basic convincing skills",
            "Immediate joiners preferred",
            "Qualification: Any Degree / Diploma",
            "Experience: 0–1 years",
            "Work from office",
        ],
        responsibilities=[
            "Tele collection calls from the Kakkanad office",
            "Speak with customers in Malayalam, Hindi and Tamil",
        ],
        workDetails=(
            "Tele Collection Specialist at the Aabasoft office in Chakolas Heights, "
            "near Infopark South Gate. Malayalam, Hindi and Tamil. Immediate joiners preferred."
        ),
        companyDetails=f"{LEGAL} is hiring a Tele Collection Specialist in Kakkanad, Kochi.",
        description=(
            "Aabasoft is hiring a Tele Collection Specialist. Work from office at Chakolas Heights, "
            "Seaport-Airport Road, near Infopark South Gate, Chittethukara, Kakkanad."
        ),
        howToApply=(
            "Call +91 8089003186 or email jobs@aabasoft.in. "
            "Interview location: Chakolas Heights, Seaport-Airport Road, near Infopark South Gate, "
            "Chittethukara, Kochi, Kakkanad, Kerala 682037. "
            + REFERRAL_NOTE
        ),
        hiringNotes="WhatsApp hiring poster, 21 Oct 2026. Referral via InfoparkDaily.",
    ),
    job(
        id="aabasoft-service-desk-coordinator-oct2026",
        pinOrder=2,
        companyBlurb="Aabasoft · Service Desk Coordinator · Malayalam voice · Infopark Kakkanad",
        location="Infopark, Kakkanad, Kochi",
        roles=["Service Desk Coordinator"],
        experience="fresher",
        experienceRange="Freshers preferred",
        experienceYears="Freshers preferred",
        applyLink=f"tel:+918089009751",
        tags=["Support", "BPO", "Voice"],
        phone="+91 8089009751",
        address=VISMAYA,
        workMode="On-site",
        qualification="Any degree / Diploma",
        skills=["Malayalam", "Customer complaints", "Follow-ups"],
        requirements=[
            "Good communication skills with fluency in Malayalam",
            "Ready to work a 9-hour shift",
            "Handling customer complaints and follow-ups",
            "Shift time: 9am to 6pm, 1pm to 10pm",
            "Malayalam voice process",
            "Qualification: Any degree / Diploma",
            "Freshers preferred",
            "Immediate joining preferred",
        ],
        responsibilities=[
            "Malayalam voice process for service desk",
            "Handle customer complaints and follow-ups",
        ],
        workDetails=(
            "Service Desk Coordinator at Vismaya, Infopark, Kakkanad. "
            "Malayalam voice process. Shifts 9am–6pm and 1pm–10pm."
        ),
        companyDetails=f"{LEGAL} is hiring a Service Desk Coordinator at Infopark, Kakkanad.",
        description=(
            "Aabasoft is hiring a Service Desk Coordinator for a Malayalam voice process "
            "at Vismaya, Infopark, Kakkanad, Kochi 682042."
        ),
        howToApply=(
            "Call +91 8089009751 or email jobs@aabasoft.in. "
            "Location: Vismaya, Infopark, Kakkanad, Kochi 682042. "
            + REFERRAL_NOTE
        ),
        hiringNotes="WhatsApp hiring poster, 21 Oct 2026. Referral via InfoparkDaily.",
    ),
    job(
        id="aabasoft-bde-oct2026",
        pinOrder=3,
        companyBlurb="Aabasoft · Business Development Executive · Malayalam · Kakkanad",
        location="Kakkanad, Kochi",
        roles=["Business Development Executive"],
        experience="fresher",
        experienceRange="Immediate joining",
        experienceYears="Immediate joining preferred",
        applyLink=f"tel:+918089009751",
        tags=["Sales", "Business", "BPO"],
        phone="8089009751",
        address=CHAKOLAS,
        workMode="On-site",
        qualification="Any degree / Diploma",
        skills=["Malayalam", "Telephone convincing", "Business development"],
        requirements=[
            "Good communication skills in Malayalam",
            "Excellent convincing capacity with customers over the telephone",
            "Convincing skills",
            "Shift time: 9am to 6pm",
            "Immediate joining preferred",
            "Qualification: Any degree / Diploma",
        ],
        responsibilities=[
            "Business development calls to customers",
            "Convince customers over the telephone in Malayalam",
        ],
        workDetails=(
            "Business Development Executive, shift 9am to 6pm, at Chakolas Heights, "
            "Kakkanad. Malayalam communication and telephone convincing."
        ),
        companyDetails=f"{LEGAL} is hiring a Business Development Executive in Kakkanad, Kochi.",
        description=(
            "Aabasoft is hiring a Business Development Executive. Interview at Aabasoft, "
            "1st floor, Chakolas Heights, Seaport-Airport Road, Chittethukara, Kakkanad."
        ),
        howToApply=(
            "Call 8089009751 or email jobs@aabasoft.in. "
            "Interview location: Aabasoft, 1st floor, Chakolas Heights, Seaport-Airport Road, "
            "Chittethukara, Kochi, Kakkanad, Kerala 682037. "
            + REFERRAL_NOTE
        ),
        hiringNotes="WhatsApp hiring poster, 21 Oct 2026. Referral via InfoparkDaily.",
    ),
    job(
        id="aabasoft-banking-executive-centralised-collections-oct2026",
        pinOrder=4,
        companyBlurb="Aabasoft · Banking Executive — Centralised Collections · Malayalam · Kakkanad",
        location="Kakkanad, Kochi",
        roles=["Banking Executive — Centralised Collections"],
        experience="fresher",
        experienceRange="Freshers preferred",
        experienceYears="Freshers preferred",
        applyLink=f"tel:+918089002222",
        tags=["Banking", "Collections", "BPO"],
        phone="8089002222",
        address=CHAKOLAS,
        workMode="On-site",
        qualification="Any degree / Diploma",
        skills=["Malayalam", "Telephone convincing", "Collections"],
        requirements=[
            "Good communication skills in Malayalam",
            "Excellent convincing capacity with customers over the telephone",
            "Qualification: Any degree / Diploma",
            "Freshers preferred",
            "Shift time: 9am to 6pm",
        ],
        responsibilities=[
            "Centralised collections calls for banking",
            "Speak with customers over the telephone in Malayalam",
        ],
        workDetails=(
            "Banking Executive for centralised collections. Shift 9am to 6pm. "
            "Freshers preferred. Chakolas Heights, Kakkanad."
        ),
        companyDetails=(
            f"{LEGAL} is hiring a Banking Executive for Centralised Collections in Kakkanad, Kochi."
        ),
        description=(
            "Aabasoft is hiring a Banking Executive — Centralised Collections. "
            "Interview at Aabasoft, 1st floor, Chakolas Heights, Seaport-Airport Road, "
            "Chittethukara, Kakkanad, Kerala 682037."
        ),
        howToApply=(
            "Call 8089002222 or email jobs@aabasoft.in. "
            "Interview location: Aabasoft, 1st floor, Chakolas Heights, Seaport-Airport Road, "
            "Chittethukara, Kochi, Kakkanad, Kerala 682037. "
            + REFERRAL_NOTE
        ),
        hiringNotes="WhatsApp hiring poster, 21 Oct 2026. Referral via InfoparkDaily.",
    ),
    job(
        id="aabasoft-technical-support-executive-oct2026",
        pinOrder=5,
        companyBlurb="Aabasoft · Technical Support Executive · Malayalam · ISP and networking · Kakkanad",
        location="Kakkanad, Kochi",
        roles=["Technical Support Executive"],
        experience="fresher",
        experienceRange="9-hour shifts",
        experienceYears="Ready to work a 9-hour shift",
        applyLink=f"tel:+918089002222",
        tags=["Support", "Networking", "Technical"],
        phone="8089002222",
        address=CHAKOLAS,
        workMode="On-site",
        qualification="Good communication in Malayalam",
        skills=["Malayalam", "ISP troubleshooting", "Networking"],
        requirements=[
            "Good communication skills with fluency in Malayalam",
            "Ready to work a 9-hour shift",
            "ISP troubleshooting",
            "Networking",
        ],
        responsibilities=[
            "Technical support for ISP troubleshooting",
            "Networking support on a 9-hour shift",
        ],
        workDetails=(
            "Technical Support Executive at Chakolas Heights, near Infopark South Gate. "
            "Shift times: 8 AM to 5 PM, 9 AM to 6 PM, 12 PM to 9 PM, 1 PM to 10 PM, 3 PM to 12 AM."
        ),
        companyDetails=f"{LEGAL} is hiring a Technical Support Executive in Kakkanad, Kochi.",
        description=(
            "Aabasoft is hiring a Technical Support Executive for ISP troubleshooting and networking. "
            "Location: Chakolas Heights, Seaport-Airport Road, near Infopark South Gate, "
            "Chittethukara, Kakkanad, Kerala 682037."
        ),
        howToApply=(
            "Call 8089002222 or email jobs@aabasoft.in. "
            "Shift time: 8 AM to 5 PM, 9 AM to 6 PM, 12 PM to 9 PM, 1 PM to 10 PM, 3 PM to 12 AM. "
            "Location: Chakolas Heights, Seaport-Airport Road, near Infopark South Gate, "
            "Chittethukara, Kochi, Kakkanad, Kerala 682037. "
            + REFERRAL_NOTE
        ),
        hiringNotes="WhatsApp hiring poster, 21 Oct 2026. Referral via InfoparkDaily.",
    ),
]


def main() -> None:
    print("Aabasoft 21 Oct 2026")
    mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)


if __name__ == "__main__":
    main()
