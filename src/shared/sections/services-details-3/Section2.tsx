// Services Details 3 Section 2 - Outcome measures strip with counters + scrubbed progress bar

const METRICS = [
    { to: "1", unit: "story", accent: false },
    { to: "5", unit: "flows", accent: false },
    { to: "12", unit: "decisions", accent: false },
    { to: "28", unit: "days", accent: true },
];

export default function Section2() {
    return (
        <section className="sd3-out" data-sd3-out="" aria-label="Sprint measures">
            <div className="container">
                <div className="sd3-out__strip" data-sd3-out-grid="">
                    <div className="sd3-out__intro">
                        <span className="sd3-out__eyebrow">After 4 weeks</span>
                        <h2 className="sd3-out__title">Ship kit</h2>
                    </div>

                    <ul className="sd3-out__metrics">
                        {METRICS.map((metric) => (
                            <li
                                key={metric.unit}
                                className={
                                    metric.accent
                                        ? "sd3-out__metric sd3-out__metric--accent"
                                        : "sd3-out__metric"
                                }
                                data-sd3-out-card=""
                            >
                                <span className="sd3-out__num" data-sd3-count="" data-to={metric.to}>
                                    0
                                </span>
                                <span className="sd3-out__unit">{metric.unit}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="sd3-out__track" data-sd3-out-track="" aria-hidden="true">
                    <i data-sd3-out-progress="" />
                </div>
            </div>
        </section>
    );
}
