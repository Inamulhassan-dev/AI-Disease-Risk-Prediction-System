export default function KidneyRiskExplanation({ inputs }) {
  if (!inputs) return null;

  const issues = [];

  if (inputs.bp > 90)
    issues.push({ text: "Elevated blood pressure affects kidney function", color: "text-warning" });

  if (inputs.sc > 1.5)
    issues.push({ text: "High serum creatinine indicates kidney stress", color: "text-danger" });

  if (inputs.hemo < 11)
    issues.push({ text: "Low hemoglobin (possible anemia)", color: "text-warning" });

  if (inputs.bgr > 140)
    issues.push({ text: "High blood glucose damages kidneys", color: "text-danger" });

  if (inputs.al > 2)
    issues.push({ text: "Protein (albumin) in urine detected", color: "text-danger" });

  return (
    <div className="mt-5 p-4 bg-slate-50 rounded-lg">
      <h4 className="font-semibold mb-2">Why this kidney risk?</h4>

      {issues.length > 0 ? (
        <ul className="list-disc list-inside text-sm space-y-1">
          {issues.map((i, idx) => (
            <li key={idx} className={i.color}>{i.text}</li>
          ))}
        </ul>
      ) : (
        <p className="text-success text-sm">
          Kidney parameters are within healthy clinical ranges.
        </p>
      )}
    </div>
  );
}
