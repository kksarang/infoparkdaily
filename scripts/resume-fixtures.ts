import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { Store } from "../services/resume-api/store.ts";
import { Renderer } from "../services/resume-worker/worker.ts";
import { sampleResume, blankResume } from "../js/resume-builder/schema.js";
const store = new Store(resolve(".local/fixture.sqlite"));
const renderer = new Renderer(store, resolve(".local/artifacts"));
const out = resolve("artifacts/resume-builder");
mkdirSync(out, { recursive: true });
const fresher = sampleResume();
fresher.personal.headline = "Computer Science Graduate";
fresher.experience = [];
const experienced = sampleResume();
experienced.experience = Array.from({ length: 4 }, (_, i) => ({
  ...experienced.experience[0],
  id: "long-exp-" + i,
  employer: "Example Company " + (i + 1),
  bullets: [
    ...experienced.experience[0].bullets,
    "Documented technical decisions and supported peers through code reviews and knowledge-sharing sessions.",
    "Worked with cross-functional teams to investigate issues and deliver maintainable improvements.",
  ],
}));
const edge = sampleResume();
edge.personal.name = "ANANYA MENON — José François Müller";
edge.personal.portfolio =
  "https://example.com/portfolio/" + "long-portfolio-path-".repeat(9);
edge.summary += "\nUnicode check: résumé, café, naïve. മലയാളം.";
edge.customSections = [
  {
    id: "volunteering",
    heading: "Volunteering",
    title: "Community volunteer",
    bullets: ["Organized community events and supported new members."],
  },
];
edge.sectionOrder.push("volunteering");
const empty = blankResume();
empty.personal.name = "Minimal Resume";
empty.summary = "A brief professional introduction.";
const fixtures = { fresher, experienced, edge, empty };
const results = [];
try {
  for (const template of store.templates()) {
    await renderer.thumbnail(template);
    for (const [name, data] of Object.entries(fixtures)) {
      const file = `${template.id}-${name}.pdf`;
      writeFileSync(
        join(out, file),
        await renderer.render(data, template, "pdf"),
      );
      results.push({
        template: template.id,
        fixture: name,
        file,
        expectedName: data.personal.name,
      });
    }
    console.log("Rendered " + template.name);
  }
  writeFileSync(join(out, "manifest.json"), JSON.stringify(results, null, 2));
  console.log(
    `Rendered ${results.length} PDF fixtures and ${store.templates().length} catalog thumbnails.`,
  );
} finally {
  await renderer.close();
  store.db.close();
}
