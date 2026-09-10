import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        about: resolve(import.meta.dirname, "about.html"),
        services: resolve(import.meta.dirname, "services.html"),
        fleet: resolve(import.meta.dirname, "fleet.html"),
        booking: resolve(import.meta.dirname, "book.html"),
        faq: resolve(import.meta.dirname, "faq.html"),
        contact: resolve(import.meta.dirname, "contact.html"),
        wedding: resolve(import.meta.dirname, "surrey-wedding-limo.html"),
        airport: resolve(import.meta.dirname, "yvr-airport-transfer-limo.html"),
        partyBus: resolve(
          import.meta.dirname,
          "vancouver-party-bus-rental.html",
        ),
        whistler: resolve(
          import.meta.dirname,
          "whistler-limousine-transfer.html",
        ),
      },
    },
  },
});
