import { useEffect, useState } from "react";
import api from "../services/api";

export default function ModelQuality() {
  const [models, setModels] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/model-quality")
      .then((res) => {
        setModels(res.data.models || {});
        setError("");
      })
      .catch(() => {
        setModels({});
        setError("Unable to load model quality. Check backend server is running.");
      })
      .finally(() => setLoading(false));
  }, []);

  const names = Object.keys(models);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Model Quality</h2>

      {loading ? <div className="card p-5">Loading model metrics...</div> : null}
      {error ? <div className="card p-5 text-red-500">{error}</div> : null}
      {!loading && !error && names.length === 0 ? <div className="card p-5">No model quality data found.</div> : null}

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {names.map((name) => (
          <div key={name} className="card p-5">
            <h3 className="text-lg font-semibold capitalize mb-2">{name}</h3>
            <p>Accuracy: {(models[name].accuracy * 100).toFixed(1)}%</p>
            <p>Precision: {(models[name].precision * 100).toFixed(1)}%</p>
            <p>Recall: {(models[name].recall * 100).toFixed(1)}%</p>
            <p>ROC-AUC: {(models[name].roc_auc * 100).toFixed(1)}%</p>
            <p className="text-sm text-skin-muted mt-2">Version: {models[name].version}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
