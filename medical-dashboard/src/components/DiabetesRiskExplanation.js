export default function DiabetesRiskExplanation({ data }) {
  if (!data || !data.inputs) return null;

  const reasons = [];

  if (data.inputs.glucose > 140)
    reasons.push("High blood glucose level");

  if (data.inputs.bmi > 30)
    reasons.push("High Body Mass Index (BMI)");

  if (data.inputs.age > 50)
    reasons.push("Higher age increases diabetes risk");

  if (data.inputs.bloodpressure > 90)
    reasons.push("Elevated blood pressure");

  if (data.inputs.insulin > 200)
    reasons.push("High insulin level");

  return (
    <div className="mt-4 p-4 bg-slate-50 rounded-lg">
      <h4 className="font-semibold mb-2">
        Why this risk level?
      </h4>

      {reasons.length > 0 ? (
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          {reasons.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-green-600">
          All diabetes-related values are within healthy ranges.
        </p>
      )}
    </div>
  );
}
