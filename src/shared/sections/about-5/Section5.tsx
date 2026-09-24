import RevealText from "@/shared/effects/RevealText";

// About 5 Section 5 - Studio locations

const NODES = [
    {
        city: "Lisbon",
        zone: "WET · HQ studio",
        lines: ["Rua da Madalena 128", "Strategy, brand, leadership"],
    },
    {
        city: "New York",
        zone: "ET · East hub",
        lines: ["Brooklyn Navy Yard · Suite 204", "Product & campaign craft"],
    },
    {
        city: "Singapore",
        zone: "SGT · APAC desk",
        lines: ["Telok Ayer · Level 6", "Client partners & research"],
    },
];

export default function Section5() {
    return (
        <section className="about-5-nodes pt-100 pb-100" aria-label="Where we work">
            <div className="container">
                <div className="about-5-nodes__head">
                    <p className="about-5-label">
                        <span className="about-5-label__num">(04)</span>
                        Nodes
                    </p>
                    <h2 className="about-5-nodes__title reveal-text">
                        <RevealText>Three cities. One operating system.</RevealText>
                    </h2>
                </div>
                <div className="about-5-nodes__grid">
                    {NODES.map((node) => (
                        <article key={node.city} className="about-5-node">
                            <p className="about-5-node__city">{node.city}</p>
                            <p className="about-5-node__zone">{node.zone}</p>
                            {node.lines.map((line) => (
                                <p key={line} className="about-5-node__line">
                                    {line}
                                </p>
                            ))}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
