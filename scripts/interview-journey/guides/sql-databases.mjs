/* SQL & Databases — 30 Important Interview Questions & Answers. Original InfoparkDaily content. Format: see guides/index.mjs. */
export const meta = {
  slug: "sql-databases",
  field: "it",
  name: "SQL & databases",
  count: 30,
  topics: "SQL queries, joins, aggregation, subqueries, window functions, keys, normalisation, indexes and transactions",
  level: "Fresher to experienced"
};

export const text = `
## SQL basics

### What is the difference between DDL, DML, DCL and TCL?
- **DDL** (Data Definition): defines structure — \`CREATE\`, \`ALTER\`, \`DROP\`, \`TRUNCATE\`.
- **DML** (Data Manipulation): works with data — \`SELECT\`, \`INSERT\`, \`UPDATE\`, \`DELETE\`.
- **DCL** (Data Control): permissions — \`GRANT\`, \`REVOKE\`.
- **TCL** (Transaction Control): \`COMMIT\`, \`ROLLBACK\`, \`SAVEPOINT\`.

### What is the difference between DELETE, TRUNCATE and DROP?
- **DELETE** removes chosen rows (with \`WHERE\`), can be rolled back and fires triggers.
- **TRUNCATE** removes all rows quickly and keeps the table structure.
- **DROP** removes the whole table, structure included.

### What is the difference between WHERE and HAVING?
\`WHERE\` filters rows before grouping; \`HAVING\` filters groups after \`GROUP BY\` and can use aggregate functions.
\`\`\`
SELECT department, COUNT(*) AS staff
FROM employees
WHERE status = 'active'
GROUP BY department
HAVING COUNT(*) > 10;
\`\`\`

### In what order does SQL logically process a query?
1. FROM and JOIN
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. DISTINCT
7. ORDER BY
8. LIMIT / OFFSET (or TOP / FETCH)

This explains why you can't use a \`SELECT\` alias in \`WHERE\`, but you can in \`ORDER BY\`.

### How does NULL behave in SQL?
NULL means "unknown", so any comparison with it gives unknown, not true. Use \`IS NULL\` / \`IS NOT NULL\`, never \`= NULL\`. Aggregates like \`SUM\` and \`AVG\` ignore NULLs, and \`COUNT(column)\` skips them while \`COUNT(*)\` counts all rows. \`COALESCE(col, 0)\` replaces NULL with a default.

### What is the difference between CHAR and VARCHAR?
\`CHAR(n)\` is fixed length: shorter values are padded with spaces, so it suits codes that are always the same length (country codes, PIN codes). \`VARCHAR(n)\` is variable length and stores only the characters used, so it suits names, emails and addresses.

### What is the difference between UNION and UNION ALL?
Both combine the results of two queries with the same columns. \`UNION\` removes duplicate rows (which costs extra work); \`UNION ALL\` keeps every row and is faster. Use \`UNION ALL\` unless you need duplicates removed.

## Joins and subqueries

### Explain the different types of joins.
- **INNER JOIN:** only rows that match in both tables.
- **LEFT JOIN:** all rows from the left table, plus matches from the right (NULL where none).
- **RIGHT JOIN:** all rows from the right table, plus matches from the left.
- **FULL OUTER JOIN:** all rows from both, matched where possible.
- **CROSS JOIN:** every combination of rows from both tables.
- **SELF JOIN:** a table joined to itself, for example employees and their managers.

### How do you find records in one table that have no match in another?
Use a LEFT JOIN and keep the rows where the right side is NULL, or use \`NOT EXISTS\`:
\`\`\`
SELECT c.id, c.name
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL;
\`\`\`

### How do you find the second-highest salary?
\`\`\`
SELECT MAX(salary)
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);
\`\`\`
For the Nth highest, use a window function: \`DENSE_RANK() OVER (ORDER BY salary DESC)\` and pick rank N.

### What is the difference between a subquery and a correlated subquery?
A normal subquery runs once and its result is used by the outer query. A correlated subquery refers to columns of the outer query, so it runs once per outer row:
\`\`\`
SELECT name, salary, department_id
FROM employees e
WHERE salary > (SELECT AVG(salary) FROM employees
                WHERE department_id = e.department_id);
\`\`\`
Correlated subqueries can be slow on big tables; a join or window function is often faster.

### What is a CTE?
A Common Table Expression (\`WITH ... AS\`) is a named temporary result you can use in the main query. It makes complex queries easier to read and allows recursive queries, such as walking an organisation chart.
\`\`\`
WITH dept_avg AS (
  SELECT department_id, AVG(salary) AS avg_sal
  FROM employees GROUP BY department_id
)
SELECT e.name, e.salary, d.avg_sal
FROM employees e JOIN dept_avg d ON d.department_id = e.department_id;
\`\`\`

### How do you find duplicate rows?
\`\`\`
SELECT email, COUNT(*) AS times
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
\`\`\`
To delete the extras, keep one row per email (for example the lowest id) using \`ROW_NUMBER()\` and delete rows numbered above 1.

## Aggregation and window functions

### What are aggregate functions?
Functions that return one value for a group of rows: \`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, \`MAX\`. Used with \`GROUP BY\`, they give one result per group; without it, one result for the whole table.

### What are window functions?
Window functions calculate across a set of related rows without collapsing them into one row the way \`GROUP BY\` does. Each row keeps its detail and gets the calculated value too.
\`\`\`
SELECT name, department_id, salary,
       AVG(salary) OVER (PARTITION BY department_id) AS dept_avg
FROM employees;
\`\`\`

### What is the difference between ROW_NUMBER, RANK and DENSE_RANK?
For salaries 100, 90, 90, 80:
| Function | Result |
| ROW_NUMBER | 1, 2, 3, 4 |
| RANK | 1, 2, 2, 4 |
| DENSE_RANK | 1, 2, 2, 3 |

ROW_NUMBER never ties, RANK leaves gaps after ties, DENSE_RANK doesn't.

### How do you calculate a running total?
\`\`\`
SELECT order_date, amount,
       SUM(amount) OVER (ORDER BY order_date) AS running_total
FROM orders;
\`\`\`
Add \`PARTITION BY customer_id\` to restart the total for each customer.

## Keys, design and normalisation

### What are primary, foreign, unique and composite keys?
- **Primary key:** uniquely identifies each row; can't be NULL.
- **Foreign key:** points to a primary key in another table and enforces the relationship.
- **Unique key:** values must be unique, but a NULL is usually allowed.
- **Composite key:** a key made of two or more columns together, such as (order_id, product_id).

### What is normalisation? Explain 1NF, 2NF and 3NF.
Normalisation organises tables to reduce duplicate data and update errors.
- **1NF:** each column holds single values; no repeating groups.
- **2NF:** 1NF, and every non-key column depends on the whole primary key (matters for composite keys).
- **3NF:** 2NF, and non-key columns don't depend on other non-key columns.

### What is denormalisation and when is it used?
Denormalisation deliberately adds some duplicate data to reduce joins and speed up reads. It's common in reporting, data warehouses and read-heavy systems. The trade-off is more storage and the work of keeping copies in sync.

### What are constraints in SQL?
Rules the database enforces on data: \`PRIMARY KEY\`, \`FOREIGN KEY\`, \`UNIQUE\`, \`NOT NULL\`, \`CHECK\` (for example \`salary > 0\`) and \`DEFAULT\`. They keep bad data out at the database level, whatever the application does.

### What is the difference between OLTP and OLAP?
- **OLTP** (online transaction processing): day-to-day operations — many small, fast reads and writes such as placing orders or bank transfers. Normalised tables.
- **OLAP** (online analytical processing): reporting and analysis over large historical data — fewer but heavy queries with aggregations. Often a data warehouse with a star schema.

### What is the difference between a view and a table?
A table stores data. A view is a saved query that looks like a table when you select from it; it usually stores no data. Views simplify complex queries and can limit which columns users see. A materialised view stores the query result and must be refreshed.

## Indexes, transactions and performance

### What is an index, and what is the difference between clustered and non-clustered?
An index is a structure (usually a B-tree) that helps the database find rows quickly without scanning the whole table.
- **Clustered:** decides the physical order of rows; a table has only one (often the primary key).
- **Non-clustered:** a separate structure pointing to the rows; a table can have many.

Indexes speed up reads but slow down inserts and updates and use storage.

### When might the database not use an index?
- A function or calculation is applied to the column: \`WHERE YEAR(created_at) = 2026\`.
- A leading wildcard: \`LIKE '%kochi'\`.
- The query returns a large share of the table, so a full scan is cheaper.
- A composite index is used without its first column.
- Data types don't match, causing an implicit conversion.

### What are the ACID properties?
- **Atomicity:** a transaction happens completely or not at all.
- **Consistency:** data moves from one valid state to another.
- **Isolation:** concurrent transactions don't interfere with each other.
- **Durability:** once committed, data survives crashes.

### What are transaction isolation levels?
They control what one transaction can see of another's changes:
- **Read uncommitted:** can see uncommitted data (dirty reads).
- **Read committed:** sees only committed data; the default in many databases.
- **Repeatable read:** rows you've read won't change during the transaction.
- **Serializable:** the strictest — transactions behave as if run one after another.

Stricter levels are safer but allow less concurrency.

### What is a deadlock?
Two transactions each hold a lock the other needs, so both wait forever. The database detects this and cancels one of them. Reduce deadlocks by keeping transactions short and always accessing tables in the same order.

### What are stored procedures and triggers?
- A **stored procedure** is saved SQL code you call by name, with parameters. It can hold complex logic close to the data.
- A **trigger** runs automatically when an event happens on a table, such as an INSERT or UPDATE — for example writing to an audit table.

Use triggers sparingly; hidden logic is hard to debug.

### How do you optimise a slow query?
1. Read the execution plan (\`EXPLAIN\` / \`EXPLAIN ANALYZE\`) to see scans and costly steps.
2. Add or adjust indexes on columns used in WHERE, JOIN and ORDER BY.
3. Select only the columns you need instead of \`SELECT *\`.
4. Rewrite heavy subqueries as joins or CTEs, and avoid functions on indexed columns.
5. Paginate large results and keep statistics up to date.
`;

export const practice = [
  ["Joins", "List customers with their total order value, including customers with no orders"],
  ["Aggregation", "Find departments with an average salary above 50,000"],
  ["Ranking", "Get the top 3 earners in each department"],
  ["Duplicates", "Find and delete duplicate emails, keeping one row"],
  ["Dates", "Count orders per month for the last 12 months"],
  ["Window", "Calculate a running total and month-over-month change"],
  ["Design", "Design tables for a library: books, members and loans"],
  ["Performance", "Read an EXPLAIN plan and suggest an index"]
];
