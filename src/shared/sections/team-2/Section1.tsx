import { Link } from "react-router-dom";
import RevealText from "@/shared/effects/RevealText";

// Team 2 Section 1 - Editorial roster intro (hero)

const ARROW_SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
        <path
            d="M0.0001297 8.99993L0 3.00407e-05L2 0L2.0001 6.99993L12.1719 7.00003L8.22224 3.05027L9.63644 1.63606L16.0003 8.00003L9.63644 14.364L8.22224 12.9497L12.1719 9.00003L0.0001297 8.99993Z"
            fill="currentColor"
        />
    </svg>
);

const META = [
    { label: "Studios", value: "NY · Remote" },
    { label: "Disciplines", value: "Design · Code · Growth" },
    { label: "Focus", value: "Product & brand" },
];

export default function Section1() {
    return (
        <section className="team2-hero pt-150 pb-60 overflow-hidden" data-team2-hero="">
            <div className="container">
                <div className="team2-hero__top">
                    <nav
                        className="team2-crumb at_fade_anim"
                        data-fade-from="bottom"
                        aria-label="Breadcrumb"
                    >
                        <Link to="/">Home</Link>
                        <span>/</span>
                        <span>Team</span>
                    </nav>
                    <span
                        className="team2-hero__count at_fade_anim"
                        data-fade-from="bottom"
                        data-delay=".08"
                    >
                        <strong data-team2-count="" data-to="24">
                            0
                        </strong>{" "}
                        people across craft &amp; ops
                    </span>
                </div>

                <div className="team2-hero__main">
                    <h1 className="section-title fw-500 fz-ds-1 lh-1 reveal-text">
                        <RevealText>The people behind the work</RevealText>
                    </h1>
                    <div className="team2-hero__aside">
                        <p
                            className="fz-font-xl mb-4 at_fade_anim"
                            data-fade-from="bottom"
                            data-delay=".18"
                        >
                            Designers, engineers, and producers who ship under pressure—and still
                            care about the craft.
                        </p>
                        <div
                            className="at-btn-group at_fade_anim"
                            data-delay=".26"
                            data-fade-from="bottom"
                            data-ease="bounce"
                        >
                            <a
                                className="at-btn-circle"
                                href="#team2-roster"
                                aria-label="View team roster"
                            >
                                {ARROW_SVG}
                            </a>
                            <a className="at-btn z-index-1" href="#team2-roster">
                                View roster
                            </a>
                            <a
                                className="at-btn-circle"
                                href="#team2-roster"
                                aria-label="View team roster"
                            >
                                {ARROW_SVG}
                            </a>
                        </div>
                    </div>
                </div>

                <ul className="team2-hero__meta" data-team2-meta="">
                    {META.map((item) => (
                        <li key={item.label}>
                            <span>{item.label}</span>
                            <strong>{item.value}</strong>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
