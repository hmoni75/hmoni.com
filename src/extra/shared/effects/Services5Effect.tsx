import { useEffect, useRef } from "react";
import { loadGsap, prefersReducedMotion, refreshAfterLayout } from "@/shared/utils/gsapPageEffects";

type GsapContext = { revert: () => void };

const STEP_SELECTOR = "[data-svc5-step]";

/**
 * Services 05 page script (assets/js/services-5.js): staggers the process steps
 * on scroll and refreshes ScrollTrigger once the layout settles. The capability
 * card stacking (.scroll-section > .wrapper > .item) is intentionally not
 * handled here — the global ScrollSectionEffects picks it up, exactly like
 * main.js does in the HTML template.
 */
export default function Services5Effect() {
    const ctxRef = useRef<GsapContext | null>(null);

    useEffect(() => {
        const steps = document.querySelectorAll<HTMLElement>(STEP_SELECTOR);
        if (!steps.length) return;

        let cancelled = false;
        let disposeRefresh: (() => void) | null = null;

        const init = async () => {
            const { gsap, ScrollTrigger } = await loadGsap();
            if (cancelled) return;

            const ctx = (gsap as unknown as {
                context: (fn: () => void) => GsapContext;
            }).context(() => {
                const items = gsap.utils.toArray<HTMLElement>(steps);
                const trigger = items[0].parentElement ?? items[0];

                gsap.fromTo(
                    items,
                    { y: 36, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: prefersReducedMotion() ? 0.01 : 0.7,
                        stagger: prefersReducedMotion() ? 0 : 0.1,
                        ease: "power2.out",
                        immediateRender: false,
                        scrollTrigger: {
                            trigger,
                            start: "top 80%",
                            once: true,
                        },
                    }
                );
            });

            if (cancelled) {
                ctx.revert();
                return;
            }
            ctxRef.current = ctx;

            // Wrapper/item heights only settle after images + smooth scroll setup.
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
