import RevealText from "@/shared/effects/RevealText";

// Services 5 Section 3 - How we work

const STEPS = [
    {
        num: "01",
        title: "Define",
        text: "We lock outcomes, audience, constraints, and the single metric that means the engagement worked.",
        delay: ".08",
    },
    {
        num: "02",
        title: "Shape",
        text: "Concepts and systems in the open—Figma as the shared source, decisions written down next to the art.",
        delay: ".12",
    },
    {
        num: "03",
        title: "Ship",
        text: "Production-ready assets, handoff notes, and a clear next lane so momentum doesn’t die at launch.",
        delay: ".16",
    },
];

export default function Section3() {
    return (
        <section className="svc5-process pt-100 pb-100 bg-neutral-50" aria-label="How we work">
            <div className="container">
                <div className="svc5-process__head at_fade_anim" data-fade-from="bottom" data-delay=".05">
                    <p className="svc5-kicker svc5-kicker--dark mb-15">
                        <span className="svc5-kicker__num">(02)</span>
                        <span className="svc5-kicker__text">Method</span>
                    </p>
                    <h2 className="svc5-process__title reveal-text mb-0">
                        <RevealText>A short path from brief to build</RevealText>
                    </h2>
                </div>

                <div className="svc5-process__grid">
                    {STEPS.map((step) => (
                        <article
                            key={step.num}
                            className="svc5-step at_fade_anim"
                            data-fade-from="bottom"
                            data-delay={step.delay}
                            data-svc5-step=""
                        >
                            <span className="svc5-step__num">{step.num}</span>
                            <h3 className="svc5-step__title">{step.title}</h3>
                            <p className="svc5-step__text">{step.text}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
