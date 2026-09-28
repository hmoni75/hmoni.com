import { useEffect, useRef } from "react";
import {
    animateCounter,
    loadGsap,
    prefersReducedMotion,
    refreshAfterLayout,
} from "@/shared/utils/gsapPageEffects";

type GsapContext = { revert: () => void };

const PAGE_SELECTOR = ".sd3-page";

/**
 * Services Details 03 page script (assets/js/services-details-3.js): hero clip
 * reveal + tag stagger + media scrub + sprint-day counter, outcome counters and
 * scrubbed progress bar, runway gate meter, and the CTA panel reveal.
 *
 * The `.scroll-section` track stacking is intentionally not handled here — the
 * global ScrollSectionEffects picks it up, exactly like main.js does in the HTML
 * template. The source script only refreshed ScrollTrigger for it, which
 * `refreshAfterLayout` covers.
 */
export default function ServicesDetails3Effect() {
    const ctxRef = useRef<GsapContext | null>(null);

    useEffect(() => {
        const page = document.querySelector<HTMLElement>(PAGE_SELECTOR);
        if (!page) return;

        let cancelled = false;
        let disposeRefresh: (() => void) | null = null;

        const init = async () => {
            const { gsap, ScrollTrigger } = await loadGsap();
            if (cancelled) return;

            const ctx = (gsap as unknown as {
                context: (fn: () => void, scope?: Element) => GsapContext;
            }).context(() => {
                const reduced = prefersReducedMotion();

                // —— Hero ——
                const hero = page.querySelector<HTMLElement>("[data-sd3-hero]");
                if (hero) {
                    // The `.sd3-hero__line-inner` wrappers are rendered by Section1, so the
                    // effect only animates them (the source script created them at runtime).
                    const lineInners = hero.querySelectorAll<HTMLElement>(".sd3-hero__line-inner");
                    const tags = hero.querySelectorAll<HTMLElement>("[data-sd3-tag]");
                    const media = hero.querySelector<HTMLElement>("[data-sd3-hero-media] img");
                    const day = hero.querySelector<HTMLElement>("[data-sd3-day]");

                    if (!reduced) {
                        if (lineInners.length) {
                            gsap.fromTo(
                                lineInners,
                                { yPercent: 115 },
                                {
                                    yPercent: 0,
                                    duration: 1,
                                    stagger: 0.1,
                                    ease: "power3.out",
                                    delay: 0.12,
                                }
                            );
                        }

                        if (tags.length) {
                            gsap.fromTo(
                                tags,
                                { y: 14, opacity: 0 },
                                {
                                    y: 0,
                                    opacity: 1,
                                    duration: 0.45,
                                    stagger: 0.06,
                                    ease: "power2.out",
                                    delay: 0.55,
                                }
                            );
                        }

                        if (media) {
                            gsap.fromTo(
                                media,
                                { scale: 1.12 },
                                {
                                    scale: 1,
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

                        if (day) {
                            // Counts 1 → 12 on a fixed delay instead of on scroll, so it keeps
                            // its own tween rather than using the shared `animateCounter`.
                            const clock = { value: 1 };
                            gsap.to(clock, {
                                value: 12,
                                duration: 1.6,
                                ease: "power2.out",
                                delay: 0.35,
                                onUpdate: () => {
                                    day.textContent = String(Math.round(clock.value)).padStart(
                                        2,
                                        "0"
                                    );
                                },
                            });
                        }
                    }
                }

                // —— Outcomes ——
                page.querySelectorAll<HTMLElement>("[data-sd3-count]").forEach((el) => {
                    animateCounter(gsap, ScrollTrigger, el, { start: "top 88%", duration: 1.25 });
                });

                const cards = page.querySelectorAll<HTMLElement>("[data-sd3-out-card]");
                if (cards.length && !reduced) {
                    gsap.fromTo(
                        cards,
                        { y: 24, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.55,
                            stagger: 0.07,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: cards[0].parentElement ?? cards[0],
                                start: "top 88%",
                                once: true,
                            },
                        }
                    );
                }

                const progress = page.querySelector<HTMLElement>("[data-sd3-out-progress]");
                const outSection = page.querySelector<HTMLElement>("[data-sd3-out]");
                if (progress && outSection) {
                    gsap.fromTo(
                        progress,
                        { width: "0%" },
                        {
                            width: "100%",
                            ease: "none",
                            scrollTrigger: {
                                trigger: outSection,
                                start: "top 80%",
                                end: "bottom 40%",
                                scrub: true,
                            },
                        }
                    );
                }

                // —— Runway gates ——
                const steps = page.querySelectorAll<HTMLElement>("[data-sd3-step]");
                if (steps.length) {
                    const fill = page.querySelector<HTMLElement>("[data-sd3-meter-fill]");
                    const label = page.querySelector<HTMLElement>("[data-sd3-meter-label]");

                    steps.forEach((step, i) => {
                        const activate = () => {
                            if (fill) {
                                gsap.to(fill, {
                                    width: ((i + 1) / steps.length) * 100 + "%",
                                    duration: 0.4,
                                });
                            }
                            if (label) label.textContent = "Gate 0" + (i + 1);
                        };

                        ScrollTrigger.create({
                            trigger: step,
                            start: "top 60%",
                            end: "bottom 40%",
                            onEnter: activate,
                            onEnterBack: activate,
                        });

                        if (!reduced) {
                            gsap.fromTo(
                                step,
                                { y: 28, opacity: 0.35 },
                                {
                                    y: 0,
                                    opacity: 1,
                                    duration: 0.55,
                                    ease: "power2.out",
                                    scrollTrigger: { trigger: step, start: "top 88%", once: true },
                                }
                            );
                        }
                    });
                }

                // —— CTA panel ——
                const panel = page.querySelector<HTMLElement>("[data-sd3-cta-panel]");
                if (panel && !reduced) {
                    gsap.fromTo(
                        panel,
                        { y: 32, opacity: 0.5 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.7,
                            ease: "power2.out",
                            scrollTrigger: { trigger: panel, start: "top 88%", once: true },
                        }
                    );
                }
            }, page);

            if (cancelled) {
                ctx.revert();
                return;
            }
            ctxRef.current = ctx;

            // Track item heights and the hero media only settle after images load.
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
