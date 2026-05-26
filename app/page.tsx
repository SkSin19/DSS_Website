import HeroSlider from "@/components/sections/HeroSlider";
import TrustBar from "@/components/sections/TrustBar";
import BrandMarquee from "@/components/sections/BrandMarquee";
import ProductCategories from "@/components/sections/ProductCategories";
import DiscoverBrands from "@/components/sections/DiscoverBrands";
import SmarterSecurity from "@/components/sections/SmarterSecurity";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <TrustBar />
      <BrandMarquee />
      <ProductCategories />
      <DiscoverBrands />
      <SmarterSecurity />
    </>
  );
}
