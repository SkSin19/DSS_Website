import type { Metadata } from "next";
import ServicesPage from "@/components/sections/ServicesPage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our security services - Home Automation, Biometric Attendance, Gate Automation, Intrusion Alarm and more.",
  alternates: { canonical: "/solutions/services" },
};

export default function Services() {
  return <ServicesPage />;
}
