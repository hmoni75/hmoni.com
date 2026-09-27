import { Link } from "react-router-dom";
// Services Details 2 Section 6 - CTA panel + related services

const ARROW_SVG = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
            fill="currentColor"
        />
    </svg>
);

const NEXT_LINKS = [
    { href: "/services-details", label: "Strategy & Research" },
    { href: "/services-4", label: "Services catalog" },
    { href: "/portfolio-4", label: "Tech case studies" },
];

export default function Section6() {
    return (
        <section className="sd2-cta pt-80 pb-120" aria-label="Next step" data-sd2-cta="">
            <div className="container">
                <div className="sd2-cta__panel" data-sd2-cta-panel="">
                    <div className="sd2-cta__grid-bg" aria-hidden="true" />
                    <div className="sd2-cta__inner">
                        <p className="sd2-kicker mb-20 at_fade_anim" data-fade-from="bottom">
                            <span className="sd2-kicker__num">[06]</span>
                            Engage
                        </p>
                        <h2 className="sd2-cta__title text-scale-anim-2 mb-20">
                            Ready to put AI on a production schedule?
                        </h2>
                        <p
                            className="sd2-cta__text at_fade_anim"
                            data-fade-from="bottom"
                            data-delay=".1"
                        >
                            Share your stack, constraints, and the job the model should do. We’ll
                            return a framed approach within a few business days.
                        </p>
                        <div
                            className="sd2-cta__actions at_fade_anim"
                            data-fade-from="bottom"
                            data-delay=".18"
                        >
                            <Link className="at-btn text-white rounded-0" to="/contact-1">
                                <span>
                                    <span className="text-1">Book a systems call</span>
                                    <span className="text-2">Book a systems call</span>
                                </span>
                                <i>
                                    {ARROW_SVG}
                                    {ARROW_SVG}
                                </i>
                            </Link>
                            <a className="sd2-cta__mail" href="mailto:hello@H Moni.com">
                                hello@H Moni.com
                            </a>
                        </div>
                    </div>
                </div>

                <div className="sd2-next" data-sd2-next="">
                    <p className="sd2-next__label">Related services</p>
                    <div className="sd2-next__links">
                        {NEXT_LINKS.map((link) => (
                            <Link key={link.href} to={link.href}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
