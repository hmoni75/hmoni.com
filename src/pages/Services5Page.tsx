import PageMeta from "@/seo/PageMeta";
import Services5Effect from "@/shared/effects/Services5Effect";
import Section1 from "@/shared/sections/services-5/Section1";
import Section2 from "@/shared/sections/services-5/Section2";
import Section3 from "@/shared/sections/services-5/Section3";
import Section4 from "@/shared/sections/services-5/Section4";
import Section5 from "@/shared/sections/index-2/Section9";
import Section6 from "@/shared/sections/about-3/Section7";

export default function Services5Page() {
  return (
    <>
      <PageMeta title="Orisa - Services5" />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Services5Effect />
    </>
  );
}
