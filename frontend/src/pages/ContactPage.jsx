import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE, imageUrl } from "../lib/api";

export default function ContactPage() {
  const [sent, setSent] = useState(null);
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    let active = true;
    axios
      .get(`${API_BASE}/api/products`)
      .then((res) => {
        if (active) setFeatured(res.data[0] || null);
      })
      .catch(() => {
        if (active) setFeatured(null);
      });
    return () => {
      active = false;
    };
  }, []);

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSent({
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
      <p className="text-[11px] uppercase tracking-[0.32em] text-stone">The atelier</p>
      <div className="rule mt-4" />
      <h1 className="mt-4 font-serif text-5xl font-medium">Write to us</h1>

      <div className="mt-8 grid items-stretch gap-6 md:grid-cols-[0.9fr_1.1fr]">
        <div className="flex min-h-[32rem] flex-col bg-sand">
          <div className="flex flex-1 items-center justify-center px-8 py-10">
            {featured ? (
              <img
                src={imageUrl(featured.images?.[0])}
                alt={featured.name}
                className="max-h-[22rem] w-[70%] object-contain mix-blend-multiply"
              />
            ) : (
              <div className="h-48 w-28 border border-line" />
            )}
          </div>
          <div className="border-t border-line/80 px-6 py-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-stone">Still life</p>
            <p className="mt-2 font-serif text-3xl font-medium leading-none">
              {featured ? featured.name : "The collection"}
            </p>
            <a
              href="mailto:work.jiten282003@gmail.com"
              className="mt-3 inline-block border-b border-gold pb-0.5 text-sm"
            >
              work.jiten282003@gmail.com
            </a>
          </div>
        </div>

        {sent ? (
          <div className="flex flex-col justify-center border border-line bg-paper px-8 py-12">
            <p className="text-[11px] uppercase tracking-[0.28em] text-stone">Received</p>
            <h2 className="mt-3 font-serif text-4xl font-medium">Thank you, {sent.name}.</h2>
            <p className="mt-4 text-sm leading-relaxed text-stone">
              Your note is recorded in this preview. To send it, write directly to the atelier. We have your address as {sent.email}.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button type="button" onClick={() => setSent(null)} className="btn-line">
                Write another
              </button>
              <Link to="/collections" className="btn-primary">
                Back to the edit
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="border border-line bg-paper px-6 py-8 sm:px-8">
            <p className="mb-6 max-w-md text-sm leading-relaxed text-stone">
              Questions about a bottle, a gift, or an order. We read every note.
            </p>
            <div>
              <label className="label" htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required autoComplete="name" className="field" />
            </div>
            <div className="mt-5">
              <label className="label" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" className="field" />
            </div>
            <div className="mt-5">
              <label className="label" htmlFor="message">Message</label>
              <textarea id="message" name="message" required rows="7" className="field" />
            </div>
            <button type="submit" className="btn-primary mt-6">
              Send message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
