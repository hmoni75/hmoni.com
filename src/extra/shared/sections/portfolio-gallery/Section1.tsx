// Portfolio Gallery Section 1 - Intro lead-in before the pinned gallery

export default function Section1() {
    return (
        <section className="hsg-intro" aria-labelledby="hsg-intro-title">
            <div className="container">
                <span className="hsg-intro__eyebrow at_fade_anim">Featured Work</span>
                <h1 className="hsg-intro__title at_fade_anim">Stories told in motion.</h1>
                <p className="hsg-intro__desc at_fade_anim">
                    A curated showcase of recent projects. Keep scrolling to glide through the gallery
                    &mdash; each frame moves with you, and the canvas behind it changes to match.
                </p>
                <div className="hsg-intro__hint  at_fade_anim" aria-hidden="true">
                    <span className="hsg-intro__hint-label">Scroll to explore</span>
                    <span className="hsg-intro__hint-line" />
                </div>
            </div>
        </section>
    );
}
