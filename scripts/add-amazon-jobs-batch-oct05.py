#!/usr/bin/env python3
"""Add Amazon India openings from amazon.jobs — 5 Oct 2026."""

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
BASE = "https://www.amazon.jobs/en/jobs"


def amazon(
    job_id: str,
    slug: str,
    title: str,
    location: str,
    *,
    experience: str,
    experience_range: str,
    work_mode: str,
    tags: list[str],
    work_details: str,
    requirements: list[str],
    responsibilities: list[str],
    description: str,
    employment_type: str = "Full-time",
    qualification: str = "",
) -> dict:
    link = f"{BASE}/{job_id}/{slug}"
    return {
        "id": f"amazon-{slug}-{job_id}-oct26",
        "company": "Amazon",
        "logo": "",
        "companyBlurb": f"Amazon · {title} · {location}",
        "location": location,
        "roles": [title],
        "experience": experience,
        "experienceRange": experience_range,
        "employmentType": employment_type,
        "applyLink": link,
        "applyDeadline": "Rolling",
        "postedDate": TODAY,
        "source": "WhatsApp",
        "verified": True,
        "verificationNote": NOTE,
        "tags": ["Amazon", "India"] + tags,
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": "https://www.amazon.jobs",
        "address": location,
        "industry": "E-commerce / Technology",
        "companyDetails": "Amazon India opening listed on the official Amazon Jobs portal.",
        "workDetails": work_details,
        "workStatus": employment_type,
        "workMode": work_mode,
        "experienceYears": experience_range,
        "qualification": qualification,
        "skills": [],
        "requirements": requirements,
        "responsibilities": responsibilities,
        "benefits": [
            "Apply only on Amazon Jobs — never pay anyone for this application",
            "Official amazon.jobs listing",
        ],
        "howToApply": f"Apply on Amazon Jobs: {link}",
        "hiringNotes": f"Amazon job ID {job_id} · Added Oct 2026 · Verify role and location on the official posting.",
        "description": description,
        "startingDate": "",
    }


JOBS = [
    amazon(
        "10435541",
        "it-support-associate",
        "IT Support Associate",
        "Bengaluru, Karnataka, India",
        experience="experienced",
        experience_range="Bachelor's · 1+ year technical / service desk support",
        work_mode="On-site · BLR18 corporate office · rotational shifts",
        tags=["IT Support", "Service Desk", "Bengaluru"],
        work_details=(
            "OTS Global IT Service Desk — omni-channel 24×7 support for worldwide Operations "
            "associates and Amazon Lockers. Troubleshoot desktops, laptops, printers, scanners; "
            "Windows and Linux; meet SLA, CSAT and incident goals."
        ),
        requirements=[
            "Bachelor's degree",
            "1+ year in technical support, service desk, Windows support or network support",
            "Good communication skills",
            "Flexible for rotational shifts",
        ],
        responsibilities=[
            "Support internal customers across APAC / EMEA / AMER",
            "Follow SOPs and OTS Service Desk goals",
            "Troubleshoot end-user devices and operating systems",
            "Manage incidents per SLA and CSAT targets",
        ],
        description="IT Support Associate at Amazon Service Desk — Bengaluru, rotational shifts.",
        qualification="Bachelor's degree",
    ),
    amazon(
        "10438685",
        "it-support-associate",
        "IT Support Associate",
        "Pan India (Bengaluru, Pune, Hyderabad, Chennai, Delhi, Gurugram, Thane)",
        experience="experienced",
        experience_range="1+ year Windows / Mac / Linux corporate support",
        work_mode="On-site · Fulfillment Center IT (multiple cities)",
        tags=["IT Support", "Fulfillment", "Pan India"],
        work_details=(
            "First-level IT support for Fulfillment Center operations: network engineering, "
            "systems admin, zebra printers, thin clients, PCs, scanners, handheld terminals."
        ),
        requirements=[
            "1+ years corporate Windows, Mac or Linux OS support",
            "Experience troubleshooting integrated computer systems",
            "Experience with zebra thermal printers, thin clients, PCs, scanners, handheld terminals",
        ],
        responsibilities=[
            "Resolve technical problems for FC operations",
            "Support Technical Support Technicians and represent IT to internal customers",
            "Project management, mentorship, telecom/PBX, root cause analysis as needed",
        ],
        description="Amazon FC IT Support Associate — multiple India locations.",
    ),
    amazon(
        "10516562",
        "it-support-associate",
        "IT Support Associate",
        "Bengaluru, Karnataka, India",
        experience="both",
        experience_range="CS background (10+2+3) · 3 months – 1 year helpdesk / desktop support",
        work_mode="On-site · BLR18 · 5-day week (rotating days off)",
        tags=["IT Support", "Freshers", "Bengaluru"],
        work_details=(
            "IT Service Desk role supporting worldwide Operations via omni-channel contact center. "
            "5-day work week with two scheduled days off varying by shift."
        ),
        requirements=[
            "English communication — written and verbal",
            "Computer science education background (10+2+3 years full-time)",
            "3 months to 1 year helpdesk, service desk, network or desktop support",
        ],
        responsibilities=[
            "Device troubleshooting (desktops, laptops, printers, scanners)",
            "Windows and Linux support per SOP",
            "Meet response/resolution SLA and CSAT targets",
        ],
        description="IT Support Associate — Bengaluru · early-career helpdesk path.",
        qualification="10+2+3 CS education",
    ),
    amazon(
        "10424921",
        "it-support-associate",
        "IT Support Associate",
        "Bengaluru, Karnataka, India",
        experience="experienced",
        experience_range="Bachelor's · 1+ year service desk / technical support",
        work_mode="On-site · BLR18 · rotational shifts",
        tags=["IT Support", "Bengaluru"],
        work_details="Amazon OTS IT Service Desk — 24×7 operations support with rotational shifts.",
        requirements=[
            "Bachelor's degree",
            "1+ year service desk or technical support experience",
            "Good communication skills",
        ],
        responsibilities=[
            "End-user device and OS troubleshooting",
            "Adhere to SOPs and service desk metrics",
            "Collaborate across global operations IT teams",
        ],
        description="IT Support Associate — Bengaluru Service Desk.",
        qualification="Bachelor's degree",
    ),
    amazon(
        "10521256",
        "process-associate-amxl-fc",
        "Process Associate, AMXL FC",
        "Bangalore, Karnataka, India",
        experience="both",
        experience_range="High school or equivalent · 1+ year MS Office",
        work_mode="On-site · AMXL Fulfillment Center",
        tags=["Operations", "Fulfillment", "Bangalore"],
        work_details=(
            "Manage daily floor operations (inbound, outbound, re-boxing), allocate tasks, "
            "quality checks, SOP compliance, KPI tracking, coordinate with Area Managers."
        ),
        requirements=[
            "High school diploma or equivalent",
            "1+ years Microsoft Office (Word, Excel, Outlook)",
        ],
        responsibilities=[
            "Monitor associate productivity and floor operations",
            "Ensure quality and minimize defects",
            "Track daily performance metrics and resolve on-floor issues",
        ],
        description="Process Associate at Amazon AMXL FC — Bangalore.",
    ),
    amazon(
        "10504870",
        "digital-content-associate-audible",
        "Digital Content Associate, Audible",
        "Chennai, Tamil Nadu, India",
        experience="fresher",
        experience_range="Bachelor's · Fresher or up to 1 year",
        work_mode="On-site · Chennai",
        tags=["Content", "Audible", "Chennai", "Freshers"],
        work_details=(
            "Operational work on audiobook content: listen via headset, identify and fix audio issues "
            "using tools per SOP, meet SLA and productivity/quality targets."
        ),
        requirements=[
            "Bachelor's degree",
            "Microsoft Office familiarity",
        ],
        responsibilities=[
            "Analyze and fix audio content issues",
            "Escalate variances per process",
            "Communicate with internal/external stakeholders",
            "Meet productivity and quality standards",
        ],
        description="Digital Content Associate — Audible Chennai.",
        qualification="Bachelor's degree",
    ),
    amazon(
        "10487713",
        "digital-content-associate-firetv",
        "Digital Content Associate, FireTV",
        "Chennai, Tamil Nadu, India",
        experience="fresher",
        experience_range="Any graduate",
        work_mode="On-site · Chennai",
        tags=["Content", "Fire TV", "Chennai", "Freshers"],
        work_details=(
            "Manage and validate Fire TV catalog content: verify errors, remove duplicates, "
            "classify per SOP, metadata entry and reporting."
        ),
        requirements=[
            "Graduate in any stream",
            "MS Office working knowledge",
            "Strong written and verbal English",
            "Attention to detail; open to repetitive workflows",
        ],
        responsibilities=[
            "Maintain digital content catalog accuracy",
            "Data entry and daily activity tracking",
            "Collaborate in calibrations; flag process issues to supervisors",
        ],
        description="Fire TV Digital Content Associate — Chennai.",
        qualification="Any graduate",
    ),
    amazon(
        "10504872",
        "digital-content-associate-audible",
        "Digital Content Associate, Audible",
        "Chennai, Tamil Nadu, India",
        experience="fresher",
        experience_range="Bachelor's · Fresher or up to 1 year",
        work_mode="On-site · Chennai",
        tags=["Content", "Audible", "Chennai", "Freshers"],
        work_details=(
            "Listen to audiobook content, identify issues, fix using approved tools, adhere to SOP, "
            "SLA and quality targets. Headset use for extended periods."
        ),
        requirements=["Bachelor's degree", "Microsoft Office experience"],
        responsibilities=[
            "Audio content QA and remediation",
            "Stakeholder communication and escalations",
            "Judgment-based decisions per procedures",
        ],
        description="Audible Digital Content Associate — Chennai (job 10504872).",
        qualification="Bachelor's degree",
    ),
    amazon(
        "10511698",
        "packaging-associate-in-packaging",
        "Packaging Associate, IN Packaging",
        "Bengaluru, Karnataka, India",
        experience="fresher",
        experience_range="Bachelor's · 0–1 year",
        work_mode="On-site · Bengaluru (relocation required)",
        tags=["Operations", "Packaging", "Bengaluru", "Freshers"],
        work_details=(
            "Imaging team: visual testing for packaging workflows, metric goals, root-cause analysis "
            "for small process improvements."
        ),
        requirements=[
            "Bachelor's degree or higher",
            "Analytical and communication skills",
            "Problem solving and results delivery",
            "Ability to relocate to Bangalore",
        ],
        responsibilities=[
            "Visual testing against imaging attributes",
            "Achieve team metric goals",
            "Identify process improvement opportunities",
        ],
        description="Packaging Associate — IN Packaging, Bengaluru.",
        qualification="Bachelor's degree",
    ),
    amazon(
        "10561101",
        "associate-site-merchandiser-in-apparel",
        "Associate Site Merchandiser, IN Apparel",
        "Bengaluru, Karnataka, India",
        experience="both",
        experience_range="Bachelor's or equivalent",
        work_mode="On-site · Bengaluru",
        tags=["Marketing", "Merchandising", "E-commerce", "Bengaluru"],
        work_details=(
            "Site merchandising for Amazon India Apparel: product information quality, email and "
            "page content, traffic analysis, HTML/XML/Excel, cross-functional launches."
        ),
        requirements=[
            "Bachelor's degree or equivalent",
            "Detail-oriented; strong English written and verbal communication",
            "HTML, XML, Excel; ability to learn in-house tools",
        ],
        responsibilities=[
            "Plan and execute site and email merchandising",
            "Compile web metrics and report to management",
            "Coordinate with tech, marketing, design on features and launches",
        ],
        description="Associate Site Merchandiser — IN Apparel, Bengaluru.",
        qualification="Bachelor's degree",
    ),
    amazon(
        "10429141",
        "associate-marketing-manager-wireless-marketing",
        "Associate Marketing Manager, Wireless Marketing",
        "Bengaluru, Karnataka, India",
        experience="experienced",
        experience_range="Bachelor's · 1+ year account / program / buying experience",
        work_mode="On-site · Bengaluru",
        tags=["Marketing", "Wireless", "Analytics", "Bengaluru"],
        work_details=(
            "Own reach planning and performance marketing for Amazon India Wireless category: "
            "traffic forecasting, paid social, affiliates, funnel audits, sale-event models."
        ),
        requirements=[
            "Bachelor's degree",
            "1+ years account, project/program management or buying experience",
            "Google Analytics, SQL or HTML familiarity",
        ],
        responsibilities=[
            "Build and track traffic forecasts vs actuals",
            "Optimize performance marketing channels",
            "Partner with category, brand and finance on GTM and co-funded campaigns",
        ],
        description="Associate Marketing Manager — Wireless, Bengaluru.",
        qualification="Bachelor's degree",
    ),
    amazon(
        "10554760",
        "its-support-associate-it-services",
        "ITS Support Associate, IT Services",
        "Bengaluru, Karnataka, India",
        experience="experienced",
        experience_range="Bachelor's · 1+ year corporate IT support",
        work_mode="On-site · Bengaluru · travel between sites",
        tags=["IT Support", "AV/VC", "Bengaluru"],
        work_details=(
            "In-person AV/VC support for Amazon offices: troubleshoot conference/training rooms, "
            "work with integrators, inventory/RMA, preventive maintenance, occasional after-hours."
        ),
        requirements=[
            "Bachelor's degree or equivalent",
            "1+ years Windows/Mac/Linux corporate support",
            "Integrated systems troubleshooting",
            "Zebra printers, thin clients, PCs, scanners, handheld terminals experience",
        ],
        responsibilities=[
            "On-site AV troubleshooting and customer communication",
            "Execute infrastructure-related tasks and MCMs",
            "Document tickets and update SOPs from field learnings",
        ],
        description="ITS Support Associate — AV/VC, Bengaluru.",
        qualification="Bachelor's degree",
    ),
    amazon(
        "10554168",
        "digital-associate-ring-data-engineering-services",
        "Digital Associate, Ring Data Engineering Services",
        "Chennai, Tamil Nadu, India",
        experience="fresher",
        experience_range="Bachelor's or equivalent",
        work_mode="On-site · Chennai · flexible shifts possible",
        tags=["ML Data", "Content", "Chennai", "Freshers"],
        work_details=(
            "SA/VLM associate: written content for video/image and/or labeling for ML data pipelines. "
            "Quality audits, productivity targets, grammar and annotation accuracy."
        ),
        requirements=[
            "Bachelor's degree or equivalent",
            "Strong English grammar and written communication",
            "Windows desktop, Word, Excel familiarity",
            "Comfort with repetitive tasks and deadlines",
        ],
        responsibilities=[
            "Annotation and content tasks per guidelines",
            "Quality verification and status reporting",
            "Feedback on SOPs and tools",
        ],
        description="Digital Associate — Ring Data Engineering, Chennai.",
        qualification="Bachelor's degree",
    ),
    amazon(
        "10558074",
        "sr-associate-whs-central-programs-team-india",
        "Sr. Associate, WHS Central Programs Team, India",
        "Bengaluru, Karnataka, India",
        experience="both",
        experience_range="Bachelor's in Safety, Environment or Engineering",
        work_mode="On-site · Bengaluru",
        tags=["WHS", "Safety", "Analytics", "Bengaluru"],
        work_details=(
            "Workplace Health & Safety Central Programs: analyze injury/illness/near-miss data, "
            "stakeholder communication, SLA-driven deliverables for global safety programs."
        ),
        requirements=[
            "Bachelor's degree in Safety, Environment-related field or Engineering",
            "Microsoft Office proficiency",
            "Strong written and verbal communication",
        ],
        responsibilities=[
            "End-to-end ownership of assigned deliverables",
            "Escalate data variances and drive resolutions",
            "Develop metrics to support WHS program outcomes",
        ],
        description="Sr. Associate — WHS Central Programs, Bengaluru.",
        qualification="Bachelor's (Safety / Environment / Engineering)",
    ),
    amazon(
        "10561086",
        "business-development-associate-amazon-marketing-and-sales",
        "Business Development Associate, Amazon Marketing and Sales",
        "Bangalore, Karnataka, India",
        experience="both",
        experience_range="Bachelor's · Hindi required",
        work_mode="On-site · Bangalore · Amazon Pay / merchant lending support",
        tags=["Business Development", "Customer Support", "Bangalore"],
        work_details=(
            "Primary contact for retailers/merchants on loan journey — inbound chat, phone, email; "
            "guide applications and resolve queries (Axio / Amazon Pay context)."
        ),
        requirements=[
            "Bachelor's degree",
            "Excel and Microsoft Office",
            "Written and oral communication across levels",
            "Hindi grammar and spelling (written and verbal)",
        ],
        responsibilities=[
            "Handle inbound merchant interactions professionally",
            "Guide loan application and approval process",
            "Maintain accurate interaction records and escalate complex cases",
        ],
        description="Business Development Associate — merchant lending support, Bangalore.",
        qualification="Bachelor's degree",
    ),
    amazon(
        "10552161",
        "associate-ml-data-operations-go-ai-operations",
        "Associate, ML Data Operations, GO-AI Operations",
        "Chennai, Tamil Nadu, India (Virtual / WFH)",
        experience="fresher",
        experience_range="Bachelor's",
        employment_type="Contract",
        work_mode="Remote · Chennai Virtual · rotational shifts · 9-hour shift",
        tags=["ML Data", "Annotation", "WFH", "Chennai", "Contract"],
        work_details=(
            "Human-in-the-loop data annotation (image, video, text) for Amazon Robotics GO-AI. "
            "Contract role with possible FTE transition; dedicated home workspace and ≥20 Mbps internet."
        ),
        requirements=[
            "Bachelor's degree",
            "Collaborative remote teamwork",
            "Willingness to learn annotation tools and flexible shifts",
            "Clear communication",
        ],
        responsibilities=[
            "Precise annotations per quality and productivity goals",
            "Identify errors and propose process improvements",
            "Switch programs per business needs",
        ],
        description="ML Data Operations Associate — GO-AI, Chennai virtual/WFH.",
        qualification="Bachelor's degree",
    ),
    amazon(
        "3134242",
        "associate-ml-data-operations-go-ai-operations",
        "Associate, ML Data Operations, GO-AI Operations",
        "Pan India virtual (Hyderabad, Bengaluru, Chennai, Mumbai, AP)",
        experience="fresher",
        experience_range="Bachelor's",
        employment_type="Contract",
        work_mode="Remote · Virtual · rotational 24×7 shifts · 6-month contract",
        tags=["ML Data", "Video Audit", "WFH", "Pan India", "Contract"],
        work_details=(
            "Video/image audit of fulfillment stow actions for inventory accuracy. 9-hour shifts, "
            "high attention on screen; 6-month contract; occasional office days if required."
        ),
        requirements=[
            "Bachelor's degree",
            "Willingness for non-tech contract role",
            "Rotational shifts including nights; strong team player",
            "Dedicated WFH workspace",
        ],
        responsibilities=[
            "Audit videos/images with accuracy and speed targets",
            "Maintain 6.8–7 hours productive audit time daily",
            "Use judgment on blurry or ambiguous footage",
        ],
        description="ML Data Operations — video auditing, India virtual (job 3134242).",
        qualification="Bachelor's degree",
    ),
    amazon(
        "10565165",
        "associate-ii-ml-data-operations-go-ai-operations",
        "Associate II, ML Data Operations, GO-AI Operations",
        "Chennai, Tamil Nadu, India (Virtual)",
        experience="experienced",
        experience_range="Bachelor's · 0.6–5 years data transcription / annotation",
        employment_type="Contract",
        work_mode="Remote / Chennai virtual · rotational shifts",
        tags=["ML Data", "LLM", "Annotation", "Chennai", "Contract"],
        work_details=(
            "Senior annotation associate: LLM training data, multi-modal labeling, peer training, "
            "SOP improvements. Contract with FTE path based on performance."
        ),
        requirements=[
            "Bachelor's degree",
            "0.6–5 years data transcription and annotation",
            "English C1+ fluency and business writing",
            "Natural language labeling experience preferred",
        ],
        responsibilities=[
            "High-quality annotations across text, image, video, audio",
            "Train associates and provide peer feedback",
            "Improve audit methodologies and test frameworks",
        ],
        description="Associate II — ML Data Operations GO-AI, Chennai.",
        qualification="Bachelor's degree",
    ),
    amazon(
        "10426346",
        "it-support-associate-ii-opstech-it-service-desk",
        "IT Support Associate II, OpsTech IT - Service Desk",
        "Bangalore, Karnataka, India (Virtual)",
        experience="both",
        experience_range="0–1 year IT support · Japanese N1+ required",
        work_mode="Remote · Bangalore Virtual · 24×7 service desk",
        tags=["IT Support", "Japanese", "Service Desk", "Bangalore"],
        work_details=(
            "OTS Global Service Desk remote support via phone/chat and ServiceNow. "
            "Requires fluent Japanese (JLPT N1+) for Japan-facing support."
        ),
        requirements=[
            "Japanese business fluency (JLPT N1+)",
            "English written and verbal communication",
            "0–1 years IT support or desktop troubleshooting",
        ],
        responsibilities=[
            "Resolve incidents per policy; escalate when needed",
            "Remote troubleshooting and ServiceNow ticket management",
            "Analytics and process documentation",
        ],
        description="IT Support Associate II — Japanese service desk, Bangalore virtual.",
    ),
    amazon(
        "10403907",
        "quality-associate-lmaq-last-mile-analytics-and-quality-lmaq",
        "Quality Associate, LMAQ (Last Mile Analytics and Quality)",
        "Bengaluru, Karnataka, India",
        experience="both",
        experience_range="As per Amazon posting",
        work_mode="Work from office · Bengaluru · rotational 24×7 shifts",
        tags=["Quality", "Last Mile", "Operations", "Bengaluru"],
        work_details=(
            "First-line support for address resolution, geocode correction, map edits, driver support, "
            "static route management and transportation quality audits per SOP."
        ),
        requirements=[
            "Quick learner; manage overlapping tasks",
            "Follow SOPs for manual audits and outlier resolution",
            "Meet SLA, productivity, quality and utilization benchmarks",
            "Flexible for rotational shifts and multiple programs",
        ],
        responsibilities=[
            "Investigate images/videos and customer calls per SOP",
            "Escalate issues to relevant owners",
            "Update trackers; identify patterns for process improvement",
        ],
        description="Quality Associate — Last Mile Analytics & Quality, Bengaluru.",
    ),
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} Amazon jobs to jobs-data.js (skipped duplicates)")


if __name__ == "__main__":
    main()
