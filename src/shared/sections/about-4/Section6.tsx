import { Link } from "react-router-dom";
// About 4 Section 6 - Dark CTA (fixed inks for dark mode safety)

export default function Section6() {
    return (
        <section className="about-4-cta pb-120" aria-label="Start a project">
            <div className="container">
                <div className="about-4-cta__panel">
                    <div className="about-4-cta__copy">
                        <p className="about-4-cta__kicker">(06) Next</p>
                        <h2 className="about-4-cta__title">Have a brief that needs a clear partner?</h2>
                        <p className="about-4-cta__text">
                            Tell us about goals, constraints, and timeline. We will reply within one
                            business day with next steps—or a polite no if we are not the right fit.
                        </p>
                    </div>
                    <div className="about-4-cta__aside">
                        <Link className="about-4-cta__btn" to="/contact-1">
                            Start a conversation
                        </Link>
                        <a className="about-4-cta__mail" href="mailto:hello@H Moni.com">
                            hello@H Moni.com
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

