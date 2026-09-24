import PageMeta from "@/seo/PageMeta";
import ServicesDetails3Effect from "@/shared/effects/ServicesDetails3Effect";
import Section1 from "@/shared/sections/services-details-3/Section1";
import Section2 from "@/shared/sections/services-details-3/Section2";
import Section3 from "@/shared/sections/services-details-3/Section3";
import Section4 from "@/shared/sections/services-details-3/Section4";
import Section5 from "@/shared/sections/services-details-3/Section5";

export default function ServicesDetails3Page() {
  return (
    <>
      <PageMeta title="Orisa - ServicesDetails3" />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <ServicesDetails3Effect />
    </>
  );
}
