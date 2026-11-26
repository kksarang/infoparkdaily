#!/usr/bin/env node
/* Add two jobs sent directly as official links, each confirmed open on the employer's own careers page on 26 Nov 2026, pinned at the top of JOBS:
 * ClickHouse Full Stack Software Engineer – Postgres (Ashby 8d7ef0a5-…, remote, India / Bengaluru listed) and
 * Delta Air Lines (Delta Technology Hub) Associate Software Developer, Bangalore (Avature REF 27802).
 * Only details stated on the official listing are used; anything not stated stays empty.
 * Skips any job whose id is already in jobs-data.js. */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "jobs-data.js");
const NOTE = "Job details can change after publishing. Always verify the opening on the employer's official channel before applying. InfoparkDaily is not a recruiter and never collects money for jobs. Never pay anyone for an application or interview.";

const job = (o) => ({
  logo: "", experienceRange: "", employmentType: "", applyDeadline: "Rolling", postedDate: "2026-11-26",
  source: "Direct", verified: true, verificationNote: NOTE, tags: [], isWalkIn: false, walkInDate: "",
  email: "", phone: "", website: "", address: "", industry: "", companyDetails: "", workDetails: "",
  workStatus: "", workMode: "", experienceYears: "", salaryRange: "", qualification: "", skills: [],
  requirements: [], responsibilities: [], benefits: [], howToApply: "", hiringNotes: "",
  description: "", startingDate: "", ...o,
});

const seen = (d) => `Confirmed open on the employer's official careers page on 26 Nov 2026. Official posting date: ${d}.`;

const JOBS_NEW = [
  job({ id: "delta-tech-hub-associate-software-developer-bangalore-27802", company: "Delta Air Lines (Delta Technology Hub)",
    companyBlurb: "Delta Technology Hub · Associate Software Developer (Enterprise Payments) · Bangalore · 0–2 years · Java, Spring Boot, AWS",
    location: "Bengaluru, Karnataka", roles: ["Associate Software Developer"], experience: "both", experienceRange: "0–2 years (internships and academic projects count)",
    employmentType: "Full-time", postedDate: "2026-11-22", hiringNotes: seen("22 Nov 2026 (REF # 27802)"),
    applyLink: "https://dth.avature.net/en_US/careers/JobDetail?jobId=27802",
    tags: ["Delta Air Lines", "Java", "Spring Boot", "AWS", "Microservices", "Freshers"],
    website: "https://www.deltatechhub.com", industry: "Airline technology (Delta Air Lines GTH – Information Technology)",
    qualification: "Bachelor's or Master's degree in Computer Science, Information Technology or a related field",
    skills: ["Java", "Spring Boot", "REST APIs", "Microservices", "AWS", "SQL (Oracle / MySQL / PostgreSQL)", "Git", "CI/CD", "AI-assisted development tools"],
    workDetails: "Early-career backend role in Delta's Enterprise Payments team, building secure and scalable payment services, APIs and cloud applications alongside experienced engineers at the Delta Technology Hub, Bangalore.",
    responsibilities: ["Develop and maintain backend applications in Java and Spring Boot", "Build and consume REST APIs for microservices-based applications", "Help develop and deploy applications on AWS", "Work with product owners, architects and senior engineers on business solutions", "Take part in code reviews and act on feedback", "Troubleshoot application issues and support production", "Contribute to CI/CD pipelines and Agile practices", "Write unit tests and meet quality and security standards"],
    requirements: ["Bachelor's or Master's in Computer Science, IT or a related field", "0–2 years of software development experience, including internships, academic projects or full-time work", "Java fundamentals and object-oriented design", "Understanding of Spring Boot, REST APIs and basic microservices", "Familiarity with Oracle, MySQL or PostgreSQL and with Git", "Basic cloud concepts; AWS exposure is a plus", "Data structures, algorithms and software engineering fundamentals", "Hands-on use of AWS AI/ML services (SageMaker, Bedrock, AgentCore) through projects, internships, hackathons or work", "Experience with AI-assisted coding tools (e.g. GitHub Copilot, Claude, Kiro) and an understanding of prompt engineering and RAG concepts"],
    benefits: ["Medical insurance", "Transport to and from the office", "Complimentary cafeteria meals", "Travel privileges", "Car lease programme", "Paid time off and parental benefits", "National Pension Scheme"],
    howToApply: "Apply on the Delta careers site (REF # 27802).", description: "Entry-level Java / Spring Boot / AWS developer in Delta's Enterprise Payments team at the Delta Technology Hub, Bangalore." }),
  job({ id: "clickhouse-full-stack-software-engineer-postgres-remote-india-8d7ef0a5", company: "ClickHouse",
    companyBlurb: "ClickHouse · Full Stack Software Engineer – Managed Postgres · Remote (India / Bengaluru listed) · 1–4 years · React, TypeScript",
    location: "Remote (India – Bengaluru listed; also US, Canada, UK, Australia, Netherlands)", roles: ["Full Stack Software Engineer – Postgres"],
    experience: "experienced", experienceRange: "1–4 years", employmentType: "Full-time", workMode: "Remote",
    hiringNotes: seen("6 Oct 2026") + " The listing publishes pay ranges only for US locations, so no India salary is shown here.",
    applyLink: "https://jobs.ashbyhq.com/clickhouse/8d7ef0a5-5a0a-4598-b39d-c4c0ac011547",
    tags: ["ClickHouse", "React", "TypeScript", "Full Stack", "Postgres", "Remote"],
    website: "https://clickhouse.com/company/careers", industry: "Cloud databases / real-time analytics",
    skills: ["React", "TypeScript", "State management", "REST APIs", "Node.js / Go (plus)", "Postgres / SQL (nice to have)", "Accessibility (WCAG)", "Data visualisation"],
    workDetails: "Engineering role on the Managed Postgres team building the ClickHouse Cloud interface for creating, managing, monitoring and scaling Postgres databases. Remote-friendly company operating in over 25 countries.",
    responsibilities: ["Turn designs and user requirements into high-quality interfaces for Managed Postgres in ClickHouse Cloud", "Build features end to end with React and TypeScript, integrating with and contributing to backend APIs", "Build data-rich UIs for metrics, diagnostics, backups, replication and performance insights", "Contribute to click-ui, ClickHouse's open-source design system", "Give product and design feedback from a developer's point of view"],
    requirements: ["1–4 years in frontend or full-stack development", "Solid React, TypeScript and modern frontend fundamentals (state management, component architecture, data fetching)", "Comfortable with REST APIs; Node.js, Go or similar is a plus", "Enjoys working with designers and backend engineers in a global team", "Nice to have: Postgres / SQL or database tooling, WCAG accessibility, dashboards or data visualisation, open-source contributions"],
    benefits: ["Flexible, remote-friendly work", "Employer healthcare contributions", "Equity for eligible new joiners", "Flexible / generous time off", "USD 500 home-office setup for remote employees", "Company-wide in-person offsites"],
    howToApply: "Apply on ClickHouse's Ashby job page.", description: "Remote full-stack (React / TypeScript) engineer building ClickHouse Cloud's Managed Postgres experience; India is a listed location." }),
];

let text = readFileSync(FILE, "utf8");
const fresh = JOBS_NEW.filter((j) => !text.includes(`id: "${j.id}"`));
if (!fresh.length) { console.log("Nothing new"); process.exit(0); }
const pins = [...text.matchAll(/pinOrder: (\d+),/g)].map((m) => +m[1]);
if (new Set(pins).size !== pins.length) throw new Error("Duplicate pinOrder values");
text = text.replace(/pinOrder: (\d+),/g, (_, n) => `pinOrder: ${+n + fresh.length},`);
const render = (j, i) => {
  const body = Object.entries({ ...j, pinOrder: i + 1 })
    .map(([k, v]) => `    ${k}: ${JSON.stringify(v)},`).join("\n");
  return `  {\n${body}\n  },\n`;
};
text = text.replace("var JOBS = [\n", "var JOBS = [\n" + fresh.map(render).join(""));
writeFileSync(FILE, text);
console.log(`Added ${fresh.length}: ${fresh.map((j) => j.id).join(", ")}`);
