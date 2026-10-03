#!/usr/bin/env python3
"""Add EXL Kochi openings (Experience 0-3 yrs) from EXL's Oracle HCM portal — 4 Oct 2026.

Source: CX_2 site, Kochi location, "Experience (In Years)" = 0-3 (38 results).
Added only postings from Aug 2026 onward; the 24 older postings (2024 – May 2026) look stale.
Skipped — already listed: job 20096 (P2P invoice processing).
UST job 65502 (also requested) is already listed as ust-kochi-associate-data-analyst-oct26.
"""

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
PORTAL = "https://fa-ewjt-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_2"
ADDRESS = "9th Floor, Carnival Infopark 2, Infopark Kakkanad, Kochi, Kerala"
COMPANY = "EXL is a global data, analytics and digital operations company. Its Kochi delivery centre at Carnival Infopark 2, Infopark Kakkanad runs finance, insurance, healthcare and customer-operations processes for international clients."


def job(
    req: str,
    slug: str,
    title: str,
    posted: str,
    *,
    level: str,
    mode: str,
    exp: str,
    experience: str = "both",
    tags: list[str],
    work: str,
    skills: list[str],
    requirements: list[str],
    responsibilities: list[str],
    industry: str = "BPO / Finance Operations",
) -> dict:
    link = f"{PORTAL}/job/{req}"
    return {
        "id": f"exl-{slug}-{req}-kochi-oct2026",
        "company": "EXL",
        "logo": "",
        "companyBlurb": f"EXL · {title} · Infopark Kochi · {exp}",
        "location": "Infopark Kakkanad, Kochi",
        "roles": [f"{level} – {title}"],
        "experience": experience,
        "experienceRange": exp,
        "employmentType": "Full-time",
        "applyLink": link,
        "applyDeadline": "Rolling",
        "postedDate": posted,
        "source": "Company careers page",
        "verified": True,
        "verificationNote": NOTE,
        "tags": tags + ["Infopark"],
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": "https://www.exlservice.com",
        "address": ADDRESS,
        "industry": industry,
        "companyDetails": COMPANY,
        "workDetails": work,
        "workStatus": "Full-time",
        "workMode": f"{mode} · Infopark Kochi",
        "experienceYears": exp,
        "skills": skills,
        "requirements": requirements,
        "responsibilities": responsibilities,
        "benefits": [
            "Listed on EXL's official Oracle HCM careers portal",
            "Never pay anyone for this application",
        ],
        "howToApply": f"Apply directly on EXL's careers portal (Job ID {req}): {link}",
        "hiringNotes": f"Source: EXL Oracle HCM careers portal · Job ID {req} · Oct 2026. Re-check with EXL before applying.",
        "description": f"{title} at EXL · Infopark Kochi · {exp}.",
        "startingDate": "",
    }


SUBROGATION_RESP = [
    "Review legal documents, evidence, expert reports, statements and photographs for subrogation claims",
    "Evaluate facts of loss and ensure all required evidence is available",
    "Write strong contentions and arguments for the Arbitration forum",
    "Upload supporting documents and submit cases online via the Arbitration Forums website",
]

JOBS = [
    job(
        "20769", "subrogation-associate", "Subrogation (US Healthcare)", "2026-10-01",
        level="Associate", mode="Hybrid", exp="12–18 months", experience="experienced",
        tags=["BPO", "Insurance", "US Healthcare"],
        industry="BPO / Insurance Operations",
        work="Back-office subrogation role for a US client. Document handling and validation, legal document review and arbitration case preparation. US healthcare knowledge preferred.",
        skills=["Subrogation", "Legal Document Review", "US Healthcare", "Document Validation", "Communication"],
        requirements=[
            "Bachelor's degree with good communication skills",
            "12–18 months in legal document reviews, contract writing or reviews",
            "US healthcare knowledge",
            "Team player with strong document handling skills",
        ],
        responsibilities=SUBROGATION_RESP,
    ),
    job(
        "19415", "healthcare-customer-service-executive", "Back Office – Healthcare Customer Service", "2026-10-01",
        level="Executive", mode="Work from office", exp="0–3 years",
        tags=["BPO", "Customer Service", "US Healthcare"],
        industry="BPO / Healthcare Operations",
        work="Back-office customer service for US / global healthcare clients. Communicate with clients, patients and providers via phone, email or chat, and review and process healthcare records and claims. Rotational shifts, including nights.",
        skills=["Customer Service", "US Healthcare", "Claims Processing", "MS Office", "English Communication"],
        requirements=[
            "Bachelor's degree",
            "Strong English communication skills",
            "Open to rotational shifts, including night shifts",
            "Basic computer and MS Office knowledge",
        ],
        responsibilities=[
            "Communicate with clients, patients or US/global healthcare providers via phone, email or chat",
            "Review, verify and process basic healthcare records and claims",
        ],
    ),
    job(
        "20515", "subrogation-arbitration-associate", "Subrogation – Arbitration", "2026-09-23",
        level="Associate", mode="Work from office", exp="12–18 months", experience="experienced",
        tags=["BPO", "Insurance", "Legal"],
        industry="BPO / Insurance Operations",
        work="Prepare and submit US insurance subrogation cases to the Arbitration forum: analyse evidence, evaluate facts of loss, write contentions and create scene diagrams. Rotational shifts.",
        skills=["Subrogation", "Arbitration", "Legal Writing", "Document Review", "Analytical Skills", "Windows"],
        requirements=[
            "Bachelor's degree or equivalent",
            "12–18 months in legal document reviews, contract writing or reviews",
            "Strong written and spoken communication",
            "Strong computer skills, including Windows",
            "Willingness to work rotational shifts",
        ],
        responsibilities=SUBROGATION_RESP + ["Create scene diagrams to strengthen the case"],
    ),
    job(
        "20298", "customer-service-associate", "Back Office – Customer Service (Subrogation)", "2026-09-23",
        level="Associate", mode="Work from office", exp="0–3 years",
        tags=["BPO", "Customer Service", "Insurance"],
        industry="BPO / Insurance Operations",
        work="Back-office customer service role in EXL's subrogation process, Kochi. Bachelor's degree and good written and spoken communication required.",
        skills=["Customer Service", "Communication", "Windows", "MS Office"],
        requirements=[
            "Bachelor's degree or equivalent",
            "Good written and spoken communication",
            "Strong computer skills, including Windows",
        ],
        responsibilities=["Handle back-office customer service and subrogation case work as assigned"],
    ),
    job(
        "20404", "fraud-investigation-executive", "Fraud Investigation (Banking)", "2026-09-23",
        level="Executive", mode="Work from office", exp="0–3 years",
        tags=["BPO", "Banking", "Risk"],
        industry="BPO / Banking Operations",
        work="Fraud investigation and risk management for a banking client: disputes, transaction monitoring and fraud review.",
        skills=["Fraud Investigation", "Transaction Monitoring", "Disputes", "Banking", "Communication"],
        requirements=[
            "Graduate",
            "Basic understanding of banking, fraud, disputes and transaction monitoring",
            "Good system navigation and communication skills",
        ],
        responsibilities=[
            "Investigate potentially fraudulent transactions",
            "Handle disputes and monitor transactions",
        ],
    ),
    job(
        "19919", "insurance-underwriting-executive", "Insurance Underwriting Support", "2026-09-23",
        level="Executive", mode="Hybrid", exp="0–3 years",
        tags=["BPO", "Insurance", "Underwriting"],
        industry="BPO / Insurance Operations",
        work="Underwriting support: review submission documents, evaluate risk and help decide whether to offer an insurance proposal.",
        skills=["Underwriting", "Risk Evaluation", "Insurance", "Document Review", "Reporting"],
        requirements=["Any graduate (B.Tech / M.Tech not eligible)"],
        responsibilities=[
            "Review documents shared with insurance submissions",
            "Evaluate risks and support decisions on whether to provide a proposal",
        ],
    ),
    job(
        "19258", "banking-finance-senior-executive", "Finance & Accounting – Banking", "2026-09-21",
        level="Senior Executive", mode="Hybrid", exp="0–3 years",
        tags=["Finance", "Accounting", "Banking"],
        work="Banking function in the F&A back office for a hospitality client. Bank reconciliations in ReconNet and Planet, hotel transaction checks in BART, guest refunds, and the new site opening process.",
        skills=["Bank Reconciliation", "ReconNet", "Oracle Fusion", "Opera", "Barclaycard / Amex", "Accounting"],
        requirements=[
            "Graduate with accounting major or equivalent",
            "Working knowledge of banking systems such as ReconNet, WBD, Opera, Fusion",
        ],
        responsibilities=[
            "Act as escalation point and single point of contact for banking queries",
            "Own the new site opening process (Planet, Barclaycard, Amex)",
            "Reconcile bank transactions in ReconNet and Planet",
            "Check hotel transactions in BART and process guest refunds per client instructions",
        ],
    ),
    job(
        "20275", "accounts-receivable-senior-executive", "Finance & Accounting – Accounts Receivable", "2026-09-17",
        level="Senior Executive", mode="Hybrid", exp="1–3 years", experience="experienced",
        tags=["Finance", "Accounting", "Accounts Receivable"],
        work="Billing, collections and cash application in the F&A back office. Produce invoices and credit notes within SLA, post receipts, manage the AR mailbox and process adjustments in Oracle Fusion.",
        skills=["Accounts Receivable", "Billing", "Collections", "Cash Application", "Oracle Fusion", "MS Excel"],
        requirements=["Bachelor's or postgraduate degree", "1–3 years of experience"],
        responsibilities=[
            "Produce invoices and credit notes on time in line with SLAs",
            "Manage billing and collections; update the collections dashboard and send monthly dunning",
            "Create receipts from bank statements and allocate payments to the correct invoices",
            "Manage the AR mailbox within SLA",
            "Process adjustments, write-offs and refunds in Fusion",
        ],
    ),
    job(
        "19416", "outbound-customer-service-executive", "Outbound Customer Service (Voice)", "2026-09-17",
        level="Executive", mode="Work from office", exp="0–3 years",
        tags=["BPO", "Customer Service", "Voice"],
        industry="BPO / Customer Service",
        work="Outbound voice customer service role at EXL Kochi.",
        skills=["Customer Service", "Voice Process", "Communication", "Problem Solving"],
        requirements=["Bachelor's degree", "Excellent communication and problem-solving skills"],
        responsibilities=["Handle outbound customer calls and resolve customer queries"],
    ),
    job(
        "19883", "ar-collections-analyst", "Accounts Receivable – Collections (Insurance)", "2026-09-14",
        level="Analyst", mode="Work from office", exp="2–3 years", experience="experienced",
        tags=["Finance", "Accounting", "Accounts Receivable", "Insurance"],
        work="AR collections for an insurance client. Order-to-cash cycle, cash application and cash suspense, SOP maintenance and process improvement.",
        skills=["Accounts Receivable", "O2C", "Cash Application", "Insurance Accounting", "SOP"],
        requirements=[
            "Bachelor's or Master's in Accounting / B.Com / M.Com",
            "Preferably 2–3 years in Accounts Receivable",
            "Experience in reporting, quality audits and trainings",
        ],
        responsibilities=[
            "Work across the O2C / AR cycle, including cash application and cash suspense",
            "Keep SOPs updated with process changes",
            "Identify inefficient processes and recommend control and efficiency improvements",
        ],
    ),
    job(
        "19868", "accounts-payable-senior-executive", "Accounts Payable (Insurance)", "2026-09-11",
        level="Senior Executive", mode="Work from office", exp="2–3 years", experience="experienced",
        tags=["Finance", "Accounting", "Accounts Payable", "Insurance"],
        work="Controllership shared services AP role: invoice processing, payments, vendor master data and T&E on ERP systems for an insurance client.",
        skills=["Accounts Payable", "Invoice Processing", "Vendor Master", "T&E", "ERP", "Procure to Pay"],
        requirements=[
            "Bachelor's or Master's in Accounting / B.Com / M.Com",
            "Preferably 2–3 years in Accounts Payable",
            "Experience in reporting, quality audits and trainings",
            "Procure to Pay experience in insurance",
        ],
        responsibilities=[
            "Process invoices, payments, vendor master data and T&E in ERP systems",
            "Handle vendor setups, modifications and payment terms",
            "Analyse invoices and expense reports for accuracy and payment eligibility",
            "Facilitate payments across terms, currencies, bank details and tax conditions",
        ],
    ),
    job(
        "19884", "ar-analysis-senior-executive", "Order to Cash – AR Analysis (Insurance)", "2026-09-11",
        level="Senior Executive", mode="Work from office", exp="2–3 years", experience="experienced",
        tags=["Finance", "Accounting", "Accounts Receivable", "Insurance"],
        work="Order-to-cash AR analysis for an insurance client. Cash application, cash suspense, SOP updates and process improvement.",
        skills=["Accounts Receivable", "O2C", "Cash Application", "Insurance Accounting", "SOP"],
        requirements=[
            "Bachelor's or Master's in Accounting / B.Com / M.Com",
            "Preferably 2–3 years in Accounts Receivable",
            "Experience in reporting, quality audits and trainings",
        ],
        responsibilities=[
            "Work across the O2C / AR cycle, including cash application and cash suspense",
            "Keep SOPs updated with process changes",
            "Identify inefficient processes and recommend control and efficiency improvements",
        ],
    ),
    job(
        "18522", "p2p-senior-executive", "Procure to Pay – Invoice Processing (Complex)", "2026-08-11",
        level="Senior Executive", mode="Hybrid", exp="2–3 years", experience="experienced",
        tags=["Finance", "Accounting", "Accounts Payable"],
        work="End-to-end Accounts Payable: vendor maintenance, PO / non-PO invoice processing, exceptions, payments, vendor reconciliations and month-end close within SLA.",
        skills=["Accounts Payable", "Invoice Processing", "Vendor Reconciliation", "Payment Processing", "MS Excel", "Outlook"],
        requirements=[
            "Commerce graduate",
            "Minimum 2–3 years of AP experience",
            "Excellent verbal and written communication",
            "Strong MS Office skills (Excel, Word, Outlook)",
            "Attention to detail and good time management",
        ],
        responsibilities=[
            "Process PO / non-PO and time-sensitive utility invoices; research past-due amounts",
            "Handle payment processing and vendor master maintenance",
            "Perform vendor reconciliations",
            "Meet SLA targets and close all invoices by month-end",
        ],
    ),
]


def main() -> None:
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} EXL Kochi jobs to jobs-data.js")


if __name__ == "__main__":
    main()
