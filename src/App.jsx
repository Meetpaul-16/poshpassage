import { useEffect, useMemo, useState } from "react";
import about from "../about.html?raw";
import services from "../services.html?raw";
import fleet from "../fleet.html?raw";
import booking from "../book-a-ride.html?raw";
import faq from "../faq.html?raw";
import contact from "../contact.html?raw";

const pages = {
  "/": { title: "Posh Passage Limousines", template: null },
  "/index.html": { title: "Posh Passage Limousines", template: null },
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

const email = "poshpassagelimosines@gmail.com";
const tel = "+16723773932";

function bodyOf(documentHtml) {
  const parsed = new DOMParser().parseFromString(documentHtml, "text/html");
  parsed.querySelectorAll("script").forEach((script) => script.remove());
  return parsed.querySelector("template#page-template")?.innerHTML || parsed.body.innerHTML;
}

function mailto(subject, lines) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.filter(Boolean).join("\n"))}`;
}

export default function App() {
  const [location, setLocation] = useState(() => window.location.pathname + window.location.search);
  const path = location.split("?")[0];
  const page = pages[path] || pages["/"];
  const html = useMemo(() => {
    if (page.template) return bodyOf(page.template);
    return document.getElementById("home-template")?.innerHTML || "";
  }, [page]);

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

    const selected = path === "/" ? "index.html" : path.slice(1).replace(/\/$/, "") + (path.endsWith(".html") ? "" : ".html");
    nav?.querySelectorAll("a[href]").forEach((anchor) => anchor.classList.toggle("is-active", anchor.getAttribute("href") === selected));
    const onClick = (event) => {
      const anchor = event.target.closest("a[href]");
      if (!anchor || anchor.target === "_blank" || event.metaKey || event.ctrlKey) return;
      const href = anchor.getAttribute("href");
      if (!href?.endsWith(".html") && !href?.includes(".html?")) return;
      event.preventDefault();
      history.pushState({}, "", `/${href}`);
      setLocation(window.location.pathname + window.location.search);
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
    const submitBooking = (event) => {
      event.preventDefault();
      if (!bookingForm.reportValidity()) return;
      const form = Object.fromEntries(new FormData(bookingForm));
      window.location.href = mailto(`New ride request — ${form.name || "New client"} (${form["pickup-date"] || "date TBD"})`, [
        "New booking request from poshpassagelimousines.com", "", `Name: ${form.name || ""}`, `Phone: ${form.phone || ""}`, `Email: ${form.email || ""}`, "", `Occasion: ${form.occasion || ""}`, `Vehicle preference: ${form.vehicle || ""}`, `Trip type: ${form["trip-type"] || ""}`, "", `Pickup date: ${form["pickup-date"] || ""}`, `Pickup time: ${form["pickup-time"] || ""}`, `Passengers: ${form.passengers || ""}`, "", `Pickup location: ${form.pickup || ""}`, `Drop-off location: ${form.dropoff || ""}`, "", `Notes: ${form.notes || "—"}`,
      ]);
    };
    bookingForm?.addEventListener("submit", submitBooking);
    const contactForm = root.querySelector("#contact-form");
    const submitContact = (event) => {
      event.preventDefault(); if (!contactForm.reportValidity()) return;
      const form = Object.fromEntries(new FormData(contactForm));
      window.location.href = mailto(`Website message from ${form.name || "a visitor"}`, ["New message from poshpassagelimousines.com", "", `Name: ${form.name || ""}`, `Phone: ${form.phone || ""}`, `Email: ${form.email || ""}`, "", "Message:", form.message || ""]);
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
