// 404 Section 2 - Throwable client logo capsules (physics handled by ThrowableEffect)

const LOGOS = [
    { src: "/assets/imgs/template/logo/logo-brand-01.webp", bgClass: "bg-neutral-500" },
    { src: "/assets/imgs/template/logo/logo-brand-02.webp", bgClass: "" },
    { src: "/assets/imgs/template/logo/logo-brand-03.webp", bgClass: "" },
    { src: "/assets/imgs/template/logo/logo-brand-04.webp", bgClass: "" },
    { src: "/assets/imgs/template/logo/logo-brand-05.webp", bgClass: "bg-neutral-500" },
    { src: "/assets/imgs/template/logo/logo-brand-06.webp", bgClass: "" },
    { src: "/assets/imgs/template/logo/logo-brand-07.webp", bgClass: "" },
    { src: "/assets/imgs/template/logo/logo-brand-08.webp", bgClass: "" },
    { src: "/assets/imgs/template/logo/logo-brand-09.webp", bgClass: "" },
    { src: "/assets/imgs/template/logo/logo-brand-10.webp", bgClass: "" },
    { src: "/assets/imgs/template/logo/logo-brand-02.webp", bgClass: "bg-neutral-500" },
    { src: "/assets/imgs/template/logo/logo-brand-05.webp", bgClass: "" },
    { src: "/assets/imgs/template/logo/logo-brand-07.webp", bgClass: "" },
    { src: "/assets/imgs/template/logo/logo-brand-03.webp", bgClass: "" },
];

export default function Section2() {
    return (
        <div className="sec-2-404 pb-20">
            <div className="container">
                <div className="client-capsule-wrapper-box" data-t-throwable-scene="true">
                    <div className="client-capsule-wrapper">
                        {LOGOS.map((logo, i) => (
                            <p key={i} data-t-throwable-el="">
                                <span className={`client-box ${logo.bgClass}`.trim()}>
                                    <img
                                        className="invert-1"
                                        src={logo.src}
                                        alt="image"
                                        width={130}
                                        height={33} loading="lazy" />
                                </span>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
