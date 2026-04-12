import { useMemo, useState } from "react";
import api from "../services/api";
import HelperInput from "./HelperInput";
import ResultCard from "./ResultCard";
import { diseaseForms } from "../config/diseaseForms";
import { useApp } from "../context/AppContext";

export default function DiseaseWizard({ disease }) {
  const { t, language } = useApp();
  const config = diseaseForms[disease];
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState("");

  const stepSize = 4;
  const groups = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < config.fields.length; i += stepSize) {
      chunks.push(config.fields.slice(i, i + stepSize));
    }
    return chunks;
  }, [config.fields]);

  const updateValue = (event) => {
    setError("");
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const applySample = (sampleKey) => {
    const sample = config.samples?.[sampleKey];
    if (!sample) return;
    const normalized = Object.fromEntries(
      Object.entries(sample).map(([key, value]) => [key, String(value)])
    );
    setForm(normalized);
    setResult(null);
    setError("");
    setStepIndex(0);
  };

  const validateCurrentStep = () => {
    const currentFields = groups[stepIndex];
    for (const field of currentFields) {
      const raw = form[field.name];
      if (field.required && (raw === undefined || raw === "")) {
        setError(`${field.label} is required.`);
        return false;
      }

      if (raw !== undefined && raw !== "") {
        const numeric = Number(raw);
        if (Number.isNaN(numeric)) {
          setError(`${field.label} should be a valid number.`);
          return false;
        }
        if (numeric < field.min || numeric > field.max) {
          setError(`${field.label} should be between ${field.min} and ${field.max}.`);
          return false;
        }
      }
    }
    return true;
  };

  const submit = async () => {
    if (!validateCurrentStep()) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await api.post(config.endpoint, form);
      setResult(response.data);
    } catch (_error) {
      alert("Prediction failed. Please check your inputs.");
    }

    setLoading(false);
  };

  const isLast = stepIndex === groups.length - 1;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <div className="card p-6 md:p-10 fade-up">
        <h2 className="text-2xl md:text-3xl font-semibold mb-1">{config.title}</h2>
        <p className="text-skin-muted mb-5">
          {t("step")} {stepIndex + 1} / {groups.length}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <button type="button" className="chip" onClick={() => applySample("healthy")}>Use Healthy Sample</button>
          <button type="button" className="chip" onClick={() => applySample("highRisk")}>Use High Risk Sample</button>
        </div>

        <div className="grid md:grid-cols-3 gap-3 mb-5">
          <div className="wizard-tip"><strong>Tip:</strong> Enter real lab values.</div>
          <div className="wizard-tip"><strong>Guide:</strong> Green hint means normal.</div>
          <div className="wizard-tip"><strong>Action:</strong> Use Next to continue safely.</div>
        </div>

        <div className="progress-track mb-6">
          <div className="progress-fill" style={{ width: `${((stepIndex + 1) / groups.length) * 100}%` }} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {groups[stepIndex].map((field) => (
            <HelperInput
              key={field.name}
              label={field.label}
              name={field.name}
              placeholder={field.placeholder}
              hint={field.hint}
              min={field.min}
              max={field.max}
              unit={field.unit}
              convert={field.convert}
              required={field.required}
              value={form[field.name] || ""}
              onChange={updateValue}
            />
          ))}
        </div>

        {error ? <p className="mt-4 text-sm text-red-500">{error}</p> : null}

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            type="button"
            className="btn-ghost sm:w-40"
            onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={stepIndex === 0}
          >
            {t("back")}
          </button>

          {!isLast ? (
            <button
              type="button"
              className="btn-primary sm:w-40"
              onClick={() => {
                if (!validateCurrentStep()) return;
                setStepIndex((prev) => Math.min(groups.length - 1, prev + 1));
              }}
            >
              {t("next")}
            </button>
          ) : (
            <button type="button" className="btn-primary sm:w-56" onClick={submit} disabled={loading}>
              {loading ? "..." : t("submit")}
            </button>
          )}
        </div>
      </div>

      {result ? (
        <ResultCard data={result} disease={disease} language={language} />
      ) : null}
    </div>
  );
}
