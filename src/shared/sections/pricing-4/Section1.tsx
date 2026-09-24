import { Link } from "react-router-dom";
// Pricing 4 Section 1 - Subscription pricing

const JOIN_ICON_SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M19.5 4.5L22.5 7.5L19.5 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.5 17.5L5.5 20.5L8.5 23.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21.5 7.5H12.5C8.91 7.5 6 10.41 6 14V14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6.5 20.5H15.5C19.09 20.5 22 17.59 22 14V13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

const BRIEF_ICON_SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 8.5C6 7.12 7.12 6 8.5 6H19.5C20.88 6 22 7.12 22 8.5V16C22 17.38 20.88 18.5 19.5 18.5H12L7.5 22V18.5H8.5C7.12 18.5 6 17.38 6 16V8.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M10 11.5H18M10 14.5H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

const DELIVER_ICON_SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 5V15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9.5 11L14 15.5L18.5 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 20.5H21.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M19 17.5L21.5 20.5L19 23.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const BOLT_SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="96" viewBox="0 0 72 96" fill="none">
        <path d="M42 4L16 52H34L28 92L58 40H38L42 4Z" fill="url(#pricing4Bolt)" />
        <defs>
            <linearGradient id="pricing4Bolt" x1="16" y1="4" x2="58" y2="92" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F5F5F5" />
                <stop offset="0.45" stopColor="#B8B8B8" />
                <stop offset="1" stopColor="#6E6E6E" />
            </linearGradient>
        </defs>
    </svg>
);

const DOC_SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4.5 2.5H9.5L12 5V13.5H4.5V2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M9.5 2.5V5H12" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M6.5 8H10M6.5 10.5H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);

const STEPS = [
    {
        icon: JOIN_ICON_SVG,
        title: "Join",
        text: "Secure your seat online and drop briefs into a shared workspace the same day.",
    },
    {
        icon: BRIEF_ICON_SVG,
        title: "Brief",
        text: "Send brand, product, or campaign work—priority stays clear in one live queue.",
    },
    {
        icon: DELIVER_ICON_SVG,
        title: "Deliver",
        text: "Most requests land in about two working days, ready for review or export.",
    },
];

const PLAN_FEATURES = [
    "No long-term lock-in",
    "Up to three brand systems",
    "~48h typical turnaround",
    "Freeze billing when quiet",
    "Rolling request queue",
    "Web & product support",
];

const PROJECT_FEATURES = [
    "Scoped deliverables",
    "Three review rounds",
    "Fixed calendar",
    "Shared progress notes",
];

export default function Section1() {
    return (
        <section className="pricing-4-main pt-150 pb-80" aria-label="Subscription pricing">
            <div className="container">
                {/* Hero */}
                <div className="pricing-4-hero">
                    <h1 className="pricing-4-hero__title">
                        <span className="pricing-4-hero__title-muted">Transparent rates.</span>
                        <span className="pricing-4-hero__title-strong">Exceptional craft.</span>
                    </h1>
                    <div className="pricing-4-hero__aside">
                        <p className="pricing-4-hero__lead-title mb-8">Open pricing. Zero surprise invoices.</p>
                        <p className="pricing-4-hero__lead mb-0">Choose a monthly partnership or a defined project fee—whichever matches your roadmap right now.</p>
                    </div>
                </div>

                {/* Process */}
                <div className="pricing-4-steps">
                    {STEPS.map((step) => (
                        <div key={step.title} className="pricing-4-step">
                            <span className="pricing-4-step__icon" aria-hidden="true">
                                {step.icon}
                            </span>
                            <h2 className="pricing-4-step__title">{step.title}</h2>
                            <p className="pricing-4-step__text">{step.text}</p>
                        </div>
                    ))}
                </div>

                {/* Main plan board */}
                <div className="pricing-4-board">
                    <div className="pricing-4-float" aria-hidden="false">
                        <span className="pricing-4-float__badge">Pause or cancel anytime</span>
                        <p className="pricing-4-float__text">Design partnership for teams that ship every week—not once a quarter.</p>
                        <span className="pricing-4-float__bolt" aria-hidden="true">
                            {BOLT_SVG}
                        </span>
                    </div>

                    <div className="pricing-4-board__left">
                        <span className="pricing-4-available">
                            <span className="pricing-4-available__dot" aria-hidden="true" />
                            Seats open this month
                        </span>
                        <h2 className="pricing-4-board__title">Partner with us</h2>
                        <p className="pricing-4-board__desc">Work with a senior creative team without the retainer fluff or layered agency fees.</p>
                    </div>

                    <div className="pricing-4-board__right">
                        <h2 className="pricing-4-plan__name">Always-on Design</h2>
                        <p className="pricing-4-plan__desc">One predictable monthly fee for rolling design requests. Built for product, brand, and growth needs that never pause.</p>
                        <div className="pricing-4-plan__price">
                            <span className="pricing-4-plan__amount">$6,400</span>
                            <span className="pricing-4-plan__period">/ month</span>
                        </div>
                        <hr className="pricing-4-plan__rule" />
                        <ul className="pricing-4-plan__features">
                            {PLAN_FEATURES.map((feature) => (
                                <li key={feature}>{feature}</li>
                            ))}
                        </ul>
                        <div className="pricing-4-plan__cta-row">
                            <Link className="pricing-4-btn pricing-4-btn--dark" to="/contact-1">
                                <span>Get started</span>
                                <span className="pricing-4-btn__mark" aria-hidden="true">O</span>
                            </Link>
                            <span className="pricing-4-plan__pay-note">Secure checkout</span>
                        </div>
                    </div>
                </div>

                {/* Single project bar */}
                <div className="pricing-4-project">
                    <div className="pricing-4-project__info">
                        <h2 className="pricing-4-project__name">Defined Project</h2>
                        <p className="pricing-4-project__desc">Need a launch, rebrand, or campaign without a monthly seat? Scope it once, price it once.</p>
                    </div>
                    <ul className="pricing-4-project__features">
                        {PROJECT_FEATURES.map((feature) => (
                            <li key={feature}>{feature}</li>
                        ))}
                    </ul>
                    <Link className="pricing-4-btn pricing-4-btn--light" to="/contact-1">
                        <span className="pricing-4-btn__doc" aria-hidden="true">
                            {DOC_SVG}
                        </span>
                        <span>Request a quote</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
