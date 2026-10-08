import { Link } from "react-router-dom";
import { averageRating, formatPrice, imageUrl, reviewCount } from "../lib/api";

export default function ProductCard({ product }) {
  const primary = imageUrl(product.images?.[0]);
  const secondary = imageUrl(product.images?.[1]);
  const rating = averageRating(product);
  const count = reviewCount(product);

  return (
    <article className="group h-full transition duration-500 hover:-translate-y-1">
      <Link to={`/product/${product._id}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/5] overflow-hidden bg-well">
          {primary ? (
            <img
              src={primary}
              alt={product.name}
              className={`absolute inset-0 m-auto h-[78%] w-[78%] object-contain mix-blend-multiply transition duration-700 ${
                secondary ? "group-hover:opacity-0" : "group-hover:scale-[1.03]"
              }`}
            />
          ) : null}
          {secondary ? (
            <img
              src={secondary}
              alt=""
              className="absolute inset-0 m-auto h-[78%] w-[78%] object-contain mix-blend-multiply opacity-0 transition duration-700 group-hover:opacity-100"
            />
          ) : null}
        </div>

        <div className="flex flex-1 flex-col pt-5">
          <h3 className="min-h-[3.4rem] font-serif text-[1.7rem] font-medium leading-tight text-ink">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-stone">
            {product.description}
          </p>
          <p className={`mt-3 min-h-4 text-[11px] uppercase tracking-[0.16em] text-stone ${count > 0 ? "" : "invisible"}`}>
            {count > 0 ? `${rating.toFixed(1)} · ${count} review${count === 1 ? "" : "s"}` : "Rating"}
          </p>
          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
            <p className="text-sm tracking-wide">{formatPrice(product.price)}</p>
            <span className="border-b border-gold pb-0.5 text-[11px] uppercase tracking-[0.2em]">
              View
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
