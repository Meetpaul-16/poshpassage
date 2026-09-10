import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";

const pageConfig = {
  home: ["index.html", "Surrey Limousine & Party Bus Service | Posh Passage", "Chauffeured stretch limousines and party buses serving Surrey, Metro Vancouver, Fraser Valley, and Whistler. Available 24/7. Request a quote today."],
  about: ["about.html", "About Our Surrey Chauffeur Service | Posh Passage Limousines", "Learn about Posh Passage Limousines, a Surrey-based chauffeur service providing punctual, professional travel across Metro Vancouver and the Lower Mainland."],
  service: ["services.html", "Limousine & Party Bus Services in Metro Vancouver | Posh Passage", "Chauffeured airport transfers, wedding limos, corporate travel, party buses, wine tours and Whistler trips from Surrey across Metro Vancouver and the Lower Mainland."],
  fleet: ["fleet.html", "Stretch Limousines & Party Buses in Surrey, BC | Posh Passage", "Explore Posh Passage stretch limousines and party buses for weddings, airport transfers, group outings and events throughout the Lower Mainland."],
  book: ["book.html", "Book a Limousine or Party Bus in Surrey, BC | Posh Passage", "Request your chauffeur-driven limousine or party bus in Surrey, Metro Vancouver, the Fraser Valley or Whistler. Get a ride quote from Posh Passage Limousines."],
  faq: ["faq.html", "Limousine & Party Bus FAQ | Posh Passage Limousines", "Get answers about booking a limousine or party bus with Posh Passage Limousines, including service areas, pricing, deposits, airport pickups and Whistler trips."],
  contact: ["contact.html", "Contact a Surrey Limousine Service | Posh Passage Limousines", "Contact Posh Passage Limousines to book a chauffeur, limousine or party bus in Surrey, Metro Vancouver and the Lower Mainland. Call (672) 377-3932."],
  "surrey-wedding-limo": ["surrey-wedding-limo.html", "Wedding Limousine Rental Surrey BC | Posh Passage", "Book a wedding limousine rental in Surrey, BC with Posh Passage. Chauffeured transportation for ceremonies, receptions, wedding parties and guests."],
  "yvr-airport-transfer-limo": ["yvr-airport-transfer-limo.html", "Surrey to YVR Airport Limo Service | Posh Passage", "Reserve a reliable Surrey to YVR airport limo service with Posh Passage. Enjoy professional chauffeurs, flexible pickup times and comfortable airport transfers."],
  "vancouver-party-bus-rental": ["vancouver-party-bus-rental.html", "Party Bus Rental Surrey Vancouver | Posh Passage", "Plan your celebration with a party bus rental from Surrey to Vancouver. Posh Passage provides comfortable group transportation for events and nights out."],
  "whistler-limousine-transfer": ["whistler-limousine-transfer.html", "Whistler Limo Service Sea to Sky | Posh Passage", "Travel in comfort with Whistler limo service along the Sea to Sky corridor. Posh Passage offers private chauffeured transfers from Surrey and Metro Vancouver."],
};

function getPage(slug = []) {
  const key = slug.join("/").replace(/\.html$/, "");
  return pageConfig[key] || pageConfig[key === "index" ? "home" : key === "services" ? "service" : key];
}

function extractBody(html) {
  const template = html.match(/<template id="(?:page|home)-template">([\s\S]*?)<\/template>/i);
  return template?.[1] || html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html;
}

function canonicalPath(slug = []) {
  const key = slug.join("/").replace(/\.html$/, "");
  return key === "" || key === "index" ? "/home" : key === "services" ? "/service" : `/${key}`;
}

export async function generateStaticParams() {
  return Object.keys(pageConfig).map((key) => ({ slug: key ? key.split("/") : [] }));
}

export async function generateMetadata({ params }) {
  const page = getPage((await params).slug);
  if (!page) return {};
  return {
    title: page[1],
    description: page[2],
    alternates: { canonical: canonicalPath((await params).slug) },
    openGraph: { title: page[1], description: page[2], type: "website" },
  };
}

export default async function Page({ params }) {
  const slug = (await params).slug || [];
  const page = getPage(slug);
  if (!page) notFound();

  const html = await readFile(path.join(process.cwd(), page[0]), "utf8");
  return <div dangerouslySetInnerHTML={{ __html: extractBody(html) }} />;
}
