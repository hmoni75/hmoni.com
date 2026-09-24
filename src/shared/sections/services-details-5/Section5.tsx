import { Link } from "react-router-dom";
// Services Details 5 Section 5 - CTA panel + next-service links

const ARROW_SVG = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path
            d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
            fill="currentColor"
        />
    </svg>
);

const NEXT_LINKS = [
    { href: "/services-details-3", label: "Startup Sprint" },
    { href: "/services-details-4", label: "UI/UX Design" },
    { href: "/services-details-2", label: "AI Systems" },
];

export default function Section5() {
    return (
        <section className="sd5-cta pt-100 pb-120" data-sd5-cta="">
            <div className="container">
                <div className="sd5-cta__panel" data-sd5-cta-panel="">
                    <p className="sd5-label mb-20">[04] Engage</p>
                    <h2 className="sd5-cta__title text-scale-anim-2 mb-25">
                        Let’s build digital that compounds
                    </h2>
                    <p className="sd5-cta__text at_fade_anim" data-fade-from="bottom">
                        Share category, current stack, and growth target. We’ll return a proposed 90-day
                        system.
                    </p>
                    <div className="sd5-cta__actions at_fade_anim" data-fade-from="bottom" data-delay=".1">
                        <Link className="at-btn rounded-0" to="/contact-1">
                            <span>
                                <span className="text-1">Talk growth</span>
                                <span className="text-2">Talk growth</span>
                            </span>
                            <i>
                                {ARROW_SVG}
                                {ARROW_SVG}
                            </i>
                        </Link>
                        <a className="sd5-mail" href="mailto:hello@orisa.com">
                            hello@orisa.com
                        </a>
                    </div>
                </div>
                <div className="sd5-next">
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
