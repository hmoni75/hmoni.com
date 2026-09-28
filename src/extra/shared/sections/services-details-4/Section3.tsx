// Services details 4 Section 3 - Pinned horizontal design flow

const FLOW_NODES = [
    {
        index: "01",
        title: "Frame",
        text: "Jobs, constraints, and success metrics with product + eng in the same room.",
    },
    {
        index: "02",
        title: "Map",
        text: "User flows, edge cases, and content models before visual design burns time.",
    },
    {
        index: "03",
        title: "Explore",
        text: "Concept directions, low-fi tests, and a single principle set we commit to.",
    },
    {
        index: "04",
        title: "System",
        text: "UI kit, patterns, and states. Dark/light readiness when the product needs it.",
    },
    {
        index: "05",
        title: "Validate",
        text: "Usability sessions and crit with eng—shipping confidence, not opinions only.",
    },
    {
        index: "06",
        title: "Handoff",
        text: "Specs, tokens, prototypes, and a hypercare loop after first release.",
    },
];

export default function Section3() {
    return (
        <section className="sd4-flow changeless" id="sd4-flow" data-sd4-flow>
            <div className="sd4-flow__pin">
                <div className="container">
                    <p className="sd4-label sd4-label--light mb-15">[02] Flow</p>
                    <h2 className="sd4-flow__title text-scale-anim mb-40">
                        From framing to shipped components
                    </h2>
                </div>
                <div className="sd4-flow__wrap">
                    <div className="sd4-flow__progress">
                        <i data-sd4-bar />
                    </div>
                    <div className="sd4-flow__track" data-sd4-track>
                        {FLOW_NODES.map((node) => (
                            <article className="sd4-node" key={node.index}>
                                <span>{node.index}</span>
                                <h3>{node.title}</h3>
                                <p>{node.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
