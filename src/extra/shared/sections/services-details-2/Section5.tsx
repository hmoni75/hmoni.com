import { Fragment } from "react";
import RevealText from "@/shared/effects/RevealText";

// Services Details 2 Section 5 - Tooling marquee, deliverables list and synced image stack

const MARQUEE_ITEMS = [
    "PyTorch",
    "LangGraph",
    "OpenAI",
    "Anthropic",
    "vLLM",
    "Pinecone",
    "Weaviate",
    "Airflow",
    "Kafka",
    "Kubernetes",
    "Datadog",
    "Langfuse",
];

// The marquee tween travels half the track width, so the list ships duplicated.
const MARQUEE_PASSES = ["a", "b"];

const DELIVERABLES = [
    {
        num: "01",
        name: "System map",
        text: "Architecture diagrams, data contracts, and threat notes for security reviews.",
        img: { src: "/assets/imgs/pages/bg-img-4.webp", alt: "System map delivery" },
    },
    {
        num: "02",
        name: "Working branch",
        text: "Reference implementation with stubs for tools, model adapters, and config layers.",
        img: { src: "/assets/imgs/pages/img-170.webp", alt: "Working branch delivery" },
    },
    {
        num: "03",
        name: "Eval suite",
        text: "Datasets, scorers, and CI hooks so quality does not drift after handoff.",
        img: { src: "/assets/imgs/pages/img-175.webp", alt: "Eval suite delivery" },
    },
    {
        num: "04",
        name: "Ops kit",
        text: "Dashboards, alert thresholds, incident runbooks, and cost budgets.",
        img: { src: "/assets/imgs/pages/img-172.webp", alt: "Ops kit delivery" },
    },
    {
        num: "05",
        name: "Enablement",
        text: "Workshops for product, eng, and support so the system keeps improving in-house.",
        img: { src: "/assets/imgs/pages/img-13.webp", alt: "Enablement delivery" },
    },
];

export default function Section5() {
    return (
        <section
            className="sd2-stack pt-120 pb-100"
            aria-label="Stack and deliverables"
            data-sd2-stack=""
        >
            <div className="sd2-stack__marquee" data-sd2-marquee="" aria-hidden="true">
                <div className="sd2-stack__marquee-track" data-sd2-marquee-track="">
                    {MARQUEE_PASSES.map((pass) => (
                        <Fragment key={pass}>
                            {MARQUEE_ITEMS.map((item) => (
                                <span key={item}>{item}</span>
                            ))}
                        </Fragment>
                    ))}
                </div>
            </div>

            <div className="container pt-80">
                <div className="row g-5 align-items-start">
                    <div className="col-lg-5">
                        <p
                            className="sd2-kicker sd2-kicker--dark mb-15 at_fade_anim"
                            data-fade-from="bottom"
                        >
                            <span className="sd2-kicker__num">[05]</span>
                            Output package
                        </p>
                        <h2 className="sd2-stack__title reveal-text mb-20">
                            <RevealText>What lands in your repo</RevealText>
                        </h2>
                        <p
                            className="sd2-stack__lead at_fade_anim"
                            data-fade-from="bottom"
                            data-delay=".1"
                        >
                            Artifacts engineering can review, extend, and audit—not a zip of
                            notebooks named final_v7.
                        </p>
                        <div
                            className="sd2-stack__media at_fade_anim"
                            data-fade-from="bottom"
                            data-delay=".15"
                            data-sd2-stack-media=""
                        >
                            {DELIVERABLES.map((item, index) => (
                                <img
                                    key={item.num}
                                    className={`sd2-stack__img${index === 0 ? " is-active" : ""}`}
                                    src={item.img.src}
                                    alt={item.img.alt}
                                    loading="lazy"
                                    data-sd2-stack-img=""
                                    data-index={index}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-6 offset-lg-1">
                        <ol className="sd2-deliver" data-sd2-deliver="">
                            {DELIVERABLES.map((item, index) => (
                                <li
                                    key={item.num}
                                    className={`sd2-deliver__item${index === 0 ? " is-active" : ""}`}
                                    data-sd2-deliver-item=""
                                    data-sd2-img-index={index}
                                >
                                    <span className="sd2-deliver__num">{item.num}</span>
                                    <div>
                                        <h3 className="sd2-deliver__name">{item.name}</h3>
                                        <p className="sd2-deliver__text">{item.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}
