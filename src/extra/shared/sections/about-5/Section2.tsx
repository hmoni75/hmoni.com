import RevealText from "@/shared/effects/RevealText";

// About 5 Section 2 - Horizontal year chapters

const CHAPTERS = [
    {
        year: "2016–18",
        name: "Foundations",
        text: "Two strategists and a designer in a borrowed loft. Early clients taught us that beautiful without baseline metrics does not last.",
    },
    {
        year: "2019–21",
        name: "Product depth",
        text: "We expanded into product UI and design systems—so brands could ship the same language across marketing and app.",
    },
    {
        year: "2022–24",
        name: "Global mesh",
        text: "Hubs in Lisbon, remote leads in NYC & Singapore. Still small enough that partners know every specialist by name.",
    },
    {
        year: "Now",
        name: "Always on craft",
        text: "Retainers, launches, and R&D sprints—whatever keeps brands coherent while they move fast.",
        isNow: true,
    },
];

export default function Section2() {
    return (
        <section className="about-5-chapters pt-120 pb-100" aria-label="Studio timeline">
            <div className="container">
                <div className="about-5-chapters__head">
                    <p className="about-5-label">
                        <span className="about-5-label__num">(02)</span>
                        Chapters
                    </p>
                    <h2 className="about-5-chapters__title reveal-text">
                        <RevealText>A short history of useful work.</RevealText>
                    </h2>
                </div>
                <div className="about-5-chapters__track">
                    {CHAPTERS.map((chapter) => (
                        <article
                            key={chapter.name}
                            className={`about-5-chapter${chapter.isNow ? " about-5-chapter--now" : ""}`}
                        >
                            <p className="about-5-chapter__year">{chapter.year}</p>
                            <h3 className="about-5-chapter__name">{chapter.name}</h3>
                            <p className="about-5-chapter__text">{chapter.text}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
