import RevealText from "@/shared/effects/RevealText";

// Services details 4 Section 4 - Deliverables list + media split with counter

const DELIVERABLES = [
    {
        title: "Research brief",
        text: "Findings, personas, job statements, top friction points.",
    },
    {
        title: "Flow library",
        text: "Annotated user journeys for primary and recovery paths.",
    },
    {
        title: "UI kit",
        text: "Tokens, components, variants, content guidelines.",
    },
    {
        title: "Prototype",
        text: "High-fi slices for demos, tests, and stakeholder buy-in.",
    },
    {
        title: "Handoff pack",
        text: "Specs, redlines where needed, and QA checklists.",
    },
];

export default function Section4() {
    return (
        <section className="sd4-deliver pt-120 pb-100" data-sd4-deliver>
            <div className="container">
                <div className="sd4-deliver__grid">
                    <div className="sd4-deliver__media" data-sd4-deliver-media>
                        <img
                            src="/assets/imgs/pages/img-113.webp"
                            alt="Design system board" loading="lazy" />
                        <div className="sd4-deliver__float" data-sd4-float>
                            <span>Coverage</span>
                            <strong data-sd4-count data-to="86">
                                0
                            </strong>
                            <em>% of core screens in system</em>
                        </div>
                    </div>
                    <div className="sd4-deliver__copy">
                        <p className="sd4-label mb-15 at_fade_anim" data-fade-from="bottom">
                            [03] Package
                        </p>
                        <h2 className="sd4-deliver__title reveal-text mb-20">
                            <RevealText>What lands in Figma &amp; Git</RevealText>
                        </h2>
                        <ul className="sd4-deliver__list">
                            {DELIVERABLES.map((item) => (
                                <li data-sd4-item key={item.title}>
                                    <strong>{item.title}</strong>
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
