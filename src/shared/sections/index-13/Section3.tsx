import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RevealText from "@/shared/effects/RevealText";
import { getProjects, Project } from "@/services/api";

const ARROW_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="15"
    viewBox="0 0 16 15"
    fill="none"
  >
    <path
      d="M0.0001297 8.99993L0 3.00407e-05L2 0L2.0001 6.99993L12.1719 7.00003L8.22224 3.05027L9.63644 1.63606L16.0003 8.00003L9.63644 14.364L8.22224 12.9497L12.1719 9.00003L0.0001297 8.99993Z"
      fill="currentColor"
    />
  </svg>
);

const getInitialCache = (): Project[] => {
  try {
    const cached = localStorage.getItem("hmoni_projects");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [];
};

export default function Section3() {
  const [projects, setProjects] = useState<Project[]>(getInitialCache);
  const [isLoading, setIsLoading] = useState<boolean>(
    () => projects.length === 0,
  );

  useEffect(() => {
    let isMounted = true;
    getProjects()
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
        setIsLoading(false);
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const getImgSrc = (img?: string) => {
    if (!img) return "/assets/imgs/pages/home-13/sec-3-img-1.webp";
    if (
      img.startsWith("http://") ||
      img.startsWith("https://") ||
      img.startsWith("data:")
    ) {
      return img;
    }
    if (img.startsWith("/")) {
      return img;
    }
    if (img.startsWith("uploads/") || img.startsWith("storage/")) {
      return `https://manage.hmoni.com/${img}`;
    }
    return `/assets/imgs/pages/home-13/${img}`;
  };

  return (
    <section className="sec-3-home-13" aria-label="Selected Projects">
      <style>{`
        @keyframes projShimmerWave {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .proj-skeleton-card {
          width: 100%;
          height: 380px;
          border-radius: 20px;
          background: linear-gradient(90deg, #18181b 25%, #27272a 50%, #18181b 75%);
          background-size: 200% 100%;
          animation: projShimmerWave 1.8s infinite linear;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>

      <div className="sec-3-home-13__inner">
        <header className="sec-3-home-13__header">
          <div className="sec-3-home-13__head-text">
            <div
              className="sec-3-home-13__label at_fade_anim"
              data-fade-from="left"
              data-delay=".05"
            >
              <span
                className="sec-3-home-13__label-dot"
                aria-hidden="true"
              ></span>
              <span className="sec-3-home-13__label-text">
                SELECTED PROJECTS
              </span>
            </div>
            <h2 className="sec-3-home-13__title mb-0 reveal-text">
              <RevealText>Recent works that define </RevealText>
              <span className="sec-3-home-13__title-italic">
                <RevealText>our architectural vision.</RevealText>
              </span>
            </h2>
          </div>

          <div
            className="at-btn-group at_fade_anim"
            data-delay=".4"
            data-fade-from="bottom"
            data-ease="bounce"
          >
            <Link className="at-btn-circle" to="/portfolio-1">
              {ARROW_ICON}
            </Link>
            <Link className="at-btn z-index-1" to="/portfolio-1">
              View latest projects
            </Link>
            <Link className="at-btn-circle" to="/portfolio-1">
              {ARROW_ICON}
            </Link>
          </div>
        </header>

        <div className="sec-3-home-13__list">
          {isLoading && projects.length === 0 ? (
            <div className="d-flex flex-column gap-4 w-100 py-3">
              <div className="proj-skeleton-card"></div>
              <div className="proj-skeleton-card"></div>
            </div>
          ) : (
            projects.map((p, i) => (
              <article key={p.id || i} className="sec-3-home-13__card">
                <div className="sec-3-home-13__card-meta">
                  <p className="sec-3-home-13__card-loc mb-0">
                    {p.location || "GLOBAL — 2024"}
                  </p>
                  <h3 className="sec-3-home-13__card-title mb-0 reveal-text">
                    <RevealText>{p.title}</RevealText>
                  </h3>
                  <Link
                    className="sec-3-home-13__card-link"
                    to={p.link || "/portfolio-details-1"}
                  >
                    <span>VIEW DETAILS</span>
                    <span
                      className="sec-3-home-13__card-link-dots"
                      aria-hidden="true"
                    >
                      • • •
                    </span>
                  </Link>
                </div>
                <Link
                  className="sec-3-home-13__card-media anim-zoomin-wrap"
                  to={p.link || "/portfolio-details-1"}
                >
                  <img
                    className="anim-zoomin"
                    data-speed=".8"
                    src={getImgSrc(p.img)}
                    alt={p.title}
                    loading="lazy"
                  />
                </Link>
                <div className="sec-3-home-13__card-info">
                  <p className="sec-3-home-13__card-desc mb-0">
                    {p.description ||
                      "Bespoke digital architecture and engineering."}
                  </p>
                  <dl className="sec-3-home-13__card-specs mb-0">
                    <div className="sec-3-home-13__card-row">
                      <dt>CATEGORY</dt>
                      <dd>{p.category || "Residential"}</dd>
                    </div>
                    <div className="sec-3-home-13__card-row">
                      <dt>SIZE</dt>
                      <dd>{p.size || "Custom System"}</dd>
                    </div>
                    <div className="sec-3-home-13__card-row">
                      <dt>SERVICE</dt>
                      <dd>{p.service || "Engineering"}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
