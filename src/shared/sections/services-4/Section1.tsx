import RevealText from "@/shared/effects/RevealText";

// Services 4 Section 1 - Hero

const ARROW_SVG = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
            fill="currentColor"
        />
    </svg>
);

const META = [
    { label: "Lead time", value: "2–4 weeks to start" },
    { label: "Models", value: "Project · retainer" },
];

export default function Section1() {
    return (
        <section className="svc4-hero pt-120 overflow-hidden" aria-label="Services overview" data-svc4-hero="">
            <div className="bg-neutral-50 overflow-hidden">
                <div className="container">
                    <div className="row align-items-center g-4 g-xl-5">
                        <div className="col-xxl-5 col-lg-6 pt-lg-0 pb-lg-0 pt-40">
                            <span
                                className="at-btn common-black bg-transparent mb-15 rounded-0 p-0 at_fade_anim"
                                data-fade-from="bottom"
                                data-delay=".05"
                            >
                                <span className="text-uppercase">
                                    <span className="text-1">Volume 04 · Catalog</span>
                                    <span className="text-2">Volume 04 · Catalog</span>
                                </span>
                                <i>
                                    {ARROW_SVG}
                                    {ARROW_SVG}
                                </i>
                            </span>
                            <h1 className="section-title d-flex fw-600 fz-200 reveal-text mb-20">
                                <RevealText>Services</RevealText>
                            </h1>
                            <div className="col-xl-10">
                                <p
                                    className="h6 fw-500 fz-font-lg mb-0 at_fade_anim"
                                    data-fade-from="bottom"
                                    data-delay=".15"
                                >
                                    We turn ideas into high-impact digital solutions that attract customers,
                                    boost conversions, and accelerate sustainable growth.
                                </p>
                            </div>
                            <div
                                className="svc4-hero__meta mt-40 at_fade_anim"
                                data-fade-from="bottom"
                                data-delay=".25"
                            >
                                {META.map((meta) => (
                                    <div key={meta.label} className="svc4-meta">
                                        <span className="svc4-meta__label">{meta.label}</span>
                                        <span className="svc4-meta__value">{meta.value}</span>
                                    </div>
                                ))}
                                <div className="svc4-meta">
                                    <span className="svc4-meta__label">Contact</span>
                                    <a className="svc4-meta__value" href="mailto:hello@hmoni.com">
                                        hello@hmoni.com
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-7 col-lg-6 mt-0">
                            <div className="svc4-hero__portrait" data-svc4-hero-media="">
                                <img
                                    className="anim-zoomin layer"
                                    data-depth="0.35"
                                    src="/assets/imgs/pages/img-107.webp"
                                    alt="H Moni services craft"
                                    width={822}
                                    height={674}
                                    loading="eager"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
