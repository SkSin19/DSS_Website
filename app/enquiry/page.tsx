import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import SecureToday from "@/components/sections/SecureToday";
import OurClients from "@/components/sections/OurClients";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us – Get a Free CCTV & Security System Quote",
  description:
    "Request a free site survey and quote for CCTV installation, repair & AMC, access control, biometric attendance and alarm systems in Delhi NCR. Call +91 99996 05550.",
  path: "/enquiry",
});

export default function EnquiryPage() {
  return (
    <>
      <ContactSection />
      <OurClients ctaHref="#contact-form" />
      <SecureToday />
    </>
  );
}
