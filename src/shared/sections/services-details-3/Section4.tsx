import RevealText from "@/shared/effects/RevealText";

// Services Details 3 Section 4 - Offer tracks; the .scroll-section stacking is driven
// globally by components/effects/ScrollSectionEffects.tsx (main.js #51 in the template).

const TRACKS = [
    {
        label: "Track A",
        index: "01 / 03",
        name: "Product story & MVP map",
        text: "Define the wedge, journeys, and interface cuts engineering can ship without redesign thrash.",
        items: ["Journey maps", "Priority flows", "Clickable MVP"],
        image: "/assets/imgs/pages/img-107.webp",
        alt: "Product story work",
    },
    {
        label: "Track B",
        index: "02 / 03",
        name: "Brand spine for fundraises",
        text: "Visual system and verbal toolkit tough enough for deck, product UI, and launch campaign.",
        items: ["Identity system", "Tone + claims", "Asset kit"],
        image: "/assets/imgs/pages/img-108.webp",
        alt: "Brand spine work",
    },
    {
        label: "Track C",
        index: "03 / 03",
        name: "Go-to-market launch kit",
        text: "Site, email, social, and sales loop sharing the same proof points and CTAs.",
        items: ["Launch site", "Campaign slices", "Sales one-pager"],
        image: "/assets/imgs/pages/img-109.webp",
        alt: "Go-to-market kit",
    },
];

export default function Section4() {
    return (
        <section className="sd3-tracks pt-20 pb-40" data-sd3-tracks="">
            <div className="container">
                <div className="sd3-tracks__head">
                    <p className="sd3-label mb-15 at_fade_anim" data-fade-from="bottom">
                        [03] Tracks
                    </p>
                    <h2 className="sd3-tracks__title reveal-text mb-0">
                        <RevealText>Three tracks you can stack</RevealText>
                    </h2>
                </div>
            </div>
            <div className="scroll-section vertical-section position-relative sd3-tracks__stack">
                <div className="wrapper">
                    {TRACKS.map((track) => (
                        <div className="item" key={track.label}>
                            <div className="container">
                                <article className="sd3-track">
                                    <div className="sd3-track__meta">
                                        <span>{track.label}</span>
                                        <strong>{track.index}</strong>
                                    </div>
                                    <div className="sd3-track__body">
                                        <h3 className="sd3-track__name">{track.name}</h3>
                                        <p>{track.text}</p>
                                        <ul>
                                            {track.items.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="sd3-track__media">
                                        <img
                                            src={track.image}
                                            alt={track.alt}
                                            width={822}
                                            height={674}
                                            loading="lazy"
                                        />
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
