/** Sync js/resume-builder/catalog.js from services/resume-api/catalog.ts */
import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const tsPath = new URL("../services/resume-api/catalog.ts", import.meta.url);
const jsPath = new URL("../js/resume-builder/catalog.js", import.meta.url);

// Load TS via Node's experimental strip-types by dynamic import of a data URL wrapper
const { catalog } = await import(
  pathToFileURL(tsPath.pathname).href + "?t=" + Date.now()
);

const existing = readFileSync(jsPath, "utf8");
const helpersMatch = existing.match(/\nexport function thumbnail[\s\S]*$/);
if (!helpersMatch) {
  throw new Error("Could not find thumbnail helpers in catalog.js");
}

const header =
  "/** Generated from services/resume-api/catalog.ts. All published templates are free; configs are public. */\n";
const body =
  header +
  "export const catalog = " +
  JSON.stringify(catalog, null, 2) +
  ";" +
  helpersMatch[0];

writeFileSync(jsPath, body);
console.log(`Synced ${catalog.length} templates → js/resume-builder/catalog.js`);
