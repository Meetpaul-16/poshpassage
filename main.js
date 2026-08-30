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
    initContactForm();/* Posh Passage Limousines — shared behaviour */
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
    var here = (
      location.pathname.split("/").pop() || "index.html"
    ).toLowerCase();
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
      items.forEach(function (el) {
        el.classList.add("in");
      });
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
    items.forEach(function (el) {
      io.observe(el);
    });
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
      "mailto:" +
      EMAIL +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body)
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

    // Create success overlay
    var overlay = document.createElement("div");
    overlay.className = "form-success-overlay";
    overlay.innerHTML =
      '<div class="form-success-card">' +
      '<div class="form-success-icon">' +
      '<svg viewBox="0 0 48 48" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="22"/><path d="M14 24l7 7 13-13"/></svg>' +
      "</div>" +
      "<h3>Request Ready</h3>" +
      "<p>Your email app should be opening now with your booking details pre-filled. Just hit <strong>Send</strong> and we'll get back to you shortly.</p>" +
      '<div class="form-success-actions">' +
      '<a href="tel:' +
      PHONE_TEL +
      '" class="btn btn-ghost btn-sm">Call Us Instead</a>' +
      '<button type="button" class="btn btn-primary btn-sm" id="form-success-close">Got It</button>' +
      "</div>" +
      '<p class="form-success-fallback">If your email app didn\'t open, email us directly at <a href="mailto:' +
      EMAIL +
      '">' +
      EMAIL +
      "</a></p>" +
      "</div>";
    form.appendChild(overlay);

    var closeBtn = overlay.querySelector("#form-success-close");
    closeBtn.addEventListener("click", function () {
      overlay.classList.remove("is-visible");
      form.reset();
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var f = Object.fromEntries(new FormData(form).entries());
      var subject =
        "New ride request — " +
        (f.name || "New client") +
        " (" +
        (f["pickup-date"] || "date TBD") +
        ")";
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
        "Notes: " + (f.notes || "—"),
      ];

      window.location.href = buildMailto(subject, lines);
      overlay.classList.add("is-visible");
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
        f.message || "",
      ];

      window.location.href = buildMailto(subject, lines);
      showNote(
        form,
        "<strong>Opening your email app now.</strong> Just hit send to reach us — or call/text " +
          '<a href="tel:' +
          PHONE_TEL +
          '">' +
          PHONE_DISPLAY +
          "</a> for a faster answer."
      );
    });
  }
})();

  });

  /* =========================================================
     Header goes solid after a short scroll
  ========================================================= */
  function initHeader() {
    var header = document.querySelector(".site-header");

    if (!header) return;

    var onScroll = function () {
      header.classList.toggle(
        "is-scrolled",
        window.scrollY > 8
      );
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true
    });
  }

  /* =========================================================
     Mobile hamburger
  ========================================================= */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var header = document.querySelector(".site-header");

    if (!toggle || !header) return;

    toggle.addEventListener("click", function () {
      var isOpen = header.classList.toggle("nav-open");

      toggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      document.body.style.overflow = isOpen
        ? "hidden"
        : "";
    });

    // Close menu when a link is tapped
    document
      .querySelectorAll(".nav-primary a")
      .forEach(function (a) {
        a.addEventListener("click", function () {
          header.classList.remove("nav-open");

          toggle.setAttribute(
            "aria-expanded",
            "false"
          );

          document.body.style.overflow = "";
        });
      });
  }

  /* =========================================================
     Highlight the current page in the nav
  ========================================================= */
  function initActiveNav() {
    var here = (
      location.pathname.split("/").pop() ||
      "index.html"
    ).toLowerCase();

    document
      .querySelectorAll(".nav-primary a[href]")
      .forEach(function (a) {
        var href = a
          .getAttribute("href")
          .toLowerCase();

        if (
          href === here ||
          (here === "" && href === "index.html")
        ) {
          a.classList.add("is-active");
        }
      });
  }

  /* =========================================================
     Gentle fade-up as sections enter the viewport
  ========================================================= */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");

    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("in");
      });

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
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    items.forEach(function (el) {
      io.observe(el);
    });
  }

  /* =========================================================
     Footer year
  ========================================================= */
  function initFooterYear() {
    document
      .querySelectorAll("[data-year]")
      .forEach(function (el) {
        el.textContent = new Date().getFullYear();
      });
  }

  /* =========================================================
     Only one FAQ answer open at a time within a group
  ========================================================= */
  function initFaqSingleOpen() {
    var group = document.querySelectorAll(
      ".faq-list details"
    );

    group.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (item.open) {
          group.forEach(function (other) {
            if (other !== item) {
              other.open = false;
            }
          });
        }
      });
    });
  }

  /* =========================================================
     Shared mailto helpers
  ========================================================= */
  function buildMailto(subject, lines) {
    var body = lines
      .filter(Boolean)
      .join("\n");

    return (
      "mailto:" +
      EMAIL +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body)
    );
  }

  function showNote(form, html) {
    var note = form.querySelector(".form-note");

    if (!note) return;

    note.innerHTML = html;
    note.classList.add("is-visible");
  }

  /* =========================================================
     Book a Ride form
     
     Uses Web3Forms
  ========================================================= */
  function initBookingForm() {
    var form = document.getElementById(
      "booking-form"
    );

    if (!form) return;

    /* -------------------------------------------------------
       Pre-select occasion from Services page
       
       Example:
       book-a-ride.html?occasion=Weddings
    ------------------------------------------------------- */
    var params = new URLSearchParams(
      location.search
    );

    var occasion = params.get("occasion");

    if (occasion) {
      var select = form.querySelector(
        "#occasion"
      );

      if (select) {
        Array.prototype.forEach.call(
          select.options,
          function (opt) {
            if (
              opt.value.toLowerCase() ===
              occasion.toLowerCase()
            ) {
              opt.selected = true;
            }
          }
        );
      }
    }

    /* -------------------------------------------------------
       Pre-select vehicle from Fleet page
       
       Example:
       book-a-ride.html?vehicle=Party%20Bus
    ------------------------------------------------------- */
    var vehicleParam = params.get("vehicle");

    if (vehicleParam) {
      var vSelect = form.querySelector(
        "#vehicle"
      );

      if (vSelect) {
        Array.prototype.forEach.call(
          vSelect.options,
          function (opt) {
            if (
              opt.value.toLowerCase() ===
              vehicleParam.toLowerCase()
            ) {
              opt.selected = true;
            }
          }
        );
      }
    }

    /* -------------------------------------------------------
       Minimum pickup date = today
    ------------------------------------------------------- */
    var dateInput = form.querySelector(
      "#pickup-date"
    );

    function setMinimumDate() {
      if (!dateInput) return;

      var today = new Date();

      var year = today.getFullYear();

      var month = String(
        today.getMonth() + 1
      ).padStart(2, "0");

      var day = String(
        today.getDate()
      ).padStart(2, "0");

      var iso =
        year +
        "-" +
        month +
        "-" +
        day;

      dateInput.setAttribute("min", iso);
    }

    setMinimumDate();

    /* -------------------------------------------------------
       Create success overlay
    ------------------------------------------------------- */
    var overlay = document.createElement(
      "div"
    );

    overlay.className =
      "form-success-overlay";

    overlay.innerHTML =
      '<div class="form-success-card">' +

        '<div class="form-success-icon">' +

          '<svg viewBox="0 0 48 48" fill="none" ' +
          'stroke-width="2" stroke-linecap="round" ' +
          'stroke-linejoin="round">' +

            '<circle cx="24" cy="24" r="22"/>' +

            '<path d="M14 24l7 7 13-13"/>' +

          "</svg>" +

        "</div>" +

        "<h3>Request Sent</h3>" +

        "<p>" +
          "Thank you! Your booking request has " +
          "been sent successfully. We'll get back " +
          "to you shortly." +
        "</p>" +

        '<div class="form-success-actions">' +

          '<a href="tel:' +
            PHONE_TEL +
            '" class="btn btn-ghost btn-sm">' +
            "Call Us Instead" +
          "</a>" +

          '<button type="button" ' +
          'class="btn btn-primary btn-sm" ' +
          'id="form-success-close">' +
            "Got It" +
          "</button>" +

        "</div>" +

        '<p class="form-success-fallback">' +

          "Need an immediate response? Call us at " +

          '<a href="tel:' +
            PHONE_TEL +
            '">' +

            PHONE_DISPLAY +

          "</a>" +

        "</p>" +

      "</div>";

    form.appendChild(overlay);

    /* -------------------------------------------------------
       Close success popup
    ------------------------------------------------------- */
    var closeBtn = overlay.querySelector(
      "#form-success-close"
    );

    if (closeBtn) {
      closeBtn.addEventListener(
        "click",
        function () {
          overlay.classList.remove(
            "is-visible"
          );

          form.reset();

          setMinimumDate();
        }
      );
    }

    /* -------------------------------------------------------
       Web3Forms submission
    ------------------------------------------------------- */
    form.addEventListener(
      "submit",
      async function (e) {
        e.preventDefault();

        /* Browser validation */
        if (!form.reportValidity()) {
          return;
        }

        /* Get submit button */
        var submitButton =
          form.querySelector(
            'button[type="submit"]'
          );

        var originalButtonText = "";

        if (submitButton) {
          originalButtonText =
            submitButton.textContent;

          submitButton.disabled = true;

          submitButton.textContent =
            "Sending...";
        }

        /*
         * FormData automatically includes:
         *
         * access_key
         * subject
         * from_name
         * name
         * phone
         * email
         * occasion
         * vehicle
         * pickup-date
         * pickup-time
         * passengers
         * pickup
         * dropoff
         * trip-type
         * notes
         */
        var formData = new FormData(
          form
        );

        /* ---------------------------------------------------
           Get customer information for dynamic subject
        --------------------------------------------------- */
        var customerName =
          formData.get("name") ||
          "New Client";

        var pickupDate =
          formData.get(
            "pickup-date"
          ) ||
          "Date TBD";

        /*
         * Update Web3Forms subject.
         *
         * This overrides the hidden subject field
         * from the HTML.
         */
        formData.set(
          "subject",
          "New Ride Booking - " +
            customerName +
            " (" +
            pickupDate +
            ")"
        );

        /* ---------------------------------------------------
           Send to Web3Forms
        --------------------------------------------------- */
        try {
          var response = await fetch(
            "https://api.web3forms.com/submit",
            {
              method: "POST",
              body: formData
            }
          );

          var result =
            await response.json();

          console.log(
            "Web3Forms response:",
            result
          );

          /* -------------------------------------------------
             Successful submission
          ------------------------------------------------- */
          if (result.success) {
            /*
             * Show success popup
             */
            overlay.classList.add(
              "is-visible"
            );

            /*
             * Reset form
             */
            form.reset();

            /*
             * Restore today's minimum date
             */
            setMinimumDate();

            /*
             * Make sure submit button
             * is restored
             */
            if (submitButton) {
              submitButton.disabled =
                false;

              submitButton.textContent =
                originalButtonText;
            }
          }

          /* -------------------------------------------------
             Failed submission
          ------------------------------------------------- */
          else {
            console.error(
              "Web3Forms failed:",
              result
            );

            alert(
              result.message ||
                "Unable to send your booking request. " +
                "Please try again."
            );
          }
        }

        /* ---------------------------------------------------
           Network / JavaScript error
        --------------------------------------------------- */
        catch (error) {
          console.error(
            "Web3Forms submission error:",
            error
          );

          alert(
            "Something went wrong while sending " +
            "your booking request. Please call us at " +
            PHONE_DISPLAY
          );
        }

        /* ---------------------------------------------------
           Restore submit button
        --------------------------------------------------- */
        finally {
          if (submitButton) {
            submitButton.disabled = false;

            submitButton.textContent =
              originalButtonText;
          }
        }
      }
    );
  }

  /* =========================================================
     Contact page backup form
     
     This still uses mailto as your original code did.
  ========================================================= */
  function initContactForm() {
    var form = document.getElementById(
      "contact-form"
    );

    if (!form) return;

    form.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();

        if (!form.reportValidity()) {
          return;
        }

        var f = Object.fromEntries(
          new FormData(form).entries()
        );

        var subject =
          "Website message from " +
          (f.name || "a visitor");

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

        window.location.href =
          buildMailto(
            subject,
            lines
          );

        showNote(
          form,

          "<strong>Opening your email app now.</strong> " +
          "Just hit send to reach us — or call/text " +

          '<a href="tel:' +
          PHONE_TEL +
          '">' +

          PHONE_DISPLAY +

          "</a> for a faster answer."
        );
      }
    );
  }
})();
