import type { Metadata } from "next";
import ServicesPage from "@/components/sections/ServicesPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Security Solutions – CCTV, Access Control, Automation & Alarms",
  description:
    "End-to-end security solutions in Delhi NCR: CCTV surveillance, access control, biometric attendance, gate & home automation, intrusion and fire alarms, PA & AV systems.",
  path: "/solutions",
  keywords: [
    "security solutions Delhi",
    "gate automation Delhi",
    "home automation Delhi",
    "intrusion alarm system",
    "fire alarm system installation",
    "access control installation",
  ],
});

export default function page() {
  return <ServicesPage />;
}