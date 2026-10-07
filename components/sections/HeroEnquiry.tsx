import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Phone,
  CalendarCheck,
  ArrowUpRight,
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
  {
    label: "CCTV & Surveillance",
    href: "/products?category=Surveillance",
    image: "/images/categories/video-security-cctv-systems.png",
  },
  {
    label: "Access Control",
    href: "/products?category=Access%20Control",
    image: "/images/categories/access-control-smart-entry.png",
  },
  {
    label: "Biometric Attendance",
    href: "/products?category=Biometric%20%26%20Identity",
    image: "/images/services/biometric-attendance.png",
  },
  {
    label: "Gate Automation",
    href: "/solutions",
    image: "/images/services/gate-automation.png",
  },
];

const CREDENTIALS = [
  { src: "/images/certifications/msme.webp", alt: "MSME registered - Ministry of MSME, Govt. of India", w: 300, h: 132 },
  { src: "/images/certifications/gem.webp", alt: "Registered seller on GeM (Government e-Marketplace)", w: 174, h: 78 },
  { src: "/images/certifications/iso-9001-2015.webp", alt: "ISO 9001:2015 certified", w: 300, h: 110 },
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

      <div className="relative grid w-full grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        {/* ── LEFT: pitch ── */}
        <div className="flex w-full max-w-[720px] flex-col justify-center px-4 py-10 sm:px-6 md:py-14 lg:ml-auto lg:py-16 lg:pr-12 lg:pl-8">
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

          {/* credentials */}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500!">Certified &amp; registered</span>
            {CREDENTIALS.map((c) => (
              <Image
                key={c.src}
                src={c.src}
                alt={c.alt}
                width={c.w}
                height={c.h}
                style={{ height: 34, width: "auto" }}
              />
            ))}
          </div>

          {/* services as image tiles */}
          <ul className="mt-7 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {SERVICES.map((service) => (
              <li key={service.label}>
                <Link
                  href={service.href}
                  className="group relative block aspect-4/3 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm sm:aspect-square"
                >
                  <Image
                    src={service.image}
                    alt={service.label}
                    fill
                    sizes="(max-width: 640px) 50vw, 160px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-linear-to-t from-gray-950/85 via-gray-950/20 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-1 p-2.5 text-[13px] font-semibold leading-tight text-white!">
                    {service.label}
                    <ArrowUpRight className="h-4 w-4 shrink-0 opacity-70 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── RIGHT: enquiry form ── */}
        <div id="enquiry" className="relative flex scroll-mt-36 items-center justify-center px-4 py-10 sm:px-6 md:py-14 lg:px-10 lg:py-16">
          <Image
            src="/images/hero/hero-security-showcase-business.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover object-center"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gray-950/30" />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-br from-red-900/20 via-transparent to-gray-950/25" />
          <div className="relative w-full max-w-[480px] rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_24px_60px_rgba(17,24,39,0.18)] sm:p-7 lg:border-white/60">
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
