#!/usr/bin/env python3
"""Add employer hiring creatives collected 3 Oct 2026.

Skipped from this batch:
- Sunrise Hospitals (Kanhangad GP, Kakkanad Sr. SEO Content Writer), Speridian,
  Amphenol, Palal Group, ZyrOps — already listed.
- Caritas Matha Hospital Jr. Engineer – Maintenance — deadline 30 Sep 2026 has passed.
- "BDE / Campus Councilor" poster — no company name or contact details on the creative.
"""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "posters_sep25b2", ROOT / "scripts" / "add-hiring-posters-sep25-batch2.py"
)
batch = importlib.util.module_from_spec(spec)
spec.loader.exec_module(batch)
batch.base.POSTED = "2026-10-03"
mod = batch.mod

NOT_STATED = batch.NOT_STATED


def job(*args, **kwargs) -> dict:
    data = batch.job(*args, **kwargs)
    data["id"] = data["id"].removesuffix("-sep2026") + "-oct2026"
    data["hiringNotes"] = data["hiringNotes"].replace("Sep 2026", "Oct 2026")
    return data


JOBS = [
    # ── Kochi / Ernakulam ─────────────────────────────────────────────
    job(
        "gadgeon-ai-engineer-python-full-stack-kochi", "GadgEon Smart Systems",
        "AI Engineer / Python Full Stack Developer", "Kochi (On-site)",
        "Full-time, on-site in Kochi. Build scalable Agentic AI applications using Python, manage MLOps pipelines and the model lifecycle, design cloud-native systems with Kubernetes and develop frontend experiences with React/TypeScript.",
        experience="experienced", experience_range="4+ years",
        tags=["IT", "AI", "Python", "Kochi"], email="maria.joy@gadgeon.com", website="https://www.gadgeon.com",
        extra={"skills": ["Python", "Agentic AI", "Kubernetes", "React", "TypeScript", "MLOps", "CI/CD"]},
        responsibilities=[
            "Build scalable Agentic AI applications using Python",
            "Manage MLOps pipelines and model lifecycle",
            "Design cloud-native systems with Kubernetes",
            "Develop frontend experiences with React/TypeScript",
        ],
    ),
    job(
        "fedserv-servicenow-itom-itam-developer-kochi", "FedServ (Federal Operations & Services Ltd)",
        "ServiceNow ITOM / ITAM Developer", "Kochi",
        "ServiceNow ITOM/ITAM Developer at FedServ, a wholly owned subsidiary of Federal Bank, Kochi. 2+ years experience; immediate joiners preferred. The poster asks candidates to apply by scanning its QR code — no email or phone is printed.",
        experience="experienced", experience_range="2+ years · Immediate joiners preferred",
        tags=["IT", "ServiceNow", "Banking", "Kochi"],
        extra={"skills": ["ServiceNow ITOM", "ServiceNow ITAM", "CMDB", "Discovery", "Service Mapping", "HAM", "SAM", "REST/SOAP"]},
        responsibilities=[
            "Configure & support ServiceNow ITOM / ITAM modules",
            "Manage CMDB, Discovery & Service Mapping",
            "Develop workflows, scripts & platform enhancements",
            "Support HAM & SAM processes",
            "Build and support REST / SOAP integrations",
            "Troubleshoot Discovery, CMDB & asset data issues",
            "Support SIT, UAT & production deployments",
        ],
        apply_link="https://www.federalbank.co.in/careers",
        how="Scan the QR code on the FedServ hiring poster to apply (no email or phone printed). Also check Federal Bank / FedServ careers.",
    ),
    job(
        "aicni-multiple-leads-aluva", "AICNI (Artificial Intelligence Community Network India)",
        "Technology Lead", "Aluva, Kerala",
        "AICNI, an initiative of All4You International Pvt Ltd, is hiring five leads to build India's AI community ecosystem. Full-time (hybrid may be considered), 1-month probation, Aluva. Technology Lead (platform, architecture, security), Community Lead (member growth, chapters), Education & Events Lead (workshops, hackathons), Partnerships & Corporate Relations Lead (universities, sponsors, startups) and Media & Communications Lead (social, PR, video, brand).",
        roles=["Technology Lead", "Community Lead", "Education & Events Lead", "Partnerships & Corporate Relations Lead", "Media & Communications Lead"],
        experience="experienced", experience_range="As per employer notice · 1-month probation",
        tags=["IT", "AI", "Community", "Marketing"], email="hr@aicni.in", phone="7306998230", website="https://aicni.in",
        how="Send your CV to hr@aicni.in or WhatsApp 73069 98230",
    ),
    job(
        "oppo-sansco-service-engineer-angamaly", "OPPO (Sansco – Authorized Exclusive Distributor)",
        "Service Engineer", "Angamaly",
        "Service Engineer for OPPO's authorized exclusive distributor in Angamaly. Diploma in Electrical & Electronics (full-time), Diploma in Mobile Technology (2–3 years) or ITI. Relevant experience in mobile repair/service preferred. Good communication & customer-handling skills.",
        experience="both", experience_range="Mobile repair / service experience preferred",
        tags=["Technical", "Mobile Service", "Kochi"], email="careers.oppo@sansco.in", phone="9072587278",
        requirements=["Diploma in Electrical & Electronics (full-time), Diploma in Mobile Technology (2–3 years) or ITI", "Relevant experience in mobile repair / service preferred", "Good communication & customer-handling skills"],
    ),
    job(
        "avt-natural-operators-cat-aluva", "AVT Natural Products (via Hire360 Global)",
        "Operator (CAT)", "Aluva, Ernakulam",
        "Operators (CAT) for AVT Natural Products, Aluva. Male candidates only; freshers can apply. Diploma/B.Tech (Electrical, Mechanical, Electronics, Machining, Mechatronics) or ITI (Electrical, Mechanical, Fitter, Turner, Machinist). Salary per month: ITI ₹15,900, Diploma ₹16,400, B.Tech ₹17,400. Perks: canteen, PF & ESI, uniform, safety shoes, overtime/shift allowance, cab service. Interview any day from 09:30 AM. Contact is Hire360 Global, not AVT directly — confirm before travelling.",
        experience="fresher", experience_range="Freshers can apply · ITI / Diploma / B.Tech · Male only",
        tags=["Manufacturing", "Technical", "Kochi"], email="careers@hire360global.com", phone="9249543744",
        salary="₹15,900 (ITI) · ₹16,400 (Diploma) · ₹17,400 (B.Tech) per month",
        walk_in=True, walk_in_date="Any day from 09:30 AM",
        requirements=["Diploma / B.Tech: Electrical, Mechanical, Electronics, Machining, Mechatronics", "ITI: Electrical, Mechanical, Fitter, Turner, Machinist", "Male candidates only"],
        responsibilities=[
            "Operate and monitor production equipment for processing natural / botanical ingredients",
            "Follow SOPs, safety guidelines and GMP practices",
            "Ensure cleanliness and hygiene of machines, tools and work areas",
            "Perform basic equipment checks and report malfunctions",
        ],
    ),
    job(
        "5-dimensions-hr-generalist-pancode", "5 Dimensions HR (for a food ingredients manufacturer)",
        "HR Generalist", "Pancode, Ernakulam",
        "HR Generalist for a leading food ingredients manufacturing company at Pancode, Ernakulam. 6 months – 2 years experience. ₹3–4 LPA. Share your CV via WhatsApp.",
        experience="experienced", experience_range="6 months – 2 years",
        tags=["HR", "Manufacturing", "Kochi"], phone="8129915330", whatsapp=True, salary="₹3–4 LPA",
        how="Share your CV via WhatsApp to +91 81299 15330",
    ),

    # ── Trivandrum ────────────────────────────────────────────────────
    job(
        "hostdime-systems-engineer-trivandrum", "HostDime India", "Systems Engineer", "Trivandrum",
        "Systems Engineer (referral drive) at HostDime, Trivandrum. 1–3 years in Linux, cPanel & web servers. Hands-on Linux/Windows servers, networking & troubleshooting; L2/L3 support, monitoring, system administration & incident handling; 24×7 infrastructure mindset.",
        experience="experienced", experience_range="1–3 years · Linux, cPanel & web servers",
        tags=["IT", "Linux", "Infrastructure", "Trivandrum"], email="careers@hostdime.in", website="https://www.hostdime.in",
        requirements=["Hands-on experience in Linux/Windows servers, networking & troubleshooting", "Strong in L2/L3 support, monitoring, system administration & incident handling", "Good problem-solving, communication & documentation skills; 24×7 infrastructure mindset"],
        extra={"isReferral": True, "referralLabel": "Referrals welcome"},
    ),
    job(
        "hostdime-it-sales-executive", "HostDime India", "IT Sales Executive",
        "Trivandrum · Mumbai · Bangalore · Chennai",
        "IT Sales Executive (referral drive) at HostDime. 2–5 years in IT/technology sales with a proven lead-generation-to-conversion record; strong communication, negotiation, prospecting and relationship management; manages the full sales cycle through closure and client retention.",
        experience="experienced", experience_range="2–5 years in IT / technology sales",
        tags=["Sales", "IT", "Trivandrum"], email="careers@hostdime.in", website="https://www.hostdime.in",
        extra={"isReferral": True, "referralLabel": "Referrals welcome"},
    ),

    # ── Thrissur ──────────────────────────────────────────────────────
    job(
        "elite-assistant-manager-purchase-thrissur", "Elite Foods (Elite – Good For You)",
        "Assistant Manager – Purchase", "Thrissur",
        "Procurement of bakery ingredients, raw materials and packaging materials; vendor negotiation and cost optimization; ensure timely availability and quality of materials; coordinate with internal teams and suppliers. SAP knowledge is mandatory.",
        experience="experienced", experience_range="5–6 years in purchase / procurement (FMCG / food preferred)",
        tags=["Procurement", "FMCG", "Thrissur"], email="hrsales.ka@eliteindia.com", phone="7994090222",
        requirements=["5–6 years in purchase / procurement, preferably FMCG / food industry", "SAP knowledge (mandatory)"],
        how="Email hrsales.ka@eliteindia.com · queries on WhatsApp +91 79940 90222",
    ),

    # ── Central Travancore ────────────────────────────────────────────
    job(
        "tmm-ranny-dialysis-technician-trainee", "Tiruvalla Medical Mission (Ranny unit)",
        "Dialysis Technician", "Manthamaruthy, Ranny, Pathanamthitta",
        "Dialysis Technician (minimum two years experience) and Dialysis Trainee (freshers can apply) at Tiruvalla Medical Mission, Manthamaruthy, Ranny. Send your CV by WhatsApp only — no calls.",
        roles=["Dialysis Technician", "Dialysis Trainee"],
        experience="both", experience_range="Technician: 2+ years · Trainee: freshers",
        tags=["Healthcare", "Dialysis", "Pathanamthitta"], phone="6238783982", whatsapp=True,
        how="WhatsApp your CV to 62387 83982 (no calls)",
    ),
    job(
        "usha-hospital-lab-technician-chengannur", "Usha Hospital", "Lab Technician", "Chengannur",
        "Immediate hiring: Lab Technician at Usha Hospital, Chengannur. Ladies only. B.Sc MLT with minimum 1 year experience. Call between 10 AM and 6 PM.",
        experience="experienced", experience_range="Minimum 1 year · B.Sc MLT · Ladies only",
        tags=["Healthcare", "Lab", "Alappuzha"], email="ushahospitalchengannur@gmail.com", phone="7510348693 / 8281175530",
        requirements=["B.Sc MLT", "Minimum 1 year experience", "Female candidates only"],
        how="Email ushahospitalchengannur@gmail.com or call +91 75103 48693 / +91 82811 75530 (10 AM – 6 PM)",
    ),

    # ── Malabar ───────────────────────────────────────────────────────
    job(
        "meitra-executive-billing-calicut", "Meitra Hospital", "Executive – Billing", "Meitra Hospital, Calicut",
        "Executive – Billing at Meitra Hospital, Calicut. Any degree; 1 year minimum experience preferred. The phone number on the poster is printed as +91 73566 0048 (9 digits) — email is the reliable channel.",
        experience="experienced", experience_range="1 year minimum preferred · Any degree",
        tags=["Healthcare", "Billing", "Calicut"], email="recruitment@meitra.com", phone="73566 0048 (as printed)",
        website="https://www.meitra.com",
        how="Share your CV to jomin.tom@meitra.com or recruitment@meitra.com",
    ),
    job(
        "fitreatcouple-hr-manager-calicut", "FitreatCouple", "HR Manager", "Calicut",
        "Lead and manage HR operations, handle recruitment and employee relations, develop and implement HR policies, and drive employee engagement and team development.",
        experience="experienced", experience_range="4+ years · MBA in HR / any relevant degree",
        tags=["HR", "Calicut"], email="career@fitreatcouple.com",
    ),
    job(
        "dorman-luxe-living-sales-marketing-sulthan-bathery", "Dorman Luxe Living", "Sales & Marketing Executive",
        "Sulthan Bathery, Wayanad",
        "Sales & Marketing at Dorman Luxe Living, Sulthan Bathery. Freshers & experienced can apply. Marketing & promotion, market research & analysis, brand management, customer relationship management, customer feedback & improvement, reporting & analysis.",
        experience="both", experience_range="Freshers & experienced · Marketing / Sales / Business Marketing",
        tags=["Sales", "Marketing", "Wayanad"], email="hrmanagergtuff@gmail.com", phone="6235023514",
        apply_link="mailto:hrmanagergtuff@gmail.com?subject=Sales%20%26%20Marketing%20Executive%20%E2%80%94%20Dorman%20Luxe%20Living",
    ),
    # ── Kollam ────────────────────────────────────────────────────────
    job(
        "ss-tvs-sales-roles-ayoor", "SS TVS", "Sales Manager", "Ayoor, Kollam",
        "SS TVS (TVS two-wheeler dealer), Ayoor is hiring Sales Manager, Sales Executive and Field Executive. The email on the poster is printed as \"sstvsgm@gmail.co\" (likely gmail.com) — call to confirm before emailing.",
        roles=["Sales Manager", "Sales Executive", "Field Executive"],
        experience="both", experience_range="As per employer notice",
        tags=["Automobile", "Sales", "Kollam"], phone="9061710171 / 9539012046",
        how="Call 90617 10171 / 95390 12046 (email printed as sstvsgm@gmail.co — confirm the address by phone)",
    ),

    # ── Location not stated ───────────────────────────────────────────
    job(
        "sirius-autowerke-telecaller", "Sirius Autowerke", "Telecaller", NOT_STATED,
        "Urgent hiring: Telecaller for Sirius Autowerke's automotive team. Excellent communication, fluent Malayalam & English, good telephone etiquette, customer handling & follow-up, basic automotive knowledge.",
        experience="both", experience_range="Fluent Malayalam & English",
        tags=["Telecalling", "Automobile"], email="siriusautowerke16@gmail.com", phone="9061982540",
    ),
    job(
        "morickap-front-office-manager", "Morickap Luxury Resort & Spa", "Front Office Manager", NOT_STATED,
        "Front Office Manager at Morickap Luxury Resort & Spa. Experienced in front office operations, guest relations and team management. Strong communication and leadership skills required.",
        experience="experienced", experience_range="Front office operations & team management experience",
        tags=["Hospitality"], email="hr@morickapresort.com", phone="6366239004",
    ),
    job(
        "s2bds-civil-3d-modeler-wfh", "S2BDS (Saanvi Sri BIM & Design Studio)", "Civil 3D Modeler",
        "Work from home",
        "Urgent: Civil 3D Modeler, work from home, approx. one-month contract project. Mechanical engineering background; LPG project experience is an advantage; LOD 300 to LOD 500. Pipe routing, Civil 3D, Navisworks clash coordination, shop drawings. High-end system and reliable internet required. Immediate joiners preferred.",
        experience="experienced", experience_range="Mechanical engineering background · LOD 300–500",
        employment="Contract", tags=["BIM", "Civil 3D", "Remote"], email="hr@s2aec.com", phone="9700073425",
        apply_link="https://ln.run/Y40A8",
        extra={"skills": ["Civil 3D", "Navisworks", "Pipe routing", "Shop drawings", "LOD 300–500"]},
        how="Apply at https://ln.run/Y40A8, email hr@s2aec.com or call/WhatsApp +91 97000 73425",
    ),
    job(
        "tata-motors-graduate-apprentice-trainee-2026", "Tata Motors", "Graduate Apprentice Trainee", NOT_STATED,
        "Graduate Apprentice Trainee, 1 year, ₹25,000/month stipend. BE/BTech 2026 graduates in Automobile, Mechanical, Mechatronics, Electrical, Electronics, Production, Manufacturing, Computer Science, AI, Cyber Security, AIML, Data Science or Civil. Minimum 60% throughout academics, no active backlogs. The poster asks candidates to apply via its QR code; last date 5 Oct 2026.",
        experience="fresher", experience_range="BE/BTech 2026 batch · 60%+ throughout · No active backlogs",
        employment="Apprenticeship", tags=["Engineering", "Apprenticeship", "Automobile"],
        salary="₹25,000/month stipend", deadline="2026-10-05",
        website="https://www.tatamotors.com/careers/", apply_link="https://www.tatamotors.com/careers/",
        requirements=["BE/BTech, graduated batch of 2026", "Minimum 60% throughout academics; no active ATKT/backlogs", "Branches: Automobile, Mechanical, Mechatronics, Electrical, Electronics, Production, Manufacturing, CS, AI, Cyber Security, AIML, Data Science, Civil"],
        how="Scan the QR code on the Tata Motors poster (last date 5 Oct 2026) or check Tata Motors careers",
    ),
    job(
        "digitide-associate-customer-support-hyderabad", "Digitide (via Lyros Tech)", "Associate – Customer Support",
        "Hyderabad",
        "Associate – Customer Support at Digitide, Hyderabad. Language pairs: English–Malayalam, English–Assamese, English–Bengali. CTC ₹20K under NAPS, virtual interviews, immediate joining. Resumes go to hr@lyrostech.com (a recruiter address, not a Digitide domain) with the subject as your language skill.",
        experience="both", experience_range="English + Malayalam / Assamese / Bengali",
        tags=["Customer Support", "BPO", "Hyderabad"], email="hr@lyrostech.com", salary="₹20K CTC (under NAPS)",
        apply_link="mailto:hr@lyrostech.com?subject=Language%20Skill%20-%20Associate%20Customer%20Support",
        how="Email hr@lyrostech.com with the subject line set to your language skill (e.g. English – Malayalam)",
    ),
    job(
        "lazdana-oryx-asto-multiple-roles-bangalore", "Lazdana Hotels & Resorts", "Sales Executive",
        "Indiranagar, Bangalore",
        "Lazdana Hotels and Resorts Pvt Ltd, Indiranagar, Bangalore. Oryx Village Restaurant & Lounge: OM (chain restaurant experience preferred), Accountant. Asto Convention Center: Sr. Sales Executive / Assistant Sales Manager, Technician. Lazdana Hotel: Sales Executive, Chef (multi cuisine).",
        roles=["Operations Manager (Oryx Village)", "Accountant (Oryx Village)", "Sr. Sales Executive / Assistant Sales Manager (Asto)", "Technician (Asto)", "Sales Executive (Lazdana Hotel)", "Chef – Multi Cuisine (Lazdana Hotel)"],
        experience="experienced", experience_range="As per employer notice",
        tags=["Hospitality", "Sales", "Bangalore"], email="hr.blr@lazdana.com", phone="7902711118",
    ),
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} hiring-poster jobs to jobs-data.js")


if __name__ == "__main__":
    main()
