import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { getPricingPlans, PricingPlan } from "@/services/api";

const ARROW_SVG = (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
      fill="currentColor"
    />
  </svg>
);

const FEATURE_ICON_SVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0ZM8 5V8H5V10H8V13H10V10H13V8H10V5H8Z"
      fill="currentColor"
    />
  </svg>
);

const DEFAULT_PLANS: PricingPlan[] = [
  {
    id: 1,
    name: "Starter",
    title: "Starter",
    plan_key: "starter",
    price: "$1,200",
    billing_period: "/monthly",
    description:
      "A solid digital foundation focused on clarity, usability, and performance essentials.",
    badge: "",
    is_popular: false,
    button_text: "Get Started",
    button_link: "/contact-1",
    features: [
      "Digital strategy setup",
      "Digital audit & Insights",
      "Positioning & Messaging",
      "SEO & Technical setup",
      "Analytics tracking",
    ],
  },
  {
    id: 2,
    name: "Growth",
    title: "Growth",
    plan_key: "growth",
    price: "$2,800",
    billing_period: "/monthly",
    description:
      "A performance-driven plan to accelerate acquisition and conversion.",
    badge: "MOST POPULAR",
    is_popular: true,
    button_text: "Choose Growth",
    button_link: "/contact-1",
    features: [
      "Growth strategy",
      "Conversion optimization",
      "SEO & Content performance",
      "Campaign setup & Reporting",
      "Advance analytics tracking",
    ],
  },
  {
    id: 3,
    name: "Scale",
    title: "Scale",
    plan_key: "scale",
    price: "$3,600",
    billing_period: "/monthly",
    description:
      "A long-term digital partnership for sustainable growth at scale.",
    badge: "",
    is_popular: false,
    button_text: "Scale Your Business",
    button_link: "/contact-1",
    features: [
      "Full strategy & execution",
      "Dedicated success manager",
      "Advanced SEO & content",
      "Multi-channel campaigns",
      "Custom reporting & insights",
    ],
  },
];

const getInitialCache = (): PricingPlan[] => {
  try {
    const cached = localStorage.getItem("hmoni_pricing_plans");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return DEFAULT_PLANS;
};

type Section12PricingProps = {
  titleSlot?: ReactNode;
  footerSlot?: ReactNode;
};

export default function Section12Pricing({
  titleSlot,
  footerSlot,
}: Section12PricingProps) {
  const [plans, setPlans] = useState<PricingPlan[]>(getInitialCache);

  useEffect(() => {
    let isMounted = true;
    getPricingPlans()
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data) && data.length > 0) {
          setPlans(data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const getPriceClass = (idx: number, isPop: boolean) => {
    if (isPop || idx === 1) return "text-price-growth";
    if (idx === 2) return "text-price-scale";
    return "text-price-starter";
  };

  return (
    <>
      <div className="row align-items-end mb-60 g-4">
        <div className="col-lg-9">{titleSlot}</div>
        <div className="col-lg-3 ms-lg-auto" />
      </div>

      <div className="row justify-content-center g-4">
        {plans.map((plan, idx) => {
          const isPop = !!plan.is_popular;
          return (
            <div key={plan.id || plan.plan_key || idx} className="col-lg-4">
              <div
                className={`home-2-pricing-card ${isPop ? "home-2-pricing-card--popular" : ""}`.trim()}
              >
                {isPop && (
                  <span className="home-2-pricing-card__badge">
                    {plan.badge || "Most popular"}
                  </span>
                )}
                <div className="home-2-pricing-card__body">
                  <h4 className="home-2-pricing-card__title">{plan.title}</h4>
                  <div className="home-2-pricing-card__price">
                    <span
                      className={`home-2-pricing-card__price-value ${getPriceClass(idx, isPop)}`}
                    >
                      {plan.price}
                    </span>
                    <span className="home-2-pricing-card__price-period">
                      {plan.billing_period || "/monthly"}
                    </span>
                  </div>
                  <p className="home-2-pricing-card__desc">
                    {plan.description}
                  </p>
                  <Link
                    className="at-btn px-5"
                    to={plan.button_link || "/contact-1"}
                  >
                    <span>
                      <span className="text-1 text-capitalize">
                        {plan.button_text || "Get Started"}
                      </span>
                      <span className="text-2 text-capitalize">
                        {plan.button_text || "Get Started"}
                      </span>
                    </span>
                    <i>
                      {ARROW_SVG}
                      {ARROW_SVG}
                    </i>
                  </Link>
                </div>
                <ul className="home-2-pricing-card__features">
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <span className="home-2-pricing-card__feature-icon dark-mode-invert">
                        {FEATURE_ICON_SVG}
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
        {footerSlot}
      </div>
    </>
  );
}
