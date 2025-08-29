import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../pages/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(0);
  const { addToCart } = useCart();

  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setReviews(res.data.reviews || []);
      })
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

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/products/${id}/reviews`, form);
      setReviews(res.data.reviews);
      setForm({ name: "", rating: 5, comment: "" });
    } catch (err) {
      console.error("Error adding review:", err);
    }
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`${product.name} - ${product.description}`);
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        "_blank"
      );
    }
  };


  return (
    <div className="min-h-screen flex justify-center items-start pt-24 pb-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-5xl w-full">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Animated Image Slider */}
          <div className="relative overflow-hidden h-96 flex justify-center items-center bg-white rounded-lg">
            <AnimatePresence custom={direction}>
              <motion.img
                key={currentImage}
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

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => addToCart(product)}
                className="px-6 py-3 bg-rose-600 text-white rounded-lg shadow hover:bg-rose-700 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={shareProduct}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
          <div className="mt-4 space-y-4">
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              reviews.map((r, idx) => (
                <div key={idx} className="border-b pb-3">
                  <p className="font-semibold flex items-center">
                    {r.name}
                    <span className="ml-2 text-yellow-500">
                      {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                    </span>
                  </p>
                  <p className="text-gray-600">{r.comment}</p>
                </div>
              ))
            )}
          </div>

          {/* Review Form */}
          <form onSubmit={submitReview} className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              {[5,4,3,2,1].map(n => (
                <option key={n} value={n}>{n} Stars</option>
              ))}
            </select>
            <textarea
              rows="3"
              placeholder="Your Review"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
