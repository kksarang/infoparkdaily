/* Software testing / QA — original InfoparkDaily lessons. Example apps, IDs and data are fictional. */

export const TESTING_TRACK = {
  key: "testing",
  name: "Software Testing",
  long: "Software testing & QA — test cases, bug reports, test design, API testing and Selenium basics",
  color: "#15803d",
  tagline: "Start a QA career with the skills interviews check.",
  level: "Beginner",
  lang: "static",
  wrapExample: true,
  feature: "Test cases + bug reports",
  heroLine: "Real QA artefacts you can copy the format of: test cases, bug reports and scripts",
  exampleTitle: "Example",
  exampleBadge: "Practise on any app you use",
  outputTitle: "What to notice",
  exampleNote: "Apps, IDs and data are fictional examples written for practice.",
  lessons: [
    {
      slug: "what-is-testing",
      title: "What software testing is",
      summary: "Why we test, verification vs validation, and where testing fits in the SDLC and STLC.",
      body: `<p><strong>Software testing</strong> checks that software does what it should, and finds problems before users do. A tester thinks like a user, a critic and a detective at the same time.</p>
<h3>Verification vs validation</h3>
<ul>
<li><strong>Verification</strong> — "Are we building the product right?" Reviews of requirements, designs and code against specifications.</li>
<li><strong>Validation</strong> — "Are we building the right product?" Running the software to confirm it meets real user needs.</li>
</ul>
<h3>Where testing fits</h3>
<p>The <strong>SDLC</strong> (software development life cycle) covers requirements, design, development, testing, deployment and maintenance. Testing has its own life cycle, the <strong>STLC</strong>:</p>
<ol>
<li>Requirement analysis — what needs testing, and what is unclear?</li>
<li>Test planning — scope, approach, tools, schedule, risks.</li>
<li>Test case design — write cases and prepare test data.</li>
<li>Environment setup — where tests will run.</li>
<li>Test execution — run cases, log bugs, retest fixes.</li>
<li>Test closure — report results, lessons learned.</li>
</ol>
<p>Finding a defect in requirements costs far less than finding it after release, which is why good teams involve QA early ("shift left").</p>`,
      example: `Requirement: "Users can reset their password by email."

Questions a tester asks before writing a single test:
  • How long is the reset link valid?
  • What happens if the email isn't registered?
  • Can an old link be used after a new one is sent?
  • What are the password rules (length, characters)?
  • Is there a limit on reset requests per hour?`,
      output: `• Testing starts at the requirement, not after coding.
• Every unclear point becomes either a clarified requirement or a
  test case — this is "shift left" in practice.
• Asking good questions is a core QA interview skill.`,
      points: ["Testing finds problems before users do.", "Verification = built right; validation = right product.", "STLC: analyse → plan → design → set up → execute → close.", "Earlier defects are cheaper to fix."],
      practice: "Pick a feature in an app you use daily (for example UPI payment). Write ten questions you'd ask about its requirements before testing it.",
      quiz: { q: "Which question describes validation?", options: ["Are we building the product right?", "Are we building the right product?", "Is the code formatted?", "Is the build green?"], answer: 1, why: "Validation checks the product meets real user needs; verification checks it matches the specification." },
      interview: [
        ["What is the difference between QA and QC?", "QA (quality assurance) is process-focused — preventing defects through good practices. QC (quality control) is product-focused — finding defects by testing the actual product."],
        ["Why is testing needed if developers write good code?", "Everyone makes assumptions; testers bring an independent view, test unusual paths and real-user behaviour, and catch integration issues no single developer sees."]
      ]
    },
    {
      slug: "test-cases",
      title: "Writing test scenarios and test cases",
      summary: "The fields of a good test case, positive and negative cases, and a worked login example.",
      body: `<p>A <strong>test scenario</strong> is a high-level thing to test ("Verify login"). A <strong>test case</strong> is a precise, repeatable check under that scenario, written so anyone can run it and get the same result.</p>
<h3>Fields of a test case</h3>
<ul>
<li><strong>ID</strong> and <strong>title</strong></li>
<li><strong>Preconditions</strong> — what must be true before starting.</li>
<li><strong>Steps</strong> — numbered, one action each.</li>
<li><strong>Test data</strong> — exact inputs.</li>
<li><strong>Expected result</strong> — specific and checkable.</li>
<li><strong>Actual result</strong> and <strong>status</strong> (Pass / Fail / Blocked) — filled during execution.</li>
<li><strong>Priority</strong></li>
</ul>
<h3>Positive and negative cases</h3>
<p><strong>Positive</strong> cases use valid input and the expected flow. <strong>Negative</strong> cases use invalid input, missing data or wrong order — and check that the system fails gracefully with a clear message. Good suites have plenty of both.</p>`,
      example: `Scenario: Login with email and password

TC_LOGIN_01  Valid login                                   Priority: High
  Pre:   User anu@example.com exists, password "Kochi@2026"
  Steps: 1. Open /login  2. Enter email  3. Enter password  4. Click Login
  Expected: Dashboard opens; user's name shows at top right

TC_LOGIN_02  Wrong password                                Priority: High
  Steps: as above with password "kochi2026"
  Expected: Error "Email or password is incorrect"; stays on /login;
            password field cleared

TC_LOGIN_03  Empty email                                   Priority: Medium
  Expected: "Email is required" shown; no request sent

TC_LOGIN_04  5 wrong attempts                              Priority: High
  Expected: Account locked for 15 min (per requirement R-12)`,
      output: `• Each case checks one thing and has an exact expected result.
• Negative cases (02–04) outnumber the positive one — that's typical.
• The error message doesn't reveal whether the email exists — testers
  also check security behaviour like this.`,
      points: ["Scenario = what to test; case = exact steps and expected result.", "One check per test case.", "Write both positive and negative cases.", "Expected results must be specific."],
      practice: "Write six test cases (two positive, four negative) for a 'Sign up with mobile number and OTP' screen.",
      quiz: { q: "Which expected result is written best?", options: ["Login works", "System behaves correctly", "Dashboard opens and shows the user's name", "No issues"], answer: 2, why: "A good expected result is specific and checkable by anyone running the test." },
      interview: [
        ["Write test cases for a pen / lift / ATM.", "Group them: functional (does it work as intended), negative (misuse), boundary, usability, performance and safety. Interviewers check structure and coverage, not a perfect list."],
        ["What's the difference between a test scenario and a test case?", "A scenario is a high-level area to test; test cases are detailed steps, data and expected results under it."]
      ]
    },
    {
      slug: "bug-reports",
      title: "Bug life cycle and writing bug reports",
      summary: "Severity vs priority, the stages a bug moves through, and a bug report developers can act on.",
      body: `<p>A bug report is only useful if a developer can <strong>reproduce</strong> the problem quickly. Clear reports get fixed faster.</p>
<h3>Fields of a good bug report</h3>
<ul>
<li><strong>Title</strong> — what fails, where, under which condition.</li>
<li><strong>Environment</strong> — app version, browser/device, OS, test environment.</li>
<li><strong>Steps to reproduce</strong> — numbered and minimal.</li>
<li><strong>Expected</strong> vs <strong>actual</strong> result.</li>
<li><strong>Severity</strong> and <strong>priority</strong>.</li>
<li><strong>Attachments</strong> — screenshot, screen recording, logs.</li>
</ul>
<h3>Severity vs priority</h3>
<p><strong>Severity</strong> is the impact on the system (set by QA): critical, major, minor, trivial. <strong>Priority</strong> is how soon it must be fixed (usually set by the product owner). A spelling mistake in the company name on the home page is low severity but high priority; a crash in a rarely used admin report may be high severity but lower priority.</p>
<h3>Bug life cycle</h3>
<p>New → Assigned → Open (in progress) → Fixed → Retest → Closed. Side paths: Rejected (not a bug), Duplicate, Deferred (fix later) and Reopened (fix didn't work).</p>`,
      example: `BUG-2041  Cart total ignores discount when quantity changed after coupon

Environment: Web v3.8.1, Chrome 131, Windows 11, QA server
Severity: Major      Priority: High

Steps:
  1. Log in as test user qa_01
  2. Add "Steel Bottle" (₹500) to cart
  3. Apply coupon SAVE10 (10% off)  → total shows ₹450 ✔
  4. Change quantity from 1 to 2

Expected: Total ₹900 (₹1,000 − 10%)
Actual:   Total ₹1,000 — discount line disappears
Reproducible: 5/5 times
Attachments: cart-bug.mp4, console-log.txt`,
      output: `• The title says what, where and when — a developer understands it
  without opening the report.
• Steps are minimal and start from a known state (logged-in user).
• "5/5 times" and the video remove doubt about reproducibility.
• Expected vs actual uses exact values, not "wrong total".`,
      points: ["Reports must be reproducible.", "Severity = impact; priority = urgency.", "Exact expected vs actual values.", "Attach evidence: screenshots, videos, logs."],
      practice: "Find a small real bug or UX issue in any website and write a full bug report for it using the fields above.",
      quiz: { q: "A typo in the company name on the home page is usually…", options: ["High severity, low priority", "Low severity, high priority", "High severity, high priority", "Not a bug"], answer: 1, why: "It doesn't break functionality (low severity) but is highly visible and damages trust, so it is fixed quickly (high priority)." },
      interview: [
        ["The developer says your bug is 'not reproducible'. What do you do?", "Recheck the environment and data, record a video, share exact versions and logs, and if needed reproduce it together. Stay factual, not defensive."],
        ["What is a 'Deferred' bug?", "A valid bug the team agrees to fix in a later release, usually because it is low impact or the fix is risky close to a deadline."]
      ]
    },
    {
      slug: "types-of-testing",
      title: "Types of testing",
      summary: "Functional vs non-functional, smoke, sanity, regression, integration, UAT and more — with when to use each.",
      body: `<p>Testing types answer two questions: <em>what</em> are we checking, and <em>at which stage</em>?</p>
<h3>By level</h3>
<ul>
<li><strong>Unit testing</strong> — individual functions or classes, usually by developers.</li>
<li><strong>Integration testing</strong> — modules working together (for example frontend + API + database).</li>
<li><strong>System testing</strong> — the complete application against requirements.</li>
<li><strong>User acceptance testing (UAT)</strong> — real users or the client confirm it meets their needs.</li>
</ul>
<h3>Common types</h3>
<ul>
<li><strong>Smoke testing</strong> — a quick check that a new build's main features work, before deeper testing.</li>
<li><strong>Sanity testing</strong> — a narrow check that a specific fix or change works.</li>
<li><strong>Regression testing</strong> — re-running existing tests to make sure new changes didn't break old features. Prime candidate for automation.</li>
<li><strong>Exploratory testing</strong> — unscripted testing guided by the tester's experience and curiosity.</li>
</ul>
<h3>Non-functional</h3>
<p><strong>Performance</strong> (speed under load), <strong>security</strong>, <strong>usability</strong>, <strong>compatibility</strong> (browsers, devices) and <strong>accessibility</strong>.</p>
<p><strong>Black-box</strong> testing checks behaviour without looking at code; <strong>white-box</strong> testing uses knowledge of the code paths.</p>`,
      example: `A new build arrives with a fix for the cart-discount bug:

  1. Smoke     — can users log in, search, add to cart, pay?   (15 min)
  2. Sanity    — does the cart discount now update correctly?  (10 min)
  3. Regression— coupons, quantities, shipping, taxes, payments
                 still correct across the checkout?             (2–3 hrs,
                                                                 mostly automated)
  4. Release candidate → UAT by the client's operations team`,
      output: `• Smoke decides whether the build is worth testing at all.
• Sanity confirms the specific fix.
• Regression protects everything around the fix — fixes often break
  neighbouring features.`,
      points: ["Levels: unit → integration → system → UAT.", "Smoke = build is stable; sanity = specific fix works.", "Regression protects existing features; automate it.", "Remember non-functional testing too."],
      practice: "For a food-delivery app release that changes the address screen, list what you'd include in smoke, sanity and regression testing.",
      quiz: { q: "Which testing re-checks old features after a change?", options: ["Smoke testing", "Regression testing", "Unit testing", "Usability testing"], answer: 1, why: "Regression testing confirms that new changes haven't broken features that already worked." },
      interview: [
        ["Smoke vs sanity testing?", "Smoke is a broad, shallow check of a new build's critical paths. Sanity is a narrow, focused check that a specific change or fix works."],
        ["Which tests would you automate first?", "Stable, repetitive, high-value ones — regression suites and smoke checks on critical flows. Avoid automating features that change constantly."]
      ]
    },
    {
      slug: "test-design-techniques",
      title: "Test design: boundaries, partitions and decision tables",
      summary: "Cover more with fewer tests using equivalence partitioning, boundary value analysis and decision tables.",
      body: `<p>You can't test every possible input. Test design techniques choose a small set of inputs that still catches most bugs.</p>
<h3>Equivalence partitioning</h3>
<p>Divide inputs into groups the system should treat the same way, then test one value from each group. If an age field accepts 18–60, the partitions are: below 18 (invalid), 18–60 (valid), above 60 (invalid).</p>
<h3>Boundary value analysis (BVA)</h3>
<p>Bugs cluster at the edges, often from <code>&lt;</code> written instead of <code>&lt;=</code>. Test the boundaries and values just around them: 17, 18, 19 and 59, 60, 61.</p>
<h3>Decision tables</h3>
<p>When the result depends on combinations of conditions, list each combination and its expected outcome. Every column becomes a test case.</p>
<h3>State transition</h3>
<p>For features with states (order: placed → packed → shipped → delivered / cancelled), test valid transitions and also invalid ones, such as cancelling after delivery.</p>`,
      example: `Rule: free delivery if order ≥ ₹499 OR the user has a Plus membership.
       COD (cash on delivery) not allowed above ₹5,000.

Decision table:
                       C1    C2    C3    C4
  Order ≥ ₹499         Y     Y     N     N
  Plus member          Y     N     Y     N
  ----------------------------------------
  Free delivery        Y     Y     Y     N

Boundary values for order amount: ₹498, ₹499, ₹500
                                  ₹4,999, ₹5,000, ₹5,001 (COD check)`,
      output: `• Four combinations → four test cases, none missed.
• Boundaries 498/499/500 catch a ">" vs ">=" mistake.
• The COD rule has its own boundaries — each rule gets its own BVA.`,
      points: ["Partition inputs into groups; test one per group.", "Test at and around every boundary.", "Use decision tables for combinations of conditions.", "Test invalid state transitions too."],
      practice: "A password must be 8–16 characters with at least one digit. Write the partitions and the boundary values you would test.",
      quiz: { q: "A field accepts 1 to 100. Which set best applies boundary value analysis?", options: ["50", "1, 100", "0, 1, 2, 99, 100, 101", "10, 20, 30"], answer: 2, why: "BVA tests each boundary and the values just inside and outside it." },
      interview: [
        ["What is equivalence partitioning?", "Grouping inputs that should behave the same so one value per group represents it — reducing test cases without losing coverage."],
        ["Why do bugs occur at boundaries?", "Off-by-one mistakes in conditions and loops (< vs <=, starting at 0 vs 1) show up exactly at the edges of valid ranges."]
      ]
    },
    {
      slug: "api-testing",
      title: "API testing basics with Postman",
      summary: "Requests, status codes, assertions and environment variables — testing the backend directly.",
      body: `<p>Most apps talk to a backend through <strong>APIs</strong>. Testing the API directly is faster and finds bugs earlier than testing only through the screen.</p>
<h3>What to check in an API response</h3>
<ul>
<li><strong>Status code</strong> — 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error.</li>
<li><strong>Response body</strong> — correct fields, types and values.</li>
<li><strong>Headers</strong> — content type, caching, security headers.</li>
<li><strong>Response time</strong> — within the agreed limit.</li>
<li><strong>Negative cases</strong> — missing fields, wrong types, no token, another user's data.</li>
</ul>
<h3>In Postman</h3>
<p>Create a request (method + URL + headers + body), save it in a <strong>collection</strong>, use <strong>environment variables</strong> such as <code>{{baseUrl}}</code> and <code>{{token}}</code> to switch between QA and staging, and add <strong>tests</strong> — small scripts that assert on the response. Collections can run all requests in order, which makes a quick regression suite.</p>`,
      example: `POST {{baseUrl}}/api/orders
Headers: Authorization: Bearer {{token}}
Body:    { "productId": 101, "quantity": 2 }

Tests tab (JavaScript in Postman):
  pm.test("Status is 201", () => pm.response.to.have.status(201));
  pm.test("Has order id", () => {
    const body = pm.response.json();
    pm.expect(body.orderId).to.be.a("number");
    pm.expect(body.quantity).to.eql(2);
  });
  pm.test("Fast enough", () =>
    pm.expect(pm.response.responseTime).to.be.below(800));

Negative: same request without the Authorization header → expect 401`,
      output: `• Assertions check status, data and speed — not just "it returned".
• Variables let the same collection run on QA and staging.
• The negative case confirms the API rejects unauthenticated calls —
  a common security check.`,
      points: ["Check status code, body, headers and response time.", "Always include negative and security cases.", "Use collections and environment variables.", "API tests make fast regression suites."],
      practice: "Using any free public test API, create a collection with one GET and one POST request, and add at least three assertions to each.",
      quiz: { q: "Which status code should an API return when the auth token is missing?", options: ["200", "201", "401", "500"], answer: 2, why: "401 Unauthorized means the request lacks valid authentication." },
      interview: [
        ["Difference between PUT and PATCH?", "PUT replaces the whole resource with the data sent; PATCH updates only the fields sent."],
        ["What would you test in a 'create user' API?", "Valid creation (201 and body), required fields missing, invalid formats, duplicate email, authorization, field length limits and response time."]
      ]
    },
    {
      slug: "selenium-basics",
      title: "Automation basics with Selenium WebDriver",
      summary: "Locators, waits and a first automated login test — plus what to automate and what not to.",
      body: `<p><strong>Selenium WebDriver</strong> controls a real browser from code, so repetitive UI checks can run automatically. It supports Java, Python, C# and JavaScript; Java and Python are the most common in fresher QA jobs.</p>
<h3>The building blocks</h3>
<ul>
<li><strong>Driver</strong> — opens and controls the browser.</li>
<li><strong>Locators</strong> — how you find elements: <code>id</code>, <code>name</code>, CSS selectors, XPath. Prefer stable IDs or dedicated test attributes over long XPaths.</li>
<li><strong>Actions</strong> — click, type, select, read text.</li>
<li><strong>Waits</strong> — wait for an element to be ready instead of fixed sleeps. Explicit waits make tests reliable.</li>
<li><strong>Assertions</strong> — usually from a test framework such as TestNG, JUnit or pytest.</li>
</ul>
<h3>Page Object Model</h3>
<p>Keep each page's locators and actions in its own class. When the UI changes, you update one place instead of every test.</p>
<p>Automation supports manual testing; it doesn't replace it. Exploratory testing and new features still need human judgement.</p>`,
      example: `# Python + Selenium: automated login test (pytest)
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_valid_login():
    driver = webdriver.Chrome()
    try:
        driver.get("https://qa.example-shop.test/login")
        driver.find_element(By.ID, "email").send_keys("anu@example.com")
        driver.find_element(By.ID, "password").send_keys("Kochi@2026")
        driver.find_element(By.CSS_SELECTOR, "[data-test=login-btn]").click()

        name = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.ID, "user-name")))
        assert name.text == "Anu"
    finally:
        driver.quit()`,
      output: `• Locators use IDs and a data-test attribute — stable when styling
  changes.
• An explicit wait (up to 10 s) replaces a fixed sleep, so the test
  is both faster and less flaky.
• try/finally guarantees the browser closes even when the test fails.`,
      points: ["Prefer stable locators (IDs, test attributes).", "Use explicit waits, never fixed sleeps.", "Use the Page Object Model for maintainable suites.", "Automate stable, repetitive checks first."],
      practice: "Install Selenium in Python or Java and automate a search on any demo shopping site: open it, search a product, and assert that results appear.",
      quiz: { q: "Why are explicit waits better than fixed sleeps?", options: ["They make tests longer", "They wait only as long as needed for a condition, reducing flakiness", "Selenium requires them", "They skip slow elements"], answer: 1, why: "Explicit waits continue as soon as the condition is met and tolerate slow loads, unlike fixed delays." },
      interview: [
        ["What is the Page Object Model?", "A design pattern where each page has a class holding its locators and actions; tests call those methods, so UI changes need updates in one place."],
        ["How do you handle a flaky test?", "Find the cause — timing, test data, environment or dependencies — fix it with proper waits or isolated data, and don't simply add retries to hide it."]
      ]
    },
    {
      slug: "qa-in-agile",
      title: "QA in an Agile team and test tools",
      summary: "Sprints, user stories and acceptance criteria, Jira workflows, and how testers work day to day.",
      body: `<p>Most IT park companies work in <strong>Agile</strong> teams using <strong>Scrum</strong>: work is split into short <strong>sprints</strong> (often two weeks), planned from a backlog of <strong>user stories</strong>.</p>
<h3>The tester's role in a sprint</h3>
<ul>
<li><strong>Sprint planning / refinement</strong> — question stories and help write clear <strong>acceptance criteria</strong>.</li>
<li><strong>During the sprint</strong> — write test cases while developers code, test stories as they finish, log and retest bugs.</li>
<li><strong>Daily stand-up</strong> — share what you tested, what's blocked, and risks.</li>
<li><strong>Sprint review / demo</strong> — confirm accepted stories meet the criteria.</li>
<li><strong>Retrospective</strong> — suggest process improvements.</li>
</ul>
<h3>Acceptance criteria</h3>
<p>Often written as <strong>Given / When / Then</strong>, they become direct test cases.</p>
<h3>Common tools</h3>
<p><strong>Jira</strong> (stories and bugs), test management tools for test cases, <strong>Postman</strong> for APIs, <strong>Selenium</strong> or similar for UI automation, and <strong>Git</strong> plus a CI server to run automated tests on every build.</p>`,
      example: `User story:
  As a shopper, I want to save items to a wishlist
  so that I can buy them later.

Acceptance criteria:
  Given I am logged in
  When I tap the heart icon on a product
  Then the product appears in My Wishlist
  And the heart icon turns filled

  Given I am logged out
  When I tap the heart icon
  Then I am asked to log in first

Test cases derived: TC_WL_01 (add), TC_WL_02 (logged out),
TC_WL_03 (remove), TC_WL_04 (wishlist persists after re-login)`,
      output: `• Each Given/When/Then maps directly to a test case.
• The tester added TC_WL_03 and 04 — cases the story implied but
  didn't spell out. Spotting these gaps is where QA adds value.`,
      points: ["Testers join planning, not just testing.", "Acceptance criteria (Given/When/Then) become test cases.", "Test continuously during the sprint.", "Know Jira, Postman, Selenium and Git basics."],
      practice: "Write a user story and three Given/When/Then acceptance criteria for 'reorder a previous order' in a grocery app, then derive four test cases.",
      quiz: { q: "What are acceptance criteria used for?", options: ["Estimating salary", "Defining when a user story is complete and testable", "Choosing the programming language", "Writing release notes only"], answer: 1, why: "Acceptance criteria state the conditions a story must meet, which testers turn into test cases." },
      interview: [
        ["What do you do if a story has no acceptance criteria?", "Raise it in refinement, propose criteria based on your understanding, and confirm them with the product owner before testing."],
        ["How do you decide what to test when time is short?", "Use risk-based testing: prioritise critical user flows, recently changed areas and features with past defects, and communicate what was not covered."]
      ]
    }
  ]
};
