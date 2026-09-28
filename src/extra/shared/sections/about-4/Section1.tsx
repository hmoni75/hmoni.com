import { Link } from "react-router-dom";
import RevealText from "@/shared/effects/RevealText";

// About 4 Section 1 - Editorial manifesto hero

const ARROW_SVG = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
            fill="currentColor"
        />
    </svg>
);

const INDEX_LINKS = [
    { href: "#about-4-story", label: "Story" },
    { href: "#about-4-proof", label: "Proof" },
    { href: "#about-4-beliefs", label: "Beliefs" },
    { href: "#about-4-craft", label: "Craft" },
    { href: "#about-4-space", label: "Space" },
];

const HERO_SHOTS: {
    modifier: string;
    src: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
}[] = [
    {
        modifier: "about-4-hero__shot--tall",
        src: "/assets/imgs/pages/home-12/sec-2-project-2.webp",
        alt: "Studio work in progress",
        width: 960,
        height: 960,
    },
    {
        modifier: "about-4-hero__shot--mid",
        src: "/assets/imgs/pages/home-8/sec7-img-1.webp",
        alt: "Team collaboration",
        width: 1400,
        height: 933,
    },
    {
        modifier: "about-4-hero__shot--wide",
        src: "/assets/imgs/pages/home-12/sec-2-project-4.webp",
        alt: "Campaign still",
        width: 960,
        height: 960,
        caption: "Strategy sessions → systems → shipping days",
    },
];

export default function Section1() {
    return (
        <section className="about-4-hero pt-150 pb-80" aria-label="About H Moni">
            <div className="container">
                <div className="about-4-hero__grid">
                    <aside className="about-4-hero__aside">
                        <p className="about-4-kicker">
                            <span className="about-4-kicker__num">(01)</span>
                            Studio
                        </p>
                        <nav className="about-4-index" aria-label="On this page">
                            {INDEX_LINKS.map((link) => (
                                <a key={link.href} href={link.href}>
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <p className="about-4-hero__meta mb-0">Est. 2016 · Remote-first · 3 studios</p>
                    </aside>

                    <div className="about-4-hero__main">
                        <p className="about-4-hero__eyebrow">Independent creative house</p>
                        <h1 className="about-4-hero__title reveal-text">
                            <RevealText>
                                We build brands that earn attention—then earn trust.
                            </RevealText>
                        </h1>
                        <p className="about-4-hero__lead">
                            H Moni is a strategy-led design studio for teams that ship. We pair clear
                            thinking with sharp execution across identity, product, and campaigns—no
                            theatre, no filler decks.
                        </p>
                        <div className="about-4-hero__actions">
                            <Link className="at-btn" to="/contact-1">
                                <span>
                                    <span className="text-1">Talk with us</span>
                                    <span className="text-2">Talk with us</span>
                                </span>
                                <i>
                                    {ARROW_SVG}
                                    {ARROW_SVG}
                                </i>
                            </Link>
                            <Link className="about-4-link" to="/portfolio-1">
                                View selected work
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="about-4-hero__mosaic" id="about-4-story">
                    {HERO_SHOTS.map((shot) => (
                        <figure key={shot.src} className={`about-4-hero__shot ${shot.modifier}`}>
                            <img
                                src={shot.src}
                                alt={shot.alt}
                                width={shot.width}
                                height={shot.height}
                                loading="eager"
                            />
                            {shot.caption && (
                                <figcaption className="about-4-hero__caption">
                                    {shot.caption}
                                </figcaption>
                            )}
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

