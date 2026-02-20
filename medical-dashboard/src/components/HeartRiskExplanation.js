export default function HeartRiskExplanation({ inputs }) {
  if (!inputs) return null;

  const issues = [];

  if (inputs.age > 55)
    issues.push({ text: "Higher age increases heart disease risk", color: "text-warning" });

  if (inputs.trestbps > 140)
    issues.push({ text: "High resting blood pressure", color: "text-danger" });

  if (inputs.chol > 240)
    issues.push({ text: "Very high cholesterol level", color: "text-danger" });

  if (inputs.thalach < 100)
    issues.push({ text: "Low maximum heart rate", color: "text-warning" });

  if (inputs.fbs === 1)
    issues.push({ text: "High fasting blood sugar", color: "text-warning" });

  return (
    <div className="mt-5 p-4 bg-slate-50 rounded-lg">
      <h4 className="font-semibold mb-2">Why this heart risk?</h4>

      {issues.length > 0 ? (
        <ul className="list-disc list-inside text-sm space-y-1">
          {issues.map((i, idx) => (
            <li key={idx} className={i.color}>{i.text}</li>
          ))}
        </ul>
      ) : (
        <p className="text-success text-sm">
          All heart-related parameters are within healthy clinical ranges.
        </p>
      )}
    </div>
  );
}
