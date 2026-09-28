import RevealText from "@/shared/effects/RevealText";

// Services Details 2 Section 2 - Signal overview with scroll counters and brief rows

const STATS = [
    { to: "94", suffix: "%", label: "Eval pass rate before prod gate" },
    { to: "3", suffix: "×", label: "Faster handoff to eng with system specs" },
    { to: "12", suffix: "w", label: "Median to production pilot" },
];

const BRIEF_ROWS = [
    {
        key: "Problem space",
        value: "Unreliable copilots, opaque model choices, and missing evals that block scale.",
    },
    {
        key: "What we ship",
        value: "Reference architectures, production paths, monitoring, and team playbooks.",
    },
    {
        key: "Who it’s for",
        value: "Product, data, and platform leads inside AI-native or modernizing companies.",
    },
];

export default function Section2() {
    return (
        <section
            className="sd2-overview pt-100 pb-100"
            aria-label="Why this service"
            data-sd2-overview=""
        >
            <div className="container">
                <div className="sd2-overview__grid">
                    <div className="sd2-overview__sticky">
                        <p
                            className="sd2-kicker sd2-kicker--dark mb-15 at_fade_anim"
                            data-fade-from="bottom"
                        >
                            <span className="sd2-kicker__num">[02]</span>
                            Signal
                        </p>
                        <h2 className="sd2-overview__title reveal-text mb-20">
                            <RevealText>Built for teams that ship models—not decks</RevealText>
                        </h2>
                        <p
                            className="sd2-overview__text at_fade_anim"
                            data-fade-from="bottom"
                            data-delay=".1"
                        >
                            Most “AI strategy” dies in slides. We wire intelligence into product
                            surfaces, data layers, and ops rituals so impact is measurable every
                            release cycle.
                        </p>
                    </div>

                    <div className="sd2-overview__body">
                        <div className="sd2-stats" data-sd2-stats="">
                            {STATS.map((stat) => (
                                <article key={stat.label} className="sd2-stat" data-sd2-stat="">
                                    <span className="sd2-stat__value">
                                        <span data-sd2-count="" data-to={stat.to}>
                                            0
                                        </span>
                                        <span className="sd2-stat__suffix">{stat.suffix}</span>
                                    </span>
                                    <span className="sd2-stat__label">{stat.label}</span>
                                </article>
                            ))}
                        </div>

                        <div className="sd2-brief" data-sd2-brief="">
                            {BRIEF_ROWS.map((row) => (
                                <div key={row.key} className="sd2-brief__row" data-sd2-brief-row="">
                                    <span className="sd2-brief__key">{row.key}</span>
                                    <p className="sd2-brief__val">{row.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
