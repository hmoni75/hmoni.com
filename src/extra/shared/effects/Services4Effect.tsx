import { useEffect } from "react";
import {
    loadGsap,
    prefersReducedMotion,
    refreshAfterLayout,
    type GsapInstance,
} from "@/shared/utils/gsapPageEffects";

/**
 * Services 04 page script (assets/js/services-4.js): hero parallax scrub,
 * service index + process step reveals, and a cursor-following preview image
 * that only shows over collapsed accordion rows.
 */

const PAGE_SELECTOR = "[data-svc4-hero], [data-svc4-index], [data-svc4-engage]";
const DESKTOP_QUERY = "(min-width: 992px)";
const FLOAT_OFFSET_X = 28;
const FLOAT_OFFSET_Y = 20;
const FLOAT_EDGE_PAD = 16;

type TweenVarsLike = Record<string, unknown>;
type Reverter = { revert: () => void };

function revealOnScroll(
    g: GsapInstance,
    targets: string | Element[] | NodeListOf<Element>,
    fromVars: TweenVarsLike,
    toVars: TweenVarsLike,
    trigger: Element | string | null,
    start: string
) {
    const elements = g.utils.toArray<HTMLElement>(targets);
    if (!elements.length) return;
    if (prefersReducedMotion()) return;

    g.fromTo(elements, fromVars, {
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.1,
        overwrite: "auto",
        immediateRender: false,
        scrollTrigger: {
            trigger: trigger || elements[0],
            start,
            once: true,
            invalidateOnRefresh: true,
        },
        ...toVars,
    });
}

function initHeroParallax(g: GsapInstance) {
    const media = document.querySelector<HTMLElement>("[data-svc4-hero-media]");
    const img = media?.querySelector("img");
    if (!media || !img) return;

    g.fromTo(
        img,
        { yPercent: -6, scale: 1.08 },
        {
            yPercent: 6,
            scale: 1,
            ease: "none",
            scrollTrigger: {
                trigger: media,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        }
    );
}

function initItemStagger(g: GsapInstance) {
    const items = document.querySelectorAll<HTMLElement>("[data-svc4-item]");
    if (items.length) {
        g.set(items, { clearProps: "opacity,visibility,transform" });
    }
    revealOnScroll(
        g,
        "[data-svc4-item]",
        { y: 28 },
        { y: 0, duration: 0.7, stagger: 0.1, clearProps: "transform" },
        "[data-svc4-index]",
        "top 82%"
    );
}

function initSteps(g: GsapInstance) {
    const section = document.querySelector<HTMLElement>("[data-svc4-engage]");
    const steps = document.querySelectorAll<HTMLElement>("[data-svc4-step]");
    if (!section || !steps.length) return;

    g.set(steps, { clearProps: "opacity,visibility,transform" });

    revealOnScroll(
        g,
        steps,
        { y: 32 },
        { y: 0, duration: 0.65, stagger: 0.12, clearProps: "transform" },
        section.querySelector<HTMLElement>(".svc4-process") || section,
        "top 88%"
    );
}

/**
 * Desktop-only hover preview. The floating card is moved to <body> so it can be
 * fixed to the viewport without the section's `overflow: hidden` clipping it,
 * and is restored to its original slot on teardown.
 */
function initIndexFloat(g: GsapInstance): (() => void) | undefined {
    const root = document.querySelector<HTMLElement>("[data-svc4-index]");
    if (!root) return;

    const floatEl =
        root.querySelector<HTMLElement>("[data-svc4-float]") ??
        document.querySelector<HTMLElement>("[data-svc4-float]");
    const floatImg = floatEl?.querySelector<HTMLImageElement>("[data-svc4-float-img]");
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-svc4-item]"));
    if (!floatEl || !floatImg || !items.length) return;

    const originalParent = floatEl.parentElement;
    const originalNextSibling = floatEl.nextSibling;
    if (originalParent !== document.body) {
        document.body.appendChild(floatEl);
    }

    let visible = false;
    let activeItem: HTMLElement | null = null;

    g.set(floatEl, {
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

    const xTo = g.quickTo(floatEl, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = g.quickTo(floatEl, "y", { duration: 0.4, ease: "power3.out" });

    const isItemCollapsed = (item: HTMLElement) => {
        const panel = item.querySelector(".collapse");
        if (panel && panel.classList.contains("show")) return false;
        const btn = item.querySelector('[data-bs-toggle="collapse"]');
        if (btn && btn.getAttribute("aria-expanded") === "true") return false;
        if (btn && !btn.classList.contains("collapsed")) return false;
        return true;
    };

    const placeAt = (clientX: number, clientY: number) => {
        const w = floatEl.offsetWidth || 280;
        const h = floatEl.offsetHeight || 350;
        let x = clientX + FLOAT_OFFSET_X;
        let y = clientY + FLOAT_OFFSET_Y;
        if (x + w > window.innerWidth - FLOAT_EDGE_PAD) x = clientX - w - FLOAT_OFFSET_X;
        if (x < FLOAT_EDGE_PAD) x = FLOAT_EDGE_PAD;
        if (y + h > window.innerHeight - FLOAT_EDGE_PAD) y = clientY - h - FLOAT_OFFSET_Y;
        if (y < FLOAT_EDGE_PAD) y = FLOAT_EDGE_PAD;
        xTo(x);
        yTo(y);
    };

    const hideFloat = () => {
        activeItem = null;
        if (!visible) return;
        visible = false;
        g.to(floatEl, {
            autoAlpha: 0,
            scale: 0.92,
            duration: 0.28,
            ease: "power2.in",
            overwrite: "auto",
        });
    };

    const showFloat = (item: HTMLElement, clientX: number, clientY: number) => {
        if (!isItemCollapsed(item)) {
            hideFloat();
            return;
        }
        const preview = item.getAttribute("data-preview");
        if (preview) floatImg.src = preview;
        activeItem = item;
        visible = true;
        placeAt(clientX, clientY);
        g.to(floatEl, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
        });
    };

    const onRootMouseMove = (event: MouseEvent) => {
        if (!visible) return;
        // A row can expand while the cursor sits on it, so re-check before moving.
        if (activeItem && !isItemCollapsed(activeItem)) {
            hideFloat();
            return;
        }
        placeAt(event.clientX, event.clientY);
    };

    root.addEventListener("mousemove", onRootMouseMove);

    const removers: Array<() => void> = [
        () => root.removeEventListener("mousemove", onRootMouseMove),
    ];

    items.forEach((item) => {
        const onEnter = (event: MouseEvent) => showFloat(item, event.clientX, event.clientY);
        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", hideFloat);
        removers.push(() => {
            item.removeEventListener("mouseenter", onEnter);
            item.removeEventListener("mouseleave", hideFloat);
        });

        const panel = item.querySelector(".collapse");
        if (panel) {
            panel.addEventListener("show.bs.collapse", hideFloat);
            panel.addEventListener("shown.bs.collapse", hideFloat);
            removers.push(() => {
                panel.removeEventListener("show.bs.collapse", hideFloat);
                panel.removeEventListener("shown.bs.collapse", hideFloat);
            });
        }

        // The app's own collapse hook toggles panels without emitting the
        // Bootstrap events above, so the toggle click is the reliable signal.
        const toggle = item.querySelector('[data-bs-toggle="collapse"]');
        if (toggle) {
            toggle.addEventListener("click", hideFloat);
            removers.push(() => toggle.removeEventListener("click", hideFloat));
        }
    });

    return () => {
        removers.forEach((remove) => remove());
        if (originalParent && originalParent.isConnected) {
            originalParent.insertBefore(floatEl, originalNextSibling);
        } else {
            floatEl.remove();
        }
    };
}

export default function Services4Effect() {
    useEffect(() => {
        if (!document.querySelector(PAGE_SELECTOR)) return;

        let cancelled = false;
        let cleanup: (() => void) | null = null;

        const init = async () => {
            const { gsap, ScrollTrigger } = await loadGsap();
            if (cancelled) return;

            let mm: Reverter | null = null;

            const ctx = gsap.context(() => {
                initHeroParallax(gsap);
                initItemStagger(gsap);
                initSteps(gsap);

                const matchMedia = gsap.matchMedia();
                matchMedia.add(DESKTOP_QUERY, () => initIndexFloat(gsap));
                mm = matchMedia as unknown as Reverter;
            });

            const stopRefresh = refreshAfterLayout(ScrollTrigger);

            cleanup = () => {
                stopRefresh();
                (mm as Reverter | null)?.revert();
                ctx.revert();
            };

            if (cancelled) cleanup();
        };

        init();

        return () => {
            cancelled = true;
            cleanup?.();
            cleanup = null;
        };
    }, []);

    return null;
}
