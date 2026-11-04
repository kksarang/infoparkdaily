/* Interview question bank — additional non-IT fields.
   Row format: [level, question, sample answer]  level: "f" fresher · "e" experienced · "b" both */

export const NONIT = [
  {
    id: "banking",
    name: "Banking & financial services",
    group: "Business & finance",
    round: "Role-based",
    intro: "For bank PO/clerk, relationship manager, loan officer and BFSI operations roles.",
    qs: [
      ["f", "What is CASA?", "Current Account and Savings Account deposits. They are a low-cost source of funds for a bank, so a higher CASA ratio usually means better margins."],
      ["f", "What is the difference between CRR and SLR?", "CRR (Cash Reserve Ratio) is the share of deposits a bank must keep as cash with the RBI. SLR (Statutory Liquidity Ratio) is the share it must hold itself in liquid assets such as cash, gold or government securities."],
      ["f", "What is the repo rate?", "The rate at which the RBI lends short-term money to banks against government securities. Changes in the repo rate influence loan and deposit rates across the economy."],
      ["f", "What is a Non-Performing Asset (NPA)?", "A loan where interest or principal has remained overdue for more than 90 days."],
      ["f", "NEFT vs RTGS vs IMPS?", "NEFT settles in half-hourly batches and has no minimum amount. RTGS is real-time, gross settlement for ₹2 lakh and above. IMPS is instant and available 24×7. NEFT and RTGS have also been available 24×7 since 2019–2020."],
      ["b", "What is KYC and why is it important?", "Know Your Customer — verifying a customer’s identity and address with valid documents. It prevents fraud, money laundering and identity misuse, and it is a regulatory requirement."],
      ["b", "How would you cross-sell a product to an existing customer?", "Understand their needs first — for example, a salaried customer with a growing family may need term insurance or a recurring deposit — then explain one relevant benefit clearly, without pressure."],
      ["e", "A customer’s money was debited but the transaction failed. How do you handle it?", "Apologise, check the transaction status, raise a dispute or complaint with the reference number, explain the reversal timeline as per the bank’s and RBI’s turnaround rules, and follow up until it is resolved."],
      ["e", "How do you meet monthly targets ethically?", "Build a pipeline from existing customers and referrals, match products to real needs, keep follow-ups disciplined and never mis-sell — complaints and mis-selling cost more than a missed target."]
    ]
  },
  {
    id: "business-analyst",
    name: "Business analyst",
    group: "Business & finance",
    round: "Role-based",
    intro: "For business analyst, functional consultant and product analyst roles.",
    qs: [
      ["f", "What does a business analyst do?", "Bridges business and technology: understands problems, gathers and documents requirements, works with developers and testers, and checks that the delivered solution meets the business need."],
      ["f", "What is a user story? Give an example.", "A short requirement from the user’s view: “As a job seeker, I want to save jobs so that I can apply later.” It is paired with acceptance criteria."],
      ["f", "How do you write acceptance criteria?", "Often in Given/When/Then form: “Given I am logged in, when I tap the heart on a job, then it appears in my saved jobs.”"],
      ["b", "BRD vs FRD?", "A BRD (Business Requirements Document) describes what the business needs and why. An FRD (Functional Requirements Document) describes how the system should behave to meet those needs."],
      ["b", "Which requirement-gathering techniques do you use?", "Stakeholder interviews, workshops, observation, surveys, document analysis and prototyping — choosing based on the stakeholders and the problem."],
      ["b", "What is MoSCoW prioritisation?", "Classifying requirements as Must have, Should have, Could have and Won’t have (this time)."],
      ["e", "How do you handle conflicting requirements from two stakeholders?", "Bring them together, clarify the underlying goals, show the impact and trade-offs with data, and escalate to the product owner or sponsor for a decision if needed — then document it."],
      ["e", "What is UAT and what is the BA’s role in it?", "User Acceptance Testing is when business users verify the solution. The BA prepares scenarios, supports users, triages issues and confirms sign-off."]
    ]
  },
  {
    id: "project-management",
    name: "Project management",
    group: "Business & finance",
    round: "Role-based",
    intro: "For project coordinator, project manager, Scrum Master and PMO roles.",
    qs: [
      ["f", "What is the triple constraint?", "Scope, time and cost. Changing one affects the others, and quality depends on balancing all three."],
      ["f", "Agile vs Waterfall?", "Waterfall moves through fixed phases in sequence and suits stable requirements. Agile delivers in short iterations with frequent feedback and suits changing requirements."],
      ["f", "What are the roles in Scrum?", "Product Owner (what to build and priorities), Scrum Master (process and removing blockers) and the Developers (building the increment)."],
      ["b", "What is the critical path?", "The longest sequence of dependent tasks in a project. Any delay on it delays the whole project."],
      ["b", "What is a RAID log?", "A tracker for Risks, Assumptions, Issues and Dependencies, reviewed regularly with the team."],
      ["b", "How do you track project progress?", "Milestones and burn-down or burn-up charts, regular stand-ups and status reports, budget versus actuals, and a clear risk register."],
      ["e", "Your project is slipping two weeks. What do you do?", "Find the cause, assess impact, look at options (re-sequencing, adding people, reducing scope), agree a recovery plan with stakeholders early and communicate the new dates honestly."],
      ["e", "How do you manage scope creep?", "Baseline the scope, route every new request through change control with impact on time and cost, and get sign-off before work starts."]
    ]
  },
  {
    id: "front-office",
    name: "Front office & receptionist",
    group: "Office & support",
    round: "Role-based",
    intro: "For receptionist, front desk executive and office coordinator roles.",
    qs: [
      ["f", "How do you answer a business phone call?", "Answer within a few rings, greet with the company name and your name, listen, note the caller’s name, number and purpose, and transfer or promise a callback."],
      ["f", "How do you handle a visitor who arrives without an appointment?", "Greet politely, note their details and purpose, check with the concerned person, and either guide them, offer a waiting area or schedule a time."],
      ["f", "What tools do you use for front office work?", "MS Excel/Word, email and calendars, a visitor register or visitor management system, and the company’s phone (EPABX) system."],
      ["b", "Several calls and a visitor arrive at once. What do you do?", "Acknowledge the visitor with a smile, answer the call briefly and place it on hold or take a message, then attend to the visitor — no one should feel ignored."],
      ["b", "How do you handle confidential information at the desk?", "Share details only with authorised people, keep registers and screens out of view, and never discuss staff or client matters with visitors."],
      ["e", "How would you improve the front office process?", "Introduce a digital visitor log, standard call scripts, a shared calendar for meeting rooms and a simple FAQ for common visitor questions."]
    ]
  },
  {
    id: "graphic-design",
    name: "Graphic design",
    group: "Marketing & creative",
    round: "Role-based",
    intro: "For graphic designer, visual designer and social media designer roles.",
    qs: [
      ["f", "RGB vs CMYK?", "RGB (red, green, blue) is for screens. CMYK (cyan, magenta, yellow, black) is for print. Design print files in CMYK to avoid colour shifts."],
      ["f", "Raster vs vector graphics?", "Raster images (JPG, PNG) are made of pixels and blur when enlarged. Vector graphics (SVG, AI, EPS) use paths and scale without losing quality — ideal for logos."],
      ["f", "What resolution do you use for print?", "Usually 300 DPI at the final print size; screens typically need far less."],
      ["b", "What makes a design effective?", "A clear hierarchy, readable typography, consistent spacing and alignment, purposeful colour, and a message that fits the audience and brand."],
      ["b", "Which tools do you use?", "Adobe Photoshop and Illustrator, InDesign for layouts, Figma for UI and collaboration, and Canva for quick social posts — name the ones you can show work in."],
      ["b", "How do you handle feedback you disagree with?", "Understand the goal behind the feedback, explain your reasoning briefly, offer an alternative or a quick A/B version, and respect the final brand decision."],
      ["e", "How do you maintain brand consistency across a team?", "Use a brand guide with logo rules, colours, typography and templates, keep shared libraries in Figma or Creative Cloud, and review outputs before publishing."]
    ]
  },
  {
    id: "mechanical",
    name: "Mechanical engineering",
    group: "Core engineering",
    round: "Role-based",
    intro: "For design, production, maintenance and quality engineer roles.",
    qs: [
      ["f", "Define stress and strain.", "Stress is internal force per unit area (N/mm²). Strain is the change in length divided by the original length (no unit)."],
      ["f", "State Hooke’s law.", "Within the elastic limit, stress is directly proportional to strain. The constant of proportionality is Young’s modulus."],
      ["f", "What is the factor of safety?", "The ratio of the material’s failure (ultimate or yield) stress to the allowable working stress — a margin for uncertainty."],
      ["f", "Two-stroke vs four-stroke engine?", "A two-stroke engine completes a power cycle in one crankshaft revolution; a four-stroke needs two revolutions. Four-strokes are generally more fuel-efficient and cleaner; two-strokes are simpler and lighter."],
      ["b", "Welding vs brazing vs soldering?", "Welding melts the base metals to join them. Brazing uses a filler that melts above about 450 °C without melting the base metal. Soldering uses a filler that melts below about 450 °C."],
      ["b", "Which CAD tools have you used?", "Name what you can demonstrate — AutoCAD for 2D drafting, SolidWorks, CATIA or Creo for 3D modelling — and describe a part you designed."],
      ["e", "Preventive vs predictive maintenance?", "Preventive maintenance is time-based (servicing every N hours). Predictive maintenance uses condition data — vibration, temperature, oil analysis — to service only when needed."],
      ["e", "How do you find the root cause of a recurring defect?", "Collect data, use tools like 5 Whys and a fishbone (Ishikawa) diagram, verify the cause with trials, fix it, and add controls so it doesn’t recur."]
    ]
  },
  {
    id: "civil",
    name: "Civil engineering",
    group: "Core engineering",
    round: "Role-based",
    intro: "For site engineer, structural, quantity surveying and planning roles.",
    qs: [
      ["f", "What does M20 grade concrete mean?", "Concrete with a characteristic compressive strength of 20 N/mm² at 28 days. Its nominal mix is commonly 1 : 1.5 : 3 (cement : sand : aggregate)."],
      ["f", "What does a slump test measure?", "The workability (consistency) of fresh concrete."],
      ["f", "Why is curing important?", "It keeps concrete moist so cement hydrates properly, improving strength and durability and reducing cracks. For ordinary Portland cement, at least 7 days of curing is the common minimum."],
      ["f", "One-way vs two-way slab?", "If the longer span divided by the shorter span is more than 2, the slab bends mainly in one direction (one-way). Otherwise it spans both ways (two-way)."],
      ["b", "Which software have you used?", "AutoCAD for drawings, STAAD.Pro or ETABS for structural analysis, Revit for BIM, and MS Project or Primavera for planning — mention projects you used them on."],
      ["b", "How do you ensure quality on site?", "Inspection checklists, material testing (cube tests, sieve analysis), checking reinforcement before pouring, following approved drawings and keeping records."],
      ["e", "How do you control project cost on site?", "Track quantities against the BOQ, control material wastage, monitor labour productivity, raise variations promptly and review budget versus actuals every week."]
    ]
  },
  {
    id: "electrical",
    name: "Electrical & electronics",
    group: "Core engineering",
    round: "Role-based",
    intro: "For electrical, maintenance, electronics and instrumentation roles.",
    qs: [
      ["f", "State Ohm’s law.", "Voltage equals current multiplied by resistance (V = I × R), at constant temperature."],
      ["f", "AC vs DC?", "AC changes direction periodically; DC flows in one direction. India’s mains supply is about 230 V at 50 Hz."],
      ["f", "What is power factor?", "The ratio of real power (kW) to apparent power (kVA). A low power factor wastes capacity; it is commonly improved with capacitor banks."],
      ["f", "MCB vs RCCB?", "An MCB protects against overload and short circuit. An RCCB detects earth leakage current and protects people from electric shock."],
      ["b", "Star vs delta connection?", "In star, line voltage = √3 × phase voltage and line current = phase current. In delta, line voltage = phase voltage and line current = √3 × phase current."],
      ["b", "Why doesn’t a transformer work on DC?", "It works by mutual induction, which needs a changing magnetic flux. DC produces a constant flux, so no voltage is induced — and the winding can overheat."],
      ["e", "What safety steps do you follow before maintenance?", "Isolate the supply, apply lockout/tagout, test for absence of voltage, use proper PPE, and follow the permit-to-work system."],
      ["e", "What is a PLC and where have you used one?", "A Programmable Logic Controller automates machines using inputs, logic and outputs (often ladder logic). Explain a sequence you programmed or troubleshot."]
    ]
  },
  {
    id: "nursing",
    name: "Nursing & healthcare",
    group: "Healthcare & education",
    round: "Role-based",
    intro: "For staff nurse, clinical and hospital roles.",
    qs: [
      ["f", "What are normal adult vital signs?", "Temperature about 36.5–37.5 °C, pulse 60–100 beats per minute, respiration 12–20 breaths per minute, and blood pressure around 120/80 mmHg or slightly below."],
      ["f", "What are the ‘rights’ of medication administration?", "Right patient, right drug, right dose, right route and right time — plus right documentation."],
      ["f", "What are the WHO ‘5 moments’ for hand hygiene?", "Before touching a patient, before a clean/aseptic procedure, after body-fluid exposure risk, after touching a patient, and after touching patient surroundings."],
      ["f", "What is triage?", "Sorting patients by the urgency of their condition so the most critical are treated first."],
      ["b", "How do you handle an anxious or aggressive patient or relative?", "Stay calm, listen, acknowledge their concern, explain clearly what is happening, keep yourself safe, and involve a senior or security if needed."],
      ["b", "How do you hand over a patient at shift change?", "Use a structured format such as SBAR (Situation, Background, Assessment, Recommendation) and cover pending medicines, investigations and concerns."],
      ["e", "What do you do if you make a medication error?", "Ensure the patient is safe, inform the doctor immediately, monitor the patient, document accurately, and report it through the incident reporting system."]
    ]
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    group: "Healthcare & education",
    round: "Role-based",
    intro: "For pharmacist, pharmacy assistant and medical representative roles.",
    qs: [
      ["f", "Generic vs branded medicine?", "A generic contains the same active ingredient, strength and dosage form as the branded original and is usually cheaper."],
      ["f", "How do you store medicines correctly?", "Follow the label: room temperature, refrigerated (often 2–8 °C) or protected from light; keep stock in FEFO order (first expiry, first out) and check expiry dates regularly."],
      ["f", "What is a prescription-only medicine?", "A medicine that may be sold only against a valid prescription from a registered medical practitioner."],
      ["b", "What do you check before dispensing a prescription?", "Patient details, prescriber details and signature, drug name, strength, dose, frequency, duration, possible interactions and allergies — and clarify anything unclear with the doctor."],
      ["b", "How do you counsel a patient on a new medicine?", "Explain what it is for, how and when to take it, common side effects, what to avoid, and when to see the doctor — then check they understood."],
      ["e", "How do you reduce dispensing errors?", "Double-check look-alike/sound-alike drugs, keep them apart, use barcode or second-person checks, and maintain a calm, organised dispensing area."]
    ]
  },
  {
    id: "teaching",
    name: "Teaching & training",
    group: "Healthcare & education",
    round: "Role-based",
    intro: "For school teacher, tutor, trainer and academic coordinator roles.",
    qs: [
      ["f", "What goes into a lesson plan?", "Learning objectives, materials, an introduction or hook, teaching activities, checks for understanding, assessment and a closing summary or homework."],
      ["f", "Formative vs summative assessment?", "Formative assessment checks learning during the course (quizzes, questions) to adjust teaching. Summative assessment measures learning at the end (final exams, projects)."],
      ["f", "What is Bloom’s taxonomy?", "A hierarchy of learning levels: remember, understand, apply, analyse, evaluate and create — used to design questions and activities."],
      ["b", "How do you manage a class with mixed abilities?", "Differentiate: group tasks by level, give extension work to fast learners, extra support and examples to others, and use peer learning."],
      ["b", "How do you engage a student who has lost interest?", "Talk privately to find the reason, connect the topic to their interests, give small achievable tasks with quick praise, and involve parents if needed."],
      ["e", "How do you handle a complaint from a parent?", "Listen fully, stay calm, share facts and the student’s work, agree a plan together and follow up on progress."],
      ["e", "How do you use technology in teaching?", "Presentations and short videos for concepts, quizzes (e.g. Google Forms or Kahoot) for quick checks, and a learning platform for assignments and feedback."]
    ]
  },
  {
    id: "hospitality",
    name: "Hotel & hospitality",
    group: "Hospitality, retail & logistics",
    round: "Role-based",
    intro: "For front office, F&B service, housekeeping and guest relations roles.",
    qs: [
      ["f", "How do you handle a guest complaint?", "Use LAST: Listen, Apologise, Solve, Thank — then follow up to make sure the guest is satisfied."],
      ["f", "What is the check-in process?", "Greet the guest, verify the booking and ID, complete registration, confirm the rate and stay details, take the deposit or payment as per policy, issue the key and explain facilities."],
      ["f", "What is the food-safety ‘danger zone’?", "Roughly 5 °C to 60 °C, where bacteria grow fastest. Keep cold food cold and hot food hot."],
      ["b", "What are ADR and RevPAR?", "ADR (Average Daily Rate) = room revenue ÷ rooms sold. RevPAR (Revenue per Available Room) = room revenue ÷ rooms available, or ADR × occupancy."],
      ["b", "A guest arrives but the hotel is overbooked. What do you do?", "Apologise, offer an upgrade if available, otherwise arrange a comparable nearby hotel with transport at the hotel’s cost, and follow the property’s policy."],
      ["e", "How would you improve guest review scores?", "Analyse review themes, fix recurring issues (cleanliness, check-in time), train staff on service standards, and respond to every review professionally."]
    ]
  },
  {
    id: "retail",
    name: "Retail & store operations",
    group: "Hospitality, retail & logistics",
    round: "Role-based",
    intro: "For retail sales associate, store manager and visual merchandising roles.",
    qs: [
      ["f", "Upselling vs cross-selling?", "Upselling offers a higher-value version of the item. Cross-selling offers a related item, such as a case with a phone."],
      ["f", "How do you approach a customer in a store?", "Greet within a few seconds, ask an open question about what they need, listen, and recommend options without pressure."],
      ["f", "What is shrinkage?", "Loss of inventory from theft, damage, errors or fraud — controlled with audits, security and accurate billing."],
      ["b", "What is visual merchandising?", "Arranging products and displays to attract customers and increase sales — eye-level placement, themed displays, clear signage and clean aisles."],
      ["b", "How do you handle a return without a receipt?", "Follow store policy politely; if allowed, offer an exchange or store credit, and escalate to the supervisor when needed."],
      ["e", "Which store KPIs do you track?", "Sales versus target, footfall, conversion rate, average bill value, units per transaction, shrinkage and stock availability."]
    ]
  },
  {
    id: "logistics",
    name: "Logistics & supply chain",
    group: "Hospitality, retail & logistics",
    round: "Role-based",
    intro: "For warehouse, procurement, logistics coordinator and supply chain roles.",
    qs: [
      ["f", "FIFO vs FEFO?", "FIFO (first in, first out) dispatches the oldest stock first. FEFO (first expiry, first out) dispatches the stock that expires soonest — essential for food and medicines."],
      ["f", "What is lead time?", "The time between placing an order and receiving the goods."],
      ["f", "What is an e-way bill?", "An electronic document under GST required for moving goods worth more than ₹50,000 (some states set different thresholds for movement within the state)."],
      ["b", "What is inventory turnover?", "Cost of goods sold ÷ average inventory. A higher turnover means stock moves faster."],
      ["b", "FOB vs CIF?", "Under FOB the buyer arranges the main freight and insurance, and risk passes once goods are loaded on the vessel. Under CIF the seller pays cost, insurance and freight to the destination port, but risk still passes at loading."],
      ["b", "What is a WMS?", "A Warehouse Management System that tracks stock locations, receiving, put-away, picking, packing and dispatch."],
      ["e", "How would you reduce logistics costs?", "Consolidate shipments, optimise routes, negotiate carrier rates, improve load utilisation, reduce damages and returns, and track cost per shipment."]
    ]
  }
];
