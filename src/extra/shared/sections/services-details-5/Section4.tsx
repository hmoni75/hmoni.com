import RevealText from "@/shared/effects/RevealText";

// Services Details 5 Section 4 - Process zebra rows

type Step = {
    num: string;
    title: string;
    text: string;
    img: string;
    alt: string;
};

const STEPS: Step[] = [
    {
        num: "01",
        title: "Signal",
        text: "Pull performance, creative, and market data. Name the bottleneck worth fixing first.",
        img: "/assets/imgs/pages/home-13/home-13_sec_9_1.webp",
        alt: "Signal phase",
    },
    {
        num: "02",
        title: "Brief",
        text: "Audience, offer, proof, channel mix. Creative and media brief same document.",
        img: "/assets/imgs/pages/home-13/home-13_sec_9_2.webp",
        alt: "Brief phase",
    },
    {
        num: "03",
        title: "Make",
        text: "Assets, landings, tracking. QA in staging before any spend goes live.",
        img: "/assets/imgs/pages/home-13/home-13_sec_9_3.webp",
        alt: "Make phase",
    },
    {
        num: "04",
        title: "Learn",
        text: "Readouts with decisions, not vanity charts. Feed learning into the next sprint.",
        img: "/assets/imgs/pages/home-13/home-13_sec_9_4.webp",
        alt: "Learn phase",
    },
];

export default function Section4() {
    return (
        <section className="sd5-process pt-80 pb-100 bg-neutral-50" data-sd5-process="">
            <div className="container">
                <div className="sd5-process__head">
                    <p className="sd5-label mb-15 at_fade_anim" data-fade-from="bottom">
                        [03] Cadence
                    </p>
                    <h2 className="sd5-process__title reveal-text mb-0">
                        <RevealText>How a cycle runs</RevealText>
                    </h2>
                </div>
                <ol className="sd5-process__list">
                    {STEPS.map((step) => (
                        <li data-sd5-step="" key={step.num}>
                            <span className="sd5-process__num">{step.num}</span>
                            <div className="sd5-process__copy">
                                <h3>{step.title}</h3>
                                <p>{step.text}</p>
                            </div>
                            <figure className="sd5-process__media">
                                <img
                                    src={step.img}
                                    alt={step.alt}
                                    width={650}
                                    height={434}
                                    loading="lazy"
                                />
                            </figure>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
