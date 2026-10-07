import Image from "next/image";
import Link from "next/link";
import {
  Landmark,
  Building2,
  Radio,
  GraduationCap,
  Home,
  Coffee,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { CLIENTS, CLIENT_SECTORS, type Client, type ClientSector } from "@/lib/clients";

const SECTOR_ICONS: Record<ClientSector, LucideIcon> = {
  "Government & PSU": Landmark,
  "Corporate & Industry": Building2,
  "Media & Broadcasting": Radio,
  Education: GraduationCap,
  "Real Estate & Societies": Home,
  "Hospitality & Community": Coffee,
};

function LogoCard({ client, decorative = false }: { client: Client; decorative?: boolean }) {
  return (
    <li
      className="flex h-24 w-44 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white px-5 shadow-[0_1px_2px_rgba(17,24,39,0.04)] transition-shadow duration-300 hover:shadow-[0_10px_24px_rgba(17,24,39,0.10)] sm:h-28 sm:w-52"
      title={decorative ? undefined : client.name}
    >
      <Image
        src={client.logo}
        alt={decorative ? "" : `${client.name} logo`}
        width={180}
        height={90}
        // Marquee cards move via CSS transform, which native lazy-loading
        // doesn't track, so load eagerly (logos are tiny) at low priority.
        loading="eager"
        fetchPriority="low"
        className="h-auto max-h-16 w-auto max-w-full object-contain"
      />
    </li>
  );
}

function MarqueeRow({ clients, reverse = false }: { clients: Client[]; reverse?: boolean }) {
  return (
    <div
      className="group relative overflow-hidden py-2"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      {/* The list is rendered twice so a -50% translate loops seamlessly. */}
      <div
        className={`flex w-max gap-4 animate-[marquee-scroll_70s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        <ul className="flex gap-4">
          {clients.map((c) => (
            <LogoCard key={c.name} client={c} />
          ))}
        </ul>
        <ul className="flex gap-4" aria-hidden="true">
          {clients.map((c) => (
            <LogoCard key={c.name} client={c} decorative />
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Home-page "Our Clients" section: sector breakdown + two scrolling logo rows. */
export default function OurClients({ ctaHref = "/enquiry" }: { ctaHref?: string } = {}) {
  // Interleave so each row mixes sectors instead of grouping them.
  const rowA = CLIENTS.filter((_, i) => i % 2 === 0);
  const rowB = CLIENTS.filter((_, i) => i % 2 === 1);
  const sectorCounts = CLIENT_SECTORS.map((sector) => ({
    sector,
    count: CLIENTS.filter((c) => c.sector === sector).length,
  })).filter((s) => s.count > 0);

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="w-full scroll-mt-36 overflow-hidden bg-white py-16 font-poppins md:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-600!">Our Clients</p>
          <h2 id="clients-heading" className="mt-2 text-3xl font-bold leading-tight text-gray-900! md:text-4xl">
            Trusted by <span className="text-red-600!">{Math.floor(CLIENTS.length / 10) * 10}+ organisations</span> across India
          </h2>
          <p className="mt-4 text-gray-600! md:text-lg">
            From PSUs and national brands to residential townships and schools, organisations rely on
            us to design, install and maintain their security systems.
          </p>
        </div>

        {/* sector breakdown */}
        <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {sectorCounts.map(({ sector, count }) => {
            const Icon = SECTOR_ICONS[sector];
            return (
              <li
                key={sector}
                className="flex flex-col items-center rounded-xl border border-gray-200 bg-gray-50 px-3 py-4 text-center"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="mt-2.5 text-[13px] font-semibold leading-tight text-gray-900!">{sector}</span>
                <span className="mt-1 text-xs text-gray-500!">
                  {count} client{count === 1 ? "" : "s"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* logo marquee (full width) */}
      <div className="mt-12 flex flex-col gap-3">
        <MarqueeRow clients={rowA} />
        <MarqueeRow clients={rowB} reverse />
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-7xl flex-col items-center justify-center gap-4 px-4 text-center sm:flex-row sm:px-6 lg:px-8">
        <p className="text-gray-700!">Want the same reliability for your premises?</p>
        <Link
          href={ctaHref}
          className="group inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white! shadow-sm transition-colors hover:bg-red-700"
        >
          Get a free Site Survey
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
