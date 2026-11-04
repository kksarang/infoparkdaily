/* Python tutorial — original InfoparkDaily lessons. Code runs in the browser with Pyodide (a Web Worker). */

const PYDOCS = "https://docs.python.org/3/";

export const PY_TRACK = {
  key: "python",
  name: "Python",
  long: "Python — readable programming for everyone",
  color: "#3776ab",
  tagline: "Logic, data and automation.",
  level: "Beginner",
  lang: "python",
  lessons: [
    {
      slug: "introduction",
      title: "Python introduction",
      summary: "What Python is used for, running code and the print() function.",
      body: `<p>Python is a general-purpose language known for code that reads almost like English. Teams in Kerala's IT parks use it for backend services (Django, FastAPI), data analysis (pandas), automation scripts, testing and machine learning.</p>
<h3>Your first program</h3>
<p><code>print()</code> shows a value on the screen. Text goes inside quotes; numbers don't need them. Python runs your file from top to bottom, one line at a time.</p>
<h3>Comments and indentation</h3>
<p>Anything after <code>#</code> is a comment — Python ignores it. Unlike many languages, Python uses <strong>indentation</strong> (spaces at the start of a line) to group code, so be consistent: four spaces per level is the convention.</p>`,
      example: `# My first Python program
print("Namaskaram, Python!")
print("Lessons completed:", 1)
print(10 + 5)`,
      points: ["print() displays output.", "# starts a comment.", "Indentation is part of Python's syntax — use 4 spaces."],
      practice: "Change the program so it prints your name on one line and the city you want to work in on the next.",
      quiz: { q: "Which symbol starts a comment in Python?", options: ["//", "#", "<!--", "--"], answer: 1, why: "Python comments start with #; // is used in JavaScript and Java." },
      interview: [
        ["Why is Python popular for beginners and companies alike?", "Its syntax is short and readable, it has a huge standard library and third-party packages, and it is used across web, data, automation and AI — so one language covers many jobs."],
        ["Is Python compiled or interpreted?", "CPython compiles source to bytecode and then interprets that bytecode on a virtual machine. In everyday terms it is called an interpreted language because you run the source directly without a separate build step."]
      ],
      further: [["Python tutorial (official)", PYDOCS + "tutorial/index.html"], ["Built-in print()", PYDOCS + "library/functions.html#print"]]
    },
    {
      slug: "variables",
      title: "Variables & data types",
      summary: "Creating variables, int, float, str, bool and converting between types.",
      body: `<p>A variable is a name that points to a value. You create one by assigning with <code>=</code> — no keyword needed. Names use <code>snake_case</code> by convention.</p>
<ul>
<li><code>int</code> — whole numbers: <code>25</code></li>
<li><code>float</code> — decimals: <code>4.5</code></li>
<li><code>str</code> — text: <code>"Kochi"</code> or <code>'Kochi'</code></li>
<li><code>bool</code> — <code>True</code> or <code>False</code> (capital letters)</li>
<li><code>None</code> — “no value yet”</li>
</ul>
<p><code>type(x)</code> tells you a value's type. Convert with <code>int()</code>, <code>float()</code>, <code>str()</code> — for example <code>int("42")</code> gives the number 42.</p>`,
      example: `candidate_name = "Anu"
experience_years = 2
expected_lpa = 5.5
is_fresher = experience_years == 0

print(candidate_name, experience_years, expected_lpa, is_fresher)
print(type(expected_lpa))

notice_days = "30"           # text, e.g. from a form
print(int(notice_days) + 15) # convert before doing maths`,
      points: ["Assign with = ; no declaration keyword.", "True / False / None are capitalised.", "Convert text to numbers with int() or float() before calculations."],
      practice: "Create variables for a job title, a monthly salary and the number of openings. Print the yearly salary (monthly × 12).",
      quiz: { q: "What does int(\"7\") + 3 give?", options: ["\"73\"", "10", "An error", "7.3"], answer: 1, why: "int(\"7\") converts the text to the number 7, and 7 + 3 is 10." },
      interview: [
        ["What is dynamic typing?", "In Python a variable has no fixed type — the value does. The same name can point to an int now and a str later. Type errors appear at run time rather than at compile time."],
        ["What is the difference between a mutable and an immutable type?", "Mutable objects (list, dict, set) can be changed in place. Immutable objects (int, float, str, tuple) cannot — 'changing' them creates a new object."]
      ],
      further: [["Built-in types", PYDOCS + "library/stdtypes.html"]]
    },
    {
      slug: "strings",
      title: "Strings",
      summary: "f-strings, common string methods, indexing and slicing.",
      body: `<p>Strings hold text. The most useful tool is the <strong>f-string</strong>: put <code>f</code> before the quotes and write variables inside <code>{ }</code>.</p>
<h3>Handy methods</h3>
<p><code>.upper()</code>, <code>.lower()</code>, <code>.title()</code>, <code>.strip()</code> (remove spaces at both ends), <code>.replace(a, b)</code>, <code>.split(",")</code> (text → list) and <code>", ".join(list)</code> (list → text). Methods return a <em>new</em> string; the original is unchanged.</p>
<h3>Indexing and slicing</h3>
<p>Each character has a position starting at 0. <code>s[0]</code> is the first, <code>s[-1]</code> the last, and <code>s[0:4]</code> takes characters 0 to 3. <code>len(s)</code> gives the length.</p>`,
      example: `role = "  python developer  "
clean = role.strip().title()
print(clean)

city, years = "Thiruvananthapuram", 3
print(f"{clean} in {city} with {years} years")

skills = "python,sql,git"
print(skills.split(","))
print(" | ".join(["Kochi", "Kozhikode", "Thrissur"]))
print(city[0:7], len(city))`,
      points: ["f\"...{value}...\" formats text cleanly.", "String methods return new strings.", "Indexes start at 0; negative indexes count from the end."],
      practice: "Given email = \" Anu.Kumar@Example.COM \", print it trimmed and in lower case, then print only the part before the @.",
      quiz: { q: "What is \"Kerala\"[-1]?", options: ["\"K\"", "\"a\"", "\"l\"", "An error"], answer: 1, why: "Index -1 is the last character, which is \"a\"." },
      interview: [
        ["How do you reverse a string in Python?", "Use a slice with step -1: text[::-1]. It returns a new reversed string."],
        ["Why are strings immutable and what does that mean in practice?", "You cannot change a character in place (s[0] = 'x' fails). Every change produces a new string, which makes strings safe to share and usable as dictionary keys."]
      ],
      further: [["String methods", PYDOCS + "library/stdtypes.html#string-methods"], ["f-strings", PYDOCS + "tutorial/inputoutput.html#formatted-string-literals"]]
    },
    {
      slug: "conditions",
      title: "Conditions",
      summary: "if, elif, else, comparison operators and and / or / not.",
      body: `<p>Conditions let your program choose. Python checks each test from the top and runs the first block whose condition is true.</p>
<pre><code>if score &gt;= 75:
    print("Shortlisted")
elif score &gt;= 50:
    print("Waitlisted")
else:
    print("Not selected")</code></pre>
<p>Note the colon <code>:</code> at the end of each test and the indented block underneath.</p>
<p>Comparisons: <code>== != &lt; &gt; &lt;= &gt;=</code>. Combine with <code>and</code>, <code>or</code>, <code>not</code>. Check membership with <code>in</code>: <code>"sql" in skills</code>.</p>`,
      example: `experience = 1
skills = ["python", "sql"]

if experience == 0:
    level = "Fresher"
elif experience <= 3:
    level = "Junior"
else:
    level = "Senior"
print("Level:", level)

if "sql" in skills and experience >= 1:
    print("Eligible for Data Analyst role")
if not "java" in skills:
    print("Tip: learn Java for backend roles")`,
      points: ["Each test ends with a colon.", "elif = else if; only the first true branch runs.", "in checks membership in lists and strings."],
      practice: "Write a program that takes a marks variable and prints Distinction (≥ 80), First class (≥ 60), Pass (≥ 40) or Fail.",
      quiz: { q: "Which keyword checks another condition after if?", options: ["else if", "elif", "elseif", "then"], answer: 1, why: "Python uses elif for additional conditions." },
      interview: [
        ["What values are 'falsy' in Python?", "False, None, 0, 0.0, empty string '', and empty containers such as [], {}, set() and (). Everything else is truthy."],
        ["What is the difference between == and is?", "== compares values; is checks whether two names point to the same object. Use is mainly for None checks: if x is None."]
      ],
      further: [["if statements", PYDOCS + "tutorial/controlflow.html#if-statements"]]
    },
    {
      slug: "loops",
      title: "Loops",
      summary: "for loops with range(), looping over lists, while, break and continue.",
      body: `<p><code>for</code> repeats once for every item in a sequence. <code>range(start, stop)</code> produces numbers up to (not including) <code>stop</code>.</p>
<p><code>while</code> repeats as long as a condition is true — make sure something inside changes so it eventually stops.</p>
<p><code>break</code> leaves the loop immediately; <code>continue</code> skips to the next round. <code>enumerate(items)</code> gives you the position and the item together.</p>`,
      example: `for day in range(1, 6):
    print("Practice day", day)

companies = ["UST", "IBS", "Tata Elxsi"]
for number, name in enumerate(companies, start=1):
    print(number, name)

applications = 0
while applications < 3:
    applications += 1
    print("Applied:", applications)

for n in range(1, 20):
    if n % 7 == 0:
        print("First multiple of 7:", n)
        break`,
      points: ["range(a, b) stops before b.", "enumerate() gives index and item.", "Every while loop needs a way to finish."],
      practice: "Print the multiplication table of 9 from 9 × 1 to 9 × 10 using a for loop and an f-string.",
      quiz: { q: "Which numbers does range(2, 5) produce?", options: ["2, 3, 4, 5", "2, 3, 4", "3, 4, 5", "0 to 5"], answer: 1, why: "range stops before the end value, so it gives 2, 3 and 4." },
      interview: [
        ["How would you loop over a dictionary's keys and values?", "Use .items(): for key, value in data.items(): ... — it yields pairs."],
        ["What does the else clause on a loop do?", "A loop's else block runs only if the loop finished without hitting break. It is handy for search loops: else means 'not found'."]
      ],
      further: [["for statements", PYDOCS + "tutorial/controlflow.html#for-statements"], ["range()", PYDOCS + "library/stdtypes.html#range"]]
    },
    {
      slug: "collections",
      title: "Lists, tuples, sets & dicts",
      summary: "Python's four everyday collections and list comprehensions.",
      body: `<ul>
<li><strong>list</strong> <code>[ ]</code> — ordered and changeable: <code>append()</code>, <code>remove()</code>, <code>sort()</code>, indexing.</li>
<li><strong>tuple</strong> <code>( )</code> — ordered but fixed; good for values that belong together, like (lat, lng).</li>
<li><strong>set</strong> <code>{ }</code> — unique items, no order; fast membership checks and de-duplication.</li>
<li><strong>dict</strong> <code>{key: value}</code> — look up values by key, like a mini database record.</li>
</ul>
<h3>List comprehensions</h3>
<p>A compact way to build a new list: <code>[expression for item in items if condition]</code>.</p>`,
      example: `openings = ["QA", "Frontend", "QA", "Data"]
openings.append("DevOps")
print(openings, len(openings))

unique_roles = set(openings)
print(sorted(unique_roles))

office = (10.0159, 76.3419)   # a tuple
print("Lat:", office[0])

job = {"title": "Data Analyst", "city": "Kochi", "lpa": 6}
job["remote"] = False
print(job["title"], job.get("bonus", "not listed"))

salaries = [3.5, 6, 8, 12]
high = [s for s in salaries if s >= 6]
print(high)`,
      points: ["list = ordered & editable; tuple = fixed.", "set removes duplicates.", "dict.get(key, default) avoids KeyError."],
      practice: "Make a dict that counts how many times each skill appears in [\"sql\", \"python\", \"sql\", \"excel\", \"sql\"].",
      quiz: { q: "Which collection automatically removes duplicates?", options: ["list", "tuple", "set", "dict values"], answer: 2, why: "A set stores each value only once." },
      interview: [
        ["List vs tuple — when would you use each?", "Use a list for a collection that will change (add/remove). Use a tuple for a fixed group of values, as a dictionary key, or to signal that the data should not be modified."],
        ["What happens if you read a missing key from a dict?", "dict[key] raises KeyError. Use dict.get(key, default) or check with 'key in dict' first."]
      ],
      further: [["Data structures", PYDOCS + "tutorial/datastructures.html"]]
    },
    {
      slug: "functions",
      title: "Functions",
      summary: "def, parameters, default values, return and keyword arguments.",
      body: `<p>A function packages code you want to reuse. Define it with <code>def</code>, give it parameters, and send a result back with <code>return</code>.</p>
<ul>
<li><strong>Default values</strong>: <code>def greet(name="friend")</code>.</li>
<li><strong>Keyword arguments</strong>: call as <code>salary(lpa=6, months=12)</code> — clearer and order-independent.</li>
<li>A function without <code>return</code> returns <code>None</code>.</li>
<li>Write a short <strong>docstring</strong> (the first string inside) to explain what the function does.</li>
</ul>`,
      example: `def monthly_in_hand(lpa, deduction_percent=12):
    """Rough monthly take-home from a yearly package in LPA."""
    yearly = lpa * 100000
    after = yearly * (1 - deduction_percent / 100)
    return round(after / 12)

print(monthly_in_hand(6))
print(monthly_in_hand(lpa=10, deduction_percent=20))

def describe(title, *skills):
    return f"{title}: " + ", ".join(skills)

print(describe("Backend", "Python", "Django", "PostgreSQL"))`,
      points: ["def name(params): then an indented body.", "return sends a value back.", "Defaults and keyword arguments make calls readable."],
      practice: "Write is_eligible(age, degree) that returns True when age is 18–30 and degree is \"BTech\" or \"MCA\". Test it with three calls.",
      quiz: { q: "What does a function return if it has no return statement?", options: ["0", "False", "None", "An empty string"], answer: 2, why: "Python functions return None by default." },
      interview: [
        ["What are *args and **kwargs?", "*args collects extra positional arguments into a tuple; **kwargs collects extra keyword arguments into a dict. They let a function accept a flexible number of inputs."],
        ["Why shouldn't you use a list as a default argument value?", "Defaults are evaluated once, when the function is defined, so the same list is shared between calls and changes leak across calls. Use None and create the list inside."]
      ],
      further: [["Defining functions", PYDOCS + "tutorial/controlflow.html#defining-functions"]]
    },
    {
      slug: "errors",
      title: "Errors & exceptions",
      summary: "Reading tracebacks and handling problems with try / except / finally.",
      body: `<p>When something goes wrong, Python raises an <strong>exception</strong> and prints a traceback. Read it from the bottom: the last line names the error type and message; the lines above show where it happened.</p>
<p>Common types: <code>ValueError</code> (wrong value, e.g. <code>int("abc")</code>), <code>KeyError</code>, <code>IndexError</code>, <code>TypeError</code>, <code>ZeroDivisionError</code>.</p>
<pre><code>try:
    risky()
except ValueError as e:
    handle(e)
else:
    runs_if_no_error()
finally:
    always_runs()</code></pre>
<p>Catch only the errors you expect — a bare <code>except:</code> hides real bugs. Use <code>raise</code> to signal your own errors.</p>`,
      example: `def parse_lpa(text):
    try:
        value = float(text)
    except ValueError:
        print(f"'{text}' is not a number")
        return None
    if value <= 0:
        raise ValueError("LPA must be positive")
    return value

print(parse_lpa("6.5"))
print(parse_lpa("six"))

try:
    parse_lpa("-2")
except ValueError as err:
    print("Caught:", err)
finally:
    print("Validation finished")`,
      points: ["Read tracebacks from the bottom up.", "Catch specific exceptions, not everything.", "finally always runs — good for clean-up."],
      practice: "Write safe_divide(a, b) that returns a / b, or prints a friendly message and returns None when b is 0.",
      quiz: { q: "Which error does int(\"abc\") raise?", options: ["TypeError", "ValueError", "KeyError", "SyntaxError"], answer: 1, why: "The type (str) is acceptable to int(), but this particular value can't be converted — that's a ValueError." },
      interview: [
        ["What is the difference between an error and an exception?", "Syntax errors stop the code from running at all. Exceptions happen while the program runs and can be caught and handled with try/except."],
        ["When would you write a custom exception?", "When callers need to distinguish your error from built-in ones — e.g. class InvalidResumeError(Exception): pass — so they can catch it specifically."]
      ],
      further: [["Errors and exceptions", PYDOCS + "tutorial/errors.html"], ["Built-in exceptions", PYDOCS + "library/exceptions.html"]]
    },
    {
      slug: "modules",
      title: "Modules & the standard library",
      summary: "import, from … import, and useful built-in modules: math, random, datetime, json.",
      body: `<p>A <strong>module</strong> is a file of Python code you can reuse with <code>import</code>. Python ships with a large standard library, so many tasks need no installation.</p>
<ul>
<li><code>math</code> — <code>sqrt</code>, <code>ceil</code>, <code>floor</code>, <code>pi</code></li>
<li><code>random</code> — <code>choice</code>, <code>randint</code>, <code>shuffle</code></li>
<li><code>datetime</code> — dates, times and differences between them</li>
<li><code>json</code> — convert between Python dicts and JSON text (used by every web API)</li>
</ul>
<p>Third-party packages (requests, pandas, Django) are installed with <code>pip install name</code>, usually inside a virtual environment created with <code>python -m venv .venv</code>.</p>`,
      example: `import math
import json
from datetime import date
from random import choice

print(math.ceil(7 / 2))

joining = date(2026, 12, 1)
today = date(2026, 11, 4)
print("Days to joining:", (joining - today).days)

job = {"title": "QA Engineer", "skills": ["Selenium", "Python"]}
text = json.dumps(job)
print(text)
print(json.loads(text)["skills"][0])

print("Today's practice topic:", choice(["loops", "dicts", "functions"]))`,
      points: ["import module or from module import name.", "The standard library covers maths, dates, JSON and more.", "Use pip + virtual environments for third-party packages."],
      practice: "Use datetime.date to calculate how many days are left until 1 January 2027, and print it in an f-string.",
      quiz: { q: "Which module converts a dict to JSON text?", options: ["math", "json", "random", "os"], answer: 1, why: "json.dumps() turns Python objects into JSON text; json.loads() does the reverse." },
      interview: [
        ["What is a virtual environment and why use one?", "An isolated folder with its own Python packages. It keeps each project's dependencies separate, so versions don't clash between projects."],
        ["What does if __name__ == \"__main__\": do?", "Code under it runs only when the file is executed directly, not when it is imported as a module — useful for scripts that also provide reusable functions."]
      ],
      further: [["Modules", PYDOCS + "tutorial/modules.html"], ["Standard library index", PYDOCS + "library/index.html"], ["Virtual environments", PYDOCS + "tutorial/venv.html"]]
    }
  ]
};
