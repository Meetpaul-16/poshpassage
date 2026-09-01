import { useEffect, useMemo, useState } from "react";
import home from "../index.html?raw";
import about from "../about.html?raw";
import services from "../services.html?raw";
import fleet from "../fleet.html?raw";
import booking from "../book-a-ride.html?raw";
import faq from "../faq.html?raw";
import contact from "../contact.html?raw";

const pages = {
  "/home": { title: "Posh Passage Limousines", template: home },
  "/about": { title: "About Us | Posh Passage Limousines", template: about },
  "/about.html": { title: "About Us | Posh Passage Limousines", template: about },
  "/services": { title: "Services | Posh Passage Limousines", template: services },
  "/services.html": { title: "Services | Posh Passage Limousines", template: services },
  "/fleet": { title: "Our Fleet | Posh Passage Limousines", template: fleet },
  "/fleet.html": { title: "Our Fleet | Posh Passage Limousines", template: fleet },
  "/book-a-ride": { title: "Book a Ride | Posh Passage Limousines", template: booking },
  "/book-a-ride.html": { title: "Book a Ride | Posh Passage Limousines", template: booking },
  "/faq": { title: "FAQ | Posh Passage Limousines", template: faq },
  "/faq.html": { title: "FAQ | Posh Passage Limousines", template: faq },
  "/contact": { title: "Contact Us | Posh Passage Limousines", template: contact },
  "/contact.html": { title: "Contact Us | Posh Passage Limousines", template: contact },
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
    window.scrollTo(0, 0);
  }, [page]);

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
