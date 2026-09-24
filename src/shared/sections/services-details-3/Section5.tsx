import { Link } from "react-router-dom";
// Services Details 3 Section 5 - CTA panel + related service links

const ARROW_SVG = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path
            d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
            fill="currentColor"
        />
    </svg>
);

const NEXT_LINKS = [
    { label: "AI Systems", href: "/services-details-2" },
    { label: "UI/UX Design", href: "/services-details-4" },
    { label: "Digital Growth", href: "/services-details-5" },
];

export default function Section5() {
    return (
        <section className="sd3-cta pt-80 pb-120" data-sd3-cta="">
            <div className="container">
                <div className="sd3-cta__panel" data-sd3-cta-panel="">
                    <div className="sd3-cta__inner">
                        <p className="sd3-label mb-15">[04] Next</p>
                        <h2 className="sd3-cta__title text-scale-anim-2 mb-20">
                            Shipping in 28 days beats polishing for 180
                        </h2>
                        <p className="sd3-cta__text at_fade_anim" data-fade-from="bottom">
                            Share stage, traction, and the one number that matters at launch. We’ll
                            map a sprint in a short intro call.
                        </p>
                        <div
                            className="sd3-cta__actions at_fade_anim"
                            data-fade-from="bottom"
                            data-delay=".1"
                        >
                            <Link className="at-btn rounded-0" to="/contact-1">
                                <span>
                                    <span className="text-1">Start a sprint</span>
                                    <span className="text-2">Start a sprint</span>
                                </span>
                                <i>
                                    {ARROW_SVG}
                                    {ARROW_SVG}
                                </i>
                            </Link>
                            <a className="sd3-link" href="mailto:hello@orisa.com">
                                hello@orisa.com
                            </a>
                        </div>
                    </div>
                    <div className="sd3-cta__aside">
                        <img
                            className="anim-zoomin"
                            src="/assets/imgs/pages/img-100.webp"
                            alt="Startup collaboration"
                            width={408}
                            height={360}
                            loading="lazy"
                        />
                    </div>
                </div>
                <div className="sd3-next">
                    <span>Also explore</span>
                    {NEXT_LINKS.map((link) => (
                        <Link key={link.href} to={link.href}>
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
