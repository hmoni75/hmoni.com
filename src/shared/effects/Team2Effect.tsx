import { useEffect, useRef } from "react";

type GsapMatchMedia = { revert: () => void };

/**
 * Team 02 page motion: hero title clip-reveal, animated head count, meta
 * stagger, roster hover/focus portrait crossfade and the discipline card
 * scroll stagger. Mirrors assets/js/team-2.js.
 */
export default function Team2Effect() {
    const mmRef = useRef<GsapMatchMedia | null>(null);

    useEffect(() => {
        if (!document.querySelector(".team2-page")) return;

        let cancelled = false;

        const init = async () => {
            const gsap = (await import("gsap")).default;
            const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
            gsap.registerPlugin(ScrollTrigger);
            if (cancelled) return;

            const mm = gsap.matchMedia();

            mm.add(
                {
                    motion: "(prefers-reduced-motion: no-preference)",
                    reduced: "(prefers-reduced-motion: reduce)",
                },
                (ctx) => {
                    const motion = Boolean(ctx.conditions?.motion);
                    const cleanups: Array<() => void> = [];

                    // ---- Hero -------------------------------------------------
                    const hero = document.querySelector<HTMLElement>("[data-team2-hero]");
                    if (hero) {
                        const lines = gsap.utils.toArray<HTMLElement>(
                            hero.querySelectorAll("[data-team2-title-line]")
                        );

                        if (lines.length && motion) {
                            const inners: HTMLElement[] = [];
                            // Wrapping is idempotent: only lines this run wrapped are unwrapped
                            // on cleanup, so a re-render or repeat visit never double-wraps.
                            const wrappedLines: HTMLElement[] = [];

                            lines.forEach((line) => {
                                let inner = line.querySelector<HTMLElement>(
                                    ":scope > .team2-hero__line-inner"
                                );
                                if (!inner) {
                                    inner = document.createElement("span");
                                    inner.className = "team2-hero__line-inner";
                                    while (line.firstChild) inner.appendChild(line.firstChild);
                                    line.appendChild(inner);
                                    wrappedLines.push(line);
                                }
                                inners.push(inner);
                            });

                            if (inners.length) {
                                gsap.fromTo(
                                    inners,
                                    { yPercent: 110 },
                                    {
                                        yPercent: 0,
                                        duration: 0.95,
                                        stagger: 0.1,
                                        ease: "power3.out",
                                        delay: 0.1,
                                    }
                                );
                            }

                            cleanups.push(() => {
                                wrappedLines.forEach((line) => {
                                    const inner = line.querySelector<HTMLElement>(
                                        ":scope > .team2-hero__line-inner"
                                    );
                                    if (!inner) return;
                                    while (inner.firstChild) {
                                        line.insertBefore(inner.firstChild, inner);
                                    }
                                    inner.remove();
                                });
                            });
                        }

                        const countEl = hero.querySelector<HTMLElement>("[data-team2-count]");
                        if (countEl) {
                            const target = parseFloat(countEl.getAttribute("data-to") ?? "") || 0;
                            const initialCount = countEl.textContent;
                            const counter = { v: 0 };
                            let countTween: ReturnType<typeof gsap.to> | null = null;

                            ScrollTrigger.create({
                                trigger: countEl,
                                start: "top 90%",
                                once: true,
                                onEnter: () => {
                                    countTween = gsap.to(counter, {
                                        v: target,
                                        duration: motion ? 1.2 : 0.01,
                                        ease: "power2.out",
                                        onUpdate: () => {
                                            countEl.textContent = String(Math.round(counter.v));
                                        },
                                    });
                                },
                            });

                            cleanups.push(() => {
                                countTween?.kill();
                                countEl.textContent = initialCount;
                            });
                        }

                        const meta = gsap.utils.toArray<HTMLElement>(
                            hero.querySelectorAll("[data-team2-meta] li")
                        );
                        if (meta.length && motion) {
                            gsap.fromTo(
                                meta,
                                { y: 16, opacity: 0 },
                                {
                                    y: 0,
                                    opacity: 1,
                                    duration: 0.45,
                                    stagger: 0.06,
                                    ease: "power2.out",
                                    delay: 0.4,
                                }
                            );
                        }
                    }

                    // ---- Roster -----------------------------------------------
                    const roster = document.querySelector<HTMLElement>("[data-team2-roster]");
                    if (roster) {
                        const people = gsap.utils.toArray<HTMLElement>(
                            roster.querySelectorAll("[data-team2-person]")
                        );
                        const img = roster.querySelector<HTMLImageElement>(
                            "[data-team2-preview-img]"
                        );
                        const nameEl = roster.querySelector<HTMLElement>(
                            "[data-team2-preview-name]"
                        );
                        const roleEl = roster.querySelector<HTMLElement>(
                            "[data-team2-preview-role]"
                        );

                        if (people.length && img) {
                            const initial = {
                                src: img.getAttribute("src"),
                                srcset: img.getAttribute("srcset"),
                                alt: img.getAttribute("alt"),
                                active: people.filter((p) => p.classList.contains("is-active")),
                                name: nameEl?.textContent ?? null,
                                role: roleEl?.textContent ?? null,
                            };

                            const swapSource = (src: string, name: string) => {
                                // next/image emits a srcset that would win over a plain src
                                // swap, so drop it before pointing at the new portrait.
                                img.removeAttribute("srcset");
                                img.setAttribute("src", src);
                                img.setAttribute("alt", name);
                            };

                            const activate = (person: HTMLElement) => {
                                people.forEach((p) => {
                                    p.classList.toggle("is-active", p === person);
                                });
                                const src = person.getAttribute("data-img");
                                const name = person.getAttribute("data-name") ?? "";
                                const role = person.getAttribute("data-role") ?? "";

                                if (src && img.getAttribute("src") !== src) {
                                    if (motion) {
                                        gsap.to(img, {
                                            opacity: 0,
                                            scale: 1.04,
                                            duration: 0.18,
                                            onComplete: () => {
                                                swapSource(src, name);
                                                gsap.fromTo(
                                                    img,
                                                    { opacity: 0, scale: 1.06 },
                                                    {
                                                        opacity: 1,
                                                        scale: 1,
                                                        duration: 0.4,
                                                        ease: "power2.out",
                                                    }
                                                );
                                            },
                                        });
                                    } else {
                                        swapSource(src, name);
                                    }
                                }
                                if (nameEl) nameEl.textContent = name;
                                if (roleEl) roleEl.textContent = role;
                            };

                            const handlers = people.map((person) => {
                                const onActivate = () => activate(person);
                                person.addEventListener("mouseenter", onActivate);
                                person.addEventListener("focusin", onActivate);
                                return { person, onActivate };
                            });

                            cleanups.push(() => {
                                handlers.forEach(({ person, onActivate }) => {
                                    person.removeEventListener("mouseenter", onActivate);
                                    person.removeEventListener("focusin", onActivate);
                                });
                                gsap.killTweensOf(img);
                                people.forEach((p) =>
                                    p.classList.toggle("is-active", initial.active.includes(p))
                                );
                                if (initial.src) img.setAttribute("src", initial.src);
                                if (initial.srcset) img.setAttribute("srcset", initial.srcset);
                                if (initial.alt !== null) img.setAttribute("alt", initial.alt);
                                if (nameEl) nameEl.textContent = initial.name;
                                if (roleEl) roleEl.textContent = initial.role;
                            });

                            if (motion) {
                                gsap.fromTo(
                                    people,
                                    { y: 20, opacity: 0 },
                                    {
                                        y: 0,
                                        opacity: 1,
                                        duration: 0.45,
                                        stagger: 0.05,
                                        ease: "power2.out",
                                        scrollTrigger: {
                                            trigger: roster,
                                            start: "top 80%",
                                            once: true,
                                        },
                                    }
                                );
                            }
                        }
                    }

                    // ---- Disciplines ------------------------------------------
                    const cards = gsap.utils.toArray<HTMLElement>(
                        document.querySelectorAll("[data-team2-disc-card]")
                    );
                    if (cards.length && motion) {
                        gsap.fromTo(
                            cards,
                            { y: 28, opacity: 0 },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.5,
                                stagger: 0.08,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: cards[0].parentElement,
                                    start: "top 88%",
                                    once: true,
                                },
                            }
                        );
                    }

                    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
                    cleanups.push(() => cancelAnimationFrame(raf));

                    return () => {
                        cleanups.forEach((fn) => fn());
                    };
                }
            );

            if (cancelled) {
                mm.revert();
                return;
            }
            mmRef.current = mm;
        };

        init();

        return () => {
            cancelled = true;
            mmRef.current?.revert();
            mmRef.current = null;
        };
    }, []);

    return null;
}
