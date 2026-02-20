import { useState } from "react";
import api from "../services/api";
import ResultCard from "../components/ResultCard";
import HelperInput from "../components/HelperInput";



export default function Heart() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);

  const handle = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    const res = await api.post("/heart", form);
    setResult(res.data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-2">
          Heart Disease Risk Assessment
        </h2>

        <p className="text-slate-500 mb-6">
          Enter patient cardiac parameters using standard clinical ranges.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <HelperInput
            label="Age"
            name="age"
            placeholder="e.g. 55"
            hint="Adult age: 18–90"
            min={18}
            max={90}
            onChange={handle}
          />

          <HelperInput
            label="Sex"
            name="sex"
            placeholder="1 = Male, 0 = Female"
            hint="Binary value"
            min={0}
            max={1}
            onChange={handle}
          />

          <HelperInput
            label="Chest Pain Type"
            name="cp"
            placeholder="0–3"
            hint="0: typical, 3: asymptomatic"
            min={0}
            max={3}
            onChange={handle}
          />

          <HelperInput
            label="Resting Blood Pressure"
            name="trestbps"
            placeholder="e.g. 120"
            hint="Normal: 90–140 mm Hg"
            min={80}
            max={160}
            onChange={handle}
          />

          <HelperInput
            label="Cholesterol (mg/dL)"
            name="chol"
            placeholder="e.g. 200"
            hint="Normal: <200"
            min={150}
            max={300}
            onChange={handle}
          />

          <HelperInput
            label="Max Heart Rate"
            name="thalach"
            placeholder="e.g. 160"
            hint="Typical: 70–200"
            min={50}
            max={300}
            onChange={handle}
          />

          <HelperInput
            label="Fasting Blood Sugar"
            name="fbs"
            placeholder="1 or 0"
            hint="1 if >120 mg/dL else 0"
            min={0}
            max={1}
            onChange={handle}
          />
        </div>

        <button
          onClick={submit}
          className="mt-6 w-full bg-primary text-white py-3 rounded-xl font-semibold"
        >
          Predict Heart Risk
        </button>
      </div>

      {result && <ResultCard data={result} disease="heart" />}

    </div>
  );
}
