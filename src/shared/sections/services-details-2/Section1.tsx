import { Link } from "react-router-dom";
// Services Details 2 Section 1 - Hero with HUD visual, chips and meta rail

const ARROW_SVG = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
            fill="currentColor"
        />
    </svg>
);

const TITLE_LINES = [
    { text: "Intelligent", accent: false },
    { text: "systems", accent: true },
    { text: "for real ops", accent: false },
];

const CHIPS = [
    "RAG architectures",
    "Agent workflows",
    "Eval harnesses",
    "Model routing",
    "Guardrails",
    "Observability",
];

const META = [
    { term: "Domain", detail: "LLMs · MLOps · Product AI" },
    { term: "Span", detail: "8–16 weeks typical" },
    { term: "Mode", detail: "Embedded squad" },
];

export default function Section1() {
    return (
        <section className="sd2-hero" aria-label="AI systems service" data-sd2-hero="">
            <div className="sd2-hero__grid" aria-hidden="true" />
            <div className="sd2-hero__glow" aria-hidden="true" />

            <div className="container p-relative z-1">
                <div className="sd2-hero__top">
                    <nav
                        className="sd2-crumb at_fade_anim"
                        data-fade-from="bottom"
                        data-delay=".05"
                        aria-label="Breadcrumb"
                    >
                        <Link to="/services-1">Services</Link>
                        <span className="sd2-crumb__sep">/</span>
                        <span>AI Systems Engineering</span>
                    </nav>
                    <div className="sd2-status at_fade_anim" data-fade-from="bottom" data-delay=".1">
                        <span className="sd2-status__dot" aria-hidden="true" />
                        <span className="sd2-status__label">SYS · ONLINE</span>
                        <span className="sd2-status__code">ID-04.AX</span>
                    </div>
                </div>

                <div className="sd2-hero__main">
                    <div className="sd2-hero__copy">
                        <p
                            className="sd2-kicker at_fade_anim"
                            data-fade-from="bottom"
                            data-delay=".12"
                        >
                            <span className="sd2-kicker__num">[01]</span>
                            Intelligence layer
                        </p>
                        <h1 className="sd2-hero__title">
                            {TITLE_LINES.map((line) => (
                                <span
                                    key={line.text}
                                    className={`sd2-hero__line${line.accent ? " sd2-hero__line--accent" : ""}`}
                                    data-sd2-title-line=""
                                >
                                    {line.text}
                                </span>
                            ))}
                        </h1>
                        <p
                            className="sd2-hero__lead at_fade_anim"
                            data-fade-from="bottom"
                            data-delay=".28"
                        >
                            We design, ship, and govern AI that sits inside products—models,
                            pipelines, and interfaces teams can trust in production.
                        </p>
                        <div
                            className="sd2-hero__actions at_fade_anim"
                            data-fade-from="bottom"
                            data-delay=".35"
                        >
                            <Link className="at-btn text-white rounded-0" to="/contact-1">
                                <span>
                                    <span className="text-1">Start a build</span>
                                    <span className="text-2">Start a build</span>
                                </span>
                                <i>
                                    {ARROW_SVG}
                                    {ARROW_SVG}
                                </i>
                            </Link>
                            <a className="sd2-hero__ghost" href="#sd2-pipeline">
                                View pipeline
                            </a>
                        </div>
                    </div>

                    <div
                        className="sd2-hero__rail at_fade_anim"
                        data-fade-from="right"
                        data-delay=".2"
                    >
                        <div className="sd2-hero__visual" data-sd2-hero-visual="">
                            <img
                                src="/assets/imgs/pages/img-95.webp"
                                alt="AI systems workspace"
                                loading="eager"
                            />
                            <div className="sd2-hero__hud">
                                <span>Latency</span>
                                <strong data-sd2-hud-latency="">42ms</strong>
                            </div>
                        </div>
                        <dl className="sd2-hero__meta">
                            {META.map((meta) => (
                                <div key={meta.term}>
                                    <dt>{meta.term}</dt>
                                    <dd>{meta.detail}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>

                <ul className="sd2-hero__chips" data-sd2-chips="">
                    {CHIPS.map((chip) => (
                        <li key={chip}>{chip}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
