// About 4 Section 2 - Proof metrics strip with odometer counters
import OdometerCounter from "@/shared/elements/OdometerCounter";

const STATS: { value: React.ReactNode; label: string }[] = [
    {
        value: <OdometerCounter count={140} suffix="+" />,
        label: "Brands launched or relaunched",
    },
    {
        value: <OdometerCounter count={12} />,
        label: "Years of continuous practice",
    },
    {
        value: <OdometerCounter count={38} />,
        label: "Specialists across three hubs",
    },
    {
        value: (
            <>
                <OdometerCounter count={94} />
                <span className="about-4-stat__suffix">%</span>
            </>
        ),
        label: "Clients who retain year two",
    },
];

export default function Section2() {
    return (
        <section className="about-4-proof pt-40 pb-100" id="about-4-proof" aria-label="By the numbers">
            <div className="container">
                <div className="about-4-proof__head">
                    <p className="about-4-kicker mb-0">
                        <span className="about-4-kicker__num">(02)</span>
                        Proof
                    </p>
                    <p className="about-4-proof__note mb-0">Numbers we track—not vanity slogans.</p>
                </div>
                <div className="about-4-proof__grid">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="about-4-stat">
                            <p className="about-4-stat__value">{stat.value}</p>
                            <p className="about-4-stat__label">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
