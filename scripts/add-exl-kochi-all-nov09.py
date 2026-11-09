#!/usr/bin/env python3
"""Add every remaining EXL Kochi opening listed on the Oracle Recruiting site (CX_2), 9 Nov 2026.

These are older postings (May 2024 – May 2026) that are still open, including generic
pipeline requisitions such as "EXL-E-1023964 / 4400294-Executives". Each keeps the portal's
posted date and is not pinned. Generic titles get the function named in the posting in
brackets. Postings with identical text share one entry that lists every apply link.
"""

from __future__ import annotations

import importlib.util
import json
import re
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("exl_nov01", ROOT / "scripts" / "add-exl-kochi-nov01.py")
exl = importlib.util.module_from_spec(spec)
spec.loader.exec_module(exl)
exl.SKIP_LINE = re.compile(
    r"^(key accountabilities|essential functions.*|eligibility criteria.*|brief job description|technical skill requirements|"
    r"competencies required|responsibilities/activities|job description|job summary|responsibilities|requirements)\s*:?\s*;?$",
    re.I,
)

# requisition -> (title, tags, other requisitions with identical text)
TITLES = {
    "11958": ("Manager (Group Reporting & Consolidation - IFRS)", ["Finance", "Consolidation", "IFRS"], []),
    "13842": ("Executive (Process Trainer)", ["Training", "Operations"], []),
    "10030": ("Lead Assistant Manager (F&A Line Compliance - Healthcare Life Sciences)", ["Compliance", "Finance"], []),
    "7847": ("Senior Associate (Accounts Payable)", ["Accounts Payable", "Finance"], []),
    "7517": ("Assistant Manager (Credit Management)", ["Accounts Receivable", "Credit", "Finance"], []),
    "7305": ("Senior Associate (Accounts Payable - Payments)", ["Accounts Payable", "Finance"], []),
    "6895": ("Assistant Manager (Procure to Pay - Independent Contributor)", ["Procure to Pay", "Accounts Payable"], []),
    "5445": ("Senior Executive (P2P Invoice Processing - Complex)", ["Procure to Pay", "Accounts Payable"], []),
    "5480": ("Lead Assistant Manager (P2P Functional Lead - Accounts Payable)", ["Accounts Payable", "Leadership"], []),
    "EXL-AM-1477700": ("Assistant Manager (Cash Application - Order to Cash)", ["Cash Application", "Accounts Receivable"], ["EXL-AM-1431809", "EXL-AM-1431794"]),
    "4782": ("Senior Executive (Back Office - Finance & Accounting)", ["Finance", "Accounts Payable"], []),
    "EXL-AM-1476356": ("Assistant Manager (AP Reconciliation & Month-End Close)", ["Accounts Payable", "Reconciliation"], []),
    "EXL-E-1478767": ("Executive (Online Research & Data Updates)", ["Research", "Operations"], []),
    "EXL-E-1477753": ("Associate (Healthcare Operations)", ["Healthcare", "Operations"], []),
    "EXL-SE-1471060": ("Senior Executive (Purchase Orders & Invoice Processing - P2P)", ["Procure to Pay", "Purchasing"], []),
    "EXL-E-1471292": ("Executive (Invoice Processing)", ["Accounts Payable", "Invoice Processing"], []),
    "EXL-SE-1463927": ("Senior Executive (Accounts Payable)", ["Accounts Payable", "Finance"], []),
    "EXL-SE-1464898": ("Senior Executive (Billing & Invoice Creation)", ["Billing", "Order to Cash"], []),
    "EXL-M-1431783": ("Manager (Order to Cash)", ["Order to Cash", "Leadership"], []),
    "EXL-LAM-1431279": ("Lead Assistant Manager (General Accounting - Record to Report)", ["General Ledger", "Record to Report"], []),
    "EXL-SE-1431281": ("Senior Executive (Invoice & Payment Processing)", ["Accounts Payable", "Payments"], []),
    "EXL-LAM-1431789": ("Lead Assistant Manager (Cash Application & Collections - O2C)", ["Order to Cash", "Collections"], []),
    "EXL-AM-1431282": ("Assistant Manager (General Accounting - Record to Report)", ["General Ledger", "Record to Report"], ["EXL-AM-1431280"]),
    "EXL-E-1419636": ("Nurse Level 1/2A (Complaints, Grievance & Appeals)", ["Healthcare", "Nursing", "US Healthcare"], []),
    "EXL-SE-1375038": ("Senior Executive (Vendor Invoice Processing - Oracle/SAP/Concur)", ["Accounts Payable", "SAP", "Oracle"], ["EXL-E-1226309"]),
    "EXL-E-1361606": ("Reporting Analyst", ["Reporting", "Analytics", "Night Shift"], ["EXL-E-1329634"]),
    "EXL-SM-1356928": ("Senior Manager (Transformation & AI)", ["Transformation", "AI", "Leadership"], []),
    "EXL-SM-1356655": ("Senior Manager (Finance & Accounting BPO)", ["Finance", "Leadership"], []),
    "EXL-SE-1351877": ("Senior Executive (Record to Report - Journal Entry)", ["Record to Report", "General Ledger"], []),
    "EXL-LAM-1346506": ("Lead Assistant Manager (General Ledger)", ["General Ledger", "Record to Report"], []),
    "EXL-SE-1344573": ("Senior Executive (General Ledger)", ["General Ledger", "Record to Report"], []),
    "EXL-SE-1311467": ("Senior Executive (Risk & Compliance)", ["Compliance", "Risk"], []),
    "EXL-SM-1276512": ("Senior Manager (Operations)", ["Operations", "Leadership"], []),
    "EXL-LAM-1254010": ("Lead Assistant Manager (General Accounting - Senior Accountant)", ["General Ledger", "Accounting"], []),
    "EXL-SE-1224707": ("Senior Executive (Foreign Language - Finance & Accounting)", ["Language", "Finance"], []),
    "EXL-AM-1222551": ("Assistant Manager (Month-End Accounting & Reporting)", ["Record to Report", "Reporting"], []),
    "EXL-SE-1194202": ("Senior Executive (Restricted Party Screening - Global Trade)", ["Compliance", "Global Trade"], []),
    "EXL-E-1160397": ("Executive (PO/Non-PO Invoice Processing)", ["Accounts Payable", "Invoice Processing"], []),
    "EXL-E-1048711": ("Nurse Level 1/2A (Healthcare Academy)", ["Healthcare", "Nursing", "US Healthcare"], []),
    "EXL-SE-1043800": ("Senior Executive (Month-End Accounting & Reporting)", ["Record to Report", "Reporting"], []),
    "EXL-E-1023964": ("Executive (Medical Underwriting)", ["Healthcare", "Insurance", "Underwriting"], []),
}

# Postings written as one paragraph; lists below are taken from their text.
MANUAL = {
 "EXL-SE-1463927": {
  "responsibilities": [
   "Handle all Accounts Payable functions: vendor maintenance, invoice processing, exception handling, payments and reporting",
   "Process PO and non-PO invoices",
   "Enter time-sensitive utility invoices and research past-due amounts to keep accounts current",
   "Payment processing, vendor master maintenance and vendor reconciliations",
   "Ensure SLA targets are achieved",
   "Make sure all invoices are processed by month-end"
  ],
  "requirements": [
   "Minimum 2-3 years of Accounts Payable experience",
   "Experience in VIM",
   "Understands the need for confidentiality",
   "Attention to detail and accuracy",
   "Excellent verbal and written communication skills",
   "Excellent working knowledge of MS Office (Excel, Word, Outlook)",
   "Good time management and organisational skills"
  ]
 },
 "EXL-SE-1311467": {
  "responsibilities": [
   "Ensure adherence to operational and process controls, service delivery compliance, fraud risk assessment, client contract terms and policies in the client area",
   "Coordinate and support compliance activities in the client area",
   "Conduct periodic fraud risk reviews, process control testing and service delivery compliance audits",
   "Support operations during internal and external audits",
   "Act as an independent reviewer so compliance issues are evaluated, investigated and resolved",
   "Identify areas of compliance risk and develop corrective action plans",
   "Report regularly to senior management on compliance efforts",
   "Advise on risk, regulatory, contractual and policy compliance"
  ],
  "requirements": [
   "Commerce graduate or postgraduate (15 years of education) - mandatory",
   "CA / CS Inter preferred",
   "Excellent MS Office skills; a diploma is preferred",
   "Domain certifications such as ISO, or other audit certifications, preferred"
  ]
 },
 "EXL-SE-1194202": {
  "responsibilities": [
   "Use third-party denied party global trade software to conduct restricted party screening",
   "Research and analyse screening results to determine whether an e-commerce trade partner is on an official denied party list, blocked from export or sanctioned",
   "Conduct research using internal and external resources",
   "Provide data for performance metrics and accurate scorecards",
   "Support export compliance audits as required"
  ],
  "requirements": [
   "Ability to analyse findings",
   "Proficiency in Outlook, Excel and Word",
   "Excellent verbal and written skills with strong attention to detail",
   "Self-motivated with good decision-making skills",
   "Able to work independently",
   "Excellent organisational and follow-up skills"
  ]
 }
}

_fetch = exl.fetch


def fetch(req_id: str) -> dict:
    for attempt in range(4):  # the Oracle API sometimes drops a connection
        try:
            d = dict(_fetch(req_id))
            break
        except OSError:
            if attempt == 3:
                raise
            time.sleep(2 * (attempt + 1))
    for k in ("Category", "Function", "JobFunction"):
        d[k] = d.get(k) or ""
    d["WorkplaceType"] = d.get("WorkplaceType") or "Work From Office"
    return d


exl.fetch = fetch


def main() -> None:
    path = ROOT / "data" / "jobs-data.js"
    text = path.read_text(encoding="utf-8")
    fresh = []
    for req, (title, tags, others) in TITLES.items():
        if f'/CX_2/job/{req}"' in text:
            continue
        job = exl.build(req, title, tags)
        job["id"] = job["id"].replace("-kochi-nov2026", "-kochi-open-nov2026")
        job["summary"] = job["description"] = job["description"].replace(" · .", ".").replace(". .", ".")
        job["workDetails"] = job["workDetails"].replace(" · .", ".").replace(". .", ".")
        job.pop("summary")
        if req in MANUAL:
            job.update(MANUAL[req])
        ids = [req] + others
        note = f"Checked on EXL careers (Kochi) on 9 Nov 2026 · Requisition{'s' if others else ''} {', '.join(ids)} · Portal posted {job['postedDate']} (older posting, still open)."
        if others:
            links = " , ".join(f"{exl.SITE}/job/{o}" for o in others)
            job["howToApply"] += f". Other openings with the same posting: {links}"
            job["companyBlurb"] += f" · {len(ids)} openings"
        job["hiringNotes"] = note
        fresh.append(job)
        print(f"{job['postedDate']} {title}" + (f"  (+{len(others)} same posting)" if others else ""))
    if not fresh:
        print("No remaining EXL jobs")
        return
    block = ",\n".join(exl.mod.render_job(item) for item in fresh) + ",\n"
    path.write_text(text.replace("var JOBS = [\n", "var JOBS = [\n" + block, 1), encoding="utf-8")
    print(f"Added {len(fresh)} EXL Kochi entries covering {sum(1 + len(v[2]) for v in TITLES.values())} requisitions (not pinned)")


if __name__ == "__main__":
    main()
