/**
 * Shared building blocks for page-level GSAP effects ported from the HTML
 * template's per-page scripts (services-details-2..5 and friends).
 *
 * Every helper is meant to be called inside a `gsap.context()` so the tweens
 * and ScrollTriggers it creates are reverted in one go when the page unmounts.
 */

export type GsapInstance = (typeof import("gsap"))["default"];
export type ScrollTriggerStatic = (typeof import("gsap/ScrollTrigger"))["default"];

export function prefersReducedMotion(): boolean {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export async function loadGsap(): Promise<{
    gsap: GsapInstance;
    ScrollTrigger: ScrollTriggerStatic;
}> {
    const gsap = (await import("gsap")).default;
    const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
    gsap.registerPlugin(ScrollTrigger);
    return { gsap, ScrollTrigger };
}

type CounterOptions = {
    start?: string;
    duration?: number;
    /** Fixed decimal places; falls back to the element's `data-decimals`. */
    decimals?: number;
    /** Left-pads the rendered integer with zeros, e.g. 2 renders 7 as "07". */
    padStart?: number;
};

/** Counts an element's text from 0 up to its `data-to` value when scrolled into view. */
export function animateCounter(
    gsap: GsapInstance,
    ScrollTrigger: ScrollTriggerStatic,
    el: HTMLElement,
    options: CounterOptions = {}
) {
    const target = parseFloat(el.getAttribute("data-to") || "0") || 0;
    const decimals =
        options.decimals ?? (parseInt(el.getAttribute("data-decimals") || "0", 10) || 0);
    const { start = "top 90%", duration = 1.4, padStart = 0 } = options;
    const counter = { value: 0 };

    ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => {
            gsap.to(counter, {
                value: target,
                duration: prefersReducedMotion() ? 0.01 : duration,
                ease: "power2.out",
                onUpdate: () => {
                    const text = decimals
                        ? counter.value.toFixed(decimals)
                        : String(Math.round(counter.value));
                    el.textContent = padStart ? text.padStart(padStart, "0") : text;
                },
            });
        },
    });
}

type HorizontalPinOptions = {
    pin: HTMLElement;
    track: HTMLElement;
    /** Progress bar whose width is driven by scroll progress. */
    bar?: HTMLElement | null;
    /** Extra scroll distance after the track ends, as a fraction of viewport height. */
    tailFactor?: number;
    /** Trailing gap kept visible at the end of the track. */
    gap?: number;
};

/**
 * Pins a section and scrubs its track horizontally. Desktop only: below 768px
 * or with reduced motion the track keeps its native CSS scrolling behaviour.
 */
export function createHorizontalPin(
    gsap: GsapInstance,
    { pin, track, bar, tailFactor = 0.35, gap = 40 }: HorizontalPinOptions
) {
    if (window.matchMedia("(max-width: 767px)").matches || prefersReducedMotion()) {
        gsap.set(track, { clearProps: "transform" });
        return;
    }

    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + gap);

    gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => "+=" + (distance() + window.innerHeight * tailFactor),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
                if (bar) gsap.set(bar, { width: self.progress * 100 + "%" });
            },
        },
    });
}

/** Endless horizontal marquee for a track whose content is duplicated twice. */
export function createMarquee(gsap: GsapInstance, track: HTMLElement, duration = 28) {
    if (prefersReducedMotion()) return;

    const half = track.scrollWidth / 2;
    if (!half) return;

    gsap.to(track, { x: -half, duration, ease: "none", repeat: -1 });
}

/**
 * Refreshes ScrollTrigger once the layout settles and again after images load,
 * which the original page scripts did to keep pin distances correct.
 */
export function refreshAfterLayout(ScrollTrigger: ScrollTriggerStatic): () => void {
    const refresh = () => ScrollTrigger.refresh();
    const frame = window.requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    return () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener("load", refresh);
    };
}
