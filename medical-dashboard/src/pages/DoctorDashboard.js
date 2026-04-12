import { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import api from "../services/api";

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const [comparison, setComparison] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [patientCompare, setPatientCompare] = useState({ patient: [], cohort: [] });

  useEffect(() => {
    api.get("/doctor/patients").then((res) => setPatients(res.data.patients || [])).catch(() => setPatients([]));
    api.get("/doctor/compare").then((res) => setComparison(res.data.comparison || [])).catch(() => setComparison([]));
  }, []);

  useEffect(() => {
    if (!selectedPatient) return;
    api
      .get(`/doctor/patient-compare?user_id=${selectedPatient}`)
      .then((res) => setPatientCompare(res.data || { patient: [], cohort: [] }))
      .catch(() => setPatientCompare({ patient: [], cohort: [] }));
  }, [selectedPatient]);

  const chartData = {
    labels: comparison.map((row) => row.disease),
    datasets: [
      {
        label: "Average probability",
        data: comparison.map((row) => row.avg_probability),
        backgroundColor: "#f97316",
        borderRadius: 8
      }
    ]
  };

  const patientVsCohortData = useMemo(() => {
    const labels = patientCompare.patient.map((row) => row.disease);
    const cohortMap = Object.fromEntries(patientCompare.cohort.map((row) => [row.disease, row.probability]));

    return {
      labels,
      datasets: [
        {
          label: "Patient",
          data: patientCompare.patient.map((row) => row.probability),
          backgroundColor: "#0f766e",
          borderRadius: 8
        },
        {
          label: "Cohort Avg",
          data: labels.map((label) => cohortMap[label] || 0),
          backgroundColor: "#f97316",
          borderRadius: 8
        }
      ]
    };
  }, [patientCompare]);

  const exportCsv = () => {
    if (!patientCompare.patient.length) return;
    const header = "Disease,Patient Probability,Cohort Average\n";
    const cohortMap = Object.fromEntries(patientCompare.cohort.map((row) => [row.disease, row.probability]));
    const body = patientCompare.patient
      .map((row) => `${row.disease},${row.probability},${cohortMap[row.disease] || 0}`)
      .join("\n");
    const csv = `${header}${body}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "patient_vs_cohort.csv";
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      <h2 className="text-2xl md:text-3xl font-semibold">Doctor Dashboard</h2>

      <div className="card p-5">
        <h3 className="text-lg font-semibold mb-4">Disease Comparison</h3>
        <Bar data={chartData} />
      </div>

      <div className="card p-5 space-y-4">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <h3 className="text-lg font-semibold">Patient vs Cohort</h3>
          <button className="btn-ghost" onClick={exportCsv}>Export CSV</button>
        </div>

        <select
          className="field-input max-w-sm"
          value={selectedPatient}
          onChange={(event) => setSelectedPatient(event.target.value)}
        >
          <option value="">Select patient</option>
          {patients.map((patient) => (
            <option key={patient.user_id} value={patient.user_id}>
              {patient.name} ({patient.email})
            </option>
          ))}
        </select>

        {patientCompare.patient.length > 0 ? <Bar data={patientVsCohortData} /> : <p className="text-skin-muted text-sm">Select a patient to compare.</p>}
      </div>

      <div className="grid gap-4">
        {patients.map((patient) => (
          <div key={patient.user_id} className="card p-4">
            <h4 className="font-semibold">{patient.name} ({patient.email})</h4>
            <p className="text-sm text-skin-muted">Reports: {patient.reports.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
