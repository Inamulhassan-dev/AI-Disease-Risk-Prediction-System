export default function RiskGauge({ value }) {
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (value / 100) * circumference;

  const color =
    value < 40
      ? "#22c55e"
      : value < 70
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div className="flex justify-center my-6">
      <div className="relative w-[140px] h-[140px] flex items-center justify-center">
        {/* Percentage Text */}
        <div className="absolute text-center">
          <div className="text-2xl font-bold">{value}%</div>
          <div className="text-xs text-slate-500">
            Risk Probability
          </div>
        </div>

        {/* SVG Gauge */}
        <svg height="140" width="140">
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="70"
            cy="70"
          />
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
            r={normalizedRadius}
            cx="70"
            cy="70"
          />
        </svg>
      </div>
    </div>
  );
}
