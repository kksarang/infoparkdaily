/* Python Development — 30 Important Interview Questions & Answers. Original InfoparkDaily content. Format: see guides/index.mjs. */
export const meta = {
  slug: "python-development",
  field: "it",
  name: "Python development",
  count: 30,
  topics: "Python basics, data types, functions, OOP, error handling, Django, FastAPI, testing and performance",
  level: "Fresher to experienced"
};

export const text = `
## Python basics

### What are the key features of Python?
- Simple, readable syntax that uses indentation for blocks.
- Interpreted and dynamically typed: you don't declare variable types.
- A large standard library and a huge ecosystem of packages (pip).
- Supports procedural, object-oriented and functional styles.
- Used for web backends, automation, data analysis, machine learning and scripting.

### What is the difference between a list, a tuple, a set and a dictionary?
| Type | Ordered | Changeable | Duplicates | Example |
| list | Yes | Yes | Allowed | \`[1, 2, 2]\` |
| tuple | Yes | No | Allowed | \`(1, 2)\` |
| set | No | Yes | Not allowed | \`{1, 2}\` |
| dict | Yes (insertion order) | Yes | Keys unique | \`{"a": 1}\` |

### What is the difference between mutable and immutable types?
Mutable objects can be changed after creation: lists, dicts, sets. Immutable objects can't: ints, floats, strings, tuples. When you "change" an immutable value, Python creates a new object. Only immutable (hashable) objects can be dictionary keys or set members.

### What is the difference between is and ==?
- \`==\` checks whether two values are equal.
- \`is\` checks whether two names point to the same object in memory.

Use \`is\` only for singletons such as \`None\`: \`if value is None:\`.

### What is the difference between a shallow copy and a deep copy?
A shallow copy (\`list.copy()\`, \`copy.copy()\`) creates a new outer object but shares the nested objects inside it. A deep copy (\`copy.deepcopy()\`) copies everything recursively.
\`\`\`
import copy

team = {"name": "QA", "members": ["Anu", "Ravi"]}
shallow = copy.copy(team)
deep = copy.deepcopy(team)
team["members"].append("Meera")
# shallow["members"] now has Meera too; deep["members"] does not
\`\`\`

### What are list comprehensions?
A short way to build a list from another iterable, optionally with a condition:
\`\`\`
squares = [n * n for n in range(10) if n % 2 == 0]
# [0, 4, 16, 36, 64]
\`\`\`
There are also dict comprehensions (\`{k: v for ...}\`) and set comprehensions. Keep them simple; use a loop when the logic gets long.

### How does Python manage memory?
Python uses reference counting: each object tracks how many references point to it and is freed when the count reaches zero. A cyclic garbage collector also cleans up groups of objects that refer to each other. Memory is managed by the interpreter, so you rarely free memory yourself.

## Functions and advanced features

### What are *args and **kwargs?
- \`*args\` collects extra positional arguments into a tuple.
- \`**kwargs\` collects extra keyword arguments into a dictionary.
\`\`\`
def log(message, *args, **kwargs):
    print(message, args, kwargs)

log("Saved", 1, 2, user="anu")  # Saved (1, 2) {'user': 'anu'}
\`\`\`

### What is a lambda function?
A small anonymous function written in one expression, often used as a short argument to functions like \`sorted()\`:
\`\`\`
people.sort(key=lambda p: p["age"])
\`\`\`
For anything longer than one expression, write a normal \`def\` function.

### What is a decorator?
A decorator is a function that wraps another function to add behaviour — logging, timing, authentication checks — without changing its code.
\`\`\`
import time

def timed(func):
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(func.__name__, "took", time.perf_counter() - start)
        return result
    return wrapper

@timed
def load_report():
    ...
\`\`\`

### What are generators and why use them?
A generator produces values one at a time with \`yield\` instead of building a full list in memory. It's ideal for large files or endless streams.
\`\`\`
def read_lines(path):
    with open(path) as f:
        for line in f:
            yield line.strip()
\`\`\`

### What is the mutable default argument problem?
Default values are created once, when the function is defined. A mutable default such as a list is shared between calls:
\`\`\`
def add(item, items=[]):   # bug: same list every call
    items.append(item)
    return items
\`\`\`
Use \`None\` and create the list inside: \`def add(item, items=None): items = items or []\`.

### What is the GIL?
The Global Interpreter Lock in CPython lets only one thread execute Python bytecode at a time. Threads still help for I/O-bound work (network, files), because the lock is released while waiting. For CPU-heavy work, use \`multiprocessing\` or libraries written in C, such as NumPy.

## OOP and error handling

### How do classes and objects work in Python?
A class is a blueprint; an object is an instance of it. \`__init__\` sets up a new object, and \`self\` refers to the current instance.
\`\`\`
class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
\`\`\`

### What is the difference between @staticmethod and @classmethod?
- **@classmethod** receives the class (\`cls\`) as its first argument. Often used for alternative constructors such as \`Account.from_csv(row)\`.
- **@staticmethod** receives neither the class nor the instance. It's a plain function grouped inside the class.

### What are dunder (magic) methods?
Special methods with double underscores that let your objects work with Python's built-in behaviour: \`__init__\` (create), \`__str__\` and \`__repr__\` (display), \`__len__\` (len), \`__eq__\` (==), \`__iter__\` (loops). For example, defining \`__len__\` lets you call \`len(obj)\`.

### How does exception handling work in Python?
\`\`\`
try:
    value = int(user_input)
except ValueError:
    print("Please enter a number")
else:
    print("Valid number")      # runs if no exception
finally:
    print("Always runs")        # cleanup
\`\`\`
Catch specific exceptions rather than a bare \`except:\`, and raise your own with \`raise\`.

### What is a context manager?
An object used with \`with\` that sets something up and always cleans up, even on errors — closing files, releasing locks, committing transactions.
\`\`\`
with open("report.csv") as f:
    data = f.read()
# the file is closed here
\`\`\`
You can write your own with \`__enter__\`/\`__exit__\` or the \`contextlib.contextmanager\` decorator.

### What is a virtual environment and why use it?
A virtual environment (\`python -m venv .venv\`) is an isolated folder with its own Python packages. Each project gets its own dependency versions, so projects don't conflict. Save dependencies with \`pip freeze > requirements.txt\` and reinstall them with \`pip install -r requirements.txt\`.

## Web frameworks: Django and FastAPI

### What is Django's MVT architecture?
- **Model:** defines data and maps it to database tables through the ORM.
- **View:** handles the request, runs the logic and returns a response.
- **Template:** the HTML presentation layer.

Django's URL configuration maps each URL to a view.

### What are Django migrations?
Migrations are version-controlled changes to the database schema generated from your models. \`python manage.py makemigrations\` creates them, and \`python manage.py migrate\` applies them. They keep every environment's database structure in sync with the code.

### How does the Django ORM avoid extra queries?
Use \`select_related\` for foreign-key and one-to-one relations (one SQL join) and \`prefetch_related\` for many-to-many and reverse relations (one extra query for all items). This avoids the N+1 problem when looping over related objects.

### What is Django middleware?
Middleware is a chain of hooks that process every request and response — for example authentication, sessions, CSRF protection and security headers. Each middleware can change the request before the view runs or the response after it.

### Why is FastAPI popular for APIs?
FastAPI is fast, uses Python type hints for automatic request validation (through Pydantic), generates interactive API docs (Swagger UI) automatically and supports \`async\` endpoints.
\`\`\`
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

@app.post("/items")
def create_item(item: Item):
    return {"saved": item.name}
\`\`\`

### What is the difference between Flask, Django and FastAPI?
- **Django:** "batteries included" — ORM, admin, auth and forms built in. Good for full web apps.
- **Flask:** minimal and flexible; you add the pieces you need.
- **FastAPI:** modern, async-friendly and focused on fast, typed APIs.

## Testing, async and performance

### How do you write tests in Python?
pytest is the most common tool. Test functions start with \`test_\` and use plain \`assert\`:
\`\`\`
def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5
\`\`\`
Use fixtures for setup and \`unittest.mock\` to replace external services such as APIs or databases.

### What is async/await in Python?
\`async def\` defines a coroutine, and \`await\` pauses it while waiting for I/O so the event loop can run other tasks. It lets one thread handle many network requests at once. It helps I/O-bound work, not CPU-heavy work.

### What is the difference between threading and multiprocessing?
- **threading:** threads share memory; good for I/O-bound tasks. The GIL limits CPU-bound speed-ups.
- **multiprocessing:** separate processes with their own memory and interpreter; good for CPU-bound tasks, but with more overhead.

### What is PEP 8?
PEP 8 is Python's style guide: 4-space indentation, \`snake_case\` for functions and variables, \`PascalCase\` for classes, readable line lengths and clear spacing. Tools such as Black, Ruff or Flake8 format and check code automatically.

### How do you find and fix slow Python code?
1. Measure with \`cProfile\` or \`time.perf_counter()\` before changing anything.
2. Use the right data structure — a set or dict lookup is much faster than searching a list.
3. Avoid repeated work inside loops; use built-ins and comprehensions.
4. Use NumPy or pandas for heavy numeric work.
5. Cache results (\`functools.lru_cache\`) and use async or multiprocessing where they fit.
`;

export const practice = [
  ["Basics", "Count word frequency in a sentence using a dictionary"],
  ["Basics", "Remove duplicates from a list while keeping order"],
  ["Functions", "Write a decorator that retries a function three times"],
  ["Files", "Read a CSV file and print the total of one column"],
  ["OOP", "Model a bank account with deposit, withdraw and balance checks"],
  ["Django", "Build a blog with models, admin and a list page"],
  ["FastAPI", "Create a CRUD API with Pydantic validation"],
  ["Testing", "Write pytest tests with a fixture and a mock"],
  ["Automation", "Rename all files in a folder using a pattern"],
  ["Projects", "Explain how your project is structured and deployed"]
];
