import type { Metadata } from "next";
import AboutUs from '@/components/sections/AboutUs'

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Digital Security Solutions - 17+ years supplying and installing CCTV, access control, biometric attendance and alarm systems across Delhi and India.",
  alternates: { canonical: "/about" },
};

function page() {
  return (
    <div>
        <AboutUs />
    </div>
  )
}

export default page