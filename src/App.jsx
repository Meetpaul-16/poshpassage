import { useEffect, useMemo, useState } from "react";
import home from "../index.html?raw";
import about from "../about.html?raw";
import services from "../services.html?raw";
import fleet from "../fleet.html?raw";
import booking from "../book-a-ride.html?raw";
import faq from "../faq.html?raw";
import contact from "../contact.html?raw";
import surreyWeddingLimo from "../surrey-wedding-limo.html?raw";
import yvrAirportTransferLimo from "../yvr-airport-transfer-limo.html?raw";
import vancouverPartyBusRental from "../vancouver-party-bus-rental.html?raw";
import whistlerLimousineTransfer from "../whistler-limousine-transfer.html?raw";

const pages = {
  "/home": { title: "Surrey Limousine & Party Bus Service | Posh Passage", description: "Chauffeured stretch limousines and party buses serving Surrey, Metro Vancouver, Fraser Valley, and Whistler. Available 24/7. Request a quote today.", template: home },
  "/about": { title: "About Our Surrey Chauffeur Service | Posh Passage Limousines", description: "Learn about Posh Passage Limousines, a Surrey-based chauffeur service providing punctual, professional travel across Metro Vancouver and the Lower Mainland.", template: about },
  "/about.html": { title: "About Our Surrey Chauffeur Service | Posh Passage Limousines", description: "Learn about Posh Passage Limousines, a Surrey-based chauffeur service providing punctual, professional travel across Metro Vancouver and the Lower Mainland.", template: about },
  "/services": { title: "Limousine & Party Bus Services in Metro Vancouver | Posh Passage", description: "Chauffeured airport transfers, wedding limos, corporate travel, party buses, wine tours and Whistler trips from Surrey across Metro Vancouver and the Lower Mainland.", template: services },
  "/services.html": { title: "Limousine & Party Bus Services in Metro Vancouver | Posh Passage", description: "Chauffeured airport transfers, wedding limos, corporate travel, party buses, wine tours and Whistler trips from Surrey across Metro Vancouver and the Lower Mainland.", template: services },
  "/fleet": { title: "Stretch Limousines & Party Buses in Surrey, BC | Posh Passage", description: "Explore Posh Passage stretch limousines and party buses for weddings, airport transfers, group outings and events throughout the Lower Mainland.", template: fleet },
  "/fleet.html": { title: "Stretch Limousines & Party Buses in Surrey, BC | Posh Passage", description: "Explore Posh Passage stretch limousines and party buses for weddings, airport transfers, group outings and events throughout the Lower Mainland.", template: fleet },
  "/book-a-ride": { title: "Book a Limousine or Party Bus in Surrey, BC | Posh Passage", description: "Request your chauffeur-driven limousine or party bus in Surrey, Metro Vancouver, the Fraser Valley or Whistler. Get a ride quote from Posh Passage Limousines.", template: booking },
  "/book-a-ride.html": { title: "Book a Limousine or Party Bus in Surrey, BC | Posh Passage", description: "Request your chauffeur-driven limousine or party bus in Surrey, Metro Vancouver, the Fraser Valley or Whistler. Get a ride quote from Posh Passage Limousines.", template: booking },
  "/faq": { title: "Limousine & Party Bus FAQ | Posh Passage Limousines", description: "Get answers about booking a limousine or party bus with Posh Passage Limousines, including service areas, pricing, deposits, airport pickups and Whistler trips.", template: faq },
  "/faq.html": { title: "Limousine & Party Bus FAQ | Posh Passage Limousines", description: "Get answers about booking a limousine or party bus with Posh Passage Limousines, including service areas, pricing, deposits, airport pickups and Whistler trips.", template: faq },
  "/contact": { title: "Contact a Surrey Limousine Service | Posh Passage Limousines", description: "Contact Posh Passage Limousines to book a chauffeur, limousine or party bus in Surrey, Metro Vancouver and the Lower Mainland. Call (672) 377-3932.", template: contact },
  "/contact.html": { title: "Contact a Surrey Limousine Service | Posh Passage Limousines", description: "Contact Posh Passage Limousines to book a chauffeur, limousine or party bus in Surrey, Metro Vancouver and the Lower Mainland. Call (672) 377-3932.", template: contact },
  "/surrey-wedding-limo.html": { title: "Wedding Limousine Rental Surrey BC | Posh Passage", description: "Book a wedding limousine rental in Surrey, BC with Posh Passage. Chauffeured transportation for ceremonies, receptions, wedding parties and guests.", template: surreyWeddingLimo },
  "/yvr-airport-transfer-limo.html": { title: "Surrey to YVR Airport Limo Service | Posh Passage", description: "Reserve a reliable Surrey to YVR airport limo service with Posh Passage. Enjoy professional chauffeurs, flexible pickup times and comfortable airport transfers.", template: yvrAirportTransferLimo },
  "/vancouver-party-bus-rental.html": { title: "Party Bus Rental Surrey Vancouver | Posh Passage", description: "Plan your celebration with a party bus rental from Surrey to Vancouver. Posh Passage provides comfortable group transportation for events and nights out.", template: vancouverPartyBusRental },
  "/whistler-limousine-transfer.html": { title: "Whistler Limo Service Sea to Sky | Posh Passage", description: "Travel in comfort with Whistler limo service along the Sea to Sky corridor. Posh Passage offers private chauffeured transfers from Surrey and Metro Vancouver.", template: whistlerLimousineTransfer },
};

const legacyRoutes = {
  "/": "/home",
  "/index.html": "/home",
  "/home.html": "/home",
  "/about.html": "/about",
  "/services.html": "/services",
  "/service": "/services",
  "/service.html": "/services",
  "/fleet.html": "/fleet",
  "/book-a-ride.html": "/book-a-ride",
  "/faq.html": "/faq",
  "/contact.html": "/contact",
  "/surrey-wedding-limo.html": "/surrey-wedding-limo.html",
  "/yvr-airport-transfer-limo.html": "/yvr-airport-transfer-limo.html",
  "/vancouver-party-bus-rental.html": "/vancouver-party-bus-rental.html",
  "/whistler-limousine-transfer.html": "/whistler-limousine-transfer.html",
};

function cleanLocation(value) {
  const url = new URL(value, window.location.origin);
  return `${legacyRoutes[url.pathname] || url.pathname}${url.search}`;
}

function bodyOf(documentHtml) {
  const parsed = new DOMParser().parseFromString(documentHtml, "text/html");
  parsed.querySelectorAll("script").forEach((script) => script.remove());
  return parsed.querySelector("template#page-template, template#home-template")?.innerHTML || parsed.body.innerHTML;
}

function setMeta(name, content, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(property ? "property" : "name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setStructuredData(id, data) {
  let element = document.getElementById(id);
  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

export default function App() {
  const [location, setLocation] = useState(() => window.location.pathname + window.location.search);
  const path = cleanLocation(location).split("?")[0];
  const page = pages[path] || pages["/home"];
  const html = useMemo(() => {
    return bodyOf(page.template || home);
  }, [page]);

  useEffect(() => {
    const canonicalLocation = cleanLocation(location);
    if (canonicalLocation !== location) {
      history.replaceState({}, "", canonicalLocation);
      setLocation(canonicalLocation);
    }
  }, [location]);

  useEffect(() => {
    document.title = page.title;
    const canonicalUrl = new URL(path === "/home" ? "/" : path, window.location.origin).href;
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    setMeta("description", page.description);
    setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMeta("og:type", "website", true);
    setMeta("og:site_name", "Posh Passage Limousines", true);
    setMeta("og:title", page.title, true);
    setMeta("og:description", page.description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("twitter:card", "summary");
    setMeta("twitter:title", page.title);
    setMeta("twitter:description", page.description);
    setStructuredData("local-business-schema", {
      "@context": "https://schema.org",
      "@type": "LimousineService",
      name: "Posh Passage Limousines",
      image: "https://www.poshpassagelimousine.ca/index.html",
      telephone: "+16723773932",
      email: "poshpassagelimousine@gmail.com",
      address: { "@type": "PostalAddress", streetAddress: "1959 152 St", addressLocality: "Surrey", addressRegion: "BC", addressCountry: "CA" },
      areaServed: ["Surrey", "Vancouver", "Burnaby", "Richmond", "Langley", "Coquitlam", "Abbotsford", "Whistler"],
      url: "https://www.poshpassagelimousine.ca"
    });
    if (path === "/faq") {
      const questions = [...document.querySelectorAll(".faq-item")].map((item) => ({
        "@type": "Question",
        name: item.querySelector("summary")?.childNodes[0]?.textContent.trim(),
        acceptedAnswer: { "@type": "Answer", text: item.querySelector("p")?.textContent.trim() }
      }));
      setStructuredData("faq-schema", { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: questions });
    } else {
      document.getElementById("faq-schema")?.remove();
    }
    window.scrollTo(0, 0);
  }, [page, path]);

  useEffect(() => {
    const onPopState = () => setLocation(window.location.pathname + window.location.search);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const root = document.getElementById("root");
    const header = root.querySelector(".site-header");
    const toggle = root.querySelector(".nav-toggle");
    const nav = root.querySelector(".nav-primary");
    const scroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });

    const closeNav = () => {
      header?.classList.remove("nav-open");
      toggle?.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
    const toggleNav = () => {
      const open = header?.classList.toggle("nav-open");
      toggle?.setAttribute("aria-expanded", String(Boolean(open)));
      document.body.style.overflow = open ? "hidden" : "";
    };
    toggle?.addEventListener("click", toggleNav);

    const observer = "IntersectionObserver" in window && new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("in"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    root.querySelectorAll(".reveal").forEach((element) => observer ? observer.observe(element) : element.classList.add("in"));
    root.querySelectorAll("[data-year]").forEach((element) => { element.textContent = new Date().getFullYear(); });

    nav?.querySelectorAll("a[href]").forEach((anchor) => {
      anchor.classList.toggle("is-active", cleanLocation(anchor.getAttribute("href")) === path);
    });
    const onClick = (event) => {
      const anchor = event.target.closest("a[href]");
      if (!anchor || anchor.target === "_blank" || event.metaKey || event.ctrlKey) return;
      const href = anchor.getAttribute("href");
      if (!href?.endsWith(".html") && !href?.includes(".html?")) return;
      event.preventDefault();
      const destination = cleanLocation(href);
      history.pushState({}, "", destination);
      setLocation(destination);
      closeNav();
    };
    root.addEventListener("click", onClick);

    const bookingForm = root.querySelector("#booking-form");
    const params = new URLSearchParams(location.split("?")[1]);
    ["occasion", "vehicle"].forEach((name) => {
      const value = params.get(name); const select = bookingForm?.querySelector(`#${name}`);
      if (value && select) select.value = [...select.options].find((option) => option.value.toLowerCase() === value.toLowerCase())?.value || "";
    });
    const date = bookingForm?.querySelector("#pickup-date");
    if (date) date.min = new Date().toISOString().slice(0, 10);
    const submitBooking = async (event) => {
      event.preventDefault();
      if (!bookingForm.reportValidity()) return;
      const button = bookingForm.querySelector('button[type="submit"]');
      const note = bookingForm.querySelector(".form-note");
      button.disabled = true;
      button.textContent = "Sending request…";
      try {
        const booking = Object.fromEntries(new FormData(bookingForm));
        const response = await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(booking),
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || "Unable to send your request.");
        bookingForm.reset();
        note.textContent = "Thanks — your ride request has been sent. We'll reply shortly.";
        note.classList.add("is-visible");
      } catch (error) {
        note.textContent = "We couldn't send the request right now. Please call (672) 377-3932 or email us directly.";
        note.classList.add("is-visible");
      } finally {
        button.disabled = false;
        button.textContent = "Request This Ride";
      }
    };
    bookingForm?.addEventListener("submit", submitBooking);
    const contactForm = root.querySelector("#contact-form");
    const submitContact = async (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;
      const button = contactForm.querySelector('button[type="submit"]');
      const note = contactForm.querySelector(".form-note");
      button.disabled = true;
      button.textContent = "Sending message…";
      try {
        const query = Object.fromEntries(new FormData(contactForm));
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(query),
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || "Unable to send your message.");
        contactForm.reset();
        note.textContent = "Thanks — your message has been sent. We'll reply shortly.";
        note.classList.add("is-visible");
      } catch (error) {
        note.textContent = "We couldn't send your message right now. Please call (672) 377-3932 or email us directly.";
        note.classList.add("is-visible");
      } finally {
        button.disabled = false;
        button.textContent = "Send Message";
      }
    };
    contactForm?.addEventListener("submit", submitContact);
    const details = [...root.querySelectorAll(".faq-list details")];
    const singleOpen = (event) => { if (event.currentTarget.open) details.forEach((item) => { if (item !== event.currentTarget) item.open = false; }); };
    details.forEach((item) => item.addEventListener("toggle", singleOpen));
    return () => {
      window.removeEventListener("scroll", scroll); toggle?.removeEventListener("click", toggleNav); root.removeEventListener("click", onClick); observer?.disconnect();
      bookingForm?.removeEventListener("submit", submitBooking); contactForm?.removeEventListener("submit", submitContact); details.forEach((item) => item.removeEventListener("toggle", singleOpen)); document.body.style.overflow = "";
    };
  }, [html, location, path]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
