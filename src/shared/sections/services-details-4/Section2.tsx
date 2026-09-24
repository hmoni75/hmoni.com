import RevealText from "@/shared/effects/RevealText";

// Services details 4 Section 2 - Practice pillars

const PILLARS = [
    {
        index: "01",
        title: "Discover without theater",
        text: "Interviews, task analysis, and analytics that change the backlog—not slideshows that die on slide 40.",
    },
    {
        index: "02",
        title: "Structure first",
        text: "IA, flows, and empty states designed before polish. Components only after the model is stable.",
    },
    {
        index: "03",
        title: "Prototype to decide",
        text: "High-fidelity slices for the risky moments. Usability tests aimed at go / no-go choices.",
    },
    {
        index: "04",
        title: "System handoff",
        text: "Tokens, specs, and Figma that engineers actually open. Adoption is part of the definition of done.",
    },
];

export default function Section2() {
    return (
        <section className="sd4-practice pt-80 pb-100" data-sd4-practice>
            <div className="container">
                <div className="sd4-practice__head">
                    <p className="sd4-label mb-15 at_fade_anim" data-fade-from="bottom">
                        [01] Practice
                    </p>
                    <h2 className="sd4-practice__title reveal-text mb-0">
                        <RevealText>How we shape product UI</RevealText>
                    </h2>
                </div>
                <div className="sd4-practice__grid">
                    {PILLARS.map((pillar) => (
                        <article className="sd4-pillar" data-sd4-pillar key={pillar.index}>
                            <span className="sd4-pillar__i">{pillar.index}</span>
                            <h3>{pillar.title}</h3>
                            <p>{pillar.text}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
