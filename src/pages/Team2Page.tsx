import PageMeta from "@/seo/PageMeta";
import Team2Effect from "@/shared/effects/Team2Effect";
import Section1 from "@/shared/sections/team-2/Section1";
import Section2 from "@/shared/sections/team-2/Section2";
import Section3 from "@/shared/sections/team-2/Section3";
import Section4 from "@/shared/sections/team-2/Section4";

export default function Team2Page() {
  return (
    <>
      <PageMeta title="H Moni - Team2" />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Team2Effect />
    </>
  );
}

