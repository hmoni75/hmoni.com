import { Link } from "react-router-dom";
import RevealText from "@/shared/effects/RevealText";

// About 4 Section 4 - Craft capabilities

const SKILL_COLUMNS = [
    [
        "Brand strategy & positioning",
        "Visual identity systems",
        "Art direction & campaigns",
        "Motion language & reels",
        "Naming & verbal systems",
    ],
    [
        "Product & UI design",
        "Design systems & tokens",
        "Web design & builds",
        "Conversion landers",
        "Creative ops for founders",
    ],
];

export default function Section4() {
    return (
        <section className="about-4-craft pt-100 pb-100" id="about-4-craft" aria-label="What we craft">
            <div className="container">
                <div className="about-4-craft__grid">
                    <div className="about-4-craft__intro">
                        <p className="about-4-kicker">
                            <span className="about-4-kicker__num">(04)</span>
                            Craft
                        </p>
                        <h2 className="about-4-craft__title reveal-text">
                            <RevealText>Disciplines under one roof.</RevealText>
                        </h2>
                        <p className="about-4-craft__lead">
                            Small squads. Full-stack creative output. One accountable partner for brand,
                            product, and go-to-market.
                        </p>
                        <Link className="about-4-link" to="/services-1">
                            Explore services
                        </Link>
                    </div>
                    <div className="about-4-craft__cols">
                        {SKILL_COLUMNS.map((column, index) => (
                            <ul key={index} className="about-4-skills">
                                {column.map((skill) => (
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
