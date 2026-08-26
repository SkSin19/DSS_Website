import type { Metadata } from "next";
import GetInTouch from "@/components/sections/GetInTouch";
import SecureToday from "@/components/sections/SecureToday";

export const metadata: Metadata = {
  title: "Request an Enquiry",
  description:
    "Request a free quote for CCTV, access control, biometric attendance and alarm systems from Digital Security Solutions in Delhi.",
  alternates: { canonical: "/enquiry" },
};

export default function EnquiryPage() {
  return (
    <>
      <GetInTouch />
      <SecureToday />
    </>
  );
}
