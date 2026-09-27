import RevealText from "@/shared/effects/RevealText";

// About 4 Section 5 - Space collage

type BentoItem =
    | {
          kind: "image";
          modifier: string;
          src: string;
          alt: string;
          width: number;
          height: number;
      }
    | {
          kind: "quote";
          modifier: string;
          quote: string;
          author: string;
      };

const BENTO_ITEMS: BentoItem[] = [
    {
        kind: "image",
        modifier: "about-4-bento--a",
        src: "/assets/imgs/pages/home-8/sec7-img-3.webp",
        alt: "H Moni workroom",
        width: 1400,
        height: 933,
    },
    {
        kind: "image",
        modifier: "about-4-bento--b",
        src: "/assets/imgs/pages/home-7/team-1-darrell.webp",
        alt: "Creative lead",
        width: 1800,
        height: 2400,
    },
    {
        kind: "image",
        modifier: "about-4-bento--c",
        src: "/assets/imgs/pages/home-12/sec-2-project-3.webp",
        alt: "Project board",
        width: 960,
        height: 960,
    },
    {
        kind: "quote",
        modifier: "about-4-bento--quote",
        quote: "“We measure success by work that still looks sharp after the launch week glow fades.”",
        author: "— Maya Chen, Design Director",
    },
    {
        kind: "image",
        modifier: "about-4-bento--d",
        src: "/assets/imgs/pages/home-8/sec7-img-5.webp",
        alt: "Detail shot",
        width: 1400,
        height: 933,
    },
];

export default function Section5() {
    return (
        <section className="about-4-space pt-40 pb-100" id="about-4-space" aria-label="Studio space">
            <div className="container">
                <div className="about-4-space__head">
                    <p className="about-4-kicker">
                        <span className="about-4-kicker__num">(05)</span>
                        Space
                    </p>
                    <h2 className="about-4-space__title reveal-text">
                        <RevealText>Rooms where work happens.</RevealText>
                    </h2>
                </div>
                <div className="about-4-space__bento">
                    {BENTO_ITEMS.map((item) =>
                        item.kind === "image" ? (
                            <figure key={item.modifier} className={`about-4-bento ${item.modifier}`}>
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    width={item.width}
                                    height={item.height}
                                    loading="lazy"
                                />
                            </figure>
                        ) : (
                            <div key={item.modifier} className={`about-4-bento ${item.modifier}`}>
                                <blockquote>
                                    <p>{item.quote}</p>
                                    <footer>{item.author}</footer>
                                </blockquote>
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}

