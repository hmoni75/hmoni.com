import { useState } from "react";

// Pricing 3 Section 2 - Testimonial slider (ports src/assets/js/pricing-3.js)

const STAR_SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M5 0L6.18 3.82L10 5L6.18 6.18L5 10L3.82 6.18L0 5L3.82 3.82L5 0Z" fill="currentColor" />
    </svg>
);

const PREV_SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
            d="M8.5 3L4.5 7L8.5 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const NEXT_SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
            d="M5.5 3L9.5 7L5.5 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

interface Stat {
    value: string;
    label: string;
    note: string;
}

interface Slide {
    image: string;
    quote: string;
    avatar: string;
    name: string;
    role: string;
    stats: Stat[];
}

const SLIDES: Slide[] = [
    {
        image: "/assets/imgs/pages/home-7/sec-5-founder.webp",
        quote: "“Strategy first, then craft. Orisa shaped a clear story for our relaunch and kept every milestone on time—exactly the partner we needed for a high-stakes brand reset.”",
        avatar: "/assets/imgs/pages/home-7/avatar-2.webp",
        name: "Elena Morin",
        role: "Helio Craft / Head of Brand",
        stats: [
            { value: "48+", label: "Brands shipped", note: "On-time launch record" },
            { value: "4.9", label: "Average score", note: "Post-project feedback" },
        ],
    },
    {
        image: "/assets/imgs/pages/home-11/member-2.webp",
        quote: "“Their team treats design like infrastructure. We gained a modular system that sales loves to demo—and a site that finally matches how serious our product is.”",
        avatar: "/assets/imgs/pages/home-7/avatar-4.webp",
        name: "Jonah Reeves",
        role: "Plexa Software / CMO",
        stats: [
            { value: "3.2x", label: "Demo conversion", note: "After redesign sprint" },
            { value: "12w", label: "Avg. timeline", note: "Discovery to launch" },
        ],
    },
    {
        image: "/assets/imgs/pages/home-11/member-1.webp",
        quote: "“From campaign kits to product screens, everything stayed consistent. Communication was crisp, decisions were documented, and the final system feels ready to grow with us.”",
        avatar: "/assets/imgs/pages/home-7/avatar-1.webp",
        name: "Priya Nandakumar",
        role: "Northline Studio / Founder",
        stats: [
            { value: "210+", label: "Assets delivered", note: "Across brand & product" },
            { value: "98%", label: "Retention path", note: "Clients continue yearly" },
        ],
    },
];

export default function Section2() {
    const [index, setIndex] = useState(0);

    // Wrap around in both directions, like the original vanilla slider
    const show = (nextIndex: number) => setIndex((nextIndex + SLIDES.length) % SLIDES.length);

    return (
        <section
            className="pricing-3-testimonial pt-40 pb-120"
            aria-label="Client testimonials"
            data-pricing3-testimonial=""
        >
            <div className="container">
                <header className="pricing-3-label">
                    <span className="pricing-3-label__left">
                        {STAR_SVG}
                        (05)
                    </span>
                    <span className="pricing-3-label__center">(Testimonial)</span>
                    <span className="pricing-3-label__right">© 2026</span>
                </header>

                <div className="pricing-3-testimonial__viewport">
                    {SLIDES.map((slide, i) => {
                        const active = i === index;
                        return (
                            <article
                                key={slide.name}
                                className={`pricing-3-t-slide${active ? " is-active" : ""}`}
                                data-slide=""
                                hidden={!active}
                            >
                                <div className="pricing-3-t-slide__media">
                                    <img
                                        src={slide.image}
                                        alt="Client portrait"
                                        width={520}
                                        height={520}
                                        loading="lazy"
                                    />
                                </div>
                                <blockquote className="pricing-3-t-slide__quote">
                                    <p>{slide.quote}</p>
                                </blockquote>
                                <div className="pricing-3-t-slide__foot">
                                    <div
                                        className="pricing-3-t-slide__nav"
                                        role="group"
                                        aria-label="Testimonial navigation"
                                    >
                                        <button
                                            type="button"
                                            className="pricing-3-nav-btn"
                                            data-prev=""
                                            aria-label="Previous testimonial"
                                            onClick={() => show(index - 1)}
                                        >
                                            {PREV_SVG}
                                        </button>
                                        <button
                                            type="button"
                                            className="pricing-3-nav-btn"
                                            data-next=""
                                            aria-label="Next testimonial"
                                            onClick={() => show(index + 1)}
                                        >
                                            {NEXT_SVG}
                                        </button>
                                    </div>
                                    <div className="pricing-3-t-slide__author">
                                        <img
                                            className="pricing-3-t-slide__avatar"
                                            src={slide.avatar}
                                            alt=""
                                            width={48}
                                            height={48}
                                            loading="lazy"
                                        />
                                        <div>
                                            <p className="pricing-3-t-slide__name">{slide.name}</p>
                                            <p className="pricing-3-t-slide__role">{slide.role}</p>
                                        </div>
                                    </div>
                                    <div className="pricing-3-t-slide__stats">
                                        {slide.stats.map((stat) => (
                                            <div className="pricing-3-stat" key={stat.label}>
                                                <span className="pricing-3-stat__value">{stat.value}</span>
                                                <div>
                                                    <p className="pricing-3-stat__label">{stat.label}</p>
                                                    <p className="pricing-3-stat__note">{stat.note}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
