/* React tutorial — original InfoparkDaily lessons. Examples load React 18 + Babel from cdnjs inside the sandboxed preview. */

const REACT_DOCS = "https://react.dev/";

const app = (jsx, css = "") => `<!doctype html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.development.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.development.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.26.4/babel.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; padding: 16px; }
${css}  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
${jsx}
  </script>
</body>
</html>`;

export const REACT_TRACK = {
  key: "react",
  name: "React",
  long: "React — build user interfaces from components",
  color: "#149eca",
  tagline: "Components, state and modern frontends.",
  level: "Intermediate",
  feature: "Live React preview",
  lessons: [
    {
      slug: "introduction",
      title: "React introduction",
      summary: "What React is, why teams use it, and rendering your first component.",
      body: `<p><strong>React</strong> is a JavaScript library for building user interfaces out of small, reusable pieces called <strong>components</strong>. Instead of changing the page by hand with DOM calls, you describe what the screen should look like for the current data, and React updates the page for you when the data changes.</p>
<p>It is one of the most requested frontend skills in Kerala job posts, usually alongside JavaScript, HTML/CSS and a tool such as Vite or Next.js.</p>
<h3>How the example works</h3>
<p>A real project is created with a build tool (for example <code>npm create vite@latest</code>). To keep this lesson self-contained, the example loads React from a CDN and uses Babel in the browser to understand JSX. <code>createRoot(...).render(...)</code> puts your component into the <code>#root</code> element.</p>`,
      example: app(`    function Welcome() {
      return <h1>Hello from React 👋</h1>;
    }

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<Welcome />);`),
      points: ["React builds UIs from components.", "You describe the UI; React updates the DOM.", "Real apps use a build tool such as Vite or Next.js."],
      practice: "Change Welcome so it shows your name in an <h1> and a <p> with the role you are preparing for.",
      quiz: { q: "What does React mainly help you build?", options: ["Databases", "User interfaces", "Operating systems", "Web servers"], answer: 1, why: "React is a library for building user interfaces from components." },
      interview: [
        ["What is the virtual DOM?", "An in-memory description of the UI. When state changes React builds a new description, compares it with the previous one and applies only the needed changes to the real DOM."],
        ["Library or framework?", "React calls itself a library: it focuses on rendering UI. Routing, data fetching and builds come from other tools or frameworks such as Next.js."]
      ],
      further: [["React: Quick start", REACT_DOCS + "learn"]]
    },
    {
      slug: "jsx",
      title: "JSX",
      summary: "Writing HTML-like markup in JavaScript, expressions in braces and JSX rules.",
      body: `<p><strong>JSX</strong> lets you write markup inside JavaScript. It looks like HTML but is turned into JavaScript function calls.</p>
<ul>
<li>Put any JavaScript expression inside <code>{ }</code>: <code>{user.name}</code>, <code>{price * 12}</code>.</li>
<li>A component must return <strong>one</strong> parent element — wrap siblings in a <code>&lt;div&gt;</code> or a fragment <code>&lt;&gt;…&lt;/&gt;</code>.</li>
<li>Use <code>className</code> instead of <code>class</code>, and <code>htmlFor</code> instead of <code>for</code>.</li>
<li>Close every tag, including <code>&lt;img /&gt;</code> and <code>&lt;br /&gt;</code>.</li>
<li>Inline styles take an object: <code>style={{ color: "red" }}</code>.</li>
</ul>`,
      example: app(`    const job = { title: "Frontend Developer", city: "Kochi", lpa: 7 };

    function JobCard() {
      return (
        <>
          <h2 className="title">{job.title}</h2>
          <p>{job.city} · ₹{job.lpa} LPA · ₹{Math.round(job.lpa * 100000 / 12)} per month</p>
          <p style={{ color: job.lpa >= 6 ? "green" : "gray" }}>
            {job.lpa >= 6 ? "Above average" : "Entry level"}
          </p>
        </>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<JobCard />);`, `    .title { color: #149eca; }\n`),
      points: ["{ } holds JavaScript expressions.", "Return one parent element (or a fragment).", "className, htmlFor, and self-closing tags."],
      practice: "Add a skills array to job and show it as a comma-separated line using {job.skills.join(\", \")}.",
      quiz: { q: "Which attribute sets a CSS class in JSX?", options: ["class", "className", "cssClass", "styleClass"], answer: 1, why: "class is a reserved word in JavaScript, so JSX uses className." },
      interview: [
        ["Can browsers run JSX directly?", "No. A compiler such as Babel, SWC or esbuild turns JSX into React.createElement (or the new JSX runtime) calls before the browser runs it."],
        ["Why can't you use if/else directly inside JSX braces?", "Braces accept expressions, not statements. Use a ternary, &&, or compute the value before the return."]
      ],
      further: [["React: Writing markup with JSX", REACT_DOCS + "learn/writing-markup-with-jsx"]]
    },
    {
      slug: "components-props",
      title: "Components & props",
      summary: "Splitting UI into components and passing data with props.",
      body: `<p>A component is a JavaScript function whose name starts with a capital letter and which returns JSX. Use components like custom tags: <code>&lt;JobCard /&gt;</code>.</p>
<p><strong>Props</strong> are the inputs to a component, passed like HTML attributes: <code>&lt;JobCard title="QA Engineer" lpa={4} /&gt;</code>. Inside, read them from the function's parameter — usually by destructuring: <code>function JobCard({ title, lpa })</code>.</p>
<ul>
<li>Props are <strong>read-only</strong>: a component must never change its own props.</li>
<li>Give defaults with destructuring: <code>{ city = "Remote" }</code>.</li>
<li><code>children</code> is a special prop containing whatever you put between the opening and closing tags.</li>
</ul>`,
      example: app(`    function Badge({ children }) {
      return <span className="badge">{children}</span>;
    }

    function JobCard({ title, company, city = "Remote", lpa }) {
      return (
        <div className="card">
          <h3>{title}</h3>
          <p>{company} · {city}</p>
          <Badge>₹{lpa} LPA</Badge>
        </div>
      );
    }

    function App() {
      return (
        <div>
          <JobCard title="QA Engineer" company="Backwater Labs" city="Kochi" lpa={4} />
          <JobCard title="React Developer" company="Coconut Cloud" lpa={8} />
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<App />);`, `    .card { border: 1px solid #ddd; border-radius: 12px; padding: 12px 16px; margin-bottom: 10px; }
    .badge { background: #e6f6fb; color: #0b6e8a; padding: 2px 8px; border-radius: 99px; font-weight: 600; }\n`),
      points: ["Component names start with a capital letter.", "Props pass data down and are read-only.", "children = content between the tags."],
      practice: "Add a remote prop to JobCard and show a “Remote OK” badge only when it is true.",
      quiz: { q: "Can a component change the props it receives?", options: ["Yes, freely", "No, props are read-only", "Only numbers", "Only in class components"], answer: 1, why: "Props belong to the parent; to change data over time a component uses state." },
      interview: [
        ["Props vs state?", "Props are inputs from the parent and are read-only. State is data a component owns and can update, which triggers a re-render."],
        ["What is prop drilling and how can you avoid it?", "Passing props through many layers that don't use them. Avoid it with composition (children), Context, or a state library."]
      ],
      further: [["React: Passing props to a component", REACT_DOCS + "learn/passing-props-to-a-component"]]
    },
    {
      slug: "state",
      title: "State with useState",
      summary: "Making components interactive with the useState hook.",
      body: `<p><strong>State</strong> is data that a component remembers between renders and that can change — a counter, the text in a search box, whether a menu is open.</p>
<pre><code>const [count, setCount] = React.useState(0);</code></pre>
<ul>
<li><code>useState(initial)</code> returns the current value and a setter function.</li>
<li>Calling the setter schedules a <strong>re-render</strong> with the new value.</li>
<li>Never change state directly (<code>count = 5</code> does nothing useful). Always call the setter.</li>
<li>When the new value depends on the old one, pass a function: <code>setCount(c =&gt; c + 1)</code>.</li>
<li>For arrays and objects, create a new copy: <code>setItems([...items, newItem])</code>.</li>
</ul>
<p>Hooks must be called at the top level of a component — not inside loops or if statements.</p>`,
      example: app(`    const { useState } = React;

    function SavedJobs() {
      const [saved, setSaved] = useState([]);
      const jobs = ["QA Engineer", "Data Analyst", "Flutter Developer"];

      function toggle(job) {
        setSaved(prev => prev.includes(job) ? prev.filter(j => j !== job) : [...prev, job]);
      }

      return (
        <div>
          <h3>Saved: {saved.length}</h3>
          {jobs.map(job => (
            <button key={job} onClick={() => toggle(job)} className={saved.includes(job) ? "on" : ""}>
              {saved.includes(job) ? "★" : "☆"} {job}
            </button>
          ))}
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<SavedJobs />);`, `    button { display: block; margin: 6px 0; padding: 8px 12px; border-radius: 8px; border: 1px solid #ccc; background: #fff; cursor: pointer; }
    button.on { background: #fff6d6; border-color: #e0b400; }\n`),
      points: ["useState returns [value, setValue].", "Setting state re-renders the component.", "Copy arrays/objects instead of mutating them."],
      practice: "Build a counter with + and − buttons that never goes below 0.",
      quiz: { q: "What happens when you call a state setter?", options: ["Nothing until reload", "React schedules a re-render", "The page reloads", "The component is deleted"], answer: 1, why: "Updating state tells React to render the component again with the new value." },
      interview: [
        ["Why use the functional form setCount(c => c + 1)?", "Updates are batched; the function form always receives the latest value, avoiding bugs when several updates happen in one event."],
        ["What are the Rules of Hooks?", "Call hooks only at the top level of components or custom hooks — never inside loops, conditions or nested functions — so React can match them between renders."]
      ],
      further: [["React: State — a component's memory", REACT_DOCS + "learn/state-a-components-memory"], ["React: useState", REACT_DOCS + "reference/react/useState"]]
    },
    {
      slug: "events-forms",
      title: "Events & forms",
      summary: "Handling clicks and input, and building controlled form fields.",
      body: `<p>React events use camelCase props: <code>onClick</code>, <code>onChange</code>, <code>onSubmit</code>. Pass a function, don't call it: <code>onClick={save}</code>, not <code>onClick={save()}</code>.</p>
<h3>Controlled inputs</h3>
<p>In a <strong>controlled</strong> input, React state is the single source of truth: the input's <code>value</code> comes from state, and <code>onChange</code> updates that state. This makes validation and resetting easy.</p>
<p>Call <code>e.preventDefault()</code> in <code>onSubmit</code> to stop the browser reloading the page.</p>`,
      example: app(`    const { useState } = React;

    function ApplyForm() {
      const [form, setForm] = useState({ name: "", email: "" });
      const [sent, setSent] = useState(false);
      const valid = form.name.trim().length > 1 && form.email.includes("@");

      function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
      }

      function submit(e) {
        e.preventDefault();
        setSent(true);
      }

      if (sent) return <p>✅ Thanks {form.name}, we'll email {form.email}.</p>;

      return (
        <form onSubmit={submit}>
          <label>Name <input name="name" value={form.name} onChange={update} /></label>
          <label>Email <input name="email" value={form.email} onChange={update} /></label>
          <button disabled={!valid}>Apply</button>
        </form>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<ApplyForm />);`, `    label { display: block; margin-bottom: 10px; }
    input { display: block; margin-top: 4px; padding: 8px; width: 240px; }
    button { padding: 8px 16px; }\n`),
      points: ["Pass handlers, don't call them.", "Controlled input: value + onChange from state.", "preventDefault in onSubmit."],
      practice: "Add a ‘Years of experience’ number field and disable Apply until it is 0 or more.",
      quiz: { q: "Which is correct for a click handler?", options: ["onclick=\"save()\"", "onClick={save()}", "onClick={save}", "click={save}"], answer: 2, why: "Pass the function itself; save() would run immediately during render." },
      interview: [
        ["Controlled vs uncontrolled inputs?", "Controlled inputs keep their value in React state. Uncontrolled inputs keep it in the DOM and you read it with a ref when needed."],
        ["Why does onClick={handle()} cause problems?", "It calls handle during render and passes its return value as the handler — often causing loops if it sets state."]
      ],
      further: [["React: Responding to events", REACT_DOCS + "learn/responding-to-events"]]
    },
    {
      slug: "lists-keys",
      title: "Lists, keys & conditional rendering",
      summary: "Rendering arrays with map, choosing keys, and showing things conditionally.",
      body: `<p>Render a list by mapping an array to JSX: <code>{jobs.map(job =&gt; &lt;li key={job.id}&gt;{job.title}&lt;/li&gt;)}</code>.</p>
<p>Each item needs a <strong>key</strong> that is unique among its siblings and stable over time — usually an id from your data. Keys let React keep track of which item is which when the list changes. Avoid using the array index when items can be added, removed or reordered.</p>
<h3>Conditional rendering</h3>
<ul>
<li><code>{cond ? &lt;A /&gt; : &lt;B /&gt;}</code> — choose between two things.</li>
<li><code>{cond &amp;&amp; &lt;A /&gt;}</code> — show something or nothing (careful: <code>0 &amp;&amp; …</code> renders 0).</li>
<li>Return early: <code>if (!jobs.length) return &lt;p&gt;No jobs&lt;/p&gt;;</code></li>
</ul>`,
      example: app(`    const { useState } = React;
    const JOBS = [
      { id: 1, title: "QA Engineer", city: "Kochi" },
      { id: 2, title: "React Developer", city: "Thiruvananthapuram" },
      { id: 3, title: "Data Analyst", city: "Kochi" },
      { id: 4, title: "Flutter Developer", city: "Kozhikode" }
    ];

    function JobList() {
      const [city, setCity] = useState("All");
      const shown = city === "All" ? JOBS : JOBS.filter(j => j.city === city);

      return (
        <div>
          <select value={city} onChange={e => setCity(e.target.value)}>
            {["All", "Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"].map(c => <option key={c}>{c}</option>)}
          </select>
          {shown.length === 0 ? (
            <p>No jobs in {city} yet.</p>
          ) : (
            <ul>{shown.map(job => <li key={job.id}>{job.title} — {job.city}</li>)}</ul>
          )}
          {city !== "All" && <button onClick={() => setCity("All")}>Clear filter</button>}
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<JobList />);`),
      points: ["map() turns data into elements.", "Keys: unique, stable ids — not indexes for changing lists.", "Ternary or && for conditional UI."],
      practice: "Add a search box that filters the list by title (case-insensitive) as well as by city.",
      quiz: { q: "What makes a good key?", options: ["Math.random()", "A stable unique id from the data", "The array index always", "The item's text in upper case"], answer: 1, why: "Keys must stay the same between renders; random values change every time and indexes shift when items move." },
      interview: [
        ["Why are keys needed in lists?", "They let React match items between renders so it can reuse, move or remove the right DOM nodes and keep each item's state."],
        ["What's the pitfall with {count && <Badge />}?", "If count is 0, React renders the 0. Use {count > 0 && <Badge />} or a ternary."]
      ],
      further: [["React: Rendering lists", REACT_DOCS + "learn/rendering-lists"], ["React: Conditional rendering", REACT_DOCS + "learn/conditional-rendering"]]
    },
    {
      slug: "effects",
      title: "Effects with useEffect",
      summary: "Running side effects — timers, data loading, subscriptions — and cleaning up.",
      body: `<p>Rendering should be pure: given the same props and state, return the same JSX. Work that reaches outside the component — fetching data, timers, subscriptions, changing the document title — belongs in an <strong>effect</strong>.</p>
<pre><code>React.useEffect(() =&gt; {
  // runs after render
  return () =&gt; { /* cleanup */ };
}, [dependencies]);</code></pre>
<ul>
<li><code>[]</code> — run once after the first render.</li>
<li><code>[city]</code> — run again whenever <code>city</code> changes.</li>
<li>Return a cleanup function to stop timers or ignore stale responses.</li>
</ul>
<p>In real apps, data loading is often handled by a framework or a library (React Query, SWR, Next.js), but understanding effects is essential for interviews. The example simulates a slow API with <code>setTimeout</code>.</p>`,
      example: app(`    const { useState, useEffect } = React;

    // Pretend API: resolves after 800 ms
    function fakeFetchJobs(city) {
      const all = { Kochi: ["QA Engineer", "Data Analyst"], Kozhikode: ["Flutter Developer"] };
      return new Promise(resolve => setTimeout(() => resolve(all[city] || []), 800));
    }

    function Jobs() {
      const [city, setCity] = useState("Kochi");
      const [jobs, setJobs] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        let ignore = false;
        setLoading(true);
        fakeFetchJobs(city).then(data => {
          if (!ignore) { setJobs(data); setLoading(false); }
        });
        document.title = "Jobs in " + city;
        return () => { ignore = true; };   // cleanup: ignore late responses
      }, [city]);

      return (
        <div>
          <button onClick={() => setCity("Kochi")}>Kochi</button>
          <button onClick={() => setCity("Kozhikode")}>Kozhikode</button>
          {loading ? <p>Loading…</p> : <ul>{jobs.map(j => <li key={j}>{j}</li>)}</ul>}
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<Jobs />);`, `    button { margin-right: 8px; padding: 6px 12px; }\n`),
      points: ["Effects are for side effects, not for computing values.", "The dependency array controls when it re-runs.", "Clean up timers, subscriptions and stale requests."],
      practice: "Write a Clock component that shows the current time and updates every second, clearing the interval on cleanup.",
      quiz: { q: "When does an effect with an empty dependency array run?", options: ["Every render", "Once after the first render", "Never", "Only on unmount"], answer: 1, why: "[] means no dependencies change, so it runs after the first render (its cleanup runs on unmount)." },
      interview: [
        ["Why might an effect run twice in development?", "React's Strict Mode mounts, unmounts and remounts components in development to expose effects that are missing a cleanup."],
        ["What happens if you forget a dependency?", "The effect captures stale values and won't re-run when that value changes. The eslint-plugin-react-hooks rule helps catch this."]
      ],
      further: [["React: Synchronizing with effects", REACT_DOCS + "learn/synchronizing-with-effects"], ["React: You might not need an effect", REACT_DOCS + "learn/you-might-not-need-an-effect"]]
    }
  ]
};
