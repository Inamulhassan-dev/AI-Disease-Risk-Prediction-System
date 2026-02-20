import { useState } from "react";
import api from "../services/api";
import ResultCard from "../components/ResultCard";
import HelperInput from "../components/HelperInput";

export default function Kidney() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);

  const handle = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    const res = await api.post("/kidney", form);
    setResult(res.data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-2">
          Kidney Disease Risk Assessment
        </h2>

        <p className="text-slate-500 mb-6">
          Enter laboratory values carefully. These ranges reflect typical adult values.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <HelperInput
            label="Age"
            name="age"
            placeholder="e.g. 50"
            hint="Adult age: 18–90"
            min={18}
            max={90}
            onChange={handle}
          />

          <HelperInput
            label="Blood Pressure"
            name="bp"
            placeholder="e.g. 80"
            hint="Normal: 60–90 mm Hg"
            min={70}
            max={160}
            onChange={handle}
          />

          <HelperInput
            label="Specific Gravity"
            name="sg"
            placeholder="e.g. 1.020"
            hint="Normal: 1.005–1.030"
            min={1.00}
            max={2.00}
            onChange={handle}
          />

          <HelperInput
            label="Albumin"
            name="al"
            placeholder="0–5"
            hint="0 = normal, 5 = high"
            min={0}
            max={10}
            onChange={handle}
          />

          <HelperInput
            label="Sugar"
            name="su"
            placeholder="0–5"
            hint="0 = normal, 5 = high"
            min={0}
            max={10}
            onChange={handle}
          />

          <HelperInput
            label="Blood Glucose Random"
            name="bgr"
            placeholder="e.g. 120"
            hint="Normal: 70–140 mg/dL"
            min={70}
            max={200}
            onChange={handle}
          />

          <HelperInput
            label="Serum Creatinine"
            name="sc"
            placeholder="e.g. 1.2"
            hint="Normal: 0.6–1.3 mg/dL"
            min={0.3}
            max={2.0}
            onChange={handle}
          />

          <HelperInput
            label="Hemoglobin"
            name="hemo"
            placeholder="e.g. 13"
            hint="Normal: 12–17 g/dL"
            min={10}
            max={25}
            onChange={handle}
          />
        </div>

        <button
          onClick={submit}
          className="mt-6 w-full bg-primary text-white py-3 rounded-xl font-semibold"
        >
          Predict Kidney Risk
        </button>
      </div>

      {result && <ResultCard data={result} disease="kidney" />}

    </div>
  );
}
