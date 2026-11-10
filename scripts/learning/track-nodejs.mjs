/* Node.js & Express tutorial — original InfoparkDaily lessons. Examples show code and the output you get when you run it locally. */

const NODE = "https://nodejs.org/en/learn/";
const EXPRESS = "https://expressjs.com/en/";

export const NODE_TRACK = {
  key: "nodejs",
  name: "Node.js",
  long: "Node.js & Express — build REST APIs and backend services with JavaScript",
  color: "#3c873a",
  tagline: "Backend JavaScript and REST APIs.",
  level: "Beginner → Intermediate",
  lang: "static",
  feature: "Code + expected output",
  heroLine: "Every lesson has complete code with the output you'll see when you run it",
  exampleTitle: "Example code",
  exampleBadge: "Run with Node.js 20+",
  outputTitle: "Output",
  exampleNote: "Save the code in a file such as <code>app.js</code> and run <code>node app.js</code>. For Express lessons, run <code>npm install express</code> first. Names and data are fictional.",
  lessons: [
    {
      slug: "introduction",
      title: "Node.js introduction",
      summary: "What Node.js is, why companies use it, installing it and running your first script.",
      body: `<p><strong>Node.js</strong> runs JavaScript outside the browser, on servers and your computer. It's built on Chrome's V8 engine and is used for REST APIs, real-time apps (chat, notifications), command-line tools and build tools such as Vite and Webpack.</p>
<p>Node is <strong>non-blocking</strong>: while it waits for a file, database or network call, it keeps serving other requests instead of sitting idle. That makes one Node process good at handling many connections at once.</p>
<h3>Setup</h3>
<ol>
<li>Install the LTS version from nodejs.org (it includes <code>npm</code>, the package manager).</li>
<li>Check it in a terminal: <code>node -v</code> and <code>npm -v</code>.</li>
<li>Write JavaScript in a <code>.js</code> file and run it with <code>node file.js</code>.</li>
</ol>
<p>There's no <code>window</code> or <code>document</code> in Node — instead you get modules for files, networking, processes and more.</p>`,
      example: `// app.js
const name = "InfoparkDaily";
const skills = ["JavaScript", "Node.js", "Express"];

console.log("Hello from " + name + "!");
console.log("Node version:", process.version);
console.log("Skills:", skills.join(", "));`,
      output: `Hello from InfoparkDaily!
Node version: v20.18.0
Skills: JavaScript, Node.js, Express`,
      points: ["Node.js runs JavaScript on the server.", "It is non-blocking and event-driven, good for I/O-heavy apps.", "npm comes with Node and installs packages.", "Run a file with node file.js."],
      practice: "Install Node.js LTS, create hello.js that prints your name and today's date (new Date().toDateString()), and run it.",
      quiz: { q: "Why is Node.js good at handling many requests at once?", options: ["It creates a new thread for every request", "It doesn't wait idle on I/O — it handles other work meanwhile", "It only works with small files", "It compiles JavaScript to Java"], answer: 1, why: "Node's event loop lets one process continue with other requests while file, database or network calls are in progress." },
      interview: [
        ["What is Node.js?", "A JavaScript runtime built on the V8 engine that runs JavaScript outside the browser. It's event-driven and non-blocking, which suits APIs and real-time apps."],
        ["Is Node.js single-threaded?", "Your JavaScript runs on a single main thread with an event loop, but Node uses a background thread pool (libuv) for some work such as file system operations and crypto, and you can use worker threads for CPU-heavy tasks."]
      ],
      further: [["Introduction to Node.js", NODE + "getting-started/introduction-to-nodejs"]]
    },
    {
      slug: "modules-npm",
      title: "Modules & npm",
      summary: "Splitting code into modules with import/export, package.json and installing packages.",
      body: `<p>Real projects split code into <strong>modules</strong> — one file per responsibility. Modern Node uses ES modules (<code>import</code>/<code>export</code>). Add <code>"type": "module"</code> to <code>package.json</code> to use them. Older code uses CommonJS (<code>require</code>/<code>module.exports</code>); you'll see both at work.</p>
<h3>package.json and npm</h3>
<ul>
<li><code>npm init -y</code> creates <code>package.json</code>, which lists your project's name, scripts and dependencies.</li>
<li><code>npm install express</code> adds a package to <code>dependencies</code> and downloads it into <code>node_modules</code>.</li>
<li><code>npm install -D nodemon</code> adds a <em>dev</em> dependency, used only during development.</li>
<li><code>package-lock.json</code> records exact versions so every install matches. Commit it; never commit <code>node_modules</code>.</li>
</ul>`,
      example: `// salary.js
export function monthly(lpa) {
  return Math.round((lpa * 100000) / 12);
}

// app.js   (package.json has "type": "module")
import { monthly } from "./salary.js";

const offers = [4.5, 6, 8.2];
for (const lpa of offers) {
  console.log(lpa + " LPA = Rs " + monthly(lpa) + " per month");
}`,
      output: `4.5 LPA = Rs 37500 per month
6 LPA = Rs 50000 per month
8.2 LPA = Rs 68333 per month`,
      points: ["Use import/export (ES modules) for new code.", "package.json lists dependencies and scripts.", "Commit package-lock.json, not node_modules.", "Use npm scripts such as npm run dev to run common commands."],
      practice: "Create a module with two functions (add GST to a price, and format a number as rupees), import both in app.js and print the results.",
      quiz: { q: "Which file should you NOT commit to Git?", options: ["package.json", "package-lock.json", "node_modules", "app.js"], answer: 2, why: "node_modules is recreated by npm install from package.json and the lock file. Add it to .gitignore." },
      interview: [
        ["What is the difference between dependencies and devDependencies?", "dependencies are needed to run the app in production (express, a database driver). devDependencies are only needed while developing or testing (nodemon, jest, eslint)."],
        ["CommonJS vs ES modules?", "CommonJS uses require and module.exports and loads synchronously; it's the older Node default. ES modules use import/export, are the JavaScript standard, and work in browsers and modern Node."]
      ],
      further: [["npm docs: package.json", "https://docs.npmjs.com/cli/configuring-npm/package-json"]]
    },
    {
      slug: "async",
      title: "Async code: callbacks, promises & async/await",
      summary: "How Node handles slow work, the event loop, and writing clean async code with async/await.",
      body: `<p>Reading a file, querying a database or calling an API takes time. Node starts the work, carries on, and runs your code when the result is ready. There are three styles:</p>
<ol>
<li><strong>Callbacks</strong> — pass a function to run later. Nesting many of them leads to “callback hell”.</li>
<li><strong>Promises</strong> — an object representing a future result, with <code>.then()</code> and <code>.catch()</code>.</li>
<li><strong>async/await</strong> — write promise code that reads top to bottom. Use <code>try/catch</code> for errors. This is the style to use today.</li>
</ol>
<p>To run independent tasks at the same time, start them together with <code>Promise.all</code> instead of awaiting one after another.</p>`,
      example: `// async.js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchJob(id) {
  await wait(500); // pretend this is a database call
  return { id, title: "Node.js Developer " + id };
}

async function main() {
  console.log("Start");
  const jobs = await Promise.all([fetchJob(1), fetchJob(2), fetchJob(3)]);
  jobs.forEach((j) => console.log(j.title));
  console.log("Done (about 0.5s, not 1.5s)");
}

main().catch((err) => console.error("Failed:", err.message));`,
      output: `Start
Node.js Developer 1
Node.js Developer 2
Node.js Developer 3
Done (about 0.5s, not 1.5s)`,
      points: ["Node doesn't wait idle — async work finishes later.", "Prefer async/await with try/catch.", "Use Promise.all for independent tasks.", "Always handle promise errors."],
      practice: "Write an async function that 'loads' a user and their applications using two wait() calls, first one after another and then with Promise.all, and compare the timing with console.time().",
      quiz: { q: "Three independent API calls each take 1 second. How long does await Promise.all([a(), b(), c()]) take?", options: ["About 3 seconds", "About 1 second", "About 0 seconds", "It depends on the order"], answer: 1, why: "Promise.all starts all three at once and waits for the slowest, so the total is about the longest single call." },
      interview: [
        ["What is the event loop?", "The mechanism that lets Node run callbacks when async work completes. The call stack runs synchronous code; finished async operations queue callbacks, and the event loop moves them onto the stack when it's empty, processing promise microtasks before timers and I/O callbacks."],
        ["What happens if you don't handle a rejected promise?", "Node reports an unhandled promise rejection, and in recent versions the process exits with an error. Always use try/catch with await or .catch() on promises."]
      ],
      further: [["The Node.js event loop", NODE + "asynchronous-work/event-loop-timers-and-nexttick"]]
    },
    {
      slug: "files-http",
      title: "Files, paths & the HTTP module",
      summary: "Reading and writing files with fs/promises, building paths safely and a basic HTTP server.",
      body: `<p>Node's built-in modules cover the basics without installing anything:</p>
<ul>
<li><code>node:fs/promises</code> — read and write files with promises.</li>
<li><code>node:path</code> — build file paths that work on Windows, macOS and Linux.</li>
<li><code>node:http</code> — create a web server.</li>
</ul>
<p>The raw <code>http</code> module shows what a server really does: receive a request (method, URL, headers, body) and send back a response (status code, headers, body). Express, in the next lesson, builds on exactly this.</p>
<p>Configuration such as ports and API keys comes from <strong>environment variables</strong> (<code>process.env.PORT</code>), not hard-coded values.</p>`,
      example: `// server.js
import http from "node:http";
import { readFile } from "node:fs/promises";

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  if (req.url === "/jobs") {
    const data = await readFile("./jobs.json", "utf8");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

server.listen(PORT, () => console.log("Listening on http://localhost:" + PORT));

// Then, in another terminal:  curl http://localhost:3000/jobs`,
      output: `Listening on http://localhost:3000

$ curl http://localhost:3000/jobs
[{"id":1,"title":"Node.js Developer","city":"Kochi"}]`,
      points: ["Use node:fs/promises with await for file work.", "Use node:path to join paths.", "A server reads the request and writes a status, headers and body.", "Read config such as PORT from process.env."],
      practice: "Add a /health route that returns {\"status\":\"ok\"} with status 200, and make unknown routes return JSON {\"error\":\"Not found\"} with status 404.",
      quiz: { q: "Why use process.env.PORT instead of writing 3000 in the code?", options: ["It runs faster", "Hosting platforms set the port, and config shouldn't be hard-coded", "Node requires it", "It encrypts the port"], answer: 1, why: "Cloud platforms assign the port through an environment variable, and keeping config outside code lets the same build run anywhere." },
      interview: [
        ["Why avoid fs.readFileSync in a server?", "Synchronous calls block the event loop, so no other request is served while the file is read. Use the async (promise) versions in request handlers."],
        ["What is a stream in Node?", "A way to process data piece by piece instead of loading it all into memory — for example piping a large file to the response. Streams keep memory use low for big files and uploads."]
      ],
      further: [["fs module", "https://nodejs.org/api/fs.html"], ["http module", "https://nodejs.org/api/http.html"]]
    },
    {
      slug: "express-basics",
      title: "Express: routes & middleware",
      summary: "Creating an Express app, route parameters, query strings, JSON bodies and middleware.",
      body: `<p><strong>Express</strong> is the most widely used Node web framework. It adds clean routing and <strong>middleware</strong> on top of the http module.</p>
<ul>
<li><strong>Routes</strong>: <code>app.get</code>, <code>app.post</code>, <code>app.put</code>, <code>app.delete</code> with a path and a handler <code>(req, res)</code>.</li>
<li><strong>Route parameters</strong>: <code>/jobs/:id</code> → <code>req.params.id</code>.</li>
<li><strong>Query strings</strong>: <code>/jobs?city=Kochi</code> → <code>req.query.city</code>.</li>
<li><strong>JSON body</strong>: add <code>app.use(express.json())</code>, then read <code>req.body</code>.</li>
</ul>
<p><strong>Middleware</strong> is a function <code>(req, res, next)</code> that runs before your routes — logging, authentication, parsing. It either sends a response or calls <code>next()</code> to pass control on.</p>`,
      example: `// app.js   (npm install express)
import express from "express";

const app = express();
app.use(express.json());

// middleware: log every request
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

const jobs = [
  { id: 1, title: "Node.js Developer", city: "Kochi" },
  { id: 2, title: "QA Engineer", city: "Trivandrum" }
];

app.get("/jobs", (req, res) => {
  const { city } = req.query;
  res.json(city ? jobs.filter((j) => j.city === city) : jobs);
});

app.get("/jobs/:id", (req, res) => {
  const job = jobs.find((j) => j.id === Number(req.params.id));
  if (!job) return res.status(404).json({ error: "Job not found" });
  res.json(job);
});

app.listen(3000, () => console.log("API on http://localhost:3000"));`,
      output: `API on http://localhost:3000
GET /jobs?city=Kochi
GET /jobs/9

$ curl "http://localhost:3000/jobs?city=Kochi"
[{"id":1,"title":"Node.js Developer","city":"Kochi"}]

$ curl http://localhost:3000/jobs/9
{"error":"Job not found"}`,
      points: ["Express adds routing and middleware to Node.", "req.params for path values, req.query for ?filters, req.body for JSON.", "Middleware calls next() or sends a response.", "Return proper status codes such as 404."],
      practice: "Add GET /jobs?q=node that returns jobs whose title contains the search word, ignoring upper/lower case.",
      quiz: { q: "In /jobs/:id, how do you read the id?", options: ["req.query.id", "req.body.id", "req.params.id", "res.id"], answer: 2, why: "Named path segments like :id are available on req.params. req.query holds ?key=value pairs." },
      interview: [
        ["What is middleware in Express?", "A function with (req, res, next) that runs in order for matching requests. It can change the request, end the response, or call next() — used for logging, auth, validation, CORS and error handling."],
        ["What is the difference between app.use and app.get?", "app.get handles only GET requests for a path. app.use mounts middleware (or a router) for every method on a path prefix."]
      ],
      further: [["Express routing", EXPRESS + "guide/routing.html"], ["Writing middleware", EXPRESS + "guide/writing-middleware.html"]]
    },
    {
      slug: "rest-api",
      title: "Build a REST API (CRUD)",
      summary: "Create, read, update and delete with Express routers, validation and correct status codes.",
      body: `<p>A <strong>REST API</strong> exposes resources (jobs, users) at URLs and uses HTTP methods for actions:</p>
<ul>
<li><code>GET /jobs</code> — list · <code>GET /jobs/:id</code> — one item</li>
<li><code>POST /jobs</code> — create → <strong>201 Created</strong></li>
<li><code>PUT /jobs/:id</code> — replace · <code>PATCH</code> — partly update</li>
<li><code>DELETE /jobs/:id</code> — remove → <strong>204 No Content</strong></li>
</ul>
<p>Use <code>express.Router()</code> to keep each resource in its own file, and validate input before saving. Return <strong>400</strong> for bad input and <strong>404</strong> when an item doesn't exist.</p>`,
      example: `// routes/jobs.js
import { Router } from "express";

const router = Router();
let jobs = [];
let nextId = 1;

router.post("/", (req, res) => {
  const { title, city } = req.body;
  if (!title || !city) {
    return res.status(400).json({ error: "title and city are required" });
  }
  const job = { id: nextId++, title, city };
  jobs.push(job);
  res.status(201).json(job);
});

router.get("/", (req, res) => res.json(jobs));

router.delete("/:id", (req, res) => {
  const before = jobs.length;
  jobs = jobs.filter((j) => j.id !== Number(req.params.id));
  if (jobs.length === before) return res.status(404).json({ error: "Not found" });
  res.status(204).end();
});

export default router;

// app.js:  app.use("/api/jobs", jobsRouter);`,
      output: `$ curl -X POST localhost:3000/api/jobs -H "Content-Type: application/json" -d '{"title":"Backend Developer","city":"Kochi"}'
{"id":1,"title":"Backend Developer","city":"Kochi"}      (201 Created)

$ curl -X POST localhost:3000/api/jobs -H "Content-Type: application/json" -d '{"title":"Tester"}'
{"error":"title and city are required"}                  (400 Bad Request)

$ curl -X DELETE localhost:3000/api/jobs/1 -i
HTTP/1.1 204 No Content`,
      points: ["Map actions to HTTP methods: GET, POST, PUT/PATCH, DELETE.", "Return 201 after create, 204 after delete, 400 for bad input, 404 if missing.", "Use a Router per resource.", "Validate request bodies before saving."],
      practice: "Add PATCH /api/jobs/:id that updates only the fields sent in the body and returns the updated job (404 if the id doesn't exist).",
      quiz: { q: "Which status code fits a successful POST that created a record?", options: ["200 OK", "201 Created", "204 No Content", "302 Found"], answer: 1, why: "201 Created tells the client a new resource was made; it usually returns the new item." },
      interview: [
        ["What is the difference between PUT and PATCH?", "PUT replaces the whole resource with the data sent. PATCH changes only the fields sent. PUT is idempotent — sending the same request twice gives the same result."],
        ["How do you validate input in an Express API?", "Check required fields and types before using them — by hand for small APIs, or with a schema library such as Zod or Joi — and return 400 with a clear message when validation fails."]
      ],
      further: [["express.Router", EXPRESS + "4x/api.html#router"]]
    },
    {
      slug: "database-auth",
      title: "Databases, errors & JWT auth",
      summary: "Connecting to a database, central error handling, environment secrets and protecting routes with JWT.",
      body: `<p>Production APIs store data in a database. Popular choices with Node are <strong>PostgreSQL/MySQL</strong> (with Prisma, Knex or the pg driver) and <strong>MongoDB</strong> (with Mongoose). Whatever you use, always pass user input as <strong>query parameters</strong>, never by joining strings — that prevents SQL injection.</p>
<h3>Error handling</h3>
<p>Add one error-handling middleware with four arguments <code>(err, req, res, next)</code> at the end. Routes pass errors to it with <code>next(err)</code> (Express 5 does this automatically for async handlers), so every error returns a consistent JSON response.</p>
<h3>Authentication with JWT</h3>
<ol>
<li>On login, check the password against a <strong>bcrypt hash</strong> (never store plain passwords).</li>
<li>Sign a JWT with a secret from <code>process.env</code> and send it to the client.</li>
<li>The client sends <code>Authorization: Bearer &lt;token&gt;</code>; middleware verifies it before protected routes.</li>
</ol>`,
      example: `// auth.js   (npm install jsonwebtoken)
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET; // never hard-code secrets

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Login required" });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// app.js
app.get("/api/me/applications", requireAuth, async (req, res) => {
  const { rows } = await db.query(
    "SELECT id, job_title FROM applications WHERE user_id = $1",
    [req.user.id]
  );
  res.json(rows);
});

// last middleware: central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});`,
      output: `$ curl localhost:3000/api/me/applications
{"error":"Login required"}                              (401)

$ curl localhost:3000/api/me/applications -H "Authorization: Bearer eyJhbGciOi..."
[{"id":12,"job_title":"Node.js Developer"}]             (200)`,
      points: ["Use parameterised queries to prevent SQL injection.", "Hash passwords with bcrypt; never store them in plain text.", "Keep secrets in environment variables.", "One error-handling middleware gives consistent error responses.", "Verify JWTs in middleware before protected routes."],
      practice: "Write a POST /api/login route that checks an email and password against a hard-coded user with a bcrypt hash, and returns a JWT that expires in 1 hour.",
      quiz: { q: "Which status code should a protected route return when no token is sent?", options: ["400", "401", "404", "500"], answer: 1, why: "401 Unauthorized means the request lacks valid authentication. 403 Forbidden is for a logged-in user who isn't allowed." },
      interview: [
        ["How does JWT authentication work?", "After login the server signs a token containing the user's id and roles. The client sends it on each request in the Authorization header; the server verifies the signature and expiry, so it doesn't need to store sessions. Don't put secrets in the payload — it's only encoded, not encrypted."],
        ["How do you handle errors centrally in Express?", "Add error-handling middleware with four parameters (err, req, res, next) after all routes. Routes call next(err) (or throw in Express 5 async handlers), and the handler logs the error and returns a consistent JSON response with the right status."]
      ],
      further: [["Express error handling", EXPRESS + "guide/error-handling.html"], ["Node.js security best practices", NODE + "getting-started/security-best-practices"]]
    }
  ]
};
