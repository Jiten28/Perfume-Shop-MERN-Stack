import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductCard({ id, name, desc, price, img1, img2 }) {
  return (
    <motion.div
      className="bg-white/80 rounded-2xl shadow-lg p-4 cursor-pointer relative group overflow-hidden"
      whileHover={{ scale: 1.05 }}
    >
      {/* Product Image */}
      <div className="relative w-full h-60 flex justify-center items-center">
        <img
          src={img1}
          alt={name}
          className="w-40 h-40 object-contain transition-opacity duration-300 group-hover:opacity-0"
        />
        <img
          src={img2}
          alt={name}
          className="w-40 h-40 object-contain absolute top-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        />
      </div>

      {/* Info */}
      <h3 className="text-lg font-semibold text-gray-800 mt-3">{name}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
      <p className="text-rose-600 font-bold mt-2">₹{price}</p>

      {/* Button */}
      <Link
        to={`/product/${id}`}
        className="block text-center mt-3 py-2 px-4 rounded-lg bg-rose-500 text-white hover:bg-rose-600"
      >
        View Details
      </Link>
    </motion.div>
  );
}
