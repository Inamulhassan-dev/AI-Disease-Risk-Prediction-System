import { useState } from "react";
import api from "../services/api";
import HelperInput from "../components/HelperInput";
import ResultCard from "../components/ResultCard";

export default function Diabetes() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await api.post("/diabetes", form);
      setResult(res.data);
    } catch (err) {
      alert("Diabetes prediction failed. Please check inputs.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* FORM CARD */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-2">
          Diabetes Risk Assessment
        </h2>

        <p className="text-slate-500 mb-6">
          Enter clinical values carefully. Input ranges are shown for guidance.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <HelperInput
            label="Pregnancies"
            name="pregnancies"
            placeholder="e.g. 2"
            hint="Number of times pregnant"
            min={0}
            max={15}
            onChange={handleChange}
          />

          <HelperInput
            label="Glucose (mg/dL)"
            name="glucose"
            placeholder="e.g. 120"
            hint="Normal fasting: 70–140"
            min={70}
            max={200}
            onChange={handleChange}
          />

          <HelperInput
            label="Blood Pressure (mm Hg)"
            name="bloodpressure"
            placeholder="e.g. 80"
            hint="Normal: 60–90"
            min={60}
            max={120}
            onChange={handleChange}
          />

          <HelperInput
            label="Skin Thickness (mm)"
            name="skinthickness"
            placeholder="e.g. 20"
            hint="Typical: 10–50"
            min={10}
            max={60}
            onChange={handleChange}
          />

          <HelperInput
            label="Insulin (μU/mL)"
            name="insulin"
            placeholder="e.g. 85"
            hint="Typical: 15–276"
            min={15}
            max={300}
            onChange={handleChange}
          />

          <HelperInput
            label="BMI"
            name="bmi"
            placeholder="e.g. 27.5"
            hint="Normal: 18.5–24.9"
            min={15}
            max={50}
            onChange={handleChange}
          />

          <HelperInput
            label="Diabetes Pedigree Function"
            name="dpf"
            placeholder="e.g. 0.5"
            hint="Family history score"
            min={0}
            max={2.5}
            onChange={handleChange}
          />

          <HelperInput
            label="Age"
            name="age"
            placeholder="e.g. 45"
            hint="Adult age: 18–90"
            min={18}
            max={90}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="mt-6 w-full bg-primary text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "Predicting..." : "Predict Diabetes Risk"}
        </button>
      </div>

      {/* RESULT SECTION */}
      {!loading && result && (
        <ResultCard data={result} disease="diabetes" />
      )}
    </div>
  );
}
