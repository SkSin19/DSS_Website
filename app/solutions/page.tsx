import type { Metadata } from "next";
import ServicesPage from "@/components/sections/ServicesPage";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Explore our security solutions - Access Control, Home Automation, Biometric Attendance, Gate Automation, Intrusion Alarm and more.",
  alternates: { canonical: "/solutions" },
};

export default function page() {
  return <ServicesPage />;
}