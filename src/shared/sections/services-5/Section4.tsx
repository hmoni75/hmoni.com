import { Link } from "react-router-dom";
import RevealText from "@/shared/effects/RevealText";

// Services 5 Section 4 - Engagement models + CTA

type Mode = {
    name: string;
    desc: string;
    points: string[];
    cta: { label: string; href: string };
    badge?: string;
    modifier?: string;
    delay: string;
};

const MODES: Mode[] = [
    {
        name: "Defined project",
        desc: "One scope, one timeline, fixed checkpoints. Best for launches, rebrands, and rebuilds.",
        points: ["Locked deliverable list", "2–3 review rounds built in", "Shared milestone board"],
        cta: { label: "See project pricing", href: "/pricing-4" },
        delay: ".08",
    },
    {
        name: "Monthly partnership",
        desc: "One active request lane, rolling queue, pause when quiet. Built for teams that ship every week.",
        points: ["Senior creative lead", "~48h typical turnaround", "No long lock-in"],
        cta: { label: "Open the estimate", href: "/pricing-5" },
        badge: "Most flexible",
        modifier: "svc5-mode--accent",
        delay: ".12",
    },
];

export default function Section4() {
    return (
        <section className="svc5-engage pt-100 pb-120" aria-label="How to work with us">
            <div className="container">
                <div className="svc5-engage__head at_fade_anim" data-fade-from="bottom" data-delay=".05">
                    <p className="svc5-kicker svc5-kicker--dark mb-15">
                        <span className="svc5-kicker__num">(03)</span>
                        <span className="svc5-kicker__text">Engage</span>
                    </p>
                    <h2 className="svc5-engage__title reveal-text mb-0">
                        <RevealText>Pick the rhythm that fits</RevealText>
                    </h2>
                </div>

                <div className="svc5-engage__grid">
                    {MODES.map((mode) => (
                        <article
                            key={mode.name}
                            className={["svc5-mode", mode.modifier, "at_fade_anim"]
                                .filter(Boolean)
                                .join(" ")}
                            data-fade-from="bottom"
                            data-delay={mode.delay}
                        >
                            {mode.badge && <span className="svc5-mode__badge">{mode.badge}</span>}
                            <h3 className="svc5-mode__name">{mode.name}</h3>
                            <p className="svc5-mode__desc">{mode.desc}</p>
                            <ul className="svc5-mode__list">
                                {mode.points.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                            <Link className="svc5-mode__cta" to={mode.cta.href}>
                                {mode.cta.label}
                            </Link>
                        </article>
                    ))}
                </div>

                <div className="svc5-cta at_fade_anim" data-fade-from="bottom" data-delay=".1">
                    <div className="svc5-cta__copy">
                        <h2 className="svc5-cta__title">Not sure which lane fits?</h2>
                        <p className="svc5-cta__text">
                            Book a short call—we’ll map goals to a clear first sprint without the sales
                            theatre.
                        </p>
                    </div>
                    <div className="svc5-cta__actions">
                        <Link className="svc5-cta__btn" to="/contact-1">
                            Book a call
                        </Link>
                        <a className="svc5-cta__mail" href="mailto:hello@H Moni.com">
                            hello@H Moni.com
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
