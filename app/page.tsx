import Marquee from "@/components/ui/Marquee";
import HashScroll from "@/components/ui/HashScroll";
import Hero from "@/components/sections/Hero";
import BrandStatement from "@/components/sections/BrandStatement";
import From3DToReality from "@/components/sections/From3DToReality";
import Manufacturing from "@/components/sections/Manufacturing";
import FactoryToHome from "@/components/sections/FactoryToHome";
import Services from "@/components/sections/Services";
import Packages from "@/components/sections/Packages";
import HorizontalGallery from "@/components/sections/HorizontalGallery";
import Materials from "@/components/sections/Materials";
import Craftsmanship from "@/components/sections/Craftsmanship";
import Process from "@/components/sections/Process";
import WhyUCI from "@/components/sections/WhyUCI";
import AboutUCI from "@/components/sections/AboutUCI";
import Founder from "@/components/sections/Founder";
import Trust from "@/components/sections/Trust";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <HashScroll />
      <Hero />
      <BrandStatement />

      <Marquee
        items={["Designed", "Manufactured", "Executed"]}
        separator="•"
        direction="left"
        speed={36}
        className="bg-charcoal py-6"
        light
      />

      <From3DToReality />
      <Manufacturing />
      <FactoryToHome />
      <Services />

      <Marquee
        items={["Kitchens", "Bedrooms", "Living", "Wardrobes", "Furniture"]}
        separator="•"
        direction="right"
        speed={30}
        className="border-y border-border bg-bg-card py-6"
      />

      <Packages />
      <HorizontalGallery />
      <Materials />
      <Craftsmanship />
      <Process />
      <WhyUCI />
      <AboutUCI />
      <Founder />
      <Trust />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
