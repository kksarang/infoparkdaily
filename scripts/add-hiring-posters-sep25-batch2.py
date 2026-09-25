#!/usr/bin/env python3
"""Add the second batch of employer hiring creatives collected 25 Sep 2026."""

from __future__ import annotations

import importlib.util
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "wa_sep21", ROOT / "scripts" / "add-whatsapp-jobs-sep21.py"
)
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
base.POSTED = "2026-09-25"
mod = base.mod

NOT_STATED = "Location not stated on poster"


def job(
    slug: str,
    company: str,
    role: str,
    location: str,
    details: str,
    *,
    roles: list[str] | None = None,
    requirements: list[str] | None = None,
    responsibilities: list[str] | None = None,
    whatsapp: bool = False,
    deadline: str = "",
    how: str = "",
    apply_link: str = "",
    **kwargs,
) -> dict:
    extra = dict(kwargs.pop("extra", {}) or {})
    extra["workDetails"] = details
    if roles:
        extra["roles"] = roles
        extra["companyBlurb"] = f"{company} · {' / '.join(roles)} · {location}"
    if requirements:
        extra["requirements"] = requirements
    if responsibilities:
        extra["responsibilities"] = responsibilities
    if deadline:
        extra["applyDeadline"] = deadline
    if how:
        extra["howToApply"] = how
    data = base.wa(slug, company, role, location, extra=extra, **kwargs)
    if apply_link:
        data["applyLink"] = apply_link
    elif not data["applyLink"] and data.get("phone"):
        digits = re.sub(r"\D", "", data["phone"].split("/")[0])[-10:]
        data["applyLink"] = f"https://wa.me/91{digits}" if whatsapp else f"tel:+91{digits}"
    return data


JOBS = [
    # ── Kochi / Ernakulam ─────────────────────────────────────────────
    job(
        "wizr-java-backend-developer-kochi", "Wizr AI", "Java Backend Developer",
        "Kochi (On-site)",
        "Java Backend Developer (Java + Spring Boot) at Wizr, Kochi on-site. Hands-on, production experience building backend services with Java and Spring Boot. Immediate joiners preferred.",
        experience="experienced", experience_range="Production Java + Spring Boot experience · Immediate joiners preferred",
        tags=["IT", "Java", "Kochi"], email="nithin.kumar@wizr.ai", website="https://wizr.ai",
        requirements=["Hands-on production experience with Java and Spring Boot", "Immediate joiners preferred"],
    ),
    job(
        "wizr-full-stack-engineer-dotnet-kochi", "Wizr AI", "Full Stack Engineer (.NET)",
        "Kochi (On-site)",
        "Full Stack Engineer (.NET + Event-Driven Architecture) at Wizr, Kochi on-site. Full stack experience with .NET and working familiarity with event-driven architecture. Immediate joiners preferred.",
        experience="experienced", experience_range="Full stack .NET experience · Immediate joiners preferred",
        tags=["IT", ".NET", "Kochi"], email="nithin.kumar@wizr.ai", website="https://wizr.ai",
        requirements=["Full stack experience with .NET", "Working familiarity with event-driven architecture", "Immediate joiners preferred"],
    ),
    job(
        "instamart-warehouse-associate-kalamassery-aluva", "Instamart", "Warehouse Associate",
        "Kalamassery & Ashokapuram, Aluva",
        "Warehouse Associates for Instamart warehouses at Kalamassery and Ashokapuram, Aluva. Salary + allowances, night shift allowance, overtime, leave benefits, weekly off, free transportation, one-time food, leave encashment, migrant allowance, double wages on public holidays, PF & ESI.",
        experience="both", experience_range="Able to read and write English · Morning & night shifts",
        tags=["Warehouse", "Logistics", "Kochi"], phone="9489140275",
        requirements=[
            "Able to read and write English",
            "Aadhaar card, PAN card and bank passbook (Aadhaar seeding mandatory)",
            "Willing to work morning and night shifts",
        ],
        how="Call or share your CV on 94891 40275",
    ),
    job(
        "lenskart-store-manager-walkin-ernakulam", "Lenskart", "Store Manager",
        "Pallimukku, MG Road, Ernakulam, Kochi",
        "Walk-in interview for Store Manager on 28 September (Monday), 11 AM – 4 PM at Lenskart Store, Pallimukku, MG Road, Ernakulam. Graduate (any stream), minimum 4+ years total experience, 2+ years team handling (team of 3–4), 1+ year as Store Manager, age below 34. Resumes can also be emailed in advance with subject \"Application for Store Manager Kerala (Preferred location)\".",
        experience="experienced", experience_range="4+ years total · 2+ years team handling · 1+ year as Store Manager · Age below 34",
        tags=["Retail", "Walk-in", "Kochi"], email="abhirami.akshay@lenskart.com",
        walk_in=True, walk_in_date="2026-09-28", deadline="2026-09-28",
        apply_link="mailto:abhirami.akshay@lenskart.com?subject=Application%20for%20Store%20Manager%20Kerala%20(Preferred%20location)",
        requirements=["Graduate (any stream)", "Minimum 4+ years total experience", "2+ years team handling (min team size 3–4)", "1+ year experience as Store Manager", "Age below 34"],
    ),
    job(
        "chris-johnson-customer-service-international-edappally", "Chris Johnson Business IT Solutions",
        "Customer Service Executive (International Process)",
        "Opp. Metro Pillar 366, Nelson Mandela Road, Koonamthai, Edappally, Ernakulam",
        "Customer Service – international process. Handle customer calls, explain products/services, assist with pricing and queries, follow up, upsell relevant products and maintain daily records. Full-time, rotational day/night shifts, Provident Fund.",
        experience="both", experience_range="0–5 years · International call centre experience preferred",
        tags=["Customer Support", "BPO", "Kochi"], email="careers@chrisjohnson.in", phone="8139898400 / 8139898600",
        requirements=[
            "Excellent verbal and written English (must)",
            "Prior international call centre experience preferred",
            "Good email drafting skills",
            "Comfortable with web-based applications and Windows",
            "Willing to work rotational day/night shifts",
        ],
    ),
    job(
        "esaf-bdo-dst-walkin-muvattupuzha", "ESAF Small Finance Bank (via GramPro)",
        "Business Development Officer – DST",
        "Pearl Tower, Near Signal Junction, Velloorkunnam, Muvattupuzha",
        "Walk-in interview on 25 Sept 2026, 10:00 AM – 1:00 PM at ESAF Small Finance Bank, Ground Floor, Pearl Tower, Near Signal Junction, Velloorkunnam, Muvattupuzha 686661. Qualification UG / PG. GramPro Business Services is the official recruitment partner; they state they never ask candidates for money.",
        experience="both", experience_range="UG / PG",
        tags=["Banking", "Sales", "Walk-in"], phone="8714622593 / 8714615588",
        walk_in=True, walk_in_date="2026-09-25", deadline="2026-09-25",
    ),
    job(
        "evm-group-ai-video-creator-kochi", "EVM Group", "AI Video Creator", "Cochin",
        "EVM Group is hiring an AI Video Creator in Cochin. Share your résumé at headhr@evmgroup.co.in.",
        experience="both", experience_range="As per employer notice",
        tags=["Media", "AI", "Kochi"], email="headhr@evmgroup.co.in",
    ),
    job(
        "zepto-dh-associate-walkin-vallatholpadi", "Zepto", "DH Associate",
        "Vallatholpadi",
        "Walk-in interview for DH Associate. CTC ₹21,000 (net take-home ₹14,000 + attendance bonus ₹1,000 + performance bonus ₹4,000; take-home potential ₹19,000). ESI + PF. One weekly off Monday–Friday; no leave on Saturday and Sunday. Growth path: Associate → Shift Incharge → DHM → CLM.",
        experience="both", experience_range="As per employer notice",
        tags=["Warehouse", "Walk-in"], phone="9846545808 / 7902246587", salary="CTC ₹21,000 · take-home potential ₹19,000",
        walk_in=True,
    ),
    job(
        "rp2-india-bde-fresher-kakkanad", "RP2 India Pvt. Ltd.", "Business Development Executive (Fresher)",
        "Wowffice, Seaport-Airport Road, Kakkanad, Kochi",
        "RP2 (Rounded Professional Program) is hiring a fresher Business Development Executive in Kochi. Office: Wowffice, Seaport-Airport Road, Kakkanad P.O., Kochi 682030.",
        experience="fresher", experience_range="Fresher",
        tags=["Sales", "Business Development", "Kochi"], email="jishnuv@idatalytics.com", phone="7012021459",
    ),
    job(
        "novelworx-executive-accounts-payable-kochi", "Novelworx Digital Solutions Pvt Ltd", "Executive – Accounts Payable",
        "Kochi",
        "Process vendor invoices (PO & non-PO), perform 2-way and 3-way matching, validate invoices for GST compliance, maintain vendor accounts, resolve payment queries and support month-end closing. Male candidates preferred.",
        experience="experienced", experience_range="1–3 years in Accounts Payable / Finance Operations · B.Com / M.Com",
        tags=["Accounts", "Finance", "Kochi"], phone="9288001118", whatsapp=True,
        requirements=["B.Com / M.Com / finance-related degree", "1–3 years in Accounts Payable / Finance Operations", "Invoice processing, GST compliance, ERP systems, advanced MS Excel", "Male candidates preferred"],
    ),
    job(
        "linfra-ventures-admin-executive-ernakulam-alappuzha", "Linfra Ventures", "Admin Executive",
        "Ernakulam & Alappuzha",
        "Admin Executive – 4 vacancies in Ernakulam and Alappuzha. Any degree, fluency in English and Hindi. Female preferred. Freshers can apply.",
        experience="both", experience_range="Any degree · Freshers can apply",
        tags=["Admin"], email="linfraventuress@gmail.com", phone="7994977915", vacancies=4,
        requirements=["Any degree", "Fluency in English and Hindi", "Female preferred", "Freshers can apply"],
    ),
    job(
        "trust-point-hr-manager-restaurant-ernakulam", "Trust Point (HR consultancy)", "HR Manager (Restaurant Chain)",
        "Ernakulam",
        "HR Manager for a chain of restaurants in Ernakulam, hiring through Trust Point HR consultancy. Hindi speaking skill required.",
        experience="experienced", experience_range="Hindi speaking skill required",
        tags=["HR", "Hospitality"], phone="9526155846",
    ),
    job(
        "popular-hyundai-manager-projects-administration-kochi", "Popular Hyundai", "Manager – Projects and Administration",
        "Corporate Office, Cochin",
        "Plan, coordinate and execute projects, handle administrative functions and office operations, liaise with stakeholders and vendors, monitor timelines and support management with data, reports and process improvements.",
        experience="experienced", experience_range="10–15 years in relevant field · Automobile industry",
        tags=["Automobile", "Administration", "Kochi"], email="jomin@popularhyundai.com", phone="09567431133",
    ),
    job(
        "exl-manager-business-hr-kochi", "EXL", "Manager – Business HR", "Kochi",
        "EXL Kochi is looking for a Manager – Business HR with 10 years of relevant experience who can think strategically, build strong partnerships and improve the employee experience. The poster gives no email or phone; apply through EXL's careers site.",
        experience="experienced", experience_range="10 years relevant HR experience",
        tags=["HR", "Kochi"], website="https://www.exlservice.com/careers",
        apply_link="https://www.exlservice.com/careers", how="Apply via EXL careers (no contact details on the poster)",
    ),
    job(
        "mosons-sales-executive-ernakulam", "Mosons Group", "Sales Executive",
        "Ernakulam (Perumbavoor, Kalady, Pallikara, Koovapadi, Angamaly, Pattimattom routes)",
        "Sales Executives for Mosons brands (Happenstance, Indulekha, Malayalima, Beevi's) on Ernakulam routes: Perumbavoor, Kalady, Pallikara, Koovapadi, Angamaly and Pattimattom. Salary ₹27,050 CTC/month + incentives + daily and travel allowance. Age limit 35. Freshers can apply.",
        experience="both", experience_range="Freshers can apply · Age limit 35",
        tags=["Sales", "FMCG", "Kochi"], phone="9526606750", whatsapp=True,
        salary="₹27,050 CTC/month + incentives + DA + TA",
    ),
    job(
        "digital-marketing-video-editor-kochi", "Company not named (WhatsApp poster)", "Digital Marketing cum Video Editor",
        "Kochi",
        "Digital Marketing cum Video Editor in Kochi. 1–2 years experience; video editing experience is mandatory. Salary up to ₹12,000/month. Share resumes via WhatsApp 87146 75014.",
        experience="experienced", experience_range="1–2 years · Video editing mandatory",
        tags=["Marketing", "Video", "Kochi"], phone="8714675014", whatsapp=True, salary="Up to ₹12,000/month",
    ),
    job(
        "verveox-trainees-kochi", "VerveoX Technologies", "Trainee",
        "Kochi, Kerala (Remote / Hybrid)",
        "Trainee positions in Web Development, Flutter App Development, AI & Machine Learning and Cyber Security. Kochi, remote/hybrid, 3–6 months duration. Send your CV by email or apply through verveoxtechnologies.com.",
        roles=["Web Development Trainee", "Flutter App Development Trainee", "AI & Machine Learning Trainee", "Cyber Security Trainee"],
        experience="fresher", experience_range="Trainee · 3–6 months", employment="Traineeship",
        tags=["IT", "Training", "Kochi"], email="azifaliz.verveox@gmail.com", website="https://verveoxtechnologies.com",
    ),
    job(
        "level-up-hr-bdm-marketing-kochi-trivandrum", "Level Up HR Solutions", "Business Development Manager – Marketing",
        "Kochi / Trivandrum",
        "Business Development Manager – Marketing for an interior design & contracting company with 26+ years of experience, hiring through Level Up HR Solutions. Full-time, ₹6–7 LPA + variable incentives.",
        experience="experienced", experience_range="5–10 years",
        tags=["Sales", "Marketing", "Interiors"], email="info@leveluphrs.com", phone="8714022112", salary="₹6–7 LPA + variable incentives",
    ),

    # ── Infopark / park-based ─────────────────────────────────────────
    job(
        "datafusing-tester-product-associate-infopark-cherthala", "DataFusing (JXB Software India Pvt Ltd)", "Tester / Product Associate",
        "Infopark Cherthala",
        "Write and execute test cases and identify/document functional requirements. Full-time at Infopark Cherthala. JXB Software India is a subsidiary of JXB Software Limited, UK.",
        experience="fresher", experience_range="0–1 years · Freshers welcome · Graduate in IT or related field",
        tags=["IT", "QA", "Infopark Cherthala"], email="careers@datafusing.com", website="https://www.datafusing.com",
        requirements=["Graduate in IT or related field", "Fresher / 0–1 year experience", "Able to commute to Infopark Cherthala"],
    ),
    job(
        "mentor-performance-project-coordinator-cyberpark", "Mentor Performance Rating Pvt. Ltd.", "Project Coordinator (Software / ERP)",
        "Govt. Cyberpark, Calicut",
        "Project Coordinator (Software / ERP) at Mentor Performance Rating, Govt. Cyberpark, Calicut. 1–2 years experience.",
        experience="experienced", experience_range="1–2 years",
        tags=["IT", "Project Management", "Cyberpark"], email="hr@mentorperformance.com",
    ),
    job(
        "mentor-performance-senior-laravel-developer-cyberpark", "Mentor Performance Rating Pvt. Ltd.", "Senior Laravel Developer (ERP)",
        "Govt. Cyberpark, Calicut",
        "Senior Laravel Developer (ERP) at Mentor Performance Rating, Govt. Cyberpark, Calicut. 3+ years experience.",
        experience="experienced", experience_range="3+ years",
        tags=["IT", "PHP", "Laravel", "Cyberpark"], email="hr@mentorperformance.com",
    ),
    job(
        "sapling-creations-accountant-cyberpark", "Sapling Creations", "Accountant",
        "Cyberpark, Calicut",
        "Accountant at Sapling Creations, Cyberpark. Minimum 2 years experience and a bachelor's degree.",
        experience="experienced", experience_range="Minimum 2 years · Bachelor's degree",
        tags=["Accounts", "Cyberpark"], email="hr@saplingcreations.com",
    ),
    job(
        "ms-global-odoo-developer-kinfra-calicut", "MS Global Enterprise Solutions", "Odoo Developer",
        "Kinfra, Calicut (On-site)",
        "Odoo development, customization and maintenance. Python & Odoo framework (ORM, ACL, record rules, workflows); Odoo modules such as CRM, Sales, Purchase, Accounting, HR, Payroll, Project, Helpdesk and Inventory; PostgreSQL, XML, JavaScript, REST/XML-RPC APIs, Linux, Git; Odoo.sh, Docker, cloud hosting and third-party integrations.",
        experience="experienced", experience_range="1–3 years in Odoo development",
        tags=["IT", "Odoo", "Python"], email="careers@ms.holdings", phone="+91 80756 59380",
    ),

    # ── Trivandrum ────────────────────────────────────────────────────
    job(
        "electrasaur-bde-trivandrum", "Electrasaur India LLP", "Business Development Executive",
        "Pravachambalam, Trivandrum",
        "Identify and generate leads, communicate with prospects via calls and emails, assist in client meetings and follow-ups, support the sales team and maintain customer databases. Good communication and basic sales & marketing knowledge.",
        experience="both", experience_range="As per employer notice",
        tags=["Sales", "EV", "Trivandrum"], email="sales@electrasaurindia.com", phone="8891813290",
    ),
    job(
        "electrasaur-designer-video-editor-trivandrum", "Electrasaur India LLP", "In-house Designer & Video Editor",
        "Pravachambalam, Trivandrum",
        "Shoot and edit photo & video, create designs and motion graphics, edit reels, ads, presentations and marketing creatives. Proficient in Premiere Pro, After Effects, Photoshop, Illustrator. The poster has no contact details; the contact shown is from Electrasaur's BDE poster.",
        experience="both", experience_range="Proficiency in editing & design tools",
        tags=["Design", "Video", "Trivandrum"], email="sales@electrasaurindia.com", phone="8891813290",
    ),
    job(
        "electrasaur-social-media-executive-trivandrum", "Electrasaur India LLP", "Social Media Executive",
        "Pravachambalam, Trivandrum",
        "Create content for social media, plan and coordinate social activities, work with trends and support brand growth through digital campaigns. The poster has no contact details; the contact shown is from Electrasaur's BDE poster.",
        experience="both", experience_range="Good communication · Social media savvy",
        tags=["Marketing", "Social Media", "Trivandrum"], email="sales@electrasaurindia.com", phone="8891813290",
    ),
    job(
        "le-taizz-restaurant-roles-trivandrum-kollam", "Le Taizz Restaurant", "Restaurant Manager",
        "Trivandrum (new outlet) & Pallimukku, Kollam",
        "Le Taizz Restaurant, Pallimukku, Kollam is expanding with a new outlet in Trivandrum. Hiring Restaurant Manager, Restaurant Captain and Floor Supervisor. Prior hospitality experience (fine dining / premium casual preferred), leadership, guest handling, floor operations and inventory management. Contact Jabir +91 99470 73140 or Manoj +91 95268 36005.",
        roles=["Restaurant Manager", "Restaurant Captain", "Floor Supervisor"],
        experience="experienced", experience_range="Proven hospitality experience",
        tags=["Hospitality", "Trivandrum", "Kollam"], phone="9947073140 / 9526836005",
    ),

    # ── Thrissur / Koratty ────────────────────────────────────────────
    job(
        "brd-car-world-service-manager-kunnamkulam", "BRD Car World Limited", "Service Manager",
        "Kunnamkulam, Thrissur (Ernakulam Region)",
        "Service Manager for a Maruti Suzuki authorised dealer. Male. 8–10 years experience in a similar field. Diploma / B.Tech (Automobile / Mechanical).",
        experience="experienced", experience_range="8–10 years · Diploma / B.Tech (Automobile/Mechanical) · Male",
        tags=["Automobile"], email="hiran@brdcarworld.com", phone="8138913230",
    ),
    job(
        "sml-finance-nbfc-branch-manager-thrissur", "SML Finance", "NBFC Branch Manager",
        "Aswini Junction, Thrissur",
        "NBFC Branch Manager at Aswini Junction, Thrissur. Female, any degree, 10+ years NBFC experience preferred, age up to 45. Salary up to ₹50K.",
        experience="experienced", experience_range="10+ years NBFC experience preferred · Age up to 45 · Female",
        tags=["Finance", "NBFC", "Thrissur"], email="hiran@brdcarworld.com", phone="8138913230", salary="Up to ₹50,000",
    ),

    # ── Other Kerala ──────────────────────────────────────────────────
    job(
        "banking-pam-premium-acquisition-manager-trivandrum", "Banking recruiter (bank not named)", "Premium Acquisition Manager (PAM)",
        "Thiruvananthapuram",
        "Premium Acquisition Manager in Thiruvananthapuram. 2+ years CASA experience mandatory. Up to ₹6 LPA. Age up to 38. Contact Vishnupriya (Talent Acquisition Specialist) on 63835 68641.",
        experience="experienced", experience_range="2+ years CASA experience (mandatory) · Age up to 38",
        tags=["Banking", "Sales"], phone="6383568641", whatsapp=True, salary="Up to ₹6 LPA",
    ),
    job(
        "banking-bdo-business-development-officer-kerala", "Banking recruiter (bank not named)", "Business Development Officer (BDO)",
        "Palakkad · Kollam · Kottayam · Calicut · Thrissur",
        "Business Development Officer at Palakkad, Kollam, Kottayam, Calicut and Thrissur. Freshers (0–2 years); any sales experience is an advantage. ₹2.5–4.5 LPA. Age up to 38. Contact Vishnupriya on 63835 68641.",
        experience="fresher", experience_range="0–2 years · Age up to 38",
        tags=["Banking", "Sales"], phone="6383568641", whatsapp=True, salary="₹2.5–4.5 LPA",
    ),
    job(
        "banking-bdm-branch-development-manager-calicut", "Banking recruiter (bank not named)", "Branch Development Manager (BDM)",
        "Calicut",
        "Branch Development Manager in Calicut. 5+ years CASA experience mandatory, team handling role. Up to ₹7.7 LPA. Age up to 38. Contact Vishnupriya on 63835 68641.",
        experience="experienced", experience_range="5+ years CASA experience (mandatory) · Team handling",
        tags=["Banking", "Sales"], phone="6383568641", whatsapp=True, salary="Up to ₹7.7 LPA",
    ),
    job(
        "kokkadans-service-technician-electronics-kayamkulam", "Kokkadans Kitchen Appliances", "Service Technician – Electronics",
        "Ochira, Kayamkulam",
        "Service technicians for shop service and field service. ₹15,000/month + petrol allowance, travel allowance and accommodation provided. Working time 9:00 AM – 8:30 PM.",
        experience="both", experience_range="ITI / Diploma (Electronics) · Chip-level appliance service knowledge",
        tags=["Technical", "Electronics"], phone="9544731978", salary="₹15,000/month + petrol allowance",
        requirements=["ITI / Diploma (Electronics)", "Chip-level appliance service knowledge", "Two-wheeler mandatory"],
    ),
    job(
        "purackal-honda-multiple-roles-kottayam", "Purackal Honda", "Sales Executive",
        "Kottayam district (Kodimatha, Kottayam, Kudavechoor, Pala, Ettumanoor, Erattupetta, Erumeli, Kuravilangad, Kanjirappally)",
        "Purackal Honda openings: Kodimatha – Marketing Executive, Supervisor Trainee, Spare Parts Executive, Back Office Executive. BigWing Kottayam – Spare Parts Executive, Sales Executive, Front Office, Marketing Executive. Kudavechoor – Branch Manager, Sales Executive, Marketing Executive, Washing Executive. Pala – Sales Executive (BigWing), Spare Parts Executive. Ettumanoor – Sales (BigWing), Spare Parts Executive. Erattupetta – Washing Executive. Erumeli – Junior Technician. Kuravilangad – Sales Executive. Kanjirappally – Senior Technician, Sales Executive. Hotline 0481-2361900.",
        roles=["Sales Executive", "Marketing Executive", "Spare Parts Executive", "Back Office Executive", "Front Office", "Supervisor Trainee", "Branch Manager", "Washing Executive", "Junior Technician", "Senior Technician"],
        experience="both", experience_range="As per employer notice",
        tags=["Automobile", "Sales", "Kottayam"], email="hondahr@purackalmotors.com", phone="8157854321 / 7511163666 / 9562947474",
    ),
    job(
        "evm-hospitality-thekkady-roles", "EVM Hospitality", "Front Office Associate",
        "Thekkady, Kerala",
        "EVM Hospitality, Thekkady is hiring Front Office Associate, HK Supervisor and DCDP/CDP (Chinese / Continental / North Indian). Immediate joiners. Food and accommodation provided. Experienced candidates can email or WhatsApp +91 92073 93386.",
        roles=["Front Office Associate", "HK Supervisor", "DCDP / CDP (Chinese / Continental / North Indian)"],
        experience="experienced", experience_range="Experienced · Immediate joiners",
        tags=["Hospitality"], email="hr@evmhospitality.com", phone="9207393386",
    ),
    job(
        "apply4skills-digital-marketing-faculty-palakkad", "Apply4Skills", "Digital Marketing Faculty",
        "Palakkad",
        "Conduct digital marketing training sessions, teach core concepts and practical skills, and support students with assignments and projects. Full-time. Freshers with strong digital marketing knowledge can also apply.",
        experience="both", experience_range="6 months – 2 years · Freshers with strong DM knowledge can apply",
        tags=["Education", "Marketing", "Palakkad"], email="apply4jobs.hrinfo@gmail.com", phone="9061446663",
    ),
    job(
        "kauzar-academy-tele-sales-executive-kottakkal", "Kauzar Academy", "Tele Sales Executive",
        "Kottakkal",
        "Tele Sales Executive at Kauzar Academy, Kottakkal. Service sector experience preferred, excellent communication, leadership & team handling, target-oriented.",
        experience="both", experience_range="Service sector experience preferred",
        tags=["Sales", "Education", "Malappuram"], email="hrmkauzaracademy@gmail.com", phone="8129313566",
    ),
    job(
        "bgc-trading-hr-intern-vengara", "BGC Trading LLP", "HR Intern",
        "Vengara",
        "HR Intern at BGC Trading LLP, Vengara. Female candidates.",
        experience="fresher", experience_range="Intern · Female", employment="Internship",
        tags=["HR", "Internship", "Malappuram"], email="hrm@kidonex.com", phone="7593030803 / 7593030503",
    ),

    # ── Calicut ───────────────────────────────────────────────────────
    job(
        "starcare-system-administrator-it-calicut", "Starcare Hospital", "System Administrator – IT",
        "Starcare Hospital, Calicut",
        "System Administrator – IT at Starcare Hospital, Calicut. Bachelor's degree and relevant IT certification. 5+ years experience.",
        experience="experienced", experience_range="5+ years · Bachelor's + IT certification",
        tags=["IT", "Healthcare", "Calicut"], email="career@starcarehospitals.com", phone="8606945533",
    ),
    job(
        "starcare-assistant-system-administrator-calicut", "Starcare Hospital", "Assistant System Administrator",
        "Starcare Hospital, Calicut",
        "Assistant System Administrator at Starcare Hospital, Calicut. Bachelor's degree and relevant IT certification. 2+ years experience.",
        experience="experienced", experience_range="2+ years · Bachelor's + IT certification",
        tags=["IT", "Healthcare", "Calicut"], email="career@starcarehospitals.com", phone="8606945533",
    ),
    job(
        "leacon-senior-academic-counselor-calicut", "Leacon International", "Senior Academic Counselor",
        "RP Mall, Calicut",
        "Senior Academic Counselor (study abroad) at RP Mall, Calicut. 2–3 years in study abroad counselling. ₹25,000 – ₹30,000/month.",
        experience="experienced", experience_range="2–3 years in study abroad counselling",
        tags=["Education", "Counselling", "Calicut"], email="hello.ajithv@gmail.com", phone="9567971818", salary="₹25,000 – ₹30,000/month",
    ),
    job(
        "edfuture-studio-executive-calicut", "EdFuture (Gokulam)", "Studio Executive",
        "Calicut",
        "Manage daily studio operations and shoots, handle cameras, lighting and audio, coordinate video shoots, photography and recordings, manage equipment and support live sessions, podcasts and educational content. Immediate joiners and Kozhikode candidates preferred.",
        experience="both", experience_range="0–3 years",
        tags=["Media", "Education", "Calicut"], email="careers@edfuture.in", phone="9567475111",
    ),
    job(
        "capkon-sales-manager-calicut", "Capkon", "Sales Manager",
        "Calicut, Kerala",
        "Sales Manager at Capkon, Calicut. Minimum 3 years of experience in real estate.",
        experience="experienced", experience_range="Minimum 3 years in real estate",
        tags=["Sales", "Real Estate", "Calicut"], email="career@capkon.in", phone="9037100785",
    ),
    job(
        "capkon-sales-executive-calicut", "Capkon", "Sales Executive",
        "Calicut, Kerala",
        "Sales Executive at Capkon, Calicut. Minimum 1 year of experience in any field.",
        experience="experienced", experience_range="Minimum 1 year in any field",
        tags=["Sales", "Real Estate", "Calicut"], email="career@capkon.in", phone="9037100785",
    ),
    job(
        "urbx-content-creator-videographer", "URBX Group of Institutions", "Content Creator cum Videographer",
        NOT_STATED,
        "Create reels, videos, interviews, testimonials and promotional content; cover campus activities, events and seminars; handle photography, videography, lighting, audio and editing; collaborate with marketing & admissions teams.",
        experience="experienced", experience_range="1–3 years in content creation / videography",
        tags=["Media", "Education"], email="hr@urbxgroup.com", phone="9656075888",
        requirements=["1–3 years in content creation / videography", "Premiere Pro, After Effects, Photoshop, Canva or similar", "Creative mindset and storytelling skills"],
    ),

    # ── Mefriend (Madhyamam) ─────────────────────────────────────────
    job(
        "mefriend-sales-executive-business-solutions", "Mefriend Business Solutions", "Sales Executive – Business Solutions",
        "Malappuram · Thrissur · Kottayam · Mangalore",
        "Identify new business, present solutions, generate leads through networking, referrals and digital channels, prepare proposals and close deals. Experience in advertising & media sales, digital marketing, IT & web solutions or outdoor media is an advantage. English, Malayalam and Hindi an advantage.",
        experience="experienced", experience_range="2–5 years sales / BD · Bachelor's (MBA preferred)",
        tags=["Sales", "Media"], email="hr@mefriend.com",
    ),
    job(
        "mefriend-senior-manager-business-development-kerala", "Mefriend Business Solutions (Madhyamam)", "Senior Manager – Business Development",
        "Kerala",
        "Manage corporate accounts, acquire new corporate clients, drive revenue growth and deliver tailored solutions. Experience in media, advertising, digital or business solutions is an advantage.",
        experience="experienced", experience_range="5+ years B2B sales / BD in Kerala",
        tags=["Sales", "Media"], email="hr@mefriend.com",
    ),
    job(
        "mefriend-digital-sales-executive", "Mefriend Business Solutions", "Digital Sales Executive",
        NOT_STATED,
        "Generate new business through field sales, networking, referrals and cold calling; present and sell digital marketing, branding, media, advertising, events and business solutions; prepare proposals and close deals; achieve monthly and quarterly targets. Willing to travel for client meetings.",
        experience="experienced", experience_range="2–4 years in sales / BD / digital marketing / media · Bachelor's (MBA preferred)",
        tags=["Sales", "Digital Marketing"], email="hr@mefriend.com",
    ),

    # ── Remote / location not stated ─────────────────────────────────
    job(
        "zyfolks-digital-marketing-associate-remote", "Zyfolks", "Digital Marketing Associate",
        "Remote",
        "Digital Marketing Associate – SEO, content, social media and marketing. 0–1 year experience, full-time, remote.",
        experience="fresher", experience_range="0–1 year", tags=["Marketing", "Remote"], email="hr@zyfolks.com",
    ),
    job(
        "legal-tech-data-entry-consultant-remote", "Legal tech company (mylaw.net)", "Data Entry Consultant",
        "Remote (Work from home)",
        "Remote data entry for a legal tech company. 5 days a week, ₹15,000/month stipend. High performers may be converted to permanent full-time employees. Must have own laptop and reliable Wi-Fi. Email with subject \"Application for Data Entry Consultant\".",
        experience="both", experience_range="Typing accuracy · Basic MS Office / Google Workspace",
        tags=["Data Entry", "Remote"], email="lazim@mylaw.net", salary="₹15,000/month",
        apply_link="mailto:lazim@mylaw.net?subject=Application%20for%20Data%20Entry%20Consultant",
    ),
    job(
        "eft-guru-hr-executive-wfh", "EFT Guru LLP", "HR Executive (Work from Home)",
        "Remote (Work from home)",
        "HR Executive, work from home, female candidates only. Last date to apply: 30 September 2026.",
        experience="both", experience_range="Female only", tags=["HR", "Remote"],
        email="hr.eftgurullp@gmail.com", phone="9778190557", deadline="2026-09-30",
    ),
    job(
        "iqinfinite-marketing-intern", "IQInfinite", "Marketing Intern",
        NOT_STATED,
        "Marketing Interns (2 openings) for an IT software development company. 0–1 year experience in digital marketing, product marketing or business development; freshers interested in IT product marketing welcome.",
        experience="fresher", experience_range="0–1 year", employment="Internship",
        tags=["Marketing", "Internship"], email="hr@iqinfinite.in", phone="8160125447", website="https://www.iqinfinite.in", vacancies=2,
    ),
    job(
        "setoo-ai-ml-intern", "Setoo", "AI/ML Intern",
        NOT_STATED,
        "Work on real-world AI/ML problems, build LLM-based applications, implement RAG pipelines with LangChain/LangGraph, develop REST APIs (FastAPI/Django), use embeddings and vector databases (FAISS, Pinecone, Chroma). Opportunity for full-time conversion based on performance.",
        experience="fresher", experience_range="Freshers welcome · B.Tech / B.E. / MCA / M.Sc. CS", employment="Internship",
        tags=["IT", "AI", "Python", "Internship"], email="komal.jadhav@setoo.co", website="https://www.setoo.co/careers",
    ),
    job(
        "cis-dotnet-developer", "CIS (Cyber Infrastructure)", ".NET Developer", NOT_STATED,
        ".NET Developer with ASP.NET, .NET Core, C#, MVC, SQL and Angular. 2–4 years experience.",
        experience="experienced", experience_range="2–4 years", tags=["IT", ".NET"], email="resumes@cisin.com",
    ),
    job(
        "cis-autocad-designer", "CIS (Cyber Infrastructure)", "AutoCAD Designer", NOT_STATED,
        "AutoCAD Designer with AutoCAD, SolidWorks, Inventor or Creo. 0–2 years experience.",
        experience="both", experience_range="0–2 years", tags=["Design", "CAD"], email="resumes@cisin.com",
    ),
    job(
        "cis-ai-ml-engineer", "CIS (Cyber Infrastructure)", "AI/ML Engineer", NOT_STATED,
        "AI/ML Engineer with ML, DL, LLM, GenAI, NLP and OpenCV. 2–4 years experience.",
        experience="experienced", experience_range="2–4 years", tags=["IT", "AI"], email="resumes@cisin.com",
    ),
    job(
        "cis-trainee-software-developer", "CIS (Cyber Infrastructure)", "Trainee Software Developer", NOT_STATED,
        "Trainee Software Developer. Skills: OOPS, DBMS, C#, .NET, Java, Python, SQL. 0–1 year / freshers.",
        experience="fresher", experience_range="0–1 year / Fresher", tags=["IT", "Fresher"], email="resumes@cisin.com",
    ),
    job(
        "technotoil-fresher-openings", "TechnoToil", "Manual Tester (QA)", NOT_STATED,
        "TechnoToil openings: Manual Tester (QA), Node JS Developer and Social Media Marketing (0–6 months experience each), plus a 2-month Digital Marketing Internship. Immediate joiners preferred.",
        roles=["Manual Tester (QA)", "Node JS Developer", "Social Media Marketing", "Digital Marketing Internship (2 months)"],
        experience="fresher", experience_range="0–6 months · Immediate joiners preferred",
        tags=["IT", "QA", "Marketing"], email="careers@technotoil.com", phone="6260467864",
    ),
    job(
        "mindlabs-ui-frontend-developer", "Mindlabs", "UI Developer / Front-End Developer", NOT_STATED,
        "HTML5, CSS3, JavaScript; converting Figma/Adobe XD/PSD to HTML; responsive design; React.js & TypeScript; reusable UI components and REST API integration; Next.js & Tailwind CSS; SEO-friendly HTML and performance; familiarity with AI-assisted dev tools (Cursor, GitHub Copilot, ChatGPT, Claude). Full-time.",
        experience="experienced", experience_range="1–3 years",
        tags=["IT", "Frontend", "React"], email="hrteam@mindlabssys.com", phone="9656056789",
    ),
    job(
        "midhaan-telemarketing-interns", "Midhaan Technologies Pvt. Ltd.", "Telemarketing Intern", NOT_STATED,
        "Telemarketing Interns (full-time / part-time). Good communication in English & Malayalam, basic MS Excel & Word, strong interpersonal skills, ability to engage prospects and follow up.",
        experience="fresher", experience_range="Intern", employment="Internship (Full-time / Part-time)",
        tags=["Sales", "Internship"], email="hr@midhaan.com",
    ),
    job(
        "zyrops-azure-ai-cloud-engineer", "ZyrOps Technologies", "Azure AI / AI Cloud Engineer", NOT_STATED,
        "Azure AI / AI Cloud Engineer. Key skills: Azure, AI, Terraform, DevOps, CI/CD, Python, Docker, Kubernetes.",
        experience="experienced", experience_range="As per employer notice",
        tags=["IT", "Cloud", "Azure"], email="hello@zyrops.com", website="https://www.zyrops.com",
    ),
    job(
        "zyrops-senior-cloud-engineer", "ZyrOps Technologies", "Senior Cloud Engineer", NOT_STATED,
        "Senior Cloud Engineer, 5–7 years preferred. Key skills: Azure, AI, Terraform, DevOps, CI/CD, Python, Docker, Kubernetes.",
        experience="experienced", experience_range="5–7 years preferred",
        tags=["IT", "Cloud", "DevOps"], email="hello@zyrops.com", website="https://www.zyrops.com",
    ),
    job(
        "talent-acquisition-specialist-8714652983", "Company not named (WhatsApp poster)", "Talent Acquisition Specialist", NOT_STATED,
        "Source and attract talent, screen resumes, coordinate interviews, build a talent pipeline and work with hiring managers. Attractive salary. Call 87146 52983.",
        experience="experienced", experience_range="1–3 years relevant experience",
        tags=["HR", "Recruitment"], phone="8714652983",
    ),
    job(
        "fair-exports-boiler-operator", "FAIR Exports", "Boiler Operator (1st & 2nd Class)", NOT_STATED,
        "Boiler Operator (1st & 2nd class). Safe and efficient operation, routine maintenance & inspections, compliance with regulations.",
        experience="experienced", experience_range="3–8 years",
        tags=["Technical", "Manufacturing"], email="recruitment@fairexports.net", phone="9667042112",
    ),

    # ── Outside Kerala ────────────────────────────────────────────────
    job(
        "chrisma-purchase-executive-coimbatore", "Chrisma Consultancy", "Purchase Executive",
        "Coimbatore, Tamil Nadu",
        "Purchase Executive for a leading medicine manufacturing company in Coimbatore. Any graduate (fresher), female candidates only. ₹20,000 – ₹25,000 (as per experience).",
        experience="fresher", experience_range="Any graduate (fresher) · Female only",
        tags=["Procurement", "Pharma"], phone="9947337555", salary="₹20,000 – ₹25,000",
        how="Contact Chrisma Consultancy at 9947 337 555",
    ),
    job(
        "gloves-production-supervisor-tirunelveli", "Medical surgical gloves manufacturer (not named)", "Production Supervisor",
        "Nanguneri, Tirunelveli District, Tamil Nadu",
        "Urgent requirement: Production Supervisor (4 nos) at a medical surgical gloves manufacturing unit in Nanguneri, Tirunelveli. Diploma in Mechanical Engineering / Polymer Technology. Freshers or 1 year experience. Attractive salary and benefits.",
        experience="both", experience_range="Fresher or 1 year · Diploma (Mechanical / Polymer Technology)",
        tags=["Manufacturing", "Production"], phone="9976023120", whatsapp=True, vacancies=4,
    ),
    job(
        "vinfast-naps-nats-diploma-walkin-thoothukudi", "VinFast Auto India Pvt Ltd", "NAPS / NATS Apprentice (Diploma Freshers)",
        "Sipcot Industrial Park, Ottapidaram, Thoothukudi, Tamil Nadu",
        "Direct walk-in 21–25 Sep 2026, 9:00–11:00 AM at Plot No. B-1/11, Sipcot Industrial Park, Ottapidaram, Silanatham, Thoothukudi 628402. Diploma in Mechanical, Automobile or Electrical & Electronics Engineering. 2026 pass-outs or 6 months – 2 years body shop experience. Age 20–26.",
        experience="fresher", experience_range="2026 diploma pass-outs or 6 months – 2 years body shop · Age 20–26",
        employment="Apprenticeship (NAPS/NATS)", tags=["Automobile", "Apprenticeship", "Walk-in"],
        walk_in=True, walk_in_date="2026-09-25", deadline="2026-09-25",
        how="Walk in with your documents, 21–25 Sep 2026, 9:00–11:00 AM",
    ),
    job(
        "lanstitut-finance-manager-bangalore", "Lanstitut (by Emversity)", "Finance Manager",
        "Bangalore",
        "End-to-end finance operations: vendor payments, collections, book closure, MIS, financial planning, compliance and financial controls. Monday–Saturday, 10 AM – 7 PM. ₹12–15 LPA.",
        experience="experienced", experience_range="Chartered Accountant · 2–3 years",
        tags=["Finance", "Bangalore"], email="hr@lanstitut.com", phone="6238500497", salary="₹12–15 LPA",
    ),
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} hiring-poster jobs to jobs-data.js")


if __name__ == "__main__":
    main()
