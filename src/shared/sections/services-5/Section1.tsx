import RevealText from "@/shared/effects/RevealText";

// Services 5 Section 1 - Capability hero

type HeroMeta = { label: string; value: string; href?: string };

const HERO_META: HeroMeta[] = [
    { label: "Start", value: "2–4 weeks" },
    { label: "Models", value: "Project · monthly" },
    { label: "Talk", value: "hello@orisa.com", href: "mailto:hello@orisa.com" },
];

export default function Section1() {
    return (
        <section className="svc5-hero pt-150 pb-80" aria-label="Services overview" data-svc5-hero="">
            <div className="container">
                <div className="svc5-hero__grid">
                    <div className="svc5-hero__main">
                        <p className="svc5-kicker at_fade_anim" data-fade-from="bottom" data-delay=".05">
                            <span className="svc5-kicker__num">(05)</span>
                            <span className="svc5-kicker__text">Capabilities</span>
                        </p>
                        <h1 className="svc5-hero__title reveal-text mb-0">
                            <RevealText>Work shaped for</RevealText>{" "}
                            <span className="svc5-hero__title-line">
                                <RevealText>shipping teams.</RevealText>
                            </span>
                        </h1>
                    </div>
                    <div className="svc5-hero__aside at_fade_anim" data-fade-from="bottom" data-delay=".15">
                        <p className="svc5-hero__lead mb-0">
                            Brand, product, content, and growth—assembled as clear scopes, not vague
                            retainers full of filler.
                        </p>
                        <div className="svc5-hero__meta">
                            {HERO_META.map((meta) => (
                                <div className="svc5-meta" key={meta.label}>
                                    <span className="svc5-meta__label">{meta.label}</span>
                                    {meta.href ? (
                                        <a className="svc5-meta__value" href={meta.href}>
                                            {meta.value}
                                        </a>
                                    ) : (
                                        <span className="svc5-meta__value">{meta.value}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div
                    className="svc5-hero__media at_fade_anim"
                    data-fade-from="bottom"
                    data-delay=".25"
                    data-svc5-hero-media=""
                >
                    {/* `fill` is unusable here: the global anim-zoomin timeline ends with
                        clearProps:"all", which would strip next/image's inline positioning. */}
                    <img
                        className="anim-zoomin"
                        src="/assets/imgs/pages/img-153.webp"
                        alt="Orisa studio craft"
                        width={1920}
                        height={570} loading="lazy" />
                    <div className="svc5-hero__media-tag">
                        <span>Studio · 2016–now</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
