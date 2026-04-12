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
    },
    liver: {
      Low: [
        "Keep a balanced low-fat diet",
        "Hydrate well and avoid binge drinking",
        "Repeat liver profile every 6-12 months"
      ],
      Moderate: [
        "Reduce fried foods and sugar-heavy meals",
        "Sleep 7-8 hours consistently",
        "Do 30 minutes brisk walk daily",
        "Book a physician follow-up"
      ],
      High: [
        "Consult gastro/hepatology specialist soon",
        "Avoid alcohol and self-medication",
        "Follow liver-friendly protein plan",
        "Schedule repeat labs in 2-4 weeks"
      ]
    },
    stroke: {
      Low: [
        "Maintain healthy BP and glucose",
        "Daily walking and hydration",
        "Sleep at regular hours"
      ],
      Moderate: [
        "Control blood pressure actively",
        "Reduce salt and processed foods",
        "Stop smoking and limit alcohol",
        "Discuss prevention plan with doctor"
      ],
      High: [
        "Seek urgent clinical review",
        "Strict BP and glucose monitoring",
        "Supervised exercise and diet program",
        "Follow stroke prevention medication advice"
      ]
    },
    hypertension: {
      Low: [
        "Continue low-sodium eating pattern",
        "Exercise 150 minutes weekly",
        "Track BP monthly"
      ],
      Moderate: [
        "Cap salt intake below 5g/day",
        "Add stress-reduction routine",
        "Improve sleep quality",
        "Review BP with clinician"
      ],
      High: [
        "Prompt doctor consultation",
        "Home BP log twice daily",
        "Weight-loss and DASH-style diet",
        "Check medication adherence"
      ]
    },
    thyroid: {
      Low: [
        "Maintain regular sleep and nutrition",
        "Repeat thyroid tests periodically",
        "Track fatigue and weight changes"
      ],
      Moderate: [
        "Consult endocrinology clinic",
        "Optimize iodine-balanced diet",
        "Prioritize 7-8 hours sleep",
        "Repeat thyroid profile in 6-8 weeks"
      ],
      High: [
        "Medical review recommended soon",
        "Follow structured thyroid treatment plan",
        "Monitor pulse, weight and symptoms",
        "Do not self-adjust medicines"
      ]
    },
    pcos: {
      Low: [
        "Maintain activity and healthy weight",
        "Track cycle dates monthly",
        "Balanced protein-fiber meals"
      ],
      Moderate: [
        "Consult gynecology/endocrine clinic",
        "Add insulin-sensitive diet pattern",
        "Strength training 3 days/week",
        "Sleep and stress stabilization"
      ],
      High: [
        "Clinical evaluation for hormone plan",
        "Close cycle and metabolic monitoring",
        "Structured nutrition + exercise protocol",
        "Follow-up every 4-8 weeks"
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
    <div className="mt-6 p-5 bg-skin-soft border-l-4 border-primary rounded-lg fade-up">
      <h4 className="font-semibold mb-2">
        Personalized Next Steps
      </h4>

      <ul className="list-disc list-inside text-sm text-skin-body space-y-1">
        {recommendations[disease][key].map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>

      <p className="text-xs text-skin-muted mt-3">
        *These are general suggestions and do not replace professional medical advice.
      </p>
    </div>
  );
}
