import type { Metadata } from "next";
import HeroEnquiry from "@/components/sections/HeroEnquiry";
import DiscoverBrands from "@/components/sections/DiscoverBrands";
import BrandMarquee from "@/components/sections/BrandMarquee";

import ProductCategories from "@/components/sections/ProductCategories";
import SmarterSecurity from "@/components/sections/SmarterSecurity";
import PremiumDesign from "@/components/sections/PremiumDesign";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import LatestBlogs from "@/components/sections/LatestBlogs";
import OurClients from "@/components/sections/OurClients";
import { buildPageMetadata } from "@/lib/seo";

// The home page is the site's primary/canonical entry point. An explicit
// absolute title + self-canonical makes it the page Google surfaces for the
// brand (previously /enquiry shared the default title and won the duplicate).
export const metadata: Metadata = buildPageMetadata({
  title: "CCTV Camera Installation & Security Systems in Delhi NCR | Digital Security Solutions",
  absoluteTitle: true,
  description:
    "CCTV camera installation, repair & AMC, access control, biometric attendance and alarm systems in Delhi NCR. Genuine Hikvision, CP Plus & Dahua products. Since 2008. Get a free quote.",
  path: "/",
  keywords: [
    "CCTV camera installation Delhi",
    "CCTV installation near me",
    "CCTV repair Delhi",
    "security system installation Delhi NCR",
    "access control system Delhi",
    "biometric attendance machine Delhi",
    "Hikvision dealer Delhi",
    "CP Plus dealer Delhi",
    "CCTV dealer Shakarpur",
    "CCTV installation Noida",
  ],
});

export default function Home() {
  return (
    <div>
      <HeroEnquiry />
      <div className="select-none">
        <DiscoverBrands />
        <BrandMarquee />
        <ProductCategories />
        <SmarterSecurity />
        {/* <Bestsellers /> */}
        <PremiumDesign />
        <FeaturedProducts />
        <WhyChooseUs />
      </div>
      <OurClients />
      <LatestBlogs />
    </div>
  );
}
