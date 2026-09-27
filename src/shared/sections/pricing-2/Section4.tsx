import { Link } from "react-router-dom";
import RevealText from "@/shared/effects/RevealText";

// Pricing 2 Section 4 - CTA panel + FAQ accordion

const ARROW_SVG = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
            fill="currentColor"
        />
    </svg>
);

const FAQS = [
    {
        id: "p2Faq1",
        question: "Can I switch plans later?",
        answer: "Yes. You can upgrade or downgrade at any time. We prorate changes so you only pay for what you use.",
    },
    {
        id: "p2Faq2",
        question: "Do you offer fixed-price projects?",
        answer: "Absolutely. For defined scopes we can structure a fixed fee. Monthly retainers work better for ongoing growth work.",
    },
    {
        id: "p2Faq3",
        question: "What’s included onboarding?",
        answer: "Every plan starts with discovery, access setup, and a shared roadmap so both teams know milestones and ownership from day one.",
    },
    {
        id: "p2Faq4",
        question: "Is there a minimum commitment?",
        answer: "Monthly plans can roll month-to-month after the first 30 days. Annual billing locks in savings with a 12-month term.",
    },
];

export default function Section4() {
    return (
        <section className="pricing-2-cta pt-120 pb-120" aria-label="Ready to start">
            <div className="container">
                <div className="pricing-2-cta__panel bg-neutral-900 rounded-5 overflow-hidden p-relative">
                    <div
                        className="p-absolute top-0 left-0 w-100 h-100 opacity-10 z-0"
                        data-background="/assets/imgs/pages/noise.gif"
                        aria-hidden="true"
                    />
                    <div className="row g-5 align-items-center p-relative z-1">
                        <div className="col-lg-6">
                            <h2 className="pricing-2-cta__title text-white reveal-text mb-20">
                                <RevealText>Still deciding which plan fits?</RevealText>
                            </h2>
                            <p className="text-white opacity-75 fz-font-lg mb-0">
                                Book a short call and we’ll recommend the right engagement for your
                                goals, team, and budget—no pressure.
                            </p>
                        </div>
                        <div className="col-lg-5 ms-lg-auto">
                            <div className="pricing-2-cta__actions d-flex flex-wrap gap-3 align-items-center justify-content-lg-end">
                                <Link className="at-btn pricing-2-cta__btn px-5" to="/contact-1">
                                    <span>
                                        <span className="text-1 text-capitalize">Book a call</span>
                                        <span className="text-2 text-capitalize">Book a call</span>
                                    </span>
                                    <i>
                                        {ARROW_SVG}
                                        {ARROW_SVG}
                                    </i>
                                </Link>
                                <a
                                    className="pricing-2-cta__mail text-white text-decoration-underline"
                                    href="mailto:hello@H Moni.com"
                                >
                                    hello@H Moni.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-5 mt-100">
                    <div className="col-lg-4">
                        <span className="at-btn common-black text-uppercase bg-transparent mb-10 rounded-0 p-0">
                            <span className="text-uppercase">
                                <span className="text-1">FAQ</span>
                                <span className="text-2">FAQ</span>
                            </span>
                            <i>
                                {ARROW_SVG}
                                {ARROW_SVG}
                            </i>
                        </span>
                        <h3 className="section-title lh-1 reveal-text">
                            <RevealText>Pricing questions, answered</RevealText>
                        </h3>
                        <p className="h6 fz-font-lg fw-500 neutral-500 mb-0">
                            Clear answers on billing, upgrades, and what happens after you sign.
                        </p>
                    </div>
                    <div className="col-lg-7 ms-lg-auto">
                        <div className="accordion pt-lg-0" id="pricing2Faq">
                            {FAQS.map((faq, idx) => (
                                <div
                                    key={faq.id}
                                    className="at-faq-item bg-neutral-50 border-100 scroll-move-up rounded-4"
                                >
                                    <div className="at-faq-header d-flex gap-2">
                                        <div className="box-number">
                                            <span className="at-faq-number">{idx + 1}</span>
                                        </div>
                                        <button
                                            className={`at-faq-button ${idx === 0 ? "" : "collapsed"}`.trim()}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#${faq.id}`}
                                            aria-expanded={idx === 0}
                                            aria-controls={faq.id}
                                        >
                                            {faq.question}
                                        </button>
                                    </div>
                                    <div
                                        id={faq.id}
                                        className={`at-faq-collapse collapse ${idx === 0 ? "show" : ""}`.trim()}
                                        data-bs-parent="#pricing2Faq"
                                    >
                                        <div className="at-faq-body">
                                            <p>{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
