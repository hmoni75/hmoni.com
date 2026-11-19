import RevealText from "@/shared/effects/RevealText";

const FAQS = [
    { q: "How long does a typical project take?", a: "Most requests are turned around within 48 hours, though more complex tasks like full landing pages or branded systems can take 3–5 days. You'll always get a clear timeline upfront.", delay: ".05", open: true },
    { q: "What does the collaboration process look like?", a: "I start with a kickoff call to align on goals, then move into structured sprints with weekly reviews. You'll always know what's shipping next and when.", delay: ".1" },
    { q: "Who will be my main point of contact?", a: "That's me. You'll work with me directly from kickoff through launch — no account managers, no handoffs, no waiting on a queue.", delay: ".15" },
    { q: "How do you handle revisions and feedback?", a: "Every milestone includes structured review rounds. Feedback flows through a single shared channel so nothing slips, and revisions are always scoped before I ship.", delay: ".2" },
    { q: "What is included in the final delivery?", a: "You receive production-ready files, a documented design system, source code with clear handoff notes, and a 30-day post-launch support window.", delay: ".25" },
    { q: "Can we scale the project as we grow?", a: "Absolutely. Every system I build is structured for expansion, with a clear upgrade path from initial launch onward.", delay: ".3" },
    { q: "What technologies and frameworks do you use?", a: "Figma for design, Next.js and React for production, Webflow and Framer for marketing sites — I pick the stack that best fits your goals and scale.", delay: ".35" },
    { q: "How do I initiate a new project?", a: "Send me a brief through the contact form and I'll get back to you within two business days to align on scope, timeline, and budget.", delay: ".4" },
];

export default function Section8() {
    return (
        <section className="sec-8-home-12" aria-label="Frequently Asked Questions">
            <div className="container">
                <header className="sec-8-home-12__header">
                    <p className="sec-8-home-12__eyebrow at_fade_anim" data-fade-from="bottom" data-delay=".05">FAQ</p>
                    <h2 className="sec-8-home-12__title reveal-text mb-0"><RevealText>Frequently Asked Questions.</RevealText></h2>
                </header>

                <div className="sec-8-home-12__list">
                    {FAQS.map((f, i) => (
                        <details key={i} className="sec-8-home-12__item at_fade_anim" data-fade-from="bottom" data-delay={f.delay} name="H Moni-home-12-faq" open={f.open}>
                            <summary className="sec-8-home-12__summary">
                                <span className="sec-8-home-12__question">{f.q}</span>
                                <span className="sec-8-home-12__toggle" aria-hidden="true">
                                    <span className="sec-8-home-12__bar sec-8-home-12__bar--h"></span>
                                    <span className="sec-8-home-12__bar sec-8-home-12__bar--v"></span>
                                </span>
                            </summary>
                            <div className="sec-8-home-12__answer">
                                <span className="sec-8-home-12__divider" aria-hidden="true"></span>
                                <p className="mb-0">{f.a}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
