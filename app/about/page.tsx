import type { Metadata } from "next";
import AboutUs from '@/components/sections/AboutUs'
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us – Trusted Security Systems Company Since 2008",
  description:
    "Digital Security Solutions has supplied and installed CCTV, access control, biometric attendance and alarm systems since 2008, with offices in Delhi, Uttar Pradesh and Bihar.",
  path: "/about",
});

function page() {
  return (
    <div>
        <AboutUs />
    </div>
  )
}

export default page