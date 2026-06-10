/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { submitGeneralEnquiry } from "@/lib/enquiry-api";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { THEME_COLORS } from "@/themes/colors";

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const IMAGES = [
  { src: "/images/general/PUBLIC_NEXT_GET_IN_TOUCH.png", alt: "Smart security home", showOverlay: true },
  { src: "/images/general/PUBLIC_NEXT_GET_IN_TOUCH_BUSINESS.jpg", alt: "Smart security business", showOverlay: false },
];

const sanitizeName    = (v: string) => v.replace(/[\x00-\x1F<>]/g, "").slice(0, 100);
const sanitizeEmail   = (v: string) => v.trim().toLowerCase().replace(/[^a-z0-9@._+\-]/g, "").slice(0, 254);
const sanitizePhone   = (v: string) => v.replace(/\D/g, "").slice(0, 10);
const sanitizeCity    = (v: string) => v.replace(/[\x00-\x1F<>]/g, "").slice(0, 100);
const sanitizeMessage = (v: string) => v.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F<>]/g, "").slice(0, 2000);

const GetInTouch: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const formPanelRef = useScrollReveal<HTMLDivElement>({ animation: "left", delay: 0 });
  const rightTextRef = useScrollReveal<HTMLDivElement>({ animation: "right", delay: 250 });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    enquiryAbout: "",
    city: "",
    message: "",
  });

  const [errors, setErrors]     = useState<Record<string, string>>({});
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // Turnstile
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef  = useRef<string | null>(null);

  // Load script once
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

  // Render widget when ready
  useEffect(() => {
    if (!turnstileReady || !turnstileRef.current || !window.turnstile) return;
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
  }, [turnstileReady]);

  const sanitizeField = (name: string, raw: string) => {
    switch (name) {
      case "fullName":    return sanitizeName(raw);
      case "email":       return sanitizeEmail(raw);
      case "phone":       return sanitizePhone(raw);
      case "city":        return sanitizeCity(raw);
      case "message":     return sanitizeMessage(raw);
      case "enquiryAbout": return raw; // controlled select — value is always one of the defined options
      default:            return raw;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    if (!formData.enquiryAbout)
      errs.enquiryAbout = "Please select an enquiry subject.";
    if (!formData.message || formData.message.trim().length < 10)
      errs.message = "Please add a short message (at least 10 characters).";
    return errs;
  };

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
        enquiryAbout: formData.enquiryAbout,
        message: formData.message,
        turnstileToken,
      });

      setSubmitted(true);
      setFormData({ fullName: "", email: "", phone: "", enquiryAbout: "", city: "", message: "" });
      setTurnstileToken("");
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
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

  return (
    <section className="select-none relative w-full min-h-screen bg-[#FFFFFF] overflow-hidden flex">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-1 bottom-0 w-full md:w-[62%]">
          {IMAGES.map((img, idx) => (
            <div
              key={img.src}
              className={`absolute inset-0 transition-opacity duration-1000 ${currentImageIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            >
              <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center" unoptimized priority={idx === 0} />
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-60 pointer-events-none z-20" style={{ background: "linear-gradient(to top, #FFFFFF 70%, transparent 100%)" }} />
      </div>

      {/* Form panel */}
      <div ref={formPanelRef} className="relative z-10 w-full md:w-[45%] flex flex-col justify-center px-8 py-3 lg:px-8">
        <div className="w-full rounded-3xl border border-gray-200 p-6 shadow-[0_20px_60px_rgba(17,24,39,0.12)] backdrop-blur-md sm:p-8" style={{ backgroundColor: THEME_COLORS.shadowGrey50 }}>
          <h2 className="text-gray-900 text-3xl font-bold mb-2">Get in Touch</h2>
          <p className="text-red-600 text-sm mb-8">We&apos;re here to help you build a safer and smarter tomorrow.</p>

          {submitted ? (
            <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-100 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Enquiry submitted!</p>
                  <p className="text-sm text-gray-600">We will get back to you shortly.</p>
                </div>
              </div>
              <button onClick={() => setSubmitted(false)} className="self-start rounded-full border border-gray-300 px-5 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors">
                Submit another
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 text-xs font-medium tracking-wide uppercase"><span className="text-red-500 mr-1">*</span>Full Name</label>
                <input type="text" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} maxLength={100}
                  className={`bg-white border rounded-2xl px-4 py-3 text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:border-red-400 transition-colors ${errors.fullName ? "border-red-500" : "border-gray-300"}`} />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 text-xs font-medium tracking-wide uppercase"><span className="text-red-500 mr-1">*</span>Email Address</label>
                <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} maxLength={254}
                  className={`bg-white border rounded-2xl px-4 py-3 text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:border-red-400 transition-colors ${errors.email ? "border-red-500" : "border-gray-300"}`} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 text-xs font-medium tracking-wide uppercase"><span className="text-red-500 mr-1">*</span>Phone Number</label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 bg-gray-100 border border-gray-300 rounded-2xl px-3 py-2.5 text-gray-900 text-sm" style={{ minWidth: 70 }}>
                    <span className="text-base">🇮🇳</span>
                    <span className="text-gray-600 text-xs">+91</span>
                  </div>
                  <input type="tel" name="phone" placeholder="10-digit mobile number" value={formData.phone} onChange={handleChange} maxLength={10} inputMode="numeric"
                    className={`flex-1 bg-white border rounded-2xl px-4 py-3 text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:border-red-400 transition-colors ${errors.phone ? "border-red-500" : "border-gray-300"}`} />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Enquiry About */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 text-xs font-medium tracking-wide uppercase"><span className="text-red-500 mr-1">*</span>Enquiry About</label>
                <div className="relative">
                  <select name="enquiryAbout" value={formData.enquiryAbout} onChange={handleChange}
                    className={`w-full bg-white border rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-red-400 transition-colors appearance-none cursor-pointer ${errors.enquiryAbout ? "border-red-500" : "border-gray-300"}`}>
                    <option value="" disabled>Select an option</option>
                    <option value="cctv">CCTV Systems</option>
                    <option value="access">Access Control</option>
                    <option value="alarm">Alarm Systems</option>
                    <option value="smart">Smart Home Security</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1L6 6L11 1" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </div>
                </div>
                {errors.enquiryAbout && <p className="text-red-500 text-xs mt-1">{errors.enquiryAbout}</p>}
              </div>

              {/* City */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 text-xs font-medium tracking-wide uppercase">City</label>
                <input type="text" name="city" placeholder="Enter your city" value={formData.city} onChange={handleChange} maxLength={100}
                  className="bg-white border border-gray-300 rounded-2xl px-4 py-3 text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:border-red-400 transition-colors" />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 text-xs font-medium tracking-wide uppercase"><span className="text-red-500 mr-1">*</span>Message</label>
                <textarea name="message" placeholder="Tell us about your enquiry, use case, quantity, or installation needs." value={formData.message} onChange={handleChange} rows={4} maxLength={2000}
                  className={`bg-white border rounded-2xl px-4 py-3 text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:border-red-400 transition-colors ${errors.message ? "border-red-500" : "border-gray-300"}`} />
                <p className="text-right text-xs text-gray-400">{formData.message.length}/2000</p>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Turnstile widget */}
              <div ref={turnstileRef} />

              {statusMsg && <p className="text-sm text-red-600">{statusMsg}</p>}

              <button onClick={handleSubmit} disabled={loading || !turnstileToken}
                className={`mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm py-4 px-10 rounded-full transition-colors duration-200 self-start disabled:opacity-60 disabled:cursor-not-allowed ${loading ? "pointer-events-none" : ""}`}>
                {loading ? "Submitting..." : "SUBMIT ENQUIRY"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right text overlay */}
      <div ref={rightTextRef}
        className={`hidden md:flex relative z-20 flex-1 flex-col justify-end pb-16 px-10 transition-opacity duration-1000 ${IMAGES[currentImageIndex].showOverlay ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div>
          <h2 className="text-black text-3xl font-bold leading-tight drop-shadow-lg">Smart Security for</h2>
          <h2 className="text-red-600 text-3xl font-bold leading-tight mb-3 drop-shadow-lg">Every Home.</h2>
          <p className="text-black/70 text-sm max-w-sm drop-shadow-md">Intelligent security solutions that protect what matters most.</p>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;