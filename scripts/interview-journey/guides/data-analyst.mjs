/* Data Analyst — 30 Important Interview Questions & Answers. Original InfoparkDaily content. Format: see guides/index.mjs. */
export const meta = {
  slug: "data-analyst",
  field: "it",
  name: "Data analyst",
  count: 30,
  topics: "the analysis process, Excel, SQL for analysis, statistics, Power BI and Tableau, Python (pandas) and business case questions",
  level: "Fresher to experienced"
};

export const text = `
## Role and process

### What does a data analyst do?
A data analyst collects, cleans and analyses data to answer business questions, then presents the findings in reports and dashboards so managers can make decisions. Typical questions: why did sales drop last month, which customers are likely to leave, which product sells best in which region.

### What are the main steps in a data analysis project?
1. Understand the business question and how success will be measured.
2. Collect the data from databases, files or APIs.
3. Clean and prepare it.
4. Explore and analyse it.
5. Visualise the results.
6. Present the insights with clear recommendations.

### What is data cleaning, and why does it take so much time?
Data cleaning fixes problems that would make the analysis wrong: duplicates, missing values, wrong formats (dates stored as text), inconsistent labels ("Kochi", "kochi", "Cochin"), typos and outliers. Real-world data is rarely clean, and bad data leads to bad decisions, so cleaning is often the largest part of the work.

### How do you handle missing data?
First find out why it's missing. Then choose based on how much is missing and how important the column is:
- Remove the rows, if only a few are affected.
- Fill with the mean, median or mode, or a value from related data.
- Fill forward or backward for time series.
- Flag it as "Unknown" for categories.

Always note what you did, because it affects the results.

### What is the difference between data analysis and data analytics?
Data analysis usually means examining a specific dataset to answer a question. Data analytics is the broader field — the tools, processes and methods (including analysis) used to turn data into decisions. In job titles the two are often used interchangeably.

### What is the difference between structured and unstructured data?
Structured data fits neatly into rows and columns with a fixed format — sales tables, customer records — and is easy to query with SQL. Unstructured data has no fixed format — emails, reviews, images, call recordings — and needs extra processing (text analysis, tagging) before it can be analysed. Semi-structured data such as JSON sits in between.

### What are KPIs, and how do you choose them?
Key Performance Indicators are the few numbers that show whether a business goal is being met — monthly revenue, conversion rate, customer churn, average delivery time. A good KPI is tied to a goal, measurable, clearly defined and something the team can act on.

## Excel

### What is the difference between VLOOKUP and XLOOKUP?
- **VLOOKUP** searches the first column of a range and returns a value from a column to its right. It breaks if columns are inserted and can't look left.
- **XLOOKUP** searches any column and returns from any column, left or right, defaults to exact match and has a built-in "if not found" value.
\`\`\`
=XLOOKUP(A2, Products[ID], Products[Price], "Not found")
\`\`\`
INDEX with MATCH is the classic alternative in older Excel versions.

### What is a pivot table?
A pivot table summarises large data quickly — totals, counts and averages grouped by category — by dragging fields into rows, columns, values and filters. For example: total sales by region and month, built in seconds without formulas.

### What are some Excel functions every analyst should know?
- **Lookup:** XLOOKUP, VLOOKUP, INDEX/MATCH
- **Conditional maths:** SUMIFS, COUNTIFS, AVERAGEIFS
- **Logic:** IF, IFS, IFERROR, AND, OR
- **Text:** TRIM, LEFT, RIGHT, MID, TEXTJOIN, PROPER
- **Dates:** TODAY, EOMONTH, DATEDIF, NETWORKDAYS
- **Dynamic arrays:** UNIQUE, FILTER, SORT

### What is Power Query?
Power Query is the data-preparation tool built into Excel and Power BI. It connects to sources, then cleans and reshapes data — removing duplicates, splitting columns, merging tables, unpivoting — and records every step, so the same cleaning can be repeated with one click when new data arrives.

## SQL for analysis

### Which SQL skills does a data analyst need?
Filtering (\`WHERE\`), sorting, aggregation (\`GROUP BY\`, \`HAVING\`), joins, \`CASE WHEN\` for categories, date functions, subqueries and CTEs, and window functions for rankings, running totals and period-over-period changes.

### How do you calculate month-over-month growth in SQL?
\`\`\`
WITH monthly AS (
  SELECT DATE_TRUNC('month', order_date) AS month, SUM(amount) AS revenue
  FROM orders
  GROUP BY 1
)
SELECT month, revenue,
       LAG(revenue) OVER (ORDER BY month) AS prev_revenue,
       ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))
             / LAG(revenue) OVER (ORDER BY month), 1) AS growth_pct
FROM monthly;
\`\`\`
\`LAG\` reads the previous row's value. Date function names vary slightly between databases.

### How do you group values into categories in SQL?
Use \`CASE WHEN\`:
\`\`\`
SELECT customer_id,
       CASE WHEN total_spend >= 50000 THEN 'High'
            WHEN total_spend >= 10000 THEN 'Medium'
            ELSE 'Low' END AS segment
FROM customer_totals;
\`\`\`

### How do you check data quality with SQL?
Count rows and compare with the source, look for NULLs in key columns, find duplicates with \`GROUP BY ... HAVING COUNT(*) > 1\`, check values fall in a valid range (no negative quantities, no future dates), and confirm joins don't multiply rows unexpectedly.

## Statistics

### What is the difference between mean, median and mode?
- **Mean:** the average.
- **Median:** the middle value when sorted.
- **Mode:** the most frequent value.

When data is skewed — salaries or house prices, where a few very large values pull the average up — the median represents the "typical" value better than the mean.

### What is standard deviation?
It measures how spread out values are around the mean. A low standard deviation means values are close to the average; a high one means they vary widely. Two branches can have the same average sales, but the one with a higher standard deviation is less predictable.

### What is the difference between correlation and causation?
Correlation means two things move together; causation means one causes the other. Ice-cream sales and drowning cases both rise in summer — they're correlated because of hot weather, but one doesn't cause the other. To show causation you need controlled experiments, such as A/B tests.

### What is an outlier, and how do you handle it?
An outlier is a value far from the rest. Find outliers with box plots, or the IQR rule (below Q1 − 1.5×IQR or above Q3 + 1.5×IQR). Then investigate: if it's a data error, fix or remove it; if it's real (a genuinely huge order), keep it but consider using the median or analysing it separately.

### What is A/B testing?
Users are split randomly into two groups: A sees the current version and B a changed version (for example a new checkout button). You compare a metric such as conversion rate and use a statistical test to check the difference is significant rather than chance. Decide the sample size and run time before starting.

### What is a p-value?
Assuming there is really no difference (the null hypothesis), the p-value is the probability of seeing a result at least as extreme as yours. A small p-value (commonly below 0.05) suggests the result is unlikely to be chance alone. It does not tell you how big or important the effect is.

## Visualisation and BI tools

### How do you choose the right chart?
- **Comparison between categories:** bar chart.
- **Trend over time:** line chart.
- **Part of a whole:** stacked bar, or a pie with very few slices.
- **Relationship between two numbers:** scatter plot.
- **Distribution:** histogram or box plot.
- **One key number:** a KPI card.

Keep charts simple, label axes and highlight what matters.

### What is the difference between Power BI and Tableau?
Both build interactive dashboards. Power BI is strongly integrated with Excel and Microsoft 365, uses DAX for calculations and is cheaper for many organisations. Tableau is known for flexible, polished visual exploration. The concepts — data models, measures, filters, dashboards — transfer between them.

### What is DAX? Explain a measure versus a calculated column.
DAX (Data Analysis Expressions) is Power BI's formula language.
- A **calculated column** is computed row by row and stored in the table.
- A **measure** is calculated on the fly for the current filter context — the slicers and visuals in use.
\`\`\`
Total Sales = SUM(Sales[Amount])
Sales LY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR('Date'[Date]))
\`\`\`
Use measures for totals and ratios; they're more efficient and react to filters.

### What is a star schema?
A data model with one central fact table (transactions: sales, orders, with numbers to add up) linked to dimension tables (describing the facts: date, product, customer, region). It's simple to understand and fast for BI tools to filter and aggregate.

### What makes a good dashboard?
It answers the audience's key questions in seconds. Put the most important KPIs at the top, keep a few clear visuals, use consistent colours and labels, provide filters people actually need, show comparisons (target, last year) and make sure the numbers can be trusted.

## Python and business cases

### How is pandas used in data analysis?
pandas loads data (CSV, Excel, SQL) into DataFrames and makes cleaning and analysis fast:
\`\`\`
import pandas as pd

df = pd.read_csv("sales.csv", parse_dates=["order_date"])
df = df.drop_duplicates().dropna(subset=["amount"])
summary = df.groupby("region")["amount"].agg(["sum", "mean", "count"])
\`\`\`
Other common methods: \`merge\` (joins), \`pivot_table\`, \`fillna\`, \`value_counts\` and \`apply\`.

### Sales dropped 20% last month. How would you investigate?
1. Confirm the data is right — no missing loads or tracking problems.
2. Compare with the same month last year to check for seasonality.
3. Break the drop down by region, product, channel and customer type to find where it happened.
4. Check external events: price changes, stock-outs, competitor offers, holidays.
5. Split revenue into number of orders × average order value to see which fell.
6. Present the main causes and suggest actions.

### How do you explain technical findings to non-technical stakeholders?
Start with the answer and its business impact, not the method. Use one or two simple charts, plain language and concrete numbers ("repeat customers fell by 1,200 this quarter"), and end with clear recommendations. Keep technical details in an appendix for anyone who asks.

### Tell me about a project you're proud of. How should you structure the answer?
Use a short story: the business problem, the data you used, what you did (cleaning, analysis, tools), the key insight, and the result — ideally a number, such as "reduced report preparation from two days to two hours". Be honest about your exact role in team projects.
`;

export const practice = [
  ["Excel", "Build a pivot table of sales by region and month"],
  ["Excel", "Use XLOOKUP and SUMIFS to build a summary sheet"],
  ["SQL", "Find the top 5 products by revenue in each category"],
  ["SQL", "Calculate monthly active customers and month-over-month growth"],
  ["Statistics", "Compare mean and median salary for a skewed dataset"],
  ["Power BI", "Build a sales dashboard with KPI cards and a date slicer"],
  ["Python", "Clean a messy CSV with pandas and export a summary"],
  ["Case", "Investigate a drop in website conversions"],
  ["Portfolio", "Publish 2–3 end-to-end projects with clear write-ups"]
];
