#!/usr/bin/env python3
"""WhatsApp hiring posters attached 19 Oct 2026. Facts only as printed."""

from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "add_direct", ROOT / "scripts" / "add-direct-jobs-oct09.py"
)
direct_mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(direct_mod)

direct = direct_mod.direct
mod = direct_mod.mod

JOBS = [
    direct(
        "first-reach-graphic-designer-video-editor",
        "First Reach Digital",
        "Graphic Designer cum Video Editor",
        "Kalamassery, Kochi",
        experience="experienced",
        experience_range="Experienced candidates preferred · Immediate joiners preferred",
        email="hr@firstreachdigital.com",
        phone="+91 99466 18222",
        tags=["Design", "Video", "Kochi"],
        work_mode="Office only · Full-time",
        work_details=(
            "Graphic Designer cum Video Editor at First Reach Digital, Kalamassery, Kochi. "
            "Office only, full-time. Immediate joiners preferred. Experienced candidates preferred. "
            "Proficient in Adobe Premiere and After Effects, with media production expertise. "
            "Also listed: proficient in editing software, concept-to-visualization, and able to work individually and in a group."
        ),
        requirements=[
            "Experienced candidates preferred",
            "Adobe Premiere and After Effects",
            "Media production expertise",
            "Office only, full-time, Kalamassery, Kochi",
        ],
        how="WhatsApp +91 99466 18222, or email hr@firstreachdigital.com or ceo@firstreachdigital.com",
    ),
    direct(
        "first-reach-business-development-executive",
        "First Reach Digital",
        "Business Development Executive",
        "Kalamassery, Kochi",
        experience="both",
        experience_range="Graduation",
        email="hr@firstreachdigital.com",
        phone="+91 99466 18222",
        tags=["Sales", "Kochi"],
        work_mode="Office job only",
        work_details="Business Development Executive at First Reach Digital. Qualification: graduation. Location: Kalamassery, Kochi. Office job only.",
        requirements=["Graduation", "Office job only", "Kalamassery, Kochi"],
        how="Call +91 99466 18222 or email hr@firstreachdigital.com",
    ),
    direct(
        "first-reach-it-sales-executive",
        "First Reach Digital",
        "IT Sales Executive",
        "Kalamassery, Kochi",
        experience="both",
        experience_range="Graduation",
        email="hr@firstreachdigital.com",
        phone="+91 99466 18222",
        tags=["Sales", "IT", "Kochi"],
        work_mode="Office job only",
        work_details="IT Sales Executive at First Reach Digital. Qualification: graduation. Location: Kalamassery, Kochi. Office job only.",
        requirements=["Graduation", "Office job only", "Kalamassery, Kochi"],
        how="Call +91 99466 18222 or email hr@firstreachdigital.com",
    ),
    direct(
        "gland-chemicals-production-engineering",
        "Gland Chemicals",
        "Production and Engineering",
        "Location not printed on the notice",
        experience="fresher",
        experience_range="Fresh graduates and postgraduates",
        email="hr.ikkt@glandchemicals.in",
        tags=["Manufacturing", "Engineering", "Freshers"],
        work_details=(
            "Gland Chemicals is inviting applications from fresh graduates and postgraduates for Production and Engineering. "
            "Eligible qualifications printed: B.Pharm / M.Pharm; B.Tech Mechanical, Electrical, Electronics (EEE), "
            "Electronics Communication (ECE), Chemical, Pharmaceutical, Biotechnology; Diploma in Mechanical, Chemical, Electrical; ITI."
        ),
        requirements=[
            "Fresh graduates and postgraduates",
            "B.Pharm / M.Pharm, listed B.Tech branches, Diploma (Mechanical, Chemical, Electrical), or ITI",
        ],
        how="Email hr.ikkt@glandchemicals.in and hr1.ikkt@glandchemicals.in",
    ),
    direct(
        "ktct-staff-nurse-attingal",
        "KTCT Hospital",
        "Experienced Staff Nurse",
        "Attingal, Trivandrum",
        experience="experienced",
        experience_range="Minimum 2 years · ER / OT / ICU / Labour Room",
        email="info@ktcthospital.com",
        phone="0470 310 2562 / 9446003646",
        tags=["Healthcare", "Nursing", "Trivandrum"],
        work_details="Experienced Staff Nurse at KTCT Hospital, Attingal, Trivandrum. Experienced in ER, OT, ICU, or Labour Room. Minimum 2 years. Qualification: BSc Nursing or GNM.",
        requirements=["BSc Nursing or GNM", "Minimum 2 years", "Experience in ER, OT, ICU, or Labour Room"],
        how="Email info@ktcthospital.com or call 0470 310 2562 / 9446003646",
    ),
    direct(
        "ktct-lab-technician-attingal",
        "KTCT Hospital",
        "Lab Technician",
        "Attingal, Trivandrum",
        experience="experienced",
        experience_range="Minimum 1 year",
        email="info@ktcthospital.com",
        phone="0470 3102562, 9446003646",
        tags=["Healthcare", "Laboratory", "Trivandrum"],
        work_details="Lab Technician at KTCT Hospital, Attingal, Trivandrum. Qualification: DMLT or BSc MLT. Minimum 1 year.",
        requirements=["DMLT or BSc MLT", "Minimum 1 year"],
        how="Email info@ktcthospital.com or call 0470 3102562 / 9446003646",
    ),
    direct(
        "ktct-pharmacist-attingal",
        "KTCT Hospital",
        "Pharmacist",
        "Attingal, Trivandrum",
        experience="experienced",
        experience_range="Minimum 1 year",
        email="info@ktcthospital.com",
        phone="0470 3102562, 9446003646",
        tags=["Healthcare", "Pharmacy", "Trivandrum"],
        work_details="Pharmacist at KTCT Hospital, Attingal, Trivandrum. Qualification: D.Pharm or B.Pharm. Minimum 1 year.",
        requirements=["D.Pharm or B.Pharm", "Minimum 1 year"],
        how="Email info@ktcthospital.com or call 0470 3102562 / 9446003646",
    ),
    direct(
        "netstager-bde-sales-calicut",
        "netstager",
        "Business Development Executive (Sales)",
        "Calicut",
        experience="experienced",
        experience_range="1 year · Vacancies: 2",
        email="careers@netstager.com",
        phone="+91 9995222896",
        tags=["Sales", "Calicut"],
        work_details="Business Development Executive (Sales) at netstager, Calicut. Vacancies: 2. Experience: 1 year.",
        requirements=["1 year experience", "Location: Calicut", "2 vacancies"],
        how="Email careers@netstager.com or call +91 9995222896",
    ),
    direct(
        "jio-point-assistant-manager-karakulam",
        "Jio",
        "Jio Point Assistant Manager",
        "Karakulam, Nedumangad",
        experience="experienced",
        experience_range="1 year",
        email="Siji.ps@ril.com",
        phone="8921177568 / 9249537423",
        salary="Annual CTC ₹2,55,000",
        apply_link="https://www.careers.jio.com/",
        tags=["Retail", "Telecom", "Trivandrum"],
        work_details=(
            "Jio Point Assistant Manager at Karakulam, Nedumangad. Annual CTC printed as ₹2,55,000. "
            "Education: plus two, any degree, or diploma. Experience: 1 year. "
            "Requirements printed: new customer acquisition for Jio SIM and Airfiber, distribution management, "
            "sales and revenue targets, retailer engagement, and market expansion."
        ),
        requirements=["Plus two, any degree, or diploma", "1 year", "Karakulam, Nedumangad"],
        how="Register at Careers.jio.com. Recruiter email Siji.ps@ril.com. Phones 8921177568 / 9249537423.",
    ),
    direct(
        "jio-point-manager-alappuzha-kollam",
        "Jio",
        "Jio Point Manager",
        "Mannar (Alappuzha), Oachira, Pathanapuram, Paripally, Thrikkadavoor (Kollam)",
        experience="experienced",
        experience_range="2–4 years",
        email="anoop.vs@ril.com",
        phone="8590603242",
        salary="Annual CTC ₹3,38,128",
        apply_link="https://www.careers.jio.com/",
        tags=["Retail", "Telecom"],
        work_details=(
            "Jio Point Manager. Annual CTC printed as ₹3,38,128. Education: any degree. Experience: 2–4 years. "
            "Locations printed: Mannar (Alappuzha), Oachira, Pathanapuram, Paripally, Thrikkadavoor (Kollam)."
        ),
        requirements=["Any degree", "2–4 years", "Listed Alappuzha and Kollam locations"],
        how="Register at Careers.jio.com. Recruiter email anoop.vs@ril.com. Phone 8590603242.",
    ),
    direct(
        "jio-point-assistant-manager-puthur-chunakkara",
        "Jio",
        "Jio Point Assistant Manager",
        "Puthur, Chunakkara",
        experience="both",
        experience_range="0–2 years",
        email="Anoop.vs@ril.com",
        phone="8590603242",
        salary="Annual CTC ₹2,41,500",
        apply_link="https://www.careers.jio.com/",
        tags=["Retail", "Telecom"],
        work_details=(
            "Jio Point Assistant Manager at Puthur and Chunakkara. Annual CTC printed as ₹2,41,500. "
            "Education: Plus 2 and above. Experience: 0–2 years. "
            "Requirements printed: Jio Point store operations, new customer acquisition for Jio SIM and Airfiber, "
            "customer services, and stock and inventory management."
        ),
        requirements=["Plus 2 and above", "0–2 years", "Puthur, Chunakkara"],
        how="Register at Careers.jio.com. Recruiter email Anoop.vs@ril.com. Phone 8590603242.",
    ),
    direct(
        "jio-digital-repair-specialist-nedumangad",
        "Jio",
        "Digital Repair Specialist",
        "Nedumangad",
        experience="experienced",
        experience_range="1.5 to 4 years",
        email="Siji.ps@ril.com",
        phone="9249537423 / 9249501627",
        salary="Annual CTC ₹3,50,000",
        apply_link="https://www.careers.jio.com/",
        tags=["Telecom", "Field", "Trivandrum"],
        work_details=(
            "Digital Repair Specialist, Nedumangad. Annual CTC printed as ₹3,50,000. Education: ITI or Diploma. "
            "Experience: 1.5 to 4 years. Duties printed: device care, connect and care for Air Fiber, "
            "installations and care operations, manage connect partners, and customer SRs and troubleshooting."
        ),
        requirements=["ITI or Diploma", "1.5 to 4 years", "Nedumangad"],
        how="Register at Careers.jio.com. Recruiter email Siji.ps@ril.com. Phones 9249537423 / 9249501627.",
    ),
    direct(
        "jio-home-connect-master-supervisor-kazhakootam",
        "Reliance Jio",
        "Home Connect Master Supervisor",
        "Kazhakootam",
        experience="experienced",
        experience_range="5–8 years",
        email="siji.ps@ril.com",
        phone="8921177568",
        salary="4 LPA to 5 LPA",
        tags=["Telecom", "Field", "Trivandrum"],
        work_details=(
            "Home Connect Master Supervisor at Kazhakootam. Experience 5–8 years. Salary printed as 4L to 5LPA. "
            "Qualification: Diploma, B.E., or B.Tech in ECE, Telecommunication, IT, or CS."
        ),
        requirements=[
            "Diploma, B.E., or B.Tech in ECE, Telecommunication, IT, or CS",
            "5–8 years",
            "Kazhakootam",
        ],
        how="Email siji.ps@ril.com or call 8921177568.",
    ),
    direct(
        "storycat-client-service-manager-calicut",
        "Storycat",
        "Client Service Manager",
        "Calicut",
        experience="both",
        experience_range="Any degree · Advertising agency experience is an added advantage",
        phone="+91 90 37 26 76 97",
        apply_link="tel:+919037267697",
        tags=["Advertising", "Calicut"],
        work_details="Client Service Manager at Storycat (storycatcreative.com), Calicut. Qualification: any degree. Advertising agency experience is an added advantage. No email is printed.",
        requirements=["Any degree", "Calicut", "Advertising agency experience is an added advantage"],
        how="Call +91 90 37 26 76 97. No email is printed on the poster.",
    ),
    direct(
        "storycat-digital-marketing-team-lead-kochi",
        "Storycat",
        "Digital Marketing Team Lead",
        "Kochi",
        experience="experienced",
        experience_range="2 years and above",
        phone="+91 903 726 7697",
        apply_link="tel:+919037267697",
        tags=["Digital Marketing", "Kochi"],
        work_details=(
            "Digital Marketing Team Lead at Storycat, Kochi. Experience: 2 years and above. "
            "Skills printed: Google Ads campaign management and scaling, Meta Ads campaign management and optimization, "
            "SEO strategy and implementation, performance analysis and conversion tracking, and team management."
        ),
        requirements=["2 years and above", "Kochi", "Google Ads, Meta Ads, SEO, and team management as printed"],
        how="Call +91 903 726 7697. No email is printed on the poster.",
    ),
    direct(
        "visa-guy-consultant-operations-calicut",
        "The Visa Guy",
        "Visa Consultant",
        "Hilite Business Park, Calicut",
        experience="both",
        experience_range="Not printed",
        email="hr@visaguy.in",
        phone="+91 81296 58891",
        roles=["Visa Consultant", "Operations Associate"],
        tags=["Immigration", "Calicut"],
        work_details="The Visa Guy is hiring a Visa Consultant and an Operations Associate at Hilite Business Park, Calicut. Experience is not printed.",
        requirements=["Open roles: Visa Consultant and Operations Associate", "Hilite Business Park, Calicut"],
        how="Email hr@visaguy.in or call +91 81296 58891.",
    ),
    direct(
        "atp-sales-executives",
        "ATP Health With",
        "Sales Executives",
        "Location not printed on the notice",
        experience="both",
        experience_range="0–2 years · Freshers can apply",
        email="hr@healthwithatp.com",
        phone="+91 7594888941",
        tags=["Sales", "Healthcare"],
        work_details=(
            "ATP Health With is hiring Sales Executives. The poster says female candidates only, "
            "experience 0–2 years, evening shift, and freshers can apply. The city is not printed."
        ),
        requirements=["Female candidates only", "0–2 years", "Evening shift", "Good communication skills", "Freshers can apply"],
        how="Email hr@healthwithatp.com or call +91 7594888941.",
    ),
    direct(
        "exl-avp-senior-manager-manager-kochi",
        "EXL",
        "AVP / Senior Manager / Manager",
        "Kochi",
        experience="experienced",
        experience_range="10+ years Insurance F&A · 6+ years team handling",
        email="shamna.rafiq@exlservice.com",
        tags=["Finance", "Insurance", "Kochi"],
        work_details=(
            "EXL hiring AVP / Senior Manager / Manager for P2P, O2C, and R2R in the Insurance F&A domain, Kochi. "
            "10+ years of Insurance F&A experience (US, UK, or Australia). Good understanding of GAAP and STAT rules. "
            "6+ years of team handling. Qualification: BCom, MCom, MBA, CA, or CMA."
        ),
        requirements=[
            "10+ years Insurance F&A (US, UK, or Australia)",
            "GAAP and STAT",
            "6+ years team handling",
            "BCom, MCom, MBA, CA, or CMA",
            "Kochi",
        ],
        how="Email shamna.rafiq@exlservice.com.",
    ),
    direct(
        "supreme-food-store-manager-kollam",
        "Supreme The Food Co",
        "Store Manager Supermarket",
        "Kollam, Kerala",
        experience="experienced",
        experience_range="Minimum 5 years",
        email="hr@supreme-group.in",
        phone="8589061627",
        tags=["Retail", "Kollam"],
        work_details="Store Manager Supermarket at Supreme The Food Co, Kollam. Experience minimum 5 years.",
        requirements=["Minimum 5 years", "Kollam, Kerala"],
        how="Email hr@supreme-group.in or call 8589061627.",
    ),
    direct(
        "supreme-food-assistant-store-manager-kollam",
        "Supreme The Food Co",
        "Assistant Store Manager Supermarket",
        "Kollam, Kerala",
        experience="experienced",
        experience_range="Minimum 2 years",
        email="hr@supreme-group.in",
        phone="8589061627",
        tags=["Retail", "Kollam"],
        work_details="Assistant Store Manager Supermarket at Supreme The Food Co, Kollam. Experience minimum 2 years.",
        requirements=["Minimum 2 years", "Kollam, Kerala"],
        how="Email hr@supreme-group.in or call 8589061627.",
    ),
    direct(
        "chemsbury-sales-executive-thrippunithura",
        "Chemsbury Water Solutions",
        "Sales Executive",
        "Thrippunithura, Ernakulam",
        experience="both",
        experience_range="Sales or marketing experience preferred · Freshers can apply",
        email="marketing@chemsbury.in",
        phone="+91 808 641 8138",
        tags=["Sales", "Kochi"],
        work_details=(
            "Sales Executive, Water Treatment Division, at Chemsbury Water Solutions. "
            "Office: Thrippunithura, Ernakulam. Good communication and sales skills. "
            "Sales or marketing experience preferred. Valid driving licence preferred. Freshers with enthusiasm can apply."
        ),
        requirements=[
            "Good communication and sales skills",
            "Sales or marketing experience preferred",
            "Valid driving licence preferred",
            "Freshers can apply",
            "Thrippunithura, Ernakulam",
        ],
        how="WhatsApp or call +91 808 641 8138, or email marketing@chemsbury.in.",
    ),
    direct(
        "mns-solutions-fresher-power-systems",
        "MNS Solutions",
        "Power Systems Fresher",
        "Pan India project sites",
        experience="fresher",
        experience_range="2025 and 2026 passed out · B.E. / B.Tech Electrical",
        email="mnssolutionsmanager@gmail.com",
        phone="6305427016",
        salary="CTC ₹27,000 per month",
        tags=["Engineering", "Electrical", "Freshers"],
        work_details=(
            "MNS Solutions hiring 2025 and 2026 passed-out freshers for power systems. CTC printed as ₹27,000 per month. "
            "B.E. or B.Tech in Electrical Engineering, 2025 or 2026 passed out. Willing to travel to project sites across India. "
            "Work printed: relay protection, SAS engineering, testing and commissioning, and site support."
        ),
        requirements=[
            "B.E. or B.Tech Electrical, 2025 or 2026 passed out",
            "Willing to travel pan India",
            "CTC printed as ₹27,000 per month",
        ],
        how="Email mnssolutionsmanager@gmail.com or call 6305427016.",
    ),
    direct(
        "alims-branch-manager-trivandrum-kannur-thrissur",
        "ALIMS School of Business",
        "Branch Manager",
        "Trivandrum, Kannur, Thrissur",
        experience="experienced",
        experience_range="Minimum 2–3 years in edutech",
        phone="+91 8075 059 485",
        apply_link="tel:+918075059485",
        tags=["Education", "Sales"],
        work_details=(
            "Branch Manager (MBA) at ALIMS School of Business. Minimum 2–3 years in the edutech sector. "
            "Attractive salary. Accommodation available. Locations: Trivandrum, Kannur, and Thrissur. Willing to relocate."
        ),
        requirements=["MBA", "Minimum 2–3 years in edutech", "Willing to relocate", "Trivandrum, Kannur, or Thrissur"],
        how="Call +91 8075 059 485. No email is printed on this poster.",
    ),
    direct(
        "froos-security-staff-perinthalmanna",
        "Froos Retail LLP",
        "Security Staff",
        "Perinthalmanna",
        experience="both",
        experience_range="Not printed",
        phone="+91 75938 44705",
        apply_link="tel:+917593844705",
        employment_type="Full-time",
        work_mode="Duty time 2:30 PM – 11:30 PM",
        tags=["Retail", "Security"],
        work_details=(
            "Security Staff at Froos Retail LLP, Perinthalmanna. Full-time. Duty time 2:30 PM to 11:30 PM. "
            "Duties printed: customer parking management, vehicle movement, safety and discipline in the parking area, "
            "and assisting customers. Experience is not printed."
        ),
        requirements=["Perinthalmanna", "Full-time", "Duty time 2:30 PM – 11:30 PM"],
        how="Call +91 75938 44705. No email is printed.",
    ),
    direct(
        "techila-salesforce-intern-junior-developer",
        "Techila Global Services",
        "Salesforce Intern & Junior Developer",
        "Bareilly",
        experience="both",
        experience_range="Freshers to 1.5 years · Freshers must already know Salesforce",
        email="careers@techilaservices.com",
        tags=["IT", "Salesforce"],
        work_details=(
            "Salesforce Intern and Junior Developer at Techila Global Services, Bareilly. "
            "Experience: freshers to 1.5 years. Freshers must have prior knowledge of Salesforce. "
            "Skills printed: Salesforce Admin and configuration, Apex, SOQL, Lightning Web Components, "
            "Salesforce Flows, and basic integrations. REST API is a plus."
        ),
        requirements=[
            "Freshers to 1.5 years",
            "Freshers must already know Salesforce",
            "Apex, SOQL, and Lightning Web Components",
            "Bareilly",
        ],
        how="Email careers@techilaservices.com.",
    ),
    direct(
        "axel-creative-media-executive-kozhikode",
        "Axel Technologies",
        "Creative Media Executive",
        "Cyberpark, Kozhikode",
        experience="both",
        experience_range="Immediate hiring · experience not printed",
        email="hr.executive@axeltechnologies.com",
        phone="+91 8714 0708 88",
        work_mode="Full-time, work from office",
        tags=["Media", "Video", "Calicut"],
        work_details=(
            "Creative Media Executive at Axel Technologies, Cyberpark, Kozhikode. Full-time, work from office, immediate hiring. "
            "Looking for professional videography and photography, AI video generation tools, video editing, reels, "
            "client testimonials, commercial ad shoots, motion graphics, and visual storytelling."
        ),
        requirements=["Cyberpark, Kozhikode", "Full-time office", "Immediate hiring"],
        how="Email hr.executive@axeltechnologies.com or call +91 8714 0708 88.",
    ),
    direct(
        "axel-social-media-content-specialist-kozhikode",
        "Axel Technologies",
        "Social Media & Content Specialist",
        "Cyberpark, Kozhikode",
        experience="both",
        experience_range="Immediate hiring · experience not printed",
        email="hr.executive@axeltechnologies.com",
        phone="+91 8714 0708 88",
        work_mode="Full-time, work from office",
        tags=["Social Media", "Content", "Calicut"],
        work_details=(
            "Social Media and Content Specialist at Axel Technologies, Cyberpark, Kozhikode. Full-time, work from office, immediate hiring. "
            "Looking for social media management, content writing, scripts, ad copy, campaign ideas, branding, and audience engagement. "
            "One poster also lists basic Meta knowledge and AI tools."
        ),
        requirements=["Cyberpark, Kozhikode", "Full-time office", "Immediate hiring"],
        how="Email hr.executive@axeltechnologies.com or call +91 8714 0708 88.",
    ),
    direct(
        "ipcs-senior-digital-marketing-trivandrum",
        "IPCS Global",
        "Senior Digital Marketing Executive",
        "Trivandrum",
        experience="experienced",
        experience_range="3+ years",
        email="career@ipcsglobal.com",
        phone="+91 79073 03943",
        tags=["Digital Marketing", "Trivandrum"],
        work_details="Senior Digital Marketing Executive at IPCS Global, Trivandrum. Experience printed as 3+ years.",
        requirements=["3+ years", "Trivandrum"],
        how="Email career@ipcsglobal.com or call +91 79073 03943.",
    ),
    direct(
        "renal-medicity-hr-executives-kochi",
        "Renal Medicity",
        "HR Executives",
        "Palarivattom, Kochi",
        experience="experienced",
        experience_range="Minimum 1 year of hospital HR experience",
        email="careers@renaimedicity.org",
        phone="0484 4332322 / 0484 4332323",
        tags=["HR", "Healthcare", "Kochi"],
        work_details=(
            "HR Executives at Polakulath Narayanan Renal Medicity, Palarivattom, Kochi. "
            "Qualification: MBA-HR, MHA, or MHRM. Minimum 1 year of hospital experience in recruitment, training, and onboarding. "
            "Female candidates preferred."
        ),
        requirements=["MBA-HR, MHA, or MHRM", "Minimum 1 year hospital HR", "Female candidates preferred", "Palarivattom, Kochi"],
        how="Email careers@renaimedicity.org or call 0484 4332322 / 323.",
    ),
    direct(
        "moopen-psychologist-wayanad",
        "Dr. Moopen's Medical College",
        "Psychologist",
        "Naseera Nagar, Meppadi, Wayanad",
        experience="experienced",
        experience_range="1 year",
        email="hr@drmoopensmc.ac.in",
        phone="+91 8111 881124",
        deadline="2026-10-19",
        tags=["Healthcare", "Wayanad"],
        work_details=(
            "Psychologist in Physical Medicine and Rehabilitation at Dr. Moopen's Medical College, "
            "Naseera Nagar, Meppadi, Wayanad. Qualification: BSc, MSc, or MPhil, with RCI registration. Experience: 1 year. "
            "CVs were requested before 19-10-2026."
        ),
        requirements=["BSc, MSc, or MPhil", "RCI registration", "1 year", "CV before 19-10-2026"],
        how="Email hr@drmoopensmc.ac.in or call +91 8111 881124.",
    ),
    direct(
        "moopen-physiotherapist-wayanad",
        "Dr. Moopen's Medical College",
        "Physiotherapist",
        "Naseera Nagar, Meppadi, Wayanad",
        experience="both",
        experience_range="0–2 years",
        email="hr@drmoopensmc.ac.in",
        phone="+91 8111 881124",
        deadline="2026-10-15",
        tags=["Healthcare", "Wayanad"],
        work_details=(
            "Physiotherapist in Physical Medicine at Dr. Moopen's Medical College, Wayanad. "
            "Qualification: Bachelor of Physiotherapy (BPT). Experience: 0–2 years. "
            "The poster prints the date 15-10-2026 at 10:00 am."
        ),
        requirements=["Bachelor of Physiotherapy (BPT)", "0–2 years", "Date printed: 15-10-2026, 10:00 am"],
        how="Email hr@drmoopensmc.ac.in or call +91 8111 881124.",
    ),
    direct(
        "muthoot-mcred-regional-manager-sales",
        "Muthoot MCred",
        "Regional Manager – Sales (Microfinance)",
        "Ernakulam, Alappuzha, Kottayam",
        experience="experienced",
        experience_range="Minimum 10 years in microfinance",
        email="hr.mfho@muthootmcred.com",
        phone="9072364977 / 9037109654 / 9037112498",
        tags=["Finance", "Microfinance"],
        work_details=(
            "Regional Manager – Sales (Microfinance) at Muthoot MCred (formerly Muthoottu Mini Financiers Ltd.). "
            "Graduation is mandatory. Minimum 10 years in microfinance. Locations: Ernakulam, Alappuzha, and Kottayam."
        ),
        requirements=["Graduation mandatory", "Minimum 10 years in microfinance", "Ernakulam, Alappuzha, or Kottayam"],
        how="Email hr.mfho@muthootmcred.com or recruitment.mf@muthootmcred.com. Call 9072364977, 9037109654, or 9037112498.",
    ),
    direct(
        "muthoot-mcred-internal-auditor",
        "Muthoot MCred",
        "Internal Auditor – Microfinance",
        "Alappuzha, Trivandrum, Calicut, Pathanamthitta",
        experience="experienced",
        experience_range="2–4 years",
        email="hr.mfho@muthootmcred.com",
        phone="9072364977 / 9037109654",
        tags=["Finance", "Audit"],
        work_details=(
            "Internal Auditor – Microfinance at Muthoot MCred. Experience 2–4 years. Qualification: graduation. "
            "Locations: Alappuzha, Trivandrum, Calicut, and Pathanamthitta."
        ),
        requirements=["Graduation", "2–4 years", "Alappuzha, Trivandrum, Calicut, or Pathanamthitta"],
        how="Email hr.mfho@muthootmcred.com or recruitment.mf@muthootmcred.com. Call 9072364977 or 9037109654.",
    ),
    direct(
        "agape-video-editor-kothamangalam",
        "Agape Study Abroad Pvt Ltd",
        "Video Editor",
        "Kothamangalam",
        experience="both",
        experience_range="Not printed · 5 openings",
        phone="999 333 1044",
        apply_link="tel:+919993331044",
        employment_type="Part-time",
        tags=["Video", "Part-time"],
        work_details=(
            "Part-time Video Editor at Agape Study Abroad Pvt Ltd, Kothamangalam. 5 openings. "
            "Work printed: edit reels, promotional videos, and educational guides; sound design, captions, graphics, and pacing."
        ),
        requirements=["Part-time", "Kothamangalam", "5 openings"],
        how="DM or send a portfolio to 999 333 1044. No email is printed.",
    ),
    direct(
        "agape-digital-marketing-staff-kothamangalam",
        "Agape Study Abroad Pvt Ltd",
        "Digital Marketing Staff",
        "Kothamangalam",
        experience="both",
        experience_range="Not printed · 10 positions",
        phone="999 333 1044",
        apply_link="tel:+919993331044",
        employment_type="Part-time",
        tags=["Digital Marketing", "Part-time"],
        work_details=(
            "Part-time Digital Marketing Staff at Agape Study Abroad Pvt Ltd, Kothamangalam. 10 positions. "
            "Work printed: reel acting and hosting, shooting and content creation, and camera confidence."
        ),
        requirements=["Part-time", "Kothamangalam", "10 positions"],
        how="DM or send a CV and sample reels to 999 333 1044. No email is printed.",
    ),
    direct(
        "agape-ielts-trainer-kothamangalam",
        "Agape Language Academy",
        "IELTS Trainer",
        "Kothamangalam",
        experience="experienced",
        experience_range="Experience conducting online and classroom batches",
        phone="999 333 1044",
        apply_link="tel:+919993331044",
        work_mode="Hybrid · offline and online",
        tags=["Education", "IELTS"],
        work_details=(
            "IELTS Trainer, offline and online, at Agape Language Academy, Kothamangalam. Hybrid work. "
            "Strong proficiency in all 4 IELTS modules. Experience conducting online and classroom batches."
        ),
        requirements=["All 4 IELTS modules", "Online and classroom batch experience", "Kothamangalam", "Hybrid"],
        how="Send a resume to 999 333 1044. No email is printed.",
    ),
    direct(
        "kit-network-trainers-ernakulam",
        "Kerala Vision Institute of Technology and Management",
        "Network Trainers",
        "Ernakulam",
        experience="experienced",
        experience_range="2–5 years in networking or training",
        phone="9847933988",
        apply_link="https://wa.me/919847933988",
        salary="Best in industry",
        tags=["Training", "Networking", "Kochi"],
        work_details=(
            "Network Trainers at Kerala Vision Institute of Technology and Management (KIT), Ernakulam. "
            "Graduate degree in Computer Science, IT, Electronics, or a related field. "
            "2–5 years in networking or training. Cisco routing, switching, and security. Hands-on CCNA or CCNP curriculum. "
            "Salary printed as best in industry."
        ),
        requirements=["CS, IT, Electronics, or related graduate degree", "2–5 years", "Cisco networking and CCNA/CCNP", "Ernakulam"],
        how="WhatsApp 9847933988. No email is printed.",
    ),
    direct(
        "toffee-paws-sales-executive",
        "Toffee Paws",
        "Sales Executive",
        "Location not printed on the notice",
        experience="both",
        experience_range="Not printed",
        phone="81294 75557",
        apply_link="tel:+918129475557",
        tags=["Retail", "Pets"],
        work_details=(
            "Sales Executive at Toffee Paws pet shop and salon. Male candidates only. Valid driving licence is a must. "
            "Pet lovers will be given more importance. The city is not printed. "
            "Work printed: in-store customer help, pet products, sales, and pick-up and drop when required."
        ),
        requirements=["Male candidates only", "Valid driving licence", "City not printed"],
        how="Call 81294 75557. No email is printed.",
    ),
    direct(
        "citroen-accounts-executive-thrissur",
        "Citroën",
        "Accounts Executive",
        "Marathakkara, Thrissur",
        experience="both",
        experience_range="Minimum 1 year · Freshers can apply",
        email="hr@citroen-evm.com",
        phone="+91 97778626922 / +91 7558889903",
        salary="Best in the industry",
        tags=["Accounts", "Automobile", "Thrissur"],
        work_details=(
            "Accounts Executive at the Citroën dealership, Marathakkara, Thrissur. "
            "Qualification: B.Com or above. Minimum 1 year. Freshers can apply. Salary printed as best in the industry."
        ),
        requirements=["B.Com or above", "Minimum 1 year", "Freshers can apply", "Marathakkara, Thrissur"],
        how="Email hr@citroen-evm.com or call +91 97778626922 / +91 7558889903.",
    ),
    direct(
        "suracsh-arc-welder-kanjikode",
        "Suracsh Adsorbents Pvt Ltd",
        "Arc Welder",
        "Kanjikode",
        experience="both",
        experience_range="0–3 years",
        email="suracshhre@gmail.com",
        phone="+91 7736916111",
        salary="Based on experience and skill level",
        tags=["Manufacturing", "Welding"],
        work_details="Arc Welder at Suracsh Adsorbents Pvt Ltd, Kanjikode. Qualification: ITI Welder. Experience: 0–3 years. Salary based on experience and skill level.",
        requirements=["ITI Welder", "0–3 years", "Kanjikode"],
        how="Call +91 7736916111 or email suracshhre@gmail.com.",
    ),
    direct(
        "gadegos-hr-compliance-executive",
        "Gadegos Solutions Pvt Ltd",
        "HR Compliance Executive",
        "Kerala · Ernakulam preferred",
        experience="experienced",
        experience_range="1–3 years in HR or labour law preferred",
        email="compliance@gadegos.in",
        tags=["HR", "Compliance", "Kochi"],
        work_details=(
            "HR Compliance Executive at Gadegos Solutions Pvt Ltd. "
            "Qualification: MBA HR, MSW, M.Com, B.Com, or equivalent. 1–3 years in HR or labour law preferred. "
            "Kerala, with Ernakulam preferred. Work printed: labour law compliance, payroll and HR compliance, "
            "labour department liaison, and HR documentation."
        ),
        requirements=["MBA HR, MSW, M.Com, B.Com, or equivalent", "1–3 years HR or labour law preferred", "Ernakulam preferred"],
        how="Email compliance@gadegos.in.",
    ),
    direct(
        "tripmango-travel-roles",
        "Tripmango",
        "Travel Consultant",
        "Location not printed on the notice",
        experience="both",
        experience_range="Not printed",
        email="tripmango.in@gmail.com",
        phone="+91 94953 14550",
        roles=["Travel Consultant", "Ticketing Executive", "Holiday Consultant", "Sales Executive"],
        tags=["Travel"],
        work_details="Tripmango is hiring a Travel Consultant, Ticketing Executive, Holiday Consultant, and Sales Executive. Experience and city are not printed.",
        requirements=["Roles printed: Travel Consultant, Ticketing Executive, Holiday Consultant, Sales Executive"],
        how="Email tripmango.in@gmail.com or call +91 94953 14550.",
    ),
    direct(
        "trust-point-assistant-manager-hr-aluva",
        "Trust Point",
        "Assistant Manager – HR",
        "Aluva, Ernakulam",
        experience="experienced",
        experience_range="3 to 10 years",
        phone="9526155846",
        apply_link="tel:+919526155846",
        tags=["HR", "Kochi"],
        work_details=(
            "Trust Point, an HR consultant, is hiring an Assistant Manager – HR for a trading or manufacturing company. "
            "Job location: Aluva, Ernakulam district. Experience: 3 years to 10 years."
        ),
        requirements=["3 to 10 years", "Trading or manufacturing", "Aluva, Ernakulam"],
        how="Call 9526155846. No email is printed on this poster.",
    ),
    direct(
        "willmount-operations-assistant-kakkanad",
        "willmount",
        "Operations Assistant",
        "Kakkanad, Kochi",
        experience="experienced",
        experience_range="Hospitality experience or knowledge preferred",
        email="hr@willmount.com",
        phone="+91 9072120111",
        salary="As per industry standards",
        tags=["Hospitality", "Kochi"],
        work_details=(
            "Operations Assistant at willmount, Kakkanad, Kochi. Salary as per industry standards. "
            "Experience in the hospitality industry, or knowledge of hospitality, is preferred."
        ),
        requirements=["Kakkanad, Kochi", "Hospitality experience or knowledge preferred"],
        how="Email hr@willmount.com or call +91 9072120111.",
    ),
    direct(
        "capkon-front-office-executive-kozhikode",
        "Capkon",
        "Front Office Executive",
        "Kozhikode, Keralam",
        experience="both",
        experience_range="0–1 year in front office operations",
        email="career@capkon.in",
        phone="+91 9037 100 785",
        tags=["Front Office", "Calicut"],
        work_details=(
            "Front Office Executive at Capkon, Kozhikode. Any graduate, fluent in Malayalam and English. "
            "0–1 year in front office operations. Duties printed: front desk, visitor management, calls, and administrative support."
        ),
        requirements=["Any graduate", "Malayalam and English", "0–1 year front office", "Kozhikode"],
        how="WhatsApp +91 9037 100 785 or email career@capkon.in.",
    ),
    direct(
        "asianet-sales-associate-kottarakara",
        "Asianet Cable Fiber Enterprise",
        "Sales Associate",
        "Kottarakara, Kollam",
        experience="both",
        experience_range="Plus 2, graduation, or MBA",
        email="aneeshpg@asianet.co.in",
        phone="8589011328 / 8086011107",
        tags=["Sales", "Telecom", "Kollam"],
        work_details="Sales Associate for broadband sales at Asianet Cable Fiber Enterprise, Kottarakara, Kollam. Qualification: Plus 2, graduation, or MBA.",
        requirements=["Plus 2, graduation, or MBA", "Broadband sales", "Kottarakara, Kollam"],
        how="Call 8589011328 or 8086011107. Email aneeshpg@asianet.co.in or rejiths@asianet.co.in.",
    ),
    direct(
        "truequest-academic-counsellor",
        "TrueQuest Learning",
        "Academic Counsellor",
        "Wayanad and Calicut",
        experience="both",
        experience_range="Any degree",
        email="info@truequestlearning.com",
        phone="9747003913",
        tags=["Education", "Counselling"],
        work_details=(
            "Academic Counsellor at TrueQuest Learning, Wayanad and Calicut. Any degree. "
            "Good communication, interpersonal skills, interest in student counselling and career guidance, "
            "and ability to explain courses and career opportunities."
        ),
        requirements=["Any degree", "Communication and counselling skills", "Wayanad or Calicut"],
        how="Email info@truequestlearning.com or call 9747003913.",
    ),
    direct(
        "brd-pro-cum-driver-chalakudy",
        "BRD Car World Limited",
        "PRO cum Driver",
        "Thalore, Chalakudy, Thrissur",
        experience="both",
        experience_range="1–2 years · Freshers can also apply",
        email="hiran@brdcarworld.com",
        phone="8138913230",
        salary="₹15,000 plus incentive",
        tags=["Automobile", "Thrissur"],
        work_details=(
            "PRO cum Driver at BRD Car World Limited, Maruti Suzuki Arena, Thalore, Chalakudy, Thrissur. "
            "Male. Experience 1–2 years; freshers can also apply. SSLC or Plus Two. 4-wheeler licence is mandatory. "
            "Salary printed as 15k plus incentive."
        ),
        requirements=["Male", "SSLC or Plus Two", "4-wheeler licence mandatory", "1–2 years; freshers can apply", "Thalore, Chalakudy"],
        how="Call 8138913230 or email hiran@brdcarworld.com.",
    ),
    direct(
        "sunrise-nursing-walkin-kakkanad",
        "Sunrise Hospitals",
        "Walk-in Interview – Nursing",
        "Kakkanad, Kochi",
        experience="experienced",
        experience_range="Experienced candidates · every Wednesday",
        phone="+91 977 8690 720",
        apply_link="tel:+919778690720",
        tags=["Healthcare", "Nursing", "Walk-in", "Kochi"],
        work_details=(
            "Sunrise Hospitals, Kakkanad, Kochi, holds a walk-in nursing interview every Wednesday for experienced candidates. "
            "Address printed: Seaport–Airport Road, Thrikkakara, Kakkanad, Kochi. "
            "Also printed: 0484 416 000 and 0484 266 000."
        ),
        requirements=["Experienced candidates", "Every Wednesday", "Kakkanad, Kochi"],
        how="Call +91 977 8690 720. Hospital numbers also printed: 0484 416 000 and 0484 266 000.",
    ),
]


def main() -> None:
    for job in JOBS:
        if "Walk-in" in job["roles"][0]:
            job["isWalkIn"] = True
    n = mod.insert_jobs(ROOT / "data" / "jobs-data.js", "JOBS", JOBS)
    print(f"Added {n} WhatsApp jobs to jobs-data.js")


if __name__ == "__main__":
    main()
