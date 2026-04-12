import { createContext, useContext, useEffect, useState } from "react";
import api, { setAuthToken } from "../services/api";
import { translations } from "../i18n";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("ai_med_theme") || "light");
  const [language, setLanguage] = useState(localStorage.getItem("ai_med_lang") || "en");
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("ai_med_user");
      return raw ? JSON.parse(raw) : null;
    } catch (_error) {
      localStorage.removeItem("ai_med_user");
      return null;
    }
  });
  const [reports, setReports] = useState([]);
  const [trends, setTrends] = useState({});

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ai_med_theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    localStorage.setItem("ai_med_lang", language);
  }, [language]);

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  const authSuccess = (payload) => {
    setAuthToken(payload.token);
    setUser(payload.user);
    localStorage.setItem("ai_med_user", JSON.stringify(payload.user));
  };

  const signup = async (form) => {
    const res = await api.post("/auth/signup", form);
    authSuccess(res.data);
    return res.data;
  };

  const login = async (form) => {
    const res = await api.post("/auth/login", form);
    authSuccess(res.data);
    return res.data;
  };

  const logout = () => {
    setAuthToken("");
    localStorage.removeItem("ai_med_user");
    setUser(null);
    setReports([]);
  };

  const loadReports = async () => {
    if (!user) return;
    const res = await api.get("/reports");
    setReports(res.data.reports || []);
  };

  const saveReport = async (payload) => {
    if (!user) return null;
    const res = await api.post("/reports", payload);
    setReports((prev) => [res.data.report, ...prev]);
    loadTrends();
    return res.data.report;
  };

  const loadTrends = async () => {
    if (!user) return;
    const res = await api.get("/reports/trends");
    setTrends(res.data.trends || {});
  };

  useEffect(() => {
    if (!user) return;
    api
      .get("/reports")
      .then((res) => setReports(res.data.reports || []))
      .catch(() => setReports([]));
    api
      .get("/reports/trends")
      .then((res) => setTrends(res.data.trends || {}))
      .catch(() => setTrends({}));
  }, [user]);

  const value = {
    theme,
    setTheme,
    language,
    setLanguage,
    t,
    user,
    reports,
    trends,
    signup,
    login,
    logout,
    saveReport,
    loadReports,
    loadTrends
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
