import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10">

      {/* HERO SECTION */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-primary mb-3">
          AI-Based Disease Risk Prediction System
        </h1>
        <p className="text-slate-600 text-lg">
          A smart healthcare decision-support system that predicts the risk of
          major diseases using machine learning and clinical parameters.
        </p>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2">🧠 AI-Powered</h3>
          <p className="text-slate-600 text-sm">
            Uses trained machine learning models to analyze patient data and
            estimate disease risk accurately.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2">📊 Explainable Results</h3>
          <p className="text-slate-600 text-sm">
            Provides clear explanations highlighting which clinical factors
            contributed to the predicted risk.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2">🛡️ User-Friendly</h3>
          <p className="text-slate-600 text-sm">
            Designed with guided inputs, validation, and visual feedback to help
            users enter correct medical data.
          </p>
        </div>
      </div>

      {/* DISEASE MODULES */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Disease Prediction Modules
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-2">🩸 Diabetes</h3>
            <p className="text-slate-600 text-sm flex-grow">
              Predicts diabetes risk based on glucose level, BMI, insulin,
              family history, and age.
            </p>
            <Link
              to="/diabetes"
              className="mt-4 text-primary font-semibold hover:underline"
            >
              Check Diabetes Risk →
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-2">❤️ Heart Disease</h3>
            <p className="text-slate-600 text-sm flex-grow">
              Assesses heart disease risk using chest pain type, blood pressure,
              cholesterol, heart rate, and blood sugar.
            </p>
            <Link
              to="/heart"
              className="mt-4 text-primary font-semibold hover:underline"
            >
              Check Heart Risk →
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-2">🩺 Kidney Disease</h3>
            <p className="text-slate-600 text-sm flex-grow">
              Estimates chronic kidney disease risk using blood pressure,
              creatinine, glucose, albumin, and hemoglobin levels.
            </p>
            <Link
              to="/kidney"
              className="mt-4 text-primary font-semibold hover:underline"
            >
              Check Kidney Risk →
            </Link>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-bold mb-4">How the System Works</h2>

        <ol className="list-decimal list-inside space-y-2 text-slate-700">
          <li>User enters medical parameters using guided input forms.</li>
          <li>Inputs are validated and normalized for accuracy.</li>
          <li>Machine learning models analyze the data.</li>
          <li>The system predicts risk level and probability.</li>
          <li>Explanations and visual charts are generated.</li>
        </ol>
      </div>

      {/* DISCLAIMER */}
      <div className="bg-yellow-50 border-l-4 border-warning p-6 rounded-xl">
        <h3 className="font-semibold mb-2">⚠️ Medical Disclaimer</h3>
        <p className="text-sm text-slate-700">
          This system is intended for educational and decision-support purposes
          only. It does not replace professional medical diagnosis or treatment.
          Always consult a qualified healthcare provider for medical advice.
        </p>
      </div>

    </div>
  );
}
