import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import ToolIcon from "@/components/tools/ToolIcon";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { TOOLS } from "@/lib/tools";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = buildPageMetadata({
  title: "Free CCTV Planning Tools",
  description:
    "Free tools to plan your security system: estimate CCTV cost and storage, and compare cameras, NVRs and access control products side by side.",
  path: "/tools",
  keywords: ["CCTV tools", "CCTV cost calculator", "compare CCTV cameras", "security system planner"],
});

export default function ToolsPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Security planning tools",
      itemListElement: TOOLS.map((tool, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: tool.title,
        url: `${SITE_URL}${tool.href}`,
      })),
    },
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Tools", path: "/tools" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-white py-10 md:py-14">
        <Container>
          <header className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-gray-500">
              <ol className="flex items-center gap-2">
                <li><Link href="/" className="hover:text-red-600!">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/tools" aria-current="page" className="text-red-600!">Tools</Link></li>
              </ol>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Free tools</p>
            <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Plan your security system <span className="text-red-600">in minutes</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              Work out what your property needs and what it will cost, then compare the products before you buy.
              When you&apos;re ready, send the result to us for a free site survey and final quotation.
            </p>
          </header>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col rounded-3xl border border-gray-200 bg-gray-50 p-7 transition-shadow hover:shadow-xl"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white">
                  <ToolIcon icon={tool.icon} className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-gray-900 group-hover:text-red-600">{tool.title}</h2>
                <p className="mt-2 flex-1 text-gray-600">{tool.summary}.</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-red-600">
                  Open tool <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
