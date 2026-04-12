import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function AuthPanel() {
  const { t, login, signup } = useApp();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "patient" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "login") {
        await login({ email: form.email, password: form.password });
      } else {
        await signup(form);
      }
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Authentication failed.");
    }

    setLoading(false);
  };

  return (
    <div className="card max-w-md mx-auto p-6 md:p-8 mt-10">
      <h2 className="text-2xl font-semibold mb-2">{t("authTitle")}</h2>
      <p className="text-sm text-skin-muted mb-6">{mode === "login" ? t("login") : t("signup")}</p>

      <form onSubmit={onSubmit} className="space-y-4">
        {mode === "signup" && (
          <>
            <label className="block">
              <span className="field-label">{t("fullName")}</span>
              <input className="field-input" name="name" value={form.name} onChange={onChange} required />
            </label>

            <label className="block">
              <span className="field-label">Role</span>
              <select className="field-input" name="role" value={form.role} onChange={onChange}>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </label>
          </>
        )}

        <label className="block">
          <span className="field-label">{t("email")}</span>
          <input className="field-input" type="email" name="email" value={form.email} onChange={onChange} required />
        </label>

        <label className="block">
          <span className="field-label">{t("password")}</span>
          <input className="field-input" type="password" name="password" value={form.password} onChange={onChange} required />
        </label>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button className="btn-primary w-full" disabled={loading} type="submit">
          {loading ? "..." : mode === "login" ? t("login") : t("signup")}
        </button>

        <button
          className="text-sm text-skin-accent hover:underline"
          type="button"
          onClick={() => setMode((prev) => (prev === "login" ? "signup" : "login"))}
        >
          {mode === "login" ? t("signup") : t("login")}
        </button>
      </form>
    </div>
  );
}
