/* QA Automation & SDET (2–8 years) — 30 Important Interview Questions & Answers.
 * Original InfoparkDaily content written for experienced testers moving into automation / SDET roles.
 * Example apps, data and numbers are fictional. Format: see guides/index.mjs. */
export const meta = {
  slug: "qa-automation-sdet",
  field: "it",
  name: "QA automation & SDET",
  count: 30,
  topics: "Java for testers, coding round, advanced Selenium, TestNG and framework design, Playwright, REST API automation, CI and scenario rounds",
  level: "2–8 years experience"
};

export const text = `
## Java for automation testers

### Where do you use OOP concepts in your automation framework?
Interviewers want real places in your own framework, not textbook definitions:
- **Encapsulation:** page classes keep locators \`private\` and expose actions such as \`loginAs(user)\`, so tests never touch raw locators.
- **Inheritance:** a \`BasePage\` holds shared waits and helpers; every page extends it. A \`BaseTest\` opens and closes the browser.
- **Polymorphism:** \`WebDriver driver = new ChromeDriver();\` — the test talks to the \`WebDriver\` interface, so switching to Firefox or a remote grid needs no test changes. Method overloading appears in helpers like \`click(By)\` and \`click(WebElement)\`.
- **Abstraction:** interfaces such as \`WebDriver\`, or your own \`ReportLogger\` interface with an Extent and a console implementation.

### Why is String immutable in Java, and when would you use StringBuilder?
A \`String\` cannot change after it is created; every "change" creates a new object. This makes strings safe to share between threads and lets Java reuse literals from the string pool. When you build text in a loop — for example a long log message or a CSV row — use \`StringBuilder\`, which changes one buffer instead of creating hundreds of objects. \`StringBuffer\` does the same but is synchronised (slower; rarely needed in test code).

### Which collections do you use in test code, and why?
- **ArrayList** — ordered data, such as rows read from Excel or a list of product names from the page.
- **HashSet** — uniqueness checks, for example "the dropdown has no duplicate options".
- **HashMap** — key–value test data (\`"username" → "qa_user"\`) or expected API fields.
- **LinkedHashMap** — same, but keeps insertion order when order matters in a report.
Know that \`HashMap\` allows one \`null\` key and is not thread-safe; for parallel runs use \`ConcurrentHashMap\` or keep data per thread.

### Checked vs unchecked exceptions — how do you handle them in a framework?
**Checked** exceptions (\`IOException\` when reading a config file) must be caught or declared. **Unchecked** ones (\`NoSuchElementException\`, \`NullPointerException\`) happen at runtime. In a framework:
- Catch checked exceptions close to where they happen and re-throw a clear runtime exception: "config.properties not found at …".
- Don't swallow exceptions with an empty \`catch\` — the test would pass when it should fail.
- Use \`finally\` (or TestNG \`@AfterMethod(alwaysRun = true)\`) so the browser always closes.

### What do static and final mean, and where do they appear in a framework?
- **static:** belongs to the class, not an object. Used for utility methods (\`WaitUtils.forVisible()\`) and constants. Be careful: a \`static WebDriver\` breaks parallel runs because all threads share one browser.
- **final:** cannot be changed or overridden. Used for constants such as \`public static final int TIMEOUT = 10;\`, and for locators that should never be reassigned.

## Coding round

### Reverse a string without using reverse().
Walk from the last character to the first:
\`\`\`
public static String reverse(String s) {
    StringBuilder out = new StringBuilder();
    for (int i = s.length() - 1; i >= 0; i--) {
        out.append(s.charAt(i));
    }
    return out.toString();
}
// reverse("Infopark") → "krapofnI"
\`\`\`
Say the complexity out loud: O(n) time, O(n) extra space. Mention edge cases you would test — empty string, one character, spaces.

### Count how many times each character appears in a string.
\`\`\`
public static Map<Character, Integer> countChars(String s) {
    Map<Character, Integer> counts = new LinkedHashMap<>();
    for (char c : s.toCharArray()) {
        if (c == ' ') continue;
        counts.put(c, counts.getOrDefault(c, 0) + 1);
    }
    return counts;
}
// countChars("testing") → {t=2, e=1, s=1, i=1, n=1, g=1}
\`\`\`
\`LinkedHashMap\` keeps the order the characters first appear, which makes the output easy to read. A follow-up is often "print only the duplicates" — loop over the map and print entries with a count above 1.

### Find the first non-repeating character in a string.
Count first, then scan the string again in its original order:
\`\`\`
public static Character firstUnique(String s) {
    Map<Character, Integer> counts = new HashMap<>();
    for (char c : s.toCharArray()) counts.merge(c, 1, Integer::sum);
    for (char c : s.toCharArray()) {
        if (counts.get(c) == 1) return c;
    }
    return null; // every character repeats
}
// firstUnique("swiss") → 'w'
\`\`\`
Two passes keep it O(n). Returning \`null\` (or \`Optional\`) for "none found" is better than an invented character.

### Check whether two strings are anagrams.
Ignore case and spaces, sort the characters and compare:
\`\`\`
public static boolean isAnagram(String a, String b) {
    char[] x = a.replace(" ", "").toLowerCase().toCharArray();
    char[] y = b.replace(" ", "").toLowerCase().toCharArray();
    Arrays.sort(x);
    Arrays.sort(y);
    return Arrays.equals(x, y);
}
// isAnagram("Listen", "Silent") → true
\`\`\`
Sorting is O(n log n). If asked for O(n), count letters in an \`int[26]\` array — add for one string, subtract for the other, and check every slot is zero.

### Find the second largest number in an array without sorting.
Track the largest and second largest in one pass:
\`\`\`
public static int secondLargest(int[] nums) {
    int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
    for (int n : nums) {
        if (n > first) { second = first; first = n; }
        else if (n > second && n != first) { second = n; }
    }
    if (second == Integer.MIN_VALUE) throw new IllegalArgumentException("No second largest value");
    return second;
}
// secondLargest(new int[]{12, 45, 7, 45, 30}) → 30
\`\`\`
The \`n != first\` check handles duplicates of the largest value — a detail interviewers look for.

## Advanced Selenium

### What causes StaleElementReferenceException, and how do you fix it?
It happens when you hold a \`WebElement\` and the page re-renders that part of the DOM — after an AJAX refresh, a sort, or navigating away and back. The old reference now points to a node that no longer exists.
- Find the element again right before using it instead of storing it for long.
- In page objects, keep \`By\` locators and look up the element inside each action method.
- Wait for the refresh to finish (for example \`ExpectedConditions.stalenessOf(oldElement)\`, then wait for the new one).
- A small retry around one action is acceptable; wrapping everything in retries hides real bugs.

### How do you work with iframes, multiple windows and alerts?
- **iframe:** \`driver.switchTo().frame("paymentFrame")\` (by name, index or element), act inside it, then \`driver.switchTo().defaultContent()\` to return.
- **Windows/tabs:** store \`getWindowHandle()\` first, click the link, loop over \`getWindowHandles()\` to find the new handle, switch to it, and switch back when done. Selenium 4 also has \`driver.switchTo().newWindow(WindowType.TAB)\`.
- **Alerts:** wait for \`alertIsPresent()\`, then \`accept()\`, \`dismiss()\` or \`getText()\`.
A common mistake is forgetting to switch back, which makes every later locator fail.

### How do you automate elements inside a Shadow DOM?
Normal locators can't see inside a shadow root. In Selenium 4, find the host element and call \`getShadowRoot()\`, then search inside it with CSS:
\`\`\`
WebElement host = driver.findElement(By.cssSelector("app-date-picker"));
SearchContext shadow = host.getShadowRoot();
shadow.findElement(By.cssSelector("input.day")).sendKeys("18");
\`\`\`
XPath does not work inside a shadow root — use CSS selectors. Playwright pierces open shadow roots automatically.

### When would you use JavascriptExecutor, and what are the risks?
Use it when a normal action isn't possible: scrolling an element into view, reading a value the UI hides, or clicking an element that a sticky header covers. The risk is that JavaScript clicks skip real-user checks — a button hidden behind an overlay can be "clicked" by JS even though a user couldn't. Treat a JS click as a workaround, note why in the code, and prefer fixing the wait or the locator.

### What changed in Selenium 4 that you actually use?
- **W3C WebDriver protocol** by default — more consistent behaviour across browsers.
- **Relative locators:** \`RelativeLocator.with(By.tagName("input")).below(passwordLabel)\` for fields without good attributes.
- **New window/tab API** and **element screenshots** (\`element.getScreenshotAs\`).
- **Chrome DevTools access** for network conditions or console logs in Chromium browsers.
- **Selenium Manager** downloads the matching browser driver, so you no longer manage chromedriver versions by hand.
Pick two you have used and give a short real example — that lands better than listing all of them.

## TestNG and framework design

### Explain the TestNG annotation order and how you use each.
Order of execution: \`@BeforeSuite\` → \`@BeforeTest\` → \`@BeforeClass\` → \`@BeforeMethod\` → \`@Test\` → \`@AfterMethod\` → \`@AfterClass\` → \`@AfterTest\` → \`@AfterSuite\`.
Typical use:
- **@BeforeSuite:** load configuration, start the report.
- **@BeforeMethod:** open a fresh browser and go to the base URL, so tests don't depend on each other.
- **@AfterMethod(alwaysRun = true):** take a screenshot on failure and quit the browser.
- **@AfterSuite:** flush and save the report.
Also mention \`priority\`, \`dependsOnMethods\` (use sparingly), \`groups\` such as smoke and regression, and \`enabled = false\` for a test that is temporarily parked with a ticket number.

### How do you do data-driven testing?
Keep test logic in one method and feed it many rows of data:
\`\`\`
@DataProvider(name = "logins")
public Object[][] logins() {
    return new Object[][] {
        {"valid_user", "Correct#1", true},
        {"valid_user", "wrong", false},
        {"", "Correct#1", false}
    };
}

@Test(dataProvider = "logins")
public void login(String user, String pass, boolean shouldPass) {
    loginPage.loginAs(user, pass);
    Assert.assertEquals(dashboard.isShown(), shouldPass);
}
\`\`\`
In real projects the rows usually come from Excel (Apache POI), JSON or CSV files so testers can add cases without editing code. Keep secrets such as passwords out of the repository — read them from environment variables or the CI secret store.

### How do you run tests in parallel safely?
Set \`parallel="methods"\` (or classes/tests) and a \`thread-count\` in testng.xml. The key problem is shared state: each thread needs its own browser. Use a \`ThreadLocal<WebDriver>\`:
\`\`\`
public class DriverManager {
    private static final ThreadLocal<WebDriver> DRIVER = new ThreadLocal<>();
    public static WebDriver get() { return DRIVER.get(); }
    public static void set(WebDriver d) { DRIVER.set(d); }
    public static void quit() { DRIVER.get().quit(); DRIVER.remove(); }
}
\`\`\`
Also make test data unique per thread (for example add a timestamp to new usernames), so two tests never edit the same record. Calling \`remove()\` after quitting avoids memory leaks in long runs.

### Walk me through the framework you built or used.
Answer in layers, in under two minutes, then let the interviewer dig in:
1. **Language and tools:** Java, Selenium 4, TestNG, Maven.
2. **Structure:** page objects, a \`BaseTest\`, utilities (waits, Excel, config), and test classes grouped by feature.
3. **Test data:** JSON/Excel per environment; secrets from environment variables.
4. **Execution:** testng.xml suites for smoke and regression, parallel by methods, run headless in CI.
5. **Reporting:** Extent or Allure report with screenshots on failure, shared with the team after each run.
6. **Your contribution:** one concrete thing you added — for example cutting regression time from 3 hours to 50 minutes with parallel runs.
Draw it as boxes if there is a whiteboard; it shows you understand how the pieces connect.

### How do you handle retries for failed tests?
TestNG's \`IRetryAnalyzer\` can re-run a failed test once or twice. It is useful against genuine environment noise — a slow test server or a network blip. The danger is hiding real flaky behaviour or real bugs, so:
- Limit retries to one or two, and only for UI suites.
- Report retried tests separately, so the team can see which ones are unstable.
- Fix the cause — usually a missing wait, shared test data or test order dependency — rather than relying on retries forever.

## Playwright

### How is Playwright different from Selenium?
| Point | Selenium | Playwright |
| Waiting | You add explicit waits | Auto-waits for elements to be ready |
| Browsers | Real browsers via drivers | Bundled Chromium, Firefox, WebKit |
| Speed and isolation | One browser per session | Many light browser contexts in one browser |
| Network | Limited | Built-in request interception and mocking |
| Languages | Java, Python, C#, JS and more | JS/TS, Python, Java, .NET |
Selenium has a bigger ecosystem and grid support; Playwright gives faster, more stable tests with less setup. Many teams choose based on the language their developers already use.

### What locators does Playwright recommend, and why?
Playwright recommends user-facing locators: \`getByRole('button', { name: 'Sign in' })\`, \`getByLabel('Email')\`, \`getByText('Order placed')\` and \`getByTestId('cart-count')\` when developers add test IDs. They match how users find things, survive CSS and layout changes, and push the team towards accessible markup. Long XPath or CSS chains tied to the DOM structure are a last resort.
Assertions such as \`await expect(page.getByText('Saved')).toBeVisible()\` also retry until a timeout, which removes most manual waits.

### How do you avoid logging in through the UI for every Playwright test?
Log in once, save the browser state, and reuse it:
\`\`\`
// global setup
await page.goto('/login');
await page.getByLabel('Email').fill(process.env.QA_USER);
await page.getByLabel('Password').fill(process.env.QA_PASS);
await page.getByRole('button', { name: 'Sign in' }).click();
await page.context().storageState({ path: 'auth.json' });

// playwright.config: use: { storageState: 'auth.json' }
\`\`\`
Each test now starts already signed in, which saves time and removes a common source of flakiness. Keep one separate test that checks the login screen itself. Another option is to log in through the API and set the cookie.

## REST API automation

### How do you write an API test with RestAssured?
RestAssured uses a readable given / when / then style:
\`\`\`
given()
    .baseUri("https://api.example-shop.test")
    .header("Authorization", "Bearer " + token)
    .contentType(ContentType.JSON)
    .body("{\\"name\\":\\"Test Mug\\",\\"price\\":299}")
.when()
    .post("/products")
.then()
    .statusCode(201)
    .body("name", equalTo("Test Mug"))
    .body("id", notNullValue());
\`\`\`
Mention what else you check: response time, headers such as \`Content-Type\`, and a negative case (missing field → 400).

### How do you chain API calls and reuse values from a response?
Extract the value from one response and pass it to the next request:
\`\`\`
String id = given().spec(spec).body(newOrder)
    .when().post("/orders")
    .then().statusCode(201)
    .extract().path("id");

given().spec(spec)
    .when().get("/orders/" + id)
    .then().statusCode(200).body("status", equalTo("CREATED"));
\`\`\`
A \`RequestSpecification\` (the \`spec\` above) holds the base URI, headers and auth once, so every test stays short. For login flows, call the token endpoint once in setup and reuse the token until it expires.

### What do you validate in an API response besides the status code?
- **Body values:** the fields you sent come back correctly; calculated fields (totals, tax) are right.
- **Schema:** field names and types match the contract — RestAssured supports \`matchesJsonSchemaInClasspath("order-schema.json")\`.
- **Headers:** \`Content-Type\`, caching or security headers.
- **Performance:** response time within an agreed limit.
- **Side effects:** the database row, the email queued or the next GET shows the change.
- **Negative paths:** 400 for bad input, 401 without a token, 403 for the wrong role, 404 for a missing ID.

### Which HTTP status codes do you check most, and what do they mean?
| Code | Meaning | Typical test |
| 200 | OK | GET returns data |
| 201 | Created | POST creates a record |
| 204 | No content | DELETE succeeded |
| 400 | Bad request | Missing or invalid field |
| 401 | Unauthorised | No or expired token |
| 403 | Forbidden | Valid user without permission |
| 404 | Not found | Unknown ID |
| 409 | Conflict | Duplicate email on sign-up |
| 500 | Server error | Should never be the answer to bad user input |
A 500 for invalid input is itself a bug worth logging — the API should return a clear 4xx message.

## CI, scenarios and senior rounds

### How do your automated tests run in CI?
Describe the pipeline in steps:
1. A push or merge request triggers the job in Jenkins, GitHub Actions or GitLab CI.
2. The job checks out the code and runs \`mvn clean test -Dsuite=smoke -Denv=qa\` with browsers in headless mode (or on a Selenium Grid / cloud provider).
3. Smoke tests run on every merge; the full regression runs nightly or before a release.
4. Reports and failure screenshots are saved as build artifacts and the result is posted to the team chat.
5. A failed smoke run blocks the deployment.
Mention one practical problem you solved, such as fixing tests that passed locally but failed in headless mode because of window size.

### A serious bug reached production. What do you do?
Stay calm and factual:
1. Help reproduce it quickly and share exact steps, data and environment with developers.
2. Check how many users are affected and suggest a workaround if there is one.
3. After the fix, retest it and run regression around the change.
4. In the review, find why testing missed it — missing scenario, different data in production, or an untested configuration — without blaming people.
5. Add the missing test (automated if possible) so the same bug can't return.
Interviewers are checking ownership and learning, not whether you have never missed a bug.

### You have two days to test a release that normally needs a week. How do you plan?
Use risk-based testing:
- List what changed in this release and what it touches.
- Rank areas by business impact and chance of failure — payments, login and data saving come first.
- Run the automated smoke and regression suites in parallel early, so manual time goes to new features.
- Do focused exploratory testing on the riskiest new changes.
- Tell the manager clearly what will and will not be tested, and the risk of what is left out, so the release decision is shared and informed.
This shows judgement — senior QA roles are as much about prioritising as about testing.
`;

export const practice = [
  ["Coding", "Solve reverse string, character count, first unique character, anagram and second largest — without looking"],
  ["Java", "Explain OOP using classes from your own framework, in two minutes"],
  ["Selenium", "Automate a flow that uses an iframe, a new tab and an alert"],
  ["Selenium", "Reproduce and fix a StaleElementReferenceException on a sortable table"],
  ["TestNG", "Run a DataProvider test in parallel with a ThreadLocal driver"],
  ["Playwright", "Write a login once with storageState and reuse it across tests"],
  ["API", "Write RestAssured tests: create, fetch, update and delete one record, plus 400 and 401 cases"],
  ["CI", "Run your smoke suite headless in GitHub Actions and publish the report"],
  ["Scenarios", "Prepare a real story: a bug you found late and what you changed afterwards"]
];
