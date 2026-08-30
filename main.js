/* Posh Passage Limousines — shared behaviour */
(function () {
  "use strict";

  var PHONE_DISPLAY = "+1 (672) 377-3932";
  var PHONE_TEL = "+16723773932";
  var EMAIL = "poshpassagelimosines@gmail.com";

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initMobileNav();
    initActiveNav();
    initReveal();
    initFooterYear();
    initFaqSingleOpen();
    initBookingForm();
    initContactForm();
  });

  /* Header goes solid after a short scroll */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Mobile hamburger */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var header = document.querySelector(".site-header");
    if (!toggle || !header) return;
    toggle.addEventListener("click", function () {
      var isOpen = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    // close menu when a link is tapped
    document.querySelectorAll(".nav-primary a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* Highlight the current page in the nav */
  function initActiveNav() {
    var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".nav-primary a[href]").forEach(function (a) {
      var href = a.getAttribute("href").toLowerCase();
      if (href === here || (here === "" && href === "index.html")) {
        a.classList.add("is-active");
      }
    });
  }

  /* Gentle fade-up as sections enter the viewport */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(function (el) { io.observe(el); });
  }

  function initFooterYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* Only one FAQ answer open at a time within a group */
  function initFaqSingleOpen() {
    var group = document.querySelectorAll(".faq-list details");
    group.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (item.open) {
          group.forEach(function (other) {
            if (other !== item) other.open = false;
          });
        }
      });
    });
  }

  /* ---------- shared mailto helpers ---------- */
  function buildMailto(subject, lines) {
    var body = lines.filter(Boolean).join("\n");
    return (
      "mailto:" + EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body)
    );
  }

  function showNote(form, html) {
    var note = form.querySelector(".form-note");
    if (!note) return;
    note.innerHTML = html;
    note.classList.add("is-visible");
  }

  /* ---------- Book a Ride form ---------- */
  function initBookingForm() {
    var form = document.getElementById("booking-form");
    if (!form) return;

    // Pre-select the occasion if it arrived via ?occasion=... from the Services page
    var params = new URLSearchParams(location.search);
    var occasion = params.get("occasion");
    if (occasion) {
      var select = form.querySelector("#occasion");
      if (select) {
        Array.prototype.forEach.call(select.options, function (opt) {
          if (opt.value.toLowerCase() === occasion.toLowerCase()) {
            opt.selected = true;
          }
        });
      }
    }

    // Pre-select the vehicle if it arrived via ?vehicle=... from the Fleet page
    var vehicleParam = params.get("vehicle");
    if (vehicleParam) {
      var vSelect = form.querySelector("#vehicle");
      if (vSelect) {
        Array.prototype.forEach.call(vSelect.options, function (opt) {
          if (opt.value.toLowerCase() === vehicleParam.toLowerCase()) {
            opt.selected = true;
          }
        });
      }
    }

    // sensible min date = today
    var dateInput = form.querySelector("#pickup-date");
    if (dateInput) {
      var today = new Date();
      var iso = today.toISOString().split("T")[0];
      dateInput.setAttribute("min", iso);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var f = Object.fromEntries(new FormData(form).entries());
      var subject = "New ride request — " + (f.name || "New client") + " (" + (f["pickup-date"] || "date TBD") + ")";
      var lines = [
        "New booking request from poshpassagelimousines.com",
        "",
        "Name: " + (f.name || ""),
        "Phone: " + (f.phone || ""),
        "Email: " + (f.email || ""),
        "",
        "Occasion: " + (f.occasion || ""),
        "Vehicle preference: " + (f.vehicle || ""),
        "Trip type: " + (f["trip-type"] || ""),
        "",
        "Pickup date: " + (f["pickup-date"] || ""),
        "Pickup time: " + (f["pickup-time"] || ""),
        "Passengers: " + (f.passengers || ""),
        "",
        "Pickup location: " + (f.pickup || ""),
        "Drop-off location: " + (f.dropoff || ""),
        "",
        "Notes: " + (f.notes || "—")
      ];

      window.location.href = buildMailto(subject, lines);
      showNote(
        form,
        "<strong>Almost there.</strong> Your email app should be opening now with this request filled in — just hit send. " +
        "If nothing opens, call or text us directly at <a href=\"tel:" + PHONE_TEL + "\">" + PHONE_DISPLAY + "</a>."
      );
    });
  }

  /* ---------- Contact page backup form ---------- */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var f = Object.fromEntries(new FormData(form).entries());
      var subject = "Website message from " + (f.name || "a visitor");
      var lines = [
        "New message from poshpassagelimousines.com",
        "",
        "Name: " + (f.name || ""),
        "Phone: " + (f.phone || ""),
        "Email: " + (f.email || ""),
        "",
        "Message:",
        f.message || ""
      ];

      window.location.href = buildMailto(subject, lines);
      showNote(
        form,
        "<strong>Opening your email app now.</strong> Just hit send to reach us — or call/text " +
        "<a href=\"tel:" + PHONE_TEL + "\">" + PHONE_DISPLAY + "</a> for a faster answer."
      );
    });
  }
})();
