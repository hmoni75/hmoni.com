import PageMeta from "@/seo/PageMeta";
import Section1 from "@/shared/sections/page-404/Section1";
import Section2 from "@/shared/sections/page-404/Section2";

export default function NotFoundPage() {
  return (
    <>
      <PageMeta title="Orisa - 404" />
      <Section1 />
      <Section2 />
    </>
  );
}
