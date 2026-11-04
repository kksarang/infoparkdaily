/* Practice tasks, interview Q&A and further-reading links for the HTML, CSS and JavaScript lessons.
   Original InfoparkDaily content; further reading = links only. Keyed by "track/slug". */

const MDN = "https://developer.mozilla.org/en-US/docs/";
const WHATWG = "https://html.spec.whatwg.org/multipage/";

export const WEB_EXTRAS = {
  /* ---------- HTML ---------- */
  "html/introduction": {
    practice: "Change the title to your name and add a second paragraph saying which job role you are preparing for.",
    interview: [["What is the purpose of <!doctype html>?", "It tells the browser to render the page in standards mode rather than the old 'quirks' mode, so layout follows modern rules."], ["What goes in <head> vs <body>?", "<head> holds metadata — title, charset, viewport, links to CSS and scripts. <body> holds the visible content."]],
    further: [["MDN: HTML basics", MDN + "Learn_web_development/Getting_started/Your_first_website/Creating_the_content"], ["HTML Living Standard", WHATWG]]
  },
  "html/elements": {
    practice: "Write a paragraph that uses <strong>, <em> and a line break, and give it a title attribute.",
    interview: [["What is a void (empty) element?", "An element that cannot have content or a closing tag, such as <br>, <img>, <input> and <meta>."], ["Difference between id and class?", "An id must be unique on the page and identifies one element; a class can be shared by many elements and is used for styling groups."]],
    further: [["MDN: HTML elements reference", MDN + "Web/HTML/Element"]]
  },
  "html/headings-paragraphs": {
    practice: "Build a short résumé outline: one <h1> with your name, <h2> sections for Skills and Education, and a paragraph under each.",
    interview: [["Why should you not skip heading levels?", "Assistive technology and search engines read headings as an outline. Jumping from h1 to h4 breaks that structure."], ["<strong> vs <b>?", "<strong> means the text is important (semantic); <b> only draws attention visually without extra meaning."]],
    further: [["MDN: Heading elements", MDN + "Web/HTML/Element/Heading_Elements"]]
  },
  "html/links": {
    practice: "Create a navigation of three links: one to another site in a new tab, one to an #about section on the same page, and one mailto link.",
    interview: [["Why add rel=\"noopener\" to target=\"_blank\" links?", "It stops the new page from getting access to window.opener, which could otherwise be used to redirect your page (tab-nabbing)."], ["Absolute vs relative URL?", "An absolute URL includes the scheme and domain (https://…). A relative URL is resolved from the current page or site root (/jobs/)."]],
    further: [["MDN: <a> element", MDN + "Web/HTML/Element/a"]]
  },
  "html/images": {
    practice: "Add an image with width, height, a meaningful alt text and loading=\"lazy\", wrapped in a <figure> with a caption.",
    interview: [["Why set width and height on images?", "The browser can reserve the space before the image loads, preventing layout shift (a Core Web Vitals metric)."], ["When should alt be empty?", "When the image is purely decorative and adds no information — alt=\"\" tells screen readers to skip it."]],
    further: [["MDN: <img> element", MDN + "Web/HTML/Element/img"], ["MDN: Responsive images", MDN + "Web/HTML/Guides/Responsive_images"]]
  },
  "html/lists": {
    practice: "Make an ordered list of your daily study plan with a nested unordered list of topics under one item.",
    interview: [["When would you use a description list?", "For name–value pairs such as a glossary, FAQ or job details (Location: Kochi, Experience: 2 years)."], ["Can you put block elements inside <li>?", "Yes — list items can contain paragraphs, headings, other lists and more."]],
    further: [["MDN: <ul>", MDN + "Web/HTML/Element/ul"], ["MDN: <dl>", MDN + "Web/HTML/Element/dl"]]
  },
  "html/tables": {
    practice: "Build a table of three companies with columns for name, location and number of openings, including a caption and a header row.",
    interview: [["Why shouldn't tables be used for page layout?", "They mix structure with presentation, are hard to make responsive and confuse screen readers. Use CSS Grid/Flexbox for layout."], ["What does scope=\"col\" on <th> do?", "It tells assistive technology that the header applies to the cells in that column."]],
    further: [["MDN: <table>", MDN + "Web/HTML/Element/table"]]
  },
  "html/forms": {
    practice: "Build a job application form with name, email, phone (type=tel), a resume upload (type=file) and a required consent checkbox.",
    interview: [["GET vs POST for forms?", "GET puts data in the URL — fine for searches. POST sends it in the request body — use it for creating data, logins and anything sensitive."], ["Is HTML validation enough?", "No. It improves user experience, but anyone can bypass it, so the server must always validate again."]],
    further: [["MDN: Web forms", MDN + "Learn_web_development/Extensions/Forms"], ["MDN: <input> types", MDN + "Web/HTML/Element/input"]]
  },
  "html/semantic": {
    practice: "Rewrite a page made only of <div>s using header, nav, main, article and footer.",
    interview: [["What is semantic HTML and why does it matter?", "Using elements for their meaning (nav, main, article). It improves accessibility, SEO and code readability."], ["<section> vs <article>?", "An article is self-contained and could be shared on its own (a post, a job card). A section groups related content within a page, usually with a heading."]],
    further: [["MDN: Semantics", MDN + "Glossary/Semantics"]]
  },

  /* ---------- CSS ---------- */
  "css/introduction": {
    practice: "Style the page so headings use a dark colour and paragraphs have 1.6 line-height and a different font size.",
    interview: [["What does 'cascading' mean in CSS?", "When several rules target the same element, the browser decides which wins by origin and importance, then specificity, then source order."], ["Why prefer external stylesheets?", "One file can style many pages, the browser can cache it, and HTML stays clean."]],
    further: [["MDN: CSS first steps", MDN + "Learn_web_development/Core/Styling_basics"]]
  },
  "css/selectors": {
    practice: "Style every second list item differently using :nth-child(2n), and make links change colour on hover and focus.",
    interview: [["How is specificity calculated?", "Roughly: inline styles > ids > classes/attributes/pseudo-classes > elements. More specific selectors win regardless of order."], ["Why avoid styling with ids?", "Ids have high specificity, making styles hard to override and not reusable."]],
    further: [["MDN: CSS selectors", MDN + "Web/CSS/CSS_selectors"], ["MDN: Specificity", MDN + "Web/CSS/Specificity"]]
  },
  "css/colors-units": {
    practice: "Set the root font size and size all headings with rem so changing one value scales the whole page.",
    interview: [["em vs rem?", "em is relative to the element's own (or parent's) font size and compounds when nested; rem is always relative to the root html font size."], ["Why care about colour contrast?", "Low-contrast text is hard to read for many people. WCAG recommends at least 4.5:1 for normal text."]],
    further: [["MDN: CSS values and units", MDN + "Learn_web_development/Core/Styling_basics/Values_and_units"]]
  },
  "css/box-model": {
    practice: "Create a card with 16px padding, a 1px border, 12px rounded corners and 24px space below it, using box-sizing: border-box.",
    interview: [["Explain the CSS box model.", "Every element is a box: content, then padding, then border, then margin. box-sizing decides whether width includes padding and border."], ["What is margin collapsing?", "Vertical margins of adjacent block elements combine into the larger of the two instead of adding up."]],
    further: [["MDN: The box model", MDN + "Learn_web_development/Core/Styling_basics/Box_model"]]
  },
  "css/flexbox": {
    practice: "Build a navbar with the logo on the left and three links on the right, vertically centred.",
    interview: [["How do you centre an element horizontally and vertically?", "Make the parent display:flex with justify-content:center and align-items:center (or display:grid with place-items:center)."], ["What does flex: 1 mean?", "Shorthand for flex-grow:1, flex-shrink:1, flex-basis:0 — items share the free space equally."]],
    further: [["MDN: Flexbox", MDN + "Learn_web_development/Core/CSS_layout/Flexbox"]]
  },
  "css/grid": {
    practice: "Create a responsive grid of job cards that shows 1 column on phones and up to 4 on wide screens without media queries.",
    interview: [["Grid vs Flexbox?", "Flexbox lays items out in one direction (row or column). Grid controls rows and columns together, which suits page and card layouts."], ["auto-fit vs auto-fill?", "Both create as many tracks as fit. auto-fit collapses empty tracks so items stretch; auto-fill keeps empty tracks."]],
    further: [["MDN: CSS grid layout", MDN + "Learn_web_development/Core/CSS_layout/Grids"]]
  },
  "css/responsive": {
    practice: "Make a two-column profile layout that stacks into one column below 600px, and make images never overflow.",
    interview: [["What is mobile-first design?", "Write base styles for small screens, then add min-width media queries for larger screens — simpler CSS and faster on phones."], ["What does the viewport meta tag do?", "It makes mobile browsers use the device width instead of a zoomed-out desktop width, so media queries work as expected."]],
    further: [["MDN: Responsive design", MDN + "Learn_web_development/Core/CSS_layout/Responsive_Design"], ["MDN: Media queries", MDN + "Web/CSS/CSS_media_queries/Using_media_queries"]]
  },

  /* ---------- JavaScript ---------- */
  "javascript/introduction": {
    practice: "Print your name and today's date to the console, then change the page heading to 'I am learning JavaScript'.",
    interview: [["What is the difference between defer and async on a script?", "Both download in parallel. defer runs after HTML parsing, in order; async runs as soon as it downloads, in any order."], ["Is JavaScript the same as Java?", "No. They are different languages with different designs; the similar name was a marketing choice."]],
    further: [["MDN: JavaScript guide", MDN + "Web/JavaScript/Guide"]]
  },
  "javascript/variables": {
    practice: "Store a job title, salary and remote flag in variables and print one sentence about the job using a template literal.",
    interview: [["var vs let vs const?", "var is function-scoped and hoisted (avoid it). let and const are block-scoped; const can't be reassigned (but objects it points to can still change)."], ["null vs undefined?", "undefined means a value was never assigned; null is an intentional 'no value'."]],
    further: [["MDN: Grammar and types", MDN + "Web/JavaScript/Guide/Grammar_and_types"]]
  },
  "javascript/operators-conditions": {
    practice: "Write code that prints 'Fizz' for multiples of 3, 'Buzz' for 5, 'FizzBuzz' for both, for numbers 1–20.",
    interview: [["== vs ===?", "== converts types before comparing (\"5\" == 5 is true). === compares value and type, so it's predictable — use it."], ["What are truthy and falsy values?", "Falsy: false, 0, -0, 0n, '', null, undefined, NaN. Everything else is truthy."]],
    further: [["MDN: Expressions and operators", MDN + "Web/JavaScript/Guide/Expressions_and_operators"]]
  },
  "javascript/loops": {
    practice: "Use a loop to calculate the total of [3.5, 6, 8, 12] and print the average.",
    interview: [["for…of vs for…in?", "for…of iterates values of arrays and other iterables. for…in iterates property keys of an object — avoid it for arrays."], ["How do you stop a loop early?", "Use break. continue skips just the current iteration."]],
    further: [["MDN: Loops and iteration", MDN + "Web/JavaScript/Guide/Loops_and_iteration"]]
  },
  "javascript/functions": {
    practice: "Write a function that takes an array of salaries and returns the highest one, without using Math.max.",
    interview: [["Function declaration vs arrow function?", "Declarations are hoisted and have their own this. Arrow functions are shorter and take this from the surrounding scope — handy for callbacks."], ["What is a closure?", "A function that remembers variables from the scope where it was created, even after that scope has finished running."]],
    further: [["MDN: Functions", MDN + "Web/JavaScript/Guide/Functions"]]
  },
  "javascript/arrays-objects": {
    practice: "From the jobs array, build a new array of strings like 'QA Engineer — Kochi' using map.",
    interview: [["map vs forEach?", "map returns a new array of transformed values; forEach just runs a function for each item and returns undefined."], ["How do you copy an object or array?", "Shallow copy with spread ({...obj}, [...arr]). For a deep copy use structuredClone(obj)."]],
    further: [["MDN: Array", MDN + "Web/JavaScript/Reference/Global_Objects/Array"], ["MDN: Working with objects", MDN + "Web/JavaScript/Guide/Working_with_objects"]]
  },
  "javascript/dom": {
    practice: "Render a list of three job cards from an array of objects, each with a title and city, using createElement and textContent.",
    interview: [["What is the DOM?", "The browser's tree of objects representing the page. JavaScript reads and changes it to update what the user sees."], ["Why is innerHTML risky?", "If it includes user input, injected HTML or scripts can run (XSS). Use textContent or sanitise first."]],
    further: [["MDN: DOM introduction", MDN + "Web/API/Document_Object_Model/Introduction"]]
  },
  "javascript/events": {
    practice: "Build a character counter: as the user types in a textarea, show how many characters are left out of 200.",
    interview: [["What is event delegation?", "Attach one listener to a parent and use event.target to handle events from many children — efficient and works for elements added later."], ["What is event bubbling?", "An event fires on the target first and then moves up through its ancestors. stopPropagation() stops it."]],
    further: [["MDN: Introduction to events", MDN + "Learn_web_development/Core/Scripting/Events"]]
  }
};
