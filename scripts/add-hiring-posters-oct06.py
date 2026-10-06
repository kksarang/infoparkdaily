#!/usr/bin/env python3
"""Add employer hiring creatives + Codilar Cyberpark role — 6 Oct 2026."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "posters_sep25b2", ROOT / "scripts" / "add-hiring-posters-sep25-batch2.py"
)
batch = importlib.util.module_from_spec(spec)
spec.loader.exec_module(batch)
batch.base.POSTED = "2026-10-06"
mod = batch.mod

def job(*args, **kwargs) -> dict:
    data = batch.job(*args, **kwargs)
    data["id"] = data["id"].removesuffix("-sep2026") + "-oct2026"
    data["hiringNotes"] = data.get("hiringNotes", "").replace("Sep 2026", "Oct 2026")
    if "hiringNotes" not in data or not data["hiringNotes"]:
        data["hiringNotes"] = "Source: employer hiring creative · Oct 2026."
    return data


JOBS = [
    job(
        "codilar-nodejs-backend-developer-fresher-calicut-cyberpark",
        "Codilar Technologies Pvt Ltd",
        "Node.js Backend Developer (Freshers)",
        "Calicut (Govt Cyberpark), Kerala",
        "Build and maintain backend applications using Node.js; design RESTful APIs; integrate third-party services; work with PostgreSQL/MySQL; collaborate with frontend and project teams. Prefer candidates from Kerala.",
        experience="fresher",
        experience_range="Freshers · Kerala candidates preferred",
        tags=["IT", "Node.js", "Freshers", "Cyberpark", "Calicut"],
        email="dahabiya.p@codilar.com",
        website="https://www.codilar.com",
        requirements=[
            "Strong knowledge of Node.js (mandatory)",
            "Good knowledge of JavaScript / basic TypeScript",
            "Basic understanding of Express.js, REST APIs and Git",
            "Basic knowledge of PostgreSQL or MySQL",
            "Good debugging, problem-solving and communication skills",
            "Kerala candidates preferred (as per employer notice)",
        ],
        responsibilities=[
            "Build and maintain backend applications using Node.js",
            "Help design and develop RESTful APIs",
            "Integrate third-party services and APIs",
            "Work with PostgreSQL / MySQL databases",
            "Collaborate with frontend developers and project teams",
        ],
        how="Email dahabiya.p@codilar.com with your resume and Node.js project links if any.",
    ),
    job(
        "kondody-hotels-resorts-multiple-roles-munnar-wayanad",
        "Kondody Hotels & Resorts India Pvt Ltd",
        "Housekeeping Associate",
        "Munnar & Wayanad, Kerala",
        "Kondody Hotels & Resorts is hiring across housekeeping, F&B production, kitchen stewarding, front office, F&B service, HR, learning & development and maintenance at Munnar and Wayanad properties.",
        roles=[
            "Housekeeping Associate / Supervisor / Executive",
            "CDP (South) / Commi II (North) / Commi I Continental / Commi I–III Chinese",
            "Kitchen Stewarding Supervisor",
            "Front Office GSA / GRA",
            "F&B Service GSA / Captain",
            "HR Assistant Manager / Associate",
            "L&D Assistant Manager / Executive",
            "Maintenance Supervisor",
        ],
        experience="both",
        experience_range="As per department · Hospitality experience preferred",
        tags=["Hospitality", "Hotel", "Munnar", "Wayanad"],
        email="hrd@kondodyhotels.com",
        phone="9539900548 / 9072226522",
        how="Email hrd@kondodyhotels.com or rm@kondodyhotels.com. Call 95399 00548 or 90722 26522.",
    ),
    job(
        "smek-scientific-sales-service-engineer-ekm-tvm",
        "Smek Scientific Medical Equipments Kerala Pvt Ltd",
        "Sales & Service Engineer",
        "Ernakulam & Thiruvananthapuram, Kerala",
        "Authorized distributor of international scientific brands. B.Sc. Electronics or B.Sc. Electronics & Communication; freshers with good technical aptitude welcome. Accommodation provided.",
        experience="fresher",
        experience_range="Freshers with technical aptitude welcome · B.Sc. Electronics / E&C",
        tags=["Technical", "Sales", "Medical Equipment", "Kochi", "Trivandrum"],
        email="smekcochin@gmail.com",
        phone="9895035894",
        whatsapp=True,
    ),
    job(
        "jamia-nadwiyya-assistant-professor-english-edavanna",
        "Jamia Nadwiyya Arts & Science College",
        "Assistant Professor in English",
        "Edavanna, Malappuram, Kerala",
        "NAAC B+ college affiliated to University of Calicut. Ph.D. qualified or pursuing Ph.D. preferred; experience in IQAC/NAAC, academic QA or institutional documentation is a plus. Free food and accommodation; attractive remuneration.",
        experience="experienced",
        experience_range="Ph.D. preferred · Teaching / accreditation experience a plus",
        tags=["Education", "Teaching", "Malappuram"],
        phone="9746234241 / 9745205559",
        deadline="2026-10-09",
        apply_link="https://tinyurl.com/ykxcvtnx",
        how="Apply online: https://tinyurl.com/ykxcvtnx · Last date 09 Oct 2026. Call 97462 34241 or 97452 05559 for details.",
    ),
    job(
        "chrisma-warehouse-supervisor-trainee-ernakulam",
        "Chrisma Consultancy",
        "Warehouse Supervisor Trainee",
        "Ernakulam, Kerala",
        "Male candidates · Diploma in Logistics · Fresher · 2 vacancies. Stipend ₹15,000/month; free food & accommodation; day shift; performance-based increment in 3–6 months.",
        experience="fresher",
        experience_range="Fresher · Diploma in Logistics · Male only · 2 vacancies",
        tags=["Logistics", "Warehouse", "Kochi"],
        phone="9947337555",
        salary="₹15,000/month stipend",
        requirements=["Male candidates", "Diploma in Logistics", "Fresher"],
        responsibilities=[
            "Assist warehouse operations and daily activities",
            "Maintain stock accuracy and monitor inventory movement",
            "Coordinate with team; support supervisors in planning",
            "Ensure safety and housekeeping standards",
        ],
    ),
    job(
        "sunrise-hospitals-pharmacy-manager-kakkanad",
        "Sunrise Hospitals",
        "Pharmacy Manager",
        "Seaport–Airport Road, Kakkanad, Kochi, Kerala",
        "NABH-accredited multispeciality network. B.Pharm / M.Pharm with 10–15 years hospital pharmacy experience.",
        experience="experienced",
        experience_range="10–15 years hospital pharmacy · B.Pharm / M.Pharm",
        tags=["Healthcare", "Pharmacy", "Kochi"],
        email="hrmanager@sunrisehospital.in",
        phone="9778690720",
        how="Email hrmanager@sunrisehospital.in or hr@sunrisehospital.in · Call 97786 90720.",
    ),
    job(
        "sunrise-hospitals-financial-counselor-kakkanad",
        "Sunrise Hospitals",
        "Financial Counselor",
        "Kakkanad, Kochi, Kerala",
        "MSW qualification with 1+ year hospital experience. Seaport–Airport Road, Thrikkakara, Kakkanad.",
        experience="experienced",
        experience_range="MSW · 1+ year in a hospital",
        tags=["Healthcare", "Hospital", "Kochi"],
        email="hr@sunrisehospital.in",
        phone="9778690720",
    ),
    job(
        "tmm-hospital-respiratory-therapist-tiruvalla",
        "Tiruvalla Medical Mission (TMM Hospital)",
        "Respiratory Therapist",
        "Tiruvalla, Kerala",
        "Comprehensive respiratory care: assessment, oxygen therapy, nebulization, ventilator management. BSc Respiratory Therapy; 2–3 years preferred; freshers may apply.",
        experience="both",
        experience_range="BSc Respiratory Therapy · 2–3 years preferred · Freshers may apply",
        tags=["Healthcare", "Hospital", "Pathanamthitta"],
        email="careers@tmmhospital.org",
        phone="9188909443",
        website="https://www.tmmhospital.org",
        apply_link="https://tmmhospital.org/careers",
        how="Apply at tmmhospital.org/careers or email careers@tmmhospital.org · Call 91889 09443.",
    ),
    job(
        "logiprompt-software-tester-faculty-technopark",
        "Logiprompt Techno Solutions India Pvt Ltd",
        "Software Tester Faculty",
        "Opposite Technopark Phase 1, Thiruvananthapuram",
        "Training / faculty role for software testing at Logiprompt near Technopark Phase 1.",
        experience="both",
        experience_range="As per employer notice",
        tags=["IT", "QA", "Teaching", "Technopark"],
        email="career@logiprompt.com",
        phone="8078173817 / 8943043767",
        website="https://www.logiprompt.com",
    ),
    job(
        "mentors-agro-cro-bdo-thiruvanchoor",
        "Mentors Agro Farmer Producer Company Limited",
        "Customer Relationship Officer / Business Development Officer",
        "Thiruvanchoor, Kerala",
        "Mentors Group hiring: Customer Relationship Officer (5 vacancies) and Business Development Officer (2 vacancies).",
        roles=["Customer Relationship Officer (5 vacancies)", "Business Development Officer (2 vacancies)"],
        experience="both",
        experience_range="As per employer notice",
        tags=["Sales", "Agri", "Kerala"],
        phone="9947109408",
        whatsapp=True,
        how="Call 99471 09408 or WhatsApp +91 79029 69158.",
    ),
    job(
        "mentors-agro-cro-bdo-adimali",
        "Mentors Agro Farmer Producer Company Limited",
        "Business Development Officer / Customer Relationship Officer",
        "Adimali, Kerala",
        "Adimali branch: Business Development Officer and Customer Relationship Officer (5 vacancies each per poster). Growth opportunities and supportive team.",
        roles=["Business Development Officer (5 vacancies)", "Customer Relationship Officer (5 vacancies)"],
        experience="both",
        experience_range="As per employer notice",
        tags=["Sales", "Agri", "Idukki"],
        phone="7593060047 / 8921834770",
    ),
    job(
        "perfect-hand-solution-embedded-engineer-trivandrum",
        "Perfect Hand Solution",
        "Embedded Engineer",
        "Kulathoor, Trivandrum, Kerala",
        "0–2 years · ₹10k–₹20k. C/C++, Raspberry Pi, ESP32, embedded systems; RTOS/IoT preferred; networking knowledge an advantage. Address: First Floor, Opp. Kerala Gramin Bank, Arisumoodu, Kulathoor 695583.",
        experience="fresher",
        experience_range="0–2 years",
        tags=["IT", "Embedded", "IoT", "Trivandrum"],
        email="perfecthandsolution@gmail.com",
        phone="9995186444",
        salary="₹10,000 – ₹20,000 per month",
        requirements=[
            "Knowledge in C / C++ programming",
            "Experience with Raspberry Pi, ESP32 and embedded systems",
            "Understanding of RTOS, IoT (preferred)",
            "Good problem-solving and debugging skills",
        ],
    ),
    job(
        "aabasoft-business-development-executive-kakkanad",
        "Aabasoft",
        "Business Development Executive",
        "Chakolas Heights, Seaport–Airport Road, Kakkanad, Kochi (near Infopark South Gate)",
        "Good Malayalam communication; strong telephone convincing skills. Any degree/diploma. Shift 9 AM–6 PM; immediate joining preferred.",
        experience="both",
        experience_range="Any degree / diploma · Immediate joining preferred",
        tags=["Sales", "BPO", "Kochi", "Infopark"],
        email="Jobs@aabasoft.in",
        phone="8089009751",
    ),
    job(
        "aabasoft-technical-support-executive-kakkanad",
        "Aabasoft",
        "Technical Support Executive",
        "Chakolas Heights, Seaport–Airport Road, Kakkanad, Kochi (near Infopark South Gate)",
        "Fluent Malayalam; ISP troubleshooting and networking. 9-hour shifts (rotations include 8 AM–5 PM through 3 PM–12 AM as listed on poster).",
        experience="both",
        experience_range="ISP / networking support · 9-hour shift",
        tags=["IT", "Technical Support", "Kochi", "Infopark"],
        email="Jobs@aabasoft.in",
        phone="8089002222",
        requirements=[
            "Good communication with fluency in Malayalam",
            "ISP troubleshooting and networking skills",
            "Ready to work in a 9-hour shift (multiple shift slots on poster)",
        ],
    ),
    job(
        "sims-multispeciality-hospital-pharmacist-ponkunnam",
        "SIMS Multi-speciality Hospital",
        "Pharmacist",
        "KVMS Junction, Ponkunnam, Kerala",
        "B.Pharm or D.Pharm; 1–2 years hospital or retail pharmacy; rotational shifts including weekends/holidays. Freshers may apply.",
        experience="both",
        experience_range="1–2 years preferred · Freshers may apply · B.Pharm / D.Pharm",
        tags=["Healthcare", "Pharmacy", "Kottayam"],
        email="simshospitalhr25@gmail.com",
        phone="8606078307",
    ),
    job(
        "keya-foods-executive-qa-qc-alappuzha",
        "Keya Foods International Private Ltd",
        "Executive – QA/QC",
        "Kuthiyathode, Thuravoor, Alappuzha, Kerala",
        "BSc/MSc Food Technology; 2–3 years in food industry. Male candidates preferred; salary per industry standards.",
        experience="experienced",
        experience_range="2–3 years food industry · BSc/MSc Food Technology",
        tags=["Food", "QA", "Alappuzha"],
        email="arunkumar.ng@keyafoods.com",
        requirements=[
            "BSc Food Technology or MSc Food Technology",
            "2–3 years experience in food industry",
            "Male candidates preferred (as per employer notice)",
        ],
    ),
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} hiring-poster jobs to jobs-data.js")


if __name__ == "__main__":
    main()
