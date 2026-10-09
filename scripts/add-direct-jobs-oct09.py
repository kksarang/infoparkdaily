#!/usr/bin/env python3
"""Direct hiring posts — 9 Oct 2026 (Canonical, Aster, MNCs, RIOD, Maxdax, Amlaforest urgent)."""

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
TODAY = mod.TODAY.isoformat()


def direct(
    slug: str,
    company: str,
    title: str,
    location: str,
    *,
    experience: str,
    experience_range: str,
    apply_link: str = "",
    email: str = "",
    phone: str = "",
    employment_type: str = "Full-time",
    work_mode: str = "",
    tags: list[str],
    work_details: str,
    requirements: list[str],
    responsibilities: list[str] | None = None,
    description: str = "",
    deadline: str = "Rolling",
    roles: list[str] | None = None,
    urgent: bool = False,
    alert_badge: str = "",
    salary: str = "",
    how: str = "",
) -> dict:
    roles = roles or [title]
    apply = apply_link or (
        f"mailto:{email}?subject={title.replace(' ', '%20')}" if email else ""
    )
    job = {
        "id": f"{slug}-oct26",
        "company": company,
        "logo": "",
        "companyBlurb": f"{company} · {title} · {location}",
        "location": location,
        "roles": roles,
        "experience": experience,
        "experienceRange": experience_range,
        "employmentType": employment_type,
        "applyLink": apply,
        "applyDeadline": deadline,
        "postedDate": TODAY,
        "source": "WhatsApp",
        "verified": True,
        "verificationNote": NOTE,
        "tags": tags,
        "isWalkIn": False,
        "walkInDate": "",
        "email": email,
        "phone": phone,
        "website": "",
        "address": location,
        "industry": "As per employer notice",
        "companyDetails": f"{company} — hiring for {title}.",
        "workDetails": work_details,
        "workStatus": employment_type,
        "workMode": work_mode or "As per employer notice",
        "experienceYears": experience_range,
        "qualification": "",
        "skills": [],
        "requirements": requirements,
        "responsibilities": responsibilities or ["Deliver outcomes as described in the official posting or employer notice."],
        "benefits": [
            "Listing shared via InfoparkDaily community channels",
            "Never pay anyone for this application",
        ],
        "howToApply": how or (f"Apply: {apply}" if apply else "Contact employer using details on this listing."),
        "hiringNotes": f"Added Oct 2026 · Verify role and deadline on the official channel before applying.",
        "description": description or work_details[:280],
        "startingDate": "",
    }
    if salary:
        job["salaryRange"] = salary
    if urgent:
        job["urgentHiring"] = True
        job["alertBadge"] = alert_badge or "Urgent hiring"
    if company == "Amazon":
        job["benefits"] = [
            "Apply only on Amazon Jobs — never pay anyone for this application",
            "Official amazon.jobs listing",
        ]
    return job


JOBS = [
    # 14 — urgent, pinned first in feed via urgentHiring + array order
    direct(
        "amlaforest-devops-cloud-engineer-ai-platforms",
        "Amlaforest",
        "DevOps / Cloud Engineer (AI-Ready Platforms)",
        "Kerala (location not stated — confirm with employer)",
        experience="experienced",
        experience_range="4+ years DevOps / Cloud / Platform Engineering · Immediate joiners",
        email="rejo@amlaforest.com",
        tags=["IT", "DevOps", "Cloud", "AWS", "Azure", "AI", "Immediate"],
        employment_type="Full-time",
        work_details=(
            "Sister concern of Sreedhareeyam Ayurveda Eye Hospital. Design and manage scalable cloud "
            "infrastructure (AWS, Azure, GCP); CI/CD; IaC (Terraform, CloudFormation, Bicep); monitoring "
            "and incident response; support web, mobile, SaaS and AI/LLM workloads. Immediate joiners preferred."
        ),
        requirements=[
            "4+ years in DevOps, Cloud or Platform Engineering",
            "AWS, Azure or GCP hands-on experience",
            "GitHub Actions, GitLab CI, Azure DevOps or Jenkins",
            "Docker, Kubernetes, Linux, Terraform",
            "Observability and monitoring tools",
            "Graduate preferred",
        ],
        responsibilities=[
            "Design and manage cloud infrastructure across AWS, Azure or GCP",
            "Build and maintain CI/CD pipelines",
            "Implement Infrastructure as Code",
            "Own deployments, monitoring and incident response",
            "Optimize cost and performance",
            "Support AI/LLM application infrastructure",
        ],
        how="Email rejo@amlaforest.com with subject: Application for DevOps / Cloud Engineer – [Your Name]",
        urgent=True,
        alert_badge="Urgent · Immediate joiners",
        description="Amlaforest hiring DevOps / Cloud Engineer (4+ yrs) for AI-ready platforms — immediate joiners.",
    ),
    direct(
        "canonical-graduate-software-engineer-off-campus-2026",
        "Canonical",
        "Graduate Software Engineer",
        "Remote / Work from home (India)",
        experience="fresher",
        experience_range="2025 & 2026 batches · B.E / B.Tech / Bachelor's",
        apply_link="https://job-boards.greenhouse.io/canonical/jobs/8249005",
        tags=["IT", "Freshers", "Remote", "Python", "Linux"],
        employment_type="Full-time",
        work_mode="Remote / Work from home",
        work_details=(
            "Canonical off-campus hiring 2026. Graduate Software Engineer — Python, Java, C++, Linux, "
            "JavaScript, Git. Selection: online application, assessment, technical interview, HR, offer."
        ),
        requirements=[
            "B.E / B.Tech / Bachelor's degree",
            "2025 or 2026 batch eligible",
            "Python, Java, C++, Linux, JavaScript, Git",
        ],
        how="Apply on Greenhouse: https://job-boards.greenhouse.io/canonical/jobs/8249005",
    ),
    direct(
        "aster-trivandrum-non-medical-admin-multiple-roles",
        "Aster Trivandrum",
        "Non-Medical & Administrative Professionals",
        "Thiruvananthapuram, Kerala",
        experience="both",
        experience_range="Freshers and experienced (role-dependent)",
        email="sarath.kumar@asterqualitycare.com",
        tags=["Healthcare", "Hospital", "Admin", "Trivandrum"],
        roles=[
            "Operations",
            "IP Billing",
            "Marketing",
            "Store & Purchase",
            "Insurance",
            "Front Office",
            "Quality",
        ],
        work_details=(
            "Aster Trivandrum hiring across operations, IP billing, marketing, store & purchase, insurance, "
            "front office and quality. Freshers and experienced may apply depending on position."
        ),
        requirements=["Mention the position applied for in the email subject line"],
        how="Email sarath.kumar@asterqualitycare.com with position name in the subject line.",
    ),
    direct(
        "infosys-bpm-technology-support-executive-bangalore",
        "Infosys BPM",
        "Technology Support Executive",
        "Bangalore, Karnataka",
        experience="fresher",
        experience_range="0–2 years · 2023–2026 batches · Any graduate",
        apply_link="https://career.infosys.com/jobdesc?jobReferenceCode=PROGEN-EXTERNAL-254819&sourceId=41",
        tags=["IT", "Freshers", "Bangalore", "BPM"],
        salary="₹3 – ₹5 LPA (expected — verify on official posting)",
        work_details="Infosys BPM hiring Technology Support Executive for graduates and freshers in Bangalore.",
        requirements=["Any graduate / Bachelor's degree", "0–2 years experience", "Eligible batches 2023–2026"],
        how="Apply on Infosys Careers: PROGEN-EXTERNAL-254819",
    ),
    direct(
        "concentrix-associate-java-full-stack-developer-hyderabad",
        "Concentrix",
        "Associate Java Full Stack Developer",
        "Hyderabad, Telangana",
        experience="fresher",
        experience_range="0–3 years · Freshers eligible · B.E / B.Tech / MCA",
        apply_link="https://cnx.wd1.myworkdayjobs.com/external_global/job/IND-Hyderabad/Java-Full-Stack-Developer_R1768581",
        tags=["IT", "Java", "Freshers", "Hyderabad"],
        work_mode="Work from office",
        salary="₹4 – ₹8 LPA (expected — verify on official posting)",
        deadline="2026-10-09",
        work_details="Concentrix hiring Associate Java Full Stack Developer in Hyderabad. Freshers and early-career developers eligible.",
        requirements=["B.E / B.Tech / MCA", "0–3 years experience", "Java full stack skills"],
    ),
    direct(
        "wipro-apprentices-l0-bengaluru",
        "Wipro",
        "Apprentices L0",
        "Bengaluru, Karnataka",
        experience="fresher",
        experience_range="0–4 years · 2021–2026 batches · Any graduate",
        apply_link="https://careers.wipro.com/job/Apprentices-L0/194811-en_US/",
        tags=["IT", "Freshers", "Bangalore", "Wipro"],
        salary="₹3 – ₹6 LPA (expected — verify on official posting)",
        work_details="Wipro Apprentices L0 — freshers and experienced candidates across eligible batches.",
        requirements=["Any graduate / Bachelor's degree", "0–4 years experience", "Batches 2021–2026"],
    ),
    direct(
        "amazon-ctk-svc-associate-wfh-hyd-blr-10543815",
        "Amazon",
        "CTK Svc Associate",
        "Hyderabad / Bengaluru, India",
        experience="fresher",
        experience_range="Bachelor's or advanced degree · Work from home",
        apply_link="https://www.amazon.jobs/en/jobs/10543815/ctk-svc-associate",
        tags=["Amazon", "Work from home", "Hyderabad", "Bangalore"],
        work_mode="Work from home / Virtual",
        salary="₹4 – ₹5.5 LPA (expected — verify on Amazon Jobs)",
        work_details=(
            "Amazon Centralized Timekeeping (CTK) Service Associate — virtual / WFH role in Hyderabad or Bangalore."
        ),
        requirements=["Bachelor's degree or advanced degree"],
        how="Apply on Amazon Jobs: https://www.amazon.jobs/en/jobs/10543815/ctk-svc-associate",
    ),
    direct(
        "riod-logic-business-development-associate-infopark-koratty",
        "RIOD Logic Pvt Ltd",
        "Business Development Associate",
        "Infopark, Koratty, Kerala",
        experience="experienced",
        experience_range="1–4 years · Software/IT sales or pre-sales",
        email="join@riodlogic.com",
        phone="7902215189",
        tags=["Sales", "IT", "Infopark", "Koratty"],
        work_details=(
            "Lead management, client communication, proposals and quotations, pipeline management, "
            "coordination with sales and technical teams."
        ),
        requirements=["1–4 years in software/IT sales or pre-sales", "Strong communication and follow-up skills"],
        responsibilities=[
            "Lead management and follow-ups",
            "Client communication and requirement understanding",
            "Proposal and quotation preparation",
            "Sales coordination and pipeline management",
            "Coordinate with sales and technical teams",
        ],
    ),
    direct(
        "riod-logic-mechanical-engineer-angamaly",
        "RIOD Logic Pvt Ltd",
        "Mechanical Engineer",
        "Angamaly, Kerala",
        experience="experienced",
        experience_range="2+ years · Product design & manufacturing",
        email="join@riodlogic.com",
        tags=["Engineering", "Mechanical", "Kochi"],
        work_details=(
            "Product design and 3D modeling; Fusion 360, SolidWorks, AutoCAD; sheet metal and mold design; "
            "plastic components, BOMs, vendor coordination."
        ),
        requirements=[
            "2+ years experience",
            "Fusion 360, SolidWorks, AutoCAD",
            "Sheet metal, mold design, plastic components",
            "BOMs, technical drawings, manufacturing support",
        ],
    ),
    direct(
        "maxdax-service-cum-admin-executive-kochi-calicut",
        "Maxdax",
        "Service cum Admin Executive",
        "Kochi & Calicut, Kerala",
        experience="experienced",
        experience_range="Experienced candidates preferred · Female candidates preferred",
        email="hr@maxdax.in",
        phone="9605896096",
        tags=["Admin", "Operations", "Kochi", "Calicut"],
        work_details=(
            "Support daily operations and admin: documentation, filing, coordination across teams, reports, "
            "calls and correspondence. MS Office proficiency required."
        ),
        requirements=[
            "Bachelor's in Business Administration, Commerce or related",
            "MS Office (Excel, Word, Outlook)",
            "Strong organization and communication",
            "Experienced and female candidates preferred (as per employer notice)",
        ],
        how="Email hr@maxdax.in or call +91 96058 96096",
    ),
    direct(
        "maxdax-sales-executive-b2c-malappuram-kochi-calicut",
        "Maxdax",
        "Sales Executive (B2C)",
        "Malappuram, Kochi & Calicut, Kerala",
        experience="experienced",
        experience_range="2–3 years minimum · Degree",
        email="hr@maxdax.in",
        phone="9605896096",
        tags=["Sales", "B2C", "Kochi", "Calicut", "Malappuram"],
        work_details=(
            "Two vacancies for B2C Sales Executives. Preferred background in solar, home automation, CCTV or B2C sales."
        ),
        requirements=[
            "Degree qualification",
            "2–3 years sales experience minimum",
            "Solar / home automation / CCTV / B2C experience preferred",
            "Good communication and sales skills",
        ],
        how="Email hr@maxdax.in or call +91 96058 96096",
    ),
    direct(
        "janani-mithra-cooperative-pharmacist-assistant-multiple-districts",
        "Janani Mithra Co-Operative",
        "Pharmacist / Pharmacy Assistant",
        "Ernakulam, Palakkad, Thrissur, Malappuram, Alappuzha",
        experience="both",
        experience_range="As per role · Healthcare retail",
        email="talent@jananimithra.com",
        phone="8086056090 / 7592996090",
        tags=["Healthcare", "Pharmacy", "Kerala"],
        roles=["Pharmacist", "Pharmacy Assistant"],
        work_details=(
            "Expanding team across Ernakulam, Palakkad, Thrissur, Malappuram and Alappuzha. "
            "Supportive culture and growth opportunities."
        ),
        requirements=["Pharmacy qualification as required for Pharmacist or Assistant role"],
        how="Call 8086 05 60 90 or 75929 96090 · Email talent@jananimithra.com",
    ),
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} direct jobs to jobs-data.js")


if __name__ == "__main__":
    main()
