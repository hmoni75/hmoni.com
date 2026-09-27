import PageMeta from "@/seo/PageMeta";
import ServicesDetails2Effect from "@/shared/effects/ServicesDetails2Effect";
import Section1 from "@/shared/sections/services-details-2/Section1";
import Section2 from "@/shared/sections/services-details-2/Section2";
import Section3 from "@/shared/sections/services-details-2/Section3";
import Section4 from "@/shared/sections/services-details-2/Section4";
import Section5 from "@/shared/sections/services-details-2/Section5";
import Section6 from "@/shared/sections/services-details-2/Section6";

export default function ServicesDetails2Page() {
  return (
    <>
      <PageMeta title="H Moni - ServicesDetails2" />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <ServicesDetails2Effect />
    </>
  );
}

