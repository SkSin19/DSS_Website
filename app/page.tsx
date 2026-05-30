import HeroSlider from "@/components/sections/HeroSlider";
import DiscoverBrands from "@/components/sections/DiscoverBrands";
import BrandMarquee from "@/components/sections/BrandMarquee";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import ProductCategories from "@/components/sections/ProductCategories";
import SmarterSecurity from "@/components/sections/SmarterSecurity";
import Bestsellers from "@/components/sections/Bestsellers";
import PremiumDesign from "@/components/sections/PremiumDesign";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <DiscoverBrands />
      <BrandMarquee />
      <ProductCategories />
      <SmarterSecurity />
      <Bestsellers />
      <PremiumDesign />
      <FeaturedProducts />
      <WhyChooseUs />
    </>
  );
}
