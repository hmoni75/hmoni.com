import PageMeta from "@/seo/PageMeta";
import HorizontalScrollGalleryEffect from "@/shared/effects/HorizontalScrollGalleryEffect";
import Section1 from "@/shared/sections/portfolio-gallery/Section1";
import Section2 from "@/shared/sections/portfolio-gallery/Section2";

export default function PortfolioGalleryPage() {
  return (
    <>
      <PageMeta title="H Moni - PortfolioGallery" />
      <Section1 />
      <Section2 />
      <HorizontalScrollGalleryEffect />
    </>
  );
}

