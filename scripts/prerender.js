import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const pages = ["index.html", "about.html", "services.html", "fleet.html", "book-a-ride.html", "faq.html", "contact.html"];
const templatePattern = /<template id="(?:page|home)-template">([\s\S]*?)<\/template>\s*<div id="root"><\/div>/;

await Promise.all(pages.map(async (page) => {
  const file = resolve("dist", page);
  const html = await readFile(file, "utf8");
  const rendered = html.replace(templatePattern, '<div id="root">$1</div>');

  if (rendered === html) {
    throw new Error(`Could not statically render ${page}: page template was not found.`);
  }
  await writeFile(file, rendered);
}));
