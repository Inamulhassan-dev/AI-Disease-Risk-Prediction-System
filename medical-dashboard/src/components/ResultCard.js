import { useState } from "react";
import { Bar } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { useApp } from "../context/AppContext";
import ClinicalRecommendations from "./ClinicalRecommendations";
import DiabetesRiskExplanation from "./DiabetesRiskExplanation";
import HeartRiskExplanation from "./HeartRiskExplanation";
import KidneyRiskExplanation from "./KidneyRiskExplanation";
import RiskGauge from "./RiskGauge";

export default function ResultCard({ data, disease, language }) {
  const { t, saveReport, user } = useApp();
  const [doctorNotes, setDoctorNotes] = useState("");
  const [savedNotice, setSavedNotice] = useState("");
  if (!data) return null;

  const generatedAt = new Date();
  const riskColor =
    data.risk === "Low Risk"
      ? "#22c55e"
      : data.risk === "Moderate Risk"
      ? "#f59e0b"
      : "#ef4444";

  const chartData = {
    labels: [t("probability"), "100 - risk"],
    datasets: [
      {
        label: "Risk",
        data: [Number(data.probability), 100 - Number(data.probability)],
        backgroundColor: ["#f97316", "#14b8a6"],
        borderRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  };

  const downloadPDF = async () => {
    const element = document.getElementById("pdf-report");

    const canvas = await html2canvas(element, {
      scale: 3,
      backgroundColor: "#ffffff",
      useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210;
    const pageHeight = 297;

    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${disease}_risk_report.pdf`);
  };

  const handleSave = async () => {
    if (!user) {
      alert("Please login to save reports.");
      return;
    }

    await saveReport({
      disease,
      result: data,
      doctorNotes,
      language: language || "en"
    });
    setSavedNotice(t("reportSaved"));
  };

  return (
    <div className="card p-6 mt-6 relative">
      <h3 className="text-xl font-semibold mb-2 capitalize">{disease} {t("riskResultTitle")}</h3>

      <p className="text-lg font-medium">
        {t("riskLevel")}: <span style={{ color: riskColor }} className="font-bold">{data.risk}</span>
      </p>

      <p className="mb-1">
        {t("probability")}: <b>{data.probability}%</b>
      </p>

      <p className="text-sm text-skin-muted mb-4">
        {t("createdAt")}: {generatedAt.toLocaleString()}
      </p>

      <RiskGauge value={data.probability} />

      <div className="bg-skin-soft rounded-xl p-3 md:p-4 mt-3">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {disease === "diabetes" && <DiabetesRiskExplanation data={data} />}
      {disease === "heart" && <HeartRiskExplanation inputs={data.inputs} />}
      {disease === "kidney" && <KidneyRiskExplanation inputs={data.inputs} />}

      {data.explainability?.shap_like_top_features?.length ? (
        <div className="mt-6 p-5 rounded-xl bg-skin-soft fade-up">
          <h4 className="font-semibold mb-2">{t("explainabilityTitle")}</h4>
          <ul className="list-disc list-inside text-sm space-y-1 text-skin-body">
            {data.explainability.shap_like_top_features.map((item) => (
              <li key={item.feature}>
                <strong>{item.feature}</strong>: {item.explanation} (impact {item.impact_score})
              </li>
            ))}
          </ul>
          <p className="text-xs text-skin-muted mt-2">{data.explainability.lime_like_summary}</p>
        </div>
      ) : null}

      <ClinicalRecommendations disease={disease} risk={data.risk} />

      <label className="block mt-4">
        <span className="field-label">{t("doctorNotes")}</span>
        <textarea
          className="field-input min-h-24"
          value={doctorNotes}
          placeholder={t("doctorNotesHint")}
          onChange={(event) => setDoctorNotes(event.target.value)}
        />
      </label>

      {savedNotice ? <p className="text-sm text-green-500 mt-2">{savedNotice}</p> : null}

      <div className="grid sm:grid-cols-2 gap-3 mt-6">
        <button onClick={downloadPDF} className="btn-primary">{t("downloadPdf")}</button>
        <button onClick={handleSave} className="btn-ghost">{t("saveReport")}</button>
      </div>

      <div
        id="pdf-report"
        className="p-6 bg-white text-black"
        style={{
          width: "800px",
          position: "absolute",
          left: "-9999px",
          top: "0"
        }}
      >
        <h2 className="text-2xl font-bold mb-2">{t("pdfTitle")}</h2>

        <p><b>{t("disease")}:</b> {disease}</p>
        <p><b>{t("riskLevel")}:</b> {data.risk}</p>
        <p><b>{t("probability")}:</b> {data.probability}%</p>
        <p><b>{t("createdAt")}:</b> {generatedAt.toLocaleString()}</p>

        <hr className="my-4" />

        <h3 className="font-semibold mb-2">{t("enteredValues")}</h3>
        <ul className="list-disc list-inside text-sm">
          {Object.entries(data.inputs || {}).map(([key, value]) => (
            <li key={key}>{key}: {value}</li>
          ))}
        </ul>

        <hr className="my-4" />

        <h3 className="font-semibold mb-2">{t("doctorNotes")}</h3>
        <p className="text-sm">{doctorNotes || "-"}</p>

        <hr className="my-4" />
        <h3 className="font-semibold mb-2">{t("advancedExplainability")}</h3>
        <p className="text-sm">{data.explainability?.lime_like_summary || t("noDetails")}</p>

        <p className="mt-6 text-xs text-gray-600">{t("generatedBy")}</p>
      </div>
    </div>
  );
}
