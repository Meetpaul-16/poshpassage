/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/home", permanent: true },
      { source: "/index.html", destination: "/home", permanent: true },
      { source: "/home.html", destination: "/home", permanent: true },
      { source: "/services", destination: "/service", permanent: true },
      { source: "/services.html", destination: "/service", permanent: true },
      { source: "/service.html", destination: "/service", permanent: true },
      { source: "/book.html", destination: "/book", permanent: true },
      { source: "/book-a-ride", destination: "/book", permanent: true },
      { source: "/book-a-ride.html", destination: "/book", permanent: true },
    ];
  },
};

export default nextConfig;
