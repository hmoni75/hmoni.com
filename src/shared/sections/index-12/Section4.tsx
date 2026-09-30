import { useEffect, useState } from "react";
import RevealText from "@/shared/effects/RevealText";
import { getProcessSteps, ProcessStep, getImgSrc } from "@/services/api";

const getInitialCache = (): ProcessStep[] => {
  try {
    const cached = localStorage.getItem("hmoni_process");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [];
};

export default function Section4() {
  const [steps, setSteps] = useState<ProcessStep[]>(getInitialCache);

  useEffect(() => {
    let isMounted = true;
    getProcessSteps()
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data) && data.length > 0) {
          setSteps(data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const getStepImage = (p: ProcessStep, idx: number) => {
    if (p.image_url) return getImgSrc(p.image_url);
    if (p.img && (p.img.startsWith("/") || p.img.startsWith("http"))) {
      return getImgSrc(p.img);
    }
    const defaultImgs = [
      "sec-4-process-10.png",
      "sec-4-process-12.png",
      "sec-4-process-11.png",
    ];
    const imgName = p.img || defaultImgs[idx % defaultImgs.length];
    return `/assets/imgs/pages/home-12/${imgName}`;
  };

  return (
    <section className="sec-4-home-12" aria-label="Process Philosophy">
      <div className="container">
        <header className="sec-4-home-12__header">
          <p
            className="sec-4-home-12__eyebrow at_fade_anim"
            data-fade-from="bottom"
            data-delay=".05"
          >
            PROCESS PHILOSOPHY
          </p>
          <h2 className="sec-4-home-12__title reveal-text mb-0">
            <RevealText>Deep Strategy. Pure Craft. Fast Dev.</RevealText>
          </h2>
        </header>

        <div className="sec-4-home-12__row">
          {steps.map((p, idx) => (
            <div
              key={p.id || p.title || idx}
              className="card-home-12-process at_fade_anim"
              data-fade-from="bottom"
              data-delay={p.delay || `${(0.05 + idx * 0.1).toFixed(2)}`}
            >
              <div className="card-home-12-process__image anim-zoomin-wrap">
                <img
                  className="card-home-12-process__img anim-zoomin"
                  src={getStepImage(p, idx)}
                  alt={p.title}
                  loading="lazy"
                />
              </div>
              <div className="card-home-12-process__text">
                <h3 className="card-home-12-process__title">
                  {p.step_num ? `${p.step_num}. ` : ""}
                  {p.title}
                </h3>
                <p className="card-home-12-process__desc">
                  {p.desc || p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
