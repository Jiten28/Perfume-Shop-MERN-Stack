import { Link, useLocation } from "react-router-dom";

const copy = {
  "/": {
    kicker: "The house",
    text: "A shorter list, so the right bottle is easier to find.",
    href: "/collections",
    label: "Shop the collection",
  },
  "/collections": {
    kicker: "Undecided",
    text: "Write with two names if you want a second opinion.",
    href: "/contact",
    label: "Write to us",
  },
  "/cart": {
    kicker: "Still open",
    text: "The bag can wait. The rest of the edit does not.",
    href: "/collections",
    label: "Continue browsing",
  },
  "/contact": {
    kicker: "Meanwhile",
    text: "The collection stays open while you write.",
    href: "/collections",
    label: "View the edit",
  },
};

export default function ClosingBand() {
  const { pathname } = useLocation();
  const band = copy[pathname] || {
    kicker: "Worn close",
    text: "A bottle is easier to judge beside another.",
    href: "/collections",
    label: "See the edit",
  };

  return (
    <section className="border-t border-line bg-sand">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-stone">{band.kicker}</p>
          <p className="mt-2 max-w-xl font-serif text-2xl font-medium leading-snug md:text-3xl">{band.text}</p>
        </div>
        <Link to={band.href} className="border-b border-gold pb-0.5 text-[11px] uppercase tracking-[0.2em]">
          {band.label}
        </Link>
      </div>
    </section>
  );
}
