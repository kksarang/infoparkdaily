/* Power BI tutorial — original InfoparkDaily lessons. Examples show sample data, the steps or DAX you write, and the result. */

const MS = "https://learn.microsoft.com/en-us/power-bi/";
const DAX = "https://learn.microsoft.com/en-us/dax/";

export const POWERBI_TRACK = {
  key: "power-bi",
  name: "Power BI",
  long: "Power BI — dashboards and reports for analyst roles",
  color: "#c79a00",
  tagline: "Dashboards, DAX and data models.",
  level: "Beginner → Intermediate",
  lang: "static",
  feature: "Sample data + DAX + results",
  heroLine: "Every lesson has sample data with the steps or DAX formulas and the result you should see",
  exampleTitle: "Sample data & steps",
  exampleBadge: "Power BI Desktop (free, Windows)",
  outputTitle: "Result",
  exampleNote: "Download Power BI Desktop free from Microsoft (Windows). Re-create the small sample tables in Excel, load them, and follow the steps. Data is fictional.",
  lessons: [
    {
      slug: "introduction",
      title: "Power BI introduction",
      summary: "What Power BI is, Desktop vs Service, and the get data → model → visualise → share workflow.",
      body: `<p><strong>Power BI</strong> is Microsoft's business intelligence tool for turning data into interactive reports and dashboards. It's one of the most requested skills for data analyst, MIS and business analyst jobs.</p>
<ul>
<li><strong>Power BI Desktop</strong> (free, Windows) — where you build reports.</li>
<li><strong>Power BI Service</strong> (online) — where reports are published, shared and refreshed on a schedule.</li>
<li><strong>Power BI Mobile</strong> — viewing reports on phones.</li>
</ul>
<h3>The workflow</h3>
<ol>
<li><strong>Get data</strong> — Excel, CSV, SQL databases, SharePoint, web APIs.</li>
<li><strong>Transform</strong> — clean it in Power Query.</li>
<li><strong>Model</strong> — relate tables and write DAX measures.</li>
<li><strong>Visualise</strong> — build report pages with charts, cards and slicers.</li>
<li><strong>Share</strong> — publish to the Service and set up refresh.</li>
</ol>`,
      example: `Sample file: sales.xlsx  (sheet "Sales")

OrderID | Date       | Region | Product   | Qty | Amount
1001    | 2026-10-02 | Kochi  | Laptop    | 2   | 96000
1002    | 2026-10-03 | Kozhikode | Mouse  | 10  | 6000
1003    | 2026-10-05 | Kochi  | Monitor   | 3   | 33000
1004    | 2026-11-01 | Trivandrum | Laptop | 1   | 48000

Steps:
1. Home → Get data → Excel workbook → choose sales.xlsx → tick "Sales" → Load
2. In the Report view, add a Card visual and drag Amount into it
3. Add a Clustered bar chart: Region on the Y-axis, Amount as the value`,
      output: `Card:  Sum of Amount = 183K

Bar chart (Amount by Region):
Kochi       ████████████████  129,000
Trivandrum  ██████             48,000
Kozhikode   █                   6,000`,
      points: ["Power BI turns data into interactive reports.", "Build in Desktop; share through the Service.", "Workflow: get data → transform → model → visualise → share.", "Analyst and MIS job posts often ask for it."],
      practice: "Install Power BI Desktop, recreate the sample table in Excel, load it and build a card for total Amount and a bar chart of Amount by Product.",
      quiz: { q: "Where do you usually build a Power BI report?", options: ["Power BI Service in the browser", "Power BI Desktop", "Microsoft Word", "SQL Server"], answer: 1, why: "Reports are designed in Power BI Desktop and then published to the Power BI Service for sharing." },
      interview: [
        ["What is Power BI and what are its main components?", "A Microsoft BI tool for connecting to data, modelling it and building interactive reports. Main parts: Power BI Desktop (build), Power Query (transform), the data model with DAX (calculations), Power BI Service (publish, share, refresh) and mobile apps."],
        ["What is the difference between a report and a dashboard in Power BI?", "A report has one or more interactive pages built from a single dataset. A dashboard is a single page in the Service made of tiles pinned from one or more reports, used for a high-level overview."]
      ],
      further: [["Power BI Desktop overview", MS + "fundamentals/desktop-what-is-desktop"]]
    },
    {
      slug: "power-query",
      title: "Cleaning data with Power Query",
      summary: "Removing duplicates, fixing types, splitting columns, merging and appending queries.",
      body: `<p><strong>Power Query</strong> (Transform data) cleans data before it reaches your report. Every step is recorded under <em>Applied Steps</em>, so when new data arrives you just press Refresh and the same cleaning happens again.</p>
<p>Common steps:</p>
<ul>
<li>Set correct <strong>data types</strong> (dates as Date, amounts as Decimal) — the most important step.</li>
<li><strong>Remove duplicates</strong>, blank rows and unwanted columns.</li>
<li><strong>Trim</strong> and <strong>Clean</strong> text; <strong>Replace values</strong> (“Cochin” → “Kochi”).</li>
<li><strong>Split column</strong> by a delimiter; <strong>Unpivot</strong> months spread across columns into rows.</li>
<li><strong>Merge queries</strong> (like a SQL join) and <strong>Append queries</strong> (stack tables, such as monthly files).</li>
</ul>`,
      example: `Raw data (Customers.csv):

CustomerID | Name           | City     | Joined
C01        |  anu kumar     | Cochin   | 02-10-2026
C02        | Ravi Menon     | kochi    | 05-10-2026
C02        | Ravi Menon     | kochi    | 05-10-2026
C03        | Meera S        | Trivandrum | 11-10-2026

Power Query steps (Applied Steps):
1. Changed Type          Joined → Date (locale: English (India))
2. Removed Duplicates    on CustomerID
3. Trimmed Text          Name
4. Capitalized Each Word Name
5. Replaced Value        City: "Cochin" → "Kochi"
6. Capitalized Each Word City`,
      output: `CustomerID | Name       | City       | Joined
C01        | Anu Kumar  | Kochi      | 02 Oct 2026
C02        | Ravi Menon | Kochi      | 05 Oct 2026
C03        | Meera S    | Trivandrum | 11 Oct 2026`,
      points: ["Clean data in Power Query before modelling.", "Set data types first — dates and numbers especially.", "Every step is recorded and re-runs on refresh.", "Merge = join tables; Append = stack tables."],
      practice: "Create three small monthly sales CSV files with the same columns, put them in one folder and use Get data → Folder to append them into one table.",
      quiz: { q: "You have Jan, Feb and Mar sales files with the same columns. Which operation combines them into one table?", options: ["Merge queries", "Append queries", "Unpivot", "Split column"], answer: 1, why: "Append stacks tables with the same structure on top of each other. Merge joins tables side by side on a key." },
      interview: [
        ["What is Power Query used for?", "Extracting and transforming data before loading it into the model — cleaning, changing types, removing duplicates, merging and appending tables, unpivoting. Steps are recorded in the M language and repeat on every refresh."],
        ["What is the difference between Merge and Append?", "Merge combines two tables side by side using a matching key column, like a SQL join. Append stacks rows from tables with the same columns, like SQL UNION ALL."]
      ],
      further: [["Power Query overview", "https://learn.microsoft.com/en-us/power-query/power-query-what-is-power-query"]]
    },
    {
      slug: "data-modeling",
      title: "Data modelling & relationships",
      summary: "Fact and dimension tables, the star schema, relationships, cardinality and a date table.",
      body: `<p>A good <strong>data model</strong> makes reports fast and numbers correct. The standard design is the <strong>star schema</strong>:</p>
<ul>
<li>A <strong>fact table</strong> in the middle with events and numbers: Sales (OrderID, Date, ProductID, CustomerID, Qty, Amount).</li>
<li><strong>Dimension tables</strong> around it that describe the facts: Products, Customers, Date, Region.</li>
</ul>
<p>Relationships connect a dimension's unique key to the fact table — usually <strong>one-to-many</strong> (one product, many sales), with filters flowing from the dimension to the fact.</p>
<p>Always add a dedicated <strong>Date table</strong> and mark it as a date table. Time-intelligence functions (year-to-date, last year) depend on it.</p>`,
      example: `Model view:

  Products (1) ─────┐
  ProductID, Name, Category
                    │ *
  Date (1) ──────── Sales (fact) ──────── Customers (1)
  Date, Month, Year  * Date, ProductID,  *  CustomerID, Name, City
                       CustomerID, Qty, Amount

Create the date table (Modeling → New table):
Date =
ADDCOLUMNS (
    CALENDAR ( DATE ( 2026, 1, 1 ), DATE ( 2026, 12, 31 ) ),
    "Year", YEAR ( [Date] ),
    "Month", FORMAT ( [Date], "MMM" ),
    "MonthNo", MONTH ( [Date] )
)
Then: Table tools → Mark as date table → Date column`,
      output: `Relationships created:
Products[ProductID]   1 → *  Sales[ProductID]
Customers[CustomerID] 1 → *  Sales[CustomerID]
Date[Date]            1 → *  Sales[Date]

A slicer on Products[Category] = "Laptops" now filters every Sales visual.`,
      points: ["Use a star schema: one fact table, several dimension tables.", "Relationships are usually one-to-many from dimension to fact.", "Filters flow from dimensions to facts.", "Add and mark a proper Date table."],
      practice: "Split a single flat sales sheet into Sales, Products and Customers tables, load them, create the relationships and confirm a Category slicer filters the sales total.",
      quiz: { q: "In a star schema, which table holds the numbers you add up, like Amount and Qty?", options: ["Dimension table", "Fact table", "Date table", "Lookup table"], answer: 1, why: "The fact table records events with measurable values; dimension tables describe them." },
      interview: [
        ["What is a star schema and why use it?", "A model with one central fact table linked to dimension tables. It's simple to understand, keeps the model small and lets Power BI filter and aggregate quickly, and DAX behaves predictably on it."],
        ["Why do you need a date table?", "Time-intelligence functions such as TOTALYTD and SAMEPERIODLASTYEAR need a continuous date table marked as a date table. It also gives consistent Year, Quarter and Month columns for all visuals."]
      ],
      further: [["Star schema guidance", MS + "guidance/star-schema"]]
    },
    {
      slug: "dax-basics",
      title: "DAX basics: measures & columns",
      summary: "Measures vs calculated columns, SUM, COUNTROWS, DIVIDE and simple ratios.",
      body: `<p><strong>DAX</strong> (Data Analysis Expressions) is Power BI's formula language.</p>
<ul>
<li>A <strong>measure</strong> is calculated when a visual needs it, for the current filters (slicers, rows of a table). Use measures for totals, averages and ratios — almost everything.</li>
<li>A <strong>calculated column</strong> is computed row by row when data loads and stored in the table. Use it only when you need a value per row to filter or group by, such as a price band.</li>
</ul>
<p>Use <code>DIVIDE(a, b)</code> instead of <code>a / b</code> — it returns blank instead of an error when b is zero. Build small measures and reuse them in bigger ones.</p>`,
      example: `Measures (Home → New measure):

Total Sales   = SUM ( Sales[Amount] )
Orders        = COUNTROWS ( Sales )
Avg Order     = DIVIDE ( [Total Sales], [Orders] )
Total Qty     = SUM ( Sales[Qty] )

Calculated column (in the Products table):
Price Band =
IF ( Products[UnitPrice] >= 40000, "Premium",
     IF ( Products[UnitPrice] >= 10000, "Mid", "Budget" ) )

Table visual: Region | Total Sales | Orders | Avg Order`,
      output: `Region      | Total Sales | Orders | Avg Order
Kochi       | 129,000     | 2      | 64,500
Kozhikode   |   6,000     | 1      |  6,000
Trivandrum  |  48,000     | 1      | 48,000
Total       | 183,000     | 4      | 45,750`,
      points: ["Measures calculate on the fly for the current filters.", "Calculated columns are stored per row — use them sparingly.", "Use DIVIDE to avoid divide-by-zero errors.", "Build small measures and reuse them."],
      practice: "Create measures for Total Qty, Average Price per Unit (DIVIDE of sales by qty) and Number of Customers (DISTINCTCOUNT), and show them by Region.",
      quiz: { q: "Which should you use for 'Total Sales' shown in many visuals?", options: ["A calculated column", "A measure", "A new table", "A Power Query step"], answer: 1, why: "A measure recalculates for each visual's filters, so the same formula shows the right total per region, month or product." },
      interview: [
        ["What is the difference between a measure and a calculated column?", "A calculated column is evaluated row by row at refresh and stored, using memory. A measure is evaluated at query time in the current filter context and isn't stored. Use measures for aggregations; columns only when you need a row-level value for slicing or relationships."],
        ["Why use DIVIDE instead of the / operator?", "DIVIDE handles division by zero safely, returning blank (or an alternate value you choose) instead of an error, which keeps visuals clean."]
      ],
      further: [["DAX basics in Power BI Desktop", MS + "transform-model/desktop-quickstart-learn-dax-basics"]]
    },
    {
      slug: "calculate-time-intelligence",
      title: "CALCULATE & time intelligence",
      summary: "Changing filter context with CALCULATE, year-to-date, last year and growth percentage.",
      body: `<p><code>CALCULATE</code> is the most important DAX function. It evaluates an expression with <strong>changed filters</strong> — add a filter, replace one or remove one.</p>
<ul>
<li><code>CALCULATE([Total Sales], Products[Category] = "Laptops")</code> — sales for laptops only, whatever the slicer says about other columns.</li>
<li><code>ALL(table)</code> removes filters — used for “percentage of total”.</li>
</ul>
<h3>Time intelligence</h3>
<p>With a marked Date table you can compare periods easily: <code>TOTALYTD</code> (year to date), <code>SAMEPERIODLASTYEAR</code>, <code>DATEADD</code> (shift by months or days). Growth % = (this period − last period) ÷ last period.</p>`,
      example: `Laptop Sales  = CALCULATE ( [Total Sales], Products[Category] = "Laptops" )

% of Total    = DIVIDE ( [Total Sales],
                         CALCULATE ( [Total Sales], ALL ( Sales[Region] ) ) )

Sales YTD     = TOTALYTD ( [Total Sales], 'Date'[Date] )

Sales LY      = CALCULATE ( [Total Sales], SAMEPERIODLASTYEAR ( 'Date'[Date] ) )

YoY Growth %  = DIVIDE ( [Total Sales] - [Sales LY], [Sales LY] )

Matrix visual: Month | Total Sales | Sales LY | YoY Growth %`,
      output: `Month | Total Sales | Sales LY | YoY Growth %
Sep   | 410,000     | 365,000  | 12.3%
Oct   | 452,000     | 401,000  | 12.7%
Nov   | 183,000     | 210,000  | -12.9%

Region     | Total Sales | % of Total
Kochi      | 129,000     | 70.5%
Trivandrum |  48,000     | 26.2%
Kozhikode  |   6,000     |  3.3%`,
      points: ["CALCULATE evaluates a measure with modified filters.", "ALL removes filters — useful for % of total.", "TOTALYTD and SAMEPERIODLASTYEAR need a marked Date table.", "Growth % = DIVIDE(this − last, last)."],
      practice: "Create Sales MTD, Sales Previous Month (using DATEADD by -1 month) and Month-over-Month Growth %, and show them in a line and column chart.",
      quiz: { q: "Which function changes the filter context of a calculation?", options: ["SUM", "CALCULATE", "RELATED", "FORMAT"], answer: 1, why: "CALCULATE is the function that adds, replaces or removes filters before evaluating an expression." },
      interview: [
        ["What does CALCULATE do?", "It evaluates an expression in a modified filter context. Its filter arguments can add conditions, override existing filters on the same columns, or remove filters with ALL/REMOVEFILTERS. Most advanced DAX is built on it."],
        ["What is filter context versus row context?", "Filter context is the set of filters applied to a calculation by slicers, visuals and CALCULATE. Row context is the current row when DAX iterates a table, as in calculated columns or iterator functions like SUMX."]
      ],
      further: [["CALCULATE function", DAX + "calculate-function-dax"], ["Time intelligence functions", DAX + "time-intelligence-functions-dax"]]
    },
    {
      slug: "reports-dashboards",
      title: "Building reports & dashboards",
      summary: "Choosing visuals, KPI cards, slicers, drill-down, tooltips and good report design.",
      body: `<p>A report should answer its audience's questions in seconds. A layout that works for most business reports:</p>
<ol>
<li><strong>Top row</strong> — KPI cards: Total Sales, Orders, Avg Order, YoY Growth %.</li>
<li><strong>Middle</strong> — trend over time (line chart) and breakdown by category or region (bar chart).</li>
<li><strong>Bottom</strong> — a detail table or matrix for people who need the numbers.</li>
<li><strong>Slicers</strong> — Date range, Region, Category, placed consistently.</li>
</ol>
<h3>Choosing visuals</h3>
<ul>
<li>Comparison → bar or column · Trend → line · Part of a whole → stacked bar (pie only with 2–4 slices) · Relationship → scatter · Single number → card.</li>
<li>Add <strong>drill-down</strong> (Year → Month → Day) and <strong>tooltips</strong> for detail without clutter.</li>
<li>Use few colours, highlight what matters, and label everything clearly.</li>
</ul>`,
      example: `Report page: "Sales overview — FY 2026-27"

┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Total Sales  │ Orders       │ Avg Order    │ YoY Growth % │   ← Card visuals
│ ₹ 18.3 L     │ 412          │ ₹ 4,442      │ ▲ 12.3%      │
└──────────────┴──────────────┴──────────────┴──────────────┘
┌──────────────────────────────┬─────────────────────────────┐
│ Line: Total Sales by Month   │ Bar: Total Sales by Region  │
│ (Sales LY as second line)    │ (sorted high → low)         │
└──────────────────────────────┴─────────────────────────────┘
┌────────────────────────────────────────────────────────────┐
│ Matrix: Category → Product | Qty | Total Sales | % of Total│
└────────────────────────────────────────────────────────────┘
Slicers (left panel): Date range · Region · Category`,
      output: `Clicking "Kochi" in the region bar chart cross-filters the
cards, the line chart and the matrix to Kochi only.

Drilling down on the line chart: 2026 → Oct → daily sales for October.`,
      points: ["Lead with KPI cards, then trends, then detail.", "Match the visual to the question: bar, line, card, matrix.", "Slicers and cross-filtering make reports interactive.", "Keep colours few and labels clear."],
      practice: "Build a one-page sales report with four KPI cards, a monthly trend line with last year's line, a sorted bar chart by region and a Date slicer, then ask a friend what they learn from it in 10 seconds.",
      quiz: { q: "Which visual is best for showing sales trend across 12 months?", options: ["Pie chart", "Line chart", "Card", "Gauge"], answer: 1, why: "Line charts show change over time most clearly; pies suit a few parts of a whole." },
      interview: [
        ["How do you design an effective dashboard?", "Start from the audience's key questions, put the main KPIs at the top, show trends and breakdowns next, keep detail tables at the bottom, use consistent slicers and colours, avoid clutter and make sure the numbers reconcile with the source."],
        ["What is drill-down versus drill-through?", "Drill-down moves down a hierarchy inside the same visual (Year → Month → Day). Drill-through jumps to a separate detail page filtered to the item you right-clicked, such as one customer's full history."]
      ],
      further: [["Visualisation types", MS + "visuals/power-bi-visualization-types-for-reports-and-q-and-a"]]
    },
    {
      slug: "publish-share",
      title: "Publishing, refresh & security",
      summary: "Publishing to the Power BI Service, workspaces, scheduled refresh, gateways and row-level security.",
      body: `<p>Once the report is ready, you <strong>publish</strong> it from Desktop to a <strong>workspace</strong> in the Power BI Service. From there:</p>
<ul>
<li><strong>Share</strong> it or bundle reports into an <strong>App</strong> for a department.</li>
<li>Set a <strong>scheduled refresh</strong> so data stays current. On-premises sources (a local SQL Server or files on a company network) need an <strong>on-premises data gateway</strong>.</li>
<li>Pin visuals to a <strong>dashboard</strong> for a one-screen summary.</li>
<li>Apply <strong>row-level security (RLS)</strong> so each user sees only their data — for example each regional manager sees only their region.</li>
</ul>
<p>Sharing in the Service generally requires Power BI Pro or Premium licences.</p>`,
      example: `Row-level security (Modeling → Manage roles → New role "RegionManager"):

Table: Managers
Email                 | Region
anu@company.example   | Kochi
ravi@company.example  | Trivandrum

Rule on the Managers table:
[Email] = USERPRINCIPALNAME ()

(Managers is related to Sales on Region, so the filter flows to Sales.)

Test: Modeling → View as → Role "RegionManager",
      Other user = anu@company.example

Then: Home → Publish → workspace "Sales Reports"
      Service → Semantic model settings → Scheduled refresh: daily 7:00 AM`,
      output: `Viewing as anu@company.example:
Total Sales = 129,000   (Kochi only)
Region bar chart shows one bar: Kochi

Refresh history: Completed · 10 Nov 2026, 07:00 · 42 s`,
      points: ["Publish from Desktop to a workspace in the Service.", "Schedule refresh; on-premises sources need a gateway.", "Row-level security limits which rows each user sees.", "Package reports as an App for wider audiences."],
      practice: "Add a role that limits data to one region, test it with View as, and write down the steps you would follow to publish and schedule a daily refresh.",
      quiz: { q: "Each regional manager should see only their own region's sales in the same report. What do you use?", options: ["Separate reports for each region", "Row-level security", "A slicer", "Bookmarks"], answer: 1, why: "RLS filters data per user at the model level, and users can't remove it the way they can clear a slicer." },
      interview: [
        ["What is row-level security in Power BI?", "A way to restrict which rows each user can see by defining roles with DAX filter rules (often using USERPRINCIPALNAME()) and assigning users to them in the Service. The same report then shows each user only their permitted data."],
        ["What is a data gateway and when is it needed?", "Software installed inside the company network that securely connects the Power BI Service to on-premises data sources, so cloud refreshes can reach local databases and file shares. Cloud sources don't need it."]
      ],
      further: [["Row-level security", MS + "enterprise/service-admin-rls"], ["Data refresh", MS + "connect-data/refresh-data"]]
    }
  ]
};
