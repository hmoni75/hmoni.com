import { Link } from "react-router-dom";
import RevealText from "@/shared/effects/RevealText";

// About 5 Section 4 - People as editorial rows

const LINK_ARROW_SVG = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
    >
        <path
            d="M2 12L12 2M12 2H5M12 2V9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const PEOPLE = [
    {
        name: "Leo Hart",
        role: "Founding Partner · Strategy",
        bio: "Defines problem frames and growth bets. Twelve years advising product-led companies through rebrands and category shifts.",
        image: "/assets/imgs/pages/home-7/team-1-darrell.webp",
    },
    {
        name: "Nora Ellis",
        role: "Design Director · Systems",
        bio: "Owns identity libraries and multi-surface systems. Obsessed with tokens that survive handoff to engineering.",
        image: "/assets/imgs/pages/home-7/team-3-esther.webp",
    },
    {
        name: "Ibrahim Okeke",
        role: "Product Lead · UX",
        bio: "Bridges research and UI. Turns messy roadmaps into flows teams can build without redesign thrash.",
        image: "/assets/imgs/pages/home-11/member-2.webp",
    },
    {
        name: "Sofia Lindqvist",
        role: "Motion Lead · Content",
        bio: "Shapes motion systems and campaign films. Keeps tempo consistent from logo sting to product micro-interactions.",
        image: "/assets/imgs/pages/home-11/member-1.webp",
    },
];

export default function Section4() {
    return (
        <section className="about-5-people pt-40 pb-100 bg-neutral-50" aria-label="Leadership">
            <div className="container">
                <div className="about-5-people__head">
                    <div>
                        <p className="about-5-label">
                            <span className="about-5-label__num">(03)</span>
                            People
                        </p>
                        <h2 className="about-5-people__title reveal-text">
                            <RevealText>Leads you will actually work with.</RevealText>
                        </h2>
                    </div>
                    <p className="about-5-people__note mb-0">
                        No account layers. Strategy and craft stay in the same room as the client.
                    </p>
                </div>

                <div className="about-5-people__list">
                    {PEOPLE.map((person) => (
                        <article key={person.name} className="about-5-person">
                            <div className="about-5-person__media">
                                <img
                                    src={person.image}
                                    alt={person.name}
                                    width={160}
                                    height={160}
                                    loading="lazy"
                                />
                            </div>
                            <div className="about-5-person__meta">
                                <h3 className="about-5-person__name">{person.name}</h3>
                                <p className="about-5-person__role">{person.role}</p>
                            </div>
                            <p className="about-5-person__bio">{person.bio}</p>
                            <Link
                                className="about-5-person__link"
                                to="/team-details"
                                aria-label={`Profile of ${person.name}`}
                            >
                                {LINK_ARROW_SVG}
                            </Link>
                        </article>
                    ))}
                </div>

                <div className="about-5-people__foot">
                    <Link className="about-5-text-link" to="/team">
                        Meet the full roster
                    </Link>
                </div>
            </div>
        </section>
    );
}
