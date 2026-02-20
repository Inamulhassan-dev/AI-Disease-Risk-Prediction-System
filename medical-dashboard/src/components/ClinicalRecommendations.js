export default function ClinicalRecommendations({ disease, risk }) {
  if (!risk) return null;

  const recommendations = {
    diabetes: {
      Low: [
        "Maintain a balanced diet",
        "Continue regular physical activity",
        "Monitor blood sugar periodically"
      ],
      Moderate: [
        "Reduce sugar and refined carbohydrates",
        "Increase daily physical activity",
        "Monitor blood glucose regularly",
        "Consult a healthcare professional"
      ],
      High: [
        "Seek medical advice immediately",
        "Strictly monitor blood glucose levels",
        "Adopt a structured diet plan",
        "Regular exercise under supervision"
      ]
    },
    heart: {
      Low: [
        "Maintain a heart-healthy lifestyle",
        "Regular physical activity",
        "Balanced diet with low saturated fats"
      ],
      Moderate: [
        "Reduce cholesterol intake",
        "Monitor blood pressure regularly",
        "Avoid smoking and alcohol",
        "Consult a cardiologist"
      ],
      High: [
        "Immediate medical consultation recommended",
        "Strict control of blood pressure",
        "Low-fat, low-salt diet",
        "Avoid strenuous activity without supervision"
      ]
    },
    kidney: {
      Low: [
        "Stay hydrated",
        "Maintain normal blood pressure",
        "Regular health check-ups"
      ],
      Moderate: [
        "Limit salt and protein intake",
        "Monitor creatinine levels",
        "Control blood sugar and BP",
        "Consult a nephrologist"
      ],
      High: [
        "Seek medical care immediately",
        "Strict monitoring of kidney parameters",
        "Dietary management under medical advice",
        "Avoid nephrotoxic medications"
      ]
    }
  };

  const key =
    risk === "Low Risk"
      ? "Low"
      : risk === "Moderate Risk"
      ? "Moderate"
      : "High";

  return (
    <div className="mt-5 p-4 bg-blue-50 border-l-4 border-primary rounded-lg">
      <h4 className="font-semibold mb-2">
        Recommended Next Steps
      </h4>

      <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
        {recommendations[disease][key].map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>

      <p className="text-xs text-slate-500 mt-2">
        *These are general suggestions and do not replace professional medical advice.
      </p>
    </div>
  );
}
