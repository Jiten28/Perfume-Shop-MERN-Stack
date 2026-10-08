import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(null);

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSent({
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
    });
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 md:grid-cols-2 md:py-20">
      <div>
        <p className="text-[11px] uppercase tracking-[0.32em] text-stone">The atelier</p>
        <div className="rule mt-4" />
        <h1 className="mt-5 font-serif text-5xl font-medium md:text-6xl">Write to us</h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-stone">
          Questions about a bottle, a gift, or an order. We read every note.
        </p>
        <a
          href="mailto:work.jiten282003@gmail.com"
          className="mt-8 inline-block border-b border-gold pb-0.5 text-sm"
        >
          work.jiten282003@gmail.com
        </a>
      </div>

      {sent ? (
        <div className="border border-line bg-paper px-8 py-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-stone">Received</p>
          <h2 className="mt-3 font-serif text-4xl font-medium">Thank you, {sent.name}.</h2>
          <p className="mt-4 text-sm leading-relaxed text-stone">
            Your note is recorded in this preview. To send it, write directly to the atelier. We have your address as {sent.email}.
          </p>
          <button type="button" onClick={() => setSent(null)} className="btn-line mt-8">
            Write another
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="border border-line bg-paper px-6 py-8 sm:px-8">
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
            <textarea id="message" name="message" required rows="6" className="field" />
          </div>
          <button type="submit" className="btn-primary mt-6">
            Send message
          </button>
        </form>
      )}
    </div>
  );
}
