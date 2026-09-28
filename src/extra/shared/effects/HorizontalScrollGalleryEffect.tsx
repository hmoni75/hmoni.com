import { useEffect } from "react";
import { loadGsap, refreshAfterLayout } from "@/shared/utils/gsapPageEffects";

type GsapContextLike = { revert: () => void };

/**
 * Pins `.hsg-stage` and converts vertical scroll into horizontal travel of
 * `.hsg-track`, crossfading the matching background layer and driving the
 * progress bar and counter. Mirrors assets/js/horizontal-scroll-gallery.js,
 * except the background layers are rendered by the section instead of being
 * injected here.
 *
 * Each slide publishes three custom properties consumed by the stylesheet:
 *   --hsg-norm          signed distance from viewport center (-1.5..1.5)
 *   --hsg-centeredness  unsigned closeness in [0, 1]
 *   --hsg-exit          per-slide segment progress in [0, 1]
 */
export default function HorizontalScrollGalleryEffect() {
    useEffect(() => {
        const stage = document.querySelector<HTMLElement>(".hsg-stage");
        if (!stage) return;

        let cancelled = false;
        let ctx: GsapContextLike | null = null;
        let disposeRefresh: (() => void) | null = null;

        const init = async () => {
            const { gsap, ScrollTrigger } = await loadGsap();
            if (cancelled) return;

            const track = stage.querySelector<HTMLElement>(".hsg-track");
            const slides = Array.from(stage.querySelectorAll<HTMLElement>(".hsg-slide"));
            if (!track || slides.length === 0) return;

            const bgLayers = Array.from(stage.querySelectorAll<HTMLElement>(".hsg-bg"));
            const progressBar = stage.querySelector<HTMLElement>(".hsg-progress__bar");
            const counterCurrent = stage.querySelector<HTMLElement>(".hsg-counter__current");
            const total = slides.length;

            // Only the first slide is visible at rest; the rest sit 50svw apart.
            slides.forEach((slide, i) => {
                slide.style.marginLeft = i === 0 ? "0" : "50svw";
            });

            // Side padding centers the first slide at rest and the last one at the end.
            const applyTrackPadding = () => {
                const slideWidth = slides[0].getBoundingClientRect().width;
                const pad = Math.max((window.innerWidth - slideWidth) / 2, 0);
                track.style.paddingLeft = pad + "px";
                track.style.paddingRight = pad + "px";
            };

            const getScrollDistance = () => Math.max(track.scrollWidth - window.innerWidth, 0);

            const setActive = (index: number) => {
                slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
                bgLayers.forEach((bg, i) => bg.classList.toggle("is-active", i === index));
                if (counterCurrent) {
                    counterCurrent.textContent = String(index + 1).padStart(2, "0");
                }
            };

            const updateParallax = (progress?: number) => {
                const halfVw = window.innerWidth / 2;
                slides.forEach((slide, i) => {
                    const rect = slide.getBoundingClientRect();
                    const center = rect.left + rect.width / 2;
                    const norm = Math.min(
                        Math.max((center - halfVw) / window.innerWidth, -1.5),
                        1.5
                    );
                    const centeredness = 1 - Math.min(Math.abs(norm), 1);
                    slide.style.setProperty("--hsg-norm", norm.toFixed(3));
                    slide.style.setProperty("--hsg-centeredness", centeredness.toFixed(3));

                    if (typeof progress === "number") {
                        const local = progress * total - i;
                        const exit = local < 0 ? 0 : local > 1 ? 1 : local;
                        slide.style.setProperty("--hsg-exit", exit.toFixed(3));
                    }
                });
            };

            applyTrackPadding();

            ctx = gsap.context(() => {
                gsap.to(track, {
                    x: () => -getScrollDistance(),
                    ease: "none",
                    scrollTrigger: {
                        trigger: stage,
                        start: "top top",
                        // Pin length equals horizontal distance so 1px of scroll moves 1px.
                        end: () => "+=" + getScrollDistance(),
                        pin: true,
                        pinSpacing: true,
                        scrub: 0.6,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        // Re-center before the distance is measured, otherwise the first
                        // refresh reads stale padding.
                        onRefreshInit: applyTrackPadding,
                        onUpdate: (self) => {
                            const progress = self.progress;
                            setActive(Math.min(Math.floor(progress * total), total - 1));
                            updateParallax(progress);
                            if (progressBar) {
                                progressBar.style.transform = `scaleX(${progress})`;
                            }
                        },
                    },
                });
            }, stage);

            updateParallax(0);
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
