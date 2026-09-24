import { Link } from "react-router-dom";
import RevealText from "@/shared/effects/RevealText";

// Services 4 Section 2 - Expandable service index

const ARROW_SVG = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
            fill="currentColor"
        />
    </svg>
);

const FLOAT_DEFAULT_IMG = "/assets/imgs/pages/home-12/sec-2-project-2.webp";

type ServiceItem = {
    id: string;
    collapseId: string;
    preview: string;
    num: string;
    name: string;
    tag: string;
    visualAlt: string;
    summary: string;
    deliverables: string[];
    link: { href: string; label: string };
    span: string;
    bestWhen: string;
    open?: boolean;
};

const SERVICES: ServiceItem[] = [
    {
        id: "svc4-brand",
        collapseId: "svc4ColBrand",
        preview: "/assets/imgs/pages/home-12/sec-2-project-2.webp",
        num: "01",
        name: "Brand systems",
        tag: "Identity · positioning · guidelines",
        visualAlt: "Brand systems work",
        summary: "We clarify the story, tighten the system, and leave assets teams can extend without constant agency babysitting.",
        deliverables: [
            "Positioning narrative",
            "Logo & mark kit",
            "Type / color tokens",
            "Messaging framework",
            "Brand guide (Figma / PDF)",
            "Launch asset pack",
        ],
        link: { href: "/services-details", label: "Service details" },
        span: "6–10 weeks",
        bestWhen: "Rebrand, category entry, or multi-product cleanup",
        open: true,
    },
    {
        id: "svc4-product",
        collapseId: "svc4ColProduct",
        preview: "/assets/imgs/pages/home-15/sec-4-project-2.webp",
        num: "02",
        name: "Product design",
        tag: "UX · UI · design systems",
        visualAlt: "Product design interface",
        summary: "Flows, components, and prototypes that engineering can build without redesign thrash two sprints later.",
        deliverables: [
            "Journey maps",
            "Wireframes & prototypes",
            "High-fi UI kits",
            "Component library",
            "Accessibility pass",
            "Dev handoff notes",
        ],
        link: { href: "/services-details", label: "Service details" },
        span: "4–12 weeks",
        bestWhen: "MVP polish, redesign, or scaling a messy UI",
    },
    {
        id: "svc4-web",
        collapseId: "svc4ColWeb",
        preview: "/assets/imgs/pages/home-15/sec-4-project-3.webp",
        num: "03",
        name: "Web & campaigns",
        tag: "Sites · landers · launch kits",
        visualAlt: "Web campaign layout",
        summary: "Marketing sites and campaign systems that stay on brand under deadline pressure.",
        deliverables: [
            "Site IA & wireframes",
            "Page design system",
            "Landing templates",
            "CMS structure",
            "Performance checklist",
            "Campaign asset board",
        ],
        link: { href: "/services-details", label: "Service details" },
        span: "5–14 weeks",
        bestWhen: "Site relaunch, product unveil, or paid media push",
    },
    {
        id: "svc4-motion",
        collapseId: "svc4ColMotion",
        preview: "/assets/imgs/pages/home-11/img-8.webp",
        num: "04",
        name: "Motion & content",
        tag: "Reels · product motion · decks",
        visualAlt: "Motion design still",
        summary: "Motion language and story assets that make demos, keynotes, and social feel like one brand.",
        deliverables: [
            "Motion principles",
            "Logo / UI animation",
            "Showreel cuts",
            "Social loops",
            "Pitch deck art",
            "Export packages",
        ],
        link: { href: "/services-details", label: "Service details" },
        span: "3–8 weeks",
        bestWhen: "Launch narrative or product storytelling needs polish",
    },
    {
        id: "svc4-growth",
        collapseId: "svc4ColGrowth",
        preview: "/assets/imgs/pages/home-15/sec-4-project-4.webp",
        num: "05",
        name: "Growth ops",
        tag: "Retainers · always-on craft",
        visualAlt: "Growth design operations",
        summary: "A monthly seat for ongoing design requests—one queue, clear SLAs, no surprise invoices mid-sprint.",
        deliverables: [
            "Shared request board",
            "~48h typical turnaround",
            "Priority roadmap slots",
            "Multi-brand support",
            "Pause anytime",
            "Monthly retro notes",
        ],
        link: { href: "/pricing-5", label: "See pricing models" },
        span: "Month to month",
        bestWhen: "In-house capacity is thin but the backlog never is",
    },
];

export default function Section2() {
    return (
        <section className="svc4-index pt-100 pb-100" aria-label="Service index" data-svc4-index="">
            <div className="container">
                <div className="svc4-index__head at_fade_anim" data-fade-from="bottom" data-delay=".05">
                    <div>
                        <span className="at-btn common-black bg-transparent mb-10 rounded-0 p-0">
                            <span className="text-uppercase">
                                <span className="text-1">Offerings</span>
                                <span className="text-2">Offerings</span>
                            </span>
                            <i>
                                {ARROW_SVG}
                                {ARROW_SVG}
                            </i>
                        </span>
                        <h2 className="section-title h2 fw-600 reveal-text mb-0">
                            <RevealText>Service index</RevealText>
                        </h2>
                    </div>
                    <p className="svc4-index__hint mb-0">
                        Hover a row for a preview · expand for deliverables.
                    </p>
                </div>

                <div className="svc4-float" data-svc4-float="" aria-hidden="true">
                    {/* The GSAP effect swaps this src imperatively per hovered row and relocates
                        the wrapper to document.body, so React must not own the src or the position. */}
                    <img src={FLOAT_DEFAULT_IMG} alt="" data-svc4-float-img="" width={320} height={400} loading="lazy" />
                </div>

                <div className="accordion svc4-list" id="svc4Accordion">
                    {SERVICES.map((service) => (
                        <div
                            key={service.id}
                            className="svc4-item"
                            id={service.id}
                            data-svc4-item=""
                            data-preview={service.preview}
                        >
                            <h3 className="svc4-item__header">
                                <button
                                    className={`svc4-item__btn${service.open ? "" : " collapsed"}`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#${service.collapseId}`}
                                    aria-expanded={Boolean(service.open)}
                                    aria-controls={service.collapseId}
                                >
                                    <span className="svc4-item__thumb">
                                        <img
                                            src={service.preview}
                                            alt=""
                                            width={72}
                                            height={72}
                                            loading="lazy"
                                        />
                                    </span>
                                    <span className="svc4-item__num">{service.num}</span>
                                    <span className="svc4-item__name">{service.name}</span>
                                    <span className="svc4-item__tag">{service.tag}</span>
                                    <span className="svc4-item__icon" aria-hidden="true" />
                                </button>
                            </h3>
                            <div
                                id={service.collapseId}
                                className={`collapse${service.open ? " show" : ""}`}
                                data-bs-parent="#svc4Accordion"
                            >
                                <div className="svc4-item__body">
                                    <div className="svc4-item__visual">
                                        <img
                                            className="anim-zoomin"
                                            src={service.preview}
                                            alt={service.visualAlt}
                                            width={640}
                                            height={480}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="svc4-item__copy">
                                        <p>{service.summary}</p>
                                        <ul className="svc4-item__deliverables">
                                            {service.deliverables.map((deliverable) => (
                                                <li key={deliverable}>{deliverable}</li>
                                            ))}
                                        </ul>
                                        <Link className="svc4-item__link" to={service.link.href}>
                                            {service.link.label}
                                        </Link>
                                    </div>
                                    <div className="svc4-item__aside">
                                        <p className="svc4-item__aside-label">Typical span</p>
                                        <p className="svc4-item__aside-value">{service.span}</p>
                                        <p className="svc4-item__aside-label">Best when</p>
                                        <p className="svc4-item__aside-value">{service.bestWhen}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
