/* Spring Boot tutorial — original InfoparkDaily lessons. Examples show Java code with the output or HTTP responses you get when you run them. */

const SPRING = "https://docs.spring.io/spring-boot/";

export const SPRING_TRACK = {
  key: "spring-boot",
  name: "Spring Boot",
  long: "Spring Boot — Java web services, REST APIs and JPA",
  color: "#6db33f",
  tagline: "Java REST APIs and databases.",
  level: "Intermediate",
  lang: "static",
  feature: "Code + expected output",
  heroLine: "Every lesson has working Spring Boot code with the output or API response you'll see",
  exampleTitle: "Example code",
  exampleBadge: "Spring Boot 3 · Java 17+",
  outputTitle: "Output / API response",
  exampleNote: "Generate a project at start.spring.io (Maven, Java 17+, dependencies: Spring Web, Spring Data JPA, H2, Validation), add the code, and run <code>./mvnw spring-boot:run</code>. Learn the Java tutorial first if you're new to Java. Data is fictional.",
  lessons: [
    {
      slug: "introduction",
      title: "Spring Boot introduction",
      summary: "What Spring and Spring Boot are, creating a project and running your first app.",
      body: `<p><strong>Spring</strong> is the most popular Java framework for backend applications. <strong>Spring Boot</strong> makes it quick to start: it auto-configures common setups, includes an embedded web server (Tomcat) and packages your app as one runnable JAR.</p>
<h3>Create a project</h3>
<ol>
<li>Go to <strong>start.spring.io</strong> (Spring Initializr).</li>
<li>Choose Maven, Java 17 or newer, and add dependencies — start with <em>Spring Web</em>.</li>
<li>Download, open in IntelliJ IDEA or VS Code, and run the main class.</li>
</ol>
<p>The class marked <code>@SpringBootApplication</code> is the entry point. It turns on component scanning (finding your classes) and auto-configuration.</p>
<p>Settings go in <code>src/main/resources/application.properties</code> (or <code>application.yml</code>), for example <code>server.port=8081</code>.</p>`,
      example: `// src/main/java/com/example/jobs/JobsApplication.java
package com.example.jobs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JobsApplication {
    public static void main(String[] args) {
        SpringApplication.run(JobsApplication.class, args);
    }
}`,
      output: `  .   ____          _            __ _ _
 /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\
...
Tomcat started on port 8080 (http)
Started JobsApplication in 1.9 seconds`,
      points: ["Spring Boot = Spring with auto-configuration and an embedded server.", "Create projects at start.spring.io.", "@SpringBootApplication marks the main class.", "Configure the app in application.properties or application.yml."],
      practice: "Generate a project with Spring Web, run it, then change the port to 8081 in application.properties and run it again.",
      quiz: { q: "What does Spring Boot's embedded server mean?", options: ["You must install Tomcat separately", "The web server is packaged inside your app, so it runs with java -jar", "It only works in the cloud", "It replaces the JVM"], answer: 1, why: "Spring Boot bundles Tomcat (or Jetty/Undertow), so the built JAR runs on its own." },
      interview: [
        ["What is the difference between Spring and Spring Boot?", "Spring is the core framework (dependency injection, MVC, data access). Spring Boot builds on it with auto-configuration, starter dependencies, an embedded server and production features, so you write far less setup code."],
        ["What does @SpringBootApplication do?", "It combines @Configuration, @EnableAutoConfiguration and @ComponentScan: it marks the main configuration class, turns on auto-configuration and scans the package for components."]
      ],
      further: [["Spring Boot reference", SPRING + "index.html"], ["Spring Initializr", "https://start.spring.io/"]]
    },
    {
      slug: "dependency-injection",
      title: "Beans & dependency injection",
      summary: "How Spring creates and wires objects, @Component/@Service and constructor injection.",
      body: `<p>Spring manages objects called <strong>beans</strong>. Instead of writing <code>new EmailService()</code> inside your classes, you declare what a class needs and Spring passes it in. This is <strong>dependency injection (DI)</strong>.</p>
<ul>
<li>Mark classes with <code>@Component</code>, or the more specific <code>@Service</code>, <code>@Repository</code> or <code>@RestController</code>.</li>
<li>Use <strong>constructor injection</strong>: list dependencies as constructor parameters and make the fields <code>final</code>. With one constructor, no annotation is needed.</li>
<li>Use <code>@Bean</code> methods in a <code>@Configuration</code> class for objects from libraries you can't annotate.</li>
</ul>
<p>DI keeps classes loosely coupled — in tests you can pass a fake implementation instead of the real one.</p>`,
      example: `public interface Notifier {
    String send(String to, String message);
}

@Service
class EmailNotifier implements Notifier {
    public String send(String to, String message) {
        return "Email to " + to + ": " + message;
    }
}

@Service
class ApplicationService {
    private final Notifier notifier;

    ApplicationService(Notifier notifier) {   // injected by Spring
        this.notifier = notifier;
    }

    String apply(String email, String jobTitle) {
        return notifier.send(email, "Applied for " + jobTitle);
    }
}

// somewhere at startup:
// System.out.println(applicationService.apply("anu@example.com", "Java Developer"));`,
      output: `Email to anu@example.com: Applied for Java Developer`,
      points: ["Beans are objects created and managed by Spring.", "Prefer constructor injection with final fields.", "@Service, @Repository and @RestController are specialised @Components.", "DI makes classes easy to test with fake dependencies."],
      practice: "Add a second Notifier implementation (SmsNotifier) and see the startup error; then fix it by marking one with @Primary.",
      quiz: { q: "Which injection style is recommended?", options: ["Field injection with @Autowired", "Constructor injection", "Creating objects with new", "Static methods"], answer: 1, why: "Constructor injection makes dependencies explicit, allows final fields and makes classes easy to construct in unit tests." },
      interview: [
        ["What is dependency injection and why use it?", "A design where an object's dependencies are provided from outside (by the Spring container) rather than created inside it. It reduces coupling, makes code easier to test with mocks and lets you swap implementations."],
        ["What happens if two beans implement the same interface?", "Spring can't decide which to inject and fails at startup. Resolve it with @Primary on one bean, or @Qualifier(\"name\") at the injection point."]
      ],
      further: [["Spring beans and DI", SPRING + "reference/using/spring-beans-and-dependency-injection.html"]]
    },
    {
      slug: "rest-controllers",
      title: "REST controllers",
      summary: "@RestController, mapping GET/POST/PUT/DELETE, path variables, query parameters and ResponseEntity.",
      body: `<p>A <code>@RestController</code> handles HTTP requests and returns data, which Spring converts to JSON automatically (using Jackson).</p>
<ul>
<li><code>@RequestMapping("/api/jobs")</code> on the class sets the base path.</li>
<li><code>@GetMapping</code>, <code>@PostMapping</code>, <code>@PutMapping</code>, <code>@DeleteMapping</code> map methods.</li>
<li><code>@PathVariable</code> reads <code>/jobs/{id}</code>; <code>@RequestParam</code> reads <code>?city=Kochi</code>; <code>@RequestBody</code> reads JSON.</li>
<li><code>ResponseEntity</code> lets you set the status code — such as <strong>201 Created</strong> or <strong>404 Not Found</strong>.</li>
</ul>
<p>Use Java <strong>records</strong> for simple request and response objects (DTOs).</p>`,
      example: `public record JobDto(Long id, String title, String city) {}

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    private final Map<Long, JobDto> jobs = new ConcurrentHashMap<>();
    private final AtomicLong ids = new AtomicLong();

    @GetMapping
    public List<JobDto> list(@RequestParam(required = false) String city) {
        return jobs.values().stream()
            .filter(j -> city == null || j.city().equalsIgnoreCase(city))
            .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobDto> get(@PathVariable Long id) {
        JobDto job = jobs.get(id);
        return job == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(job);
    }

    @PostMapping
    public ResponseEntity<JobDto> create(@RequestBody JobDto body) {
        JobDto saved = new JobDto(ids.incrementAndGet(), body.title(), body.city());
        jobs.put(saved.id(), saved);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}`,
      output: `POST /api/jobs  {"title":"Java Developer","city":"Kochi"}
→ 201 Created  {"id":1,"title":"Java Developer","city":"Kochi"}

GET /api/jobs?city=kochi
→ 200 OK  [{"id":1,"title":"Java Developer","city":"Kochi"}]

GET /api/jobs/7
→ 404 Not Found`,
      points: ["@RestController returns JSON automatically.", "@PathVariable for /{id}, @RequestParam for ?query, @RequestBody for JSON.", "Use ResponseEntity to control status codes.", "Records make concise DTOs."],
      practice: "Add PUT /api/jobs/{id} that replaces a job (404 if missing) and DELETE /api/jobs/{id} that returns 204 No Content.",
      quiz: { q: "Which annotation reads the id from /api/jobs/5?", options: ["@RequestParam", "@RequestBody", "@PathVariable", "@RequestHeader"], answer: 2, why: "@PathVariable binds a {placeholder} in the URL path to a method parameter." },
      interview: [
        ["What is the difference between @Controller and @RestController?", "@Controller is for MVC apps that return view names (HTML templates). @RestController = @Controller + @ResponseBody, so every method's return value is written straight to the response, usually as JSON."],
        ["@PathVariable vs @RequestParam?", "@PathVariable reads part of the path (/jobs/5) and usually identifies a resource. @RequestParam reads query parameters (/jobs?city=Kochi) and is typically used for filtering, sorting and paging."]
      ],
      further: [["Building a RESTful web service", "https://spring.io/guides/gs/rest-service"]]
    },
    {
      slug: "jpa-repositories",
      title: "Spring Data JPA & repositories",
      summary: "Entities, repositories, derived query methods, H2/MySQL configuration and pagination.",
      body: `<p><strong>JPA</strong> maps Java classes to database tables; <strong>Hibernate</strong> is the implementation Spring Boot uses. <strong>Spring Data JPA</strong> then generates repository code for you.</p>
<ul>
<li>An <code>@Entity</code> class is a table; <code>@Id</code> with <code>@GeneratedValue</code> is the primary key.</li>
<li>Extend <code>JpaRepository&lt;Job, Long&gt;</code> to get <code>save</code>, <code>findById</code>, <code>findAll</code>, <code>deleteById</code> and paging for free.</li>
<li><strong>Derived queries</strong>: name a method <code>findByCityIgnoreCase</code> and Spring writes the SQL.</li>
<li>Use <code>@Query</code> for anything more complex.</li>
</ul>
<p>The H2 in-memory database is handy for learning; switch to MySQL or PostgreSQL by changing <code>spring.datasource.*</code> properties and the driver dependency.</p>`,
      example: `@Entity
public class Job {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String city;
    private double salaryLpa;
    // constructors, getters and setters
}

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByCityIgnoreCase(String city);
    List<Job> findBySalaryLpaGreaterThanOrderBySalaryLpaDesc(double min);
    Page<Job> findByTitleContainingIgnoreCase(String q, Pageable pageable);
}

// application.properties (MySQL)
// spring.datasource.url=jdbc:mysql://localhost:3306/jobs
// spring.datasource.username=app
// spring.datasource.password=\${DB_PASSWORD}
// spring.jpa.hibernate.ddl-auto=validate`,
      output: `jobRepository.findByCityIgnoreCase("kochi")
→ Hibernate: select ... from job j where upper(j.city)=upper(?)
→ [Job{id=1, title='Java Developer', city='Kochi'}]

jobRepository.findByTitleContainingIgnoreCase("java", PageRequest.of(0, 10))
→ Page 1 of 3 (25 jobs)`,
      points: ["@Entity maps a class to a table.", "JpaRepository gives CRUD and paging methods for free.", "Method names like findByCity become queries automatically.", "Keep passwords in environment variables, not in properties files."],
      practice: "Add an Application entity with a @ManyToOne link to Job, and a repository method that returns all applications for a given job id.",
      quiz: { q: "What does findByCityIgnoreCase(String city) do?", options: ["Nothing until you write the SQL", "Spring Data generates the query from the method name", "It only works with MongoDB", "It deletes rows"], answer: 1, why: "Spring Data parses derived method names and builds the matching query automatically." },
      interview: [
        ["What is the difference between JPA, Hibernate and Spring Data JPA?", "JPA is the specification for Java ORM. Hibernate is the most common implementation of it. Spring Data JPA sits on top and generates repository implementations, so you write interfaces instead of DAO code."],
        ["What does spring.jpa.hibernate.ddl-auto do?", "It controls schema handling: create/create-drop build tables (for learning or tests), update alters them, validate only checks the schema matches, and none does nothing. Production apps use validate or none with migration tools such as Flyway or Liquibase."]
      ],
      further: [["Accessing data with JPA", "https://spring.io/guides/gs/accessing-data-jpa"]]
    },
    {
      slug: "services-validation-errors",
      title: "Services, validation & error handling",
      summary: "Layered architecture, bean validation, @Transactional and global exception handling.",
      body: `<p>Real apps use three layers: <strong>controller</strong> (HTTP), <strong>service</strong> (business rules), <strong>repository</strong> (database). Controllers stay thin; logic lives in services.</p>
<h3>Validation</h3>
<p>Add the Validation starter, put constraints such as <code>@NotBlank</code>, <code>@Email</code> and <code>@Positive</code> on your request DTO, and mark the parameter <code>@Valid</code>. Invalid requests are rejected before your code runs.</p>
<h3>Error handling</h3>
<p>A <code>@RestControllerAdvice</code> class with <code>@ExceptionHandler</code> methods turns exceptions into clean JSON responses with the right status — in one place, for all controllers.</p>
<p><code>@Transactional</code> on a service method makes its database changes all-or-nothing.</p>`,
      example: `public record CreateJobRequest(
    @NotBlank String title,
    @NotBlank String city,
    @Positive double salaryLpa) {}

public class JobNotFoundException extends RuntimeException {
    public JobNotFoundException(Long id) { super("Job " + id + " not found"); }
}

@Service
public class JobService {
    private final JobRepository repo;
    public JobService(JobRepository repo) { this.repo = repo; }

    @Transactional
    public Job create(CreateJobRequest req) {
        return repo.save(new Job(req.title(), req.city(), req.salaryLpa()));
    }

    public Job get(Long id) {
        return repo.findById(id).orElseThrow(() -> new JobNotFoundException(id));
    }
}

@RestControllerAdvice
public class ApiErrors {
    @ExceptionHandler(JobNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> notFound(JobNotFoundException e) {
        return Map.of("error", e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> invalid(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getFieldErrors()
         .forEach(f -> errors.put(f.getField(), f.getDefaultMessage()));
        return errors;
    }
}

// controller: public Job create(@Valid @RequestBody CreateJobRequest req)`,
      output: `POST /api/jobs  {"title":"","city":"Kochi","salaryLpa":-2}
→ 400 Bad Request
  {"title":"must not be blank","salaryLpa":"must be greater than 0"}

GET /api/jobs/99
→ 404 Not Found
  {"error":"Job 99 not found"}`,
      points: ["Controller → service → repository keeps code organised.", "Validate request DTOs with annotations and @Valid.", "Handle exceptions once with @RestControllerAdvice.", "@Transactional makes a set of changes all-or-nothing."],
      practice: "Add a rule in JobService that a job title must be unique (throw a DuplicateJobException), and map it to 409 Conflict in ApiErrors.",
      quiz: { q: "Where should business rules usually live?", options: ["In the controller", "In the service layer", "In application.properties", "In the entity's getters"], answer: 1, why: "Services hold business logic so it can be reused and tested independently of HTTP and database details." },
      interview: [
        ["How do you handle exceptions globally in Spring Boot?", "Create a class annotated with @RestControllerAdvice containing @ExceptionHandler methods for each exception type. They return a consistent error body and status code, so controllers don't need try-catch blocks."],
        ["When does @Transactional not work?", "When the method is called from another method in the same class (the call skips Spring's proxy), when it's on a private method, or when a checked exception is thrown (by default only runtime exceptions trigger rollback)."]
      ],
      further: [["Validation", SPRING + "reference/io/validation.html"]]
    },
    {
      slug: "security-testing",
      title: "Security & testing",
      summary: "Spring Security basics, password hashing, securing endpoints and writing tests with JUnit and MockMvc.",
      body: `<p><strong>Spring Security</strong> protects your API. Adding the starter secures every endpoint by default; you then configure which URLs are public and which need login or a role.</p>
<ul>
<li>Hash passwords with <code>BCryptPasswordEncoder</code> — never store plain text.</li>
<li>Stateless REST APIs usually use <strong>JWT</strong> or OAuth2 tokens instead of sessions.</li>
<li>Use <code>@PreAuthorize("hasRole('ADMIN')")</code> for method-level rules.</li>
</ul>
<h3>Testing</h3>
<ul>
<li><strong>Unit tests</strong> (JUnit 5 + Mockito) test a service with fake repositories — fast and focused.</li>
<li><code>@WebMvcTest</code> + <code>MockMvc</code> tests controllers without starting a real server.</li>
<li><code>@SpringBootTest</code> starts the full app for integration tests.</li>
</ul>`,
      example: `@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    SecurityFilterChain api(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())                 // stateless token API
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.GET, "/api/jobs/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .httpBasic(Customizer.withDefaults())          // simple for learning; use JWT in real apps
            .build();
    }

    @Bean
    PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
}

@WebMvcTest(JobController.class)
class JobControllerTest {
    @Autowired MockMvc mvc;
    @MockitoBean JobService service;   // @MockBean before Spring Boot 3.4

    @Test
    void returns404WhenJobMissing() throws Exception {
        when(service.get(99L)).thenThrow(new JobNotFoundException(99L));
        mvc.perform(get("/api/jobs/99")).andExpect(status().isNotFound());
    }
}`,
      output: `GET /api/jobs            → 200 OK (public)
POST /api/jobs           → 401 Unauthorized (no credentials)
GET /api/admin/reports   → 403 Forbidden (logged in, not ADMIN)

[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS`,
      points: ["Spring Security secures all endpoints until you open them up.", "Always hash passwords with BCrypt.", "401 = not logged in; 403 = logged in but not allowed.", "Unit-test services with Mockito; test controllers with MockMvc."],
      practice: "Write a unit test for JobService.get() using Mockito: one test where the repository returns a job and one where it's empty and the exception is thrown.",
      quiz: { q: "A logged-in user without the ADMIN role calls an admin endpoint. What status should they get?", options: ["200", "401", "403", "404"], answer: 2, why: "403 Forbidden means the user is authenticated but not authorised for that resource." },
      interview: [
        ["How do you secure a Spring Boot REST API?", "Add Spring Security, define a SecurityFilterChain that sets public and protected URLs, authenticate with JWT or OAuth2 tokens for stateless APIs, hash passwords with BCrypt, use role checks (@PreAuthorize), enable HTTPS and validate input."],
        ["What is the difference between @WebMvcTest and @SpringBootTest?", "@WebMvcTest loads only the web layer (controllers, advice, filters) with mocked services, so it's fast. @SpringBootTest loads the whole application context for full integration tests."]
      ],
      further: [["Spring Security reference", "https://docs.spring.io/spring-security/reference/index.html"], ["Testing Spring Boot apps", SPRING + "reference/testing/index.html"]]
    },
    {
      slug: "production",
      title: "Profiles, Actuator & deployment",
      summary: "Environment profiles, health checks with Actuator, building a JAR and running in Docker.",
      body: `<p>Before going live, an app needs environment-specific config, health checks and a repeatable build.</p>
<ul>
<li><strong>Profiles</strong>: <code>application-dev.yml</code> and <code>application-prod.yml</code>, chosen with <code>SPRING_PROFILES_ACTIVE=prod</code>.</li>
<li><strong>Secrets</strong> come from environment variables or a secrets manager — never commit them.</li>
<li><strong>Actuator</strong> adds endpoints such as <code>/actuator/health</code> for load balancers and Kubernetes probes, and metrics for monitoring. Expose only what you need.</li>
<li><strong>Build</strong> a runnable JAR with <code>./mvnw clean package</code>, then run <code>java -jar target/app.jar</code>.</li>
<li><strong>Docker</strong>: copy the JAR into a small Java runtime image.</li>
</ul>`,
      example: `# application-prod.yml
spring:
  datasource:
    url: jdbc:postgresql://db:5432/jobs
    username: app
    password: \${DB_PASSWORD}
management:
  endpoints:
    web:
      exposure:
        include: health,info

# Dockerfile
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/jobs-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

# terminal
$ ./mvnw clean package
$ docker build -t jobs-api .
$ docker run -p 8080:8080 -e SPRING_PROFILES_ACTIVE=prod -e DB_PASSWORD=*** jobs-api`,
      output: `[INFO] BUILD SUCCESS
Successfully tagged jobs-api:latest
The following 1 profile is active: "prod"
Tomcat started on port 8080 (http)

$ curl localhost:8080/actuator/health
{"status":"UP"}`,
      points: ["Use profiles for dev/test/prod settings.", "Read secrets from environment variables.", "Actuator health endpoints feed load balancers and probes.", "Package as a JAR and run it in a slim Docker image."],
      practice: "Add a dev profile that uses H2 and a prod profile that uses PostgreSQL, then run the app with each profile and check /actuator/health.",
      quiz: { q: "Which Actuator endpoint do load balancers usually call?", options: ["/actuator/beans", "/actuator/health", "/actuator/env", "/actuator/shutdown"], answer: 1, why: "The health endpoint reports UP or DOWN, which load balancers and Kubernetes probes use to decide whether to send traffic." },
      interview: [
        ["How do you manage configuration for different environments?", "Use Spring profiles with application-{profile}.yml files, activate one with SPRING_PROFILES_ACTIVE, and inject secrets via environment variables or a vault, so the same JAR runs in every environment."],
        ["What is Spring Boot Actuator?", "A module that adds production endpoints: health checks, metrics, info, environment and more. They're used for monitoring and orchestration; sensitive endpoints should be secured or left unexposed."]
      ],
      further: [["Actuator", SPRING + "reference/actuator/index.html"], ["Profiles", SPRING + "reference/features/profiles.html"]]
    }
  ]
};
