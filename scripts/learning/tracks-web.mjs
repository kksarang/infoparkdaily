/* Learning tutorials — HTML, CSS and JavaScript tracks.
   Each lesson: slug, title, summary, body (HTML), example (runnable code shown in the Try-it editor),
   points (key takeaways) and quiz (one question, answer = index into options). */

const doc = (body, head = "") =>
  `<!doctype html>\n<html>\n<head>\n${head}</head>\n<body>\n${body}\n</body>\n</html>`;

export const HTML_TRACK = {
  key: "html",
  name: "HTML",
  long: "HTML — HyperText Markup Language",
  color: "#e44d26",
  tagline: "The structure of every web page.",
  level: "Beginner",
  lessons: [
    {
      slug: "introduction",
      title: "HTML introduction",
      summary: "What HTML is, how a page is built and what a browser does with it.",
      body: `<p><strong>HTML</strong> describes the <em>structure</em> of a web page: headings, paragraphs, links, images, forms. A browser reads the HTML and draws the page. CSS adds the look, JavaScript adds behaviour.</p>
<h3>A complete HTML document</h3>
<ul>
<li><code>&lt;!doctype html&gt;</code> tells the browser this is modern HTML.</li>
<li><code>&lt;html&gt;</code> wraps the whole page; <code>lang="en"</code> sets the language.</li>
<li><code>&lt;head&gt;</code> holds information <em>about</em> the page — title, character set, links to CSS.</li>
<li><code>&lt;body&gt;</code> holds everything the visitor sees.</li>
</ul>`,
      example: doc(`  <h1>My first web page</h1>\n  <p>Hello! I am learning HTML.</p>`, `  <meta charset="utf-8">\n  <title>My first page</title>\n`),
      points: ["HTML = structure, CSS = style, JavaScript = behaviour.", "Visible content goes inside <body>.", "The <title> shows in the browser tab and in search results."],
      quiz: { q: "Which part of an HTML page holds the content the visitor sees?", options: ["<head>", "<body>", "<title>", "<meta>"], answer: 1, why: "Everything inside <body> is rendered on the page; <head> holds information about the page." }
    },
    {
      slug: "elements",
      title: "Elements, tags & attributes",
      summary: "Opening and closing tags, nesting and attributes.",
      body: `<p>An <strong>element</strong> is usually an opening tag, some content and a closing tag: <code>&lt;p&gt;Text&lt;/p&gt;</code>. Some elements are <em>empty</em> and have no closing tag, like <code>&lt;br&gt;</code> and <code>&lt;img&gt;</code>.</p>
<h3>Attributes</h3>
<p>Attributes add extra information inside the opening tag, written as <code>name="value"</code>. Common ones: <code>id</code>, <code>class</code>, <code>href</code>, <code>src</code>, <code>alt</code>, <code>title</code>.</p>
<h3>Nesting</h3>
<p>Elements can contain other elements. Close them in the reverse order you opened them: <code>&lt;p&gt;&lt;strong&gt;Hi&lt;/strong&gt;&lt;/p&gt;</code>.</p>`,
      example: doc(`  <p title="I am a tooltip">Hover over this paragraph.</p>\n  <p>This is <strong>bold</strong> and this is <em>emphasised</em>.</p>\n  <p>Line one<br>Line two</p>`),
      points: ["Most elements need a closing tag.", "Attributes live in the opening tag.", "Close nested tags in reverse order."],
      quiz: { q: "Where do attributes go?", options: ["In the closing tag", "In the opening tag", "Between the tags", "In the <head> only"], answer: 1, why: "Attributes are always written inside the opening tag, e.g. <a href=\"…\">." }
    },
    {
      slug: "headings-paragraphs",
      title: "Headings & paragraphs",
      summary: "h1–h6, paragraphs, line breaks and text formatting.",
      body: `<p>HTML has six heading levels, <code>&lt;h1&gt;</code> (most important) to <code>&lt;h6&gt;</code>. Use one <code>&lt;h1&gt;</code> per page for the main title and don't skip levels — screen readers and search engines use headings as an outline.</p>
<p>Paragraphs use <code>&lt;p&gt;</code>. The browser ignores extra spaces and line breaks in your code; use <code>&lt;br&gt;</code> for a forced line break and <code>&lt;hr&gt;</code> for a thematic break.</p>
<h3>Formatting text</h3>
<p><code>&lt;strong&gt;</code> (important), <code>&lt;em&gt;</code> (emphasis), <code>&lt;mark&gt;</code> (highlight), <code>&lt;code&gt;</code> (code), <code>&lt;small&gt;</code>, <code>&lt;sub&gt;</code> and <code>&lt;sup&gt;</code>.</p>`,
      example: doc(`  <h1>Kerala IT careers</h1>\n  <h2>Popular roles</h2>\n  <p>Developers, testers and <mark>data analysts</mark> are in demand.</p>\n  <hr>\n  <h2>Formula</h2>\n  <p>E = mc<sup>2</sup> and H<sub>2</sub>O</p>`),
      points: ["One <h1> per page.", "Don't pick headings for their size — style them with CSS.", "Whitespace in code collapses to one space."],
      quiz: { q: "Which heading is the most important?", options: ["<h6>", "<head>", "<h1>", "<header>"], answer: 2, why: "<h1> is the top-level heading; <h6> is the least important." }
    },
    {
      slug: "links",
      title: "Links",
      summary: "The <a> element, absolute vs relative URLs and opening in a new tab.",
      body: `<p>Links are made with the anchor element: <code>&lt;a href="URL"&gt;text&lt;/a&gt;</code>.</p>
<ul>
<li><strong>Absolute URL</strong> — a full address: <code>https://example.com/page</code>.</li>
<li><strong>Relative URL</strong> — a path on the same site: <code>/jobs/</code> or <code>about.html</code>.</li>
<li><strong>Page section</strong> — <code>href="#contact"</code> jumps to the element with <code>id="contact"</code>.</li>
<li><strong>Email / phone</strong> — <code>mailto:</code> and <code>tel:</code>.</li>
</ul>
<p>Add <code>target="_blank" rel="noopener"</code> to open a link in a new tab safely. Write link text that makes sense on its own — avoid “click here”.</p>`,
      example: doc(`  <p><a href="https://developer.mozilla.org/" target="_blank" rel="noopener">MDN Web Docs</a> (new tab)</p>\n  <p><a href="#end">Jump to the end</a></p>\n  <p style="margin-top:600px" id="end">You reached the end.</p>\n  <p><a href="mailto:hello@example.com">Email us</a></p>`),
      points: ["href holds the destination.", "#id links jump within a page.", "Use rel=\"noopener\" with target=\"_blank\"."],
      quiz: { q: "Which href jumps to an element with id=\"faq\" on the same page?", options: ["href=\"faq\"", "href=\"#faq\"", "href=\".faq\"", "href=\"/faq.html\""], answer: 1, why: "A # followed by an id links to that element on the current page." }
    },
    {
      slug: "images",
      title: "Images",
      summary: "The <img> element, alt text, sizes and responsive images.",
      body: `<p>Images use the empty element <code>&lt;img src="…" alt="…"&gt;</code>.</p>
<ul>
<li><code>src</code> — the image file.</li>
<li><code>alt</code> — text read by screen readers and shown if the image fails. Describe what matters; use <code>alt=""</code> for purely decorative images.</li>
<li><code>width</code> / <code>height</code> — reserve space so the page doesn't jump while loading.</li>
<li><code>loading="lazy"</code> — load images lower down the page only when needed.</li>
</ul>
<p>Use <code>&lt;figure&gt;</code> and <code>&lt;figcaption&gt;</code> to give an image a caption.</p>`,
      example: doc(`  <figure>\n    <img src="https://picsum.photos/seed/kochi/480/280" width="480" height="280" alt="Random sample photo">\n    <figcaption>A sample photo with a caption.</figcaption>\n  </figure>\n  <img src="missing.jpg" alt="This text shows because the image is missing">`, `  <style>img{max-width:100%;height:auto}</style>\n`),
      points: ["Always write useful alt text.", "Set width and height to avoid layout shift.", "max-width:100% keeps images inside small screens."],
      quiz: { q: "What is the alt attribute for?", options: ["Image file size", "A tooltip only", "Text alternative for screen readers and failed loads", "Choosing the image format"], answer: 2, why: "alt is the text alternative — essential for accessibility and shown when the image cannot load." }
    },
    {
      slug: "lists",
      title: "Lists",
      summary: "Unordered, ordered and description lists.",
      body: `<p><code>&lt;ul&gt;</code> makes a bulleted list, <code>&lt;ol&gt;</code> a numbered list. Each item is an <code>&lt;li&gt;</code>. Lists can be nested by putting a new list inside an <code>&lt;li&gt;</code>.</p>
<p>Ordered lists accept <code>start="5"</code>, <code>reversed</code> and <code>type="a"</code> / <code>"I"</code>.</p>
<p>A description list (<code>&lt;dl&gt;</code>) pairs terms (<code>&lt;dt&gt;</code>) with descriptions (<code>&lt;dd&gt;</code>) — useful for glossaries and key/value details.</p>`,
      example: doc(`  <h3>Skills</h3>\n  <ul>\n    <li>HTML</li>\n    <li>CSS\n      <ul><li>Flexbox</li><li>Grid</li></ul>\n    </li>\n  </ul>\n  <h3>Interview steps</h3>\n  <ol>\n    <li>Aptitude test</li>\n    <li>Technical round</li>\n    <li>HR round</li>\n  </ol>\n  <dl>\n    <dt>CTC</dt><dd>Cost to company — total yearly pay.</dd>\n  </dl>`),
      points: ["<ul> bullets, <ol> numbers, <li> items.", "Nest a list inside an <li>.", "<dl> for term/description pairs."],
      quiz: { q: "Which element creates a numbered list?", options: ["<ul>", "<ol>", "<li>", "<dl>"], answer: 1, why: "<ol> is an ordered (numbered) list." }
    },
    {
      slug: "tables",
      title: "Tables",
      summary: "Rows, cells, headers and captions for tabular data.",
      body: `<p>Use tables for <em>data</em>, not for page layout.</p>
<ul>
<li><code>&lt;table&gt;</code> wraps the table, <code>&lt;tr&gt;</code> is a row.</li>
<li><code>&lt;th&gt;</code> is a header cell, <code>&lt;td&gt;</code> a data cell.</li>
<li><code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code> and <code>&lt;tfoot&gt;</code> group rows.</li>
<li><code>&lt;caption&gt;</code> titles the table; <code>colspan</code> / <code>rowspan</code> merge cells.</li>
</ul>`,
      example: doc(`  <table>\n    <caption>Sample salary ranges (illustrative)</caption>\n    <thead><tr><th>Role</th><th>Experience</th><th>Range</th></tr></thead>\n    <tbody>\n      <tr><td>QA Engineer</td><td>0–2 yrs</td><td>₹3–5 LPA</td></tr>\n      <tr><td>Frontend Dev</td><td>2–4 yrs</td><td>₹6–10 LPA</td></tr>\n      <tr><td colspan="3">Figures are examples for learning only.</td></tr>\n    </tbody>\n  </table>`, `  <style>table{border-collapse:collapse;font-family:system-ui}th,td{border:1px solid #ccc;padding:6px 10px}th{background:#f2f2ec}</style>\n`),
      points: ["Tables are for data.", "<th> for headers helps accessibility.", "colspan/rowspan merge cells."],
      quiz: { q: "Which element is a header cell?", options: ["<td>", "<thead>", "<th>", "<tr>"], answer: 2, why: "<th> marks a header cell; <thead> is the group of header rows." }
    },
    {
      slug: "forms",
      title: "Forms",
      summary: "Inputs, labels, buttons and built-in validation.",
      body: `<p>Forms collect input. Every input should have a <code>&lt;label&gt;</code> — click the label and the input gets focus, and screen readers announce it.</p>
<ul>
<li>Input types: <code>text</code>, <code>email</code>, <code>tel</code>, <code>number</code>, <code>date</code>, <code>password</code>, <code>checkbox</code>, <code>radio</code>, <code>file</code>.</li>
<li>Other controls: <code>&lt;select&gt;</code>, <code>&lt;textarea&gt;</code>, <code>&lt;button&gt;</code>.</li>
<li>Validation attributes: <code>required</code>, <code>minlength</code>, <code>maxlength</code>, <code>min</code>, <code>max</code>, <code>pattern</code>.</li>
<li><code>name</code> is the key sent to the server; <code>action</code> and <code>method</code> on the form say where and how.</li>
</ul>`,
      example: doc(`  <form onsubmit="event.preventDefault(); alert('Form is valid!')">\n    <p><label for="name">Name</label><br><input id="name" name="name" required></p>\n    <p><label for="email">Email</label><br><input id="email" name="email" type="email" required></p>\n    <p><label for="role">Role</label><br>\n      <select id="role" name="role"><option>Developer</option><option>Tester</option></select></p>\n    <p><label><input type="checkbox" name="fresher"> I am a fresher</label></p>\n    <button>Apply</button>\n  </form>`),
      points: ["Pair every input with a label.", "Pick the right type — email, tel, date…", "required and pattern give free validation."],
      quiz: { q: "Which attribute stops a form from submitting while a field is empty?", options: ["name", "required", "value", "placeholder"], answer: 1, why: "required makes the browser block submission until the field has a value." }
    },
    {
      slug: "semantic",
      title: "Semantic HTML",
      summary: "header, nav, main, section, article, footer — and why they matter.",
      body: `<p>Semantic elements say what content <em>is</em>, not how it looks. They help screen readers, search engines and other developers.</p>
<ul>
<li><code>&lt;header&gt;</code> — intro or top bar; <code>&lt;nav&gt;</code> — main navigation links.</li>
<li><code>&lt;main&gt;</code> — the main content (one per page).</li>
<li><code>&lt;section&gt;</code> — a themed group with a heading; <code>&lt;article&gt;</code> — content that stands alone (a post, a job card).</li>
<li><code>&lt;aside&gt;</code> — side content; <code>&lt;footer&gt;</code> — closing info.</li>
</ul>
<p>Use <code>&lt;div&gt;</code> and <code>&lt;span&gt;</code> only when no semantic element fits.</p>`,
      example: doc(`  <header><h1>Job board</h1>\n    <nav><a href="#">Jobs</a> · <a href="#">Companies</a></nav>\n  </header>\n  <main>\n    <article>\n      <h2>Junior Web Developer</h2>\n      <p>Kochi · Full time</p>\n    </article>\n  </main>\n  <footer><small>© 2026 Example</small></footer>`),
      points: ["Semantic tags describe meaning.", "One <main> per page.", "<article> for self-contained items."],
      quiz: { q: "Which element should wrap the page's primary content?", options: ["<section>", "<div>", "<main>", "<body>"], answer: 2, why: "<main> marks the dominant content of the page and should appear once." }
    }
  ]
};

export const CSS_TRACK = {
  key: "css",
  name: "CSS",
  long: "CSS — Cascading Style Sheets",
  color: "#2965f1",
  tagline: "Colours, layout and responsive design.",
  level: "Beginner",
  lessons: [
    {
      slug: "introduction",
      title: "CSS introduction",
      summary: "What CSS does, the rule syntax and three ways to add it.",
      body: `<p>CSS controls how HTML looks. A <strong>rule</strong> has a selector and declarations:</p>
<pre><code>p {\n  color: navy;\n  font-size: 18px;\n}</code></pre>
<p>Add CSS three ways: a linked file (<code>&lt;link rel="stylesheet" href="style.css"&gt;</code>, best for real sites), a <code>&lt;style&gt;</code> block in the head, or an inline <code>style=""</code> attribute (avoid for anything reusable).</p>
<h3>The cascade</h3>
<p>When rules conflict, the more specific selector wins; if specificity is equal, the later rule wins.</p>`,
      example: doc(`  <h1>Styled heading</h1>\n  <p>This paragraph is navy.</p>\n  <p style="color: crimson">Inline style wins here.</p>`, `  <style>\n    h1 { color: #12151b; font-family: system-ui; }\n    p { color: navy; font-size: 18px; }\n  </style>\n`),
      points: ["selector { property: value; }", "Prefer external stylesheets.", "Specificity, then order, decides conflicts."],
      quiz: { q: "Which is the correct CSS syntax?", options: ["p = color: red", "p { color: red; }", "<p color=red>", "p: {color red}"], answer: 1, why: "A rule is selector { property: value; }." }
    },
    {
      slug: "selectors",
      title: "Selectors",
      summary: "Element, class, id, descendant and pseudo-class selectors.",
      body: `<ul>
<li><code>p</code> — every &lt;p&gt;.</li>
<li><code>.card</code> — elements with <code>class="card"</code> (reusable).</li>
<li><code>#top</code> — the element with <code>id="top"</code> (unique).</li>
<li><code>nav a</code> — links inside nav (descendant).</li>
<li><code>a:hover</code>, <code>input:focus</code>, <code>li:first-child</code> — pseudo-classes for state and position.</li>
<li><code>h1, h2</code> — group selectors with a comma.</li>
</ul>
<p>Prefer classes for styling. They are reusable and keep specificity low.</p>`,
      example: doc(`  <nav><a href="#">Home</a> <a href="#">Jobs</a></nav>\n  <div class="card">Card one</div>\n  <div class="card featured">Featured card</div>\n  <p id="note">Unique note</p>`, `  <style>\n    body { font-family: system-ui; }\n    nav a { color: #12151b; margin-right: 8px; }\n    nav a:hover { color: #e44d26; }\n    .card { padding: 12px; border: 1px solid #ddd; margin: 8px 0; border-radius: 8px; }\n    .card.featured { background: #fff6d6; }\n    #note { font-style: italic; }\n  </style>\n`),
      points: [". for class, # for id.", "Space = descendant.", "Pseudo-classes target states like :hover."],
      quiz: { q: "Which selector targets elements with class=\"btn\"?", options: ["#btn", "btn", ".btn", "*btn"], answer: 2, why: "A dot selects by class; # selects by id." }
    },
    {
      slug: "colors-units",
      title: "Colours, fonts & units",
      summary: "Colour formats, fonts and px / rem / % / vw units.",
      body: `<p><strong>Colours</strong>: names (<code>tomato</code>), hex (<code>#ffc107</code>), <code>rgb(255 193 7)</code> and <code>hsl(45 100% 51%)</code>. Make sure text has enough contrast against its background.</p>
<p><strong>Fonts</strong>: <code>font-family</code> with fallbacks (<code>system-ui, sans-serif</code>), <code>font-size</code>, <code>font-weight</code>, <code>line-height</code>.</p>
<p><strong>Units</strong>: <code>px</code> is fixed; <code>rem</code> is relative to the root font size (good for type and spacing); <code>%</code> is relative to the parent; <code>vw</code>/<code>vh</code> are relative to the viewport.</p>`,
      example: doc(`  <h1>Units demo</h1>\n  <p class="px">16px text</p>\n  <p class="rem">1.25rem text</p>\n  <div class="bar">50% wide bar</div>`, `  <style>\n    body { font-family: system-ui, sans-serif; line-height: 1.5; }\n    h1 { color: hsl(220 30% 15%); }\n    .px { font-size: 16px; }\n    .rem { font-size: 1.25rem; color: #2965f1; }\n    .bar { width: 50%; background: #ffc107; padding: .5rem; }\n  </style>\n`),
      points: ["Use rem for scalable sizing.", "Always add font fallbacks.", "Check colour contrast."],
      quiz: { q: "rem units are relative to…", options: ["The parent element", "The root (html) font size", "The viewport width", "Nothing — they are fixed"], answer: 1, why: "1rem equals the font size of the root html element (usually 16px)." }
    },
    {
      slug: "box-model",
      title: "The box model",
      summary: "Content, padding, border, margin and box-sizing.",
      body: `<p>Every element is a box: <strong>content</strong> → <strong>padding</strong> (inside space) → <strong>border</strong> → <strong>margin</strong> (outside space).</p>
<p>By default <code>width</code> sets only the content width, so padding and border make the box bigger. Most sites add:</p>
<pre><code>*, *::before, *::after { box-sizing: border-box; }</code></pre>
<p>Now <code>width</code> includes padding and border, which makes layouts predictable.</p>`,
      example: doc(`  <div class="box content">content-box: 200px + padding + border</div>\n  <div class="box border">border-box: exactly 200px</div>`, `  <style>\n    body { font-family: system-ui; }\n    .box { width: 200px; padding: 20px; border: 5px solid #12151b; margin: 12px 0; background: #fff6d6; }\n    .content { box-sizing: content-box; }\n    .border { box-sizing: border-box; }\n  </style>\n`),
      points: ["Padding is inside the border, margin outside.", "box-sizing: border-box makes width include padding.", "Vertical margins between blocks can collapse."],
      quiz: { q: "Which property adds space inside an element's border?", options: ["margin", "padding", "gap", "outline"], answer: 1, why: "Padding is the space between content and border; margin is outside the border." }
    },
    {
      slug: "flexbox",
      title: "Flexbox",
      summary: "One-dimensional layout: rows, columns, alignment and gaps.",
      body: `<p>Set <code>display: flex</code> on a container and its children line up in a row.</p>
<ul>
<li><code>flex-direction</code>: <code>row</code> or <code>column</code>.</li>
<li><code>justify-content</code>: alignment along the main axis (<code>space-between</code>, <code>center</code>…).</li>
<li><code>align-items</code>: alignment on the cross axis.</li>
<li><code>gap</code>: space between items. <code>flex-wrap: wrap</code> lets items move to the next line.</li>
<li>On children: <code>flex: 1</code> to grow and share space.</li>
</ul>`,
      example: doc(`  <header class="bar">\n    <strong>Logo</strong>\n    <nav class="links"><a href="#">Jobs</a><a href="#">Learn</a><a href="#">Sign in</a></nav>\n  </header>\n  <div class="cards"><div>One</div><div>Two</div><div>Three</div></div>`, `  <style>\n    body { font-family: system-ui; }\n    .bar { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #12151b; color: #fff; }\n    .links { display: flex; gap: 16px; }\n    .links a { color: #ffc107; }\n    .cards { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 12px; }\n    .cards div { flex: 1 1 120px; padding: 24px; background: #f2f2ec; border-radius: 8px; }\n  </style>\n`),
      points: ["display:flex on the parent.", "justify-content = main axis, align-items = cross axis.", "gap beats margins for spacing."],
      quiz: { q: "Which property spaces flex items along the main axis?", options: ["align-items", "justify-content", "flex-wrap", "order"], answer: 1, why: "justify-content distributes items along the main axis (horizontal in a row)." }
    },
    {
      slug: "grid",
      title: "CSS Grid",
      summary: "Two-dimensional layout with rows and columns.",
      body: `<p><code>display: grid</code> lays children out in rows <em>and</em> columns.</p>
<ul>
<li><code>grid-template-columns: 1fr 2fr</code> — two columns, the second twice as wide.</li>
<li><code>repeat(3, 1fr)</code> — three equal columns.</li>
<li><code>repeat(auto-fit, minmax(160px, 1fr))</code> — as many columns as fit: responsive without media queries.</li>
<li><code>gap</code> — space between cells; <code>grid-column: span 2</code> — make an item wider.</li>
</ul>
<p>Use Flexbox for a single row or column, Grid for full page or card layouts.</p>`,
      example: doc(`  <div class="grid">\n    <div class="wide">Wide item</div><div>2</div><div>3</div><div>4</div><div>5</div>\n  </div>`, `  <style>\n    body { font-family: system-ui; }\n    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; }\n    .grid div { padding: 24px; background: #e8efff; border-radius: 8px; text-align: center; }\n    .wide { grid-column: span 2; background: #ffc107 !important; }\n  </style>\n`),
      points: ["fr = a fraction of free space.", "auto-fit + minmax = responsive cards.", "Grid for 2D, Flexbox for 1D."],
      quiz: { q: "What does repeat(3, 1fr) create?", options: ["3 rows of 1px", "3 equal columns", "1 column, 3 times wider", "3px gaps"], answer: 1, why: "It defines three columns that each take one equal fraction of the space." }
    },
    {
      slug: "responsive",
      title: "Responsive design",
      summary: "The viewport meta tag, media queries and mobile-first CSS.",
      body: `<p>Responsive pages adapt to any screen. Three essentials:</p>
<ol>
<li>The viewport tag: <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code>.</li>
<li>Flexible layouts — %, fr, flex-wrap, <code>max-width: 100%</code> on images.</li>
<li>Media queries to change styles at breakpoints.</li>
</ol>
<pre><code>/* mobile first: base styles for phones */\n.cols { display: grid; gap: 12px; }\n@media (min-width: 700px) {\n  .cols { grid-template-columns: 1fr 1fr; }\n}</code></pre>
<p>Resize the preview below to see the layout switch.</p>`,
      example: doc(`  <div class="cols"><div>Column A</div><div>Column B</div></div>\n  <p class="hint">Narrow: stacked · Wide: side by side</p>`, `  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <style>\n    body { font-family: system-ui; }\n    .cols { display: grid; gap: 12px; }\n    .cols div { padding: 24px; background: #e5f4eb; border-radius: 8px; }\n    @media (min-width: 500px) { .cols { grid-template-columns: 1fr 1fr; } .hint { color: #1d7a4c; } }\n  </style>\n`),
      points: ["Always include the viewport meta tag.", "Write mobile styles first, then add min-width queries.", "Test at phone width."],
      quiz: { q: "In mobile-first CSS, media queries usually use…", options: ["max-width", "min-width", "orientation only", "device-pixel-ratio"], answer: 1, why: "Mobile-first writes phone styles as the base and adds larger-screen styles with min-width queries." }
    }
  ]
};

const js = (code, html = "") => doc(`${html}  <script>\n${code}\n  </script>`);

export const JS_TRACK = {
  key: "javascript",
  name: "JavaScript",
  long: "JavaScript — the language of the web",
  color: "#d4a900",
  tagline: "Make pages interactive.",
  level: "Beginner",
  lessons: [
    {
      slug: "introduction",
      title: "JavaScript introduction",
      summary: "What JavaScript does, where to write it and console.log.",
      body: `<p>JavaScript (JS) runs in the browser and makes pages interactive: reacting to clicks, validating forms, loading data. It also runs on servers through Node.js.</p>
<p>Add JS with a <code>&lt;script&gt;</code> tag — usually a file: <code>&lt;script src="app.js" defer&gt;&lt;/script&gt;</code>. <code>defer</code> runs it after the HTML has loaded.</p>
<p><code>console.log()</code> prints values to the console — your main debugging tool. In the Try-it editor, console output appears under the preview.</p>`,
      example: js(`    console.log("Hello from JavaScript!");\n    console.log(2 + 3);\n    document.querySelector("h1").textContent = "Changed by JS";`, `  <h1>Original heading</h1>\n`),
      points: ["JS adds behaviour to HTML.", "Use defer when loading scripts in <head>.", "console.log is for debugging."],
      quiz: { q: "What does console.log(2 + 3) print?", options: ["23", "5", "2 + 3", "undefined"], answer: 1, why: "2 and 3 are numbers, so + adds them: 5." }
    },
    {
      slug: "variables",
      title: "Variables & data types",
      summary: "let, const, strings, numbers, booleans, null and undefined.",
      body: `<p>Variables store values. Use <code>const</code> by default and <code>let</code> when the value will change. Avoid the old <code>var</code>.</p>
<ul>
<li><strong>String</strong> — text: <code>"Kochi"</code>, or a template literal: <code>\`Hi \${name}\`</code>.</li>
<li><strong>Number</strong> — <code>42</code>, <code>3.14</code>.</li>
<li><strong>Boolean</strong> — <code>true</code> / <code>false</code>.</li>
<li><strong>undefined</strong> — declared but not set; <strong>null</strong> — deliberately empty.</li>
<li>Objects and arrays — covered later.</li>
</ul>
<p><code>typeof</code> tells you a value's type.</p>`,
      example: js(`    const city = "Kochi";\n    let experience = 2;\n    experience = experience + 1;\n    const isFresher = experience === 0;\n    console.log(\`I work in \${city} with \${experience} years.\`);\n    console.log(typeof city, typeof experience, typeof isFresher);`),
      points: ["const by default, let if it changes.", "Template literals use backticks and ${}.", "typeof shows the type."],
      quiz: { q: "Which keyword declares a variable that cannot be reassigned?", options: ["let", "var", "const", "static"], answer: 2, why: "const bindings cannot be reassigned after they are declared." }
    },
    {
      slug: "operators-conditions",
      title: "Operators & conditions",
      summary: "Arithmetic, comparison, logical operators and if / else.",
      body: `<p>Arithmetic: <code>+ - * / %</code>. Comparison: <code>=== !== &lt; &gt; &lt;= &gt;=</code>. Always use <code>===</code> (strict equality) rather than <code>==</code>, which converts types first (<code>"5" == 5</code> is true!).</p>
<p>Logical: <code>&amp;&amp;</code> (and), <code>||</code> (or), <code>!</code> (not).</p>
<pre><code>if (score &gt;= 60) {\n  …\n} else if (score &gt;= 40) {\n  …\n} else {\n  …\n}</code></pre>
<p>The ternary <code>cond ? a : b</code> is a short if/else for values.</p>`,
      example: js(`    const score = 72;\n    if (score >= 80) {\n      console.log("Excellent");\n    } else if (score >= 60) {\n      console.log("Shortlisted");\n    } else {\n      console.log("Try again");\n    }\n    console.log("5" == 5, "5" === 5);\n    const label = score >= 60 ? "pass" : "fail";\n    console.log(label);`),
      points: ["Use === not ==.", "&& and || combine conditions.", "Ternary for simple value choices."],
      quiz: { q: "What is \"5\" === 5?", options: ["true", "false", "error", "undefined"], answer: 1, why: "=== compares type too: a string is not a number, so it's false." }
    },
    {
      slug: "loops",
      title: "Loops",
      summary: "for, while, for…of and breaking out of loops.",
      body: `<p>Loops repeat code.</p>
<ul>
<li><code>for (let i = 0; i &lt; 5; i++) { … }</code> — counted loops.</li>
<li><code>while (condition) { … }</code> — repeat while true; make sure it ends!</li>
<li><code>for (const item of list) { … }</code> — every item of an array or string.</li>
<li><code>break</code> stops the loop; <code>continue</code> skips to the next round.</li>
</ul>`,
      example: js(`    for (let i = 1; i <= 5; i++) {\n      console.log("Round", i);\n    }\n    const skills = ["HTML", "CSS", "JS"];\n    for (const s of skills) {\n      if (s === "CSS") continue;\n      console.log("Skill:", s);\n    }\n    let n = 1;\n    while (n < 50) n *= 3;\n    console.log("First power of 3 over 50:", n);`),
      points: ["for for counting, for…of for lists.", "Every while loop needs an exit.", "break / continue control the flow."],
      quiz: { q: "How many times does for (let i = 0; i < 3; i++) run?", options: ["2", "3", "4", "Forever"], answer: 1, why: "i takes the values 0, 1 and 2 — three iterations." }
    },
    {
      slug: "functions",
      title: "Functions",
      summary: "Declaring functions, parameters, return values and arrow functions.",
      body: `<p>Functions are reusable blocks of code.</p>
<pre><code>function greet(name) {\n  return "Hello, " + name;\n}\nconst add = (a, b) =&gt; a + b;   // arrow function</code></pre>
<ul>
<li><strong>Parameters</strong> are the inputs; <code>return</code> sends a value back.</li>
<li>Default values: <code>function hi(name = "friend")</code>.</li>
<li>A function without <code>return</code> gives <code>undefined</code>.</li>
<li>Variables declared inside a function are only visible inside it (scope).</li>
</ul>`,
      example: js(`    function monthlySalary(lpa) {\n      return Math.round((lpa * 100000) / 12);\n    }\n    const greet = (name = "friend") => \`Hello, \${name}!\`;\n    console.log(monthlySalary(6));\n    console.log(greet("Asha"));\n    console.log(greet());`),
      points: ["return gives a value back.", "Arrow functions are a short syntax.", "Defaults handle missing arguments."],
      quiz: { q: "What does a function return if it has no return statement?", options: ["0", "null", "undefined", "An error"], answer: 2, why: "Functions without return give back undefined." }
    },
    {
      slug: "arrays-objects",
      title: "Arrays & objects",
      summary: "Lists and key/value data, plus map, filter and find.",
      body: `<p>An <strong>array</strong> is an ordered list: <code>const jobs = ["QA", "Dev"]</code>. Index from 0: <code>jobs[0]</code>. Use <code>push</code> to add, <code>length</code> to count.</p>
<p>An <strong>object</strong> groups named values: <code>const job = { title: "Dev", city: "Kochi" }</code>, read with <code>job.title</code>.</p>
<p>Array methods you'll use daily:</p>
<ul>
<li><code>map</code> — transform every item.</li>
<li><code>filter</code> — keep items that match.</li>
<li><code>find</code> — first match.</li>
<li><code>reduce</code> — combine into one value.</li>
</ul>`,
      example: js(`    const jobs = [\n      { title: "QA Engineer", city: "Kochi", lpa: 4 },\n      { title: "React Dev", city: "Trivandrum", lpa: 8 },\n      { title: "Data Analyst", city: "Kochi", lpa: 6 }\n    ];\n    const kochi = jobs.filter(j => j.city === "Kochi");\n    console.log(kochi.map(j => j.title));\n    console.log(jobs.find(j => j.lpa > 7).title);\n    const avg = jobs.reduce((sum, j) => sum + j.lpa, 0) / jobs.length;\n    console.log("Average LPA:", avg);`),
      points: ["Arrays start at index 0.", "Objects use key: value pairs.", "map / filter / find / reduce replace most loops."],
      quiz: { q: "Which method keeps only the items that pass a test?", options: ["map", "filter", "push", "join"], answer: 1, why: "filter returns a new array with only the items for which the callback returns true." }
    },
    {
      slug: "dom",
      title: "The DOM",
      summary: "Selecting elements and changing text, classes and styles.",
      body: `<p>The <strong>DOM</strong> (Document Object Model) is the browser's live version of your HTML that JavaScript can read and change.</p>
<ul>
<li>Select: <code>document.querySelector(".card")</code> (first match), <code>querySelectorAll</code> (all).</li>
<li>Change text: <code>el.textContent = "…"</code> (safe — never inserts HTML).</li>
<li>Classes: <code>el.classList.add / remove / toggle("active")</code>.</li>
<li>Create: <code>document.createElement("li")</code> then <code>list.append(li)</code>.</li>
</ul>
<p>Prefer <code>textContent</code> over <code>innerHTML</code> for user input — innerHTML can run injected code.</p>`,
      example: js(`    const list = document.querySelector("#skills");\n    ["HTML", "CSS", "JavaScript"].forEach(skill => {\n      const li = document.createElement("li");\n      li.textContent = skill;\n      list.append(li);\n    });\n    document.querySelector("h2").classList.add("done");\n    console.log("Items:", list.children.length);`, `  <style>.done { color: #1d7a4c; text-decoration: underline; }</style>\n  <h2>My skills</h2>\n  <ul id="skills"></ul>\n`),
      points: ["querySelector uses CSS selectors.", "textContent is safe for text.", "classList toggles styles cleanly."],
      quiz: { q: "Which is safest for showing text a user typed?", options: ["innerHTML", "textContent", "outerHTML", "document.write"], answer: 1, why: "textContent never parses HTML, so injected tags or scripts can't run." }
    },
    {
      slug: "events",
      title: "Events",
      summary: "addEventListener, click and input events, forms.",
      body: `<p>Events let code react to the user: <code>click</code>, <code>input</code>, <code>submit</code>, <code>keydown</code>, <code>change</code>.</p>
<pre><code>button.addEventListener("click", () =&gt; {\n  …\n});</code></pre>
<ul>
<li>The handler receives an <code>event</code> object — <code>event.target</code> is the element.</li>
<li><code>event.preventDefault()</code> stops default behaviour such as a form reload.</li>
<li>Prefer <code>addEventListener</code> over inline <code>onclick=""</code> attributes.</li>
</ul>`,
      example: js(`    const input = document.querySelector("#name");\n    const out = document.querySelector("#out");\n    const btn = document.querySelector("#btn");\n    let clicks = 0;\n    input.addEventListener("input", e => {\n      out.textContent = "Hello, " + (e.target.value || "…");\n    });\n    btn.addEventListener("click", () => {\n      clicks++;\n      btn.textContent = "Clicked " + clicks + " times";\n      console.log("click", clicks);\n    });`, `  <input id="name" placeholder="Type your name">\n  <p id="out">Hello, …</p>\n  <button id="btn">Click me</button>\n`),
      points: ["addEventListener(type, handler).", "event.target is the element.", "preventDefault stops form reloads."],
      quiz: { q: "Which call stops a form from reloading the page on submit?", options: ["event.stop()", "event.preventDefault()", "return true", "form.reset()"], answer: 1, why: "preventDefault cancels the browser's default action for that event." }
    }
  ]
};

export const TRACKS = [HTML_TRACK, CSS_TRACK, JS_TRACK];
