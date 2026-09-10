"use client";

import { useEffect } from "react";

export default function SiteClient() {
  useEffect(() => {
    const root = document.body;
    const header = root.querySelector(".site-header");
    const toggle = root.querySelector(".nav-toggle");
    const scroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
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

    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    toggle?.addEventListener("click", toggleNav);

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" })
      : null;
    root.querySelectorAll(".reveal").forEach((element) => {
      observer ? observer.observe(element) : element.classList.add("in");
    });
    root.querySelectorAll("[data-year]").forEach((element) => {
      element.textContent = new Date().getFullYear();
    });

    const here = window.location.pathname.replace(/\/$/, "") || "/";
    root.querySelectorAll(".nav-primary a[href]").forEach((anchor) => {
      const link = new URL(anchor.href, window.location.origin).pathname.replace(/\/$/, "") || "/";
      anchor.classList.toggle("is-active", link === here || (here === "/" && link === "/index.html"));
      anchor.addEventListener("click", closeNav);
    });

    const bookingForm = root.querySelector("#booking-form");
    const params = new URLSearchParams(window.location.search);
    ["occasion", "vehicle"].forEach((name) => {
      const value = params.get(name);
      const select = bookingForm?.querySelector(`#${name}`);
      if (value && select) {
        select.value = [...select.options].find(
          (option) => option.value.toLowerCase() === value.toLowerCase(),
        )?.value || "";
      }
    });
    const date = bookingForm?.querySelector("#pickup-date");
    if (date) date.min = new Date().toISOString().slice(0, 10);

    const submitForm = (form, endpoint, successMessage, buttonLabel) => async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const button = form.querySelector('button[type="submit"]');
      const note = form.querySelector(".form-note");
      button.disabled = true;
      button.textContent = "Sending request…";
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message);
        form.reset();
        note.textContent = successMessage;
      } catch {
        note.textContent = "We couldn't send this right now. Please call (672) 377-3932 or email us directly.";
      } finally {
        note.classList.add("is-visible");
        button.disabled = false;
        button.textContent = buttonLabel;
      }
    };

    const submitBooking = bookingForm && submitForm(
      bookingForm,
      "/api/booking",
      "Thanks — your ride request has been sent. We'll reply shortly.",
      "Request This Ride",
    );
    const contactForm = root.querySelector("#contact-form");
    const submitContact = contactForm && submitForm(
      contactForm,
      "/api/contact",
      "Thanks — your message has been sent. We'll reply shortly.",
      "Send Message",
    );
    bookingForm?.addEventListener("submit", submitBooking);
    contactForm?.addEventListener("submit", submitContact);

    const details = [...root.querySelectorAll(".faq-list details")];
    const singleOpen = (event) => {
      if (event.currentTarget.open) details.forEach((item) => {
        if (item !== event.currentTarget) item.open = false;
      });
    };
    details.forEach((item) => item.addEventListener("toggle", singleOpen));

    return () => {
      window.removeEventListener("scroll", scroll);
      toggle?.removeEventListener("click", toggleNav);
      observer?.disconnect();
      bookingForm?.removeEventListener("submit", submitBooking);
      contactForm?.removeEventListener("submit", submitContact);
      details.forEach((item) => item.removeEventListener("toggle", singleOpen));
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}
