import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { ProductCardSkeleton } from "../components/Skeleton";
import { API_BASE } from "../lib/api";

const priceBands = [
  { id: "all", label: "All prices" },
  { id: "under", label: "Under ₹10,000" },
  { id: "mid", label: "₹10,000 – ₹15,000" },
  { id: "over", label: "Over ₹15,000" },
];

export default function CollectionsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [priceBand, setPriceBand] = useState("all");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/products`)
      .then((res) => setProducts(res.data))
      .catch(() => setError("The collection could not be loaded. Start the backend, then refresh."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const next = products.filter((product) => {
      const matchesQuery =
        !needle ||
        product.name.toLowerCase().includes(needle) ||
        product.description.toLowerCase().includes(needle);
      const price = Number(product.price);
      const matchesPrice =
        priceBand === "all" ||
        (priceBand === "under" && price < 10000) ||
        (priceBand === "mid" && price >= 10000 && price <= 15000) ||
        (priceBand === "over" && price > 15000);
      return matchesQuery && matchesPrice;
    });

    const sorted = [...next];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [products, query, priceBand, sort]);

  const clearFilters = () => {
    setQuery("");
    setPriceBand("all");
    setSort("featured");
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
      <p className="text-[11px] uppercase tracking-[0.32em] text-stone">The edit</p>
      <div className="rule mt-4" />
      <h1 className="mt-5 font-serif text-5xl font-medium md:text-6xl">Collections</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone">
        Ten houses, shown without the noise. Search, sort, or narrow by price.
      </p>

      <div className="mt-8 flex flex-col gap-3 border-y border-line py-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm text-stone">
          {loading ? "Loading" : `${filtered.length} fragrance${filtered.length === 1 ? "" : "s"}`}
        </p>
        <div className="grid gap-3 sm:grid-cols-3 lg:w-[40rem]">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            aria-label="Search fragrances"
            className="field"
          />
          <select
            value={priceBand}
            onChange={(event) => setPriceBand(event.target.value)}
            aria-label="Filter by price"
            className="field"
          >
            {priceBands.map((band) => (
              <option key={band.id} value={band.id}>
                {band.label}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort fragrances"
            className="field"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
            <option value="name">Name, A–Z</option>
          </select>
        </div>
      </div>

      {error && <p className="mt-8 text-sm text-stone">{error}</p>}

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }, (_, index) => <ProductCardSkeleton key={index} />)
          : filtered.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>

      {!loading && !error && filtered.length === 0 && (
        <div className="mt-12 border border-line bg-paper px-6 py-10 text-center">
          <p className="font-serif text-3xl">Nothing matches that edit.</p>
          <button type="button" onClick={clearFilters} className="btn-line mt-6">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
