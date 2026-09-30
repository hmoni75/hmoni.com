import { useEffect, useState } from "react";
import RevealText from "@/shared/effects/RevealText";
import { getServices, Service } from "@/services/api";

const getInitialCache = (): Service[] => {
  try {
    const cached = localStorage.getItem("hmoni_services");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [];
};

export default function Section3() {
  const [services, setServices] = useState<Service[]>(getInitialCache);

  useEffect(() => {
    let isMounted = true;
    getServices()
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
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
          {services.map((s, idx) => (
            <div
              key={s.id || s.num || idx}
              className="card-home-12-service at_fade_anim"
              data-fade-from="bottom"
              data-delay={s.delay || `${(0.05 * (idx + 1)).toFixed(2)}`}
            >
              <div className="card-home-12-service__top">
                <div className="card-home-12-service__num-wrap">
                  <span
                    className="card-home-12-service__num-line"
                    aria-hidden="true"
                  ></span>
                  <span className="card-home-12-service__num">{s.num || String(idx + 1).padStart(2, '0')}</span>
                </div>
              </div>
              <h3 className="card-home-12-service__title">{s.title}</h3>
              <p className="card-home-12-service__desc">{s.desc}</p>
              {s.tags && s.tags.length > 0 && (
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
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
