import { Link } from "react-router-dom";
// About 5 Section 6 - Accent CTA

export default function Section6() {
    return (
        <section className="about-5-cta pb-120" aria-label="Work with H Moni">
            <div className="container">
                <div className="about-5-cta__panel">
                    <div className="about-5-cta__left">
                        <p className="about-5-cta__kicker">(05) Open seats</p>
                        <h2 className="about-5-cta__title">Ready when your next chapter is.</h2>
                    </div>
                    <div className="about-5-cta__right">
                        <p className="about-5-cta__text">
                            Share goals, constraints, and timing. We will map fit in a short call—or
                            recommend another team if we are not aligned.
                        </p>
                        <div className="about-5-cta__row">
                            <Link className="about-5-cta__btn" to="/contact-1">
                                Start a project
                            </Link>
                            <a className="about-5-cta__mail" href="mailto:hello@hmoni.com">
                                hello@hmoni.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

