/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { submitEnquiry } from "@/lib/enquiry-api";
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

type ProductEnquiryDialogProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    model: string;
    company: string;
  };
};

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const COUNTRY_CODES = ["+91", "+1", "+44", "+61", "+65", "+971"];

const emptyForm = {
  countryCode: "+91",
  phoneNumber: "",
  message: "",
};

export default function ProductEnquiryDialog({ product }: ProductEnquiryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<"form" | "done">("form");
  const [email, setEmail] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);

  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const enquiryTitle = useMemo(() => `${product.name} ${product.model}`, [product.name, product.model]);

  // Load Turnstile script once
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

  // Render widget when dialog opens and script is ready
  useEffect(() => {
    if (!isOpen || !turnstileReady || !turnstileRef.current || !window.turnstile) return;
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
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [isOpen, turnstileReady]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setStage("form");
      setEmail("");
      setForm(emptyForm);
      setError("");
      setIsLoading(false);
      setTurnstileToken("");
    }
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const sanitizeEmail = (v: string) => v.trim().toLowerCase().replace(/[^a-z0-9@._+\-]/g, "");
  const sanitizePhone = (v: string) => v.replace(/\D/g, "").slice(0, 10);
  const sanitizeMessage = (v: string) => v.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F<>]/g, "").slice(0, 1000);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const cleanedEmail = sanitizeEmail(email);
    const cleanedPhone = sanitizePhone(form.phoneNumber);
    const cleanedMessage = sanitizeMessage(form.message);

    if (!/^\S+@\S+\.\S+$/.test(cleanedEmail)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!/^\d{10}$/.test(cleanedPhone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }
    if (cleanedMessage.trim().length < 10) {
      setError("Please write a short enquiry message (at least 10 characters).");
      return;
    }
    if (!turnstileToken) {
      setError("Please complete the verification check.");
      return;
    }

    try {
      setIsLoading(true);
      await submitEnquiry({
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        productModel: product.model,
        company: product.company,
        email: cleanedEmail,
        phoneCountryCode: form.countryCode,
        phoneNumber: cleanedPhone,
        message: cleanedMessage,
        turnstileToken,
      });
      setStage("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit the enquiry right now.");
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
        setTurnstileToken("");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
      >
        Enquire now
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 p-4 backdrop-blur-sm sm:items-center sm:p-6 select-none">
          <div
            className="w-full max-w-2xl overflow-hidden rounded-[28px] border border-gray-200 text-gray-900 shadow-[0_30px_90px_rgba(2,6,23,0.25)]"
            style={{ backgroundColor: THEME_COLORS.shadowGrey50 }}
          >
            {/* Header */}
            <div
              className="border-b border-gray-200 px-5 py-4 sm:px-6 select-none"
              style={{ backgroundColor: THEME_COLORS.shadowGrey100 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-red-600">Product enquiry</p>
                  <h3 className="mt-2 text-xl font-semibold sm:text-2xl select-none">{enquiryTitle.split(" ")[0]}</h3>
                  <p className="mt-1 text-sm text-gray-600">Fill in your details and we will get back to you shortly.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="border-gray-500 px-3 py-1.5 text-sm text-gray-800 transition-colors hover:text-red-900 md:text-xl"
                  aria-label="Close enquiry dialog"
                >
                  X
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-5 py-5 sm:px-6 sm:py-6">
              {error && (
                <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {stage === "form" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition-colors placeholder:text-gray-500 focus:border-red-400"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Phone number</label>
                    <div className="flex gap-2">
                      <select
                        value={form.countryCode}
                        onChange={(e) => setForm((c) => ({ ...c, countryCode: e.target.value }))}
                        className="rounded-2xl border border-gray-200 bg-white px-3 py-3 text-gray-900 outline-none transition-colors focus:border-red-400"
                      >
                        {COUNTRY_CODES.map((code) => (
                          <option key={code} value={code}>{code}</option>
                        ))}
                      </select>
                      <input
                        value={form.phoneNumber}
                        onChange={(e) => setForm((c) => ({ ...c, phoneNumber: sanitizePhone(e.target.value) }))}
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition-colors placeholder:text-gray-500 focus:border-red-400"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm((c) => ({ ...c, message: sanitizeMessage(e.target.value) }))}
                      rows={4}
                      maxLength={1000}
                      placeholder="Tell us what you need, your use case, quantity, or installation needs."
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition-colors placeholder:text-gray-500 focus:border-red-400"
                    />
                    <p className="mt-1 text-right text-xs text-gray-400">{form.message.length}/1000</p>
                  </div>

                  {/* Turnstile */}
                  <div ref={turnstileRef} />

                  <button
                    type="submit"
                    disabled={isLoading || !turnstileToken}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? "Submitting..." : "Send enquiry"}
                  </button>
                </form>
              )}

              {stage === "done" && (
                <div className="flex flex-col items-start gap-4 rounded-lg border border-gray-200 bg-gray-100 p-6 text-gray-900 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">Enquiry submitted</p>
                      <p className="text-sm text-gray-600">
                        Thank you — we received your enquiry for <span className="font-medium">{enquiryTitle}</span>.
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">A member of our team will contact you shortly. For urgent requests, please call our sales line.</p>
                  <div className="flex w-full justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setStage("form")}
                      className="rounded-md border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Start new enquiry
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}