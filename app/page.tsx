import type { Metadata } from "next";
import HeroSlider from "@/components/sections/HeroSlider";
import DiscoverBrands from "@/components/sections/DiscoverBrands";
import BrandMarquee from "@/components/sections/BrandMarquee";

import ProductCategories from "@/components/sections/ProductCategories";
import SmarterSecurity from "@/components/sections/SmarterSecurity";
import PremiumDesign from "@/components/sections/PremiumDesign";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

// The home page is the site's primary/canonical entry point. An explicit
// absolute title + self-canonical makes it the page Google surfaces for the
// brand (previously /enquiry shared the default title and won the duplicate).
export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} - CCTV, Access Control & Alarm Systems in Delhi`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="select-none">
      <HeroSlider />
      <DiscoverBrands />
      <BrandMarquee />
      <ProductCategories />
      <SmarterSecurity />
      {/* <Bestsellers /> */}
      <PremiumDesign />
      <FeaturedProducts />
      <WhyChooseUs />
    </div>
  );
}
