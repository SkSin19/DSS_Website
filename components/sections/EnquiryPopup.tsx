/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { submitGeneralEnquiry } from "@/lib/enquiry-api";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

// First appearance after 15s, then re-open every 15 minutes.
const FIRST_DELAY_MS = 15 * 1000;
const REPEAT_EVERY_MS = 15 * 60 * 1000;

// Once the visitor submits successfully we stop showing the popup for good.
const SUBMITTED_KEY = "dss_enquiry_submitted";
const hasAlreadySubmitted = () => {
  try {
    return localStorage.getItem(SUBMITTED_KEY) === "1";
  } catch {
    return false;
  }
};

const sanitizeName    = (v: string) => v.replace(/[\x00-\x1F<>]/g, "").slice(0, 100);
const sanitizeEmail   = (v: string) => v.trim().toLowerCase().replace(/[^a-z0-9@._+\-]/g, "").slice(0, 254);
const sanitizePhone   = (v: string) => v.replace(/\D/g, "").slice(0, 10);
const sanitizeCity    = (v: string) => v.replace(/[\x00-\x1F<>]/g, "").slice(0, 100);
const sanitizeMessage = (v: string) => v.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F<>]/g, "").slice(0, 2000);

const EnquiryPopup: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // Turnstile
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef  = useRef<string | null>(null);
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  // Open after 15s, then every 15 minutes (skip while already open).
  // If the visitor has already submitted once, never schedule anything.
  useEffect(() => {
    if (hasAlreadySubmitted()) return;

    const firstTimer = setTimeout(() => {
      setOpen(true);
    }, FIRST_DELAY_MS);

    intervalRef.current = setInterval(() => {
      setSubmitted(false); // fresh form on each re-open
      setStatusMsg("");
      setOpen(true);
    }, REPEAT_EVERY_MS);

    return () => {
      clearTimeout(firstTimer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Load the Turnstile script once (shared id with the rest of the site).
  useEffect(() => {
    if (document.getElementById("cf-turnstile-script")) {
      setTurnstileReady(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "cf-turnstile-script";
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.onload = () => setTurnstileReady(true);
    document.head.appendChild(script);
  }, []);

  // Render the widget only while the popup is open (and not on the success screen).
  useEffect(() => {
    if (!open || submitted || !turnstileReady || !turnstileRef.current || !window.turnstile) return;
    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }
    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
      theme: "light",
    });
  }, [open, submitted, turnstileReady]);

  const sanitizeField = (name: string, raw: string) => {
    switch (name) {
      case "fullName": return sanitizeName(raw);
      case "email":    return sanitizeEmail(raw);
      case "phone":    return sanitizePhone(raw);
      case "city":     return sanitizeCity(raw);
      case "message":  return sanitizeMessage(raw);
      default:         return raw;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const cleaned = sanitizeField(name, value);
    setFormData((prev) => ({ ...prev, [name]: cleaned }));
    setErrors((prev) => { const copy = { ...prev }; delete copy[name]; return copy; });
  };

  const validate = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!formData.fullName || formData.fullName.trim().length < 2)
      errs.fullName = "Enter your full name (at least 2 characters).";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email))
      errs.email = "Enter a valid email address.";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      errs.phone = "Enter a valid 10-digit phone number.";
    if (!formData.city || formData.city.trim().length < 2)
      errs.city = "Enter your city.";
    // message is optional - no validation
    return errs;
  };

  const closePopup = () => setOpen(false);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStatusMsg("");

    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    if (!turnstileToken) {
      setStatusMsg("Please complete the verification check before submitting.");
      return;
    }

    setLoading(true);
    try {
      await submitGeneralEnquiry({
        name: formData.fullName,
        company: "",
        email: formData.email,
        phoneCountryCode: "+91",
        phoneNumber: formData.phone,
        city: formData.city,
        enquiryAbout: "",
        message: formData.message,
        turnstileToken,
      });

      setSubmitted(true);
      setFormData({ fullName: "", email: "", phone: "", city: "", message: "" });
      setTurnstileToken("");
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }

      // Filled once - stop nagging on this browser from now on.
      try { localStorage.setItem(SUBMITTED_KEY, "1"); } catch {}
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    } catch (err: any) {
      setStatusMsg(err?.message || "Failed to submit enquiry. Please try again.");
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
        setTurnstileToken("");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError?: boolean) =>
    `bg-white border rounded-xl px-3 py-2 text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:border-red-400 transition-colors ${hasError ? "border-red-500" : "border-gray-300"}`;

  return (
    <>
      {/* Backdrop + centering container */}
      <div
        onClick={closePopup}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        {/* Centered pop-up panel (fades + scales up on open, down on close) */}
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Quick enquiry"
          onClick={(e) => e.stopPropagation()}
          className={`relative w-[340px] max-w-[88vw] transform transition-all duration-300 ease-out ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"}`}
        >
        <div className="relative rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_20px_60px_rgba(17,24,39,0.25)]">
          {/* Close */}
          <button
            onClick={closePopup}
            aria-label="Close enquiry"
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {submitted ? (
            <div className="flex flex-col gap-3 pr-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Enquiry submitted!</p>
                  <p className="text-xs text-gray-600">We&apos;ll get back to you shortly.</p>
                </div>
              </div>
              <button onClick={closePopup} className="self-start rounded-full bg-red-600 hover:bg-red-700 px-5 py-2 text-xs font-semibold text-white transition-colors">
                Close
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="pr-6">
                <h2 className="text-gray-900 text-lg font-bold leading-tight">Lets Connect</h2>
                <p className="text-red-600 text-xs">Leave your details - we&apos;ll call you back.</p>
              </div>

              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <input type="text" name="fullName" placeholder="Full name *" value={formData.fullName} onChange={handleChange} maxLength={100}
                  className={inputClass(!!errors.fullName)} />
                {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <input type="email" name="email" placeholder="Email address *" value={formData.email} onChange={handleChange} maxLength={254}
                  className={inputClass(!!errors.email)} />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 bg-gray-100 border border-gray-300 rounded-xl px-2.5 text-gray-900 text-sm" style={{ minWidth: 62 }}>
                    <span className="text-base">🇮🇳</span>
                    <span className="text-gray-600 text-xs">+91</span>
                  </div>
                  <input type="tel" name="phone" placeholder="10-digit mobile *" value={formData.phone} onChange={handleChange} maxLength={10} inputMode="numeric"
                    className={`flex-1 ${inputClass(!!errors.phone)}`} />
                </div>
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
              </div>

              {/* City */}
              <div className="flex flex-col gap-1">
                <input type="text" name="city" placeholder="City *" value={formData.city} onChange={handleChange} maxLength={100}
                  className={inputClass(!!errors.city)} />
                {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
              </div>

              {/* Message (optional) */}
              <div className="flex flex-col gap-1">
                <textarea name="message" placeholder="Message (optional)" value={formData.message} onChange={handleChange} rows={2} maxLength={2000}
                  className={inputClass(false)} />
              </div>

              {/* Turnstile */}
              <div ref={turnstileRef} className="scale-90 origin-left" />

              {statusMsg && <p className="text-xs text-red-600">{statusMsg}</p>}

              <button onClick={handleSubmit} disabled={loading || !turnstileToken}
                className={`bg-red-600 hover:bg-red-700 text-white font-semibold text-sm py-2.5 rounded-full transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${loading ? "pointer-events-none" : ""}`}>
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>
            </div>
          )}
        </div>
        </aside>
      </div>
    </>
  );
};

export default EnquiryPopup;
