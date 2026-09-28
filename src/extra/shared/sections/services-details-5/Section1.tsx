import { Link } from "react-router-dom";
import RevealText from "@/shared/effects/RevealText";

// Services Details 5 Section 1 - Wide campaign hero with counting stats

const ARROW_SVG = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path
            d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
            fill="currentColor"
        />
    </svg>
);

type Stat = {
    to: string;
    decimals?: string;
    label: string;
};

const STATS: Stat[] = [
    { to: "4.2", decimals: "1", label: "× avg ROAS on pilot" },
    { to: "38", label: "% lower CPA after creative system" },
    { to: "12", label: "week typical growth cycle" },
];

export default function Section1() {
    return (
        <section className="sd5-hero pt-150 pb-80 overflow-hidden" data-sd5-hero="">
            <div className="sd5-hero__bg" aria-hidden="true" />
            <div className="container p-relative z-1">
                <div className="sd5-hero__top">
                    <nav className="sd5-crumb at_fade_anim" data-fade-from="bottom" aria-label="Breadcrumb">
                        <Link to="/services-1">Services</Link>
                        <span>/</span>
                        <span>Integrated Digital Growth</span>
                    </nav>
                    <span className="sd5-tag at_fade_anim" data-fade-from="bottom" data-delay=".08">
                        Digital Agency · DG-05
                    </span>
                </div>
                <div className="sd5-hero__main">
                    <h1 className="sd5-hero__title">
                        <span className="reveal-text">
                            <RevealText>Attention,</RevealText>
                        </span>
                        <span className="reveal-text">
                            <RevealText>converted.</RevealText>
                        </span>
                    </h1>
                    <div className="sd5-hero__side">
                        <p className="at_fade_anim" data-fade-from="bottom" data-delay=".15">
                            Brand campaigns, performance paths, and content systems—one digital program so
                            creative and media stop working against each other.
                        </p>
                        <Link
                            className="at-btn rounded-0 at_fade_anim"
                            data-fade-from="bottom"
                            data-delay=".22"
                            to="/contact-1"
                        >
                            <span>
                                <span className="text-1">Plan a campaign</span>
                                <span className="text-2">Plan a campaign</span>
                            </span>
                            <i>
                                {ARROW_SVG}
                                {ARROW_SVG}
                            </i>
                        </Link>
                    </div>
                </div>
                <div className="sd5-hero__stats" data-sd5-stats="">
                    {STATS.map((stat) => (
                        <div key={stat.label}>
                            <strong data-sd5-count="" data-to={stat.to} data-decimals={stat.decimals}>
                                0
                            </strong>
                            <span>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
