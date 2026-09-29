import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swiper from "swiper";
import { Autoplay, FreeMode } from "swiper/modules";

import { getHeroTiles } from "@/services/api";

export interface HeroTileItem {
  id: number;
  img: string;
  mod: string;
  title?: string;
}

export const INITIAL_HERO_TILES: HeroTileItem[] = [
  {
    id: 1,
    img: "sec-1-tile-1.webp",
    mod: "brand-1",
    title: "Brand Identity 1",
  },
  {
    id: 2,
    img: "sec-1-tile-2.webp",
    mod: "neutral-100",
    title: "Digital Product 2",
  },
  {
    id: 3,
    img: "sec-1-tile-3.webp",
    mod: "neutral-800",
    title: "Creative Layout 3",
  },
  { id: 4, img: "sec-1-tile-4.webp", mod: "brand-2", title: "UIUX Showcase 4" },
  {
    id: 5,
    img: "sec-1-tile-5.webp",
    mod: "neutral-300",
    title: "Visual Story 5",
  },
  { id: 6, img: "sec-1-tile-6.webp", mod: "brand-1", title: "Mobile App 6" },
];

export function getHeroTilesFromStorage(): HeroTileItem[] {
  const saved = localStorage.getItem("hmoni_hero_tiles") || localStorage.getItem("hmoni_manage_hero_tiles");
  if (!saved) return INITIAL_HERO_TILES;
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : INITIAL_HERO_TILES;
  } catch {
    return INITIAL_HERO_TILES;
  }
}

export default function Section1() {
  const [tiles, setTiles] = useState<HeroTileItem[]>(INITIAL_HERO_TILES);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Fetch live hero carousel photos from database API
    getHeroTiles().then((data) => {
      if (data && data.length > 0) {
        setTiles(data);
      }
    });

    const handleUpdate = () => {
      getHeroTiles().then((data) => {
        if (data && data.length > 0) {
          setTiles(data);
        }
      });
    };
    window.addEventListener("hmoni_hero_tiles_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("hmoni_hero_tiles_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el || tiles.length === 0) return;

    const instance = new Swiper(el, {
      modules: [Autoplay, FreeMode],
      slidesPerView: 6,
      spaceBetween: 16,
      loop: true,
      centeredSlides: true,
      speed: 6000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      allowTouchMove: true,
      grabCursor: true,
      freeMode: { enabled: true, momentum: false },
      breakpoints: {
        1700: { slidesPerView: 6, spaceBetween: 16 },
        1400: { slidesPerView: 5, spaceBetween: 16 },
        1200: { slidesPerView: 4.5, spaceBetween: 16 },
        992: { slidesPerView: 4, spaceBetween: 14 },
        768: { slidesPerView: 3, spaceBetween: 12 },
        576: { slidesPerView: 2.5, spaceBetween: 12 },
        0: { slidesPerView: 2, spaceBetween: 10 },
      },
    });

    return () => {
      instance.destroy(true, true);
    };
  }, [tiles]);

  const slides = tiles.length > 0 ? [...tiles, ...tiles, ...tiles] : [];

  const getImgSrc = (img: string) => {
    if (!img) return "/assets/imgs/pages/home-12/sec-1-tile-1.webp";
    if (
      img.startsWith("http") ||
      img.startsWith("data:") ||
      img.startsWith("/")
    ) {
      return img;
    }
    return `/assets/imgs/pages/home-12/${img}`;
  };

  return (
    <section
      className="sec-1-home-12 pt-110"
      aria-label="Pure Design. Potent Storytelling Hero"
    >
      <div className="sec-1-home-12__hero">
        <div className="container">
          <div className="sec-1-home-12__hero-inner d-flex flex-column align-items-center text-center">
            <div
              className="sec-1-home-12__pill at_fade_anim"
              data-fade-from="bottom"
              data-delay=".05"
            >
              <div className="sec-1-home-12__avatars" aria-hidden="true">
                <img
                  className="sec-1-home-12__avatar"
                  src="/assets/imgs/pages/home-12/sec-1-avatar-1.webp"
                  alt="H Moni"
                  loading="lazy"
                />
                <img
                  className="sec-1-home-12__avatar"
                  src="/assets/imgs/pages/home-12/sec-1-avatar-2.webp"
                  alt="H Moni"
                  loading="lazy"
                />
                <img
                  className="sec-1-home-12__avatar"
                  src="/assets/imgs/pages/home-12/sec-1-avatar-3.webp"
                  alt="H Moni"
                  loading="lazy"
                />
                <img
                  className="sec-1-home-12__avatar"
                  src="/assets/imgs/pages/home-12/sec-1-avatar-4.webp"
                  alt="H Moni"
                  loading="lazy"
                />
              </div>
              <span className="sec-1-home-12__pill-text">
                300+ Curated Portfolios
              </span>
            </div>

            <h1 className="sec-1-home-12__title mb-0 at-rise-animation">
              <span className="d-block">Pure Design.</span>
              <span className="d-block">Potent Storytelling</span>
            </h1>

            <p
              className="sec-1-home-12__sub mb-0 at_fade_anim"
              data-fade-from="bottom"
              data-delay=".2"
            >
              A portfolio template, made for creatives who move fast and ship
              bold.
            </p>

            <div
              className="sec-1-home-12__ctas at_fade_anim"
              data-fade-from="bottom"
              data-delay=".3"
            >
              <Link className="sec-1-home-12__btn-primary" to="/contact-1">
                <span className="sec-1-home-12__btn-primary-label">
                  Book a Call
                </span>
                <span
                  className="sec-1-home-12__btn-primary-icon"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
              <Link className="sec-1-home-12__btn-secondary" to="/pricing">
                <span>See Pricing</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="sec-1-home-12__strip">
        <div ref={sliderRef} className="swiper sec-1-home-12-slider">
          <div className="swiper-wrapper">
            {slides.map((t, i) => (
              <Link
                key={`${t.id}-${i}`}
                className={`swiper-slide sec-1-home-12__tile sec-1-home-12__tile--${t.mod}`}
                to="/portfolio-1"
                aria-label={`View portfolio item ${t.title || i + 1}`}
              >
                <img
                  className="sec-1-home-12__tile-img"
                  src={getImgSrc(t.img)}
                  alt={t.title || "Hero Photo"}
                  loading="lazy"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
