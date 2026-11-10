/* Java Backend — 30 Important Interview Questions & Answers. Original InfoparkDaily content. Format: see guides/index.mjs. */
export const meta = {
  slug: "java-backend",
  field: "it",
  name: "Java backend",
  count: 30,
  topics: "core Java, OOP, collections, exceptions, multithreading, Spring Boot, REST APIs, JPA and SQL",
  level: "Fresher to experienced"
};

export const text = `
## Core Java and OOP

### What are the four pillars of object-oriented programming?
- **Encapsulation:** keep data private inside a class and expose it through methods.
- **Inheritance:** a class reuses and extends another class with \`extends\`.
- **Polymorphism:** one method call behaves differently depending on the object (overriding) or the arguments (overloading).
- **Abstraction:** show what an object does and hide how, using abstract classes and interfaces.

### What is the difference between JDK, JRE and JVM?
- **JVM:** runs Java bytecode and makes Java platform-independent.
- **JRE:** the JVM plus the core libraries needed to run Java programs.
- **JDK:** the JRE plus development tools such as the compiler (\`javac\`) and debugger.

You install the JDK to write Java and the JRE (or a JDK) to run it.

### What is the difference between an abstract class and an interface?
- An **abstract class** can have state (fields), constructors and both abstract and concrete methods. A class can extend only one.
- An **interface** defines a contract. Since Java 8 it can have \`default\` and \`static\` methods, but no instance state. A class can implement many.

Use an interface for a capability ("can be saved", "can be compared") and an abstract class to share common code between closely related classes.

### What is the difference between method overloading and overriding?
- **Overloading:** same method name, different parameter lists, in the same class. Decided at compile time.
- **Overriding:** a subclass provides its own version of a parent method with the same signature. Decided at runtime.
\`\`\`
class Shape { double area() { return 0; } }
class Circle extends Shape {
  double r;
  @Override double area() { return Math.PI * r * r; }
}
\`\`\`

### Why are Strings immutable in Java, and when do you use StringBuilder?
A \`String\` can't change after it's created. That makes strings safe to share between threads, lets Java reuse them from the string pool, and keeps hash codes stable for use as map keys.

Each change to a String creates a new object, so when you build text in a loop, use \`StringBuilder\`, which changes one buffer in place.

### What is the difference between == and equals()?
- \`==\` compares references: are both variables pointing to the same object?
- \`equals()\` compares content, if the class overrides it (String, Integer and most library classes do).
\`\`\`
String a = new String("java");
String b = new String("java");
a == b;      // false – different objects
a.equals(b); // true  – same content
\`\`\`
If you override \`equals()\`, also override \`hashCode()\` so equal objects have equal hash codes.

## Collections and exceptions

### What is the difference between ArrayList and LinkedList?
- **ArrayList** uses a resizable array: fast random access by index, slower inserts and removes in the middle.
- **LinkedList** uses linked nodes: fast inserts and removes at the ends, slow access by index.

In practice ArrayList is the default choice for most lists.

### How does a HashMap work internally?
A HashMap stores entries in an array of buckets. For each key it calculates \`hashCode()\`, maps that to a bucket, and stores the key-value pair there. If two keys land in the same bucket (a collision), they are chained together; since Java 8 a long chain becomes a balanced tree.

On \`get()\`, it finds the bucket from the hash and uses \`equals()\` to find the exact key. When the map gets too full (load factor 0.75 by default) it resizes and redistributes entries.

### What is the difference between HashMap, LinkedHashMap and TreeMap?
- **HashMap:** no ordering; fastest for general use.
- **LinkedHashMap:** keeps insertion order (or access order, useful for LRU caches).
- **TreeMap:** keeps keys sorted; operations take O(log n).

### What is the difference between checked and unchecked exceptions?
- **Checked exceptions** (such as \`IOException\`) must be handled with try-catch or declared with \`throws\`. The compiler enforces this.
- **Unchecked exceptions** (subclasses of \`RuntimeException\`, such as \`NullPointerException\`) usually signal programming errors and don't have to be declared.

### What is try-with-resources?
It automatically closes resources such as files, streams and database connections when the block ends, even if an exception is thrown. The resource must implement \`AutoCloseable\`.
\`\`\`
try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
  System.out.println(br.readLine());
}
\`\`\`

### What are Java 8 streams and lambdas?
A lambda is a short way to write a function, such as \`x -> x * 2\`. Streams let you process collections in a pipeline of steps like filter, map and collect.
\`\`\`
List<String> names = employees.stream()
    .filter(e -> e.getSalary() > 50000)
    .map(Employee::getName)
    .sorted()
    .toList();
\`\`\`
Streams make data processing shorter and easier to read; they don't change the original collection.

## Multithreading and memory

### What is the difference between a process and a thread?
A process is a running program with its own memory. A thread is a unit of execution inside a process; threads of the same process share its memory. Threads are lighter to create, but shared memory means you must handle synchronisation.

### What does the synchronized keyword do?
It lets only one thread at a time run a block or method on the same lock (object). This prevents race conditions when threads update shared data. Overusing it can slow the program or cause deadlocks, so keep synchronised sections small.

### What is the volatile keyword?
\`volatile\` makes every read of a variable come from main memory, so all threads see the latest value. It guarantees visibility but not atomicity — \`count++\` on a volatile is still unsafe. For atomic counters use \`AtomicInteger\`.

### What is an ExecutorService and why use it instead of creating threads?
ExecutorService manages a pool of reusable threads. You submit tasks and it runs them, which avoids the cost of creating a new thread for every task and limits how many run at once.
\`\`\`
ExecutorService pool = Executors.newFixedThreadPool(4);
Future<Integer> result = pool.submit(() -> computeTotal());
pool.shutdown();
\`\`\`

### How does garbage collection work in Java?
The JVM automatically frees memory used by objects that are no longer reachable from any live reference. The heap is split into generations: new objects start in the young generation, and long-lived objects move to the old generation. Most objects die young, so collecting the young generation often is efficient. You can't force GC; \`System.gc()\` is only a request.

## Spring Boot and REST APIs

### What is Spring Boot and how is it different from Spring?
Spring is a framework for building Java applications with dependency injection. Spring Boot sits on top of it and removes setup work: auto-configuration, starter dependencies, an embedded server (Tomcat) and sensible defaults. You can run a production-ready app with \`java -jar\`.

### What is dependency injection?
Instead of a class creating the objects it needs, the framework creates them and passes them in. This makes code loosely coupled and easy to test with mock objects. Constructor injection is the recommended style:
\`\`\`
@Service
public class OrderService {
  private final OrderRepository repo;
  public OrderService(OrderRepository repo) { this.repo = repo; }
}
\`\`\`

### What is the difference between @Component, @Service, @Repository and @Controller?
All four mark a class as a Spring bean. The specialised ones show the class's layer:
- **@Controller / @RestController:** handles web requests.
- **@Service:** business logic.
- **@Repository:** data access; it also translates database exceptions into Spring's exceptions.
- **@Component:** any other general bean.

### How do you build a REST endpoint in Spring Boot?
\`\`\`
@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserService service;
  public UserController(UserService service) { this.service = service; }

  @GetMapping("/{id}")
  public UserDto get(@PathVariable Long id) { return service.find(id); }

  @PostMapping
  public ResponseEntity<UserDto> create(@Valid @RequestBody UserDto dto) {
    return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
  }
}
\`\`\`
\`@RestController\` returns JSON by default, and \`@Valid\` triggers bean validation on the request body.

### How do you handle exceptions globally in Spring Boot?
Use a class annotated with \`@RestControllerAdvice\` and methods with \`@ExceptionHandler\`. It catches exceptions from all controllers and returns a consistent error response with the right HTTP status, instead of repeating try-catch in every controller.

### What are Spring profiles?
Profiles let you keep different settings for different environments, such as \`application-dev.yml\` and \`application-prod.yml\`. You activate one with \`spring.profiles.active=prod\`, so the same build can run with dev or production database URLs and credentials.

## JPA, databases and microservices

### What is JPA and how does Hibernate relate to it?
JPA is the Java standard for mapping objects to database tables (ORM). Hibernate is the most common implementation of JPA. Spring Data JPA adds repositories so you can write \`findByEmail(String email)\` and get the query generated for you.

### What is the N+1 query problem and how do you fix it?
It happens when you load a list of N parent records with one query, then each parent's children are loaded lazily with one more query each — N+1 queries in total. Fix it with a fetch join (\`JOIN FETCH\`), an entity graph, or batch fetching, so related data comes in one or a few queries.

### What is the difference between lazy and eager loading?
- **Lazy:** related data loads only when you access it. It's the default for collections and saves memory, but can cause N+1 queries or a \`LazyInitializationException\` outside a transaction.
- **Eager:** related data loads immediately with the parent. Simple, but can pull in much more data than needed.

### What does @Transactional do?
It runs a method inside a database transaction: if the method finishes, changes are committed; if a runtime exception is thrown, they are rolled back. It works through Spring proxies, so calling a \`@Transactional\` method from inside the same class bypasses it.

### What are microservices, and what are their pros and cons?
Microservices split an application into small, independently deployable services, each owning one business area and its own data.
- **Pros:** independent deployment and scaling, smaller codebases, teams can work separately.
- **Cons:** network calls between services, harder debugging, distributed data and more infrastructure (service discovery, monitoring, API gateway).

A well-structured monolith is often the better start for a small team.

### How do you secure a Spring Boot REST API?
Use Spring Security. Common setup: users log in and receive a JWT (or OAuth2 token), every request sends it in the \`Authorization\` header, and a filter validates it. Add role-based access with \`@PreAuthorize\` or URL rules, hash passwords with BCrypt, use HTTPS and validate all input.

### How do you improve the performance of a slow Spring Boot API?
1. Measure first: logs, APM tools or the database's slow query log.
2. Fix database issues: add indexes, remove N+1 queries, fetch only needed columns, paginate results.
3. Cache repeated reads (\`@Cacheable\`, Redis).
4. Move slow work to background jobs or message queues.
5. Tune connection pool and thread pool sizes.
`;

export const practice = [
  ["Core Java", "Reverse a string and check for a palindrome"],
  ["Core Java", "Find duplicate elements in an array using a HashMap"],
  ["Collections", "Sort a list of employees by salary using a Comparator"],
  ["Streams", "Group employees by department and count them"],
  ["Multithreading", "Print odd and even numbers with two threads"],
  ["Spring Boot", "Build a CRUD REST API for products with validation"],
  ["Spring Boot", "Add global exception handling with proper status codes"],
  ["JPA", "Write a repository query with pagination and sorting"],
  ["SQL", "Find the second-highest salary"],
  ["Projects", "Explain your project's layers: controller, service, repository"]
];
