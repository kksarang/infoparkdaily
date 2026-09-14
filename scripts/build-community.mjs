// Reuse the site's curated listings and render useful public HTML for search and slow connections.
import { readFile, writeFile } from "node:fs/promises";
import vm from "node:vm";
import { build } from "esbuild";
import { curatedJobs } from "../js/infoparkdaily/model.js";
import { header, footer, jobCard } from "../js/infoparkdaily/ui.js";
import { home, about, contact, directory } from "../js/infoparkdaily/public.js";
const context = { window: {} };
vm.createContext(context);
vm.runInContext(await readFile("data/jobs-data.js", "utf8"), context);
const raw = vm.runInContext("JOBS", context);
const jobs = curatedJobs(raw);
const state = { jobs, workers: [], savedIds: new Set(), filters: {}, page: 1 };
for (const route of ["", "jobs", "workers", "about", "contact"]) {
  globalThis.location = new URL(
    "https://infoparkdaily.online/infoparkdaily/" + (route ? route + "/" : ""),
  );
  let content =
    route === ""
      ? home(state)
      : route === "about"
        ? about()
        : route === "contact"
          ? contact()
          : directory(state, route);
  if (route === "jobs") {
    content = content
      .replace(
        '<div id="directory-results"></div>',
        '<div id="directory-results"><div class="grid three">' +
          jobs
            .slice(0, 12)
            .map((j, i) => jobCard(j, i))
            .join("") +
          "</div></div>",
      )
      .replace(
        'id="result-count" role="status"></strong>',
        'id="result-count" role="status">' +
          jobs.length +
          " opportunities found</strong>",
      );
  }
  const path = "infoparkdaily/" + (route ? route + "/" : "") + "index.html";
  const html = await readFile(path, "utf8");
  const shell =
    header(route) + '<main id="main">' + content + "</main>" + footer();
  await writeFile(
    path,
    html.replace(
      /<div id="app">[\s\S]*?<\/div><noscript>/,
      '<div id="app">' + shell + "</div><noscript>",
    ),
  );
}
await build({
  entryPoints: ["js/infoparkdaily/app.js"],
  bundle: true,
  minify: true,
  format: "esm",
  outfile: "js/infoparkdaily/app.bundle.js",
});
console.log(
  `Built InfoparkDaily with ${jobs.length} current curated listings.`,
);
