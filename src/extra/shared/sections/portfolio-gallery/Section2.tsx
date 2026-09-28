import { Fragment } from "react";
import { Link } from "react-router-dom";
// Portfolio Gallery Section 2 - Pinned horizontal scroll gallery.
// The background layers mirror the slide thumbnails; HorizontalScrollGalleryEffect
// only toggles `is-active` on them, it does not build them.

const SLIDES = [
    {
        href: "/portfolio-details-1",
        title: "Ecommerce Brand",
        img: "/assets/imgs/pages/slideshow/img-1.webp",
        tags: ["Branding", "Web", "Commerce"],
    },
    {
        href: "/portfolio-details-2",
        title: "SaaS Startup",
        img: "/assets/imgs/pages/slideshow/img-2.webp",
        tags: ["Product", "UI/UX", "Branding"],
    },
    {
        href: "/portfolio-details-3",
        title: "Fintech Platform",
        img: "/assets/imgs/pages/slideshow/img-3.webp",
        tags: ["Web Design", "Product", "Strategy"],
    },
    {
        href: "/portfolio-details-4",
        title: "Global Brand",
        img: "/assets/imgs/pages/slideshow/img-4.webp",
        tags: ["Branding", "Identity", "Campaign"],
    },
    {
        href: "/portfolio-details-5",
        title: "DTC Brand",
        img: "/assets/imgs/pages/slideshow/img-5.webp",
        tags: ["Brand", "Packaging", "Digital"],
    },
];

export default function Section2() {
    return (
        <section className="hsg-stage" aria-label="Featured Projects - Horizontal Scroll Gallery">
            <div className="hsg-bg-layer" aria-hidden="true">
                {SLIDES.map((slide, index) => (
                    <div
                        key={slide.href}
                        className={`hsg-bg ${index === 0 ? "is-active" : ""}`.trim()}
                        data-bg-index={index}
                    >
                        <img
                            className="hsg-bg__img"
                            src={slide.img}
                            alt=""
                            width={2400}
                            height={1600}
                            aria-hidden="true" loading="lazy" />
                    </div>
                ))}
                <div className="hsg-bg__veil" />
            </div>

            <div className="hsg-track-wrap">
                <div className="hsg-track">
                    {SLIDES.map((slide, index) => (
                        <article key={slide.href} className="hsg-slide" data-slide-index={index}>
                            <Link
                                className="hsg-slide__link"
                                to={slide.href}
                                aria-label={`Open project: ${slide.title}`}
                            >
                                <div className="hsg-slide__media">
                                    <img
                                        className="hsg-slide__img"
                                        src={slide.img}
                                        alt={`${slide.title} - project thumbnail`}
                                        width={2400}
                                        height={1600}
                                        loading="lazy" />
                                </div>
                                <div className="hsg-slide__body">
                                    <h5 className="hsg-slide__title">{slide.title}</h5>
                                    <p className="hsg-slide__tags">
                                        {slide.tags.map((tag, tagIndex) => (
                                            <Fragment key={tag}>
                                                {tagIndex > 0 && (
                                                    <span
                                                        className="hsg-slide__tag-sep"
                                                        aria-hidden="true"
                                                    >
                                                        |
                                                    </span>
                                                )}
                                                <span>{tag}</span>
                                            </Fragment>
                                        ))}
                                    </p>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>

            <div className="hsg-progress" aria-hidden="true">
                <span className="hsg-progress__bar" />
            </div>

            <div className="hsg-counter" aria-live="polite">
                <span className="hsg-counter__current">01</span>
                <span className="hsg-counter__sep">/</span>
                <span className="hsg-counter__total">
                    {String(SLIDES.length).padStart(2, "0")}
                </span>
            </div>
        </section>
    );
}
