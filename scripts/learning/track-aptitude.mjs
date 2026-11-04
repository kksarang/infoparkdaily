/* Aptitude & reasoning — original InfoparkDaily lessons with worked examples (no code). */

const W = (q, steps, ans) =>
  `<div class="ln-worked"><p class="ln-worked-q"><strong>Example:</strong> ${q}</p><ol>${steps.map((s) => `<li>${s}</li>`).join("")}</ol><p class="ln-worked-a"><strong>Answer:</strong> ${ans}</p></div>`;

export const APT_TRACK = {
  key: "aptitude",
  name: "Aptitude",
  long: "Aptitude & reasoning — placement and recruitment tests",
  color: "#b45309",
  tagline: "Quant, logical reasoning and shortcuts.",
  level: "Beginner",
  lang: "none",
  feature: "Worked examples + shortcuts",
  heroLine: "Every lesson has formulas, step-by-step worked examples and a practice question with answer",
  lessons: [
    {
      slug: "percentages",
      title: "Percentages",
      summary: "Percent basics, fraction shortcuts, increase/decrease and successive changes.",
      body: `<p>“Per cent” means “out of 100”. Most company aptitude rounds (TCS, Infosys, UST, campus drives) open with percentage questions because they underpin profit, interest and data interpretation.</p>
<h3>Key facts</h3>
<ul>
<li>x% of y = <code>x × y / 100</code> — and x% of y = y% of x (8% of 50 = 50% of 8 = 4).</li>
<li>Fraction shortcuts: 50% = ½, 25% = ¼, 20% = ⅕, 12.5% = ⅛, 33⅓% = ⅓, 16⅔% = ⅙.</li>
<li>Increase by r%: multiply by <code>(1 + r/100)</code>. Decrease by r%: multiply by <code>(1 − r/100)</code>.</li>
<li>Successive changes a% and b%: net change = <code>a + b + ab/100</code> (use negative values for decreases).</li>
<li>If A is r% more than B, then B is <code>r/(100 + r) × 100</code>% less than A.</li>
</ul>
${W("A salary of ₹40,000 is increased by 10% and then reduced by 10%. What is the final salary?", ["Net change = 10 + (−10) + (10 × −10)/100 = −1%.", "Final = 40,000 × 0.99."], "₹39,600 — a 1% fall, not back to ₹40,000.")}
${W("Anu's marks are 25% more than Rahul's. By what percent are Rahul's marks less than Anu's?", ["Use r/(100 + r) × 100 with r = 25.", "25/125 × 100 = 20."], "20% less.")}`,
      points: ["Convert common percentages to fractions for speed.", "Successive change: a + b + ab/100.", "‘More than’ and ‘less than’ use different bases."],
      practice: "A town's population of 50,000 grows 10% in year one and 20% in year two. What is it after two years?",
      practiceAnswer: "50,000 × 1.1 × 1.2 = 66,000 (net growth 10 + 20 + 2 = 32%).",
      quiz: { q: "A price rises 20% and then falls 20%. The net change is…", options: ["0%", "4% decrease", "4% increase", "2% decrease"], answer: 1, why: "20 − 20 + (20 × −20)/100 = −4%." },
      interview: [
        ["How do you find what percent 45 is of 180?", "45/180 × 100 = 25%. Spot it faster: 45 is a quarter of 180."],
        ["Why isn't a 50% loss recovered by a 50% gain?", "The gain is calculated on the smaller amount: 100 → 50 → 75. You need a 100% gain to get back to 100."]
      ]
    },
    {
      slug: "profit-loss",
      title: "Profit, loss & discount",
      summary: "Cost price, selling price, marked price and discount calculations.",
      body: `<ul>
<li><strong>CP</strong> = cost price, <strong>SP</strong> = selling price, <strong>MP</strong> = marked (list) price.</li>
<li>Profit = SP − CP; Profit % = <code>Profit / CP × 100</code> (always on CP).</li>
<li>SP = CP × (1 + profit%/100); SP = CP × (1 − loss%/100).</li>
<li>Discount is on MP: SP = MP × (1 − discount%/100).</li>
<li>Successive discounts a% and b% equal a single discount of <code>a + b − ab/100</code>.</li>
<li>Selling two items at the same SP, one at x% profit and one at x% loss, always gives a loss of <code>x²/100</code>%.</li>
</ul>
${W("A laptop bought for ₹40,000 is sold for ₹46,000. Find the profit percent.", ["Profit = 46,000 − 40,000 = ₹6,000.", "Profit % = 6,000 / 40,000 × 100."], "15%")}
${W("A shop marks a phone at ₹20,000 and gives successive discounts of 10% and 5%. What does the customer pay?", ["Single equivalent discount = 10 + 5 − 50/100 = 14.5%.", "SP = 20,000 × (1 − 0.145) = 20,000 × 0.855."], "₹17,100")}`,
      points: ["Profit/loss % is on cost price.", "Discount % is on marked price.", "Same SP, x% gain and x% loss → x²/100 % loss overall."],
      practice: "A trader marks goods 40% above cost and gives a 25% discount. Find his profit or loss percent.",
      practiceAnswer: "Take CP = 100 → MP = 140 → SP = 140 × 0.75 = 105. Profit = 5%.",
      quiz: { q: "Two discounts of 20% and 10% equal a single discount of…", options: ["30%", "28%", "25%", "32%"], answer: 1, why: "20 + 10 − (20 × 10)/100 = 28%." },
      interview: [
        ["If CP of 12 items equals SP of 10 items, what is the profit %?", "Let each CP = 1: CP of 10 items = 10, SP of 10 items = 12. Profit = 2/10 × 100 = 20%."],
        ["Is a 10% markup followed by a 10% discount break-even?", "No: 100 → 110 → 99, a 1% loss."]
      ]
    },
    {
      slug: "ratios",
      title: "Ratio, proportion & partnership",
      summary: "Simplifying and combining ratios, dividing amounts and sharing profit.",
      body: `<ul>
<li>A ratio <code>a : b</code> compares quantities; simplify by dividing both by their HCF.</li>
<li>To divide an amount S in ratio a : b, the parts are <code>S × a/(a+b)</code> and <code>S × b/(a+b)</code>.</li>
<li>Combine A:B and B:C by making B equal in both (multiply to a common value).</li>
<li>Proportion: a : b = c : d means <code>a × d = b × c</code>.</li>
<li><strong>Partnership</strong>: profit is shared in the ratio of <code>capital × time</code> for each partner.</li>
</ul>
${W("A : B = 2 : 3 and B : C = 4 : 5. Find A : B : C.", ["Make B equal: 2 : 3 becomes 8 : 12 (×4) and 4 : 5 becomes 12 : 15 (×3).", "Combine with B = 12."], "8 : 12 : 15")}
${W("Asha invests ₹60,000 for 12 months and Binu invests ₹90,000 for 8 months. Out of a profit of ₹50,000, what is Asha's share?", ["Asha: 60,000 × 12 = 7,20,000. Binu: 90,000 × 8 = 7,20,000.", "Ratio = 1 : 1."], "₹25,000")}`,
      points: ["Divide S in a:b → S×a/(a+b).", "Match the common term to combine ratios.", "Partnership share ∝ capital × time."],
      practice: "₹7,200 is divided among P, Q and R in the ratio 3 : 4 : 5. How much does R get?",
      practiceAnswer: "Total parts = 12; R = 7,200 × 5/12 = ₹3,000.",
      quiz: { q: "Divide ₹900 in the ratio 4 : 5. The larger share is…", options: ["₹400", "₹450", "₹500", "₹540"], answer: 2, why: "900 × 5/9 = 500." },
      interview: [
        ["The ratio of boys to girls is 3:2 with 40 girls. How many students?", "One part = 40/2 = 20; total = 5 parts = 100."],
        ["What is the fourth proportional to 4, 9 and 12?", "4 : 9 = 12 : x → x = 9 × 12 / 4 = 27."]
      ]
    },
    {
      slug: "averages",
      title: "Averages & mixtures",
      summary: "Average formula, effect of adding/removing items, and weighted averages.",
      body: `<ul>
<li>Average = <code>sum of values / number of values</code>, so Sum = Average × Count.</li>
<li>Adding a value above the average raises it; the change in average = <code>(new value − old average) / new count</code>.</li>
<li>Weighted average of groups: <code>(n₁a₁ + n₂a₂) / (n₁ + n₂)</code>.</li>
<li>Average of consecutive numbers = average of the first and last.</li>
<li><strong>Alligation</strong> (mixing two prices to get a mean): ratio = <code>(dearer − mean) : (mean − cheaper)</code> for cheaper : dearer.</li>
</ul>
${W("The average age of 10 employees is 28. When the manager joins, the average becomes 29. Find the manager's age.", ["Old sum = 10 × 28 = 280.", "New sum = 11 × 29 = 319.", "Manager = 319 − 280."], "39 years")}
${W("In what ratio must rice at ₹40/kg be mixed with rice at ₹60/kg to get a mixture worth ₹45/kg?", ["Cheaper : dearer = (60 − 45) : (45 − 40) = 15 : 5."], "3 : 1")}`,
      points: ["Sum = Average × Count — work with sums.", "Weighted average for groups of different sizes.", "Alligation gives mixing ratios quickly."],
      practice: "A batsman's average over 20 innings is 42. How many runs must he score in the 21st innings to raise his average to 44?",
      practiceAnswer: "Needed sum = 21 × 44 = 924; current = 20 × 42 = 840; runs = 84.",
      quiz: { q: "Average of 5 numbers is 20. If one number 30 is removed, the new average is…", options: ["17.5", "18", "20", "22.5"], answer: 0, why: "Sum 100 − 30 = 70; 70 / 4 = 17.5." },
      interview: [
        ["Class A (30 students) averages 60, class B (20) averages 70. Combined average?", "(30×60 + 20×70) / 50 = 3200/50 = 64."],
        ["What is the average of the first 50 natural numbers?", "(1 + 50) / 2 = 25.5."]
      ]
    },
    {
      slug: "time-work",
      title: "Time & work",
      summary: "Work rates, combined work, efficiency and pipes & cisterns.",
      body: `<p>Think in <strong>rates</strong>: if A finishes a job in a days, A does <code>1/a</code> of it per day. Rates add when people work together.</p>
<ul>
<li>A and B together finish in <code>ab / (a + b)</code> days.</li>
<li><strong>LCM method</strong>: take total work = LCM of the days, find each person's units per day — avoids fractions.</li>
<li>If A is twice as efficient as B, A takes half the time.</li>
<li>Pipes & cisterns: filling pipes add, emptying pipes (leaks) subtract.</li>
</ul>
${W("A can finish a project in 12 days and B in 18 days. How long together?", ["Total work = LCM(12, 18) = 36 units.", "A = 3 units/day, B = 2 units/day → 5 units/day.", "36 / 5 = 7.2 days."], "7.2 days (that is, 7⅕ days)")}
${W("A tank fills in 6 hours, but a leak empties a full tank in 12 hours. How long to fill with the leak open?", ["Total = LCM(6, 12) = 12 units.", "Fill = +2/hr, leak = −1/hr → net 1 unit/hr."], "12 hours")}`,
      points: ["Work per day = 1 / days.", "LCM method avoids fractions.", "Leaks are negative rates."],
      practice: "A and B together finish a job in 10 days; A alone takes 15 days. How long will B take alone?",
      practiceAnswer: "Total = LCM(10, 15) = 30 units; A+B = 3/day, A = 2/day → B = 1/day → 30 days.",
      quiz: { q: "A does a job in 10 days and B in 15 days. Together they take…", options: ["5 days", "6 days", "12.5 days", "25 days"], answer: 1, why: "10 × 15 / (10 + 15) = 150 / 25 = 6." },
      interview: [
        ["If 6 people build a wall in 8 days, how many days for 12 people?", "Person-days = 48; 48 / 12 = 4 days (assuming equal efficiency)."],
        ["How do you handle 'A works for 3 days and then leaves'?", "Subtract the work done in those days from the total, then divide the remaining work by the remaining people's combined rate."]
      ]
    },
    {
      slug: "speed-distance",
      title: "Time, speed & distance",
      summary: "Speed formula, unit conversion, average speed, relative speed and trains.",
      body: `<ul>
<li><code>Distance = Speed × Time</code>.</li>
<li>km/h → m/s: multiply by <code>5/18</code>; m/s → km/h: multiply by <code>18/5</code>.</li>
<li>Average speed for equal distances at speeds a and b = <code>2ab / (a + b)</code> — not (a+b)/2.</li>
<li><strong>Relative speed</strong>: opposite directions add, same direction subtract.</li>
<li>A train crossing a pole covers its own length; crossing a platform covers train + platform length.</li>
<li>Boats: downstream = boat + stream; upstream = boat − stream.</li>
</ul>
${W("A bus goes from Kochi to Thrissur at 60 km/h and returns at 40 km/h. Find the average speed.", ["Equal distances → 2ab/(a+b).", "2 × 60 × 40 / 100 = 4800/100."], "48 km/h")}
${W("A 200 m train runs at 72 km/h. How long does it take to cross a 300 m platform?", ["Speed = 72 × 5/18 = 20 m/s.", "Distance = 200 + 300 = 500 m.", "Time = 500 / 20."], "25 seconds")}`,
      points: ["Convert units first (×5/18).", "Equal distances: average speed = 2ab/(a+b).", "Opposite directions add speeds; same direction subtract."],
      practice: "Two trains 150 m and 100 m long run in opposite directions at 54 km/h and 36 km/h. How long to cross each other?",
      practiceAnswer: "Relative speed = 90 km/h = 25 m/s; distance = 250 m; time = 10 seconds.",
      quiz: { q: "54 km/h equals…", options: ["12 m/s", "15 m/s", "18 m/s", "20 m/s"], answer: 1, why: "54 × 5/18 = 15 m/s." },
      interview: [
        ["Why isn't average speed simply the mean of two speeds?", "You spend more time at the slower speed, so it carries more weight. Use total distance / total time."],
        ["A man walks at 5 km/h and reaches 10 minutes late; at 6 km/h he is 5 minutes early. Distance?", "Time difference 15 min = ¼ h. d/5 − d/6 = ¼ → d/30 = ¼ → d = 7.5 km."]
      ]
    },
    {
      slug: "interest",
      title: "Simple & compound interest",
      summary: "SI and CI formulas, compounding periods and the CI − SI shortcut.",
      body: `<ul>
<li><strong>Simple interest</strong>: <code>SI = P × R × T / 100</code>; amount = P + SI.</li>
<li><strong>Compound interest</strong>: <code>A = P (1 + R/100)ᵀ</code>; CI = A − P.</li>
<li>Half-yearly compounding: use R/2 and 2T; quarterly: R/4 and 4T.</li>
<li>For 2 years, <code>CI − SI = P (R/100)²</code>.</li>
<li>Money doubles under SI in <code>100 / R</code> years; under CI roughly <code>72 / R</code> years (rule of 72).</li>
</ul>
${W("Find the simple interest on ₹25,000 at 8% per year for 3 years.", ["SI = 25,000 × 8 × 3 / 100."], "₹6,000")}
${W("Find the compound interest on ₹10,000 at 10% per year for 2 years.", ["A = 10,000 × 1.1 × 1.1 = 12,100.", "CI = 12,100 − 10,000."], "₹2,100 (SI would be ₹2,000; difference = 10,000 × 0.01 = ₹100)")}`,
      points: ["SI grows linearly; CI grows on the growing amount.", "Adjust rate and periods for half-yearly/quarterly.", "2-year CI − SI = P(R/100)²."],
      practice: "The difference between CI and SI on a sum for 2 years at 5% is ₹50. Find the sum.",
      practiceAnswer: "P × (5/100)² = 50 → P × 0.0025 = 50 → P = ₹20,000.",
      quiz: { q: "At what SI rate does money double in 8 years?", options: ["8%", "10%", "12.5%", "15%"], answer: 2, why: "Interest = principal in 8 years → R = 100/8 = 12.5%." },
      interview: [
        ["Why do banks quote an effective annual rate?", "With more frequent compounding the actual yearly growth exceeds the nominal rate; the effective rate makes products comparable."],
        ["Roughly how long to double money at 6% compound?", "Rule of 72: 72 / 6 ≈ 12 years."]
      ]
    },
    {
      slug: "number-series",
      title: "Number series & number system",
      summary: "Spotting patterns in series, divisibility rules, HCF and LCM.",
      body: `<h3>Series patterns to test, in order</h3>
<ol>
<li>Differences (and differences of differences).</li>
<li>Multiplication/division by a constant or changing factor (×2, ×3…).</li>
<li>Squares/cubes (n², n³, n² ± 1) and primes.</li>
<li>Alternating series — two interleaved patterns.</li>
</ol>
<h3>Number system essentials</h3>
<ul>
<li>Divisibility: by 3 or 9 if the digit sum is; by 4 if the last two digits are; by 8 if the last three are; by 11 if the alternating digit sum difference is 0 or a multiple of 11.</li>
<li><code>HCF × LCM = product of the two numbers</code>.</li>
<li>LCM is used for “when will events coincide” questions; HCF for “largest equal groups”.</li>
</ul>
${W("Find the next number: 3, 7, 15, 31, 63, ?", ["Differences: 4, 8, 16, 32 (doubling).", "Next difference = 64 → 63 + 64. (Also: each term = previous × 2 + 1.)"], "127")}
${W("Three buses leave together and return every 12, 18 and 30 minutes. After how many minutes do they next leave together?", ["LCM(12, 18, 30): 12 = 2²·3, 18 = 2·3², 30 = 2·3·5.", "LCM = 2² · 3² · 5."], "180 minutes (3 hours)")}`,
      points: ["Check differences first, then ratios, then squares/cubes.", "HCF × LCM = product of two numbers.", "Digit-sum rule for 3 and 9."],
      practice: "Find the missing term: 2, 6, 12, 20, 30, ?",
      practiceAnswer: "Terms are n(n+1): 1×2, 2×3, 3×4, 4×5, 5×6 → next 6×7 = 42.",
      quiz: { q: "Next in the series 1, 4, 9, 16, 25, ?", options: ["30", "34", "36", "49"], answer: 2, why: "They are squares: 1², 2², 3², 4², 5², so 6² = 36." },
      interview: [
        ["Is 1,23,456 divisible by 3?", "Digit sum = 1+2+3+4+5+6 = 21, which is divisible by 3 — so yes."],
        ["HCF of two numbers is 6 and LCM is 72; one number is 18. Find the other.", "6 × 72 / 18 = 24."]
      ]
    },
    {
      slug: "logical-reasoning",
      title: "Logical reasoning",
      summary: "Coding-decoding, blood relations, direction sense and syllogisms.",
      body: `<h3>Coding–decoding</h3>
<p>Find the rule: letter shifts (+1, −2), reversal, or position numbers (A=1 … Z=26). Write the alphabet with positions once at the start of the test.</p>
${W("If KOCHI is coded as LPDIJ, how is PARK coded?", ["Each letter moves +1: K→L, O→P, C→D, H→I, I→J.", "P→Q, A→B, R→S, K→L."], "QBSL")}
<h3>Blood relations</h3>
<p>Draw a quick family tree: + for male, − for female, horizontal lines for siblings/spouses, vertical lines for generations.</p>
${W("Pointing to a photo, Anil says, “She is the daughter of my grandfather's only son.” How is the girl related to Anil?", ["Grandfather's only son = Anil's father.", "Daughter of Anil's father = Anil's sister."], "Sister")}
<h3>Direction sense</h3>
${W("Meera walks 6 km north, turns right and walks 8 km. How far is she from the start?", ["North then right = east: legs of 6 and 8 at right angles.", "Distance = √(6² + 8²) = √100."], "10 km, towards the north-east")}
<h3>Syllogisms</h3>
<p>Draw Venn circles for each statement and accept a conclusion only if it is true in <em>every</em> possible diagram. “All A are B” and “Some B are C” does <strong>not</strong> prove “Some A are C”.</p>`,
      points: ["Write the alphabet positions before you start.", "Draw family trees and direction sketches.", "Syllogism conclusions must hold in every Venn diagram."],
      practice: "If in a code DELHI is written as 73541 and CALCUTTA as 82589662, how is CALICUT written? (Each letter maps to a fixed digit.)",
      practiceAnswer: "From the codes: C=8, A=2, L=5, I=1, U=9, T=6. CALICUT = 8 2 5 1 8 9 6 → 8251896.",
      quiz: { q: "Facing north, you turn right, then right again, then left. Which way are you facing?", options: ["North", "East", "South", "West"], answer: 1, why: "North → right = East → right = South → left = East." },
      interview: [
        ["How do you approach a long seating-arrangement puzzle?", "Fix the most definite clue first, draw positions, place certain items, branch into cases for uncertain clues, and eliminate contradictions."],
        ["Statements: All pens are books. Some books are bags. Conclusion: Some pens are bags. Valid?", "Not necessarily — the bags may overlap only the books that are not pens, so the conclusion doesn't follow."]
      ]
    }
  ]
};
