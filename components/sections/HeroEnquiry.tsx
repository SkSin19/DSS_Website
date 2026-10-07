import Link from "next/link";
import {
  ShieldCheck,
  Phone,
  CalendarCheck,
  CheckCircle2,
} from "lucide-react";
import EnquiryForm from "@/components/sections/EnquiryForm";
import {
  CONTACT_INFO,
  FOUNDING_YEAR,
  SITE_PHONE,
  SITE_WHATSAPP_URL,
} from "@/lib/constants";

const yearsExperience = new Date().getFullYear() - FOUNDING_YEAR;
const phoneDisplay = CONTACT_INFO.find((c) => c.icon === "phone")?.value ?? SITE_PHONE;

const STATS = [
  { value: `${yearsExperience}+`, label: "Years Experience" },
  { value: "3", label: "Offices · Delhi, UP, Bihar" },
  { value: "10+", label: "Authorised Brands" },
];

const SERVICES = [
  { label: "CCTV Installation & Repair", href: "/products?category=Surveillance" },
  { label: "Access Control Systems", href: "/products?category=Access%20Control" },
  { label: "Biometric Attendance", href: "/products?category=Biometric%20%26%20Identity" },
  { label: "Video Door Phones", href: "/solutions" },
  { label: "Intrusion Alarm Systems", href: "/solutions" },
  { label: "Gate & Home Automation", href: "/solutions" },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.24-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.28l5.68-1.49a11.3 11.3 0 0 0 5.43 1.38h.01c6.25 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03" />
    </svg>
  );
}

/**
 * Home page hero: lead-generation layout (headline + trust stats + direct
 * call/WhatsApp CTAs on the left, enquiry form on the right). Rendered on the
 * server so the H1 and copy are in the initial HTML for search engines.
 */
export default function HeroEnquiry() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden border-b border-gray-200 bg-linear-to-b from-white to-gray-50 font-poppins"
    >
      {/* subtle dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-8 lg:py-16">
        {/* ── LEFT: pitch ── */}
        <div className="flex flex-col justify-center">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3.5 py-1.5 text-xs font-medium text-red-700! sm:text-[13px]">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Delhi NCR&apos;s Trusted Security Partner Since {FOUNDING_YEAR}
          </p>

          <h1
            id="hero-heading"
            className="mt-5 text-[clamp(1.9rem,4.2vw,3.1rem)] font-bold leading-[1.15] tracking-tight text-gray-900!"
          >
            CCTV Camera Installation &amp;{" "}
            <span className="text-red-600!">Security Systems</span> in Delhi NCR
          </h1>

          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-gray-600! sm:text-base">
            <strong className="font-semibold text-gray-900!">Digital Security Solutions</strong>{" "}
            supplies, installs and maintains{" "}
            <strong className="font-semibold text-gray-900!">CCTV cameras, access control, biometric attendance</strong>{" "}
            and alarm systems for homes, shops, offices and factories. Genuine products from{" "}
            <strong className="font-semibold text-gray-900!">Hikvision, CP Plus, Dahua, Honeywell</strong>{" "}
            and more, with professional installation and after-sales support across Delhi, Noida,
            Greater Noida, Ghaziabad and beyond.
          </p>

          {/* stats */}
          <dl className="mt-7 grid max-w-xl grid-cols-3 gap-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col-reverse items-center justify-center rounded-xl bg-gray-900 px-2 py-4 text-center shadow-sm"
              >
                <dt className="mt-1 text-[11px] leading-tight text-gray-300! sm:text-xs">{stat.label}</dt>
                <dd className="text-2xl font-bold text-white! sm:text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>

          {/* direct CTAs */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${SITE_PHONE}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-red-600 px-6 py-3.5 text-[15px] font-semibold text-white! shadow-sm transition-colors hover:bg-red-700"
            >
              <Phone className="h-4.5 w-4.5" aria-hidden="true" />
              Call {phoneDisplay}
            </a>
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#1f9d55] px-6 py-3.5 text-[15px] font-semibold text-white! shadow-sm transition-colors hover:bg-[#178a49]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp Us
            </a>
          </div>

          {/* services */}
          <ul className="mt-8 grid max-w-xl grid-cols-1 gap-x-6 gap-y-2.5 border-t border-gray-200 pt-6 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <li key={service.label}>
                <Link
                  href={service.href}
                  className="group inline-flex items-center gap-2 text-sm text-gray-700! transition-colors hover:text-red-600!"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-red-600!" aria-hidden="true" />
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── RIGHT: enquiry form ── */}
        <div id="enquiry" className="scroll-mt-36 lg:self-center">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_20px_50px_rgba(17,24,39,0.08)] sm:p-7">
            <p className="inline-flex items-center gap-2 text-xs font-medium text-red-700!">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Book a Free Site Survey
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-gray-900!">
              Get a Free Security Quote
            </h2>
            <p className="mt-1.5 mb-5 text-sm leading-relaxed text-gray-600!">
              Share your requirement and our technician will call you back to understand your
              site and recommend the right setup.
            </p>
            <EnquiryForm idPrefix="hero-enquiry" />
          </div>
        </div>
      </div>
    </section>
  );
}
