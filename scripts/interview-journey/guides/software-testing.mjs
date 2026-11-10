/* Software Testing (QA) — 30 Important Interview Questions & Answers. Original InfoparkDaily content. Format: see guides/index.mjs. */
export const meta = {
  slug: "software-testing",
  field: "it",
  name: "Software testing (QA)",
  count: 30,
  topics: "testing fundamentals, test design, defects, test types, Agile, Selenium automation, API testing and test strategy",
  level: "Fresher to experienced"
};

export const text = `
## Testing fundamentals

### What is software testing and why is it important?
Software testing checks whether an application works as expected and finds defects before users do. It reduces the risk of failures, protects the company's reputation and saves money — bugs found late, in production, cost far more to fix than bugs found early.

### What is the difference between verification and validation?
- **Verification:** "Are we building the product right?" Reviews of requirements, designs and code against specifications, often without running the software.
- **Validation:** "Are we building the right product?" Running the software to confirm it meets the user's actual needs.

### What is the difference between SDLC and STLC?
SDLC (Software Development Life Cycle) covers the whole process of building software: requirements, design, development, testing, deployment and maintenance. STLC (Software Testing Life Cycle) is the testing part: requirement analysis, test planning, test case design, environment setup, test execution and test closure.

### What is the difference between an error, a defect and a failure?
- **Error (mistake):** a human mistake, such as a developer misreading a requirement.
- **Defect (bug):** the flaw that mistake creates in the code.
- **Failure:** what the user sees when the defective code runs and the system behaves wrongly.

### What is the difference between black-box, white-box and grey-box testing?
- **Black-box:** test inputs and outputs without looking at the code.
- **White-box:** test with knowledge of the internal code — paths, branches, conditions.
- **Grey-box:** partial knowledge, such as knowing the database structure while testing through the UI.

### Explain the seven principles of testing.
1. Testing shows that defects are present, not that there are none.
2. Exhaustive testing is impossible — prioritise by risk.
3. Test early; defects are cheaper to fix early.
4. Defects cluster in a few modules.
5. Repeating the same tests stops finding new bugs (the pesticide paradox), so update tests.
6. Testing depends on context — a banking app isn't tested like a game.
7. A bug-free system that doesn't meet user needs is still a failure.

## Test design and documentation

### What is a test case, and what does a good one contain?
A test case is a set of steps to check one behaviour. A good one has an ID, title, preconditions, test data, clear steps, the expected result, the actual result and a status. Anyone should be able to run it and get the same outcome.

### What is the difference between a test plan and a test strategy?
- **Test strategy:** high-level and often organisation-wide — the overall approach, test levels, tools and standards.
- **Test plan:** project-specific — scope, schedule, resources, environments, entry and exit criteria, risks and deliverables.

### What are equivalence partitioning and boundary value analysis?
Both reduce the number of test cases while keeping good coverage. For an age field that accepts 18 to 60:
- **Equivalence partitioning:** pick one value from each group — below 18 (invalid), 18–60 (valid), above 60 (invalid).
- **Boundary value analysis:** test at and around the edges, where bugs are most common — 17, 18, 19 and 59, 60, 61.

### What is a traceability matrix (RTM)?
A table that maps each requirement to the test cases that cover it, and then to their results and defects. It shows that every requirement is tested and helps judge the impact when a requirement changes.

### What are positive and negative testing?
- **Positive testing:** valid inputs, checking the system does what it should — a correct login works.
- **Negative testing:** invalid or unexpected inputs, checking the system handles them safely — a wrong password shows an error and doesn't crash.

## Defects and test types

### Explain the defect life cycle.
New → Assigned → Open → Fixed → Retest → Closed. Along the way a defect can also be Rejected (not a bug), Deferred (fix later), marked Duplicate, or Reopened if the retest fails.

### What is the difference between severity and priority?
- **Severity:** how badly the defect affects the system (technical impact).
- **Priority:** how soon it should be fixed (business urgency).

Example: a spelling mistake in the company name on the home page is low severity but high priority. A crash in a rarely used report is high severity but may be lower priority.

### What makes a good bug report?
A clear title, environment (build, browser, device), steps to reproduce, expected result, actual result, severity, and evidence such as screenshots, videos or logs. The developer should be able to reproduce it without asking you questions.

### What is the difference between smoke and sanity testing?
- **Smoke testing:** a quick, broad check of a new build's critical features to decide if it's stable enough for detailed testing.
- **Sanity testing:** a quick, narrow check that a specific fix or change works, before deeper regression testing.

### What is the difference between regression testing and retesting?
- **Retesting:** run the failed test again to confirm a specific defect is fixed.
- **Regression testing:** run a wider set of tests to make sure the change didn't break anything that used to work.

Regression suites are the first candidates for automation.

### What is the difference between functional and non-functional testing?
- **Functional:** does the feature do what it should? Login, search, payment flow.
- **Non-functional:** how well does it work? Performance, load, security, usability, compatibility.

### What is UAT?
User Acceptance Testing is done by end users or the client, usually in the final stage, to confirm the software meets business needs in real-world scenarios. Alpha testing happens at the developer's site; beta testing is done by real users in their own environment.

## Agile and QA process

### What is the role of a tester in an Agile team?
Testers join from the start of each sprint: they clarify user stories and acceptance criteria, design tests while development happens, test stories as soon as they're ready, automate regression, and take part in stand-ups, sprint planning and retrospectives. Quality is the whole team's responsibility.

### What is exploratory testing?
Testing without pre-written scripts, where the tester learns the application, designs tests and runs them at the same time, guided by experience. It's good at finding unexpected bugs. Time-boxed sessions with a goal (a "charter") keep it focused.

### What are entry and exit criteria?
- **Entry criteria:** conditions to start testing — requirements signed off, build deployed, test environment and data ready.
- **Exit criteria:** conditions to stop — planned tests executed, no open critical defects, coverage targets met.

## Automation and API testing

### When should you automate a test, and when shouldn't you?
Automate tests that are repeated often (regression, smoke), stable, data-driven or tedious to do by hand. Don't automate one-time tests, features that change constantly, or checks that need human judgement such as usability and visual design.

### What is Selenium WebDriver?
Selenium WebDriver is an open-source tool that controls real browsers (Chrome, Firefox, Edge) through code, so you can automate web UI tests. It supports Java, Python, C#, JavaScript and more, and is usually combined with a test framework such as TestNG, JUnit or pytest.

### What locators does Selenium support, and which is best?
ID, name, class name, tag name, link text, partial link text, CSS selector and XPath. Prefer a unique, stable ID, then CSS selectors. Use XPath when you need to find elements by text or move up the DOM. Avoid long absolute XPaths, which break when the page changes.

### What is the difference between implicit, explicit and fluent waits?
- **Implicit wait:** a global timeout for finding any element.
- **Explicit wait:** waits for a specific condition on a specific element, such as "clickable" — the most reliable choice.
- **Fluent wait:** an explicit wait with a custom polling interval and exceptions to ignore.

Avoid fixed \`Thread.sleep()\` calls; they make tests slow and flaky.

### What is the Page Object Model?
A design pattern where each page of the app has a class holding its locators and actions (such as \`login(user, pass)\`). Tests call those methods instead of using locators directly. When the UI changes, you update one page class instead of every test.

### How do you test a REST API?
Send requests with Postman or code (REST Assured, pytest with requests) and check:
- Status codes (200, 201, 400, 401, 404, 500)
- Response body and its schema
- Headers and response time
- Authentication and authorisation
- Error handling for invalid and missing input
\`\`\`
// REST Assured (Java)
given().header("Authorization", "Bearer " + token)
.when().get("/api/users/1")
.then().statusCode(200).body("name", equalTo("Anu"));
\`\`\`

### How do you handle flaky automated tests?
Find the cause instead of just re-running: usually timing (use explicit waits), shared or changing test data (make each test create its own data), test order dependency, or an unstable environment. Quarantine a flaky test until it's fixed so it doesn't hide real failures.

### How does test automation fit into CI/CD?
Automated tests run on every commit or pull request in a pipeline (Jenkins, GitHub Actions, GitLab CI). Fast unit and API tests run first; slower UI tests run later or nightly. A failing test stops the pipeline, so broken code doesn't reach production.

### What is the test pyramid?
Many fast unit tests at the bottom, fewer API and integration tests in the middle, and a small number of slow UI end-to-end tests at the top. This gives fast feedback and stable suites. An "ice-cream cone" — mostly UI tests — is slow and fragile.
`;

export const practice = [
  ["Test design", "Write test cases for a login page (positive and negative)"],
  ["Test design", "Apply boundary values to a field that accepts 1–100"],
  ["Bug report", "Write a bug report for a broken checkout button"],
  ["Scenarios", "List test scenarios for an ATM withdrawal or a lift"],
  ["Selenium", "Automate login and verify the dashboard title"],
  ["Selenium", "Handle a dropdown, an alert and a new tab"],
  ["API", "Test a GET and a POST endpoint in Postman with assertions"],
  ["SQL", "Verify data saved by the UI using a SELECT query"],
  ["Framework", "Explain your framework: POM, test data, reports, CI"]
];
