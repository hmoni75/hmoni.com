import { Link } from "react-router-dom";
import RevealText from "@/shared/effects/RevealText";

// About 5 Section 1 - Split-screen origin hero

const ARROW_SVG = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
            fill="currentColor"
        />
    </svg>
);

const FACTS = [
    { label: "HQ", value: "Lisbon · remote mesh" },
    { label: "Focus", value: "Brand · product · growth" },
    { label: "Model", value: "Partner squads" },
];

export default function Section1() {
    return (
        <section className="about-5-hero" aria-label="About H Moni">
            <div className="about-5-hero__panel about-5-hero__panel--ink">
                <p className="about-5-hero__kicker">
                    <span>(01)</span> Origin
                </p>
                <p className="about-5-hero__year">2016</p>
                <p className="about-5-hero__tag">
                    Where H Moni started counting projects in months—not pitches.
                </p>
                <ul className="about-5-hero__facts">
                    {FACTS.map((fact) => (
                        <li key={fact.label}>
                            <span>{fact.label}</span> {fact.value}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="about-5-hero__panel about-5-hero__panel--media">
                <img
                    src="/assets/imgs/pages/home-13/sec-1-hero-1.webp"
                    alt="H Moni studio atmosphere"
                    style={{ objectFit: "cover" }} loading="lazy" />
                <div className="about-5-hero__overlay">
                    <h1 className="about-5-hero__title reveal-text">
                        <RevealText>Design that moves the business, not just the mood board.</RevealText>
                    </h1>
                    <p className="about-5-hero__lead">
                        We are a creative studio built for teams who need sharp strategy and production
                        that keeps pace with shipping calendars.
                    </p>
                    <div className="about-5-hero__actions">
                        <Link className="at-btn" to="/contact-1">
                            <span>
                                <span className="text-1">Book intro call</span>
                                <span className="text-2">Book intro call</span>
                            </span>
                            <i>
                                {ARROW_SVG}
                                {ARROW_SVG}
                            </i>
                        </Link>
                        <Link
                            className="about-5-text-link about-5-text-link--on-media"
                            to="/portfolio-1"
                        >
                            See the work
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

