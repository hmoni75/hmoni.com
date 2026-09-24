import RevealText from "@/shared/effects/RevealText";

// About 4 Section 3 - Beliefs list + hover float image (see About4Effect)

const BELIEFS = [
    {
        index: "01",
        preview: "/assets/imgs/pages/home-12/sec-2-project-2.webp",
        name: "Clarity over decoration",
        text: "If a layout needs an explanation, the idea is not finished. We design for first-scan comprehension.",
    },
    {
        index: "02",
        preview: "/assets/imgs/pages/home-12/sec-2-project-3.webp",
        name: "Systems beat one-offs",
        text: "Guidelines, tokens, and components scale better than hero screens no one can extend.",
    },
    {
        index: "03",
        preview: "/assets/imgs/pages/home-8/sec7-img-1.webp",
        name: "Constraints are materials",
        text: "Budget, timeline, and stack are creative inputs—not obstacles we ignore until week four.",
    },
    {
        index: "04",
        preview: "/assets/imgs/pages/home-12/sec-2-project-4.webp",
        name: "Feedback is a craft",
        text: "We structure reviews so opinions sharpen decisions instead of diluting them.",
    },
    {
        index: "05",
        preview: "/assets/imgs/pages/home-15/sec-4-project-1.webp",
        name: "Ship, then refine",
        text: "Live products teach faster than endless comps. We plan iterations into every engagement.",
    },
];

export default function Section3() {
    return (
        <section
            className="about-4-beliefs pt-100 pb-100 bg-neutral-50"
            id="about-4-beliefs"
            aria-label="What we believe"
            data-about4-beliefs=""
        >
            <div className="container">
                <div className="about-4-beliefs__intro">
                    <p className="about-4-kicker">
                        <span className="about-4-kicker__num">(03)</span>
                        Beliefs
                    </p>
                    <h2 className="about-4-beliefs__title reveal-text">
                        <RevealText>How we decide what ships.</RevealText>
                    </h2>
                    <p className="about-4-beliefs__lead">
                        Five principles that guide every brief—from naming systems to product launches.
                    </p>
                </div>

                {/* Floating hover preview (GSAP-driven, desktop) */}
                <div className="about-4-float" data-about4-float="" aria-hidden="true">
                    <img
                        src="/assets/imgs/pages/home-12/sec-2-project-2.webp"
                        alt=""
                        data-about4-float-img=""
                        width={960}
                        height={960} loading="lazy" />
                </div>

                <ol className="about-4-beliefs__list">
                    {BELIEFS.map((belief) => (
                        <li
                            key={belief.index}
                            className="about-4-belief"
                            data-about4-belief=""
                            data-preview={belief.preview}
                        >
                            <span className="about-4-belief__index">{belief.index}</span>
                            <div className="about-4-belief__body">
                                <h3 className="about-4-belief__name">{belief.name}</h3>
                                <p className="about-4-belief__text">{belief.text}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
