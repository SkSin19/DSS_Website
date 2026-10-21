"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Camera, HardDrive, Minus, Plus, Server, Sparkles } from "lucide-react";
import EnquiryForm from "@/components/sections/EnquiryForm";
import { trackEvent } from "@/lib/analytics";
import { openChat } from "@/lib/chat-api";
import { whatsappUrl } from "@/lib/constants";
import {
  PROPERTY_DEFAULTS,
  PROPERTY_TYPES,
  calculateCctv,
  defaultInputFor,
  formatInr,
  summariseSetup,
  type CalculatorInput,
  type PropertyType,
} from "@/lib/cctv-calculator";

const INITIAL = defaultInputFor("house");

/* ── Small form controls ── */

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        {hint && <p className="text-xs text-gray-500">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function Segmented<T extends string | number>({
  value,
  options,
  onChange,
  name,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  name: string;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
            value === o.value
              ? "border-red-600 bg-red-600 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Stepper({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  suffix,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  label: string;
  suffix?: string;
}) {
  const clamp = (v: number) => Math.min(max, Math.max(min, Number.isFinite(v) ? v : min));
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(clamp(value - step))}
        aria-label={`Decrease ${label}`}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        aria-label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(clamp(Number(e.target.value)))}
        className="h-10 w-24 rounded-lg border border-gray-300 bg-white px-3 text-center text-sm font-semibold text-gray-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
      />
      <button
        type="button"
        onClick={() => onChange(clamp(value + step))}
        aria-label={`Increase ${label}`}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
      {suffix && <span className="text-sm text-gray-500">{suffix}</span>}
    </div>
  );
}

function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint: string }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 hover:border-red-200">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-red-600"
      />
      <span>
        <span className="block text-sm font-semibold text-gray-900">{label}</span>
        <span className="block text-xs text-gray-500">{hint}</span>
      </span>
    </label>
  );
}

/* ── Calculator ── */

export default function CctvCalculator() {
  const [input, setInput] = useState<CalculatorInput>(INITIAL);
  const result = useMemo(() => calculateCctv(input), [input]);
  const summary = useMemo(() => summariseSetup(input, result), [input, result]);

  const set = <K extends keyof CalculatorInput>(key: K, value: CalculatorInput[K]) =>
    setInput((prev) => ({ ...prev, [key]: value }));

  const choosePropertyType = (propertyType: PropertyType) =>
    setInput((prev) => ({ ...prev, propertyType, ...PROPERTY_DEFAULTS[propertyType] }));

  // ?type=society etc. (from the home page) opens the calculator pre-set.
  const baseline = useRef(INITIAL);
  useEffect(() => {
    const type = new URLSearchParams(window.location.search).get("type") as PropertyType | null;
    if (!type || !(type in PROPERTY_DEFAULTS)) return;
    baseline.current = defaultInputFor(type);
    setInput(baseline.current);
  }, []);

  // Count the calculator as "used" once the visitor changes something.
  const tracked = useRef(false);
  useEffect(() => {
    if (tracked.current || input === baseline.current) return;
    tracked.current = true;
    trackEvent("calculator_complete", { property_type: input.propertyType });
  }, [input]);

  const nvrItem = result.items.find((i) => i.label.endsWith("NVR"));
  const nvrSummary = nvrItem ? `${nvrItem.qty > 1 ? `${nvrItem.qty}×` : ""}${nvrItem.label.split("-")[0]}-ch` : "-";

  const areaLabel =
    input.propertyType === "society"
      ? "Common area per floor (lobby, corridors)"
      : input.propertyType === "factory"
        ? "Covered area per floor / shed"
        : "Built-up area per floor";

  return (
    <div className="space-y-10">
      {/* The quote form sits outside this grid so the sticky summary stops at its end. */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ── Questions ── */}
        <div className="space-y-7 rounded-3xl border border-gray-200 bg-gray-50 p-5 sm:p-8">
          <Field label="1. What kind of property is it?">
            <Segmented
              name="Property type"
              value={input.propertyType}
              onChange={choosePropertyType}
              options={PROPERTY_TYPES.map((p) => ({ value: p.id, label: p.label }))}
            />
          </Field>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label={`2. ${areaLabel}`} hint="Approximate is fine">
              <Stepper label="Area per floor" value={input.areaPerFloor} onChange={(v) => set("areaPerFloor", v)} min={200} max={200000} step={100} suffix="sq ft" />
            </Field>
            <Field label="3. Number of floors" hint={input.propertyType === "society" ? "Floors to cover, across towers" : undefined}>
              <Stepper label="Floors" value={input.floors} onChange={(v) => set("floors", v)} min={1} max={100} />
            </Field>
            <Field label="4. Entry / exit gates" hint="Main doors and gates to watch">
              <Stepper label="Gates" value={input.gates} onChange={(v) => set("gates", v)} min={0} max={20} />
            </Field>
            <Field label="5. Outdoor perimeter">
              <Segmented
                name="Perimeter coverage"
                value={input.perimeter}
                onChange={(v) => set("perimeter", v)}
                options={[
                  { value: "none", label: "Not needed" },
                  { value: "partial", label: "Partial" },
                  { value: "full", label: "Full boundary" },
                ]}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="6. Camera resolution" hint="4MP suits most homes and offices">
              <Segmented
                name="Resolution"
                value={input.resolution}
                onChange={(v) => set("resolution", v)}
                options={[
                  { value: "2MP", label: "2MP (1080p)" },
                  { value: "4MP", label: "4MP (2K)" },
                  { value: "8MP", label: "8MP (4K)" },
                ]}
              />
            </Field>
            <Field label="7. Night vision outdoors">
              <Segmented
                name="Night vision"
                value={input.nightVision}
                onChange={(v) => set("nightVision", v)}
                options={[
                  { value: "ir", label: "Black & white (IR)" },
                  { value: "colour", label: "Full colour" },
                ]}
              />
            </Field>
          </div>

          <Field label="8. How many days of recording?" hint="Older footage is overwritten automatically">
            <Segmented
              name="Recording days"
              value={input.recordingDays}
              onChange={(v) => set("recordingDays", v)}
              options={[7, 15, 30, 60, 90].map((d) => ({ value: d, label: `${d} days` }))}
            />
          </Field>

          <Field label="9. Extras">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Toggle checked={input.parking} onChange={(v) => set("parking", v)} label="Parking area" hint="Cameras over parked vehicles" />
              <Toggle checked={input.faceRecognition} onChange={(v) => set("faceRecognition", v)} label="Face recognition" hint="Identify people at entrances" />
              <Toggle checked={input.anpr} onChange={(v) => set("anpr", v)} label="ANPR" hint="Read number plates at vehicle gates" />
              <Toggle checked={input.powerBackup} onChange={(v) => set("powerBackup", v)} label="Power backup (UPS)" hint="Keep recording during power cuts" />
            </div>
            {input.anpr && (
              <div className="mt-3">
                <p className="mb-2 text-xs font-medium text-gray-600">Gates used by vehicles</p>
                <Stepper label="Vehicle gates" value={input.vehicleGates} onChange={(v) => set("vehicleGates", v)} min={1} max={Math.max(1, input.gates)} />
              </div>
            )}
          </Field>
        </div>

        {/* ── Recommendation ── */}
        <div className="lg:sticky lg:top-36 lg:self-start">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_20px_50px_rgba(17,24,39,0.08)] sm:p-7" aria-live="polite">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Your recommended system</p>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { icon: Camera, value: result.totalCameras, label: "Cameras" },
                { icon: Server, value: nvrSummary, label: "NVR" },
                { icon: HardDrive, value: `${Math.max(1, Math.round(result.storageTb))} TB`, label: "Storage" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="rounded-2xl bg-gray-50 p-3 text-center">
                  <Icon className="mx-auto h-5 w-5 text-red-600" aria-hidden="true" />
                  <p className="mt-1 text-lg font-bold text-gray-900">{value}</p>
                  <p className="text-[11px] uppercase tracking-wide text-gray-500">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-gray-900 p-5 text-white">
              <p className="text-xs uppercase tracking-wide text-gray-300">Indicative cost, installed</p>
              <p className="mt-1 text-2xl font-bold sm:text-3xl">
                {formatInr(result.total[0])} – {formatInr(result.total[1])}
              </p>
              <p className="mt-1 text-xs text-gray-400">Includes cameras, recorder, storage, cabling and installation. GST extra.</p>
            </div>

            <details className="group mt-5">
              <summary className="cursor-pointer list-none text-sm font-semibold text-red-600 marker:hidden">
                <span className="group-open:hidden">Show item-wise breakup ▾</span>
                <span className="hidden group-open:inline">Hide item-wise breakup ▴</span>
              </summary>
              <ul className="mt-3 divide-y divide-gray-100 text-sm">
                {result.items.map((item) => (
                  <li key={item.label} className="flex items-start justify-between gap-3 py-2.5">
                    <span>
                      <span className="font-medium text-gray-900">
                        {item.qty > 1 && !item.label.startsWith("Cat6") ? `${item.qty} × ` : ""}
                        {item.label}
                        {item.label.startsWith("Cat6") ? ` (${item.qty} m)` : ""}
                      </span>
                      <span className="block text-xs text-gray-500">{item.detail}</span>
                    </span>
                    <span className="shrink-0 text-right text-gray-700">
                      {formatInr(item.total[0])} – {formatInr(item.total[1])}
                    </span>
                  </li>
                ))}
              </ul>
            </details>

            <p className="mt-4 text-xs leading-relaxed text-gray-500">
              This is an estimate from typical market prices, not a quotation. Your final price depends on the brand,
              site layout and cable routes, which we confirm during a free site survey.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <a
                href="#calculator-quote"
                onClick={() => trackEvent("calculator_quote_click", { property_type: input.propertyType })}
                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white! transition-colors hover:bg-red-700"
              >
                Get Final Quote
              </a>
              <a
                href={whatsappUrl(`Hi, I used the CCTV calculator on your website. ${summary} Please share a final quote.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#25D366] px-4 py-3 text-sm font-semibold text-white! transition-colors hover:bg-[#1da851]"
              >
                Send on WhatsApp
              </a>
            </div>
            <button
              type="button"
              onClick={() => openChat({ prompt: `${summary} Is this the right setup for me?`, send: true })}
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Ask AI whether this setup is right for you
            </button>
          </div>
        </div>
      </div>

      {/* ── Final quote ── */}
      <section id="calculator-quote" className="scroll-mt-36">
        <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">Get your final quote</h2>
          <p className="mt-2 mb-6 text-sm text-gray-600">
            Share your details and we&apos;ll call you to confirm the setup and book a free site survey. Your calculator
            selections are sent along with the form.
          </p>
          <EnquiryForm idPrefix="calculator-enquiry" defaultService="cctv-installation" submitLabel="Get Final Quote" attachment={summary} />
        </div>
      </section>
    </div>
  );
}
