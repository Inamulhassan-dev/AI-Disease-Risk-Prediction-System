import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { t, theme, setTheme, language, setLanguage, user, logout } = useApp();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  const primaryLinks = [{ to: "/", label: t("home") }, { to: "/quality", label: t("quality") }];
  if (user) primaryLinks.push({ to: "/history", label: t("history") }, { to: "/trends", label: t("trends") });
  if (user?.role === "doctor") primaryLinks.push({ to: "/doctor", label: t("doctor") });

  const moduleLinks = [
    { to: "/diabetes", label: t("diabetes") },
    { to: "/heart", label: t("heart") },
    { to: "/kidney", label: t("kidney") },
    { to: "/liver", label: "Liver" },
    { to: "/stroke", label: "Stroke" },
    { to: "/hypertension", label: "HTN" },
    { to: "/thyroid", label: "Thyroid" },
    { to: "/pcos", label: "PCOS" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-skin-nav border-b border-skin-border px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex gap-3 justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-extrabold text-skin-accent leading-tight">{t("appName")}</Link>

        <button className="md:hidden chip" type="button" onClick={() => setOpen((prev) => !prev)}>
          {open ? "Close" : "Menu"}
        </button>

        <div className="hidden md:flex flex-wrap gap-3 items-center text-sm font-medium">
          {primaryLinks.map((link) => (
            <Link key={link.to} to={link.to} className="nav-link" onClick={closeMenu}>{link.label}</Link>
          ))}

          <select
            className="chip border-none"
            defaultValue=""
            onChange={(event) => {
              if (!event.target.value) return;
              navigate(event.target.value);
              event.target.value = "";
            }}
            aria-label="Modules"
          >
            <option value="">Modules</option>
            {moduleLinks.map((item) => (
              <option key={item.to} value={item.to}>{item.label}</option>
            ))}
          </select>

          <button
            type="button"
            className="chip"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? t("darkMode") : t("lightMode")}
          </button>

          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="chip border-none"
            aria-label={t("language")}
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="ar">AR</option>
          </select>

          {user ? <span className="chip">{user.role}</span> : null}
          {user ? <button type="button" className="btn-ghost" onClick={logout}>{t("logout")}</button> : null}
        </div>
      </div>

      {open ? (
        <div className="md:hidden mt-3 max-h-72 overflow-auto card p-3">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            {primaryLinks.map((link) => (
              <Link key={link.to} to={link.to} className="nav-link py-1" onClick={closeMenu}>{link.label}</Link>
            ))}
            {moduleLinks.map((link) => (
              <Link key={link.to} to={link.to} className="nav-link py-1" onClick={closeMenu}>{link.label}</Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <button
              type="button"
              className="chip"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? t("darkMode") : t("lightMode")}
            </button>

            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="chip border-none"
              aria-label={t("language")}
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="ar">AR</option>
            </select>

            {user ? <span className="chip">{user.role}</span> : null}
            {user ? <button type="button" className="btn-ghost" onClick={logout}>{t("logout")}</button> : null}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
