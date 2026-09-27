import { Link } from "react-router-dom";
// Pricing 5 Section 2 - FAQ accordion + contact block

const ARROW_SVG = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
    >
        <path
            d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const FAQS = [
    {
        id: "p5Faq1",
        question: "What changes between monthly and per-project pricing?",
        answer: "Monthly is an ongoing seat with one active request at a time. Per project is a fixed brief, timeline, and deliverable list—ideal when you need a single launch, rebrand, or campaign kit.",
    },
    {
        id: "p5Faq2",
        question: "Is the figure on the calculator the final fee?",
        answer: "It is a transparent starting estimate. After discovery we confirm scope, add-ons, and any rush needs so both sides sign the same number with zero surprises.",
    },
    {
        id: "p5Faq3",
        question: "How long does a typical engagement run?",
        answer: "Monthly partners often stay three months or longer. Fixed projects commonly land in 3–8 weeks depending on complexity and how quickly feedback returns.",
    },
    {
        id: "p5Faq4",
        question: "Who is doing the creative work?",
        answer: "Senior specialists inside H Moni lead every deliverable—no opaque subcontract chain. You always know the designer or director reviewing your files.",
    },
    {
        id: "p5Faq5",
        question: "What do you need from us to begin?",
        answer: "Goals, brand assets (if any), timeline, and stakeholder list. A short kickoff workshop is enough for us to build the first brief and start shipping.",
    },
    {
        id: "p5Faq6",
        question: "Is post-launch support included?",
        answer: "Yes. Monthly partners keep an open request lane. Project clients receive a polish window after handoff; longer support can roll into a new monthly seat.",
    },
];

const AVATARS = [
    "/assets/imgs/pages/home-7/avatar-1.webp",
    "/assets/imgs/pages/home-7/avatar-2.webp",
    "/assets/imgs/pages/home-7/avatar-3.webp",
];

export default function Section2() {
    return (
        <section className="pricing-5-faq pt-100 pb-120" aria-label="Answers">
            <div className="container">
                <p className="pricing-5-kicker pricing-5-kicker--light">
                    <span className="pricing-5-kicker__num">(09)</span>
                    <span className="pricing-5-kicker__text">ANSWERS</span>
                </p>

                <h2 className="pricing-5-faq__title">FAQ.</h2>

                <div className="accordion pricing-5-acc" id="pricing5Faq">
                    {FAQS.map((faq, idx) => (
                        <div key={faq.id} className="pricing-5-acc__item">
                            <h3 className="pricing-5-acc__header">
                                <button
                                    className={`pricing-5-acc__btn${idx === 0 ? "" : " collapsed"}`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#${faq.id}`}
                                    aria-expanded={idx === 0}
                                    aria-controls={faq.id}
                                >
                                    <span>{faq.question}</span>
                                    <span className="pricing-5-acc__icon" aria-hidden="true" />
                                </button>
                            </h3>
                            <div
                                id={faq.id}
                                className={`collapse${idx === 0 ? " show" : ""}`}
                                data-bs-parent="#pricing5Faq"
                            >
                                <div className="pricing-5-acc__body">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pricing-5-more">
                    <div className="pricing-5-more__copy">
                        <h3 className="pricing-5-more__title">More questions?</h3>
                        <p className="pricing-5-more__text">
                            Reach out anytime. We are happy to clarify scope before you commit to working
                            together.
                        </p>
                    </div>
                    <div className="pricing-5-more__contact">
                        <div className="pricing-5-more__avatars" aria-hidden="true">
                            {AVATARS.map((src) => (
                                <img key={src} src={src} alt="" width={44} height={44} loading="lazy" />
                            ))}
                        </div>
                        <div className="pricing-5-more__row">
                            <a className="pricing-5-more__email" href="mailto:hello@H Moni.com">
                                hello@H Moni.com
                            </a>
                            <Link
                                className="pricing-5-more__arrow"
                                to="/contact-1"
                                aria-label="Contact H Moni"
                            >
                                {ARROW_SVG}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
