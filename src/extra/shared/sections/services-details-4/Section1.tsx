import { Link } from "react-router-dom";
// Services details 4 Section 1 - Editorial hero (crumb + split title + staggered gallery)

const ARROW_SVG = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path
            d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
            fill="currentColor"
        />
    </svg>
);

const HERO_FIGURES = [
    { src: "/assets/imgs/pages/img-110.webp", alt: "Interface study", width: 822, height: 674 },
    { src: "/assets/imgs/pages/img-111.webp", alt: "Wireframe craft", width: 553, height: 542 },
    { src: "/assets/imgs/pages/img-112.webp", alt: "Product screens", width: 451, height: 546 },
];

export default function Section1() {
    return (
        <section className="sd4-hero pt-150 pb-60 overflow-hidden" data-sd4-hero>
            <div className="container">
                <div className="sd4-hero__meta at_fade_anim" data-fade-from="bottom">
                    <nav className="sd4-crumb" aria-label="Breadcrumb">
                        <Link to="/services-1">Services</Link>
                        <span>/</span>
                        <span>Product Design Systems</span>
                    </nav>
                    <span className="sd4-chip">UI/UX Agency · DET-04</span>
                </div>
                <h1 className="sd4-hero__title">
                    <span className="sd4-hero__line" data-sd4-line>
                        Interfaces that
                    </span>
                    <span className="sd4-hero__line sd4-hero__line--fill" data-sd4-line>
                        feel inevitable
                    </span>
                </h1>
                <div className="sd4-hero__row">
                    <p
                        className="sd4-hero__lead at_fade_anim"
                        data-fade-from="bottom"
                        data-delay=".15"
                    >
                        Research-led product design for teams shipping complex software—flows,
                        components, and prototypes engineering can adopt without reworking intuition.
                    </p>
                    <div
                        className="sd4-hero__actions at_fade_anim"
                        data-fade-from="bottom"
                        data-delay=".22"
                    >
                        <Link className="at-btn rounded-0" to="/contact-1">
                            <span>
                                <span className="text-1">Discuss a product</span>
                                <span className="text-2">Discuss a product</span>
                            </span>
                            <i>
                                {ARROW_SVG}
                                {ARROW_SVG}
                            </i>
                        </Link>
                        <a className="sd4-ghost" href="#sd4-flow">
                            Design flow
                        </a>
                    </div>
                </div>

                <div className="sd4-hero__gallery" data-sd4-gallery>
                    {HERO_FIGURES.map((figure) => (
                        <figure className="sd4-hero__fig" data-sd4-fig key={figure.src}>
                            <img
                                src={figure.src}
                                alt={figure.alt}
                                width={figure.width}
                                height={figure.height} loading="lazy" />
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
