#!/usr/bin/env python3
"""Add new Conduent Kochi openings from careers.conduent.com, pinned at the top.

Postings that share the same title and description are merged into one listing
with every job ID kept in howToApply / hiringNotes.
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
POSTED = "2026-10-27"
JOB_URL = "https://careers.conduent.com/us/en/job/{}"
SEARCH = "https://careers.conduent.com/us/en/search-results"
KOCHI = "Kochi, Kerala, India"
MULTI = "Kochi, Bangalore, Hyderabad, Noida (India)"
COMPANY_DETAILS = (
    "Conduent delivers mission-critical services and solutions on behalf of Fortune 100 "
    "companies and over 500 governments. Opening listed on the official Conduent careers site."
)


def shift_pins(text: str, by: int) -> str:
    pins = [int(n) for n in re.findall(r"pinOrder: (\d+)", text)]
    dupes = [n for n, count in Counter(pins).items() if count != 1]
    if dupes:
        raise SystemExit(f"Duplicate pinOrder values: {dupes}")

    def repl(match: re.Match[str]) -> str:
        return f"pinOrder: {int(match.group(1)) + by}"

    return re.sub(r"pinOrder: (\d+)", repl, text)


def slug(title: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")[:60].rstrip("-")


def build(spec: dict) -> dict:
    ids = spec["ids"]
    title = spec["title"]
    apply = JOB_URL.format(ids[0])
    others = [JOB_URL.format(i) for i in ids[1:]]
    count = f"{len(ids)} openings" if len(ids) > 1 else "1 opening"
    how = f"Apply on Conduent Careers: {apply}"
    if others:
        how += ". Other openings with the same posting: " + " , ".join(others)
    location = spec.get("location", KOCHI)
    return {
        "id": f"conduent-kochi-{slug(title)}-{ids[0]}-oct2026",
        "company": "Conduent",
        "logo": "",
        "companyBlurb": f"Conduent · {title} · {location} · {count}",
        "location": location,
        "roles": [title],
        "experience": spec["experience"],
        "experienceRange": spec.get("experienceRange", ""),
        "employmentType": spec.get("employmentType", "Full-time"),
        "applyLink": apply,
        "applyDeadline": "",
        "postedDate": POSTED,
        "source": "Company careers page",
        "verified": True,
        "verificationNote": NOTE,
        "tags": ["Conduent", "Kochi"] + spec.get("tags", []),
        "isWalkIn": False,
        "walkInDate": "",
        "email": "",
        "phone": "",
        "website": "https://www.conduent.com",
        "address": location,
        "industry": "Business Process Services",
        "companyDetails": COMPANY_DETAILS,
        "workDetails": f"{spec['summary']} {count} on careers.conduent.com (Job ID{'s' if len(ids) > 1 else ''} {', '.join(ids)}).",
        "workStatus": spec.get("workStatus", "Full-time regular"),
        "workMode": spec.get("workMode", "On-site · Kochi"),
        "experienceYears": spec.get("experienceRange", ""),
        "skills": spec.get("skills", []),
        "requirements": spec.get("requirements", []),
        "responsibilities": spec.get("responsibilities", []),
        "benefits": spec.get("benefits", []),
        "howToApply": how,
        "hiringNotes": (
            f"Checked on careers.conduent.com on 27 Oct 2026 — {count} (Job ID{'s' if len(ids) > 1 else ''} "
            f"{', '.join(ids)}). Portal posted {spec['portalPosted']}. No closing date published. "
            f"{spec.get('extraNote', '')}"
        ).strip(),
        "description": spec["summary"],
        "startingDate": "",
        "qualification": spec.get("qualification", ""),
    }


SPECS = [
    {
        "ids": ["26737", "26736", "26532", "25275"],
        "title": "Transaction Processing Associate I",
        "employmentType": "Full-time (temporary)",
        "workStatus": "Full-time temporary",
        "experience": "fresher",
        "experienceRange": "0–1 year",
        "portalPosted": "17 Aug – 22 Oct 2026",
        "workMode": "On-site · Kochi · Rotational shift",
        "tags": ["Freshers", "Non IT", "Transaction Processing", "Night Shift"],
        "summary": "Entry-level transaction processing role at Conduent Kochi (temporary). 0–1 year experience, rotational shift.",
        "skills": ["Typing speed & accuracy", "Analytical reasoning", "Communication"],
        "requirements": [
            "Experience: 0 to 1 year",
            "Shift: Rotational shift; willing to work night shifts",
            "Good analytical and reasoning skills",
            "Good process knowledge",
            "Good communication skills, verbal and non-verbal",
            "Good typing skill with accuracy",
        ],
        "responsibilities": [
            "Perform business support or technical work using data organizing and coordination skills",
            "Perform tasks based on established procedures",
        ],
    },
    {
        "ids": ["26726"],
        "title": "Transaction Processing Associate II",
        "experience": "fresher",
        "experienceRange": "0–1 year",
        "portalPosted": "22 Oct 2026",
        "workMode": "On-site · Kochi · Rotational shift",
        "tags": ["Freshers", "Non IT", "Transaction Processing", "Night Shift"],
        "summary": "Transaction Processing Associate II at Conduent Kochi (full-time regular). Posting lists 0–1 year experience and rotational shift.",
        "skills": ["Typing speed & accuracy", "Analytical reasoning", "Communication"],
        "requirements": [
            "Experience: 0 to 1 year",
            "Shift: Rotational shift; willing to work night shifts",
            "Good analytical and reasoning skills",
            "Good process knowledge",
            "Good communication skills, verbal and non-verbal",
            "Good typing skill with accuracy",
        ],
        "responsibilities": [
            "Perform business support or technical work using data organizing and coordination skills",
            "Perform tasks based on established procedures",
        ],
    },
    {
        "ids": ["26702"],
        "title": "Transaction Processing Associate I",
        "experience": "fresher",
        "experienceRange": "Entry-level",
        "portalPosted": "19 Oct 2026",
        "tags": ["Freshers", "Non IT", "Transaction Processing"],
        "summary": "Entry-level, full-time regular document and data processing role at Conduent Kochi.",
        "requirements": [
            "Entry-level position with limited requirements for licenses, training, and certifications",
            "Basic skills in a range of processes, procedures and systems",
        ],
        "responsibilities": [
            "Receive, process, and complete document classification and transmit to clients",
            "Receive documents in electronic and hard copy form for processing",
            "Sort, image, file, and archive documents by form type",
            "Identify documents and their purpose, creating a database of information",
            "Classify documents based on contract requirements",
            "Capture information based on client requirements",
            "Verify data from automated data extraction tools",
            "Ensure transmission of processed data to the appropriate next level",
        ],
    },
    {
        "ids": ["26592", "26391", "26390", "26150"],
        "title": "Accounting Services Associate I",
        "experience": "fresher",
        "experienceRange": "0–1 year",
        "portalPosted": "25 Sep – 26 Oct 2026",
        "workMode": "Work from office · Kochi · Night shifts",
        "tags": ["Freshers", "Accounting", "Finance", "B.Com", "Night Shift"],
        "summary": "Accounts Associate supporting accounting and finance operations in a BPO environment at Conduent Kochi. B.Com / Accounting / Finance graduates with 0–1 year experience.",
        "qualification": "Bachelor's degree in Commerce, Accounting or Finance",
        "skills": ["MS Excel", "SAP / Oracle", "Accounting principles", "Reconciliation"],
        "requirements": [
            "Bachelor's degree in Commerce, Accounting or Finance",
            "0 to 1 year of experience in accounting, finance, shared services, or BPO operations",
            "Basic understanding of accounting principles and financial processes",
            "Good analytical and problem-solving skills",
            "Proficiency in MS Excel and familiarity with financial systems/tools (SAP/Oracle)",
            "Strong communication and interpersonal skills",
            "High attention to detail and accuracy",
            "Willingness to work night shifts and from the office (WFO)",
        ],
        "responsibilities": [
            "Process accounting transactions accurately and within defined timelines",
            "Review financial documents, invoices, receipts, and supporting records for completeness and accuracy",
            "Reconcile accounts and investigate discrepancies, escalating issues as required",
            "Maintain accurate and up-to-date financial records and documentation",
            "Support month-end and daily accounting activities as assigned",
            "Ensure adherence to SOPs, accounting policies, and internal controls",
            "Meet productivity, quality, and service-level targets",
            "Collaborate with internal teams and stakeholders to resolve accounting queries",
        ],
    },
    {
        "ids": ["26685"],
        "title": "Accounting Services Associate I",
        "experience": "fresher",
        "experienceRange": "0–1 year",
        "portalPosted": "19 Oct 2026",
        "workMode": "Work from office · Kochi · Rotational shifts incl. night",
        "tags": ["Freshers", "Accounting", "Accounts Payable", "B.Com", "Night Shift"],
        "summary": "Accounts Payable associate (vendor master, invoice processing, supplier payments) at Conduent Kochi. Freshers or up to 1 year experience.",
        "qualification": "Bachelor's degree in Commerce, Accounting, or Finance",
        "skills": ["Accounts Payable", "Vendor master data", "MS Excel"],
        "requirements": [
            "Bachelor's degree in Commerce, Accounting, or Finance",
            "Freshers or candidates with 0 to 1 year of professional experience",
            "Good accounting knowledge",
            "Basic proficiency in Microsoft Excel",
            "Excellent communication skills",
            "Willingness to work from office",
            "Willingness to work rotational shifts, including night shifts",
            "Strong attention to detail and accuracy",
        ],
        "responsibilities": [
            "Create and maintain vendor master records per organizational policies",
            "Modify existing vendor details, ensuring accuracy and completeness",
            "Process Accounts Payable invoices accurately and within defined timelines",
            "Manage supplier payments and support payment-related activities",
            "Verify invoice details and ensure compliance with requirements",
            "Assist in resolving invoice, payment, and vendor-related queries",
            "Use Microsoft Excel for data tracking, reporting, and reconciliation",
        ],
    },
    {
        "ids": ["26814", "26686", "26823", "26822", "26717", "26211"],
        "title": "Accounting Services Associate I",
        "experience": "both",
        "portalPosted": "24 Sep – 26 Oct 2026",
        "tags": ["Accounting", "Invoice processing"],
        "summary": "First-level accounting review and invoice verification at Conduent Kochi, working under defined standard operating procedures.",
        "requirements": [
            "Basic operational or analytical skills",
            "Basic understanding of accounting theories, practices, and procedures",
            "Works within defined SOPs and quality guidelines under close supervision",
        ],
        "responsibilities": [
            "Perform first-level review of the accounting process and documents using standard operating instructions",
            "Review and verify invoices",
            "Understand invoice, receipt, payment issues, and check requests",
            "Escalate documents requiring attention",
            "Achieve productivity and quality targets set by the project team lead",
        ],
    },
    {
        "ids": ["26688"],
        "title": "Accounting Services Associate II",
        "experience": "experienced",
        "experienceRange": "2–3 years (Order-to-Cash)",
        "portalPosted": "19 Oct 2026",
        "workMode": "On-site · Kochi · Shift-based",
        "tags": ["Accounting", "Order to Cash", "SAP"],
        "summary": "Order-to-Cash (OTC) associate at Conduent Kochi. 2–3 years of hands-on OTC experience; SAP mandatory.",
        "skills": ["Order to Cash", "SAP", "MS Excel", "Reporting", "Escalation management"],
        "requirements": [
            "2 to 3 years of hands-on experience in the Order-to-Cash (OTC) domain",
            "Mandatory experience working with SAP",
            "Strong analytical, problem-solving, and reporting skills",
            "Proficiency in MS Excel and report preparation",
            "Flexibility to work in shift-based environments",
            "Experience in process improvement, innovation, or transformation initiatives",
            "Good understanding of accounting principles, finance processes, and SLA-driven environments",
            "Experience training and assisting peers is an added advantage",
        ],
        "responsibilities": [
            "Perform end-to-end OTC activities per established procedures and SLAs",
            "Use SAP to process, track, and manage OTC transactions",
            "Prepare and maintain operational and financial reports in MS Excel",
            "Analyze transactional data and report insights to stakeholders",
            "Manage escalations and resolve queries within defined timelines",
            "Support process improvement and transformation initiatives",
        ],
    },
    {
        "ids": ["26684", "26716"],
        "title": "Accounting Services Associate II",
        "experience": "both",
        "portalPosted": "19 – 26 Oct 2026",
        "tags": ["Accounting", "Accounts Payable", "Finance"],
        "summary": "Accounting Services Associate II at Conduent Kochi covering accounts payable/receivable, reconciliations, financial records, and reporting, with moderate supervision.",
        "requirements": [
            "Requires vocational training, certifications, licensures, or equivalent experience",
            "Developed skillsets in a range of processes, procedures, and systems",
        ],
        "responsibilities": [
            "Maintain accounting and financial records, including general ledger, regulatory, and management reports",
            "Prepare records, pay vendor invoices, and respond to vendor inquiries",
            "Prepare, verify, and report accounts payable/receivable transactions",
            "Prepare analyses and reconciliations of bill runs to detect fraud",
            "Prepare consolidation journal entries and eliminate inter-company transactions",
            "Disburse payroll, payroll taxes, and employee benefit payments; prepare payroll expenditure reports",
            "Review and document XBRL data tagging for financial reporting",
        ],
    },
    {
        "ids": ["26557", "26396", "25423", "25359"],
        "title": "Accounting Services Associate III",
        "experience": "both",
        "portalPosted": "23 Aug – 9 Oct 2026",
        "tags": ["Accounting", "Record to Report", "Reconciliation"],
        "summary": "Record-to-Report associate at Conduent Kochi: journal entries, ledger and intercompany reconciliations, and quality feedback to reviewers.",
        "requirements": [
            "Requires vocational training, certifications, licensures, or equivalent experience",
            "Developed proficiency within a range of analytical or operational processes",
            "Completes work with limited supervision",
        ],
        "responsibilities": [
            "Prepare journal entries",
            "Maintain and reconcile ledger accounts",
            "Reconcile sub-ledgers with general ledger, finalize intercompany reconciliation, and liaise with AP and business",
            "Find process gaps and recommend improvements",
            "Ensure integrity of the entire Report to Record process",
            "Prepare and assign unreconciled items to reviewers and give feedback on errors",
            "Impart training when necessary",
        ],
    },
    {
        "ids": ["26555", "26392"],
        "title": "Accounting Services Associate III",
        "experience": "experienced",
        "experienceRange": "3–6 years (Accounts Payable)",
        "portalPosted": "13 Oct 2026",
        "workMode": "On-site · Kochi · Night shift",
        "tags": ["Accounting", "Accounts Payable", "SAP", "Night Shift"],
        "summary": "Accounts Payable Analyst with strong SAP expertise for Conduent's Finance Operations team in Kochi. 3–6 years AP experience; night shift.",
        "qualification": "Bachelor's degree in Commerce, Finance, Accounting, or a related discipline",
        "skills": ["Accounts Payable", "SAP", "Invoice processing", "Month-end close"],
        "requirements": [
            "Bachelor's degree in Commerce, Finance, Accounting, or a related discipline",
            "3–6 years of experience in the Accounts Payable domain",
            "Hands-on experience with SAP (mandatory)",
            "Experience in month-end reporting and closing activities",
            "Strong experience processing large volumes of invoices",
            "Good understanding of AP workflows, invoice validation, and payment processes",
            "Willingness to work in the night shift",
        ],
        "responsibilities": [
            "Process and validate a high volume of supplier invoices within defined timelines",
            "Perform invoice matching, exception handling, and vendor query resolution",
            "Execute payment processing and ensure compliance with AP controls",
            "Support month-end closing, including accruals, reconciliations, and reporting",
            "Prepare and analyze month-end reports and AP metrics",
            "Maintain accurate records and documentation in SAP",
        ],
    },
    {
        "ids": ["25724"],
        "title": "Accounting Services Associate IV",
        "experience": "both",
        "portalPosted": "6 Oct 2026",
        "tags": ["Accounting", "Team Lead", "Quality"],
        "summary": "Accounting Services Associate IV at Conduent Kochi — acts as team lead (not a supervisor), reviewing journal entries and guiding the quality verifiers team.",
        "requirements": [
            "Requires vocational training, certifications, licensures, or equivalent experience",
            "Developed proficiency in a range of analytical or operational processes; technical expert in some areas",
        ],
        "responsibilities": [
            "Review and verify the accuracy of journal entries and accounting classifications",
            "Extract data for dashboards on process/reconciliation metrics",
            "Assist with audits by providing supporting records and documentation",
            "Ensure process documentation and desktop procedures are up to date",
            "Guide the quality verifiers team and participate in first-level quality checks",
            "Allocate work to team members and give subject matter guidance to juniors",
        ],
    },
    {
        "ids": ["25826"],
        "title": "Quality Assurance Associate II",
        "experience": "both",
        "portalPosted": "17 Sep 2026",
        "tags": ["Quality Assurance", "Audit", "Non IT"],
        "summary": "Quality Assurance Associate II at Conduent Kochi: reviews work for errors, audits SLA performance, and coaches Level 1 auditors.",
        "requirements": [
            "Requires vocational training, certifications, licensures, or equivalent experience in some areas",
            "Developed skillset in a range of processes, procedures, and systems",
        ],
        "responsibilities": [
            "Review current processes and identify trends",
            "Review work produced for errors",
            "Evaluate performance standards (SLAs) required under contract",
            "Compare sampling techniques and identify correct samples for auditing",
            "Coach Level 1 auditors on sampling techniques and business process knowledge",
            "Reconcile transaction processing for data accuracy",
            "Interact with external auditors, including SOC 1 reporting",
        ],
    },
    {
        "ids": ["24793"],
        "title": "Supervisor, Transaction Processing",
        "experience": "experienced",
        "portalPosted": "20 Oct 2026",
        "tags": ["Supervisor", "Transaction Processing", "Team Management"],
        "summary": "Supervisor for a transaction processing team at Conduent Kochi — daily team supervision, TAT and quality, staffing, and performance reviews.",
        "requirements": [
            "Broad technical expertise and industry knowledge",
            "Comprehensive understanding of processes, procedures, systems and concepts in own field",
            "Able to manage performance appraisals, training for 3 or more employees, and hiring actions",
        ],
        "responsibilities": [
            "Supervise daily tasks of the team: coaching, coordinating activities, checking quality and progress",
            "Ensure TAT and quality are met for all volumes assigned to the shift",
            "Conduct performance reviews and manage escalated issues; act as SME",
            "Ensure appropriate staffing and interview candidates",
            "Facilitate work allocation and track daily and monthly reporting",
            "Meet with internal teams and external clients",
        ],
    },
    {
        "ids": ["26292"],
        "title": "Senior Tax Analyst - Tax Accounting & Reporting",
        "location": MULTI,
        "experience": "experienced",
        "experienceRange": "4+ years",
        "portalPosted": "9 Oct 2026",
        "workMode": "Listed as remote-eligible · Kochi / Bangalore / Hyderabad / Noida",
        "tags": ["Tax", "Accounting", "Income Tax Provision", "Remote"],
        "summary": "Senior Tax Analyst for income tax provision, SOX compliance, and federal/international tax filings (GILTI, Subpart F). Minimum 4 years in corporate tax.",
        "qualification": "Bachelor's degree in Accounting or equivalent",
        "skills": ["Income tax provision", "SOX 404", "GILTI / Subpart F", "Advanced Excel", "Oracle / SAP / Workday"],
        "requirements": [
            "Bachelor's degree in Accounting or an equivalent educational background",
            "Minimum 4 years of experience in corporate taxation, tax accounting, or public accounting",
            "Experience with income tax provision, tax compliance, and reporting",
            "Advanced Excel (pivot tables, VLOOKUP/XLOOKUP, formulas, data analysis)",
            "Experience with ERP systems such as Oracle, SAP, or Workday",
            "Preferred: multinational organizations and U.S. tax regulations",
        ],
        "responsibilities": [
            "Prepare workpapers for quarterly and annual income tax provisions",
            "Support SOX 404 compliance for tax provision processes",
            "Respond to external auditor inquiries during quarterly and annual audits",
            "Prepare workpapers for the consolidated federal income tax return and estimated payments",
            "Research and apply federal, state, and international tax laws",
            "Prepare and maintain GILTI and Subpart F calculations",
        ],
    },
    {
        "ids": ["26293"],
        "title": "Senior Tax Analyst - Sales and Use Tax Compliance and Reporting",
        "location": MULTI,
        "experience": "experienced",
        "experienceRange": "4+ years",
        "portalPosted": "9 Oct 2026",
        "workMode": "Listed as remote-eligible · Kochi / Bangalore / Hyderabad / Noida",
        "tags": ["Tax", "Indirect Tax", "Sales and Use Tax", "Remote"],
        "summary": "Senior Tax Analyst for US state sales and use tax returns, audits, registrations, and exemption certificates. Minimum 4 years in indirect tax.",
        "qualification": "Bachelor's degree in Accounting, Finance, Commerce, or equivalent",
        "skills": ["Sales and use tax", "Vertex / OneSource / Avalara", "Excel", "Oracle / SAP / Workday"],
        "requirements": [
            "Bachelor's degree in Accounting, Finance, Commerce, or equivalent",
            "Minimum 4 years of experience in indirect tax, sales and use tax compliance, tax accounting, or public accounting",
            "Proficiency in Microsoft Excel and Office; ERP experience (Oracle, SAP, Workday or similar)",
            "Preferred: multi-state sales and use tax filings and audits; Vertex, OneSource, Avalara or similar tools",
        ],
        "responsibilities": [
            "Review monthly state sales and use tax returns, payments, and filings",
            "Prepare tax accounting entries for sales and use tax",
            "Manage sales and use tax registrations, renewals, and account closures",
            "Assist with state sales and use tax audits and respond to notices",
            "Maintain resale and exemption certificates in Vertex Series O",
            "Support the state income tax team with return reviews",
        ],
    },
    {
        "ids": ["26294"],
        "title": "Senior Tax Analyst - Property Tax and Sales & Use Tax",
        "location": MULTI,
        "experience": "experienced",
        "experienceRange": "4+ years",
        "portalPosted": "13 Oct 2026",
        "workMode": "Listed as remote-eligible · Kochi / Bangalore / Hyderabad / Noida",
        "tags": ["Tax", "Property Tax", "Sales and Use Tax", "Remote"],
        "summary": "Senior Tax Analyst for personal property tax, business licenses, and sales and use tax (Ariba exceptions, Vertex certificates). Minimum 4 years experience.",
        "qualification": "Bachelor's degree in Accounting, Finance, Commerce, or equivalent",
        "skills": ["Property tax", "Sales and use tax", "Vertex Series O", "Ariba"],
        "requirements": [
            "Bachelor's degree in Accounting, Finance, Commerce, or equivalent",
            "Minimum of 4 years of experience in property tax and Sales & Use Tax",
            "Preferred: tax audits, compliance filings, tax research, and reporting",
            "Preferred: multinational or shared services environment",
        ],
        "responsibilities": [
            "Gather and analyze personal property tax data for filings",
            "Review personal property tax returns, make payments, and maintain the tax calendar",
            "Prepare business licenses and license payments; maintain business license calendar",
            "Respond to property tax and business license notices with state and local agencies",
            "Prepare tax resale and exemption certificates and store them in Vertex Series O",
            "Review and clear Ariba sales tax exceptions daily",
            "Review the monthly sales and use tax accrual journal entry",
        ],
    },
    {
        "ids": ["26295"],
        "title": "Director, International Tax Accounting & Reporting",
        "location": MULTI,
        "experience": "experienced",
        "experienceRange": "8+ years",
        "portalPosted": "9 Oct 2026",
        "workMode": "Listed as remote-eligible · Kochi / Bangalore / Hyderabad / Noida",
        "tags": ["Tax", "International Tax", "Transfer Pricing", "Leadership", "Remote"],
        "summary": "Director for international tax accounting: ASC 740 provisions, foreign entity returns, transfer pricing, and OECD/BEPS Pillar Two. CA/CPA/ACCA with 8+ years.",
        "qualification": "Bachelor's in Accounting, Finance, Commerce or equivalent; CA, CPA, ACCA or relevant certification",
        "skills": ["ASC 740", "Transfer pricing", "BEPS Pillar Two", "CbCR", "Oracle / SAP / Workday"],
        "requirements": [
            "Bachelor's degree in Accounting, Finance, Commerce, or equivalent",
            "Chartered Accountant (CA), CPA, ACCA, or other relevant professional certification",
            "Minimum of 8 years in international tax, tax accounting, corporate taxation, public accounting, or related finance",
            "Significant experience with ASC 740 tax provision reporting, international tax compliance, and transfer pricing",
            "Experience managing external service providers, auditors, and tax authorities across jurisdictions",
            "Preferred: multinational organizations with complex cross-border tax structures",
        ],
        "responsibilities": [
            "Prepare, review, and assess ASC 740 tax provisions and FIN 48 positions for foreign entities",
            "Support SOX 404 tax-related internal controls",
            "Coordinate preparation and filing of corporate income tax returns for foreign entities",
            "Perform return-to-provision analyses and related journal entries",
            "Support international tax audits and tax authority inquiries",
            "Prepare and review OECD Transfer Pricing Master Files, Local Files, and intercompany agreements",
            "Prepare analyses for BEPS Pillar Two, CbCR, and EU Public CbCR compliance",
        ],
    },
    {
        "ids": ["25800"],
        "title": "Business Solution Architect",
        "location": "Bangalore, Kochi, Hyderabad (India)",
        "experience": "experienced",
        "portalPosted": "28 Sep 2026",
        "workMode": "Remote work (per posting) · Bangalore / Kochi / Hyderabad",
        "tags": ["Solution Architect", "Business Architecture", "Remote"],
        "summary": "Business Solution Architect working across Conduent's commercial business to design and implement data-driven client solutions. Posting lists remote work.",
        "qualification": "Bachelor's in Business, Finance, Computer Science, Engineering, or related field, or equivalent experience",
        "skills": ["Business architecture", "Solution design", "Financial analysis", "Stakeholder management", "IT architecture literacy"],
        "requirements": [
            "Bachelor's degree in Business, Finance, Computer Science, Engineering, or related field, or equivalent experience",
            "Proven experience in business architecture, solution development, or product strategy",
            "Strong financial acumen and comfort with large data sets and complex numerical analysis",
            "Technological literacy: systems, APIs, compute, network, storage and security architecture",
            "Demonstrated success in stakeholder engagement, conflict resolution, and negotiation",
            "Preferred: matrixed global organizations; data visualization, business modeling, and digital transformation tools",
        ],
        "responsibilities": [
            "Lead design and development of scalable business solutions for general and client-specific needs",
            "Analyze financial data and provide insights to inform strategy and solution design",
            "Collaborate with technical teams on technology platforms and systems",
            "Engage in high-level negotiations and build relationships with stakeholders",
            "Support implementation phases within budget, timeline, and customer expectations",
            "Work with sales, practice, and delivery managers on solution strategy",
        ],
        "benefits": [
            "Remote work",
            "Health & welfare benefits from day one",
            "Retirement savings programs",
            "Employee discounts",
            "Paid training",
            "Paid time off",
        ],
        "extraNote": "The posting's pay-transparency section states an estimated salary range of $125,000 - $165,000; confirm with Conduent for India compensation.",
    },
]


def main() -> None:
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    fresh = []
    for spec_ in SPECS:
        job = build(spec_)
        if f'id: "{job["id"]}"' in text or f'applyLink: "{job["applyLink"]}"' in text:
            print(f"skip existing {job['id']}")
            continue
        fresh.append(job)
    if not fresh:
        print("No new Conduent Kochi jobs")
        return
    for i, job in enumerate(fresh, start=1):
        job["pinOrder"] = i
    text = shift_pins(text, len(fresh))
    block = ",\n".join(mod.render_job(item) for item in fresh) + ",\n"
    needle = "var JOBS = [\n"
    if needle not in text:
        raise SystemExit("JOBS array not found")
    path.write_text(text.replace(needle, needle + block, 1), encoding="utf-8")
    print(f"Added {len(fresh)} Conduent Kochi jobs (pinned)")


if __name__ == "__main__":
    main()
