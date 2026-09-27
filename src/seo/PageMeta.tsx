import { useEffect } from "react";

type Props = {
  title: string;
  description?: string;
  image?: string;
  url?: string;
};

export default function PageMeta({
  title,
  description = "H Moni — Official Portfolio & Creative Studio. Crafting high-performance digital experiences, UI/UX design, brand strategy, and modern web engineering.",
  image = "https://hmoni.com/assets/imgs/template/logo/favicon.svg",
  url = "https://hmoni.com",
}: Props) {
  useEffect(() => {
    // 1. Dynamic Page Title
    const formattedTitle = title.includes("H Moni")
      ? title
      : `${title} | H Moni`;
    document.title = formattedTitle;

    // Helper to safely set meta tag content
    const setMeta = (attrName: string, attrVal: string, content: string) => {
      let meta = document.querySelector(
        `meta[${attrName}="${attrVal}"]`,
      ) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attrName, attrVal);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // 2. Standard Search Engine SEO Meta Tags
    setMeta("name", "description", description);
    setMeta(
      "name",
      "keywords",
      "H Moni, H Moni Portfolio, H Moni Official, Creative Studio, UI UX Designer, Full Stack Developer, Web Development",
    );
    setMeta("name", "author", "H Moni");
    setMeta(
      "name",
      "robots",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );

    // 3. OpenGraph Social Auto-Marketing Tags (Facebook, LinkedIn, WhatsApp)
    setMeta("property", "og:site_name", "H Moni");
    setMeta("property", "og:title", formattedTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:image", image);
    setMeta("property", "og:url", url);

    // 4. Twitter Cards Auto-Marketing Meta Tags
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:site", "@hmoni");
    setMeta("name", "twitter:creator", "@hmoni");
    setMeta("name", "twitter:title", formattedTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);
  }, [title, description, image, url]);

  return null;
}
