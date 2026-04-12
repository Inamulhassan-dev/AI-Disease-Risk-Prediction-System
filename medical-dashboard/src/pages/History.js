import { useMemo } from "react";
import { useApp } from "../context/AppContext";

export default function History() {
  const { reports, t, language } = useApp();

  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat(language === "ar" ? "ar" : language === "hi" ? "hi-IN" : "en-US", {
        dateStyle: "medium",
        timeStyle: "short"
      }),
    [language]
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">{t("recentHistory")}</h2>
      <p className="text-skin-muted mb-6">{t("yourReports")}</p>

      {reports.length === 0 ? (
        <div className="card p-6">{t("noHistory")}</div>
      ) : (
        <div className="grid gap-4">
          {reports.map((report) => (
            <div key={report.id} className="card p-4 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-semibold capitalize">{report.disease}</h3>
                <span className="chip">{formatter.format(new Date(report.created_at))}</span>
              </div>

              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <p><strong>{t("riskLevel")}:</strong> {report.risk}</p>
                <p><strong>{t("probability")}:</strong> {report.probability}%</p>
                <p><strong>{t("language")}:</strong> {report.language}</p>
              </div>

              {report.doctor_notes ? (
                <p className="mt-3 text-sm text-skin-muted">
                  <strong>{t("doctorNotes")}:</strong> {report.doctor_notes}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
