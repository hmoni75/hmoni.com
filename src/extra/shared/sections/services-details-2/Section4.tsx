// Services Details 2 Section 4 - Horizontal pipeline track (GSAP pin + scrub)

const PHASES = [
    {
        phase: "Phase 01",
        name: "Frame",
        text: "Map use cases, data rights, risk surface, and success metrics with product + legal in the room.",
        time: "Week 1–2",
    },
    {
        phase: "Phase 02",
        name: "Prototype",
        text: "Thin slices, synthetic evals, early UX for trust signals—prove signal before platform spend.",
        time: "Week 3–5",
    },
    {
        phase: "Phase 03",
        name: "Harden",
        text: "CI evals, tracing, fallbacks, cost budgets, and red-team passes wired to deployment gates.",
        time: "Week 6–9",
    },
    {
        phase: "Phase 04",
        name: "Launch",
        text: "Canary traffic, runbooks, on-call paths, and handover kits engineering owns next.",
        time: "Week 10–12",
    },
    {
        phase: "Phase 05",
        name: "Scale",
        text: "Model routing, multi-region, fine-tune options, and product experiments against live KPIs.",
        time: "Week 12+",
    },
];

export default function Section4() {
    return (
        <section
            className="sd2-pipeline"
            id="sd2-pipeline"
            aria-label="Delivery pipeline"
            data-sd2-pipeline=""
        >
            <div className="sd2-pipeline__pin">
                <div className="container">
                    <div className="sd2-pipeline__head">
                        <p className="sd2-kicker mb-15">
                            <span className="sd2-kicker__num">[04]</span>
                            Pipeline
                        </p>
                        <h2 className="sd2-pipeline__title text-scale-anim mb-0">
                            How intelligence moves from brief to runtime
                        </h2>
                    </div>
                </div>

                <div className="sd2-pipeline__track-wrap">
                    <div className="sd2-pipeline__progress" data-sd2-pipe-progress="">
                        <span className="sd2-pipeline__progress-bar" data-sd2-pipe-bar="" />
                    </div>
                    <div className="sd2-pipeline__track" data-sd2-pipe-track="">
                        {PHASES.map((step) => (
                            <article key={step.phase} className="sd2-pipe" data-sd2-pipe="">
                                <span className="sd2-pipe__phase">{step.phase}</span>
                                <h3 className="sd2-pipe__name">{step.name}</h3>
                                <p className="sd2-pipe__text">{step.text}</p>
                                <span className="sd2-pipe__time">{step.time}</span>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
