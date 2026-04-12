import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Diabetes from "./pages/Diabetes";
import Heart from "./pages/Heart";
import Kidney from "./pages/Kidney";
import Liver from "./pages/Liver";
import Stroke from "./pages/Stroke";
import Hypertension from "./pages/Hypertension";
import Thyroid from "./pages/Thyroid";
import PCOS from "./pages/PCOS";
import History from "./pages/History";
import Trends from "./pages/Trends";
import ModelQuality from "./pages/ModelQuality";
import DoctorDashboard from "./pages/DoctorDashboard";
import { useApp } from "./context/AppContext";

function ProtectedRoute({ children }) {
  const { user } = useApp();
  if (!user) return <Home />;
  return children;
}

function DoctorRoute({ children }) {
  const { user } = useApp();
  if (!user || user.role !== "doctor") return <Home />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell min-h-screen">
        <div className="animated-bg" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diabetes" element={<Diabetes />} />
          <Route path="/heart" element={<Heart />} />
          <Route path="/kidney" element={<Kidney />} />
          <Route path="/liver" element={<Liver />} />
          <Route path="/stroke" element={<Stroke />} />
          <Route path="/hypertension" element={<Hypertension />} />
          <Route path="/thyroid" element={<Thyroid />} />
          <Route path="/pcos" element={<PCOS />} />
          <Route path="/quality" element={<ModelQuality />} />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trends"
            element={
              <ProtectedRoute>
                <Trends />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <DoctorRoute>
                <DoctorDashboard />
              </DoctorRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
