import PageMeta from "@/seo/PageMeta";
import Services4Effect from "@/shared/effects/Services4Effect";
import Section1 from "@/shared/sections/services-4/Section1";
import Section2 from "@/shared/sections/services-4/Section2";
import Section3 from "@/shared/sections/services-4/Section3";
import Section4 from "@/shared/sections/index-2/Section9";
import Section5 from "@/shared/sections/index-2/Section8";
import Section6 from "@/shared/sections/about-3/Section7";

export default function Services4Page() {
  return (
    <>
      <PageMeta title="Orisa - Services4" />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Services4Effect />
    </>
  );
}
