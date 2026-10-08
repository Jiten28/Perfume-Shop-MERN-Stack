import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { ProductCardSkeleton } from "../components/Skeleton";
import { API_BASE, averageRating, imageUrl } from "../lib/api";

const promises = ["Curated houses", "Discreet packaging", "Gift-ready"];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    axios
      .get(`${API_BASE}/api/products`)
      .then((res) => {
        if (active) setProducts(res.data);
      })
      .catch(() => {
        if (active) setError("The collection could not be loaded. Start the backend, then refresh.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    axios
      .get(`${API_BASE}/api/products/top`)
      .then((res) => {
        if (active) setTopRated(res.data.filter((product) => averageRating(product) > 0));
      })
      .catch(() => {
        if (active) setTopRated([]);
      });

    return () => {
      active = false;
    };
  }, []);

  const trending = products.slice(0, 6);
  const featured = products[0];

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 md:grid-cols-2 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="text-[11px] uppercase tracking-[0.32em] text-stone">The collection</p>
          <div className="rule mt-4" />
          <h1 className="mt-6 font-serif text-5xl font-medium leading-[0.95] text-ink md:text-7xl">
            Discover your signature scent
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-stone">
            A curated collection of perfumes blending elegance, freshness, and luxury.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link to="/collections" className="btn-primary">
              Shop the collection
            </Link>
            <Link to="/contact" className="border-b border-gold pb-0.5 text-[11px] uppercase tracking-[0.2em]">
              Write to us
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Link
            to={featured ? `/product/${featured._id}` : "/collections"}
            className="block bg-well"
          >
            <div className="flex aspect-[4/5] items-center justify-center">
              {featured ? (
                <img
                  src={imageUrl(featured.images?.[0])}
                  alt={featured.name}
                  className="h-[78%] w-[70%] object-contain mix-blend-multiply"
                />
              ) : (
                <div className="h-40 w-24 border border-line" />
              )}
            </div>
          </Link>
          {featured && (
            <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-stone">
              <span>{featured.name}</span>
              <span className="border-b border-gold pb-0.5 text-ink">View</span>
            </div>
          )}
        </motion.div>
      </section>

      <section className="border-y border-line">
        <ul className="mx-auto grid max-w-6xl gap-4 px-6 py-5 text-center text-[11px] uppercase tracking-[0.22em] text-stone sm:grid-cols-3">
          {promises.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-stone">This season</p>
            <h2 className="mt-2 font-serif text-4xl font-medium md:text-5xl">Trending</h2>
          </div>
          <Link to="/collections" className="border-b border-gold pb-0.5 text-[11px] uppercase tracking-[0.18em]">
            View all
          </Link>
        </div>

        {error && <p className="text-sm text-stone">{error}</p>}

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }, (_, index) => <ProductCardSkeleton key={index} />)
            : trending.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <p className="mx-auto max-w-3xl px-6 py-14 text-center font-serif text-3xl font-medium leading-snug md:py-16 md:text-4xl">
          Ten fragrances, edited for contrast — floral, woody, fresh, and dark.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-stone">From the reviews</p>
          <h2 className="mt-2 font-serif text-4xl font-medium md:text-5xl">Top rated</h2>
        </div>
        {topRated.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {topRated.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="max-w-md text-sm leading-relaxed text-stone">
            Ratings will place a fragrance here once the first reviews arrive.
          </p>
        )}
      </section>
    </div>
  );
}
