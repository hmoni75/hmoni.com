import { useEffect, useRef } from "react";

type GsapMatchMedia = { revert: () => void };

const BELIEFS_SELECTOR = "[data-about4-beliefs]";
const BELIEF_SELECTOR = "[data-about4-belief]";
const FLOAT_SELECTOR = "[data-about4-float]";
const FLOAT_IMG_SELECTOR = "[data-about4-float-img]";
const OFFSET_X = 28;
const OFFSET_Y = 20;
const EDGE_PAD = 16;

/**
 * About 04 page script: ScrollTrigger stagger reveal of the beliefs list plus a
 * cursor-following float preview on desktop hover. Mirrors assets/js/about-4.js.
 */
export default function About4Effect() {
    const mmRef = useRef<GsapMatchMedia | null>(null);

    useEffect(() => {
        const root = document.querySelector<HTMLElement>(BELIEFS_SELECTOR);
        if (!root) return;

        let cancelled = false;
        let rafId: number | null = null;

        const init = async () => {
            const gsap = (await import("gsap")).default;
            const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
            gsap.registerPlugin(ScrollTrigger);
            if (cancelled) return;

            const mm = gsap.matchMedia();

            // Stagger each belief on scroll — transform only, never hidden with opacity.
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const items = gsap.utils.toArray<HTMLElement>(
                    root.querySelectorAll(BELIEF_SELECTOR)
                );
                if (!items.length) return;

                gsap.set(items, { clearProps: "opacity,visibility,transform" });

                gsap.fromTo(
                    items,
                    { y: 36 },
                    {
                        y: 0,
                        duration: 0.7,
                        stagger: 0.12,
                        ease: "power2.out",
                        immediateRender: false,
                        clearProps: "transform",
                        overwrite: "auto",
                        scrollTrigger: {
                            trigger: root,
                            start: "top 78%",
                            once: true,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            });

            // Floating image follows the cursor on desktop hover.
            mm.add("(min-width: 992px)", () => {
                const floatEl = root.querySelector<HTMLElement>(FLOAT_SELECTOR);
                const floatImg = floatEl?.querySelector<HTMLImageElement>(FLOAT_IMG_SELECTOR);
                const items = gsap.utils.toArray<HTMLElement>(
                    root.querySelectorAll(BELIEF_SELECTOR)
                );
                if (!floatEl || !floatImg || !items.length) return;

                // Escape ScrollSmoother transform ancestors, remembering the original
                // slot so the node can be put back where React rendered it.
                const homeParent = floatEl.parentElement;
                const homeNextSibling = floatEl.nextSibling;
                const initialSrc = floatImg.getAttribute("src") ?? "";
                document.body.appendChild(floatEl);

                gsap.set(floatEl, {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    x: 0,
                    y: 0,
                    xPercent: 0,
                    yPercent: 0,
                    autoAlpha: 0,
                    scale: 0.88,
                    pointerEvents: "none",
                    zIndex: 9999,
                });

                const xTo = gsap.quickTo(floatEl, "x", { duration: 0.4, ease: "power3.out" });
                const yTo = gsap.quickTo(floatEl, "y", { duration: 0.4, ease: "power3.out" });

                let visible = false;

                const placeAt = (clientX: number, clientY: number) => {
                    const w = floatEl.offsetWidth || 260;
                    const h = floatEl.offsetHeight || 320;
                    let x = clientX + OFFSET_X;
                    let y = clientY + OFFSET_Y;

                    if (x + w > window.innerWidth - EDGE_PAD) x = clientX - w - OFFSET_X;
                    if (x < EDGE_PAD) x = EDGE_PAD;
                    if (y + h > window.innerHeight - EDGE_PAD) y = clientY - h - OFFSET_Y;
                    if (y < EDGE_PAD) y = EDGE_PAD;

                    xTo(x);
                    yTo(y);
                };

                const hideFloat = () => {
                    if (!visible) return;
                    visible = false;
                    gsap.to(floatEl, {
                        autoAlpha: 0,
                        scale: 0.92,
                        duration: 0.28,
                        ease: "power2.in",
                        overwrite: "auto",
                    });
                };

                const showFloat = (item: HTMLElement, clientX: number, clientY: number) => {
                    const preview = item.getAttribute("data-preview");
                    if (preview) floatImg.src = preview;
                    visible = true;
                    placeAt(clientX, clientY);
                    gsap.to(floatEl, {
                        autoAlpha: 1,
                        scale: 1,
                        duration: 0.35,
                        ease: "power2.out",
                        overwrite: "auto",
                    });
                };

                const onRootMove = (event: MouseEvent) => {
                    if (!visible) return;
                    placeAt(event.clientX, event.clientY);
                };

                const onItemEnter = (event: MouseEvent) => {
                    showFloat(event.currentTarget as HTMLElement, event.clientX, event.clientY);
                };

                root.addEventListener("mousemove", onRootMove);
                items.forEach((item) => {
                    item.addEventListener("mouseenter", onItemEnter);
                    item.addEventListener("mouseleave", hideFloat);
                });

                return () => {
                    root.removeEventListener("mousemove", onRootMove);
                    items.forEach((item) => {
                        item.removeEventListener("mouseenter", onItemEnter);
                        item.removeEventListener("mouseleave", hideFloat);
                    });
                    gsap.killTweensOf(floatEl);
                    floatImg.src = initialSrc;
                    if (homeParent) {
                        homeParent.insertBefore(floatEl, homeNextSibling);
                    } else {
                        floatEl.remove();
                    }
                };
            });

            if (cancelled) {
                mm.revert();
                return;
            }
            mmRef.current = mm;

            rafId = window.requestAnimationFrame(() => {
                rafId = null;
                ScrollTrigger.refresh();
            });
        };

        init();

        return () => {
            cancelled = true;
            if (rafId !== null) window.cancelAnimationFrame(rafId);
            mmRef.current?.revert();
            mmRef.current = null;
        };
    }, []);

    return null;
}
