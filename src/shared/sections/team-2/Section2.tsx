import { Link } from "react-router-dom";
// Team 2 Section 2 - Roster list + sticky portrait preview

const PREVIEW_ARROW_SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
            d="M7.85986 2.43872L1.7123 8.58629L0.702148 7.57614L6.84971 1.42857H1.43131V0H9.28843V7.85714H7.85986V2.43872Z"
            fill="currentColor"
        />
    </svg>
);

const PERSON_ARROW_SVG = (
    <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
        <path
            d="M7.86 2.44L1.71 8.59L0.7 7.58l6.15-6.15H1.43V0h7.86v7.86H7.86V2.44z"
            fill="currentColor"
        />
    </svg>
);

const PEOPLE = [
    {
        index: "01",
        img: "/assets/imgs/pages/img-17.webp",
        name: "Darrell Steward",
        role: "UI/UX Designer",
    },
    {
        index: "02",
        img: "/assets/imgs/pages/img-18.webp",
        name: "Amelia Courtney",
        role: "Project Manager",
    },
    {
        index: "03",
        img: "/assets/imgs/pages/img-19.webp",
        name: "Esther Howard",
        role: "Software Developer",
    },
    {
        index: "04",
        img: "/assets/imgs/pages/img-20.webp",
        name: "Jacob Jones",
        role: "Marketing Lead",
    },
];

export default function Section2() {
    return (
        <section
            className="team2-roster pt-40 pb-100"
            id="team2-roster"
            data-team2-roster=""
            aria-label="Team roster"
        >
            <div className="container">
                <div className="team2-roster__layout">
                    <div className="team2-roster__preview" data-team2-preview="">
                        <div className="team-card changeless">
                            <div className="team-card-image">
                                <div className="anim-zoomin">
                                    <img
                                        src="/assets/imgs/pages/img-17.webp"
                                        alt="Darrell Steward"
                                        className="img-cover"
                                        data-team2-preview-img=""
                                        width={408}
                                        height={547} loading="lazy" />
                                </div>
                            </div>
                            <Link
                                to="/team-details"
                                className="team-card-icon"
                                aria-label="View profile"
                            >
                                {PREVIEW_ARROW_SVG}
                            </Link>
                            <div className="team-card-content">
                                <Link to="/team-details" className="team-card-name">
                                    <h2 className="h6 fz-font-2xl" data-team2-preview-name="">
                                        Darrell Steward
                                    </h2>
                                </Link>
                                <p
                                    className="team-card-position fz-font-sm m-0 common-white"
                                    data-team2-preview-role=""
                                >
                                    UI/UX Designer
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="team2-roster__list-wrap">
                        <div className="team2-roster__head">
                            <p className="team2-label mb-0">Roster</p>
                            <span className="team2-roster__hint">Hover a name</span>
                        </div>

                        <ul className="team2-roster__list" data-team2-list="">
                            {PEOPLE.map((person, i) => (
                                <li
                                    key={person.index}
                                    className={`team2-person${i === 0 ? " is-active" : ""}`}
                                    data-team2-person=""
                                    data-img={person.img}
                                    data-name={person.name}
                                    data-role={person.role}
                                >
                                    <Link className="team2-person__link" to="/team-details">
                                        <span className="team2-person__index">{person.index}</span>
                                        <span className="team2-person__name">{person.name}</span>
                                        <span className="team2-person__role">{person.role}</span>
                                        <span className="team2-person__arrow" aria-hidden="true">
                                            {PERSON_ARROW_SVG}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
