/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { User, Phone, MapPin, Send } from "lucide-react";
import { submitGeneralEnquiry } from "@/lib/enquiry-api";

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

/**
 * Services shown in the dropdown. The backend only accepts the keys
 * cctv | access | alarm | smart | other for `enquiryAbout`, so each option maps
 * to one of those and the exact service label is prefixed into the message.
 */
export const ENQUIRY_SERVICES = [
  { id: "cctv-installation", label: "CCTV Camera Installation", apiValue: "cctv" },
  { id: "cctv-repair", label: "CCTV Repair / AMC", apiValue: "cctv" },
  { id: "access-control", label: "Access Control System", apiValue: "access" },
  { id: "biometric", label: "Biometric Attendance", apiValue: "access" },
  { id: "video-door-phone", label: "Video Door Phone / Intercom", apiValue: "access" },
  { id: "alarm", label: "Intrusion / Fire Alarm", apiValue: "alarm" },
  { id: "automation", label: "Home / Gate Automation", apiValue: "smart" },
  { id: "pa-av", label: "PA System & AV", apiValue: "other" },
  { id: "other", label: "Other", apiValue: "other" },
] as const;

const sanitizeName    = (v: string) => v.replace(/[\x00-\x1F<>]/g, "").slice(0, 100);
const sanitizePhone   = (v: string) => v.replace(/\D/g, "").slice(0, 10);
const sanitizeCity    = (v: string) => v.replace(/[\x00-\x1F<>]/g, "").slice(0, 100);
const sanitizeMessage = (v: string) => v.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F<>]/g, "").slice(0, 1900);

const EMPTY_FORM = { fullName: "", phone: "", service: "", city: "", message: "" };

type EnquiryFormProps = {
  /** Unique prefix so label/input ids don't collide if two forms are on a page. */
  idPrefix: string;
  /** Pre-selects a service id from ENQUIRY_SERVICES. */
  defaultService?: string;
  submitLabel?: string;
  /** Put every field on its own row (for wider, standalone layouts). */
  stacked?: boolean;
};

const inputClass = (hasError?: boolean) =>
  `w-full bg-white border rounded-lg px-3.5 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-colors ${
    hasError ? "border-red-500" : "border-gray-300"
  }`;

const labelClass = "text-gray-700 text-[13px] font-medium";
const iconClass = "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400";

export default function EnquiryForm({
  idPrefix,
  defaultService = "",
  submitLabel = "Get Free Quote",
  stacked = false,
}: EnquiryFormProps) {
  const [formData, setFormData] = useState({ ...EMPTY_FORM, service: defaultService });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // Turnstile
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Load script once (shared with any other form on the page)
  useEffect(() => {
    const existing = document.getElementById("cf-turnstile-script");
    if (existing) {
      if (window.turnstile) setTurnstileReady(true);
      else existing.addEventListener("load", () => setTurnstileReady(true), { once: true });
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

  // Render widget when ready (and again after "Submit another")
  useEffect(() => {
    if (submitted || !turnstileReady || !turnstileRef.current || !window.turnstile) return;
    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
      theme: "light",
    });
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [turnstileReady, submitted]);

  const sanitizeField = (name: string, raw: string) => {
    switch (name) {
      case "fullName": return sanitizeName(raw);
      case "phone":    return sanitizePhone(raw);
      case "city":     return sanitizeCity(raw);
      case "message":  return sanitizeMessage(raw);
      default:         return raw; // service is a controlled select
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: sanitizeField(name, value) }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  const validate = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!formData.fullName || formData.fullName.trim().length < 2)
      errs.fullName = "Enter your full name.";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      errs.phone = "Enter a valid 10-digit mobile number.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg("");

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    if (!turnstileToken) {
      setStatusMsg("Please complete the verification check before submitting.");
      return;
    }

    const service = ENQUIRY_SERVICES.find((s) => s.id === formData.service);
    const message = [service ? `Service: ${service.label}` : "", formData.message.trim()]
      .filter(Boolean)
      .join("\n");

    setLoading(true);
    try {
      await submitGeneralEnquiry({
        name: formData.fullName,
        company: "",
        phoneCountryCode: "+91",
        phoneNumber: formData.phone,
        city: formData.city,
        enquiryAbout: service?.apiValue ?? "",
        message,
        turnstileToken,
      });
      try {
        localStorage.setItem("dss_enquiry_submitted", "1"); // suppresses the timed popup
      } catch {
        /* storage unavailable */
      }
      setSubmitted(true);
      setFormData({ ...EMPTY_FORM, service: defaultService });
      setTurnstileToken("");
    } catch (err: any) {
      setStatusMsg(
        err?.response?.data?.message || err?.message || "Failed to submit enquiry. Please try again.",
      );
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
        setTurnstileToken("");
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 rounded-xl border border-green-200 bg-green-50 p-6" role="status">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Thank you! Enquiry received.</p>
            <p className="text-sm text-gray-600">Our security expert will call you back shortly.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="self-start rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  const id = (name: string) => `${idPrefix}-${name}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id("fullName")} className={labelClass}>
          Full Name <span className="text-red-600">*</span>
        </label>
        <div className="relative">
          <User className={iconClass} aria-hidden="true" />
          <input
            id={id("fullName")} type="text" name="fullName" autoComplete="name"
            placeholder="e.g., Rahul Sharma" value={formData.fullName} onChange={handleChange} maxLength={100}
            aria-invalid={!!errors.fullName} className={`${inputClass(!!errors.fullName)} pl-10`}
          />
        </div>
        {errors.fullName && <p className="text-red-600 text-xs">{errors.fullName}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={id("phone")} className={labelClass}>
          Mobile Number (Call/WhatsApp) <span className="text-red-600">*</span>
        </label>
        <div className="flex gap-2">
          <span className="flex items-center rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm text-gray-600">+91</span>
          <div className="relative flex-1">
            <Phone className={iconClass} aria-hidden="true" />
            <input
              id={id("phone")} type="tel" name="phone" autoComplete="tel-national" inputMode="numeric"
              placeholder="10-digit mobile number" value={formData.phone} onChange={handleChange} maxLength={10}
              aria-invalid={!!errors.phone} className={`${inputClass(!!errors.phone)} pl-10`}
            />
          </div>
        </div>
        {errors.phone && <p className="text-red-600 text-xs">{errors.phone}</p>}
      </div>

      <div className={`grid grid-cols-1 gap-3.5 ${stacked ? "" : "sm:grid-cols-2"}`}>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={id("service")} className={labelClass}>Required Service</label>
          <div className="relative">
            <select
              id={id("service")} name="service" value={formData.service} onChange={handleChange}
              className={`${inputClass()} appearance-none cursor-pointer pr-8`}
            >
              <option value="">Select a service</option>
              {ENQUIRY_SERVICES.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
              <path d="M1 1L6 6L11 1" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={id("city")} className={labelClass}>Location / Area</label>
          <div className="relative">
            <MapPin className={iconClass} aria-hidden="true" />
            <input
              id={id("city")} type="text" name="city" autoComplete="address-level2"
              placeholder="e.g., Laxmi Nagar, Noida" value={formData.city} onChange={handleChange} maxLength={100}
              className={`${inputClass()} pl-10`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={id("message")} className={labelClass}>
          Requirement Details <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <textarea
          id={id("message")} name="message" rows={2} maxLength={1900}
          placeholder="Number of cameras, site type (home/shop/office), or the issue you're facing"
          value={formData.message} onChange={handleChange}
          className={`${inputClass()} resize-none`}
        />
      </div>

      <div ref={turnstileRef} />

      {statusMsg && <p className="text-sm text-red-600" role="alert">{statusMsg}</p>}

      <button
        type="submit"
        disabled={loading || !turnstileToken}
        className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting..." : submitLabel}
        {!loading && <Send className="h-4 w-4" aria-hidden="true" />}
      </button>
      <p className="text-center text-[11px] text-gray-500">
        No spam. We only use your details to respond to this enquiry.
      </p>
    </form>
  );
}
