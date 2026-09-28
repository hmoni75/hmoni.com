import RevealText from "@/shared/effects/RevealText";

// Services Details 5 Section 3 - Offer stack. The `.scroll-section > .wrapper > .item`
// structure is picked up by the global ScrollSectionEffects card stacking.

type Offer = {
    tag: string;
    title: string;
    text: string;
    items: string[];
    img: string;
};

const OFFERS: Offer[] = [
    {
        tag: "01 · Sprint",
        title: "Growth reboot",
        text: "4–6 weeks: audit, test plan, creative refresh, and three high-confidence experiments live.",
        items: ["Funnel diagnostic", "Creative system", "Landing tests"],
        img: "/assets/imgs/pages/home-8/sec7-img-2.webp",
    },
    {
        tag: "02 · Retainer",
        title: "Always-on program",
        text: "Monthly roadmaps, media + creative ops, and reporting that business leads actually open.",
        items: ["Media management", "Content cadence", "Weekly pods"],
        img: "/assets/imgs/pages/home-8/sec7-img-3.webp",
    },
    {
        tag: "03 · Launch",
        title: "Campaign spikes",
        text: "Product launches and seasonal pushes with craft, media weight, and post-mortems built in.",
        items: ["Narrative kit", "Paid + owned", "Retro pack"],
        img: "/assets/imgs/pages/home-8/sec7-img-4.webp",
    },
];

export default function Section3() {
    return (
        <section className="sd5-offers pt-20 pb-40" data-sd5-offers="">
            <div className="container">
                <div className="sd5-offers__head">
                    <p className="sd5-label mb-15 at_fade_anim" data-fade-from="bottom">
                        [02] Offers
                    </p>
                    <h2 className="sd5-offers__title reveal-text mb-0">
                        <RevealText>Engagements that scale with traction</RevealText>
                    </h2>
                </div>
            </div>
            <div className="scroll-section vertical-section position-relative sd5-offers__stack">
                <div className="wrapper">
                    {OFFERS.map((offer) => (
                        <div className="item" key={offer.tag}>
                            <div className="container">
                                <article className="sd5-offer">
                                    <span className="sd5-offer__tag">{offer.tag}</span>
                                    <div className="sd5-offer__body">
                                        <h3>{offer.title}</h3>
                                        <p>{offer.text}</p>
                                        <ul>
                                            {offer.items.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="sd5-offer__media">
                                        <img
                                            src={offer.img}
                                            alt={offer.title}
                                            width={1400}
                                            height={933}
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
