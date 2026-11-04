/* MS Excel tutorial — original InfoparkDaily lessons. Examples show a small sample sheet, the formulas typed, and the results. */

const MS = "https://support.microsoft.com/en-us/excel";

export const EXCEL_TRACK = {
  key: "excel",
  name: "Excel",
  long: "MS Excel — formulas, lookups and reports for office jobs",
  color: "#1d6f42",
  tagline: "Formulas, lookups, pivots and reports.",
  level: "Beginner",
  lang: "static",
  feature: "Sample sheets + formulas",
  heroLine: "Every lesson has a sample sheet with the formulas and their results",
  exampleTitle: "Sample sheet & formulas",
  exampleBadge: "Type these in Excel or Google Sheets",
  outputTitle: "Results",
  exampleNote: "Works in Microsoft Excel 365/2021 and, for almost every formula, in Google Sheets. Data is fictional.",
  lessons: [
    {
      slug: "introduction",
      title: "Excel introduction",
      summary: "Workbooks, sheets, cells, ranges and entering your first formula.",
      body: `<p>Excel is used in nearly every office role — accounts, HR, operations, sales, data analysis. Employers ask for it in job posts as “MS Excel”, “advanced Excel” or “MIS reporting”.</p>
<ul>
<li>A <strong>workbook</strong> is the file; it contains <strong>sheets</strong> (tabs).</li>
<li>A <strong>cell</strong> is addressed by column letter + row number: <code>B3</code>.</li>
<li>A <strong>range</strong> is a block of cells: <code>B2:B6</code>.</li>
<li>Every formula starts with <code>=</code>. Operators: <code>+ - * / ^</code> and <code>&amp;</code> to join text.</li>
</ul>
<h3>Time-saving keys</h3>
<p><kbd>Ctrl</kbd>+<kbd>Arrow</kbd> jumps to the edge of data, <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Arrow</kbd> selects it, <kbd>Ctrl</kbd>+<kbd>D</kbd> fills down, <kbd>F2</kbd> edits a cell, <kbd>Ctrl</kbd>+<kbd>T</kbd> makes a table.</p>`,
      example: `     A            B         C
1    Item         Qty       Rate
2    Notebook     10        45
3    Pen          25        12
4    Stapler      2         180

D2:  =B2*C2            (then fill down to D4)
D5:  =D2+D3+D4
A6:  ="Total items: "&(B2+B3+B4)`,
      output: `D2 = 450   D3 = 300   D4 = 360
D5 = 1110
A6 = Total items: 37`,
      points: ["Formulas start with =.", "Cells are column+row (B3); ranges use a colon (B2:B6).", "& joins text."],
      practice: "Make a 5-row shopping list with Qty and Rate, add an Amount column with a formula, and a grand total at the bottom.",
      quiz: { q: "What does every Excel formula begin with?", options: ["+", "=", "#", "@"], answer: 1, why: "Typing = tells Excel the cell contains a formula, not text." },
      interview: [
        ["What's the difference between a formula and a function?", "A formula is anything starting with = (e.g. =B2*C2). A function is a built-in named operation used inside formulas, such as SUM or IF."],
        ["Name three Excel shortcuts you use daily.", "For example Ctrl+Shift+L to toggle filters, Ctrl+T to create a table and Ctrl+Arrow to jump across data."]
      ],
      further: [["Microsoft: Excel help & learning", MS]]
    },
    {
      slug: "basic-functions",
      title: "SUM, AVERAGE, COUNT & ROUND",
      summary: "The everyday functions for totals, averages, counts and rounding.",
      body: `<ul>
<li><code>SUM(range)</code> — total. <kbd>Alt</kbd>+<kbd>=</kbd> inserts AutoSum.</li>
<li><code>AVERAGE(range)</code> — mean of numbers.</li>
<li><code>MIN</code> / <code>MAX</code> — smallest / largest.</li>
<li><code>COUNT</code> — counts numbers; <code>COUNTA</code> — counts non-empty cells; <code>COUNTBLANK</code> — empty cells.</li>
<li><code>ROUND(x, digits)</code> — round properly; <code>ROUNDUP</code> / <code>ROUNDDOWN</code> force a direction.</li>
</ul>
<p>Formatting a cell to show 2 decimals does <em>not</em> change the stored value — <code>ROUND</code> does. This matters when totals must match invoices.</p>`,
      example: `     A          B
1    Employee   Overtime hrs
2    Anu        12.5
3    Rahul      8
4    Fathima    (blank)
5    Joseph     15.25

B7:  =SUM(B2:B5)
B8:  =AVERAGE(B2:B5)
B9:  =MAX(B2:B5)
B10: =COUNT(B2:B5)
B11: =COUNTA(A2:A5)
B12: =ROUND(B8, 1)`,
      output: `B7  = 35.75
B8  = 11.9166…   (blank cell is ignored)
B9  = 15.25
B10 = 3
B11 = 4
B12 = 11.9`,
      points: ["AVERAGE ignores blank cells.", "COUNT = numbers only; COUNTA = anything non-empty.", "ROUND changes the value; formatting only changes the display."],
      practice: "For a list of 10 monthly sales figures, show the total, average (rounded to 0 decimals), best month and number of months with data.",
      quiz: { q: "Which function counts non-empty cells including text?", options: ["COUNT", "COUNTA", "SUM", "COUNTBLANK"], answer: 1, why: "COUNTA counts any non-empty cell; COUNT counts only numbers." },
      interview: [
        ["Why might a SUM total differ from a calculator total?", "Cells may show rounded values while storing more decimals, or some numbers may be stored as text and be ignored. Use ROUND and convert text to numbers."],
        ["How do you quickly check sum/average of a selection?", "Select the cells and read the status bar at the bottom — it shows Sum, Average and Count without a formula."]
      ],
      further: [["Microsoft: SUM function", "https://support.microsoft.com/en-us/office/sum-function-043e1c7d-7726-4e80-8f32-07b23e057f89"]]
    },
    {
      slug: "references",
      title: "Relative & absolute references",
      summary: "Why formulas change when copied, and how $ locks a cell.",
      body: `<p>When you copy a formula, Excel adjusts its cell references — that's a <strong>relative</strong> reference (<code>B2</code> becomes <code>B3</code> one row down).</p>
<p>Sometimes a reference must stay fixed, such as a tax rate in one cell. Add <code>$</code> to lock it:</p>
<ul>
<li><code>$F$1</code> — column and row locked (<strong>absolute</strong>).</li>
<li><code>$F1</code> — column locked, row moves (mixed).</li>
<li><code>F$1</code> — row locked, column moves (mixed).</li>
</ul>
<p>Press <kbd>F4</kbd> while editing a reference to cycle through these forms. A cleaner option is to <strong>name</strong> the cell (Formulas → Define Name), e.g. <code>GST</code>, and write <code>=B2*GST</code>.</p>`,
      example: `     A           B          C            ...   F
1    Service     Amount     With GST           18%   (GST rate in F1)
2    Website     10000
3    Logo        2500
4    Hosting     3000

C2:  =B2*(1+$F$1)      then fill down to C4
     → C3 becomes =B3*(1+$F$1)
     → C4 becomes =B4*(1+$F$1)

Without $ (wrong):  C2 =B2*(1+F1)  → copied to C3 = B3*(1+F2)  (F2 is empty!)`,
      output: `C2 = 11800
C3 = 2950
C4 = 3540`,
      points: ["Relative references shift when copied.", "$ locks the column, the row, or both.", "F4 toggles reference types."],
      practice: "Build a multiplication table 1–10 × 1–10 with a single formula in B2 using mixed references, filled right and down.",
      quiz: { q: "Which reference stays exactly the same when copied anywhere?", options: ["F1", "$F1", "F$1", "$F$1"], answer: 3, why: "$F$1 locks both column and row." },
      interview: [
        ["When would you use a mixed reference?", "When copying in two directions — e.g. a rate table where the formula must always read row 1 for rates (B$1) and column A for quantities ($A2)."],
        ["What are named ranges good for?", "They make formulas readable (=Amount*GST), reduce $ mistakes and can be reused across sheets."]
      ],
      further: [["Microsoft: Switch between relative and absolute references", "https://support.microsoft.com/en-us/office/switch-between-relative-absolute-and-mixed-references-dfec08cd-ae65-4f56-839e-5f0d8d0baca9"]]
    },
    {
      slug: "logical",
      title: "IF, AND, OR, IFS & COUNTIF",
      summary: "Making decisions in formulas and counting or summing with conditions.",
      body: `<ul>
<li><code>IF(test, value_if_true, value_if_false)</code> — the core decision function.</li>
<li><code>AND(a, b)</code> / <code>OR(a, b)</code> — combine tests inside IF.</li>
<li><code>IFS(test1, result1, test2, result2, …)</code> — cleaner than nested IFs (Excel 2019+). Use <code>TRUE</code> as the last test for “otherwise”.</li>
<li><code>IFERROR(formula, fallback)</code> — show something friendly instead of #N/A or #DIV/0!.</li>
<li><code>COUNTIF(range, criteria)</code>, <code>SUMIF(range, criteria, sum_range)</code>, and the multi-condition <code>COUNTIFS</code> / <code>SUMIFS</code>.</li>
</ul>
<p>Text criteria go in quotes: <code>"Kochi"</code>; comparisons too: <code>"&gt;=60"</code>.</p>`,
      example: `     A        B         C       D
1    Name     City      Score   Result
2    Anu      Kochi     82
3    Rahul    Thrissur  58
4    Meera    Kochi     67
5    Akhil    Kollam    45

D2:  =IFS(C2>=80,"Distinction", C2>=60,"Pass", TRUE,"Retry")   fill down
E2:  =IF(AND(B2="Kochi", C2>=60), "Kochi shortlist", "")        fill down

G1:  =COUNTIF(C2:C5, ">=60")
G2:  =AVERAGEIF(B2:B5, "Kochi", C2:C5)
G3:  =COUNTIFS(B2:B5, "Kochi", C2:C5, ">=80")
G4:  =IFERROR(C2/0, "n/a")`,
      output: `D2..D5 = Distinction, Retry, Pass, Retry
E2..E5 = Kochi shortlist, (blank), Kochi shortlist, (blank)
G1 = 2
G2 = 74.5
G3 = 1
G4 = n/a`,
      points: ["IF(test, yes, no).", "IFS replaces nested IFs; end with TRUE for 'else'.", "COUNTIFS/SUMIFS handle several conditions."],
      practice: "For a sales list with Region and Amount, calculate total sales for “North” above ₹10,000 using SUMIFS.",
      quiz: { q: "Which function counts cells meeting two conditions?", options: ["COUNTIF", "COUNTIFS", "COUNTA", "IFS"], answer: 1, why: "COUNTIFS accepts multiple range/criteria pairs." },
      interview: [
        ["How would you flag duplicate entries in a column?", "Use =COUNTIF($A$2:$A$100, A2)>1 in a helper column, or Conditional Formatting → Highlight Duplicate Values."],
        ["Why use IFERROR carefully?", "It hides every error, including real mistakes. Prefer IFNA for lookups so other errors still show."]
      ],
      further: [["Microsoft: IF function", "https://support.microsoft.com/en-us/office/if-function-69aed7c9-4e8a-4755-a9bc-aa8bbff73be2"], ["Microsoft: COUNTIFS function", "https://support.microsoft.com/en-us/office/countifs-function-dda3dc6e-f74e-4aee-88bc-aa8c2a866842"]]
    },
    {
      slug: "lookups",
      title: "Lookups: XLOOKUP, VLOOKUP & INDEX/MATCH",
      summary: "Fetching matching values from another table — the most asked Excel interview topic.",
      body: `<p>Lookups find a value in one table and return related data — an employee's department from their ID, a product's price from its code.</p>
<ul>
<li><code>XLOOKUP(lookup, lookup_range, return_range, [if_not_found])</code> — modern, flexible, looks left or right, exact match by default (Excel 2021/365).</li>
<li><code>VLOOKUP(lookup, table, col_number, FALSE)</code> — classic; the lookup column must be the <em>first</em> column, and you must pass <code>FALSE</code> for an exact match.</li>
<li><code>INDEX(return_range, MATCH(lookup, lookup_range, 0))</code> — works in every version and can look in any direction.</li>
</ul>
<p>#N/A means “not found” — check for extra spaces (<code>TRIM</code>) or numbers stored as text.</p>`,
      example: `Sheet "Staff":
     A       B          C
1    EmpID   Name       Dept
2    E101    Anu        Finance
3    E102    Rahul      Sales
4    E103    Meera      HR

Sheet "Report":   A2 = E103

B2:  =XLOOKUP(A2, Staff!A2:A4, Staff!C2:C4, "Not found")
C2:  =VLOOKUP(A2, Staff!A2:C4, 3, FALSE)
D2:  =INDEX(Staff!B2:B4, MATCH(A2, Staff!A2:A4, 0))
E2:  =XLOOKUP("E999", Staff!A2:A4, Staff!B2:B4, "Not found")`,
      output: `B2 = HR
C2 = HR
D2 = Meera
E2 = Not found`,
      points: ["XLOOKUP is the modern default.", "VLOOKUP needs FALSE for exact match and looks right only.", "INDEX/MATCH works everywhere, any direction."],
      practice: "Given a price list (Code, Item, Price) and an order sheet with codes and quantities, fetch each price with XLOOKUP and calculate line totals.",
      quiz: { q: "What should the last argument of VLOOKUP be for an exact match?", options: ["TRUE", "FALSE", "1", "Leave it empty"], answer: 1, why: "FALSE (or 0) forces exact match; TRUE/empty does an approximate match on sorted data." },
      interview: [
        ["Limitations of VLOOKUP?", "It can only look to the right, breaks when columns are inserted (hard-coded column number) and defaults to approximate match."],
        ["Why does a lookup return #N/A when the value looks present?", "Common causes: trailing spaces, numbers stored as text vs numbers, or different spellings. TRIM, VALUE or consistent formatting fix it."]
      ],
      further: [["Microsoft: XLOOKUP function", "https://support.microsoft.com/en-us/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929"], ["Microsoft: VLOOKUP function", "https://support.microsoft.com/en-us/office/vlookup-function-0bbc8083-26fe-4963-8ab8-93a18ad188a1"]]
    },
    {
      slug: "text-dates",
      title: "Text & date functions",
      summary: "Cleaning text and working with dates: TRIM, PROPER, TEXT, LEFT, TODAY, DATEDIF and more.",
      body: `<h3>Text</h3>
<ul>
<li><code>TRIM</code> removes extra spaces; <code>PROPER</code>, <code>UPPER</code>, <code>LOWER</code> fix case.</li>
<li><code>LEFT</code>, <code>RIGHT</code>, <code>MID</code> take part of a string; <code>LEN</code> counts characters; <code>FIND</code> locates text.</li>
<li><code>TEXTJOIN(", ", TRUE, range)</code> joins with a separator; <code>TEXT(value, "dd-mmm-yyyy")</code> formats numbers/dates as text.</li>
<li>Data → <strong>Text to Columns</strong> and <strong>Flash Fill</strong> (<kbd>Ctrl</kbd>+<kbd>E</kbd>) split or reshape text without formulas.</li>
</ul>
<h3>Dates</h3>
<p>Excel stores dates as numbers (days since 1900), so you can subtract them. <code>TODAY()</code>, <code>EOMONTH(date, 0)</code> (month end), <code>NETWORKDAYS(start, end)</code> (working days), <code>DATEDIF(start, end, "y")</code> (completed years).</p>`,
      example: `     A                        B
1    "  aNU   kumar "           12-Mar-2024   (joining date)
2    "EMP-2026-0457"            04-Nov-2026   (report date)

C1:  =PROPER(TRIM(A1))
C2:  =RIGHT(A2, 4)
C3:  =MID(A2, 5, 4)
C4:  =LEN(TRIM(A1))
D1:  =B2-B1
D2:  =DATEDIF(B1, B2, "y") & " yrs " & DATEDIF(B1, B2, "ym") & " months"
D3:  =TEXT(B1, "dddd, dd mmm yyyy")
D4:  =EOMONTH(B2, 0)`,
      output: `C1 = Anu Kumar
C2 = 0457
C3 = 2026
C4 = 9
D1 = 967   (days)
D2 = 2 yrs 7 months
D3 = Tuesday, 12 Mar 2024
D4 = 30-Nov-2026`,
      points: ["TRIM + PROPER clean messy names.", "Dates are numbers — subtract them for days.", "DATEDIF gives years/months between dates."],
      practice: "From a list of full names, split first and last names using Flash Fill, then rebuild them as “LAST, First” with a formula.",
      quiz: { q: "Which function removes extra spaces from text?", options: ["CLEAN", "TRIM", "LEN", "SUBSTITUTE"], answer: 1, why: "TRIM removes leading/trailing spaces and reduces internal runs of spaces to one." },
      interview: [
        ["How do you calculate someone's age or experience in years?", "=DATEDIF(start_date, TODAY(), \"y\") returns completed years."],
        ["A date column is left-aligned and won't sort. Why?", "The dates are stored as text. Convert with DATEVALUE, Text to Columns, or by fixing the source format."]
      ],
      further: [["Microsoft: Text functions", "https://support.microsoft.com/en-us/office/text-functions-reference-cccd86ad-547d-4ea9-a065-7bb697c2a56e"], ["Microsoft: Date and time functions", "https://support.microsoft.com/en-us/office/date-and-time-functions-reference-fd1b5961-c1ae-4677-be58-074152f97b81"]]
    },
    {
      slug: "pivot-tables",
      title: "Sorting, filtering & pivot tables",
      summary: "Turning raw data into summaries with tables, filters and PivotTables.",
      body: `<p>Clean data first: one header row, one record per row, no blank rows or merged cells. Press <kbd>Ctrl</kbd>+<kbd>T</kbd> to convert it into an <strong>Excel Table</strong> — formulas fill automatically and ranges grow as you add rows.</p>
<ul>
<li><strong>Sort</strong> (Data → Sort) by one or more columns.</li>
<li><strong>Filter</strong> (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd>) to show only matching rows.</li>
<li><strong>Remove Duplicates</strong> under the Data tab.</li>
</ul>
<h3>PivotTables</h3>
<p>Insert → PivotTable summarises thousands of rows in seconds. Drag fields into <strong>Rows</strong> (group by), <strong>Columns</strong>, <strong>Values</strong> (Sum/Count/Average) and <strong>Filters</strong>. Right-click → Refresh after the data changes. Add a <strong>Slicer</strong> for clickable filters on dashboards.</p>`,
      example: `Raw data (Table "Sales"):
     Date        Region   Executive   Amount
     01-Oct-26   North    Anu         12000
     03-Oct-26   South    Rahul       8000
     07-Oct-26   North    Meera       15000
     12-Oct-26   South    Rahul       11000
     18-Oct-26   North    Anu         9000

PivotTable setup:
  Rows:    Region
  Values:  Sum of Amount, Count of Amount`,
      output: `Region   Sum of Amount   Count of Amount
North    36000           3
South    19000           2
Grand    55000           5`,
      points: ["Ctrl+T tables keep ranges and formulas tidy.", "PivotTables group and summarise without formulas.", "Refresh the pivot when source data changes."],
      practice: "Create a pivot from the sample data showing each executive's total and average sale, sorted from highest total.",
      quiz: { q: "Where do you drag a field to group the summary by it?", options: ["Values", "Rows", "Filters", "Slicers only"], answer: 1, why: "Fields in Rows become the groups; Values holds the numbers being summarised." },
      interview: [
        ["Why convert data to an Excel Table before making a pivot?", "The pivot's source then grows automatically with new rows, so refreshing picks up all data without changing the range."],
        ["How would you show sales by month in a pivot?", "Put the Date field in Rows and group it by Months (and Years) via right-click → Group."]
      ],
      further: [["Microsoft: Create a PivotTable", "https://support.microsoft.com/en-us/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576"]]
    },
    {
      slug: "formatting-charts",
      title: "Conditional formatting, validation & charts",
      summary: "Highlighting what matters, preventing bad input, and presenting with charts.",
      body: `<h3>Conditional formatting</h3>
<p>Home → Conditional Formatting colours cells by rule: values above a target, duplicates, top 10, data bars, colour scales. Use “Use a formula” for custom rules, e.g. highlight the whole row when status is “Overdue”: <code>=$D2="Overdue"</code>.</p>
<h3>Data validation</h3>
<p>Data → Data Validation restricts input: a drop-down <strong>List</strong> (Pending, Done), whole numbers between limits, dates after today. It keeps shared sheets clean.</p>
<h3>Charts</h3>
<ul>
<li><strong>Column/bar</strong> — compare categories.</li>
<li><strong>Line</strong> — trends over time.</li>
<li><strong>Pie</strong> — parts of a whole, only with a few slices.</li>
</ul>
<p>Give every chart a clear title and labelled axes, and avoid 3-D effects that distort values.</p>`,
      example: `     A          B          C           D
1    Task       Owner      Due date    Status
2    GST file   Anu        05-Nov-26   Pending
3    Payroll    Rahul      01-Nov-26   Overdue
4    Audit      Meera      20-Nov-26   Done

Data validation on D2:D50:
  Allow: List   Source: Pending,Done,Overdue

Conditional formatting on A2:D50 (Use a formula):
  =$D2="Overdue"        → red fill
  =$D2="Done"           → green text

Chart: select Owner + a count of tasks → Insert → Clustered Column`,
      output: `Row 3 (Payroll) turns red; row 4 (Audit) shows green text.
Typing "Finished" in D5 is rejected with an error message.`,
      points: ["Formula-based rules can colour whole rows.", "Validation lists stop typos in shared sheets.", "Pick the chart that matches the question."],
      practice: "Build an attendance sheet with a P/A/L drop-down for each day and a rule that highlights any employee with more than 3 'A' in the month.",
      quiz: { q: "Which chart best shows a trend over 12 months?", options: ["Pie", "Line", "Doughnut", "Radar"], answer: 1, why: "Line charts show change over time clearly." },
      interview: [
        ["How do you highlight an entire row based on one cell?", "Select the rows, add a conditional formatting rule with a formula such as =$D2=\"Overdue\" — the $ locks the column while the row changes."],
        ["How would you build a simple dashboard in Excel?", "Clean data in a Table, summarise with PivotTables, add PivotCharts, connect Slicers for filtering, and place KPIs on one sheet."]
      ],
      further: [["Microsoft: Use conditional formatting", "https://support.microsoft.com/en-us/office/use-conditional-formatting-to-highlight-information-fed60dfa-1d3f-4e13-9ecb-f1951ff89d7f"], ["Microsoft: Apply data validation", "https://support.microsoft.com/en-us/office/apply-data-validation-to-cells-29fecbcc-d1b9-42c1-9d76-eff3ce5f7249"]]
    }
  ]
};
