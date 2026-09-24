import { useEffect } from "react";
import {
    animateCounter,
    createHorizontalPin,
    loadGsap,
    prefersReducedMotion,
    refreshAfterLayout,
} from "@/shared/utils/gsapPageEffects";

type GsapContextLike = { revert: () => void };

/**
 * Page script for Services Details 04, ported from assets/js/services-details-4.js:
 * hero line reveal + figure stagger with alternating image parallax, practice
 * pillar stagger, the pinned horizontal design flow, the deliverables list
 * stagger, the coverage counter, and the deliverables media scale scrub.
 *
 * Reduced motion skips every decorative tween; the counter still lands on its
 * final value (handled inside animateCounter) and the flow track keeps its
 * native CSS scrolling (handled inside createHorizontalPin).
 */
export default function ServicesDetails4Effect() {
    useEffect(() => {
        const root = document.querySelector<HTMLElement>(".sd4-page");
        if (!root) return;

        let cancelled = false;
        let ctx: GsapContextLike | null = null;
        let disposeRefresh: (() => void) | null = null;

        const init = async () => {
            const { gsap, ScrollTrigger } = await loadGsap();
            if (cancelled) return;

            const reduced = prefersReducedMotion();

            ctx = gsap.context(() => {
                const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-sd4-line]"));
                const figs = Array.from(root.querySelectorAll<HTMLElement>("[data-sd4-fig]"));

                if (!reduced) {
                    if (lines.length) {
                        gsap.fromTo(
                            lines,
                            { yPercent: 110, opacity: 0 },
                            {
                                yPercent: 0,
                                opacity: 1,
                                duration: 0.95,
                                stagger: 0.12,
                                ease: "power3.out",
                                delay: 0.1,
                            }
                        );
                    }

                    if (figs.length) {
                        gsap.fromTo(
                            figs,
                            { y: 48, opacity: 0 },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.7,
                                stagger: 0.12,
                                ease: "power2.out",
                                delay: 0.35,
                            }
                        );

                        figs.forEach((fig, i) => {
                            const img = fig.querySelector("img");
                            if (!img) return;
                            gsap.to(img, {
                                yPercent: i % 2 === 0 ? -8 : 8,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: fig.parentElement,
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: true,
                                },
                            });
                        });
                    }
                }

                const pillars = Array.from(root.querySelectorAll<HTMLElement>("[data-sd4-pillar]"));
                if (pillars.length && !reduced) {
                    gsap.fromTo(
                        pillars,
                        { y: 40, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.55,
                            stagger: 0.08,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: pillars[0].parentElement,
                                start: "top 85%",
                                once: true,
                            },
                        }
                    );
                }

                const flow = root.querySelector<HTMLElement>("[data-sd4-flow]");
                const track = flow?.querySelector<HTMLElement>("[data-sd4-track]");
                const pin = flow?.querySelector<HTMLElement>(".sd4-flow__pin");
                if (track && pin) {
                    createHorizontalPin(gsap, {
                        pin,
                        track,
                        bar: flow?.querySelector<HTMLElement>("[data-sd4-bar]"),
                    });
                }

                const items = Array.from(root.querySelectorAll<HTMLElement>("[data-sd4-item]"));
                if (items.length && !reduced) {
                    gsap.fromTo(
                        items,
                        { x: 20, opacity: 0 },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 0.5,
                            stagger: 0.08,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: items[0].parentElement,
                                start: "top 85%",
                                once: true,
                            },
                        }
                    );
                }

                const count = root.querySelector<HTMLElement>("[data-sd4-count]");
                if (count) {
                    animateCounter(gsap, ScrollTrigger, count, {
                        start: "top 90%",
                        duration: 1.3,
                    });
                }

                const media = root.querySelector<HTMLImageElement>("[data-sd4-deliver-media] img");
                if (media && !reduced) {
                    gsap.fromTo(
                        media,
                        { scale: 1.08 },
                        {
                            scale: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: media.parentElement,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                        }
                    );
                }
            }, root);

            disposeRefresh = refreshAfterLayout(ScrollTrigger);
        };

        init();

        return () => {
            cancelled = true;
            disposeRefresh?.();
            disposeRefresh = null;
            ctx?.revert();
            ctx = null;
        };
    }, []);

    return null;
}
