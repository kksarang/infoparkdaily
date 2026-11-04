/* SQL tutorial — original InfoparkDaily lessons. Queries run in the browser (sql.js / SQLite)
   against a small fictional sample database that is rebuilt on every run. */

export const SQL_SEED = `CREATE TABLE companies (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  park TEXT,
  employees INTEGER
);
CREATE TABLE jobs (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  company_id INTEGER REFERENCES companies(id),
  city TEXT,
  min_exp INTEGER,
  salary_lpa REAL,
  posted_on TEXT
);
INSERT INTO companies VALUES
 (1,'Backwater Labs','Infopark',420),
 (2,'Coconut Cloud','Technopark',1200),
 (3,'Spice Route Analytics','Infopark',85),
 (4,'Monsoon Mobile','Cyberpark',60),
 (5,'Periyar Systems','Technopark',2300);
INSERT INTO jobs VALUES
 (1,'QA Engineer',1,'Kochi',0,3.6,'2026-10-02'),
 (2,'React Developer',2,'Thiruvananthapuram',2,8.0,'2026-10-05'),
 (3,'Data Analyst',3,'Kochi',1,6.0,'2026-10-11'),
 (4,'Flutter Developer',4,'Kozhikode',1,5.5,'2026-10-14'),
 (5,'DevOps Engineer',5,'Thiruvananthapuram',3,12.0,'2026-10-20'),
 (6,'Python Developer',1,'Kochi',2,7.5,'2026-10-22'),
 (7,'UI/UX Designer',2,'Thiruvananthapuram',1,5.0,'2026-10-25'),
 (8,'Business Analyst',3,'Kochi',3,9.0,'2026-10-28'),
 (9,'Support Engineer',NULL,'Kochi',0,3.0,'2026-10-30');`;

const SQLITE = "https://www.sqlite.org/";

export const SQL_TRACK = {
  key: "sql",
  name: "SQL",
  long: "SQL — talk to databases",
  color: "#00758f",
  tagline: "Query, join and summarise data.",
  level: "Beginner",
  lang: "sql",
  seed: SQL_SEED,
  lessons: [
    {
      slug: "introduction",
      title: "SQL introduction",
      summary: "Databases, tables, rows and columns — and your first SELECT.",
      body: `<p>A <strong>relational database</strong> stores data in <strong>tables</strong>. Each table has <strong>columns</strong> (fields such as <code>title</code>, <code>city</code>) and <strong>rows</strong> (one record each). SQL — Structured Query Language — is how you ask the database questions and change its data.</p>
<p>The same core SQL works in MySQL, PostgreSQL, SQL Server, Oracle and SQLite. Our editor uses SQLite and a small <em>fictional</em> database with two tables:</p>
<ul>
<li><code>companies</code> — id, name, park, employees</li>
<li><code>jobs</code> — id, title, company_id, city, min_exp, salary_lpa, posted_on</li>
</ul>
<p><code>SELECT * FROM jobs;</code> means “give me every column of every row in jobs”. Keywords are not case-sensitive, but writing them in capitals keeps queries readable. End each statement with <code>;</code>.</p>`,
      example: `-- Every row and column from the jobs table
SELECT * FROM jobs;`,
      points: ["Tables have columns (fields) and rows (records).", "SELECT reads data; * means all columns.", "End statements with a semicolon."],
      practice: "Show every row from the companies table.",
      quiz: { q: "In a table, what is one record called?", options: ["A column", "A row", "A schema", "A key"], answer: 1, why: "Each record is a row; columns are the fields every row has." },
      interview: [
        ["What is the difference between SQL and MySQL?", "SQL is the query language. MySQL is one database system (an RDBMS) that understands SQL — others include PostgreSQL, SQL Server and Oracle."],
        ["What is a primary key?", "A column (or set of columns) whose value uniquely identifies each row and can't be NULL — for example jobs.id."]
      ],
      further: [["SQLite SELECT syntax", SQLITE + "lang_select.html"]]
    },
    {
      slug: "select-where",
      title: "SELECT & WHERE",
      summary: "Choosing columns and filtering rows with WHERE, AND, OR, IN, BETWEEN and LIKE.",
      body: `<p>List the columns you need instead of <code>*</code> — it's faster and clearer. Rename a column in the output with <code>AS</code>.</p>
<p><code>WHERE</code> keeps only rows that match a condition:</p>
<ul>
<li>Comparison: <code>= &lt;&gt; &lt; &gt; &lt;= &gt;=</code></li>
<li>Combine: <code>AND</code>, <code>OR</code>, <code>NOT</code> (use brackets to be clear)</li>
<li><code>city IN ('Kochi', 'Kozhikode')</code> — matches any value in a list</li>
<li><code>salary_lpa BETWEEN 5 AND 8</code> — inclusive range</li>
<li><code>title LIKE '%Developer%'</code> — pattern: <code>%</code> any text, <code>_</code> one character</li>
<li><code>company_id IS NULL</code> — missing values (never <code>= NULL</code>)</li>
</ul>`,
      example: `SELECT title, city, salary_lpa AS lpa
FROM jobs
WHERE city = 'Kochi'
  AND min_exp <= 1;`,
      points: ["Select only the columns you need.", "Text values go in single quotes.", "Use IS NULL, not = NULL."],
      practice: "List the title and salary of jobs whose title contains 'Developer' and pay between 5 and 8 LPA.",
      quiz: { q: "Which pattern matches titles that start with 'Data'?", options: ["LIKE '%Data'", "LIKE 'Data%'", "LIKE '_Data'", "= 'Data*'"], answer: 1, why: "'Data%' means 'Data' followed by anything." },
      interview: [
        ["Why does WHERE column = NULL return nothing?", "NULL means unknown, and any comparison with unknown is unknown (not true). Use IS NULL or IS NOT NULL."],
        ["What is the difference between WHERE and HAVING?", "WHERE filters individual rows before grouping; HAVING filters groups after GROUP BY, so it can use aggregates like COUNT(*)."]
      ],
      further: [["SQLite expressions (LIKE, IN, BETWEEN)", SQLITE + "lang_expr.html"]]
    },
    {
      slug: "order-limit",
      title: "ORDER BY, LIMIT & DISTINCT",
      summary: "Sorting results, taking the top rows and removing duplicates.",
      body: `<p><code>ORDER BY column</code> sorts results — ascending by default, add <code>DESC</code> for largest first. Sort by several columns: <code>ORDER BY city, salary_lpa DESC</code>.</p>
<p><code>LIMIT n</code> returns only the first n rows; <code>LIMIT n OFFSET m</code> skips m rows first — the basis of pagination. (SQL Server uses <code>TOP</code>, Oracle uses <code>FETCH FIRST</code>.)</p>
<p><code>SELECT DISTINCT city FROM jobs</code> lists each city once.</p>`,
      example: `-- Top 3 best-paying jobs
SELECT title, city, salary_lpa
FROM jobs
ORDER BY salary_lpa DESC
LIMIT 3;

-- Each city once
SELECT DISTINCT city FROM jobs ORDER BY city;`,
      points: ["ORDER BY … DESC for highest first.", "LIMIT / OFFSET for top-N and pages.", "DISTINCT removes duplicate rows."],
      practice: "Show the 2 most recently posted jobs (use posted_on).",
      quiz: { q: "How do you sort from highest to lowest salary?", options: ["ORDER BY salary_lpa", "ORDER BY salary_lpa DESC", "SORT salary_lpa DOWN", "ORDER salary_lpa HIGH"], answer: 1, why: "DESC means descending — largest first." },
      interview: [
        ["How would you find the second-highest salary?", "One way: SELECT MAX(salary_lpa) FROM jobs WHERE salary_lpa < (SELECT MAX(salary_lpa) FROM jobs). Another: ORDER BY salary_lpa DESC LIMIT 1 OFFSET 1 on the distinct salaries."],
        ["Does the order of rows in a table have meaning without ORDER BY?", "No. Without ORDER BY the database may return rows in any order, so always sort when order matters."]
      ],
      further: [["SQLite ORDER BY & LIMIT", SQLITE + "lang_select.html#orderby"]]
    },
    {
      slug: "aggregates",
      title: "Aggregates & GROUP BY",
      summary: "COUNT, SUM, AVG, MIN, MAX, grouping rows and filtering groups with HAVING.",
      body: `<p>Aggregate functions turn many rows into one value: <code>COUNT(*)</code>, <code>SUM(x)</code>, <code>AVG(x)</code>, <code>MIN(x)</code>, <code>MAX(x)</code>.</p>
<p><code>GROUP BY</code> splits rows into groups and calculates the aggregate for each — for example the number of jobs per city. Every selected column must either be in the GROUP BY or inside an aggregate.</p>
<p><code>HAVING</code> filters the groups: <code>HAVING COUNT(*) &gt;= 2</code>.</p>`,
      example: `SELECT city,
       COUNT(*)              AS openings,
       ROUND(AVG(salary_lpa), 1) AS avg_lpa,
       MAX(salary_lpa)       AS top_lpa
FROM jobs
GROUP BY city
HAVING COUNT(*) >= 2
ORDER BY openings DESC;`,
      points: ["Aggregates summarise many rows.", "GROUP BY makes one result row per group.", "HAVING filters groups; WHERE filters rows."],
      practice: "Count how many jobs each company_id has posted, including the NULL group.",
      quiz: { q: "Which clause filters groups after GROUP BY?", options: ["WHERE", "HAVING", "LIMIT", "FILTER"], answer: 1, why: "HAVING is applied to groups, so it can use aggregates." },
      interview: [
        ["COUNT(*) vs COUNT(column)?", "COUNT(*) counts all rows. COUNT(column) counts only rows where that column is not NULL."],
        ["What is the logical order a SELECT runs in?", "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. That's why a SELECT alias can't be used in WHERE."]
      ],
      further: [["SQLite aggregate functions", SQLITE + "lang_aggfunc.html"]]
    },
    {
      slug: "joins",
      title: "JOINs",
      summary: "Combining tables with INNER JOIN and LEFT JOIN.",
      body: `<p>Data is split across tables to avoid repetition: jobs store a <code>company_id</code> instead of copying the company's name. A <strong>JOIN</strong> puts them back together using a matching condition.</p>
<ul>
<li><code>INNER JOIN</code> — only rows that match in both tables.</li>
<li><code>LEFT JOIN</code> — every row from the left table, with NULLs where the right table has no match.</li>
</ul>
<p>Use short table aliases (<code>j</code>, <code>c</code>) and prefix columns with them so it's clear where each comes from.</p>`,
      example: `-- Jobs with their company (support job has no company, so it disappears)
SELECT j.title, c.name AS company, c.park
FROM jobs j
INNER JOIN companies c ON c.id = j.company_id;

-- Keep every job, even without a company
SELECT j.title, COALESCE(c.name, 'Not disclosed') AS company
FROM jobs j
LEFT JOIN companies c ON c.id = j.company_id;`,
      points: ["JOIN … ON says how rows match.", "INNER keeps matches only; LEFT keeps all left rows.", "COALESCE replaces NULL with a fallback."],
      practice: "List each company name with how many jobs it has posted — include companies with zero jobs (hint: companies LEFT JOIN jobs).",
      quiz: { q: "Which join keeps every row from the first table even without a match?", options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "SELF JOIN"], answer: 1, why: "LEFT JOIN keeps all left-table rows and fills missing right-side values with NULL." },
      interview: [
        ["Explain INNER vs LEFT vs FULL OUTER JOIN.", "INNER returns matching rows only. LEFT returns all left rows plus matches. FULL OUTER returns all rows from both sides, matched where possible and NULL elsewhere."],
        ["What is a self join?", "Joining a table to itself with different aliases — e.g. employees e JOIN employees m ON e.manager_id = m.id to show each employee with their manager."]
      ],
      further: [["SQLite join syntax", SQLITE + "syntax/join-clause.html"]]
    },
    {
      slug: "modify-data",
      title: "INSERT, UPDATE & DELETE",
      summary: "Adding, changing and removing rows safely.",
      body: `<p>These statements change data:</p>
<ul>
<li><code>INSERT INTO jobs (title, city) VALUES ('Tester', 'Kochi');</code> — add a row. Name the columns so the statement survives table changes.</li>
<li><code>UPDATE jobs SET salary_lpa = 4 WHERE id = 1;</code> — change rows.</li>
<li><code>DELETE FROM jobs WHERE id = 9;</code> — remove rows.</li>
</ul>
<p><strong>Always write the WHERE clause first.</strong> UPDATE or DELETE without WHERE changes every row. In real systems, run a SELECT with the same WHERE to preview, and use transactions (<code>BEGIN</code> … <code>COMMIT</code> / <code>ROLLBACK</code>).</p>
<p>Don't worry here — the sample database is rebuilt every time you press Run.</p>`,
      example: `INSERT INTO jobs (title, company_id, city, min_exp, salary_lpa, posted_on)
VALUES ('Junior Tester', 4, 'Kozhikode', 0, 3.2, '2026-11-01');

UPDATE jobs SET salary_lpa = salary_lpa + 0.5 WHERE city = 'Kozhikode';

DELETE FROM jobs WHERE company_id IS NULL;

SELECT id, title, city, salary_lpa FROM jobs ORDER BY id;`,
      points: ["Name columns in INSERT.", "Never run UPDATE/DELETE without WHERE by accident.", "Preview with SELECT; use transactions in production."],
      practice: "Add a new company in 'Cyberpark' with 40 employees, then show all Cyberpark companies.",
      quiz: { q: "What happens with DELETE FROM jobs; (no WHERE)?", options: ["Nothing", "The table is dropped", "Every row is deleted", "Only the first row is deleted"], answer: 2, why: "Without WHERE, DELETE removes all rows (the table itself stays)." },
      interview: [
        ["DELETE vs TRUNCATE vs DROP?", "DELETE removes chosen rows and can be rolled back. TRUNCATE quickly removes all rows (not available in SQLite). DROP removes the whole table and its structure."],
        ["What is a transaction and what does ACID mean?", "A group of statements that succeed or fail together. ACID: Atomicity, Consistency, Isolation, Durability."]
      ],
      further: [["SQLite INSERT", SQLITE + "lang_insert.html"], ["SQLite UPDATE", SQLITE + "lang_update.html"], ["SQLite DELETE", SQLITE + "lang_delete.html"]]
    },
    {
      slug: "create-table",
      title: "Creating tables & constraints",
      summary: "CREATE TABLE, data types, PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT and FOREIGN KEY.",
      body: `<p><code>CREATE TABLE</code> defines a table's columns and rules. Constraints protect your data:</p>
<ul>
<li><code>PRIMARY KEY</code> — unique id for each row.</li>
<li><code>NOT NULL</code> — the value is required.</li>
<li><code>UNIQUE</code> — no two rows may share the value (e.g. email).</li>
<li><code>DEFAULT</code> — value used when none is given.</li>
<li><code>CHECK (salary_lpa &gt; 0)</code> — custom rule.</li>
<li><code>REFERENCES other(id)</code> — a foreign key pointing to another table.</li>
</ul>
<p>Common types: <code>INTEGER</code>, <code>REAL</code>/<code>DECIMAL</code>, <code>TEXT</code>/<code>VARCHAR(n)</code>, <code>DATE</code>, <code>BOOLEAN</code> (names vary slightly between databases).</p>`,
      example: `CREATE TABLE applicants (
  id INTEGER PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  job_id INTEGER REFERENCES jobs(id),
  status TEXT DEFAULT 'applied',
  CHECK (status IN ('applied', 'interview', 'offer', 'rejected'))
);

INSERT INTO applicants (full_name, email, job_id) VALUES ('Anu', 'anu@example.com', 3);
INSERT INTO applicants (full_name, email, job_id, status) VALUES ('Rahul', 'rahul@example.com', 3, 'interview');

SELECT a.full_name, a.status, j.title
FROM applicants a JOIN jobs j ON j.id = a.job_id;`,
      points: ["Constraints stop bad data at the source.", "Foreign keys link tables.", "DEFAULT fills in missing values."],
      practice: "Try inserting a second applicant with the email 'anu@example.com' and read the error message.",
      quiz: { q: "Which constraint prevents two rows from having the same email?", options: ["NOT NULL", "DEFAULT", "UNIQUE", "CHECK"], answer: 2, why: "UNIQUE rejects a value that already exists in that column." },
      interview: [
        ["What is normalization?", "Organising tables to reduce duplication — for example storing company details once in companies and referencing them by id from jobs."],
        ["Primary key vs unique key?", "A table has one primary key and it can't be NULL. It can have several UNIQUE constraints, and (in most databases) those columns may allow NULL."]
      ],
      further: [["SQLite CREATE TABLE", SQLITE + "lang_createtable.html"], ["SQLite datatypes", SQLITE + "datatype3.html"]]
    },
    {
      slug: "subqueries",
      title: "Subqueries & CTEs",
      summary: "Queries inside queries, and readable WITH clauses.",
      body: `<p>A <strong>subquery</strong> is a SELECT inside another statement. Use it to compare against a calculated value — “jobs paying more than the average” — or with <code>IN</code> to match a list built by another query.</p>
<p>A <strong>CTE</strong> (Common Table Expression) names a subquery with <code>WITH name AS (…)</code> at the top, so long queries read step by step.</p>
<p>Many interview questions — second-highest salary, top-N per group, duplicates — are easiest with a subquery or CTE.</p>`,
      example: `-- Jobs paying above the overall average
SELECT title, salary_lpa
FROM jobs
WHERE salary_lpa > (SELECT AVG(salary_lpa) FROM jobs);

-- Same idea with a CTE, per park
WITH park_pay AS (
  SELECT c.park, AVG(j.salary_lpa) AS avg_lpa
  FROM jobs j JOIN companies c ON c.id = j.company_id
  GROUP BY c.park
)
SELECT park, ROUND(avg_lpa, 2) AS avg_lpa
FROM park_pay
ORDER BY avg_lpa DESC;`,
      points: ["Subqueries can return one value or a list.", "WITH … AS names a step for readability.", "Great for 'compare with an aggregate' questions."],
      practice: "List companies that have at least one job paying 8 LPA or more, using WHERE id IN (subquery).",
      quiz: { q: "Which keyword starts a CTE?", options: ["CTE", "WITH", "DEFINE", "AS"], answer: 1, why: "A CTE begins with WITH name AS ( … )." },
      interview: [
        ["Correlated vs non-correlated subquery?", "A non-correlated subquery runs once on its own. A correlated subquery refers to the outer row, so it is evaluated per row — often rewritten as a JOIN for speed."],
        ["How do you find duplicate emails in a table?", "SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;"]
      ],
      further: [["SQLite WITH clause", SQLITE + "lang_with.html"]]
    }
  ]
};
