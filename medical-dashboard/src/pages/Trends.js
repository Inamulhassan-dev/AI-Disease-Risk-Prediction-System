import { Line } from "react-chartjs-2";
import { useApp } from "../context/AppContext";

export default function Trends() {
  const { trends } = useApp();

  const diseases = Object.keys(trends || {});

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Risk Trends</h2>

      {diseases.length === 0 ? (
        <div className="card p-6">No trend data yet. Save reports to view progression.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {diseases.map((disease) => {
            const rows = [...trends[disease]].reverse();
            const chartData = {
              labels: rows.map((row) => new Date(row.created_at).toLocaleDateString()),
              datasets: [
                {
                  label: `${disease} risk %`,
                  data: rows.map((row) => row.probability),
                  borderColor: "#0f766e",
                  backgroundColor: "rgba(15,118,110,0.2)",
                  tension: 0.3,
                  fill: true
                }
              ]
            };

            return (
              <div key={disease} className="card p-5 fade-up">
                <h3 className="text-lg font-semibold capitalize mb-3">{disease}</h3>
                <Line data={chartData} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
