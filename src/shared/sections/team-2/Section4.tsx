import { Link } from "react-router-dom";
// Team 2 Section 4 - Careers CTA panel + next-page links

const ARROW_SVG = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path
            d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
            fill="currentColor"
        />
    </svg>
);

export default function Section4() {
    return (
        <section className="team2-cta pt-40 pb-120" data-team2-cta="">
            <div className="container">
                <div className="team2-cta__panel changeless" data-team2-cta-panel="">
                    <div className="team2-cta__copy">
                        <p className="team2-label team2-label--light mb-15">Careers</p>
                        <h2 className="team2-cta__title text-scale-anim-2 mb-20">
                            Want to ship with us?
                        </h2>
                        <p className="team2-cta__text">
                            We’re selective on hiring—open to people who own quality without theater.
                        </p>
                    </div>
                    <div className="team2-cta__actions">
                        <Link className="at-btn" to="/contact-1">
                            <span>
                                <span className="text-1">Send a note</span>
                                <span className="text-2">Send a note</span>
                            </span>
                            <i>
                                {ARROW_SVG}
                                {ARROW_SVG}
                            </i>
                        </Link>
                        <a className="team2-cta__mail" href="mailto:hello@H Moni.com">
                            hello@H Moni.com
                        </a>
                    </div>
                </div>
                <div className="team2-next">
                    <Link to="/team">Team 01</Link>
                    <Link to="/team-details">Team details</Link>
                    <Link to="/about-1">About</Link>
                </div>
            </div>
        </section>
    );
}
