import { Link } from "react-router-dom";
import AuthPanel from "../components/AuthPanel";
import { useApp } from "../context/AppContext";
import { diseaseList } from "../config/diseaseForms";

const diseaseDescriptions = {
  diabetes: "Predicts diabetes risk using glucose, BMI, insulin, and age.",
  heart: "Evaluates heart disease risk using blood pressure and cardiac markers.",
  kidney: "Assesses kidney risk using creatinine, blood glucose, and hemoglobin.",
  liver: "Estimates liver stress using bilirubin and liver enzymes.",
  stroke: "Evaluates cerebrovascular risk from glucose, BMI, and history factors.",
  hypertension: "Assesses blood pressure-related risk and metabolic contributors.",
  thyroid: "Evaluates thyroid imbalance risk using TSH, T3, and T4.",
  pcos: "Screens PCOS risk using hormonal and cycle-related indicators."
};

export default function Home() {
  const { t, user } = useApp();

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-10">

      <div className="card p-6 md:p-12 hero-main">
        <span className="hero-badge">Smart Preventive Health Suite</span>
        <h1 className="hero-title text-3xl md:text-5xl font-extrabold text-skin-accent mb-3">
          {t("welcomeTitle")}
        </h1>
        <p className="hero-sub text-skin-muted text-lg md:text-xl max-w-2xl mb-5">
          {t("welcomeText")}
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="module-chip">AI-Powered Screening</span>
          <span className="module-chip">Explainable Insights</span>
          <span className="module-chip">Smart PDF Reports</span>
          <span className="module-chip">Doctor Dashboard</span>
        </div>

        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="mini-tip">
            <strong>1) Select Module</strong>
            <p>Choose disease card from below.</p>
          </div>
          <div className="mini-tip">
            <strong>2) Fill Values</strong>
            <p>Use normal ranges shown under each input.</p>
          </div>
          <div className="mini-tip">
            <strong>3) Predict</strong>
            <p>Get risk, explanation, and recommendations.</p>
          </div>
          <div className="mini-tip">
            <strong>4) Save Report</strong>
            <p>Save history and download PDF instantly.</p>
          </div>
        </div>
      </div>

      <div className="feature-grid grid md:grid-cols-3 gap-6">
        <div className="card p-7">
          <span className="feature-dot" />
          <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
          <p className="text-skin-muted text-sm">
            Uses trained machine learning models to analyze patient data and
            estimate disease risk accurately.
          </p>
        </div>

        <div className="card p-7">
          <span className="feature-dot" />
          <h3 className="text-lg font-semibold mb-2">Explainable Results</h3>
          <p className="text-skin-muted text-sm">
            Provides clear explanations highlighting which clinical factors
            contributed to the predicted risk.
          </p>
        </div>

        <div className="card p-7">
          <span className="feature-dot" />
          <h3 className="text-lg font-semibold mb-2">User-Friendly</h3>
          <p className="text-skin-muted text-sm">
            Designed with guided inputs, validation, and visual feedback to help
            users enter correct medical data.
          </p>
        </div>
      </div>

      <div className="fade-up mt-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-5">Disease Prediction Modules</h2>

        <div className="module-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {diseaseList.map((name) => (
            <div key={name} className="card module-card p-6 md:p-7 flex flex-col">
              <span className="module-pill">module</span>
              <h3 className="text-lg md:text-xl font-semibold mb-2 capitalize">{name}</h3>
              <p className="text-skin-muted text-sm leading-7 flex-grow">{diseaseDescriptions[name]}</p>
              <Link to={`/${name}`} className="mt-4 btn-primary text-center">
                Start {name} Check
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6 md:p-9 fade-up">
        <h2 className="text-2xl font-bold mb-4">How the System Works</h2>

        <ol className="list-decimal list-inside space-y-2 text-skin-body">
          <li>User enters medical parameters using guided input forms.</li>
          <li>Inputs are validated and normalized for accuracy.</li>
          <li>Machine learning models analyze the data.</li>
          <li>The system predicts risk level and probability.</li>
          <li>Explanations and visual charts are generated.</li>
        </ol>
      </div>

      {!user ? <div className="fade-up"><AuthPanel /></div> : null}

      <div className="card p-6 border-l-4 border-warning">
        <h3 className="font-semibold mb-2">Medical Disclaimer</h3>
        <p className="text-sm text-skin-body">
          This system is intended for educational and decision-support purposes
          only. It does not replace professional medical diagnosis or treatment.
          Always consult a qualified healthcare provider for medical advice.
        </p>
      </div>
    </div>
  );
}
