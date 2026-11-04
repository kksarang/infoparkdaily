/* Interview question bank — technical subjects.
   Row format: [level, question, sample answer]  level: "f" fresher · "e" experienced · "b" both */

export const TECH = [
  {
    id: "cs-fundamentals",
    name: "OOP & CS fundamentals",
    group: "Core CS",
    round: "Technical",
    intro: "Asked of almost every software fresher, whatever the language.",
    qs: [
      ["f", "What are the four pillars of OOP?", "Encapsulation (bundle data and methods, hide internals), Abstraction (expose only essentials), Inheritance (reuse a parent class), Polymorphism (one interface, many behaviours — e.g. method overriding)."],
      ["f", "Method overloading vs overriding?", "Overloading: same name, different parameters, same class — resolved at compile time. Overriding: subclass redefines a parent method with the same signature — resolved at runtime."],
      ["f", "Abstract class vs interface?", "An abstract class can have state, constructors and implemented methods; a class extends only one. An interface defines a contract; a class can implement many. (Modern Java interfaces can also have default methods.)"],
      ["f", "Process vs thread?", "A process is an independent running program with its own memory. Threads run inside a process and share its memory — lighter, but need synchronisation."],
      ["f", "What is a deadlock?", "Two or more threads wait forever for resources held by each other. Conditions: mutual exclusion, hold and wait, no preemption, circular wait. Prevent by ordering lock acquisition."],
      ["f", "What happens when you type a URL in a browser?", "DNS lookup → TCP connection (+ TLS for HTTPS) → HTTP request → server response → browser parses HTML, loads CSS/JS/images → renders the page."],
      ["f", "Compiler vs interpreter?", "A compiler translates the whole program to machine/byte code before running; an interpreter executes code line by line. Java compiles to bytecode which the JVM runs (with JIT compilation)."],
      ["b", "What is the difference between stack and heap memory?", "Stack holds method calls and local variables (fast, automatic cleanup, limited size). Heap holds objects created at runtime (larger, managed by garbage collection in Java/Python)."],
      ["e", "Explain SOLID principles.", "Single responsibility, Open/closed (extend without modifying), Liskov substitution (subtypes usable as base types), Interface segregation (small specific interfaces), Dependency inversion (depend on abstractions)."]
    ]
  },
  {
    id: "dsa",
    name: "Data structures & algorithms",
    group: "Core CS",
    round: "Technical",
    intro: "Coding rounds and whiteboard questions. Always state time and space complexity.",
    qs: [
      ["f", "Array vs linked list?", "Array: contiguous memory, O(1) index access, costly insertion in the middle. Linked list: nodes with pointers, O(1) insert/delete at a known node, O(n) access by index."],
      ["f", "Stack vs queue?", "Stack is LIFO (push/pop — undo, recursion). Queue is FIFO (enqueue/dequeue — task scheduling, BFS)."],
      ["f", "How do you reverse a string?", "Python: <code>s[::-1]</code>. Manually: two pointers swapping from both ends until they meet — O(n) time."],
      ["f", "Find the second largest number in an array.", "Track <code>first</code> and <code>second</code> in one pass: if x &gt; first, second = first and first = x; else if x &gt; second and x ≠ first, second = x. O(n) time, O(1) space."],
      ["f", "What is binary search and its complexity?", "On a sorted array, compare with the middle element and discard half each step. O(log n) time."],
      ["b", "What is a hash map and its average lookup time?", "A key-value structure using a hash function to find buckets. Average O(1) insert and lookup; worst case O(n) with many collisions."],
      ["b", "Check if two strings are anagrams.", "Count characters of both (dictionary or 26-length array) and compare counts — O(n). Sorting both and comparing is O(n log n)."],
      ["b", "Find two numbers in an array that add up to a target.", "Use a hash map: for each x, check if target − x was seen; if yes, return the pair; else store x. O(n) time."],
      ["e", "Detect a cycle in a linked list.", "Floyd’s algorithm: slow pointer moves 1, fast moves 2. If they meet, there’s a cycle. O(n) time, O(1) space."],
      ["e", "BFS vs DFS — when would you use each?", "BFS (queue) explores level by level — shortest path in unweighted graphs. DFS (stack/recursion) goes deep — cycle detection, topological sort, exploring all paths."]
    ]
  },
  {
    id: "java",
    name: "Java",
    group: "Programming",
    round: "Technical",
    intro: "Core Java, collections and Spring Boot.",
    qs: [
      ["f", "JDK vs JRE vs JVM?", "JVM runs bytecode. JRE = JVM + libraries needed to run Java programs. JDK = JRE + development tools like the compiler (javac)."],
      ["f", "Why is String immutable in Java?", "For security, thread safety and the string pool: the same literal can be shared safely. Use StringBuilder for frequent modifications."],
      ["f", "== vs equals()?", "<code>==</code> compares references (same object); <code>equals()</code> compares content when overridden, as in String."],
      ["f", "ArrayList vs LinkedList?", "ArrayList: dynamic array, fast random access, slower inserts in the middle. LinkedList: doubly linked list, fast insert/delete at ends, slow index access."],
      ["f", "Checked vs unchecked exceptions?", "Checked exceptions (IOException) must be handled or declared at compile time. Unchecked (RuntimeException, NullPointerException) are not enforced by the compiler."],
      ["b", "HashMap vs ConcurrentHashMap vs Hashtable?", "HashMap is not thread-safe and allows one null key. Hashtable is synchronised (legacy, slow). ConcurrentHashMap is thread-safe with fine-grained locking and no null keys/values."],
      ["b", "What does the final keyword do?", "final variable can’t be reassigned; final method can’t be overridden; final class can’t be extended."],
      ["b", "What is the Stream API? Give an example.", "Functional processing of collections: <code>list.stream().filter(n -&gt; n % 2 == 0).map(n -&gt; n * n).toList();</code>"],
      ["e", "What is dependency injection in Spring?", "The container creates and supplies objects (beans) a class needs instead of the class creating them — usually through constructor injection — making code loosely coupled and testable."],
      ["e", "@Component vs @Service vs @Repository vs @Controller?", "All register Spring beans. @Service marks business logic, @Repository data access (with exception translation), @Controller/@RestController web endpoints; @Component is generic."],
      ["e", "How does @Transactional work?", "Spring wraps the method in a proxy that starts a transaction and commits on success or rolls back on runtime exceptions. Self-invocation inside the same class bypasses the proxy."],
      ["e", "How do you find a memory leak in a Java service?", "Monitor heap growth, take heap dumps (jmap / JVisualVM / Eclipse MAT), look for objects retained by static collections, caches or unclosed resources, then fix and verify."]
    ]
  },
  {
    id: "python",
    name: "Python",
    group: "Programming",
    round: "Technical",
    intro: "Core Python plus Django/Flask/FastAPI basics.",
    qs: [
      ["f", "List vs tuple vs set vs dictionary?", "List: ordered, mutable. Tuple: ordered, immutable. Set: unordered, unique items. Dict: key-value pairs (insertion-ordered since Python 3.7)."],
      ["f", "What are *args and **kwargs?", "<code>*args</code> collects extra positional arguments into a tuple; <code>**kwargs</code> collects extra keyword arguments into a dict."],
      ["f", "What is a list comprehension?", "A concise way to build lists: <code>[x * x for x in range(10) if x % 2 == 0]</code>."],
      ["f", "Shallow copy vs deep copy?", "<code>copy.copy</code> copies the outer object but shares nested objects; <code>copy.deepcopy</code> copies everything recursively."],
      ["f", "What does <code>if __name__ == \"__main__\":</code> mean?", "The block runs only when the file is executed directly, not when imported as a module."],
      ["b", "What is a decorator?", "A function that wraps another function to add behaviour (logging, timing, auth) without changing its code — applied with <code>@decorator</code>."],
      ["b", "What is a generator?", "A function using <code>yield</code> that produces values lazily, one at a time — memory-efficient for large data."],
      ["b", "Why is a mutable default argument dangerous?", "<code>def f(x=[])</code> shares the same list across calls. Use <code>x=None</code> and create a new list inside."],
      ["e", "What is the GIL?", "In CPython, the Global Interpreter Lock lets only one thread execute Python bytecode at a time. Use multiprocessing or async for CPU-bound parallelism; threads still help with I/O."],
      ["e", "Django: what is the N+1 query problem and how do you fix it?", "Looping over objects and querying related data each time. Fix with <code>select_related</code> (foreign keys) or <code>prefetch_related</code> (many-to-many/reverse relations)."],
      ["e", "Django vs Flask vs FastAPI?", "Django: batteries-included (ORM, admin, auth). Flask: minimal and flexible. FastAPI: modern, async, type-hint based with automatic OpenAPI docs."]
    ]
  },
  {
    id: "javascript",
    name: "JavaScript",
    group: "Web & mobile",
    round: "Technical",
    intro: "Core JavaScript for frontend and Node.js roles.",
    qs: [
      ["f", "var vs let vs const?", "var is function-scoped and hoisted (initialised as undefined). let and const are block-scoped; const can’t be reassigned (but objects it points to can change)."],
      ["f", "== vs ===?", "<code>==</code> converts types before comparing (<code>'5' == 5</code> is true). <code>===</code> compares value and type (<code>'5' === 5</code> is false)."],
      ["f", "What are truthy and falsy values?", "Falsy: <code>false, 0, -0, 0n, \"\", null, undefined, NaN</code>. Everything else is truthy, including <code>[]</code> and <code>{}</code>."],
      ["f", "What does <code>typeof null</code> return?", "<code>\"object\"</code> — a long-standing quirk of JavaScript."],
      ["b", "What is a closure?", "A function that remembers variables from its outer scope even after that scope has finished — used for private state and factories."],
      ["b", "Explain the event loop.", "JavaScript runs on one thread. Async callbacks wait in queues; when the call stack is empty, the event loop runs microtasks (promises) first, then macrotasks (setTimeout, I/O)."],
      ["b", "Promise vs async/await?", "Both handle async results. async/await is syntax over promises that reads like synchronous code; use try/catch for errors."],
      ["b", "What is event delegation?", "Attaching one listener to a parent and using <code>event.target</code> to handle clicks on many children — efficient and works for elements added later."],
      ["e", "Debounce vs throttle?", "Debounce runs a function after activity stops for a delay (search box). Throttle runs it at most once per interval (scroll handlers)."],
      ["e", "How does <code>this</code> work?", "Determined by how a function is called: method call → the object; plain call → undefined in strict mode; arrow functions use <code>this</code> from the surrounding scope; <code>bind/call/apply</code> set it explicitly."]
    ]
  },
  {
    id: "react",
    name: "React",
    group: "Web & mobile",
    round: "Technical",
    intro: "Components, hooks, state and performance.",
    qs: [
      ["f", "Props vs state?", "Props are inputs passed from a parent (read-only in the child). State is data a component owns and updates, causing a re-render."],
      ["f", "What is JSX?", "A syntax extension that looks like HTML inside JavaScript; it compiles to React element calls."],
      ["f", "Why do lists need a key?", "Keys help React identify which items changed, were added or removed. Use stable unique IDs, not array indexes, when the list can change."],
      ["b", "What does useEffect do?", "Runs side effects after render (fetching data, subscriptions). The dependency array controls when it re-runs; return a cleanup function to unsubscribe."],
      ["b", "Controlled vs uncontrolled components?", "Controlled inputs keep their value in React state via value/onChange. Uncontrolled inputs keep their own DOM state, read with refs."],
      ["b", "What is the virtual DOM?", "A lightweight in-memory representation of the UI. React compares (diffs) new and old trees and updates only the changed parts of the real DOM."],
      ["e", "How do you prevent unnecessary re-renders?", "Keep state close to where it’s used, memoise components with React.memo, stabilise callbacks/values with useCallback/useMemo when profiling shows a need, and avoid creating new objects in props."],
      ["e", "Context vs Redux (or other stores)?", "Context passes values without prop drilling — good for theme or auth. A store (Redux Toolkit, Zustand) suits complex, frequently updated shared state with devtools and middleware."]
    ]
  },
  {
    id: "nodejs",
    name: "Node.js & backend APIs",
    group: "Web & mobile",
    round: "Technical",
    intro: "Node.js, Express and REST API design.",
    qs: [
      ["f", "What is Node.js?", "A JavaScript runtime built on Chrome’s V8 engine for running JavaScript on servers, with non-blocking, event-driven I/O."],
      ["f", "What is middleware in Express?", "Functions that run between the request and the response — e.g. parsing JSON, logging, authentication — calling <code>next()</code> to continue."],
      ["f", "What are the common HTTP methods?", "GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE (remove)."],
      ["b", "What do status codes 200, 201, 400, 401, 403, 404 and 500 mean?", "OK, Created, Bad Request, Unauthorized (not authenticated), Forbidden (no permission), Not Found, Internal Server Error."],
      ["b", "What is JWT?", "JSON Web Token — a signed token containing claims, used for stateless authentication. Keep it short-lived and never put secrets in its payload."],
      ["e", "How do you handle errors centrally in Express?", "Use an error-handling middleware with four arguments <code>(err, req, res, next)</code>, map known errors to status codes, log details, and return safe messages."],
      ["e", "How would you secure a REST API?", "HTTPS, authentication (JWT/OAuth), authorisation checks per resource, input validation, rate limiting, parameterised queries, secure headers and secrets in environment variables."]
    ]
  },
  {
    id: "php",
    name: "PHP & Laravel",
    group: "Web & mobile",
    round: "Technical",
    intro: "PHP basics and Laravel framework.",
    qs: [
      ["f", "echo vs print in PHP?", "Both output text. echo can take multiple arguments and has no return value; print takes one argument and returns 1."],
      ["f", "GET vs POST?", "GET sends data in the URL (visible, cacheable, for reading). POST sends data in the request body (for submitting forms and changing data)."],
      ["f", "Session vs cookie?", "Cookies are stored in the browser; sessions store data on the server and use a cookie with a session ID."],
      ["b", "How do you prevent SQL injection in PHP?", "Use prepared statements with PDO or MySQLi and bound parameters — never concatenate user input into SQL."],
      ["b", "What is Eloquent in Laravel?", "Laravel’s ORM, where each model maps to a table and relationships are defined as methods (hasMany, belongsTo)."],
      ["e", "What are Laravel migrations and seeders?", "Migrations version-control the database schema; seeders insert sample or default data."],
      ["e", "What are queues in Laravel used for?", "Moving slow tasks (emails, reports, image processing) to background workers so requests respond quickly."]
    ]
  },
  {
    id: "dotnet",
    name: "C# & .NET",
    group: "Programming",
    round: "Technical",
    intro: "C#, ASP.NET Core and Entity Framework.",
    qs: [
      ["f", "Value type vs reference type in C#?", "Value types (int, struct) hold data directly; reference types (class, string, arrays) hold a reference to data on the heap."],
      ["f", "What is the difference between const and readonly?", "const is a compile-time constant; readonly is set at declaration or in the constructor and can differ per instance."],
      ["b", "What is LINQ?", "Language Integrated Query — query collections and databases with C# syntax: <code>users.Where(u =&gt; u.Age &gt; 18).Select(u =&gt; u.Name)</code>."],
      ["b", "What is async/await in C#?", "Lets I/O-bound code run without blocking threads; await suspends the method until the Task completes."],
      ["b", "What is middleware in ASP.NET Core?", "Components in the request pipeline (routing, authentication, logging) configured in Program.cs, each able to process the request and pass it on."],
      ["e", "Explain dependency injection lifetimes in ASP.NET Core.", "Transient: new instance every time. Scoped: one per request. Singleton: one for the app’s lifetime."],
      ["e", "Entity Framework: tracking vs no-tracking queries?", "Tracking queries keep entities in the change tracker for updates; <code>AsNoTracking()</code> is faster for read-only queries."]
    ]
  },
  {
    id: "sql",
    name: "SQL & databases",
    group: "Data & cloud",
    round: "Technical",
    intro: "Needed for developers, testers, analysts and support engineers.",
    qs: [
      ["f", "Primary key vs foreign key?", "A primary key uniquely identifies each row. A foreign key in another table references it to link records."],
      ["f", "INNER JOIN vs LEFT JOIN?", "INNER JOIN returns only matching rows. LEFT JOIN returns all rows from the left table, with NULLs where there is no match."],
      ["f", "WHERE vs HAVING?", "WHERE filters rows before grouping; HAVING filters groups after GROUP BY."],
      ["f", "DELETE vs TRUNCATE vs DROP?", "DELETE removes selected rows (can use WHERE). TRUNCATE removes all rows quickly. DROP removes the table itself."],
      ["f", "Find the second highest salary.", "<code>SELECT MAX(salary) FROM employees WHERE salary &lt; (SELECT MAX(salary) FROM employees);</code>"],
      ["f", "Find duplicate emails.", "<code>SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) &gt; 1;</code>"],
      ["b", "What is normalisation?", "Organising tables to reduce redundancy: 1NF atomic values, 2NF no partial dependency, 3NF no transitive dependency."],
      ["b", "What is an index and when can it hurt?", "A structure (often a B-tree) that speeds up reads on indexed columns. It uses storage and slows inserts/updates."],
      ["e", "What are ACID properties?", "Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions don’t interfere), Durability (committed data survives failures)."],
      ["e", "Get the top 3 salaries per department.", "<code>SELECT * FROM (SELECT e.*, DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS r FROM employees e) t WHERE r &lt;= 3;</code>"],
      ["e", "How do you optimise a slow query?", "Read the execution plan (EXPLAIN), add or fix indexes, avoid SELECT *, avoid functions on indexed columns in WHERE, rewrite subqueries as joins where useful, and paginate."]
    ]
  },
  {
    id: "data-analyst",
    name: "Data analyst",
    group: "Data & cloud",
    round: "Technical",
    intro: "Excel, SQL, Power BI/Tableau and basic statistics.",
    qs: [
      ["f", "Mean vs median vs mode?", "Mean is the average, median is the middle value when sorted, mode is the most frequent value. Median is better when data has outliers (e.g. salaries)."],
      ["f", "How do you clean a dataset?", "Remove duplicates, handle missing values, fix data types and formats, standardise text, check outliers and validate totals against the source."],
      ["f", "What is a pivot table used for?", "Summarising data quickly — totals, counts and averages by category — without formulas."],
      ["b", "What is a KPI? Give examples.", "A key performance indicator measuring progress toward a goal — e.g. monthly revenue, conversion rate, customer churn, average resolution time."],
      ["b", "Which chart would you use to show trends vs comparisons?", "Line chart for trends over time; bar chart for comparing categories; avoid pie charts with many slices."],
      ["b", "What is DAX in Power BI?", "Data Analysis Expressions — the formula language for measures and calculated columns, e.g. <code>Total Sales = SUM(Sales[Amount])</code>."],
      ["e", "Correlation vs causation?", "Correlation means two variables move together; causation means one causes the other. Proving causation needs experiments or careful analysis."],
      ["e", "How do you present findings to non-technical stakeholders?", "Lead with the answer and its business impact, use one clear chart per point, avoid jargon, and finish with a recommendation and next steps."]
    ]
  },
  {
    id: "data-science",
    name: "Data science & machine learning",
    group: "Data & cloud",
    round: "Technical",
    intro: "Core ML concepts for junior data science and AI roles.",
    qs: [
      ["f", "Supervised vs unsupervised learning?", "Supervised learns from labelled data (predict house prices). Unsupervised finds patterns in unlabelled data (customer segmentation)."],
      ["f", "Classification vs regression?", "Classification predicts categories (spam / not spam); regression predicts continuous values (price)."],
      ["b", "What is overfitting and how do you reduce it?", "The model memorises training data and performs poorly on new data. Reduce with more data, simpler models, regularisation, cross-validation, dropout or early stopping."],
      ["b", "Precision vs recall?", "Precision = correct positive predictions ÷ all positive predictions. Recall = correct positive predictions ÷ all actual positives. F1 is their harmonic mean."],
      ["b", "Why split data into train, validation and test sets?", "Train fits the model, validation tunes it, and test gives an unbiased final estimate of performance on unseen data."],
      ["e", "How do you handle imbalanced classes?", "Use suitable metrics (precision/recall, PR-AUC), resample (oversample minority/undersample majority), use class weights, or adjust the decision threshold."],
      ["e", "What is the bias–variance trade-off?", "High bias = model too simple (underfits); high variance = model too sensitive to training data (overfits). Aim for the balance that minimises error on new data."]
    ]
  },
  {
    id: "devops-cloud",
    name: "DevOps & cloud",
    group: "Data & cloud",
    round: "Technical",
    intro: "CI/CD, containers, AWS/Azure basics and monitoring.",
    qs: [
      ["f", "What is CI/CD?", "Continuous Integration: automatically build and test every change. Continuous Delivery/Deployment: automatically prepare or release tested changes to environments."],
      ["f", "What is Docker?", "A tool to package an application with its dependencies into a container that runs the same way everywhere."],
      ["f", "Container vs virtual machine?", "Containers share the host OS kernel — lightweight, fast to start. VMs include a full guest OS — heavier but stronger isolation."],
      ["b", "What is Kubernetes used for?", "Orchestrating containers: scheduling, scaling, self-healing, rolling updates and service discovery across a cluster."],
      ["b", "Name core AWS services you know.", "EC2 (virtual servers), S3 (object storage), RDS (managed databases), IAM (access control), VPC (networking), CloudWatch (monitoring), Lambda (serverless functions)."],
      ["b", "What is Infrastructure as Code?", "Defining infrastructure in version-controlled files (Terraform, CloudFormation) so environments are reproducible and reviewable."],
      ["e", "How do you do a zero-downtime deployment?", "Rolling or blue-green deployments behind a load balancer, health checks before shifting traffic, backward-compatible database migrations, and quick rollback."],
      ["e", "What would you monitor for a production web service?", "Latency, traffic, error rate and saturation (the “golden signals”), plus logs, alerts with sensible thresholds, and dashboards."]
    ]
  },
  {
    id: "linux-networking",
    name: "Linux & networking",
    group: "Core CS",
    round: "Technical",
    intro: "For support, DevOps, network and system admin roles.",
    qs: [
      ["f", "Common Linux commands you use?", "<code>ls, cd, pwd, cp, mv, rm, cat, less, grep, find, chmod, chown, ps, top, df -h, du -sh, tail -f</code>."],
      ["f", "What does <code>chmod 755 file</code> mean?", "Owner can read/write/execute (7); group and others can read/execute (5)."],
      ["f", "TCP vs UDP?", "TCP is connection-oriented and reliable (web, email). UDP is connectionless and faster with no delivery guarantee (video calls, DNS queries)."],
      ["f", "What is DNS?", "The system that translates domain names (example.com) into IP addresses."],
      ["f", "What is an IP address and subnet mask?", "An IP identifies a device on a network; the subnet mask (e.g. 255.255.255.0 or /24) defines which part is the network and which is the host."],
      ["b", "Name the OSI model layers.", "Physical, Data Link, Network, Transport, Session, Presentation, Application."],
      ["b", "Common ports: 22, 80, 443, 3306?", "22 SSH, 80 HTTP, 443 HTTPS, 3306 MySQL."],
      ["e", "A server is slow. How do you troubleshoot?", "Check CPU and memory (<code>top</code>), disk space and I/O (<code>df -h</code>, <code>iostat</code>), network, recent logs and deployments; find the bottleneck before changing anything."]
    ]
  },
  {
    id: "manual-testing",
    name: "Manual testing / QA",
    group: "Testing",
    round: "Technical",
    intro: "STLC, test cases and defect management.",
    qs: [
      ["f", "What is the STLC?", "Software Testing Life Cycle: requirement analysis → test planning → test case design → environment setup → test execution → test closure."],
      ["f", "Explain the bug life cycle.", "New → Assigned → Open → Fixed → Retest → Verified → Closed; side states include Rejected, Duplicate, Deferred and Reopened."],
      ["f", "Severity vs priority?", "Severity = impact on the system. Priority = urgency to fix. A typo in the company name on the homepage: low severity, high priority."],
      ["f", "Smoke vs sanity vs regression testing?", "Smoke: quick check that core features work in a new build. Sanity: focused check after a small change. Regression: re-test existing features after changes."],
      ["f", "Write test cases for a login page.", "Valid login; wrong password; unregistered user; empty fields; password masking; max length; SQL injection input; lockout after failed attempts; forgot-password link; session handling after logout and back button."],
      ["b", "Verification vs validation?", "Verification: are we building the product right (reviews, walkthroughs)? Validation: are we building the right product (testing against user needs)?"],
      ["b", "Black-box vs white-box testing?", "Black-box tests functionality without seeing code; white-box tests internal logic and code paths."],
      ["b", "Boundary value analysis — example?", "For an age field accepting 18–60, test 17, 18, 19, 59, 60 and 61."],
      ["e", "How do you decide what to test when time is short?", "Risk-based testing: prioritise critical business flows, recently changed areas and historically buggy modules; communicate what wasn’t covered."],
      ["e", "How do you write a good bug report?", "Clear title, environment and build, steps to reproduce, expected vs actual result, severity, screenshots/logs, and reproducibility."]
    ]
  },
  {
    id: "automation-testing",
    name: "Automation testing",
    group: "Testing",
    round: "Technical",
    intro: "Selenium, API testing and frameworks.",
    qs: [
      ["f", "What is Selenium WebDriver?", "A tool to automate browsers by controlling them through code (Java, Python, C#, JavaScript)."],
      ["f", "Which locators does Selenium support?", "id, name, className, tagName, linkText, partialLinkText, cssSelector and xpath. Prefer stable ids or CSS selectors."],
      ["b", "Implicit vs explicit wait?", "Implicit wait applies globally when finding elements. Explicit wait (WebDriverWait + ExpectedConditions) waits for a specific condition. Prefer explicit waits and avoid mixing the two."],
      ["b", "What is the Page Object Model?", "A design pattern where each page is a class holding its locators and actions, keeping tests readable and easier to maintain."],
      ["b", "How do you test an API with Postman?", "Send requests with methods, headers and body; check status code, response body and time; add test scripts and run collections with environments."],
      ["e", "How do you handle flaky tests?", "Find the root cause — timing, test data, environment — use explicit waits, isolate test data, avoid order dependencies, and quarantine until fixed."],
      ["e", "How do you integrate tests into CI?", "Run smoke tests on every pull request and full regression nightly in Jenkins or GitHub Actions, headless browsers, with reports and failure notifications."]
    ]
  },
  {
    id: "android",
    name: "Android (Kotlin)",
    group: "Web & mobile",
    round: "Technical",
    intro: "Android app development with Kotlin.",
    qs: [
      ["f", "Explain the Activity lifecycle.", "onCreate → onStart → onResume (running) → onPause → onStop → onDestroy; onRestart when returning from stopped."],
      ["f", "val vs var in Kotlin?", "val is read-only (cannot be reassigned); var is mutable."],
      ["f", "How does Kotlin handle null safety?", "Types are non-null by default; nullable types use <code>?</code>. Use <code>?.</code>, the Elvis operator <code>?:</code>, and avoid <code>!!</code>."],
      ["b", "What is a ViewModel?", "An architecture component that holds UI data and survives configuration changes like rotation."],
      ["b", "What are coroutines?", "Kotlin’s lightweight way to write asynchronous code sequentially, using suspend functions and scopes like viewModelScope."],
      ["e", "Explain MVVM in Android.", "View (Activity/Compose UI) observes state from the ViewModel; the ViewModel gets data from a Repository, which talks to network and database."],
      ["e", "How do you reduce app crashes and ANRs?", "Keep heavy work off the main thread, handle nulls and errors, monitor with Crashlytics, add tests, and roll out releases gradually."]
    ]
  },
  {
    id: "flutter",
    name: "Flutter",
    group: "Web & mobile",
    round: "Technical",
    intro: "Cross-platform apps with Flutter and Dart.",
    qs: [
      ["f", "StatelessWidget vs StatefulWidget?", "Stateless widgets don’t change after building. Stateful widgets hold mutable state and rebuild when <code>setState</code> is called."],
      ["f", "What is hot reload?", "Injects code changes into the running app and rebuilds widgets while keeping app state — fast UI iteration."],
      ["f", "What does the build() method do?", "Describes the widget’s UI. Flutter calls it whenever the widget needs to be rebuilt, so keep it fast."],
      ["b", "What are keys in Flutter?", "Identifiers that help Flutter preserve state when widgets move or are reordered in a list."],
      ["b", "Future vs Stream?", "A Future gives one value later; a Stream gives a sequence of values over time."],
      ["e", "Compare state management options.", "Provider/Riverpod for simple to medium apps, BLoC for event-driven, testable architecture, GetX for minimal boilerplate. Choose based on team size and complexity."],
      ["e", "How do you improve Flutter app performance?", "Use const widgets, avoid rebuilding large trees, use ListView.builder for long lists, cache images, and profile with DevTools."]
    ]
  },
  {
    id: "ui-ux",
    name: "UI/UX design",
    group: "Web & mobile",
    round: "Technical",
    intro: "For UI designer, UX designer and product designer roles.",
    qs: [
      ["f", "UI vs UX?", "UI is how the product looks and feels (layouts, colours, components). UX is the whole experience — how easily users achieve their goals."],
      ["f", "What is a wireframe vs a prototype?", "A wireframe is a low-fidelity layout; a prototype is an interactive model used to test flows."],
      ["b", "Explain your design process.", "Understand the problem and users → research → define → ideate and wireframe → prototype → test with users → iterate → hand off with specs."],
      ["b", "What is accessibility in design?", "Designing for all users: sufficient colour contrast, readable text sizes, keyboard and screen-reader support, clear labels and touch targets."],
      ["b", "What is a design system?", "A shared library of components, styles and guidelines that keeps products consistent and speeds up design and development."],
      ["e", "How do you handle a stakeholder who disagrees with your design?", "Understand their concern, connect the design to user research or data, propose a test, and stay open to a better solution."],
      ["e", "Which metrics show a design is working?", "Task success rate, time on task, conversion rate, drop-off points, support tickets and user satisfaction scores."]
    ]
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity basics",
    group: "Core CS",
    round: "Technical",
    intro: "Security fundamentals for developers and security analysts.",
    qs: [
      ["f", "What is the CIA triad?", "Confidentiality, Integrity and Availability — the three core goals of information security."],
      ["f", "Encryption vs hashing?", "Encryption is reversible with a key (protect data in transit/at rest). Hashing is one-way (store passwords with a salted, slow hash like bcrypt or Argon2)."],
      ["f", "What is phishing?", "Tricking people with fake emails, messages or sites into revealing credentials or installing malware."],
      ["b", "What are SQL injection and XSS?", "SQL injection inserts malicious SQL through input — prevent with parameterised queries. XSS injects scripts into pages — prevent with output encoding and Content Security Policy."],
      ["b", "What is multi-factor authentication?", "Requiring two or more factors — something you know, have or are — to log in."],
      ["e", "How would you respond to a suspected breach?", "Contain (isolate systems), preserve evidence, assess scope, eradicate the cause, recover, notify as required, and run a post-incident review."]
    ]
  },
  {
    id: "git",
    name: "Git & version control",
    group: "Core CS",
    round: "Technical",
    intro: "Asked in most developer and tester interviews.",
    qs: [
      ["f", "git fetch vs git pull?", "fetch downloads changes without merging; pull = fetch + merge (or rebase) into your current branch."],
      ["f", "What is a branch?", "An independent line of development; work on features without affecting main, then merge."],
      ["f", "Basic workflow to submit a change?", "<code>git checkout -b feature/x</code> → edit → <code>git add</code> → <code>git commit -m</code> → <code>git push</code> → open a pull request → review → merge."],
      ["b", "Merge vs rebase?", "Merge combines histories with a merge commit. Rebase replays your commits on top of another branch for a linear history — don’t rebase shared public branches."],
      ["b", "How do you resolve a merge conflict?", "Open the conflicted files, choose or combine the changes between the markers, test, then <code>git add</code> and commit."],
      ["e", "git reset vs git revert?", "reset moves the branch pointer (rewrites history — local use). revert creates a new commit that undoes a previous one (safe for shared branches)."]
    ]
  }
];
