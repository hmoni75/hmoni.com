import RevealText from "@/shared/effects/RevealText";

// Services Details 2 Section 3 - Capability modules stacked by the global
// .scroll-section card stack (components/effects/ScrollSectionEffects.tsx)

const MODULES = [
    {
        index: "01",
        name: "Knowledge & retrieval",
        desc: "Chunking strategies, hybrid search, citation-safe RAG so answers stay grounded in your corpus.",
        tags: ["Vector + keyword", "Corpus hygiene", "Citation UI"],
        img: {
            src: "/assets/imgs/pages/img-170.webp",
            alt: "Knowledge retrieval module",
            width: 845,
            height: 641,
        },
    },
    {
        index: "02",
        name: "Agents & orchestration",
        desc: "Tool use, multi-step plans, and fail-soft loops that behave under load—not demos that break after hop three.",
        tags: ["Tool contracts", "State machines", "Human-in-loop"],
        img: {
            src: "/assets/imgs/pages/img-175.webp",
            alt: "Agent orchestration module",
            width: 822,
            height: 674,
        },
    },
    {
        index: "03",
        name: "Evals & quality gates",
        desc: "Offline + online evaluation harnesses, golden sets, and promotion criteria wiring to CI and release trains.",
        tags: ["Golden sets", "Regression", "Scorecards"],
        img: {
            src: "/assets/imgs/pages/img-172.webp",
            alt: "Evaluation module",
            width: 822,
            height: 674,
        },
    },
    {
        index: "04",
        name: "Platform & guardrails",
        desc: "Routing, cost controls, red-team patterns, observability—everything between a prototype and an SLA.",
        tags: ["Model hub", "Policy", "Trace + logs"],
        img: {
            src: "/assets/imgs/pages/img-13.webp",
            alt: "Platform guardrails module",
            width: 845,
            height: 641,
        },
    },
];

export default function Section3() {
    return (
        <section
            className="sd2-modules pt-40 pb-40"
            aria-label="Capability modules"
            data-sd2-modules=""
        >
            <div className="container">
                <div className="sd2-modules__head">
                    <div>
                        <p
                            className="sd2-kicker sd2-kicker--dark mb-15 at_fade_anim"
                            data-fade-from="bottom"
                        >
                            <span className="sd2-kicker__num">[03]</span>
                            Modules
                        </p>
                        <h2 className="sd2-modules__title reveal-text mb-0">
                            <RevealText>Four layers we assemble</RevealText>
                        </h2>
                    </div>
                    <p
                        className="sd2-modules__hint at_fade_anim"
                        data-fade-from="bottom"
                        data-delay=".1"
                    >
                        Pick a lane or stack the full vertical—from retrieval to runtime governance.
                    </p>
                </div>
            </div>

            <div className="scroll-section vertical-section position-relative sd2-modules__stack">
                <div className="wrapper">
                    {MODULES.map((module) => (
                        <div key={module.index} className="item">
                            <div className="container">
                                <article className="sd2-mod" data-sd2-mod="">
                                    <div className="sd2-mod__index">{module.index}</div>
                                    <div className="sd2-mod__body">
                                        <h3 className="sd2-mod__name">{module.name}</h3>
                                        <p className="sd2-mod__desc">{module.desc}</p>
                                        <ul className="sd2-mod__tags">
                                            {module.tags.map((tag) => (
                                                <li key={tag}>{tag}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="sd2-mod__media">
                                        <img
                                            className="anim-zoomin"
                                            src={module.img.src}
                                            alt={module.img.alt}
                                            width={module.img.width}
                                            height={module.img.height}
                                            loading="lazy"
                                        />
                                    </div>
                                </article>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
