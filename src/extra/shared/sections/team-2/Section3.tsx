import RevealText from "@/shared/effects/RevealText";

// Team 2 Section 3 - Disciplines grid

const DISCIPLINES = [
    {
        num: "01",
        title: "Design",
        text: "UI systems, brand, motion—tight feedback with product.",
    },
    {
        num: "02",
        title: "Engineering",
        text: "Front-end, CMS, and handoff that survives real sprints.",
    },
    {
        num: "03",
        title: "Growth",
        text: "Content, campaigns, and measurement in the same loop.",
    },
    {
        num: "04",
        title: "Ops",
        text: "Production, PMs, and rituals that keep delivery sane.",
    },
];

export default function Section3() {
    return (
        <section className="team2-disc pt-40 pb-100" data-team2-disc="">
            <div className="container">
                <div className="team2-disc__head">
                    <p className="team2-label mb-15 at_fade_anim" data-fade-from="bottom">
                        How we work
                    </p>
                    <h2 className="team2-disc__title reveal-text mb-0">
                        <RevealText>Built as small pods, not endless chains of meetings</RevealText>
                    </h2>
                </div>
                <div className="team2-disc__grid">
                    {DISCIPLINES.map((item) => (
                        <article
                            key={item.num}
                            className="team2-disc__card"
                            data-team2-disc-card=""
                        >
                            <span className="team2-disc__num">{item.num}</span>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
