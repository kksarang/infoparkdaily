/* Java tutorial — original InfoparkDaily lessons. Examples show code and its expected output (run them with a local JDK). */

const DEVJAVA = "https://dev.java/learn/";

export const JAVA_TRACK = {
  key: "java",
  name: "Java",
  long: "Java — object-oriented programming for backend careers",
  color: "#b07219",
  tagline: "OOP and backend foundations.",
  level: "Beginner",
  lang: "static",
  feature: "Code + expected output",
  heroLine: "Every lesson has a complete program with its expected output",
  exampleTitle: "Example program",
  exampleBadge: "Run with JDK 17+: java Main.java",
  outputTitle: "Output",
  exampleNote: "Save the code as <code>Main.java</code> and run <code>java Main.java</code> (JDK 11+ runs single files directly). Names and figures are fictional.",
  lessons: [
    {
      slug: "introduction",
      title: "Java introduction",
      summary: "What Java is used for, the JDK, and the structure of a Java program.",
      body: `<p>Java is a strongly typed, object-oriented language that runs on the <strong>Java Virtual Machine (JVM)</strong>. Code is compiled to <em>bytecode</em>, which the JVM runs on any operating system — “write once, run anywhere”. It powers large backend systems (Spring Boot), Android apps, banking software and big-data tools, and is one of the most hired-for skills in Technopark and Infopark.</p>
<h3>Setup</h3>
<p>Install a <strong>JDK</strong> (Java Development Kit) — version 17 or 21 (long-term support). Check with <code>java -version</code>. IntelliJ IDEA Community and VS Code are popular free editors.</p>
<h3>Program structure</h3>
<ul>
<li>All code lives inside a <strong>class</strong>.</li>
<li>Execution starts at <code>public static void main(String[] args)</code>.</li>
<li>Statements end with <code>;</code>, blocks use <code>{ }</code>, and Java is case-sensitive.</li>
</ul>`,
      example: `public class Main {
    public static void main(String[] args) {
        // Print a line of text
        System.out.println("Hello from Java!");
        System.out.println("2 + 3 = " + (2 + 3));
    }
}`,
      output: `Hello from Java!
2 + 3 = 5`,
      points: ["Java runs on the JVM via bytecode.", "main() is the entry point.", "Every statement ends with a semicolon."],
      practice: "Write a program that prints your name, then the number of days in 3 weeks calculated with multiplication.",
      quiz: { q: "Where does a Java program start running?", options: ["The first line of the file", "The main method", "The constructor", "The import statements"], answer: 1, why: "The JVM calls public static void main(String[] args)." },
      interview: [
        ["JDK vs JRE vs JVM?", "The JVM runs bytecode. The JRE is the JVM plus core libraries needed to run programs. The JDK is the JRE plus development tools such as the compiler (javac)."],
        ["Why is Java called platform independent?", "Source compiles to bytecode, and any OS with a JVM can run that same bytecode."]
      ],
      further: [["dev.java: Getting started", DEVJAVA + "getting-started/"]]
    },
    {
      slug: "variables-types",
      title: "Variables & data types",
      summary: "Primitive types, String, type casting and var.",
      body: `<p>Java is <strong>statically typed</strong>: every variable has a type fixed at compile time.</p>
<ul>
<li><strong>Primitives</strong>: <code>int</code> (whole numbers), <code>long</code> (big whole numbers), <code>double</code> (decimals), <code>boolean</code> (<code>true</code>/<code>false</code>), <code>char</code> (one character), plus <code>byte</code>, <code>short</code>, <code>float</code>.</li>
<li><strong>String</strong> — text, an object (capital S), written in double quotes.</li>
<li><code>final</code> makes a variable constant.</li>
<li><code>var</code> lets the compiler infer the type of a local variable (Java 10+).</li>
</ul>
<p>Converting a larger type to a smaller one needs an explicit <strong>cast</strong>: <code>(int) 7.9</code> gives 7. Text to number uses <code>Integer.parseInt("42")</code>.</p>`,
      example: `public class Main {
    public static void main(String[] args) {
        String name = "Anu";
        int experienceYears = 2;
        double expectedLpa = 6.5;
        boolean isFresher = experienceYears == 0;
        final int MONTHS = 12;
        var city = "Kochi";            // inferred as String

        double monthly = expectedLpa * 100000 / MONTHS;
        System.out.println(name + " | " + city + " | fresher: " + isFresher);
        System.out.println("Monthly: " + (int) monthly);
        System.out.println("Notice days + 15 = " + (Integer.parseInt("30") + 15));
    }
}`,
      output: `Anu | Kochi | fresher: false
Monthly: 54166
Notice days + 15 = 45`,
      points: ["Types are fixed at compile time.", "String is an object; primitives are not.", "Cast down explicitly; parse text with parseInt / parseDouble."],
      practice: "Store a monthly salary as an int and print the yearly salary as a long, and the average daily pay as a double.",
      quiz: { q: "What is (int) 9.99?", options: ["10", "9", "9.99", "Compile error"], answer: 1, why: "Casting a double to int drops the decimal part (truncates), giving 9." },
      interview: [
        ["Primitive vs wrapper types?", "Primitives (int, double) hold raw values. Wrapper classes (Integer, Double) are objects, can be null and are needed for collections. Java converts between them automatically (autoboxing)."],
        ["Why is String immutable?", "So strings can be shared safely (string pool), used as map keys, and passed between threads without copying."]
      ],
      further: [["dev.java: Primitive types", DEVJAVA + "language-basics/primitive-types/"]]
    },
    {
      slug: "conditions",
      title: "Operators, if & switch",
      summary: "Comparisons, logical operators, if / else and modern switch expressions.",
      body: `<p>Comparison operators: <code>== != &lt; &gt; &lt;= &gt;=</code>. Logical: <code>&amp;&amp;</code> (and), <code>||</code> (or), <code>!</code> (not). For <strong>Strings</strong>, compare contents with <code>.equals()</code>, not <code>==</code>.</p>
<p><code>if / else if / else</code> picks a branch. The ternary <code>cond ? a : b</code> picks a value.</p>
<h3>Switch expressions (Java 14+)</h3>
<pre><code>String level = switch (years) {
    case 0 -&gt; "Fresher";
    case 1, 2, 3 -&gt; "Junior";
    default -&gt; "Senior";
};</code></pre>
<p>The arrow form has no fall-through, so no <code>break</code> is needed.</p>`,
      example: `public class Main {
    public static void main(String[] args) {
        int score = 72;
        String city = new String("Kochi");

        if (score >= 80) {
            System.out.println("Excellent");
        } else if (score >= 60) {
            System.out.println("Shortlisted");
        } else {
            System.out.println("Try again");
        }

        System.out.println(city == "Kochi");        // compares references
        System.out.println(city.equals("Kochi"));   // compares text

        int years = 2;
        String level = switch (years) {
            case 0 -> "Fresher";
            case 1, 2, 3 -> "Junior";
            default -> "Senior";
        };
        System.out.println("Level: " + level);
    }
}`,
      output: `Shortlisted
false
true
Level: Junior`,
      points: ["Use .equals() for String contents.", "Arrow switch: no fall-through, can return a value.", "&& and || short-circuit."],
      practice: "Using a switch expression, convert a day number (1–7) into its weekday name, with \"Invalid\" as the default.",
      quiz: { q: "How should you compare two Strings' text?", options: ["a == b", "a.equals(b)", "a = b", "a.compare(b) == true"], answer: 1, why: "== compares object references; equals() compares the characters." },
      interview: [
        ["== vs equals()?", "== checks whether two references point to the same object (or compares primitive values). equals() checks logical equality as defined by the class."],
        ["What is short-circuit evaluation?", "With && and ||, the right side is evaluated only if needed — e.g. obj != null && obj.isValid() avoids a NullPointerException."]
      ],
      further: [["dev.java: Control flow statements", DEVJAVA + "language-basics/controlling-flow/"]]
    },
    {
      slug: "loops-arrays",
      title: "Loops & arrays",
      summary: "for, enhanced for, while, and working with arrays.",
      body: `<p>An <strong>array</strong> holds a fixed number of values of one type: <code>int[] marks = {72, 88, 65};</code>. Index from 0; <code>marks.length</code> gives the size. Reading past the end throws <code>ArrayIndexOutOfBoundsException</code>.</p>
<ul>
<li><code>for (int i = 0; i &lt; n; i++)</code> — counted loop.</li>
<li><code>for (int m : marks)</code> — enhanced for: every element, read-only access.</li>
<li><code>while (cond)</code> and <code>do { } while (cond)</code> (runs at least once).</li>
<li><code>break</code> and <code>continue</code> work as in other languages.</li>
</ul>
<p><code>java.util.Arrays</code> has helpers: <code>Arrays.sort(arr)</code>, <code>Arrays.toString(arr)</code>.</p>`,
      example: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] marks = {72, 88, 65, 91, 58};

        int total = 0;
        for (int m : marks) {
            total += m;
        }
        System.out.println("Average: " + (double) total / marks.length);

        int highest = marks[0];
        for (int i = 1; i < marks.length; i++) {
            if (marks[i] > highest) highest = marks[i];
        }
        System.out.println("Highest: " + highest);

        Arrays.sort(marks);
        System.out.println(Arrays.toString(marks));
    }
}`,
      output: `Average: 74.8
Highest: 91
[58, 65, 72, 88, 91]`,
      points: ["Arrays have fixed length.", "Enhanced for is simplest for reading every item.", "Arrays.sort / Arrays.toString save time."],
      practice: "Count how many marks in the array are 70 or above and print the count.",
      quiz: { q: "What is the last valid index of an array of length 5?", options: ["5", "4", "6", "0"], answer: 1, why: "Indexes run from 0 to length − 1, so 0–4." },
      interview: [
        ["Array vs ArrayList?", "An array has a fixed size and can hold primitives. ArrayList grows automatically, holds objects only and offers methods like add and remove."],
        ["How do you reverse an array in place?", "Swap elements from both ends moving inward: for i from 0 to n/2, swap arr[i] and arr[n-1-i]."]
      ],
      further: [["dev.java: Arrays", DEVJAVA + "language-basics/arrays/"]]
    },
    {
      slug: "methods",
      title: "Methods",
      summary: "Defining methods, parameters, return types and overloading.",
      body: `<p>A <strong>method</strong> is a named block of code inside a class. Its signature lists the return type, name and parameters:</p>
<pre><code>static double monthlySalary(double lpa) {
    return lpa * 100000 / 12;
}</code></pre>
<ul>
<li><code>void</code> means the method returns nothing.</li>
<li><code>static</code> methods belong to the class and can be called without creating an object (useful in <code>main</code>).</li>
<li><strong>Overloading</strong>: several methods with the same name but different parameter lists.</li>
<li>Java passes arguments <strong>by value</strong> — for objects, the value is a copy of the reference.</li>
</ul>`,
      example: `public class Main {
    static double monthlySalary(double lpa) {
        return lpa * 100000 / 12;
    }

    static String greet(String name) {
        return "Hello, " + name;
    }

    static String greet(String name, String city) {   // overload
        return "Hello, " + name + " from " + city;
    }

    static boolean isEligible(int age, double cgpa) {
        return age >= 18 && age <= 28 && cgpa >= 6.5;
    }

    public static void main(String[] args) {
        System.out.printf("Monthly: %.2f%n", monthlySalary(6));
        System.out.println(greet("Rahul"));
        System.out.println(greet("Rahul", "Thrissur"));
        System.out.println(isEligible(23, 7.2));
    }
}`,
      output: `Monthly: 50000.00
Hello, Rahul
Hello, Rahul from Thrissur
true`,
      points: ["Signature = return type + name + parameters.", "void returns nothing.", "Overloading = same name, different parameters."],
      practice: "Write a method maxOf(int a, int b, int c) that returns the largest of three numbers, and call it from main.",
      quiz: { q: "What does the return type void mean?", options: ["Returns null", "Returns nothing", "Returns 0", "Can return any type"], answer: 1, why: "void methods perform actions and don't return a value." },
      interview: [
        ["Is Java pass-by-value or pass-by-reference?", "Always pass-by-value. For objects, the reference is copied, so a method can change the object's fields but cannot make the caller's variable point to a different object."],
        ["Overloading vs overriding?", "Overloading: same method name, different parameters, in the same class (compile-time). Overriding: a subclass redefines a parent method with the same signature (run-time polymorphism)."]
      ],
      further: [["dev.java: Defining methods", DEVJAVA + "classes-objects/defining-methods/"]]
    },
    {
      slug: "classes-objects",
      title: "Classes & objects",
      summary: "Fields, constructors, this, encapsulation with getters, and records.",
      body: `<p>A <strong>class</strong> is a blueprint; an <strong>object</strong> is an instance created with <code>new</code>.</p>
<ul>
<li><strong>Fields</strong> hold an object's data; <strong>methods</strong> define its behaviour.</li>
<li>A <strong>constructor</strong> has the class's name and no return type; it sets up the new object. <code>this</code> refers to the current object.</li>
<li><strong>Encapsulation</strong>: make fields <code>private</code> and expose controlled access through public methods (getters, or methods that validate changes).</li>
<li><code>toString()</code> controls how an object prints.</li>
</ul>
<p>For simple data carriers, Java 16+ <strong>records</strong> generate the constructor, getters, <code>equals</code>, <code>hashCode</code> and <code>toString</code> for you: <code>record Job(String title, double lpa) {}</code>.</p>`,
      example: `public class Main {
    static class Candidate {
        private final String name;
        private int experience;

        Candidate(String name, int experience) {
            this.name = name;
            this.experience = experience;
        }

        String getName() { return name; }

        void addYear() { experience++; }

        boolean isSenior() { return experience >= 5; }

        @Override
        public String toString() {
            return name + " (" + experience + " yrs)";
        }
    }

    record Job(String title, double lpa) {}

    public static void main(String[] args) {
        Candidate c = new Candidate("Meera", 4);
        c.addYear();
        System.out.println(c + " senior? " + c.isSenior());

        Job job = new Job("Backend Developer", 9.5);
        System.out.println(job);
        System.out.println(job.title());
    }
}`,
      output: `Meera (5 yrs) senior? true
Job[title=Backend Developer, lpa=9.5]
Backend Developer`,
      points: ["new creates an object from a class.", "Private fields + public methods = encapsulation.", "Records are concise immutable data classes."],
      practice: "Create a BankAccount class with a private balance, deposit() and withdraw() methods, and refuse withdrawals larger than the balance.",
      quiz: { q: "What does a constructor do?", options: ["Deletes an object", "Initialises a new object", "Compiles the class", "Returns the class name"], answer: 1, why: "A constructor runs when you call new and sets up the object's initial state." },
      interview: [
        ["What are the four pillars of OOP?", "Encapsulation, inheritance, polymorphism and abstraction."],
        ["Why override equals() and hashCode() together?", "Hash-based collections use hashCode to find a bucket and equals to compare. Equal objects must have equal hash codes, or HashMap/HashSet lookups break."]
      ],
      further: [["dev.java: Classes and objects", DEVJAVA + "classes-objects/"], ["dev.java: Records", DEVJAVA + "records/"]]
    },
    {
      slug: "inheritance-interfaces",
      title: "Inheritance, interfaces & polymorphism",
      summary: "extends, super, @Override, abstract classes and interfaces.",
      body: `<ul>
<li><strong>Inheritance</strong>: <code>class Developer extends Employee</code> — the child reuses and extends the parent's fields and methods. Java allows one parent class.</li>
<li><code>super(...)</code> calls the parent's constructor; <code>@Override</code> marks a method that replaces the parent's version.</li>
<li>An <strong>abstract class</strong> can't be instantiated and may contain abstract methods that subclasses must implement.</li>
<li>An <strong>interface</strong> is a contract of methods. A class can implement many interfaces: <code>class Intern implements Payable, Reviewable</code>.</li>
<li><strong>Polymorphism</strong>: a variable of a parent/interface type can hold any subtype, and the right overridden method runs at run time.</li>
</ul>
<p>Prefer composition and small interfaces over deep inheritance chains.</p>`,
      example: `import java.util.List;

public class Main {
    interface Payable {
        double monthlyPay();
    }

    static abstract class Employee implements Payable {
        protected final String name;
        Employee(String name) { this.name = name; }
        abstract String role();
        public String toString() { return name + " — " + role() + " — ₹" + Math.round(monthlyPay()); }
    }

    static class Developer extends Employee {
        private final double lpa;
        Developer(String name, double lpa) { super(name); this.lpa = lpa; }
        String role() { return "Developer"; }
        public double monthlyPay() { return lpa * 100000 / 12; }
    }

    static class Intern extends Employee {
        private final double stipend;
        Intern(String name, double stipend) { super(name); this.stipend = stipend; }
        String role() { return "Intern"; }
        public double monthlyPay() { return stipend; }
    }

    public static void main(String[] args) {
        List<Payable> team = List.of(new Developer("Arjun", 8.4), new Intern("Diya", 15000));
        double total = 0;
        for (Payable p : team) {
            System.out.println(p);          // polymorphic toString / monthlyPay
            total += p.monthlyPay();
        }
        System.out.println("Payroll: ₹" + Math.round(total));
    }
}`,
      output: `Arjun — Developer — ₹70000
Diya — Intern — ₹15000
Payroll: ₹85000`,
      points: ["extends = inherit from one class.", "implements = fulfil one or more interfaces.", "Polymorphism: parent type, child behaviour."],
      practice: "Add a Manager subclass whose monthly pay is a fixed salary plus a 10% bonus, and include it in the team list.",
      quiz: { q: "How many classes can a Java class extend directly?", options: ["None", "One", "Two", "Unlimited"], answer: 1, why: "Java supports single class inheritance; multiple types are achieved with interfaces." },
      interview: [
        ["Abstract class vs interface?", "An abstract class can hold state (fields), constructors and partial implementation; a class can extend only one. Interfaces define a contract (with optional default methods) and a class can implement many."],
        ["What is runtime polymorphism?", "The JVM decides which overridden method to run based on the actual object type, not the variable type — dynamic dispatch."]
      ],
      further: [["dev.java: Inheritance", DEVJAVA + "inheritance/"], ["dev.java: Interfaces", DEVJAVA + "interfaces/"]]
    },
    {
      slug: "collections",
      title: "Collections & generics",
      summary: "List, Set, Map, generics and a first look at streams.",
      body: `<p>The <strong>Collections Framework</strong> provides ready-made data structures:</p>
<ul>
<li><code>List</code> (<code>ArrayList</code>) — ordered, allows duplicates, index access.</li>
<li><code>Set</code> (<code>HashSet</code>, <code>TreeSet</code>) — unique elements.</li>
<li><code>Map</code> (<code>HashMap</code>, <code>TreeMap</code>) — key → value lookups.</li>
<li><code>Queue</code>/<code>Deque</code> (<code>ArrayDeque</code>) — FIFO/LIFO processing.</li>
</ul>
<p><strong>Generics</strong> (<code>List&lt;String&gt;</code>) tell the compiler what type a collection holds, catching mistakes at compile time.</p>
<p><strong>Streams</strong> (Java 8+) process collections declaratively: <code>filter</code>, <code>map</code>, <code>sorted</code>, <code>collect</code>.</p>`,
      example: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> skills = new ArrayList<>(List.of("Java", "SQL", "Spring", "SQL", "Git"));
        Set<String> unique = new TreeSet<>(skills);
        System.out.println(unique);

        Map<String, Integer> openings = new HashMap<>();
        openings.put("Kochi", 12);
        openings.put("Thiruvananthapuram", 9);
        openings.merge("Kochi", 3, Integer::sum);      // add 3 more
        System.out.println("Kochi openings: " + openings.get("Kochi"));
        System.out.println(openings.getOrDefault("Kannur", 0));

        List<String> longSkills = skills.stream()
            .distinct()
            .filter(s -> s.length() > 3)
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        System.out.println(longSkills);
    }
}`,
      output: `[Git, Java, SQL, Spring]
Kochi openings: 15
0
[JAVA, SPRING]`,
      points: ["List = ordered; Set = unique; Map = key → value.", "Generics give compile-time type safety.", "Streams express filter/map/collect pipelines."],
      practice: "Count how many times each word appears in a List<String> using a HashMap and merge().",
      quiz: { q: "Which collection rejects duplicate elements?", options: ["ArrayList", "LinkedList", "HashSet", "ArrayDeque"], answer: 2, why: "Sets store each element at most once." },
      interview: [
        ["How does HashMap work internally?", "It hashes the key to pick a bucket in an array; collisions are stored in a linked list that becomes a balanced tree when large (Java 8+). get/put are O(1) on average."],
        ["ArrayList vs LinkedList?", "ArrayList gives fast random access and is usually faster overall. LinkedList allows cheap inserts/removals at known positions but slow index access."]
      ],
      further: [["dev.java: The Collections Framework", DEVJAVA + "api/collections-framework/"]]
    },
    {
      slug: "exceptions",
      title: "Exceptions",
      summary: "try / catch / finally, checked vs unchecked exceptions and try-with-resources.",
      body: `<p>An <strong>exception</strong> signals that something went wrong at run time. Unhandled, it stops the program with a stack trace.</p>
<ul>
<li><code>try { … } catch (Type e) { … } finally { … }</code> — handle errors; <code>finally</code> always runs.</li>
<li><strong>Checked</strong> exceptions (e.g. <code>IOException</code>) must be caught or declared with <code>throws</code>.</li>
<li><strong>Unchecked</strong> exceptions (<code>RuntimeException</code> subclasses such as <code>NullPointerException</code>, <code>IllegalArgumentException</code>) usually indicate bugs.</li>
<li><code>throw new IllegalArgumentException("…")</code> raises your own.</li>
<li><strong>try-with-resources</strong> closes files and connections automatically: <code>try (var reader = …) { }</code>.</li>
</ul>`,
      example: `public class Main {
    static int parseExperience(String text) {
        int years = Integer.parseInt(text);           // may throw NumberFormatException
        if (years < 0) {
            throw new IllegalArgumentException("Experience can't be negative");
        }
        return years;
    }

    public static void main(String[] args) {
        String[] inputs = {"3", "three", "-1"};
        for (String input : inputs) {
            try {
                System.out.println("Parsed: " + parseExperience(input));
            } catch (NumberFormatException e) {
                System.out.println("Not a number: " + input);
            } catch (IllegalArgumentException e) {
                System.out.println("Invalid: " + e.getMessage());
            } finally {
                System.out.println("-- checked " + input);
            }
        }
    }
}`,
      output: `Parsed: 3
-- checked 3
Not a number: three
-- checked three
Invalid: Experience can't be negative
-- checked -1`,
      points: ["Catch specific exceptions, most specific first.", "Checked exceptions must be handled or declared.", "Use try-with-resources for anything that needs closing."],
      practice: "Write safeDivide(int a, int b) that catches ArithmeticException for b = 0 and returns 0 with a message.",
      quiz: { q: "Which block always runs, whether or not an exception occurs?", options: ["catch", "throw", "finally", "throws"], answer: 2, why: "finally runs after try/catch in all normal and exceptional paths." },
      interview: [
        ["Checked vs unchecked exceptions?", "Checked exceptions are verified by the compiler and must be caught or declared (IOException). Unchecked exceptions extend RuntimeException and are not enforced (NullPointerException)."],
        ["throw vs throws?", "throw raises an exception object inside a method. throws in a method signature declares which checked exceptions the method may pass to its caller."]
      ],
      further: [["dev.java: Exceptions", DEVJAVA + "exceptions/"]]
    }
  ]
};
