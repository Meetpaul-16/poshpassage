export default function handler(request, response) {
  const host = request.headers.host;
  const protocol = request.headers["x-forwarded-proto"] || "https";
  const origin = `${protocol}://${host}`;

  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  response.setHeader("Cache-Control", "public, max-age=0, s-maxage=86400");
  response.status(200).send(`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
}
