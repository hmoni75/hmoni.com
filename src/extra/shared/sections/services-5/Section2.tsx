import { Link } from "react-router-dom";
import RevealText from "@/shared/effects/RevealText";

// Services 5 Section 2 - Capability map. The `.scroll-section > .wrapper > .item`
// structure is picked up by the global ScrollSectionEffects card stacking.

type Capability = {
    index: string;
    name: string;
    desc: string;
    tags: string[];
    img: { src: string; alt: string; width: number; height: number };
    span: string;
};

const CAPABILITIES: Capability[] = [
    {
        index: "01",
        name: "Brand systems",
        desc: "Positioning, visual language, and guidelines teams can extend without babysitting.",
        tags: ["Identity", "Messaging", "Guidelines"],
        img: {
            src: "/assets/imgs/pages/home-15/sec-4-project-1.webp",
            alt: "Brand systems work",
            width: 1800,
            height: 1013,
        },
        span: "6–10 weeks",
    },
    {
        index: "02",
        name: "Product design",
        desc: "Flows, components, and prototypes engineering can ship without redesign thrash.",
        tags: ["UX / UI", "Systems", "Handoff"],
        img: {
            src: "/assets/imgs/pages/home-15/sec-4-project-2.webp",
            alt: "Product design work",
            width: 1800,
            height: 1013,
        },
        span: "4–12 weeks",
    },
    {
        index: "03",
        name: "Web experiences",
        desc: "Marketing sites and microsites with performance, storytelling, and CMS structure in mind.",
        tags: ["Sites", "Motion", "CMS"],
        img: {
            src: "/assets/imgs/pages/home-11/img-8.webp",
            alt: "Web experience work",
            width: 2400,
            height: 1600,
        },
        span: "5–14 weeks",
    },
    {
        index: "04",
        name: "Content systems",
        desc: "Editorial frameworks, campaign kits, and channels that stay coherent over a season.",
        tags: ["Campaigns", "Social", "Stories"],
        img: {
            src: "/assets/imgs/pages/home-15/sec-4-project-1.webp",
            alt: "Content systems work",
            width: 1800,
            height: 1013,
        },
        span: "Ongoing · sprints",
    },
    {
        index: "05",
        name: "Growth design",
        desc: "Landing tests, conversion paths, and experiment design tied to real funnel metrics.",
        tags: ["CRO", "Landing", "Analytics"],
        img: {
            src: "/assets/imgs/pages/home-15/sec-4-project-4.webp",
            alt: "Growth design work",
            width: 1800,
            height: 1013,
        },
        span: "2–6 weeks",
    },
    {
        index: "06",
        name: "Design ops",
        desc: "Libraries, file hygiene, and rituals so multi-team crews ship without chaos.",
        tags: ["Libraries", "Process", "Training"],
        img: {
            src: "/assets/imgs/pages/home-15/sec-4-project-3.webp",
            alt: "Design ops work",
            width: 1800,
            height: 1013,
        },
        span: "3–8 weeks",
    },
];

export default function Section2() {
    return (
        <section className="svc5-map pt-40 pb-100" aria-label="Capability map" data-svc5-map="">
            <div className="container">
                <div className="svc5-map__head at_fade_anim" data-fade-from="bottom" data-delay=".05">
                    <div>
                        <p className="svc5-kicker svc5-kicker--dark mb-15">
                            <span className="svc5-kicker__num">(01)</span>
                            <span className="svc5-kicker__text">Map</span>
                        </p>
                        <h2 className="svc5-map__title reveal-text mb-0">
                            <RevealText>Six ways we move the work</RevealText>
                        </h2>
                    </div>
                    <p className="svc5-map__hint mb-0">
                        Each lane can stand alone or stack into a continuous engagement.
                    </p>
                </div>
            </div>

            <div className="scroll-section vertical-section position-relative svc5-map__stack">
                <div className="wrapper">
                    {CAPABILITIES.map((cap) => (
                        <div className="item svc5-item" key={cap.index}>
                            <div className="container">
                                <article className="svc5-cap" data-svc5-cap="">
                                    <div className="svc5-cap__index">{cap.index}</div>
                                    <div className="svc5-cap__body">
                                        <div className="svc5-cap__copy">
                                            <h3 className="svc5-cap__name">{cap.name}</h3>
                                            <p className="svc5-cap__desc">{cap.desc}</p>
                                            <ul className="svc5-cap__tags">
                                                {cap.tags.map((tag) => (
                                                    <li key={tag}>{tag}</li>
                                                ))}
                                            </ul>
                                            <Link className="svc5-cap__link" to="/services-details">
                                                Details
                                            </Link>
                                        </div>
                                        <div className="svc5-cap__media">
                                            <img
                                                src={cap.img.src}
                                                alt={cap.img.alt}
                                                width={cap.img.width}
                                                height={cap.img.height}
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                    <div className="svc5-cap__meta">
                                        <span>Typical span</span>
                                        <strong>{cap.span}</strong>
                                    </div>
                                </article>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
