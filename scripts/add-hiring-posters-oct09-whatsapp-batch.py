#!/usr/bin/env python3
"""WhatsApp hiring poster batch — 9 Oct 2026."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

spec = importlib.util.spec_from_file_location(
    "import_park", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

spec2 = importlib.util.spec_from_file_location(
    "direct_oct09", ROOT / "scripts" / "add-direct-jobs-oct09.py"
)
direct_mod = importlib.util.module_from_spec(spec2)
spec2.loader.exec_module(direct_mod)
direct = direct_mod.direct

NBFC_LOCATIONS = (
    "Kilimanoor, Pothenkode, Karamana, Kottarakara, Anchal, Punalur, Karunagapally, "
    "Pathanamthitta, Kakkanad, Perumbavoor, North Paravur, Wadakkanchery, Parappnangadi, "
    "Nilambur, Perambra, Alakkode — Kerala"
)

AASHICO_LOCATIONS = (
    "Pathanamthitta, Kannur, Wayanad, Kasaragod, Malappuram, Thrissur, Kozhikode — Kerala"
)

JOBS = [
    direct(
        "manappuram-jewellers-riti-sales-head-thrissur",
        "Manappuram Jewellers Ltd (Riti Jewelry)",
        "Sales Head",
        "Thrissur, Kerala",
        experience="experienced",
        experience_range="10–15+ years · Jewellery & gems industry only",
        email="hrhead@manappuramjewellery.com",
        phone="9745206238",
        tags=["Sales", "Retail", "Jewellery", "Thrissur", "Leadership"],
        work_details=(
            "Lead multi-store retail sales for Riti Jewelry. Drive business growth, profitability, "
            "conversion and average bill value; coordinate with marketing, operations, HR, purchase and finance."
        ),
        requirements=[
            "Candidates only from Jewellery & Gems industry",
            "10–15+ years in jewellery/retail sales leadership",
            "Multi-store and large-team management experience",
            "Strong sales, analytics and business development skills",
            "Willingness to travel as required",
        ],
        how="Email CV to hrhead@manappuramjewellery.com or WhatsApp/call 9745 206 238",
    ),
    direct(
        "renai-medicity-ot-coordinator-palarivattom-kochi",
        "Renai Medicity (Polakulath Narayanan Multi Super Specialty Hospital)",
        "OT Coordinator",
        "Palarivattom, Kochi, Kerala",
        experience="experienced",
        experience_range="Relevant OT coordination experience · Degree (Nursing preferred)",
        email="careers@renaimedicity.org",
        phone="04844332322 / 323",
        apply_link="https://www.renaimedicity.org",
        tags=["Healthcare", "Hospital", "Kochi", "Operations"],
        work_details="Coordinate administrative activities of the operating theater (OT) at Renai Medicity, Palarivattom.",
        requirements=[
            "Any degree; nursing background preferred",
            "Post graduation in Healthcare Management is an advantage",
            "Relevant experience coordinating OT administrative activities",
        ],
        how="Email careers@renaimedicity.org or call 0484 4332322 / 323 · www.renaimedicity.org",
    ),
    direct(
        "renai-medicity-executive-purchase-palarivattom-kochi",
        "Renai Medicity (Polakulath Narayanan Multi Super Specialty Hospital)",
        "Executive Purchase",
        "Palarivattom, Kochi, Kerala",
        experience="experienced",
        experience_range="4+ years · Surgical consumables & implants procurement",
        email="careers@renaimedicity.org",
        phone="04844332322 / 323",
        apply_link="https://www.renaimedicity.org",
        tags=["Healthcare", "Procurement", "Kochi"],
        work_details="Procurement of surgical consumables and implants for a multi super specialty hospital.",
        requirements=[
            "Any degree",
            "Minimum 4 years experience in procurement of surgical consumables and implants",
        ],
        how="Email careers@renaimedicity.org or call 0484 4332322 / 323 · www.renaimedicity.org",
    ),
    direct(
        "dc-traders-machine-operator-kakkanad",
        "DC Traders",
        "Machine Operator",
        "Kakkanad, Kerala",
        experience="both",
        experience_range="Any graduates · Full time",
        employment_type="Full-time",
        email="mail@dctraders.in",
        phone="9020819070",
        apply_link="https://www.dctraders.in",
        salary="₹14,000–16,000/month + production bonus + overtime",
        tags=["Manufacturing", "Kakkanad", "Operator"],
        work_details="Operate production machinery; rearranging, checking and sorting as per process.",
        requirements=["Any degree / graduate qualification"],
        how="Call +91 9020819070 or email mail@dctraders.in · www.dctraders.in",
    ),
    direct(
        "18steps-nbfc-operations-executive-female-multiple-locations",
        "18STEPS Consultants (Leading NBFC client)",
        "Operations Executive (Female)",
        NBFC_LOCATIONS,
        experience="both",
        experience_range="1–2 years Gold Loan preferred · Freshers considered · Bachelor's degree",
        email="hr@18stepsconsultants.com",
        phone="7907722853 / 8547731964",
        apply_link="https://www.18stepsconsultants.com",
        salary="Up to ₹15k/month (freshers) · Up to ₹22k/month (experienced)",
        tags=["NBFC", "Gold Loan", "Operations", "Kerala"],
        work_details=(
            "Branch operations role for a leading NBFC across multiple Kerala locations. "
            "Gold loan operations experience preferred; freshers may be considered."
        ),
        requirements=[
            "Bachelor's degree",
            "1–2 years in gold loan operations preferred",
            "Freshers may apply",
            "Female candidates (as per employer notice)",
        ],
        how="Apply with updated CV to hr@18stepsconsultants.com · WhatsApp 79077 22853 or 85477 31964",
    ),
    direct(
        "sanford-hr-executive-gcc-kochi",
        "Sanford (Southfield Group)",
        "HR Executive - GCC",
        "Kochi, Kerala",
        experience="experienced",
        experience_range="Minimum 1 year HR · Bachelor's in HR (Master's preferred)",
        email="hr@southfieldgroup.com",
        phone="9288001844",
        tags=["HR", "GCC", "Kochi"],
        work_details="HR operations for GCC (Gulf Cooperation Council) hiring and employee lifecycle support.",
        requirements=[
            "Bachelor's degree in HR / HR Management",
            "Master's in HR is an added advantage",
            "Minimum 1 year of HR experience",
            "UAE experience preferred",
        ],
        how="Share CV on WhatsApp +91 9288 00 1844 or email hr@southfieldgroup.com",
    ),
    direct(
        "aashico-ventures-sales-executive-gi-gp-pipes-hardware",
        "Aashico Ventures LLP",
        "Sales Executive (GI & GP Pipes / Industrial Hardware)",
        AASHICO_LOCATIONS,
        experience="both",
        experience_range="2–4 years preferred · Freshers can apply",
        email="jeena@sarojroofing.in",
        phone="9961189989",
        tags=["Sales", "Industrial", "Hardware", "Kerala"],
        work_details=(
            "Sell galvanized iron (GI) & GP pipes and industrial hardware (anchor bolts, cutting wheels, "
            "wedge anchors, eye bolts, etc.) across assigned districts."
        ),
        requirements=[
            "Passion for sales and relationship building",
            "2–4 years experience preferred; freshers may apply",
            "Willingness to travel within territory",
        ],
        how="Email jeena@sarojroofing.in or WhatsApp 9961189989",
    ),
    direct(
        "rcell-sr-lab-technician-hematology-biochemistry-kozhikode",
        "R-CELL Diagnostics & Research Centre Pvt Ltd (LifeCell)",
        "Sr. Lab Technician (Hematology & Biochemistry)",
        "R-cell Tower, NH Thondayad bypass, Kozhikode, Kerala",
        experience="experienced",
        experience_range="4+ years · DMLT / B.Sc. MLT",
        email="roshith.r@lifecell.in",
        phone="8606168915",
        apply_link="https://www.rcell.in",
        tags=["Healthcare", "Lab", "Kozhikode"],
        work_details="Senior lab technician role in hematology and biochemistry sections.",
        requirements=[
            "DMLT or B.Sc. MLT",
            "4+ years relevant experience",
            "Male candidates preferred (as per employer notice)",
        ],
        how="Email roshith.r@lifecell.in or call +91 8606 168 915 · Also thanzeem.a@lifecell.in / +91 9745 050 675",
    ),
    direct(
        "rcell-lab-technician-biochemistry-kozhikode",
        "R-CELL Diagnostics & Research Centre Pvt Ltd (LifeCell)",
        "Lab Technician (Biochemistry)",
        "R-cell Tower, NH Thondayad bypass, Kozhikode, Kerala",
        experience="experienced",
        experience_range="1–2 years · DMLT / B.Sc. MLT",
        email="thanzeem.a@lifecell.in",
        phone="9745050675",
        apply_link="https://www.rcell.in",
        tags=["Healthcare", "Lab", "Kozhikode"],
        work_details="Biochemistry lab technician at R-CELL diagnostic centre.",
        requirements=[
            "DMLT or B.Sc. MLT",
            "1–2 years relevant experience",
            "Male candidates preferred (as per employer notice)",
        ],
        how="Email thanzeem.a@lifecell.in or call +91 9745 050 675 · Also roshith.r@lifecell.in / +91 8606 168 915",
    ),
    direct(
        "chinese-kitchen-commis-chef-nemmara-palakkad",
        "Chinese Kitchen (Nemmara)",
        "Commis Chef — Chinese Kitchen",
        "Nemmara, Palakkad, Kerala",
        experience="both",
        experience_range="Chinese kitchen · Cook | Learn | Grow",
        phone="8157078396",
        salary="₹15,000–22,000/month + meals + accommodation + incentives (as per policy)",
        tags=["Hospitality", "Chef", "Palakkad", "Food"],
        work_details=(
            "Join the kitchen team to prepare Chinese cuisine. Meals and accommodation provided; "
            "incentives as per company policy."
        ),
        requirements=["Interest in Chinese kitchen operations; training provided on the job"],
        how="Call 8157078396",
    ),
    direct(
        "beat-educations-multiple-roles-kerala",
        "Beat Educations",
        "Growth / Operations / Finance / Placement Manager",
        "Kerala",
        experience="both",
        experience_range="As per role · Education sector",
        email="Careers@beateducations.com",
        phone="9249524771",
        tags=["Education", "Operations", "Kerala"],
        roles=[
            "Growth Manager",
            "Operations Manager",
            "Finance Manager",
            "Placement Manager",
        ],
        work_details="Multiple manager-level openings at Beat Educations across growth, operations, finance and placements.",
        requirements=["Relevant qualification and experience for the applied role"],
        how="Email Careers@beateducations.com or call 9249524771",
    ),
    direct(
        "electromech-global-front-desk-executive-thrikkakara-kochi",
        "Electromech Global (EME)",
        "Front Desk Executive",
        "Thrikkakara, Kochi, Kerala",
        experience="both",
        experience_range="Front office / reception experience preferred",
        email="hr@electromechglobal.com",
        phone="8590036699",
        tags=["Admin", "Reception", "Kochi"],
        work_details="Front desk and reception support at Thrikkakara, Kochi office.",
        requirements=["Good communication and MS Office skills", "Prior front desk experience preferred"],
        how="Email hr@electromechglobal.com or call +91 85900 36699",
    ),
    direct(
        "bharat-financial-inclusion-hr-internship-cochin-kozhikode",
        "Bharat Financial Inclusion Ltd (IndusInd Bank)",
        "HR Internship",
        "Cochin & Kozhikode, Kerala",
        experience="fresher",
        experience_range="MBA HR · 3-month internship",
        email="arun.painkayil@bfil.co.in",
        tags=["HR", "Internship", "Kochi", "Kozhikode", "Banking"],
        work_details="3-month HR internship with Bharat Financial Inclusion Ltd (IndusInd Bank group).",
        requirements=["MBA in HR or pursuing MBA HR"],
        how="Email arun.painkayil@bfil.co.in with your CV",
    ),
    direct(
        "willmount-accountant-kochi",
        "Willmount",
        "Accountant",
        "Kochi, Kerala",
        experience="experienced",
        experience_range="1–2 years · B.Com · Zoho Books",
        email="hr@willmount.com",
        phone="9037350344",
        tags=["Finance", "Accounts", "Kochi"],
        work_details="Accounts and bookkeeping using Zoho and standard accounting practices.",
        requirements=["B.Com", "1–2 years accounting experience", "Familiarity with Zoho accounting tools"],
        how="Email hr@willmount.com or call +91 9037 350 344",
    ),
    direct(
        "bios-accountant-nettoor-ernakulam",
        "BIOS",
        "Accountant",
        "Nettoor, Ernakulam, Kerala",
        experience="experienced",
        experience_range="Accounts experience · As per employer notice",
        email="careers@biosindia.com",
        tags=["Finance", "Accounts", "Ernakulam"],
        work_details="Accountant role based at Nettoor, Ernakulam.",
        requirements=["Relevant accounting qualification and experience"],
        how="Email careers@biosindia.com",
    ),
    direct(
        "nesa-software-hr-recruiter-trainee-kochi",
        "Nesa Software",
        "HR Recruiter Trainee",
        "Kochi, Kerala",
        experience="fresher",
        experience_range="MBA preferred · Trainee",
        phone="7306377006",
        tags=["HR", "Recruitment", "IT", "Kochi", "Trainee"],
        work_details="Trainee HR recruiter supporting IT hiring at Nesa Software, Kochi.",
        requirements=["MBA preferred", "Good communication and interest in recruitment"],
        how="Call or WhatsApp 7306377006",
    ),
    direct(
        "learn-fluid-part-time-subject-tutors-online-uk",
        "Learn Fluid",
        "Part-Time Subject Tutors (Online — UK students)",
        "Remote (Kerala / India — evening IST)",
        experience="experienced",
        experience_range="M.Sc / PhD · 8:30 PM–1:00 AM IST",
        work_mode="Remote",
        email="hrd@learnfluid.com",
        tags=["Education", "Tutoring", "Remote", "Part-time"],
        work_details=(
            "Online tutoring for UK curriculum students. Sessions typically 8:30 PM to 1:00 AM IST."
        ),
        requirements=["M.Sc or PhD in relevant subject", "Strong English communication", "Stable internet for live classes"],
        how="Email hrd@learnfluid.com",
    ),
    direct(
        "bhima-jewels-driver-kochi-walk-in-tuesday",
        "Bhima Jewels",
        "Driver",
        "Kochi, Kerala",
        experience="experienced",
        experience_range="Valid driving licence · Walk-in Tuesdays",
        email="hro.tpr@bhima.com",
        phone="8086088057",
        tags=["Driver", "Kochi", "Retail"],
        work_details="Driver position with Bhima Jewels, Kochi. Walk-in interviews on Tuesdays (as per employer notice).",
        requirements=["Valid driving licence", "Safe driving record"],
        how="Walk-in on Tuesday · Email hro.tpr@bhima.com or call 80860 88057",
    ),
    direct(
        "hireluva-warehouse-sales-purchase-multiple-roles",
        "HIRELUVA",
        "Warehouse / Sales / Purchase (Multiple roles)",
        "Kerala",
        experience="experienced",
        experience_range="As per role",
        email="HIRELUVA@GMAIL.COM",
        tags=["Warehouse", "Sales", "Purchase", "Kerala"],
        roles=[
            "Warehouse Assistant",
            "Sr. Warehouse Manager",
            "Sr. Purchase Manager",
            "Area Sales Manager",
        ],
        work_details="Hiring across warehouse operations, senior warehouse management, purchase and area sales.",
        requirements=["Relevant experience for the applied role"],
        how="Email HIRELUVA@GMAIL.COM with CV and role applied for",
    ),
    direct(
        "muthoot-capital-ciso-ernakulam",
        "Muthoot Capital Services Ltd",
        "Chief Information Security Officer (CISO)",
        "Ernakulam, Kerala",
        experience="experienced",
        experience_range="Senior information security leadership",
        email="careers@muthootcap.com",
        tags=["Cybersecurity", "CISO", "Finance", "Ernakulam"],
        work_details="Lead enterprise information security program for Muthoot Capital at Ernakulam.",
        requirements=[
            "Proven CISO or senior security leadership experience",
            "Knowledge of regulatory and compliance frameworks in financial services",
        ],
        how="Email careers@muthootcap.com",
    ),
    direct(
        "beinex-ai-full-stack-engineering-program-kochi",
        "BEINEX.ai",
        "AI-Powered Full-Stack Engineering Program",
        "Kochi, Kerala",
        experience="both",
        experience_range="Engineering graduates / career switchers · Program hiring",
        email="careers@beinex.com",
        tags=["IT", "AI", "Full Stack", "Kochi", "Training"],
        work_details=(
            "Structured program to build AI-powered full-stack engineering skills with BEINEX.ai in Kochi."
        ),
        requirements=["Engineering or related technical background", "Interest in AI and full-stack development"],
        how="Email careers@beinex.com",
    ),
    direct(
        "market-pro-sales-executive-padapparamb",
        "MARKET PRO",
        "Sales Executive",
        "Padapparamb, Kerala",
        experience="experienced",
        experience_range="1–2 years sales",
        email="kauzarhiring@gmail.com",
        phone="8129313566",
        tags=["Sales", "Kerala"],
        work_details="Field sales executive based at Padapparamb.",
        requirements=["1–2 years sales experience", "Good communication"],
        how="Email kauzarhiring@gmail.com or call 8129313566",
    ),
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} WhatsApp poster jobs to jobs-data.js (skipped duplicates)")


if __name__ == "__main__":
    main()
