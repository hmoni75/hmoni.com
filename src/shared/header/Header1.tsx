import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MainMenu from "@/shared/MainMenu";
import ThemeSwitcher from "@/shared/ThemeSwitcher";
import { downloadCv } from "@/services/api";

interface Header1Props {
  onOpenSearch?: () => void;
  onToggleSidebar?: () => void;
  onOpenHamburgerMenu?: () => void;
}

export default function Header1({
  onOpenSearch,
  onToggleSidebar,
  onOpenHamburgerMenu,
}: Header1Props) {
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const SCROLL_THRESHOLD = 20;
    const handleScroll = () => {
      const scrollY = window.scrollY ?? window.pageYOffset;
      setStickyVisible(scrollY >= SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <div className="at-header-area at-header-spacing header-transparent">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-2 col-6">
              <div className="at-header-logo">
                <Link
                  to="/"
                  className="d-inline-flex align-items-center gap-2 text-decoration-none"
                >
                  <img
                    width={130}
                    height={100}
                    src="/assets/imgs/template/logo/logo-d.svg"
                    alt="H Moni"
                  />
                  {/* <h6 className="fw-700 fz-24 text-white mb-0">H Moni</h6> */}
                </Link>
              </div>
            </div>
            <div className="col-xl-8 mx-auto d-none d-xl-flex justify-content-center">
              <div className="at-main-menu menu-light d-inline-flex justify-content-center">
                <nav className="at-mobile-menu-active">
                  <MainMenu />
                </nav>
              </div>
            </div>
            <div className="col-xl-2 col-6">
              <div className="at-header-right gap-3 d-flex justify-content-end align-items-center">
                <div className="dark-light-mode">
                  <ThemeSwitcher />
                </div>
                <button
                  type="button"
                  onClick={() => downloadCv()}
                  className="at-btn text-white rounded-pill px-4 py-2 fz-14 fw-600 d-inline-flex align-items-center gap-2 border-0 text-decoration-none"
                  style={{ backgroundColor: "#F0460E", cursor: "pointer" }}
                  aria-label="Download CV"
                >
                  <span>Download CV</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        id="header-sticky"
        type="button"
        className={`hamburger-open-btn hamburger-sticky-menu${stickyVisible ? " header-sticky" : ""}`}
        onClick={onOpenHamburgerMenu}
        aria-label="Menu"
      >
        <span>MENU</span>
        <span className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5V9C10 9.26522 9.89464 9.51957 9.70711 9.70711C9.51957 9.89464 9.26522 10 9 10H5C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V5ZM14 5C14 4.73478 14.1054 4.48043 14.2929 4.29289C14.4804 4.10536 14.7348 4 15 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V9C20 9.26522 19.8946 9.51957 19.7071 9.70711C19.5196 9.89464 19.2652 10 19 10H15C14.7348 10 14.4804 9.89464 14.2929 9.70711C14.1054 9.51957 14 9.26522 14 9V5ZM4 15C4 14.7348 4.10536 14.4804 4.29289 14.2929C4.48043 14.1054 4.73478 14 5 14H9C9.26522 14 9.51957 14.1054 9.70711 14.2929C9.89464 14.4804 10 14.7348 10 15V19C10 19.2652 9.89464 19.5196 9.70711 19.7071C9.51957 19.8946 9.26522 20 9 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V15ZM14 15C14 14.7348 14.1054 14.4804 14.2929 14.2929C14.4804 14.1054 14.7348 14 15 14H19C19.2652 14 19.5196 14.1054 19.7071 14.2929C19.8946 14.4804 20 14.7348 20 15V19C20 19.2652 19.89464 19.5196 19.70711 19.7071C19.51957 19.89464 19.26522 20 19 20H15C14.7348 20 14.4804 19.89464 14.2929 19.70711C14.1054 19.51957 14 19.26522 14 19V15Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </header>
  );
}
