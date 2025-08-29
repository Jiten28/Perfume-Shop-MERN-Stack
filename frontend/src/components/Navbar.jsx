import { Link } from "react-router-dom";
const logo = "/logo.png";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md fixed shadow-md top-0 left-0 w-full z-50 h-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-rose-600">
          < img src={logo} alt="Logo" className="h-20 inline-block ml-2" />
          Perfume Store
        </Link>

        {/* Links */}
        <div className="space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-rose-500 transition">Home</Link>
          <Link to="/collections" className="hover:text-rose-500 transition">Collections</Link>
          <Link to="/contact" className="hover:text-rose-500 transition">Contact</Link>
          <Link to="/cart" className="hover:text-rose-500 transition">Cart</Link>

        </div>
      </div>
    </nav>
  );
}
