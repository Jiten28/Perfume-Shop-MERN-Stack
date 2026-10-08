import { Link } from "react-router-dom";
import { formatPrice, imageUrl } from "../lib/api";

export default function EditRow({ kicker, title, products, columns = 3 }) {
  if (!products?.length) return null;
  const grid = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";

  return (
    <section className="mt-10 border-t border-line pt-8">
      <p className="text-[11px] uppercase tracking-[0.22em] text-stone">{kicker}</p>
      <h2 className="mt-2 font-serif text-3xl font-medium">{title}</h2>
      <div className={`mt-6 grid gap-8 ${grid}`}>
        {products.map((product) => (
          <Link key={product._id} to={`/product/${product._id}`} className="group block">
            <div className="flex aspect-square items-center justify-center bg-well">
              <img
                src={imageUrl(product.images?.[0])}
                alt=""
                className="h-[72%] w-[68%] object-contain mix-blend-multiply transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-4 font-serif text-2xl font-medium leading-none">{product.name}</p>
            <p className="mt-2 text-sm text-stone">{formatPrice(product.price)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
