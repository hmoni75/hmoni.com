import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSocials as fetchSocialsApi, SocialLink } from "@/services/api";


// Footer 7 (Home 7) - Big nav with arrow SVGs, socials, decorative SVGs, contact, newsletter, "ELEVATE STARTUPS" word

const NAV_LINKS = [
  { label: "Home", href: "/index-7", delay: "0.1" },
  { label: "About", href: "/about-3", delay: "0.2" },
  { label: "Works", href: "/portfolio-1", delay: "0.3" },
  { label: "Blog", href: "/archive-3", delay: "0.4" },
  { label: "Contact", href: "/contact-1", delay: "0.5" },
];

// Social links will be fetched dynamically inside the Footer7 component

const NAV_ARROW_SVG = (
  <svg
    className="footer-7__nav-arrow"
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="13"
    viewBox="0 0 14 13"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M11.0037 3.41421L2.39712 12.0208L0.98291 10.6066L9.5895 2H2.00373V0H13.0037V11H11.0037V3.41421Z"
      fill="currentColor"
    />
  </svg>
);

const SOCIAL_ARROW_SVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="10"
    viewBox="0 0 12 10"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M7.60201e-05 6.26559L0 2.03894e-05L1.49997 -4.58971e-07L1.50004 4.87322L9.12873 4.87329L6.16652 2.12355L7.22714 1.139L12 5.56948L7.22713 10L6.16652 9.01545L9.12876 6.26566L7.60201e-05 6.26559Z"
      fill="currentColor"
    />
  </svg>
);

const DECO_SVG_1 = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="57"
    height="91"
    viewBox="0 0 57 91"
    fill="none"
  >
    <path
      opacity="0.1"
      d="M0 0L56.4024 33.572V90.336L0 56.46V0Z"
      fill="#515151"
    />
  </svg>
);

const DECO_SVG_2 = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="113"
    height="68"
    viewBox="0 0 113 68"
    fill="none"
  >
    <path
      opacity="0.3"
      d="M0 33.876L56.4024 0L112.805 33.876V34.1294L56.4024 68.0054L0 34.1294V33.876Z"
      fill="#515151"
    />
  </svg>
);

const DECO_SVG_3 = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="57"
    height="91"
    viewBox="0 0 57 91"
    fill="none"
  >
    <path
      opacity="0.2"
      d="M56.4009 0L8.7738e-05 33.5367V90.2413L56.4009 56.4008V0Z"
      fill="#515151"
    />
  </svg>
);

export default function Footer7() {
  return (
    <footer className="footer-7 overflow-hidden">
      <div className="container-2200 px-lg-5 px-3">
        {/* Top navigation */}
        <div className="footer-7__top">
          <nav className="footer-7__nav" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                className="footer-7__nav-link at_fade_anim"
                data-delay={link.delay}
                to={link.href}
              >
                <span>{link.label}</span>
                {NAV_ARROW_SVG}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-7__mid">
          <div className="row g-5">
            {/* Socials */}
            <div className="col-xxl-3 col-lg-4 col-md-6">
              <div className="alt-footer-social-item">
                <ul className="list-unstyled mb-0">
                  {socials.map((social, idx) => (
                    <li
                      key={social.id || social.label}
                      className="at_fade_anim"
                      data-delay={social.delay || `${0.1 + idx * 0.1}`}
                    >
                      <Link to={social.url} aria-label={social.label}>
                        <div className="d-flex align-items-center gap-2">
                          {/* Optional: icon can be added here based on social.platform */}
                          {social.label}
                        </div>
                        {SOCIAL_ARROW_SVG}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Decorative object */}
            <div className="col-xxl-3 d-none d-xxl-block pt-4">
              <div className="row p-relative pt-4">
                <div className="pt-4">
                  <div className="col-4 ms-auto pt-4">
                    <div className="at-about-svg-wrap">
                      {DECO_SVG_1}
                      {DECO_SVG_2}
                      {DECO_SVG_3}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="col-xxl-3 col-lg-4 col-md-6">
              <div className="footer-7__contact">
                {/* <p
                  className="footer-7__contact-line mb-1 at_fade_anim"
                  data-delay="0.1"
                >
                  <Link to="tel:+12125557398">+212 - 555-7398</Link>
                </p> */}
                <p
                  className="footer-7__contact-line mb-3 at_fade_anim"
                  data-delay="0.2"
                >
                  <Link to="mailto:hello@hmoni.com">hello@hmoni.com</Link>
                </p>
                <p
                  className="footer-7__address mb-0 at_fade_anim"
                  data-delay="0.3"
                >
                  IT Incubation & Training Center KUET, <br />
                  Khulna - 9203
                </p>

                <div
                  className="footer-7__hours mt-30 at_fade_anim"
                  data-delay="0.4"
                >
                  <p className="footer-7__hours-label mb-1">Mo - Sa</p>
                  <p className="footer-7__hours-value mb-0">9am - 5pm</p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="col-xxl-3 col-lg-4 col-md-6 ms-xxl-auto">
              <div className="footer-7__newsletter">
                <p
                  className="footer-7__newsletter-title mb-3 at_fade_anim"
                  data-delay="0.1"
                >
                  Sign up for
                  <br />
                  our monthly newsletter
                </p>
                <form
                  className="footer-7__form at_fade_anim"
                  data-delay="0.2"
                  action="#"
                  method="post"
                >
                  <label className="visually-hidden" htmlFor="footer7Email">
                    Email
                  </label>
                  <input
                    id="footer7Email"
                    className="footer-7__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <button className="footer-7__submit" type="submit">
                    <span>
                      <span className="text-1">Subscribe Now</span>
                      <span className="text-2">Subscribe Now</span>
                    </span>
                    <i aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="13"
                        viewBox="0 0 14 13"
                        fill="none"
                      >
                        <path
                          d="M11.0037 3.41421L2.39712 12.0208L0.98291 10.6066L9.5895 2H2.00373V0H13.0037V11H11.0037V3.41421Z"
                          fill="currentColor"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="13"
                        viewBox="0 0 14 13"
                        fill="none"
                      >
                        <path
                          d="M11.0037 3.41421L2.39712 12.0208L0.98291 10.6066L9.5895 2H2.00373V0H13.0037V11H11.0037V3.41421Z"
                          fill="currentColor"
                        />
                      </svg>
                    </i>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Big word */}
          <div className="at_fade_anim text-center" data-delay="0.1">
            <h2
              className="footer-7__word  fw-900 mb-0 text-scale-anim"
              aria-hidden="true"
            >
              A WORLD OF H MONI
            </h2>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-7__bottom" data-delay="0.1" data-start="100%">
          <div className="footer-7__bottom-inner d-flex flex-wrap gap-3 align-items-center justify-content-between">
            <span className="footer-7__copy">H Moni &copy; 2026</span>
            <ul className="footer-7__policies list-unstyled d-flex flex-wrap gap-3 mb-0">
              <li>
                <Link to="#">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#">Terms of Use</Link>
              </li>
              <li>
                <Link to="#">Refund Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
