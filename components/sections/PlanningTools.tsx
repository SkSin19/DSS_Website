"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Check, Columns3 } from "lucide-react";
import {
  PROPERTY_TYPES,
  calculateCctv,
  defaultInputFor,
  formatInr,
  type PropertyType,
} from "@/lib/cctv-calculator";

// The six most common enquiries; the full calculator has every type.
const QUICK_TYPES: PropertyType[] = ["flat", "house", "shop", "office", "society", "factory"];

/** Home-page teaser for the CCTV cost calculator and product comparison tools. */
export default function PlanningTools() {
  const [type, setType] = useState<PropertyType>("house");
  const estimate = useMemo(() => calculateCctv(defaultInputFor(type)), [type]);

  return (
    <section aria-labelledby="planning-tools-heading" className="w-full bg-white py-16 font-poppins">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-600!">Free Tools</p>
          <h2 id="planning-tools-heading" className="mt-2 text-3xl font-bold text-gray-900!">
            Know the cost before you call
          </h2>
          <p className="mt-2 text-gray-600!">
            Get an approximate price for your property in seconds, and compare products side by side before you buy.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.25fr_1fr]">
          {/* ── Quick estimate ── */}
          <div className="flex flex-col rounded-3xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600 text-white">
                <Calculator className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-bold text-gray-900">CCTV Cost Calculator</h3>
            </div>

            <p className="mt-5 text-sm font-semibold text-gray-900">What do you want to secure?</p>
            <div role="radiogroup" aria-label="Property type" className="mt-3 flex flex-wrap gap-2">
              {QUICK_TYPES.map((id) => (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={type === id}
                  onClick={() => setType(id)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    type === id
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50"
                  }`}
                >
                  {PROPERTY_TYPES.find((p) => p.id === id)?.label}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-gray-900 p-5 text-white" aria-live="polite">
              <p className="text-xs uppercase tracking-wide text-gray-300">
                Typical setup · {estimate.totalCameras} cameras, {Math.max(1, Math.round(estimate.storageTb))} TB recording
              </p>
              <p className="mt-1 text-2xl font-bold sm:text-3xl">
                {formatInr(estimate.total[0])} – {formatInr(estimate.total[1])}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Approximate installed price for a typical {PROPERTY_TYPES.find((p) => p.id === type)?.label.toLowerCase()}. GST extra.
              </p>
            </div>

            <Link
              href={`/tools/cctv-cost-calculator?type=${type}`}
              className="group mt-6 inline-flex items-center justify-center gap-2 self-start rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white! transition-colors hover:bg-red-700"
            >
              Customise for your property
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          {/* ── Compare ── */}
          <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-900 text-white">
                <Columns3 className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-bold text-gray-900">Compare Products</h3>
            </div>
            <p className="mt-5 text-gray-600">
              Not sure which camera or recorder to pick? Put up to four products side by side.
            </p>
            <ul className="mt-5 flex-1 space-y-3 text-sm text-gray-700">
              {[
                "Resolution, lens and night-vision range",
                "NVR channels, storage and AI features",
                "Hikvision, CP Plus, Dahua, PRAMA, eSSL and more",
                "Share the comparison on WhatsApp",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/tools/compare-products"
              className="group mt-6 inline-flex items-center justify-center gap-2 self-start rounded-lg border border-gray-900 px-5 py-3 text-sm font-semibold text-gray-900! transition-colors hover:bg-gray-900 hover:text-white!"
            >
              Compare products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
