/* Web Development — 70 Important Interview Questions & Answers. Original InfoparkDaily content.
 * Format notes: see guides/index.mjs. Edit here, then run: npm run build:journey
 */
export const text = `
## Frontend basics (HTML)

### What happens step by step when you enter a URL in a browser and press Enter?
When you enter a URL:
1. The browser checks its cache.
2. DNS resolves the domain name into an IP address.
3. The browser opens a connection to the server using TCP and, for HTTPS, TLS.
4. The browser sends an HTTP request.
5. The server processes the request and sends a response.
6. The browser parses the HTML, CSS and JavaScript.
7. It builds the DOM and CSSOM, calculates the layout and paints the page.
8. The page becomes interactive as JavaScript runs.

### What are the roles of HTML, CSS and JavaScript in a web application?
- **HTML:** defines the structure and content of a webpage.
- **CSS:** controls the design, layout, colours and responsiveness.
- **JavaScript:** adds functionality, interactions and dynamic behaviour.

Together, they form the foundation of frontend web development.

### What is the difference between HTML and HTML5?
HTML5 is the modern version of HTML. It introduced semantic elements such as \`<header>\`, \`<footer>\`, \`<article>\` and \`<section>\`, native audio and video support, improved forms, and browser APIs such as Canvas and Web Storage.

### What is the difference between block-level and inline elements?
- **Block elements** start on a new line and generally take the full available width. Examples: \`<div>\`, \`<p>\`, \`<section>\`.
- **Inline elements** take only the space they need and stay within the same line. Examples: \`<span>\`, \`<a>\`, \`<strong>\`.

### What is semantic HTML and why is it important?
Semantic HTML uses elements that clearly describe their purpose, such as \`<nav>\`, \`<main>\`, \`<article>\` and \`<footer>\`.

It improves accessibility, makes code easier to maintain and helps search engines understand the page content.

### What are meta tags and how do they impact SEO?
Meta tags give browsers and search engines information about a webpage. They go inside the \`<head>\` element.

Common examples:
- Description
- Viewport
- Character encoding
- Robots
- Open Graph metadata

They help with page descriptions, responsive layouts, indexing instructions and social sharing. A meta description can improve how a page appears in search results, but it is not a direct Google ranking factor.

### What is the difference between class and id attributes in HTML?
- **Class:** can be used on many elements; commonly used for CSS styling and JavaScript selection.
- **ID:** should identify exactly one element on a page.

Example: \`class="button"\` can be used on several buttons, while \`id="login-form"\` identifies one particular form.

### What is a DOCTYPE declaration and why is it required?
DOCTYPE tells the browser which HTML standard the document follows. In HTML5 it is written as:
\`\`\`
<!DOCTYPE html>
\`\`\`
It makes the browser render the page in standards mode instead of quirks mode.

### How do HTML forms work and what are common input types?
HTML forms collect user information and submit it to a server using GET or POST requests.

Common input types: \`text\`, \`email\`, \`password\`, \`number\`, \`date\`, \`radio\`, \`checkbox\`, \`file\` and \`submit\`.

Forms can also use validation attributes such as \`required\`, \`min\`, \`max\` and \`pattern\`.

### What is web accessibility and what are ARIA roles used for?
Web accessibility means designing websites that everyone can use, including people with disabilities.

ARIA (Accessible Rich Internet Applications) provides attributes that tell assistive technologies about roles, states and properties. Examples: \`aria-label\`, \`aria-expanded\` and \`role="dialog"\`.

Use native semantic HTML wherever possible before adding ARIA.

## CSS

### What is the CSS box model?
The CSS box model describes how an element's size is calculated. It has four parts:
1. Content
2. Padding
3. Border
4. Margin

By default, the declared width applies to the content area only. \`box-sizing: border-box\` includes padding and border within the declared width.

### What is the difference between margin and padding?
- **Margin:** space outside an element's border.
- **Padding:** space between the content and the element's border.

Margin separates elements from each other; padding creates space inside an element.

### Explain the different CSS position values.
- **static:** the default positioning.
- **relative:** positioned relative to its normal position.
- **absolute:** positioned relative to its nearest positioned ancestor.
- **fixed:** positioned relative to the viewport.
- **sticky:** behaves normally until a scroll threshold is reached, then sticks within its containing block.

### What is the difference between display: none, block, inline and inline-block?
- **none:** removes the element from the layout.
- **block:** starts on a new line and generally takes the available width.
- **inline:** stays within the text flow; width and height don't apply normally.
- **inline-block:** stays inline but accepts width and height.

### What is the difference between Flexbox and CSS Grid?
- **Flexbox:** mainly for one-dimensional layouts (a row or a column).
- **CSS Grid:** for two-dimensional layouts (rows and columns together).

Use Flexbox for navigation bars and alignment. Use Grid for complex page layouts and dashboards.

### How do you center a div horizontally and vertically in CSS?
One simple approach is Flexbox:
\`\`\`
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
\`\`\`
In a row, \`justify-content\` centres horizontally and \`align-items\` centres vertically.

### How does CSS specificity work?
Specificity decides which rule wins when several rules target the same element. General priority, highest first:
1. Inline styles
2. ID selectors
3. Class, attribute and pseudo-class selectors
4. Element and pseudo-element selectors

\`!important\` can override normal declarations but should be used sparingly. Specificity is applied together with cascade origin, importance and cascade layers.

### What is z-index and how does stacking context work?
\`z-index\` controls the stacking order of positioned elements (and some others). Within the same stacking context, a higher \`z-index\` generally appears above a lower one.

A new stacking context is created by, for example, a positioned element with a \`z-index\`, \`opacity\` less than 1, or a \`transform\`.

### What are media queries and how do you build responsive layouts?
Media queries apply CSS rules based on the device or viewport. Example:
\`\`\`
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
\`\`\`
Responsive layouts also use flexible units, CSS Grid, Flexbox and responsive images.

### What are CSS preprocessors and why are they used?
CSS preprocessors add features such as variables, nesting, mixins and reusable functions. Examples: Sass, LESS and Stylus.

They help organise and maintain large stylesheets. The preprocessor compiles the code into regular CSS.

## JavaScript core

### What is the difference between var, let and const?
- **var:** function-scoped and can be redeclared.
- **let:** block-scoped and can be reassigned.
- **const:** block-scoped and cannot be reassigned.
\`\`\`
var name = "John";
let age = 25;
const country = "India";
\`\`\`
In modern JavaScript, use \`const\` by default and \`let\` when the value needs to change.

### What is hoisting in JavaScript?
Hoisting is JavaScript processing declarations before running the code.
- \`var\` declarations are hoisted and initialised with \`undefined\`.
- \`let\` and \`const\` are hoisted but can't be used before their declaration (the temporal dead zone).
- Function declarations can generally be called before their definition.

### What is a closure and where is it used?
A closure is an inner function that remembers and uses variables from its outer scope, even after the outer function has finished.
\`\`\`
function counter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const increment = counter();

console.log(increment()); // 1
console.log(increment()); // 2
\`\`\`
Closures are used for data privacy, callbacks, event handlers and keeping state.

### What are event bubbling and event capturing?
They describe how events travel through the DOM.
- **Capturing:** the event travels from the document root down to the target element.
- **Bubbling:** the event travels from the target element back up through its ancestors.

Event delegation uses bubbling to handle events on many child elements through one common parent.

### What is the difference between == and ===?
- **==** compares values after converting types when needed.
- **===** compares both value and type, with no type conversion.
\`\`\`
console.log(5 == "5");  // true
console.log(5 === "5"); // false
\`\`\`
Strict equality (\`===\`) is generally preferred.

### What is the difference between arrow functions and regular functions?
Arrow functions have shorter syntax and take \`this\` from the surrounding scope.

Regular functions get their own \`this\`, depending on how they are called, and can be used as constructors.
\`\`\`
const add = (a, b) => a + b;

function multiply(a, b) {
  return a * b;
}
\`\`\`

### What are call(), apply() and bind() methods?
They control the \`this\` value of a regular function.
- **call():** calls the function with arguments passed one by one.
- **apply():** calls the function with arguments passed as an array.
- **bind():** returns a new function with \`this\` fixed to a given value.

### What are Promises and how does async/await work?
A Promise represents the eventual success or failure of an asynchronous operation. It has three states: pending, fulfilled and rejected.

\`async\`/\`await\` is a cleaner way to write Promise-based code:
\`\`\`
async function getData() {
  try {
    const response = await fetch("/api/users");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

### What is the difference between setTimeout() and setInterval()?
- **setTimeout():** runs a callback once after a delay.
- **setInterval():** runs a callback repeatedly at roughly the given interval.

Both return a timer ID that can be cancelled with \`clearTimeout()\` or \`clearInterval()\`.

### What is the difference between debounce and throttle?
- **Debounce:** runs a function only after events have stopped for a set time.
- **Throttle:** limits how often a function can run while events keep firing.

Use debounce for search inputs and throttle for scroll or resize handlers.

## Advanced JavaScript

### What is prototypal inheritance in JavaScript?
Objects can inherit properties and methods from other objects through the prototype chain. If a property isn't found on an object, JavaScript looks at its prototype, then that prototype's prototype, and so on.

JavaScript classes are a more familiar syntax built on this prototype system.

### How does the this keyword behave in different contexts?
In a regular function, \`this\` depends on how the function is called.
- **Global function:** the global object in non-strict mode, \`undefined\` in strict mode.
- **Object method:** usually the object before the dot.
- **Constructor:** the newly created instance.
- **Arrow function:** taken from the surrounding scope.

### What is the difference between shallow copy and deep copy?
- **Shallow copy:** copies top-level properties but keeps references to nested objects.
- **Deep copy:** creates independent copies of nested data too.
\`\`\`
const original = {
  name: "John",
  address: { city: "Kochi" }
};

const shallow = { ...original };
\`\`\`
Changing \`shallow.address.city\` also changes \`original\`, because the nested object is shared. \`structuredClone()\` can make deep copies of supported data types.

### How does the JavaScript event loop work?
The call stack runs synchronous code. Asynchronous work is handled by browser or runtime APIs, and their callbacks are placed in queues. The event loop moves a callback onto the stack when the stack is empty.

Microtasks are processed before the event loop moves on to the next task.

### What is the difference between microtasks and macrotasks?
Microtasks have higher priority: they run as soon as the current synchronous code finishes.
- **Microtasks:** Promise callbacks, \`queueMicrotask()\`.
- **Tasks (often called macrotasks):** \`setTimeout()\`, \`setInterval()\`, event callbacks.

The whole microtask queue is emptied before the next task runs.

### What causes memory leaks in JavaScript and how do you prevent them?
A memory leak happens when memory that's no longer needed stays reachable, so it can't be garbage-collected.

Common causes:
- Event listeners that are never removed
- Timers and intervals that are never cleared
- Unnecessary global variables
- References kept to removed DOM elements
- Resources that are never released

Prevent them by cleaning up listeners, timers, subscriptions and references when they're no longer needed.

### What are JavaScript modules and bundlers?
Modules split code into reusable files using \`export\` and \`import\`.

Bundlers combine and optimise the application's files for production. Examples: Webpack, Vite, Rollup and Parcel.

### What is tree shaking and why is it important?
Tree shaking is a build step that removes unused code from the final bundle. It reduces bundle size and improves loading speed.

It works best with ES modules, because their imports and exports can be analysed statically.

### What are polyfills and when are they needed?
A polyfill is code that adds a missing web API or JavaScript feature to environments that don't support it natively — for example, providing a newer API in an older browser.

### What are the different web storage options available in browsers?
- **localStorage:** stores data with no automatic expiry.
- **sessionStorage:** stores data for one browser tab's session.
- **Cookies:** small pieces of data that can be sent with HTTP requests.
- **IndexedDB:** stores larger amounts of structured data.
- **Cache API:** stores requests and responses, commonly used by service workers.

Don't store sensitive authentication tokens carelessly in storage that JavaScript can read.

## Frameworks and libraries (React & Angular)

### Why do we use frontend frameworks like React or Angular?
They help build complex applications from reusable components, with tools for UI updates, state, routing and organising large codebases.

React is a UI library; Angular is a full application framework.

### What is the Virtual DOM and how does it improve performance?
The Virtual DOM is an in-memory copy of the UI. React uses it to work out what changed between renders and then updates only those parts of the real DOM.

It helps organise efficient updates, though real performance still depends on the app and how it renders.

### What are controlled and uncontrolled components in React?
- **Controlled:** form values are managed through React state.
- **Uncontrolled:** form values are managed by the DOM and read using refs.

Controlled components are useful when you need validation or instant state updates.

### What is the difference between state and props?
- **Props:** data passed from a parent component to a child.
- **State:** data managed inside a component (or by a state-management library).

Props are read-only for the component that receives them. State is updated through its setter.

### What are component lifecycle methods or hooks?
The lifecycle is the stages of a component's life. In class components, common lifecycle methods are:
- \`componentDidMount()\`
- \`componentDidUpdate()\`
- \`componentWillUnmount()\`

In function components, hooks such as \`useEffect()\` handle side effects and cleanup.

### How does the dependency array in useEffect work?
The dependency array controls when an effect runs.
\`\`\`
useEffect(() => {
  console.log("Runs after every render");
});

useEffect(() => {
  console.log("Runs after initial mount");
}, []);

useEffect(() => {
  console.log("Runs when count changes");
}, [count]);
\`\`\`
An effect can return a cleanup function to remove subscriptions, timers or event listeners.

### When should you use Context API?
React Context shares data across components without passing props through every level. Common uses:
- Theme
- Logged-in user details
- Language preference
- Shared app settings

For complex or frequently changing global state, a dedicated state-management library may be a better fit.

### How do you optimize frontend application performance?
- Code splitting
- Lazy loading
- Image optimisation
- Avoiding unnecessary re-renders
- Caching
- Minifying CSS and JavaScript
- Using a CDN
- Optimising API requests
- Measuring with browser performance tools

### What is code splitting and why is it needed?
Code splitting breaks the app bundle into smaller chunks. Instead of downloading all the code at once, users download only what the current page or feature needs, which can make the first load faster.

### What is the difference between Server-Side Rendering and Client-Side Rendering?
- **SSR:** the HTML is generated on the server and sent to the browser.
- **CSR:** JavaScript runs in the browser and builds the UI.

SSR can show content sooner and help search engines. CSR suits highly interactive apps. Modern frameworks can combine both.

## Backend development

### What is REST architecture and what are its principles?
REST (Representational State Transfer) is an architectural style for designing web APIs. Its main principles:
- Client-server architecture
- Stateless communication
- Cacheable responses
- Uniform interface
- Layered system
- Code on demand (optional)

REST APIs commonly use the HTTP methods GET, POST, PUT, PATCH and DELETE.

### What are HTTP methods and common HTTP status codes?
HTTP methods state what the client wants the server to do:
- **GET:** retrieve data.
- **POST:** create or submit data.
- **PUT:** replace a resource.
- **PATCH:** partly update a resource.
- **DELETE:** remove a resource.

Common status codes:
| Code | Meaning |
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 301 | Moved Permanently |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

### What does stateless architecture mean?
The server doesn't keep client session state between requests. Each request carries everything needed to process it, such as authentication credentials or a token.

This makes it easier to scale an application across many servers.

### What is the difference between authentication and authorization?
- **Authentication:** checks who the user is.
- **Authorization:** decides what that user is allowed to access.

Example: logging in is authentication; being allowed into the admin dashboard because of your permissions is authorization.

### How does JWT-based authentication work?
JWT stands for JSON Web Token. The flow generally works like this:
1. The user submits login credentials.
2. The server verifies them.
3. The server creates a signed JWT.
4. The client stores the token securely.
5. The client sends the token with later requests.
6. The server verifies the token and grants access based on its claims and permissions.

JWTs are signed but not encrypted by default, so don't put sensitive information in the payload.

### What is the difference between cookies, localStorage and sessionStorage?
| Feature | Cookies | localStorage | sessionStorage |
| Stored in | Browser | Browser | Browser tab |
| Expiry | Configurable | No automatic expiry | Ends with the page session |
| Sent to server | Automatically, with requests | No | No |
| Capacity | Small | Larger | Larger |

Cookies can use security attributes such as \`HttpOnly\`, \`Secure\` and \`SameSite\`.

### What is CORS and how do you resolve CORS issues?
CORS (Cross-Origin Resource Sharing) is a browser security mechanism that controls whether a page can access resources from another origin.

To fix CORS issues, on the server:
- Set the \`Access-Control-Allow-Origin\` header.
- Allow the required HTTP methods.
- Allow the required request headers.
- Handle preflight \`OPTIONS\` requests.
- Configure credentials correctly when needed.

Fix CORS in the server configuration — never by turning off browser security.

### What is middleware and why is it used?
Middleware is a function that runs during the request-response pipeline. Common uses:
- Authentication
- Authorization
- Logging
- Error handling
- Request validation
- Rate limiting

For example, Express.js processes incoming requests through a chain of middleware functions.

### Why is API versioning important?
Versioning lets you change an API without breaking existing apps that use it. For example:
\`\`\`
/api/v1/users
/api/v2/users
\`\`\`
It keeps backward compatibility and gives developers time to move to the newer version.

### What is rate limiting and how is it implemented?
Rate limiting caps how many requests a client can make in a period — for example, 100 requests per minute per user. It helps:
- Prevent abuse
- Reduce server overload
- Block automated attacks
- Keep the API available

It can be implemented with middleware, an API gateway, or a store such as Redis to count requests.

## APIs, databases and web security

### What is the difference between REST API and GraphQL?
REST uses many endpoints for different resources. GraphQL lets clients ask for exactly the data they need through a single endpoint using queries.
| REST | GraphQL |
| Multiple endpoints | Usually one endpoint |
| Fixed response structures | Client picks the fields it needs |
| HTTP methods | Queries, mutations and subscriptions |
| Can over-fetch data | Helps avoid over-fetching |

### What is the difference between SQL and NoSQL databases?
- **SQL databases** use relational tables with structured schemas. Examples: MySQL, PostgreSQL, Microsoft SQL Server.
- **NoSQL databases** support other data models — documents, key-value pairs, graphs. Examples: MongoDB, Redis, Cassandra.

SQL suits relational data and complex queries. NoSQL suits other data models and some large-scale distributed workloads.

### What are primary keys and foreign keys?
- **Primary key:** uniquely identifies each record in a table.
- **Foreign key:** refers to a primary (or unique) key in another table, creating a relationship.

Example: a \`users\` table has \`user_id\` as its primary key; an \`orders\` table uses \`user_id\` as a foreign key.

### What is database indexing and why is it important?
An index is an extra data structure that helps the database find rows without scanning the whole table. It gives:
- Faster searches
- Better query performance
- Efficient filtering and sorting

But indexes use storage and can slow down INSERT, UPDATE and DELETE operations.

### What is SQL injection and how can you prevent it?
SQL injection is when an attacker puts malicious SQL into an application's input, which can let them read, change or delete data.

Prevent it by:
- Using parameterised queries
- Using prepared statements
- Validating input
- Giving the database user only the permissions it needs
- Never building SQL by concatenating user input into strings

### What is Cross-Site Scripting (XSS) and how can you prevent it?
XSS is when an attacker injects malicious scripts into pages that other users view. Common types: stored, reflected and DOM-based XSS.

Prevent it by:
- Escaping untrusted output
- Sanitising HTML when you must allow it
- Using a Content Security Policy
- Avoiding unsafe DOM manipulation
- Using your framework's built-in protections

### What is HTTPS and how does SSL/TLS work?
HTTPS is HTTP secured with TLS (the successor to SSL). TLS provides:
- Encryption
- Data integrity
- Server authentication through digital certificates

This stops attackers from reading or changing data while it travels between browser and server.

### What is the difference between GET and POST requests?
GET retrieves data from a server. POST sends data to a server, usually to create something or trigger an action.
- GET parameters usually go in the URL; POST data usually goes in the request body.
- GET requests should be safe and are often cacheable; POST requests generally aren't cached.

POST isn't automatically secure — you still need HTTPS to protect data in transit.

### What is Git and why is version control important?
Git is a distributed version control system for tracking changes to code. It lets developers:
- Track changes
- Create branches
- Collaborate with a team
- Merge code
- Undo unwanted changes
- Keep the full project history

Common commands:
\`\`\`
git init
git clone
git add .
git commit -m "Initial commit"
git push
git pull
git branch
git merge
\`\`\`

### What is the difference between development, staging and production environments?
- **Development:** where developers build and test new features.
- **Staging:** a copy of production used for final testing.
- **Production:** the live environment real users use.

Keeping them separate reduces deployment risk and keeps the live app stable.
`;

/* Practical tasks to prepare alongside the 70 questions. */
export const practice = [
  ["HTML", "Build a registration form"],
  ["CSS", "Create a responsive navigation bar"],
  ["JavaScript", "Reverse a string; remove duplicates from an array"],
  ["JavaScript", "Find the largest number in an array"],
  ["React", "Build a counter using useState"],
  ["React", "Fetch and display data from an API"],
  ["React", "Create reusable components"],
  ["Backend", "Build a CRUD API"],
  ["SQL", "Write JOIN and GROUP BY queries"],
  ["Git", "Resolve a merge conflict"],
  ["Security", "Implement login and authorization"],
  ["Projects", "Explain your application's architecture"]
];

export const meta = {
  slug: "web-development",
  field: "it",
  name: "Web development",
  count: 70,
  topics: "HTML, CSS, JavaScript, React, backend development, APIs, databases and web security",
  level: "Beginner to advanced"
};
