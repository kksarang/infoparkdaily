#!/usr/bin/env python3
"""Add EXL Kochi openings posted 13–29 Oct 2026 (Oracle Recruiting site CX_2), pinned at the top.

Source: https://fa-ewjt-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_2/jobs
(Kochi location filter). Postings already on the site are skipped. Only details
printed on each EXL posting are used; EXL's generic titles get the function
named in the posting text in brackets.
"""

from __future__ import annotations

import importlib.util
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "import_park_jobs", ROOT / "scripts" / "import-park-jobs-latest.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

NOTE = mod.NOTE
POSTED = "2026-10-29"
SITE = "https://fa-ewjt-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_2"
SEARCH = f"{SITE}/jobs?lastSelectedFacet=LOCATIONS&locationId=300000000467203&mode=job-location&selectedLocationsFacet=100001217567073"
HYBRID = "Hybrid · Kochi"
WFO = "Work from office · Kochi"

AP_REQ = [
    "Bachelor's degree",
    "Minimum 0-2 years of AP experience",
    "Excellent communication skills, both verbal and written",
    "Excellent working knowledge of MS Office – MS Excel, Word, Outlook",
    "Good time management and organizational skills",
    "Understands the need for confidentiality; attention to detail and accuracy",
]
AP_RESP = [
    "Process non-PO / PO invoices",
    "Enter time-sensitive utility invoices and research past due amounts",
    "Ensure SLA targets are achieved",
    "Ensure all invoices are processed by month-end",
]
FRAUD_RESP = [
    "Manage day-to-day fraud and dispute operations and oversee fraud monitoring",
    "Lead investigations of high-risk fraud cases and disputes and ensure timely resolution",
    "Identify fraud trends, risks, and control gaps, and implement preventive measures",
    "Drive team performance, productivity, quality, and SLA adherence",
    "Collaborate with stakeholders to enhance fraud controls",
    "Ensure compliance with internal policies, regulatory requirements, and audit standards",
]

SPECS = [
    dict(id="22130", posted="29 Oct", title="Accounts Payable I2P", mode=WFO, exp="both", range_="0–2 years",
         summary="Accounts Payable (Invoice to Pay) role at EXL Kochi: processing PO and non-PO invoices, utility invoices and month-end invoice processing.",
         tags=["Accounts Payable", "Finance", "Freshers"], req=AP_REQ, resp=AP_RESP, qual="Bachelor's degree"),
    dict(id="21761", posted="27 Oct", title="Accounts Payable I2P", mode=HYBRID, exp="both", range_="0–2 years",
         summary="Accounts Payable (Invoice to Pay) role at EXL Kochi (hybrid): processing PO and non-PO invoices, utility invoices and month-end invoice processing.",
         tags=["Accounts Payable", "Finance", "Freshers"], req=AP_REQ, resp=AP_RESP, qual="Bachelor's degree"),
    dict(id="22145", posted="29 Oct", title="Manager (Procure to Pay)", mode=WFO, exp="experienced", range_="5+ years",
         summary="Manager for EXL's P2P (Procure to Pay) function in Kochi: SLA/KPI delivery, process improvement, client and leadership communication, and team building.",
         tags=["Procure to Pay", "Finance", "Leadership"], qual="Bachelor's degree",
         req=["Bachelor's degree with 5+ years of experience", "End-to-end knowledge of the P2P function",
              "Proven data analyst able to bring out metrics from data", "Experience leading teams in a matrix organization",
              "Transformation experience is an added advantage"],
         resp=["Develop action plans so improvement plans are achieved", "Ensure SLAs/KPIs are exceeded",
               "Maintain day-to-day operations and communication with client and leadership",
               "Run stakeholder meetings on process delivery and issue resolution",
               "Ensure internal control compliance and external audit requirements are met",
               "Develop competencies in the team and hire for open positions"]),
    dict(id="21770", posted="28 Oct", title="Executive (Order to Cash – Order Management)", mode=HYBRID, exp="both", range_="",
         summary="Executive in EXL F&A Operations, Order to Cash: entering and validating customer orders in ERP systems and coordinating fulfilment.",
         tags=["Order to Cash", "Finance", "ERP"], skills=["Order management", "ERP", "JDE", "SAP", "MS Office"],
         req=["Strong accounting knowledge with O2C experience in order management and billing",
              "Basic understanding of customer master data, pricing conditions and material/product master",
              "Basic knowledge of delivery processing, shipping/logistics coordination and stock availability checks",
              "Computer literate: Excel, Word, PPT", "Knowledge of JDE & SAP ERP is desired",
              "Excellent verbal and written communication skills in English"],
         resp=["Receive and enter customer orders into ERP systems accurately",
               "Validate order details (pricing, quantities, customer data, delivery terms)",
               "Perform basic credit and order checks as per guidelines",
               "Coordinate with sales, warehouse, logistics and billing for order fulfilment",
               "Track order status and follow up on delays or discrepancies",
               "Handle order modifications, cancellations, and returns under supervision",
               "Support invoicing by maintaining clean and accurate order data"]),
    dict(id="21703", posted="28 Oct", title="Executive (Provider Data Management – US Healthcare)", mode=HYBRID, exp="experienced", range_="1–3 years",
         summary="Executive maintaining accurate provider information across US healthcare systems: demographic updates, contract data, provider network validations and data quality.",
         tags=["US Healthcare", "Data Management"], qual="Graduate (non-technical) in any discipline",
         req=["Graduate in any discipline with 1-3 years of experience in US Healthcare",
              "Prior experience on CertifyOS is preferred",
              "Prior experience in Provider Data Management operations is preferred"],
         resp=["Process provider additions, terminations, demographic updates, affiliations, specialties, tax IDs and contract changes",
               "Maintain accurate provider records across healthcare systems and databases",
               "Validate provider data and perform quality checks",
               "Resolve provider data discrepancies through root cause analysis within SLA timelines",
               "Conduct audits and quality reviews; ensure HIPAA and client compliance"]),
    dict(id="17346", posted="27 Oct", title="Assistant Manager - General Ledger", mode=HYBRID, exp="both", range_="",
         summary="Assistant Manager – General Ledger at EXL Kochi: journal entries and uploads, reconciliations, and Fixed Asset Register maintenance.",
         tags=["General Ledger", "Finance", "B.Com"], qual="B.Com", req=["B.Com"],
         resp=["Journal entry preparations and uploads", "Prepare reconciliations and follow up and close open items",
               "Run reports and maintain the Fixed Asset Register",
               "Asset settlement, split, asset master and serial number updates"]),
    dict(id="21880", posted="26 Oct", title="Manager - Quality Excellence", mode=WFO, exp="experienced", range_="5–7 years",
         summary="Manager – Quality Excellence to set up and lead the quality function for a US Healthcare client in Kochi, from transition through steady state.",
         tags=["Quality", "US Healthcare", "Lean Six Sigma"],
         skills=["Quality Management", "US Healthcare – Payer", "Claims Adjudication", "Medicare", "Lean Six Sigma", "RCA"],
         req=["5–7 years in Quality / Process Excellence, preferably US Healthcare payer processes (claims, Medicare, appeals, prior auth or UM)",
              "Lean Six Sigma Green or Black Belt certification",
              "Strong grasp of sampling, calibration, RCA and quality metrics",
              "Experience leading QE teams and working with Ops and client stakeholders",
              "Strong Excel, dashboard and reporting skills; Power BI is a plus",
              "Facets or similar claims platform exposure is an advantage"],
         resp=["Manage the QE team (AMs and QCAs): certification, monitoring, feedback and productivity",
               "Drive quality governance through reporting, RCA, action plans and client reviews",
               "Partner with Operations to improve accuracy and meet client SLAs and P4P metrics",
               "Support transition: validate SOPs, build quality checkpoints, run UAT, dry runs and go-live readiness",
               "Lead process improvement projects using Lean Six Sigma tools",
               "Support internal and client audits and RFP/RFI responses"]),
    dict(id="21529", posted="24 Oct", title="Assistant Manager (Accounts Receivable – Collections)", mode=HYBRID, exp="experienced", range_="4–6 years",
         summary="Accounts Receivable – Collections role managing collection of outstanding invoices, timely customer payments and accurate financial records.",
         tags=["Accounts Receivable", "Collections", "Finance"], qual="Graduate – Commerce",
         req=["Graduate – Commerce", "4-6 years in Accounts Receivable (Collections)", "Proficient in billing / revenue generation and Excel"],
         resp=["Monitor and track outstanding invoices and send payment reminders by email or phone",
               "Generate and distribute account statements to customers",
               "Follow up on overdue accounts and resolve billing disputes",
               "Update customer accounts for payments, adjustments, or write-offs",
               "Prepare regular reports on collection status and aging accounts"]),
    dict(id="21621", posted="23 Oct", title="Associate (Subrogation – Arbitration Contentions)", mode=WFO, exp="experienced", range_="12–18 months",
         summary="Associate writing contentions in defense of insured parties and filing them in the Arbitration Forum with proofs and scene diagrams.",
         tags=["Insurance", "Subrogation", "Legal writing"],
         req=["12 - 18 months in legal document reviews, contract writing or reviews"],
         resp=["Write strong contentions to be presented in the Arbitration Forum",
               "Analyze evidence such as expert reports, statements and photographs",
               "Evaluate facts of loss and review documents for subrogation",
               "Upload supporting documentation before moving cases to the Arbitration queue",
               "Create scene diagrams and submit cases online via the Arbitration Forums website"]),
    dict(id="21928", posted="23 Oct", title="Senior Executive - WFM Scheduler", mode=WFO, exp="experienced", range_="2+ years (WFM)",
         summary="Workforce management scheduler handling forecasting, scheduling, staffing and reporting, using Verint WFO and Excel.",
         tags=["Workforce Management", "Scheduling"], skills=["Verint WFO", "Advanced Excel", "Forecasting", "Scheduling"],
         req=["Graduate or undergraduate", "Minimum of 2 years in WFM",
              "Strong Excel, analytical, problem-solving, multitasking and communication skills",
              "Working knowledge of WFM tools such as Verint WFO"],
         resp=["Manage workforce forecasting, scheduling, and staffing requirements",
               "Create and maintain agent schedules and IDPs",
               "Perform scenario planning and staffing analysis",
               "Maintain employee information in Verint WFO and other WFM platforms",
               "Prepare WFM reports in Excel and support the WFM Manager"]),
    dict(id="21658", posted="19 Oct", title="Manager (Fraud & Disputes Operations)", mode=WFO, exp="experienced", range_="9–12 years",
         summary="Manager leading fraud and disputes operations: fraud detection, dispute investigation, risk mitigation, team performance and compliance.",
         tags=["Fraud", "Disputes", "Leadership"], req=["Bachelor's degree in a relevant field with 9-12 years of relevant experience"], resp=FRAUD_RESP),
    dict(id="21660", posted="19 Oct", title="Lead Assistant Manager (Fraud & Disputes Operations)", mode=WFO, exp="experienced", range_="6–9 years",
         summary="Lead Assistant Manager for fraud and disputes operations: fraud detection, dispute investigation, risk mitigation, team performance and compliance.",
         tags=["Fraud", "Disputes", "Leadership"], req=["Bachelor's degree in a relevant field with 6-9 years of relevant experience"], resp=FRAUD_RESP),
    dict(id="21661", posted="17 Oct", title="Senior Executive (Healthcare Claims)", mode=WFO, exp="both", range_="",
         summary="Senior Executive opening in EXL's Healthcare Claims category, Kochi. The posting gives no further description.",
         tags=["US Healthcare", "Claims"], req=[], resp=[]),
    dict(id="21314", posted="16 Oct", title="Analyst (Deduction Analyst – Accounts Receivable)", mode=HYBRID, exp="both", range_="0–2 years",
         summary="Deduction Analyst in Accounts Receivable: research, validate and resolve customer deductions, create credit memos, process chargebacks and support collections.",
         tags=["Accounts Receivable", "Order to Cash", "Finance"], qual="Graduate – Commerce",
         req=["Graduate – Commerce", "Experience: 0-2 years", "Accounts Receivable knowledge",
              "Knowledge of Cash Application and deductions management; research-oriented and analytical",
              "Good knowledge of MS Office; strong Excel"],
         resp=["Investigate and resolve customer deductions using supporting documentation",
               "Validate claims against customer agreements and company policies",
               "Process credit memos for approved deductions and chargebacks for invalid claims",
               "Coordinate with Customer Service and manage disputes through customer portals",
               "Prepare account-level reports to support collections and cash flow"]),
    dict(id="21382", posted="15 Oct", title="Assistant Vice President (F&A Operations – Insurance L&A)", mode=HYBRID, exp="experienced", range_="12+ years",
         summary="AVP leading the Insurance (L&A) finance function in Operations: end-to-end process ownership, month-end close, transformation and stakeholder management.",
         tags=["Finance", "Insurance", "Leadership"], qual="Bachelor's in Finance, Accounting or related; MBA or CA preferred",
         req=["Bachelor's degree in Finance, Accounting, or related field; MBA or CA preferred",
              "Minimum 12 years in finance operations, with at least 4 years in a leadership role",
              "Strong knowledge of insurance finance and L&A accounting principles",
              "Proven track record managing large-scale transformation projects",
              "Hands-on experience with ERP systems (e.g. PeopleSoft, Oracle) and advanced Excel / Power BI"],
         resp=["Own end-to-end finance processes for the Insurance L&A segment",
               "Lead month-end and quarter-end closing",
               "Drive transformation initiatives for efficiency, automation and data integrity",
               "Manage service delivery against SLAs and develop KPIs",
               "Act as primary liaison for internal and external stakeholders",
               "Mentor finance team members and present executive reports"]),
    dict(id="21357", posted="13 Oct", title="Manager (Record to Report – Insurance)", mode=HYBRID, exp="experienced", range_="5+ years",
         summary="Manager heading the Record-to-Report function for the Insurance L&A segment: month-end close, journal entries, reconciliations and financial reporting.",
         tags=["Record to Report", "Insurance", "Finance"], qual="Bachelor's in Finance, Accounting or related; CA/CPA preferred",
         req=["Bachelor's degree in Finance, Accounting or related field; CA/CPA preferred",
              "Minimum 5 years of RTR experience within an insurance organization",
              "Strong knowledge of month-end close, journal entries, and reconciliations",
              "Proficiency in ERP systems (SAP, Oracle) and advanced Excel",
              "Understanding of insurance accounting standards (IFRS 17, local GAAP)",
              "Ability to lead a team and manage stakeholders"],
         resp=["Oversee Record-to-Report processes for the insurance business",
               "Manage month-end closing and supervise journal entries",
               "Perform and review account reconciliations",
               "Consolidate and present month-end financial reports",
               "Drive process improvement and automation",
               "Coordinate with actuarial, underwriting, and claims teams"]),
    dict(id="20770", posted="13 Oct", title="Associate", mode=HYBRID, exp="both", range_="",
         summary="Associate opening in EXL's Product & Platforms category, Kochi. Bachelor's degree with good communication skills.",
         tags=["Graduates"], qual="Bachelor's degree",
         req=["Bachelor's degree", "Good communication skills", "Team player", "Interpersonal skills"], resp=[]),
]


def shift_pins(text: str, by: int) -> str:
    pins = [int(n) for n in re.findall(r"pinOrder: (\d+)", text)]
    dupes = [n for n, count in Counter(pins).items() if count != 1]
    if dupes:
        raise SystemExit(f"Duplicate pinOrder values: {dupes}")
    return re.sub(r"pinOrder: (\d+)", lambda m: f"pinOrder: {int(m.group(1)) + by}", text)


def build(s: dict) -> dict:
    link = f"{SITE}/job/{s['id']}"
    title = s["title"]
    return {
        "id": f"exl-{re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')[:60].rstrip('-')}-{s['id']}-kochi-oct2026",
        "company": "EXL",
        "logo": "",
        "companyBlurb": f"EXL · {title} · Kochi" + (f" · {s['range_']}" if s["range_"] else ""),
        "location": "Kochi, Kerala",
        "roles": [title],
        "experience": s["exp"],
        "experienceRange": s["range_"],
        "employmentType": "Full-time",
        "applyLink": link,
        "applyDeadline": "",
        "postedDate": POSTED,
        "source": "Company careers page",
        "verified": True,
        "verificationNote": NOTE,
        "tags": ["EXL", "Kochi"] + s["tags"],
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": SITE + "/jobs",
        "address": "Kochi, Kerala",
        "industry": "Analytics / Business Process Management",
        "companyDetails": "EXL (exl Service.com (India) Private Limited) opening listed on EXL's official careers site.",
        "workDetails": f"{s['summary']} EXL requisition {s['id']}.",
        "workStatus": "Full-time",
        "workMode": s["mode"],
        "experienceYears": s["range_"],
        "skills": s.get("skills", []),
        "requirements": s["req"],
        "responsibilities": s["resp"],
        "benefits": [],
        "howToApply": f"Apply on EXL careers: {link}",
        "hiringNotes": f"Checked on EXL careers (Kochi) on 29 Oct 2026 · Requisition {s['id']} · Portal posted {s['posted']} 2026. No closing date published.",
        "description": s["summary"],
        "startingDate": "",
        "qualification": s.get("qual", ""),
        "officialLinks": {"exlJob": link, "exlKochiSearch": SEARCH},
    }


def main() -> None:
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    fresh = [build(s) for s in SPECS if f"/CX_2/job/{s['id']}\"" not in text]
    if not fresh:
        print("No new EXL jobs")
        return
    for i, job in enumerate(fresh, start=1):
        job["pinOrder"] = i
    text = shift_pins(text, len(fresh))
    block = ",\n".join(mod.render_job(item) for item in fresh) + ",\n"
    path.write_text(text.replace("var JOBS = [\n", "var JOBS = [\n" + block, 1), encoding="utf-8")
    print(f"Added {len(fresh)} EXL Kochi jobs (pinned)")


if __name__ == "__main__":
    main()
