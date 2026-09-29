import { useEffect, useState } from "react";
import RevealText from "@/shared/effects/RevealText";
import { getServices, Service } from "@/services/api";

const DEFAULT_SERVICES: Service[] = [
  {
    id: 1,
    delay: "0.05",
    num: "01",
    title: "Brand Identity",
    desc: "Logo systems, type pairings, color, and visual language that travels across every touchpoint.",
    tags: ["Logo", "Type system", "Guidelines"],
  },
  {
    id: 2,
    delay: "0.1",
    num: "02",
    title: "Web Design",
    desc: "Marketing sites, portfolios, and product pages designed in Figma and ready for development.",
    tags: ["Landing", "Portfolio", "Marketing"],
  },
  {
    id: 3,
    delay: "0.15",
    num: "03",
    title: "Webflow & Framer",
    desc: "Hand-built no-code sites with motion, CMS, and clean structure you can actually maintain.",
    tags: ["Framer", "Webflow", "CMS"],
  },
  {
    id: 4,
    delay: "0.2",
    num: "04",
    title: "Product UI/UX",
    desc: "Dashboards, onboarding flows, and product surfaces — clear, considered, ready for engineering.",
    tags: ["Dashboard", "App UI", "Flows"],
  },
  {
    id: 5,
    delay: "0.25",
    num: "05",
    title: "Art Direction",
    desc: "Visual systems, photography direction, and editorial layouts for brands that need a point of view.",
    tags: ["Editorial", "Photography", "Style"],
  },
  {
    id: 6,
    delay: "0.3",
    num: "06",
    title: "Front-End Build",
    desc: "Pixel-perfect React or Next.js builds, accessible by default and shipped with care.",
    tags: ["React", "Next.js", "Tailwind"],
  },
];

export default function Section3() {
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);

  useEffect(() => {
    getServices().then((data) => {
      if (data && data.length > 0) {
        setServices(data);
      }
    });
  }, []);
  return (
    <section className="sec-3-home-12" aria-label="Our Services">
      <div className="container">
        <header className="sec-3-home-12__header">
          <div className="sec-3-home-12__header-left">
            <p
              className="sec-3-home-12__eyebrow at_fade_anim"
              data-fade-from="bottom"
              data-delay=".05"
            >
              OUR SERVICES
            </p>
            <h2 className="sec-3-home-12__title reveal-text mb-0">
              <RevealText>What we do, with intention.</RevealText>
            </h2>
          </div>
          <p
            className="sec-3-home-12__lede at_fade_anim mb-0"
            data-fade-from="bottom"
            data-delay=".15"
          >
            A focused set of services designed to help brands look sharp, ship
            fast, and grow with confidence — no fluff, no filler.
          </p>
        </header>

        <div className="sec-3-home-12__grid">
          {services.map((s) => (
            <div
              key={s.num}
              className="card-home-12-service at_fade_anim"
              data-fade-from="bottom"
              data-delay={s.delay}
            >
              <div className="card-home-12-service__top">
                <div className="card-home-12-service__num-wrap">
                  <span
                    className="card-home-12-service__num-line"
                    aria-hidden="true"
                  ></span>
                  <span className="card-home-12-service__num">{s.num}</span>
                </div>
              </div>
              <h3 className="card-home-12-service__title">{s.title}</h3>
              <p className="card-home-12-service__desc">{s.desc}</p>
              <ul
                className="card-home-12-service__tags"
                aria-label="Service tags"
              >
                {s.tags.map((tag) => (
                  <li key={tag}>
                    <span className="card-home-12-service__tag">{tag}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
