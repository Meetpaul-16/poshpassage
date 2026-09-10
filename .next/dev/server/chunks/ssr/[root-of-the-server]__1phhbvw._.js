module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[project]/app/site-client.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SiteClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function SiteClient() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const root = document.body;
        const header = root.querySelector(".site-header");
        const toggle = root.querySelector(".nav-toggle");
        const scroll = ()=>header?.classList.toggle("is-scrolled", window.scrollY > 8);
        const closeNav = ()=>{
            header?.classList.remove("nav-open");
            toggle?.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
        };
        const toggleNav = ()=>{
            const open = header?.classList.toggle("nav-open");
            toggle?.setAttribute("aria-expanded", String(Boolean(open)));
            document.body.style.overflow = open ? "hidden" : "";
        };
        scroll();
        window.addEventListener("scroll", scroll, {
            passive: true
        });
        toggle?.addEventListener("click", toggleNav);
        const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }) : null;
        root.querySelectorAll(".reveal").forEach((element)=>{
            observer ? observer.observe(element) : element.classList.add("in");
        });
        root.querySelectorAll("[data-year]").forEach((element)=>{
            element.textContent = new Date().getFullYear();
        });
        const here = window.location.pathname.replace(/\/$/, "") || "/";
        root.querySelectorAll(".nav-primary a[href]").forEach((anchor)=>{
            const link = new URL(anchor.href, window.location.origin).pathname.replace(/\/$/, "") || "/";
            anchor.classList.toggle("is-active", link === here || here === "/" && link === "/index.html");
            anchor.addEventListener("click", closeNav);
        });
        const bookingForm = root.querySelector("#booking-form");
        const params = new URLSearchParams(window.location.search);
        [
            "occasion",
            "vehicle"
        ].forEach((name)=>{
            const value = params.get(name);
            const select = bookingForm?.querySelector(`#${name}`);
            if (value && select) {
                select.value = [
                    ...select.options
                ].find((option)=>option.value.toLowerCase() === value.toLowerCase())?.value || "";
            }
        });
        const date = bookingForm?.querySelector("#pickup-date");
        if (date) date.min = new Date().toISOString().slice(0, 10);
        const submitForm = (form, endpoint, successMessage, buttonLabel)=>async (event)=>{
                event.preventDefault();
                if (!form.reportValidity()) return;
                const button = form.querySelector('button[type="submit"]');
                const note = form.querySelector(".form-note");
                button.disabled = true;
                button.textContent = "Sending request…";
                try {
                    const response = await fetch(endpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(Object.fromEntries(new FormData(form)))
                    });
                    const result = await response.json();
                    if (!response.ok || !result.success) throw new Error(result.message);
                    form.reset();
                    note.textContent = successMessage;
                } catch  {
                    note.textContent = "We couldn't send this right now. Please call (672) 377-3932 or email us directly.";
                } finally{
                    note.classList.add("is-visible");
                    button.disabled = false;
                    button.textContent = buttonLabel;
                }
            };
        const submitBooking = bookingForm && submitForm(bookingForm, "/api/booking", "Thanks — your ride request has been sent. We'll reply shortly.", "Request This Ride");
        const contactForm = root.querySelector("#contact-form");
        const submitContact = contactForm && submitForm(contactForm, "/api/contact", "Thanks — your message has been sent. We'll reply shortly.", "Send Message");
        bookingForm?.addEventListener("submit", submitBooking);
        contactForm?.addEventListener("submit", submitContact);
        const details = [
            ...root.querySelectorAll(".faq-list details")
        ];
        const singleOpen = (event)=>{
            if (event.currentTarget.open) details.forEach((item)=>{
                if (item !== event.currentTarget) item.open = false;
            });
        };
        details.forEach((item)=>item.addEventListener("toggle", singleOpen));
        return ()=>{
            window.removeEventListener("scroll", scroll);
            toggle?.removeEventListener("click", toggleNav);
            observer?.disconnect();
            bookingForm?.removeEventListener("submit", submitBooking);
            contactForm?.removeEventListener("submit", submitContact);
            details.forEach((item)=>item.removeEventListener("toggle", singleOpen));
            document.body.style.overflow = "";
        };
    }, []);
    return null;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1phhbvw._.js.map