import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-between">
      <h1 className="text-xl font-bold text-primary">
        AI Medical Dashboard
      </h1>
      <div className="space-x-6 font-medium">
        <Link to="/" className="hover:text-primary">Home</Link>
        <Link to="/diabetes" className="hover:text-primary">Diabetes</Link>
        <Link to="/heart" className="hover:text-primary">Heart</Link>
        <Link to="/kidney" className="hover:text-primary">Kidney</Link>
      </div>
    </nav>
  );
}
