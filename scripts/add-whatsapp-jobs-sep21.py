#!/usr/bin/env python3
"""Add WhatsApp hiring creatives collected 21 Sep 2026."""

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
        "benefits": [
            "Listing transcribed from an employer hiring creative",
            "Never pay anyone for this application",
        ],
    }
    base.update(kwargs)
    return base


def wa(
    slug: str,
    company: str,
    role: str,
    location: str,
    *,
    experience: str = "both",
    experience_range: str = "As per posting",
    employment: str = "Full-time",
    tags: list[str] | None = None,
    email: str = "",
    phone: str = "",
    website: str = "",
    salary: str = "",
    vacancies: int | None = None,
    walk_in: bool = False,
    walk_in_date: str = "",
    extra: dict | None = None,
) -> dict:
    subject = role.replace(" ", "%20").replace("–", "-")
    apply = f"mailto:{email}?subject={subject}%20%E2%80%94%20{company.replace(' ', '%20')}" if email else ""
    data = job(
        id=f"{slug}-sep2026",
        company=company,
        companyBlurb=f"{company} · {role} · {location}",
        location=location,
        roles=[role],
        experience=experience,
        experienceRange=experience_range,
        employmentType=employment,
        applyLink=apply,
        tags=tags or ["Kerala"],
        email=email,
        phone=phone,
        website=website,
        industry="As per employer notice",
        companyDetails=f"{company} is hiring for {role} at {location}.",
        workDetails=f"{role} at {company}, {location}. {experience_range}.",
        workStatus=employment,
        workMode="As per employer notice",
        experienceYears=experience_range,
        requirements=[f"Role: {role}", f"Location: {location}", experience_range],
        responsibilities=[f"Deliver outcomes for the {role} role as briefed by the employer"],
        howToApply=(
            f"Email {email}" if email else f"Call {phone}"
        ) + (f" or call {phone}" if email and phone else ""),
        hiringNotes=f"Source: WhatsApp hiring creative · Sep 2026.",
        description=f"{role} at {company} · {location}.",
    )
    if salary:
        data["salary"] = salary
        data["salaryRange"] = salary
    if vacancies:
        data["vacancies"] = vacancies
        data["vacancyText"] = f"{vacancies} vacancies"
    if walk_in:
        data["isWalkIn"] = True
        data["walkInDate"] = walk_in_date
    if extra:
        data.update(extra)
    return data


JOBS = [
    wa(
        "brd-car-world-video-presenter-thrissur",
        "BRD Car World Limited",
        "Video Presenter",
        "Thalore, Thrissur (Maruti Suzuki Arena)",
        experience="experienced",
        experience_range="3–5 years · Female · Any degree",
        tags=["Media", "Automobile"],
        email="hiran@brdcarworld.com",
        phone="8138913230",
        salary="₹25,000",
        extra={
            "workDetails": "Female video presenter for brand promotion. Any degree. 3–5 years experience. Salary ₹25,000.",
            "requirements": [
                "Female candidates",
                "Any degree",
                "3–5 years experience",
                "Video presentation / brand promotion",
            ],
        },
    ),
    wa(
        "brd-car-world-mechanic-kochi-thrissur",
        "BRD Car World Limited",
        "Mechanic",
        "Aluva · Kakkanad · Irumpanam · Thalore · Chavakkad · Thrithallur",
        experience="both",
        experience_range="ITI / Diploma (Automobile/Mechanical) · 1–2 years · Freshers can apply",
        tags=["Automobile", "Technical"],
        email="hiran@brdcarworld.com",
        phone="8138913230",
        extra={
            "workDetails": "Mechanic for Maruti Suzuki Arena dealerships. Male. ITI or Diploma in Automobile/Mechanical. 1–2 years preferred; freshers can apply.",
        },
    ),
    wa(
        "jio-point-assistant-manager-varkala",
        "Jio",
        "Jio Point Assistant Manager",
        "Varkala–Trivandrum",
        experience="fresher",
        experience_range="Fresher · Plus two / Any degree / Diploma",
        tags=["Telecom", "Retail"],
        email="Siji.ps@ril.com",
        phone="9249537423 / 8921177568",
        website="https://careers.jio.com",
        salary="₹2,49,182 annual CTC",
        extra={
            "workDetails": "Jio Point store operations, new customer acquisition (Jio SIM & Airfiber), customer services, stock and inventory management. Register at careers.jio.com.",
        },
    ),
    wa(
        "jio-point-manager-attingal",
        "Jio",
        "Jio Point Manager",
        "Navaikulam, Attingal",
        experience="experienced",
        experience_range="1 year · Plus two / Any degree / Diploma",
        tags=["Telecom", "Sales"],
        email="Siji.ps@ril.com",
        phone="8921177568 / 9249537423",
        website="https://careers.jio.com",
        salary="₹3,38,128 annual CTC",
        extra={
            "workDetails": "New customer acquisition, distribution management, sales and revenue targets, retailer engagement, market expansion.",
        },
    ),
    wa(
        "chrisma-petrol-pump-manager-ernakulam",
        "Chrisma Consultancy",
        "Petrol Pump Manager",
        "Ernakulam",
        experience="experienced",
        experience_range="Minimum 1 year in similar role · Male only",
        tags=["Operations"],
        phone="9947337555",
        vacancies=2,
        salary="₹20,000 and above · Free food & accommodation",
        extra={
            "workDetails": "Petrol pump manager (male only). Minimum 1 year experience. Rotational day and night shifts. 2 vacancies. Free food and accommodation.",
            "howToApply": "Contact Chrisma Consultancy at 9947 337 555",
        },
    ),
    wa(
        "lazdana-front-office-associate-bangalore",
        "Lazdana Hotels & Resorts",
        "Front Office Associate",
        "Bangalore (Kerala & Karnataka candidates preferred)",
        experience="experienced",
        experience_range="Minimum 1 year in hospitality",
        tags=["Hospitality"],
        email="hr.blr@lazdana.com",
        phone="7902711118",
        extra={
            "workDetails": "Check-in/check-out, reservations, guest assistance. English and Hindi required; Malayalam is an advantage. MS Office proficiency.",
        },
    ),
    wa(
        "medical-gloves-production-supervisor-nanguneri",
        "Medical Surgical Gloves Manufacturing",
        "Production Supervisor",
        "Nanguneri, Tirunelveli District",
        experience="both",
        experience_range="Diploma Mechanical / Polymer · Fresher to 1 year",
        tags=["Manufacturing"],
        phone="9976023120",
        vacancies=4,
        extra={
            "howToApply": "Forward resume via WhatsApp to 99760 23120",
            "workDetails": "4 vacancies. Diploma in Mechanical Engineering or Polymer Technology. Freshers or up to 1 year experience. Attractive salary and benefits.",
        },
    ),
    wa(
        "istore-digital-marketer",
        "iStore Digital",
        "Digital Marketer",
        "Kerala",
        experience="fresher",
        experience_range="Freshers · Age 25 or below",
        tags=["Marketing", "Digital"],
        phone="+91 9037995394",
        website="https://www.istoredigital.com",
        salary="₹15,000+ per month",
    ),
    wa(
        "kerala-savaari-driver-onboarding-calicut",
        "Kerala Savaari",
        "Driver Onboarding & Support Executive",
        "Calicut (Kozhikode)",
        experience="fresher",
        experience_range="Any degree · Part-time / Full-time",
        tags=["Operations", "Government"],
        phone="+91 7907348912",
        salary="Up to ₹15,000 per month",
        extra={
            "workDetails": "Govt. of Kerala ride-hailing initiative. Onboard drivers, assist with app installation and usage.",
        },
    ),
    job(
        id="easy-store-mega-recruitment-thodupuzha-sep2026",
        company="easy store",
        companyBlurb="easy store · Mega Recruitment Drive · Walk-in · Thodupuzha · All Kerala",
        location="Thodupuzha, Kerala (All Kerala vacancies)",
        roles=[
            "Branch Accountant",
            "Brand Promoter",
            "Technician (Mobile & Laptop)",
            "Warehouse Staff",
            "Telecaller",
            "Junior Graphic Designer",
            "Sales Staff (Mobile, Accessories, TV & Audio)",
        ],
        experience="both",
        experienceRange="Relevant experience preferred · B.Com/BBA for accounts · Any degree for others",
        employmentType="Full-time",
        applyLink="mailto:kerala.hr@easystoremea.com?subject=easy%20store%20Recruitment%20Drive",
        tags=["Retail", "Walk-in"],
        isWalkIn=True,
        walkInDate="2026-09-20",
        email="kerala.hr@easystoremea.com",
        phone="+91 8606600068",
        website="",
        industry="Retail / Electronics",
        companyDetails="easy store mega recruitment drive at Thodupuzha. All Kerala vacancies; relocation candidates welcome.",
        workDetails=(
            "Walk-in interview Sunday 20 Sep 2026, 10:00 AM – 4:00 PM at Easy Store Thodupuzha, "
            "Near Ambadi Tourist Home, Bhima Jn., Thodupuzha–Muvattupuzha Road. "
            "Roles: Branch Accountant, Brand Promoters, Technicians, Warehouse Staff, Telecallers, "
            "Junior Graphic Designers, Sales Staff."
        ),
        workStatus="Full-time",
        workMode="On-site · Kerala",
        experienceYears="Relevant experience preferred",
        skills=["Retail sales", "Accounts", "Telecalling", "Graphic design", "Mobile/laptop repair"],
        requirements=[
            "Accounts: B.Com / BBA",
            "Other roles: Any degree",
            "Bring updated CV to walk-in",
            "Willing to relocate across Kerala for some roles",
        ],
        responsibilities=["Role-specific duties as assigned during interview"],
        howToApply="Walk in on 20 Sep 2026 or email kerala.hr@easystoremea.com / call +91 8606 600 068",
        hiringNotes="Source: easy store recruitment flyer · Sep 2026.",
        description="easy store mega walk-in recruitment · Thodupuzha · Multiple retail roles across Kerala.",
        postedDate=POSTED,
        source="WhatsApp",
        verified=True,
        verificationNote=NOTE,
        applyDeadline="Rolling",
    ),
    job(
        id="quest-front-desk-admin-walkin-kadavanthra-sep2026",
        company="Quest Innovative Solutions",
        companyBlurb="Quest / QIS Academy · Front Desk & Admin Executive · Walk-in Kadavanthra",
        location="Kadavanthra, Kochi",
        roles=["Front Desk and Admin Executive"],
        experience="experienced",
        experienceRange="Minimum 1 year front office",
        employmentType="Full-time",
        applyLink="mailto:careers@qis.co.in?subject=Front%20Desk%20and%20Admin%20Executive",
        tags=["Admin", "Walk-in", "Infopark"],
        isWalkIn=True,
        walkInDate="2026-09-21",
        email="careers@qis.co.in",
        phone="8075156473",
        website="https://www.qisacademy.com",
        industry="IT / Education",
        companyDetails="Quest Innovative Solutions / QIS Academy, Kadavanthra, Kochi.",
        workDetails=(
            "Front desk and admin executive. Any graduation. Minimum 1 year front office experience. "
            "Good communication and MS Office. Walk-in 21 & 22 Sep 2026, 10:00 AM – 3:00 PM at "
            "MKS Towers, Sahodaran Ayyappan Rd, above HDFC Bank, Kadavanthra."
        ),
        workStatus="Full-time",
        workMode="On-site · Kadavanthra, Kochi",
        experienceYears="1+ year",
        skills=["MS Office", "Front office", "Communication"],
        requirements=["Any graduation", "Minimum 1 year front office duties", "Good communication", "MS Office"],
        responsibilities=["Front desk operations and admin support"],
        howToApply="Walk in 21–22 Sep 2026 or email careers@qis.co.in / call 8075156473",
        hiringNotes="Source: Quest walk-in flyer · Sep 2026.",
        description="Front Desk & Admin Executive walk-in at Quest Innovative Solutions, Kadavanthra.",
        postedDate=POSTED,
        source="WhatsApp",
        verified=True,
        verificationNote=NOTE,
        applyDeadline="Rolling",
    ),
    wa(
        "blueberrys-heavy-driver-thrissur",
        "blueberry's",
        "Heavy Driver",
        "Thrissur (Kechery)",
        experience="experienced",
        experience_range="7+ years driving · Within 20 km of Kechery preferred",
        tags=["Logistics"],
        email="hr@blueberrysindia.in",
        phone="+91 6238900948",
        website="https://blueberrysindia.com",
        salary="As per industry standards",
    ),
    wa(
        "aj-holdings-it-support-dubai",
        "AJ Holdings LLC FZ",
        "IT Support Executive",
        "Dubai, UAE",
        experience="experienced",
        experience_range="1–3 years IT Helpdesk / Desktop Support",
        tags=["IT", "Support", "UAE"],
        email="hro@ajh-co.com",
        employment="Full-time",
        extra={
            "qualification": "Diploma/Degree/Certification in IT, Computer Science, or Networking",
            "workDetails": "Windows & hardware troubleshooting, Microsoft 365, TCP/IP, DNS, DHCP, Wi-Fi, LAN. 3CX/VoIP advantage. On-site support.",
        },
    ),
    wa(
        "devsecops-engineer-infopark-kochi",
        "Infopark Company",
        "DevSecOps Engineer (AI & Cloud Security Focus)",
        "Infopark, Kochi",
        experience="experienced",
        experience_range="5+ years · 3–4+ years DevSecOps/Cloud Security",
        tags=["IT", "DevOps", "Cloud", "Infopark"],
        phone="+91 8089348392",
        extra={
            "howToApply": "Connect via WhatsApp +91 80893 48392",
            "workDetails": "Azure DevOps, Key Vault, Defender, Entra ID, Kubernetes/Docker, Terraform/Bicep, CI/CD security (Snyk, SonarQube, Trivy), GitHub Actions/Azure Pipelines, AI/LLM security.",
        },
    ),
    job(
        id="palal-group-automobile-hiring-kochi-sep2026",
        company="Palal Group",
        companyBlurb="Palal Group · Automobile dealership hiring · Kochi & Aluva",
        location="Nettoor · Ernakulam · Thrippunithura · Aluva, Kochi",
        roles=[
            "General Manager – Service",
            "Manager – Service",
            "Service Advisor",
            "Technician",
            "General Manager – Sales",
            "Sales Officer",
            "Accounts Executive",
            "HR Executive",
            "Telecaller",
            "Receptionist",
            "Drivers",
        ],
        experience="both",
        experienceRange="Role-wise · Two-wheeler dealership",
        employmentType="Full-time",
        applyLink="mailto:hr.palalauto@gmail.com?subject=Palal%20Group%20Hiring",
        tags=["Automobile", "Sales", "Service"],
        email="hr.palalauto@gmail.com",
        phone="+91 8891021202 / 7907097074",
        industry="Automobile dealership",
        companyDetails="Palal Group automobile dealerships in central Kerala — Kochi and Aluva locations.",
        workDetails=(
            "Multiple openings across service, sales, accounts, HR, telecalling, reception, and drivers "
            "for existing and upcoming two-wheeler dealerships."
        ),
        workStatus="Full-time",
        workMode="On-site · Kochi / Aluva",
        experienceYears="Role-wise",
        skills=["Automobile sales", "Service", "Accounts", "HR"],
        requirements=["Send CV mentioning preferred role", "Experience as per role"],
        responsibilities=["Role-specific duties at Palal Group dealerships"],
        howToApply="Email hr.palalauto@gmail.com or hr@palalmotors.co.in · Call 88910 21202 / 79070 97074",
        hiringNotes="Source: Palal Group hiring flyer · Sep 2026.",
        description="Palal Group hiring across service, sales, accounts, HR and support roles in Kochi.",
        postedDate=POSTED,
        source="WhatsApp",
        verified=True,
        verificationNote=NOTE,
        applyDeadline="Rolling",
        benefits=["Listing transcribed from an employer hiring creative", "Never pay anyone for this application"],
        logo="",
        isWalkIn=False,
        walkInDate="",
        startingDate="",
    ),
    *[
        wa(
            f"macare-{slug}",
            "MACare (Manappuram Health Care)",
            role,
            "Valapad · Mathilakam · Cherpu · Kattoor · Kanjany · Vadanappally",
            experience=exp,
            experience_range=exp_range,
            tags=["Healthcare"],
            email="hr@macare.in",
            phone="8891857682 / 8086366160",
            extra={"requirements": reqs},
        )
        for slug, role, exp, exp_range, reqs in [
            (
                "pharmacist",
                "Pharmacy in charge / Pharmacist",
                "experienced",
                "B Pharm / D Pharm · 5 years",
                ["B Pharm / D Pharm", "5 years experience"],
            ),
            (
                "nurse",
                "Nurse",
                "experienced",
                "GNM / BSc Nursing · 5 years",
                ["GNM / BSc Nursing", "5 years experience"],
            ),
            (
                "lab-technician",
                "Laboratory Technician",
                "experienced",
                "DMLT / BSc MLT · 5 years",
                ["DMLT (DME) / BSc MLT", "5 years experience"],
            ),
            (
                "receptionist",
                "Receptionist",
                "experienced",
                "Any degree · Clinical/hospital experience · 5 years",
                ["Any degree", "Clinical / hospital experience", "5 years"],
            ),
            (
                "patient-care",
                "Patient Care",
                "experienced",
                "Any degree · Attender experience · 5 years",
                ["Any degree", "Attender experience", "5 years"],
            ),
            (
                "home-collection",
                "Home Collection",
                "both",
                "10th / +2 · 2-wheeler license",
                ["10th / +2 qualified", "Valid two-wheeler license"],
            ),
            (
                "housekeeping",
                "Housekeeping",
                "fresher",
                "10th qualified",
                ["10th qualified"],
            ),
        ]
    ],
    wa(
        "helett-finance-executive-calicut",
        "Helett Enterprises LLP",
        "Finance Executive",
        "Calicut",
        experience="both",
        experience_range="B.Com / M.Com / MBA Finance / ACCA / CMA",
        tags=["Finance", "Accounts"],
        email="hr@helett.com",
        phone="9946100622",
        website="https://www.helett.in",
        extra={
            "workDetails": "Strong accounting & Excel, GST & TDS. E-commerce and Amazon marketplace finance experience preferred. Odoo/ERP advantage. Immediate joiners preferred.",
            "requirements": [
                "B.Com / M.Com / MBA Finance / ACCA / CMA",
                "Strong accounting & Excel",
                "GST & TDS knowledge",
                "E-commerce / Amazon marketplace finance preferred",
                "Immediate joiners preferred",
            ],
        },
    ),
    wa(
        "big-tv-drivers-ernakulam",
        "BIG TV",
        "Driver",
        "Ernakulam",
        experience="both",
        experience_range="SSLC · Valid driving license",
        tags=["Driver"],
        phone="9072354227",
    ),
    wa(
        "codenzic-java-spring-boot-developer",
        "codenzic",
        "Java Spring Boot Developer",
        "Kochi",
        experience="experienced",
        experience_range="1–2 years",
        tags=["IT", "Java"],
        website="https://www.codenzic.com",
        extra={"howToApply": "Apply via www.codenzic.com"},
    ),
    *[
        wa(
            f"codenzic-{slug}",
            "codenzic",
            role,
            "Kochi",
            experience=exp,
            experience_range=exp_range,
            tags=tags,
            website="https://www.codenzic.com",
            employment=employment,
            extra={"howToApply": "Apply via www.codenzic.com"},
        )
        for slug, role, exp, exp_range, tags, employment in [
            ("digital-marketing-intern", "Digital Marketing Intern", "fresher", "Internship", ["Marketing", "Internship"], "Internship"),
            ("graphic-designer-intern", "Graphic Designer Intern", "fresher", "Internship", ["Design", "Internship"], "Internship"),
            ("react-native-developer", "React Native Developer", "experienced", "As per role", ["IT", "Mobile"], "Full-time"),
        ]
    ],
    wa(
        "caspian-finance-associate-edappally",
        "Caspian Supply Chain Pvt. Ltd.",
        "Finance Associate",
        "Edappally, Kochi",
        experience="experienced",
        experience_range="M.Com · 3–5 years Finance & Accounts",
        tags=["Finance", "Accounts"],
        email="jobs@caspainindia.com",
        extra={
            "workDetails": "Tally, GST, TDS, MS Excel, bank reconciliation. Immediate joiners preferred.",
            "requirements": [
                "M.Com",
                "3–5 years Finance & Accounts",
                "Strong Tally, GST, TDS, MS Excel",
                "Immediate joiners preferred",
            ],
        },
    ),
    wa(
        "chrisma-iti-electrical-automobile-warehouse-ernakulam",
        "Chrisma Consultancy",
        "ITI Electrical / Automobile (Warehouse)",
        "Ernakulam",
        experience="fresher",
        experience_range="ITI Electrical or Automobile fresher · Male",
        tags=["Warehouse", "Technical"],
        phone="9947337555",
        salary="₹17,000 in-hand · ESI + PF · Free accommodation",
        extra={
            "workDetails": "Leading warehouse in Ernakulam. Male ITI Electrical or Automobile freshers.",
            "howToApply": "Contact Chrisma Consultancy at 9947 337 555",
        },
    ),
    wa(
        "gotofr-account-owner-project-manager",
        "GoToFR.com",
        "Account Owner (Project Manager)",
        "Remote / Project-based",
        experience="experienced",
        experience_range="Project management with multiple workstreams",
        tags=["Project Management", "Consulting"],
        phone="+971 503403322",
        employment="Contract",
        extra={
            "howToApply": "Apply via WhatsApp +971 50 340 3322 with CV and example managed project",
            "workDetails": "Independent project-based engagement. Client-facing delivery coordination for GoToFR implementation projects.",
        },
    ),
    wa(
        "responsive-architectural-designer",
        "Responsive Architectural Wellbeing Pvt. Ltd.",
        "Architecture Designer",
        "Kerala",
        experience="both",
        experience_range="As per portfolio",
        tags=["Architecture", "Design"],
        email="responsivearchwellbeing@gmail.com",
        phone="8111923111",
    ),
    wa(
        "responsive-site-supervisor",
        "Responsive Architectural Wellbeing Pvt. Ltd.",
        "Site Supervisor",
        "Kerala",
        experience="both",
        experience_range="Site supervision experience",
        tags=["Architecture", "Construction"],
        email="responsivearchwellbeing@gmail.com",
        phone="8111923111",
    ),
    wa(
        "sgd-godown-supervisor-calicut",
        "SGD Group of Companies",
        "Godown Supervisor",
        "Calicut",
        experience="both",
        experience_range="Age 20–35 · Calicut & nearby preferred",
        tags=["Operations", "Warehouse"],
        email="hrsgdofficial@gmail.com",
        salary="₹15,000 – ₹25,000 per month",
    ),
    wa(
        "sgd-technical-designer-calicut",
        "SGD Group of Companies",
        "Technical Designer (Male)",
        "Calicut, Kerala",
        experience="both",
        experience_range="Civil / Architecture / Mechanical background",
        tags=["Design", "Construction"],
        email="hrsgdofficial@gmail.com",
        phone="+91 9778151162",
        salary="₹15,000 – ₹30,000",
        extra={
            "workDetails": "Pre-engineered aluminium windows. Design & technical drawing. Construction knowledge.",
        },
    ),
    wa(
        "velodata-brand-promoter-kochi",
        "Velodata",
        "Brand Promoter",
        "Kochi (Lulu Mall & Forum Mall)",
        experience="fresher",
        experience_range="Any degree · Freshers welcome · Male / Female",
        tags=["Sales", "Retail"],
        salary="Up to ₹14,000 per month",
        extra={
            "workDetails": "Excellent communication. Customer-friendly personality. Sales and customer interaction.",
        },
    ),
    wa(
        "cda-digital-marketing-manager-kochi",
        "CDA (Creating Digital Aspirants)",
        "Digital Marketing Manager",
        "Kochi",
        experience="experienced",
        experience_range="4+ years",
        tags=["Marketing", "Digital"],
        email="careers@cda.academy",
        phone="+91 9048044221",
        extra={
            "workDetails": "Digital marketing, lead generation, brand & content, team management, performance & ROI.",
        },
    ),
    *[
        wa(
            f"vedhika-wedding-centre-{slug}",
            "Vedhika Wedding Centre",
            role,
            "Mukkam, Calicut",
            experience=exp,
            experience_range=exp_range,
            tags=["Retail", "Walk-in"],
            email="hrvedhikamukkam@gmail.com",
            phone="+91 7034210046",
            walk_in=True,
            walk_in_date="Every Tuesday",
            extra={
                "howToApply": "Walk in every Tuesday 10:30 AM – 12:30 PM at Vedhika Wedding Centre, Mukkam-Calicut, or email hrvedhikamukkam@gmail.com",
            },
        )
        for slug, role, exp, exp_range in [
            ("floor-manager", "Floor Manager", "both", "Retail/garment experience preferred"),
            ("telecaller", "Telecaller", "fresher", "Freshers can apply"),
            ("sales-executive", "Sales Executive", "both", "Freshers & experienced · Male/Female"),
            ("marketing-executive", "Marketing Executive", "both", "Freshers & experienced"),
            ("customer-relation-executive", "Customer Relation Executive (CRE)", "both", "Freshers & experienced"),
        ]
    ],
    job(
        id="centre-drive-kakkanad-employment-exchange-sep2026",
        company="District Employment Exchange Kakkanad",
        companyBlurb="Centre Drive · Job fair · Employment Exchange Kakkanad",
        location="5th Floor, Employment Exchange, Kakkanad, Kochi",
        roles=[
            "B.Sc Chemistry (Manufacturing)",
            "CRE",
            "Sales",
            "Assistant Manager",
            "Manager",
            "Billing Staff",
        ],
        experience="both",
        experienceRange="Role-wise",
        employmentType="Full-time",
        applyLink="",
        tags=["Walk-in", "Job fair", "Infopark"],
        isWalkIn=True,
        walkInDate="2026-09-19",
        phone="04842422452",
        industry="Job fair",
        companyDetails="Centre Drive organized by District Employment Exchange of Ernakulam, Employability Centre Kakkanad.",
        workDetails=(
            "Walk-in job fair Saturday 19 Sep 2026, 11 AM – 1 PM. Bring resume. "
            "Openings: B.Sc Chemistry male (₹20k); CRE degree/MBA female (₹23k); Sales 12th (₹17,400); "
            "Asst Manager degree 3yr (₹20–25k); Manager degree (₹25–35k); Billing staff degree (₹16,500)."
        ),
        workStatus="Full-time",
        workMode="Kochi area",
        experienceYears="Role-wise",
        skills=[],
        requirements=["Bring updated resume to walk-in"],
        responsibilities=["As per employer at the drive"],
        howToApply="Walk in 19 Sep 2026, 11 AM–1 PM, 5th Floor Employment Exchange Kakkanad · Call 0484-2422452",
        hiringNotes="Source: Centre Drive flyer · Sep 2026.",
        description="Centre Drive job fair at Employment Exchange Kakkanad with multiple employer openings.",
        postedDate=POSTED,
        source="WhatsApp",
        verified=True,
        verificationNote=NOTE,
        applyDeadline="Rolling",
        logo="",
        startingDate="",
        benefits=["Listing transcribed from an employer hiring creative", "Never pay anyone for this application"],
    ),
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} WhatsApp jobs to jobs-data.js")


if __name__ == "__main__":
    main()
