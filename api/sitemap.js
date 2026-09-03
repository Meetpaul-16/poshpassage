const paths = ["/", "/about", "/services", "/fleet", "/book-a-ride", "/faq", "/contact"];

export default function handler(request, response) {
  const host = request.headers.host;
  const protocol = request.headers["x-forwarded-proto"] || "https";
  const origin = `${protocol}://${host}`;
  const urls = paths.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join("\n");

  response.setHeader("Content-Type", "application/xml; charset=utf-8");
  response.setHeader("Cache-Control", "public, max-age=0, s-maxage=86400");
  response.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
}
