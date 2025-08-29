import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);

  // Fetch trending perfumes (first 6)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setTrending(res.data.slice(0, 6)))
      .catch((err) => console.error("Error fetching trending products:", err));
  }, []);

  // Fetch top-rated perfumes
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/top")
      .then((res) => setTopRated(res.data))
      .catch((err) => console.error("Error fetching top-rated products:", err));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="flex flex-col items-center justify-center text-center pt-32 px-6">
        <h1 className="text-5xl font-extrabold text-rose-700 drop-shadow-lg">
          Discover Your Signature Scent
        </h1>
        <p className="text-lg text-gray-700 mt-4 max-w-xl">
          A curated collection of perfumes blending elegance, freshness, and luxury.
        </p>
        <a
          href="/collections"
          className="mt-6 px-8 py-3 bg-rose-600 text-white rounded-lg shadow-lg hover:bg-rose-700 transition"
        >
          Shop Now
        </a>
      </div>

      {/* Trending Products */}
      <div className="max-w-7xl mx-auto mt-20 px-6 pb-12">
        <h2 className="text-3xl font-bold text-rose-700 text-center mb-10">
          Trending Perfumes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {trending.map((p) => (
            <ProductCard
              key={p._id}
              id={p._id}
              name={p.name}
              desc={p.description}
              price={p.price}
              img1={`http://localhost:5000${p.images[0]}`}
              img2={p.images[1] ? `http://localhost:5000${p.images[1]}` : ""}
            />
          ))}
        </div>
      </div>

      {/* Top Rated Products */}
      <div className="max-w-7xl mx-auto mt-20 px-6 pb-16">
        <h2 className="text-3xl font-bold text-rose-700 text-center mb-10">
          Top Rated Perfumes
        </h2>
        {topRated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {topRated.map((p) => (
              <ProductCard
                key={p._id}
                id={p._id}
                name={p.name}
                desc={p.description}
                price={p.price}
                img1={`http://localhost:5000${p.images[0]}`}
                img2={p.images[1] ? `http://localhost:5000${p.images[1]}` : ""}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No top-rated perfumes yet.</p>
        )}
      </div>
    </div>
  );
}
