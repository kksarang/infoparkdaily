#!/usr/bin/env python3
"""Add hiring posters shared on 21 Oct 2026."""

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


def job(**kwargs) -> dict:
    base = {
        "logo": "",
        "postedDate": POSTED,
        "source": "WhatsApp",
        "verified": True,
        "verificationNote": NOTE,
        "isWalkIn": False,
        "walkInDate": "",
        "walkinTime": "",
        "walkinLocation": "",
        "startingDate": "",
        "applyDeadline": "Rolling",
        "skills": [],
        "benefits": [
            "Listing transcribed from an employer hiring creative",
            "Never pay anyone for this application",
        ],
    }
    base.update(kwargs)
    return base


JOBS = [
    job(
        id="technomak-walk-in-kochi-oct2026",
        pinOrder=1,
        company="Technomak Innovations LLP",
        companyBlurb="Technomak · Walk-in · Oil & Gas, MEP and HVAC · Kochi · 31 Oct 2026",
        location="Aluva, Ernakulam",
        roles=["Senior Engineer", "Engineer", "Designer", "Draftsman"],
        experience="experienced",
        experienceRange="Relevant Oil & Gas / MEP experience",
        experienceYears="Relevant industry experience required",
        employmentType="Full-time",
        applyLink="mailto:hr.cochin@technomak.com?subject=Technomak%20Kochi%20walk-in%2031%20Oct%202026",
        applyDeadline="2026-10-31",
        tags=["Engineering", "MEP", "Oil & Gas"],
        isWalkIn=True,
        walkInDate="31 October 2026 (Saturday)",
        walkinTime="10:00 AM – 5:00 PM",
        walkinLocation="1st and 3rd floor, NAJ Arcade, Near Muttom Metro Station, Thaikattukara P.O., Aluva, Ernakulam",
        email="hr.cochin@technomak.com",
        website="https://www.technomak.com",
        address="Technomak Kochi Office, 1st and 3rd floor, NAJ Arcade, Near Muttom Metro Station, Thaikattukara P.O., Aluva, Ernakulam",
        industry="Oil & Gas / MEP / HVAC",
        workMode="On-site · Kochi office",
        workStatus="Full-time",
        qualification="Engineering / Diploma / ITI",
        skills=["BIM", "Revit", "Tekla", "AutoCAD", "STAAD.Pro"],
        requirements=[
            "Experienced professionals from Oil & Gas, MEP and HVAC",
            "Electrical, Structural, Architectural, Mechanical, HVAC or Plumbing engineering",
            "Engineering, Diploma or ITI",
            "Relevant Oil & Gas or MEP experience",
            "BIM, Revit, Tekla, AutoCAD or STAAD.Pro",
            "Modular building experience is an added advantage",
        ],
        responsibilities=[
            "Engineering, design or drafting for Oil & Gas, MEP and HVAC work",
            "Electrical, structural, architectural, mechanical, HVAC or plumbing disciplines",
        ],
        workDetails=(
            "Walk-in interview on Saturday 31 October 2026, 10:00 AM to 5:00 PM, "
            "at the Technomak Kochi office."
        ),
        companyDetails="Technomak Innovations LLP is hiring experienced Oil & Gas, MEP and HVAC professionals in Kochi.",
        description="Technomak walk-in in Kochi on 31 October 2026 for Senior Engineer, Engineer, Designer and Draftsman.",
        howToApply=(
            "Attend the walk-in on 31 October 2026, 10:00 AM–5:00 PM at 1st and 3rd floor, "
            "NAJ Arcade, Near Muttom Metro Station, Thaikattukara P.O., Aluva, Ernakulam. "
            "Email an updated CV to hr.cochin@technomak.com."
        ),
        hiringNotes="WhatsApp hiring poster. Walk-in 31 Oct 2026.",
    ),
    job(
        id="collabo-hiring-infopark-oct2026",
        pinOrder=2,
        company="Collabo",
        companyBlurb="Collabo · BDE, Social Media Executive, Videographer & Editor · Infopark Kakkanad",
        location="Infopark, Kakkanad, Kochi",
        roles=[
            "Business Development Executive",
            "Social Media Executive",
            "Videographer & Editor",
        ],
        experience="both",
        experienceRange="Not stated on the poster",
        experienceYears="Not stated on the poster",
        employmentType="Full-time",
        applyLink="mailto:careers@collabo.digital?subject=Collabo%20hiring%20Infopark",
        tags=["Sales", "Social Media", "Video"],
        email="careers@collabo.digital",
        phone="+91 7306296724",
        website="https://www.collabo.digital",
        address="Infopark, Kakkanad, Kochi",
        industry="Digital",
        workMode="Infopark, Kakkanad",
        workStatus="Full-time",
        requirements=["Open positions listed on the Collabo hiring poster"],
        responsibilities=[
            "Business development",
            "Social media",
            "Videography and editing",
        ],
        workDetails="Collabo is hiring at Infopark, Kakkanad, Kochi. Send a CV to careers@collabo.digital or call +91 7306296724.",
        companyDetails="Collabo (collabo.digital) is hiring in Infopark, Kakkanad.",
        description="Collabo hiring a Business Development Executive, Social Media Executive, and Videographer & Editor at Infopark, Kakkanad.",
        howToApply="Email careers@collabo.digital or call +91 7306296724. Website: www.collabo.digital. Location: Infopark, Kakkanad, Kochi.",
        hiringNotes="WhatsApp hiring poster, Oct 2026.",
    ),
    job(
        id="kowju-airport-hotel-hr-executive-oct2026",
        pinOrder=3,
        company="Kowju Airport Hotel Calicut",
        companyBlurb="Kowju Airport Hotel · HR Executive · Calicut · 2–4 years hotel experience",
        location="Calicut International Airport, Kerala",
        roles=["HR Executive"],
        experience="experienced",
        experienceRange="2–4 years",
        experienceYears="2–4 years in the hotel industry",
        employmentType="Full-time",
        applyLink="mailto:hr@kowjuhotels.com?subject=HR%20Executive%20Kowju%20Airport%20Hotel",
        tags=["HR", "Hospitality"],
        email="hr@kowjuhotels.com",
        phone="+91 8592889909",
        address="Aeropolis, Pazhayangadi Road, Near Calicut International Airport, Kerala 673638",
        industry="Hospitality",
        workMode="On-site · hotel",
        workStatus="Full-time",
        qualification="Not stated on the poster",
        requirements=[
            "Minimum 2–4 years of experience in the hotel industry",
            "Good communication skills",
            "Able to work individually and in a team",
        ],
        responsibilities=["HR executive work at Kowju Airport Hotel, Calicut"],
        workDetails="HR Executive at Kowju Airport Hotel, near Calicut International Airport. 2–4 years in hotels.",
        companyDetails="Kowju Airport Hotel Calicut is hiring an HR Executive.",
        description="HR Executive at Kowju Airport Hotel, Calicut. 2–4 years of hotel experience.",
        howToApply="Email hr@kowjuhotels.com or call +91 8592889909.",
        hiringNotes="WhatsApp hiring poster, Oct 2026.",
    ),
    job(
        id="paywint-junior-software-tester-kochi-oct2026",
        pinOrder=4,
        company="Paywint",
        companyBlurb="Paywint · Junior Software Tester · Kochi · Playwright · 1+ year",
        location="Kochi, Kerala",
        roles=["Junior Software Tester"],
        experience="experienced",
        experienceRange="1+ year",
        experienceYears="1+ year",
        employmentType="Full-time",
        applyLink="mailto:hr.india@paywint.com?subject=Junior%20Software%20Tester%20Kochi",
        tags=["Testing", "IT"],
        email="hr.india@paywint.com",
        phone="9995849944",
        industry="Software",
        workMode="Kochi, Kerala",
        workStatus="Full-time",
        skills=["Playwright"],
        requirements=["1+ year of experience", "Playwright knowledge"],
        responsibilities=["Junior software testing with Playwright"],
        workDetails="Junior Software Tester in Kochi. 1+ year of experience and Playwright knowledge required.",
        companyDetails="Paywint is hiring a Junior Software Tester in Kochi, Kerala.",
        description="Junior Software Tester at Paywint, Kochi. 1+ year. Playwright required.",
        howToApply="WhatsApp 9995849944 or email hr.india@paywint.com.",
        hiringNotes="WhatsApp hiring poster, Oct 2026.",
    ),
    job(
        id="cube-innovators-project-administrator-oct2026",
        pinOrder=5,
        company="Cube Innovators",
        companyBlurb="Cube Innovators · Project Administrator · Backlog scanning · Kerala · site-based",
        location="Kerala",
        roles=["Project Administrator — Backlog Scanning Project"],
        experience="experienced",
        experienceRange="Experienced administrator",
        experienceYears="Experienced",
        employmentType="Full-time",
        applyLink="mailto:jobs@cubeinnovators.com?subject=Project%20Administrator%20Backlog%20Scanning",
        tags=["Operations", "Documents"],
        email="jobs@cubeinnovators.com",
        phone="+91 9846933522",
        website="https://www.cubeinnovators.com",
        address="Kerala — site-based. Cube Innovators Technologies also lists India, UAE, Oman, Qatar, Bahrain, Kuwait and KSA.",
        industry="Document management",
        workMode="Site-based · travel between project sites in Kerala",
        workStatus="Full-time",
        requirements=[
            "Experienced, dynamic administrator",
            "Willing to travel between project sites in Kerala",
            "Own car, scooter or motorbike",
        ],
        responsibilities=[
            "Oversee day-to-day scanning operations",
            "Coordinate team members and client communication",
            "Maintain quality standards",
            "Track progress and support project delivery",
        ],
        workDetails="Site-based Project Administrator for a backlog scanning project in Kerala. Own vehicle required.",
        companyDetails="Cube Innovators Technologies, a document management company, is hiring a Project Administrator in Kerala.",
        description="Project Administrator for Cube Innovators' backlog scanning project. Site-based in Kerala.",
        howToApply="Email jobs@cubeinnovators.com or call / WhatsApp +91 98469 33522.",
        hiringNotes="WhatsApp hiring poster, Oct 2026.",
    ),
    job(
        id="caritas-hospital-hiring-oct2026",
        pinOrder=6,
        company="Caritas Hospital & Institute of Health Sciences",
        companyBlurb="Caritas Hospital · Operations, OT and Lab · Apply by 31 Oct 2026",
        location="Kerala",
        roles=[
            "Executive / Sr. Executive — Operations",
            "Associate — Operations",
            "Executive OT",
            "Lab Technician",
        ],
        experience="experienced",
        experienceRange="1–5 years (role-wise)",
        experienceYears="1–5 years depending on the role",
        employmentType="Full-time",
        applyLink="mailto:hr@caritashospital.org?subject=Caritas%20Hospital%20hiring",
        applyDeadline="2026-10-31",
        tags=["Healthcare", "Hospital"],
        email="hr@caritashospital.org",
        phone="0481 2790025, 9497713567",
        website="https://www.caritashospital.org",
        industry="Healthcare",
        workMode="Hospital",
        workStatus="Full-time",
        qualification="MSW / MHA / MBA, any graduation, B.Sc Nursing / MHA, or B.Sc MLT / DMLT — role-wise",
        requirements=[
            "Executive / Sr. Executive — Operations: MSW / MHA / MBA in Healthcare Management, minimum 3–5 years in a reputed hospital with NABH / JCI accreditation",
            "Associate — Operations: any graduation, minimum 1 year in a reputed hospital with NABH / JCI accreditation",
            "Executive OT: B.Sc Nursing / MHA, minimum 1 year of operation theatre experience in a reputed hospital",
            "Lab Technician: B.Sc MLT / DMLT, minimum 1–3 years",
        ],
        responsibilities=[
            "Hospital operations",
            "Operation theatre executive work",
            "Laboratory technician work",
        ],
        workDetails="Caritas Hospital is hiring operations, OT and lab roles. Apply on or before 31 October 2026.",
        companyDetails="Caritas Hospital & Institute of Health Sciences. Apply by 31 October 2026.",
        description="Caritas Hospital hiring for operations, OT and lab roles. Deadline 31 October 2026.",
        howToApply=(
            "Email a CV to hr@caritashospital.org by 31 October 2026. "
            "Phone 0481 2790025–29 (6067 extension) or 9497713567."
        ),
        hiringNotes="WhatsApp hiring poster. Apply on or before 31 Oct 2026.",
    ),
    job(
        id="acciojob-gotrust-implementation-engineer-pune-oct2026",
        pinOrder=7,
        company="AccioJob × GoTrust",
        companyBlurb="AccioJob × GoTrust · Implementation Engineer · Walk-in · Pune · CTC up to 5 LPA",
        location="Pune",
        roles=["Implementation Engineer"],
        experience="both",
        experienceRange="Not stated on the poster",
        experienceYears="Not stated on the poster",
        employmentType="Full-time",
        applyLink="",
        tags=["IT", "Implementation"],
        salaryRange="CTC up to 5 LPA",
        isWalkIn=True,
        walkInDate="Date not printed on the poster",
        walkinLocation="AccioJob Skill Centre, Pune",
        address="AccioJob Skill Centre, Pune",
        industry="IT",
        workMode="Offline assessment at AccioJob Skill Centre, Pune",
        workStatus="Full-time",
        requirements=["Implementation Engineer", "Offline assessment in Pune"],
        responsibilities=["Implementation engineering for the GoTrust hiring drive"],
        workDetails=(
            "Free walk-in hiring drive for an Implementation Engineer. "
            "CTC up to 5 LPA. Offline assessment at AccioJob Skill Centre, Pune. "
            "The poster does not print an email address or apply URL."
        ),
        companyDetails="AccioJob and GoTrust hiring drive for an Implementation Engineer in Pune.",
        description="Implementation Engineer walk-in with AccioJob and GoTrust in Pune. CTC up to 5 LPA.",
        howToApply=(
            "The poster says Apply Now and gives the venue as AccioJob Skill Centre, Pune. "
            "It does not print an email or website. Confirm the apply link on the official AccioJob or GoTrust channel before you travel."
        ),
        hiringNotes="WhatsApp hiring poster. Walk-in date is not printed.",
    ),
    job(
        id="bliss-fertility-hospital-hiring-oct2026",
        pinOrder=8,
        company="Bliss Fertility Hospital",
        companyBlurb="Bliss Fertility Hospital · Front Office Executive and Lab In-Charge",
        location="Kerala",
        roles=[
            "Front Office Executive",
            "Lab In-Charge (MLT with Kerala registration)",
        ],
        experience="both",
        experienceRange="Not stated on the poster",
        experienceYears="Not stated on the poster",
        employmentType="Full-time",
        applyLink="mailto:hr@blissfertility.in?subject=Bliss%20Fertility%20Hospital%20hiring",
        tags=["Healthcare", "Hospital"],
        email="hr@blissfertility.in",
        phone="+91 62626 23262",
        industry="Healthcare / IVF",
        workMode="Hospital",
        workStatus="Full-time",
        requirements=[
            "Front Office Executive",
            "Lab In-Charge: MLT with Kerala registration",
        ],
        responsibilities=["Front office", "IVF laboratory in-charge work"],
        benefits=[
            "Competitive salary and benefits",
            "State-of-the-art IVF laboratory",
            "Supportive work environment",
            "Never pay anyone for this application",
        ],
        workDetails="Bliss Fertility Hospital is hiring a Front Office Executive and a Lab In-Charge. The city is not printed on the poster.",
        companyDetails="Bliss Fertility Hospital is hiring front office and lab staff.",
        description="Front Office Executive and Lab In-Charge at Bliss Fertility Hospital.",
        howToApply="Email hr@blissfertility.in or WhatsApp +91 62626 23262.",
        hiringNotes="WhatsApp hiring poster, Oct 2026. City is not printed.",
    ),
    job(
        id="mar-sleeva-medicity-cathlab-technician-oct2026",
        pinOrder=9,
        company="Mar Sleeva Medicity Palai",
        companyBlurb="Mar Sleeva Medicity Palai · Cathlab Technician · 2+ years",
        location="Palai, Kerala",
        roles=["Cathlab Technician"],
        experience="experienced",
        experienceRange="Minimum 2 years",
        experienceYears="Minimum 2 years",
        employmentType="Full-time",
        applyLink="mailto:jobs@marsleevamedicity.com?subject=Cathlab%20Technician",
        tags=["Healthcare", "Hospital"],
        email="jobs@marsleevamedicity.com",
        phone="+91 9188525970, +91 8281699258",
        website="https://marsleevamedicity.com",
        industry="Healthcare",
        workMode="Hospital · Palai",
        workStatus="Full-time",
        qualification="B.Sc. / M.Sc. in Cardiac Care Technology",
        requirements=[
            "B.Sc. or M.Sc. in Cardiac Care Technology",
            "Minimum 2 years of experience",
        ],
        responsibilities=["Cathlab technician work"],
        workDetails="Cathlab Technician at Mar Sleeva Medicity, Palai. Minimum 2 years. B.Sc. or M.Sc. in Cardiac Care Technology.",
        companyDetails="Mar Sleeva Medicity Palai is hiring a Cathlab Technician.",
        description="Cathlab Technician at Mar Sleeva Medicity, Palai. Minimum 2 years.",
        howToApply=(
            "Email jobs@marsleevamedicity.com or apply at marsleevamedicity.com. "
            "For more information: +91 9188525970 or +91 8281699258. "
            "Queries: 04822 359900 / 354900, 269700."
        ),
        hiringNotes="WhatsApp hiring poster, Oct 2026.",
    ),
    job(
        id="upasana-hospital-hiring-oct2026",
        pinOrder=10,
        company="Upasana Hospital",
        companyBlurb="Upasana Hospital · Pharmacist, Gastroenterology Technician, Marketing · RP Group",
        location="Kollam, Kerala",
        roles=[
            "Pharmacist",
            "Gastroenterology Technician",
            "Marketing Executive / Assistant Manager",
        ],
        experience="both",
        experienceRange="0–2 years (role-wise)",
        experienceYears="0–2 years depending on the role",
        employmentType="Full-time",
        applyLink="mailto:hrmanager@upasanahospital.com?subject=Upasana%20Hospital%20hiring",
        tags=["Healthcare", "Pharmacy", "Marketing"],
        email="hrmanager@upasanahospital.com",
        phone="9074393565, 9447082817, 9645499985",
        industry="Healthcare",
        workMode="Hospital",
        workStatus="Full-time",
        salaryRange="Pharmacist: negotiable",
        qualification="D.Pharm / B.Pharm for Pharmacist; relevant qualification for Gastroenterology Technician",
        requirements=[
            "Pharmacist: D.Pharm or B.Pharm, 0–1 year minimum, freshers can apply, salary negotiable",
            "Gastroenterology Technician: relevant qualification mandatory, prior experience essential, hands-on GI preferred, immediate joiners preferred",
            "Marketing Executive / Assistant Manager: 0–2 years in a hospital or pharmaceutical field",
        ],
        responsibilities=[
            "Pharmacy",
            "Gastroenterology technician work",
            "Hospital or pharmaceutical marketing",
        ],
        workDetails="Upasana Hospital (RP Group) is hiring a Pharmacist, a Gastroenterology Technician, and a Marketing Executive / Assistant Manager. The landline on the poster is 0474 3510000.",
        companyDetails="Upasana Hospital, a unit of RP Group, is hiring pharmacy, gastroenterology and marketing staff.",
        description="Upasana Hospital hiring a Pharmacist, Gastroenterology Technician, and Marketing Executive / Assistant Manager.",
        howToApply=(
            "Email hrmanager@upasanahospital.com or hrm@upasanahospital.com. "
            "Phone 9074393565, 9447082817 or 96454 99985. Hospital: 0474 3510000."
        ),
        hiringNotes="WhatsApp hiring poster, Oct 2026. Location taken from the 0474 landline.",
    ),
    job(
        id="fragomen-hr-specialist-kochi-oct2026",
        pinOrder=11,
        company="Fragomen India",
        companyBlurb="Fragomen India · HR Specialist / Assistant HR Manager · Kochi · 6+ years",
        location="Kochi",
        roles=["HR Specialist / Assistant HR Manager"],
        experience="experienced",
        experienceRange="6+ years",
        experienceYears="6+ years",
        employmentType="Full-time",
        applyLink="mailto:athottan@fragomen.com?subject=HR%20Specialist%20Kochi",
        tags=["HR"],
        email="athottan@fragomen.com",
        website="https://www.fragomen.com",
        address="Kochi (in office)",
        industry="Immigration services",
        workMode="In office · Kochi",
        workStatus="Full-time",
        qualification="MBA in HR or a related discipline",
        requirements=[
            "6+ years of experience",
            "MBA in HR or a related discipline",
            "Kochi, in office",
        ],
        responsibilities=[
            "Business partnership and HR operations",
            "HR generalist work",
            "Talent acquisition",
        ],
        workDetails="HR Specialist / Assistant HR Manager in Kochi. Business partnership, HR operations, HR generalist work and talent acquisition. 6+ years. MBA in HR.",
        companyDetails="Fragomen India is hiring an HR Specialist / Assistant HR Manager in Kochi.",
        description="HR Specialist / Assistant HR Manager at Fragomen India, Kochi. 6+ years. MBA in HR.",
        howToApply="Email athottan@fragomen.com or bvarghese@fragomen.com.",
        hiringNotes="WhatsApp hiring poster, Oct 2026.",
    ),
    job(
        id="ar-super-speciality-operations-manager-oct2026",
        pinOrder=12,
        company="AR Super Speciality Hospital",
        companyBlurb="AR Super Speciality Hospital · Operations Manager · Kodungallur · 2–4 years",
        location="Kodungallur, Thrissur",
        roles=["Operations Manager"],
        experience="experienced",
        experienceRange="2–4 years",
        experienceYears="2–4 years",
        employmentType="Full-time",
        applyLink="mailto:careers@arsuperspeciality.com?subject=Operations%20Manager",
        tags=["Healthcare", "Hospital"],
        email="careers@arsuperspeciality.com",
        phone="+91 8547049030",
        website="https://www.arhospital.in",
        address="AR Super Speciality Hospital, Kodungallur, Thrissur",
        industry="Healthcare",
        workMode="Hospital · Kodungallur",
        workStatus="Full-time",
        qualification="MHA / MBA",
        salaryRange="Negotiable",
        requirements=["MHA or MBA", "2–4 years of experience"],
        responsibilities=["Hospital operations management"],
        workDetails="Operations Manager at AR Super Speciality Hospital, Kodungallur. MHA or MBA. 2–4 years. Salary negotiable.",
        companyDetails="AR Super Speciality Hospital, Kodungallur, Thrissur, is hiring an Operations Manager.",
        description="Operations Manager at AR Super Speciality Hospital, Kodungallur. MHA/MBA. 2–4 years.",
        howToApply="Email careers@arsuperspeciality.com or call +91 8547 049 030.",
        hiringNotes="WhatsApp hiring poster, Oct 2026.",
    ),
]


def shift_existing_pins(path: Path, offset: int) -> None:
    text = path.read_text(encoding="utf-8")
    # Only the pins already published above this batch.
    for old, new in (
        ("pinOrder: 7,", f"pinOrder: {7 + offset},"),
        ("pinOrder: 6,", f"pinOrder: {6 + offset},"),
        ("pinOrder: 5,", f"pinOrder: {5 + offset},"),
        ("pinOrder: 4,", f"pinOrder: {4 + offset},"),
        ("pinOrder: 3,", f"pinOrder: {3 + offset},"),
        ("pinOrder: 2,", f"pinOrder: {2 + offset},"),
        ("pinOrder: 1,", f"pinOrder: {1 + offset},"),
    ):
        count = text.count(old)
        if count != 1:
            raise SystemExit(f"{old} found {count} times")
        text = text.replace(old, new, 1)
    path.write_text(text, encoding="utf-8")


def main() -> None:
    path = ROOT / "data" / "jobs-data.js"
    shift_existing_pins(path, len(JOBS))
    print("Hiring posters 21 Oct 2026")
    mod.insert_jobs(path, "JOBS", JOBS)


if __name__ == "__main__":
    main()
