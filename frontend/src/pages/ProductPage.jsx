import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../pages/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(0); // for animation direction
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p className="text-center mt-20">Loading...</p>;

  const nextImage = () => {
    setDirection(1);
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-24 pb-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-5xl w-full">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Animated Image Slider */}
          <div className="relative overflow-hidden h-96 flex justify-center items-center bg-white rounded-lg">
            <AnimatePresence custom={direction}>
              <motion.img
                key={currentImage} // important for animation
                src={`http://localhost:5000${product.images[currentImage]}`}
                alt={product.name}
                className="absolute w-full h-96 object-contain"
                initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>

            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-700 text-white px-3 py-1 rounded-full"
                >
                  ◀
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-700 text-white px-3 py-1 rounded-full"
                >
                  ▶
                </button>
              </>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-rose-600 text-2xl font-semibold mt-4">₹{product.price}</p>

            <div className="mt-4">
              <h3 className="font-medium text-gray-700">Available Sizes:</h3>
              <div className="flex gap-3 mt-2">
                {product.sizes.map((size, idx) => (
                  <span key={idx} className="border rounded-md px-3 py-1 bg-gray-100">
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => addToCart(product)}
              className="mt-6 px-6 py-3 bg-rose-600 text-white rounded-lg shadow hover:bg-rose-700 transition"
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
