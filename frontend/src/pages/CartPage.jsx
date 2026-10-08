import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { formatPrice, imageUrl } from "../lib/api";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const checkout = () => {
    setOrder({
      reference: `PS-${Date.now().toString().slice(-6)}`,
      items: cart.map((item) => ({ ...item })),
      total,
    });
    clearCart();
  };

  if (order) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.28em] text-stone">Preview order</p>
        <div className="rule mt-4" />
        <h1 className="mt-5 font-serif text-5xl font-medium">Order noted</h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-stone">
          Reference {order.reference}. No payment was taken. This confirms the bag in the browser only.
        </p>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {order.items.map((item) => (
            <li key={item.key} className="flex items-baseline justify-between gap-4 py-4 text-sm">
              <span>
                {item.name}
                {item.size ? ` · ${item.size}` : ""} × {item.qty}
              </span>
              <span>{formatPrice(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-right text-sm">Total {formatPrice(order.total)}</p>
        <Link to="/collections" className="btn-primary mt-8">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-stone">Bag</p>
        <h1 className="mt-4 font-serif text-5xl font-medium">Your cart is empty</h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-stone">
          The edit is waiting. Choose a bottle, then return here.
        </p>
        <Link to="/collections" className="btn-primary mt-8">
          Shop the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 lg:grid-cols-[1fr_20rem] md:py-16">
      <div>
        <p className="text-[11px] uppercase tracking-[0.28em] text-stone">Bag</p>
        <h1 className="mt-3 font-serif text-5xl font-medium">Your cart</h1>
        <div className="mt-8">
          {cart.map((item) => (
            <article key={item.key} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line py-6 sm:grid-cols-[6.5rem_1fr_auto]">
              <div className="aspect-square bg-well">
                <img
                  src={imageUrl(item.images?.[0])}
                  alt=""
                  className="h-full w-full object-contain mix-blend-multiply p-2"
                />
              </div>
              <div>
                <h2 className="font-serif text-3xl font-medium leading-none">{item.name}</h2>
                {item.size && (
                  <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-stone">{item.size}</p>
                )}
                <p className="mt-2 text-sm">{formatPrice(item.price)}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <div className="inline-flex border border-line">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.name}`}
                      disabled={item.qty <= 1}
                      onClick={() => updateQty(item.key, item.qty - 1)}
                      className="px-3 py-2 disabled:opacity-30"
                    >
                      –
                    </button>
                    <span className="min-w-8 py-2 text-center text-sm">{item.qty}</span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.name}`}
                      disabled={item.qty >= 10}
                      onClick={() => updateQty(item.key, item.qty + 1)}
                      className="px-3 py-2 disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.key)}
                    className="text-[11px] uppercase tracking-[0.16em] text-stone underline decoration-gold underline-offset-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="hidden text-sm sm:block">{formatPrice(item.price * item.qty)}</p>
            </article>
          ))}
        </div>
      </div>

      <aside className="h-fit border border-line bg-paper p-6 lg:sticky lg:top-24">
        <h2 className="font-serif text-3xl font-medium">Summary</h2>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-stone">Subtotal</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-stone">Shipping</dt>
            <dd>Noted at checkout</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-gold pt-3">
            <dt>Total</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
        </dl>
        <button type="button" onClick={checkout} className="btn-primary mt-6 w-full">
          Checkout
        </button>
        <p className="mt-4 text-xs leading-relaxed text-stone">
          Preview only. No payment is taken.
        </p>
        <Link to="/collections" className="mt-4 inline-block text-[11px] uppercase tracking-[0.16em] underline decoration-gold underline-offset-4">
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}
