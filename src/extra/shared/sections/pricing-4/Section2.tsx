// Pricing 4 Section 2 - FAQs

const DIAMOND_SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path d="M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3L4 0Z" fill="currentColor" />
    </svg>
);

const PLAY_SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M3 1.5L10 6L3 10.5V1.5Z" fill="currentColor" />
    </svg>
);

const FAQS = [
    {
        id: "pricing4Faq1",
        question: "How does the monthly partnership work day to day?",
        answer: "You join a shared board, queue briefs in priority order, and we return design files for review. One active request at a time keeps quality high and timelines honest.",
    },
    {
        id: "pricing4Faq2",
        question: "Why not build an in-house team instead?",
        answer: "Hiring, onboarding, and managing senior talent takes months. The subscription gives you senior craft immediately—without fixed headcount or benefits overhead.",
    },
    {
        id: "pricing4Faq3",
        question: "Is the request queue really open-ended?",
        answer: "Yes—add as many briefs as you need. We work through them sequentially so each piece gets full attention. Bulk campaigns can be scoped as a defined project when speed matters.",
    },
    {
        id: "pricing4Faq4",
        question: "How quickly do deliverables typically land?",
        answer: "Most tickets ship within two business days after the brief is clear. Complex systems or multi-page builds are estimated upfront so there are no guesswork delays.",
    },
    {
        id: "pricing4Faq5",
        question: "What if we only need one campaign right now?",
        answer: "Use Defined Project for fixed scopes—launches, rebrands, or decks. You get a quote, milestones, and revision rounds without committing to a monthly seat.",
    },
];

export default function Section2() {
    return (
        <section className="pricing-4-faq pt-80 pb-120" aria-label="Frequently asked questions">
            <div className="container">
                <header className="pricing-4-faq__label">
                    <span className="pricing-4-faq__diamond" aria-hidden="true">
                        {DIAMOND_SVG}
                    </span>
                    <span>(09)</span>
                    <span>(Frequently Asked Questions)</span>
                </header>

                <div className="pricing-4-faq__grid">
                    <div className="pricing-4-faq__media">
                        <div className="pricing-4-showreel">
                            <div className="pricing-4-showreel__frame">
                                <img
                                    src="/assets/imgs/pages/home-8/sec7-img-2.webp"
                                    alt="Creative team reel thumbnail"
                                    width={640}
                                    height={800}
                                    loading="lazy"
                                />
                            </div>
                            <a
                                className="pricing-4-showreel__bar popup-video"
                                href="https://www.youtube.com/watch?v=VCPGMjCW0is"
                            >
                                <span className="pricing-4-showreel__play">
                                    {PLAY_SVG}
                                    Play
                                </span>
                                <span className="pricing-4-showreel__title">Showreel</span>
                            </a>
                        </div>
                    </div>

                    <div className="pricing-4-faq__list">
                        <div className="accordion pricing-4-accordion" id="pricing4Faq">
                            {FAQS.map((faq, idx) => (
                                <div key={faq.id} className="pricing-4-acc-item">
                                    <h3 className="pricing-4-acc-item__header">
                                        <button
                                            className={`pricing-4-acc-item__btn ${idx === 0 ? "" : "collapsed"}`.trim()}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#${faq.id}`}
                                            aria-expanded={idx === 0}
                                            aria-controls={faq.id}
                                        >
                                            <span>{faq.question}</span>
                                            <span className="pricing-4-acc-item__icon" aria-hidden="true" />
                                        </button>
                                    </h3>
                                    <div
                                        id={faq.id}
                                        className={`collapse ${idx === 0 ? "show" : ""}`.trim()}
                                        data-bs-parent="#pricing4Faq"
                                    >
                                        <div className="pricing-4-acc-item__body">
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
