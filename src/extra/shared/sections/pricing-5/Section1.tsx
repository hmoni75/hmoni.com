import { useState } from "react";
import { Link } from "react-router-dom";
// Pricing 5 Section 1 - Dark estimate calculator (monthly/project toggle + add-on totals)

const STAR_SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
            d="M10 1.5L12.2 7.3L18.2 7.8L13.6 11.7L15 17.7L10 14.6L5 17.7L6.4 11.7L1.8 7.8L7.8 7.3L10 1.5Z"
            fill="currentColor"
        />
    </svg>
);

const PLANS = {
    monthly: { base: 4800, period: "/month", label: "Monthly" },
    project: { base: 9800, period: "/project", label: "Per project" },
} as const;

type PlanKey = keyof typeof PLANS;

const PLAN_KEYS: PlanKey[] = ["monthly", "project"];

const INCLUDED = [
    "One active request at a time",
    "Unlimited revisions in cycle",
    "Priority turnaround window",
    "Pause or cancel anytime",
];

const ADDONS = [
    { name: "addon-motion", label: "Motion design pack", price: 1150 },
    { name: "addon-illustration", label: "Illustration & brand assets", price: 850 },
    { name: "addon-photo", label: "Photography direction", price: 1350 },
    { name: "addon-deck", label: "Pitch deck or sales kit", price: 950 },
];

function formatMoney(value: number) {
    return "$" + value.toLocaleString("en-US");
}

export default function Section1() {
    const [plan, setPlan] = useState<PlanKey>("monthly");
    const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({});

    const base = PLANS[plan].base;
    const addonsSum = ADDONS.reduce(
        (sum, addon) => (selectedAddons[addon.name] ? sum + addon.price : sum),
        0
    );
    const total = base + addonsSum;

    const toggleAddon = (name: string, checked: boolean) => {
        setSelectedAddons((prev) => ({ ...prev, [name]: checked }));
    };

    return (
        <section
            className="pricing-5-hero changeless pt-150 pb-100"
            aria-label="Pricing calculator"
            data-pricing5=""
        >
            <div className="container">
                <p className="pricing-5-kicker">
                    <span className="pricing-5-kicker__num">(08)</span>
                    <span className="pricing-5-kicker__text">PRICING</span>
                </p>

                <header className="pricing-5-hero__header">
                    <h1 className="pricing-5-hero__title">
                        KNOW THE NUMBER
                        <span className="pricing-5-hero__title-accent">UP FRONT.</span>
                    </h1>
                    <p className="pricing-5-hero__sub">
                        TWO WAYS TO WORK TOGETHER: MONTH TO MONTH, OR ONE FIXED-SCOPE PROJECT.
                    </p>
                </header>

                <div className="pricing-5-card">
                    <div className="pricing-5-card__top">
                        <div className="pricing-5-brand">
                            <span className="pricing-5-brand__mark" aria-hidden="true">
                                {STAR_SVG}
                            </span>
                            <span className="pricing-5-brand__name">H Moni</span>
                        </div>

                        <div className="pricing-5-toggle" role="tablist" aria-label="Billing model">
                            {PLAN_KEYS.map((key) => (
                                <button
                                    key={key}
                                    type="button"
                                    className={`pricing-5-toggle__btn${plan === key ? " is-active" : ""}`}
                                    role="tab"
                                    aria-selected={plan === key}
                                    data-plan={key}
                                    onClick={() => setPlan(key)}
                                >
                                    {PLANS[key].label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pricing-5-card__price">
                        <p className="pricing-5-card__starts">Starts at</p>
                        <p className="pricing-5-card__amount">
                            <span data-total="">{formatMoney(total)}</span>
                            <span className="pricing-5-card__period" data-period="">
                                {PLANS[plan].period}
                            </span>
                        </p>
                        <p className="pricing-5-card__breakdown">
                            BASE <span data-base="">{formatMoney(base)}</span>
                            <span className="pricing-5-card__dot" aria-hidden="true">
                                ·
                            </span>
                            ADD-ONS +<span data-addons="">{formatMoney(addonsSum).replace("$", "")}</span>
                        </p>
                    </div>

                    <div className="pricing-5-card__cols">
                        <div className="pricing-5-col">
                            <h2 className="pricing-5-col__label">Included</h2>
                            <ul className="pricing-5-included">
                                {INCLUDED.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="pricing-5-col">
                            <h2 className="pricing-5-col__label">Add-ons</h2>
                            <ul className="pricing-5-addons">
                                {ADDONS.map((addon) => (
                                    <li key={addon.name}>
                                        <label className="pricing-5-addon">
                                            <span className="pricing-5-addon__plus" aria-hidden="true">
                                                +
                                            </span>
                                            <span className="pricing-5-addon__body">
                                                <span className="pricing-5-addon__name">{addon.label}</span>
                                                <span className="pricing-5-addon__price">
                                                    {formatMoney(addon.price)}
                                                </span>
                                            </span>
                                            <input
                                                className="pricing-5-addon__input"
                                                type="checkbox"
                                                data-addon=""
                                                value={addon.price}
                                                name={addon.name}
                                                checked={Boolean(selectedAddons[addon.name])}
                                                onChange={(e) => toggleAddon(addon.name, e.target.checked)}
                                            />
                                            <span className="pricing-5-addon__box" aria-hidden="true" />
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pricing-5-hero__footer">
                    <p className="pricing-5-note">
                        *A starting estimate. Final scope and fee are confirmed after the discovery call.
                    </p>
                    <Link className="pricing-5-cta" to="/contact-1">
                        Start a project
                    </Link>
                </div>
            </div>
        </section>
    );
}
