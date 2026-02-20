import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Diabetes from "./pages/Diabetes";
import Heart from "./pages/Heart";
import Kidney from "./pages/Kidney";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diabetes" element={<Diabetes />} />
        <Route path="/heart" element={<Heart />} />
        <Route path="/kidney" element={<Kidney />} />
      </Routes>
    </BrowserRouter>
  );
}
