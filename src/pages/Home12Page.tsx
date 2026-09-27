import PageMeta from "@/seo/PageMeta";
import HeroSection from "@/shared/sections/index-12/Section1";
import SelectedProjectsSection from "@/shared/sections/index-13/Section3";
import ServiceSection from "@/shared/sections/index-12/Section3";
import ProcessPhilosophySection from "@/shared/sections/index-12/Section4";
import AboutMeSection from "@/shared/sections/index-12/Section6";
import FaqSection from "@/shared/sections/index-13/Section8";

export default function Home12Page() {
  return (
    <>
      <PageMeta title="Orisa - Home" />
      <HeroSection />
      <SelectedProjectsSection />
      <ServiceSection />
      <ProcessPhilosophySection />
      <AboutMeSection />
      <FaqSection />
    </>
  );
}
