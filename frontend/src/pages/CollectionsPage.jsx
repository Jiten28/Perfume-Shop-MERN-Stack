import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CollectionsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-serif flex items-center justify-center text-red-600 mt-10 mb-6">Our Collections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {products.map(p => (
          <Link
            key={p._id}
            to={`/product/${p._id}`}
            className="bg-white border rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition"
          >
            <img
              src={`http://localhost:5000${p.images[0]}`}
              alt={p.name}
              className="h-64 w-48 object-cover mx-auto rounded-t-xl "
            />
            <div className="p-4">
              <h2 className="font-serif text-xl text-gray-900">{p.name}</h2>
              <p className="text-sm text-gray-600">
                {p.description.slice(0, 60)}...
              </p>
              <p className="text-lg font-semibold text-red-600 mt-2">
                ₹{p.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CollectionsPage;
