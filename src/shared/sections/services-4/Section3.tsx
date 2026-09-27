import RevealText from "@/shared/effects/RevealText";

// Services 4 Section 3 - Process steps

const ARROW_SVG = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
            fill="currentColor"
        />
    </svg>
);

const STEPS = [
    {
        img: "/assets/imgs/pages/home-12/sec-4-process-1.webp",
        alt: "Discovery workshop",
        num: "01",
        name: "Discovery call",
        text: "Goals, constraints, stakeholders. We decide fit and rough budget band in under an hour.",
        time: "Day 0",
        note: "Assess fit & scope band",
    },
    {
        img: "/assets/imgs/pages/home-12/sec-4-process-2.webp",
        alt: "Scope definition",
        num: "02",
        name: "Scope lock",
        text: "Written outcomes, timeline, roles. You see what is in—and what is explicitly out—before kickoff.",
        time: "Week 1",
        note: "Proposal & SOW",
    },
    {
        img: "/assets/imgs/pages/home-12/sec-4-process-3.webp",
        alt: "Build cycles",
        num: "03",
        name: "Build cycles",
        text: "Weekly demos, shared board, one active focus stream. Feedback is scheduled, not sprinkled.",
        time: "Core weeks",
        note: "Design & ship loop",
    },
    {
        img: "/assets/imgs/pages/home-8/sec7-img-1.webp",
        alt: "Handoff and polish",
        num: "04",
        name: "Handoff & polish",
        text: "Assets, docs, and a short support window so the team can run without us holding the pen.",
        time: "Exit",
        note: "Files + support window",
    },
];

export default function Section3() {
    return (
        <section
            className="svc4-engage pt-100 pb-100 bg-neutral-50 p-relative overflow-hidden"
            id="svc4-engage"
            aria-label="How we engage"
            data-svc4-engage=""
        >
            <div className="container p-relative z-1">
                <div className="row align-items-end g-4 mb-50">
                    <div className="col-lg-5">
                        <span
                            className="at-btn common-black bg-transparent mb-10 rounded-0 p-0 at_fade_anim"
                            data-fade-from="bottom"
                            data-delay=".05"
                        >
                            <span className="text-uppercase">
                                <span className="text-1">Step by step</span>
                                <span className="text-2">Step by step</span>
                            </span>
                            <i>
                                {ARROW_SVG}
                                {ARROW_SVG}
                            </i>
                        </span>
                        <h2 className="section-title h2 fw-600 reveal-text mb-0">
                            <RevealText>Our process</RevealText>
                        </h2>
                    </div>
                    <div className="col-lg-5 ms-lg-auto">
                        <p className="h6 fw-500 mb-0 at_fade_anim" data-fade-from="bottom" data-delay=".1">
                            No mystery phases. Four gates every engagement crosses—from first call to
                            post-launch polish.
                        </p>
                    </div>
                </div>

                <div className="svc4-process">
                    {STEPS.map((step) => (
                        <article key={step.num} className="svc4-process__row" data-svc4-step="">
                            <div className="svc4-process__media">
                                <img
                                    className="anim-zoomin"
                                    src={step.img}
                                    alt={step.alt}
                                    width={280}
                                    height={200}
                                    loading="lazy"
                                />
                            </div>
                            <div className="svc4-process__body">
                                <span className="svc4-process__num">{step.num}</span>
                                <h3 className="svc4-process__name">{step.name}</h3>
                                <p className="svc4-process__text">{step.text}</p>
                            </div>
                            <div className="svc4-process__meta">
                                <span className="svc4-process__time">{step.time}</span>
                                <span className="svc4-process__note">{step.note}</span>
                            </div>
                        </article>
                    ))}
                </div>

                <div
                    className="svc4-engage__contact row g-4 mt-60 align-items-center at_fade_anim"
                    data-fade-from="bottom"
                    data-delay=".1"
                >
                    <div className="col-md-4">
                        <a className="svc4-engage__phone" href="tel:+12125557398">
                            (212) 555-7398
                        </a>
                    </div>
                    <div className="col-md-4">
                        <a className="svc4-engage__mail" href="mailto:hello@H Moni.com">
                            hello@H Moni.com
                        </a>
                    </div>
                    <div className="col-md-4">
                        <p className="svc4-engage__address mb-0">
                            205 North Michigan Avenue, Suite 810, Chicago, 60601, USA
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
