/* TypeScript tutorial — original InfoparkDaily lessons. Examples show TypeScript code and what the compiler or program prints. */

const TS = "https://www.typescriptlang.org/docs/handbook/";

export const TS_TRACK = {
  key: "typescript",
  name: "TypeScript",
  long: "TypeScript — types for safer, larger JavaScript and React apps",
  color: "#3178c6",
  tagline: "Typed JavaScript for real projects.",
  level: "Beginner → Intermediate",
  lang: "static",
  feature: "Code + compiler output",
  heroLine: "Every lesson shows TypeScript code with what the compiler catches or the program prints",
  exampleTitle: "Example code",
  exampleBadge: "Try it in the TypeScript Playground or with tsc",
  outputTitle: "Compiler / program output",
  exampleNote: "Paste the code into the official TypeScript Playground in your browser, or install TypeScript (<code>npm install -D typescript</code>) and run <code>npx tsc --noEmit</code> to type-check. Names are fictional.",
  lessons: [
    {
      slug: "introduction",
      title: "TypeScript introduction",
      summary: "What TypeScript adds to JavaScript, why teams use it and how code is compiled.",
      body: `<p><strong>TypeScript</strong> is JavaScript with <strong>types</strong>. You describe what kind of value each variable, parameter and object should hold, and the compiler warns you about mistakes <em>before</em> the code runs — wrong property names, missing arguments, calling a method on something that might be <code>undefined</code>.</p>
<p>The compiler (<code>tsc</code>) removes the types and outputs plain JavaScript, so TypeScript runs anywhere JavaScript runs: browsers, Node.js, React, Angular.</p>
<h3>Why companies ask for it</h3>
<ul>
<li>Bugs are caught while typing instead of in production.</li>
<li>Editors give accurate autocomplete and safe renaming.</li>
<li>Types document the code, which helps large teams.</li>
</ul>
<p>Angular is written in TypeScript, and most new React and Node projects use it too.</p>`,
      example: `// greet.ts
function greet(name: string, years: number): string {
  return "Hi " + name + ", " + years + " years of experience";
}

greet("Anu", 3);      // OK
greet("Anu");         // error
greet(3, "Anu");      // error`,
      output: `greet.ts:6:1 - error TS2554: Expected 2 arguments, but got 1.
greet.ts:7:7 - error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.

Found 2 errors.`,
      points: ["TypeScript = JavaScript + types.", "Errors are caught at compile time, before running.", "tsc outputs plain JavaScript.", "Used widely with React, Angular and Node.js."],
      practice: "Open the TypeScript Playground, write a function that takes a price (number) and a GST rate (number) and returns the total, then try calling it with a string to see the error.",
      quiz: { q: "What does the TypeScript compiler produce?", options: ["Java bytecode", "Plain JavaScript", "Machine code", "A database schema"], answer: 1, why: "tsc checks types and then strips them, outputting JavaScript that browsers and Node can run." },
      interview: [
        ["What are the benefits of TypeScript over JavaScript?", "Static type checking catches many bugs before runtime, editors give better autocomplete and refactoring, and types act as documentation. It compiles to plain JavaScript, so there's no runtime cost."],
        ["Do TypeScript types exist at runtime?", "No. Types are erased during compilation. To check data that arrives at runtime (API responses, form input) you still need runtime validation, for example with a library such as Zod."]
      ],
      further: [["TypeScript for JavaScript programmers", TS + "typescript-in-5-minutes.html"]]
    },
    {
      slug: "basic-types",
      title: "Basic types & inference",
      summary: "string, number, boolean, arrays, tuples, any vs unknown, and letting TypeScript infer types.",
      body: `<p>The basic types are <code>string</code>, <code>number</code>, <code>boolean</code>, <code>null</code> and <code>undefined</code>. Arrays are written <code>string[]</code> or <code>Array&lt;string&gt;</code>; a <strong>tuple</strong> is a fixed-length array such as <code>[string, number]</code>.</p>
<p>You don't have to annotate everything. TypeScript <strong>infers</strong> types from values: <code>let city = "Kochi"</code> is already a <code>string</code>. Annotate function parameters and public APIs; let inference handle local variables.</p>
<h3>any vs unknown</h3>
<ul>
<li><code>any</code> switches type checking off — avoid it.</li>
<li><code>unknown</code> means “could be anything”, but you must check the type before using it. Use it for data you don't control yet.</li>
</ul>`,
      example: `let city = "Kochi";             // inferred as string
city = 42;                       // error

const skills: string[] = ["TS", "React"];
const salary: [string, number] = ["LPA", 6.5];

function show(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // OK: narrowed to string
  }
}

show("typescript");`,
      output: `error TS2322: Type 'number' is not assignable to type 'string'.

(after fixing that line, the program prints)
TYPESCRIPT`,
      points: ["Basic types: string, number, boolean, null, undefined.", "Arrays: string[]; tuples: [string, number].", "Let TypeScript infer local variable types.", "Prefer unknown over any, and check before use."],
      practice: "Declare a tuple for a job (title, salary in LPA, isRemote) and an array of three such tuples, then loop and print each one.",
      quiz: { q: "Which type forces you to check the value before using it?", options: ["any", "unknown", "never", "void"], answer: 1, why: "unknown is type-safe: you must narrow it (typeof, instanceof, checks) before calling methods on it. any skips all checks." },
      interview: [
        ["What is type inference?", "TypeScript works out a variable's type from the value assigned or a function's return type from its return statements, so you don't need to write every annotation."],
        ["What is the difference between any and unknown?", "Both accept any value. any disables type checking completely; unknown requires narrowing before you can use the value, so it keeps type safety."]
      ],
      further: [["Everyday types", TS + "2/everyday-types.html"]]
    },
    {
      slug: "interfaces-types",
      title: "Interfaces, type aliases & objects",
      summary: "Describing object shapes, optional and readonly properties, and interface vs type.",
      body: `<p>An <strong>interface</strong> or a <strong>type alias</strong> describes the shape of an object — which properties it has and their types.</p>
<ul>
<li><code>?</code> marks an optional property: <code>remote?: boolean</code>.</li>
<li><code>readonly</code> stops a property being changed after creation.</li>
<li>Interfaces can <code>extends</code> other interfaces; type aliases combine with <code>&amp;</code> (intersection).</li>
</ul>
<p><strong>interface vs type:</strong> both describe objects. Interfaces can be extended and merged; type aliases can also describe unions, tuples and primitives. Many teams use interfaces for objects and types for everything else — the important thing is to be consistent.</p>`,
      example: `interface Job {
  readonly id: number;
  title: string;
  city: string;
  salaryLpa?: number;          // optional
}

interface RemoteJob extends Job {
  timezone: string;
}

const job: Job = { id: 1, title: "Frontend Developer", city: "Kochi" };
job.title = "Senior Frontend Developer";  // OK
job.id = 2;                                // error

const remote: RemoteJob = { id: 3, title: "QA", city: "Remote", timezone: "IST" };
console.log(job.title, "|", remote.timezone);`,
      output: `error TS2540: Cannot assign to 'id' because it is a read-only property.

(after removing that line)
Senior Frontend Developer | IST`,
      points: ["Interfaces and type aliases describe object shapes.", "? = optional, readonly = can't be reassigned.", "Interfaces extend; types combine with &.", "Pick one convention and use it consistently."],
      practice: "Create an interface Candidate with name, email, skills (string array) and an optional portfolioUrl, then write a function that returns a one-line summary of a candidate.",
      quiz: { q: "What does salaryLpa?: number mean?", options: ["salaryLpa must be a number", "salaryLpa may be missing; if present it's a number", "salaryLpa is read-only", "salaryLpa can be any type"], answer: 1, why: "The ? makes the property optional, so its type is effectively number | undefined." },
      interview: [
        ["What is the difference between an interface and a type alias?", "Both describe object shapes. Interfaces support extends and declaration merging; type aliases can also name unions, tuples and primitives and combine with intersections. For plain objects they're largely interchangeable."],
        ["What does readonly do?", "It prevents reassigning a property after the object is created, at compile time. It doesn't freeze the object at runtime."]
      ],
      further: [["Object types", TS + "2/objects.html"]]
    },
    {
      slug: "unions-narrowing",
      title: "Union types & narrowing",
      summary: "Values that can be one of several types, literal types and narrowing with checks.",
      body: `<p>A <strong>union type</strong> means “one of these”: <code>string | number</code>. <strong>Literal types</strong> restrict a value to exact options: <code>"pending" | "shortlisted" | "rejected"</code> — far safer than any string.</p>
<p>Before using a union, you <strong>narrow</strong> it so TypeScript knows which type you have:</p>
<ul>
<li><code>typeof x === "string"</code> for primitives.</li>
<li><code>"field" in obj</code> or <code>instanceof</code> for objects.</li>
<li>A shared <code>kind</code> or <code>status</code> property with <code>switch</code> — a <strong>discriminated union</strong>, the most useful pattern of all.</li>
</ul>`,
      example: `type Status = "applied" | "interview" | "offer" | "rejected";

type Update =
  | { status: "interview"; date: string }
  | { status: "offer"; salaryLpa: number }
  | { status: "applied" | "rejected" };

function describe(u: Update): string {
  switch (u.status) {
    case "interview":
      return "Interview on " + u.date;
    case "offer":
      return "Offer: " + u.salaryLpa + " LPA";
    default:
      return "Status: " + u.status;
  }
}

console.log(describe({ status: "offer", salaryLpa: 7.2 }));
console.log(describe({ status: "interview", date: "12 Nov" }));
let s: Status = "selected";   // error`,
      output: `error TS2322: Type '"selected"' is not assignable to type 'Status'.

(after fixing that line)
Offer: 7.2 LPA
Interview on 12 Nov`,
      points: ["Union = one of several types: A | B.", "Literal types limit values to exact options.", "Narrow with typeof, in, instanceof or a shared status field.", "Discriminated unions + switch make state handling safe."],
      practice: "Model an API result as a discriminated union of { ok: true; data: string[] } and { ok: false; error: string }, and write a function that prints either the data or the error.",
      quiz: { q: "Why use \"applied\" | \"offer\" instead of string for a status?", options: ["It runs faster", "Typos and invalid statuses are caught at compile time", "It uses less memory", "It's required by React"], answer: 1, why: "Literal unions only allow the listed values, so a typo like \"ofer\" is a compile error instead of a silent bug." },
      interview: [
        ["What is type narrowing?", "Refining a broad type (like string | number) to a specific one inside a code branch using checks such as typeof, instanceof, in, equality or a discriminant property. TypeScript then allows only operations valid for the narrowed type."],
        ["What is a discriminated union?", "A union of object types that share a literal property such as status or kind. Switching on that property lets TypeScript know exactly which shape you have in each case."]
      ],
      further: [["Narrowing", TS + "2/narrowing.html"]]
    },
    {
      slug: "functions-generics",
      title: "Typed functions & generics",
      summary: "Parameter and return types, optional parameters, function types and reusable generic code.",
      body: `<p>Type function parameters and, for public functions, the return type. Optional parameters use <code>?</code>; default values work as in JavaScript.</p>
<p><strong>Generics</strong> let one function or type work with many types while keeping them connected. <code>&lt;T&gt;</code> is a type parameter — a placeholder filled in when the function is used. Instead of returning <code>any</code>, a generic function returns exactly the type you passed in.</p>
<p>You already use generics: <code>Array&lt;string&gt;</code>, <code>Promise&lt;User&gt;</code> and React's <code>useState&lt;number&gt;</code>.</p>`,
      example: `function first<T>(items: T[]): T | undefined {
  return items[0];
}

const city = first(["Kochi", "Trivandrum"]); // type: string | undefined
const score = first([92, 85]);               // type: number | undefined

interface ApiResponse<T> {
  data: T;
  page: number;
}

type JobSummary = { id: number; title: string };

const res: ApiResponse<JobSummary[]> = {
  data: [{ id: 1, title: "React Developer" }],
  page: 1
};

console.log(city, score, res.data[0].title);`,
      output: `Kochi 92 React Developer`,
      points: ["Type parameters and return values of functions.", "Generics (<T>) make reusable code that keeps exact types.", "Array<T>, Promise<T> and useState<T> are generics.", "A generic interface such as ApiResponse<T> types API wrappers."],
      practice: "Write a generic function groupBy<T>(items: T[], key: keyof T) that returns an object grouping items by that key, and test it with a list of jobs grouped by city.",
      quiz: { q: "What is the main benefit of a generic function over one that uses any?", options: ["It runs faster", "It keeps the specific type, so the result is still checked", "It allows fewer arguments", "It avoids compilation"], answer: 1, why: "With generics the returned type matches the input type, so later code stays type-checked; any would throw that information away." },
      interview: [
        ["What are generics?", "Type parameters that let you write reusable functions, classes and types that work with many types while preserving the relationship between input and output types — for example Array<T> or Promise<T>."],
        ["What does keyof do?", "keyof T produces a union of T's property names as string literals, so a parameter typed as keyof T only accepts real property names."]
      ],
      further: [["Generics", TS + "2/generics.html"]]
    },
    {
      slug: "utility-types",
      title: "Utility types & strict mode",
      summary: "Partial, Pick, Omit, Record, Readonly and the tsconfig settings every project should use.",
      body: `<p>TypeScript ships <strong>utility types</strong> that build new types from existing ones, so you don't repeat yourself:</p>
<ul>
<li><code>Partial&lt;T&gt;</code> — all properties optional (good for update forms and PATCH bodies).</li>
<li><code>Pick&lt;T, "a" | "b"&gt;</code> / <code>Omit&lt;T, "a"&gt;</code> — keep or drop properties.</li>
<li><code>Record&lt;K, V&gt;</code> — an object with keys K and values V.</li>
<li><code>Readonly&lt;T&gt;</code> — every property read-only.</li>
<li><code>ReturnType&lt;typeof fn&gt;</code> — the type a function returns.</li>
</ul>
<h3>tsconfig.json</h3>
<p>Turn on <code>"strict": true</code>. It enables strict null checks, so TypeScript forces you to handle <code>null</code> and <code>undefined</code> — the cause of a huge share of real bugs.</p>`,
      example: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Omit<User, "password">;
type UserUpdate = Partial<Pick<User, "name" | "email">>;
type CountByCity = Record<string, number>;

const update: UserUpdate = { email: "anu@example.com" };   // name not needed
const counts: CountByCity = { Kochi: 42, Trivandrum: 18 };

function toPublic(u: User): PublicUser {
  const { password, ...rest } = u;
  return rest;
}

const user: User = { id: 1, name: "Anu", email: "a@x.com", password: "secret" };
console.log(toPublic(user), update, counts.Kochi);`,
      output: `{ id: 1, name: 'Anu', email: 'a@x.com' } { email: 'anu@example.com' } 42`,
      points: ["Partial, Pick, Omit, Record and Readonly build types from types.", "Use Omit to remove sensitive fields such as password.", "Turn on strict mode in tsconfig.json.", "Strict null checks catch undefined bugs early."],
      practice: "From an interface Job, create JobCard = Pick<Job, \"title\" | \"city\"> and JobDraft = Partial<Job>, and write functions that accept each.",
      quiz: { q: "Which utility type makes every property optional?", options: ["Required<T>", "Partial<T>", "Readonly<T>", "Record<K, V>"], answer: 1, why: "Partial<T> marks all properties of T as optional — handy for update payloads." },
      interview: [
        ["Name some TypeScript utility types and when you'd use them.", "Partial for update payloads, Pick and Omit for subsets (like removing password from a user), Record for dictionaries, Readonly for immutable data and ReturnType to reuse a function's return type."],
        ["What does strict mode enable?", "A group of stricter checks, including strictNullChecks (null and undefined must be handled), noImplicitAny (no silent any) and stricter function type checks. New projects should always enable it."]
      ],
      further: [["Utility types", TS + "utility-types.html"], ["tsconfig reference", "https://www.typescriptlang.org/tsconfig"]]
    },
    {
      slug: "typescript-react",
      title: "TypeScript with React",
      summary: "Typing props, state, events and API data in React components.",
      body: `<p>In a React + TypeScript project, files use the <code>.tsx</code> extension. The main things to type:</p>
<ul>
<li><strong>Props</strong> — an interface or type for each component's props.</li>
<li><strong>State</strong> — <code>useState&lt;Job[]&gt;([])</code> when the initial value doesn't show the full type.</li>
<li><strong>Events</strong> — for example <code>React.ChangeEvent&lt;HTMLInputElement&gt;</code>.</li>
<li><strong>API data</strong> — type what <code>fetch</code> returns, and validate it if it comes from outside.</li>
</ul>
<p>Create a project with <code>npm create vite@latest my-app -- --template react-ts</code>.</p>`,
      example: `// JobList.tsx
import { useState } from "react";

interface Job {
  id: number;
  title: string;
  city: string;
}

interface JobListProps {
  jobs: Job[];
  onSelect: (job: Job) => void;
}

export function JobList({ jobs, onSelect }: JobListProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const shown = jobs.filter((j) => j.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="Search jobs" />
      <ul>
        {shown.map((j) => (
          <li key={j.id} onClick={() => onSelect(j)}>{j.title} – {j.city}</li>
        ))}
      </ul>
    </div>
  );
}

// <JobList jobs={data} />   → error: property 'onSelect' is missing`,
      output: `error TS2741: Property 'onSelect' is missing in type '{ jobs: Job[]; }' but required in type 'JobListProps'.`,
      points: ["Use .tsx files for React components.", "Define a props interface for every component.", "Type state when the initial value isn't enough: useState<Job[]>([]).", "Type event handlers with React's event types."],
      practice: "Build a typed Counter component with props initial: number and step?: number (default 1), and buttons to add and subtract.",
      quiz: { q: "How do you type state that starts as an empty array of jobs?", options: ["useState([])", "useState<Job[]>([])", "useState<any>([])", "useState(Job[])"], answer: 1, why: "An empty array alone would be inferred as never[]; the generic argument tells TypeScript it will hold Job objects." },
      interview: [
        ["How do you type props in a React component?", "Define an interface or type for the props and annotate the component's parameter with it, for example function Card({ title }: CardProps). Optional props use ?, and callbacks are typed as function types."],
        ["Should you use React.FC?", "It's optional. Many teams now type the props parameter directly instead, which is simpler and handles children explicitly. Either works; be consistent across the codebase."]
      ],
      further: [["React: using TypeScript", "https://react.dev/learn/typescript"]]
    }
  ]
};
