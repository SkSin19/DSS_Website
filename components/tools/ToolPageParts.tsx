import Link from "next/link";
import type { ReactNode } from "react";
import type { ToolFaq } from "@/lib/tools";

/** Breadcrumb + H1 + intro shared by the tool pages. */
export function ToolHero({
  name,
  path,
  eyebrow,
  title,
  children,
}: {
  name: string;
  path: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <header className="max-w-3xl">
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/" className="hover:text-red-600!">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/tools" className="hover:text-red-600!">Tools</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={path} aria-current="page" className="text-red-600!">{name}</Link></li>
        </ol>
      </nav>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">{title}</h1>
      <div className="mt-4 space-y-3 text-base leading-relaxed text-gray-600">{children}</div>
    </header>
  );
}

export function ToolFaqs({ faqs }: { faqs: ToolFaq[] }) {
  return (
    <section aria-labelledby="tool-faq-heading" className="mx-auto max-w-3xl">
      <h2 id="tool-faq-heading" className="text-2xl font-bold text-gray-900!">
        Frequently Asked Questions
      </h2>
      <div className="mt-5 divide-y divide-gray-200 rounded-xl border border-gray-200">
        {faqs.map((faq) => (
          <details key={faq.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-gray-900!">
              <h3 className="text-base">{faq.q}</h3>
              <span className="mt-0.5 text-xl leading-none text-red-600! transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="mt-3 leading-relaxed text-gray-700!">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** "Related" links block at the end of a tool page. */
export function ToolRelated({ links }: { links: { href: string; title: string; text: string }[] }) {
  return (
    <section aria-labelledby="tool-related-heading">
      <h2 id="tool-related-heading" className="text-xl font-bold text-gray-900">Related</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-lg"
          >
            <p className="font-semibold text-gray-900 group-hover:text-red-600">{link.title}</p>
            <p className="mt-1 text-sm text-gray-600">{link.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
