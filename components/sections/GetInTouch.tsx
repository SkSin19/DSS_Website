/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { requestEmailOtpGeneral, verifyEmailOtpGeneral, submitGeneralEnquiry } from "@/lib/enquiry-api";
import Image from "next/image";

const GetInTouch: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    enquiryAbout: "",
    city: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [enquiryId, setEnquiryId] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [devOtp, setDevOtp] = useState<string | null>(null);

  const sanitizeInput = (value: string, field?: string) => {
    // For multiline message allow internal and trailing spaces (don't trim)
    if (field === "message") {
      let v = String(value || "");
      // remove control chars except normal space (allow punctuation and spaces/newlines removed)
      v = v.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F<>]/g, "");
      return v;
    }

    let v = String(value || "").trim();
    // Basic sanitization: remove control chars and angle brackets
    v = v.replace(/[\x00-\x1F<>]/g, "");

    if (field === "email") return v.toLowerCase();
    if (field === "phone") return v.replace(/\D/g, "");
    return v;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const raw = e.target.value;
    const cleaned = sanitizeInput(raw, name);

    setFormData((prev) => ({ ...prev, [name]: cleaned }));

    // clear existing error for this field
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
  };

  const validate = () => {
    const errs: { [k: string]: string } = {};

    if (!formData.fullName || formData.fullName.length < 2) errs.fullName = "Enter your full name.";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) errs.email = "Enter a valid email.";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) errs.phone = "Enter a 10-digit phone number.";
    if (!formData.enquiryAbout) errs.enquiryAbout = "Select an enquiry subject.";
    if (!formData.message || formData.message.length < 10) errs.message = "Please add a short message (at least 10 characters).";

    return errs;
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    // Request OTP for email verification (general enquiry)
    setLoading(true);
    setMessage(null);

    requestEmailOtpGeneral({ name: formData.fullName, company: "", email: formData.email, message: formData.message })
      .then((res) => {
        setEnquiryId(res.enquiryId);
        setOtpSent(true);
        setDevOtp(res.devOtp || null);
        setMessage("Verification code sent to your email.");
      })
      .catch((err) => {
        console.error(err);
        setMessage(err?.response?.data?.message || "Failed to send verification code. Try again later.");
      })
      .finally(() => setLoading(false));
  };

  const handleVerify = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!enquiryId) return setMessage("No verification reference available.");
    if (!/^\d{6}$/.test(otp)) return setMessage("Enter the 6-digit verification code.");

    setLoading(true);
    setMessage(null);

    try {
      await verifyEmailOtpGeneral({ enquiryId, otp });

      // on verify, submit final enquiry
      // prefer user's typed message; fall back to auto-built summary
      const finalMessage = formData.message && formData.message.length >= 1
        ? formData.message
        : `Name: ${formData.fullName}\nEnquiry: ${formData.enquiryAbout}\nCity: ${formData.city}`;

      const submitRes = await submitGeneralEnquiry({ enquiryId, phoneCountryCode: "+91", phoneNumber: formData.phone, message: finalMessage });

      setMessage("Enquiry submitted successfully. We'll get back to you soon.");
      // reset form
      setFormData({ fullName: "", email: "", phone: "", enquiryAbout: "", city: "", message: "" });
      setEnquiryId(null);
      setOtp("");
      setOtpSent(false);
      setDevOtp(null);
    } catch (err: any) {
      console.error(err);
      setMessage(err?.response?.data?.message || "Failed to verify or submit enquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="select-none relative w-full min-h-screen bg-[#06090f] overflow-hidden flex">

      {/* ─── RIGHT PANEL — Full-bleed background image ─── */}
      {/* Sits behind everything, covers the right 55% but bleeds across full width */}
      <div className="absolute inset-0 z-0">
        {/* The house photo fills the entire right side */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-[62%]">
          <Image
            src="/images/general/get-in-touch.png"
            alt="Smart security home"
            fill
            className="object-cover object-center"
            unoptimized
          />
          {/* Dark overlay so image doesn't overpower — keeps the moody night tone */}
          <div className="absolute inset-0 bg-[#06090f]/30" />
          {/* Top gradient fade on the image to blend with hero background */}
          <div
            className="absolute left-0 right-0 top-0 pointer-events-none"
            style={{
              height: "7rem",
              background: "linear-gradient(to bottom, #06090f 0%, rgba(6,9,15,0) 100%)",
              zIndex: 5,
            }}
          />
        </div>

        {/* Left-side blackout so the form area is fully dark */}
        <div className="absolute inset-y-0 left-0 w-[45%] bg-[#06090f]" />

        {/* Gradient fade from the black left into the image — seamless blend */}
        <div
          className="absolute inset-y-0 left-[38%] w-[22%]"
          style={{
            background:
              "linear-gradient(to right, #06090f 0%, rgba(6,9,15,0.85) 30%, rgba(6,9,15,0.4) 65%, transparent 100%)",
          }}
        />

        {/* Top vignette to deepen the sky */}
        <div
          className="absolute inset-x-0 top-0 h-40"
          style={{
            background: "linear-gradient(to bottom, #06090f 0%, transparent 100%)",
          }}
        />

        {/* Bottom vignette */}
        <div
          className="absolute inset-x-0 bottom-0 h-48"
          style={{
            background: "linear-gradient(to top, #06090f 0%, transparent 100%)",
          }}
        />

        {/* Right vignette edge */}
        <div
          className="absolute inset-y-0 right-0 w-24"
          style={{
            background: "linear-gradient(to left, #06090f 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ─── LEFT PANEL — Get in Touch Form ─── */}
      <div className="relative z-10 w-full md:w-[45%] flex flex-col justify-center px-8 py-14 lg:px-12">
        <div className="w-full rounded-3xl border border-slate-700/50 bg-[#06090f]/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-md sm:p-8">
          <h2 className="text-white text-3xl font-bold mb-2">Get in Touch</h2>
          <p className="text-gray-400 text-sm mb-8">
            We&apos;re here to help you build a safer and smarter tomorrow.
          </p>

          <div className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-xs font-medium tracking-wide uppercase">
                <span className="text-red-500 mr-1">*</span>Full Name
              </label>
              <input
                type="text"
                name="fullName"
                aria-required
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className={`bg-black/30 border rounded-2xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#2563eb] transition-colors ${errors.fullName ? "border-red-500" : "border-[#1e3a5f]/80"}`}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-xs font-medium tracking-wide uppercase">
                <span className="text-red-500 mr-1">*</span>Email Address
              </label>
              <input
                type="email"
                name="email"
                aria-required
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={`bg-black/30 border rounded-2xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#2563eb] transition-colors ${errors.email ? "border-red-500" : "border-[#1e3a5f]/80"}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-xs font-medium tracking-wide uppercase">
                <span className="text-red-500 mr-1">*</span>Phone Number
              </label>
              <div className="flex gap-2">
                <div className="flex items-center gap-1 bg-black/30 border border-[#1e3a5f]/80 rounded-2xl px-3 py-2.5 text-white text-sm min-w-[70px]">
                  <span className="text-base">🇮🇳</span>
                  <span className="text-gray-400 text-xs">+91</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                className={`bg-black/30 border rounded-2xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#2563eb] transition-colors ${errors.phone ? "border-red-500" : "border-[#1e3a5f]/80"}`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Enquiry About */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-xs font-medium tracking-wide uppercase">
                <span className="text-red-500 mr-1">*</span>Enquiry About
              </label>
              <div className="relative">
                <select
                  name="enquiryAbout"
                  aria-required
                  value={formData.enquiryAbout}
                  onChange={handleChange}
                  className={`w-full bg-black/30 border rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#2563eb] transition-colors appearance-none cursor-pointer ${errors.enquiryAbout ? "border-red-500" : "border-[#1e3a5f]/80"}`}
                >
                  <option value="" disabled className="text-black">Select an option</option>
                  <option value="cctv" className="text-black">CCTV Systems</option>
                  <option value="access" className="text-black">Access Control</option>
                  <option value="alarm" className="text-black">Alarm Systems</option>
                  <option value="smart" className="text-black">Smart Home Security</option>
                  <option value="other" className="text-black">Other</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              {errors.enquiryAbout && <p className="text-red-500 text-xs mt-1">{errors.enquiryAbout}</p>}
            </div>

            {/* City */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-xs font-medium tracking-wide uppercase">
                City
              </label>
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                className="bg-black/30 border border-[#1e3a5f]/80 rounded-2xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#2563eb] transition-colors"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-xs font-medium tracking-wide uppercase">
                <span className="text-red-500 mr-1">*</span>Message
              </label>
              <textarea
                name="message"
                placeholder="Tell us about your enquiry, use case, quantity, or installation needs."
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`bg-black/30 border rounded-2xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#2563eb] transition-colors ${errors.message ? "border-red-500" : "border-[#1e3a5f]/80"}`}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            {/* Submit / OTP area */}
            {!otpSent ? (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`mt-2 ${loading ? "opacity-70 pointer-events-none" : ""} bg-[#ff251e] hover:bg-[#c91a14] text-white font-semibold text-sm py-4 px-10 rounded-full transition-colors duration-200 self-start`}
              >
                {loading ? "Sending..." : "SEND ENQUIRY →"}
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={handleOtpChange}
                    className="bg-black/30 border border-[#1e3a5f]/80 rounded-2xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#2563eb] transition-colors w-40"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleVerify}
                    disabled={loading}
                    className={`bg-[#10b981] hover:bg-[#059669] text-white font-semibold text-sm py-3 px-6 rounded-full transition-colors ${loading ? "opacity-70 pointer-events-none" : ""}`}
                  >
                    {loading ? "Verifying..." : "VERIFY & SEND"}
                  </button>

                  <button
                    onClick={() => {
                      // resend OTP
                      setLoading(true);
                      setMessage(null);
                      requestEmailOtpGeneral({ name: formData.fullName, company: "", email: formData.email, message: formData.message })
                        .then((res) => {
                          setEnquiryId(res.enquiryId);
                          setDevOtp(res.devOtp || null);
                          setMessage("Verification code re-sent to your email.");
                        })
                        .catch((err) => setMessage(err?.response?.data?.message || "Failed to resend code."))
                        .finally(() => setLoading(false));
                    }}
                    disabled={loading}
                    className="text-sm text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    Resend
                  </button>
                </div>
              </div>
            )}

            {devOtp ? (
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200 mt-3">
                Development code: {devOtp}
              </div>
            ) : null}

            {message && <p className="mt-3 text-sm text-sky-200">{message}</p>}
          </div>
        </div>
      </div>

      {/* ─── RIGHT PANEL — Text overlay on image ─── */}
      <div className="hidden md:flex relative z-10 flex-1 flex-col justify-end pb-16 px-10">
        <div>
          <h2 className="text-white text-3xl font-bold leading-tight drop-shadow-lg">
            Smart Security for
          </h2>
          <h2 className="text-[#f97316] text-3xl font-bold leading-tight mb-3 drop-shadow-lg">
            Every Home.
          </h2>
          <p className="text-gray-300 text-sm max-w-sm drop-shadow-md">
            Intelligent security solutions that protect what matters most.
          </p>
        </div>
      </div>

    </section>
  );
};

export default GetInTouch;