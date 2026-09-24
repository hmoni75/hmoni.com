import RevealText from "@/shared/effects/RevealText";

// Services Details 3 Section 3 - Runway timeline (sticky intro + gate meter + weekly steps)

const STEPS = [
    {
        week: "Week 1",
        name: "Frame",
        text: "ICP, problem, wedge. Competitive cut and messaging constraints locked with founders.",
    },
    {
        week: "Week 2",
        name: "Shape",
        text: "Brand spine, product story, and MVP UX map. Design tokens that survive successive hires.",
    },
    {
        week: "Week 3",
        name: "Build slice",
        text: "Launch site + key screens + deck. Only what ships this cycle—everything else parked.",
    },
    {
        week: "Week 4",
        name: "Launch ops",
        text: "QA, analytics events, press kit, sales enablement. Go / hold decision with owners named.",
    },
];

export default function Section3() {
    return (
        <section className="sd3-runway pt-40 pb-100" id="sd3-runway" data-sd3-runway="">
            <div className="container">
                <div className="sd3-runway__layout">
                    <div className="sd3-runway__sticky">
                        <p className="sd3-label mb-15 at_fade_anim" data-fade-from="bottom">
                            [02] Runway
                        </p>
                        <h2 className="sd3-runway__title reveal-text mb-20">
                            <RevealText>Four gates every launch crosses</RevealText>
                        </h2>
                        <p
                            className="sd3-runway__text at_fade_anim"
                            data-fade-from="bottom"
                            data-delay=".1"
                        >
                            No mystery phases. Each gate unlocks the next—skipping them is how runway
                            burns.
                        </p>
                        <div className="sd3-runway__meter" data-sd3-meter="">
                            <span data-sd3-meter-label="">Gate 01</span>
                            <div className="sd3-runway__rail">
                                <i data-sd3-meter-fill="" />
                            </div>
                        </div>
                    </div>
                    <div className="sd3-runway__steps">
                        {STEPS.map((step) => (
                            <article className="sd3-step" data-sd3-step="" key={step.name}>
                                <span className="sd3-step__week">{step.week}</span>
                                <h3 className="sd3-step__name">{step.name}</h3>
                                <p>{step.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
