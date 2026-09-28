import PageMeta from "@/seo/PageMeta";
import About4Effect from "@/shared/effects/About4Effect";
import Section1 from "@/shared/sections/about-4/Section1";
import Section2 from "@/shared/sections/about-4/Section2";
import Section3 from "@/shared/sections/about-4/Section3";
import Section4 from "@/shared/sections/about-4/Section4";
import Section5 from "@/shared/sections/about-4/Section5";
import Section6 from "@/shared/sections/about-4/Section6";

export default function About4Page() {
  return (
    <>
      <PageMeta title="H Moni - About4" />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <About4Effect />
    </>
  );
}

