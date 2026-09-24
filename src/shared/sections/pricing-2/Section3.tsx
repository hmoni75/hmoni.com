import RevealText from "@/shared/effects/RevealText";

// Pricing 2 Section 3 - Feature comparison table

const ARROW_SVG = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
            fill="currentColor"
        />
    </svg>
);

const YES = (
    <span className="pricing-2-table__yes" aria-label="Included">
        ✓
    </span>
);
const NO = (
    <span className="pricing-2-table__no" aria-label="Not included">
        —
    </span>
);

const ROWS: { feature: string; starter: React.ReactNode; growth: React.ReactNode; scale: React.ReactNode }[] = [
    { feature: "Strategy workshops", starter: "1 session", growth: "2 sessions", scale: "Unlimited" },
    { feature: "Brand & messaging", starter: YES, growth: YES, scale: YES },
    { feature: "SEO foundation", starter: YES, growth: YES, scale: YES },
    { feature: "Conversion optimization", starter: NO, growth: YES, scale: YES },
    { feature: "Paid campaign setup", starter: NO, growth: YES, scale: YES },
    { feature: "Dedicated manager", starter: NO, growth: NO, scale: YES },
    { feature: "Custom reporting", starter: "Monthly", growth: "Bi-weekly", scale: "Weekly" },
    { feature: "Support response", starter: "48h", growth: "24h", scale: "Same day" },
];

export default function Section3() {
    return (
        <section className="pricing-2-compare pt-100 pb-100 bg-neutral-50" aria-label="Plan comparison">
            <div className="container">
                <div className="row g-4 mb-60 align-items-end">
                    <div className="col-lg-7">
                        <span className="at-btn common-black bg-transparent rounded-0 p-0 mb-15">
                            <span className="text-uppercase">
                                <span className="text-1">compare plans</span>
                                <span className="text-2">compare plans</span>
                            </span>
                            <i>
                                {ARROW_SVG}
                                {ARROW_SVG}
                            </i>
                        </span>
                        <h2 className="h3 reveal-text fw-700 mb-0">
                            <RevealText>See exactly what each plan includes</RevealText>
                        </h2>
                    </div>
                    <div className="col-lg-5">
                        <p className="neutral-500 fz-font-lg mb-0">
                            A clear breakdown so you can pick with confidence—no hidden fees, no filler
                            features.
                        </p>
                    </div>
                </div>

                <div className="pricing-2-table-wrap">
                    <table className="pricing-2-table">
                        <thead>
                            <tr>
                                <th scope="col" className="pricing-2-table__feature-col">
                                    Features
                                </th>
                                <th scope="col">Starter</th>
                                <th scope="col" className="is-highlight">
                                    Growth
                                </th>
                                <th scope="col">Scale</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ROWS.map((row) => (
                                <tr key={row.feature}>
                                    <th scope="row">{row.feature}</th>
                                    <td>{row.starter}</td>
                                    <td className="is-highlight">{row.growth}</td>
                                    <td>{row.scale}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
