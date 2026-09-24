import { useEffect, useRef } from "react";
import {
    animateCounter,
    createMarquee,
    loadGsap,
    prefersReducedMotion,
    refreshAfterLayout,
} from "@/shared/utils/gsapPageEffects";

type GsapContext = { revert: () => void };

const PAGE_SELECTOR = ".sd5-page";
const COUNT_SELECTOR = "[data-sd5-count]";
const MARQUEE_TRACK_SELECTOR = "[data-sd5-marquee-track]";
const CELL_SELECTOR = "[data-sd5-cell]";
const STEP_SELECTOR = "[data-sd5-step]";
const CTA_PANEL_SELECTOR = "[data-sd5-cta-panel]";

const MARQUEE_DURATION = 26;

/**
 * Services Details 05 page script (assets/js/services-details-5.js): hero stat
 * counters, the endless channel marquee, the growth-map row stagger, the process
 * step stagger and the CTA panel reveal. The offer stacking
 * (.scroll-section > .wrapper > .item) is intentionally not handled here — the
 * global ScrollSectionEffects picks it up, exactly like main.js does in the HTML
 * template, so the source script only refreshes ScrollTrigger for it.
 */
export default function ServicesDetails5Effect() {
    const ctxRef = useRef<GsapContext | null>(null);

    useEffect(() => {
        const root = document.querySelector<HTMLElement>(PAGE_SELECTOR);
        if (!root) return;

        let cancelled = false;
        let disposeRefresh: (() => void) | null = null;

        const init = async () => {
            const { gsap, ScrollTrigger } = await loadGsap();
            if (cancelled) return;

            const ctx = (gsap as unknown as {
                context: (fn: () => void, scope?: Element) => GsapContext;
            }).context(() => {
                const reduced = prefersReducedMotion();

                root.querySelectorAll<HTMLElement>(COUNT_SELECTOR).forEach((el) => {
                    animateCounter(gsap, ScrollTrigger, el);
                });

                const track = root.querySelector<HTMLElement>(MARQUEE_TRACK_SELECTOR);
                if (track) createMarquee(gsap, track, MARQUEE_DURATION);

                const cells = gsap.utils.toArray<HTMLElement>(
                    root.querySelectorAll<HTMLElement>(CELL_SELECTOR)
                );
                if (cells.length && !reduced) {
                    gsap.fromTo(
                        cells,
                        { y: 28, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.55,
                            stagger: 0.09,
                            ease: "power2.out",
                            immediateRender: false,
                            scrollTrigger: {
                                trigger: cells[0].parentElement ?? cells[0],
                                start: "top 85%",
                                once: true,
                            },
                        }
                    );
                }

                const steps = gsap.utils.toArray<HTMLElement>(
                    root.querySelectorAll<HTMLElement>(STEP_SELECTOR)
                );
                if (steps.length && !reduced) {
                    gsap.fromTo(
                        steps,
                        { x: -24, opacity: 0 },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 0.55,
                            stagger: 0.1,
                            ease: "power2.out",
                            immediateRender: false,
                            scrollTrigger: {
                                trigger: steps[0].parentElement ?? steps[0],
                                start: "top 85%",
                                once: true,
                            },
                        }
                    );
                }

                const ctaPanel = root.querySelector<HTMLElement>(CTA_PANEL_SELECTOR);
                if (ctaPanel && !reduced) {
                    gsap.fromTo(
                        ctaPanel,
                        { y: 36, opacity: 0.45 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.75,
                            ease: "power2.out",
                            immediateRender: false,
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
                return;
            }
            ctxRef.current = ctx;

            // Offer stack heights only settle after images + smooth scroll setup.
            disposeRefresh = refreshAfterLayout(ScrollTrigger);
        };

        init();

        return () => {
            cancelled = true;
            disposeRefresh?.();
            disposeRefresh = null;
            ctxRef.current?.revert();
            ctxRef.current = null;
        };
    }, []);

    return null;
}
