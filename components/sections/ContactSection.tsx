import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Map as MapIcon,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";
import EnquiryForm from "@/components/sections/EnquiryForm";
import {
  CONTACT_INFO,
  OFFICE_LOCATIONS,
  SITE_EMAIL,
  SITE_HOURS,
  SITE_LANDLINE,
  SITE_LANDLINE_DISPLAY,
  SITE_NAME,
  SITE_PHONE,
  SITE_WHATSAPP_URL,
} from "@/lib/constants";

const phoneDisplay = CONTACT_INFO.find((c) => c.icon === "phone")?.value ?? SITE_PHONE;

const SERVICE_AREAS = [
  "Delhi",
  "Noida",
  "Greater Noida",
  "Ghaziabad",
  "Gurugram",
  "Faridabad",
  "Uttar Pradesh",
  "Bihar",
];

function InfoCard({
  icon: Icon,
  iconClass,
  title,
  children,
}: {
  icon: LucideIcon;
  iconClass: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-gray-200 bg-gray-50/70 p-4 sm:p-5">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${iconClass}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-bold leading-tight text-gray-900! sm:text-xl">{title}</h2>
        <div className="mt-2 text-sm leading-relaxed text-gray-600!">{children}</div>
      </div>
    </div>
  );
}

/** /enquiry page: contact details on the left, enquiry form on the right. */
export default function ContactSection() {
  return (
    <section aria-labelledby="contact-heading" className="w-full bg-white font-poppins">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 lg:px-8 lg:py-16">
        {/* ── LEFT: details ── */}
        <div className="order-2 flex flex-col gap-4 lg:order-1">
          <div className="mb-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-600!">Contact Us</p>
            <h1 id="contact-heading" className="mt-2 text-3xl font-bold leading-tight text-gray-900! md:text-4xl">
              Talk to Our Security Experts
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-gray-600! sm:text-base">
              Looking for <strong className="text-gray-900!">CCTV camera installation, repair or AMC</strong>,
              access control, biometric attendance or alarm systems? Contact{" "}
              <strong className="text-gray-900!">{SITE_NAME}</strong>. Share your{" "}
              <strong className="text-gray-900!">requirement</strong> with us, and our team will{" "}
              <strong className="text-gray-900!">help</strong> you choose the{" "}
              <strong className="text-gray-900!">right</strong> solution for your home, office or property.
            </p>
          </div>

          <InfoCard icon={MapPin} iconClass="bg-red-50 text-red-600" title="Office Addresses">
            <ul className="divide-y divide-gray-200">
              {OFFICE_LOCATIONS.map((office) => (
                <li key={office.id} className="py-3 first:pt-0 last:pb-0">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold text-gray-900!">
                    {office.region}
                    <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-gray-500! ring-1 ring-gray-200">
                      {office.label}
                    </span>
                  </p>
                  <address className="mt-1 not-italic wrap-break-word">{office.address}</address>
                </li>
              ))}
            </ul>
          </InfoCard>

            <InfoCard icon={Phone} iconClass="bg-green-50 text-green-600" title="Contact Number">
              <a href={`tel:${SITE_PHONE}`} className="block text-base font-bold text-gray-900! hover:text-red-600!">
                {phoneDisplay}
              </a>
              <a href={`tel:${SITE_LANDLINE}`} className="block hover:text-red-600!">
                Tel: {SITE_LANDLINE_DISPLAY}
              </a>
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block font-semibold text-green-700! hover:underline!"
              >
                Chat on WhatsApp →
              </a>
            </InfoCard>

            <InfoCard icon={Mail} iconClass="bg-purple-50 text-purple-600" title="Email Address">
              <a href={`mailto:${SITE_EMAIL}`} className="wrap-break-word hover:text-red-600!">
                {SITE_EMAIL}
              </a>
            </InfoCard>

          <InfoCard icon={Clock} iconClass="bg-amber-50 text-amber-600" title="Working Hours">
            {SITE_HOURS}
          </InfoCard>

          <InfoCard icon={MapIcon} iconClass="bg-sky-50 text-sky-600" title="Areas We Serve">
            <ul className="flex flex-wrap gap-2">
              {SERVICE_AREAS.map((area) => (
                <li key={area} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700! ring-1 ring-gray-200">
                  {area}
                </li>
              ))}
            </ul>
          </InfoCard>
        </div>

        {/* ── RIGHT: form ── */}
        <div id="contact-form" className="order-1 scroll-mt-36 lg:order-2">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_20px_50px_rgba(17,24,39,0.08)] sm:p-8 lg:sticky lg:top-36">
            <p className="inline-flex items-center gap-2 text-xs font-medium text-red-700! sm:text-sm">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Book a Free Site Survey
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-gray-900! sm:text-3xl">
              Book Your Free Security Consultation
            </h2>
            <p className="mt-2 mb-6 text-sm leading-relaxed text-gray-600!">
              Fill in your details below. Our technician will contact you soon, understand your
              requirement or problem, and help you choose the right security solution or service.
            </p>
            <EnquiryForm idPrefix="contact-enquiry" submitLabel="Book Free Site Survey" stacked />
          </div>
        </div>
      </div>
    </section>
  );
}
