import PageMeta from "@/seo/PageMeta";
import PricePlanProvider from "@/shared/sections/pricing-2/PricePlanContext";
import Section1 from "@/shared/sections/pricing-2/Section1";
import Section2 from "@/shared/sections/pricing-2/Section2";
import Section3 from "@/shared/sections/pricing-2/Section3";
import Section4 from "@/shared/sections/pricing-2/Section4";

export default function Pricing2Page() {
  return (
    <>
      <PageMeta title="H Moni - Pricing2" />
      <PricePlanProvider>
        <Section1 />
        <Section2 />
      </PricePlanProvider>
      <Section3 />
      <Section4 />
    </>
  );
}

