import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import CctvCalculator from "@/components/tools/CctvCalculator";
import { ToolFaqs, ToolHero, ToolRelated } from "@/components/tools/ToolPageParts";
import { buildPageMetadata } from "@/lib/seo";
import { toolJsonLd, type ToolFaq } from "@/lib/tools";

const PATH = "/tools/cctv-cost-calculator";
const NAME = "CCTV Cost Calculator";
const DESCRIPTION =
  "Free CCTV cost calculator for homes, shops, offices, societies and factories. Get the camera count, NVR, hard disk size and an installed price estimate.";

export const metadata: Metadata = buildPageMetadata({
  title: "CCTV Cost Calculator – Installation Price Estimate",
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "CCTV cost calculator",
    "CCTV installation cost calculator",
    "CCTV camera price calculator India",
    "how many CCTV cameras do I need",
    "CCTV storage calculator",
    "NVR hard disk calculator",
    "CCTV installation cost Delhi",
    "CCTV for society cost",
    "CCTV camera cost for home",
  ],
});

const FAQS: ToolFaq[] = [
  {
    q: "How much does CCTV installation cost in Delhi NCR?",
    a: "A typical 4-camera IP CCTV setup for a flat or shop costs roughly ₹30,000–50,000 installed, and a 3-floor house with around 12–14 cameras roughly ₹1–1.5 lakh. The final price depends on the brand, camera resolution, recording days, cable length and site layout, which we confirm during a free site survey.",
  },
  {
    q: "How many CCTV cameras do I need?",
    a: "Plan one camera for every main entry and gate, enough indoor dome cameras to cover each floor (about one per 400–600 sq ft in homes and offices), and outdoor cameras for parking and the boundary. The calculator works this out from your property type, area, floors and gates.",
  },
  {
    q: "How much hard disk storage does CCTV need?",
    a: "With modern H.265+ compression, a 4MP camera recording all day uses about 15–20 GB per day. So 4 cameras for 30 days need roughly 2 TB, and 16 cameras for 30 days need about 8 TB. Higher resolution or more recording days need proportionally more storage.",
  },
  {
    q: "Is the price shown a final quotation?",
    a: "No. It is an indicative estimate based on typical market prices for genuine branded equipment. For an exact quotation, send your calculator result through the form or WhatsApp and we will arrange a free site survey.",
  },
  {
    q: "Should I choose 2MP, 4MP or 4K (8MP) cameras?",
    a: "2MP (1080p) is fine for small indoor spaces on a tight budget. 4MP (2K) gives clearer faces and is the best value for most homes, shops and offices. 4K (8MP) suits large open areas, gates and parking where you need to zoom into recorded footage.",
  },
  {
    q: "Do you install CCTV outside Delhi?",
    a: "Yes. We install across Delhi, Noida, Greater Noida, Ghaziabad and Gurgaon, and take larger projects in Uttar Pradesh, Bihar and other parts of India.",
  },
];

export default function CctvCostCalculatorPage() {
  const jsonLd = toolJsonLd({ name: NAME, description: DESCRIPTION, path: PATH, faqs: FAQS });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-white py-10 md:py-14">
        <Container className="space-y-10">
          <ToolHero name={NAME} path={PATH} eyebrow="Free tool" title={<>CCTV Cost <span className="text-red-600">Calculator</span></>}>
            <p>
              Answer a few questions about your property and get a recommended CCTV system — how many cameras, which
              recorder, how much storage — with an indicative installed price. Built from the setups we have installed
              across Delhi NCR since 2008.
            </p>
          </ToolHero>

          <CctvCalculator />

          <section aria-labelledby="how-heading" className="mx-auto max-w-3xl">
            <h2 id="how-heading" className="text-2xl font-bold text-gray-900">How the estimate is worked out</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
              <li><strong>Indoor cameras</strong> are sized from the area of each floor and the type of property.</li>
              <li><strong>Outdoor cameras</strong> cover each gate, the parking area and the boundary you choose.</li>
              <li><strong>Storage</strong> is calculated from camera resolution and recording days (H.265+ compression, plus 10% headroom).</li>
              <li><strong>The NVR</strong> is the smallest recorder with enough channels and hard-disk bays for that storage.</li>
              <li><strong>Cabling, PoE switches and installation</strong> are estimated per camera for your property type.</li>
            </ul>
          </section>

          <ToolFaqs faqs={FAQS} />

          <ToolRelated
            links={[
              { href: "/tools/compare-products", title: "Compare Products", text: "Compare cameras and NVRs side by side." },
              { href: "/blogs/cctv-camera-installation-cost-delhi", title: "What decides CCTV cost", text: "The factors behind an installation quote." },
              { href: "/blogs/cctv-storage-calculation-dvr-nvr-hard-disk", title: "CCTV storage guide", text: "How to size DVR/NVR hard disks." },
            ]}
          />
        </Container>
      </section>
    </>
  );
}
