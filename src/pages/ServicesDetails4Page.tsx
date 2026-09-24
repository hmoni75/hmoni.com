import PageMeta from "@/seo/PageMeta";
import ServicesDetails4Effect from "@/shared/effects/ServicesDetails4Effect";
import Section1 from "@/shared/sections/services-details-4/Section1";
import Section2 from "@/shared/sections/services-details-4/Section2";
import Section3 from "@/shared/sections/services-details-4/Section3";
import Section4 from "@/shared/sections/services-details-4/Section4";
import Section5 from "@/shared/sections/services-details-4/Section5";

export default function ServicesDetails4Page() {
  return (
    <>
      <PageMeta title="Orisa - ServicesDetails4" />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <ServicesDetails4Effect />
    </>
  );
}
