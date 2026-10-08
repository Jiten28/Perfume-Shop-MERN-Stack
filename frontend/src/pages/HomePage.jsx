import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { ProductCardSkeleton } from "../components/Skeleton";
import { API_BASE, averageRating, bottleNotes, formatPrice, imageUrl } from "../lib/api";

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

  const trending = products.slice(0, 3);
  const featured = products[0];
  const spotlight = products[3] || products[1];
  const notes = bottleNotes(spotlight?.description || "");

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-10 md:grid-cols-2 md:py-14">
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

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <Link to={featured ? `/product/${featured._id}` : "/collections"} className="block bg-well">
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

      <section className="border-y border-line bg-paper/70">
        <ul className="mx-auto grid max-w-6xl gap-4 px-6 py-4 text-center text-[11px] uppercase tracking-[0.22em] text-stone sm:grid-cols-3">
          {promises.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-stone">This season</p>
            <h2 className="mt-2 font-serif text-4xl font-medium md:text-5xl">Trending</h2>
          </div>
          <Link to="/collections" className="border-b border-gold pb-0.5 text-[11px] uppercase tracking-[0.18em]">
            View all
          </Link>
        </div>

        {error && <p className="text-sm text-stone">{error}</p>}

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }, (_, index) => <ProductCardSkeleton key={index} />)
            : trending.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      </section>

      {spotlight && (
        <section className="border-y border-line bg-sand">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-10 md:grid-cols-[1.05fr_0.95fr] md:py-12">
            <Link to={`/product/${spotlight._id}`} className="block bg-well">
              <div className="flex aspect-[5/4] items-center justify-center">
                <img
                  src={imageUrl(spotlight.images?.[0])}
                  alt={spotlight.name}
                  className="h-[78%] w-[62%] object-contain mix-blend-multiply"
                />
              </div>
            </Link>
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-stone">From the edit</p>
              <h2 className="mt-3 font-serif text-4xl font-medium leading-none md:text-6xl">{spotlight.name}</h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-stone">{spotlight.description}</p>
              {notes.length > 0 && (
                <ul className="mt-6 space-y-2">
                  {notes.map((note) => (
                    <li key={note} className="flex items-center gap-3 text-sm">
                      <span className="h-px w-4 bg-gold" />
                      {note}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-8 flex items-center gap-6">
                <p className="text-sm">{formatPrice(spotlight.price)}</p>
                <Link to={`/product/${spotlight._id}`} className="btn-primary">
                  View the bottle
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-stone">From the reviews</p>
            <h2 className="mt-2 font-serif text-4xl font-medium md:text-5xl">Top rated</h2>
          </div>
          {topRated.length === 1 ? (
            <Link to={`/product/${topRated[0]._id}`} className="grid items-center gap-8 bg-well p-6 md:grid-cols-[16rem_1fr] md:p-8">
              <img
                src={imageUrl(topRated[0].images?.[0])}
                alt={topRated[0].name}
                className="mx-auto h-56 object-contain mix-blend-multiply"
              />
              <div>
                <p className="font-serif text-4xl font-medium leading-none">{topRated[0].name}</p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">{topRated[0].description}</p>
                <div className="mt-6 flex items-center gap-6">
                  <p className="text-sm">{formatPrice(topRated[0].price)}</p>
                  <span className="border-b border-gold pb-0.5 text-[11px] uppercase tracking-[0.18em]">View</span>
                </div>
              </div>
            </Link>
          ) : topRated.length > 1 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {topRated.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="max-w-md text-sm leading-relaxed text-stone">
              Ratings will place a fragrance here once the first reviews arrive.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
