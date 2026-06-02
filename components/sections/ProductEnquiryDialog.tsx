/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { requestEmailOtp, submitEnquiry, verifyEmailOtp } from "@/lib/enquiry-api";
import { THEME_COLORS } from "@/themes/colors";

type ProductEnquiryDialogProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    model: string;
    company: string;
  };
};

const COUNTRY_CODES = ["+91", "+1", "+44", "+61", "+65", "+971"];

const emptyPhoneForm = {
  countryCode: "+91",
  phoneNumber: "",
};

export default function ProductEnquiryDialog({ product }: ProductEnquiryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<"email" | "otp" | "phone" | "message" | "done">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [phoneForm, setPhoneForm] = useState(emptyPhoneForm);
  const [message, setMessage] = useState("");
  const [enquiryId, setEnquiryId] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const enquiryTitle = useMemo(() => `${product.name} ${product.model}`, [product.name, product.model]);

  useEffect(() => {
    if (!isOpen) {
      setStage("email");
      setEmail("");
      setOtp("");
      setPhoneForm(emptyPhoneForm);
      setMessage("");
      setEnquiryId("");
      setStatusMessage("");
      setDevOtp("");
      setError("");
      setIsLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const requestOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setStatusMessage("");

    const cleanedEmail = email.trim().toLowerCase();

    if (!/^\S+@\S+\.\S+$/.test(cleanedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await requestEmailOtp({
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        productModel: product.model,
        company: product.company,
        email: cleanedEmail,
      });

      setEnquiryId(response.enquiryId);
      setEmail(response.email);
      setDevOtp(response.devOtp || "");
      setStage("otp");
      setStatusMessage(`We sent a verification code to ${response.email}.`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to send the verification code right now.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setStatusMessage("");

    if (!enquiryId) {
      setError("Request the verification code again before continuing.");
      setStage("email");
      return;
    }

    const cleanedOtp = otp.replace(/\D/g, "");

    if (!/^\d{6}$/.test(cleanedOtp)) {
      setError("Enter the 6-digit code from your email.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await verifyEmailOtp({
        enquiryId,
        otp: cleanedOtp,
      });

      setEnquiryId(response.enquiryId);
      setStage("phone");
      setStatusMessage(response.message);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to verify the code right now.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitFinalEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setStatusMessage("");

    if (!enquiryId) {
      setError("Verify your email before submitting the enquiry.");
      setStage("email");
      return;
    }

    const cleanedPhone = phoneForm.phoneNumber.replace(/\D/g, "");
    const cleanedMessage = message.trim();

    if (!/^\d{10}$/.test(cleanedPhone)) {
      setError("Enter a 10-digit phone number.");
      return;
    }

    if (cleanedMessage.length < 10) {
      setError("Please write a short enquiry message.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await submitEnquiry({
        enquiryId,
        phoneCountryCode: phoneForm.countryCode,
        phoneNumber: cleanedPhone,
        message: cleanedMessage,
      });

      setStage("done");
      setStatusMessage(response.message);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit the enquiry right now.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-400"
      >
        Enquire now
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 p-4 backdrop-blur-sm sm:items-center sm:p-6">
          <div className="w-full max-w-2xl overflow-hidden rounded-[28px] border border-gray-200 text-gray-900 shadow-[0_30px_90px_rgba(2,6,23,0.25)]" style={{ backgroundColor: THEME_COLORS.shadowGrey50 }}>
            <div className="border-b border-gray-200 px-5 py-4 sm:px-6" style={{ backgroundColor: THEME_COLORS.shadowGrey100 }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-red-600">Product enquiry</p>
                  <h3 className="mt-2 text-xl font-semibold sm:text-2xl">{enquiryTitle}</h3>
                  <p className="mt-1 text-sm text-gray-600">Verify your email, enter the code, then add your phone and enquiry details.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  aria-label="Close enquiry dialog"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="px-5 py-5 sm:px-6 sm:py-6">
              {error ? (
                <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              {statusMessage ? (
                <div className="mb-4 rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-700">
                  {statusMessage}
                </div>
              ) : null}

              {stage === "email" ? (
                <form onSubmit={requestOtp} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                    <input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition-colors placeholder:text-gray-500 focus:border-red-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? "Sending code..." : "Send verification code"}
                  </button>
                </form>
              ) : null}

              {stage === "otp" ? (
                <form onSubmit={verifyOtp} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Verification code</label>
                    <input
                      value={otp}
                      onChange={(event) => setOtp(event.target.value)}
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="6-digit code"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition-colors placeholder:text-gray-500 focus:border-red-400"
                    />
                  </div>


                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStage("email")}
                      className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      Edit email
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex flex-1 items-center justify-center rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isLoading ? "Verifying..." : "Verify code"}
                    </button>
                  </div>
                </form>
              ) : null}

              {stage === "phone" ? (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Country code</label>
                    <select
                      value={phoneForm.countryCode}
                      onChange={(event) => setPhoneForm((current) => ({ ...current, countryCode: event.target.value }))}
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition-colors focus:border-red-400"
                    >
                      {COUNTRY_CODES.map((code) => (
                        <option key={code} value={code} className="bg-slate-950">
                          {code}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Phone number</label>
                    <input
                      value={phoneForm.phoneNumber}
                      onChange={(event) => setPhoneForm((current) => ({ ...current, phoneNumber: event.target.value }))}
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition-colors placeholder:text-gray-500 focus:border-red-400"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStage("otp")}
                      className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      Edit code
                    </button>
                    <button
                      type="button"
                      onClick={() => setStage("message")}
                      disabled={isLoading}
                      className="inline-flex flex-1 items-center justify-center rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isLoading ? "Continuing..." : "Continue to enquiry"}
                    </button>
                  </div>
                </div>
              ) : null}

              {stage === "message" ? (
                <form onSubmit={submitFinalEnquiry} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      rows={4}
                      placeholder="Tell us what you need, your use case, quantity, or installation needs."
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition-colors placeholder:text-gray-500 focus:border-red-400"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStage("phone")}
                      className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex flex-1 items-center justify-center rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isLoading ? "Submitting..." : "Send enquiry"}
                    </button>
                  </div>
                </form>
              ) : null}

              {stage === "done" ? (
                <div className="flex flex-col items-start gap-4 rounded-lg border border-gray-200 bg-gray-100 p-6 text-gray-900 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>

                    <div>
                      <p className="text-lg font-semibold">Enquiry submitted</p>
                      <p className="text-sm text-gray-600">Thank you — we received your enquiry for <span className="font-medium">{enquiryTitle}</span>.</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">A member of our team will contact you shortly. For urgent requests, please call our sales line.</p>

                  <div className="flex w-full justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setStage("email")}
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
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}