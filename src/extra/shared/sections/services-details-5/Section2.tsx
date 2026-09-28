import { Fragment } from "react";
import RevealText from "@/shared/effects/RevealText";

// Services Details 5 Section 2 - Channel marquee + growth map rows

const STAR_SVG = (
    <svg width="14" height="14" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M20 0C20.3015 10.9184 29.0816 19.6985 40 20C29.0816 20.3015 20.3015 29.0816 20 40C19.6985 29.0816 10.9184 20.3015 0 20C10.9184 19.6985 19.6985 10.9184 20 0Z"
            fill="currentColor"
        />
    </svg>
);

const CHANNELS = [
    "Paid social",
    "Search",
    "Landing systems",
    "Email",
    "Content",
    "SEO",
    "Creative ops",
    "Analytics",
];

// The track renders the sequence twice so the marquee tween can loop on scrollWidth / 2.
const MARQUEE_SEQUENCES = [0, 1];

type MapRow = {
    index: string;
    name: string;
    text: string;
    tags: string[];
    img: string;
};

const MAP_ROWS: MapRow[] = [
    {
        index: "01",
        name: "Demand creation",
        text: "Brand films, social systems, campaigns that make strangers care first.",
        tags: ["Social", "Film", "Campaign"],
        img: "/assets/imgs/pages/img-100.webp",
    },
    {
        index: "02",
        name: "Conversion paths",
        text: "Landing architecture and CRO tests tied to real funnel stages.",
        tags: ["Landing", "CRO", "Offer"],
        img: "/assets/imgs/pages/img-101.webp",
    },
    {
        index: "03",
        name: "Retention loops",
        text: "Email, CRM, and content that keep customers after the first win.",
        tags: ["CRM", "Email", "Content"],
        img: "/assets/imgs/pages/img-102.webp",
    },
    {
        index: "04",
        name: "Measurement",
        text: "One scoreboard for creative and media—events, dashboards, weekly rituals.",
        tags: ["Events", "Dashboards", "Rituals"],
        img: "/assets/imgs/pages/img-103.webp",
    },
];

export default function Section2() {
    return (
        <section className="sd5-channels pt-80 pb-100" data-sd5-channels="">
            <div className="sd5-marquee" data-sd5-marquee="" aria-hidden="true">
                <div className="sd5-marquee__track" data-sd5-marquee-track="">
                    {MARQUEE_SEQUENCES.map((sequence) =>
                        CHANNELS.map((channel) => (
                            <Fragment key={`${sequence}-${channel}`}>
                                <span>{channel}</span>
                                <span className="sd5-marquee__icon" aria-hidden="true">
                                    {STAR_SVG}
                                </span>
                            </Fragment>
                        ))
                    )}
                </div>
            </div>
            <div className="container pt-80">
                <div className="sd5-map" data-sd5-matrix="">
                    <div className="sd5-map__intro">
                        <p className="sd5-label mb-15 at_fade_anim" data-fade-from="bottom">
                            [01] Channels
                        </p>
                        <h2 className="sd5-map__title reveal-text mb-15">
                            <RevealText>One growth system, many surfaces</RevealText>
                        </h2>
                        <p className="sd5-map__lead at_fade_anim" data-fade-from="bottom" data-delay=".08">
                            Creative and media share the same spine—not random ads stitched after the fact.
                        </p>
                    </div>

                    <div className="sd5-map__rail" role="list">
                        {MAP_ROWS.map((row) => (
                            <article
                                className="sd5-map__row"
                                data-sd5-cell=""
                                role="listitem"
                                key={row.index}
                            >
                                <span className="sd5-map__index">{row.index}</span>
                                <div className="sd5-map__body">
                                    <h3 className="sd5-map__name">{row.name}</h3>
                                    <p className="sd5-map__text">{row.text}</p>
                                    <ul className="sd5-map__tags">
                                        {row.tags.map((tag) => (
                                            <li key={tag}>{tag}</li>
                                        ))}
                                    </ul>
                                </div>
                                <figure className="sd5-map__media">
                                    <img
                                        src={row.img}
                                        alt=""
                                        loading="lazy"
                                    />
                                </figure>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
