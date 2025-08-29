import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data.slice(0, 6))) // show top 6
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="min-h-screen ">
      {/* Hero */}
      <div className="flex flex-col items-center justify-center text-center pt-32">
        <h1 className="text-5xl font-extrabold text-rose-700 drop-shadow-lg">
          Discover Your Signature Scent
        </h1>
        <p className="text-lg text-gray-700 mt-4 max-w-xl">
          A curated collection of perfumes blending elegance, freshness, and luxury.
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 pb-12">
        {products.map((p) => (
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
  );
}
