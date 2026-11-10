/* Field-wise interview guides (/interview/questions/<slug>/). Original InfoparkDaily content.
 *
 * Each guide module exports:
 *   meta     { slug, field: "it" | "nonit", name, count, topics, level }
 *            slug matches the learning path slug, so the path links to its guide.
 *   text     "## Section", "### Question", then the answer.
 *            In answers: "- " bullet, "1. " numbered step, ``` code block ```,
 *            "| a | b |" table rows (first row = header), `inline code`, **bold**.
 *   practice [[area, task], ...] practical tasks shown at the end.
 * Add a module here and run: npm run build:journey
 */
import * as webDevelopment from "./web-development.mjs";
import * as javaBackend from "./java-backend.mjs";
import * as pythonDevelopment from "./python-development.mjs";
import * as sqlDatabases from "./sql-databases.mjs";
import * as softwareTesting from "./software-testing.mjs";
import * as dataAnalyst from "./data-analyst.mjs";
import * as devopsCloud from "./devops-cloud.mjs";

export const GUIDES = [webDevelopment, javaBackend, pythonDevelopment, sqlDatabases, softwareTesting, dataAnalyst, devopsCloud];
