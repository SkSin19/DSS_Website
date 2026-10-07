import type { Metadata } from "next";
import ServicesPage from "@/components/sections/ServicesPage";
import { buildPageMetadata } from "@/lib/seo";

// Same content as /solutions, so it canonicalises there to avoid duplicate-content splits.
export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Security Services – Installation, Automation & Alarms",
    description:
      "Security installation services in Delhi NCR: CCTV, access control, biometric attendance, gate & home automation, intrusion and fire alarm systems.",
    path: "/solutions",
  }),
};

export default function Services() {
  return <ServicesPage />;
}
