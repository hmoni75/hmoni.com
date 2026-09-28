import { useEffect } from "react";
import {
    animateCounter,
    createHorizontalPin,
    createMarquee,
    loadGsap,
    prefersReducedMotion,
    refreshAfterLayout,
} from "@/shared/utils/gsapPageEffects";

type GsapContextLike = { revert: () => void };

type Listener = {
    el: HTMLElement;
    type: string;
    handler: EventListener;
};

const HUD_LATENCY_VALUES = [42, 38, 51, 35, 47, 40];
const HUD_LATENCY_INTERVAL = 2200;

/**
 * Services Details 02 page script (assets/js/services-details-2.js): hero line
 * reveal + scrub parallax + chip stagger + HUD flicker, scroll counters, brief
 * rows, the pinned horizontal pipeline, the tooling marquee, the deliverables ↔
 * image-stack sync, and the CTA panel reveal.
 *
 * The capability module stacking (.scroll-section > .wrapper > .item) is not
 * handled here: the global ScrollSectionEffects owns it, exactly like main.js
 * does in the HTML template. The source script only refreshed ScrollTrigger for
 * it, which refreshAfterLayout covers.
 *
 * The original tolerated a missing SplitText plugin and fell back to animating
 * whole title lines; the Next project does not ship SplitText, so only that
 * fallback path exists here.
 */
export default function ServicesDetails2Effect() {
    useEffect(() => {
        const root = document.querySelector<HTMLElement>(".sd2-page");
        if (!root) return;

        let cancelled = false;
        let ctx: GsapContextLike | null = null;
        let disposeRefresh: (() => void) | null = null;
        let hudTimer: ReturnType<typeof setInterval> | null = null;
        const listeners: Listener[] = [];

        const on = (el: HTMLElement, type: string, handler: EventListener) => {
            el.addEventListener(type, handler);
            listeners.push({ el, type, handler });
        };

        const init = async () => {
            const { gsap, ScrollTrigger } = await loadGsap();
            if (cancelled) return;

            const reduced = prefersReducedMotion();

            // HUD flicker lives outside the gsap context: it is a plain timer,
            // so it has to be cleared by hand on unmount.
            const hero = root.querySelector<HTMLElement>("[data-sd2-hero]");
            const latency = hero?.querySelector<HTMLElement>("[data-sd2-hud-latency]");
            if (hero && latency && !reduced) {
                let index = 0;
                hudTimer = setInterval(() => {
                    index = (index + 1) % HUD_LATENCY_VALUES.length;
                    latency.textContent = HUD_LATENCY_VALUES[index] + "ms";
                }, HUD_LATENCY_INTERVAL);
            }

            // Deliverables ↔ stack image sync: DOM listeners, also cleaned up by hand.
            const deliverList = root.querySelector<HTMLElement>("[data-sd2-deliver]");
            const deliverItems = Array.from(
                root.querySelectorAll<HTMLElement>("[data-sd2-deliver-item]")
            );
            const stackMedia = root.querySelector<HTMLElement>("[data-sd2-stack-media]");
            const stackImages = stackMedia
                ? Array.from(stackMedia.querySelectorAll<HTMLElement>("[data-sd2-stack-img]"))
                : [];

            if (deliverList && deliverItems.length && stackImages.length) {
                const setActive = (index: number) => {
                    if (Number.isNaN(index) || index < 0) return;

                    deliverItems.forEach((item) => {
                        const itemIndex = parseInt(
                            item.getAttribute("data-sd2-img-index") || "",
                            10
                        );
                        item.classList.toggle("is-active", itemIndex === index);
                    });

                    stackImages.forEach((img) => {
                        const imgIndex = parseInt(img.getAttribute("data-index") || "", 10);
                        img.classList.toggle("is-active", imgIndex === index);
                    });
                };

                deliverItems.forEach((item) => {
                    const index = Number(item.getAttribute("data-sd2-img-index"));
                    const activate = () => setActive(index);
                    on(item, "mouseenter", activate);
                    on(item, "focusin", activate);
                    on(item, "click", activate);
                });

                on(deliverList, "mouseleave", () => setActive(0));

                // Keyboard / touch: keep the first item active by default.
                setActive(0);
            }

            ctx = gsap.context(() => {
                if (hero && !reduced) {
                    const titleLines = hero.querySelectorAll<HTMLElement>("[data-sd2-title-line]");
                    if (titleLines.length) {
                        gsap.fromTo(
                            titleLines,
                            { yPercent: 110, opacity: 0 },
                            {
                                yPercent: 0,
                                opacity: 1,
                                duration: 1,
                                stagger: 0.12,
                                ease: "power3.out",
                                delay: 0.15,
                            }
                        );
                    }

                    const heroVisual = hero.querySelector<HTMLElement>(
                        "[data-sd2-hero-visual] img"
                    );
                    if (heroVisual) {
                        gsap.fromTo(
                            heroVisual,
                            { scale: 1.12, yPercent: 6 },
                            {
                                scale: 1,
                                yPercent: 0,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: hero,
                                    start: "top top",
                                    end: "bottom top",
                                    scrub: true,
                                },
                            }
                        );
                    }

                    const chips = hero.querySelectorAll<HTMLElement>("[data-sd2-chips] li");
                    if (chips.length) {
                        gsap.fromTo(
                            chips,
                            { y: 16, opacity: 0 },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.45,
                                stagger: 0.05,
                                ease: "power2.out",
                                delay: 0.55,
                            }
                        );
                    }
                }

                const stats = root.querySelector<HTMLElement>("[data-sd2-stats]");
                if (stats) {
                    stats
                        .querySelectorAll<HTMLElement>("[data-sd2-count]")
                        .forEach((el) =>
                            animateCounter(gsap, ScrollTrigger, el, { start: "top 85%" })
                        );
                }

                const briefRows = gsap.utils.toArray<HTMLElement>(
                    root.querySelectorAll("[data-sd2-brief-row]")
                );
                if (briefRows.length && !reduced) {
                    gsap.fromTo(
                        briefRows,
                        { x: 24, opacity: 0 },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 0.55,
                            stagger: 0.1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: briefRows[0],
                                start: "top 88%",
                                once: true,
                            },
                        }
                    );
                }

                const pipeline = root.querySelector<HTMLElement>("[data-sd2-pipeline]");
                const pipePin = pipeline?.querySelector<HTMLElement>(".sd2-pipeline__pin");
                const pipeTrack = pipeline?.querySelector<HTMLElement>("[data-sd2-pipe-track]");
                if (pipePin && pipeTrack) {
                    createHorizontalPin(gsap, {
                        pin: pipePin,
                        track: pipeTrack,
                        bar: pipeline?.querySelector<HTMLElement>("[data-sd2-pipe-bar]"),
                    });
                }

                const marqueeTrack = root.querySelector<HTMLElement>("[data-sd2-marquee-track]");
                if (marqueeTrack) createMarquee(gsap, marqueeTrack);

                if (deliverItems.length && !reduced) {
                    gsap.fromTo(
                        deliverItems,
                        { y: 28, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.55,
                            stagger: 0.08,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: deliverItems[0].parentElement ?? deliverItems[0],
                                start: "top 85%",
                                once: true,
                            },
                        }
                    );
                }

                const ctaPanel = root.querySelector<HTMLElement>("[data-sd2-cta-panel]");
                if (ctaPanel && !reduced) {
                    gsap.fromTo(
                        ctaPanel,
                        { y: 40, opacity: 0.4 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: ctaPanel,
                                start: "top 88%",
                                once: true,
                            },
                        }
                    );
                }
            }, root);

            if (cancelled) {
                ctx.revert();
                ctx = null;
                return;
            }

            // Pin distances depend on the module stack and images settling first.
            disposeRefresh = refreshAfterLayout(ScrollTrigger);
        };

        init();

        return () => {
            cancelled = true;
            if (hudTimer !== null) {
                clearInterval(hudTimer);
                hudTimer = null;
            }
            listeners.forEach(({ el, type, handler }) => el.removeEventListener(type, handler));
            listeners.length = 0;
            disposeRefresh?.();
            disposeRefresh = null;
            ctx?.revert();
            ctx = null;
        };
    }, []);

    return null;
}
