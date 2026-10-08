import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "./CartContext";
import { useToast } from "../components/Toast";
import { ProductPageSkeleton } from "../components/Skeleton";
import EditRow from "../components/EditRow";
import { API_BASE, bottleNotes, formatPrice, imageUrl } from "../lib/api";

function Stars({ value = 0, onChange }) {
  const rounded = Math.round(Number(value) || 0);
  const interactive = typeof onChange === "function";

  return (
    <div
      className="flex"
      role={interactive ? "radiogroup" : "img"}
      aria-label={interactive ? "Rating" : `${rounded} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const icon = (
          <svg
            viewBox="0 0 20 20"
            className={`h-4 w-4 ${star <= rounded ? "text-gold" : "text-line"}`}
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 1.7 12.5 7l5.8.5-4.4 3.8 1.4 5.6L10 14.2 4.7 16.9l1.4-5.6L1.7 7.5 7.5 7 10 1.7z" />
          </svg>
        );
        if (!interactive) return <span key={star}>{icon}</span>;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={rounded === star}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
            onClick={() => onChange(star)}
            className="p-0.5"
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const showToast = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [active, setActive] = useState(0);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [others, setOthers] = useState([]);

  useEffect(() => {
    let activeRequest = true;
    setLoading(true);
    setMissing(false);
    setProduct(null);
    setActive(0);
    setQty(1);
    setForm({ name: "", rating: 5, comment: "" });
    setFormError("");

    axios
      .get(`${API_BASE}/api/products/${id}`)
      .then((res) => {
        if (!activeRequest) return;
        setProduct(res.data);
        setReviews(res.data.reviews || []);
        setSize(res.data.sizes?.[0] || "");
      })
      .catch((err) => {
        if (!activeRequest) return;
        setMissing(err.response?.status === 404);
        setProduct(null);
      })
      .finally(() => {
        if (activeRequest) setLoading(false);
      });

    axios
      .get(`${API_BASE}/api/products`)
      .then((res) => {
        if (!activeRequest) return;
        setOthers(res.data.filter((item) => item._id !== id).slice(0, 3));
      })
      .catch(() => {
        if (activeRequest) setOthers([]);
      });

    return () => {
      activeRequest = false;
    };
  }, [id]);

  const average = useMemo(() => {
    if (!reviews.length) return 0;
    return reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length;
  }, [reviews]);

  const shareProduct = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, text: product.description, url });
        return;
      } catch (err) {
        if (err?.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast("Link copied");
    } catch {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(url)}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const submitReview = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFormError("");
    try {
      const res = await axios.post(`${API_BASE}/api/products/${id}/reviews`, {
        ...form,
        rating: Number(form.rating),
      });
      const data = res.data;
      setReviews(Array.isArray(data) ? data : data.reviews || []);
      setForm({ name: "", rating: 5, comment: "" });
      showToast("Review added");
    } catch {
      setFormError("The review could not be saved. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <ProductPageSkeleton />;

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-serif text-5xl">{missing ? "This bottle is not in the edit." : "The fragrance could not be loaded."}</h1>
        <Link to="/collections" className="btn-primary mt-8">
          Back to collections
        </Link>
      </div>
    );
  }

  const images = product.images || [];
  const sizes = product.sizes || [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.18em] text-stone" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-ink">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/collections" className="hover:text-ink">Collections</Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-8 grid items-start gap-12 md:grid-cols-2">
        <div>
          <div className="flex aspect-square items-center justify-center bg-well">
            {images[active] ? (
              <img
                key={images[active]}
                src={imageUrl(images[active])}
                alt={product.name}
                className="rise h-[82%] w-[82%] object-contain mix-blend-multiply"
              />
            ) : (
              <div className="h-40 w-24 border border-line" />
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Show image ${index + 1} of ${product.name}`}
                  className={`h-20 w-20 bg-well p-2 ${index === active ? "ring-1 ring-ink" : "ring-1 ring-transparent"}`}
                >
                  <img src={imageUrl(src)} alt="" className="h-full w-full object-contain mix-blend-multiply" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="font-serif text-5xl font-medium leading-none">{product.name}</h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-stone">{product.description}</p>
          <p className="mt-6 text-2xl tracking-wide">{formatPrice(product.price)}</p>

          {sizes.length > 0 && (
            <div className="mt-8">
              <p className="label">Size</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSize(option)}
                    aria-pressed={size === option}
                    className={`min-w-20 border px-4 py-2 text-sm ${
                      size === option ? "border-ink bg-ink text-ivory" : "border-line bg-paper text-ink hover:border-ink"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="label">Quantity</p>
            <div className="inline-flex border border-line">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={qty <= 1}
                onClick={() => setQty((value) => Math.max(1, value - 1))}
                className="px-4 py-2 disabled:opacity-30"
              >
                –
              </button>
              <span className="min-w-10 py-2 text-center text-sm">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                disabled={qty >= 10}
                onClick={() => setQty((value) => Math.min(10, value + 1))}
                className="px-4 py-2 disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                addToCart(product, { size, qty });
                showToast({
                  text: size ? `${product.name} · ${size} added` : `${product.name} added`,
                  href: "/cart",
                  hrefLabel: "View cart",
                });
              }}
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={shareProduct}
              aria-label="Share this fragrance"
              className="flex h-12 w-12 items-center justify-center border border-line hover:border-ink"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <circle cx="6" cy="12" r="2.2" />
                <circle cx="17" cy="7" r="2.2" />
                <circle cx="17" cy="17" r="2.2" />
                <path d="M8 11.2 14.8 8.2M8.2 13.1l6.6 3" />
              </svg>
            </button>
          </div>

          {bottleNotes(product.description).length > 0 && (
            <div className="mt-10 border-t border-line pt-6">
              <p className="label">In this bottle</p>
              <ul className="space-y-2">
                {bottleNotes(product.description).map((note) => (
                  <li key={note} className="flex items-start gap-3 text-sm leading-relaxed text-stone">
                    <span className="mt-2 h-px w-4 shrink-0 bg-gold" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <section className="mt-16 border-t border-line pt-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-stone">Reviews</p>
            {reviews.length > 0 ? (
              <div className="mt-4 flex items-end gap-4">
                <p className="font-serif text-6xl font-medium leading-none">{average.toFixed(1)}</p>
                <div className="pb-1">
                  <Stars value={average} />
                  <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-stone">
                    {reviews.length} review{reviews.length === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-4 font-serif text-4xl">No reviews yet.</p>
            )}
          </div>
        </div>

        <div className="mt-10 grid items-start gap-12 md:grid-cols-2">
          <div className="divide-y divide-line border-y border-line">
            {reviews.length === 0 ? (
              <p className="py-5 text-sm text-stone">Be the first to leave a note.</p>
            ) : (
              reviews.map((review, index) => (
                <article key={review._id || `${review.name}-${index}`} className="py-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium">{review.name}</p>
                    <Stars value={review.rating} />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{review.comment}</p>
                </article>
              ))
            )}
          </div>

          <form onSubmit={submitReview} className="space-y-4 border border-line bg-paper p-6">
              <div>
                <label className="label" htmlFor="review-name">Name</label>
                <input
                  id="review-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="field"
                />
              </div>
              <div>
                <p className="label">Rating</p>
                <Stars value={form.rating} onChange={(rating) => setForm({ ...form, rating })} />
              </div>
              <div>
                <label className="label" htmlFor="review-comment">Review</label>
                <textarea
                  id="review-comment"
                  required
                  rows="4"
                  value={form.comment}
                  onChange={(event) => setForm({ ...form, comment: event.target.value })}
                  className="field"
                />
              </div>
              {formError && <p className="text-sm text-stone">{formError}</p>}
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? "Saving" : "Submit review"}
              </button>
          </form>
        </div>
      </section>

      <EditRow kicker="Continue" title="Also in the edit" products={others} />
    </div>
  );
}
