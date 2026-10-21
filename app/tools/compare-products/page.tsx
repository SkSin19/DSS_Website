import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ProductCompare from "@/components/tools/ProductCompare";
import { ToolFaqs, ToolHero, ToolRelated } from "@/components/tools/ToolPageParts";
import { buildPageMetadata } from "@/lib/seo";
import { toolJsonLd, type ToolFaq } from "@/lib/tools";

const PATH = "/tools/compare-products";
const NAME = "Compare Products";
const DESCRIPTION =
  "Compare CCTV cameras, NVRs, biometric and access control devices side by side: specs, night vision, storage and best use. Hikvision, CP Plus, Dahua and more.";

// The canonical stays on the bare path; ?products=… views are shareable but not indexed separately.
export const metadata: Metadata = buildPageMetadata({
  title: "Compare CCTV Cameras & NVRs Side by Side",
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "compare CCTV cameras",
    "CCTV camera comparison",
    "Hikvision vs CP Plus",
    "dome vs bullet camera",
    "NVR comparison",
    "4MP vs 2MP CCTV",
    "compare biometric attendance machines",
    "best CCTV camera for home India",
  ],
});

const FAQS: ToolFaq[] = [
  {
    q: "How do I compare CCTV cameras?",
    a: "Search for products by name, model or brand and add up to four. The table lines up their brand, category, highlights and every specification, such as resolution, lens, night-vision range, compression and weather rating. Tick “Show only differences” to hide the rows where they match.",
  },
  {
    q: "Should I choose a dome or a bullet camera?",
    a: "Dome cameras are compact and discreet, which suits indoor rooms, shops and offices. Bullet cameras are more visible, reach further at night and are usually weatherproof, so they suit gates, parking and boundaries. Many sites use domes inside and bullets outside.",
  },
  {
    q: "What matters most when comparing NVRs?",
    a: "Check the number of channels (how many cameras it records), the number of hard-disk bays and maximum storage per bay, the incoming bandwidth, the highest camera resolution it can decode, and whether it supports AI features such as face recognition or ANPR.",
  },
  {
    q: "Can I share a comparison?",
    a: "Yes. The page address updates as you add products, so you can copy the link and share it on WhatsApp or email, or send it to us for a quotation.",
  },
  {
    q: "Are these products available for installation?",
    a: "Yes. Every product listed is supplied and installed by Digital Security Solutions across Delhi NCR, with manufacturer warranty. Use “View & get price” or WhatsApp to ask for a quote.",
  },
];

export default function CompareProductsPage() {
  const jsonLd = toolJsonLd({ name: NAME, description: DESCRIPTION, path: PATH, faqs: FAQS });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-white py-10 md:py-14">
        <Container className="space-y-10">
          <ToolHero name={NAME} path={PATH} eyebrow="Free tool" title={<>Compare Security <span className="text-red-600">Products</span></>}>
            <p>
              Put up to four CCTV cameras, NVRs, biometric or access control devices side by side and see exactly how
              their specifications differ - so you can pick the right one for your home or business.
            </p>
          </ToolHero>

          <ProductCompare />

          <ToolFaqs faqs={FAQS} />

          <ToolRelated
            links={[
              { href: "/tools/cctv-cost-calculator", title: "CCTV Cost Calculator", text: "Estimate cameras, storage and cost." },
              { href: "/blogs/ip-vs-analog-hd-cctv-cameras", title: "IP vs analog HD cameras", text: "Which camera system to choose." },
              { href: "/blogs/how-to-choose-cctv-camera-for-home", title: "Choosing a home CCTV camera", text: "What to look for before you buy." },
            ]}
          />
        </Container>
      </section>
    </>
  );
}
