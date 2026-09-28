import PageMeta from "@/seo/PageMeta";
import ServicesDetails5Effect from "@/shared/effects/ServicesDetails5Effect";
import Section1 from "@/shared/sections/services-details-5/Section1";
import Section2 from "@/shared/sections/services-details-5/Section2";
import Section3 from "@/shared/sections/services-details-5/Section3";
import Section4 from "@/shared/sections/services-details-5/Section4";
import Section5 from "@/shared/sections/services-details-5/Section5";

export default function ServicesDetails5Page() {
  return (
    <>
      <PageMeta title="H Moni - ServicesDetails5" />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <ServicesDetails5Effect />
    </>
  );
}

