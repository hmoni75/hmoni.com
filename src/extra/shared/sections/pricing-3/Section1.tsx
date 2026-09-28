import { Link } from "react-router-dom";
// Pricing 3 Section 1 - Minimal plan grid

const STAR_SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M5 0L6.18 3.82L10 5L6.18 6.18L5 10L3.82 6.18L0 5L3.82 3.82L5 0Z" fill="currentColor" />
    </svg>
);

const CTA_ARROW_SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
            d="M2 10L10 2M10 2H4M10 2V8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

interface Plan {
    name: string;
    desc: string;
    value: string;
    features: string[];
    dark?: boolean;
}

const PLANS: Plan[] = [
    {
        name: "Launch",
        desc: "Built for early-stage brands that need a clear, confident first digital presence.",
        value: "1,490",
        features: [
            "Focused brand direction workshop",
            "Responsive site on a clean system",
            "Photography direction guidelines",
        ],
    },
    {
        name: "Momentum",
        desc: "For growing teams ready to refine product experience and sharpen conversion.",
        value: "4,850",
        features: [
            "Everything in Launch",
            "Modular page system & type scale",
            "Conversion-led content structure",
            "Performance & accessibility pass",
            "Monthly iteration sprints",
            "Analytics instrumentation setup",
        ],
    },
    {
        name: "Frontier",
        desc: "A full partnership for multi-product brands that need continuous creative scale.",
        value: "9,200",
        dark: true,
        features: [
            "Everything in Momentum",
            "Cross-channel design system care",
            "CMS architecture & training",
            "Dedicated creative producer",
            "Same-week revision lane",
            "Executive narrative decks",
            "Quarterly brand health review",
            "Priority roadmap planning",
        ],
    },
];

export default function Section1() {
    return (
        <section className="pricing-3-plans pt-150 pb-80" aria-label="Pricing plans">
            <div className="container">
                <header className="pricing-3-label">
                    <span className="pricing-3-label__left">
                        {STAR_SVG}
                        (04)
                    </span>
                    <span className="pricing-3-label__center">(Pricing)</span>
                    <span className="pricing-3-label__right">© 2026</span>
                </header>

                <div className="pricing-3-grid">
                    {PLANS.map((plan) => (
                        <article
                            key={plan.name}
                            className={`pricing-3-card${plan.dark ? " pricing-3-card--dark" : ""}`}
                        >
                            <h2 className="pricing-3-card__name">{plan.name}</h2>
                            <p className="pricing-3-card__desc">{plan.desc}</p>
                            <div className="pricing-3-card__price">
                                <span className="pricing-3-card__currency">$</span>
                                <span className="pricing-3-card__value">{plan.value}</span>
                                <span className="pricing-3-card__period">/ Month</span>
                            </div>
                            <Link className="pricing-3-card__cta" to="/contact-1">
                                <span className="pricing-3-card__cta-text">Start this plan</span>
                                <span className="pricing-3-card__cta-line" aria-hidden="true">
                                    {CTA_ARROW_SVG}
                                </span>
                            </Link>
                            <h3 className="pricing-3-card__included">What you get</h3>
                            <ul className="pricing-3-card__features">
                                {plan.features.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
